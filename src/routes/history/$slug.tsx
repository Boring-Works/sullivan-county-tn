import { createFileRoute, Link } from "@tanstack/react-router";

import { HeritageHero } from "~/components/history/HeritageHero";
import { VisitorInfoCard } from "~/components/history/VisitorInfoCard";
import { getHeritageSiteBySlug } from "~/data/heritage-sites";
import { timelineEvents } from "~/data/timeline";
import { useScrollReveal } from "~/hooks/useScrollReveal";
import { seo, seoLinks } from "~/utils/seo";

export const Route = createFileRoute("/history/$slug")({
  component: HeritageSitePage,
  head: ({ params }) => {
    const site = getHeritageSiteBySlug(params.slug);
    return {
      meta: site
        ? seo({
            title: `${site.name} — Sullivan County History`,
            description: site.historicalSignificance,
            url: `/history/${params.slug}`,
          })
        : [],
      links: site ? seoLinks(`/history/${params.slug}`) : [],
    };
  },
});

function HeritageSitePage() {
  const { slug } = Route.useParams();
  const site = getHeritageSiteBySlug(slug);
  const containerRef = useScrollReveal<HTMLDivElement>();

  if (!site) {
    return (
      <main id="main-content" className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-brand-navy">Site not found</h1>
        <p className="mt-2 text-brand-slate">
          This heritage site doesn't exist or may have been moved.
        </p>
        <Link
          to="/history"
          className="mt-6 inline-block rounded-sm bg-brand-copper px-6 py-2 text-sm font-medium text-white hover:bg-brand-copper-light transition-colors"
        >
          Back to History
        </Link>
      </main>
    );
  }

  const relatedEvents = timelineEvents.filter((e) => e.siteSlug === slug);

  return (
    <main id="main-content">
      <HeritageHero title={site.name} subtitle={site.historicalSignificance} />

      <section className="bg-white py-16 sm:py-20">
        <div ref={containerRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2" data-reveal>
              <span className="inline-block font-body text-xs font-medium tracking-widest uppercase text-brand-brass mb-4">
                {site.established}
              </span>
              <h2 className="font-display text-2xl font-bold text-brand-navy mb-4 sm:text-3xl">
                About {site.name}
              </h2>
              <div className="h-px w-20 bg-gradient-to-r from-brand-copper to-brand-brass/40 mb-6" />
              <div className="font-body text-base leading-relaxed text-brand-slate-light space-y-4 sm:text-lg">
                <p>{site.description}</p>
              </div>

              {/* Key Facts */}
              <div className="mt-10">
                <h3 className="font-display text-xl font-bold text-brand-navy mb-4">Key Facts</h3>
                <ul className="space-y-2">
                  {site.keyFacts.map((fact) => (
                    <li
                      key={fact}
                      className="flex items-start gap-3 font-body text-sm text-brand-slate-light"
                    >
                      <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-brand-copper shrink-0" />
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Timeline Events */}
              {relatedEvents.length > 0 && (
                <div className="mt-10">
                  <h3 className="font-display text-xl font-bold text-brand-navy mb-4">Timeline</h3>
                  <div className="space-y-3">
                    {relatedEvents.map((event) => (
                      <div
                        key={`${event.year}-${event.title}`}
                        className="flex gap-4 rounded-sm border border-brand-surface bg-brand-parchment p-4"
                      >
                        <span className="font-display text-lg font-bold text-brand-copper shrink-0">
                          {event.year}
                        </span>
                        <div>
                          <h4 className="font-body text-sm font-semibold text-brand-navy">
                            {event.title}
                          </h4>
                          <p className="font-body text-xs text-brand-slate-light mt-1">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div data-reveal data-reveal-delay={120} className="space-y-6">
              <VisitorInfoCard site={site} />

              <div className="rounded-sm border border-brand-surface bg-white p-6">
                <h3 className="font-display text-sm font-bold text-brand-navy mb-3">
                  Explore More
                </h3>
                <div className="space-y-2">
                  <Link
                    to="/history"
                    className="block font-body text-sm text-brand-copper hover:text-brand-copper-light transition-colors"
                  >
                    &larr; The Founding Story
                  </Link>
                  <Link
                    to="/history/timeline"
                    className="block font-body text-sm text-brand-copper hover:text-brand-copper-light transition-colors"
                  >
                    Full Timeline
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
