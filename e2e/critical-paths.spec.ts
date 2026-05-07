import { expect, test } from "@playwright/test";

test.describe("homepage", () => {
  test("loads with nav and content", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('nav[aria-label="Main navigation"]')).toBeVisible();
    await expect(page.locator("body")).toContainText("Sullivan County");
    await expect(page.locator("body")).toContainText("Most-used services");
  });

  test("footer renders", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    await expect(footer).toContainText("Sullivan County");
  });
});

test.describe("navigation", () => {
  test("department listing loads", async ({ page }) => {
    await page.goto("/departments");
    await expect(page.locator("h1, h2")).toContainText(["Departments"]);
  });

  test("commissioners loads", async ({ page }) => {
    await page.goto("/commissioners");
    await expect(page.locator("h1, h2")).toContainText(["Commissioner"]);
  });

  test("news loads", async ({ page }) => {
    await page.goto("/news");
    await expect(page.locator("h1, h2")).toContainText(["News"]);
  });

  test("documents loads", async ({ page }) => {
    await page.goto("/documents");
    await expect(page.locator("h1, h2")).toContainText(["Document"]);
  });

  test("contact loads", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("h1, h2")).toContainText(["Contact"]);
  });

  test("calendar loads", async ({ page }) => {
    await page.goto("/calendar");
    await expect(page.locator("h1, h2")).toContainText(["Calend"]);
  });
});

test.describe("404 page", () => {
  test("shows branded 404 for unknown route", async ({ page }) => {
    await page.goto("/nonexistent-page-12345");
    await expect(page.locator("h1")).toContainText("Page Not Found");
    await expect(page.locator("body")).toContainText("looking for");
  });

  test("go home button navigates to homepage", async ({ page }) => {
    await page.goto("/nonexistent-page-12345");
    const homeLink = page.locator('a[href="/"]').first();
    if ((await homeLink.count()) > 0) {
      await homeLink.click();
      await expect(page).toHaveURL("/");
    }
  });
});

test.describe("language toggle", () => {
  test("Spanish toggle available in nav", async ({ page }) => {
    await page.goto("/");
    const navText = await page.locator('nav[aria-label="Main navigation"]').textContent();
    expect(navText?.toLowerCase()).toContain("es");
  });
});

test.describe("history pages", () => {
  test("history index loads", async ({ page }) => {
    await page.goto("/history");
    await expect(page.locator("h1")).toContainText("The Founding Story");
  });

  test("timeline loads", async ({ page }) => {
    await page.goto("/history/timeline");
    await expect(page.locator("h1, h2")).toContainText(["Timeline"]);
  });
});

test.describe("privacy and ADA", () => {
  test("privacy policy loads", async ({ page }) => {
    await page.goto("/privacy-policy");
    await expect(page.locator("h1, h2")).toContainText(["Privacy"]);
  });

  test("ADA compliance loads", async ({ page }) => {
    await page.goto("/ada-compliance");
    await expect(page.locator("h1, h2")).toContainText(["ADA"]);
  });
});
