import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { loadFamily } from "@/lib/family";
import { formatBirr, planById } from "@/lib/payments/plans";
import { familyPlan } from "@/lib/payments/subscription";
import { createSupabaseServer } from "@/lib/supabase/server";
import { GrownUpsGate } from "./gate";
import { AddChildForm, ChildCard, LimitPicker } from "./controls";
import { allowMoreTonight } from "./actions";

export const metadata: Metadata = { title: "Grown-ups' corner" };

function weekAgoIso() {
  return new Date(Date.now() - 7 * 86400_000).toISOString();
}

const KIND: Record<string, string> = {
  new: "Started the plan",
  renew: "Added 30 days",
  upgrade: "Upgraded",
  downgrade: "Starts after the current plan",
};

async function AccountContent() {
  await connection();
  const family = await loadFamily();
  if (!family) redirect("/login?next=/account");

  const supabase = await createSupabaseServer();
  const weekAgo = weekAgoIso();
  const ids = family.children.map((c) => c.id);
  const [plan, { data: recent }, { data: payments }] = await Promise.all([
    familyPlan(family.profile.id),
    ids.length ? supabase.from("completions").select("child_id, item_id, completed_at").in("child_id", ids).gte("completed_at", weekAgo) : Promise.resolve({ data: [] as { child_id: string; item_id: string; completed_at: string }[] }),
    supabase
      .from("payments")
      .select("tx_ref, plan_id, amount_etb, kind, provider_ref, paid_at")
      .eq("family_id", family.profile.id)
      .eq("status", "paid")
      .order("paid_at", { ascending: false })
      .limit(12),
  ]);
  const weekByChild = new Map<string, number>();
  for (const r of recent ?? []) weekByChild.set(r.child_id, (weekByChild.get(r.child_id) ?? 0) + 1);

  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-5xl px-4 pt-32 sm:px-6">
        <GrownUpsGate>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-5xl font-black">Grown-ups&rsquo; corner</h1>
              <p className="mt-2 text-lg text-muted">Signed in as {family.profile.email}</p>
            </div>
            <div className="flex items-center gap-3">
              {family.profile.role === "admin" && (
                <Link href="/admin/books" className="btn btn-plain !text-base">
                  Manage books
                </Link>
              )}
              <form action="/auth/signout" method="post">
                <button type="submit" className="font-bold text-muted hover:text-ink">
                  Sign out
                </button>
              </form>
            </div>
          </div>

          <section className="mt-10 space-y-4">
            <h2 className="font-display text-2xl font-black">Children</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {family.children.map((c) => (
                <ChildCard key={c.id} child={c} thisWeek={weekByChild.get(c.id) ?? 0} current={family.current?.id === c.id} />
              ))}
              <AddChildForm />
            </div>
          </section>

          <section className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="space-y-3 rounded-[28px] bg-white p-6 shadow-[0_6px_0_var(--color-line)]">
              <h2 className="font-display text-2xl font-black">Bedtime limit</h2>
              <p className="text-muted">After this many stories in one night, Lali says goodnight and the shelf closes until tomorrow.</p>
              <LimitPicker value={family.nightlyLimit} />
              {family.readTonight > 0 && (
                <form action={allowMoreTonight}>
                  <p className="text-sm text-muted">
                    {family.current?.name} has read {family.readTonight} {family.readTonight === 1 ? "story" : "stories"} tonight.
                  </p>
                  <button type="submit" className="btn btn-plain mt-2 !text-base">
                    Allow more stories tonight
                  </button>
                </form>
              )}
            </div>
            <div className="space-y-3 rounded-[28px] bg-white p-6 shadow-[0_6px_0_var(--color-line)]">
              <h2 className="font-display text-2xl font-black">Your plan</h2>
              {plan?.isOpen ? (
                <>
                  <p>
                    <b>{plan.planName}</b>
                  </p>
                  <p className="text-muted">
                    Open until {new Date(plan.endsAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} (
                    {plan.daysLeft} {plan.daysLeft === 1 ? "day" : "days"} left). Plans don&rsquo;t renew automatically.
                  </p>
                  {plan.next && (
                    <p className="rounded-2xl bg-sky-soft p-3 text-sm">
                      Then <b>{plan.next.planName}</b> starts and runs until{" "}
                      {new Date(plan.next.endsAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}.
                    </p>
                  )}
                  <Link href="/subscribe" className={`btn !text-base ${plan.daysLeft <= 5 ? "btn-primary" : "btn-plain"}`}>
                    Add 30 days or change plan
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-muted">
                    {plan ? `Your ${plan.planName} plan ended. Stars and profiles are kept; paid books are locked.` : "You’re on the free shelf. Start a plan to open the whole library."}
                  </p>
                  <Link href="/subscribe" className="btn btn-primary !text-base">
                    {plan ? "Renew" : "See plans"}
                  </Link>
                </>
              )}
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="font-display text-2xl font-black">Payments</h2>
            {payments && payments.length > 0 ? (
              <div className="overflow-x-auto rounded-[28px] bg-white p-2 shadow-[0_6px_0_var(--color-line)]">
                <table className="w-full min-w-[520px] text-left">
                  <thead className="text-sm text-muted">
                    <tr>
                      <th className="p-3">Date</th>
                      <th className="p-3">Plan</th>
                      <th className="p-3">What it did</th>
                      <th className="p-3 text-right">Amount</th>
                      <th className="p-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((p) => (
                      <tr key={p.tx_ref} className="border-t-2 border-line">
                        <td className="p-3">{p.paid_at ? new Date(p.paid_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : ""}</td>
                        <td className="p-3 font-bold">{planById(p.plan_id)?.name ?? p.plan_id}</td>
                        <td className="p-3 text-muted">{KIND[p.kind ?? ""] ?? "Added 30 days"}</td>
                        <td className="p-3 text-right tabular-nums">{formatBirr(p.amount_etb)} birr</td>
                        <td className="p-3 text-right">
                          <Link href={`/account/receipt/${p.tx_ref}`} className="font-bold text-blue hover:underline">
                            Receipt
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted">No payments yet.</p>
            )}
          </section>
        </GrownUpsGate>
      </main>
      <SiteFooter />
    </>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={<main className="grid min-h-dvh place-items-center text-muted">Loading…</main>}>
      <AccountContent />
    </Suspense>
  );
}
