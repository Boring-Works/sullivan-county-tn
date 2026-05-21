# Sullivan County TN Government Website

Citizen services portal for Sullivan County, Tennessee.
Brand: **Official services. Local government. Community information.** Tourism bridge: **Where Tennessee Began**.

## Audit Docs (May 2026)
See `/docs/` for complete architecture audit:
- [ARCHITECTURE.md](docs/ARCHITECTURE.md) — Full stack architecture
- [BRAND_POSITIONING.md](docs/BRAND_POSITIONING.md) — Civic portal vs. tourism brand split
- [CURRENT_STATE.md](docs/CURRENT_STATE.md) — Current project state
- [COMPONENT_INVENTORY.md](docs/COMPONENT_INVENTORY.md) — All 50 components
- [DEVELOPMENT_WORKFLOW.md](docs/DEVELOPMENT_WORKFLOW.md) — Dev workflow
- [GAP_ANALYSIS.md](docs/GAP_ANALYSIS.md) — Known gaps
- [NEXT_IMPLEMENTATION_PLAN.md](docs/NEXT_IMPLEMENTATION_PLAN.md) — Future plan

## State (2026-05-21 — production-hardened, weather/river-live, PWA-ready)
- **Tests:** 94 unit tests passing across 16 files; Playwright coverage includes desktop/tablet/mobile critical paths, accessibility scans, menu behavior, user flows, and admin auth flows.
- **A11y:** WCAG AA oriented — kbd contrast fixed, brand-stable colors site-wide, scroll-reveal failsafe ensures all sections render even with reduced motion or no JS.
- **Lint:** Biome check passes with 0 errors.
- **Build:** Vite/TanStack Start production build passes locally.
- **Live:** Cloudflare Workers deployment target is `sullivan-county-tn` at https://sullivan-county-tn.codyboring.workers.dev.
- **Security:** Typed `Cloudflare.Env` end-to-end (no `as Record<string, unknown>` casts), auth gates + Zod validation + per-IP rate limit on every admin POST, ULIDs, XSS sanitization, timing-safe password compare, structured JSON logging, CSRF module defined (SameSite=Strict cookies + same-origin server fns provide primary defense)
- **Phase 1 (typed env):** `src/server/env.ts` exports `getEnv()` / `getDB()` / `getKV()` against `Cloudflare.Env`. `ADMIN_PASSWORD` declared via interface merging. NWS fetch hardened with 5s `AbortController` timeout + `cf` cache hint + retry on 5xx.
- **Phase 2 (Drizzle/Zod):** `drizzle-zod` installed, `createInsertSchema/createSelectSchema` per table, all indexes in `schema.ts`, ULID brand type at `src/lib/schemas/ids.ts`, `$inferSelect` types exported.
- **Phase 3 (shadcn):** 21 primitives — `accordion, alert, badge, breadcrumb, button, card, command, dialog, dropdown-menu, form, input, label, scroll-area, select, separator, sheet, skeleton, sonner, table, tabs, textarea, tooltip`. Theme overrides map shadcn vars to brand-navy/copper/cream. Sharp 0.125rem radius. `<Button>` extended with `copper` and `navy` variants.
- **Phase 4 (UI conversion):** Toaster + TooltipProvider in `__root.tsx`, Skeleton replaces "Loading..." text, **`/contact` + `/admin/login` + `/forms/$type` (all 4 form types) migrated to react-hook-form + shadcn `<Form>` + Sonner toasts**. `@tanstack/react-form` removed. `/property-taxes` FAQ → `<Accordion>`. `/weather` 7-day cards → `<Card>`, hourly → `<ScrollArea>`. **`<CopperWeathervane />`** lifted from tennessee-starts-here, themed for Sullivan brand.
- **Phase 5 (PWA + offline):** `public/sw.js` (cache-first fonts, network-first nav with Navigation Preload + `/offline.html` fallback, image cache eviction, stale-while-revalidate). Pre-caches emergency-critical pages: `/`, `/property-taxes`, `/contact`, `/calendar`, `/weather`, `/departments/emergency-management`, `/departments/sheriff`. Branded `/offline.html` with 911/Sheriff/EMA tel: links. `<OfflineBanner />` listens to `navigator.onLine`. **2026 PWA manifest spec**: `id`, `scope`, `lang`, `display_override`, `launch_handler.client_mode`, `share_target`, `shortcuts` (Pay Taxes / Weather / Contact / Calendar), maskable icon.
- **Weather + river subsystem (2026-05-21):** NWS API integration (api.weather.gov, no key — government data on a government site). MRX gridpoint 126,82, forecast zone TNZ017. KV-cached snapshot with 10-min SWR-on-read. Homepage uses one shared client weather fetch for the alert banner and hero weather badge. D1 `weather_observations` archives every refresh. `/weather` route is action-first: situation summary, relevant NWS alerts, current conditions, 12-hour outlook, 7-day forecast, trend chart, USGS river gauges, TVA lake links, and TDOT/TN 511 road links.
- **Content freshness:** 7 fresh news articles dated April–May 2026 (Memorial Day closures, Blountville Athletic Park grand opening, FY 26-27 budget hearing, Apr 16 Commission recap, SR 126 Memorial Boulevard project, May 15 burn permit deadline, severe weather prep). **Live D1-seeded AnnouncementBanner** showing Memorial Day closure on the homepage.
- **Trust signals (2026-05-07):** `<DetailBreadcrumb>` mounted on `/departments/$slug`, `/news/$slug`, `/communities/$slug`, `/history/$slug`, `/forms/$type`. **"Last reviewed" stamps** at the bottom of every department detail page and form page.
- **iOS / Android 2026 PWA standards:** `viewport-fit=cover` safe areas, dual `theme-color` (light + dark), full iOS PWA tag set, multiple `apple-touch-icon` sizes, `mask-icon`, `format-detection: telephone=no`, `msapplication-TileColor`, `color-scheme: light`.
- **Code quality:** 0 TODO/FIXME/XXX, 0 `console.log`, 0 hand-written `any`, all `target=_blank` have `rel`, all `<input>` label-associated, `StatusBadge` brand-aligned palette.
- **Earlier 2026-05-06/07 wins (preserved):** Hero search + 5 task chips + suggested-search pills, restrained EmergencyModule strip, Open-Now status pill (holiday-aware via Computus), Next-Meeting `.ics` export, online/in-person submission badges, vCard "Save Contact" exports, view transitions on dept list → detail, BreadcrumbList + Event + GovernmentService + FAQPage JSON-LD, Spanish locale populated, citizen-language search aliases, MobileBottomTabBar, ParcelLookup → TPAD typeahead, consolidated 5-verb primary nav (Find · Pay · Apply · Report · About), per-IP rate limit composite keys.

## Tech Stack
- TanStack Start (full-stack React framework)
- TanStack Router (file-based routing)
- Cloudflare Workers (edge deployment)
- Tailwind CSS v4
- shadcn/ui + Radix primitives
- Biome (lint + format)
- TypeScript (strict)
- Vite + Cloudflare Vite Plugin

## Key Commands
- `pnpm install --frozen-lockfile` — Install exact dependencies
- `pnpm run dev` — Start dev server (local Cloudflare Workers runtime)
- `pnpm run build` — Production build
- `pnpm run preview` — Preview production build locally
- `pnpm run deploy` — Build + deploy to Cloudflare Workers
- `pnpm run lint` — Run Biome linter
- `pnpm run format` — Format with Biome
- `pnpm run test` — Run tests
- `pnpm exec tsx scripts/generate-rss.ts` — Regenerate RSS feed after adding news
- `pnpm exec tsx scripts/generate-sitemap.ts` — Regenerate sitemap after adding routes/content

## Routes
| Route | File | Purpose |
|-------|------|---------|
| `/` | `routes/index.tsx` | Homepage — active NWS alert banner when needed, citizen-first HeroBanner (task search, top tasks, single county-status panel), SeasonalRibbon (date-aware, Oct 1 – Mar 1 only), TodaySection, CommunityMap, StorySection, TourismAppPromo, AboutSection. Duplicate status/weather overlays and old audience section removed 2026-05-21. |
| `/property-taxes` | `routes/property-taxes.tsx` | "Pay your property taxes" landing page with `ParcelLookup` typeahead, three-portal CTAs (TPAD/Trustee/GIS), FAQ + GovernmentService JSON-LD |
| `/departments` | `routes/departments/index.tsx` | Department directory with category filter |
| `/departments/$slug` | `routes/departments/$slug.tsx` | Individual department detail (25 departments) |
| `/commissioners` | `routes/commissioners.tsx` | Commissioner grid by district (11 districts) |
| `/news` | `routes/news/index.tsx` | County news feed |
| `/news/$slug` | `routes/news/$slug.tsx` | News article detail page with full content |
| `/calendar` | `routes/calendar.tsx` | Calendar & meetings (6 recurring schedules, YouTube live links) |
| `/contact` | `routes/contact.tsx` | Contact hub with form (9 subjects, KV backend), Google Maps, quick contacts, resources |
| `/documents` | `routes/documents.tsx` | 115-document library with 17 categories, search, category pills, collapsible sections |
| `/ada-compliance` | `routes/ada-compliance.tsx` | ADA compliance info + 5 downloadable forms |
| `/privacy-policy` | `routes/privacy-policy.tsx` | Privacy policy, cookies, data retention, user rights |
| `/employee-services` | `routes/employee-services.tsx` | Employee portals (Skyward, Edison, Mark III), benefits, training videos |
| `/history` | `routes/history/index.tsx` | Founding story — 7 narrative sections (Cherokee Homeland through Modern Era) |
| `/history/timeline` | `routes/history/timeline.tsx` | 48-event timeline across 6 eras with color-coded category dots |
| `/history/$slug` | `routes/history/$slug.tsx` | Heritage site detail pages (8 sites: Rocky Mount, Netherland Inn, etc.) |
| `/communities` | `routes/communities/index.tsx` | Community hub — 6 municipality cards |
| `/communities/$slug` | `routes/communities/$slug.tsx` | Community detail (Kingsport, Bristol, Blountville, Bluff City, Piney Flats, Colonial Heights) |
| `/about` | `routes/about.tsx` | County overview, demographics, Tri-Cities MSA context |
| `/economic-development` | `routes/economic-development.tsx` | Top employers, sector breakdown, economic assets |
| `/education` | `routes/education.tsx` | School systems, higher ed, educational attainment stats |
| `/transportation` | `routes/transportation.tsx` | TRI airport, highways, transit, official TDOT/TN 511 road resources + historical context |
| `/people` | `routes/people.tsx` | Notable historical figures grid (7 people) |
| `/visit` | `routes/visit.tsx` | Heritage Trail, parks, recreation, events, TVA lake-level links, getting here |
| `/weather` | `routes/weather.tsx` | NWS weather + USGS river conditions: action summary, alerts, current conditions, hourly outlook, day/night forecast, temperature trend, river gauges, TVA lake links, and TDOT/TN 511 road links |

## Data Files
| File | Content |
|------|---------|
| `data/departments.ts` | 25 departments with contacts, services, offices, staff, external links |
| `data/commissioners.ts` | 24 commissioners across 11 districts |
| `data/news.ts` | County news articles with full content + PDF attachments |
| `data/quick-services.ts` | 8 quick-access service links for homepage |
| `data/documents.ts` | 115 documents across 17 categories (PDF, DOC, DOCX, TIF) with types and helpers |
| `data/search-index.ts` | Unified search index (departments, news, commissioners, documents, heritage sites, communities, pages) |
| `data/heritage-sites.ts` | 8 heritage sites with NRHP/NHL info, coordinates, key facts, trail stops |
| `data/timeline.ts` | 48 timeline events (1761–2025) across 6 categories with color coding |
| `data/communities.ts` | 6 communities with population, type, landmarks, highlights, at-a-glance stats |
| `data/notable-people.ts` | 7 notable figures with categories, years, achievements |
| `data/employers.ts` | 11 top employers + 3 sector employment entries |
| `data/education.ts` | 6 school systems/institutions with types, enrollment, descriptions |
| `data/meeting-minutes.ts` | Meeting minutes with committee, date, titles, PDF attachments |
| `data/form-definitions.ts` | 4 form types with field definitions and validation |
| `data/site-config.ts` | Centralized SITE_URL, SITE_NAME, CURRENT_YEAR constants |
| `data/nav-verbs.ts` | 5 verb-based primary nav definitions (Find/Pay/Apply/Report/About) — each verb maps to concrete citizen tasks with internal/external link tags |
| `data/holidays.ts` | 13 county holidays computed annually (fixed dates + Easter via Computus + observed-on-nearest-weekday for fixed-date holidays falling on weekends) |
| `data/official-links.ts` | Central official external links for TDOT SmartWay, TN 511, and TVA lake-level pages |

## Key Components
| Component | Location | Purpose |
|-----------|----------|---------|
| SiteNav | `components/layout/SiteNav.tsx` | Glass-morphism nav with mega-menu (keyboard nav) + Cmd+K search (code-split) + mobile focus trap |
| SiteFooter | `components/layout/SiteFooter.tsx` | Footer with mountain silhouette + heritage ornament |
| AnnouncementBanner | `components/layout/AnnouncementBanner.tsx` | Dismissible banner (localStorage persistence) |
| SearchDialog | `components/layout/SearchDialog.tsx` | Fuse.js fuzzy search modal (Cmd+K), ARIA combobox pattern, lazy-loaded |
| NotFound | `components/layout/NotFound.tsx` | Custom 404 page with quick links + search hint |
| HeroBanner | `components/home/HeroBanner.tsx` | Citizen-first hero with search trigger, top task cards, county-status panel, next meeting, and weather badge |
| QuickServices | `components/home/QuickServices.tsx` | 8-card service grid with scroll reveals |
| DepartmentCategories | `components/home/DepartmentCategories.tsx` | 6 category cards with scroll reveals |
| CommunityHighlights | `components/home/CommunityHighlights.tsx` | 3 tourism/regional attraction cards |
| NewsSection | `components/home/NewsSection.tsx` | Editorial news layout with featured first item |
| DepartmentDetail | `components/departments/DepartmentDetail.tsx` | Department page with category-tinted banner |
| NewsDetail | `components/news/NewsDetail.tsx` | Article detail with header, body, PDF/source links |
| NewsCard | `components/shared/NewsCard.tsx` | News card with internal link + PDF badge |
| VideoEmbed | `components/shared/VideoEmbed.tsx` | Privacy-enhanced YouTube (click-to-load, nocookie) |
| ContactCard | `components/shared/ContactCard.tsx` | Reusable contact info card |
| CommissionerGrid | `components/commissioners/CommissionerGrid.tsx` | District grid with alternating backgrounds |
| CommissionerCard | `components/commissioners/CommissionerCard.tsx` | Individual commissioner card with headshot |
| AboutSection | `components/home/AboutSection.tsx` | "Where Tennessee Began" section with courthouse photos |
| DepartmentCard | `components/departments/DepartmentCard.tsx` | Department card with category badge + phone |
| MountainDivider | `components/shared/MountainDivider.tsx` | SVG mountain ridge section dividers |
| useScrollReveal | `hooks/useScrollReveal.ts` | Intersection Observer scroll-reveal system |
| HeritageHero | `components/history/HeritageHero.tsx` | Hero with brand tagline + 1790/current year date device |
| HistoryNarrative | `components/history/HistoryNarrative.tsx` | Long-form editorial content sections with scroll-reveal |
| HeritageSiteCard | `components/history/HeritageSiteCard.tsx` | Heritage site card with NRHP/NHL badges |
| VisitorInfoCard | `components/history/VisitorInfoCard.tsx` | Visitor info sidebar (hours, admission, location, website) |
| TimelineSection | `components/history/TimelineSection.tsx` | Alternating vertical timeline with color-coded era dots |
| CommunityCard | `components/communities/CommunityCard.tsx` | Community card with type badge, population, highlights |
| PersonCard | `components/people/PersonCard.tsx` | Notable person card with category badge + achievement |
| FormField | `components/forms/FormField.tsx` | Reusable form input with label, help text, and role="alert" error |
| FormLayout | `components/forms/FormLayout.tsx` | Form page wrapper with validation states |
| StatusBadge | `components/admin/StatusBadge.tsx` | Admin status badge (new/reviewed/resolved) |
| AdminLayout | `components/admin/AdminLayout.tsx` | Admin sidebar + mobile nav with auth-aware links |

## Static Assets
| Directory | Content |
|-----------|---------|
| `public/documents/` | 115 documents in 17 subdirectories (PDF, DOC, DOCX, TIF) |
| `public/images/commissioners/` | Commissioner headshots (23 images) |
| `public/images/officials/` | Mayor headshot |
| `public/rss.xml` | Static RSS feed (generated via `scripts/generate-rss.ts`) |
| `public/sitemap.xml` | Static sitemap (generated via `scripts/generate-sitemap.ts`, 65 URLs) |
| `public/robots.txt` | Crawler directives + sitemap reference |
| `public/_headers` | Security headers (CSP, HSTS, X-Frame-Options) + cache control |

## Packages Added (2026-05-06 audit)
| Package | Purpose |
|---------|---------|
| `zod` | Server function input validation |
| `date-fns` | Date formatting and manipulation |
| `ulidx` | ULID-based IDs (replaces crypto.randomUUID()) |
| `sanitize-html` | XSS prevention for stored content |
| `@playwright/test` | E2E testing across desktop/tablet/mobile |
| `@axe-core/playwright` | Automated accessibility audits (WCAG 2.1 AA) |
| `@cloudflare/vitest-pool-workers` | Real Workers runtime testing |

## Testing
- Unit tests: `pnpm test`
- E2E tests: `pnpm exec playwright test`
- E2E UI mode: `pnpm exec playwright test --ui`
- Coverage: `pnpm test -- --coverage`

## Server Functions
| Function | File | Purpose |
|----------|------|---------|
| `login` | `server/auth.ts` | Admin authentication with ULID session + timing-safe password compare |
| `validateAdmin` | `server/auth.ts` | Session validation from cookie |
| `logout` | `server/auth.ts` | Session deletion + cookie clear |
| `submitContactForm` | `server/contact.ts` | Validates + stores contact form submissions in KV (90-day TTL) |
| `submitForm` | `server/forms.ts` | Validates + stores structured form submissions in D1 |
| `setCsrfCookie` | `server/csrf.ts` | Generates and sets CSRF double-submit cookie |
| `validateCsrf` | `server/csrf.ts` | Validates CSRF token against cookie |
| `rateLimit` | `server/rate-limit.ts` | In-memory rate limiter (IP-based) |
| `listNews/getNewsArticle/createNewsArticle/updateNewsArticle/deleteNewsArticle` | `server/admin-news.ts` | News CRUD (auth-gated) |
| `listMinutes/createMinutesEntry/updateMinutesEntry/deleteMinutesEntry` | `server/admin-minutes.ts` | Minutes CRUD (auth-gated) |
| `listSubmissions/updateSubmissionStatus` | `server/admin-submissions.ts` | Form submission management (auth-gated) |
| `listAnnouncements/createAnnouncement/updateAnnouncement/deleteAnnouncement` | `server/admin-announcements.ts` | Announcement CRUD (auth-gated) |
| `getRiverConditions` | `server/river-conditions.ts` | Live USGS streamflow and gauge-height data |
| `requireAdmin` | `server/guard.ts` | Shared auth guard for all admin endpoints |

## Cloudflare Bindings
| Binding | Type | Purpose |
|---------|------|---------|
| `DB` | D1 Database | Form submissions, news articles, meeting minutes, announcements, admin sessions (ID: `b24dd694-71b6-4f25-a5eb-88ff1f9527da`) |

## Brand Tokens (Appalachian Civic Heritage)
- `brand-navy` (#0c1e33) — primary, headers, nav, hero
- `brand-copper` (#a44d2a) — CTAs, accents, hover states (darkened for WCAG AA)
- `brand-brass` (#806840) — decorative elements on light backgrounds (darkened for WCAG AA)
- `brand-brass-light` (#c9a84c) — brass variant for dark/hero backgrounds
- `brand-sage` (#3d6b56) — finance category, success
- `brand-stone` (#756858) — secondary text, labels (darkened for WCAG AA)
- `brand-warm-gray` (#6a6560) — placeholder text, metadata (darkened for WCAG AA)
- `brand-cream` (#faf8f5) — page background
- `brand-parchment` (#f3efe9) — alternating section backgrounds
- `brand-slate` (#2d3038) — body text
- `brand-courts` (#6b4c8a) — courts category accent
- `brand-safety` (#a63d3d) — public safety category accent
- `brand-community` (#356868) — community category accent (darkened for WCAG AA)
- **Typography:** Libre Caslon Text (display/serif) + Outfit (body/sans)

## Deployment
- **Platform:** Cloudflare Workers
- **Worker:** sullivan-county-tn
- **Deploy:** `pnpm run deploy`
- **Before deploying** new D1 migrations, apply them remotely:
  ```sh
  pnpm exec wrangler d1 migrations apply --remote sullivan-county-db
  ```
  As of 2026-05-07 all migrations (`0000`, `0001_page_feedback`, `0002_announcement_severity`) are applied to remote. PageFeedback writes succeed, severity-tagged announcements render. Verified via `wrangler d1 execute --remote PRAGMA table_info(announcements)` and `SELECT name FROM sqlite_master`.
- **Spanish locale** in `src/locales/es.json` is machine-translated. Schedule a native Spanish-speaker review before claiming bilingual support in marketing. Spanish renders **client-side only** — `syncStoredLocale()` reads the `locale` cookie in a `useEffect`, so the first paint is always English. The Spanish UI flashes in immediately after hydration. To eliminate the flash, plumb cookie-aware language detection into the server entry in `__root.tsx` (out of scope for this pass).
- **Service worker / offline** is shipped via `public/sw.js` and registered in production from `__root.tsx`.

## Voice & content standards
This is a county government website. The reference points are GOV.UK, NYC.gov, the Smithsonian, NPR. **Not** a startup, **not** a SaaS product, **not** the Holston Partners cyberpunk redesign.
- **Plain English at ~7th-grade reading level.** "Pay your property taxes" not "Submit your annual property tax remittance."
- **"We" and "you,"** never "the county," "stakeholders," or "constituents."
- **Banned consultant words:** *engagement, deliverables, leveraging, stakeholders, ecosystem, robust, world-class.*
- **Lead with the verb.** "Find a department." "Get a permit." "Report a pothole."
- **Be specific.** Real phone numbers, real hours, real dates beat generic prose.
- **Civic restraint.** Heritage palette + Caslon + Outfit are the identity. Reserve copper/brass for true hierarchy moments. Mountain dividers used sparingly. Animation minimal.
- **Identity earns its place; utility earns the citizen's time.** Hero is "What do you need to do today?" + search + 5 top tasks; heritage and tourism appear after the civic service layer.

## Architecture notes for new components
- **Verb-based primary nav (`SiteNav.tsx` + `data/nav-verbs.ts`)** — top nav is five verbs: Find · Pay · Apply · Report · About. Records, meetings, and departments fold into Find to keep the top-level choice set small. Each verb opens a mega-panel of concrete tasks. Hover-open is gated behind `matchMedia("(hover: hover) and (pointer: fine)")` so touch devices use click-only. Click-outside closes via `pointerdown`. Arrow keys cycle through `data-panel-link` items inside the open panel; Escape closes and returns focus to the trigger. Find includes department category links with `/departments?category=...` search params. Adding a new task = edit `nav-verbs.ts`; the unit test in `tests/data/nav-verbs.test.ts` validates that internal targets resolve to real routes.
- **Parcel lookup (`components/property-taxes/ParcelLookup.tsx` + `server/parcel-lookup.ts`)** — single-box typeahead on `/property-taxes`. Calls `lookupParcelSuggestions` server fn which proxies the Tennessee Comptroller's TPAD autocomplete (`assessment.cot.tn.gov/TPAD/Search/Autocomplete/082/{q}`). No HTML scraping. Submitting deep-links to TPAD search results in a new tab. Three side-by-side CTAs: View assessment → TPAD, Pay your taxes → Trustee, View on map → ArcGIS Online web map. Rate-limited 30/min per IP, 4s upstream timeout, graceful "we couldn't reach the state database" copy on failure.
- **`useOpenStatus(hours)`** parses department `contact.hours` strings. Format **must** look like `"Monday-Friday, 8am-4:30pm"` (additional clauses after the period are ignored). Strings starting with `"24/7"` always resolve to "Open 24/7." Unparseable strings render no pill (graceful fallback). On SSR (no `now`), the hook returns a stable hours summary placeholder ("Mon–Fri · 8:00 AM–4:30 PM") so the pill is visible immediately; client hydration upgrades to live "Open until 4:30 PM" / "Closed · Holiday Name". The hook honors all 13 county holidays (computed in `src/data/holidays.ts`, including Easter via Computus + observed-on-nearest-weekday for fixed-date holidays) — government offices show "Closed · {Holiday}" on observed-closure days even within business hours.
- **Interactive county map (`src/components/home/CommunityMap.tsx`)** — boundary path derived once from US Census TIGER/Line FIPS 47163 polygon, equirectangular-projected at the county's center latitude into a 1000×373 viewBox (700-char SVG path committed; no runtime GeoJSON parsing). Six community pins computed from each municipality's lat/lng using the same projection. `Link to="/communities/$slug"` per pin; mobile fallback list when SVG pins are too small to tap. Replaces the old heritage trio of cards on the homepage.
- **County seal (`src/components/shared/CountySeal.tsx`)** — sourced from sullivancountytn.gov's official artwork, traced via potrace into `public/images/seal/sullivan-seal.svg` (47KB, brand-navy tinted) plus rastered fallbacks at 64/128/256/512px. Wired into the footer mark, the AboutSection heading row, the hero corner watermark (`mix-blend-screen` at 8% opacity, `lg:` only), and the printable dept-detail card.
- **`nextOccurrence(rule)`** computes the next concrete date for `{ dayOfWeek, nthOfMonth, time }` recurrence rules in America/New_York. `nthOfMonth` is `1 | 2 | 3 | 4 | "last"`. Used by `/calendar` and the homepage `NextMeetingCard`.
- **`AnnouncementBanner`** reads from D1 via `listPublicAnnouncements` server function. Title prefix `[urgent]` upgrades severity. Banner sets `--banner-height` on the document root; `SiteNav` and `body` consume that var to offset themselves. Manage rows in `/admin/announcements`.
- **`PageFeedback`** writes to the `page_feedback` D1 table via `submitPageFeedback` server function. Mounted on department detail, forms detail, and contact pages. Admin viewer is at `/admin/feedback` (future task — table populated even without UI).
- **`TelLink`** normalizes phone numbers to `tel:+1XXXXXXXXXX` consistently. Use it everywhere a phone number is rendered; do not write raw `<a href="tel:...">` strings.
- **`OpenStatusPill`** + **`SubmissionBadge`** + **vCard "Save Contact"** are the small civic-trust details — keep them on every department detail page going forward.

## Decision Log
| Decision | Rationale | Date |
|----------|-----------|------|
| Converted from Holston Partners template | Reuse proven TanStack Start + CF Workers scaffold | 2026-02-27 |
| Multi-page with file-based routing | Departments, commissioners, services each get own routes | 2026-02-27 |
| Static data files, no database | County info is relatively static, no D1 needed | 2026-02-27 |
| Blue/orange/green brand system | Blue=trust/government, orange=Tennessee energy, green=Appalachian heritage | 2026-02-27 |
| Appalachian Civic Heritage design v1 | Libre Caslon Text + Outfit fonts, navy/copper/brass palette, editorial layouts | 2026-02-27 |
| Appalachian Editorial design v2 | Cinematic hero with photo parallax, scroll reveals, mountain dividers, glass nav, stat counters | 2026-02-27 |
| Fuse.js for site search | Client-side fuzzy search, ~5KB gzipped, Cmd+K modal | 2026-02-28 |
| Static RSS via build script | No API routes needed — generate XML to public/ | 2026-02-28 |
| YouTube nocookie embeds | Privacy-enhanced click-to-load video player | 2026-02-28 |
| Documents served locally | 115 files (PDF, DOC, DOCX, TIF) in 17 category subdirectories under public/documents/ | 2026-02-28 |
| Contact form backend via KV | Server function stores submissions in CF KV (90-day TTL), no external email service | 2026-03-01 |
| Custom 404 page | Branded not-found with quick links + search hint, uses notFoundComponent | 2026-03-01 |
| Sitemap + robots.txt | Static generation scripts, 40 URLs, Google Search Console ready | 2026-03-01 |
| CF Web Analytics beacon | Free, privacy-friendly, no cookies — token from CF dashboard required | 2026-03-01 |
| Security headers via _headers | CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy | 2026-03-01 |
| Cache headers for static assets | Immutable 1yr for hashed assets, 1day docs, 1wk images | 2026-03-01 |
| Skip-to-content + reduced motion | WCAG 2.4.1 compliance, prefers-reduced-motion media query | 2026-03-01 |
| Honeypot spam protection | Hidden field rejects bots, better email regex, field length limits | 2026-03-01 |
| Canonical URLs + JSON-LD | GovernmentOrganization schema, article OG type for news, rel=canonical | 2026-03-01 |
| Heritage Content Layer | 11 new routes, 7 new components, 6 new data files for history, communities, civic pages | 2026-03-01 |
| Forms & Admin CRUD | 13 new routes for form submissions + admin dashboard with D1/Drizzle backend | 2026-03-15 |
| D1 + Drizzle ORM (news, minutes, announcements, sessions, submissions) | Migrated from static-only to full CRUD admin via D1 | 2026-03-15 |
| Admin login with ULID sessions | Timing-safe password comparison, rate-limited, httpOnly secure cookies, auth gate on all admin | 2026-05-06 |
| Zod validation on all server functions | Shared schemas in src/lib/schemas/, .inputValidator(zodSchema) on all 7 endpoints | 2026-05-06 |
| CSRF protection module | Double-submit cookie pattern, crypto.getRandomValues tokens | 2026-05-06 |
| Content sanitization | sanitize-html on all stored content (titles, bodies, summaries) | 2026-05-06 |
| Structured JSON logging | No PII in logs, console.error(JSON.stringify({...})) pattern | 2026-05-06 |
| WCAG AA color contrast pass (10/14 pages) | 6 brand token contrast fixes: stone, copper, brass, community, warm-gray @ 4.5:1+ | 2026-05-06 |
| Accessibility audit pass (13 ARIA issues resolved) | Main landmark, combobox ARIA, aria-live, aria-expanded, aria-modal, nav labels, form errors, heading hierarchy | 2026-05-06 |
| 24 unit + 164 E2E tests across 3 viewports | Vitest data integrity tests + Playwright user flows, a11y scans, admin auth | 2026-05-06 |
| Font preconnect hints | preconnect for fonts.googleapis.com + fonts.gstatic.com | 2026-03-01 |
| Code splitting (SearchDialog) | React.lazy + Suspense for SearchDialog/Fuse.js — bundle 502KB→415KB (17% reduction) | 2026-03-01 |
| WebP hero images | cwebp conversion (quality 80), `<picture>` with WebP sources before JPEG fallbacks — 60%+ savings | 2026-03-01 |
| Mega-menu keyboard nav | ArrowUp/Down cycling, Escape to close + focus return, roving tabindex | 2026-03-01 |
| Mobile menu focus trap | Tab wrapping (first↔last), Escape to close, focus return to hamburger | 2026-03-01 |
| Search dialog ARIA | role="combobox", aria-activedescendant, role="listbox"/"option" on results | 2026-03-01 |
| Google Maps click-to-load | MapEmbed component saves ~500KB initial load on /contact | 2026-03-01 |
| Root error boundary | errorComponent on root route with branded error page + refresh/home buttons | 2026-03-01 |
| Print stylesheet | @media print hides nav/footer, avoids breaks, shows link URLs | 2026-03-01 |
| Privacy policy rewrite | Removed WordPress boilerplate, now describes actual architecture (KV, Cloudflare, click-to-load) | 2026-03-01 |
| Department count fix | Corrected 27→25 in hero stats + AboutSection to match actual data | 2026-03-01 |
| PII sanitization | Contact form fallback log now only outputs submission ID, not full PII | 2026-03-01 |
| Heritage Content Layer | Add /history, /communities, /about, /visit, /people, /education, /economic-development, /transportation routes using fact-checked master reference doc | 2026-03-01 |
| Civic brand split | County site is the official services portal; Where Tennessee Began is the tourism/heritage bridge, not the primary government identity. | 2026-05-21 |
| History-first phasing | Phase 1 = history/heritage pages (story of Sullivan County). Communities/civic pages come later. | 2026-03-01 |
| SiteNav audit + disclosure rebuild | Removed dead `megaContainerRef` effect; switched mega-menu from invalid `role="menu"`/`menuitem` to proper disclosure (`aria-expanded` + `aria-controls` + `id`); added click-outside `pointerdown` close; gated hover open behind `matchMedia("(hover: hover) and (pointer: fine)")` so touch is click-only; added active-page indicators (`aria-current` + underline/left-border/parchment fill) to desktop links, Departments trigger, mobile links, and current department; anchored `hasDarkHeader` regex with `(\/|$)`; renamed `expandedCategory` → `mobileDeptsOpen`; `prefers-reduced-motion` now snaps entrance animations to opacity 1 with no delay. 15/15 mega-menu E2E pass. | 2026-05-06 |
| Mobile drawer hoisted out of `<nav>` | Critical bug: drawer was a child of `<nav>`, whose `backdrop-blur-lg` establishes a CSS containing block for fixed descendants. `top: 64px; bottom: 0` therefore resolved against the 64-px-tall nav (height: 0), making the drawer invisible and parking content under the nav so the first button was unclickable. Hoisted drawer + lazy SearchDialog out as fragment siblings so fixed positioning resolves against the viewport. Found via Playwright MCP audit on the deployed site. | 2026-05-06 |
| Duplicate `<main>` removal | Every route component renders its own `<main id="main-content">`; `__root.tsx` was wrapping `<Outlet />` in another one, producing nested `<main>` elements with duplicate IDs. Removed the wrapper; AdminLayout and `admin/login.tsx` now carry the id directly so the skip-link target works on admin routes too. | 2026-05-06 |
| Missing PWA icons generated | `manifest.webmanifest` referenced `android-chrome-192x192.png` + `512x512.png` that didn't exist (404 in prod console). Generated both from `favicon.svg` via `rsvg-convert`. | 2026-05-06 |
| SearchDialog a11y | Added visually-hidden `Dialog.Title` + `Dialog.Description` to satisfy Radix's "DialogContent requires a DialogTitle" requirement; was logging a console error every time the search dialog opened. | 2026-05-06 |
| Hero preload scoped to home route | `<link rel="preload" href="boone-lake-1920.webp">` lived in `__root.tsx` but the image only renders on `/`. Browser warned "preloaded but not used" on every other page. Moved preload into the home route's `head()` only. | 2026-05-06 |
| Speculation rules removed | React `dangerouslySetInnerHTML` rewrites `<script>` elements during hydration; the browser treats this as `innerHTML` insertion and ignores speculation-rules sets, so the script was never prefetching. Removed; reinstate only as static HTML outside React's tree. | 2026-05-06 |
| Property-tax landing page | Standalone `/property-taxes` route per blueprint Insight 11 (Property Tax-GIS-Mobile Convergence). Plain-language steps, 6-question FAQ accordion, "three offices three jobs" disambiguation, late-payment safety notice, FAQ + GovernmentService + BreadcrumbList JSON-LD. | 2026-05-06 |
| Search citizen-language aliases | Added `aliases?: string[]` to `SearchItem`. Fuse.js indexes them at weight 1.8. Maps "food stamps" → SNAP, "tags" → County Clerk, "deed" → Register of Deeds, etc. | 2026-05-06 |
| Mobile bottom tab bar | USWDS thumb-zone pattern: Pay · Search · Call. Hides itself when the soft keyboard is up via `visualViewport` ratio detection. `padding-bottom: env(safe-area-inset-bottom)` to clear the iOS notch. | 2026-05-06 |
| AudiencePathways homepage section | Brunswick / Greenville hybrid pattern: three audience tiles (Residents / Businesses / Visitors) below DepartmentCategories. Routes to `/departments?category=community`, `/economic-development`, `/visit`. | 2026-05-06 |
| FAQPage + GovernmentService JSON-LD | Every `/departments/$slug` emits a combined JSON-LD block (BreadcrumbList + GovernmentService + optional FAQPage when the dept has `faqItems`). Every `/forms/$type` emits GovernmentService with a `potentialAction` back to the form URL. | 2026-05-06 |
| Verb-based primary nav | Replaces heritage-led top nav with **Find · Pay · Apply · Report · About**. Each verb opens its own mega-panel of concrete tasks (GOV.UK / Cook County "I Want To" pattern). Records, meetings, and department browse tasks are consolidated under Find. Heritage routes remain under About. Data in `src/data/nav-verbs.ts`, validated by `tests/data/nav-verbs.test.ts`. | 2026-05-21 |
| Parcel lookup on /property-taxes | Single-box typeahead routes citizens to TPAD (state assessment) / Trustee (payment) / ArcGIS (map). Server fn proxies TPAD autocomplete; no HTML scraping. Closes the GIS-Trustee gap that blueprint Insight 11 calls "the highest-ROI integration available to most counties." | 2026-05-07 |
| Per-IP rate limit keys | `rate-limit.ts` now derives composite `key:ip` keys via `getRequestIP()` + CF-Connecting-IP. Previously global keys (`"contact"`, `"form-submit"`) meant one user blocked everyone in the same isolate. | 2026-05-07 |
| Unused shadcn primitives removed | `components/ui/card.tsx` and `components/ui/button.tsx` had zero imports. Deleted. Badge stays (used in 4 places). | 2026-05-07 |
| Homepage trimmed from 11 → 7 sections | Three competing IA models (QuickServices, DepartmentCategories, AudiencePathways) were stacked on the same page; verb nav already covers audience + departments. PromisesSection was banned consultant prose. Cuts ~45% of vertical scroll on mobile. | 2026-05-07 |
| QuickServices: 9 → 6 cards | Animal shelter, emergency services, veterans benefits dropped — all reachable via verb nav and search; emergency services is duplicated by EmergencyModule above. Grid widened from 4-col to 3-col so 6 cards fit cleanly in 2 rows. | 2026-05-07 |
| NextMeetingCard slimmed to single banner | Was a two-column hero card. Now a navy-banner row with date + .ics + watch-live + see-full-schedule actions. | 2026-05-07 |
| Hero stat-counter removed (static SSR render) | `useCountUp` was rendering "0+ Residents 0 Square Miles 0 Departments" in SSR HTML until JS hydrated and IntersectionObserver fired. Real correctness bug for slow JS / reduced motion / screen readers. Stats now render their final values directly. The unused hook was removed. | 2026-05-07 |
| Suggested-search chips under hero | Five static chips ("pay taxes · marriage license · trash pickup · pothole · voter registration") below the search input. Each dispatches `sullivan:open-search` with `detail.query`; `SearchDialog` accepts an `initialQuery` prop and pre-fills. | 2026-05-07 |
| Open-Now / Next-Meeting promoted | Almanac strip restructured: top row is one human sentence ("County offices Open until 4:30 PM today. Next commission meeting Thu May 21 at 6:30 PM."); identity stats stay below as quieter reinforcement. | 2026-05-07 |
| SeasonalRibbon (date-aware property-tax notice) | Component visible Oct 1 – Mar 1 only. Linked to `/property-taxes` with the Feb 28 deadline. Pure deterministic date check via `Intl.DateTimeFormat` in America/New_York. Unit-tested across 8 month boundaries. | 2026-05-07 |
| Typed Cloudflare env (Phase 1) | `src/server/env.ts` exports `getEnv/getDB/getKV` typed against `Cloudflare.Env`. All 10 prior `as Record<string, unknown>` cast sites refactored. `ADMIN_PASSWORD` declared via interface merging. NWS fetch hardened (5s AbortController + cf cache hint + retry). | 2026-05-07 |
| Drizzle-zod alignment (Phase 2) | `drizzle-zod` derives Zod insert/select schemas from Drizzle tables. All indexes lifted from raw SQL into `schema.ts` so `drizzle-kit generate` doesn't drift. ULID brand type at `src/lib/schemas/ids.ts`. `$inferSelect` types exported. | 2026-05-07 |
| shadcn/ui foundation (Phase 3) | 21 primitives installed via shadcn CLI. Theme overrides in `app.css` map shadcn vars to brand-navy/copper/cream with sharp 0.125rem radius (civic restraint). `<Button>` extended with `copper` and `navy` brand variants — used for all CTAs. | 2026-05-07 |
| react-hook-form + shadcn Form migration (Phase 4) | `/contact`, `/admin/login`, and all 4 `/forms/$type` pages migrated to react-hook-form + shadcn `<Form>` + Zod resolvers + Sonner toasts. `@tanstack/react-form` removed (was unused). Dynamic Zod schema built from `FormFieldDefinition[]` for `/forms/$type` so all 4 form types share one route. | 2026-05-07 |
| CopperWeathervane lifted from tennessee-starts-here | Animated copper compass-rose SVG that rotates with live NWS wind direction. Pure CSS, no framer-motion dependency. Brand-themed for Sullivan's copper palette. Drops into `/weather`'s side panel. | 2026-05-07 |
| Weather + river subsystem | NWS API integration (api.weather.gov, no key) plus USGS stream gauges for Beaver Creek, South Fork Holston, and North Fork Holston. KV-cached weather snapshot with SWR-on-read, D1 `weather_observations` archive, 24h trend chart, day/night forecast, and severity-tiered alert cards. | 2026-05-21 |
| PWA service worker + offline (Phase 5) | `public/sw.js` adapted from `where-tennessee-began`. Cache-first fonts, network-first navigation w/ Navigation Preload + `/offline.html` fallback, image cache eviction, stale-while-revalidate. Pre-caches emergency-critical pages. Branded `offline.html` with 911/Sheriff/EMA tel: links. `<OfflineBanner />` listens to `navigator.onLine`. | 2026-05-07 |
| 2026 PWA manifest spec | Full modern manifest: `id`, `scope`, `lang`, `display_override: ["standalone","minimal-ui"]`, `launch_handler.client_mode: "navigate-existing"`, `share_target` (citizens can share addresses INTO the contact form), `shortcuts` (Pay Taxes / Weather / Contact / Calendar quick-actions), maskable icon variant, categories. | 2026-05-07 |
| iOS / Android 2026 PWA polish | Multiple `apple-touch-icon` sizes (180/192/512), `mask-icon` for Safari pinned tab, `format-detection: telephone=no` (we use TelLink), `msapplication-TileColor`, `color-scheme: light`. | 2026-05-07 |
| EmergencyModule redesigned | Was 3-tile grid with copper-tinted 911 dominating the section. Now a quiet single-row navy strip with inline contacts. Civic restraint — citizens in real emergencies dial 911 directly, not via the county website. Dramatic copper-pulse treatment is reserved for the WeatherBadge / AnnouncementBanner severe-alert path. | 2026-05-07 |
| Scroll-reveal failsafe | `[data-reveal]` default state is now visible. `.js-reveal-armed` class on `<html>` opts INTO the hide-then-reveal effect. 2.5s failsafe in `useScrollReveal` force-reveals anything missed. `prefers-reduced-motion: reduce` honored. Fixes blank below-fold sections in headless screenshots and reduced-motion contexts. | 2026-05-07 |
| Fresh news content | 7 admin-quality news articles dated April-May 2026 (Memorial Day closure, Athletic Park grand opening, FY27 budget hearing, Apr 16 Commission recap, SR 126 Memorial Boulevard, May 15 burn permit deadline, severe weather prep). Grounded in real-world facts via NWS, TDOT, sullivancountytn.gov research. | 2026-05-07 |
| Live AnnouncementBanner | Seeded D1 row in remote (Memorial Day notice, expires 2026-05-26) so the banner renders on the live homepage. Banner had been wired but invisible due to empty D1. | 2026-05-07 |
| Visible breadcrumbs + Last-reviewed stamps | New `<DetailBreadcrumb>` component (shadcn Breadcrumb under the hood) mounted on all 5 detail page types. `lastUpdated` field on `Department` and `FormDefinition`; "Last reviewed [date]" stamp at the footer. GOV.UK trust pattern. | 2026-05-07 |
| Button standardization | Hand-rolled bg-brand-copper button patterns across 9 routes converted to `<Button variant="copper">`. Default radius 0.125rem (sharp). `link` variant uses brand-copper. | 2026-05-07 |
| StatusBadge brand-aligned | Was raw blue/yellow/green/gray-50 Tailwind colors. Now uses shadcn Badge with brand-sage for success states (resolved/published) and brand-stone for neutral (draft/archived). Blue/amber preserved for "new" and "reviewed" semantic distinctions. | 2026-05-07 |
| Code-quality audit baseline | 0 TODO/FIXME, 0 console.log, 0 hand-written `any`, all `target=_blank` have rel, all `<input>` label-associated, all POST handlers either rate-limit OR require admin auth (most do both). Documented in commit `a8115f5`. | 2026-05-07 |

## Heritage Content Layer — COMPLETE (2026-03-01)

All 5 phases built and production-verified:
- **Phase 1:** History Wing — 3 routes, 5 components, 6 data files
- **Phase 2:** Communities Wing — 2 routes, 1 component
- **Phase 3:** Civic & People — 6 routes, 1 component
- **Phase 4:** Integration — Nav, footer, homepage, search index, i18n updated
- **Phase 5:** Build verified, lint fixed, committed

### Key Patterns Established
- Heritage site data uses `getHeritageSiteBySlug()` / `getTrailStops()` helpers
- Timeline uses inline `var(--color-*)` styles (not dynamic Tailwind classes) for JIT compat
- Community cards link to `/communities/$slug` with TanStack Router `params`
- All new routes use `seo()` + `seoLinks()`, `useScrollReveal`, `MountainDivider` pattern
- History narrative sections use `HistoryNarrative` wrapper with eyebrow/title/background props
