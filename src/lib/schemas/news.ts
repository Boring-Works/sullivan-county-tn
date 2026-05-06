import { z } from "zod";

export const createNewsArticleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  summary: z.string().min(1, "Summary is required"),
  content: z.string().min(1, "Content is required"),
  author: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
  url: z.string().url().optional().or(z.literal("")),
  pdfUrl: z.string().url().optional().or(z.literal("")),
  publishedAt: z.string().optional(),
});

export const updateNewsArticleSchema = z.object({
  id: z.string().min(1, "ID is required"),
  title: z.string().optional(),
  slug: z.string().optional(),
  summary: z.string().optional(),
  content: z.string().optional(),
  author: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
  url: z.string().url().optional().or(z.literal("")),
  pdfUrl: z.string().url().optional().or(z.literal("")),
  publishedAt: z.string().optional(),
});

export const deleteNewsArticleSchema = z.object({
  id: z.string().min(1, "ID is required"),
});

export type CreateNewsArticleInput = z.infer<typeof createNewsArticleSchema>;
export type UpdateNewsArticleInput = z.infer<typeof updateNewsArticleSchema>;
