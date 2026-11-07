import type { Metadata } from "next";
import Link from "next/link";

import { BeeShape, CubShape, GuguShape } from "@/components/characters";
import { GiftHero } from "@/components/gift/hero";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { getT } from "@/i18n/server";
import { GiftForm } from "./gift-form";

export const metadata: Metadata = {
  title: "Give Lali as a gift",
  description: "Give a child in Ethiopia the gift of reading: a Lali plan of read-along stories in English and Amharic, paid from anywhere.",
};

const STEP_ART = [
  <svg key="a" viewBox="0 0 40 40" className="h-16 w-16" aria-hidden>
    <BeeShape />
  </svg>,
  <svg key="b" viewBox="0 0 200 240" className="h-16 w-14" aria-hidden>
    <GuguShape pose="point" />
  </svg>,
  <svg key="c" viewBox="0 0 200 240" className="h-16 w-14" aria-hidden>
    <CubShape pose="sit" mood="joy" />
  </svg>,
];

/** Public: anyone can give a Lali plan, no account needed. */
export default async function GiftPage() {
  const t = await getT();
  const g = t.gift.page;
  return (
    <>
      <SiteNav />
      <GiftHero eyebrow={g.eyebrow} title={g.title} sub={g.sub} />
      <main className="mx-auto max-w-6xl px-4 sm:px-6">
        <ol className="-mt-2 grid gap-4 pt-10 sm:grid-cols-3">
          {g.steps.map((s, i) => (
            <li key={s.title} className="flex items-center gap-4 rounded-[26px] bg-white p-5 shadow-[0_6px_0_var(--color-line)]">
              <span className="shrink-0">{STEP_ART[i]}</span>
              <span>
                <span className="block font-display text-lg font-black">
                  {i + 1}. {s.title}
                </span>
                <span className="text-muted">{s.body}</span>
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-14">
          <GiftForm />
        </div>

        <p className="mt-12 text-center text-lg">
          {g.haveCode}{" "}
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
