import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { seo } from "~/utils/seo";

export const Route = createFileRoute("/ada-compliance")({
  component: AdaCompliancePage,
  head: () => ({
    meta: seo({
      title: "ADA Compliance — Sullivan County, TN",
      description:
        "Sullivan County ADA compliance information, accommodation requests, and coordinator contacts.",
      url: "/ada-compliance",
    }),
  }),
});

function AdaCompliancePage() {
  return (
    <main className="pt-24 pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 h-px w-12 bg-brand-copper" />
        <h1 className="font-display text-4xl font-bold text-brand-navy mb-4 sm:text-5xl">
          ADA Compliance
        </h1>
        <p className="font-body text-brand-slate-light mb-14 max-w-2xl leading-relaxed">
          Sullivan County is committed to ensuring accessibility for all individuals in accordance
          with federal law.
        </p>

        <div className="space-y-10 max-w-3xl">
          {/* Legal Framework */}
          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy mb-4">Legal Framework</h2>
            <div className="space-y-5">
              <div className="rounded-sm border border-brand-surface bg-white p-5">
                <h3 className="font-display text-base font-bold text-brand-navy mb-2">
                  Section 504 of the Rehabilitation Act of 1973
                </h3>
                <p className="font-body text-sm leading-relaxed text-brand-slate">
                  Prohibits discrimination based on disability by programs receiving federal
                  financial assistance.
                </p>
              </div>
              <div className="rounded-sm border border-brand-surface bg-white p-5">
                <h3 className="font-display text-base font-bold text-brand-navy mb-2">
                  Americans with Disabilities Act (ADA) of 1990
                </h3>
                <ul className="space-y-1.5 font-body text-sm text-brand-slate">
                  <li>Title I — Employment</li>
                  <li>Title II — State and local government services</li>
                  <li>Title III — Public accommodations</li>
                  <li>Title IV — Telecommunications</li>
                  <li>Title V — Miscellaneous provisions</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Accommodation Requests */}
          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy mb-4">
              Accommodation Requests
            </h2>
            <div className="space-y-3 font-body text-sm leading-relaxed text-brand-slate">
              <p>
                <strong>General requests:</strong> Submit the county's designated accommodation
                request form.
              </p>
              <p>
                <strong>Court-specific requests:</strong> Submit a written request to the ADA
                Coordinator at least 5 business days before the accommodation is needed.
              </p>
            </div>
          </section>

          {/* Policy */}
          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy mb-4">
              Non-Discrimination Policy
            </h2>
            <div className="rounded-sm border border-brand-surface bg-brand-parchment p-5">
              <p className="font-body text-sm leading-relaxed text-brand-slate">
                The judicial branch does not permit discrimination based on physical or mental
                disability and will provide reasonable modifications for qualified individuals with
                disabilities.
              </p>
            </div>
          </section>

          {/* Coordinators */}
          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy mb-4">
              ADA Coordinators
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-sm border border-brand-surface bg-white p-5">
                <h3 className="font-display text-base font-bold text-brand-navy mb-3">
                  Local Coordinator
                </h3>
                <div className="space-y-2 font-body text-sm text-brand-slate">
                  <p className="font-medium">Bobby L. Russell, Circuit Court Clerk</p>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-brand-copper" />
                    <span>Sullivan County Justice Center, Blountville, TN 37617</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Phone className="mt-0.5 size-4 shrink-0 text-brand-copper" />
                    <a href="tel:+14232792752" className="hover:text-brand-navy hover:underline">
                      (423) 279-2752
                    </a>
                  </div>
                </div>
              </div>
              <div className="rounded-sm border border-brand-surface bg-white p-5">
                <h3 className="font-display text-base font-bold text-brand-navy mb-3">
                  State Coordinator
                </h3>
                <div className="space-y-2 font-body text-sm text-brand-slate">
                  <p className="font-medium">Tennessee ADA Coordinator</p>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-brand-copper" />
                    <span>511 Union Street, Suite 600, Nashville, TN 37219</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Phone className="mt-0.5 size-4 shrink-0 text-brand-copper" />
                    <span>(615) 741-2687 or (800) 448-7970</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Mail className="mt-0.5 size-4 shrink-0 text-brand-copper" />
                    <a
                      href="mailto:adacoordinator@tscmail.state.tn.us"
                      className="hover:text-brand-navy hover:underline break-all"
                    >
                      adacoordinator@tscmail.state.tn.us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
