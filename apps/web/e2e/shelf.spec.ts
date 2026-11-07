import { STORIES } from "../src/content/stories";
import { expect, ready, test } from "./support/fixtures";

const free = STORIES.filter((s) => s.isFree);
const paid = STORIES.filter((s) => !s.isFree);
const readLink = (title: string) => `a[aria-label="Read ${title}"]`;
const lockedLink = (title: string) => `a[aria-label="${title}: open with a plan"]`;

test("shelf: free stories open, paid ones are locked", async ({ page }) => {
  await page.goto("/stories?age=all");
  for (const s of free) await expect(page.locator(readLink(s.title.en))).toHaveCount(1);
  for (const s of paid) await expect(page.locator(lockedLink(s.title.en))).toHaveAttribute("href", "/subscribe?plan=reader");
});

test("shelf: the age filter shows each age group's stories", async ({ page, t }) => {
  await page.goto("/stories?age=all");
  await ready(page);
  await page.getByRole("link", { name: t.shelf.ages("8-9"), exact: true }).click();
  await expect(page).toHaveURL(/age=8-9/);
  const older = STORIES.filter((s) => s.ageBands.includes("8-9"));
  await expect(page.locator('main a[aria-label^="Read "], main a[aria-label$=": open with a plan"]')).toHaveCount(older.length);
  for (const s of STORIES.filter((s) => !s.ageBands.includes("8-9"))) await expect(page.locator(readLink(s.title.en))).toHaveCount(0);
  await page.getByRole("link", { name: t.shelf.allAges, exact: true }).click();
  await expect(page).toHaveURL(/age=all/);
  await expect(page.locator('main a[aria-label^="Read "], main a[aria-label$=": open with a plan"]')).toHaveCount(STORIES.length);
});

test("a locked story, signed out: plans need a sign-in, and no words are sent", async ({ page, t }) => {
  const story = paid[0];
  await page.goto(`/stories/${story.id}`);
  await expect(page.getByText(t.shelf.lockedStory)).toBeVisible();
  await expect(page.getByRole("link", { name: t.shelf.signIn })).toHaveAttribute("href", `/login?next=${encodeURIComponent(`/stories/${story.id}`)}`);
  expect(await page.content()).not.toContain(story.pages[0].en);
  // A locked card leads to the plans, which ask a signed-out visitor to sign in first.
  await page.goto("/subscribe?plan=reader");
  await expect(page).toHaveURL(/\/login\?next=%2Fsubscribe/);
});

test("paid stories' words are in no page and no script a visitor downloads", async ({ page }) => {
  const scripts: Promise<string>[] = [];
  page.on("response", (r) => {
    if (r.request().resourceType() === "script") scripts.push(r.text().catch(() => ""));
  });
  for (const path of ["/", "/stories?age=all", `/stories/${free[0].id}`, `/stories/${paid[0].id}`]) {
    await page.goto(path);
    await ready(page);
    await page.waitForLoadState("networkidle");
    const html = await page.content();
    for (const s of paid) expect(html, `${path} shows words of ${s.id}`).not.toContain(s.pages[1].en);
  }
  const bodies = await Promise.all(scripts);
  expect(bodies.length).toBeGreaterThan(5);
  for (const s of paid) {
    for (const p of [s.pages[1].en, s.pages[1].am]) expect(bodies.some((b) => b.includes(p)), `a script carries words of ${s.id}`).toBe(false);
  }
});
