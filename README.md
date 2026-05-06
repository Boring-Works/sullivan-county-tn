# Sullivan County, Tennessee — Official Government Website

> Modern citizen services portal replacing the legacy WordPress/Divi site at sullivancountytn.gov.

**Live:** https://sullivan-county-tn.codyboring.workers.dev

## State (May 2026)

- **Tests:** 24 unit + 164 E2E across desktop/tablet/mobile (all passing)
- **A11y:** WCAG AA compliant (7 brand tokens optimized for 4.5:1+ contrast, 13 ARIA violations resolved)
- **Lint:** 0 errors (Biome)
- **Build:** 3.4s, 747KB worker entry
- **Security:** Auth gates, CSRF, rate limiting, timing-safe compare, Zod validation, ULIDs, XSS sanitization

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
| Linting | Biome (2-space indent, 100 char width) |
| Language | TypeScript (strict) |

## What's Live

### Pages (25+ routes)

| Route | Description |
|-------|-------------|
| `/` | Homepage — cinematic hero with parallax, animated stat counters, quick services (8), department categories (6), community highlights (3), latest news |
| `/departments` | 25 departments organized into 6 color-coded categories with filtering |
| `/departments/$slug` | Individual department pages with contacts, staff, services, offices, FAQs, publications, bid thresholds |
| `/commissioners` | 24 county commissioners organized by 11 districts with headshots |
| `/news` | County news feed with article cards |
| `/news/$slug` | Full article pages with content, PDF downloads, source links |
| `/calendar` | 6 recurring meeting schedules with YouTube live stream links |
| `/contact` | Contact hub with Google Maps, quick contacts (4), contact form (9 subjects), community resources (14) |
| `/documents` | 115 documents across 17 categories with search, category pills, collapsible sections, type badges |
| `/ada-compliance` | ADA legal framework, coordinators, 5 downloadable forms |
| `/employee-services` | Skyward/Edison/Mark III portals, 6 benefits docs, Title VI training video |
| `/privacy-policy` | Full privacy policy with cookie table, data retention, user rights |
| `/history` | Heritage landing page with "The Founding Story" narrative |
| `/history/timeline` | 48-event timeline spanning 1761--2025 across 6 eras |
| `/history/$slug` | Heritage site detail (8 sites: Rocky Mount, Netherland Inn, etc.) |
| `/communities` | 6 municipality cards (Kingsport, Bristol, Blountville, etc.) |
| `/communities/$slug` | Community detail pages |
| `/about` | County overview, demographics, Tri-Cities MSA context |
| `/economic-development` | Top employers, sector breakdown, economic assets |
| `/education` | School systems, higher ed, attainment stats |
| `/transportation` | TRI airport, highways, transit + historical context |
| `/people` | 7 notable historical figures |
| `/visit` | Heritage Trail, parks, events, getting here |
| `/forms` | Form index: Building Permit, Code Complaint, Public Records, General Feedback |
| `/forms/$type` | Individual form pages with validation |
| `/admin/login` | Admin authentication (timing-safe, rate-limited, ULID sessions) |
| `/admin/*` | Admin CRUD for news, minutes, announcements, submissions (8 routes) |

### Data

| File | Content |
|------|---------|
| `data/departments.ts` | 25 departments with contacts, services, offices, staff, external links, FAQs |
| `data/commissioners.ts` | 24 commissioners across 11 districts with photos, addresses, emails |
| `data/news.ts` | County news articles with full content + PDF attachments |
| `data/documents.ts` | 115 documents across 17 categories (PDF, DOC, DOCX, TIF) with types, sizes, descriptions |
| `data/quick-services.ts` | 8 quick-access service links for homepage |
| `data/search-index.ts` | Unified search index — 175 searchable items (departments + news + commissioners + documents + pages) |
| `data/heritage-sites.ts` | 8 heritage sites with NRHP/NHL info, coordinates, key facts |
| `data/timeline.ts` | 48 timeline events (1761--2025) across 6 categories |
| `data/communities.ts` | 6 communities with population, landmarks, highlights |
| `data/notable-people.ts` | 7 notable figures with categories, years, achievements |
| `data/employers.ts` | 11 top employers + sector breakdown |
| `data/education.ts` | 6 school systems/institutions with enrollment stats |
| `data/form-definitions.ts` | 4 form types with field definitions and validation |
| `data/meeting-minutes.ts` | Meeting minutes with committee, date, PDF attachments |
| `data/site-config.ts` | Centralized site URL and metadata constants |

### Document Library (115 files, 17 categories)

All documents are served locally — no external WordPress dependency.

| Category | Files | Types |
|----------|-------|-------|
| ADA Documents | 5 | DOCX, PDF, DOC |
| Agendas | 17 | PDF |
| County Commission | 1 | PDF |
| Court Dockets | 3 | PDF |
| Court Forms for Attorneys | 19 | DOC, PDF, TIF |
| Court Forms for Bondsman | 8 | DOC, PDF |
| Court Forms for Public | 5 | DOC, PDF, DOCX |
| Emergency Management | 10 | PDF, DOCX |
| Employee Services | 11 | PDF |
| Finance Documents | 9 | PDF |
| Financial Management | 1 | PDF |
| Planning and Codes | 2 | PDF |
| Property Assessor | 9 | PDF |
| Public Documents | 8 | PDF |
| Purchasing | 3 | DOC, PDF |
| Sanitation | 3 | PDF |
| Veterans | 1 | PDF |

### Features

- **Site search** — Cmd+K / Ctrl+K fuzzy search across 175 items (departments, news, commissioners, documents, pages)
- **Document library** — 115 files across 17 categories with search, category pills, collapsible sections, file type badges (PDF/DOC/DOCX/TIF)
- **Department mega-menu** — 25 departments in 6 categories (Admin, Courts, Public Safety, Finance, Ops, Community)
- **Video embeds** — Privacy-enhanced YouTube (click-to-load, nocookie.com, no tracking until play)
- **Commissioner photos** — Headshots with polished CSS treatment for all 24 commissioners
- **Contact form** — Subject categorization (9 topics), server-side validation, KV storage backend with 90-day TTL
- **Tourism section** — "Discover Sullivan County" with 3 regional highlights (Country Music, Outdoor Rec, BMS)
- **Announcement banner** — Dismissible with localStorage persistence, supports info/urgent types
- **RSS feed** — Static XML at `/rss.xml` with autodiscovery link
- **Heritage content layer** — 8 history pages, 6 communities, 48-event timeline, 7 notable people, civic pages
- **Form submissions** — Building Permit, Code Complaint, Public Records, General Feedback with D1 backend
- **Admin dashboard** — News CRUD, meeting minutes CRUD, form submission review, announcement management
- **Meeting minutes** — County commission meeting minutes with committee filtering, year grouping, PDF downloads
- **i18n support** — English/Spanish toggle with cookie persistence
- **Language toggle** — EN/ES in nav with i18next translation framework
- **Zod validation** — All server functions use shared Zod schemas in src/lib/schemas/
- **ULID-based IDs** — All entity IDs use ulidx (time-sortable, unique) instead of randomUUID
- **CSRF protection** — Double-submit cookie pattern on all mutation endpoints
- **Rate limiting** — IP-based on login (5/60s), contact (3/60s), forms (3/60s), admin mutations (30/60s)
- **Content sanitization** — sanitize-html on all stored user content (XSS prevention)
- **Timing-safe auth** — crypto.subtle.timingSafeEqual() with SHA-256 password comparison
- **Health check** — /api/health endpoint for uptime monitoring
- **Google Maps** — Click-to-load map on contact page (~500KB deferred until interaction)
- **Scroll animations** — Intersection Observer reveal system throughout
- **Mountain dividers** — Custom SVG section separators matching Appalachian theme
- **Glass-morphism nav** — Transparent-to-solid on scroll, adapts to dark/light page headers
- **Animated stat counters** — Homepage hero with residents, sq miles, departments, year established
- **Custom 404 page** — Branded not-found with quick links to Home, Departments, Documents, Commissioners + search hint
- **Sitemap** — Static XML at `/sitemap.xml` with 40 URLs for Google Search Console
- **robots.txt** — Crawler directives with sitemap reference
- **Cloudflare Web Analytics** — Free, privacy-friendly, no cookies (beacon ready, needs token)
- **Security headers** — CSP, X-Frame-Options, HSTS, Referrer-Policy, Permissions-Policy via `_headers`
- **Cache optimization** — Immutable 1yr for hashed assets, 1day for documents, 1wk for images
- **Skip-to-content** — Visually-hidden link for keyboard/screen reader users (WCAG 2.4.1)
- **Reduced motion** — Respects `prefers-reduced-motion` OS setting, disables all animations
- **Honeypot spam protection** — Hidden field rejects bots, proper email regex, field length limits
- **Canonical URLs** — `<link rel="canonical">` on all pages via `seoLinks()` helper
- **JSON-LD structured data** — `GovernmentOrganization` schema on homepage
- **Article meta** — News articles use `og:type: article` with `article:published_time`
- **Font preconnect** — `preconnect` hints for Google Fonts (eliminates DNS/connection latency)
- **Code splitting** — SearchDialog + Fuse.js lazy-loaded via React.lazy + Suspense (bundle 502KB→415KB, 17% reduction)
- **WebP hero images** — `<picture>` element with WebP sources before JPEG fallbacks (60%+ file size savings)
- **Mega-menu keyboard nav** — Arrow key cycling, Escape to close, roving tabindex for full keyboard accessibility
- **Mobile focus trap** — Tab wrapping + Escape to close in mobile navigation drawer
- **Search ARIA combobox** — Full ARIA combobox pattern with `aria-activedescendant`, `role="listbox"`, `role="option"`
- **Root error boundary** — Branded error page with refresh/home buttons via TanStack Router `errorComponent`
- **Print stylesheet** — Hides nav/footer, avoids page breaks, displays link URLs for printable pages

## Comparison: New Site vs Old WordPress Site

### What's Better

| Area | Old Site | New Site |
|------|----------|----------|
| **Performance** | 3-5s page loads (WordPress overhead) | ~0.5s (Cloudflare edge) |
| **Design** | Generic Divi theme | Custom Appalachian Editorial system |
| **Navigation** | Flat 26-item dropdown | Categorized mega-menu + mobile drawer |
| **Departments** | Inconsistent WordPress pages | Structured data: staff, offices, services, FAQs, docs |
| **Commissioners** | Basic name list | District-grouped grid with headshots |
| **Documents** | WordPress DLP plugin (118 files via AJAX) | 115 local files with search, category pills, type badges |
| **Contact** | No dedicated page (footer only) | Full hub with maps, quick contacts, 14 resources |
| **Search** | WordPress default search | Fuzzy search modal (Cmd+K), 175 indexed items |
| **News** | Blog posts with pagination | Article cards + detail pages + PDF downloads |
| **SEO** | Basic WordPress SEO | Full OG + Twitter Cards + structured meta |
| **Mobile** | Divi breakpoints | Purpose-built responsive design |
| **Accessibility** | Generic WordPress output | Semantic HTML, ARIA labels, focus states |
| **Videos** | Standard YouTube embeds | Privacy-enhanced click-to-load (no tracking until play) |

### What's at Parity

- All 5 news articles (same content)
- All 25 departments (same data + enhanced)
- All 24 commissioners (same people + photos)
- All 115 documents served locally (was 118 on WordPress — 3 removed: 2 duplicate versions, 1 video exceeding Cloudflare 25MB limit)
- ADA compliance content + 5 forms
- Employee portals (Skyward, Edison, Mark III)
- Privacy policy content
- All external resource links (Trustee, Schools, Library, Sheriff, Animal Shelter, etc.)

### What the Old Site Has That This Doesn't

| Feature | Notes |
|---------|-------|
| **CMS editing** | Old site has WordPress admin. This site is code-based (developer-managed). Intentional tradeoff for performance + design control. |

### What This Site Has That the Old Site Doesn't

- Cmd+K site search (175 indexed items)
- Categorized department organization (6 categories with color-coding)
- Commissioner headshot photos
- News article detail pages with full content
- Calendar & meetings page with 6 recurring schedules
- Privacy-enhanced video embeds
- Contact form with subject categorization (9 topics) + server-side KV storage
- Tourism / community highlights section (3 regional attractions)
- Dismissible announcement banner system
- RSS feed with autodiscovery
- Sitemap.xml (40 URLs) + robots.txt for SEO
- Custom branded 404 page with quick links + search hint
- Google Maps embed with brand-consistent styling
- SVG mountain ridge section dividers
- Scroll reveal animation system
- Animated stat counters on homepage
- About section ("Where Tennessee Began")
- Full document library with category browsing, search, and collapsible sections
- Cloudflare Web Analytics (free, privacy-friendly, no cookies)

## Project Structure

```
src/
  components/
    home/          — HeroBanner, QuickServices, DepartmentCategories, NewsSection,
                     CommunityHighlights, AboutSection
    layout/        — SiteNav, SiteFooter, AnnouncementBanner, SearchDialog, NotFound
    departments/   — DepartmentCard, DepartmentDetail
    commissioners/ — CommissionerGrid, CommissionerCard
    news/          — NewsDetail
    shared/        — NewsCard, VideoEmbed, ContactCard, MountainDivider,
                     MountainDividerInverted
    ui/            — shadcn/ui primitives (badge, button, card)
  data/
    departments.ts    — 25 departments with contacts, services, offices, staff
    commissioners.ts  — 24 commissioners across 11 districts
    news.ts           — 5 news articles with full content + PDF attachments
    documents.ts      — 115 documents across 17 categories with types and sizes
    quick-services.ts — 8 quick-access service links
    search-index.ts   — Unified search index (175 items)
  hooks/
    useScrollReveal.ts — Intersection Observer scroll-reveal system
    useCountUp.ts      — Animated counter with ease-out easing
  server/
    auth.ts             — Admin auth (login/validate/logout) with ULID sessions
    admin-news.ts       — News CRUD (auth-gated, sanitized)
    admin-minutes.ts    — Minutes CRUD (auth-gated, sanitized)
    admin-announcements.ts — Announcement CRUD (auth-gated)
    admin-submissions.ts — Submission management (auth-gated)
    contact.ts          — Contact form (Zod validated, KV storage)
    forms.ts            — Form submissions (Zod validated, D1 storage)
    guard.ts            — Shared auth guard for admin endpoints
    csrf.ts             — CSRF double-submit cookie protection
    rate-limit.ts       — In-memory rate limiting
  routes/              — File-based routing (TanStack Router, 25+ pages + 1 layout)
  styles/
    app.css            — Tailwind v4 config + brand tokens + animations + utilities
  utils/
    seo.ts             — OG/Twitter Card meta helper

public/
  documents/     — 115 files in 17 subdirectories (PDF, DOC, DOCX, TIF)
    ada/                    — 5 files
    agendas/                — 17 files
    county-commission/      — 1 file
    court-dockets/          — 3 files
    court-forms-attorneys/  — 19 files
    court-forms-bondsman/   — 8 files
    court-forms-public/     — 5 files
    emergency-management/   — 10 files
    employee-services/      — 11 files
    finance/                — 9 files
    financial-management/   — 1 file
    planning-codes/         — 2 files
    property-assessor/      — 9 files
    public-documents/       — 8 files
    purchasing/             — 3 files
    sanitation/             — 3 files
    veterans/               — 1 file
  images/
    commissioners/ — 23 commissioner headshots (JPG/PNG)
    officials/     — Mayor headshot
    hero/          — 6 responsive hero images (640/1024/1920px, WebP + JPEG)
    about/         — 2 courthouse photos
    og/            — 2 OG meta images
  rss.xml        — Static RSS feed (5 items)
  sitemap.xml    — Static sitemap (40 URLs)
  robots.txt     — Crawler directives + sitemap reference
  favicon.svg    — Navy square with brass "SC" monogram
  favicon.ico    — 32x32 ICO for legacy browsers
  apple-touch-icon.png

scripts/
  generate-rss.ts     — RSS feed generator
  generate-sitemap.ts — Sitemap generator (40 URLs)
```

## Commands

```bash
npm run dev       # Start dev server (local Cloudflare Workers runtime)
npm run build     # Production build
npm run deploy    # Build + deploy to Cloudflare Workers
npm run lint      # Biome linter
npm run format    # Biome formatter
npm run test      # Vitest

npx tsx scripts/generate-rss.ts  # Regenerate RSS after adding news

npm run cf-typegen       # Regenerate Cloudflare types
npx playwright test      # E2E tests (all viewports)
npx playwright test --ui # E2E interactive mode
npm run generate:sitemap # Regenerate sitemap
npm run generate:rss     # Regenerate RSS feed
```

## Adding Content

**New news article:** Add to `src/data/news.ts`, then run `npx tsx scripts/generate-rss.ts` to update RSS.

**New department:** Add to `src/data/departments.ts` with slug, category, contacts, services, offices, staff.

**New commissioner:** Add to `src/data/commissioners.ts` with name, district, phone, email. Add headshot to `public/images/commissioners/`.

**New document:** Place file in `public/documents/{category}/` (slugified filename), add entry to `src/data/documents.ts` with name, description, href, type, size, category.

**Announcement banner:** Edit `src/components/layout/AnnouncementBanner.tsx` — update the `announcements` array.

**Admin operations:** Login at /admin/login (password: set via `wrangler secret put ADMIN_PASSWORD`).

## Design System: Appalachian Editorial

A custom design language built for Sullivan County's identity — the second-oldest county in Tennessee, established 1779.

**Palette:**
- Navy (#0c1e33) — authority, headers, nav
- Copper (#a44d2a) — CTAs, accents, warmth (darkened for WCAG AA)
- Brass (#806840) — heritage ornaments on light backgrounds
- Brass Light (#c9a84c) — brass variant for dark/hero backgrounds
- Sage (#3d6b56) — nature, success states
- Stone (#756858) — secondary text, labels (darkened for WCAG AA)
- Cream (#faf8f5) — page backgrounds
- Parchment (#f3efe9) — alternating sections
- Warm Gray (#6a6560) — placeholder text, metadata
- Community (#356868) — community category accent

**Department category accents:** Courts (#6b4c8a), Public Safety (#a63d3d), Community (#3d7a7a)

**Typography:** Libre Caslon Text (display/headlines) + Outfit (body/UI)

**Motifs:** Mountain ridge dividers, topo-map texture overlays, heritage ornamental rules, scroll-reveal animations, glass-morphism navigation

## Deployment

- **Platform:** Cloudflare Workers
- **Worker name:** sullivan-county-tn
- **Preview env:** sullivan-county-tn-preview
- **Compatibility:** 2026-05-06, nodejs_compat flag
- **Observability:** Enabled
- **Deploy:** `npm run deploy` (builds + deploys via Wrangler)
- **D1 Database:** sullivan-county-db (form submissions, news, minutes, sessions)
- **KV Namespace:** CONTACT_SUBMISSIONS (contact form storage, 90-day TTL)
