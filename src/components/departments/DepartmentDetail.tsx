import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  Check,
  Download,
  ExternalLink,
  FileText,
  MapPin,
  Phone,
} from "lucide-react";
import { PrintableContactCard } from "~/components/departments/PrintableContactCard";
import { ContactCard } from "~/components/shared/ContactCard";
import { DetailBreadcrumb } from "~/components/shared/DetailBreadcrumb";
import { OpenStatusPill } from "~/components/shared/OpenStatusPill";
import { PageFeedback } from "~/components/shared/PageFeedback";
import { TelLink } from "~/components/shared/TelLink";
import { Badge } from "~/components/ui/badge";
import type { Department, DepartmentCategory } from "~/data/departments";
import { DEFAULT_LAST_UPDATED, DEPARTMENT_CATEGORIES } from "~/data/departments";
import { type ExternalHandoffId, externalHandoffs } from "~/data/external-handoffs";

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

interface ServiceTask {
  title: string;
  steps: string[];
  handoffId?: ExternalHandoffId;
  note?: string;
}

const verifiedServiceTasks: Record<string, ServiceTask[]> = {
  "county-clerk": [
    {
      title: "Renew vehicle tags",
      steps: [
        "Confirm the vehicle is registered in Sullivan County.",
        "Use the Tennessee County Clerk renewal system or call the Clerk if the renewal is blocked.",
        "Standard plate renewal is listed by the Clerk as $29 per year before processing fees.",
      ],
      handoffId: "countyClerkPlateRenewal",
    },
    {
      title: "Get a marriage license",
      steps: [
        "Start the online application before visiting the Clerk.",
        "Both applicants should appear in person unless an official exception applies.",
        "Bring valid photo ID and Social Security number if one has been issued.",
      ],
      handoffId: "countyClerkMarriage",
      note: "License fees and juvenile requirements should be confirmed with the Clerk before visiting.",
    },
  ],
  trustee: [
    {
      title: "Pay property taxes",
      steps: [
        "Search by owner, parcel, or tax information in the Trustee portal.",
        "Review the record and payment amount before submitting payment.",
        "Contact the Trustee if the property is not available for online payment.",
      ],
      handoffId: "trusteePayTaxes",
    },
  ],
  "planning-and-codes": [
    {
      title: "Check before starting a building project",
      steps: [
        "Check zoning and determine the permit type before work starts.",
        "Building permits are commonly required for new homes, additions, garages, pools, decks, roofs, and remodeling.",
        "For non-residential or multi-family work, prepare a site plan and check septic, sewer, stormwater, floodplain, driveway, and TDOT requirements.",
      ],
      note: "Electrical permits and inspections are handled through Tennessee CORE.",
    },
  ],
  highway: [
    {
      title: "Report a county road issue",
      steps: [
        "Confirm the issue is on a county road, bridge, or drainage system.",
        "Gather road name, nearest address or intersection, issue type, photos if available, and safety urgency.",
        "Call the Highway Department at (423) 279-2820. Use emergency services for immediate hazards.",
      ],
    },
  ],
  "election-office": [
    {
      title: "Register or check voter registration",
      steps: [
        "Register or update voter information online through the Tennessee Secretary of State.",
        "Registration must be completed or postmarked at least 30 days before Election Day.",
        "Use voter lookup to confirm registration and polling information.",
      ],
      handoffId: "voterRegistration",
      note: "Use the Tennessee voter lookup site to check current registration status.",
    },
  ],
  "solid-waste": [
    {
      title: "Dispose of appliances, computers, or recycling",
      steps: [
        "Use the Kingsport or Bristol transfer station for old appliances and computers.",
        "Accepted recycling examples include mixed paper, cardboard, aluminum cans, and tin cans.",
        "Call Solid Waste before bringing unusual materials or large loads.",
      ],
      note: "Full accepted/prohibited material lists should be confirmed with Solid Waste.",
    },
  ],
  sheriff: [
    {
      title: "Contact law enforcement",
      steps: [
        "Call 911 for emergencies.",
        "For non-emergency Sheriff contact, call (423) 279-7500.",
        "Be ready with incident type, location, involved people or vehicles, and whether immediate danger exists.",
      ],
    },
  ],
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
  const serviceTasks = verifiedServiceTasks[department.slug] ?? [];

  return (
    <main id="main-content" className="dept-detail-main">
      <PrintableContactCard department={department} />
      <div className="dept-detail-screen">
        {/* Navy header banner */}
        <div className="relative bg-brand-navy overflow-hidden">
          {/* Topo texture */}
          <div className="absolute inset-0 bg-topo-pattern opacity-100 pointer-events-none" />
          {/* Category accent bar at top */}
          <div className={`h-1 ${categoryAccentColors[department.category]}`} />

          <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-14 sm:px-6 sm:pb-20 lg:px-8">
            <Link
              to="/departments"
              search={{ category: undefined }}
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
              <OpenStatusPill hours={department.contact.hours} variant="dark" />
            </div>
            <h1
              className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
              style={{ viewTransitionName: `dept-${department.slug}` }}
            >
              {department.name}
            </h1>
            <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-brand-cream/80">
              {department.description}
            </p>
          </div>
        </div>

        {/* Main content — contact card pulls up into the banner */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <DetailBreadcrumb
            className="pt-6"
            items={[
              { label: "Home", to: "/" },
              { label: "Departments", to: "/departments" },
              { label: department.name },
            ]}
          />
          <div className="flex flex-col-reverse gap-8 lg:flex-row lg:-mt-8">
            {/* Main content */}
            <div className="flex-1 py-8">
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

              {serviceTasks.length > 0 && (
                <section className="mt-10">
                  <SectionHeading>Common tasks</SectionHeading>
                  <div className="grid gap-4 lg:grid-cols-2">
                    {serviceTasks.map((task) => (
                      <article
                        key={task.title}
                        className="rounded-sm border border-brand-surface bg-white p-5 shadow-sm"
                      >
                        <h3 className="font-display text-base font-bold text-brand-navy">
                          {task.title}
                        </h3>
                        <ol className="mt-3 list-decimal space-y-2 pl-5 font-body text-sm leading-relaxed text-brand-slate">
                          {task.steps.map((step) => (
                            <li key={step}>{step}</li>
                          ))}
                        </ol>
                        {task.note ? (
                          <p className="mt-3 font-body text-xs leading-relaxed text-brand-stone">
                            {task.note}
                          </p>
                        ) : null}
                        {task.handoffId ? (
                          <a
                            href={externalHandoffs[task.handoffId].url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-brand-copper hover:underline"
                          >
                            {externalHandoffs[task.handoffId].label}
                            <ExternalLink aria-hidden="true" className="size-3.5" />
                          </a>
                        ) : null}
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {/* Important Notes */}
              {department.importantNotes && department.importantNotes.length > 0 && (
                <section>
                  <h2 className="font-display mb-4 text-xl font-bold text-brand-navy">
                    Important Notes
                  </h2>
                  <div className="rounded-sm border border-amber-200 bg-amber-50 p-5">
                    <ul className="space-y-2">
                      {department.importantNotes.map((note) => (
                        <li key={note} className="flex items-start gap-3">
                          <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                          <span className="font-body text-sm text-amber-900">{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}

              {/* Bid Thresholds */}
              {department.bidThresholds && department.bidThresholds.length > 0 && (
                <section>
                  <h2 className="font-display mb-5 text-xl font-bold text-brand-navy">
                    Bid Thresholds
                  </h2>
                  <div className="overflow-x-auto rounded-sm border border-brand-surface">
                    <table className="w-full font-body text-sm">
                      <thead>
                        <tr className="border-b border-brand-surface bg-brand-parchment">
                          <th className="px-5 py-3.5 text-left font-semibold text-brand-navy">
                            Purchase Range
                          </th>
                          <th className="px-5 py-3.5 text-left font-semibold text-brand-navy">
                            Process Required
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {department.bidThresholds.map((threshold) => (
                          <tr
                            key={threshold.range}
                            className="border-b border-brand-surface last:border-b-0 even:bg-brand-parchment/50"
                          >
                            <td className="px-5 py-3.5 font-medium text-brand-slate whitespace-nowrap">
                              {threshold.range}
                            </td>
                            <td className="px-5 py-3.5 text-brand-slate">{threshold.process}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* Key Documents */}
              {department.keyDocuments && department.keyDocuments.length > 0 && (
                <section>
                  <h2 className="font-display mb-4 text-xl font-bold text-brand-navy">
                    Key Documents
                  </h2>
                  <ul className="space-y-3">
                    {department.keyDocuments.map((doc) => (
                      <li key={doc.name} className="flex items-start gap-3">
                        <FileText className="mt-0.5 size-4 shrink-0 text-brand-copper" />
                        <div>
                          {doc.url ? (
                            <a
                              href={doc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-body font-medium text-brand-copper hover:text-brand-copper-light transition-colors"
                            >
                              {doc.name}
                            </a>
                          ) : (
                            <span className="font-body font-medium text-brand-slate">
                              {doc.name}
                            </span>
                          )}
                          {doc.description && (
                            <p className="mt-0.5 font-body text-sm text-brand-slate-light">
                              {doc.description}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Meeting Schedule */}
              {department.meetingSchedule && department.meetingSchedule.length > 0 && (
                <section>
                  <h2 className="font-display mb-5 text-xl font-bold text-brand-navy">
                    Meeting Schedule
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {department.meetingSchedule.map((meeting) => (
                      <div
                        key={meeting.name}
                        className="rounded-sm border border-brand-surface bg-white p-5"
                      >
                        <h3 className="font-display text-base font-bold text-brand-navy mb-2">
                          {meeting.name}
                        </h3>
                        <div className="flex items-start gap-2.5 font-body text-sm text-brand-slate">
                          <Calendar className="mt-0.5 size-4 shrink-0 text-brand-navy/60" />
                          <span>{meeting.schedule}</span>
                        </div>
                        {meeting.location && (
                          <div className="flex items-start gap-2.5 font-body text-sm text-brand-slate mt-2">
                            <MapPin className="mt-0.5 size-4 shrink-0 text-brand-navy/60" />
                            <span>{meeting.location}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Publications */}
              {department.publications && department.publications.length > 0 && (
                <section>
                  <h2 className="font-display mb-4 text-xl font-bold text-brand-navy">
                    Publications
                  </h2>
                  <ul className="space-y-2.5">
                    {department.publications.map((pub) => (
                      <li key={pub.name}>
                        {pub.url ? (
                          <a
                            href={pub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-body text-brand-copper hover:text-brand-copper-light transition-colors"
                          >
                            <Download className="size-4 shrink-0" />
                            {pub.name}
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-2 font-body text-brand-slate">
                            <FileText className="size-4 shrink-0 text-brand-navy/60" />
                            {pub.name}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* FAQ */}
              {department.faqItems && department.faqItems.length > 0 && (
                <section>
                  <h2 className="font-display mb-5 text-xl font-bold text-brand-navy">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {department.faqItems.map((faq) => (
                      <div
                        key={faq.question}
                        className="rounded-sm border border-brand-surface bg-white p-5"
                      >
                        <h3 className="font-display text-base font-bold text-brand-navy mb-2">
                          {faq.question}
                        </h3>
                        <p className="font-body text-sm leading-relaxed text-brand-slate">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

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
                              <Phone
                                aria-hidden="true"
                                className="mt-0.5 size-4 shrink-0 text-brand-copper"
                              />
                              <TelLink
                                phone={office.phone}
                                className="hover:text-brand-navy hover:underline"
                              />
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
                                  <TelLink
                                    phone={member.phone}
                                    className="text-brand-slate hover:text-brand-navy hover:underline"
                                  />
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
          {/* Last-reviewed trust signal — GOV.UK pattern. */}
          {(department.lastUpdated ?? DEFAULT_LAST_UPDATED) && (
            <p className="mt-12 mb-4 text-center font-body text-xs text-brand-stone">
              Last reviewed{" "}
              <time dateTime={department.lastUpdated ?? DEFAULT_LAST_UPDATED}>
                {formatLastUpdated(department.lastUpdated ?? DEFAULT_LAST_UPDATED)}
              </time>
            </p>
          )}
          <PageFeedback />
        </div>
      </div>
    </main>
  );
}

function formatLastUpdated(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(year, month - 1, day));
}
