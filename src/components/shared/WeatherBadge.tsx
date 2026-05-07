import { Link } from "@tanstack/react-router";
import { AlertTriangle, Cloud, CloudRain, CloudSnow, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "~/components/ui/skeleton";
import { getCurrentWeather } from "~/server/public-weather";
import type { PublicWeatherSnapshot } from "~/server/weather/refresh";

/**
 * Compact homepage weather indicator.
 *
 * Render strategy:
 *   - Initial render is a skeleton (so SSR HTML is layout-stable; no hydration
 *     warning).
 *   - Client useEffect calls the public server fn (which reads from KV).
 *   - Re-fetches every 5 minutes while the page is open.
 *   - When a Severe/Extreme NWS alert is active, the badge turns copper with
 *     a warning icon — citizens see weather-emergency context immediately.
 */
export function WeatherBadge({ className }: { className?: string }) {
  const [snapshot, setSnapshot] = useState<PublicWeatherSnapshot | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await getCurrentWeather();
        if (!cancelled) {
          setSnapshot(data);
          setError(false);
        }
      } catch {
        if (!cancelled) setError(true);
      }
    }

    load();
    const intervalId = window.setInterval(load, 5 * 60 * 1000);
    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, []);

  // Don't render anything if we have no data and an error — avoids broken UI.
  if (!snapshot && error) return null;

  const Icon = pickIcon(snapshot?.current.conditions);
  const isSevere = snapshot?.hasSevereAlert === true;

  return (
    <Link
      to="/weather"
      className={[
        "group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-body text-xs font-medium backdrop-blur-sm transition-all min-h-[36px]",
        isSevere
          ? "border-brand-copper-light bg-brand-copper/30 text-white hover:bg-brand-copper/40 motion-safe:animate-pulse"
          : "border-white/20 bg-white/10 text-white/90 hover:border-brand-brass-light/60 hover:bg-white/15 hover:text-brand-brass-light",
        className ?? "",
      ].join(" ")}
      aria-label={
        snapshot
          ? `Current Sullivan County weather: ${snapshot.current.tempF}°F, ${snapshot.current.conditions}${
              isSevere ? `, severe weather alert active` : ""
            }. View full forecast.`
          : "Loading current weather"
      }
    >
      {isSevere ? (
        <AlertTriangle aria-hidden="true" className="size-4 shrink-0" />
      ) : (
        <Icon aria-hidden="true" className="size-4 shrink-0" />
      )}
      {snapshot ? (
        <span suppressHydrationWarning>
          {snapshot.current.tempF}°F · {snapshot.current.conditions}
        </span>
      ) : (
        <Skeleton className="h-3 w-32 bg-white/20" />
      )}
      {/* Live pulse dot — subtle "this is live data" cue. */}
      <span
        aria-hidden="true"
        className={[
          "block size-1.5 rounded-full",
          isSevere
            ? "bg-white shadow-[0_0_6px_rgba(255,255,255,0.7)]"
            : "bg-emerald-400 shadow-[0_0_6px_rgba(74,222,128,0.6)] motion-safe:animate-pulse",
        ].join(" ")}
      />
    </Link>
  );
}

function pickIcon(conditions: string | undefined) {
  if (!conditions) return Cloud;
  const c = conditions.toLowerCase();
  if (c.includes("snow") || c.includes("sleet") || c.includes("ice")) return CloudSnow;
  if (c.includes("rain") || c.includes("shower") || c.includes("storm") || c.includes("thunder")) {
    return CloudRain;
  }
  if (c.includes("cloud") || c.includes("overcast") || c.includes("fog") || c.includes("haze")) {
    return Cloud;
  }
  return Sun;
}
