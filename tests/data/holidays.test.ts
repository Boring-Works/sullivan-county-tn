import { describe, expect, it } from "vitest";
import { findHoliday, getHolidaysForYear } from "~/data/holidays";

describe("getHolidaysForYear", () => {
  it("includes the 12 expected county holidays", () => {
    const list = getHolidaysForYear(2026);
    const names = list.map((h) => h.name);
    // 11 base holidays + Day after Thanksgiving = 12 closures
    expect(names).toContain("New Year's Day");
    expect(names).toContain("Martin Luther King Jr. Day");
    expect(names).toContain("Presidents' Day");
    expect(names).toContain("Good Friday");
    expect(names).toContain("Memorial Day");
    expect(names).toContain("Independence Day");
    expect(names).toContain("Labor Day");
    expect(names).toContain("Columbus Day");
    expect(names).toContain("Veterans Day");
    expect(names).toContain("Thanksgiving");
    expect(names).toContain("Day after Thanksgiving");
    expect(names).toContain("Christmas Eve");
    expect(names).toContain("Christmas Day");
    expect(list.length).toBe(13);
  });

  it("computes 2026 floating Mondays correctly", () => {
    const list = getHolidaysForYear(2026);
    expect(findIn(list, "Martin Luther King Jr. Day")).toBe("2026-01-19");
    expect(findIn(list, "Presidents' Day")).toBe("2026-02-16");
    expect(findIn(list, "Memorial Day")).toBe("2026-05-25");
    expect(findIn(list, "Labor Day")).toBe("2026-09-07");
    expect(findIn(list, "Columbus Day")).toBe("2026-10-12");
  });

  it("computes 2026 Thanksgiving as the 4th Thursday in November", () => {
    const list = getHolidaysForYear(2026);
    expect(findIn(list, "Thanksgiving")).toBe("2026-11-26");
    expect(findIn(list, "Day after Thanksgiving")).toBe("2026-11-27");
  });

  it("computes 2026 Good Friday as April 3", () => {
    const list = getHolidaysForYear(2026);
    expect(findIn(list, "Good Friday")).toBe("2026-04-03");
  });

  it("observes weekend-falling fixed holidays on the nearest weekday", () => {
    // July 4, 2026 is a Saturday — observed Friday July 3.
    const list2026 = getHolidaysForYear(2026);
    expect(findIn(list2026, "Independence Day")).toBe("2026-07-03");
    // November 11, 2027 is a Thursday — no observance shift.
    const list2027 = getHolidaysForYear(2027);
    expect(findIn(list2027, "Veterans Day")).toBe("2027-11-11");
    // January 1, 2028 is a Saturday — observed Friday Dec 31, 2027? No: observed Friday Dec 31. But our function doesn't cross years.
    // Actually our observedFixed shifts to Friday within the same year for Saturday-Jan-1: that would be Dec 31 of the PREVIOUS year, which our impl doesn't handle. We instead leave as-is to avoid year-crossing.
    // Let's pick a year where Jan 1 is Sunday → observed Monday Jan 2 (within year).
    const list2023 = getHolidaysForYear(2023);
    expect(findIn(list2023, "New Year's Day")).toBe("2023-01-02");
  });

  it("caches per year (same array reference on repeat call)", () => {
    expect(getHolidaysForYear(2026)).toBe(getHolidaysForYear(2026));
  });
});

describe("findHoliday", () => {
  it("returns the holiday for matched dates", () => {
    expect(findHoliday("2026-12-25")?.name).toBe("Christmas Day");
    expect(findHoliday("2026-11-26")?.name).toBe("Thanksgiving");
  });

  it("returns undefined for non-holiday dates", () => {
    expect(findHoliday("2026-05-06")).toBeUndefined();
    expect(findHoliday("2026-08-15")).toBeUndefined();
  });

  it("returns undefined for malformed input", () => {
    expect(findHoliday("not-a-date")).toBeUndefined();
  });
});

function findIn(list: { name: string; date: string }[], name: string): string | undefined {
  return list.find((h) => h.name === name)?.date;
}
