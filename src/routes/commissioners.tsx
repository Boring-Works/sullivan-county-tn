import { createFileRoute } from "@tanstack/react-router";
import { CommissionerGrid } from "~/components/commissioners/CommissionerGrid";

export const Route = createFileRoute("/commissioners")({
  component: CommissionersPage,
});

function CommissionersPage() {
  return (
    <main className="py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-brand-blue mb-4">County Commissioners</h1>
        <p className="text-brand-slate-light mb-12 max-w-2xl">
          Sullivan County is represented by commissioners across 11 districts. Contact your district
          representative below.
        </p>
        <CommissionerGrid />
        <div className="mt-16 p-6 bg-brand-surface rounded-lg border">
          <h2 className="text-xl font-semibold text-brand-blue mb-4">Commission Resources</h2>
          <ul className="space-y-2 text-sm text-brand-slate">
            <li>County Offices: 3411 TN-126, Blountville, TN 37617</li>
            <li>Previous Minutes: Available via Sullivan County Clerk</li>
            <li>Commission meetings are streamed on YouTube</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
