import { createServerFn } from "@tanstack/react-start";
import { desc, eq } from "drizzle-orm";
import { getDb } from "~/db";
import { formSubmissions } from "~/db/schema";
import { updateSubmissionStatusSchema } from "~/lib/schemas/submissions";
import { requireAdmin } from "~/server/guard";

function getD1() {
  return import("cloudflare:workers").then(({ env }) => {
    const d1 = (env as Record<string, unknown>).DB as D1Database | undefined;
    if (!d1) throw new Error("D1 not available");
    return d1;
  });
}

export const listSubmissions = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const d1 = await getD1();
  const db = getDb(d1);
  return db.select().from(formSubmissions).orderBy(desc(formSubmissions.createdAt)).all();
});

export const updateSubmissionStatus = createServerFn({ method: "POST" })
  .inputValidator(updateSubmissionStatusSchema)
  .handler(async ({ data }) => {
    await requireAdmin();
    const d1 = await getD1();
    const db = getDb(d1);
    const now = new Date().toISOString();

    await db
      .update(formSubmissions)
      .set({ status: data.status, updatedAt: now })
      .where(eq(formSubmissions.id, data.id));

    return { success: true };
  });
