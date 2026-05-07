# Next Implementation Plan — Sullivan County TN

**Last refreshed:** 2026-05-07
**Current state:** see [`CURRENT_STATE.md`](CURRENT_STATE.md)
**Active gaps:** see [`GAP_ANALYSIS.md`](GAP_ANALYSIS.md)

The site is in a strong, fully-deployed state. The two highest-impact blueprint fixes (verb-based primary nav + parcel lookup on `/property-taxes`) shipped 2026-05-07. This plan covers the remaining material work in priority order.

---

## P1 — Operational hardening (within next sprint)

### 1. Service worker / offline emergency page
**Why:** Storm and severe-weather events drive a mobile-dominated traffic spike on county sites with the worst connectivity at the moment of greatest need (blueprint Insight 10: Digital Divide Strategy Inversion).

**What:**
- Workbox via `vite-plugin-pwa`.
- Precache `/`, `/property-taxes`, `/contact`, `/calendar`, `/departments/emergency-management`, `/departments/sheriff`, county seal, fonts, CSS.
- Stale-while-revalidate on content; cache-first on hashed assets.
- Bump SW version on each deploy.
- Register only in production (`import.meta.env.PROD`).

**Done when:** loading the home page, killing the network, refreshing — emergency module + EMA / Sheriff phone numbers still render.

### 2. CF Web Analytics token
**Why:** Beacon script is already wired in `__root.tsx`, just needs a token. Cookieless, no consent banner needed.

**What:** Generate token in CF dashboard → paste → deploy. Track page views, top searches (via `?q=` if we ever add a search results page), bounce rate by audience pathway.

**Done when:** dashboard shows traffic.

### 3. Spanish native review
**Why:** `es.json` is machine-translated. Bristol and Kingsport have meaningful Spanish-speaking populations.

**What:** Pay a native Spanish speaker (~$200) to review and rewrite ~150 keys, paying special attention to:
- `propertyTaxes.lookup.*` (tax-related terms have legal weight)
- `home.heroH1` / `home.heroSearchPlaceholder`
- `forms.*` field labels
- `verbNav.*` verb labels (verbs translate awkwardly word-for-word)

**Done when:** locale review checked into the repo with reviewer credit in `docs/CREDITS.md`.

---

## P2 — Equity + transparency (within the quarter)

### 4. Emergency alert sign-up (SMS + email)
**Why:** Blueprint Tier 1. Only 40% of counties offer this; SMS open rate is 99% vs 20% for email.

**What:**
- New `/alerts` page: opt-in form (name, phone, email, ZIP, alert types: storm / road closure / boil-water / AMBER).
- D1 `alert_subscribers` table.
- Phase 1 = collect list + admin UI; admin blasts out via existing EMA SMS gateway / email.
- Phase 2 = Twilio + cron Worker to send automatically when an admin posts an "urgent" announcement.

**Done when:** opt-in form is wired to D1, admin can export CSV, first test alert sent.

### 5. "Last updated" stamps on pages
**Why:** GOV.UK pattern. Trust signal.

**What:** Add `lastUpdated: ISO-date` to the `Department` interface; surface at the bottom of each detail page. Same for forms.

**Done when:** every department page shows "Last updated May X, 2026" near the footer.

### 6. Audit log for admin mutations
**Why:** Government accountability. Currently no record of who changed what.

**What:**
- New D1 table `audit_log` (`actor_session_id`, `action`, `resource`, `metadata` JSON, `ip`, `created_at`).
- Wrap every admin mutation server fn with a small `audit(action, resource, metadata)` helper.
- Surface in `/admin/audit` (auth-gated, sortable by date / actor).

**Done when:** creating, editing, deleting news / minutes / announcements / submissions all generate audit rows.

---

## P3 — Polish (when bandwidth allows)

### 7. Cross-isolate rate limit (only if traffic warrants)
- Migrate `rate-limit.ts` from in-memory `Map` to Durable Object atomic counter, OR
- Use Cloudflare WAF rate-limiting rules at the platform level.

### 8. Plain-language CI check
- `scripts/check-readability.ts` runs Flesch-Kincaid over `description` / `services[]` / `helpText` strings.
- Fails CI if any string scores above grade 9.
- Forces voice consistency without reviewer fatigue.

### 9. Search query logging + best bets
- Log every search query (D1, 30-day TTL).
- Admin view sorted by zero-result frequency.
- Best-bets JSON pin specific results for seasonal windows ("Property tax deadline Feb 28" → `/property-taxes`, Jan–Mar only).

### 10. Visual regression snapshots
- Playwright screenshot tests on home, dept detail, calendar, forms, property-taxes, communities at desktop + mobile widths.
- Catch CSS regressions that don't break layout enough to fail an assertion.

### 11. "Ask Sullivan County" assistant (Invisible AI Advantage)
- Workers AI (`@cf/meta/llama-3.3-70b-instruct-fp8-fast`) + RAG over the existing search index + departments.ts + news.ts.
- Branded as **Ask Sullivan County**, never "AI chatbot."
- Floating launcher bottom-right (mobile-aware).
- Confidence threshold drops to "Call (423) 323-6417" handoff.
- Williamsburg's bot resolved 79% on first contact; even half that meaningfully reduces phone load.

---

## P4 — Long-term

### 12. Custom domain (`sullivancountytn.gov`)
Move off `codyboring.workers.dev` subdomain. Configure custom domain in Cloudflare; verify HSTS preload still applies; update sitemap and JSON-LD.

### 13. Staging / QA environment
Provision `sullivan-county-tn-preview` worker + a separate D1 for QA. Wire to a `staging` git branch.

### 14. Citizen account portal (Tier 2 from blueprint)
SSO via better-auth or Clerk. Saved forms, document vault, payment history. Enables much richer interactions but is a significant lift; defer until needed.

---

## What's explicitly out of scope

- **Migrating to Postgres** — D1 is plenty for this scale. The decision log holds.
- **Redesign** — civic restraint stands. Heritage palette + Caslon + Outfit are the identity. No Holston-Partners-style redesign.
- **Mobile app** — web-first remains the default per `~/.claude/THE-BORING-STACK.md` step 1. Citizens reach the site via search, not by installing an app.
- **Removing the heritage / history pages** — they belong on the site (now consolidated under About, kept reachable from footer + search).

---

## How to pick what's next

When you sit down to ship something, in order:
1. Did P1.1 (service worker) ship? If not, do that. It's the highest-impact remaining item.
2. Did P1.2 (CF analytics token) take 5 minutes yet? If not, do that. It's literally a dashboard click + redeploy.
3. Has anything changed about traffic level or admin needs? If so, audit P2.
4. Otherwise pick from P3 / P4 based on what's drawing your interest.

Don't expand scope without strong evidence. The site is good. The remaining work is incremental.
