import { createServerFn } from "@tanstack/react-start";
import { desc, eq } from "drizzle-orm";
import { getDb } from "~/db";
import { formSubmissions } from "~/db/schema";
import { updateSubmissionStatusSchema } from "~/lib/schemas/submissions";
import { getDB } from "~/server/env";
import { requireAdmin } from "~/server/guard";

export const listSubmissions = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const d1 = getDB();
  const db = getDb(d1);
  return db.select().from(formSubmissions).orderBy(desc(formSubmissions.createdAt)).all();
});

export const updateSubmissionStatus = createServerFn({ method: "POST" })
  .inputValidator(updateSubmissionStatusSchema)
  .handler(async ({ data }) => {
    await requireAdmin();
    const d1 = getDB();
    const db = getDb(d1);
    const now = new Date().toISOString();

    await db
      .update(formSubmissions)
      .set({ status: data.status, updatedAt: now })
      .where(eq(formSubmissions.id, data.id));

    return { success: true };
  });
