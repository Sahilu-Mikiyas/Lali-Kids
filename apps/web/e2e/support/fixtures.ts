import { randomUUID } from "node:crypto";

import { test as base, expect, type APIRequestContext, type Page } from "@playwright/test";

import { READER } from "../../src/components/book/reader-words";
import { dict, type Dict } from "../../src/i18n/dict";

/*
  Shared set-up for every test: the website language (one Playwright project per language), the
  words of that language from the site's own dictionary (so tests read like the page), a
  stubbed sign-in, and stand-ins for YouTube and Chapa's hosted checkout.
*/

export type Lang = "en" | "am";
export type TestOptions = { uiLang: Lang };
type Fixtures = {
  t: Dict;
  reader: (typeof READER)["en"];
  /** Signs this test's browser in as a new family (or admin); returns the family id. */
  signIn: (role?: "parent" | "admin") => Promise<string>;
  /** Uncaught errors and CSP violations in the page; a test fails if any happened. */
  pageErrors: string[];
};

/** The `sb-stub-auth-token` cookie @supabase/ssr reads, for a stub access token. */
export function sessionCookie(token: string) {
  const s = {
    access_token: token,
    token_type: "bearer",
    expires_in: 3600,
    expires_at: Math.floor(Date.now() / 1000) + 3600,
    refresh_token: `r-${token}`,
    user: { id: token.split(".")[1], email: "parent@example.com", aud: "authenticated", role: "authenticated" },
  };
  return "base64-" + Buffer.from(JSON.stringify(s)).toString("base64url");
}

/** Chapa's hosted checkout, as far as the tests need it: the amount and a "Pay now" link back. */
function chapaPage(url: string) {
  const u = new URL(url);
  const back = u.searchParams.get("return") ?? "/";
  return `<!doctype html><meta name=viewport content="width=device-width"><title>Chapa (test)</title>
    <h1>Chapa</h1><p id=amount>${u.searchParams.get("amount")} ETB</p><a id=pay href="${back}">Pay now</a>`;
}

export const test = base.extend<TestOptions & Fixtures>({
  uiLang: ["en", { option: true }],
  t: async ({ uiLang }, use) => {
    await use(dict[uiLang]);
  },
  reader: async ({ uiLang }, use) => {
    await use(READER[uiLang]);
  },
  context: async ({ context, uiLang, baseURL }, use) => {
    await context.addCookies([{ name: "lali-lang", value: uiLang, url: baseURL! }]);
    // Nothing leaves the test machine: YouTube thumbnails and Chapa's page are stand-ins.
    await context.route(/^https:\/\/(i\.ytimg\.com|www\.youtube-nocookie\.com)\//, (r) => r.fulfill({ status: 204, body: "" }));
    await context.route(/^https:\/\/checkout\.chapa\.co\//, (r) => r.fulfill({ contentType: "text/html", body: chapaPage(r.request().url()) }));
    await use(context);
  },
  signIn: async ({ context, baseURL }, use) => {
    await use(async (role = "parent") => {
      const id = randomUUID();
      await context.addCookies([{ name: "sb-stub-auth-token", value: sessionCookie(`stub.${id}.${role}`), url: baseURL! }]);
      return id;
    });
  },
  pageErrors: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      // Anything the Content Security Policy blocks is a bug in the policy or the page.
      page.on("console", (m) => {
        if (/Content Security Policy|Refused to (load|connect|frame|execute)/i.test(m.text())) errors.push(m.text());
      });
      await use(errors);
      expect(errors, "uncaught errors in the page").toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };

/** Waits for the page to be interactive (hydrated), so clicks reach React. */
export async function ready(page: Page) {
  await page.waitForLoadState("load");
  await page.waitForFunction(() => document.readyState === "complete");
}

/** Gives a family an open plan in the fake (null: no plan). See the /__stub/ hooks in stub-fetch.cjs. */
export async function givePlan(request: APIRequestContext, family: string, plan: "reader" | "learner" | "vip" | null, days = 30) {
  const r = await request.post("/__stub/plan", { data: { family, plan, days } });
  expect(r.ok()).toBe(true);
}

/** The stubbed clock: moves a family's learning-package dates back, as if `days` had passed. */
export async function travel(request: APIRequestContext, family: string, days: number) {
  const r = await request.post("/__stub/travel", { data: { family, days } });
  expect(r.ok()).toBe(true);
}

/** A family's rows in one table of the fake (theirs, or their children's). */
export async function stubRows<T = Record<string, unknown>>(request: APIRequestContext, table: string, family: string): Promise<T[]> {
  const r = await request.get(`/__stub/rows?table=${table}&family=${family}`);
  return ((await r.json()) as { rows: T[] }).rows;
}

/** Adds a child in the Grown-ups' corner (the maths gate first). */
export async function addChild(page: Page, name: string, ageBand: "3-5" | "6-7" | "8-9" = "3-5") {
  await page.goto("/account");
  await ready(page);
  await passMathsGate(page);
  await page.locator("#child-name").fill(name);
  await page.locator("#child-age").selectOption(ageBand);
  await page.getByRole("button", { name: dict.en.account.addChildBtn }).or(page.getByRole("button", { name: dict.am.account.addChildBtn })).click();
  await expect(page.locator("[data-child-courses], [data-see-progress]").first()).toBeAttached();
  await expect(page.getByText(name).first()).toBeVisible();
}

/** Answers the grown-ups' maths question ("a + b = ?") on the page. */
export async function passMathsGate(page: Page) {
  const q = page.getByText(/^\s*\d+\s*\+\s*\d+\s*=\s*\?\s*$/).first();
  await q.waitFor();
  // The question is redrawn after hydration (it is random), so read it once the page is live.
  await page.waitForTimeout(300);
  const [a, b] = (await q.innerText()).match(/\d+/g)!.map(Number);
  await page.getByRole("button", { name: String(a + b), exact: true }).first().click();
}
