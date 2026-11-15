"use client";

import "./grandmas-lost-needle.css";

import { useId, type ReactNode } from "react";

import { Place } from "../../scenery";
import { Grandma, Gugu, TAP, Tsehay } from "./kit-cast";
import { Pop } from "./kit-life";
import { Yard } from "./kit-places";
import { Hearts, Sign, Sparkles, Stool } from "./kit-props";
import { LeafCompass, Magnet, Small, type SmallThing } from "./kit-forces";
import { EarthBall } from "./kit-sky";

/*
  "Grandma's Lost Needle": one living picture per page (12 pages). The needle falls into the long
  grass; Tsehay's magnet; key, nail, bottle top and pin stick; wood, cloth, plastic, paper and glass
  don't; the aluminium pot doesn't either; iron and steel; pulling through paper; two magnets pull
  and push; the floating-leaf compass; the Earth like a giant magnet; the idea; sweeping the grass;
  found, and kept in the sewing basket. Keyframes: kit.css, kit-science.css and
  ./grandmas-lost-needle.css.
*/

/** Long grass along the bottom of the picture. */
function LongGrass({ children }: { children?: ReactNode }) {
  return (
    <g>
      <rect y={240} width={400} height={60} fill="#5E9A4A" />
      {children}
      {Array.from({ length: 50 }, (_, i) => (
        <path key={i} d={`M${i * 8.4} 300 q${(i % 3) - 1} -30 ${(i % 2 ? 6 : -6)} -${44 + (i % 5) * 6}`} stroke={i % 2 ? "#4E8A3A" : "#6EAA4A"} strokeWidth={3} fill="none" />
      ))}
    </g>
  );
}

/** A table of test things: those that stick hang from the magnet, the others stay put. */
function TestTable({ stuck, unstuck }: { stuck: SmallThing[]; unstuck: SmallThing[] }) {
  return (
    <g>
      <rect width={400} height={300} fill="#F4EBD8" />
      <rect x={40} y={220} width={320} height={10} rx={3} fill="#A8743A" />
      <Magnet x={110} y={70} s={2.2} />
      {stuck.map((k, i) => (
        <Pop key={k} x={92 + (i % 2) * 36} y={124 + Math.floor(i / 2) * 26} delay={0.4 + i * 0.4} cls="sln-snap">
          <Small kind={k} s={1.4} rot={90} />
        </Pop>
      ))}
      {unstuck.map((k, i) => (
        <Small key={k} kind={k} x={220 + i * 36} y={208} s={1.5} />
      ))}
    </g>
  );
}

export default function GrandmasLostNeedle({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Grandma mends her netela; her needle slips into the long grass.
    case 0:
      return (
        <g>
          <Yard id={id} time="day" />
          <LongGrass>
            <g className="sln-fall">
              <Small kind="needle" x={0} y={0} s={1.2} rot={70} />
            </g>
          </LongGrass>
          <Stool x={150} y={250} s={1}>
            <Place x={0} y={10} s={0.42} tap={TAP.grandma}>
              <Grandma arm="hold" mood="worried" />
            </Place>
          </Stool>
        </g>
      );
    // Tsehay has a magnet from an old radio. What does a magnet stick to?
    case 1:
      return (
        <g>
          <Yard id={id} time="day" />
          <LongGrass />
          <Place x={150} y={290} s={0.5} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
          <Magnet x={240} y={150} s={1.6} rot={-20} />
          <Sign x={260} y={90} kind="?" delay={1} />
        </g>
      );
    // Scissors, nail, bottle top, pin: click! Wooden spoon, cloth, plastic cup, paper: nothing.
    case 2:
      return <TestTable stuck={["nail", "cap", "clip", "needle"]} unstuck={["spoon-wood", "cloth", "cup-plastic", "paper"]} />;
    // Grandma's light, shiny aluminium pot: nothing. Not every metal sticks.
    case 3:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Small kind="pot-alu" x={210} y={240} s={3.4} />
          <Magnet x={210} y={170} s={1.6} />
          <Sign x={260} y={150} kind="!" delay={1.2} color="#E2783A" />
          <Place x={90} y={294} s={0.44} tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
          <Place x={330} y={294} s={0.44} flip tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
        </g>
      );
    // Magnets pull things made of iron or steel: keys, nails, pins and needles.
    case 4:
      return (
        <g>
          <rect width={400} height={300} fill="#F4EBD8" />
          <g transform="translate(110 150)">
            <circle r={90} fill="#FFE4E4" />
            <Magnet x={0} y={-50} s={1.4} />
            {(["clip", "nail", "needle", "cap"] as SmallThing[]).map((k, i) => (
              <Small key={k} kind={k} x={-40 + (i % 2) * 60} y={10 + Math.floor(i / 2) * 36} s={1.3} />
            ))}
          </g>
          <g transform="translate(290 150)">
            <circle r={90} fill="#E8EEF4" />
            {(["spoon-wood", "cloth", "paper", "pot-alu"] as SmallThing[]).map((k, i) => (
              <Small key={k} kind={k} x={-36 + (i % 2) * 64} y={-26 + Math.floor(i / 2) * 50} s={1.4} />
            ))}
          </g>
        </g>
      );
    // A paper clip on paper, the magnet underneath: the clip slides by itself.
    case 5:
      return (
        <g>
          <rect width={400} height={300} fill="#F4EBD8" />
          <rect x={60} y={90} width={280} height={140} fill="#FFFFFF" stroke="#C9C0B0" strokeWidth={2} />
          <g className="sln-glide">
            <Small kind="clip" x={0} y={0} s={2.4} />
            <g opacity={0.35}>
              <Magnet x={0} y={40} s={1.2} rot={180} />
            </g>
          </g>
          <Place x={360} y={300} s={0.3} flip tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
        </g>
      );
    // Two magnets: one way they snap together; turned round, they push apart.
    case 6:
      return (
        <g>
          <rect width={400} height={300} fill="#F4EBD8" />
          <g transform="translate(0 100)">
            <g className="sln-pull">
              <rect x={70} y={-14} width={60} height={28} fill="#D8343A" />
              <rect x={130} y={-14} width={40} height={28} fill="#2F6FD0" />
            </g>
            <g className="sln-pullR">
              <rect x={230} y={-14} width={40} height={28} fill="#D8343A" />
              <rect x={270} y={-14} width={60} height={28} fill="#2F6FD0" />
            </g>
          </g>
          <g transform="translate(0 210)">
            <g className="sln-push">
              <rect x={70} y={-14} width={60} height={28} fill="#D8343A" />
              <rect x={130} y={-14} width={40} height={28} fill="#2F6FD0" />
            </g>
            <g className="sln-pushR">
              <rect x={230} y={-14} width={40} height={28} fill="#2F6FD0" />
              <rect x={270} y={-14} width={60} height={28} fill="#D8343A" />
            </g>
          </g>
          <Place x={360} y={300} s={0.28} flip tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
        </g>
      );
    // A magnetised pin on a floating leaf turns until it points north: a compass!
    case 7:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <LeafCompass x={200} y={230} s={2.4} />
          <Pop x={200} y={90} delay={2.4}>
            <path d="M0 -20 L10 6 L0 0 L-10 6Z" fill="#D8343A" />
          </Pop>
          <Place x={80} y={294} s={0.44} tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
          <Place x={330} y={294} s={0.42} flip tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
        </g>
      );
    // The Earth is like a giant magnet; travellers use compasses to find their way.
    case 8:
      return (
        <g>
          <rect width={400} height={300} fill="#0E1440" />
          <EarthBall x={200} y={150} r={90} mark={false} />
          {[-1, 1].map((k) => (
            <path key={k} d={`M200 60 Q${200 + k * 150} 150 200 240`} stroke="#E8A0A0" strokeWidth={2} strokeDasharray="5 6" fill="none" />
          ))}
          <path d="M200 30 L210 52 L200 46 L190 52Z" fill="#D8343A" />
        </g>
      );
    // The needle is steel, and the magnet pulls steel!
    case 9:
      return (
        <g>
          <Yard id={id} time="day" />
          <LongGrass />
          <Place x={160} y={290} s={0.5} tap={TAP.tsehay}>
            <Tsehay mood="happy" pose="point" />
          </Place>
          <Sign x={190} y={140} kind="!" delay={0.8} color="#2FA35A" />
        </g>
      );
    // She sweeps the magnet over the grass, back and forth… Click! The needle!
    case 10:
      return (
        <g>
          <Yard id={id} time="day" />
          <LongGrass />
          <g className="sln-sweep">
            <Magnet x={0} y={0} s={1.8}>
              <g className="sln-catch">
                <Small kind="needle" x={-13} y={28} s={1} rot={90} />
              </g>
            </Magnet>
          </g>
          <Place x={330} y={294} s={0.44} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Sparkles x={200} y={200} r={40} delay={2.6} n={5} />
        </g>
      );
    // Grandma claps; the magnet now lives in her sewing basket.
    case 11:
      return (
        <g>
          <Yard id={id} time="evening" />
          <Place x={250} y={294} s={0.5} flip tap={TAP.grandma}>
            <Grandma arm="wrap" />
          </Place>
          <Place x={170} y={296} s={0.42} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <g transform="translate(90 280)">
            <path d="M-26 0 L-30 -24 L30 -24 L26 0Z" fill="#D8B060" />
            <Magnet x={10} y={-36} s={0.8} />
          </g>
          <Hearts spots={[[210, 160, 0.4], [250, 140, 1.2]]} />
        </g>
      );
    default:
      return null;
  }
}

