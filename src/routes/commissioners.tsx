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
          <h2 className="font-display text-xl font-bold text-brand-navy mb-5">
            Commission Resources
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2.5 font-body text-sm text-brand-slate">
              <h3 className="font-display text-base font-bold text-brand-navy">
                Meeting Information
              </h3>
              <p>Current agendas and meeting packets are published before each session.</p>
              <p>Previous minutes are available through the Sullivan County Clerk.</p>
              <p>Commission meetings are streamed live on YouTube.</p>
            </div>
            <div className="space-y-2.5 font-body text-sm text-brand-slate">
              <h3 className="font-display text-base font-bold text-brand-navy">Contact</h3>
              <p>County Offices: 3411 TN-126, Blountville, TN 37617</p>
              <ul className="space-y-2 mt-3">
                <li>
                  <a
                    href="https://www.youtube.com/@sullivancountycommission"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-copper hover:text-brand-copper-light hover:underline"
                  >
                    YouTube — Commission Streams
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.sullivancountyclerktn.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-copper hover:text-brand-copper-light hover:underline"
                  >
                    County Clerk — Previous Minutes
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
