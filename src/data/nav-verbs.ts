import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Building2,
  Calendar,
  DollarSign,
  FileText,
  FolderSearch,
  Info,
} from "lucide-react";

/**
 * Verb-based primary navigation. Each verb groups concrete citizen tasks the
 * way GOV.UK and Cook County's "I Want To" pattern do. The Departments
 * dropdown stays alongside these (kept in SiteNav for citizens who already
 * know the org chart).
 *
 * - `to` is an internal route path (TanStack Router will validate)
 * - `href` is an external URL (renders <a target="_blank" rel="noopener">)
 * - Keep each list to 4–6 items per Hick's Law / blueprint mega-menu spec
 */

export type NavTask =
  | {
      labelKey: string;
      to: string;
      external?: false;
    }
  | {
      labelKey: string;
      href: string;
      external: true;
    };

export interface NavVerb {
  key: string;
  labelKey: string;
  icon: LucideIcon;
  /** Single-column list (most verbs). */
  tasks?: NavTask[];
  /** Multi-column groups (About). */
  groups?: { headingKey: string; tasks: NavTask[] }[];
}

export const NAV_VERBS: NavVerb[] = [
  {
    key: "pay",
    labelKey: "verbNav.pay.label",
    icon: DollarSign,
    tasks: [
      { labelKey: "verbNav.pay.propertyTaxes", to: "/property-taxes" },
      { labelKey: "verbNav.pay.courtFines", to: "/departments/circuit-court" },
      { labelKey: "verbNav.pay.permitFees", to: "/forms/building-permit" },
      { labelKey: "verbNav.pay.businessTaxes", to: "/departments/county-clerk" },
      { labelKey: "verbNav.pay.vehicleTags", to: "/departments/county-clerk" },
    ],
  },
  {
    key: "apply",
    labelKey: "verbNav.apply.label",
    icon: FileText,
    tasks: [
      { labelKey: "verbNav.apply.buildingPermit", to: "/forms/building-permit" },
      { labelKey: "verbNav.apply.marriageLicense", to: "/departments/county-clerk" },
      { labelKey: "verbNav.apply.businessLicense", to: "/departments/county-clerk" },
      { labelKey: "verbNav.apply.publicRecords", to: "/forms/public-records" },
      { labelKey: "verbNav.apply.employment", to: "/employee-services" },
      { labelKey: "verbNav.apply.allForms", to: "/forms" },
    ],
  },
  {
    key: "report",
    labelKey: "verbNav.report.label",
    icon: AlertTriangle,
    tasks: [
      { labelKey: "verbNav.report.pothole", to: "/departments/highway" },
      { labelKey: "verbNav.report.codeViolation", to: "/forms/code-complaint" },
      {
        labelKey: "verbNav.report.strayAnimal",
        href: "https://animalshelter-sullivancounty.org/",
        external: true,
      },
      { labelKey: "verbNav.report.feedback", to: "/forms/general-feedback" },
      { labelKey: "verbNav.report.emergency", to: "/departments/emergency-management" },
    ],
  },
  {
    key: "records",
    labelKey: "verbNav.records.label",
    icon: FolderSearch,
    tasks: [
      { labelKey: "verbNav.records.propertyDeeds", to: "/departments/register-of-deeds" },
      { labelKey: "verbNav.records.courtRecords", to: "/departments/circuit-court" },
      { labelKey: "verbNav.records.minutes", to: "/minutes" },
      { labelKey: "verbNav.records.documents", to: "/documents" },
      {
        labelKey: "verbNav.records.gisMap",
        href: "https://sullcotngis.maps.arcgis.com/apps/mapviewer/index.html?webmap=2004721405af4dd0952a592b42e6f5b6",
        external: true,
      },
    ],
  },
  {
    key: "meetings",
    labelKey: "verbNav.meetings.label",
    icon: Calendar,
    tasks: [
      { labelKey: "verbNav.meetings.calendar", to: "/calendar" },
      { labelKey: "verbNav.meetings.minutes", to: "/minutes" },
      { labelKey: "verbNav.meetings.commissioners", to: "/commissioners" },
      { labelKey: "verbNav.meetings.news", to: "/news" },
    ],
  },
  {
    // Departments panel content is rendered specially by SiteNav (existing 6-category mega-menu).
    // We only need a NAV_VERBS entry so the button shows up alongside the verbs.
    key: "departments",
    labelKey: "verbNav.departments.label",
    icon: Building2,
  },
  {
    key: "about",
    labelKey: "verbNav.about.label",
    icon: Info,
    groups: [
      {
        headingKey: "verbNav.about.headingHeritage",
        tasks: [
          { labelKey: "verbNav.about.history", to: "/history" },
          { labelKey: "verbNav.about.timeline", to: "/history/timeline" },
          { labelKey: "verbNav.about.people", to: "/people" },
          { labelKey: "verbNav.about.visit", to: "/visit" },
        ],
      },
      {
        headingKey: "verbNav.about.headingRegion",
        tasks: [
          { labelKey: "verbNav.about.communities", to: "/communities" },
          { labelKey: "verbNav.about.economicDev", to: "/economic-development" },
          { labelKey: "verbNav.about.transportation", to: "/transportation" },
          { labelKey: "verbNav.about.education", to: "/education" },
        ],
      },
      {
        headingKey: "verbNav.about.headingGovernment",
        tasks: [
          { labelKey: "verbNav.about.aboutCounty", to: "/about" },
          { labelKey: "verbNav.about.commissioners", to: "/commissioners" },
          { labelKey: "verbNav.about.contact", to: "/contact" },
          { labelKey: "verbNav.about.employees", to: "/employee-services" },
          { labelKey: "verbNav.about.ada", to: "/ada-compliance" },
        ],
      },
    ],
  },
];
