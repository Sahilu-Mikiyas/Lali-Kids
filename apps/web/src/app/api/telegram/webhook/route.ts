import { timingSafeEqual } from "node:crypto";

import { createSupabaseAdmin } from "@/lib/supabase/server";
import { esc, sendMessage, telegramConfigured, webhookSecret } from "@/lib/telegram";

type Update = { message?: { chat: { id: number; type: string }; text?: string; from?: { first_name?: string } } };

function sameSecret(given: string | null) {
  const want = Buffer.from(webhookSecret());
  const got = Buffer.from(given ?? "");
  return got.length === want.length && timingSafeEqual(got, want);
}

/** Messages people send to Lali's bot. Only /start <code> (from the Grown-ups' corner) and /stop do anything. */
export async function POST(request: Request) {
  if (!telegramConfigured() || !sameSecret(request.headers.get("x-telegram-bot-api-secret-token"))) {
    return new Response("Forbidden", { status: 403 });
  }
  const update = (await request.json().catch(() => null)) as Update | null;
  const msg = update?.message;
  if (!msg?.text || msg.chat.type !== "private") return Response.json({ ok: true });
  const chatId = msg.chat.id;
  const text = msg.text.trim();
  const admin = createSupabaseAdmin();

  const start = /^\/start(?:\s+([A-Za-z0-9]{8,32}))?$/.exec(text);
  if (start?.[1]) {
    const { data: profile } = await admin
      .from("profiles")
      .select("id, display_name, ui_lang, telegram_link_expires")
      .eq("telegram_link_code", start[1])
      .maybeSingle();
    if (!profile || !profile.telegram_link_expires || new Date(profile.telegram_link_expires).getTime() < Date.now()) {
      await sendMessage(chatId, "That link has expired. Open the Grown-ups' corner on Lali and press <b>Connect Telegram</b> again.\n\nሊንኩ ጊዜው አልፏል። እባክዎ እንደገና ይሞክሩ።");
      return Response.json({ ok: true });
    }
    // One chat belongs to one family.
    await admin.from("profiles").update({ telegram_chat_id: null }).eq("telegram_chat_id", chatId);
    await admin.from("profiles").update({ telegram_chat_id: chatId, telegram_link_code: null, telegram_link_expires: null }).eq("id", profile.id);
    const name = esc(profile.display_name || msg.from?.first_name || "");
    await sendMessage(
      chatId,
      profile.ui_lang === "am"
        ? `ሰላም ${name}! 🐝 ላሊ ተገናኝቷል።\n\nእቅድዎ ከማለቁ በፊት እናስታውስዎታለን፣ በየሳምንቱ እሁድ ምሽትም የልጆችዎን የንባብ ዜና እንልካለን።\n\nለማቋረጥ /stop ይጻፉ።`
        : `Hello ${name}! 🐝 Lali is connected.\n\nWe'll remind you before your plan ends, and every Sunday evening we'll send a short note on your children's reading.\n\nSend /stop to turn this off.`,
    );
    return Response.json({ ok: true });
  }

  if (text === "/stop") {
    await admin.from("profiles").update({ telegram_chat_id: null }).eq("telegram_chat_id", chatId);
    await sendMessage(chatId, "Done. Lali won't message you any more. You can reconnect any time from the Grown-ups' corner.\n\nተቋርጧል። 🐝");
    return Response.json({ ok: true });
  }

  await sendMessage(
    chatId,
    "Hi! I'm Lali's helper 🐝 I send plan reminders and a weekly reading note.\nTo connect, open <b>Grown-ups' corner</b> on the Lali website and press <b>Connect Telegram</b>.\n\nሰላም! ለመገናኘት በላሊ ድረ-ገጽ የወላጆች ክፍል ውስጥ <b>Connect Telegram</b> ይጫኑ።",
  );
  return Response.json({ ok: true });
}
