"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { Bee } from "@/components/characters";
import { confetti } from "@/lib/confetti";
import { useT } from "@/i18n/provider";
import { saveScore, startGame, tickGame, type GameStart } from "./actions";

const TICK_S = 15;

/**
 * Runs a game in a sealed-off frame: no pop-ups, no leaving Lali, no access to the family's
 * account. Counts play time only while the game is on screen, and closes it when today's time is up.
 */
export function GamePlayer({ slug, url, title, color }: { slug: string; url: string; title: string; color: string }) {
  const t = useT();
  const [state, setState] = useState<GameStart | null>(null);
  const [left, setLeft] = useState<number | null>(null);
  const session = useRef<string | null>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const shell = useRef<HTMLDivElement>(null);
  // Games on Lali's own site run without same-origin rights; outside games keep their own origin.
  const external = url.startsWith("https://");
  const origin = external ? new URL(url).origin : null;

  useEffect(() => {
    let alive = true;
    startGame(slug).then((s) => {
      if (!alive) return;
      setState(s);
      if (s.ok) {
        session.current = s.sessionId;
        setLeft(s.secondsLeft);
      }
    });
    return () => {
      alive = false;
    };
  }, [slug]);

  const timeUp = left !== null && left <= 0;

  // Count time in steps while the page is visible.
  useEffect(() => {
    if (!state?.ok || !session.current || timeUp) return;
    let last = Date.now();
    const t = setInterval(() => {
      const now = Date.now();
      const spent = (now - last) / 1000;
      last = now;
      if (document.visibilityState !== "visible" || !session.current) return;
      setLeft((l) => (l === null ? l : l - spent));
      tickGame(session.current, spent).then((s) => {
        if (s !== null) setLeft(s);
      });
    }, TICK_S * 1000);
    return () => clearInterval(t);
  }, [state, timeUp]);

  // Messages from the game: { type: "lali:score", score } and { type: "lali:finished" }.
  const onMessage = useCallback(
    (e: MessageEvent) => {
      if (e.source !== frame.current?.contentWindow) return;
      if (origin && e.origin !== origin) return;
      const msg = e.data as { type?: string; score?: number } | null;
      if (msg?.type === "lali:score" && typeof msg.score === "number" && session.current) saveScore(session.current, msg.score);
      if (msg?.type === "lali:finished") confetti(0.5);
    },
    [origin],
  );
  useEffect(() => {
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [onMessage]);

  if (!state) return <div className="aspect-video w-full animate-pulse rounded-[28px] bg-white" />;

  if (!state.ok || timeUp) {
    const reason = state.ok ? "time-up" : state.reason;
    const text: Record<string, string> = { "time-up": t.games.timeUp, off: t.games.turnedOff, locked: t.games.lockedFamily, missing: t.games.missing };
    return (
      <div className="mx-auto max-w-xl space-y-5 rounded-[32px] bg-night p-10 text-center text-white">
        <div className="mx-auto w-fit animate-float">
          <Bee size={80} />
        </div>
        <p className="font-display text-3xl font-black">{text[reason]}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/stories" className="btn btn-primary">
            {t.games.readStory}
          </Link>
          {reason === "locked" && (
            <Link href="/subscribe?plan=learner" className="btn btn-plain">
              {t.shelf.seePlans}
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-black">{title}</h1>
        <div className="flex items-center gap-3">
          {left !== null && (
            <span className="rounded-full bg-white px-4 py-2 font-bold tabular-nums shadow-[0_3px_0_var(--color-line)]">
              {t.games.minLeft(Math.max(0, Math.ceil(left / 60)))}
            </span>
          )}
          <button type="button" className="btn btn-plain !py-2 !text-base" onClick={() => shell.current?.requestFullscreen?.()}>
            {t.games.fullScreen}
          </button>
        </div>
      </div>
      <div ref={shell} className="overflow-hidden rounded-[28px] shadow-[0_8px_0_var(--color-line)]" style={{ background: color }}>
        <iframe
          ref={frame}
          src={url}
          title={title}
          className="aspect-[4/3] w-full border-0 sm:aspect-video"
          sandbox={external ? "allow-scripts allow-same-origin allow-pointer-lock" : "allow-scripts allow-pointer-lock"}
          allow="autoplay; fullscreen; gamepad"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}
