import { createFileRoute } from "@tanstack/react-router";
import { AboutSection } from "~/components/home/AboutSection";
import { CommunityHighlights } from "~/components/home/CommunityHighlights";
import { DepartmentCategories } from "~/components/home/DepartmentCategories";
import { HeroBanner } from "~/components/home/HeroBanner";
import { NewsSection } from "~/components/home/NewsSection";
import { QuickServices } from "~/components/home/QuickServices";
import { MountainDivider, MountainDividerInverted } from "~/components/shared/MountainDivider";
import { SITE_URL } from "~/utils/seo";

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
      <AboutSection />
      <QuickServices />
      <MountainDivider fill="var(--color-brand-parchment)" />
      <DepartmentCategories />
      <MountainDividerInverted fill="var(--color-brand-parchment)" className="bg-white" />
      <CommunityHighlights />
      <NewsSection />
    </main>
  );
}
