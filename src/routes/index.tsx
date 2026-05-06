import { createFileRoute } from "@tanstack/react-router";
import { AboutSection } from "~/components/home/AboutSection";
import { CommunityMap } from "~/components/home/CommunityMap";
import { DepartmentCategories } from "~/components/home/DepartmentCategories";
import { EmergencyModule } from "~/components/home/EmergencyModule";
import { HeroBanner } from "~/components/home/HeroBanner";
import { NewsSection } from "~/components/home/NewsSection";
import { NextMeetingCard } from "~/components/home/NextMeetingCard";
import { PromisesSection } from "~/components/home/PromisesSection";
import { QuickServices } from "~/components/home/QuickServices";
import { MountainDivider } from "~/components/shared/MountainDivider";
import { SITE_URL, seo, seoLinks } from "~/utils/seo";

const governmentJsonLd = {
  "@context": "https://schema.org",
  "@type": "GovernmentOrganization",
  name: "Sullivan County Government",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
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

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: seo({
      title: "Sullivan County, Tennessee — Official Government Website",
      description:
        "Official website for Sullivan County, Tennessee. Find departments, services, contact information, and county resources. Established 1779.",
      image: "/images/og/og-default.jpg",
      url: "/",
    }),
    links: [
      ...seoLinks("/"),
      {
        rel: "preload",
        href: "/images/hero/boone-lake-1920.webp",
        as: "image",
        type: "image/webp",
        fetchPriority: "high",
      },
    ],
  }),
});

function HomePage() {
  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(governmentJsonLd) }}
      />
      <HeroBanner />
      <EmergencyModule />
      <QuickServices />
      <MountainDivider fill="var(--color-brand-parchment)" />
      <DepartmentCategories />
      <PromisesSection />
      <NextMeetingCard />
      <NewsSection />
      <CommunityMap />
      <AboutSection />
    </main>
  );
}
