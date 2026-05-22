export type ExternalHandoffCategory =
  | "taxes"
  | "records"
  | "roads"
  | "water"
  | "elections"
  | "tourism"
  | "public-safety"
  | "state"
  | "community";

export interface ExternalHandoff {
  id: string;
  label: string;
  url: string;
  owner: string;
  description: string;
  handoffNote: string;
  category: ExternalHandoffCategory;
}

export const externalHandoffs = {
  trusteePayTaxes: {
    id: "trusteePayTaxes",
    label: "Sullivan County Trustee tax portal",
    url: "https://sullivantntrustee.gov/property-tax/",
    owner: "Sullivan County Trustee",
    description: "Search and pay Sullivan County property taxes.",
    handoffNote: "Opens the official Trustee payment portal in a new tab.",
    category: "taxes",
  },
  tpadAssessment: {
    id: "tpadAssessment",
    label: "Tennessee property assessment search",
    url: "https://assessment.cot.tn.gov/TPAD/Search",
    owner: "Tennessee Comptroller of the Treasury",
    description: "Look up property assessment and parcel information.",
    handoffNote: "Opens the official Tennessee assessment site in a new tab.",
    category: "taxes",
  },
  gisMap: {
    id: "gisMap",
    label: "Sullivan County GIS map",
    url: "https://sullcotngis.maps.arcgis.com/apps/mapviewer/index.html?webmap=2004721405af4dd0952a592b42e6f5b6",
    owner: "Sullivan County GIS",
    description: "View parcels and county map layers.",
    handoffNote: "Opens ArcGIS Online in a new tab.",
    category: "records",
  },
  countyClerkPlateRenewal: {
    id: "countyClerkPlateRenewal",
    label: "Renew vehicle tags",
    url: "https://secure.tncountyclerk.com/platerenewals/platerenewals.php?countylist=82",
    owner: "Sullivan County Clerk / Tennessee County Clerk",
    description: "Renew Sullivan County vehicle registration online.",
    handoffNote: "Opens the official Tennessee County Clerk renewal system in a new tab.",
    category: "state",
  },
  countyClerkMarriage: {
    id: "countyClerkMarriage",
    label: "Start marriage license application",
    url: "https://secure.tncountyclerk.com/marriageform/marriageform.php?countylist=82",
    owner: "Sullivan County Clerk / Tennessee County Clerk",
    description: "Begin the Sullivan County marriage license application online.",
    handoffNote:
      "Both applicants still need to appear in person unless an official exception applies.",
    category: "state",
  },
  voterRegistration: {
    id: "voterRegistration",
    label: "Register to vote online",
    url: "https://ovr.govote.tn.gov/",
    owner: "Tennessee Secretary of State",
    description: "Register to vote or update voter registration information.",
    handoffNote: "Opens the official Tennessee online voter registration site in a new tab.",
    category: "elections",
  },
  voterLookup: {
    id: "voterLookup",
    label: "Check voter registration",
    url: "https://tnmap.tn.gov/voterlookup/",
    owner: "Tennessee Secretary of State",
    description: "Check registration status and polling information.",
    handoffNote: "Opens the official Tennessee voter lookup in a new tab.",
    category: "elections",
  },
  smartway: {
    id: "smartway",
    label: "TDOT SmartWay traffic",
    url: "https://smartway.tn.gov/traffic",
    owner: "Tennessee Department of Transportation",
    description: "View road conditions, traffic, and incidents.",
    handoffNote: "Opens TDOT SmartWay in a new tab.",
    category: "roads",
  },
  tn511: {
    id: "tn511",
    label: "TN 511 road conditions",
    url: "https://www.tn511.com/",
    owner: "Tennessee Department of Transportation",
    description: "Check statewide road conditions and travel alerts.",
    handoffNote: "Opens TN 511 in a new tab.",
    category: "roads",
  },
  commissionYoutube: {
    id: "commissionYoutube",
    label: "Commission YouTube channel",
    url: "https://www.youtube.com/@sullivancountycommission",
    owner: "Sullivan County Commission",
    description: "Watch commission meetings and public sessions online.",
    handoffNote: "Opens YouTube in a new tab.",
    category: "community",
  },
} satisfies Record<string, ExternalHandoff>;

export type ExternalHandoffId = keyof typeof externalHandoffs;

export function getExternalHandoff(id: ExternalHandoffId): ExternalHandoff {
  return externalHandoffs[id];
}
