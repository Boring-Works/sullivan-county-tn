/**
 * Generate static RSS feed from news data.
 * Run: npx tsx scripts/generate-rss.ts
 * Output: public/rss.xml
 */

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

// Inline the news data since we can't import from src with path aliases
const news = [
	{
		title: "Sullivan County Employee Food Drive",
		date: "2025-11-18",
		author: "Nick Johnson",
		slug: "sullivan-county-employee-food-drive",
		summary: "Sullivan County employees organize a food drive to support the local community during the holiday season.",
	},
	{
		title: "Blountville Little League Volunteers Needed",
		date: "2025-10-31",
		author: "Nick Johnson",
		slug: "blountville-little-league-volunteers-needed",
		summary: "Blountville Little League is seeking volunteers for the upcoming season.",
	},
	{
		title: "Affidavit Sullivan Co Public Notice",
		date: "2025-10-02",
		author: "Nick Johnson",
		slug: "affidavit-sullivan-co-public-notice",
		summary: "Public notice affidavit issued by Sullivan County for official county business.",
	},
	{
		title: "Hotel/Motel Tax Law Update",
		date: "2025-07-10",
		author: "Nick Johnson",
		slug: "hotel-motel-tax-law-update",
		summary: "New law regarding hotel/motel tax effective July 1, 2025.",
	},
	{
		title: "Building Inspector & Code Enforcement Job Opening",
		date: "2025-06-05",
		author: "Nick Johnson",
		slug: "building-inspector-code-enforcement-job-opening",
		summary: "Sullivan County is hiring a Building Inspector and Code Enforcement Officer.",
	},
];

const SITE_URL = "https://sullivan-county-tn.codyboring.workers.dev";

function escapeXml(str: string): string {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

const items = news
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
console.log(`RSS feed written to ${outPath} (${news.length} items)`);
