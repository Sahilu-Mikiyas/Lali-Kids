"use client";

import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import type { DemoProps } from "../../../types";
import { FIDEL, Frame, say, sfx, type T } from "./kit";

/*
  "Trace the letter": a big fidel in pale dashes; the child paints over it with a finger (or the
  mouse). The path is checked against the letter's own shape: the letter is drawn once, unseen,
  to make a map of its strokes (and a slightly wider "on the letter" zone around them). As the
  child paints, the map fills in. When most of the letter is covered (72%) and most of the paint
  is on it (65%), the letter fills with colour, says its sound, and the next one comes.
  Paint far off the letter gently asks to stay on the lines; the round arrow clears and tries again.
*/

const COPY = {
  title: { en: "Trace the letter", am: "ፊደሉን በጣታችሁ ጻፉ" } satisfies T,
  howTo: { en: "Paint over the dotted letter with your finger. Cover it all!", am: "በነጥብ የተሳለውን ፊደል በጣታችሁ ቀቡት። ሙሉውን ሸፍኑት!" } satisfies T,
  stay: { en: "Try to stay on the letter.", am: "በፊደሉ ላይ ለመቆየት ሞክሩ።" } satisfies T,
  clear: { en: "Start again", am: "እንደገና ጀምሩ" } satisfies T,
  next: { en: "Next letter", am: "ቀጣዩ ፊደል" } satisfies T,
  ending: { en: "You wrote them all with your own finger!", am: "ሁሉንም በራሳችሁ ጣት ጻፋችሁ!" } satisfies T,
};

const SIZE = 300; // canvas units (square)
const STEP = 5; // grid step for checking
const BRUSH = 26;

type Map = { target: Uint8Array; zone: Uint8Array; cols: number; total: number; start: [number, number] };

/** The fidel font as the page has it, for drawing on a canvas. */
function fontFamily(): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue("--font-noto-ethiopic").trim();
  return v || "'Noto Sans Ethiopic', sans-serif";
}

function glyphFont() {
  return `700 230px ${fontFamily()}`;
}

/** Draws the letter unseen and samples it into a grid: the letter's own pixels and the zone near them. */
function mapLetter(g: string): Map {
  const c = document.createElement("canvas");
  c.width = SIZE;
  c.height = SIZE;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  ctx.font = glyphFont();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#000";
  ctx.fillText(g, SIZE / 2, SIZE / 2 + 10);
  const letter = ctx.getImageData(0, 0, SIZE, SIZE).data;
  ctx.lineWidth = 34;
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#000";
  ctx.strokeText(g, SIZE / 2, SIZE / 2 + 10);
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
        // the start hint: the top-left-most part of the letter
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
    ctx.font = glyphFont();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#F3EBDD";
    ctx.fillText(g, SIZE / 2, SIZE / 2 + 10);
    ctx.setLineDash([4, 7]);
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "#B9A58C";
    ctx.strokeText(g, SIZE / 2, SIZE / 2 + 10);
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
    const fam = fontFamily();
    document.fonts
      .load(`700 230px ${fam}`, g)
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
    if (p >= 0.72 && accuracy >= 0.65) {
      setDone(true);
      const ctx = canvas.current?.getContext("2d");
      if (ctx) {
        ctx.font = glyphFont();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = color;
        ctx.fillText(g, SIZE / 2, SIZE / 2 + 10);
      }
      sfx.good();
      say(g);
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
      <div className="relative w-full max-w-[320px]">
        <canvas
          ref={canvas}
          width={SIZE}
          height={SIZE}
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
      <div className="mt-3 flex w-full max-w-[320px] items-center gap-3">
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-[#EADFCF]">
          <motion.div className="h-full rounded-full" style={{ background: color }} animate={{ width: `${Math.min(100, Math.round((progress / 0.72) * 100))}%` }} />
        </div>
        <button type="button" onClick={reset} aria-label={COPY.clear[lang]} className="grid h-11 w-11 place-items-center rounded-full bg-white text-2xl shadow-[0_3px_0_#00000022]">
          ↺
        </button>
      </div>
      <p className="mt-2 h-6 text-center text-base text-[#B33A28]">{offTrack ? COPY.stay[lang] : ""}</p>
    </div>
  );
}

const COLORS = ["#E8513B", "#E58A00", "#1F8A8A", "#6A4BB6", "#2E9A5B"];

export function Trace({ lang, onDone, letters }: DemoProps & { letters: string[] }) {
  const [i, setI] = useState(0);
  const [got, setGot] = useState(0);
  const done = got === letters.length;
  return (
    <Frame lang={lang} title={COPY.title} howTo={COPY.howTo} total={letters.length} got={got} done={done} onDone={onDone} ending={<p className="text-6xl font-bold tracking-widest" style={FIDEL}>{letters.join(" ")}</p>}>
      <div className="mb-2 flex justify-center gap-2">
        {letters.map((l, k) => (
          <span key={l} className={`grid h-10 w-10 place-items-center rounded-xl text-2xl font-bold ${k === i ? "bg-[#2A1A10] text-white" : k < got ? "bg-[#DFF3E4] text-[#2E9A5B]" : "bg-white text-[#B9A58C]"}`} style={FIDEL}>
            {l}
          </span>
        ))}
      </div>
      <Tracer
        key={letters[i]}
        g={letters[i]}
        color={COLORS[i % COLORS.length]}
        lang={lang}
        onTraced={() => {
          setGot((n) => Math.max(n, i + 1));
          if (i + 1 < letters.length) setI(i + 1);
        }}
      />
    </Frame>
  );
}
