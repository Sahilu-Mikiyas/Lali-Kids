"use client";

import "./oxen-pairs.css";

import { useId, type ReactNode } from "react";

import { Air, BeeHover, Place, vars } from "../../scenery";
import { Gugu, Papa, TAP } from "./kit-cast";
import { d, InjeraRoll, Land, r1 } from "./kit";
import { Label, OxPair, SumCard } from "./kit-maths";
import { Fence } from "./kit-places";

/*
  "Two by Two to the Field": one living picture per page (12 pages) in the highlands at
  ploughing time: the brown field with its furrows, a fence for Gugu to sit on, and pairs of
  oxen under their yokes. Every pair carries its running count (2, 4, 6 …) so the twos can be
  read along the rows; the times sum writes itself underneath. Story keyframes: op-* in
  ./oxen-pairs.css.
*/

function Field({ id, time = "day", children }: { id: string; time?: "dawn" | "day" | "dusk"; children: ReactNode }) {
  return (
    <g>
      <Land id={id} time={time} />
      <path d="M-10 196 Q200 184 410 198 L410 310 L-10 310Z" fill={time === "dusk" ? "#7A5236" : "#9A6A42"} />
      <g stroke={time === "dusk" ? "#5E3E26" : "#7A5032"} strokeWidth={3} opacity={0.6} fill="none">
        {[214, 236, 262, 292].map((y, i) => (
          <path key={y} d={`M-10 ${y} Q200 ${y - 10 - i * 2} 410 ${y + 2}`} />
        ))}
      </g>
      {children}
      <Air kind={time === "dusk" ? "dusk" : "day"} seed={41} grass={false} />
    </g>
  );
}

/** `n` pairs of oxen, five to a row, each with its running count (2, 4, 6 …) popping in turn. */
function Pairs({ n, x0 = 70, y0 = 196, gx = 60, gy = 56, s = 0.62, pop = 0.8, step = 0.55, from = 0, labels = true, walk = false }: { n: number; x0?: number; y0?: number; gx?: number; gy?: number; s?: number; pop?: number; step?: number; from?: number; labels?: boolean; walk?: boolean }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const x = r1(x0 + (i % 5) * gx + (Math.floor(i / 5) % 2) * 10);
        const y = r1(y0 + Math.floor(i / 5) * gy);
        const t = r1(pop + (i - from) * step);
        const pair = <OxPair x={x} y={y} s={s} walk={walk} colors={i % 2 ? ["#5A4034", "#8A5A3A"] : ["#8A5A3A", "#3E3230"]} />;
        return (
          <g key={i}>
            {i >= from ? (
              <g className="op-arrive" style={vars({ "--delay": `${t}s` })}>
                {pair}
              </g>
            ) : (
              pair
            )}
            {labels && <Label x={x + 6} y={y - 50 * s - 8} text={String((i + 1) * 2)} size={16} color="#E8513B" delay={i >= from ? t + 0.4 : 0.3} />}
          </g>
        );
      })}
    </g>
  );
}

export default function OxenPairs({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // The first rains; before sunrise the farmers walk their oxen to the field. Gugu on the fence.
    case 0:
      return (
        <Field id={id} time="dawn">
          <g className="me-slide" style={vars({ "--fx": "-280px", "--fy": "0px", "--delay": "0.4s", "--dur": "3s" })}>
            <OxPair x={250} y={250} s={0.8} walk />
            <OxPair x={330} y={266} s={0.8} walk />
          </g>
          <Fence y={290} from={-10} to={140} />
          <Place x={70} y={262} s={0.3} tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
          <BeeHover x={120} y={186} s={0.9} />
        </Field>
      );
    // A pair is two, joined by one wooden yoke.
    case 1:
      return (
        <Field id={id}>
          <OxPair x={190} y={250} s={1.5} />
          <Label x={140} y={150} text="1" size={30} color="#2F5BD3" delay={1} />
          <Label x={250} y={150} text="2" size={30} color="#2F5BD3" delay={1.5} />
          <g className="lali-fade-in" style={d(2)}>
            <path d="M190 170 l20 -12" stroke="#E8513B" strokeWidth={3} />
          </g>
          <Place x={340} y={298} s={0.38} flip tap={TAP.papa}>
            <Papa mood="happy" pose="point" />
          </Place>
          <Place x={52} y={298} s={0.3} tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
        </Field>
      );
    // Two pairs: two, four.
    case 2:
      return (
        <Field id={id}>
          <Pairs n={2} x0={130} gx={120} y0={240} s={1} from={1} pop={0.8} />
          <Place x={52} y={298} s={0.3} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
        </Field>
      );
    // Three pairs, four pairs: point at each pair, not each ox.
    case 3:
      return (
        <Field id={id}>
          <Pairs n={4} x0={80} gx={82} y0={236} s={0.8} from={2} pop={0.8} step={0.9} />
          <Place x={360} y={298} s={0.3} flip tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
        </Field>
      );
    // Five pairs: ten. 5 × 2 = 10.
    case 4:
      return (
        <Field id={id}>
          <Pairs n={5} y0={230} s={0.7} from={0} pop={0.6} step={0.45} />
          <SumCard x={200} y={110} tokens={["5", "×", "2", "=", "10"]} start={3.2} hl={{ 1: "#E8513B", 4: "#E8513B" }} geezOf={10} />
          <Place x={370} y={300} s={0.3} flip tap={TAP.papa}>
            <Papa mood="joy" />
          </Place>
        </Field>
      );
    // Lali counts the slow way, one ox at a time.
    case 5:
      return (
        <Field id={id}>
          <Pairs n={5} y0={230} s={0.7} labels={false} pop={0} from={5} />
          {Array.from({ length: 10 }, (_, i) => (
            <Label key={i} x={r1(66 + Math.floor(i / 2) * 66 + (i % 2) * 12)} y={r1(176 - (i % 2) * 12)} text={String(i + 1)} size={13} color="#2F5BD3" delay={0.6 + i * 0.35} />
          ))}
          <g className="op-zig">
            <BeeHover x={200} y={110} s={1.2} />
          </g>
          <Place x={360} y={300} s={0.28} flip tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
        </Field>
      );
    // Six pairs, seven pairs; the ploughs cut long brown lines.
    case 6:
      return (
        <Field id={id}>
          <Pairs n={7} x0={64} y0={196} s={0.58} from={5} pop={0.8} step={0.8} gy={64} />
          <SumCard x={290} y={270} tokens={["7", "×", "2", "=", "14"]} start={2.6} hl={{ 1: "#E8513B", 4: "#E8513B" }} size={22} />
        </Field>
      );
    // Eight pairs: double eight, sixteen.
    case 7:
      return (
        <Field id={id}>
          <Pairs n={8} x0={64} y0={196} s={0.58} pop={0} from={8} gy={64} />
          <SumCard x={200} y={64} tokens={["8", "×", "2", "=", "16"]} start={1.6} hl={{ 1: "#E8513B", 4: "#E8513B" }} />
          <Label x={200} y={120} text="8 + 8 = 16" size={22} color="#C98A0A" delay={2.8} />
          <Place x={360} y={298} s={0.3} flip tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
        </Field>
      );
    // {name}: ten pairs, twenty.
    case 8:
      return (
        <Field id={id}>
          <Pairs n={10} x0={64} y0={196} s={0.58} pop={0} from={8} step={0.7} gy={64} />
          <SumCard x={200} y={96} tokens={["10", "×", "2", "=", "20"]} start={2.4} hl={{ 1: "#E8513B", 4: "#E8513B" }} geezOf={20} />
        </Field>
      );
    // Midday: nine farmers, two injera rolls each: eighteen.
    case 9:
      return (
        <Field id={id}>
          {Array.from({ length: 9 }, (_, i) => (
            <g key={i}>
              <g className="lali-pop-in" style={d(0.6 + i * 0.3)}>
                <InjeraRoll x={r1(40 + i * 40)} y={186} s={0.8} />
                <InjeraRoll x={r1(40 + i * 40)} y={172} s={0.8} />
              </g>
              <Label x={r1(40 + i * 40)} y={214} text={String((i + 1) * 2)} size={15} color="#E8513B" delay={0.9 + i * 0.3} />
            </g>
          ))}
          <SumCard x={200} y={110} tokens={["9", "×", "2", "=", "18"]} start={3.8} hl={{ 1: "#E8513B", 4: "#E8513B" }} />
          <Place x={330} y={300} s={0.3} flip tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <Place x={90} y={300} s={0.32} tap={TAP.papa}>
            <Papa mood="happy" />
          </Place>
        </Field>
      );
    // Sunset: the oxen walk home two by two; Gugu counts behind them.
    case 10:
      return (
        <Field id={id} time="dusk">
          <g className="me-slide" style={vars({ "--fx": "220px", "--fy": "0px", "--delay": "0.2s", "--dur": "4s" })}>
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <OxPair x={60 + i * 74} y={250 + (i % 2) * 10} s={0.62} walk />
                <Label x={66 + i * 74} y={206} text={String((i + 1) * 2)} size={15} color="#FFE27A" delay={1 + i * 0.6} />
              </g>
            ))}
          </g>
          <Place x={350} y={296} s={0.3} flip tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
        </Field>
      );
    // "Tomorrow I'll count their legs!" "Then count in fours!"
    case 11:
      return (
        <Field id={id} time="dusk">
          <OxPair x={180} y={262} s={1.2} />
          {[0, 1, 2, 3].map((i) => (
            <Label key={i} x={r1(140 + i * 22)} y={286} text={String((i + 1) * 4)} size={13} color="#FFE27A" delay={1.6 + i * 0.4} />
          ))}
          <Place x={340} y={298} s={0.36} flip className="op-laugh" tap={TAP.papa}>
            <Papa mood="joy" />
          </Place>
          <Place x={60} y={298} s={0.3} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
        </Field>
      );
    default:
      return null;
  }
}
