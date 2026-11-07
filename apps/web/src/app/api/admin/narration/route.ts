import { connection } from "next/server";

import { adminNarration, deleteNarration, requestAdmin, saveNarrationClip, saveWordTimes, type NarrationResult } from "@/lib/narration/server";

/*
  The narration studio's API (admins only; see src/app/[lang]/admin/narration).

  GET    ?story=<id>                         → { available, clips[] with listening links }
  POST   multipart: file, story, lang, page, narrator, duration (ms)  → uploads a page's clip
  PATCH  { story, lang, page, wordTimes[], narrator? }               → saves the word timings
  DELETE ?story=<id>&lang=en|am&page=<n>     → removes a page's clip
*/

const send = (r: NarrationResult) => Response.json(r.body, { status: r.status, headers: { "Cache-Control": "no-store" } });
const denied = () => Response.json({ error: "Admins only" }, { status: 403, headers: { "Cache-Control": "no-store" } });

export async function GET(request: Request) {
  await connection();
  if (!(await requestAdmin(request))) return denied();
  return send(await adminNarration(new URL(request.url).searchParams.get("story") ?? ""));
}

export async function POST(request: Request) {
  if (!(await requestAdmin(request))) return denied();
  const form = await request.formData().catch(() => null);
  if (!form) return Response.json({ error: "Send the clip as a form" }, { status: 400 });
  return send(await saveNarrationClip(form));
}

export async function PATCH(request: Request) {
  if (!(await requestAdmin(request))) return denied();
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || typeof body !== "object") return Response.json({ error: "Send JSON" }, { status: 400 });
  return send(await saveWordTimes(body));
}

export async function DELETE(request: Request) {
  if (!(await requestAdmin(request))) return denied();
  return send(await deleteNarration(new URL(request.url).searchParams));
}
