import { describe, expect, it } from "vitest";
import {
  deriveRiverTrend,
  formatRiverTrend,
  formatRiverValue,
  latestReading,
  parseNumber,
} from "~/lib/river-utils";

describe("river utilities", () => {
  it("parses numeric USGS readings safely", () => {
    expect(parseNumber("245")).toBe(245);
    expect(parseNumber("3.27")).toBe(3.27);
    expect(parseNumber("not-a-number")).toBeNull();
  });

  it("returns the latest valid reading", () => {
    expect(
      latestReading(
        [
          { value: "10", dateTime: "2026-05-21T10:00:00-04:00" },
          { value: "12", dateTime: "2026-05-21T10:15:00-04:00" },
        ],
        "cfs",
      ),
    ).toEqual({ value: 12, observedAt: "2026-05-21T10:15:00-04:00", unit: "cfs" });
  });

  it("detects rising, falling, and steady flow", () => {
    expect(
      deriveRiverTrend([
        { value: "100", dateTime: "2026-05-21T10:00:00-04:00" },
        { value: "108", dateTime: "2026-05-21T10:15:00-04:00" },
      ]),
    ).toBe("rising");
    expect(
      deriveRiverTrend([
        { value: "100", dateTime: "2026-05-21T10:00:00-04:00" },
        { value: "92", dateTime: "2026-05-21T10:15:00-04:00" },
      ]),
    ).toBe("falling");
    expect(
      deriveRiverTrend([
        { value: "100", dateTime: "2026-05-21T10:00:00-04:00" },
        { value: "103", dateTime: "2026-05-21T10:15:00-04:00" },
      ]),
    ).toBe("steady");
  });

  it("formats river values and trend labels", () => {
    expect(formatRiverValue({ value: 1234.56, unit: "cfs", observedAt: "now" }, 0)).toBe(
      "1,235 cfs",
    );
    expect(formatRiverValue(null)).toBe("Not available");
    expect(formatRiverTrend("rising")).toBe("Rising");
  });
});
