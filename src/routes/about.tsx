import { createFileRoute, Link } from "@tanstack/react-router";

import { HeritageHero } from "~/components/history/HeritageHero";
import { HistoryNarrative } from "~/components/history/HistoryNarrative";
import { MountainDivider, MountainDividerInverted } from "~/components/shared/MountainDivider";
import { useScrollReveal } from "~/hooks/useScrollReveal";
import { seo, seoLinks } from "~/utils/seo";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: seo({
      title: "About Sullivan County — Tennessee's Second Oldest County",
      description:
        "Sullivan County covers 413 square miles of the Appalachian Highlands. Home to 158,000+ residents, it's the most populous county in the Tri-Cities region and where Tennessee's government began.",
      url: "/about",
    }),
    links: seoLinks("/about"),
  }),
});

function AboutPage() {
  const statsRef = useScrollReveal<HTMLDivElement>();

  const stats = [
    { label: "Population", value: "158,163", note: "2020 Census" },
    { label: "Area", value: "413 sq mi", note: "Land area" },
    { label: "Established", value: "1779", note: "Second oldest in TN" },
    {
      label: "County Seat",
      value: "Blountville",
      note: "Only unincorporated county seat in TN",
    },
    { label: "Departments", value: "25", note: "County government" },
    {
      label: "School Systems",
      value: "3",
      note: "Sullivan, Kingsport, Bristol",
    },
  ];

  return (
    <main id="main-content">
      <HeritageHero
        title="About Sullivan County"
        subtitle="Tennessee's second oldest county — 413 square miles of Appalachian heritage, industry, and community."
      />

      {/* Quick stats grid */}
      <section className="bg-white py-16 sm:py-20">
        <div ref={statsRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {stats.map((stat, i) => (
              <div key={stat.label} data-reveal data-reveal-delay={i * 80} className="text-center">
                <div className="font-display text-2xl font-bold text-brand-navy sm:text-3xl">
                  {stat.value}
                </div>
                <div className="font-body text-xs font-semibold uppercase tracking-wider text-brand-copper mt-1">
                  {stat.label}
                </div>
                <div className="font-body text-[10px] text-brand-stone mt-0.5">{stat.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MountainDivider fill="var(--color-brand-parchment)" />

      <HistoryNarrative
        eyebrow="Geography"
        title="The Appalachian Highlands"
        background="parchment"
      >
        <p>
          Sullivan County lies in the northeastern corner of Tennessee, spanning three physiographic
          regions — the Great Valley, the Appalachian Ridge, and the western edge of the Blue Ridge
          Mountains. The Holston River and its tributaries shape the landscape, with Boone Lake and
          South Holston Lake (7,580 acres) providing recreation and water resources.
        </p>
        <p>
          The county is accessible via <strong>Interstate 81</strong> (north-south) and{" "}
          <strong>Interstate 26</strong> (east-west), with Tri-Cities Airport (TRI) in Blountville
          serving as the region's commercial air hub — setting a passenger record of{" "}
          <strong>448,514</strong> in 2023.
        </p>
      </HistoryNarrative>

      <MountainDividerInverted fill="var(--color-brand-parchment)" className="bg-white" />

      <HistoryNarrative eyebrow="Regional Context" title="The Tri-Cities Metropolitan Area">
        <p>
          Sullivan County anchors the Tennessee side of the Kingsport-Bristol Metropolitan
          Statistical Area (MSA), which spans both Tennessee and Virginia. Combined with the Johnson
          City MSA, the greater Tri-Cities region has a population exceeding{" "}
          <strong>500,000</strong>.
        </p>
        <p>
          Sullivan County is the <strong>most populous county</strong> in this combined statistical
          area. Major employers include Eastman Chemical Company (Fortune 500, global HQ in
          Kingsport), Ballad Health (regional healthcare system), and BAE Systems at the Holston
          Army Ammunition Plant ($8.8B contract, 2023).
        </p>
      </HistoryNarrative>

      <MountainDivider fill="var(--color-brand-parchment)" />

      <HistoryNarrative eyebrow="Demographics" title="By the Numbers" background="parchment">
        <p>
          According to the 2020 Census, Sullivan County has a population of <strong>158,163</strong>{" "}
          — making it the most populous county in the Tri-Cities region. Educational attainment
          stands at approximately <strong>91% high school graduation</strong> and{" "}
          <strong>27% bachelor's degree or higher</strong>.
        </p>
        <p>
          The county's three K-12 school systems — Sullivan County Schools (15 schools, ~8,082
          students), Kingsport City Schools (13 schools, 7,600+ students), and Bristol Tennessee
          City Schools (9 schools, 4,082 students) — serve students across the county. Higher
          education is available through Northeast State Community College and King University.
        </p>
      </HistoryNarrative>

      {/* Explore links */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl font-bold text-brand-navy mb-6 sm:text-3xl">
            Explore More
          </h2>
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
