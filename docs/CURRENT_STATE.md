# Current State — Sullivan County TN Government Website

**Date:** May 7, 2026
**Live:** https://sullivan-county-tn.codyboring.workers.dev (version `d6966620-b071-4754-8ba7-0069d76dc521`)
**Repo:** https://github.com/Boring-Works/sullivan-county-tn
**Latest commit:** `93cf3dd` (test: stabilize Departments-panel iteration test)

---

## Last sessions (2026-05-06 → 2026-05-07)

### 2026-05-07 — verb nav + parcel lookup + e2e green
1. **Verb-based primary nav** — replaced heritage-led top nav (History/Communities/Commissioners/News/Calendar/Documents/Contact) with **Pay · Apply · Report · Records · Meetings · Departments · About**. Each verb opens a mega-panel of concrete tasks (GOV.UK / Cook County "I Want To" pattern). Heritage routes consolidated under About. Departments mega-menu preserved as one verb. Definitions in `src/data/nav-verbs.ts`.
2. **Parcel lookup on `/property-taxes`** — single-box typeahead routes citizens to the right official portal. Server fn proxies the TN Comptroller's TPAD autocomplete (no HTML scraping). Three side-by-side CTAs: View assessment (TPAD) · Pay your taxes (Trustee) · View on map (ArcGIS Online web map). GIS link upgraded from generic `gis.sullivancountytn.gov/` to the actual web map.
3. **A11y hardening** — kbd contrast (search shortcut hint), `bg-white/95` → `bg-white` on hero search button, Pay Taxes CTA always copper-on-white (was failing 1.05:1 on `/history`), CommunityMap SVG dropped `role="img"` so the focusable anchors inside aren't double-wrapped.
4. **Per-IP rate limiting** — composite `key:ip` keys via `getRequestIP()` + `cf-connecting-ip`. Previously global keys meant one user could exhaust the quota for everyone in the same isolate.
5. **Test harness improvements** — `nav` selectors scoped to `nav[aria-label="Main navigation"]` (3 nav landmarks now: main nav, hero top-tasks, mobile bottom tab bar). `axe-core` scans pre-reveal `[data-reveal]` elements before scanning. Skip-link tests skip on touch profiles. Admin-auth tests skip when `BASE_URL=http://localhost:*` (different `ADMIN_PASSWORD` in `.dev.vars`).
6. **Cleanup** — deleted unused `components/ui/card.tsx` + `components/ui/button.tsx` (zero imports). Badge stays.

### 2026-05-06 — citizen utility + graphics + blueprint round
- Hero search + 5 task chips, EmergencyModule, AnnouncementBanner D1-wired, Open-Now status pill (holiday-aware), Next-Meeting `.ics` export, online/in-person service badges, "Was this helpful?" feedback widget, vCard "Save Contact" exports, PWA install hint, view transitions on dept list → detail, BreadcrumbList + Event JSON-LD, Spanish locale populated.
- Sullivan County seal (potrace-traced from sullivancountytn.gov), parallax mountain dividers, hero photo treatment cleanup, printable dept-detail contact card with QR, interactive 6-community SVG map (US Census TIGER/Line projection).
- FAQPage + GovernmentService JSON-LD on every dept detail. GovernmentService JSON-LD on every form. AudiencePathways homepage section. Citizen-language search aliases. Suggested zero-result queries. MobileBottomTabBar. `/property-taxes` landing page.

Verification: 69 unit + 260 E2E local + 251 E2E live, 0 failures across desktop/tablet/mobile.

---

## Project type

TanStack Start v1.169 SSR web application deployed to Cloudflare Workers. Single-package repo. No mobile app.

---

## What exists

### Routes (40 files)

| Area | Routes |
|------|--------|
| Public homepage + landing | `index.tsx`, `property-taxes.tsx`, `about.tsx`, `visit.tsx`, `economic-development.tsx`, `education.tsx`, `transportation.tsx`, `people.tsx`, `employee-services.tsx`, `ada-compliance.tsx`, `privacy-policy.tsx` |
| Departments | `departments/index.tsx`, `departments/$slug.tsx` (25 depts) |
| Commissioners | `commissioners.tsx` (24 across 11 districts) |
| News | `news/index.tsx`, `news/$slug.tsx` |
| Documents | `documents.tsx` (115 files, 17 categories) |
| Calendar | `calendar.tsx` (6 recurring meetings, .ics export) |
| Contact | `contact.tsx` (form → KV) |
| Forms | `forms/index.tsx`, `forms/$type.tsx` (4 form types) |
| Heritage | `history/index.tsx`, `history/timeline.tsx`, `history/$slug.tsx` (8 sites) |
| Communities | `communities/index.tsx`, `communities/$slug.tsx` (6 communities) |
| Admin | `admin/login.tsx`, `admin/index.tsx`, `admin/news/{index,new,$id}.tsx`, `admin/minutes/{index,new,$id}.tsx`, `admin/announcements.tsx`, `admin/submissions.tsx` |
| API | `api/health.ts` |

### Components (50 files)

| Area | Notable |
|------|---------|
| Layout | `SiteNav` (verb-based mega-panels), `SiteFooter`, `AnnouncementBanner` (D1-wired), `SearchDialog` (Cmd+K, lazy-loaded), `MobileBottomTabBar`, `LanguageToggle`, `NotFound` |
| Home | `HeroBanner`, `EmergencyModule`, `QuickServices`, `DepartmentCategories`, `AudiencePathways`, `PromisesSection`, `NextMeetingCard`, `NewsSection`, `CommunityMap`, `AboutSection` |
| Departments | `DepartmentCard`, `DepartmentDetail`, `PrintableContactCard` |
| Commissioners | `CommissionerGrid`, `CommissionerCard` |
| Communities | `CommunityCard` |
| News | `NewsCard`, `NewsDetail` |
| History | `HeritageHero`, `HistoryNarrative`, `HeritageSiteCard`, `VisitorInfoCard`, `TimelineSection` |
| People | `PersonCard` |
| Forms | `FormLayout`, `FormField` |
| Minutes | `MinutesList`, `MinutesFilter` |
| Admin | `AdminLayout`, `StatusBadge` |
| Property taxes | `ParcelLookup` (TPAD typeahead + 3-portal CTAs) |
| Shared | `TelLink`, `OpenStatusPill`, `PageFeedback`, `ContactCard`, `InstallPrompt`, `MountainDivider`, `CountySeal`, `VideoEmbed` |
| ui | `badge.tsx` (only shadcn primitive still in use) |

### Data (17 files)

`departments.ts` (25), `commissioners.ts` (24), `news.ts`, `documents.ts` (115 files / 17 categories), `quick-services.ts` (9), `search-index.ts` (175+ items with citizen-language aliases), `heritage-sites.ts` (8), `timeline.ts` (48 events), `communities.ts` (6), `notable-people.ts` (7), `employers.ts`, `education.ts` (6), `form-definitions.ts` (4 types), `meeting-minutes.ts`, `meetings.ts` (recurrence rules), `holidays.ts` (13 county holidays), `nav-verbs.ts` (7 verbs).

### Server functions (12 files)

| File | Purpose | Auth | Rate limit | Validation |
|------|---------|------|-----------|------------|
| `auth.ts` | login / validateAdmin / logout | — | 5/60s per IP | Zod loginSchema |
| `contact.ts` | submitContactForm → KV (90-day TTL) | — | 3/60s per IP | Zod contactFormSchema + honeypot |
| `forms.ts` | submitForm → D1 | — | 3/60s per IP | Zod submitFormSchema |
| `parcel-lookup.ts` | TPAD autocomplete proxy | — | 30/60s per IP | Zod parcelLookupSchema |
| `page-feedback.ts` | submitPageFeedback / list / delete | list/delete: requireAdmin | 30/60s per IP | Zod schemas |
| `public-announcements.ts` | listPublicAnnouncements (D1 read) | — | — | — |
| `admin-news.ts` | News CRUD | requireAdmin on every fn | 30/60s on mutations | Zod schemas |
| `admin-minutes.ts` | Minutes CRUD | requireAdmin | 30/60s | Zod |
| `admin-announcements.ts` | Announcement CRUD | requireAdmin | 30/60s | Zod |
| `admin-submissions.ts` | Submission status updates | requireAdmin | — | Zod |
| `guard.ts` | `requireAdmin()` shared helper | — | — | — |
| `csrf.ts` | Token issue + validate | — | — | — (defined; SameSite=Strict cookies are primary defense) |
| `rate-limit.ts` | Per-IP composite key in-memory limiter | — | — | — |

### Database (D1 — `sullivan-county-db`, all migrations applied to remote)

| Table | Status |
|-------|--------|
| `news_articles` | populated (7 seed articles) |
| `meeting_minutes` | schema + admin UI ready |
| `announcements` | schema (with `severity` column) + admin UI ready |
| `form_submissions` | collects from `/forms/*` |
| `admin_sessions` | ULID-based, populated by login |
| `page_feedback` | collects from `<PageFeedback />` widget |

### Schemas (`src/lib/schemas/`)

`auth.ts`, `contact.ts`, `forms.ts`, `news.ts`, `minutes.ts`, `announcements.ts`, `submissions.ts`, `page-feedback.ts`, `parcel-lookup.ts` — all Zod, all wired into the relevant `inputValidator()`.

### Tests

| Type | Files | Tests | Notes |
|------|-------|-------|-------|
| Unit (Vitest) | 11 | 69 | data integrity, hooks, utils, vcard, recurrence, openStatus, holidays, nav-verbs, parcel-lookup schema |
| E2E (Playwright) | 6 specs | 255 cases × 3 projects | desktop / tablet (iPad Pro) / mobile (iPhone 14 Pro). Local: 260 passed / 12 skipped. Live: 251 passed / 4 skipped. |

### Design system

13 brand color tokens, 2 fonts (Libre Caslon Text + Outfit), mountain ridge dividers, scroll-reveal animations, glass-morphism navigation, single shadcn primitive (Badge), official Sullivan County seal (47KB SVG + raster fallbacks), i18n: en + es (machine-translated, needs native review).

### Infrastructure

| Service | Purpose | Status |
|---------|---------|--------|
| Cloudflare Workers | Hosting | live |
| D1 (`sullivan-county-db`) | Form submissions, news, minutes, announcements, sessions, page feedback | live |
| KV (`CONTACT_SUBMISSIONS`) | Contact form (90-day TTL) | live |
| Wrangler 4.88+ | CLI | configured |
| Biome 2.4.14 | Lint + format | clean |
| TypeScript | Strict | clean |
| GitHub Actions | CI | configured |

### Security

| Feature | Status |
|---------|--------|
| Auth gates on all admin endpoints | yes |
| Timing-safe SHA-256 password compare | yes |
| ULID-based session IDs | yes |
| **Per-IP rate limit keys** (`getRequestIP()` + `cf-connecting-ip`) | yes (2026-05-07) |
| XSS sanitization (`sanitize-html` on stored content) | yes |
| Structured JSON logging (no PII) | yes |
| CSP via `_headers` | yes |
| HSTS with preload, COEP, COOP | yes |
| Honeypot spam protection | yes |
| CSRF | module defined; SameSite=Strict cookies + same-origin server fns provide primary defense |

---

## What's mocked / missing

| Area | Status | Notes |
|------|--------|-------|
| In-memory rate limit cross-isolate | ACCEPTABLE FOR SCALE | Per-IP keys mean one user can't block another inside an isolate. Cross-isolate spillover is theoretically possible under heavy attack — for stricter enforcement, migrate to D1 atomic counters or Durable Objects. Not pressing at current traffic. |
| CSRF token integration | DEFERRED | `csrf.ts` defined but not invoked. SameSite=Strict cookies + same-origin server-fn endpoints already prevent CSRF in modern browsers. Reinstate as defense-in-depth if/when adding cross-origin embeds. |
| CF Web Analytics | NOT CONFIGURED | Beacon script ready in `__root.tsx`; needs a token from CF dashboard. |
| Service worker / offline | NOT SHIPPED | Manifest is complete; SW is a future PR for the emergency module. |
| Spanish translation review | NEEDED | `es.json` is machine-translated. Schedule native review before claiming bilingual support in marketing. |

---

## What's broken

| Issue | Severity | Status |
|-------|----------|--------|
| React minified error #418 (hydration warning, no visible effect) | LOW | Framework-level, likely from TanStack Start `<Scripts />` + React 19 script auto-hoisting. Multiple targeted fixes attempted in the May 6 session; this is the residual. |

---

## Key numbers (2026-05-07)

| Metric | Value |
|--------|-------|
| Routes | 40 |
| Components | 50 |
| Data files | 17 |
| Server functions | 12 |
| Zod schemas | 9 |
| Unit tests | 69 |
| E2E tests | 260 local / 251 live (passing) |
| i18n keys | ~150 |
| Build size | 749 KB worker entry |
| Build time | ~3.2s |
| Lint | 0 errors, 1 pre-existing warning |
