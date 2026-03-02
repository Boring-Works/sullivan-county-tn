import { createFileRoute } from "@tanstack/react-router";
import { CommissionerGrid } from "~/components/commissioners/CommissionerGrid";
import { seo, seoLinks } from "~/utils/seo";

export const Route = createFileRoute("/commissioners")({
  component: CommissionersPage,
  head: () => ({
    meta: seo({
      title: "County Commissioners — Sullivan County, TN",
      description:
        "Sullivan County commissioners across 11 districts. Find your representative and contact information.",
      image: "/images/og/og-courthouse.jpg",
      url: "/commissioners",
    }),
    links: seoLinks("/commissioners"),
  }),
});

function CommissionersPage() {
  return (
    <main id="main-content" className="pt-24 pb-14">
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
              <a
                href="https://www.sullivancountyclerktn.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-sm bg-brand-copper px-5 py-2 font-body text-sm font-semibold text-white transition-colors hover:bg-brand-copper-light"
              >
                View Current Agenda &rarr;
              </a>
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
