import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  DEPARTMENT_CATEGORIES,
  type DepartmentCategory,
  getDepartmentsByCategory,
} from "~/data/departments";
import { useScrollReveal } from "~/hooks/useScrollReveal";

const CATEGORY_ORDER: DepartmentCategory[] = [
  "administrative",
  "courts",
  "public-safety",
  "finance",
  "operations",
  "community",
];

const CATEGORY_ACCENTS: Record<DepartmentCategory, string> = {
  administrative: "group-hover:border-l-brand-navy",
  courts: "group-hover:border-l-[#6b4c8a]",
  "public-safety": "group-hover:border-l-[#a63d3d]",
  finance: "group-hover:border-l-brand-sage",
  operations: "group-hover:border-l-brand-brass",
  community: "group-hover:border-l-[#3d7a7a]",
};

export function DepartmentCategories() {
  const containerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative bg-brand-parchment py-20 sm:py-24">
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 divider-heritage opacity-30" />

      <div ref={containerRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading — centered editorial */}
        <div className="mb-14 text-center" data-reveal>
          <h2 className="font-display text-3xl font-bold text-brand-navy sm:text-4xl">
            County Departments
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-base text-brand-slate-light leading-relaxed sm:text-lg">
            Sullivan County government is organized into six service areas to better serve our
            community
          </p>
        </div>

        {/* Grid — 3-col with left border accent */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORY_ORDER.map((key, index) => {
            const category = DEPARTMENT_CATEGORIES[key];
            const deptCount = getDepartmentsByCategory(key).length;

            return (
              <Link
                key={key}
                to="/departments"
                search={{ category: key }}
                data-reveal
                data-reveal-delay={index * 60}
                className={`group card-lift flex flex-col rounded-sm border-l-[5px] border-l-brand-surface bg-white p-8 transition-all duration-300 hover:shadow-lg ${CATEGORY_ACCENTS[key]}`}
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-display text-lg font-bold text-brand-slate group-hover:text-brand-navy transition-colors">
                    {category.label}
                  </h3>
                  <span className="inline-flex items-center rounded-sm bg-brand-navy/5 px-2.5 py-1 font-body text-xs font-medium text-brand-navy">
                    {deptCount}
                  </span>
                </div>
                <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-brand-slate-light">
                  {category.description}
                </p>
                <div className="mt-5 flex items-center font-body text-sm font-semibold text-brand-copper transition-colors group-hover:text-brand-copper-light">
                  <span>Browse departments</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
