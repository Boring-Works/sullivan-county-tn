import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, MapPin, Phone, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
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
  {
    label: "Trustee (Tax Payments)",
    url: "https://www.sullivancountytrustee.com/",
  },
  {
    label: "Sullivan County Schools",
    url: "https://www.sullivank12.net/",
  },
  {
    label: "Kingsport Public Library",
    url: "https://www.kingsportlibrary.org/",
  },
  {
    label: "Sullivan County Animal Shelter",
    url: "https://www.scanimalshelter.org/",
  },
];

function ContactPage() {
  return (
    <main className="py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-brand-blue mb-4">Contact Sullivan County</h1>
        <p className="text-brand-slate-light mb-12 max-w-2xl">
          Reach out to Sullivan County government offices for assistance with county services,
          records, and general inquiries.
        </p>

        {/* Main contact info */}
        <div className="mb-12 rounded-lg border bg-brand-surface p-6">
          <h2 className="text-xl font-semibold text-brand-blue mb-4">Main County Office</h2>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-blue" />
              <span>3411 TN-126, Blountville, TN 37617</span>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="mt-0.5 size-4 shrink-0 text-brand-blue" />
              <a href="tel:+14233236417" className="hover:text-brand-blue hover:underline">
                (423) 323-6417
              </a>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="mt-0.5 size-4 shrink-0 text-brand-blue" />
              <span>Monday - Friday, 8am - 5pm</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-brand-slate">
            For specific department information, visit our{" "}
            <Link to="/departments" className="text-brand-blue hover:underline font-medium">
              department directory
            </Link>
            .
          </p>
        </div>

        {/* Quick contacts grid */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-brand-blue mb-6">Most Contacted</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {quickContacts.map((dept) => (
              <Card key={dept.name}>
                <CardHeader>
                  <CardTitle className="text-lg text-brand-blue">{dept.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{dept.description}</p>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="size-4 shrink-0 text-brand-blue" />
                    <a
                      href={`tel:${dept.phone.replace(/[^\d+]/g, "")}`}
                      className="hover:text-brand-blue hover:underline"
                    >
                      {dept.phone}
                    </a>
                  </div>
                  {"emergency" in dept && dept.emergency && (
                    <div className="flex items-center gap-2">
                      <Phone className="size-4 shrink-0 text-red-600" />
                      <span className="font-semibold text-red-600">
                        Emergency: {dept.emergency}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* External resources */}
        <div className="rounded-lg border bg-brand-surface p-6">
          <h2 className="text-xl font-semibold text-brand-blue mb-4">External Resources</h2>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {externalResources.map((resource) => (
              <li key={resource.label}>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-brand-blue hover:underline"
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
