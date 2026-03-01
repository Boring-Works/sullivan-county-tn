/**
 * Generate static sitemap.xml from route and data files.
 * Run: npx tsx scripts/generate-sitemap.ts
 * Output: public/sitemap.xml
 */

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const SITE_URL = "https://sullivan-county-tn.codyboring.workers.dev";

// Department slugs — must match src/data/departments.ts exactly
const departmentSlugs = [
  "county-mayor",
  "county-clerk",
  "register-of-deeds",
  "county-attorney",
  "election-office",
  "archives-and-tourism",
  "circuit-court",
  "chancery-court",
  "district-attorney",
  "public-defender",
  "sheriff",
  "ems",
  "emergency-management",
  "medical-examiner",
  "property-assessor",
  "finance-department",
  "fms-2020",
  "purchasing",
  "risk-management",
  "highway",
  "maintenance",
  "solid-waste",
  "planning-and-codes",
  "soil-water-conservation",
  "veterans-office",
];

// News slugs (all 5)
const newsSlugs = [
  "sullivan-county-employee-food-drive",
  "blountville-little-league-volunteers-needed",
  "affidavit-sullivan-co-public-notice",
  "hotel-motel-tax-law-update",
  "building-inspector-code-enforcement-job-opening",
];

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

const departmentPages: SitemapEntry[] = departmentSlugs.map((slug) => ({
  loc: `/departments/${slug}`,
  changefreq: "monthly",
  priority: "0.6",
}));

const newsPages: SitemapEntry[] = newsSlugs.map((slug) => ({
  loc: `/news/${slug}`,
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
  </url>`,
  )
  .join("\n")}
</urlset>`;

const outPath = resolve(import.meta.dirname, "../public/sitemap.xml");
writeFileSync(outPath, xml, "utf-8");
console.log(`Sitemap written to ${outPath} (${allEntries.length} URLs)`);
