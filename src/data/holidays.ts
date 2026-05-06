/**
 * Sullivan County observed holidays — when government offices are closed.
 *
 * Source: the holiday list in /calendar prose. Dates are computed per year,
 * including the federal "observed-on-Friday-or-Monday" rule when a holiday
 * falls on a weekend.
 */

export interface Holiday {
  /** YYYY-MM-DD in America/New_York. */
  date: string;
  name: string;
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

function dateKey(year: number, monthZero: number, day: number): string {
  return `${year}-${pad(monthZero + 1)}-${pad(day)}`;
}

/** N-th occurrence of a weekday in a month (1-based; "last" supported). */
function nthWeekday(
  year: number,
  monthZero: number,
  weekday: number, // 0=Sun..6=Sat
  nth: number | "last",
): { day: number } {
  if (nth === "last") {
    const lastDay = new Date(year, monthZero + 1, 0).getDate();
    for (let day = lastDay; day >= 1; day -= 1) {
      if (new Date(year, monthZero, day).getDay() === weekday) return { day };
    }
    throw new Error("unreachable");
  }
  let day = 1;
  while (day <= 7) {
    if (new Date(year, monthZero, day).getDay() === weekday) {
      return { day: day + (nth - 1) * 7 };
    }
    day += 1;
  }
  throw new Error("unreachable");
}

/**
 * Compute the date of Easter Sunday using the anonymous Gregorian algorithm.
 * Returns 0-based month + day.
 */
function easterSunday(year: number): { monthZero: number; day: number } {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const L = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * L) / 451);
  const month = Math.floor((h + L - 7 * m + 114) / 31);
  const day = ((h + L - 7 * m + 114) % 31) + 1;
  return { monthZero: month - 1, day };
}

/**
 * If a fixed-date holiday falls on a weekend, government typically observes
 * the nearest weekday (Saturday → Friday, Sunday → Monday).
 */
function observedFixed(year: number, monthZero: number, day: number): { date: string } {
  const d = new Date(year, monthZero, day);
  const dow = d.getDay();
  if (dow === 0) {
    // Sunday → observe Monday
    const next = new Date(year, monthZero, day + 1);
    return { date: dateKey(next.getFullYear(), next.getMonth(), next.getDate()) };
  }
  if (dow === 6) {
    // Saturday → observe Friday
    const prev = new Date(year, monthZero, day - 1);
    return { date: dateKey(prev.getFullYear(), prev.getMonth(), prev.getDate()) };
  }
  return { date: dateKey(year, monthZero, day) };
}

const cache = new Map<number, Holiday[]>();

export function getHolidaysForYear(year: number): Holiday[] {
  const cached = cache.get(year);
  if (cached) return cached;

  const list: Holiday[] = [];

  // Fixed-date holidays (with weekend observance).
  list.push({ ...observedFixed(year, 0, 1), name: "New Year's Day" });
  list.push({ ...observedFixed(year, 6, 4), name: "Independence Day" });
  list.push({ ...observedFixed(year, 10, 11), name: "Veterans Day" });
  list.push({ date: dateKey(year, 11, 24), name: "Christmas Eve" });
  list.push({ ...observedFixed(year, 11, 25), name: "Christmas Day" });

  // Floating Monday holidays.
  const mlk = nthWeekday(year, 0, 1, 3);
  list.push({ date: dateKey(year, 0, mlk.day), name: "Martin Luther King Jr. Day" });

  const presidents = nthWeekday(year, 1, 1, 3);
  list.push({ date: dateKey(year, 1, presidents.day), name: "Presidents' Day" });

  const memorial = nthWeekday(year, 4, 1, "last");
  list.push({ date: dateKey(year, 4, memorial.day), name: "Memorial Day" });

  const labor = nthWeekday(year, 8, 1, 1);
  list.push({ date: dateKey(year, 8, labor.day), name: "Labor Day" });

  const columbus = nthWeekday(year, 9, 1, 2);
  list.push({ date: dateKey(year, 9, columbus.day), name: "Columbus Day" });

  // Thanksgiving + Black Friday.
  const thanksgiving = nthWeekday(year, 10, 4, 4);
  list.push({ date: dateKey(year, 10, thanksgiving.day), name: "Thanksgiving" });
  list.push({
    date: dateKey(year, 10, thanksgiving.day + 1),
    name: "Day after Thanksgiving",
  });

  // Good Friday — the Friday before Easter Sunday.
  const easter = easterSunday(year);
  const easterDate = new Date(year, easter.monthZero, easter.day);
  const goodFridayDate = new Date(easterDate);
  goodFridayDate.setDate(easterDate.getDate() - 2);
  list.push({
    date: dateKey(
      goodFridayDate.getFullYear(),
      goodFridayDate.getMonth(),
      goodFridayDate.getDate(),
    ),
    name: "Good Friday",
  });

  list.sort((a, b) => a.date.localeCompare(b.date));
  cache.set(year, list);
  return list;
}

/** Lookup by date key; returns the holiday name if today is observed-closed. */
export function findHoliday(dateKeyValue: string): Holiday | undefined {
  const year = Number.parseInt(dateKeyValue.slice(0, 4), 10);
  if (!Number.isFinite(year)) return undefined;
  return getHolidaysForYear(year).find((h) => h.date === dateKeyValue);
}

/** Format a Date in America/New_York as YYYY-MM-DD. */
export function nyDateKey(at: Date): string {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return fmt.format(at); // en-CA returns YYYY-MM-DD natively
}
