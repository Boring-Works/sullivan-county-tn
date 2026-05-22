# Sullivan County TN — Gap Analysis

**Refreshed:** 2026-05-21 after homepage redesign, weather/river expansion, security remediation, and docs review.
**Prepared with AI assistance.**

The public site is in strong production shape. The remaining gaps are mostly admin tooling, accountability, analytics, and operational maturity.

## Active Gaps

### High Priority

#### 1. Admin dashboard overhaul
- **Status:** `/admin` is still a simple quick-link dashboard. Admin list pages use basic tables instead of sortable/filterable DataTables.
- **Impact:** This is the weakest visible surface if county staff or judges review the back office.
- **Fix:** Add a real admin shell with stat cards, recent activity, shadcn Sidebar, and DataTable patterns for news, minutes, announcements, submissions, and feedback.
- **Effort:** 3 to 4 hours.

#### 2. Audit log table and `/admin/audit`
- **Status:** No durable record of who created, edited, deleted, or changed admin records.
- **Impact:** Government accountability gap.
- **Fix:** Add `audit_log` D1 table, `audit()` helper, and `/admin/audit` viewer. Call the helper from every admin mutation.
- **Effort:** 1.5 to 2 hours.

### Medium Priority

#### 3. CF Web Analytics token
- **Status:** Web Analytics is not configured.
- **Impact:** No first-party traffic metrics in Cloudflare.
- **Fix:** User action: create a Web Analytics site in Cloudflare, add the token to the app, redeploy.
- **Effort:** 5 minutes once dashboard access is available.

#### 4. Isolated preview environment
- **Status:** Production deploy is configured. PR preview deploys are intentionally disabled because preview Workers could inherit production D1/KV bindings.
- **Impact:** Safe preview deploys require separate data stores before re-enabling.
- **Fix:** Create preview D1/KV resources, add explicit preview bindings in `wrangler.jsonc`, then re-enable preview deploys in GitHub Actions.
- **Effort:** 30 to 60 minutes plus Cloudflare setup.

#### 5. Scheduled weather refresh
- **Status:** SWR-on-read works and production weather is live.
- **Impact:** The first visitor after the freshness window can pay the upstream NWS refresh cost.
- **Fix:** Add a Worker `scheduled()` handler with a Cron Trigger. Keep SWR-on-read as fallback.
- **Risk:** Do not add cron-triggered AI or expensive background jobs without budget alerts. This weather cron uses government APIs only.
- **Effort:** 45 minutes.

#### 6. Native Spanish review
- **Status:** `es.json` is populated but machine-translated.
- **Impact:** Tax, form, and civic terms should be reviewed before claiming polished bilingual support.
- **Fix:** Have a native Spanish speaker review locale copy.
- **Effort:** User/vendor action.

### Low Priority

- Add cross-isolate rate limiting via Durable Object or Cloudflare WAF rules if traffic warrants.
- Add automated Lighthouse CI.
- Add Playwright visual regression screenshots for home, weather, forms, calendar, and department detail pages.
- Add `lastUpdated` metadata to news, communities, and heritage detail pages.
- Add print-specific styles for `/forms/$type`.
- Source Barry Hopper commissioner photo.

## Test Gaps

- No server-function integration suite against real D1/KV bindings via `@cloudflare/vitest-pool-workers`.
- Admin E2E tests cover auth, but not full create/edit/delete workflows across all admin resources.
- No performance regression budget in CI.
- Parcel lookup tests can still depend on TPAD upstream responsiveness.

## Security Gaps

- No audit logging table yet.
- No admin session revocation UI.
- Single-factor admin auth. TOTP or WebAuthn would harden against password leaks.

## Deployment Gaps

- GitHub Actions production deploy requires `CLOUDFLARE_API_TOKEN`; without it, CI builds/tests but skips deploy.
- Preview deploys remain disabled until isolated preview D1/KV bindings exist.
- No blue-green deployment or automated rollback gate.

## Recently Fixed

| Item | Fixed |
|------|-------|
| Homepage citizen-first redesign with task search and single status panel | 2026-05-21 |
| Duplicate homepage weather/status overlays removed | 2026-05-21 |
| Live USGS river conditions added to `/weather` | 2026-05-21 |
| Weather forecast expanded to day/night periods and 24-hour trend | 2026-05-21 |
| Wind handling fixed for calm/unknown direction and 16-point compass labels | 2026-05-21 |
| Admin password removed from docs and deployed admin E2E changed to env-only password input | 2026-05-21 |
| Admin login now fails closed if D1 session creation fails | 2026-05-21 |
| Server-side dynamic form validation tightened against form definitions | 2026-05-21 |
| Admin submissions listing capped to reduce PII/read-size risk | 2026-05-21 |
| Preview deploys disabled until isolated preview bindings exist | 2026-05-21 |
| SearchDialog upgraded to shadcn Command while keeping Fuse.js aliases | 2026-05-21 |
| SearchDialog mobile clipping fixed and live-verified at mobile/tablet/desktop sizes | 2026-05-21 |
| `/admin/feedback` viewer for page feedback review and deletion | 2026-05-21 |
| Mobile drawer upgraded to shadcn Sheet, removing custom focus-trap code | 2026-05-21 |
| Phase 1 typed Cloudflare env (`getEnv/getDB/getKV`) | 2026-05-07 |
| Phase 2 drizzle-zod, schema indexes, ULID brand type | 2026-05-07 |
| Phase 3 shadcn primitives and brand Button variants | 2026-05-07 |
| Phase 4 RHF + shadcn Form + Sonner migrations | 2026-05-07 |
| Phase 5 PWA service worker, offline page, and 2026 manifest | 2026-05-07 |
| NWS weather subsystem with KV cache and D1 archive | 2026-05-07 |
| Parcel lookup on `/property-taxes` | 2026-05-07 |
| Feedback widget backed by D1 | 2026-05-06 |
| Admin login with ULID sessions and timing-safe password compare | 2026-05-06 |
| Zod validation and sanitize-html on server writes | 2026-05-06 |
| Receipt IDs and idempotency keys added to contact, public forms, and page feedback | 2026-05-21 |
| Direct document/task search results added and task verb labels corrected | 2026-05-21 |
| External handoff registry and hardened handoff link component added | 2026-05-21 |
