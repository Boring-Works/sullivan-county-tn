import { Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, MapPin, Phone } from "lucide-react";
import { ContactCard } from "~/components/shared/ContactCard";
import { Badge } from "~/components/ui/badge";
import type { Department, DepartmentCategory } from "~/data/departments";
import { DEPARTMENT_CATEGORIES } from "~/data/departments";

const categoryColors: Record<DepartmentCategory, string> = {
  administrative: "bg-brand-navy/10 text-brand-navy border border-brand-navy/15",
  courts: "bg-[#6b4c8a]/10 text-[#6b4c8a] border border-[#6b4c8a]/15",
  "public-safety": "bg-[#a63d3d]/10 text-[#a63d3d] border border-[#a63d3d]/15",
  finance: "bg-brand-sage/10 text-brand-sage border border-brand-sage/15",
  operations: "bg-brand-brass/10 text-brand-brass border border-brand-brass/15",
  community: "bg-[#3d7a7a]/10 text-[#3d7a7a] border border-[#3d7a7a]/15",
};

interface DepartmentDetailProps {
  department: Department;
}

export function DepartmentDetail({ department }: DepartmentDetailProps) {
  const categoryMeta = DEPARTMENT_CATEGORIES[department.category];
  const hasOffices = department.additionalOffices && department.additionalOffices.length > 0;
  const hasStaff = department.staff && department.staff.length > 0;
  const hasLinks = department.externalLinks && department.externalLinks.length > 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10">
        <Link
          to="/departments"
          className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-brand-copper hover:text-brand-copper-light transition-colors mb-5"
        >
          <ArrowLeft className="size-4" />
          All Departments
        </Link>
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="font-display text-3xl font-bold text-brand-navy sm:text-4xl lg:text-5xl">
            {department.name}
          </h1>
          <Badge className={`rounded-sm font-body text-xs ${categoryColors[department.category]}`}>
            {categoryMeta.label}
          </Badge>
        </div>
        <div className="mt-4 h-px w-20 bg-brand-copper" />
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col-reverse gap-10 lg:flex-row">
        {/* Main content */}
        <div className="flex-1 space-y-12">
          {/* About */}
          <section>
            <h2 className="font-display mb-4 text-xl font-bold text-brand-navy">About</h2>
            <p className="font-body leading-relaxed text-brand-slate">{department.description}</p>
          </section>

          {/* Services */}
          <section>
            <h2 className="font-display mb-4 text-xl font-bold text-brand-navy">Services</h2>
            <ul className="space-y-2.5">
              {department.services.map((service) => (
                <li key={service} className="flex items-start gap-3">
                  <span className="mt-2.5 block h-1 w-1 shrink-0 rounded-full bg-brand-copper" />
                  <span className="font-body text-brand-slate">{service}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Additional Offices */}
          {hasOffices && (
            <section>
              <h2 className="font-display mb-5 text-xl font-bold text-brand-navy">
                Other Locations
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {department.additionalOffices?.map((office) => (
                  <div
                    key={office.name}
                    className="rounded-sm border border-brand-surface bg-white p-5"
                  >
                    <h3 className="font-display text-base font-bold text-brand-navy mb-3">
                      {office.name}
                    </h3>
                    <div className="flex flex-col gap-2 font-body text-sm">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="mt-0.5 size-4 shrink-0 text-brand-navy/60" />
                        <span>{office.address}</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Phone className="mt-0.5 size-4 shrink-0 text-brand-navy/60" />
                        <a
                          href={`tel:${office.phone}`}
                          className="hover:text-brand-navy hover:underline"
                        >
                          {office.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Staff Directory */}
          {hasStaff && (
            <section>
              <h2 className="font-display mb-5 text-xl font-bold text-brand-navy">
                Staff Directory
              </h2>
              <div className="overflow-x-auto rounded-sm border border-brand-surface">
                <table className="w-full font-body text-sm">
                  <thead>
                    <tr className="border-b border-brand-surface bg-brand-parchment">
                      <th className="px-5 py-3.5 text-left font-semibold text-brand-navy">Name</th>
                      <th className="px-5 py-3.5 text-left font-semibold text-brand-navy">Title</th>
                      <th className="px-5 py-3.5 text-left font-semibold text-brand-navy">Phone</th>
                      <th className="px-5 py-3.5 text-left font-semibold text-brand-navy">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {department.staff?.map((member) => (
                      <tr
                        key={`${member.name}-${member.title}`}
                        className="border-b border-brand-surface last:border-b-0 hover:bg-brand-parchment/50 transition-colors"
                      >
                        <td className="px-5 py-3.5 font-medium text-brand-slate">{member.name}</td>
                        <td className="px-5 py-3.5 text-brand-slate-light">{member.title}</td>
                        <td className="px-5 py-3.5">
                          {member.phone ? (
                            <a
                              href={`tel:${member.phone}`}
                              className="text-brand-slate hover:text-brand-navy hover:underline"
                            >
                              {member.phone}
                            </a>
                          ) : (
                            <span className="text-brand-warm-gray">&mdash;</span>
                          )}
                        </td>
                        <td className="px-5 py-3.5">
                          {member.email ? (
                            <a
                              href={`mailto:${member.email}`}
                              className="text-brand-slate hover:text-brand-navy hover:underline break-all"
                            >
                              {member.email}
                            </a>
                          ) : (
                            <span className="text-brand-warm-gray">&mdash;</span>
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
              <h2 className="font-display mb-4 text-xl font-bold text-brand-navy">Resources</h2>
              <ul className="space-y-2.5">
                {department.externalLinks?.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-body text-brand-copper hover:text-brand-copper-light transition-colors"
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
