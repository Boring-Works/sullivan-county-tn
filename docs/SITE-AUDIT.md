# Sullivan County TN — Site Audit & Comparison

**Date:** February 28, 2026
**Current site:** https://sullivancountytn.gov (WordPress/Divi)
**New site:** https://sullivan-county-tn.codyboring.workers.dev (TanStack Start/Cloudflare Workers)

---

## Executive Summary

The current Sullivan County website runs on WordPress with the Divi theme builder. It is functional but dated in design, slow to load, and lacks modern SEO/social sharing capabilities. The new site is a static-first edge-deployed application with a custom "Appalachian Editorial" design system, full OG/Twitter Card support, and sub-second load times.

This audit compares content parity, feature coverage, and identifies gaps.

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
| **Calendar** | The Events Calendar plugin | Not yet implemented |
| **Forms** | Contact Form 7 / reCAPTCHA | Not yet implemented |
| **Search** | WordPress default search | Not yet implemented |
| **CMS editing** | WordPress admin (browser) | Code-based (developer) |

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
- Contact
- Documents
- Employee Services
- Pay Taxes (external CTA)

### Assessment
| Item | Status |
|------|--------|
| Department mega-menu | **Improved** — categorized into 6 groups vs flat list |
| Commissioners link | **Added** — not in current nav |
| Contact page link | **Added** — not in current nav |
| Documents link | **Added** — not in current nav |
| Calendar | **Missing** — current site has calendar in nav |
| Search | **Missing** — current site has WordPress search |

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

| Content | Current | New | Notes |
|---------|---------|-----|-------|
| Hero banner | Static image/slider | Cinematic photo parallax + stat counters | **Improved** |
| Department links | Dropdown menu only | Category cards + mega-menu | **Improved** |
| Quick services | Grid of 6 resource links | 8-card animated grid | **Improved** |
| County news | 5 recent articles | 5 recent articles | **Parity** |
| Calendar widget | Events Calendar sidebar | Not implemented | **Gap** |
| Birthplace of Country Music | Featured section | Not included | **Gap** (tourism content) |
| Bristol Motor Speedway | Featured section | Not included | **Gap** (tourism content) |
| Outdoor recreation | Featured section | Not included | **Gap** (tourism content) |
| Property tax deadline notice | Featured banner | Not implemented | **Gap** |
| About section | None | "Where Tennessee Began" section | **Added** |
| Mountain dividers | None | SVG mountain ridge separators | **Added** |
| Scroll animations | None | Intersection Observer reveals | **Added** |

### County News (`/news` vs `/county-news/`)

| Content | Current | New | Notes |
|---------|---------|-----|-------|
| Article list | Paginated blog posts | All articles in feed | **Parity** |
| Article count | 5 visible + pagination | 5 articles | **Parity** |
| Article detail pages | Full WordPress posts | Not yet (cards link nowhere) | **Gap** |
| Categories/tags | WordPress categories | Article type badges | **Similar** |
| Search/filter | WordPress search | Not implemented | **Gap** |
| RSS feed | WordPress default | Not implemented | **Gap** |

### Commissioners (`/commissioners` vs `/county-commissioner-information/`)

| Content | Current | New | Notes |
|---------|---------|-----|-------|
| Commissioner list | Single page list | Grid by district (11 districts) | **Improved** |
| Commissioner count | Listed | 24 commissioners, 2 per district + alternates | **Improved** |
| District grouping | Not grouped | Grouped by district | **Improved** |
| Contact info | Names only | Names + titles + party | **Improved** |
| Meeting info | Linked separately | Inline resources section | **Improved** |
| YouTube link | Not present | Commission streams link | **Added** |

### Contact (`/contact`)

| Content | Current | New | Notes |
|---------|---------|-----|-------|
| Dedicated page | No dedicated contact page | Full contact hub | **Added** |
| Main office info | Footer only | Prominent card with map pin | **Improved** |
| Quick contacts | None | 4-card grid (Mayor, Clerk, Sheriff, EMA) | **Added** |
| Community resources | Scattered | 14 external links organized | **Added** |
| Emergency number | Not prominent | 911 highlighted for Sheriff | **Added** |

### Documents (`/documents` vs `/document-library/`)

| Content | Current | New | Notes |
|---------|---------|-----|-------|
| Category count | 15 categories | 15 categories | **Parity** |
| Category list | Identical | Identical | **Parity** |
| Document hosting | WordPress Media Library | Links to existing system | **Redirects to current** |
| Search/filter | WordPress search | Not implemented | **Gap** |
| Direct downloads | PDF links | External links to current system | **Redirects** |

### Employee Services (`/employee-services` vs `/staff/`)

| Content | Current | New | Notes |
|---------|---------|-----|-------|
| Skyward | Link | Link | **Parity** |
| Edison Portal | Link | Link | **Parity** |
| GOTOAssist | Link | Link | **Parity** |
| Mark III Benefits | Link | Link | **Parity** |
| Employment application | Download link | Listed as resource | **Partial** — no direct download |
| Title VI video | Embedded/linked | Listed as resource | **Partial** — no direct link |
| Open enrollment flyer | PDF download | Not linked | **Gap** |
| Health plan comparison | PDF download | Listed as resource | **Partial** — no direct download |
| Medical/vision rates | PDF download | Listed as resource | **Partial** — no direct download |
| Partners for Health | External link | External link | **Parity** |

### ADA Compliance (`/ada-compliance`)

| Content | Current | New | Notes |
|---------|---------|-----|-------|
| Legal framework | Section 504 + ADA | Section 504 + ADA | **Parity** |
| ADA titles breakdown | 5 titles listed | 5 titles listed | **Parity** |
| Accommodation forms | 4 downloadable forms | Described, no downloads | **Gap** — forms not linked |
| Local coordinator | Bobby L. Russell | Bobby L. Russell | **Parity** |
| State coordinator | Nashville office | Nashville office + email | **Improved** — added email |
| Non-discrimination policy | Judicial notice | Judicial notice | **Parity** |
| Employee grievance policy | Link to document | Not included | **Gap** |

### Privacy Policy (`/privacy-policy`)

| Content | Current | New | Notes |
|---------|---------|-----|-------|
| Data collection | Comments, media, cookies | Comments, media, Gravatar, cookies | **Improved** — added Gravatar |
| Cookie table | Inline text | Formatted table | **Improved** |
| Embedded content | Mentioned | Detailed explanation | **Improved** |
| Data retention | Described | Described | **Parity** |
| User rights | Described | Highlighted card | **Improved** |
| Third-party services | Spam detection mention | Spam detection mention | **Parity** |
| Contact forms section | Empty header | Not included | **Parity** (both empty) |

---

## Features Missing from New Site

### Critical Gaps
| Feature | Priority | Notes |
|---------|----------|-------|
| **Event Calendar** | High | Current site uses The Events Calendar plugin. Interactive calendar with importable events. Key community feature. |
| **Site Search** | High | WordPress provides native search. New site has no search capability. |
| **Downloadable Forms/Documents** | High | ADA forms, employment application, benefits documents are directly downloadable on current site. New site only describes them or links to external system. |
| **News Article Detail Pages** | Medium | Current site has full article pages. New site only shows cards with no detail view. |

### Nice-to-Have Gaps
| Feature | Priority | Notes |
|---------|----------|-------|
| **Tourism content** | Low | Birthplace of Country Music, Bristol Motor Speedway, outdoor recreation sections on current homepage. May not be needed for government portal. |
| **RSS feed** | Low | WordPress auto-generates. Useful for news subscribers. |
| **reCAPTCHA/forms** | Medium | Current site has contact forms. New site has no form submission. |
| **Google Maps embed** | Low | Current footer has map. New site has address text only. |
| **Featured announcements** | Medium | Current site has prominent property tax deadline banner. New site has no announcement system. |

---

## Features Improved in New Site

| Feature | Improvement |
|---------|-------------|
| **Performance** | Edge-deployed, sub-second loads vs 3-5s WordPress |
| **Design system** | Custom "Appalachian Editorial" brand with navy/copper/brass palette, Libre Caslon + Outfit typography |
| **Department organization** | 6 color-coded categories vs flat list |
| **Department data** | Structured data (staff, offices, services, documents, FAQs, meeting schedules) vs inconsistent WordPress pages |
| **Commissioner page** | District-grouped grid with 24 commissioners vs basic list |
| **Contact hub** | Dedicated page with quick contacts and 14 community resource links |
| **Social sharing** | Full OG + Twitter Card meta with custom images (Boone Lake + courthouse with text overlay) |
| **Favicons** | SVG + apple-touch-icon vs none |
| **Navigation** | Glass-morphism nav with categorized mega-menu vs basic WordPress menu |
| **Visual identity** | Mountain dividers, scroll reveals, cinematic hero, stat counters |
| **Mobile experience** | Purpose-built responsive design vs Divi breakpoints |
| **Accessibility** | Semantic HTML, ARIA labels, focus states vs generic WordPress output |

---

## External Links Comparison

### Links on Current Site (also on New Site)
- Sullivan County Trustee / Property Tax: sullivantntrustee.gov
- Animal Shelter: animalshelter-sullivancounty.org
- Sullivan County Schools: sullivank12.net
- Sullivan County Public Library: scpltn.org
- Sullivan County Sheriff: scsotn.com
- Partners for Health: tn.gov/partnersforhealth
- County Clerk: sullivancountyclerktn.com

### Links on Current Site (missing from New Site)
- State of Tennessee: tn.gov *(on current homepage sidebar)*
- County Technical Assistance Service: ctas.tennessee.edu *(on current homepage sidebar)*
- Commission meeting agenda PDFs *(dynamic, current packet)*
- Google Maps embed for county office

### Links on New Site (not on Current Site)
- BidNet (Purchasing Bids): bidnetdirect.com
- Chancery Court: sullivantnchancery.com
- District Attorney: sullivancountyda.com
- Election Office: scelect.org
- Historic Sullivan: historicsullivan.com
- Register of Deeds Records: ustitlesearch.net
- YouTube Commission Streams

---

## Content Accuracy Check

| Claim | Current Site | New Site | Verified |
|-------|-------------|----------|----------|
| County Mayor | Richard S. Venable | Richard Venable | Yes |
| Main address | 3411 TN-126, Blountville, TN 37617 | 3411 TN-126, Blountville, TN 37617 | Yes |
| Mayor phone | (423) 323-6417 | (423) 323-6417 | Yes |
| ADA Coordinator | Bobby L. Russell | Bobby L. Russell | Yes |
| ADA Coordinator phone | (423) 279-2752 | (423) 279-2752 | Yes |
| State ADA office | 511 Union St, Suite 600, Nashville | 511 Union St, Suite 600, Nashville | Yes |
| Department count | 26 (excl. Trustee) | 27 (incl. Commissioners as route) | Consistent |
| Commissioner districts | Not specified | 11 districts | Verified |
| News articles | 5 recent | 5 recent (same articles) | Yes |
| Document categories | 15 | 15 (identical list) | Yes |

---

## Recommendations

### Phase 1 — Close Critical Gaps
1. **Add event calendar** — Either embed Google Calendar or build a simple events list from structured data
2. **Add site search** — Implement client-side search across departments and news (Fuse.js or similar)
3. **Link downloadable documents** — ADA forms, employment application, benefits PDFs need direct download links
4. **Add news detail pages** — Create `/news/$slug` route for full article views

### Phase 2 — Enhance
5. **Announcement banner** — Add a dismissible banner system for urgent notices (tax deadlines, weather alerts)
6. **Contact form** — Add a simple contact form with Cloudflare Turnstile (replaces reCAPTCHA)
7. **Google Maps embed** — Add map to contact page or footer
8. **RSS feed** — Generate RSS XML for news articles

### Phase 3 — Optional
9. **Tourism content** — Consider whether Birthplace of Country Music / BMS content belongs on government portal
10. **Staff directory** — Build searchable staff directory from department data
11. **Accessibility audit** — Run axe-core / Lighthouse accessibility tests
12. **Analytics** — Add Cloudflare Web Analytics (privacy-friendly, no cookies)
