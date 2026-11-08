import type { APIRequestContext, Page } from "@playwright/test";

import { COURSES } from "../src/content/courses";
import type { Question } from "../src/content/courses/types";
import { courseA, FIXTURE_A, FIXTURE_B } from "./fixtures/course";
import { fmtDate } from "../src/i18n/format";
import { addChild, expect, givePlan, passMathsGate, ready, stubRows, test, travel } from "./support/fixtures";

/*
  Learning packages (docs/PACKAGES.md) with the test packages in e2e/fixtures/course.ts: buying one
  with (stubbed) Chapa, the level map, lessons, the quiz player (passed and failed), VIP's one
  package at a time and its 4-day pace (with the stubbed clock), the certificate and the sticker.
*/
test.use({ reducedMotion: "reduce" });

type Lang = "en" | "am";
type T = Record<Lang, string>;
type PublicItem = { label?: T };
type PublicQ = { kind: Question["kind"]; options?: PublicItem[]; items?: PublicItem[]; left?: PublicItem[]; right?: PublicItem[] };

const bearer = (family: string) => ({ authorization: `Bearer stub.${family}.parent` });

/** Buys a package through the app's API and Chapa's (stubbed) callback, as the family. */
async function buyByApi(request: APIRequestContext, family: string, course: string) {
  const r = await request.post("/api/mobile/checkout", { headers: bearer(family), data: { course } });
  expect(r.status()).toBe(200);
  const url = (await r.json()).url as string;
  const txRef = /lali-course-[a-z0-9]+-[0-9a-f]{20}/.exec(decodeURIComponent(url))![0];
  // The stubbed Chapa says "pending" the first time, then "success".
  expect((await (await request.post("/api/payments/chapa", { data: { tx_ref: txRef } })).json()).outcome).toBe("pending");
  expect((await (await request.post("/api/payments/chapa", { data: { tx_ref: txRef } })).json())).toMatchObject({ kind: "course", outcome: "paid" });
  return txRef;
}

/** The right answers to a quiz the API sent (without answers), worked out from the fixture course. */
function rightAnswers(quizId: string, shown: PublicQ[]): unknown[] {
  const quiz = [...courseA.levels.map((l) => l.quiz), courseA.finalTest].find((q) => q.id === quizId)!;
  return quiz.questions.map((q, i) => {
    const s = shown[i];
    if (q.kind === "choice" || q.kind === "count" || q.kind === "truefalse") return q.answer;
    if (q.kind === "order") return q.items.map((it) => s.items!.findIndex((x) => x.label?.en === it.label?.en));
    return q.pairs.map((p) => s.right!.findIndex((x) => x.label?.en === p.right.label?.en));
  });
}

async function courseMap(request: APIRequestContext, family: string, course = FIXTURE_A as string) {
  const r = await request.get(`/api/mobile/courses/${course}`, { headers: bearer(family) });
  expect(r.status()).toBe(200);
  return r.json();
}

/** Passes a level quiz or the final test through the app's API. */
async function passByApi(request: APIRequestContext, family: string, which: { level?: number; final?: boolean }) {
  const map = await courseMap(request, family);
  const quiz = which.final ? map.final.quiz : map.levels[which.level!].quiz;
  expect(quiz.questions, "the quiz is open, without answers").toBeInstanceOf(Array);
  expect(JSON.stringify(quiz)).not.toContain('"answer"');
  const r = await request.post(`/api/mobile/quizzes/${quiz.id}/attempt`, { headers: bearer(family), data: { answers: rightAnswers(quiz.id, quiz.questions) } });
  expect(r.status()).toBe(200);
  const { attempt } = await r.json();
  expect(attempt.passed).toBe(true);
  return attempt;
}

const L = (v: T | undefined, lang: Lang) => v?.[lang] ?? "";

/** Answers course A's first quiz in the player, all right or all wrong. */
async function answerFirstQuiz(page: Page, lang: Lang, right: boolean) {
  const qs = courseA.levels[0].quiz.questions;
  for (const q of qs) {
    await expect(page.locator(`[data-question-kind="${q.kind}"]`)).toBeVisible();
    if (q.kind === "choice") await page.locator(`[data-option="${right ? q.answer : 0}"]`).click();
    if (q.kind === "count") {
      await page.locator(`[data-digit="${right ? q.answer : 9}"]`).click();
      await page.locator("[data-count-ok]").click();
    }
    if (q.kind === "order") {
      if (right) {
        const target = q.items.map((it) => L(it.label, lang));
        for (let pos = 0; pos < target.length; pos++) {
          const texts = await page.locator("[data-order-item]").allInnerTexts();
          const j = texts.findIndex((x) => x.includes(target[pos]));
          if (j !== pos) {
            await page.locator("[data-order-item] button").nth(pos).click();
            await page.locator("[data-order-item] button").nth(j).click();
            await expect.poll(async () => (await page.locator("[data-order-item]").allInnerTexts())[pos]).toContain(target[pos]);
          }
        }
      }
      await page.locator("[data-order-done]").click();
    }
    if (q.kind === "match") {
      const rights = await page.locator("[data-match-right]").allInnerTexts();
      for (const [i, p] of q.pairs.entries()) {
        // Right: each left with its partner. Wrong: each left with the other one's partner.
        const want = L((right ? p : q.pairs[(i + 1) % q.pairs.length]).right.label, lang);
        await page.locator(`[data-match-left="${i}"]`).click();
        await page.locator(`[data-match-right="${rights.findIndex((x) => x.includes(want))}"]`).click();
      }
      await page.locator("[data-match-done]").click();
    }
    if (q.kind === "truefalse") await page.locator(`[data-tf="${right === q.answer ? "yes" : "no"}"]`).click();
  }
}

test("the catalogue: ten packages with ages, outcome and price; the test packages aren't listed", async ({ page, t }) => {
  await page.goto("/courses");
  await ready(page);
  await expect(page.locator("[data-course-card]")).toHaveCount(10);
  for (const c of COURSES) await expect(page.locator(`[data-course-card="${c.id}"]`)).toBeVisible();
  await expect(page.locator(`[data-course-card="${FIXTURE_A}"]`)).toHaveCount(0);
  // Not ready yet (being written, or coming soon) or ready to buy, each with its price.
  for (const c of COURSES) {
    const card = page.locator(`[data-course-card="${c.id}"]`);
    await expect(card).toHaveAttribute("data-course-status", c.status === "soon" ? "soon" : c.levels.length && c.finalTest.questions.length ? "live" : "writing");
    await expect(card.locator("[data-price]")).toHaveAttribute("data-price", String(c.priceEtb));
  }
  await expect(page.getByRole("heading", { name: t.courses.title, level: 1 })).toBeVisible();
});

test("a package with no levels yet says so kindly, and nothing can be bought", async ({ page }) => {
  const empty = COURSES.find((c) => !c.levels.length);
  test.skip(!empty, "every package has levels now");
  await page.goto(`/courses/${empty!.id}`);
  await expect(page.locator("[data-course-empty]")).toBeVisible();
  await expect(page.locator('[data-course-note="not-ready"]')).toBeVisible();
  await expect(page.locator("[data-buy-course]")).toHaveCount(0);
});

test("buying a package with Chapa (stubbed): pay, confirm, and it's the family's for good", async ({ page, signIn, t, uiLang, request }) => {
  const family = await signIn();
  await addChild(page, "Abeba");
  await page.goto(`/courses/${FIXTURE_A}`);
  await ready(page);
  await expect(page.locator('[data-course][data-access="none"]')).toBeVisible();
  // Locked for now: no lesson or quiz links.
  await expect(page.locator("[data-lesson] >> visible=true").first()).toBeVisible();
  await expect(page.locator("a[data-lesson]")).toHaveCount(0);
  await Promise.all([page.waitForURL(/checkout\.chapa\.co/), page.locator(`[data-buy-course="${FIXTURE_A}"]`).first().click()]);
  expect(page.url()).toMatch(/lali-course-testa-[0-9a-f]{20}/);
  await expect(page.locator("#amount")).toHaveText("1500 ETB");
  const txRef = /lali-course-testa-[0-9a-f]{20}/.exec(page.url())![0];
  // A package reference is refused by the plan and gift return pages.
  const planDone = await request.get(`/subscribe/done?tx_ref=${txRef}`);
  expect(await planDone.text()).not.toContain(t.done.thanks);
  await Promise.all([page.waitForURL(/\/courses\/done\?tx_ref=lali-course-testa-/), page.click("#pay")]);
  await expect(page.getByRole("heading", { name: t.courses.boughtThanks })).toBeVisible({ timeout: 20_000 });
  await expect(page.getByText(t.courses.boughtSub(courseA.title[uiLang]))).toBeVisible();
  // Recorded once, by the server.
  const owned = await stubRows<{ course_id: string; tx_ref: string; amount_etb: number }>(request, "family_courses", family);
  expect(owned).toEqual([expect.objectContaining({ course_id: FIXTURE_A, tx_ref: txRef, amount_etb: 1500 })]);
  // The callback again changes nothing.
  expect((await (await request.post("/api/payments/chapa", { data: { tx_ref: txRef } })).json()).outcome).toBe("already");
  await page.locator("[data-open-package]").click();
  await expect(page.locator('[data-course][data-access="owned"]')).toBeVisible();
  await expect(page.locator("a[data-lesson]").first()).toBeVisible();
  // Buying again is refused.
  const again = await request.post("/api/mobile/checkout", { headers: bearer(family), data: { course: FIXTURE_A } });
  expect(again.status()).toBe(400);
});

test("the level map, lessons, and the quiz failed then passed", async ({ page, signIn, t, uiLang, request }) => {
  const family = await signIn();
  await addChild(page, "Abeba");
  await buyByApi(request, family, FIXTURE_A);
  await page.goto(`/courses/${FIXTURE_A}`);
  await ready(page);
  await expect(page.locator('[data-stone="0"]')).toHaveAttribute("data-state", "open");
  await expect(page.locator('[data-stone="1"]')).toHaveAttribute("data-state", "locked");
  await expect(page.locator('[data-stone="2"]')).toHaveAttribute("data-state", "locked");

  // A demonstration: tap the three flowers; its onDone counts the lesson.
  await page.locator('[data-lesson="demo-tap-three"]').click();
  for (const i of [0, 1, 2]) await page.locator(`[data-demo-flower="${i}"]`).click();
  await expect(page.locator("[data-lesson-finished]")).toBeVisible();
  await expect.poll(async () => (await stubRows<{ lessons_done: string[] }>(request, "course_progress", family))[0]?.lessons_done ?? []).toContain("demo-tap-three");

  // A teaching story in the reader: The End counts the lesson.
  await page.goto(`/courses/${FIXTURE_A}`);
  await page.locator('[data-lesson="story-test-course-story"]').click();
  await expect(page.locator('[data-bookplate="Abeba"]:visible')).toBeVisible();
  const next = page.getByRole("button", { name: "Next page", exact: true }).first();
  await next.click();
  await next.click();
  await page.getByRole("button", { name: "Finish the story", exact: true }).first().click();
  await expect(page.locator('[data-end-name="Abeba"]:visible')).toBeVisible();
  await expect.poll(async () => (await stubRows<{ lessons_done: string[] }>(request, "course_progress", family))[0]?.lessons_done ?? []).toContain("story-test-course-story");

  // Practice: gentle feedback with the explanation, nothing scored.
  await page.goto(`/courses/${FIXTURE_A}`);
  await page.locator('[data-lesson="practice-test-a1-practice"]').click();
  await page.locator('[data-tf="yes"]').click();
  await expect(page.locator('[data-feedback="right"]')).toBeVisible();
  await expect(page.getByText(courseA.levels[0].lessons[2].kind === "practice" ? courseA.levels[0].lessons[2].quiz.questions[0].explain![uiLang] : "")).toBeVisible();
  await page.locator("[data-next]").click();
  await page.locator('[data-option="0"]').click();
  await expect(page.locator('[data-feedback="try"]')).toBeVisible();
  await page.locator("[data-next]").click();
  await expect(page.locator("[data-practice-done]")).toBeVisible();
  expect(await stubRows(request, "quiz_attempts", family)).toHaveLength(0);

  // The level quiz, every answer wrong: not yet, kindly, with the answers to look at together.
  await page.goto(`/courses/${FIXTURE_A}`);
  await page.locator('[data-take-quiz="a1"]').click();
  await expect(page.locator('[data-quiz="test-a1-quiz"]')).toBeVisible();
  await answerFirstQuiz(page, uiLang, false);
  await expect(page.locator('[data-quiz-result="not-yet"]')).toBeVisible();
  await page.locator("[data-quiz-review]").click();
  await expect(page.getByText(courseA.levels[0].quiz.questions[0].explain![uiLang])).toBeVisible();
  await page.getByRole("button", { name: t.quiz.again }).click();

  // Every answer right: passed, with stars, and the next level opens (bought: no waiting).
  await answerFirstQuiz(page, uiLang, true);
  await expect(page.locator('[data-quiz-result="passed"]')).toBeVisible();
  const attempts = await stubRows<{ quiz_id: string; score: number; total: number }>(request, "quiz_attempts", family);
  expect(attempts.map((a) => [a.quiz_id, a.score, a.total])).toEqual([
    ["test-a1-quiz", 0, 5],
    ["test-a1-quiz", 5, 5],
  ]);
  await page.locator("[data-quiz-back]").click();
  await expect(page.locator('[data-stone="0"]')).toHaveAttribute("data-state", "passed");
  await expect(page.locator('[data-stone="1"]')).toHaveAttribute("data-state", "open");
  await expect(page.locator('[data-stone="0"] [aria-label="3 stars"]')).toBeVisible();
});

test("quizzes are scored on the server, and only for open levels", async ({ request, uiLang }) => {
  test.skip(uiLang !== "en", "language-independent");
  const family = crypto.randomUUID();
  const h = bearer(family);
  expect((await request.post("/api/mobile/children", { headers: h, data: { name: "Abeba", ageBand: "3-5" } })).status()).toBe(201);
  // Without the package: no quiz and no attempt.
  expect((await request.post("/api/mobile/quizzes/test-a1-quiz/attempt", { headers: h, data: { answers: [] } })).status()).toBe(402);
  await buyByApi(request, family, FIXTURE_A);
  const map = await courseMap(request, family);
  // Level 2's questions aren't sent while it's locked; open quizzes come without answers.
  expect(map.levels[1].quiz.questions).toBe(2);
  expect(JSON.stringify(map)).not.toMatch(/"answer"|"explain"|"pairs"/);
  expect((await request.post("/api/mobile/quizzes/test-a2-quiz/attempt", { headers: h, data: { answers: [true, 2] } })).status()).toBe(423);
  // Answers that aren't right score nothing, whatever shape they have.
  const junk = await request.post("/api/mobile/quizzes/test-a1-quiz/attempt", { headers: h, data: { answers: ["1", "3", [0, 0, 0], [1, 1], "yes"] } });
  expect((await junk.json()).attempt).toMatchObject({ score: 0, total: 5, passed: false });
});

test("plan gates: Starter, Family and VIP, enforced on the server", async ({ request, uiLang }) => {
  test.skip(uiLang !== "en", "language-independent");
  const family = crypto.randomUUID();
  const h = bearer(family);
  const me = async () => (await request.get("/api/mobile/me", { headers: h })).json();
  const addKid = (name: string) => request.post("/api/mobile/children", { headers: h, data: { name, ageBand: "3-5" } });

  // Starter: one child, and no games, voices, narration, progress map, weekly note or offline.
  await givePlan(request, family, "reader");
  expect((await me()).entitlements).toMatchObject({ planId: "reader", maxChildren: 1, library: true, games: false, familyVoices: false, narration: false, progressMap: false, telegramWeekly: false, offline: false, allCourses: false });
  expect((await addKid("Abeba")).status()).toBe(201);
  expect((await addKid("Kidus")).status()).toBe(402);
  const games = await (await request.get("/api/mobile/games", { headers: h })).json();
  expect(games.games.find((g: { slug: string }) => g.slug === "paid-puzzle")).toMatchObject({ locked: true, url: "" });
  expect((await request.post("/api/mobile/games/paid-puzzle/start", { headers: h })).status()).toBe(402);
  const form = { file: { name: "p.webm", mimeType: "audio/webm", buffer: Buffer.from("x".repeat(2000)) }, story: "lost-moon", lang: "en", page: "0", name: "Mum", duration: "2000" };
  expect((await request.post("/api/voices", { headers: h, multipart: form })).status()).toBe(402);

  // Family: three children and everything else, but packages are bought.
  await givePlan(request, family, "learner");
  expect((await me()).entitlements).toMatchObject({ planId: "learner", maxChildren: 3, games: true, familyVoices: true, narration: true, progressMap: true, telegramWeekly: true, offline: true, allCourses: false });
  expect((await addKid("Kidus")).status()).toBe(201);
  expect((await addKid("Liya")).status()).toBe(201);
  expect((await addKid("Tsion")).status()).toBe(402);
  expect(await (await request.post("/api/mobile/games/paid-puzzle/start", { headers: h })).json()).toMatchObject({ ok: true });
  expect((await request.post(`/api/mobile/courses/${FIXTURE_A}/start`, { headers: h })).status()).toBe(402);

  // VIP: four children and every package.
  await givePlan(request, family, "vip");
  expect((await me()).entitlements).toMatchObject({ planId: "vip", maxChildren: 4, allCourses: true });
  expect((await addKid("Tsion")).status()).toBe(201);
  expect((await addKid("Yonas")).status()).toBe(402);

  // Back to Starter: nobody is deleted; the others are read-only and can't be chosen.
  await givePlan(request, family, "reader");
  const after = await me();
  expect(after.children).toHaveLength(4);
  expect(after.children.filter((c: { readOnly: boolean }) => c.readOnly)).toHaveLength(3);
  const kidus = after.children.find((c: { name: string }) => c.name === "Kidus");
  const chosen = await (await request.get("/api/mobile/me", { headers: { ...h, "x-lali-child": kidus.id } })).json();
  expect(chosen.currentChildId).toBe(after.children[0].id);
  // No plan: one child can read, the free stories open, nothing else.
  await givePlan(request, family, null);
  expect((await me()).entitlements).toMatchObject({ planId: null, maxChildren: 1, library: false, games: false });
  expect((await request.get("/api/mobile/stories/lost-moon", { headers: h })).status()).toBe(200);
  expect((await request.get("/api/mobile/stories/rainbow-puddle", { headers: h })).status()).toBe(402);
  // A learning package's story opens only through its package.
  const fidel = await request.get("/api/mobile/stories/fidel-se", { headers: h });
  expect(fidel.status()).toBe(402);
  expect(await fidel.json()).toMatchObject({ course: "fidel-foundations" });
});

test("plan gates on the website: Starter's corner, the progress map and a read-only child", async ({ page, signIn, t, request }) => {
  const family = await signIn();
  await givePlan(request, family, "learner");
  await addChild(page, "Abeba");
  await addChild(page, "Kidus");
  await givePlan(request, family, "reader");
  await page.goto("/account");
  await ready(page);
  await passMathsGate(page);
  await expect(page.locator("[data-child-readonly]")).toHaveCount(1);
  await expect(page.locator('[data-child-limit="1"]')).toBeVisible();
  await expect(page.getByText(t.gates.childLimit(1))).toBeVisible();
  await page.locator("[data-see-progress]").first().click();
  await expect(page.locator("[data-progress-locked]")).toBeVisible();
  await expect(page.getByText(t.gates.progressMap(t.plans.names.learner))).toBeVisible();
  // Games: the paid one says it comes with Family.
  await page.goto("/games/paid-puzzle");
  await expect(page.getByText(t.games.lockedFamily)).toBeVisible();
  // The shelf's chooser can't pick the read-only child.
  await page.goto("/stories");
  await expect(page.locator("button[data-readonly]")).toBeDisabled();
});

test("VIP: one package at a time per child, one new level every 4 days (stubbed clock)", async ({ page, signIn, t, uiLang, request }) => {
  const family = await signIn();
  await givePlan(request, family, "vip");
  await addChild(page, "Abeba");
  await page.goto("/courses");
  await expect(page.locator("[data-in-vip]").first()).toBeVisible();
  await expect(page.locator("[data-choosing-for]")).toBeVisible();

  // Choose package A for Abeba.
  await page.goto(`/courses/${FIXTURE_A}`);
  await ready(page);
  await expect(page.locator("[data-vip-start]")).toBeVisible();
  await page.locator(`[data-start-course="${FIXTURE_A}"]`).click();
  await expect(page.locator('[data-course-note="pace"]')).toBeVisible();
  await expect(page.locator("a[data-lesson]").first()).toBeVisible();

  // Another package waits until A is finished.
  await page.goto(`/courses/${FIXTURE_B}`);
  await expect(page.locator(`[data-one-at-a-time="${FIXTURE_A}"]`)).toBeVisible();
  expect((await request.post(`/api/mobile/courses/${FIXTURE_B}/start`, { headers: bearer(family) })).status()).toBe(409);

  // Level 1 passed: level 2 opens 4 days after level 1 opened, not now.
  const first = await passByApi(request, family, { level: 0 });
  expect(first.advanced).toBe(true);
  const opens = Date.parse(first.opensAt);
  expect(Math.round((opens - Date.now()) / 86_400_000)).toBe(4);
  await page.goto(`/courses/${FIXTURE_A}`);
  await expect(page.locator('[data-stone="1"]')).toHaveAttribute("data-state", "waiting");
  await expect(page.locator("[data-opens-at]")).toContainText(t.courses.opensOn(fmtDate(uiLang, first.opensAt)));
  await page.goto(`/courses/${FIXTURE_A}/quiz/test-a2-quiz`);
  await expect(page.locator("[data-quiz-locked]")).toBeVisible();

  // Four days later (the stubbed clock), level 2 is open.
  await travel(request, family, 4);
  await page.goto(`/courses/${FIXTURE_A}`);
  await expect(page.locator('[data-stone="1"]')).toHaveAttribute("data-state", "open");
  await passByApi(request, family, { level: 1 });
  // The final test waits for its 4 days too.
  expect((await courseMap(request, family)).final.state).toBe("waiting");
  await travel(request, family, 4);
  const done = await passByApi(request, family, { final: true });
  expect(done.completed).toBe(true);

  // Finished packages stay open, and now the next one can start.
  await page.goto(`/courses/${FIXTURE_A}`);
  await expect(page.locator("[data-course-complete]")).toBeVisible();
  await page.goto(`/courses/${FIXTURE_B}`);
  await page.locator(`[data-start-course="${FIXTURE_B}"]`).click();
  await expect(page.locator('[data-course-note="pace"]')).toBeVisible();

  // The Grown-ups' corner shows both, with level and scores, and "Choose next package" once B is done.
  await page.goto("/account");
  await ready(page);
  await passMathsGate(page);
  const card = page.locator("[data-child-courses]").first();
  await expect(card.locator(`[data-child-course="${FIXTURE_A}"]`)).toContainText(t.courses.completedOn(fmtDate(uiLang, Date.now())));
  await expect(card.locator(`[data-child-course="${FIXTURE_A}"] [data-quiz-scores]`)).toContainText("2/2");
  await expect(card.locator("[data-choose-next]")).toHaveCount(0);
});

test("the certificate and the champion sticker", async ({ page, signIn, t, uiLang, request }) => {
  const family = await signIn();
  await addChild(page, "Abeba");
  await buyByApi(request, family, FIXTURE_A);
  await passByApi(request, family, { level: 0 });
  await passByApi(request, family, { level: 1 });
  // Bought: no pace, so the final test is open straight away. Pass it in the player.
  await page.goto(`/courses/${FIXTURE_A}/quiz/test-a-final`);
  await ready(page);
  for (const q of courseA.finalTest.questions) {
    await expect(page.locator(`[data-question-kind="${q.kind}"]`)).toBeVisible();
    await page.locator(`[data-tf="${q.kind === "truefalse" && q.answer ? "yes" : "no"}"]`).click();
  }
  await expect(page.locator('[data-quiz-result="passed"]')).toBeVisible();
  await expect(page.getByRole("heading", { name: t.quiz.passedFinal })).toBeVisible();
  await page.locator("[data-certificate-link]").click();
  await expect(page.locator("[data-certificate-name]")).toHaveText("Abeba");
  await expect(page.locator("[data-certificate-course]")).toHaveText(courseA.title[uiLang]);
  await expect(page.getByText(t.courses.certTitle)).toBeVisible();
  // The champion sticker is earned.
  const stickers = await (await request.get("/api/mobile/stickers", { headers: bearer(family) })).json();
  expect(stickers.earned.map((s: { id: string }) => s.id)).toContain(`course:${FIXTURE_A}`);
  // Another family can't see it.
  await signIn();
  await page.goto(`/courses/${FIXTURE_A}/certificate`);
  await expect(page.locator("[data-certificate-missing]")).toBeVisible();
});
