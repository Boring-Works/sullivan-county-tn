# Sullivan County TN — Government Website

Citizen services portal for Sullivan County, Tennessee.
Brand: **"Where Tennessee Began and Begins"**

## Sanity Check (always run before pushing)
```
npx biome check . && npx tsc --noEmit && npm run build && npm test -- --run
```

## Testing
- Unit: `npm test`
- E2E (all viewports): `npx playwright test`
- E2E (desktop only): `npx playwright test --project=desktop`
- E2E UI mode: `npx playwright test --ui`
- Admin password: `sullivan-admin-2026` (set via `wrangler secret put ADMIN_PASSWORD`)

## Build & Deploy
- Install: `npm ci`
- Dev: `npm run dev`
- Build: `npm run build`
- Test: `npm test`
- Lint: `npx biome check .`
- Format: `npx biome format --write .`
- Deploy: `npm run deploy`
- CF Types: `npm run cf-typegen`
- Sitemap: `npm run generate:sitemap`
- RSS: `npm run generate:rss`

## Package Manager
npm (use package-lock.json, NOT pnpm-lock.yaml)

## Deploy
Cloudflare Workers (TanStack Start SSR). Config in wrangler.jsonc.
- Worker: sullivan-county-tn
- Preview: sullivan-county-tn-preview
- Live: https://sullivan-county-tn.codyboring.workers.dev
- Compatibility date: 2026-05-06

## Tech Stack
- TanStack Start + Router + Query + Form
- Cloudflare Workers + Vite Plugin
- Tailwind CSS v4
- Biome (lint + format)
- shadcn/ui + Radix UI
- TypeScript strict mode
- Drizzle ORM (D1)
- Cloudflare D1 (form submissions, news, minutes, announcements, sessions)
- Cloudflare KV (contact form submissions)
- Zod (server function validation)
- date-fns (date formatting)
- ulidx (ULID-based IDs)
- Fuse.js (client-side fuzzy search)
- Vitest (testing)
- Playwright (E2E testing)

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
- Generate pnpm-lock.yaml (this project uses npm)
- Use eslint or prettier (this project uses Biome)
- Modify wrangler.jsonc deploy config without asking
- Use any type without justification
- Skip TypeScript strict checks
- Use crypto.randomUUID() (use ulidx ULIDs)
- Use Math.random() for security-sensitive values
- Log PII or secrets
- Use offset-based pagination
- Hardcode codyboring.workers.dev URL in new code (use site config)

## Routes (23 total)
Government portal: /, /departments, /departments/$slug, /commissioners, /news, /news/$slug, /calendar, /contact, /documents, /ada-compliance, /privacy-policy, /employee-services
Heritage layer: /history, /history/timeline, /history/$slug, /communities, /communities/$slug, /about, /economic-development, /education, /transportation, /people, /visit
Admin: /admin, /admin/login, /admin/news, /admin/news/new, /admin/news/$id, /admin/submissions, /admin/minutes, /admin/minutes/new, /admin/minutes/$id, /admin/announcements, /admin/announcements/new, /admin/announcements/$id
Forms: /forms, /forms/$type

## Data Files (14)
departments, commissioners, news, documents, quick-services, search-index, heritage-sites, timeline, communities, notable-people, employers, education, form-definitions, meeting-minutes

## Server Functions
- auth (login, validateAdmin, logout)
- contact (submitContactForm)
- forms (submitForm)
- admin-news (CRUD)
- admin-minutes (CRUD)
- admin-announcements (CRUD)
- admin-submissions (list, updateStatus)

## Cloudflare Bindings
- DB: D1 database (sullivan-county-db)
- CONTACT_SUBMISSIONS: KV namespace
