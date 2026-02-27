import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { DepartmentCard } from "~/components/departments/DepartmentCard";
import {
  DEPARTMENT_CATEGORIES,
  type DepartmentCategory,
  departments,
  getDepartmentsByCategory,
} from "~/data/departments";

export const Route = createFileRoute("/departments/")({
  component: DepartmentsPage,
  validateSearch: (search: Record<string, unknown>) => ({
    category: (search.category as string) || undefined,
  }),
});

function DepartmentsPage() {
  const { category } = useSearch({ from: "/departments/" });

  const filtered = category
    ? getDepartmentsByCategory(category as DepartmentCategory)
    : departments;

  const categoryKeys = Object.keys(DEPARTMENT_CATEGORIES) as DepartmentCategory[];

  return (
    <main className="mx-auto max-w-7xl px-4 pt-24 pb-14 sm:px-6 lg:px-8">
      {/* Page heading */}
      <div className="mb-10">
        <div className="mb-4 h-px w-12 bg-brand-copper" />
        <h1 className="font-display text-4xl font-bold text-brand-navy sm:text-5xl">
          County Departments
        </h1>
        <p className="mt-3 font-body text-lg text-brand-slate-light leading-relaxed">
          Find contact information, services, and resources for all Sullivan County departments
        </p>
      </div>

      {/* Category filter — pill buttons */}
      <div className="mb-10 flex flex-wrap gap-2">
        <Link
          to="/departments"
          search={{}}
          className={`rounded-sm px-4 py-2 font-body text-sm font-medium transition-all duration-200 ${
            !category
              ? "bg-brand-navy text-white"
              : "border border-brand-navy/20 text-brand-navy hover:bg-brand-navy/5"
          }`}
        >
          All
        </Link>
        {categoryKeys.map((key) => (
          <Link
            key={key}
            to="/departments"
            search={{ category: key }}
            className={`rounded-sm px-4 py-2 font-body text-sm font-medium transition-all duration-200 ${
              category === key
                ? "bg-brand-navy text-white"
                : "border border-brand-navy/20 text-brand-navy hover:bg-brand-navy/5"
            }`}
          >
            {DEPARTMENT_CATEGORIES[key].label}
          </Link>
        ))}
      </div>

      {/* Department grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((dept) => (
          <DepartmentCard key={dept.slug} department={dept} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center font-body text-brand-slate-light">
          No departments found for this category.
        </p>
      )}
    </main>
  );
}
