import "server-only";

import { createHash, createHmac, timingSafeEqual } from "node:crypto";

/*
  The classroom tablet's sign-in: a signed, HttpOnly cookie that names one pupil and their class.
  It carries no name or other data, only ids and an expiry, signed with a key derived from the
  server's secret (PAGE_TOKEN_SECRET, else SUPABASE_SECRET_KEY), so it can't be made or changed
  in the browser. Every use checks again that the pupil is in that class, isn't locked, and that
  the school's licence is open (lib/schools/server.ts). It lasts a school morning (4 hours) and
  "Finished!" on the class page clears it, so the next child signs in with their own pictures.
*/

export const PUPIL_COOKIE = "lali-pupil";
export const PUPIL_SECONDS = 4 * 60 * 60;

function key(): string {
  const base = process.env.PAGE_TOKEN_SECRET || process.env.SUPABASE_SECRET_KEY;
  if (!base) throw new Error("Missing SUPABASE_SECRET_KEY. See docs/SETUP_SUPABASE.md.");
  return createHash("sha256").update(`lali-pupil-session:${base}`).digest("base64url");
}

const mac = (pupilId: string, classId: string, exp: number) => createHmac("sha256", key()).update(`pupil.${pupilId}.${classId}.${exp}`).digest("base64url");

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function signPupilSession(pupilId: string, classId: string, now = Date.now()): string {
  const exp = Math.floor(now / 1000) + PUPIL_SECONDS;
  return `${pupilId}.${classId}.${exp}.${mac(pupilId, classId, exp)}`;
}

/** The pupil and class a cookie names, if it is genuine and not expired. */
export function verifyPupilSession(value: string | null | undefined, now = Date.now()): { pupilId: string; classId: string } | null {
  if (!value || value.length > 300) return null;
  const [pupilId, classId, expStr, given] = value.split(".");
  const exp = Number(expStr);
  if (!UUID.test(pupilId ?? "") || !UUID.test(classId ?? "") || !exp || !given || exp * 1000 < now) return null;
  let want: string;
  try {
    want = mac(pupilId, classId, exp);
  } catch {
    return null;
  }
  const a = Buffer.from(given);
  const b = Buffer.from(want);
  return a.length === b.length && timingSafeEqual(a, b) ? { pupilId, classId } : null;
}

export const PUPIL_COOKIE_OPTIONS = {
  path: "/",
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  maxAge: PUPIL_SECONDS,
};
