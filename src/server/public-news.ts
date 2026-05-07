import { createServerFn } from "@tanstack/react-start";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";
import type { NewsItem } from "~/data/news";
import { getDb } from "~/db";
import { newsArticles } from "~/db/schema";
import { getDB } from "~/server/env";

function rowToNewsItem(r: typeof newsArticles.$inferSelect): NewsItem {
  return {
    title: r.title,
    date: (r.publishedAt ?? r.createdAt).slice(0, 10),
    author: r.author,
    slug: r.slug,
    summary: r.summary,
    url: r.url ?? undefined,
    pdfUrl: r.pdfUrl ?? undefined,
    // Content from admin is stored as sanitized HTML; surface as htmlContent.
    htmlContent: r.content || undefined,
  };
}

export const listPublicNews = createServerFn({ method: "GET" }).handler(async () => {
  const d1 = getDB();
  const db = getDb(d1);
  const rows = await db
    .select()
    .from(newsArticles)
    .where(eq(newsArticles.status, "published"))
    .orderBy(desc(newsArticles.publishedAt))
    .limit(6)
    .all();
  return rows.map(rowToNewsItem);
});

export const getPublicNewsArticle = createServerFn({ method: "GET" })
  .inputValidator(z.object({ slug: z.string().min(1) }))
  .handler(async ({ data }) => {
    const d1 = getDB();
    const db = getDb(d1);
    const row = await db
      .select()
      .from(newsArticles)
      .where(and(eq(newsArticles.slug, data.slug), eq(newsArticles.status, "published")))
      .get();
    if (!row) return null;
    return rowToNewsItem(row);
  });
