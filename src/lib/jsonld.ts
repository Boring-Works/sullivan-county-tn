import { SITE_URL } from "~/utils/seo";

/**
 * Canonical GovernmentOrganization JSON-LD for Sullivan County. Single source
 * of truth used by the root layout and the homepage.
 */
export const governmentOrganizationJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "GovernmentOrganization",
  name: "Sullivan County, Tennessee",
  url: SITE_URL,
  logo: `${SITE_URL}/images/seal/sullivan-seal.svg`,
  description:
    "Official government website for Sullivan County, Tennessee. Find departments, services, contact information, and county resources. Established 1779.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "3411 TN-126",
    addressLocality: "Blountville",
    addressRegion: "TN",
    postalCode: "37617",
    addressCountry: "US",
  },
  telephone: "+1-423-323-6417",
  foundingDate: "1779",
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Sullivan County, Tennessee",
  },
};

export interface BreadcrumbItem {
  name: string;
  /** Path-only URL, e.g. "/departments". Joined to SITE_URL. */
  path: string;
}

export function breadcrumbList(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function eventJsonLd(input: {
  name: string;
  start: Date;
  end: Date;
  location: string;
  description?: string;
  url?: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: input.name,
    startDate: input.start.toISOString(),
    endDate: input.end.toISOString(),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    location: {
      "@type": "Place",
      name: input.location,
      address: {
        "@type": "PostalAddress",
        streetAddress: "3411 TN-126",
        addressLocality: "Blountville",
        addressRegion: "TN",
        postalCode: "37617",
        addressCountry: "US",
      },
    },
    organizer: {
      "@type": "GovernmentOrganization",
      name: "Sullivan County, Tennessee",
      url: SITE_URL,
    },
    description: input.description,
    url: input.url,
  };
}

/**
 * FAQPage schema. Featured snippets from FAQPage rich results have ~35% CTR
 * — and that rich-result type is restricted to government and health sites,
 * which makes it a unique advantage for county pages. Blueprint Insight 12.
 */
export function faqPageJsonLd(
  items: Array<{ question: string; answer: string }>,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/**
 * GovernmentService schema for an individual citizen service. Use for permits,
 * payments, records requests — anything a citizen "does" with the county.
 */
export function governmentServiceJsonLd(input: {
  name: string;
  serviceType: string;
  description?: string;
  url?: string;
  audienceType?: string;
  potentialActionUrl?: string;
  potentialActionName?: string;
}): Record<string, unknown> {
  const action =
    input.potentialActionUrl && input.potentialActionName
      ? {
          "@type": "Action",
          target: input.potentialActionUrl,
          name: input.potentialActionName,
        }
      : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    name: input.name,
    serviceType: input.serviceType,
    description: input.description,
    url: input.url,
    provider: {
      "@type": "GovernmentOrganization",
      name: "Sullivan County, Tennessee",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Sullivan County, Tennessee",
    },
    audience: input.audienceType
      ? { "@type": "Audience", audienceType: input.audienceType }
      : undefined,
    potentialAction: action,
  };
}

/**
 * Inline JSON-LD as a string for `dangerouslySetInnerHTML`.
 * Filters out undefined values so the rendered JSON stays tidy.
 */
export function jsonLdString(value: Record<string, unknown> | Record<string, unknown>[]): string {
  return JSON.stringify(value, (_, v) => (v === undefined ? undefined : v));
}
