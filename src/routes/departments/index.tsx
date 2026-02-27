import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { DepartmentCard } from "~/components/departments/DepartmentCard";
import {
  departments,
  getDepartmentsByCategory,
  DEPARTMENT_CATEGORIES,
  type DepartmentCategory,
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
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-blue sm:text-4xl">
          County Departments
        </h1>
        <p className="mt-2 text-lg text-brand-slate">
          Find contact information, services, and resources for all Sullivan
          County departments
        </p>
      </div>

      {/* Category filter buttons */}
      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          to="/departments"
          search={{}}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            !category
              ? "bg-brand-blue text-white"
              : "border border-brand-blue/30 text-brand-blue hover:bg-brand-blue/10"
          }`}
        >
          All
        </Link>
        {categoryKeys.map((key) => (
          <Link
            key={key}
            to="/departments"
            search={{ category: key }}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              category === key
                ? "bg-brand-blue text-white"
                : "border border-brand-blue/30 text-brand-blue hover:bg-brand-blue/10"
            }`}
          >
            {DEPARTMENT_CATEGORIES[key].label}
          </Link>
        ))}
      </div>

      {/* Department grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((dept) => (
          <DepartmentCard key={dept.slug} department={dept} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 text-center text-muted-foreground">
          No departments found for this category.
        </p>
      )}
    </main>
  );
}
