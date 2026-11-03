import "server-only";

/** The public address of the site, as the visitor (or Render's proxy) sees it. */
export function originFrom(headers: Headers): string {
  const fixed = process.env.SITE_URL?.trim().replace(/\/$/, "");
  if (fixed) return fixed;
  const host = headers.get("x-forwarded-host") ?? headers.get("host") ?? "lali-kids.onrender.com";
  const proto = headers.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}
