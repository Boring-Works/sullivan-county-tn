import { createFileRoute } from "@tanstack/react-router";

import { HeritageHero } from "~/components/history/HeritageHero";
import { TimelineSection } from "~/components/history/TimelineSection";
import { timelineEvents } from "~/data/timeline";
import { seo, seoLinks } from "~/utils/seo";

export const Route = createFileRoute("/history/timeline")({
  component: TimelinePage,
  head: () => ({
    meta: seo({
      title: "Sullivan County Timeline — 1761 to Present",
      description:
        "An interactive timeline of Sullivan County, Tennessee from Cherokee homeland through frontier settlement, the Southwest Territory, Civil War, industrialization, and the modern era.",
      url: "/history/timeline",
    }),
    links: seoLinks("/history/timeline"),
  }),
});

function TimelinePage() {
  const frontier = timelineEvents.filter((e) => e.year < 1790);
  const territory = timelineEvents.filter((e) => e.year >= 1790 && e.year < 1800);
  const antebellum = timelineEvents.filter((e) => e.year >= 1800 && e.year < 1861);
  const civilWar = timelineEvents.filter((e) => e.year >= 1861 && e.year < 1866);
  const industrial = timelineEvents.filter((e) => e.year >= 1866 && e.year < 1950);
  const modern = timelineEvents.filter((e) => e.year >= 1950);

  return (
    <main id="main-content">
      <HeritageHero
        title="Sullivan County Timeline"
        subtitle="From Cherokee homeland to modern Appalachian community — over 250 years of history."
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-20">
          <TimelineSection events={frontier} title="Frontier Era (1761–1789)" />
          <TimelineSection events={territory} title="Southwest Territory (1790–1799)" />
          <TimelineSection events={antebellum} title="Antebellum Era (1800–1860)" />
          <TimelineSection events={civilWar} title="Civil War (1861–1865)" />
          <TimelineSection events={industrial} title="Industrialization (1866–1949)" />
          <TimelineSection events={modern} title="Modern Era (1950–Present)" />
        </div>
      </section>
    </main>
  );
}
