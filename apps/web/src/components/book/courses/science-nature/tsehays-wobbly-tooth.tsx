"use client";

import "./tsehays-wobbly-tooth.css";

import { useId, type ReactNode } from "react";

import { Air, Place } from "../../scenery";
import { Grandma, Mama, TAP, Tsehay, Wolf } from "./kit-cast";
import { Food, GroupSign, Smile, Tooth, type FoodKind } from "./kit-body";
import { Cow, Pop } from "./kit-life";
import { Home, Yard } from "./kit-places";
import { Dabo, Mesob, Sparkles, Speech, SnackBowl } from "./kit-props";

/*
  "Tsehay's Wobbly Tooth": one living picture per page (12 pages). The wobbly front tooth; Mama
  explains baby teeth and the grown-up tooth underneath; three shapes of teeth in the mirror;
  biting a carrot; tearing dabo crust and grinding kolo; Hawi's pointed teeth and the cow's flat
  ones; plink, the tooth comes out at dinner; Grandma's three kinds of food; energy foods;
  body-building foods; protective foods and a plate with some of each; the new tooth peeking
  through. Keyframes: kit.css, kit-science.css and ./tsehays-wobbly-tooth.css.
*/

/** A round mirror on the wall, with what it shows inside. */
function Mirror({ x, y, s = 1, children }: { x: number; y: number; s?: number; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse rx={70} ry={58} fill="#8A5A36" />
      <ellipse rx={62} ry={50} fill="#E6F4FB" />
      <g transform="scale(0.8)">{children}</g>
      <path d="M-40 -30 Q-30 -40 -14 -42" stroke="#FFFFFF" strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.8} />
    </g>
  );
}

/** A circle of foods round a group sign. */
function FoodRing({ group, foods }: { group: "go" | "grow" | "glow"; foods: FoodKind[] }) {
  const bg = group === "go" ? "#FFF4D0" : group === "grow" ? "#FFE8D8" : "#E4F7EA";
  return (
    <g transform="translate(200 140)">
      <circle r={112} fill={bg} />
      <GroupSign group={group} s={1.6} />
      {foods.map((f, i) => {
        const a = (i / foods.length) * Math.PI * 2 - Math.PI / 2;
        return (
          <Pop key={f} x={Math.round(Math.cos(a) * 76)} y={Math.round(Math.sin(a) * 70)} delay={0.4 + i * 0.3} s={1.3}>
            <Food kind={f} />
          </Pop>
        );
      })}
    </g>
  );
}

/** A plate with some of each kind of food. */
function Plate({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse rx={50} ry={20} fill="#FFFFFF" stroke="#D8D0C0" strokeWidth={2} />
      <Food kind="injera" x={-22} y={-2} s={0.8} />
      <Food kind="lentils" x={12} y={-6} s={0.7} />
      <Food kind="gomen" x={24} y={6} s={0.6} />
      <Food kind="tomato" x={-4} y={8} s={0.5} />
    </g>
  );
}

export default function TsehaysWobblyTooth({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Wiggle, waggle! "Mama! My tooth is wobbly! Is it broken?"
    case 0:
      return (
        <g>
          <Home id={id} time="morning" />
          <Place x={130} y={294} s={0.5} tap={TAP.tsehay}>
            <Tsehay mood="worried" />
          </Place>
          <Pop x={280} y={130} delay={0.6}>
            <circle r={66} fill="#FFFFFF" stroke="#E8DCC4" strokeWidth={4} />
            <Smile x={0} y={0} s={0.8} wobble={4} />
          </Pop>
        </g>
      );
    // "That's one of your twenty baby teeth. A grown-up tooth is growing underneath and pushing it out."
    case 1:
      return (
        <g>
          <Home id={id} time="morning" />
          <Place x={100} y={294} s={0.46} tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
          <Place x={330} y={292} s={0.52} flip tap={TAP.mama}>
            <Mama mood="happy" />
          </Place>
          <Pop x={215} y={120} delay={0.6}>
            <rect x={-60} y={-70} width={120} height={130} rx={12} fill="#F4D8D0" />
            <rect x={-60} y={-70} width={120} height={36} rx={12} fill="#E87A8A" />
            <Tooth kind="incisor" x={0} y={-30} s={2} wobble />
            <g className="stt-push">
              <Tooth kind="incisor" x={0} y={30} s={2.2} />
            </g>
            <path d="M-50 -30 H50" stroke="#C9604A" strokeWidth={3} />
          </Pop>
        </g>
      );
    // In the mirror: flat teeth at the front, pointy at the corners, wide and bumpy at the back.
    case 2:
      return (
        <g>
          <Home id={id} time="day" />
          <Mirror x={250} y={130} s={1.2}>
            <Smile x={0} y={0} s={1} />
          </Mirror>
          <Place x={110} y={294} s={0.5} tap={TAP.tsehay}>
            <Tsehay mood="wow" pose="point" />
          </Place>
        </g>
      );
    // Biting a carrot with the front teeth: crunch! "Front teeth are for biting, like little knives."
    case 3:
      return (
        <g>
          <Home id={id} time="day" />
          <Place x={150} y={294} s={0.52} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
          <g transform="translate(232 196) rotate(-60)">
            <Food kind="carrot" s={2} />
          </g>
          <Pop x={320} y={110} delay={0.8}>
            <circle r={40} fill="#FFFFFF" />
            <Tooth kind="incisor" s={2} y={6} />
          </Pop>
        </g>
      );
    // Pointy teeth grip and tear the tough dabo crust; back teeth grind the kolo like a grinding stone.
    case 4:
      return (
        <g>
          <Home id={id} time="day" />
          <Dabo x={110} y={240} s={1.3} bite={1} cloth />
          <SnackBowl x={290} y={250} s={1.4} kind="kolo" />
          <Pop x={110} y={120} delay={0.6}>
            <circle r={36} fill="#FFFFFF" />
            <Tooth kind="canine" s={1.8} y={6} />
          </Pop>
          <Pop x={290} y={120} delay={1.4}>
            <circle r={36} fill="#FFFFFF" />
            <Tooth kind="molar" s={1.8} y={6} />
          </Pop>
          <Place x={200} y={296} s={0.44} tap={TAP.tsehay}>
            <Tsehay mood="happy" />
          </Place>
        </g>
      );
    // Hawi's long, sharp, pointed teeth are for meat; the cow's wide, flat back teeth grind grass.
    case 5:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Place x={110} y={292} s={0.48} tap={TAP.hawi}>
            <Wolf mood="joy" />
          </Place>
          <Cow x={290} y={262} s={1.1} graze />
          <Pop x={110} y={110} delay={0.6}>
            <circle r={36} fill="#FFFFFF" />
            <Tooth kind="canine" s={1.6} x={-10} y={6} />
            <Tooth kind="canine" s={1.6} x={12} y={6} />
          </Pop>
          <Pop x={290} y={110} delay={1.2}>
            <circle r={36} fill="#FFFFFF" />
            <Tooth kind="molar" s={1.6} y={6} />
          </Pop>
          <Place x={200} y={298} s={0.36} tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
        </g>
      );
    // Dinner: she bites her injera and… plink! The tooth falls right out into her hand.
    case 6:
      return (
        <g>
          <Home id={id} time="evening" />
          <Mesob x={200} y={268} s={0.9} />
          <Place x={100} y={294} s={0.48} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
          <g transform="translate(150 150)">
            <g className="stt-drop">
              <Tooth kind="incisor" s={1.2} />
            </g>
          </g>
          <Pop x={300} y={110} delay={1.6}>
            <circle r={56} fill="#FFFFFF" />
            <Smile s={0.66} gap={4} />
          </Pop>
        </g>
      );
    // "What will build my new tooth?" Grandma: "Your food! Three kinds, each with a different job."
    case 7:
      return (
        <g>
          <Home id={id} time="evening" />
          <Mesob x={200} y={268} s={1} />
          <Pop x={130} y={150} delay={0.6}>
            <GroupSign group="go" s={1.3} />
          </Pop>
          <Pop x={200} y={130} delay={1}>
            <GroupSign group="grow" s={1.3} />
          </Pop>
          <Pop x={270} y={150} delay={1.4}>
            <GroupSign group="glow" s={1.3} />
          </Pop>
          <Place x={70} y={296} s={0.42} tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
          <Place x={340} y={294} s={0.46} flip tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
        </g>
      );
    // Energy foods: injera, bread, potatoes and maize, the power to run, play and think.
    case 8:
      return (
        <g>
          <rect width={400} height={300} fill="#FFFBEE" />
          <FoodRing group="go" foods={["injera", "bread", "potato", "maize"]} />
          <g className="stt-run">
            <Place x={0} y={0} s={0.3} tap={TAP.tsehay}>
              <Tsehay mood="joy" pose="hop" />
            </Place>
          </g>
        </g>
      );
    // Body-building foods: beans, shiro and misir, chickpeas, eggs, milk, fish: strong bones and teeth.
    case 9:
      return (
        <g>
          <rect width={400} height={300} fill="#FFF8F2" />
          <FoodRing group="grow" foods={["beans", "lentils", "egg", "milk", "fish"]} />
          <Place x={350} y={298} s={0.32} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
        </g>
      );
    // Protective foods: vegetables and fruit. "Then I need some of each kind, every day!"
    case 10:
      return (
        <g>
          <rect width={400} height={300} fill="#F4FBF4" />
          <FoodRing group="glow" foods={["gomen", "carrot", "tomato", "mango", "banana"]} />
          <Pop x={330} y={250} delay={2.2}>
            <Plate x={0} y={0} s={0.9} />
          </Pop>
          <Place x={60} y={298} s={0.32} tap={TAP.tsehay}>
            <Tsehay mood="happy" pose="point" />
          </Place>
        </g>
      );
    // Weeks later: a white edge peeking through the gap, her new grown-up tooth! Crunch, a carrot.
    case 11:
      return (
        <g>
          <Home id={id} time="morning" />
          <Mirror x={260} y={130} s={1.2}>
            <Smile x={0} y={0} s={1} newTooth={4} />
          </Mirror>
          <Place x={110} y={294} s={0.5} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
          <Speech x={140} y={150} w={44} h={34} tail="down" delay={1.2}>
            <g transform="rotate(-60)">
              <Food kind="carrot" s={0.7} />
            </g>
          </Speech>
          <Sparkles x={260} y={130} r={60} delay={1} n={6} />
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
