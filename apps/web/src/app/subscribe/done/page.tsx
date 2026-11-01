import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { Suspense } from "react";

import { Bee } from "@/components/characters";
import { SiteNav } from "@/components/site-chrome";
import { familyPlan, confirmPayment, type Confirmation } from "@/lib/payments/subscription";
import { currentProfile } from "@/lib/supabase/server";
import { AutoRefresh } from "./auto-refresh";

export const metadata: Metadata = { title: "Payment" };

/** Where Chapa sends the parent after paying. Confirms the payment with Chapa before celebrating. */
async function DoneContent({ searchParams }: PageProps<"/subscribe/done">) {
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
              <h1 className="font-display text-4xl font-black">Thank you!</h1>
              <p className="text-lg">
                Your payment went through.
                {plan && (
                  <>
                    {" "}
                    <b>{plan.planName}</b> is open until <b>{new Date(plan.endsAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</b>.
                  </>
                )}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/stories" className="btn btn-primary">
                  Start reading
                </Link>
                <Link href="/account" className="btn btn-plain">
                  Grown-ups&rsquo; corner
                </Link>
              </div>
            </>
          ) : outcome === "pending" ? (
            <>
              <h1 className="font-display text-3xl font-black">We&rsquo;re checking your payment</h1>
              <p className="text-muted">
                Chapa hasn&rsquo;t confirmed it yet. This usually takes a few seconds and this page will update by itself. If you
                cancelled, you can try again any time.
              </p>
              <AutoRefresh />
              <div className="flex flex-wrap justify-center gap-3">
                <Link href={`/subscribe/done?tx_ref=${txRef}`} className="btn btn-primary">
                  Check again
                </Link>
                <Link href="/subscribe" className="btn btn-plain">
                  Back to plans
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="font-display text-3xl font-black">We couldn&rsquo;t find that payment</h1>
              <p className="text-muted">If money left your account, contact us with the time of payment and we&rsquo;ll sort it out.</p>
              <Link href="/subscribe" className="btn btn-primary">
                Back to plans
              </Link>
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default function DonePage(props: PageProps<"/subscribe/done">) {
  return (
    <Suspense fallback={<main className="grid min-h-dvh place-items-center text-muted">Confirming your payment…</main>}>
      <DoneContent {...props} />
    </Suspense>
  );
}
