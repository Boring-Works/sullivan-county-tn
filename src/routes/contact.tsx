import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, ExternalLink, MapPin, Phone } from "lucide-react";
import { seo } from "~/utils/seo";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: seo({
      title: "Contact Sullivan County Government",
      description:
        "Phone numbers, addresses, and office hours for Sullivan County government departments and services.",
      image: "/images/og/og-courthouse.jpg",
      url: "/contact",
    }),
  }),
});

const quickContacts = [
  {
    name: "Mayor's Office",
    phone: "(423) 323-6417",
    description: "County executive leadership and general inquiries",
  },
  {
    name: "County Clerk",
    phone: "(423) 323-6428",
    description: "Vehicle registration, marriage licenses, business licenses",
  },
  {
    name: "Sheriff's Office",
    phone: "(423) 279-7500",
    emergency: "911",
    description: "Law enforcement, public safety, warrant services",
  },
  {
    name: "Emergency Management",
    phone: "(423) 323-6912",
    description: "Emergency preparedness and disaster coordination",
  },
];

const externalResources = [
  { label: "Sullivan County Trustee (Tax Payments)", url: "https://sullivantntrustee.gov/" },
  { label: "Animal Shelter", url: "https://animalshelter-sullivancounty.org/" },
  { label: "Sullivan County Schools (K-12)", url: "http://www.sullivank12.net/" },
  { label: "Sullivan County Public Library", url: "https://www.scpltn.org/" },
  { label: "Sheriff's Office", url: "https://www.scsotn.com/" },
  { label: "County Clerk Records", url: "https://www.sullivancountyclerktn.com/" },
  { label: "Chancery Court", url: "https://sullivantnchancery.com/" },
  { label: "District Attorney", url: "https://sullivancountyda.com/" },
  { label: "Election Office", url: "https://www.scelect.org/" },
  { label: "Historic Sullivan (Archives/Tourism)", url: "https://www.historicsullivan.com/" },
  { label: "Register of Deeds Records", url: "https://ustitlesearch.net/" },
  {
    label: "BidNet (Purchasing Bids)",
    url: "https://www.bidnetdirect.com/tennessee/sullivancountytn",
  },
  { label: "State of Tennessee", url: "https://www.tn.gov/" },
  { label: "County Technical Assistance Service", url: "http://www.ctas.tennessee.edu/" },
];

function ContactPage() {
  return (
    <main className="pt-24 pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 h-px w-12 bg-brand-copper" />
        <h1 className="font-display text-4xl font-bold text-brand-navy mb-4 sm:text-5xl">
          Contact Sullivan County
        </h1>
        <p className="font-body text-brand-slate-light mb-14 max-w-2xl leading-relaxed">
          Reach out to Sullivan County government offices for assistance with county services,
          records, and general inquiries.
        </p>

        {/* Main contact info */}
        <div className="mb-14 rounded-sm border border-brand-surface bg-brand-parchment p-7">
          <h2 className="font-display text-xl font-bold text-brand-navy mb-5">
            Main County Office
          </h2>
          <div className="flex flex-col gap-3.5 font-body text-sm">
            <div className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-copper" />
              <span>3411 TN-126, Blountville, TN 37617</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-brand-copper" />
              <a href="tel:+14233236417" className="hover:text-brand-navy hover:underline">
                (423) 323-6417
              </a>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0 text-brand-copper" />
              <span>Monday&ndash;Friday, 8am&ndash;5pm</span>
            </div>
          </div>
          <p className="mt-5 font-body text-sm text-brand-slate">
            For specific department information, visit our{" "}
            <Link
              to="/departments"
              className="text-brand-copper hover:text-brand-copper-light hover:underline font-medium"
            >
              department directory
            </Link>
            .
          </p>
        </div>

        {/* Quick contacts grid */}
        <div className="mb-14">
          <h2 className="font-display text-xl font-bold text-brand-navy mb-6">Most Contacted</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {quickContacts.map((dept) => (
              <div
                key={dept.name}
                className="card-lift group relative rounded-sm border border-brand-surface bg-white overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-copper scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
                <div className="p-5">
                  <h3 className="font-display text-base font-bold text-brand-navy mb-1">
                    {dept.name}
                  </h3>
                  <p className="font-body text-sm text-brand-slate-light mb-3">
                    {dept.description}
                  </p>
                  <div className="flex flex-col gap-2 font-body text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="size-3.5 shrink-0 text-brand-navy/50" />
                      <a
                        href={`tel:${dept.phone.replace(/[^\d+]/g, "")}`}
                        className="hover:text-brand-navy hover:underline"
                      >
                        {dept.phone}
                      </a>
                    </div>
                    {"emergency" in dept && dept.emergency && (
                      <div className="flex items-center gap-2">
                        <Phone className="size-3.5 shrink-0 text-[#a63d3d]" />
                        <span className="font-semibold text-[#a63d3d]">
                          Emergency: {dept.emergency}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* External resources */}
        <div className="rounded-sm border border-brand-surface bg-brand-parchment p-7">
          <h2 className="font-display text-xl font-bold text-brand-navy mb-5">
            Community Resources
          </h2>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {externalResources.map((resource) => (
              <li key={resource.label}>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm text-brand-copper hover:text-brand-copper-light hover:underline"
                >
                  <ExternalLink className="size-4 shrink-0" />
                  {resource.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
