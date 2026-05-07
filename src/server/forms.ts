import { createServerFn } from "@tanstack/react-start";
import { ulid } from "ulidx";
import { getFormDefinition } from "~/data/form-definitions";
import { getDb } from "~/db";
import { formSubmissions } from "~/db/schema";
import { submitFormSchema } from "~/lib/schemas/forms";
import { getDB } from "~/server/env";
import { rateLimit } from "~/server/rate-limit";

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

    for (const field of definition.fields) {
      if (field.required) {
        const val = data.fields[field.name];
        if (!val || (typeof val === "string" && !val.trim())) {
          throw new Error(`${field.label} is required`);
        }
      }
    }

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
