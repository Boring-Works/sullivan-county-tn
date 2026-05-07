import { expect, test } from "@playwright/test";

test.describe("verb-nav mega panels on all pages", () => {
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
		test(`hover opens Departments panel on ${path}`, async ({ page }) => {
			if (page.viewportSize()!.width < 1024) return;
			await page.goto(path);
			await page.waitForTimeout(1500);

			const btn = page.locator("nav button", { hasText: "Departments" });
			await btn.first().hover();
			await page.waitForTimeout(400);

			const panel = page.locator("#verb-panel-departments");
			await expect(panel).toBeVisible();
			await expect(panel.getByText("Administrative")).toBeVisible();
		});
	}

	test("click toggles Departments panel", async ({ page }) => {
		if (page.viewportSize()!.width < 1024) return;
		await page.goto("/departments");
		await page.waitForTimeout(800);

		const btn = page.locator("nav button", { hasText: "Departments" });

		await btn.first().click();
		await page.waitForTimeout(300);
		await expect(page.locator("#verb-panel-departments")).toBeVisible();

		await btn.first().click();
		await page.waitForTimeout(300);
		await expect(page.locator("#verb-panel-departments")).not.toBeVisible();
	});

	test("Departments panel links navigate correctly", async ({ page }) => {
		if (page.viewportSize()!.width < 1024) return;
		await page.goto("/departments");
		await page.waitForTimeout(800);

		const btn = page.locator("nav button", { hasText: "Departments" });
		await btn.first().hover();
		await page.waitForTimeout(400);

		await page
			.locator("#verb-panel-departments a")
			.filter({ hasText: "County Mayor" })
			.first()
			.click();
		await expect(page).toHaveURL(/\/departments\/county-mayor/);
	});

	test("Departments panel shows all 6 category groups", async ({ page }) => {
		if (page.viewportSize()!.width < 1024) return;
		const allPages = ["/", "/departments", "/history", "/contact"];
		for (const path of allPages) {
			await page.goto(path);
			await expect(page.locator("nav button", { hasText: "Departments" })).toBeVisible();
			// Move cursor away first so Playwright's auto-move-before-click doesn't
			// trigger our hover-open handler and race with the explicit click.
			await page.mouse.move(0, 0);

			const btn = page.locator("nav button", { hasText: "Departments" });
			await btn.first().hover();
			const panel = page.locator("#verb-panel-departments");
			await expect(panel).toBeVisible();
			await expect(panel).toContainText("Administrative");
			await expect(panel).toContainText("Courts");
			await expect(panel).toContainText("Public Safety");
			await expect(panel).toContainText("Finance");
			await expect(panel).toContainText("Operations");
			await expect(panel).toContainText("Community");
		}
	});

	test("Pay verb panel surfaces property taxes task", async ({ page }) => {
		if (page.viewportSize()!.width < 1024) return;
		await page.goto("/");
		await page.waitForTimeout(1500);

		const payBtn = page.locator("nav button", { hasText: /^Pay$/ });
		await payBtn.first().hover();
		await page.waitForTimeout(400);

		const panel = page.locator("#verb-panel-pay");
		await expect(panel).toBeVisible();
		await expect(panel.getByRole("link", { name: "Property taxes" })).toBeVisible();
	});

	test("Apply verb panel routes to building permit form", async ({ page }) => {
		if (page.viewportSize()!.width < 1024) return;
		await page.goto("/");
		await page.waitForTimeout(1500);

		const applyBtn = page.locator("nav button", { hasText: /^Apply$/ });
		await applyBtn.first().hover();
		await page.waitForTimeout(400);

		await page
			.locator("#verb-panel-apply a")
			.filter({ hasText: "Building permit" })
			.first()
			.click();
		await expect(page).toHaveURL(/\/forms\/building-permit/);
	});

	test("About verb panel shows all 3 group headings", async ({ page }) => {
		if (page.viewportSize()!.width < 1024) return;
		await page.goto("/");
		await page.waitForTimeout(1500);

		const aboutBtn = page.locator("nav button", { hasText: /^About$/ });
		await aboutBtn.first().hover();
		await page.waitForTimeout(400);

		const panel = page.locator("#verb-panel-about");
		await expect(panel).toBeVisible();
		await expect(panel).toContainText("Heritage");
		await expect(panel).toContainText("Region");
		await expect(panel).toContainText("Government");
	});

	test("Records panel external GIS link opens in new tab", async ({ page }) => {
		if (page.viewportSize()!.width < 1024) return;
		await page.goto("/");
		await page.waitForTimeout(1500);

		const recordsBtn = page.locator("nav button", { hasText: /^Records$/ });
		await recordsBtn.first().hover();
		await page.waitForTimeout(400);

		const gisLink = page
			.locator("#verb-panel-records a")
			.filter({ hasText: "GIS / property map" })
			.first();
		await expect(gisLink).toHaveAttribute("target", "_blank");
		await expect(gisLink).toHaveAttribute("rel", /noopener/);
	});
});
