# Sullivan County Final Gaps — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Close all remaining functional gaps — contact form backend, custom 404 page, sitemap.xml, robots.txt, favicon.ico, and Cloudflare Analytics.

**Architecture:** Server functions via TanStack Start for the contact form endpoint. Static files for sitemap/robots/favicon. TanStack Router's `notFoundComponent` for 404. CF Web Analytics beacon script.

**Tech Stack:** TanStack Start server functions, Cloudflare Workers (no external email service — use Cloudflare Email Workers or store submissions in KV/D1), Tailwind CSS v4, existing design system tokens.

---

## Task 1: Contact Form Backend (Server Function)

**Files:**
- Create: `src/server/contact.ts`
- Modify: `src/routes/contact.tsx` (lines 210-218 — replace simulated submit)
- Modify: `wrangler.jsonc` (add KV binding for form submissions)

**What it does:**
Creates a TanStack Start server function that receives contact form submissions and stores them in Cloudflare KV (simple, no external email service needed). The county can review submissions from the CF dashboard or a future admin page.

**Step 1: Create KV namespace for contact submissions**

Run:
```bash
npx wrangler kv namespace create CONTACT_SUBMISSIONS
```

Take the returned namespace ID.

**Step 2: Add KV binding to wrangler.jsonc**

```jsonc
{
  "name": "sullivan-county-tn",
  "compatibility_date": "2026-02-06",
  "compatibility_flags": ["nodejs_compat"],
  "main": "@tanstack/react-start/server-entry",
  "observability": { "enabled": true },
  "kv_namespaces": [
    {
      "binding": "CONTACT_SUBMISSIONS",
      "id": "<namespace-id-from-step-1>"
    }
  ],
  "env": {
    "preview": {
      "name": "sullivan-county-tn-preview",
      "kv_namespaces": [
        {
          "binding": "CONTACT_SUBMISSIONS",
          "id": "<preview-namespace-id>"
        }
      ]
    }
  }
}
```

**Step 3: Create server function (`src/server/contact.ts`)**

```ts
import { createServerFn } from "@tanstack/react-start";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const submitContactForm = createServerFn({ method: "POST" })
  .validator((data: unknown): ContactFormData => {
    const d = data as ContactFormData;
    if (!d.name?.trim()) throw new Error("Name is required");
    if (!d.email?.trim() || !d.email.includes("@")) throw new Error("Valid email is required");
    if (!d.subject?.trim()) throw new Error("Subject is required");
    if (!d.message?.trim()) throw new Error("Message is required");
    if (d.message.length > 5000) throw new Error("Message too long");
    return {
      name: d.name.trim(),
      email: d.email.trim(),
      subject: d.subject.trim(),
      message: d.message.trim(),
    };
  })
  .handler(async ({ data }) => {
    // Generate unique key with timestamp
    const id = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
    const submission = {
      ...data,
      submittedAt: new Date().toISOString(),
      id,
    };

    // Store in KV — accessible from CF dashboard
    // Access KV via the platform env (Cloudflare Workers runtime)
    const env = (globalThis as any).__env__;
    if (env?.CONTACT_SUBMISSIONS) {
      await env.CONTACT_SUBMISSIONS.put(
        `submission:${id}`,
        JSON.stringify(submission),
        { expirationTtl: 60 * 60 * 24 * 90 } // 90-day TTL
      );
    }

    return { success: true, id };
  });
```

**Note on env access:** TanStack Start on Cloudflare Workers exposes the env through the request context. The exact mechanism may differ — check how TanStack Start exposes CF bindings. If `globalThis.__env__` doesn't work, check `getEvent()` from vinxi or the platform context. The reference app at `~/Downloads/my-tanstack-app` uses Drizzle with `process.env.DATABASE_URL` — but KV bindings are different. Test in dev and adapt.

**Step 4: Update contact.tsx submit handler**

Replace the simulated submit (lines 210-218) with:

```tsx
import { submitContactForm } from "~/server/contact";

async function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setSending(true);
  setError("");

  const formData = new FormData(e.currentTarget);
  try {
    await submitContactForm({
      data: {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        subject: formData.get("subject") as string,
        message: formData.get("message") as string,
      },
    });
    setSubmitted(true);
  } catch (err) {
    setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
  } finally {
    setSending(false);
  }
}
```

Also add error state:
```tsx
const [error, setError] = useState("");
```

And render error below form if present:
```tsx
{error && (
  <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
    {error}
  </div>
)}
```

**Step 5: Build and test**

Run: `npm run build`
Expected: Build succeeds.

Test locally: `npm run dev` → go to `/contact` → submit form → should store in KV (or gracefully degrade if KV not available in dev).

**Step 6: Commit**

```bash
git add src/server/contact.ts src/routes/contact.tsx wrangler.jsonc
git commit -m "feat: contact form backend — stores submissions in Cloudflare KV"
```

---

## Task 2: Custom 404 Page

**Files:**
- Modify: `src/routes/__root.tsx` (add `notFoundComponent`)
- Create: `src/components/layout/NotFound.tsx`

**What it does:**
Adds a branded 404 page with the site nav/footer, a search prompt, and quick links. Uses the existing Appalachian Editorial design system.

**Step 1: Create NotFound component (`src/components/layout/NotFound.tsx`)**

```tsx
import { Link } from "@tanstack/react-router";
import { Home, Search, FileText, Users, Building2 } from "lucide-react";

export function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
      {/* 404 number */}
      <p className="font-display text-7xl font-bold text-brand-brass/30 sm:text-9xl">
        404
      </p>

      {/* Heading */}
      <h1 className="mt-4 font-display text-3xl font-bold text-brand-navy sm:text-4xl">
        Page Not Found
      </h1>

      {/* Description */}
      <p className="mt-4 font-body text-base text-brand-slate-light leading-relaxed max-w-lg mx-auto">
        The page you're looking for doesn't exist or may have been moved.
        Try searching for what you need, or visit one of the links below.
      </p>

      {/* Divider */}
      <div className="mt-8 mx-auto h-px w-20 bg-gradient-to-r from-transparent via-brand-copper to-transparent" />

      {/* Quick links */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { to: "/", label: "Home", icon: Home },
          { to: "/departments", label: "Departments", icon: Building2 },
          { to: "/documents", label: "Documents", icon: FileText },
          { to: "/commissioners", label: "Commissioners", icon: Users },
        ].map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="flex flex-col items-center gap-2 rounded-lg border border-brand-surface bg-white p-4 font-body text-sm font-medium text-brand-navy transition-all hover:border-brand-copper hover:shadow-sm"
          >
            <link.icon className="size-5 text-brand-copper" />
            {link.label}
          </Link>
        ))}
      </div>

      {/* Search hint */}
      <p className="mt-8 font-body text-sm text-brand-stone">
        Press{" "}
        <kbd className="rounded border border-brand-surface bg-brand-parchment px-1.5 py-0.5 font-mono text-xs">
          ⌘K
        </kbd>{" "}
        to search the site
      </p>
    </main>
  );
}
```

**Step 2: Add notFoundComponent to root route**

In `src/routes/__root.tsx`, update the route config:

```tsx
import { NotFound } from "~/components/layout/NotFound";

export const Route = createRootRoute({
  head: () => ({ /* existing head config */ }),
  component: RootComponent,
  notFoundComponent: NotFound,
});
```

**Step 3: Build and test**

Run: `npm run build`
Test: `npm run dev` → navigate to `/some-nonexistent-page` → should show branded 404 with nav/footer.

**Step 4: Commit**

```bash
git add src/components/layout/NotFound.tsx src/routes/__root.tsx
git commit -m "feat: custom 404 page with quick links and search hint"
```

---

## Task 3: Sitemap.xml Generator

**Files:**
- Create: `scripts/generate-sitemap.ts`
- Output: `public/sitemap.xml`
- Modify: `src/routes/__root.tsx` (add sitemap link)
- Modify: `package.json` (add script)

**What it does:**
Generates a static sitemap.xml listing all 12 static routes + 27 department slugs + 5 news slugs = ~44 URLs. Same pattern as the existing `scripts/generate-rss.ts`.

**Step 1: Create sitemap generator (`scripts/generate-sitemap.ts`)**

```ts
import { writeFileSync } from "node:fs";
import { departments } from "../src/data/departments";
import { newsArticles } from "../src/data/news";

const SITE_URL = "https://sullivan-county-tn.codyboring.workers.dev";

interface SitemapEntry {
  loc: string;
  changefreq: string;
  priority: string;
}

const staticPages: SitemapEntry[] = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/departments", changefreq: "monthly", priority: "0.9" },
  { loc: "/commissioners", changefreq: "monthly", priority: "0.8" },
  { loc: "/news", changefreq: "weekly", priority: "0.8" },
  { loc: "/calendar", changefreq: "monthly", priority: "0.7" },
  { loc: "/contact", changefreq: "yearly", priority: "0.7" },
  { loc: "/documents", changefreq: "monthly", priority: "0.7" },
  { loc: "/ada-compliance", changefreq: "yearly", priority: "0.5" },
  { loc: "/employee-services", changefreq: "yearly", priority: "0.4" },
  { loc: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
];

const departmentPages: SitemapEntry[] = departments.map((d) => ({
  loc: `/departments/${d.slug}`,
  changefreq: "monthly",
  priority: "0.6",
}));

const newsPages: SitemapEntry[] = newsArticles.map((a) => ({
  loc: `/news/${a.slug}`,
  changefreq: "yearly",
  priority: "0.5",
}));

const allEntries = [...staticPages, ...departmentPages, ...newsPages];
const today = new Date().toISOString().split("T")[0];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries
  .map(
    (e) => `  <url>
    <loc>${SITE_URL}${e.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

writeFileSync("public/sitemap.xml", xml);
console.log(`Generated sitemap.xml with ${allEntries.length} URLs`);
```

**Step 2: Add script to package.json**

```json
"scripts": {
  "generate:sitemap": "tsx scripts/generate-sitemap.ts",
  "generate:rss": "tsx scripts/generate-rss.ts"
}
```

**Step 3: Run the generator**

```bash
npx tsx scripts/generate-sitemap.ts
```

Expected: `public/sitemap.xml` with ~44 URLs.

**Step 4: Commit**

```bash
git add scripts/generate-sitemap.ts public/sitemap.xml package.json
git commit -m "feat: sitemap.xml generator — 44 URLs for Google Search Console"
```

---

## Task 4: robots.txt

**Files:**
- Create: `public/robots.txt`

**What it does:**
Standard robots.txt allowing all crawlers, pointing to sitemap.

**Step 1: Create robots.txt**

```
User-agent: *
Allow: /

Sitemap: https://sullivan-county-tn.codyboring.workers.dev/sitemap.xml
```

**Step 2: Commit**

```bash
git add public/robots.txt
git commit -m "feat: add robots.txt with sitemap reference"
```

---

## Task 5: Favicon.ico (Legacy Browser Support)

**Files:**
- Create: `public/favicon.ico` (generated from existing favicon.svg)
- Modify: `src/routes/__root.tsx` (add favicon.ico link)

**What it does:**
Generates a favicon.ico from the existing SVG for legacy browsers. Modern browsers use the SVG, iOS uses apple-touch-icon.png, legacy browsers fall back to favicon.ico.

**Step 1: Generate favicon.ico from SVG**

Use an online converter or ImageMagick. The SVG is a navy square with brass "SC" text.

If ImageMagick is installed:
```bash
convert -background none -resize 32x32 public/favicon.svg public/favicon.ico
```

If not, use `sharp` (already may be in node_modules) or write a quick script. Alternatively, since the apple-touch-icon.png already exists, convert that:
```bash
# If sharp is available:
npx sharp -i public/apple-touch-icon.png -o public/favicon.ico --resize 32 32
```

If neither works, a manual approach: the favicon.svg is already linked in `__root.tsx`. Add a fallback `.ico` link:

```tsx
{ rel: "icon", sizes: "32x32", href: "/favicon.ico" },
```

**Note:** Most modern browsers support SVG favicons. The .ico is a nice-to-have for IE/very old browsers. If generation tools aren't available locally, skip this and note it as a manual step.

**Step 2: Add link tag to __root.tsx**

```tsx
links: [
  // ... existing
  { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
  { rel: "icon", sizes: "32x32", href: "/favicon.ico" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
]
```

**Step 3: Commit**

```bash
git add public/favicon.ico src/routes/__root.tsx
git commit -m "feat: add favicon.ico for legacy browser support"
```

---

## Task 6: Cloudflare Web Analytics

**Files:**
- Modify: `src/routes/__root.tsx` (replace comment with beacon script)

**What it does:**
Adds Cloudflare's free, privacy-friendly Web Analytics beacon. No cookies, no PII, GDPR-compliant.

**Step 1: Get beacon token**

Go to Cloudflare Dashboard → Workers & Pages → sullivan-county-tn → Analytics → Web Analytics → Enable → Copy the beacon token.

The script will look like:
```html
<script defer src="https://static.cloudflareinsights.com/beacon.min.js"
  data-cf-beacon='{"token":"<TOKEN>"}'></script>
```

**Step 2: Add to __root.tsx body**

Replace the comment block (lines 58-62) with:

```tsx
<script
  defer
  src="https://static.cloudflareinsights.com/beacon.min.js"
  data-cf-beacon={JSON.stringify({ token: "REPLACE_WITH_REAL_TOKEN" })}
/>
```

**Note:** This requires the actual token from the CF dashboard. The implementer should either:
1. Get the token from the dashboard and insert it
2. Or leave the placeholder and note that the token needs to be added manually

**Step 3: Commit**

```bash
git add src/routes/__root.tsx
git commit -m "feat: add Cloudflare Web Analytics beacon"
```

---

## Task 7: Update CLAUDE.md + README

**Files:**
- Modify: `CLAUDE.md` (update decision log, note KV binding)
- Modify: `README.md` (update "What's Left" section, add new features)

**What to update:**

**CLAUDE.md:**
- Add KV binding to Key Commands or a new Bindings section
- Update Decision Log: contact form backend (KV storage), 404 page, sitemap, analytics
- Add `src/server/contact.ts` to Key Files if not already there

**README.md:**
- Remove items from "What the Old Site Has That This Doesn't (Yet)" that are now done
- Add contact form backend, 404 page, sitemap, robots.txt, analytics to features
- Update route count if changed

**Step 1: Update both files**
**Step 2: Commit**

```bash
git add CLAUDE.md README.md
git commit -m "docs: update CLAUDE.md and README with final gap closures"
```

---

## Implementation Order

1. **Task 1** — Contact form backend (most impactful functional gap)
2. **Task 2** — Custom 404 page
3. **Task 3** — Sitemap.xml generator
4. **Task 4** — robots.txt
5. **Task 5** — Favicon.ico
6. **Task 6** — Cloudflare Analytics (needs dashboard token)
7. **Task 7** — Update docs
8. **Build + deploy**

---

## Verification

1. `/contact` → fill form → submit → success message (no simulated delay, real server function)
2. CF dashboard → KV → `CONTACT_SUBMISSIONS` → submission stored with name/email/subject/message/timestamp
3. `/nonexistent-page` → branded 404 with nav, footer, quick links, search hint (⌘K)
4. `/sitemap.xml` → valid XML with ~44 URLs
5. `/robots.txt` → allows all crawlers, references sitemap
6. Favicon shows in legacy browsers (favicon.ico)
7. CF Web Analytics collecting data (check dashboard after deploy)
8. `npm run build` succeeds
9. `npm run deploy` succeeds
