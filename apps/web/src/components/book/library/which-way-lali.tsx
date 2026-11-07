"use client";

import { useId } from "react";

import { BeeShape, GuguShape } from "../../characters";
import { Tappable } from "../tappable";
import {
  Acacia,
  Air,
  Butterfly,
  Depth,
  DriftCloud,
  Fireflies,
  Flower,
  Grass,
  Hills,
  LightRays,
  Moon,
  Mountains,
  NumberBadge,
  Place,
  Pollen,
  Rock,
  Sky,
  Stars,
  Sun,
  Tukul,
  vars,
  Water,
} from "../scenery";
import "./which-way-lali.css";

/*
  "Which Way, Lali?": one living picture per page (14 pages, two choices).
  Lali carries her little clay honey pot all book long; it is empty until the honey tree.
  Pages 2 and 7 are the choices (a signpost at the fork, then the owl and the butterflies in the
  meadow); 3-4 the river path, 5-6 the forest path, 8-9 the owl, 10-11 the butterflies; every
  path reaches the honey tree (12) and home (13). Keyframes are wwl-* in ./which-way-lali.css.
*/

const INK = "#1B2A4E";
const r1 = (n: number) => Math.round(n * 10) / 10;

/* ---------- the cast ---------- */

/** Lali's little clay honey pot, hanging under her. */
function Pot({ full = false }: { full?: boolean }) {
  return (
    <g transform="translate(0 30)">
      <path d="M-4 -12 Q0 -16 4 -12" stroke={INK} strokeWidth={1.4} fill="none" />
      <path d="M-8 -9 H8 Q11 0 6 7 H-6 Q-11 0 -8 -9Z" fill="#C46A3A" stroke="#8A4422" strokeWidth={1.4} />
      <path d="M-8 -9 H8" stroke="#8A4422" strokeWidth={2.4} strokeLinecap="round" />
      {full && (
        <>
          <ellipse cx={0} cy={-9} rx={7} ry={2.2} fill="#F5A623" />
          <path d="M5 -8 Q7 -2 5 2" stroke="#F5A623" strokeWidth={2.4} fill="none" strokeLinecap="round" className="wwl-drip" />
        </>
      )}
    </g>
  );
}

/** Lali with her pot: hovering, bobbing; tap her and she loops. */
function Lali({ x, y, s = 1.4, flip = false, full = false, spin = false, look = false }: { x: number; y: number; s?: number; flip?: boolean; full?: boolean; spin?: boolean; look?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={spin ? "wwl-spin" : look ? "wwl-look" : "lali-float"} style={vars({ "--dur": spin ? "1.6s" : "1.3s", "--rise": "-6px" })}>
        <Tappable reaction="loop" sound="buzz">
          <g transform={`scale(${flip ? -s : s} ${s})`}>
            <g transform="translate(-20 -24)">
              <BeeShape />
            </g>
            <Pot full={full} />
          </g>
        </Tappable>
      </g>
    </g>
  );
}

/** A question mark that pops up and wiggles over Lali's head. */
function Wonder({ x, y, delay = 0.9 }: { x: number; y: number; delay?: number }) {
  return (
    <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
      <g className="wwl-wiggle" style={vars({ "--delay": `${delay}s` })}>
        <circle cx={x} cy={y} r={14} fill="#fff" stroke={INK} strokeWidth={2} />
        <text x={x} y={y + 7} fontSize={20} fontFamily="var(--font-grandstander)" fontWeight={900} fill="#E8513B" textAnchor="middle">
          ?
        </text>
      </g>
    </g>
  );
}

/** Frog on a stepping stone. With `hop`, it hops from stone to stone. */
function Frog({ x, y, s = 1, hop = false }: { x: number; y: number; s?: number; hop?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className={hop ? "wwl-frog-hop" : "lali-breathe"} style={vars({ "--dur": hop ? "3.6s" : "2.2s" })}>
        <Tappable reaction="bounce" sound="boing">
          <ellipse cx={0} cy={0} rx={18} ry={11} fill="#5BBF4E" />
          <ellipse cx={0} cy={3} rx={12} ry={6} fill="#B9E6A2" />
          <circle cx={-9} cy={-10} r={6.5} fill="#5BBF4E" />
          <circle cx={9} cy={-10} r={6.5} fill="#5BBF4E" />
          <circle cx={-9} cy={-11} r={3.6} fill="#fff" />
          <circle cx={9} cy={-11} r={3.6} fill="#fff" />
          <circle cx={-8.4} cy={-11} r={2} fill={INK} className="lali-blink" />
          <circle cx={9.6} cy={-11} r={2} fill={INK} className="lali-blink" />
          <path d="M-8 -2 Q0 4 8 -2" stroke={INK} strokeWidth={1.8} fill="none" strokeLinecap="round" />
          <path d="M-18 6 q-6 2 -8 6 M18 6 q6 2 8 6" stroke="#3E9B3A" strokeWidth={4} fill="none" strokeLinecap="round" />
        </Tappable>
      </g>
    </g>
  );
}

/** The owl: big round eyes that blink. */
function Owl({ x, y, s = 1, flap = false }: { x: number; y: number; s?: number; flap?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="chime">
        <g className={flap ? "wwl-owl-flap" : "lali-breathe"} style={vars({ "--dur": flap ? "0.9s" : "3s" })}>
          <path d="M-16 -4 Q-30 6 -24 20 Q-16 14 -12 6Z M16 -4 Q30 6 24 20 Q16 14 12 6Z" fill="#6A4D96" />
        </g>
        <path d="M-14 -22 L-10 -32 L-4 -24 Q0 -26 4 -24 L10 -32 L14 -22 Q22 0 14 18 Q0 28 -14 18 Q-22 0 -14 -22Z" fill="#8C6BB5" />
        <ellipse cx={0} cy={8} rx={10} ry={11} fill="#D8C8EE" />
        <circle cx={-7} cy={-12} r={7} fill="#fff" stroke="#6A4D96" strokeWidth={2} />
        <circle cx={7} cy={-12} r={7} fill="#fff" stroke="#6A4D96" strokeWidth={2} />
        <circle cx={-7} cy={-11.5} r={3.4} fill={INK} className="lali-blink" />
        <circle cx={7} cy={-11.5} r={3.4} fill={INK} className="lali-blink" />
        <path d="M-3 -4 L0 1 L3 -4Z" fill="#F5A623" />
        <path d="M-4 22 v4 M4 22 v4" stroke="#F5A623" strokeWidth={2.4} strokeLinecap="round" />
      </Tappable>
    </g>
  );
}

/** A tall forest tree: a dark trunk and stacked round leaves that sway. */
function TallTree({ x, s = 1, dark = false, delay = 0 }: { x: number; s?: number; dark?: boolean; delay?: number }) {
  const a = dark ? "#1F5E3D" : "#2E7D4F";
  const b = dark ? "#174A30" : "#24683F";
  return (
    <g transform={`translate(${x} 270) scale(${s})`}>
      <rect x={-7} y={-110} width={14} height={112} rx={5} fill="#5A3B26" />
      <g className="lali-sway" style={vars({ "--dur": "6s", "--delay": `${delay}s` })}>
        <circle cx={0} cy={-150} r={34} fill={b} />
        <circle cx={-22} cy={-120} r={28} fill={a} />
        <circle cx={22} cy={-122} r={28} fill={a} />
        <circle cx={0} cy={-176} r={24} fill={a} />
        <circle cx={-10} cy={-160} r={8} fill="#fff" opacity={0.08} />
      </g>
    </g>
  );
}

/** The signpost at the fork: a wave to the river on the left, a tree to the forest on the right. */
function Signpost({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Tappable reaction="wiggle" sound="pop">
        <rect x={-4} y={-70} width={8} height={72} rx={3} fill="#8A5A3C" />
        <g className="wwl-sign-left">
          <path d="M-6 -66 H-52 L-62 -56 L-52 -46 H-6Z" fill="#FFF3D6" stroke="#8A5A3C" strokeWidth={2.4} strokeLinejoin="round" />
          <path d="M-46 -56 q4 -4 8 0 t8 0 t8 0" stroke="#3E98D0" strokeWidth={3} fill="none" strokeLinecap="round" />
        </g>
        <g className="wwl-sign-right">
          <path d="M6 -42 H52 L62 -32 L52 -22 H6Z" fill="#FFF3D6" stroke="#8A5A3C" strokeWidth={2.4} strokeLinejoin="round" />
          <path d="M30 -24 V-32" stroke="#5A3B26" strokeWidth={3} />
          <circle cx={30} cy={-36} r={7} fill="#2E7D4F" />
        </g>
      </Tappable>
    </g>
  );
}

/** Lali's cousins and the hive in the glowing honey tree. */
function HoneyTree({ id, x, y }: { id: string; x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <defs>
        <radialGradient id={`${id}-honey-glow`}>
          <stop offset="0" stopColor="#FFE27A" stopOpacity={0.7} />
          <stop offset="1" stopColor="#FFE27A" stopOpacity={0} />
        </radialGradient>
      </defs>
      <circle cx={0} cy={-120} r={150} fill={`url(#${id}-honey-glow)`} className="lali-pulse" style={vars({ "--dur": "3s" })} />
      <path d="M-14 0 C-12 -40 -16 -70 -6 -96 L6 -96 C16 -70 12 -40 14 0Z" fill="#7A5236" />
      <path d="M-6 -80 C-30 -96 -50 -100 -70 -96 M6 -84 C30 -100 54 -102 72 -96" stroke="#7A5236" strokeWidth={8} fill="none" strokeLinecap="round" />
      <g className="lali-sway" style={vars({ "--dur": "7s" })}>
        <ellipse cx={0} cy={-128} rx={96} ry={44} fill="#E3A21E" />
        <ellipse cx={-40} cy={-116} rx={52} ry={30} fill="#F5B921" />
        <ellipse cx={42} cy={-118} rx={52} ry={30} fill="#F5B921" />
        <ellipse cx={0} cy={-150} rx={60} ry={26} fill="#FFC83D" />
      </g>
      {/* the hive */}
      <Tappable reaction="wiggle" sound="chime">
        <g transform="translate(54 -86)">
          <path d="M0 -10 V-2" stroke="#7A5236" strokeWidth={3} />
          <ellipse cx={0} cy={18} rx={18} ry={22} fill="#F5A623" stroke="#C98A1A" strokeWidth={2} />
          <path d="M-16 8 H16 M-18 18 H18 M-16 28 H16" stroke="#C98A1A" strokeWidth={2} />
          <ellipse cx={0} cy={34} rx={5} ry={4} fill="#7A3E00" />
        </g>
      </Tappable>
      {[
        [-70, -150, 0],
        [-24, -176, -0.6],
        [30, -170, -1.2],
        [86, -140, -0.3],
        [-92, -110, -0.9],
      ].map(([bx, by, d], i) => (
        <g key={i} transform={`translate(${bx} ${by})`}>
          <g className="wwl-buzz-around" style={vars({ "--delay": `${d}s`, "--dur": `${r1(2.4 + i * 0.3)}s` })}>
            <g transform="scale(0.7) translate(-20 -24)">
              <BeeShape />
            </g>
          </g>
        </g>
      ))}
    </g>
  );
}

/** Grandma bee: bigger, with a shawl and little round glasses. */
function GrandmaBee({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-float" style={vars({ "--dur": "2.2s", "--rise": "-4px" })}>
        <Tappable reaction="grow" sound="chime">
          <g transform="scale(2.1) translate(-20 -24)">
            <BeeShape />
          </g>
          <path d="M-22 6 Q0 20 22 6 L18 18 Q0 28 -18 18Z" fill="#D6336C" opacity={0.9} />
          <g stroke={INK} strokeWidth={1.6} fill="none">
            <circle cx={-9} cy={-16} r={5} />
            <circle cx={7} cy={-16} r={5} />
            <path d="M-4 -16 H2" />
          </g>
        </Tappable>
      </g>
    </g>
  );
}

/** Swirly lines of a big wind. */
function Whoosh({ y, delay = 0, w = 1 }: { y: number; delay?: number; w?: number }) {
  return (
    <path
      d={`M-20 ${y} C60 ${y - 30} 120 ${y + 30} 190 ${y} C240 ${y - 20} 260 ${y - 50} 230 ${y - 50} C200 ${y - 50} 210 ${y - 18} 240 ${y - 16} C300 ${y - 12} 360 ${y + 20} 430 ${y}`}
      stroke="#fff"
      strokeOpacity={0.85}
      strokeWidth={4 * w}
      fill="none"
      strokeLinecap="round"
      strokeDasharray="120 600"
      className="wwl-whoosh"
      style={vars({ "--delay": `${delay}s` })}
    />
  );
}

/** A path drawn on the ground, from (x0, y0) narrowing away to (x1, y1). */
function Path({ d, color = "#E9CF9B" }: { d: string; color?: string }) {
  return <path d={d} fill={color} opacity={0.95} />;
}

/** Butterflies circling a point. */
function ButterflyRing({ x, y, r = 46 }: { x: number; y: number; r?: number }) {
  const colors = ["#FF8A1F", "#FFD233", "#4FA3F7", "#FF8FB1", "#9B5BD6"];
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="wwl-orbit" style={vars({ "--dur": "9s" })}>
        {colors.map((c, i) => {
          const a = (i / colors.length) * Math.PI * 2;
          return <Butterfly key={c} x={r1(Math.cos(a) * r)} y={r1(Math.sin(a) * r * 0.6)} color={c} delay={-i * 0.4} />;
        })}
      </g>
    </g>
  );
}

/** Day sky with hills. */
function Day({ id, sun = true }: { id: string; sun?: boolean }) {
  return (
    <>
      <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />
      {sun && <LightRays x={336} y={52} />}
      {sun && <Sun x={336} y={52} r={20} />}
      <DriftCloud y={52} s={0.7} dur={70} phase={0.3} />
      <DriftCloud y={30} s={0.45} dur={55} phase={0.7} />
      <Mountains y={14} />
    </>
  );
}

function Dusk({ id }: { id: string }) {
  return (
    <>
      <Sky id={id} from="#5B4AA8" mid="#E77B6A" to="#FFC981" />
      <Depth z={-0.8}>
        <circle cx={300} cy={190} r={42} fill="#FFB347" opacity={0.95} />
        <circle cx={300} cy={190} r={70} fill="#FFD27A" opacity={0.25} className="lali-pulse" />
      </Depth>
      <Mountains far="#8C6FA8" mid="#B07A8C" y={30} />
    </>
  );
}

function Night({ id, seed = 3 }: { id: string; seed?: number }) {
  return (
    <>
      <Sky id={id} from="#0E1440" mid="#26307A" to="#4A4F9E" />
      <Stars seed={seed} n={30} bottom={180} />
      <Mountains far="#3A4488" mid="#2A3370" y={20} />
    </>
  );
}

/* ---------- the pages ---------- */

export default function WhichWayLali({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Lali sets off from home with her empty pot.
    case 0:
      return (
        <>
          <Day id={id} />
          <Hills back="#8FD39A" front="#5CBF73" />
          <Tukul x={88} y={236} s={1.1} />
          <GrandmaBee x={140} y={150} />
          <Path d="M150 300 C180 270 230 250 330 236 L344 240 C250 258 210 280 214 300Z" />
          <g className="wwl-set-off">
            <Lali x={250} y={150} s={1.5} />
          </g>
          {[40, 200, 300, 370].map((x, i) => (
            <Flower key={x} x={x} y={270 + (i % 2) * 6} h={30} color={["#FF8FB1", "#FFD233", "#9B5BD6", "#FFFFFF"][i]} delay={-i * 0.4} s={0.8} />
          ))}
          <Air kind="day" seed={2} />
        </>
      );
    // WHOOSH: the wind spins her away over the hill.
    case 1:
      return (
        <>
          <Sky id={id} from="#8FB8E8" mid="#C9DDF2" to="#F1F6FF" />
          <DriftCloud y={50} s={0.9} dur={12} phase={0.2} />
          <DriftCloud y={90} s={0.6} dur={9} phase={0.7} />
          <Mountains y={20} far="#AFC0DD" mid="#8EA3C9" />
          <Hills back="#9FD3A2" front="#6CC983" />
          <g className="wwl-bend">
            <Acacia x={70} y={240} s={0.9} />
          </g>
          <Whoosh y={110} />
          <Whoosh y={170} delay={0.7} w={0.7} />
          <Whoosh y={70} delay={1.4} w={0.6} />
          {[0, 1, 2, 3, 4].map((i) => (
            <ellipse key={i} cx={60 + i * 70} cy={120 + (i % 2) * 40} rx={6} ry={3} fill="#4DBA74" className="wwl-leaf" style={vars({ "--delay": `${-i * 0.5}s` })} />
          ))}
          <Lali x={250} y={130} s={1.5} spin />
          <Air kind="day" seed={6} grass={false} />
        </>
      );
    // The fork: the river path or the forest path?
    case 2:
      return (
        <>
          <Day id={id} />
          <Hills back="#8FD39A" front="#6CC983" />
          <Depth z={-0.2}>
            <Water y={196} h={22} />
            <TallTree x={320} s={0.62} delay={-1} />
            <TallTree x={360} s={0.5} dark delay={-2} />
            <TallTree x={290} s={0.48} dark delay={-3} />
          </Depth>
          {/* the path splits in two */}
          <Path d="M175 300 C185 270 190 250 150 226 C120 214 80 210 40 208 L40 216 C90 220 130 230 160 250 C200 274 205 290 225 300Z" />
          <Path d="M200 300 C205 268 215 248 260 232 C290 222 300 212 300 204 L310 204 C312 222 296 236 272 248 C236 266 236 286 240 300Z" />
          <Signpost x={200} y={262} />
          <Lali x={200} y={118} s={1.5} look />
          <Wonder x={232} y={84} />
          <Grass y={278} seed={4} />
          <Air kind="day" seed={7} grass={false} />
        </>
      );
    // The river path: a frog on the stepping stones.
    case 3:
      return (
        <>
          <Day id={id} />
          <Hills back="#8FD39A" front="#6CC983" backY={170} frontY={190} />
          <Water y={196} h={84} />
          {[70, 150, 230, 310].map((x, i) => (
            <Rock key={x} x={x} y={244 + (i % 2) * 10} s={0.42} color="#A7A2B2" />
          ))}
          <Frog x={150} y={240} s={1.2} />
          <Lali x={240} y={140} s={1.5} flip />
          <Depth z={0.4}>
            <Grass y={290} seed={9} color="#3E9B5A" />
          </Depth>
          <Air kind="day" seed={3} grass={false} />
        </>
      );
    // One, two, three, hop! Across the river together.
    case 4:
      return (
        <>
          <Day id={id} />
          <Hills back="#8FD39A" front="#6CC983" backY={170} frontY={190} />
          <Water y={196} h={84} />
          {[70, 150, 230, 310].map((x, i) => (
            <Rock key={x} x={x} y={244 + (i % 2) * 10} s={0.42} color="#A7A2B2" />
          ))}
          <NumberBadge x={70} y={206} n="1" delay={0.6} />
          <NumberBadge x={150} y={196} n="2" delay={1.4} />
          <NumberBadge x={230} y={206} n="3" delay={2.2} />
          <Frog x={70} y={234} s={1.1} hop />
          <g className="wwl-follow">
            <Lali x={70} y={150} s={1.4} />
          </g>
          <Air kind="day" seed={5} />
        </>
      );
    // The forest path: tall whispering trees and Gugu up in the branches.
    case 5:
      return (
        <>
          <Sky id={id} from="#3E7D5A" mid="#6FAF7E" to="#B9E0BF" />
          <LightRays x={200} y={-10} n={6} />
          <Depth z={-0.4}>
            {[30, 120, 280, 370].map((x, i) => (
              <TallTree key={x} x={x} s={0.9} dark delay={-i} />
            ))}
          </Depth>
          <rect x={-10} y={250} width={420} height={60} fill="#3C7A4C" />
          <TallTree x={200} s={1.1} delay={-0.5} />
          <Place x={232} y={126} s={0.3}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Lali x={110} y={170} s={1.4} />
          <g className="wwl-shh" fill="#fff" opacity={0.8}>
            <text x={40} y={70} fontSize={18} fontFamily="var(--font-grandstander)" fontWeight={900}>
              shhh
            </text>
            <text x={320} y={90} fontSize={14} fontFamily="var(--font-grandstander)" fontWeight={900}>
              shhh
            </text>
          </g>
          <Air kind="day" seed={8} />
        </>
      );
    // A secret tunnel of flowers: Lali zooms right through.
    case 6:
      return (
        <>
          <Sky id={id} from="#4F9A6A" mid="#8CC79A" to="#DDF2DD" />
          <Depth z={-0.4}>
            {[20, 90, 310, 380].map((x, i) => (
              <TallTree key={x} x={x} s={0.75} dark delay={-i * 0.7} />
            ))}
          </Depth>
          <rect x={-10} y={240} width={420} height={70} fill="#4A8F58" />
          {[40, 120, 280, 360].map((x, i) => (
            <Flower key={x} x={x} y={284} h={26} color={["#FF8FB1", "#9B5BD6", "#4FA3F7", "#FFD233"][i]} delay={-i * 0.4} s={0.7} />
          ))}
          {/* the arch of flowers */}
          <path d="M80 260 C80 120 320 120 320 260" stroke="#2E7D4F" strokeWidth={30} fill="none" />
          {Array.from({ length: 13 }, (_, i) => {
            const a = Math.PI - (i / 12) * Math.PI;
            const x = r1(200 + Math.cos(a) * 120);
            const y = r1(240 - Math.sin(a) * 100);
            const c = ["#FF8FB1", "#9B5BD6", "#4FA3F7"][i % 3];
            return (
              <g key={i} className="lali-pop-in" style={vars({ "--delay": `${r1(0.2 + i * 0.08)}s` })}>
                <circle cx={x} cy={y} r={11} fill={c} />
                <circle cx={x} cy={y} r={4} fill="#FFE27A" />
              </g>
            );
          })}
          <g className="wwl-zoom">
            <Lali x={200} y={190} s={1.3} />
          </g>
          <Place x={330} y={262} s={0.28}>
            <GuguShape pose="point" mood="joy" />
          </Place>
          <Pollen seed={6} n={12} color="#FFE2F0" top={120} bottom={250} />
          <Air kind="day" seed={10} />
        </>
      );
    // The meadow at sunset: an owl in a tree, butterflies in the grass. Who will help?
    case 7:
      return (
        <>
          <Dusk id={id} />
          <Hills back="#7A9F6A" front="#5C8A55" />
          <Acacia x={88} y={236} s={1} leaf="#3D6E48" leafDark="#2E5838" />
          <Owl x={92} y={168} s={1.1} />
          {[290, 320, 350].map((x, i) => (
            <Butterfly key={x} x={x} y={200 - i * 14} color={["#FF8A1F", "#FFD233", "#4FA3F7"][i]} delay={-i * 0.6} />
          ))}
          <Lali x={210} y={142} s={1.5} look />
          <Wonder x={244} y={106} />
          <Grass y={276} seed={5} color="#3F7A45" />
          <Air kind="dusk" seed={4} grass={false} />
        </>
      );
    // The wise owl knows the way.
    case 8:
      return (
        <>
          <Night id={id} seed={5} />
          <Moon x={330} y={64} r={24} />
          <Hills back="#24685C" front="#1E5A4E" />
          <path d="M-10 150 C80 140 160 150 230 160" stroke="#4A3426" strokeWidth={16} fill="none" strokeLinecap="round" />
          <Owl x={150} y={124} s={2} />
          <Lali x={260} y={150} s={1.5} flip />
          <Fireflies seed={4} n={7} top={180} bottom={260} />
          <Air kind="night" seed={2} />
        </>
      );
    // Swoop and buzz under the first stars.
    case 9:
      return (
        <>
          <Night id={id} seed={8} />
          <Moon x={70} y={60} r={22} sleepy />
          <Hills back="#24685C" front="#1E5A4E" />
          <g className="wwl-fly-across">
            <Owl x={0} y={0} s={1.3} flap />
          </g>
          <g className="wwl-fly-across" style={vars({ "--delay": "0.5s", "--y": "60px" })}>
            <Lali x={0} y={0} s={1.2} />
          </g>
          <Fireflies seed={9} n={8} top={200} bottom={270} />
          <Air kind="night" seed={6} />
        </>
      );
    // The butterflies dance in a ring around Lali.
    case 10:
      return (
        <>
          <Dusk id={id} />
          <Hills back="#7A9F6A" front="#5C8A55" />
          {[60, 130, 270, 340].map((x, i) => (
            <Flower key={x} x={x} y={272} h={36} color={["#FF8FB1", "#FFD233", "#9B5BD6", "#FF8A1F"][i]} delay={-i * 0.5} />
          ))}
          <Lali x={200} y={150} s={1.6} />
          <ButterflyRing x={200} y={150} r={72} />
          <Air kind="dusk" seed={7} />
        </>
      );
    // Following the smell of flowers over the hill.
    case 11:
      return (
        <>
          <Dusk id={id} />
          <defs>
            <radialGradient id={`${id}-far-glow`}>
              <stop offset="0" stopColor="#FFE27A" stopOpacity={0.8} />
              <stop offset="1" stopColor="#FFE27A" stopOpacity={0} />
            </radialGradient>
          </defs>
          <Depth z={-0.3}>
            <circle cx={356} cy={196} r={70} fill={`url(#${id}-far-glow)`} className="lali-pulse" />
            {/* the honey tree, far away over the hill, glowing */}
            <g transform="translate(356 214) scale(0.32)">
              <path d="M-14 0 C-12 -40 -16 -70 -6 -96 L6 -96 C16 -70 12 -40 14 0Z" fill="#7A5236" />
              <ellipse cx={0} cy={-128} rx={96} ry={44} fill="#E3A21E" />
              <ellipse cx={0} cy={-150} rx={60} ry={26} fill="#FFC83D" />
            </g>
          </Depth>
          <Hills back="#7A9F6A" front="#5C8A55" backY={210} frontY={250} />
          {/* a ribbon of flower smell */}
          <path d="M20 230 C100 180 160 230 220 190 C280 150 320 190 380 170" stroke="#FFB0D0" strokeWidth={6} strokeDasharray="2 12" strokeLinecap="round" fill="none" className="wwl-smell" />
          {[0, 1, 2].map((i) => (
            <Butterfly key={i} x={150 + i * 40} y={170 - (i % 2) * 18} color={["#FF8A1F", "#FFD233", "#4FA3F7"][i]} delay={-i * 0.5} />
          ))}
          <Lali x={250} y={150} s={1.3} />
          <g fill="#fff" className="wwl-notes">
            <text x={330} y={130} fontSize={22}>
              ♪
            </text>
            <text x={356} y={110} fontSize={16}>
              ♫
            </text>
          </g>
          <Air kind="dusk" seed={9} />
        </>
      );
    // The honey tree! Her cousins fill her pot.
    case 12:
      return (
        <>
          <Sky id={id} from="#2B2F78" mid="#7D5AA8" to="#F6B26B" />
          <Stars seed={12} n={16} bottom={110} />
          <Hills back="#5C8A55" front="#4A7A48" />
          <HoneyTree id={id} x={200} y={262} />
          <Lali x={120} y={196} s={1.4} full />
          <Pollen seed={3} n={10} color="#FFE9A0" top={60} bottom={240} />
          <Air kind="dusk" seed={12} />
        </>
      );
    // Home, and goodnight.
    default:
      return (
        <>
          <Night id={id} seed={13} />
          <Moon x={330} y={58} r={22} sleepy />
          <Hills back="#24685C" front="#1E5A4E" />
          <Tukul x={130} y={240} s={1.4} glow />
          <GrandmaBee x={250} y={170} />
          <Lali x={300} y={196} s={1.2} full flip />
          <g className="wwl-zzz" fill="#fff">
            <text x={330} y={150} fontSize={16} fontFamily="var(--font-grandstander)" fontWeight={900}>
              z
            </text>
            <text x={344} y={134} fontSize={20} fontFamily="var(--font-grandstander)" fontWeight={900}>
              Z
            </text>
          </g>
          <Fireflies seed={13} n={6} top={200} bottom={270} />
          <Air kind="night" seed={11} />
        </>
      );
  }
}
