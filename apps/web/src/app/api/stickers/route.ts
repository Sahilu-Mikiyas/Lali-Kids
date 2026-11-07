import { cookies } from "next/headers";
import { connection } from "next/server";

import { CHILD_COOKIE, familyFor, type Child } from "@/lib/family";
import { cleanPosition, isStickerId, isStoryId } from "@/lib/stickers/catalog";
import { loadStickerBasis, saveFind, savePosition } from "@/lib/stickers/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { requestUser, type RequestUser } from "@/lib/supabase/request-user";
import { pupilBasis, pupilForRequest } from "@/lib/schools/server";

/*
  The reader's and sticker book's record for the signed-in child (website cookie, or the
  app's access token with X-Lali-Child). Signed-out visitors get { signedIn: false } and keep
  their stickers in the browser.

  GET                                → { signedIn, childId, basis }
  POST  { storyId, page }            → saves a Find Lali find
  PATCH { stickerId, page, x, y, r } → saves where a sticker was stuck in the album

  A classroom pupil (X-Lali-Pupil: 1 and the signed pupil cookie, lib/schools) gets their record
  from pupil_completions and pupil_reader_stars; their finds and album positions aren't kept
  (docs/SCHOOLS.md), so POST and PATCH answer { ok, saved: false }.
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
  const pupil = await pupilForRequest(request).catch(() => null);
  if (pupil) return json({ signedIn: true, pupil: true, childId: pupil.pupil.id, basis: (await pupilBasis(pupil.pupil.id)).basis });
  const who = await reader(request);
  if (!who) return json({ signedIn: false });
  if (!who.child) return json({ signedIn: true, childId: null });
  const basis = await loadStickerBasis(who.me.supabase, who.child.id);
  return json({ signedIn: true, childId: who.child.id, basis });
}

export async function POST(request: Request) {
  if (await pupilForRequest(request).catch(() => null)) return json({ ok: true, saved: false });
  const who = await reader(request);
  if (!who?.child) return json({ error: "Sign in" }, 401);
  const b = (await request.json().catch(() => ({}))) as { storyId?: unknown; page?: unknown };
  const page = Number(b.page);
  if (!isStoryId(b.storyId) || !Number.isInteger(page) || page < 0 || page > 199) return json({ error: "Which page?" }, 400);
  const saved = await saveFind(who.child.id, b.storyId, page);
  return json({ ok: true, saved });
}

export async function PATCH(request: Request) {
  if (await pupilForRequest(request).catch(() => null)) return json({ ok: true, saved: false });
  const who = await reader(request);
  if (!who?.child) return json({ error: "Sign in" }, 401);
  const b = (await request.json().catch(() => ({}))) as { stickerId?: unknown };
  const pos = cleanPosition(b);
  if (!isStickerId(b.stickerId) || !pos) return json({ error: "Which sticker?" }, 400);
  const saved = await savePosition(who.child.id, b.stickerId, pos);
  return json({ ok: true, saved });
}
