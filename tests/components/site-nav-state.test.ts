import { describe, expect, it } from "vitest";
import { NAV_VERBS } from "../../src/data/nav-verbs";
import { hasMatchingSearchCategory, isTaskActive, isVerbActive } from "../../src/components/layout/site-nav-state";

describe("site-nav-state", () => {
  const findVerb = NAV_VERBS.find((v) => v.key === "find");
  if (!findVerb) throw new Error("Missing FIND verb");
  const deptGroup = findVerb.groups?.find((g) => g.headingKey === "verbNav.find.headingDepartments");
  if (!deptGroup) throw new Error("Missing FIND departments group");
  const courtsTask = deptGroup.tasks.find(
    (t) => !t.external && t.labelKey === "verbNav.find.courts",
  );
  if (!courtsTask || courtsTask.external) throw new Error("Missing courts task");

  it("matches category-specific tasks only when query category matches", () => {
    expect(hasMatchingSearchCategory(courtsTask, "category=courts")).toBe(true);
    expect(hasMatchingSearchCategory(courtsTask, "category=administrative")).toBe(false);
    expect(hasMatchingSearchCategory(courtsTask, "")).toBe(false);
  });

  it("marks category task active only when both path and category match", () => {
    expect(isTaskActive(courtsTask, "/departments", "category=courts")).toBe(true);
    expect(isTaskActive(courtsTask, "/departments", "category=finance")).toBe(false);
    expect(isTaskActive(courtsTask, "/documents", "category=courts")).toBe(false);
  });

  it("keeps FIND verb active for category-filtered department pages", () => {
    expect(isVerbActive(findVerb, "/departments", "category=administrative")).toBe(true);
    expect(isVerbActive(findVerb, "/departments", "category=community")).toBe(true);
  });
});
