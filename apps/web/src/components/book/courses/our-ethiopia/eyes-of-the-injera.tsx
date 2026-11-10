"use client";

import "./eyes-of-the-injera.css";

import { useId } from "react";

import { NumberBadge, Place, vars } from "../../scenery";
import { Cub, Grandma, Mama, Papa, TAP } from "./kit-cast";
import { BatterJar, FlourSack, Mitad } from "./kit-crafts";
import { Home } from "./kit-places";
import { Hearts, Mesob, Sign, Sparkles, Speech, Steam } from "./kit-props";

/*
  "Where Are the Eyes?": one living picture per page (12 pages). Anbessa wants to make injera for
  Grandma's birthday; teff flour and water poured at once; flat, stuck, no eyes; "injera can't
  be hurried"; ersho in the clay jar; day one, quiet; day two, a few bubbles; day three, the mitad
  heats; pouring round and round, then the lid; the lid lifts: eyes!; one side only, and a spoon
  saved for next time; the birthday meal. A grown-up always handles the fire: Anbessa stands back.
  Moves: eyes-of-the-injera.css, kit.css, kit-land.css and lali-* (globals.css).
*/

/** A little bowl, with batter (and bubbles) in it. */
function Bowl({ x, y, s = 1, bubbles = false }: { x: number; y: number; s?: number; bubbles?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-20 -10 Q-18 8 0 10 Q18 8 20 -10Z" fill="#B8642A" />
      <ellipse cx={0} cy={-10} rx={20} ry={5} fill="#D8C8A8" />
      {bubbles && [-8, 0, 7].map((cx, i) => <circle key={cx} cx={cx} cy={-10} r={1.8} fill="#F4EEDC" className="ei-pop" style={vars({ "--delay": `${i * 0.4}s` })} />)}
    </g>
  );
}

/** The big clay jar, close up from above: `day` 1 is flat, 2 has a few bubbles, 3 is full of them. */
function JarTop({ day }: { day: 1 | 2 | 3 }) {
  const spots: [number, number][] = [
    [-40, -6], [30, 8], [-10, 14], [50, -10], [-60, 10], [10, -14], [-30, 20], [60, 14], [-50, -14], [24, -4], [0, 4], [-20, -12],
  ];
  const n = day === 1 ? 0 : day === 2 ? 4 : spots.length;
  return (
    <g transform="translate(200 190)">
      <path d="M-120 0 Q-130 90 -60 104 L60 104 Q130 90 120 0Z" fill="#B8642A" />
      <path d="M-124 30 Q0 50 124 30" stroke="#8A4A1E" strokeWidth={3} fill="none" />
      <ellipse cx={0} cy={0} rx={120} ry={34} fill="#8A4A1E" />
      <ellipse cx={0} cy={2} rx={110} ry={30} fill="#D8C8A8" />
      {spots.slice(0, n).map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={day === 3 ? 4 : 2.6} fill="#F4EEDC" stroke="#BFAE8A" strokeWidth={1} className="ei-pop" style={vars({ "--delay": `${(i % 5) * 0.3}s` })} />
      ))}
    </g>
  );
}

/** A flat woven basket plate, for lifting the injera off. */
function FlatBasket({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={60} ry={14} fill="#D9B05A" />
      <ellipse cx={0} cy={0} rx={44} ry={10} fill="none" stroke="#B88A3A" strokeWidth={2} />
      <ellipse cx={0} cy={0} rx={26} ry={6} fill="none" stroke="#E2463F" strokeWidth={2} />
    </g>
  );
}

export default function EyesOfTheInjera({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Nearly Grandma's birthday: "Can I make the injera, all by myself?" Grandma heats the mitad.
    case 0:
      return (
        <g>
          <Home id={id} />
          <Mitad x={210} y={226} s={0.8} />
          <Place x={340} y={300} s={0.46} flip tap={TAP.grandma}>
            <Grandma mood="happy" />
          </Place>
          <Place x={80} y={300} s={0.46} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Speech x={110} y={80} w={70} h={44} tail="left" delay={0.8}>
            <ellipse cx={0} cy={2} rx={24} ry={8} fill="#C9B08A" />
            {[-12, -4, 5, 13, 0, -8, 9].map((cx, i) => (
              <circle key={i} cx={cx} cy={i % 2 ? 4 : 0} r={1.4} fill="#8A7A5A" />
            ))}
          </Speech>
        </g>
      );
    // Teff flour, tiny as dust, stirred with water; Grandma helps pour it straight on. Sssss!
    case 1:
      return (
        <g>
          <Home id={id} />
          <FlourSack x={60} y={256} s={1.1} />
          <Mitad x={230} y={226} s={0.8} injera="batter" />
          <Place x={330} y={300} s={0.46} flip tap={TAP.grandma}>
            <Grandma mood="happy" arm="pour" />
          </Place>
          <Place x={120} y={300} s={0.42} tap={TAP.cub}>
            <Cub mood="happy" item={<Bowl x={0} y={0} s={0.7} />} arm="hold" />
          </Place>
          <Steam x={230} y={200} />
        </g>
      );
    // Flat and heavy, stuck to the mitad, and no holes at all. "Where are the eyes?"
    case 2:
      return (
        <g>
          <Home id={id} />
          <Mitad x={200} y={226} s={1} injera="flat" fire={false} />
          <Place x={70} y={300} s={0.44} tap={TAP.cub}>
            <Cub mood="sad" />
          </Place>
          <Sign x={200} y={130} kind="?" delay={0.8} />
          <Place x={340} y={300} s={0.42} flip tap={TAP.grandma}>
            <Grandma mood="happy" />
          </Place>
        </g>
      );
    // "Injera can't be hurried. The batter must rest two or three days; the bubbles make the eyes."
    case 3:
      return (
        <g>
          <Home id={id} />
          <Place x={130} y={300} s={0.5} tap={TAP.grandma}>
            <Grandma mood="joy" arm="raise" />
          </Place>
          <Place x={290} y={300} s={0.44} flip tap={TAP.cub}>
            <Cub mood="wow" />
          </Place>
          <Speech x={230} y={84} w={120} h={50} tail="left" delay={0.8}>
            {[-38, -20, -2].map((cx, i) => (
              <g key={cx} transform={`translate(${cx} 0)`}>
                <rect x={-7} y={-9} width={14} height={18} rx={2} fill="#FFFDF4" stroke="#1B2A4E" strokeWidth={1.4} />
                <text x={0} y={5} fontSize={11} fontWeight={700} textAnchor="middle" fill="#E2463F" fontFamily="var(--font-grandstander), sans-serif">
                  {i + 1}
                </text>
              </g>
            ))}
            <path d="M10 0 h8 M14 -4 l4 4 l-4 4" stroke="#1B2A4E" strokeWidth={2} fill="none" />
            <g transform="translate(38 0)">
              <ellipse cx={0} cy={0} rx={13} ry={6} fill="#C9B08A" />
              {[-7, -2, 3, 8, 0].map((cx, i) => (
                <circle key={i} cx={cx} cy={i % 2 ? 2 : -1} r={1.2} fill="#8A7A5A" />
              ))}
            </g>
          </Speech>
        </g>
      );
    // The ersho, saved from the last injera, wakes up the new batter. Into the big clay jar.
    case 4:
      return (
        <g>
          <Home id={id} />
          <BatterJar x={200} y={270} s={2} bubbles={false} />
          <Place x={90} y={300} s={0.46} tap={TAP.grandma}>
            <Grandma mood="happy" item={<Bowl x={0} y={0} s={0.7} bubbles />} arm="hold" />
          </Place>
          <Place x={320} y={300} s={0.44} flip tap={TAP.cub}>
            <Cub mood="wow" />
          </Place>
          <Sparkles x={200} y={180} r={30} delay={1} />
        </g>
      );
    // Day one: nothing. Just flat, quiet batter.
    case 5:
      return (
        <g>
          <Home id={id} />
          <JarTop day={1} />
          <NumberBadge x={60} y={60} n="1" delay={0.4} />
          <Place x={340} y={300} s={0.36} flip tap={TAP.cub}>
            <Cub mood="sad" />
          </Place>
        </g>
      );
    // Day two: a few tiny bubbles, and a little sour smell. "They're waking up!"
    case 6:
      return (
        <g>
          <Home id={id} />
          <JarTop day={2} />
          <NumberBadge x={60} y={60} n="2" delay={0.4} />
          <Place x={340} y={300} s={0.36} flip tap={TAP.cub}>
            <Cub mood="wow" />
          </Place>
        </g>
      );
    // Day three, the birthday: the batter bubbles; Grandma heats the big round mitad.
    case 7:
      return (
        <g>
          <Home id={id} />
          <Mitad x={220} y={226} s={0.9} />
          <BatterJar x={60} y={270} s={1.4} />
          <NumberBadge x={60} y={160} n="3" delay={0.4} />
          <Place x={350} y={300} s={0.44} flip tap={TAP.grandma}>
            <Grandma mood="joy" />
          </Place>
          <Sparkles x={220} y={200} r={40} delay={1} />
        </g>
      );
    // With Grandma beside him, Anbessa pours round and round in a spiral; then the woven lid.
    case 8:
      return (
        <g>
          <Home id={id} />
          <Mitad x={210} y={226} s={0.9} injera="batter" />
          <Place x={330} y={300} s={0.46} flip tap={TAP.grandma}>
            <Grandma mood="happy" arm="hold" />
          </Place>
          <Place x={90} y={300} s={0.42} tap={TAP.cub}>
            <Cub mood="happy" arm="reach" />
          </Place>
          <g transform="translate(150 166)">
            <g className="ei-tip">
              <path d="M-12 -14 Q-16 6 -6 12 L8 12 Q16 6 12 -14Z" fill="#B8642A" />
              <path d="M12 -12 L20 -16" stroke="#B8642A" strokeWidth={4} strokeLinecap="round" />
            </g>
          </g>
        </g>
      );
    // The lid lifts: steam, and a big round injera covered with hundreds of tiny holes. "The eyes!"
    case 9:
      return (
        <g>
          <Home id={id} />
          <Mitad x={200} y={226} s={1} injera="eyes" />
          <g className="ei-lift">
            <g transform="translate(200 226)">
              <path d="M-74 0 Q0 -50 74 0Z" fill="#C9A24A" />
              <path d="M-60 -6 Q0 -40 60 -6 M-40 -14 Q0 -34 40 -14" stroke="#A8822E" strokeWidth={2} fill="none" />
              <circle cx={0} cy={-30} r={5} fill="#A8822E" />
            </g>
          </g>
          <Steam x={200} y={190} n={4} />
          <Place x={60} y={300} s={0.42} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Place x={350} y={300} s={0.42} flip tap={TAP.grandma}>
            <Grandma mood="joy" />
          </Place>
          <Sparkles x={200} y={210} r={60} delay={1.6} n={6} />
        </g>
      );
    // One side only: Grandma lifts it off with a flat basket. Anbessa saves a spoon of ersho.
    case 10:
      return (
        <g>
          <Home id={id} />
          <FlatBasket x={210} y={220} s={1.2} />
          <g transform="translate(210 212)">
            <ellipse cx={0} cy={0} rx={56} ry={12} fill="#C9B08A" />
            {[[-40, -2], [-26, 4], [-12, -4], [0, 3], [14, -2], [28, 4], [40, -1], [-20, -6], [6, -7], [22, -6], [-34, 3], [34, 1]].map(([ex, ey], i) => (
              <circle key={i} cx={ex} cy={ey} r={1.4} fill="#8A7A5A" />
            ))}
          </g>
          <Place x={340} y={300} s={0.46} flip tap={TAP.grandma}>
            <Grandma mood="happy" />
          </Place>
          <Place x={80} y={300} s={0.44} tap={TAP.cub}>
            <Cub mood="joy" item={<Bowl x={0} y={0} s={0.7} bubbles />} arm="hold" />
          </Place>
        </g>
      );
    // The birthday meal from Anbessa's injera: "the best ever, because you waited."
    case 11:
      return (
        <g>
          <Home id={id} time="evening" />
          <Mesob x={200} y={250} s={1} stews={3} glow />
          <Place x={60} y={300} s={0.42} tap={TAP.mama}>
            <Mama mood="joy" />
          </Place>
          <Place x={130} y={300} s={0.4} tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Place x={270} y={300} s={0.46} flip tap={TAP.grandma}>
            <Grandma mood="joy" arm="clap" />
          </Place>
          <Place x={350} y={300} s={0.42} flip tap={TAP.papa}>
            <Papa mood="joy" />
          </Place>
          <Hearts spots={[[200, 150, 0.6], [180, 170, 1.2]]} />
        </g>
      );
    default:
      return null;
  }
}
