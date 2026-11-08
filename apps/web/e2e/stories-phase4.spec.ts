import { getStory } from "../src/content/stories";
import { allPaths, storyPath } from "../src/lib/story-path";
import { expect, givePlan, passMathsGate, ready, test } from "./support/fixtures";

/*
  Phase 4 in the reader: the child's name in stories ({name} and the bookplate) and story
  choices ("Which Way, Lali?"). Page turns are instant with reduced motion.
*/
test.use({ reducedMotion: "reduce" });

const next = (page: import("@playwright/test").Page) => page.getByRole("button", { name: "Next page", exact: true }).first();
const art = (page: import("@playwright/test").Page, p: number | string) => page.locator(`[data-art-face="${p}"]:visible`).first();

test("{name}: the bookplate and the page say the chosen child's name; without a child it's 'friend'", async ({ page, signIn, t, uiLang, request }) => {
  // "Opposites" says {name} on its first page. It is a library story: open with any plan.
  const id = "opposites";
  const total = getStory(id)!.pages.length;
  const family = await signIn();
  await givePlan(request, family, "reader");
  // No child yet: no bookplate, and {name} reads as the friendly default.
  await page.goto(`/stories/${id}`);
  await ready(page);
  await expect(art(page, 0)).toBeVisible();
  await expect(page.locator("[data-bookplate]")).toHaveCount(0);
  await expect(page.getByRole("button", { name: new RegExp(`^${uiLang === "am" ? "ጓደኛ" : "friend"}!`) }).first()).toBeVisible();
  await expect(page.getByText("{name}")).toHaveCount(0);

  // A child called Abeba.
  await page.goto("/account");
  await ready(page);
  await passMathsGate(page);
  await page.locator("#child-name").fill("Abeba");
  await page.getByRole("button", { name: t.account.addChildBtn }).click();
  await expect(page.getByText("Abeba").first()).toBeVisible();

  await page.goto(`/stories/${id}`);
  await ready(page);
  // The bookplate comes before page 1.
  await expect(page.locator('[data-bookplate="Abeba"]:visible')).toBeVisible();
  await expect(page.getByText(t.storyName.belongsTo).first()).toBeVisible();
  await expect(art(page, "plate")).toBeVisible();
  await next(page).click();
  await expect(art(page, 0)).toBeVisible();
  // Page 1 of 13 still says so: the bookplate isn't counted.
  await expect(page.getByText(`1 / ${total}`).first()).toBeVisible();
  await expect(page.getByRole("button", { name: /^Abeba!/ }).first()).toBeVisible();
  await expect(page.getByText("{name}")).toHaveCount(0);
  // The browser voice reads it (no recorded narration on a {name} page): "Read to me" is there.
  await expect(page.locator("[data-read-own]:visible").first()).toBeVisible();

  // On to the end: "Well done, Abeba!"
  for (let i = 1; i < total; i++) await next(page).click();
  await page.getByRole("button", { name: "Finish the story", exact: true }).first().click();
  await expect(page.locator('[data-end-name="Abeba"]:visible')).toBeVisible();
});

test("story choices: pick a way, follow the path, see the choices at the end, try the other way", async ({ page, signIn, t, uiLang }) => {
  const story = getStory("which-way-lali")!;
  // Every way through has ten pages, and every way reaches the honey tree and home.
  const paths = allPaths(story);
  expect(paths).toHaveLength(4);
  for (const p of paths) {
    expect(p).toHaveLength(10);
    expect(p.slice(-2)).toEqual([12, 13]);
  }
  expect(storyPath(story, { 2: 1, 7: 0 }).seq).toEqual([0, 1, 2, 5, 6, 7, 8, 9, 12, 13]);

  // The story is in a paid pack; an admin can open every story.
  await signIn("admin");
  await page.goto("/stories/which-way-lali");
  await ready(page);
  await expect(art(page, 0)).toBeVisible();
  // Find Lali counts only the pages on the path (10, not 14).
  await page.locator('[data-find-lali="hidden"]:visible').first().click();
  await expect(page.getByText(t.findLali.counter(1, 10)).first()).toBeVisible();

  await next(page).click();
  await next(page).click();
  await expect(art(page, 2)).toBeVisible();
  // The book waits for a choice: no wrong answer, just two ways.
  await expect(next(page)).toBeDisabled();
  const choices = page.locator("[data-choices]:visible").first();
  await expect(choices).toBeVisible();
  await expect(page.locator("[data-choice-prompt]:visible").first()).toContainText(story.pages[2].choices!.prompt[uiLang]);
  await choices.locator('[data-choice="1"]').click();
  // The forest path (page 6 of the book is index 5), page 4 of this read.
  await expect(art(page, 5)).toBeVisible();
  await expect(page.getByText("4 / 10").first()).toBeVisible();
  // The dots follow the path taken: the choice page is marked.
  await expect(page.locator("[data-dot-choice]").first()).toBeAttached();

  await next(page).click();
  await expect(art(page, 6)).toBeVisible();
  await next(page).click();
  await expect(art(page, 7)).toBeVisible();
  await page.locator('[data-choices]:visible [data-choice="0"]').first().click();
  await expect(art(page, 8)).toBeVisible();
  await next(page).click();
  await expect(art(page, 9)).toBeVisible();
  // The owl's branch skips the butterflies' pages and rejoins at the honey tree.
  await next(page).click();
  await expect(art(page, 12)).toBeVisible();
  await next(page).click();
  await page.getByRole("button", { name: "Finish the story", exact: true }).first().click();

  const chosen = page.locator("[data-end-chosen]:visible").first();
  await expect(chosen).toBeVisible();
  const lower = (s: string) => (uiLang === "en" ? s.charAt(0).toLowerCase() + s.slice(1) : s);
  await expect(chosen).toContainText(t.choices.youChose([story.pages[2].choices!.options[1].label[uiLang], story.pages[7].choices!.options[0].label[uiLang]].map(lower).join(` ${t.choices.and} `)));
  await expect(page.getByText(t.findLali.ending(1, 10)).first()).toBeVisible();
  await expect(page.locator("[data-end-try-other]:visible").first()).toBeVisible();

  // Read again: the choices are fresh, and the way not taken says "New!".
  await page.locator("[data-read-again]:visible").first().click();
  await expect(art(page, 0)).toBeVisible();
  await next(page).click();
  await next(page).click();
  const again = page.locator("[data-choices]:visible").first();
  await expect(again.locator('[data-choice="0"]').getByText(t.choices.newWay)).toBeVisible();
  await expect(again.locator('[data-choice="1"]').getByText(t.choices.newWay)).toHaveCount(0);
  await again.locator('[data-choice="0"]').click();
  // The river path this time.
  await expect(art(page, 3)).toBeVisible();
  await next(page).click();
  await expect(art(page, 4)).toBeVisible();
  await next(page).click();
  await expect(art(page, 7)).toBeVisible();
});

test("the printable activities treat branch pages like any other, and fill in {name}", async ({ page, signIn }) => {
  await signIn("admin");
  await page.goto("/stories/which-way-lali/activities");
  await expect(page.locator('[data-activities="which-way-lali"]')).toBeVisible();
  await page.goto("/stories/opposites/activities");
  await expect(page.locator('[data-activities="opposites"]')).toBeVisible();
  await expect(page.getByText("{name}")).toHaveCount(0);
});
