import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { Suspense } from "react";

import { Bee } from "@/components/characters";
import { SiteNav } from "@/components/site-chrome";
import { familyPlan, confirmPayment, type Confirmation } from "@/lib/payments/subscription";
import { currentProfile } from "@/lib/supabase/server";
import { fmtDate } from "@/i18n/format";
import { getLang, getT } from "@/i18n/server";
import { AutoRefresh } from "./auto-refresh";

export const metadata: Metadata = { title: "Payment" };

/** Where Chapa sends the parent after paying. Confirms the payment with Chapa before celebrating. */
async function DoneContent({ searchParams }: PageProps<"/[lang]/subscribe/done">) {
  await connection();
  const { tx_ref } = await searchParams;
  const txRef = typeof tx_ref === "string" && /^lali-[a-z]+-[0-9a-f]{18}$/.test(tx_ref) ? tx_ref : null;
  const profile = await currentProfile();

  let outcome: Confirmation = "unknown";
  if (txRef) {
    try {
      outcome = await confirmPayment(txRef);
    } catch {
      outcome = "pending";
    }
  }
  const plan = profile && (outcome === "paid" || outcome === "already") ? await familyPlan(profile.id) : null;
  const [t, lang] = await Promise.all([getT(), getLang()]);
  const ok = outcome === "paid" || outcome === "already";

  return (
    <>
      <SiteNav />
      <main className="mx-auto grid min-h-dvh max-w-lg place-items-center px-4 pt-24 sm:px-6">
        <div className="w-full space-y-5 rounded-[32px] bg-white p-8 text-center shadow-[0_8px_0_var(--color-line)]">
          <div className="mx-auto w-fit animate-float">
            <Bee size={72} />
          </div>
          {ok ? (
            <>
              <h1 className="font-display text-4xl font-black">{t.done.thanks}</h1>
              <p className="text-lg">
                {t.done.went} {plan && t.done.openUntil(t.plans.names[plan.planId as keyof typeof t.plans.names] ?? plan.planName, fmtDate(lang, plan.endsAt))}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/stories" className="btn btn-primary">
                  {t.done.start}
                </Link>
                <Link href="/account" className="btn btn-plain">
                  {t.done.corner}
                </Link>
              </div>
            </>
          ) : outcome === "pending" ? (
            <>
              <h1 className="font-display text-3xl font-black">{t.done.checking}</h1>
              <p className="text-muted">
                {t.done.checkingSub}
              </p>
              <AutoRefresh label={t.done.auto} />
              <div className="flex flex-wrap justify-center gap-3">
                <Link href={`/subscribe/done?tx_ref=${txRef}`} className="btn btn-primary">
                  {t.done.again}
                </Link>
                <Link href="/subscribe" className="btn btn-plain">
                  {t.done.back}
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="font-display text-3xl font-black">{t.done.notFound}</h1>
              <p className="text-muted">{t.done.notFoundSub}</p>
              <Link href="/subscribe" className="btn btn-primary">
                {t.done.back}
              </Link>
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default function DonePage(props: PageProps<"/[lang]/subscribe/done">) {
  return (
    <Suspense fallback={<main className="grid min-h-dvh place-items-center text-muted">Confirming your payment…</main>}>
      <DoneContent {...props} />
    </Suspense>
  );
}
