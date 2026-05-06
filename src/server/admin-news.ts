import { createServerFn } from "@tanstack/react-start";
import { desc, eq } from "drizzle-orm";
import sanitizeHtml from "sanitize-html";
import { ulid } from "ulidx";
import { z } from "zod";
import { getDb } from "~/db";
import { newsArticles } from "~/db/schema";
import {
  createNewsArticleSchema,
  deleteNewsArticleSchema,
  updateNewsArticleSchema,
} from "~/lib/schemas/news";
import { requireAdmin } from "~/server/guard";
import { rateLimit } from "~/server/rate-limit";

function getD1() {
  return import("cloudflare:workers").then(({ env }) => {
    const d1 = (env as Record<string, unknown>).DB as D1Database | undefined;
    if (!d1) throw new Error("D1 not available");
    return d1;
  });
}

function sanitize(content: string): string {
  return sanitizeHtml(content, { allowedTags: [], allowedAttributes: {} });
}

export const listNews = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const d1 = await getD1();
  const db = getDb(d1);
  return db.select().from(newsArticles).orderBy(desc(newsArticles.publishedAt)).all();
});

export const getNewsArticle = createServerFn({ method: "GET" })
  .inputValidator(z.object({ id: z.string().min(1, "ID is required") }))
  .handler(async ({ data }) => {
    await requireAdmin();
    const d1 = await getD1();
    const db = getDb(d1);
    return db.select().from(newsArticles).where(eq(newsArticles.id, data.id)).get();
  });

export const createNewsArticle = createServerFn({ method: "POST" })
  .inputValidator(createNewsArticleSchema)
  .handler(async ({ data }) => {
    await requireAdmin();
    rateLimit("admin-news-mutate", 30, 60000);
    const d1 = await getD1();
    const db = getDb(d1);
    const existingSlug = await db
      .select({ id: newsArticles.id })
      .from(newsArticles)
      .where(eq(newsArticles.slug, data.slug))
      .get();
    if (existingSlug) throw new Error("A news article with this slug already exists");

    const id = ulid();
    const now = new Date().toISOString();

    await db.insert(newsArticles).values({
      id,
      title: sanitize(data.title),
      slug: data.slug,
      author: data.author ?? "Sullivan County",
      summary: sanitize(data.summary),
      content: sanitizeHtml(data.content, {
        allowedTags: ["p", "br", "b", "i", "em", "strong", "a", "ul", "ol", "li", "h2", "h3", "h4"],
        allowedAttributes: { a: ["href", "target", "rel"] },
      }),
      status: data.status ?? "draft",
      url: data.url || null,
      pdfUrl: data.pdfUrl || null,
      publishedAt: data.publishedAt ?? (data.status === "published" ? now : null),
      createdAt: now,
      updatedAt: now,
    });

    return { id };
  });

export const updateNewsArticle = createServerFn({ method: "POST" })
  .inputValidator(updateNewsArticleSchema)
  .handler(async ({ data }) => {
    await requireAdmin();
    rateLimit("admin-news-mutate", 30, 60000);
    const d1 = await getD1();
    const db = getDb(d1);

    const existing = await db
      .select({ id: newsArticles.id })
      .from(newsArticles)
      .where(eq(newsArticles.id, data.id))
      .get();
    if (!existing) throw new Error("News article not found");

    const now = new Date().toISOString();

    const { id, ...updates } = data;
    const safeUpdates: Record<string, unknown> = {};

    if (updates.title !== undefined) safeUpdates.title = sanitize(updates.title);
    if (updates.slug !== undefined) safeUpdates.slug = updates.slug;
    if (updates.author !== undefined) safeUpdates.author = updates.author;
    if (updates.summary !== undefined) safeUpdates.summary = sanitize(updates.summary);
    if (updates.content !== undefined)
      safeUpdates.content = sanitizeHtml(updates.content, {
        allowedTags: ["p", "br", "b", "i", "em", "strong", "a", "ul", "ol", "li", "h2", "h3", "h4"],
        allowedAttributes: { a: ["href", "target", "rel"] },
      });
    if (updates.status !== undefined) safeUpdates.status = updates.status;
    if (updates.url !== undefined) safeUpdates.url = updates.url;
    if (updates.pdfUrl !== undefined) safeUpdates.pdfUrl = updates.pdfUrl;
    if (updates.publishedAt !== undefined) safeUpdates.publishedAt = updates.publishedAt;

    await db
      .update(newsArticles)
      .set({ ...safeUpdates, updatedAt: now })
      .where(eq(newsArticles.id, id));

    return { success: true };
  });

export const deleteNewsArticle = createServerFn({ method: "POST" })
  .inputValidator(deleteNewsArticleSchema)
  .handler(async ({ data }) => {
    await requireAdmin();
    rateLimit("admin-news-mutate", 30, 60000);
    const d1 = await getD1();
    const db = getDb(d1);

    const existing = await db
      .select({ id: newsArticles.id })
      .from(newsArticles)
      .where(eq(newsArticles.id, data.id))
      .get();
    if (!existing) throw new Error("News article not found");

    await db.delete(newsArticles).where(eq(newsArticles.id, data.id));
    return { success: true };
  });
