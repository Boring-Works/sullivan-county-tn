import { createServerFn } from "@tanstack/react-start";
import { desc, eq } from "drizzle-orm";
import { getDb } from "~/db";
import { meetingMinutes } from "~/db/schema";

function getD1() {
	return import("cloudflare:workers").then(({ env }) => {
		const d1 = (env as Record<string, unknown>).DB as D1Database | undefined;
		if (!d1) throw new Error("D1 not available");
		return d1;
	});
}

export const listMinutes = createServerFn({ method: "GET" }).handler(async () => {
	const d1 = await getD1();
	const db = getDb(d1);
	return db.select().from(meetingMinutes).orderBy(desc(meetingMinutes.date)).all();
});

export const createMinutesEntry = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => {
		const d = data as Record<string, unknown>;
		if (!d.committee || !d.date || !d.title) {
			throw new Error("Committee, date, and title are required");
		}
		return d as {
			committee: string;
			date: string;
			title: string;
			summary?: string;
			pdfUrl?: string;
			status?: string;
		};
	})
	.handler(async ({ data }) => {
		const d1 = await getD1();
		const db = getDb(d1);
		const id = crypto.randomUUID();
		const now = new Date().toISOString();

		await db.insert(meetingMinutes).values({
			id,
			committee: data.committee,
			date: data.date,
			title: data.title,
			summary: data.summary || null,
			pdfUrl: data.pdfUrl || null,
			status: data.status || "published",
			createdAt: now,
			updatedAt: now,
		});

		return { id };
	});

export const updateMinutesEntry = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => {
		const d = data as Record<string, unknown>;
		if (!d.id) throw new Error("ID required");
		return d as {
			id: string;
			committee?: string;
			date?: string;
			title?: string;
			summary?: string;
			pdfUrl?: string;
			status?: string;
		};
	})
	.handler(async ({ data }) => {
		const d1 = await getD1();
		const db = getDb(d1);
		const now = new Date().toISOString();

		const { id, ...updates } = data;
		await db
			.update(meetingMinutes)
			.set({ ...updates, updatedAt: now })
			.where(eq(meetingMinutes.id, id));

		return { success: true };
	});

export const deleteMinutesEntry = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => {
		const d = data as { id: string };
		if (!d.id) throw new Error("ID required");
		return d;
	})
	.handler(async ({ data }) => {
		const d1 = await getD1();
		const db = getDb(d1);
		await db.delete(meetingMinutes).where(eq(meetingMinutes.id, data.id));
		return { success: true };
	});
