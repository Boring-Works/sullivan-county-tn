import { commissioners } from "./commissioners";
import { communities } from "./communities";
import { departments } from "./departments";
import { documents } from "./documents";
import { FORM_DEFINITIONS } from "./form-definitions";
import { heritageSites } from "./heritage-sites";
import { meetingMinutes } from "./meeting-minutes";
import { news } from "./news";

export interface SearchItem {
  type: "department" | "news" | "commissioner" | "document" | "page";
  title: string;
  description: string;
  url: string;
  category?: string;
  /**
   * Citizen-language aliases — terms people actually type that don't appear in
   * the official title or description. Indexed by Fuse.js so a search for
   * "food stamps" finds the Health Department's SNAP info even though the
   * department page never uses that phrase.
   */
  aliases?: string[];
}

/**
 * Suggested searches shown when a query returns zero results. Mix of common
 * citizen tasks and seasonal priorities.
 */
export const SUGGESTED_QUERIES = [
  "property taxes",
  "permits",
  "marriage license",
  "voter registration",
  "trash pickup",
  "court records",
  "animal shelter",
  "pothole",
];

const staticPages: SearchItem[] = [
  {
    type: "page",
    title: "The Founding Story — Sullivan County History",
    description:
      "Sullivan County is where Tennessee's government began. Explore the founding story from Cherokee homeland to Southwest Territory capital to modern Appalachian community.",
    url: "/history",
  },
  {
    type: "page",
    title: "Sullivan County Timeline — 1761 to Present",
    description:
      "An interactive timeline of Sullivan County from Cherokee homeland through frontier settlement, the Southwest Territory, Civil War, industrialization, and the modern era.",
    url: "/history/timeline",
  },
  {
    type: "page",
    title: "Our Communities",
    description:
      "Explore the cities, towns, and communities of Sullivan County — Kingsport, Bristol, Blountville, Bluff City, Piney Flats, and Colonial Heights.",
    url: "/communities",
  },
  {
    type: "page",
    title: "About Sullivan County",
    description:
      "Sullivan County covers 413 square miles of the Appalachian Highlands. Home to 158,000+ residents, it's the most populous county in the Tri-Cities region.",
    url: "/about",
  },
  {
    type: "page",
    title: "Economic Development",
    description:
      "Sullivan County's economy is anchored by Eastman Chemical (Fortune 500), Ballad Health, and BAE Systems. Explore employers, sectors, and economic assets.",
    url: "/economic-development",
  },
  {
    type: "page",
    title: "Education",
    description:
      "Sullivan County is served by three K-12 school systems, Northeast State Community College, and King University.",
    url: "/education",
  },
  {
    type: "page",
    title: "Transportation",
    description:
      "Sullivan County is served by Tri-Cities Airport (TRI), Interstate 81 and 26, and regional transit services.",
    url: "/transportation",
  },
  {
    type: "page",
    title: "Notable People",
    description:
      "From Revolutionary War heroes to the inventor of Super Glue, Sullivan County has produced remarkable individuals across music, science, sports, and industry.",
    url: "/people",
  },
  {
    type: "page",
    title: "Visit Sullivan County",
    description:
      "Plan your visit to Sullivan County. Explore the Heritage Trail, state parks, lakes, Bristol Motor Speedway, and the Birthplace of Country Music.",
    url: "/visit",
  },
  {
    type: "page",
    title: "Contact Sullivan County",
    description:
      "General contact information, office locations, phone numbers, and hours for Sullivan County government.",
    url: "/contact",
  },
  {
    type: "page",
    title: "ADA Compliance",
    description:
      "ADA compliance information, accommodation requests, grievance policy, and ADA coordinator contacts.",
    url: "/ada-compliance",
  },
  {
    type: "page",
    title: "Privacy Policy",
    description:
      "Sullivan County privacy policy, data collection practices, cookies, and user rights.",
    url: "/privacy-policy",
  },
  {
    type: "page",
    title: "Employee Services",
    description:
      "Employee portals, benefits information, employment applications, and resources for Sullivan County staff.",
    url: "/employee-services",
  },
  {
    type: "page",
    title: "Meeting Minutes",
    description:
      "Archive of Sullivan County commission meetings, planning commission, and committee minutes.",
    url: "/minutes",
  },
  {
    type: "page",
    title: "Online Forms",
    description:
      "Submit building permits, code complaints, public records requests, and general feedback to Sullivan County.",
    url: "/forms",
  },
  {
    type: "page",
    title: "Document Library",
    description:
      "County documents, forms, agendas, court dockets, and public records from Sullivan County.",
    url: "/documents",
  },
  {
    type: "page",
    title: "Calendar & Meetings",
    description:
      "County commission meetings, public hearings, planning commission, zoning board, and community events.",
    url: "/calendar",
  },
  {
    type: "page",
    title: "Pay Your Property Taxes",
    description:
      "How to pay your Sullivan County property taxes online, by mail, or in person. Due dates, what you'll need, and answers to common questions.",
    url: "/property-taxes",
    aliases: [
      "property tax",
      "real estate tax",
      "pay taxes",
      "tax bill",
      "tax payment",
      "trustee",
      "delinquent tax",
      "tax sale",
      "tax due date",
      "parcel tax",
    ],
  },
];

/**
 * Citizen-language aliases for high-traffic search terms. Each entry maps a
 * way people actually search to the department/page that owns the answer.
 * Source: Search.gov guidance — "people rarely search using official program
 * names." Any term added here is indexed by Fuse.js as a searchable alias.
 */
const CITIZEN_LANGUAGE_ALIASES: Array<{
  url: string;
  type: SearchItem["type"];
  aliases: string[];
}> = [
  // Health & social services
  {
    url: "/departments/health-department",
    type: "department",
    aliases: ["food stamps", "snap benefits", "wic", "medicaid", "tenncare", "vaccines"],
  },
  // County Clerk — vehicle, marriage, business
  {
    url: "/departments/county-clerk",
    type: "department",
    aliases: [
      "tags",
      "license plate",
      "car registration",
      "renew tags",
      "marriage license",
      "wedding license",
      "business license",
      "notary",
      "title",
    ],
  },
  // Register of Deeds
  {
    url: "/departments/register-of-deeds",
    type: "department",
    aliases: ["deed", "property record", "title search", "lien", "mortgage record", "ucc"],
  },
  // Sheriff
  {
    url: "/departments/sheriff",
    type: "department",
    aliases: [
      "warrant",
      "inmate search",
      "jail",
      "report a crime",
      "concealed carry",
      "carry permit",
      "handgun permit",
      "sex offender",
      "police",
    ],
  },
  // Election Commission
  {
    url: "/departments/election-commission",
    type: "department",
    aliases: [
      "vote",
      "voter registration",
      "polling place",
      "absentee ballot",
      "early voting",
      "register to vote",
      "voting",
    ],
  },
  // Highway / Road
  {
    url: "/departments/highway-department",
    type: "department",
    aliases: ["pothole", "road work", "road closure", "snow plow", "street", "roadside"],
  },
  // Solid Waste
  {
    url: "/departments/solid-waste",
    type: "department",
    aliases: [
      "trash",
      "garbage pickup",
      "recycling",
      "yard waste",
      "bulk pickup",
      "dump",
      "convenience center",
    ],
  },
  // Animal Control
  {
    url: "/departments/animal-control",
    type: "department",
    aliases: ["dog", "cat", "stray", "lost pet", "adopt pet", "rabies shot", "animal shelter"],
  },
  // Planning & Codes / Building Permits
  {
    url: "/departments/planning-and-codes",
    type: "department",
    aliases: [
      "build a house",
      "addition",
      "remodel",
      "shed permit",
      "deck permit",
      "fence permit",
      "code violation",
      "zoning",
      "variance",
    ],
  },
  // Veterans Services
  {
    url: "/departments/veterans-office",
    type: "department",
    aliases: [
      "va benefits",
      "veterans benefits",
      "disabled veteran",
      "dd-214",
      "military discharge",
      "burial benefits",
    ],
  },
  // Trustee / Property Tax — also points to dedicated landing page
  {
    url: "/property-taxes",
    type: "page",
    aliases: [
      "property tax bill",
      "tax due",
      "trustee office",
      "real estate tax",
      "tax relief",
      "elderly tax relief",
      "disabled veteran tax relief",
    ],
  },
];

export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  // Departments
  for (const dept of departments) {
    items.push({
      type: "department",
      title: dept.name,
      description: `${dept.description} Services: ${dept.services.join(", ")}`,
      url: `/departments/${dept.slug}`,
      category: dept.category,
    });
  }

  // News
  for (const article of news) {
    items.push({
      type: "news",
      title: article.title,
      description: article.summary,
      url: `/news/${article.slug}`,
    });
  }

  // Commissioners
  for (const c of commissioners) {
    items.push({
      type: "commissioner",
      title: c.name,
      description: `Commissioner, District ${c.district}`,
      url: "/commissioners",
      category: `District ${c.district}`,
    });
  }

  // Documents (from data file)
  for (const doc of documents) {
    items.push({
      type: "document",
      title: doc.name,
      description: `${doc.category} — ${doc.description}`,
      url: "/documents",
      category: doc.category,
    });
  }

  // Meeting Minutes (unique committees)
  const seenCommittees = new Set<string>();
  for (const minute of meetingMinutes) {
    if (!seenCommittees.has(minute.committee)) {
      seenCommittees.add(minute.committee);
      items.push({
        type: "page",
        title: `${minute.committee} Minutes`,
        description: `Meeting minutes and agendas for the Sullivan County ${minute.committee}.`,
        url: "/minutes",
        category: minute.committee,
      });
    }
  }

  // Forms
  for (const form of FORM_DEFINITIONS) {
    items.push({
      type: "page",
      title: form.title,
      description: form.description,
      url: `/forms/${form.type}`,
    });
  }

  // Heritage sites
  for (const site of heritageSites) {
    items.push({
      type: "page",
      title: site.name,
      description: site.historicalSignificance,
      url: `/history/${site.slug}`,
    });
  }

  // Communities
  for (const community of communities) {
    items.push({
      type: "page",
      title: community.name,
      description: community.description.slice(0, 160),
      url: `/communities/${community.slug}`,
    });
  }

  // Static pages
  items.push(...staticPages);

  // Apply citizen-language aliases. For each known url match, attach the
  // aliases so Fuse.js indexes them as searchable text.
  for (const alias of CITIZEN_LANGUAGE_ALIASES) {
    const target = items.find((it) => it.url === alias.url);
    if (target) {
      target.aliases = [...(target.aliases ?? []), ...alias.aliases];
    } else {
      // No item with that URL yet — push a synthetic alias-only entry so the
      // search still resolves to the right destination.
      items.push({
        type: alias.type,
        title: alias.url.replace(/^\//, "").replace(/-/g, " ").replace(/\//g, " · "),
        description: "",
        url: alias.url,
        aliases: alias.aliases,
      });
    }
  }

  return items;
}
