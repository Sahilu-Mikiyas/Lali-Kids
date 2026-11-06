import { Cinema } from "@/components/home/cinema";
import { FollowBee } from "@/components/home/follow-bee";
import { Hero } from "@/components/home/hero";
import { Bedtime, DayWalk } from "@/components/home/journey";
import { HomeMotion } from "@/components/home/live";
import { MusicPlayer } from "@/components/home/music-player";
import { FeedVsBook, Marquee, ParentReport, Plans, SectionHead, StarGame, Worlds } from "@/components/home/sections";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { StoryBook } from "@/components/storybook";
import { STORIES } from "@/content/stories";
import { getT } from "@/i18n/server";

export default async function Home() {
  const t = await getT();
  return (
    <HomeMotion>
      <SiteNav />
      {/* Things that slide in from the sides must not widen the page on phones. */}
      <main className="overflow-x-clip">
        <Hero />
        <Marquee />
        <section id="try" data-bee="try" className="scroll-mt-24 bg-[radial-gradient(ellipse_at_top,var(--color-sky-soft),var(--color-bg)_65%)] px-4 pb-16 pt-28 sm:px-6">
          <div className="mx-auto max-w-6xl xl:px-6">
            <SectionHead eyebrow={t.home.try.eyebrow} title={t.home.try.title} sub={t.home.try.sub} />
          </div>
          <StoryBook story={STORIES[0]} compact />
        </section>
        <DayWalk phase="morning" />
        <Worlds />
        <StarGame />
        <FeedVsBook />
        <ParentReport />
        <DayWalk phase="afternoon" above="#ffffff" />
        <Cinema />
        <Plans />
        <Bedtime />
      </main>
      <SiteFooter />
      <FollowBee />
      <MusicPlayer />
    </HomeMotion>
  );
}
