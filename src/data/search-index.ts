import { commissioners } from "./commissioners";
import { departments } from "./departments";
import { documents } from "./documents";
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

  // Static pages
  items.push(...staticPages);

  return items;
}
