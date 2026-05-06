import { z } from "zod";

export const createMinutesEntrySchema = z.object({
  committee: z.string().min(1, "Committee is required"),
  date: z.string().min(1, "Date is required"),
  title: z.string().min(1, "Title is required"),
  summary: z.string().optional(),
  pdfUrl: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
});

export const updateMinutesEntrySchema = z.object({
  id: z.string().min(1, "ID is required"),
  committee: z.string().optional(),
  date: z.string().optional(),
  title: z.string().optional(),
  summary: z.string().optional(),
  pdfUrl: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
});

export const deleteMinutesEntrySchema = z.object({
  id: z.string().min(1, "ID is required"),
});

export type CreateMinutesEntryInput = z.infer<typeof createMinutesEntrySchema>;
export type UpdateMinutesEntryInput = z.infer<typeof updateMinutesEntrySchema>;
