import { expect, test } from "@playwright/test";

test.describe("mega-menu on all pages", () => {
	const pages = [
		"/",
		"/departments",
		"/departments/county-mayor",
		"/commissioners",
		"/news",
		"/calendar",
		"/contact",
		"/documents",
		"/history",
		"/history/timeline",
		"/communities",
		"/forms",
	];

	for (const path of pages) {
		test(`hover opens mega-menu on ${path}`, async ({ page }) => {
			if (page.viewportSize()!.width < 1024) return;
			await page.goto(path);
			await page.waitForTimeout(1500);

			const btn = page.locator("nav button", { hasText: "Departments" });
			await btn.first().hover();
			await page.waitForTimeout(400);

			const menu = page.locator("#departments-mega-menu");
			await expect(menu).toBeVisible();
			await expect(menu.getByText("Administrative")).toBeVisible();
		});
	}

	test("click toggles mega-menu", async ({ page }) => {
		if (page.viewportSize()!.width < 1024) return;
		await page.goto("/departments");
		await page.waitForTimeout(800);

		const btn = page.locator("nav button", { hasText: "Departments" });

		await btn.first().click();
		await page.waitForTimeout(300);
		await expect(page.locator("#departments-mega-menu")).toBeVisible();

		await btn.first().click();
		await page.waitForTimeout(300);
		await expect(page.locator("#departments-mega-menu")).not.toBeVisible();
	});

	test("mega-menu links navigate correctly", async ({ page }) => {
		if (page.viewportSize()!.width < 1024) return;
		await page.goto("/departments");
		await page.waitForTimeout(800);

		const btn = page.locator("nav button", { hasText: "Departments" });
		await btn.first().hover();
		await page.waitForTimeout(400);

		await page
			.locator("#departments-mega-menu a")
			.filter({ hasText: "County Mayor" })
			.first()
			.click();
		await expect(page).toHaveURL(/\/departments\/county-mayor/);
	});

	test("mega-menu shows all 6 category groups on all pages", async ({ page }) => {
		if (page.viewportSize()!.width < 1024) return;
		const allPages = ["/", "/departments", "/history", "/contact"];
		for (const path of allPages) {
			await page.goto(path);
			await page.waitForTimeout(1500);

			const btn = page.locator("nav button", { hasText: "Departments" });
			await btn.first().hover();
			await page.waitForTimeout(400);

			const menu = page.locator("#departments-mega-menu");
			await expect(menu).toContainText("Administrative");
			await expect(menu).toContainText("Courts");
			await expect(menu).toContainText("Public Safety");
			await expect(menu).toContainText("Finance");
			await expect(menu).toContainText("Operations");
			await expect(menu).toContainText("Community");
		}
	});
});
