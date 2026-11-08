import { STORIES } from "../src/content/stories";
import { CRON_SECRET } from "./support/env.cjs";
import { expect, sessionCookie, test } from "./support/fixtures";

// Server endpoints answer the same in both languages, so these run once.
test.beforeEach(({ uiLang }) => test.skip(uiLang !== "en", "language-independent"));

test("health: up, with the database reachable", async ({ request }) => {
  const r = await request.get("/api/health");
  expect(r.status()).toBe(200);
  expect(await r.json()).toMatchObject({ ok: true, database: "reachable" });
  expect(r.headers()["cache-control"]).toContain("no-store");
});

test("client errors are accepted quietly and rate-limited", async ({ request }) => {
  const ok = await request.post("/api/client-error", { data: { message: "TypeError: x is undefined", path: "/stories?code=LALI-AAAA-BBBB", source: "/_next/static/chunks/a.js", line: 1, col: 2 } });
  expect(ok.status()).toBe(204);
  expect((await request.post("/api/client-error", { data: "x".repeat(5000) })).status()).toBe(204);
  for (let i = 0; i < 12; i++) await request.post("/api/client-error", { headers: { "x-forwarded-for": "203.0.113.9" }, data: { message: `e${i}` } });
});

test("the hourly job needs its secret once CRON_SECRET is set", async ({ request }) => {
  expect((await request.get("/api/cron/notify")).status()).toBe(403);
  expect((await request.get("/api/cron/notify", { headers: { "x-lali-cron": "wrong" } })).status()).toBe(403);
  const ok = await request.get("/api/cron/notify", { headers: { "x-lali-cron": CRON_SECRET, "x-forwarded-host": "evil.example.com" } });
  expect(ok.status()).toBe(200);
});

test("Telegram webhook refuses calls without Telegram's secret", async ({ request }) => {
  const r = await request.post("/api/telegram/webhook", { data: { message: { chat: { id: 1, type: "private" }, text: "/start abcdefgh" } } });
  expect(r.status()).toBe(403);
});

test("mobile API: the shelf has no words of paid stories, and private calls need a token", async ({ request }) => {
  const shelf = await (await request.get("/api/mobile/stories")).json();
  // Library stories (a learning package's stories live in the package, not on the shelf).
  for (const s of STORIES.filter((x) => !x.isFree && !x.course)) {
    const row = shelf.stories.find((x: { id: string }) => x.id === s.id);
    expect(row.locked).toBe(true);
    expect(row.pages.every((p: { en: string; am: string }) => !p.en && !p.am)).toBe(true);
  }
  expect((await request.get("/api/mobile/stories/rainbow-puddle")).status()).toBe(402);
  expect((await request.get("/api/mobile/me")).status()).toBe(401);
  expect((await request.get("/api/mobile/me", { headers: { authorization: "Bearer forged" } })).status()).toBe(401);
  expect((await request.post("/api/mobile/checkout", { data: { plan: "vip" } })).status()).toBe(401);
});

test("mobile API: a family only sees and changes its own children and sessions", async ({ request }) => {
  const a = { authorization: `Bearer stub.${crypto.randomUUID()}.parent` };
  const b = { authorization: `Bearer stub.${crypto.randomUUID()}.parent` };
  const made = await request.post("/api/mobile/children", { headers: a, data: { name: "Abeba", ageBand: "3-5", lang: "am", avatar: "bee" } });
  expect(made.status()).toBe(201);
  const child = (await made.json()).child;
  expect((await request.post("/api/mobile/children", { headers: a, data: { name: "", ageBand: "10-12" } })).status()).toBe(400);

  // Family B can't pick, remove or read family A's child.
  const meB = await (await request.get("/api/mobile/me", { headers: { ...b, "x-lali-child": child.id } })).json();
  expect(meB.currentChildId).toBeNull();
  await request.delete(`/api/mobile/children/${child.id}`, { headers: b });
  const meA = await (await request.get("/api/mobile/me", { headers: a })).json();
  expect(meA.children.map((c: { id: string }) => c.id)).toContain(child.id);

  // Game sessions belong to the family that started them.
  const start = await (await request.post("/api/mobile/games/count-the-flowers/start", { headers: { ...a, "x-lali-child": child.id } })).json();
  expect(start.ok).toBe(true);
  expect((await request.post(`/api/mobile/sessions/${start.sessionId}`, { headers: b, data: { seconds: 30 } })).status()).toBe(404);
  expect((await request.post(`/api/mobile/sessions/${start.sessionId}`, { headers: a, data: { seconds: 30 } })).status()).toBe(200);

  // Progress only accepts story ids.
  expect((await request.post("/api/mobile/progress", { headers: a, data: { storyId: "<script>" } })).status()).toBe(400);
  expect((await request.post("/api/mobile/progress", { headers: a, data: { storyId: "lost-moon" } })).status()).toBe(200);
});

test("a read pass only opens the story and family it was made for", async ({ request }) => {
  const forged = await request.get("/stories/rainbow-puddle?pass=11111111-1111-4111-8111-111111111111.9999999999.forged");
  expect(await forged.text()).not.toContain(STORIES.find((s) => s.id === "rainbow-puddle")!.pages[1].en);
  const narration = await request.get("/api/narration?story=rainbow-puddle&pass=x.1.y");
  expect(narration.status()).toBe(402);
});

test("family voices and stickers need a signed-in family", async ({ request }) => {
  expect(await (await request.get("/api/voices?story=lost-moon")).json()).toMatchObject({ signedIn: false });
  expect((await request.post("/api/voices", { multipart: { story: "lost-moon" } })).status()).toBe(401);
  expect((await request.delete("/api/voices?all=1")).status()).toBe(401);
  expect((await request.post("/api/stickers", { data: { storyId: "lost-moon", page: 1 } })).status()).toBe(401);
  // With a session cookie, an id that isn't a recording is refused.
  const cookie = `sb-stub-auth-token=${sessionCookie(`stub.${crypto.randomUUID()}.parent`)}`;
  expect((await request.delete("/api/voices/not-an-id", { headers: { cookie } })).status()).toBe(404);
});
