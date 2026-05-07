import { expect, test } from "@playwright/test";

test.describe("/property-taxes parcel lookup", () => {
  test("lookup card renders with the three-portal CTAs", async ({ page }) => {
    await page.goto("/property-taxes");

    const heading = page.getByRole("heading", { name: /Find your property/i });
    await expect(heading).toBeVisible();

    // The three side-by-side CTAs.
    await expect(page.getByRole("button", { name: /View assessment/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Pay your taxes/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /View on map/i })).toBeVisible();
  });

  test("the lookup input rejects submit when empty", async ({ page }) => {
    await page.goto("/property-taxes");
    const submitBtn = page.getByRole("button", { name: /View assessment/i });
    await expect(submitBtn).toBeDisabled();
  });

  test("typing 3+ characters enables the assessment button", async ({ page }) => {
    await page.goto("/property-taxes");
    const input = page.getByRole("combobox");
    await input.fill("Smith");
    const submitBtn = page.getByRole("button", { name: /View assessment/i });
    await expect(submitBtn).toBeEnabled();
  });

  test("the Pay your taxes link points at the Trustee site", async ({ page }) => {
    await page.goto("/property-taxes");
    const payLink = page.getByRole("link", { name: /Pay your taxes/i }).first();
    await expect(payLink).toHaveAttribute("href", /sullivantntrustee\.gov/);
    await expect(payLink).toHaveAttribute("target", "_blank");
    await expect(payLink).toHaveAttribute("rel", /noopener/);
  });

  test("the GIS link points at the official ArcGIS web map", async ({ page }) => {
    await page.goto("/property-taxes");
    const gisLink = page.getByRole("link", { name: /View on map/i }).first();
    await expect(gisLink).toHaveAttribute("href", /sullcotngis\.maps\.arcgis\.com/);
    await expect(gisLink).toHaveAttribute("target", "_blank");
  });

  test("disclosure copy names the three official portals", async ({ page }) => {
    await page.goto("/property-taxes");
    const card = page.locator("section").filter({ hasText: /Find your property/i });
    await expect(card).toContainText(/State Comptroller|County Trustee|County GIS/i);
  });
});
