"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";

import { useLang, useT } from "@/i18n/provider";
import { musicServerSnapshot, musicSnapshot, skipTune, subscribeMusic, toggleMusic, TUNES, wireMusic } from "@/lib/music/synth";

/*
  The round music button in the corner of the home page. Music only starts when it is
  tapped (or, if it was on last time, on the next tap anywhere). While it plays, a little
  label shows the tune and a button to skip to the next one.
*/

function Notes() {
  return (
    <span className="pointer-events-none absolute inset-0" aria-hidden>
      {["♪", "♫", "♪"].map((n, i) => (
        <span key={i} className="home-note absolute left-1/2 top-1 font-display text-lg font-black text-gold" style={{ animationDelay: `${i * 0.7}s`, ["--nx" as string]: `${(i - 1) * 18}px` }}>
          {n}
        </span>
      ))}
    </span>
  );
}

export function MusicPlayer() {
  const t = useT();
  const lang = useLang();
  const music = useSyncExternalStore(subscribeMusic, musicSnapshot, musicServerSnapshot);
  const [hint, setHint] = useState(false);

  useEffect(() => wireMusic(), []);

  // A friendly hint the first time, after the page has settled.
  useEffect(() => {
    if (music.known) return;
    const show = setTimeout(() => setHint(true), 2500);
    const hide = setTimeout(() => setHint(false), 11000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [music.known]);

  const tune = TUNES[music.tune];
  const title = tune.title[lang];
  const by = tune.by[lang];

  // The tune's name shows for a few seconds when it starts, then folds away to keep the
  // corner small on phones (the skip button stays). Hovering brings it back.
  const [folded, setFolded] = useState<string | null>(null);
  useEffect(() => {
    if (!music.playing) return;
    const timer = setTimeout(() => setFolded(tune.id), 7000);
    return () => clearTimeout(timer);
  }, [music.playing, tune.id]);
  const showTitle = folded !== tune.id;

  return (
    <div data-music-quiet className="fixed bottom-4 right-4 z-[60] flex items-center gap-2 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {music.playing && (
          <motion.div
            key="now"
            layout
            onPointerEnter={(e) => e.pointerType === "mouse" && setFolded(null)}
            initial={{ opacity: 0, x: 24, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 24, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className={`flex max-w-[min(15rem,calc(100vw-6.5rem))] items-center gap-1 rounded-full bg-white/95 py-1 pr-1 ${showTitle ? "pl-4" : "pl-1"} shadow-[0_4px_0_var(--color-line),0_10px_30px_-12px_rgba(27,42,78,.4)]`}
          >
            <p className={showTitle ? "min-w-0 leading-tight" : "sr-only"} aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={tune.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="block">
                  <span className="sr-only">{t.home.music.nowPlaying} </span>
                  <span className="block truncate font-display text-sm font-extrabold">{title}</span>
                  <span className="block truncate text-xs text-muted">{by}</span>
                </motion.span>
              </AnimatePresence>
            </p>
            <button
              type="button"
              onClick={skipTune}
              aria-label={t.home.music.skip}
              title={t.home.music.skip}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-ink transition hover:bg-sky-soft active:scale-90"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                <path d="M5 5.5 L14 12 L5 18.5Z M14 5.5 L23 12 L14 18.5Z" fill="currentColor" transform="translate(-2 0)" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <AnimatePresence>
          {hint && !music.known && (
            <motion.button
              type="button"
              key="hint"
              onClick={() => {
                setHint(false);
                toggleMusic();
              }}
              initial={{ opacity: 0, y: 10, scale: 0.6 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ type: "spring", stiffness: 380, damping: 18 }}
              className="home-hint absolute bottom-full right-0 mb-3 w-max max-w-48 origin-bottom-right rounded-2xl bg-ink px-4 py-2 text-left font-display text-base font-extrabold text-white shadow-lg"
            >
              {t.home.music.hint}
              <span className="absolute -bottom-1.5 right-5 h-3 w-3 rotate-45 bg-ink" aria-hidden />
            </motion.button>
          )}
        </AnimatePresence>
        <motion.button
          type="button"
          onClick={() => {
            setHint(false);
            toggleMusic();
          }}
          whileTap={{ scale: 0.88 }}
          whileHover={{ rotate: -8, scale: 1.06 }}
          aria-pressed={music.playing}
          aria-label={music.playing ? t.home.music.off : t.home.music.on}
          title={music.playing ? t.home.music.off : t.home.music.on}
          className={`relative grid h-14 w-14 place-items-center rounded-full font-display text-3xl font-black shadow-[0_5px_0_rgba(0,0,0,.18),0_12px_28px_-10px_rgba(27,42,78,.5)] transition-colors ${
            music.playing ? "bg-gold text-[#3A2400]" : "bg-white text-ink"
          }`}
        >
          {music.playing && <Notes />}
          <span className={music.playing ? "home-sway" : ""} aria-hidden>
            ♪
          </span>
          {!music.playing && music.on && <span className="absolute right-1 top-1 h-3 w-3 rounded-full bg-gold ring-2 ring-white" aria-hidden />}
          {!music.playing && !music.on && music.known && (
            <span className="absolute h-[3px] w-8 rotate-45 rounded-full bg-ink/55" aria-hidden />
          )}
        </motion.button>
      </div>
    </div>
  );
}
