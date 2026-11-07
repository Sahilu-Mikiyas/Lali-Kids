import { alertAdmins, cleanPath } from "@/lib/alerts";
import { allow, clientIp } from "@/lib/rate-limit";

/*
  POST /api/client-error { message, source?, line?, col?, path?, kind? }
  A browser error from a family's device (sent by src/components/error-reporter.tsx), passed on
  to the admins on Telegram. Always answers 204, even when the report is dropped.
  - At most 2 KB, plain fields only; the path loses its query string and anything that looks like
    an email, id, code or token is blanked (src/lib/alerts.ts). No IP or user is recorded.
  - Rate-limited: 10 reports a minute per address, 120 a minute in all; the alerts themselves
    are also limited (one per distinct error every 15 minutes).
*/

const done = () => new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
const str = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, max) : "");

export async function POST(request: Request) {
  const ip = clientIp(request.headers) ?? "unknown";
  if (!allow(`ce:${ip}`, 10, 60_000) || !allow("ce:all", 120, 60_000)) return done();
  const raw = await request.text().catch(() => "");
  if (!raw || raw.length > 2048) return done();
  let b: Record<string, unknown>;
  try {
    b = JSON.parse(raw);
  } catch {
    return done();
  }
  if (!b || typeof b !== "object") return done();
  const message = str(b.message, 300);
  if (!message) return done();
  // Noise from browser extensions and cancelled loads, not Lali's code.
  if (/ResizeObserver loop|Script error\.?$|chrome-extension:|moz-extension:|AbortError|Load failed|NetworkError/i.test(message)) return done();
  const source = cleanPath(str(b.source, 300).replace(/^https?:\/\/[^/]+/, ""));
  const line = Number.isInteger(b.line) ? Number(b.line) : null;
  const col = Number.isInteger(b.col) ? Number(b.col) : null;
  const kind = b.kind === "unhandledrejection" || b.kind === "render" ? b.kind : "error";
  await alertAdmins({
    kind: "client",
    where: cleanPath(str(b.path, 200)),
    message,
    detail: [kind, source && `${source}${line !== null ? `:${line}${col !== null ? `:${col}` : ""}` : ""}`].filter(Boolean).join(" · "),
  });
  return done();
}
