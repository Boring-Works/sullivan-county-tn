import { createServerFn } from "@tanstack/react-start";
import { and, desc, eq, isNull, lte, or } from "drizzle-orm";
import { getDb } from "~/db";
import { announcements } from "~/db/schema";

function getD1() {
  return import("cloudflare:workers").then(({ env }) => {
    const d1 = (env as Record<string, unknown>).DB as D1Database | undefined;
    if (!d1) return null;
    return d1;
  });
}

export interface PublicAnnouncement {
  id: string;
  title: string;
  body: string;
  linkUrl: string | null;
  type: "info" | "urgent";
}

export const listPublicAnnouncements = createServerFn({ method: "GET" }).handler(
  async (): Promise<PublicAnnouncement[]> => {
    const d1 = await getD1();
    if (!d1) return [];
    const db = getDb(d1);
    const now = new Date().toISOString();

    const rows = await db
      .select()
      .from(announcements)
      .where(
        and(
          eq(announcements.active, true),
          or(isNull(announcements.startsAt), lte(announcements.startsAt, now)),
        ),
      )
      .orderBy(desc(announcements.createdAt))
      .all();

    return rows
      .filter((r) => !r.endsAt || r.endsAt > now)
      .map((r) => ({
        id: r.id,
        title: r.title,
        body: r.body,
        linkUrl: r.linkUrl,
        type: (r.severity ?? "info") as "info" | "urgent",
      }));
  },
);
