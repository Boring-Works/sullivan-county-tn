import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Download, Youtube } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  COMMISSION_REGULAR_SESSION_NAME,
  COMMISSION_REGULAR_SESSION_RULE,
  COURTHOUSE,
} from "~/data/meetings";
import { buildIcs, formatNyDateTime, nextOccurrence } from "~/lib/recurrence";

const MEETING_NAME = COMMISSION_REGULAR_SESSION_NAME;
const MEETING_LOCATION = COURTHOUSE;

function buildIcsHref(start: Date): string {
  const ics = buildIcs({
    uid: `commission-${start.toISOString()}@sullivancountytn.gov`,
    title: MEETING_NAME,
    description: "Sullivan County Commission Regular Session. Streamed live on YouTube.",
    location: MEETING_LOCATION,
    start,
    durationMinutes: 120,
  });
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}

export function NextMeetingCard() {
  const { t } = useTranslation();
  // Computed once on initial render so the date renders during SSR and ships in
  // the initial HTML. The result is stable across server/client for the same
  // request — the meeting is always days+ in the future, so timing skew between
  // server and hydration produces the same human-readable string.
  const [next] = useState<Date>(() => nextOccurrence(COMMISSION_REGULAR_SESSION_RULE));

  return (
    <section className="bg-brand-cream py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-sm border border-brand-surface bg-white shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Left: identity */}
            <div className="bg-brand-navy text-brand-cream p-7 lg:p-8 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-2 font-body text-[10px] font-semibold tracking-widest uppercase text-brand-brass-light">
                  <span className="block size-1.5 rounded-full bg-brand-brass-light" />
                  {t("home.nextMeeting.eyebrow")}
                </span>
                <h2 className="mt-3 font-display text-xl font-bold text-white sm:text-2xl">
                  {t("home.nextMeeting.heading")}
                </h2>
                <p className="mt-2 font-body text-sm text-brand-cream/70">
                  {t("home.nextMeeting.body")}
                </p>
              </div>
              <Link
                to="/calendar"
                className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-brand-brass-light hover:text-white"
              >
                {t("home.nextMeeting.seeFullSchedule")}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>

            {/* Right: details */}
            <div className="p-7 lg:p-8 lg:col-span-2 flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-sm bg-brand-copper/10 text-brand-copper">
                  <Calendar aria-hidden="true" className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-[11px] font-medium tracking-widest uppercase text-brand-stone">
                    {MEETING_NAME}
                  </p>
                  <p className="mt-1 font-display text-lg font-bold text-brand-navy sm:text-xl">
                    {formatNyDateTime(next)}
                  </p>
                  <p className="mt-1 font-body text-sm text-brand-slate-light">
                    {MEETING_LOCATION}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href={buildIcsHref(next)}
                  download={`sullivan-county-commission-${next.toISOString().slice(0, 10)}.ics`}
                  className="inline-flex items-center gap-2 rounded-sm border border-brand-navy/20 bg-white px-4 py-2 font-body text-sm font-medium text-brand-navy hover:border-brand-copper/40 hover:text-brand-copper transition-colors"
                >
                  <Download aria-hidden="true" className="size-4" />
                  {t("home.nextMeeting.addToCalendar")}
                </a>
                <a
                  href="https://www.youtube.com/@sullivancountycommission"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm border border-brand-navy/20 bg-white px-4 py-2 font-body text-sm font-medium text-brand-navy hover:border-brand-copper/40 hover:text-brand-copper transition-colors"
                >
                  <Youtube aria-hidden="true" className="size-4" />
                  {t("home.nextMeeting.watchLive")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
