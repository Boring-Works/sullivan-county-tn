import { Link } from "@tanstack/react-router";
import { AlertTriangle, Clock3, CloudSun, Megaphone } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useOpenStatus } from "~/hooks/useOpenStatus";

const COUNTY_OFFICE_HOURS = "Monday-Friday, 8am-4:30pm";

export function CivicStatusRibbon() {
  const { t } = useTranslation();
  const status = useOpenStatus(COUNTY_OFFICE_HOURS);
  const officeTone = useMemo(
    () => (status.isOpen ? "text-emerald-300" : "text-brand-brass-light"),
    [status.isOpen],
  );

  return (
    <section className="border-y border-brand-brass/20 bg-brand-navy-deep text-brand-cream">
      <div className="mx-auto grid max-w-7xl gap-2 px-4 py-3 text-xs sm:grid-cols-3 sm:gap-3 sm:px-6 lg:px-8">
        <Link
          to="/weather"
          className="group inline-flex min-h-[40px] items-center gap-2 rounded-sm border border-white/10 px-2.5 hover:bg-white/5 hover:text-white"
        >
          <CloudSun className="size-3.5 text-brand-brass-light" />
          <span>{t("nav.weatherStatus", "Weather & alerts")}</span>
        </Link>
        <span className="inline-flex min-h-[40px] items-center gap-2 rounded-sm border border-white/10 px-2.5">
          <Clock3 className={`size-3.5 shrink-0 ${officeTone}`} />
          <span className="truncate">
            {t("nav.officeStatus", "County offices")}: {status.label}
          </span>
        </span>
        <div className="flex items-center gap-2">
          <Link
            to="/news"
            className="inline-flex min-h-[40px] items-center gap-2 rounded-sm border border-white/10 px-2.5 hover:bg-white/5 hover:text-white"
          >
            <Megaphone className="size-3.5 text-brand-copper-light" />
            <span>{t("nav.publicUpdates", "Public updates")}</span>
          </Link>
          <Link
            to="/departments/$slug"
            params={{ slug: "emergency-management" }}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-sm border border-brand-copper/35 bg-brand-copper/10 px-2.5 hover:bg-brand-copper/20 hover:text-white"
          >
            <AlertTriangle className="size-3.5 text-brand-copper-light" />
            <span>{t("nav.emergencyInfo", "Emergency info")}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
