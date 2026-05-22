# Component Inventory — Sullivan County TN

**Platform:** Web-only (TanStack Start on Cloudflare Workers)
**Refreshed:** 2026-05-21 (after civic-service foundation audit)
**Prepared with AI assistance.**

Current filesystem inventory: **73 component files**, including **51 site-specific components** and **22 shadcn/ui primitive files**.

---

## Layout (7)

| Component | File | Purpose |
|-----------|------|---------|
| `SiteNav` | `layout/SiteNav.tsx` | Five-verb primary nav (Find · Pay · Apply · Report · About). Each verb opens a mega-panel of concrete tasks. Hover-open gated to fine pointers, click-outside closes, arrow-key navigation. Mobile uses shadcn `<Sheet>`. |
| `SiteFooter` | `layout/SiteFooter.tsx` | Four-column footer with mountain SVG, county seal, links, copyright. |
| `SearchDialog` | `layout/SearchDialog.tsx` | Fuse.js fuzzy search inside shadcn `<CommandDialog>` (Cmd+K). Citizen-language aliases, direct document results, direct task results, keyboard-native arrow/Enter/Escape behavior, and safe-area-aware mobile positioning. Lazy-loaded and live-verified at mobile/tablet/desktop widths. |
| `AnnouncementBanner` | `layout/AnnouncementBanner.tsx` | Reads from D1 via `listPublicAnnouncements`. Sets `--banner-height` so SiteNav offsets correctly. localStorage dismissal. **Live row seeded** for Memorial Day. |
| `LanguageToggle` | `layout/LanguageToggle.tsx` | EN/ES toggle, persists via cookie. |
| `MobileBottomTabBar` | `layout/MobileBottomTabBar.tsx` | Three-action thumb-zone bar at <md: Pay · Search · Call. Hides on soft keyboard. |
| `NotFound` | `layout/NotFound.tsx` | Branded 404 with quick links + search hint. |

---

## Home (6)

| Component | File | Purpose |
|-----------|------|---------|
| `HeroBanner` | `home/HeroBanner.tsx` | Citizen-first hero with task search, top task cards, secondary links, and one county-status panel containing office status, next meeting, emergency contact, and **WeatherBadge**. |
| `WeatherBadge` | `shared/WeatherBadge.tsx` | Compact "[temp]°F · [condition]" pill in the county-status panel. Pulses copper on Severe NWS alert. Auto-refreshes every 5 minutes client-side. Links to `/weather`. |
| `SeasonalRibbon` | `home/SeasonalRibbon.tsx` | Date-aware banner. Visible Oct 1 – Mar 1 only. Links to `/property-taxes`. |
| `TodaySection` | `home/TodaySection.tsx` | Below-fold service/update/emergency section with cards for common citizen needs. |
| `CommunityMap` | `home/CommunityMap.tsx` | Interactive 6-community SVG map (US Census TIGER/Line projection). |
| `AboutSection` | `home/AboutSection.tsx` | "Where Tennessee Began" section with courthouse photos. CTAs use shadcn `<Button>`. |

Legacy unmounted homepage components that were no longer useful on `/` were removed during the 2026-05-21 review.

---

## Weather (2)

| Component | File | Purpose |
|-----------|------|---------|
| `CopperWeathervane` | `weather/CopperWeathervane.tsx` | Animated copper compass-rose SVG. Rotates with live wind direction from NWS, handles calm/unknown wind, and displays 16-point compass labels. |
| River condition cards | `routes/weather.tsx` | USGS-powered cards for Beaver Creek, South Fork Holston, and North Fork Holston with flow, gauge height, trend, timestamp, and official source links. |

---

## Departments (3)

| Component | File | Purpose |
|-----------|------|---------|
| `DepartmentCard` | `departments/DepartmentCard.tsx` | Listing card with category badge, phone (TelLink), Open-Now pill. |
| `DepartmentDetail` | `departments/DepartmentDetail.tsx` | Full dept page: navy hero, **breadcrumb**, contacts, staff, services, FAQs, publications. **"Last reviewed [date]"** stamp at the footer. |
| `PrintableContactCard` | `departments/PrintableContactCard.tsx` | Print-only contact card with QR code linking back to the live page. |

---

## Property taxes (1)

| Component | File | Purpose |
|-----------|------|---------|
| `ParcelLookup` | `property-taxes/ParcelLookup.tsx` | Single-box typeahead. Calls `lookupParcelSuggestions` (TPAD autocomplete proxy). Three side-by-side **shadcn `<Button>` CTAs** — TPAD assessment / Trustee payment / ArcGIS map. ARIA combobox + listbox, debounced 280ms. |

---

## Commissioners (2)

| Component | File | Purpose |
|-----------|------|---------|
| `CommissionerGrid` | `commissioners/CommissionerGrid.tsx` | District-grouped grid layout. |
| `CommissionerCard` | `commissioners/CommissionerCard.tsx` | Individual card with photo (User-icon fallback for missing), name, district, contact, vCard "Save Contact" download. |

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
| `NewsDetail` | `news/NewsDetail.tsx` | Full article view with **breadcrumb**, header, body. Renders `htmlContent` from D1 with `dangerouslySetInnerHTML` (pre-sanitized via `sanitize-html` on ingest) when present; falls back to `content` array. |

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
| `FormField` | `forms/FormField.tsx` | Legacy hand-rolled field (post-migration `/forms/$type` uses shadcn primitives directly via a `<DynamicField>` inline component — `FormField.tsx` retained as fallback / future use). |

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
| `AdminLayout` | `admin/AdminLayout.tsx` | Admin sidebar + mobile nav with auth-aware links. (To be replaced by shadcn `<Sidebar>` in admin overhaul phase.) |
| `StatusBadge` | `admin/StatusBadge.tsx` | Submission status badge — uses shadcn `<Badge variant="outline">` with brand-aligned palette (sage = resolved/published, stone = draft/archived, blue = new, amber = reviewed). |

---

## Shared (10)

| Component | File | Purpose |
|-----------|------|---------|
| `TelLink` | `shared/TelLink.tsx` | Normalizes phone numbers to `tel:+1XXXXXXXXXX`. Used everywhere a phone number is rendered. |
| `OpenStatusPill` | `shared/OpenStatusPill.tsx` | Live "Open until 4:30 PM" / "Closed · Holiday" pill via `useOpenStatus(hours)`. |
| `PageFeedback` | `shared/PageFeedback.tsx` | "Was this page helpful?" widget with hidden idempotency key and public receipt ID. shadcn `<Button>` + `<Textarea>`. Mounted on dept detail / forms / contact / property-taxes. |
| `OfflineBanner` | `shared/OfflineBanner.tsx` | `navigator.onLine` listener. Fixed top bar, brand-copper styling, safe-area-aware. |
| `DetailBreadcrumb` | `shared/DetailBreadcrumb.tsx` | Wraps shadcn Breadcrumb with brand-themed `<Link>` items. Mounted on all 5 detail page types. |
| `ContactCard` | `shared/ContactCard.tsx` | Reusable contact info card with vCard download. |
| `InstallPrompt` | `shared/InstallPrompt.tsx` | PWA install hint with iOS Safari-aware modal. |
| `MountainDivider` | `shared/MountainDivider.tsx` | Three-layer parallax mountain ridge SVG dividers. |
| `CountySeal` | `shared/CountySeal.tsx` | Official Sullivan County seal. SVG (47 KB) + raster fallbacks at 64/128/256/512px. |
| `VideoEmbed` | `shared/VideoEmbed.tsx` | Privacy-enhanced YouTube (click-to-load, nocookie). |
| `ExternalHandoffLink` | `shared/ExternalHandoffLink.tsx` | Reusable official external-system handoff link. Enforces new-tab noopener/noreferrer behavior and reads copy from `data/external-handoffs.ts`. |

---

## shadcn/ui primitives (22 files)

Installed via `pnpm dlx shadcn@latest add`. Theme overrides in `app.css` map shadcn vars to brand-navy / brand-copper / brand-cream with sharp 0.125rem radius.

| Primitive | File | Used by |
|---|---|---|
| `Accordion` | `ui/accordion.tsx` | `/property-taxes` FAQ, future dept FAQs |
| `Alert` | `ui/alert.tsx` | Reserved for inline severity notices |
| `Badge` | `ui/badge.tsx` | NewsCard, NewsDetail, DepartmentCard, DepartmentDetail, **StatusBadge** |
| `Breadcrumb` | `ui/breadcrumb.tsx` | `<DetailBreadcrumb>` wrapper |
| `Button` | `ui/button.tsx` | **Extended with `copper` and `navy` brand variants** + sharp 0.125rem radius. Used by all CTAs. |
| `Card` | `ui/card.tsx` | `/weather` 7-day forecast cards |
| `Command` | `ui/command.tsx` | Reserved for SearchDialog upgrade (Cmd+K palette) |
| `Dialog` | `ui/dialog.tsx` | (reserved) |
| `DropdownMenu` | `ui/dropdown-menu.tsx` | (reserved for admin) |
| `Form` | `ui/form.tsx` | `/contact`, `/admin/login`, `/forms/$type` |
| `Input` | `ui/input.tsx` | All form fields |
| `Label` | `ui/label.tsx` | All form fields (via `<FormLabel>`) |
| `ScrollArea` | `ui/scroll-area.tsx` | `/weather` hourly horizontal strip |
| `Select` | `ui/select.tsx` | `/contact` subject, `/forms/$type` select fields |
| `Separator` | `ui/separator.tsx` | (reserved) |
| `Sheet` | `ui/sheet.tsx` | Reserved for mobile drawer upgrade |
| `Skeleton` | `ui/skeleton.tsx` | WeatherBadge loading state |
| `Sonner` | `ui/sonner.tsx` | `<Toaster richColors position="bottom-right">` mounted in `__root.tsx` |
| `Table` | `ui/table.tsx` | Reserved for admin DataTable overhaul |
| `Tabs` | `ui/tabs.tsx` | (reserved) |
| `Textarea` | `ui/textarea.tsx` | `/contact`, `/forms/$type`, PageFeedback |
| `Tooltip` | `ui/tooltip.tsx` | `<TooltipProvider>` mounted in `__root.tsx` |

---

## Hooks (3)

| Hook | File | Purpose |
|------|------|---------|
| `useOpenStatus` | `hooks/useOpenStatus.ts` | Parses dept `contact.hours` strings and returns `{ isOpen, label, nextChange }`. Honors all 13 county holidays. SSR-safe. |
| `useScrollReveal` | `hooks/useScrollReveal.ts` | Intersection-observer scroll-reveal system **with 2.5s failsafe**. Adds `.js-reveal-armed` to `<html>` so `[data-reveal]` is visible by default — content never hides without JS. `prefers-reduced-motion: reduce` honored. |
| `useLocale` | `hooks/useLocale.ts` | Cookie-based locale toggle with `document.documentElement.lang` sync. |
