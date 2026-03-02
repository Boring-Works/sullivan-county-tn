import { createFileRoute, Link } from "@tanstack/react-router";

import { HeritageHero } from "~/components/history/HeritageHero";
import { HistoryNarrative } from "~/components/history/HistoryNarrative";
import { MountainDivider } from "~/components/shared/MountainDivider";
import { sectorEmployment, topEmployers } from "~/data/employers";
import { useScrollReveal } from "~/hooks/useScrollReveal";
import { seo, seoLinks } from "~/utils/seo";

export const Route = createFileRoute("/economic-development")({
  component: EconomicDevelopmentPage,
  head: () => ({
    meta: seo({
      title: "Economic Development — Sullivan County, Tennessee",
      description:
        "Sullivan County's economy is anchored by Eastman Chemical (Fortune 500), Ballad Health, and BAE Systems. Explore employers, sectors, and economic assets.",
      url: "/economic-development",
    }),
    links: seoLinks("/economic-development"),
  }),
});

function EconomicDevelopmentPage() {
  const tableRef = useScrollReveal<HTMLDivElement>();

  return (
    <main id="main-content">
      <HeritageHero
        title="Economic Development"
        subtitle="From frontier commerce to Fortune 500 headquarters — Sullivan County's economy builds on 250 years of enterprise."
      />

      {/* Top Employers table */}
      <section className="bg-white py-16 sm:py-20">
        <div ref={tableRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-reveal className="mb-10">
            <span className="inline-block font-body text-xs font-medium tracking-widest uppercase text-brand-brass mb-4">
              Major Employers
            </span>
            <h2 className="font-display text-2xl font-bold text-brand-navy sm:text-3xl">
              Top Employers
            </h2>
            <div className="mt-4 h-px w-20 bg-gradient-to-r from-brand-copper to-brand-brass/40" />
          </div>

          <div data-reveal data-reveal-delay={100}>
            <div className="overflow-x-auto">
              <table className="w-full font-body text-sm">
                <thead>
                  <tr className="border-b-2 border-brand-navy/10">
                    <th className="py-3 pr-4 text-left font-semibold text-brand-navy">Employer</th>
                    <th className="py-3 pr-4 text-left font-semibold text-brand-navy">Sector</th>
                    <th className="py-3 text-left font-semibold text-brand-navy">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {topEmployers.map((employer) => (
                    <tr key={employer.name} className="border-b border-brand-surface">
                      <td className="py-3 pr-4 font-medium text-brand-navy">{employer.name}</td>
                      <td className="py-3 pr-4 text-brand-stone">{employer.sector}</td>
                      <td className="py-3 text-brand-slate-light">{employer.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sector breakdown */}
          <div data-reveal data-reveal-delay={200} className="mt-12">
            <h3 className="font-display text-xl font-bold text-brand-navy mb-4">
              Top Employment Sectors
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {sectorEmployment.map((sector) => (
                <div
                  key={sector.sector}
                  className="rounded-sm border border-brand-surface bg-brand-parchment p-5"
                >
                  <div className="font-display text-xl font-bold text-brand-copper">
                    {sector.employees}
                  </div>
                  <div className="font-body text-sm text-brand-navy mt-1">{sector.sector}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MountainDivider fill="var(--color-brand-parchment)" />

      <HistoryNarrative eyebrow="Infrastructure" title="Economic Assets" background="parchment">
        <p>
          Sullivan County's economic infrastructure includes the{" "}
          <strong>BTES 10-gigabit community fiber network</strong> in Kingsport — one of the fastest
          municipal broadband networks in the United States. The county sits at the junction of{" "}
          <strong>Interstate 81</strong> and <strong>Interstate 26</strong>, providing direct
          highway access to major southeastern markets.
        </p>
        <p>
          <strong>Tri-Cities Airport</strong> (TRI) in Blountville serves as the region's commercial
          air hub, setting a passenger record of 448,514 in 2023. The{" "}
          <strong>NETWORKS Sullivan Partnership</strong> coordinates economic development efforts
          across the county.
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
              to="/education"
              className="inline-flex items-center gap-2 rounded-sm border border-brand-navy/15 px-6 py-3 font-body text-sm font-medium text-brand-navy transition-all hover:border-brand-navy/30 hover:bg-brand-navy/5"
            >
              Education
            </Link>
            <Link
              to="/transportation"
              className="inline-flex items-center gap-2 rounded-sm border border-brand-navy/15 px-6 py-3 font-body text-sm font-medium text-brand-navy transition-all hover:border-brand-navy/30 hover:bg-brand-navy/5"
            >
              Transportation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
