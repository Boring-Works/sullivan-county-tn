import { createFileRoute } from "@tanstack/react-router";
import { CommunityCard } from "~/components/communities/CommunityCard";
import { HeritageHero } from "~/components/history/HeritageHero";
import { communities } from "~/data/communities";
import { useScrollReveal } from "~/hooks/useScrollReveal";
import { seo, seoLinks } from "~/utils/seo";

export const Route = createFileRoute("/communities/")({
  component: CommunitiesPage,
  head: () => ({
    meta: seo({
      title: "Communities — Sullivan County, Tennessee",
      description:
        "Explore the cities, towns, and communities of Sullivan County, Tennessee — from Kingsport and Bristol to historic Blountville and beyond.",
      url: "/communities",
    }),
    links: seoLinks("/communities"),
  }),
});

function CommunitiesPage() {
  const containerRef = useScrollReveal<HTMLDivElement>();

  return (
    <main id="main-content">
      <HeritageHero
        title="Our Communities"
        subtitle="From America's Model City to the Birthplace of Country Music — the places that make Sullivan County home."
      />

      <section className="bg-white py-16 sm:py-20">
        <div ref={containerRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {communities.map((community, i) => (
              <CommunityCard key={community.slug} community={community} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
