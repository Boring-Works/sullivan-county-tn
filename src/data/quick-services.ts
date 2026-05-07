export type ServiceSubmissionMode = "online" | "in-person" | "hybrid";

export interface QuickService {
  title: string;
  description: string;
  href: string;
  icon: string;
  external: boolean;
  submission?: ServiceSubmissionMode;
}

export const quickServices: QuickService[] = [
  {
    title: "Pay property taxes",
    description: "How to pay online, by mail, or in person — plus answers to common questions.",
    href: "/property-taxes",
    icon: "DollarSign",
    external: false,
    submission: "online",
  },
  {
    title: "Marriage licenses",
    description: "Apply at any County Clerk office. Both parties must appear in person.",
    href: "/departments/county-clerk",
    icon: "Heart",
    external: false,
    submission: "in-person",
  },
  {
    title: "Building permits",
    description: "Apply online for new construction, additions, and remodels.",
    href: "/forms/building-permit",
    icon: "Building2",
    external: false,
    submission: "online",
  },
  {
    title: "Court information",
    description: "Court dockets, filings, and case records.",
    href: "/departments/circuit-court",
    icon: "Scale",
    external: false,
    submission: "hybrid",
  },
  {
    title: "Animal shelter",
    description: "Adopt a pet, report a stray, or learn about animal services.",
    href: "https://animalshelter-sullivancounty.org/",
    icon: "Dog",
    external: true,
  },
  {
    title: "Emergency services",
    description: "Preparedness, alerts, and emergency management resources.",
    href: "/departments/emergency-management",
    icon: "Siren",
    external: false,
  },
  {
    title: "Elections & voting",
    description: "Voter registration, polling locations, and election schedules.",
    href: "https://www.scelect.org/",
    icon: "Vote",
    external: true,
    submission: "online",
  },
  {
    title: "Veterans benefits",
    description: "Help with compensation, pension, health, education, and burial benefits.",
    href: "/departments/veterans-office",
    icon: "Medal",
    external: false,
    submission: "hybrid",
  },
  {
    title: "Property & GIS lookup",
    description: "Search property records, view zoning maps, and explore county GIS data.",
    href: "https://gis.sullivancountytn.gov/",
    icon: "Map",
    external: true,
    submission: "online",
  },
];
