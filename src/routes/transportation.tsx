import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Plane, Route as RouteIcon, Train } from "lucide-react";

import { HeritageHero } from "~/components/history/HeritageHero";
import { HistoryNarrative } from "~/components/history/HistoryNarrative";
import { MountainDivider } from "~/components/shared/MountainDivider";
import { useScrollReveal } from "~/hooks/useScrollReveal";
import { seo, seoLinks } from "~/utils/seo";

export const Route = createFileRoute("/transportation")({
  component: TransportationPage,
  head: () => ({
    meta: seo({
      title: "Transportation — Sullivan County, Tennessee",
      description:
        "Sullivan County is served by Tri-Cities Airport (TRI), Interstate 81 and 26, and regional transit. TRI set a 2023 record of 448,514 passengers.",
      url: "/transportation",
    }),
    links: seoLinks("/transportation"),
  }),
});

function TransportationPage() {
  const containerRef = useScrollReveal<HTMLDivElement>();

  const transportModes = [
    {
      icon: Plane,
      title: "Tri-Cities Airport (TRI)",
      location: "Blountville, TN",
      facts: [
        "448,514 passengers in 2023 (record)",
        "Dedicated November 5, 1937",
        "Allegiant, American, Delta, United airlines",
        "Direct flights to major hubs",
      ],
      link: "https://www.triflight.com",
    },
    {
      icon: RouteIcon,
      title: "Interstate Highways",
      location: "I-81 & I-26 junction",
      facts: [
        "I-81: Major north-south corridor (Virginia to Tennessee)",
        "I-26: East-west corridor to Asheville/Charleston",
        "I-81 completed through Sullivan County, August 1975",
        "US-11W, US-421, TN-126 (Great Stage Road)",
      ],
    },
    {
      icon: Train,
      title: "Public Transit",
      location: "Regional services",
      facts: [
        "KATS (Kingsport Area Transit Service)",
        "Bristol Transit",
        "NET Trans (regional demand-response)",
        "BTES 10-gigabit community fiber network (digital infrastructure)",
      ],
    },
  ];

  return (
    <main id="main-content">
      <HeritageHero
        title="Transportation"
        subtitle="Connected by air, highway, and history — Sullivan County sits at the crossroads of the Appalachian Highlands."
      />

      <section className="bg-white py-16 sm:py-20">
        <div ref={containerRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {transportModes.map((mode, i) => {
              const Icon = mode.icon;
              return (
                <div
                  key={mode.title}
                  data-reveal
                  data-reveal-delay={i * 100}
                  className="rounded-sm border border-brand-surface bg-white p-6"
                >
                  <Icon className="size-8 text-brand-copper mb-4" />
                  <h3 className="font-display text-lg font-bold text-brand-navy mb-1">
                    {mode.title}
                  </h3>
                  <p className="font-body text-xs text-brand-stone mb-4">{mode.location}</p>
                  <ul className="space-y-2">
                    {mode.facts.map((fact) => (
                      <li
                        key={fact}
                        className="flex items-start gap-3 font-body text-sm text-brand-slate-light"
                      >
                        <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-brand-copper shrink-0" />
                        {fact}
                      </li>
                    ))}
                  </ul>
                  {mode.link && (
                    <a
                      href={mode.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 font-body text-xs font-semibold text-brand-copper hover:text-brand-copper-light transition-colors"
                    >
                      Visit website
                      <ExternalLink className="size-3" />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <MountainDivider fill="var(--color-brand-parchment)" />

      <HistoryNarrative
        eyebrow="Historical Context"
        title="From Stage Road to Interstate"
        background="parchment"
      >
        <p>
          Transportation has shaped Sullivan County since the 18th century. The{" "}
          <strong>Great Stage Road</strong> (present-day TN-126) carried stagecoaches through
          Blountville, fueling the Old Deery Inn and connecting the county to the wider nation. The
          Holston River served as a water highway — William King's boatyard at Long Island (later
          the Netherland Inn) was a commercial hub.
        </p>
        <p>
          In 1909, the <strong>Carolina, Clinchfield and Ohio Railway</strong> reached Kingsport,
          catalyzing the city's transformation into a planned industrial center. Tri-Cities Airport
          was dedicated in 1937, and <strong>Interstate 81 was completed</strong> through the county
          in August 1975, connecting Sullivan County to the national highway system.
        </p>
      </HistoryNarrative>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-sm border border-brand-navy/15 px-6 py-3 font-body text-sm font-medium text-brand-navy transition-all hover:border-brand-navy/30 hover:bg-brand-navy/5"
            >
              About Sullivan County
            </Link>
            <Link
              to="/economic-development"
              className="inline-flex items-center gap-2 rounded-sm border border-brand-navy/15 px-6 py-3 font-body text-sm font-medium text-brand-navy transition-all hover:border-brand-navy/30 hover:bg-brand-navy/5"
            >
              Economic Development
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
