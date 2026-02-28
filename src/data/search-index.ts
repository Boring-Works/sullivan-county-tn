import { commissioners } from "./commissioners";
import { departments } from "./departments";
import { news } from "./news";

export interface SearchItem {
	type: "department" | "news" | "commissioner" | "document" | "page";
	title: string;
	description: string;
	url: string;
	category?: string;
}

const documentCategories = [
	"ADA Documents",
	"Agendas",
	"County Commission",
	"Court Dockets",
	"Court Forms",
	"Emergency Management Documents",
	"Employee Services",
	"Finance Documents",
	"Planning and Codes",
	"Property Assessor",
	"Public Documents",
	"Purchasing Documents",
	"Sanitation",
	"Sullivan County FMS 2020",
	"Veterans Service Officer",
];

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
	const districts = new Map<number, string[]>();
	for (const c of commissioners) {
		const existing = districts.get(c.district) || [];
		existing.push(c.name);
		districts.set(c.district, existing);
	}
	for (const c of commissioners) {
		items.push({
			type: "commissioner",
			title: c.name,
			description: `Commissioner, District ${c.district}`,
			url: "/commissioners",
			category: `District ${c.district}`,
		});
	}

	// Document categories
	for (const cat of documentCategories) {
		items.push({
			type: "document",
			title: cat,
			description: `${cat} — county documents and forms`,
			url: "/documents",
		});
	}

	// Static pages
	items.push(...staticPages);

	return items;
}
