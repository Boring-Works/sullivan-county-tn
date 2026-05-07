import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone, Shield, Siren } from "lucide-react";
import { useTranslation } from "react-i18next";
import { TelLink } from "~/components/shared/TelLink";

/**
 * Restrained emergency strip.
 *
 * Visitors come for daily tasks (taxes, permits, hours), not emergencies.
 * Citizens in real emergencies dial 911 directly — they don't navigate a county
 * website. So the homepage just needs to:
 *   1. confirm 911 is the right number for life-threatening calls,
 *   2. surface the two non-emergency county lines (Sheriff, EMA),
 *   3. point to a real emergency-management page for prep + alerts.
 *
 * Single-row navy strip on desktop; stacks on mobile. No copper-tile, no pulse,
 * no shouting. The dramatic treatment is reserved for actual severe-weather
 * alerts via the WeatherBadge / AnnouncementBanner pathway.
 */
export function EmergencyModule() {
  const { t } = useTranslation();

  return (
    <section
      aria-labelledby="emergency-heading"
      className="relative bg-brand-navy-deep text-brand-cream"
    >
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-6">
          <div className="flex items-center gap-3 lg:shrink-0">
            <Siren aria-hidden="true" className="size-5 text-brand-copper-light" />
            <h2 id="emergency-heading" className="font-display text-base font-bold text-white">
              {t("home.emergency.heading")}
            </h2>
          </div>

          <ul className="flex flex-1 flex-wrap items-center gap-x-5 gap-y-2 lg:gap-x-7">
            <li>
              <TelLink
                phone="911"
                className="inline-flex items-center gap-2 font-body text-sm text-white hover:text-brand-copper-light transition-colors"
                ariaLabel="Call 911 for life-threatening emergencies"
              >
                <span className="font-display text-base font-bold">911</span>
                <span className="text-brand-cream/60 text-xs">
                  {t("home.emergency.lifeThreatening")}
                </span>
              </TelLink>
            </li>
            <li>
              <TelLink
                phone="(423) 279-7500"
                className="inline-flex items-center gap-2 font-body text-sm text-brand-cream/85 hover:text-white transition-colors"
                ariaLabel="Sheriff non-emergency: (423) 279-7500"
              >
                <Shield aria-hidden="true" className="size-3.5 text-brand-copper-light" />
                <span>Sheriff</span>
                <span className="font-mono text-xs text-brand-cream/70">(423) 279-7500</span>
              </TelLink>
            </li>
            <li>
              <TelLink
                phone="(423) 323-6912"
                className="inline-flex items-center gap-2 font-body text-sm text-brand-cream/85 hover:text-white transition-colors"
                ariaLabel="Emergency Management: (423) 323-6912"
              >
                <Phone aria-hidden="true" className="size-3.5 text-brand-copper-light" />
                <span>Emergency Mgmt</span>
                <span className="font-mono text-xs text-brand-cream/70">(423) 323-6912</span>
              </TelLink>
            </li>
          </ul>

          <Link
            to="/departments/$slug"
            params={{ slug: "emergency-management" }}
            className="inline-flex shrink-0 items-center gap-1.5 self-start font-body text-xs font-medium text-brand-copper-light hover:text-white transition-colors lg:self-center"
          >
            Preparedness resources
            <ArrowRight aria-hidden="true" className="size-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
