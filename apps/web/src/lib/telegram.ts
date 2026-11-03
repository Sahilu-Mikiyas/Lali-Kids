import "server-only";

import { createHash } from "node:crypto";

/**
 * Lali's Telegram bot. The token comes from @BotFather and lives only in the server's
 * environment (TELEGRAM_BOT_TOKEN). Messages go to parents who connected Telegram themselves.
 */
const TOKEN_SHAPE = /^\d{6,12}:[A-Za-z0-9_-]{30,}$/;

function token(): string | null {
  const named = process.env.TELEGRAM_BOT_TOKEN?.trim().replace(/^["']|["']$/g, "");
  if (named && TOKEN_SHAPE.test(named)) return named;
  // Recognise a bot token saved under another name by mistake.
  for (const v of Object.values(process.env)) {
    const t = v?.trim().replace(/^["']|["']$/g, "");
    if (t && TOKEN_SHAPE.test(t)) return t;
  }
  return null;
}

export function telegramConfigured(): boolean {
  return token() !== null;
}

/** Telegram sends this back on every webhook call, so forged calls can be refused. */
export function webhookSecret(): string {
  return createHash("sha256").update(`lali-telegram:${token() ?? ""}`).digest("hex").slice(0, 48);
}

async function call<T>(method: string, body?: unknown): Promise<T | null> {
  const t = token();
  if (!t) return null;
  const res = await fetch(`https://api.telegram.org/bot${t}/${method}`, {
    method: body ? "POST" : "GET",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  const json = (await res.json().catch(() => null)) as { ok?: boolean; result?: T; description?: string } | null;
  if (!json?.ok) {
    console.error(`[telegram] ${method} failed: ${json?.description ?? res.status}`);
    return null;
  }
  return json.result ?? null;
}

let username: string | null = null;
/** The bot's @name, for t.me links. */
export async function botUsername(): Promise<string | null> {
  if (username) return username;
  const me = await call<{ username: string }>("getMe");
  username = me?.username ?? null;
  return username;
}

export type Button = { text: string; url: string };

export async function sendMessage(chatId: number | string, text: string, buttons: Button[] = []): Promise<boolean> {
  const result = await call("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
    reply_markup: buttons.length ? { inline_keyboard: buttons.map((b) => [b]) } : undefined,
  });
  return result !== null;
}

/** Points Telegram at our webhook if it isn't already. Safe to call often. */
export async function ensureWebhook(origin: string): Promise<void> {
  const url = `${origin}/api/telegram/webhook`;
  const info = await call<{ url: string }>("getWebhookInfo");
  if (info?.url === url) return;
  await call("setWebhook", { url, secret_token: webhookSecret(), allowed_updates: ["message"], drop_pending_updates: true });
}

/** Escapes text for Telegram's HTML mode. */
export function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
