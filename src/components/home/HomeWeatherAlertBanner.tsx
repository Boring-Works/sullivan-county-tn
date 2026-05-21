import { Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight } from "lucide-react";
import type { PublicAlert, PublicWeatherSnapshot } from "~/server/weather/refresh";

function pickPriorityAlert(alerts: PublicAlert[]): PublicAlert | null {
  const rank = { Extreme: 4, Severe: 3, Moderate: 2, Minor: 1, Unknown: 0 } as const;
  return [...alerts].sort((a, b) => rank[b.severity] - rank[a.severity])[0] ?? null;
}

export function HomeWeatherAlertBanner({
  snapshot,
}: {
  snapshot: PublicWeatherSnapshot | null | undefined;
}) {
  const alert = snapshot ? pickPriorityAlert(snapshot.alerts) : null;
  if (!alert) return null;

  const isSevere = alert.severity === "Severe" || alert.severity === "Extreme";

  return (
    <section
      aria-label="Active National Weather Service alert"
      role={isSevere ? "alert" : "status"}
      aria-live={isSevere ? "assertive" : "polite"}
      className={isSevere ? "bg-brand-copper text-white" : "bg-brand-brass text-white"}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-start gap-3">
          <AlertTriangle aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          <div>
            <p className="font-display text-base font-bold leading-tight">
              {alert.event} active for Sullivan County
            </p>
            <p className="mt-0.5 line-clamp-2 font-body text-sm text-white/88">
              {alert.headline || "Check official National Weather Service details before travel."}
            </p>
          </div>
        </div>
        <Link
          to="/weather"
          className="inline-flex min-h-[40px] shrink-0 items-center justify-center gap-1.5 rounded-sm bg-white/14 px-3 py-2 font-body text-sm font-bold text-white transition-colors hover:bg-white/22 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          View alert details
          <ArrowRight aria-hidden="true" className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}
