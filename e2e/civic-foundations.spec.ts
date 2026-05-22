import { expect, test } from "@playwright/test";

test.describe("civic foundation flows", () => {
  test("search opens direct document results", async ({ page }, testInfo) => {
    await page.goto("/");
    if (testInfo.project.name === "mobile") {
      await page.getByRole("button", { name: /open menu/i }).click();
      await page.getByRole("button", { name: /^search$/i }).click();
    } else {
      await page.getByRole("button", { name: /^search$/i }).click();
    }
    await page.getByRole("combobox", { name: /search sullivan county/i }).fill("ADA Employee Grievance");
    const result = page.getByRole("option", { name: /ADA Employee Grievance Policy/i }).first();
    await expect(result).toBeVisible();

    await page.evaluate(() => {
      const originalOpen = window.open.bind(window);
      window.open = ((url?: string | URL, target?: string, features?: string) => {
        (window as Window & { __openedUrls?: string[] }).__openedUrls ??= [];
        (window as Window & { __openedUrls: string[] }).__openedUrls.push(String(url));
        return originalOpen(url, target, features);
      }) as typeof window.open;
    });
    await result.click();
    await expect
      .poll(() => page.evaluate(() => (window as Window & { __openedUrls?: string[] }).__openedUrls ?? []))
      .toContain("/documents/ada/ada-employee-grievance-policy-2019.docx");
  });

  test("contact and public-records forms carry hidden idempotency keys", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator('input[name="idempotencyKey"]')).toHaveValue(/^contact:/);
    await expect(page.getByText(/not a public records request/i)).toBeVisible();

    await page.goto("/forms/public-records");
    await expect(page.locator('input[name="idempotencyKey"]')).toHaveValue(/^form-public-records:/);
    await expect(page.getByText(/Before you submit/i)).toBeVisible();
  });

  test("department task pages expose verified process cards", async ({ page }) => {
    await page.goto("/departments/county-clerk");
    await expect(page.getByRole("heading", { name: /Common tasks/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Renew vehicle tags/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Renew vehicle tags/i })).toHaveAttribute(
      "href",
      /tncountyclerk\.com/,
    );
  });

  test("calendar meetings expose 2026 expected actions", async ({ page }) => {
    await page.goto("/calendar");
    const commission = page.getByTestId("meeting-county-commission-regular-session");
    await expect(commission.getByRole("link", { name: /Add to calendar/i })).toBeVisible();
    await expect(commission.getByRole("link", { name: /Watch live/i })).toBeVisible();
    await expect(commission.getByRole("link", { name: /Agendas and minutes/i })).toBeVisible();
  });
});
