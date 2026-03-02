import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";

import { HeritageHero } from "~/components/history/HeritageHero";
import { schoolSystems } from "~/data/education";
import { useScrollReveal } from "~/hooks/useScrollReveal";
import { seo, seoLinks } from "~/utils/seo";

const TYPE_LABELS = {
  k12: "K-12",
  "community-college": "Community College",
  university: "University",
  extension: "Extension",
};

export const Route = createFileRoute("/education")({
  component: EducationPage,
  head: () => ({
    meta: seo({
      title: "Education — Sullivan County, Tennessee",
      description:
        "Sullivan County is served by three K-12 school systems, Northeast State Community College, and King University. ~91% HS graduation, ~27% bachelor's degree attainment.",
      url: "/education",
    }),
    links: seoLinks("/education"),
  }),
});

function EducationPage() {
  const containerRef = useScrollReveal<HTMLDivElement>();

  return (
    <main id="main-content">
      <HeritageHero
        title="Education"
        subtitle="Three K-12 systems, higher education, and a community committed to learning."
      />

      <section className="bg-white py-16 sm:py-20">
        <div ref={containerRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-reveal className="mb-10">
            <span className="inline-block font-body text-xs font-medium tracking-widest uppercase text-brand-brass mb-4">
              Schools & Institutions
            </span>
            <h2 className="font-display text-2xl font-bold text-brand-navy sm:text-3xl">
              Educational Institutions
            </h2>
            <div className="mt-4 h-px w-20 bg-gradient-to-r from-brand-copper to-brand-brass/40" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {schoolSystems.map((school, i) => (
              <div
                key={school.name}
                data-reveal
                data-reveal-delay={i * 100}
                className="rounded-sm border border-brand-surface bg-white p-6"
              >
                <span className="inline-flex items-center rounded-full bg-brand-navy/5 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase text-brand-navy/60 mb-3">
                  {TYPE_LABELS[school.type]}
                </span>
                <h3 className="font-display text-lg font-bold text-brand-navy mb-2">
                  {school.name}
                </h3>
                <dl className="space-y-1.5 font-body text-sm">
                  {school.schools && (
                    <div className="flex justify-between">
                      <dt className="text-brand-stone">Schools</dt>
                      <dd className="font-semibold text-brand-navy">{school.schools}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-brand-stone">Enrollment</dt>
                    <dd className="font-semibold text-brand-navy">{school.enrollment}</dd>
                  </div>
                </dl>
                <p className="mt-3 font-body text-xs text-brand-slate-light">{school.notes}</p>
                {school.website && (
                  <a
                    href={school.website}
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

          {/* Attainment stats */}
          <div data-reveal data-reveal-delay={300} className="mt-16 text-center">
            <h3 className="font-display text-xl font-bold text-brand-navy mb-6">
              Educational Attainment
            </h3>
            <div className="flex justify-center gap-12">
              <div>
                <div className="font-display text-4xl font-bold text-brand-copper">~91%</div>
                <div className="font-body text-sm text-brand-stone mt-1">
                  High School Graduation
                </div>
              </div>
              <div>
                <div className="font-display text-4xl font-bold text-brand-copper">~27%</div>
                <div className="font-body text-sm text-brand-stone mt-1">Bachelor's Degree+</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
