import { expect, passMathsGate, ready, test } from "./support/fixtures";

test("signed out, the Grown-ups' corner asks to sign in", async ({ page }) => {
  await page.goto("/account");
  await expect(page).toHaveURL(/\/login\?next=%2Faccount/);
});

test("Grown-ups' corner: the maths gate, add a child, then delete the account", async ({ page, signIn, t, uiLang }) => {
  await signIn();
  await page.goto("/account");
  await ready(page);
  await passMathsGate(page);
  await expect(page.getByRole("heading", { name: t.account.title, level: 1 })).toBeVisible();

  await page.locator("#child-name").fill("Abeba");
  await page.locator("#child-age").selectOption("6-7");
  await page.getByRole("button", { name: "Gugu" }).click();
  await page.getByRole("button", { name: t.account.addChildBtn }).click();
  await expect(page.getByText("Abeba").first()).toBeVisible();

  // The shelf now follows Abeba's age group.
  await page.goto("/stories");
  await expect(page.getByText(t.shelf.forAges("6-7"))).toBeVisible();

  // Delete the account for good.
  await page.goto("/account");
  await ready(page);
  await passMathsGate(page);
  await page.getByRole("button", { name: t.account.deleteStart }).click();
  await page.getByRole("textbox").last().fill(uiLang === "am" ? "ሰርዝ" : "DELETE");
  await Promise.all([page.waitForURL(/\/\?deleted=1$/), page.getByRole("button", { name: t.account.deleteConfirm }).click()]);
  // Signed out, and the account is gone.
  await page.goto("/account");
  await expect(page).toHaveURL(/\/login/);
});

test("a parent can't reach admin pages or admin APIs", async ({ page, signIn, request }) => {
  await signIn("parent");
  for (const path of ["/admin/gifts", "/admin/stats", "/admin/stories", "/admin/narration", "/admin/games"]) {
    await page.goto(path);
    // The redirect is streamed (the page shell is static), so it lands a moment later.
    await page.waitForURL(/\/account$/);
    await expect(page.getByText("Pilot numbers")).toHaveCount(0);
  }
  const cookie = (await page.context().cookies()).map((c) => `${c.name}=${c.value}`).join("; ");
  const api = await request.get("/api/admin/narration?story=lost-moon", { headers: { cookie } });
  expect(api.status()).toBe(403);
});

test("an admin can open the admin pages", async ({ page, signIn }) => {
  await signIn("admin");
  await page.goto("/admin/gifts");
  expect(new URL(page.url()).pathname).toBe("/admin/gifts");
});
