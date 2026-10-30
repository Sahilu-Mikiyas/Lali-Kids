import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import sharp from "sharp";

/** How many pages one family may fetch in a minute. A reader turns maybe 10. */
export const PAGES_PER_MINUTE = 40;
/** A page token works for this long after the reader asks for it. */
export const TOKEN_SECONDS = 90;

function secret(): string {
  const s = process.env.PAGE_TOKEN_SECRET;
  if (!s) throw new Error("Missing PAGE_TOKEN_SECRET. See docs/SETUP_SUPABASE.md.");
  return s;
}

/** A short-lived token tied to one family, one book and one page. */
export function signPage(familyId: string, bookId: string, page: number, now = Date.now()): string {
  const exp = Math.floor(now / 1000) + TOKEN_SECONDS;
  const body = `${familyId}.${bookId}.${page}.${exp}`;
  const mac = createHmac("sha256", secret()).update(body).digest("base64url");
  return `${exp}.${mac}`;
}

export function verifyPage(token: string | null, familyId: string, bookId: string, page: number, now = Date.now()): boolean {
  if (!token) return false;
  const [expStr, mac] = token.split(".");
  const exp = Number(expStr);
  if (!exp || !mac || exp * 1000 < now) return false;
  const expected = createHmac("sha256", secret()).update(`${familyId}.${bookId}.${page}.${exp}`).digest("base64url");
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Shows the last 4 characters only, so a leaked page identifies the account without exposing it. */
export function maskIdentity(value: string | null | undefined, fallbackId: string): string {
  if (value && value.length >= 4) return `…${value.slice(-4)}`;
  return `#${fallbackId.slice(0, 8)}`;
}

/**
 * Draws a faint, repeated mark across the page: who is reading and when.
 * Light enough not to bother a child, clear enough to trace a leak.
 */
export async function watermark(webp: Buffer, mark: string): Promise<Buffer> {
  const image = sharp(webp);
  const { width = 1400, height = 2000 } = await image.metadata();
  const safe = mark.replace(/[<>&"']/g, "");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <defs>
    <pattern id="p" width="560" height="280" patternUnits="userSpaceOnUse" patternTransform="rotate(-28)">
      <text x="0" y="140" font-family="Helvetica, Arial, sans-serif" font-size="26" font-weight="700" fill="rgba(27,42,78,0.09)">${safe}</text>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#p)"/>
  <text x="${width - 16}" y="${height - 14}" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="14" fill="rgba(27,42,78,0.35)">${safe}</text>
</svg>`;
  return image.composite([{ input: Buffer.from(svg) }]).webp({ quality: 78 }).toBuffer();
}
