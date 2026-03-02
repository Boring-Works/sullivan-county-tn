import { createFileRoute, Link } from "@tanstack/react-router";

import { HeritageHero } from "~/components/history/HeritageHero";
import { getCommunityBySlug } from "~/data/communities";
import { useScrollReveal } from "~/hooks/useScrollReveal";
import { seo, seoLinks } from "~/utils/seo";

export const Route = createFileRoute("/communities/$slug")({
  component: CommunityPage,
  head: ({ params }) => {
    const community = getCommunityBySlug(params.slug);
    return {
      meta: community
        ? seo({
            title: `${community.name} — Sullivan County Communities`,
            description: community.description.slice(0, 160),
            url: `/communities/${params.slug}`,
          })
        : [],
      links: community ? seoLinks(`/communities/${params.slug}`) : [],
    };
  },
});

function CommunityPage() {
  const { slug } = Route.useParams();
  const community = getCommunityBySlug(slug);
  const containerRef = useScrollReveal<HTMLDivElement>();

  if (!community) {
    return (
      <main id="main-content" className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-brand-navy">Community not found</h1>
        <p className="mt-2 text-brand-slate">
          This community page doesn't exist or may have been moved.
        </p>
        <Link
          to="/communities"
          className="mt-6 inline-block rounded-sm bg-brand-copper px-6 py-2 text-sm font-medium text-white hover:bg-brand-copper-light transition-colors"
        >
          Back to Communities
        </Link>
      </main>
    );
  }

  return (
    <main id="main-content">
      <HeritageHero title={community.name} subtitle={community.tagline} />

      <section className="bg-white py-16 sm:py-20">
        <div ref={containerRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2" data-reveal>
              <h2 className="font-display text-2xl font-bold text-brand-navy mb-4 sm:text-3xl">
                About {community.name}
              </h2>
              <div className="h-px w-20 bg-gradient-to-r from-brand-copper to-brand-brass/40 mb-6" />
              <div className="font-body text-base leading-relaxed text-brand-slate-light space-y-4 sm:text-lg">
                <p>{community.description}</p>
              </div>

              {/* Key Facts */}
              <div className="mt-10">
                <h3 className="font-display text-xl font-bold text-brand-navy mb-4">Key Facts</h3>
                <ul className="space-y-2">
                  {community.keyFacts.map((fact) => (
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

              {/* Landmarks */}
              {community.landmarks.length > 0 && (
                <div className="mt-10">
                  <h3 className="font-display text-xl font-bold text-brand-navy mb-4">
                    Notable Landmarks
                  </h3>
                  <ul className="space-y-2">
                    {community.landmarks.map((landmark) => (
                      <li
                        key={landmark}
                        className="flex items-start gap-3 font-body text-sm text-brand-slate-light"
                      >
                        <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-brand-sage shrink-0" />
                        {landmark}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div data-reveal data-reveal-delay={120} className="space-y-6">
              {/* Quick stats */}
              <div className="rounded-sm border border-brand-surface bg-brand-parchment p-6">
                <h3 className="font-display text-lg font-bold text-brand-navy mb-4">At a Glance</h3>
                <dl className="space-y-3 font-body text-sm">
                  {community.highlights.map((h) => (
                    <div key={h.label} className="flex justify-between">
                      <dt className="text-brand-stone">{h.label}</dt>
                      <dd className="font-semibold text-brand-navy">{h.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-sm border border-brand-surface bg-white p-6">
                <h3 className="font-display text-sm font-bold text-brand-navy mb-3">
                  Explore More
                </h3>
                <div className="space-y-2">
                  <Link
                    to="/communities"
                    className="block font-body text-sm text-brand-copper hover:text-brand-copper-light transition-colors"
                  >
                    &larr; All Communities
                  </Link>
                  <Link
                    to="/history"
                    className="block font-body text-sm text-brand-copper hover:text-brand-copper-light transition-colors"
                  >
                    The Founding Story
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
