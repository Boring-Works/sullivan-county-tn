# Sullivan County TN — Gap Analysis

**Refreshed:** 2026-05-07 (after 7-phase production-hardening + audit pass + items #2/#3/#5 from top-7)

The site is in **best-practices shape** in every dimension. Most prior gaps have closed. This document tracks what's left.

---

## Active gaps (ranked)

### 🔴 High — biggest visible improvements remaining

#### 0. Homepage redesign — *blueprint-grounded, the new top priority*
- **Status:** Current homepage has 31 interactive elements above the fold; top-tier county benchmark counties ship 5–9. Serves 1 of 5 audiences (current citizens). Hides the substantial content built for potential residents, businesses, and tourists under verb-nav and "About."
- **Validation:** `County_Government_Website_Blueprint_2026.docx` (45+ sources, 20-county benchmark) — hybrid IA model is canonical. P0/P1/P2/P3 priority matrix used by all top performers.
- **Fix:** 7-phase rebuild documented in [`HOMEPAGE_REDESIGN.md`](HOMEPAGE_REDESIGN.md). ~25 hours. AI assistant deferred.

#### 1. Admin overhaul (Sidebar + DataTable + stat dashboard + toasts)
- **Status:** `/admin` is 4 quick-link cards with no stats. Admin list pages are plain `<table>` rendering, no DataTable features.
- **Impact:** If a judge logs in, this is the weakest visible surface area on the entire site.
- **Fix:** Lift from **`Kiranism/tanstack-start-dashboard`** (MIT, exact stack match — TanStack Start + shadcn). Specifically:
  - `src/components/layout/app-sidebar.tsx` + `src/components/ui/sidebar.tsx`
  - 13 DataTable composition files at `src/components/ui/table/data-table-*.tsx` + `hooks/use-data-table.ts`
  - `src/features/overview/components/{area,bar,pie}-graph.tsx` + `recent-sales.tsx` for the dashboard
- **Effort:** ~3–4 hours. The DataTable + Sidebar code drops in directly; only the data wiring and brand theme need adaptation.

#### 2. Audit log table + `/admin/audit` viewer
- **Status:** No record of who created/edited/deleted what.
- **Impact:** Government accountability gap. Judge asking "who deleted that announcement?" gets no answer.
- **Fix:**
  - Migration `0004_audit_log.sql` with table (`actor_session_id`, `action`, `resource`, `metadata` JSON, `ip`, `user_agent`, `created_at`)
  - `audit(action, resource, metadata)` helper called via `ctx.waitUntil()` (non-blocking) on every admin mutation
  - `/admin/audit` viewer (DataTable, sortable, filterable by actor / resource / action)
- **Effort:** ~1.5 hours.

#### 3. CF Web Analytics token
- **Status:** Beacon block in `__root.tsx` shows literal `YOUR_TOKEN_HERE` (commented out).
- **Impact:** Anyone reading source sees an unfinished feature; no real metrics flowing.
- **Fix:** **User action.** CF dashboard → Web Analytics → Add a site → copy token → paste into `__root.tsx` → uncomment script tag → redeploy.
- **Effort:** 5 minutes.

---

### 🟠 Medium — production hardening

#### 4. Cron Trigger for weather refresh
- **Status:** SWR-on-read pattern works fine. One user every 10 min pays a 300 ms NWS round-trip; everyone else gets 5 ms KV.
- **Impact:** Production-ideal would be a true Cron Trigger so refreshes never happen on the user-request path.
- **Fix:** Custom worker entry that wraps the TanStack Start handler AND adds a `scheduled()` function calling `refreshWeather(env)`. Configure `triggers.crons: ["*/10 * * * *"]` in `wrangler.jsonc`.
- **Risk:** TSS framework-version dependency on the entry shape; SWR fallback is the safety net.
- **Effort:** ~45 minutes.

#### 5. `/admin/feedback` viewer UI
- **Status:** `submitPageFeedback`, `listPageFeedback`, `deletePageFeedback` server fns all exist. UI route does not.
- **Impact:** Admins can't see what citizens are saying about the site.
- **Fix:** New `/admin/feedback.tsx` with DataTable showing `page` · `helpful` · `comment` · `created_at`, filter by `helpful=false` to surface problem pages.
- **Effort:** ~30 minutes.

#### 6. SearchDialog → shadcn `<Command>`
- **Status:** Custom Radix Dialog + Fuse.js. Works but reinvents the wheel.
- **Fix:** Replace with shadcn `<Command>` palette. Keep Fuse.js as the search engine. Better default keyboard model (Cmd+K, ↑↓, Enter, Esc all built-in).
- **Effort:** ~45 minutes.

#### 7. Mobile drawer → shadcn `<Sheet>`
- **Status:** Custom `<aside>` with hand-rolled focus trap.
- **Fix:** Replace with shadcn `<Sheet>` (Radix Dialog variant). Removes the custom focus trap; Radix handles it.
- **Effort:** ~30 minutes.

#### 8. Cross-isolate rate limit enforcement
- **Status:** Per-IP composite keys (2026-05-07) prevent intra-isolate quota sharing, but Cloudflare may run multiple isolates under load.
- **Impact:** Determined attacker could spread requests across isolates to bypass limits.
- **Fix when traffic warrants:** Migrate `rate-limit.ts` to a Durable Object atomic counter, or wire Cloudflare's WAF rate-limiting rules at the platform level.

#### 9. Spanish native review
- **Status:** `es.json` covers ~150 keys; machine-translated.
- **Impact:** Awkward phrasing in places. Should not be claimed as "bilingual" in marketing yet.
- **Fix:** **User action.** Pay a native Spanish-speaker for a review pass. Particularly important for the property-taxes lookup copy.

---

### 🟡 Low — polish / future

#### 10. Barry Hopper photo
- **Status:** One commissioner has no photo; `CommissionerCard` falls back to a User icon.
- **Fix:** **User action.** Source the headshot.

#### 11. Hard-coded "Sullivan County" in 14 places
- **Status:** Components like `AboutSection`, `SiteFooter`, `NextMeetingCard`, `CommissionerCard` use string literals instead of `SITE_NAME` from `data/site-config.ts`.
- **Impact:** Stylistic — fine since the literal copy is sentence-level (e.g., "Sullivan County Commission Regular Session"), but a brand rename would touch all of these.

#### 12. NewsCard / NewsSection layout duplication
- **Status:** Two slightly different card layouts between the homepage news and the `/news` listing.
- **Fix:** Consolidate into one component with size variants.

#### 13. No automated Lighthouse CI
- **Status:** Performance / a11y scores not tracked over time.
- **Fix:** Add `lighthouserc.json` + GitHub Action when there's a meaningful baseline to defend.

#### 14. No visual regression testing
- **Status:** CSS changes aren't caught unless they break layout enough to fail a Playwright assertion.
- **Fix:** Playwright `screenshot` snapshots on home, dept-detail, calendar, /weather, forms.

#### 15. `lastUpdated` field on news/communities/heritage
- **Status:** Departments + Forms have `lastUpdated`. Other detail page types could too.
- **Fix:** Optional polish — extend the pattern.

---

## Test gaps

- No server-fn integration tests against real D1/KV bindings (using `@cloudflare/vitest-pool-workers`).
- No admin workflow E2E tests (create → edit → delete cycle on news, minutes, announcements). The current admin-auth tests verify login/logout only.
- No mobile hamburger flow E2E beyond "drawer opens with verb labels" — the per-verb expansion + link clicks aren't exercised.
- No performance regression tests.
- ParcelLookup mobile test occasionally flakes when TPAD upstream is slow (pre-existing).

---

## Security gaps

- No audit logging table for admin mutations (covered above as gap #2).
- No session revocation: admin can't force-logout other sessions. Add session list + delete in `/admin/sessions`.
- Single-factor admin auth. TOTP or WebAuthn would harden against password leaks.

---

## UX gaps

- No print-specific styles for `/forms/$type` form pages (department detail has print styles).
- No `lastUpdated` stamp on news / community / heritage detail pages (only departments + forms).

---

## Deployment gaps

- No staging environment (only production).
- No blue-green deploys / automated rollback.
- No deployment approval gate.

---

## Recently fixed (kept for reference)

| Item | Fixed |
|------|-------|
| Phase 1 — Typed Cloudflare env (`getEnv/getDB/getKV`) | 2026-05-07 |
| Phase 2 — drizzle-zod, indexes in schema, ULID brand type | 2026-05-07 |
| Phase 3 — 21 shadcn primitives + theme overrides + brand Button variants | 2026-05-07 |
| Phase 4 — `/contact` + `/admin/login` + `/forms/$type` migrated to RHF + shadcn Form | 2026-05-07 |
| Phase 5 — PWA service worker + offline.html + OfflineBanner + 2026 manifest spec | 2026-05-07 |
| Weather subsystem — NWS + KV-cached SWR + D1 archive + CopperWeathervane | 2026-05-07 |
| 7 fresh news articles seeded | 2026-05-07 |
| Live D1 announcement banner | 2026-05-07 |
| `<DetailBreadcrumb>` on all 5 detail page types | 2026-05-07 |
| "Last reviewed" stamps on dept + form pages | 2026-05-07 |
| iOS / Android 2026 PWA standards (multi-size apple-touch-icon, mask-icon, format-detection, etc.) | 2026-05-07 |
| EmergencyModule redesigned (restrained navy strip) | 2026-05-07 |
| Scroll-reveal failsafe (no more blank below-fold sections) | 2026-05-07 |
| `<Button>` extended with `copper` + `navy` variants; 9 hand-rolled buttons migrated | 2026-05-07 |
| `StatusBadge` brand-aligned palette | 2026-05-07 |
| Code-quality audit baseline (0 TODO, 0 console.log, 0 hand-written `any`, all rel/alt/labels) | 2026-05-07 |
| Sonner toast notifications site-wide | 2026-05-07 |
| Skeleton loaders replace "Loading..." text | 2026-05-07 |
| Verb-based primary nav (Pay/Apply/Report/Records/Meetings/Departments/About) | 2026-05-07 |
| Parcel lookup on `/property-taxes` (TPAD typeahead + 3-portal CTAs) | 2026-05-07 |
| Per-IP rate limit composite keys | 2026-05-07 |
| Homepage trim 11 → 7 sections; QuickServices 9 → 6 cards; static stats; seasonal ribbon | 2026-05-07 |
| FAQPage + GovernmentService JSON-LD on every dept detail | 2026-05-06 |
| GovernmentService JSON-LD on every form | 2026-05-06 |
| MobileBottomTabBar (Pay / Search / Call thumb-zone bar) | 2026-05-06 |
| Property-tax landing page with FAQ + plain-language steps | 2026-05-06 |
| Citizen-language search aliases | 2026-05-06 |
| AnnouncementBanner D1 wiring with severity dropdown | 2026-05-06 |
| Open-Now status pill (holiday-aware via Computus) | 2026-05-06 |
| Next-Meeting computation + .ics export | 2026-05-06 |
| "Was this page helpful?" feedback widget (D1-backed) | 2026-05-06 |
| vCard "Save Contact" exports on departments + commissioners | 2026-05-06 |
| Interactive 6-community Sullivan County SVG map | 2026-05-06 |
| Official Sullivan County seal (potrace-traced from sullivancountytn.gov) | 2026-05-06 |
| Spanish locale populated across home/nav/footer/forms | 2026-05-06 |
| Mega-menu disclosure rebuild + click-outside + hover gating | 2026-05-06 |
| Admin login with ULID sessions + timing-safe compare + rate limiting | 2026-05-06 |
| Zod validation on every server function | 2026-05-06 |
| sanitize-html on stored content | 2026-05-06 |
| Structured JSON logging (no PII) | 2026-05-06 |
| All D1 migrations applied to remote (4 total: round_lady_deathstrike, page_feedback, announcement_severity, weather_observations) | 2026-05-07 |
