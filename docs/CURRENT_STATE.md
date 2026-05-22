# Current State - Sullivan County TN Government Website

**Date:** 2026-05-21
**Live:** https://sullivan-county-tn.codyboring.workers.dev
**Repo:** https://github.com/Boring-Works/sullivan-county-tn
**Prepared with AI assistance.**

## Summary

The app is a production Cloudflare Workers deployment of a TanStack Start civic services portal for Sullivan County, Tennessee. The current site is positioned as an official government-service portal first, with tourism and heritage content as a secondary bridge.

Latest shipped baseline after this audit pass:

| Item | Value |
|---|---|
| Commit | `cf976a3 fix: harden civic audit findings` |
| Cloudflare version | `41f7f8aa-d70e-4cc9-9546-e386594d025c` |
| Health check | `/api/health` returned `{"status":"ok"}` at `2026-05-22T00:26:59.819Z` |
| Production smoke | 12/12 major routes returned 200 |
| Unit baseline | 106 tests across 21 files passed in this audit pass |
| Full Playwright baseline | 282 passed, 14 skipped, 1 flaky passed on retry in this audit pass |
| Live targeted Playwright | 5/5 civic foundation and responsive-flow checks passed against production |

This audit pass updated code and docs after reviewing the app file-by-file. Local verification passed with Biome, TypeScript, Vitest, production build, diff whitespace checks, and the full Playwright suite.

## What Is Shipped

| Area | Current state |
|---|---|
| Framework | TanStack Start SSR app on Cloudflare Workers |
| Styling | Tailwind CSS v4, brand tokens, shadcn/ui, Radix primitives |
| Runtime data | D1 for admin/content/forms/feedback/weather observations, KV for contact submissions and weather snapshot |
| Public services | Contact, public-records/forms, documents, property taxes, departments, meetings, news, weather, river gauges, communities, history, tourism bridge |
| Admin | Password login, ULID D1 sessions, news/minutes/announcements/submissions CRUD |
| Search | Fuse.js unified index, direct document results, direct task results, mobile safe-area dialog |
| Receipts | Contact, structured forms, and page feedback return public receipt IDs |
| Idempotency | Contact uses KV idempotency keys, forms and feedback use D1 idempotency columns with duplicate-key recovery |
| External handoffs | Centralized registry plus reusable link component with enforced `target="_blank"` and `rel="noopener noreferrer"` |
| Weather | NWS forecast/alerts through MRX gridpoint 126,82 plus USGS river gauges and TVA/TDOT links |
| PWA | Manifest, service worker, offline fallback, safe-area tags, install affordances |

## Routes

| Area | Routes |
|---|---|
| Public landing | `/`, `/property-taxes`, `/weather`, `/about`, `/visit`, `/economic-development`, `/education`, `/transportation`, `/people`, `/employee-services`, `/ada-compliance`, `/privacy-policy` |
| Departments | `/departments`, `/departments/$slug` for 25 departments |
| Commissioners | `/commissioners` |
| News | `/news`, `/news/$slug` |
| Documents | `/documents` with 115 files across 17 categories |
| Calendar | `/calendar` with recurring meetings and dated May 2026 civic highlights |
| Contact | `/contact` with KV-backed receipt flow |
| Forms | `/forms`, `/forms/$type` for 4 public form types |
| Heritage | `/history`, `/history/timeline`, `/history/$slug` |
| Communities | `/communities`, `/communities/$slug` |
| Admin | `/admin/login`, `/admin`, `/admin/news/*`, `/admin/minutes/*`, `/admin/announcements`, `/admin/submissions` |
| API | `/api/health` |

## Current Inventory

| Metric | Current value |
|---|---:|
| Component files | 73 |
| shadcn/ui component files | 22 |
| Site-specific component files | 51 |
| Data files | 22 |
| D1 migrations | 5 |
| Drizzle tables | 7 |
| Public documents | 115 |
| Document categories | 17 |
| Departments | 25 |
| Commissioners | 24 across 11 districts |
| Communities | 6 |
| Heritage sites | 8 |
| Public form types | 4 |
| News articles in static data | 14 |

## D1 State

Remote D1 database: `sullivan-county-db`.

Applied migrations in repo order:

| Migration | Purpose |
|---|---|
| `0000_round_lady_deathstrike.sql` | Initial content/admin/forms schema |
| `0001_page_feedback.sql` | Page feedback table |
| `0002_announcement_severity.sql` | Announcement severity support |
| `0003_weather_observations.sql` | Weather observation archive |
| `0004_receipts_idempotency.sql` | Receipt and idempotency columns for form submissions and feedback |

Tables:

| Table | Purpose |
|---|---|
| `news_articles` | CMS news articles |
| `meeting_minutes` | Meeting-minute records |
| `announcements` | Homepage/site notices |
| `form_submissions` | Structured public form submissions, receipt IDs, idempotency keys |
| `admin_sessions` | ULID admin sessions |
| `page_feedback` | Page helpfulness feedback, receipt IDs, idempotency keys |
| `weather_observations` | Weather snapshots for trend display |

## KV State

Namespace: `CONTACT_SUBMISSIONS`.

| Key pattern | Purpose | TTL |
|---|---|---:|
| `submission:{ulid}` | Contact form submission payload with receipt ID | 90 days |
| `contact:idempotency:{key}` | Contact submission duplicate protection | 90 days |
| Weather snapshot keys | Current weather snapshot cache | implementation-defined cache window |

## Security And Privacy

| Control | Status |
|---|---|
| Admin auth gates | Active on admin endpoints through `requireAdmin()` |
| Session IDs | ULIDs via `ulidx` |
| Password comparison | SHA-256 timing-safe compare |
| Admin password storage | Cloudflare secret only, not committed |
| Deployed admin E2E password | Read from `E2E_ADMIN_PASSWORD`; tests skip if unset |
| Public writes | Zod validation, rate limits, idempotency key, receipt ID |
| Stored HTML | Sanitized with `sanitize-html` |
| Logs | Structured JSON, no intentional PII logging |
| CSRF | Module exists; SameSite=Strict same-origin server functions are current primary defense |
| External links | Central handoff copy and enforced noopener/noreferrer for `ExternalHandoffLink` |

## Known Caveats

| Area | Status |
|---|---|
| Cloudflare Web Analytics | Not configured. `YOUR_TOKEN_HERE` remains a dashboard/user action item. |
| Cross-isolate rate limits | In-memory per isolate. Durable Object counters are the stronger future option. |
| CSRF token integration | Deferred unless cross-origin embeds or higher-risk public writes are added. |
| Admin feedback viewer | Server functions exist; dedicated route is still pending. |
| Audit log table | Not shipped. Add a migration and viewer if admin accountability becomes a priority. |
| Spanish translation | Machine-translated and needs native review before marketing as bilingual. |
| Commissioner photo | Barry Hopper still falls back to a generic icon. |
| Calendar highlights | May 2026 items are static civic highlights, not an automated events feed. |
| GitHub deploy | Workflow is guarded and skipped without `CLOUDFLARE_API_TOKEN`. |
| Preview deploys | Intentionally disabled until preview D1/KV bindings are isolated. |

## Verification Commands

Use this sequence before committing or deploying:

```sh
pnpm exec biome check .
pnpm exec tsc --noEmit
pnpm exec vitest run
pnpm run build
git diff --check
pnpm exec playwright test
```

Production verification after deploy:

```sh
/usr/bin/curl -fsS https://sullivan-county-tn.codyboring.workers.dev/api/health
```

Then smoke major public routes and verify receipt/idempotency, direct search, department task cards, calendar actions, and external handoff links.
