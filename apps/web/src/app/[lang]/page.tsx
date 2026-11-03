import { Hero } from "@/components/home/hero";
import { FeedVsBook, GetTheApp, Marquee, ParentReport, Plans, SectionHead, StarGame, Watch, Worlds } from "@/components/home/sections";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { StoryBook } from "@/components/storybook";
import { STORIES } from "@/content/stories";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Marquee />
        <section id="try" className="scroll-mt-24 bg-[radial-gradient(ellipse_at_top,var(--color-sky-soft),var(--color-bg)_65%)] px-4 py-28 sm:px-6">
          <div className="mx-auto max-w-6xl xl:px-6">
            <SectionHead
              eyebrow="Try a page"
              title="A real book, on any screen"
              sub="Turn the pages, tap any word to hear it, or press Read to me and watch the words light up. Switch to Amharic with one tap."
            />
          </div>
          <StoryBook story={STORIES[0]} compact />
        </section>
        <Worlds />
        <StarGame />
        <FeedVsBook />
        <ParentReport />
        <Watch />
        <Plans />
        <GetTheApp />
      </main>
      <SiteFooter />
    </>
  );
}
