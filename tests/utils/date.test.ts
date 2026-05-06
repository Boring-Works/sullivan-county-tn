import { describe, expect, it } from "vitest";
import { formatDate } from "~/lib/date-utils";

describe("formatDate", () => {
  it("formats ISO date to readable format", () => {
    expect(formatDate("2025-01-15")).toBe("January 15, 2025");
  });

  it("formats December date", () => {
    expect(formatDate("2024-12-01")).toBe("December 1, 2024");
  });

  it("handles single-digit month and day", () => {
    expect(formatDate("2025-03-05")).toBe("March 5, 2025");
  });

  it("handles end of year", () => {
    expect(formatDate("2025-12-31")).toBe("December 31, 2025");
  });
});
