"use client";

import { useId, type CSSProperties, type ReactNode } from "react";

import { CubShape, GuguShape, type GuguPose, type Mood } from "../../characters";
import { Tappable } from "../tappable";
import { Air, BeeHover, Birds, Butterfly, Daisy, Depth, DriftCloud, Fireflies, Hills, Moon, Mountains, Place, Sky, Stars, Sun, Tukul } from "../scenery";
import { At, ChantRow, Glyph, Notes, PicBubble, r1, SoundBubble, Sparkles, TRAIN, TrainPal, vars, WordCard } from "./fidel-kit";
import "./fidel-se.css";

/*
  "Seven Sheep for ሰ": one living picture per page (13 pages).
  Seven front-facing sheep wear the ሰ family on their wool, big and dark: ሰ ሱ ሲ ሳ ሴ ስ ሶ.
  Tsehay (the shy gelada girl, with her yellow bow, a green skirt and a shepherd's crook)
  counts them home along the path to the gate on the left; each gets a number badge.
  The sky tells the time: day, a golden sunset, pink, dusk, then night.
  Keyframes are fidel-se-* in ./fidel-se.css.
*/

const SE = ["ሰ", "ሱ", "ሲ", "ሳ", "ሴ", "ስ", "ሶ"];
const WOOL_INK = "#3A2E2A";
const FACE = "#3A2E2A";

type SheepMood = "happy" | "joy" | "wow" | "sleepy" | "worried";

/* ---------- the sheep ---------- */

/** A front-facing sheep wearing its letter on its wool; feet at (0, 0), about 78 tall. */
export function SheepLetter({ i, mood = "happy", look = 0, trot = false, munch = false, n, delay = 0, steps = 6 }: { i: number; mood?: SheepMood; look?: number; trot?: boolean; munch?: boolean; n?: number; delay?: number; steps?: number }) {
  const legs = [-13, -5, 5, 13];
  return (
    <g>
      <ellipse cx={0} cy={0} rx={22} ry={4} fill="#000" opacity={0.13} />
      {legs.map((x, k) => (
        <g key={x} transform={`translate(${x} -16)`}>
          <g className={trot ? "fidel-se-leg" : undefined} style={vars({ "--delay": `${r1(delay + (k % 2) * 0.14)}s`, "--steps": steps })}>
            <rect x={-2.4} y={0} width={4.8} height={16} rx={2.4} fill={FACE} />
          </g>
        </g>
      ))}
      <g className={trot ? "fidel-se-bob" : "lali-breathe"} style={vars({ "--delay": `${r1(delay)}s`, "--steps": steps * 2 })}>
        {/* the wool */}
        <g fill="#FFFFFF">
          <circle cx={-17} cy={-32} r={12} />
          <circle cx={17} cy={-32} r={12} />
          <circle cx={-9} cy={-44} r={12} />
          <circle cx={9} cy={-44} r={12} />
          <circle cx={-14} cy={-20} r={11} />
          <circle cx={14} cy={-20} r={11} />
          <circle cx={0} cy={-18} r={12} />
        </g>
        <path d="M-24 -22 Q0 -8 24 -22" stroke="#E6E1EE" strokeWidth={3} fill="none" strokeLinecap="round" />
        <ellipse cx={0} cy={-30} rx={16} ry={14} fill="#FFFDF4" />
        <Glyph g={SE[i]} x={0} y={-21.5} size={24} fill={WOOL_INK} />
        {/* the head, on top, munching or looking about */}
        <g className={munch ? "fidel-se-munch" : "lali-tilt"} style={vars({ "--delay": `${r1(delay * 1.6)}s`, "--tilt": look >= 0 ? "8deg" : "-8deg", "--mr": look >= 0 ? "12deg" : "-12deg", "--dur": munch ? `${r1(3 + (i % 3) * 0.5)}s` : "5.5s" })}>
          <g className="lali-ear-twitch" style={{ animationDelay: `${delay}s` }}>
            <ellipse cx={-13} cy={-58} rx={7} ry={3.6} fill={FACE} transform="rotate(-20 -13 -58)" />
          </g>
          <ellipse cx={13} cy={-58} rx={7} ry={3.6} fill={FACE} transform="rotate(20 13 -58)" />
          <ellipse cx={0} cy={-56} rx={10} ry={11.5} fill={FACE} />
          <g fill="#fff">
            <circle cx={-5} cy={-67} r={4.2} />
            <circle cx={1} cy={-69} r={4.6} />
            <circle cx={6} cy={-66} r={3.8} />
          </g>
          {mood === "sleepy" ? (
            <g stroke="#fff" strokeWidth={1.5} fill="none" strokeLinecap="round">
              <path d="M-7 -58 q2.5 2.4 5 0 M2 -58 q2.5 2.4 5 0" />
            </g>
          ) : (
            <g className="lali-blink" style={{ animationDelay: `${delay}s` }}>
              <circle cx={-4.3} cy={-58} r={3.1} fill="#fff" />
              <circle cx={4.3} cy={-58} r={3.1} fill="#fff" />
              <circle cx={-4.3 + look * 0.8} cy={-57.6} r={1.7} fill="#1A0F0A" />
              <circle cx={4.3 + look * 0.8} cy={-57.6} r={1.7} fill="#1A0F0A" />
            </g>
          )}
          {mood === "worried" && <path d="M-8 -63 l5 1.4 M8 -63 l-5 1.4" stroke="#fff" strokeWidth={1.2} strokeLinecap="round" />}
          <ellipse cx={-7.5} cy={-52} rx={2.6} ry={1.6} fill="#FF9AA8" opacity={0.6} />
          <ellipse cx={7.5} cy={-52} rx={2.6} ry={1.6} fill="#FF9AA8" opacity={0.6} />
          {mood === "joy" ? (
            <path d="M-3.5 -51 Q0 -45 3.5 -51Z" fill="#FF8FA3" />
          ) : mood === "wow" ? (
            <ellipse cx={0} cy={-49.5} rx={2.6} ry={3.2} fill="#FF8FA3" />
          ) : mood === "sleepy" ? (
            <ellipse cx={0} cy={-49.5} rx={1.6} ry={1.2} fill="#FF8FA3" />
          ) : (
            <path d="M-3.2 -50.5 Q0 -47.5 3.2 -50.5" stroke="#FFB0B8" strokeWidth={1.5} fill="none" strokeLinecap="round" />
          )}
        </g>
      </g>
      {n !== undefined && (
        <g className="lali-pop-in" style={vars({ "--delay": `${r1(delay + 0.4)}s` })}>
          <circle cx={22} cy={-64} r={9.5} fill="#fff" stroke="#E5793B" strokeWidth={2.4} />
          <text x={22} y={-59.3} fontSize={13} fontFamily="var(--font-grandstander)" fontWeight={900} fill="#E5793B" textAnchor="middle">
            {n}
          </text>
        </g>
      )}
    </g>
  );
}

function Sheep({ i, x, y, s = 0.84, className, style, ...rest }: { i: number; x: number; y: number; s?: number; className?: string; style?: CSSProperties } & Omit<Parameters<typeof SheepLetter>[0], "i">) {
  return (
    <At x={x} y={y} s={i === 5 ? s * 0.8 : s} className={className} style={style} reaction="bounce" sound="baa">
      <SheepLetter i={i} {...rest} />
    </At>
  );
}

/** Where each sheep stands in the line home: ሰ nearest Tsehay on the left, so the line reads in order. */
const LINE_Y = 262;
const slot = (i: number) => 118 + i * 38;

/** A sheep trotting in from the right to its place in the line, its number popping up on arrival. */
function Arrive({ i, delay, from = 150, mood = "joy" }: { i: number; delay: number; from?: number; mood?: SheepMood }) {
  const dur = 1.7;
  return (
    <Sheep
      i={i}
      x={slot(i)}
      y={LINE_Y}
      mood={mood}
      look={-2}
      trot
      steps={Math.round(dur / 0.28)}
      delay={delay}
      n={i + 1}
      className="fidel-se-trot"
      style={vars({ "--fx": `${from}px`, "--delay": `${delay}s`, "--dur": `${dur}s` })}
    />
  );
}

/* ---------- Tsehay ---------- */

/** Tsehay the shepherd: a gelada girl with a yellow bow, a green skirt and a crook. */
function TsehayShape({ pose = "sit", mood = "happy", crook = true }: { pose?: GuguPose; mood?: Mood; crook?: boolean }) {
  return (
    <g>
      {crook && (
        <g>
          <path d="M44 232 L34 60" stroke="#8A5A26" strokeWidth={7} strokeLinecap="round" />
          <path d="M34 62 C30 30 60 22 66 44" stroke="#8A5A26" strokeWidth={7} fill="none" strokeLinecap="round" />
        </g>
      )}
      <GuguShape pose={pose} mood={mood} />
      <g className="lali-breathe">
        <path d="M50 206 Q100 196 150 206 L158 234 Q100 240 42 234Z" fill="#3FA06A" />
        <path d="M46 226 Q100 234 154 226" stroke="#FFD233" strokeWidth={3} strokeDasharray="5 4" fill="none" />
      </g>
      <g className="lali-tilt" style={vars({ "--tilt": "7deg", "--dur": "5.5s" })}>
        <path d="M100 30 L74 16 Q68 30 74 44Z M100 30 L126 16 Q132 30 126 44Z" fill="#FFD233" />
        <circle cx={100} cy={30} r={7} fill="#F5B21E" />
      </g>
    </g>
  );
}

function Tsehay({ x, y, s = 0.42, flip = false, pose, mood, from, delay }: { x: number; y: number; s?: number; flip?: boolean; pose?: GuguPose; mood?: Mood; from?: [number, number]; delay?: number }) {
  return (
    <Place x={x} y={y} s={s} flip={flip} from={from} delay={delay} tap={{ reaction: "wiggle", sound: "giggle" }}>
      <TsehayShape pose={pose} mood={mood} />
    </Place>
  );
}

/* ---------- the land and the sky ---------- */

type Time = "day" | "gold" | "pink" | "dusk" | "night";

const SKY: Record<Time, [string, string, string]> = {
  day: ["#7FCFFF", "#B8E6FF", "#F2FBFF"],
  gold: ["#FF9E5B", "#FFC97E", "#FFF0CC"],
  pink: ["#9C5FA8", "#F0879E", "#FFC4A0"],
  dusk: ["#2E2E78", "#7E4F98", "#F09A7A"],
  night: ["#0E1440", "#26307A", "#4A4F9E"],
};
const LAND: Record<Time, { far: string; mid: string; back: string; front: string; path: string }> = {
  day: { far: "#B7C6E6", mid: "#8EA8D4", back: "#8FD39A", front: "#6CC983", path: "#E8D3A0" },
  gold: { far: "#D8A7A8", mid: "#C08A98", back: "#B9CF72", front: "#93C268", path: "#EFC98C" },
  pink: { far: "#B28AB8", mid: "#9670A6", back: "#8FB074", front: "#76A766", path: "#D9AE8C" },
  dusk: { far: "#6A5A9C", mid: "#54478A", back: "#4F7D62", front: "#43705A", path: "#A88A7A" },
  night: { far: "#3A4488", mid: "#2A3370", back: "#24685C", front: "#1E5A4E", path: "#5E6A7A" },
};

/** The hill pasture at a time of day, with the path that leads home to the gate on the right. */
function Pasture({ id, time, sun = true, gate = true, path = true }: { id: string; time: Time; sun?: boolean; gate?: boolean; path?: boolean }) {
  const [a, b, c] = SKY[time];
  const land = LAND[time];
  return (
    <>
      <Sky id={id} from={a} mid={b} to={c} />
      {time === "day" && sun && <Sun x={60} y={48} r={18} />}
      {(time === "dusk" || time === "night") && <Stars seed={time === "night" ? 12 : 4} n={time === "night" ? 30 : 10} bottom={time === "night" ? 150 : 80} />}
      {(time === "gold" || time === "pink") && sun && (
        <Depth z={-0.8}>
          <g className={time === "gold" ? "fidel-se-sink" : undefined}>
            <circle cx={300} cy={96} r={44} fill="#FFE9A0" opacity={0.3} />
            <Tappable reaction="grow" sound="chime">
              <circle cx={300} cy={96} r={26} fill={time === "gold" ? "#FFB347" : "#FF8A6A"} />
              <circle cx={292} cy={88} r={10} fill="#fff" opacity={0.25} />
            </Tappable>
          </g>
        </Depth>
      )}
      {time === "day" && <DriftCloud y={40} s={0.6} dur={70} phase={0.3} />}
      {time !== "night" && time !== "dusk" && <Birds y={86} dur={22} phase={0.4} color={time === "day" ? "#33406E" : "#7A3E5A"} />}
      <Mountains far={land.far} mid={land.mid} y={20} />
      <Hills back={land.back} front={land.front} backY={206} frontY={236} />
      {path && <path d="M410 300 Q310 262 200 270 T-10 252 L-10 300Z" fill={land.path} opacity={0.9} />}
      {gate && <Gate time={time} />}
    </>
  );
}

/** The wooden gate of the sheep pen, at the left edge. */
function Gate({ time }: { time: Time }) {
  const wood = time === "night" || time === "dusk" ? "#6A4A3A" : "#9A6A40";
  return (
    <g>
      <path d="M-12 212 V262 M8 212 V262 M46 214 V262" stroke={wood} strokeWidth={6} strokeLinecap="round" />
      <path d="M-12 224 H46 M-12 246 H46" stroke={wood} strokeWidth={4} strokeLinecap="round" />
      <path d="M10 246 L44 224" stroke={wood} strokeWidth={3} />
    </g>
  );
}

/** The big fig tree where ሶ is sleeping. */
function FigTree({ x, y, s = 1, dark = false }: { x: number; y: number; s?: number; dark?: boolean }) {
  const leaf = dark ? "#2F5A4A" : "#3E8F5A";
  const leaf2 = dark ? "#3A6E58" : "#55A86E";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-14 0 C-10 -40 -16 -70 -8 -100 L8 -100 C16 -70 10 -40 16 0Z" fill={dark ? "#4A3426" : "#7A5236"} />
      <path d="M-14 0 C-24 -4 -32 2 -40 6 M16 0 C26 -4 34 2 42 6" stroke={dark ? "#4A3426" : "#7A5236"} strokeWidth={6} strokeLinecap="round" />
      <g className="lali-sway" style={vars({ "--dur": "6s" })}>
        <circle cx={-46} cy={-110} r={40} fill={leaf} />
        <circle cx={44} cy={-112} r={42} fill={leaf} />
        <circle cx={0} cy={-142} r={46} fill={leaf2} />
        <circle cx={-20} cy={-96} r={30} fill={leaf2} />
        <circle cx={26} cy={-94} r={30} fill={leaf} />
        <circle cx={-14} cy={-156} r={14} fill="#fff" opacity={0.1} />
      </g>
    </g>
  );
}

/** A floating ሶ, rising like a snore. */
function Snore({ x, y, delay, sx = 18, size = 20, color = "#fff" }: { x: number; y: number; delay: number; sx?: number; size?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="fidel-se-snore" style={vars({ "--delay": `${delay}s`, "--sx": `${sx}px` })}>
        <Glyph g="ሶ" size={size} fill={color} stroke="#5A3A6A" sw={2.5} />
      </g>
    </g>
  );
}

/** The flock grazing on the hill, far away. */
function FarFlock({ skip = [] as number[], y = 214 }: { skip?: number[]; y?: number }) {
  return (
    <g>
      {[1, 2, 3, 4, 5, 6].filter((i) => !skip.includes(i)).map((i) => (
        <Sheep key={i} i={i} x={160 + ((i * 47) % 200)} y={y + (i % 3) * 8} s={0.5} munch look={i % 2 ? 1 : -1} delay={-i * 0.6} />
      ))}
    </g>
  );
}

function Front({ children }: { children?: ReactNode }) {
  return (
    <Depth z={0.4}>
      <Daisy x={22} y={296} h={26} delay={-0.4} />
      <Daisy x={386} y={298} h={22} delay={-1.2} color="#fff" />
      {children}
    </Depth>
  );
}

/* ---------- the pages ---------- */

export default function FidelSe({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Tsehay looks after seven fluffy sheep, each wearing a letter of the ሰ family.
    case 0: {
      const spots: [number, number][] = [
        [96, 236],
        [150, 262],
        [208, 234],
        [262, 268],
        [314, 238],
        [196, 286],
        [354, 280],
      ];
      return (
        <>
          <Pasture id={id} time="day" gate={false} path={false} />
          {SE.map((_, i) => (
            <Sheep key={i} i={i} x={spots[i][0]} y={spots[i][1]} s={0.82} munch look={i % 2 ? -1 : 1} delay={-i * 0.7} />
          ))}
          <Tsehay x={48} y={276} s={0.4} mood="happy" />
          <Butterfly x={250} y={160} color="#FF8FB1" />
          <Butterfly x={130} y={180} color="#FFD233" delay={-1} />
          <Front />
          <Air kind="day" seed={2} />
        </>
      );
    }
    // Munch, munch. The sky turns orange: "Time to go home! Let's count you, one by one."
    case 1: {
      const spots: [number, number][] = [
        [120, 238],
        [176, 262],
        [232, 236],
        [286, 264],
        [338, 240],
        [222, 288],
        [364, 286],
      ];
      return (
        <>
          <Pasture id={id} time="gold" gate={false} path={false} />
          {SE.map((_, i) => (
            <Sheep key={i} i={i} x={spots[i][0]} y={spots[i][1]} s={0.82} look={-2} mood={i === 6 ? "sleepy" : "wow"} delay={-i * 0.5} />
          ))}
          <Tsehay x={56} y={272} s={0.44} pose="wave" mood="joy" />
          <PicBubble x={74} y={168} w={52} h={40} dx={22} delay={0.9}>
            <g transform="scale(0.36) translate(0 46)">
              <Tukul x={0} y={0} s={1} smoke={false} />
            </g>
          </PicBubble>
          <Front />
          <Air kind="dusk" seed={3} />
        </>
      );
    }
    // Number one! ሰ trots up: "sa". "Come home, little sheep, come home!"
    case 2:
      return (
        <>
          <Pasture id={id} time="gold" />
          <FarFlock />
          <Arrive i={0} delay={0.5} from={220} />
          <SoundBubble x={slot(0) + 4} y={190} g="ሰ" side="right" delay={2.3} color={WOOL_INK} size={1.15} />
          <Tsehay x={60} y={272} s={0.42} pose="wave" mood="joy" />
          <Notes x={78} y={168} delay={1} color="#7A3E5A" />
          <Notes x={100} y={160} delay={1.6} color="#7A3E5A" />
          <Front />
          <Air kind="dusk" seed={4} />
        </>
      );
    // Two! ሱ "su". Three! ሲ "si". They skip along behind ሰ.
    case 3:
      return (
        <>
          <Pasture id={id} time="gold" />
          <FarFlock skip={[1, 2]} />
          <Sheep i={0} x={slot(0)} y={LINE_Y} n={1} look={1} />
          <Arrive i={1} delay={0.4} />
          <Arrive i={2} delay={1.3} />
          <SoundBubble x={slot(1) - 2} y={190} g="ሱ" side="up" delay={2.1} color={WOOL_INK} />
          <SoundBubble x={slot(2) + 4} y={190} g="ሲ" side="right" delay={3} color={WOOL_INK} />
          <Tsehay x={60} y={272} s={0.42} mood="joy" />
          <Front />
          <Air kind="dusk" seed={5} />
        </>
      );
    // Four! ሳ "saa", as wide as a yawn. Five! ሴ "say".
    case 4:
      return (
        <>
          <Pasture id={id} time="gold" />
          <FarFlock skip={[1, 2, 3, 4]} />
          {[0, 1, 2].map((i) => (
            <Sheep key={i} i={i} x={slot(i)} y={LINE_Y} n={i + 1} look={1} delay={-i * 0.4} />
          ))}
          <Arrive i={3} delay={0.4} mood="wow" />
          <Arrive i={4} delay={1.3} />
          <SoundBubble x={slot(3) - 2} y={190} g="ሳ" side="up" delay={2.1} color={WOOL_INK} />
          <SoundBubble x={slot(4) + 4} y={190} g="ሴ" side="right" delay={3} color={WOOL_INK} />
          <Tsehay x={60} y={272} s={0.42} pose="wave" mood="joy" />
          <Front />
          <Air kind="dusk" seed={6} />
        </>
      );
    // Six! Little ስ tiptoes up, soft as a whisper: sss. Six is ስድስት, and it starts with her.
    case 5:
      return (
        <>
          <Pasture id={id} time="gold" />
          <FarFlock skip={[1, 2, 3, 4, 5]} />
          {[0, 1, 2, 3, 4].map((i) => (
            <Sheep key={i} i={i} x={slot(i)} y={LINE_Y} n={i + 1} look={1} delay={-i * 0.4} />
          ))}
          <Arrive i={5} delay={0.4} mood="happy" from={120} />
          <SoundBubble x={slot(5) + 2} y={206} g="ስ" side="right" delay={2.1} color={WOOL_INK} size={0.75} quiet />
          <WordCard x={150} y={70} parts={[{ g: "ስ", color: "#E5793B" }, { g: "ድ", color: WOOL_INK }, { g: "ስ", color: WOOL_INK }, { g: "ት", color: WOOL_INK }]} size={34} delay={1.4} />
          <Tsehay x={60} y={272} s={0.42} mood="happy" />
          <Front />
          <Air kind="dusk" seed={7} />
        </>
      );
    // And seven…? Where is ሶ? Only six!
    case 6:
      return (
        <>
          <Pasture id={id} time="gold" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Sheep key={i} i={i} x={slot(i)} y={LINE_Y} n={i + 1} look={2} mood="worried" delay={-i * 0.4} />
          ))}
          {/* the empty place in the line */}
          <g transform={`translate(${slot(6)} ${LINE_Y})`}>
            <g className="fidel-kit-glow" style={vars({ "--lo": "0.35", "--hi": "0.9", "--dur": "1.6s" })}>
              <ellipse cx={0} cy={-30} rx={24} ry={22} fill="none" stroke="#fff" strokeWidth={3} strokeDasharray="6 5" />
              <text x={0} y={-18} fontSize={34} fontFamily="var(--font-grandstander)" fontWeight={900} fill="#fff" textAnchor="middle">
                ?
              </text>
            </g>
          </g>
          <Tsehay x={60} y={272} s={0.42} mood="worried" />
          <PicBubble x={72} y={184} w={46} h={36} dx={22} delay={1}>
            <Glyph g="ሶ" y={10} size={26} fill={WOOL_INK} />
            <text x={18} y={-4} fontSize={16} fontFamily="var(--font-grandstander)" fontWeight={900} fill="#E5793B">
              ?
            </text>
          </PicBubble>
          <Front />
          <Air kind="dusk" seed={8} />
        </>
      );
    // Behind the rock, only a lizard. In the bushes, only a bird. "ሶ, where are you?"
    case 7:
      return (
        <>
          <Pasture id={id} time="pink" gate={false} />
          {/* the big rock, and a lizard peeking out */}
          <g>
            <g className="fidel-se-peek" style={vars({ "--delay": "0.4s" })}>
              <Tappable reaction="wiggle" sound="pop">
                <path d="M118 224 q10 -8 24 -6 q8 1 10 6 q-6 5 -16 4 l-18 -2Z" fill="#5FB06A" />
                <circle cx={146} cy={220} r={1.8} fill={WOOL_INK} />
                <path d="M120 224 q-14 4 -22 -4" stroke="#5FB06A" strokeWidth={4} fill="none" strokeLinecap="round" />
              </Tappable>
            </g>
            <path d="M40 252 Q36 196 84 190 Q130 188 136 252Z" fill="#9C98A6" />
            <path d="M58 214 Q72 200 92 202" stroke="#fff" strokeOpacity={0.35} strokeWidth={5} fill="none" strokeLinecap="round" />
          </g>
          {/* the bush, and a little bird */}
          <g>
            <g fill="#4E8A52">
              <circle cx={300} cy={232} r={26} />
              <circle cx={330} cy={238} r={22} />
              <circle cx={276} cy={242} r={18} />
            </g>
            <At x={312} y={206} s={1} reaction="spin" sound="pop">
              <g className="lali-hop" style={vars({ "--dur": "1.4s" })}>
                <ellipse cx={0} cy={0} rx={9} ry={7} fill="#4AA3E0" />
                <circle cx={7} cy={-5} r={5} fill="#4AA3E0" />
                <circle cx={8.6} cy={-6} r={1.2} fill={WOOL_INK} />
                <path d="M12 -5 l4 1 l-4 1.4Z" fill="#F5B21E" />
                <path d="M-8 -2 l-6 -3 l1 6Z" fill="#3A86C0" />
              </g>
            </At>
          </g>
          <Tsehay x={204} y={272} s={0.44} pose="point" mood="worried" />
          {[0, 1, 3, 5].map((i, k) => (
            <Sheep key={i} i={i} x={[150, 262, 112, 300][k]} y={[282, 284, 292, 290][k]} s={0.62} look={k % 2 ? 1 : -1} mood="worried" delay={-k * 0.5} />
          ))}
          <PicBubble x={222} y={172} w={50} h={36} dx={20} delay={1}>
            <Glyph g="ሶ" x={-6} y={10} size={26} fill={WOOL_INK} />
            <text x={14} y={6} fontSize={18} fontFamily="var(--font-grandstander)" fontWeight={900} fill="#E5793B">
              ?
            </text>
          </PicBubble>
          <Air kind="dusk" seed={9} grass={false} />
        </>
      );
    // Shhh! Listen! From under the big fig tree: "Sooo… sooo… sooo…"
    case 8:
      return (
        <>
          <Pasture id={id} time="dusk" gate={false} />
          <FigTree x={300} y={250} s={0.95} dark />
          {[0, 1, 2].map((k) => (
            <Snore key={k} x={330} y={206} delay={-k} sx={14 + k * 8} size={28} />
          ))}
          <Tsehay x={150} y={272} s={0.46} mood="happy" />
          {/* her hand at her ear: little listening arcs */}
          <g stroke="#fff" strokeWidth={2.4} fill="none" strokeLinecap="round">
            {[0, 1, 2].map((k) => (
              <path key={k} d={`M${196 + k * 9} ${190 - k * 2} q6 8 0 16`} className="fidel-kit-glow" style={vars({ "--dur": "1.4s", "--delay": `${-k * 0.3}s`, "--lo": "0", "--hi": "0.9" })} />
            ))}
          </g>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Sheep key={i} i={i} x={[60, 98, 220, 250, 36, 132][i]} y={[262, 284, 286, 266, 290, 294][i]} s={0.6} look={2} mood="wow" delay={-i * 0.4} />
          ))}
          <Fireflies seed={3} n={6} top={150} bottom={240} />
          <Air kind="night" seed={10} grass={false} />
        </>
      );
    // There is ሶ, fast asleep, snoring his very own sound. "so", like in sofa.
    case 9:
      return (
        <>
          <Pasture id={id} time="dusk" gate={false} path={false} />
          <FigTree x={230} y={262} s={1.25} dark />
          <At x={238} y={278} s={1.7} reaction="wiggle" sound="baa">
            <g className="fidel-se-sleep">
              <SheepLetter i={6} mood="sleepy" />
            </g>
          </At>
          {[0, 1, 2].map((k) => (
            <Snore key={k} x={264} y={150} delay={-k} sx={16 + k * 10} size={28} />
          ))}
          <SoundBubble x={206} y={162} g="ሶ" side="left" delay={1} color={WOOL_INK} size={1.15} quiet />
          <Tsehay x={92} y={276} s={0.46} mood="joy" />
          <Sheep i={5} x={356} y={290} s={0.62} look={-2} mood="joy" />
          <Fireflies seed={7} n={8} top={120} bottom={250} />
          <Air kind="night" seed={11} grass={false} />
        </>
      );
    // A hug. "Seven!" ሰ ሱ ሲ ሳ ሴ ስ ሶ. Come home, little sheep, come home!
    case 10:
      return (
        <>
          <Pasture id={id} time="dusk" path={false} />
          <Moon x={330} y={56} r={16} />
          <ChantRow letters={SE} color="#B4532A" y={70} x0={70} x1={330} size={28} start={1} step={0.5} bg="#FFF6EC" />
          {SE.map((_, i) => (
            <Sheep key={i} i={i} x={slot(i)} y={LINE_Y} n={i + 1} look={i === 6 ? -1 : 1} mood={i === 6 ? "sleepy" : "joy"} delay={-i * 0.4} className="fidel-kit-karaoke" style={vars({ "--delay": `${r1(1 + i * 0.5)}s`, "--dur": `${r1(7 * 0.5 + 2.4)}s` })} />
          ))}
          <Tsehay x={60} y={272} s={0.42} pose="wave" mood="joy" />
          <Sparkles seed={5} spots={[[40, 130], [360, 130], [200, 120]]} />
          <Front />
          <Air kind="dusk" seed={12} />
        </>
      );
    // At the gate: ሰ, ላ and ም from the Fidel Train. Together… ሰላም!
    case 11:
      return (
        <>
          <Pasture id={id} time="dusk" path={false} />
          <Moon x={60} y={50} r={14} />
          <Tukul x={330} y={196} s={0.55} glow />
          <WordCard x={200} y={84} parts={[{ g: "ሰ", color: "#B4532A" }, { g: "ላ", color: TRAIN.la.body }, { g: "ም", color: TRAIN.ma.body }]} size={54} delay={2.2} />
          <Sheep i={0} x={110} y={272} s={1.3} mood="joy" look={2} className="lali-move-in" style={vars({ "--fx": "-120px", "--fy": "0px", "--dur": "1.2s", "--delay": "0.3s" })} />
          <At x={204} y={272} s={1.25} className="lali-move-in" style={vars({ "--fx": "0px", "--fy": "80px", "--dur": "1s", "--delay": "0.8s" })}>
            <TrainPal g="ላ" fam={TRAIN.la} delay={-0.4} />
          </At>
          <At x={284} y={272} s={1.25} className="lali-move-in" style={vars({ "--fx": "120px", "--fy": "0px", "--dur": "1.2s", "--delay": "1.2s" })}>
            <TrainPal g="ም" fam={TRAIN.ma} wave={false} delay={-0.8} />
          </At>
          <Sparkles seed={8} spots={[[80, 50], [330, 46], [200, 18]]} />
          <Air kind="dusk" seed={13} grass={false} />
        </>
      );
    // Grandma waves from the door: "ሰላም!" Seven sleepy sheep answer, "Baa!" Goodnight.
    default:
      return (
        <>
          <Pasture id={id} time="night" gate={false} path={false} />
          <Moon x={64} y={56} r={20} />
          <Tukul x={300} y={214} s={0.75} glow />
          <Place x={250} y={244} s={0.3}>
            <CubShape pose="sit" granny mood="joy" look={-2} />
          </Place>
          {/* the pen: a low wooden fence, and the sheep asleep inside it */}
          {SE.map((_, i) => (
            <Sheep key={i} i={i} x={60 + (i % 4) * 46 + (i > 3 ? 23 : 0)} y={i > 3 ? 284 : 256} s={0.66} mood="sleepy" delay={-i * 0.5} />
          ))}
          <g stroke="#6A4A3A" strokeWidth={4} strokeLinecap="round">
            <path d="M28 296 V262 M234 296 V262 M28 270 H234 M28 286 H234" />
          </g>
          <Notes x={120} y={196} delay={0.8} color="#CFE0FF" />
          <Notes x={170} y={200} delay={1.4} color="#CFE0FF" />
          <Tsehay x={348} y={280} s={0.36} flip pose="wave" mood="joy" />
          <BeeHover x={210} y={150} s={0.9} />
          <Air kind="night" seed={14} grass={false} />
        </>
      );
  }
}
