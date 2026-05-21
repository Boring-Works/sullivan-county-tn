import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Cloud,
  CloudRain,
  CloudSnow,
  ExternalLink,
  Sun,
  Wind,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { CopperWeathervane } from "~/components/weather/CopperWeathervane";
import { getCurrentWeather, getRecentObservations } from "~/server/public-weather";
import type { PublicAlert } from "~/server/weather/refresh";
import { seo, seoLinks } from "~/utils/seo";

export const Route = createFileRoute("/weather")({
  loader: async () => {
    const [snapshot, observations] = await Promise.all([
      getCurrentWeather().catch(() => null),
      getRecentObservations().catch(
        () => [] as Array<{ observedAt: string; temperatureF: number | null }>,
      ),
    ]);
    return { snapshot, observations };
  },
  component: WeatherPage,
  head: () => ({
    meta: seo({
      title: "Sullivan County Weather — National Weather Service Forecast",
      description:
        "Current conditions, 7-day forecast, hourly outlook, and active severe-weather alerts for Sullivan County, Tennessee. Data sourced live from the National Weather Service.",
      url: "/weather",
    }),
    links: seoLinks("/weather"),
  }),
});

function WeatherPage() {
  const { snapshot, observations } = Route.useLoaderData();

  if (!snapshot) {
    return (
      <main id="main-content" className="pt-24 pb-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-3xl font-bold text-brand-navy">
            Weather data temporarily unavailable
          </h1>
          <p className="mt-3 font-body text-brand-slate-light">
            We couldn't reach the National Weather Service right now. Please try again in a few
            minutes, or visit{" "}
            <a
              href="https://forecast.weather.gov/MapClick.php?zoneid=TNZ017"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-copper underline hover:text-brand-copper-light"
            >
              forecast.weather.gov
            </a>{" "}
            directly.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-1.5 font-body text-sm text-brand-copper hover:text-brand-copper-light"
          >
            <ArrowLeft className="size-3.5" />
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="pt-24 pb-14 bg-brand-cream">
      {/* Header strip */}
      <div className="bg-brand-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 font-body text-sm text-brand-brass-light hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="size-3.5" />
            Back to home
          </Link>
          <p className="font-body text-xs tracking-widest uppercase text-brand-brass-light mb-2">
            Sullivan County, Tennessee
          </p>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">
            Current Conditions & Forecast
          </h1>
          <p className="mt-2 font-body text-sm text-white/70">
            Updated {formatRelative(snapshot.fetchedAt)} · Source: {snapshot.source}
          </p>
        </div>
      </div>

      {/* Severe alert banner — full-width copper bar if any Severe/Extreme alert is active */}
      {snapshot.hasSevereAlert && (
        <div className="bg-brand-copper text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-start gap-3">
            <AlertTriangle aria-hidden="true" className="size-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-display text-base font-bold">
                Active severe-weather alert for Sullivan County
              </p>
              <p className="font-body text-sm text-white/90 mt-0.5">
                Take shelter or follow the instructions below. In an emergency, call 911.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Active alerts */}
        {snapshot.alerts.length > 0 && (
          <section aria-labelledby="alerts-heading">
            <h2
              id="alerts-heading"
              className="font-display text-2xl font-bold text-brand-navy mb-4"
            >
              Active alerts ({snapshot.alerts.length})
            </h2>
            <div className="space-y-4">
              {snapshot.alerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </section>
        )}

        {/* Current conditions hero card */}
        <section
          aria-labelledby="current-heading"
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          <div className="rounded-sm border border-brand-surface bg-white p-6 md:col-span-2">
            <h2
              id="current-heading"
              className="font-body text-xs font-medium tracking-widest uppercase text-brand-stone mb-3"
            >
              Right Now
            </h2>
            <div className="flex items-center gap-6">
              <div className="text-brand-navy">
                {conditionsIcon(snapshot.current.conditions, 64)}
              </div>
              <div>
                <p className="font-display text-6xl font-bold text-brand-navy leading-none">
                  {snapshot.current.tempF}°F
                </p>
                <p className="mt-2 font-body text-lg text-brand-slate">
                  {snapshot.current.conditions}
                </p>
              </div>
            </div>
            <p className="mt-6 font-body text-sm text-brand-slate-light leading-relaxed">
              {snapshot.current.detailedForecast}
            </p>
          </div>

          {/* Side: copper weathervane + today high/low */}
          <div className="rounded-sm border border-brand-surface bg-white p-6 space-y-5">
            {/* Live weathervane — rotates with current wind direction */}
            <div className="pt-2 pb-12">
              <CopperWeathervane
                windDirection={parseWindDegrees(snapshot.current.windDirection)}
                windSpeed={parseInt(snapshot.current.windSpeed, 10) || undefined}
                size={180}
              />
            </div>

            <div className="border-t border-brand-surface pt-4">
              <p className="font-body text-xs font-medium tracking-widest uppercase text-brand-stone mb-1.5">
                Today
              </p>
              <p className="font-display text-base font-bold text-brand-navy">
                {snapshot.today.high !== undefined && <>High {snapshot.today.high}°</>}
                {snapshot.today.high !== undefined && snapshot.today.low !== undefined && (
                  <span className="text-brand-stone"> · </span>
                )}
                {snapshot.today.low !== undefined && <>Low {snapshot.today.low}°</>}
              </p>
              <p className="mt-1 font-body text-sm text-brand-slate-light">
                {snapshot.today.shortForecast}
              </p>
            </div>

            <div className="border-t border-brand-surface pt-4">
              <p className="font-body text-xs font-medium tracking-widest uppercase text-brand-stone mb-1.5">
                Wind
              </p>
              <div className="flex items-center gap-2 font-display text-base font-bold text-brand-navy">
                <Wind aria-hidden="true" className="size-4 text-brand-stone" />
                <span>
                  {snapshot.current.windSpeed} {snapshot.current.windDirection}
                </span>
              </div>
            </div>

            {snapshot.today.precipChance !== null && snapshot.today.precipChance > 0 && (
              <div className="border-t border-brand-surface pt-4">
                <p className="font-body text-xs font-medium tracking-widest uppercase text-brand-stone mb-1.5">
                  Precipitation
                </p>
                <p className="font-display text-base font-bold text-brand-navy">
                  {snapshot.today.precipChance}% chance today
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Hourly outlook */}
        {snapshot.hourly.length > 0 && (
          <section aria-labelledby="hourly-heading">
            <h2
              id="hourly-heading"
              className="font-display text-2xl font-bold text-brand-navy mb-4"
            >
              Next 12 hours
            </h2>
            <ScrollArea className="rounded-sm border border-brand-surface bg-white">
              <div className="flex divide-x divide-brand-surface">
                {snapshot.hourly.map((h) => (
                  <div
                    key={h.startTime}
                    className="flex shrink-0 flex-col items-center gap-2 px-4 py-4 min-w-[88px]"
                  >
                    <p className="font-body text-xs text-brand-stone">{formatHour(h.startTime)}</p>
                    <div className="text-brand-navy">{conditionsIcon(h.shortForecast, 24)}</div>
                    <p className="font-display text-lg font-bold text-brand-navy">{h.tempF}°</p>
                    {h.precipChance !== null && h.precipChance > 0 && (
                      <p className="font-body text-[10px] text-brand-slate-light">
                        {h.precipChance}%
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>
        )}

        {/* 7-day forecast */}
        <section aria-labelledby="forecast-heading">
          <h2
            id="forecast-heading"
            className="font-display text-2xl font-bold text-brand-navy mb-4"
          >
            7-day forecast
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {snapshot.next7.map((p) => (
              <Card key={p.startTime} className="rounded-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="font-display text-sm font-bold text-brand-navy">
                    {p.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="text-brand-stone">{conditionsIcon(p.shortForecast, 28)}</div>
                    <p className="font-display text-2xl font-bold text-brand-navy">{p.tempF}°</p>
                  </div>
                  <p className="font-body text-xs text-brand-slate-light leading-relaxed">
                    {p.shortForecast}
                  </p>
                  {p.precipChance !== null && p.precipChance > 0 && (
                    <p className="font-body text-[11px] text-brand-stone">
                      {p.precipChance}% precipitation
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 24-hour temperature trend (D1 archive) */}
        {observations.length > 1 && (
          <section aria-labelledby="trend-heading">
            <h2 id="trend-heading" className="font-display text-2xl font-bold text-brand-navy mb-4">
              Temperature trend
            </h2>
            <div className="rounded-sm border border-brand-surface bg-white p-6">
              <TempTrendChart observations={observations} />
              <p className="mt-3 font-body text-xs text-brand-stone">
                {observations.length} observations archived locally · Updates every 10 minutes
              </p>
            </div>
          </section>
        )}

        {/* Attribution + emergency reminder */}
        <section className="rounded-sm border border-brand-surface bg-brand-parchment p-6">
          <p className="font-body text-sm text-brand-slate leading-relaxed">
            Forecast data from the{" "}
            <a
              href="https://www.weather.gov/mrx/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-copper underline hover:text-brand-copper-light inline-flex items-center gap-1"
            >
              National Weather Service Morristown office
              <ExternalLink aria-hidden="true" className="size-3" />
            </a>
            . Cached at the edge and refreshed every 10 minutes.
          </p>
          <p className="mt-2 font-body text-sm text-brand-slate leading-relaxed">
            For emergencies, dial <span className="font-semibold">911</span>. For non-emergency
            severe-weather information, contact{" "}
            <Link
              to="/departments/$slug"
              params={{ slug: "emergency-management" }}
              className="text-brand-copper hover:text-brand-copper-light underline"
            >
              Sullivan County Emergency Management
            </Link>{" "}
            at (423) 323-6912.
          </p>
        </section>
      </div>
    </main>
  );
}

function AlertCard({ alert }: { alert: PublicAlert }) {
  const isSevere = alert.severity === "Severe" || alert.severity === "Extreme";
  return (
    <div
      role="alert"
      className={`rounded-sm border-l-4 p-5 ${
        isSevere ? "border-brand-copper bg-brand-copper/5" : "border-brand-brass bg-brand-brass/5"
      }`}
    >
      <div className="flex items-start gap-3">
        <AlertTriangle
          aria-hidden="true"
          className={`size-5 shrink-0 mt-0.5 ${isSevere ? "text-brand-copper" : "text-brand-brass"}`}
        />
        <div className="flex-1 min-w-0">
          <p className="font-body text-[10px] font-semibold tracking-widest uppercase text-brand-stone">
            {alert.severity} · {alert.event}
          </p>
          <h3 className="mt-1 font-display text-base font-bold text-brand-navy">
            {alert.headline}
          </h3>
          <p className="mt-3 font-body text-sm text-brand-slate leading-relaxed whitespace-pre-line">
            {alert.description}
          </p>
          {alert.instruction && (
            <div className="mt-3 rounded-sm bg-white/50 p-3">
              <p className="font-body text-xs font-semibold text-brand-navy mb-1">What to do</p>
              <p className="font-body text-sm text-brand-slate whitespace-pre-line">
                {alert.instruction}
              </p>
            </div>
          )}
          <p className="mt-3 font-body text-xs text-brand-stone">
            In effect through {formatDateTime(alert.expires)} · {alert.source}
          </p>
        </div>
      </div>
    </div>
  );
}

interface Observation {
  observedAt: string;
  temperatureF: number | null;
}

function TempTrendChart({ observations }: { observations: Observation[] }) {
  const data = observations.filter(
    (o): o is Observation & { temperatureF: number } => o.temperatureF !== null,
  );
  if (data.length < 2) return null;

  const temps = data.map((d) => d.temperatureF);
  const min = Math.min(...temps);
  const max = Math.max(...temps);
  const range = Math.max(max - min, 1);

  const W = 800;
  const H = 180;
  const padX = 30;
  const padY = 20;

  const xStep = (W - padX * 2) / (data.length - 1);
  const yScale = (t: number) => H - padY - ((t - min) / range) * (H - padY * 2);

  const points = data.map((d, i) => `${padX + i * xStep},${yScale(d.temperatureF)}`).join(" ");

  const areaPath = `M ${padX},${H - padY} L ${points
    .split(" ")
    .join(" L ")} L ${padX + (data.length - 1) * xStep},${H - padY} Z`;

  return (
    <div className="overflow-x-auto">
      <svg
        role="img"
        aria-label={`Temperature trend over the last ${data.length} observations, ranging from ${min}°F to ${max}°F`}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
      >
        <path d={areaPath} fill="rgba(164, 77, 42, 0.08)" />
        <polyline
          points={points}
          fill="none"
          stroke="var(--color-brand-copper)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Min/max labels */}
        <text
          x={padX}
          y={padY}
          fontSize="11"
          fill="var(--color-brand-stone)"
          fontFamily="monospace"
        >
          {max}°
        </text>
        <text
          x={padX}
          y={H - padY + 14}
          fontSize="11"
          fill="var(--color-brand-stone)"
          fontFamily="monospace"
        >
          {min}°
        </text>
      </svg>
    </div>
  );
}

function conditionsIcon(conditions: string, size: number) {
  const c = conditions.toLowerCase();
  if (c.includes("snow") || c.includes("sleet") || c.includes("ice")) {
    return <CloudSnow style={{ width: size, height: size }} aria-hidden="true" />;
  }
  if (c.includes("rain") || c.includes("shower") || c.includes("storm") || c.includes("thunder")) {
    return <CloudRain style={{ width: size, height: size }} aria-hidden="true" />;
  }
  if (c.includes("cloud") || c.includes("overcast") || c.includes("fog") || c.includes("haze")) {
    return <Cloud style={{ width: size, height: size }} aria-hidden="true" />;
  }
  return <Sun style={{ width: size, height: size }} aria-hidden="true" />;
}

function formatRelative(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const min = Math.round(ms / 60000);
  if (min < 1) return "just now";
  if (min === 1) return "1 minute ago";
  if (min < 60) return `${min} minutes ago`;
  const hr = Math.round(min / 60);
  if (hr === 1) return "1 hour ago";
  return `${hr} hours ago`;
}

/** Convert NWS wind direction string ("NW", "WSW") to degrees (0=N, 90=E). */
function parseWindDegrees(dir: string): number {
  const map: Record<string, number> = {
    N: 0,
    NNE: 22.5,
    NE: 45,
    ENE: 67.5,
    E: 90,
    ESE: 112.5,
    SE: 135,
    SSE: 157.5,
    S: 180,
    SSW: 202.5,
    SW: 225,
    WSW: 247.5,
    W: 270,
    WNW: 292.5,
    NW: 315,
    NNW: 337.5,
  };
  return map[dir.toUpperCase()] ?? 0;
}

function formatHour(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    timeZone: "America/New_York",
  }).format(new Date(iso));
}

function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
  }).format(new Date(iso));
}
