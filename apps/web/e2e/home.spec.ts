import { expect, ready, test } from "./support/fixtures";

test("home page: hero, the try-a-story book and the plans", async ({ page, uiLang, t }) => {
  const res = await page.goto("/");
  expect(res?.status()).toBe(200);
  await expect(page.locator("html")).toHaveAttribute("lang", uiLang);
  await expect(page.locator("h1").first()).toBeVisible();
  // A free story's demo is on the home page: the scroll book (with a way to skip it) and, for
  // reduced motion, the same pages as a plain book with page buttons.
  await expect(page.locator("[data-scroll-book]")).toBeAttached();
  await expect(page.locator('[data-sbook-page="0"]')).toBeAttached();
  await expect(page.getByRole("button", { name: t.home.try.skip })).toBeAttached();
  await expect(page.locator("[data-still-book] button")).toHaveCount(2);
  await expect(page.locator("#plans")).toContainText(t.plans.names.reader);
  // Nothing on a phone scrolls sideways.
  await ready(page);
  const width = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(width).toBeLessThanOrEqual(390);
});

test("scroll book: Skip jumps past it, and reduced motion gets a plain book", async ({ page, t }) => {
  await page.goto("/");
  await ready(page);
  await expect(page.locator('[data-sbook-page="0"]')).toBeAttached();
  await page.getByRole("button", { name: t.home.try.skip }).click();
  const past = await page.evaluate(() => {
    const r = document.querySelector("[data-scroll-book]")!.getBoundingClientRect();
    return r.bottom <= 1;
  });
  expect(past).toBe(true);
  await expect(page.locator("#after-book")).toBeFocused();

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("[data-scroll-book]")).toBeHidden();
  const still = page.locator("[data-still-book]");
  await expect(still).toBeVisible();
  await expect(still.getByRole("button", { name: t.home.try.prev })).toBeDisabled();
  await still.getByRole("button", { name: t.home.try.next }).click();
  await expect(still.getByText(t.home.try.pageOf(2, 8))).toBeVisible();
});

test("language switch: the same page comes back in the other language", async ({ page, uiLang, t }) => {
  await page.goto("/stories");
  await ready(page);
  const other = uiLang === "en" ? "am" : "en";
  await page.getByRole("button", { name: uiLang === "en" ? "Switch the website to Amharic" : "ድረ-ገጹን ወደ እንግሊዝኛ ቀይር" }).first().click();
  await expect(page.locator("html")).toHaveAttribute("lang", other);
  await expect(page).toHaveURL(/\/stories$/);
  await expect(page.locator("h1").first()).not.toHaveText(t.shelf.title);
  // Shared links with a language prefix set it and keep the plain address.
  await page.goto(`/${uiLang}/stories`);
  await expect(page).toHaveURL(/\/stories$/);
  await expect(page.locator("html")).toHaveAttribute("lang", uiLang);
});

test("security headers on pages, and Lali's own games may be framed", async ({ request }) => {
  const home = await request.get("/");
  const csp = home.headers()["content-security-policy"] ?? "";
  expect(csp).toContain("frame-ancestors 'self'");
  expect(csp).toContain("object-src 'none'");
  expect(csp).toContain("frame-src 'self' https:");
  expect(home.headers()["x-content-type-options"]).toBe("nosniff");
  expect(home.headers()["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(home.headers()["x-powered-by"]).toBeUndefined();
  const game = await request.get("/games/bee-count/index.html");
  expect(game.status()).toBe(200);
  expect(game.headers()["content-security-policy"]).toContain("frame-ancestors *");
});

test("404: an unknown page says so", async ({ page }) => {
  const res = await page.goto("/no-such-page-here");
  expect(res?.status()).toBe(404);
  await expect(page.getByText(/404|could not be found/i).first()).toBeVisible();
});
