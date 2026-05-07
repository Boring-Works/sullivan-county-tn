import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// ── Form Submissions (F2) ────────────────────────────────────────
export const formSubmissions = sqliteTable(
  "form_submissions",
  {
    id: text("id").primaryKey(),
    formType: text("form_type").notNull(), // building-permit, code-complaint, public-records, general-feedback
    status: text("status").notNull().default("new"), // new, reviewed, resolved
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    data: text("data").notNull(), // JSON blob of form-specific fields
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (t) => [
    index("idx_form_submissions_status").on(t.status),
    index("idx_form_submissions_created_at").on(t.createdAt),
  ],
);

// ── News Articles (F4 — CMS-managed) ────────────────────────────
export const newsArticles = sqliteTable(
  "news_articles",
  {
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
  },
  (t) => [
    index("idx_news_articles_status").on(t.status),
    index("idx_news_articles_published_at").on(t.publishedAt),
  ],
);

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

// ── Weather Observations (NWS-sourced history for trend chart) ──
export const weatherObservations = sqliteTable(
  "weather_observations",
  {
    id: text("id").primaryKey(),
    observedAt: text("observed_at").notNull(), // ISO 8601
    temperatureF: integer("temperature_f"),
    feelsLikeF: integer("feels_like_f"),
    humidity: integer("humidity"), // percent 0-100
    windMph: integer("wind_mph"),
    windDirection: text("wind_direction"),
    conditions: text("conditions"), // "Partly Cloudy", "Thunderstorms", etc.
    alertsCount: integer("alerts_count").notNull().default(0),
    createdAt: text("created_at").notNull(),
  },
  (t) => [index("idx_weather_observations_observed_at").on(t.observedAt)],
);

// ── Page Feedback ("Was this page helpful?") ────────────────────
export const pageFeedback = sqliteTable(
  "page_feedback",
  {
    id: text("id").primaryKey(),
    page: text("page").notNull(), // route pathname, e.g. "/departments/county-clerk"
    helpful: integer("helpful", { mode: "boolean" }).notNull(),
    comment: text("comment"),
    userAgent: text("user_agent"),
    createdAt: text("created_at").notNull(),
  },
  (t) => [
    index("idx_page_feedback_page").on(t.page),
    index("idx_page_feedback_created_at").on(t.createdAt),
  ],
);

// ── Drizzle-derived Zod schemas for type-safe form ↔ DB validation ────
// These are generated from the table definitions above so any schema change
// automatically propagates to Zod validation. Hand-written schemas in
// src/lib/schemas/* survive only where they add cross-field refines or
// transforms (e.g. honeypot rejection, sanitization).
//
// Usage:
//   import { newsArticleInsertSchema } from "~/db/schema";
//   const parsed = newsArticleInsertSchema.parse(input);

import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const newsArticleSelectSchema = createSelectSchema(newsArticles);
export const newsArticleInsertSchema = createInsertSchema(newsArticles);
export const announcementSelectSchema = createSelectSchema(announcements);
export const announcementInsertSchema = createInsertSchema(announcements);
export const meetingMinutesSelectSchema = createSelectSchema(meetingMinutes);
export const meetingMinutesInsertSchema = createInsertSchema(meetingMinutes);
export const formSubmissionSelectSchema = createSelectSchema(formSubmissions);
export const formSubmissionInsertSchema = createInsertSchema(formSubmissions);
export const pageFeedbackSelectSchema = createSelectSchema(pageFeedback);
export const pageFeedbackInsertSchema = createInsertSchema(pageFeedback);
export const weatherObservationSelectSchema = createSelectSchema(weatherObservations);
export const weatherObservationInsertSchema = createInsertSchema(weatherObservations);

export type NewsArticle = typeof newsArticles.$inferSelect;
export type NewNewsArticle = typeof newsArticles.$inferInsert;
export type Announcement = typeof announcements.$inferSelect;
export type NewAnnouncement = typeof announcements.$inferInsert;
export type MeetingMinutesRow = typeof meetingMinutes.$inferSelect;
export type NewMeetingMinutesRow = typeof meetingMinutes.$inferInsert;
export type FormSubmission = typeof formSubmissions.$inferSelect;
export type NewFormSubmission = typeof formSubmissions.$inferInsert;
export type PageFeedback = typeof pageFeedback.$inferSelect;
export type NewPageFeedback = typeof pageFeedback.$inferInsert;
export type WeatherObservation = typeof weatherObservations.$inferSelect;
export type NewWeatherObservation = typeof weatherObservations.$inferInsert;
