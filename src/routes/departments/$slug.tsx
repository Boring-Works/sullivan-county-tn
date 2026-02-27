import { createFileRoute, Link } from "@tanstack/react-router";
import { getDepartmentBySlug } from "~/data/departments";
import { DepartmentDetail } from "~/components/departments/DepartmentDetail";

export const Route = createFileRoute("/departments/$slug")({
  component: DepartmentPage,
});

function DepartmentPage() {
  const { slug } = Route.useParams();
  const department = getDepartmentBySlug(slug);

  if (!department) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-brand-blue">
          Department not found
        </h1>
        <p className="mt-2 text-brand-slate">
          The department you're looking for doesn't exist or may have been moved.
        </p>
        <Link
          to="/departments"
          className="mt-6 inline-block rounded-lg bg-brand-blue px-6 py-2 text-sm font-medium text-white hover:bg-brand-blue-light transition-colors"
        >
          Back to All Departments
        </Link>
      </main>
    );
  }

  return <DepartmentDetail department={department} />;
}
