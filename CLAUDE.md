# Sullivan County TN Government Website

Citizen services portal for Sullivan County, Tennessee.
Brand: **"Where Tennessee Began and Begins"**

## Current Status
- **Government portal:** Live and complete (23 routes, 25 departments, 115 documents)
- **Heritage Content Layer:** COMPLETE — All 5 phases built (11 new routes, 6 data files, 7 components)
- **Implementation plan:** `docs/plans/2026-03-01-heritage-content-layer-implementation.md`
- **Design doc:** `docs/plans/2026-03-01-heritage-content-layer-design.md`

## Content Source of Truth
ALL historical content comes from the triple-fact-checked master reference document:
`/Users/codyboring/CodyML/projects/Sullivan County/compass_artifact_wf-e7361f8f-d40b-4bcd-8d42-4ba9245a7028_text_markdown.md`

### Historical Rules (Non-Negotiable)
1. Rocky Mount building dates to 1820s. SITE settled ~1770. Building ≠ site.
2. First SOUTHWEST TERRITORY capital (1790-92). NOT "first US territorial capital." NOT "first TN state capital."
3. Barsheba was William Cobb's wife. Mary was his sister.
4. Lafayette did NOT visit Old Deery Inn (unverifiable local tradition).
5. Kingsport charter: PETITION signed at Netherland Inn; CHARTER passed by TN General Assembly Aug 21, 1822.
6. Education data: ~91% HS / ~27% BA (NOT the wrong 87.5%/16.7% from old brand plan).
7. Nick Grindstaff monument is in Johnson County, NOT Sullivan County.
8. AT exits Tennessee into Virginia (NOT "enters Tennessee from Virginia").

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

## Static Assets
| Directory | Content |
|-----------|---------|
| `public/documents/` | 115 documents in 17 subdirectories (PDF, DOC, DOCX, TIF) |
| `public/images/commissioners/` | Commissioner headshots (23 images) |
| `public/images/officials/` | Mayor headshot |
| `public/rss.xml` | Static RSS feed (generated via `scripts/generate-rss.ts`) |
| `public/sitemap.xml` | Static sitemap (generated via `scripts/generate-sitemap.ts`, 40 URLs) |
| `public/robots.txt` | Crawler directives + sitemap reference |
| `public/_headers` | Security headers (CSP, HSTS, X-Frame-Options) + cache control |

## Server Functions
| Function | File | Purpose |
|----------|------|---------|
| `submitContactForm` | `server/contact.ts` | Validates + stores contact form submissions in KV (90-day TTL) |

## Cloudflare Bindings
| Binding | Type | Purpose |
|---------|------|---------|
| `CONTACT_SUBMISSIONS` | KV Namespace | Stores contact form submissions (ID: `e512ab18f079489fab252adba81cf501`) |

## Brand Tokens (Appalachian Civic Heritage)
- `brand-navy` (#0c1e33) — primary, headers, nav, hero
- `brand-copper` (#b5542e) — CTAs, accents, hover states
- `brand-brass` (#a08050) — decorative elements, "County" text
- `brand-sage` (#3d6b56) — finance category, success
- `brand-stone` (#8b8070) — secondary text, labels
- `brand-cream` (#faf8f5) — page background
- `brand-parchment` (#f3efe9) — alternating section backgrounds
- `brand-slate` (#2d3038) — body text
- `brand-courts` (#6b4c8a) — courts category accent
- `brand-safety` (#a63d3d) — public safety category accent
- `brand-community` (#3d7a7a) — community category accent
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
