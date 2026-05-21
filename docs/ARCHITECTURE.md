# Sullivan County TN -- Architecture Document

> **Brand:** Official services. Local government. Community information. Tourism bridge: Where Tennessee Began.
> **Stack:** TanStack Start + Cloudflare Workers + Tailwind CSS v4 + shadcn/ui
> **Last updated:** 2026-05-21

---

## Recent additions (2026-05-21)

The site has been through a 7-phase production-hardening pass. New subsystems / patterns added since the previous version of this doc:

- **`src/server/env.ts`** — typed `getEnv()` / `getDB()` / `getKV()` helpers against `Cloudflare.Env`. **All server functions consume these instead of casting `as Record<string, unknown>`.**
- **`drizzle-zod`** — `createInsertSchema` / `createSelectSchema` derived per-table from `src/db/schema.ts`. Indexes now declared in `schema.ts` so `drizzle-kit generate` doesn't drift. ULID brand type at `src/lib/schemas/ids.ts`.
- **shadcn/ui foundation** — 21 primitives installed via `npx shadcn@latest add`. Theme overrides in `app.css` map shadcn vars to brand tokens. `<Button>` extended with `copper` and `navy` brand variants for civic CTAs.
- **react-hook-form + Zod resolvers** — adopted on `/contact`, `/admin/login`, and **all 4 `/forms/$type` form types** (dynamic Zod schema built from `FormFieldDefinition[]` at render time). `@tanstack/react-form` removed.
- **Sonner toasts** — `<Toaster />` mounted in `__root.tsx`. All form submissions and admin mutations toast.
- **PWA + offline (Phase 5)** — `public/sw.js` (cache-first fonts, network-first nav with Navigation Preload + `/offline.html` fallback, image cache eviction, stale-while-revalidate). `public/offline.html` branded with 911/Sheriff/EMA tel: links. `public/manifest.webmanifest` is the full **2026 spec** (`id`, `scope`, `lang`, `display_override`, `launch_handler`, `share_target`, `shortcuts`, maskable icon). `<OfflineBanner />` listens to `navigator.onLine`.
- **Weather + river subsystem** — NWS API integration (api.weather.gov, no key) plus USGS stream gauges. MRX gridpoint 126,82, forecast zone TNZ017. KV-cached snapshot with SWR-on-read. D1 `weather_observations` archives every 10 min for the trend chart. `<WeatherBadge />` on the homepage status panel, `<CopperWeathervane />`, and river cards for Beaver Creek, South Fork Holston, and North Fork Holston.
- **Search and mobile navigation upgrades** — `SearchDialog` uses shadcn `<CommandDialog>` with Fuse.js aliases. Mobile navigation uses shadcn `<Sheet>` instead of a custom focus trap.
- **`<DetailBreadcrumb>`** + **`lastUpdated` stamps** on all 5 detail page types (`/departments/$slug`, `/news/$slug`, `/communities/$slug`, `/history/$slug`, `/forms/$type`).
- **iOS / Android 2026 PWA standards** — multi-size apple-touch-icon, mask-icon for Safari pinned tab, `format-detection: telephone=no`, `msapplication-TileColor`, `color-scheme: light`.
- **Scroll-reveal failsafe** — `useScrollReveal` adds `.js-reveal-armed` to `<html>` so `[data-reveal]` is visible by default. 2.5s failsafe force-reveals anything missed. `prefers-reduced-motion: reduce` honored.

See `CURRENT_STATE.md` for the full state and `NEXT_IMPLEMENTATION_PLAN.md` for what's left.

---

## Table of Contents

1. [Frontend Architecture](#frontend-architecture)
2. [Backend Architecture](#backend-architecture)
3. [Data Architecture](#data-architecture)
4. [Data Flow](#data-flow)
5. [Route Map](#route-map)
6. [Cloudflare Services](#cloudflare-services)
7. [Security Architecture](#security-architecture)
8. [Design System](#design-system)

---

## Frontend Architecture

### Framework & Runtime

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | TanStack Start (SSR) | ^1.167.64 |
| Router | TanStack Router (file-based) | ^1.169.2 |
| React | React | ^19.2.5 |
| Language | TypeScript (strict) | latest |
| Build | Vite + Cloudflare Vite Plugin | latest |

### Routing

File-based routing via TanStack Router with `src/routes/` as the route root. The root route (`__root.tsx`) provides shared layout: `AnnouncementBanner` → `SiteNav` → `Outlet` → `SiteFooter`. Route features include:

- **SEO:** Every route emits `meta` tags, `rel=canonical`, JSON-LD structured data (`GovernmentOrganization` schema)
- **Error boundary:** Branded `errorComponent` with refresh/home buttons
- **Not found:** Custom `NotFound` component with quick links
- **Scroll restoration:** Enabled via router config
- **Preloading:** Speculation rules (`moderate` eagerness) prefetch all links on hover
- **Code splitting:** `SearchDialog` (Fuse.js ~5KB) lazy-loaded via `React.lazy` + `Suspense`

```
src/router.tsx          # createRouter() with routeTree
src/routeTree.gen.ts    # Auto-generated route tree
src/routes/__root.tsx   # Root layout, head tags, error boundary
```

### Styling

| System | Technology |
|--------|-----------|
| Utility framework | Tailwind CSS v4 |
| Animation library | tw-animate-css |
| Component library | shadcn/ui + Radix UI primitives |
| Icon set | Lucide React |
| Class merging | tailwind-merge + clsx (CVA) |

Custom brand tokens are defined as CSS custom properties in `src/styles/app.css` using hex colors (see [Design System](#design-system)). The design system supports both light and dark modes via `.dark` class.

### Internationalization

| Library | Version | Notes |
|---------|---------|-------|
| i18next | ^25.10.10 | Core i18n framework |
| react-i18next | ^16.6.6 | React bindings |

**Supported locales:** English (`en`) and Spanish (`es`). Locale persistence via cookie (`locale=`, 1yr TTL, SameSite=Strict). The `syncStoredLocale()` hook runs on root mount. `useTranslation()` provides `t()` function throughout components.

### Custom Hooks

| Hook | File | Purpose |
|------|------|---------|
| `useScrollReveal` | `hooks/useScrollReveal.ts` | Intersection Observer-based scroll-reveal system. Applies `.revealed` class when elements enter viewport. Supports `data-reveal` variants: `slide-left`, `scale`, default (fade-up). Respects `prefers-reduced-motion`. |
| `useLocale` | `hooks/useLocale.ts` | Locale state management. Exposes `locale`, `setLocale()`, and wraps `useTranslation()`. |

### Search

Client-side fuzzy search via **Fuse.js v7** (`~5KB gzipped`) rendered inside shadcn `<CommandDialog>`. A unified search index (`data/search-index.ts`) combines all data sources (departments, news, commissioners, documents, heritage sites, communities, pages). The `SearchDialog` component is code-split and activated via `Cmd+K` / `Ctrl+K`. shadcn Command provides the keyboard model for arrow navigation, Enter selection, and Escape close.

`SearchDialog` also supports prefilled opening state via `initialQuery` for cross-component entry points (hero/search chips/mobile quick actions).

### Navigation state model

`src/components/layout/site-nav-state.ts` is the shared source of truth for menu active-state calculations:

- `hasMatchingSearchCategory(task, searchStr)`
- `isTaskActive(task, pathname, searchStr)`
- `isVerbActive(verb, pathname, searchStr)`

This ensures nav highlighting reflects both route path and category query filters (for example `/departments?category=courts`) on desktop and mobile.

---

## Backend Architecture

### Runtime

| Layer | Technology |
|-------|-----------|
| Runtime | Cloudflare Workers |
| Compatibility date | 2026-05-06 |
| Compatibility flags | `nodejs_compat` |
| Server framework | TanStack Start server functions |

### Server Functions

All server functions use `createServerFn()` from TanStack Start with `.inputValidator(zodSchema)` on mutation endpoints. Every write path follows: **Zod validate → idempotency key → authority gate → execute → receipt**.

| Function | File | Method | Auth | Validator | Purpose |
|----------|------|--------|------|-----------|---------|
| `login` | `server/auth.ts` | POST | No | `loginSchema` | Admin login with ULID session |
| `validateAdmin` | `server/auth.ts` | GET | No | -- | Session validation from cookie |
| `logout` | `server/auth.ts` | POST | No | -- | Session deletion + cookie clear |
| `submitContactForm` | `server/contact.ts` | POST | No | `contactFormSchema` | Contact form → KV store (90-day TTL) |
| `submitForm` | `server/forms.ts` | POST | No | `submitFormSchema` | Structured form → D1 store |
| `setCsrfCookie` | `server/csrf.ts` | -- | No | -- | Generates CSRF double-submit cookie |
| `validateCsrf` | `server/csrf.ts` | -- | No | -- | Validates CSRF token against cookie |
| `listNews` | `server/admin-news.ts` | GET | Yes | -- | List all news articles |
| `getNewsArticle` | `server/admin-news.ts` | GET | Yes | -- | Get single article by ID |
| `createNewsArticle` | `server/admin-news.ts` | POST | Yes | `createNewsArticleSchema` | Create article |
| `updateNewsArticle` | `server/admin-news.ts` | POST | Yes | `updateNewsArticleSchema` | Update article |
| `deleteNewsArticle` | `server/admin-news.ts` | POST | Yes | `deleteNewsArticleSchema` | Delete article |
| `listMinutes` | `server/admin-minutes.ts` | GET | Yes | -- | List all meeting minutes |
| `createMinutesEntry` | `server/admin-minutes.ts` | POST | Yes | `createMinutesEntrySchema` | Create minutes entry |
| `updateMinutesEntry` | `server/admin-minutes.ts` | POST | Yes | `updateMinutesEntrySchema` | Update minutes entry |
| `deleteMinutesEntry` | `server/admin-minutes.ts` | POST | Yes | `deleteMinutesEntrySchema` | Delete minutes entry |
| `listAnnouncements` | `server/admin-announcements.ts` | GET | Yes | -- | List all announcements |
| `createAnnouncement` | `server/admin-announcements.ts` | POST | Yes | `createAnnouncementSchema` | Create announcement |
| `updateAnnouncement` | `server/admin-announcements.ts` | POST | Yes | `updateAnnouncementSchema` | Update announcement |
| `deleteAnnouncement` | `server/admin-announcements.ts` | POST | Yes | `deleteAnnouncementSchema` | Delete announcement |
| `listSubmissions` | `server/admin-submissions.ts` | GET | Yes | -- | List form submissions |
| `updateSubmissionStatus` | `server/admin-submissions.ts` | POST | Yes | `updateSubmissionStatusSchema` | Update submission status |

### Shared Zod Schemas

Located in `src/lib/schemas/`:

| Schema File | Exports | Validates |
|------------|---------|-----------|
| `auth.ts` | `loginSchema` | Admin login password |
| `contact.ts` | `contactFormSchema` | Contact form (name, email, subject, message, honeypot) |
| `forms.ts` | `submitFormSchema` | Form submissions (formType, name, email, phone, fields, honeypot) |
| `news.ts` | `createNewsArticleSchema`, `updateNewsArticleSchema`, `deleteNewsArticleSchema` | News article CRUD |
| `minutes.ts` | `createMinutesEntrySchema`, `updateMinutesEntrySchema`, `deleteMinutesEntrySchema` | Meeting minutes CRUD |
| `announcements.ts` | `createAnnouncementSchema`, `updateAnnouncementSchema`, `deleteAnnouncementSchema` | Announcement CRUD |
| `submissions.ts` | `updateSubmissionStatusSchema` | Submission status changes |

### Auth System

- **Sessions:** ULID-based via `ulidx` (not `crypto.randomUUID()`)
- **Storage:** D1 `admin_sessions` table (id, created_at, expires_at)
- **Password:** Timing-safe SHA-256 comparison via `crypto.subtle.digest("SHA-256")` + `crypto.subtle.timingSafeEqual()`
- **Cookie:** `admin_session`, `httpOnly`, `secure`, `SameSite=strict`, `path=/`
- **TTL:** 24 hours (configurable via `SESSION_TTL_MS`)
- **Guard:** `requireAdmin()` in `server/guard.ts` -- called on every admin endpoint

### Security Modules

| Module | File | Status |
|--------|------|--------|
| Auth gate | `server/guard.ts` | Active -- gates all admin endpoints |
| CSRF protection | `server/csrf.ts` | Module ready -- double-submit cookie pattern, `crypto.getRandomValues` tokens, not yet integrated into forms |
| Rate limiting | `server/rate-limit.ts` | Active -- in-memory IP-based token bucket |

### Structured Logging

All server-side console output uses structured JSON with no PII:

```typescript
console.error(JSON.stringify({ event: "auth_validation_failed", reason: "D1 unavailable" }));
```

Log events use the pattern: `{ event, reason, id? }` -- never include names, emails, passwords, or message bodies.

---

## Data Architecture

### Static Data Files (15 files, ~4093 lines)

All data is TypeScript with explicit types. Files are imported directly by route components:

| File | Lines | Contents |
|------|-------|----------|
| `data/departments.ts` | 934 | 25 departments with contacts, services, offices, staff, external links |
| `data/documents.ts` | 1089 | 115 documents across 17 categories (PDF, DOC, DOCX, TIF) |
| `data/timeline.ts` | 432 | 48 timeline events (1761--2025) across 6 categories |
| `data/heritage-sites.ts` | 226 | 8 heritage sites with NRHP/NHL info, coordinates, trail stops |
| `data/commissioners.ts` | 223 | 24 commissioners across 11 districts |
| `data/search-index.ts` | 235 | Unified Fuse.js search index (all data sources) |
| `data/form-definitions.ts` | 198 | 4 form types with field definitions and validation |
| `data/meeting-minutes.ts` | 173 | Meeting minutes with committee, date, titles, PDF attachments |
| `data/communities.ts` | 172 | 6 communities with population, type, landmarks, highlights |
| `data/news.ts` | 128 | County news articles with full content + PDF attachments |
| `data/employers.ts` | 75 | 11 top employers + 3 sector employment entries |
| `data/notable-people.ts` | 74 | 7 notable figures with categories, years, achievements |
| `data/education.ts` | 58 | 6 school systems/institutions with types, enrollment |
| `data/quick-services.ts` | 73 | 8 quick-access service links for homepage |
| `data/site-config.ts` | 3 | `SITE_URL`, `SITE_NAME`, `CURRENT_YEAR` constants |

### D1 Database (Drizzle ORM)

**Database:** `sullivan-county-db` (ID: `b24dd694-71b6-4f25-a5eb-88ff1f9527da`)
**Binding:** `DB`
**Migrations:** `src/db/migrations/`

| Table | Rows | Purpose |
|-------|------|---------|
| `news_articles` | Dynamic | CMS-managed news: id (ULID), title, slug (unique), author, summary, content (JSON), status (draft/published/archived), url, pdfUrl, publishedAt, timestamps |
| `meeting_minutes` | Dynamic | Meeting records: id (ULID), committee, date (ISO 8601), title, summary, pdfUrl, status (draft/published/archived), timestamps |
| `announcements` | Dynamic | Site announcements: id (ULID), title, body, linkUrl, active (boolean), startsAt, endsAt, timestamps |
| `form_submissions` | Dynamic | Structured form data: id (ULID), formType (building-permit/code-complaint/public-records/general-feedback), status (new/reviewed/resolved), name, email, phone, data (JSON blob), timestamps |
| `admin_sessions` | Dynamic | Auth sessions: id (ULID), createdAt, expiresAt |

**D1-specific patterns:** All IDs are ULID text strings (no auto-increment). All dates are ISO 8601 strings (no native DATE type). Boolean uses `integer({ mode: "boolean" })`. JSON stored as TEXT.

### KV Namespace

**Namespace:** `CONTACT_SUBMISSIONS` (ID: `e512ab18f079489fab252adba81cf501`)

| Key Pattern | Value | TTL |
|------------|-------|-----|
| `submission:{ulid}` | JSON `{ name, email, subject, message, submittedAt, id }` | 90 days |

### Pagination Pattern

Cursor-based pagination on list endpoints (admin). Offset-based pagination is never used.

### Response Envelope

All server function responses follow a consistent envelope:

```typescript
// Success
{ data: T }

// Error
{ error: { code: string, message: string } }
```

---

## Data Flow

### 1. Public Read

```
Route component → import static data file or D1 query → render
```

Static data files are imported directly as TypeScript modules. News and announcement data is loaded from D1 via server functions. No caching layer beyond Cloudflare's edge cache (configured via `_headers`).

### 2. Form Submission

```
Form UI (TanStack Form) → client-side validation → server function call →
Zod validation (.inputValidator) → honeypot check → D1/KV write → success response
```

Forms use TanStack React Form with Zod validation on both client and server. The `website` field acts as a honeypot -- if filled, the submission is silently rejected.

### 3. Admin CRUD

```
Admin UI → validateAdmin() auth check → server function → requireAdmin() guard →
Zod validation (.inputValidator) → sanitize-html on content → D1 write → response
```

All admin server functions:
1. Call `requireAdmin()` which validates the session cookie against D1
2. Apply per-endpoint rate limiting (30 req/60s for admin actions)
3. Validate input with Zod schemas
4. Sanitize stored content with `sanitize-html` (strips all tags and attributes)
5. Generate ULIDs via `ulidx()`
6. Return response envelope

### 4. Search

```
SearchDialog open (Cmd+K) → Fuse.js index built from search-index.ts →
Client-side fuzzy search → ARIA combobox UI with result navigation
```

The `SearchDialog` component is code-split (`React.lazy`) to keep main bundle size down (~415KB vs ~502KB). The Fuse.js instance is initialized once on dialog open. Results include departments, news, commissioners, documents, heritage sites, communities, and pages -- each linking to the appropriate route.

### 5. Contact Form

```
Contact form → client-side validation → submitContactForm() server function →
Zod validation (contactFormSchema) → honeypot check → rate limit (3/60s) →
KV put (submission:{ulid}, 90-day TTL) → { success: true, id }
```

Contact submissions are stored in KV with automatic expiration. No email service, no external API. Form data is never logged (only submission ID on failure).

---

## Route Map

### Government Portal (15 routes)

| Route | File | Purpose |
|-------|------|---------|
| `/` | `routes/index.tsx` | Homepage dashboard (hero, quick services, dept categories, news) |
| `/departments` | `routes/departments/index.tsx` | Department directory with category filter |
| `/departments/$slug` | `routes/departments/$slug.tsx` | Individual department detail (25 departments) |
| `/commissioners` | `routes/commissioners.tsx` | Commissioner grid by district (11 districts) |
| `/news` | `routes/news/index.tsx` | County news feed |
| `/news/$slug` | `routes/news/$slug.tsx` | News article detail page |
| `/calendar` | `routes/calendar.tsx` | Calendar & meetings (6 recurring schedules, YouTube live links) |
| `/minutes` | `routes/minutes.tsx` | Meeting minutes with committee filters |
| `/contact` | `routes/contact.tsx` | Contact hub (form, Google Maps, quick contacts, resources) |
| `/documents` | `routes/documents.tsx` | 115-document library with 17 categories, search, collapsible sections |
| `/ada-compliance` | `routes/ada-compliance.tsx` | ADA compliance info + 5 downloadable forms |
| `/privacy-policy` | `routes/privacy-policy.tsx` | Privacy policy, cookies, data retention, user rights |
| `/employee-services` | `routes/employee-services.tsx` | Employee portals (Skyward, Edison, Mark III), benefits, training |

### Heritage Layer (8 routes)

| Route | File | Purpose |
|-------|------|---------|
| `/history` | `routes/history/index.tsx` | Founding story -- 7 narrative sections (Cherokee Homeland through Modern Era) |
| `/history/timeline` | `routes/history/timeline.tsx` | 48-event timeline across 6 eras with color-coded category dots |
| `/history/$slug` | `routes/history/$slug.tsx` | Heritage site detail pages (8 sites) |
| `/communities` | `routes/communities/index.tsx` | Community hub -- 6 municipality cards |
| `/communities/$slug` | `routes/communities/$slug.tsx` | Community detail (6 municipalities) |
| `/about` | `routes/about.tsx` | County overview, demographics, Tri-Cities MSA context |
| `/economic-development` | `routes/economic-development.tsx` | Top employers, sector breakdown, economic assets |
| `/education` | `routes/education.tsx` | School systems, higher ed, educational attainment stats |
| `/transportation` | `routes/transportation.tsx` | TRI airport, highways, transit + historical context |
| `/people` | `routes/people.tsx` | Notable historical figures grid (7 people) |
| `/visit` | `routes/visit.tsx` | Heritage Trail, parks, recreation, events, getting here |

### Admin (10 routes)

| Route | File | Purpose |
|-------|------|---------|
| `/admin` | `routes/admin/index.tsx` | Admin dashboard overview |
| `/admin/login` | `routes/admin/login.tsx` | Admin login form |
| `/admin/news` | `routes/admin/news/index.tsx` | News article management list |
| `/admin/news/new` | `routes/admin/news/new.tsx` | Create news article form |
| `/admin/news/$id` | `routes/admin/news/$id.tsx` | Edit news article form |
| `/admin/minutes` | `routes/admin/minutes/index.tsx` | Meeting minutes management list |
| `/admin/minutes/new` | `routes/admin/minutes/new.tsx` | Create minutes entry form |
| `/admin/minutes/$id` | `routes/admin/minutes/$id.tsx` | Edit minutes entry form |
| `/admin/submissions` | `routes/admin/submissions.tsx` | Form submission management |
| `/admin/announcements` | `routes/admin/announcements.tsx` | Announcement CRUD (single-page) |

### Forms (2 routes)

| Route | File | Purpose |
|-------|------|---------|
| `/forms` | `routes/forms/index.tsx` | Form directory (4 form types) |
| `/forms/$type` | `routes/forms/$type.tsx` | Dynamic form renderer (building-permit, code-complaint, public-records, general-feedback) |

### API (1 route)

| Route | File | Purpose |
|-------|------|---------|
| `/api/health` | `routes/api/health.ts` | Health check endpoint |

---

## Cloudflare Services

### Active Services

| Service | Binding/Config | Purpose |
|---------|---------------|---------|
| Workers | `sullivan-county-tn` | Primary compute (SSR + server functions) |
| D1 | `DB` (bound) | Relational data: news, minutes, announcements, submissions, sessions |
| KV | `CONTACT_SUBMISSIONS` (bound) | Contact form storage with 90-day TTL |
| Observability | Enabled | Worker logs and metrics |

### Configured (Pending Token)

| Service | Status | Purpose |
|---------|--------|---------|
| Web Analytics | Beacon in `__root.tsx`, token needed | Privacy-friendly analytics (no cookies) |

### Static Asset Delivery

The `public/_headers` file configures:

| Path Pattern | Cache-Control | Purpose |
|-------------|--------------|---------|
| `/*` | Security headers (CSP, HSTS, etc.) | All responses |
| `/assets/*` | `max-age=31536000, immutable` | Hashed build assets (1 year) |
| `/documents/*` | `max-age=86400` | Document files (1 day) |
| `/images/*` | `max-age=604800` | Images (1 week) |
| `/favicon.*` | `max-age=604800` | Favicons (1 week) |

### wrangler.jsonc Configuration

```jsonc
{
  "name": "sullivan-county-tn",
  "compatibility_date": "2026-05-06",
  "compatibility_flags": ["nodejs_compat"],
  "main": "@tanstack/react-start/server-entry",
  "observability": { "enabled": true },
  "kv_namespaces": [{
    "binding": "CONTACT_SUBMISSIONS",
    "id": "e512ab18f079489fab252adba81cf501"
  }],
  "d1_databases": [{
    "binding": "DB",
    "database_name": "sullivan-county-db",
    "database_id": "b24dd694-71b6-4f25-a5eb-88ff1f9527da",
    "migrations_dir": "src/db/migrations"
  }],
  "env": {
    "preview": { "name": "sullivan-county-tn-preview" }
  }
}
```

### Static Files

| Path | Contents |
|------|----------|
| `public/rss.xml` | Generated RSS feed (`scripts/generate-rss.ts`) |
| `public/sitemap.xml` | Generated sitemap, 65 URLs (`scripts/generate-sitemap.ts`) |
| `public/robots.txt` | Crawler directives + sitemap reference |
| `public/documents/` | 115 documents in 17 category subdirectories |
| `public/images/` | Commissioner headshots, hero images (WebP + JPEG), og images |
| `public/_headers` | Security + cache headers |

### Secrets

| Secret | Set Via | Purpose |
|--------|---------|---------|
| `ADMIN_PASSWORD` | `wrangler secret put ADMIN_PASSWORD` | Admin login password value |

---

## Security Architecture

### Authentication

| Property | Implementation |
|----------|---------------|
| Session ID format | ULID (via `ulidx`) |
| Password storage | Worker secret (not stored in DB) |
| Password comparison | SHA-256 hash + `crypto.subtle.timingSafeEqual()` |
| Session cookie name | `admin_session` |
| Cookie flags | `httpOnly`, `secure`, `SameSite=strict`, `path=/` |
| Session TTL | 24 hours |
| Session storage | D1 `admin_sessions` table |
| Expired session cleanup | On each login, old sessions pruned |

### Rate Limiting

In-memory token bucket per IP/key:

| Key Pattern | Limit | Window | Applied To |
|------------|-------|--------|-----------|
| `auth-login` | 5 requests | 60 seconds | POST `/api/login` |
| `contact` | 3 requests | 60 seconds | POST contact form |
| `submission` | 3 requests | 60 seconds | POST `/forms/$type` |
| `admin-*` | 30 requests | 60 seconds | All admin CRUD endpoints |

### Cross-Site Protections

| Protection | Implementation |
|-----------|---------------|
| CSRF | Double-submit cookie pattern (`csrf.ts` -- module exists, pending form integration) |
| CSP | `Content-Security-Policy` header: `default-src 'self'`, script/connect allow CF analytics, fonts allow Google Fonts, frame allow YouTube nocookie |
| COEP | `Cross-Origin-Embedder-Policy: credentialless` |
| COOP | `Cross-Origin-Opener-Policy: same-origin` |
| HSTS | `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` |
| Frame protection | `X-Frame-Options: SAMEORIGIN` |
| Referrer policy | `strict-origin-when-cross-origin` |
| Permissions policy | All sensors/camera/mic/geolocation disabled |

### XSS Prevention

| Vector | Mitigation |
|--------|-----------|
| Stored content | `sanitize-html` on all admin CRUD writes (titles, bodies, summaries, content) -- strips all tags and attributes |
| Form output | React escapes by default; no `dangerouslySetInnerHTML` on user content |
| URLs | Zod `.url()` validation on external link fields |

### Spam Protection

| Mechanism | Implementation |
|-----------|---------------|
| Honeypot field | `website` field on contact form -- if filled, submission silently rejected |
| Rate limiting | 3 req/60s on contact and form endpoints |
| Field length limits | Zod `.max()` constraints on all text inputs |

### Data Privacy

| Rule | Implementation |
|------|---------------|
| No PII in logs | Structured JSON logs only include `event`, `reason`, and non-identifying `id` |
| KV expiration | Contact submissions auto-expire after 90 days |
| Session cleanup | Expired sessions purged on each login |
| Privacy policy | Describes actual architecture (KV, Cloudflare, click-to-load maps, no third-party trackers) |

### Full Security Headers (from `public/_headers`)

```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
Cross-Origin-Embedder-Policy: credentialless
Cross-Origin-Opener-Policy: same-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(),
  clipboard-read=(), clipboard-write=(self), display-capture=(),
  idle-detection=(), sync-xhr=(), screen-wake-lock=(), magnetometer=(),
  gyroscope=(), accelerometer=(), autoplay=(), fullscreen=(self)
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
Content-Security-Policy: default-src 'self';
  script-src 'self' https://static.cloudflareinsights.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' https://img.youtube.com data:;
  frame-src https://www.youtube-nocookie.com https://www.google.com;
  connect-src 'self';
  base-uri 'self';
  form-action 'self'
```

---

## Design System

### Brand Tokens (Appalachian Civic Heritage)

All tokens pass WCAG AA contrast thresholds (4.5:1 minimum for body text, 3:1 for large text).

| Token | Hex | OKLCH Equivalent | Role |
|-------|-----|-----------------|------|
| `brand-navy` | `#0c1e33` | -- | Primary: headers, nav, hero, footer |
| `brand-navy-light` | `#162d4a` | -- | Navy variant for hover states |
| `brand-navy-deep` | `#081624` | -- | Footer differentiation |
| `brand-blue` | `#1e3a5f` | -- | Secondary blue, info sections |
| `brand-blue-light` | `#2a5080` | -- | Blue variant for hover |
| `brand-copper` | `#a44d2a` | -- | CTAs, accents, hover states |
| `brand-copper-light` | `#cf6e3e` | -- | Copper hover/focus states |
| `brand-copper-muted` | `rgba(181,84,46,0.1)` | -- | Copper subtle backgrounds |
| `brand-brass` | `#806840` | -- | Decorative elements on light backgrounds |
| `brand-brass-light` | `#c9a84c` | -- | Brass variant for dark/hero backgrounds |
| `brand-sage` | `#3d6b56` | -- | Finance category, success states |
| `brand-sage-light` | `#5a9477` | -- | Sage hover/focus states |
| `brand-stone` | `#756858` | -- | Secondary text, labels, metadata |
| `brand-warm-gray` | `#6a6560` | -- | Placeholder text, subtle metadata |
| `brand-cream` | `#faf8f5` | `oklch(0.985 0 0)` | Page background |
| `brand-parchment` | `#f3efe9` | -- | Alternating section backgrounds |
| `brand-surface` | `#f0ece5` | -- | Card surfaces, borders |
| `brand-slate` | `#2d3038` | -- | Body text |
| `brand-slate-light` | `#5c6370` | -- | Lighter body text variant |

### Department Category Accents

| Token | Hex | Category |
|-------|-----|----------|
| `brand-courts` | `#6b4c8a` | Courts / judicial |
| `brand-safety` | `#a63d3d` | Public safety |
| `brand-community` | `#356868` | Community services |

### Typography

| Role | Font Family | Weights | Styles |
|------|------------|---------|--------|
| Display / Serif | Libre Caslon Text | 400, 700 | normal, italic |
| Body / Sans | Outfit | 300, 400, 500, 600, 700 | normal |

Google Fonts loaded via `<link>` with `display=swap`. Preconnect hints to `fonts.googleapis.com` and `fonts.gstatic.com`.

### Animations

| Name | Duration | Easing | Purpose |
|------|----------|--------|---------|
| `fadeUp` | 0.7s | `cubic-bezier(0.22, 1, 0.36, 1)` | Scroll-reveal default |
| `fadeIn` | 0.5s | `ease-out` | Simple fade entrance |
| `lineGrow` | 1.0s | `cubic-bezier(0.22, 1, 0.36, 1)` | Decorative line animation |
| `slideInRight` | 0.6s | `cubic-bezier(0.22, 1, 0.36, 1)` | Slide from left |
| `scaleIn` | 0.5s | `cubic-bezier(0.22, 1, 0.36, 1)` | Scale-up entrance |

All animations respect `prefers-reduced-motion: reduce` (forces `animation-duration: 0.01ms`, disables transitions, reveals all scroll-reveal elements immediately).

### Visual Elements

| Element | Implementation |
|---------|---------------|
| Mountain dividers | Inline SVG in `MountainDivider` component |
| Topographic texture | SVG data URI pattern (`.bg-topo-pattern`) |
| Noise grain overlay | SVG fractal noise filter (`.bg-grain`) |
| Heritage divider | CSS gradient: transparent → brass → copper → brass → transparent |
| Card lift | `translateY(-3px)` + shadow on hover |
| Glass-morphism nav | `SiteNav` with backdrop blur effect |
| Official headshots | CSS filter treatment: desaturated/contrasted/brightness |

### Print Stylesheet

`@media print` rules hide nav, footer, dialogs; force black-on-white; disable animations; show link URLs after external links; avoid page breaks inside cards and reveal elements.

### Performance Optimizations

| Technique | Details |
|-----------|---------|
| Speculation Rules API | `moderate` eagerness prefetch on all same-origin links |
| Content visibility | `.content-auto` uses `content-visibility: auto` for off-screen sections |
| Font preconnect | `<link rel="preconnect">` to Google Fonts CDN |
| Hero preload | `<link rel="preload">` for WebP hero image (1920w, `fetchpriority=high`) |
| DNS prefetch | `img.youtube.com`, `youtube-nocookie.com`, `google.com` |
| Code splitting | SearchDialog (Fuse.js ~5KB) lazy-loaded |
| View Transitions | `meta name="view-transition" content="same-origin"` |
| Privacy-first video | YouTube embeds use `youtube-nocookie.com` with click-to-load pattern |
| Google Maps lazy | MapEmbed uses click-to-load (~500KB saved on initial load) |
| WebP images | Hero images in WebP + JPEG `<picture>` fallback (~60% savings) |

---

## Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@tanstack/react-start` | ^1.167.64 | Full-stack SSR framework |
| `@tanstack/react-router` | ^1.169.2 | File-based type-safe routing |
| `@tanstack/react-query` | ^5.100.9 | Server state management |
| `@tanstack/react-form` | ^1.29.1 | Form state management |
| `react` | ^19.2.5 | UI library |
| `drizzle-orm` | ^0.45.2 | D1/SQLite ORM |
| `tailwindcss` | latest (v4) | Utility-first CSS |
| `shadcn/ui` | ^3.8.5 | Component system |
| `zod` | ^4.4.3 | Schema validation |
| `date-fns` | ^4.1.0 | Date manipulation |
| `ulidx` | ^2.4.1 | ULID generation |
| `fuse.js` | ^7.3.0 | Client-side fuzzy search |
| `i18next` | ^25.10.10 | Internationalization |
| `sanitize-html` | ^2.16.0 | XSS sanitization |
| `lucide-react` | ^0.575.0 | Icon set |
| `@biomejs/biome` | ^2.4.14 | Linting + formatting |
| `vitest` | ^4.1.5 | Unit testing |
| `@playwright/test` | ^1.59.1 | E2E testing |
| `@axe-core/playwright` | ^4.11.3 | Automated a11y audits |
| `wrangler` | latest | Cloudflare Workers CLI |
| `drizzle-kit` | ^0.31.9 | D1 migration tooling |
