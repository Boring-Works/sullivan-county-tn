import { createServerFn } from "@tanstack/react-start";
import { ulid } from "ulidx";
import { createReceiptId } from "~/lib/receipts";
import { contactFormSchema } from "~/lib/schemas/contact";
import { getKV } from "~/server/env";
import { rateLimit } from "~/server/rate-limit";

export const submitContactForm = createServerFn({ method: "POST" })
  .inputValidator(contactFormSchema)
  .handler(async ({ data }) => {
    if (data.website && data.website.trim() !== "") {
      throw new Error("Submission rejected");
    }

    rateLimit("contact", 3, 60000);
    const kv = getKV();
    const idempotencyKey = `contact:idempotency:${data.idempotencyKey}`;
    const existing = await kv.get<{ id: string; receiptId: string }>(idempotencyKey, "json");
    if (existing) return { success: true, ...existing };

    const id = ulid();
    const receiptId = createReceiptId("MSG", id);
    const submission = {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      submittedAt: new Date().toISOString(),
      receiptId,
      id,
    };

    try {
      await kv.put(`submission:${id}`, JSON.stringify(submission), {
        expirationTtl: 60 * 60 * 24 * 90,
      });
      await kv.put(idempotencyKey, JSON.stringify({ id, receiptId }), {
        expirationTtl: 60 * 60 * 24 * 90,
      });
    } catch {
      console.error(
        JSON.stringify({ event: "contact_submission_store_failed", reason: "KV unavailable" }),
      );
      throw new Error(
        "We couldn't save your message. Please try again or call the county office for help.",
      );
    }

    return { success: true, id, receiptId };
  });
