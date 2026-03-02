export interface QuickService {
  title: string;
  description: string;
  href: string;
  icon: string;
  external: boolean;
}

export const quickServices: QuickService[] = [
  {
    title: "Pay Property Taxes",
    description: "Pay your Sullivan County property taxes online through the County Trustee.",
    href: "https://sullivantntrustee.gov/property-tax/",
    icon: "DollarSign",
    external: true,
  },
  {
    title: "Marriage Licenses",
    description: "Apply for a marriage license at any County Clerk office location.",
    href: "/departments/county-clerk",
    icon: "Heart",
    external: false,
  },
  {
    title: "Building Permits",
    description: "Apply for building permits for new construction, additions, and remodeling.",
    href: "/departments/planning-and-codes",
    icon: "Building2",
    external: false,
  },
  {
    title: "Court Information",
    description: "Access court dockets, filing information, and case records.",
    href: "/departments/circuit-court",
    icon: "Scale",
    external: false,
  },
  {
    title: "Animal Shelter",
    description: "Adopt a pet, report a stray, or learn about animal services.",
    href: "https://animalshelter-sullivancounty.org/",
    icon: "Dog",
    external: true,
  },
  {
    title: "Emergency Services",
    description: "Emergency management resources, preparedness information, and alerts.",
    href: "/departments/emergency-management",
    icon: "Siren",
    external: false,
  },
  {
    title: "Elections & Voting",
    description: "Voter registration, polling locations, and election schedules.",
    href: "https://www.scelect.org/",
    icon: "Vote",
    external: true,
  },
  {
    title: "Veterans Benefits",
    description: "Assistance with compensation, pension, health, education, and burial benefits.",
    href: "/departments/veterans-office",
    icon: "Medal",
    external: false,
  },
  {
    title: "GIS & Property Lookup",
    description: "Search property records, view zoning maps, and explore county GIS data.",
    href: "https://gis.sullivancountytn.gov/",
    icon: "Map",
    external: true,
  },
];
