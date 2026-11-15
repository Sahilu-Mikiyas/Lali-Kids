"use client";

import "./kites-and-clouds.css";

import { useId } from "react";

import { Air, Place, Rain, vars } from "../../scenery";
import { Cub, Grandma, TAP, Tsehay } from "./kit-cast";
import { HighlandFarm } from "./kit-land";
import { Home, Yard } from "./kit-places";
import { Kite, Sparkles } from "./kit-props";
import { Fluffy, Pinwheel, StormTower, WindLines, WispyCloud } from "./kit-sky";

/*
  "Kites and Clouds": one living picture per page (12 pages). The kite that flops; wind is moving
  air; the grass, the smoke, the washing and a ribbon on a stick; the kite flying; fluffy fair-weather
  clouds; wispy ice clouds and tall storm clouds; kiremt and bega; the storm coming toward the
  washing; bringing it in just in time; stay indoors in a storm; Tsehay's pinwheel and the wind
  turbines; kite and pinwheel on a fine morning. Keyframes: kit.css, kit-science.css and
  ./kites-and-clouds.css.
*/

/** A washing line with clothes, flapping in the wind (or still). */
function Washing({ x, y, flap = true, empty = false }: { x: number; y: number; flap?: boolean; empty?: boolean }) {
  const cols = ["#E2463F", "#F4EEDC", "#2F6FD0", "#F5B21E"];
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-70 -70 V0 M70 -70 V0" stroke="#7A5236" strokeWidth={4} />
      <path d="M-70 -66 Q0 -58 70 -66" stroke="#D8B878" strokeWidth={1.6} fill="none" />
      {!empty &&
        cols.map((c, i) => (
          <g key={c} transform={`translate(${-50 + i * 32} -62)`}>
            <g className={flap ? "skc-flap" : undefined} style={vars({ "--delay": `${-i * 0.2}s` })}>
              <path d="M-12 0 H12 L10 26 H-10Z" fill={c} />
            </g>
          </g>
        ))}
    </g>
  );
}

/** A ribbon on a stick blowing in the wind. */
function Ribbon({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 0 V-60" stroke="#7A5236" strokeWidth={3} />
      <g transform="translate(0 -58)">
        <g className="skc-flap">
          <path d="M0 0 Q14 -4 28 2 Q40 6 50 0" stroke="#E2463F" strokeWidth={5} fill="none" strokeLinecap="round" />
        </g>
      </g>
    </g>
  );
}

export default function KitesAndClouds({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // The new kite flops in the grass. "Where is the wind today?"
    case 0:
      return (
        <g>
          <Yard id={id} time="day" />
          <g transform="translate(220 270) rotate(70)">
            <Kite x={0} y={0} s={0.9} />
          </g>
          <Place x={120} y={294} s={0.48} tap={TAP.cub}>
            <Cub mood="worried" />
          </Place>
        </g>
      );
    // Wind is moving air: you can't see it, but you can feel it push. Whoosh!
    case 1:
      return (
        <g>
          <Home id={id} time="day" />
          <Place x={140} y={294} s={0.5} tap={TAP.cub}>
            <Cub mood="wow" arm="reach" />
          </Place>
          <WindLines x={190} y={180} n={3} w={50} />
          <Place x={320} y={294} s={0.46} flip tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
        </g>
      );
    // The grass bends, the smoke leans, the washing flaps, the ribbon points the way.
    case 2:
      return (
        <g>
          <Yard id={id} time="day" />
          <Washing x={230} y={270} />
          <Ribbon x={110} y={286} />
          <WindLines x={40} y={90} n={3} />
          <Place x={330} y={296} s={0.4} flip tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Air kind="day" seed={3} />
        </g>
      );
    // Into the wind, and up, up goes the kite!
    case 3:
      return (
        <g>
          <Yard id={id} time="day" />
          <g className="skc-fly">
            <Kite x={280} y={80} s={1.2} sx={-150} sy={200} />
          </g>
          <WindLines x={40} y={60} n={3} />
          <Place x={120} y={294} s={0.48} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Air kind="day" seed={4} />
        </g>
      );
    // Fluffy white clouds on a sunny day: fine weather.
    case 4:
      return (
        <g>
          <Yard id={id} time="day" />
          <g className="skc-drift">
            <Fluffy x={120} y={70} s={1.2} />
            <Fluffy x={290} y={110} s={0.9} />
          </g>
          <Kite x={230} y={140} s={0.8} sx={-100} sy={130} />
          <Place x={120} y={294} s={0.46} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Place x={320} y={294} s={0.44} flip tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
        </g>
      );
    // Thin, wispy clouds high up are tiny bits of ice; tall, dark clouds bring storms.
    case 5:
      return (
        <g>
          <rect width={400} height={300} fill="#9FCCF0" />
          <WispyCloud x={100} y={50} s={1.4} />
          <WispyCloud x={220} y={36} s={1} />
          <StormTower x={300} y={200} s={1.4} />
          <path d="M-10 300 L-10 250 Q200 236 410 250 L410 300Z" fill="#8FCB80" />
          <Place x={90} y={298} s={0.36} tap={TAP.cub}>
            <Cub mood="wow" />
          </Place>
        </g>
      );
    // Kiremt: wet winds bring lots of clouds and the big rains. Bega: clear and dry.
    case 6:
      return (
        <g>
          <g>
            <HighlandFarm id={`${id}a`} season="kiremt" />
            <Rain />
          </g>
          <g className="skc-split">
            <rect x={200} width={200} height={300} fill="#BFE4FA" />
            <path d="M200 300 L200 220 Q300 210 400 220 L400 300Z" fill="#E3C27C" />
            <circle cx={330} cy={70} r={26} fill="#FFD54A" />
          </g>
          <path d="M200 0 V300" stroke="#FFFFFF" strokeWidth={4} />
        </g>
      );
    // Tall, dark clouds piling up, blown this way. Tsehay's washing is still on the line!
    case 7:
      return (
        <g>
          <Yard id={id} time="day" />
          <rect width={400} height={300} fill="#3A4466" opacity={0.25} />
          <g className="skc-come">
            <StormTower x={330} y={140} s={1.2} rain={false} />
          </g>
          <Washing x={180} y={270} />
          <Place x={80} y={294} s={0.46} tap={TAP.cub}>
            <Cub mood="wow" arm="up" />
          </Place>
        </g>
      );
    // "A storm is coming!" They grab the washing and reach the door as the rain pours down.
    case 8:
      return (
        <g>
          <Yard id={id} time="day" />
          <rect width={400} height={300} fill="#3A4466" opacity={0.4} />
          <StormTower x={200} y={110} s={1.6} bolt />
          <Washing x={180} y={270} flap={false} empty />
          <g className="skc-dash">
            <Place x={290} y={294} s={0.42} tap={TAP.cub}>
              <Cub mood="joy" arm="hold" />
            </Place>
            <Place x={340} y={296} s={0.4} tap={TAP.tsehay}>
              <Tsehay mood="joy" />
            </Place>
          </g>
          <Rain heavy />
        </g>
      );
    // "In a storm, we stay indoors." Then the wind and sun dry everything.
    case 9:
      return (
        <g>
          <Yard id={id} time="day" />
          <Washing x={200} y={270} />
          <WindLines x={40} y={100} n={2} />
          <Place x={90} y={296} s={0.44} tap={TAP.grandma}>
            <Grandma arm="clap" />
          </Place>
          <Place x={330} y={296} s={0.42} flip tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
        </g>
      );
    // Tsehay's paper pinwheel spins; near Adama, giant ones make electricity.
    case 10:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          {[230, 290, 350].map((x, i) => (
            <g key={x} transform={`translate(${x} 200)`}>
              <path d="M0 0 V-90" stroke="#E8ECF0" strokeWidth={4} />
              <g transform="translate(0 -90)">
                <g className="lali-spin" style={vars({ "--dur": `${3 + i * 0.4}s` })}>
                  {[0, 120, 240].map((a) => (
                    <path key={a} d="M0 0 L-3 -40 L3 -40Z" fill="#F4F6F8" transform={`rotate(${a})`} />
                  ))}
                </g>
              </g>
            </g>
          ))}
          <Pinwheel x={130} y={210} s={1.6} />
          <Place x={100} y={296} s={0.46} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
        </g>
      );
    // A fine morning: the kite flies high and the pinwheel spins. Feel it blow, watch it go!
    case 11:
      return (
        <g>
          <Yard id={id} time="morning" />
          <Fluffy x={120} y={60} s={1} />
          <Kite x={270} y={70} s={1.1} sx={-140} sy={210} />
          <Pinwheel x={330} y={220} s={1.2} />
          <Place x={130} y={294} s={0.46} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Place x={320} y={296} s={0.4} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
          <Sparkles x={250} y={90} r={40} delay={1} n={4} />
        </g>
      );
    default:
      return null;
  }
}
