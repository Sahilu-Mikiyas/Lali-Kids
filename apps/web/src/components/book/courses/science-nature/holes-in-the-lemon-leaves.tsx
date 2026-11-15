"use client";

import "./holes-in-the-lemon-leaves.css";

import { useId, type ReactNode } from "react";

import { Air, Flower, Place, vars } from "../../scenery";
import { Camel, TAP } from "./kit-cast";
import { Caterpillar, Chrysalis, DayCount, LemonLeaf, Magnifier, Pop, Swallowtail } from "./kit-life";
import { LemonPlant } from "./kit-more";
import { TownHouse, Yard } from "./kit-places";
import { Sign, Sparkles, Speech } from "./kit-props";

/*
  "Who Ate the Lemon Leaves?": one living picture per page (12 pages). Holes in Hooyo's lemon leaves
  in Jijiga; the bird-dropping caterpillar under the magnifying glass; the round yellow egg and the
  black-and-yellow butterfly; "Let's watch first"; the caterpillar's jar home; eating and shedding
  its skin; the green chrysalis; waiting; the butterfly crawling out; drying its wings; flying to
  the flowers and back to the lemon tree; dancing round the tree. Keyframes: kit.css,
  kit-science.css and ./holes-in-the-lemon-leaves.css.
*/

/** Ayan's yard in Jijiga: warm and dry, a flat-roofed house and Hooyo's lemon tree by its wall. */
function JijigaYard({ id, time = "day", stage = 4, children }: { id: string; time?: "day" | "morning" | "evening"; stage?: number; children?: ReactNode }) {
  return (
    <g>
      <Yard id={id} time={time} house={false} />
      <TownHouse x={330} y={226} s={0.9} wall="#F2D8A8" trim="#2E9A8A" />
      <LemonPlant x={200} y={252} s={2.2} stage={stage} tin={false} />
      {children}
    </g>
  );
}

/** The caterpillar's home: a big glass jar with a stick, fresh leaves and a cloth tied over the top. */
function Jar({ x, y, s = 1, open = false, children }: { x: number; y: number; s?: number; open?: boolean; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-50 0 L-54 -120 Q-54 -130 -44 -130 L44 -130 Q54 -130 54 -120 L50 0 Q0 6 -50 0Z" fill="#E6F4FB" opacity={0.7} />
      <path d="M-30 0 L24 -110" stroke="#8A5A36" strokeWidth={4} strokeLinecap="round" />
      <LemonLeaf x={-40} y={-10} s={1.2} rot={-20} />
      <LemonLeaf x={0} y={-6} s={1.1} rot={10} />
      {children}
      <path d="M-50 0 L-54 -120 Q-54 -130 -44 -130 L44 -130 Q54 -130 54 -120 L50 0" stroke="#A8D0E4" strokeWidth={3} fill="none" />
      <path d="M38 -116 V-14" stroke="#FFFFFF" strokeWidth={4} strokeLinecap="round" opacity={0.7} />
      {!open && (
        <g>
          <path d="M-58 -128 Q0 -146 58 -128 L56 -116 Q0 -128 -56 -116Z" fill="#F4EEDC" />
          <path d="M-56 -120 Q0 -132 56 -120" stroke="#E2463F" strokeWidth={2.4} fill="none" />
        </g>
      )}
    </g>
  );
}

export default function HolesInTheLemonLeaves({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Hooyo's lemon tree by the wall in Jijiga; holes in the leaves. "Who is eating our lemon tree?"
    case 0:
      return (
        <g>
          <JijigaYard id={id} time="morning">
            <Pop x={250} y={150} delay={0.8}>
              <LemonLeaf x={0} y={0} s={1.6} bitten rot={-10} />
            </Pop>
            <Pop x={150} y={170} delay={1.2}>
              <LemonLeaf x={0} y={0} s={1.4} bitten rot={160} />
            </Pop>
          </JijigaYard>
          <Place x={100} y={292} s={0.46} tap={TAP.ayan}>
            <Camel mood="wow" />
          </Place>
          <Sign x={110} y={150} kind="?" delay={1.6} />
          <Air kind="day" seed={3} />
        </g>
      );
    // "The goats!" The holes are too high and too small. Under a leaf: a brown-and-white lump. It moves!
    case 1:
      return (
        <g>
          <rect width={400} height={300} fill="#E8F2D8" />
          <LemonLeaf x={60} y={160} s={7} rot={-6} bitten />
          <Magnifier x={200} y={146} s={4} rot={-30} />
          <Caterpillar x={160} y={150} s={4} young />
          <Place x={350} y={298} s={0.34} flip tap={TAP.ayan}>
            <Camel who="abdi" mood="wow" />
          </Place>
        </g>
      );
    // A round yellow egg on a leaf; the black-and-yellow butterfly flutters down and touches a leaf.
    case 2:
      return (
        <g>
          <rect width={400} height={300} fill="#E8F2D8" />
          <LemonLeaf x={60} y={200} s={6} rot={-8} egg />
          <g className="shl-visit">
            <Swallowtail x={0} y={0} s={2.6} />
          </g>
          <Pop x={180} y={186} delay={1}>
            <circle r={18} fill="none" stroke="#E2783A" strokeWidth={3} strokeDasharray="6 4" />
          </Pop>
        </g>
      );
    // "They'll eat the whole tree!" Hooyo: "Let's watch first. Our tree has hundreds of leaves."
    case 3:
      return (
        <g>
          <JijigaYard id={id} />
          <Place x={90} y={292} s={0.44} tap={TAP.ayan}>
            <Camel mood="worried" />
          </Place>
          <Place x={330} y={296} s={0.5} flip tap={TAP.mama}>
            <Camel who="hooyo" mood="happy" />
          </Place>
          <Speech x={300} y={130} w={50} h={36} tail="down" delay={0.8}>
            <g>
              <circle cx={-6} cy={0} r={6} fill="#FFFFFF" stroke="#1B2A4E" strokeWidth={2} />
              <circle cx={10} cy={0} r={6} fill="#FFFFFF" stroke="#1B2A4E" strokeWidth={2} />
              <circle cx={-5} cy={1} r={2.4} fill="#1B2A4E" />
              <circle cx={11} cy={1} r={2.4} fill="#1B2A4E" />
            </g>
          </Speech>
          <Air kind="day" seed={5} />
        </g>
      );
    // A home in a big jar: fresh lemon leaves, a stick to climb, air through the cloth, in the shade.
    case 4:
      return (
        <g>
          <JijigaYard id={id} />
          <Jar x={200} y={270} s={0.9}>
            <Caterpillar x={-30} y={-14} s={1.4} />
          </Jar>
          <Place x={80} y={294} s={0.44} tap={TAP.ayan}>
            <Camel mood="happy" />
          </Place>
          <Place x={320} y={296} s={0.36} flip tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <Sparkles x={200} y={150} r={40} delay={1} n={4} />
        </g>
      );
    // Munch, munch: it eats and grows; it wriggles out of its tight old skin. Big and bright green.
    case 5:
      return (
        <g>
          <rect width={400} height={300} fill="#EAF6FB" />
          <LemonLeaf x={60} y={200} s={6} rot={-8} bitten />
          <Caterpillar x={170} y={186} s={5} />
          <path d="M90 214 q10 -8 20 0 q10 -6 18 2" stroke="#C9B890" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.8} />
          <Pop x={300} y={110} delay={1}>
            <Sparkles x={0} y={0} r={20} delay={0} n={3} />
          </Pop>
        </g>
      );
    // It stops eating, spins a silk belt and hangs still: the next morning, a green chrysalis.
    case 6:
      return (
        <g>
          <rect width={400} height={300} fill="#EAF6FB" />
          <path d="M60 80 L340 120" stroke="#8A5A36" strokeWidth={10} strokeLinecap="round" />
          <g transform="translate(200 102) rotate(8)">
            <Chrysalis x={0} y={0} s={4.2} />
          </g>
        </g>
      );
    // Days go by; nothing moves. "I think it died." "It's changing inside." About two weeks.
    case 7:
      return (
        <g>
          <JijigaYard id={id} time="evening" />
          <Jar x={200} y={270} s={0.9}>
            <g transform="translate(6 -96)">
              <Chrysalis x={0} y={0} s={1.2} />
            </g>
          </Jar>
          <DayCount x={40} y={30} n={11} total={14} />
          <Place x={90} y={294} s={0.36} tap={TAP.ayan}>
            <Camel who="abdi" mood="sad" />
          </Place>
          <Place x={320} y={292} s={0.44} flip tap={TAP.ayan}>
            <Camel mood="happy" />
          </Place>
        </g>
      );
    // The chrysalis turns dark; yellow shows through. Crack! A butterfly crawls out, wings wet and crumpled.
    case 8:
      return (
        <g>
          <rect width={400} height={300} fill="#EAF6FB" />
          <path d="M60 80 L340 120" stroke="#8A5A36" strokeWidth={10} strokeLinecap="round" />
          <g transform="translate(150 95) rotate(8)">
            <Chrysalis x={0} y={0} s={3.4} open />
          </g>
          <g transform="translate(250 160)">
            <g className="shl-crumple">
              <Swallowtail x={0} y={0} s={2.6} flap={false} rot={90} />
            </g>
          </g>
        </g>
      );
    // She holds on and waits; slowly her wings spread and dry. She opens and closes them in the sun.
    case 9:
      return (
        <g>
          <rect width={400} height={300} fill="#FFF4D8" />
          <circle cx={340} cy={60} r={30} fill="#FFD54A" />
          <path d="M60 80 L340 120" stroke="#8A5A36" strokeWidth={10} strokeLinecap="round" />
          <Swallowtail x={210} y={160} s={4.4} slow />
        </g>
      );
    // Outside: the cloth comes off; she flies to Hooyo's flowers, then touches a lemon leaf: an egg!
    case 10:
      return (
        <g>
          <JijigaYard id={id}>
            {[80, 110, 300].map((x, i) => (
              <Flower key={x} x={x} y={262} h={34} color={["#E2463F", "#F5B21E", "#8A5AB8"][i]} delay={-i * 0.5} />
            ))}
          </JijigaYard>
          <Jar x={130} y={286} s={0.5} open />
          <g className="shl-fly">
            <Swallowtail x={0} y={0} s={1.4} />
          </g>
          <Place x={330} y={296} s={0.36} flip tap={TAP.ayan}>
            <Camel who="abdi" mood="wow" />
          </Place>
          <Place x={60} y={294} s={0.4} tap={TAP.ayan}>
            <Camel mood="joy" />
          </Place>
        </g>
      );
    // The tree still has plenty of leaves and lemons. Egg, caterpillar, chrysalis, butterfly!
    case 11:
      return (
        <g>
          <JijigaYard id={id} time="evening" stage={5} />
          <g className="shl-dance">
            <Place x={100} y={292} s={0.42} tap={TAP.ayan}>
              <Camel mood="joy" walk />
            </Place>
          </g>
          <g className="shl-dance" style={vars({ animationDelay: "-1s" })}>
            <Place x={300} y={294} s={0.34} flip tap={TAP.ayan}>
              <Camel who="abdi" mood="joy" walk />
            </Place>
          </g>
          <Swallowtail x={200} y={60} s={1.2} />
          <Air kind="dusk" seed={9} />
        </g>
      );
    default:
      return null;
  }
}
