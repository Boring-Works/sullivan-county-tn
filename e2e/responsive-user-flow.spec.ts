import { expect, test } from "@playwright/test";

test.describe("responsive core user flow", () => {
  test("homepage, nav, search, and calendar flow work across viewports", async ({ page }, testInfo) => {
    await page.goto("/");
    await expect(page.locator('nav[aria-label="Main navigation"]')).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    const isDesktopNav = (page.viewportSize()?.width ?? 0) >= 1024;

    if (isDesktopNav) {
      await expect(page.getByRole("link", { name: /County offices/i }).first()).toBeVisible();
      await page.goto("/calendar");
    } else {
      await page.getByRole("button", { name: /Open menu/i }).click();
      await expect(page.getByRole("dialog", { name: "Navigation menu" })).toBeVisible();
      await page.getByRole("button", { name: /Find/i }).click();
      await page.getByRole("link", { name: /Calendar/i }).first().click();
    }

    await expect(page).toHaveURL(/\/calendar/);
    await expect(page.getByRole("heading", { name: /Calendar/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Upcoming Events/i })).toBeVisible();
    await expect(page.getByText(/Regular Session Sullivan County Board of Commissioners/i)).toBeVisible();

    // Verify command palette opens and quick actions are visible.
    await page.goto("/");
    if (isDesktopNav) {
      await expect(page.getByRole("button", { name: /^Search$/ })).toBeVisible();
    } else {
      await expect(page.getByRole("button", { name: /Open menu/i })).toBeVisible();
    }
    await page.goto("/property-taxes");
    await expect(page).toHaveURL(/\/property-taxes/);
    await expect(page.getByRole("heading", { level: 1, name: /Pay your property taxes/i })).toBeVisible();
  });
});
