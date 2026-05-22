import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { ulid } from "ulidx";
import { getFormDefinition } from "~/data/form-definitions";
import { getDb } from "~/db";
import { formSubmissions } from "~/db/schema";
import { createReceiptId } from "~/lib/receipts";
import { submitFormSchema } from "~/lib/schemas/forms";
import { getDB } from "~/server/env";
import { rateLimit } from "~/server/rate-limit";

const MAX_FIELD_LENGTH = 5_000;

function validateFields(
  definition: NonNullable<ReturnType<typeof getFormDefinition>>,
  fields: Record<string, string>,
) {
  const allowed = new Map(definition.fields.map((field) => [field.name, field]));

  for (const key of Object.keys(fields)) {
    if (!allowed.has(key)) throw new Error("Unexpected form field");
  }

  for (const field of definition.fields) {
    const value = fields[field.name] ?? "";
    const trimmed = value.trim();

    if (field.required && !trimmed) {
      throw new Error(`${field.label} is required`);
    }

    if (!trimmed) continue;
    if (value.length > MAX_FIELD_LENGTH) {
      throw new Error(`${field.label} is too long`);
    }

    if (field.type === "select") {
      const allowedValues = new Set(field.options?.map((option) => option.value) ?? []);
      if (!allowedValues.has(value)) throw new Error(`${field.label} is invalid`);
    }

    if (field.type === "date" && Number.isNaN(Date.parse(value))) {
      throw new Error(`${field.label} must be a valid date`);
    }

    if (field.type === "number" && !/^-?\d+(\.\d+)?$/.test(trimmed)) {
      throw new Error(`${field.label} must be a number`);
    }

    if (field.type === "email" && !/^\S+@\S+\.\S+$/.test(trimmed)) {
      throw new Error(`${field.label} must be a valid email`);
    }

    if (field.type === "tel" && !/^[+\d().\-\s]{7,32}$/.test(trimmed)) {
      throw new Error(`${field.label} must be a valid phone number`);
    }
  }
}

export const submitForm = createServerFn({ method: "POST" })
  .inputValidator(submitFormSchema)
  .handler(async ({ data }) => {
    if (data.honeypot && data.honeypot.trim() !== "") {
      throw new Error("Submission rejected");
    }

    const definition = getFormDefinition(data.formType);
    if (!definition) {
      throw new Error("Invalid form type");
    }

    validateFields(definition, data.fields);

    rateLimit("form-submit", 3, 60000);
    const db = getDb(getDB());
    const existing = await db
      .select({ id: formSubmissions.id, receiptId: formSubmissions.receiptId })
      .from(formSubmissions)
      .where(eq(formSubmissions.idempotencyKey, data.idempotencyKey))
      .get();
    if (existing?.receiptId)
      return { success: true, id: existing.id, receiptId: existing.receiptId };

    const id = ulid();
    const receiptId = createReceiptId("FORM", id);
    const now = new Date().toISOString();

    try {
      await db.insert(formSubmissions).values({
        id,
        formType: data.formType,
        status: "new",
        name: data.name,
        email: data.email,
        phone: data.phone ?? null,
        data: JSON.stringify(data.fields),
        idempotencyKey: data.idempotencyKey,
        receiptId,
        createdAt: now,
        updatedAt: now,
      });
    } catch {
      const duplicate = await db
        .select({ id: formSubmissions.id, receiptId: formSubmissions.receiptId })
        .from(formSubmissions)
        .where(eq(formSubmissions.idempotencyKey, data.idempotencyKey))
        .get();
      if (duplicate?.receiptId) {
        return { success: true, id: duplicate.id, receiptId: duplicate.receiptId };
      }
      console.error(
        JSON.stringify({ event: "form_submission_store_failed", reason: "D1 unavailable" }),
      );
      throw new Error(
        "We couldn't save your form. Please try again or call the county office for help.",
      );
    }

    return { success: true, id, receiptId };
  });
