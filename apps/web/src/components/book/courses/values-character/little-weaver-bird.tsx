"use client";

import "./little-weaver-bird.css";

import { useId } from "react";

import { Acacia, Air, Place, vars } from "../../scenery";
import { Cat, Grandma, Gugu, Papa, TAP, Tsehay } from "./kit-cast";
import { Nest, WeaverBird } from "./kit-more";
import { FigTree, Yard } from "./kit-places";
import { Hearts, Sign, Sparkles, Speech } from "./kit-props";

/*
  "The Little Weaver Bird": one living picture per page (12 pages) by the big acacia where the
  yellow weavers hang their round grass nests. The fallen chick is on the ground under the third
  nest; its mother calls from the branch above until it is back home. Keyframes: kit.css and
  ./little-weaver-bird.css.
*/

const NESTS: [number, number][] = [
  [130, 132],
  [170, 124],
  [214, 136],
  [258, 126],
  [296, 134],
];

/** The weavers' acacia with its hanging nests and a few birds flitting about. */
function WeaverTree({ id, time = "day" }: { id: string; time?: "day" | "morning" | "evening" }) {
  return (
    <Yard id={id} time={time} house={false}>
      <Acacia x={214} y={250} s={2.6} />
      {NESTS.map(([x, y]) => (
        <Nest key={x} x={x} y={y} s={1.1} />
      ))}
      <g className="little-weaver-bird-flit">
        <WeaverBird x={100} y={110} s={1.1} flap />
      </g>
      <g className="little-weaver-bird-flit" style={vars({ "--delay": "-2s" })}>
        <WeaverBird x={330} y={100} s={1} flap flip />
      </g>
    </Yard>
  );
}

/** The mother weaver on the branch, calling. */
function Mother({ x = 214, y = 112 }: { x?: number; y?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="little-weaver-bird-call">
        <WeaverBird x={0} y={0} s={1.4} />
      </g>
      <path d="M14 -14 q6 -4 10 0 M16 -20 q8 -6 14 0" stroke="#FFFFFF" strokeWidth={2} fill="none" className="lali-twinkle" />
    </g>
  );
}

export default function LittleWeaverBird({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // The acacia by the path, hung with round grass nests like little lanterns. Chirp, chatter!
    case 0:
      return (
        <g>
          <WeaverTree id={id} />
          <Place x={330} y={294} s={0.42} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Air kind="day" seed={3} />
        </g>
      );
    // After a windy night: a tiny fluffy bird on the ground. Peep! Peep!
    case 1:
      return (
        <g>
          <WeaverTree id={id} time="morning" />
          <WeaverBird x={214} y={280} s={1.6} chick />
          <Sparkles x={214} y={262} r={18} delay={0.8} n={4} />
          <Place x={130} y={294} s={0.44} tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
          <Air kind="day" seed={5} />
        </g>
      );
    // "Let's keep it! A house in a box, my pet!" Gugu reaches out to grab it.
    case 2:
      return (
        <g>
          <WeaverTree id={id} />
          <WeaverBird x={214} y={280} s={1.6} chick />
          <Place x={270} y={294} s={0.46} flip tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <g transform="translate(352 284)">
            <path d="M-16 0 L-16 -20 L16 -20 L16 0Z" fill="#C9A06A" />
            <path d="M-16 -20 L-6 -28 L26 -28 L16 -20Z" fill="#D9B080" />
          </g>
          <Place x={120} y={294} s={0.42} tap={TAP.tsehay}>
            <Tsehay mood="worried" pose="wave" />
          </Place>
          <Air kind="day" seed={7} />
        </g>
      );
    // "Gently, gently: it's someone's baby." They fetch Grandma, who points up.
    case 3:
      return (
        <g>
          <WeaverTree id={id} />
          <WeaverBird x={214} y={280} s={1.6} chick />
          <Place x={300} y={292} s={0.5} flip tap={TAP.grandma}>
            <Grandma mood="happy" arm="raise" />
          </Place>
          <Place x={120} y={294} s={0.42} tap={TAP.tsehay}>
            <Tsehay mood="happy" />
          </Place>
          <Place x={170} y={296} s={0.36} tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
          <Air kind="day" seed={9} />
        </g>
      );
    // The mother weaver hops and calls: CHIP! CHIP! "She wants it back."
    case 4:
      return (
        <g>
          <WeaverTree id={id} />
          <Mother />
          <WeaverBird x={214} y={280} s={1.6} chick />
          <Place x={330} y={292} s={0.46} flip tap={TAP.grandma}>
            <Grandma mood="happy" />
          </Place>
          <Place x={100} y={296} s={0.36} tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
          <Air kind="day" seed={11} />
        </g>
      );
    // "A box is no home for a wild bird. Help gently, then step back."
    case 5:
      return (
        <g>
          <WeaverTree id={id} />
          <Mother />
          <WeaverBird x={214} y={280} s={1.6} chick />
          <Place x={310} y={292} s={0.5} flip tap={TAP.grandma}>
            <Grandma mood="happy" arm="hold" />
          </Place>
          <Speech x={300} y={170} w={56} h={40} tail="down" delay={1}>
            <path d="M-14 8 L-14 -8 L14 -8 L14 8Z" fill="#C9A06A" />
            <path d="M-16 -10 L16 10 M16 -10 L-16 10" stroke="#E2463F" strokeWidth={3} />
          </Speech>
          <Place x={110} y={296} s={0.38} tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
          <Air kind="day" seed={13} />
        </g>
      );
    // Dimmet the cat comes creeping. "No, Dimmet! Not this one!" Gugu stands guard.
    case 6:
      return (
        <g>
          <WeaverTree id={id} />
          <Mother />
          <WeaverBird x={214} y={280} s={1.6} chick />
          <Place x={260} y={294} s={0.46} flip tap={TAP.gugu}>
            <Gugu mood="worried" pose="wave" />
          </Place>
          <g className="little-weaver-bird-cat">
            <g transform="translate(340 290) scale(1.3)">
              <Cat mood="hunt" />
            </g>
          </g>
          <Sign x={300} y={170} kind="!" delay={0.6} color="#E2463F" />
          <Air kind="day" seed={15} />
        </g>
      );
    // Water in a bottle cap. Papa lifts the chick, gently, up, up, back into its nest.
    case 7:
      return (
        <g>
          <WeaverTree id={id} />
          <Mother x={180} y={110} />
          <Place x={270} y={292} s={0.52} flip tap={TAP.papa}>
            <Papa mood="happy" pose="wave" />
          </Place>
          <path d="M250 210 L218 130" stroke="#7A5236" strokeWidth={4} strokeLinecap="round" />
          <g transform="translate(214 136)">
            <g className="little-weaver-bird-lift">
              <WeaverBird x={0} y={0} s={1.1} chick />
            </g>
          </g>
          <g transform="translate(150 284)">
            <ellipse rx={6} ry={2.6} fill="#2F6FD0" />
            <ellipse cx={0} cy={-1} rx={4} ry={1.6} fill="#9FD4F0" />
          </g>
          <Place x={110} y={296} s={0.38} tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
          <Air kind="day" seed={17} />
        </g>
      );
    // Everyone steps back, far back, under the fig tree, and watches quietly.
    case 8:
      return (
        <g>
          <WeaverTree id={id} />
          <FigTree x={60} y={270} s={0.6} />
          {[
            { x: 50, el: <Tsehay mood="happy" />, tap: TAP.tsehay },
            { x: 95, el: <Gugu mood="happy" />, tap: TAP.gugu },
          ].map(({ x, el, tap }) => (
            <Place key={x} x={x} y={296} s={0.32} tap={tap}>
              {el}
            </Place>
          ))}
          <Place x={360} y={292} s={0.44} flip tap={TAP.grandma}>
            <Grandma mood="happy" />
          </Place>
          <Mother x={240} y={110} />
          <Air kind="day" seed={19} />
        </g>
      );
    // The mother flies in with a little green bug, and a tiny voice goes PEEP! PEEP!
    case 9:
      return (
        <g>
          <WeaverTree id={id} />
          <g transform="translate(214 136)">
            <g className="little-weaver-bird-feed">
              <WeaverBird x={-6} y={-6} s={1.3} flip />
              <path d="M-20 -14 q4 -2 6 0" stroke="#4DAA5A" strokeWidth={3} strokeLinecap="round" />
            </g>
          </g>
          <Hearts spots={[[214, 110, 0.6], [230, 96, 1.4]]} />
          <Place x={110} y={296} s={0.4} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Place x={60} y={296} s={0.36} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Air kind="day" seed={21} />
        </g>
      );
    // Every day, from far away. And a dish of water under the tree, filled each morning.
    case 10:
      return (
        <g>
          <WeaverTree id={id} time="morning" />
          <g transform="translate(200 284)">
            <ellipse rx={20} ry={5} fill="#B8683E" />
            <ellipse cx={0} cy={-1} rx={16} ry={3} fill="#9FD4F0" />
          </g>
          <Place x={280} y={294} s={0.46} flip tap={TAP.gugu}>
            <Gugu mood="happy" pose="point" />
          </Place>
          <Air kind="day" seed={23} />
        </g>
      );
    // Three weeks later: real feathers, a hop… and it flies! It drinks from Gugu's dish.
    case 11:
      return (
        <g>
          <WeaverTree id={id} />
          <g transform="translate(200 280)">
            <ellipse rx={20} ry={5} fill="#B8683E" />
            <ellipse cx={0} cy={-1} rx={16} ry={3} fill="#9FD4F0" />
          </g>
          <g className="little-weaver-bird-fly-down">
            <WeaverBird x={204} y={276} s={1.3} />
          </g>
          <Sparkles x={204} y={250} r={24} delay={2.4} n={5} />
          <Place x={300} y={294} s={0.46} flip tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <Place x={80} y={296} s={0.4} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Air kind="day" seed={25} />
        </g>
      );
    default:
      return null;
  }
}
