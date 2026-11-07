import { connection } from "next/server";

import { narrationForFamily } from "@/lib/narration/server";
import { verifyReadPass } from "@/lib/read-pass";
import { hasSecretKey, isSupabaseConfigured } from "@/lib/supabase/env";
import { requestUser } from "@/lib/supabase/request-user";

/*
  GET /api/narration?story=<id>[&pass=<read pass>]
    → { available, pages: { [page]: { en?, am?: { url, narrator, durationMs, wordTimes[] } } } }

  Voice-actor narration for the reader, with links that work for an hour. Free stories: anyone.
  Paid stories: a family with a plan (website cookie, the app's Bearer token, or the read pass the
  app adds to a paid launch story's address); otherwise 402. Before migration 0011 is applied it
  answers { available: false } and the reader uses the browser's voice.
*/
export async function GET(request: Request) {
  await connection();
  const params = new URL(request.url).searchParams;
  const story = params.get("story") ?? "";
  let familyId: string | null = null;
  let isAdmin = false;
  if (isSupabaseConfigured()) {
    const me = await requestUser(request).catch(() => null);
    if (me) {
      familyId = me.user.id;
      const { data } = await me.supabase.from("profiles").select("role").eq("id", me.user.id).maybeSingle();
      isAdmin = data?.role === "admin";
    }
  }
  if (!familyId && hasSecretKey()) {
    try {
      familyId = verifyReadPass(params.get("pass"), story);
    } catch {
      familyId = null;
    }
  }
  const r = await narrationForFamily(story, familyId, isAdmin);
  return Response.json(r.body, { status: r.status, headers: { "Cache-Control": "private, no-store" } });
}
