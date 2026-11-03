import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

import { Bee } from "@/components/characters";
import { getLang, getT } from "@/i18n/server";
import { formatBirr } from "@/lib/payments/plans";
import { createSupabaseServer, currentProfile } from "@/lib/supabase/server";
import { PrintButton } from "./print-button";

export const metadata: Metadata = { title: "Receipt" };

/** A printable receipt for one of the family's own payments. */
async function ReceiptContent({ params }: PageProps<"/[lang]/account/receipt/[ref]">) {
  await connection();
  const { ref } = await params;
  const profile = await currentProfile();
  if (!profile) redirect("/login?next=/account");
  const supabase = await createSupabaseServer();
  // Row-level security only returns the family's own payments.
  const { data: p } = await supabase
    .from("payments")
    .select("tx_ref, plan_id, amount_etb, provider_ref, paid_at")
    .eq("tx_ref", ref)
    .eq("status", "paid")
    .maybeSingle();
  if (!p) notFound();
  const [t, lang] = await Promise.all([getT(), getLang()]);
  const r = t.receipt;
  const planName = t.plans.names[p.plan_id as keyof typeof t.plans.names] ?? p.plan_id;

  const rows: [string, string][] = [
    [r.date, p.paid_at ? new Date(p.paid_at).toLocaleString(lang === "am" ? "am-ET" : "en-GB", { dateStyle: "long", timeStyle: "short", timeZone: "Africa/Addis_Ababa" }) : ""],
    [r.paidBy, `${profile.display_name ?? ""} ${profile.email ? `(${profile.email})` : ""}`.trim()],
    [r.plan, r.days30(planName)],
    [r.amount, `${t.account.birr(formatBirr(p.amount_etb))} (ETB)`],
    [r.through, "Chapa"],
    [r.chapaRef, p.provider_ref ?? ""],
    [r.laliRef, p.tx_ref],
  ];

  return (
    <main className="mx-auto max-w-xl px-4 py-12 print:py-0">
      <div className="space-y-6 rounded-[28px] bg-white p-8 shadow-[0_6px_0_var(--color-line)] print:shadow-none">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display text-3xl font-black">Lali</p>
            <p className="text-muted">{r.title}</p>
          </div>
          <Bee size={56} />
        </div>
        <dl className="divide-y-2 divide-line">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 py-2.5">
              <dt className="text-muted">{k}</dt>
              <dd className="break-all text-right font-bold">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="text-sm text-muted">{r.thanks}</p>
      </div>
      <div className="mt-6 flex justify-center gap-3 print:hidden">
        <PrintButton label={r.print} />
        <Link href="/account" className="btn btn-plain">
          {r.back}
        </Link>
      </div>
    </main>
  );
}

export default function ReceiptPage(props: PageProps<"/[lang]/account/receipt/[ref]">) {
  return (
    <Suspense fallback={<main className="grid min-h-dvh place-items-center text-muted">Loading…</main>}>
      <ReceiptContent {...props} />
    </Suspense>
  );
}
