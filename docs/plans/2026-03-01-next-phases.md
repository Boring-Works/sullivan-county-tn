# Sullivan County — Next Phases

> **Status:** PLANNED — Not yet started. All prior phases are complete.

**Context:** The site is feature-complete and deployed. These are optional enhancements organized by priority.

---

## Phase 1: Performance Optimization (IMPORTANT)

### 1.1 Code Splitting
**Problem:** Main JS bundle is 502KB (155KB gzip). Vite warns about chunk size.
**Solution:** Split Fuse.js + search index into a lazy-loaded chunk via `React.lazy()` on SearchDialog. Only loads when user triggers Cmd+K.
**Impact:** ~50KB reduction in initial bundle.
**Files:** `components/layout/SearchDialog.tsx`, `data/search-index.ts`

### 1.2 Hero Images WebP/AVIF
**Problem:** Hero images are JPEG only. Modern formats would reduce size 40-60%.
**Solution:** Convert `boone-lake-*.jpg` to WebP/AVIF, update `<picture>` in HeroBanner to serve modern formats first with JPEG fallback.
**Files:** `public/images/hero/`, `components/home/HeroBanner.tsx`

### 1.3 Google Maps Click-to-Load
**Problem:** Google Maps iframe loads immediately on `/contact`, adding ~500KB of external resources even if user never interacts with map.
**Solution:** Replace iframe with a static map placeholder image + "Click to load map" button (same pattern as YouTube video embeds).
**Files:** `routes/contact.tsx`

---

## Phase 2: Accessibility Hardening (IMPORTANT)

### 2.1 Mega-Menu Keyboard Navigation
**Problem:** Department mega-menu only works with mouse hover. Keyboard users can't navigate categories.
**Solution:** Add arrow key navigation, Escape to close, focus trap within open menu.
**Files:** `components/layout/SiteNav.tsx`

### 2.2 Mobile Menu Focus Trap
**Problem:** When mobile hamburger menu is open, Tab can escape to content behind the menu overlay.
**Solution:** Trap focus inside mobile menu while open. Return focus to hamburger button on close.
**Files:** `components/layout/SiteNav.tsx`

### 2.3 Search Dialog ARIA
**Problem:** Cmd+K search dialog lacks proper ARIA attributes for screen readers.
**Solution:** Add `role="combobox"`, `aria-activedescendant`, `aria-expanded`, `aria-owns` to search input and results list.
**Files:** `components/layout/SearchDialog.tsx`

---

## Phase 3: Polish (NICE-TO-HAVE)

### 3.1 Image Lazy Loading
Add `loading="lazy"` to below-fold images (commissioner headshots, community highlights, courthouse photos).
**Files:** `CommissionerCard.tsx`, `CommunityHighlights.tsx`, `AboutSection.tsx`

### 3.2 Critical Route Preloading
Add `<link rel="modulepreload">` for homepage chunks to improve initial interaction time.
**Files:** `routes/__root.tsx`

### 3.3 Error Boundaries
Add per-route React error boundaries for graceful degradation instead of white screens.
**Files:** Each route file

### 3.4 Print Stylesheet
Add `@media print` rules for department pages and document listings — citizens may print these.
**Files:** `styles/app.css`

### 3.5 Cloudflare Web Analytics
Uncomment beacon in `__root.tsx` and add token from CF Dashboard. Free, privacy-friendly, no cookies.
**Files:** `routes/__root.tsx` (token needed from CF Dashboard)

---

## Priority Order

1. Code splitting (biggest performance win, easiest)
2. Mega-menu keyboard nav (accessibility compliance)
3. Mobile menu focus trap (accessibility compliance)
4. Hero images WebP/AVIF (performance)
5. Search dialog ARIA (accessibility)
6. Google Maps click-to-load (performance)
7. Everything in Phase 3 (incremental polish)
