import { describe, expect, it } from "vitest";
import { documents } from "~/data/documents";
import { buildSearchIndex } from "~/data/search-index";

describe("search index", () => {
  const index = buildSearchIndex();

  it("sends document results directly to the matched document", () => {
    const indexedDocs = index.filter((item) => item.type === "document");
    expect(indexedDocs).toHaveLength(documents.length);
    for (const doc of documents) {
      expect(indexedDocs.some((item) => item.title === doc.name && item.url === doc.href)).toBe(true);
    }
  });

  it("includes task-oriented navigation entries", () => {
    expect(index.some((item) => item.type === "task" && item.title.includes("Property"))).toBe(true);
    expect(index.some((item) => item.url === "/forms/public-records")).toBe(true);
  });

  it("uses citizen verb names for task categories and descriptions", () => {
    const task = index.find((item) => item.type === "task" && item.url === "/property-taxes");
    expect(task?.category).toBe("Pay");
    expect(task?.description).toContain("Pay task");
    expect(task?.description).not.toContain("Label task");
  });

  it("does not index empty URLs", () => {
    for (const item of index) expect(item.url).toBeTruthy();
  });
});
