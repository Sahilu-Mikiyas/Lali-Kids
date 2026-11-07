import "server-only";

/** The public address of the site, as the visitor (or Render's proxy) sees it. */
export function originFrom(headers: Headers): string {
  const fixed = process.env.SITE_URL?.trim().replace(/\/$/, "");
  if (fixed) return fixed;
  const host = headers.get("x-forwarded-host") ?? headers.get("host") ?? "lali-kids.onrender.com";
  const proto = headers.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

/**
 * The site's own address for anything that outlives the request: the Telegram webhook and the
 * links in Telegram messages. Never taken from request headers, which a caller can forge.
 */
export function canonicalOrigin(): string {
  return process.env.SITE_URL?.trim().replace(/\/$/, "") || "https://lali-kids.onrender.com";
}
