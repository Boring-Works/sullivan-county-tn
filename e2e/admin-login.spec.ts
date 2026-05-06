import { expect, test } from "@playwright/test";

test.describe("admin auth", () => {
  test("login page loads", async ({ page, browserName }) => {
    if (page.viewportSize()!.width < 1024) return;
    await page.goto("/admin/login");
    await expect(page.locator("h1")).toContainText("Admin Login");
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test("wrong password shows error", async ({ page }) => {
    if (page.viewportSize()!.width < 1024) return;
    await page.goto("/admin/login");
    await page.fill('input[type="password"]', "wrong-password-123");
    await page.click('button[type="submit"]');
    await expect(page.locator("body")).toContainText("Invalid");
  });

  test("correct password logs in", async ({ page }) => {
    if (page.viewportSize()!.width < 1024) return;
    await page.goto("/admin/login");
    await page.fill('input[type="password"]', "sullivan-admin-2026");
    await page.click('button[type="submit"]');
    await page.waitForURL("**/admin");
    await expect(page.locator("body")).toContainText("Dashboard");
  });

  test("unauthenticated access is blocked", async ({ page }) => {
    if (page.viewportSize()!.width < 1024) return;
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/admin\/login/);
  });
});

test.describe("admin CRUD", () => {
  test.beforeEach(async ({ page }) => {
    if (page.viewportSize()!.width < 1024) return;
    await page.goto("/admin/login");
    await page.fill('input[type="password"]', "sullivan-admin-2026");
    await page.click('button[type="submit"]');
    await page.waitForURL("**/admin");
  });

  test("news list loads", async ({ page }) => {
    if (page.viewportSize()!.width < 1024) return;
    await page.goto("/admin/news");
    await expect(page.locator("h1, h2")).toContainText("News");
  });

  test("submissions list loads", async ({ page }) => {
    if (page.viewportSize()!.width < 1024) return;
    await page.goto("/admin/submissions");
    await expect(page.locator("h1, h2")).toContainText("Submissions");
  });
});
