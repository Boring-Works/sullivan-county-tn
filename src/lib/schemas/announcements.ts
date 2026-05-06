import { z } from "zod";

export const announcementSeverity = z.enum(["info", "urgent"]);
export type AnnouncementSeverity = z.infer<typeof announcementSeverity>;

export const createAnnouncementSchema = z.object({
  title: z.string().min(1, "Title is required").max(500),
  body: z.string().min(1, "Body is required").max(10000),
  linkUrl: z.string().url().optional().or(z.literal("")),
  severity: announcementSeverity.optional(),
  active: z.boolean().optional(),
  startsAt: z.string().datetime().optional(),
  endsAt: z.string().datetime().optional(),
});

export const updateAnnouncementSchema = z.object({
  id: z.string().min(1, "ID is required"),
  title: z.string().max(500).optional(),
  body: z.string().max(10000).optional(),
  linkUrl: z.string().url().optional().or(z.literal("")),
  severity: announcementSeverity.optional(),
  active: z.boolean().optional(),
  startsAt: z.string().datetime().optional(),
  endsAt: z.string().datetime().optional(),
});

export const deleteAnnouncementSchema = z.object({
  id: z.string().min(1, "ID is required"),
});

export type CreateAnnouncementInput = z.infer<typeof createAnnouncementSchema>;
export type UpdateAnnouncementInput = z.infer<typeof updateAnnouncementSchema>;
