import { describe, expect, it } from "vitest";
import { seo, seoLinks } from "~/utils/seo";

describe("seo", () => {
  it("returns OG meta tags", () => {
    const result = seo({
      title: "Test Page",
      description: "A test description",
    });
    expect(result).toEqual(
      expect.arrayContaining([
        { title: "Test Page" },
        { name: "description", content: "A test description" },
        { property: "og:title", content: "Test Page" },
        { property: "og:description", content: "A test description" },
        { property: "og:type", content: "website" },
      ]),
    );
  });

  it("returns Twitter card tags", () => {
    const result = seo({ title: "Test", description: "Desc" });
    expect(result).toEqual(
      expect.arrayContaining([
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Test" },
      ]),
    );
  });

  it("handles article type", () => {
    const result = seo({
      title: "News",
      description: "Article desc",
      type: "article",
      publishedTime: "2025-01-15",
    });
    expect(result).toEqual(
      expect.arrayContaining([
        { property: "og:type", content: "article" },
        { property: "article:published_time", content: "2025-01-15" },
      ]),
    );
  });

  it("seoLinks returns canonical URL", () => {
    const links = seoLinks("/departments");
    expect(links).toHaveLength(1);
    expect(links[0].rel).toBe("canonical");
    expect(links[0].href).toContain("/departments");
  });
});
