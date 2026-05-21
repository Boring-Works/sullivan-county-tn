# Current State — Sullivan County TN Government Website

**Date:** 2026-05-21
**Live:** https://sullivan-county-tn.codyboring.workers.dev (version `8f75c569-2488-468f-989a-87f196e9e4f8`)
**Repo:** https://github.com/Boring-Works/sullivan-county-tn
**Latest commit:** `a80dead` — _feat: items #2, #3, #5 from top-7 audit_

---

## What's been done

The site has been through a **7-phase production-hardening pass** plus several follow-up audits. Everything below is shipped to production.

### Phase 1 — Cloudflare Workers, typed end-to-end
- `src/server/env.ts` exports typed `getEnv()` / `getDB()` / `getKV()` helpers — all 10 prior `as Record<string, unknown>` cast sites refactored to typed access against `Cloudflare.Env`.
- `ADMIN_PASSWORD` declared via interface merging in `env.ts` so secrets type alongside bindings.
- NWS fetch hardened: 5 s `AbortController` timeout + `cf: { cacheTtl: 600, cacheEverything: true }` + single retry on 5xx with 250 ms backoff.

### Phase 2 — Drizzle + Zod alignment
- `drizzle-zod` installed; `createInsertSchema()` and `createSelectSchema()` exposed for every D1 table from `src/db/schema.ts`.
- All indexes moved into `schema.ts` (idx_form_submissions_status, idx_news_articles_status/published_at, idx_weather_observations_observed_at, idx_page_feedback_page/created_at).
- ULID brand type at `src/lib/schemas/ids.ts` (`z.string().regex(...).brand<"Ulid">()`).
- `$inferSelect` / `$inferInsert` types exported per table.

### Phase 3 — shadcn/ui foundation
- **21 primitives** installed: `accordion`, `alert`, `badge`, `breadcrumb`, `button`, `card`, `command`, `dialog`, `dropdown-menu`, `form`, `input`, `label`, `scroll-area`, `select`, `separator`, `sheet`, `skeleton`, `sonner`, `table`, `tabs`, `textarea`, `tooltip`.
- Theme overrides in `app.css` map shadcn vars to brand-navy / brand-copper / brand-cream. Sharp `0.125rem` radius for civic restraint.
- `<Button>` extended with brand variants — `copper`, `navy`, themed `link`.

### Phase 4 — UI conversion
- `<Toaster />` (Sonner) + `<TooltipProvider>` mounted in `__root.tsx`.
- `<Skeleton />` replaces "Loading..." text site-wide.
- **`/contact`, `/admin/login`, and `/forms/$type` (all 4 form types)** migrated to react-hook-form + shadcn `<Form>` + Zod resolvers. Sonner toast on submit. `@tanstack/react-form` removed (was unused).
- `/property-taxes` FAQ converted to shadcn `<Accordion>`.
- `/weather`: 7-day cards as `<Card>`; hourly strip as `<ScrollArea>`.
- **CopperWeathervane** on `/weather` — animated copper compass rose rotating with live wind direction (lifted from tennessee-starts-here, themed for Sullivan brand).

### Phase 5 — PWA + offline
- `public/sw.js` adapted from `Boring-Works/where-tennessee-began`. Cache-first fonts, network-first navigation w/ Navigation Preload + `/offline.html` fallback, image cache with eviction cap, stale-while-revalidate everywhere else. **Pre-caches emergency-critical pages** (`/`, `/property-taxes`, `/contact`, `/calendar`, `/weather`, `/departments/emergency-management`, `/departments/sheriff`).
- `public/offline.html` — branded fallback with 911/Sheriff/EMA `tel:` links.
- `public/manifest.webmanifest` — full **2026 PWA spec**: `id`, `scope`, `lang`, `display_override`, `launch_handler`, `share_target`, **shortcuts** (Pay Taxes / Weather / Contact / Calendar), maskable icon variant, categories.
- `<OfflineBanner />` listens to `navigator.onLine`, fixed top bar with brand-copper styling, safe-area-aware.
- SW registered in `__root.tsx` behind `import.meta.env.PROD`.

### Weather subsystem
- **NWS API integration** (api.weather.gov, no key, government data on a government site). Forecast office `MRX` (Morristown), gridpoint `126,82`, forecast zone `TNZ017`.
- KV-cached snapshot with SWR-on-read pattern (10-min freshness; one user every 10 min pays the upstream round-trip; everyone else gets a 5 ms KV hit).
- D1 archive in `weather_observations` for the 24-hour temperature trend chart on `/weather`.
- `<WeatherBadge />` on the homepage hero almanac — auto-pulses copper when a Severe/Extreme NWS alert is active.
- `/weather` route: current conditions hero, CopperWeathervane, severity-tiered alert cards, hourly outlook, 7-day forecast, 24-hour temperature trend.

### Content freshness
- **7 fresh news articles** dated April–May 2026, grounded in real-world facts: Memorial Day closures, Blountville Athletic Park grand opening (May 9), FY 26-27 budget hearing (May 21), April 16 Commission recap, SR 126 Memorial Boulevard project (8.3 mi, March 2026 start), TN burn-permit deadline (May 15), spring severe weather preparedness.
- **Live AnnouncementBanner** — seeded D1 row for the Memorial Day closure renders on the homepage.

### Trust signals across detail pages
- `<DetailBreadcrumb>` (shadcn Breadcrumb under the hood) mounted on `/departments/$slug`, `/news/$slug`, `/communities/$slug`, `/history/$slug`, `/forms/$type`. Visible nav pairs with the existing BreadcrumbList JSON-LD.
- **"Last reviewed [date]" stamps** at the footer of every department detail page and every form page (`DEFAULT_LAST_UPDATED = "2026-05-07"` applied when not specified per-entity).

### iOS / Android 2026 PWA standards
- `viewport-fit=cover` for safe-area awareness.
- Dual `theme-color` (light + dark scheme).
- iOS PWA tags: `apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style: black-translucent`, `apple-mobile-web-app-title`.
- Multiple `apple-touch-icon` sizes (180, 192, 512) so iOS picks the right one at any DPR.
- `mask-icon` for Safari pinned tab + macOS dock.
- `format-detection: telephone=no` (we use TelLink for explicit, branded `tel:` links).
- `msapplication-TileColor` for Edge/Windows.
- `color-scheme: light` hint for native form controls.

### Code-quality audit pass
- 0 TODO/FIXME/XXX comments
- 0 `console.log` (structured logging only)
- 0 hand-written `any` types
- 0 `@ts-ignore` outside `routeTree.gen.ts`
- All `<img>` have alt text
- All icon-only `<button>` have aria-label or text
- All `target="_blank"` anchors have `rel`
- All `<input>` have label associations
- All POST handlers either rate-limit OR require admin auth (both, in most cases)
- All routes have proper `seo()` + `seoLinks()` canonical
- `StatusBadge` uses brand-aligned palette (sage = success, stone = neutral, blue/amber = informational/in-progress)

### Scroll-reveal failsafe
- Default state of `[data-reveal]` is now **visible** — `.js-reveal-armed` class on `<html>` opts INTO the hide-then-reveal effect.
- 2.5 s failsafe timer in `useScrollReveal` force-reveals anything missed.
- `prefers-reduced-motion: reduce` honored — content always visible for accessibility.

---

## Project type

TanStack Start v1.169 SSR web application deployed to Cloudflare Workers. Single-package repo. No mobile app.

---

## What exists

### Routes (40)

| Area | Routes |
|---|---|
| Public landing | `index.tsx`, `property-taxes.tsx`, `weather.tsx`, `about.tsx`, `visit.tsx`, `economic-development.tsx`, `education.tsx`, `transportation.tsx`, `people.tsx`, `employee-services.tsx`, `ada-compliance.tsx`, `privacy-policy.tsx` |
| Departments | `departments/index.tsx`, `departments/$slug.tsx` (25 depts) |
| Commissioners | `commissioners.tsx` (24 across 11 districts) |
| News | `news/index.tsx`, `news/$slug.tsx` (D1 + static merge) |
| Documents | `documents.tsx` (115 files, 17 categories) |
| Calendar | `calendar.tsx` (6 recurring meetings, .ics export) |
| Contact | `contact.tsx` (form → KV) |
| Forms | `forms/index.tsx`, `forms/$type.tsx` (4 form types, RHF + shadcn) |
| Heritage | `history/index.tsx`, `history/timeline.tsx`, `history/$slug.tsx` (8 sites) |
| Communities | `communities/index.tsx`, `communities/$slug.tsx` (6 communities) |
| Admin | `admin/login.tsx`, `admin/index.tsx`, `admin/news/{index,new,$id}.tsx`, `admin/minutes/{index,new,$id}.tsx`, `admin/announcements.tsx`, `admin/submissions.tsx` |
| API | `api/health.ts` |

### Components (~60 files)

| Area | Notable |
|---|---|
| Layout | `SiteNav` (verb-based mega-panels + category-aware active state), `SiteFooter`, `AnnouncementBanner` (D1-wired, **live**), `SearchDialog` (Cmd+K, lazy-loaded, supports prefilled initial query), `MobileBottomTabBar`, `LanguageToggle`, `NotFound` |
| Home (mounted on /) | `HeroBanner` (with `WeatherBadge`), `SeasonalRibbon`, `EmergencyModule` (restrained navy strip), `QuickServices`, `NextMeetingCard`, `NewsSection`, `CommunityMap`, `AboutSection` |
| Weather | `WeatherBadge` (homepage almanac), `CopperWeathervane` (animated copper compass rose) |
| Departments | `DepartmentCard`, `DepartmentDetail`, `PrintableContactCard` |
| Commissioners | `CommissionerGrid`, `CommissionerCard` |
| Communities | `CommunityCard` |
| News | `NewsCard`, `NewsDetail` (renders `htmlContent` from D1 with `dangerouslySetInnerHTML` after sanitize-html) |
| History | `HeritageHero`, `HistoryNarrative`, `HeritageSiteCard`, `VisitorInfoCard`, `TimelineSection` |
| People | `PersonCard` |
| Forms | `FormLayout` (legacy `FormField` retained but unused on `$type` route post-migration) |
| Minutes | `MinutesList`, `MinutesFilter` |
| Admin | `AdminLayout`, `StatusBadge` (brand-aligned palette) |
| Property taxes | `ParcelLookup` (TPAD typeahead + 3 shadcn `<Button>` CTAs) |
| Shared | `TelLink`, `OpenStatusPill`, `PageFeedback`, `OfflineBanner`, `ContactCard` (**Save contact + Share details**, no hardcoded site URL in vCard), `InstallPrompt`, `MountainDivider`, `CountySeal`, `VideoEmbed`, `DetailBreadcrumb` |
| `ui/*` (shadcn) | 21 primitives (full inventory in COMPONENT_INVENTORY.md) |

### Data (17 files)

`departments.ts` (25, all with `lastUpdated`), `commissioners.ts` (24), `news.ts` (14 entries — 7 fresh April-May 2026 + 7 archive), `documents.ts` (115 files / 17 categories), `quick-services.ts` (6), `search-index.ts` (175+ items with citizen-language aliases), `heritage-sites.ts` (8), `timeline.ts` (48 events), `communities.ts` (6), `notable-people.ts` (7), `employers.ts`, `education.ts` (6), `form-definitions.ts` (4 types, with `lastUpdated`), `meeting-minutes.ts`, `meetings.ts` (recurrence rules), `holidays.ts` (13 county holidays), `nav-verbs.ts` (**5 verb model with category-filtered department links**).

### Server functions (15 files)

| File | Purpose | Auth | Rate limit | Validation |
|---|---|---|---|---|
| `env.ts` | Typed `getEnv/getDB/getKV` helpers (no server fns) | — | — | — |
| `auth.ts` | login / validateAdmin / logout | login: rate-limit | 5/60s/IP | Zod loginSchema |
| `contact.ts` | submitContactForm → KV (90-day TTL) | — | 3/60s/IP | Zod contactFormSchema + honeypot |
| `forms.ts` | submitForm → D1 | — | 3/60s/IP | Zod submitFormSchema |
| `parcel-lookup.ts` | TPAD autocomplete proxy | — | 30/60s/IP | Zod parcelLookupSchema |
| `page-feedback.ts` | submit / list / delete | list/delete: requireAdmin | 30/60s/IP | Zod schemas |
| `public-announcements.ts` | listPublicAnnouncements (D1 read) | — | — | — |
| `public-news.ts` | listPublicNews / getPublicNewsArticle (D1 read) | — | — | Zod slug schema |
| `public-weather.ts` | getCurrentWeather (KV-cached SWR) / getRecentObservations (D1 trend) | — | — | — |
| `weather/nws-client.ts` | NWS fetch wrapper (timeout, retry, edge cache) | — | — | — |
| `weather/refresh.ts` | refreshWeather (KV write + D1 archive) | — | — | — |
| `admin-news.ts` | News CRUD | requireAdmin everywhere | 30/60s on mutations | Zod schemas |
| `admin-minutes.ts` | Minutes CRUD | requireAdmin | 30/60s | Zod |
| `admin-announcements.ts` | Announcement CRUD | requireAdmin | 30/60s | Zod |
| `admin-submissions.ts` | Status updates | requireAdmin | 30/60s (added in audit pass) | Zod |
| `guard.ts` | `requireAdmin()` shared helper | — | — | — |
| `csrf.ts` | Token issue + validate | — | — | defined; SameSite=Strict cookies primary defense |
| `rate-limit.ts` | Per-IP composite key in-memory limiter | — | — | — |

### Database (D1 — `sullivan-county-db`, 4 migrations applied to remote)

| Table | Status | Indexes |
|---|---|---|
| `news_articles` | populated by admin CRUD; merged with static `news.ts` on read | status, published_at |
| `meeting_minutes` | schema + admin UI ready | — |
| `announcements` | **1 active row seeded** (Memorial Day notice, expires 2026-05-26) | — |
| `form_submissions` | collects from `/forms/*` | status, created_at |
| `admin_sessions` | ULID + 24h TTL, populated by login | — |
| `page_feedback` | collects from `<PageFeedback />` widget; admin viewer pending | page, created_at |
| `weather_observations` | written every 10 min by SWR refresh | observed_at |

### Tests

| Type | Files | Tests | Status |
|---|---|---|---|
| Unit (Vitest) | 13 | 83 | all passing |
| E2E (Playwright × desktop+tablet+mobile) | 6 specs | 117–270 cases (varies by spec) | 117/117 critical-paths + user-flows; 21/21 a11y; ParcelLookup test occasionally flakes when TPAD upstream is slow |

### Design system

13 brand color tokens, 2 fonts (Libre Caslon Text + Outfit), mountain ridge dividers, scroll-reveal animations w/ failsafe, glass-morphism navigation, **21 shadcn primitives**, official Sullivan County seal (47KB SVG + raster fallbacks), i18n: en + es (machine-translated, needs native review).

### Infrastructure

| Service | Purpose | Status |
|---|---|---|
| Cloudflare Workers | Hosting | live, version `8f75c569-...` |
| D1 (`sullivan-county-db`) | Form submissions, news, minutes, announcements, sessions, feedback, weather observations | live, 4 migrations applied |
| KV (`CONTACT_SUBMISSIONS`) | Contact form (90-day TTL) + weather snapshot (1-hour TTL) | live |
| Service Worker | `/sw.js` registered in production | live |
| NWS API | Weather data source (free, no key) | live, called every ~10 min |
| Wrangler 4.88+ | CLI | configured |
| Biome 2.x | Lint + format | CLI/schema mismatch present in current env (`2.4.15` CLI vs `2.4.14` schema) |
| TypeScript | Strict | clean |
| GitHub Actions | CI | configured |

### Security

| Feature | Status |
|---|---|
| Auth gates on all admin endpoints | yes |
| Timing-safe SHA-256 password compare | yes |
| ULID-based session IDs | yes |
| Per-IP rate limit keys (composite `key:ip` via `getRequestIP()` + `cf-connecting-ip`) | yes |
| Rate limit on every admin POST mutation | yes |
| XSS sanitization (`sanitize-html` on stored content) | yes |
| Structured JSON logging (no PII) | yes |
| CSP via `_headers` | yes |
| HSTS with preload, COEP, COOP | yes |
| Honeypot spam protection | yes |
| CSRF | module defined; SameSite=Strict cookies + same-origin server fns provide primary defense |
| Typed env access (no `as Record<string, unknown>` casts) | yes |

---

## What's mocked / missing

| Area | Status | Notes |
|---|---|---|
| In-memory rate limit cross-isolate | ACCEPTABLE | Per-IP keys mean one user can't block another inside an isolate. Cross-isolate spillover is theoretically possible under heavy attack — for stricter enforcement, migrate to Durable Object atomic counters. Not pressing at current traffic. |
| CSRF token integration | DEFERRED | `csrf.ts` defined but not invoked. SameSite=Strict + same-origin server fns prevent CSRF in modern browsers. Reinstate as defense-in-depth if/when adding cross-origin embeds. |
| **CF Web Analytics token** | NOT CONFIGURED | Beacon block in `__root.tsx` shows literal `YOUR_TOKEN_HERE`. Requires CF dashboard access (5-minute task; user-action item). |
| **Cron Trigger for weather** | NOT SHIPPED | SWR-on-read works fine. Custom worker entry to add `scheduled()` would remove the "first user every 10 min pays 300ms" penalty. |
| **Audit log table** | NOT SHIPPED | Designed but not implemented. ~1.5 hours of work — `0004_audit_log.sql` migration + `audit()` helper + `/admin/audit` viewer. |
| **Admin overhaul** (Sidebar + DataTable + stat dashboard) | NOT SHIPPED | Largest visible improvement remaining. **`Kiranism/tanstack-start-dashboard`** (MIT, exact stack match) provides reusable DataTable composition + Sidebar to lift from. ~3-4 hours. |
| `/admin/feedback` viewer UI | NOT SHIPPED | Server fns (`listPageFeedback`, `deletePageFeedback`) exist; ~30 min to build the route. |
| Spanish translation review | NEEDED | `es.json` is machine-translated. Schedule native review before claiming bilingual support. |
| Barry Hopper photo | NEEDED | One commissioner has no photo; `CommissionerCard` falls back to a User icon. Source the headshot. |

---

## Key numbers (2026-05-07)

| Metric | Value |
|---|---|
| Routes | 40 |
| Components | ~60 (39 site + 21 shadcn primitives) |
| Data files | 17 |
| Server function files | 15 |
| Drizzle tables | 7 |
| Drizzle-generated Zod schemas | 7 select + 7 insert + 1 ULID brand |
| News articles | 14 (7 fresh + 7 archive) |
| Unit tests | 79 |
| E2E tests | 117/117 critical-paths + user-flows × 3 viewports |
| Build size | 749.92 KB worker entry |
| Build time | ~3.7s |
| Lint | 0 errors |
| Live HTTP smoke | 11/11 routes return 200 |
| Migrations applied (D1 remote) | 4/4 (`0000_round_lady_deathstrike`, `0001_page_feedback`, `0002_announcement_severity`, `0003_weather_observations`) |
