import { createServerFn } from "@tanstack/react-start";
import { desc, eq } from "drizzle-orm";
import { getDb } from "~/db";
import { announcements } from "~/db/schema";

function getD1() {
	return import("cloudflare:workers").then(({ env }) => {
		const d1 = (env as Record<string, unknown>).DB as D1Database | undefined;
		if (!d1) throw new Error("D1 not available");
		return d1;
	});
}

export const listAnnouncements = createServerFn({ method: "GET" }).handler(async () => {
	const d1 = await getD1();
	const db = getDb(d1);
	return db.select().from(announcements).orderBy(desc(announcements.createdAt)).all();
});

export const createAnnouncement = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => {
		const d = data as Record<string, unknown>;
		if (!d.title || !d.body) throw new Error("Title and body are required");
		return d as {
			title: string;
			body: string;
			linkUrl?: string;
			active?: boolean;
			startsAt?: string;
			endsAt?: string;
		};
	})
	.handler(async ({ data }) => {
		const d1 = await getD1();
		const db = getDb(d1);
		const id = crypto.randomUUID();
		const now = new Date().toISOString();

		await db.insert(announcements).values({
			id,
			title: data.title,
			body: data.body,
			linkUrl: data.linkUrl || null,
			active: data.active ?? true,
			startsAt: data.startsAt || null,
			endsAt: data.endsAt || null,
			createdAt: now,
			updatedAt: now,
		});

		return { id };
	});

export const updateAnnouncement = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => {
		const d = data as Record<string, unknown>;
		if (!d.id) throw new Error("ID required");
		return d as {
			id: string;
			title?: string;
			body?: string;
			linkUrl?: string;
			active?: boolean;
			startsAt?: string;
			endsAt?: string;
		};
	})
	.handler(async ({ data }) => {
		const d1 = await getD1();
		const db = getDb(d1);
		const now = new Date().toISOString();

		const { id, ...updates } = data;
		await db
			.update(announcements)
			.set({ ...updates, updatedAt: now })
			.where(eq(announcements.id, id));

		return { success: true };
	});

export const deleteAnnouncement = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => {
		const d = data as { id: string };
		if (!d.id) throw new Error("ID required");
		return d;
	})
	.handler(async ({ data }) => {
		const d1 = await getD1();
		const db = getDb(d1);
		await db.delete(announcements).where(eq(announcements.id, data.id));
		return { success: true };
	});
