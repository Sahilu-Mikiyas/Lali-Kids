import "server-only";

import { isIP } from "node:net";

/*
  Small in-memory limits for public endpoints (gift checkout, client error reports). Lali runs as
  one Render instance, so a Map is enough; with several instances each keeps its own count, which
  only makes the limit looser, never blocks real use.
*/

const buckets = new Map<string, number[]>();

/** True if `key` may act now (at most `max` times per `windowMs`); records the attempt. */
export function allow(key: string, max: number, windowMs: number, now = Date.now()): boolean {
  const since = now - windowMs;
  const hits = (buckets.get(key) ?? []).filter((t) => t > since);
  if (hits.length >= max) {
    buckets.set(key, hits);
    return false;
  }
  hits.push(now);
  buckets.set(key, hits);
  if (buckets.size > 5000) {
    // Forget idle keys so the map can't grow without end.
    for (const [k, v] of buckets) if (!v.some((t) => t > since)) buckets.delete(k);
  }
  return true;
}

/**
 * The visitor's IP address, or null. Proxies append the address they saw to X-Forwarded-For,
 * so the last valid entry is the one a visitor can't forge; anything that isn't an IP is ignored.
 */
export function clientIp(headers: Headers): string | null {
  const list = (headers.get("x-forwarded-for") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  for (let i = list.length - 1; i >= 0; i--) if (isIP(list[i])) return list[i];
  const real = headers.get("x-real-ip")?.trim();
  return real && isIP(real) ? real : null;
}
