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

### ~~Site Navigation (Mega-Menu)~~ ✅ FIXED (2026-05-06)
- **Status:** Full audit + rebuild against 2026 best practices. Dead `megaContainerRef` effect removed. `Link to="/departments"` now passes required `search` prop. Mega-menu closes on outside `pointerdown`. Hover open is gated behind `matchMedia("(hover: hover) and (pointer: fine)")` so touch devices use click-only. Desktop static links, the Departments trigger, mobile static links, and the current department in the mega-menu all show active-page styling (`aria-current="page"` + visual underline / left border / parchment fill). `hasDarkHeader` regex anchored with `(\/|$)`. ARIA upgraded from incorrect `role="menu"`/`menuitem` to a proper disclosure with `aria-expanded` + `aria-controls` + matching `id`; links are now naturally tabbable. `expandedCategory: string|null` renamed to `mobileDeptsOpen: boolean`. `prefers-reduced-motion` snaps animated entries to opacity 1 with no delay.
- **Verification:** 15/15 mega-menu E2E tests pass against local preview, 24/24 unit tests pass, 0 typecheck errors in SiteNav.tsx, 0 Biome lint errors, build 4.20s / 747 KB worker entry.

### ~~Mobile Drawer Rendering with `height: 0`~~ ✅ FIXED (2026-05-06)
- **Status:** Critical bug found via Playwright MCP audit on the deployed site. The `<nav>` uses `backdrop-blur-lg`, which in CSS establishes a containing block for `position: fixed` descendants. The mobile drawer was a child of `<nav>`, so its `top: 64px; bottom: 0` was computed relative to the 64-px-tall nav rather than the viewport — collapsing to height 0. Drawer content (681px tall) was effectively invisible and the first interactive button (mobile Departments toggle) was unclickable. Fix: hoisted the mobile drawer and the lazy `<SearchDialog />` out of `<nav>` as fragment siblings so `position: fixed` resolves against the viewport.
- **Verification:** Live `getComputedStyle` check on the deployed worker confirms `drawer.offsetHeight = 100dvh - 64px`, parent is `<body>`, the Departments collapsible expands and shows all 25 departments + "View all".

### ~~Duplicate `<main id="main-content">` Nesting~~ ✅ FIXED (2026-05-06)
- **Status:** `__root.tsx` rendered `<main id="main-content">` around `<Outlet />` while every route component also rendered its own `<main id="main-content">`. Result: every page emitted nested `<main>` elements with duplicate IDs (invalid HTML, suspected hydration noise). Removed the wrapper from `__root.tsx`; ensured `AdminLayout` and `admin/login.tsx` carry the id themselves so the skip-link target stays in place for admin routes.

### ~~Missing PWA Icons (404 in console)~~ ✅ FIXED (2026-05-06)
- **Status:** `manifest.webmanifest` referenced `/android-chrome-192x192.png` and `/android-chrome-512x512.png`, neither of which existed in `public/`. Generated both from `favicon.svg` via `rsvg-convert`. 404 console error gone.

### ~~SearchDialog Missing `DialogTitle`~~ ✅ FIXED (2026-05-06)
- **Status:** Radix `DialogContent` requires a `DialogTitle` for screen-reader accessibility, and a Radix console error was firing every time the search dialog opened. Added visually hidden `Dialog.Title` ("Search Sullivan County") + `Dialog.Description` for SR context.

### ~~Hero Image Preloaded Sitewide~~ ✅ FIXED (2026-05-06)
- **Status:** `<link rel="preload" href="/images/hero/boone-lake-1920.webp">` lived in `__root.tsx`, but the image only renders on `/`. Browser console warned "preloaded but not used" on every other page. Moved the preload into the home route's `head()` so it only fires when the image is actually rendered.

### ~~Speculation-Rules Script Ignored~~ ✅ FIXED (2026-05-06)
- **Status:** Console: "speculation rule set ... will be ignored ... if it was created using the innerHTML setter." React `dangerouslySetInnerHTML` rewrites the script element on hydration, which the browser's speculation-rules engine treats as innerHTML insertion and rejects. The rule set was therefore never actually prefetching anything — removed for now. To reinstate, the script must be emitted as static HTML outside React's tree.

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
