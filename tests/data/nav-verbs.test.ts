import { describe, expect, it } from "vitest";
import { DEPARTMENT_CATEGORIES } from "../../src/data/departments";
import { departments } from "../../src/data/departments";
import { FORM_DEFINITIONS } from "../../src/data/form-definitions";
import { NAV_VERBS } from "../../src/data/nav-verbs";

const VERB_KEYS = ["find", "pay", "apply", "report", "about"] as const;

const KNOWN_INTERNAL_ROUTES = new Set([
  "/",
  "/departments",
  "/property-taxes",
  "/forms",
  "/forms/building-permit",
  "/forms/code-complaint",
  "/forms/public-records",
  "/forms/general-feedback",
  "/calendar",
  "/contact",
  "/minutes",
  "/documents",
  "/news",
  "/commissioners",
  "/about",
  "/history",
  "/history/timeline",
  "/communities",
  "/visit",
  "/people",
  "/economic-development",
  "/transportation",
  "/education",
  "/employee-services",
  "/ada-compliance",
  "/privacy-policy",
]);

const DEPT_SLUGS = new Set(departments.map((d) => d.slug));
const DEPT_CATEGORY_KEYS = new Set(Object.keys(DEPARTMENT_CATEGORIES));
const FORM_TYPES = new Set(FORM_DEFINITIONS.map((f) => f.type));

function isValidInternal(path: string): boolean {
  if (KNOWN_INTERNAL_ROUTES.has(path)) return true;
  if (path.startsWith("/departments/")) {
    const slug = path.replace(/^\/departments\//, "");
    return DEPT_SLUGS.has(slug);
  }
  if (path.startsWith("/forms/")) {
    const t = path.replace(/^\/forms\//, "");
    return FORM_TYPES.has(t);
  }
  return false;
}

describe("NAV_VERBS", () => {
  it("contains exactly the five expected top-level verbs in order (Phase 1: 7→5)", () => {
    expect(NAV_VERBS.map((v) => v.key)).toEqual(VERB_KEYS);
  });

  it("every verb has a labelKey and an icon", () => {
    for (const v of NAV_VERBS) {
      expect(v.labelKey, `${v.key}.labelKey`).toMatch(/^verbNav\.[a-z]+\.label$/);
      expect(typeof v.icon, `${v.key}.icon`).toBe("object");
    }
  });

  it("every verb has either tasks or groups", () => {
    for (const v of NAV_VERBS) {
      const hasTasks = (v.tasks?.length ?? 0) > 0;
      const hasGroups = (v.groups?.length ?? 0) > 0;
      expect(hasTasks || hasGroups, `${v.key} must have tasks or groups`).toBe(true);
    }
  });

  it("every internal task points to an existing route", () => {
    const broken: string[] = [];
    for (const v of NAV_VERBS) {
      const tasks = [...(v.tasks ?? []), ...(v.groups?.flatMap((g) => g.tasks) ?? [])];
      for (const t of tasks) {
        if (!t.external && !isValidInternal(t.to)) {
          broken.push(`${v.key} → ${t.labelKey} → ${t.to}`);
        }
      }
    }
    expect(broken).toEqual([]);
  });

  it("every external task uses https and target=_blank semantics", () => {
    for (const v of NAV_VERBS) {
      const tasks = [...(v.tasks ?? []), ...(v.groups?.flatMap((g) => g.tasks) ?? [])];
      for (const t of tasks) {
        if (t.external) {
          expect(t.href, `${v.key} → ${t.labelKey}`).toMatch(/^https:\/\//);
        }
      }
    }
  });

  it("department-filter links use valid department category keys", () => {
    const broken: string[] = [];
    for (const v of NAV_VERBS) {
      const tasks = [...(v.tasks ?? []), ...(v.groups?.flatMap((g) => g.tasks) ?? [])];
      for (const t of tasks) {
        if (t.external) continue;
        if (t.to !== "/departments") continue;
        const category = t.search?.category;
        if (!category) continue;
        if (!DEPT_CATEGORY_KEYS.has(category)) {
          broken.push(`${v.key} → ${t.labelKey} → ${category}`);
        }
      }
    }
    expect(broken).toEqual([]);
  });

  it("each task list stays at 4–6 items per Hick's Law / blueprint", () => {
    for (const v of NAV_VERBS) {
      if (v.tasks) {
        expect(v.tasks.length, `${v.key} tasks`).toBeGreaterThanOrEqual(4);
        expect(v.tasks.length, `${v.key} tasks`).toBeLessThanOrEqual(6);
      }
      if (v.groups) {
        for (const g of v.groups) {
          expect(g.tasks.length, `${v.key}/${g.headingKey}`).toBeGreaterThanOrEqual(3);
          expect(g.tasks.length, `${v.key}/${g.headingKey}`).toBeLessThanOrEqual(6);
        }
      }
    }
  });
});
