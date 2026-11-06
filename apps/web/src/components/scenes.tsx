"use client";

import { useId } from "react";

import type { SceneKind } from "@/content/stories";
import {
  Acacia,
  Air,
  BeeFlight,
  BeeHover,
  Bubble,
  Butterfly,
  CloudShape,
  DayBackdrop,
  Daisy,
  Fireflies,
  Flower,
  Grass,
  Heart,
  Moon,
  Mountains,
  NightBackdrop,
  NumberBadge,
  Place,
  Rock,
  Sheep,
  Sky,
  Stars,
  Tukul,
  vars,
} from "./book/scenery";
import { FlowerScene } from "./book/new-year-scenes";
import { RainbowPuddleScene } from "./book/rainbow-puddle-scenes";
import { FidelTrainScene } from "./book/fidel-train-scenes";
import { FirstDayScene } from "./book/first-day-scenes";
import { CubShape, GuguShape, STAR_PATH } from "./characters";

/*
  The drawn pictures for the launch stories. Each page is its own living picture:
  the background keeps moving, and what the page says happens a moment after it opens
  (the cloud slides off the moon, the lost sheep peeps out, the honey pot rises).
*/

/* ---------- Anbessa and the Lost Moon ---------- */

function MoonScene({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  if (page === 2) {
    // On top of the tallest mountain, counting the stars.
    return (
      <>
        <Sky id={id} from="#0B1038" mid="#1E2770" to="#3C4194" />
        <Stars seed={9} n={34} bottom={230} />
        <path d="M96 70 Q146 40 196 46 Q246 52 296 74" stroke="#FFF6C8" strokeOpacity={0.5} strokeWidth={2} strokeDasharray="0.5 7" strokeLinecap="round" fill="none" className="lali-fade-in" style={vars({ "--delay": "3.2s", "--dur": "1.2s" })} />
        {[
          [96, 70, "1", 1.4],
          [196, 46, "2", 2.1],
          [296, 74, "3", 2.8],
        ].map(([x, y, n, d]) => (
          <g key={n as string}>
            <g className="lali-pop-in" style={vars({ "--delay": `${d}s` })}>
              <circle cx={x as number} cy={y as number} r={24} fill="#FFF6C8" opacity={0.16} className="lali-pulse" />
              <path d={STAR_PATH} fill="#FFD54A" transform={`translate(${(x as number) - 21} ${(y as number) - 21}) scale(1.75)`} />
            </g>
            <NumberBadge x={x as number} y={(y as number) + 36} n={n as string} delay={(d as number) + 0.25} color="#2B3A8C" />
          </g>
        ))}
        <Mountains far="#2A3270" mid="#222A62" y={50} />
        <path d="M60 300 L150 196 Q200 176 250 196 L340 300Z" fill="#1E5A4E" />
        <path d="M150 196 Q200 176 250 196 L240 206 Q200 190 160 206Z" fill="#2E7F6A" />
        <Grass y={200} n={8} x0={160} x1={240} color="#2E7F6A" seed={4} />
        <Place x={180} y={198} s={0.3} from={[110, 262]} dur={2} delay={0.2}>
          <CubShape pose="stand" mood="wow" look={-2} />
        </Place>
        <Place x={228} y={198} s={0.27} flip>
          <GuguShape pose="point" />
        </Place>
      </>
    );
  }
  const found = page >= 3;
  return (
    <>
      <NightBackdrop id={id} seed={page + 3} />
      {/* The moon, and the cloud she hides behind. On the last page the cloud slides away. */}
      <Moon x={300} y={66} r={27} glow={found} />
      {found && (
        <g className="lali-pop-in" style={vars({ "--delay": "2.4s" })}>
          <circle cx={300} cy={66} r={52} fill="#FFF8D8" opacity={0.16} className="lali-pulse" style={vars({ "--dur": "3s" })} />
          <circle cx={300} cy={66} r={34} fill="none" stroke="#FFF8D8" strokeWidth={2} className="lali-ring" style={vars({ "--delay": "2.6s" })} />
        </g>
      )}
      <g transform={found ? "translate(204 66)" : "translate(300 74)"}>
        <g
          className={found ? "lali-move-in" : "lali-parallax"}
          style={found ? vars({ "--fx": "96px", "--fy": "8px", "--delay": "0.9s", "--dur": "2.2s" }) : vars({ "--px": "5px", "--dur": "5s" })}
        >
          <CloudShape s={1.25} color="#8E93D6" shade="#7479C0" />
        </g>
      </g>
      <Acacia x={70} y={238} s={0.85} leaf="#1C3F5E" leafDark="#152F4A" trunk="#152F4A" />
      <Tukul x={346} y={240} s={0.62} glow smoke={false} />
      <Fireflies seed={page + 5} n={7} top={150} bottom={250} />
      <Grass y={262} n={12} color="#173F38" seed={page + 1} />
      {page === 0 && (
        <>
          <Place x={170} y={262} s={0.38}>
            <CubShape pose="stand" mood="worried" look={2} />
          </Place>
          <Bubble x={226} y={150} w={44} delay={0.9}>
            ?
          </Bubble>
        </>
      )}
      {page === 1 && (
        <>
          <Place x={130} y={262} s={0.36} from={[60, 262]} dur={1.4} delay={0.3}>
            <CubShape pose="walk" mood="worried" />
          </Place>
          <Place x={254} y={262} s={0.34} flip>
            <GuguShape pose="no" mood="worried" />
          </Place>
          <Bubble x={160} y={138} w={44} delay={1.2} tail="right">
            ?
          </Bubble>
        </>
      )}
      {found && (
        <>
          <Place x={150} y={262} s={0.38} className="lali-hop" >
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Place x={240} y={262} s={0.34}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Bubble x={150} y={146} w={128} delay={2.6} tail="right">
            There you are!
          </Bubble>
        </>
      )}
    </>
  );
}

/* ---------- Gugu Counts the Sheep ---------- */

function CountScene({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  const flock: [number, number][] = [
    [96, 236],
    [160, 246],
    [222, 232],
  ];
  return (
    <>
      <DayBackdrop id={id} sun={[60, 54]} />
      <Acacia x={350} y={200} s={0.7} />
      <Tukul x={40} y={206} s={0.5} />
      <path d="M8 218 L76 218 M8 228 L76 228" stroke="#A97A4E" strokeWidth={3} />
      {[12, 30, 48, 66].map((x) => (
        <rect key={x} x={x} y={212} width={4} height={22} rx={2} fill="#8A5E3A" />
      ))}
      <Grass y={262} n={14} seed={21} />
      <Flower x={30} y={250} h={30} color="#FF8FB1" s={0.7} delay={-1} />
      <Daisy x={380} y={270} h={26} delay={-0.5} />
      {page !== 2 && <Butterfly x={page === 3 ? 210 : 140} y={170} color="#B98CFF" delay={-0.8} />}
      {/* the fourth sheep hides behind the rock until page three */}
      {page >= 2 && (
        <g className={page === 2 ? "lali-rise-in" : undefined} style={vars({ "--fy": "34px", "--delay": "1s" })}>
          <Sheep x={page === 3 ? 290 : 318} y={page === 3 ? 244 : 204} s={0.95} flip={page === 2} />
        </g>
      )}
      {page < 3 && <Rock x={320} y={250} s={1.1} />}
      {flock.map(([x, y], i) => (
        <g key={i}>
          <Sheep x={x} y={y} s={0.95} delay={-i * 0.7} hop={page === 3} />
          {page >= 1 && <NumberBadge x={x + 4} y={y - 40} n={String(i + 1)} delay={0.8 + i * 0.6} />}
        </g>
      ))}
      {page === 1 && (
        <Bubble x={300} y={150} w={44} delay={2.8}>
          ?
        </Bubble>
      )}
      {page === 2 && (
        <Bubble x={330} y={170} w={64} delay={2} tail="right">
          Baa!
        </Bubble>
      )}
      {page === 3 && <NumberBadge x={294} y={204} n="4" delay={2.6} />}
      {page === 0 && (
        <Place x={300} y={262} s={0.34} flip>
          <GuguShape pose="wave" />
        </Place>
      )}
      {page === 1 && (
        <Place x={282} y={266} s={0.34} flip>
          <GuguShape pose="point" mood="worried" />
        </Place>
      )}
      {page === 2 && (
        <Place x={272} y={268} s={0.34}>
          <GuguShape pose="sit" mood="wow" />
        </Place>
      )}
      {page === 3 && (
        <Place x={354} y={264} s={0.32} className="lali-hop">
          <GuguShape pose="wave" mood="joy" />
        </Place>
      )}
    </>
  );
}

/* ---------- Lali Shares the Honey ---------- */

function HoneyPot({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={2} rx={30} ry={5} fill="#000" opacity={0.12} />
      <path d="M-26 -30 Q-34 -2 -18 0 L18 0 Q34 -2 26 -30Z" fill="#C9772A" />
      <rect x={-22} y={-40} width={44} height={11} rx={5} fill="#A65A1A" />
      <path d="M-20 -30 Q-18 -18 -14 -22 Q-10 -10 -6 -24 Q0 -14 4 -26 Q8 -16 12 -24 Q16 -12 20 -30Z" fill="#FFC83D" />
      <path d="M-14 -16 Q-18 -8 -14 -6" stroke="#fff" strokeOpacity={0.5} strokeWidth={3} fill="none" strokeLinecap="round" />
      <text x={0} y={-6} fontSize={9} fontFamily="var(--font-grandstander)" fontWeight={900} fill="#FFE9B0" textAnchor="middle">
        ማር
      </text>
    </g>
  );
}

function ShareScene({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  return (
    <>
      <DayBackdrop id={id} birds={page !== 1} />
      <Acacia x={350} y={204} s={0.6} />
      <Grass y={266} n={16} seed={31} />
      <Flower x={92} y={164} h={86} color="#FF8FB1" s={1.25} />
      <Flower x={40} y={214} h={46} color="#B98CFF" delay={-1.2} />
      <Flower x={150} y={222} h={36} color="#FF7A63" delay={-0.6} />
      <Flower x={372} y={214} h={46} color="#FF8FB1" delay={-2} />
      <Daisy x={200} y={276} h={22} delay={-1} />
      <Daisy x={320} y={280} h={20} delay={-2.2} />
      {page !== 1 && <Butterfly x={330} y={150} color="#FF7A63" delay={-1.4} />}
      {page === 0 && (
        <>
          {/* sparkles of nectar in the big flower */}
          {[
            [78, 146],
            [106, 140],
            [92, 128],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={2.6} fill="#FFF6B0" className="lali-twinkle" style={vars({ "--delay": `${-i * 0.6}s`, "--dur": "1.4s" })} />
          ))}
          <g className="lali-move-in" style={vars({ "--fx": "180px", "--fy": "-60px", "--dur": "2.4s", "--delay": "0.4s" })}>
            <BeeHover x={126} y={128} s={1.5} flip />
          </g>
        </>
      )}
      {page >= 1 && (
        <Place x={250} y={264} s={0.4} className={page === 1 ? "lali-rumble" : page === 3 ? "lali-hop" : undefined}>
          <CubShape pose="sit" mood={page === 1 ? "sad" : page === 2 ? "wow" : "joy"} />
        </Place>
      )}
      {page === 1 && (
        <>
          <g stroke="#E8513B" strokeWidth={2.6} strokeLinecap="round" fill="none" className="lali-shh">
            <path d="M200 236 q-6 -4 0 -8 q6 -4 0 -8" />
            <path d="M300 236 q6 -4 0 -8 q6 -4 0 -8" />
          </g>
          <BeeHover x={150} y={120} s={1.5} />
        </>
      )}
      {page >= 2 && (
        <g className={page === 2 ? "lali-rise-in" : undefined} style={vars({ "--fy": "50px", "--delay": "0.9s" })}>
          <HoneyPot x={182} y={272} />
          {/* golden glints on the honey */}
          {[
            [170, 238, 0],
            [194, 236, -0.7],
          ].map(([x, y, d]) => (
            <circle key={x} cx={x} cy={y} r={2.2} fill="#FFF6B0" className="lali-twinkle" style={vars({ "--delay": `${d}s`, "--dur": "1.6s" })} />
          ))}
        </g>
      )}
      {page === 2 && <BeeHover x={190} y={150} s={1.5} />}
      {page === 3 && (
        <>
          <Heart x={208} y={170} s={1.4} delay={0} />
          <Heart x={300} y={150} s={1.1} delay={-1.1} />
          <Heart x={160} y={190} s={0.9} delay={-2.2} />
          <BeeFlight path="M150 150 C150 90 250 70 300 110 C330 135 300 165 280 145 C260 125 290 100 320 120 C360 150 260 200 200 180 C170 170 150 165 150 150Z" dur={8} s={1.3} rest={[300, 110]} />
        </>
      )}
    </>
  );
}

/** Pollen, motes and near grass in front of each launch-story picture. */
const AIR: Partial<Record<SceneKind, (page: number) => "day" | "dusk" | "night">> = {
  moon: () => "night",
  count: () => "day",
  share: () => "day",
  newyear: (p) => (p === 8 || p === 9 ? "night" : p === 11 ? "dusk" : "day"),
};

/** The picture for one page of a story. Fills its box, cropping to keep a 4:3 scene. */
export function Scene({ kind, page, className }: { kind: SceneKind; page: number; className?: string }) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className ?? "block h-full w-full"} aria-hidden>
      {kind === "moon" && <MoonScene page={page} />}
      {kind === "count" && <CountScene page={page} />}
      {kind === "share" && <ShareScene page={page} />}
      {kind === "newyear" && <FlowerScene page={page} />}
      {kind === "rainbow" && <RainbowPuddleScene page={page} />}
      {kind === "fideltrain" && <FidelTrainScene page={page} />}
      {kind === "firstday" && <FirstDayScene page={page} />}
      {AIR[kind] && <Air kind={AIR[kind](page)} seed={page * 7 + 3} grass={!(kind === "moon" && page === 2)} />}
    </svg>
  );
}
