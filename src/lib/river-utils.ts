export type RiverTrend = "rising" | "falling" | "steady" | "unknown";

export interface RiverReading {
  value: number;
  unit: string;
  observedAt: string;
}

export interface RiverGauge {
  siteNo: string;
  name: string;
  label: string;
  waterway: string;
  latitude: number | null;
  longitude: number | null;
  discharge: RiverReading | null;
  gaugeHeight: RiverReading | null;
  trend: RiverTrend;
  latestObservedAt: string | null;
  url: string;
}

interface RawValue {
  value: string;
  dateTime: string;
}

export function parseNumber(value: string): number | null {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function latestReading(values: RawValue[], unit: string): RiverReading | null {
  const latest = [...values]
    .reverse()
    .map((entry) => ({ value: parseNumber(entry.value), observedAt: entry.dateTime }))
    .find((entry): entry is { value: number; observedAt: string } => entry.value !== null);

  return latest ? { value: latest.value, observedAt: latest.observedAt, unit } : null;
}

export function deriveRiverTrend(values: RawValue[]): RiverTrend {
  const numeric = values
    .map((entry) => parseNumber(entry.value))
    .filter((value): value is number => value !== null);

  if (numeric.length < 2) return "unknown";

  const first = numeric[0];
  const last = numeric[numeric.length - 1];
  const delta = last - first;
  const threshold = Math.max(Math.abs(first) * 0.05, 1);

  if (delta > threshold) return "rising";
  if (delta < -threshold) return "falling";
  return "steady";
}

export function formatRiverValue(reading: RiverReading | null, maximumFractionDigits = 1): string {
  if (!reading) return "Not available";
  return `${new Intl.NumberFormat("en-US", { maximumFractionDigits }).format(reading.value)} ${reading.unit}`;
}

export function formatRiverTrend(trend: RiverTrend): string {
  return {
    rising: "Rising",
    falling: "Falling",
    steady: "Steady",
    unknown: "Trend unavailable",
  }[trend];
}
