import { connection } from "next/server";

import { isStoryId } from "@/lib/stickers/catalog";
import { deleteVoices, listVoices, saveVoice, voiceUser, type VoiceResult } from "@/lib/voices/server";

/*
  Family voices (see src/lib/voices/server.ts). The website sends its session cookie, the
  Lali app sends `Authorization: Bearer <access token>`; signed-out visitors get 401.

  GET    /api/voices?story=<id>   → { recordings[] with short-lived `url`s, available } ({ signedIn: false } when signed out)
  GET    /api/voices              → { recordings[] } for the Grown-ups' corner (no links)
  POST   /api/voices              → multipart: file, story, lang, page, name, duration (ms)
  DELETE /api/voices?all=1        → deletes every recording of the family
  DELETE /api/voices/:id          → deletes one (see [id]/route.ts)
*/

const send = (r: VoiceResult) => Response.json(r.body, { status: r.status, headers: { "Cache-Control": "no-store" } });
const signIn = () => Response.json({ error: "Sign in to record your voice", signedIn: false }, { status: 401, headers: { "Cache-Control": "no-store" } });

export async function GET(request: Request) {
  await connection();
  const me = await voiceUser(request);
  // Asked on every story page: signed out is an ordinary answer here, not an error.
  if (!me) return Response.json({ signedIn: false, recordings: [], available: false }, { headers: { "Cache-Control": "no-store" } });
  const story = new URL(request.url).searchParams.get("story");
  if (story !== null && !isStoryId(story)) return Response.json({ error: "Which story?" }, { status: 400 });
  return send(await listVoices(me, story));
}

export async function POST(request: Request) {
  const me = await voiceUser(request);
  if (!me) return signIn();
  const form = await request.formData().catch(() => null);
  if (!form) return Response.json({ error: "Send the recording as a form" }, { status: 400 });
  return send(await saveVoice(me, form));
}

export async function DELETE(request: Request) {
  const me = await voiceUser(request);
  if (!me) return signIn();
  if (new URL(request.url).searchParams.get("all") !== "1") return Response.json({ error: "Which recording?" }, { status: 400 });
  return send(await deleteVoices(me, null));
}
