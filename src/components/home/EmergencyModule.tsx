import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone, Shield, Siren } from "lucide-react";
import { useTranslation } from "react-i18next";
import { TelLink } from "~/components/shared/TelLink";

export function EmergencyModule() {
  const { t } = useTranslation();

  // Two-tier hierarchy: 911 is the primary tile (red glow, larger type, pulsing
  // halo); Sheriff and Emergency Management are secondary, equal-weight.
  const primary = {
    icon: Siren,
    label: t("home.emergency.lifeThreatening"),
    phone: "911",
    sublabel: t("home.emergency.callNow"),
  };

  const secondary = [
    {
      icon: Shield,
      label: t("home.emergency.sheriff"),
      phone: "(423) 279-7500",
      sublabel: t("home.emergency.sheriffSub"),
    },
    {
      icon: Phone,
      label: t("home.emergency.emergencyMgmt"),
      phone: "(423) 323-6912",
      sublabel: t("home.emergency.emergencyMgmtSub"),
    },
  ];

  return (
    <section
      aria-labelledby="emergency-heading"
      className="relative bg-brand-navy-deep text-brand-cream"
    >
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
          <div className="lg:w-56 lg:shrink-0">
            <span className="inline-flex items-center gap-2 font-body text-[10px] font-semibold tracking-widest uppercase text-brand-copper-light">
              <span className="block size-1.5 rounded-full bg-brand-copper-light" />
              {t("home.emergency.eyebrow")}
            </span>
            <h2
              id="emergency-heading"
              className="mt-2 font-display text-xl font-bold text-white sm:text-2xl"
            >
              {t("home.emergency.heading")}
            </h2>
            <p className="mt-1 font-body text-sm text-brand-cream/70">{t("home.emergency.body")}</p>
          </div>

          <ul className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-4 sm:gap-3">
            {/* Primary 911 tile — spans 2 of 4 cols, elevated visual weight. */}
            <li className="sm:col-span-2">
              <TelLink
                phone={primary.phone}
                className="group relative flex h-full items-center gap-4 rounded-sm border border-brand-copper-light/40 bg-brand-copper/15 px-4 py-3.5 ring-1 ring-brand-copper-light/20 transition-all hover:border-brand-copper-light hover:bg-brand-copper/25 hover:shadow-[0_0_24px_rgba(207,110,62,0.35)]"
                ariaLabel={`${primary.label} — ${primary.phone}`}
              >
                <span className="relative flex shrink-0 items-center justify-center">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -m-1 rounded-full bg-brand-copper-light/30 motion-safe:animate-emergency-pulse"
                  />
                  <primary.icon
                    aria-hidden="true"
                    className="relative size-7 text-brand-copper-light"
                  />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-body text-[10px] font-semibold tracking-widest uppercase text-brand-copper-light">
                    {primary.label}
                  </span>
                  <span className="block font-display text-2xl font-bold text-white leading-none mt-0.5 sm:text-3xl">
                    {primary.phone}
                  </span>
                  <span className="block font-body text-[11px] text-brand-cream/70 mt-1">
                    {primary.sublabel}
                  </span>
                </span>
              </TelLink>
            </li>

            {/* Secondary tiles — 1 col each, restrained. */}
            {secondary.map((c) => {
              const Icon = c.icon;
              return (
                <li key={c.label}>
                  <TelLink
                    phone={c.phone}
                    className="group flex h-full items-center gap-3 rounded-sm border border-white/10 bg-white/5 px-4 py-3 transition-colors hover:border-brand-copper-light/60 hover:bg-white/10"
                    ariaLabel={`${c.label} — ${c.phone}`}
                  >
                    <Icon aria-hidden="true" className="size-5 shrink-0 text-brand-copper-light" />
                    <span className="flex-1 min-w-0">
                      <span className="block font-body text-[10px] font-medium tracking-wider uppercase text-brand-cream/60">
                        {c.label}
                      </span>
                      <span className="block font-display text-base font-bold text-white sm:text-lg">
                        {c.phone}
                      </span>
                      <span className="block font-body text-[11px] text-brand-cream/60">
                        {c.sublabel}
                      </span>
                    </span>
                  </TelLink>
                </li>
              );
            })}
          </ul>

          <Link
            to="/departments/$slug"
            params={{ slug: "emergency-management" }}
            className="inline-flex shrink-0 items-center gap-2 self-start font-body text-sm font-semibold text-brand-copper-light transition-colors hover:text-white lg:self-center"
          >
            {t("home.emergency.moreResources")}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
