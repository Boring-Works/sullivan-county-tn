import { Link } from "@tanstack/react-router";
import { ArrowRight, Building2, DollarSign, Heart, Scale, Shield, Wrench } from "lucide-react";
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

const CATEGORY_ICONS: Record<DepartmentCategory, React.ReactNode> = {
  administrative: <Building2 className="h-5 w-5" />,
  courts: <Scale className="h-5 w-5" />,
  "public-safety": <Shield className="h-5 w-5" />,
  finance: <DollarSign className="h-5 w-5" />,
  operations: <Wrench className="h-5 w-5" />,
  community: <Heart className="h-5 w-5" />,
};

const CATEGORY_COLORS: Record<DepartmentCategory, string> = {
  administrative: "bg-brand-navy/8 text-brand-navy group-hover:bg-brand-navy/15",
  courts: "bg-brand-courts/8 text-brand-courts group-hover:bg-brand-courts/15",
  "public-safety": "bg-brand-safety/8 text-brand-safety group-hover:bg-brand-safety/15",
  finance: "bg-brand-sage/8 text-brand-sage group-hover:bg-brand-sage/15",
  operations: "bg-brand-brass/8 text-brand-brass group-hover:bg-brand-brass/15",
  community: "bg-brand-community/8 text-brand-community group-hover:bg-brand-community/15",
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

        {/* Grid — 3-col with top bar accent + category icons */}
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
                className="group card-lift relative flex flex-col rounded-sm border border-brand-surface bg-white p-6 overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-copper scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />

                <div className="flex items-start gap-4">
                  {/* Category icon */}
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-sm transition-colors ${CATEGORY_COLORS[key]}`}
                  >
                    {CATEGORY_ICONS[key]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-lg font-bold text-brand-slate group-hover:text-brand-navy transition-colors">
                        {category.label}
                      </h3>
                      <span className="inline-flex items-center rounded-sm bg-brand-navy/5 px-2.5 py-1 font-body text-xs font-medium text-brand-navy shrink-0">
                        {deptCount}
                      </span>
                    </div>
                    <p className="mt-2 font-body text-sm leading-relaxed text-brand-slate-light">
                      {category.description}
                    </p>
                  </div>
                </div>
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
