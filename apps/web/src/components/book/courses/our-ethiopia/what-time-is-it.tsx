"use client";

import "./what-time-is-it.css";

import { useId } from "react";

import { GuguShape, type Mood } from "../../../characters";
import { BeeHover, Place, vars } from "../../scenery";
import { Cub, Grandma, OnHead, TAP, Tsehay } from "./kit-cast";
import { ClockFace, ETH_FONT, GEEZ, Globe, SunArc } from "./kit-crafts";
import { Village, Home, SkyFor, TownHouse } from "./kit-places";
import { Bedroll, Hearts, Sign, Sparkles, Speech } from "./kit-props";

/*
  "Two O'Clock in the Morning Sun": one living picture per page (12 pages). Cousin Liya and her
  shiny watch; "the market at two o'clock"; woken at two, her watch says eight; "both!"; hours
  counted from sunrise; add six; near the middle of the Earth the sun rises at about the same
  time all year; reading buna in fidel at the market; Ge'ez numbers on the church calendar; our
  own ways; Liya's double clock; ready at three. Moves: what-time-is-it.css, kit.css,
  kit-land.css and lali-* (globals.css).
*/

const FONT = "var(--font-grandstander), sans-serif";

/** Cousin Liya: a gelada with two round puffs of hair, a purple band and a purple pinafore. */
function Liya({ mood = "happy" as Mood }) {
  return (
    <g>
      <GuguShape mood={mood} />
      <g className="lali-breathe">
        <path d="M60 176 Q100 166 140 176 L144 230 Q100 238 56 230Z" fill="#7A3FA0" />
        <path d="M60 186 Q100 176 140 186" stroke="#F5B21E" strokeWidth={3} fill="none" />
      </g>
      <OnHead>
        <circle cx={58} cy={34} r={16} fill="#5A3A2A" />
        <circle cx={142} cy={34} r={16} fill="#5A3A2A" />
        <path d="M60 52 Q100 26 140 52" stroke="#9A5AC0" strokeWidth={6} fill="none" strokeLinecap="round" />
      </OnHead>
    </g>
  );
}

/** A shiny wristwatch, close up: the usual numbers, the hand at `hour`. */
function Watch({ x, y, hour, s = 1 }: { x: number; y: number; hour: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-16} y={-70} width={32} height={140} rx={8} fill="#2B3A8C" />
      <circle r={44} fill="#C9D2E0" />
      <ClockFace x={0} y={0} r={38} hour={hour} />
    </g>
  );
}

/** Two rings of numbers: the watch's hours outside, and the Ethiopian hours inside (12 next to 6). */
function DoubleClock({ x, y, r = 100, hour }: { x: number; y: number; r?: number; hour?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill="#FFFFFF" stroke="#1B2A4E" strokeWidth={4} />
      <circle r={r * 0.62} fill="#FFF3C0" stroke="#E2B83A" strokeWidth={2} />
      {Array.from({ length: 12 }, (_, i) => {
        const n = i + 1;
        const t = ((n / 12) * 360 - 90) * (Math.PI / 180);
        const inner = ((n + 5) % 12) + 1;
        const ox = Math.round(Math.cos(t) * r * 0.82 * 10) / 10;
        const oy = Math.round((Math.sin(t) * r * 0.82 + r * 0.07) * 10) / 10;
        const ix = Math.round(Math.cos(t) * r * 0.44 * 10) / 10;
        const iy = Math.round((Math.sin(t) * r * 0.44 + r * 0.06) * 10) / 10;
        return (
          <g key={n}>
            <text x={ox} y={oy} textAnchor="middle" fontSize={r * 0.18} fontWeight={900} fill="#1B2A4E" fontFamily={FONT}>
              {n}
            </text>
            <text x={ix} y={iy} textAnchor="middle" fontSize={r * 0.15} fontWeight={900} fill="#C0501E" fontFamily={FONT} className="wt-count" style={vars({ "--delay": `${0.4 + i * 0.12}s` })}>
              {inner}
            </text>
          </g>
        );
      })}
      {hour !== undefined && (
        <g transform={`rotate(${(hour % 12) * 30})`}>
          <path d={`M0 6 L0 ${-r * 0.7}`} stroke="#E2463F" strokeWidth={5} strokeLinecap="round" />
        </g>
      )}
      <circle r={5} fill="#1B2A4E" />
    </g>
  );
}

/** A small sign card with Ethiopic writing. */
function EthSign({ x, y, text, w = 80, color = "#2E9A8A" }: { x: number; y: number; text: string; w?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-w / 2} y={-20} width={w} height={40} rx={6} fill={color} stroke="#FFFFFF" strokeWidth={3} />
      <text x={0} y={10} textAnchor="middle" fontSize={26} fontWeight={700} fill="#FFFFFF" fontFamily={ETH_FONT}>
        {text}
      </text>
    </g>
  );
}

export default function WhatTimeIsIt({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Cousin Liya, grown up far away, comes to stay; a shiny watch, and a funny accent.
    case 0:
      return (
        <g>
          <Village id={id} />
          <Place x={250} y={300} s={0.44} flip tap={TAP.tsehay}>
            <Liya mood="joy" />
          </Place>
          <g transform="translate(320 270)">
            <rect x={-20} y={-30} width={40} height={30} rx={4} fill="#E2463F" />
            <path d="M-8 -30 v-6 h16 v6" stroke="#8A2A20" strokeWidth={3} fill="none" />
          </g>
          <Place x={110} y={300} s={0.42} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
          <Sparkles x={250} y={200} r={30} delay={0.8} />
          <Hearts spots={[[180, 150, 1]]} />
        </g>
      );
    // "Tomorrow, the market at two o'clock." Liya thinks: two in the afternoon, I can sleep late!
    case 1:
      return (
        <g>
          <Home id={id} time="evening" />
          <Place x={100} y={300} s={0.46} tap={TAP.grandma}>
            <Grandma mood="happy" arm="raise" />
          </Place>
          <Place x={300} y={300} s={0.42} flip tap={TAP.tsehay}>
            <Liya mood="happy" />
          </Place>
          <Speech x={300} y={100} w={110} h={60} tail="right" delay={0.8} think>
            <ClockFace x={-26} y={0} r={22} hour={2} />
            <circle cx={24} cy={-6} r={10} fill="#FFD233" />
            <path d="M14 14 H36" stroke="#6CC07C" strokeWidth={4} />
          </Speech>
        </g>
      );
    // Next morning: "Liya! It's two o'clock! Everyone's ready!" Her watch says eight in the morning!
    case 2:
      return (
        <g>
          <Home id={id} time="morning" />
          <Bedroll x={150} y={270} w={160} color="#9A5AC0" />
          <Place x={120} y={300} s={0.4} tap={TAP.tsehay}>
            <Liya mood="worried" />
          </Place>
          <g className="wt-shake">
            <Place x={230} y={300} s={0.4} flip tap={TAP.tsehay}>
              <Tsehay mood="joy" pose="point" />
            </Place>
          </g>
          <Watch x={330} y={130} hour={8} s={0.9} />
        </g>
      );
    // "Two o'clock? Eight o'clock? Which is it?" "Both!" buzzes Lali. "Show her the sun!"
    case 3:
      return (
        <g>
          <Village id={id} time="morning" />
          <Place x={90} y={300} s={0.44} tap={TAP.tsehay}>
            <Liya mood="worried" />
          </Place>
          <Place x={300} y={300} s={0.44} flip tap={TAP.cub}>
            <Cub mood="wow" arm="up" />
          </Place>
          <Sign x={90} y={150} kind="?" delay={0.4} />
          <BeeHover x={200} y={110} s={1.1} />
          <Speech x={200} y={60} w={70} h={30} tail="down" delay={1}>
            <circle cx={0} cy={0} r={9} fill="#FFD233" />
          </Speech>
        </g>
      );
    // We count the hours from sunrise: sunrise is twelve, one hour later is one, then two!
    case 4:
      return (
        <g>
          <SkyFor id={id} time="morning" sun={[-100, -100]} />
          <path d="M-10 214 Q200 200 410 216 L410 310 L-10 310Z" fill="#6CC07C" />
          <SunArc hour={2} y={214} />
          {[
            [0, "12"],
            [1, "1"],
            [2, "2"],
          ].map(([h, label], i) => {
            const t = (h as number) / 12;
            const sx = Math.round(40 + t * 320);
            const sy = Math.round(214 - Math.sin(t * Math.PI) * 150);
            return (
              <g key={label} className="wt-count" style={vars({ "--delay": `${0.6 + i * 0.6}s` })}>
                <circle cx={sx - 14} cy={sy - 30} r={14} fill="#FFFFFF" stroke="#E2463F" strokeWidth={3} />
                <text x={sx - 14} y={sy - 24} textAnchor="middle" fontSize={14} fontWeight={900} fill="#E2463F" fontFamily={FONT}>
                  {label}
                </text>
              </g>
            );
          })}
          <Place x={250} y={300} s={0.42} tap={TAP.cub}>
            <Cub mood="happy" arm="reach" />
          </Place>
          <Place x={340} y={300} s={0.4} flip tap={TAP.tsehay}>
            <Liya mood="wow" />
          </Place>
        </g>
      );
    // "The sun rises at about six on your watch: add six!" Two o'clock our way is eight your way.
    case 5:
      return (
        <g>
          <Home id={id} time="morning" />
          <ClockFace x={110} y={120} r={60} hour={2} />
          <text x={110} y={210} textAnchor="middle" fontSize={20} fontWeight={900} fill="#2E9A5A" fontFamily={FONT}>
            2
          </text>
          <text x={200} y={196} textAnchor="middle" fontSize={26} fontWeight={900} fill="#E2463F" fontFamily={FONT} className="wt-count" style={vars({ "--delay": "1s" })}>
            +6
          </text>
          <Watch x={290} y={120} hour={8} s={1.3} />
          <Place x={200} y={300} s={0.4} tap={TAP.tsehay}>
            <Liya mood="joy" />
          </Place>
        </g>
      );
    // Close to the middle of the Earth, the sun comes up at about the same time all year.
    case 6:
      return (
        <g>
          <SkyFor id={id} time="day" sun={[-100, -100]} />
          <Globe x={200} y={130} r={80} path={false} />
          <path d="M120 130 H280" stroke="#E2463F" strokeWidth={3} strokeDasharray="8 6" />
          <circle cx={226} cy={118} r={6} fill="#E2463F" className="lali-pulse" />
          <g transform="translate(340 60)">
            <circle r={22} fill="#FFD233" />
          </g>
          <path d="M-10 236 Q200 222 410 238 L410 310 L-10 310Z" fill="#6CC07C" />
          <Place x={80} y={300} s={0.44} tap={TAP.grandma}>
            <Grandma mood="happy" />
          </Place>
          <Place x={320} y={300} s={0.4} flip tap={TAP.tsehay}>
            <Liya mood="joy" />
          </Place>
        </g>
      );
    // At the market, the signs are in fidel. "That's bu, and that's na: buna! Coffee!"
    case 7:
      return (
        <g>
          <Village id={id} />
          <TownHouse x={200} y={244} s={1.1} />
          <EthSign x={200} y={130} text="ቡና" w={100} color="#7A3E1D" />
          <Place x={90} y={300} s={0.42} tap={TAP.tsehay}>
            <Liya mood="joy" />
          </Place>
          <Place x={320} y={300} s={0.42} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Sparkles x={200} y={130} r={50} delay={1} />
        </g>
      );
    // Grandma's church calendar: Ge'ez numbers, very old, like our fidel.
    case 8:
      return (
        <g>
          <Home id={id} />
          <g transform="translate(200 120)">
            <rect x={-110} y={-80} width={220} height={150} rx={6} fill="#FFFDF4" stroke="#8A5A30" strokeWidth={3} />
            <rect x={-110} y={-80} width={220} height={26} rx={6} fill="#2E9A8A" />
            {GEEZ.slice(0, 12).map((g, i) => (
              <text key={g} x={-80 + (i % 6) * 32} y={-24 + Math.floor(i / 6) * 40} textAnchor="middle" fontSize={20} fontWeight={700} fill={i < 3 ? "#E2463F" : "#1B2A4E"} fontFamily={ETH_FONT} className={i < 3 ? "wt-count" : undefined} style={i < 3 ? vars({ "--delay": `${0.6 + i * 0.4}s` }) : undefined}>
                {g}
              </text>
            ))}
          </g>
          <Place x={70} y={300} s={0.44} tap={TAP.grandma}>
            <Grandma mood="happy" />
          </Place>
          <Place x={330} y={300} s={0.42} flip tap={TAP.tsehay}>
            <Liya mood="wow" />
          </Place>
        </g>
      );
    // "Our fidel, our numbers, our thirteen months, our clock: we still use them every day."
    case 9:
      return (
        <g>
          <Village id={id} />
          {[
            { x: 70, el: <text x={0} y={10} textAnchor="middle" fontSize={30} fontWeight={700} fill="#2B3A8C" fontFamily={ETH_FONT}>ሀ</text> },
            { x: 150, el: <text x={0} y={10} textAnchor="middle" fontSize={30} fontWeight={700} fill="#2B3A8C" fontFamily={ETH_FONT}>፩</text> },
            { x: 230, el: <text x={0} y={10} textAnchor="middle" fontSize={26} fontWeight={900} fill="#2B3A8C" fontFamily={FONT}>13</text> },
            { x: 310, el: <ClockFace x={0} y={0} r={22} hour={2} /> },
          ].map(({ x, el }, i) => (
            <g key={x} transform={`translate(${x} 90)`}>
              <g className="wt-count" style={vars({ "--delay": `${0.4 + i * 0.4}s` })}>
                <circle r={30} fill="#FFFFFF" stroke="#F5B21E" strokeWidth={3} />
                {el}
              </g>
            </g>
          ))}
          <Place x={200} y={300} s={0.46} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Place x={330} y={300} s={0.4} flip tap={TAP.tsehay}>
            <Liya mood="happy" />
          </Place>
        </g>
      );
    // That evening, Liya draws a clock with two rings: her watch outside, the Ethiopian hours inside.
    case 10:
      return (
        <g>
          <Home id={id} time="evening" />
          <DoubleClock x={210} y={140} r={100} />
          <Place x={60} y={300} s={0.4} tap={TAP.tsehay}>
            <Liya mood="happy" />
          </Place>
        </g>
      );
    // "We visit Auntie at three o'clock." "Three hours after sunrise! I'll be ready." And she was.
    case 11:
      return (
        <g>
          <SkyFor id={id} time="morning" sun={[-100, -100]} />
          <path d="M-10 214 Q200 200 410 216 L410 310 L-10 310Z" fill="#6CC07C" />
          <g className="wt-rise">
            <SunArc hour={3} y={214} />
          </g>
          <ClockFace x={330} y={70} r={34} hour={3} />
          <Place x={120} y={300} s={0.44} tap={TAP.tsehay}>
            <Liya mood="joy" />
          </Place>
          <Place x={230} y={300} s={0.42} tap={TAP.grandma}>
            <Grandma mood="joy" />
          </Place>
          <Hearts spots={[[180, 160, 1]]} />
        </g>
      );
    default:
      return null;
  }
}
