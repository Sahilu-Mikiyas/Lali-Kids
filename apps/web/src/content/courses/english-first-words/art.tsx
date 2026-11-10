"use client";

import type { ComponentType, ReactNode } from "react";

import { Camel, Cub, CubSleepy, Grandma, Gugu, Ibex, Mama, Papa, Teacher, Tsehay, Wolf } from "@/components/book/courses/english-first-words/cast";
import { THINGS } from "@/components/book/courses/english-first-words/things";
import type { ArtProps } from "../types";

/*
  Small pictures for the English First Words quiz questions, by id. Each is a square SVG drawn
  with the course's scene kit, so the quizzes look like the stories.
    - every picture in things.tsx, by its English word (cat, ball, nose, kite…)
    - the cast: anbessa, gugu, hawi, ayan, haben, grandma, grandpa, teacher, tsehay, mother, father, baby
    - little moments for greetings: arrive, leave, give, sunrise, bedtime
    - feeling faces (face-happy, face-sad, face-angry, face-scared, face-surprised, face-calm)
    - paint splats for the colors (color-red, color-blue…) and fog for the weather
    - letter tiles: "letter-a" (Aa, both shapes), "upper-a" (A) and "lower-a" (a), a to m
  The letter tiles are the only pictures with writing in them: the letters ARE the question.
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

/** Two characters in a little scene (400 x 300 scene units, cropped square). */
const scene = (el: ReactNode, sky = "#CFEAF6", ground = "#E8C08A") =>
  function Scene(p: ArtProps) {
    return (
      <Box {...p} vb="90 70 220 220">
        <rect x={90} y={70} width={220} height={220} rx={44} fill={sky} />
        <path d="M90 240 H310 V246 Q310 290 266 290 H134 Q90 290 90 246Z" fill={ground} />
        {el}
      </Box>
    );
  };

const at = (x: number, y: number, s: number, el: ReactNode, flip = false) => <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s}) translate(-100 -230)`}>{el}</g>;

/** A round face showing a feeling. */
function Face({ mood }: { mood: "happy" | "sad" | "angry" | "scared" | "surprised" | "calm" }) {
  const ink = "#5A3410";
  return (
    <g>
      <circle cx={50} cy={50} r={44} fill="#FFD27A" />
      <circle cx={50} cy={50} r={44} fill="none" stroke="#E8A83A" strokeWidth={3} />
      <ellipse cx={26} cy={62} rx={8} ry={5} fill="#FF8A7A" opacity={mood === "angry" ? 0.8 : 0.45} />
      <ellipse cx={74} cy={62} rx={8} ry={5} fill="#FF8A7A" opacity={mood === "angry" ? 0.8 : 0.45} />
      {mood === "calm" ? (
        <path d="M28 46 Q36 52 44 46 M56 46 Q64 52 72 46" stroke={ink} strokeWidth={4} fill="none" strokeLinecap="round" />
      ) : (
        <g fill={ink}>
          <ellipse cx={36} cy={44} rx={mood === "surprised" || mood === "scared" ? 6.5 : 5} ry={mood === "surprised" || mood === "scared" ? 8 : 6.5} />
          <ellipse cx={64} cy={44} rx={mood === "surprised" || mood === "scared" ? 6.5 : 5} ry={mood === "surprised" || mood === "scared" ? 8 : 6.5} />
        </g>
      )}
      {mood === "angry" && <path d="M26 30 L44 37 M74 30 L56 37" stroke={ink} strokeWidth={4} strokeLinecap="round" />}
      {(mood === "sad" || mood === "scared") && <path d="M26 34 L42 29 M74 34 L58 29" stroke={ink} strokeWidth={3.4} strokeLinecap="round" />}
      {mood === "happy" && <path d="M32 64 Q50 82 68 64Z" fill="#8A2F1E" />}
      {mood === "calm" && <path d="M36 66 Q50 74 64 66" stroke={ink} strokeWidth={4} fill="none" strokeLinecap="round" />}
      {mood === "sad" && <path d="M34 74 Q50 62 66 74" stroke={ink} strokeWidth={4} fill="none" strokeLinecap="round" />}
      {mood === "angry" && <path d="M36 72 Q50 64 64 72" stroke={ink} strokeWidth={4} fill="none" strokeLinecap="round" />}
      {mood === "scared" && <path d="M34 72 q4 -4 8 0 t8 0 t8 0 t8 0" stroke={ink} strokeWidth={3.4} fill="none" strokeLinecap="round" />}
      {mood === "surprised" && <ellipse cx={50} cy={70} rx={8} ry={10} fill={ink} />}
      {mood === "sad" && <path d="M66 52 q-3 6 0 9 q3 -3 0 -9Z" fill="#7FC8F8" />}
    </g>
  );
}

const face = (mood: Parameters<typeof Face>[0]["mood"]) =>
  function FaceArt(p: ArtProps) {
    return (
      <Box {...p}>
        <Face mood={mood} />
      </Box>
    );
  };

/** A splat of paint in one color. */
const splat = (hex: string, edge = "#00000022") =>
  function Splat(p: ArtProps) {
    return (
      <Box {...p} vb="-50 -50 100 100">
        <rect x={-50} y={-50} width={100} height={100} rx={22} fill="#FFFDF6" />
        <path d="M0 -34 Q14 -40 18 -26 Q34 -30 30 -12 Q44 -4 32 8 Q40 24 22 26 Q18 40 4 32 Q-10 42 -16 28 Q-34 32 -30 14 Q-42 2 -30 -8 Q-36 -26 -18 -26 Q-14 -40 0 -34Z" fill={hex} stroke={edge} strokeWidth={2} />
        <circle cx={-12} cy={-14} r={6} fill="#fff" opacity={0.35} />
      </Box>
    );
  };

/** A letter tile: both shapes (Aa), or just the big or the little one. */
const tile = (letter: string, kind: "both" | "upper" | "lower", color: string) =>
  function Tile(p: ArtProps) {
    const text = kind === "both" ? `${letter.toUpperCase()}${letter}` : kind === "upper" ? letter.toUpperCase() : letter;
    return (
      <Box {...p}>
        <rect x={4} y={4} width={92} height={92} rx={20} fill={color} />
        <rect x={10} y={10} width={80} height={80} rx={15} fill="#FFFDF6" />
        <text x={50} y={kind === "both" ? 66 : 70} fontSize={kind === "both" ? 46 : 60} fontFamily="var(--font-andika), sans-serif" fontWeight={700} fill={color} textAnchor="middle">
          {text}
        </text>
      </Box>
    );
  };

/** Fog: soft white bands over a hill. */
function Fog(p: ArtProps) {
  return (
    <Box {...p}>
      <rect x={0} y={0} width={100} height={100} rx={22} fill="#C9D4E0" />
      <path d="M0 70 Q30 52 60 62 T100 58 V100 H0Z" fill="#9CB89A" />
      {[30, 48, 66].map((y, i) => (
        <rect key={y} x={8 + i * 6} y={y} width={84 - i * 10} height={10} rx={5} fill="#FFFFFF" opacity={0.85} />
      ))}
    </Box>
  );
}

const LETTER_COLORS = ["#E8513B", "#2F6FD0", "#2E9A5B", "#8E5BE0", "#E58A00", "#D63B72", "#0E8C80"];

const fromThings: Record<string, ComponentType<ArtProps>> = Object.fromEntries(Object.keys(THINGS).map((k) => [k, thing(k)]));
const letters: Record<string, ComponentType<ArtProps>> = Object.fromEntries(
  "abcdefghijklm".split("").flatMap((l, i) => {
    const c = LETTER_COLORS[i % LETTER_COLORS.length];
    return [
      [`letter-${l}`, tile(l, "both", c)],
      [`upper-${l}`, tile(l, "upper", c)],
      [`lower-${l}`, tile(l, "lower", c)],
    ];
  }),
);

/** Small pictures for this course's quiz questions, by id. */
export const ART: Record<string, ComponentType<ArtProps>> = {
  ...fromThings,
  ...letters,
  // the cast
  anbessa: who(<Cub mood="happy" />),
  gugu: who(<Gugu mood="happy" />),
  hawi: who(<Wolf mood="happy" />),
  ayan: who(<g transform="translate(-10 0)"><Camel who="ayan" mood="happy" /></g>),
  haben: who(<Ibex mood="happy" />),
  grandma: who(<Grandma mood="happy" />, "#FFF0E0"),
  grandpa: who(<Wolf elder mood="happy" />, "#FFF0E0"),
  teacher: who(<Teacher mood="happy" />),
  tsehay: who(<Tsehay mood="happy" />),
  mother: who(<Mama mood="happy" />, "#FDE8F0"),
  father: who(<Papa mood="happy" />, "#E8F0FD"),
  baby: who(<g transform="translate(100 150) scale(3)"><MamaBaby /></g>, "#FFF6DD"),
  // feelings
  "face-happy": face("happy"),
  "face-sad": face("sad"),
  "face-angry": face("angry"),
  "face-scared": face("scared"),
  "face-surprised": face("surprised"),
  "face-calm": face("calm"),
  // colors
  "color-red": splat("#E8413B"),
  "color-yellow": splat("#FFD233"),
  "color-blue": splat("#2F6FD0"),
  "color-green": splat("#2FA35A"),
  "color-orange": splat("#F08A24"),
  "color-purple": splat("#8E5BE0"),
  "color-white": splat("#FFFFFF", "#B9A58C"),
  fog: Fog,
  // little moments
  arrive: scene(
    <g>
      <path d="M120 240 V150 Q150 130 180 150 V240Z" fill="#5A3A26" />
      <path d="M126 240 V154 Q150 138 174 154 V240Z" fill="#BDE6FF" />
      {at(150, 240, 0.36, <Wolf mood="joy" arm="wave" />)}
      {at(250, 246, 0.42, <Cub mood="happy" />, true)}
    </g>,
    "#E8C8A0",
    "#B87A4A",
  ),
  leave: scene(
    <g>
      {at(140, 246, 0.42, <Cub mood="happy" arm="up" />)}
      {at(270, 240, 0.3, <Gugu mood="happy" pose="wave" />)}
      <path d="M190 236 h20 M216 236 h12" stroke="#B87A4A" strokeWidth={3} strokeLinecap="round" />
    </g>,
    "#F6C9A0",
  ),
  give: scene(
    <g>
      {at(150, 246, 0.44, <Grandma mood="happy" arm="hold" />)}
      {at(260, 246, 0.42, <Cub mood="joy" arm="reach" />, true)}
      <g transform="translate(206 200) scale(0.36)">{THINGS.loaf()}</g>
    </g>,
    "#E8C8A0",
    "#B87A4A",
  ),
  sunrise: scene(
    <g>
      <circle cx={140} cy={160} r={26} fill="#FFD54A" />
      <path d="M90 190 Q150 150 210 176 T310 168 V290 H90Z" fill="#8FCB80" />
      {at(250, 250, 0.4, <Cub mood="joy" arm="up" />, true)}
    </g>,
    "#FFD6B0",
  ),
  bedtime: scene(
    <g>
      <circle cx={260} cy={120} r={18} fill="#F8EDC4" />
      <g fill="#FFF6D8">
        <circle cx={130} cy={110} r={2} />
        <circle cx={170} cy={96} r={1.6} />
        <circle cx={210} cy={130} r={1.6} />
      </g>
      <rect x={120} y={226} width={170} height={20} rx={8} fill="#4A7FD0" />
      {at(170, 254, 0.42, <CubSleepy />)}
      <path d="M160 214 Q220 200 286 214 L288 246 L166 246Z" fill="#E2463F" />
    </g>,
    "#26307A",
    "#3A2A2E",
  ),
};

/** Baby Dawit on his own (the cast draws him inside Mama's arms). */
function MamaBaby() {
  return (
    <g>
      <ellipse cx={4} cy={4} rx={22} ry={14} fill="#FFFDF4" />
      <circle cx={-8} cy={-4} r={13} fill="#FFFDF4" />
      <ellipse cx={-8} cy={-3} rx={8.5} ry={9} fill="#4A2E24" />
      <path d="M-13 -5 q2 2 4 0 M-7 -5 q2 2 4 0" stroke="#E8CDB0" strokeWidth={1.4} fill="none" strokeLinecap="round" />
    </g>
  );
}
