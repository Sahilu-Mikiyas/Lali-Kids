"use client";

import "./new-baby-brother.css";

import { useId, type ReactNode } from "react";

import { CubShape, GuguShape, type GuguPose, type Mood } from "../../characters";
import { Glow } from "../glow";
import { Air, BeeHover, Birds, Depth, DriftCloud, Fireflies, LightRays, Mountains, Place, Sky, Sun, Tukul, vars } from "../scenery";
import { Tappable } from "../tappable";

/*
  "Tsehay's New Baby Brother": one living picture per page (13 pages).
  Most of the story happens inside the family's round tukul: the same warm mud wall, the round
  window (its sky tells the time of day), the cradle. Tsehay always has her cloth lamb nearby,
  so children can find it on every page. Baby Dawit is a tiny gelada in a white gabi bundle,
  sleeping, crying or wide-eyed. Keyframes are new-baby-brother-* in ./new-baby-brother.css
  (transforms and opacity only); with reduced motion every page rests in a pose that tells it
  (the baby crying, then looking; Tsehay singing with notes in the air).
*/

const TAP_CUB = { reaction: "bounce", sound: "giggle" } as const;
const TAP_GUGU = { reaction: "wiggle", sound: "boing" } as const;
const TAP_TSEHAY = { reaction: "wiggle", sound: "giggle" } as const;
const TAP_GRANDMA = { reaction: "grow", sound: "chime" } as const;
const TAP_MAMA = { reaction: "grow", sound: "chime" } as const;
const TAP_SHEEP = { reaction: "bounce", sound: "baa" } as const;
const TAP_BABY = { reaction: "wiggle", sound: "giggle" } as const;

const NETELA = "#FFFDF4";
const SHAWL = "#F4EEDC";
const G_HAND = "#5A3A2A";
const G_FACE = "#4A2E24";
const LID = "#E8CDB0";
const FONT = "var(--font-grandstander), sans-serif";

/* ---------- the family ---------- */

/** Anything drawn on a gelada's head moves with it: same tilt, same box as the head. */
function OnHead({ children }: { children: ReactNode }) {
  return (
    <g className="lali-tilt" style={vars({ "--tilt": "7deg", "--dur": "5.5s" })}>
      <rect x={30} y={10} width={140} height={128} fill="none" />
      {children}
    </g>
  );
}

/** Closed, sleepy gelada eyes over the open ones. */
function GeladaSleepEyes() {
  return (
    <g>
      <ellipse cx={86} cy={86} rx={9} ry={9} fill={LID} />
      <ellipse cx={114} cy={86} rx={9} ry={9} fill={LID} />
      <path d="M79 88 Q86 93 93 88 M107 88 Q114 93 121 88" stroke={G_FACE} strokeWidth={2.6} fill="none" strokeLinecap="round" />
    </g>
  );
}

/** The cloth lamb Tsehay carries everywhere, about 30 wide, centred on (0, 0). */
function Lamb({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <g fill="#FFFFFF" stroke="#E0D8CC" strokeWidth={1}>
        <circle cx={-6} cy={2} r={8} />
        <circle cx={4} cy={0} r={9} />
        <circle cx={-2} cy={-6} r={7} />
        <circle cx={8} cy={6} r={6} />
      </g>
      <ellipse cx={14} cy={-4} rx={6} ry={6.5} fill="#F2C9C0" />
      <ellipse cx={10} cy={-9} rx={4} ry={2} fill="#F2C9C0" transform="rotate(-30 10 -9)" />
      <circle cx={15.5} cy={-5} r={1.2} fill="#2A1A10" />
      <path d="M13 -1 q2 1.4 4 0" stroke="#B8665A" strokeWidth={1} fill="none" />
      <path d="M-4 -2 l3 3 M2 4 l3 -3" stroke="#E2463F" strokeWidth={1.2} strokeDasharray="1.5 1.5" />
    </g>
  );
}

/** Tsehay: a shy girl gelada with a sun-yellow bow and a blue pinafore, and her lamb. */
function Tsehay({ mood = "happy", pose = "sit", tear = false, lamb = false, sleepy = false, ears = false }: { mood?: Mood; pose?: GuguPose; tear?: boolean; lamb?: boolean; sleepy?: boolean; ears?: boolean }) {
  return (
    <g className={sleepy ? "new-baby-brother-still" : undefined}>
      <GuguShape mood={mood} pose={pose} />
      <g className="lali-breathe">
        <path d="M50 212 Q100 204 150 212 L158 234 Q100 240 42 234Z" fill="#4A7FD0" />
        <path d="M50 212 Q100 204 150 212" stroke="#2F5FA8" strokeWidth={4} fill="none" />
      </g>
      {lamb && (
        <g transform="translate(100 198)">
          <Lamb s={1.5} />
          <ellipse cx={-20} cy={6} rx={9} ry={7} fill={G_HAND} />
          <ellipse cx={22} cy={8} rx={9} ry={7} fill={G_HAND} />
        </g>
      )}
      {sleepy ? (
        <g>
          <GeladaSleepEyes />
          <path d="M100 30 L74 16 Q68 30 74 44Z M100 30 L126 16 Q132 30 126 44Z" fill="#FFD233" />
          <circle cx={100} cy={30} r={7} fill="#F5B21E" />
        </g>
      ) : (
        <OnHead>
          <path d="M100 30 L74 16 Q68 30 74 44Z M100 30 L126 16 Q132 30 126 44Z" fill="#FFD233" />
          <circle cx={100} cy={30} r={7} fill="#F5B21E" />
          {ears && (
            <g fill={G_HAND}>
              <ellipse cx={50} cy={88} rx={14} ry={17} />
              <ellipse cx={150} cy={88} rx={14} ry={17} />
            </g>
          )}
          {tear && (
            <g className="new-baby-brother-tear">
              <path d="M78 96 Q74 104 78 108 Q82 104 78 96Z" fill="#7FC8F8" />
            </g>
          )}
        </OnHead>
      )}
    </g>
  );
}

/**
 * Baby Dawit: a tiny gelada wrapped in a white gabi, about 46 wide, centred on (0, 0).
 * face: asleep, crying, awake (calm) or wide-eyed (looking right at you).
 */
type BabyFace = "sleep" | "cry" | "awake" | "wide";
function Baby({ face = "sleep", s = 1 }: { face?: BabyFace; s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <ellipse cx={4} cy={4} rx={22} ry={14} fill={NETELA} />
      <path d="M-8 12 Q6 -2 24 6 M0 16 Q12 6 22 12" stroke="#E6DCC8" strokeWidth={1.6} fill="none" />
      <path d="M-6 16 Q8 20 22 12" stroke="#2E9A8A" strokeWidth={2} fill="none" />
      <circle cx={-8} cy={-4} r={13} fill={NETELA} />
      <path d="M-20 -2 Q-18 -18 -6 -17" stroke="#E6DCC8" strokeWidth={1.4} fill="none" />
      {/* his face */}
      <path d="M-15 -11 Q-8 -17 -1 -11" fill="#D9A46A" />
      <ellipse cx={-8} cy={-3} rx={8.5} ry={9} fill={G_FACE} />
      <ellipse cx={-13} cy={2} rx={2.4} ry={1.4} fill="#E2463F" opacity={0.4} />
      <ellipse cx={-3} cy={2} rx={2.4} ry={1.4} fill="#E2463F" opacity={0.4} />
      {face === "sleep" && (
        <g>
          <path d="M-13 -5 q2 2 4 0 M-7 -5 q2 2 4 0" stroke={LID} strokeWidth={1.4} fill="none" strokeLinecap="round" />
          <ellipse cx={-8} cy={2} rx={1.4} ry={1} fill="#2A1A10" />
        </g>
      )}
      {face === "cry" && (
        <g>
          <path d="M-14 -6 l3 1.5 l-3 1.5 M-2 -6 l-3 1.5 l3 1.5" stroke={LID} strokeWidth={1.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <ellipse cx={-8} cy={2.4} rx={3} ry={2.6} fill="#8A2F1E" />
        </g>
      )}
      {(face === "awake" || face === "wide") && (
        <g>
          <ellipse cx={-11.5} cy={-4.4} rx={face === "wide" ? 3 : 2.4} ry={face === "wide" ? 3.2 : 2.4} fill="#FFF7E6" />
          <ellipse cx={-4.5} cy={-4.4} rx={face === "wide" ? 3 : 2.4} ry={face === "wide" ? 3.2 : 2.4} fill="#FFF7E6" />
          <g className="lali-blink">
            <circle cx={-11.2} cy={-4} r={1.8} fill="#1A0F0A" />
            <circle cx={-4.2} cy={-4} r={1.8} fill="#1A0F0A" />
            <circle cx={-10.6} cy={-4.8} r={0.6} fill="#fff" />
            <circle cx={-3.6} cy={-4.8} r={0.6} fill="#fff" />
          </g>
          {face === "wide" ? <ellipse cx={-8} cy={2.2} rx={1.6} ry={1.8} fill="#8A2F1E" /> : <path d="M-10 1.6 q2 1.6 4 0" stroke={LID} strokeWidth={1.2} fill="none" strokeLinecap="round" />}
        </g>
      )}
    </g>
  );
}

/** A crying baby's cry: lines bursting out and a big round "WAAH" shape. */
function Cry({ x, y, s = 1, delay = 0, stop }: { x: number; y: number; s?: number; delay?: number; stop?: number }) {
  const body = (
    <g>
      {[-40, -10, 20].map((a, i) => (
        <g key={a} transform={`rotate(${a})`}>
          <path d="M0 -14 L0 -24" stroke="#FF8C8C" strokeWidth={3} strokeLinecap="round" className="new-baby-brother-cry" style={vars({ "--delay": `${delay + i * 0.15}s` })} />
        </g>
      ))}
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {stop === undefined ? body : <g className="new-baby-brother-stop new-baby-brother-gone" style={vars({ "--delay": `${stop}s` })}>{body}</g>}
    </g>
  );
}

/** "WAAH!" drawn as a wobbling burst, the same in any language. */
function Wah({ x, y, s = 1, delay = 0 }: { x: number; y: number; s?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="new-baby-brother-wah" style={vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="wiggle" sound="boing">
          <path d="M0 -20 L6 -9 L19 -12 L11 -2 L20 8 L7 7 L2 19 L-3 8 L-17 11 L-9 0 L-18 -10 L-5 -8Z" fill="#FFE0E0" stroke="#E2463F" strokeWidth={2} strokeLinejoin="round" />
          <ellipse cx={0} cy={0} rx={5} ry={6} fill="#8A2F1E" />
        </Tappable>
      </g>
    </g>
  );
}

/** Mama: a gelada in a white habesha dress with a woven border and a red headscarf. */
function Mama({ belly = false, baby, mood = "happy", sleepy = false, hug = false }: { belly?: boolean; baby?: BabyFace; mood?: Mood; sleepy?: boolean; hug?: boolean }) {
  return (
    <g className={sleepy ? "new-baby-brother-still" : undefined}>
      <GuguShape mood={mood} />
      <g className="lali-breathe">
        <path d="M54 232 C48 206 58 194 72 192 Q100 214 128 192 C142 194 152 206 146 232Z" fill={NETELA} />
        <path d="M54 224 Q100 234 146 224" stroke="#2E9A8A" strokeWidth={5} fill="none" />
        <path d="M54 224 Q100 234 146 224" stroke="#F5B21E" strokeWidth={2} strokeDasharray="4 3" fill="none" />
        <path d="M100 210 L100 232" stroke="#2E9A8A" strokeWidth={6} />
        <path d="M100 210 L100 232" stroke="#F5B21E" strokeWidth={2} strokeDasharray="3 3" />
        {belly && (
          <g className="new-baby-brother-kick">
            <ellipse cx={100} cy={202} rx={42} ry={32} fill="#EFE6D2" />
            <ellipse cx={98} cy={199} rx={39} ry={29} fill={NETELA} />
            <ellipse cx={84} cy={188} rx={14} ry={9} fill="#fff" />
            <path d="M66 218 Q100 236 134 218" stroke="#E2D6BE" strokeWidth={3} fill="none" />
          </g>
        )}
        {/* sleeves over the arms */}
        <path d="M60 150 C50 170 52 196 66 206" stroke={NETELA} strokeWidth={15} fill="none" strokeLinecap="round" />
        <path d="M140 150 C150 170 148 196 134 206" stroke={NETELA} strokeWidth={15} fill="none" strokeLinecap="round" />
        {baby && (
          <g transform="translate(108 180)">
            <g className="new-baby-brother-sway">
              <Tappable {...TAP_BABY}>
                <Baby face={baby} s={2.3} />
              </Tappable>
            </g>
          </g>
        )}
        {hug ? (
          <g>
            <path d="M140 150 C164 166 170 190 150 206" stroke={NETELA} strokeWidth={15} fill="none" strokeLinecap="round" />
            <ellipse cx={150} cy={208} rx={10} ry={8} fill={G_HAND} />
          </g>
        ) : (
          <g>
            <ellipse cx={baby ? 72 : 70} cy={baby ? 202 : 208} rx={10} ry={8} fill={G_HAND} />
            <ellipse cx={baby ? 140 : 130} cy={baby ? 196 : 208} rx={10} ry={8} fill={G_HAND} />
          </g>
        )}
      </g>
      {sleepy ? (
        <g>
          <GeladaSleepEyes />
          <Scarf />
        </g>
      ) : (
        <OnHead>
          <Scarf />
        </OnHead>
      )}
    </g>
  );
}

function Scarf() {
  return (
    <g>
      <path d="M44 76 Q44 20 100 16 Q156 20 156 76 Q142 50 100 48 Q58 50 44 76Z" fill="#D9483B" />
      <g fill="#FFD233">
        <circle cx={70} cy={36} r={2.4} />
        <circle cx={100} cy={28} r={2.4} />
        <circle cx={130} cy={36} r={2.4} />
        <circle cx={84} cy={44} r={1.8} />
        <circle cx={116} cy={44} r={1.8} />
      </g>
      <path d="M150 58 q16 -2 18 12 q-10 -2 -16 4Z" fill="#B23A30" />
    </g>
  );
}

/** Papa: a gelada with a white gabi over his shoulders. */
function Papa({ mood = "happy", pose = "sit", sleepy = false }: { mood?: Mood; pose?: GuguPose; sleepy?: boolean }) {
  return (
    <g className={sleepy ? "new-baby-brother-still" : undefined}>
      <GuguShape mood={mood} pose={pose} />
      <g className="lali-breathe">
        <path d="M44 154 C50 126 74 116 100 116 C126 116 150 126 156 154 L150 166 C142 146 122 136 100 136 C78 136 60 146 54 168 L60 214 L44 212Z" fill="#FBF8F0" />
        <path d="M150 166 C142 146 122 136 100 136 C78 136 60 146 54 168" stroke="#2E9A8A" strokeWidth={3} fill="none" />
        <path d="M46 206 L60 208" stroke="#2E9A8A" strokeWidth={3} />
      </g>
      {sleepy && <GeladaSleepEyes />}
    </g>
  );
}

type Arm = "down" | "hold" | "raise" | "wrap";

/** Grandma in her netela. "wrap" opens the end of her netela round someone beside her. */
function Grandma({ arm = "down", mood = "happy" }: { arm?: Arm; mood?: Mood }) {
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
      <g className="lali-breathe">
        <path d="M66 140 Q100 128 134 140 L150 224 Q100 232 50 224Z" fill={NETELA} />
        <path d="M52 214 Q100 222 148 214" stroke="#2E9A8A" strokeWidth={6} fill="none" />
        <path d="M52 214 Q100 222 148 214" stroke="#F5B21E" strokeWidth={2.4} strokeDasharray="4 4" fill="none" />
        <path d="M60 146 Q100 168 142 144 L140 160 Q100 186 62 162Z" fill={SHAWL} />
        <path d="M62 162 Q100 186 140 160" stroke="#2E9A8A" strokeWidth={4} fill="none" />
        <path d="M64 152 Q54 180 64 200" stroke={SHAWL} strokeWidth={14} fill="none" strokeLinecap="round" />
        {arm === "down" && <path d="M136 152 Q146 180 136 200" stroke={SHAWL} strokeWidth={14} fill="none" strokeLinecap="round" />}
        {arm === "hold" && (
          <g>
            <path d="M136 152 Q156 176 168 192" stroke={SHAWL} strokeWidth={14} fill="none" strokeLinecap="round" />
            <circle cx={170} cy={196} r={8} fill="#FFC870" />
          </g>
        )}
        {arm === "raise" && (
          <g className="lali-wave" style={vars({ "--dur": "1.2s" })}>
            <path d="M136 152 Q160 140 168 112" stroke={SHAWL} strokeWidth={14} fill="none" strokeLinecap="round" />
            <circle cx={169} cy={106} r={8} fill="#FFC870" />
          </g>
        )}
        <g clipPath={`url(#${cid}-h)`} transform="translate(0 -6)">
          <CubShape pose="sit" granny mood={mood} />
        </g>
      </g>
    </g>
  );
}

/** Auntie Sheep, big and woolly, in her red headscarf, bringing a bowl of warm genfo. */
function AuntieSheep({ bowl = false }: { bowl?: boolean }) {
  return (
    <g>
      <ellipse cx={100} cy={232} rx={56} ry={7} fill="#000" opacity={0.13} />
      <rect x={76} y={196} width={14} height={34} rx={7} fill="#3A2E2A" />
      <rect x={110} y={196} width={14} height={34} rx={7} fill="#3A2E2A" />
      <g className="lali-breathe">
        <g fill="#FFFFFF">
          <circle cx={70} cy={176} r={30} />
          <circle cx={130} cy={176} r={30} />
          <circle cx={100} cy={196} r={32} />
          <circle cx={100} cy={160} r={34} />
          <circle cx={66} cy={146} r={22} />
          <circle cx={134} cy={146} r={22} />
        </g>
        <path d="M78 170 Q100 164 122 170 L126 214 Q100 222 74 214Z" fill="#F5B21E" opacity={0.9} />
        {bowl && (
          <g transform="translate(100 176)">
            <Genfo />
          </g>
        )}
      </g>
      <g className="lali-tilt" style={vars({ "--tilt": "-8deg", "--dur": "5s" })}>
        <g fill="#FFFFFF">
          <circle cx={72} cy={84} r={16} />
          <circle cx={128} cy={84} r={16} />
        </g>
        <ellipse cx={60} cy={104} rx={16} ry={8} fill="#3A2E2A" transform="rotate(-25 60 104)" />
        <ellipse cx={140} cy={104} rx={16} ry={8} fill="#3A2E2A" transform="rotate(25 140 104)" />
        <ellipse cx={100} cy={112} rx={30} ry={34} fill="#3A2E2A" />
        <path d="M66 98 Q70 64 100 62 Q130 64 134 98 Q100 84 66 98Z" fill="#D9483B" />
        <path d="M68 94 Q100 82 132 94" stroke="#F5B21E" strokeWidth={3} fill="none" strokeDasharray="5 4" />
        <g className="lali-blink">
          <circle cx={88} cy={108} r={5} fill="#fff" />
          <circle cx={112} cy={108} r={5} fill="#fff" />
          <circle cx={89} cy={109} r={2.6} fill="#1A0F0A" />
          <circle cx={113} cy={109} r={2.6} fill="#1A0F0A" />
        </g>
        <ellipse cx={100} cy={128} rx={8} ry={5} fill="#FF9AA8" opacity={0.8} />
        <path d="M92 136 Q100 142 108 136" stroke="#FFD0D6" strokeWidth={2.4} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
}

/** A bowl of genfo porridge with a well of butter, steaming. */
function Genfo() {
  return (
    <g>
      <g fill="#FFFFFF" opacity={0.8}>
        {[0, 1.1, 2.2].map((d, i) => (
          <circle key={d} cx={-6 + i * 6} cy={-18} r={4} className="lali-smoke" style={vars({ "--delay": `${-d}s`, "--dur": "3.2s" })} />
        ))}
      </g>
      <path d="M-24 -6 Q-22 14 0 16 Q22 14 24 -6Z" fill="#C98A3A" />
      <path d="M-20 0 Q0 6 20 0" stroke="#E2463F" strokeWidth={2} fill="none" />
      <ellipse cx={0} cy={-6} rx={24} ry={6} fill="#A8642A" />
      <ellipse cx={0} cy={-7} rx={20} ry={4.6} fill="#E8C47A" />
      <ellipse cx={0} cy={-7} rx={6} ry={1.8} fill="#F5A623" />
    </g>
  );
}

/** A wrapped present with a ribbon. */
function Gift({ x, y, s = 1, color = "#4A7FD0" }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="bounce" sound="pop">
        <rect x={-12} y={-20} width={24} height={20} rx={3} fill={color} />
        <rect x={-2} y={-20} width={4} height={20} fill="#FFD233" />
        <path d="M0 -20 q-10 -10 -8 -2 q2 4 8 2 q10 -10 8 -2 q-2 4 -8 2" fill="#FFD233" />
      </Tappable>
    </g>
  );
}

/** The wooden cradle on its rockers, with Dawit inside. */
function Cradle({ x, y, s = 1, face = "sleep", rock = false, children }: { x: number; y: number; s?: number; face?: BabyFace; rock?: boolean; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={46} ry={6} fill="#000" opacity={0.14} />
      <g className={rock ? "new-baby-brother-rock" : undefined}>
        <path d="M-46 -4 Q0 12 46 -4" stroke="#7A4A2E" strokeWidth={5} fill="none" strokeLinecap="round" />
        <path d="M-34 -2 L-30 -14 M34 -2 L30 -14" stroke="#7A4A2E" strokeWidth={5} strokeLinecap="round" />
        <path d="M-40 -14 Q-42 -46 -30 -50 L30 -50 Q42 -46 40 -14 Q0 -6 -40 -14Z" fill="#D9A04A" />
        <g stroke="#B57A2A" strokeWidth={2} fill="none">
          <path d="M-38 -24 Q0 -16 38 -24" />
          <path d="M-38 -34 Q0 -26 38 -34" />
          <path d="M-24 -48 L-22 -10 M-8 -48 L-8 -8 M8 -48 L8 -8 M24 -48 L22 -10" opacity={0.5} />
        </g>
        <path d="M-38 -44 Q0 -36 38 -44" stroke="#E2463F" strokeWidth={3} fill="none" />
        <g transform="translate(-2 -52)">
          <Tappable {...TAP_BABY}>
            <Baby face={face} s={1.3} />
          </Tappable>
        </g>
        <path d="M-30 -50 Q0 -42 30 -50 Q34 -40 0 -36 Q-34 -40 -30 -50Z" fill="#F2A0B8" />
        <path d="M-28 -46 Q0 -38 28 -46" stroke="#fff" strokeWidth={1.6} strokeDasharray="3 3" fill="none" />
        {children}
      </g>
    </g>
  );
}

/** Music notes rising from a singer, drifting over to whoever is listening. */
function Notes({ x, y, n = 4, nx = 30, color = "#FFE9A0", dur = 3.6 }: { x: number; y: number; n?: number; nx?: number; color?: string; dur?: number }) {
  return (
    <g transform={`translate(${x} ${y})`} fill={color}>
      {Array.from({ length: n }, (_, i) => (
        <g key={i} className="new-baby-brother-note" style={vars({ "--delay": `${-(i * dur) / n}s`, "--nx": `${nx + (i % 2) * 10}px`, "--nr": `${i % 2 ? -14 : 12}deg`, "--dur": `${dur}s` })}>
          <Tappable reaction="spin" sound="chime">
            {i % 2 ? (
              <g>
                <ellipse cx={0} cy={0} rx={4.2} ry={3.2} transform="rotate(-20)" />
                <ellipse cx={10} cy={-3} rx={4.2} ry={3.2} transform="rotate(-20 10 -3)" />
                <path d="M3.6 -1 V-16 L13.6 -19 V-4" stroke={color} strokeWidth={2} fill="none" />
              </g>
            ) : (
              <g>
                <ellipse cx={0} cy={0} rx={4.4} ry={3.4} transform="rotate(-20)" />
                <path d="M3.8 -1 V-16 Q10 -12 8 -6" stroke={color} strokeWidth={2} fill="none" />
              </g>
            )}
          </Tappable>
        </g>
      ))}
    </g>
  );
}

function Hearts({ spots }: { spots: [number, number, number][] }) {
  return (
    <g>
      {spots.map(([x, y, d], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <g className="lali-heart-up" style={vars({ "--delay": `${d}s`, "--dur": "3.4s" })}>
            <Tappable reaction="grow" sound="pop">
              <path d="M0 8 C-10 0 -8 -10 -2 -10 C0 -10 0 -8 0 -6 C0 -8 0 -10 2 -10 C8 -10 10 0 0 8Z" fill={i % 3 === 2 ? "#FF8FB1" : "#E2463F"} />
            </Tappable>
          </g>
        </g>
      ))}
    </g>
  );
}

function Zzz({ x, y, color = "#CFE0FF" }: { x: number; y: number; color?: string }) {
  return (
    <g fill={color} fontFamily={FONT} fontWeight={900}>
      {[0, 1.2, 2.4].map((d, i) => (
        <text key={d} x={x + i * 5} y={y - i * 5} fontSize={8 + i * 2.5} className="new-baby-brother-zzz" style={vars({ "--delay": `${-d}s` })}>
          z
        </text>
      ))}
    </g>
  );
}

/** A thought bubble with something small inside it. */
function Thought({ x, y, delay = 1.2, children }: { x: number; y: number; delay?: number; children: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="grow" sound="chime">
          <circle cx={-30} cy={34} r={3.5} fill="#fff" />
          <circle cx={-22} cy={26} r={5} fill="#fff" />
          <ellipse rx={34} ry={24} fill="#fff" />
          <ellipse rx={34} ry={24} fill="none" stroke="#E8D8C8" strokeWidth={2} />
          {children}
        </Tappable>
      </g>
    </g>
  );
}

/** A speech bubble holding a picture or a short sound, the same in either language. */
function Speech({ x, y, w = 44, h = 30, tail = "left", delay = 1, children }: { x: number; y: number; w?: number; h?: number; tail?: "left" | "right"; delay?: number; children: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="grow" sound="pop">
          <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill="#fff" stroke="#1B2A4E" strokeWidth={2} />
          <path d={tail === "left" ? `M${-w / 4} ${h / 2 - 1} l-8 11 l15 -11Z` : `M${w / 4} ${h / 2 - 1} l8 11 l-15 -11Z`} fill="#fff" stroke="#1B2A4E" strokeWidth={2} strokeLinejoin="round" />
          <rect x={-w / 2 + 2} y={h / 2 - 4} width={w - 4} height={3} fill="#fff" />
          {children}
        </Tappable>
      </g>
    </g>
  );
}

/** "Shh": a finger at the lips, in a bubble. */
function ShhIcon() {
  return (
    <g className="new-baby-brother-shh">
      <ellipse cx={-3} cy={2} rx={8} ry={4.6} fill="#E2463F" />
      <path d="M-10 2 Q-3 4 4 2" stroke="#8A2F1E" strokeWidth={1.4} fill="none" />
      <rect x={-6} y={-11} width={6} height={20} rx={3} fill={G_HAND} />
      <path d="M8 -5 q3 3 0 6 M12 -8 q5 6 0 12" stroke="#7FA6D8" strokeWidth={1.8} fill="none" strokeLinecap="round" />
    </g>
  );
}

/* ---------- places ---------- */

type Time = "morning" | "day" | "evening" | "night";

/** Inside the family's round tukul: mud wall, round window, wooden post, a shelf. */
function Home({ id, time = "day", win = [312, 92] }: { id: string; time?: Time; win?: [number, number] }) {
  const night = time === "night";
  const evening = time === "evening";
  const sky: [string, string] = night ? ["#0E1440", "#2A3480"] : evening ? ["#5A4A9E", "#F0A06A"] : time === "morning" ? ["#9FD4FF", "#FFE2B8"] : ["#7FCFFF", "#D8F2FF"];
  const [wx, wy] = win;
  return (
    <>
      <defs>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={night ? "#5A4048" : "#E8B884"} />
          <stop offset="1" stopColor={night ? "#4A3440" : "#D89A64"} />
        </linearGradient>
        <linearGradient id={`${id}-win`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sky[0]} />
          <stop offset="1" stopColor={sky[1]} />
        </linearGradient>
        <clipPath id={`${id}-wc`}>
          <circle cx={wx} cy={wy} r={34} />
        </clipPath>
      </defs>
      <rect width={400} height={300} fill={`url(#${id}-wall)`} />
      {/* the curve of the round wall, and its painted band */}
      <path d="M-10 60 Q200 30 410 60" stroke="#000" strokeOpacity={0.06} strokeWidth={30} fill="none" />
      <path d="M-10 196 Q200 182 410 196" stroke={night ? "#6A4A50" : "#C98A5A"} strokeWidth={10} fill="none" />
      <path d="M-10 196 Q200 182 410 196" stroke={night ? "#8A6A40" : "#F5D27A"} strokeWidth={2.4} strokeDasharray="6 5" fill="none" />
      {/* the round window */}
      <Depth z={-0.3}>
        <g>
          <circle cx={wx} cy={wy} r={38} fill={night ? "#3A2A30" : "#8A5A3A"} />
          <g clipPath={`url(#${id}-wc)`}>
            <rect x={wx - 40} y={wy - 40} width={80} height={80} fill={`url(#${id}-win)`} />
            {night && (
              <g fill="#FFF6D8">
                <circle cx={wx - 18} cy={wy - 14} r={1.2} className="lali-twinkle" />
                <circle cx={wx + 4} cy={wy - 22} r={1} className="lali-twinkle" style={vars({ "--delay": "-1s" })} />
                <circle cx={wx + 20} cy={wy + 2} r={1.2} className="lali-twinkle" style={vars({ "--delay": "-2s" })} />
                <circle cx={wx + 12} cy={wy - 8} r={8} fill="#F8EDC4" />
              </g>
            )}
            {(time === "day" || time === "morning") && <circle cx={wx + 14} cy={wy - 10} r={10} fill="#FFD54A" />}
            {evening && <circle cx={wx - 6} cy={wy + 16} r={12} fill="#FF9A4A" />}
            <path d={`M${wx - 40} ${wy + 40} L${wx - 40} ${wy + 18} Q${wx - 10} ${wy + 6} ${wx + 10} ${wy + 16} T${wx + 40} ${wy + 12} L${wx + 40} ${wy + 40}Z`} fill={night ? "#1E3A4A" : "#5CBF73"} />
          </g>
          <path d={`M${wx} ${wy - 34} V${wy + 34} M${wx - 34} ${wy} H${wx + 34}`} stroke={night ? "#3A2A30" : "#8A5A3A"} strokeWidth={4} />
        </g>
      </Depth>
      {(time === "day" || time === "morning") && <Glow x={wx - 40} y={wy + 80} r={130} color="#FFF3C0" strength={0.35} dur={6} />}
      {/* the wooden centre post and a shelf with a coffee pot and a basket */}
      <Depth z={-0.15}>
        <rect x={32} y={0} width={16} height={240} fill={night ? "#4A3030" : "#8A5A3A"} />
        <path d="M34 0 V240" stroke="#fff" strokeOpacity={0.12} strokeWidth={3} />
        <g transform="translate(160 120)">
          <rect x={-46} y={0} width={92} height={6} rx={2} fill={night ? "#5A3A30" : "#8A5A3A"} />
          <Tappable reaction="wiggle" sound="pop">
            <path d="M-30 0 Q-36 -14 -30 -22 L-22 -22 Q-16 -14 -22 0Z" fill="#2A1A14" />
            <path d="M-26 -22 L-25 -28 L-27 -28Z" fill="#2A1A14" />
            <path d="M-6 0 L-10 -18 Q4 -26 18 -18 L14 0Z" fill="#D9A04A" />
            <path d="M-9 -12 Q4 -16 17 -12" stroke="#E2463F" strokeWidth={2} fill="none" />
            <path d="M24 0 Q22 -14 30 -16 Q38 -14 36 0Z" fill="#C9302C" />
          </Tappable>
        </g>
      </Depth>
      <path d="M-10 236 Q200 222 410 236 L410 310 L-10 310Z" fill={night ? "#3A2A2E" : "#B87A4A"} />
      <ellipse cx={200} cy={268} rx={150} ry={24} fill={night ? "#4A3238" : "#C98A5A"} opacity={0.7} />
      <path d="M70 268 Q200 250 330 268" stroke={night ? "#5A3A40" : "#D9A06A"} strokeWidth={2} strokeDasharray="8 6" fill="none" opacity={0.7} />
    </>
  );
}

/** Outside: the yard, the tukul and the big fig tree. */
function Yard({ id, time = "day" }: { id: string; time?: Time }) {
  return (
    <>
      <Sky id={id} from={time === "morning" ? "#8FC8FF" : "#7FCFFF"} mid={time === "morning" ? "#FFD6B0" : "#B8E6FF"} to={time === "morning" ? "#FFF2DA" : "#F2FBFF"} />
      <LightRays x={time === "morning" ? 70 : 340} y={time === "morning" ? 96 : 56} />
      <Sun x={time === "morning" ? 70 : 340} y={time === "morning" ? 96 : 56} r={20} />
      <DriftCloud y={50} s={0.7} dur={80} phase={0.2} />
      <Birds y={74} dur={22} phase={0.5} />
      <Mountains />
      <Depth z={-0.25}>
        <path d="M-10 200 Q100 172 210 182 T410 176 L410 310 L-10 310Z" fill="#8FD39A" />
        <Tukul x={330} y={202} s={0.7} />
      </Depth>
      <path d="M-10 232 Q160 218 410 230 L410 310 L-10 310Z" fill="#5CBF73" />
    </>
  );
}

/** The big fig tree (sholla), with its wide shade. */
function FigTree({ x, y, leaves = true }: { x: number; y: number; leaves?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={4} rx={110} ry={14} fill="#000" opacity={0.12} />
      <path d="M-18 0 Q-10 -40 -16 -80 L16 -80 Q10 -40 20 0Z" fill="#7A5236" />
      <path d="M-10 -60 Q-40 -86 -66 -96 M10 -66 Q40 -90 70 -98 M0 -80 L0 -120" stroke="#7A5236" strokeWidth={10} strokeLinecap="round" fill="none" />
      <path d="M-14 -4 Q-24 2 -34 0 M16 -4 Q26 2 36 0" stroke="#7A5236" strokeWidth={6} strokeLinecap="round" />
      <g className="lali-sway" style={vars({ "--dur": "6s" })}>
        <Tappable reaction="wiggle" sound="pop">
          <g fill="#2D7D47">
            <circle cx={-70} cy={-104} r={36} />
            <circle cx={70} cy={-106} r={38} />
            <circle cx={0} cy={-136} r={44} />
            <circle cx={-34} cy={-140} r={30} />
            <circle cx={38} cy={-146} r={30} />
          </g>
          <g fill="#3E9B5A">
            <circle cx={-60} cy={-112} r={28} />
            <circle cx={64} cy={-114} r={30} />
            <circle cx={0} cy={-144} r={34} />
            <circle cx={-30} cy={-150} r={20} />
          </g>
          <g fill="#C9502E">
            {[-70, -40, -10, 22, 50, 80, -54, 30].map((fx, i) => (
              <circle key={fx} cx={fx} cy={-100 - (i % 3) * 22} r={3} />
            ))}
          </g>
          <ellipse cx={-10} cy={-164} rx={20} ry={6} fill="#fff" opacity={0.12} />
        </Tappable>
      </g>
      {leaves &&
        [
          [-40, -90, 0, 18],
          [30, -110, -3, -14],
          [60, -96, -5.5, 20],
        ].map(([lx, ly, d, dx]) => (
          <g key={lx} transform={`translate(${lx} ${ly})`}>
            <path d="M0 -5 Q6 0 0 5 Q-6 0 0 -5Z" fill="#5CB86A" className="new-baby-brother-leaf" style={vars({ "--delay": `${d}s`, "--lx": `${dx}px` })} />
          </g>
        ))}
    </g>
  );
}

/** A low bed with a striped blanket; `children` lie in it. */
function Bed({ x, y, w = 150, children, blanket = "#4A7FD0" }: { x: number; y: number; w?: number; children?: ReactNode; blanket?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-w / 2} y={-8} width={w} height={24} rx={6} fill="#7A4A2E" />
      <rect x={-w / 2 + 4} y={-22} width={44} height={20} rx={9} fill={NETELA} />
      {children}
      <path d={`M${-w / 2 + 34} -20 Q0 -32 ${w / 2} -18 L${w / 2} 10 Q0 18 ${-w / 2 + 34} 10Z`} fill={blanket} />
      <path d={`M${-w / 2 + 36} -6 Q0 -16 ${w / 2 - 2} -4`} stroke="#FFD233" strokeWidth={3} fill="none" />
      <path d={`M${-w / 2 + 36} 2 Q0 -8 ${w / 2 - 2} 4`} stroke="#fff" strokeWidth={2} strokeDasharray="5 4" fill="none" />
    </g>
  );
}

/** Just a sleepy head on a pillow (the cast's 200 × 240 box, clipped to the head). */
function HeadOnly({ children, r = 64, cy = 90 }: { children: ReactNode; r?: number; cy?: number }) {
  const cid = useId().replace(/:/g, "");
  return (
    <g>
      <defs>
        <clipPath id={`${cid}-h`}>
          <circle cx={100} cy={cy} r={r} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${cid}-h)`}>{children}</g>
    </g>
  );
}

function Scene({ children }: { children: ReactNode }) {
  return <g>{children}</g>;
}

/* ---------- the pages ---------- */

export default function NewBabyBrother({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Mama's big round tummy. "Soon there will be a new baby, and you will be a big sister." What would that be like?
    case 0:
      return (
        <Scene>
          <Home id={id} time="day" />
          <Place x={250} y={290} s={0.52} tap={TAP_MAMA}>
            <Mama belly mood="joy" />
          </Place>
          <Place x={130} y={294} s={0.42} tap={TAP_TSEHAY}>
            <Tsehay mood="wow" lamb />
          </Place>
          <Thought x={100} y={150} delay={1.4}>
            <g transform="translate(0 2)">
              <Baby face="sleep" s={0.8} />
            </g>
            <text x={20} y={-6} fontSize={14} fontFamily={FONT} fontWeight={900} fill="#E2463F" textAnchor="middle">
              ?
            </text>
          </Thought>
          <Hearts spots={[[250, 196, 2.4], [272, 186, 3.6]]} />
          <BeeHover x={350} y={170} s={0.9} flip />
          <Air kind="day" seed={3} grass={false} />
        </Scene>
      );
    // One morning, there he is! Baby Dawit. "Ooh!" says Papa. "How lovely!" says Grandma. Tsehay peeks.
    case 1:
      return (
        <Scene>
          <Home id={id} time="morning" />
          <Place x={200} y={292} s={0.52} tap={TAP_MAMA}>
            <Mama baby="sleep" mood="happy" />
          </Place>
          <Place x={300} y={294} s={0.44} flip tap={TAP_GUGU}>
            <Papa mood="wow" />
          </Place>
          <Place x={108} y={292} s={0.44} tap={TAP_GRANDMA}>
            <Grandma arm="raise" mood="joy" />
          </Place>
          <g className="new-baby-brother-peek" style={vars({ "--px": "-16px", "--delay": "0.6s" })}>
            <Place x={392} y={298} s={0.36} flip tap={TAP_TSEHAY}>
              <Tsehay mood="wow" />
            </Place>
          </g>
          <Hearts spots={[[190, 178, 1.2], [214, 170, 2], [176, 168, 2.8], [228, 182, 3.6]]} />
          <Air kind="day" seed={5} grass={false} />
        </Scene>
      );
    // The neighbours bring genfo for Mama and gifts for the baby. "So small! So sweet!" "What about me?"
    case 2:
      return (
        <Scene>
          <Home id={id} time="day" />
          <Place x={252} y={290} s={0.48} tap={TAP_MAMA}>
            <Mama baby="sleep" mood="joy" />
          </Place>
          <Place x={172} y={294} s={0.42} tap={TAP_SHEEP}>
            <AuntieSheep bowl />
          </Place>
          <Place x={330} y={296} s={0.36} flip tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={-3} />
          </Place>
          <Gift x={358} y={296} s={0.9} color="#E2463F" />
          <Gift x={300} y={298} s={0.7} />
          <Hearts spots={[[230, 176, 1], [262, 168, 1.8], [196, 160, 2.6]]} />
          <Place x={62} y={296} s={0.32} tap={TAP_TSEHAY}>
            <Tsehay mood="sad" lamb />
          </Place>
          <Speech x={96} y={196} w={40} h={26} delay={2.6}>
            <text y={6} fontSize={16} fontFamily={FONT} fontWeight={900} fill="#4A6FA8" textAnchor="middle">
              …?
            </text>
          </Speech>
          <Air kind="day" seed={7} grass={false} />
        </Scene>
      );
    // Tsehay shows her drawing: "Shh, the baby is sleeping." She dances: "Shh." She stamps: "What about me?"
    case 3:
      return (
        <Scene>
          <Home id={id} time="day" />
          <Place x={270} y={290} s={0.5} tap={TAP_MAMA}>
            <Mama baby="sleep" mood="happy" />
          </Place>
          <Zzz x={292} y={178} color="#FFFFFF" />
          <Speech x={318} y={140} w={38} h={30} tail="left" delay={0.8}>
            <ShhIcon />
          </Speech>
          <g className="new-baby-brother-stamp">
            <Place x={140} y={292} s={0.44} tap={TAP_TSEHAY}>
              <g>
                <Tsehay mood="worried" pose="point" />
                <g transform="translate(160 64) rotate(-8)">
                  <Tappable reaction="wiggle" sound="pop">
                    <rect x={-26} y={-34} width={52} height={40} rx={3} fill="#FFFFFF" stroke="#E0D8CC" strokeWidth={2} />
                    <circle cx={10} cy={-22} r={6} fill="#FFD233" />
                    <path d="M-22 2 L-10 -14 L0 -2 L8 -10 L22 2Z" fill="#5CBF73" />
                    <path d="M-16 -4 l0 -10 l8 0 l0 10" stroke="#E2463F" strokeWidth={2} fill="none" />
                    <path d="M-20 -24 q4 -4 8 0" stroke="#4A7FD0" strokeWidth={2} fill="none" />
                  </Tappable>
                </g>
              </g>
            </Place>
          </g>
          <g transform="translate(140 294)">
            <ellipse rx={30} ry={6} fill="#E8C49A" className="new-baby-brother-dust" />
          </g>
          <g transform="translate(70 290)">
            <Tappable reaction="bounce" sound="baa">
              <Lamb s={1.2} />
            </Tappable>
          </g>
          <Air kind="day" seed={9} grass={false} />
        </Scene>
      );
    // That night the baby cries and cries. WAAH! Mama rocks him, Papa walks him. Tsehay covers her ears.
    case 4:
      return (
        <Scene>
          <Home id={id} time="night" win={[300, 84]} />
          <Glow x={240} y={210} r={150} color="#FFD27A" strength={0.25} dur={3} />
          <Place x={252} y={286} s={0.46} className="new-baby-brother-sway" tap={TAP_MAMA}>
            <Mama baby="cry" mood="worried" />
          </Place>
          <Cry x={262} y={196} s={1.1} />
          <Wah x={302} y={172} s={1.1} />
          <Place x={350} y={290} s={0.36} flip from={[320, 290]} dur={4} delay={0.2} tap={TAP_GUGU}>
            <Papa mood="worried" />
          </Place>
          <Bed x={124} y={266} w={150}>
            <g transform="translate(-58 -40)">
              <g transform="scale(0.32) translate(-100 -60)">
                <HeadOnly r={72}>
                  <Tsehay mood="worried" ears />
                </HeadOnly>
              </g>
            </g>
          </Bed>
          <Air kind="night" seed={11} grass={false} />
        </Scene>
      );
    // In the morning Tsehay sits all alone under the big fig tree with her lamb. One big tear.
    case 5:
      return (
        <Scene>
          <Yard id={id} time="morning" />
          <FigTree x={170} y={262} />
          <Place x={176} y={292} s={0.42} tap={TAP_TSEHAY}>
            <Tsehay mood="sad" lamb tear />
          </Place>
          <g transform="translate(300 270)">
            <Tappable reaction="bounce" sound="pop">
              <g className="lali-hop" style={vars({ "--dur": "1.6s" })}>
                <ellipse cx={0} cy={0} rx={9} ry={7} fill="#7A8AA0" />
                <circle cx={8} cy={-6} r={5} fill="#7A8AA0" />
                <path d="M12 -6 l5 1 l-5 2Z" fill="#F5B21E" />
                <circle cx={9} cy={-7} r={1.1} fill="#1A0F0A" />
                <path d="M-8 -2 l-8 -3 l2 5Z" fill="#5A6A80" />
              </g>
            </Tappable>
          </g>
          <Air kind="day" seed={13} />
        </Scene>
      );
    // Grandma sits beside her and wraps her in her netela. "Babies can't talk. Can't walk. Can't even sing."
    case 6:
      return (
        <Scene>
          <Yard id={id} time="day" />
          <FigTree x={170} y={262} />
          <Place x={140} y={294} s={0.5} tap={TAP_GRANDMA}>
            <Grandma arm="hold" mood="happy" />
          </Place>
          {/* the end of the netela, wrapped round Tsehay's back and shoulders */}
          <path d="M168 274 Q184 240 214 242 Q244 244 252 274 L246 286 Q216 262 182 288Z" fill={NETELA} />
          <path d="M246 286 Q216 262 182 288" stroke="#2E9A8A" strokeWidth={3.4} fill="none" />
          <path d="M246 286 Q216 262 182 288" stroke="#F5B21E" strokeWidth={1.4} strokeDasharray="3 3" fill="none" />
          <Place x={214} y={296} s={0.36} tap={TAP_TSEHAY}>
            <Tsehay mood="worried" lamb />
          </Place>
          {/* what babies can't do yet: talk, walk, sing */}
          {[
            { x: 270, y: 132, d: 1, k: "talk" },
            { x: 316, y: 156, d: 2.2, k: "walk" },
            { x: 352, y: 124, d: 3.4, k: "sing" },
          ].map(({ x, y, d, k }) => (
            <g key={k} transform={`translate(${x} ${y})`}>
              <g className="lali-pop-in" style={vars({ "--delay": `${d}s` })}>
                <Tappable reaction="spin" sound="pop">
                  <circle r={18} fill="#fff" stroke="#E8D8C8" strokeWidth={2} />
                  {k === "talk" && <path d="M-9 -7 h18 a3 3 0 0 1 3 3 v8 a3 3 0 0 1 -3 3 h-9 l-6 5 v-5 h-3 a3 3 0 0 1 -3 -3 v-8 a3 3 0 0 1 3 -3Z" fill="#7FC8F8" />}
                  {k === "walk" && (
                    <g fill="#C98A4A">
                      <ellipse cx={-5} cy={2} rx={4} ry={7} />
                      <ellipse cx={6} cy={-2} rx={4} ry={7} />
                    </g>
                  )}
                  {k === "sing" && (
                    <g fill="#F5B21E">
                      <ellipse cx={-3} cy={6} rx={5} ry={3.6} transform="rotate(-20 -3 6)" />
                      <path d="M1.5 5 V-10 Q8 -6 6 0" stroke="#F5B21E" strokeWidth={2.4} fill="none" />
                    </g>
                  )}
                  <path d="M-12 -12 L12 12" stroke="#E2463F" strokeWidth={3} strokeLinecap="round" opacity={0.85} />
                </Tappable>
              </g>
            </g>
          ))}
          <Air kind="day" seed={15} />
        </Scene>
      );
    // "But big sisters can, and Dawit needs one very much." Tsehay wipes her eyes. "Really?" "Really. Come and see."
    case 7:
      return (
        <Scene>
          <Yard id={id} time="day" />
          <FigTree x={90} y={262} leaves={false} />
          <Place x={230} y={292} s={0.46} from={[150, 296]} dur={3} delay={1.4} tap={TAP_GRANDMA}>
            <Grandma arm="hold" mood="joy" />
          </Place>
          <Place x={300} y={294} s={0.38} from={[220, 296]} dur={3} delay={1.4} tap={TAP_TSEHAY}>
            <g>
              <Tsehay mood="joy" pose="point" />
            </g>
          </Place>
          {/* sparkles: something wonderful is about to happen */}
          {[
            [262, 150, 0.6],
            [300, 132, 1],
            [338, 156, 1.4],
          ].map(([x, y, d]) => (
            <g key={x} transform={`translate(${x} ${y})`}>
              <g className="lali-pop-in" style={vars({ "--delay": `${d}s` })}>
                <Tappable reaction="spin" sound="chime">
                  <path d="M0 -10 Q2 -2 10 0 Q2 2 0 10 Q-2 2 -10 0 Q-2 -2 0 -10Z" fill="#FFD233" className="lali-twinkle" />
                </Tappable>
              </g>
            </g>
          ))}
          <g transform="translate(372 286)">
            <Tappable reaction="bounce" sound="baa">
              <Lamb s={1.1} />
            </Tappable>
          </g>
          <BeeHover x={190} y={176} s={1} />
          <Air kind="day" seed={17} />
        </Scene>
      );
    // Dawit is crying again. "Hello, Dawit. I'm your big sister." He stops crying. His eyes open wide.
    case 8:
      return (
        <Scene>
          <Home id={id} time="day" />
          <Cradle x={240} y={282} s={1.1}>
            <g transform="translate(-2 -52) scale(1.3)">
              <g className="new-baby-brother-stop new-baby-brother-gone" style={vars({ "--delay": "2.6s" })}>
                <Baby face="cry" />
              </g>
              <g className="lali-fade-in" style={vars({ "--delay": "2.6s", "--dur": "0.4s" })}>
                <Baby face="wide" />
              </g>
            </g>
          </Cradle>
          <Cry x={226} y={214} s={1} stop={2.4} />
          <Place x={146} y={294} s={0.46} tap={TAP_TSEHAY}>
            <g className="new-baby-brother-lean" style={vars({ "--lean": "6deg", "--dur": "3s" })}>
              <Tsehay mood="happy" />
            </g>
          </Place>
          <Speech x={168} y={160} w={40} h={28} tail="left" delay={1.6}>
            <path d="M0 6 C-10 -2 -8 -12 -2 -12 C0 -12 0 -10 0 -8 C0 -10 0 -12 2 -12 C8 -12 10 -2 0 6Z" fill="#E2463F" />
          </Speech>
          <Hearts spots={[[230, 196, 3.2], [250, 186, 3.8]]} />
          <g transform="translate(66 292)">
            <Tappable reaction="bounce" sound="baa">
              <Lamb s={1.1} />
            </Tappable>
          </g>
          <Air kind="day" seed={19} grass={false} />
        </Scene>
      );
    // Big-sister jobs: the soft blanket, the rattle, funny faces. Then Dawit grabs her finger and holds on tight!
    case 9:
      return (
        <Scene>
          <Home id={id} time="day" />
          <Cradle x={232} y={292} s={0.95} face="awake" />
          <Place x={300} y={294} s={0.44} flip tap={TAP_TSEHAY}>
            <Tsehay mood="joy" pose="point" />
          </Place>
          {/* his tiny arm reaches up out of the gabi and holds on to her finger */}
          <path d="M238 240 Q256 230 270 228" stroke={NETELA} strokeWidth={6} strokeLinecap="round" fill="none" />
          <g transform="translate(272 227)">
            <g className="new-baby-brother-squeeze">
              <Tappable {...TAP_BABY}>
                <circle r={4.4} fill={G_FACE} />
              </Tappable>
            </g>
          </g>
          <g transform="translate(150 290)">
            <g className="new-baby-brother-shake">
              <Tappable reaction="wiggle" sound="chime">
                <rect x={-2.5} y={-6} width={5} height={22} rx={2.5} fill="#C98A4A" />
                <circle cx={0} cy={-13} r={10} fill="#F5B21E" />
                <circle cx={-4} cy={-17} r={3} fill="#fff" opacity={0.6} />
                <path d="M-10 -13 H10" stroke="#E2463F" strokeWidth={2} />
              </Tappable>
            </g>
          </g>
          <g transform="translate(76 280)">
            <Tappable reaction="wiggle" sound="pop">
              <path d="M-40 10 Q-44 -14 -20 -16 L30 -18 Q46 -12 40 10Z" fill="#F2A0B8" />
              <path d="M-36 -2 L36 -4" stroke="#fff" strokeWidth={2} strokeDasharray="4 3" />
              <path d="M-38 6 L38 4" stroke="#E86FA0" strokeWidth={2} />
            </Tappable>
          </g>
          <Hearts spots={[[250, 210, 1.4], [228, 198, 2.4], [266, 194, 3.4]]} />
          <BeeHover x={176} y={180} s={0.9} />
          <Air kind="day" seed={21} grass={false} />
        </Scene>
      );
    // Mama hugs Tsehay close. "You were this tiny once. Every night I sang you a song." "Eshururu…"
    case 10:
      return (
        <Scene>
          <Home id={id} time="evening" />
          <Cradle x={330} y={284} s={0.9} face="sleep" rock />
          <g className="new-baby-brother-lean" style={vars({ "--lean": "3deg", "--dur": "4s" })}>
            <Place x={190} y={292} s={0.54} tap={TAP_MAMA}>
              <Mama mood="happy" hug />
            </Place>
            <Place x={238} y={296} s={0.36} flip tap={TAP_TSEHAY}>
              <Tsehay mood="happy" lamb />
            </Place>
          </g>
          <Notes x={170} y={170} n={4} nx={40} />
          <Hearts spots={[[214, 186, 1.6], [196, 176, 3]]} />
          <BeeHover x={92} y={160} s={0.9} />
          <Air kind="dusk" seed={23} grass={false} />
        </Scene>
      );
    // That night Dawit won't sleep. Mama and Papa are tired. Tsehay sits by the cradle and sings: "Eshururu…"
    case 11:
      return (
        <Scene>
          <Home id={id} time="night" />
          <Glow x={220} y={230} r={140} color="#FFD27A" strength={0.3} dur={3.6} />
          <Place x={68} y={288} s={0.4} tap={TAP_MAMA}>
            <Mama mood="happy" sleepy />
          </Place>
          <Place x={118} y={290} s={0.38} tap={TAP_GUGU}>
            <Papa mood="happy" sleepy />
          </Place>
          <Zzz x={84} y={192} />
          <Cradle x={280} y={284} s={1.05} face="awake" rock />
          <Place x={200} y={294} s={0.44} tap={TAP_TSEHAY}>
            <Tsehay mood="happy" />
          </Place>
          <Notes x={214} y={210} n={5} nx={44} dur={4.4} />
          <g transform="translate(176 292)">
            <Tappable reaction="bounce" sound="baa">
              <Lamb s={1} />
            </Tappable>
          </g>
          <Fireflies seed={5} n={4} top={60} bottom={140} x0={260} x1={340} />
          <Air kind="night" seed={25} grass={false} />
        </Scene>
      );
    // Dawit's eyes close. Mama tucks them both in and kisses Tsehay's nose. "Our wonderful big sister." Goodnight.
    case 12:
      return (
        <Scene>
          <Home id={id} time="night" />
          <Glow x={200} y={240} r={160} color="#FFD27A" strength={0.22} dur={4} />
          <Cradle x={318} y={284} s={0.9} face="sleep" />
          <Zzz x={332} y={208} />
          <Place x={176} y={262} s={0.46} className="new-baby-brother-lean" tap={TAP_MAMA}>
            <Mama mood="joy" />
          </Place>
          <Bed x={160} y={270} w={170} blanket="#E2463F">
            <g transform="translate(-68 -46)">
              <g transform="scale(0.34) translate(-100 -60)">
                <HeadOnly>
                  <Tsehay mood="happy" sleepy />
                </HeadOnly>
              </g>
            </g>
            <g transform="translate(-18 -16)">
              <Lamb s={0.9} />
            </g>
          </Bed>
          <Hearts spots={[[120, 206, 0.8], [140, 196, 2.2], [104, 190, 3.6]]} />
          <Air kind="night" seed={27} grass={false} />
        </Scene>
      );
    default:
      return null;
  }
}
