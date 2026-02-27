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

## Routes
| Route | File | Purpose |
|-------|------|---------|
| `/` | `routes/index.tsx` | Homepage dashboard (hero, quick services, dept categories, news) |
| `/departments` | `routes/departments/index.tsx` | Department directory with category filter |
| `/departments/$slug` | `routes/departments/$slug.tsx` | Individual department detail (27 departments) |
| `/commissioners` | `routes/commissioners.tsx` | Commissioner grid by district (11 districts) |
| `/news` | `routes/news.tsx` | County news feed |
| `/contact` | `routes/contact.tsx` | General county contact info |
| `/documents` | `routes/documents.tsx` | Document library categories (links to existing system) |
| `/ada-compliance` | `routes/ada-compliance.tsx` | ADA compliance info, legal framework, coordinators |
| `/privacy-policy` | `routes/privacy-policy.tsx` | Privacy policy, cookies, data retention, user rights |
| `/employee-services` | `routes/employee-services.tsx` | Employee portals (Skyward, Edison, Mark III), benefits |

## Data Files
| File | Content |
|------|---------|
| `data/departments.ts` | 27 departments with contacts, services, offices, staff, external links |
| `data/commissioners.ts` | 24 commissioners across 11 districts |
| `data/news.ts` | County news articles |
| `data/quick-services.ts` | 8 quick-access service links for homepage |

## Key Components
| Component | Location | Purpose |
|-----------|----------|---------|
| SiteNav | `components/layout/SiteNav.tsx` | Glass-morphism nav with department mega-menu |
| SiteFooter | `components/layout/SiteFooter.tsx` | Footer with mountain silhouette + heritage ornament |
| HeroBanner | `components/home/HeroBanner.tsx` | Cinematic hero with photo parallax + stat counters |
| QuickServices | `components/home/QuickServices.tsx` | 8-card service grid with scroll reveals |
| DepartmentCategories | `components/home/DepartmentCategories.tsx` | 6 category cards with scroll reveals |
| NewsSection | `components/home/NewsSection.tsx` | Editorial news layout with featured first item |
| DepartmentDetail | `components/departments/DepartmentDetail.tsx` | Department page with category-tinted banner |
| ContactCard | `components/shared/ContactCard.tsx` | Reusable contact info card |
| CommissionerGrid | `components/commissioners/CommissionerGrid.tsx` | District grid with alternating backgrounds |
| MountainDivider | `components/shared/MountainDivider.tsx` | SVG mountain ridge section dividers |
| useScrollReveal | `hooks/useScrollReveal.ts` | Intersection Observer scroll-reveal system |
| useCountUp | `hooks/useCountUp.ts` | Animated stat counter hook |

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
