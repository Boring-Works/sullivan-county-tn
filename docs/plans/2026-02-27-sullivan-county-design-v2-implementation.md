# Sullivan County Design V2 — "Appalachian Editorial" Implementation Plan

> **Status: COMPLETED** — All 14 tasks implemented and deployed.

**Goal:** Transform the Sullivan County site from a competent template into a visually stunning, scroll-driven editorial experience with cinematic hero, mountain silhouette dividers, animated stat counters, and consistent scroll-reveal animations.

**Architecture:** Add a `useScrollReveal` hook (Intersection Observer) and a `useCountUp` hook for stat counters. Create shared SVG mountain divider components. Download one hero image to `public/`. Modify existing homepage components to use scroll-reveal + new visual treatments. No new libraries — pure React hooks + CSS.

**Tech Stack:** React 19, TanStack Start/Router, Tailwind CSS v4, Intersection Observer API, inline SVGs.

---

### Task 1: Download Hero Image to public/

**Files:**
- Create: `public/hero-mountains.jpg`

**Step 1: Download an Appalachian mountains landscape from Unsplash**

Run:
```bash
curl -L "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80&fm=jpg" -o public/hero-mountains.jpg
```

This is a dramatic mountain ridgeline at dawn/dusk — free Unsplash license.

**Step 2: Verify the image exists and is reasonable size**

Run: `ls -lh public/hero-mountains.jpg`
Expected: File exists, ~100-300 KB (1920px wide, JPEG quality 80).

**Step 3: Commit**

```bash
git add public/hero-mountains.jpg
git commit -m "assets: add hero mountain landscape image"
```

---

### Task 2: Create useScrollReveal Hook

**Files:**
- Create: `src/hooks/useScrollReveal.ts`

**Context:** This hook observes all elements with `data-reveal` in a container ref. When they scroll into view (threshold 0.15), it adds the `revealed` class. Supports staggered delays via `data-reveal-delay`.

**Step 1: Create the hook**

```typescript
import { useEffect, useRef } from "react";

export function useScrollReveal<T extends HTMLElement = HTMLElement>() {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll("[data-reveal]");
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.revealDelay || "0";
            setTimeout(() => {
              el.classList.add("revealed");
            }, Number(delay));
            observer.unobserve(el);
          }
        }
      },
      { threshold: 0.15 },
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return containerRef;
}
```

**Step 2: Add CSS classes for reveal animations to `src/styles/app.css`**

Append after the `.card-lift:hover` block:

```css
/* Scroll-reveal animation system */
[data-reveal] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
[data-reveal].revealed {
  opacity: 1;
  transform: translateY(0);
}
[data-reveal="slide-left"] {
  transform: translateX(-24px);
}
[data-reveal="slide-left"].revealed {
  transform: translateX(0);
}
[data-reveal="scale"] {
  transform: scale(0.95);
}
[data-reveal="scale"].revealed {
  transform: scale(1);
}
```

**Step 3: Verify the file compiles**

Run: `npx biome check src/hooks/useScrollReveal.ts`
Expected: No errors.

**Step 4: Commit**

```bash
git add src/hooks/useScrollReveal.ts src/styles/app.css
git commit -m "feat: add useScrollReveal hook and reveal CSS classes"
```

---

### Task 3: Create useCountUp Hook

**Files:**
- Create: `src/hooks/useCountUp.ts`

**Context:** Animated counter that counts from 0 to a target number when scrolled into view. Uses Intersection Observer + requestAnimationFrame.

**Step 1: Create the hook**

```typescript
import { useCallback, useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export function useCountUp({ end, duration = 2000, suffix = "", prefix = "" }: UseCountUpOptions) {
  const [value, setValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const animate = useCallback(() => {
    const start = performance.now();
    function step(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }, [end, duration]);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasStarted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted, animate]);

  const display = `${prefix}${value.toLocaleString()}${suffix}`;

  return { ref, display, value };
}
```

**Step 2: Verify lint**

Run: `npx biome check src/hooks/useCountUp.ts`
Expected: No errors.

**Step 3: Commit**

```bash
git add src/hooks/useCountUp.ts
git commit -m "feat: add useCountUp hook for animated stat counters"
```

---

### Task 4: Create Mountain Silhouette SVG Divider Components

**Files:**
- Create: `src/components/shared/MountainDivider.tsx`

**Context:** Two SVG mountain ridge dividers. `MountainDivider` renders peaks pointing DOWN (placed at bottom of a section, colored in the NEXT section's background). `MountainDividerInverted` renders peaks pointing UP (placed at top of a section, colored in the PREVIOUS section's background). Both are full-width, ~80-120px tall.

**Step 1: Create the component**

```tsx
import { cn } from "~/lib/utils";

interface MountainDividerProps {
  className?: string;
  fill?: string;
}

/**
 * Peaks point DOWN — place at the bottom of a section.
 * `fill` should match the NEXT section's background color.
 */
export function MountainDivider({ className, fill = "var(--color-brand-cream)" }: MountainDividerProps) {
  return (
    <div className={cn("relative w-full overflow-hidden leading-[0]", className)}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block w-full h-[80px] sm:h-[100px] lg:h-[120px]"
        aria-hidden="true"
      >
        <path
          d="M0,120 L0,60 Q120,10 240,50 T480,30 Q600,0 720,40 T960,20 Q1080,5 1200,45 T1440,25 L1440,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

/**
 * Peaks point UP — place at the top of a section.
 * `fill` should match the PREVIOUS section's background color.
 */
export function MountainDividerInverted({ className, fill = "var(--color-brand-cream)" }: MountainDividerProps) {
  return (
    <div className={cn("relative w-full overflow-hidden leading-[0]", className)}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block w-full h-[80px] sm:h-[100px] lg:h-[120px]"
        aria-hidden="true"
      >
        <path
          d="M0,0 L0,60 Q120,110 240,70 T480,90 Q600,120 720,80 T960,100 Q1080,115 1200,75 T1440,95 L1440,0 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
```

**Step 2: Lint check**

Run: `npx biome check src/components/shared/MountainDivider.tsx`
Expected: No errors.

**Step 3: Commit**

```bash
git add src/components/shared/MountainDivider.tsx
git commit -m "feat: add MountainDivider SVG section divider components"
```

---

### Task 5: Redesign HeroBanner — Cinematic with Image + Parallax + Stats

**Files:**
- Modify: `src/components/home/HeroBanner.tsx`

**Context:** Replace the current CSS-gradient hero with a full-viewport cinematic hero. Key changes:
- Background `<img>` of `hero-mountains.jpg` with `object-fit: cover`
- Dark navy gradient overlay (bottom-to-top) for text readability
- Parallax scroll effect using `--scroll-y` CSS custom property
- Animated stat counters: 156K residents, 430 sq mi, 27 depts, Est. 1779
- Mountain silhouette SVG divider at the bottom (replaces the linear gradient fade)
- Keep the existing typography stack (already good: large serif, brass "County", badge)

**Step 1: Rewrite HeroBanner.tsx**

```tsx
import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { MountainDivider } from "~/components/shared/MountainDivider";
import { useCountUp } from "~/hooks/useCountUp";

function StatCounter({
  end,
  suffix,
  label,
}: {
  end: number;
  suffix?: string;
  label: string;
}) {
  const { ref, display } = useCountUp({ end, suffix, duration: 2200 });
  return (
    <div className="text-center">
      <div ref={ref} className="font-display text-3xl font-bold text-white sm:text-4xl">
        {display}
      </div>
      <div className="mt-1 font-body text-xs font-medium tracking-widest uppercase text-white/50">
        {label}
      </div>
    </div>
  );
}

export function HeroBanner() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleScroll() {
      if (heroRef.current) {
        heroRef.current.style.setProperty("--scroll-y", `${window.scrollY}`);
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-brand-navy">
      {/* Background image with parallax */}
      <img
        src="/hero-mountains.jpg"
        alt=""
        width={1920}
        height={1080}
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: "translateY(calc(var(--scroll-y, 0) * 0.3px))" }}
      />

      {/* Dark overlay — gradient from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/80 to-brand-navy/40" />

      {/* Topo texture overlay */}
      <div className="absolute inset-0 bg-topo-pattern" />

      {/* Grain */}
      <div className="bg-grain absolute inset-0" />

      {/* Brass accent line — top */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-brass to-transparent opacity-40" />

      {/* Content — asymmetric left-aligned */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          {/* Established badge */}
          <div className="mb-8 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="inline-flex items-center gap-2 border border-brand-brass/30 rounded-full px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-brand-brass backdrop-blur-sm">
              <span className="block h-1.5 w-1.5 rounded-full bg-brand-brass" />
              Established 1779
            </span>
          </div>

          {/* County name */}
          <h1
            className="font-display text-6xl font-bold tracking-tight text-white leading-[1.05] opacity-0 animate-fade-up sm:text-7xl lg:text-[8rem]"
            style={{ animationDelay: "0.2s" }}
          >
            Sullivan
            <br />
            <span className="text-brand-brass/90">County</span>
          </h1>

          {/* State */}
          <p
            className="mt-4 font-body text-lg font-light tracking-[0.25em] uppercase text-white/50 opacity-0 animate-fade-up sm:text-xl"
            style={{ animationDelay: "0.35s" }}
          >
            Tennessee
          </p>

          {/* Divider */}
          <div
            className="mt-8 h-px w-32 origin-left bg-gradient-to-r from-brand-copper to-brand-brass/40 opacity-0 animate-line-grow"
            style={{ animationDelay: "0.45s" }}
          />

          {/* Tagline */}
          <p
            className="mt-8 max-w-xl text-lg leading-relaxed text-white/70 opacity-0 animate-fade-up sm:text-xl"
            style={{ animationDelay: "0.55s" }}
          >
            Second oldest county in Tennessee. Serving the Appalachian Highlands.
          </p>

          {/* CTAs */}
          <div
            className="mt-12 flex flex-col gap-4 opacity-0 animate-fade-up sm:flex-row sm:gap-5"
            style={{ animationDelay: "0.7s" }}
          >
            <Link
              to="/departments"
              className="group inline-flex items-center gap-3 rounded-sm bg-brand-copper px-7 py-3.5 font-body text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-brand-copper-light hover:shadow-lg hover:shadow-brand-copper/20"
            >
              Find a Department
              <svg aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <title>Arrow</title>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href="https://sullivantntrustee.gov/property-tax/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-sm border border-white/20 px-7 py-3.5 font-body text-sm font-medium tracking-wide text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-brand-brass/50 hover:text-brand-brass hover:bg-white/5"
            >
              Pay Property Taxes
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-sm border border-white/20 px-7 py-3.5 font-body text-sm font-medium tracking-wide text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-brand-brass/50 hover:text-brand-brass hover:bg-white/5"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Vertical text */}
        <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2">
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: "1s", writingMode: "vertical-rl" }}>
            <span className="text-xs font-body font-light tracking-[0.4em] uppercase text-white/15">
              Appalachian Highlands
            </span>
          </div>
        </div>
      </div>

      {/* Stat counters */}
      <div className="absolute bottom-32 sm:bottom-36 left-0 right-0 z-10">
        <div className="mx-auto max-w-3xl px-6">
          <div
            className="grid grid-cols-2 gap-6 sm:grid-cols-4 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.9s" }}
          >
            <StatCounter end={156000} suffix="+" label="Residents" />
            <StatCounter end={430} label="Square Miles" />
            <StatCounter end={27} label="Departments" />
            <StatCounter end={1779} label="Established" />
          </div>
        </div>
      </div>

      {/* Mountain silhouette divider — replaces gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <MountainDivider fill="var(--color-brand-cream)" />
      </div>
    </section>
  );
}
```

**Step 2: Lint + build test**

Run: `npx biome check --write src/components/home/HeroBanner.tsx && npm run build`
Expected: Clean lint, successful build.

**Step 3: Commit**

```bash
git add src/components/home/HeroBanner.tsx
git commit -m "feat: cinematic hero with photo parallax, stat counters, mountain divider"
```

---

### Task 6: Add Mountain Dividers to Homepage + Scroll Reveals to QuickServices

**Files:**
- Modify: `src/routes/index.tsx`
- Modify: `src/components/home/QuickServices.tsx`

**Context:** Wire mountain dividers between homepage sections. Add `useScrollReveal` to QuickServices cards for staggered entrance.

**Step 1: Update `src/routes/index.tsx`**

Add `MountainDivider` / `MountainDividerInverted` between sections:

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { DepartmentCategories } from "~/components/home/DepartmentCategories";
import { HeroBanner } from "~/components/home/HeroBanner";
import { NewsSection } from "~/components/home/NewsSection";
import { QuickServices } from "~/components/home/QuickServices";
import { MountainDivider, MountainDividerInverted } from "~/components/shared/MountainDivider";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <main>
      <HeroBanner />
      <QuickServices />
      <MountainDivider fill="var(--color-brand-parchment)" />
      <DepartmentCategories />
      <MountainDividerInverted fill="var(--color-brand-parchment)" className="bg-white" />
      <NewsSection />
    </main>
  );
}
```

**Step 2: Add scroll reveal to QuickServices**

In `QuickServices.tsx`, import and use `useScrollReveal`. Add `data-reveal` and `data-reveal-delay` attributes to each card wrapper. Remove the existing `opacity-0 animate-fade-up` inline animation — replace with the reveal system.

Key changes to the card rendering loop:
- Wrap the grid in a ref from `useScrollReveal`
- Each card wrapper (the `<a>` or `<Link>`) gets `data-reveal` and `data-reveal-delay={index * 60}`
- Remove the existing `style={{ animationDelay }}` and `opacity-0 animate-fade-up` classes
- Icon circle background: change from `bg-brand-navy/5` to a circle with topo pattern using a small inline SVG or `bg-[radial-gradient(...)]` utility

**Step 3: Lint + build**

Run: `npx biome check --write src/routes/index.tsx src/components/home/QuickServices.tsx && npm run build`

**Step 4: Commit**

```bash
git add src/routes/index.tsx src/components/home/QuickServices.tsx
git commit -m "feat: add mountain dividers between homepage sections, scroll reveals on service cards"
```

---

### Task 7: Scroll Reveals on DepartmentCategories + Thicker Category Borders

**Files:**
- Modify: `src/components/home/DepartmentCategories.tsx`

**Context:** Add `useScrollReveal` for staggered card entrances. Make the left border accent 5px (currently 4px via `border-l-4`). Add more generous padding. Stronger hover state.

**Step 1: Import `useScrollReveal`, wrap grid, add `data-reveal` + `data-reveal-delay` to each card Link.**

Change `border-l-4` to use a custom left border width — Tailwind `border-l-[5px]`.

Increase padding from `p-7` to `p-8`.

Add a stronger hover shadow: `hover:shadow-lg`.

**Step 2: Lint + build**

Run: `npx biome check --write src/components/home/DepartmentCategories.tsx && npm run build`

**Step 3: Commit**

```bash
git add src/components/home/DepartmentCategories.tsx
git commit -m "feat: scroll reveals + thicker borders on department category cards"
```

---

### Task 8: News Section — Editorial Layout (Featured First Item)

**Files:**
- Modify: `src/components/home/NewsSection.tsx`
- Modify: `src/components/shared/NewsCard.tsx`

**Context:** The first news item should be "featured" — spanning 2 columns on desktop with a bigger title and more visual weight. The remaining items sit in single columns.

**Step 1: Update NewsSection.tsx**

Change the grid from `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` to `grid-cols-1 lg:grid-cols-3`. The first item gets `lg:col-span-2 lg:row-span-1` class. Pass a `featured` prop to `NewsCard`.

Add `useScrollReveal` with `data-reveal` on each card.

**Step 2: Update NewsCard.tsx**

Add an optional `featured?: boolean` prop. When `featured` is true:
- Title uses `text-2xl` instead of `text-lg`
- Padding increases to `p-8`
- Summary text uses `text-base` instead of `text-sm`

**Step 3: Lint + build**

Run: `npx biome check --write src/components/home/NewsSection.tsx src/components/shared/NewsCard.tsx && npm run build`

**Step 4: Commit**

```bash
git add src/components/home/NewsSection.tsx src/components/shared/NewsCard.tsx
git commit -m "feat: editorial news layout with featured first item"
```

---

### Task 9: Navigation — Glass-Morphism + Mega-Menu Animation

**Files:**
- Modify: `src/components/layout/SiteNav.tsx`

**Context:** The nav already transitions transparent→solid on scroll. Upgrade to glass-morphism (backdrop-blur + semi-transparent). Add mega-menu entry animation. Mobile overlay with staggered reveals.

**Step 1: Update SiteNav.tsx**

Scrolled state: Change from `bg-white/95 backdrop-blur-md` → `bg-white/80 backdrop-blur-lg` (more glass effect).

Mega-menu: Add `animate-scale-in` class to the dropdown panel (the one with `shadow-2xl`). This uses the existing CSS keyframe for scale 0.95→1.0 + fade.

Mobile overlay: Change from `bg-white` to `bg-brand-navy` with `text-white` links. Each nav link gets staggered animation — use inline `style={{ animationDelay: `${index * 0.06}s` }}` with the existing `animate-slide-in-right` class.

**Step 2: Lint + build**

Run: `npx biome check --write src/components/layout/SiteNav.tsx && npm run build`

**Step 3: Commit**

```bash
git add src/components/layout/SiteNav.tsx
git commit -m "feat: glass-morphism nav, mega-menu animation, navy mobile overlay"
```

---

### Task 10: Footer — Mountain Silhouette + Enhanced Heritage

**Files:**
- Modify: `src/components/layout/SiteFooter.tsx`

**Context:** Add an inverted mountain silhouette SVG at the top of the footer (peaks pointing up into the content above). Increase topo pattern visibility. Add decorative brass diamond ornament to "Our Heritage" column.

**Step 1: Update SiteFooter.tsx**

Add `<MountainDividerInverted fill="var(--color-brand-navy)" />` at the very top of the `<footer>`, before the existing content.

In the topo pattern div: change `opacity-100` → keep as-is but add a second layer or increase the SVG stroke opacity in the inline SVG.

In the "Our Heritage" column: add a decorative `<div>` after the heading that is a small brass diamond — a `<span className="inline-block h-2 w-2 rotate-45 bg-brand-brass/60 mr-2" />` inside a horizontal rule line.

**Step 2: Lint + build**

Run: `npx biome check --write src/components/layout/SiteFooter.tsx && npm run build`

**Step 3: Commit**

```bash
git add src/components/layout/SiteFooter.tsx
git commit -m "feat: footer mountain silhouette, brass diamond ornament"
```

---

### Task 11: Department Detail — Category Banner + Zebra Table

**Files:**
- Modify: `src/components/departments/DepartmentDetail.tsx`

**Context:** Add a subtle tinted banner behind the department name using the category's color. Add zebra striping to the staff directory table.

**Step 1: Update DepartmentDetail.tsx**

Add a category-colored header background: a full-width `<div>` behind the header area with a very faint category color (e.g., `bg-[#6b4c8a]/5` for courts). Use a `categoryBgColors` record similar to the existing `categoryColors`.

Staff table: add `even:bg-brand-parchment/50` to the `<tr>` className.

**Step 2: Lint + build**

Run: `npx biome check --write src/components/departments/DepartmentDetail.tsx && npm run build`

**Step 3: Commit**

```bash
git add src/components/departments/DepartmentDetail.tsx
git commit -m "feat: category-tinted header banner, zebra-striped staff table"
```

---

### Task 12: Commissioner Page — Alternating Backgrounds + Scroll Reveals

**Files:**
- Modify: `src/components/commissioners/CommissionerGrid.tsx`

**Context:** District sections alternate between cream and parchment backgrounds (instead of divider lines between them). Cards get scroll-reveal entrance.

**Step 1: Update CommissionerGrid.tsx**

Import `useScrollReveal`. Wrap the container in the hook's ref.

Each district `<section>` alternates background: even districts get `bg-brand-parchment rounded-sm p-6 -mx-4 sm:-mx-6`, odd districts keep default (cream). Remove the `<div className="divider-heritage">` separator between districts.

Each `CommissionerCard` wrapper gets `data-reveal` and `data-reveal-delay`.

**Step 2: Lint + build**

Run: `npx biome check --write src/components/commissioners/CommissionerGrid.tsx && npm run build`

**Step 3: Commit**

```bash
git add src/components/commissioners/CommissionerGrid.tsx
git commit -m "feat: alternating district backgrounds, scroll reveals on commissioner cards"
```

---

### Task 13: Final Build + Lint + Deploy

**Files:** None new — verification only.

**Step 1: Full lint**

Run: `npx biome check --write .`
Expected: No errors (or auto-fixed).

**Step 2: Production build**

Run: `npm run build`
Expected: Clean build, no errors, all routes compile.

**Step 3: Deploy to Cloudflare**

Run: `npx wrangler deploy`
Expected: Successful deployment to `https://sullivan-county-tn.codyboring.workers.dev`

**Step 4: Push to GitHub**

```bash
git push origin main
```

**Step 5: Verify live site**

Open `https://sullivan-county-tn.codyboring.workers.dev` and verify:
- Hero shows mountain photo with parallax on scroll
- Stat counters animate when scrolled into view
- Mountain silhouette dividers appear between sections
- Cards have staggered scroll-reveal animations
- Nav has glass-morphism effect when scrolled
- News section has featured large first item
- Footer has mountain silhouette at top

---

### Task 14: Update CLAUDE.md

**Files:**
- Modify: `CLAUDE.md`

**Step 1: Add Design V2 entries to the Decision Log and Key Components tables**

Add to Decision Log:
```
| Appalachian Editorial design v2 | Cinematic hero, scroll reveals, mountain dividers, glass nav | 2026-02-27 |
```

Add to Key Components:
```
| MountainDivider | `components/shared/MountainDivider.tsx` | SVG mountain ridge section dividers |
| useScrollReveal | `hooks/useScrollReveal.ts` | Intersection Observer scroll-reveal system |
| useCountUp | `hooks/useCountUp.ts` | Animated stat counter hook |
```

**Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md with design v2 components"
```
