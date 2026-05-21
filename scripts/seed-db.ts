/**
 * Seed D1 database with existing static data (news + meeting minutes).
 * Run against local: wrangler d1 execute sullivan-county-db --local --file=scripts/seed.sql
 * Or use this script to generate the SQL: pnpm exec tsx scripts/seed-db.ts > scripts/seed.sql
 */

// Import from data files manually (can't use path aliases in scripts)
// This generates SQL INSERT statements

const news = [
  {
    title: "Sullivan County Employee Food Drive",
    date: "2025-11-18",
    author: "Nick Johnson",
    slug: "sullivan-county-employee-food-drive",
    summary:
      "Sullivan County employees organize a food drive to support the local community during the holiday season.",
    url: "https://sullivancountytn.gov/sullivan-county-employee-food-drive/",
    content: [
      "Sullivan County employees are coming together to organize a county-wide food drive to support local families during the holiday season.",
      "The initiative, coordinated across multiple county departments, aims to collect non-perishable food items for distribution through local food banks and community organizations serving Sullivan County residents.",
      "Employees across all departments are encouraged to participate by bringing donations to designated collection points in county buildings throughout Blountville, Bristol, and Kingsport.",
      "Collection boxes are available at the Sullivan County Courthouse, Financial Administration Building, Justice Centers in Blountville and Bristol, and the Kingsport City Hall county offices.",
      "For more information about how to participate or to coordinate a department collection, contact your department head or the County Mayor's office at (423) 323-6417.",
    ],
  },
  {
    title: "Blountville Little League Volunteers Needed",
    date: "2025-10-31",
    author: "Nick Johnson",
    slug: "blountville-little-league-volunteers-needed",
    summary: "Blountville Little League is seeking volunteers for the upcoming season.",
    url: "https://sullivancountytn.gov/407097-2/",
    pdfUrl: "/documents/public-documents/blountville-little-league-volunteers.pdf",
    content: [
      "Blountville Little League is actively seeking volunteers for the upcoming baseball and softball season.",
      "Volunteer positions include coaches, assistant coaches, team parents, concession stand workers, field maintenance crew, and scorekeepers.",
      "The league serves children ages 4 through 16 in the Blountville area and surrounding communities.",
      "Interested volunteers can download the volunteer application form attached to this announcement.",
      "Community members who want to get involved but cannot commit to a full season are welcome to help with individual events.",
    ],
  },
  {
    title: "Hotel/Motel Tax Law Update",
    date: "2025-07-10",
    author: "Nick Johnson",
    slug: "hotel-motel-tax-law-update",
    summary: "New law regarding hotel/motel tax effective July 1, 2025.",
    url: "https://sullivancountytn.gov/406826-2/",
    content: [
      "A new law regarding hotel and motel tax has taken effect as of July 1, 2025.",
      "Hotels are now required to collect occupancy tax for the first 30 days a person has maintained occupancy.",
      "The occupancy tax collected for the first 30 days must be remitted to the Sullivan County Clerk's office.",
      "For detailed information, contact the Sullivan County Clerk's office at (423) 323-6428.",
    ],
  },
];

function esc(str: string): string {
  return str.replace(/'/g, "''");
}

function uuid(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const now = new Date().toISOString();

// News articles
console.log("-- News Articles");
for (const article of news) {
  const id = uuid();
  console.log(
    `INSERT INTO news_articles (id, title, slug, author, summary, content, status, url, pdf_url, published_at, created_at, updated_at) VALUES ('${id}', '${esc(article.title)}', '${esc(article.slug)}', '${esc(article.author)}', '${esc(article.summary)}', '${esc(JSON.stringify(article.content))}', 'published', '${esc(article.url)}', ${article.pdfUrl ? `'${esc(article.pdfUrl)}'` : "NULL"}, '${article.date}T00:00:00.000Z', '${now}', '${now}');`,
  );
}

console.log("");
console.log("-- Done");
