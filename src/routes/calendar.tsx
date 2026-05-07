import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Clock, Download, ExternalLink, MapPin } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  COMMISSION_REGULAR_SESSION_NAME,
  COMMISSION_REGULAR_SESSION_RULE,
  COURTHOUSE,
} from "~/data/meetings";
import { eventJsonLd, jsonLdString } from "~/lib/jsonld";
import { buildIcs, formatNyDateTime, nextOccurrence, type RecurrenceRule } from "~/lib/recurrence";
import { seo, seoLinks } from "~/utils/seo";

export const Route = createFileRoute("/calendar")({
  component: CalendarPage,
  head: () => ({
    meta: seo({
      title: "Calendar & Meetings — Sullivan County, TN",
      description:
        "Upcoming county meetings, commission sessions, and public events in Sullivan County, Tennessee.",
      url: "/calendar",
    }),
    links: seoLinks("/calendar"),
  }),
});

interface RecurringMeeting {
  name: string;
  schedule: string;
  time: string;
  location: string;
  notes?: string;
  link?: string;
  rule?: RecurrenceRule;
}

const recurringMeetings: RecurringMeeting[] = [
  {
    name: COMMISSION_REGULAR_SESSION_NAME,
    schedule: "3rd Thursday of each month",
    time: "6:30 PM",
    location: COURTHOUSE,
    notes: "Streamed live on YouTube",
    link: "https://www.youtube.com/@sullivancountycommission",
    rule: COMMISSION_REGULAR_SESSION_RULE,
  },
  {
    name: "County Commission Work Session",
    schedule: "1st Thursday of each month",
    time: "6:30 PM",
    location: COURTHOUSE,
    rule: { dayOfWeek: 4, nthOfMonth: 1, time: "18:30", durationMinutes: 120 },
  },
  {
    name: "Budget Committee",
    schedule: "As scheduled during budget season (May–June)",
    time: "Varies",
    location: COURTHOUSE,
  },
  {
    name: "Beer Board",
    schedule: "As needed",
    time: "Varies",
    location: COURTHOUSE,
  },
  {
    name: "Planning Commission",
    schedule: "2nd Tuesday of each month",
    time: "6:00 PM",
    location: COURTHOUSE,
    rule: { dayOfWeek: 2, nthOfMonth: 2, time: "18:00", durationMinutes: 90 },
  },
  {
    name: "Board of Zoning Appeals",
    schedule: "4th Tuesday of each month (as needed)",
    time: "6:00 PM",
    location: COURTHOUSE,
    rule: { dayOfWeek: 2, nthOfMonth: 4, time: "18:00", durationMinutes: 90 },
  },
];

const countyHolidays = [
  { name: "New Year's Day", date: "January 1" },
  { name: "Martin Luther King Jr. Day", date: "3rd Monday in January" },
  { name: "Presidents' Day", date: "3rd Monday in February" },
  { name: "Good Friday", date: "Friday before Easter" },
  { name: "Memorial Day", date: "Last Monday in May" },
  { name: "Independence Day", date: "July 4" },
  { name: "Labor Day", date: "1st Monday in September" },
  { name: "Columbus Day", date: "2nd Monday in October" },
  { name: "Veterans Day", date: "November 11" },
  { name: "Thanksgiving", date: "4th Thursday & Friday in November" },
  { name: "Christmas Eve & Day", date: "December 24–25" },
];

function MeetingRow({ meeting }: { meeting: RecurringMeeting }) {
  // Computed once on initial render so it ships in SSR HTML (powers Event JSON-LD).
  const [next] = useState<Date | null>(() => (meeting.rule ? nextOccurrence(meeting.rule) : null));

  const jsonLd = next
    ? jsonLdString(
        eventJsonLd({
          name: meeting.name,
          start: next,
          end: new Date(next.getTime() + (meeting.rule?.durationMinutes ?? 60) * 60_000),
          location: meeting.location,
          description: meeting.notes,
        }),
      )
    : null;

  function buildIcsHref(start: Date): string {
    const ics = buildIcs({
      uid: `${meeting.name.toLowerCase().replace(/\s+/g, "-")}-${start.toISOString()}@sullivancountytn.gov`,
      title: meeting.name,
      description: meeting.notes ?? "",
      location: meeting.location,
      start,
      durationMinutes: meeting.rule?.durationMinutes ?? 60,
    });
    return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
  }

  return (
    <div className="group rounded-sm border border-brand-surface bg-white p-5 hover:border-brand-copper/20 transition-colors">
      {jsonLd && (
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded bg-brand-navy/5">
          <Calendar aria-hidden="true" className="size-5 text-brand-navy/60" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-base font-bold text-brand-navy mb-2">{meeting.name}</h3>
          {next && (
            <p
              suppressHydrationWarning
              className="font-body text-sm font-semibold text-brand-copper mb-1.5"
            >
              Next: {formatNyDateTime(next)}
            </p>
          )}
          <div className="flex flex-col gap-1.5 font-body text-sm text-brand-slate-light">
            <div className="flex items-center gap-2">
              <Clock aria-hidden="true" className="size-3.5 shrink-0 text-brand-stone" />
              <span>
                {meeting.schedule} — {meeting.time}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin aria-hidden="true" className="size-3.5 shrink-0 text-brand-stone" />
              <span>{meeting.location}</span>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-3">
            {next && (
              <a
                href={buildIcsHref(next)}
                download={`${meeting.name.toLowerCase().replace(/\s+/g, "-")}-${next.toISOString().slice(0, 10)}.ics`}
                className="inline-flex items-center gap-1.5 font-body text-xs font-medium text-brand-copper hover:text-brand-copper-light hover:underline"
              >
                <Download aria-hidden="true" className="size-3" />
                Add to calendar
              </a>
            )}
            {meeting.link && (
              <a
                href={meeting.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-body text-xs font-medium text-brand-copper hover:text-brand-copper-light hover:underline"
              >
                <ExternalLink aria-hidden="true" className="size-3" />
                Watch live on YouTube
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CalendarPage() {
  const { t } = useTranslation();
  return (
    <main id="main-content" className="pt-24 pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 h-px w-12 bg-brand-copper" />
        <h1 className="font-display text-4xl font-bold text-brand-navy mb-4 sm:text-5xl">
          {t("calendar.title")}
        </h1>
        <p className="font-body text-brand-slate-light mb-14 max-w-2xl leading-relaxed">
          {t("calendar.description")}
        </p>

        {/* Recurring Meetings */}
        <section className="mb-14">
          <h2 className="font-display text-xl font-bold text-brand-navy mb-6">
            Recurring Meeting Schedule
          </h2>
          <div className="space-y-3">
            {recurringMeetings.map((meeting) => (
              <MeetingRow key={meeting.name} meeting={meeting} />
            ))}
          </div>
        </section>

        {/* County Holiday Closures */}
        <section className="mb-14">
          <h2 className="font-display text-xl font-bold text-brand-navy mb-6">
            County Holiday Closures
          </h2>
          <p className="font-body text-sm text-brand-slate-light mb-5 max-w-2xl">
            Sullivan County government offices are closed on the following holidays. Emergency
            services (911, Sheriff, EMS) remain available 24/7.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {countyHolidays.map((holiday) => (
              <div
                key={holiday.name}
                className="flex items-center gap-3 rounded-sm border border-brand-surface bg-white px-4 py-3"
              >
                <Calendar className="size-4 shrink-0 text-brand-copper" />
                <div>
                  <p className="font-body text-sm font-medium text-brand-navy">{holiday.name}</p>
                  <p className="font-body text-xs text-brand-stone">{holiday.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="mb-14">
          <h2 className="font-display text-xl font-bold text-brand-navy mb-6">Upcoming Events</h2>
          <div className="rounded-sm border border-brand-surface bg-brand-parchment p-8 text-center">
            <Calendar className="mx-auto size-10 text-brand-stone/40 mb-4" />
            <p className="font-display text-base font-bold text-brand-navy mb-2">
              No upcoming events scheduled
            </p>
            <p className="font-body text-sm text-brand-slate-light max-w-md mx-auto">
              Check back for upcoming community events, public hearings, and special sessions.
              Meeting agendas are published before each session.
            </p>
          </div>
        </section>

        {/* Resources */}
        <div className="rounded-sm border border-brand-surface bg-brand-parchment p-7">
          <h2 className="font-display text-lg font-bold text-brand-navy mb-4">Meeting Resources</h2>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.youtube.com/@sullivancountycommission"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-white border border-brand-surface px-4 py-2 font-body text-sm text-brand-slate hover:border-brand-copper/30 hover:text-brand-navy transition-colors"
            >
              <ExternalLink className="size-3.5" />
              Commission YouTube Channel
            </a>
            <Link
              to="/documents"
              className="rounded-sm bg-white border border-brand-surface px-4 py-2 font-body text-sm text-brand-slate hover:border-brand-copper/30 hover:text-brand-navy transition-colors"
            >
              Meeting Agendas &amp; Minutes
            </Link>
            <Link
              to="/commissioners"
              className="rounded-sm bg-white border border-brand-surface px-4 py-2 font-body text-sm text-brand-slate hover:border-brand-copper/30 hover:text-brand-navy transition-colors"
            >
              Commissioner Directory
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
