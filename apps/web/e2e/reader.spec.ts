import { getStory } from "../src/content/stories";
import { dict } from "../src/i18n/dict";
import { expect, ready, test } from "./support/fixtures";

// Page turns are instant with reduced motion, which keeps the walk through a book quick.
test.use({ reducedMotion: "reduce" });

const story = getStory("new-year-flowers")!;

test("read a free story to The End: Find Lali, a star and a sticker", async ({ page, uiLang, reader }) => {
  const words = dict[uiLang];
  await page.goto(`/stories/${story.id}`);
  await ready(page);
  // With reduced motion the cover opens by itself, straight to the first page.

  // Find Lali on the first page.
  const lali = page.locator('[data-find-lali="hidden"]:visible').first();
  await lali.click();
  await expect(page.locator('[data-find-lali="found"]:visible').first()).toBeVisible();
  await expect(page.getByText(words.findLali.counter(1, story.pages.length))).toBeVisible();

  // Turn every page, then finish.
  const next = page.getByRole("button", { name: "Next page", exact: true }).first();
  const finish = page.getByRole("button", { name: "Finish the story", exact: true }).first();
  for (let i = 1; i < story.pages.length; i++) {
    await expect(next).toBeEnabled();
    await next.click();
  }
  await finish.click();
  await expect(page.getByText(reader.theEnd).first()).toBeVisible();
  await expect(page.getByText(words.findLali.ending(1, story.pages.length)).first()).toBeVisible();
  // Signed out, the sticker is kept in the browser and still shown.
  await expect(page.getByText(words.stickers.newSticker).first()).toBeVisible();
  const stored = await page.evaluate(() => Object.keys(localStorage).join(","));
  expect(stored).toMatch(/sticker|lali/i);
});

test("the read-along microphone records the page and plays it back", async ({ page, uiLang }) => {
  const m = dict[uiLang].mic;
  await page.goto(`/stories/${story.id}`);
  await ready(page);
  const uploads: string[] = [];
  page.on("request", (r) => r.method() === "POST" && /\/api\/voices/.test(r.url()) && uploads.push(r.url()));
  await page.locator("[data-mic-start]:visible").first().click();
  // Lali explains first unless the microphone is already allowed (the fake one here is).
  const go = page.getByRole("button", { name: m.go, exact: true });
  const recording = page.getByText(m.recording);
  await expect(go.or(recording).first()).toBeVisible();
  if (await go.isVisible()) await go.click();
  await expect(recording).toBeVisible();
  await page.waitForTimeout(1600);
  await page.getByRole("button", { name: m.done }).click();
  // Played back on the device, then praised.
  await expect(page.getByText(m.wellRead).first()).toBeVisible({ timeout: 20_000 });
  // The recording never leaves the device.
  expect(uploads).toEqual([]);
});
