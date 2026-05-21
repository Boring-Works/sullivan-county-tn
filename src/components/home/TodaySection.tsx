import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone, Shield, Siren } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NewsSection } from "~/components/home/NewsSection";
import { QuickServices } from "~/components/home/QuickServices";
import { TelLink } from "~/components/shared/TelLink";

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
    <section aria-labelledby="today-heading" className="relative bg-brand-cream">
      {/* Civic-restraint header: utility, not marketing. */}
      <div className="border-b border-brand-surface bg-brand-cream pt-14 pb-8 sm:pt-16 sm:pb-10">
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
            <p className="mt-3 font-body text-base leading-relaxed text-brand-slate-light sm:text-lg">
              {t("todaySection.intro")}
            </p>
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
