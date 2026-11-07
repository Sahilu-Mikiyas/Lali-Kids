"use client";

import "./coffee-kaldi.css";

import { useId, type CSSProperties, type ReactNode } from "react";

import { CubShape, GuguShape } from "../../characters";
import { Air, BeeFlight, BeeHover, Birds, Depth, DriftCloud, Fireflies, LightRays, Moon, Mountains, Place, Sky, Stars, Sun, vars } from "../scenery";
import { Tappable, type TapReaction } from "../tappable";
import type { TapSound } from "@/lib/tap-sound";

/*
  "Kaldi and the Dancing Goats": one living picture per page (14 pages).
  Two worlds: Grandma's house today (her coffee ceremony: the roasting pan over the coals, the
  black clay jebena, little cups on the rekebot, fresh grass on the floor, popcorn), and the
  legend she tells, long ago in the green forests of Kaffa. The legend's cast is drawn here:
  Kaldi, a goatherd boy in a white shirt with a woven sash and his washint flute; his three
  goats (white, brown, and black-and-white), who can rear up and dance; and the old monk in an
  ochre robe and white cap, with his brother monks. Everyone stands with feet at (0, 0).
  Keyframes are coffee-kaldi-* in ./coffee-kaldi.css (transforms and opacity only). With
  reduced motion each page holds a readable still.
*/

const r1 = (n: number) => Math.round(n * 10) / 10;
const INK = "#2A1A10";

const SKIN = "#7A4A2E";
const SKIN_DARK = "#5E3620";
const SHIRT = "#F6F0E2";
const SASH = "#2E9A8A";
const CHERRY = "#D2333A";
const LEAF = "#2F7A46";
const BEAN = "#5A3320";
const ROBE = "#E0A64A";
const ROBE_DARK = "#C2862E";

/** Places a drawing at (x, y), scaled and flipped, tappable. */
function At({
  x,
  y,
  s = 1,
  flip = false,
  className,
  style,
  tap = true,
  reaction = "bounce",
  sound = "pop",
  children,
}: {
  x: number;
  y: number;
  s?: number;
  flip?: boolean;
  className?: string;
  style?: CSSProperties;
  tap?: boolean;
  reaction?: TapReaction;
  sound?: TapSound;
  children: ReactNode;
}) {
  const body = <g transform={`scale(${flip ? -s : s} ${s})`}>{children}</g>;
  return (
    <g transform={`translate(${r1(x)} ${r1(y)})`}>
      <g className={className} style={style}>
        {tap ? (
          <Tappable reaction={reaction} sound={sound}>
            {body}
          </Tappable>
        ) : (
          body
        )}
      </g>
    </g>
  );
}

/** A limb from its shoulder at (0, 0), pointing at `a` degrees (0 = straight down). */
function Limb({ a, len = 22, w = 7, color, hand, cls, sleeve }: { a: number; len?: number; w?: number; color: string; hand: string; cls?: string; sleeve?: string }) {
  return (
    <g transform={`rotate(${a})`}>
      <g className={cls}>
        <rect x={-w / 2} y={0} width={w} height={len} rx={w / 2} fill={color} />
        {sleeve && <rect x={-w / 2 - 0.6} y={-1} width={w + 1.2} height={len * 0.45} rx={w / 2} fill={sleeve} />}
        <circle cx={0} cy={len} r={w * 0.55} fill={hand} />
      </g>
    </g>
  );
}

type FaceMood = "happy" | "joy" | "wow" | "puzzled" | "sleepy" | "frown" | "sniff" | "bright";

/** A round, friendly face centred on (0, 0) for the people of the legend. */
function PersonFace({ mood = "happy", ink = INK, brow = INK }: { mood?: FaceMood; ink?: string; brow?: string }) {
  const shut = mood === "sleepy" || mood === "sniff" || mood === "joy";
  return (
    <g>
      {shut ? (
        <g stroke={ink} strokeWidth={1.6} fill="none" strokeLinecap="round">
          {mood === "joy" ? (
            <>
              <path d="M-7 0 Q-4.5 -3 -2 0" />
              <path d="M2 0 Q4.5 -3 7 0" />
            </>
          ) : (
            <>
              <path d="M-7 -0.5 Q-4.5 2 -2 -0.5" />
              <path d="M2 -0.5 Q4.5 2 7 -0.5" />
            </>
          )}
        </g>
      ) : (
        <g>
          {[-4.5, 4.5].map((ex) => (
            <g key={ex} className="lali-blink">
              {mood === "bright" || mood === "wow" ? <circle cx={ex} cy={-0.5} r={3} fill="#fff" /> : null}
              <ellipse cx={ex} cy={-0.5} rx={mood === "wow" || mood === "bright" ? 1.8 : 1.6} ry={mood === "wow" || mood === "bright" ? 2.1 : 2.1} fill={ink} />
              <circle cx={ex + 0.6} cy={-1.2} r={0.55} fill="#fff" />
            </g>
          ))}
        </g>
      )}
      {(mood === "frown" || mood === "puzzled" || mood === "wow") && (
        <g stroke={brow} strokeWidth={1.6} strokeLinecap="round" fill="none">
          {mood === "frown" ? (
            <>
              <path d="M-8 -5 L-2.6 -3.4" />
              <path d="M8 -5 L2.6 -3.4" />
            </>
          ) : mood === "wow" ? (
            <>
              <path d="M-7 -6 Q-4.5 -7.6 -2 -6" />
              <path d="M2 -6 Q4.5 -7.6 7 -6" />
            </>
          ) : (
            <>
              <path d="M-7 -5 L-2 -4.4" />
              <path d="M2 -5.6 Q4.5 -8 7 -6" />
            </>
          )}
        </g>
      )}
      <ellipse cx={-7.5} cy={3.6} rx={2.4} ry={1.5} fill="#FF7A6A" opacity={0.45} />
      <ellipse cx={7.5} cy={3.6} rx={2.4} ry={1.5} fill="#FF7A6A" opacity={0.45} />
      {mood === "joy" || mood === "bright" ? (
        <path d="M-4 4 Q0 9.5 4 4Z" fill="#8A2F1E" />
      ) : mood === "wow" ? (
        <ellipse cx={0} cy={5.4} rx={1.8} ry={2.4} fill="#8A2F1E" />
      ) : mood === "sleepy" ? (
        <ellipse cx={0} cy={5.4} rx={2.4} ry={3} fill="#8A2F1E" />
      ) : mood === "frown" ? (
        <path d="M-3.6 6.4 Q0 3.6 3.6 6.4" stroke={ink} strokeWidth={1.5} fill="none" strokeLinecap="round" />
      ) : mood === "puzzled" ? (
        <path d="M-3 5.6 Q0 4.6 3.4 6" stroke={ink} strokeWidth={1.4} fill="none" strokeLinecap="round" />
      ) : mood === "sniff" ? (
        <path d="M-2 5.4 Q0 6.6 2 5.4" stroke={ink} strokeWidth={1.3} fill="none" strokeLinecap="round" />
      ) : (
        <path d="M-3.6 4.2 Q0 7.6 3.6 4.2" stroke={ink} strokeWidth={1.5} fill="none" strokeLinecap="round" />
      )}
    </g>
  );
}

/* ---------- Kaldi ---------- */

type KaldiPose = "stand" | "play" | "shade" | "yawn" | "taste" | "dance" | "run" | "offer";

/** Kaldi the goatherd, facing you, feet at (0, 0); about 96 tall. */
function Kaldi({ pose = "stand", mood = "happy", basket = false }: { pose?: KaldiPose; mood?: FaceMood; basket?: boolean }) {
  const arms: Record<KaldiPose, [number, number]> = {
    stand: [16, -16],
    play: [-100, -72],
    shade: [16, 166],
    yawn: [150, -150],
    taste: [20, 146],
    dance: [140, -40],
    run: [-40, 50],
    offer: [-30, 30],
  };
  const [la, ra] = arms[pose];
  const dance = pose === "dance";
  const run = pose === "run";
  return (
    <g>
      <ellipse cx={0} cy={1} rx={20} ry={4} fill="#000" opacity={0.14} />
      {/* legs */}
      <g transform="translate(-6 -32)">
        <g transform={run ? "rotate(24)" : undefined} className={dance ? "coffee-kaldi-kick-l" : undefined}>
          <rect x={-3.6} y={0} width={7.2} height={32} rx={3.6} fill={SKIN} />
          <ellipse cx={-1} cy={31} rx={5} ry={2.6} fill={SKIN_DARK} />
        </g>
      </g>
      <g transform="translate(6 -32)">
        <g transform={run ? "rotate(-24)" : undefined} className={dance ? "coffee-kaldi-kick-r" : undefined}>
          <rect x={-3.6} y={0} width={7.2} height={32} rx={3.6} fill={SKIN} />
          <ellipse cx={1} cy={31} rx={5} ry={2.6} fill={SKIN_DARK} />
        </g>
      </g>
      <g className={dance ? undefined : "lali-breathe"}>
        <path d="M-13 -30 L-12 -42 L12 -42 L13 -30Z" fill="#8A5A36" />
        <path d="M-12 -62 Q0 -66 12 -62 L15 -34 Q0 -30 -15 -34Z" fill={SHIRT} />
        <path d="M-12 -60 L12 -38" stroke={SASH} strokeWidth={4} />
        <path d="M-12 -60 L12 -38" stroke="#F5B21E" strokeWidth={1.4} strokeDasharray="2 2" />
        <path d="M-15 -36 Q0 -32 15 -36" stroke="#E2DACA" strokeWidth={2} fill="none" />
      </g>
      <g transform="translate(-12 -59)">
        <Limb a={la} color={SKIN} hand={SKIN_DARK} sleeve={SHIRT} cls={dance ? "coffee-kaldi-arm-l" : pose === "yawn" ? "coffee-kaldi-stretch" : undefined} />
      </g>
      <g transform="translate(12 -59)">
        <Limb a={ra} color={SKIN} hand={SKIN_DARK} sleeve={SHIRT} cls={dance ? "coffee-kaldi-arm-r" : pose === "taste" ? "coffee-kaldi-nibble" : undefined} />
      </g>
      {pose === "taste" && (
        <g transform="translate(2 -71)">
          <circle r={3.2} fill={CHERRY} />
        </g>
      )}
      {pose === "dance" && (
        <g transform="translate(-30 -76)">
          <circle r={3} fill={CHERRY} />
        </g>
      )}
      {(basket || pose === "run" || pose === "offer") && (
        <g transform={pose === "run" ? "translate(-22 -44)" : pose === "offer" ? "translate(0 -36)" : "translate(18 -36)"}>
          <Basket />
        </g>
      )}
      {/* head */}
      <g transform="translate(0 -77)">
        <g className={pose === "play" ? undefined : "lali-tilt"} style={vars({ "--tilt": "7deg", "--dur": "5s" })}>
          <circle cx={-12.5} cy={1} r={3} fill={SKIN} />
          <circle cx={12.5} cy={1} r={3} fill={SKIN} />
          <circle cx={0} cy={0} r={13} fill={SKIN} />
          <g fill="#1A0F0A">
            {[
              [-10, -7],
              [-5, -11],
              [1, -12.4],
              [7, -11],
              [11, -7],
              [-2, -9],
              [4, -8],
            ].map(([hx, hy]) => (
              <circle key={`${hx}${hy}`} cx={hx} cy={hy} r={4.6} />
            ))}
          </g>
          <g transform="translate(0 2)">
            <PersonFace mood={mood} ink="#1A0F0A" brow="#1A0F0A" />
          </g>
        </g>
      </g>
      {pose === "play" && (
        <g>
          <path d="M2 -70 L34 -50" stroke="#A8783E" strokeWidth={3.4} strokeLinecap="round" />
          <g fill="#5A3A20">
            <circle cx={14} cy={-62.6} r={0.9} />
            <circle cx={20} cy={-58.8} r={0.9} />
            <circle cx={26} cy={-55} r={0.9} />
          </g>
        </g>
      )}
    </g>
  );
}

/** A woven basket heaped with red coffee cherries, centred on its base. */
function Basket({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <g fill={CHERRY}>
        {[-7, -2, 3, 8, -4, 5, 0].map((cx, i) => (
          <circle key={i} cx={cx} cy={-12 - (i > 3 ? 4 : 0)} r={3.2} />
        ))}
      </g>
      <path d="M-12 -12 L12 -12 L9 0 L-9 0Z" fill="#C99A4E" />
      <path d="M-11 -8 H11 M-10 -4 H10" stroke="#A8782E" strokeWidth={1.2} />
      <path d="M-12 -12 Q0 -26 12 -12" stroke="#A8782E" strokeWidth={1.6} fill="none" />
    </g>
  );
}

/* ---------- the goats ---------- */

type GoatColor = "white" | "brown" | "spotty";
const GOATS: Record<GoatColor, { body: string; shade: string; patch?: string }> = {
  white: { body: "#F4EEE4", shade: "#DCD2C4" },
  brown: { body: "#B8814E", shade: "#946236" },
  spotty: { body: "#F4EEE4", shade: "#DCD2C4", patch: "#3A2E2A" },
};

/** A goat, side-on, facing right, feet at (0, 0). `dance` rears it up on its back legs. */
function Goat({ color = "white", dance = false, munch = false, delay = 0, mood = "happy" }: { color?: GoatColor; dance?: boolean; munch?: boolean; delay?: number; mood?: "happy" | "joy" | "sleepy" }) {
  const c = GOATS[color];
  const leg = (x: number, col: string, kick?: string) => (
    <g transform={`translate(${x} -18)`}>
      <g className={kick} style={kick ? vars({ "--delay": `${delay}s` }) : undefined}>
        <rect x={-2.6} y={0} width={5.2} height={18} rx={2.6} fill={col} />
        <rect x={-2.6} y={15} width={5.2} height={3.4} rx={1} fill="#3A2E2A" />
      </g>
    </g>
  );
  const body = (
    <g>
      {leg(-14, c.shade)}
      {leg(14, c.shade, dance ? "coffee-kaldi-paw" : undefined)}
      <g className="lali-breathe">
        <path d="M-22 -24 Q-30 -32 -26 -36" stroke={c.body} strokeWidth={4} strokeLinecap="round" fill="none" className="coffee-kaldi-flick" />
        <ellipse cx={0} cy={-25} rx={23} ry={12} fill={c.body} />
        {c.patch && (
          <g fill={c.patch}>
            <ellipse cx={-8} cy={-28} rx={8} ry={6} />
            <ellipse cx={10} cy={-22} rx={5} ry={4} />
          </g>
        )}
        <path d="M-14 -34 Q0 -39 14 -35" stroke="#fff" strokeWidth={2.4} fill="none" strokeLinecap="round" opacity={0.5} />
      </g>
      {/* neck, head, horns and beard */}
      <g transform="translate(18 -32)">
        <g className={munch ? "coffee-kaldi-munch" : "lali-tilt"} style={vars({ "--tilt": "-8deg", "--dur": "4.4s", "--delay": `${delay}s` })}>
          <path d="M-4 4 Q2 -8 8 -14" stroke={c.body} strokeWidth={11} strokeLinecap="round" fill="none" />
          <path d="M6 -22 Q2 -32 -6 -32" stroke="#A89878" strokeWidth={2.6} fill="none" strokeLinecap="round" />
          <path d="M10 -22 Q8 -34 0 -36" stroke="#BFAF90" strokeWidth={2.4} fill="none" strokeLinecap="round" />
          <ellipse cx={2} cy={-16} rx={6} ry={2.8} fill={c.shade} transform="rotate(30 2 -16)" />
          <ellipse cx={10} cy={-16} rx={8} ry={7} fill={c.body} />
          <ellipse cx={16} cy={-12} rx={5.6} ry={4.2} fill={c.body} />
          <ellipse cx={19} cy={-13} rx={1.1} ry={0.8} fill="#7A6A5A" />
          {mood === "sleepy" ? (
            <path d="M8 -18 q2 1.6 4 0" stroke={INK} strokeWidth={1.2} fill="none" strokeLinecap="round" />
          ) : mood === "joy" ? (
            <path d="M8 -17.4 q2 -2.4 4 0" stroke={INK} strokeWidth={1.3} fill="none" strokeLinecap="round" />
          ) : (
            <g className="lali-blink">
              <circle cx={10.5} cy={-18} r={2} fill={INK} />
              <circle cx={11.1} cy={-18.6} r={0.7} fill="#fff" />
            </g>
          )}
          <path d="M14 -8 L15 -2 L17 -8Z" fill={c.shade} />
          {mood === "joy" && <path d="M14 -9.6 Q17 -7 19.6 -10" stroke="#7A4A3A" strokeWidth={1} fill="none" strokeLinecap="round" />}
          {munch && (
            <g transform="translate(20 -9)">
              <circle r={2.6} fill={CHERRY} />
            </g>
          )}
          {/* a little bell */}
          <path d="M-2 0 Q2 3 6 0" stroke="#C0392B" strokeWidth={1.6} fill="none" />
          <path d="M1 2 L5 2 L4.4 6 L1.6 6Z" fill="#F5B21E" />
        </g>
      </g>
      {leg(-8, c.body)}
      {leg(20, c.body, dance ? "coffee-kaldi-paw" : undefined)}
    </g>
  );
  return (
    <g>
      <ellipse cx={0} cy={1} rx={dance ? 14 : 26} ry={3.6} fill="#000" opacity={0.13} />
      {dance ? (
        <g className="coffee-kaldi-dance" style={vars({ "--delay": `${delay}s` })}>
          <g transform="rotate(-50 -12 0)">{body}</g>
        </g>
      ) : (
        body
      )}
    </g>
  );
}

/* ---------- the monks ---------- */

type MonkPose = "stand" | "toss" | "sip" | "candle" | "pound" | "pour";

/** A monk in an ochre robe and white cap, facing you, feet at (0, 0); about 100 tall. */
function Monk({ pose = "stand", mood = "happy", old = true }: { pose?: MonkPose; mood?: FaceMood; old?: boolean }) {
  const arms: Record<MonkPose, [number, number]> = {
    stand: [12, -12],
    toss: [12, -120],
    sip: [12, 150],
    candle: [-30, 30],
    pound: [-40, 40],
    pour: [12, -80],
  };
  const [la, ra] = arms[pose];
  return (
    <g>
      <ellipse cx={0} cy={1} rx={24} ry={4} fill="#000" opacity={0.14} />
      <g className="lali-breathe">
        <path d="M-20 0 Q-22 -40 -14 -64 Q0 -70 14 -64 Q22 -40 20 0Z" fill={ROBE} />
        <path d="M-6 -64 Q-2 -30 -8 0 M6 -64 Q2 -30 8 0" stroke={ROBE_DARK} strokeWidth={1.6} fill="none" opacity={0.6} />
        <path d="M-16 -62 Q0 -70 16 -62 Q14 -50 0 -46 Q-14 -50 -16 -62Z" fill="#FBF6EA" />
        <ellipse cx={-7} cy={0} rx={6} ry={2.6} fill="#3A2418" />
        <ellipse cx={7} cy={0} rx={6} ry={2.6} fill="#3A2418" />
      </g>
      <g transform="translate(-14 -60)">
        <Limb a={la} len={24} w={7.6} color={ROBE} hand="#6A4028" />
      </g>
      <g transform="translate(14 -60)">
        <Limb a={ra} len={24} w={7.6} color={ROBE} hand="#6A4028" cls={pose === "toss" ? "coffee-kaldi-toss" : pose === "pound" ? "coffee-kaldi-pound" : undefined} />
      </g>
      {pose === "sip" && (
        <g transform="translate(4 -66)">
          <path d="M-4 -3 L4 -3 L3 3 L-3 3Z" fill="#FFF6E8" stroke="#2E9A8A" strokeWidth={0.8} />
        </g>
      )}
      {pose === "candle" && (
        <g transform="translate(0 -40)">
          <ellipse cx={0} cy={-26} rx={16} ry={20} fill="#FFE9A0" opacity={0.3} className="lali-pulse" />
          <rect x={-2} y={-14} width={4} height={16} rx={1} fill="#FFF6E0" />
          <path d="M0 -24 Q4 -18 0 -14 Q-4 -18 0 -24Z" fill="#FFB84A" className="lali-flicker" />
        </g>
      )}
      <g transform="translate(0 -80)">
        <g className="lali-tilt" style={vars({ "--tilt": "-6deg", "--dur": "6s" })}>
          <circle cx={0} cy={0} r={12.5} fill="#6A4028" />
          {old && <path d="M-11 4 Q-12 22 0 26 Q12 22 11 4 Q6 12 0 11 Q-6 12 -11 4Z" fill="#F4F1EA" />}
          <g transform="translate(0 0)">
            <PersonFace mood={mood} ink="#1A0F0A" brow={old ? "#EDE8DC" : "#1A0F0A"} />
          </g>
          <path d="M-12 -4 Q-12 -17 0 -17 Q12 -17 12 -4 Q0 -9 -12 -4Z" fill="#FBF6EA" />
          <path d="M-12 -4 Q0 -9 12 -4" stroke="#E2DACA" strokeWidth={1.4} fill="none" />
        </g>
      </g>
    </g>
  );
}

/* ---------- places and things ---------- */

/** The tall, misty forest of Kaffa: big trunks and layered leaves. */
function Forest({ id, time = "day" }: { id: string; time?: "day" | "dusk" | "night" | "dawn" }) {
  const sky: Record<string, [string, string, string]> = {
    day: ["#8FD3C8", "#C6EBD8", "#F2FBEE"],
    dawn: ["#9AD0E8", "#FFE0B8", "#FFF6E0"],
    dusk: ["#5E57A6", "#E99A74", "#FFD48C"],
    night: ["#0E1440", "#1E2A6A", "#2E3A7A"],
  };
  const night = time === "night";
  const [a, b, c] = sky[time];
  const far = night ? "#173A3A" : time === "dusk" ? "#4E6A50" : "#5E9E6A";
  const mid = night ? "#12302E" : time === "dusk" ? "#3E5A40" : "#3E8A54";
  return (
    <>
      <Sky id={id} from={a} mid={b} to={c} />
      {night ? (
        <>
          <Stars seed={5} n={28} bottom={140} />
          <Moon x={320} y={58} r={20} />
        </>
      ) : (
        <>
          <LightRays x={time === "dusk" ? 60 : 300} y={30} />
          <Sun x={time === "dusk" ? 60 : 300} y={time === "dusk" ? 120 : 34} r={18} />
        </>
      )}
      <Depth z={-0.6}>
        <g fill={far}>
          {[20, 70, 130, 200, 260, 320, 380].map((tx, i) => (
            <g key={tx}>
              <rect x={tx - 4} y={110} width={8} height={120} fill={night ? "#0E2424" : "#4A6E4E"} />
              <ellipse cx={tx} cy={100 + (i % 2) * 14} rx={34} ry={40} />
            </g>
          ))}
        </g>
      </Depth>
      <rect x={-10} y={150} width={420} height={40} fill="#fff" opacity={night ? 0.04 : 0.18} className="coffee-kaldi-mist" />
      <Depth z={-0.3}>
        <g fill={mid}>
          {[-10, 90, 300, 410].map((tx) => (
            <g key={tx}>
              <rect x={tx - 7} y={60} width={14} height={180} fill={night ? "#0A1E1E" : "#4E3A26"} />
              <ellipse cx={tx} cy={70} rx={50} ry={46} />
            </g>
          ))}
        </g>
      </Depth>
      <path d="M-10 236 Q120 222 250 228 T410 222 L410 310 L-10 310Z" fill={night ? "#1A4A3A" : time === "dusk" ? "#5E8A4A" : "#5EAA5A"} />
    </>
  );
}

/** A coffee bush: glossy dark leaves with clusters of red cherries. Base at (x, y). */
function CoffeeBush({ x, y, s = 1, glint = true }: { x: number; y: number; s?: number; glint?: boolean }) {
  const leaves: [number, number, number][] = [
    [-26, -30, -30],
    [-14, -46, -10],
    [4, -54, 10],
    [22, -44, 30],
    [30, -26, 50],
    [-34, -14, -50],
    [12, -30, 20],
    [-6, -24, -20],
    [36, -10, 60],
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="chime">
        <ellipse cx={0} cy={2} rx={42} ry={6} fill="#000" opacity={0.12} />
        <path d="M0 0 L0 -40 M0 -20 L-20 -34 M0 -26 L22 -40" stroke="#6E4A30" strokeWidth={3} fill="none" strokeLinecap="round" />
        <g className="lali-sway" style={vars({ "--dur": "4s" })}>
          {leaves.map(([lx, ly, a], i) => (
            <g key={i} transform={`translate(${lx} ${ly}) rotate(${a})`}>
              <ellipse cx={0} cy={0} rx={7} ry={14} fill={i % 2 ? LEAF : "#3B9256"} />
              <path d="M0 -12 L0 12" stroke="#1F5A32" strokeWidth={1} />
              <ellipse cx={-2} cy={-5} rx={2} ry={5} fill="#fff" opacity={0.2} />
            </g>
          ))}
          <g fill={CHERRY}>
            {[
              [-18, -36],
              [-14, -32],
              [8, -42],
              [12, -38],
              [26, -30],
              [-26, -18],
              [-2, -14],
              [2, -12],
              [20, -14],
            ].map(([cx, cy], i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r={3.4} />
                <circle cx={cx - 1} cy={cy - 1} r={1} fill="#fff" opacity={0.5} />
              </g>
            ))}
          </g>
          {glint && (
            <g fill="#FFF6C0">
              {[
                [-30, -50, 0],
                [30, -56, -0.8],
              ].map(([gx, gy, d]) => (
                <path key={gx} d="M0 -5 Q1 -1 5 0 Q1 1 0 5 Q-1 1 -5 0 Q-1 -1 0 -5Z" transform={`translate(${gx} ${gy})`} className="lali-twinkle" style={vars({ "--delay": `${d}s`, "--dur": "1.8s" })} />
              ))}
            </g>
          )}
        </g>
      </Tappable>
    </g>
  );
}

/** A black-and-white colobus monkey on a branch in the Kaffa forest, its long white tail swaying. */
function Colobus({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-30 0 Q0 -4 34 2" stroke="#4E3A26" strokeWidth={5} strokeLinecap="round" fill="none" />
      <Tappable reaction="bounce" sound="giggle">
        <g className="lali-sway" style={vars({ "--dur": "3s" })}>
          <path d="M6 -6 Q16 20 8 44" stroke="#fff" strokeWidth={6} strokeLinecap="round" fill="none" />
        </g>
        <ellipse cx={0} cy={-10} rx={9} ry={11} fill="#1A1A1A" />
        <path d="M-10 -8 Q-14 4 -8 10 M10 -8 Q14 4 8 10" stroke="#fff" strokeWidth={3} fill="none" strokeLinecap="round" />
        <circle cx={0} cy={-24} r={7.5} fill="#1A1A1A" />
        <path d="M-7 -26 Q0 -34 7 -26" stroke="#fff" strokeWidth={2} fill="none" />
        <ellipse cx={0} cy={-22} rx={4} ry={3.6} fill="#E8DCCF" />
        <circle cx={-1.6} cy={-23} r={0.9} fill={INK} />
        <circle cx={1.6} cy={-23} r={0.9} fill={INK} />
      </Tappable>
    </g>
  );
}

/** The round monastery church on its hill, a cross on the top. Base at (x, y). */
function Monastery({ x, y, s = 1, lit = false }: { x: number; y: number; s?: number; lit?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="grow" sound="chime">
        <path d="M-40 0 L-40 -40 L40 -40 L40 0Z" fill="#D9C7A6" />
        <path d="M-40 -20 H40" stroke="#C2AE8A" strokeWidth={1.6} />
        <path d="M-48 -38 Q0 -78 48 -38 Q0 -46 -48 -38Z" fill="#B5823E" />
        <path d="M-30 -48 L0 -76 M30 -48 L0 -76 M-10 -44 L0 -76 M10 -44 L0 -76" stroke="#93682E" strokeWidth={1.6} />
        <rect x={-1.6} y={-92} width={3.2} height={18} fill="#C9A23E" />
        <path d="M-7 -86 H7 M-4 -90 L4 -82 M4 -90 L-4 -82" stroke="#F5C84A" strokeWidth={2} strokeLinecap="round" />
        <path d="M-9 0 L-9 -22 Q0 -30 9 -22 L9 0Z" fill={lit ? "#FFD27A" : "#6A4428"} />
        {lit && <path d="M-9 0 L-9 -22 Q0 -30 9 -22 L9 0Z" fill="#FFF0B8" className="lali-pulse" style={vars({ "--dur": "2.4s" })} />}
        <rect x={-30} y={-32} width={8} height={10} rx={3} fill={lit ? "#FFD27A" : "#6A4428"} />
        <rect x={22} y={-32} width={8} height={10} rx={3} fill={lit ? "#FFD27A" : "#6A4428"} />
      </Tappable>
    </g>
  );
}

/** A wood fire. `beans` puts red cherries in the flames, turning brown. */
function Fire({ x, y, s = 1, beans = false }: { x: number; y: number; s?: number; beans?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={50} ry={12} fill="#FFB84A" opacity={0.2} className="lali-pulse" style={vars({ "--dur": "1.6s" })} />
      <g fill="#8A8496">
        {[-22, -12, 0, 12, 22].map((sx) => (
          <ellipse key={sx} cx={sx} cy={2} rx={6} ry={4} />
        ))}
      </g>
      <path d="M-18 0 L18 -6 M-16 -6 L16 0" stroke="#6A4028" strokeWidth={5} strokeLinecap="round" />
      <Tappable reaction="grow" sound="pop">
        <path d="M-15 -2 Q-19 -22 -6 -32 Q-6 -20 0 -18 Q-2 -34 9 -42 Q9 -26 15 -20 Q19 -10 15 -2Z" fill="#FF8A3A" className="lali-flicker" />
        <path d="M-8 -2 Q-10 -15 -2 -22 Q0 -13 4 -13 Q4 -22 9 -26 Q13 -13 9 -2Z" fill="#FFE27A" className="lali-flicker" style={vars({ "--delay": "-0.3s" })} />
      </Tappable>
      {beans && (
        <g>
          {[-10, -3, 4, 11].map((bx, i) => (
            <g key={bx} transform={`translate(${bx} ${-4 - (i % 2) * 3})`}>
              <circle r={3} fill={CHERRY} />
              <circle r={3} fill={BEAN} className="coffee-kaldi-roast" style={vars({ "--delay": `${1.6 + i * 0.3}s` })} />
            </g>
          ))}
        </g>
      )}
      <g fill="#FFD27A">
        {[0, 0.7, 1.4].map((d, i) => (
          <circle key={d} cx={-6 + i * 6} cy={-40} r={1.6} className="coffee-kaldi-spark" style={vars({ "--delay": `${-d}s` })} />
        ))}
      </g>
    </g>
  );
}

/** Ribbons of a wonderful smell, curling up and drifting. */
function Aroma({ x, y, n = 3, color = "#8A5A36", spread = 30 }: { x: number; y: number; n?: number; color?: string; spread?: number }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke={color} strokeWidth={3.4} strokeLinecap="round" fill="none" opacity={0.75}>
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`translate(${(i - (n - 1) / 2) * spread} 0)`}>
          <path d="M0 0 q-10 -12 0 -24 t0 -24 t0 -24" className="coffee-kaldi-aroma" style={vars({ "--delay": `${-i * 0.9}s` })} />
        </g>
      ))}
    </g>
  );
}

/** Music notes drifting up from a flute or a song. */
function Notes({ x, y, color = "#1B2A4E", n = 3 }: { x: number; y: number; color?: string; n?: number }) {
  return (
    <g fill={color}>
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`translate(${x + i * 12} ${y - i * 4})`}>
          <g className="coffee-kaldi-note" style={vars({ "--delay": `${-i * 1.1}s` })}>
            <ellipse cx={0} cy={0} rx={4} ry={3} transform="rotate(-20)" />
            <rect x={2.6} y={-14} width={1.8} height={14} />
            <path d="M4.4 -14 Q11 -12 9.6 -5 Q8.4 -9 4.4 -9.6Z" />
          </g>
        </g>
      ))}
    </g>
  );
}

/** Sound arcs from a bleating goat. */
function Bleat({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke="#fff" strokeWidth={2.6} strokeLinecap="round" fill="none">
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${6 + i * 7} ${-6 - i * 3} Q${11 + i * 8} 0 ${6 + i * 7} ${6 + i * 3}`} className="coffee-kaldi-bleat" style={vars({ "--delay": `${i * 0.18}s` })} />
      ))}
    </g>
  );
}

/** Sparkles of joy, popping. */
function Joy({ spots }: { spots: [number, number, number][] }) {
  return (
    <g>
      {spots.map(([x, y, d], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <g className="coffee-kaldi-joy" style={vars({ "--delay": `${d}s` })}>
            {i % 2 ? (
              <path d="M0 8 C-10 0 -8 -10 -2 -10 C0 -10 0 -8 0 -6 C0 -8 0 -10 2 -10 C8 -10 10 0 0 8Z" fill="#E2463F" transform="scale(0.8)" />
            ) : (
              <path d="M0 -9 Q2 -2 9 0 Q2 2 0 9 Q-2 2 -9 0 Q-2 -2 0 -9Z" fill="#FFD233" />
            )}
          </g>
        </g>
      ))}
    </g>
  );
}

/** Hoofprints leading away. */
function Prints({ pts }: { pts: [number, number][] }) {
  return (
    <g fill="#8A6A48" opacity={0.6}>
      {pts.map(([px, py], i) => (
        <g key={i} transform={`translate(${px} ${py})`}>
          <ellipse cx={-1.6} cy={0} rx={1.4} ry={2.2} />
          <ellipse cx={1.6} cy={0} rx={1.4} ry={2.2} />
        </g>
      ))}
    </g>
  );
}

/** A question mark shape. */
function Query({ x, y, delay = 1 }: { x: number; y: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <g className="lali-float" style={vars({ "--rise": "-4px", "--dur": "2s" })}>
          <path d="M-6 -8 Q-6 -16 1 -16 Q8 -16 8 -9 Q8 -4 2 -1 Q0 1 0 5" stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" />
          <circle cx={0} cy={11} r={2.6} fill="#fff" />
        </g>
      </g>
    </g>
  );
}

/* ---------- Grandma's coffee ceremony ---------- */

/** The house inside: a warm wall, a window on the hills, and fresh grass strewn on the floor. */
function Room({ id, dusk = false }: { id: string; dusk?: boolean }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={dusk ? "#C98A5A" : "#E8B880"} />
          <stop offset="1" stopColor={dusk ? "#A86A44" : "#D59A62"} />
        </linearGradient>
      </defs>
      <rect width={400} height={300} fill={`url(#${id}-wall)`} />
      <Depth z={-0.4}>
        <g transform="translate(300 40)">
          <rect x={0} y={0} width={70} height={70} rx={8} fill={dusk ? "#F29A6B" : "#9ED8F4"} />
          <path d={`M0 52 Q20 40 36 46 T70 42 L70 70 L0 70Z`} fill={dusk ? "#8A6A7A" : "#7CC46C"} />
          {!dusk && <circle cx={50} cy={20} r={8} fill="#FFD54A" />}
          {dusk && <circle cx={20} cy={34} r={9} fill="#FFD27A" />}
          <rect x={0} y={0} width={70} height={70} rx={8} fill="none" stroke="#7A4A2A" strokeWidth={6} />
          <path d="M35 0 V70 M0 35 H70" stroke="#7A4A2A" strokeWidth={3} />
        </g>
      </Depth>
      {/* a woven wall hanging */}
      <Depth z={-0.25}>
        <g transform="translate(70 70)">
          <circle r={26} fill="#E2B565" />
          <circle r={19} fill="none" stroke="#C0392B" strokeWidth={3} />
          <circle r={12} fill="none" stroke="#2E9A8A" strokeWidth={3} />
          <circle r={5} fill="#F5B21E" />
        </g>
      </Depth>
      <path d="M-10 214 L410 214 L410 310 L-10 310Z" fill="#B88252" />
      <path d="M-10 214 L410 214" stroke="#9A6A40" strokeWidth={3} />
      {/* fresh green grass (ketema) on the floor */}
      <g stroke="#4FAA5E" strokeWidth={2.2} strokeLinecap="round">
        {Array.from({ length: 26 }, (_, i) => {
          const gx = 20 + ((i * 61) % 360);
          const gy = 230 + ((i * 37) % 60);
          const a = ((i * 47) % 60) - 30;
          return <path key={i} d={`M${gx} ${gy} l${r1(Math.sin((a * Math.PI) / 180) * 10)} ${r1(-Math.cos((a * Math.PI) / 180) * 10)}`} />;
        })}
      </g>
    </>
  );
}

/** The black clay jebena, spout up, with steam. Base at (0, 0). */
function Jebena({ s = 1, steam = true, tilt = 0 }: { s?: number; steam?: boolean; tilt?: number }) {
  return (
    <g transform={`scale(${s}) rotate(${tilt})`}>
      <Tappable reaction="wiggle" sound="chime">
        <path d="M-14 0 Q-22 -16 -10 -24 L-6 -40 Q0 -44 6 -40 L10 -24 Q22 -16 14 0Z" fill="#2A1A14" />
        <path d="M10 -20 Q20 -24 22 -34" stroke="#2A1A14" strokeWidth={4} fill="none" strokeLinecap="round" />
        <path d="M-10 -20 Q-20 -18 -15 -8" stroke="#2A1A14" strokeWidth={3} fill="none" />
        <ellipse cx={-4} cy={-14} rx={2.6} ry={6} fill="#fff" opacity={0.18} />
        <path d="M-8 -28 Q0 -30 8 -28" stroke="#C0392B" strokeWidth={1.6} fill="none" />
        <circle cx={0} cy={-43} r={3} fill="#E2DACA" />
        {steam && (
          <g fill="#fff">
            {[0, 1.1, 2.2].map((d) => (
              <circle key={d} cx={22} cy={-38} r={3} className="lali-smoke" style={vars({ "--delay": `${-d}s`, "--dur": "3.3s" })} />
            ))}
          </g>
        )}
      </Tappable>
    </g>
  );
}

/** A small handleless coffee cup (sini). */
function Sini({ x, y, full = false, s = 1 }: { x: number; y: number; full?: boolean; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-6 -9 L6 -9 L4.6 0 L-4.6 0Z" fill="#FFF6E8" />
      <path d="M-6 -9 L6 -9" stroke="#2E9A8A" strokeWidth={1.4} />
      <path d="M-5 -5 H5" stroke="#E2463F" strokeWidth={0.8} />
      {full && <ellipse cx={0} cy={-8.4} rx={5.2} ry={1.4} fill="#4A2A18" />}
    </g>
  );
}

/** The rekebot: a low wooden stand with little cups on it. */
function Rekebot({ x, y, s = 1, cups = 6 }: { x: number; y: number; s?: number; cups?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="chime">
        <ellipse cx={0} cy={2} rx={46} ry={6} fill="#000" opacity={0.12} />
        <rect x={-44} y={-12} width={88} height={8} rx={3} fill="#8A5A36" />
        <rect x={-40} y={-4} width={8} height={6} fill="#6E4428" />
        <rect x={32} y={-4} width={8} height={6} fill="#6E4428" />
        {Array.from({ length: cups }, (_, i) => (
          <Sini key={i} x={-33 + i * 13} y={-12} />
        ))}
      </Tappable>
    </g>
  );
}

/** The charcoal stove (a clay fire bowl) with the roasting pan of beans on it. */
function Roasting({ x, y, s = 1, smoke = true }: { x: number; y: number; s?: number; smoke?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={30} ry={5} fill="#000" opacity={0.14} />
      <path d="M-22 0 L-26 -18 L26 -18 L22 0Z" fill="#9A5A36" />
      <ellipse cx={0} cy={-18} rx={26} ry={5} fill="#7A3E22" />
      <g fill="#FF8A3A" className="lali-flicker">
        <ellipse cx={-8} cy={-19} rx={6} ry={2} />
        <ellipse cx={8} cy={-19} rx={5} ry={2} />
      </g>
      <Tappable reaction="wiggle" sound="pop">
        <g className="coffee-kaldi-shake-pan">
          <ellipse cx={0} cy={-24} rx={28} ry={6} fill="#3A3A42" />
          <path d="M26 -25 L58 -40" stroke="#3A3A42" strokeWidth={4} strokeLinecap="round" />
          <g fill={BEAN}>
            {[-16, -9, -2, 5, 12, -12, 0, 9].map((bx, i) => (
              <ellipse key={i} cx={bx} cy={-26 + (i > 4 ? 2 : 0)} rx={2.6} ry={1.8} />
            ))}
          </g>
        </g>
      </Tappable>
      {smoke && (
        <g fill="#fff" opacity={0.85}>
          {[0, 1, 2].map((d) => (
            <circle key={d} cx={0} cy={-32} r={6} className="lali-smoke" style={vars({ "--delay": `${-d * 1.2}s`, "--dur": "3.6s" })} />
          ))}
        </g>
      )}
    </g>
  );
}

/** A bowl of popcorn, with a kernel popping out now and then. */
function Popcorn({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="grow" sound="pop">
        <g fill="#FFF8E6">
          {[-12, -4, 4, 12, -8, 0, 8].map((px, i) => (
            <circle key={i} cx={px} cy={-10 - (i > 3 ? 6 : 0)} r={5} />
          ))}
        </g>
        <path d="M-18 -10 Q-16 4 0 4 Q16 4 18 -10Z" fill="#C0392B" />
        <path d="M-18 -10 H18" stroke="#F5B21E" strokeWidth={2} />
      </Tappable>
      {[0, 1.3].map((d, i) => (
        <g key={d} transform={`translate(${i ? 6 : -4} -18)`}>
          <circle r={4} fill="#FFF8E6" className="coffee-kaldi-pop" style={vars({ "--delay": `${-d}s`, "--dx": i ? "14px" : "-12px" })} />
        </g>
      ))}
    </g>
  );
}

const TAP_KALDI = { reaction: "bounce", sound: "giggle" } as const;
const TAP_GOAT = { reaction: "bounce", sound: "baa" } as const;
const TAP_MONK = { reaction: "grow", sound: "chime" } as const;
const TAP_GUGU = { reaction: "wiggle", sound: "boing" } as const;

/* ---------- the pages ---------- */

export default function CoffeeKaldi({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Crackle, pop! Grandma roasts coffee. "Grandma, who found the very first coffee?"
    case 0:
      return (
        <g>
          <Room id={id} />
          <Rekebot x={262} y={226} s={0.75} />
          <Place x={118} y={280} s={0.58}>
            <CubShape pose="sit" granny mood="happy" look={2} />
          </Place>
          <Roasting x={200} y={286} s={1.2} />
          <Aroma x={200} y={234} n={2} color="#C79A6A" spread={26} />
          <Place x={322} y={292} s={0.48} flip tap={{ reaction: "bounce", sound: "giggle" }}>
            <CubShape pose="sit" mood="wow" look={-3} />
          </Place>
          <Place x={38} y={296} s={0.34} tap={TAP_GUGU}>
            <g className="coffee-kaldi-sniff">
              <GuguShape pose="sit" mood="happy" />
            </g>
          </Place>
          <Query x={338} y={150} delay={1.4} />
          <BeeHover x={240} y={110} s={0.9} flip />
          <Air kind="dusk" seed={2} grass={false} />
        </g>
      );
    // "People tell an old, old legend. Long ago, in the green forests of Kaffa, lived a goatherd named Kaldi…"
    case 1:
      return (
        <g>
          <Forest id={id} time="day" />
          <Colobus x={64} y={110} s={1} />
          <Birds y={50} dur={20} phase={0.4} color="#2E4A3E" />
          <g className="lali-move-in" style={vars({ "--fx": "-140px", "--dur": "4s", "--delay": "0.3s" })}>
            <At x={180} y={272} s={0.95} {...TAP_KALDI}>
              <g className="coffee-kaldi-walk">
                <Kaldi pose="stand" mood="happy" />
              </g>
            </At>
            <At x={240} y={270} s={0.8} {...TAP_GOAT}>
              <g className="coffee-kaldi-trot">
                <Goat color="white" />
              </g>
            </At>
            <At x={120} y={276} s={0.85} {...TAP_GOAT}>
              <g className="coffee-kaldi-trot" style={vars({ "--delay": "-0.2s" })}>
                <Goat color="brown" />
              </g>
            </At>
            <At x={290} y={278} s={0.75} {...TAP_GOAT}>
              <g className="coffee-kaldi-trot" style={vars({ "--delay": "-0.1s" })}>
                <Goat color="spotty" />
              </g>
            </At>
          </g>
          <Depth z={0.4}>
            <CoffeeBush x={370} y={300} s={0.8} glint={false} />
          </Depth>
          <BeeHover x={330} y={150} s={0.9} flip />
          <Air kind="day" seed={4} />
        </g>
      );
    // Every evening Kaldi played his washint, and his goats came running. But one evening, they did not come.
    case 2:
      return (
        <g>
          <Forest id={id} time="dusk" />
          <path d="M210 310 Q250 270 300 250 Q340 236 410 232" stroke="#C9A06A" strokeWidth={12} fill="none" opacity={0.6} />
          <Prints pts={[[250, 280], [270, 266], [292, 256], [316, 248], [340, 242], [366, 238]]} />
          <g transform="translate(120 284)">
            <path d="M-40 0 Q-36 -30 0 -32 Q36 -30 40 0Z" fill="#8C8496" />
          </g>
          <At x={120} y={256} s={1.1} {...TAP_KALDI}>
            <g className="coffee-kaldi-play">
              <Kaldi pose="play" mood="puzzled" />
            </g>
          </At>
          <Notes x={166} y={150} color="#FFF6D8" />
          <Query x={300} y={176} delay={1.8} />
          <BeeHover x={60} y={150} s={0.9} />
          <Air kind="dusk" seed={6} />
        </g>
      );
    // Kaldi searches the forest. "Maa! Maa!" His goats are nibbling bright red berries from a shiny green bush.
    case 3:
      return (
        <g>
          <Forest id={id} time="day" />
          <CoffeeBush x={260} y={272} s={1.4} />
          <At x={200} y={278} s={0.85} {...TAP_GOAT}>
            <Goat color="white" munch />
          </At>
          <At x={330} y={280} s={0.8} flip {...TAP_GOAT}>
            <Goat color="brown" munch delay={-1} />
          </At>
          <At x={278} y={292} s={0.75} {...TAP_GOAT}>
            <Goat color="spotty" munch delay={-2} />
          </At>
          <Bleat x={236} y={226} />
          <Depth z={0.3}>
            <rect x={44} y={40} width={22} height={270} fill="#4E3A26" />
            <ellipse cx={55} cy={40} rx={60} ry={40} fill="#2E6A40" />
            <At x={86} y={290} s={1.05} {...TAP_KALDI}>
              <g className="coffee-kaldi-peek">
                <Kaldi pose="shade" mood="wow" />
              </g>
            </At>
          </Depth>
          <BeeHover x={320} y={160} s={0.9} flip />
          <Air kind="day" seed={8} />
        </g>
      );
    // The goats begin to dance! They hop on their back legs, kick and spin. Hop, skip, twirl!
    case 4:
      return (
        <g>
          <Forest id={id} time="day" />
          <CoffeeBush x={200} y={250} s={1.1} />
          <At x={130} y={276} s={1} {...TAP_GOAT}>
            <Goat color="white" dance mood="joy" />
          </At>
          <At x={270} y={276} s={1} flip {...TAP_GOAT}>
            <Goat color="brown" dance mood="joy" delay={-0.3} />
          </At>
          <At x={200} y={294} s={0.95} {...TAP_GOAT}>
            <Goat color="spotty" dance mood="joy" delay={-0.6} />
          </At>
          <Notes x={90} y={170} color="#2E4A8C" />
          <Notes x={280} y={160} color="#C0392B" />
          <Joy spots={[[160, 150, 0.4], [240, 140, 0.9], [200, 120, 1.4], [120, 190, 1.9], [300, 190, 2.4]]} />
          <At x={356} y={284} s={0.8} flip {...TAP_KALDI}>
            <Kaldi pose="stand" mood="wow" />
          </At>
          <BeeFlight path="M60 120 C100 80 160 90 180 120 C200 150 140 160 110 140 C80 120 50 140 60 120Z" dur={4.5} s={0.9} rest={[110, 110]} happy />
          <Air kind="day" seed={10} />
        </g>
      );
    // The moon comes up, and still they dance. Kaldi yawns. "Don't you goats ever sleep?"
    case 5:
      return (
        <g>
          <Forest id={id} time="night" />
          <Fireflies seed={7} n={9} top={150} bottom={270} />
          <CoffeeBush x={250} y={250} s={1} glint={false} />
          <At x={200} y={278} s={0.9} {...TAP_GOAT}>
            <Goat color="white" dance mood="joy" />
          </At>
          <At x={310} y={280} s={0.9} flip {...TAP_GOAT}>
            <Goat color="brown" dance mood="joy" delay={-0.4} />
          </At>
          <At x={262} y={296} s={0.85} {...TAP_GOAT}>
            <Goat color="spotty" dance mood="joy" delay={-0.8} />
          </At>
          <Notes x={250} y={170} color="#FFF6D8" />
          <Depth z={0.3}>
            <rect x={14} y={60} width={20} height={250} fill="#0A1E1E" />
            <At x={84} y={292} s={1} {...TAP_KALDI}>
              <Kaldi pose="yawn" mood="sleepy" />
            </At>
          </Depth>
          <Air kind="night" seed={12} />
        </g>
      );
    // In the morning Kaldi tastes one red berry. Sweet! Soon he is dancing too! Hop, skip, twirl!
    case 6:
      return (
        <g>
          <Forest id={id} time="dawn" />
          <CoffeeBush x={70} y={262} s={1.1} />
          <g className="coffee-kaldi-out">
            <At x={176} y={280} s={1.1} {...TAP_KALDI}>
              <Kaldi pose="taste" mood="happy" />
            </At>
          </g>
          <g className="coffee-kaldi-in">
            <At x={176} y={280} s={1.1} {...TAP_KALDI}>
              <g className="coffee-kaldi-bounce">
                <Kaldi pose="dance" mood="joy" />
              </g>
            </At>
          </g>
          <At x={270} y={278} s={0.85} flip {...TAP_GOAT}>
            <Goat color="white" dance mood="joy" />
          </At>
          <At x={340} y={284} s={0.8} flip {...TAP_GOAT}>
            <Goat color="spotty" dance mood="joy" delay={-0.5} />
          </At>
          <Joy spots={[[150, 150, 2.6], [200, 136, 3], [240, 160, 3.4]]} />
          <BeeHover x={110} y={140} s={0.9} />
          <Air kind="day" seed={14} />
        </g>
      );
    // Kaldi fills his basket and runs up the hill to the monastery. "Father! Look at the berries!"
    case 7:
      return (
        <g>
          <Sky id={id} from="#86CDF5" mid="#BDE6FA" to="#F3FBFF" />
          <LightRays x={60} y={50} />
          <Sun x={60} y={50} r={20} />
          <DriftCloud y={50} s={0.6} dur={80} phase={0.3} />
          <Mountains far="#B4C4E6" mid="#8DA6D2" />
          <path d="M-10 310 L-10 270 Q120 250 220 200 Q280 160 330 150 Q380 146 410 150 L410 310Z" fill="#6DB863" />
          <path d="M60 310 Q140 270 200 236 Q260 200 300 176" stroke="#D9B07A" strokeWidth={10} fill="none" strokeLinecap="round" />
          <Monastery x={334} y={156} s={0.8} />
          <g className="lali-move-in" style={vars({ "--fx": "-70px", "--fy": "40px", "--dur": "3s", "--delay": "0.3s" })}>
            <At x={196} y={240} s={0.9} {...TAP_KALDI}>
              <g className="coffee-kaldi-run">
                <Kaldi pose="run" mood="joy" />
              </g>
            </At>
          </g>
          <g className="lali-move-in" style={vars({ "--fx": "-60px", "--fy": "30px", "--dur": "3.2s", "--delay": "0.4s" })}>
            <At x={130} y={278} s={0.7} {...TAP_GOAT}>
              <g className="coffee-kaldi-trot">
                <Goat color="spotty" mood="joy" />
              </g>
            </At>
          </g>
          <BeeHover x={260} y={130} s={0.9} />
          <Air kind="day" seed={16} />
        </g>
      );
    // The old monk frowns. "Dancing berries? Nonsense!" He tosses them into the fire. Crackle, pop!
    case 8:
      return (
        <g>
          <Sky id={id} from="#86C6EE" mid="#CFE6F0" to="#FFF0D2" />
          <Mountains far="#B9BEDC" mid="#97A2C8" />
          <Depth z={-0.2}>
            <Monastery x={300} y={214} s={1} />
          </Depth>
          <path d="M-10 214 L410 214 L410 310 L-10 310Z" fill="#CDB48A" />
          <path d="M-10 214 L410 214" stroke="#B59A6E" strokeWidth={3} />
          <Fire x={200} y={276} s={1.2} beans />
          {[
            [0, -60, 0.6],
            [10, -70, 0.75],
            [-8, -66, 0.9],
          ].map(([dx, dy, d], i) => (
            <g key={i} transform={`translate(${196 + dx * 0.4} 264)`}>
              <g className="coffee-kaldi-toss-cherry" style={vars({ "--fx": `${70 + dx}px`, "--fy": `${dy}px`, "--delay": `${d}s` })}>
                <circle r={3.4} fill={CHERRY} />
              </g>
            </g>
          ))}
          <At x={280} y={290} s={1.2} {...TAP_MONK}>
            <Monk pose="toss" mood="frown" />
          </At>
          <At x={92} y={290} s={1.05} {...TAP_KALDI}>
            <Kaldi pose="offer" mood="wow" />
          </At>
          <BeeHover x={150} y={140} s={0.9} />
          <Air kind="day" seed={18} grass={false} />
        </g>
      );
    // A wonderful smell curls out of the fire. Sniff, sniff! All the monks come running.
    case 9:
      return (
        <g>
          <Sky id={id} from="#86C6EE" mid="#CFE6F0" to="#FFF0D2" />
          <Mountains far="#B9BEDC" mid="#97A2C8" />
          <Depth z={-0.2}>
            <Monastery x={200} y={200} s={0.9} />
          </Depth>
          <path d="M-10 214 L410 214 L410 310 L-10 310Z" fill="#CDB48A" />
          <Fire x={200} y={280} s={1.1} beans />
          <Aroma x={200} y={240} n={4} spread={34} />
          <At x={120} y={290} s={1.1} {...TAP_MONK}>
            <g className="coffee-kaldi-sniff">
              <Monk pose="stand" mood="sniff" />
            </g>
          </At>
          <g className="lali-move-in" style={vars({ "--fx": "90px", "--dur": "1.6s", "--delay": "0.6s" })}>
            <At x={300} y={286} s={0.95} {...TAP_MONK}>
              <Monk pose="stand" mood="wow" old={false} />
            </At>
          </g>
          <g className="lali-move-in" style={vars({ "--fx": "80px", "--dur": "1.8s", "--delay": "1s" })}>
            <At x={350} y={278} s={0.85} {...TAP_MONK}>
              <Monk pose="stand" mood="sniff" />
            </At>
          </g>
          <At x={48} y={292} s={0.9} {...TAP_KALDI}>
            <Kaldi pose="stand" mood="joy" />
          </At>
          <BeeHover x={290} y={150} s={0.9} flip />
          <Air kind="day" seed={20} grass={false} />
        </g>
      );
    // They crush the roasted beans and pour hot water over them: the very first pot of coffee.
    case 10:
      return (
        <g>
          <Sky id={id} from="#E9A27A" mid="#FFCF98" to="#FFEFC8" />
          <Mountains far="#C8A6A6" mid="#AA8A94" />
          <path d="M-10 214 L410 214 L410 310 L-10 310Z" fill="#C9AA7E" />
          <Fire x={70} y={262} s={0.8} />
          {/* the mortar, pounding */}
          <g transform="translate(150 286)">
            <ellipse cx={0} cy={1} rx={20} ry={4} fill="#000" opacity={0.14} />
            <path d="M-16 0 L-18 -24 L18 -24 L16 0Z" fill="#8A5A36" />
            <ellipse cx={0} cy={-24} rx={18} ry={4} fill="#5A3320" />
          </g>
          <At x={150} y={290} s={1.1} {...TAP_MONK}>
            <g>
              <g className="coffee-kaldi-pestle">
                <path d="M16 -90 L4 -30" stroke="#A8783E" strokeWidth={5} strokeLinecap="round" />
              </g>
              <g transform="translate(-20 0)">
                <Monk pose="pound" mood="happy" />
              </g>
            </g>
          </At>
          <g transform="translate(266 292)">
            <Tappable reaction="wiggle" sound="chime">
              <ellipse cx={0} cy={-24} rx={28} ry={30} fill="#FFE9A0" opacity={0.35} className="lali-pulse" />
            </Tappable>
            <Jebena s={1} />
          </g>
          <At x={350} y={292} s={0.9} flip {...TAP_MONK}>
            <Monk pose="pour" mood="joy" old={false} />
          </At>
          {/* hot water pouring from a kettle into the jebena */}
          <g transform="translate(312 228)">
            <g transform="rotate(-24)">
              <path d="M-12 4 Q-14 -14 0 -16 Q14 -14 12 4Z" fill="#9AA0B4" />
              <path d="M-11 -4 L-22 -10" stroke="#9AA0B4" strokeWidth={4} strokeLinecap="round" />
              <ellipse cx={0} cy={-16} rx={5} ry={2} fill="#7A8296" />
            </g>
          </g>
          <path d="M292 224 Q272 228 268 246" stroke="#BFE6FA" strokeWidth={3} fill="none" strokeLinecap="round" className="coffee-kaldi-pour" />
          <BeeHover x={210} y={130} s={0.9} />
          <Air kind="dusk" seed={22} grass={false} />
        </g>
      );
    // The monks sip. Their eyes open wide. They stay awake for their prayers, bright as stars. The goats? Still dancing!
    case 11:
      return (
        <g>
          <Sky id={id} from="#0E1440" mid="#26307A" to="#4A4F9E" />
          <Stars seed={9} n={34} bottom={180} />
          <Moon x={60} y={56} r={20} />
          <Depth z={-0.3}>
            <path d="M200 200 Q290 150 410 160 L410 220 L200 220Z" fill="#24485C" />
            <g transform="translate(330 166)">
              {[-26, 0, 26].map((gx, i) => (
                <At key={gx} x={gx} y={0} s={0.4} {...TAP_GOAT}>
                  <Goat color={(["white", "brown", "spotty"] as const)[i]} dance mood="joy" delay={-i * 0.3} />
                </At>
              ))}
            </g>
          </Depth>
          <Depth z={-0.2}>
            <Monastery x={110} y={214} s={0.9} lit />
          </Depth>
          <path d="M-10 214 L410 214 L410 310 L-10 310Z" fill="#3A3A5A" />
          {[
            [100, 0, true],
            [190, 0.4, false],
            [280, 0.8, true],
          ].map(([mx, d, old], i) => (
            <At key={i} x={mx as number} y={292} s={1} {...TAP_MONK}>
              <g className="coffee-kaldi-sway" style={vars({ "--delay": `${-(d as number)}s` })}>
                <Monk pose={i === 1 ? "sip" : "candle"} mood="bright" old={old as boolean} />
              </g>
            </At>
          ))}
          <Air kind="night" seed={24} grass={false} />
        </g>
      );
    // "And from Kaffa, coffee travelled all around the world." Grandma pours three cups: abol, tona and bereka.
    case 12:
      return (
        <g>
          <Room id={id} dusk />
          <Place x={110} y={276} s={0.52}>
            <CubShape pose="sit" granny mood="happy" look={3} />
          </Place>
          <g transform="translate(178 248)">
            <g className="coffee-kaldi-pour-pot">
              <Jebena s={1.1} tilt={-50} steam={false} />
            </g>
          </g>
          <path d="M206 236 Q214 248 214 262" stroke="#5A3320" strokeWidth={2.6} fill="none" strokeLinecap="round" className="coffee-kaldi-pour" />
          <g transform="translate(0 0)">
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(${214 + i * 26} 274)`}>
                <g className="lali-pop-in" style={vars({ "--delay": `${0.8 + i * 0.8}s` })}>
                  <Tappable reaction="grow" sound="chime">
                    <Sini x={0} y={0} full s={1.6} />
                    <g fill="#FFD233">
                      {Array.from({ length: i + 1 }, (_, k) => (
                        <circle key={k} cx={(k - i / 2) * 5} cy={8} r={1.8} />
                      ))}
                    </g>
                  </Tappable>
                  <g fill="#fff" opacity={0.8}>
                    <circle cx={0} cy={-18} r={2.6} className="lali-smoke" style={vars({ "--delay": `${-i}s`, "--dur": "3s" })} />
                  </g>
                </g>
              </g>
            ))}
          </g>
          {/* the steam becomes a little world, with cups all round it */}
          <g transform="translate(260 140)">
            <g className="lali-fade-in" style={vars({ "--delay": "2.8s", "--dur": "1.4s" })}>
              <Tappable reaction="spin" sound="chime">
                <circle r={30} fill="#9ED8F4" opacity={0.9} />
                <path d="M-20 -10 Q-10 -20 0 -14 Q6 -4 -4 2 Q-14 6 -20 -10Z M6 8 Q16 2 22 10 Q18 22 8 20Z M8 -22 Q16 -24 20 -16 Q12 -12 8 -22Z" fill="#7CC46C" />
                <circle r={30} fill="none" stroke="#fff" strokeWidth={2} opacity={0.7} />
              </Tappable>
              <g className="coffee-kaldi-orbit">
                {[0, 120, 240].map((a) => (
                  <g key={a} transform={`rotate(${a}) translate(44 0) rotate(${-a})`}>
                    <Sini x={0} y={4} full s={0.9} />
                  </g>
                ))}
              </g>
            </g>
          </g>
          <Place x={350} y={292} s={0.36} flip tap={{ reaction: "bounce", sound: "giggle" }}>
            <CubShape pose="sit" mood="wow" look={-3} />
          </Place>
          <BeeHover x={60} y={140} s={0.9} />
          <Air kind="dusk" seed={26} grass={false} />
        </g>
      );
    // Coffee is for grown-ups, so the children have popcorn. Gugu jumps up: "Hop, skip, twirl!" Everyone dances.
    case 13:
      return (
        <g>
          <Room id={id} dusk />
          <Rekebot x={206} y={230} s={0.7} cups={5} />
          <Popcorn x={200} y={276} s={1.3} />
          <Place x={70} y={286} s={0.42} className="coffee-kaldi-dance-b">
            <CubShape pose="sit" granny mood="joy" />
          </Place>
          <Place x={140} y={290} s={0.38} className="coffee-kaldi-dance-a" tap={{ reaction: "bounce", sound: "giggle" }}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Place x={276} y={284} s={0.38} className="coffee-kaldi-hop" tap={TAP_GUGU}>
            <GuguShape pose="hop" mood="joy" />
          </Place>
          <Place x={346} y={294} s={0.32} className="coffee-kaldi-dance-a" tap={{ reaction: "wiggle", sound: "giggle" }}>
            <g>
              <GuguShape pose="wave" mood="joy" />
              <g className="lali-breathe">
                <path d="M50 212 Q100 204 150 212 L158 234 Q100 240 42 234Z" fill="#4A7FD0" />
                <path d="M50 212 Q100 204 150 212" stroke="#2F5FA8" strokeWidth={4} fill="none" />
              </g>
              <path d="M100 30 L74 16 Q68 30 74 44Z M100 30 L126 16 Q132 30 126 44Z" fill="#FFD233" />
              <circle cx={100} cy={30} r={7} fill="#F5B21E" />
            </g>
          </Place>
          <Notes x={200} y={150} color="#7A3A20" />
          <Joy spots={[[100, 160, 0.4], [180, 130, 0.9], [270, 150, 1.4], [330, 170, 1.9]]} />
          <BeeFlight path="M120 110 C170 60 250 60 280 110 C250 150 170 150 120 110Z" dur={4.5} s={0.9} rest={[200, 90]} trailColor="#FFE9A0" happy />
          <Air kind="dusk" seed={28} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
