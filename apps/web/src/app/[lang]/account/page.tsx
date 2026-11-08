import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { ChooseNext } from "@/components/courses/course-actions";
import { familyCourses } from "@/lib/courses/server";
import { planForChildren } from "@/lib/entitlements";
import { loadFamily, roomForChild } from "@/lib/family";
import { fmtDate } from "@/i18n/format";
import { LangSwitch } from "@/i18n/lang-switch";
import { getLang, getT } from "@/i18n/server";
import { formatBirr } from "@/lib/payments/plans";
import { familyPlan } from "@/lib/payments/subscription";
import { telegramConfigured } from "@/lib/telegram";
import { createSupabaseServer } from "@/lib/supabase/server";
import { GrownUpsGate } from "./gate";
import { AddChildForm, DeleteAccount, AllAgesToggle, ChildCard, GamesPicker, LimitPicker, TelegramConnect } from "./controls";
import { allowMoreTonight } from "./actions";
import { FamilyVoicesCard, FindHintsCard } from "./family-voices";
import { stickerStories } from "@/lib/stickers/server";
import { MicListenSetting } from "@/components/mic-listen-setting";
import { micListenSetting } from "@/lib/read-aloud/server";

export const metadata: Metadata = { title: "Grown-ups' corner" };

function weekAgoIso() {
  return new Date(Date.now() - 7 * 86400_000).toISOString();
}

async function AccountContent() {
  await connection();
  const family = await loadFamily();
  if (!family) redirect("/login?next=/account");
  const [t, lang] = await Promise.all([getT(), getLang()]);
  const planName = (id: string) => t.plans.names[id as keyof typeof t.plans.names] ?? id;

  const supabase = await createSupabaseServer();
  const weekAgo = weekAgoIso();
  const ids = family.children.map((c) => c.id);
  const [plan, { data: recent }, { data: payments }, { data: tg }] = await Promise.all([
    familyPlan(family.profile.id),
    ids.length ? supabase.from("completions").select("child_id, item_id, completed_at").in("child_id", ids).gte("completed_at", weekAgo) : Promise.resolve({ data: [] as { child_id: string; item_id: string; completed_at: string }[] }),
    supabase
      .from("payments")
      .select("tx_ref, plan_id, amount_etb, kind, provider_ref, paid_at")
      .eq("family_id", family.profile.id)
      .eq("status", "paid")
      .order("paid_at", { ascending: false })
      .limit(12),
    supabase.from("profiles").select("telegram_chat_id").eq("id", family.profile.id).single(),
  ]);
  const [stickerList, micListen, coursesByChild] = await Promise.all([
    stickerStories(family.profile.id),
    micListenSetting(supabase, family.profile.id).catch(() => null),
    familyCourses(family).catch(() => ({}) as Awaited<ReturnType<typeof familyCourses>>),
  ]);
  const storyTitles = Object.fromEntries(stickerList.map((s) => [s.id, s.title]));
  const weekByChild = new Map<string, number>();
  for (const r of recent ?? []) weekByChild.set(r.child_id, (weekByChild.get(r.child_id) ?? 0) + 1);

  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-5xl px-4 pt-32 sm:px-6">
        <GrownUpsGate>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-5xl font-black">{t.account.title}</h1>
              <p className="mt-2 text-lg text-muted">{t.account.signedInAs(family.profile.email ?? "")}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {(family.profile.role === "teacher" || family.profile.role === "admin") && (
                <Link href="/teach" className="btn btn-plain !text-base" data-teach-link="">
                  {t.teach.title}
                </Link>
              )}
              {family.profile.role === "admin" && (
                <>
                  <Link href="/admin/stats" className="btn btn-plain !text-base">
                    Pilot numbers
                  </Link>
                  <Link href="/admin/schools" className="btn btn-plain !text-base">
                    Schools
                  </Link>
                  <Link href="/admin/stories" className="btn btn-plain !text-base">
                    {t.account.storyStudio}
                  </Link>
                  <Link href="/admin/narration" className="btn btn-plain !text-base">
                    {t.account.narrationAdmin}
                  </Link>
                  <Link href="/admin/games" className="btn btn-plain !text-base">
                    {t.account.gamesAdmin}
                  </Link>
                  <Link href="/admin/books" className="btn btn-plain !text-base">
                    {t.account.books}
                  </Link>
                </>
              )}
              <form action="/auth/signout" method="post">
                <button type="submit" className="font-bold text-muted hover:text-ink">
                  {t.account.signOut}
                </button>
              </form>
            </div>
          </div>

          <section className="mt-10 space-y-4">
            <h2 className="font-display text-2xl font-black">{t.account.children}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {family.children.map((c) => (
                <ChildCard key={c.id} child={c} thisWeek={weekByChild.get(c.id) ?? 0} current={family.current?.id === c.id} />
              ))}
              {roomForChild(family) ? (
                <AddChildForm />
              ) : (
                <div className="space-y-3 rounded-[28px] border-2 border-dashed border-line p-5" data-child-limit={family.entitlements.maxChildren}>
                  <p className="font-display text-xl font-black">{t.account.addChild}</p>
                  <p className="text-muted">{t.gates.childLimit(family.entitlements.maxChildren)}</p>
                  {family.entitlements.maxChildren < 4 && (
                    <Link href={`/subscribe?plan=${planForChildren(family.children.length + 1)}`} className="btn btn-primary !text-base">
                      {t.gates.upgrade(t.plans.names[planForChildren(family.children.length + 1)])}
                    </Link>
                  )}
                </div>
              )}
            </div>
          </section>

          {family.children.length > 0 && (
            <section className="mt-10 space-y-4" data-corner-courses="">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl font-black">{t.courses.cornerTitle}</h2>
                  <p className="text-muted">{family.entitlements.allCourses ? t.courses.cornerSubVip : t.courses.cornerSub}</p>
                </div>
                <Link href="/courses" className="btn btn-plain !text-base">
                  {t.courses.browse}
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {family.children
                  .filter((c) => !c.readOnly)
                  .map((c) => {
                    const list = coursesByChild[c.id] ?? [];
                    const busy = list.some((x) => !x.completedAt && x.access === "vip");
                    return (
                      <div key={c.id} className="space-y-3 rounded-[28px] bg-white p-5 shadow-[0_6px_0_var(--color-line)]" data-child-courses={c.id}>
                        <p className="font-display text-xl font-black">{c.name}</p>
                        {list.length ? (
                          <ul className="space-y-2.5">
                            {list.map((x) => (
                              <li key={x.courseId} className="rounded-2xl border-2 border-line p-3" data-child-course={x.courseId}>
                                <Link href={`/courses/${x.courseId}`} className="flex items-center gap-2 font-bold hover:underline">
                                  <span className="h-3.5 w-3.5 shrink-0 rounded-full" style={{ background: x.color }} aria-hidden />
                                  {x.title[lang]}
                                </Link>
                                <p className="mt-1 text-sm text-muted">
                                  {x.completedAt ? t.courses.completedOn(fmtDate(lang, x.completedAt)) : t.courses.levelOf(Math.min(x.level + 1, x.levels), x.levels)}
                                  {x.opensAt && !x.completedAt && ` · ${t.courses.opensShort(fmtDate(lang, x.opensAt))}`}
                                </p>
                                {x.scores.length > 0 && (
                                  <p className="mt-1 text-sm" data-quiz-scores="">
                                    {x.scores.map((s) => t.courses.scoreLine(s.label === "final" ? t.courses.finalShort : t.courses.levelShort(Number(s.label)), s.score, s.total)).join(" · ")}
                                  </p>
                                )}
                                {x.completedAt && (
                                  <Link href={`/courses/${x.courseId}/certificate?child=${c.id}`} className="mt-1 inline-block text-sm font-bold text-blue hover:underline">
                                    🏆 {t.courses.seeCertificate}
                                  </Link>
                                )}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-muted">{t.courses.noneYet(c.name)}</p>
                        )}
                        {family.entitlements.allCourses && !busy && <ChooseNext childId={c.id} label={t.courses.chooseNext} />}
                      </div>
                    );
                  })}
              </div>
            </section>
          )}

          <section className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="space-y-3 rounded-[28px] bg-white p-6 shadow-[0_6px_0_var(--color-line)]">
              <h2 className="font-display text-2xl font-black">{t.account.whichStories}</h2>
              <p className="text-muted">{t.account.whichStoriesSub}</p>
              <AllAgesToggle value={family.showAllAges} />
            </div>
            <div className="space-y-3 rounded-[28px] bg-white p-6 shadow-[0_6px_0_var(--color-line)]">
              <h2 className="font-display text-2xl font-black">{t.account.gamesDay}</h2>
              <p className="text-muted">{t.account.gamesDaySub}</p>
              <GamesPicker value={family.gamesMinutes} />
            </div>

            <div className="space-y-3 rounded-[28px] bg-white p-6 shadow-[0_6px_0_var(--color-line)]">
              <h2 className="font-display text-2xl font-black">{t.account.bedtime}</h2>
              <p className="text-muted">{t.account.bedtimeSub}</p>
              <LimitPicker value={family.nightlyLimit} />
              {family.readTonight > 0 && (
                <form action={allowMoreTonight}>
                  <p className="text-sm text-muted">
                    {t.account.readTonight(family.current?.name ?? "", family.readTonight)}
                  </p>
                  <button type="submit" className="btn btn-plain mt-2 !text-base">
                    {t.account.allowMore}
                  </button>
                </form>
              )}
            </div>
            <div className="space-y-3 rounded-[28px] bg-white p-6 shadow-[0_6px_0_var(--color-line)]">
              <h2 className="font-display text-2xl font-black">{t.account.plan}</h2>
              {plan?.isOpen ? (
                <>
                  <p>
                    <b>{planName(plan.planId)}</b>
                  </p>
                  <p className="text-muted">
                    {t.account.openUntil(fmtDate(lang, plan.endsAt), plan.daysLeft)}
                  </p>
                  {plan.next && (
                    <p className="rounded-2xl bg-sky-soft p-3 text-sm">
                      {t.account.thenNext(planName(plan.next.planId), fmtDate(lang, plan.next.endsAt))}
                    </p>
                  )}
                  <Link href="/subscribe" className={`btn !text-base ${plan.daysLeft <= 5 ? "btn-primary" : "btn-plain"}`}>
                    {t.account.addDays}
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-muted">
                    {plan ? t.account.ended(planName(plan.planId)) : t.account.free}
                  </p>
                  <Link href="/subscribe" className="btn btn-primary !text-base">
                    {plan ? t.account.renew : t.account.seePlans}
                  </Link>
                </>
              )}
              <p className="border-t-2 border-dashed border-line pt-3 text-sm">
                <b>{t.gift.haveCode}</b> {t.gift.haveCodeSub}{" "}
                <Link href="/gift/redeem" className="font-bold text-blue hover:underline">
                  {t.gift.addCode}
                </Link>
              </p>
            </div>
          </section>

          <section className="mt-10 flex flex-wrap items-center gap-6 rounded-[28px] bg-white p-6 shadow-[0_6px_0_var(--color-line)]">
            <div className="min-w-0 flex-1 space-y-1">
              <h2 className="font-display text-2xl font-black">{t.account.language}</h2>
              <p className="text-muted">{t.account.languageSub}</p>
            </div>
            <LangSwitch className="btn btn-plain !text-base" />
          </section>

          <FamilyVoicesCard titles={storyTitles} />
          <FindHintsCard />
          <MicListenSetting lang={lang} serverValue={micListen} />

          {telegramConfigured() && (
            <section className="mt-10 flex flex-wrap items-center gap-6 rounded-[28px] bg-white p-6 shadow-[0_6px_0_var(--color-line)]">
              <div className="min-w-0 flex-1 space-y-1">
                <h2 className="font-display text-2xl font-black">{t.account.telegram}</h2>
                <p className="text-muted">
                  {t.account.telegramSub}
                </p>
              </div>
              <TelegramConnect connected={Boolean(tg?.telegram_chat_id)} />
            </section>
          )}

          <section className="mt-10 space-y-4">
            <h2 className="font-display text-2xl font-black">{t.account.payments}</h2>
            {payments && payments.length > 0 ? (
              <div className="overflow-x-auto rounded-[28px] bg-white p-2 shadow-[0_6px_0_var(--color-line)]">
                <table className="w-full min-w-[520px] text-left">
                  <thead className="text-sm text-muted">
                    <tr>
                      <th className="p-3">{t.account.date}</th>
                      <th className="p-3">{t.account.planCol}</th>
                      <th className="p-3">{t.account.what}</th>
                      <th className="p-3 text-right">{t.account.amount}</th>
                      <th className="p-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((p) => (
                      <tr key={p.tx_ref} className="border-t-2 border-line">
                        <td className="p-3">{p.paid_at ? fmtDate(lang, p.paid_at, "short") : ""}</td>
                        <td className="p-3 font-bold">{planName(p.plan_id)}</td>
                        <td className="p-3 text-muted">{t.account.kinds[p.kind ?? ""] ?? t.account.kinds.renew}</td>
                        <td className="p-3 text-right tabular-nums">{t.account.birr(formatBirr(p.amount_etb))}</td>
                        <td className="p-3 text-right">
                          <Link href={`/account/receipt/${p.tx_ref}`} className="font-bold text-blue hover:underline">
                            {t.account.receipt}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted">{t.account.noPayments}</p>
            )}
          </section>
          <section className="mt-10 space-y-3 rounded-[28px] border-2 border-coral/40 p-6">
            <h2 className="font-display text-2xl font-black">{t.account.deleteTitle}</h2>
            <p className="text-muted">{t.account.deleteSub}</p>
            <DeleteAccount />
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
