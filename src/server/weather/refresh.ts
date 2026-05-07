/**
 * refreshWeather() — pulls fresh data from NWS, writes:
 *   - KV "weather:current" → single JSON snapshot all readers consume
 *   - D1 weather_observations → archives one row for the trend chart
 *
 * Called from the public server fn when the KV snapshot is stale (>10 min),
 * via ctx.waitUntil() so the user request returns instantly with the prior
 * snapshot while the refresh runs in the background.
 */

import { ulid } from "ulidx";
import { getDb } from "~/db";
import { weatherObservations } from "~/db/schema";
import {
  fetchActiveAlerts,
  fetchDailyForecast,
  fetchHourlyForecast,
  type NwsAlert,
  type NwsForecastPeriod,
} from "./nws-client";

export const KV_KEY = "weather:current";
export const STALE_AFTER_MS = 10 * 60 * 1000; // 10 minutes

export interface PublicAlert {
  id: string;
  event: string;
  severity: "Extreme" | "Severe" | "Moderate" | "Minor" | "Unknown";
  headline: string;
  description: string;
  instruction: string | null;
  effective: string;
  expires: string;
  source: string;
}

export interface PublicWeatherSnapshot {
  fetchedAt: string; // ISO timestamp of refresh
  current: {
    tempF: number;
    conditions: string; // shortForecast, e.g. "Sunny", "Partly Cloudy"
    icon: string; // NWS icon URL
    windSpeed: string; // "10 mph" preformatted from NWS
    windDirection: string; // "NW"
    detailedForecast: string;
    isDaytime: boolean;
  };
  today: {
    name: string;
    high?: number;
    low?: number;
    shortForecast: string;
    precipChance: number | null;
    detailedForecast: string;
  };
  next7: Array<{
    name: string;
    startTime: string;
    isDaytime: boolean;
    tempF: number;
    shortForecast: string;
    icon: string;
    precipChance: number | null;
  }>;
  hourly: Array<{
    startTime: string;
    tempF: number;
    shortForecast: string;
    precipChance: number | null;
  }>;
  alerts: PublicAlert[];
  hasSevereAlert: boolean;
  source: string;
}

function deriveTodayHighLow(periods: NwsForecastPeriod[]): {
  high?: number;
  low?: number;
} {
  // NWS daily forecast alternates day/night periods. Today's "high" is the
  // first daytime period; today's "low" is the first nighttime period.
  const day = periods.find((p) => p.isDaytime);
  const night = periods.find((p) => !p.isDaytime);
  return { high: day?.temperature, low: night?.temperature };
}

function mapAlert(a: NwsAlert): PublicAlert {
  return {
    id: a.properties.id,
    event: a.properties.event,
    severity: a.properties.severity,
    headline: a.properties.headline,
    description: a.properties.description,
    instruction: a.properties.instruction,
    effective: a.properties.effective,
    expires: a.properties.expires,
    source: a.properties.senderName,
  };
}

export async function refreshWeather(env: Cloudflare.Env): Promise<PublicWeatherSnapshot> {
  const [daily, hourly, alerts] = await Promise.all([
    fetchDailyForecast(),
    fetchHourlyForecast(),
    fetchActiveAlerts(),
  ]);

  const currentPeriod = hourly[0] ?? daily[0];
  const todayPeriod = daily[0];
  const { high, low } = deriveTodayHighLow(daily);

  const publicAlerts = alerts.map(mapAlert);
  const hasSevereAlert = publicAlerts.some(
    (a) => a.severity === "Severe" || a.severity === "Extreme",
  );

  const snapshot: PublicWeatherSnapshot = {
    fetchedAt: new Date().toISOString(),
    current: {
      tempF: currentPeriod.temperature,
      conditions: currentPeriod.shortForecast,
      icon: currentPeriod.icon,
      windSpeed: currentPeriod.windSpeed,
      windDirection: currentPeriod.windDirection,
      detailedForecast: currentPeriod.detailedForecast,
      isDaytime: currentPeriod.isDaytime,
    },
    today: {
      name: todayPeriod.name,
      high,
      low,
      shortForecast: todayPeriod.shortForecast,
      precipChance: todayPeriod.probabilityOfPrecipitation?.value ?? null,
      detailedForecast: todayPeriod.detailedForecast,
    },
    next7: daily.slice(0, 7).map((p) => ({
      name: p.name,
      startTime: p.startTime,
      isDaytime: p.isDaytime,
      tempF: p.temperature,
      shortForecast: p.shortForecast,
      icon: p.icon,
      precipChance: p.probabilityOfPrecipitation?.value ?? null,
    })),
    hourly: hourly.slice(0, 12).map((p) => ({
      startTime: p.startTime,
      tempF: p.temperature,
      shortForecast: p.shortForecast,
      precipChance: p.probabilityOfPrecipitation?.value ?? null,
    })),
    alerts: publicAlerts,
    hasSevereAlert,
    source: "National Weather Service · MRX (Morristown)",
  };

  // Write KV snapshot for fast public reads.
  const kv = env.CONTACT_SUBMISSIONS;
  if (!kv) throw new Error("KV binding CONTACT_SUBMISSIONS not available");
  await kv.put(KV_KEY, JSON.stringify(snapshot), {
    // Auto-expire after 1 hour as a belt-and-suspenders fallback.
    expirationTtl: 3600,
  });

  // Archive observation row to D1 for the 24h trend chart.
  try {
    const d1 = env.DB;
    if (!d1) throw new Error("D1 binding DB not available");
    const db = getDb(d1);
    await db.insert(weatherObservations).values({
      id: ulid(),
      observedAt: snapshot.fetchedAt,
      temperatureF: snapshot.current.tempF,
      humidity: null, // NWS forecast endpoint doesn't include humidity directly
      windMph: parseInt(snapshot.current.windSpeed, 10) || null,
      windDirection: snapshot.current.windDirection || null,
      conditions: snapshot.current.conditions,
      alertsCount: publicAlerts.length,
      createdAt: snapshot.fetchedAt,
    });
  } catch (err) {
    // History is nice-to-have; don't fail the snapshot if D1 archive blocks.
    console.error(JSON.stringify({ event: "weather_archive_failed", err: String(err) }));
  }

  return snapshot;
}
