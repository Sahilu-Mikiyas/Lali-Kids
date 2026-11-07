/*
  Test-only preload for `next start` (NODE_OPTIONS=--require): replaces fetch for Supabase (auth,
  PostgREST, RPC, Storage), Chapa and Telegram with an in-memory fake, so the end-to-end tests run
  without any live service. Never part of the app.

  Who is signed in comes from the access token, so tests never share a family:
    stub.<uuid>.parent   a parent        stub.<uuid>.admin   an admin
  e2e/support/session.ts builds the matching `sb-stub-auth-token` cookie. The fake profile, like
  the real sign-up trigger, appears the first time a user is seen.
*/
const crypto = require("node:crypto");

const realFetch = globalThis.fetch;
const SUPA = "https://stub.supabase.co";
const CHAPA = "https://api.chapa.co/v1";
const PRICES = { reader: 400, learner: 1200, vip: 5000 };
const DAY = 86400000;
const log = (...a) => process.env.STUB_LOG && console.log("[stub]", ...a);

const now = () => new Date().toISOString();
const uuid = () => crypto.randomUUID();

/** Rows by table. Defaults are applied on insert, as the database would. */
const db = {
  profiles: [],
  children: [],
  completions: [],
  subscriptions: [],
  payments: [],
  plans: [
    { id: "reader", name: "Reader", price_etb: 400 },
    { id: "learner", name: "Learner", price_etb: 1200 },
    { id: "vip", name: "VIP", price_etb: 5000 },
  ],
  stories: [],
  story_pages: [],
  books: [],
  games: [
    { id: "9a9a9a9a-0000-4000-8000-000000000001", slug: "count-the-flowers", title: "Count the Flowers", title_am: "አበቦቹን ቁጠሩ", description: "Count the flowers and tap the right number.", url: "/games/bee-count/index.html", age_bands: ["3-5", "6-7"], color: "#0FA3A3", thumbnail_path: null, is_free: true, status: "published", sort: 0, created_at: "2026-01-01T00:00:00.000Z" },
    { id: "9a9a9a9a-0000-4000-8000-000000000002", slug: "paid-puzzle", title: "Paid Puzzle", title_am: null, description: "A game for families with a plan.", url: "https://games.example.com/puzzle/", age_bands: ["6-7"], color: "#2B3A8C", thumbnail_path: null, is_free: false, status: "published", sort: 1, created_at: "2026-01-02T00:00:00.000Z" },
  ],
  game_sessions: [],
  gifts: [],
  gift_attempts: [],
  lali_finds: [],
  sticker_positions: [],
  reader_stars: [],
  family_recordings: [],
  story_narrations: [],
  notifications_sent: [],
  page_views: [],
};
const deleted = new Set();
const chapa = new Map(); // tx_ref -> { amount, verifies }

const DEFAULTS = {
  profiles: () => ({ display_name: "Selam", role: "parent", nightly_limit: 3, show_all_ages: false, games_minutes: 20, ui_lang: "en", mic_listen: false, telegram_chat_id: null }),
  children: () => ({ id: uuid(), stars: 0, preferred_lang: "en", avatar: "cub", created_at: now() }),
  completions: () => ({ id: Math.floor(Math.random() * 1e9), completed_at: now() }),
  payments: () => ({ id: uuid(), status: "pending", created_at: now(), paid_at: null, kind: null, provider_ref: null }),
  gifts: () => ({ id: uuid(), status: "pending", created_at: now(), paid_at: null, redeemed_at: null, redeemed_by: null, provider_ref: null }),
  game_sessions: () => ({ id: uuid(), started_at: now(), seconds: 0, best_score: null }),
  family_recordings: () => ({ id: uuid(), created_at: now() }),
  // Schools (migration 0015).
  schools: () => ({ id: uuid(), seats: 30, contact_name: null, contact_phone: null, contact_email: null, created_at: now() }),
  teachers: () => ({ added_at: now() }),
  classes: () => ({ id: uuid(), created_at: now() }),
  pupils: () => ({ id: uuid(), failed_tries: 0, locked_at: null, last_active_at: null, created_at: now() }),
  class_assignments: () => ({ assigned_at: now() }),
  pupil_completions: () => ({ id: Math.floor(Math.random() * 1e9), completed_at: now() }),
};
const KEYS = {
  notifications_sent: ["family_id", "kind", "key"],
  lali_finds: ["child_id", "story_id", "page"],
  sticker_positions: ["child_id", "sticker_id"],
  reader_stars: ["child_id", "story_id", "page"],
  teachers: ["profile_id"],
  class_assignments: ["class_id", "story_id"],
  pupil_reader_stars: ["pupil_id", "story_id", "page"],
};

const json = (body, status = 200, headers = {}) =>
  new Response(body === undefined || status === 204 ? null : JSON.stringify(body), { status, headers: { "content-type": "application/json", ...headers } });

// ------------------------------------------------------------------------------------- auth

function userFromToken(token) {
  const m = /^stub\.([0-9a-f-]{36})\.(parent|admin)$/.exec(token || "");
  if (!m || deleted.has(m[1])) return null;
  const id = m[1];
  if (!db.profiles.some((p) => p.id === id)) db.profiles.push({ id, ...DEFAULTS.profiles(), role: m[2], created_at: now() });
  return { id, email: `parent-${id.slice(0, 8)}@example.com`, phone: "", aud: "authenticated", role: "authenticated", app_metadata: { provider: "email" }, user_metadata: {}, created_at: now() };
}

function session(token) {
  const user = userFromToken(token);
  return { access_token: token, token_type: "bearer", expires_in: 3600, expires_at: Math.floor(Date.now() / 1000) + 3600, refresh_token: `r-${token}`, user };
}

function deleteUser(id) {
  deleted.add(id);
  const kids = db.children.filter((c) => c.family_id === id).map((c) => c.id);
  for (const t of ["profiles"]) db[t] = db[t].filter((r) => r.id !== id);
  for (const t of ["children", "subscriptions", "game_sessions", "family_recordings", "gift_attempts", "notifications_sent"]) db[t] = db[t].filter((r) => r.family_id !== id);
  for (const t of ["completions", "lali_finds", "sticker_positions", "reader_stars"]) db[t] = db[t].filter((r) => !kids.includes(r.child_id));
  for (const p of db.payments) if (p.family_id === id) p.family_id = null;
}

async function auth(u, method, headers, body) {
  const bearer = (headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (u.pathname === "/auth/v1/user") {
    const user = userFromToken(bearer);
    return user ? json(user) : json({ code: 403, error_code: "user_not_found", msg: "User not found" }, 403);
  }
  if (u.pathname === "/auth/v1/otp") return json({});
  if (u.pathname === "/auth/v1/verify") {
    // verifyOtp with the code 123456 (or the email link's token_hash "good") signs in a parent
    // derived from the email address.
    if (body?.token !== "123456" && body?.token_hash !== "good") return json({ code: 403, error_code: "otp_expired", msg: "Token has expired or is invalid" }, 403);
    const h = crypto.createHash("sha256").update(String(body.email ?? body.token_hash)).digest("hex");
    const id = `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-8${h.slice(17, 20)}-${h.slice(20, 32)}`;
    deleted.delete(id);
    return json(session(`stub.${id}.parent`));
  }
  if (u.pathname === "/auth/v1/token") {
    const token = String(body?.refresh_token || "").replace(/^r-/, "");
    return userFromToken(token) ? json(session(token)) : json({ error_code: "refresh_token_not_found", msg: "Invalid Refresh Token" }, 400);
  }
  if (u.pathname === "/auth/v1/logout") return new Response(null, { status: 204 });
  // The admin's user list (for adding a teacher by email): everyone the fake has seen.
  if (u.pathname === "/auth/v1/admin/users" && method === "GET") {
    const users = db.profiles.map((p) => ({ id: p.id, email: `parent-${p.id.slice(0, 8)}@example.com`, aud: "authenticated", role: "authenticated", created_at: p.created_at }));
    return json({ users, aud: "authenticated" });
  }
  const admin = /^\/auth\/v1\/admin\/users\/([0-9a-f-]{36})$/.exec(u.pathname);
  if (admin && method === "DELETE") {
    deleteUser(admin[1]);
    return json({});
  }
  return json({ msg: `auth ${u.pathname} not stubbed` }, 400);
}

// ---------------------------------------------------------------------------------- postgrest

function parseList(v) {
  const out = [];
  let cur = "";
  let q = false;
  for (const ch of v) {
    if (ch === '"') q = !q;
    else if (ch === "," && !q) (out.push(cur), (cur = ""));
    else cur += ch;
  }
  out.push(cur);
  return out;
}

const RESERVED = new Set(["select", "order", "limit", "offset", "on_conflict", "columns"]);
function filterRows(rows, params) {
  let out = rows.slice();
  for (const [k, v] of params) {
    if (RESERVED.has(k)) continue;
    const val = (r) => (r[k] === null || r[k] === undefined ? null : String(r[k]));
    if (v.startsWith("eq.")) out = out.filter((r) => val(r) === v.slice(3));
    else if (v.startsWith("neq.")) out = out.filter((r) => val(r) !== v.slice(4));
    else if (v.startsWith("in.(")) {
      const set = parseList(v.slice(4, -1));
      out = out.filter((r) => set.includes(val(r)));
    } else if (v.startsWith("gte.")) out = out.filter((r) => val(r) !== null && val(r) >= v.slice(4));
    else if (v.startsWith("gt.")) out = out.filter((r) => val(r) !== null && val(r) > v.slice(3));
    else if (v.startsWith("lte.")) out = out.filter((r) => val(r) !== null && val(r) <= v.slice(4));
    else if (v.startsWith("lt.")) out = out.filter((r) => val(r) !== null && val(r) < v.slice(3));
    else if (v === "is.null") out = out.filter((r) => r[k] == null);
    else if (v === "not.is.null") out = out.filter((r) => r[k] != null);
  }
  const order = params.get("order");
  if (order) {
    const keys = order.split(",").map((o) => o.split("."));
    out.sort((a, b) => {
      for (const [col, dir] of keys) {
        if (a[col] === b[col]) continue;
        return (a[col] < b[col] ? -1 : 1) * (dir === "desc" ? -1 : 1);
      }
      return 0;
    });
  }
  const offset = Number(params.get("offset") || 0);
  if (offset) out = out.slice(offset);
  if (params.get("limit")) out = out.slice(0, Number(params.get("limit")));
  return out;
}

function respondRows(rows, headers, status = 200, total) {
  const accept = headers.get("accept") || "";
  const extra = {};
  if ((headers.get("prefer") || "").includes("count=")) extra["content-range"] = `${rows.length ? `0-${rows.length - 1}` : "*"}/${total ?? rows.length}`;
  if (accept.includes("vnd.pgrst.object")) {
    return rows.length === 1 ? json(rows[0], status, extra) : json({ code: "PGRST116", message: "JSON object requested, multiple (or no) rows returned", details: `The result contains ${rows.length} rows` }, 406);
  }
  return json(rows, status, extra);
}

function insert(table, rows, params, prefer) {
  const list = (db[table] ||= []);
  const keys = (params.get("on_conflict") || "").split(",").filter(Boolean);
  const upsert = prefer.includes("resolution=");
  const ignore = prefer.includes("ignore-duplicates");
  const out = [];
  for (const r of rows) {
    if (table === "gifts" && list.some((x) => x.code === r.code)) return { error: json({ code: "23505", message: "duplicate key value" }, 409) };
    const pk = keys.length ? keys : KEYS[table];
    const existing = pk && list.find((x) => pk.every((k) => String(x[k]) === String(r[k])));
    if (existing) {
      if (upsert && !ignore) Object.assign(existing, r), out.push(existing);
      else if (upsert && ignore) continue;
      else return { error: json({ code: "23505", message: "duplicate key value" }, 409) };
      continue;
    }
    const row = { ...(DEFAULTS[table]?.() ?? {}), ...r };
    list.push(row);
    out.push(row);
    if (table === "completions") {
      const kid = db.children.find((c) => c.id === row.child_id);
      if (kid) kid.stars += 1;
    }
  }
  return { rows: out };
}

/** Row-level security, roughly: with a user's token, a table only shows that family's rows. */
function visible(table, rows, user) {
  if (!user) return rows;
  const kids = new Set(db.children.filter((c) => c.family_id === user.id).map((c) => c.id));
  if (["children", "payments", "subscriptions", "family_recordings", "game_sessions"].includes(table)) return rows.filter((r) => r.family_id === user.id);
  if (table === "profiles") return rows.filter((r) => r.id === user.id);
  if (["completions", "lali_finds", "sticker_positions", "reader_stars"].includes(table)) return rows.filter((r) => kids.has(r.child_id));
  return rows;
}

function rest(u, method, headers, body) {
  const bearer = (headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const user = bearer.startsWith("stub.") ? userFromToken(bearer) : null;
  const prefer = headers.get("prefer") || "";

  const rpc = /^\/rest\/v1\/rpc\/(\w+)$/.exec(u.pathname);
  if (rpc) {
    const fn = RPC[rpc[1]];
    if (!fn) return json({ message: `no rpc ${rpc[1]}` }, 404);
    const out = fn(body || {});
    return out === null ? new Response(null, { status: 204 }) : json(out);
  }

  const table = /^\/rest\/v1\/(\w+)$/.exec(u.pathname)?.[1];
  if (!table) return json({ message: "unknown" }, 404);
  if (!db[table]) db[table] = [];
  if (method === "POST") {
    const r = insert(table, Array.isArray(body) ? body : [body], u.searchParams, prefer);
    if (r.error) return r.error;
    return prefer.includes("return=representation") ? respondRows(r.rows, headers, 201) : new Response(null, { status: 201 });
  }
  const found = filterRows(visible(table, db[table], user), u.searchParams);
  if (method === "PATCH") {
    for (const r of found) Object.assign(r, body);
    return prefer.includes("return=representation") ? respondRows(found, headers) : new Response(null, { status: 204 });
  }
  if (method === "DELETE") {
    db[table] = db[table].filter((r) => !found.includes(r));
    return prefer.includes("return=representation") ? respondRows(found, headers) : new Response(null, { status: 204 });
  }
  if (method === "HEAD") return new Response(null, { status: 200, headers: { "content-range": `*/${found.length}` } });
  return respondRows(found, headers);
}

// ----------------------------------------------------------------------- plans, payments, gifts

function settle(fam) {
  const s = db.subscriptions.find((x) => x.family_id === fam);
  if (s && s.next_plan_id && new Date(s.current_period_end).getTime() <= Date.now()) {
    s.current_period_end = new Date(new Date(s.current_period_end).getTime() + s.next_days * DAY).toISOString();
    s.plan_id = s.next_plan_id;
    s.next_plan_id = null;
    s.next_days = 0;
  }
}

/** The same rules as apply_plan_days in 0012_gifts.sql, for the fake. */
function applyPlanDays(fam, plan, days) {
  settle(fam);
  const t = Date.now();
  let s = db.subscriptions.find((x) => x.family_id === fam);
  if (!s || new Date(s.current_period_end).getTime() <= t) {
    if (!s) db.subscriptions.push((s = { family_id: fam }));
    Object.assign(s, { plan_id: plan, status: "active", current_period_end: new Date(t + days * DAY).toISOString(), next_plan_id: null, next_days: 0 });
    return "new";
  }
  const end = new Date(s.current_period_end).getTime();
  if (s.plan_id === plan) {
    s.current_period_end = new Date(end + days * DAY).toISOString();
    return "renew";
  }
  if (PRICES[plan] > PRICES[s.plan_id]) {
    const left = (end - t) / DAY;
    s.current_period_end = new Date(t + ((left * PRICES[s.plan_id]) / PRICES[plan] + days) * DAY).toISOString();
    s.plan_id = plan;
    return "upgrade";
  }
  if (!s.next_plan_id || s.next_plan_id === plan) s.next_days = (s.next_days || 0) + days;
  else s.next_days = (s.next_days * PRICES[s.next_plan_id]) / PRICES[plan] + days;
  s.next_plan_id = plan;
  return "downgrade";
}

const limited = (fam) => db.gift_attempts.filter((a) => a.family_id === fam && a.at > Date.now() - 3600000).length >= 10;
const open = (fam) =>
  db.subscriptions.some((s) => s.family_id === fam && ["active", "trialing"].includes(s.status) && new Date(s.current_period_end).getTime() + (s.next_plan_id ? s.next_days * DAY : 0) > Date.now());

const RPC = {
  settle_subscription: ({ p_family }) => (settle(p_family), null),
  has_active_subscription: ({ family }) => open(family),
  activate_payment: ({ p_tx_ref, p_provider_ref, p_amount }) => {
    const p = db.payments.find((x) => x.tx_ref === p_tx_ref && x.status === "pending" && x.amount_etb <= p_amount);
    if (!p) return false;
    Object.assign(p, { status: "paid", provider_ref: p_provider_ref, paid_at: now() });
    p.kind = applyPlanDays(p.family_id, p.plan_id, 30);
    return true;
  },
  mark_gift_paid: ({ p_tx_ref, p_provider_ref, p_amount }) => {
    const g = db.gifts.find((x) => x.tx_ref === p_tx_ref && x.status === "pending" && x.amount_etb <= p_amount);
    if (!g) return false;
    Object.assign(g, { status: "paid", provider_ref: p_provider_ref, paid_at: now() });
    return true;
  },
  gift_rate_limited: ({ p_family }) => limited(p_family),
  peek_gift: ({ p_code, p_family }) => {
    if (limited(p_family)) return { ok: false, error: "rate" };
    const g = db.gifts.find((x) => x.code === p_code.trim().toUpperCase() && x.status !== "pending");
    if (!g) return db.gift_attempts.push({ family_id: p_family, at: Date.now() }), { ok: false, error: "invalid" };
    if (g.status === "redeemed") return { ok: false, error: "used", mine: g.redeemed_by === p_family };
    return { ok: true, plan_id: g.plan_id, months: g.months, giver_name: g.giver_name, recipient_label: g.recipient_label, message: g.message };
  },
  redeem_gift: ({ p_code, p_family }) => {
    if (limited(p_family)) return { ok: false, error: "rate" };
    const g = db.gifts.find((x) => x.code === p_code.trim().toUpperCase());
    if (!g || g.status === "pending") return db.gift_attempts.push({ family_id: p_family, at: Date.now() }), { ok: false, error: "invalid" };
    if (g.status === "redeemed") return { ok: false, error: "used" };
    Object.assign(g, { status: "redeemed", redeemed_by: p_family, redeemed_at: now() });
    const kind = applyPlanDays(p_family, g.plan_id, g.months * 30);
    const s = db.subscriptions.find((x) => x.family_id === p_family);
    return { ok: true, kind, plan_id: g.plan_id, months: g.months, giver_name: g.giver_name, current_period_end: s.current_period_end, next_plan_id: s.next_plan_id, next_days: s.next_days };
  },
};

// ------------------------------------------------------------------------------------ storage

function storage(u, method, body) {
  const sign = /^\/storage\/v1\/object\/sign\/([\w-]+)$/.exec(u.pathname);
  if (sign) return json((body?.paths ?? []).map((p) => ({ path: p, signedURL: `/object/sign/${sign[1]}/${p}?token=stub`, error: null })));
  if (/^\/storage\/v1\/object\/list\//.test(u.pathname)) return json([]);
  if (method === "DELETE") return json([]);
  if (method === "POST" || method === "PUT") return json({ Key: u.pathname.replace("/storage/v1/object/", "") });
  return json({ message: "not found" }, 404);
}

// -------------------------------------------------------------------------------------- chapa

async function chapaApi(url, init) {
  const u = new URL(url);
  log("chapa", u.pathname);
  if (u.pathname.endsWith("/transaction/initialize")) {
    const b = JSON.parse(init.body);
    if (b.currency !== "ETB") return json({ status: "failed", message: "currency" }, 400);
    chapa.set(b.tx_ref, { amount: Number(b.amount), verifies: 0 });
    return json({ status: "success", data: { checkout_url: `https://checkout.chapa.co/checkout/payment/${b.tx_ref}?amount=${b.amount}&return=${encodeURIComponent(b.return_url)}` } });
  }
  const v = /\/transaction\/verify\/(.+)$/.exec(u.pathname);
  if (v) {
    const ref = decodeURIComponent(v[1]);
    const c = chapa.get(ref);
    if (!c) return json({ status: "failed", message: "not found" }, 404);
    // The first check says "pending", so the return pages show their auto-refresh.
    c.verifies++;
    const status = c.verifies > 1 ? "success" : "pending";
    return json({ status: "success", data: { status, amount: c.amount, currency: "ETB", reference: `CHAPA-${ref.slice(-6)}`, tx_ref: ref } });
  }
  return json({ status: "failed" }, 404);
}

// -------------------------------------------------------------------------------------- fetch

async function readBody(init) {
  if (!init?.body) return null;
  if (typeof init.body === "string") return init.body;
  if (init.body instanceof ArrayBuffer || ArrayBuffer.isView(init.body)) return Buffer.from(init.body).toString();
  if (typeof init.body.text === "function") return init.body.text();
  return null;
}

globalThis.fetch = async function stubbedFetch(input, init) {
  const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
  if (!init && typeof input === "object" && !(input instanceof URL)) {
    init = { method: input.method, headers: input.headers, body: input.body ? await input.text() : undefined };
  }
  if (url.startsWith(SUPA)) {
    const u = new URL(url);
    const method = (init?.method || "GET").toUpperCase();
    const headers = new Headers(init?.headers);
    const raw = u.pathname.startsWith("/storage/v1/object/") && !u.pathname.includes("/sign/") && !u.pathname.includes("/list/") ? null : await readBody(init);
    let body = null;
    try {
      body = raw ? JSON.parse(raw) : null;
    } catch {}
    log(method, u.pathname + u.search);
    if (u.pathname.startsWith("/auth/v1/")) return auth(u, method, headers, body);
    if (u.pathname.startsWith("/rest/v1/")) return rest(u, method, headers, body);
    if (u.pathname.startsWith("/storage/v1/")) return storage(u, method, body);
    return json({ message: "unknown" }, 404);
  }
  if (url.startsWith(CHAPA)) return chapaApi(url, init);
  if (url.startsWith("https://api.telegram.org")) return json({ ok: false, description: "stubbed" });
  return realFetch(input, init);
};
