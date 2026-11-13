import { expect, ready, test } from "./support/fixtures";
import { E2E_PORT } from "./support/env.cjs";

test("sign in with an email code", async ({ page, t }) => {
  await page.goto("/login?next=/account");
  await ready(page);
  await page.locator('input[type="email"]').fill("new.parent@example.com");
  await page.getByRole("button", { name: t.login.send }).click();
  await expect(page.getByText(t.login.check)).toBeVisible();
  await page.getByRole("button", { name: t.login.hasCode }).click();
  await page.locator('input[inputmode="numeric"]').fill("123456");
  await page.getByRole("button", { name: t.login.withCode }).click();
  await expect(page).toHaveURL(/\/account$/);
  // The session cookie can't be read by scripts.
  const cookies = await page.context().cookies();
  const auth = cookies.find((c) => c.name.startsWith("sb-stub-auth-token"));
  expect(auth?.httpOnly).toBe(true);
});

test("a wrong code is refused kindly", async ({ page, t }) => {
  await page.goto("/login");
  await ready(page);
  await page.locator('input[type="email"]').fill("someone@example.com");
  await page.getByRole("button", { name: t.login.send }).click();
  await page.getByRole("button", { name: t.login.hasCode }).click();
  await page.locator('input[inputmode="numeric"]').fill("000000");
  await page.getByRole("button", { name: t.login.withCode }).click();
  await expect(page.getByText(t.login.errCode)).toBeVisible();
  await expect(page).toHaveURL(/\/login/);
});

test("next= can't send a signed-in parent to another site", async ({ page, signIn }) => {
  await signIn();
  for (const next of ["//evil.example.com/x", "/\\evil.example.com", "https://evil.example.com"]) {
    // The page redirects (sometimes twice), which can abort the navigation itself.
    await page.goto(`/login?next=${encodeURIComponent(next)}`).catch(() => {});
    await page.waitForLoadState();
    expect(new URL(page.url()).host).toBe(`localhost:${E2E_PORT}`);
  }
  // The email link's landing page refuses it too.
  await page.goto(`/auth/callback?token_hash=good&type=email&next=${encodeURIComponent("/\\evil.example.com")}`);
  expect(new URL(page.url()).host).toBe(`localhost:${E2E_PORT}`);
});
