# Next Implementation Plan — Sullivan County TN

**Date:** May 6, 2026
**Live:** https://sullivan-county-tn.codyboring.workers.dev

---

## PHASE 1: Foundation Fixes (Critical + High)

**Goal:** Secure the production deployment, fix known bugs.

### 1. Integrate CSRF into all mutation endpoints

| Attribute | Detail |
|-----------|--------|
| Priority | Critical |
| Effort | Small (2-3 hours) |
| Depends on | `server/csrf.ts` (already defined) |

The CSRF module (`server/csrf.ts`) is defined but not yet wired into mutation handlers. Add `requireCsrf()` call to all POST/PUT/DELETE server functions:

- `server/contact.ts` — `submitContactForm`
- `server/forms.ts` — `submitForm`
- `server/admin-news.ts` — create, update, delete
- `server/admin-minutes.ts` — create, update, delete
- `server/admin-announcements.ts` — create, update, delete
- `server/admin-submissions.ts` — updateStatus

**Acceptance:** Playwright E2E test verifies CSRF token is sent and validated on each mutation endpoint. Rejected requests get 403 with `CSRF_MISMATCH` error code.

---

### 2. Fix rate limiting for Workers production

| Attribute | Detail |
|-----------|--------|
| Priority | Critical |
| Effort | Medium (4-6 hours) |
| Depends on | None |

The current rate limiter (`server/rate-limit.ts`) uses an in-memory `Map`, which does not work reliably across Workers' global network (each isolate has its own Map).

**Option A (Recommended): Cloudflare WAF rate limiting rules**
- Simpler, no code changes needed
- Create rate limiting rules in Cloudflare dashboard for `/admin/*` and `/api/*` paths
- Set thresholds: 10 req/min for login, 60 req/min for forms

**Option B: D1-backed atomic counters**
- Create `rate_limit_counters` table in D1 with `(key TEXT, window_start INTEGER, count INTEGER, PRIMARY KEY(key, window_start))`
- Implement atomic increment via `INSERT ... ON CONFLICT ... DO UPDATE SET count = count + 1`
- Use D1 TTL via periodic cleanup or window-based expiration
- More precise per-endpoint control but higher implementation effort

**Decision:** Start with Option A (WAF rules). Fall back to Option B if finer-grained control is needed.

**Acceptance:** Rate-limited requests return 429 with `RATE_LIMITED` error code. Playwright test validates concurrent requests from same IP are throttled.

---

### 3. Fix global rate limit keys

| Attribute | Detail |
|-----------|--------|
| Priority | High |
| Effort | Small (1-2 hours) |
| Depends on | #2 |

Current rate limiter does not derive keys from `CF-Connecting-IP`, which means rate limits are global rather than per-client. Fix `server/rate-limit.ts` to extract client identifier from:

```
request.headers.get("CF-Connecting-IP") ?? request.headers.get("X-Forwarded-For") ?? "unknown"
```

**Acceptance:** Playwright test sends concurrent requests from two different simulated IPs and verifies each IP gets its own independent rate limit window.

---

### ~~4. Wire hero parallax scroll effect~~ ✅ DONE (2026-05-06)

| Attribute | Detail |
|-----------|--------|
| Priority | High |
| Effort | Small (1-2 hours) |
| Depends on | None |

The `HeroBanner` component defines a `setScrollY` callback but the `--scroll-y` CSS custom property is not wired to any DOM element. Connect `setScrollY` to update `document.documentElement.style.setProperty('--scroll-y', ...)` on scroll.

**Acceptance:** E2E test scrolls the page and asserts `--scroll-y` CSS custom property changes on the root element. Visual regression screenshot confirms parallax displacement.

---

### 5. Configure CF Web Analytics

| Attribute | Detail |
|-----------|--------|
| Priority | High |
| Effort | Small (1 hour) |
| Depends on | None |

Cloudflare Web Analytics provides privacy-first analytics (no cookie banner needed).

1. Create Web Analytics site in Cloudflare dashboard for `sullivan-county-tn`
2. Copy the JS snippet token
3. Add the beacon script to `app/__root.tsx` `<Head>` component

**Acceptance:** Cloudflare dashboard shows page views within 5 minutes of deployment.

---

## PHASE 2: Data & Wiring (High + Medium)

**Goal:** Make admin dashboards useful, connect all data flows.

### 6. Seed announcement + minutes data

| Attribute | Detail |
|-----------|--------|
| Priority | High |
| Effort | Small (2-3 hours) |
| Depends on | D1 database |

Admin dashboards exist but display empty states because the `announcements` and `minutes` tables have no data.

Create `scripts/seed-master.ts` that populates:

**Announcements (8-12 items):**
- County holidays (Memorial Day, Independence Day, Labor Day, Thanksgiving, Christmas)
- Office closure notices
- Public hearing announcements
- Tax deadline reminders

**Minutes (6-8 items):**
- Recurring County Commission meeting schedule (3rd Thursday monthly)
- Budget Committee meetings
- Planning Commission meetings
- Zoning Board of Appeals meetings

Run on production D1: `npx tsx scripts/seed-master.ts --env production`

**Acceptance:** Admin dashboards show seeded data. `/admin/announcements` and `/admin/minutes` list views populated.

---

### 7. Add admin E2E CRUD tests

| Attribute | Detail |
|-----------|--------|
| Priority | High |
| Effort | Medium (4-6 hours) |
| Depends on | #1 (CSRF integration) |

Cover the full admin workflow with Playwright:

- **News CRUD:** Login → create news item → verify on public page → edit title → verify update → delete → verify 404
- **Minutes CRUD:** Login → create minutes entry → verify on calendar → edit → verify update → delete
- **Submission management:** Login → view submissions list → toggle status (read/unread/archived) → verify state persists
- **Announcement CRUD:** Login → create announcement → toggle active/inactive → verify site banner shows/hides

**Acceptance:** All CRUD E2E tests pass across desktop, tablet, and mobile viewports.

---

### 8. Verify code-split bundle impact

| Attribute | Detail |
|-----------|--------|
| Priority | Medium |
| Effort | Small (1-2 hours) |
| Depends on | None |

The `SearchDialog` component is lazy-loaded. Verify the bundle savings and identify other candidates.

1. Run `npx vite build --debug` with `rollup-plugin-visualizer` to generate bundle treemap
2. Document `SearchDialog` lazy-load savings (expected: ~15-25KB gzipped)
3. Evaluate lazy-loading for: document library page, heritage timeline, calendar (Fuse.js is heavy)

**Acceptance:** Bundle analyzer report saved to `docs/bundle-analysis.html`. At least 2 additional components identified as lazy-load candidates if savings exceed 10KB each.

---

## PHASE 3: UX Polish (Medium + Low)

**Goal:** Improve user experience, close UX gaps.

### 9. Add loading skeletons

| Attribute | Detail |
|-----------|--------|
| Priority | Medium |
| Effort | Medium (3-4 hours) |
| Depends on | None |

Current pages flash empty states or show nothing during data loading. Create consistent skeleton components:

- `SkeletonCard` — card-shaped placeholder with pulse animation
- `SkeletonHero` — hero banner placeholder
- `SkeletonList` — list of card placeholders

Add to: department listing, news listing, document library, heritage detail pages.

**Acceptance:** Pages show skeletons during SSR streaming and client-side transitions. E2E test asserts skeleton elements are visible during navigation and replaced by content.

---

### 10. Add breadcrumb navigation

| Attribute | Detail |
|-----------|--------|
| Priority | Medium |
| Effort | Small (2-3 hours) |
| Depends on | None |

Create a `Breadcrumbs` component that derives its path from TanStack Router state. Show on:

- Department detail pages (Home > Departments > [Department Name])
- Heritage detail pages (Home > History > [Site Name])
- Community detail pages (Home > Communities > [Community Name])
- News article pages (Home > News > [Article Title])

**Acceptance:** Breadcrumbs display correct hierarchy on all detail pages. Each segment (except current) is a link. WCAG 2.1 AA compliant (nav landmark, aria-current="page" on last item).

---

### 11. Add "last updated" dates

| Attribute | Detail |
|-----------|--------|
| Priority | Low |
| Effort | Small (1-2 hours) |
| Depends on | None |

Static data files (`src/data/`) lack visible update timestamps. Citizens need to know when information was last reviewed.

1. Audit all 14 data files for `updatedAt` or `lastModified` fields
2. Add fields where missing
3. Display on: department pages, document library entries, form pages

**Acceptance:** Department and document pages show "Last updated: [date]" in a consistent location. Dates are formatted with `date-fns` (e.g., "April 15, 2026").

---

### 12. Add print styles for forms

| Attribute | Detail |
|-----------|--------|
| Priority | Low |
| Effort | Small (1-2 hours) |
| Depends on | None |

Forms (`/forms/$type`) are reference documents citizens often print. Add an `@media print` stylesheet:

- Hide navigation, footer, form controls (submit button, dropdowns)
- Show submitted data in a clean tabular layout
- Ensure readable font size (12pt minimum)
- Add page break rules to avoid splitting fields across pages

**Acceptance:** Print preview shows clean form content without UI chrome. E2E test uses Playwright `page.pdf()` to verify print output.

---

## PHASE 4: Testing & CI (Medium)

**Goal:** Full test coverage, automated quality gates.

### 13. Add server function integration tests

| Attribute | Detail |
|-----------|--------|
| Priority | Medium |
| Effort | Large (6-8 hours) |
| Depends on | #2 (rate limiting), #1 (CSRF) |

Current tests are unit-only with mocked bindings. Add integration tests using `@cloudflare/vitest-pool-workers` for real D1 and KV bindings:

- Contact form submission → KV write → verify data persisted
- Form submission → D1 write → verify row exists
- Admin news CRUD → D1 read/write/update/delete → verify
- Rate limiting → concurrent requests → verify 429 responses
- Auth login → session created → verify session in D1

**Acceptance:** Integration test suite passes. Tests use isolated D1 databases (migrations applied per test file). Run as part of CI.

---

### 14. Add mobile navigation E2E tests

| Attribute | Detail |
|-----------|--------|
| Priority | Medium |
| Effort | Small (2-3 hours) |
| Depends on | None |

Extend Playwright mobile tests to cover navigation:

- Hamburger menu: open/close with click and Escape key
- Focus trap: Tab cycling stays within open mobile menu
- Department submenu: expand/collapse with click and Enter/Space keys
- Search button: visible and functional on mobile viewport (< 768px)
- Keyboard navigation: all menu items reachable via Tab

**Acceptance:** Mobile nav E2E tests pass across iPhone SE, Pixel 5, and iPad viewports.

---

### 15. Add visual regression testing

| Attribute | Detail |
|-----------|--------|
| Priority | Medium |
| Effort | Medium (3-4 hours) |
| Depends on | #4 (parallax), #9 (skeletons) |

Add Playwright screenshot comparison for key pages:

- Homepage (desktop + mobile)
- Department listing (desktop + mobile)
- Document library (desktop + mobile)
- Contact page
- News feed

Use Playwright's `toHaveScreenshot()` with a 1% pixel tolerance. Store baselines in `e2e/screenshots/`.

**Acceptance:** Visual regression tests run in CI. PRs that change layout require baseline update (documented process).

---

### 16. Verify GitHub Actions CI

| Attribute | Detail |
|-----------|--------|
| Priority | Medium |
| Effort | Small (1-2 hours) |
| Depends on | #13, #14, #15 |

Audit and fix the GitHub Actions workflow. Add:

1. **Lighthouse CI step** — assert performance > 90, accessibility = 100, SEO = 100, best practices > 90
2. **npm audit step** — block CI on high/critical vulnerabilities
3. **Bundle size tracking** — fail if worker entry exceeds 800KB (current: 747KB)

**Acceptance:** Full CI pipeline passes on `main` branch. PR checks include: Biome lint, TypeScript typecheck, unit tests, integration tests, E2E tests, visual regression, Lighthouse, npm audit.

---

## PHASE 5: Production Readiness (Medium)

**Goal:** Production monitoring, domain, deployment strategy.

### 17. Set up custom domain

| Attribute | Detail |
|-----------|--------|
| Priority | Medium |
| Effort | Small (2-3 hours) |
| Depends on | Cloudflare account admin access |

1. Configure `sullivancountytn.gov` DNS in Cloudflare (A/AAAA records or CNAME)
2. Add custom domain to `wrangler.jsonc` routes configuration
3. Update `SITE_URL` in `src/lib/site-config.ts` from `codyboring.workers.dev` to `sullivancountytn.gov`
4. Verify SSL certificate auto-provisions via Cloudflare
5. Test www → apex redirect
6. Update sitemap and RSS feed URLs

**Acceptance:** All routes accessible at `https://sullivancountytn.gov`. HTTPS enforced. `codyboring.workers.dev` redirects to custom domain.

---

### 18. Add monitoring and alerting

| Attribute | Detail |
|-----------|--------|
| Priority | Medium |
| Effort | Medium (3-4 hours) |
| Depends on | #5 (Web Analytics) |

1. **Cloudflare dashboard alerts:** Configure email alerts for error rate spikes (>5% of requests), CPU time threshold breaches
2. **Health check endpoint:** Verify `/api/health` returns 200 with D1 and KV connectivity status
3. **Uptime monitoring:** Use Cloudflare Health Checks or external service (e.g., Better Uptime free tier) to ping `/api/health` every 60 seconds
4. **Error tracking:** Evaluate Sentry (Workers-compatible SDK) for JS error capture. Defer if budget constrained — rely on Cloudflare dashboard logs initially.

**Acceptance:** Health check endpoint reports healthy. Dashboard shows zero alerts during normal operation. Test alert fires when health check endpoint manually broken.

---

### 19. Add audit logging

| Attribute | Detail |
|-----------|--------|
| Priority | Medium |
| Effort | Medium (4-5 hours) |
| Depends on | D1 database |

Create `audit_logs` table:

```sql
CREATE TABLE audit_logs (
  id TEXT PRIMARY KEY,
  actor_id TEXT NOT NULL,       -- admin session ULID
  action TEXT NOT NULL,          -- 'news.create', 'submission.updateStatus', etc.
  resource_type TEXT NOT NULL,   -- 'news', 'minutes', 'announcement', 'submission'
  resource_id TEXT,              -- ULID of the affected record
  details TEXT,                  -- JSON blob with changed fields
  ip TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
```

Log all admin actions:
- News: create, update, delete
- Minutes: create, update, delete
- Announcements: create, update, delete, toggle active
- Submissions: updateStatus, delete
- Auth: login (success and failure), logout

Add audit log viewer at `/admin/audit-log` (filterable by actor, action, resource type, date range).

**Acceptance:** Admin actions appear in audit log. Viewer supports filtering by date and action type. Playwright E2E test verifies audit entries created after admin CRUD operations.

---

## PHASE 6: AI Readiness (Low priority, future)

**Goal:** Prepare foundation for AI-assisted features.

### 20. Define permission model

| Attribute | Detail |
|-----------|--------|
| Priority | Low |
| Effort | Small (2-3 hours) |
| Depends on | None |

Document role-based access patterns before they become implicit:

- **Public:** Read-only access to all public routes and search functions
- **Authenticated Admin:** Full CRUD on news, minutes, announcements, submissions
- **Future — Content Editor:** CRUD on news and minutes only (not submissions or announcements)
- **Future — AI Agent:** Read access to public data + write access to specific form submissions (with rate limits and idempotency keys)

Document in `docs/PERMISSION_MODEL.md`.

**Acceptance:** Permission model documented. All server function guards reference documented roles.

---

### 21. Add action receipts

| Attribute | Detail |
|-----------|--------|
| Priority | Low |
| Effort | Medium (3-4 hours) |
| Depends on | #19 (audit logging) |

Every write server function returns an immutable receipt:

```typescript
type ActionReceipt = {
  receiptId: string       // ULID
  action: string          // 'news.create', 'submission.updateStatus'
  status: 'completed' | 'failed'
  resourceId?: string     // ULID of created/updated resource
  timestamp: string       // ISO 8601
  idempotencyKey: string  // client-provided key for replay detection
}
```

Store receipts in `action_receipts` D1 table for audit trail and idempotency. Check idempotency key before executing any write to prevent duplicate mutations.

**Acceptance:** All write server functions return `ActionReceipt`. Duplicate requests with same idempotency key return the original receipt without re-executing.

---

### 22. Document tool boundaries

| Attribute | Detail |
|-----------|--------|
| Priority | Low |
| Effort | Small (1-2 hours) |
| Depends on | #20 (permission model) |

Define which server functions are safe for external tool/AI access:

- **Safe:** `search`, `listDepartments`, `listNews`, `listDocuments`, `listHeritage`, `listCommunities` (all read-only, publicly accessible)
- **Conditional:** `submitContactForm`, `submitForm` (write, requires rate limiting + idempotency key)
- **Restricted:** All `admin-*` functions (require auth session, not exposed to AI)

Add rate limits specifically for AI tool access: 10 req/min for search, 20 req/min for list operations.

Document in `docs/AI_TOOL_BOUNDARIES.md`.

**Acceptance:** Documentation lists all server functions with safety classification. Rate limits for AI access are distinct from user-facing limits.

---

## What NOT to build (yet)

| Item | Reason |
|------|--------|
| New component library | 37 components exist, full coverage |
| Expo/mobile app | No mobile requirement confirmed |
| AI chat/agent features | Foundation not ready (permissions, receipts, tool boundaries incomplete) |
| Replace TanStack with another framework | TanStack Start is purpose-built for this architecture |
| External CMS | Code-based content management is intentional for government transparency and version control |
| Dark mode | No user demand; deferred until WCAG 2.2 requires `prefers-color-scheme` support |
| Multi-language/i18n | County websites in Tennessee are English-only; revisit if demographic data changes |
| E-commerce/payments | No online payment requirements identified |

---

## Timeline Estimate

| Phase | Items | Est. Effort | Target |
|-------|-------|-------------|--------|
| Phase 1: Foundation | 5 items | 11-15 hours | Week 1-2 |
| Phase 2: Data & Wiring | 3 items | 8-11 hours | Week 2-3 |
| Phase 3: UX Polish | 4 items | 7-11 hours | Week 3-4 |
| Phase 4: Testing & CI | 4 items | 12-17 hours | Week 4-6 |
| Phase 5: Production | 3 items | 9-12 hours | Week 6-7 |
| Phase 6: AI Readiness | 3 items | 6-9 hours | Week 7-8 |
| **Total** | **22 items** | **53-75 hours** | **8 weeks** |

---

## Pre-flight checklist (before starting any phase)

```bash
npx biome check . && npx tsc --noEmit && npm run build && npm test -- --run
```
