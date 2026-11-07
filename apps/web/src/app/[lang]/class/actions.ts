"use server";

import { cookies, headers } from "next/headers";

import { allow, clientIp } from "@/lib/rate-limit";
import { checkPicture, classByCode, currentPupil, onShelf, recordPupilFinish, type PictureResult } from "@/lib/schools/server";
import { PUPIL_COOKIE, PUPIL_COOKIE_OPTIONS, signPupilSession } from "@/lib/schools/session";
import { cleanCode, isPicture } from "@/lib/schools/shared";
import { isStoryId } from "@/lib/stickers/catalog";

/*
  The classroom tablet (docs/SCHOOLS.md). A pupil signs in with their picture password; the
  server checks it and sets the signed pupil cookie. Wrong pictures are counted per pupil in the
  database (5 in a row lock the pupil until their teacher unlocks them) and, as a second guard,
  per device address here.
*/

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type SignInResult = PictureResult | { ok: false; error: "rate" };

export async function pupilSignIn(code: string, pupilId: string, picture: number[]): Promise<SignInResult> {
  const c = cleanCode(code);
  if (!c || typeof pupilId !== "string" || !UUID.test(pupilId) || !isPicture(picture)) return { ok: false, error: "unknown" };
  const ip = clientIp(await headers()) ?? "unknown";
  // A whole classroom shares one tablet (one address), so this is generous: it only stops a
  // script from trying every picture password of every pupil.
  if (!allow(`pupil-sign-in:${ip}`, 60, 10 * 60_000)) return { ok: false, error: "rate" };
  const found = await classByCode(c).catch(() => null);
  if (!found) return { ok: false, error: "unknown" };
  if (!found.open) return { ok: false, error: "closed" };
  const r = await checkPicture(found.cls.id, pupilId, picture).catch(() => ({ ok: false, error: "unknown" }) as const);
  if (r.ok) (await cookies()).set(PUPIL_COOKIE, signPupilSession(pupilId, found.cls.id), PUPIL_COOKIE_OPTIONS);
  return r;
}

/** "Finished! Next friend": the pupil's session ends on this tablet. */
export async function pupilSignOut(): Promise<void> {
  (await cookies()).delete({ name: PUPIL_COOKIE, path: "/" });
}

/** The reader reached The End for the signed-in pupil. */
export async function pupilFinished(storyId: string): Promise<boolean> {
  if (!isStoryId(storyId)) return false;
  const me = await currentPupil();
  if (!me || !onShelf(me.cls.age_band, me.assigned, storyId)) return false;
  return recordPupilFinish(me.pupil.id, storyId);
}
