# Sullivan County TN — Development Workflow

## Prerequisites

- **Node.js 22+** (check: `node --version`)
- **npm** (check: `npm --version`)
- **Cloudflare account** with Wrangler CLI: `npm install -g wrangler`
- **Git**

## Project Setup

```bash
git clone https://github.com/Boring-Works/sullivan-county-tn.git
cd sullivan-county-tn
npm ci
cp .dev.vars.example .dev.vars
# Edit .dev.vars with local development values
```

## Environment Variables

| Variable | Scope | How to Set |
|----------|-------|------------|
| `ADMIN_PASSWORD` | Production secret | `echo "password" \| npx wrangler secret put ADMIN_PASSWORD` |
| `ADMIN_PASSWORD` | Local dev | Set in `.dev.vars` |

- `.dev.vars` — local development variables (gitignored)
- `.dev.vars.example` — template file (committed)
- `wrangler secret put` — sets secrets on Cloudflare for production (never in `.dev.vars.example`)

## Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start local dev server |
| `npm run build` | Production build |
| `npm run deploy` | Build + deploy to Cloudflare Workers |
| `npm test` | Run unit tests (Vitest) |
| `npm run test:watch` | Run unit tests in watch mode |
| `npx playwright test` | Run E2E tests (all 3 viewports) |
| `npx playwright test --ui` | Interactive E2E test runner |
| `npx playwright test --project=desktop` | Desktop-only E2E tests |
| `npx playwright test --project=tablet` | Tablet-only E2E tests |
| `npx playwright test --project=mobile` | Mobile-only E2E tests |
| `npx biome check .` | Lint check (read-only) |
| `npx biome check --write .` | Auto-fix lint and formatting issues |
| `npx biome format --write .` | Format files only |
| `npm run cf-typegen` | Regenerate Cloudflare bindings types |
| `npm run generate:sitemap` | Regenerate sitemap XML |
| `npm run generate:rss` | Regenerate RSS feed |
| `npx wrangler d1 migrations apply sullivan-county-db --remote` | Apply D1 migrations (production) |
| `npx wrangler d1 migrations apply sullivan-county-db --local` | Apply D1 migrations (local) |
| `npx wrangler secret put ADMIN_PASSWORD` | Set/update admin password secret |

## Git Workflow

1. Branch from `main`: `git checkout -b feat/my-feature`
2. Use conventional commits:
   - `feat:` — new feature
   - `fix:` — bug fix
   - `chore:` — maintenance, deps, config
   - `docs:` — documentation
   - `refactor:` — code restructuring
   - `test:` — adding or updating tests
3. Run sanity check before pushing:

   ```
   npx biome check . && npx tsc --noEmit && npm run build && npm test -- --run
   ```

4. Push branch and open PR against `main`
5. Merge to `main` triggers production deploy (via GitHub Actions)

## Deployment Process

1. **Build + Deploy:** `npm run deploy` (runs `vite build` then `wrangler deploy`)
2. **Worker name:** `sullivan-county-tn`
3. **Preview worker:** `sullivan-county-tn-preview`
4. **Live URL:** `https://sullivan-county-tn.codyboring.workers.dev`
5. **Compatibility date:** `2026-05-06`
6. **Compatibility flags:** `nodejs_compat`

### Cloudflare Bindings

| Binding | Type | Purpose |
|---------|------|---------|
| `DB` | D1 (`sullivan-county-db`) | Form submissions, news, minutes, announcements, sessions |
| `CONTACT_SUBMISSIONS` | KV | Contact form submissions |

## D1 Migration Workflow

1. Edit schema: `src/db/schema.ts`
2. Generate migration: `npx drizzle-kit generate`
3. Review generated SQL in `src/db/migrations/`
4. Apply locally: `npx wrangler d1 migrations apply sullivan-county-db --local`
5. Verify locally with `npm run dev`
6. Apply remote: `npx wrangler d1 migrations apply sullivan-county-db --remote`

Note: Drizzle dialect is `sqlite`. Migrations output to `src/db/migrations/`.

## Testing Strategy

### Unit Tests (Vitest)

- Environment: `jsdom`
- Location: `tests/` directory
- Coverage target: `src/**/*.{ts,tsx}` (excludes routeTree.gen.ts and migrations)
- Run: `npm test` or `npm run test:watch`

### E2E Tests (Playwright)

- Location: `e2e/` directory
- 3 viewport projects: desktop (1920x1080), tablet (iPad Pro 1024x1366), mobile (iPhone 14 Pro 390x844)
- Base URL defaults to production; override with `BASE_URL` env var
- Timeout: 30s per test, 1 retry
- 260 local / 269 live total E2E cases across viewports (as of 2026-05-07 PM)

### Accessibility

- axe-core scans on 14 key pages via Playwright (`@axe-core/playwright`)
- Part of E2E test suite

### Admin Tests

- Login flow (valid/invalid credentials)
- CRUD operations (news, minutes, announcements)
- Session expiry
- Protected route guards

## Admin Access

- **Login URL:** `/admin/login`
- **Password:** Set via `wrangler secret put ADMIN_PASSWORD` (production) or `.dev.vars` (local)
- **Session:** ULID-based session ID, 24-hour TTL, httpOnly/secure/SameSite=strict cookie
- **Logout:** Server function that clears the session cookie

## Common Tasks

### Add a News Article

1. Edit `src/data/news.ts` — add entry to the news array
2. Run `npm run generate:rss` to update the RSS feed
3. Run `npm run generate:sitemap` to include the new page
4. Build and verify: `npm run build`

### Add a Department

1. Edit `src/data/departments.ts` — add entry to the departments array
2. Build and verify: `npm run build`

### Update Site Announcement

1. Edit `AnnouncementBanner.tsx` — modify the announcements array
2. Build and verify: `npm run build`

### Change Admin Password

```bash
echo "new-password" | npx wrangler secret put ADMIN_PASSWORD
```

### Add a New Route

1. Create file in `src/routes/` following TanStack Start file-based routing conventions
2. Add link to navigation if needed
3. Update `src/data/search-index.ts` if the page should be searchable
4. Update sitemap: `npm run generate:sitemap`
5. Run sanity check before pushing

### Run a Single E2E Test

```bash
npx playwright test --project=desktop tests/news.spec.ts
```

## Tech Stack Reference

| Layer | Technology |
|-------|-----------|
| Framework | TanStack Start (SSR) |
| Router | TanStack Router (file-based) |
| **Forms** | **react-hook-form + Zod resolvers + shadcn `<Form>`** |
| Data fetching | TanStack Query |
| Styling | Tailwind CSS v4 + **shadcn/ui (21 primitives)** + Radix UI |
| Toasts | **Sonner** (mounted in `__root.tsx`) |
| Charts | recharts (used in `<CopperWeathervane />`-adjacent UI; shadcn `<Chart>` available) |
| Animation | tw-animate-css + native `animation-timeline: view()` w/ JS fallback |
| Database | Cloudflare D1 (SQLite) |
| ORM | Drizzle ORM **+ drizzle-zod for derived schemas** |
| KV | Cloudflare KV |
| Validation | **Zod 4** — derived from Drizzle via `drizzle-zod` where 1:1, hand-written for cross-field refines |
| Dates | date-fns |
| IDs | ulidx (ULID) **+ branded type at `src/lib/schemas/ids.ts`** |
| Search | Fuse.js (client-side fuzzy) |
| i18n | i18next + react-i18next |
| Weather | **NWS API (api.weather.gov, no key) + KV-cached SWR + D1 archive** |
| **PWA** | **`public/sw.js` (cache-first fonts, network-first nav w/ offline fallback) + 2026 manifest spec + `<OfflineBanner />`** |
| Lint/Format | Biome (2-space indent, 100 char line width) |
| Unit testing | Vitest |
| E2E testing | Playwright (desktop + tablet + mobile) |
| Type checking | TypeScript strict mode + **typed `Cloudflare.Env` via `npm run cf-typegen`** |
| Deployment | Cloudflare Workers + Wrangler |

## Code Conventions

- **IDs:** Always ULIDs via `ulidx` — never `crypto.randomUUID()`. Use `UlidSchema.brand<"Ulid">()` from `src/lib/schemas/ids.ts` for nominal typing.
- **Dates:** ISO 8601 strings, `date-fns` for manipulation — never `moment` or `dayjs`
- **Money:** Integer cents — never floating point
- **Imports:** Organized automatically by Biome
- **Pagination:** Cursor-based only — never offset
- **Response shape:** `{ data: T }` for success, `{ error: { code, message } }` for errors
- **Write paths:** Zod validate → idempotency key → authority gate → execute → receipt
- **Secrets:** Never logged, printed, or committed
- **Package manager:** npm (NOT pnpm)
- **Cloudflare bindings:** Always access via `getEnv() / getDB() / getKV()` from `src/server/env.ts`. **Never** cast `as Record<string, unknown>`.
- **Forms:** Always use react-hook-form + Zod resolver + shadcn `<Form>` + `<Input>` / `<Textarea>` / `<Select>`. `/contact` is the canonical reference. Add `toast.success/error` from Sonner on submit.
- **CTAs:** Use `<Button variant="copper">` for primary calls-to-action, `<Button variant="navy">` for admin/secondary, `<Button variant="outline">` for tertiary. **Don't** hand-roll `bg-brand-copper rounded-sm px-6 py-2.5` button classes.
- **Detail pages:** Always include `<DetailBreadcrumb items={[...]} />` + a "Last reviewed" stamp where the data has a `lastUpdated` field.
- **External links with `target="_blank"`:** Always include `rel="noopener noreferrer"`.
- **Phone numbers:** Use `<TelLink phone="..." />` — never raw `tel:` `<a>` tags.
- **Drizzle migrations:** Run `drizzle-kit generate` to produce `src/db/migrations/NNNN_*.sql`, then `npx wrangler d1 migrations apply sullivan-county-db --local` to apply locally and `--remote` to apply to production. Indexes belong in `schema.ts`, not raw SQL.
- **`npm run cf-typegen`** after adding any new Cloudflare binding to `wrangler.jsonc` so the typed env stays in sync.
- **Do NOT:** use eslint, prettier, `crypto.randomUUID()`, `Math.random()` for security, hardcode the codyboring.workers.dev URL, use `console.log` (use structured `console.error(JSON.stringify({...}))` instead), or use `as Record<string, unknown>` for env access.
