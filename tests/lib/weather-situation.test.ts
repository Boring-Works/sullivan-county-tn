import { describe, expect, it } from "vitest";
import type { RiverGauge } from "~/lib/river-utils";
import { deriveWeatherSituation } from "~/lib/weather-situation";
import type { PublicAlert, PublicWeatherSnapshot } from "~/server/weather/refresh";

const baseSnapshot: PublicWeatherSnapshot = {
  fetchedAt: "2026-05-21T12:00:00.000Z",
  current: {
    tempF: 72,
    conditions: "Mostly Sunny",
    icon: "https://api.weather.gov/icons/land/day/few",
    windSpeed: "5 mph",
    windDirection: "NW",
    detailedForecast: "Mostly sunny.",
    isDaytime: true,
  },
  today: {
    name: "Today",
    high: 78,
    low: 58,
    shortForecast: "Mostly Sunny",
    precipChance: 10,
    detailedForecast: "Mostly sunny.",
  },
  next7: [],
  hourly: [],
  alerts: [],
  hasSevereAlert: false,
  source: "National Weather Service · MRX (Morristown)",
};

const severeAlert: PublicAlert = {
  id: "alert-1",
  event: "Severe Thunderstorm Warning",
  severity: "Severe",
  headline: "Severe thunderstorm warning for Sullivan County",
  description: "Thunderstorms with damaging wind are moving through the area.",
  instruction: "Move indoors now.",
  effective: "2026-05-21T12:00:00.000Z",
  expires: "2026-05-21T13:00:00.000Z",
  source: "NWS Morristown TN",
};

const risingGauge: RiverGauge = {
  siteNo: "03478400",
  name: "Beaver Creek at Bristol",
  label: "Bristol signal",
  waterway: "Beaver Creek",
  latitude: null,
  longitude: null,
  discharge: null,
  gaugeHeight: null,
  trend: "rising",
  latestObservedAt: null,
  url: "https://waterdata.usgs.gov/monitoring-location/03478400/",
};

describe("deriveWeatherSituation", () => {
  it("returns a calm status when no risk signals are present", () => {
    const situation = deriveWeatherSituation(baseSnapshot, []);

    expect(situation.tone).toBe("safe");
    expect(situation.title).toBe("No immediate weather alerts");
    expect(situation.details).toContain("No active NWS alerts");
  });

  it("prioritizes severe alerts as danger", () => {
    const situation = deriveWeatherSituation(
      { ...baseSnapshot, alerts: [severeAlert], hasSevereAlert: true },
      [],
    );

    expect(situation.tone).toBe("danger");
    expect(situation.title).toBe("Severe Thunderstorm Warning active");
    expect(situation.guidance.map((item) => item.title)).toContain(
      "Follow official alert instructions",
    );
  });

  it("elevates rising river gauges and heavy rain", () => {
    const situation = deriveWeatherSituation(
      {
        ...baseSnapshot,
        today: { ...baseSnapshot.today, precipChance: 80, detailedForecast: "Heavy rain likely." },
      },
      [risingGauge],
    );

    expect(situation.tone).toBe("watch");
    expect(situation.details).toContain("1 river gauge is rising");
    expect(situation.guidance.map((item) => item.title)).toContain("Watch low-water crossings");
  });
});
