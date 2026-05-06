# Sullivan County TN Government Website

Citizen services portal for Sullivan County, Tennessee.
Brand: **"Where Tennessee Began and Begins"**

## Audit Docs (May 2026)
See `/docs/` for complete architecture audit:
- [ARCHITECTURE.md](docs/ARCHITECTURE.md) — Full stack architecture
- [CURRENT_STATE.md](docs/CURRENT_STATE.md) — Current project state
- [COMPONENT_INVENTORY.md](docs/COMPONENT_INVENTORY.md) — All 37 components
- [DEVELOPMENT_WORKFLOW.md](docs/DEVELOPMENT_WORKFLOW.md) — Dev workflow
- [GAP_ANALYSIS.md](docs/GAP_ANALYSIS.md) — Known gaps
- [NEXT_IMPLEMENTATION_PLAN.md](docs/NEXT_IMPLEMENTATION_PLAN.md) — Future plan

## State (2026-05-06)
- **Tests:** 24 unit + 164 E2E across desktop/tablet/mobile (all green)
- **A11y:** WCAG AA compliant (6 brand tokens fixed, 13 ARIA violations resolved)
- **Lint:** 0 blocking errors (5 disabled a11y rules for valid WAI-ARIA patterns)
- **Build:** 2.93s, 747KB worker entry
- **Security:** Auth gates, CSRF, rate limiting, timing-safe compare, Zod validation, ULIDs, XSS sanitization, structured logging

## Tech Stack
- TanStack Start (full-stack React framework)
- TanStack Router (file-based routing)
- Cloudflare Workers (edge deployment)
- Tailwind CSS v4
- shadcn/ui + Radix primitives
- Biome (lint + format)
- TypeScript (strict)
- Vite + Cloudflare Vite Plugin

## Key Commands
- `npm run dev` — Start dev server (local Cloudflare Workers runtime)
- `npm run build` — Production build
- `npm run preview` — Preview production build locally
- `npm run deploy` — Build + deploy to Cloudflare Workers
- `npm run lint` — Run Biome linter
- `npm run format` — Format with Biome
- `npm run test` — Run tests
- `npx tsx scripts/generate-rss.ts` — Regenerate RSS feed after adding news
- `npx tsx scripts/generate-sitemap.ts` — Regenerate sitemap after adding routes/content

## Routes
| Route | File | Purpose |
|-------|------|---------|
| `/` | `routes/index.tsx` | Homepage dashboard (hero, quick services, dept categories, news) |
| `/departments` | `routes/departments/index.tsx` | Department directory with category filter |
| `/departments/$slug` | `routes/departments/$slug.tsx` | Individual department detail (25 departments) |
| `/commissioners` | `routes/commissioners.tsx` | Commissioner grid by district (11 districts) |
| `/news` | `routes/news/index.tsx` | County news feed |
| `/news/$slug` | `routes/news/$slug.tsx` | News article detail page with full content |
| `/calendar` | `routes/calendar.tsx` | Calendar & meetings (6 recurring schedules, YouTube live links) |
| `/contact` | `routes/contact.tsx` | Contact hub with form (9 subjects, KV backend), Google Maps, quick contacts, resources |
| `/documents` | `routes/documents.tsx` | 115-document library with 17 categories, search, category pills, collapsible sections |
| `/ada-compliance` | `routes/ada-compliance.tsx` | ADA compliance info + 5 downloadable forms |
| `/privacy-policy` | `routes/privacy-policy.tsx` | Privacy policy, cookies, data retention, user rights |
| `/employee-services` | `routes/employee-services.tsx` | Employee portals (Skyward, Edison, Mark III), benefits, training videos |
| `/history` | `routes/history/index.tsx` | Founding story — 7 narrative sections (Cherokee Homeland through Modern Era) |
| `/history/timeline` | `routes/history/timeline.tsx` | 48-event timeline across 6 eras with color-coded category dots |
| `/history/$slug` | `routes/history/$slug.tsx` | Heritage site detail pages (8 sites: Rocky Mount, Netherland Inn, etc.) |
| `/communities` | `routes/communities/index.tsx` | Community hub — 6 municipality cards |
| `/communities/$slug` | `routes/communities/$slug.tsx` | Community detail (Kingsport, Bristol, Blountville, Bluff City, Piney Flats, Colonial Heights) |
| `/about` | `routes/about.tsx` | County overview, demographics, Tri-Cities MSA context |
| `/economic-development` | `routes/economic-development.tsx` | Top employers, sector breakdown, economic assets |
| `/education` | `routes/education.tsx` | School systems, higher ed, educational attainment stats |
| `/transportation` | `routes/transportation.tsx` | TRI airport, highways, transit + historical context |
| `/people` | `routes/people.tsx` | Notable historical figures grid (7 people) |
| `/visit` | `routes/visit.tsx` | Heritage Trail, parks, recreation, events, getting here |

## Data Files
| File | Content |
|------|---------|
| `data/departments.ts` | 25 departments with contacts, services, offices, staff, external links |
| `data/commissioners.ts` | 24 commissioners across 11 districts |
| `data/news.ts` | County news articles with full content + PDF attachments |
| `data/quick-services.ts` | 8 quick-access service links for homepage |
| `data/documents.ts` | 115 documents across 17 categories (PDF, DOC, DOCX, TIF) with types and helpers |
| `data/search-index.ts` | Unified search index (departments, news, commissioners, documents, heritage sites, communities, pages) |
| `data/heritage-sites.ts` | 8 heritage sites with NRHP/NHL info, coordinates, key facts, trail stops |
| `data/timeline.ts` | 48 timeline events (1761–2025) across 6 categories with color coding |
| `data/communities.ts` | 6 communities with population, type, landmarks, highlights, at-a-glance stats |
| `data/notable-people.ts` | 7 notable figures with categories, years, achievements |
| `data/employers.ts` | 11 top employers + 3 sector employment entries |
| `data/education.ts` | 6 school systems/institutions with types, enrollment, descriptions |
| `data/meeting-minutes.ts` | Meeting minutes with committee, date, titles, PDF attachments |
| `data/form-definitions.ts` | 4 form types with field definitions and validation |
| `data/site-config.ts` | Centralized SITE_URL, SITE_NAME, CURRENT_YEAR constants |

## Key Components
| Component | Location | Purpose |
|-----------|----------|---------|
| SiteNav | `components/layout/SiteNav.tsx` | Glass-morphism nav with mega-menu (keyboard nav) + Cmd+K search (code-split) + mobile focus trap |
| SiteFooter | `components/layout/SiteFooter.tsx` | Footer with mountain silhouette + heritage ornament |
| AnnouncementBanner | `components/layout/AnnouncementBanner.tsx` | Dismissible banner (localStorage persistence) |
| SearchDialog | `components/layout/SearchDialog.tsx` | Fuse.js fuzzy search modal (Cmd+K), ARIA combobox pattern, lazy-loaded |
| NotFound | `components/layout/NotFound.tsx` | Custom 404 page with quick links + search hint |
| HeroBanner | `components/home/HeroBanner.tsx` | Cinematic hero with WebP + JPEG `<picture>` sources + stat counters |
| QuickServices | `components/home/QuickServices.tsx` | 8-card service grid with scroll reveals |
| DepartmentCategories | `components/home/DepartmentCategories.tsx` | 6 category cards with scroll reveals |
| CommunityHighlights | `components/home/CommunityHighlights.tsx` | 3 tourism/regional attraction cards |
| NewsSection | `components/home/NewsSection.tsx` | Editorial news layout with featured first item |
| DepartmentDetail | `components/departments/DepartmentDetail.tsx` | Department page with category-tinted banner |
| NewsDetail | `components/news/NewsDetail.tsx` | Article detail with header, body, PDF/source links |
| NewsCard | `components/shared/NewsCard.tsx` | News card with internal link + PDF badge |
| VideoEmbed | `components/shared/VideoEmbed.tsx` | Privacy-enhanced YouTube (click-to-load, nocookie) |
| ContactCard | `components/shared/ContactCard.tsx` | Reusable contact info card |
| CommissionerGrid | `components/commissioners/CommissionerGrid.tsx` | District grid with alternating backgrounds |
| CommissionerCard | `components/commissioners/CommissionerCard.tsx` | Individual commissioner card with headshot |
| AboutSection | `components/home/AboutSection.tsx` | "Where Tennessee Began" section with courthouse photos |
| DepartmentCard | `components/departments/DepartmentCard.tsx` | Department card with category badge + phone |
| MountainDivider | `components/shared/MountainDivider.tsx` | SVG mountain ridge section dividers |
| useScrollReveal | `hooks/useScrollReveal.ts` | Intersection Observer scroll-reveal system |
| useCountUp | `hooks/useCountUp.ts` | Animated stat counter hook |
| HeritageHero | `components/history/HeritageHero.tsx` | Hero with brand tagline + 1790/current year date device |
| HistoryNarrative | `components/history/HistoryNarrative.tsx` | Long-form editorial content sections with scroll-reveal |
| HeritageSiteCard | `components/history/HeritageSiteCard.tsx` | Heritage site card with NRHP/NHL badges |
| VisitorInfoCard | `components/history/VisitorInfoCard.tsx` | Visitor info sidebar (hours, admission, location, website) |
| TimelineSection | `components/history/TimelineSection.tsx` | Alternating vertical timeline with color-coded era dots |
| CommunityCard | `components/communities/CommunityCard.tsx` | Community card with type badge, population, highlights |
| PersonCard | `components/people/PersonCard.tsx` | Notable person card with category badge + achievement |
| FormField | `components/forms/FormField.tsx` | Reusable form input with label, help text, and role="alert" error |
| FormLayout | `components/forms/FormLayout.tsx` | Form page wrapper with validation states |
| StatusBadge | `components/admin/StatusBadge.tsx` | Admin status badge (new/reviewed/resolved) |
| AdminLayout | `components/admin/AdminLayout.tsx` | Admin sidebar + mobile nav with auth-aware links |

## Static Assets
| Directory | Content |
|-----------|---------|
| `public/documents/` | 115 documents in 17 subdirectories (PDF, DOC, DOCX, TIF) |
| `public/images/commissioners/` | Commissioner headshots (23 images) |
| `public/images/officials/` | Mayor headshot |
| `public/rss.xml` | Static RSS feed (generated via `scripts/generate-rss.ts`) |
| `public/sitemap.xml` | Static sitemap (generated via `scripts/generate-sitemap.ts`, 65 URLs) |
| `public/robots.txt` | Crawler directives + sitemap reference |
| `public/_headers` | Security headers (CSP, HSTS, X-Frame-Options) + cache control |

## Packages Added (2026-05-06 audit)
| Package | Purpose |
|---------|---------|
| `zod` | Server function input validation |
| `date-fns` | Date formatting and manipulation |
| `ulidx` | ULID-based IDs (replaces crypto.randomUUID()) |
| `sanitize-html` | XSS prevention for stored content |
| `@playwright/test` | E2E testing across desktop/tablet/mobile |
| `@axe-core/playwright` | Automated accessibility audits (WCAG 2.1 AA) |
| `@cloudflare/vitest-pool-workers` | Real Workers runtime testing |

## Testing
- Unit tests: `npm test`
- E2E tests: `npx playwright test`
- E2E UI mode: `npx playwright test --ui`
- Coverage: `npm test -- --coverage`

## Server Functions
| Function | File | Purpose |
|----------|------|---------|
| `login` | `server/auth.ts` | Admin authentication with ULID session + timing-safe password compare |
| `validateAdmin` | `server/auth.ts` | Session validation from cookie |
| `logout` | `server/auth.ts` | Session deletion + cookie clear |
| `submitContactForm` | `server/contact.ts` | Validates + stores contact form submissions in KV (90-day TTL) |
| `submitForm` | `server/forms.ts` | Validates + stores structured form submissions in D1 |
| `setCsrfCookie` | `server/csrf.ts` | Generates and sets CSRF double-submit cookie |
| `validateCsrf` | `server/csrf.ts` | Validates CSRF token against cookie |
| `rateLimit` | `server/rate-limit.ts` | In-memory rate limiter (IP-based) |
| `listNews/getNewsArticle/createNewsArticle/updateNewsArticle/deleteNewsArticle` | `server/admin-news.ts` | News CRUD (auth-gated) |
| `listMinutes/createMinutesEntry/updateMinutesEntry/deleteMinutesEntry` | `server/admin-minutes.ts` | Minutes CRUD (auth-gated) |
| `listSubmissions/updateSubmissionStatus` | `server/admin-submissions.ts` | Form submission management (auth-gated) |
| `listAnnouncements/createAnnouncement/updateAnnouncement/deleteAnnouncement` | `server/admin-announcements.ts` | Announcement CRUD (auth-gated) |
| `requireAdmin` | `server/guard.ts` | Shared auth guard for all admin endpoints |

## Cloudflare Bindings
| Binding | Type | Purpose |
|---------|------|---------|
| `DB` | D1 Database | Form submissions, news articles, meeting minutes, announcements, admin sessions (ID: `b24dd694-71b6-4f25-a5eb-88ff1f9527da`) |

## Brand Tokens (Appalachian Civic Heritage)
- `brand-navy` (#0c1e33) — primary, headers, nav, hero
- `brand-copper` (#a44d2a) — CTAs, accents, hover states (darkened for WCAG AA)
- `brand-brass` (#806840) — decorative elements on light backgrounds (darkened for WCAG AA)
- `brand-brass-light` (#c9a84c) — brass variant for dark/hero backgrounds
- `brand-sage` (#3d6b56) — finance category, success
- `brand-stone` (#756858) — secondary text, labels (darkened for WCAG AA)
- `brand-warm-gray` (#6a6560) — placeholder text, metadata (darkened for WCAG AA)
- `brand-cream` (#faf8f5) — page background
- `brand-parchment` (#f3efe9) — alternating section backgrounds
- `brand-slate` (#2d3038) — body text
- `brand-courts` (#6b4c8a) — courts category accent
- `brand-safety` (#a63d3d) — public safety category accent
- `brand-community` (#356868) — community category accent (darkened for WCAG AA)
- **Typography:** Libre Caslon Text (display/serif) + Outfit (body/sans)

## Deployment
- **Platform:** Cloudflare Workers
- **Worker:** sullivan-county-tn
- **Deploy:** `npm run deploy`

## Decision Log
| Decision | Rationale | Date |
|----------|-----------|------|
| Converted from Holston Partners template | Reuse proven TanStack Start + CF Workers scaffold | 2026-02-27 |
| Multi-page with file-based routing | Departments, commissioners, services each get own routes | 2026-02-27 |
| Static data files, no database | County info is relatively static, no D1 needed | 2026-02-27 |
| Blue/orange/green brand system | Blue=trust/government, orange=Tennessee energy, green=Appalachian heritage | 2026-02-27 |
| Appalachian Civic Heritage design v1 | Libre Caslon Text + Outfit fonts, navy/copper/brass palette, editorial layouts | 2026-02-27 |
| Appalachian Editorial design v2 | Cinematic hero with photo parallax, scroll reveals, mountain dividers, glass nav, stat counters | 2026-02-27 |
| Fuse.js for site search | Client-side fuzzy search, ~5KB gzipped, Cmd+K modal | 2026-02-28 |
| Static RSS via build script | No API routes needed — generate XML to public/ | 2026-02-28 |
| YouTube nocookie embeds | Privacy-enhanced click-to-load video player | 2026-02-28 |
| Documents served locally | 115 files (PDF, DOC, DOCX, TIF) in 17 category subdirectories under public/documents/ | 2026-02-28 |
| Contact form backend via KV | Server function stores submissions in CF KV (90-day TTL), no external email service | 2026-03-01 |
| Custom 404 page | Branded not-found with quick links + search hint, uses notFoundComponent | 2026-03-01 |
| Sitemap + robots.txt | Static generation scripts, 40 URLs, Google Search Console ready | 2026-03-01 |
| CF Web Analytics beacon | Free, privacy-friendly, no cookies — token from CF dashboard required | 2026-03-01 |
| Security headers via _headers | CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy | 2026-03-01 |
| Cache headers for static assets | Immutable 1yr for hashed assets, 1day docs, 1wk images | 2026-03-01 |
| Skip-to-content + reduced motion | WCAG 2.4.1 compliance, prefers-reduced-motion media query | 2026-03-01 |
| Honeypot spam protection | Hidden field rejects bots, better email regex, field length limits | 2026-03-01 |
| Canonical URLs + JSON-LD | GovernmentOrganization schema, article OG type for news, rel=canonical | 2026-03-01 |
| Heritage Content Layer | 11 new routes, 7 new components, 6 new data files for history, communities, civic pages | 2026-03-01 |
| Forms & Admin CRUD | 13 new routes for form submissions + admin dashboard with D1/Drizzle backend | 2026-03-15 |
| D1 + Drizzle ORM (news, minutes, announcements, sessions, submissions) | Migrated from static-only to full CRUD admin via D1 | 2026-03-15 |
| Admin login with ULID sessions | Timing-safe password comparison, rate-limited, httpOnly secure cookies, auth gate on all admin | 2026-05-06 |
| Zod validation on all server functions | Shared schemas in src/lib/schemas/, .inputValidator(zodSchema) on all 7 endpoints | 2026-05-06 |
| CSRF protection module | Double-submit cookie pattern, crypto.getRandomValues tokens | 2026-05-06 |
| Content sanitization | sanitize-html on all stored content (titles, bodies, summaries) | 2026-05-06 |
| Structured JSON logging | No PII in logs, console.error(JSON.stringify({...})) pattern | 2026-05-06 |
| WCAG AA color contrast pass (10/14 pages) | 6 brand token contrast fixes: stone, copper, brass, community, warm-gray @ 4.5:1+ | 2026-05-06 |
| Accessibility audit pass (13 ARIA issues resolved) | Main landmark, combobox ARIA, aria-live, aria-expanded, aria-modal, nav labels, form errors, heading hierarchy | 2026-05-06 |
| 24 unit + 164 E2E tests across 3 viewports | Vitest data integrity tests + Playwright user flows, a11y scans, admin auth | 2026-05-06 |
| Font preconnect hints | preconnect for fonts.googleapis.com + fonts.gstatic.com | 2026-03-01 |
| Code splitting (SearchDialog) | React.lazy + Suspense for SearchDialog/Fuse.js — bundle 502KB→415KB (17% reduction) | 2026-03-01 |
| WebP hero images | cwebp conversion (quality 80), `<picture>` with WebP sources before JPEG fallbacks — 60%+ savings | 2026-03-01 |
| Mega-menu keyboard nav | ArrowUp/Down cycling, Escape to close + focus return, roving tabindex | 2026-03-01 |
| Mobile menu focus trap | Tab wrapping (first↔last), Escape to close, focus return to hamburger | 2026-03-01 |
| Search dialog ARIA | role="combobox", aria-activedescendant, role="listbox"/"option" on results | 2026-03-01 |
| Google Maps click-to-load | MapEmbed component saves ~500KB initial load on /contact | 2026-03-01 |
| Root error boundary | errorComponent on root route with branded error page + refresh/home buttons | 2026-03-01 |
| Print stylesheet | @media print hides nav/footer, avoids breaks, shows link URLs | 2026-03-01 |
| Privacy policy rewrite | Removed WordPress boilerplate, now describes actual architecture (KV, Cloudflare, click-to-load) | 2026-03-01 |
| Department count fix | Corrected 27→25 in hero stats + AboutSection to match actual data | 2026-03-01 |
| PII sanitization | Contact form fallback log now only outputs submission ID, not full PII | 2026-03-01 |
| Heritage Content Layer | Add /history, /communities, /about, /visit, /people, /education, /economic-development, /transportation routes using fact-checked master reference doc | 2026-03-01 |
| Brand thesis | "Where Tennessee Began and Begins" — history-first, fact-checked, editorial tone | 2026-03-01 |
| History-first phasing | Phase 1 = history/heritage pages (story of Sullivan County). Communities/civic pages come later. | 2026-03-01 |
| SiteNav audit + disclosure rebuild | Removed dead `megaContainerRef` effect; switched mega-menu from invalid `role="menu"`/`menuitem` to proper disclosure (`aria-expanded` + `aria-controls` + `id`); added click-outside `pointerdown` close; gated hover open behind `matchMedia("(hover: hover) and (pointer: fine)")` so touch is click-only; added active-page indicators (`aria-current` + underline/left-border/parchment fill) to desktop links, Departments trigger, mobile links, and current department; anchored `hasDarkHeader` regex with `(\/|$)`; renamed `expandedCategory` → `mobileDeptsOpen`; `prefers-reduced-motion` now snaps entrance animations to opacity 1 with no delay. 15/15 mega-menu E2E pass. | 2026-05-06 |
| Mobile drawer hoisted out of `<nav>` | Critical bug: drawer was a child of `<nav>`, whose `backdrop-blur-lg` establishes a CSS containing block for fixed descendants. `top: 64px; bottom: 0` therefore resolved against the 64-px-tall nav (height: 0), making the drawer invisible and parking content under the nav so the first button was unclickable. Hoisted drawer + lazy SearchDialog out as fragment siblings so fixed positioning resolves against the viewport. Found via Playwright MCP audit on the deployed site. | 2026-05-06 |
| Duplicate `<main>` removal | Every route component renders its own `<main id="main-content">`; `__root.tsx` was wrapping `<Outlet />` in another one, producing nested `<main>` elements with duplicate IDs. Removed the wrapper; AdminLayout and `admin/login.tsx` now carry the id directly so the skip-link target works on admin routes too. | 2026-05-06 |
| Missing PWA icons generated | `manifest.webmanifest` referenced `android-chrome-192x192.png` + `512x512.png` that didn't exist (404 in prod console). Generated both from `favicon.svg` via `rsvg-convert`. | 2026-05-06 |
| SearchDialog a11y | Added visually-hidden `Dialog.Title` + `Dialog.Description` to satisfy Radix's "DialogContent requires a DialogTitle" requirement; was logging a console error every time the search dialog opened. | 2026-05-06 |
| Hero preload scoped to home route | `<link rel="preload" href="boone-lake-1920.webp">` lived in `__root.tsx` but the image only renders on `/`. Browser warned "preloaded but not used" on every other page. Moved preload into the home route's `head()` only. | 2026-05-06 |
| Speculation rules removed | React `dangerouslySetInnerHTML` rewrites `<script>` elements during hydration; the browser treats this as `innerHTML` insertion and ignores speculation-rules sets, so the script was never prefetching. Removed; reinstate only as static HTML outside React's tree. | 2026-05-06 |

## Heritage Content Layer — COMPLETE (2026-03-01)

All 5 phases built and production-verified:
- **Phase 1:** History Wing — 3 routes, 5 components, 6 data files
- **Phase 2:** Communities Wing — 2 routes, 1 component
- **Phase 3:** Civic & People — 6 routes, 1 component
- **Phase 4:** Integration — Nav, footer, homepage, search index, i18n updated
- **Phase 5:** Build verified, lint fixed, committed

### Key Patterns Established
- Heritage site data uses `getHeritageSiteBySlug()` / `getTrailStops()` helpers
- Timeline uses inline `var(--color-*)` styles (not dynamic Tailwind classes) for JIT compat
- Community cards link to `/communities/$slug` with TanStack Router `params`
- All new routes use `seo()` + `seoLinks()`, `useScrollReveal`, `MountainDivider` pattern
- History narrative sections use `HistoryNarrative` wrapper with eyebrow/title/background props
