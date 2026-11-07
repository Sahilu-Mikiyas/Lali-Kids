import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { planById } from "@/lib/payments/plans";
import { asCurrentPlan, familyPlan } from "@/lib/payments/subscription";
import { currentProfile } from "@/lib/supabase/server";
import { getT } from "@/i18n/server";
import { PlanForms } from "./plan-forms";

export const metadata: Metadata = { title: "Choose a plan" };

/** Request time, read once per request (the page waits for the request before rendering). */
const nowMs = () => Date.now();

async function SubscribeContent({ searchParams }: PageProps<"/[lang]/subscribe">) {
  await connection();
  const { plan } = await searchParams;
  const profile = await currentProfile();
  const wanted = planById(typeof plan === "string" ? plan : null)?.id ?? "learner";
  if (!profile) redirect(`/login?next=${encodeURIComponent(`/subscribe?plan=${wanted}`)}`);

  const [current, t] = await Promise.all([familyPlan(profile.id), getT()]);
  const planName = (id: string) => t.plans.names[id as keyof typeof t.plans.names] ?? id;

  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-5xl px-4 pt-32 sm:px-6">
        <h1 className="font-display text-5xl font-black">{t.subscribe.title}</h1>
        {current?.isOpen ? (
          <p className="mt-3 text-lg text-muted">
            {t.subscribe.current(planName(current.planId), current.daysLeft)}
            {current.next && t.subscribe.thenNext(planName(current.next.planId), current.next.days)}
            {t.subscribe.pick}
          </p>
        ) : (
          <p className="mt-3 text-lg text-muted">{t.subscribe.open}</p>
        )}
        <div className="mt-10">
          <PlanForms
            initialPlan={typeof plan === "string" ? wanted : current?.isOpen ? (planById(current.planId)?.id ?? wanted) : wanted}
            current={asCurrentPlan(current)}
            nowMs={nowMs()}
          />
        </div>
        <p className="mt-8 text-center text-lg">
          {t.gift.haveCode}{" "}
          <Link href="/gift/redeem" className="font-bold text-blue underline">
            {t.gift.addCode}
          </Link>
        </p>
        <p className="mt-3 text-center text-sm text-muted">
          {t.subscribe.agree}{" "}
          <Link href="/terms" className="underline">
            {t.subscribe.terms}
          </Link>
          .
        </p>
      </main>
      <SiteFooter />
    </>
  );
}

export default function SubscribePage(props: PageProps<"/[lang]/subscribe">) {
  return (
    <Suspense fallback={<main className="grid min-h-dvh place-items-center text-muted">Loading…</main>}>
      <SubscribeContent {...props} />
    </Suspense>
  );
}
