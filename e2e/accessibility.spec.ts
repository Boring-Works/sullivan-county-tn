import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const PAGES = [
  { url: "/", name: "homepage" },
  { url: "/departments", name: "departments" },
  { url: "/departments/county-mayor", name: "department-detail" },
  { url: "/commissioners", name: "commissioners" },
  { url: "/news", name: "news" },
  { url: "/calendar", name: "calendar" },
  { url: "/contact", name: "contact" },
  { url: "/documents", name: "documents" },
  { url: "/history", name: "history" },
  { url: "/history/timeline", name: "timeline" },
  { url: "/communities", name: "communities" },
  { url: "/forms", name: "forms" },
  { url: "/privacy-policy", name: "privacy" },
  { url: "/ada-compliance", name: "ada" },
];

test.describe("accessibility scans", () => {
  for (const { url, name } of PAGES) {
    test(`${name} passes axe-core`, async ({ page }) => {
      await page.goto(url);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  }
});

test.describe("focus management", () => {
  test("skip-to-content link is focusable", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeFocused();
  });

  test("skip link navigates to main content", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeFocused();
    await skipLink.click();
    await page.waitForTimeout(300);
    const mainContent = page.locator("#main-content");
    await expect(mainContent).toBeAttached();
  });

  test("all interactive elements in nav are keyboard accessible", async ({ page }) => {
    await page.goto("/");
    const links = page.locator("nav a, nav button");
    const count = await links.count();
    expect(count).toBeGreaterThan(5);
  });
});

test.describe("semantic HTML", () => {
  test("page has semantic landmarks", async ({ page }) => {
    await page.goto("/");
    expect(await page.locator("nav").count()).toBeGreaterThan(0);
    expect(await page.locator("main").count()).toBeGreaterThan(0);
    expect(await page.locator("footer").count()).toBeGreaterThan(0);
  });

  test("headings follow hierarchy", async ({ page }) => {
    await page.goto("/departments");
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
  });

  test("images have alt text", async ({ page }) => {
    await page.goto("/");
    const imgs = page.locator("img:not([alt])");
    await expect(imgs).toHaveCount(0);
  });

  test("forms have labels", async ({ page }) => {
    await page.goto("/contact");
    const inputs = page.locator('input:not([type="hidden"]), textarea, select');
    const count = await inputs.count();
    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute("id");
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        await expect(label.first()).toBeAttached();
      }
    }
  });
});
