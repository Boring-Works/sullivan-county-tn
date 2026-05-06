import { describe, expect, it } from "vitest";
import { commissioners } from "~/data/commissioners";

describe("commissioners data", () => {
  it("has 24 commissioners", () => {
    expect(commissioners.length).toBeGreaterThanOrEqual(21);
  });

  it("every commissioner has required fields", () => {
    for (const c of commissioners) {
      expect(c.name).toBeTruthy();
      expect(c.district).toBeGreaterThanOrEqual(1);
      expect(c.district).toBeLessThanOrEqual(11);
    }
  });

  it("all 11 districts are represented", () => {
    const districts = new Set(commissioners.map((c) => c.district));
    expect(districts.size).toBeGreaterThanOrEqual(10);
  });

  it("each district has 1-3 commissioners", () => {
    const byDistrict = new Map<number, number>();
    for (const c of commissioners) {
      byDistrict.set(c.district, (byDistrict.get(c.district) || 0) + 1);
    }
    for (const [, count] of byDistrict) {
      expect(count).toBeGreaterThanOrEqual(1);
      expect(count).toBeLessThanOrEqual(3);
    }
  });

  it("no duplicate names", () => {
    const names = commissioners.map((c) => c.name);
    expect(new Set(names).size).toBe(names.length);
  });
});
