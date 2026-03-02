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
}

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

  return items;
}
