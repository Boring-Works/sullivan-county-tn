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

export interface MeetingAction {
  type: "agenda" | "minutes" | "watch" | "contact" | "details";
  label: string;
  href: string;
  external?: boolean;
}

export interface RecurringMeeting {
  name: string;
  schedule: string;
  time: string;
  location: string;
  notes?: string;
  rule?: RecurrenceRule;
  actions: MeetingAction[];
}

export interface UpcomingEvent {
  name: string;
  startsAtLabel: string;
  location?: string;
  description: string;
}

export const recurringMeetings: RecurringMeeting[] = [
  {
    name: COMMISSION_REGULAR_SESSION_NAME,
    schedule: "3rd Thursday of each month",
    time: "6:30 PM",
    location: COURTHOUSE,
    notes: "Regular public meeting of the Sullivan County Board of Commissioners.",
    rule: COMMISSION_REGULAR_SESSION_RULE,
    actions: [
      {
        type: "watch",
        label: "Watch live",
        href: "https://www.youtube.com/@sullivancountycommission",
        external: true,
      },
      { type: "agenda", label: "Agendas and minutes", href: "/documents" },
      { type: "details", label: "Commissioners", href: "/commissioners" },
    ],
  },
  {
    name: "County Commission Work Session",
    schedule: "1st Thursday of each month",
    time: "6:30 PM",
    location: COURTHOUSE,
    rule: { dayOfWeek: 4, nthOfMonth: 1, time: "18:30", durationMinutes: 120 },
    actions: [
      { type: "agenda", label: "Agendas and minutes", href: "/documents" },
      { type: "details", label: "Commissioners", href: "/commissioners" },
    ],
  },
  {
    name: "Budget Committee",
    schedule: "As scheduled during budget season (May-June)",
    time: "Varies",
    location: COURTHOUSE,
    actions: [{ type: "agenda", label: "Budget documents", href: "/documents" }],
  },
  {
    name: "Beer Board",
    schedule: "As needed",
    time: "Varies",
    location: COURTHOUSE,
    actions: [{ type: "contact", label: "Contact county offices", href: "/contact" }],
  },
  {
    name: "Planning Commission",
    schedule: "2nd Tuesday of each month",
    time: "6:00 PM",
    location: COURTHOUSE,
    rule: { dayOfWeek: 2, nthOfMonth: 2, time: "18:00", durationMinutes: 90 },
    actions: [
      { type: "agenda", label: "Planning documents", href: "/documents" },
      { type: "contact", label: "Planning & Codes", href: "/departments/planning-and-codes" },
    ],
  },
  {
    name: "Board of Zoning Appeals",
    schedule: "4th Tuesday of each month (as needed)",
    time: "6:00 PM",
    location: COURTHOUSE,
    rule: { dayOfWeek: 2, nthOfMonth: 4, time: "18:00", durationMinutes: 90 },
    actions: [
      { type: "agenda", label: "Zoning documents", href: "/documents" },
      { type: "contact", label: "Planning & Codes", href: "/departments/planning-and-codes" },
    ],
  },
];

export const countyHolidays = [
  { name: "New Year's Day", date: "January 1" },
  { name: "Martin Luther King Jr. Day", date: "3rd Monday in January" },
  { name: "Presidents' Day", date: "3rd Monday in February" },
  { name: "Good Friday", date: "Friday before Easter" },
  { name: "Memorial Day", date: "Last Monday in May" },
  { name: "Independence Day", date: "July 4" },
  { name: "Labor Day", date: "1st Monday in September" },
  { name: "Columbus Day", date: "2nd Monday in October" },
  { name: "Veterans Day", date: "November 11" },
  { name: "Thanksgiving", date: "4th Thursday & Friday in November" },
  { name: "Christmas Eve & Day", date: "December 24-25" },
];

export const upcomingEvents: UpcomingEvent[] = [
  {
    name: "Regular Session Sullivan County Board of Commissioners",
    startsAtLabel: "May 21 @ 6:00 PM EDT",
    location: COURTHOUSE,
    description:
      "The Board of Commissioners meets in regular session to consider county business, public items, and official actions.",
  },
  {
    name: "Memorial Day — Offices Closed",
    startsAtLabel: "May 25 @ 8:00 AM EDT",
    description:
      "All Sullivan County government offices are closed in observance of Memorial Day. Emergency services remain available 24/7.",
  },
];
