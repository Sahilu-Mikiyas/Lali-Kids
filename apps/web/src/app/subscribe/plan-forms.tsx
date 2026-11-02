"use client";

import { useActionState, useEffect, useState } from "react";

import { formatBirr, formatDay, planById, PLANS, previewSwitch, type CurrentPlan, type PlanId } from "@/lib/payments/plans";
import { startCheckout, type CheckoutResult } from "./actions";

function SwitchNote({ current, plan, nowMs }: { current: CurrentPlan; plan: PlanId; nowMs: number }) {
  const p = previewSwitch(current, plan, nowMs);
  const to = planById(plan)!.name;
  const from = current ? planById(current.planId)!.name : "";
  switch (p.kind) {
    case "new":
      return <>30 days of {to}, starting today, until <b>{formatDay(p.endsAtMs)}</b>.</>;
    case "renew":
      return <>Adds 30 days to your {to} plan. It will run until <b>{formatDay(p.endsAtMs)}</b>.</>;
    case "upgrade":
      return (
        <>
          <b>Upgrade today.</b> The days left on {from} are worth {Math.round(p.convertedDays * 10) / 10} days of {to}, so you get those plus
          30 days: {to} until <b>{formatDay(p.endsAtMs)}</b>.
        </>
      );
    case "downgrade":
      return (
        <>
          You keep {from} until <b>{formatDay(p.startsAtMs)}</b>, then {to} starts and runs until <b>{formatDay(p.endsAtMs)}</b>. You
          don&rsquo;t lose any days.
        </>
      );
  }
}

export function PlanForms({ initialPlan, current, nowMs }: { initialPlan: PlanId; current: CurrentPlan; nowMs: number }) {
  const [plan, setPlan] = useState<PlanId>(initialPlan);
  const [result, pay, paying] = useActionState<CheckoutResult, FormData>(startCheckout, null);
  const chosen = PLANS.find((p) => p.id === plan)!;
  const leaving = Boolean(result && "url" in result);

  // Go to Chapa's checkout as soon as the server hands back its address.
  useEffect(() => {
    if (result && "url" in result) window.location.assign(result.url);
  }, [result]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3" role="radiogroup" aria-label="Choose a plan">
        {PLANS.map((p) => (
          <button
            key={p.id}
            type="button"
            role="radio"
            aria-checked={plan === p.id}
            onClick={() => setPlan(p.id)}
            className={`flex flex-col gap-2 rounded-[28px] border-4 p-6 text-left transition ${
              plan === p.id ? "border-teal bg-white shadow-[0_8px_0_var(--color-teal)]" : "border-transparent bg-white shadow-[0_6px_0_var(--color-line)] hover:-translate-y-1"
            }`}
          >
            <span className="font-display text-2xl font-black">{p.name}</span>
            <span className="text-muted">{p.for}</span>
            <span className="font-display text-4xl font-black tabular-nums">
              {formatBirr(p.priceEtb)}
              <span className="ml-1 font-ethiopic text-xl font-normal">ብር</span>
              <span className="ml-1 font-body text-base font-normal text-muted">/ 30 days</span>
            </span>
            <ul className="mt-2 space-y-1.5 text-sm">
              {p.items.map((i) => (
                <li key={i}>✓ {i}</li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      <form action={pay} className="flex flex-col gap-4 rounded-[28px] bg-white p-6 shadow-[0_6px_0_var(--color-line)] md:flex-row md:items-center">
        <input type="hidden" name="plan" value={plan} />
        <div className="flex-1">
          <p className="font-display text-xl font-black">
            {chosen.name} plan
            {current && current.planId === plan && <span className="ml-2 rounded-full bg-teal px-2.5 py-0.5 align-middle text-xs text-white">Your plan</span>}
          </p>
          <p className="text-muted">
            <SwitchNote current={current} plan={plan} nowMs={nowMs} /> Nothing renews automatically.
          </p>
        </div>
        <button type="submit" className="btn btn-primary" disabled={paying || leaving}>
          {paying ? "Starting payment…" : leaving ? "Opening Chapa…" : `Pay ${formatBirr(chosen.priceEtb)} birr`}
        </button>
      </form>

      {result && "error" in result && <p className="rounded-2xl bg-coral/10 p-4 text-center text-coral" role="alert">{result.error}</p>}
      <p className="text-center text-sm text-muted">
        Pay with Telebirr, CBE Birr, M-Pesa or card on Chapa&rsquo;s secure page. Lali never sees your payment details.
      </p>
    </div>
  );
}
