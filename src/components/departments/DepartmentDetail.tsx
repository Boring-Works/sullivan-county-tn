import { Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, MapPin, Phone } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ContactCard } from "~/components/shared/ContactCard";
import type { Department, DepartmentCategory } from "~/data/departments";
import { DEPARTMENT_CATEGORIES } from "~/data/departments";

const categoryColors: Record<DepartmentCategory, string> = {
  administrative: "bg-blue-100 text-blue-800",
  courts: "bg-purple-100 text-purple-800",
  "public-safety": "bg-red-100 text-red-800",
  finance: "bg-green-100 text-green-800",
  operations: "bg-amber-100 text-amber-800",
  community: "bg-teal-100 text-teal-800",
};

interface DepartmentDetailProps {
  department: Department;
}

export function DepartmentDetail({ department }: DepartmentDetailProps) {
  const categoryMeta = DEPARTMENT_CATEGORIES[department.category];
  const hasOffices =
    department.additionalOffices && department.additionalOffices.length > 0;
  const hasStaff = department.staff && department.staff.length > 0;
  const hasLinks =
    department.externalLinks && department.externalLinks.length > 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/departments"
          className="inline-flex items-center gap-1 text-sm font-medium text-brand-orange hover:text-brand-orange-light transition-colors mb-4"
        >
          <ArrowLeft className="size-4" />
          All Departments
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold text-brand-blue sm:text-4xl">
            {department.name}
          </h1>
          <Badge className={categoryColors[department.category]}>
            {categoryMeta.label}
          </Badge>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col-reverse gap-8 lg:flex-row">
        {/* Main content */}
        <div className="flex-1 space-y-10">
          {/* About */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-brand-blue">
              About
            </h2>
            <p className="leading-relaxed text-brand-slate">
              {department.description}
            </p>
          </section>

          {/* Services */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-brand-blue">
              Services
            </h2>
            <ul className="space-y-2">
              {department.services.map((service) => (
                <li key={service} className="flex items-start gap-2">
                  <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" />
                  <span className="text-brand-slate">{service}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Additional Offices */}
          {hasOffices && (
            <section>
              <h2 className="mb-4 text-xl font-semibold text-brand-blue">
                Other Locations
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {department.additionalOffices!.map((office) => (
                  <Card key={office.name}>
                    <CardHeader>
                      <CardTitle className="text-base text-brand-blue">
                        {office.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2 text-sm">
                      <div className="flex items-start gap-2">
                        <MapPin className="mt-0.5 size-4 shrink-0 text-brand-blue" />
                        <span>{office.address}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="mt-0.5 size-4 shrink-0 text-brand-blue" />
                        <a
                          href={`tel:${office.phone}`}
                          className="hover:text-brand-blue hover:underline"
                        >
                          {office.phone}
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Staff Directory */}
          {hasStaff && (
            <section>
              <h2 className="mb-4 text-xl font-semibold text-brand-blue">
                Staff Directory
              </h2>
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-brand-surface">
                      <th className="px-4 py-3 text-left font-semibold text-brand-blue">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-brand-blue">
                        Title
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-brand-blue">
                        Phone
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-brand-blue">
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {department.staff!.map((member) => (
                      <tr
                        key={`${member.name}-${member.title}`}
                        className="border-b last:border-b-0 hover:bg-brand-surface/50 transition-colors"
                      >
                        <td className="px-4 py-3 font-medium text-brand-slate">
                          {member.name}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {member.title}
                        </td>
                        <td className="px-4 py-3">
                          {member.phone ? (
                            <a
                              href={`tel:${member.phone}`}
                              className="text-brand-slate hover:text-brand-blue hover:underline"
                            >
                              {member.phone}
                            </a>
                          ) : (
                            <span className="text-muted-foreground">&mdash;</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {member.email ? (
                            <a
                              href={`mailto:${member.email}`}
                              className="text-brand-slate hover:text-brand-blue hover:underline break-all"
                            >
                              {member.email}
                            </a>
                          ) : (
                            <span className="text-muted-foreground">&mdash;</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Resources / External Links */}
          {hasLinks && (
            <section>
              <h2 className="mb-3 text-xl font-semibold text-brand-blue">
                Resources
              </h2>
              <ul className="space-y-2">
                {department.externalLinks!.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-brand-orange hover:text-brand-orange-light transition-colors"
                    >
                      <ExternalLink className="size-4 shrink-0" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Sidebar — Contact Card */}
        <div className="lg:w-80 lg:shrink-0">
          <div className="lg:sticky lg:top-24">
            <ContactCard head={department.head} contact={department.contact} />
          </div>
        </div>
      </div>
    </div>
  );
}
