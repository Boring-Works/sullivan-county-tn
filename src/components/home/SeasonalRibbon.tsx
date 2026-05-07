import { Link } from "@tanstack/react-router";
import { AlertCircle, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

/**
 * Returns true when the current Tennessee-time date sits inside the
 * property-tax season window (October 1 → March 1). Property tax bills are
 * mailed in October; the deadline without penalty is February 28.
 *
 * Pure, deterministic, unit-tested. SSR returns the same value as the client
 * for the same wall-clock month, so this is safe to render server-side.
 */
export function isPropertyTaxSeason(now: Date = new Date()): boolean {
  // Use America/New_York wall time, not UTC, so the window doesn't open a day
  // late in the eastern US (Tennessee is on Central but the practical
  // government-services context is America/New_York for ICS, etc.).
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    month: "numeric",
  });
  const month = Number(fmt.format(now)); // 1-12
  // October (10), November (11), December (12), January (1), February (2)
  return month >= 10 || month <= 2;
}

export function SeasonalRibbon() {
  const { t } = useTranslation();
  if (!isPropertyTaxSeason()) return null;

  return (
    <aside
      aria-label={t("home.seasonal.ribbonLabel")}
      className="border-y border-brand-copper/30 bg-brand-copper/5"
    >
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/property-taxes"
          className="group flex items-center justify-center gap-3 sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <AlertCircle aria-hidden="true" className="size-5 shrink-0 text-brand-copper" />
            <p className="font-body text-sm text-brand-slate sm:text-base">
              <strong className="font-semibold text-brand-navy">
                {t("home.seasonal.taxesDue")}
              </strong>{" "}
              <span className="text-brand-slate-light">{t("home.seasonal.taxesHint")}</span>
            </p>
          </div>
          <span className="hidden items-center gap-1 font-body text-sm font-semibold text-brand-copper transition-colors group-hover:text-brand-copper-light sm:inline-flex">
            {t("home.seasonal.findBill")}
            <ArrowRight aria-hidden="true" className="size-4" />
          </span>
        </Link>
      </div>
    </aside>
  );
}
