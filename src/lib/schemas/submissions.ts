import { z } from "zod";

export const updateSubmissionStatusSchema = z.object({
  id: z.string().min(1, "ID is required"),
  status: z.string().min(1, "Status is required"),
});

export type UpdateSubmissionStatusInput = z.infer<typeof updateSubmissionStatusSchema>;
