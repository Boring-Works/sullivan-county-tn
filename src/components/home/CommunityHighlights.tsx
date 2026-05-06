import { Link } from "@tanstack/react-router";
import { Landmark, Mountain, Music } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "~/hooks/useScrollReveal";

const HIGHLIGHTS = [
  {
    title: "Where Tennessee Began",
    description:
      "In 1790, Governor William Blount established the Southwest Territory's capital at Rocky Mount — making Sullivan County the birthplace of Tennessee's government. Explore the founding story.",
    to: "/history" as const,
    icon: Landmark,
  },
  {
    title: "Appalachian Highlands",
    description:
      "From Boone Lake and South Holston Lake to Bays Mountain Park (3,550 acres) and Warriors' Path State Park, Sullivan County offers 430 square miles of Appalachian beauty.",
    to: "/history/timeline" as const,
    icon: Mountain,
  },
  {
    title: "Birthplace of Country Music",
    description:
      "In 1927, the Bristol Sessions recorded Jimmie Rodgers and the Carter Family — the 'Big Bang of Country Music.' The U.S. Congress designated Bristol the Birthplace of Country Music in 1998.",
    to: "/history/timeline" as const,
    icon: Music,
  },
];

export function CommunityHighlights() {
  const containerRef = useScrollReveal<HTMLElement>();
  const { t } = useTranslation();

  return (
    <section ref={containerRef} className="relative bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-reveal className="mb-12 text-center">
          <span className="inline-block font-body text-xs font-medium tracking-widest uppercase text-brand-brass mb-4">
            {t("home.communities.eyebrow")}
          </span>
          <h2 className="font-display text-3xl font-bold text-brand-navy sm:text-4xl">
            {t("home.communities.heading")}
          </h2>
          <div className="mt-4 mx-auto h-px w-20 bg-gradient-to-r from-transparent via-brand-copper to-transparent" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {HIGHLIGHTS.map((item, i) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                to={item.to}
                data-reveal
                data-reveal-delay={i * 100}
                className="card-lift group relative flex flex-col rounded-sm border border-brand-surface bg-brand-parchment overflow-hidden transition-colors hover:border-brand-navy/15"
              >
                <div className="flex-1 p-7">
                  <div className="mb-4">
                    <Icon className="size-7 text-brand-stone" />
                  </div>

                  <h3 className="font-display text-lg font-bold text-brand-navy mb-3 transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-brand-slate-light flex-1">
                    {item.description}
                  </p>

                  <div className="mt-5 inline-flex items-center gap-1.5 font-body text-xs font-semibold text-brand-copper group-hover:text-brand-copper-light transition-colors">
                    {t("home.communities.explore")} &rarr;
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
