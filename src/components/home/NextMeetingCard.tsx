import { Link } from "@tanstack/react-router";
import { Calendar, Download, Youtube } from "lucide-react";
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

/**
 * Slim single-row meeting banner — replaces the previous two-column hero card.
 * Citizens scanning the homepage get the next-meeting fact in one line; deeper
 * details live on /calendar.
 */
export function NextMeetingCard() {
  const { t } = useTranslation();
  // Computed once on initial render so the date renders during SSR. Stable
  // across server/client because the meeting is always days+ in the future.
  const [next] = useState<Date>(() => nextOccurrence(COMMISSION_REGULAR_SESSION_RULE));

  return (
    <section
      aria-label={t("home.nextMeeting.heading")}
      className="bg-brand-navy text-brand-cream py-6"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5 sm:flex-wrap">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-brand-brass-light/15 text-brand-brass-light">
              <Calendar aria-hidden="true" className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="font-body text-[10px] font-semibold tracking-widest uppercase text-brand-brass-light">
                {t("home.nextMeeting.eyebrow")} · {MEETING_NAME}
              </p>
              <p
                suppressHydrationWarning
                className="font-display text-base font-bold text-white sm:text-lg"
              >
                {formatNyDateTime(next)} · {MEETING_LOCATION}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={buildIcsHref(next)}
              download={`sullivan-county-commission-${next.toISOString().slice(0, 10)}.ics`}
              className="inline-flex items-center gap-1.5 rounded-sm border border-white/20 bg-white/5 px-3 py-1.5 font-body text-xs font-medium text-brand-cream hover:bg-white/10 transition-colors"
            >
              <Download aria-hidden="true" className="size-3.5" />
              {t("home.nextMeeting.addToCalendar")}
            </a>
            <a
              href="https://www.youtube.com/@sullivancountycommission"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-sm border border-white/20 bg-white/5 px-3 py-1.5 font-body text-xs font-medium text-brand-cream hover:bg-white/10 transition-colors"
            >
              <Youtube aria-hidden="true" className="size-3.5" />
              {t("home.nextMeeting.watchLive")}
            </a>
            <Link
              to="/calendar"
              className="inline-flex items-center gap-1.5 rounded-sm bg-brand-brass-light/90 px-3 py-1.5 font-body text-xs font-semibold text-brand-navy hover:bg-brand-brass-light transition-colors"
            >
              {t("home.nextMeeting.seeFullSchedule")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
