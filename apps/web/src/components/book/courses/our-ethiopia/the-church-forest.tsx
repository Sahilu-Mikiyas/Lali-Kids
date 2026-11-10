"use client";

import "./the-church-forest.css";

import { useId, type ReactNode } from "react";

import { Air, Depth, Mountains, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Cub, Grandma, Gugu, OnHead, Papa, TAP, Tsehay } from "./kit-cast";
import { Spring } from "./kit-more";
import { ChurchForest, Ibis, Raven, Sapling } from "./kit-past";
import { SkyFor, type Time } from "./kit-places";
import { Hearts, Notes, Sign, Sparkles, Speech } from "./kit-props";

/*
  "The Island of Trees": one living picture per page (12 pages). Dry brown fields and one round
  green forest; inside, cool and shady under old junipers and wild olives; the wattled ibises
  shouting; the thick-billed raven and the sunbirds; homes, springs and shade; the nibbled
  stumps and the gap in the wall; Tsehay notices the pattern; the bell and the village children;
  stones passed hand to hand and the goat walks off; planting seedlings in the gap; leaving at
  sunset. Moves: the-church-forest.css, kit.css, kit-land.css and lali-* (globals.css).
*/

/** Abba Kidane, the priest: a white turban, a white shamma and a small hand cross. */
function Priest({ mood = "happy" as "happy" | "joy" | "wow", bell = false }) {
  return (
    <g>
      <Papa mood={mood} />
      <g className="lali-breathe">
        <path d="M70 232 Q74 192 100 186 Q126 192 130 232Z" fill="#2A2A3A" />
        <path d="M52 156 Q100 184 148 156 L154 232 L130 232 Q126 196 100 188 Q74 196 70 232 L46 232Z" fill="#FFFDF4" />
        <path d="M48 216 L70 218 M130 218 L152 216" stroke="#2E9A8A" strokeWidth={4} fill="none" />
      </g>
      <OnHead>
        <path d="M60 50 Q100 4 140 50 Q100 38 60 50Z" fill="#FFFFFF" />
        <path d="M62 48 Q100 30 138 48" stroke="#E8E2D2" strokeWidth={3} fill="none" />
      </OnHead>
      {bell ? (
        <g transform="translate(170 150)">
          <path d="M0 -20 V-6" stroke="#6A4A2A" strokeWidth={3} />
          <g className="cf-ring">
            <path d="M-10 10 Q-10 -8 0 -8 Q10 -8 10 10Z" fill="#E0B040" />
            <circle cx={0} cy={12} r={3} fill="#A07820" />
          </g>
        </g>
      ) : (
        <g transform="translate(168 168)" fill="#F5B21E">
          <rect x={-2} y={-18} width={4} height={30} rx={1} />
          <rect x={-10} y={-10} width={20} height={4} rx={1} />
          <circle cx={0} cy={-20} r={3} />
        </g>
      )}
    </g>
  );
}

/** A goat with little horns and a beard. */
function Goat({ x, y, s = 1, flip = false, munch = false }: { x: number; y: number; s?: number; flip?: boolean; munch?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <Tappable reaction="bounce" sound="baa">
        <path d="M-14 0 V-16 M-8 0 V-16 M8 0 V-16 M14 0 V-16" stroke="#C9BCA8" strokeWidth={3.4} strokeLinecap="round" />
        <path d="M-14 0 h-2 M-8 0 h-2 M8 0 h-2 M14 0 h-2" stroke="#4A3A2A" strokeWidth={3} strokeLinecap="round" />
        <ellipse cx={0} cy={-22} rx={20} ry={10} fill="#F2EEE2" />
        <path d="M-20 -26 l-6 -6" stroke="#F2EEE2" strokeWidth={4} strokeLinecap="round" />
        <g className={munch ? "lali-tilt" : undefined} style={munch ? vars({ "--tilt": "8deg", "--dur": "0.8s" }) : undefined}>
          <path d="M14 -28 Q18 -36 24 -36" stroke="#F2EEE2" strokeWidth={8} strokeLinecap="round" fill="none" />
          <path d="M22 -42 q-4 -8 -10 -8 M26 -42 q-2 -8 -6 -11" stroke="#8A7A6A" strokeWidth={2.4} fill="none" strokeLinecap="round" />
          <ellipse cx={30} cy={-34} rx={10} ry={6.4} fill="#F2EEE2" transform="rotate(28 30 -34)" />
          <ellipse cx={20} cy={-36} rx={6} ry={2.6} fill="#E0D4C0" transform="rotate(-20 20 -36)" />
          <circle cx={29} cy={-37} r={1.5} fill="#1B1B2A" />
          <path d="M34 -27 l0 7" stroke="#C9BCA8" strokeWidth={3} strokeLinecap="round" />
        </g>
      </Tappable>
    </g>
  );
}

/** A tiny sunbird, shining green and blue, darting between flowers. */
function Sunbird({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="oe-bob" style={vars({ "--dur": "0.8s", "--delay": `${delay}s` })}>
        <ellipse cx={0} cy={0} rx={6} ry={3.4} fill="#2E9A8A" />
        <circle cx={6} cy={-2} r={3} fill="#2F6FD0" />
        <path d="M8 -2 Q14 0 16 4" stroke="#1B1B2A" strokeWidth={1.2} fill="none" />
        <path d="M-6 0 l-6 2" stroke="#2E6A5A" strokeWidth={2} />
        <ellipse cx={0} cy={-3} rx={4} ry={2} fill="#E2463F" opacity={0.8} />
      </g>
    </g>
  );
}

/** Dry, brown, cleared fields to the horizon. */
function DryFields({ id, time = "day", children }: { id: string; time?: Time; children?: ReactNode }) {
  return (
    <g>
      <SkyFor id={id} time={time} />
      <Mountains far="#C8C0B0" mid="#B0A48E" />
      <path d="M-10 170 Q200 150 410 172 L410 310 L-10 310Z" fill={time === "evening" ? "#A8784A" : "#C8A06A"} />
      {[190, 214, 244, 280].map((y, i) => (
        <path key={y} d={`M-10 ${y} Q200 ${y - 14 + i * 2} 410 ${y + 2}`} stroke="#B08A58" strokeWidth={2} fill="none" />
      ))}
      {children}
    </g>
  );
}

/** Inside the forest: tall trunks, a roof of leaves and dappled light. */
function Inside({ children }: { children?: ReactNode }) {
  return (
    <g>
      <rect width={400} height={300} fill="#2E5A3A" />
      <Depth z={-0.3}>
        {[20, 90, 170, 250, 330, 390].map((x, i) => (
          <rect key={x} x={x - 8} y={0} width={16} height={240} fill={i % 2 ? "#4A3A2A" : "#5A4430"} opacity={0.6} />
        ))}
      </Depth>
      <path d="M-10 -10 Q60 70 140 30 Q220 80 300 34 Q360 70 410 20 L410 -10Z" fill="#1E4A2E" />
      {[40, 130, 290, 360].map((x, i) => (
        <g key={x}>
          <rect x={x - 12} y={20} width={24} height={230} fill={i % 2 ? "#6A4A30" : "#5A3E28"} />
          <g className="lali-sway" style={vars({ "--dur": `${5 + i}s` })}>
            <ellipse cx={x} cy={40} rx={56} ry={40} fill={i % 2 ? "#2E6A3A" : "#3A7A42"} />
          </g>
        </g>
      ))}
      {[[80, 140], [220, 110], [320, 170], [180, 200]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx={18} ry={8} fill="#FFF6C0" opacity={0.18} className="lali-pulse" style={vars({ "--dur": `${3 + i}s` })} />
      ))}
      <path d="M-10 236 Q200 222 410 238 L410 310 L-10 310Z" fill="#3E5A2E" />
      <path d="M-10 236 Q200 222 410 238" stroke="#5A7A3A" strokeWidth={3} fill="none" />
      {children}
    </g>
  );
}

/** The old stone wall round the forest, with a gap or mended. */
function StoneWall({ y, gap = true, mended = false }: { y: number; gap?: boolean; mended?: boolean }) {
  const stones = [];
  for (let row = 0; row < 3; row++) {
    for (let i = 0; i < 12; i++) {
      const x = -10 + i * 36 + (row % 2) * 18;
      const inGap = x > 220 && x < 300;
      if (gap && inGap && row > 0) continue;
      if (gap && inGap && row === 0 && !mended) continue;
      stones.push(<rect key={`${row}-${i}`} x={x} y={y - 16 - row * 14} width={34} height={14} rx={6} fill={inGap && mended ? "#B0A898" : row % 2 ? "#9A9AA6" : "#8A8A96"} stroke="#6A6A76" strokeWidth={1.4} />);
    }
  }
  return <g>{stones}</g>;
}

/** The forest edge: the wall, the old trees behind it. */
function Edge({ id, children }: { id: string; children?: ReactNode }) {
  return (
    <g>
      <SkyFor id={id} time="day" />
      <path d="M-10 110 Q60 50 140 80 Q220 40 300 76 Q360 50 410 70 L410 220 L-10 220Z" fill="#2E6A3A" />
      {[30, 110, 190, 270, 350].map((x) => (
        <rect key={x} x={x - 6} y={120} width={12} height={110} fill="#5A3E28" />
      ))}
      <path d="M-10 214 Q200 204 410 216 L410 310 L-10 310Z" fill="#7AA25A" />
      {children}
    </g>
  );
}

export default function TheChurchForest({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Grandma and Tsehay on the hilltop; dry brown fields all around.
    case 0:
      return (
        <g>
          <DryFields id={id} />
          <Place x={120} y={300} s={0.48} tap={TAP.grandma}>
            <Grandma mood="happy" />
          </Place>
          <Place x={270} y={300} s={0.42} flip tap={TAP.tsehay}>
            <Tsehay mood="worried" />
          </Place>
          <Air kind="day" seed={2} grass={false} />
        </g>
      );
    // A round, dark-green forest like an island in a brown sea. "The church is hiding inside."
    case 1:
      return (
        <g>
          <DryFields id={id}>
            <ChurchForest x={220} y={210} s={1.1} />
          </DryFields>
          <Place x={60} y={300} s={0.4} tap={TAP.elder}>
            <Priest mood="joy" />
          </Place>
          <Place x={350} y={300} s={0.36} flip tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
          <Sparkles x={220} y={170} r={60} delay={1} n={6} />
          <Air kind="day" seed={3} grass={false} />
        </g>
      );
    // Cool and shady inside: old junipers and wild olives, protected for hundreds of years.
    case 2:
      return (
        <g>
          <Inside />
          <Place x={110} y={300} s={0.46} tap={TAP.elder}>
            <Priest mood="happy" />
          </Place>
          <Place x={270} y={300} s={0.42} flip tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
          <Air kind="day" seed={4} grass={false} />
        </g>
      );
    // "Haa-haa-haa!" Two wattled ibises fly up shouting. Tsehay jumps.
    case 3:
      return (
        <g>
          <Inside>
            <g className="cf-flyup" style={vars({ "--fx": "140px", "--fy": "-150px", "--delay": "0.4s" })}>
              <Ibis x={200} y={230} s={1.6} />
            </g>
            <g className="cf-flyup" style={vars({ "--fx": "180px", "--fy": "-120px", "--delay": "0.9s" })}>
              <Ibis x={150} y={240} s={1.5} />
            </g>
          </Inside>
          <Speech x={300} y={80} w={92} h={36} tail="left" delay={0.4}>
            <text x={0} y={6} fontSize={16} fontWeight={700} textAnchor="middle" fill="#1B2A4E" fontFamily="var(--font-grandstander), sans-serif">
              Haa-haa!
            </text>
          </Speech>
          <Place x={80} y={300} s={0.42} tap={TAP.tsehay}>
            <Tsehay mood="wow" pose="hop" />
          </Place>
          <Place x={340} y={300} s={0.44} flip tap={TAP.grandma}>
            <Grandma mood="joy" arm="clap" />
          </Place>
        </g>
      );
    // A huge black raven with a great bill and a white patch; tiny sunbirds flash between flowers.
    case 4:
      return (
        <g>
          <Inside>
            <path d="M130 100 Q220 92 330 104" stroke="#5A3E28" strokeWidth={10} strokeLinecap="round" fill="none" />
            <Raven x={240} y={98} s={2.4} />
            {[[90, 200], [330, 210], [360, 180]].map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y + 14} r={5} fill="#E2463F" />
                <circle cx={x + 10} cy={y + 18} r={4} fill="#F5B21E" />
              </g>
            ))}
            <Sunbird x={100} y={190} />
            <Sunbird x={340} y={176} delay={0.4} />
          </Inside>
          <Place x={90} y={300} s={0.4} tap={TAP.elder}>
            <Priest mood="happy" />
          </Place>
          <Place x={180} y={300} s={0.36} tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
        </g>
      );
    // "The forest gives the birds homes, keeps the springs flowing, and gives us shade." Every tree is a home!
    case 5:
      return (
        <g>
          <Inside>
            <Spring x={300} y={250} bright />
            <Raven x={130} y={40} s={1.2} />
            <Ibis x={360} y={232} s={1.1} flip />
          </Inside>
          <Place x={110} y={300} s={0.46} tap={TAP.elder}>
            <Priest mood="happy" />
          </Place>
          <Place x={210} y={300} s={0.4} tap={TAP.tsehay}>
            <Tsehay mood="happy" />
          </Place>
          <Hearts spots={[[150, 120, 0.8], [300, 180, 1.4]]} />
        </g>
      );
    // At the edge: young trees nibbled to stumps, and a goat coming through a gap in the wall. Munch!
    case 6:
      return (
        <g>
          <Edge id={id}>
            {[160, 200, 240, 300].map((x) => (
              <path key={x} d={`M${x} 250 v-10`} stroke="#6A5A3A" strokeWidth={4} strokeLinecap="round" />
            ))}
            <StoneWall y={236} />
            <g className="cf-in">
              <Goat x={262} y={262} s={1.6} flip munch />
            </g>
          </Edge>
          <Place x={80} y={300} s={0.42} tap={TAP.tsehay}>
            <Tsehay mood="sad" />
          </Place>
          <Air kind="day" seed={7} />
        </g>
      );
    // Far from the gap, the young trees are tall and green; near the gap, all eaten. "Close it!"
    case 7:
      return (
        <g>
          <Edge id={id}>
            <StoneWall y={236} />
            {[30, 70, 110, 150].map((x) => (
              <Sapling key={x} x={x} y={208} s={1.2} potted={false} />
            ))}
            {[230, 260, 290].map((x) => (
              <path key={x} d={`M${x} 214 v-8`} stroke="#6A5A3A" strokeWidth={4} strokeLinecap="round" />
            ))}
            <circle cx={260} cy={214} r={44} fill="none" stroke="#E2463F" strokeWidth={3} strokeDasharray="8 6" className="lali-pop-in" style={vars({ "--delay": "1s" })} />
          </Edge>
          <Place x={180} y={300} s={0.44} tap={TAP.tsehay}>
            <Tsehay mood="wow" pose="point" />
          </Place>
          <Sign x={180} y={150} kind="!" delay={1.6} />
          <Air kind="day" seed={8} />
        </g>
      );
    // Abba Kidane rings the little bell; the village children come running.
    case 8:
      return (
        <g>
          <Edge id={id}>
            <StoneWall y={236} />
          </Edge>
          <Place x={70} y={300} s={0.44} tap={TAP.elder}>
            <Priest mood="joy" bell />
          </Place>
          <Place x={180} y={300} s={0.38} tap={TAP.tsehay}>
            <Tsehay mood="happy" pose="point" />
          </Place>
          <g className="oe-arrive" style={vars({ "--from": "200px", "--dur": "2s" })}>
            <Place x={280} y={300} s={0.38} flip tap={TAP.cub}>
              <Cub mood="joy" />
            </Place>
            <Place x={350} y={300} s={0.38} flip tap={TAP.gugu}>
              <Gugu mood="joy" />
            </Place>
          </g>
          <Notes x={110} y={130} color="#F5B21E" n={2} />
          <Air kind="day" seed={9} />
        </g>
      );
    // Stones passed hand to hand; the gap closes. The goat says "Meh" and goes off to the field.
    case 9:
      return (
        <g>
          <Edge id={id}>
            <StoneWall y={236} mended />
            <g className="cf-away">
              <Goat x={330} y={262} s={1.3} />
            </g>
          </Edge>
          <Place x={50} y={300} s={0.34} tap={TAP.cub}>
            <Cub mood="happy" arm="give" />
          </Place>
          <Place x={120} y={300} s={0.34} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Place x={190} y={300} s={0.34} tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
          {[0, 1, 2].map((i) => (
            <g key={i} className="cf-pass" style={vars({ "--delay": `${i}s`, "--by": "180px" })}>
              <ellipse cx={40} cy={232} rx={10} ry={7} fill="#9A9AA6" stroke="#6A6A76" strokeWidth={1.4} />
            </g>
          ))}
          <Speech x={330} y={180} w={56} h={30} tail="down" delay={2}>
            <text x={0} y={6} fontSize={14} fontWeight={700} textAnchor="middle" fill="#1B2A4E" fontFamily="var(--font-grandstander), sans-serif">
              Meh!
            </text>
          </Speech>
        </g>
      );
    // Each child gets a seedling; Tsehay plants hers right where the gap was. Every tree is a home!
    case 10:
      return (
        <g>
          <Edge id={id}>
            <StoneWall y={236} mended />
            <Sapling x={262} y={208} s={1.3} potted={false} />
            <path d="M246 210 Q262 204 278 210" stroke="#6A4A2A" strokeWidth={4} fill="none" />
          </Edge>
          <Place x={150} y={300} s={0.44} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Sapling x={70} y={290} s={1.6} />
          <Sapling x={340} y={290} s={1.6} />
          <Place x={300} y={300} s={0.4} flip tap={TAP.elder}>
            <Priest mood="joy" />
          </Place>
          <Sparkles x={262} y={180} r={26} delay={1} />
          <Air kind="day" seed={11} />
        </g>
      );
    // Leaving at sunset: the ibises fly over shouting, the raven watches. "Some bird will call it home."
    case 11:
      return (
        <g>
          <DryFields id={id} time="evening">
            <ChurchForest x={220} y={200} s={0.9} wall />
            <Raven x={300} y={150} s={0.8} />
            <g className="cf-flyup" style={vars({ "--fx": "-260px", "--fy": "-20px", "--delay": "0s" })}>
              <Ibis x={360} y={90} s={1} flip />
            </g>
          </DryFields>
          <Place x={90} y={300} s={0.44} tap={TAP.grandma}>
            <Grandma mood="happy" />
          </Place>
          <Place x={170} y={300} s={0.38} tap={TAP.tsehay}>
            <Tsehay mood="happy" />
          </Place>
          <Air kind="dusk" seed={12} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
