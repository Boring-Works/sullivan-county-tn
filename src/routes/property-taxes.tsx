import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Building2,
  Calendar,
  CreditCard,
  ExternalLink,
  FileText,
  HelpCircle,
  Mail,
  MapPin,
} from "lucide-react";
import { ParcelLookup } from "~/components/property-taxes/ParcelLookup";
import { OpenStatusPill } from "~/components/shared/OpenStatusPill";
import { PageFeedback } from "~/components/shared/PageFeedback";
import { TelLink } from "~/components/shared/TelLink";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { breadcrumbList } from "~/lib/jsonld";
import { SITE_URL, seo, seoLinks } from "~/utils/seo";

export const Route = createFileRoute("/property-taxes")({
  component: PropertyTaxesPage,
  head: () => ({
    meta: seo({
      title: "Pay Your Property Taxes — Sullivan County, TN",
      description:
        "How to pay your Sullivan County property taxes online, by mail, or in person. Due dates, what you'll need, and answers to common questions.",
      url: "/property-taxes",
    }),
    links: seoLinks("/property-taxes"),
  }),
});

const TRUSTEE_PAY_URL = "https://sullivantntrustee.gov/property-tax/";
const TRUSTEE_PHONE = "(423) 323-6440";
const TRUSTEE_HOURS = "Monday-Friday, 8am-4:30pm";
const TRUSTEE_ADDRESS = "3411 TN-126, Blountville, TN 37617";
const ASSESSOR_PHONE = "(423) 323-6455";
const GIS_URL =
  "https://sullcotngis.maps.arcgis.com/apps/mapviewer/index.html?webmap=2004721405af4dd0952a592b42e6f5b6";

const FAQ: { question: string; answer: string }[] = [
  {
    question: "When are property taxes due?",
    answer:
      "Sullivan County property taxes are mailed in October and are due without penalty by February 28 of the following year. Payments postmarked after February 28 are subject to interest and penalty.",
  },
  {
    question: "What if I can't pay the full amount?",
    answer:
      "Call the Trustee's office at (423) 323-6440. The Trustee can discuss partial payments and tax-relief programs for elderly, disabled, and disabled-veteran homeowners.",
  },
  {
    question: "How do I find my parcel ID?",
    answer:
      "Your parcel ID is on the bill mailed to you each October. You can also look it up by address on the County GIS site, or call the Trustee's office and they can pull it up by your name.",
  },
  {
    question: "Who sets my tax rate?",
    answer:
      "The County Commission sets the tax rate. The Property Assessor determines your property's assessed value. The Trustee collects the tax. These are three separate offices — most billing questions are for the Trustee.",
  },
  {
    question: "I think my assessment is wrong. Who do I call?",
    answer:
      "The Property Assessor's office at (423) 323-6455. There's a formal appeal process; deadlines apply. Don't wait until tax bills go out to start it.",
  },
  {
    question: "Is there a fee to pay online?",
    answer:
      "The Trustee's online payment site charges a convenience fee for credit/debit card payments. ACH (e-check) is typically lower or free. The Trustee's site shows the exact fee before you confirm.",
  },
];

const SERVICE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "GovernmentService",
  name: "Sullivan County Property Tax Payment",
  serviceType: "PropertyTaxPayment",
  provider: {
    "@type": "GovernmentOrganization",
    name: "Sullivan County, Tennessee",
    url: SITE_URL,
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Sullivan County, Tennessee",
  },
  audience: { "@type": "Audience", audienceType: "Property Owner" },
  potentialAction: {
    "@type": "PayAction",
    target: TRUSTEE_PAY_URL,
    name: "Pay property taxes online",
  },
};

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const BREADCRUMB_JSON_LD = breadcrumbList([
  { name: "Home", path: "/" },
  { name: "Pay your property taxes", path: "/property-taxes" },
]);

function PropertyTaxesPage() {
  return (
    <main id="main-content" className="pt-24 pb-14 bg-brand-cream">
      {/* Combined JSON-LD: GovernmentService + FAQPage + BreadcrumbList */}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([SERVICE_JSON_LD, FAQ_JSON_LD, BREADCRUMB_JSON_LD]),
        }}
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 font-body text-xs text-brand-stone">
          <Link to="/" className="hover:text-brand-copper">
            Home
          </Link>{" "}
          <span aria-hidden="true">/</span> Pay your property taxes
        </nav>

        <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
          <h1 className="font-display text-4xl font-bold text-brand-navy sm:text-5xl">
            Pay your property taxes
          </h1>
          <OpenStatusPill hours={TRUSTEE_HOURS} variant="light" />
        </div>
        <p className="font-body text-lg text-brand-slate-light leading-relaxed max-w-2xl">
          Sullivan County property taxes are collected by the County Trustee. You can pay online, by
          mail, or in person. Most people pay online — it takes about 3 minutes.
        </p>

        {/* Parcel lookup — single-box entry that routes to the right official portal */}
        <ParcelLookup />

        {/* Primary CTA card */}
        <div className="mt-8 rounded-sm border-2 border-brand-copper bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-sm bg-brand-copper/10 text-brand-copper">
              <CreditCard aria-hidden="true" className="size-6" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-2xl font-bold text-brand-navy">Pay online now</h2>
              <p className="mt-2 font-body text-base text-brand-slate-light">
                Payment runs on the County Trustee's site (sullivantntrustee.gov). You'll need your
                parcel ID or property address. Credit/debit and e-check (ACH) are accepted.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button asChild variant="copper" size="lg" className="min-h-[44px]">
                  <a href={TRUSTEE_PAY_URL} target="_blank" rel="noopener noreferrer">
                    Pay on the Trustee's site
                    <ExternalLink aria-hidden="true" className="h-4 w-4" />
                  </a>
                </Button>
                <span className="font-body text-xs text-brand-stone">Opens in a new tab</span>
              </div>
            </div>
          </div>
        </div>

        {/* Before you start */}
        <section aria-labelledby="before-heading" className="mt-12">
          <h2 id="before-heading" className="font-display text-2xl font-bold text-brand-navy">
            Before you start
          </h2>
          <p className="mt-2 font-body text-base text-brand-slate-light">
            Have these handy. The whole thing usually takes under 3 minutes.
          </p>
          <ol className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <li className="flex flex-col gap-2 rounded-sm border border-brand-surface bg-white p-5">
              <span className="inline-flex size-7 items-center justify-center rounded-full bg-brand-navy/10 font-display text-sm font-bold text-brand-navy">
                1
              </span>
              <h3 className="font-display text-base font-bold text-brand-navy">
                Your parcel ID or property address
              </h3>
              <p className="font-body text-sm text-brand-slate-light leading-relaxed">
                The parcel ID is on the bill the Trustee mailed you in October. Or look it up by
                address on the{" "}
                <a
                  href={GIS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-copper hover:text-brand-copper-light hover:underline font-medium"
                >
                  county GIS site
                </a>
                .
              </p>
            </li>
            <li className="flex flex-col gap-2 rounded-sm border border-brand-surface bg-white p-5">
              <span className="inline-flex size-7 items-center justify-center rounded-full bg-brand-navy/10 font-display text-sm font-bold text-brand-navy">
                2
              </span>
              <h3 className="font-display text-base font-bold text-brand-navy">A way to pay</h3>
              <p className="font-body text-sm text-brand-slate-light leading-relaxed">
                Credit card, debit card, or your bank routing + account number for ACH (e-check).
                The Trustee's site shows the convenience fee before you confirm.
              </p>
            </li>
            <li className="flex flex-col gap-2 rounded-sm border border-brand-surface bg-white p-5">
              <span className="inline-flex size-7 items-center justify-center rounded-full bg-brand-navy/10 font-display text-sm font-bold text-brand-navy">
                3
              </span>
              <h3 className="font-display text-base font-bold text-brand-navy">
                An email for your receipt
              </h3>
              <p className="font-body text-sm text-brand-slate-light leading-relaxed">
                The Trustee will email a payment confirmation. Save it. The county does not send a
                separate paid-stamp receipt by mail.
              </p>
            </li>
          </ol>
        </section>

        {/* Other ways to pay */}
        <section aria-labelledby="other-heading" className="mt-12">
          <h2 id="other-heading" className="font-display text-2xl font-bold text-brand-navy">
            Other ways to pay
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-sm border border-brand-surface bg-white p-5">
              <div className="flex items-center gap-2">
                <Mail aria-hidden="true" className="size-4 text-brand-copper" />
                <h3 className="font-display text-base font-bold text-brand-navy">By mail</h3>
              </div>
              <p className="mt-2 font-body text-sm text-brand-slate-light leading-relaxed">
                Mail your check + bill stub to the Trustee. Make checks payable to{" "}
                <strong>Sullivan County Trustee</strong>. Postmark by February 28 to avoid penalty.
              </p>
              <p className="mt-2 font-body text-sm text-brand-slate">{TRUSTEE_ADDRESS}</p>
            </div>
            <div className="rounded-sm border border-brand-surface bg-white p-5">
              <div className="flex items-center gap-2">
                <Building2 aria-hidden="true" className="size-4 text-brand-copper" />
                <h3 className="font-display text-base font-bold text-brand-navy">In person</h3>
              </div>
              <p className="mt-2 font-body text-sm text-brand-slate-light leading-relaxed">
                Stop by the Trustee's office at the address above.{" "}
                {TRUSTEE_HOURS.replace("8am", "8 AM").replace("4:30pm", "4:30 PM")}. Cash, check, or
                card accepted at the counter.
              </p>
              <p className="mt-2 font-body text-sm">
                <TelLink phone={TRUSTEE_PHONE} className="text-brand-copper hover:underline" />
              </p>
            </div>
          </div>
        </section>

        {/* Common questions */}
        <section aria-labelledby="faq-heading" className="mt-12">
          <h2 id="faq-heading" className="font-display text-2xl font-bold text-brand-navy">
            Common questions
          </h2>
          <Accordion
            type="single"
            collapsible
            className="mt-5 rounded-sm border border-brand-surface bg-white"
          >
            {FAQ.map((item, i) => (
              <AccordionItem
                key={item.question}
                value={`faq-${i}`}
                className="border-b last:border-b-0"
              >
                <AccordionTrigger className="px-5 py-4 font-display text-base font-semibold text-brand-navy hover:bg-brand-parchment/40 hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5 font-body text-sm text-brand-slate-light leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Help / who to call */}
        <section
          aria-labelledby="help-heading"
          className="mt-12 rounded-sm border border-brand-surface bg-brand-parchment/60 p-6 sm:p-8"
        >
          <div className="flex items-start gap-4">
            <HelpCircle aria-hidden="true" className="size-6 shrink-0 text-brand-copper mt-1" />
            <div className="flex-1">
              <h2 id="help-heading" className="font-display text-xl font-bold text-brand-navy">
                Stuck? Three offices, three different jobs.
              </h2>
              <ul className="mt-3 space-y-3 font-body text-sm text-brand-slate">
                <li>
                  <strong className="text-brand-navy">Billing, payment, due dates →</strong>{" "}
                  Trustee:{" "}
                  <TelLink phone={TRUSTEE_PHONE} className="text-brand-copper hover:underline" />
                </li>
                <li>
                  <strong className="text-brand-navy">Assessment value or appeal →</strong> Property
                  Assessor:{" "}
                  <TelLink phone={ASSESSOR_PHONE} className="text-brand-copper hover:underline" /> ·{" "}
                  <Link
                    to="/departments/$slug"
                    params={{ slug: "property-assessor" }}
                    className="text-brand-copper hover:underline"
                  >
                    department page
                  </Link>
                </li>
                <li>
                  <strong className="text-brand-navy">Tax rate (set by the Commission) →</strong>{" "}
                  <Link to="/commissioners" className="text-brand-copper hover:underline">
                    Commissioners
                  </Link>
                </li>
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to="/calendar"
                  className="inline-flex items-center gap-2 rounded-sm border border-brand-navy/20 bg-white px-4 py-2 font-body text-sm font-medium text-brand-navy hover:border-brand-copper/40 hover:text-brand-copper transition-colors"
                >
                  <Calendar aria-hidden="true" className="size-4" />
                  Commission meetings
                </Link>
                <Link
                  to="/departments/$slug"
                  params={{ slug: "property-assessor" }}
                  className="inline-flex items-center gap-2 rounded-sm border border-brand-navy/20 bg-white px-4 py-2 font-body text-sm font-medium text-brand-navy hover:border-brand-copper/40 hover:text-brand-copper transition-colors"
                >
                  <FileText aria-hidden="true" className="size-4" />
                  Assessor's office
                </Link>
                <a
                  href={GIS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm border border-brand-navy/20 bg-white px-4 py-2 font-body text-sm font-medium text-brand-navy hover:border-brand-copper/40 hover:text-brand-copper transition-colors"
                >
                  <MapPin aria-hidden="true" className="size-4" />
                  Look up parcel (GIS)
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Late / penalty notice */}
        <aside
          aria-label="Important notice"
          className="mt-8 rounded-sm border-l-4 border-brand-safety bg-brand-safety/5 p-5"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle
              aria-hidden="true"
              className="size-5 shrink-0 text-brand-safety mt-0.5"
            />
            <div>
              <p className="font-body text-sm text-brand-slate leading-relaxed">
                <strong className="text-brand-navy">Don't ignore a delinquent bill.</strong>{" "}
                Tennessee law lets the county sell delinquent properties at tax sale after a period
                of unpaid taxes. If you're behind, call the Trustee at{" "}
                <TelLink phone={TRUSTEE_PHONE} className="text-brand-copper hover:underline" /> —
                there are payment plans and relief programs for elderly, disabled, and
                disabled-veteran homeowners.
              </p>
            </div>
          </div>
        </aside>

        <PageFeedback />
      </div>
    </main>
  );
}
