import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// ── Form Submissions (F2) ────────────────────────────────────────
export const formSubmissions = sqliteTable("form_submissions", {
  id: text("id").primaryKey(),
  formType: text("form_type").notNull(), // building-permit, code-complaint, public-records, general-feedback
  status: text("status").notNull().default("new"), // new, reviewed, resolved
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  data: text("data").notNull(), // JSON blob of form-specific fields
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

// ── News Articles (F4 — CMS-managed) ────────────────────────────
export const newsArticles = sqliteTable("news_articles", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  author: text("author").notNull(),
  summary: text("summary").notNull(),
  content: text("content").notNull(), // JSON array of paragraphs
  status: text("status").notNull().default("draft"), // draft, published, archived
  url: text("url"), // external source URL
  pdfUrl: text("pdf_url"),
  publishedAt: text("published_at"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

// ── Meeting Minutes (F3/F4) ──────────────────────────────────────
export const meetingMinutes = sqliteTable("meeting_minutes", {
  id: text("id").primaryKey(),
  committee: text("committee").notNull(),
  date: text("date").notNull(), // ISO 8601
  title: text("title").notNull(),
  summary: text("summary"),
  pdfUrl: text("pdf_url"),
  status: text("status").notNull().default("published"), // draft, published, archived
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

// ── Announcements (F4) ──────────────────────────────────────────
export const announcements = sqliteTable("announcements", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  linkUrl: text("link_url"),
  severity: text("severity", { enum: ["info", "urgent"] })
    .notNull()
    .default("info"),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  startsAt: text("starts_at"),
  endsAt: text("ends_at"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

// ── Admin Sessions (F4) ─────────────────────────────────────────
export const adminSessions = sqliteTable("admin_sessions", {
  id: text("id").primaryKey(),
  createdAt: text("created_at").notNull(),
  expiresAt: text("expires_at").notNull(),
});

// ── Page Feedback ("Was this page helpful?") ────────────────────
export const pageFeedback = sqliteTable("page_feedback", {
  id: text("id").primaryKey(),
  page: text("page").notNull(), // route pathname, e.g. "/departments/county-clerk"
  helpful: integer("helpful", { mode: "boolean" }).notNull(),
  comment: text("comment"),
  userAgent: text("user_agent"),
  createdAt: text("created_at").notNull(),
});
