import { describe, expect, it } from "vitest";
import { DEPARTMENT_CATEGORIES, departments } from "~/data/departments";

describe("departments data", () => {
  it("has 21 departments", () => {
    expect(departments.length).toBeGreaterThanOrEqual(21);
  });

  it("every department has required fields", () => {
    for (const dept of departments) {
      expect(dept.slug).toBeTruthy();
      expect(dept.name).toBeTruthy();
      expect(dept.category).toBeTruthy();
      expect(dept.head).toBeDefined();
      expect(dept.head.name).toBeTruthy();
    }
  });

  it("all slugs are unique", () => {
    const slugs = departments.map((d) => d.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("all categories are valid", () => {
    const validCategories = Object.keys(DEPARTMENT_CATEGORIES);
    for (const dept of departments) {
      expect(validCategories).toContain(dept.category);
    }
  });

  it("all phone numbers follow valid format", () => {
    for (const dept of departments) {
      if (dept.head.phone) {
        expect(dept.head.phone).toMatch(/^\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/);
      }
    }
  });

  it("all emails contain @", () => {
    for (const dept of departments) {
      if (dept.head.email) {
        expect(dept.head.email).toContain("@");
      }
    }
  });
});
