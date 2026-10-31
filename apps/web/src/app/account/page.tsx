import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { loadFamily } from "@/lib/family";
import { createSupabaseServer, hasActivePlan } from "@/lib/supabase/server";
import { GrownUpsGate } from "./gate";
import { AddChildForm, ChildCard, LimitPicker } from "./controls";
import { allowMoreTonight } from "./actions";

export const metadata: Metadata = { title: "Grown-ups' corner" };

function weekAgoIso() {
  return new Date(Date.now() - 7 * 86400_000).toISOString();
}

async function AccountContent() {
  const family = await loadFamily();
  if (!family) redirect("/login?next=/account");

  const supabase = await createSupabaseServer();
  const weekAgo = weekAgoIso();
  const ids = family.children.map((c) => c.id);
  const [{ data: subscribed }, { data: recent }] = await Promise.all([
    hasActivePlan(family.profile.id).then((data) => ({ data })),
    ids.length ? supabase.from("completions").select("child_id, item_id, completed_at").in("child_id", ids).gte("completed_at", weekAgo) : Promise.resolve({ data: [] as { child_id: string; item_id: string; completed_at: string }[] }),
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
              {subscribed ? (
                <p className="text-muted">Your plan is active. Every story and book is open.</p>
              ) : (
                <>
                  <p className="text-muted">You&rsquo;re on the free shelf. Start a plan to open the whole library.</p>
                  <Link href="/#plans" className="btn btn-primary !text-base">
                    See plans
                  </Link>
                </>
              )}
            </div>
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
