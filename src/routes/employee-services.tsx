import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/employee-services")({
  component: EmployeeServicesPage,
});

const portals = [
  {
    name: "Skyward",
    description: "Financial and administrative system",
    url: "#",
  },
  {
    name: "Edison Employee Portal",
    description: "State employee hub",
    url: "https://hub.edison.tn.gov",
  },
  {
    name: "GOTOAssist Remote Support",
    description: "IT remote support access",
    url: "https://fastsupport.gotoassist.com",
  },
  {
    name: "Mark III Employee Benefits",
    description: "Benefits management portal",
    url: "https://mymarkiii.com/sullivancountytn",
  },
];

const resources = [
  "Medical and vision coverage (2025 rates available)",
  "Health plan comparison documents",
  "Open enrollment materials",
  "Employment application",
  "Title VI training video",
];

function EmployeeServicesPage() {
  return (
    <main className="py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 h-px w-12 bg-brand-copper" />
        <h1 className="font-display text-4xl font-bold text-brand-navy mb-4 sm:text-5xl">
          Employee Services
        </h1>
        <p className="font-body text-brand-slate-light mb-14 max-w-2xl leading-relaxed">
          Access employee portals, benefits information, and resources for Sullivan County staff.
        </p>

        {/* Portals Grid */}
        <div className="mb-14">
          <h2 className="font-display text-xl font-bold text-brand-navy mb-6">Employee Portals</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {portals.map((portal) => (
              <a
                key={portal.name}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-lift group relative rounded-sm border border-brand-surface bg-white overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-copper scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-display text-base font-bold text-brand-navy">
                      {portal.name}
                    </h3>
                    <ExternalLink className="size-4 text-brand-warm-gray opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="font-body text-sm text-brand-slate-light">{portal.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Benefits & Resources */}
        <div className="rounded-sm border border-brand-surface bg-brand-parchment p-7">
          <h2 className="font-display text-xl font-bold text-brand-navy mb-5">
            Benefits &amp; Resources
          </h2>
          <ul className="space-y-2.5">
            {resources.map((resource) => (
              <li key={resource} className="flex items-start gap-3">
                <span className="mt-2.5 block h-1 w-1 shrink-0 rounded-full bg-brand-copper" />
                <span className="font-body text-sm text-brand-slate">{resource}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 font-body text-sm text-brand-slate-light">
            For additional benefits information, visit{" "}
            <a
              href="https://www.tn.gov/partnersforhealth.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-copper hover:text-brand-copper-light hover:underline font-medium"
            >
              Partners for Health
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
