import { describe, expect, it } from "vitest";
import { buildIcs, formatNyDateShort, nextOccurrence } from "~/lib/recurrence";

describe("nextOccurrence", () => {
  it("computes the 3rd Thursday of the month from May 1, 2026", () => {
    const from = new Date("2026-05-01T05:00:00Z"); // May 1 2026 in NY
    const next = nextOccurrence(
      { dayOfWeek: 4, nthOfMonth: 3, time: "18:30" },
      from,
    );
    // May 21, 2026 is the 3rd Thursday.
    expect(formatNyDateShort(next)).toMatch(/May 21/);
  });

  it("rolls forward to next month if this month's nth has passed", () => {
    const from = new Date("2026-05-22T12:00:00Z"); // After May 21
    const next = nextOccurrence(
      { dayOfWeek: 4, nthOfMonth: 3, time: "18:30" },
      from,
    );
    expect(formatNyDateShort(next)).toMatch(/Jun 18/);
  });

  it("handles 'last' nth", () => {
    const from = new Date("2026-05-01T05:00:00Z");
    const next = nextOccurrence(
      { dayOfWeek: 5, nthOfMonth: "last", time: "12:00" },
      from,
    );
    // Last Friday in May 2026 is May 29.
    expect(formatNyDateShort(next)).toMatch(/May 29/);
  });

  it("crosses year boundary", () => {
    const from = new Date("2026-12-25T05:00:00Z");
    const next = nextOccurrence(
      { dayOfWeek: 4, nthOfMonth: 1, time: "18:30" },
      from,
    );
    // 1st Thursday of January 2027 is January 7.
    expect(formatNyDateShort(next)).toMatch(/Jan 7/);
  });
});

describe("buildIcs", () => {
  const start = new Date("2026-05-21T22:30:00Z");

  it("emits VCALENDAR/VEVENT", () => {
    const ics = buildIcs({
      uid: "test-uid",
      title: "Commission",
      location: "Courthouse",
      start,
      durationMinutes: 60,
    });
    expect(ics).toContain("BEGIN:VCALENDAR");
    expect(ics).toContain("BEGIN:VEVENT");
    expect(ics).toContain("UID:test-uid");
    expect(ics).toContain("SUMMARY:Commission");
    expect(ics).toContain("LOCATION:Courthouse");
    expect(ics).toContain("END:VEVENT");
    expect(ics).toContain("END:VCALENDAR");
  });

  it("escapes commas and semicolons", () => {
    const ics = buildIcs({
      uid: "u",
      title: "Test, with; specials",
      start,
      durationMinutes: 60,
    });
    expect(ics).toContain("SUMMARY:Test\\, with\\; specials");
  });
});
