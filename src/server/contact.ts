import { createServerFn } from "@tanstack/react-start";
import { ulid } from "ulidx";
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
    const id = ulid();
    const submission = {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      submittedAt: new Date().toISOString(),
      id,
    };

    try {
      const kv = getKV();
      await kv.put(`submission:${id}`, JSON.stringify(submission), {
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

    return { success: true, id };
  });
