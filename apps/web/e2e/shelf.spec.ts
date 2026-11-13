import { COURSES } from "../src/content/courses";
import { STORIES } from "../src/content/stories";
import { expect, ready, test } from "./support/fixtures";

// The library shelf: a learning package's stories live in their package instead (docs/PACKAGES.md).
const library = STORIES.filter((s) => !s.course);
// Each live package's taster story is on the shelf too, as a free story.
const tasters = new Set(COURSES.filter((c) => c.status === "live" && c.tasterStoryId).map((c) => c.tasterStoryId!));
const free = library.filter((s) => s.isFree);
const paid = library.filter((s) => !s.isFree);
const readLink = (title: string) => `a[aria-label="Read ${title}"]`;
// Locked cards name the plan that opens their pack: Starter (reader) opens the whole library.
const lockedLink = (s: (typeof STORIES)[number]) => `main a[aria-label^="${s.title.en}"]`;
// Any card for this story, open or locked (locked labels are "Title: opens with …" / "Title፦ በ… ይከፈታል").
const anyCard = (s: (typeof STORIES)[number]) => `main a[aria-label="Read ${s.title.en}"], main a[aria-label^="${s.title.en}"]`;

test("shelf: free stories open, paid ones are locked", async ({ page }) => {
  await page.goto("/stories?age=all");
  for (const s of free) await expect(page.locator(readLink(s.title.en))).toHaveCount(1);
  for (const s of paid) await expect(page.locator(lockedLink(s)).first()).toHaveAttribute("href", `/stories/${s.id}`);
});

test("shelf: the age filter shows each age group's stories", async ({ page, t }) => {
  // One check per story on a shelf of 40+ books: give it room.
  test.setTimeout(180_000);
  await page.goto("/stories?age=all");
  await ready(page);
  await page.getByRole("link", { name: t.shelf.ages("8-9"), exact: true }).click();
  await expect(page).toHaveURL(/age=8-9/);
  const older = library.filter((s) => s.ageBands.includes("8-9"));
  for (const s of older) await expect(page.locator(anyCard(s)).first()).toBeVisible();
  for (const s of STORIES.filter((s) => !s.ageBands.includes("8-9") || (s.course && !tasters.has(s.id)))) await expect(page.locator(anyCard(s))).toHaveCount(0);
  await page.getByRole("link", { name: t.shelf.allAges, exact: true }).click();
  await expect(page).toHaveURL(/age=all/);
  for (const s of library) await expect(page.locator(anyCard(s)).first()).toBeAttached();
});

test("a locked story, signed out: plans need a sign-in, and no words are sent", async ({ page, t }) => {
  const story = paid[0];
  await page.goto(`/stories/${story.id}`);
  await expect(page.getByText(t.packs.inPack(t.packs.names[story.pack ?? "story"], t.plans.names.reader))).toBeVisible();
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
  // Every story that isn't free: the library's and the learning packages'.
  for (const s of STORIES.filter((x) => !x.isFree)) {
    for (const p of [s.pages[1].en, s.pages[1].am]) expect(bodies.some((b) => b.includes(p)), `a script carries words of ${s.id}`).toBe(false);
  }
});
