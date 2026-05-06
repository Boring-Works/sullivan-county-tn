import { z } from "zod";

export const submitPageFeedbackSchema = z.object({
  page: z.string().min(1).max(500),
  helpful: z.boolean(),
  comment: z.string().max(1000).optional(),
});

export type SubmitPageFeedbackInput = z.infer<typeof submitPageFeedbackSchema>;
