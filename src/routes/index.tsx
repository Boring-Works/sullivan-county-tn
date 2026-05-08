import { createFileRoute } from "@tanstack/react-router";
import { AboutSection } from "~/components/home/AboutSection";
import { AudiencePathways } from "~/components/home/AudiencePathways";
import { CommunityMap } from "~/components/home/CommunityMap";
import { HeroBanner } from "~/components/home/HeroBanner";
import { SeasonalRibbon } from "~/components/home/SeasonalRibbon";
import { StorySection } from "~/components/home/StorySection";
import { TodaySection } from "~/components/home/TodaySection";
import { MountainDivider } from "~/components/shared/MountainDivider";
import { governmentOrganizationJsonLd, jsonLdString } from "~/lib/jsonld";
import { seo, seoLinks } from "~/utils/seo";

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
        dangerouslySetInnerHTML={{ __html: jsonLdString(governmentOrganizationJsonLd) }}
      />
      <HeroBanner />
      <SeasonalRibbon />
      <AudiencePathways />
      <TodaySection />
      <MountainDivider fill="var(--color-brand-parchment)" />
      <CommunityMap />
      <StorySection />
      <AboutSection />
    </main>
  );
}
