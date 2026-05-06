import { z } from "zod";

export const createNewsArticleSchema = z.object({
  title: z.string().min(1, "Title is required").max(500),
  slug: z.string().min(1, "Slug is required").max(200),
  summary: z.string().min(1, "Summary is required").max(2000),
  content: z.string().min(1, "Content is required").max(100000),
  author: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
  url: z.string().url().optional().or(z.literal("")),
  pdfUrl: z.string().url().optional().or(z.literal("")),
  publishedAt: z.string().optional(),
});

export const updateNewsArticleSchema = z.object({
  id: z.string().min(1, "ID is required"),
  title: z.string().max(500).optional(),
  slug: z.string().max(200).optional(),
  summary: z.string().max(2000).optional(),
  content: z.string().max(100000).optional(),
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
