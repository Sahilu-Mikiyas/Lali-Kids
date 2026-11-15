"use client";

import "./is-it-alive.css";

import { useId, type ReactNode } from "react";

import { Acacia, Air, BeeHover, CloudShape, Place, vars } from "../../scenery";
import { Cub, Ibex, TAP, Teacher } from "./kit-cast";
import { Chick, Cow, Magnifier, Notebook, Pebble, StrawNest } from "./kit-life";
import { Classroom } from "./kit-more";
import { HouseFront, Yard } from "./kit-places";
import { Sign, Sparkles, Speech } from "./kit-props";

/*
  "Is It Alive?": one living picture per page (12 pages). Haben's game on the hill; the cow that
  eats, drinks and breathes; the stone that rolls; the tree Lali lands on; Haben's notebook of what
  living things do; the cloud that moves and grows; the nest in the tree; planting the dry bean;
  the green shoot; the dry leaf; Teacher Meron's two lists; Anbessa, alive. Keyframes: kit.css,
  kit-science.css and ./is-it-alive.css.
*/

/** Haben's notebook, big, with the five things living things do (food, water, air, grow, young). */
/** Pops a picture in at a spot (the move needs its own group: a CSS transform replaces the SVG one). */
function Pop({ at, delay, children }: { at: string; delay: string; children: ReactNode }) {
  return (
    <g transform={at}>
      <g className="lali-pop-in" style={vars({ "--delay": delay })}>
        {children}
      </g>
    </g>
  );
}

function NeedsPage() {
  return (
    <g transform="translate(200 150)">
      <g className="lali-pop-in" style={vars({ "--delay": "0.4s" })}>
        <rect x={-150} y={-100} width={300} height={180} rx={10} fill="#FFFFFF" stroke="#C9B89A" strokeWidth={3} />
        <path d="M0 -100 V80" stroke="#D8C8A8" strokeWidth={2} />
        {/* food */}
        <Pop at="translate(-100 -50)" delay="0.8s">
          <ellipse cx={0} cy={6} rx={26} ry={9} fill="#9A6236" />
          <ellipse cx={0} cy={2} rx={24} ry={8} fill="#D8C49A" />
          <path d="M-14 0 q14 8 28 0" stroke="#BFA878" strokeWidth={2.4} fill="none" />
        </Pop>
        {/* water */}
        <Pop at="translate(-40 -50)" delay="1.2s">
          <path d="M0 -20 Q16 2 0 16 Q-16 2 0 -20Z" fill="#5BB8E8" />
        </Pop>
        {/* air */}
        <Pop at="translate(-70 20)" delay="1.6s">
          <path d="M-26 -8 H10 q10 0 10 -8 q0 -8 -8 -8 M-26 4 H18 q10 0 10 8 q0 8 -8 8" stroke="#7FB8E8" strokeWidth={4} fill="none" strokeLinecap="round" />
        </Pop>
        {/* grow */}
        <Pop at="translate(60 -20)" delay="2s">
          <path d="M-30 30 V10 M-30 10 l-6 -4 M-30 10 l6 -4" stroke="#3E9B5A" strokeWidth={3} fill="none" strokeLinecap="round" />
          <path d="M0 30 V-10 M0 -6 l-10 -6 M0 -10 l10 -6" stroke="#3E9B5A" strokeWidth={4} fill="none" strokeLinecap="round" />
          <path d="M34 30 V-34 M34 -24 l-12 -8 M34 -30 l12 -8 M34 -6 l-10 -6" stroke="#3E9B5A" strokeWidth={5} fill="none" strokeLinecap="round" />
          <path d="M-44 30 H50" stroke="#8A6A44" strokeWidth={4} strokeLinecap="round" />
        </Pop>
        {/* young: an egg and a seed */}
        <Pop at="translate(70 50)" delay="2.4s">
          <path d="M-20 10 C-30 10 -31 -2 -29 -8 C-26 -16 -14 -16 -11 -8 C-9 -2 -10 10 -20 10Z" fill="#F4E4C8" stroke="#D8C0A0" />
          <ellipse cx={14} cy={4} rx={10} ry={7} fill="#9A4A3A" />
        </Pop>
      </g>
    </g>
  );
}

/** A sprouting bean in a patch of soil. */
function Sprout({ x, y, big = false }: { x: number; y: number; big?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={0} rx={34} ry={8} fill="#7A5236" />
      <g className="snk-sprout" style={vars({ "--delay": "0.6s", "--dur": "2.6s" })}>
        <path d={big ? "M0 0 V-34" : "M0 0 C0 -10 0 -14 -6 -16"} stroke="#4EAA3A" strokeWidth={4} fill="none" strokeLinecap="round" />
        {big && (
          <g>
            <ellipse cx={-10} cy={-36} rx={11} ry={5.5} fill="#3E9B5A" transform="rotate(-20 -10 -36)" />
            <ellipse cx={10} cy={-38} rx={11} ry={5.5} fill="#4DBA5A" transform="rotate(20 10 -38)" />
          </g>
        )}
      </g>
    </g>
  );
}

/** Two lists on the board: alive (green tick) and not alive (red cross), with little pictures. */
function Lists() {
  return (
    <g>
      <rect x={113} y={43} width={174} height={94} fill="#2E4A3A" />
      <path d="M200 50 V130" stroke="#F4F0E0" strokeWidth={1.4} opacity={0.6} />
      <path d="M140 58 l6 6 l12 -12" stroke="#7FE08A" strokeWidth={3.4} fill="none" strokeLinecap="round" />
      <path d="M236 52 l14 14 M250 52 l-14 14" stroke="#F08A8A" strokeWidth={3.4} strokeLinecap="round" />
      {/* alive: a cow's head, a tree, a chick, a bee */}
      <g className="lali-pop-in" style={vars({ "--delay": "0.6s" })}>
        <circle cx={130} cy={88} r={8} fill="#8A5A3A" />
        <path d="M160 100 V84" stroke="#7A5236" strokeWidth={3} />
        <circle cx={160} cy={80} r={9} fill="#3E9B5A" />
        <circle cx={180} cy={90} r={6} fill="#FFD84A" />
        <circle cx={140} cy={116} r={5} fill="#F5B21E" />
        <path d="M136 116 h8" stroke="#2A1A10" strokeWidth={2} />
        <path d="M164 122 V112" stroke="#4EAA3A" strokeWidth={2.4} />
        <ellipse cx={160} cy={110} rx={4} ry={2} fill="#4DBA5A" />
        <ellipse cx={168} cy={110} rx={4} ry={2} fill="#4DBA5A" />
      </g>
      {/* not alive: a stone, a cloud, a wavy stream */}
      <g className="lali-pop-in" style={vars({ "--delay": "1.2s" })}>
        <path d="M216 96 Q214 84 226 82 Q238 82 238 94Z" fill="#B8B0B8" />
        <g transform="translate(262 88) scale(0.35)">
          <CloudShape />
        </g>
        <path d="M216 118 q8 -6 16 0 t16 0 t16 0 t16 0" stroke="#7FC8F0" strokeWidth={3} fill="none" />
      </g>
    </g>
  );
}

export default function IsItAlive({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Haben with her notebook and magnifying glass; Anbessa laughs: "If it moves, it's alive!"
    case 0:
      return (
        <g>
          <Yard id={id} time="morning" />
          <Place x={130} y={290} s={0.46} tap={TAP.haben}>
            <Ibex pose="wave" />
          </Place>
          <Notebook x={168} y={262} s={1} kind="q" />
          <Magnifier x={96} y={236} s={0.9} rot={-20} />
          <Place x={270} y={292} s={0.48} flip tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Speech x={290} y={140} w={56} h={40} tail="down" delay={0.8}>
            <g transform="translate(0 4)">
              <path d="M-14 0 h20 M0 -6 l8 6 l-8 6" stroke="#2F6FD0" strokeWidth={3} fill="none" strokeLinecap="round" />
              <path d="M10 0 l4 -6 l4 12 l4 -6" stroke="#2FA35A" strokeWidth={2.4} fill="none" />
            </g>
          </Speech>
          <Air kind="day" seed={2} />
        </g>
      );
    // The cow: munching, drinking, puffing warm breath. Alive!
    case 1:
      return (
        <g>
          <Yard id={id} time="day">
            <path d="M-10 262 Q120 246 220 262 T410 256 L410 284 Q200 270 -10 290Z" fill="#6FC0E8" />
          </Yard>
          <g className="sia-graze">
            <Cow x={220} y={258} s={1.3} graze />
          </g>
          <g transform="translate(296 222)">
            {[0, 1, 2].map((i) => (
              <circle key={i} cx={i * 6} cy={-i * 3} r={4 + i} fill="#FFFFFF" opacity={0.7} className="sia-puff" style={vars({ "--delay": `${i * 0.3}s` })} />
            ))}
          </g>
          <Place x={90} y={294} s={0.4} tap={TAP.haben}>
            <Ibex mood="joy" />
          </Place>
          <Place x={140} y={296} s={0.42} tap={TAP.cub}>
            <Cub mood="joy" arm="reach" />
          </Place>
          <Air kind="day" seed={4} />
        </g>
      );
    // The stone bounces down the hill. "It moved! It's alive!" Haben looks closely: no, no and no.
    case 2:
      return (
        <g>
          <Yard id={id} time="day" />
          <g className="sia-roll">
            <Pebble x={0} y={0} s={1.6} />
          </g>
          <Place x={120} y={292} s={0.46} tap={TAP.cub}>
            <Cub mood="wow" arm="up" />
          </Place>
          <Place x={250} y={294} s={0.44} flip tap={TAP.haben}>
            <Ibex pose="point" mood="worried" />
          </Place>
          <Magnifier x={200} y={250} s={1} rot={-40} />
          <Sign x={270} y={170} kind="?" delay={1.8} />
          <Air kind="day" seed={6} />
        </g>
      );
    // The big tree: "Trees never walk. Not alive!" Lali lands on a leaf: roots drink, leaves make food.
    case 3:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <g transform="translate(250 250)">
            <path d="M-6 0 Q-14 18 -36 26 M6 0 Q14 18 40 24 M0 0 V28" stroke="#7A5236" strokeWidth={4} fill="none" opacity={0.6} className="sia-roots" />
          </g>
          <Acacia x={250} y={252} s={1.5} />
          <BeeHover x={226} y={130} s={1.1} />
          <g transform="translate(316 74)">
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M${-10 - i * 8} ${12 + i * 10} L${-40 - i * 10} ${48 + i * 6}`} stroke="#FFE680" strokeWidth={3} strokeLinecap="round" className="sia-ray" style={vars({ "--delay": `${i * 0.4}s` })} />
            ))}
          </g>
          <Place x={100} y={292} s={0.46} tap={TAP.cub}>
            <Cub mood="happy" arm="reach" />
          </Place>
          <Air kind="day" seed={8} />
        </g>
      );
    // Haben's notebook: food, water, air; they grow; they make new living things like themselves.
    case 4:
      return (
        <g>
          <Yard id={id} time="day" />
          <NeedsPage />
          <Place x={70} y={300} s={0.36} tap={TAP.haben}>
            <Ibex pose="point" />
          </Place>
          <Place x={340} y={300} s={0.36} flip tap={TAP.cub}>
            <Cub mood="wow" />
          </Place>
        </g>
      );
    // The cloud that moves and grows, but doesn't eat or breathe: tiny drops of water, pushed by the wind.
    case 5:
      return (
        <g>
          <Yard id={id} time="day" />
          <g transform="translate(180 80)">
            <g className="sia-cloud">
              <CloudShape s={1.4} />
            </g>
          </g>
          <g transform="translate(110 150)">
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M0 ${i * 14} q20 -6 40 0 t40 0`} stroke="#FFFFFF" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.8} className="sia-wind" style={vars({ "--delay": `${i * 0.5}s` })} />
            ))}
          </g>
          <Place x={130} y={292} s={0.44} tap={TAP.cub}>
            <Cub mood="wow" arm="up" />
          </Place>
          <Place x={250} y={294} s={0.42} flip tap={TAP.haben}>
            <Ibex pose="point" />
          </Place>
          <BeeHover x={310} y={170} s={0.9} flip />
          <Air kind="day" seed={10} />
        </g>
      );
    // A nest with three chicks in the branches: living things need a safe home.
    case 6:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <path d="M60 300 Q90 200 120 160 Q160 120 260 110 Q330 104 410 120" stroke="#7A5236" strokeWidth={16} fill="none" strokeLinecap="round" />
          {[[140, 120], [220, 90], [300, 96], [360, 110], [100, 160]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={30} fill={i % 2 ? "#3E9B5A" : "#4DAA5A"} />
          ))}
          <StrawNest x={230} y={118} s={1.4}>
            <Chick x={-14} y={-4} s={0.9} peck delay={0} />
            <Chick x={0} y={-6} s={1} flip peck delay={-0.6} />
            <Chick x={14} y={-4} s={0.9} peck delay={-1.2} />
          </StrawNest>
          <g className="sia-bird">
            <path d="M0 0 q10 -10 20 0 q10 -10 20 0" stroke="#33406E" strokeWidth={3} fill="none" transform="translate(300 60)" />
          </g>
          <Place x={130} y={296} s={0.42} tap={TAP.haben}>
            <Ibex mood="wow" />
          </Place>
          <Place x={300} y={296} s={0.42} flip tap={TAP.cub}>
            <Cub mood="happy" />
          </Place>
        </g>
      );
    // A dry bean from Anbessa's pocket; they plant it in wet soil by Grandma's door.
    case 7:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <HouseFront x={370} y={252} door="open" delay={0} />
          </Yard>
          <Sprout x={210} y={276} />
          <g transform="translate(210 276)">
            <g className="sia-water">
              <path d="M-4 -40 l-2 8 M4 -44 l-2 8 M0 -30 l-2 8" stroke="#5BB8E8" strokeWidth={2.4} strokeLinecap="round" />
            </g>
          </g>
          <Place x={120} y={296} s={0.44} tap={TAP.cub}>
            <Cub mood="happy" arm="give" />
          </Place>
          <Place x={300} y={298} s={0.42} flip tap={TAP.haben}>
            <Ibex pose="point" />
          </Place>
          <Sign x={140} y={160} kind="?" delay={1.2} />
          <Air kind="day" seed={12} />
        </g>
      );
    // Four days later: a green shoot! The bean was alive all along.
    case 8:
      return (
        <g>
          <Yard id={id} time="morning" house={false}>
            <HouseFront x={370} y={252} door="shut" delay={0} />
          </Yard>
          <Sprout x={200} y={276} big />
          <Sparkles x={200} y={230} r={40} delay={2.4} n={6} />
          <Place x={110} y={296} s={0.44} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Place x={300} y={298} s={0.42} flip tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <BeeHover x={230} y={170} s={1} />
          <Air kind="day" seed={14} />
        </g>
      );
    // The dry leaf: alive once, on the tree; now it can't grow. A tick in the notebook.
    case 9:
      return (
        <g>
          <Yard id={id} time="evening" house={false} />
          <Acacia x={330} y={210} s={0.9} />
          <g className="sia-leaf">
            <path d="M0 0 Q14 -14 34 -4 Q14 10 0 0Z M0 0 L30 -4" fill="#B8803A" stroke="#8A5A2A" strokeWidth={1.4} transform="translate(180 140)" />
          </g>
          <Place x={120} y={294} s={0.46} tap={TAP.haben}>
            <Ibex pose="wave" />
          </Place>
          <Notebook x={260} y={250} s={1.6} kind="plant" ticks={3} />
          <Place x={330} y={298} s={0.4} flip tap={TAP.cub}>
            <Cub mood="happy" />
          </Place>
        </g>
      );
    // Teacher Meron and the two lists: alive and not alive. "And what about you, Anbessa?"
    case 10:
      return (
        <g>
          <Classroom id={id}>
            <Lists />
          </Classroom>
          <Place x={330} y={290} s={0.46} flip tap={TAP.mama}>
            <Teacher pose="point" />
          </Place>
          <Place x={100} y={292} s={0.42} tap={TAP.haben}>
            <Ibex mood="happy" />
          </Place>
          <Place x={190} y={294} s={0.44} tap={TAP.cub}>
            <Cub mood="wow" />
          </Place>
        </g>
      );
    // "I eat, I drink, I breathe, I grow. I'm alive!" Everyone joins in.
    case 11:
      return (
        <g>
          <Classroom id={id}>
            <Lists />
          </Classroom>
          <g className="sia-tall">
            <Place x={200} y={290} s={0.52} tap={TAP.cub}>
              <Cub mood="joy" arm="up" />
            </Place>
          </g>
          <Place x={80} y={294} s={0.42} tap={TAP.haben}>
            <Ibex pose="wave" mood="joy" />
          </Place>
          <Place x={330} y={290} s={0.44} flip tap={TAP.mama}>
            <Teacher pose="wave" mood="joy" />
          </Place>
          <Sparkles x={200} y={150} r={90} delay={0.6} n={8} />
          <BeeHover x={270} y={160} s={0.9} flip />
        </g>
      );
    default:
      return null;
  }
}
