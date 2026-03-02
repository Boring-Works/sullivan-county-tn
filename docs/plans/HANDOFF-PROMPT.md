# AI Handoff Prompt — Heritage Content Layer (Phase 1: History)

Copy the prompt below into a new Claude Code session from the project directory:
`/Users/codyboring/CodyML/projects/Sullivan County/site/`

---

## The Prompt

```
You are implementing Phase 1 of the Heritage Content Layer for the Sullivan County TN government website.

## Context

This is a TanStack Start + Cloudflare Workers site (React 19, Tailwind v4, Biome, file-based routing). It's a county government portal that currently has 12 routes (departments, commissioners, news, calendar, contact, documents, etc.). We're adding heritage/history content to make it the definitive Sullivan County resource.

## CRITICAL: Content Rules

ALL historical content comes from the fact-checked master reference document at:
`/Users/codyboring/CodyML/projects/Sullivan County/compass_artifact_wf-e7361f8f-d40b-4bcd-8d42-4ba9245a7028_text_markdown.md`

This document was verified through 3 phases of fact-checking with dual-methodology verification. Do NOT invent, embellish, or modify any historical claims. Use only what's in this document.

Key historical rules:
- The building at Rocky Mount dates to the 1820s (NOT 1770). The SITE was settled ~1770.
- First SOUTHWEST TERRITORY capital (1790-92). NOT first US territorial capital. NOT first TN state capital.
- Barsheba was William Cobb's wife. Mary was his sister.
- Lafayette did NOT visit the Old Deery Inn (unverifiable).
- Kingsport charter: the PETITION was signed at Netherland Inn; the CHARTER was passed by TN General Assembly Aug 21, 1822.

## Your Task

Execute the implementation plan at:
`docs/plans/2026-03-01-heritage-content-layer-implementation.md`

Focus on **Phase 1 only** (Tasks 1-12). This includes:

1. **Create 6 data files** (Tasks 1-5):
   - `src/data/heritage-sites.ts` — 8 heritage sites
   - `src/data/timeline.ts` — 47 timeline events
   - `src/data/communities.ts` — 6 communities
   - `src/data/notable-people.ts` — 7 notable figures
   - `src/data/employers.ts` — 11 top employers
   - `src/data/education.ts` — 6 school systems

2. **Create 5 components** (Tasks 6-8):
   - `src/components/history/HeritageHero.tsx`
   - `src/components/history/HistoryNarrative.tsx`
   - `src/components/history/HeritageSiteCard.tsx`
   - `src/components/history/VisitorInfoCard.tsx`
   - `src/components/history/TimelineSection.tsx`

3. **Create 3 routes** (Tasks 9-11):
   - `src/routes/history/index.tsx` — The founding story (long-form authority page)
   - `src/routes/history/timeline.tsx` — Interactive timeline with 47 events across 6 eras
   - `src/routes/history/$slug.tsx` — Dynamic heritage site detail pages

4. **Update 3 homepage components** (Task 12):
   - `HeroBanner.tsx` — Fix population (156,000 → 158,000+), add brand tagline, change external link to internal /history
   - `AboutSection.tsx` — Enrich content, add link to /history
   - `CommunityHighlights.tsx` — Replace emoji external cards with heritage site internal links

## How to Work

1. Read the implementation plan first — it has full code for every file
2. Read CLAUDE.md for project patterns and conventions
3. Read the master reference document for historical content
4. Follow the existing design system: Libre Caslon Text + Outfit fonts, navy/copper/brass/sage palette, MountainDivider, scroll-reveal animations, editorial card patterns
5. Match existing patterns in `src/routes/departments/$slug.tsx` and `src/data/departments.ts` for how data files and dynamic routes work
6. Biome enforces tab indentation — use tabs, not spaces
7. Commit after each logical unit (the plan specifies commit messages)
8. Run `npm run build` after creating routes to verify no errors
9. Run `npm run lint` to verify Biome passes

## Design System Quick Reference

- `font-display` = Libre Caslon Text (serif, for headings)
- `font-body` = Outfit (sans, for body text)
- `brand-navy` (#0c1e33) = primary, headers
- `brand-copper` (#b5542e) = CTAs, accents
- `brand-brass` (#c9a84c) = heritage decorative
- `brand-sage` (#3d6b56) = nature, success
- `brand-cream` (#faf8f5) = page background
- `brand-parchment` (#f3efe9) = alternating sections
- `MountainDivider` fill matches NEXT section bg
- `MountainDividerInverted` fill matches PREVIOUS section bg
- `useScrollReveal` hook + `data-reveal` attribute for scroll animations
- All cards use `card-lift` class for hover elevation

## Success Criteria

After Phase 1:
- `/history` shows the full founding story with heritage trail grid
- `/history/timeline` shows 47 events across 6 eras in alternating timeline
- `/history/rocky-mount`, `/history/old-deery-inn`, etc. show individual site pages with key facts + visitor info
- Homepage hero says 158,000+ residents and links to /history
- `npm run build` succeeds
- `npm run lint` passes
- All historical content traces back to the master reference document
```

---

## After Phase 1 is Complete

The next phases (in priority order):
- **Phase 2:** Communities wing (`/communities` hub + 6 community pages)
- **Phase 3:** Civic pages (`/about`, `/economic-development`, `/education`, `/transportation`, `/people`, `/visit`)
- **Phase 4:** Existing page updates (nav, search index, sitemap, contact, calendar)
- **Phase 5:** Build verify + deploy + CLAUDE.md update

Each phase has its own tasks in the implementation plan. A new session can pick up where Phase 1 left off.
