import type { RiverGauge } from "~/lib/river-utils";
import { parseWindSpeed } from "~/lib/weather-utils";
import type { PublicAlert, PublicWeatherSnapshot } from "~/server/weather/refresh";

export type WeatherSituationTone = "safe" | "watch" | "danger";

export interface WeatherGuidance {
  title: string;
  body: string;
}

export interface WeatherSituation {
  tone: WeatherSituationTone;
  title: string;
  summary: string;
  details: string[];
  guidance: WeatherGuidance[];
}

function hasText(value: string, terms: string[]): boolean {
  const lower = value.toLowerCase();
  return terms.some((term) => lower.includes(term));
}

function alertText(alerts: PublicAlert[]): string {
  return alerts.map((alert) => `${alert.event} ${alert.headline} ${alert.description}`).join(" ");
}

function forecastText(snapshot: PublicWeatherSnapshot): string {
  return [
    snapshot.current.conditions,
    snapshot.current.detailedForecast,
    snapshot.today.shortForecast,
    snapshot.today.detailedForecast,
    ...snapshot.hourly.slice(0, 6).map((hour) => hour.shortForecast),
  ].join(" ");
}

function firstPriorityAlert(alerts: PublicAlert[]): PublicAlert | null {
  const rank = { Extreme: 4, Severe: 3, Moderate: 2, Minor: 1, Unknown: 0 } as const;
  return [...alerts].sort((a, b) => rank[b.severity] - rank[a.severity])[0] ?? null;
}

export function deriveWeatherSituation(
  snapshot: PublicWeatherSnapshot,
  riverConditions: RiverGauge[],
): WeatherSituation {
  const priorityAlert = firstPriorityAlert(snapshot.alerts);
  const windMph = parseWindSpeed(snapshot.current.windSpeed);
  const risingRivers = riverConditions.filter((gauge) => gauge.trend === "rising").length;
  const precipChance = snapshot.today.precipChance;
  const combinedText = `${alertText(snapshot.alerts)} ${forecastText(snapshot)}`;

  const hasSevereAlert = Boolean(
    priorityAlert && (priorityAlert.severity === "Extreme" || priorityAlert.severity === "Severe"),
  );
  const hasHighWind = windMph >= 25;
  const hasHeavyRain = (precipChance ?? 0) >= 70 || hasText(combinedText, ["heavy rain", "flood"]);
  const hasWinter = hasText(combinedText, ["snow", "sleet", "ice", "freezing"]);
  const hasThunder = hasText(combinedText, ["thunder", "storm", "lightning"]);
  const hasHeat = (snapshot.today.high ?? snapshot.current.tempF) >= 90;

  const details: string[] = [
    `${snapshot.current.tempF}°F and ${snapshot.current.conditions}`,
    priorityAlert ? `${priorityAlert.event}: ${priorityAlert.severity}` : "No active NWS alerts",
    precipChance === null ? "Rain chance not listed" : `${precipChance}% rain chance today`,
    windMph >= 1 ? `${snapshot.current.windSpeed} wind` : "Calm wind",
  ];

  if (risingRivers > 0) {
    details.push(`${risingRivers} river ${risingRivers === 1 ? "gauge is" : "gauges are"} rising`);
  }

  const guidance: WeatherGuidance[] = [];

  if (priorityAlert) {
    guidance.push({
      title: "Follow official alert instructions",
      body: "Open the NWS alert details, keep a way to receive warnings, and call 911 for emergencies.",
    });
  }

  if (hasHeavyRain || risingRivers > 0) {
    guidance.push({
      title: "Watch low-water crossings",
      body: "Do not drive through water over the road. Check USGS gauges and TDOT before travel during heavy rain.",
    });
  }

  if (hasThunder) {
    guidance.push({
      title: "Move indoors for thunder",
      body: "If you can hear thunder, move inside a sturdy building and avoid open fields, water, and isolated trees.",
    });
  }

  if (hasWinter) {
    guidance.push({
      title: "Plan extra travel time",
      body: "Mountain roads, bridges, and shaded areas can become slick first. Check TDOT SmartWay before leaving.",
    });
  }

  if (hasHighWind) {
    guidance.push({
      title: "Secure loose outdoor items",
      body: "Use caution around trees, high-profile vehicles, and temporary outdoor structures when winds increase.",
    });
  }

  if (hasHeat) {
    guidance.push({
      title: "Limit heat exposure",
      body: "Drink water, take breaks, and check on older neighbors, children, pets, and outdoor workers.",
    });
  }

  if (guidance.length === 0) {
    guidance.push({
      title: "Keep an eye on changing conditions",
      body: "Mountain weather can change quickly. Check alerts again before outdoor work, boating, or longer trips.",
    });
  }

  if (hasSevereAlert && priorityAlert) {
    return {
      tone: "danger",
      title: `${priorityAlert.event} active`,
      summary:
        "Take action now and follow National Weather Service instructions for Sullivan County.",
      details,
      guidance: guidance.slice(0, 3),
    };
  }

  if (priorityAlert || hasHighWind || hasHeavyRain || hasWinter || hasThunder || risingRivers > 0) {
    return {
      tone: "watch",
      title: priorityAlert ? `${priorityAlert.event} active` : "Plan around changing conditions",
      summary:
        "Review the local forecast, river gauges, and road resources before travel or outdoor plans.",
      details,
      guidance: guidance.slice(0, 3),
    };
  }

  return {
    tone: "safe",
    title: "No immediate weather alerts",
    summary:
      "Conditions look manageable right now, with official NWS and USGS data refreshed through this page.",
    details,
    guidance: guidance.slice(0, 2),
  };
}
