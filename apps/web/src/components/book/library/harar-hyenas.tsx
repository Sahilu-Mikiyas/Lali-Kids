"use client";

import "./harar-hyenas.css";

import { useId, type ReactNode } from "react";

import { CubShape, type Mood } from "../../characters";
import { Glow } from "../glow";
import { Air, BeeFlight, BeeHover, Birds, Depth, DriftCloud, LightRays, Moon, Mountains, Place, rand, ShootingStar, Sky, Stars, Sun, vars } from "../scenery";
import { Tappable } from "../tappable";

/*
  "The Night Visitors of Harar": one living picture per page (13 pages).
  The old city's wall (the Jugol) and its painted gates stand in the background of every
  outdoor page; at night the gate glows warm behind the feeding place, where Abba Yusuf's
  lantern makes a pool of light. The hyenas are drawn shy and friendly: round ears, soft
  eyes, a little smile. Jamila is the big spotted one, Bashir has a darker mane, and the
  tiny hyena is fluffy and chocolate-brown. Keyframes are harar-hyenas-* in
  ./harar-hyenas.css (transforms and opacity only); with reduced motion each page rests in
  a pose that tells it (the hyenas in the light, the meat on the stick, the cub close).
*/

const r1 = (n: number) => Math.round(n * 10) / 10;
const TAP_CUB = { reaction: "bounce", sound: "giggle" } as const;
const TAP_GRANDMA = { reaction: "grow", sound: "chime" } as const;
const TAP_YUSUF = { reaction: "grow", sound: "chime" } as const;
const TAP_HYENA = { reaction: "wiggle", sound: "giggle" } as const;
const FONT = "var(--font-grandstander), sans-serif";
const NETELA = "#FFFDF4";
const SHAWL = "#F4EEDC";
const FUR = "#FFC870";

/* ---------- the cast ---------- */

type Arm = "down" | "raise" | "hold";

/** Grandma in her netela; one arm can wave or rest round someone. */
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
            <circle cx={170} cy={196} r={8} fill={FUR} />
          </g>
        )}
        {arm === "raise" && (
          <g className="lali-wave" style={vars({ "--dur": "1.2s" })}>
            <path d="M136 152 Q160 140 168 112" stroke={SHAWL} strokeWidth={14} fill="none" strokeLinecap="round" />
            <circle cx={169} cy={106} r={8} fill={FUR} />
          </g>
        )}
        <g clipPath={`url(#${cid}-h)`} transform="translate(0 -6)">
          <CubShape pose="sit" granny mood={mood} />
        </g>
      </g>
    </g>
  );
}

type YusufArm = "down" | "lamp" | "call" | "stick";

/**
 * Abba Yusuf, Grandma's old friend: a grey-maned old lion in a white cap (kofia) and a white
 * gabi, with a white beard. Drawn in the cast's 200 × 240 box. With "stick" he holds the
 * long feeding stick out to the right (its tip near x 420 in his box); `meat` puts meat on it.
 */
function AbbaYusuf({ arm = "down", left = "rest", wink = false, mood = "happy", meat = false, meatDelay = 0.4 }: { arm?: YusufArm; left?: "rest" | "staff"; wink?: boolean; mood?: Mood; meat?: boolean; meatDelay?: number }) {
  return (
    <g className="harar-hyenas-still">
      <CubShape pose="sit" mood={mood} />
      {/* the mane has gone grey */}
      <circle cx={100} cy={104} r={50} fill="none" stroke="#F4EFE6" strokeWidth={18} opacity={0.4} />
      {/* the white kofia cap, embroidered */}
      <path d="M64 72 Q66 40 100 38 Q134 40 136 72 Q100 60 64 72Z" fill="#FFFFFF" />
      <path d="M66 66 Q100 55 134 66" stroke="#2E9A8A" strokeWidth={2.4} fill="none" strokeDasharray="3 3" />
      <path d="M82 48 l4 4 l4 -4 M96 45 l4 4 l4 -4 M110 48 l4 4 l4 -4" stroke="#E2463F" strokeWidth={1.6} fill="none" />
      {/* the beard */}
      <path d="M82 128 Q84 154 100 160 Q116 154 118 128 Q100 138 82 128Z" fill="#F4EFE6" />
      <path d="M92 140 Q100 146 108 140" stroke="#D8CFC0" strokeWidth={1.6} fill="none" />
      {wink && (
        <g className="harar-hyenas-wink" style={vars({ "--delay": "1s" })}>
          <ellipse cx={115} cy={99} rx={10.5} ry={12} fill={FUR} />
          <path d="M107 100 Q115 106 123 100" stroke="#2A1A10" strokeWidth={3.4} fill="none" strokeLinecap="round" />
        </g>
      )}
      {/* the white gabi over his shoulders */}
      <g className="lali-breathe">
        <path d="M46 168 Q100 140 154 168 L150 226 Q100 236 50 226Z" fill="#FBF8F0" />
        <path d="M50 214 Q100 224 150 214" stroke="#C9B48A" strokeWidth={3} fill="none" />
        <path d="M60 160 Q100 178 140 160" stroke="#E6DCC6" strokeWidth={3} fill="none" />
      </g>
      {/* left arm: resting, or holding the long stick upright with the basket on his arm */}
      {left === "rest" ? (
        <g>
          <path d="M62 170 Q52 196 66 212" stroke="#F4EFE6" strokeWidth={15} fill="none" strokeLinecap="round" />
          <circle cx={68} cy={214} r={8} fill={FUR} />
        </g>
      ) : (
        <g>
          <path d="M34 232 L22 40" stroke="#8A5A30" strokeWidth={4.5} strokeLinecap="round" />
          <path d="M62 170 Q40 182 34 196" stroke="#F4EFE6" strokeWidth={15} fill="none" strokeLinecap="round" />
          <g transform="translate(46 214)">
            <Basket x={0} y={0} s={1.5} />
          </g>
          <circle cx={30} cy={196} r={8.5} fill={FUR} />
        </g>
      )}
      {arm === "down" && (
        <g>
          <path d="M138 170 Q148 196 134 212" stroke="#F4EFE6" strokeWidth={15} fill="none" strokeLinecap="round" />
          <circle cx={132} cy={214} r={8} fill={FUR} />
        </g>
      )}
      {arm === "lamp" && (
        <g>
          <path d="M138 170 Q160 186 168 196" stroke="#F4EFE6" strokeWidth={15} fill="none" strokeLinecap="round" />
          <circle cx={170} cy={198} r={8} fill={FUR} />
          <g transform="translate(172 204)">
            <g className="harar-hyenas-swing">
              <Lantern s={1.5} />
            </g>
          </g>
        </g>
      )}
      {arm === "call" && (
        <g>
          <path d="M138 170 Q150 150 130 132" stroke="#F4EFE6" strokeWidth={15} fill="none" strokeLinecap="round" />
          <ellipse cx={126} cy={128} rx={9} ry={10} fill={FUR} />
        </g>
      )}
      {arm === "stick" && (
        <g>
          <path d="M138 170 Q160 176 176 168" stroke="#F4EFE6" strokeWidth={15} fill="none" strokeLinecap="round" />
          <path d="M150 174 L420 140" stroke="#8A5A30" strokeWidth={4.5} strokeLinecap="round" />
          <circle cx={178} cy={168} r={8.5} fill={FUR} />
          {meat && (
            <g transform="translate(420 140)">
              <g className="harar-hyenas-meat" style={vars({ "--delay": `${meatDelay}s` })}>
                <Meat s={2.2} />
              </g>
            </g>
          )}
        </g>
      )}
    </g>
  );
}

/** Anbessa with one arm forward (holding the stick) or up (waving). Same box as the cast. */
function CubArm({ arm = "forward", mood = "happy", look = 0 }: { arm?: "forward" | "wave"; mood?: Mood; look?: number }) {
  return (
    <g>
      <CubShape pose="sit" mood={mood} look={look} />
      {arm === "forward" ? (
        <g>
          <path d="M134 186 Q156 178 176 168" stroke="#F7B95E" strokeWidth={18} fill="none" strokeLinecap="round" />
          <ellipse cx={180} cy={166} rx={12} ry={11} fill="#FFD48A" />
        </g>
      ) : (
        <g className="lali-wave" style={vars({ "--dur": "0.5s" })}>
          <path d="M132 184 C142 166 152 148 160 128" stroke="#F7B95E" strokeWidth={18} fill="none" strokeLinecap="round" />
          <ellipse cx={162} cy={122} rx={13} ry={12} fill="#FFD48A" />
          <path d="M156 114 v6 M162 112 v7 M168 114 v6" stroke="#E59F45" strokeWidth={1.8} strokeLinecap="round" />
        </g>
      )}
    </g>
  );
}

/** Anbessa in bed: his head on the pillow, eyes shut, smiling. Same box as the cast. */
function SleepyCub() {
  const cid = useId().replace(/:/g, "");
  return (
    <g className="harar-hyenas-still">
      <defs>
        <clipPath id={`${cid}-h`}>
          <circle cx={100} cy={102} r={66} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${cid}-h)`}>
        <CubShape pose="sit" mood="happy" />
      </g>
      <ellipse cx={85} cy={99} rx={10.5} ry={12} fill={FUR} />
      <ellipse cx={115} cy={99} rx={10.5} ry={12} fill={FUR} />
      <path d="M77 100 Q85 106 93 100 M107 100 Q115 106 123 100" stroke="#2A1A10" strokeWidth={3.4} fill="none" strokeLinecap="round" />
    </g>
  );
}

/* ---------- the hyenas ---------- */

const H_COAT = "#D2AE78";
const H_SHADE = "#B8925C";
const H_SPOT = "#6A4A30";
const H_DARK = "#3E2C22";

/**
 * A spotted hyena, side-on, facing right, standing on (0, 0); about 150 wide and 110 tall.
 * `walk` trots the legs, `head` is the head's own class (sniffing or stretching) and its vars.
 */
function Hyena({ walk = false, dark = false, head, headStyle, mood = "happy", tail = true }: { walk?: boolean; dark?: boolean; head?: string; headStyle?: Record<string, string | number>; mood?: "happy" | "wow" | "munch"; tail?: boolean }) {
  const coat = dark ? "#C49C66" : H_COAT;
  const leg = (x: number, top: number, phase: number, near: boolean) => (
    <g className={walk ? "harar-hyenas-leg" : undefined} style={walk ? vars({ "--leg": `${phase}s` }) : undefined}>
      <rect x={x - 5.5} y={top} width={11} height={-top} rx={5.5} fill={near ? coat : H_SHADE} />
      <path d={`M${x - 5} -14 h10`} stroke={H_SPOT} strokeWidth={3} opacity={0.6} />
      <ellipse cx={x + 3} cy={-3} rx={8} ry={4.4} fill={H_DARK} />
    </g>
  );
  return (
    <g>
      <ellipse cx={4} cy={0} rx={62} ry={6} fill="#000" opacity={0.18} />
      {leg(-30, -40, -0.18, false)}
      {leg(40, -56, 0, false)}
      <g className={walk ? "harar-hyenas-trot" : "lali-breathe"}>
        {tail && (
          <g className="harar-hyenas-swish" style={vars({ "--delay": "-0.4s" })}>
            <path d="M-52 -56 Q-66 -44 -64 -26" stroke={H_SHADE} strokeWidth={6} fill="none" strokeLinecap="round" />
            <ellipse cx={-64} cy={-24} rx={6} ry={9} fill={H_DARK} />
          </g>
        )}
        {/* the body: high shoulders, sloping back */}
        <path d="M-56 -50 C-60 -68 -44 -76 -26 -74 C-2 -80 22 -94 42 -94 C62 -94 70 -76 64 -60 C60 -46 50 -42 34 -42 L-40 -38 C-50 -38 -54 -42 -56 -50Z" fill={coat} />
        <path d="M-40 -40 Q0 -34 34 -42 L36 -48 Q0 -42 -42 -46Z" fill="#F0DDB6" opacity={0.7} />
        <g fill={H_SPOT} opacity={0.75}>
          <ellipse cx={-34} cy={-60} rx={5} ry={4} />
          <ellipse cx={-20} cy={-68} rx={4.5} ry={3.6} />
          <ellipse cx={-14} cy={-54} rx={5} ry={4} />
          <ellipse cx={2} cy={-66} rx={5} ry={4} />
          <ellipse cx={8} cy={-52} rx={4.4} ry={3.6} />
          <ellipse cx={22} cy={-76} rx={4.6} ry={4} />
          <ellipse cx={26} cy={-60} rx={5} ry={4.2} />
          <ellipse cx={44} cy={-70} rx={4} ry={3.6} />
          <ellipse cx={-44} cy={-52} rx={4} ry={3.4} />
        </g>
        {/* the little mane along the neck */}
        <path d="M-4 -78 l4 -8 l4 6 l5 -9 l4 7 l5 -9 l4 7 l5 -8 l3 6 l6 -6 l2 8Z" fill={dark ? "#4A3424" : "#7A5A3A"} />
      </g>
      {leg(-20, -42, 0, true)}
      {leg(50, -58, -0.18, true)}
      {/* the head, which can sniff or stretch out on its own */}
      <g className={head} style={headStyle ? vars(headStyle) : undefined}>
        <path d="M48 -90 Q64 -98 74 -88 L66 -66 Q52 -64 46 -74Z" fill={coat} />
        <g className="harar-hyenas-ear" style={vars({ "--delay": "-1s" })}>
          <circle cx={64} cy={-112} r={10} fill={H_SHADE} />
          <circle cx={64} cy={-111} r={5.5} fill={H_SPOT} />
        </g>
        <ellipse cx={74} cy={-94} rx={22} ry={19} fill={coat} />
        <g className="harar-hyenas-ear" style={vars({ "--delay": "-2.4s" })}>
          <circle cx={80} cy={-114} r={10} fill={coat} />
          <circle cx={80} cy={-113} r={5.5} fill="#8A6444" />
        </g>
        {/* the dark muzzle */}
        <path d="M80 -98 Q102 -98 106 -86 Q106 -76 94 -74 Q80 -74 76 -82Z" fill={H_DARK} />
        <ellipse cx={104} cy={-91} rx={4.6} ry={3.6} fill="#1A0F0A" />
        <circle cx={102.6} cy={-92.4} r={1.2} fill="#fff" opacity={0.6} />
        {mood === "munch" ? (
          <g className="harar-hyenas-munch">
            <path d="M84 -80 Q94 -74 102 -80" stroke="#1A0F0A" strokeWidth={2.4} fill="none" strokeLinecap="round" />
          </g>
        ) : mood === "wow" ? (
          <ellipse cx={94} cy={-79} rx={4} ry={3.4} fill="#8A2F1E" />
        ) : (
          <path d="M84 -80 Q93 -74 101 -81" stroke="#E8C9A0" strokeWidth={2.2} fill="none" strokeLinecap="round" />
        )}
        {/* a soft, friendly eye */}
        <g className="lali-blink" style={vars({ "--dur": "4.6s" })}>
          <ellipse cx={78} cy={-100} rx={5} ry={5.6} fill="#2A1A10" />
          <circle cx={79.6} cy={-102} r={1.9} fill="#fff" />
        </g>
        <path d="M71 -108 Q77 -111 83 -107" stroke={H_SPOT} strokeWidth={2} fill="none" strokeLinecap="round" />
        <ellipse cx={70} cy={-88} rx={5} ry={3} fill="#FF8A7A" opacity={0.35} />
      </g>
    </g>
  );
}

/** The tiny hyena: fluffy and chocolate-brown, with big round ears. Facing right, on (0, 0). */
function HyenaCub({ walk = false, head, headStyle, mood = "happy" }: { walk?: boolean; head?: string; headStyle?: Record<string, string | number>; mood?: "happy" | "wow" | "munch" }) {
  const c = "#6E4E3A";
  const c2 = "#5A3E2E";
  const leg = (x: number, phase: number, near: boolean) => (
    <g className={walk ? "harar-hyenas-leg" : undefined} style={walk ? vars({ "--leg": `${phase}s` }) : undefined}>
      <rect x={x - 5} y={-24} width={10} height={24} rx={5} fill={near ? c : c2} />
      <ellipse cx={x + 2} cy={-3} rx={6.5} ry={3.6} fill="#2E2018" />
    </g>
  );
  return (
    <g>
      <ellipse cx={2} cy={0} rx={36} ry={4.5} fill="#000" opacity={0.18} />
      {leg(-16, -0.18, false)}
      {leg(18, 0, false)}
      <g className={walk ? "harar-hyenas-trot" : "lali-breathe"}>
        <g className="harar-hyenas-swish">
          <path d="M-28 -34 Q-38 -28 -36 -16" stroke={c2} strokeWidth={5} fill="none" strokeLinecap="round" />
        </g>
        <ellipse cx={-2} cy={-34} rx={30} ry={17} fill={c} />
        <path d="M-24 -44 q4 -6 8 -2 q4 -6 8 -2 q4 -6 8 -2" stroke="#8A6650" strokeWidth={2} fill="none" strokeLinecap="round" />
      </g>
      {leg(-10, 0, true)}
      {leg(24, -0.18, true)}
      <g className={head} style={headStyle ? vars(headStyle) : undefined}>
        <circle cx={18} cy={-66} r={11} fill={c2} />
        <circle cx={18} cy={-65} r={6} fill="#3A2A20" />
        <ellipse cx={30} cy={-50} rx={20} ry={18} fill={c} />
        <circle cx={38} cy={-70} r={11} fill={c} />
        <circle cx={38} cy={-69} r={6} fill="#8A6650" />
        <path d="M36 -52 Q52 -52 54 -42 Q54 -34 44 -34 Q34 -34 32 -40Z" fill="#2E2018" />
        <ellipse cx={53} cy={-46} rx={3.6} ry={2.8} fill="#140C08" />
        {mood === "munch" ? (
          <g className="harar-hyenas-munch">
            <path d="M40 -38 Q46 -34 51 -38" stroke="#140C08" strokeWidth={2} fill="none" strokeLinecap="round" />
          </g>
        ) : mood === "wow" ? (
          <ellipse cx={46} cy={-38} rx={3} ry={2.6} fill="#8A2F1E" />
        ) : (
          <path d="M40 -38 Q46 -34 51 -38" stroke="#C9A88A" strokeWidth={1.8} fill="none" strokeLinecap="round" />
        )}
        <g className="lali-blink">
          <ellipse cx={34} cy={-56} rx={5} ry={6} fill="#1A0F0A" />
          <circle cx={35.8} cy={-58} r={2.1} fill="#fff" />
          <circle cx={33} cy={-54} r={0.9} fill="#fff" />
        </g>
        <ellipse cx={24} cy={-44} rx={4.6} ry={2.8} fill="#FF8A7A" opacity={0.4} />
      </g>
    </g>
  );
}

/** Put a hyena (drawn on its feet at 0,0) at (x, y), scaled, facing left with `flip`. */
function At({ x, y, s = 1, flip = false, className, style, children }: { x: number; y: number; s?: number; flip?: boolean; className?: string; style?: Record<string, string | number>; children: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={className} style={style ? vars(style) : undefined}>
        <Tappable {...TAP_HYENA}>
          <g transform={`scale(${flip ? -s : s} ${s})`}>{children}</g>
        </Tappable>
      </g>
    </g>
  );
}

/* ---------- things ---------- */

function Meat({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <path d="M-4 -3 Q0 -6 4 -3 Q6 2 2 4 Q-3 5 -5 1Z" fill="#B8443A" />
      <path d="M-2 -2 Q1 -3 2 0" stroke="#F2B8A8" strokeWidth={0.9} fill="none" />
    </g>
  );
}

/** A woven basket. */
function Basket({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-14 -10 Q0 -14 14 -10 L10 4 Q0 8 -10 4Z" fill="#D9A04A" />
      <path d="M-12 -4 Q0 0 12 -4" stroke="#E2463F" strokeWidth={1.6} fill="none" />
      <path d="M-11 1 Q0 5 11 1" stroke="#2E9A8A" strokeWidth={1.4} fill="none" />
      <path d="M-12 -10 Q0 -26 12 -10" stroke="#B57A2A" strokeWidth={2} fill="none" />
    </g>
  );
}

/** A small lantern, hanging from (0, 0). */
function Lantern({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <path d="M0 0 V4" stroke="#5A4A3A" strokeWidth={1.4} />
      <path d="M-5 4 H5 L4 7 H-4Z" fill="#5A4A3A" />
      <rect x={-5} y={7} width={10} height={12} rx={2} fill="#FFE9A0" />
      <g className="harar-hyenas-lamp">
        <path d="M0 10 Q3 14 0 17 Q-3 14 0 10Z" fill="#FF9A3A" />
      </g>
      <path d="M-5 7 V19 M5 7 V19" stroke="#5A4A3A" strokeWidth={1.4} />
      <path d="M-6 19 H6 L5 22 H-5Z" fill="#5A4A3A" />
    </g>
  );
}

/** A lantern set on the ground, with its warm pool of light. */
function GroundLamp({ x, y, r = 120 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      <Glow x={x} y={y - 10} r={r} color="#FFD27A" strength={0.42} dur={2.4} />
      <g opacity={0.16}>
        <ellipse cx={x} cy={y + 8} rx={r * 0.9} ry={r * 0.22} fill="#FFD27A" className="harar-hyenas-lamp" />
      </g>
      <g transform={`translate(${x} ${y - 30})`}>
        <Tappable reaction="grow" sound="chime">
          <Lantern s={1.4} />
        </Tappable>
      </g>
    </g>
  );
}

/** Shining eyes in the dark. They open at `delay`. */
function Eyes({ x, y, delay, gx = 5, s = 1 }: { x: number; y: number; delay: number; gx?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="grow" sound="giggle">
          <circle cx={0} cy={0} r={12} fill="#FFE27A" opacity={0.12} />
          <g className="harar-hyenas-glance" style={vars({ "--gx": `${gx}px`, "--delay": `${-delay}s` })}>
            <g className="harar-hyenas-eyes" style={vars({ "--delay": `${-delay * 0.7}s` })}>
              <ellipse cx={-5} cy={0} rx={3.2} ry={2.6} fill="#FFE27A" />
              <ellipse cx={5} cy={0} rx={3.2} ry={2.6} fill="#FFE27A" />
              <circle cx={-4.4} cy={-0.6} r={1} fill="#fff" />
              <circle cx={5.6} cy={-0.6} r={1} fill="#fff" />
            </g>
          </g>
        </Tappable>
      </g>
    </g>
  );
}

/** A sound that pops up and wobbles away: "?" or the hyena's rising whoop (a swoop and a "!"). */
function Say({ x, y, text, delay = 0.6, size = 16, color = "#FFF2C0", rot = -6 }: { x: number; y: number; text: "?" | "whoop"; delay?: number; size?: number; color?: string; rot?: number }) {
  const k = size / 16;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${k})`}>
      <g className="harar-hyenas-whoop" style={vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="wiggle" sound="giggle">
          {text === "whoop" ? (
            <g>
              <path d="M-34 8 Q-26 -2 -18 8 Q-10 18 -2 6 Q6 -8 14 -2 Q22 4 26 -18" stroke="#1B2A4E" strokeWidth={7} fill="none" strokeLinecap="round" />
              <path d="M-34 8 Q-26 -2 -18 8 Q-10 18 -2 6 Q6 -8 14 -2 Q22 4 26 -18" stroke={color} strokeWidth={3.4} fill="none" strokeLinecap="round" />
              <path d="M26 -18 l-8 3 M26 -18 l1 8" stroke={color} strokeWidth={3} strokeLinecap="round" />
              <text x={38} y={-4} fontSize={20} fontFamily={FONT} fontWeight={900} fill={color} stroke="#1B2A4E" strokeWidth={3} paintOrder="stroke" textAnchor="middle">
                !
              </text>
            </g>
          ) : (
            <text fontSize={22} fontFamily={FONT} fontWeight={900} fill={color} stroke="#1B2A4E" strokeWidth={3} paintOrder="stroke" textAnchor="middle">
              ?
            </text>
          )}
        </Tappable>
      </g>
    </g>
  );
}

/** Little curls of breath at a sniffing nose. */
function Sniffs({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke="#CFE0FF" strokeWidth={1.8} fill="none" strokeLinecap="round">
      {[0, 0.5, 1].map((d, i) => (
        <path key={d} d={`M${-i * 7} ${-i * 4} q-4 -4 0 -7 q4 -3 0 -7`} className="harar-hyenas-call" style={vars({ "--delay": `${delay + d}s` })} />
      ))}
    </g>
  );
}

/** Shaky marks round wobbly knees. */
function Wobbles({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke="#FFF2C0" strokeWidth={2.2} fill="none" strokeLinecap="round" className="harar-hyenas-wobble">
      <path d="M-24 -6 q-5 6 0 12 M-30 -9 q-6 9 0 18" />
      <path d="M24 -6 q5 6 0 12 M30 -9 q6 9 0 18" />
    </g>
  );
}

/** Soft rings going out from a calling mouth. */
function Call({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="none" stroke="#FFF2C0" strokeWidth={2.4} strokeLinecap="round">
      {[0, 0.66, 1.33].map((d) => (
        <path key={d} d="M0 -10 Q8 0 0 10" className="harar-hyenas-call" style={vars({ "--delay": `${delay + d}s` })} />
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
              {i % 2 ? (
                <path d="M0 -9 Q2 -2 9 0 Q2 2 0 9 Q-2 2 -9 0 Q-2 -2 0 -9Z" fill="#FFD233" />
              ) : (
                <path d="M0 8 C-10 0 -8 -10 -2 -10 C0 -10 0 -8 0 -6 C0 -8 0 -10 2 -10 C8 -10 10 0 0 8Z" fill="#E2463F" />
              )}
            </Tappable>
          </g>
        </g>
      ))}
    </g>
  );
}

/* ---------- the old city ---------- */

/** A painted gate in the wall: a little tower with a bright frame round the arch. */
function Gate({ x, y, s = 1, frame, accent, glow = false, open = false }: { x: number; y: number; s?: number; frame: string; accent: string; glow?: boolean; open?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="chime">
        <path d="M-40 0 L-40 -96 L-34 -104 L34 -104 L40 -96 L40 0Z" fill={frame} />
        <path d="M-40 -96 L40 -96" stroke={accent} strokeWidth={4} />
        <g fill={accent}>
          {[-28, -14, 0, 14, 28].map((dx) => (
            <path key={dx} d={`M${dx - 5} -104 L${dx} -112 L${dx + 5} -104Z`} />
          ))}
        </g>
        <path d="M-22 0 L-22 -50 Q0 -80 22 -50 L22 0Z" fill={accent} />
        <path d="M-17 0 L-17 -48 Q0 -72 17 -48 L17 0Z" fill={glow ? "#FFD27A" : open ? "#3A2A22" : "#8A5A30"} />
        {glow && <path d="M-17 0 L-17 -48 Q0 -72 17 -48 L17 0Z" fill="#FFF2C0" className="harar-hyenas-lamp" opacity={0.6} />}
        {!open && !glow && <path d="M0 -60 V0 M-17 -30 H17" stroke="#6A4022" strokeWidth={2} />}
        {!open && !glow && (
          <g fill="#F5D27A">
            <circle cx={-8} cy={-20} r={1.6} />
            <circle cx={8} cy={-20} r={1.6} />
            <circle cx={-8} cy={-40} r={1.6} />
            <circle cx={8} cy={-40} r={1.6} />
          </g>
        )}
        <circle cx={0} cy={-84} r={5} fill="#fff" opacity={0.85} />
        <path d="M-30 -20 L-30 -60 M30 -20 L30 -60" stroke="#fff" strokeOpacity={0.3} strokeWidth={3} />
      </Tappable>
    </g>
  );
}

/** Rooftops, a white minaret and a green dome, peeking over the wall. */
function Skyline({ y, night = false, mx = 258 }: { y: number; night?: boolean; mx?: number }) {
  const roofs: [number, number, number, string][] = [
    [10, 36, 26, "#F2A0B8"],
    [52, 30, 18, "#7FC8F8"],
    [96, 40, 30, "#F5D27A"],
    [150, 34, 22, "#8FD3A8"],
    [236, 40, 26, "#F2A0B8"],
    [286, 32, 18, "#FFFFFF"],
    [330, 36, 28, "#7FC8F8"],
    [372, 34, 20, "#F5D27A"],
  ];
  return (
    <g opacity={night ? 0.55 : 1}>
      {roofs.map(([x, w, h, c]) => (
        <g key={x}>
          <rect x={x} y={y - h} width={w} height={h + 4} fill={night ? "#4A4878" : c} />
          <rect x={x + w * 0.3} y={y - h + 6} width={5} height={7} rx={1.5} fill={night ? "#FFD27A" : "#5A4A6A"} opacity={night ? 0.8 : 0.5} />
        </g>
      ))}
      <g fill={night ? "#5A5890" : "#FFFFFF"}>
        <rect x={mx} y={y - 70} width={12} height={74} />
        <rect x={mx - 3} y={y - 54} width={18} height={5} />
        <path d={`M${mx} ${y - 70} L${mx + 6} ${y - 86} L${mx + 12} ${y - 70}Z`} />
      </g>
      <path d={`M${mx + 14} ${y + 2} Q${mx + 14} ${y - 30} ${mx + 34} ${y - 30} Q${mx + 54} ${y - 30} ${mx + 54} ${y + 2}Z`} fill={night ? "#3E6A5E" : "#3FA36A"} />
      <path d={`M${mx + 34} ${y - 30} V${y - 38}`} stroke={night ? "#5A5890" : "#F5B21E"} strokeWidth={2} />
    </g>
  );
}

/** The Jugol: the old wall round Harar, its top a soft wavy line. Ground at `y`. */
function Wall({ y, h = 72, night = false, dusk = false, x0 = -10, x1 = 410 }: { y: number; h?: number; night?: boolean; dusk?: boolean; x0?: number; x1?: number }) {
  const c = night ? "#4E4A70" : dusk ? "#D99A6A" : "#E6C894";
  const top = y - h;
  let d = `M${x0} ${y} L${x0} ${top}`;
  for (let x = x0; x < x1; x += 40) d += ` Q${x + 20} ${top - 6} ${x + 40} ${top}`;
  d += ` L${x1} ${y}Z`;
  const rnd = rand(17);
  return (
    <g>
      <path d={d} fill={c} />
      <path d={`M${x0} ${top + 8} L${x1} ${top + 8}`} stroke="#fff" strokeOpacity={night ? 0.06 : 0.25} strokeWidth={4} />
      <g stroke={night ? "#3E3A5E" : dusk ? "#C0845A" : "#CBA670"} strokeWidth={1.6} opacity={0.7}>
        {Array.from({ length: 14 }, (_, i) => {
          const x = r1(x0 + rnd() * (x1 - x0));
          const yy = r1(top + 18 + rnd() * (h - 26));
          return <path key={i} d={`M${x} ${yy} h${r1(10 + rnd() * 14)}`} />;
        })}
      </g>
    </g>
  );
}

type Time = "day" | "dusk" | "night";

/** Outside the wall: sky, hills, the city behind its wall, and the dusty ground. */
function Outside({ id, time = "day", wallY = 226, gates = true, gateGlow = false, wallX0, wallX1 }: { id: string; time?: Time; wallY?: number; gates?: boolean; gateGlow?: boolean; wallX0?: number; wallX1?: number }) {
  const night = time === "night";
  const dusk = time === "dusk";
  return (
    <>
      {time === "day" && <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />}
      {dusk && <Sky id={id} from="#3E3A8E" mid="#E8826A" to="#FFD08A" />}
      {night && <Sky id={id} from="#0A1036" mid="#1F2870" to="#3E4796" />}
      {time === "day" && (
        <>
          <LightRays x={340} y={54} />
          <Sun x={340} y={54} r={20} />
          <DriftCloud y={44} s={0.7} dur={90} phase={0.2} />
          <DriftCloud y={70} s={0.45} dur={70} phase={0.7} />
          <Birds y={84} dur={24} phase={0.4} />
        </>
      )}
      {night && (
        <>
          <Stars seed={13} n={36} top={6} bottom={150} />
          <ShootingStar seed={3} />
        </>
      )}
      <Mountains far={night ? "#2E3878" : dusk ? "#A06A9A" : "#B9CDE0"} mid={night ? "#262E66" : dusk ? "#865A88" : "#9FBCA8"} />
      <Depth z={-0.25}>
        <Skyline y={wallY - 70} night={night} />
        <Wall y={wallY} night={night} dusk={dusk} x0={wallX0} x1={wallX1} />
        {gates && (
          <>
            <Gate x={64} y={wallY} s={0.62} frame="#F28DB2" accent="#2E9A8A" glow={night && gateGlow} />
            <Gate x={200} y={wallY} s={0.9} frame="#4FB3C8" accent="#F5B21E" glow={night && gateGlow} open={dusk} />
            <Gate x={338} y={wallY} s={0.62} frame="#F5C04A" accent="#D9483B" glow={night && gateGlow} />
          </>
        )}
      </Depth>
      <path d={`M-10 ${wallY} L410 ${wallY} L410 310 L-10 310Z`} fill={night ? "#2A2846" : dusk ? "#C99068" : "#DDBB86"} />
      <path d={`M176 ${wallY} L224 ${wallY} L270 310 L130 310Z`} fill={night ? "#34325A" : dusk ? "#D8A07A" : "#E8CC9C"} opacity={0.8} />
    </>
  );
}

/** Night, out past the gate: the feeding place, with the city wall up on the left. */
function Field({ id, moon = true }: { id: string; moon?: boolean }) {
  return (
    <>
      <Sky id={id} from="#0A1036" mid="#1F2870" to="#3E4796" />
      <Stars seed={7} n={38} top={6} bottom={160} />
      <ShootingStar seed={9} />
      {moon && <Moon x={334} y={54} r={18} />}
      <Mountains far="#2A3474" mid="#222A60" />
      <Depth z={-0.3}>
        <path d="M-10 210 Q120 180 250 196 T410 192 L410 310 L-10 310Z" fill="#1E3A4A" />
        <g transform="translate(-40 0)">
          <g fill="#3A3866">
            <rect x={20} y={112} width={30} height={22} />
            <rect x={62} y={104} width={26} height={30} />
            <rect x={140} y={110} width={34} height={24} />
            <rect x={150} y={84} width={9} height={50} />
            <path d="M150 84 L154.5 72 L159 84Z" />
          </g>
          <g fill="#FFD27A" className="harar-hyenas-lamp">
            <rect x={30} y={118} width={5} height={6} rx={1} />
            <rect x={70} y={112} width={5} height={6} rx={1} />
            <rect x={156} y={116} width={5} height={6} rx={1} />
          </g>
          <Wall y={196} h={66} night x0={-10} x1={180} />
          <Gate x={110} y={196} s={0.66} frame="#4FB3C8" accent="#F5B21E" glow />
        </g>
      </Depth>
      <path d="M-10 236 Q140 220 260 228 T410 224 L410 310 L-10 310Z" fill="#26304E" />
      {/* bushes at the edge of the dark, where the hyenas wait */}
      <Depth z={-0.1}>
        <g fill="#16243A">
          <path d="M236 236 Q240 206 268 206 Q284 192 304 204 Q330 194 346 210 Q376 206 382 236Z" />
          <path d="M330 240 Q340 218 366 220 Q392 214 412 232 L412 244Z" />
        </g>
      </Depth>
    </>
  );
}

/** A Harari house front, painted, with a carved door, windows and a flat roof. */
function House({ x, w, h, y = 238, color, door, shutters = "#2E9A8A", cat = false, delay = 0 }: { x: number; w: number; h: number; y?: number; color: string; door?: string; shutters?: string; cat?: boolean; delay?: number }) {
  return (
    <g>
      <rect x={x} y={y - h} width={w} height={h} fill={color} />
      <rect x={x - 2} y={y - h - 5} width={w + 4} height={7} fill="#fff" opacity={0.75} />
      <rect x={x} y={y - 12} width={w} height={12} fill="#000" opacity={0.06} />
      <g transform={`translate(${x + w * 0.62} ${y - h * 0.62})`}>
        <Tappable reaction="wiggle" sound="pop">
          <rect x={-8} y={-9} width={16} height={18} rx={3} fill="#3A3048" />
          <rect x={-8} y={-9} width={8} height={18} rx={2} fill={shutters} className="harar-hyenas-shutter" style={vars({ "--delay": `${delay}s` })} />
          <rect x={0} y={-9} width={8} height={18} rx={2} fill={shutters} opacity={0.9} />
        </Tappable>
      </g>
      {door && (
        <g transform={`translate(${x + w * 0.28} ${y})`}>
          <Tappable reaction="wiggle" sound="pop">
            <path d="M-11 0 L-11 -34 Q0 -44 11 -34 L11 0Z" fill={door} />
            <path d="M-11 -34 Q0 -44 11 -34" stroke="#fff" strokeOpacity={0.5} strokeWidth={2} fill="none" />
            <g fill="#F5D27A">
              <circle cx={-5} cy={-26} r={1.3} />
              <circle cx={5} cy={-26} r={1.3} />
              <circle cx={-5} cy={-14} r={1.3} />
              <circle cx={5} cy={-14} r={1.3} />
            </g>
            <path d="M0 -40 V0" stroke="#000" strokeOpacity={0.2} strokeWidth={1.4} />
          </Tappable>
        </g>
      )}
      {cat && (
        <g transform={`translate(${x + w - 14} ${y - h - 2})`}>
          <Tappable reaction="bounce" sound="pop">
            <g className="lali-breathe">
              <ellipse cx={0} cy={-6} rx={9} ry={6} fill="#E89A4A" />
              <circle cx={7} cy={-13} r={5.5} fill="#E89A4A" />
              <path d="M3 -17 l1 -5 l3 3Z M9 -17 l2 -5 l2 4Z" fill="#E89A4A" />
              <circle cx={8.6} cy={-13.4} r={1} fill="#2A1A10" />
              <path d="M-8 -4 Q-16 -6 -14 -16" stroke="#E89A4A" strokeWidth={3} fill="none" strokeLinecap="round" className="lali-sway" />
            </g>
          </Tappable>
        </g>
      )}
    </g>
  );
}

/** Inside a Harari house: red walls hung with bright woven baskets and plates, raised seats. */
function Room({ id, night = false }: { id: string; night?: boolean }) {
  const baskets: [number, number, number, string, string][] = [
    [40, 70, 18, "#F5B21E", "#E2463F"],
    [86, 52, 14, "#2E9A8A", "#F5D27A"],
    [128, 76, 20, "#E86FA0", "#2E9A8A"],
    [176, 50, 13, "#F5D27A", "#4A7FD0"],
    [222, 72, 18, "#4A7FD0", "#F5B21E"],
    [268, 50, 14, "#E2463F", "#F5D27A"],
    [312, 74, 19, "#2E9A8A", "#E86FA0"],
    [358, 52, 15, "#F5B21E", "#2E9A8A"],
  ];
  return (
    <>
      <defs>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={night ? "#6A2E3A" : "#C8503E"} />
          <stop offset="1" stopColor={night ? "#4E2230" : "#A83E34"} />
        </linearGradient>
      </defs>
      <rect width={400} height={300} fill={`url(#${id}-wall)`} />
      <Depth z={-0.2}>
        {baskets.map(([x, y, r, a, b], i) => (
          <g key={x} transform={`translate(${x} ${y})`}>
            <Tappable reaction="spin" sound="pop">
              <circle r={r} fill={a} />
              <circle r={r * 0.72} fill="none" stroke={b} strokeWidth={r * 0.18} />
              <circle r={r * 0.4} fill={b} />
              <circle r={r * 0.18} fill={a} />
              <g fill={b}>
                {[0, 60, 120, 180, 240, 300].map((deg) => (
                  <path key={deg} d={`M0 ${-r * 0.92} l${r * 0.08} ${r * 0.12} l${-r * 0.16} 0Z`} transform={`rotate(${deg + i * 7})`} />
                ))}
              </g>
            </Tappable>
          </g>
        ))}
        <g>
          {[64, 152, 246, 336].map((x) => (
            <g key={x} transform={`translate(${x} 112)`}>
              <circle r={10} fill="#FFFFFF" />
              <circle r={10} fill="none" stroke="#3E7FD0" strokeWidth={2} />
              <circle r={4} fill="#F5B21E" />
            </g>
          ))}
        </g>
      </Depth>
      {/* the raised seats along the wall, with rugs */}
      <path d="M-10 196 L410 196 L410 228 L-10 228Z" fill={night ? "#E0D2B8" : "#F4EBD8"} />
      <path d="M-10 196 L410 196" stroke="#fff" strokeWidth={3} opacity={0.6} />
      <path d="M-10 228 L410 228 L410 310 L-10 310Z" fill={night ? "#7A4A3A" : "#9A5A42"} />
      <g>
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(${i * 108} 200)`}>
            <rect x={6} y={0} width={92} height={22} rx={4} fill={i % 2 ? "#2E6FB0" : "#C9302C"} />
            <path d="M14 11 h76" stroke="#F5D27A" strokeWidth={2.4} strokeDasharray="6 4" />
          </g>
        ))}
      </g>
    </>
  );
}

function Scene({ children }: { children: ReactNode }) {
  return <g>{children}</g>;
}

/** Grandma, with Anbessa hiding under the end of her netela, peeking out. */
function HidingPair({ x, y, s = 0.46, peek = false }: { x: number; y: number; s?: number; peek?: boolean }) {
  const cx = x - 46 * (s / 0.46);
  const k = s / 0.46;
  return (
    <g>
      <Place x={cx} y={y + 2} s={0.34 * k} tap={TAP_CUB} className={peek ? "harar-hyenas-peek" : "harar-hyenas-shiver"}>
        <CubShape pose="sit" mood={peek ? "wow" : "worried"} look={3} />
      </Place>
      {/* the end of the netela, over his head like a hood */}
      <path
        d={`M${r1(cx - 30 * k)} ${r1(y - 38 * k)} Q${r1(cx - 32 * k)} ${r1(y - 76 * k)} ${r1(cx + 2 * k)} ${r1(y - 76 * k)} Q${r1(cx + 30 * k)} ${r1(y - 74 * k)} ${r1(x - 14 * k)} ${r1(y - 60 * k)} L${r1(x - 16 * k)} ${r1(y - 46 * k)} Q${r1(cx + 6 * k)} ${r1(y - 66 * k)} ${r1(cx - 20 * k)} ${r1(y - 40 * k)}Z`}
        fill={NETELA}
      />
      <path d={`M${r1(cx - 30 * k)} ${r1(y - 38 * k)} Q${r1(cx - 26 * k)} ${r1(y - 44 * k)} ${r1(cx - 20 * k)} ${r1(y - 40 * k)}`} stroke="#2E9A8A" strokeWidth={3} fill="none" />
      <Place x={x} y={y} s={s} tap={TAP_GRANDMA}>
        <Grandma arm="down" mood="happy" />
      </Place>
    </g>
  );
}

/* ---------- the pages ---------- */

export default function HararHyenas({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Anbessa and Grandma come to Harar, the old walled city. "Which gate shall we go in?"
    case 0:
      return (
        <Scene>
          <Outside id={id} time="day" />
          <BeeFlight path="M64 150 C100 110 160 110 200 140 C240 170 300 110 338 150 C300 190 240 190 200 160 C160 130 100 190 64 150Z" dur={8} s={1} rest={[200, 140]} trailColor="#FFF6C0" />
          <Place x={130} y={292} s={0.4} from={[40, 296]} dur={2} delay={0.3} tap={TAP_CUB}>
            <CubShape pose="walk" mood="wow" look={-2} />
          </Place>
          <Place x={276} y={294} s={0.46} tap={TAP_GRANDMA}>
            <Grandma arm="raise" mood="joy" />
          </Place>
          <Say x={150} y={176} text="?" delay={2.4} color="#FFFFFF" rot={0} />
          <Air kind="day" seed={3} />
        </Scene>
      );
    // Inside, the lanes twist like a puzzle; painted houses; Lali zips round every corner. "Wait for me!"
    case 1:
      return (
        <Scene>
          <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />
          <DriftCloud y={40} s={0.6} dur={80} phase={0.3} />
          <Depth z={-0.35}>
            <House x={-10} w={70} h={150} color="#7FC0E8" />
            <House x={60} w={60} h={124} color="#F5D27A" door="#2E9A8A" delay={-2} />
            <House x={120} w={56} h={160} color="#F2A0B8" shutters="#4A7FD0" cat />
            {/* the turning lane: an arch between houses */}
            <rect x={176} y={110} width={48} height={128} fill="#E8D8C0" />
            <path d="M180 238 L180 150 Q200 120 220 150 L220 238Z" fill="#3E3448" />
            <path d="M188 238 L190 170 Q200 154 210 170 L212 238Z" fill="#5A5068" />
            <House x={224} w={66} h={138} color="#8FD3A8" door="#4A7FD0" delay={-4} />
            <House x={290} w={60} h={156} color="#FFFFFF" shutters="#E2463F" />
            <House x={350} w={70} h={128} color="#E89A6A" door="#2E9A8A" delay={-1} />
          </Depth>
          <path d="M-10 236 L410 236 L410 310 L-10 310Z" fill="#D9C2A0" />
          <g stroke="#C4AA84" strokeWidth={1.6} opacity={0.7}>
            {[40, 110, 180, 250, 320, 380].map((x, i) => (
              <path key={x} d={`M${x} ${246 + (i % 2) * 22} q8 -3 16 0 M${x - 26} ${262 + (i % 3) * 12} q8 -3 16 0`} fill="none" />
            ))}
          </g>
          <g className="harar-hyenas-zip" style={vars({ "--zx": "-110px", "--zy": "-8px" })}>
            <BeeHover x={310} y={196} s={1.1} flip />
          </g>
          <Place x={150} y={294} s={0.38} from={[20, 296]} dur={2.2} delay={0.3} tap={TAP_CUB}>
            <CubShape pose="walk" mood="joy" />
          </Place>
          <Place x={58} y={298} s={0.36} tap={TAP_GRANDMA}>
            <Grandma arm="raise" mood="happy" />
          </Place>
          <Air kind="day" seed={5} grass={false} />
        </Scene>
      );
    // A green door: Grandma's old friend Abba Yusuf, baskets on the walls. "Tonight you'll meet my night visitors."
    case 2:
      return (
        <Scene>
          <Room id={id} />
          <g transform="translate(206 254)">
            <Tappable reaction="wiggle" sound="pop">
              <ellipse cx={0} cy={6} rx={34} ry={7} fill="#000" opacity={0.15} />
              <ellipse cx={0} cy={2} rx={32} ry={7} fill="#D9A04A" />
              <path d="M-6 0 Q-12 -14 -6 -24 L6 -24 Q12 -14 6 0Z" fill="#2A1A14" />
              <path d="M-2 -24 L-1 -30 L1 -30 L2 -24Z" fill="#2A1A14" />
              <path d="M6 -16 Q16 -18 18 -8" stroke="#2A1A14" strokeWidth={3} fill="none" />
              {[-20, 18].map((dx) => (
                <g key={dx} transform={`translate(${dx} 0)`}>
                  <path d="M-4 0 L-5 -8 L5 -8 L4 0Z" fill="#FFFFFF" />
                  <path d="M-4 -6 h8" stroke="#3E7FD0" strokeWidth={1.4} />
                </g>
              ))}
            </Tappable>
          </g>
          <Place x={300} y={290} s={0.5} tap={TAP_YUSUF}>
            <AbbaYusuf arm="down" wink />
          </Place>
          <Place x={86} y={292} s={0.44} tap={TAP_GRANDMA}>
            <Grandma arm="down" mood="joy" />
          </Place>
          <Place x={160} y={296} s={0.36} tap={TAP_CUB}>
            <CubShape pose="sit" mood="wow" look={3} />
          </Place>
          <BeeHover x={236} y={150} s={1} />
          <Air kind="dusk" seed={7} grass={false} />
        </Scene>
      );
    // The sun sinks orange behind the wall. Abba Yusuf takes a basket and a long, thin stick. Out through the gate.
    case 3:
      return (
        <Scene>
          <Sky id={id} from="#3E3A8E" mid="#E8826A" to="#FFD08A" />
          <Glow x={300} y={130} r={150} color="#FFB060" strength={0.55} dur={6} />
          <g className="harar-hyenas-set">
            <Depth z={-0.8}>
              <Tappable reaction="grow" sound="chime">
                <circle cx={300} cy={126} r={26} fill="#FF9A4A" />
                <circle cx={292} cy={118} r={10} fill="#FFC27A" opacity={0.6} />
              </Tappable>
            </Depth>
          </g>
          <Stars seed={4} n={8} top={10} bottom={60} />
          <Mountains far="#A06A9A" mid="#865A88" />
          <Depth z={-0.25}>
            <Skyline y={156} mx={196} />
            <Wall y={226} dusk />
            <Gate x={110} y={226} s={0.9} frame="#4FB3C8" accent="#F5B21E" open />
          </Depth>
          <path d="M-10 226 L410 226 L410 310 L-10 310Z" fill="#C99068" />
          <path d="M90 226 L130 226 L190 310 L40 310Z" fill="#D8A07A" opacity={0.8} />
          <Place x={210} y={290} s={0.48} tap={TAP_YUSUF}>
            <AbbaYusuf arm="lamp" left="staff" />
          </Place>
          <Place x={124} y={292} s={0.36} from={[110, 240]} dur={1.6} delay={0.4} tap={TAP_CUB}>
            <CubShape pose="walk" mood="happy" />
          </Place>
          <Place x={326} y={292} s={0.42} tap={TAP_GRANDMA}>
            <Grandma arm="down" mood="happy" />
          </Place>
          <Air kind="dusk" seed={9} />
        </Scene>
      );
    // "Whoo-oop!" Two shining eyes, then four, then six. Anbessa hides under Grandma's netela.
    case 4:
      return (
        <Scene>
          <Field id={id} />
          <GroundLamp x={170} y={276} r={110} />
          <Eyes x={286} y={214} delay={1.2} />
          <Eyes x={344} y={222} delay={2.2} gx={-5} />
          <Eyes x={256} y={226} delay={3.2} s={0.8} />
          <Say x={306} y={176} text="whoop" delay={0.4} />
          <Place x={210} y={292} s={0.44} tap={TAP_YUSUF}>
            <AbbaYusuf arm="call" />
          </Place>
          <HidingPair x={106} y={292} />
          <Air kind="night" seed={11} />
        </Scene>
      );
    // Abba Yusuf calls, "Jamila… Bashir… come and eat." Out of the shadows pad the hyenas.
    case 5:
      return (
        <Scene>
          <Field id={id} />
          <GroundLamp x={196} y={278} r={130} />
          <At x={290} y={270} s={0.62} flip className="lali-move-in" style={{ "--fx": "120px", "--fy": "-30px", "--dur": "3s", "--delay": "1s" }}>
            <Hyena walk head="harar-hyenas-sniff" />
          </At>
          <At x={356} y={290} s={0.7} flip className="lali-move-in" style={{ "--fx": "100px", "--fy": "-20px", "--dur": "3s", "--delay": "1.8s" }}>
            <Hyena walk dark head="harar-hyenas-sniff" headStyle={{ "--delay": "-1s" }} />
          </At>
          <Place x={150} y={294} s={0.46} tap={TAP_YUSUF}>
            <AbbaYusuf arm="call" />
          </Place>
          <Call x={180} y={244} delay={0.2} />
          <HidingPair x={62} y={294} s={0.4} peek />
          <Air kind="night" seed={13} />
        </Scene>
      );
    // The hyenas step close, then back. "A little bit shy, just like you." A tiny hyena peeks out.
    case 6:
      return (
        <Scene>
          <Field id={id} />
          <GroundLamp x={190} y={278} r={130} />
          <At x={316} y={262} s={0.6} flip className="harar-hyenas-shy" style={{ "--sx": "-16px", "--sx2": "8px", "--delay": "0.4s" }}>
            <Hyena head="harar-hyenas-sniff" />
          </At>
          <At x={364} y={290} s={0.62} flip className="harar-hyenas-peek" style={{ "--px": "-18px", "--pr": "-5deg", "--delay": "1s" }}>
            <HyenaCub mood="wow" />
          </At>
          <At x={262} y={296} s={0.66} flip className="harar-hyenas-shy" style={{ "--sx": "-12px", "--sx2": "10px", "--delay": "1.4s" }}>
            <Hyena dark head="harar-hyenas-sniff" headStyle={{ "--delay": "-1.2s" }} />
          </At>
          <Place x={156} y={294} s={0.46} className="harar-hyenas-nod" tap={TAP_YUSUF}>
            <AbbaYusuf arm="down" wink />
          </Place>
          <HidingPair x={66} y={294} s={0.4} peek />
          <Air kind="night" seed={15} />
        </Scene>
      );
    // Abba Yusuf holds out meat on his stick, very still. Jamila stretches her neck… and takes it gently. Snap!
    case 7:
      return (
        <Scene>
          <Field id={id} />
          <GroundLamp x={150} y={282} r={130} />
          <At x={334} y={250} s={0.48} flip>
            <Hyena dark mood="happy" head="harar-hyenas-sniff" />
          </At>
          <At x={350} y={294} s={0.64} flip>
            <Hyena mood="munch" head="harar-hyenas-stretch" headStyle={{ "--nx": "17px", "--ny": "18px", "--nr": "10deg", "--delay": "0.6s" }} />
          </At>
          <Place x={130} y={288} s={0.44} tap={TAP_YUSUF}>
            <AbbaYusuf arm="stick" meat meatDelay={0.6} />
          </Place>
          <g transform="translate(266 222)">
            <g className="harar-hyenas-snap" style={vars({ "--delay": "0.6s" })}>
              <Tappable reaction="wiggle" sound="pop">
                <path d="M0 -16 L4 -6 L15 -8 L7 0 L14 9 L3 6 L0 16 L-3 6 L-14 9 L-7 0 L-15 -8 L-4 -6Z" fill="#FFF2C0" stroke="#1B2A4E" strokeWidth={2} strokeLinejoin="round" />
                <circle r={4} fill="#FFD233" />
              </Tappable>
            </g>
          </g>
          <HidingPair x={56} y={296} s={0.36} peek />
          <Air kind="night" seed={17} />
        </Scene>
      );
    // "Would you like to try, with me?" Knees go wibble-wobble. Abba Yusuf's paw on the stick, right by Anbessa's.
    case 8:
      return (
        <Scene>
          <Field id={id} />
          <GroundLamp x={120} y={284} r={130} />
          <Place x={94} y={290} s={0.44} tap={TAP_YUSUF}>
            <AbbaYusuf arm="stick" meat meatDelay={99} />
          </Place>
          <Place x={156} y={280} s={0.36} className="harar-hyenas-wobble" tap={TAP_CUB}>
            <CubArm arm="forward" mood="worried" look={3} />
          </Place>
          <At x={334} y={286} s={0.6} flip className="harar-hyenas-shy" style={{ "--sx": "-10px", "--sx2": "6px" }}>
            <Hyena head="harar-hyenas-sniff" />
          </At>
          <At x={300} y={298} s={0.56} flip className="harar-hyenas-peek" style={{ "--px": "-12px", "--pr": "-5deg", "--delay": "0.8s" }}>
            <HyenaCub mood="wow" />
          </At>
          <Wobbles x={156} y={268} />
          <Air kind="night" seed={19} />
        </Scene>
      );
    // The tiny hyena creeps closer… and takes the meat as softly as a kiss. "She did it! And so did I!"
    case 9:
      return (
        <Scene>
          <Field id={id} />
          <GroundLamp x={120} y={284} r={130} />
          <Place x={94} y={290} s={0.44} tap={TAP_YUSUF}>
            <AbbaYusuf arm="stick" meat meatDelay={3.2} />
          </Place>
          <Place x={156} y={280} s={0.36} tap={TAP_CUB}>
            <CubArm arm="forward" mood="joy" look={3} />
          </Place>
          <At x={362} y={266} s={0.5} flip>
            <Hyena head="harar-hyenas-sniff" headStyle={{ "--delay": "-0.8s" }} />
          </At>
          <g className="harar-hyenas-creep" style={vars({ "--cx": "70px", "--delay": "0.3s" })}>
            <At x={272} y={270} s={0.5} flip>
              <HyenaCub mood="munch" head="harar-hyenas-stretch" headStyle={{ "--nx": "6px", "--ny": "4px", "--nr": "6deg", "--delay": "2.4s", "--dur": "4s" }} />
            </At>
          </g>
          <Sniffs x={238} y={244} delay={0.8} />
          <Hearts spots={[[236, 216, 3.4], [254, 206, 3.8], [176, 196, 4.2]]} />
          <Air kind="night" seed={21} />
        </Scene>
      );
    // "Long ago, the people of Harar made little doors in the wall, so the hyenas could come in and tidy the streets."
    case 10:
      return (
        <Scene>
          <Sky id={id} from="#0A1036" mid="#1F2870" to="#3E4796" />
          <Stars seed={23} n={34} top={6} bottom={120} />
          <Moon x={70} y={50} r={18} />
          <Depth z={-0.3}>
            <Skyline y={162} night mx={300} />
          </Depth>
          <Wall y={252} h={92} night />
          {/* a lamp on the wall, between the two little hyena doors */}
          <g transform="translate(206 186)">
            <Glow x={0} y={10} r={60} color="#FFD27A" strength={0.4} dur={2.4} />
            <Tappable reaction="grow" sound="chime">
              <Lantern s={1.3} />
            </Tappable>
          </g>
          {[140, 274].map((x) => (
            <g key={x} transform={`translate(${x} 252)`}>
              <Tappable reaction="wiggle" sound="pop">
                <path d="M-20 0 L-20 -20 Q0 -42 20 -20 L20 0Z" fill="#FFC870" />
                <path d="M-20 0 L-20 -20 Q0 -42 20 -20 L20 0Z" fill="#FFE9A0" className="harar-hyenas-lamp" opacity={0.5} />
                <path d="M-14 0 L-12 -14 L12 -14 L14 0Z" fill="#E8A860" opacity={0.6} />
                <path d="M-20 -20 Q0 -42 20 -20" stroke="#3E3A5E" strokeWidth={4} fill="none" />
              </Tappable>
            </g>
          ))}
          <path d="M-10 252 L410 252 L410 310 L-10 310Z" fill="#26304E" />
          <path d="M-10 252 L410 252" stroke="#3E4870" strokeWidth={3} />
          <g className="lali-move-in" style={vars({ "--fx": "-70px", "--fy": "0px", "--dur": "3.4s", "--delay": "0.6s" })}>
            <At x={210} y={262} s={0.44}>
              <Hyena walk head="harar-hyenas-sniff" />
            </At>
          </g>
          <Place x={62} y={302} s={0.46} className="harar-hyenas-nod" tap={TAP_YUSUF}>
            <AbbaYusuf arm="call" />
          </Place>
          <Place x={344} y={302} s={0.38} flip tap={TAP_CUB}>
            <CubShape pose="sit" mood="wow" look={-3} />
          </Place>
          <BeeHover x={300} y={208} s={0.8} flip />
          <Air kind="night" seed={23} />
        </Scene>
      );
    // "Whoo-oop!" The hyenas trot off to the hills. The tiny one looks back. "Goodnight, little night visitor!"
    case 11:
      return (
        <Scene>
          <Field id={id} />
          <GroundLamp x={110} y={284} r={120} />
          <g className="harar-hyenas-away harar-hyenas-gone" style={vars({ "--ax": "140px", "--ay": "-40px", "--dur": "5s", "--delay": "0.6s" })}>
            <At x={290} y={262} s={0.56}>
              <Hyena walk />
            </At>
          </g>
          <g className="harar-hyenas-away harar-hyenas-gone" style={vars({ "--ax": "120px", "--ay": "-36px", "--dur": "5s", "--delay": "1s" })}>
            <At x={330} y={280} s={0.6}>
              <Hyena walk dark />
            </At>
          </g>
          <At x={250} y={282} s={0.5} className="harar-hyenas-lookback" style={{ "--delay": "2s" }}>
            <HyenaCub />
          </At>
          <Say x={330} y={196} text="whoop" delay={0.3} />
          <Place x={160} y={296} s={0.4} tap={TAP_CUB}>
            <CubArm arm="wave" mood="joy" look={3} />
          </Place>
          <Place x={64} y={294} s={0.42} tap={TAP_GRANDMA}>
            <Grandma arm="hold" mood="joy" />
          </Place>
          <Air kind="night" seed={25} />
        </Scene>
      );
    // Back inside the wall, Anbessa snuggles under a blanket. Far away, "Whoo-oop!" This time he smiles.
    case 12:
      return (
        <Scene>
          <Room id={id} night />
          {/* the window, with the hills and two tiny hyenas under the moon */}
          <g transform="translate(300 132) scale(1.3)">
            <Tappable reaction="grow" sound="chime">
              <rect x={-46} y={-40} width={92} height={70} rx={6} fill="#3A2A30" />
              <rect x={-40} y={-34} width={80} height={58} rx={4} fill="#1F2870" />
              <circle cx={18} cy={-16} r={9} fill="#F8EDC4" />
              <circle cx={-22} cy={-24} r={1.2} fill="#FFF6D8" />
              <circle cx={-6} cy={-12} r={1} fill="#FFF6D8" />
              <circle cx={30} cy={4} r={1} fill="#FFF6D8" />
              <path d="M-40 24 L-40 10 Q-10 -2 10 8 T40 4 L40 24Z" fill="#1E3A4A" />
              <g fill="#0E1A2A">
                <path d="M-14 6 q2 -6 8 -6 q4 0 5 -3 l2 0 q1 3 -2 6 l0 3 l-1 0 l0 -2 l-8 0 l0 2 l-1 0Z" />
                <path d="M4 8 q1 -4 5 -4 q3 0 3 -2 l1 0 q1 2 -1 4 l0 2 l-1 0 l0 -1 l-5 0 l0 1 l-1 0Z" />
              </g>
              <path d="M0 -40 V30 M-46 -4 H46" stroke="#3A2A30" strokeWidth={4} />
            </Tappable>
          </g>
          <Say x={282} y={108} text="whoop" delay={1.2} size={9} color="#CFE0FF" rot={-4} />
          {/* the bed */}
          <g>
            <rect x={40} y={226} width={210} height={30} rx={8} fill="#7A4A2E" />
            <rect x={44} y={214} width={60} height={22} rx={10} fill="#FFFDF4" />
          </g>
          <Place x={78} y={248} s={0.42} tap={TAP_CUB}>
            <SleepyCub />
          </Place>
          <g>
            <path d="M92 212 Q170 196 246 214 L246 250 Q170 258 92 250Z" fill="#E2463F" />
            <path d="M96 228 Q170 214 244 230" stroke="#F5B21E" strokeWidth={4} fill="none" />
            <path d="M96 238 Q170 224 244 240" stroke="#2E9A8A" strokeWidth={3} fill="none" />
          </g>
          {/* an oil lamp on the shelf */}
          <g transform="translate(330 196)">
            <Glow x={0} y={-10} r={70} color="#FFD27A" strength={0.4} dur={2.6} />
            <Tappable reaction="grow" sound="chime">
              <path d="M-12 0 Q0 8 12 0 L8 -6 L-8 -6Z" fill="#C98A3A" />
              <g className="harar-hyenas-lamp">
                <path d="M0 -20 Q6 -12 0 -6 Q-6 -12 0 -20Z" fill="#FFB84A" />
              </g>
            </Tappable>
          </g>
          <BeeHover x={196} y={176} s={0.8} />
          <Air kind="night" seed={27} grass={false} />
        </Scene>
      );
    default:
      return null;
  }
}

