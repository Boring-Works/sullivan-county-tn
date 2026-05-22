# Admin Overhaul — 7-Phase Plan (P1.1)

**Goal:** Replace the bare-bones `/admin/*` with a shadcn `<Sidebar>` + DataTable + stat-tile dashboard + RHF forms admin experience.

**Status update 2026-05-21:** `/admin/feedback` is now shipped as a lightweight viewer with all/helpful/problem filters and delete action. The broader admin overhaul remains useful for the dashboard, DataTables, audit log, and shadcn Sidebar work.

**Reference:** `NEXT_IMPLEMENTATION_PLAN.md` lists this as **P1.1 — the highest-impact remaining work**.

**Lift source:** [`Kiranism/tanstack-start-dashboard`](https://github.com/Kiranism/tanstack-start-dashboard) — MIT, exact stack match (TanStack Start + shadcn + Vite). Ports we'll lift verbatim:

- `src/components/ui/sidebar.tsx` (1 file — verify against our existing shadcn install)
- `src/components/ui/table/data-table*.tsx` — orchestrator + `column-header`, `pagination`, `toolbar`, `faceted-filter`, `date-filter`, `slider-filter`, `view-options`, `skeleton` (9 files)
- `src/hooks/use-data-table.ts`, `src/lib/data-table.ts`, `src/types/data-table.ts`, `src/config/data-table.ts` (4 files)
- `src/features/overview/components/{area,bar,pie}-graph.tsx` + `recent-sales.tsx` (4 files for dashboard charts; selective lift)
- `src/components/layout/app-sidebar.tsx` (reference only — we write our own to match brand + admin routes)

**Total estimate:** ~8 hours, broken into 7 phases that each ship + deploy independently.

---

## Cross-cutting principles

Every phase:
1. Compiles clean (`tsc`)
2. Builds clean
3. Current Vitest suite passes
4. Independently deployable to production
5. Smoke-tested before moving to next phase
6. Gets its own git commit (so any phase can be reverted independently)

Don't break the live site:
- Every phase keeps existing admin routes functional
- The sidebar replacement in Phase 2 is the only "structural" change; everything else is additive
- DataTable pages still link back to legacy `new.tsx` / `$id.tsx` until Phase 6 migrates them

Reuse, don't duplicate:
- Drizzle-zod schemas drive Phase 6 forms (no hand-written form schemas)
- Existing server fns drive Phases 3-5 (no new fetch logic except dashboard stats)
- Sonner + Skeleton + Button variants are already shipped — pure consumption in admin

---

## Phase 1 — Lift the foundation, no UI change yet *(~45 min)*

**Scope:** Drop in the new primitives + hooks; verify nothing breaks; commit before touching any visible UI.

**What gets lifted (drop-in):**
- `src/components/ui/sidebar.tsx` (verify Kiranism's matches our existing install; override only if better)
- `src/components/ui/table/data-table.tsx` (the orchestrator)
- `src/components/ui/table/data-table-column-header.tsx`
- `src/components/ui/table/data-table-pagination.tsx`
- `src/components/ui/table/data-table-toolbar.tsx`
- `src/components/ui/table/data-table-faceted-filter.tsx`
- `src/components/ui/table/data-table-date-filter.tsx`
- `src/components/ui/table/data-table-slider-filter.tsx`
- `src/components/ui/table/data-table-view-options.tsx`
- `src/components/ui/table/data-table-skeleton.tsx`
- `src/hooks/use-data-table.ts`
- `src/lib/data-table.ts`
- `src/types/data-table.ts`
- `src/config/data-table.ts`

**What gets installed:**
- `@tanstack/react-table` (verify version)
- `nuqs` if their DataTable uses URL-state for filters/pagination

**Verify:** `npx tsc --noEmit` clean · `npm run build` clean · 79/79 unit pass

**Ship signal:** Commit `chore(admin): lift DataTable + Sidebar foundation from Kiranism (no UI change)`. Push. **Don't deploy** — nothing user-visible yet.

**Risk:** Their files may import from paths/aliases that don't match ours — likely small import-path edits.

---

## Phase 2 — Admin Sidebar layout *(~1 hr)*

**Scope:** Replace `src/components/admin/AdminLayout.tsx`'s custom sidebar with shadcn `<Sidebar>`. All existing admin routes continue to work; only the chrome changes.

**What gets built:**

`src/components/admin/AppSidebar.tsx` driven by our admin nav data:
```ts
const ADMIN_NAV = [
  { title: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { title: "Submissions", to: "/admin/submissions", icon: Inbox, badge: "newCount" },
  { title: "News", to: "/admin/news", icon: Newspaper },
  { title: "Minutes", to: "/admin/minutes", icon: FileText },
  { title: "Announcements", to: "/admin/announcements", icon: Megaphone },
  { title: "Feedback", to: "/admin/feedback", icon: MessageSquare },  // route built in Phase 7
  { title: "Audit log", to: "/admin/audit", icon: ScrollText },        // placeholder until P1.2
];
```

- Header bar with logout button (uses `<Button variant="ghost">`)
- Collapsible state persists to localStorage (Kiranism pattern)
- Mobile sheet (auto via shadcn `<Sidebar>`)
- Brand-aligned: brand-navy bg, brand-copper-light active state, brand-cream foreground

**Files touched:**
- Rewritten thin `AdminLayout.tsx` — wraps `<SidebarProvider>` + `<AppSidebar />` + `<SidebarInset>`
- New `src/components/admin/AppSidebar.tsx`

**Verify:** all 3 viewports, sidebar collapses + restores, mobile sheet works, all existing routes still render.

**Ship signal:** Commit `feat(admin): replace custom AdminLayout with shadcn Sidebar`. Push. **Deploy.** Live verify.

---

## Phase 3 — Stat-tile dashboard at `/admin` *(~1.5 hrs)*

**Scope:** Replace the 4 quick-link cards with a real dashboard surfacing live counts + recent activity.

**Server fn** `src/server/admin-dashboard.ts`:
```ts
export const getAdminDashboardStats = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const db = getDb(getDB());
  const [submissions, news, minutes, announcements, feedback, weather] = await Promise.all([...]);
  return { submissions, news, minutes, announcements, feedback, weather };
});
```

**Route** rewrite of `/admin/index.tsx`:
- 6-tile grid (shadcn `<Card>`): Submissions / News / Minutes / Announcements / Feedback / Weather observations
- Each tile: large number, label, sub-line ("3 new this week" / "Last published 2 days ago")
- Below: "Recent activity" stream (last 10 mutations across tables — placeholder until audit log lands)
- Skeleton loaders for the loader-pending state
- Optional inline mini-chart (lift `area-graph.tsx` from Kiranism for "submissions/day, last 30")

**Files touched:**
- New `src/server/admin-dashboard.ts`
- Rewritten `src/routes/admin/index.tsx`
- New `src/components/admin/StatTile.tsx`
- Optionally `src/components/admin/AreaSparkline.tsx`

**Verify:** stats match D1 ground truth (spot-check via `wrangler d1 execute`), skeleton renders during load, looks right at all 3 viewports, SSR shows real numbers.

**Ship signal:** Commit `feat(admin): stat-tile dashboard at /admin`. Push. **Deploy.** Live verify.

---

## Phase 4 — DataTable pilot on `/admin/submissions` *(~1 hr)*

**Scope:** Convert `/admin/submissions` from plain `<table>` to the new DataTable. Pilot pattern — Phase 5 then rolls it out mechanically.

**Column definitions** `src/components/admin/columns/submissions-columns.tsx`:
- `createdAt` — sortable, formatted relative + absolute on hover
- `name` — text, search-filterable
- `email` — text
- `formType` — faceted filter (building-permit / code-complaint / public-records / feedback)
- `status` — faceted filter (new / reviewed / resolved), inline `<Select>` to update
- `actions` — view detail dialog, mark resolved, delete (with confirm)

**Inline behaviors:**
- Status `<Select>` change → `updateSubmissionStatus` → Sonner toast
- Optimistic update via TanStack Query mutation
- Skeleton during initial load (lifted `data-table-skeleton.tsx`)

**Files touched / created:**
- Rewritten `src/routes/admin/submissions.tsx`
- New `src/components/admin/columns/submissions-columns.tsx`
- Sidebar badge: now reads `submissions.new` from the dashboard query

**Verify:** sort by createdAt, status filter, search, pagination at 20/page, status update toasts + persists, skeleton, mobile horizontal scroll.

**Ship signal:** Commit `feat(admin): submissions DataTable with sort/filter/inline status`. Push. **Deploy.**

---

## Phase 5 — DataTable rollout to news / minutes / announcements *(~1.5 hrs)*

**Scope:** Apply Phase 4 pattern to the 3 remaining admin list pages. ~30 min each.

For each of `/admin/news`, `/admin/minutes`, `/admin/announcements`:
- Column file under `src/components/admin/columns/`
- DataTable wired to existing `list*` server fn
- Inline actions: edit (link to `$id` route — still legacy until Phase 6), delete (with confirm), publish/unpublish toggle for news

**Per-table specifics:**
- **News:** columns = `publishedAt`, `title`, `author`, `status` (draft/published/archived), `slug`. Status faceted filter, "publish/archive" inline buttons.
- **Minutes:** columns = `date`, `committee`, `title`, status. Faceted filter on committee.
- **Announcements:** columns = `createdAt`, `title`, `severity`, `active`, `endsAt`. Toggle for `active`. Severity facet.

**Sidebar badges live-wired:**
- "News (3 drafts)" if drafts > 0
- "Announcements (2 active)" always

**Files touched:** 3 column files, 3 rewritten `index.tsx` routes. Edit pages unchanged.

**Verify:** each list sorts/filters/paginates, edit links work, delete + toggles toast and refresh.

**Ship signal:** Commit `feat(admin): DataTable on news/minutes/announcements lists`. Push. **Deploy.**

---

## Phase 6 — Migrate admin forms to RHF + shadcn `<Form>` *(~2 hrs)*

**Scope:** Replace `useState`-driven forms on create/edit routes with the canonical RHF + shadcn pattern (`/contact` and `/forms/$type` are the references).

**Routes touched:**
- `src/routes/admin/news/new.tsx` and `src/routes/admin/news/$id.tsx`
- `src/routes/admin/minutes/new.tsx` and `src/routes/admin/minutes/$id.tsx`
- `src/routes/admin/announcements.tsx` (combined list + form — split into separate components)

**Per-form work:**
- Use the **drizzle-zod** `*InsertSchema` from `src/db/schema.ts` as the resolver (Phase 2 of master plan finally pays off)
- Wire to existing `create*` / `update*` server fns
- Sonner toast on save / delete / error
- Confirmation dialog (shadcn `<AlertDialog>` — install if missing) on delete
- Cancel button returns to list

**Patterns:**
- `<Form>` + `<FormField>` + `<Input>` / `<Textarea>` / `<Select>` / `<Switch>` for booleans (active, isUrgent)
- For news content: `<Textarea>` + sanitize-html (server-side, already happens). Future enhancement = lift Tiptap if Kiranism has it.

**Verify:** create / edit / delete each entity type. Validation surfaces inline. Toast on every action.

**Ship signal:** Commit `feat(admin): migrate admin forms to RHF + shadcn`. Push. **Deploy.**

---

## Phase 7 — `/admin/feedback` viewer + final polish + verify + ship *(~1 hr)*

**Scope:** Build the missing `/admin/feedback` route, sweep for visual regressions, full E2E pass, deploy.

**`/admin/feedback` route:**
- Read via existing `listPageFeedback` server fn
- DataTable with columns: `createdAt`, `page`, `helpful` (✅/❌ badge), `comment` (truncated), `userAgent` (faceted filter)
- Faceted filter on `helpful` (so admins surface `helpful=false` quickly)
- Delete via existing `deletePageFeedback` server fn
- Sonner toast on delete

**Sidebar polish:**
- Badge counts wired live from dashboard query
- "Audit log" link placeholder kept (functional in P1.2)

**Visual sweep across all 3 viewports:**
- Hover states + focus rings consistent
- Mobile sidebar sheet
- Desktop sidebar collapse
- Brand-copper accents consistent

**Final verification:**
- `npx tsc --noEmit` · `npm run build` · `npm test -- --run`
- `npx playwright test critical-paths user-flows accessibility admin-login --project=desktop --project=tablet --project=mobile`
- Live HTTP smoke test against all admin routes
- Manual flow: log in → dashboard → click each list → create + edit + delete each → log out

**Ship signal:** Commit `feat(admin): /admin/feedback viewer + final polish; admin overhaul complete`. Push. **Deploy.** Final live walkthrough.

---

## Total estimate

| Phase | Effort | Cumulative |
|---|---|---|
| 1. Foundation lift | 45 min | 45 min |
| 2. Sidebar layout | 1 hr | 1 hr 45 min |
| 3. Stat dashboard | 1.5 hr | 3 hr 15 min |
| 4. DataTable pilot (submissions) | 1 hr | 4 hr 15 min |
| 5. DataTable rollout (news/minutes/announcements) | 1.5 hr | 5 hr 45 min |
| 6. Admin forms RHF migration | 2 hr | 7 hr 45 min |
| 7. /admin/feedback + polish + verify | 1 hr | **~8 hr** |

vs. the original P1.1 estimate of 3-4 hours — the increase reflects this is a thorough phasing with deploy + verify between each phase, not a single sprint.

---

## Out of scope (intentionally — separate work items)

- **Audit log table + helper + viewer** — that's P1.2 in `NEXT_IMPLEMENTATION_PLAN.md` (~1.5 hr separate)
- **Cron Trigger for weather** — P2.4
- **Rich-text editor for news** — uses Textarea + sanitize-html for now; future lift if needed
- **Session revocation / list of active admin sessions**
- **TOTP / WebAuthn second-factor admin auth**

---

## Open judgment calls (confirm before Phase 1)

1. **Sidebar look:** brand-navy bg + copper-light active + cream foreground (recommended — visually integrated with public site), or shadcn defaults themed via CSS vars only?
2. **`nuqs` for URL state:** Kiranism uses it for table filter/pagination state in URL. ~3 KB, but adds a dep. *Recommendation: yes — share-able URLs are useful for admins.*
3. **Phase 5 + 6 split:** keep DataTables (Phase 5) → forms (Phase 6) as planned, or do each resource fully (DataTable + form together) per resource? *Recommendation: keep the split — DataTables ship faster as one cohesive deploy, forms get a focused pass.*
