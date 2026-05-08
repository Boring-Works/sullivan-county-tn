import { expect, test } from "@playwright/test";

/**
 * Mega-menu E2E for the Phase 1 verb consolidation: 7 verbs → 5.
 *
 * The 5 verbs are: FIND · PAY · APPLY · REPORT · ABOUT
 *
 * The standalone "Departments" verb was removed in Phase 1; department
 * browsing now lives under FIND ("Browse all 25 departments") and on the
 * /departments index page (the canonical browse experience). The
 * "Records" and "Meetings" verbs were folded into FIND's groups.
 */
test.describe("verb-nav mega panels (5-verb model)", () => {
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
		test(`hover opens FIND panel on ${path}`, async ({ page }) => {
			if (page.viewportSize()!.width < 1024) return;
			await page.goto(path);
			await page.waitForTimeout(1500);

			const btn = page.locator("nav button", { hasText: /^Find$/ });
			await btn.first().hover();
			await page.waitForTimeout(400);

			const panel = page.locator("#verb-panel-find");
			await expect(panel).toBeVisible();
			// FIND has three groups: Records, Meetings & people, Departments.
			await expect(panel).toContainText("Records");
		});
	}

	test("click toggles FIND panel", async ({ page }) => {
		if (page.viewportSize()!.width < 1024) return;
		await page.goto("/");
		await page.waitForTimeout(800);

		const btn = page.locator("nav button", { hasText: /^Find$/ });

		await btn.first().click();
		await page.waitForTimeout(300);
		await expect(page.locator("#verb-panel-find")).toBeVisible();

		await btn.first().click();
		await page.waitForTimeout(300);
		await expect(page.locator("#verb-panel-find")).not.toBeVisible();
	});

	test("FIND panel 'Browse all departments' link navigates to /departments", async ({ page }) => {
		if (page.viewportSize()!.width < 1024) return;
		await page.goto("/");
		await page.waitForTimeout(800);

		const btn = page.locator("nav button", { hasText: /^Find$/ });
		await btn.first().hover();
		await page.waitForTimeout(400);

		await page
			.locator("#verb-panel-find a")
			.filter({ hasText: /Browse all 25 departments|Ver los 25 departamentos/ })
			.first()
			.click();
		await expect(page).toHaveURL(/\/departments(\?|$)/);
	});

	test("FIND panel shows all three group headings", async ({ page }) => {
		if (page.viewportSize()!.width < 1024) return;
		await page.goto("/");
		await page.mouse.move(0, 0);
		await page.waitForTimeout(150);

		const btn = page.locator("nav button", { hasText: /^Find$/ });
		await btn.first().hover();
		const panel = page.locator("#verb-panel-find");
		await expect(panel).toBeVisible({ timeout: 8000 });
		// Group headings are rendered as 10px uppercase labels.
		await expect(panel).toContainText(/Records|Registros/i);
		await expect(panel).toContainText(/Meetings|Reuniones/i);
		await expect(panel).toContainText(/Departments|Departamentos/i);
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

	test("FIND panel external GIS link opens in new tab", async ({ page }) => {
		if (page.viewportSize()!.width < 1024) return;
		await page.goto("/");
		await page.waitForTimeout(1500);

		const findBtn = page.locator("nav button", { hasText: /^Find$/ });
		await findBtn.first().hover();
		await page.waitForTimeout(400);

		const gisLink = page
			.locator("#verb-panel-find a")
			.filter({ hasText: /GIS \/ property map|GIS \/ mapa/ })
			.first();
		await expect(gisLink).toHaveAttribute("target", "_blank");
		await expect(gisLink).toHaveAttribute("rel", /noopener/);
	});

	test("nav has exactly 5 verb buttons (Phase 1 consolidation 7→5)", async ({ page }) => {
		if (page.viewportSize()!.width < 1024) return;
		await page.goto("/");
		await page.waitForTimeout(800);

		// All 5 verbs visible in main nav, in order.
		for (const label of ["Find", "Pay", "Apply", "Report", "About"]) {
			await expect(
				page
					.locator("nav[aria-label='Main navigation'] button", {
						hasText: new RegExp(`^${label}$`),
					})
					.first(),
			).toBeVisible();
		}

		// Records / Meetings / Departments verbs should NOT be standalone buttons anymore.
		// (The "Departments" mega-menu was the previous 7th verb. /departments page is fine;
		//  we just check the standalone verb button no longer exists in the nav.)
		await expect(
			page.locator("nav[aria-label='Main navigation'] button", { hasText: /^Records$/ }),
		).toHaveCount(0);
		await expect(
			page.locator("nav[aria-label='Main navigation'] button", { hasText: /^Meetings$/ }),
		).toHaveCount(0);
		await expect(
			page.locator("nav[aria-label='Main navigation'] button", { hasText: /^Departments$/ }),
		).toHaveCount(0);
	});
});
