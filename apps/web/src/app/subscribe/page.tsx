import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { planById } from "@/lib/payments/plans";
import { asCurrentPlan, familyPlan } from "@/lib/payments/subscription";
import { currentProfile } from "@/lib/supabase/server";
import { PlanForms } from "./plan-forms";

export const metadata: Metadata = { title: "Choose a plan" };

/** Request time, read once per request (the page waits for the request before rendering). */
const nowMs = () => Date.now();

async function SubscribeContent({ searchParams }: PageProps<"/subscribe">) {
  await connection();
  const { plan } = await searchParams;
  const profile = await currentProfile();
  const wanted = planById(typeof plan === "string" ? plan : null)?.id ?? "learner";
  if (!profile) redirect(`/login?next=${encodeURIComponent(`/subscribe?plan=${wanted}`)}`);

  const current = await familyPlan(profile.id);

  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-5xl px-4 pt-32 sm:px-6">
        <h1 className="font-display text-5xl font-black">Choose a plan</h1>
        {current?.isOpen ? (
          <p className="mt-3 text-lg text-muted">
            You&rsquo;re on <b>{current.planName}</b>
            {" "}with <b>{current.daysLeft} days</b> left
            {current.next && (
              <>
                , then <b>{current.next.planName}</b> for {current.next.days} days
              </>
            )}
            . Pick a plan below to see exactly what a payment would do.
          </p>
        ) : (
          <p className="mt-3 text-lg text-muted">Open every story and book for your family.</p>
        )}
        <div className="mt-10">
          <PlanForms
            initialPlan={typeof plan === "string" ? wanted : current?.isOpen ? (planById(current.planId)?.id ?? wanted) : wanted}
            current={asCurrentPlan(current)}
            nowMs={nowMs()}
          />
        </div>
        <p className="mt-8 text-center text-sm text-muted">
          By continuing you agree to the{" "}
          <Link href="/terms" className="underline">
            terms of use
          </Link>
          .
        </p>
      </main>
      <SiteFooter />
    </>
  );
}

export default function SubscribePage(props: PageProps<"/subscribe">) {
  return (
    <Suspense fallback={<main className="grid min-h-dvh place-items-center text-muted">Loading…</main>}>
      <SubscribeContent {...props} />
    </Suspense>
  );
}
