import { createFileRoute, Link } from "@tanstack/react-router";
import { DepartmentDetail } from "~/components/departments/DepartmentDetail";
import { getDepartmentBySlug } from "~/data/departments";
import { seo } from "~/utils/seo";

export const Route = createFileRoute("/departments/$slug")({
  component: DepartmentPage,
  head: ({ params }) => {
    const dept = getDepartmentBySlug(params.slug);
    return {
      meta: dept
        ? seo({
            title: `${dept.name} — Sullivan County, TN`,
            description: dept.description || `Contact information and services for ${dept.name}, Sullivan County Tennessee.`,
            image: "/images/og/og-courthouse.jpg",
            url: `/departments/${params.slug}`,
          })
        : [],
    };
  },
});

function DepartmentPage() {
  const { slug } = Route.useParams();
  const department = getDepartmentBySlug(slug);

  if (!department) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-brand-blue">Department not found</h1>
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
