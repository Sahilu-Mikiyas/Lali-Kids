import { cookies } from "next/headers";
import { connection } from "next/server";

import { CHILD_COOKIE, familyFor, type Child } from "@/lib/family";
import { micListenSetting, saveMicListen, saveReaderStar } from "@/lib/read-aloud/server";
import { isStoryId } from "@/lib/stickers/catalog";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { requestUser, type RequestUser } from "@/lib/supabase/request-user";

/*
  The read-along microphone for the signed-in family (website cookie, or the app's access token
  with X-Lali-Child). Signed-out visitors get { signedIn: false } and keep everything in the browser.

  GET                                   → { signedIn, childId, ageBand, micListen (null until migration 0011) }
  POST  { storyId, page, lang, how }    → saves a reader star for the current child { ok, saved }
  PATCH { micListen: boolean }          → the parent's "Listen to my child read" choice { ok, saved }
*/

const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

async function reader(request: Request): Promise<{ me: RequestUser; child: Child | null } | null> {
  if (!isSupabaseConfigured()) return null;
  const me = await requestUser(request).catch(() => null);
  if (!me) return null;
  const { data: profile } = await me.supabase.from("profiles").select("id, display_name, role").eq("id", me.user.id).single();
  if (!profile) return null;
  const wanted = request.headers.get("x-lali-child") ?? (await cookies()).get(CHILD_COOKIE)?.value ?? null;
  const family = await familyFor(me.supabase, profile, wanted);
  return { me, child: family.current };
}

export async function GET(request: Request) {
  await connection();
  const who = await reader(request);
  if (!who) return json({ signedIn: false });
  const micListen = await micListenSetting(who.me.supabase, who.me.user.id);
  return json({ signedIn: true, childId: who.child?.id ?? null, ageBand: who.child?.age_band ?? null, micListen });
}

export async function POST(request: Request) {
  const who = await reader(request);
  if (!who?.child) return json({ error: "Sign in" }, 401);
  const b = (await request.json().catch(() => ({}))) as { storyId?: unknown; page?: unknown; lang?: unknown; how?: unknown };
  const page = Number(b.page);
  if (!isStoryId(b.storyId) || !Number.isInteger(page) || page < 0 || page > 199 || (b.lang !== "en" && b.lang !== "am")) return json({ error: "Which page?" }, 400);
  const how = b.how === "listened" ? "listened" : "recorded";
  return json({ ok: true, saved: await saveReaderStar(who.child.id, b.storyId, page, b.lang, how) });
}

export async function PATCH(request: Request) {
  if (!isSupabaseConfigured()) return json({ error: "Sign in" }, 401);
  const me = await requestUser(request).catch(() => null);
  if (!me) return json({ error: "Sign in" }, 401);
  const b = (await request.json().catch(() => ({}))) as { micListen?: unknown };
  if (typeof b.micListen !== "boolean") return json({ error: "Send { micListen: true | false }" }, 400);
  return json({ ok: true, saved: await saveMicListen(me.supabase, me.user.id, b.micListen) });
}
