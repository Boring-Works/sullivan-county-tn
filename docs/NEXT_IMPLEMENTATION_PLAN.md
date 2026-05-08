# Next Implementation Plan — Sullivan County TN

**Last refreshed:** 2026-05-07
**Current state:** see [`CURRENT_STATE.md`](CURRENT_STATE.md)
**Active gaps:** see [`GAP_ANALYSIS.md`](GAP_ANALYSIS.md)

The site has been through a 7-phase production-hardening pass plus follow-up audits. **Items #2, #3, #5 from the original top-7 are shipped.** This plan covers what's left, ranked by demo-day judging impact.

> **🎯 Current top priority: [`HOMEPAGE_REDESIGN.md`](HOMEPAGE_REDESIGN.md)** — blueprint-grounded 7-phase homepage rebuild (~25 hours). Validated by `County_Government_Website_Blueprint_2026.docx`: hybrid IA, 5 audience-served, OMB M-24-08 footer, storm-mode emergency takeover. Drops above-the-fold count from 31 → 9 and surfaces the 4 audiences (potential residents, current businesses, potential businesses, tourists) the homepage doesn't serve today.

---

## P1 — Highest visible impact remaining

### 0. Homepage redesign — *the new top priority*
**Why:** Validated by `County_Government_Website_Blueprint_2026.docx` (45+ sources, 20-county benchmark). The current homepage has 31 above-fold interactive elements (top performers ship 5–9), serves only 1 of 5 audiences (current citizens), and doesn't surface the substantial content built for potential residents, businesses, and tourists. The blueprint hybrid model (services-primary nav + audience-secondary pathways) is the canonical pattern shipped by Arlington (8.9), Chesterfield (8.9), and Fairfax (8.6).

> **📋 Detailed 7-phase plan:** [`HOMEPAGE_REDESIGN.md`](HOMEPAGE_REDESIGN.md) — ~25 hours, blueprint-grounded, AI assistant explicitly deferred to a separate plan.

### 1. Admin overhaul (Sidebar + DataTable + stat dashboard + `/admin/feedback`)
**Why:** `/admin` is currently 4 quick-link cards with no stats, and the list pages render plain `<table>` markup. If a judge logs in, this is the weakest visible back-office surface.

> **📋 Detailed 7-phase plan:** [`ADMIN_PLAN.md`](ADMIN_PLAN.md) — phase-by-phase scope, files touched, ship signals, ~8 hours total.

**Lift from `Kiranism/tanstack-start-dashboard`** (MIT, exact stack match — TanStack Start + shadcn + Vite). Specifically:
- `src/components/ui/sidebar.tsx` + `src/components/layout/app-sidebar.tsx`
- 13 DataTable composition files at `src/components/ui/table/data-table-*.tsx`
- `src/hooks/use-data-table.ts` (the orchestration hook)
- `src/features/overview/components/{area,bar,pie}-graph.tsx` + `recent-sales.tsx` for the dashboard tiles (recharts wrapper)

**What:**
- Replace `AdminLayout`'s custom sidebar with shadcn `<Sidebar>` (collapsible, mobile sheet, badged links e.g. "Submissions (3 new)").
- New `getAdminDashboardStats()` server fn returning `{ submissionsTotal, submissionsNew, newsCount, lastNewsAt, minutesCount, announcementsActive, feedbackCount, weatherObsCount }`.
- Replace `/admin/index.tsx` with stat-tile grid + recent-activity stream (last 10 mutations across tables — comes free with audit log when shipped).
- Convert `/admin/{news,minutes,announcements,submissions}` to DataTable: sortable columns, filter, pagination, status filter.
- Sonner toast on every mutation success/error.
- Skeleton loaders for every list during load.
- New `/admin/feedback.tsx` viewer (server fns `listPageFeedback`, `deletePageFeedback` already exist).

**Done when:** logging in lands on a real dashboard with live counts; every list page sorts, filters, and paginates; every mutation toasts.

**Effort:** ~3–4 hours.

---

### 2. Audit log table + helper + `/admin/audit` viewer
**Why:** Government accountability gap. No record of who created/edited/deleted what.

**What:**
- Migration `0004_audit_log.sql`:
  ```sql
  CREATE TABLE audit_log (
    id TEXT PRIMARY KEY,
    actor_session_id TEXT NOT NULL,
    action TEXT NOT NULL,           -- e.g. "news.create", "announcement.delete"
    resource TEXT NOT NULL,         -- e.g. "news_articles:01HZ..."
    metadata TEXT,                  -- JSON blob
    ip TEXT,
    user_agent TEXT,
    created_at TEXT NOT NULL
  );
  CREATE INDEX idx_audit_log_actor ON audit_log(actor_session_id);
  CREATE INDEX idx_audit_log_created_at ON audit_log(created_at DESC);
  ```
- `audit(action, resource, metadata)` helper in `src/server/audit.ts`. Resolves `actor_session_id` + IP + UA from request context. Called via `ctx.waitUntil()` so admin requests don't pay the write cost.
- Wrap every admin mutation: news create/update/delete, minutes create/update/delete, announcements create/update/delete, submission status updates, page-feedback delete.
- New `/admin/audit.tsx` viewer (DataTable, sortable by date / actor, filterable by `action` prefix and `resource` table).

**Done when:** every admin mutation produces an `audit_log` row; the viewer surfaces them with filter + sort.

**Effort:** ~1.5 hours.

---

### 3. CF Web Analytics token (USER ACTION)
**Why:** Beacon block in `__root.tsx` shows literal `YOUR_TOKEN_HERE` (commented out). Anyone reading source sees an unfinished feature; no real metrics flowing.

**What:** CF dashboard → Web Analytics → Add a site → copy token → paste into `__root.tsx` → uncomment the script tag → redeploy.

**Done when:** dashboard shows traffic.

**Effort:** 5 minutes.

---

## P2 — Production hardening

### 4. Cron Trigger for weather refresh
**Why:** SWR-on-read works fine — one user every 10 min pays a 300 ms NWS round-trip; everyone else gets a 5 ms KV hit. Production-ideal would be a scheduled refresh that never costs a user request.

**What:**
- Custom worker entry that wraps the TanStack Start handler:
  ```ts
  // src/worker.ts
  import { default as tssHandler } from "@tanstack/react-start/server-entry";
  import { refreshWeather } from "~/server/weather/refresh";
  import { getEnv } from "~/server/env";
  export default {
    fetch: tssHandler.fetch,
    async scheduled(_evt: ScheduledEvent, env: Cloudflare.Env, _ctx: ExecutionContext) {
      await refreshWeather(env);
    },
  };
  ```
- Update `wrangler.jsonc` `main` to point at this entry + add `triggers.crons: ["*/10 * * * *"]`.
- SWR-on-read remains as the safety net if cron stops firing.

**Risk:** TanStack Start's entry-shape stability across versions. Ship with the SWR fallback intact so we can revert to read-path-refresh if needed.

**Effort:** ~45 minutes.

---

### 5. SearchDialog → shadcn `<Command>`
**Why:** Custom Radix Dialog + Fuse.js works but reinvents the wheel. shadcn `<Command>` (cmdk under the hood) gives better default keyboard handling.

**What:** Replace `src/components/layout/SearchDialog.tsx` internals. Keep Fuse.js as the search engine. Wire to existing `sullivan:open-search` custom event so hero chips still pre-fill.

**Effort:** ~45 minutes.

---

### 6. Mobile drawer → shadcn `<Sheet>`
**Why:** `SiteNav.tsx` mobile drawer has a hand-rolled focus trap. `<Sheet>` (Radix Dialog variant) handles this natively.

**What:** Replace mobile menu in `SiteNav.tsx` with `<Sheet>`. Remove the manual focus trap, Tab cycling, Escape handling — Radix does all of it.

**Effort:** ~30 minutes.

---

### 7. Spanish native review (USER ACTION)
**Why:** `es.json` is machine-translated. Should not be claimed bilingual yet.

**What:** Pay a native Spanish-speaker (~$200) to review and rewrite ~150 keys, paying special attention to:
- `propertyTaxes.lookup.*` (tax-related terms have legal weight)
- `home.heroH1` / `home.heroSearchPlaceholder`
- `forms.*` field labels
- `verbNav.*` verb labels (verbs translate awkwardly word-for-word)

**Done when:** locale review checked into the repo with reviewer credit in `docs/CREDITS.md`.

---

## P3 — Polish (when bandwidth allows)

### 8. Cross-isolate rate limit
- Migrate `rate-limit.ts` from in-memory `Map` to Durable Object atomic counter, OR use Cloudflare WAF rate-limiting rules at the platform level.

### 9. Plain-language CI check
- `scripts/check-readability.ts` runs Flesch-Kincaid over `description` / `services[]` / `helpText` strings.
- Fails CI if any string scores above grade 9.

### 10. Search query logging + best bets
- Log every search query (D1, 30-day TTL).
- Admin view sorted by zero-result frequency.
- Best-bets JSON pin specific results for seasonal windows.

### 11. Visual regression snapshots
- Playwright screenshot tests on home, dept detail, calendar, forms, /weather, communities at desktop + mobile widths.

### 12. Lighthouse CI
- `lighthouserc.json` + GitHub Action with budgets (Performance ≥ 90, A11y = 100, SEO = 100).

### 13. "Ask Sullivan County" assistant
- Workers AI (`@cf/meta/llama-3.3-70b-instruct-fp8-fast`) + RAG over the existing search index + departments.ts + news.ts.
- Floating launcher bottom-right (mobile-aware).
- Confidence threshold drops to "Call (423) 323-6417" handoff.

### 14. `lastUpdated` field on news / communities / heritage
- Departments + Forms have `lastUpdated`. Other detail page types could too.

### 15. Print styles for `/forms/$type`
- Department detail has print styles; forms do not.

---

## P4 — Long-term

### 16. Custom domain (`sullivancountytn.gov`)
Move off `codyboring.workers.dev` subdomain. Configure in Cloudflare; verify HSTS preload still applies; update sitemap and JSON-LD.

### 17. Staging / QA environment
Provision `sullivan-county-tn-preview` worker + a separate D1 for QA. Wire to a `staging` git branch.

### 18. Citizen account portal
SSO via better-auth or Clerk. Saved forms, document vault, payment history. Significant lift; defer until needed.

### 19. Emergency alert sign-up (SMS + email)
- New `/alerts` page: opt-in form (name, phone, email, ZIP, alert types).
- D1 `alert_subscribers` table.
- Phase 2 = Twilio + cron Worker to send when admin posts an "urgent" announcement.

### 20. Workers AI plain-English weather summary
Llama 3.3 turns the raw NWS payload into "It's 60° and mostly cloudy. Tonight's storms aren't expected to be severe; tomorrow clears." Cached in the same KV doc as the snapshot.

---

## What's explicitly out of scope

- **Migrating to Postgres** — D1 is plenty for this scale.
- **Redesign** — civic restraint stands. Heritage palette + Caslon + Outfit are the identity. No SaaS-y redesign.
- **Mobile app** — web-first remains the default. Citizens reach the site via search, not by installing an app.
- **Removing the heritage / history pages** — they belong on the site.

---

## How to pick what's next

When you sit down to ship something, in order:

1. Did P1.1 (admin overhaul) ship? If not, do that. It's the highest-impact remaining item.
2. Did P1.3 (CF Analytics token) take 5 minutes yet? If not, do that — literally a dashboard click + paste.
3. Has anything changed about traffic level or admin needs? If so, audit P2.
4. Otherwise pick from P3 / P4 based on what's drawing your interest.

Don't expand scope without strong evidence. The site is in best-practices shape. The remaining work is incremental.
