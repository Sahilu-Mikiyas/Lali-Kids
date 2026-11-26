import { Cinema } from "@/components/home/cinema";
import { LazyFollowBee as FollowBee, LazyMusicPlayer as MusicPlayer } from "@/components/home/lazy";
import { Hero } from "@/components/home/hero";
import { Bedtime, DayWalk } from "@/components/home/journey";
import { HomeMotion } from "@/components/home/live";
import { ScrollBook, StillBook, type DemoPage } from "@/components/home/scroll-book";
import { FeedVsBook, Marquee, ParentReport, Plans, SectionHead, StarGame, Worlds } from "@/components/home/sections";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { STORIES, type Story } from "@/content/stories";
import { getT } from "@/i18n/server";

/*
  The scroll book's demo: eight pages of a free story (never a paid one: the e2e shelf test
  checks paid words never reach a visitor). Anbessa sets off, crosses the river step by step,
  finds the hill of flowers and comes home to Grandma. Only these pages go to the browser.
*/
const DEMO_ID = "new-year-flowers";
const DEMO_PAGES = [0, 1, 3, 4, 5, 7, 10, 11];

function demo(): { story: Story; pages: DemoPage[] } {
  const full = STORIES.find((s) => s.id === DEMO_ID && s.isFree);
  if (!full) throw new Error(`The home page's demo story ${DEMO_ID} must be a free story`);
  const story: Story = { id: full.id, title: full.title, category: full.category, ageBands: full.ageBands, color: full.color, scene: full.scene, coverPage: full.coverPage, isFree: true, pages: [] };
  return { story, pages: DEMO_PAGES.map((n) => ({ n, en: full.pages[n].en, am: full.pages[n].am })) };
}

export default async function Home() {
  const t = await getT();
  const book = demo();
  const href = `/stories/${DEMO_ID}`;
  // The book's last page invites parents in where the site bar's Start reading button goes.
  const start = "/stories";
  return (
    <HomeMotion>
      <SiteNav />
      {/* Things that slide in from the sides must not widen the page on phones. */}
      <main className="overflow-x-clip">
        <Hero />
        <Marquee />
        <section id="try" data-bee="try" className="scroll-mt-24 bg-[radial-gradient(ellipse_at_top,var(--color-sky-soft),var(--color-bg)_65%)] pb-16 pt-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 xl:px-12">
            <SectionHead eyebrow={t.home.try.eyebrow} title={t.home.try.title} sub={t.home.try.sub} />
          </div>
          <ScrollBook story={book.story} pages={book.pages} href={href} start={start} />
          <StillBook story={book.story} pages={book.pages} href={href} start={start} />
          <div id="after-book" tabIndex={-1} className="outline-none" />
        </section>
        <DayWalk phase="morning" />
        <Worlds />
        <StarGame />
        <FeedVsBook bookColor={STORIES[0].color} />
        <ParentReport />
        <DayWalk phase="afternoon" above="#ffffff" />
        <Cinema coming={STORIES.map((s) => ({ id: s.id, title: s.title.en, color: s.color, scene: s.scene, pageCount: s.pages.length }))} />
        <Plans />
        <Bedtime />
      </main>
      <SiteFooter />
      <FollowBee />
      <MusicPlayer />
    </HomeMotion>
  );
}
