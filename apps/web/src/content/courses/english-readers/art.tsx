"use client";

import type { ComponentType, ReactNode } from "react";

import { Camel, Cat, Cub, Grandma, Gugu, Ibex, Teacher, Tsehay, Wolf } from "@/components/book/courses/english-readers/cast";
import { THINGS } from "@/components/book/courses/english-readers/things";
import type { ArtProps } from "../types";

/*
  Small pictures for the English Readers quiz questions, by id. Each is a square SVG drawn with
  the course's scene kit (copied from English First Words), so the quizzes look like the stories.
    - every picture in things.tsx, by its English word (ship, frog, kite, cape, boat, snail…)
    - the cast: anbessa, gugu, hawi, ayan, abdi, haben, tsehay, grandma, grandpa, teacher, dimmet
    - hats for the describing words: hat-little-yellow (Haben's, with its red flower),
      hat-big-black, hat-little-blue, hat-big-yellow
    - big and little things: ball-big, ball-little; kittens (gray, white, black and white)
    - actions for -ing and -ed: jumping, kicking, running, helping
  None of them has writing in it: the words are the question.
*/

function Box({ size = 96, className, vb = "0 0 100 100", children }: ArtProps & { vb?: string; children: ReactNode }) {
  return (
    <svg width={size} height={size} viewBox={vb} className={className} aria-hidden>
      {children}
    </svg>
  );
}

/** A THINGS picture, centred in a soft square. */
const thing = (id: string, bg = "#FFF6DD") =>
  function Thing(p: ArtProps) {
    const Draw = THINGS[id];
    return (
      <Box {...p} vb="-50 -50 100 100">
        <rect x={-50} y={-50} width={100} height={100} rx={22} fill={bg} />
        <Draw />
      </Box>
    );
  };

/** A character from the cast (its 200 x 240 box), filling the square. */
const who = (el: ReactNode, bg = "#E4F6FF") =>
  function Who(p: ArtProps) {
    return (
      <Box {...p} vb="-20 0 240 240">
        <rect x={-20} y={0} width={240} height={240} rx={52} fill={bg} />
        {el}
      </Box>
    );
  };

/** A drawing in the 100 x 100 square, on a soft background. */
const square = (el: ReactNode, bg = "#FFF6DD") =>
  function Square(p: ArtProps) {
    return (
      <Box {...p}>
        <rect x={0} y={0} width={100} height={100} rx={22} fill={bg} />
        {el}
      </Box>
    );
  };

/** A hat, drawn as in "Where Is My Hat?": big or little, any colour, a red flower or none. */
function Hat({ color, big = false, flower = false }: { color: string; big?: boolean; flower?: boolean }) {
  const s = big ? 1.5 : 0.95;
  return (
    <g transform={`translate(50 66) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={26} ry={7} fill={color} stroke="#2A1A10" strokeWidth={1.6} />
      <path d="M-15 0 Q-16 -24 0 -24 Q16 -24 15 0Z" fill={color} stroke="#2A1A10" strokeWidth={1.6} />
      {flower && (
        <g transform="translate(10 -10)">
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx={0} cy={-5} rx={3.4} ry={5} fill="#E8413B" transform={`rotate(${a})`} />
          ))}
          <circle r={2.6} fill="#FFD233" />
        </g>
      )}
    </g>
  );
}

/** A red ball, big or little. */
const Ball = ({ big }: { big: boolean }) => (
  <g transform={`translate(50 ${big ? 54 : 70})`}>
    <circle r={big ? 34 : 13} fill="#E8413B" stroke="#2A1A10" strokeWidth={2} />
    <path d={big ? "M-24 -8 Q0 8 24 -8" : "M-9 -3 Q0 3 9 -3"} stroke="#FFFDF6" strokeWidth={big ? 4 : 2} fill="none" />
  </g>
);

/** A kitten, as in "Where Is Dimmet?". */
const Kitten = ({ x, color, patch }: { x: number; color: string; patch?: string }) => (
  <g transform={`translate(${x} 74) scale(1.3)`}>
    <ellipse cx={0} cy={-8} rx={13} ry={9} fill={color} stroke="#2A1A10" strokeWidth={1.2} />
    {patch && <ellipse cx={4} cy={-10} rx={7} ry={5} fill={patch} />}
    <path d="M-12 -18 L-11 -27 L-5 -21Z M2 -21 L8 -27 L9 -18Z" fill={patch ?? color} stroke="#2A1A10" strokeWidth={1} />
    <circle cx={-2} cy={-17} r={9} fill={color} stroke="#2A1A10" strokeWidth={1.2} />
    <circle cx={-5} cy={-18} r={1.4} fill="#2A1A10" />
    <circle cx={1} cy={-18} r={1.4} fill="#2A1A10" />
  </g>
);

/** A cast member placed in the 100 x 100 square: feet at (x, y), scale s. */
const put = (x: number, y: number, s: number, el: ReactNode, flip = false) => <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s}) translate(-100 -230)`}>{el}</g>;

/** Motion lines, for a picture of something happening now. */
const Lines = ({ x, y }: { x: number; y: number }) => <path d={`M${x} ${y} h-14 M${x + 2} ${y + 8} h-18 M${x} ${y + 16} h-14`} stroke="#8A7660" strokeWidth={2.4} strokeLinecap="round" />;

const fromThings: Record<string, ComponentType<ArtProps>> = Object.fromEntries(Object.keys(THINGS).map((k) => [k, thing(k)]));

/** Small pictures for this course's quiz questions, by id. */
export const ART: Record<string, ComponentType<ArtProps>> = {
  ...fromThings,
  // the cast
  anbessa: who(<Cub mood="happy" />),
  gugu: who(<Gugu mood="happy" />),
  hawi: who(<Wolf mood="happy" />),
  ayan: who(<g transform="translate(-10 0)"><Camel who="ayan" mood="happy" /></g>),
  abdi: who(<g transform="translate(-10 0)"><Camel who="abdi" mood="happy" /></g>),
  haben: who(<Ibex mood="happy" />),
  tsehay: who(<Tsehay mood="happy" />),
  grandma: who(<Grandma mood="happy" />, "#FFF0E0"),
  grandpa: who(<Wolf elder mood="happy" />, "#FFF0E0"),
  teacher: who(<Teacher mood="happy" />),
  dimmet: square(<g transform="translate(50 88) scale(1.2)"><Cat mood="happy" /></g>, "#E4F6FF"),
  // describing words
  "hat-little-yellow": square(<Hat color="#FFD233" flower />),
  "hat-big-black": square(<Hat color="#2A2A33" big />),
  "hat-little-blue": square(<Hat color="#2F6FD0" />),
  "hat-big-yellow": square(<Hat color="#FFD233" big />),
  "ball-big": square(<Ball big />),
  "ball-little": square(<Ball big={false} />),
  kittens: square(
    <g>
      <Kitten x={24} color="#9A9AA6" />
      <Kitten x={52} color="#FFFDF6" />
      <Kitten x={80} color="#FFFDF6" patch="#2A2A33" />
    </g>,
    "#E8C8A0",
  ),
  // actions
  jumping: square(
    <g>
      {put(50, 76, 0.32, <Wolf mood="joy" />)}
      <path d="M30 92 h40" stroke="#8A7660" strokeWidth={3} strokeLinecap="round" />
      <path d="M40 84 v-6 M60 84 v-6" stroke="#8A7660" strokeWidth={2} />
    </g>,
    "#E4F6FF",
  ),
  kicking: square(
    <g>
      {put(40, 94, 0.36, <Ibex mood="joy" pose="point" />)}
      <g transform="translate(80 74) scale(0.26)">{THINGS.ball()}</g>
      <Lines x={70} y={66} />
    </g>,
    "#E4F6FF",
  ),
  running: square(
    <g>
      {put(56, 94, 0.36, <Wolf mood="joy" />)}
      <Lines x={26} y={58} />
    </g>,
    "#E4F6FF",
  ),
  helping: square(
    <g>
      {put(36, 94, 0.32, <Wolf mood="joy" arm="give" />)}
      {put(70, 94, 0.3, <Gugu mood="happy" />, true)}
    </g>,
    "#E4F6FF",
  ),
};
