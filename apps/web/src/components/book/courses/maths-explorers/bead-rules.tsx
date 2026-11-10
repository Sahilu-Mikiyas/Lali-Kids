"use client";

import "./bead-rules.css";

import { useId, type ReactNode } from "react";

import { Place } from "../../scenery";
import { TAP, Wolf } from "./kit-cast";
import { d, r1 } from "./kit";
import { Label, Mark, NumBubble } from "./kit-maths";
import { Beads } from "./kit-measure";
import { Yard } from "./kit-places";
import { Notes, Sparkles } from "./kit-props";

/*
  "Hawi's Bead Rule": one living picture per page (12 pages) in Hawi's yard and at the wedding.
  Necklaces are strings of beads laid out straight; the part that repeats is boxed, a wrong
  bead is crossed, and the next bead (or number) waits as an empty dashed ring before it pops in.
*/

const R = "#E2463F";
const W = "#FFFDF4";
const Y = "#F5B21E";
const K = "#2A2420";

function Mat({ id, time = "day", children }: { id: string; time?: "day" | "evening"; children: ReactNode }) {
  return (
    <Yard id={id} time={time} house>
      <rect x={30} y={70} width={340} height={150} rx={18} fill="#E8D2A6" opacity={0.92} />
      {children}
    </Yard>
  );
}

const Mother = () => (
  <Place x={340} y={298} s={0.38} flip tap={TAP.hawi}>
    <Wolf mood="happy" dress="#2E9A5A" />
  </Place>
);
const Hawi = ({ mood = "happy" as "happy" | "joy" | "wow" }) => (
  <Place x={60} y={298} s={0.32} tap={TAP.hawi}>
    <Wolf mood={mood} />
  </Place>
);

/** Numbers in a row with one blank (popping in at `fill`). */
function NumberRow({ y, nums, blank, fill = 2.4 }: { y: number; nums: number[]; blank?: number; fill?: number }) {
  return (
    <g>
      {nums.map((n, i) => {
        const x = r1(200 + (i - (nums.length - 1) / 2) * 56);
        return i === blank ? (
          <g key={i}>
            <circle cx={x} cy={y} r={18} fill="#fff" stroke="#E8513B" strokeWidth={2} strokeDasharray="4 3" />
            <NumBubble x={x} y={y} n={n} delay={fill} color="#E8513B" />
          </g>
        ) : (
          <NumBubble key={i} x={x} y={y} n={n} delay={0.4 + i * 0.3} color="#2F5BD3" />
        );
      })}
    </g>
  );
}

export default function BeadRules({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A basket of red, white, yellow and black beads for the wedding necklaces.
    case 0:
      return (
        <Mat id={id}>
          {Array.from({ length: 24 }, (_, i) => (
            <circle key={i} cx={r1(120 + ((i * 37) % 160))} cy={r1(110 + ((i * 23) % 80))} r={8} fill={[R, W, Y, K][i % 4]} stroke="#00000022" />
          ))}
          <Sparkles x={200} y={150} r={60} delay={0.6} />
          <Hawi mood="joy" />
          <Mother />
        </Mat>
      );
    // Red, white, red, white… what comes next? Red!
    case 1:
      return (
        <Mat id={id}>
          <Beads x={90} y={140} colors={[R, W, R, W, R, W, R]} gap={34} r={12} pop={0.4} step={0.3} blank={1} />
          <g className="lali-pop-in" style={d(2.8)}>
            <circle cx={90 + 6 * 34} cy={140} r={12} fill={R} />
          </g>
          <rect x={72} y={120} width={70} height={40} rx={10} fill="none" stroke="#2F5BD3" strokeWidth={2.4} strokeDasharray="5 4" className="lali-fade-in" style={d(2.2)} />
          <Hawi mood="joy" />
          <Mother />
        </Mat>
      );
    // Red, white, white: the repeating part has three beads.
    case 2:
      return (
        <Mat id={id}>
          <Beads x={70} y={140} colors={[R, W, W, R, W, W, R, W, W]} gap={30} r={11} pop={0.4} step={0.25} blank={3} />
          {[0, 1, 2].map((i) => (
            <g key={i} className="lali-pop-in" style={d(2.8 + i * 0.3)}>
              <circle cx={70 + (6 + i) * 30} cy={140} r={11} fill={i ? W : R} stroke="#00000022" />
            </g>
          ))}
          <rect x={56} y={122} width={88} height={36} rx={10} fill="none" stroke="#2F5BD3" strokeWidth={2.4} strokeDasharray="5 4" className="lali-fade-in" style={d(2.4)} />
          <Hawi mood="happy" />
        </Mat>
      );
    // A mistake: red, white, white, red, white, red. Swap the bead.
    case 3:
      return (
        <Mat id={id}>
          <Beads x={90} y={140} colors={[R, W, W, R, W, R]} gap={40} r={13} />
          <Mark x={290} y={104} ok={false} delay={1} s={0.7} />
          <g className="br-swap">
            <circle cx={290} cy={140} r={13} fill={W} stroke="#00000022" />
          </g>
          <Hawi mood="wow" />
        </Mat>
      );
    // A growing pattern: one red and 1, 2, 3 whites.
    case 4:
      return (
        <Mat id={id}>
          <Beads x={60} y={140} colors={[R, W, R, W, W, R, W, W, W]} gap={30} r={11} pop={0.6} step={0.35} />
          {[
            [60, 2],
            [120, 3],
            [210, 4],
          ].map(([x, n], i) => (
            <rect key={i} x={x - 16} y={120} width={n * 30 + 2} height={40} rx={10} fill="none" stroke="#2F5BD3" strokeWidth={2} strokeDasharray="4 3" className="lali-fade-in" style={d(3.8 + i * 0.4)} />
          ))}
          <Mother />
        </Mat>
      );
    // Next: one red and four whites. 1, 2, 3, 4.
    case 5:
      return (
        <Mat id={id}>
          <Beads x={110} y={120} colors={[R, W, W, W, W]} gap={30} r={11} pop={0.6} step={0.3} />
          <NumberRow y={186} nums={[1, 2, 3, 4]} blank={3} fill={2.4} />
          <Hawi mood="joy" />
        </Mat>
      );
    // Bags of 2, 4, 6, 8: add two. Next is 10.
    case 6:
      return (
        <Mat id={id}>
          <NumberRow y={120} nums={[2, 4, 6, 8, 10]} blank={4} fill={2.6} />
          <Label x={200} y={190} text="+2" size={30} color="#E8513B" delay={1.8} />
          <Hawi mood="joy" />
          <Mother />
        </Mat>
      );
    // In fives: 5, 10, 15, 20. In tens: 10, 20, 30.
    case 7:
      return (
        <Mat id={id}>
          <NumberRow y={110} nums={[5, 10, 15, 20]} />
          <NumberRow y={180} nums={[10, 20, 30]} />
          <Label x={340} y={116} text="+5" size={18} color="#E8513B" delay={1.8} />
          <Label x={310} y={186} text="+10" size={18} color="#E8513B" delay={2.4} />
          <Mother />
        </Mat>
      );
    // {name}: 3, 6, 9, ?, 15. Add three: 12.
    case 8:
      return (
        <Mat id={id}>
          <NumberRow y={130} nums={[3, 6, 9, 12, 15]} blank={3} fill={2.8} />
          <Label x={200} y={196} text="+3" size={28} color="#E8513B" delay={2} />
          <Hawi mood="happy" />
        </Mat>
      );
    // Hawi's own rule: yellow, black, black.
    case 9:
      return (
        <Mat id={id}>
          <Beads x={90} y={140} colors={[Y, K, K, Y, K, K, Y]} gap={36} r={12} pop={0.4} step={0.3} />
          <rect x={74} y={120} width={104} height={40} rx={10} fill="none" stroke="#2F5BD3" strokeWidth={2.4} strokeDasharray="5 4" className="lali-fade-in" style={d(2.8)} />
          <Hawi mood="joy" />
          <Mother />
        </Mat>
      );
    // Six necklaces in a shining row.
    case 10:
      return (
        <Mat id={id} time="evening">
          {[
            [R, W],
            [R, W, W],
            [R, W, R, W, W, R, W, W, W],
            [Y, K, K],
            [W, Y],
            [R, K],
          ].map((unit, i) => {
            const colors = Array.from({ length: 12 }, (_, k) => unit[k % unit.length]);
            return (
              <g key={i} className="lali-pop-in" style={d(0.4 + i * 0.3)}>
                <Beads x={70} y={90 + i * 22} colors={colors} gap={22} r={7} />
              </g>
            );
          })}
          <Hawi mood="joy" />
        </Mat>
      );
    // At the wedding: the bride knows the rule!
    case 11:
      return (
        <Yard id={id} time="evening" house>
          <Place x={140} y={296} s={0.4} tap={TAP.hawi}>
            <Wolf mood="joy" dress="#FFFDF4" />
          </Place>
          <Place x={250} y={298} s={0.32} flip tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Beads x={122} y={268} colors={[Y, K, K, Y, K, K]} gap={7} r={3.5} />
          <Notes x={200} y={170} color="#E8513B" />
          <Sparkles x={200} y={130} r={70} delay={0.4} n={7} />
        </Yard>
      );
    default:
      return null;
  }
}
