# Sullivan County, Tennessee — Official Government Website

> Modern citizen services portal. Edge-deployed, PWA-installable, NWS-aware.

**Live:** https://sullivan-county-tn.codyboring.workers.dev
**Tagline:** *Where Tennessee Began and Begins*

---

## Status

| Layer | Result |
|---|---|
| **Live HTTP smoke (12 routes × 3 viewports)** | 12/12 → 200 |
| **Unit tests (Vitest)** | 79 / 79 |
| **E2E (Playwright × desktop + tablet + mobile)** | 117 / 117 critical-paths + user-flows; 21 / 21 a11y scans |
| **TypeScript (strict, `--noEmit`)** | clean |
| **Build** | 749.92 KB worker entry, ~3.7 s |
| **Lint (Biome)** | 0 errors |
| **A11y** | WCAG AA compliant — axe-core scans clean across 14 routes × 3 viewports |
| **Security** | Typed `Cloudflare.Env`, per-IP rate limit, Zod validation everywhere, ULIDs, XSS sanitization, structured JSON logging, timing-safe SHA-256 password compare |
| **PWA** | Service worker registered, offline.html fallback, 2026 manifest spec, iOS/Android max compat |
| **D1 migrations applied (remote)** | 4 / 4 |

---

## Documentation

| Doc | Purpose |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) | Repo entry-point: state, decision log, file map, voice rules |
| [`docs/CURRENT_STATE.md`](docs/CURRENT_STATE.md) | What's shipped, what's mocked, what's missing |
| [`docs/COMPONENT_INVENTORY.md`](docs/COMPONENT_INVENTORY.md) | All ~60 components (39 site + 21 shadcn primitives) |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Frontend, backend, data flow, security, Cloudflare services |
| [`docs/DEVELOPMENT_WORKFLOW.md`](docs/DEVELOPMENT_WORKFLOW.md) | Setup, commands, deployment, testing, code conventions |
| [`docs/GAP_ANALYSIS.md`](docs/GAP_ANALYSIS.md) | Active gaps ranked by demo-day impact |
| [`docs/NEXT_IMPLEMENTATION_PLAN.md`](docs/NEXT_IMPLEMENTATION_PLAN.md) | Top-7 leftover items, file-by-file lift instructions for the admin overhaul |
| [`docs/ADMIN-CREDENTIALS.md`](docs/ADMIN-CREDENTIALS.md) | Admin login + security notes |
| [`docs/SITE-AUDIT.md`](docs/SITE-AUDIT.md) | Archival — initial inception audit (March 2026) |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | TanStack Start (SSR) + TanStack Router (file-based) |
| React | 19.2 |
| Hosting | Cloudflare Workers (edge) |
| CSS | Tailwind CSS v4 + custom brand tokens |
| Components | **shadcn/ui (21 primitives)** + Radix UI |
| Forms | **react-hook-form + Zod resolvers + shadcn `<Form>`** |
| Toasts | Sonner |
| Database | Cloudflare D1 (SQLite) + Drizzle ORM + **drizzle-zod** for derived schemas |
| KV | Cloudflare KV (contact form + weather snapshot) |
| Validation | Zod 4 — derived from Drizzle where 1:1, hand-written for cross-field refines |
| IDs | ulidx (ULID-branded type at `src/lib/schemas/ids.ts`) |
| Search | Fuse.js (client-side fuzzy) |
| i18n | i18next + react-i18next (EN + ES) |
| Weather | **NWS API** (api.weather.gov, no key) → KV-cached SWR + D1 archive |
| PWA | `public/sw.js` (cache-first fonts, network-first nav with offline fallback, image cache eviction) + 2026 manifest spec + `<OfflineBanner />` |
| Lint / Format | Biome 2.x |
| Type checking | TypeScript strict + typed `Cloudflare.Env` via `npm run cf-typegen` |
| Testing | Vitest (unit) + Playwright (E2E × 3 viewports) + axe-core (a11y) |

---

## What's live

### 40 routes
**Public landing:** `/`, `/property-taxes`, `/weather`, `/about`, `/visit`, `/people`, `/economic-development`, `/education`, `/transportation`, `/employee-services`, `/ada-compliance`, `/privacy-policy`
**Departments:** `/departments` + 25 detail pages
**Commissioners:** `/commissioners` (24 across 11 districts)
**News:** `/news` + per-article pages (D1 + static merge)
**Documents:** `/documents` (115 files, 17 categories)
**Calendar:** `/calendar` (6 recurring meetings, .ics export)
**Contact / Forms:** `/contact`, `/forms` + 4 form types (Building Permit / Code Complaint / Public Records / Feedback)
**Heritage:** `/history`, `/history/timeline`, 8 heritage site pages, `/communities` + 6 community pages
**Admin:** `/admin/login`, `/admin`, news/minutes/announcements/submissions CRUD
**API:** `/api/health`

### Verb-based primary nav
**Pay · Apply · Report · Records · Meetings · Departments · About** — each verb opens a mega-panel of concrete tasks. Defined in `src/data/nav-verbs.ts`. GOV.UK / Cook County "I Want To" pattern; 81% failure rate of dept-only nav per civic IA research.

### Weather subsystem
- Live NWS data: forecast office MRX (Morristown), gridpoint 126,82, forecast zone TNZ017
- `<WeatherBadge />` on homepage almanac with copper-pulse on Severe NWS alerts
- `/weather` page: animated CopperWeathervane (rotates with live wind direction), 7-day forecast, hourly outlook, severity-tiered alert cards, 24-hour temperature trend chart
- KV-cached snapshot, SWR-on-read pattern, D1 archive every 10 min

### PWA + offline
- Service worker registered in production (`public/sw.js`)
- Pre-caches emergency-critical pages: `/`, `/property-taxes`, `/contact`, `/calendar`, `/weather`, `/departments/emergency-management`, `/departments/sheriff`
- Branded `/offline.html` with 911 / Sheriff / EMA `tel:` links
- 2026 manifest spec: `id`, `scope`, `display_override`, `launch_handler`, `share_target` (citizens can share addresses INTO the contact form), `shortcuts` (Pay Taxes / Weather / Contact / Calendar quick-actions on install), maskable icon
- `<OfflineBanner />` listens to `navigator.onLine` with brand-copper styling and safe-area awareness

### Trust signals on every detail page
- `<DetailBreadcrumb />` (Home > Section > Item) on `/departments/$slug`, `/news/$slug`, `/communities/$slug`, `/history/$slug`, `/forms/$type`
- "Last reviewed [date]" stamps at the bottom of department detail pages and form pages

### Civic UX details
- Hero with visible search + 5 task chips + 5 suggested-search pills + Open-Now / Next-Meeting almanac line
- Property-tax landing page with TPAD-typeahead `<ParcelLookup>` routing to 3 official portals (TPAD assessment / Trustee payment / ArcGIS map)
- Restrained EmergencyModule (single navy strip, civic restraint over alarm)
- SeasonalRibbon (date-aware, visible Oct 1 – Mar 1 only)
- Live AnnouncementBanner reading from D1 (Memorial Day notice currently active)
- Open-Now status pill (holiday-aware via Computus)
- Next-Meeting `.ics` export
- Online / in-person submission badges on forms and services
- vCard "Save Contact" exports on departments + commissioners
- "Was this page helpful?" feedback widget (D1-backed)
- Citizen-language search aliases ("food stamps" → SNAP, "tags" → County Clerk)
- Mobile bottom tab bar (Pay / Search / Call thumb-zone)
- Spanish locale (machine-translated; needs native review before claiming bilingual)
- Sonner toasts on all form submissions and admin mutations

---

## Quick commands

```bash
# Setup
npm ci
cp .dev.vars.example .dev.vars   # then fill in ADMIN_PASSWORD

# Develop
npm run dev                       # local Cloudflare Workers runtime

# Sanity-check before pushing
npx biome check . && npx tsc --noEmit && npm run build && npm test -- --run

# E2E
npx playwright test               # all viewports
npx playwright test --ui          # interactive

# Generate metadata
npm run generate:sitemap
npm run generate:rss

# D1 migrations
npx wrangler d1 migrations apply sullivan-county-db --local
npx wrangler d1 migrations apply sullivan-county-db --remote

# Deploy
npm run deploy
```

---

## Repository layout (high level)

```
src/
  components/
    home/           HeroBanner, WeatherBadge, EmergencyModule, QuickServices, NextMeetingCard,
                    NewsSection, CommunityMap, AboutSection, SeasonalRibbon
    weather/        CopperWeathervane (animated copper compass-rose)
    layout/         SiteNav (verb-based mega-panels), SiteFooter, AnnouncementBanner,
                    SearchDialog (Cmd+K), MobileBottomTabBar, LanguageToggle, NotFound
    departments/    DepartmentCard, DepartmentDetail, PrintableContactCard
    commissioners/  CommissionerGrid, CommissionerCard
    communities/    CommunityCard
    news/           NewsDetail
    history/        HeritageHero, HistoryNarrative, HeritageSiteCard, VisitorInfoCard, TimelineSection
    people/         PersonCard
    forms/          FormLayout
    minutes/        MinutesList, MinutesFilter
    admin/          AdminLayout, StatusBadge
    property-taxes/ ParcelLookup
    shared/         TelLink, OpenStatusPill, PageFeedback, OfflineBanner, DetailBreadcrumb,
                    ContactCard, InstallPrompt, MountainDivider, CountySeal, VideoEmbed, NewsCard, WeatherBadge
    ui/             21 shadcn primitives (accordion through tooltip)
  data/             17 files: departments, commissioners, news, documents, search-index,
                    heritage-sites, timeline, communities, notable-people, employers, education,
                    form-definitions, meeting-minutes, meetings, holidays, nav-verbs, site-config,
                    quick-services
  db/
    schema.ts       Drizzle tables (7) + indexes + drizzle-zod derived schemas
    migrations/     0000_round_lady_deathstrike, 0001_page_feedback, 0002_announcement_severity,
                    0003_weather_observations
  hooks/            useOpenStatus, useScrollReveal (with 2.5s failsafe), useCountUp, useLocale
  lib/
    schemas/        Zod schemas (ids.ts has the ULID brand type)
    i18n.ts, jsonld.ts, recurrence.ts, vcard.ts
  routes/           File-based routing (40 routes)
  server/
    env.ts          Typed getEnv / getDB / getKV
    auth.ts         login / validateAdmin / logout (ULID sessions, timing-safe SHA-256)
    contact.ts      submitContactForm → KV
    forms.ts        submitForm → D1
    public-news.ts, public-announcements.ts, public-weather.ts
    weather/        nws-client.ts (hardened fetch), refresh.ts (KV+D1 write)
    parcel-lookup.ts (TPAD proxy)
    page-feedback.ts
    admin-news.ts, admin-minutes.ts, admin-announcements.ts, admin-submissions.ts
    guard.ts, csrf.ts, rate-limit.ts
  styles/           app.css (Tailwind v4 + brand tokens + shadcn theme overrides)
  utils/            seo helpers

public/
  sw.js                           Service worker (~5 KB, brand-prefixed cache names)
  offline.html                    Branded fallback w/ 911 tel: links
  manifest.webmanifest            2026 PWA spec (shortcuts, share_target, maskable icon)
  documents/                      115 files in 17 subdirectories
  images/                         hero photos, commissioner headshots, courthouse, OG, county seal
  icons/                          favicon + apple-touch (180/192/512) + maskable
  rss.xml                         Static RSS (regenerated from src/data/news.ts)
  sitemap.xml                     Static sitemap (72 URLs)
  _headers                        CSP, HSTS, COEP, COOP

scripts/
  generate-rss.ts                 Imports from src/data/news.ts (no longer duplicated)
  generate-sitemap.ts             Imports from src/data/news.ts (no longer duplicated)

docs/                             See documentation table above
```

---

## Cloudflare bindings

| Binding | Resource |
|---|---|
| `DB` | D1 — `sullivan-county-db` (form submissions, news, minutes, announcements, sessions, page feedback, weather observations) |
| `CONTACT_SUBMISSIONS` | KV — contact form (90-day TTL) + weather snapshot (`weather:current`, 1-hour TTL) |

Worker name: `sullivan-county-tn`. Compatibility date: `2026-05-06`. Compatibility flags: `nodejs_compat`. Observability: enabled.

---

## Code conventions (essentials)

- **IDs:** Always `ulidx` ULIDs. Use `UlidSchema.brand<"Ulid">()` for nominal typing. Never `crypto.randomUUID()`.
- **Cloudflare bindings:** Always via `getEnv() / getDB() / getKV()` from `src/server/env.ts`. Never cast `as Record<string, unknown>`.
- **Forms:** react-hook-form + Zod resolver + shadcn `<Form>` + `<Input>` / `<Textarea>` / `<Select>` + Sonner toast on submit. `/contact` is the canonical reference.
- **CTAs:** `<Button variant="copper">` for primary, `<Button variant="navy">` for admin/secondary. Don't hand-roll `bg-brand-copper rounded-sm px-…` button classes.
- **Detail pages:** `<DetailBreadcrumb items={[...]} />` + "Last reviewed" stamp where the data has `lastUpdated`.
- **External links:** `target="_blank"` always paired with `rel="noopener noreferrer"`.
- **Phone numbers:** `<TelLink phone="..." />`, never raw `tel:` `<a>` tags.
- **Logging:** structured `console.error(JSON.stringify({ event, ... }))`. No `console.log`.
- **Money:** integer cents. Never floating point.
- **Pagination:** cursor-based only.

Full conventions in `docs/DEVELOPMENT_WORKFLOW.md`.

---

## Voice & content standards

This is a **county government website**. Reference points: GOV.UK, NYC.gov, the Smithsonian, NPR. **Not** a startup, **not** a SaaS product.

- Plain English at ~7th-grade reading level
- "We" and "you" — never "the county," "stakeholders," or "constituents"
- Banned consultant words: *engagement, deliverables, leveraging, stakeholders, ecosystem, robust, world-class*
- Lead with the verb. "Find a department." "Get a permit." "Report a pothole."
- Be specific. Real phone numbers, real hours, real dates beat generic prose.
- Civic restraint. Heritage palette + Caslon + Outfit. Mountain dividers used sparingly. Animation minimal.
- Identity earns its place; utility earns the citizen's time.

---

## License

This is a Cody Boring project. Source structure may be referenced; the brand assets, county content, and seal artwork remain Sullivan County's.
