import { Link } from "@tanstack/react-router";
import { ArrowLeft, Check, ExternalLink, MapPin, Phone } from "lucide-react";
import { ContactCard } from "~/components/shared/ContactCard";
import { Badge } from "~/components/ui/badge";
import type { Department, DepartmentCategory } from "~/data/departments";
import { DEPARTMENT_CATEGORIES } from "~/data/departments";

const categoryBadgeColors: Record<DepartmentCategory, string> = {
  administrative: "bg-white/15 text-white/90 border border-white/20",
  courts: "bg-brand-courts/20 text-brand-courts border border-brand-courts/20",
  "public-safety": "bg-brand-safety/20 text-brand-safety border border-brand-safety/20",
  finance: "bg-brand-sage/20 text-brand-sage border border-brand-sage/20",
  operations: "bg-brand-brass/20 text-brand-brass border border-brand-brass/20",
  community: "bg-brand-community/20 text-brand-community border border-brand-community/20",
};

const categoryAccentColors: Record<DepartmentCategory, string> = {
  administrative: "bg-brand-brass",
  courts: "bg-brand-courts",
  "public-safety": "bg-brand-safety",
  finance: "bg-brand-sage",
  operations: "bg-brand-brass",
  community: "bg-brand-community",
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-xl font-bold text-brand-navy">{children}</h2>
      <div className="mt-2 h-px w-12 bg-gradient-to-r from-brand-copper to-brand-brass/40" />
    </div>
  );
}

interface DepartmentDetailProps {
  department: Department;
}

export function DepartmentDetail({ department }: DepartmentDetailProps) {
  const categoryMeta = DEPARTMENT_CATEGORIES[department.category];
  const hasOffices = department.additionalOffices && department.additionalOffices.length > 0;
  const hasStaff = department.staff && department.staff.length > 0;
  const hasLinks = department.externalLinks && department.externalLinks.length > 0;

  return (
    <>
      {/* Navy header banner */}
      <div className="relative bg-brand-navy overflow-hidden">
        {/* Topo texture */}
        <div className="absolute inset-0 bg-topo-pattern opacity-100 pointer-events-none" />
        {/* Category accent bar at top */}
        <div className={`h-1 ${categoryAccentColors[department.category]}`} />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-8 pb-14 sm:px-6 sm:pb-20 lg:px-8">
          <Link
            to="/departments"
            className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-brand-brass hover:text-brand-brass/80 transition-colors mb-6"
          >
            <ArrowLeft className="size-4" />
            All Departments
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge
              className={`rounded-sm font-body text-[11px] tracking-wide ${categoryBadgeColors[department.category]}`}
            >
              {categoryMeta.label}
            </Badge>
          </div>
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {department.name}
          </h1>
          <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-brand-cream/60">
            {department.description}
          </p>
        </div>
      </div>

      {/* Main content — contact card pulls up into the banner */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse gap-8 lg:flex-row lg:-mt-8">
          {/* Main content */}
          <div className="flex-1 py-10">
            {/* Services */}
            <section>
              <SectionHeading>Services</SectionHeading>
              <ul className="grid gap-3 sm:grid-cols-2">
                {department.services.map((service) => (
                  <li
                    key={service}
                    className="flex items-start gap-3 rounded-sm bg-brand-parchment/60 px-4 py-3"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-brand-copper" />
                    <span className="font-body text-sm text-brand-slate">{service}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Additional Offices */}
            {hasOffices && (
              <>
                <div className="my-10 divider-heritage opacity-20" />
                <section>
                  <SectionHeading>Other Locations</SectionHeading>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {department.additionalOffices?.map((office) => (
                      <div
                        key={office.name}
                        className="group relative rounded-sm border border-brand-surface bg-white p-6 overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-copper scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
                        <h3 className="font-display text-base font-bold text-brand-navy mb-3">
                          {office.name}
                        </h3>
                        <div className="flex flex-col gap-2.5 font-body text-sm">
                          <div className="flex items-start gap-2.5">
                            <MapPin className="mt-0.5 size-4 shrink-0 text-brand-copper" />
                            <span>{office.address}</span>
                          </div>
                          <div className="flex items-start gap-2.5">
                            <Phone className="mt-0.5 size-4 shrink-0 text-brand-copper" />
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
              </>
            )}

            {/* Staff Directory */}
            {hasStaff && (
              <>
                <div className="my-10 divider-heritage opacity-20" />
                <section>
                  <SectionHeading>Staff Directory</SectionHeading>
                  <div className="overflow-x-auto rounded-sm border border-brand-surface">
                    <table className="w-full font-body text-sm">
                      <thead>
                        <tr className="border-b border-brand-surface bg-brand-parchment">
                          <th className="px-5 py-3.5 text-left font-semibold text-brand-navy">
                            Name
                          </th>
                          <th className="px-5 py-3.5 text-left font-semibold text-brand-navy">
                            Title
                          </th>
                          <th className="px-5 py-3.5 text-left font-semibold text-brand-navy">
                            Phone
                          </th>
                          <th className="px-5 py-3.5 text-left font-semibold text-brand-navy">
                            Email
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {department.staff?.map((member) => (
                          <tr
                            key={`${member.name}-${member.title}`}
                            className="border-b border-brand-surface last:border-b-0 even:bg-brand-parchment/50 hover:bg-brand-parchment/70 transition-colors"
                          >
                            <td className="px-5 py-3.5 font-medium text-brand-slate">
                              {member.name}
                            </td>
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
              </>
            )}

            {/* Resources / External Links */}
            {hasLinks && (
              <>
                <div className="my-10 divider-heritage opacity-20" />
                <section>
                  <SectionHeading>Resources</SectionHeading>
                  <ul className="space-y-3">
                    {department.externalLinks?.map((link) => (
                      <li key={link.url}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2.5 font-body text-sm text-brand-copper hover:text-brand-copper-light transition-colors"
                        >
                          <ExternalLink className="size-4 shrink-0" />
                          <span className="underline underline-offset-2 decoration-brand-copper/30 group-hover:decoration-brand-copper-light">
                            {link.label}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            )}
          </div>

          {/* Sidebar — Contact Card overlaps banner */}
          <div className="lg:w-80 lg:shrink-0 lg:-mt-16">
            <div className="lg:sticky lg:top-24">
              <ContactCard
                head={department.head}
                contact={department.contact}
                category={department.category}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
