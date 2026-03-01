import { createServerFn } from "@tanstack/react-start";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const submitContactForm = createServerFn({ method: "POST" })
  .validator((data: unknown): ContactFormData => {
    const d = data as Record<string, unknown>;

    // Honeypot — if filled, silently reject (bots fill hidden fields)
    if (typeof d.website === "string" && d.website.trim() !== "") {
      throw new Error("Submission rejected");
    }

    if (typeof d.name !== "string" || !d.name.trim()) throw new Error("Name is required");
    if (d.name.length > 200) throw new Error("Name too long (200 character limit)");
    if (typeof d.email !== "string" || !d.email.trim() || !EMAIL_RE.test(d.email.trim()))
      throw new Error("Valid email is required");
    if (d.email.length > 320) throw new Error("Email too long");
    if (typeof d.subject !== "string" || !d.subject.trim()) throw new Error("Subject is required");
    if (d.subject.length > 200) throw new Error("Subject too long (200 character limit)");
    if (typeof d.message !== "string" || !d.message.trim()) throw new Error("Message is required");
    if (d.message.length > 5000) throw new Error("Message too long (5000 character limit)");
    return {
      name: d.name.trim(),
      email: d.email.trim(),
      subject: d.subject.trim(),
      message: d.message.trim(),
    };
  })
  .handler(async ({ data }) => {
    const id = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
    const submission = {
      ...data,
      submittedAt: new Date().toISOString(),
      id,
    };

    // Access Cloudflare KV binding
    try {
      const { env } = await import("cloudflare:workers");
      const kv = (env as Record<string, unknown>).CONTACT_SUBMISSIONS as KVNamespace | undefined;
      if (kv) {
        await kv.put(`submission:${id}`, JSON.stringify(submission), {
          expirationTtl: 60 * 60 * 24 * 90, // 90-day TTL
        });
      }
    } catch {
      // KV not available (e.g., local dev without bindings) — submission still succeeds
      console.log("Contact submission (KV unavailable):", JSON.stringify(submission));
    }

    return { success: true, id };
  });
