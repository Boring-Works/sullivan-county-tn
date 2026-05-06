import { createServerFn } from "@tanstack/react-start";
import { ulid } from "ulidx";
import { contactFormSchema } from "~/lib/schemas/contact";
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
      const { env } = await import("cloudflare:workers");
      const kv = (env as Record<string, unknown>).CONTACT_SUBMISSIONS as KVNamespace | undefined;
      if (kv) {
        await kv.put(`submission:${id}`, JSON.stringify(submission), {
          expirationTtl: 60 * 60 * 24 * 90,
        });
      }
    } catch {
      console.error(
        JSON.stringify({ event: "contact_submission_store_failed", reason: "KV unavailable" }),
      );
      return { success: false, error: "storage_unavailable" };
    }

    return { success: true, id };
  });
