import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";

import { HeritageHero } from "~/components/history/HeritageHero";
import { HeritageSiteCard } from "~/components/history/HeritageSiteCard";
import { HistoryNarrative } from "~/components/history/HistoryNarrative";
import { MountainDivider, MountainDividerInverted } from "~/components/shared/MountainDivider";
import { getTrailStops } from "~/data/heritage-sites";
import { useScrollReveal } from "~/hooks/useScrollReveal";
import { seo, seoLinks } from "~/utils/seo";

export const Route = createFileRoute("/visit")({
  component: VisitPage,
  head: () => ({
    meta: seo({
      title: "Visit Sullivan County — Heritage Trail, Parks & Recreation",
      description:
        "Plan your visit to Sullivan County, Tennessee. Explore the Heritage Trail, state parks, lakes, Bristol Motor Speedway, and the Birthplace of Country Music.",
      url: "/visit",
    }),
    links: seoLinks("/visit"),
  }),
});

function VisitPage() {
  const trailStops = getTrailStops();
  const parksRef = useScrollReveal<HTMLDivElement>();

  const parks = [
    {
      name: "Warriors' Path State Park",
      acres: "950 acres",
      description: "On the shores of Patrick Henry Lake. Hiking, camping, golf, marina, swimming.",
      url: "https://tnstateparks.com/parks/warriors-path",
    },
    {
      name: "Bays Mountain Park & Planetarium",
      acres: "3,550 acres",
      description:
        "Largest city-owned park in Tennessee. Nature center, planetarium, wildlife habitats, 40+ miles of trails.",
      url: "https://www.baysmountain.com",
    },
    {
      name: "Steele Creek Park",
      acres: "2,200+ acres",
      description:
        "Bristol's premier park. Third-largest municipal park in Tennessee. Lake, trails, nature center.",
    },
    {
      name: "South Holston Lake",
      acres: "7,580 acres",
      description: "TVA reservoir with excellent fishing, boating, and camping. Completed 1950.",
    },
    {
      name: "Boone Lake",
      acres: "4,400 acres",
      description:
        "Scenic lake straddling Sullivan and Washington Counties. Boating, fishing, swimming.",
    },
  ];

  return (
    <main id="main-content">
      <HeritageHero
        title="Visit Sullivan County"
        subtitle="Heritage sites, state parks, lakes, and music — explore everything Sullivan County has to offer."
      />

      {/* Heritage Trail section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="inline-block font-body text-xs font-medium tracking-widest uppercase text-brand-brass mb-4">
              Heritage Trail
            </span>
            <h2 className="font-display text-3xl font-bold text-brand-navy sm:text-4xl">
              Historic Sites
            </h2>
            <div className="mt-4 mx-auto h-px w-20 bg-gradient-to-r from-transparent via-brand-copper to-transparent" />
            <p className="mt-4 mx-auto max-w-2xl font-body text-base text-brand-slate-light">
              Follow the Sullivan County Heritage Trail through sites that tell the story of
              Cherokee homeland, frontier settlement, and the founding of Tennessee's government.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trailStops.map((site, i) => (
              <HeritageSiteCard key={site.slug} site={site} index={i} />
            ))}
          </div>
        </div>
      </section>

      <MountainDivider fill="var(--color-brand-parchment)" />

      {/* Parks & Recreation */}
      <section className="bg-brand-parchment py-16 sm:py-20">
        <div ref={parksRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-reveal className="mb-12 text-center">
            <span className="inline-block font-body text-xs font-medium tracking-widest uppercase text-brand-brass mb-4">
              Parks & Recreation
            </span>
            <h2 className="font-display text-3xl font-bold text-brand-navy sm:text-4xl">
              Outdoor Activities
            </h2>
            <div className="mt-4 mx-auto h-px w-20 bg-gradient-to-r from-transparent via-brand-copper to-transparent" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {parks.map((park, i) => (
              <div
                key={park.name}
                data-reveal
                data-reveal-delay={i * 100}
                className="rounded-sm border border-brand-surface bg-white p-6"
              >
                <h3 className="font-display text-lg font-bold text-brand-navy mb-1">{park.name}</h3>
                <p className="font-body text-xs font-semibold text-brand-copper mb-3">
                  {park.acres}
                </p>
                <p className="font-body text-sm leading-relaxed text-brand-slate-light">
                  {park.description}
                </p>
                {park.url && (
                  <a
                    href={park.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 font-body text-xs font-semibold text-brand-copper hover:text-brand-copper-light transition-colors"
                  >
                    Visit website
                    <ExternalLink className="size-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <MountainDividerInverted fill="var(--color-brand-parchment)" className="bg-white" />

      <HistoryNarrative eyebrow="Events & Entertainment" title="Experiences">
        <p>
          <strong>Bristol Motor Speedway</strong> — "The Last Great Colosseum" seats 146,000 fans
          for NASCAR race weekends and special events. The 2016 "Battle at Bristol" drew 156,990
          fans for a college football game between Tennessee and Virginia Tech — the largest crowd
          to ever watch a college football game.
        </p>
        <p>
          The <strong>Bristol Rhythm and Roots Reunion</strong> draws 30,000–45,000 annual attendees
          to downtown Bristol for a celebration of Americana music. The{" "}
          <strong>Birthplace of Country Music Museum</strong> (Bristol, Virginia — adjacent to
          Sullivan County) tells the story of the 1927 Bristol Sessions.
        </p>
      </HistoryNarrative>

      {/* Practical info */}
      <section className="bg-brand-parchment py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl font-bold text-brand-navy mb-6 sm:text-3xl">
            Getting Here
          </h2>
          <p className="font-body text-base text-brand-slate-light mb-8">
            <strong>Tri-Cities Airport (TRI)</strong> is located in Blountville. Sullivan County is
            accessible via <strong>I-81</strong> (north-south) and <strong>I-26</strong>{" "}
            (east-west).
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/history"
              className="inline-flex items-center gap-2 rounded-sm bg-brand-copper px-6 py-3 font-body text-sm font-semibold text-white transition-all hover:bg-brand-copper-light hover:shadow-lg"
            >
              The Founding Story
            </Link>
            <Link
              to="/communities"
              className="inline-flex items-center gap-2 rounded-sm border border-brand-navy/15 px-6 py-3 font-body text-sm font-medium text-brand-navy transition-all hover:border-brand-navy/30 hover:bg-brand-navy/5"
            >
              Our Communities
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-sm border border-brand-navy/15 px-6 py-3 font-body text-sm font-medium text-brand-navy transition-all hover:border-brand-navy/30 hover:bg-brand-navy/5"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
