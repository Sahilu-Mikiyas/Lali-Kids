"use client";

import "./will-it-float.css";

import { useId, type ReactNode } from "react";

import { Air, NumberBadge, Place } from "../../scenery";
import { Ibex, TAP, Wolf } from "./kit-cast";
import { Notebook, Pop } from "./kit-life";
import { Tankwa, LakeView } from "./kit-land";
import { Yard } from "./kit-places";
import { Sign, Sparkles, Speech } from "./kit-props";
import { InTub, Thing, Tub, TUB, type ThingKind } from "./kit-stuff";

/*
  "Will It Float?": one living picture per page (12 pages). Haben's rule by the tub in Hawi's yard;
  the wooden spoon floats and the stone sinks; the key sinks and the bottle top floats; Grandpa's
  heavy log floats; the tiny coin sinks; "how heavy for its size"; the orange floats, peeled it
  sinks; the clay ball sinks with the pebble; the clay boat floats; five pebbles, and the sixth
  sinks it; tankwas on Lake Tana and a big metal ship; testing everything till sunset. Keyframes:
  kit.css, kit-science.css and ./will-it-float.css.
*/

/** Hawi's yard with the big tub in the middle; children are dropped into the water. */
function Yardtub({ id, time = "day", children, s = 1.5 }: { id: string; time?: "day" | "evening" | "morning"; children?: ReactNode; s?: number }) {
  return (
    <g>
      <Yard id={id} time={time} />
      <Tub x={200} y={280} s={s}>
        {children}
      </Tub>
    </g>
  );
}

/** A pebble. */
function Pebble({ x = 0, y = 0, color = "#B8B0BC" }: { x?: number; y?: number; color?: string }) {
  return <ellipse cx={x} cy={y - 3} rx={4.4} ry={3.2} fill={color} stroke="#8A8490" strokeWidth={0.6} />;
}

/** A thing about to be dropped, hanging over the tub, with a guess bubble. */
function Guess({ kind, x, y, sink }: { kind: ThingKind; x: number; y: number; sink: boolean }) {
  return (
    <Speech x={x} y={y} w={56} h={36} tail="down" delay={0.3}>
      <g>
        <Thing kind={kind} x={-10} y={8} s={0.7} />
        <path d={sink ? "M14 -8 V6 M8 0 L14 6 L20 0" : "M14 6 V-8 M8 -2 L14 -8 L20 -2"} stroke={sink ? "#2F6FD0" : "#2FA35A"} strokeWidth={3} fill="none" strokeLinecap="round" />
      </g>
    </Speech>
  );
}

export default function WillItFloat({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A hot day, a big tub in Hawi's yard. Haben: "Big, heavy things sink. Small, light things float."
    case 0:
      return (
        <g>
          <Yardtub id={id} />
          <Place x={80} y={294} s={0.46} tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
          <Speech x={110} y={140} w={80} h={40} tail="down" delay={0.8}>
            <g>
              <circle cx={-22} cy={0} r={12} fill="#9A949E" />
              <path d="M-22 14 v4" stroke="#2F6FD0" strokeWidth={3} />
              <circle cx={18} cy={2} r={5} fill="#F5D24A" />
              <path d="M18 -6 v-6" stroke="#2FA35A" strokeWidth={3} />
            </g>
          </Speech>
          <Place x={330} y={294} s={0.44} flip tap={TAP.hawi}>
            <Wolf mood="happy" />
          </Place>
          <Air kind="day" seed={2} />
        </g>
      );
    // Guess first, then drop: the wooden spoon floats; the stone sinks. "See?"
    case 1:
      return (
        <g>
          <Yardtub id={id}>
            <InTub x={-36} floats delay={0.6}>
              <Thing kind="wood-spoon" s={1.4} />
            </InTub>
            <InTub x={30} floats={false} delay={1.6}>
              <Thing kind="stone" s={1.4} />
            </InTub>
          </Yardtub>
          <Place x={70} y={294} s={0.42} tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Place x={340} y={294} s={0.42} flip tap={TAP.hawi}>
            <Wolf mood="happy" />
          </Place>
          <Sparkles x={200} y={180} r={50} delay={2.2} n={4} />
        </g>
      );
    // The metal key sinks; the plastic bottle top floats. "My rule works every time!"
    case 2:
      return (
        <g>
          <Yardtub id={id}>
            <InTub x={-30} floats={false} delay={0.6}>
              <Thing kind="key" s={1.4} />
            </InTub>
            <InTub x={34} floats delay={1.6}>
              <Thing kind="cap" s={1.4} />
            </InTub>
          </Yardtub>
          <Place x={70} y={294} s={0.42} tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
          <Notebook x={330} y={200} s={1.6} kind="q" ticks={4} />
        </g>
      );
    // Grandpa's big log: "Too heavy! It will sink for sure." It floats like a fat brown boat!
    case 3:
      return (
        <g>
          <Yardtub id={id}>
            <InTub x={0} floats delay={1}>
              <Thing kind="log" s={0.9} />
            </InTub>
          </Yardtub>
          <Guess kind="log" x={200} y={130} sink />
          <Place x={70} y={294} s={0.42} tap={TAP.haben}>
            <Ibex mood="wow" />
          </Place>
          <Place x={340} y={294} s={0.46} flip tap={TAP.elder}>
            <Wolf elder mood="joy" arm="bless" />
          </Place>
        </g>
      );
    // A tiny coin, small and light: "That will float." Plink! It sinks. "My rule is broken!"
    case 4:
      return (
        <g>
          <Yardtub id={id}>
            <InTub x={0} floats={false} delay={1}>
              <Thing kind="coin" s={1.3} />
            </InTub>
          </Yardtub>
          <Guess kind="coin" x={200} y={130} sink={false} />
          <Place x={70} y={294} s={0.44} tap={TAP.haben}>
            <Ibex mood="worried" tear />
          </Place>
          <Sign x={110} y={150} kind="!" delay={2} color="#E2463F" />
          <Place x={340} y={294} s={0.42} flip tap={TAP.hawi}>
            <Wolf mood="wow" />
          </Place>
        </g>
      );
    // "How heavy it is for its size": wood is light for its size; a coin is heavy for its tiny size.
    case 5:
      return (
        <g>
          <rect width={400} height={300} fill="#F4EBD8" />
          <Pop x={120} y={120} delay={0.4}>
            <circle r={70} fill="#FFFFFF" />
            <Thing kind="log" s={1.4} y={10} />
            <path d="M-40 34 h80" stroke="#2FA35A" strokeWidth={4} strokeLinecap="round" />
            <path d="M0 26 v-14 M-6 18 L0 12 L6 18" stroke="#2FA35A" strokeWidth={3} fill="none" />
          </Pop>
          <Pop x={280} y={120} delay={1}>
            <circle r={70} fill="#FFFFFF" />
            <Thing kind="coin" s={3} y={6} />
            <path d="M0 18 v16 M-6 28 L0 34 L6 28" stroke="#2F6FD0" strokeWidth={3} fill="none" />
          </Pop>
          <Notebook x={200} y={290} s={1.8} kind="q" ticks={1} />
          <Place x={60} y={298} s={0.36} tap={TAP.elder}>
            <Wolf elder mood="happy" arm="bless" />
          </Place>
          <Place x={350} y={298} s={0.36} flip tap={TAP.haben}>
            <Ibex mood="wow" />
          </Place>
        </g>
      );
    // A whole orange floats; peeled, down it goes. The peel holds tiny pockets of air, like a life jacket.
    case 6:
      return (
        <g>
          <Yardtub id={id}>
            <InTub x={-34} floats delay={0.6}>
              <Thing kind="orange" s={1.4} />
            </InTub>
            <InTub x={34} floats={false} delay={1.8}>
              <Thing kind="orange-peeled" s={1.4} />
            </InTub>
          </Yardtub>
          <Place x={70} y={294} s={0.42} tap={TAP.hawi}>
            <Wolf mood="joy" arm="give" />
          </Place>
          <Place x={340} y={294} s={0.42} flip tap={TAP.haben}>
            <Ibex mood="wow" />
          </Place>
        </g>
      );
    // Hawi's problem: float a shiny pebble across to Haben. A ball of clay: plunk, it sinks, pebble and all.
    case 7:
      return (
        <g>
          <Yardtub id={id}>
            <InTub x={0} floats={false} delay={0.8}>
              <Thing kind="clay-ball" s={1.4} />
              <Pebble x={8} y={-18} color="#F5E6A8" />
            </InTub>
          </Yardtub>
          <Place x={70} y={294} s={0.42} tap={TAP.hawi}>
            <Wolf mood="worried" ears="flat" />
          </Place>
          <Sign x={100} y={160} kind="?" delay={2} />
          <Place x={340} y={294} s={0.42} flip tap={TAP.haben}>
            <Ibex mood="happy" />
          </Place>
        </g>
      );
    // "What if I change its shape?" Pressed flat, sides pinched up: a hollow boat. It floats!
    case 8:
      return (
        <g>
          <Yardtub id={id}>
            <InTub x={0} floats delay={1}>
              <Thing kind="clay-boat" s={1.4} />
            </InTub>
          </Yardtub>
          <Pop x={200} y={110} delay={0.3} cls="swf-shape">
            <Thing kind="clay-ball" s={2} y={10} />
          </Pop>
          <Place x={70} y={294} s={0.42} tap={TAP.hawi}>
            <Wolf mood="joy" arm="give" />
          </Place>
          <Place x={340} y={294} s={0.42} flip tap={TAP.haben}>
            <Ibex mood="wow" />
          </Place>
          <Sparkles x={200} y={190} r={40} delay={2.2} n={5} />
        </g>
      );
    // The pebble sails across to Haben; then pebbles one by one: five… at the sixth, it sinks.
    case 9:
      return (
        <g>
          <Yardtub id={id}>
            <g transform={`translate(0 ${TUB.top + 2})`}>
              <g className="swf-sail">
                <g className="snk-bob">
                  <Thing kind="clay-boat" s={1.4} />
                  {[-12, -6, 0, 6, 12].map((px, i) => (
                    <Pop key={px} x={px} y={-8} delay={0.6 + i * 0.5}>
                      <Pebble />
                    </Pop>
                  ))}
                </g>
              </g>
            </g>
          </Yardtub>
          <NumberBadge x={200} y={110} n="5" delay={3} color="#2FA35A" />
          <Place x={70} y={294} s={0.42} tap={TAP.hawi}>
            <Wolf mood="joy" />
          </Place>
          <Place x={340} y={294} s={0.42} flip tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
        </g>
      );
    // On Lake Tana, tankwas of papyrus; big metal ships float because they're hollow inside.
    case 10:
      return (
        <g>
          <LakeView id={id} time="day">
            <Tankwa x={140} y={230} s={1.2} />
            <g className="swf-ship">
              <path d="M220 196 L370 196 L356 218 L234 218Z" fill="#5A6A7A" />
              <rect x={290} y={170} width={50} height={26} fill="#E8E8E8" />
              <rect x={300} y={154} width={10} height={16} fill="#E2463F" />
            </g>
          </LakeView>
          <Place x={70} y={298} s={0.36} tap={TAP.elder}>
            <Wolf elder mood="happy" arm="bless" />
          </Place>
        </g>
      );
    // Sunset: Haben reads her new rule. "How heavy for its size, and its shape!"
    case 11:
      return (
        <g>
          <Yardtub id={id} time="evening">
            <InTub x={-50} floats delay={0.2}>
              <Thing kind="wood-spoon" s={1.4} />
            </InTub>
            <InTub x={-10} floats delay={0.4}>
              <Thing kind="orange" s={1.4} />
            </InTub>
            <InTub x={30} floats delay={0.6}>
              <Thing kind="clay-boat" s={1.4} />
            </InTub>
            <InTub x={0} floats={false} delay={0.8}>
              <Thing kind="key" s={1.4} />
            </InTub>
            <InTub x={50} floats={false} delay={1}>
              <Thing kind="stone" s={1.4} />
            </InTub>
          </Yardtub>
          <Place x={70} y={294} s={0.44} tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Notebook x={110} y={190} s={1.4} kind="q" ticks={5} />
          <Place x={340} y={294} s={0.42} flip tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Air kind="dusk" seed={7} />
        </g>
      );
    default:
      return null;
  }
}
