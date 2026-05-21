import { createServerFn } from "@tanstack/react-start";
import { deriveRiverTrend, latestReading, type RiverGauge } from "~/lib/river-utils";

const USGS_BASE = "https://waterservices.usgs.gov/nwis/iv/";
const USGS_USER_AGENT = "sullivan-county-tn.codyboring.workers.dev (mayor@sullivancountytn.gov)";
const PARAMETER_CODES = ["00060", "00065"] as const; // discharge, gauge height

const GAUGE_METADATA: Record<string, Pick<RiverGauge, "label" | "waterway">> = {
  "03478400": {
    label: "Bristol creek gauge",
    waterway: "Beaver Creek",
  },
  "03473000": {
    label: "South Fork upstream gauge",
    waterway: "South Fork Holston River",
  },
  "03490000": {
    label: "North Fork upstream gauge",
    waterway: "North Fork Holston River",
  },
};

const GAUGE_SITE_NUMBERS = Object.keys(GAUGE_METADATA);

interface UsgsValue {
  value: string;
  dateTime: string;
}

interface UsgsTimeSeries {
  sourceInfo: {
    siteName: string;
    siteCode: Array<{ value: string }>;
    geoLocation?: {
      geogLocation?: {
        latitude?: number;
        longitude?: number;
      };
    };
  };
  variable: {
    variableCode: Array<{ value: string }>;
    unit: { unitCode: string };
  };
  values: Array<{ value: UsgsValue[] }>;
}

interface UsgsResponse {
  value?: {
    timeSeries?: UsgsTimeSeries[];
  };
}

async function fetchRiverData(): Promise<UsgsResponse> {
  const params = new URLSearchParams({
    format: "json",
    sites: GAUGE_SITE_NUMBERS.join(","),
    parameterCd: PARAMETER_CODES.join(","),
    period: "PT6H",
    siteStatus: "all",
  });
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(`${USGS_BASE}?${params}`, {
      headers: {
        Accept: "application/json",
        "User-Agent": USGS_USER_AGENT,
      },
      signal: controller.signal,
      cf: { cacheTtl: 300, cacheEverything: true },
    } as RequestInit);

    if (!response.ok) {
      throw new Error(`USGS river conditions failed: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as UsgsResponse;
  } finally {
    clearTimeout(timeout);
  }
}

export const getRiverConditions = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const data = await fetchRiverData();
    const series = data.value?.timeSeries ?? [];
    const bySite = new Map<string, UsgsTimeSeries[]>();

    for (const item of series) {
      const siteNo = item.sourceInfo.siteCode[0]?.value;
      if (!siteNo || !GAUGE_METADATA[siteNo]) continue;
      bySite.set(siteNo, [...(bySite.get(siteNo) ?? []), item]);
    }

    return GAUGE_SITE_NUMBERS.map((siteNo): RiverGauge | null => {
      const siteSeries = bySite.get(siteNo);
      if (!siteSeries?.length) return null;

      const sample = siteSeries[0];
      const dischargeSeries = siteSeries.find(
        (item) => item.variable.variableCode[0]?.value === "00060",
      );
      const gaugeHeightSeries = siteSeries.find(
        (item) => item.variable.variableCode[0]?.value === "00065",
      );
      const dischargeValues = dischargeSeries?.values[0]?.value ?? [];
      const discharge = latestReading(dischargeValues, "cfs");
      const gaugeHeight = latestReading(gaugeHeightSeries?.values[0]?.value ?? [], "ft");
      const latestObservedAt = [discharge?.observedAt, gaugeHeight?.observedAt]
        .filter((value): value is string => Boolean(value))
        .sort()
        .at(-1);

      return {
        siteNo,
        name: sample.sourceInfo.siteName,
        label: GAUGE_METADATA[siteNo].label,
        waterway: GAUGE_METADATA[siteNo].waterway,
        latitude: sample.sourceInfo.geoLocation?.geogLocation?.latitude ?? null,
        longitude: sample.sourceInfo.geoLocation?.geogLocation?.longitude ?? null,
        discharge,
        gaugeHeight,
        trend: deriveRiverTrend(dischargeValues),
        latestObservedAt: latestObservedAt ?? null,
        url: `https://waterdata.usgs.gov/monitoring-location/${siteNo}/`,
      };
    }).filter((gauge): gauge is RiverGauge => gauge !== null);
  } catch (err) {
    console.error(JSON.stringify({ event: "river_conditions_fetch_failed", err: String(err) }));
    return [];
  }
});
