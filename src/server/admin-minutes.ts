import { createServerFn } from "@tanstack/react-start";
import { desc, eq } from "drizzle-orm";
import sanitizeHtml from "sanitize-html";
import { ulid } from "ulidx";
import { getDb } from "~/db";
import { meetingMinutes } from "~/db/schema";
import {
  createMinutesEntrySchema,
  deleteMinutesEntrySchema,
  updateMinutesEntrySchema,
} from "~/lib/schemas/minutes";
import { getDB } from "~/server/env";
import { requireAdmin } from "~/server/guard";
import { rateLimit } from "~/server/rate-limit";

function sanitize(content: string): string {
  return sanitizeHtml(content, { allowedTags: [], allowedAttributes: {} });
}

export const listMinutes = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();

  const d1 = getDB();
  const db = getDb(d1);
  return db.select().from(meetingMinutes).orderBy(desc(meetingMinutes.date)).all();
});

export const createMinutesEntry = createServerFn({ method: "POST" })
  .inputValidator(createMinutesEntrySchema)
  .handler(async ({ data }) => {
    await requireAdmin();
    rateLimit("admin-minutes-mutate", 30, 60000);

    const d1 = getDB();
    const db = getDb(d1);
    const id = ulid();
    const now = new Date().toISOString();

    await db.insert(meetingMinutes).values({
      id,
      committee: data.committee,
      date: data.date,
      title: sanitize(data.title),
      summary: data.summary ? sanitize(data.summary) : null,
      pdfUrl: data.pdfUrl || null,
      status: data.status || "published",
      createdAt: now,
      updatedAt: now,
    });

    return { id };
  });

export const updateMinutesEntry = createServerFn({ method: "POST" })
  .inputValidator(updateMinutesEntrySchema)
  .handler(async ({ data }) => {
    await requireAdmin();
    rateLimit("admin-minutes-mutate", 30, 60000);

    const d1 = getDB();
    const db = getDb(d1);

    const existing = await db
      .select({ id: meetingMinutes.id })
      .from(meetingMinutes)
      .where(eq(meetingMinutes.id, data.id))
      .get();
    if (!existing) throw new Error("Minutes entry not found");

    const now = new Date().toISOString();

    const { id, ...updates } = data;
    if (updates.title !== undefined) {
      updates.title = sanitize(updates.title);
    }
    if (updates.summary !== undefined) {
      updates.summary = sanitize(updates.summary);
    }

    await db
      .update(meetingMinutes)
      .set({ ...updates, updatedAt: now })
      .where(eq(meetingMinutes.id, id));

    return { success: true };
  });

export const deleteMinutesEntry = createServerFn({ method: "POST" })
  .inputValidator(deleteMinutesEntrySchema)
  .handler(async ({ data }) => {
    await requireAdmin();
    rateLimit("admin-minutes-mutate", 30, 60000);

    const d1 = getDB();
    const db = getDb(d1);

    const existing = await db
      .select({ id: meetingMinutes.id })
      .from(meetingMinutes)
      .where(eq(meetingMinutes.id, data.id))
      .get();
    if (!existing) throw new Error("Minutes entry not found");

    await db.delete(meetingMinutes).where(eq(meetingMinutes.id, data.id));
    return { success: true };
  });
