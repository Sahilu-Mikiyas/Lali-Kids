"use client";

import "./safety-scenes.css";
import "./hold-my-hand-gugu.css";

import { useId, type ReactNode } from "react";

import { Air, Place, vars } from "../../scenery";
import { Cub, Grandma, Gugu, TAP, Tsehay } from "./kit-cast";
import { Truck } from "./kit-more";
import { TownHouse, Yard } from "./kit-places";
import { Sandals, Sparkles } from "./kit-props";
import { Bajaj, CrossingSign, Minibus, Road } from "./kit-safety";

/*
  "Hold My Hand, Gugu!": one living picture per page (12 pages), in town. The road runs across
  the middle of the picture with its zebra crossing; Gugu and Grandma stand on the pavement in
  front. Blue minibuses and bajajs drive past (right to left on the far side, left to right on
  the near side). Keyframes: kit.css, ./safety-scenes.css and ./hold-my-hand-gugu.css.
*/

const ZEBRA = 200;

function Street({ id, zebra = true, children }: { id: string; zebra?: boolean; children?: ReactNode }) {
  return (
    <Yard id={id} time="day" house={false}>
      <TownHouse x={60} y={214} s={0.8} />
      <g transform="translate(300 214)">
        <rect x={-40} y={-60} width={80} height={60} fill="#7FC8C0" />
        <path d="M-46 -60 L46 -60 L40 -74 L-40 -74Z" fill="#E2463F" />
        <rect x={-30} y={-46} width={26} height={46} fill="#8A5A3A" />
        <g transform="translate(18 -30)">
          <Sandals x={0} y={0} s={0.6} />
        </g>
      </g>
      <Road y={222} h={52} zebra={zebra ? ZEBRA : undefined} />
      <rect x={-10} y={274} width={420} height={40} fill="#C9C2B4" />
      <path d="M-10 274 H410" stroke="#9A9AA6" strokeWidth={3} />
      {children}
    </Yard>
  );
}

/** A vehicle passing along the road over and over. */
function Passing({ kind, y, dur, delay = 0, flip = false }: { kind: "bajaj" | "minibus" | "truck"; y: number; dur: number; delay?: number; flip?: boolean }) {
  return (
    <g transform={flip ? "translate(400 0) scale(-1 1)" : undefined}>
      <g className="safety-pass" style={vars({ "--dur": `${dur}s`, "--delay": `${delay}s` })}>
        {kind === "bajaj" && <Bajaj x={0} y={y} s={0.9} />}
        {kind === "minibus" && <Minibus x={0} y={y} s={0.8} />}
        {kind === "truck" && <Truck x={0} y={y} s={0.8} />}
      </g>
    </g>
  );
}

export default function HoldMyHandGugu({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A busy road: minibuses, bajajs, carts and trucks.
    case 0:
      return (
        <g>
          <Street id={id} zebra={false} />
          <Passing kind="minibus" y={250} dur={4} flip />
          <Passing kind="bajaj" y={272} dur={3} delay={-1.2} />
          <Place x={120} y={300} s={0.42} tap={TAP.grandma}>
            <Grandma arm="hold" />
          </Place>
          <Place x={170} y={302} s={0.34} tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
          <Air kind="day" seed={3} grass={false} />
        </g>
      );
    // "There it is!" He lets go of Grandma's hand…
    case 1:
      return (
        <g>
          <Street id={id} zebra={false} />
          <Place x={110} y={300} s={0.42} tap={TAP.grandma}>
            <Grandma arm="raise" mood="worried" />
          </Place>
          <Place x={180} y={302} s={0.34} className="hold-my-hand-gugu-dash" tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    // Grandma holds on, just in time. Beep! A bajaj zooms past.
    case 2:
      return (
        <g>
          <Street id={id} zebra={false} />
          <Passing kind="bajaj" y={272} dur={2} />
          <Place x={140} y={300} s={0.42} tap={TAP.grandma}>
            <Grandma arm="hold" />
          </Place>
          <Place x={185} y={302} s={0.34} tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
          <Air kind="day" seed={7} grass={false} />
        </g>
      );
    // "Drivers can't always see little ones. On the road, we always hold hands."
    case 3:
      return (
        <g>
          <Street id={id} zebra={false} />
          <Passing kind="minibus" y={250} dur={5} flip />
          <Place x={150} y={300} s={0.44} tap={TAP.grandma}>
            <Grandma arm="hold" mood="happy" />
          </Place>
          <Place x={195} y={302} s={0.34} flip tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
          <Air kind="day" seed={9} grass={false} />
        </g>
      );
    // "First we find the zebra crossing."
    case 4:
      return (
        <g>
          <Street id={id} />
          <CrossingSign x={248} y={290} s={0.8} />
          <g className="hold-my-hand-gugu-shine">
            <rect x={ZEBRA - 32} y={224} width={66} height={48} rx={4} fill="#FFFFFF" opacity={0.25} />
          </g>
          <Place x={130} y={300} s={0.42} tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
          <Place x={175} y={302} s={0.34} tap={TAP.gugu}>
            <Gugu mood="happy" pose="point" />
          </Place>
          <Air kind="day" seed={11} grass={false} />
        </g>
      );
    // Stop at the edge, look both ways, listen. Stop, look, listen, hold hands!
    case 5:
      return (
        <g>
          <Street id={id} />
          <CrossingSign x={248} y={290} s={0.8} />
          <Place x={175} y={300} s={0.42} tap={TAP.grandma}>
            <Grandma arm="hold" />
          </Place>
          <Place x={215} y={302} s={0.34} className="safety-look" tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
          <Air kind="day" seed={13} grass={false} />
        </g>
      );
    // This way: a minibus. That way: a truck. Brrrm, beep! "Not yet."
    case 6:
      return (
        <g>
          <Street id={id} />
          <Passing kind="minibus" y={250} dur={3.6} flip />
          <Passing kind="truck" y={272} dur={4.4} delay={-2} />
          <Place x={175} y={300} s={0.42} tap={TAP.grandma}>
            <Grandma arm="hold" />
          </Place>
          <Place x={215} y={302} s={0.34} className="safety-look" tap={TAP.gugu}>
            <Gugu mood="worried" />
          </Place>
          <Air kind="day" seed={15} grass={false} />
        </g>
      );
    // The cars stop; all still. "Now." They walk, not run, across.
    case 7:
      return (
        <g>
          <Street id={id} />
          <Minibus x={96} y={252} s={0.8} />
          <Bajaj x={312} y={272} s={0.9} flip />
          <g className="hold-my-hand-gugu-cross">
            <Place x={190} y={262} s={0.36} tap={TAP.grandma}>
              <Grandma arm="hold" />
            </Place>
            <Place x={222} y={264} s={0.28} tap={TAP.gugu}>
              <Gugu mood="joy" />
            </Place>
          </g>
          <Air kind="day" seed={17} grass={false} />
        </g>
      );
    // Red sandals. "I'll be the crossing leader on the way back!"
    case 8:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <rect x={-10} y={230} width={420} height={80} fill="#C9C2B4" />
          </Yard>
          <g transform="translate(200 120)">
            <rect x={-80} y={-60} width={160} height={110} fill="#7FC8C0" />
            <path d="M-86 -60 L86 -60 L78 -78 L-78 -78Z" fill="#E2463F" />
            {[-50, -20, 10, 40].map((sx) => (
              <g key={sx} transform={`translate(${sx} 20)`}>
                <Sandals x={0} y={0} s={0.7} color={["#E2463F", "#4A7FD0", "#F5B21E", "#3F9A4E"][((sx + 50) / 30) % 4]} />
              </g>
            ))}
          </g>
          <Place x={130} y={298} s={0.44} tap={TAP.grandma}>
            <Grandma arm="clap" mood="joy" />
          </Place>
          <Place x={250} y={300} s={0.4} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Air kind="day" seed={19} grass={false} />
        </g>
      );
    // "Stop, look, listen, hold hands!" The bajaj driver waits, smiling.
    case 9:
      return (
        <g>
          <Street id={id} />
          <Bajaj x={320} y={250} s={0.9} flip />
          <Place x={175} y={300} s={0.42} tap={TAP.grandma}>
            <Grandma arm="hold" mood="joy" />
          </Place>
          <Place x={215} y={302} s={0.34} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Sparkles x={215} y={220} r={30} delay={0.8} n={4} />
          <Air kind="day" seed={21} grass={false} />
        </g>
      );
    // On the bus: sitting, holding on, head and hands inside.
    case 10:
      return (
        <g>
          <rect width={400} height={300} fill="#DDEEF8" />
          <rect x={30} y={60} width={340} height={100} rx={10} fill="#BDE6FF" stroke="#FFFFFF" strokeWidth={8} />
          <g className="hold-my-hand-gugu-view">
            <path d="M0 140 Q100 110 200 130 T420 120 L420 160 L0 160Z" fill="#8FCB80" />
          </g>
          <rect x={-10} y={200} width={420} height={110} fill="#2E6AD0" />
          <rect x={60} y={180} width={280} height={30} rx={8} fill="#1E4A9A" />
          <Place x={160} y={260} s={0.46} tap={TAP.grandma}>
            <Grandma arm="down" mood="joy" />
          </Place>
          <Place x={240} y={262} s={0.38} tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
        </g>
      );
    // The crossing game in the yard with Tsehay and Anbessa.
    case 11:
      return (
        <g>
          <Yard id={id} time="evening">
            {Array.from({ length: 6 }, (_, i) => (
              <rect key={i} x={140 + i * 22} y={262} width={12} height={36} fill="#FFFFFF" opacity={0.8} />
            ))}
          </Yard>
          <Place x={100} y={294} s={0.42} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Place x={210} y={294} s={0.4} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Place x={270} y={294} s={0.4} tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Air kind="dusk" seed={23} />
        </g>
      );
    default:
      return null;
  }
}
