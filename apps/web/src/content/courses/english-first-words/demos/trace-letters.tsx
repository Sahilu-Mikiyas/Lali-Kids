"use client";

import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import type { DemoProps } from "../../types";
import { ANDIKA, DISPLAY, Frame, Pic, say, sfx, t, type T } from "./kit";

/*
  "Trace the Letters" (level 3): a tracing pad for the English letters a to m, adapted from
  Fidel Foundations' tracer. The child picks a letter, then paints over the big (capital) letter
  and then the little one with a finger or the mouse. The letter is drawn once, unseen, in the
  Andika font (made for children learning to read: a and g are written the way children write
  them) to make a map of its strokes; as the child paints, the map fills in. When most of the
  letter is covered (70%) and most of the paint is on it (65%), it fills with color; the voice
  names the letter, and after the little one says a word that starts with it. A green dot shows where to start; the round arrow clears.
  Three letters (six traces) finish the demo; the child can carry on with more.
*/

const COPY = {
  title: { en: "Trace the Letters", am: "ፊደሎቹን በጣታችሁ ጻፉ" } satisfies T,
  howTo: { en: "Pick a letter. Paint over the big letter, then the little one!", am: "አንድ ፊደል ምረጡ። ትልቁን ፊደል፣ ከዚያ ትንሹን በጣታችሁ ቀቡ!" } satisfies T,
  pick: { en: "Pick a letter to trace:", am: "የምትጽፉትን ፊደል ምረጡ፦" } satisfies T,
  stay: { en: "Try to stay on the letter.", am: "በፊደሉ ላይ ለመቆየት ሞክሩ።" } satisfies T,
  clear: { en: "Start again", am: "እንደገና ጀምሩ" } satisfies T,
  big: { en: "Big letter", am: "ትልቅ ፊደል" } satisfies T,
  small: { en: "Little letter", am: "ትንሽ ፊደል" } satisfies T,
};

const LETTERS = "abcdefghijklm".split("");
/** A word for each letter, said when it is traced (and shown with its picture). */
const WORD: Record<string, string> = { a: "ant", b: "ball", c: "cat", d: "dog", e: "egg", f: "fish", g: "goat", h: "hat", i: "insect", j: "jug", k: "kite", l: "lion", m: "moon" };
const COLORS = ["#E8513B", "#E58A00", "#1F8A8A", "#6A4BB6", "#2E9A5B", "#2F6FD0"];
const NEED = 3;

const SIZE = 300;
const STEP = 5;
const BRUSH = 26;

type Map = { target: Uint8Array; zone: Uint8Array; cols: number; total: number; start: [number, number] };

function fontFamily(): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue("--font-andika").trim();
  return v || "Andika, sans-serif";
}
const glyphFont = () => `700 220px ${fontFamily()}`;

/** Where the letter sits: capitals and small letters share one baseline, so each looks its own size. */
const BASE_Y = 226;

function mapLetter(g: string): Map {
  const c = document.createElement("canvas");
  c.width = SIZE;
  c.height = SIZE;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  ctx.font = glyphFont();
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#000";
  ctx.fillText(g, SIZE / 2, BASE_Y);
  const letter = ctx.getImageData(0, 0, SIZE, SIZE).data;
  ctx.lineWidth = 34;
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#000";
  ctx.strokeText(g, SIZE / 2, BASE_Y);
  const near = ctx.getImageData(0, 0, SIZE, SIZE).data;
  const cols = Math.ceil(SIZE / STEP);
  const target = new Uint8Array(cols * cols);
  const zone = new Uint8Array(cols * cols);
  let total = 0;
  let start: [number, number] = [SIZE / 2, SIZE / 2];
  let best = Infinity;
  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < cols; x++) {
      const px = x * STEP + 2;
      const py = y * STEP + 2;
      const i = (py * SIZE + px) * 4 + 3;
      if (letter[i] > 100) {
        target[y * cols + x] = 1;
        total++;
        const score = py * 1.6 + px;
        if (score < best) {
          best = score;
          start = [px, py];
        }
      }
      if (near[i] > 30) zone[y * cols + x] = 1;
    }
  }
  return { target, zone, cols, total, start };
}

function Tracer({ g, color, onTraced, lang }: { g: string; color: string; onTraced: () => void; lang: DemoProps["lang"] }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const map = useRef<Map | null>(null);
  const covered = useRef<Uint8Array | null>(null);
  const painted = useRef({ on: 0, off: 0 });
  const last = useRef<[number, number] | null>(null);
  const drawing = useRef(false);
  const [progress, setProgress] = useState(0);
  const [offTrack, setOffTrack] = useState(false);
  const [done, setDone] = useState(false);
  const [ready, setReady] = useState(false);
  const [start, setStart] = useState<[number, number] | null>(null);

  const paintGuide = useCallback(() => {
    const ctx = canvas.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, SIZE, SIZE);
    // the writing lines: top, middle (dashed) and the baseline
    ctx.strokeStyle = "#D9E6F2";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(10, 66);
    ctx.lineTo(SIZE - 10, 66);
    ctx.moveTo(10, BASE_Y);
    ctx.lineTo(SIZE - 10, BASE_Y);
    ctx.stroke();
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(10, 120);
    ctx.lineTo(SIZE - 10, 120);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.font = glyphFont();
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#F3EBDD";
    ctx.fillText(g, SIZE / 2, BASE_Y);
    ctx.setLineDash([4, 7]);
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "#B9A58C";
    ctx.strokeText(g, SIZE / 2, BASE_Y);
    ctx.setLineDash([]);
  }, [g]);

  const reset = useCallback(() => {
    paintGuide();
    if (map.current) covered.current = new Uint8Array(map.current.target.length);
    painted.current = { on: 0, off: 0 };
    setProgress(0);
    setOffTrack(false);
  }, [paintGuide]);

  useEffect(() => {
    // (The tracer is remounted for each letter, so ready and done start out false.)
    let alive = true;
    document.fonts
      .load(glyphFont(), g)
      .catch(() => [])
      .then(() => {
        if (!alive) return;
        map.current = mapLetter(g);
        setStart(map.current.start);
        reset();
        setReady(true);
      });
    return () => {
      alive = false;
    };
  }, [g, reset]);

  const toCanvas = (e: React.PointerEvent): [number, number] => {
    const r = canvas.current!.getBoundingClientRect();
    return [((e.clientX - r.left) / r.width) * SIZE, ((e.clientY - r.top) / r.height) * SIZE];
  };

  const mark = (x: number, y: number) => {
    const m = map.current;
    const cov = covered.current;
    if (!m || !cov) return;
    const rad = BRUSH / 2 + 2;
    const cx0 = Math.max(0, Math.floor((x - rad) / STEP));
    const cx1 = Math.min(m.cols - 1, Math.ceil((x + rad) / STEP));
    const cy0 = Math.max(0, Math.floor((y - rad) / STEP));
    const cy1 = Math.min(m.cols - 1, Math.ceil((y + rad) / STEP));
    for (let cy = cy0; cy <= cy1; cy++)
      for (let cx = cx0; cx <= cx1; cx++) {
        const k = cy * m.cols + cx;
        if (m.target[k] && !cov[k] && Math.hypot(cx * STEP + 2 - x, cy * STEP + 2 - y) <= rad) cov[k] = 1;
      }
    const cell = Math.min(m.cols - 1, Math.max(0, Math.floor(y / STEP))) * m.cols + Math.min(m.cols - 1, Math.max(0, Math.floor(x / STEP)));
    if (m.zone[cell]) painted.current.on++;
    else painted.current.off++;
  };

  const check = () => {
    const m = map.current;
    const cov = covered.current;
    if (!m || !cov || done) return;
    let n = 0;
    for (let i = 0; i < cov.length; i++) n += cov[i];
    const p = n / Math.max(1, m.total);
    setProgress(p);
    const { on, off } = painted.current;
    const accuracy = on / Math.max(1, on + off);
    setOffTrack(on + off > 30 && accuracy < 0.65);
    if (p >= 0.7 && accuracy >= 0.65) {
      setDone(true);
      const ctx = canvas.current?.getContext("2d");
      if (ctx) {
        ctx.font = glyphFont();
        ctx.textAlign = "center";
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = color;
        ctx.fillText(g, SIZE / 2, BASE_Y);
      }
      sfx.good();
      setTimeout(onTraced, 1300);
    }
  };

  const stroke = (from: [number, number], to: [number, number]) => {
    const ctx = canvas.current?.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = color;
    ctx.globalAlpha = 0.85;
    ctx.lineWidth = BRUSH;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(...from);
    ctx.lineTo(...to);
    ctx.stroke();
    ctx.globalAlpha = 1;
    const steps = Math.max(1, Math.ceil(Math.hypot(to[0] - from[0], to[1] - from[1]) / 4));
    for (let i = 1; i <= steps; i++) mark(from[0] + ((to[0] - from[0]) * i) / steps, from[1] + ((to[1] - from[1]) * i) / steps);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-[300px]">
        <canvas
          ref={canvas}
          width={SIZE}
          height={SIZE}
          data-trace={g}
          className="block aspect-square w-full touch-none rounded-[28px] bg-white shadow-[0_6px_0_#00000014]"
          style={{ touchAction: "none", cursor: "crosshair" }}
          onPointerDown={(e) => {
            if (!ready || done) return;
            e.currentTarget.setPointerCapture(e.pointerId);
            drawing.current = true;
            const p = toCanvas(e);
            last.current = p;
            stroke(p, p);
            setStart(null);
          }}
          onPointerMove={(e) => {
            if (!drawing.current || !last.current) return;
            const p = toCanvas(e);
            stroke(last.current, p);
            last.current = p;
          }}
          onPointerUp={() => {
            drawing.current = false;
            last.current = null;
            check();
          }}
          onPointerCancel={() => {
            drawing.current = false;
            last.current = null;
          }}
          aria-label={g}
        />
        {start && ready && (
          <motion.span
            className="pointer-events-none absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-[#2E9A5B] shadow"
            style={{ left: `${(start[0] / SIZE) * 100}%`, top: `${(start[1] / SIZE) * 100}%` }}
            animate={{ scale: [1, 1.35, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
        )}
        {done && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: [0, 1.4, 1] }} className="absolute right-3 top-3 text-4xl text-[#F5B21E]" aria-hidden>
            ★
          </motion.span>
        )}
      </div>
      <div className="mt-3 flex w-full max-w-[300px] items-center gap-3">
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-[#EADFCF]">
          <motion.div className="h-full rounded-full" style={{ background: color }} animate={{ width: `${Math.min(100, Math.round((progress / 0.7) * 100))}%` }} />
        </div>
        <button type="button" onClick={reset} aria-label={COPY.clear[lang]} className="grid h-11 w-11 place-items-center rounded-full bg-white text-2xl shadow-[0_3px_0_#00000022]">
          ↺
        </button>
      </div>
      <p className="mt-2 h-6 text-center text-base text-[#B33A28]">{offTrack ? COPY.stay[lang] : ""}</p>
    </div>
  );
}

export default function TraceLetters({ lang, onDone }: DemoProps) {
  const [letter, setLetter] = useState<string | null>(null);
  const [step, setStep] = useState<0 | 1>(0);
  const [traced, setTraced] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);
  const color = COLORS[traced.length % COLORS.length];

  const after = () => {
    if (!letter) return;
    if (step === 0) {
      say(`The letter ${letter.toUpperCase()}.`);
      setStep(1);
      return;
    }
    const w = WORD[letter];
    say(`${w}!`);
    const next = traced.includes(letter) ? traced : [...traced, letter];
    setTraced(next);
    setLetter(null);
    setStep(0);
    if (next.length >= NEED) setFinished(true);
  };

  return (
    <Frame
      lang={lang}
      title={COPY.title}
      howTo={COPY.howTo}
      total={NEED}
      got={Math.min(traced.length, NEED)}
      done={finished}
      onDone={onDone}
      color="#6A4BB6"
      onAgain={() => setFinished(false)}
      ending={
        <div className="flex flex-wrap justify-center gap-3">
          {traced.map((l) => (
            <span key={l} className="flex items-center gap-1 rounded-2xl bg-[#F1ECFA] px-3 py-1">
              <span className="text-4xl font-bold text-[#6A4BB6]" style={ANDIKA}>
                {l.toUpperCase()}
                {l}
              </span>
              <Pic id={WORD[l]} size={34} />
            </span>
          ))}
        </div>
      }
    >
      {letter ? (
        <div>
          <div className="mb-2 flex items-center justify-center gap-3">
            <span className="rounded-xl bg-[#2A1A10] px-3 py-1 text-3xl font-bold text-white" style={ANDIKA}>
              {letter.toUpperCase()}
              {letter}
            </span>
            <span className="text-lg font-bold" style={lang === "am" ? undefined : DISPLAY}>
              {t(lang, step === 0 ? COPY.big : COPY.small)}
            </span>
            <Pic id={WORD[letter]} size={40} />
          </div>
          <Tracer key={`${letter}-${step}`} g={step === 0 ? letter.toUpperCase() : letter} color={color} lang={lang} onTraced={after} />
        </div>
      ) : (
        <div>
          <p className="mb-2 text-center text-lg">{t(lang, COPY.pick)}</p>
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-7">
            {LETTERS.map((l) => (
              <button
                key={l}
                type="button"
                data-letter={l}
                onClick={() => {
                  sfx.tap();
                  say(WORD[l]);
                  setLetter(l);
                  setStep(0);
                }}
                className="flex h-16 flex-col items-center justify-center rounded-2xl bg-white text-3xl font-bold shadow-[0_4px_0_#D3E4F4] active:translate-y-0.5"
                style={{ ...ANDIKA, color: traced.includes(l) ? "#2E9A5B" : "#6A4BB6", border: traced.includes(l) ? "3px solid #2E9A5B" : "3px solid transparent" }}
              >
                {l.toUpperCase()}
                {l}
              </button>
            ))}
          </div>
        </div>
      )}
    </Frame>
  );
}
