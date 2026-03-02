# Sullivan County Government Website — Implementation Plan

> **Status: COMPLETED** — All tasks implemented and deployed.

**Goal:** Convert the Holston Partners TanStack Start template into a Sullivan County citizen services portal with 27 department pages, dashboard homepage, and commissioner grid.

**Architecture:** Multi-page site with file-based TanStack Router routes. All department data in typed static files (`src/data/`). Shared `DepartmentDetail` layout component renders any department from the data. No database — pure static content from the website scrape.

**Tech Stack:** TanStack Start + Router, Cloudflare Workers, Tailwind v4, shadcn/ui, Biome, TypeScript, Vite

**Reference:** Design doc at `docs/plans/2026-02-27-sullivan-county-site-design.md`, content scrape at `../sullivancountytn-full-scrape.md`

---

### Task 1: Project Rename & Config Update

**Files:**
- Modify: `package.json`
- Modify: `wrangler.jsonc`
- Modify: `CLAUDE.md`

**Step 1: Update package.json name**

Change `"name": "holston-partners"` to `"name": "sullivan-county-tn"`.

**Step 2: Update wrangler.jsonc worker name**

Change `"name": "holston-partners"` to `"name": "sullivan-county-tn"`. Change preview name to `"sullivan-county-tn-preview"`. Remove D1/KV comments — not needed.

**Step 3: Replace CLAUDE.md**

Rewrite CLAUDE.md for the Sullivan County project. Include: project description, tech stack, key commands, project structure (updated for new routes/components/data dirs), decision log starting with "Converted from Holston Partners template".

**Step 4: Commit**

```bash
git add package.json wrangler.jsonc CLAUDE.md
git commit -m "chore: rename project from holston-partners to sullivan-county-tn"
```

---

### Task 2: Brand System & Theme

**Files:**
- Modify: `src/styles/app.css`
- Modify: `src/routes/__root.tsx`

**Step 1: Replace brand tokens in app.css**

Replace the Holston Partners brand system with Sullivan County:

```css
/* Sullivan County Brand System */
--color-brand-blue: #1e3a5f;
--color-brand-blue-light: #2a4f7f;
--color-brand-blue-dark: #0f2440;
--color-brand-orange: #c45427;
--color-brand-orange-light: #d4703f;
--color-brand-orange-muted: rgba(196, 84, 39, 0.12);
--color-brand-green: #2d7a4f;
--color-brand-cream: #fafaf8;
--color-brand-surface: #f5f5f3;
--color-brand-slate: #334155;
--color-brand-slate-light: #64748b;
--font-display: "Inter", "Helvetica Neue", sans-serif;
--font-body: "Inter", "Helvetica Neue", sans-serif;
```

Remove Cormorant Garamond / Libre Franklin references. Keep all shadcn variables, animations, dark mode tokens as-is.

Update `body` base styles: `@apply bg-brand-cream text-brand-slate font-body;`

**Step 2: Update __root.tsx**

- Change title to `"Sullivan County, Tennessee — Official Government Website"`
- Change description to `"Official website for Sullivan County, Tennessee. Find departments, services, contact information, and county resources. Established 1779."`
- Replace Google Fonts link with Inter: `https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap`
- Update body className to use new brand tokens: `bg-brand-cream text-brand-slate`

**Step 3: Commit**

```bash
git add src/styles/app.css src/routes/__root.tsx
git commit -m "style: replace Holston Partners brand with Sullivan County theme"
```

---

### Task 3: Data Files

**Files:**
- Create: `src/data/departments.ts`
- Create: `src/data/commissioners.ts`
- Create: `src/data/news.ts`
- Create: `src/data/quick-services.ts`

**Step 1: Create department type definitions and data**

Create `src/data/departments.ts` with the full typed interface (from design doc) and all 27 departments populated from the scrape. Each department needs: `slug`, `name`, `category`, `head`, `contact`, `description`, `services[]`, optional `additionalOffices[]`, `staff[]`, `externalLinks[]`.

Category assignments:
- **administrative:** county-mayor, county-attorney, county-clerk
- **courts:** chancery-court, circuit-court, district-attorney, public-defender
- **public-safety:** sheriff, emergency-management, ems, medical-examiner
- **finance:** finance-department, fms-2020, property-assessor, register-of-deeds
- **operations:** highway, maintenance, solid-waste, planning-and-codes, purchasing, risk-management
- **community:** archives-and-tourism, election-office, soil-water-conservation, veterans-office

Export: `departments` array, `getDepartmentBySlug(slug)` helper, `getDepartmentsByCategory(cat)` helper, `DEPARTMENT_CATEGORIES` map with labels and descriptions.

**Step 2: Create commissioners data**

Create `src/data/commissioners.ts` with all commissioners by district (11 districts, ~24 commissioners total) from the scrape. Export `commissioners` array and `getCommissionersByDistrict(n)` helper.

**Step 3: Create news data**

Create `src/data/news.ts` with the 5 news items from the scrape. Export `newsItems` array.

**Step 4: Create quick services data**

Create `src/data/quick-services.ts` with 8 quick service links:
1. Pay Property Taxes → https://sullivantntrustee.gov/property-tax/
2. Marriage Licenses → /departments/county-clerk
3. Building Permits → /departments/planning-and-codes
4. Court Dockets → /departments/circuit-court
5. Animal Shelter → https://animalshelter-sullivancounty.org/
6. Emergency Services → /departments/emergency-management
7. Elections & Voting → https://www.scelect.org/
8. Veterans Benefits → /departments/veterans-office

Each with: `title`, `description`, `href`, `icon` (lucide icon name), `external` boolean.

**Step 5: Commit**

```bash
git add src/data/
git commit -m "feat: add all department, commissioner, news, and quick-service data"
```

---

### Task 4: Delete Holston Partners Landing Components

**Files:**
- Delete: `src/components/landing/` (entire directory — About.tsx, Contact.tsx, Credibility.tsx, Footer.tsx, Hero.tsx, Methodology.tsx, Nav.tsx, Products.tsx, Services.tsx)
- Delete: `src/marketing_strategy_plan.md`

**Step 1: Remove old landing components and marketing doc**

```bash
rm -rf src/components/landing/
rm src/marketing_strategy_plan.md
```

**Step 2: Commit**

```bash
git add -A
git commit -m "chore: remove Holston Partners landing components"
```

---

### Task 5: Layout Components (SiteNav + SiteFooter)

**Files:**
- Create: `src/components/layout/SiteNav.tsx`
- Create: `src/components/layout/SiteFooter.tsx`
- Modify: `src/routes/__root.tsx`

**Step 1: Build SiteNav**

Create `src/components/layout/SiteNav.tsx`. Features:
- Fixed top nav, white bg with subtle shadow on scroll (like the Holston nav scroll behavior)
- Left: County logo area — "SC" monogram in a blue square + "SULLIVAN COUNTY" text + "Tennessee" subtitle
- Center/right: Department mega-menu dropdown grouped by category (6 groups). On hover/click, shows dropdown with department links organized in columns by category. Use the `DEPARTMENT_CATEGORIES` data.
- Right: Quick links — "Pay Taxes" (external, orange button), "Contact" link
- Mobile: Hamburger → slide-down menu with accordion groups for departments
- Import departments data for menu generation

**Step 2: Build SiteFooter**

Create `src/components/layout/SiteFooter.tsx`. Features:
- Dark blue background (`bg-brand-blue-dark`)
- Three columns: (1) County name + address + phone + hours, (2) Quick Links column (departments, commissioners, news, documents, contact), (3) External Resources (schools, library, sheriff, animal shelter)
- Bottom bar: copyright + "Established 1779" + ADA Compliance link + Privacy Policy link
- All external links open in new tab

**Step 3: Update __root.tsx to include layout**

Wrap `<Outlet />` with `<SiteNav />` above and `<SiteFooter />` below in the `RootComponent`. This gives every page the nav and footer automatically.

**Step 4: Commit**

```bash
git add src/components/layout/ src/routes/__root.tsx
git commit -m "feat: add SiteNav and SiteFooter layout components"
```

---

### Task 6: Shared Components

**Files:**
- Create: `src/components/shared/ContactCard.tsx`
- Create: `src/components/shared/NewsCard.tsx`

**Step 1: Build ContactCard**

Create `src/components/shared/ContactCard.tsx`. A reusable card showing:
- Department head name + title
- Phone (with tel: link), fax, email (with mailto: link)
- Address
- Hours
- Uses lucide icons: Phone, Mail, MapPin, Clock
- Uses shadcn Card component as base
- Props: `contact: ContactInfo` and `head: { name: string; title: string }`

**Step 2: Build NewsCard**

Create `src/components/shared/NewsCard.tsx`. Shows:
- Title (linked to full article or PDF)
- Date (formatted nicely)
- Author
- Summary text
- Optional PDF download badge
- Props: `item: NewsItem`

**Step 3: Commit**

```bash
git add src/components/shared/
git commit -m "feat: add ContactCard and NewsCard shared components"
```

---

### Task 7: Homepage Components

**Files:**
- Create: `src/components/home/HeroBanner.tsx`
- Create: `src/components/home/QuickServices.tsx`
- Create: `src/components/home/DepartmentCategories.tsx`
- Create: `src/components/home/NewsSection.tsx`

**Step 1: Build HeroBanner**

Create `src/components/home/HeroBanner.tsx`:
- Full-width banner, deep blue gradient background (brand-blue → brand-blue-dark)
- "Sullivan County, Tennessee" in large display text
- Subtitle: "Established 1779 — Second Oldest County in Tennessee"
- Tagline: "Serving over 156,000 residents across 430 square miles"
- Three CTA buttons: "Find a Department" (→ /departments), "Pay Property Taxes" (→ external), "Contact Us" (→ /contact)
- Keep the fade-up animation pattern from Holston Hero but simpler
- NOT full-screen height — more like 60vh. Government, not dramatic.

**Step 2: Build QuickServices**

Create `src/components/home/QuickServices.tsx`:
- Section heading: "Quick Services"
- Grid of 8 cards (4x2 on desktop, 2x4 on tablet, 1x8 on mobile)
- Each card: lucide icon, title, short description, arrow link indicator
- External links get a small external-link icon
- Import data from `src/data/quick-services.ts`
- Cards have hover effect (subtle lift + orange left border)

**Step 3: Build DepartmentCategories**

Create `src/components/home/DepartmentCategories.tsx`:
- Section heading: "County Departments"
- Grid of 6 category cards (3x2 on desktop, 2x3 on tablet, 1x6 on mobile)
- Each card: category name, description, count of departments in category, link to `/departments?category=slug`
- Categories: Administrative, Courts, Public Safety, Finance & Property, Operations, Community
- Uses `DEPARTMENT_CATEGORIES` and department count from data

**Step 4: Build NewsSection**

Create `src/components/home/NewsSection.tsx`:
- Section heading: "County News" with "View All →" link to /news
- Show latest 3 news items using `NewsCard` component
- Import from `src/data/news.ts`, sort by date descending, take 3

**Step 5: Commit**

```bash
git add src/components/home/
git commit -m "feat: add homepage components (hero, quick services, departments, news)"
```

---

### Task 8: Department Components

**Files:**
- Create: `src/components/departments/DepartmentCard.tsx`
- Create: `src/components/departments/DepartmentDetail.tsx`

**Step 1: Build DepartmentCard**

Create `src/components/departments/DepartmentCard.tsx`:
- Used on the /departments directory page
- Shows: department name, category badge (colored by category), head name + title, phone number, "View Details →" link
- Link goes to `/departments/${slug}`
- Props: `department: Department`

**Step 2: Build DepartmentDetail**

Create `src/components/departments/DepartmentDetail.tsx`:
- Full department page layout, used by the `$slug` route
- Sections:
  1. Header: department name + category badge + back link "← All Departments"
  2. ContactCard (reusable shared component)
  3. "About" section: description paragraph
  4. "Services" section: bullet list of services
  5. "Additional Offices" section (conditional): list of office cards with name/address/phone
  6. "Staff" section (conditional): table of staff name/title/phone/email
  7. "Resources" section (conditional): list of external links
- Props: `department: Department`

**Step 3: Commit**

```bash
git add src/components/departments/
git commit -m "feat: add DepartmentCard and DepartmentDetail components"
```

---

### Task 9: Commissioner Components

**Files:**
- Create: `src/components/commissioners/CommissionerCard.tsx`
- Create: `src/components/commissioners/CommissionerGrid.tsx`

**Step 1: Build CommissionerCard**

Create `src/components/commissioners/CommissionerCard.tsx`:
- Shows: commissioner name, address, phone (tel: link), email (mailto: link)
- Compact card design, fits in a grid
- Props: `commissioner: Commissioner`

**Step 2: Build CommissionerGrid**

Create `src/components/commissioners/CommissionerGrid.tsx`:
- Groups commissioners by district (1-11)
- Each district is a section with "District N" heading
- Commissioners for that district shown as CommissionerCards in a row
- Import from `src/data/commissioners.ts`

**Step 3: Commit**

```bash
git add src/components/commissioners/
git commit -m "feat: add commissioner card and grid components"
```

---

### Task 10: Routes — Homepage

**Files:**
- Modify: `src/routes/index.tsx`

**Step 1: Rewrite index.tsx**

Replace the Holston Partners landing page with the Sullivan County homepage dashboard:

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { HeroBanner } from "~/components/home/HeroBanner";
import { QuickServices } from "~/components/home/QuickServices";
import { DepartmentCategories } from "~/components/home/DepartmentCategories";
import { NewsSection } from "~/components/home/NewsSection";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <main>
      <HeroBanner />
      <QuickServices />
      <DepartmentCategories />
      <NewsSection />
    </main>
  );
}
```

**Step 2: Commit**

```bash
git add src/routes/index.tsx
git commit -m "feat: replace landing page with Sullivan County homepage dashboard"
```

---

### Task 11: Routes — Department Directory & Detail

**Files:**
- Create: `src/routes/departments/index.tsx`
- Create: `src/routes/departments/$slug.tsx`

**Step 1: Create department directory route**

Create `src/routes/departments/index.tsx`:
- Page title: "County Departments"
- Optional category filter from search params (`?category=courts`)
- Show all departments as DepartmentCard grid (3 columns desktop, 2 tablet, 1 mobile)
- Category filter tabs/buttons at top (All, Administrative, Courts, etc.)
- Import `departments` and filter helpers from data

**Step 2: Create department detail route**

Create `src/routes/departments/$slug.tsx`:
- Use `createFileRoute("/departments/$slug")`
- In the component, get `slug` from `Route.useParams()`
- Look up department from `getDepartmentBySlug(slug)`
- If not found, show a simple "Department not found" message with link back
- If found, render `<DepartmentDetail department={dept} />`
- Set page title to department name via route head

**Step 3: Commit**

```bash
git add src/routes/departments/
git commit -m "feat: add department directory and detail routes"
```

---

### Task 12: Routes — Commissioners, News, Contact, Documents

**Files:**
- Create: `src/routes/commissioners.tsx`
- Create: `src/routes/news.tsx`
- Create: `src/routes/contact.tsx`
- Create: `src/routes/documents.tsx`

**Step 1: Create commissioners route**

Create `src/routes/commissioners.tsx`:
- Page heading: "County Commissioners"
- Subheading: "Sullivan County is represented by commissioners across 11 districts"
- Render `<CommissionerGrid />`
- Include commission resources section at bottom (YouTube streams link, current agenda, county offices address)

**Step 2: Create news route**

Create `src/routes/news.tsx`:
- Page heading: "County News"
- Show all news items as NewsCard list (full width, stacked)
- Import from `src/data/news.ts`, sorted by date descending

**Step 3: Create contact route**

Create `src/routes/contact.tsx`:
- Page heading: "Contact Sullivan County"
- General county info: address (3411 TN-126, Blountville, TN 37617), main phone
- "For specific departments, visit our department directory" with link
- Grid of most-contacted departments: Mayor's Office, County Clerk, Sheriff, Emergency (911)
- External resources section: Trustee (taxes), Schools, Library, Animal Shelter

**Step 4: Create documents route**

Create `src/routes/documents.tsx`:
- Page heading: "Document Library"
- List the 15 document categories from the scrape as cards/links
- Each links to the live sullivancountytn.gov document library URL since docs are dynamically loaded
- Note: "Documents are hosted on the Sullivan County document management system"
- Link: https://sullivancountytn.gov/document-library/

**Step 5: Commit**

```bash
git add src/routes/commissioners.tsx src/routes/news.tsx src/routes/contact.tsx src/routes/documents.tsx
git commit -m "feat: add commissioners, news, contact, and documents routes"
```

---

### Task 13: Install Dependencies & Build Verification

**Files:**
- Modify: `package.json` (if new shadcn components needed)

**Step 1: Install dependencies**

```bash
cd "/Users/codyboring/CodyML/projects/sullivan County/site"
npm install
```

**Step 2: Run lint**

```bash
npm run lint
```

Fix any Biome issues.

**Step 3: Run build**

```bash
npm run build
```

Fix any TypeScript or build errors.

**Step 4: Run dev server and verify**

```bash
npm run dev
```

Verify:
- Homepage loads with hero, quick services, department categories, news
- `/departments` shows all 27 departments
- `/departments/county-clerk` (and a few others) show detail pages with correct data
- `/commissioners` shows all 11 districts
- `/news` shows all articles
- `/contact` shows county contact info
- `/documents` shows category list
- Nav works on desktop and mobile
- Footer appears on all pages
- All internal links work
- External links open correctly

**Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve build and lint issues"
```

---

### Task 14: Final Polish & Deploy Prep

**Files:**
- Modify: `CLAUDE.md` (update with final structure)

**Step 1: Update CLAUDE.md with final project state**

Update the project structure section, add all new routes, components, and data files. Add key decisions to the decision log.

**Step 2: Final commit**

```bash
git add -A
git commit -m "docs: update CLAUDE.md with final project structure"
```

**Step 3: Deploy (if requested)**

```bash
npm run deploy
```

---

## Task Dependency Order

```
Task 1 (config) → Task 2 (theme) → Task 3 (data) → Task 4 (delete old)
    ↓
Task 5 (layout) → Task 6 (shared) → Task 7 (home) + Task 8 (depts) + Task 9 (commissioners)
    ↓
Task 10 (home route) + Task 11 (dept routes) + Task 12 (other routes)
    ↓
Task 13 (build & verify) → Task 14 (polish & deploy)
```

Tasks 7, 8, 9 can run in parallel. Tasks 10, 11, 12 can run in parallel.
