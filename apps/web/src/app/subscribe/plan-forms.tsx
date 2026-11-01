"use client";

import { useActionState, useState } from "react";

import { formatBirr, PLANS, type PlanId } from "@/lib/payments/plans";
import { startCheckout, startTrial, type StartResult } from "./actions";

export function PlanForms({ initialPlan, trialAvailable, paymentsReady }: { initialPlan: PlanId; trialAvailable: boolean; paymentsReady: boolean }) {
  const [plan, setPlan] = useState<PlanId>(initialPlan);
  const [payState, pay, paying] = useActionState<StartResult, FormData>(startCheckout, null);
  const [trialState, trial, starting] = useActionState<StartResult, FormData>(startTrial, null);
  const chosen = PLANS.find((p) => p.id === plan)!;

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

      <div className="flex flex-col gap-4 rounded-[28px] bg-white p-6 shadow-[0_6px_0_var(--color-line)] md:flex-row md:items-center">
        <div className="flex-1">
          <p className="font-display text-xl font-black">{chosen.name} plan</p>
          <p className="text-muted">
            {trialAvailable ? "Try it free for 7 days, or pay now. " : ""}Each payment gives 30 days. Nothing renews automatically.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {trialAvailable && (
            <form action={trial}>
              <input type="hidden" name="plan" value={plan} />
              <button type="submit" className="btn btn-plain" disabled={starting}>
                {starting ? "Starting…" : "Start free week"}
              </button>
            </form>
          )}
          <form action={pay}>
            <input type="hidden" name="plan" value={plan} />
            <button type="submit" className="btn btn-primary" disabled={paying || !paymentsReady}>
              {paying ? "Opening Chapa…" : `Pay ${formatBirr(chosen.priceEtb)} birr`}
            </button>
          </form>
        </div>
      </div>

      {!paymentsReady && <p className="text-center text-muted">Online payment is being set up. The free week works now.</p>}
      {(payState?.error || trialState?.error) && (
        <p className="rounded-2xl bg-coral/10 p-4 text-center text-coral">{payState?.error ?? trialState?.error}</p>
      )}
      <p className="text-center text-sm text-muted">
        Pay with Telebirr, CBE Birr, M-Pesa or card on Chapa&rsquo;s secure page. Lali never sees your payment details.
      </p>
    </div>
  );
}
