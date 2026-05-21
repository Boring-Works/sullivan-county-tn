import { createServerFn } from "@tanstack/react-start";
import { ulid } from "ulidx";
import { getFormDefinition } from "~/data/form-definitions";
import { getDb } from "~/db";
import { formSubmissions } from "~/db/schema";
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
    const id = ulid();
    const now = new Date().toISOString();

    try {
      const db = getDb(getDB());
      await db.insert(formSubmissions).values({
        id,
        formType: data.formType,
        status: "new",
        name: data.name,
        email: data.email,
        phone: data.phone ?? null,
        data: JSON.stringify(data.fields),
        createdAt: now,
        updatedAt: now,
      });
    } catch {
      console.error(
        JSON.stringify({ event: "form_submission_store_failed", reason: "D1 unavailable" }),
      );
      return { success: false, error: "storage_unavailable" };
    }

    return { success: true, id };
  });
