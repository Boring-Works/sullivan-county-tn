# Sullivan County Site — Full Content Implementation Design

**Date:** 2026-02-27
**Status:** Approved
**Scope:** Enrich department pages with all scraped content, add missing structural pages

---

## Problem

The initial build captured all 27 departments with basic info (contacts, services, offices, staff, external links). A comparison of the source scrape (`sullivancountytn-full-scrape.md`) against `departments.ts` revealed:

1. **7 departments** have significant content that didn't make it (bid tables, key documents, meeting schedules, FAQ-style sections, publications)
2. **3 structural pages** are missing entirely (ADA Compliance, Privacy Policy, Employee Services)
3. **Commissioners page** is missing meeting resources (agendas, YouTube, minutes)
4. **14 community links** from the scrape aren't represented on the site
5. **Sullivan County Trustee** is referenced but not surfaced prominently

## Approach

**Extend `departments.ts` with optional typed fields.** Single file, no new abstractions. Departments only get the fields they need. DepartmentDetail component conditionally renders new sections when data exists.

**Rationale:** Solo dev with Claude Code. One 2000-2500 line data file is manageable. 27 separate files would add overhead without benefit. If splitting is ever needed, it's a 30-minute mechanical refactor thanks to the typed interface.

---

## Phase 1: Department Content Enrichment

### New Interfaces

```ts
interface KeyDocument {
  name: string;
  url?: string;
  description?: string;
}

interface MeetingSchedule {
  name: string;
  schedule: string;
  location?: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface BidThreshold {
  range: string;
  process: string;
}

interface Publication {
  name: string;
  url?: string;
}
```

### New Optional Fields on `Department`

```ts
keyDocuments?: KeyDocument[];
meetingSchedule?: MeetingSchedule[];
faqItems?: FaqItem[];
bidThresholds?: BidThreshold[];
importantNotes?: string[];
publications?: Publication[];
```

### New DepartmentDetail Sections

Rendered conditionally below Services, in order:

1. **Important Notes** — amber/warning callout box (e.g., "What the Assessor does NOT do")
2. **Bid Thresholds** — styled table with range/process columns (Purchasing only)
3. **Key Documents** — list with document/PDF icons and optional links
4. **Meeting Schedule** — card per meeting with schedule string and location
5. **Publications** — download links with document icons
6. **FAQ** — styled Q&A list (simple, no accordion)

All sections use existing editorial style: `font-display` headers, `brand-navy` titles, copper accents, `brand-surface` borders.

### Departments Getting Enriched

| Department | New Fields | Content Source (scrape lines) |
|---|---|---|
| County Clerk | keyDocuments | Business Tax Notice #23-08, Hotel/Motel Tax Notice (L248-255) |
| Emergency Management | meetingSchedule, keyDocuments | LEPC 3rd Wed monthly 7:30am, Hazard Plan, By-Laws (L410-427) |
| Property Assessor | faqItems, importantNotes | "Does NOT set tax rates/send bills/collect taxes", reappraisal 2025, educational videos (L525-541) |
| Planning and Codes | keyDocuments, importantNotes | Zoning Code 2025, Subdivision Regs 2024, Permit Form Aug 2024, electrical permits via State CORE (L675-688) |
| Purchasing | bidThresholds, importantNotes | 4-tier threshold table ($0-10k micro through $50k+ sealed), vendor registration, records retention (L710-726) |
| Soil & Water Conservation | publications, importantNotes | SCSWCD Brochure, FY 2025 Annual Report, BMP details, NASDA grant info (L830-843) |
| Archives & Tourism | importantNotes | Old Deery Inn (18 rooms, 2 attics, 3 cellars, 10 outbuildings), Sunnyside Trail (L774-784) |

The other 20 departments already have their full scraped content.

---

## Phase 2: Commissioners Page — Resources Section

Enrich the existing "Commission Resources" box in `commissioners.tsx` with:

- Current agenda link (meeting packet)
- YouTube stream link (Sullivan County Commission)
- Previous minutes link (via Sullivan County Clerk)
- County offices address (3411 TN-126, Blountville)

No new components. Just expanding existing JSX.

---

## Phase 3: Missing Structural Pages

### 3a. ADA Compliance (`/ada-compliance`)

New route: `routes/ada-compliance.tsx`

Content from scrape (L969-995):
- Section 504 of Rehabilitation Act of 1973
- Americans with Disabilities Act of 1990 (5 titles)
- Accommodation request process (general + court-specific)
- Local coordinator: Bobby L. Russell, Circuit Court Clerk
- State coordinator: TN ADA Coordinator, Nashville
- Non-discrimination policy statement

Static content page, data inline.

### 3b. Privacy Policy (`/privacy-policy`)

New route: `routes/privacy-policy.tsx`

Content from scrape (L999-1025):
- Data collection (comments, Gravatar, media/EXIF)
- Cookie policy (comment, login, session, post-edit)
- Embedded content notice
- Data retention policy
- Third-party spam detection
- User data rights (export, erasure)

Static content page, data inline.

### 3c. Employee Services (`/employee-services`)

New route: `routes/employee-services.tsx`

Content from scrape (L876-897):
- Portal links: Skyward, Edison Employee Portal, GOTOAssist, Mark III Benefits
- Benefits: Medical/vision coverage 2025, health plan comparison
- Forms: Employment application, Title VI training
- Open enrollment materials, Partners for Health

Static content page with styled link cards for portals.

### 3d. Sullivan County Trustee

NOT a new department page. The Trustee is an independent office with its own website (sullivantntrustee.gov).

- Ensure prominent placement in Quick Services (already has "Pay Taxes" link)
- Add to community links section

---

## Phase 4: Community Links & Footer Updates

### Community Links

Add the 14 external/community links from the scrape (L1030-1047) to the Contact page as a "Community Resources" section:

| Resource | URL |
|---|---|
| Sullivan County Trustee | sullivantntrustee.gov |
| Animal Shelter | animalshelter-sullivancounty.org |
| Sullivan County Schools | sullivank12.net |
| Sullivan County Public Library | scpltn.org |
| Sheriff's Office | scsotn.com |
| County Clerk Records | sullivancountyclerktn.com |
| Chancery Court | sullivantnchancery.com |
| District Attorney | sullivancountyda.com |
| Election Office | scelect.org |
| Historic Sullivan | historicsullivan.com |
| Register of Deeds Records | ustitlesearch.net |
| BidNet (Purchasing Bids) | bidnetdirect.com/tennessee/sullivancountytn |
| State of Tennessee | tn.gov |
| County Technical Assistance Service | ctas.tennessee.edu |

### Footer Updates

Add links to SiteFooter:
- ADA Compliance (`/ada-compliance`)
- Privacy Policy (`/privacy-policy`)

---

## What We're NOT Building

- Document library CMS (documents stay as links to sullivancountytn.gov)
- Employee portal functionality (just external links)
- Search functionality
- Dark mode
- Breadcrumb navigation
- Department-specific hero images

---

## Files Modified

| File | Change |
|---|---|
| `src/data/departments.ts` | Add interfaces, add optional fields to 7 departments |
| `src/components/departments/DepartmentDetail.tsx` | Add 6 new conditional sections |
| `src/routes/commissioners.tsx` | Expand Commission Resources section |
| `src/routes/ada-compliance.tsx` | NEW — ADA compliance page |
| `src/routes/privacy-policy.tsx` | NEW — Privacy policy page |
| `src/routes/employee-services.tsx` | NEW — Employee services portal page |
| `src/routes/contact.tsx` | Add Community Resources section |
| `src/components/layout/SiteFooter.tsx` | Add ADA + Privacy links |
| `src/components/layout/SiteNav.tsx` | Add Employee Services to nav if appropriate |
