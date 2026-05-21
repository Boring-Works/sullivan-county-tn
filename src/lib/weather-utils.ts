/** Convert NWS wind direction text ("NW", "WSW") to degrees (0=N, 90=E). */
export function parseWindDegrees(dir: string): number | null {
  if (!dir.trim()) return null;
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
  return map[dir.toUpperCase()] ?? null;
}

export function parseWindSpeed(speed: string): number {
  const match = speed.match(/\d+/);
  return match ? Number.parseInt(match[0], 10) : 0;
}

export function formatWind(speed: string, direction: string): string {
  const mph = parseWindSpeed(speed);
  if (mph === 0 || !direction.trim()) return mph === 0 ? "Calm" : speed;
  return `${speed} ${direction}`;
}

export function formatPercent(value: number | null): string {
  return value === null ? "Not listed" : `${value}%`;
}
