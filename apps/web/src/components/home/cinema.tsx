"use client";

import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { FEATURED_VIDEOS, SOCIAL, type FeaturedVideo, type SocialNetwork } from "@/content/links";
import { STORIES } from "@/content/stories";
import { useLang, useT } from "@/i18n/provider";
import { duckMusic } from "@/lib/music/synth";

import { Scene } from "../scenes";
import { SOCIAL_LABEL, SocialIcon } from "../social-icons";
import { Buddy } from "./buddies";
import { useAwake } from "./live";
import { SectionHead } from "./sections";

/*
  The videos section as a little cinema: red curtains that open as it scrolls into view,
  twinkling bulbs round a TV-like screen, a playlist row of cards that tilt and bounce,
  and Anbessa and Gugu watching from the front row.

  Videos play right here on the big screen (youtube-nocookie.com, no related videos from
  other channels). Nothing from YouTube loads until a video is tapped, except the thumbnails.
  If the video can't be reached (no internet, a blocked network), the screen shows a friendly
  message instead of a broken box.
*/

type Screen = "idle" | "loading" | "playing" | "failed";

const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const embed = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

/** A thumbnail that turns into a drawn card if the picture can't load. */
function Thumb({ id, title, big = false, className = "" }: { id: string; title: string; big?: boolean; className?: string }) {
  const t = useT();
  const [broken, setBroken] = useState(false);
  if (broken && big) {
    return (
      <span className={`block bg-[radial-gradient(120%_90%_at_30%_20%,#5B4FD6,#2F5BD3_40%,#D63B72)] ${className}`}>
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 px-4 pb-3 pt-10 text-left font-display text-lg font-extrabold text-white sm:text-2xl">{title}</span>
      </span>
    );
  }
  if (broken) {
    return (
      <span className={`grid place-items-center bg-[linear-gradient(135deg,#2F5BD3,#D63B72)] p-3 text-center text-white ${className}`}>
        <span className="space-y-1">
          <svg viewBox="0 0 24 24" className="mx-auto h-8 w-8" aria-hidden>
            <rect x={3} y={6} width={18} height={13} rx={3} fill="#fff" fillOpacity={0.25} />
            <path d="M10 9.5 L15 12.5 L10 15.5Z" fill="#fff" />
          </svg>
          <span className="block font-display text-sm font-extrabold leading-tight">{title || t.home.cinema.noPicture}</span>
        </span>
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- YouTube thumbnails are external and change per video
    <img src={thumb(id)} alt="" loading="lazy" decoding="async" onError={() => setBroken(true)} className={`object-cover ${className}`} />
  );
}

/** Checks that YouTube's player can be reached at all, so a blocked network shows our message. */
async function reachable(id: string, ms = 8000): Promise<boolean> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    await fetch(embed(id), { mode: "no-cors", cache: "no-store", signal: ctrl.signal, credentials: "omit" });
    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

function Bulbs({ n, className }: { n: number; className: string }) {
  return (
    <div className={`pointer-events-none absolute flex justify-between ${className}`} aria-hidden>
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className="home-bulb h-2.5 w-2.5 rounded-full bg-[#FFE27A] shadow-[0_0_10px_#FFD54A]" style={{ animationDelay: `${(i % 2) * -0.6}s` }} />
      ))}
    </div>
  );
}

function Curtain({ side, open }: { side: "left" | "right"; open: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={{ scaleX: open ? 0.14 : 1 }}
      transition={{ type: "spring", stiffness: 40, damping: 14, mass: 1.2 }}
      className={`pointer-events-none absolute inset-y-0 z-20 w-1/2 ${side === "left" ? "left-0 origin-left" : "right-0 origin-right"}`}
      style={{
        background:
          "repeating-linear-gradient(90deg,#B3263A 0 22px,#D23A4C 22px 34px,#9A1E31 34px 50px), linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.3))",
        backgroundBlendMode: "normal",
        boxShadow: side === "left" ? "inset -12px 0 24px rgba(0,0,0,.35)" : "inset 12px 0 24px rgba(0,0,0,.35)",
      }}
      aria-hidden
    />
  );
}

function PlaylistCard({ video, active, index, onPick }: { video: FeaturedVideo; active: boolean; index: number; onPick: () => void }) {
  const t = useT();
  const lang = useLang();
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const ry = useSpring(useTransform(mx, [0, 1], [-14, 14]), { stiffness: 220, damping: 16 });
  const title = video.title[lang];
  return (
    <motion.li
      initial={{ opacity: 0, y: 40, rotate: index % 2 ? 6 : -6 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 260, damping: 13, delay: index * 0.07 }}
      className="w-[46%] shrink-0 snap-start sm:w-[30%] lg:w-[19%]"
    >
      <motion.button
        type="button"
        onClick={onPick}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
        }}
        onPointerLeave={() => mx.set(0.5)}
        whileHover={reduce ? undefined : { y: -8, scale: 1.04 }}
        whileTap={reduce ? undefined : { scale: 0.9, rotate: -3 }}
        style={reduce ? undefined : { rotateY: ry, transformPerspective: 700 }}
        aria-label={t.home.cinema.play(title)}
        aria-current={active || undefined}
        className={`group block w-full overflow-hidden rounded-2xl bg-white text-left shadow-[0_5px_0_rgba(0,0,0,.25)] ring-4 transition-[box-shadow] ${active ? "ring-gold" : "ring-transparent"}`}
      >
        <span className="relative block aspect-video bg-[#1B2A4E]">
          <Thumb id={video.id} title={title} className="absolute inset-0 h-full w-full" />
          <span className="absolute bottom-1.5 right-1.5 grid h-8 w-8 place-items-center rounded-full bg-coral shadow transition group-hover:scale-110" aria-hidden>
            <svg viewBox="0 0 24 24" className="h-4 w-4">
              <path d="M8 5 L19 12 L8 19Z" fill="#fff" />
            </svg>
          </span>
          {active && <span className="absolute left-1.5 top-1.5 rounded-full bg-gold px-2 py-0.5 text-[11px] font-black text-[#2A1A00]">▶</span>}
        </span>
        <span className="line-clamp-2 block min-h-[3.2em] px-2.5 py-2 text-sm font-bold leading-snug text-ink">{title}</span>
      </motion.button>
    </motion.li>
  );
}

function Popcorn() {
  return (
    <svg viewBox="0 0 40 48" className="w-full" aria-hidden>
      <g fill="#FFF6DA">
        <circle cx={12} cy={12} r={7} />
        <circle cx={22} cy={8} r={8} />
        <circle cx={30} cy={13} r={6} />
        <circle cx={18} cy={16} r={6} />
      </g>
      <path d="M6 16 H34 L30 46 H10Z" fill="#E8513B" />
      <path d="M13 16 L15 46 M20 16 V46 M27 16 L25 46" stroke="#fff" strokeWidth={3} />
    </svg>
  );
}

function Stage() {
  const t = useT();
  const lang = useLang();
  const videos = FEATURED_VIDEOS;
  const [current, setCurrent] = useState(0);
  const [screen, setScreen] = useState<Screen>("idle");
  const [run, setRun] = useState(0);
  const attempt = useRef(0);
  const loaded = useRef(false);
  const ok = useRef<boolean | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const seen = useInView(stageRef, { once: true, margin: "-120px" });
  const video = videos[current];
  const title = video.title[lang];

  const settle = useCallback(() => {
    if (ok.current === false) setScreen("failed");
    else if (ok.current === true && loaded.current) setScreen("playing");
  }, []);

  const play = useCallback(
    (i: number) => {
      const n = ++attempt.current;
      setRun(n);
      setCurrent(i);
      setScreen("loading");
      loaded.current = false;
      ok.current = null;
      duckMusic("video", true);
      void reachable(videos[i].id).then((yes) => {
        if (n !== attempt.current) return;
        ok.current = yes;
        settle();
      });
    },
    [videos, settle],
  );

  // If neither the player nor the check answers in time, say so kindly.
  useEffect(() => {
    if (screen !== "loading") return;
    const n = attempt.current;
    const timer = setTimeout(() => {
      if (n === attempt.current && !loaded.current) setScreen("failed");
    }, 15000);
    return () => clearTimeout(timer);
  }, [screen]);

  const stop = () => {
    attempt.current++;
    setScreen("idle");
    duckMusic("video", false);
  };
  useEffect(() => () => duckMusic("video", false), []);

  const showPlayer = screen === "loading" || screen === "playing";
  const watching = screen === "playing";

  return (
    <div data-music-quiet>
      <div ref={stageRef} className="relative overflow-hidden rounded-[36px] bg-[radial-gradient(120%_80%_at_50%_0%,#4A2A6E,#22163F_70%)] px-3 pb-24 pt-10 shadow-[0_10px_0_rgba(27,42,78,.15)] sm:px-10 sm:pb-28 sm:pt-14">
        {/* the curtains and the scalloped pelmet above them */}
        <Curtain side="left" open={seen} />
        <Curtain side="right" open={seen} />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-30 h-8 bg-[radial-gradient(circle_at_50%_0,#8E1B2D_70%,transparent_72%)] bg-[length:48px_32px] bg-repeat-x sm:h-10 sm:bg-[length:64px_40px]"
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-3xl">
          {/* the screen, in a chunky TV frame with marquee bulbs */}
          <div className="relative rounded-[28px] bg-[#1A1230] p-3 shadow-[0_0_0_6px_#F5B21E,0_0_0_12px_#C98A0A,0_20px_40px_rgba(0,0,0,.45)] sm:p-4">
            <Bulbs n={12} className="-top-[22px] left-6 right-6" />
            <Bulbs n={12} className="-bottom-[22px] left-6 right-6" />
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
              {showPlayer && (
                <iframe
                  key={`${video.id}-${run}`}
                  src={embed(video.id)}
                  title={title}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  onLoad={() => {
                    loaded.current = true;
                    settle();
                  }}
                  className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${screen === "playing" ? "opacity-100" : "opacity-0"}`}
                />
              )}
              <AnimatePresence mode="wait">
                {screen === "idle" && (
                  <motion.button
                    key={`idle-${video.id}`}
                    type="button"
                    onClick={() => play(current)}
                    aria-label={t.home.cinema.play(title)}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="group absolute inset-0"
                  >
                    <Thumb id={video.id} title={title} big className="absolute inset-0 h-full w-full" />
                    <span className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,.45))]" />
                    <span className="home-pulse absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-coral shadow-[0_6px_0_var(--color-coral-deep)] transition group-hover:scale-110 sm:h-24 sm:w-24">
                      <svg viewBox="0 0 24 24" className="h-9 w-9 translate-x-0.5" aria-hidden>
                        <path d="M8 5 L19 12 L8 19Z" fill="#fff" />
                      </svg>
                    </span>
                  </motion.button>
                )}
                {screen === "loading" && (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 grid place-items-center bg-[#140E26] text-white" role="status">
                    <div className="space-y-3 text-center">
                      <div className="mx-auto flex justify-center gap-2" aria-hidden>
                        {[0, 1, 2].map((i) => (
                          <span key={i} className="home-dot h-4 w-4 rounded-full bg-gold" style={{ animationDelay: `${i * 0.15}s` }} />
                        ))}
                      </div>
                      <p className="font-display text-lg font-extrabold">{t.home.cinema.loading}</p>
                    </div>
                  </motion.div>
                )}
                {screen === "failed" && (
                  <motion.div
                    key="failed"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="home-static absolute inset-0 grid place-items-center p-4 text-center text-white"
                    role="alert"
                  >
                    <div className="max-w-sm space-y-2 sm:space-y-3">
                      <svg viewBox="0 0 64 48" className="mx-auto h-10 w-14 sm:h-14 sm:w-20" aria-hidden>
                        <rect x={4} y={8} width={56} height={36} rx={8} fill="#F5B21E" />
                        <rect x={10} y={14} width={44} height={24} rx={4} fill="#2A1E4A" />
                        <path d="M24 2 L32 8 L40 2" stroke="#F5B21E" strokeWidth={3} fill="none" strokeLinecap="round" />
                        <path d="M22 24 q3 -3 6 0 M36 24 q3 -3 6 0" stroke="#fff" strokeWidth={2.4} fill="none" strokeLinecap="round" />
                        <path d="M27 32 q5 -4 10 0" stroke="#fff" strokeWidth={2.4} fill="none" strokeLinecap="round" />
                      </svg>
                      <p className="font-display text-lg font-black leading-tight sm:text-2xl">{t.home.cinema.fallbackTitle}</p>
                      <p className="hidden text-white/80 sm:block">{t.home.cinema.fallbackSub}</p>
                      <div className="flex justify-center gap-2 pt-1">
                        <button type="button" onClick={() => play(current)} className="btn btn-primary !px-4 !py-2 !text-base">
                          {t.home.cinema.retry}
                        </button>
                        <button type="button" onClick={stop} className="btn btn-plain !px-4 !py-2 !text-base">
                          {t.home.cinema.close}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {showPlayer && (
                <button
                  type="button"
                  onClick={stop}
                  aria-label={t.home.cinema.close}
                  title={t.home.cinema.close}
                  className="absolute right-2 top-2 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-xl font-black text-white transition hover:bg-black/80"
                >
                  ×
                </button>
              )}
            </div>
          </div>
          <p className="mx-auto mt-9 max-w-[80%] text-center font-display text-base font-extrabold text-white sm:text-xl">
            <span className="mr-2 rounded-full bg-gold px-2.5 py-0.5 text-sm text-[#2A1A00]">{t.home.cinema.nowShowing}</span>
            {title}
            {video.channel && <span className="ml-2 text-sm font-bold text-white/60">· {video.channel}</span>}
          </p>
        </div>

        {/* the audience */}
        <div className={`absolute bottom-0 left-[3%] z-10 w-[92px] sm:left-[6%] sm:w-[130px] ${watching ? "home-bop" : ""}`}>
          <Buddy who="cub" pose="sit" look={2} />
          <div className="absolute -right-5 bottom-3 w-9 sm:w-11">
            <Popcorn />
          </div>
        </div>
        <div className={`absolute bottom-0 right-[3%] z-10 w-[84px] sm:right-[6%] sm:w-[118px] ${watching ? "home-bop" : ""}`} style={{ animationDelay: "-0.3s" }}>
          <Buddy who="gugu" pose="sit" bubbleSide="left" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-6 bg-[#160E2C]" aria-hidden />
      </div>

      {/* the playlist */}
      <div className="mt-8">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <p className="font-display text-xl font-black">{t.home.cinema.playlist}</p>
          {videos.some((v) => v.sample) && (
            <span className="rounded-full border-2 border-dashed border-coral/60 bg-white px-3 py-0.5 text-sm font-extrabold text-coral">{t.home.cinema.samples}</span>
          )}
        </div>
        <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 pt-2 [scrollbar-width:thin] sm:mx-0 sm:px-1">
          {videos.map((v, i) => (
            <PlaylistCard key={v.id} video={v} index={i} active={i === current && screen !== "idle"} onPick={() => play(i)} />
          ))}
        </ul>
        {videos.some((v) => v.sample) && <p className="max-w-2xl text-sm text-muted">{t.home.cinema.samplesNote}</p>}
      </div>
    </div>
  );
}

/** Before there are any videos: "coming soon" cards made from the story pictures. */
function ComingSoon() {
  const t = useT();
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {STORIES.map((s, i) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="overflow-hidden rounded-3xl bg-white shadow-[0_6px_0_var(--color-line)]"
        >
          <div className="relative aspect-video" style={{ background: s.color }}>
            <Scene kind={s.scene ?? "moon"} page={i % s.pages.length} />
            <span className="absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1 text-sm font-bold text-white">{t.watch.coming}</span>
          </div>
          <p className="p-4 font-bold">{s.title.en}</p>
        </motion.div>
      ))}
    </div>
  );
}

export function Cinema() {
  const t = useT();
  const ref = useAwake<HTMLElement>();
  const networks = Object.keys(SOCIAL) as SocialNetwork[];
  const anyLive = networks.some((n) => SOCIAL[n]);
  return (
    <section ref={ref} id="watch" data-bee="watch" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24">
      <SectionHead eyebrow={t.watch.eyebrow} title={t.watch.title} sub={t.watch.sub} />
      {FEATURED_VIDEOS.length ? <Stage /> : <ComingSoon />}
      <div className="mt-10 flex flex-wrap items-center gap-6 rounded-[32px] bg-white p-7">
        <div className="min-w-60 flex-1">
          <p className="font-display text-2xl font-black">{t.watch.follow}</p>
          <p className="text-muted">{anyLive ? t.watch.live : t.watch.soon}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {networks.map((n) => {
            const url = SOCIAL[n];
            const chip = (
              <span className={`flex items-center gap-2 rounded-full border-2 border-line px-4 py-2 font-bold transition ${url ? "hover:-translate-y-1 hover:border-ink" : "opacity-50"}`}>
                <SocialIcon network={n} size={26} />
                {SOCIAL_LABEL[n]}
              </span>
            );
            return url ? (
              <a key={n} href={url} target="_blank" rel="noopener" aria-label={t.watch.on(SOCIAL_LABEL[n])}>
                {chip}
              </a>
            ) : (
              <span key={n} aria-label={t.watch.soonOn(SOCIAL_LABEL[n])}>
                {chip}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
