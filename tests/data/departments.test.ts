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

  it("every dept has a valid phone number on contact", () => {
    // Allow optional " Extension N" / " ext N" / " x N" suffix.
    const phoneRe = /^\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}(\s+(extension|ext|x)\s*\d+)?$/i;
    for (const dept of departments) {
      expect(dept.contact.phone, dept.slug).toMatch(phoneRe);
    }
  });

  it("staff phones, when present, follow valid format", () => {
    const phoneRe = /^\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}(\s+(extension|ext|x)\s*\d+)?$/i;
    for (const dept of departments) {
      for (const member of dept.staff ?? []) {
        if (member.phone) {
          expect(member.phone, `${dept.slug}/${member.name}`).toMatch(phoneRe);
        }
      }
    }
  });

  it("contact emails contain @ and a TLD", () => {
    for (const dept of departments) {
      if (dept.contact.email) {
        expect(dept.contact.email, dept.slug).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
      }
    }
  });

  it("staff emails, when present, are well-formed", () => {
    for (const dept of departments) {
      for (const member of dept.staff ?? []) {
        if (member.email) {
          expect(member.email, `${dept.slug}/${member.name}`).toMatch(
            /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
          );
        }
      }
    }
  });
});
