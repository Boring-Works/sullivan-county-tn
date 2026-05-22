import { Link } from "@tanstack/react-router";
import { ArrowRight, CloudSun, Phone, Shield, Siren } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NewsSection } from "~/components/home/NewsSection";
import { QuickServices } from "~/components/home/QuickServices";
import { TelLink } from "~/components/shared/TelLink";
import { officialRoadLinks } from "~/data/official-links";

/**
 * TodaySection — Phase 3 of the homepage redesign.
 *
 * One coherent below-fold section for the next layer after the hero:
 * popular services, public updates, and emergency contacts. Live status,
 * weather, and next meeting stay in the hero's county-status panel so the
 * homepage does not repeat the same civic status surface.
 *
 * Structure:
 *   - Eyebrow + h2 "Services and updates residents use most"
 *   - QuickServices (embedded variant; h3 heading)
 *   - NewsSection (embedded variant; h3 heading)
 *   - Quiet emergency contact line: 911 · Sheriff · EMA · Preparedness
 */
export function TodaySection() {
  const { t } = useTranslation();

  return (
    <>
      <section aria-labelledby="today-heading" className="relative bg-brand-cream">
        {/* Civic-restraint header: utility, not marketing. */}
        <div className="border-b border-brand-surface bg-brand-cream pt-9 pb-6 sm:pt-14 sm:pb-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex max-w-5xl flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
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
                <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-brand-slate-light sm:text-lg">
                  {t("todaySection.intro")}
                </p>
              </div>
              <Link
                to="/forms"
                className="inline-flex min-h-[44px] items-center gap-2 self-start rounded-sm border border-brand-copper/30 bg-white px-4 py-2.5 font-body text-sm font-semibold text-brand-copper transition-colors hover:border-brand-copper hover:bg-brand-parchment lg:self-auto"
              >
                Start a form or report a concern
                <ArrowRight aria-hidden="true" className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Services — embedded, h3 heading */}
        <div className="bg-brand-cream pt-6 pb-8 sm:pt-10 sm:pb-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <QuickServices headingLevel="h3" variant="embedded" />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="updates-heading"
        className="border-y border-brand-surface bg-white py-8 sm:py-12"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <span className="inline-block font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-brass">
                Public notices
              </span>
              <h2
                id="updates-heading"
                className="mt-3 font-display text-2xl font-bold text-brand-navy text-balance sm:text-3xl"
              >
                Public notices and county updates
              </h2>
              <p className="mt-2 font-body text-sm leading-relaxed text-brand-slate-light sm:text-base">
                Closures, hearings, road work, meeting changes, and other notices residents may need
                before they visit an office or make plans.
              </p>
            </div>
            <Link
              to="/news"
              className="inline-flex min-h-[44px] items-center gap-2 self-start font-body text-sm font-semibold text-brand-copper transition-colors hover:text-brand-copper-light sm:self-auto"
            >
              View all news
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </Link>
          </div>
          <NewsSection
            headingLevel="h3"
            variant="embedded"
            maxItems={2}
            compact
            showHeader={false}
          />
        </div>
      </section>

      {/* Quiet emergency contact line — replaces the always-loud
          EmergencyModule strip. Plain navy footer, no copper-pulse. */}
      <div className="bg-brand-navy-deep text-brand-cream">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
          <div className="grid gap-3 sm:grid-cols-[auto_1fr] sm:items-center lg:flex lg:gap-6">
            <div className="flex items-center gap-2.5 lg:shrink-0">
              <Siren aria-hidden="true" className="size-4 text-brand-copper-light" />
              <span className="font-display text-sm font-bold text-white">
                {t("todaySection.emergencyHeading")}
              </span>
            </div>

            <ul className="grid grid-cols-2 gap-2 sm:flex sm:flex-1 sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2 lg:gap-x-7">
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
              <li>
                <a
                  href={officialRoadLinks.smartway}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-1.5 font-body text-sm text-brand-cream/85 transition-colors hover:text-white"
                >
                  <CloudSun aria-hidden="true" className="size-3.5 text-brand-copper-light" />
                  <span>Road conditions</span>
                </a>
              </li>
            </ul>

            <div className="hidden flex-wrap gap-x-4 gap-y-2 sm:col-span-2 sm:flex lg:shrink-0">
              <Link
                to="/departments/$slug"
                params={{ slug: "sheriff" }}
                className="inline-flex min-h-[44px] items-center gap-1.5 font-body text-xs font-medium text-brand-cream/85 transition-colors hover:text-white"
              >
                Sheriff services
                <ArrowRight aria-hidden="true" className="size-3" />
              </Link>
              <Link
                to="/departments/$slug"
                params={{ slug: "emergency-management" }}
                className="inline-flex min-h-[44px] items-center gap-1.5 font-body text-xs font-medium text-brand-cream/85 transition-colors hover:text-white"
              >
                {t("todaySection.preparednessLink")}
                <ArrowRight aria-hidden="true" className="size-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
