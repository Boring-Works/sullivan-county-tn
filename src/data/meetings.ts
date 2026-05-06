import type { RecurrenceRule } from "~/lib/recurrence";

export const COURTHOUSE = "Sullivan County Courthouse, Blountville, TN";

/**
 * The commission's regular session — the marquee monthly meeting that drives the
 * homepage NextMeetingCard, the hero almanac tile, and Event JSON-LD on /calendar.
 * Single source of truth: change here when the commission updates its schedule.
 */
export const COMMISSION_REGULAR_SESSION_RULE: RecurrenceRule = {
  dayOfWeek: 4, // Thursday
  nthOfMonth: 3,
  time: "18:30",
  durationMinutes: 120,
};

export const COMMISSION_REGULAR_SESSION_NAME = "County Commission Regular Session";
