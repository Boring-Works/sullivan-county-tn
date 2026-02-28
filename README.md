# Sullivan County, Tennessee — Official Government Website

> Modern citizen services portal replacing the legacy WordPress/Divi site at sullivancountytn.gov.

**Live:** https://sullivan-county-tn.codyboring.workers.dev

---

## What This Is

A ground-up rebuild of the Sullivan County TN government website. The old WordPress site (sullivancountytn.gov) is functional but dated — slow page loads, inconsistent department pages, no structured data, generic Divi styling. This rebuild delivers a modern, fast, accessible experience with a custom "Appalachian Editorial" design system built specifically for Sullivan County.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | TanStack Start (full-stack React) |
| Routing | TanStack Router (file-based) |
| Hosting | Cloudflare Workers (edge-deployed, ~0.5s loads) |
| CSS | Tailwind CSS v4 + custom design tokens |
| Components | shadcn/ui + Radix primitives |
| Search | Fuse.js (~5KB, client-side fuzzy) |
| Fonts | Libre Caslon Text (serif) + Outfit (sans) |
| Linting | Biome |
| Language | TypeScript (strict) |

## What's Live

### Pages (12 routes)

| Route | Description |
|-------|-------------|
| `/` | Homepage — cinematic hero, quick services, department categories, latest news |
| `/departments` | 27 departments organized into 6 color-coded categories |
| `/departments/$slug` | Individual department pages with contacts, staff, services, offices, FAQs |
| `/commissioners` | 24 county commissioners + Mayor, organized by 11 districts with headshots |
| `/news` | County news feed with article cards |
| `/news/$slug` | Full article pages with content, PDF downloads, source links |
| `/calendar` | 6 recurring meeting schedules with YouTube live stream links |
| `/contact` | Contact hub with Google Maps, quick contacts (4), community resources (14) |
| `/documents` | Searchable document center with 10 local files, video embeds, external categories |
| `/ada-compliance` | ADA legal framework, coordinators, 4 downloadable forms |
| `/employee-services` | Skyward/Edison/Mark III portals, benefits docs, Title VI training video |
| `/privacy-policy` | Full privacy policy with cookie table, data retention, user rights |

### Features

- **Site search** — Cmd+K / Ctrl+K fuzzy search across departments, news, commissioners, documents, pages
- **Department mega-menu** — 27 departments in 6 categories (Admin, Courts, Public Safety, Finance, Ops, Community)
- **Document downloads** — 10 PDFs/DOCXs served locally (ADA forms, employment app, benefits docs)
- **Video embeds** — Privacy-enhanced YouTube (click-to-load, nocookie.com)
- **Commissioner photos** — Headshots with polished CSS treatment for all 24 commissioners + Mayor
- **Announcement banner** — Dismissible with localStorage persistence, supports info/urgent types
- **RSS feed** — Static XML at `/rss.xml` with autodiscovery link
- **Google Maps** — Grayscale-to-color hover map on contact page
- **Scroll animations** — Intersection Observer reveal system throughout
- **Mountain dividers** — Custom SVG section separators matching Appalachian theme
- **Glass-morphism nav** — Transparent-to-solid on scroll, adapts to dark/light page headers

## Comparison: New Site vs Old WordPress Site

### What's Better

| Area | Old Site | New Site |
|------|----------|----------|
| **Performance** | 3-5s page loads (WordPress overhead) | ~0.5s (Cloudflare edge) |
| **Design** | Generic Divi theme | Custom Appalachian Editorial system |
| **Navigation** | Flat 26-item dropdown | Categorized mega-menu + mobile drawer |
| **Departments** | Inconsistent WordPress pages | Structured data: staff, offices, services, FAQs, docs |
| **Commissioners** | Basic name list | District-grouped grid with headshots |
| **Documents** | WordPress DLP plugin (AJAX-loaded) | Searchable center with local files + type badges |
| **Contact** | No dedicated page (footer only) | Full hub with maps, quick contacts, 14 resources |
| **Search** | WordPress default search | Fuzzy search modal (Cmd+K) |
| **News** | Blog posts with pagination | Article cards + detail pages + PDF downloads |
| **SEO** | Basic WordPress SEO | Full OG + Twitter Cards + structured meta |
| **Mobile** | Divi breakpoints | Purpose-built responsive design |
| **Accessibility** | Generic WordPress output | Semantic HTML, ARIA labels, focus states |
| **Videos** | Standard YouTube embeds | Privacy-enhanced click-to-load (no tracking until play) |

### What's at Parity

- All 5 news articles (same content)
- All 27 departments (same data + enhanced)
- All 24 commissioners (same people + photos)
- ADA compliance content + 4 forms
- Employee portals (Skyward, Edison, Mark III)
- Privacy policy content
- 15 document categories (external link to WP library for categories not yet local)
- All external resource links (Trustee, Schools, Library, Sheriff, Animal Shelter, etc.)

### What the Old Site Has That This Doesn't (Yet)

| Feature | Priority | Notes |
|---------|----------|-------|
| **Contact form** | Medium | Old site uses Contact Form 7 + reCAPTCHA. Could add with Cloudflare Turnstile. |
| **Tourism content** | Low | Birthplace of Country Music, Bristol Motor Speedway, outdoor recreation promo cards. Arguably not core government content. |
| **CMS editing** | N/A | Old site has WordPress admin. This site is code-based (developer-managed). Intentional tradeoff for performance + design control. |
| **Interactive calendar** | Low | Old site has The Events Calendar plugin (currently showing 0 events). New site has structured meeting schedules + YouTube links instead. |
| **Commission meeting agenda PDFs** | Low | Dynamic current-packet links on old site. New site links to YouTube channel + documents page. |

### What This Site Has That the Old Site Doesn't

- Cmd+K site search
- Categorized department organization (6 categories with color-coding)
- Commissioner headshot photos
- News article detail pages with full content
- Calendar & meetings page with 6 recurring schedules
- Privacy-enhanced video embeds
- Dismissible announcement banner system
- RSS feed with autodiscovery
- Google Maps embed with brand-consistent styling
- SVG mountain ridge section dividers
- Scroll reveal animation system
- Animated stat counters on homepage
- About section ("Where Tennessee Began")
- File type badges on document downloads (PDF/DOCX/DOC)

## Project Structure

```
src/
  components/
    home/          — Homepage sections (hero, services, categories, news, about)
    layout/        — SiteNav, SiteFooter, AnnouncementBanner, SearchDialog
    departments/   — DepartmentDetail
    commissioners/ — CommissionerGrid
    news/          — NewsDetail
    shared/        — NewsCard, VideoEmbed, ContactCard, MountainDivider
    ui/            — shadcn/ui primitives (badge, button, dialog, etc.)
  data/
    departments.ts    — 27 departments with contacts, services, offices, staff
    commissioners.ts  — 24 commissioners across 11 districts
    news.ts           — 5 news articles with full content + PDF attachments
    quick-services.ts — 8 quick-access service links
    search-index.ts   — Unified search index
  hooks/
    useScrollReveal.ts — Intersection Observer scroll-reveal
    useCountUp.ts      — Animated counter
  routes/              — File-based routing (TanStack Router)
  styles/
    app.css            — Tailwind v4 config + custom design tokens
  utils/
    seo.ts             — OG/Twitter Card meta helper

public/
  documents/     — 10 downloadable PDFs/DOCXs
  images/        — Hero photos, OG images, commissioner headshots
  rss.xml        — Static RSS feed

scripts/
  generate-rss.ts — RSS feed generator (run: npx tsx scripts/generate-rss.ts)
```

## Commands

```bash
npm run dev       # Start dev server (local Cloudflare Workers runtime)
npm run build     # Production build
npm run deploy    # Build + deploy to Cloudflare Workers
npm run lint      # Biome linter
npm run format    # Biome formatter

npx tsx scripts/generate-rss.ts  # Regenerate RSS after adding news
```

## Adding Content

**New news article:** Add to `src/data/news.ts`, then run `npx tsx scripts/generate-rss.ts` to update RSS.

**New department:** Add to `src/data/departments.ts` with slug, category, contacts, services, offices, staff.

**New commissioner:** Add to `src/data/commissioners.ts` with name, district, phone, email. Add headshot to `public/images/commissioners/`.

**New document:** Place file in `public/documents/`, add to the relevant page (ada-compliance, employee-services, or documents route).

**Announcement banner:** Edit `src/components/layout/AnnouncementBanner.tsx` — update the `announcements` array.

## Design System: Appalachian Editorial

A custom design language built for Sullivan County's identity — the second-oldest county in Tennessee, established 1779.

**Palette:**
- Navy (#0c1e33) — authority, headers, nav
- Copper (#b5542e) — CTAs, accents, warmth
- Brass (#a08050) — heritage ornaments
- Sage (#3d6b56) — nature, success states
- Stone (#8b8070) — secondary text
- Cream (#faf8f5) — page backgrounds
- Parchment (#f3efe9) — alternating sections

**Typography:** Libre Caslon Text (display/headlines) + Outfit (body/UI)

**Motifs:** Mountain ridge dividers, topo-map texture overlays, heritage ornamental rules, scroll-reveal animations, glass-morphism navigation
