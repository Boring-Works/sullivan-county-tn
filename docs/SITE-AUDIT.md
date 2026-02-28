# Sullivan County TN — Site Audit & Comparison

**Date:** February 28, 2026 (final update)
**Current site:** https://sullivancountytn.gov (WordPress/Divi)
**New site:** https://sullivan-county-tn.codyboring.workers.dev (TanStack Start/Cloudflare Workers)

---

## Executive Summary

The current Sullivan County website runs on WordPress with the Divi theme builder. It is functional but dated in design, slow to load, and lacks modern SEO/social sharing capabilities. The new site is a static-first edge-deployed application with a custom "Appalachian Editorial" design system, full OG/Twitter Card support, and sub-second load times.

All gaps from the initial audit have been closed: site search, news detail pages, downloadable documents, calendar, RSS feed, announcement banner, Google Maps, contact form, and tourism content are all live. The only remaining items are Cloudflare Analytics (requires dashboard beacon token) and a Lighthouse accessibility audit.

---

## Technology Comparison

| Aspect | Current Site | New Site |
|--------|-------------|----------|
| **CMS/Framework** | WordPress 6.x + Divi Theme | TanStack Start + React |
| **Hosting** | Traditional web hosting | Cloudflare Workers (edge) |
| **CSS** | Divi builder inline styles | Tailwind CSS v4 + design tokens |
| **Typography** | Default Divi fonts | Libre Caslon Text + Outfit |
| **JavaScript** | jQuery + Divi scripts | React 19, minimal JS |
| **Page load** | ~3-5s (WordPress overhead) | ~0.5-1s (edge-rendered) |
| **Mobile** | Responsive (Divi breakpoints) | Responsive (Tailwind) |
| **SEO/OG tags** | Basic WordPress SEO | Full OG + Twitter Cards + favicons |
| **SSL** | Yes | Yes (Cloudflare) |
| **Calendar** | The Events Calendar plugin (0 events) | Recurring meeting schedules + YouTube links |
| **Forms** | Contact Form 7 / reCAPTCHA | Contact form with subject dropdown (9 topics) |
| **Search** | WordPress default search | Fuse.js fuzzy search (Cmd+K) |
| **CMS editing** | WordPress admin (browser) | Code-based (developer) |
| **RSS** | WordPress default | Static XML + autodiscovery |
| **Video** | Standard YouTube iframes | Privacy-enhanced click-to-load (nocookie) |
| **Documents** | WordPress DLP plugin (AJAX) | Local files + searchable center |

---

## Navigation Comparison

### Current Site Nav
- Home
- Menu (department dropdown — 26 departments)
- County News
- Calendar
- Pay Property Taxes (external)
- Employee Services

### New Site Nav
- Home (logo link)
- Departments (mega-menu dropdown — 27 departments, categorized)
- Commissioners
- News
- Calendar
- Documents
- Contact
- Search (Cmd+K)
- Pay Taxes (external CTA)

### Assessment
| Item | Status |
|------|--------|
| Department mega-menu | **Improved** — categorized into 6 groups vs flat list |
| Commissioners link | **Added** — not in current nav |
| Contact page link | **Added** — not in current nav |
| Documents link | **Added** — not in current nav |
| Calendar | **Done** — recurring schedules + YouTube live |
| Search | **Done** — Fuse.js fuzzy search, Cmd+K trigger |

---

## Department Coverage

### Current Site Departments (26)
1. Archives and Tourism
2. Chancery Court
3. Circuit Court
4. Commissioner Information
5. County Attorney
6. County Clerk
7. County Mayor
8. County M.E/Coroner-MDI
9. District Attorney
10. Election Office
11. Emergency Management
12. Emergency Medical Services
13. Finance Department
14. Financial Management System of 2020
15. Highway Department
16. Maintenance Department
17. Planning and Codes
18. Property Assessor
19. Public Defender
20. Purchasing
21. Register of Deeds
22. Risk Management
23. Sheriff
24. Soil & Water Conservation
25. Solid Waste
26. Veteran's Office

*Note: Sullivan County Trustee is external (sullivantntrustee.gov), not a department page.*

### New Site Departments (27)
All 26 from current site, **plus:**
- County Commissioners (separated from "Commissioner Information" into its own route at `/commissioners`)

### Department Page Comparison

| Feature | Current (WordPress) | New Site |
|---------|-------------------|----------|
| **Contact info** | Address, phone, fax, email | Address, phone, fax, email |
| **Staff listing** | Some pages, inconsistent | Structured staff data with titles |
| **Office hours** | Some pages | Standardized across all departments |
| **Multiple offices** | Some pages | Structured office locations |
| **Services list** | Paragraph text, inconsistent | Structured service lists |
| **External links** | Embedded in content | Dedicated external links section |
| **Key documents** | Some pages | Structured document links |
| **Meeting schedules** | Some pages | Structured meeting data |
| **FAQ** | Rarely | FAQ section available per department |
| **Category tagging** | None | 6 categories (Admin, Courts, Safety, Finance, Ops, Community) |
| **Category color** | None | Color-coded banners per category |
| **Design** | Generic WordPress template | Custom navy banner with category tint |

---

## Page-by-Page Content Parity

### Homepage

| Content | Current | New | Status |
|---------|---------|-----|--------|
| Hero banner | Static image/slider | Cinematic photo parallax + stat counters | **Improved** |
| Department links | Dropdown menu only | Category cards + mega-menu | **Improved** |
| Quick services | Grid of 6 resource links | 8-card animated grid | **Improved** |
| County news | 5 recent articles | 5 recent articles (with detail pages) | **Improved** |
| Calendar widget | Events Calendar sidebar (0 events) | Calendar in nav, meeting schedules on /calendar | **Replaced** |
| Property tax notice | Featured banner | Dismissible announcement banner | **Done** |
| About section | None | "Where Tennessee Began" section | **Added** |
| Mountain dividers | None | SVG mountain ridge separators | **Added** |
| Scroll animations | None | Intersection Observer reveals | **Added** |
| Birthplace of Country Music | Featured section | CommunityHighlights card | **Done** |
| Bristol Motor Speedway | Featured section | CommunityHighlights card | **Done** |
| Outdoor recreation | Featured section | CommunityHighlights card | **Done** |

### County News (`/news` vs `/county-news/`)

| Content | Current | New | Status |
|---------|---------|-----|--------|
| Article list | Paginated blog posts | All articles in feed | **Parity** |
| Article count | 5 visible + pagination | 5 articles | **Parity** |
| Article detail pages | Full WordPress posts | `/news/$slug` with full content | **Done** |
| PDF attachments | Download links on some articles | Download badges on cards + detail pages | **Done** |
| Categories/tags | WordPress categories | None (all tagged as "news") | **Acceptable** |
| Search/filter | WordPress search | Cmd+K global search covers news | **Done** |
| RSS feed | WordPress default | Static XML + autodiscovery | **Done** |

### Commissioners (`/commissioners` vs `/county-commissioner-information/`)

| Content | Current | New | Status |
|---------|---------|-----|--------|
| Commissioner list | Single page list | Grid by district (11 districts) | **Improved** |
| Commissioner count | 24 listed | 24 commissioners + Mayor | **Improved** |
| District grouping | Not grouped | Grouped by district | **Improved** |
| Contact info | Name, address, phone, email | Name, phone, email, city | **Parity** |
| Photos | Headshots for most | Headshots for all 24 + Mayor | **Improved** |
| Meeting info | "Current Agenda" link | YouTube channel + resources section | **Improved** |
| YouTube link | Not in main content | Commission streams link | **Added** |

### Contact (`/contact`)

| Content | Current | New | Status |
|---------|---------|-----|--------|
| Dedicated page | No dedicated contact page | Full contact hub | **Added** |
| Main office info | Footer only | Prominent card with address, phone, hours | **Improved** |
| Google Maps | Footer embed | Grayscale-to-color map on contact page | **Done** |
| Quick contacts | None | 4-card grid (Mayor, Clerk, Sheriff, EMA) | **Added** |
| Community resources | Scattered | 14 external links organized | **Added** |
| Emergency number | Not prominent | 911 highlighted for Sheriff | **Added** |
| Contact form | Contact Form 7 + reCAPTCHA | Form with 9 subject options + validation | **Done** |

### Calendar (`/calendar`)

| Content | Current | New | Status |
|---------|---------|-----|--------|
| Calendar plugin | The Events Calendar | Not used (plugin shows 0 events) | **Replaced** |
| Meeting schedules | Not on calendar page | 6 recurring meetings with schedule/time/location | **Added** |
| YouTube live links | Not present | Commission meetings link to YouTube | **Added** |
| Upcoming events | Plugin-based (empty) | Placeholder section (empty on old site too) | **Parity** |
| Meeting resources | Not present | Links to agendas, documents, commissioners | **Added** |

### Documents (`/documents` vs `/document-library/`)

| Content | Current | New | Status |
|---------|---------|-----|--------|
| Category count | 15+ categories | 15 categories (external) + 10 local files | **Improved** |
| Local documents | WordPress DLP plugin | 10 PDFs/DOCXs served from /documents/ | **Improved** |
| File types shown | Hidden behind DLP viewer | Colored badges (PDF=red, DOCX=blue, DOC=blue) | **Improved** |
| File sizes | Not shown | Shown per document | **Improved** |
| Search/filter | DLP search (AJAX) | Filter input + Cmd+K global search | **Done** |
| Video content | Title VI video link | Embedded privacy-enhanced YouTube | **Improved** |
| Direct downloads | Wrapped in DLP viewer pages | Direct download links | **Improved** |

### Employee Services (`/employee-services`)

| Content | Current | New | Status |
|---------|---------|-----|--------|
| Skyward Portal | Link (URL hidden in JS) | Direct link to Skyward login | **Improved** |
| Edison Portal | Link | Link | **Parity** |
| GOTOAssist | Link | Link | **Parity** |
| Mark III Benefits | Link | Link | **Parity** |
| Employment application | Download link | Local PDF download | **Done** |
| Title VI video | Link/embed | Privacy-enhanced video embed | **Improved** |
| Open enrollment flyer | PDF download | Local PDF download | **Done** |
| Health plan comparison | PDF download | Local PDF download | **Done** |
| Medical/vision rates | PDF download | Local PDF download | **Done** |
| Partners for Health | External link | External link | **Parity** |

### ADA Compliance (`/ada-compliance`)

| Content | Current | New | Status |
|---------|---------|-----|--------|
| Legal framework | Section 504 + ADA | Section 504 + ADA | **Parity** |
| ADA titles breakdown | 5 titles listed | 5 titles listed | **Parity** |
| Accommodation forms | 4 downloadable forms | 4 local downloads with type badges | **Done** |
| Local coordinator | Bobby L. Russell | Bobby L. Russell | **Parity** |
| State coordinator | Nashville office | Nashville office + email | **Improved** |
| Non-discrimination policy | Judicial notice | Judicial notice | **Parity** |
| Employee grievance policy | Link to document | Local DOCX download | **Done** |

### Privacy Policy (`/privacy-policy`)

| Content | Current | New | Status |
|---------|---------|-----|--------|
| Data collection | Comments, media, cookies | Comments, media, Gravatar, cookies | **Improved** |
| Cookie table | Inline text | Formatted table | **Improved** |
| Embedded content | Mentioned | Detailed explanation | **Improved** |
| Data retention | Described | Described | **Parity** |
| User rights | Described | Highlighted card | **Improved** |

---

## Gap Status (from Initial Audit)

### Critical Gaps — ALL CLOSED

| Feature | Initial Status | Current Status |
|---------|---------------|----------------|
| **Site Search** | Missing | **Done** — Fuse.js, Cmd+K, fuzzy search |
| **News Detail Pages** | Missing | **Done** — `/news/$slug` with full content |
| **Downloadable Documents** | Missing | **Done** — 10 files served locally |
| **Calendar** | Missing | **Done** — 6 recurring meetings + YouTube |

### Phase 2 Gaps — ALL CLOSED

| Feature | Initial Status | Current Status |
|---------|---------------|----------------|
| **Announcement Banner** | Missing | **Done** — Dismissible, localStorage |
| **Google Maps** | Missing | **Done** — Grayscale hover on contact page |
| **RSS Feed** | Missing | **Done** — Static XML + autodiscovery |
| **Contact Form** | Missing | **Done** — Form with 9 subject categories + validation |

### Phase 3 Items — OPTIONAL

| Feature | Status | Notes |
|---------|--------|-------|
| Tourism content | **Done** | CommunityHighlights section with 3 cards (Country Music, Outdoor Rec, BMS) |
| Staff directory | Not built | Department pages already show staff |
| Accessibility audit | Not run | Lighthouse/axe-core testing recommended |
| Analytics | Not added | Cloudflare Web Analytics is free + privacy-friendly |

---

## Remaining Gaps

| Feature | Priority | Effort | Notes |
|---------|----------|--------|-------|
| **Cloudflare Analytics** | Low | ~5min | Add `data-cf-beacon` script tag in `__root.tsx`, zero-cookie tracking. Requires beacon token from CF dashboard. |
| **Lighthouse audit** | Low | ~30min | Run accessibility + performance tests, fix any findings |

---

## External Links — Full Comparison

### Present on Both Sites
- Sullivan County Trustee: sullivantntrustee.gov
- Animal Shelter: animalshelter-sullivancounty.org
- Sullivan County Schools: sullivank12.net
- Sullivan County Public Library: scpltn.org
- Sullivan County Sheriff: scsotn.com
- Partners for Health: tn.gov/partnersforhealth
- County Clerk: sullivancountyclerktn.com
- State of Tennessee: tn.gov
- County Technical Assistance Service: ctas.tennessee.edu

### New Site Only (enhancements)
- BidNet (Purchasing Bids): bidnetdirect.com
- Chancery Court: sullivantnchancery.com
- District Attorney: sullivancountyda.com
- Election Office: scelect.org
- Historic Sullivan: historicsullivan.com
- Register of Deeds Records: ustitlesearch.net
- YouTube Commission Streams: youtube.com/@sullivancountycommission

### Old Site Only
- Commission meeting agenda PDF (dynamic current-packet link) — new site links to County Clerk for current agenda

---

## Content Accuracy Check

| Claim | Current Site | New Site | Verified |
|-------|-------------|----------|----------|
| County Mayor | Richard S. Venable | Richard Venable | Yes |
| Main address | 3411 TN-126, Blountville, TN 37617 | Same | Yes |
| Mayor phone | (423) 323-6417 | Same | Yes |
| ADA Coordinator | Bobby L. Russell | Same | Yes |
| ADA Coordinator phone | (423) 279-2752 | Same | Yes |
| State ADA office | 511 Union St, Suite 600, Nashville | Same | Yes |
| Department count | 26 (excl. Trustee) | 27 (incl. Commissioners as route) | Consistent |
| Commissioner count | 24 across 11 districts | Same | Yes |
| Commissioner districts | 11 | Same | Yes |
| News articles | 5 recent | Same 5 articles | Yes |
| Document categories | 15+ | 15 external + 10 local | Yes |
| Skyward URL | Hidden in JS onclick handler | Direct link | Verified |
