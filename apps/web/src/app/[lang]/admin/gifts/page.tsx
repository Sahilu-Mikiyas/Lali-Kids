import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";

import { SiteNav } from "@/components/site-chrome";
import { fmtDate } from "@/i18n/format";
import { getLang, getT } from "@/i18n/server";
import { requireAdmin } from "@/lib/admin";
import { originFrom } from "@/lib/origin";
import { redeemLink } from "@/lib/payments/gift";
import { formatBirr, type PlanId } from "@/lib/payments/plans";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { CopyButton } from "../../gift/done/share";
import { recheckGift } from "./actions";

export const metadata: Metadata = { title: "Gifts" };

const STATUS_TONE: Record<string, string> = {
  pending: "bg-line text-muted",
  paid: "bg-gold/20 text-gold-deep",
  redeemed: "bg-teal/15 text-teal-deep",
};

type Row = {
  code: string;
  plan_id: PlanId;
  months: number;
  amount_etb: number;
  giver_name: string;
  giver_email: string;
  recipient_label: string;
  tx_ref: string;
  status: string;
  created_at: string;
  redeemed_at: string | null;
};

/** Every gift, for the founder: who gave what, and whether a family has added it yet. */
async function GiftsContent() {
  await connection();
  if (!(await requireAdmin())) redirect("/account");
  const [t, lang, h] = await Promise.all([getT(), getLang(), headers()]);
  const a = t.gift.admin;
  const origin = originFrom(h);
  const { data } = await createSupabaseAdmin()
    .from("gifts")
    .select("code, plan_id, months, amount_etb, giver_name, giver_email, recipient_label, tx_ref, status, created_at, redeemed_at")
    .order("created_at", { ascending: false })
    .limit(300);
  const gifts = (data ?? []) as Row[];

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 pb-20 pt-32 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-5xl font-black">🎁 {a.title}</h1>
          <p className="mt-2 text-lg text-muted">{a.sub}</p>
        </div>
        <Link href="/admin/stats" className="btn btn-plain !text-base">
          {a.back}
        </Link>
      </div>

      {gifts.length === 0 ? (
        <p className="rounded-[28px] bg-white p-6 text-muted shadow-[0_6px_0_var(--color-line)]">{a.none}</p>
      ) : (
        <ul className="space-y-4">
          {gifts.map((g) => {
            const card = `${origin}/gift/done?tx_ref=${g.tx_ref}`;
            const redeem = redeemLink(origin, g.code);
            const mail = `mailto:${encodeURIComponent(g.giver_email)}?subject=${encodeURIComponent(a.emailSubject)}&body=${encodeURIComponent(a.emailBody(g.giver_name, g.code, card, redeem))}`;
            return (
              <li key={g.tx_ref} className="flex flex-col gap-4 rounded-[24px] bg-white p-5 shadow-[0_6px_0_var(--color-line)] lg:flex-row lg:items-center">
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-display text-xl font-black tracking-[0.1em]" translate="no">
                      {g.code}
                    </span>
                    <span className={`rounded-full px-2.5 py-0.5 text-sm font-bold ${STATUS_TONE[g.status] ?? ""}`}>{a.statuses[g.status] ?? g.status}</span>
                  </div>
                  <p>
                    <b>{t.plans.names[g.plan_id] ?? g.plan_id}</b> · {t.gift.months(g.months)} · {t.account.birr(formatBirr(g.amount_etb))}
                  </p>
                  <p className="break-words text-sm text-muted">
                    {a.giver}: {g.giver_name} &lt;{g.giver_email}&gt; · {a.forWho}: {g.recipient_label} · {a.created}: {fmtDate(lang, g.created_at, "short")}
                    {g.redeemed_at && ` · ✓ ${fmtDate(lang, g.redeemed_at, "short")}`}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.status === "pending" ? (
                    <form action={recheckGift}>
                      <input type="hidden" name="tx_ref" value={g.tx_ref} />
                      <button type="submit" className="btn btn-plain !px-3 !py-2 !text-sm">
                        {a.recheck}
                      </button>
                    </form>
                  ) : (
                    <>
                      <CopyButton text={g.code} label={a.copyCode} className="btn btn-plain !px-3 !py-2 !text-sm" />
                      <CopyButton text={card} label={a.copyLink} className="btn btn-plain !px-3 !py-2 !text-sm" />
                      <a href={mail} className="btn btn-plain !px-3 !py-2 !text-sm">
                        ✉️ {a.email}
                      </a>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}

export default function AdminGiftsPage() {
  return (
    <>
      <SiteNav />
      <Suspense fallback={<main className="grid min-h-dvh place-items-center text-muted">…</main>}>
        <GiftsContent />
      </Suspense>
    </>
  );
}
