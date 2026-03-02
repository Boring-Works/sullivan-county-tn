import { createFileRoute, Link } from "@tanstack/react-router";

import { HeritageHero } from "~/components/history/HeritageHero";
import { PersonCard } from "~/components/people/PersonCard";
import { notablePeople } from "~/data/notable-people";
import { useScrollReveal } from "~/hooks/useScrollReveal";
import { seo, seoLinks } from "~/utils/seo";

export const Route = createFileRoute("/people")({
  component: PeoplePage,
  head: () => ({
    meta: seo({
      title: "Notable People — Sullivan County, Tennessee",
      description:
        "From Revolutionary War heroes to the inventor of Super Glue, Sullivan County has produced remarkable individuals across music, science, sports, and industry.",
      url: "/people",
    }),
    links: seoLinks("/people"),
  }),
});

function PeoplePage() {
  const containerRef = useScrollReveal<HTMLDivElement>();

  return (
    <main id="main-content">
      <HeritageHero
        title="Notable People"
        subtitle="Revolutionary heroes, country music pioneers, scientists, athletes — the people who shaped Sullivan County and beyond."
      />

      <section className="bg-white py-16 sm:py-20">
        <div ref={containerRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {notablePeople.map((person, i) => (
              <PersonCard key={person.name} person={person} index={i} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/history"
              className="inline-flex items-center gap-2 rounded-sm bg-brand-copper px-6 py-3 font-body text-sm font-semibold text-white transition-all hover:bg-brand-copper-light hover:shadow-lg"
            >
              The Founding Story
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
