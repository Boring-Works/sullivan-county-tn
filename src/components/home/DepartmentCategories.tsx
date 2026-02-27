import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  type DepartmentCategory,
  DEPARTMENT_CATEGORIES,
  getDepartmentsByCategory,
} from "~/data/departments";

const CATEGORY_ORDER: DepartmentCategory[] = [
  "administrative",
  "courts",
  "public-safety",
  "finance",
  "operations",
  "community",
];

export function DepartmentCategories() {
  return (
    <section className="bg-brand-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold text-brand-blue sm:text-4xl">
            County Departments
          </h2>
          <p className="mt-3 text-base text-brand-slate-light sm:text-lg">
            Sullivan County government is organized into six service areas to better serve our
            community
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORY_ORDER.map((key) => {
            const category = DEPARTMENT_CATEGORIES[key];
            const deptCount = getDepartmentsByCategory(key).length;

            return (
              <Link
                key={key}
                to="/departments"
                search={{ category: key }}
                className="group flex flex-col rounded-lg border-l-4 border-l-brand-blue bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-display text-lg font-semibold text-brand-slate group-hover:text-brand-blue">
                    {category.label}
                  </h3>
                  <span className="inline-flex items-center rounded-full bg-brand-blue/10 px-2.5 py-0.5 text-xs font-medium text-brand-blue">
                    {deptCount} {deptCount === 1 ? "dept" : "depts"}
                  </span>
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-slate-light">
                  {category.description}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-brand-orange transition-colors group-hover:text-brand-orange-light">
                  <span>Browse departments</span>
                  <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
