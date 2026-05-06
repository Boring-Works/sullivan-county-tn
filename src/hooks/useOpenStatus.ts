import { useEffect, useState } from "react";
import { findHoliday, nyDateKey } from "~/data/holidays";

export interface OpenStatus {
  isOpen: boolean | null;
  label: string;
  nextChange: Date | null;
}

const TIMEZONE = "America/New_York";

const DAY_INDEX: Record<string, number> = {
  sun: 0,
  sunday: 0,
  mon: 1,
  monday: 1,
  tue: 2,
  tuesday: 2,
  wed: 3,
  wednesday: 3,
  thu: 4,
  thursday: 4,
  fri: 5,
  friday: 5,
  sat: 6,
  saturday: 6,
};

interface ParsedHours {
  startDay: number;
  endDay: number;
  openMinutes: number;
  closeMinutes: number;
}

function to24Minutes(hour: number, minute: number, ampm: string): number {
  let h = hour;
  if (ampm === "pm" && h !== 12) h += 12;
  if (ampm === "am" && h === 12) h = 0;
  return h * 60 + minute;
}

export function parseHours(hours: string): ParsedHours | "always" | null {
  if (/24\s*\/\s*7|24\s*hours/i.test(hours)) return "always";

  // Match "Monday-Friday, 8am-5pm" or "Mon-Fri, 8:00am-4:30pm"
  const re =
    /(sun|mon|tue|wed|thu|fri|sat)\w*\s*[-–]\s*(sun|mon|tue|wed|thu|fri|sat)\w*[,\s]+(\d{1,2})(?::(\d{2}))?\s*(am|pm)\s*[-–]\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i;
  const m = hours.match(re);
  if (!m) return null;

  const startDay = DAY_INDEX[m[1].toLowerCase()];
  const endDay = DAY_INDEX[m[2].toLowerCase()];
  const openMinutes = to24Minutes(
    Number.parseInt(m[3], 10),
    Number.parseInt(m[4] || "0", 10),
    m[5].toLowerCase(),
  );
  const closeMinutes = to24Minutes(
    Number.parseInt(m[6], 10),
    Number.parseInt(m[7] || "0", 10),
    m[8].toLowerCase(),
  );
  return { startDay, endDay, openMinutes, closeMinutes };
}

function getZonedDateParts(date: Date): { dayOfWeek: number; minutes: number } {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = fmt.formatToParts(date);
  const day = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hour = Number.parseInt(parts.find((p) => p.type === "hour")?.value ?? "0", 10);
  const minute = Number.parseInt(parts.find((p) => p.type === "minute")?.value ?? "0", 10);
  const dayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return { dayOfWeek: dayMap[day] ?? 0, minutes: hour * 60 + minute };
}

function formatTime(minutes: number): string {
  let h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const ampm = h >= 12 ? "PM" : "AM";
  if (h === 0) h = 12;
  else if (h > 12) h -= 12;
  return m === 0 ? `${h}:00 ${ampm}` : `${h}:${m.toString().padStart(2, "0")} ${ampm}`;
}

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * Render a static "Mon–Fri 8 AM–4:30 PM"-style summary of the parsed hours.
 * Used for the SSR-stable placeholder before the client computes live status.
 */
export function formatHoursSummary(hours: string): string {
  const parsed = parseHours(hours);
  if (parsed === "always") return "Open 24/7";
  if (parsed === null) return "See hours";
  const { startDay, endDay, openMinutes, closeMinutes } = parsed;
  const days =
    startDay === endDay ? DAY_SHORT[startDay] : `${DAY_SHORT[startDay]}–${DAY_SHORT[endDay]}`;
  return `${days} · ${formatTime(openMinutes)}–${formatTime(closeMinutes)}`;
}

export function computeOpenStatus(hours: string, at: Date): OpenStatus {
  const parsed = parseHours(hours);
  if (parsed === null) return { isOpen: null, label: "See hours", nextChange: null };
  if (parsed === "always") return { isOpen: true, label: "Open 24/7", nextChange: null };

  // Holiday closure overrides hours-of-operation logic. Government offices are
  // closed on observed county holidays even on weekdays inside the open range.
  const holiday = findHoliday(nyDateKey(at));
  if (holiday) {
    return {
      isOpen: false,
      label: `Closed · ${holiday.name}`,
      nextChange: null,
    };
  }

  const { startDay, endDay, openMinutes, closeMinutes } = parsed;
  const { dayOfWeek, minutes } = getZonedDateParts(at);

  const inRange =
    startDay <= endDay
      ? dayOfWeek >= startDay && dayOfWeek <= endDay
      : dayOfWeek >= startDay || dayOfWeek <= endDay;

  if (inRange && minutes >= openMinutes && minutes < closeMinutes) {
    return {
      isOpen: true,
      label: `Open until ${formatTime(closeMinutes)}`,
      nextChange: null,
    };
  }

  if (inRange && minutes < openMinutes) {
    return {
      isOpen: false,
      label: `Closed · Opens at ${formatTime(openMinutes)}`,
      nextChange: null,
    };
  }

  // Outside range — find the next start day
  let daysAhead = 1;
  while (daysAhead <= 7) {
    const futureDay = (dayOfWeek + daysAhead) % 7;
    const willBeInRange =
      startDay <= endDay
        ? futureDay >= startDay && futureDay <= endDay
        : futureDay >= startDay || futureDay <= endDay;
    if (willBeInRange) {
      return {
        isOpen: false,
        label: `Closed · Opens ${DAY_NAMES[futureDay].slice(0, 3)} ${formatTime(openMinutes)}`,
        nextChange: null,
      };
    }
    daysAhead += 1;
  }

  return { isOpen: false, label: "Closed", nextChange: null };
}

export function useOpenStatus(hours: string | undefined): OpenStatus {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!hours) return { isOpen: null, label: "See hours", nextChange: null };
  // SSR + first paint: render a stable hours summary so the pill is visible
  // immediately. Hydration swaps to live "Open until 4:30 PM" / "Closed · …".
  if (!now) return { isOpen: null, label: formatHoursSummary(hours), nextChange: null };
  return computeOpenStatus(hours, now);
}
