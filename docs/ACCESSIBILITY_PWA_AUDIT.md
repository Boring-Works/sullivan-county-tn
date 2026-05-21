# Accessibility And PWA Audit

Last updated: 2026-05-21

AI-generated audit synthesis. Review before using as formal compliance documentation.

## Standards Reviewed

- WCAG 2.2 AA: text contrast 4.5:1, non-text contrast 3:1, no color-only meaning, keyboard focus, target size, orientation support, reduced motion, semantic structure.
- Android accessibility guidance: scalable text, minimum 12sp body text, 4.5:1 text contrast, 3:1 non-text contrast, 48dp touch targets, TalkBack labels, decorative items hidden from accessibility services, non-gesture alternatives.
- Apple Human Interface Guidelines: inclusive defaults, Dynamic Type-friendly layouts, sufficient contrast, legible text, comfortable touch targets, reduced-motion respect, platform-safe layout areas.
- PWA installability guidance: HTTPS, manifest with name/icons/start URL/display/scope, service worker/offline behavior, mobile performance, app shortcuts, clear standalone launch behavior.

## Current Strengths

- Uses semantic page structure with route-level `<main id="main-content">` targets and a global skip link.
- Uses Radix/shadcn primitives for dialogs, sheets, accordion, labels, select, command dialog, and tooltips.
- Uses `@axe-core/playwright` as a dependency for automated accessibility scans.
- Honors `prefers-reduced-motion: reduce`; reveal animations fail open so content stays visible without JS.
- Uses `viewport-fit=cover`, safe-area padding, iOS web app meta tags, Android `mobile-web-app-capable`, mask icon, Apple touch icons, and a PWA manifest.
- Mobile bottom action bar uses three high-priority actions, safe-area padding, and 56px touch targets.
- Manifest includes required installability members, maskable icon, shortcuts, `share_target`, `display_override`, and `launch_handler`.
- Service worker provides navigation preload, offline fallback, emergency-critical route precache, font cache, image cache eviction, and stale-while-revalidate for other GET requests.
- Brand text tokens now meet WCAG AA on cream/parchment/surface backgrounds after the 2026-05-21 contrast pass.

## Fixes Applied In This Audit

- Removed `orientation: "portrait-primary"` from `public/manifest.webmanifest` so the PWA does not restrict landscape usage. This aligns with WCAG 2.2 orientation guidance.
- Darkened `brand-copper-light` because it was used for hover text/background states and failed contrast as white-on-hover and copper-on-light text.
- Darkened `brand-brass` slightly because brass text on `brand-surface` was below 4.5:1 by a small margin.
- Updated the global skip link handler to add `tabindex="-1"` to the target main element before focusing it, making the focus transfer reliable for keyboard and screen reader users.
- Updated the service worker's Google Fonts fallback to return successful empty CSS/204 responses instead of synthetic 408 responses. This prevents misleading app-error console noise while preserving local font fallbacks.
- Made property-tax inline links visibly underlined by default, so they are distinguishable without relying on color alone.
- Made shadcn scroll-area viewports keyboard focusable so horizontally scrollable forecast strips satisfy keyboard access checks.
- Scoped the desktop hero image preload to desktop breakpoints so mobile does not preload an unused 1920px asset.
- Fixed `SearchDialog` mobile viewport clipping by anchoring the command dialog to the safe-area-aware top edge and constraining its height with dynamic viewport units. Live Playwright verification confirmed the input and dialog are fully visible at 390×844, 820×1180, and 1440×1000.

## Automated Scan Result

After the fixes, local axe scans at a 390px mobile viewport reported zero violations on:

- `/`
- `/property-taxes`
- `/weather`
- `/visit`
- `/transportation`
- `/contact`

Live search-dialog geometry was also verified after deployment of commit `5dc2b26`:

- Mobile `390x844`: dialog `top: 16`, `bottom: 509`, input visible.
- Tablet `820x1180`: dialog `top: 141.59`, `bottom: 602.59`, input visible.
- Desktop `1440x1000`: dialog `top: 120`, `bottom: 581`, input visible.

## Remaining Systematic Recommendations

### 1. Add Automated Accessibility CI For Key Routes

Current dependency support exists, but a committed Playwright axe suite should assert the major public routes:

- `/`
- `/property-taxes`
- `/departments`
- `/weather`
- `/visit`
- `/transportation`
- `/contact`
- `/forms/contact-general`

The suite should run at mobile and desktop widths and fail on serious/critical axe violations.

### 2. Add A Color Token Regression Test

Add a small Vitest utility that checks approved foreground/background token pairs:

- `brand-slate`, `brand-slate-light`, `brand-stone`, `brand-copper`, `brand-brass`, `brand-sage`, `brand-safety`, `brand-community` on `brand-cream`, `brand-parchment`, and `brand-surface`.
- White text on `brand-navy`, `brand-copper`, `brand-brass`, `brand-sage`, and `brand-safety`.

This prevents future brand tweaks from silently breaking color contrast.

### 3. Add Manifest Screenshots For Android Install Prompts

The manifest is installable, but Android install prompts can use `screenshots` and `description` to provide better context. Add two or more screenshots after final visual assets are stable:

- Narrow/mobile homepage screenshot.
- Wide/desktop homepage or weather screenshot.

### 4. Revisit Google Fonts Dependency

The service worker now degrades more quietly, but live testing still depends on Google Fonts availability on first load. For maximum resilience, self-host the two font families or define a stronger system-font-first strategy for emergency pages.

### 5. Add Real Device Checks

Before treating the app as platform-grade, run manual checks on:

- iPhone Safari Add to Home Screen.
- iPhone with VoiceOver and large text.
- Android Chrome install prompt.
- Android TalkBack and Accessibility Scanner.
- Landscape orientation on both phone platforms.
- Offline mode for `/`, `/weather`, `/contact`, EMA, Sheriff, and `/offline.html`.

### 6. Audit Text Clamping For Critical Content

Some homepage sections use `line-clamp` on mobile. This is acceptable for summaries, but avoid clamping emergency, form, meeting, alert, or legal content where hidden text could change meaning.

### 7. Consider Better Install UX

Add an optional non-intrusive install prompt on Android using `beforeinstallprompt`. Do not show it on first visit. Trigger it after a user views multiple practical pages such as weather, taxes, contact, or calendar.

## Platform Position

The site is already closer to a high-quality civic PWA than a normal county website. The most important next step is not more native-looking chrome; it is systematic regression protection: axe scans, contrast token tests, real-device accessibility checks, and manifest screenshots.
