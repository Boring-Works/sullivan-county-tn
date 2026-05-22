import { z } from "zod";
import { idempotencyKeySchema } from "~/lib/receipts";

export const submitPageFeedbackSchema = z.object({
  page: z.string().min(1).max(500),
  helpful: z.boolean(),
  idempotencyKey: idempotencyKeySchema,
  comment: z.string().max(1000).optional(),
});

export type SubmitPageFeedbackInput = z.infer<typeof submitPageFeedbackSchema>;
