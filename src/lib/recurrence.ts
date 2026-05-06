/**
 * Compute the next concrete date for recurring meetings.
 * Times are interpreted in America/New_York.
 */

const TIMEZONE = "America/New_York";

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday
export type NthOfMonth = 1 | 2 | 3 | 4 | "last";

export interface RecurrenceRule {
  /** 0=Sunday, 6=Saturday */
  dayOfWeek: DayOfWeek;
  /** "1" through "4" for first..fourth occurrence in the month, or "last". */
  nthOfMonth: NthOfMonth;
  /** "HH:MM" 24-hour time. */
  time: string;
  /** Duration in minutes (default 60 — most meetings are 1 hour). */
  durationMinutes?: number;
}

function parseTime(time: string): { hour: number; minute: number } {
  const [h, m] = time.split(":").map((n) => Number.parseInt(n, 10));
  return { hour: h, minute: m || 0 };
}

/**
 * For a given calendar month, find the date of the nth weekday in America/New_York.
 * Returns null if "last" finds no match (impossible — every weekday occurs at least 4× per month).
 */
function nthWeekdayOfMonth(
  year: number,
  monthZeroBased: number,
  dayOfWeek: DayOfWeek,
  nth: NthOfMonth,
): Date {
  if (nth === "last") {
    // Walk backwards from the last day of the month.
    const lastDay = new Date(year, monthZeroBased + 1, 0).getDate();
    for (let day = lastDay; day >= 1; day -= 1) {
      const d = new Date(year, monthZeroBased, day);
      if (d.getDay() === dayOfWeek) {
        return d;
      }
    }
    throw new Error("Unreachable: every weekday occurs at least once in any month");
  }

  // Find the first occurrence of the day, then add (nth-1) weeks.
  let day = 1;
  while (day <= 7) {
    const d = new Date(year, monthZeroBased, day);
    if (d.getDay() === dayOfWeek) {
      return new Date(year, monthZeroBased, day + (nth - 1) * 7);
    }
    day += 1;
  }
  throw new Error("Unreachable");
}

/**
 * Combine a calendar date (interpreted as Y/M/D in local NY) with HH:MM in NY,
 * returning the corresponding UTC Date instant. Avoids server-timezone drift.
 */
function nyDateToUtc(
  year: number,
  monthZeroBased: number,
  day: number,
  hour: number,
  minute: number,
): Date {
  // Build a UTC timestamp first, then ask Intl what wall-clock NY time that maps to;
  // shift until they agree. Two iterations handle DST edges.
  let ts = Date.UTC(year, monthZeroBased, day, hour, minute);
  for (let i = 0; i < 3; i += 1) {
    const offsetMin = nyOffsetMinutesAt(new Date(ts));
    const adjusted = Date.UTC(year, monthZeroBased, day, hour, minute) + offsetMin * 60_000;
    if (adjusted === ts) break;
    ts = adjusted;
  }
  return new Date(ts);
}

function nyOffsetMinutesAt(at: Date): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts = dtf.formatToParts(at);
  const get = (t: string) => Number.parseInt(parts.find((p) => p.type === t)?.value ?? "0", 10);
  const ny = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute"),
    get("second"),
  );
  // Positive when NY is behind UTC (e.g., EST is UTC-5, so offsetMinutes = 300).
  return Math.round((at.getTime() - ny) / 60_000);
}

function nyParts(at: Date): {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
} {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  const parts = dtf.formatToParts(at);
  const get = (t: string) => Number.parseInt(parts.find((p) => p.type === t)?.value ?? "0", 10);
  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
    hour: get("hour") % 24,
    minute: get("minute"),
  };
}

export function nextOccurrence(rule: RecurrenceRule, from: Date = new Date()): Date {
  const { hour, minute } = parseTime(rule.time);
  const today = nyParts(from);

  // Try this month first.
  let date = nthWeekdayOfMonth(today.year, today.month - 1, rule.dayOfWeek, rule.nthOfMonth);
  let candidate = nyDateToUtc(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute);
  if (candidate.getTime() > from.getTime()) return candidate;

  // Otherwise next month: today.month is 1-based, so it's already the next month's 0-based index.
  const nextYear = today.month === 12 ? today.year + 1 : today.year;
  const nm = today.month === 12 ? 0 : today.month;
  date = nthWeekdayOfMonth(nextYear, nm, rule.dayOfWeek, rule.nthOfMonth);
  candidate = nyDateToUtc(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute);
  return candidate;
}

/**
 * Generate a vCalendar (.ics) string for a single event.
 * Caller is responsible for URL-encoding when embedded in a `data:` URL.
 */
export function buildIcs(event: {
  uid: string;
  title: string;
  description?: string;
  location?: string;
  start: Date;
  durationMinutes: number;
}): string {
  const fmt = (d: Date) =>
    `${d
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "")}`;
  const end = new Date(event.start.getTime() + event.durationMinutes * 60_000);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sullivan County TN//Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.uid}`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(event.start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${escapeIcs(event.title)}`,
    event.description ? `DESCRIPTION:${escapeIcs(event.description)}` : "",
    event.location ? `LOCATION:${escapeIcs(event.location)}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);
  return lines.join("\r\n");
}

function escapeIcs(s: string): string {
  return s.replace(/[\\,;]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");
}

export function formatNyDateTime(d: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(d);
}

export function formatNyDateShort(d: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(d);
}

export function formatNyTime(d: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    hour: "numeric",
    minute: "2-digit",
  }).format(d);
}
