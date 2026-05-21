import type { NavTask, NavVerb } from "~/data/nav-verbs";

export function hasMatchingSearchCategory(task: NavTask, searchStr: string): boolean {
  if (task.external) return false;
  const expected = task.search?.category;
  if (!expected) return true;
  const params = new URLSearchParams(searchStr);
  return params.get("category") === expected;
}

export function isTaskActive(task: NavTask, pathname: string, searchStr: string): boolean {
  if (task.external) return false;
  const pathMatches = pathname === task.to || pathname.startsWith(`${task.to}/`);
  if (!pathMatches) return false;
  return hasMatchingSearchCategory(task, searchStr);
}

export function isVerbActive(verb: NavVerb, pathname: string, searchStr: string): boolean {
  const tasks = [...(verb.tasks ?? []), ...(verb.groups?.flatMap((g) => g.tasks) ?? [])];
  return tasks.some((task) => isTaskActive(task, pathname, searchStr));
}
