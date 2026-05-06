# Component Inventory — Sullivan County TN

**Platform:** Web-only (TanStack Start)  
**Total Components:** 37 | **Hooks:** 3 | **Generated:** 2026-05-06  
**Audit Result:** No duplicates. No removals. No renames. All 37 in active use.

---

## Layout Components (6)

| # | Component | File Path | Purpose | Used In | Platform | Duplicate? | Recommendation |
|---|-----------|-----------|---------|---------|----------|------------|----------------|
| 1 | `SiteNav` | `src/components/layout/SiteNav.tsx` | Primary navigation with mega-menu, mobile hamburger, Cmd+K search trigger, glass-morphism scroll effect | `__root.tsx` | Web | No | KEEP |
| 2 | `SiteFooter` | `src/components/layout/SiteFooter.tsx` | Four-column footer with mountain SVG, links, copyright | `__root.tsx` | Web | No | KEEP |
| 3 | `SearchDialog` | `src/components/layout/SearchDialog.tsx` | Fuse.js fuzzy search modal, ARIA combobox pattern, lazy-loaded | `SiteNav` | Web | No | KEEP |
| 4 | `AnnouncementBanner` | `src/components/layout/AnnouncementBanner.tsx` | Dismissible alert banner with localStorage persistence | `__root.tsx` | Web | No | KEEP |
| 5 | `LanguageToggle` | `src/components/layout/LanguageToggle.tsx` | EN/ES toggle button with i18next | `SiteNav` | Web | No | KEEP |
| 6 | `NotFound` | `src/components/layout/NotFound.tsx` | Custom 404 page with quick links + search hint | `router.tsx` as `notFoundComponent` | Web | No | KEEP |

---

## Home Components (6)

| # | Component | File Path | Purpose | Used In | Platform | Duplicate? | Recommendation |
|---|-----------|-----------|---------|---------|----------|------------|----------------|
| 1 | `HeroBanner` | `src/components/home/HeroBanner.tsx` | Cinematic hero with WebP picture sources, parallax, stat counters, CTA | `index.tsx` | Web | No | KEEP |
| 2 | `QuickServices` | `src/components/home/QuickServices.tsx` | 8-card service grid with scroll reveals | `index.tsx` | Web | No | KEEP |
| 3 | `DepartmentCategories` | `src/components/home/DepartmentCategories.tsx` | 6 category cards with color-coded badges | `index.tsx` | Web | No | KEEP |
| 4 | `CommunityHighlights` | `src/components/home/CommunityHighlights.tsx` | 3 tourism/regional attraction cards | `index.tsx` | Web | No | KEEP |
| 5 | `NewsSection` | `src/components/home/NewsSection.tsx` | Editorial news layout with featured first item | `index.tsx` | Web | No | KEEP |
| 6 | `AboutSection` | `src/components/home/AboutSection.tsx` | "Where Tennessee Began" section with courthouse photos | `index.tsx` | Web | No | KEEP |

---

## Department Components (2)

| # | Component | File Path | Purpose | Used In | Platform | Duplicate? | Recommendation |
|---|-----------|-----------|---------|---------|----------|------------|----------------|
| 1 | `DepartmentCard` | `src/components/departments/DepartmentCard.tsx` | Department listing card with category badge + phone | `departments/index.tsx` | Web | No | KEEP |
| 2 | `DepartmentDetail` | `src/components/departments/DepartmentDetail.tsx` | Full department page with banner, contacts, staff, services, FAQs | `departments/$slug.tsx` | Web | No | KEEP |

---

## Commissioner Components (2)

| # | Component | File Path | Purpose | Used In | Platform | Duplicate? | Recommendation |
|---|-----------|-----------|---------|---------|----------|------------|----------------|
| 1 | `CommissionerGrid` | `src/components/commissioners/CommissionerGrid.tsx` | District-grouped grid layout | `commissioners.tsx` | Web | No | KEEP |
| 2 | `CommissionerCard` | `src/components/commissioners/CommissionerCard.tsx` | Individual commissioner with photo, name, district, contact | `CommissionerGrid` | Web | No | KEEP |

---

## News Components (2)

| # | Component | File Path | Purpose | Used In | Platform | Duplicate? | Recommendation |
|---|-----------|-----------|---------|---------|----------|------------|----------------|
| 1 | `NewsCard` | `src/components/shared/NewsCard.tsx` | News article card with date, summary, PDF badge | `news/index.tsx`, `NewsSection` | Web | No | KEEP |
| 2 | `NewsDetail` | `src/components/news/NewsDetail.tsx` | Full article with header, body, PDF/source links | `news/$slug.tsx` | Web | No | KEEP |

> **Note:** `NewsCard` is housed in `src/components/shared/` but conceptually part of the News domain. It is also listed under Shared/Utility below for directory completeness.

---

## History / Heritage Components (5)

| # | Component | File Path | Purpose | Used In | Platform | Duplicate? | Recommendation |
|---|-----------|-----------|---------|---------|----------|------------|----------------|
| 1 | `HeritageHero` | `src/components/history/HeritageHero.tsx` | Hero with brand tagline + year date device | 12+ route files | Web | No | KEEP |
| 2 | `HistoryNarrative` | `src/components/history/HistoryNarrative.tsx` | Editorial content section with eyebrow/title/body | `history/index.tsx`, about, economic-development, etc. | Web | No | KEEP |
| 3 | `HeritageSiteCard` | `src/components/history/HeritageSiteCard.tsx` | Heritage site card with NRHP/NHL badges | `history/index.tsx` | Web | No | KEEP |
| 4 | `TimelineSection` | `src/components/history/TimelineSection.tsx` | Alternating vertical timeline with colored era dots | `history/timeline.tsx` | Web | No | KEEP |
| 5 | `VisitorInfoCard` | `src/components/history/VisitorInfoCard.tsx` | Visitor info sidebar (hours, admission, location, website) | `history/$slug.tsx` | Web | No | KEEP |

---

## Community Components (1)

| # | Component | File Path | Purpose | Used In | Platform | Duplicate? | Recommendation |
|---|-----------|-----------|---------|---------|----------|------------|----------------|
| 1 | `CommunityCard` | `src/components/communities/CommunityCard.tsx` | Community card with type badge, population, highlights | `communities/index.tsx` | Web | No | KEEP |

---

## People Components (1)

| # | Component | File Path | Purpose | Used In | Platform | Duplicate? | Recommendation |
|---|-----------|-----------|---------|---------|----------|------------|----------------|
| 1 | `PersonCard` | `src/components/people/PersonCard.tsx` | Notable person card with category badge + achievement | `people.tsx` | Web | No | KEEP |

---

## Form Components (2)

| # | Component | File Path | Purpose | Used In | Platform | Duplicate? | Recommendation |
|---|-----------|-----------|---------|---------|----------|------------|----------------|
| 1 | `FormLayout` | `src/components/forms/FormLayout.tsx` | Form page wrapper with loading/error states | `forms/$type.tsx` | Web | No | KEEP |
| 2 | `FormField` | `src/components/forms/FormField.tsx` | Reusable form input with label, help text, error (`role="alert"`) | `FormLayout` | Web | No | KEEP |

---

## Minutes Components (2)

| # | Component | File Path | Purpose | Used In | Platform | Duplicate? | Recommendation |
|---|-----------|-----------|---------|---------|----------|------------|----------------|
| 1 | `MinutesList` | `src/components/minutes/MinutesList.tsx` | Year-grouped meeting minutes with expand/collapse | `minutes.tsx` | Web | No | KEEP |
| 2 | `MinutesFilter` | `src/components/minutes/MinutesFilter.tsx` | Committee filter chips with `aria-pressed` | `minutes.tsx` | Web | No | KEEP |

---

## Admin Components (2)

| # | Component | File Path | Purpose | Used In | Platform | Duplicate? | Recommendation |
|---|-----------|-----------|---------|---------|----------|------------|----------------|
| 1 | `AdminLayout` | `src/components/admin/AdminLayout.tsx` | Admin sidebar + mobile nav with auth-aware links | All `admin/` routes | Web | No | KEEP |
| 2 | `StatusBadge` | `src/components/admin/StatusBadge.tsx` | Colored status badge (new/reviewed/resolved) | `admin/submissions.tsx` | Web | No | KEEP |

---

## Shared / Utility Components (4)

| # | Component | File Path | Purpose | Used In | Platform | Duplicate? | Recommendation |
|---|-----------|-----------|---------|---------|----------|------------|----------------|
| 1 | `NewsCard` | `src/components/shared/NewsCard.tsx` | News article card with date, summary, PDF badge | `news/index.tsx`, `NewsSection` | Web | No | KEEP (cross-referenced from News) |
| 2 | `ContactCard` | `src/components/shared/ContactCard.tsx` | Reusable contact info card with photo | `DepartmentDetail`, `contact.tsx` | Web | No | KEEP |
| 3 | `MountainDivider` | `src/components/shared/MountainDivider.tsx` | SVG mountain ridge section divider | 15+ routes | Web | No | KEEP |
| 4 | `VideoEmbed` | `src/components/shared/VideoEmbed.tsx` | Privacy-enhanced YouTube click-to-load player | `calendar.tsx`, `employee-services.tsx` | Web | No | KEEP |

---

## UI Primitives — shadcn/ui (3)

All authenticated through `components.json` registry.

| # | Component | File Path | Purpose | Used In | Platform | Duplicate? | Recommendation |
|---|-----------|-----------|---------|---------|----------|------------|----------------|
| 1 | `Badge` | `src/components/ui/badge.tsx` | Styled badge component | `DepartmentCard`, `HeritageSiteCard`, etc. | Web | No | KEEP (shadcn) |
| 2 | `Button` | `src/components/ui/button.tsx` | Styled button component | Forms, admin | Web | No | KEEP (shadcn) |
| 3 | `Card` | `src/components/ui/card.tsx` | Styled card component | Throughout | Web | No | KEEP (shadcn) |

---

## Hooks (3)

*Reusable logic, not components, documented here for completeness.*

| # | Hook | File Path | Purpose | Used In | Platform | Recommendation |
|---|------|-----------|---------|---------|----------|----------------|
| 1 | `useScrollReveal` | `src/hooks/useScrollReveal.ts` | Intersection Observer scroll-reveal | 20+ components | Web | KEEP |
| 2 | `useCountUp` | `src/hooks/useCountUp.ts` | Animated stat counter | `HeroBanner` | Web | KEEP |
| 3 | `useLocale` | `src/hooks/useLocale.ts` | Locale get/set from i18next | `LanguageToggle` | Web | KEEP |

---

## Component Usage Audit

| Question | Answer |
|----------|--------|
| Duplicate components? | **None found.** Each component serves a distinct purpose. |
| Merge or rename candidates? | **None.** No overlapping responsibilities. |
| Removal candidates? | **None.** All 37 are in active use. |
| shadcn/ui primitives authenticated? | **Yes.** `Badge`, `Button`, `Card` are registered via `components.json`. |

---

## Recommended Future Use

When building new features, follow this precedence order:

| Priority | Use Case | Existing Component(s) |
|----------|----------|----------------------|
| 1 | Any page needing a brand hero | `HeritageHero` |
| 2 | Long-form content sections | `HistoryNarrative` |
| 3 | Section separation | `MountainDivider` |
| 4 | Card-based content listings | `NewsCard` |
| 5 | Staff/official profile displays | `ContactCard` |
| 6 | Forms | `FormField` + `FormLayout` |
| 7 | Status indicators | `StatusBadge` |
| 8 | New UI elements | shadcn/ui primitives (`Badge`, `Button`, `Card`) |

**Rule:** Do not create new card, hero, layout, or form components without first exhausting existing options. Layout components (`SiteNav`, `SiteFooter`, `SearchDialog`, `NotFound`) should be reused via `__root.tsx` and `router.tsx` — never duplicated.
