import "server-only";

import { hasSecretKey } from "@/lib/supabase/env";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { esc, sendMessage, telegramConfigured } from "@/lib/telegram";

/*
  Error alerts for the admins, on Telegram (see docs/OPERATIONS.md).
  - Sent with Lali's bot to every profile with role 'admin' that has connected Telegram.
  - No bot token, no secret key or no connected admin: nothing is sent and nothing breaks.
  - The same error is sent at most once every 15 minutes, and at most 30 alerts an hour in all,
    so a broken page can't flood anyone's phone. Repeats are counted and mentioned next time.
  - No personal data: callers pass a path without its query string, never emails, names, codes
    or tokens.
*/

const SAME_ERROR_MS = 15 * 60_000;
const MAX_PER_HOUR = 30;
const ADMINS_MS = 10 * 60_000;

const lastSent = new Map<string, { at: number; repeats: number }>();
let hour: number[] = [];
let admins: { at: number; chats: number[] } | null = null;

async function adminChats(): Promise<number[]> {
  if (admins && Date.now() - admins.at < ADMINS_MS) return admins.chats;
  const { data } = await createSupabaseAdmin().from("profiles").select("telegram_chat_id").eq("role", "admin").not("telegram_chat_id", "is", null);
  const chats = (data ?? []).map((r: { telegram_chat_id: number | null }) => r.telegram_chat_id).filter((c): c is number => typeof c === "number");
  admins = { at: Date.now(), chats };
  return chats;
}

/** Strips anything that looks like an email, a token or a gift code from a message. */
export function scrub(s: string): string {
  return s
    .replace(/[^\s@]+@[^\s@]+\.[^\s@]+/g, "[email]")
    .replace(/LALI-[A-Z0-9]{4}-[A-Z0-9]{4}/gi, "[code]")
    .replace(/lali-(gift|reader|learner|vip)-[0-9a-f]{8,}/gi, "lali-$1-[ref]")
    .replace(/eyJ[\w-]+\.[\w-]+\.[\w-]+/g, "[jwt]")
    .replace(/\b(sb_secret|sb_publishable|CHASECK(_TEST)?)[\w-]*/g, "[key]")
    .replace(/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi, "[id]");
}

/** A path for an alert: no query string (it can carry references or codes), ids replaced. */
export function cleanPath(path: string | null | undefined): string {
  return scrub(String(path ?? "").split(/[?#]/)[0]).slice(0, 200);
}

export type Alert = { kind: "server" | "client"; where: string; message: string; detail?: string };

/** Tells the admins about an error. Never throws; resolves to whether anything was sent. */
export async function alertAdmins(a: Alert): Promise<boolean> {
  try {
    if (!telegramConfigured() || !hasSecretKey()) return false;
    const message = scrub(a.message).slice(0, 400);
    const where = cleanPath(a.where);
    const key = `${a.kind}|${where}|${message.slice(0, 120)}`;
    const now = Date.now();
    const prev = lastSent.get(key);
    if (prev && now - prev.at < SAME_ERROR_MS) {
      prev.repeats++;
      return false;
    }
    hour = hour.filter((t) => t > now - 3600_000);
    if (hour.length >= MAX_PER_HOUR) return false;

    const chats = await adminChats();
    if (!chats.length) return false;
    hour.push(now);
    lastSent.set(key, { at: now, repeats: 0 });
    if (lastSent.size > 500) for (const [k, v] of lastSent) if (now - v.at > SAME_ERROR_MS) lastSent.delete(k);

    const lines = [
      `${a.kind === "server" ? "🔴 Server error" : "🟠 Browser error"} on Lali`,
      `<b>${esc(where || "?")}</b>`,
      `<code>${esc(message)}</code>`,
      a.detail ? esc(scrub(a.detail).slice(0, 300)) : "",
      prev?.repeats ? `(+${prev.repeats} more like this since the last alert)` : "",
      new Date(now).toISOString().replace("T", " ").slice(0, 19) + " UTC",
    ].filter(Boolean);
    const sent = await Promise.all(chats.map((c) => sendMessage(c, lines.join("\n")).catch(() => false)));
    return sent.some(Boolean);
  } catch (e) {
    console.error("[alerts] could not send", e instanceof Error ? e.message : e);
    return false;
  }
}

/** For catch blocks in route handlers: logs the error and alerts the admins. */
export function reportServerError(error: unknown, where: string, detail?: string): void {
  const message = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
  void alertAdmins({ kind: "server", where, message, detail });
}
