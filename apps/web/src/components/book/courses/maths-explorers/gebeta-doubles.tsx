"use client";

import "./gebeta-doubles.css";

import { useId, type ReactNode } from "react";

import { Air, BeeHover, Place } from "../../scenery";
import { Gugu, Ibex, TAP } from "./kit-cast";
import { d, r1 } from "./kit";
import { Gebeta, Label, SumCard } from "./kit-maths";
import { Yard } from "./kit-places";
import { Sign, Sparkles } from "./kit-props";

/*
  "Haben's Gebeta Doubles": one living picture per page (12 pages) under the big tree. The
  gebeta board shows doubles as two facing pits with the same number of pebbles (a ring of
  light around them). Near doubles are drawn as two rows of pebbles lined up: the matching
  part of each row, and the one extra pebble glowing gold. Story keyframes: gd-* in
  ./gebeta-doubles.css.
*/

function Shade({ id, time = "day", children }: { id: string; time?: "day" | "evening"; children: ReactNode }) {
  return (
    <g>
      <Yard id={id} time={time} tree fig={330} house={false}>
        {children}
      </Yard>
      <Air kind={time === "evening" ? "dusk" : "day"} seed={8} grass={false} />
    </g>
  );
}

/** The pits all holding the same number. */
const all = (n: number) => Array.from({ length: 12 }, () => n);

/** Two rows of pebbles, lined up: `a` on top, `b` below; pebbles beyond the shorter row glow gold (or are crossed out with minus). */
function Rows({ x, y, a, b, t = 1, minus = false }: { x: number; y: number; a: number; b: number; t?: number; minus?: boolean }) {
  const g = 17;
  const row = (n: number, yy: number, k: number) =>
    Array.from({ length: n }, (_, i) => {
      const extra = i >= Math.min(a, b);
      return (
        <g key={`${k}-${i}`} className="lali-pop-in" style={d(t + i * 0.12 + k * 0.6)}>
          <circle cx={r1(i * g)} cy={yy} r={7} fill={extra ? "#FFD233" : k ? "#CFC2AE" : "#E8DCC8"} stroke={extra ? "#C98A0A" : "#8A7A66"} strokeWidth={1.4} />
          {extra && minus && <path d={`M${r1(i * g - 6)} ${yy - 6} l12 12`} stroke="#E2463F" strokeWidth={2.6} />}
        </g>
      );
    });
  const w = (Math.max(a, b) - 1) * g;
  return (
    <g transform={`translate(${r1(x - w / 2)} ${y})`}>
      <rect x={-14} y={-16} width={w + 28} height={56} rx={14} fill="#FFFDF4" opacity={0.92} />
      {row(a, 0, 0)}
      {row(b, 24, 1)}
      <rect x={-10} y={-11} width={r1((Math.min(a, b) - 1) * g + 20)} height={46} rx={11} fill="none" stroke="#2F5BD3" strokeWidth={2} strokeDasharray="5 4" className="lali-fade-in" style={d(t + 1.6)} />
    </g>
  );
}

/** Two hands held up, five fingers each (n fingers on each). */
function Hands({ x, y, t = 1, s = 1 }: { x: number; y: number; t?: number; s?: number }) {
  const hand = (hx: number, k: number) => (
    <g key={k} transform={`translate(${hx} 0)`}>
      <g className="lali-pop-in" style={d(t + k * 0.4)}>
        <ellipse cx={0} cy={6} rx={15} ry={14} fill="#5A3A2A" />
        {[-12, -6, 0, 6, 12].map((fx, i) => (
          <rect key={i} x={fx - 2.6} y={i === 0 ? -10 : -20 + Math.abs(fx) * 0.4} width={5.2} height={i === 0 ? 16 : 22} rx={2.6} fill="#5A3A2A" transform={i === 0 ? `rotate(-30 ${fx} 0)` : undefined} />
        ))}
      </g>
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {hand(-24, 0)}
      {hand(24, 1)}
    </g>
  );
}

export default function GebetaDoubles({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Under the big tree, Haben sets out the gebeta board.
    case 0:
      return (
        <Shade id={id}>
          <Gebeta x={190} y={232} pits={all(0)} s={0.78} />
          <g transform="translate(300 250)">
            <path d="M-14 0 Q-18 -24 0 -26 Q18 -24 14 0Z" fill="#C98A3A" />
            <path d="M-6 -26 l6 -6 l6 6" stroke="#8A5A2A" strokeWidth={2} fill="none" />
          </g>
          <Place x={68} y={294} s={0.34} tap={TAP.haben}>
            <Ibex pose="wave" mood="joy" />
          </Place>
          <Place x={350} y={292} s={0.32} flip from={[440, 292]} tap={TAP.gugu}>
            <Gugu mood="happy" pose="wave" />
          </Place>
          <Place x={250} y={196} s={0.26} tap={TAP.elder}>
            <Ibex grown old mood="happy" />
          </Place>
        </Shade>
      );
    // Four and four: a double, eight.
    case 1:
      return (
        <Shade id={id}>
          <Gebeta x={200} y={200} pits={all(4)} glow={[2, 8]} glowAt={1} s={0.9} />
          <SumCard x={200} y={110} tokens={["4", "+", "4", "=", "8"]} start={1.6} hl={{ 4: "#E8513B" }} />
          <Place x={56} y={296} s={0.3} tap={TAP.haben}>
            <Ibex pose="point" mood="happy" />
          </Place>
          <Place x={350} y={296} s={0.3} flip tap={TAP.elder}>
            <Ibex grown old mood="joy" />
          </Place>
        </Shade>
      );
    // Five and five: ten, like two hands.
    case 2:
      return (
        <Shade id={id}>
          <Gebeta x={200} y={224} pits={all(5)} glow={[3, 9]} glowAt={0.8} s={0.72} />
          <Hands x={200} y={120} t={1.2} />
          <SumCard x={200} y={64} tokens={["5", "+", "5", "=", "10"]} start={2} hl={{ 4: "#E8513B" }} size={26} />
          <Place x={350} y={296} s={0.32} flip tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
        </Shade>
      );
    // Doubles sung like a song: 6 + 6, 7 + 7, 8 + 8.
    case 3:
      return (
        <Shade id={id}>
          <Gebeta x={200} y={226} pits={[6, 7, 8, 6, 7, 8, 6, 7, 8, 6, 7, 8]} glow={[0, 6, 1, 7, 2, 8]} glowAt={1} s={0.72} />
          {[
            ["6", "12"],
            ["7", "14"],
            ["8", "16"],
          ].map(([n, t], i) => (
            <SumCard key={n} x={200} y={48 + i * 44} tokens={[n, "+", n, "=", t]} start={1.2 + i * 1.4} step={0.2} size={22} hl={{ 4: "#E8513B" }} />
          ))}
          <Place x={56} y={296} s={0.3} className="gd-sing" tap={TAP.haben}>
            <Ibex pose="wave" mood="joy" />
          </Place>
        </Shade>
      );
    // Gugu scoops six, Haben scoops seven. "I don't know that one!"
    case 4:
      return (
        <Shade id={id}>
          <Gebeta x={200} y={226} pits={[6, 7, 6, 0, 6, 7, 7, 6, 7, 0, 6, 7]} s={0.72} />
          <Label x={120} y={160} text="6" size={40} color="#2F5BD3" delay={1} />
          <Label x={280} y={160} text="7" size={40} color="#C9302C" delay={1.4} />
          <Sign x={200} y={120} kind="?" delay={2} />
          <Place x={56} y={296} s={0.32} tap={TAP.gugu}>
            <Gugu mood="worried" />
          </Place>
          <Place x={348} y={296} s={0.3} flip tap={TAP.haben}>
            <Ibex mood="happy" />
          </Place>
        </Shade>
      );
    // Seven is six and one more: double six and one more, thirteen.
    case 5:
      return (
        <Shade id={id}>
          <Rows x={200} y={150} a={6} b={7} t={0.8} />
          <SumCard x={200} y={84} tokens={["6", "+", "6", "+", "1", "=", "13"]} start={2.8} step={0.35} size={24} hl={{ 4: "#C98A0A", 6: "#E8513B" }} geezOf={13} />
          <Place x={66} y={296} s={0.34} tap={TAP.haben}>
            <Ibex pose="point" mood="joy" />
          </Place>
          <Place x={340} y={296} s={0.32} flip tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
        </Shade>
      );
    // A near double: eight and nine is double eight and one more, seventeen.
    case 6:
      return (
        <Shade id={id}>
          <Rows x={200} y={150} a={8} b={9} t={0.8} />
          <SumCard x={200} y={84} tokens={["8", "+", "8", "+", "1", "=", "17"]} start={2.4} step={0.3} size={24} hl={{ 4: "#C98A0A", 6: "#E8513B" }} />
          <Place x={56} y={296} s={0.3} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Place x={350} y={296} s={0.3} flip tap={TAP.elder}>
            <Ibex grown old mood="joy" />
          </Place>
        </Shade>
      );
    // Five and four: double four and one more, or double five and one less. Nine both ways.
    case 7:
      return (
        <Shade id={id}>
          <Rows x={110} y={170} a={4} b={5} t={0.6} />
          <Rows x={290} y={170} a={5} b={5} t={2.4} />
          <g className="lali-fade-in" style={d(3.8)}>
            <path d="M339 182 l12 12 M351 182 l-12 12" stroke="#E2463F" strokeWidth={3} strokeLinecap="round" />
          </g>
          <SumCard x={110} y={110} tokens={["4", "+", "4", "+", "1"]} start={1.8} step={0.2} size={20} hl={{ 4: "#C98A0A" }} />
          <SumCard x={290} y={110} tokens={["5", "+", "5", "−", "1"]} start={4} step={0.2} size={20} hl={{ 4: "#E2463F" }} />
          <Label x={200} y={262} text="= 9" size={34} color="#E8513B" delay={5.2} />
          <Place x={44} y={298} s={0.26} tap={TAP.haben}>
            <Ibex mood="wow" />
          </Place>
          <Place x={358} y={298} s={0.26} flip tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
        </Shade>
      );
    // {name} tries: seven and eight is double seven and one more, fifteen.
    case 8:
      return (
        <Shade id={id}>
          <Rows x={200} y={150} a={7} b={8} t={0.8} />
          <SumCard x={200} y={84} tokens={["7", "+", "7", "+", "1", "=", "15"]} start={2.4} step={0.3} size={24} hl={{ 4: "#C98A0A", 6: "#E8513B" }} geezOf={15} />
          <BeeHover x={340} y={230} s={1.2} flip />
          <Place x={60} y={296} s={0.3} tap={TAP.haben}>
            <Ibex pose="wave" mood="joy" />
          </Place>
        </Shade>
      );
    // The game goes on until the shadows grow long.
    case 9:
      return (
        <Shade id={id} time="evening">
          <Gebeta x={200} y={232} pits={[3, 0, 9, 2, 5, 4, 7, 1, 0, 6, 3, 8]} s={0.72} />
          <g className="gd-hop">
            <Place x={70} y={292} s={0.32} tap={TAP.gugu}>
              <Gugu mood="joy" pose="hop" />
            </Place>
          </g>
          <Place x={336} y={294} s={0.32} flip tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Sparkles x={200} y={150} r={50} delay={1} n={6} />
        </Shade>
      );
    // The biggest double: ten and ten, all their fingers: twenty.
    case 10:
      return (
        <Shade id={id} time="evening">
          <Hands x={140} y={150} t={1} s={0.9} />
          <Hands x={260} y={150} t={1.8} s={0.9} />
          <SumCard x={200} y={76} tokens={["10", "+", "10", "=", "20"]} start={2.8} hl={{ 4: "#E8513B" }} geezOf={20} />
          <Place x={200} y={296} s={0.34} tap={TAP.elder}>
            <Ibex grown old mood="joy" />
          </Place>
          <Place x={70} y={296} s={0.3} tap={TAP.haben}>
            <Ibex pose="wave" mood="joy" />
          </Place>
          <Place x={330} y={296} s={0.3} flip tap={TAP.gugu}>
            <Gugu pose="wave" mood="joy" />
          </Place>
        </Shade>
      );
    // Walking home, counting steps in doubles: two, four, six…
    case 11:
      return (
        <Shade id={id} time="evening">
          {[2, 4, 6, 8].map((n, i) => (
            <Label key={n} x={120 + i * 50} y={170 - i * 8} text={String(n)} size={24} color="#E8513B" delay={1 + i * 0.7} />
          ))}
          <Place x={250} y={290} s={0.32} from={[90, 290]} dur={3.4} tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <Place x={170} y={292} s={0.32} from={[30, 292]} dur={3.4} tap={TAP.haben}>
            <Ibex mood="joy" />
          </Place>
          <BeeHover x={320} y={120} s={1} flip />
        </Shade>
      );
    default:
      return null;
  }
}
