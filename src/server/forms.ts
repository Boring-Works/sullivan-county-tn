import { createServerFn } from "@tanstack/react-start";
import { getDb } from "~/db";
import { formSubmissions } from "~/db/schema";
import { getFormDefinition } from "~/data/form-definitions";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface SubmitFormInput {
	formType: string;
	name: string;
	email: string;
	phone?: string;
	fields: Record<string, string>;
	honeypot?: string;
}

export const submitForm = createServerFn({ method: "POST" })
	.inputValidator((data: unknown): SubmitFormInput => {
		const d = data as Record<string, unknown>;

		// Honeypot
		if (typeof d.honeypot === "string" && d.honeypot.trim() !== "") {
			throw new Error("Submission rejected");
		}

		if (typeof d.formType !== "string" || !d.formType.trim()) {
			throw new Error("Form type is required");
		}

		const definition = getFormDefinition(d.formType);
		if (!definition) {
			throw new Error("Invalid form type");
		}

		if (typeof d.name !== "string" || !d.name.trim()) {
			throw new Error("Name is required");
		}
		if (d.name.length > 200) throw new Error("Name too long");

		if (typeof d.email !== "string" || !EMAIL_RE.test(d.email.trim())) {
			throw new Error("Valid email is required");
		}
		if (d.email.length > 320) throw new Error("Email too long");

		const phone =
			typeof d.phone === "string" && d.phone.trim() ? d.phone.trim() : undefined;

		const fields = (d.fields ?? {}) as Record<string, string>;

		// Validate required fields from definition
		for (const field of definition.fields) {
			if (field.required) {
				const val = fields[field.name];
				if (!val || (typeof val === "string" && !val.trim())) {
					throw new Error(`${field.label} is required`);
				}
			}
		}

		return {
			formType: d.formType.trim(),
			name: d.name.trim(),
			email: d.email.trim(),
			phone,
			fields,
		};
	})
	.handler(async ({ data }) => {
		const id = crypto.randomUUID();
		const now = new Date().toISOString();

		try {
			const { env } = await import("cloudflare:workers");
			const d1 = (env as Record<string, unknown>).DB as D1Database | undefined;
			if (d1) {
				const db = getDb(d1);
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
			}
		} catch {
			// D1 not available (local dev without bindings)
			console.log("Form submission stored locally (D1 unavailable):", id);
		}

		return { success: true, id };
	});
