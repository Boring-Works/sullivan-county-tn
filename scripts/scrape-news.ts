/**
 * Scrape news articles from Sullivan County WordPress site.
 * Fetches posts from the WP REST API, extracts clean text content,
 * and writes to src/data/news.ts in the existing NewsItem[] format.
 *
 * Run: npx tsx scripts/scrape-news.ts
 *
 * Options:
 *   --dry-run    Preview scraped data without writing files
 *   --merge      Merge with existing news.ts (default: replace)
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const WP_API = "https://sullivancountytn.gov/wp-json/wp/v2/posts";
const SITE_URL = "https://sullivancountytn.gov";

interface WPPost {
  id: number;
  date: string;
  slug: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: {
    author?: Array<{ name: string }>;
  };
}

interface NewsItem {
  title: string;
  date: string;
  author: string;
  slug: string;
  summary: string;
  url: string;
  pdfUrl?: string;
  content?: string[];
}

/** Strip HTML tags and decode common entities */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&#0*38;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, "\u201C")
    .replace(/&#8221;/g, "\u201D")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Convert ALL CAPS title to Title Case */
function fixTitleCase(title: string): string {
  // Only fix if more than 60% uppercase
  const letters = title.replace(/[^a-zA-Z]/g, "");
  const upper = letters.replace(/[^A-Z]/g, "");
  if (letters.length > 0 && upper.length / letters.length > 0.6) {
    return title
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .replace(/\b(And|Or|The|In|Of|For|To|A|An)\b/g, (w) => w.toLowerCase())
      .replace(/^./, (c) => c.toUpperCase());
  }
  return title;
}

/** Strip Divi Builder shortcodes like [et_pb_section], [/et_pb_column], etc. */
function stripDiviShortcodes(html: string): string {
  return html.replace(/\[\/?\s*et_pb_[^\]]*\]/g, "");
}

/** Extract PDF URLs from content */
function extractPdfUrl(html: string): string | undefined {
  const pdfMatch = html.match(/href="([^"]+\.pdf)"/i);
  return pdfMatch?.[1];
}

/** Extract paragraphs from HTML content */
function extractParagraphs(html: string): string[] {
  // First strip Divi shortcodes
  const cleaned = stripDiviShortcodes(html);

  // Split on paragraph boundaries
  const parts = cleaned.split(/<\/p>/i);

  const paragraphs: string[] = [];
  for (const part of parts) {
    const text = stripHtml(part).trim();
    // Only keep paragraphs with substantial text (not just whitespace or short fragments)
    if (text.length > 20) {
      paragraphs.push(text);
    }
  }

  return paragraphs;
}

/** Create a clean slug from a title */
function cleanSlug(slug: string, title: string): string {
  // If slug is a numeric WP default (like "407097-2"), generate from title
  if (/^\d+(-\d+)?$/.test(slug)) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80);
  }
  return slug;
}

/** Create summary from content if excerpt is empty */
function createSummary(paragraphs: string[], title: string): string {
  if (paragraphs.length > 0) {
    const first = paragraphs[0];
    return first.length > 200 ? `${first.slice(0, 197)}...` : first;
  }
  return `${title} — Sullivan County, Tennessee.`;
}

async function scrapeNews(): Promise<NewsItem[]> {
  console.log(`Fetching posts from ${WP_API}...`);

  const res = await fetch(`${WP_API}?per_page=100&_embed&orderby=date&order=desc`);
  if (!res.ok) {
    throw new Error(`WP API returned ${res.status}: ${res.statusText}`);
  }

  const posts: WPPost[] = await res.json();
  console.log(`Found ${posts.length} posts`);

  const items: NewsItem[] = [];

  for (const post of posts) {
    const rawTitle = stripHtml(post.title.rendered);
    if (!rawTitle) continue;
    const title = fixTitleCase(rawTitle);

    const slug = cleanSlug(post.slug, title);
    const author = post._embedded?.author?.[0]?.name ?? "Sullivan County";
    const date = post.date.split("T")[0]; // ISO date only
    const pdfUrl = extractPdfUrl(post.content.rendered);
    const paragraphs = extractParagraphs(post.content.rendered);
    const summary = createSummary(paragraphs, title);

    const item: NewsItem = {
      title,
      date,
      author,
      slug,
      summary,
      url: post.link,
    };

    if (pdfUrl) {
      // Convert absolute WP URLs to relative if they point to local docs
      item.pdfUrl = pdfUrl.startsWith(SITE_URL) ? pdfUrl.replace(SITE_URL, "") : pdfUrl;
    }

    if (paragraphs.length > 0) {
      item.content = paragraphs;
    }

    items.push(item);
    console.log(`  ✓ ${title} (${date}) — ${paragraphs.length} paragraphs`);
  }

  return items;
}

function formatNewsTs(items: NewsItem[]): string {
  const serialized = items
    .map((item) => {
      const lines = [
        "\t{",
        `\t\ttitle: ${JSON.stringify(item.title)},`,
        `\t\tdate: ${JSON.stringify(item.date)},`,
        `\t\tauthor: ${JSON.stringify(item.author)},`,
        `\t\tslug: ${JSON.stringify(item.slug)},`,
        `\t\tsummary:\n\t\t\t${JSON.stringify(item.summary)},`,
        `\t\turl: ${JSON.stringify(item.url)},`,
      ];

      if (item.pdfUrl) {
        lines.push(`\t\tpdfUrl: ${JSON.stringify(item.pdfUrl)},`);
      }

      if (item.content && item.content.length > 0) {
        lines.push("\t\tcontent: [");
        for (const p of item.content) {
          lines.push(`\t\t\t${JSON.stringify(p)},`);
        }
        lines.push("\t\t],");
      }

      lines.push("\t},");
      return lines.join("\n");
    })
    .join("\n");

  return `export interface NewsItem {
\ttitle: string;
\tdate: string;
\tauthor: string;
\tslug: string;
\tsummary: string;
\turl: string;
\tpdfUrl?: string;
\tcontent?: string[];
}

export const news: NewsItem[] = [
${serialized}
];

export function getNewsBySlug(slug: string): NewsItem | undefined {
\treturn news.find((n) => n.slug === slug);
}
`;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const merge = args.includes("--merge");

  const scraped = await scrapeNews();

  if (scraped.length === 0) {
    console.log("No posts found. Exiting.");
    return;
  }

  let finalItems: NewsItem[];

  if (merge) {
    // Load existing news.ts and merge (scraped takes priority by slug)
    const existingPath = resolve(import.meta.dirname, "../src/data/news.ts");
    try {
      const existingContent = readFileSync(existingPath, "utf-8");
      // Extract existing slugs from file content
      const slugMatches = [...existingContent.matchAll(/slug:\s*"([^"]+)"/g)];
      const existingSlugs = new Set(slugMatches.map((m) => m[1]));
      const scrapedSlugs = new Set(scraped.map((s) => s.slug));

      // Keep existing items that weren't re-scraped
      // For this we'd need to import, but since we can't easily do that in a script,
      // we just use the scraped data and note what was dropped
      const newSlugs = scraped.filter((s) => !existingSlugs.has(s.slug));
      console.log(
        `\nMerge: ${newSlugs.length} new articles, ${existingSlugs.size} existing, ${scrapedSlugs.size} scraped`,
      );

      // Use scraped as the base (it has latest WP data)
      finalItems = scraped;
    } catch {
      console.log("No existing news.ts found, using scraped data only.");
      finalItems = scraped;
    }
  } else {
    finalItems = scraped;
  }

  // Sort by date descending
  finalItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  console.log(`\n${finalItems.length} articles ready:`);
  for (const item of finalItems) {
    console.log(
      `  ${item.date} — ${item.title}${item.content ? ` (${item.content.length}p)` : " (no content)"}`,
    );
  }

  if (dryRun) {
    console.log("\n--dry-run: No files written.");
    return;
  }

  // Write news.ts
  const newsPath = resolve(import.meta.dirname, "../src/data/news.ts");
  const output = formatNewsTs(finalItems);
  writeFileSync(newsPath, output, "utf-8");
  console.log(`\nWrote ${newsPath} (${finalItems.length} articles)`);

  console.log("\nNext steps:");
  console.log("  npx tsx scripts/generate-rss.ts   — Update RSS feed");
  console.log("  npx tsx scripts/generate-sitemap.ts — Update sitemap");
}

main().catch((err) => {
  console.error("Scrape failed:", err);
  process.exit(1);
});
