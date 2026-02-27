# Sullivan County Government Website — Design Document

**Date:** 2026-02-27
**Status:** Approved
**Template:** Holston Partners (TanStack Start + CF Workers)
**Content Source:** Full scrape of sullivancountytn.gov (27 departments)

---

## Goal

Replace the current sullivancountytn.gov with a modern citizen services portal. Residents find departments, contacts, services, and resources quickly. Practical and functional.

## Approach

**Multi-page with file-based routing.** Each department gets its own route. Homepage is a dashboard with quick links and department categories. All content stored in typed static data files — no database needed.

---

## Brand & Visual System

- **Primary:** Deep blue (#1e3a5f) — authoritative, trustworthy
- **Surface:** Warm white (#fafaf8)
- **Accent:** Tennessee orange (#c45427) — CTAs, alerts
- **Text:** Slate gray for body
- **Success/Parks:** Green (#2d7a4f)
- **Typography:** Clean sans-serif (Inter or similar) for body. Display font for county name/hero only.
- **Standards:** WCAG AA compliant, high-contrast, accessible

---

## Site Structure & Routes

```
/                           Homepage (dashboard)
/departments                Full department directory
/departments/$slug          Individual department page (27 total, dynamic route)
/commissioners              Commissioner grid by district
/news                       County news feed
/documents                  Document library categories
/contact                    General county contact info
```

7 route files total. The `$slug` route handles all 27 departments from the data file.

---

## Homepage Layout

1. **SiteNav** — County logo + name, grouped department mega-menu (5 categories), quick links (Pay Taxes, Elections, Documents)
2. **HeroBanner** — County name, "Established 1779", CTAs: "Find a Department", "Pay Property Taxes", "Contact Us"
3. **QuickServices** — 6-8 cards for most-used services (Pay Taxes, Marriage License, Building Permits, Court Dockets, Animal Shelter, Emergency Info)
4. **DepartmentCategories** — 5 grouped cards (Administrative, Courts, Public Safety, Operations, Community) linking to their departments
5. **NewsSection** — Latest 3 county news items
6. **SiteFooter** — Address (3411 TN-126, Blountville, TN 37617), main phone, hours, external links

---

## Department Page Layout

Single `DepartmentPage` component renders all 27 departments:

- Department name + category badge
- Contact card (head name/title, phone, fax, email, address, hours)
- Description of responsibilities/services
- Services list (bullets)
- Additional offices (if applicable — Clerk has 3, Circuit Court has 3)
- Staff table (if applicable — Purchasing has 6)
- Resources/external links
- Back to directory link

---

## Data Architecture

### `src/data/departments.ts`

```typescript
type DepartmentCategory = "administrative" | "courts" | "public-safety" | "operations" | "community"

interface ContactInfo {
  phone: string
  fax?: string
  email?: string
  address: string
  hours: string
}

interface StaffMember {
  name: string
  title: string
  phone?: string
  email?: string
}

interface Office {
  name: string
  address: string
  phone: string
  fax?: string
}

interface ExternalLink {
  label: string
  url: string
}

interface Department {
  slug: string
  name: string
  category: DepartmentCategory
  head: { name: string; title: string }
  contact: ContactInfo
  description: string
  services: string[]
  additionalOffices?: Office[]
  staff?: StaffMember[]
  externalLinks?: ExternalLink[]
}
```

### `src/data/commissioners.ts`

```typescript
interface Commissioner {
  name: string
  district: number
  address: string
  phone?: string
  email?: string
}
```

### `src/data/news.ts`

```typescript
interface NewsItem {
  title: string
  date: string
  author: string
  slug: string
  summary: string
  pdfUrl?: string
}
```

---

## Components

| Component | File | Purpose |
|-----------|------|---------|
| SiteNav | `src/components/layout/SiteNav.tsx` | Top nav: logo, department mega-menu, quick links |
| SiteFooter | `src/components/layout/SiteFooter.tsx` | County address, phone, hours, external links |
| HeroBanner | `src/components/home/HeroBanner.tsx` | Homepage hero with county branding + CTAs |
| QuickServices | `src/components/home/QuickServices.tsx` | Grid of most-used service cards |
| DepartmentCategories | `src/components/home/DepartmentCategories.tsx` | 5 category cards linking to departments |
| NewsSection | `src/components/home/NewsSection.tsx` | Latest 3 news items |
| DepartmentCard | `src/components/departments/DepartmentCard.tsx` | Card for department directory grid |
| DepartmentDetail | `src/components/departments/DepartmentDetail.tsx` | Full department detail layout |
| ContactCard | `src/components/shared/ContactCard.tsx` | Reusable contact info display |
| CommissionerCard | `src/components/commissioners/CommissionerCard.tsx` | Individual commissioner display |
| CommissionerGrid | `src/components/commissioners/CommissionerGrid.tsx` | 11-district layout |
| NewsCard | `src/components/shared/NewsCard.tsx` | News article preview card |

### shadcn/ui components to reuse
- Button, Card, Badge (already installed)
- Add: Accordion (mobile nav, department details)

---

## Department Category Mapping

| Category | Departments |
|----------|------------|
| Administrative | County Mayor, Commissioners, County Attorney, County Clerk |
| Courts | Chancery Court, Circuit Court, District Attorney, Public Defender |
| Public Safety | Sheriff, Emergency Management, EMS, Medical Examiner/Coroner |
| Finance & Property | Finance, FMS 2020, Property Assessor, Register of Deeds |
| Operations | Highway, Maintenance, Solid Waste, Planning & Codes, Purchasing, Risk Management |
| Community | Archives & Tourism, Election Office, Soil & Water Conservation, Veterans Office |

---

## External Links (not rebuilt, linked to)

- Pay Property Taxes → sullivantntrustee.gov
- Animal Shelter → animalshelter-sullivancounty.org
- Schools → sullivank12.net
- Public Library → scpltn.org
- Sheriff's Office → scsotn.com
- County Clerk Records → sullivancountyclerktn.com
- Election Office → scelect.org
- Chancery Court → sullivantnchancery.com
- District Attorney → sullivancountyda.com
- Register of Deeds → ustitlesearch.net
- Purchasing Bids → bidnetdirect.com/tennessee/sullivancountytn

---

## Not Building (YAGNI)

- No database / D1
- No search backend (client-side filter only)
- No CMS / admin panel
- No user authentication
- No form submissions (show email/phone instead)
- No calendar integration
- No document hosting (link to existing URLs)

---

## Deployment

- **Platform:** Cloudflare Workers
- **Worker name:** sullivan-county-tn (rename from holston-partners)
- **Command:** `npm run deploy`
