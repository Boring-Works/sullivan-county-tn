# Next Implementation Plan — Sullivan County TN

**Last refreshed:** 2026-05-21
**Current state:** see [`CURRENT_STATE.md`](CURRENT_STATE.md)
**Active gaps:** see [`GAP_ANALYSIS.md`](GAP_ANALYSIS.md)

The homepage redesign, duplicate status cleanup, live weather/river expansion, and security remediation are done. The best next work is admin tooling and operational maturity.

## P1 — Admin And Accountability

### 1. Admin dashboard overhaul
**Why:** The public site is now stronger than the back office. `/admin` should look and behave like a serious civic operations surface.

**What to build:**
- Replace the quick-link-only `/admin` landing with stat cards for submissions, feedback, news, minutes, announcements, active alerts, and weather observations.
- Add recent activity once audit logging exists.
- Move admin navigation to a shadcn Sidebar shell.
- Convert admin list pages to sortable/filterable/paginated DataTables.
- Keep Sonner success/error toasts on every mutation.

**Done when:** Admin users land on a live dashboard, can filter/sort/paginate every major list, and can see unread/problem counts at a glance.

**Effort:** 3 to 4 hours.

### 2. Audit log table and viewer
**Why:** County staff need accountability for admin changes.

**What to build:**
- Migration for `audit_log` with `id`, `actor_session_id`, `action`, `resource`, `metadata`, `ip`, `user_agent`, and `created_at`.
- `src/server/audit.ts` helper using ULIDs and sanitized metadata.
- Calls from every admin mutation: news, minutes, announcements, submission status updates, and feedback deletes.
- `/admin/audit` viewer with table filters by action/resource/date.

**Done when:** Every admin mutation creates an audit row and the admin UI can filter recent changes.

**Effort:** 1.5 to 2 hours.

### 3. Feedback admin viewer
**Why:** Page feedback is already collected but not surfaced.

**What to build:**
- `/admin/feedback.tsx` route.
- Filters for helpful/problem feedback.
- Page, comment, created date, and delete/archive action.

**Done when:** Admin users can review page feedback without touching D1 directly.

**Effort:** 30 to 60 minutes.

## P2 — Deployment And Observability

### 4. Configure Cloudflare Web Analytics
**Why:** The site needs traffic visibility without adding third-party analytics.

**What:** User action in Cloudflare dashboard, then wire the token into the app and redeploy.

**Done when:** Cloudflare Web Analytics shows live traffic.

### 5. Re-enable safe preview deploys
**Why:** PR previews are useful, but not if they share production D1/KV.

**What to build:**
- Create preview D1 and KV resources.
- Add explicit preview bindings to `wrangler.jsonc`.
- Re-enable preview deployment in `.github/workflows/deploy.yml`.
- Document which data is safe in preview.

**Done when:** Pull requests deploy to `sullivan-county-tn-preview` with isolated data stores.

### 6. Scheduled weather refresh
**Why:** SWR-on-read is good enough, but a scheduled refresh removes the first-user refresh cost.

**What to build:**
- Custom Worker entry with `scheduled()` calling `refreshWeather(env)`.
- `wrangler.jsonc` cron trigger for every 10 minutes.
- Keep read-path SWR fallback.

**Done when:** Weather refreshes on schedule and `/weather` still serves cached data if cron fails.

## P3 — UX And Quality Polish

### 7. Native Spanish review
Have a native Spanish speaker review `es.json`, especially property tax, form, and legal/civic terms.

### 8. Visual and performance regression coverage
Add Playwright screenshot snapshots and Lighthouse CI budgets after the current production baseline is accepted.

## P4 — Long Term

- Custom domain: move from `codyboring.workers.dev` to the official county domain when available.
- Admin session revocation UI and optional TOTP/WebAuthn.
- Cross-isolate rate limiting with Durable Objects or Cloudflare WAF rules if traffic or attack patterns warrant it.
- Emergency alert opt-in for SMS/email.
- Citizen account portal only if there is a real service workflow requiring saved forms or document vaults.

## How To Pick What Is Next

1. If admin dashboard is not done, do that first.
2. If audit logging is not done, do it before adding more admin mutations.
3. If Cloudflare dashboard access is available, configure Web Analytics.
4. If preview reviews matter, provision isolated preview D1/KV and re-enable previews.
5. Otherwise pick from P3 polish based on the next user-facing demo need.
