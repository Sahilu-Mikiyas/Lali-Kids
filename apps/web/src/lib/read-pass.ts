import "server-only";

import { createHash, createHmac, timingSafeEqual } from "node:crypto";

/**
 * A read pass lets the Lali app open a paid launch story in the website's animated book
 * (inside the app's web view, which has no website session). It names the family and the
 * story, lasts 6 hours, and the family's plan is still checked when it's used.
 */
const PASS_SECONDS = 6 * 60 * 60;

function secret(): string {
  const base = process.env.PAGE_TOKEN_SECRET || process.env.SUPABASE_SECRET_KEY;
  if (!base) throw new Error("Missing SUPABASE_SECRET_KEY. See docs/SETUP_SUPABASE.md.");
  return createHash("sha256").update(`lali-read-pass:${base}`).digest("base64url");
}

const mac = (familyId: string, storyId: string, exp: number) =>
  createHmac("sha256", secret()).update(`read.${familyId}.${storyId}.${exp}`).digest("base64url");

export function signReadPass(familyId: string, storyId: string, now = Date.now()): string {
  const exp = Math.floor(now / 1000) + PASS_SECONDS;
  return `${familyId}.${exp}.${mac(familyId, storyId, exp)}`;
}

/** The family the pass belongs to, if it is genuine, for this story and not expired. */
export function verifyReadPass(pass: string | null | undefined, storyId: string, now = Date.now()): string | null {
  if (!pass) return null;
  const [familyId, expStr, given] = pass.split(".");
  const exp = Number(expStr);
  if (!familyId || !exp || !given || exp * 1000 < now) return null;
  const a = Buffer.from(given);
  const b = Buffer.from(mac(familyId, storyId, exp));
  return a.length === b.length && timingSafeEqual(a, b) ? familyId : null;
}
