/**
 * Typed client for the National Weather Service API (api.weather.gov).
 *
 * - Free, no key required.
 * - Requires User-Agent header identifying our app + contact email.
 * - Rate limit is generous (~5 req/sec); we hit at most 3 endpoints per refresh.
 *
 * Sullivan County, TN coordinates: 36.5358°N, 82.3115°W (Blountville)
 *   Forecast office: MRX (Morristown)
 *   Gridpoint:       126,82
 *   Forecast zone:   TNZ017 (used for active alerts)
 */

const NWS_USER_AGENT = "(sullivan-county-tn.codyboring.workers.dev, mayor@sullivancountytn.gov)";

const FORECAST_OFFICE = "MRX";
const GRID_X = 126;
const GRID_Y = 82;
export const FORECAST_ZONE = "TNZ017";

const BASE = "https://api.weather.gov";

const headers = {
  "User-Agent": NWS_USER_AGENT,
  Accept: "application/geo+json",
};

interface NwsForecastPeriod {
  number: number;
  name: string; // "Tonight", "Wednesday", etc.
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: "F" | "C";
  windSpeed: string;
  windDirection: string;
  icon: string;
  shortForecast: string;
  detailedForecast: string;
  probabilityOfPrecipitation?: { value: number | null };
}

interface NwsForecastResponse {
  properties: {
    updated: string;
    periods: NwsForecastPeriod[];
  };
}

interface NwsAlert {
  id: string;
  properties: {
    id: string;
    event: string;
    severity: "Extreme" | "Severe" | "Moderate" | "Minor" | "Unknown";
    headline: string;
    description: string;
    instruction: string | null;
    effective: string;
    expires: string;
    senderName: string;
  };
}

interface NwsAlertsResponse {
  features: NwsAlert[];
}

/**
 * Hardened NWS fetch:
 *  - 5s timeout via AbortController (NWS occasionally hangs during regional storms)
 *  - Cloudflare edge cache for 5min as defense-in-depth (KV is the primary cache;
 *    this kicks in for the cron-trigger path or if multiple isolates fetch the
 *    same endpoint within seconds).
 *  - One retry on 5xx with 250ms backoff.
 */
async function nwsFetch<T>(path: string): Promise<T> {
  const url = `${BASE}${path}`;

  const attempt = async (): Promise<Response> => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    try {
      return await fetch(url, {
        headers,
        signal: controller.signal,
        cf: { cacheTtl: 300, cacheEverything: true },
      } as RequestInit);
    } finally {
      clearTimeout(timeout);
    }
  };

  let res = await attempt();
  if (res.status >= 500 && res.status < 600) {
    await new Promise((r) => setTimeout(r, 250));
    res = await attempt();
  }
  if (!res.ok) {
    throw new Error(`NWS ${path} failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

export async function fetchDailyForecast(): Promise<NwsForecastPeriod[]> {
  const data = await nwsFetch<NwsForecastResponse>(
    `/gridpoints/${FORECAST_OFFICE}/${GRID_X},${GRID_Y}/forecast`,
  );
  return data.properties.periods;
}

export async function fetchHourlyForecast(): Promise<NwsForecastPeriod[]> {
  const data = await nwsFetch<NwsForecastResponse>(
    `/gridpoints/${FORECAST_OFFICE}/${GRID_X},${GRID_Y}/forecast/hourly`,
  );
  // Limit to next 24 hours to keep KV doc small.
  return data.properties.periods.slice(0, 24);
}

export async function fetchActiveAlerts(): Promise<NwsAlert[]> {
  const data = await nwsFetch<NwsAlertsResponse>(`/alerts/active/zone/${FORECAST_ZONE}`);
  return data.features ?? [];
}

export type { NwsAlert, NwsForecastPeriod };
