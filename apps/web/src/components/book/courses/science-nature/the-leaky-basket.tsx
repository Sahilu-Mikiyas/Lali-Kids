"use client";

import "./the-leaky-basket.css";

import { useId, type ReactNode } from "react";

import { Acacia, Air, Place, Rock, vars } from "../../scenery";
import { Cub, Grandma, Gugu, Papa, TAP } from "./kit-cast";
import { Pop } from "./kit-life";
import { Home, Yard } from "./kit-places";
import { Cup, Hearth, Jerrycan, Sign, Sparkles, Speech } from "./kit-props";
import { Thing, type ThingKind } from "./kit-stuff";

/*
  "The Leaky Basket": one living picture per page (12 pages). Grandma's thirsty seedlings and the
  missing jerrycan; "What is it made of? What can it do?"; the basket that pours; the netela that
  soaks and drips; sorting the house's things by material; the heavy clay pot; the metal pot that
  gets hot in the sun; the light plastic bucket that waters the seedlings; the wooden spoon that
  stays cool; every material good at its own job; where materials come from; Gugu's papa comes home.
  Keyframes: kit.css, kit-science.css and ./the-leaky-basket.css.
*/

/** A row of Grandma's cabbage seedlings, drooping (thirsty) or standing up. */
function Seedlings({ droop = false }: { droop?: boolean }) {
  return (
    <g>
      <rect x={210} y={262} width={160} height={10} rx={4} fill="#7A5236" />
      {[230, 262, 294, 326, 356].map((x, i) => (
        <g key={x} transform={`translate(${x} 264)`}>
          <g className={droop ? "slb-droop" : "slb-perk"} style={vars({ "--delay": `${i * 0.15}s` })}>
            <path d="M0 0 V-22" stroke="#4E9A3A" strokeWidth={3} />
            <ellipse cx={-8} cy={-22} rx={9} ry={5} fill="#5EAA4A" transform="rotate(-25 -8 -22)" />
            <ellipse cx={8} cy={-24} rx={9} ry={5} fill="#4E9A3A" transform="rotate(25 8 -24)" />
          </g>
        </g>
      ))}
    </g>
  );
}

/** The yard tap: a standpipe with a little tap. */
function Tap({ x, y, on = false }: { x: number; y: number; on?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-5} y={-60} width={10} height={60} fill="#8A98A8" />
      <path d="M0 -56 H16 V-48" stroke="#8A98A8" strokeWidth={8} fill="none" />
      <rect x={6} y={-66} width={12} height={5} rx={2} fill="#E2463F" />
      {on && <path d="M16 -44 V-10" stroke="#7FC8F0" strokeWidth={5} strokeDasharray="6 4" className="slb-stream" />}
    </g>
  );
}

/** Water drips falling from something. */
function Drips({ x, y, w = 30, n = 5, fast = false }: { x: number; y: number; w?: number; n?: number; fast?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={-w / 2 + (i * w) / Math.max(1, n - 1)} cy={0} r={2.4} fill="#7FC8F0" className="snk-drip" style={vars({ "--delay": `${-i * 0.3}s`, "--dy": "34px", "--dur": fast ? "0.6s" : "1.4s" })} />
      ))}
    </g>
  );
}

/** A plastic bucket. */
function Bucket({ x = 0, y = 0, s = 1, full = true }: { x?: number; y?: number; s?: number; full?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-14 -24 Q0 -40 14 -24" stroke="#2F6FD0" strokeWidth={2} fill="none" />
      <path d="M-16 -24 L-12 0 L12 0 L16 -24Z" fill="#3E8AE0" />
      {full && <ellipse cx={0} cy={-24} rx={16} ry={3} fill="#9FD6F2" />}
      <path d="M-14 -16 H14" stroke="#2F6FD0" strokeWidth={1.6} />
    </g>
  );
}

/** One material group: a coloured tile with its things. */
function Group({ x, y, color, things, delay }: { x: number; y: number; color: string; things: ThingKind[]; delay: number }) {
  return (
    <Pop x={x} y={y} delay={delay}>
      <rect x={-52} y={-40} width={104} height={64} rx={10} fill={color} />
      {things.map((t, i) => (
        <Thing key={t} kind={t} x={-24 + i * 48} y={14} s={1.1} />
      ))}
    </Pop>
  );
}

/** An arrow from a source to a material. */
function From({ x, y, src, to, delay }: { x: number; y: number; src: ReactNode; to: ReactNode; delay: number }) {
  return (
    <Pop x={x} y={y} delay={delay}>
      <rect x={-64} y={-26} width={128} height={44} rx={10} fill="#FFFFFF" opacity={0.9} />
      <g transform="translate(-36 6)">{src}</g>
      <path d="M-12 -2 H10 M4 -8 L12 -2 L4 4" stroke="#E2783A" strokeWidth={3} fill="none" strokeLinecap="round" />
      <g transform="translate(36 8)">{to}</g>
    </Pop>
  );
}

export default function TheLeakyBasket({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // The seedlings droop in the sun; the jerrycan has gone to the river. "Can you two carry water?"
    case 0:
      return (
        <g>
          <Yard id={id} time="day" />
          <Seedlings droop />
          <Place x={140} y={294} s={0.46} tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
          <Place x={60} y={296} s={0.38} tap={TAP.cub}>
            <Cub mood="happy" />
          </Place>
          <Place x={200} y={298} s={0.36} tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
          <Air kind="day" seed={2} />
        </g>
      );
    // "Choose well. What is it made of? What can it do?"
    case 1:
      return (
        <g>
          <Home id={id} time="day" door="open" />
          <Place x={300} y={292} s={0.5} flip tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
          <Speech x={280} y={110} w={90} h={44} tail="down" delay={0.6}>
            <g>
              <Thing kind="basket" x={-26} y={10} s={0.6} />
              <Thing kind="pot" x={0} y={12} s={0.55} />
              <Thing kind="cloth" x={26} y={10} s={0.6} />
            </g>
          </Speech>
          <Place x={110} y={294} s={0.46} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Place x={190} y={296} s={0.42} tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
        </g>
      );
    // Gugu fills the beautiful woven basket at the tap, and the water pours out through the gaps.
    case 2:
      return (
        <g>
          <Yard id={id} time="day" />
          <Tap x={290} y={262} on />
          <Place x={200} y={294} s={0.5} tap={TAP.gugu}>
            <Gugu mood="wow" pose="point" item={<Thing kind="basket" x={0} y={10} s={2.4} />} />
          </Place>
          <Drips x={230} y={232} w={40} n={6} fast />
          <ellipse cx={230} cy={290} rx={60} ry={8} fill="#8FD0F0" opacity={0.8} className="snk-spread" />
          <Place x={90} y={296} s={0.4} tap={TAP.cub}>
            <Cub mood="wow" />
          </Place>
        </g>
      );
    // Anbessa folds Grandma's cotton netela into a bag: the cloth soaks it all up and drips.
    case 3:
      return (
        <g>
          <Yard id={id} time="day" />
          <Tap x={120} y={262} />
          <Place x={200} y={294} s={0.5} tap={TAP.cub}>
            <Cub mood="worried" arm="give" item={<Thing kind="cloth" x={0} y={16} s={2} />} />
          </Place>
          <Drips x={245} y={226} w={30} n={4} />
          <Place x={330} y={296} s={0.4} flip tap={TAP.gugu}>
            <Gugu mood="happy" pose="point" />
          </Place>
        </g>
      );
    // Sorting: wood, metal, clay, cloth, grass, plastic.
    case 4:
      return (
        <g>
          <Home id={id} time="day" shelf={false} />
          <Group x={90} y={70} color="#E8C9A0" things={["wood-spoon"]} delay={0.4} />
          <Group x={200} y={70} color="#D8DEE6" things={["metal-spoon", "key"]} delay={0.8} />
          <Group x={310} y={70} color="#E8B8A0" things={["pot", "clay-ball"]} delay={1.2} />
          <Group x={90} y={160} color="#F4EEDC" things={["cloth"]} delay={1.6} />
          <Group x={200} y={160} color="#F2E2A8" things={["basket"]} delay={2} />
          <Group x={310} y={160} color="#CFE4F8" things={["jerrycan", "cap"]} delay={2.4} />
          <Place x={120} y={298} s={0.36} tap={TAP.cub}>
            <Cub mood="happy" arm="reach" />
          </Place>
          <Place x={290} y={298} s={0.36} flip tap={TAP.gugu}>
            <Gugu mood="happy" pose="point" />
          </Place>
        </g>
      );
    // The clay water pot holds every drop, but it's heavy: "If I drop it, it will break."
    case 5:
      return (
        <g>
          <Yard id={id} time="day" />
          <Seedlings droop />
          <g className="sn-heavy">
            <Place x={160} y={294} s={0.5} tap={TAP.gugu}>
              <Gugu mood="worried" pose="point" item={<Thing kind="pot" x={0} y={30} s={2.6} />} />
            </Place>
          </g>
          <Sign x={140} y={120} kind="!" delay={1} color="#E2783A" />
        </g>
      );
    // The metal pot holds the water too, but it is heavy and its handles get hot in the sun. "Ouch!"
    case 6:
      return (
        <g>
          <Yard id={id} time="day" />
          <Seedlings droop />
          <Place x={150} y={294} s={0.5} tap={TAP.cub}>
            <Cub mood="worried" arm="give" item={<g><path d="M-26 0 L-22 30 L22 30 L26 0Z" fill="#9AA4B0" /><path d="M-34 6 h8 M26 6 h8" stroke="#6A7480" strokeWidth={5} /></g>} />
          </Place>
          <g transform="translate(150 210)">
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M${-20 + i * 20} 0 q4 -8 0 -16 q-4 -8 0 -16`} stroke="#F0602A" strokeWidth={2.4} fill="none" className="sn-steam" style={vars({ "--delay": `${-i * 0.6}s` })} />
            ))}
          </g>
        </g>
      );
    // The plastic bucket: holds the water, light to carry, doesn't break. The seedlings drink.
    case 7:
      return (
        <g>
          <Yard id={id} time="day" />
          <Seedlings />
          <Place x={150} y={294} s={0.5} tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" item={<Bucket x={0} y={30} s={2.4} />} />
          </Place>
          <Place x={60} y={296} s={0.4} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Sparkles x={290} y={220} r={60} delay={1} n={6} />
        </g>
      );
    // Grandma stirs hot stew with the wooden spoon: the metal spoon in the pot gets hot; the wooden one doesn't.
    case 8:
      return (
        <g>
          <Home id={id} time="day" />
          <Hearth x={200} y={272} />
          <g transform="translate(176 206) rotate(-60)">
            <Thing kind="metal-spoon" s={2.2} />
          </g>
          <g transform="translate(160 170)">
            {[0, 1].map((i) => (
              <path key={i} d={`M${i * 10} 0 q4 -6 0 -12 q-4 -6 0 -12`} stroke="#F0602A" strokeWidth={2.4} fill="none" className="sn-steam" style={vars({ "--delay": `${-i * 0.8}s` })} />
            ))}
          </g>
          <Place x={300} y={292} s={0.5} flip tap={TAP.grandma}>
            <Grandma arm="pour" item={<g transform="rotate(30)"><Thing kind="wood-spoon" s={2} /></g>} />
          </Place>
          <Place x={80} y={296} s={0.42} tap={TAP.gugu}>
            <Gugu mood="wow" pose="point" />
          </Place>
        </g>
      );
    // Every material is good at its own job: clay cups for coffee, the netela to keep warm, the basket for bread.
    case 9:
      return (
        <g>
          <Home id={id} time="evening" />
          <Pop x={110} y={190} delay={0.5}>
            <Cup x={0} y={0} s={2.4} />
          </Pop>
          <Pop x={200} y={190} delay={1}>
            <Thing kind="cloth" s={2.2} />
          </Pop>
          <Pop x={290} y={190} delay={1.5}>
            <Thing kind="basket" s={2} />
            <path d="M-14 -18 Q-16 -30 0 -32 Q16 -30 14 -18Z" fill="#D89A4A" />
          </Pop>
          <Place x={140} y={296} s={0.42} tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Place x={260} y={296} s={0.42} flip tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
        </g>
      );
    // Where materials come from: trees, the cotton plant, the ground, rocks, factories.
    case 10:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <From x={120} y={60} delay={0.4} src={<Acacia x={0} y={14} s={0.3} />} to={<Thing kind="wood-spoon" s={0.9} />} />
          <From x={280} y={60} delay={0.9} src={<g><path d="M0 14 V-6" stroke="#4E9A3A" strokeWidth={2} /><circle cx={0} cy={-10} r={6} fill="#FFFFFF" /><circle cx={-5} cy={-4} r={4} fill="#FFFFFF" /></g>} to={<Thing kind="cloth" s={0.8} />} />
          <From x={120} y={130} delay={1.4} src={<path d="M-16 14 Q0 -6 16 14Z" fill="#B8643A" />} to={<Thing kind="pot" s={0.8} />} />
          <From x={280} y={130} delay={1.9} src={<Rock x={0} y={14} s={0.5} />} to={<Thing kind="key" s={0.9} />} />
          <From x={200} y={200} delay={2.4} src={<g><rect x={-16} y={-8} width={32} height={22} fill="#8A98A8" /><rect x={-10} y={-20} width={6} height={12} fill="#6A7480" /></g>} to={<Thing kind="cap" s={1.2} />} />
          <Place x={350} y={298} s={0.32} flip tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
        </g>
      );
    // Gugu's papa comes home with the jerrycan: seedlings standing tall, the netela drying in the sun.
    case 11:
      return (
        <g>
          <Yard id={id} time="evening" />
          <Seedlings />
          <path d="M40 150 H180" stroke="#7A5236" strokeWidth={2} />
          <g transform="translate(110 152)">
            <path d="M-34 0 L34 0 L30 40 L-30 40Z" fill="#F4EEDC" />
            <path d="M-30 34 H30" stroke="#2E9A8A" strokeWidth={3} />
          </g>
          <Place x={330} y={294} s={0.48} flip tap={TAP.papa}>
            <Papa mood="joy" />
          </Place>
          <Jerrycan x={290} y={292} s={0.9} />
          <Place x={100} y={296} s={0.42} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Place x={190} y={296} s={0.42} tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" item={<Bucket x={0} y={20} s={1.6} full={false} />} />
          </Place>
        </g>
      );
    default:
      return null;
  }
}
