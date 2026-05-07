export type ServiceSubmissionMode = "online" | "in-person" | "hybrid";

export interface QuickService {
  title: string;
  description: string;
  href: string;
  icon: string;
  external: boolean;
  submission?: ServiceSubmissionMode;
}

// Six most-used services, ordered by citizen demand (blueprint top-tasks pattern).
// EmergencyModule above the fold + the verb nav cover Animal Shelter, Emergency
// Management, and Veterans Office; that's why those three were dropped from the
// homepage card list. They're still in search and the verb nav.
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
    title: "Elections & voting",
    description: "Voter registration, polling locations, and election schedules.",
    href: "https://www.scelect.org/",
    icon: "Vote",
    external: true,
    submission: "online",
  },
  {
    title: "Property & GIS lookup",
    description: "Search property records, view zoning maps, and explore county GIS data.",
    href: "https://sullcotngis.maps.arcgis.com/apps/mapviewer/index.html?webmap=2004721405af4dd0952a592b42e6f5b6",
    icon: "Map",
    external: true,
    submission: "online",
  },
];
