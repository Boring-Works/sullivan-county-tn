import { describe, expect, it } from "vitest";
import { computeOpenStatus, parseHours } from "~/hooks/useOpenStatus";

describe("parseHours", () => {
  const cases: Array<[string, "always" | object | null]> = [
    ["Monday-Friday, 8am-5pm", { startDay: 1, endDay: 5, openMinutes: 8 * 60, closeMinutes: 17 * 60 }],
    [
      "Monday-Friday, 8am-4:30pm",
      { startDay: 1, endDay: 5, openMinutes: 8 * 60, closeMinutes: 16 * 60 + 30 },
    ],
    [
      "Monday-Friday, 8am-4:30pm (excluding designated holidays)",
      { startDay: 1, endDay: 5, openMinutes: 8 * 60, closeMinutes: 16 * 60 + 30 },
    ],
    [
      "Monday-Friday, 8am-5pm (closed designated holidays)",
      { startDay: 1, endDay: 5, openMinutes: 8 * 60, closeMinutes: 17 * 60 },
    ],
    [
      "Monday-Friday, 8am-5pm (Driver's License & Handgun Permits: 8am-4pm)",
      { startDay: 1, endDay: 5, openMinutes: 8 * 60, closeMinutes: 17 * 60 },
    ],
    ["24/7 dispatch. Administrative office: Monday-Friday, 8am-5pm. Emergencies: 911", "always"],
    ["Monday-Thursday by appointment (excluding designated holidays)", null],
  ];

  for (const [input, expected] of cases) {
    it(`parses: ${input}`, () => {
      expect(parseHours(input)).toEqual(expected);
    });
  }
});

describe("computeOpenStatus", () => {
  // 2026-05-06 is a Wednesday. Use UTC noon to avoid TZ DST drift in tests.
  const wedNoon = new Date("2026-05-06T16:00:00Z"); // 12pm ET
  const satNoon = new Date("2026-05-09T16:00:00Z"); // 12pm ET Saturday
  const wedEvening = new Date("2026-05-06T22:00:00Z"); // 6pm ET Wed (after close)

  it("reports open during business hours", () => {
    const s = computeOpenStatus("Monday-Friday, 8am-4:30pm", wedNoon);
    expect(s.isOpen).toBe(true);
    expect(s.label).toMatch(/Open until/);
  });

  it("reports closed on Saturday", () => {
    const s = computeOpenStatus("Monday-Friday, 8am-5pm", satNoon);
    expect(s.isOpen).toBe(false);
    expect(s.label).toMatch(/Closed/);
  });

  it("reports closed after closing time", () => {
    const s = computeOpenStatus("Monday-Friday, 8am-4:30pm", wedEvening);
    expect(s.isOpen).toBe(false);
  });

  it("returns null isOpen for unparseable strings", () => {
    const s = computeOpenStatus("By appointment only", wedNoon);
    expect(s.isOpen).toBeNull();
    expect(s.label).toBe("See hours");
  });

  it("treats 24/7 as always open", () => {
    const s = computeOpenStatus("24/7 dispatch", wedNoon);
    expect(s.isOpen).toBe(true);
  });

  it("reports closed on a holiday inside business hours", () => {
    // 2026-12-25 (Friday, Christmas Day) noon ET = 17:00 UTC.
    const christmas = new Date("2026-12-25T17:00:00Z");
    const s = computeOpenStatus("Monday-Friday, 8am-4:30pm", christmas);
    expect(s.isOpen).toBe(false);
    expect(s.label).toMatch(/Christmas Day/);
  });

  it("reports closed on observed-Friday for Saturday holiday", () => {
    // July 4, 2026 is Saturday → observed Friday July 3.
    const july3Noon = new Date("2026-07-03T16:00:00Z");
    const s = computeOpenStatus("Monday-Friday, 8am-4:30pm", july3Noon);
    expect(s.isOpen).toBe(false);
    expect(s.label).toMatch(/Independence Day/);
  });
});
