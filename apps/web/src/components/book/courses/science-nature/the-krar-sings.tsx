"use client";

import "./the-krar-sings.css";

import { useId } from "react";

import { Place, vars } from "../../scenery";
import { Gugu, TAP, Teacher, Tsehay } from "./kit-cast";
import { Kebero, Krar } from "./kit-crafts";
import { Classroom } from "./kit-more";
import { Home } from "./kit-places";
import { Notes, Sign, Sparkles } from "./kit-props";
import { BoxKrar, JumpingGrains } from "./kit-forces";

/*
  "The Krar Sings": one living picture per page (12 pages). Plucking a krar string; the string
  shaking too fast to see; humming with a hand on the throat; teff grains dancing on the kebero;
  sound spreading through the air like ripples; an ear on the desk; tight strings high, loose
  strings low; the big kebero booms, the small drum taks; Gugu's box krar all on one note; the idea:
  tighter and shorter; a tune, low to high; playing together. Keyframes: kit.css, kit-science.css and
  ./the-krar-sings.css.
*/

/** Rings of sound spreading out from (x, y), like ripples on a pond. */
function SoundRings({ x, y, n = 4, color = "#7C3AED", r = 120 }: { x: number; y: number; n?: number; color?: string; r?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} r={r} fill="none" stroke={color} strokeWidth={3} className="sks-ring" style={vars({ "--delay": `${(i * 2.4) / n}s` })} />
      ))}
    </g>
  );
}

/** A school desk seen from the side: a long top on two legs. */
function Desk({ x, y, w = 240 }: { x: number; y: number; w?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-w / 2} y={0} width={w} height={14} rx={3} fill="#A8743A" />
      <path d={`M${-w / 2 + 16} 14 V60 M${w / 2 - 16} 14 V60`} stroke="#8A5A2A" strokeWidth={8} />
    </g>
  );
}

/** A big music note at (x, y), high or low (for pitch). */
function Note({ x, y, color = "#7C3AED", delay = 0 }: { x: number; y: number; color?: string; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="sks-note" style={vars({ "--delay": `${delay}s` })}>
        <ellipse cx={0} cy={0} rx={8} ry={6} fill={color} transform="rotate(-20)" />
        <path d="M7 -2 V-30 q8 4 10 12" stroke={color} strokeWidth={3} fill="none" />
      </g>
    </g>
  );
}

export default function TheKrarSings({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Teacher Meron brings a krar and a kebero. Gugu plucks a string: twang!
    case 0:
      return (
        <Classroom id={id}>
          <Krar x={200} y={250} s={1.3} play />
          <Kebero x={300} y={262} s={1.1} />
          <Notes x={220} y={130} color="#7C3AED" />
          <Place x={110} y={296} s={0.42} tap={TAP.gugu}>
            <Gugu mood="wow" pose="point" />
          </Place>
          <Place x={360} y={298} s={0.38} flip tap={TAP.mama}>
            <Teacher pose="point" />
          </Place>
        </Classroom>
      );
    // The string shakes back and forth so fast it looks blurry.
    case 1:
      return (
        <g>
          <rect width={400} height={300} fill="#F4EBD8" />
          <Krar x={200} y={290} s={3.4} play />
          <g transform="translate(200 160)">
            <path d="M-34 0 q-8 -10 0 -20 M34 0 q8 -10 0 -20" stroke="#7C3AED" strokeWidth={3} fill="none" className="sks-flick" />
          </g>
          <Place x={350} y={300} s={0.32} flip tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
        </g>
      );
    // Hum with your hand on your throat: it buzzes! Sounds come from vibrations.
    case 2:
      return (
        <Classroom id={id}>
          <Place x={200} y={296} s={0.62} tap={TAP.gugu}>
            <Gugu mood="happy" pose="point" />
          </Place>
          <g transform="translate(200 186)">
            <path d="M-36 -6 q-6 6 0 12 M-46 -12 q-10 12 0 24 M36 -6 q6 6 0 12 M46 -12 q10 12 0 24" stroke="#7C3AED" strokeWidth={3} fill="none" className="sks-flick" />
          </g>
          <Notes x={250} y={130} color="#7C3AED" />
        </Classroom>
      );
    // Teff grains on the kebero jump and dance: the drum skin is shaking.
    case 3:
      return (
        <g>
          <rect width={400} height={300} fill="#F4EBD8" />
          <Kebero x={200} y={290} s={3.6} />
          <JumpingGrains x={200} y={132} w={100} n={16} />
          <g className="sks-tap">
            <path d="M290 60 L232 124" stroke="#8A5A36" strokeWidth={8} strokeLinecap="round" />
          </g>
          <Place x={70} y={300} s={0.34} tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
        </g>
      );
    // The shaking spreads through the air like ripples in a pond, all the way to your ears.
    case 4:
      return (
        <g>
          <rect width={400} height={300} fill="#DDEFF8" />
          <rect y={250} width={400} height={50} fill="#B88A5A" />
          <SoundRings x={90} y={190} r={300} />
          <Krar x={90} y={250} s={1.2} play />
          <Place x={330} y={294} s={0.46} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
        </g>
      );
    // Ear on the desk; Tsehay taps the far end. Sound travels through wood too!
    case 5:
      return (
        <Classroom id={id}>
          <Desk x={200} y={226} w={300} />
          <g className="sks-ripple-line">
            <path d="M80 233 q10 -5 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0" stroke="#7C3AED" strokeWidth={2.4} fill="none" />
          </g>
          <Place x={80} y={250} s={0.4} tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
          <g className="sks-tap">
            <Place x={330} y={290} s={0.4} flip tap={TAP.tsehay}>
              <Tsehay mood="happy" pose="point" />
            </Place>
          </g>
        </Classroom>
      );
    // Tight strings sing high; loose strings sing low.
    case 6:
      return (
        <Classroom id={id}>
          <Krar x={150} y={262} s={1.6} play />
          <Note x={250} y={90} color="#E2463F" delay={0.2} />
          <Note x={290} y={200} color="#2F6FD0" delay={1.2} />
          <g transform="translate(250 60)">
            <path d="M0 -10 L8 4 H-8Z" fill="#E2463F" />
          </g>
          <g transform="translate(290 232)">
            <path d="M0 10 L8 -4 H-8Z" fill="#2F6FD0" />
          </g>
          <Place x={360} y={298} s={0.38} flip tap={TAP.mama}>
            <Teacher pose="point" />
          </Place>
        </Classroom>
      );
    // The big kebero booms low; a small drum sounds higher. Boom! Tak!
    case 7:
      return (
        <Classroom id={id}>
          <Kebero x={130} y={280} s={2.2} play />
          <Kebero x={290} y={272} s={1} play />
          <Note x={130} y={150} color="#2F6FD0" />
          <Note x={290} y={70} color="#E2463F" delay={0.5} />
        </Classroom>
      );
    // At home: rubber bands round an open box. Every band sings the same low note.
    case 8:
      return (
        <g>
          <Home id={id} time="day" />
          <BoxKrar x={230} y={262} s={1.8} pluck={1} />
          {[0, 1, 2].map((i) => (
            <Note key={i} x={190 + i * 50} y={150} color="#2F6FD0" delay={i * 0.5} />
          ))}
          <Place x={100} y={296} s={0.44} tap={TAP.gugu}>
            <Gugu mood="sad" pose="point" />
          </Place>
        </g>
      );
    // Tight strings high, short strings high: stretch one tighter, wedge a pencil under another.
    case 9:
      return (
        <g>
          <Home id={id} time="day" />
          <BoxKrar x={230} y={262} s={1.8} tuned />
          <Place x={100} y={296} s={0.44} tap={TAP.gugu}>
            <Gugu mood="happy" pose="point" />
          </Place>
          <Sign x={140} y={150} kind="!" delay={0.8} color="#2FA35A" />
        </g>
      );
    // Twung, twang, tweeng! Each band sings a different note, low to high: a little tune.
    case 10:
      return (
        <g>
          <Home id={id} time="day" />
          <BoxKrar x={230} y={262} s={1.8} tuned pluck={2} />
          {["#E2463F", "#F5922A", "#2E9A5A", "#2F6FD0"].map((c, i) => (
            <Note key={c} x={170 + i * 42} y={190 - i * 30} color={["#2F6FD0", "#2E9A5A", "#F5922A", "#E2463F"][i]} delay={i * 0.4} />
          ))}
          <Place x={90} y={296} s={0.44} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
        </g>
      );
    // Next day: box krar, real krar and kebero together. Everyone sings!
    case 11:
      return (
        <Classroom id={id}>
          <BoxKrar x={110} y={270} s={1.1} tuned pluck={0} />
          <Krar x={210} y={262} s={1.1} play />
          <Kebero x={300} y={272} s={1} play />
          <Place x={60} y={298} s={0.36} tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <Place x={250} y={298} s={0.36} tap={TAP.mama}>
            <Teacher pose="point" />
          </Place>
          <Place x={360} y={298} s={0.36} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Notes x={200} y={120} color="#7C3AED" n={4} />
          <Sparkles x={200} y={100} r={60} delay={0.8} n={6} />
        </Classroom>
      );
    default:
      return null;
  }
}
