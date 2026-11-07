import { randomUUID } from "node:crypto";

import { getStory } from "../src/content/stories";
import { ANIMALS } from "../src/lib/schools/shared";
import { expect, ready, sessionCookie, test } from "./support/fixtures";

/*
  School and classroom licences (docs/SCHOOLS.md) with the fake Supabase: an admin adds a school
  and a teacher, the teacher makes a class and adds pupils, a pupil signs in on the class tablet
  with their three pictures and reads; five wrong tries lock a pupil until the teacher unlocks.
*/
test.use({ reducedMotion: "reduce" });

test("a parent sees no teacher's corner, and can't reach the schools admin", async ({ page, signIn }) => {
  await signIn("parent");
  await page.goto("/teach");
  await expect(page.locator("[data-not-teacher]")).toBeVisible();
  await page.goto("/admin/schools");
  await page.waitForURL(/\/account$/);
});

test("an unknown class code shows a friendly note", async ({ page, t }) => {
  await page.goto("/class/LALI-ZZZ-ZZZ");
  await expect(page.getByText(t.classTablet.notFound)).toBeVisible();
});

test("school licence: admin, teacher, class code, picture password and the class reader", async ({ page, context, signIn, request, baseURL, t, uiLang }) => {
  test.setTimeout(150_000);
  const school = `Bole Hills School ${randomUUID().slice(0, 6)}`;
  // The teacher signed in to Lali once (the fake makes their profile on first sight).
  const teacherId = randomUUID();
  const teacherToken = `stub.${teacherId}.parent`;
  expect((await request.get("/api/read-aloud", { headers: { authorization: `Bearer ${teacherToken}` } })).ok()).toBe(true);

  // 1. An admin adds the school and makes them its teacher.
  await signIn("admin");
  await page.goto("/admin/schools");
  await ready(page);
  await page.locator('input[name="name"]').last().fill(school);
  await page.locator('input[name="contact_name"]').last().fill("Ato Dawit");
  await page.locator('input[name="seats"]').last().fill("30");
  await page.locator('input[name="ends_on"]').last().fill("2030-06-30");
  await page.getByRole("button", { name: "Add school" }).click();
  const card = page.locator(`[data-school="${school}"]`);
  await expect(card).toBeVisible();
  await card.locator('input[name="email"]').fill(`parent-${teacherId.slice(0, 8)}@example.com`);
  await card.getByRole("button", { name: "Make teacher" }).click();
  await expect(card.getByText("is now a teacher")).toBeVisible();

  // 2. The teacher makes a class and adds two pupils (first names only).
  await context.addCookies([{ name: "sb-stub-auth-token", value: sessionCookie(teacherToken), url: baseURL! }]);
  await page.goto("/teach");
  await ready(page);
  await expect(page.getByRole("heading", { name: t.teach.title, level: 1 })).toBeVisible();
  await expect(page.getByText(school)).toBeVisible();
  await page.locator("#class-name").fill("KG 2 Blue");
  await page.locator("#class-age").selectOption("3-5");
  await page.getByRole("button", { name: t.teach.create }).click();
  await page.waitForURL(/\/teach\/[0-9a-f-]{36}$/);
  const classUrl = page.url();
  const code = (await page.locator("[data-class-code]").innerText()).trim();
  expect(code).toMatch(/^LALI-KG2-[A-Z0-9]{3}$/);

  for (const name of ["Abeba", "Kidus"]) {
    await page.locator("#pupil-name").fill(name);
    await page.getByRole("button", { name: t.teach.add, exact: true }).click();
    await expect(page.locator(`[data-teach-pupil="${name}"]`)).toBeVisible();
  }
  const picture = async (name: string) => (await page.locator(`[data-teach-pupil="${name}"] [data-picture]`).getAttribute("data-picture"))!.split(",").map(Number);
  const abeba = await picture("Abeba");
  const kidus = await picture("Kidus");
  expect(abeba).toHaveLength(3);

  // This week: Ten Tukuls.
  await page.locator('[data-assign="ten-tukuls"]').last().click();
  await expect(page.locator("[data-assigned-list]")).toContainText(getStory("ten-tukuls")!.title[uiLang]);

  // 3. The class tablet: Abeba taps her avatar, then her three pictures.
  await page.goto(`/class/${code}`);
  await ready(page);
  await expect(page.getByRole("heading", { name: t.classTablet.title })).toBeVisible();
  await page.getByRole("button", { name: "Abeba" }).click();
  for (const a of abeba) await page.locator(`[data-animal-btn="${a}"]`).click();
  await expect(page.getByText(t.classTablet.hello("Abeba"), { exact: true })).toBeVisible();
  // The session is a signed, HttpOnly cookie for this pupil only.
  const cookie = (await context.cookies()).find((c) => c.name === "lali-pupil");
  expect(cookie?.httpOnly).toBe(true);
  expect(cookie?.value).not.toContain("Abeba");
  await expect(page.getByText(t.classTablet.thisWeek)).toBeVisible();

  // She reads this week's story: her bookplate, then to The End.
  await page.locator('[data-shelf-story="ten-tukuls"]').first().click();
  await expect(page.locator('[data-bookplate="Abeba"]:visible')).toBeVisible();
  const next = page.getByRole("button", { name: "Next page", exact: true }).first();
  const total = getStory("ten-tukuls")!.pages.length;
  for (let i = 0; i < total; i++) await next.click();
  await page.getByRole("button", { name: "Finish the story", exact: true }).first().click();
  await expect(page.locator('[data-end-name="Abeba"]:visible')).toBeVisible();
  // No sticker book, family voices or printables on the class tablet.
  await expect(page.locator("[data-end-stickers]:visible")).toHaveCount(0);
  await expect(page.locator("[data-end-activities]:visible")).toHaveCount(0);

  // A forged cookie is ignored.
  await context.addCookies([{ name: "lali-pupil", value: `${randomUUID()}.${randomUUID()}.9999999999.forged`, url: baseURL! }]);
  await page.goto(`/class/${code}`);
  await expect(page.getByRole("heading", { name: t.classTablet.title })).toBeVisible();

  // 4. Kidus gets his pictures wrong five times: locked until the teacher unlocks him.
  const wrong = ANIMALS.map((_, i) => i).filter((i) => i !== kidus[0]).slice(0, 3);
  await page.getByRole("button", { name: "Kidus" }).click();
  for (let attempt = 1; attempt <= 5; attempt++) {
    for (const a of wrong) await page.locator(`[data-animal-btn="${a}"]`).click();
    await expect(page.locator("[data-tablet-message]")).toHaveAttribute("data-tablet-message", attempt < 5 ? t.classTablet.wrong : t.classTablet.locked);
  }
  await expect(page.locator("[data-animal-btn]")).toHaveCount(0);

  // 5. The teacher's class page: progress, and the unlock.
  await page.goto(classUrl);
  await expect(page.locator('[data-progress-row="Abeba"] [data-finished]')).toHaveAttribute("data-finished", "1");
  const kidusCard = page.locator('[data-teach-pupil="Kidus"]');
  await expect(kidusCard.getByText(t.teach.locked)).toBeVisible();
  await kidusCard.locator("[data-unlock]").click();
  await expect(kidusCard.getByText(t.teach.locked)).toHaveCount(0);

  // And now Kidus can sign in with the right pictures.
  await page.goto(`/class/${code}`);
  await page.getByRole("button", { name: "Kidus" }).click();
  for (const a of kidus) await page.locator(`[data-animal-btn="${a}"]`).click();
  await expect(page.getByText(t.classTablet.hello("Kidus"), { exact: true })).toBeVisible();
  // "Finished! Next friend" signs him out on this tablet.
  await page.locator("[data-pupil-finished]").click();
  await expect(page.getByRole("heading", { name: t.classTablet.title })).toBeVisible();
});
