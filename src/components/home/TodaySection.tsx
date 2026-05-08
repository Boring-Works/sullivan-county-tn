import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Download, Phone, Shield, Siren, Youtube } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NewsSection } from "~/components/home/NewsSection";
import { QuickServices } from "~/components/home/QuickServices";
import { TelLink } from "~/components/shared/TelLink";
import {
  COMMISSION_REGULAR_SESSION_NAME,
  COMMISSION_REGULAR_SESSION_RULE,
  COURTHOUSE,
} from "~/data/meetings";
import { useOpenStatus } from "~/hooks/useOpenStatus";
import { buildIcs, formatNyDateTime, nextOccurrence } from "~/lib/recurrence";

const COUNTY_OFFICE_HOURS = "Monday-Friday, 8am-4:30pm";

function buildIcsHref(start: Date): string {
  const ics = buildIcs({
    uid: `commission-${start.toISOString()}@sullivancountytn.gov`,
    title: COMMISSION_REGULAR_SESSION_NAME,
    description: "Sullivan County Commission Regular Session. Streamed live on YouTube.",
    location: COURTHOUSE,
    start,
    durationMinutes: 120,
  });
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}

/**
 * TodaySection — Phase 3 of the homepage redesign.
 *
 * One coherent below-fold section that consolidates everything we removed
 * from above-the-fold (Open-Now status, Next Meeting, Weather, the
 * EmergencyModule strip, QuickServices, NewsSection). Per the blueprint,
 * citizens used to find utility above the fold; now they find it within
 * one scroll, presented as ONE section that doesn't shout.
 *
 * Structure:
 *   - Eyebrow + h2 "Today in Sullivan County"
 *   - Utility row: status pill + next-meeting prose + add-to-calendar +
 *     watch-live + see-full-schedule + weather pill
 *   - QuickServices (embedded variant; h3 heading)
 *   - NewsSection (embedded variant; h3 heading)
 *   - Quiet emergency contact line: 911 · Sheriff · EMA · Preparedness
 *
 * Replaces, on the homepage:
 *   - <EmergencyModule /> (becomes the quiet bottom strip here)
 *   - <NextMeetingCard /> (folds into the utility row)
 *   - standalone <QuickServices /> (now mounted inside this)
 *   - standalone <NewsSection /> (now mounted inside this)
 */
export function TodaySection() {
  const { t } = useTranslation();
  const status = useOpenStatus(COUNTY_OFFICE_HOURS);
  const [next] = useState<Date>(() => nextOccurrence(COMMISSION_REGULAR_SESSION_RULE));

  return (
    <section aria-labelledby="today-heading" className="relative bg-brand-cream">
      {/* Header strip + utility row — civic-restraint, brand-cream background.
          The h2 stays small per blueprint S2.3 (utility, not marketing). */}
      <div className="border-b border-brand-surface bg-brand-cream pt-16 pb-8 sm:pt-20 sm:pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-brass">
              {t("todaySection.eyebrow")}
            </span>
            <h2
              id="today-heading"
              className="mt-3 font-display text-3xl font-bold text-brand-navy text-balance sm:text-4xl"
            >
              {t("todaySection.heading")}
            </h2>
          </div>

          {/* Utility row — status, next meeting + actions, weather. Stacks
              on mobile, fluid wrap on desktop. */}
          <div className="mt-7">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
              {/* Status + next-meeting prose */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <div className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className={`block size-2.5 shrink-0 rounded-full ${
                      status.isOpen === true
                        ? "bg-brand-sage shadow-[0_0_8px_rgba(61,107,86,0.5)]"
                        : status.isOpen === false
                          ? "bg-brand-brass"
                          : "bg-brand-warm-gray/40"
                    }`}
                  />
                  <span
                    suppressHydrationWarning
                    className="font-display text-base font-bold text-brand-navy sm:text-lg"
                  >
                    {t("todaySection.officesPrefix")} {status.label}.
                  </span>
                </div>
                <span className="hidden sm:inline text-brand-warm-gray/40">·</span>
                <span suppressHydrationWarning className="font-body text-sm text-brand-slate">
                  <span className="font-semibold text-brand-navy">
                    {t("todaySection.meetingPrefix")}
                  </span>{" "}
                  {formatNyDateTime(next)}
                </span>
              </div>

              {/* Action buttons + weather pill */}
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={buildIcsHref(next)}
                  download={`sullivan-county-commission-${next.toISOString().slice(0, 10)}.ics`}
                  className="inline-flex items-center gap-1.5 rounded-sm border border-brand-surface bg-white min-h-[44px] sm:min-h-0 px-3 py-2.5 sm:py-1.5 font-body text-xs font-medium text-brand-slate transition-colors hover:border-brand-copper hover:text-brand-copper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-copper"
                >
                  <Download aria-hidden="true" className="size-3.5" />
                  {t("todaySection.addToCalendar")}
                </a>
                <a
                  href="https://www.youtube.com/@sullivancountycommission"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-sm border border-brand-surface bg-white min-h-[44px] sm:min-h-0 px-3 py-2.5 sm:py-1.5 font-body text-xs font-medium text-brand-slate transition-colors hover:border-brand-copper hover:text-brand-copper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-copper"
                >
                  <Youtube aria-hidden="true" className="size-3.5" />
                  {t("todaySection.watchLive")}
                </a>
                <Link
                  to="/calendar"
                  className="inline-flex items-center gap-1.5 rounded-sm bg-brand-navy min-h-[44px] sm:min-h-0 px-3 py-2.5 sm:py-1.5 font-body text-xs font-semibold text-white transition-colors hover:bg-brand-navy-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-copper"
                >
                  <Calendar aria-hidden="true" className="size-3.5" />
                  {t("todaySection.fullSchedule")}
                </Link>
                {/* WeatherBadge omitted here — already shown in the hero almanac
                    strip (HeroBanner). Repeating it on a cream background
                    breaks WCAG AA contrast since the badge is styled for
                    dark/photo backgrounds. */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Services — embedded, h3 heading */}
      <div className="bg-brand-cream pt-10 pb-8 sm:pt-12 sm:pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <QuickServices headingLevel="h3" variant="embedded" />
        </div>
      </div>

      {/* Latest News — embedded, h3 heading, white inner panel for contrast */}
      <div className="bg-white border-t border-brand-surface pt-12 pb-12 sm:pt-16 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <NewsSection headingLevel="h3" variant="embedded" />
        </div>
      </div>

      {/* Quiet emergency contact line — replaces the always-loud
          EmergencyModule strip. Plain navy footer, no copper-pulse. */}
      <div className="bg-brand-navy-deep text-brand-cream">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-6">
            <div className="flex items-center gap-2.5 lg:shrink-0">
              <Siren aria-hidden="true" className="size-4 text-brand-copper-light" />
              <span className="font-display text-sm font-bold text-white">
                {t("todaySection.emergencyHeading")}
              </span>
            </div>

            <ul className="flex flex-1 flex-wrap items-center gap-x-5 gap-y-2 lg:gap-x-7">
              <li>
                <TelLink
                  phone="911"
                  className="inline-flex items-center gap-1.5 font-body text-sm text-white hover:text-brand-copper-light transition-colors"
                  ariaLabel="Call 911 for life-threatening emergencies"
                >
                  <span className="font-display text-base font-bold">911</span>
                  <span className="text-brand-cream/60 text-xs">
                    {t("todaySection.lifeThreatening")}
                  </span>
                </TelLink>
              </li>
              <li>
                <TelLink
                  phone="(423) 279-7500"
                  className="inline-flex items-center gap-1.5 font-body text-sm text-brand-cream/85 hover:text-white transition-colors"
                  ariaLabel="Sheriff non-emergency: (423) 279-7500"
                >
                  <Shield aria-hidden="true" className="size-3.5 text-brand-copper-light" />
                  <span>{t("todaySection.sheriff")}</span>
                  <span className="font-mono text-xs text-brand-cream/70">(423) 279-7500</span>
                </TelLink>
              </li>
              <li>
                <TelLink
                  phone="(423) 323-6912"
                  className="inline-flex items-center gap-1.5 font-body text-sm text-brand-cream/85 hover:text-white transition-colors"
                  ariaLabel="Emergency Management: (423) 323-6912"
                >
                  <Phone aria-hidden="true" className="size-3.5 text-brand-copper-light" />
                  <span>{t("todaySection.ema")}</span>
                  <span className="font-mono text-xs text-brand-cream/70">(423) 323-6912</span>
                </TelLink>
              </li>
            </ul>

            <Link
              to="/departments/$slug"
              params={{ slug: "emergency-management" }}
              className="inline-flex shrink-0 items-center gap-1.5 self-start font-body text-xs font-medium text-brand-copper-light hover:text-white transition-colors lg:self-center"
            >
              {t("todaySection.preparednessLink")}
              <ArrowRight aria-hidden="true" className="size-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
