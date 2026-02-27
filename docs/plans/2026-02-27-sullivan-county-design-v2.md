# Sullivan County Frontend Design V2 — "Appalachian Editorial"

**Goal:** Elevate the Sullivan County government site from competent-but-forgettable to the best-looking county government website around. Scroll-driven storytelling, cinematic hero, editorial layouts, mountain heritage elements.

**Approach:** Appalachian Editorial + Heritage Elements — premium editorial feel (NYT/WaPo) with Appalachian mountain silhouettes and topographic textures woven in as organic visual motifs.

**Constraints:** CSS-heavy (no heavy animation libraries), 1-2 hero images max, must stay credible for government, Intersection Observer for scroll reveals (no GSAP/Framer Motion).

---

## 1. Hero — Cinematic Full-Viewport

- Full-viewport height with a single dramatic Appalachian mountain landscape photo (Unsplash, optimized `<img>` with `object-fit: cover` for LCP)
- Dark navy gradient overlay (bottom-to-top) for text readability
- Large serif typography stack: "Sullivan" at 8-10rem, "County" in brass, "Tennessee" small-tracked
- "Established 1779" badge above the title
- Subtle parallax: image shifts on scroll via CSS custom property (`--scroll-y`) set by a lightweight scroll listener
- Animated stat counters below CTAs: **156,000+ Residents** | **430 Square Miles** | **27 Departments** | **Est. 1779** — count up from zero when scrolled into view
- **Mountain silhouette SVG divider** at bottom of hero — custom ridge-line SVG in cream color, creating an organic transition to the first content section

## 2. Section Dividers — Mountain & Topo Motifs

- Custom SVG mountain ridge silhouettes between major sections (alternating peaks/valleys)
- Topographic contour line decorations as secondary dividers
- These replace hard horizontal lines, creating organic visual flow
- SVGs are inline for performance, colored to match adjacent section backgrounds

## 3. Quick Services — Elevated Cards

- Cards reveal with staggered scroll-triggered fade-up animation (each card delayed 50-80ms from previous)
- Icon treatment: icons sit inside a circle with subtle topo-line pattern background instead of flat color
- Hover: full card lift with shadow + copper accent bar slides in from left
- Keep the existing 4-column grid on desktop

## 4. Department Categories — Dramatic Grid

- Left border accent thicker, uses each category's unique color
- Section enters with slide-up reveal animation
- No watermark numbers (dialed back per feedback)
- Category cards get slightly more generous padding and stronger hover states

## 5. News Section — Editorial Layout

- First news item is **featured large**: spans 2 columns on desktop, bigger title, more visual weight
- Remaining items sit in standard cards beside it
- Creates visual hierarchy instead of three identical cards
- All cards use scroll-reveal entrance

## 6. Navigation — Glass-Morphism

- **Scrolled state:** `backdrop-blur-md` + semi-transparent white (`bg-white/80`) + subtle bottom border
- **Unscrolled (over hero):** fully transparent, white text
- Smooth transition between states (300ms)
- **Mega-menu:** soft shadow, entry animation (scale 0.98→1.0 + fade in), no other changes to structure
- **Mobile:** full-screen navy overlay with staggered link reveals (each item slides in from left with delay)

## 7. Footer — Heritage Treatment

- Mountain silhouette SVG along the top (inverted — peaks pointing up into content)
- Topo pattern texture slightly more visible than current
- "Our Heritage" column gets a decorative horizontal rule with a small brass diamond ornament
- Keep current 4-column structure

## 8. Department Detail Pages

- Colored banner bar behind department name (uses category color as a subtle tinted header background)
- Staff table: zebra-striped rows using parchment color alternation
- Contact sidebar: keep navy header treatment (current design)

## 9. Commissioner Page

- District sections alternate backgrounds (cream/parchment) instead of divider lines
- Cards keep current design with scroll-reveal entrance

## 10. Animation System — `useScrollReveal` Hook

A lightweight custom hook that provides consistent scroll-triggered animations:

```typescript
// Observes elements with data-reveal attribute
// Adds 'revealed' class when element enters viewport (threshold 0.15)
// Supports data-reveal-delay="100" for staggered timing
// No external dependencies — pure Intersection Observer
```

**Hero parallax** uses a single scroll listener setting `--scroll-y` CSS custom property on the hero element.

**Stat counter** uses Intersection Observer + `requestAnimationFrame` for smooth count-up animation.

---

## What We're NOT Doing (YAGNI)

- No video backgrounds
- No particle effects
- No dark mode
- No page transition animations (route-level)
- No heavy animation libraries (GSAP, Framer Motion)
- No custom cursor effects
- No department-specific imagery (just the one hero image)

## Image Strategy

- **1 hero image:** Appalachian mountain/ridge landscape from Unsplash (free license)
- Served as optimized `<img>` tag, not CSS background (better LCP)
- `loading="eager"`, proper `width`/`height` attributes, `fetchpriority="high"`
- All other visual richness is pure CSS/SVG
