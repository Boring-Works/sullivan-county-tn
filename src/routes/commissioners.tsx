import { createFileRoute } from "@tanstack/react-router";
import { CommissionerGrid } from "~/components/commissioners/CommissionerGrid";

export const Route = createFileRoute("/commissioners")({
  component: CommissionersPage,
});

function CommissionersPage() {
  return (
    <main className="py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 h-px w-12 bg-brand-copper" />
        <h1 className="font-display text-4xl font-bold text-brand-navy mb-4 sm:text-5xl">
          County Commissioners
        </h1>
        <p className="font-body text-brand-slate-light mb-14 max-w-2xl leading-relaxed">
          Sullivan County is represented by commissioners across 11 districts. Contact your district
          representative below.
        </p>
        <CommissionerGrid />
        <div className="mt-16 rounded-sm border border-brand-surface bg-brand-parchment p-7">
          <h2 className="font-display text-xl font-bold text-brand-navy mb-4">
            Commission Resources
          </h2>
          <ul className="space-y-2.5 font-body text-sm text-brand-slate">
            <li>County Offices: 3411 TN-126, Blountville, TN 37617</li>
            <li>Previous Minutes: Available via Sullivan County Clerk</li>
            <li>Commission meetings are streamed on YouTube</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
