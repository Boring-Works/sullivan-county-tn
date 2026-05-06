# Sullivan County TN — Gap Analysis

## Critical

### CSRF Module Is Dead Code
- **Status:** `server/csrf.ts` defined but never imported or called from any endpoint.
- **Impact:** All 10 POST mutation handlers lack CSRF protection.
- **Fix:** Integrate `requireCsrf()` into every mutation handler.

### Rate Limiting Broken on Workers
- **Status:** In-memory `Map` in `rate-limit.ts` doesn't work across Cloudflare Workers isolates.
- **Impact:** Every cold start or different colo gets a fresh map. Rate limits are effectively nonexistent.
- **Fix:** Migrate to D1 or KV-backed atomic counters, or use Cloudflare WAF rate limiting rules.

---

## High

### Announcement Data Empty
- **Status:** `announcements` array in `AnnouncementBanner.tsx` is `[]`.
- **Impact:** No way to display urgent alerts.
- **Fix:** Load announcements from D1 and populate seed data.

### Admin Seed Data Missing
- **Status:** `meeting_minutes` and `announcements` tables exist with schema but no data has been loaded.
- **Impact:** Admin dashboards show empty states.
- **Fix:** Create seed scripts or admin UI for data entry.

### Global Rate Limit Keys
- **Status:** Contact and form endpoints use static keys (`"contact"`, `"form"`).
- **Impact:** All users share one quota. One abuser blocks everyone.
- **Fix:** Derive keys from `CF-Connecting-IP` header.

### ~~Scroll-Driven Hero Parallax~~ ✅ FIXED (2026-05-06)
- **Status:** `translate3d` GPU-composited with rAF throttle, `will-change: transform`, 130% image scale to prevent clipping, respects `prefers-reduced-motion`.
- **Impact:** None — resolved.

### Code-Split Bundle Size Not Verified
- **Status:** `SearchDialog` is lazy-loaded via `React.lazy` but actual bundle split and size reduction not measured.
- **Impact:** Unknown whether code splitting provides meaningful savings.
- **Fix:** Add bundle analyzer, measure split impact.

### Google Maps Click-to-Load Not Tested
- **Status:** Placeholder exists on contact page but actual map iframe load after click not verified.
- **Impact:** Map may never load.
- **Fix:** Add E2E test for map load.

### CF Web Analytics Not Configured
- **Status:** Token placeholder exists but no analytics flow.
- **Impact:** No visitor analytics.
- **Fix:** Create CF Web Analytics site, add token.

---

## Medium

### No Wildcard SSL / Custom Domain
- **Status:** Deployed to `codyboring.workers.dev` subdomain. No custom domain configured.
- **Impact:** Unprofessional URL, no custom SSL.
- **Fix:** Set up `sullivancountytn.gov` domain in Cloudflare.

### No Monitoring / Alerting
- **Status:** Health check endpoint exists (`/api/health`) but no uptime monitoring or alerting configured.
- **Impact:** Downtime goes unnoticed.
- **Fix:** Set up Cloudflare dashboard alerts.

### No CI Verification
- **Status:** GitHub Actions CI workflow exists but has never been run or verified.
- **Impact:** Unknown whether CI passes.
- **Fix:** Trigger CI run, fix any failures.

### Client-Side Form Validation Incomplete
- **Status:** `forms/$type.tsx` uses raw `useState` instead of React Hook Form or TanStack Form.
- **Impact:** No field-level validation until submit.
- **Fix:** Integrate form library.

### No Error Tracking Service
- **Status:** No Sentry, LogRocket, or equivalent.
- **Impact:** Production errors are invisible.
- **Fix:** Add error tracking.

### No Offline Capability
- **Status:** No service worker.
- **Impact:** Documents and static pages could benefit from offline caching.
- **Fix:** Add simple precache service worker.

---

## Low

### NewsCard Component Duplication
- **Status:** `NewsCard` and `NewsSection` both render news cards differently.
- **Impact:** Slight duplication in layout logic.
- **Fix:** Consolidate into single `NewsCard` component for all contexts.

### No Automated Lighthouse CI
- **Status:** Scores not tracked over time.
- **Fix:** Add Lighthouse CI to GitHub Actions.

### Hardcoded "Sullivan County" Strings
- **Status:** Some components use string literals instead of `SITE_NAME` from `site-config.ts`.
- **Fix:** Audit and replace.

### No Loading Skeletons
- **Status:** Pages show blank during navigation.
- **Fix:** Add skeleton components for key pages.

### No Visual Regression Testing
- **Status:** CSS changes aren't caught by tests.
- **Fix:** Add screenshot comparison testing.

---

## Security Gaps

- No audit logging for admin actions: who created/edited/deleted what isn't tracked. Add audit log table to D1.
- No session revocation: admin can't force-logout other sessions. Add session management to admin dashboard.
- No 2FA for admin: single password authentication. Consider TOTP or WebAuthn for admin.

---

## UX Gaps

- No breadcrumb navigation
- No "last updated" dates on pages
- No print-specific styles for form pages
- No table of contents on long pages (ADA compliance, privacy policy)

---

## Test Gaps

- No server function integration tests with real D1/KV bindings
- No admin workflow E2E tests (create/edit/delete cycles)
- No form validation E2E tests (field-level error messages)
- No mobile navigation E2E tests (hamburger menu flows)
- No performance regression tests

---

## Deployment Gaps

- No staging/QA environment: only production deployment
- No blue-green deployment strategy
- No automated rollback
- No deployment approval gate
