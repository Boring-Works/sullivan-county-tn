# Sullivan County TN Government Website

Citizen services portal for Sullivan County, Tennessee.

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
| `/ada-compliance` | `routes/ada-compliance.tsx` | ADA compliance info + 4 downloadable forms |
| `/privacy-policy` | `routes/privacy-policy.tsx` | Privacy policy, cookies, data retention, user rights |
| `/employee-services` | `routes/employee-services.tsx` | Employee portals (Skyward, Edison, Mark III), benefits, training videos |

## Data Files
| File | Content |
|------|---------|
| `data/departments.ts` | 25 departments with contacts, services, offices, staff, external links |
| `data/commissioners.ts` | 23 commissioners across 11 districts |
| `data/news.ts` | County news articles with full content + PDF attachments |
| `data/quick-services.ts` | 8 quick-access service links for homepage |
| `data/documents.ts` | 115 documents across 17 categories (PDF, DOC, DOCX, MP4, TIF) with types and helpers |
| `data/search-index.ts` | Unified search index (departments, news, commissioners, documents, pages) |

## Key Components
| Component | Location | Purpose |
|-----------|----------|---------|
| SiteNav | `components/layout/SiteNav.tsx` | Glass-morphism nav with mega-menu + Cmd+K search |
| SiteFooter | `components/layout/SiteFooter.tsx` | Footer with mountain silhouette + heritage ornament |
| AnnouncementBanner | `components/layout/AnnouncementBanner.tsx` | Dismissible banner (localStorage persistence) |
| SearchDialog | `components/layout/SearchDialog.tsx` | Fuse.js fuzzy search modal (Cmd+K) |
| NotFound | `components/layout/NotFound.tsx` | Custom 404 page with quick links + search hint |
| HeroBanner | `components/home/HeroBanner.tsx` | Cinematic hero with photo parallax + stat counters |
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
| MountainDivider | `components/shared/MountainDivider.tsx` | SVG mountain ridge section dividers |
| useScrollReveal | `hooks/useScrollReveal.ts` | Intersection Observer scroll-reveal system |
| useCountUp | `hooks/useCountUp.ts` | Animated stat counter hook |

## Static Assets
| Directory | Content |
|-----------|---------|
| `public/documents/` | 115 documents in 17 subdirectories (PDF, DOC, DOCX, MP4, TIF) |
| `public/images/commissioners/` | Commissioner + Mayor headshots |
| `public/rss.xml` | Static RSS feed (generated via `scripts/generate-rss.ts`) |
| `public/sitemap.xml` | Static sitemap (generated via `scripts/generate-sitemap.ts`, 40 URLs) |
| `public/robots.txt` | Crawler directives + sitemap reference |

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
| Documents served locally | 115 files (PDF, DOC, DOCX, MP4, TIF) in 17 category subdirectories under public/documents/ | 2026-02-28 |
| Contact form backend via KV | Server function stores submissions in CF KV (90-day TTL), no external email service | 2026-03-01 |
| Custom 404 page | Branded not-found with quick links + search hint, uses notFoundComponent | 2026-03-01 |
| Sitemap + robots.txt | Static generation scripts, 40 URLs, Google Search Console ready | 2026-03-01 |
| CF Web Analytics beacon | Free, privacy-friendly, no cookies — token from CF dashboard required | 2026-03-01 |
