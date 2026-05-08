# Homepage Redesign — 7-Phase Plan

**Status:** Planned · not yet started.
**Source of truth:** [`County_Government_Website_Blueprint_2026`](#source-of-truth) — 45+ authoritative sources, 20-county benchmark, P0/P1/P2/P3 priority matrix.
**Validation:** the blueprint hybrid model (services-primary nav + audience-secondary pathways) is the canonical pattern shipped by the top-tier benchmark counties (Arlington 8.9, Chesterfield 8.9, Fairfax 8.6, Montgomery 8.2).
**Total estimate:** ~25 hours across 7 phases, each independently shippable.

---

## Why this exists

The current homepage has **31 interactive elements above the fold** (Desktop). Per the blueprint research, top-tier counties ship with **5–9**. The current homepage also serves only **1 of 5 audiences** a county website is supposed to serve:

| Audience | Their job on the homepage | Today |
|---|---|---|
| Current citizens | Pay taxes, find a department, get a permit, contact the right office, emergency info, meeting times | ✅ All 31 above-fold elements serve this |
| Potential citizens ("should I move here?") | Schools, communities, cost of living, taxes, healthcare | ❌ Not surfaced |
| Current businesses | Permits, zoning, tax filings, regulations | ⚠️ Buried under verb-nav |
| Potential businesses ("should I expand here?") | Economic development pitch, top employers, workforce, sites | ❌ Not surfaced — `/economic-development` exists but homepage doesn't link to it |
| Tourists / visitors | Heritage Trail, BMS, country music heritage, Boone Lake, parks, events | ❌ Buried under "About" |

Plus a 6th cross-cutting job: **telling the story of Sullivan County** (heritage, identity, "Where Tennessee Began and Begins"). That's the connective tissue across all five.

The site has the content. The homepage doesn't surface it.

---

## Source of truth

`/Users/codyboring/Downloads/County_Government_Website_Blueprint_2026.docx` — 45+ sources, 20-county benchmark, 13 cross-dimensional insights. Specifically referenced sections:

- **Section 2.1** — P0 above-the-fold critical elements (seal, emergency banner, search-center, 4–6 task-based nav)
- **Section 2.2** — hero section (authentic local photography, single focused message, no carousels)
- **Section 2.3** — below-the-fold (audience segmentation pathways, news with images, events calendar, task-organized service directory)
- **Section 2.4** — footer trust architecture (OMB M-24-08, Plain Writing Act, Nextdoor)
- **Section 3.2.2** — **the canonical hybrid recommendation** (Brunswick County NC + Greenville County SC patterns; services-primary + audience-secondary)
- **Section 5.7** — emergency alert design (multi-channel, message design, the convergence advantage)
- **Section 6.2** — top performers (Arlington, Chesterfield, Fairfax, San Diego, Montgomery, Alameda, Cabarrus)

---

## Design philosophy

**Civic newspaper, not SaaS dashboard.** The reference points are GOV.UK, the Smithsonian, NPR, and the regional newspapers Sullivan citizens already trust — not Notion, Linear, or Vercel marketing.

Specific commitments:

- **Heritage as design language, not a tab.** "Where Tennessee Began and Begins" is the spine of the homepage, not an 8-word tagline.
- **Caslon + Outfit, civic restraint.** Heavy serif headlines, generous whitespace, real local photography. Brand-copper used sparingly for true hierarchy moments.
- **Almanac voice.** Date, weather, sunrise, on-this-day-in-Sullivan-history — newspaper-style, not dashboard-style.
- **Single focused message** in the hero. Not a carousel. (NN/g eye-tracking: users read carousels as ads.)
- **Authentic local photography.** Boone Lake aerial today; 4-photo seasonal rotation by Phase 5. Per blueprint: 35% lower bounce, 83% greater trust vs. stock.
- **Mobile-first without apologies.** 58%+ of government traffic is mobile (blueprint S1.1.3). Mobile fold is 300–400 px. Above-the-fold mobile = identity strip + search box + one primary action above almanac line.
- **Progressive disclosure.** Don't show 31 things above the fold. Show 7. Let curiosity drive deeper.

---

## What changes (high-level)

| Today | After |
|---|---|
| 7 verb mega-nav items | **5 verb mega-nav items**: `FIND · PAY · APPLY · REPORT · ABOUT` (Records folds into FIND) |
| 31 above-fold interactive elements | **~9** above-fold interactive elements |
| 5 task chips + 5 suggested-search pills | **One center search box** (and Cmd+K shortcut) |
| Always-on EmergencyModule strip | Single contextual line below the fold; **dramatic copper takeover only on actual NWS Severe alerts** |
| Identity stats (158k / 430 / 25) in hero | Identity stats moved into "Live in Sullivan" audience pathway |
| No audience pathway | **Three audience-pathway tiles below fold**: Live in / Visit / Do Business in |
| No heritage on homepage beyond tagline | **"Our Story" section** (timeline preview, notable people, "Where Tennessee Began" essay) |
| Single static hero photo | **4-photo seasonal rotation** (Boone Lake spring, courthouse summer, Appalachian fall, snow winter) |
| EmergencyModule below hero | **Storm-mode homepage takeover** when NWS issues Severe/Extreme alert |
| Footer is link dump | **Footer trust architecture** per OMB M-24-08 (accessibility statement matching the regulation, Plain Writing Act commitment, Nextdoor link) |

---

## What's deferred (separate plan)

**"Ask Sullivan County"** — Workers AI Llama 3.3 + RAG over `data/search-index.ts`. Floating launcher. Confidence threshold drops to phone handoff. Per blueprint S4.3.1, AI counties score 0.8 points higher in benchmarks; Williamsburg KY's bot resolves 79% of inquiries first contact.

**Why deferred:** the AI assistant is a distinct subsystem with its own model bindings, prompt engineering, RAG ingestion pipeline, and observability. Building it correctly takes ~6–8 hours of focused work and benefits from a finished homepage to integrate against. **Separate plan: `docs/ASK_SULLIVAN_PLAN.md` (TBD).**

---

## Cross-cutting principles

Every phase:
1. Compiles clean (`tsc`)
2. Builds clean
3. 79/79 unit tests pass
4. Independently deployable to production
5. Smoke-tested before moving to next phase
6. Gets its own git commit (so any phase can be reverted independently)

**Don't break the live site.** Each phase keeps existing routes functional. Phase 1 is the only structural change to the hero; Phases 2–4 are additive sections; Phase 5 is asset work; Phase 6 is conditional rendering on top of existing Phase 1 hero; Phase 7 is footer + final verify.

**Reuse, don't duplicate.** Each section composes from data files and components we already own (`departments.ts`, `communities.ts`, `heritage-sites.ts`, `timeline.ts`, `notable-people.ts`, `employers.ts`, `nav-verbs.ts`, the existing weather subsystem, AnnouncementBanner, etc.). Almost no new content authoring required — this is a rearrangement and surfacing pass.

---

## Phase 1 — Hero recompose + verb consolidation *(~3 hours)*

**Scope:** Calm the hero. Drop 31 above-fold elements to ~9. Collapse 7 verbs to 5.

**Specific changes:**
- `src/data/nav-verbs.ts`: collapse 7 verbs → 5 (`FIND · PAY · APPLY · REPORT · ABOUT`).
  - `Records` folds into FIND (find a record, find a department, find meeting agendas).
  - `Meetings` calendar moves under FIND (find upcoming meetings) — kept reachable.
  - `Departments` mega-menu folds into FIND ("Find a department" with the existing 6-category mega-menu pattern preserved on hover).
- `src/components/home/HeroBanner.tsx`:
  - **Remove** the 5 task-chip row.
  - **Remove** the 5 suggested-search pill row.
  - Keep the single center search box (visible button-styled input).
  - Keep the identity eyebrow ("Sullivan County, Tennessee · Established 1779").
  - Replace the cinematic-but-busy almanac strip with a single quiet line: *"Today, May 7 · 53°F · Offices open until 4:30 · Next commission meeting Thu, May 21"* — newspaper voice.
  - **Add** a rotating fact line: *"On this day in 1779, Sullivan County was named for General John Sullivan."* (Pulled from a new `src/data/today-in-history.ts` keyed by month-day.)
  - Move identity stats (158k / 430 / 25) OUT of the hero (they live in Phase 2's "Live in Sullivan" tile).
- Verify `Pay Taxes` top-right CTA stays; it's research-validated (Arlington's 3-CTA pattern).

**Files touched:**
- `src/data/nav-verbs.ts` — 7 → 5 verbs
- `src/components/layout/SiteNav.tsx` — render 5 not 7
- `src/components/home/HeroBanner.tsx` — substantial recompose
- `src/data/today-in-history.ts` — NEW (~50 entries to start; can grow over time)
- `src/components/home/TodayInHistory.tsx` — NEW small component
- `src/components/home/SeasonalRibbon.tsx` — kept; renders below the hero with no change

**Verify:**
- All 3 viewports
- Above-the-fold interactive count drops to ~9
- Verb mega-menus all still open and route correctly
- E2E: `nav-verbs.test.ts` updated for new 5-verb shape
- Existing `homepage` Playwright tests adjusted for new hero structure

**Ship signal:** Commit `feat(home): hero recompose + verb consolidation 7→5`. Push. **Deploy.** Live verify on prod.

**Risk:** removing chips may surprise frequent users who tap them. Mitigation: search box is bigger and Cmd+K still works; the verb mega-menus surface the same destinations.

---

## Phase 2 — Audience-pathway tiles *(~4 hours)*

**Scope:** Add three large entry tiles below the fold — Live in / Visit / Do Business in. **The single highest-leverage phase.** This is the difference between serving 1 audience and serving 5.

**What gets built:**

```
┌─────────────────────────────────────┐ ┌─────────────────────────────────────┐ ┌─────────────────────────────────────┐
│  🏠 LIVE IN                          │ │  🚗 VISIT                            │ │  💼 DO BUSINESS IN                   │
│  Sullivan County                     │ │  Sullivan County                     │ │  Sullivan County                     │
│                                      │ │                                      │ │                                      │
│  Schools, communities, cost of       │ │  Heritage Trail, Bristol Motor       │ │  30,000+ jobs · Eastman HQ ·        │
│  living, taxes, healthcare,          │ │  Speedway, country music heritage,   │ │  BAE Systems · Ballad Health ·      │
│  transportation.                     │ │  Boone Lake, parks.                  │ │  top employers · workforce stats.   │
│                                      │ │                                      │ │                                      │
│  → /communities                      │ │  → /visit                            │ │  → /economic-development             │
│  → /education                        │ │  → /history                          │ │  → /forms (permits)                  │
│  → /about                            │ │  → /history/timeline                 │ │  → /departments/planning-and-codes   │
└─────────────────────────────────────┘ └─────────────────────────────────────┘ └─────────────────────────────────────┘
```

**Files created:**
- `src/components/home/AudiencePathways.tsx` — three-tile grid, mounted in `routes/index.tsx` immediately after hero
  - Each tile: photo (cropped from the existing `/public/images` library), 3-stat callout, 3 deep links
  - Tile photos sourced from existing assets to start; better art direction in Phase 5
- `src/data/audience-pathways.ts` — copy + stats + link sets per audience

**Stats to surface (using existing data):**
- **Live:** 158,163 residents · 3 school systems · 6 communities · median home value · property tax rate
- **Visit:** 8 NRHP heritage sites · Bristol Motor Speedway (146,000 capacity) · Boone Lake (4,400 acres) · Heritage Trail
- **Do Business:** Eastman Chemical Fortune 500 HQ · BAE Holston Army Ammunition Plant ($8.8B contract) · 11 top employers · TRI airport · I-81/I-26

All numbers live in existing `data/*.ts` files; no new content authoring.

**Verify:**
- Each tile click routes to the correct deep link
- Mobile stack vertically with photo backgrounds
- Touch targets ≥ 44 px
- E2E: new test for "audience tiles render and link correctly"

**Ship signal:** Commit `feat(home): three audience-pathway tiles below fold`. Push. **Deploy.**

---

## Phase 3 — "Today in Sullivan County" condensed utility section *(~3 hours)*

**Scope:** Take everything we removed from above-the-fold (announcement, weather, Open-Now, Next-Meeting, news, services) and present it as ONE coherent below-fold section that serves current citizens without shouting.

**Section structure:**

```
TODAY IN SULLIVAN COUNTY
─────────────────────────
Live AnnouncementBanner content (when present, brand-navy strip)
Open-Now: County offices closed · Opens Friday 8:00 AM
Next Meeting: Thursday, May 21 at 6:30 PM · Add to calendar
Weather: 53°F partly cloudy · Active alerts (if any)

QUICK SERVICES (6 cards, current QuickServices component)
[Pay property taxes] [Marriage license] [Building permits]
[Trash pickup]       [Voter registration] [GIS map]

LATEST NEWS (3 cards, current NewsSection component)
```

**What this consolidates:**
- The current `EmergencyModule` strip (its always-on copper styling) becomes a quiet inline contact line at the bottom of this section: *"In an emergency dial 911 · Sheriff (423) 279-7500 · EMA (423) 323-6912"*
- The current always-loud almanac strip becomes a sentence
- The current 5 task chips + 5 suggested-search pills are gone (Phase 1) — citizens find the same destinations via the quick services card grid
- Identity stats are NOT here — they're in Phase 2's "Live in Sullivan" tile

**Files touched:**
- New `src/components/home/TodaySection.tsx` (composes existing pieces)
- Existing `EmergencyModule.tsx` removed from homepage mount; kept available for `/departments/emergency-management` page if needed
- `src/routes/index.tsx` order updates

**Verify:**
- All 3 viewports
- Information citizens used to find above-the-fold is still findable below-the-fold within one scroll
- Sonner toast on Add-to-Calendar still works
- All `tel:` links still work (TelLink wrappers)

**Ship signal:** Commit `feat(home): Today in Sullivan condensed utility section`. Push. **Deploy.**

---

## Phase 4 — "Our Story" heritage section *(~3 hours)*

**Scope:** Add the heritage / connective-tissue section. Pulls from `data/timeline.ts` (48 events), `data/notable-people.ts` (7 people), and the existing `/history` route copy.

**Section structure:**

```
OUR STORY
─────────
Eyebrow: Sullivan County · Tennessee's second-oldest county
Headline: Where Tennessee Began and Begins
Body (~80 words): Founding date, named for John Sullivan, State of Franklin, King's Mountain, country music birthplace, today.

TIMELINE PREVIEW (5 highlight events from data/timeline.ts)
──────────────────────────────────────────────────────────
1779 · County named  ·  1796 · Tennessee statehood  ·  1780 · King's Mountain
1927 · Bristol Sessions  ·  Today

NOTABLE FIGURES (3 of 7 from data/notable-people.ts, with photos)
[Card] [Card] [Card]

CTA: Read the founding story · See full timeline · Meet notable people
```

**Files created:**
- New `src/components/home/StorySection.tsx`
- Optionally a new `<HighlightTimeline>` mini-component

**Verify:**
- Reads gracefully on all 3 viewports
- Links route to `/history`, `/history/timeline`, `/people`
- Photos load with proper alt text
- Caslon serif headlines render; civic restraint maintained

**Ship signal:** Commit `feat(home): Our Story heritage section`. Push. **Deploy.**

---

## Phase 5 — Seasonal photo rotation + visual polish *(~3 hours)*

**Scope:** Replace the static Boone Lake hero with a 4-photo seasonal rotation. Apply consistent cropping + treatment across audience-pathway tiles + Our Story section. Photo art direction work.

**What gets built:**
- 4 hero photos sourced and committed:
  - **Spring** (Mar–May): Boone Lake aerial (current photo) — already shipped
  - **Summer** (Jun–Aug): Sullivan County Courthouse with summer foliage
  - **Fall** (Sep–Nov): Appalachian ridge with autumn color (Holston River vista)
  - **Winter** (Dec–Feb): snow on the historic courthouse OR Bristol Motor Speedway in winter
- WebP + JPEG at 640 / 1024 / 1920 widths (matches existing pattern)
- Lazy-loaded with `loading="eager"` and `fetchPriority="high"` on the hero variant; rest are lazy
- Month-aware photo selector (deterministic, not random — same all month)
- New `src/lib/seasonal-photo.ts` returns `{ src, srcSet, alt }` based on `Intl.DateTimeFormat` in America/New_York
- Audience-pathway tile photos cropped from the same source set (consistent aesthetic)

**Photo direction notes (committed to a `docs/PHOTO_DIRECTION.md` plan):**
- Authentic local — never stock
- People secondary, place primary (citizens in the place beats portraits of officials)
- Avoid drone-only — mix scales (wide, medium, intimate)
- Civic dignity — courthouse, not "selfie at courthouse"

**Files:**
- 4 photo files (×3 sizes ×2 formats = 24 files in `/public/images/hero/seasonal/`)
- `src/lib/seasonal-photo.ts` — month-aware selector
- `src/components/home/HeroBanner.tsx` — consume the selector
- `docs/PHOTO_DIRECTION.md` — written guidance for future photo additions

**Verify:**
- Each season renders the right photo (test with `vi.useFakeTimers()` advancing through months)
- Image preload tag matches the active season's hero src
- Cumulative Layout Shift remains 0
- Lighthouse performance not regressed

**Ship signal:** Commit `feat(home): seasonal photo rotation + photo direction guidance`. Push. **Deploy.**

**Open question for the user:** sourcing photos. Three options:
1. Use only existing assets (we have 1; would need to find/license 3 more)
2. Stock photos labeled as Sullivan-area (last resort — blueprint warns 35% lower bounce, 83% LESS trust with stock)
3. Commission photographs from a local photographer (~$500–1500 for 4 royalty-free shots)

**Recommendation:** option 3 if budget allows; option 1 with carefully sourced public-domain Tennessee state photos as interim. Option 2 is a non-starter per blueprint research.

---

## Phase 6 — Emergency mode (homepage morphs on Severe NWS alert) *(~6 hours)*

**Scope:** When NWS issues a Severe or Extreme alert for forecast zone TNZ017, the homepage hero **transforms**. This is the highest-trust civic UX move possible.

**State machine:**

| NWS alert state | Hero behavior |
|---|---|
| No alerts OR alerts are Minor/Moderate severity | Default Phase 1 hero (calm masthead + search + almanac line) |
| **At least one Severe or Extreme alert active** | **Storm-mode takeover** |

**Storm-mode hero:**

```
┌──────────────────────────────────────────────────────────────────┐
│ ⚠ SEVERE WEATHER · TORNADO WARNING · TAKE SHELTER NOW            │  ← copper full-bleed
│                                                                  │
│ Tornado Warning until 8:45 PM                                    │
│ Issued by NWS Morristown                                         │
│                                                                  │
│ Take shelter on the lowest floor, away from windows.             │
│ Mobile homes are not safe — go to a sturdy structure.            │
│                                                                  │
│ [ 911 (life-threatening) ]  [ Sheriff (423) 279-7500 ]           │
│ [ EMA (423) 323-6912 ]                                           │
│                                                                  │
│ Find your nearest shelter →                                       │
└──────────────────────────────────────────────────────────────────┘

(audience tiles, today, story sections all collapse to a single "All other county info ↓" link until alert expires)
```

**Implementation:**
- Reuses existing `getCurrentWeather()` server fn — already returns `hasSevereAlert: boolean` plus the full alert array
- New `src/components/home/StormModeHero.tsx`
- `routes/index.tsx`: switches between `<HeroBanner />` and `<StormModeHero />` based on `loaderData.snapshot.hasSevereAlert`
- Loader runs server-side every request; falls back gracefully on KV miss
- All other homepage sections wrapped in a `<details>` that's collapsed-by-default during storm mode (CSS-only, no JS)
- Service worker still pre-caches storm-mode page so it works offline
- Add an `e2e/storm-mode.spec.ts` test: mock the `hasSevereAlert: true` snapshot and assert the takeover renders

**Editor override (admin):**
- Add a `hero_takeover: boolean` column to the `announcements` table
- Migration `0005_announcement_hero_takeover.sql`
- When an announcement has `hero_takeover: true` AND `active: true`, the hero takes over with the announcement content (lets admins force-takeover for planned events: election day reminders, county-wide closures, etc.)
- `/admin/announcements` form gains a "Take over the homepage hero" toggle

**Verify:**
- Mocked Severe alert: hero transforms; phone numbers are tappable
- Mocked editor override: announcement content takes over
- No alert: default hero
- All 3 viewports + a11y (aria-live="assertive" on the alert region)
- Performance: no layout shift on state transition

**Ship signal:** Commit `feat(home): storm-mode emergency takeover + admin hero-override toggle`. Push. **Deploy.** Apply migration to remote D1.

---

## Phase 7 — Footer trust architecture + final verify + ship *(~3 hours)*

**Scope:** Bring the footer up to OMB M-24-08 + Plain Writing Act compliance. Final visual + a11y + 3-viewport verify. Live walkthrough.

**What gets built:**

**Accessibility statement page** at `/accessibility` matching OMB M-24-08 verbatim:
- WCAG standard applied (2.1 AA) and known limitations
- Contact information for the accessibility program manager (use Mayor's office until a dedicated coordinator is named)
- Public feedback mechanism (form or email)
- Instructions for filing complaints (with state + federal escalation paths)
- Reasonable accommodation information

**Plain Writing Act commitment page** at `/plain-language`:
- Statement that the county writes in plain language
- 7th-grade reading level commitment
- Banned consultant words list (we have this in CLAUDE.md voice rules; surface it)
- Public feedback mechanism

**Footer updates:**
- Direct link to `/accessibility` (not under "Website Policies")
- Direct link to `/plain-language`
- Direct link to `/forms/public-records` (FOIA portal)
- **Nextdoor link** (56% of local govts use weekly per blueprint S2.4.3)
- Verified social media links
- `.gov` domain note (planned migration tracked separately)

**Final verify:**
- `npx tsc --noEmit`
- `npm run build`
- `npm test -- --run` (79/79)
- `npx playwright test --project=desktop --project=tablet --project=mobile` (full suite)
- `npx playwright test accessibility.spec.ts` (axe-core scans)
- Live HTTP smoke (40 routes)
- Manual flows: load home (default state) · load home (mocked storm state) · click each audience tile · open + dismiss announcement banner · trigger search via Cmd+K · log in to admin · log out

**Ship signal:** Commit `feat(home): footer trust architecture + final verify; redesign complete`. Push. **Deploy.** Final live walkthrough at all 3 viewports.

---

## Total estimate

| Phase | Effort | Cumulative |
|---|---|---|
| 1. Hero recompose + verb consolidation 7→5 | 3 hr | 3 hr |
| 2. Audience-pathway tiles | 4 hr | 7 hr |
| 3. "Today in Sullivan" condensed utility | 3 hr | 10 hr |
| 4. "Our Story" heritage section | 3 hr | 13 hr |
| 5. Seasonal photo rotation + photo direction | 3 hr | 16 hr |
| 6. Emergency mode (storm takeover) | 6 hr | 22 hr |
| 7. Footer trust architecture + final verify | 3 hr | **~25 hr** |

Each phase is independently shippable + revertible. The order is intentional — Phase 1 reduces the noise; Phase 2 surfaces the missing audiences; Phases 3–4 fill out the body; Phase 5 elevates the visual identity; Phase 6 adds the wow signal; Phase 7 closes the legal compliance loop.

After all 7 phases, the site:
- Drops above-the-fold interactive count from 31 → ~9
- Serves 5 audiences instead of 1
- Matches the blueprint P0/P1/P2/P3 priority matrix
- Includes the OMB M-24-08-compliant footer
- Has a measurable wow signal (storm mode) no other county site ships
- Should benchmark in the **8.5–9.0 range** on the blueprint's 10-dimension scale (alongside Arlington 8.9, Chesterfield 8.9, Fairfax 8.6)

---

## Out of scope (separate plans)

- **"Ask Sullivan County"** AI assistant — Workers AI Llama + RAG. ~6–8 hr. Will get its own `docs/ASK_SULLIVAN_PLAN.md`. Held intentionally so the homepage redesign stays focused.
- **Custom domain** (`sullivancountytn.gov`) — P4 long-term in `NEXT_IMPLEMENTATION_PLAN.md`.
- **Admin overhaul** — separate `docs/ADMIN_PLAN.md` (P1.1, ~8 hours).
- **Audit log + viewer** — P1.2 in `NEXT_IMPLEMENTATION_PLAN.md` (~1.5 hr).

---

## Open judgment calls (confirm before Phase 1)

1. **Verb collapse 7 → 5: which 5?** Recommended: `FIND · PAY · APPLY · REPORT · ABOUT` (Fairfax canonical). Alternative: keep `MEETINGS` separate as a 6th. *Recommendation: 5; meetings live under FIND ("Find upcoming meetings").*
2. **Phase 5 photo sourcing:** existing assets only · stock (NOT recommended per blueprint) · commission a local photographer (~$500–1500). *Recommendation: option 3 if budget; option 1 interim.*
3. **Phase 6 admin hero-override:** include in Phase 6 or defer to a small follow-up? *Recommendation: include — it's only an extra ~30 minutes given the storm-mode infrastructure already lands.*
