import { expect, ready, test } from "./support/fixtures";

test("home page: hero, the try-a-story book and the plans", async ({ page, uiLang, t }) => {
  const res = await page.goto("/");
  expect(res?.status()).toBe(200);
  await expect(page.locator("html")).toHaveAttribute("lang", uiLang);
  await expect(page.locator("h1").first()).toBeVisible();
  // The free first story is on the home page, open at its first page (Lali hides there too).
  await expect(page.locator("[data-find-lali]").first()).toBeAttached();
  await expect(page.getByRole("button", { name: "Next page", exact: true }).first()).toBeAttached();
  await expect(page.locator("#plans")).toContainText(t.plans.names.reader);
  // Nothing on a phone scrolls sideways.
  await ready(page);
  const width = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(width).toBeLessThanOrEqual(390);
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
