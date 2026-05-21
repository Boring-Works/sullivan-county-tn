import { createServerFn } from "@tanstack/react-start";
import { desc, gte } from "drizzle-orm";
import { getDb } from "~/db";
import { weatherObservations } from "~/db/schema";
import { getEnv } from "~/server/env";
import type { PublicWeatherSnapshot } from "~/server/weather/refresh";
import { KV_KEY, refreshWeather, STALE_AFTER_MS } from "~/server/weather/refresh";

/**
 * Returns the current cached weather snapshot.
 *
 *   - Cache hit + fresh (<10 min old)  → return immediately (~5ms).
 *   - Cache hit + stale (>10 min)      → refresh synchronously; on upstream
 *                                        failure, return the stale snapshot.
 *   - Cache miss                       → synchronous refresh (cold deploy only).
 *
 * Phase 2 will wrap this in a proper Cron Trigger so refreshes never happen
 * on the user request path. For MVP, one user every 10 minutes pays a ~300ms
 * NWS round-trip; everyone else gets a 5ms KV hit.
 */
export const getCurrentWeather = createServerFn({ method: "GET" }).handler(
  async (): Promise<PublicWeatherSnapshot | null> => {
    const env = getEnv();
    const kv = env.CONTACT_SUBMISSIONS;
    if (!kv) return null;

    const cached = (await kv.get(KV_KEY, { type: "json" })) as PublicWeatherSnapshot | null;

    if (cached) {
      const age = Date.now() - new Date(cached.fetchedAt).getTime();
      if (age < STALE_AFTER_MS) return cached;

      // Stale — refresh; if upstream fails, fall back to stale snapshot.
      try {
        return await refreshWeather(env);
      } catch (err) {
        console.error(JSON.stringify({ event: "weather_stale_refresh_failed", err: String(err) }));
        return cached;
      }
    }

    // Cache miss — synchronous refresh.
    try {
      return await refreshWeather(env);
    } catch (err) {
      console.error(JSON.stringify({ event: "weather_cold_fetch_failed", err: String(err) }));
      return null;
    }
  },
);

/**
 * Returns archived weather snapshots from the last 24 hours for the trend chart.
 */
export const getRecentObservations = createServerFn({ method: "GET" }).handler(async () => {
  const env = getEnv();
  const d1 = env.DB;
  if (!d1) return [];

  try {
    const db = getDb(d1);
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const rows = await db
      .select({
        observedAt: weatherObservations.observedAt,
        temperatureF: weatherObservations.temperatureF,
        conditions: weatherObservations.conditions,
        alertsCount: weatherObservations.alertsCount,
      })
      .from(weatherObservations)
      .where(gte(weatherObservations.observedAt, cutoff))
      .orderBy(desc(weatherObservations.observedAt))
      .limit(144) // 24 hours at the normal 10-minute cadence
      .all();
    return rows.reverse(); // oldest → newest for chart x-axis
  } catch (err) {
    console.error(JSON.stringify({ event: "weather_observations_query_failed", err: String(err) }));
    return [];
  }
});
