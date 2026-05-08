import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { PageFeedback } from "~/components/shared/PageFeedback";
import { TelLink } from "~/components/shared/TelLink";
import { seo, seoLinks } from "~/utils/seo";

export const Route = createFileRoute("/accessibility")({
  component: AccessibilityPage,
  head: () => ({
    meta: seo({
      title: "Accessibility — Sullivan County, TN",
      description:
        "Sullivan County's commitment to digital accessibility. WCAG 2.1 AA standard, known limitations, how to report a barrier, and how to request reasonable accommodation.",
      url: "/accessibility",
    }),
    links: seoLinks("/accessibility"),
  }),
});

function AccessibilityPage() {
  return (
    <main id="main-content" className="pt-24 pb-14">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 h-px w-12 bg-brand-copper" />
        <h1 className="font-display text-4xl font-bold text-brand-navy mb-4 sm:text-5xl">
          Accessibility
        </h1>
        <p className="font-body text-lg text-brand-slate-light mb-12 leading-relaxed">
          We want everyone in Sullivan County to be able to use this website. This page tells you
          how we work toward that, what doesn't work yet, and how to tell us when something is
          broken.
        </p>

        <div className="space-y-12">
          {/* Standard */}
          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy mb-3">
              The standard we follow
            </h2>
            <p className="font-body text-base leading-relaxed text-brand-slate">
              We aim for{" "}
              <a
                href="https://www.w3.org/TR/WCAG21/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-copper hover:text-brand-copper-light underline underline-offset-2"
              >
                Web Content Accessibility Guidelines (WCAG) 2.1 at level AA
              </a>
              . That's the standard required by the U.S. Department of Justice's April 2024 final
              rule under Title II of the Americans with Disabilities Act, which becomes mandatory
              for counties of our population by April 24, 2027.
            </p>
            <p className="mt-3 font-body text-base leading-relaxed text-brand-slate">
              We test the site with screen readers (VoiceOver, NVDA), keyboard-only navigation,
              automated tools (axe-core), and color-contrast checks against WCAG AA targets.
            </p>
          </section>

          {/* What works */}
          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy mb-3">
              What works today
            </h2>
            <ul className="space-y-2 font-body text-base text-brand-slate">
              <li>
                Every page is keyboard-navigable; the skip-to-content link appears on first tab.
              </li>
              <li>Headings are properly ordered (one h1 per page, h2/h3 nested logically).</li>
              <li>All images have descriptive alt text or are explicitly marked decorative.</li>
              <li>
                Forms use real labels associated with their fields and announce errors to screen
                readers.
              </li>
              <li>Phone numbers, addresses, and email links are tap-to-call and tap-to-email.</li>
              <li>Color contrast meets WCAG AA on every page (text, links, focus rings).</li>
              <li>
                The site honors{" "}
                <code className="rounded bg-brand-parchment px-1 py-0.5 font-mono text-sm">
                  prefers-reduced-motion
                </code>{" "}
                — animations are removed when your device asks.
              </li>
            </ul>
          </section>

          {/* Known limitations */}
          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy mb-3">
              Known limitations
            </h2>
            <p className="font-body text-base leading-relaxed text-brand-slate mb-4">
              Honest list. We're working through these.
            </p>
            <ul className="space-y-3 font-body text-base text-brand-slate">
              <li>
                <strong>Older PDF documents.</strong> The 115-document library includes scanned PDFs
                that aren't fully tagged for screen readers. We're re-creating these as accessible
                versions on a rolling basis. If you need a specific document made accessible now,
                contact us using the form below.
              </li>
              <li>
                <strong>Embedded video.</strong> County commission meetings are streamed live on
                YouTube. YouTube provides automatic captions, but they aren't always perfect. We're
                exploring human-corrected captions as a future improvement.
              </li>
              <li>
                <strong>External portals.</strong> Some links route to state or federal portals (the
                Tennessee Comptroller's TPAD assessment lookup, the County Trustee's payment
                portal). Their accessibility is governed by the operating agency.
              </li>
            </ul>
          </section>

          {/* Report a barrier */}
          <section className="rounded-sm border border-brand-copper/30 bg-brand-cream p-6">
            <h2 className="font-display text-xl font-bold text-brand-navy mb-3">
              Found a barrier? Tell us.
            </h2>
            <p className="font-body text-base leading-relaxed text-brand-slate mb-4">
              If something on this site doesn't work for you — a missing alt text, a form you can't
              submit with your screen reader, a video without captions you need — please tell us. We
              treat every report seriously and respond within 5 business days.
            </p>
            <div className="space-y-3 font-body text-base text-brand-slate">
              <div className="flex items-start gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-brand-copper" />
                <span>
                  Use the{" "}
                  <Link
                    to="/contact"
                    className="text-brand-copper hover:text-brand-copper-light underline underline-offset-2 font-medium"
                  >
                    contact form
                  </Link>{" "}
                  — pick subject "Accessibility issue."
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-copper" />
                <span>
                  Call the County Mayor's Office at{" "}
                  <TelLink
                    phone="(423) 323-6417"
                    className="text-brand-copper hover:text-brand-copper-light font-medium"
                  />
                </span>
              </div>
            </div>
          </section>

          {/* Reasonable accommodation */}
          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy mb-3">
              Reasonable accommodation
            </h2>
            <p className="font-body text-base leading-relaxed text-brand-slate mb-3">
              For accommodations beyond the website — court-related, employment-related, or
              physical-access requests — see{" "}
              <Link
                to="/ada-compliance"
                className="text-brand-copper hover:text-brand-copper-light underline underline-offset-2 font-medium"
              >
                ADA Compliance
              </Link>{" "}
              for the formal request forms and the local and state ADA coordinators.
            </p>
          </section>

          {/* Filing a complaint */}
          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy mb-3">
              How to file a complaint
            </h2>
            <p className="font-body text-base leading-relaxed text-brand-slate mb-3">
              If you've reported an accessibility barrier and you're not satisfied with our
              response, you can escalate:
            </p>
            <ul className="space-y-2 font-body text-base text-brand-slate">
              <li>
                <strong>State:</strong>{" "}
                <a
                  href="https://www.tn.gov/finance/section-504.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-copper hover:text-brand-copper-light underline underline-offset-2"
                >
                  Tennessee Section 504 office
                </a>
              </li>
              <li>
                <strong>Federal:</strong>{" "}
                <a
                  href="https://civilrights.justice.gov/report/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-copper hover:text-brand-copper-light underline underline-offset-2"
                >
                  U.S. Department of Justice Civil Rights Division
                </a>
              </li>
            </ul>
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
