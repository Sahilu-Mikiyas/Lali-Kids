"use client";

import "./walia-on-the-ledge.css";

import { useId, type ReactNode } from "react";

import { Air, Depth, Mountains, NumberBadge, Place, Rock, Stars, vars } from "../../scenery";
import { Ibex, TAP } from "./kit-cast";
import { SimienEdge, WildGelada, WildIbex } from "./kit-land";
import { ParkSign } from "./kit-past";
import { SkyFor } from "./kit-places";
import { Dabo, Hearts, Sign, Sparkles, Speech } from "./kit-props";

/*
  "Haben Counts the Walia": one living picture per page (12 pages). Uncle Mesfin the scout; the
  cliff edge and the lammergeier; Haben runs at the geladas with bread; the scouts' rule; the
  geladas grazing; the binoculars and the walia on the ledge; long ago few walia, now more; the
  scouts say eleven; the shadow under the rock; thirteen; "I sat still"; the notebook at night.
  Moves: walia-on-the-ledge.css, kit.css, kit-land.css and lali-* (globals.css).
*/

const SCOUT_GREEN = "#4E6A3A";

/** Uncle Mesfin, a park scout: a grown walia in a green scout jacket and cap, binoculars round his neck. */
function Scout({ mood = "happy" as "happy" | "joy" | "wow" | "worried", pose = "sit" as "sit" | "wave" | "point" }) {
  return (
    <g>
      <Ibex grown mood={mood} pose={pose} />
      <g className="lali-breathe">
        <path d="M60 154 Q100 176 140 154 L144 204 Q100 218 56 204Z" fill={SCOUT_GREEN} />
        <path d="M100 172 V214" stroke="#3A5028" strokeWidth={2} />
        <rect x={110} y={186} width={16} height={12} rx={2} fill="#3A5028" />
        <path d="M84 160 Q100 190 116 160" stroke="#2A2A2A" strokeWidth={2} fill="none" />
        <g fill="#2A2A2A">
          <rect x={86} y={182} width={12} height={16} rx={4} />
          <rect x={102} y={182} width={12} height={16} rx={4} />
        </g>
      </g>
      <g className="lali-tilt" style={vars({ "--tilt": "-6deg", "--dur": "5.8s" })}>
        <path d="M64 74 Q100 38 136 74 Q100 62 64 74Z" fill={SCOUT_GREEN} />
        <path d="M120 70 Q146 68 150 76 Q132 76 120 74Z" fill="#3A5028" />
      </g>
    </g>
  );
}

/** A lammergeier: long narrow wings, a wedge tail and a pale orange head. */
function Lammergeier({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <g className="oe-soar">
        <path d="M0 0 Q-30 -10 -64 -2 Q-34 2 -4 8Z" fill="#2E2A2A" />
        <path d="M0 0 Q30 -10 64 -2 Q34 2 4 8Z" fill="#2E2A2A" />
        <path d="M-6 4 L-16 22 L0 16 L16 22 L6 4Z" fill="#2E2A2A" />
        <ellipse cx={0} cy={4} rx={7} ry={10} fill="#D98A4A" />
        <circle cx={0} cy={-8} r={5} fill="#E8C8A0" />
        <path d="M-2 -4 l-2 4 M2 -4 l2 4" stroke="#2E2A2A" strokeWidth={1.4} />
      </g>
    </g>
  );
}

/** The cliffs where the walia live: steep grey rock, narrow ledges. */
function Cliffs({ id, time = "day", children }: { id: string; time?: "day" | "evening" | "night"; children?: ReactNode }) {
  return (
    <g>
      <SkyFor id={id} time={time} />
      <Mountains far="#B4C2E0" mid="#93A6CE" />
      <path d="M-10 310 L-10 80 L40 60 L90 90 L130 70 L180 110 L240 80 L300 104 L350 70 L410 90 L410 310Z" fill="#8A8278" />
      {[[30, 130, 120], [150, 168, 140], [60, 214, 160], [230, 140, 150], [260, 212, 140], [120, 256, 180]].map(([x, y, w], i) => (
        <g key={i}>
          <path d={`M${x} ${y} h${w} l-6 8 h-${w - 12}Z`} fill="#6E675E" />
          <path d={`M${x} ${y} h${w}`} stroke="#A9A096" strokeWidth={3} />
          <path d={`M${x + 20} ${y - 2} q6 -8 12 0 M${x + w - 30} ${y - 2} q5 -7 10 0`} stroke="#7A9A4A" strokeWidth={3} fill="none" />
        </g>
      ))}
      <path d="M110 96 L116 150 M340 90 L332 160 M200 170 L214 300" stroke="#7A736A" strokeWidth={2} />
      {children}
    </g>
  );
}

/** A geladas' meadow on the plateau: a few wild geladas grazing. */
function Meadow({ id, n = 7, children }: { id: string; n?: number; children?: ReactNode }) {
  const spots: [number, number, number, boolean][] = [
    [40, 236, 0.9, false],
    [96, 226, 0.8, true],
    [150, 238, 1, false],
    [250, 230, 0.85, true],
    [300, 242, 1, false],
    [356, 228, 0.8, true],
    [200, 222, 0.7, false],
  ];
  return (
    <SimienEdge id={id}>
      {spots.slice(0, n).map(([x, y, s, f], i) => (
        <WildGelada key={i} x={x} y={y} s={s} flip={f} />
      ))}
      {children}
    </SimienEdge>
  );
}

/** A little round icon: the walia mother, the kid, or the bread. */
function WaliaIcon({ x, y, kid = false }: { x: number; y: number; kid?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${kid ? 0.7 : 1})`}>
      <ellipse cx={0} cy={0} rx={12} ry={6} fill="#8A6A4A" />
      <path d="M8 -4 L14 -12 L18 -8 L14 -2Z" fill="#8A6A4A" />
      <path d="M14 -12 C12 -20 6 -22 0 -20" stroke="#5A4A3A" strokeWidth={2.4} fill="none" />
      <path d="M-8 4 v8 M-3 4 v8 M4 4 v8 M9 4 v8" stroke="#6B4E36" strokeWidth={2} />
    </g>
  );
}

export default function WaliaOnTheLedge({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Uncle Mesfin the scout: "Every year we count the walia. Would you like to help?"
    case 0:
      return (
        <g>
          <SimienEdge id={id}>
            <ParkSign x={200} y={252} s={1.1}>
              <WaliaIcon x={-2} y={2} />
            </ParkSign>
          </SimienEdge>
          <Place x={88} y={300} s={0.5} tap={TAP.elder}>
            <Scout mood="joy" pose="wave" />
          </Place>
          <Place x={316} y={300} s={0.44} flip tap={TAP.haben}>
            <Ibex mood="wow" />
          </Place>
          <Sparkles x={316} y={190} r={34} delay={0.8} />
          <Air kind="day" seed={3} />
        </g>
      );
    // Along the edge of the cliffs; valleys below, mountains like castles; a lammergeier glides past.
    case 1:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <Mountains far="#AFC0E2" mid="#8AA2CC" y={20} />
          <Depth z={-0.3}>
            <path d="M120 300 L150 150 L170 120 L196 160 L214 110 L236 150 L262 300Z" fill="#7A8A6A" />
            <path d="M210 300 L250 170 L266 140 L292 180 L320 300Z" fill="#6E7E60" />
          </Depth>
          <path d="M-10 310 L-10 200 L60 196 L110 214 L120 310Z" fill="#8AA25A" />
          <path d="M-10 200 L60 196 L110 214 L120 310" stroke="#6A7A42" strokeWidth={4} fill="none" />
          <g transform="translate(0 70)">
            <g className="wl-glide">
              <Lammergeier s={0.9} />
            </g>
          </g>
          <Place x={40} y={268} s={0.36} tap={TAP.elder}>
            <Scout pose="point" />
          </Place>
          <Place x={90} y={276} s={0.32} tap={TAP.haben}>
            <Ibex mood="wow" />
          </Place>
          <Air kind="day" seed={4} grass={false} />
        </g>
      );
    // Hundreds of geladas on a meadow. Haben runs at them with bread: "Here, monkeys!"
    case 2:
      return (
        <g>
          <Meadow id={id} />
          <g className="wl-run">
            <Place x={120} y={300} s={0.42} tap={TAP.haben}>
              <Ibex mood="joy" pose="point" />
            </Place>
            <Dabo x={196} y={238} s={0.4} />
          </g>
          <Sign x={300} y={180} kind="!" delay={1.6} color="#E2463F" />
          <Air kind="day" seed={5} />
        </g>
      );
    // Uncle Mesfin holds her back: quiet feet, far eyes: the wild stays wild!
    case 3:
      return (
        <g>
          <Meadow id={id} n={5} />
          <Place x={110} y={300} s={0.46} tap={TAP.elder}>
            <Scout mood="happy" pose="point" />
          </Place>
          <Place x={200} y={300} s={0.4} tap={TAP.haben}>
            <Ibex mood="worried" />
          </Place>
          <Speech x={300} y={110} w={110} h={46} tail="left" delay={0.8}>
            <g transform="translate(-30 0)">
              <ellipse cx={0} cy={0} rx={10} ry={6} fill="#F3E3C8" stroke="#1B2A4E" strokeWidth={1.6} />
              <circle cx={0} cy={0} r={3} fill="#1B2A4E" />
            </g>
            <path d="M-8 -10 l20 20 M12 -10 l-20 20" stroke="#E2463F" strokeWidth={3} strokeLinecap="round" />
            <g transform="translate(34 0) scale(0.4)">
              <ellipse cx={0} cy={0} rx={30} ry={18} fill="#E8B068" stroke="#1B2A4E" strokeWidth={3} />
            </g>
            <path d="M24 -12 l20 24 M44 -12 l-20 24" stroke="#E2463F" strokeWidth={3} strokeLinecap="round" />
          </Speech>
          <Air kind="day" seed={6} />
        </g>
      );
    // Haben sits still; the geladas pull grass with quick fingers; red patches on their chests.
    case 4:
      return (
        <g>
          <SimienEdge id={id}>
            <g transform="translate(150 266) scale(2.6)">
              <WildGelada x={0} y={0} />
            </g>
            <g transform="translate(270 262) scale(2.2)">
              <WildGelada x={0} y={0} flip />
            </g>
            {[120, 176, 240, 300].map((x, i) => (
              <path key={x} d={`M${x} 270 q2 -14 0 -22 M${x + 6} 270 q-2 -12 2 -18`} stroke="#5A8A3A" strokeWidth={2.4} fill="none" className="lali-sway" style={vars({ "--dur": `${2 + i * 0.4}s` })} />
            ))}
          </SimienEdge>
          <Place x={50} y={300} s={0.36} tap={TAP.haben}>
            <Ibex mood="happy" />
          </Place>
          <Air kind="day" seed={7} />
        </g>
      );
    // Through the binoculars: on a ledge no wider than a shoe, walia. One! Two! Three!
    case 5:
      return (
        <g>
          <defs>
            <clipPath id={`${id}-bino`}>
              <circle cx={140} cy={150} r={118} />
              <circle cx={260} cy={150} r={118} />
            </clipPath>
          </defs>
          <rect width={400} height={300} fill="#1B1B22" />
          <g clipPath={`url(#${id}-bino)`}>
            <Cliffs id={`${id}c`}>
              <WildIbex x={90} y={168} s={1.4} />
              <WildIbex x={210} y={140} s={1.3} flip />
              <WildIbex x={300} y={212} s={1.4} />
            </Cliffs>
          </g>
          <NumberBadge x={90} y={110} n="1" delay={0.8} />
          <NumberBadge x={210} y={80} n="2" delay={1.6} />
          <NumberBadge x={300} y={154} n="3" delay={2.4} />
        </g>
      );
    // Long ago, very few walia were left. Then the park and the scouts: now there are many more.
    case 6:
      return (
        <g>
          <Cliffs id={id}>
            <rect x={0} y={0} width={200} height={300} fill="#5A4A3A" opacity={0.45} />
            <WildIbex x={60} y={168} s={1.2} />
            <WildIbex x={250} y={140} s={1.1} flip />
            <WildIbex x={300} y={212} s={1.2} />
            <WildIbex x={180} y={256} s={1.1} flip />
            <WildIbex x={330} y={256} s={1} />
            <WildIbex x={270} y={212} s={0.9} flip />
          </Cliffs>
          <path d="M200 0 V300" stroke="#FFFFFF" strokeWidth={4} strokeDasharray="10 8" />
          <ParkSign x={200} y={300} s={0.9}>
            <WaliaIcon x={-2} y={2} />
          </ParkSign>
          <Sparkles x={300} y={190} r={50} delay={1} n={6} />
        </g>
      );
    // The other scouts counted: "Eleven." "Eleven." Haben did not rush.
    case 7:
      return (
        <g>
          <SimienEdge id={id} />
          <Place x={70} y={300} s={0.42} tap={TAP.elder}>
            <Scout />
          </Place>
          <Place x={160} y={300} s={0.42} tap={TAP.elder}>
            <Scout mood="joy" />
          </Place>
          <Place x={320} y={300} s={0.4} flip tap={TAP.haben}>
            <Ibex mood="happy" />
          </Place>
          <NumberBadge x={70} y={150} n="11" delay={0.6} color="#4E6A3A" />
          <NumberBadge x={160} y={150} n="11" delay={1.4} color="#4E6A3A" />
          <Sign x={320} y={150} kind="?" delay={2.2} />
          <Air kind="day" seed={8} />
        </g>
      );
    // A dark shadow under a rock... it moves. A mother walia steps out, and a tiny kid behind her!
    case 8:
      return (
        <g>
          <Cliffs id={id}>
            <path d="M120 230 Q200 150 290 230Z" fill="#6E675E" />
            <path d="M140 230 Q200 190 270 230Z" fill="#3A3530" />
            <g className="wl-step">
              <WildIbex x={200} y={232} s={1.8} flip />
            </g>
            <g className="wl-step" style={vars({ "--delay": "1.8s" })}>
              <WildIbex x={150} y={234} s={1} flip />
            </g>
          </Cliffs>
          <Sparkles x={180} y={200} r={50} delay={3} n={5} />
        </g>
      );
    // "Thirteen! There's a mother and a baby under the rock!" "You found the ones we missed."
    case 9:
      return (
        <g>
          <SimienEdge id={id} />
          <Place x={90} y={300} s={0.44} tap={TAP.elder}>
            <Scout mood="joy" />
          </Place>
          <Place x={200} y={300} s={0.44} tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
          <Place x={316} y={300} s={0.42} flip tap={TAP.elder}>
            <Scout mood="wow" />
          </Place>
          <NumberBadge x={200} y={150} n="13" delay={0.6} color="#4E6A3A" />
          <Sparkles x={200} y={150} r={40} delay={1} />
          <Air kind="day" seed={9} />
        </g>
      );
    // "I didn't run. I sat still, I waited, and I kept looking." "That is how a real scout watches."
    case 10:
      return (
        <g>
          <SimienEdge id={id} time="evening" />
          <Place x={140} y={300} s={0.5} tap={TAP.elder}>
            <Scout mood="happy" pose="wave" />
          </Place>
          <Place x={250} y={300} s={0.44} flip tap={TAP.haben}>
            <Ibex mood="joy" />
          </Place>
          <Hearts spots={[[200, 140, 0.6], [220, 160, 1.2]]} />
          <Air kind="dusk" seed={10} />
        </g>
      );
    // At night, Haben's notebook: walia 13, baby walia 1, bread for geladas 0.
    case 11:
      return (
        <g>
          <SkyFor id={id} time="night" />
          <Stars seed={11} n={30} bottom={120} />
          <path d="M-10 240 Q200 226 410 242 L410 310 L-10 310Z" fill="#3A4A3A" />
          <g transform="translate(200 160)">
            <rect x={-110} y={-90} width={220} height={150} rx={8} fill="#FFFDF4" stroke="#8A6A4A" strokeWidth={3} />
            {[-50, 0, 46].map((y) => (
              <path key={y} d={`M-96 ${y + 18} H96`} stroke="#C9D6E8" strokeWidth={1.4} />
            ))}
            <WaliaIcon x={-70} y={-54} />
            <text x={10} y={-42} fontSize={30} fontWeight={700} fill="#2B3A8C" fontFamily="var(--font-grandstander), sans-serif">13</text>
            <WaliaIcon x={-70} y={-6} kid />
            <text x={10} y={6} fontSize={30} fontWeight={700} fill="#2B3A8C" fontFamily="var(--font-grandstander), sans-serif">1</text>
            <g transform="translate(-70 40) scale(0.36)">
              <ellipse cx={0} cy={0} rx={30} ry={18} fill="#E8B068" />
            </g>
            <text x={10} y={52} fontSize={30} fontWeight={700} fill="#2E9A5A" fontFamily="var(--font-grandstander), sans-serif">0</text>
          </g>
          <Place x={350} y={300} s={0.32} flip tap={TAP.haben}>
            <Ibex mood="happy" />
          </Place>
          <Air kind="night" seed={12} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
