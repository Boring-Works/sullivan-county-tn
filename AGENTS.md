# Sullivan County TN — Government Website

Citizen services portal for Sullivan County, Tennessee.
Brand: **Official services. Local government. Community information.** Tourism bridge: **Where Tennessee Began**.

## Sanity Check (always run before pushing)
```
pnpm exec biome check . && pnpm exec tsc --noEmit && pnpm exec vitest run && pnpm run build
```

## Testing
- Unit: `pnpm exec vitest run`
- E2E (all viewports): `pnpm exec playwright test`
- E2E (desktop only): `pnpm exec playwright test --project=desktop`
- E2E UI mode: `pnpm exec playwright test --ui`
- Admin password: set via `pnpm exec wrangler secret put ADMIN_PASSWORD`; never store it in docs.

## Build & Deploy
- Install: `pnpm install --frozen-lockfile`
- Dev: `pnpm run dev`
- Build: `pnpm run build`
- Test: `pnpm exec vitest run`
- Lint: `pnpm exec biome check .`
- Format: `pnpm exec biome format --write .`
- Deploy: `pnpm run deploy`
- CF Types: `pnpm run cf-typegen`
- Sitemap: `pnpm run generate:sitemap`
- RSS: `pnpm run generate:rss`

## Package Manager
pnpm

## Deploy
Cloudflare Workers (TanStack Start SSR). Config in wrangler.jsonc.
- Worker: sullivan-county-tn
- Preview: sullivan-county-tn-preview
- Live: https://sullivan-county-tn.codyboring.workers.dev
- Compatibility date: 2026-05-06

## Tech Stack
- TanStack Start + Router + Query
- **react-hook-form + @hookform/resolvers** (Zod resolver) — `/contact`, `/admin/login`, `/forms/$type` all migrated
- Cloudflare Workers + Vite Plugin
- Tailwind CSS v4
- Biome (lint + format)
- **shadcn/ui (21 primitives)** + Radix UI
- **Sonner** for toasts (mounted in `__root.tsx`)
- TypeScript strict mode + **typed `Cloudflare.Env`** (no `as Record<string, unknown>` casts)
- Drizzle ORM + **drizzle-zod** for derived schemas (D1)
- Cloudflare D1 (form submissions, news, minutes, announcements, sessions, page feedback, weather observations)
- Cloudflare KV (contact form submissions + weather snapshot)
- **NWS API** (api.weather.gov) for live weather + alerts
- **USGS waterservices** for live river/stream gauge conditions
- **PWA** (service worker + offline.html + 2026 manifest spec)
- Zod 4 (derived from Drizzle where 1:1, hand-written for cross-field refines)
- date-fns (date formatting)
- ulidx (ULID-based IDs, with branded type at `src/lib/schemas/ids.ts`)
- Fuse.js + shadcn Command (client-side fuzzy search)
- Vitest (testing)
- Playwright (E2E testing × desktop + tablet + mobile)
- axe-core (accessibility scans)

## Conventions
- Biome for linting and formatting (NOT eslint/prettier)
- 2-space indentation, 100 char line width
- File-based routing via TanStack Router
- Money as integer cents (avoid floating point)
- IDs as ULIDs via ulidx (never crypto.randomUUID())
- Dates: ISO 8601 strings, date-fns for manipulation
- Every write path: Zod validate → idempotency key → authority gate → execute → receipt
- Response envelope: { data: T } / { error: { code, message } }
- Cursor-based pagination only

## Do NOT
- Use eslint or prettier (this project uses Biome)
- Modify wrangler.jsonc deploy config without asking
- Use any type without justification
- Skip TypeScript strict checks
- Use crypto.randomUUID() (use ulidx ULIDs)
- Use Math.random() for security-sensitive values
- Log PII or secrets
- Use offset-based pagination
- Hardcode codyboring.workers.dev URL in new code (use site config)
- Use `console.log` (use structured `console.error(JSON.stringify({...}))`)
- Cast `env as Record<string, unknown>` (use `getEnv() / getDB() / getKV()`)
- Hand-roll bg-brand-copper button classes (use `<Button variant="copper">`)
- Add `target="_blank"` without `rel="noopener noreferrer"`

## Routes (41 total)
Citizen-facing: `/`, `/property-taxes`, `/departments`, `/departments/$slug`, `/commissioners`, `/news`, `/news/$slug`, `/calendar`, `/contact`, `/documents`, `/forms`, `/forms/$type`, `/ada-compliance`, `/privacy-policy`, `/employee-services`
Heritage / civic: `/history`, `/history/timeline`, `/history/$slug`, `/communities`, `/communities/$slug`, `/about`, `/economic-development`, `/education`, `/transportation`, `/people`, `/visit`
Admin (auth-gated): `/admin/login`, `/admin`, `/admin/news{,/new,/$id}`, `/admin/minutes{,/new,/$id}`, `/admin/announcements`, `/admin/submissions`
API: `/api/health`

## Primary nav (verb-based)
Pay · Apply · Report · Records · Meetings · Departments · About — defined in `src/data/nav-verbs.ts`. Each verb opens a mega-panel of concrete tasks (GOV.UK / Cook County "I Want To" pattern). Departments verb keeps the existing 6-category mega-menu.

## Data Files (17)
departments, commissioners, news, documents, quick-services, search-index, heritage-sites, timeline, communities, notable-people, employers, education, form-definitions, meeting-minutes, meetings, holidays, nav-verbs, site-config

## Server Functions (15 files)
- **env** (typed getEnv / getDB / getKV — used by all of the below)
- auth (login, validateAdmin, logout)
- contact (submitContactForm → KV)
- forms (submitForm → D1)
- parcel-lookup (lookupParcelSuggestions — proxies TN Comptroller TPAD)
- page-feedback (submitPageFeedback, listPageFeedback, deletePageFeedback)
- public-announcements (listPublicAnnouncements)
- public-news (listPublicNews, getPublicNewsArticle)
- public-weather (getCurrentWeather — KV-cached SWR / getRecentObservations)
- weather/nws-client (hardened NWS fetch w/ 5s timeout + cf cache hint + retry on 5xx)
- weather/refresh (refreshWeather → KV write + D1 archive)
- admin-news (CRUD)
- admin-minutes (CRUD)
- admin-announcements (CRUD)
- admin-submissions (list, updateStatus — rate-limited)
- guard (requireAdmin shared helper)
- csrf (token issue + validate — defined; primary defense is SameSite=Strict cookies)
- rate-limit (per-IP composite-key in-memory limiter)

## Cloudflare Bindings
- DB: D1 database (sullivan-county-db) — 4 migrations applied to remote
- CONTACT_SUBMISSIONS: KV namespace (contact form 90-day TTL + weather snapshot 1-hour TTL)
- ADMIN_PASSWORD: secret (set via `wrangler secret put`)

## Patterns to follow
- **Forms:** react-hook-form + Zod resolver + shadcn `<Form>` + Sonner toast. Reference: `src/routes/contact.tsx` and `src/routes/forms/$type.tsx` (dynamic schema from `FormFieldDefinition[]`).
- **CTAs:** `<Button variant="copper">` for primary, `<Button variant="navy">` for admin. Never hand-roll `bg-brand-copper rounded-sm` classes.
- **Cloudflare bindings:** `getEnv() / getDB() / getKV()` from `src/server/env.ts`. Never `as Record<string, unknown>`.
- **Detail pages:** `<DetailBreadcrumb items={[...]} />` + "Last reviewed" stamp where data has `lastUpdated`.
- **Phone numbers:** `<TelLink phone="..." />` — never raw `tel:` `<a>`.
- **Logging:** structured `console.error(JSON.stringify({ event, reason }))`. No `console.log`.
