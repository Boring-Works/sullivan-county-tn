import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Cloud,
  CloudRain,
  CloudSnow,
  ExternalLink,
  Gauge,
  MapPin,
  Route as RouteIcon,
  Sun,
  Waves,
  Wind,
} from "lucide-react";
import type { ReactNode } from "react";
import { TelLink } from "~/components/shared/TelLink";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { CopperWeathervane } from "~/components/weather/CopperWeathervane";
import { officialLakeLinks, officialRoadLinks } from "~/data/official-links";
import {
  formatRiverTrend,
  formatRiverValue,
  type RiverGauge,
  type RiverTrend,
} from "~/lib/river-utils";
import { deriveWeatherSituation, type WeatherSituation } from "~/lib/weather-situation";
import { formatWind, parseWindDegrees, parseWindSpeed } from "~/lib/weather-utils";
import { getCurrentWeather, getRecentObservations } from "~/server/public-weather";
import { getRiverConditions } from "~/server/river-conditions";
import type { PublicAlert } from "~/server/weather/refresh";
import { seo, seoLinks } from "~/utils/seo";

export const Route = createFileRoute("/weather")({
  loader: async () => {
    const [snapshot, observations, riverConditions] = await Promise.all([
      getCurrentWeather().catch(() => null),
      getRecentObservations().catch(
        () => [] as Array<{ observedAt: string; temperatureF: number | null }>,
      ),
      getRiverConditions().catch(() => [] as RiverGauge[]),
    ]);
    return { snapshot, observations, riverConditions };
  },
  component: WeatherPage,
  head: () => ({
    meta: seo({
      title: "Sullivan County Weather & River Conditions",
      description:
        "Current conditions, 7-day forecast, hourly outlook, active severe-weather alerts, and live USGS river gauge readings for Sullivan County, Tennessee.",
      url: "/weather",
    }),
    links: seoLinks("/weather"),
  }),
});

function WeatherPage() {
  const { snapshot, observations, riverConditions } = Route.useLoaderData();

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

  const windMph = parseWindSpeed(snapshot.current.windSpeed);
  const windDirectionDegrees = parseWindDegrees(snapshot.current.windDirection);
  const hasAlerts = snapshot.alerts.length > 0;
  const situation = deriveWeatherSituation(snapshot, riverConditions);

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
            Weather & River Conditions
          </h1>
          <p className="mt-2 font-body text-sm text-white/70" suppressHydrationWarning>
            Updated {formatRelative(snapshot.fetchedAt)} · NWS forecast plus USGS stream gauges
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
        <SituationSummarySection situation={situation} />

        {/* Active alerts */}
        {hasAlerts && <ActiveAlertsSection alerts={snapshot.alerts} />}

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
                <p className="mt-1 inline-flex items-center gap-1.5 font-body text-xs font-semibold uppercase tracking-[0.14em] text-brand-stone">
                  <MapPin aria-hidden="true" className="size-3.5" />
                  Blountville gridpoint · Sullivan County
                </p>
              </div>
            </div>
            <p className="mt-6 font-body text-sm text-brand-slate-light leading-relaxed">
              {snapshot.current.detailedForecast || snapshot.today.detailedForecast}
            </p>
          </div>

          {/* Side: copper weathervane + today high/low */}
          <div className="rounded-sm border border-brand-surface bg-white p-6 space-y-5">
            {/* Live weathervane — rotates with current wind direction */}
            <div className="hidden pt-2 pb-12 sm:block">
              <CopperWeathervane
                windDirection={windDirectionDegrees}
                windSpeed={windMph || undefined}
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
                  {formatWind(snapshot.current.windSpeed, snapshot.current.windDirection)}
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

        <RiverConditionsSection gauges={riverConditions} />

        <LakeLevelsSection />

        <RoadConditionsSection />

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
            . River gauge data from the{" "}
            <a
              href="https://waterdata.usgs.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-copper underline hover:text-brand-copper-light inline-flex items-center gap-1"
            >
              U.S. Geological Survey
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
            at{" "}
            <TelLink
              phone="(423) 323-6912"
              className="text-brand-copper underline hover:text-brand-copper-light"
            />
            .
          </p>
        </section>
      </div>
    </main>
  );
}

function ActiveAlertsSection({ alerts }: { alerts: PublicAlert[] }) {
  return (
    <section aria-labelledby="alerts-heading">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-brass">
            Safety first
          </p>
          <h2 id="alerts-heading" className="mt-1 font-display text-2xl font-bold text-brand-navy">
            Active alerts ({alerts.length})
          </h2>
        </div>
        <a
          href="https://alerts.weather.gov/search?zone=TNZ017"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 self-start font-body text-sm font-semibold text-brand-copper hover:text-brand-copper-light sm:self-auto"
        >
          Open NWS alert feed
          <ExternalLink aria-hidden="true" className="size-3.5" />
        </a>
      </div>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    </section>
  );
}

function SituationSummarySection({ situation }: { situation: WeatherSituation }) {
  const toneClass = {
    safe: {
      shell: "border-brand-sage/25 bg-brand-sage/7",
      icon: "bg-brand-sage text-white",
      eyebrow: "text-brand-sage",
    },
    watch: {
      shell: "border-brand-brass/30 bg-brand-brass/8",
      icon: "bg-brand-brass text-white",
      eyebrow: "text-brand-brass",
    },
    danger: {
      shell: "border-brand-copper/35 bg-brand-copper/8",
      icon: "bg-brand-copper text-white",
      eyebrow: "text-brand-copper",
    },
  }[situation.tone];
  const Icon = situation.tone === "safe" ? CheckCircle2 : AlertTriangle;

  return (
    <section
      aria-labelledby="situation-heading"
      className={`rounded-sm border p-5 shadow-sm sm:p-6 ${toneClass.shell}`}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-start">
        <div className="flex items-start gap-4">
          <div className={`rounded-full p-3 ${toneClass.icon}`}>
            <Icon aria-hidden="true" className="size-5" />
          </div>
          <div>
            <p
              className={`font-body text-xs font-semibold uppercase tracking-[0.18em] ${toneClass.eyebrow}`}
            >
              Situation summary
            </p>
            <h2
              id="situation-heading"
              className="mt-1 font-display text-2xl font-bold text-brand-navy"
            >
              {situation.title}
            </h2>
            <p className="mt-2 max-w-3xl font-body text-sm leading-relaxed text-brand-slate">
              {situation.summary}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {situation.details.map((detail) => (
                <div
                  key={detail}
                  className="rounded-sm border border-white/70 bg-white/70 px-3 py-2 font-body text-[11px] font-semibold text-brand-slate sm:text-xs"
                >
                  {detail}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-white/70 bg-white/75 p-4">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-brand-stone">
            What to do
          </p>
          <div className="mt-3 space-y-3">
            {situation.guidance.map((item) => (
              <div key={item.title}>
                <h3 className="font-display text-base font-bold text-brand-navy">{item.title}</h3>
                <p className="mt-1 font-body text-sm leading-relaxed text-brand-slate-light">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
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

function RiverConditionsSection({ gauges }: { gauges: RiverGauge[] }) {
  return (
    <section aria-labelledby="river-heading">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-brass">
            Rivers and creeks
          </p>
          <h2 id="river-heading" className="mt-1 font-display text-2xl font-bold text-brand-navy">
            River conditions
          </h2>
          <p className="mt-1 max-w-3xl font-body text-sm leading-relaxed text-brand-slate-light">
            Live USGS stream gauges for waterways that feed Sullivan County recreation, stormwater,
            and flood awareness. Use this with official NWS alerts, not instead of them.
          </p>
        </div>
        <a
          href="https://waterdata.usgs.gov/tn/nwis/current/?type=flow"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 self-start font-body text-sm font-semibold text-brand-copper hover:text-brand-copper-light sm:self-auto"
        >
          Open USGS water data
          <ExternalLink aria-hidden="true" className="size-3.5" />
        </a>
      </div>

      {gauges.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {gauges.map((gauge) => (
            <RiverGaugeCard key={gauge.siteNo} gauge={gauge} />
          ))}
        </div>
      ) : (
        <div className="rounded-sm border border-brand-surface bg-white p-5">
          <p className="font-display text-base font-bold text-brand-navy">
            River gauge data is temporarily unavailable.
          </p>
          <p className="mt-1 font-body text-sm text-brand-slate-light">
            Check the official USGS water data site for the latest streamflow readings.
          </p>
        </div>
      )}
    </section>
  );
}

function RoadConditionsSection() {
  return (
    <section aria-labelledby="road-conditions-heading">
      <div className="rounded-sm border border-brand-surface bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-3xl">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-brass">
              Roads and travel
            </p>
            <h2
              id="road-conditions-heading"
              className="mt-1 font-display text-2xl font-bold text-brand-navy"
            >
              Road conditions and traffic cameras
            </h2>
            <p className="mt-2 font-body text-sm leading-relaxed text-brand-slate-light">
              During storms, crashes, or construction, check TDOT SmartWay for I-81, I-26,
              incidents, road closures, and traffic cameras. TN 511 provides the same official road
              information by phone or web.
            </p>
          </div>
          <RouteIcon aria-hidden="true" className="hidden size-10 text-brand-copper sm:block" />
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={officialRoadLinks.smartway}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-sm bg-brand-navy px-4 py-2.5 font-body text-sm font-bold text-white transition-colors hover:bg-brand-copper"
          >
            Open TDOT SmartWay
            <ExternalLink aria-hidden="true" className="size-3.5" />
          </a>
          <a
            href={officialRoadLinks.smartwayRegion1Cameras}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-sm border border-brand-navy/15 px-4 py-2.5 font-body text-sm font-bold text-brand-navy transition-colors hover:border-brand-copper hover:text-brand-copper"
          >
            View I-81 cameras
            <ExternalLink aria-hidden="true" className="size-3.5" />
          </a>
          <a
            href={officialRoadLinks.tn511}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-sm border border-brand-navy/15 px-4 py-2.5 font-body text-sm font-bold text-brand-navy transition-colors hover:border-brand-copper hover:text-brand-copper"
          >
            Open TN 511
            <ExternalLink aria-hidden="true" className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function LakeLevelsSection() {
  const lakes = [
    {
      name: "Boone Lake",
      body: "TVA lake elevation, operating guide, and recent level trend for boating and shoreline planning.",
      href: officialLakeLinks.boone,
    },
    {
      name: "South Holston Lake",
      body: "TVA level information for the upper South Fork Holston recreation corridor.",
      href: officialLakeLinks.southHolston,
    },
    {
      name: "Fort Patrick Henry Lake",
      body: "TVA lake level information for the Kingsport and Warriors' Path area.",
      href: officialLakeLinks.fortPatrickHenry,
    },
  ];

  return (
    <section aria-labelledby="lake-levels-heading">
      <div className="mb-4">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-brass">
          TVA reservoirs
        </p>
        <h2
          id="lake-levels-heading"
          className="mt-1 font-display text-2xl font-bold text-brand-navy"
        >
          Lake levels
        </h2>
        <p className="mt-1 max-w-3xl font-body text-sm leading-relaxed text-brand-slate-light">
          Official TVA lake pages are the best source for Boone, South Holston, and Fort Patrick
          Henry lake elevations and operating information.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {lakes.map((lake) => (
          <a
            key={lake.name}
            href={lake.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm border border-brand-surface bg-white p-5 transition-colors hover:border-brand-copper/40"
          >
            <h3 className="font-display text-lg font-bold text-brand-navy">{lake.name}</h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-brand-slate-light">
              {lake.body}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-brand-copper">
              Open TVA lake page
              <ExternalLink aria-hidden="true" className="size-3.5" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

function RiverGaugeCard({ gauge }: { gauge: RiverGauge }) {
  return (
    <article className="rounded-sm border border-brand-surface bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-stone">
            {gauge.label}
          </p>
          <h3 className="mt-1 font-display text-xl font-bold leading-tight text-brand-navy">
            {gauge.waterway}
          </h3>
          <p className="mt-1 font-body text-xs text-brand-slate-light">{gauge.name}</p>
          <p className="mt-3 font-body text-sm leading-relaxed text-brand-slate">
            {riverGaugePurpose(gauge.siteNo)}
          </p>
        </div>
        <TrendBadge trend={gauge.trend} />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <RiverMetric
          icon={<Waves aria-hidden="true" className="size-4" />}
          label="Flow"
          value={formatRiverValue(gauge.discharge, 0)}
        />
        <RiverMetric
          icon={<Gauge aria-hidden="true" className="size-4" />}
          label="Gauge height"
          value={formatRiverValue(gauge.gaugeHeight)}
        />
      </div>

      <div className="mt-5 border-t border-brand-surface pt-4">
        <p className="font-body text-xs text-brand-stone">
          Updated{" "}
          {gauge.latestObservedAt ? formatDateTime(gauge.latestObservedAt) : "when USGS reports"}
        </p>
        <a
          href={gauge.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-brand-copper hover:text-brand-copper-light"
        >
          View official gauge
          <ExternalLink aria-hidden="true" className="size-3.5" />
        </a>
      </div>
    </article>
  );
}

function RiverMetric({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-sm bg-brand-parchment p-3">
      <div className="flex items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-stone">
        {icon}
        <span>{label}</span>
      </div>
      <p className="mt-1 font-display text-lg font-bold text-brand-navy">{value}</p>
    </div>
  );
}

function riverGaugePurpose(siteNo: string): string {
  return (
    {
      "03478400": "Best local signal for Bristol-area creek response after heavy rain.",
      "03473000":
        "Useful upstream signal for South Fork Holston flows feeding toward South Holston Lake.",
      "03490000": "Useful upstream signal for North Fork Holston flows west of Kingsport.",
    }[siteNo] ?? "Useful local streamflow signal for outdoor planning and water awareness."
  );
}

function TrendBadge({ trend }: { trend: RiverTrend }) {
  const className = {
    rising: "border-brand-copper/25 bg-brand-copper/10 text-brand-copper",
    falling: "border-brand-community/25 bg-brand-community/10 text-brand-community",
    steady: "border-brand-sage/25 bg-brand-sage/10 text-brand-sage",
    unknown: "border-brand-surface bg-brand-parchment text-brand-stone",
  }[trend];

  return (
    <span
      className={`shrink-0 rounded-full border px-2.5 py-1 font-body text-[11px] font-bold uppercase tracking-[0.12em] ${className}`}
    >
      {formatRiverTrend(trend)}
    </span>
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
