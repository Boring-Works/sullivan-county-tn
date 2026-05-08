import type { LucideIcon } from "lucide-react";
import { AlertTriangle, DollarSign, FileText, Info, Search } from "lucide-react";

/**
 * Verb-based primary navigation. Each verb groups concrete citizen tasks the
 * way GOV.UK and Cook County's "I Want To" pattern do.
 *
 * Five verbs (Phase 1 of the homepage redesign — was seven):
 *   FIND · PAY · APPLY · REPORT · ABOUT
 *
 * The collapse aligns with `County_Government_Website_Blueprint_2026`
 * Section 3.2.1 (Hick's Law: 4–6 task-based items) and Fairfax County's
 * canonical FIND/PAY/REGISTER/REPORT taxonomy. Records, Meetings, and the
 * department directory all fold into FIND. The /departments page remains
 * the canonical browse experience for all 25 departments — citizens reach
 * it via FIND → "Browse all departments" or via a category quick link.
 *
 * - `to` is an internal route path
 * - `href` is an external URL (renders <a target="_blank" rel="noopener">)
 * - Each task list stays at 4–6 items per Hick's Law / blueprint mega-menu spec
 */

export type NavTask =
  | {
      labelKey: string;
      to: string;
      external?: false;
      /** Optional category search param for /departments?category=foo links. */
      search?: { category?: string };
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
  /** Single-column list. */
  tasks?: NavTask[];
  /** Multi-column groups (FIND, ABOUT). */
  groups?: { headingKey: string; tasks: NavTask[] }[];
}

export const NAV_VERBS: NavVerb[] = [
  {
    key: "find",
    labelKey: "verbNav.find.label",
    icon: Search,
    groups: [
      {
        headingKey: "verbNav.find.headingRecords",
        tasks: [
          { labelKey: "verbNav.find.propertyDeeds", to: "/departments/register-of-deeds" },
          { labelKey: "verbNav.find.courtRecords", to: "/departments/circuit-court" },
          { labelKey: "verbNav.find.meetingMinutes", to: "/minutes" },
          { labelKey: "verbNav.find.documents", to: "/documents" },
          {
            labelKey: "verbNav.find.gisMap",
            href: "https://sullcotngis.maps.arcgis.com/apps/mapviewer/index.html?webmap=2004721405af4dd0952a592b42e6f5b6",
            external: true,
          },
        ],
      },
      {
        headingKey: "verbNav.find.headingMeetings",
        tasks: [
          { labelKey: "verbNav.find.calendar", to: "/calendar" },
          { labelKey: "verbNav.find.commissioners", to: "/commissioners" },
          { labelKey: "verbNav.find.news", to: "/news" },
          { labelKey: "verbNav.find.publicRecordsRequest", to: "/forms/public-records" },
        ],
      },
      {
        headingKey: "verbNav.find.headingDepartments",
        tasks: [
          { labelKey: "verbNav.find.allDepartments", to: "/departments" },
          { labelKey: "verbNav.find.administrative", to: "/departments" },
          { labelKey: "verbNav.find.courts", to: "/departments" },
          { labelKey: "verbNav.find.publicSafety", to: "/departments" },
          { labelKey: "verbNav.find.community", to: "/departments" },
        ],
      },
    ],
  },
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
