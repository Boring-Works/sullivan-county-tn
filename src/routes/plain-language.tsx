import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { PageFeedback } from "~/components/shared/PageFeedback";
import { seo, seoLinks } from "~/utils/seo";

export const Route = createFileRoute("/plain-language")({
  component: PlainLanguagePage,
  head: () => ({
    meta: seo({
      title: "Plain Language — Sullivan County, TN",
      description:
        "Sullivan County's commitment to plain language. We aim for 7th-grade reading level, lead with verbs, and write the way our neighbors speak.",
      url: "/plain-language",
    }),
    links: seoLinks("/plain-language"),
  }),
});

const BANNED_WORDS = [
  "engagement",
  "deliverables",
  "leveraging",
  "stakeholders",
  "ecosystem",
  "robust",
  "world-class",
  "best-of-breed",
  "synergy",
  "facilitate",
  "utilize",
  "in order to",
] as const;

const BAD_GOOD = [
  {
    bad: "Submit your annual property tax remittance by the prescribed deadline.",
    good: "Pay your property taxes by February 28.",
  },
  {
    bad: "Constituents are encouraged to engage with the appropriate department for further guidance.",
    good: "Call the department that handles your question.",
  },
  {
    bad: "We are leveraging cross-departmental synergies to deliver enhanced citizen experiences.",
    good: "Our departments are working together so you spend less time on hold.",
  },
] as const;

function PlainLanguagePage() {
  return (
    <main id="main-content" className="pt-24 pb-14">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 h-px w-12 bg-brand-copper" />
        <h1 className="font-display text-4xl font-bold text-brand-navy mb-4 sm:text-5xl">
          Plain Language
        </h1>
        <p className="font-body text-lg text-brand-slate-light mb-12 leading-relaxed">
          Government should be readable by the people it serves. We write the way our neighbors
          speak.
        </p>

        <div className="space-y-12">
          {/* Commitment */}
          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy mb-3">Our commitment</h2>
            <p className="font-body text-base leading-relaxed text-brand-slate mb-3">
              Sullivan County follows the spirit of the federal{" "}
              <a
                href="https://www.plainlanguage.gov/law/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-copper hover:text-brand-copper-light underline underline-offset-2"
              >
                Plain Writing Act of 2010
              </a>
              . The law requires federal agencies to use clear language; we hold ourselves to the
              same standard.
            </p>
            <p className="font-body text-base leading-relaxed text-brand-slate">
              Our target is a 7th-grade reading level on every page a citizen will read — service
              pages, forms, news, contact details, department info. Legal documents and official
              policies sometimes require precise language that isn't 7th-grade simple; we mark those
              clearly and provide a plain-language summary where we can.
            </p>
          </section>

          {/* Rules we follow */}
          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy mb-3">Rules we follow</h2>
            <ul className="space-y-3 font-body text-base text-brand-slate">
              <li>
                <strong>Plain English at ~7th-grade reading level.</strong> "Pay your property
                taxes," not "Submit your annual property tax remittance."
              </li>
              <li>
                <strong>"We" and "you,"</strong> never "the county," "stakeholders," or
                "constituents."
              </li>
              <li>
                <strong>Lead with the verb.</strong> "Find a department." "Get a permit." "Report a
                pothole."
              </li>
              <li>
                <strong>Be specific.</strong> Real phone numbers, real hours, real dates beat
                generic prose.
              </li>
              <li>
                <strong>Active voice.</strong> "We accept payment online" beats "Online payment is
                accepted by us."
              </li>
              <li>
                <strong>Short sentences.</strong> If a sentence doesn't fit on one breath, it's
                probably two sentences.
              </li>
            </ul>
          </section>

          {/* Banned words */}
          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy mb-3">
              Words we don't use
            </h2>
            <p className="font-body text-base leading-relaxed text-brand-slate mb-4">
              Consultant words don't help citizens. We avoid these on every public page:
            </p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 font-body text-base text-brand-slate sm:grid-cols-3">
              {BANNED_WORDS.map((word) => (
                <li key={word} className="flex items-center gap-2">
                  <X aria-hidden="true" className="size-4 shrink-0 text-brand-copper" />
                  <span className="font-mono text-sm">{word}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Before / after */}
          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy mb-3">
              Before and after
            </h2>
            <div className="space-y-5">
              {BAD_GOOD.map((pair) => (
                <div
                  key={pair.bad}
                  className="grid grid-cols-1 gap-3 rounded-sm border border-brand-surface bg-white p-5 sm:grid-cols-2"
                >
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <X aria-hidden="true" className="size-4 shrink-0 text-brand-copper" />
                      <span className="font-display text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-copper">
                        Before
                      </span>
                    </div>
                    <p className="font-body text-sm leading-relaxed text-brand-slate-light italic">
                      {pair.bad}
                    </p>
                  </div>
                  <div className="border-t border-brand-surface pt-3 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Check aria-hidden="true" className="size-4 shrink-0 text-brand-sage" />
                      <span className="font-display text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-sage">
                        After
                      </span>
                    </div>
                    <p className="font-body text-sm leading-relaxed text-brand-slate font-medium">
                      {pair.good}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tell us */}
          <section className="rounded-sm border border-brand-copper/30 bg-brand-cream p-6">
            <h2 className="font-display text-xl font-bold text-brand-navy mb-3">
              See unclear writing? Tell us.
            </h2>
            <p className="font-body text-base leading-relaxed text-brand-slate mb-4">
              If a page is confusing, we want to fix it. Use the{" "}
              <Link
                to="/contact"
                className="text-brand-copper hover:text-brand-copper-light underline underline-offset-2 font-medium"
              >
                contact form
              </Link>{" "}
              and pick subject "Plain language feedback." Tell us which page, what was confusing,
              and how you'd say it instead.
            </p>
          </section>

          {/* Last reviewed */}
          <section className="border-t border-brand-surface pt-6">
            <p className="font-body text-sm text-brand-warm-gray">
              Last reviewed: May 8, 2026. We review this page at least every 6 months.
            </p>
          </section>

          <PageFeedback />
        </div>
      </div>
    </main>
  );
}
