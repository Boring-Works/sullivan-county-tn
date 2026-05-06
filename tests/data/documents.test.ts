import { describe, expect, it } from "vitest";
import { CATEGORIES, documents } from "~/data/documents";

describe("documents data", () => {
  it("has documents", () => {
    expect(documents.length).toBeGreaterThan(50);
  });

  it("every document has required fields", () => {
    for (const doc of documents) {
      expect(doc.name).toBeTruthy();
      expect(doc.href).toBeTruthy();
      expect(doc.href).toMatch(/^\//);
      expect(doc.type).toBeTruthy();
      expect(doc.category).toBeTruthy();
    }
  });

  it("all document types are valid", () => {
    const validTypes = ["PDF", "DOC", "DOCX", "TIF"];
    for (const doc of documents) {
      expect(validTypes).toContain(doc.type);
    }
  });

  it("all categories match CATEGORIES list", () => {
    const validCategories = CATEGORIES.map((c) => c.name);
    for (const doc of documents) {
      expect(validCategories).toContain(doc.category);
    }
  });

  it("no duplicate document paths", () => {
    const paths = documents.map((d) => d.href);
    expect(new Set(paths).size).toBe(paths.length);
  });
});
