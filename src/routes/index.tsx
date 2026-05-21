import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AboutSection } from "~/components/home/AboutSection";
import { CommunityMap } from "~/components/home/CommunityMap";
import { HeroBanner } from "~/components/home/HeroBanner";
import { HomeWeatherAlertBanner } from "~/components/home/HomeWeatherAlertBanner";
import { SeasonalRibbon } from "~/components/home/SeasonalRibbon";
import { StorySection } from "~/components/home/StorySection";
import { TodaySection } from "~/components/home/TodaySection";
import { TourismAppPromo } from "~/components/home/TourismAppPromo";
import { governmentOrganizationJsonLd, jsonLdString } from "~/lib/jsonld";
import { getCurrentWeather } from "~/server/public-weather";
import type { PublicWeatherSnapshot } from "~/server/weather/refresh";
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
        media: "(min-width: 1024px)",
        fetchPriority: "high",
      },
    ],
  }),
});

function HomePage() {
  const [weatherSnapshot, setWeatherSnapshot] = useState<
    PublicWeatherSnapshot | null | undefined
  >();

  useEffect(() => {
    let cancelled = false;

    async function loadWeather() {
      try {
        const data = await getCurrentWeather();
        if (!cancelled) setWeatherSnapshot(data);
      } catch {
        if (!cancelled) setWeatherSnapshot(null);
      }
    }

    loadWeather();
    const intervalId = window.setInterval(loadWeather, 5 * 60 * 1000);
    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: jsonLdString(governmentOrganizationJsonLd) }}
      />
      <HomeWeatherAlertBanner snapshot={weatherSnapshot} />
      <HeroBanner weatherSnapshot={weatherSnapshot} />
      <SeasonalRibbon />
      <TodaySection />
      <CommunityMap />
      <StorySection />
      <TourismAppPromo />
      <AboutSection />
    </main>
  );
}
