/**
 * A `next=` address from a link or form, made safe to redirect to: only a path on this site.
 * Refuses `//evil.com`, `/\evil.com` (browsers read the backslash as a slash), control
 * characters and anything that resolves to another origin; those fall back to `fallback`.
 */
export function safeNext(raw: unknown, fallback = "/account"): string {
  if (typeof raw !== "string" || raw.length === 0 || raw.length > 512) return fallback;
  if (!raw.startsWith("/") || raw.startsWith("//") || raw.includes("\\") || /[\u0000-\u001f\u007f]/.test(raw)) return fallback;
  try {
    const base = "https://lali.invalid";
    const u = new URL(raw, base);
    if (u.origin !== base) return fallback;
    return `${u.pathname}${u.search}${u.hash}`;
  } catch {
    return fallback;
  }
}
