import { z } from "zod";

export const createMinutesEntrySchema = z.object({
  committee: z.string().min(1, "Committee is required"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}/, "Date must be YYYY-MM-DD"),
  title: z.string().min(1, "Title is required").max(500),
  summary: z.string().max(2000).optional(),
  pdfUrl: z.string().url().optional().or(z.literal("")),
  status: z.enum(["draft", "published", "archived"]).optional(),
});

export const updateMinutesEntrySchema = z.object({
  id: z.string().min(1, "ID is required"),
  committee: z.string().optional(),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}/, "Date must be YYYY-MM-DD")
    .optional(),
  title: z.string().max(500).optional(),
  summary: z.string().max(2000).optional(),
  pdfUrl: z.string().url().optional().or(z.literal("")),
  status: z.enum(["draft", "published", "archived"]).optional(),
});

export const deleteMinutesEntrySchema = z.object({
  id: z.string().min(1, "ID is required"),
});

export type CreateMinutesEntryInput = z.infer<typeof createMinutesEntrySchema>;
export type UpdateMinutesEntryInput = z.infer<typeof updateMinutesEntrySchema>;
