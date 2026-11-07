"use client";

import "./ashenda-song.css";

import { useId, type ReactNode } from "react";

import { BeeShape, GuguShape, type GuguPose, type Mood } from "../../characters";
import { Air, BeeFlight, BeeHover, Birds, Depth, DriftCloud, Fireflies, LightRays, Moon, Mountains, Place, rand, ShootingStar, Sky, Stars, Sun, vars } from "../scenery";
import { Tappable } from "../tappable";
import { GeladaGirl, Glow, INK, Notes, Person, r1, SKINS, TAP_TSEHAY, Twinkles, WHITE, type TsehayLook } from "./festival-kit";

/*
  "Ashenda's Song": one living picture per page (13 pages).
  A northern village of flat-roofed stone houses among tall August grass. Tsehay arrives in
  her everyday bow and pinafore; from page 2 on she wears her festival clothes like her
  cousins: braids with beads, a white dress with a blue border and the long ashenda grass
  round her waist. Her voice is drawn as music notes: none at all (a dotted, empty bubble),
  then tiny wobbly notes, then big bright ones, until hers are the biggest in the evening dance.
  Keyframes are ashenda-song-* in ./ashenda-song.css (transforms and opacity only). With
  reduced motion each page holds its finished pose.
*/

const TSEHAY: TsehayLook = { dress: WHITE, tibeb: "#2F6FC0", braids: true, grass: true, bow: "#FFD233" };
const COUSINS: TsehayLook[] = [
  { dress: WHITE, tibeb: "#D8452A", braids: true, grass: true, bow: "#FF6B9A" },
  { dress: WHITE, tibeb: "#8A3FB0", braids: true, grass: true, bow: "#FF8A2A" },
  { dress: WHITE, tibeb: "#2F9A4E", braids: true, grass: true, bow: "#E2463F" },
];
const TAP_COUSIN = { reaction: "bounce", sound: "giggle" } as const;
const BREAD = "#D89A4A";

/* ---------- the village ---------- */

type Time = "day" | "gold" | "sunset" | "night";

const SKY: Record<Time, [string, string, string]> = {
  day: ["#76C4F6", "#B8E2FF", "#F2FAFF"],
  gold: ["#7EBCEE", "#FFDCA8", "#FFF0D4"],
  sunset: ["#4E4A9E", "#E8786A", "#FFC27A"],
  night: ["#0E1440", "#23306E", "#3A4A8E"],
};

function Land({ id, time = "day", sun, rainbow = false }: { id: string; time?: Time; sun?: [number, number] | null; rainbow?: boolean }) {
  const [a, b, c] = SKY[time];
  const dark = time === "night";
  const [sx, sy] = sun ?? (time === "gold" ? [320, 100] : [336, 58]);
  return (
    <>
      <Sky id={id} from={a} mid={b} to={c} />
      {(time === "day" || time === "gold") && sun !== null && (
        <>
          <LightRays x={sx} y={sy} />
          <Sun x={sx} y={sy} r={20} />
        </>
      )}
      {time === "sunset" && (
        <Depth z={-0.8}>
          <Glow x={300} y={160} r={120} color="#FFC27A" opacity={0.8} dur={5} />
          <circle cx={300} cy={160} r={24} fill="#FFB25A" />
        </Depth>
      )}
      {dark && (
        <>
          <Stars seed={8} n={34} top={6} bottom={150} />
          <ShootingStar seed={9} />
        </>
      )}
      {!dark && (
        <>
          <DriftCloud y={56} s={0.7} dur={70} phase={0.15} />
          <DriftCloud y={36} s={0.5} dur={56} phase={0.6} />
        </>
      )}
      {rainbow && <Rainbow />}
      <Mountains far={dark ? "#3A4488" : time === "sunset" ? "#9A6A9E" : "#B7C6E6"} mid={dark ? "#2A3370" : time === "sunset" ? "#7A5A8E" : "#8EA8D4"} />
      <Depth z={-0.25}>
        <path d="M-10 188 Q100 164 210 174 T410 170 L410 310 L-10 310Z" fill={dark ? "#24504A" : time === "sunset" ? "#6E8E50" : "#7CC060"} />
      </Depth>
      <path d="M-10 226 Q120 212 230 220 T410 216 L410 310 L-10 310Z" fill={dark ? "#1E443E" : time === "sunset" ? "#5E7E44" : "#5EAE4E"} />
    </>
  );
}

function Rainbow() {
  const bands = ["#FF7A7A", "#FFB35A", "#FFE066", "#7ED67E", "#6EC3F4", "#9C8CF0"];
  return (
    <Depth z={-0.75}>
      <g className="lali-fade-in" style={vars({ "--delay": "0.6s", "--dur": "2s" })}>
        <Tappable reaction="grow" sound="chime">
          <g fill="none" strokeWidth={5} opacity={0.55}>
            {bands.map((b, i) => (
              <path key={b} d={`M${60 + i * 5} 196 A${150 - i * 5} ${130 - i * 5} 0 0 1 ${360 - i * 5} 196`} stroke={b} />
            ))}
          </g>
        </Tappable>
      </g>
    </Depth>
  );
}

/** Tall August grass along the front, swaying. */
function TallGrass({ y = 300, seed = 3, n = 16, color = "#3E9A3A", x0 = 0, x1 = 400 }: { y?: number; seed?: number; n?: number; color?: string; x0?: number; x1?: number }) {
  const rnd = rand(seed * 7919 + 104729);
  return (
    <g fill={color}>
      {Array.from({ length: n }, (_, i) => {
        const x = r1(x0 + rnd() * (x1 - x0));
        const h = r1(26 + rnd() * 30);
        return (
          <path
            key={i}
            d={`M${x - 3} ${y} Q${x - 4} ${y - h * 0.6} ${x + (rnd() - 0.5) * 10} ${y - h} Q${x + 1} ${y - h * 0.5} ${x + 3} ${y}Z`}
            className="lali-sway"
            style={vars({ "--delay": `${r1(-rnd() * 3)}s`, "--dur": `${r1(2.4 + rnd() * 1.6)}s` })}
          />
        );
      })}
    </g>
  );
}

/**
 * A flat-roofed stone house of the northern highlands, with wooden beam-ends under the roof
 * and a painted wooden door. Base at (x, y). `open` swings the door open when the page opens.
 */
function StoneHouse({ x, y, s = 1, door = "#2F6FC0", open = false, lit = false }: { x: number; y: number; s?: number; door?: string; open?: boolean; lit?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <ellipse cx={0} cy={2} rx={62} ry={6} fill="#000" opacity={0.12} />
        <rect x={-56} y={-70} width={112} height={70} fill="#B89A7A" />
        <g fill="#A6876A">
          {[
            [-46, -60, 18],
            [-20, -52, 14],
            [20, -62, 16],
            [38, -40, 14],
            [-42, -30, 16],
            [-24, -16, 12],
            [30, -18, 16],
          ].map(([sx, sy, w], i) => (
            <rect key={i} x={sx} y={sy} width={w} height={8} rx={3} />
          ))}
        </g>
        <rect x={-62} y={-78} width={124} height={10} rx={2} fill="#8A6A4A" />
        <g fill="#5A3A26">
          {[-52, -36, -20, -4, 12, 28, 44].map((bx) => (
            <rect key={bx} x={bx} y={-70} width={7} height={6} rx={1} />
          ))}
        </g>
        <rect x={34} y={-50} width={14} height={14} rx={2} fill={lit ? "#FFE27A" : "#3A2A20"} />
        {/* the doorway, with its painted door */}
        <rect x={-15} y={-46} width={30} height={46} fill={lit ? "#FFD27A" : "#2A1A12"} />
        <g className={open ? "ashenda-song-door" : undefined}>
          <rect x={-15} y={-46} width={30} height={46} fill={door} />
          <path d="M-15 -30 H15 M-15 -14 H15" stroke="#fff" strokeOpacity={0.3} strokeWidth={2} />
          <circle cx={9} cy={-22} r={2} fill="#FFD233" />
        </g>
        <rect x={-18} y={-50} width={36} height={4} fill="#7A5236" />
      </Tappable>
    </g>
  );
}

/* ---------- the cast ---------- */

function Tsehay({ mood = "happy", pose = "sit", look = TSEHAY, blush = false, drum = false }: { mood?: Mood; pose?: GuguPose; look?: TsehayLook; blush?: boolean; drum?: boolean }) {
  return (
    <g>
      <GeladaGirl mood={mood} pose={pose} look={{ ...look, drum }} />
      {blush && (
        <g className="lali-tilt" style={vars({ "--tilt": "7deg", "--dur": "5.5s" })}>
          <rect x={30} y={10} width={140} height={128} fill="none" />
          <ellipse cx={72} cy={110} rx={10} ry={6} fill="#FF5A6A" opacity={0.55} />
          <ellipse cx={128} cy={110} rx={10} ry={6} fill="#FF5A6A" opacity={0.55} />
        </g>
      )}
    </g>
  );
}

function Cousin({ n, mood = "joy", pose = "sit" }: { n: number; mood?: Mood; pose?: GuguPose }) {
  return <GeladaGirl mood={mood} pose={pose} look={COUSINS[n % 3]} />;
}

/** Auntie: a grown-up gelada in a white netela over her head and shoulders. Box 200 × 240. */
function Auntie({ mood = "happy", braiding = false }: { mood?: Mood; braiding?: boolean }) {
  return (
    <g>
      <GuguShape pose={braiding ? "point" : "sit"} mood={mood} />
      <g className="lali-tilt" style={vars({ "--tilt": "7deg", "--dur": "5.5s" })}>
        <rect x={30} y={10} width={140} height={128} fill="none" />
        <path d="M34 112 Q22 16 100 10 Q178 16 166 112 Q160 50 100 44 Q40 50 34 112Z" fill={WHITE} />
        <path d="M34 112 Q28 50 62 26" stroke="#2E9A8A" strokeWidth={5} fill="none" strokeLinecap="round" />
      </g>
      <path d="M46 160 Q100 132 154 160 Q160 184 146 200 Q100 186 54 200 Q40 184 46 160Z" fill={WHITE} className="lali-breathe" />
      <path d="M54 198 Q100 184 146 198" stroke="#2E9A8A" strokeWidth={5} fill="none" />
    </g>
  );
}

/**
 * The old grandmother at the last house, sitting on her stool, feet at (0, 0): a white
 * netela over her head, kind eyes (or shut, listening), one hand beckoning or giving bread.
 */
function OldWoman({ eyes = "open", hand = "beckon" }: { eyes?: "open" | "shut"; hand?: "beckon" | "bread" | "clap" | "rest" }) {
  const sk = SKINS[3];
  const KEMIS = "#EFE6D2";
  return (
    <Tappable reaction="bounce" sound="chime">
      <ellipse cx={0} cy={1} rx={28} ry={3.6} fill="#000" opacity={0.15} />
      <rect x={-17} y={-21} width={34} height={6} rx={2} fill="#7A5236" />
      <path d="M-13 -15 L-15 0 M13 -15 L15 0" stroke="#7A5236" strokeWidth={4} strokeLinecap="round" />
      <g className="lali-breathe">
        {/* her long kemis falling from her lap to the ground, with its woven border */}
        <path d="M-19 -22 Q-24 -10 -26 -2 L26 -2 Q24 -10 19 -22Z" fill={KEMIS} />
        <path d="M-25.4 -5 H25.4" stroke="#2E9A8A" strokeWidth={3.4} />
        <path d="M-25.4 -5 H25.4" stroke="#F5B21E" strokeWidth={1.2} strokeDasharray="2 2" />
        <ellipse cx={-10} cy={-1} rx={5.4} ry={2.6} fill="#3A2418" />
        <ellipse cx={10} cy={-1} rx={5.4} ry={2.6} fill="#3A2418" />
        <path d="M-15 -20 Q-17 -44 -10 -55 L10 -55 Q17 -44 15 -20Z" fill={KEMIS} />
        <path d="M0 -50 V-20" stroke="#2E9A8A" strokeWidth={2.4} />
        {/* the white netela round her shoulders */}
        <path d="M-18 -34 Q-22 -56 -12 -62 Q0 -66 12 -62 Q22 -56 18 -34 Q0 -27 -18 -34Z" fill={WHITE} />
        <path d="M-18 -34 Q0 -27 18 -34" stroke="#2E9A8A" strokeWidth={2.6} fill="none" />
        <path d="M-18 -34 Q0 -27 18 -34" stroke="#F5B21E" strokeWidth={1} strokeDasharray="2 2" fill="none" />
      </g>
      {hand === "beckon" && (
        <g>
          <ellipse cx={-5} cy={-24} rx={4} ry={3.4} fill={sk} />
          <g className="ashenda-song-beckon">
            <path d="M14 -46 Q28 -46 30 -62" stroke={WHITE} strokeWidth={7} fill="none" strokeLinecap="round" />
            <circle cx={30} cy={-65} r={4} fill={sk} />
          </g>
        </g>
      )}
      {hand === "bread" && (
        <g className="ashenda-song-give">
          <path d="M14 -44 Q30 -40 40 -42" stroke={WHITE} strokeWidth={7} fill="none" strokeLinecap="round" />
          <ellipse cx={46} cy={-44} rx={11} ry={6} fill={BREAD} />
          <path d="M40 -46 Q46 -49 52 -46" stroke="#B87A2A" strokeWidth={1.4} fill="none" />
          <circle cx={42} cy={-41} r={3.6} fill={sk} />
        </g>
      )}
      {hand === "clap" && (
        <g>
          <path d="M-12 -44 Q-8 -34 -2 -36 M12 -44 Q8 -34 2 -36" stroke={WHITE} strokeWidth={6} fill="none" strokeLinecap="round" />
          <g className="festival-kit-clap">
            <ellipse cx={-2.6} cy={-37} rx={3} ry={3.6} fill={sk} />
            <ellipse cx={2.6} cy={-37} rx={3} ry={3.6} fill={sk} />
          </g>
        </g>
      )}
      {hand === "rest" && (
        <g>
          <ellipse cx={-5} cy={-24} rx={4} ry={3.4} fill={sk} />
          <ellipse cx={5} cy={-24} rx={4} ry={3.4} fill={sk} />
        </g>
      )}
      <g className="festival-kit-nod">
        <ellipse cx={0} cy={-71} rx={11} ry={12} fill={sk} />
        <path d="M-14 -60 Q-17 -88 0 -88 Q17 -88 14 -60 Q12 -79 0 -80 Q-12 -79 -14 -60Z" fill={WHITE} />
        <path d="M-14 -60 Q-16 -76 -9 -84" stroke="#2E9A8A" strokeWidth={2.2} fill="none" />
        {eyes === "open" ? (
          <g className="lali-blink">
            <circle cx={-4} cy={-72} r={1.5} fill={INK} />
            <circle cx={4} cy={-72} r={1.5} fill={INK} />
          </g>
        ) : (
          <path d="M-6.6 -72 Q-4 -69.4 -1.4 -72 M1.4 -72 Q4 -69.4 6.6 -72" stroke={INK} strokeWidth={1.4} fill="none" strokeLinecap="round" />
        )}
        <path d="M-6.6 -76 Q-4 -77.6 -1.6 -76 M1.6 -76 Q4 -77.6 6.6 -76" stroke="#E8E2D6" strokeWidth={1.3} fill="none" strokeLinecap="round" />
        <path d="M-4 -65.6 Q0 -62.4 4 -65.6" stroke={INK} strokeWidth={1.3} fill="none" strokeLinecap="round" />
        <path d="M-8.6 -69 q2 1 2.2 3.4 M8.6 -69 q-2 1 -2.2 3.4" stroke="#5A3420" strokeWidth={0.8} fill="none" />
        <circle cx={-7} cy={-67} r={2} fill="#E2463F" opacity={0.25} />
        <circle cx={7} cy={-67} r={2} fill="#E2463F" opacity={0.25} />
      </g>
    </Tappable>
  );
}

/** A round loaf of festival bread. Centre at (0, 0). */
function Bread({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <ellipse cx={0} cy={2} rx={13} ry={6} fill="#B87A2A" />
      <ellipse cx={0} cy={0} rx={12} ry={6} fill={BREAD} />
      <path d="M-6 -1 Q0 -4 6 -1 M-8 2 Q0 -1 8 2" stroke="#B87A2A" strokeWidth={1.2} fill="none" />
    </g>
  );
}

/** An empty dotted bubble: the song that would not come out. */
function SilentBubble({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": "1.4s" })}>
        <g className="ashenda-song-shrink">
          <ellipse cx={0} cy={0} rx={24} ry={16} fill="#fff" fillOpacity={0.4} stroke="#fff" strokeWidth={2.4} strokeDasharray="3 5" strokeLinecap="round" />
          <g fill="#fff">
            {[-8, 0, 8].map((dx, i) => (
              <circle key={dx} cx={dx} cy={0} r={2.2} className="lali-twinkle" style={vars({ "--delay": `${-i * 0.4}s`, "--dur": "1.6s" })} />
            ))}
          </g>
        </g>
      </g>
    </g>
  );
}

/** Sound of the drum: little arcs that pulse out on the beat. */
function Beat({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke="#fff" strokeWidth={2.4} fill="none" strokeLinecap="round">
      <g className="ashenda-song-beat" style={vars({ "--delay": `${delay}s` })}>
        <path d="M-22 -6 q-6 6 0 12 M22 -6 q6 6 0 12" />
        <path d="M-30 -10 q-10 10 0 20 M30 -10 q10 10 0 20" />
      </g>
    </g>
  );
}

function Scene({ children }: { children: ReactNode }) {
  return <g>{children}</g>;
}

/* ---------- the pages ---------- */

export default function AshendaSong({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // In August, when the rains made the grass tall, shy Tsehay went north to visit her cousins. "Ashenda is coming!"
    case 0:
      return (
        <Scene>
          <Land id={id} time="day" rainbow />
          <Birds y={80} dur={20} phase={0.5} />
          <Depth z={-0.2}>
            <StoneHouse x={300} y={204} s={0.6} />
            <StoneHouse x={370} y={200} s={0.48} door="#2F9A4E" />
          </Depth>
          <Place x={90} y={290} s={0.42} tap={TAP_TSEHAY}>
            <g className="ashenda-song-shy">
              <GeladaGirl mood="worried" />
            </g>
          </Place>
          <g transform="translate(138 286)">
            <Tappable reaction="wiggle" sound="pop">
              <path d="M-14 0 L-12 -22 L12 -22 L14 0Z" fill="#C0283A" />
              <path d="M-6 -22 Q0 -32 6 -22" stroke="#7A1A2A" strokeWidth={3} fill="none" />
            </Tappable>
          </g>
          {[0, 1, 2].map((n) => (
            <Place key={n} x={214 + n * 54} y={290 - (n % 2) * 6} s={0.36} from={[330 + n * 50, 250]} dur={1.8} delay={0.3 + n * 0.25} tap={TAP_COUSIN}>
              <g className="ashenda-song-hop" style={vars({ "--delay": `${-n * 0.2}s` })}>
                <GeladaGirl mood="joy" pose={n === 1 ? "wave" : "hop"} look={{ dress: COUSINS[n].tibeb, tibeb: "#fff", bow: COUSINS[n].bow }} />
              </g>
            </Place>
          ))}
          <TallGrass seed={2} n={14} />
          <BeeHover x={150} y={140} s={1} />
          <Air kind="day" seed={3} grass={false} />
        </Scene>
      );
    // In Tigray they call it Ashenda; elsewhere Ashendiye or Shadey. Auntie braided Tsehay's hair. She felt beautiful.
    case 1:
      return (
        <Scene>
          <Land id={id} time="day" sun={[60, 60]} />
          <StoneHouse x={320} y={232} s={0.95} door="#2F9A4E" />
          <Place x={128} y={276} s={0.6} tap={{ reaction: "grow", sound: "chime" }}>
            <g className="ashenda-song-braid">
              <Auntie mood="happy" braiding />
            </g>
          </Place>
          <Place x={214} y={296} s={0.46} tap={TAP_TSEHAY}>
            <g>
              <GeladaGirl mood="happy" look={{ braids: true }} />
              {/* a little hand mirror, and the braids shining as they are finished */}
              <g transform="translate(172 168)">
                <ellipse cx={0} cy={-26} rx={14} ry={18} fill="#BFE6FF" stroke="#C99A3A" strokeWidth={5} />
                <path d="M-5 -34 Q0 -38 5 -34" stroke="#fff" strokeWidth={3} fill="none" strokeLinecap="round" />
                <rect x={-3} y={-8} width={6} height={22} rx={3} fill="#C99A3A" />
              </g>
            </g>
          </Place>
          <g className="lali-pop-in" style={vars({ "--delay": "1.6s" })}>
            <Twinkles spots={[[190, 176], [236, 168], [214, 156]]} s={0.9} />
          </g>
          <BeeHover x={60} y={160} s={1} />
          <TallGrass seed={5} n={10} />
          <Air kind="day" seed={5} grass={false} />
        </Scene>
      );
    // The cousins tied the long ashenda grass round their waists, over their white dresses. Swish, swish!
    case 2:
      return (
        <Scene>
          <Land id={id} time="day" />
          <Depth z={-0.15}>
            <TallGrass y={232} seed={7} n={22} color="#4EA83E" />
          </Depth>
          {[0, 1, 2].map((n) => (
            <Place key={n} x={70 + n * 86} y={292 - (n % 2) * 4} s={0.42} tap={TAP_COUSIN}>
              <g className="ashenda-song-twirl" style={vars({ "--delay": `${-n * 0.3}s` })}>
                <Cousin n={n} pose={n === 1 ? "wave" : "sit"} />
              </g>
            </Place>
          ))}
          <Place x={330} y={292} s={0.42} tap={TAP_TSEHAY}>
            <g className="ashenda-song-twirl" style={vars({ "--delay": "-0.9s" })}>
              <Tsehay mood="joy" />
            </g>
          </Place>
          <g stroke="#fff" strokeWidth={2.6} fill="none" strokeLinecap="round" className="ashenda-song-swishes">
            <path d="M20 270 q8 -6 16 0 M112 270 q8 -6 16 0 M196 270 q8 -6 16 0 M282 270 q8 -6 16 0 M372 270 q8 -6 16 0" />
          </g>
          <BeeFlight path="M60 140 C120 100 280 100 340 140 C280 180 120 180 60 140Z" dur={6} s={0.9} rest={[200, 110]} trailColor="#FFFFFF" />
          <Air kind="day" seed={7} grass={false} />
        </Scene>
      );
    // They practised the song. The drum went tum-tum-ta! "Ashenda is here! Open the door!" loud and proud.
    case 3:
      return (
        <Scene>
          <Land id={id} time="day" sun={[60, 56]} />
          <StoneHouse x={330} y={226} s={0.8} />
          {[0, 1, 2].map((n) => (
            <Place key={n} x={60 + n * 70} y={290} s={0.4} tap={TAP_COUSIN}>
              <g className="ashenda-song-sing" style={vars({ "--delay": `${-n * 0.25}s` })}>
                <Cousin n={n} pose={n === 2 ? "wave" : "sit"} />
              </g>
            </Place>
          ))}
          <Notes x={60} y={170} color="#D8452A" n={3} s={1.2} />
          <Notes x={140} y={160} color="#8A3FB0" n={3} s={1.2} />
          <Notes x={210} y={170} color="#2F9A4E" n={3} s={1.2} />
          <Place x={300} y={294} s={0.44} tap={TAP_TSEHAY}>
            <Tsehay mood="happy" drum />
          </Place>
          <Beat x={300} y={262} />
          <TallGrass seed={9} n={10} x0={0} x1={120} />
          <Air kind="day" seed={9} grass={false} />
        </Scene>
      );
    // Tsehay opened her mouth... no sound came out. Her cheeks went hot. She could play the drum, but her voice was hiding.
    case 4:
      return (
        <Scene>
          <Land id={id} time="day" sun={[340, 56]} />
          <Depth z={-0.15}>
            {[0, 1, 2].map((n) => (
              <Place key={n} x={60 + n * 54} y={262} s={0.3} tap={TAP_COUSIN}>
                <Cousin n={n} mood="joy" />
              </Place>
            ))}
            <Notes x={60} y={170} color="#D8452A" n={2} />
            <Notes x={130} y={166} color="#2F9A4E" n={2} />
          </Depth>
          <Place x={250} y={298} s={0.62} tap={TAP_TSEHAY}>
            <g className="ashenda-song-hide">
              <Tsehay mood="worried" blush drum />
            </g>
          </Place>
          <SilentBubble x={318} y={130} />
          <Beat x={250} y={252} delay={0.3} />
          <TallGrass seed={11} n={8} x0={0} x1={160} />
          <Air kind="day" seed={11} grass={false} />
        </Scene>
      );
    // From house to house. At every door the girls sang and danced; people came out with bread and blessings. Tsehay only drummed.
    case 5:
      return (
        <Scene>
          <Land id={id} time="day" />
          <StoneHouse x={110} y={236} s={1.1} door="#C0283A" open />
          <Depth z={-0.2}>
            <StoneHouse x={300} y={196} s={0.6} />
            <StoneHouse x={372} y={198} s={0.5} door="#2F9A4E" />
          </Depth>
          <g transform="translate(110 236)">
            <g className="ashenda-song-come-out">
              <Tappable reaction="bounce" sound="chime">
                <Person kind="woman" skin={2} tibeb={4} pose="hold" item={<Bread s={0.9} />} />
              </Tappable>
            </g>
          </g>
          {[0, 1, 2].map((n) => (
            <Place key={n} x={180 + n * 52} y={290 - (n % 2) * 6} s={0.36} tap={TAP_COUSIN}>
              <g className="ashenda-song-dance" style={vars({ "--delay": `${-n * 0.35}s` })}>
                <Cousin n={n} pose={n === 1 ? "wave" : "hop"} />
              </g>
            </Place>
          ))}
          <Notes x={190} y={190} color="#D8452A" />
          <Notes x={250} y={186} color="#8A3FB0" />
          <Place x={346} y={294} s={0.38} tap={TAP_TSEHAY}>
            <Tsehay mood="happy" drum />
          </Place>
          <Beat x={346} y={268} />
          <Air kind="day" seed={13} />
        </Scene>
      );
    // Lali landed on the drum. "Buzz! You don't have to be loud. Just sing for one person. Just one."
    case 6:
      return (
        <Scene>
          <Land id={id} time="gold" />
          <Place x={200} y={300} s={0.74} tap={TAP_TSEHAY}>
            <Tsehay mood="wow" drum />
          </Place>
          {/* Lali comes in to land on the drum */}
          <g transform="translate(206 268)">
            <g className="ashenda-song-land">
              <Tappable reaction="loop" sound="buzz">
                <g transform="scale(1.5) translate(-20 -34)">
                  <BeeShape />
                </g>
              </Tappable>
            </g>
          </g>
          <g transform="translate(270 140)">
            <g className="lali-pop-in" style={vars({ "--delay": "2.2s" })}>
              <g className="lali-float" style={vars({ "--rise": "-4px" })}>
                <ellipse cx={0} cy={0} rx={26} ry={20} fill="#fff" stroke="#1B2A4E" strokeWidth={2} />
                <path d="M-14 14 L-22 28 L-4 18" fill="#fff" stroke="#1B2A4E" strokeWidth={2} strokeLinejoin="round" />
                <path d="M-13 15 L-4 18" stroke="#fff" strokeWidth={3} />
                <path d="M0 -4 c-4 -7 -14 -3 -9 4 l9 8 l9 -8 c5 -7 -5 -11 -9 -4z" fill="#FF6B7A" className="lali-pulse" style={vars({ "--dur": "1.6s" })} />
              </g>
            </g>
          </g>
          <TallGrass seed={13} n={10} x0={0} x1={110} />
          <TallGrass seed={14} n={10} x0={290} x1={400} />
          <Air kind="dusk" seed={15} grass={false} />
        </Scene>
      );
    // At the very last house, an old grandmother sat by her door. "My ears are old. Come close, little one, and sing for me."
    case 7:
      return (
        <Scene>
          <Land id={id} time="gold" />
          <StoneHouse x={320} y={238} s={1.2} door="#8A3FB0" />
          <g transform="translate(250 282) scale(1.3)">
            <OldWoman eyes="open" hand="beckon" />
          </g>
          <Place x={150} y={294} s={0.46} tap={TAP_TSEHAY}>
            <g className="ashenda-song-step">
              <Tsehay mood="worried" />
            </g>
          </Place>
          <Depth z={-0.1}>
            {[0, 1].map((n) => (
              <Place key={n} x={50 + n * 46} y={270} s={0.32} tap={TAP_COUSIN}>
                <Cousin n={n} mood="happy" />
              </Place>
            ))}
          </Depth>
          <BeeHover x={200} y={150} s={1} flip />
          <Air kind="dusk" seed={17} />
        </Scene>
      );
    // Tsehay stepped close. Her voice came out small and wobbly: "Ashenda is here..." The grandmother closed her eyes to listen.
    case 8:
      return (
        <Scene>
          <Land id={id} time="gold" />
          <StoneHouse x={326} y={238} s={1.2} door="#8A3FB0" />
          <g transform="translate(266 282) scale(1.3)">
            <OldWoman eyes="shut" hand="rest" />
          </g>
          <Place x={196} y={294} s={0.5} tap={TAP_TSEHAY}>
            <Tsehay mood="happy" />
          </Place>
          {/* tiny wobbly notes */}
          <g className="ashenda-song-wobble">
            <Notes x={214} y={184} color="#2F6FC0" n={3} s={0.6} spread={10} />
          </g>
          <Depth z={-0.1}>
            {[0, 1, 2].map((n) => (
              <Place key={n} x={46 + n * 40} y={272} s={0.3} tap={TAP_COUSIN}>
                <Cousin n={n} mood="wow" />
              </Place>
            ))}
          </Depth>
          <BeeHover x={130} y={150} s={0.9} />
          <Air kind="dusk" seed={19} />
        </Scene>
      );
    // She took a breath and sang a little louder: "Open the door!" Her cousins joined in, soft at first, then strong.
    case 9:
      return (
        <Scene>
          <Land id={id} time="gold" />
          <StoneHouse x={316} y={238} s={1.2} door="#8A3FB0" open lit />
          <g transform="translate(262 282) scale(1.3)">
            <OldWoman eyes="shut" hand="clap" />
          </g>
          <Place x={178} y={294} s={0.5} tap={TAP_TSEHAY}>
            <g className="ashenda-song-sing">
              <Tsehay mood="joy" />
            </g>
          </Place>
          <Notes x={214} y={180} color="#2F6FC0" n={3} s={1.2} spread={18} />
          {[0, 1, 2].map((n) => (
            <Place key={n} x={46 + n * 44} y={290 - (n % 2) * 4} s={0.36} tap={TAP_COUSIN}>
              <g className="ashenda-song-sing" style={vars({ "--delay": `${-n * 0.3}s` })}>
                <Cousin n={n} />
              </g>
            </Place>
          ))}
          <g className="lali-fade-in" style={vars({ "--delay": "1.4s" })}>
            <Notes x={60} y={190} color="#D8452A" n={2} s={0.9} />
            <Notes x={110} y={186} color="#2F9A4E" n={2} s={0.9} />
          </g>
          <BeeFlight path="M100 120 C150 80 250 80 300 120" dur={3} s={0.9} rest={[200, 96]} trail={false} />
          <Air kind="dusk" seed={21} grass={false} />
        </Scene>
      );
    // The old grandmother clapped, and gave Tsehay warm bread and a blessing. "Your voice is like a little bird in the morning."
    case 10:
      return (
        <Scene>
          <Land id={id} time="gold" />
          <StoneHouse x={316} y={238} s={1.2} door="#8A3FB0" lit />
          <g transform="translate(254 282) scale(1.3)">
            <OldWoman eyes="open" hand="bread" />
          </g>
          <Place x={162} y={294} s={0.5} tap={TAP_TSEHAY}>
            <g className="ashenda-song-glow-up">
              <Tsehay mood="joy" pose="wave" />
            </g>
          </Place>
          {/* a little morning bird, singing */}
          <g transform="translate(96 160)">
            <g className="ashenda-song-bird">
              <Tappable reaction="bounce" sound="chime">
                <ellipse cx={0} cy={0} rx={10} ry={7} fill="#FFD233" />
                <circle cx={8} cy={-5} r={5} fill="#FFD233" />
                <path d="M12 -5 l5 1 l-5 2Z" fill="#F08A2A" />
                <circle cx={9} cy={-6} r={1.2} fill={INK} />
                <path d="M-4 -2 Q-12 -10 -6 -2Z" fill="#F0B020" className="ashenda-song-flap" />
              </Tappable>
            </g>
            <Notes x={18} y={-14} color="#F08A2A" n={2} s={0.7} />
          </g>
          <g transform="translate(212 150)">
            <g className="lali-pop-in" style={vars({ "--delay": "1.6s" })}>
              <path d="M0 0 c-5 -8 -16 -3 -10 5 l10 9 l10 -9 c6 -8 -5 -13 -10 -5z" fill="#FF6B7A" className="lali-float" />
            </g>
          </g>
          <BeeHover x={52} y={110} s={1} />
          <Air kind="dusk" seed={23} />
        </Scene>
      );
    // That evening, the girls danced in a big circle, grass skirts swishing, drums booming. Tsehay sang the loudest of all!
    case 11:
      return (
        <Scene>
          <Land id={id} time="sunset" />
          <Depth z={-0.2}>
            <StoneHouse x={60} y={196} s={0.6} lit />
            <StoneHouse x={350} y={198} s={0.55} lit door="#2F9A4E" />
          </Depth>
          {/* the far side of the circle */}
          <Depth z={-0.1}>
            {[0, 1, 2, 0].map((n, i) => (
              <Place key={i} x={110 + i * 60} y={244} s={0.3} tap={TAP_COUSIN}>
                <g className="ashenda-song-dance" style={vars({ "--delay": `${-i * 0.3}s` })}>
                  <Cousin n={n + i} pose={i % 2 ? "wave" : "hop"} />
                </g>
              </Place>
            ))}
          </Depth>
          <Glow x={200} y={200} r={90} color="#FFE2A0" opacity={0.6} />
          <Place x={200} y={290} s={0.56} tap={TAP_TSEHAY}>
            <g className="ashenda-song-dance">
              <Tsehay mood="joy" pose="wave" />
            </g>
          </Place>
          <Notes x={220} y={170} color="#FFF2A0" n={3} s={1.5} spread={20} />
          {[0, 1].map((n) => (
            <Place key={n} x={n ? 320 : 80} y={292} s={0.42} flip={n === 1} tap={TAP_COUSIN}>
              <g className="ashenda-song-dance" style={vars({ "--delay": `${-0.2 - n * 0.4}s` })}>
                <GeladaGirl mood="joy" pose="hop" look={{ ...COUSINS[n + 1], drum: true }} />
              </g>
            </Place>
          ))}
          <Beat x={80} y={262} />
          <Beat x={320} y={262} delay={0.45} />
          <Air kind="dusk" seed={25} />
        </Scene>
      );
    // At bedtime, Tsehay hung her grass skirt by the window. "I found my voice," she whispered to Lali. "It was there all along."
    default:
      return (
        <Scene>
          <rect width={400} height={300} fill="#5A4A6E" />
          <path d="M-10 0 H410 V214 Q200 230 -10 214Z" fill="#6E5A80" />
          {/* the window, the night sky, the moon */}
          <Depth z={-0.3}>
            <g transform="translate(110 96)">
              <rect x={-56} y={-50} width={112} height={92} rx={8} fill="#1A2458" />
              <Moon x={20} y={-16} r={16} sleepy />
              <g fill="#FFF6D8">
                {[
                  [-34, -30],
                  [-14, 10],
                  [-40, 20],
                  [40, 22],
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r={1.6} className="lali-twinkle" style={vars({ "--delay": `${-i * 0.6}s` })} />
                ))}
              </g>
              <rect x={-56} y={-50} width={112} height={92} rx={8} fill="none" stroke="#8A6A4A" strokeWidth={7} />
              <path d="M0 -50 V42" stroke="#8A6A4A" strokeWidth={4} />
            </g>
          </Depth>
          <Glow x={110} y={96} r={110} color="#9AB0FF" opacity={0.35} dur={6} />
          {/* the grass skirt hanging on a peg beside the window */}
          <g transform="translate(206 70)">
            <circle cx={0} cy={0} r={4} fill="#8A6A4A" />
            <g className="ashenda-song-hang">
              <Tappable reaction="wiggle" sound="pop">
                <path d="M-24 10 Q0 4 24 10" stroke="#C99A3A" strokeWidth={5} fill="none" strokeLinecap="round" />
                <path d="M-22 10 q-3 30 -5 52 M-14 9 q-2 30 -3 54 M-6 8 q0 30 -1 55 M2 8 q1 30 2 55 M10 9 q2 30 4 54 M18 10 q3 28 6 52" stroke="#5FA83A" strokeWidth={4} strokeLinecap="round" fill="none" />
                <path d="M-18 10 q-2 28 -4 52 M6 8 q1 30 3 55" stroke="#8ACB4E" strokeWidth={2.2} strokeLinecap="round" fill="none" />
                <path d="M-24 10 L0 0 L24 10" stroke="#8A6A4A" strokeWidth={1.4} fill="none" />
              </Tappable>
            </g>
          </g>
          {/* the bed, Tsehay tucked in, Lali on the pillow */}
          <path d="M150 272 L150 196 Q150 184 162 184 L172 184 Q184 184 184 196 L184 272Z" fill="#8A5A3A" />
          <rect x={150} y={240} width={240} height={30} rx={6} fill="#8A5A3A" />
          <rect x={156} y={268} width={10} height={20} rx={3} fill="#6A4028" />
          <rect x={372} y={268} width={10} height={20} rx={3} fill="#6A4028" />
          <ellipse cx={216} cy={232} rx={36} ry={14} fill="#F4EEE2" />
          <Place x={236} y={268} s={0.48} tap={TAP_TSEHAY}>
            <g className="ashenda-song-sleepy">
              <Tsehay mood="happy" look={{ ...TSEHAY, grass: false }} />
            </g>
          </Place>
          <path d="M196 252 Q260 232 386 238 L388 270 L192 270Z" fill="#3E7FD0" />
          <path d="M196 252 Q260 232 386 238" stroke="#FFD233" strokeWidth={4} fill="none" />
          <g fill="#FFD233" opacity={0.8}>
            {[230, 270, 310, 350].map((x) => (
              <circle key={x} cx={x} cy={256} r={3} />
            ))}
          </g>
          <g transform="translate(200 214)">
            <g className="lali-float" style={vars({ "--rise": "-3px", "--dur": "2.4s" })}>
              <Tappable reaction="loop" sound="buzz">
                <g transform="scale(1.1) translate(-20 -24)">
                  <BeeShape />
                </g>
              </Tappable>
            </g>
          </g>
          <g className="ashenda-song-whisper">
            <Notes x={256} y={170} color="#FFE9A0" n={2} s={0.7} spread={10} />
          </g>
          <Fireflies seed={4} n={5} top={140} bottom={220} x0={160} x1={390} />
          <Air kind="night" seed={27} grass={false} />
        </Scene>
      );
  }
}
