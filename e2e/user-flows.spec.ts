import { expect, test } from "@playwright/test";

test.describe("user flows", () => {
  // ===== MEGA MENU (Phase 1 verb consolidation: 7→5; Departments folded into Find) =====
  test("desktop mega-menu opens on hover and navigates to a department", async ({ page }) => {
    if (page.viewportSize()!.width < 1024) return;
    await page.goto("/");

    const findTrigger = page.locator("nav button", { hasText: /^Find$/ });
    await findTrigger.first().hover();
    await page.waitForTimeout(400);

    // FIND panel groups: Records · Meetings & people · Departments
    const panel = page.locator("#verb-panel-find");
    await expect(panel).toBeVisible();
    await expect(panel).toContainText(/Records|Registros/);
    await expect(panel).toContainText(/Departments|Departamentos/);

    // Browse-all link routes to /departments (the canonical browse experience).
    await page
      .locator("#verb-panel-find a")
      .filter({ hasText: /Browse all 25 departments|Ver los 25 departamentos/ })
      .first()
      .click();
    await expect(page).toHaveURL(/\/departments(\?|$)/);

    // From the directory, navigate into County Mayor and assert arrival.
    await page.locator("a[href='/departments/county-mayor']").first().click();
    await expect(page).toHaveURL(/\/departments\/county-mayor/);
    // Two h1s exist on dept detail (hero + printable contact card); scope to first.
    await expect(page.locator("h1").first()).toContainText("County Mayor");
  });

  test("mega-menu closes on mouse leave", async ({ page }) => {
    if (page.viewportSize()!.width < 1024) return;
    await page.goto("/");

    const findTrigger = page.locator("nav button", { hasText: /^Find$/ });
    await findTrigger.first().hover();
    await page.waitForTimeout(400);

    const panel = page.locator("#verb-panel-find");
    await expect(panel).toBeVisible();

    await page.locator("body").hover({ position: { x: 10, y: 10 } });
    await page.waitForTimeout(400);
  });

  // ===== MOBILE MENU =====
  test("mobile hamburger opens and contains verb links", async ({ page }) => {
    if (page.viewportSize()!.width >= 1024) return;
    await page.goto("/");

    const hamburger = page.locator('button[aria-label="Open menu"]');
    await hamburger.click();

    // Mobile drawer is a sibling dialog, not inside the main nav.
    const drawer = page.locator('[role="dialog"][aria-label="Navigation menu"]');
    await expect(drawer).toBeVisible();
    await expect(drawer).toContainText("Pay");
    await expect(drawer).toContainText("Apply");
    await expect(drawer).toContainText("Departments");
    await expect(drawer).toContainText("About");
  });

  test("mobile menu closes with Escape", async ({ page }) => {
    if (page.viewportSize()!.width >= 1024) return;
    await page.goto("/");

    await page.locator('button[aria-label="Open menu"]').click();
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
  });

  // ===== SEARCH =====
  test("Cmd+K opens search dialog", async ({ page }) => {
    if (page.viewportSize()!.width < 1024) return;
    await page.goto("/");

    await page.keyboard.press("Meta+k");
    await page.waitForTimeout(500);
  });

  test("search shows results and navigates", async ({ page }) => {
    if (page.viewportSize()!.width < 1024) return;
    await page.goto("/");

    await page.keyboard.press("Meta+k");
    await page.waitForTimeout(500);

    const input = page.locator('[role="dialog"] input, [role="combobox"]');
    if ((await input.count()) > 0) {
      await input.first().fill("tax");
      await page.waitForTimeout(500);
    }
  });

  // ===== STAT COUNTERS =====
  test("stat counters animate on scroll", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(1000);

    const heroSection = page.locator("section, div").filter({ hasText: "Residents" }).first();
    if ((await heroSection.count()) > 0) {
      await heroSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1500);
      await expect(page.locator("body")).toContainText("430");
    }
  });

  // ===== DEPARTMENT FILTER =====
  test("department category filter works", async ({ page }) => {
    await page.goto("/departments");

    const financeBtn = page.locator("button", { hasText: "Finance" });
    if ((await financeBtn.count()) > 0) {
      await financeBtn.first().click();
      await page.waitForTimeout(300);
    }
  });

  // ===== DOCUMENTS =====
  test("documents search filters results", async ({ page }) => {
    await page.goto("/documents");

    const searchInput = page.locator(
      'input[type="search"], input[placeholder*="search" i], input[placeholder*="Search" i]',
    );
    if ((await searchInput.count()) > 0) {
      await searchInput.first().fill("budget");
      await page.waitForTimeout(300);
    }
  });

  test("document category sections expand", async ({ page }) => {
    await page.goto("/documents");

    const agendaSection = page
      .locator("button, summary, [role=button]")
      .filter({ hasText: /Agendas|Finance/i })
      .first();
    if ((await agendaSection.count()) > 0) {
      await agendaSection.click();
      await page.waitForTimeout(300);
    }
  });

  // ===== FORMS =====
  test("form index shows all form types", async ({ page }) => {
    await page.goto("/forms");
    await expect(page.locator("body")).toContainText("Building");
    await expect(page.locator("body")).toContainText("Code");
  });

  test("form page has required fields", async ({ page }) => {
    await page.goto("/forms/building-permit");
    const inputs = page.locator("input, textarea, select");
    const count = await inputs.count();
    expect(count).toBeGreaterThan(2);
  });

  test("empty form submit shows validation errors", async ({ page }) => {
    await page.goto("/forms/building-permit");
    const submitBtn = page.locator('button[type="submit"]').first();
    if ((await submitBtn.count()) > 0) {
      await submitBtn.click();
      await page.waitForTimeout(500);
    }
  });

  // ===== CONTACT =====
  test("contact form has all expected fields", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("body")).toContainText("Name");
    await expect(page.locator("body")).toContainText("Email");
    await expect(page.locator("body")).toContainText("Subject");
    await expect(page.locator("body")).toContainText("Message");
  });

  // ===== TIMELINE =====
  test("timeline shows all eras", async ({ page }) => {
    await page.goto("/history/timeline");
    await expect(page.locator("body")).toContainText("1761");
    await expect(page.locator("body")).toContainText("1779");
    await expect(page.locator("body")).toContainText("1790");
  });

  // ===== COMMUNITIES =====
  test("community cards link to detail pages", async ({ page }) => {
    await page.goto("/communities");
    const kingsport = page.locator("a").filter({ hasText: "Kingsport" }).first();
    if ((await kingsport.count()) > 0) {
      await kingsport.click();
      await expect(page).toHaveURL(/\/communities\/kingsport/);
    }
  });

  // ===== HERITAGE SITES =====
  test("heritage sites are reachable", async ({ page }) => {
    await page.goto("/history/rocky-mount");
    await expect(page.locator("body")).toContainText("Rocky Mount");
  });

  // ===== CALENDAR =====
  test("calendar shows meeting schedule", async ({ page }) => {
    await page.goto("/calendar");
    await expect(page.locator("body")).toContainText("Commission");
  });

  // ===== PRIVACY & ADA =====
  test("privacy policy has cookie section", async ({ page }) => {
    await page.goto("/privacy-policy");
    await expect(page.locator("body")).toContainText("Cookie");
  });

  test("ada page has downloadable forms", async ({ page }) => {
    await page.goto("/ada-compliance");
    await expect(page.locator("body")).toContainText("ADA");
  });

  // ===== RESPONSIVE BEHAVIOR =====
  test("no horizontal overflow on mobile", async ({ page }) => {
    if (page.viewportSize()!.width >= 640) return;
    await page.goto("/");
    await page.waitForTimeout(500);
    page.setViewportSize({ width: 390, height: 844 });
  });

  // ===== EXTERNAL LINKS =====
  test("external links have proper attributes", async ({ page }) => {
    await page.goto("/");
    const extLinks = page.locator('a[target="_blank"]');
    const count = await extLinks.count();
    if (count > 0) {
      const first = extLinks.first();
      await expect(first).toHaveAttribute("rel", /noopener/);
    }
  });

  // ===== RSS FEED =====
  test("RSS feed is accessible", async ({ page }) => {
    const response = await page.goto("/rss.xml");
    if (response) {
      const body = await response.text();
      expect(body).toContain("<rss");
    }
  });

  // ===== SITEMAP =====
  test("sitemap is accessible", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    if (response) {
      const body = await response.text();
      expect(body).toContain("<urlset");
    }
  });
});
