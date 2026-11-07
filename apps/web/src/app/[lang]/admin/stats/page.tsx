import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { SiteNav } from "@/components/site-chrome";
import { getStory } from "@/content/stories";
import { getT } from "@/i18n/server";
import { requireAdmin } from "@/lib/admin";
import { formatBirr } from "@/lib/payments/plans";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { schoolCounts } from "@/lib/schools/server";

export const metadata: Metadata = { title: "Pilot numbers" };

const DAY = 86_400_000;
/** The calendar day in Addis Ababa, so "3 days a week" means 3 local days. */
const addisDay = (iso: string) => new Date(new Date(iso).getTime() + 3 * 3600_000).toISOString().slice(0, 10);
/** Read once per request; the page waits for the request before rendering. */
const requestTime = () => Date.now();
const pct = (n: number, d: number) => (d ? Math.round((n / d) * 100) : 0);

function Metric({ label, value, target, hint, good }: { label: string; value: string; target?: string; hint: string; good?: boolean }) {
  return (
    <div className="space-y-2 rounded-[28px] bg-white p-6 shadow-[0_6px_0_var(--color-line)]">
      <p className="font-bold text-muted">{label}</p>
      <p className="font-display text-5xl font-black tabular-nums">{value}</p>
      {target && (
        <p className={`text-sm font-bold ${good ? "text-teal" : "text-coral"}`}>
          {good ? "✓ On target" : "Below target"} ({target})
        </p>
      )}
      <p className="text-sm text-muted">{hint}</p>
    </div>
  );
}

/**
 * The numbers the pilot is judged on (docs/ROADMAP.md): do kids come back on their own, and do
 * parents keep paying. Admin accounts are left out so testing doesn't skew them.
 */
async function StatsContent() {
  await connection();
  if (!(await requireAdmin())) redirect("/account");
  const db = createSupabaseAdmin();
  const now = requestTime();
  const weekAgo = new Date(now - 7 * DAY).toISOString();
  const monthAgo = new Date(now - 30 * DAY).toISOString();

  const [{ data: profiles }, { data: kids }, { data: payments }, { data: subs }, { data: done }, { data: play }, { data: gifts }, t] = await Promise.all([
    db.from("profiles").select("id, role, created_at"),
    db.from("children").select("id, family_id"),
    db.from("payments").select("family_id, amount_etb, paid_at, status").eq("status", "paid"),
    db.from("subscriptions").select("family_id, status, current_period_end"),
    db.from("completions").select("child_id, item_id, completed_at").gte("completed_at", monthAgo),
    db.from("game_sessions").select("child_id, seconds, started_at").gte("started_at", weekAgo),
    // Empty until migration 0012 is applied.
    db.from("gifts").select("status, amount_etb").in("status", ["paid", "redeemed"]),
    getT(),
  ]);
  // Zeros until migration 0015 (schools) is applied.
  const schools = await schoolCounts(weekAgo).catch(() => null);
  const giftsSold = gifts?.length ?? 0;
  const giftsRedeemed = (gifts ?? []).filter((g) => g.status === "redeemed").length;
  const giftRevenue = (gifts ?? []).reduce((a, g) => a + g.amount_etb, 0);

  const admins = new Set((profiles ?? []).filter((p) => p.role === "admin").map((p) => p.id));
  const families = (profiles ?? []).filter((p) => !admins.has(p.id));
  const children = (kids ?? []).filter((k) => !admins.has(k.family_id));
  const childIds = new Set(children.map((k) => k.id));
  const paid = (payments ?? []).filter((p) => !admins.has(p.family_id));

  // Sign-up to paid
  const payers = new Set(paid.map((p) => p.family_id));
  const payingNow = (subs ?? []).filter(
    (s) => !admins.has(s.family_id) && (s.status === "active" || s.status === "trialing") && new Date(s.current_period_end).getTime() > now,
  ).length;

  // Month-1 renewal: families whose first payment is 30+ days old, who paid again.
  const byFamily = new Map<string, number[]>();
  for (const p of paid) if (p.paid_at) byFamily.set(p.family_id, [...(byFamily.get(p.family_id) ?? []), new Date(p.paid_at).getTime()]);
  let due = 0;
  let renewed = 0;
  for (const times of byFamily.values()) {
    const first = Math.min(...times);
    if (now - first < 30 * DAY) continue;
    due++;
    if (times.length > 1) renewed++;
  }

  // Kids active 3+ days in the last 7 (stories or games)
  const days = new Map<string, Set<string>>();
  const mark = (child: string, iso: string) => {
    if (!childIds.has(child) || iso < weekAgo) return;
    days.set(child, (days.get(child) ?? new Set()).add(addisDay(iso)));
  };
  for (const c of done ?? []) mark(c.child_id, c.completed_at);
  for (const g of play ?? []) if (g.child_id) mark(g.child_id, g.started_at);
  const activeKids = [...days.values()].filter((d) => d.size >= 3).length;

  // Stories per active child this week
  const weekDone = (done ?? []).filter((c) => childIds.has(c.child_id) && c.completed_at >= weekAgo);
  const readers = new Set(weekDone.map((c) => c.child_id));
  const perChild = readers.size ? weekDone.length / readers.size : 0;

  // Extras
  const revenue30 = paid.filter((p) => p.paid_at && p.paid_at >= monthAgo).reduce((a, p) => a + p.amount_etb, 0);
  const gameMinutes = Math.round((play ?? []).filter((g) => g.child_id && childIds.has(g.child_id)).reduce((a, g) => a + g.seconds, 0) / 60);
  const newFamilies = families.filter((f) => f.created_at >= weekAgo).length;
  const top = new Map<string, number>();
  for (const c of done ?? []) if (childIds.has(c.child_id)) top.set(c.item_id, (top.get(c.item_id) ?? 0) + 1);
  const topStories = [...top.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);

  return (
    <main className="mx-auto max-w-6xl space-y-10 px-4 pb-20 pt-32 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-5xl font-black">Pilot numbers</h1>
          <p className="mt-2 text-lg text-muted">Live from the database. Admin accounts are left out. Targets from docs/ROADMAP.md.</p>
        </div>
        <Link href="/account" className="btn btn-plain !text-base">
          Grown-ups&rsquo; corner
        </Link>
      </div>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Metric
          label="Kids active 3+ days a week"
          value={`${pct(activeKids, children.length)}%`}
          target="40%"
          good={pct(activeKids, children.length) >= 40}
          hint={`${activeKids} of ${children.length} children read or played on 3 or more days in the last 7.`}
        />
        <Metric
          label="Signed-up families who pay"
          value={`${pct(payers.size, families.length)}%`}
          target="25%"
          good={pct(payers.size, families.length) >= 25}
          hint={`${payers.size} of ${families.length} families have paid at least once.`}
        />
        <Metric
          label="Month-1 renewal"
          value={due ? `${pct(renewed, due)}%` : "–"}
          target="70%"
          good={due > 0 && pct(renewed, due) >= 70}
          hint={due ? `${renewed} of ${due} families whose first payment is 30+ days old paid again.` : "No family has reached day 30 yet."}
        />
        <Metric
          label="Stories per active child per week"
          value={perChild.toFixed(1)}
          target="4"
          good={perChild >= 4}
          hint={`${weekDone.length} stories finished by ${readers.size} children in the last 7 days.`}
        />
      </section>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Paying now" value={String(payingNow)} hint="Families with a plan open today." />
        <Metric label="Revenue, last 30 days" value={`${formatBirr(revenue30)}`} hint="Birr, from confirmed Chapa payments." />
        <Metric label="New families this week" value={String(newFamilies)} hint="Accounts created in the last 7 days." />
        <Metric label="Game minutes this week" value={String(gameMinutes)} hint="All children together." />
      </section>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label={`🎁 ${t.gift.stats.sold}`} value={String(giftsSold)} hint={t.gift.stats.soldHint(giftsSold - giftsRedeemed)} />
        <Metric label={t.gift.stats.redeemed} value={String(giftsRedeemed)} hint={t.gift.stats.redeemedHint} />
        <Metric label={t.gift.stats.revenue} value={formatBirr(giftRevenue)} hint={t.gift.stats.revenueHint} />
        <Link href="/admin/gifts" className="grid place-items-center rounded-[28px] bg-white p-6 text-center font-display text-xl font-black text-blue shadow-[0_6px_0_var(--color-line)] transition hover:-translate-y-1">
          {t.gift.stats.list} →
        </Link>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" data-stats-schools="">
        <Metric
          label="Schools with a licence open"
          value={String(schools?.open ?? 0)}
          hint={schools?.ready ? `${schools.schools} schools in all, ${schools.teachers} teachers, ${schools.classes} classes.` : "Migration 0015 isn't applied yet."}
        />
        <Metric label="Pupils" value={String(schools?.pupils ?? 0)} hint="Children in school classes (first names only)." />
        <Metric label="Pupils active this week" value={String(schools?.activePupils ?? 0)} hint="Signed in on a class tablet or finished a story in the last 7 days." />
        <Link href="/admin/schools" className="grid place-items-center rounded-[28px] bg-white p-6 text-center font-display text-xl font-black text-blue shadow-[0_6px_0_var(--color-line)] transition hover:-translate-y-1">
          Schools → <span className="mt-1 block text-sm font-bold text-muted">{schools?.storiesThisWeek ?? 0} class stories finished this week</span>
        </Link>
      </section>

      <section className="space-y-3 rounded-[28px] bg-white p-6 shadow-[0_6px_0_var(--color-line)]">
        <h2 className="font-display text-2xl font-black">Most-finished stories, last 30 days</h2>
        {topStories.length ? (
          <ol className="space-y-1.5">
            {topStories.map(([id, n], i) => (
              <li key={id} className="flex justify-between gap-4">
                <span>
                  {i + 1}. {getStory(id)?.title.en ?? id}
                </span>
                <b className="tabular-nums">{n}</b>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-muted">No stories finished yet.</p>
        )}
      </section>
    </main>
  );
}

export default function StatsPage() {
  return (
    <>
      <SiteNav />
      <Suspense fallback={<main className="grid min-h-dvh place-items-center text-muted">Loading…</main>}>
        <StatsContent />
      </Suspense>
    </>
  );
}
