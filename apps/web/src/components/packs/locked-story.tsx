import Link from "next/link";

import { BookCard } from "@/components/book-card";
import type { Story } from "@/content/stories";
import { packOf, planForPack } from "@/lib/packs";
import type { PlanId } from "@/lib/payments/plans";
import type { Dict } from "@/i18n/dict";
import type { UiLang } from "@/i18n/langs";
import { PackIcon } from "./pack-icon";

/**
 * A story the family can't open yet: its cover, which pack it is in and which plan opens that
 * pack, with a button to start or upgrade (or sign in). /subscribe explains how upgrades work.
 */
export function LockedStory({ story, planId, signedIn, next, t, lang, title }: { story: Story; planId: PlanId | null; signedIn: boolean; next: string; t: Dict; lang: UiLang; title?: string }) {
  const pack = packOf(story);
  const plan = planForPack(pack);
  const planName = t.plans.names[plan];
  return (
    <div className="mx-auto grid max-w-3xl items-center gap-8 md:grid-cols-2" data-locked-story={pack}>
      <BookCard story={story} href={signedIn ? `/subscribe?plan=${plan}` : `/login?next=${encodeURIComponent(next)}`} menu={false} />
      <div className="space-y-4">
        {title && <p className="text-sm font-bold uppercase tracking-[0.12em] text-teal">{title}</p>}
        <h1 className={`font-display text-4xl font-black ${lang === "am" ? "font-ethiopic" : ""}`}>{story.title[lang]}</h1>
        <p className="flex items-center gap-3 rounded-2xl bg-white p-3 text-lg font-bold shadow-[0_4px_0_var(--color-line)]" data-pack-message="">
          <PackIcon pack={pack} size={40} />
          <span>{t.packs.inPack(t.packs.names[pack], planName)}</span>
        </p>
        {signedIn ? (
          <Link href={`/subscribe?plan=${plan}`} className="btn btn-primary" data-upgrade={plan}>
            {planId ? t.packs.upgrade(planName) : t.packs.start(planName)}
          </Link>
        ) : (
          <Link href={`/login?next=${encodeURIComponent(next)}`} className="btn btn-primary">
            {t.shelf.signIn}
          </Link>
        )}
        <p className="text-sm text-muted">{t.packs.freeTasters}</p>
      </div>
    </div>
  );
}
