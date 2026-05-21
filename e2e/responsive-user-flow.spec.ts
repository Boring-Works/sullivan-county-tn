import { expect, test } from "@playwright/test";

test.describe("responsive core user flow", () => {
  test("homepage, nav, search, and calendar flow work across viewports", async ({ page }, testInfo) => {
    await page.goto("/");
    await expect(page.locator('nav[aria-label="Main navigation"]')).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    const isDesktop = testInfo.project.name === "desktop";

    if (isDesktop) {
      await page.getByRole("button", { name: /^Find$/ }).click();
      await expect(page.locator("#verb-panel-find")).toBeVisible();
      await page.getByRole("link", { name: /Calendar/i }).first().click();
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
    if (isDesktop) {
      await page.keyboard.press("Control+K");
    } else {
      await page.evaluate(() => window.dispatchEvent(new CustomEvent("sullivan:open-search")));
    }
    await expect(page.getByRole("dialog", { name: /Search Sullivan County/i })).toBeVisible();
    await expect(page.getByText(/Quick actions/i)).toBeVisible();
    await page.getByRole("button", { name: /Pay property taxes/i }).click();
    await expect(page).toHaveURL(/\/property-taxes/);
    await expect(page.getByRole("heading", { name: /Property Taxes/i })).toBeVisible();
  });
});
