"use client";

import "./market-piles.css";

import { useId, type ReactNode } from "react";

import { Air, BeeHover, Place } from "../../scenery";
import { Tappable } from "../../tappable";
import { AuntieSheep, Gugu, Ibex, Papa, TAP } from "./kit-cast";
import { d, LATIN, Mango, Market, r1 } from "./kit";
import { Label, SumCard, Tomato, TomatoPile } from "./kit-maths";
import { Home } from "./kit-places";
import { Sparkles } from "./kit-props";

/*
  "Piles of Five": one living picture per page (12 pages) at the Saturday market. A cloth on the
  stall holds the piles of five tomatoes (four below, one on top), each with its running count
  in fives; Mr Kidane's crates hold ten mangoes in two rows of five, so two piles of five sit
  beside one crate. Story keyframes: mp-* in ./market-piles.css.
*/

function Stall({ id, children, time = "day" }: { id: string; children: ReactNode; time?: "day" | "dusk" }) {
  return (
    <g>
      <Market id={id} time={time} />
      <path d="M30 196 L370 196 L384 232 L16 232Z" fill="#F4EEDC" />
      <path d="M16 232 L384 232" stroke="#2E9A8A" strokeWidth={5} />
      <path d="M22 226 H378" stroke="#F5B21E" strokeWidth={2} strokeDasharray="6 4" />
      {children}
      <Air kind={time === "dusk" ? "dusk" : "day"} seed={52} grass={false} />
    </g>
  );
}

/** `n` piles of five in rows (up to `per` a row), each with its running count; the last ones pop in from `from`. */
function Piles({ n, x0 = 60, y0 = 214, gx = 58, gy = 40, per = 6, from = 0, pop = 0.8, step = 0.5, labels = true, s = 1 }: { n: number; x0?: number; y0?: number; gx?: number; gy?: number; per?: number; from?: number; pop?: number; step?: number; labels?: boolean; s?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const x = r1(x0 + (i % per) * gx);
        const y = r1(y0 + Math.floor(i / per) * gy);
        const t = r1(pop + (i - from) * step);
        return (
          <g key={i}>
            {i >= from ? (
              <g className="lali-pop-in" style={d(t)}>
                <TomatoPile x={x} y={y} s={s} />
              </g>
            ) : (
              <TomatoPile x={x} y={y} s={s} />
            )}
            {labels && <Label x={x} y={y - 34 * s} text={String((i + 1) * 5)} size={15} color="#2F5BD3" delay={i >= from ? t + 0.3 : 0.2} />}
          </g>
        );
      })}
    </g>
  );
}

/** A wooden crate of ten mangoes (two rows of five). Base centred at (x, y). */
function Crate({ x, y, s = 1, tag }: { x: number; y: number; s?: number; tag?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        {[0, 1, 2, 3, 4].map((i) => (
          <Mango key={`b${i}`} x={-24 + i * 12} y={-26} s={0.62} a={(i % 2 ? -1 : 1) * 12} />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <Mango key={`f${i}`} x={-24 + i * 12} y={-18} s={0.62} a={(i % 2 ? 1 : -1) * 12} />
        ))}
        <rect x={-34} y={-16} width={68} height={16} rx={2} fill="#C98A4A" />
        <path d="M-34 -8 H34" stroke="#9A6224" strokeWidth={1.6} />
        <path d="M-34 -16 V0 M34 -16 V0" stroke="#9A6224" strokeWidth={3} />
      </Tappable>
      {tag && (
        <text y={14} fontSize={13} fontFamily={LATIN} fontWeight={900} fill="#C98A0A" textAnchor="middle">
          {tag}
        </text>
      )}
    </g>
  );
}

export default function MarketPiles({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Saturday at the stall; a big basket of tomatoes. "Five in every pile."
    case 0:
      return (
        <Stall id={id}>
          <g transform="translate(200 214)">
            <path d="M-40 -2 Q-40 -30 0 -30 Q40 -30 40 -2Z" fill="#C98A3A" />
            {Array.from({ length: 12 }, (_, i) => (
              <Tomato key={i} x={r1(-28 + (i % 6) * 11)} y={r1(-30 - Math.floor(i / 6) * 9 + (i % 2) * 2)} />
            ))}
            <path d="M-40 -2 Q0 4 40 -2" stroke="#9A6224" strokeWidth={3} fill="none" />
          </g>
          <Place x={80} y={298} s={0.36} tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Place x={320} y={298} s={0.42} flip tap={TAP.haben}>
            <Ibex grown mood="happy" />
          </Place>
        </Stall>
      );
    // One pile, two piles, three piles: five, ten, fifteen.
    case 1:
      return (
        <Stall id={id}>
          <Piles n={3} x0={120} gx={80} pop={0.8} step={1} s={1.3} />
          <Place x={60} y={298} s={0.32} tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
        </Stall>
      );
    // Four piles of five is twenty. The cardboard sign: 5, 10, 15, 20, 25, 30.
    case 2:
      return (
        <Stall id={id}>
          <Piles n={6} pop={0} from={6} />
          <g transform="translate(200 70)">
            <rect x={-150} y={-24} width={300} height={44} rx={4} fill="#D9B98A" transform="rotate(-2)" />
            {[5, 10, 15, 20, 25, 30].map((n, i) => (
              <Label key={n} x={-125 + i * 50} y={8} text={String(n)} size={20} color="#1B2A4E" delay={0.8 + i * 0.4} />
            ))}
          </g>
          <SumCard x={200} y={132} tokens={["4", "×", "5", "=", "20"]} start={3.4} hl={{ 1: "#E8513B", 4: "#E8513B" }} size={22} />
        </Stall>
      );
    // The fives end in 5 or 0, like a little song.
    case 3:
      return (
        <Stall id={id}>
          <Piles n={6} pop={0} from={6} />
          <g transform="translate(200 110)">
            {[5, 10, 15, 20, 25, 30].map((n, i) => (
              <g key={n}>
                <Label x={-125 + i * 50} y={8} text={String(n)} size={24} color="#1B2A4E" delay={null} />
                <circle cx={-125 + i * 50 + (n >= 10 ? 7 : 0)} cy={0} r={12} fill="none" stroke={n % 10 ? "#E8513B" : "#2E9A5A"} strokeWidth={2.4} className="lali-pop-in" style={d(0.8 + i * 0.4)} />
              </g>
            ))}
          </g>
          <Place x={50} y={300} s={0.3} tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
        </Stall>
      );
    // Auntie Sheep needs thirty-five tomatoes. How many piles?
    case 4:
      return (
        <Stall id={id}>
          <Piles n={10} pop={0} from={10} labels={false} per={5} x0={90} gx={56} y0={208} gy={26} s={0.8} />
          <SumCard x={200} y={120} tokens={["?", "×", "5", "=", "35"]} start={1} step={0.2} hl={{ 0: "#E8513B" }} />
          <Place x={340} y={298} s={0.36} flip from={[460, 298]} dur={1.6} tap={TAP.sheep}>
            <AuntieSheep mood="wow" />
          </Place>
        </Stall>
      );
    // Five, ten … thirty-five: seven piles. 7 × 5 = 35.
    case 5:
      return (
        <Stall id={id}>
          <Piles n={7} pop={0.6} step={0.45} per={7} x0={50} gx={50} s={0.9} />
          <SumCard x={200} y={110} tokens={["7", "×", "5", "=", "35"]} start={4} hl={{ 1: "#E8513B", 4: "#E8513B" }} geezOf={35} />
          <Place x={360} y={300} s={0.3} flip tap={TAP.sheep}>
            <AuntieSheep mood="joy" />
          </Place>
        </Stall>
      );
    // Mr Kidane's crates of ten mangoes: ten, twenty, thirty.
    case 6:
      return (
        <Stall id={id}>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <g className="lali-pop-in" style={d(0.8 + i * 0.8)}>
                <Crate x={120 + i * 80} y={222} s={1.1} />
              </g>
              <Label x={120 + i * 80} y={170} text={String((i + 1) * 10)} size={20} color="#C98A0A" delay={1.2 + i * 0.8} />
            </g>
          ))}
          <Place x={350} y={298} s={0.38} flip tap={TAP.papa}>
            <Papa mood="happy" pose="point" />
          </Place>
        </Stall>
      );
    // Two piles of five beside one crate of ten: ten and ten.
    case 7:
      return (
        <Stall id={id}>
          <Piles n={2} x0={110} gx={56} pop={0} from={2} s={1.1} labels={false} />
          <Label x={138} y={160} text="5 + 5 = 10" size={20} color="#2F5BD3" delay={0.8} />
          <g className="mp-slide">
            <Crate x={280} y={222} s={1.2} />
          </g>
          <Label x={280} y={160} text="10" size={22} color="#C98A0A" delay={1.6} />
          <Label x={209} y={226} text="=" size={30} color="#1B2A4E" delay={2.2} />
          <Place x={52} y={298} s={0.3} tap={TAP.haben}>
            <Ibex mood="wow" />
          </Place>
        </Stall>
      );
    // Gugu's question: ten piles? Two piles make ten, so five tens: fifty.
    case 8:
      return (
        <Stall id={id}>
          <Piles n={10} labels={false} per={5} x0={90} gx={56} y0={208} gy={26} s={0.8} pop={0} from={10} />
          {[0, 1, 2, 3, 4].map((k) => (
            <g key={k}>
              <rect x={r1(64 + k * 56 - (k > 2 ? 0 : 0))} y={180} width={52} height={44} rx={10} fill="none" stroke="#C98A0A" strokeWidth={2.4} strokeDasharray="5 4" className="lali-fade-in" style={d(0.8 + k * 0.4)} />
              <Label x={90 + k * 56} y={172} text={String((k + 1) * 10)} size={15} color="#C98A0A" delay={1 + k * 0.4} />
            </g>
          ))}
          <SumCard x={200} y={110} tokens={["10", "×", "5", "=", "50"]} start={3.4} hl={{ 1: "#E8513B", 4: "#E8513B" }} geezOf={50} />
          <Place x={360} y={300} s={0.3} flip tap={TAP.gugu}>
            <Gugu mood="wow" pose="point" />
          </Place>
        </Stall>
      );
    // {name}: count the ten piles in fives, all the way to fifty.
    case 9:
      return (
        <Stall id={id}>
          <Piles n={10} per={5} x0={90} gx={56} y0={180} gy={46} s={0.8} pop={0.6} step={0.4} />
          <BeeHover x={340} y={90} s={1.2} flip />
          <Place x={44} y={300} s={0.28} tap={TAP.haben}>
            <Ibex mood="joy" />
          </Place>
        </Stall>
      );
    // Evening: one pile left. "Those are for us. You choose what we cook."
    case 10:
      return (
        <Stall id={id} time="dusk">
          <Piles n={1} x0={200} labels={false} pop={0} from={1} s={1.4} />
          <Sparkles x={200} y={180} r={36} delay={1} />
          <Place x={80} y={298} s={0.36} tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Place x={320} y={298} s={0.42} flip tap={TAP.haben}>
            <Ibex grown mood="joy" />
          </Place>
        </Stall>
      );
    // Home: timatim fitfit, mother chops and Haben mixes.
    case 11:
      return (
        <Home id={id} time="evening" shelf={false}>
          <g transform="translate(200 250)">
            <ellipse cx={0} cy={0} rx={70} ry={16} fill="#E8D9B8" />
            <ellipse cx={0} cy={-2} rx={60} ry={12} fill="#D9B27A" />
            {Array.from({ length: 16 }, (_, i) => (
              <rect key={i} x={r1(-44 + ((i * 29) % 88))} y={r1(-8 + ((i * 7) % 10))} width={7} height={5} rx={1.4} fill={i % 3 === 0 ? "#3E9B5A" : i % 3 === 1 ? "#E2463F" : "#C98A5A"} />
            ))}
          </g>
          <g className="mp-stir">
            <path d="M232 220 L262 196" stroke="#8A5A36" strokeWidth={4} strokeLinecap="round" />
          </g>
          <Place x={90} y={300} s={0.4} tap={TAP.haben}>
            <Ibex grown mood="joy" />
          </Place>
          <Place x={310} y={300} s={0.36} flip tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
        </Home>
      );
    default:
      return null;
  }
}
