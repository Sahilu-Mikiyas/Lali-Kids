"use client";

import "./twenty-one-days.css";

import { useId, type ReactNode } from "react";

import { Air, Place } from "../../scenery";
import { Grandma, TAP, Tsehay } from "./kit-cast";
import { Chick, Cow, DayCount, Egg, Goat, Hen, Pop, StrawNest } from "./kit-life";
import { Home, Yard } from "./kit-places";
import { Hearts, Sparkles, Speech } from "./kit-props";
import { Waves } from "./kit-body";

/*
  "Twenty-One Days": one living picture per page (12 pages). The hen who won't leave her nest;
  Tsehay's 21-box chart; looking inside an egg with a torch at night; the hen turning her eggs, with
  grain and water by the nest; the cow and her calf, the goat and her kid; peeping on day 20; the
  first crack and the beak; Tsehay waiting on her paws; the chick flopping out under its mother;
  five fluffy chicks; chicks pecking for themselves; the egg-chick-hen circle. Keyframes: kit.css,
  kit-science.css and ./twenty-one-days.css.
*/

/** Grandma's yard with the straw nest in a shady corner. */
function Farm({ id, time = "day", children }: { id: string; time?: "day" | "morning" | "evening"; children?: ReactNode }) {
  return (
    <g>
      <Yard id={id} time={time} />
      <path d="M220 262 L230 200 L330 196 L340 262Z" fill="#B8864E" opacity={0.5} />
      <path d="M214 204 L280 176 L346 202" stroke="#8A5A2A" strokeWidth={6} fill="none" />
      {children}
    </g>
  );
}

/** A torch (flashlight) pointing up. */
function Torch({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-8} y={0} width={16} height={46} rx={4} fill="#2F6FD0" />
      <path d="M-12 0 L12 0 L8 -10 L-8 -10Z" fill="#9AA8B8" />
      <rect x={-3} y={14} width={6} height={8} rx={2} fill="#F5B21E" />
    </g>
  );
}

/** An egg lit from behind, glowing orange, with the shadow of a growing chick and tiny red lines. */
function GlowEgg({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx={0} cy={-10} r={16} fill="#FFB84A" opacity={0.3} className="snk-glow" />
      <path d="M0 0 C-10 0 -11 -12 -9 -18 C-6 -26 6 -26 9 -18 C11 -12 10 0 0 0Z" fill="#FFA84A" />
      <ellipse cx={1} cy={-12} rx={5} ry={4} fill="#8A4A2A" opacity={0.7} />
      <path d="M1 -12 q-6 -4 -7 -8 M1 -12 q6 -2 7 -7 M1 -12 q-3 6 -6 9 M1 -12 q5 5 6 8" stroke="#D84A3A" strokeWidth={0.7} fill="none" />
    </g>
  );
}

/** The life cycle as a circle: an egg, a chick, a hen, and round again. */
function Cycle() {
  const spots: [number, number, ReactNode][] = [
    [0, -70, <Egg key="a" x={0} y={12} s={1.2} />],
    [76, 30, <Chick key="b" x={0} y={12} s={1.5} />],
    [-76, 30, <Hen key="c" x={-4} y={22} s={0.7} />],
  ];
  return (
    <g transform="translate(200 140)">
      <rect x={-140} y={-112} width={280} height={210} rx={10} fill="#FFFFFF" stroke="#C9B89A" strokeWidth={3} />
      <circle r={70} fill="none" stroke="#E8DCC4" strokeWidth={6} strokeDasharray="20 14" />
      {[60, 180, 300].map((a) => (
        <path key={a} d="M0 -6 L8 0 L0 6Z" fill="#E2783A" transform={`rotate(${a - 90}) translate(70 0) rotate(90)`} />
      ))}
      {spots.map(([x, y, el], i) => (
        <Pop key={i} x={x} y={y} delay={0.5 + i * 0.6}>
          <circle r={28} fill="#FFF4D8" />
          {el}
        </Pop>
      ))}
    </g>
  );
}

export default function TwentyOneDays({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // The brown hen won't leave her straw nest of eggs. "Is she sick?"
    case 0:
      return (
        <g>
          <Farm id={id} time="morning">
            <StrawNest x={280} y={262} s={1.8}>
              <Hen x={0} y={-4} s={1} sit />
            </StrawNest>
          </Farm>
          <Place x={120} y={294} s={0.46} tap={TAP.tsehay}>
            <Tsehay mood="worried" />
          </Place>
          <Speech x={140} y={150} w={40} h={34} tail="down" delay={0.8}>
            <text y={7} textAnchor="middle" fontSize={20} fontWeight={900} fill="#4A6FA8" fontFamily="var(--font-grandstander), sans-serif">
              ?
            </text>
          </Speech>
          <Air kind="day" seed={2} />
        </g>
      );
    // "She's keeping her eggs warm. In twenty-one days, chicks may come." A chart of 21 boxes.
    case 1:
      return (
        <g>
          <Farm id={id}>
            <StrawNest x={300} y={262} s={1.6}>
              <Hen x={0} y={-4} s={1} sit />
            </StrawNest>
          </Farm>
          <DayCount x={136} y={40} n={1} s={1.3} />
          <Place x={90} y={294} s={0.46} tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
          <Place x={190} y={296} s={0.42} tap={TAP.tsehay}>
            <Tsehay mood="happy" pose="point" />
          </Place>
        </g>
      );
    // Night: Grandma holds an egg up to a torch. It glows orange: a dark shadow and tiny red lines.
    case 2:
      return (
        <g>
          <Home id={id} time="night" shelf={false} />
          <rect width={400} height={300} fill="#0A0A20" opacity={0.45} />
          <Torch x={200} y={176} />
          <path d="M188 166 L130 40 L270 40 L212 166Z" fill="#FFE8A0" opacity={0.18} />
          <GlowEgg x={200} y={164} s={3} />
          <Place x={90} y={296} s={0.44} tap={TAP.grandma}>
            <Grandma arm="hold" />
          </Place>
          <Place x={320} y={296} s={0.42} flip tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
        </g>
      );
    // The hen turns her eggs with her beak; Tsehay puts grain and water right next to the nest.
    case 3:
      return (
        <g>
          <Farm id={id}>
            <StrawNest x={270} y={262} s={1.8}>
              <Egg x={-14} y={-4} />
              <Egg x={2} y={-5} rock />
              <Egg x={16} y={-4} />
              <Hen x={-30} y={-4} s={0.8} sit peck flip />
            </StrawNest>
          </Farm>
          <ellipse cx={180} cy={272} rx={18} ry={5} fill="#5BB8E8" stroke="#8A98A8" strokeWidth={2} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle key={i} cx={150 + (i % 3) * 5} cy={270 + Math.floor(i / 3) * 3} r={1.6} fill="#E8C25A" />
          ))}
          <Place x={90} y={294} s={0.44} tap={TAP.tsehay}>
            <Tsehay mood="happy" pose="point" />
          </Place>
          <Air kind="day" seed={4} />
        </g>
      );
    // The other mothers: the cow licking her calf, the calf drinking milk; the goat and her kid.
    case 4:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Cow x={130} y={262} s={1.1} flip />
          <Cow x={150} y={266} s={1.1} calf />
          <Goat x={270} y={256} s={1} flip />
          <Goat x={300} y={262} s={1} kid />
          <Hearts spots={[[120, 170, 0.5], [290, 180, 1.2]]} />
          <Place x={360} y={298} s={0.34} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Place x={50} y={298} s={0.34} tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
        </g>
      );
    // Box after box. On day twenty: a tiny peep from inside an egg!
    case 5:
      return (
        <g>
          <Farm id={id}>
            <StrawNest x={250} y={262} s={1.8}>
              <Hen x={0} y={-4} s={1} sit />
            </StrawNest>
          </Farm>
          <DayCount x={136} y={30} n={20} s={1.3} />
          <Waves x={226} y={220} kind="sound" n={3} dir={-1} />
          <Place x={150} y={294} s={0.46} tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
        </g>
      );
    // Day twenty-one: a crack, a hole, a beak poking through. "Can I peel the shell off to help?"
    case 6:
      return (
        <g>
          <rect width={400} height={300} fill="#F4E4C0" />
          <StrawNest x={200} y={250} s={4.4}>
            <Egg x={0} y={-4} s={1} crack={2} rock />
          </StrawNest>
          <Pop x={300} y={100} delay={1}>
            <Sparkles x={0} y={0} r={20} delay={0} n={4} />
          </Pop>
          <Place x={350} y={300} s={0.36} flip tap={TAP.tsehay}>
            <Tsehay mood="wow" pose="point" />
          </Place>
        </g>
      );
    // She remembers the egg tooth, sits on her paws, and waits.
    case 7:
      return (
        <g>
          <Farm id={id}>
            <StrawNest x={270} y={262} s={1.8}>
              <Egg x={-10} y={-4} crack={2} rock />
              <Egg x={8} y={-4} crack={1} />
            </StrawNest>
          </Farm>
          <Place x={130} y={294} s={0.46} tap={TAP.tsehay}>
            <Tsehay mood="happy" />
          </Place>
          <Speech x={150} y={140} w={64} h={40} tail="down" delay={0.8}>
            <g>
              <path d="M-14 0 Q-14 -12 0 -12 Q14 -12 14 0 Q14 10 0 10 Q-14 10 -14 0Z" fill="#FFE066" />
              <path d="M12 -2 l10 3 l-10 3Z" fill="#F08A2A" />
              <circle cx={20} cy={0} r={2.4} fill="#FFFFFF" stroke="#E2463F" strokeWidth={1} />
            </g>
          </Speech>
          <Air kind="day" seed={6} />
        </g>
      );
    // Crack! The shell breaks in two; the chick flops out, wet and tired, under its mother.
    case 8:
      return (
        <g>
          <Farm id={id} time="evening">
            <StrawNest x={250} y={262} s={1.8}>
              <Hen x={6} y={-4} s={1} sit />
              <Egg x={-22} y={-4} crack={3} />
            </StrawNest>
          </Farm>
          <g transform="translate(212 262)">
            <g className="stw-wet">
              <Chick x={0} y={0} s={1.3} />
            </g>
          </g>
          <Place x={110} y={294} s={0.44} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
        </g>
      );
    // Next morning: one, two, three, four, five fluffy yellow chicks!
    case 9:
      return (
        <g>
          <Farm id={id} time="morning">
            <Hen x={270} y={262} s={1.4} />
          </Farm>
          {[160, 190, 220, 320, 350].map((x, i) => (
            <Pop key={x} x={x} y={272} delay={0.4 + i * 0.4}>
              <Chick x={0} y={0} s={1.3} flip={i > 2} peck delay={-i * 0.4} />
            </Pop>
          ))}
          <Place x={80} y={294} s={0.44} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
          <Air kind="day" seed={8} />
        </g>
      );
    // The chicks run after their mother and peck up seeds themselves; birds don't make milk.
    case 10:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <g className="stw-walk">
            <Hen x={250} y={260} s={1.3} peck />
            {[0, 1, 2, 3, 4].map((i) => (
              <Chick key={i} x={190 - i * 24} y={268 + (i % 2) * 6} s={1.1} peck delay={-i * 0.5} />
            ))}
          </g>
          {Array.from({ length: 10 }, (_, i) => (
            <circle key={i} cx={100 + i * 22} cy={278 + (i % 3) * 3} r={1.6} fill="#E8C25A" />
          ))}
          <Place x={340} y={298} s={0.38} flip tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
          <Place x={60} y={298} s={0.38} tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
        </g>
      );
    // The circle on the back of the chart: egg, chick, hen, egg. Peep, peep! Who's inside?
    case 11:
      return (
        <g>
          <rect width={400} height={300} fill="#F4EBD8" />
          <Cycle />
          {[90, 310].map((x, i) => (
            <Chick key={x} x={x} y={286} s={1.3} flip={i === 1} peck delay={-i} />
          ))}
          <Place x={200} y={300} s={0.3} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
        </g>
      );
    default:
      return null;
  }
}

