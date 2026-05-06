import { createServerFn } from "@tanstack/react-start";
import { desc, eq } from "drizzle-orm";
import sanitizeHtml from "sanitize-html";
import { ulid } from "ulidx";
import { getDb } from "~/db";
import { pageFeedback } from "~/db/schema";
import { submitPageFeedbackSchema } from "~/lib/schemas/page-feedback";
import { requireAdmin } from "~/server/guard";
import { rateLimit } from "~/server/rate-limit";

function getD1() {
  return import("cloudflare:workers").then(({ env }) => {
    const d1 = (env as Record<string, unknown>).DB as D1Database | undefined;
    if (!d1) return null;
    return d1;
  });
}

function sanitize(content: string): string {
  return sanitizeHtml(content, { allowedTags: [], allowedAttributes: {} });
}

export const submitPageFeedback = createServerFn({ method: "POST" })
  .inputValidator(submitPageFeedbackSchema)
  .handler(async ({ data }) => {
    rateLimit("page-feedback", 30, 60_000);
    const d1 = await getD1();
    if (!d1) {
      // D1 unavailable in this environment — silently accept so dev/static doesn't break.
      return { success: true };
    }
    const db = getDb(d1);
    await db.insert(pageFeedback).values({
      id: ulid(),
      page: data.page.slice(0, 500),
      helpful: data.helpful,
      comment: data.comment ? sanitize(data.comment).slice(0, 1000) : null,
      userAgent: null,
      createdAt: new Date().toISOString(),
    });
    return { success: true };
  });

export const listPageFeedback = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const d1 = await getD1();
  if (!d1) return [];
  const db = getDb(d1);
  return db.select().from(pageFeedback).orderBy(desc(pageFeedback.createdAt)).limit(500).all();
});

export const deletePageFeedback = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => {
    const obj = raw as { id?: string };
    if (!obj?.id) throw new Error("id required");
    return { id: obj.id };
  })
  .handler(async ({ data }) => {
    await requireAdmin();
    const d1 = await getD1();
    if (!d1) throw new Error("D1 unavailable");
    const db = getDb(d1);
    await db.delete(pageFeedback).where(eq(pageFeedback.id, data.id));
    return { success: true };
  });
