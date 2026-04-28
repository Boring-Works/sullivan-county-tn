import { createServerFn } from "@tanstack/react-start";
import { desc, eq } from "drizzle-orm";
import { getDb } from "~/db";
import { newsArticles } from "~/db/schema";

function getD1() {
	return import("cloudflare:workers").then(({ env }) => {
		const d1 = (env as Record<string, unknown>).DB as D1Database | undefined;
		if (!d1) throw new Error("D1 not available");
		return d1;
	});
}

export const listNews = createServerFn({ method: "GET" }).handler(async () => {
	const d1 = await getD1();
	const db = getDb(d1);
	return db.select().from(newsArticles).orderBy(desc(newsArticles.publishedAt)).all();
});

export const getNewsArticle = createServerFn({ method: "GET" })
	.inputValidator((data: unknown) => {
		const d = data as { id: string };
		if (!d.id) throw new Error("ID required");
		return d;
	})
	.handler(async ({ data }) => {
		const d1 = await getD1();
		const db = getDb(d1);
		return db.select().from(newsArticles).where(eq(newsArticles.id, data.id)).get();
	});

export const createNewsArticle = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => {
		const d = data as Record<string, unknown>;
		if (!d.title || !d.slug || !d.summary || !d.content) {
			throw new Error("Title, slug, summary, and content are required");
		}
		return d as {
			title: string;
			slug: string;
			author: string;
			summary: string;
			content: string;
			status: string;
			url?: string;
			pdfUrl?: string;
			publishedAt?: string;
		};
	})
	.handler(async ({ data }) => {
		const d1 = await getD1();
		const db = getDb(d1);
		const id = crypto.randomUUID();
		const now = new Date().toISOString();

		await db.insert(newsArticles).values({
			id,
			title: data.title,
			slug: data.slug,
			author: data.author || "Sullivan County",
			summary: data.summary,
			content: data.content,
			status: data.status || "draft",
			url: data.url || null,
			pdfUrl: data.pdfUrl || null,
			publishedAt: data.publishedAt || (data.status === "published" ? now : null),
			createdAt: now,
			updatedAt: now,
		});

		return { id };
	});

export const updateNewsArticle = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => {
		const d = data as Record<string, unknown>;
		if (!d.id) throw new Error("ID required");
		return d as {
			id: string;
			title?: string;
			slug?: string;
			author?: string;
			summary?: string;
			content?: string;
			status?: string;
			url?: string;
			pdfUrl?: string;
			publishedAt?: string;
		};
	})
	.handler(async ({ data }) => {
		const d1 = await getD1();
		const db = getDb(d1);
		const now = new Date().toISOString();

		const { id, ...updates } = data;
		await db
			.update(newsArticles)
			.set({ ...updates, updatedAt: now })
			.where(eq(newsArticles.id, id));

		return { success: true };
	});

export const deleteNewsArticle = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => {
		const d = data as { id: string };
		if (!d.id) throw new Error("ID required");
		return d;
	})
	.handler(async ({ data }) => {
		const d1 = await getD1();
		const db = getDb(d1);
		await db.delete(newsArticles).where(eq(newsArticles.id, data.id));
		return { success: true };
	});
