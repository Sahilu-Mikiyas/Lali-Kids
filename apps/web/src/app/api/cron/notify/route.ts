import { connection } from "next/server";

import { addisMidnightIso } from "@/lib/games";
import { originFrom } from "@/lib/origin";
import { planById } from "@/lib/payments/plans";
import { hasSecretKey } from "@/lib/supabase/env";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { ensureWebhook, esc, sendMessage, telegramConfigured } from "@/lib/telegram";

const DAY = 86_400_000;
let lastRun = 0;

type Family = { id: string; telegram_chat_id: number; ui_lang: "en" | "am"; display_name: string | null };

/**
 * Called every hour by the database (pg_cron). Sends plan reminders and, on Sunday evenings,
 * the weekly reading note. Each message is recorded in notifications_sent first, so calling
 * this more often never sends anything twice.
 */
export async function GET(request: Request) {
  await connection();
  if (!telegramConfigured() || !hasSecretKey()) return Response.json({ skipped: "not configured" });
  if (Date.now() - lastRun < 5 * 60_000) return Response.json({ skipped: "ran recently" });
  lastRun = Date.now();

  const origin = originFrom(request.headers);
  await ensureWebhook(origin);
  const admin = createSupabaseAdmin();

  const { data: families } = await admin
    .from("profiles")
    .select("id, telegram_chat_id, ui_lang, display_name")
    .not("telegram_chat_id", "is", null);
  const linked = (families ?? []) as Family[];
  if (!linked.length) return Response.json({ sent: 0 });

  /** Records the message, sends it, and forgets the record if sending failed so it retries next hour. */
  async function once(f: Family, kind: string, key: string, text: string, button?: { text: string; url: string }) {
    const { error } = await admin.from("notifications_sent").insert({ family_id: f.id, kind, key });
    if (error) return 0; // already sent
    const ok = await sendMessage(f.telegram_chat_id, text, button ? [button] : []);
    if (!ok) await admin.from("notifications_sent").delete().match({ family_id: f.id, kind, key });
    return ok ? 1 : 0;
  }

  let sent = 0;
  const now = Date.now();

  // Plan reminders: 3 days and 1 day before access ends, and the day it ends.
  const { data: subs } = await admin
    .from("subscriptions")
    .select("family_id, plan_id, status, current_period_end, next_plan_id, next_days")
    .in(
      "family_id",
      linked.map((f) => f.id),
    );
  for (const s of subs ?? []) {
    if (s.status !== "active" && s.status !== "trialing") continue;
    const f = linked.find((x) => x.id === s.family_id)!;
    const end = new Date(s.current_period_end).getTime() + (s.next_plan_id ? Number(s.next_days) * DAY : 0);
    const left = (end - now) / DAY;
    const plan = planById(s.next_plan_id ?? s.plan_id)?.name ?? "Lali";
    const key = new Date(end).toISOString().slice(0, 10);
    const pay = { text: f.ui_lang === "am" ? "30 ቀን ጨምር" : "Add 30 days", url: `${origin}/subscribe` };
    if (left > 0 && left <= 1) {
      sent += await once(
        f,
        "renew-1",
        key,
        f.ui_lang === "am"
          ? `🐝 የላሊ ${plan} እቅድዎ ነገ ያበቃል። ልጆችዎ ማንበባቸውን እንዲቀጥሉ 30 ቀን ይጨምሩ።`
          : `🐝 Your Lali ${plan} plan ends tomorrow. Add 30 days so the stories keep going.`,
        pay,
      );
    } else if (left > 1 && left <= 3) {
      sent += await once(
        f,
        "renew-3",
        key,
        f.ui_lang === "am"
          ? `🐝 የላሊ ${plan} እቅድዎ በ${Math.ceil(left)} ቀናት ውስጥ ያበቃል። እቅዶች በራሳቸው አይታደሱም።`
          : `🐝 Your Lali ${plan} plan ends in ${Math.ceil(left)} days. Plans don't renew by themselves.`,
        pay,
      );
    } else if (left <= 0 && left > -1) {
      sent += await once(
        f,
        "ended",
        key,
        f.ui_lang === "am"
          ? `🌙 የላሊ እቅድዎ አብቅቷል። ኮከቦችና የልጆች መገለጫዎች ተጠብቀዋል፤ በማንኛውም ጊዜ መቀጠል ይችላሉ።`
          : `🌙 Your Lali plan has ended. Stars and profiles are kept; you can pick up again any time.`,
        pay,
      );
    }
  }

  // Weekly note: Sunday from 18:00 in Addis Ababa.
  const addis = new Date(now + 3 * 3600_000);
  if (addis.getUTCDay() === 0 && addis.getUTCHours() >= 18) {
    const weekKey = addis.toISOString().slice(0, 10);
    const since = new Date(new Date(addisMidnightIso()).getTime() - 6 * DAY).toISOString();
    const { data: kids } = await admin
      .from("children")
      .select("id, family_id, name, stars")
      .in(
        "family_id",
        linked.map((f) => f.id),
      );
    const ids = (kids ?? []).map((k) => k.id);
    const [{ data: done }, { data: play }] = ids.length
      ? await Promise.all([
          admin.from("completions").select("child_id").in("child_id", ids).gte("completed_at", since),
          admin.from("game_sessions").select("child_id, seconds").in("child_id", ids).gte("started_at", since),
        ])
      : [{ data: [] }, { data: [] }];

    for (const f of linked) {
      const mine = (kids ?? []).filter((k) => k.family_id === f.id);
      if (!mine.length) continue;
      const lines = mine.map((k) => {
        const stories = (done ?? []).filter((d) => d.child_id === k.id).length;
        const minutes = Math.round((play ?? []).filter((p) => p.child_id === k.id).reduce((a, p) => a + p.seconds, 0) / 60);
        return f.ui_lang === "am"
          ? `• <b>${esc(k.name)}</b>: ${stories} ተረቶች${minutes ? `፣ ${minutes} ደቂቃ ጨዋታ` : ""} · ⭐ ${k.stars}`
          : `• <b>${esc(k.name)}</b>: ${stories} ${stories === 1 ? "story" : "stories"}${minutes ? `, ${minutes} min of games` : ""} · ⭐ ${k.stars}`;
      });
      const quiet = mine.every((k) => !(done ?? []).some((d) => d.child_id === k.id));
      const text =
        f.ui_lang === "am"
          ? `📚 የዚህ ሳምንት የላሊ ዜና\n\n${lines.join("\n")}\n\n${quiet ? "በዚህ ሳምንት አብረን አንድ ተረት እናንብብ? 🐝" : "በርቱ! 🐝"}`
          : `📚 Lali this week\n\n${lines.join("\n")}\n\n${quiet ? "How about one story together this week? 🐝" : "Lovely reading! 🐝"}`;
      sent += await once(f, "weekly", weekKey, text, { text: f.ui_lang === "am" ? "ተረቶችን ክፈት" : "Open the stories", url: `${origin}/stories` });
    }
  }

  return Response.json({ sent });
}
