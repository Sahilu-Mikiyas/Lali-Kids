"use client";

import { useId, type CSSProperties } from "react";

import { CubShape, GuguShape } from "../../characters";
import { Tappable } from "../tappable";
import { Acacia, Air, BeeHover, Birds, Butterfly, Daisy, Depth, DriftCloud, Fireflies, Hills, LightRays, Mountains, Place, Sky, Stars, Sun, Water } from "../scenery";
import { At, ChantRow, Face, Glyph, HeartShape, Notes, PicBubble, r1, SoundBubble, Sparkles, vars, Whoosh, WordCard, type FaceMood } from "./fidel-kit";
import { BeeKid } from "./fidel-be";
import "./fidel-te.css";

/*
  "Tiny Turtle's Trip ተ": one living picture per page (13 pages).
  Tiny Turtle walks left to right all book long, from her rock at breakfast to the pond at
  sunset. The ተ family are seven little goats (each a different coat, all with a cream belly
  that wears the letter, dark green and big): ተ ቱ ቲ ታ ቴ ት ቶ. They zoom past, then get into
  muddles one pair at a time, and she gathers them up. The sky moves through the day.
  ቤ visits from "The Busy Bees of በ" at the end. Keyframes are fidel-te-* in ./fidel-te.css.
*/

const TE = ["ተ", "ቱ", "ቲ", "ታ", "ቴ", "ት", "ቶ"];
const LETTER = "#2F5D3A";
const COAT = ["#FFFFFF", "#F2D6B0", "#E3B98A", "#FFFFFF", "#D9B48A", "#F7E7CF", "#C9A27A"];
const SPOT = ["#D9C8B4", "#C98A5A", "#A8744A", "#3A2E2A", "#8A5A3A", "#E3B98A", "#7A5236"];

/* ---------- Tiny Turtle ---------- */

/** Tiny Turtle, side-on and facing right; feet at (0, 0), about 80 wide. */
function TurtleShape({ mood = "happy", walking = false, look = 0, card = false, tap = false }: { mood?: FaceMood; walking?: boolean; look?: number; card?: boolean; tap?: boolean }) {
  const leg = (x: number, far: boolean, k: number) => (
    <g transform={`translate(${x} -12)`}>
      <g className={walking ? "fidel-te-step" : undefined} style={vars({ "--delay": `${r1(k * 0.45)}s` })}>
        <rect x={-5} y={0} width={10} height={13} rx={5} fill={far ? "#7DBA62" : "#A8D88A"} />
      </g>
    </g>
  );
  return (
    <g>
      <ellipse cx={4} cy={0} rx={38} ry={4.5} fill="#000" opacity={0.14} />
      {leg(-16, true, 1)}
      {leg(18, true, 0)}
      <g className={walking ? "fidel-te-plod" : "lali-breathe"}>
        {/* tail */}
        <path d="M-32 -12 l-9 3 l9 3Z" fill="#A8D88A" />
        {/* head on its neck, looking about */}
        <g className="lali-tilt" style={vars({ "--tilt": "-6deg", "--dur": "6s" })}>
          <path d="M24 -14 Q34 -22 38 -30" stroke="#A8D88A" strokeWidth={12} fill="none" strokeLinecap="round" />
          <ellipse cx={44} cy={-34} rx={14} ry={12} fill="#A8D88A" />
          <circle cx={39} cy={-40} r={4} fill="#fff" opacity={0.3} />
          <Face cx={46} cy={-34} s={0.8} mood={mood} look={1.5 + look} />
        </g>
        {/* the shell, with its plates and a little red flower */}
        <path d="M-34 -10 Q-32 -52 2 -54 Q34 -52 36 -10Z" fill="#4E9A4E" />
        <path d="M-34 -10 Q0 -2 36 -10 L34 -4 Q0 4 -32 -4Z" fill="#E8C55A" />
        <g fill="#6DB86A" stroke="#3E7A3E" strokeWidth={1.5}>
          <path d="M-8 -46 L8 -46 L14 -34 L8 -22 L-8 -22 L-14 -34Z" />
          <path d="M-28 -16 Q-30 -34 -18 -40 L-14 -34 L-8 -22 L-12 -14Z" />
          <path d="M30 -16 Q32 -34 20 -40 L14 -34 L8 -22 L12 -14Z" />
        </g>
        <circle cx={-10} cy={-48} r={5} fill="#fff" opacity={0.18} />
        <g transform="translate(2 -54)">
          {[0, 72, 144, 216, 288].map((a) => (
            <circle key={a} cx={r1(Math.cos((a * Math.PI) / 180) * 3.6)} cy={r1(Math.sin((a * Math.PI) / 180) * 3.6)} r={3} fill="#E8413B" />
          ))}
          <circle r={2.2} fill="#FFD233" />
        </g>
        {tap && (
          <g transform="translate(0 -32)">
            <g className="lali-pulse" style={vars({ "--dur": "1.2s" })}>
              <HeartShape r={7} fill="#FF8FB1" />
            </g>
          </g>
        )}
        {card && (
          <g transform="translate(40 -22) rotate(-8)">
            <rect x={-2} y={-24} width={30} height={22} rx={3} fill="#FFFDF4" stroke="#C98A5A" strokeWidth={1.4} />
            <circle cx={8} cy={-16} r={4} fill="#FFC83D" />
            <path d="M3 -6 Q13 -12 24 -6" stroke="#5BB8E8" strokeWidth={2.4} fill="none" />
            <path d="M18 -20 v4 M22 -21 v5" stroke="#E8413B" strokeWidth={2} />
          </g>
        )}
      </g>
      {leg(-22, false, 0)}
      {leg(12, false, 1)}
    </g>
  );
}

function Turtle({ x, y, s = 1, flip = false, className, style, ...rest }: { x: number; y: number; s?: number; flip?: boolean; className?: string; style?: CSSProperties } & Parameters<typeof TurtleShape>[0]) {
  return (
    <At x={x} y={y} s={s} flip={flip} className={className} style={style} reaction="wiggle" sound="giggle">
      <TurtleShape {...rest} />
    </At>
  );
}

/* ---------- the little goats ---------- */

/** One little goat, facing you, wearing its letter; feet at (0, 0), about 76 tall. */
function GoatShape({ i, mood = "joy", look = 0, delay = 0, hop = false }: { i: number; mood?: FaceMood; look?: number; delay?: number; hop?: boolean }) {
  const coat = COAT[i];
  return (
    <g>
      <ellipse cx={0} cy={0} rx={18} ry={3.6} fill="#000" opacity={0.14} />
      <g className={hop ? "fidel-te-hop" : "lali-breathe"} style={vars({ "--delay": `${r1(delay)}s`, "--dur": "0.45s" })}>
        {[-12, -5, 5, 12].map((x) => (
          <g key={x}>
            <rect x={x - 2.4} y={-16} width={4.8} height={15} rx={2.4} fill={coat} stroke="#C9B49A" strokeWidth={1} />
            <rect x={x - 2.6} y={-4} width={5.2} height={4} rx={1.4} fill="#4A3426" />
          </g>
        ))}
        <path d="M18 -34 q8 -6 6 -14" stroke={coat} strokeWidth={4} fill="none" strokeLinecap="round" className="lali-tail" />
        <rect x={-20} y={-48} width={40} height={36} rx={16} fill={coat} stroke="#C9B49A" strokeWidth={1.2} />
        <ellipse cx={-12} cy={-40} rx={6} ry={4} fill={SPOT[i]} opacity={0.7} />
        <ellipse cx={0} cy={-29} rx={15} ry={13} fill="#FFFDF4" />
        <Glyph g={TE[i]} x={0} y={-20} size={24} fill={LETTER} />
        {/* the head: little horns, floppy ears */}
        <g className="lali-tilt" style={vars({ "--tilt": look >= 0 ? "9deg" : "-9deg", "--delay": `${r1(delay * 2)}s`, "--dur": "4.5s" })}>
          <path d="M-6 -70 q-4 -8 -1 -12 M6 -70 q4 -8 1 -12" stroke="#D9C8A0" strokeWidth={4} fill="none" strokeLinecap="round" />
          <g className="lali-ear-twitch" style={{ animationDelay: `${delay}s` }}>
            <ellipse cx={-16} cy={-60} rx={8} ry={3.6} fill={SPOT[i]} transform="rotate(25 -16 -60)" />
          </g>
          <ellipse cx={16} cy={-60} rx={8} ry={3.6} fill={SPOT[i]} transform="rotate(-25 16 -60)" />
          <ellipse cx={0} cy={-58} rx={12} ry={13} fill={coat} stroke="#C9B49A" strokeWidth={1.2} />
          <ellipse cx={0} cy={-51} rx={7} ry={5} fill="#F3D8D0" />
          <Face cx={0} cy={-58} s={0.78} mood={mood} look={look} delay={delay} />
        </g>
      </g>
    </g>
  );
}

function Goat({ i, x, y, s = 0.95, className, style, ...rest }: { i: number; x: number; y: number; s?: number; className?: string; style?: CSSProperties } & Omit<Parameters<typeof GoatShape>[0], "i">) {
  return (
    <At x={x} y={y} s={i === 5 ? s * 0.82 : s} className={className} style={style} reaction="bounce" sound="giggle">
      <GoatShape i={i} {...rest} />
    </At>
  );
}

/** A goat zooming in from the left to (x, y), with speed lines. */
function Zoom({ i, x, y, delay, s = 0.95 }: { i: number; x: number; y: number; delay: number; s?: number }) {
  return (
    <g>
      <g className="fidel-te-zoom" style={vars({ "--fx": `${-x - 60}px`, "--delay": `${delay}s` })}>
        <Whoosh x={x - 22} y={y - 34} color="#fff" delay={-delay} />
      </g>
      <Goat i={i} x={x} y={y} s={s} hop look={2} delay={-i * 0.2} className="fidel-te-zoom" style={vars({ "--fx": `${-x - 60}px`, "--delay": `${delay}s` })} />
    </g>
  );
}

/* ---------- the way ---------- */

type Time = "morning" | "day" | "afternoon" | "sunset" | "dusk";
const SKIES: Record<Time, [string, string, string]> = {
  morning: ["#9ED8FF", "#D2EEFF", "#FFF4DE"],
  day: ["#7FCFFF", "#B8E6FF", "#F2FBFF"],
  afternoon: ["#86C8F2", "#CBE6F2", "#FFF0CF"],
  sunset: ["#FF9468", "#FFC27A", "#FFE9B8"],
  dusk: ["#2E2E78", "#7E4F98", "#F09A7A"],
};

/** Sky, far hills and the path along the bottom. */
function Way({ id, time = "day", sun, hills = ["#8FD39A", "#6CC983"] }: { id: string; time?: Time; sun?: [number, number] | null; hills?: [string, string] }) {
  const [a, b, c] = SKIES[time];
  return (
    <>
      <Sky id={id} from={a} mid={b} to={c} />
      {sun && <LightRays x={sun[0]} y={sun[1]} />}
      {sun && <Sun x={sun[0]} y={sun[1]} r={18} />}
      {time !== "dusk" && <DriftCloud y={46} s={0.6} dur={70} phase={0.2} />}
      {time === "dusk" && <Stars seed={6} n={12} bottom={90} />}
      <Mountains y={18} far={time === "sunset" ? "#D8A7A8" : time === "dusk" ? "#6A5A9C" : undefined} mid={time === "sunset" ? "#C08A98" : time === "dusk" ? "#54478A" : undefined} />
      <Hills back={hills[0]} front={hills[1]} backY={208} frontY={238} />
      <path d="M-10 300 Q80 270 200 276 T410 268 L410 300Z" fill={time === "dusk" ? "#A88A7A" : "#E8D3A0"} />
    </>
  );
}

function Front({ seed = 0 }: { seed?: number }) {
  return (
    <Depth z={0.4}>
      <Daisy x={20} y={300} h={24} delay={-seed * 0.3} />
      <Daisy x={384} y={300} h={20} color="#FF8FB1" delay={-1 - seed * 0.3} />
    </Depth>
  );
}

/** The pond with its party: a string of lanterns between two poles. */
function Lanterns({ x0 = 220, x1 = 400, y = 110, lit = true }: { x0?: number; x1?: number; y?: number; lit?: boolean }) {
  const n = 6;
  const colors = ["#E8413B", "#FFD233", "#3FB45A", "#FF8A1F", "#9B5BD6", "#2E86C1"];
  return (
    <g>
      <path d={`M${x0} ${y} Q${(x0 + x1) / 2} ${y + 26} ${x1} ${y}`} stroke="#5A3A2A" strokeWidth={1.6} fill="none" />
      {Array.from({ length: n }, (_, k) => {
        const t = (k + 0.5) / n;
        const x = x0 + (x1 - x0) * t;
        const yy = y + 26 * 2 * t * (1 - t) * 2 - 2;
        return (
          <g key={k} transform={`translate(${r1(x)} ${r1(yy)})`}>
            <g className="fidel-te-swing" style={vars({ "--delay": `${r1(-k * 0.4)}s` })}>
              <path d="M0 0 V4" stroke="#5A3A2A" strokeWidth={1.2} />
              {lit && <circle cx={0} cy={13} r={13} fill="#FFE9A0" opacity={0.35} className="fidel-kit-glow" style={vars({ "--delay": `${-k * 0.3}s`, "--lo": "0.2", "--hi": "0.6" })} />}
              <ellipse cx={0} cy={13} rx={7} ry={9} fill={colors[k % colors.length]} />
              <path d="M-7 13 H7 M0 4 V22" stroke="#fff" strokeOpacity={0.4} strokeWidth={1} />
            </g>
          </g>
        );
      })}
    </g>
  );
}

function Pond({ x, y, w = 160 }: { x: number; y: number; w?: number }) {
  return (
    <g>
      <ellipse cx={x} cy={y} rx={w / 2} ry={18} fill="#5BB8E8" />
      <ellipse cx={x} cy={y + 4} rx={w / 2 - 10} ry={11} fill="#3E98D0" opacity={0.5} />
      <path d={`M${x - 40} ${y - 4} h22 M${x + 10} ${y + 2} h26`} stroke="#fff" strokeWidth={1.6} strokeLinecap="round" opacity={0.8} className="lali-ripple" />
      <g fill="#3C9A4E">
        <ellipse cx={x - w / 2 + 12} cy={y - 2} rx={8} ry={3} />
        <ellipse cx={x + w / 2 - 20} cy={y + 6} rx={9} ry={3.4} />
      </g>
    </g>
  );
}

function Zzz({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="#fff" stroke="#3E7A3E" strokeWidth={0.8}>
      {[0, 1, 2].map((k) => (
        <g key={k} className="fidel-te-zzz" style={vars({ "--delay": `${r1(delay - k * 0.85)}s` })}>
          <text fontSize={14 + k * 2} fontFamily="var(--font-grandstander)" fontWeight={900}>
            z
          </text>
        </g>
      ))}
    </g>
  );
}

/* ---------- the pages ---------- */

export default function FidelTe({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // An invitation: "Party at the pond, at sunset!" She sets off at breakfast.
    case 0:
      return (
        <>
          <Way id={id} time="morning" sun={[300, 70]} />
          {/* the pond far, far away on the hills, with its lanterns */}
          <Depth z={-0.3}>
            <g transform="translate(330 204) scale(0.35)">
              <Pond x={0} y={0} />
              <Lanterns x0={-80} x1={80} y={-60} lit={false} />
            </g>
          </Depth>
          <g transform="translate(66 266)">
            <path d="M-60 0 Q-58 -60 -10 -64 Q30 -62 36 0Z" fill="#9C98A6" />
            <path d="M-44 -36 Q-30 -50 -12 -50" stroke="#fff" strokeOpacity={0.35} strokeWidth={5} fill="none" strokeLinecap="round" />
          </g>
          <Turtle x={140} y={280} s={1.3} mood="joy" card />
          <PicBubble x={214} y={180} w={56} h={40} dx={40} delay={1}>
            <circle cx={-12} cy={-4} r={7} fill="#FF9A4A" />
            <path d="M-22 4 h20" stroke="#E8C55A" strokeWidth={3} strokeLinecap="round" />
            <ellipse cx={12} cy={4} rx={10} ry={4} fill="#5BB8E8" />
            <path d="M8 -8 v6 M14 -10 v8" stroke="#E8413B" strokeWidth={2.4} strokeLinecap="round" />
          </PicBubble>
          <Butterfly x={260} y={170} color="#FFD233" />
          <Front />
          <Air kind="day" seed={2} grass={false} />
        </>
      );
    // Step, step, step. Zoom! A little goat races past: ተ, "ta", like in tub.
    case 1:
      return (
        <>
          <Way id={id} time="day" sun={[340, 50]} />
          <Turtle x={110} y={282} s={1.1} walking className="fidel-te-creep" style={vars({ "--fx": "-24px" })} />
          <Zoom i={0} x={286} y={276} delay={1} s={1.05} />
          <SoundBubble x={278} y={196} g="ተ" side="left" delay={2.1} color={LETTER} size={1.15} />
          <Notes x={150} y={214} delay={0.6} color="#3E7A3E" />
          <Front seed={1} />
          <Air kind="day" seed={3} grass={false} />
        </>
      );
    // More goats! ቱ "tu", ቲ "ti", ታ "taa", like ta-daa!
    case 2:
      return (
        <>
          <Way id={id} time="day" sun={[340, 50]} />
          <Turtle x={70} y={284} s={0.95} walking mood="wow" className="fidel-te-creep" style={vars({ "--fx": "-20px" })} />
          {[1, 2, 3].map((i, k) => (
            <g key={i}>
              <Zoom i={i} x={170 + k * 76} y={278 - (k % 2) * 8} delay={0.6 + k * 0.7} />
              <SoundBubble x={166 + k * 76} y={200 - (k % 2) * 8} g={TE[i]} side="up" delay={1.6 + k * 0.7} color={LETTER} />
            </g>
          ))}
          <Front seed={2} />
          <Air kind="day" seed={4} grass={false} />
        </>
      );
    // ቴ "tay", ት "t", ቶ "to". "You're too slow! See you at the party!"
    case 3:
      return (
        <>
          <Way id={id} time="day" sun={[340, 50]} />
          <Turtle x={70} y={284} s={0.95} mood="happy" />
          {[4, 5, 6].map((i, k) => (
            <g key={i}>
              <Goat i={i} x={170 + k * 76} y={278 - (k % 2) * 8} hop mood="laugh" look={-2} delay={-k * 0.15} />
              <SoundBubble x={166 + k * 76} y={(i === 5 ? 214 : 200) - (k % 2) * 8} g={TE[i]} side="up" delay={0.8 + k * 0.7} color={LETTER} size={i === 5 ? 0.85 : 1} />
            </g>
          ))}
          <Front seed={3} />
          <Air kind="day" seed={5} grass={false} />
        </>
      );
    // Off they zoom over the hill. Tiny Turtle keeps on walking: "Slow and steady, I'll get there!"
    case 4:
      return (
        <>
          <Way id={id} time="day" sun={[60, 50]} hills={["#8FD39A", "#7AD08C"]} />
          <path d="M180 270 Q280 200 410 196 L410 300 L180 300Z" fill="#6CC983" />
          {TE.map((_, i) => (
            <Goat key={i} i={i} x={286 + i * 16} y={214 - i * 2} s={0.42} hop look={2} delay={-i * 0.13} />
          ))}
          <g fill="#E8D3A0">
            {[0, 1, 2].map((k) => (
              <circle key={k} cx={280 - k * 10} cy={212 + k * 3} r={6} opacity={0.7} className="fidel-kit-glow" style={vars({ "--delay": `${-k * 0.3}s`, "--lo": "0", "--hi": "0.8", "--dur": "0.9s" })} />
            ))}
          </g>
          <Turtle x={130} y={284} s={1.25} walking mood="happy" className="fidel-te-creep" style={vars({ "--fx": "-26px" })} />
          <Notes x={196} y={220} delay={0.5} color="#3E7A3E" />
          <Notes x={214} y={210} delay={1.2} color="#3E7A3E" />
          <Front seed={4} />
          <Air kind="day" seed={6} grass={false} />
        </>
      );
    // By the bushes, ተ and ቱ chase butterflies round and round. "Which way?" "This way."
    case 5:
      return (
        <>
          <Way id={id} time="day" sun={[340, 50]} />
          <g fill="#3E8F5A">
            <circle cx={74} cy={244} r={30} />
            <circle cx={112} cy={236} r={34} />
            <circle cx={150} cy={248} r={26} />
            <circle cx={306} cy={238} r={30} />
            <circle cx={344} cy={246} r={24} />
          </g>
          {[0, 1].map((i) => (
            <g key={i} transform={`translate(${150 + i * 64} 266)`}>
              <g className="fidel-te-orbit" style={vars({ "--r": "22px", "--dur": "2.6s", "--delay": `${-i * 1.3}s` })}>
                <Goat i={i} x={0} y={0} s={0.9} hop mood="joy" look={i ? -2 : 2} delay={-i * 0.2} />
              </g>
            </g>
          ))}
          <Butterfly x={168} y={186} color="#FF8FB1" />
          <Butterfly x={226} y={176} color="#FFD233" delay={-0.8} />
          <PicBubble x={150} y={206} w={40} h={34} dx={-20} delay={1.2}>
            <Glyph g="?" y={9} size={24} fill="#E8413B" />
          </PicBubble>
          {/* a signpost, and Tiny Turtle pointing the way */}
          <g transform="translate(330 280)">
            <path d="M0 0 V-62" stroke="#7A5236" strokeWidth={5} strokeLinecap="round" />
            <Tappable reaction="wiggle" sound="pop">
              <path d="M-26 -70 H18 L30 -60 L18 -50 H-26Z" fill="#E8C55A" stroke="#9A6A40" strokeWidth={2} />
              <ellipse cx={0} cy={-60} rx={10} ry={4} fill="#5BB8E8" />
            </Tappable>
          </g>
          <Turtle x={268} y={286} s={1.05} mood="happy" look={1} />
          <Front seed={5} />
          <Air kind="day" seed={7} grass={false} />
        </>
      );
    // Under the big shady tree, ቲ and ታ are fast asleep. Tiny Turtle wakes them gently.
    case 6:
      return (
        <>
          <Way id={id} time="afternoon" sun={[340, 54]} />
          <Acacia x={170} y={262} s={2.2} />
          <path d="M60 270 Q170 256 290 270" stroke="#000" strokeOpacity={0.08} strokeWidth={14} fill="none" strokeLinecap="round" />
          {[2, 3].map((i, k) => (
            <g key={i}>
              <Goat i={i} x={138 + k * 58} y={272} s={0.95} mood="sleepy" look={0} delay={-k * 0.6} />
              <Zzz x={150 + k * 58} y={196} delay={-k * 1.2} />
            </g>
          ))}
          <Turtle x={300} y={284} s={1.05} mood="happy" look={-3} />
          <g className="lali-pop-in" style={vars({ "--delay": "1.4s" })}>
            <Sparkles seed={4} spots={[[256, 236]]} color="#FFE27A" />
          </g>
          <Front seed={6} />
          <Air kind="day" seed={8} grass={false} />
        </>
      );
    // At the stream, ቴ and ት are stuck. "Climb on my shell!" Paddle, paddle, across they go.
    case 7:
      return (
        <>
          <Way id={id} time="afternoon" sun={[340, 54]} />
          <path d="M-10 236 Q200 222 410 236 L410 300 L-10 300Z" fill="#6CC983" />
          <Water y={242} h={44} />
          <path d="M-10 288 Q200 280 410 290 L410 300 L-10 300Z" fill="#6CC983" />
          <g className="lali-move-in" style={vars({ "--fx": "-120px", "--fy": "0px", "--dur": "6s", "--delay": "0.3s" })}>
            <g className="fidel-te-swim">
              <Turtle x={230} y={268} s={1.2} mood="joy" />
              <Goat i={4} x={214} y={214} s={0.8} mood="joy" look={2} />
              <Goat i={5} x={250} y={214} s={0.8} mood="wow" look={2} />
            </g>
          </g>
          <g fill="#E3F6FF">
            {[0, 1, 2].map((k) => (
              <ellipse key={k} cx={300 + k * 8} cy={262} rx={3} ry={2} className="fidel-kit-glow" style={vars({ "--delay": `${-k * 0.3}s`, "--lo": "0", "--hi": "1", "--dur": "0.8s" })} />
            ))}
          </g>
          <Front seed={7} />
          <Air kind="day" seed={9} grass={false} />
        </>
      );
    // On the hilltop, ቶ spins round and round, dizzy and lost. "Follow me!"
    case 8:
      return (
        <>
          <Way id={id} time="afternoon" sun={[70, 60]} />
          <path d="M-10 300 L-10 250 Q200 196 410 244 L410 300Z" fill="#7AC98A" />
          <g transform="translate(230 238)">
            <g className="fidel-te-dizzy">
              <Goat i={6} x={0} y={0} s={1.1} mood="worried" look={0} />
            </g>
            <g transform="translate(0 -92)">
              <g className="fidel-te-circle">
                <circle r={22} fill="none" />
                {[0, 120, 240].map((a) => (
                  <path key={a} d="M0 -5 Q1 -1 5 0 Q1 1 0 5 Q-1 1 -5 0 Q-1 -1 0 -5Z" transform={`rotate(${a}) translate(20 0)`} fill="#FFD233" />
                ))}
              </g>
            </g>
          </g>
          <Turtle x={120} y={272} s={1.1} mood="happy" look={1} />
          <PicBubble x={134} y={208} w={44} h={34} dx={-16} delay={1}>
            <path d="M-12 0 H8 M2 -7 L10 0 L2 7" stroke="#3E7A3E" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </PicBubble>
          <Birds y={90} dur={20} phase={0.2} />
          <Air kind="day" seed={10} grass={false} />
        </>
      );
    // Tiny Turtle leads the way; seven little goats walk slowly behind her, in order.
    case 9:
      return (
        <>
          <Way id={id} time="afternoon" sun={[60, 64]} />
          <ChantRow letters={TE} color={LETTER} y={64} x0={70} x1={330} size={30} start={0.8} step={0.6} bg="#FFFDF0" />
          {/* she leads to the left here, so the goats behind her read in order, left to right */}
          <Turtle x={70} y={280} s={1} walking mood="joy" flip />
          {TE.map((_, i) => (
            <Goat key={i} i={i} x={138 + i * 34} y={276 - (i % 2) * 6} s={0.72} mood="joy" look={-2} delay={-i * 0.3} className="fidel-kit-karaoke" style={vars({ "--delay": `${r1(0.8 + i * 0.6)}s`, "--dur": `${r1(7 * 0.6 + 2.4)}s` })} />
          ))}
          <Front seed={9} />
          <Air kind="day" seed={11} grass={false} />
        </>
      );
    // The sun is sinking. Just as it touches the hills… they reach the pond! Right on time.
    case 10:
      return (
        <>
          <Sky id={id} from={SKIES.sunset[0]} mid={SKIES.sunset[1]} to={SKIES.sunset[2]} />
          <Depth z={-0.8}>
            <g className="fidel-te-sink">
              <circle cx={300} cy={176} r={50} fill="#FFE9A0" opacity={0.35} />
              <Tappable reaction="grow" sound="chime">
                <circle cx={300} cy={176} r={30} fill="#FFB347" />
              </Tappable>
            </g>
          </Depth>
          <Hills back="#C9B36A" front="#9DB862" backY={194} frontY={232} />
          <Pond x={300} y={250} w={170} />
          <Lanterns x0={226} x1={392} y={150} />
          <Turtle x={150} y={282} s={1} mood="joy" />
          {TE.map((_, i) => (
            <Goat key={i} i={i} x={96 - (i % 3) * 30 + (i > 2 ? 10 : 0)} y={264 + (i % 2) * 16 - (i > 4 ? 30 : 0)} s={0.56} mood="joy" look={2} delay={-i * 0.3} />
          ))}
          <Air kind="dusk" seed={12} grass={false} />
        </>
      );
    // Lanterns, music and friends! "Hooray for Tiny Turtle! Slow and steady got there!"
    case 11:
      return (
        <>
          <Sky id={id} from={SKIES.dusk[0]} mid={SKIES.dusk[1]} to={SKIES.dusk[2]} />
          <Stars seed={8} n={14} bottom={90} />
          <Hills back="#4F7D62" front="#43705A" backY={200} frontY={236} />
          <Pond x={210} y={262} w={300} />
          <Lanterns x0={10} x1={200} y={60} />
          <Lanterns x0={200} x1={390} y={60} />
          <g>
            {Array.from({ length: 12 }, (_, k) => (
              <rect
                key={k}
                x={20 + ((k * 61) % 360)}
                y={70 + ((k * 37) % 60)}
                width={5}
                height={8}
                rx={1}
                fill={["#E8413B", "#FFD233", "#3FB45A", "#FF8FB1", "#7FD3FF"][k % 5]}
                className="fidel-te-confetti"
                style={vars({ "--delay": `${r1(-k * 0.37)}s`, "--dur": `${r1(3.2 + (k % 4) * 0.5)}s` })}
              />
            ))}
          </g>
          <Place x={64} y={262} s={0.36}>
            <CubShape pose="sit" mood="joy" look={2} />
          </Place>
          <Place x={336} y={262} s={0.36} tap={{ reaction: "wiggle", sound: "boing" }}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <BeeHover x={290} y={150} s={1.1} flip />
          <g className="lali-hop" style={vars({ "--dur": "1.2s" })}>
            <Turtle x={196} y={252} s={1.15} mood="joy" />
          </g>
          {TE.map((_, i) => (
            <Goat key={i} i={i} x={110 + i * 30} y={290 - (i % 2) * 6} s={0.5} hop mood="joy" delay={-i * 0.17} />
          ))}
          <Air kind="night" seed={13} grass={false} />
        </>
      );
    // ቤ lands next to ት: ቤት, home! Tiny Turtle taps her shell: her ቤት comes everywhere.
    default:
      return (
        <>
          <Sky id={id} from={SKIES.dusk[0]} mid={SKIES.dusk[1]} to={SKIES.dusk[2]} />
          <Stars seed={10} n={16} bottom={100} />
          <Hills back="#4F7D62" front="#43705A" backY={206} frontY={240} />
          <Lanterns x0={0} x1={400} y={24} />
          <WordCard x={200} y={96} parts={[{ g: "ቤ", color: "#7A3E00" }, { g: "ት", color: LETTER }]} size={58} delay={1.6}>
            <g transform="scale(0.5) translate(0 18)">
              <TurtleShape mood="joy" />
            </g>
          </WordCard>
          <At x={118} y={210} s={1.4} reaction="loop" sound="buzz" className="lali-move-in" style={vars({ "--fx": "-90px", "--fy": "-60px", "--dur": "1.2s", "--delay": "0.3s" })}>
            <g className="lali-float" style={vars({ "--rise": "-5px", "--dur": "1.4s" })}>
              <BeeKid i={4} mood="joy" look={2} />
            </g>
          </At>
          <Goat i={5} x={188} y={268} s={1.3} mood="joy" look={-1} />
          <Turtle x={300} y={276} s={1.2} mood="joy" look={-1} tap />
          <Fireflies seed={4} n={6} top={150} bottom={260} />
          <Air kind="night" seed={14} grass={false} />
        </>
      );
  }
}
