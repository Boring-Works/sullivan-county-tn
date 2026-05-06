# Current State — Sullivan County TN Government Website

**Date:** May 6, 2026
**Live:** https://sullivan-county-tn.codyboring.workers.dev
**Repo:** https://github.com/Boring-Works/sullivan-county-tn

---

## Project Type

TanStack Start v1.167.64 SSR web application deployed to Cloudflare Workers. Single-package repository (not a monorepo). No Expo, no mobile app.

---

## What Exists Now

### Frontend (37 files, ~8,500 lines)

| Area | Status | Files |
|------|--------|-------|
| Layout shell | COMPLETE | `__root.tsx`, `SiteNav`, `SiteFooter`, `AnnouncementBanner` |
| Homepage | COMPLETE | `index.tsx`, `HeroBanner`, `QuickServices`, `DepartmentCategories`, `CommunityHighlights`, `NewsSection`, `AboutSection` |
| Departments (25) | COMPLETE | `departments/index.tsx`, `departments/$slug.tsx`, `DepartmentCard`, `DepartmentDetail` |
| Commissioners (24) | COMPLETE | `commissioners.tsx`, `CommissionerGrid`, `CommissionerCard` |
| News | COMPLETE | `news/index.tsx`, `news/$slug.tsx`, `NewsCard`, `NewsDetail` |
| Documents (115 files, 17 categories) | COMPLETE | `documents.tsx` |
| Calendar | COMPLETE | `calendar.tsx` |
| Contact + Forms | COMPLETE | `contact.tsx`, `forms/index.tsx`, `forms/$type.tsx`, `FormLayout`, `FormField` |
| Heritage Layer (11 routes) | COMPLETE | `history/index.tsx`, `history/timeline.tsx`, `history/$slug.tsx`, `communities/index.tsx`, `communities/$slug.tsx` + 7 heritage components |
| Civic Pages (8 routes) | COMPLETE | `about`, `economic-development`, `education`, `transportation`, `people`, `visit`, `employee-services`, `ada-compliance` |
| Privacy Policy | COMPLETE | `privacy-policy.tsx` |
| Admin Dashboard (10 routes) | COMPLETE | `admin/index.tsx`, `admin/login.tsx`, `admin/news/*`, `admin/minutes/*`, `admin/announcements/*`, `admin/submissions.tsx` |
| Health Check | COMPLETE | `api/health.ts` |
| Auth | COMPLETE | `auth.ts` — ULID sessions, timing-safe compare, rate-limited |

### Backend (10 files, ~620 lines)

| File | Purpose | Status |
|------|---------|--------|
| `server/auth.ts` | Admin login/validate/logout | COMPLETE |
| `server/contact.ts` | Contact form → KV | COMPLETE |
| `server/forms.ts` | Form submissions → D1 | COMPLETE |
| `server/admin-news.ts` | News CRUD | COMPLETE |
| `server/admin-minutes.ts` | Minutes CRUD | COMPLETE |
| `server/admin-announcements.ts` | Announcement CRUD | COMPLETE |
| `server/admin-submissions.ts` | Submission management | COMPLETE |
| `server/guard.ts` | Auth guard | COMPLETE |
| `server/csrf.ts` | CSRF module | DEFINED (not yet integrated) |
| `server/rate-limit.ts` | Rate limiting | PARTIAL (in-memory, not reliable on Workers) |

### Data (15 files, ~4,000 lines)

All static TypeScript data files. Validated by unit tests.

| File | Records | Status |
|------|---------|--------|
| `departments.ts` | 25 departments | COMPLETE |
| `commissioners.ts` | 24 commissioners | COMPLETE |
| `news.ts` | 7 news articles | COMPLETE |
| `documents.ts` | 115 documents, 17 categories | COMPLETE |
| `quick-services.ts` | 8 service links | COMPLETE |
| `search-index.ts` | 175+ search items | COMPLETE |
| `heritage-sites.ts` | 8 sites (6 trail stops + 2 non-trail) | COMPLETE |
| `timeline.ts` | 48 events (1761–2025) | COMPLETE |
| `communities.ts` | 6 communities | COMPLETE |
| `notable-people.ts` | 7 people | COMPLETE |
| `employers.ts` | 11 employers + 3 sectors | COMPLETE |
| `education.ts` | 6 school systems | COMPLETE |
| `form-definitions.ts` | 4 form types | COMPLETE |
| `meeting-minutes.ts` | Meeting minutes | COMPLETE |
| `site-config.ts` | SITE_URL, SITE_NAME, CURRENT_YEAR | COMPLETE |

### Database (D1, 5 tables)

| Table | Status |
|-------|--------|
| `news_articles` | COMPLETE — 7 seed articles |
| `meeting_minutes` | SCHEMA READY — no seed data |
| `announcements` | SCHEMA READY — no seed data |
| `form_submissions` | SCHEMA READY — collects from forms |
| `admin_sessions` | SCHEMA READY — ULID-based |

### zod Schemas (7 files)

| Schema | Validated On |
|--------|-------------|
| `auth.ts` | Login password |
| `contact.ts` | name, email, subject, message (+ honeypot) |
| `forms.ts` | formType, name, email, phone, fields |
| `news.ts` | title, slug, summary, content, author, status, url, pdfUrl |
| `minutes.ts` | committee, date, title, summary, pdfUrl, status |
| `announcements.ts` | title, body, linkUrl, active, startsAt, endsAt |
| `submissions.ts` | status (enum: new/reviewed/resolved) |

### Tests (10 files, 24 unit + 198 E2E)

| Type | Files | Tests | Coverage |
|------|-------|-------|----------|
| Unit (Vitest) | 5 | 24 | data integrity, utilities |
| E2E (Playwright) | 5 | 198 | desktop/tablet/mobile, a11y, auth, mega-menu, user flows |

### Design System

- 13 brand color tokens (navy, copper, brass, brass-light, sage, stone, warm-gray, cream, parchment, slate, courts, safety, community) — all WCAG AA compliant at 4.5:1+ contrast
- 2 fonts: Libre Caslon Text (display) + Outfit (body)
- Mountain ridge SVG dividers, scroll-reveal animations, glass-morphism navigation
- shadcn/ui primitives (badge, button, card)
- i18n: English + Spanish (87 keys, all translated)

### Infrastructure

| Service | Purpose | Status |
|---------|---------|--------|
| Cloudflare Workers | Primary hosting | COMPLETE |
| D1 | Structured data (form submissions, news, minutes, sessions) | COMPLETE |
| KV | Contact form submissions (90-day TTL) | COMPLETE |
| Wrangler 4.88.0 | CLI management | COMPLETE |
| TypeScript strict | Type checking | COMPLETE |
| Biome 2.4.14 | Lint + format | COMPLETE |
| npm | Package manager | COMPLETE |
| GitHub Actions | CI (lint + typecheck + test) | CONFIGURED (not verified) |

### Security

| Feature | Status |
|---------|--------|
| Auth gates on all admin endpoints | COMPLETE |
| Timing-safe password comparison (SHA-256) | COMPLETE |
| ULID-based session IDs | COMPLETE |
| Rate limiting (login 5/60s) | COMPLETE (in-memory, per-isolate) |
| XSS sanitization (sanitize-html) | COMPLETE |
| Structured JSON logging (no PII) | COMPLETE |
| CSRF protection | DEFINED (module exists, not integrated into endpoints) |
| CSP via _headers | COMPLETE |
| COEP, COOP headers | COMPLETE |
| HSTS with preload | COMPLETE |
| honeypot spam protection | COMPLETE |

---

## What Is Mocked / Missing

| Area | Status | Notes |
|------|--------|-------|
| Announcement data | EMPTY | `announcements[]` array is empty in AnnouncementBanner.tsx |
| Admin meeting minutes seed data | EMPTY | Schema exists, no data loaded |
| Admin announcements seed data | EMPTY | Schema exists, no data loaded |
| CSRF integration | NOT WIRED | Module `csrf.ts` exists but not called from any endpoint |
| Rate limiting (production) | BROKEN ON WORKERS | In-memory `Map` doesn't work across isolates |
| Scroll-driven hero parallax | COMPLETE | `translate3d` GPU-composited, rAF-throttled, 0.5 speed, `will-change: transform`, 130% image scale, respects `prefers-reduced-motion` |
| Code-split SearchDialog | NOT VERIFIED | `React.lazy` import exists but bundle size impact not measured |
| Google Maps click-to-load | NOT VERIFIED | Placeholder exists but actual map load not tested |
| CF Web Analytics | NOT CONFIGURED | Token placeholder, no analytics flowing |
| Form `$type` route validation | PARTIAL | Zod schema validates server-side but client-side validation uses raw `useState` |

---

## What Is Broken

| Issue | Severity | Status |
|-------|----------|--------|
| React hydration error #418 on non-home pages | MEDIUM | Mega-menu now uses native DOM listeners + CSS fallback; error persists but is cosmetic only |
| In-memory rate limiting doesn't work across Workers isolates | HIGH | All rate-limited endpoints share per-isolate buckets |
| CSRF module is dead code | MEDIUM | Defined but never imported/used |

---

## Key Numbers

| Metric | Value |
|--------|-------|
| Routes | 25+ |
| Components | 37 |
| Data files | 15 |
| Server functions | 10 |
| zod schemas | 7 |
| Unit tests | 24 |
| E2E tests | 198 |
| Brand tokens | 13 |
| i18n keys | 87 (en + es) |
| Build size | 747 KB (worker entry) |
| Build time | ~3.0s |
| Lint errors | 0 |
