import { describe, expect, it } from "vitest";
import { isPropertyTaxSeason } from "../../src/components/home/SeasonalRibbon";

describe("isPropertyTaxSeason", () => {
  it("is in season during October", () => {
    expect(isPropertyTaxSeason(new Date("2026-10-15T15:00:00Z"))).toBe(true);
  });

  it("is in season during November", () => {
    expect(isPropertyTaxSeason(new Date("2026-11-30T15:00:00Z"))).toBe(true);
  });

  it("is in season during December", () => {
    expect(isPropertyTaxSeason(new Date("2026-12-25T15:00:00Z"))).toBe(true);
  });

  it("is in season during January", () => {
    expect(isPropertyTaxSeason(new Date("2026-01-15T15:00:00Z"))).toBe(true);
  });

  it("is in season on the February 28 deadline", () => {
    expect(isPropertyTaxSeason(new Date("2026-02-28T15:00:00Z"))).toBe(true);
  });

  it("is OUT of season in March", () => {
    expect(isPropertyTaxSeason(new Date("2026-03-15T15:00:00Z"))).toBe(false);
  });

  it("is OUT of season in summer", () => {
    expect(isPropertyTaxSeason(new Date("2026-07-04T15:00:00Z"))).toBe(false);
  });

  it("is OUT of season in September", () => {
    expect(isPropertyTaxSeason(new Date("2026-09-30T15:00:00Z"))).toBe(false);
  });
});
