/**
 * Generate static RSS feed from news data.
 * Run: npx tsx scripts/generate-rss.ts
 * Output: public/rss.xml
 */

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { news } from "../src/data/news";

const SITE_URL = "https://sullivan-county-tn.codyboring.workers.dev";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Sort by date descending so newest articles render first.
const sorted = [...news].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const items = sorted
  .map(
    (article) => `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${SITE_URL}/news/${article.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/news/${article.slug}</guid>
      <description>${escapeXml(article.summary)}</description>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <dc:creator>${escapeXml(article.author)}</dc:creator>
    </item>`,
  )
  .join("\n");

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Sullivan County, Tennessee — County News</title>
    <link>${SITE_URL}/news</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <description>Official news and announcements from Sullivan County, Tennessee government.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>mayor@sullivancountytn.gov (Sullivan County Mayor's Office)</managingEditor>
${items}
  </channel>
</rss>`;

const outPath = resolve(import.meta.dirname, "../public/rss.xml");
writeFileSync(outPath, rss, "utf-8");
console.log(`RSS feed written to ${outPath} (${sorted.length} items)`);
