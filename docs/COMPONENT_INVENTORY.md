# Component Inventory — Sullivan County TN

**Platform:** Web-only (TanStack Start on Cloudflare Workers)
**Total components:** 50 | **Hooks:** 4 | **Last refreshed:** 2026-05-07

All components below are in active use. Two unused shadcn primitives (`card.tsx`, `button.tsx`) were deleted on 2026-05-07.

---

## Layout (7)

| Component | File | Purpose |
|-----------|------|---------|
| `SiteNav` | `layout/SiteNav.tsx` | Verb-based primary nav (Pay · Apply · Report · Records · Meetings · Departments · About). Each verb opens a mega-panel of concrete tasks. Hover-open gated to fine pointers, click-outside closes, arrow-key navigation inside the open panel. Departments mega-menu preserved as one verb. |
| `SiteFooter` | `layout/SiteFooter.tsx` | Four-column footer with mountain SVG, county seal, links, copyright. |
| `SearchDialog` | `layout/SearchDialog.tsx` | Fuse.js fuzzy search modal (Cmd+K). ARIA combobox + listbox. Citizen-language aliases indexed at weight 1.8. Suggested queries on zero result. Lazy-loaded. |
| `AnnouncementBanner` | `layout/AnnouncementBanner.tsx` | Reads from D1 via `listPublicAnnouncements`. Sets `--banner-height` so SiteNav offsets correctly. localStorage dismissal. |
| `LanguageToggle` | `layout/LanguageToggle.tsx` | EN/ES toggle, persists via cookie. |
| `MobileBottomTabBar` | `layout/MobileBottomTabBar.tsx` | Three-action thumb-zone bar at <md: Pay · Search · Call. Hides when soft keyboard is open via `visualViewport` ratio detection. |
| `NotFound` | `layout/NotFound.tsx` | Custom 404 with quick links + search hint. |

---

## Home (10)

| Component | File | Purpose |
|-----------|------|---------|
| `HeroBanner` | `home/HeroBanner.tsx` | Cinematic hero (WebP `<picture>` sources, parallax, stat counters), visible search trigger, 5 task chips, Open-Now almanac with Next-Meeting tile. |
| `EmergencyModule` | `home/EmergencyModule.tsx` | Always-visible emergency contacts (911, Sheriff non-emergency, EMA) with elevated 911 tile. |
| `QuickServices` | `home/QuickServices.tsx` | 9-service grid with online/in-person submission badges. |
| `DepartmentCategories` | `home/DepartmentCategories.tsx` | 6 color-coded category cards. |
| `AudiencePathways` | `home/AudiencePathways.tsx` | Three audience tiles (Residents / Businesses / Visitors) per blueprint Brunswick/Greenville hybrid pattern. |
| `PromisesSection` | `home/PromisesSection.tsx` | "What you can expect" — three plain-language promises. |
| `NextMeetingCard` | `home/NextMeetingCard.tsx` | Computes next County Commission meeting via `nextOccurrence()`; offers `.ics` download + watch-live link. |
| `NewsSection` | `home/NewsSection.tsx` | Editorial news layout with featured first item. |
| `CommunityMap` | `home/CommunityMap.tsx` | Interactive 6-community SVG map (US Census TIGER/Line projection). Mobile fallback list. |
| `AboutSection` | `home/AboutSection.tsx` | "Where Tennessee Began" section with courthouse photos. |

---

## Departments (3)

| Component | File | Purpose |
|-----------|------|---------|
| `DepartmentCard` | `departments/DepartmentCard.tsx` | Listing card with category badge, phone (TelLink), Open-Now pill. |
| `DepartmentDetail` | `departments/DepartmentDetail.tsx` | Full dept page: hero banner, contacts, staff, services, FAQs, publications. |
| `PrintableContactCard` | `departments/PrintableContactCard.tsx` | Print-only contact card with QR code linking back to the live page. |

---

## Property taxes (1)

| Component | File | Purpose |
|-----------|------|---------|
| `ParcelLookup` | `property-taxes/ParcelLookup.tsx` | Single-box typeahead on `/property-taxes`. Calls `lookupParcelSuggestions` server fn (TPAD autocomplete proxy). Three side-by-side CTAs route to TPAD assessment / Trustee payment / ArcGIS web map. ARIA combobox + listbox, debounced 280ms, graceful "couldn't reach the state database" copy on upstream failure. |

---

## Commissioners (2)

| Component | File | Purpose |
|-----------|------|---------|
| `CommissionerGrid` | `commissioners/CommissionerGrid.tsx` | District-grouped grid layout. |
| `CommissionerCard` | `commissioners/CommissionerCard.tsx` | Individual card with photo, name, district, contact, vCard "Save Contact" download. |

---

## Communities (1)

| Component | File | Purpose |
|-----------|------|---------|
| `CommunityCard` | `communities/CommunityCard.tsx` | Community listing card with type badge, population, highlights. |

---

## News (2)

| Component | File | Purpose |
|-----------|------|---------|
| `NewsCard` | `shared/NewsCard.tsx` | News article card with date, summary, PDF badge. |
| `NewsDetail` | `news/NewsDetail.tsx` | Full article view with header, body, PDF/source links. |

---

## History / heritage (5)

| Component | File | Purpose |
|-----------|------|---------|
| `HeritageHero` | `history/HeritageHero.tsx` | Hero with brand tagline + 1779/CURRENT_YEAR date device. |
| `HistoryNarrative` | `history/HistoryNarrative.tsx` | Long-form editorial sections with scroll-reveal. |
| `HeritageSiteCard` | `history/HeritageSiteCard.tsx` | Heritage site card with NRHP/NHL badges. |
| `VisitorInfoCard` | `history/VisitorInfoCard.tsx` | Visitor info sidebar (hours, admission, location, website). |
| `TimelineSection` | `history/TimelineSection.tsx` | Alternating vertical timeline with color-coded era dots. |

---

## People (1)

| Component | File | Purpose |
|-----------|------|---------|
| `PersonCard` | `people/PersonCard.tsx` | Notable person card with category badge + achievement. |

---

## Forms (2)

| Component | File | Purpose |
|-----------|------|---------|
| `FormLayout` | `forms/FormLayout.tsx` | Form page wrapper with title, breadcrumb, validation states. |
| `FormField` | `forms/FormField.tsx` | Reusable form input with label, help text, `role="alert"` error. |

---

## Minutes (2)

| Component | File | Purpose |
|-----------|------|---------|
| `MinutesList` | `minutes/MinutesList.tsx` | Meeting minutes list rendering, paginated. |
| `MinutesFilter` | `minutes/MinutesFilter.tsx` | Search + committee filter for minutes archive. |

---

## Admin (2)

| Component | File | Purpose |
|-----------|------|---------|
| `AdminLayout` | `admin/AdminLayout.tsx` | Admin sidebar + mobile nav with auth-aware links. |
| `StatusBadge` | `admin/StatusBadge.tsx` | Submission status badge (new / reviewed / resolved). |

---

## Shared (8)

| Component | File | Purpose |
|-----------|------|---------|
| `TelLink` | `shared/TelLink.tsx` | Normalizes phone numbers to `tel:+1XXXXXXXXXX`. Used everywhere a phone number is rendered. |
| `OpenStatusPill` | `shared/OpenStatusPill.tsx` | Live "Open until 4:30 PM" / "Closed · Holiday" pill via `useOpenStatus(hours)`. |
| `PageFeedback` | `shared/PageFeedback.tsx` | "Was this page helpful?" widget. Yes/No + optional comment → D1. Mounted on dept detail / forms / contact / property-taxes. |
| `ContactCard` | `shared/ContactCard.tsx` | Reusable contact info card with vCard download. |
| `InstallPrompt` | `shared/InstallPrompt.tsx` | PWA install hint with iOS Safari-aware modal. |
| `MountainDivider` | `shared/MountainDivider.tsx` | Three-layer parallax mountain ridge SVG dividers. |
| `CountySeal` | `shared/CountySeal.tsx` | Official Sullivan County seal. SVG (47 KB) + raster fallbacks at 64/128/256/512px. |
| `VideoEmbed` | `shared/VideoEmbed.tsx` | Privacy-enhanced YouTube (click-to-load, nocookie). |

---

## ui (1)

| Component | File | Purpose |
|-----------|------|---------|
| `Badge` | `ui/badge.tsx` | shadcn primitive. Used in 4 places (DepartmentCard, DepartmentDetail, NewsCard, NewsDetail). |

> Two other shadcn primitives (`card.tsx`, `button.tsx`) were deleted on 2026-05-07 — they had zero imports.

---

## Hooks (4)

| Hook | File | Purpose |
|------|------|---------|
| `useOpenStatus` | `hooks/useOpenStatus.ts` | Parses dept `contact.hours` strings ("Monday-Friday, 8am-4:30pm" format) and returns `{ isOpen, label, nextChange }`. Honors all 13 county holidays. SSR-safe (returns stable placeholder before hydration). |
| `useScrollReveal` | `hooks/useScrollReveal.ts` | Intersection-observer scroll-reveal system. Adds `.revealed` to elements with `[data-reveal]` as they enter the viewport. CSS `animation-timeline: view()` is the no-JS fallback. |
| `useCountUp` | `hooks/useCountUp.ts` | Animated stat counter with rAF-driven easing. Respects `prefers-reduced-motion`. |
| `useLocale` | `hooks/useLocale.ts` | Cookie-based locale toggle with `document.documentElement.lang` sync. |
