"use client";

import { useId, type ReactNode } from "react";

import { CubShape, GuguShape, type CubPose, type Mood } from "../../characters";
import { Tappable } from "../tappable";
import { Air, BeeHover, Depth, Moon, Place, Sky, Stars, Tukul } from "../scenery";
import { At, ChantRow, Face, Glyph, INK, Notes, PicBubble, r1, SoundBubble, Sparkles, vars, WordCard, type FaceMood } from "./fidel-kit";
import "./fidel-ne.css";

/*
  "Nana's Night Market ነ": one living picture per page (14 pages).
  The ነ family are paper lanterns with faces, hanging over the stalls and wearing their letter
  big and dark on glowing paper: ነ ኑ ኒ ና ኔ ን ኖ. Under each is something that starts with it.
  Nana is Grandma in her netela; Anbessa shops with her; Lali turns up at the honey stall.
  A ቡ lantern from the bee family joins ና at the coffee stall for ቡና.
  Keyframes are fidel-ne-* in ./fidel-ne.css.
*/

const NE = ["ነ", "ኑ", "ኒ", "ና", "ኔ", "ን", "ኖ"];
const PAPER = ["#FF8A3D", "#FFC83D", "#FF6F61", "#FFB347", "#F9D56E", "#FF9A8A", "#FFD27A"];
const LANTERN_INK = "#5A1A0A";
const NIGHT_INK = "#2A2048";

/* ---------- the lanterns ---------- */

/**
 * A paper lantern with a face, hanging from its string at (0, 0); about 86 tall.
 * `wake` makes it blink awake as the page opens (it starts dim and sleepy).
 */
function LanternShape({ g, paper, mood = "happy", wake = false, delay = 0, look = 0 }: { g: string; paper: string; mood?: FaceMood; wake?: boolean; delay?: number; look?: number }) {
  const body = (lit: boolean, m: FaceMood) => (
    <g>
      {lit && <circle cx={0} cy={44} r={44} fill="#FFE9A0" opacity={0.4} className="fidel-kit-glow" style={vars({ "--lo": "0.25", "--hi": "0.55", "--delay": `${r1(delay)}s` })} />}
      <ellipse cx={0} cy={44} rx={23} ry={30} fill={lit ? paper : "#6A5A7A"} />
      <path d="M-11 18 Q-17 44 -11 70 M11 18 Q17 44 11 70 M0 15 V73" stroke={lit ? "#fff" : "#4A3A5A"} strokeOpacity={lit ? 0.3 : 0.6} strokeWidth={1.4} fill="none" />
      <ellipse cx={-9} cy={30} rx={5} ry={9} fill="#fff" opacity={lit ? 0.3 : 0.08} />
      <Face cx={0} cy={28} s={0.75} mood={m} look={look} ink={LANTERN_INK} eye={LANTERN_INK} delay={delay} />
      <Glyph g={g} x={0} y={64} size={25} fill={lit ? LANTERN_INK : "#3A2A4A"} />
    </g>
  );
  return (
    <g className="fidel-ne-swing" style={vars({ "--delay": `${r1(delay)}s` })}>
      <path d="M0 0 V10" stroke={NIGHT_INK} strokeWidth={1.6} />
      <rect x={-12} y={9} width={24} height={7} rx={2} fill="#8A2A1E" />
      {wake ? (
        <g>
          {body(false, "sleepy")}
          <g className="fidel-ne-wake" style={vars({ "--delay": `${r1(0.6 + delay * 0)}s` })}>
            {body(true, mood)}
          </g>
        </g>
      ) : (
        body(true, mood)
      )}
      <rect x={-12} y={72} width={24} height={6} rx={2} fill="#8A2A1E" />
      <g transform="translate(0 78)">
        <g className="fidel-ne-tassel" style={vars({ "--delay": `${r1(delay)}s` })}>
          <path d="M0 0 V10" stroke="#8A2A1E" strokeWidth={2} />
          <path d="M-3 10 h6 l-1 9 h-4Z" fill="#E8413B" />
        </g>
      </g>
    </g>
  );
}

function Lantern({ i, x, y, s = 1, g, paper, ...rest }: { i: number; x: number; y: number; s?: number; g?: string; paper?: string } & Omit<Parameters<typeof LanternShape>[0], "g" | "paper">) {
  return (
    <At x={x} y={y} s={s} reaction="wiggle" sound="chime">
      <LanternShape g={g ?? NE[i]} paper={paper ?? PAPER[i]} delay={rest.delay ?? -i * 0.4} {...rest} />
    </At>
  );
}

/** A string of small plain lanterns along the top, for the whole market. */
function LightString({ y = 30, sag = 22, n = 9, seed = 0 }: { y?: number; sag?: number; n?: number; seed?: number }) {
  return (
    <Depth z={-0.2}>
      <path d={`M-10 ${y} Q200 ${y + sag * 2} 410 ${y}`} stroke={NIGHT_INK} strokeWidth={1.4} fill="none" />
      {Array.from({ length: n }, (_, k) => {
        const t = (k + 0.5) / n;
        const x = -10 + 420 * t;
        const yy = y + sag * 2 * 2 * t * (1 - t);
        return (
          <g key={k} transform={`translate(${r1(x)} ${r1(yy)})`}>
            <circle cx={0} cy={6} r={9} fill="#FFE9A0" opacity={0.3} className="fidel-kit-glow" style={vars({ "--delay": `${r1(-(k + seed) * 0.37)}s`, "--lo": "0.15", "--hi": "0.5" })} />
            <circle cx={0} cy={6} r={4} fill={PAPER[(k + seed) % PAPER.length]} />
          </g>
        );
      })}
    </Depth>
  );
}

/* ---------- the people ---------- */

/** Nana in her long white netela; her head is the shared one, clipped from Grandma sitting. */
function NanaShape({ arm = "down", mood = "happy", look = 0, walking = false, holding }: { arm?: "down" | "hold" | "up"; mood?: Mood; look?: number; walking?: boolean; holding?: ReactNode }) {
  const cid = useId().replace(/:/g, "");
  return (
    <g>
      <defs>
        <clipPath id={`${cid}-h`}>
          <rect x={0} y={0} width={200} height={150} />
        </clipPath>
      </defs>
      <ellipse cx={100} cy={232} rx={58} ry={7} fill="#000" opacity={0.13} />
      <ellipse cx={84} cy={226} rx={12} ry={6} fill="#C98A4A" />
      <ellipse cx={116} cy={226} rx={12} ry={6} fill="#C98A4A" />
      <g className={walking ? "lali-step" : "lali-breathe"}>
        <path d="M66 140 Q100 128 134 140 L150 224 Q100 232 50 224Z" fill="#FFFDF4" />
        <path d="M52 214 Q100 222 148 214" stroke="#2E9A8A" strokeWidth={6} fill="none" />
        <path d="M52 214 Q100 222 148 214" stroke="#F5B21E" strokeWidth={2.4} strokeDasharray="4 4" fill="none" />
        <path d="M60 146 Q100 168 142 144 L140 160 Q100 186 62 162Z" fill="#F4EEDC" />
        <path d="M62 162 Q100 186 140 160" stroke="#2E9A8A" strokeWidth={4} fill="none" />
        <path d="M64 152 Q54 180 64 200" stroke="#F4EEDC" strokeWidth={14} fill="none" strokeLinecap="round" />
        {arm === "down" && <path d="M136 152 Q146 180 136 200" stroke="#F4EEDC" strokeWidth={14} fill="none" strokeLinecap="round" />}
        {arm === "hold" && (
          <g>
            <path d="M136 152 Q156 170 166 182" stroke="#F4EEDC" strokeWidth={14} fill="none" strokeLinecap="round" />
            <circle cx={168} cy={186} r={8} fill="#FFC870" />
            {holding && <g transform="translate(168 186)">{holding}</g>}
          </g>
        )}
        {arm === "up" && (
          <g>
            <path d="M136 150 Q160 136 168 110" stroke="#F4EEDC" strokeWidth={14} fill="none" strokeLinecap="round" />
            <circle cx={169} cy={104} r={8} fill="#FFC870" />
            {holding && <g transform="translate(169 104)">{holding}</g>}
          </g>
        )}
        <g clipPath={`url(#${cid}-h)`} transform="translate(0 -6)">
          <CubShape pose="sit" granny mood={mood} look={look} />
        </g>
      </g>
    </g>
  );
}

function Nana({ x, y, s = 0.42, flip = false, from, dur, delay, ...rest }: { x: number; y: number; s?: number; flip?: boolean; from?: [number, number]; dur?: number; delay?: number } & Parameters<typeof NanaShape>[0]) {
  return (
    <Place x={x} y={y} s={s} flip={flip} from={from} dur={dur} delay={delay} tap={{ reaction: "grow", sound: "chime" }}>
      <NanaShape {...rest} />
    </Place>
  );
}

function Anbessa({ x, y, s = 0.34, flip = false, pose = "sit", mood = "happy", look = 0, from, delay, className }: { x: number; y: number; s?: number; flip?: boolean; pose?: CubPose; mood?: Mood; look?: number; from?: [number, number]; delay?: number; className?: string }) {
  return (
    <Place x={x} y={y} s={s} flip={flip} from={from} delay={delay} className={className}>
      <CubShape pose={pose} mood={mood} look={look} />
    </Place>
  );
}

/* ---------- the market ---------- */

type Time = "dusk" | "night";

function Street({ id, time = "night", moon = true }: { id: string; time?: Time; moon?: boolean }) {
  return (
    <>
      {time === "dusk" ? <Sky id={id} from="#2B2A6E" mid="#8A4F8A" to="#FFB070" /> : <Sky id={id} from="#10154A" mid="#2E2A78" to="#6A3F7A" />}
      <Stars seed={time === "dusk" ? 3 : 7} n={time === "dusk" ? 10 : 22} bottom={110} />
      {moon && time === "night" && <Moon x={58} y={76} r={14} />}
      {/* rooftops far behind */}
      <Depth z={-0.5}>
        <path d="M-10 170 L20 170 L20 140 L48 124 L76 140 L76 168 L110 168 L110 132 L150 132 L150 164 L196 164 L196 128 L222 110 L248 128 L248 166 L290 166 L290 136 L332 136 L332 160 L370 160 L370 126 L396 112 L420 126 L420 200 L-10 200Z" fill={time === "dusk" ? "#4A3A6A" : "#2A2458"} />
        <g fill="#FFD27A" opacity={0.8}>
          {[
            [36, 150],
            [126, 146],
            [214, 140],
            [306, 148],
            [384, 138],
          ].map(([x, y], k) => (
            <rect key={k} x={x} y={y} width={8} height={9} rx={1.5} className="fidel-kit-glow" style={vars({ "--delay": `${-k * 0.7}s`, "--lo": "0.5", "--hi": "1", "--dur": "3.4s" })} />
          ))}
        </g>
      </Depth>
      {/* the street */}
      <rect x={-10} y={196} width={420} height={120} fill={time === "dusk" ? "#7A5A6A" : "#4E3E5E"} />
      <path d="M-10 230 H410 M-10 262 H410" stroke="#000" strokeOpacity={0.12} strokeWidth={2} />
      <path d="M30 196 V230 M120 230 V262 M210 196 V230 M300 230 V262 M380 196 V230 M70 262 V300 M250 262 V300" stroke="#000" strokeOpacity={0.1} strokeWidth={2} />
    </>
  );
}

/** A market stall: a striped awning, two posts and a table, left edge at x; table top at y. */
function Stall({ x, w = 150, y = 238, color = "#E8413B", children }: { x: number; w?: number; y?: number; color?: string; children?: ReactNode }) {
  const top = y - 90;
  const stripes = Array.from({ length: Math.ceil(w / 22) }, (_, k) => `M${x + k * 22} ${top} h11 l2 22 h-15Z`).join(" ");
  return (
    <g>
      <rect x={x + 6} y={top} width={4} height={90} fill="#5A3A2A" />
      <rect x={x + w - 10} y={top} width={4} height={90} fill="#5A3A2A" />
      <path d={`M${x - 6} ${top + 22} L${x + 4} ${top} H${x + w - 4} L${x + w + 6} ${top + 22}Z`} fill={color} />
      <path d={stripes} fill="#fff" opacity={0.8} />
      <path d={`M${x - 6} ${top + 22} ${Array.from({ length: Math.ceil((w + 12) / 12) }, () => "q3 6 6 0 q3 6 6 0").join(" ")}`} stroke="none" fill={color} />
      {children}
      <rect x={x} y={y} width={w} height={8} rx={2} fill="#9A6A40" />
      <rect x={x + 4} y={y + 8} width={w - 8} height={24} fill="#7A5236" />
    </g>
  );
}

/* the goods, each drawn on a table top at (0, 0) */

function Netelas() {
  return (
    <g>
      {[0, 1, 2].map((k) => (
        <g key={k} transform={`translate(${-34 + k * 4} ${-10 - k * 9})`}>
          <rect x={0} y={0} width={70} height={10} rx={3} fill="#FFFDF4" />
          <path d="M0 7 H70" stroke={["#2E9A8A", "#E8413B", "#9B5BD6"][k]} strokeWidth={2.4} />
          <path d="M0 7 H70" stroke="#F5B21E" strokeWidth={1} strokeDasharray="3 3" />
        </g>
      ))}
    </g>
  );
}

function Seeds() {
  return (
    <g>
      {[-36, 0, 36].map((x, k) => (
        <g key={x} transform={`translate(${x} 0)`}>
          <path d="M-16 0 Q-20 -26 -12 -32 H12 Q20 -26 16 0Z" fill={["#D9B48A", "#C9A27A", "#E3C79A"][k]} />
          <ellipse cx={0} cy={-32} rx={12} ry={4} fill="#3A2E2A" />
          <g fill="#2A1A10">
            <circle cx={-4} cy={-33} r={1.2} />
            <circle cx={3} cy={-32} r={1.2} />
            <circle cx={0} cy={-35} r={1} />
          </g>
        </g>
      ))}
    </g>
  );
}

/** A little carved mountain nyala: curly horns, white stripes. Drawn standing on (0, 0). */
function Nyala({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <rect x={-14} y={-14} width={3.4} height={14} fill="#8A5A3A" />
      <rect x={8} y={-14} width={3.4} height={14} fill="#8A5A3A" />
      <ellipse cx={0} cy={-18} rx={17} ry={9} fill="#A8744A" />
      <path d="M-8 -26 v14 M0 -27 v16 M8 -26 v14" stroke="#F4EEDC" strokeWidth={1.4} />
      <path d="M14 -22 Q20 -30 22 -36" stroke="#A8744A" strokeWidth={7} strokeLinecap="round" fill="none" />
      <ellipse cx={24} cy={-38} rx={6} ry={4.4} fill="#A8744A" />
      <path d="M22 -42 Q18 -50 22 -54 Q26 -58 22 -62 M26 -42 Q28 -50 32 -52 Q36 -56 33 -60" stroke="#E8C55A" strokeWidth={2} fill="none" strokeLinecap="round" />
      <circle cx={26} cy={-39} r={1.2} fill={INK} />
    </g>
  );
}

function Mint() {
  return (
    <g>
      {[-34, -10, 14, 38].map((x, k) => (
        <g key={x} transform={`translate(${x} 0)`}>
          <path d="M0 0 V-14" stroke="#2E7A3E" strokeWidth={2} />
          <g className="lali-sway" style={vars({ "--dur": "2.4s", "--delay": `${-k * 0.5}s` })}>
            {[-1, 1].map((d) => (
              <ellipse key={d} cx={d * 6} cy={-18} rx={7} ry={4.5} fill="#4DBA74" transform={`rotate(${d * -30} ${d * 6} -18)`} />
            ))}
            <ellipse cx={0} cy={-26} rx={5} ry={7} fill="#5FD08A" />
          </g>
        </g>
      ))}
    </g>
  );
}

function SweetJars() {
  return (
    <g>
      {[-34, 0, 34].map((x, k) => (
        <g key={x} transform={`translate(${x} 0)`}>
          <rect x={-12} y={-28} width={24} height={28} rx={6} fill="#E3F6FF" opacity={0.85} />
          <g fill={["#F5A623", "#FF8FB1", "#FFD233"][k]}>
            <circle cx={-5} cy={-8} r={4} />
            <circle cx={4} cy={-7} r={4} />
            <circle cx={0} cy={-15} r={4} />
          </g>
          <rect x={-10} y={-32} width={20} height={5} rx={2} fill="#C98A5A" />
        </g>
      ))}
    </g>
  );
}

function HoneyPots() {
  return (
    <g>
      {[-38, 34].map((x) => (
        <g key={x} transform={`translate(${x} 0)`}>
          <path d="M-16 0 Q-22 -22 -10 -28 H10 Q22 -22 16 0Z" fill="#C98A3A" />
          <path d="M-12 -28 H12" stroke="#8A5A26" strokeWidth={4} strokeLinecap="round" />
          <path d="M-8 -28 Q-6 -20 -4 -24 Q-2 -16 0 -24" stroke="#F5A623" strokeWidth={3} fill="none" strokeLinecap="round" />
        </g>
      ))}
    </g>
  );
}

function Chalk() {
  return (
    <g>
      <path d="M-46 0 Q-36 -30 0 -34 Q36 -30 46 0Z" fill="#F7F4EE" />
      <path d="M-30 -12 Q-10 -26 14 -22" stroke="#E3DED4" strokeWidth={4} fill="none" strokeLinecap="round" />
      <g transform="translate(40 -4) rotate(-30)">
        <rect x={-3} y={-30} width={6} height={22} rx={2} fill="#9A6A40" />
        <rect x={-6} y={-10} width={12} height={10} rx={2} fill="#F7F4EE" />
      </g>
    </g>
  );
}

/** A jebena, the clay coffee pot, with steam curling from its spout. */
function Jebena({ steam = true }: { steam?: boolean }) {
  return (
    <g>
      <ellipse cx={0} cy={-14} rx={14} ry={14} fill="#2A1A10" />
      <path d="M-4 -26 Q-6 -42 0 -48 Q6 -42 4 -26Z" fill="#2A1A10" />
      <path d="M12 -18 Q22 -24 24 -34" stroke="#2A1A10" strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d="M-13 -16 Q-22 -20 -14 -28" stroke="#2A1A10" strokeWidth={3} fill="none" />
      <ellipse cx={-5} cy={-18} rx={3} ry={5} fill="#fff" opacity={0.18} />
      {steam && (
        <g fill="#fff">
          {[0, 1, 2].map((k) => (
            <circle key={k} cx={24} cy={-38} r={4} className="fidel-ne-curl" style={vars({ "--delay": `${-k * 0.9}s` })} />
          ))}
        </g>
      )}
    </g>
  );
}

/** The corn roaster from the first page: a little brazier with cobs and smoke. */
function CornRoaster({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g fill="#fff">
        {[0, 1, 2].map((k) => (
          <circle key={k} cx={0} cy={-22} r={7} className="fidel-ne-curl" style={vars({ "--delay": `${-k * 0.9}s`, "--dx": "-8px" })} />
        ))}
      </g>
      <path d="M-20 -10 H20 L14 6 H-14Z" fill="#3A3A4A" />
      <ellipse cx={0} cy={-10} rx={20} ry={4} fill="#FF7A3D" className="fidel-kit-glow" style={vars({ "--lo": "0.6", "--hi": "1", "--dur": "1.2s" })} />
      {[-10, 0, 10].map((cx, k) => (
        <g key={cx} transform={`translate(${cx} -14) rotate(${-20 + k * 20})`}>
          <ellipse cx={0} cy={0} rx={3.6} ry={9} fill="#F5C542" />
          <path d="M-2 -6 v12 M2 -6 v12" stroke="#D99A2A" strokeWidth={0.8} />
        </g>
      ))}
      <path d="M-10 6 L-14 18 M10 6 L14 18" stroke="#3A3A4A" strokeWidth={3} />
    </g>
  );
}

/** A small drum, tapped. */
function Drum({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Tappable reaction="wiggle" sound="boing">
        <path d="M-14 -22 L-12 0 H12 L14 -22Z" fill="#B8382A" />
        <path d="M-13 -16 L12 -6 M13 -16 L-12 -6" stroke="#F5C542" strokeWidth={1.4} />
        <ellipse cx={0} cy={-22} rx={14} ry={4} fill="#F4E2C2" />
      </Tappable>
      <g transform="translate(-4 -30)">
        <g className="fidel-ne-tap">
          <path d="M0 0 L18 -6" stroke="#7A5236" strokeWidth={2.4} strokeLinecap="round" />
        </g>
      </g>
    </g>
  );
}

/** The close-up set for one letter: its lantern hanging over its stall. */
function LetterStall({ id, i, color, wake = true, mood = "joy", children }: { id: string; i: number; color: string; wake?: boolean; mood?: FaceMood; children?: ReactNode }) {
  return (
    <>
      <Street id={id} />
      <LightString y={14} sag={10} seed={i} />
      <Stall x={126} w={160} color={color}>
        <g transform="translate(206 238)">{children}</g>
      </Stall>
      <Lantern i={i} x={206} y={40} s={1.15} wake={wake} mood={mood} />
    </>
  );
}

/* ---------- the pages ---------- */

export default function FidelNe({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // The night market wakes up: drums, laughter, roasting corn. "Come, Anbessa! We have a list!"
    case 0:
      return (
        <>
          <Street id={id} time="dusk" />
          <LightString y={20} sag={16} />
          <Stall x={170} w={120} color="#E8413B" />
          <Stall x={300} w={110} color="#3FB45A" />
          <CornRoaster x={232} y={234} />
          <Drum x={340} y={238} />
          <Notes x={346} y={196} delay={0.4} color="#FFE27A" />
          <Notes x={362} y={186} delay={1.2} color="#FFE27A" />
          <Nana x={116} y={286} s={0.46} walking from={[-30, 286]} dur={2.6} delay={0.3} arm="hold" holding={<rect x={-4} y={-14} width={10} height={14} rx={2} fill="#FFFDF4" stroke="#C9B49A" strokeWidth={1} transform="rotate(10)" />} />
          <Anbessa x={56} y={290} s={0.36} pose="walk" mood="joy" from={[-80, 290]} delay={0.3} />
          <Air kind="night" seed={2} grass={false} />
        </>
      );
    // Every stall has a lantern, and every lantern wears a letter of the ነ family.
    case 1:
      return (
        <>
          <Street id={id} moon={false} />
          <LightString y={6} sag={8} />
          {NE.map((_, i) => (
            <g key={i}>
              <Stall x={20 + i * 52} w={46} y={214} color={["#E8413B", "#3FB45A", "#2E86C1", "#9B5BD6", "#F5A623", "#E2467F", "#1F8A8A"][i]} />
              <Lantern i={i} x={43 + i * 52} y={48 + (i % 2) * 10} s={0.62} />
            </g>
          ))}
          <Nana x={110} y={292} s={0.38} mood="happy" look={2} />
          <Anbessa x={250} y={294} s={0.36} mood="joy" look={-2} />
          <Notes x={276} y={226} delay={0.6} color="#FFE27A" />
          <Notes x={296} y={214} delay={1.3} color="#FFE27A" />
          <Air kind="night" seed={3} grass={false} />
        </>
      );
    // ነ blinks awake: "na". A pile of white cloth: a new ነጠላ, a netela!
    case 2:
      return (
        <>
          <LetterStall id={id} i={0} color="#2E9A8A">
            <Netelas />
          </LetterStall>
          <SoundBubble x={232} y={74} g="ነ" side="right" delay={2.4} color={LANTERN_INK} size={1.1} />
          <Nana x={86} y={290} s={0.48} arm="up" mood="joy" look={2} holding={
            <g transform="scale(1.7)">
            <g className="fidel-ne-flutter">
              <path d="M-6 -4 Q20 -8 44 0 L40 50 Q16 44 -8 50Z" fill="#FFFDF4" />
              <path d="M-8 44 Q16 38 40 44" stroke="#2E9A8A" strokeWidth={4} fill="none" />
              <path d="M-8 44 Q16 38 40 44" stroke="#F5B21E" strokeWidth={1.4} strokeDasharray="3 3" fill="none" />
            </g>
            </g>
          } />
          <Anbessa x={336} y={292} s={0.34} mood="wow" look={-2} />
          <Air kind="night" seed={4} grass={false} />
        </>
      );
    // ኑ glows: "nu". A lady sells tiny black seeds: ኑግ. "For the birds," says Nana.
    case 3:
      return (
        <>
          <LetterStall id={id} i={1} color="#F5A623">
            <Seeds />
          </LetterStall>
          <SoundBubble x={232} y={74} g="ኑ" side="right" delay={2.4} color={LANTERN_INK} size={1.1} />
          {/* the seed seller behind her table, in an orange headscarf */}
          <Place x={150} y={234} s={0.3} tap={{ reaction: "wiggle", sound: "giggle" }}>
            <g>
              <GuguShape pose="wave" mood="joy" />
              <path d="M44 70 Q100 0 156 70 Q100 40 44 70Z" fill="#FF8A3D" />
            </g>
          </Place>
          {/* two little birds pecking at fallen seeds */}
          {[300, 330].map((x, k) => (
            <At key={x} x={x} y={286} s={1} reaction="spin" sound="pop">
              <g className="lali-hop" style={vars({ "--dur": "0.8s", "--delay": `${-k * 0.4}s` })}>
                <ellipse cx={0} cy={-6} rx={8} ry={6} fill="#8A6A9A" />
                <circle cx={6} cy={-11} r={4.4} fill="#8A6A9A" />
                <circle cx={7.6} cy={-12} r={1.1} fill={INK} />
                <path d="M10 -11 l4 1.4 l-4 1.2Z" fill="#F5B21E" />
              </g>
            </At>
          ))}
          <g fill="#1A1010">
            {[296, 310, 322, 338].map((x) => (
              <circle key={x} cx={x} cy={292} r={1.3} />
            ))}
          </g>
          <Nana x={78} y={290} s={0.48} mood="happy" look={2} />
          <Air kind="night" seed={5} grass={false} />
        </>
      );
    // ኒ: "ni". Carved animals; Anbessa finds a mountain nyala: ኒያላ!
    case 4:
      return (
        <>
          <LetterStall id={id} i={2} color="#9B5BD6">
            <g transform="translate(-50 0)">
              <Nyala s={0.8} />
            </g>
            <g transform="translate(40 0)">
              {/* a little carved elephant and a bird */}
              <ellipse cx={0} cy={-12} rx={14} ry={10} fill="#A8744A" />
              <circle cx={12} cy={-16} r={7} fill="#A8744A" />
              <path d="M17 -14 Q22 -6 18 0" stroke="#A8744A" strokeWidth={3} fill="none" />
              <rect x={-10} y={-4} width={4} height={4} fill="#8A5A3A" />
              <rect x={4} y={-4} width={4} height={4} fill="#8A5A3A" />
            </g>
            <g fill="#E8C55A">
              <path d="M-14 0 l4 -3 l3 3Z M2 0 l3 -2 l3 2Z" />
            </g>
          </LetterStall>
          <SoundBubble x={232} y={74} g="ኒ" side="right" delay={2.4} color={LANTERN_INK} size={1.1} />
          <Anbessa x={330} y={292} s={0.38} mood="wow" look={-2} />
          <At x={300} y={250} s={1.1} reaction="grow" sound="chime" className="lali-pop-in" style={vars({ "--delay": "1.6s" })}>
            <Nyala />
          </At>
          <Sparkles seed={2} spots={[[286, 196], [330, 208]]} />
          <Nana x={74} y={290} s={0.48} mood="happy" look={2} />
          <Air kind="night" seed={6} grass={false} />
        </>
      );
    // ና: "naa", like Nana calling "Come!" Fresh mint: ናና. "Nana buys nana!"
    case 5:
      return (
        <>
          <LetterStall id={id} i={3} color="#3FB45A">
            <Mint />
          </LetterStall>
          <SoundBubble x={232} y={74} g="ና" side="right" delay={2.4} color={LANTERN_INK} size={1.1} />
          <Nana x={84} y={290} s={0.48} arm="up" mood="joy" look={2} holding={
            <g transform="rotate(-20) scale(1.8)">
              <path d="M0 0 V-14" stroke="#2E7A3E" strokeWidth={2} />
              <ellipse cx={-5} cy={-18} rx={6} ry={4} fill="#4DBA74" />
              <ellipse cx={5} cy={-18} rx={6} ry={4} fill="#4DBA74" />
              <ellipse cx={0} cy={-25} rx={5} ry={6} fill="#5FD08A" />
            </g>
          } />
          <Anbessa x={334} y={292} s={0.38} mood="joy" look={-2} className="lali-hop" />
          <Air kind="night" seed={7} grass={false} />
        </>
      );
    // ኔ: "nay", over an empty stall. "Nothing here starts with ኔ," sighs Anbessa.
    case 6:
      return (
        <>
          <LetterStall id={id} i={4} color="#8A8AA0" mood="worried" />
          <SoundBubble x={232} y={74} g="ኔ" side="right" delay={2.4} color={LANTERN_INK} size={1.1} />
          {/* an empty table: just a cobweb in the corner */}
          <path d="M128 172 q10 8 22 2 M128 172 q6 12 4 22 M128 172 l20 18" stroke="#C9CFDF" strokeOpacity={0.6} strokeWidth={1} fill="none" />
          <Anbessa x={322} y={292} s={0.4} mood="sad" look={-2} />
          <PicBubble x={300} y={194} w={40} h={34} dx={-14} delay={1.4}>
            <Glyph g="?" y={9} size={24} fill="#E8413B" />
          </PicBubble>
          <Nana x={74} y={290} s={0.48} mood="happy" look={2} />
          <Air kind="night" seed={8} grass={false} />
        </>
      );
    // "Who wants a honey sweet?" "እኔ!" shouts Anbessa. ኔ, at the end of እኔ!
    case 7:
      return (
        <>
          <Street id={id} />
          <LightString y={14} sag={10} seed={4} />
          <Stall x={40} w={150} color="#E2467F">
            <g transform="translate(115 238)">
              <SweetJars />
            </g>
          </Stall>
          <Lantern i={4} x={330} y={36} s={1.05} mood="joy" />
          {/* the sweet-seller, holding one out */}
          <Place x={86} y={236} s={0.3} tap={{ reaction: "wiggle", sound: "giggle" }}>
            <GuguShape pose="point" mood="joy" />
          </Place>
          <g className="fidel-ne-jump">
            <Anbessa x={250} y={292} s={0.44} mood="joy" look={-2} />
          </g>
          {/* the shout: እኔ, with its ኔ glowing */}
          <g className="fidel-kit-say" style={vars({ "--delay": "0.9s", "--ox": "50%" })}>
            <rect x={196} y={112} width={104} height={56} rx={22} fill="#fff" stroke={LANTERN_INK} strokeWidth={3} />
            <path d="M240 168 l6 14 l8 -14Z" fill="#fff" stroke={LANTERN_INK} strokeWidth={2.4} strokeLinejoin="round" />
            <path d="M238 167 h18" stroke="#fff" strokeWidth={4} />
            <Glyph g="እ" x={224} y={154} size={36} fill={LANTERN_INK} />
            <g className="fidel-kit-glow" style={vars({ "--lo": "0.5", "--hi": "1", "--dur": "1s" })}>
              <circle cx={268} cy={140} r={20} fill="#F9D56E" />
            </g>
            <Glyph g="ኔ" x={268} y={154} size={36} fill={LANTERN_INK} />
          </g>
          <Sparkles seed={4} spots={[[300, 100], [192, 108], [320, 160]]} />
          <Air kind="night" seed={9} grass={false} />
        </>
      );
    // The honey stall under ን, "n", a hum: nnn. ን starts ንብ, bee! "That's me!" buzzes Lali.
    case 8:
      return (
        <>
          <LetterStall id={id} i={5} color="#F5A623">
            <HoneyPots />
            {/* the big pot in the middle, where Lali pops out */}
            <path d="M-20 0 Q-28 -30 -14 -38 H14 Q28 -30 20 0Z" fill="#E09A3A" />
            <path d="M-16 -38 H16" stroke="#8A5A26" strokeWidth={5} strokeLinecap="round" />
          </LetterStall>
          <SoundBubble x={232} y={74} g="ን" side="right" delay={2.4} color={LANTERN_INK} size={1.1} />
          <g className="fidel-ne-pop" style={vars({ "--delay": "1.2s" })}>
            <BeeHover x={206} y={184} s={1.4} />
          </g>
          <PicBubble x={186} y={168} w={64} h={38} dx={-42} delay={2.2}>
            <Glyph g="ንብ" x={0} y={10} size={26} fill={LANTERN_INK} />
          </PicBubble>
          <Anbessa x={334} y={292} s={0.38} mood="joy" look={-2} />
          <Nana x={74} y={290} s={0.48} mood="joy" look={2} />
          <Air kind="night" seed={10} grass={false} />
        </>
      );
    // ኖ, "no". A heap of white ኖራ, to make walls bright. "We'll paint the tukul!"
    case 9:
      return (
        <>
          <LetterStall id={id} i={6} color="#2E86C1">
            <Chalk />
          </LetterStall>
          <SoundBubble x={232} y={74} g="ኖ" side="right" delay={2.4} color={LANTERN_INK} size={1.1} />
          <Nana x={80} y={290} s={0.48} mood="joy" look={2} />
          <PicBubble x={104} y={176} w={58} h={52} dx={-6} delay={1.4}>
            <g transform="translate(0 22) scale(0.42)">
              <Tukul x={0} y={0} s={1} smoke={false} />
            </g>
            <Sparkles seed={1} spots={[[-18, -12], [18, -8]]} color="#FFD233" s={0.6} />
          </PicBubble>
          <Anbessa x={330} y={292} s={0.38} mood="happy" look={-2} />
          <Air kind="night" seed={11} grass={false} />
        </>
      );
    // Seven lanterns in a row, glowing like a song: ነ ኑ ኒ ና ኔ ን ኖ!
    case 10:
      return (
        <>
          <Street id={id} moon={false} />
          <path d="M-10 26 Q200 50 410 26" stroke={NIGHT_INK} strokeWidth={1.6} fill="none" />
          {NE.map((_, i) => {
            const x = 56 + i * 48;
            const y = 26 + 24 * 4 * ((x + 10) / 420) * (1 - (x + 10) / 420) * 2 * 0.5;
            return (
              <g key={i} className="fidel-kit-karaoke" style={vars({ "--delay": `${r1(0.8 + i * 0.5)}s`, "--dur": `${r1(7 * 0.5 + 2.4)}s` })}>
                <Lantern i={i} x={x} y={y} s={0.74} mood="joy" />
              </g>
            );
          })}
          <ChantRow letters={NE} color={LANTERN_INK} y={170} x0={74} x1={326} size={28} start={0.8} step={0.5} bg="#FFF6E0" />
          <Nana x={150} y={292} s={0.42} mood="joy" look={0} />
          <Anbessa x={240} y={294} s={0.4} mood="joy" look={-1} />
          <BeeHover x={330} y={250} s={1} flip />
          <Air kind="night" seed={12} grass={false} />
        </>
      );
    // Nana checks her list… one more thing, the most important! Something smells toasty.
    case 11:
      return (
        <>
          <Street id={id} />
          <LightString y={14} sag={10} seed={2} />
          {/* the toasty smell drifting in from the right */}
          <g fill="none" stroke="#FFE2A8" strokeWidth={3} strokeLinecap="round" opacity={0.85}>
            {[0, 1, 2].map((k) => (
              <path key={k} d={`M410 ${150 + k * 22} q-30 -14 -60 0 t-60 0 t-60 0`} className="fidel-kit-glow" style={vars({ "--delay": `${-k * 0.6}s`, "--lo": "0.2", "--hi": "0.9" })} />
            ))}
          </g>
          {/* the list */}
          <At x={154} y={136} s={1} reaction="wiggle" sound="pop">
            <g className="lali-sway" style={vars({ "--dur": "3s" })}>
              <rect x={-30} y={-46} width={60} height={92} rx={4} fill="#FFFDF4" stroke="#C9B49A" strokeWidth={1.4} />
              {[
                ["ነ", "#2E9A8A"],
                ["ኑ", "#8A6A4A"],
                ["ና", "#3FB45A"],
                ["ኖ", "#9C98A6"],
              ].map(([g, c], k) => (
                <g key={g}>
                  <Glyph g={g} x={-16} y={-26 + k * 18} size={14} fill={LANTERN_INK} />
                  <path d={`M-6 ${-31 + k * 18} h14`} stroke={c} strokeWidth={5} strokeLinecap="round" />
                  <path d={`M14 ${-34 + k * 18} l3 3 l6 -7`} stroke="#3FB45A" strokeWidth={2} fill="none" strokeLinecap="round" />
                </g>
              ))}
              <Glyph g="?" x={0} y={42} size={20} fill="#E8413B" />
            </g>
          </At>
          <Nana x={96} y={292} s={0.5} arm="hold" mood="happy" look={2} />
          <Anbessa x={290} y={294} s={0.42} mood="wow" look={2} />
          <Air kind="night" seed={13} grass={false} />
        </>
      );
    // At the coffee stall, ቡ (from the bee family) hangs beside ና: ቡና! Coffee!
    case 12:
      return (
        <>
          <Street id={id} />
          <LightString y={10} sag={8} seed={5} />
          <Stall x={96} w={210} y={246} color="#8A4B2A">
            <g transform="translate(150 246)">
              <Jebena />
            </g>
            <g transform="translate(250 246)">
              <ellipse cx={0} cy={-4} rx={22} ry={5} fill="#3A3A4A" />
              <g fill="#6A3A1E">
                {[-10, -3, 4, 11, -6, 7].map((x, k) => (
                  <ellipse key={k} cx={x} cy={-8 - (k > 3 ? 3 : 0)} rx={3} ry={2.2} />
                ))}
              </g>
            </g>
          </Stall>
          <Lantern i={3} x={150} y={150} s={0.6} g="ቡ" paper="#FFC83D" mood="joy" delay={-0.2} />
          <Lantern i={3} x={250} y={150} s={0.6} mood="joy" delay={-0.6} />
          <WordCard x={200} y={84} parts={[{ g: "ቡ", color: "#7A3E00" }, { g: "ና", color: LANTERN_INK }]} size={56} delay={1.4}>
            <g transform="translate(0 6)">
              <path d="M-12 -8 H12 L9 10 H-9Z" fill="#fff" stroke="#8A4B2A" strokeWidth={2} />
              <ellipse cx={0} cy={-8} rx={12} ry={3} fill="#6A3A1E" />
            </g>
          </WordCard>
          <Nana x={52} y={292} s={0.44} mood="joy" look={2} />
          <Anbessa x={350} y={294} s={0.38} mood="joy" look={-2} />
          <Air kind="night" seed={14} grass={false} />
        </>
      );
    // At home, under the stars, Nana roasts the beans. Anbessa reads the bag: "ቡ… ና… ቡና!"
    default:
      return (
        <>
          <Sky id={id} from="#0E1440" mid="#26307A" to="#4A4F9E" />
          <Stars seed={11} n={30} bottom={170} />
          <Moon x={64} y={52} r={18} />
          <Depth z={-0.3}>
            <path d="M-10 214 Q120 196 240 210 T410 204 L410 240 L-10 240Z" fill="#24685C" />
          </Depth>
          <path d="M-10 238 Q200 226 410 240 L410 310 L-10 310Z" fill="#1E5A4E" />
          <Tukul x={300} y={236} s={1.05} glow />
          {/* the roasting pan over a little fire, smoke curling up */}
          <g transform="translate(160 262)">
            <ellipse cx={0} cy={0} rx={20} ry={5} fill="#FF7A3D" className="fidel-kit-glow" style={vars({ "--lo": "0.6", "--hi": "1", "--dur": "1s" })} />
            <ellipse cx={0} cy={-6} rx={28} ry={6} fill="#3A3A4A" />
            <g fill="#4A2A14">
              {[-12, -4, 4, 12, -8, 8].map((x, k) => (
                <ellipse key={k} cx={x} cy={-9 - (k > 3 ? 3 : 0)} rx={3} ry={2} />
              ))}
            </g>
            <g fill="#fff">
              {[0, 1, 2, 3].map((k) => (
                <circle key={k} cx={-4 + k * 3} cy={-18} r={6} className="fidel-ne-curl" style={vars({ "--delay": `${-k * 0.7}s`, "--dx": `${k % 2 ? 12 : -6}px` })} />
              ))}
            </g>
          </g>
          <Nana x={92} y={292} s={0.44} arm="hold" mood="happy" look={2} />
          <Anbessa x={232} y={296} s={0.4} mood="joy" look={-1} />
          {/* the bag he reads, all by himself */}
          <At x={262} y={258} s={1} reaction="grow" sound="chime">
            <path d="M-20 0 L-22 -40 Q0 -46 22 -40 L20 0Z" fill="#C98A5A" />
            <path d="M-22 -40 Q0 -34 22 -40" stroke="#8A5A26" strokeWidth={2} fill="none" />
            <Glyph g="ቡና" x={0} y={-12} size={18} fill="#3A1A0A" />
          </At>
          <BeeHover x={196} y={176} s={0.9} />
          <Air kind="night" seed={15} grass={false} />
        </>
      );
  }
}
