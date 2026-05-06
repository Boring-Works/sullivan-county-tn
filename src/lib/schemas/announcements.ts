import { z } from "zod";

export const createAnnouncementSchema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Body is required"),
  linkUrl: z.string().url().optional().or(z.literal("")),
  active: z.boolean().optional(),
  startsAt: z.string().optional(),
  endsAt: z.string().optional(),
});

export const updateAnnouncementSchema = z.object({
  id: z.string().min(1, "ID is required"),
  title: z.string().optional(),
  body: z.string().optional(),
  linkUrl: z.string().url().optional().or(z.literal("")),
  active: z.boolean().optional(),
  startsAt: z.string().optional(),
  endsAt: z.string().optional(),
});

export const deleteAnnouncementSchema = z.object({
  id: z.string().min(1, "ID is required"),
});

export type CreateAnnouncementInput = z.infer<typeof createAnnouncementSchema>;
export type UpdateAnnouncementInput = z.infer<typeof updateAnnouncementSchema>;
