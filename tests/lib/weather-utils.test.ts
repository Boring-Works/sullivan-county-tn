import { describe, expect, it } from "vitest";
import { formatPercent, formatWind, parseWindDegrees, parseWindSpeed } from "~/lib/weather-utils";

describe("weather utilities", () => {
  it("converts NWS wind directions to compass degrees", () => {
    expect(parseWindDegrees("N")).toBe(0);
    expect(parseWindDegrees("ENE")).toBe(67.5);
    expect(parseWindDegrees("SW")).toBe(225);
    expect(parseWindDegrees("NNW")).toBe(337.5);
  });

  it("treats blank or unknown directions as unavailable", () => {
    expect(parseWindDegrees("")).toBeNull();
    expect(parseWindDegrees("variable")).toBeNull();
  });

  it("parses and formats calm wind without implying north wind", () => {
    expect(parseWindSpeed("0 mph")).toBe(0);
    expect(formatWind("0 mph", "")).toBe("Calm");
    expect(formatWind("8 mph", "NW")).toBe("8 mph NW");
  });

  it("formats precipitation chance copy", () => {
    expect(formatPercent(null)).toBe("Not listed");
    expect(formatPercent(70)).toBe("70%");
  });
});
