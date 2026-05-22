import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Clock, Download, ExternalLink, MapPin } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  countyHolidays,
  type RecurringMeeting,
  recurringMeetings,
  upcomingEvents,
} from "~/data/meetings";
import { eventJsonLd, jsonLdString } from "~/lib/jsonld";
import { buildIcs, formatNyDateTime, nextOccurrence } from "~/lib/recurrence";
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
    <article
      data-testid={`meeting-${meeting.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
      className="group rounded-sm border border-brand-surface bg-white p-5 hover:border-brand-copper/20 transition-colors"
    >
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
            {meeting.actions.map((action) =>
              action.external ? (
                <a
                  key={`${meeting.name}-${action.label}`}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-body text-xs font-medium text-brand-copper hover:text-brand-copper-light hover:underline"
                >
                  <ExternalLink aria-hidden="true" className="size-3" />
                  {action.label}
                </a>
              ) : (
                <Link
                  key={`${meeting.name}-${action.label}`}
                  to={action.href}
                  className="inline-flex items-center gap-1.5 font-body text-xs font-medium text-brand-copper hover:text-brand-copper-light hover:underline"
                >
                  {action.label}
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </article>
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
          <p className="font-body text-sm text-brand-slate-light mb-5 max-w-2xl">
            May 2026 highlights for county government and partner public meetings.
          </p>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <article
                key={`${event.name}-${event.startsAtLabel}`}
                className="rounded-sm border border-brand-surface bg-white p-5"
              >
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-display text-base font-bold text-brand-navy">{event.name}</h3>
                  <p className="font-body text-sm font-semibold text-brand-copper">
                    {event.startsAtLabel}
                  </p>
                </div>
                {event.location && (
                  <p className="mt-1 font-body text-xs text-brand-stone">
                    <span className="font-semibold text-brand-slate">Location:</span>{" "}
                    {event.location}
                  </p>
                )}
                <p className="mt-2 font-body text-sm text-brand-slate-light leading-relaxed">
                  {event.description}
                </p>
              </article>
            ))}
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
