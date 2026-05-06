import { createServerFn } from "@tanstack/react-start";
import { desc, eq } from "drizzle-orm";
import sanitizeHtml from "sanitize-html";
import { ulid } from "ulidx";
import { getDb } from "~/db";
import { announcements } from "~/db/schema";
import {
  createAnnouncementSchema,
  deleteAnnouncementSchema,
  updateAnnouncementSchema,
} from "~/lib/schemas/announcements";
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

export const listAnnouncements = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const d1 = await getD1();
  const db = getDb(d1);
  return db.select().from(announcements).orderBy(desc(announcements.createdAt)).all();
});

export const createAnnouncement = createServerFn({ method: "POST" })
  .inputValidator(createAnnouncementSchema)
  .handler(async ({ data }) => {
    await requireAdmin();
    rateLimit("admin-announcements-mutate", 30, 60000);
    const d1 = await getD1();
    const db = getDb(d1);
    const id = ulid();
    const now = new Date().toISOString();

    await db.insert(announcements).values({
      id,
      title: sanitize(data.title),
      body: sanitize(data.body),
      linkUrl: data.linkUrl || null,
      severity: data.severity ?? "info",
      active: data.active ?? true,
      startsAt: data.startsAt || null,
      endsAt: data.endsAt || null,
      createdAt: now,
      updatedAt: now,
    });

    return { id };
  });

export const updateAnnouncement = createServerFn({ method: "POST" })
  .inputValidator(updateAnnouncementSchema)
  .handler(async ({ data }) => {
    await requireAdmin();
    rateLimit("admin-announcements-mutate", 30, 60000);
    const d1 = await getD1();
    const db = getDb(d1);

    const existing = await db
      .select({ id: announcements.id })
      .from(announcements)
      .where(eq(announcements.id, data.id))
      .get();
    if (!existing) throw new Error("Announcement not found");

    const now = new Date().toISOString();

    const { id, ...updates } = data;
    if (updates.title !== undefined) {
      updates.title = sanitize(updates.title);
    }
    if (updates.body !== undefined) {
      updates.body = sanitize(updates.body);
    }
    await db
      .update(announcements)
      .set({ ...updates, updatedAt: now })
      .where(eq(announcements.id, id));

    return { success: true };
  });

export const deleteAnnouncement = createServerFn({ method: "POST" })
  .inputValidator(deleteAnnouncementSchema)
  .handler(async ({ data }) => {
    await requireAdmin();
    rateLimit("admin-announcements-mutate", 30, 60000);
    const d1 = await getD1();
    const db = getDb(d1);

    const existing = await db
      .select({ id: announcements.id })
      .from(announcements)
      .where(eq(announcements.id, data.id))
      .get();
    if (!existing) throw new Error("Announcement not found");

    await db.delete(announcements).where(eq(announcements.id, data.id));
    return { success: true };
  });
