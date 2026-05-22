import { z } from "zod";
import { idempotencyKeySchema } from "~/lib/receipts";

export const submitFormSchema = z.object({
  formType: z.string().min(1, "Form type is required"),
  name: z.string().min(1, "Name is required").max(200, "Name too long"),
  email: z.string().email("Valid email is required").max(320, "Email too long"),
  phone: z.string().max(32, "Phone number too long").optional(),
  fields: z.record(z.string(), z.string().max(5000, "Field value too long")).default({}),
  idempotencyKey: idempotencyKeySchema,
  honeypot: z.string().optional(),
});

export type SubmitFormInput = z.infer<typeof submitFormSchema>;
