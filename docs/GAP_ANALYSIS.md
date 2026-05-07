# Sullivan County TN — Gap Analysis

**Last refreshed:** 2026-05-07

---

## Active gaps

### Medium

#### Cross-isolate rate limit enforcement
- **Status:** Per-IP composite keys (2026-05-07) prevent intra-isolate quota sharing, but Cloudflare may run multiple isolates under load.
- **Impact:** Determined attacker could spread requests across isolates to bypass limits.
- **Fix when traffic warrants:** Migrate `rate-limit.ts` to a Durable Object atomic counter, or wire Cloudflare's WAF rate-limiting rules at the platform level. Not pressing for current traffic.

#### CSRF integration deferred
- **Status:** `server/csrf.ts` defines double-submit-cookie helpers but they're not invoked from any endpoint.
- **Defense in place:** SameSite=Strict cookies on the admin session + same-origin-only `_serverFn/*` endpoints prevent CSRF in modern browsers without an explicit token.
- **Fix as defense-in-depth:** Wire `validateCsrf()` into all POST mutation handlers if/when cross-origin embeds are introduced.

#### CF Web Analytics not configured
- **Status:** Beacon script ready in `__root.tsx`; needs a token from the CF dashboard.
- **Fix:** Generate token, paste, deploy.

#### Service worker / offline emergency
- **Status:** PWA manifest complete (192/512 icons, theme colors, install prompt). No service worker yet.
- **Fix:** Workbox precache for `/`, `/property-taxes`, `/contact`, `/calendar`, `/departments/emergency-management`, `/departments/sheriff`, plus the EmergencyModule + seal assets. Stale-while-revalidate on content; cache-first on hashed assets. Critical for storm scenarios where citizens lose mobile signal.

#### Spanish translation native review
- **Status:** `es.json` covers ~150 UI keys; machine-translated.
- **Impact:** Awkward phrasing in places. Should not be claimed as "bilingual" in marketing yet.
- **Fix:** Pay a native Spanish-speaker for a review pass, particularly on the property-taxes lookup copy and FAQ answers.

#### No staging/QA environment
- **Status:** Only production deployment. `wrangler.jsonc` has a `preview` env but no separate Cloudflare Worker / D1.
- **Fix:** Provision `sullivan-county-tn-preview` worker + a separate D1 for QA.

---

### Low

#### "Sullivan County" hard-coded in 14 places
- **Status:** Components like `AboutSection`, `SiteFooter`, `NextMeetingCard`, `CommissionerCard` use string literals instead of `SITE_NAME` from `data/site-config.ts`.
- **Impact:** Stylistic; mostly fine since the literal copy is sentence-level (e.g., "Sullivan County Commission Regular Session"), but a brand rename would touch all of these.
- **Fix:** Audit and replace where the name is a generic placeholder rather than part of the literal copy.

#### `as Record<string, unknown>` env access
- **Status:** Eight server functions cast `env` to `Record<string, unknown>` to access bindings (D1, KV) because the `cloudflare:workers` `env` import isn't auto-typed against the global `Env` interface.
- **Impact:** Loses some type safety on env-binding access.
- **Fix:** Augment the `cloudflare:workers` module declaration to type `env` as `Cloudflare.Env`, or write a small `getEnv()` helper that does the cast once.

#### NewsCard / NewsSection layout duplication
- **Status:** Two slightly different card layouts in `NewsCard` (used on `/news`) and `NewsSection` (homepage).
- **Fix:** Consolidate into one component with size variants if/when redesigning the news area.

#### No automated Lighthouse CI
- **Status:** Performance / a11y scores not tracked over time.
- **Fix:** Add `lighthouserc.json` + GitHub Action when there's a meaningful baseline to defend.

#### No visual regression testing
- **Status:** CSS changes aren't caught unless they break layout enough to fail a Playwright assertion.
- **Fix:** Playwright `screenshot` snapshots on the home, dept-detail, calendar, and forms pages.

#### No "last updated" stamps on pages
- **Status:** Per the blueprint and GOV.UK pattern, public-facing pages should show a freshness signal.
- **Fix:** Add `lastUpdated: ISO-date` to the `Department` interface and surface at the bottom of each detail page.

#### No table of contents on long pages
- **Status:** ADA compliance, privacy policy, and history narrative pages would benefit.
- **Fix:** Optional enhancement, not pressing.

---

## Test gaps

- No server-fn integration tests against real D1/KV bindings (using `@cloudflare/vitest-pool-workers`).
- No admin workflow E2E tests (create → edit → delete cycle on news, minutes, announcements). The current admin-auth tests verify login/logout only.
- No mobile hamburger flow E2E beyond "drawer opens with verb labels" — the per-verb expansion + link clicks aren't exercised.
- No performance regression tests.

---

## UX gaps

- No breadcrumb navigation on dept detail or other deep routes (each page is one click from home, but breadcrumbs help orientation on shared links).
- No print-specific styles for `/forms/$type` form pages.

---

## Security gaps

- No audit logging table for admin mutations: who created/edited/deleted what isn't recorded. Consider a `audit_log` D1 table with `actor`, `action`, `resource`, `metadata`, `ip`, `timestamp`.
- No session revocation: admin can't force-logout other sessions. Add session list + delete in `/admin/sessions`.
- Single-factor admin auth. TOTP or WebAuthn would harden against password leaks.

---

## Deployment gaps

- No staging environment (covered above under Medium).
- No blue-green deploys / automated rollback.
- No deployment approval gate.

---

## Recently fixed (kept for reference)

| Item | Fixed |
|------|-------|
| Verb-based primary nav (replaces dept-led nav, blueprint Insight on services-first IA) | 2026-05-07 |
| Parcel lookup on `/property-taxes` (TPAD typeahead + 3-portal CTAs) — closes blueprint Insight 11 | 2026-05-07 |
| Per-IP rate limit keys (was global, one user could block all) | 2026-05-07 |
| WCAG AA contrast on hero kbd hint + Pay Taxes CTA over light hero (`/history` was 1.05:1) | 2026-05-07 |
| CommunityMap `role="img"` removed (anchors inside need to be focusable) | 2026-05-07 |
| Unused shadcn Card + Button deleted (zero imports) | 2026-05-07 |
| FAQPage + GovernmentService JSON-LD on every dept detail | 2026-05-06 |
| GovernmentService JSON-LD on every form | 2026-05-06 |
| AudiencePathways homepage section (Brunswick / Greenville hybrid pattern) | 2026-05-06 |
| MobileBottomTabBar (Pay / Search / Call thumb-zone bar at <md) | 2026-05-06 |
| Property-tax landing page with FAQ + plain-language steps | 2026-05-06 |
| Citizen-language search aliases + suggested zero-result queries | 2026-05-06 |
| AnnouncementBanner D1 wiring with severity dropdown | 2026-05-06 |
| Open-Now status pill (holiday-aware via Computus) | 2026-05-06 |
| Next-Meeting computation + .ics export | 2026-05-06 |
| "Was this page helpful?" feedback widget (D1-backed) | 2026-05-06 |
| vCard "Save Contact" exports on departments + commissioners | 2026-05-06 |
| Interactive 6-community Sullivan County SVG map | 2026-05-06 |
| Official Sullivan County seal (potrace-traced from sullivancountytn.gov) | 2026-05-06 |
| Spanish locale populated across home/nav/footer/forms | 2026-05-06 |
| Mega-menu disclosure rebuild + click-outside + hover gating | 2026-05-06 |
| Mobile drawer hoisted out of `<nav>` (was rendering with height: 0) | 2026-05-06 |
| Admin login with ULID sessions + timing-safe compare + rate limiting | 2026-05-06 |
| Zod validation on every server function | 2026-05-06 |
| sanitize-html on stored content | 2026-05-06 |
| Structured JSON logging (no PII) | 2026-05-06 |
| All D1 migrations applied to remote (`page_feedback` + `announcement_severity`) | 2026-05-07 |
