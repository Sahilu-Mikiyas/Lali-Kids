"use client";

import "./safety-scenes.css";
import "./dawits-vaccine-day.css";

import { useId } from "react";

import { Air, Place, vars } from "../../scenery";
import { Mama, TAP, Tsehay } from "./kit-cast";
import { Home } from "./kit-places";
import { Hearts, Notes, Sign, Sparkles, Speech, Zzz } from "./kit-props";
import { Dropper, HealthPost, HealthWorker, Plaster, VaccineCard } from "./kit-safety";

/*
  "Dawit's Vaccine Day": one living picture per page (12 pages). No needle is ever drawn: the
  vaccine is a little sparkle and a round plaster, and the drops come from a dropper. The vaccine
  card fills up with ticks; a shield of light shows what vaccines do. Keyframes: kit.css,
  ./safety-scenes.css and ./dawits-vaccine-day.css.
*/

/** A glowing shield (what a vaccine does). */
function Shield({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="dawits-vaccine-day-shield">
        <path d="M0 -26 L22 -18 Q22 10 0 26 Q-22 10 -22 -18Z" fill="#7FD8C8" stroke="#2E9A8A" strokeWidth={3} />
        <path d="M-8 0 l6 6 l12 -14" stroke="#FFFFFF" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  );
}

/** Other mamas and babies waiting (soft shapes). */
function Waiting() {
  return (
    <g>
      {[60, 100].map((wx, i) => (
        <g key={wx} transform={`translate(${wx} 262)`}>
          <path d="M-16 30 Q-18 -10 0 -14 Q18 -10 16 30Z" fill={i ? "#E2463F" : "#FFFDF4"} />
          <circle cx={0} cy={-22} r={11} fill="#5A3A2A" />
          <ellipse cx={10} cy={4} rx={8} ry={6} fill="#FFFDF4" />
        </g>
      ))}
    </g>
  );
}

export default function DawitsVaccineDay({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Vaccine day: the blanket and the vaccine card.
    case 0:
      return (
        <g>
          <Home id={id} time="morning" />
          <Place x={140} y={294} s={0.52} tap={TAP.mama}>
            <Mama mood="happy" baby="awake" />
          </Place>
          <VaccineCard x={270} y={240} s={1.4} ticks={2} />
          <Place x={330} y={296} s={0.36} flip tap={TAP.tsehay}>
            <Tsehay mood="happy" />
          </Place>
          <Air kind="day" seed={3} grass={false} />
        </g>
      );
    // "What's a vaccine?" "It teaches the body to fight off some very bad illnesses."
    case 1:
      return (
        <g>
          <Home id={id} time="morning" />
          <Place x={130} y={294} s={0.52} tap={TAP.mama}>
            <Mama mood="happy" baby="awake" />
          </Place>
          <Place x={280} y={296} s={0.44} flip tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
          <Sign x={280} y={160} kind="?" delay={0.4} />
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    // "Like a shield?" "Just like a shield."
    case 2:
      return (
        <g>
          <Home id={id} time="morning" />
          <Place x={130} y={294} s={0.52} tap={TAP.mama}>
            <Mama mood="joy" baby="awake" />
          </Place>
          <Place x={290} y={296} s={0.44} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="point" />
          </Place>
          <Shield x={210} y={130} s={1.4} />
          <Air kind="day" seed={7} grass={false} />
        </g>
      );
    // Lots of mamas and babies; Dawit's lip begins to wobble.
    case 3:
      return (
        <g>
          <HealthPost id={id}>
            <Waiting />
            <Place x={220} y={294} s={0.52} tap={TAP.mama}>
              <Mama mood="happy" baby="cry" />
            </Place>
            <Place x={310} y={296} s={0.42} flip tap={TAP.tsehay}>
              <Tsehay mood="worried" />
            </Place>
          </HealthPost>
        </g>
      );
    // Tsehay sings his favourite song and makes her funniest face.
    case 4:
      return (
        <g>
          <HealthPost id={id}>
            <Place x={180} y={294} s={0.52} tap={TAP.mama}>
              <Mama mood="happy" baby="awake" />
            </Place>
            <Place x={290} y={296} s={0.42} flip className="dawits-vaccine-day-silly" tap={TAP.tsehay}>
              <Tsehay mood="joy" pose="wave" />
            </Place>
            <Notes x={250} y={170} color="#2E9A8A" />
          </HealthPost>
        </g>
      );
    // His turn. "A tiny pinch, then a big cuddle. A little pinch, a strong shield!"
    case 5:
      return (
        <g>
          <HealthPost id={id}>
            <Place x={150} y={294} s={0.52} tap={TAP.mama}>
              <Mama mood="happy" baby="awake" />
            </Place>
            <Place x={290} y={292} s={0.52} flip tap={TAP.teacher}>
              <HealthWorker mood="joy" pose="wave" />
            </Place>
            <Shield x={220} y={140} s={1} />
          </HealthPost>
        </g>
      );
    // Pinch! "Waaah!" just for a moment; cuddles and a feed; soon smiling.
    case 6:
      return (
        <g>
          <HealthPost id={id}>
            <Place x={160} y={294} s={0.54} tap={TAP.mama}>
              <Mama mood="joy" baby="awake" />
              <Plaster x={140} y={196} s={1.6} />
            </Place>
            <Place x={290} y={296} s={0.42} flip tap={TAP.tsehay}>
              <Tsehay mood="joy" />
            </Place>
            <Hearts spots={[[180, 150, 0.8], [200, 136, 1.6]]} />
          </HealthPost>
        </g>
      );
    // Two drops in his mouth: another vaccine.
    case 7:
      return (
        <g>
          <HealthPost id={id}>
            <Place x={160} y={294} s={0.54} tap={TAP.mama}>
              <Mama mood="happy" baby="wide" />
            </Place>
            <g transform="translate(206 186)">
              <Dropper x={0} y={0} s={1.4} />
            </g>
            <Place x={300} y={292} s={0.52} flip tap={TAP.teacher}>
              <HealthWorker mood="joy" />
            </Place>
          </HealthPost>
        </g>
      );
    // The card: come back in a month. Every vaccine, on time.
    case 8:
      return (
        <g>
          <HealthPost id={id}>
            <g transform="translate(200 160)">
              <g className="safety-grow">
                <VaccineCard x={0} y={0} s={2} ticks={3} />
              </g>
            </g>
            <Place x={110} y={294} s={0.5} tap={TAP.mama}>
              <Mama mood="joy" baby="sleep" />
            </Place>
            <Place x={300} y={292} s={0.52} flip tap={TAP.teacher}>
              <HealthWorker mood="joy" pose="point" />
            </Place>
          </HealthPost>
        </g>
      );
    // A little sore that evening; extra cuddles and feeds; sleep.
    case 9:
      return (
        <g>
          <Home id={id} time="evening" />
          <Place x={180} y={294} s={0.54} tap={TAP.mama}>
            <Mama mood="happy" baby="sleep" />
          </Place>
          <Zzz x={200} y={190} />
          <Place x={310} y={296} s={0.42} flip tap={TAP.tsehay}>
            <Tsehay mood="happy" />
          </Place>
          <Air kind="dusk" seed={19} grass={false} />
        </g>
      );
    // "Did I have pinches too?" Tsehay's old card: every one, on time.
    case 10:
      return (
        <g>
          <Home id={id} time="night" />
          <VaccineCard x={210} y={170} s={1.6} ticks={6} />
          <Sparkles x={210} y={170} r={60} delay={0.6} n={6} />
          <Place x={110} y={294} s={0.5} tap={TAP.mama}>
            <Mama mood="joy" />
          </Place>
          <Place x={300} y={296} s={0.44} flip className="lali-hop" tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Air kind="night" seed={21} grass={false} />
        </g>
      );
    // "Goodnight, little brother. A little pinch, a strong shield!"
    case 11:
      return (
        <g>
          <Home id={id} time="night" />
          <Place x={180} y={294} s={0.54} tap={TAP.mama}>
            <Mama mood="happy" baby="sleep" sleepy />
          </Place>
          <Place x={290} y={296} s={0.42} flip tap={TAP.tsehay}>
            <Tsehay mood="happy" />
          </Place>
          <g style={vars({ "--delay": "0s" })}>
            <Speech x={220} y={130} w={56} h={56} tail="down" delay={0.6}>
              <Shield x={0} y={0} s={0.8} />
            </Speech>
          </g>
          <Air kind="night" seed={23} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
