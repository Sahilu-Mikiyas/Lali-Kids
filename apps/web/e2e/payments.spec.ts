import { PLANS } from "../src/lib/payments/plans";
import { expect, ready, test } from "./support/fixtures";

test("plans: pay hands over to Chapa, and the return page confirms with Chapa first", async ({ page, signIn, t }) => {
  await signIn();
  await page.goto("/subscribe?plan=reader");
  await ready(page);
  await expect(page.getByRole("radiogroup", { name: t.subscribe.choose })).toBeVisible();
  await Promise.all([page.waitForURL(/checkout\.chapa\.co/), page.getByRole("button", { name: t.subscribe.pay("400") }).click()]);
  // Chapa gets our reference and the plan's price in birr.
  expect(page.url()).toMatch(/lali-reader-[0-9a-f]{18}/);
  await expect(page.locator("#amount")).toHaveText("400 ETB");
  await Promise.all([page.waitForURL(/\/subscribe\/done\?tx_ref=lali-reader-/), page.click("#pay")]);
  // The first check says "pending" (the page refreshes itself), then the plan is open.
  await expect(page.getByRole("heading", { name: t.done.thanks })).toBeVisible({ timeout: 20_000 });
  await expect(page.getByText(t.plans.names.reader).first()).toBeVisible();
  // A paid story now opens.
  await page.goto("/stories/rainbow-puddle");
  await expect(page.getByText(t.shelf.lockedStory)).toHaveCount(0);
});

test("a forged or unknown payment reference opens nothing", async ({ page, signIn, t, request }) => {
  await signIn();
  await page.goto("/subscribe/done?tx_ref=lali-reader-000000000000000000");
  await expect(page.getByRole("heading", { name: t.done.thanks })).toHaveCount(0);
  // The callback ignores references that aren't ours, and the gift/plan shapes stay apart.
  expect((await request.get("/api/payments/chapa?trx_ref=evil")).status()).toBe(400);
  expect((await request.get("/api/payments/chapa?trx_ref=lali-gift-short")).status()).toBe(400);
  const unknown = await request.post("/api/payments/chapa", { data: { tx_ref: "lali-vip-ffffffffffffffffff" } });
  expect(await unknown.json()).toMatchObject({ ok: true, outcome: "unknown" });
});

test("gift: pay without an account, get the code, a family redeems it once", async ({ page, signIn, t, uiLang }) => {
  await page.goto("/gift");
  await ready(page);
  await page.locator("[role=radiogroup]").nth(0).locator("[role=radio]").nth(1).click(); // Family (learner)
  await page.locator("[role=radiogroup]").nth(1).locator("[role=radio]").nth(0).click(); // 1 month
  await page.fill("#giverName", uiLang === "am" ? "አክስት ሐና" : "Aunt Hana");
  await page.fill("#giverEmail", "hana@example.com");
  await page.fill("#recipient", uiLang === "am" ? "የአበባ ቤተሰብ" : "Abeba's family");
  await page.fill("#message", "<b>Read every night!</b>");
  await Promise.all([page.waitForURL(/checkout\.chapa\.co/), page.locator("aside button[type=submit]").click()]);
  expect(page.url()).toMatch(/lali-gift-[0-9a-f]{24}/);
  await expect(page.locator("#amount")).toHaveText(`${PLANS.find((p) => p.id === "learner")!.priceEtb} ETB`);
  await Promise.all([page.waitForURL(/\/gift\/done\?tx_ref=lali-gift-/), page.click("#pay")]);
  const codeEl = page.locator(".gift-code");
  await expect(codeEl).toBeVisible({ timeout: 20_000 });
  const code = (await codeEl.innerText()).trim();
  expect(code).toMatch(/^LALI-[A-HJKMNP-Z2-9]{4}-[A-HJKMNP-Z2-9]{4}$/);
  // The giver's message is shown as text, never as HTML.
  await expect(page.getByText("<b>Read every night!</b>")).toBeVisible();

  // A family signs in and adds it to their plan.
  await signIn();
  await page.goto(`/gift/redeem?code=${code.toLowerCase().replace(/-/g, " ")}`);
  await ready(page);
  await page.locator("button[type=submit]").click();
  await expect(page.getByRole("heading", { name: t.gift.redeem.thanks(uiLang === "am" ? "አክስት ሐና" : "Aunt Hana") })).toBeVisible({ timeout: 15_000 });
  // The same code a second time is refused.
  await page.goto("/gift/redeem");
  await ready(page);
  await page.fill("#code", code);
  await page.locator("button[type=submit]").click();
  await expect(page.locator("#code-error")).toBeVisible();
});
