# Civic Site Review — Sullivan County TN

Date: 2026-05-21

AI-generated audit synthesis. Review before using as formal county policy, procurement, or compliance documentation.

## Scope

Reviewed the site as the main digital front door for Sullivan County government, not as a tourism app. The audit covered citizen tasks, mobile usability, trust signals, content clarity, forms, search, navigation, accessibility, and maintainability.

Major routes and states reviewed with Playwright screenshots:

- `audit-home-desktop.png`, `audit-home-tablet.png`, `audit-home-mobile.png`
- `audit-mobile-menu.png`, `audit-search-dialog-mobile.png`
- `audit-property-taxes.png`, `audit-property-lookup-no-results-mobile.png`
- `audit-departments.png`, `audit-documents.png`, `audit-documents-no-results-mobile.png`
- `audit-calendar.png`, `audit-contact.png`, `audit-contact-mobile.png`
- `audit-form-public-records.png`, `audit-weather.png`, `audit-transportation.png`
- `audit-visit.png`, `audit-employee-services.png`, `audit-admin-login.png`

Routes smoke-tested locally during this pass:

- `/`, `/property-taxes`, `/departments`, `/documents`, `/calendar`, `/contact`, `/forms/public-records`, `/weather`, `/transportation`, `/visit`, `/employee-services`, `/admin/login`

## Top 7 Foundation Fixes

### 1. Make Citizen Write Paths Fail Honestly

Problem: Contact and form submissions could return `{ success: false }` from the server while the client treated the request as successful.

Why it matters: A resident could believe a public-records request, code complaint, or county message was delivered when staff never received it.

What should change: Server write failures must throw user-safe errors, and clients must only show success after a confirmed write receipt.

Likely files: `src/server/forms.ts`, `src/server/contact.ts`, `src/routes/forms/$type.tsx`, `src/routes/contact.tsx`.

Expected improvement: Citizens get clear failure messaging instead of false confidence. Staff avoids missing requests that residents think were submitted.

Risks/dependencies: Future idempotency-key work should add duplicate-submission protection and stronger receipts.

Priority: P0.

Status: Implemented in this pass for contact and form storage failures.

### 2. Clarify Forms Before and After Submission

Problem: Forms collected information but did not consistently explain routing, response expectations, emergency exclusions, or what happens after submit.

Why it matters: Citizens need to know whether an online submission is enough, who will review it, and when to call instead.

What should change: Add compact “Before you submit” and “After you submit” guidance to form pages. Keep emergency and legal-filing exclusions visible.

Likely files: `src/routes/forms/$type.tsx`, `src/data/form-definitions.ts`, future shared form guidance component.

Expected improvement: Less confusion, fewer misrouted urgent issues, and fewer follow-up calls to staff.

Risks/dependencies: Some form-specific guidance may require department review.

Priority: P0.

Status: Implemented shared baseline guidance in this pass.

### 3. Fix Admin News Storage and Public Rendering

Problem: Admin-created news stored paragraph arrays as JSON strings while public rendering treated the field as HTML.

Why it matters: Published county news could render as raw JSON-like text, reducing trust and making staff-created updates look broken.

What should change: Store future admin news as sanitized paragraph HTML and keep public rendering compatible with older JSON-array records.

Likely files: `src/routes/admin/news/new.tsx`, `src/routes/admin/news/$id.tsx`, `src/server/public-news.ts`, `src/components/news/NewsDetail.tsx`.

Expected improvement: Staff can publish readable news without knowing implementation details. Existing records remain safe.

Risks/dependencies: A fuller admin editor refactor should use the documented react-hook-form + Zod + shadcn pattern.

Priority: P0.

Status: Implemented compatibility and future-storage fix in this pass.

### 4. Strengthen Emergency and Contact Routing

Problem: The contact page included public safety contacts near a general web form without enough warning that web forms are not for emergencies.

Why it matters: Residents in urgent situations must not wait for a two-business-day staff response.

What should change: Put emergency and non-emergency phone guidance before the form, and clarify that the form is not a public records request, emergency report, or legal filing.

Likely files: `src/routes/contact.tsx`, `src/data/departments.ts`, future subject-to-department routing.

Expected improvement: Safer public-safety routing and fewer misdirected county messages.

Risks/dependencies: Subject-specific routing should be reviewed by county staff before automation.

Priority: P0.

Status: Implemented baseline emergency guidance and form caveat in this pass.

### 5. Make Document Search and Collapsibles More Accessible

Problem: Document category toggles lacked `aria-expanded`/`aria-controls`, and no-results search offered little recovery.

Why it matters: Screen reader users need stateful controls, and citizens searching 115 documents need a clear way back from dead ends.

What should change: Add state semantics to collapsibles, improve no-results copy, and add a clear reset action. Longer-term: add most-requested documents and date/department filters.

Likely files: `src/routes/documents.tsx`, `src/data/documents.ts`, `src/data/search-index.ts`.

Expected improvement: Better accessibility and less frustration on mobile document searches.

Risks/dependencies: Better metadata requires document ownership/date standards.

Priority: P1.

Status: Implemented ARIA and no-results recovery in this pass.

### 6. Reduce Trust Friction Around External Handoffs

Problem: Tax, GIS, court, records, road, lake, and tourism links send citizens to external systems. Some handoffs do not fully explain why they leave the county site.

Why it matters: Payment and records journeys require high trust. On a temporary `workers.dev` domain, clarity matters even more.

What should change: Standardize external-link language: official source, opens external site, what task happens there, and what to do if the external site is unavailable.

Likely files: `src/data/official-links.ts`, `src/components/property-taxes/ParcelLookup.tsx`, `src/routes/contact.tsx`, `src/routes/transportation.tsx`, `src/routes/visit.tsx`, `src/data/nav-verbs.ts`.

Expected improvement: Citizens understand why they are leaving, which office owns the task, and which external portal is official.

Risks/dependencies: Final `.gov` domain migration is the real trust fix.

Priority: P1.

Status: Partially improved in this pass for property lookup no-results. Broader standardization remains.

### 7. Improve Regression Coverage for Real Citizen Flows

Problem: Some E2E tests click controls without asserting results, and several major flows depend on visual/manual verification.

Why it matters: A county website should not regress silently on search, forms, navigation, accessibility, or mobile overlays.

What should change: Add assertions for search results/navigation, form validation and failure states, document toggles, property lookup fallback states, mobile menu, and key route link coverage.

Likely files: `e2e/*.spec.ts`, `tests/**/*.ts`, `src/components/layout/SearchDialog.tsx`, `src/routes/documents.tsx`, `src/routes/contact.tsx`, `src/routes/forms/$type.tsx`.

Expected improvement: Higher confidence that citizens can complete core tasks after future edits.

Risks/dependencies: Some external services such as TPAD can be slow; tests should mock or assert local fallback states.

Priority: P1.

Status: Manual Playwright verification completed in this pass. Automated coverage remains a follow-up.

## Additional Findings To Queue

- Move production to an official `.gov` domain as soon as operationally possible.
- Add most-requested documents and document date/department metadata.
- Add per-meeting agenda, livestream, public-comment, and minutes actions to `/calendar`.
- Convert admin news forms to the shared react-hook-form + Zod + shadcn form pattern.
- Decide whether to wire CSRF double-submit tokens or remove/document the unused CSRF module.
- Add missing D1 indexes for active announcements and meeting minutes queries.
- Centralize duplicated external URLs into `src/data/official-links.ts`.

## Verification Notes

- Local route smoke: 12/12 major routes returned HTTP 200.
- Document collapsible state toggled `aria-expanded` from `true` to `false`.
- Contact page contains emergency guidance and clarifies the form is not for public records, emergencies, or legal filings.
- Public records form contains the new “Before you submit” guidance.
- Local TypeScript check passed after implementation.
