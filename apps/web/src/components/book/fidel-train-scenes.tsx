"use client";

import { useId, type CSSProperties, type ReactNode } from "react";

import { CubShape } from "../characters";
import { Tappable } from "./tappable";
import { Acacia, BeeFlight, BeeHover, Birds, Daisy, DriftCloud, Grass, Hills, Moon, Mountains, Place, rand, Sky, Stars, Sun, Tukul, vars, Water } from "./scenery";

/*
  "The Fidel Train ሀ ሁ ሂ": one living picture per page (12 pages).
  The letters ride as little characters ("pals"): a round head with a face on a soft body
  that wears its letter, big and white, so the fidel stays clear at phone size.
  Families, in order: ሀ ሁ ሂ ሃ ሄ ህ ሆ, ለ ሉ ሊ ላ ሌ ል ሎ, መ ሙ ሚ ማ ሜ ም ሞ.
  (The full fidel order is ሀ ለ ሐ መ …; ሐ sounds like ሀ in Amharic, and the story keeps to
  three families with three different sounds. The editor may want to add a ሐ stop.)

  Train drawings use their own units: rails at y = 0, the engine's front to the right.
  A moving train stays put while the land scrolls past (fidel-train-scroll), so it never
  leaves the picture. Keyframes are fidel-train-* in globals.css.
*/

const r1 = (n: number) => Math.round(n * 10) / 10;

const FIDEL_FONT: CSSProperties = { fontFamily: "var(--font-noto-ethiopic), 'Noto Sans Ethiopic', sans-serif" };

type Family = { letters: string[]; body: string; head: string; car: string };

const HA: Family = { letters: ["ሀ", "ሁ", "ሂ", "ሃ", "ሄ", "ህ", "ሆ"], body: "#E8513B", head: "#FFC2AE", car: "#3D7BD9" };
const LA: Family = { letters: ["ለ", "ሉ", "ሊ", "ላ", "ሌ", "ል", "ሎ"], body: "#E58A00", head: "#FFE0A6", car: "#8E5BD6" };
const MA: Family = { letters: ["መ", "ሙ", "ሚ", "ማ", "ሜ", "ም", "ሞ"], body: "#1F8A8A", head: "#A8E6D8", car: "#F2B705" };

const INK = "#2A1A10";

/* ---------- the letter pals ---------- */

/** One letter as a little character, feet at (0, 0), about 72 units tall. */
function Pal({
  g,
  fam,
  wave = false,
  basket = false,
  look = 0,
  delay = 0,
  mood = "happy",
}: {
  g: string;
  fam: Family;
  wave?: boolean;
  basket?: boolean;
  look?: number;
  delay?: number;
  mood?: "happy" | "joy";
}) {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={17} ry={3.5} fill="#000" opacity={0.14} />
      <ellipse cx={-8} cy={-3} rx={7.5} ry={4.5} fill={INK} opacity={0.85} />
      <ellipse cx={8} cy={-3} rx={7.5} ry={4.5} fill={INK} opacity={0.85} />
      <g className="lali-breathe" style={vars({ "--delay": `${delay}s` })}>
        {/* arms */}
        <path d="M-17 -30 Q-26 -24 -24 -14" stroke={fam.body} strokeWidth={7} fill="none" strokeLinecap="round" />
        {wave ? (
          <g className="fidel-train-wave" style={vars({ "--delay": `${delay}s` })}>
            <path d="M17 -32 Q28 -40 26 -54" stroke={fam.body} strokeWidth={7} fill="none" strokeLinecap="round" />
            <circle cx={26} cy={-56} r={4.6} fill={fam.head} />
          </g>
        ) : (
          <path d="M17 -30 Q26 -24 24 -14" stroke={fam.body} strokeWidth={7} fill="none" strokeLinecap="round" />
        )}
        <rect x={-19} y={-46} width={38} height={42} rx={13} fill={fam.body} />
        <rect x={-13} y={-42} width={14} height={5} rx={2.5} fill="#fff" opacity={0.3} />
        <text x={0} y={-12} fontSize={30} fontWeight={700} fill="#fff" textAnchor="middle" style={FIDEL_FONT}>
          {g}
        </text>
        {basket && (
          <g transform="translate(-9 8)">
            <path d="M-30 -20 Q-30 -6 -18 -6 Q-8 -6 -8 -20Z" fill="#C98A3A" />
            <path d="M-30 -20 Q-19 -30 -8 -20" stroke="#8A5A26" strokeWidth={2} fill="none" />
            <circle cx={-22} cy={-22} r={4} fill="#E8413B" />
            <circle cx={-15} cy={-23} r={4} fill="#3FB45A" />
          </g>
        )}
        {/* head */}
        <g className="lali-tilt" style={vars({ "--tilt": `${look >= 0 ? 8 : -8}deg`, "--delay": `${delay * 2}s`, "--dur": "5s" })}>
          <circle cx={0} cy={-58} r={15} fill={fam.head} />
          <circle cx={-6} cy={-64} r={4} fill="#fff" opacity={0.4} />
          <g fill={INK}>
            <ellipse cx={-5.5 + look} cy={-59} rx={2.3} ry={3} className="lali-blink" style={{ animationDelay: `${delay}s` }} />
            <ellipse cx={5.5 + look} cy={-59} rx={2.3} ry={3} className="lali-blink" style={{ animationDelay: `${delay}s` }} />
          </g>
          <ellipse cx={-10} cy={-53} rx={3.4} ry={2.2} fill="#FF7A6A" opacity={0.5} />
          <ellipse cx={10} cy={-53} rx={3.4} ry={2.2} fill="#FF7A6A" opacity={0.5} />
          {mood === "joy" ? (
            <path d="M-5 -53 Q0 -46 5 -53Z" fill="#8A2F1E" />
          ) : (
            <path d="M-4.5 -53 Q0 -49 4.5 -53" stroke={INK} strokeWidth={1.8} fill="none" strokeLinecap="round" />
          )}
        </g>
      </g>
    </g>
  );
}

/** A pal placed at (x, y) with a scale. */
function At({ x, y, s = 1, className, style, tap = true, children }: { x: number; y: number; s?: number; className?: string; style?: CSSProperties; tap?: boolean; children: ReactNode }) {
  const body = <g transform={s === 1 ? undefined : `scale(${s})`}>{children}</g>;
  return (
    <g transform={`translate(${r1(x)} ${r1(y)})`}>
      <g className={className} style={style}>
        {/* a letter hops and chimes when tapped */}
        {tap ? (
          <Tappable reaction="bounce" sound="chime">
            {body}
          </Tappable>
        ) : (
          body
        )}
      </g>
    </g>
  );
}

/** Little music notes that pop up and float, for a letter saying its sound. */
function Notes({ x, y, delay, color = "#1B2A4E" }: { x: number; y: number; delay: number; color?: string }) {
  return (
    <g className="lali-pop-in" style={vars({ "--delay": `${r1(delay)}s` })}>
      <g className="fidel-train-note" style={vars({ "--delay": `${r1(delay)}s` })}>
        <path d={`M${x} ${y} v-12 l8 -3 v12`} stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <ellipse cx={x - 2.5} cy={y + 0.5} rx={3.4} ry={2.6} fill={color} />
        <ellipse cx={x + 5.5} cy={y - 2.5} rx={3.4} ry={2.6} fill={color} />
      </g>
    </g>
  );
}

/* ---------- the train ---------- */

const CAR = 300; // carriage length
const GAP = 14;
const SEAT0 = 30;
const SEAT = 40;
const DECK = -26; // where riders stand

function Wheel({ x, r = 10, moving }: { x: number; r?: number; moving: boolean }) {
  return (
    <g transform={`translate(${x} ${-r})`}>
      <circle r={r} fill="#2A2E40" />
      <circle r={r - 3} fill="#5A6078" />
      <g className={moving ? "lali-spin" : undefined} style={vars({ "--dur": "0.6s" })}>
        <path d={`M${-(r - 3)} 0 H${r - 3} M0 ${-(r - 3)} V${r - 3}`} stroke="#2A2E40" strokeWidth={2.4} />
      </g>
      <circle r={2.6} fill="#C9CFDF" />
    </g>
  );
}

/** A low-sided carriage, its left end at x. Riders stand on the deck behind a low wall. */
function Carriage({ x, fam, riders = 0, moving = false, sing = false, children }: { x: number; fam: Family; riders?: number; moving?: boolean; sing?: boolean; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} 0)`}>
      {[40, 80, 220, 260].map((wx) => (
        <Wheel key={wx} x={wx} moving={moving} />
      ))}
      <rect x={-GAP} y={-17} width={GAP + 4} height={5} rx={2} fill="#3A3A4A" />
      <rect x={0} y={-24} width={CAR} height={10} rx={3} fill="#3A3A4A" />
      <g className={moving ? "fidel-train-chug" : undefined}>
        {fam.letters.slice(0, riders).map((g, i) => (
          <At key={g} x={SEAT0 + i * SEAT} y={DECK} className={sing ? "fidel-train-sing" : undefined} style={sing ? vars({ "--delay": `${r1(i * 0.4)}s` }) : undefined}>
            <Pal g={g} fam={fam} delay={-i * 0.4} look={i % 2 ? 1 : -1} />
          </At>
        ))}
        {children}
        {/* the low wall, with a stripe and rivets */}
        <rect x={4} y={-38} width={CAR - 8} height={14} rx={4} fill={fam.car} />
        <rect x={4} y={-38} width={CAR - 8} height={4} rx={2} fill="#fff" opacity={0.3} />
        <g fill="#fff" opacity={0.5}>
          {[14, 70, 150, 230, 286].map((rx) => (
            <circle key={rx} cx={rx} cy={-30} r={1.8} />
          ))}
        </g>
      </g>
    </g>
  );
}

/** A driver's cap for Anbessa, blue and white like the engine's stripe. */
function DriverCap() {
  return (
    <g>
      <path d="M-15 -2 Q-14 -16 0 -17 Q14 -16 15 -2Z" fill="#2B4EA0" />
      <path d="M-14 -7 Q0 -12 14 -7 M-12 -12 Q0 -16 12 -12" stroke="#fff" strokeWidth={2} fill="none" />
      <path d="M-4 -2 Q12 -4 22 1 Q10 3 -4 2Z" fill="#1B2A4E" />
    </g>
  );
}

/** The engine, cab on the left and the front on the right; Anbessa drives and Lali rings the bell. */
function Engine({ x, moving = false, ringing = true, main = "#E8513B" }: { x: number; moving?: boolean; ringing?: boolean; main?: string }) {
  return (
    <g transform={`translate(${x} 0)`}>
      {[26, 66, 104].map((wx) => (
        <Wheel key={wx} x={wx} r={wx === 26 ? 10 : 12} moving={moving} />
      ))}
      <rect x={0} y={-24} width={128} height={12} rx={3} fill="#3A3A4A" />
      {/* the rod between the driving wheels goes round with them */}
      <g className={moving ? "fidel-train-rod" : undefined}>
        <rect x={62} y={-16} width={46} height={5} rx={2.5} fill="#C9CFDF" />
      </g>
      <g className={moving ? "fidel-train-chug" : undefined}>
        {/* cab, with Anbessa at the window */}
        <rect x={0} y={-90} width={48} height={68} rx={4} fill="#B8382A" />
        <rect x={8} y={-84} width={32} height={34} rx={5} fill="#FFE9B0" />
        {/* Anbessa the driver giggles when tapped (Place) */}
        <g>
          <Place x={24} y={-26} s={0.3}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <g transform="translate(24 -82)">
            <DriverCap />
          </g>
        </g>
        <rect x={0} y={-50} width={48} height={28} fill={main} />
        <path d="M0 -40 H48" stroke="#fff" strokeWidth={4} />
        <rect x={6} y={-86} width={36} height={36} rx={5} fill="none" stroke="#7A2A1E" strokeWidth={3} />
        <rect x={-6} y={-98} width={60} height={9} rx={3} fill="#2A2E40" />
        {/* boiler */}
        <rect x={46} y={-64} width={76} height={42} rx={16} fill={main} />
        <path d="M50 -40 H120" stroke="#fff" strokeWidth={4} />
        <path d="M72 -64 V-22 M98 -64 V-22" stroke="#B8382A" strokeWidth={3} />
        <rect x={54} y={-60} width={50} height={6} rx={3} fill="#fff" opacity={0.3} />
        <ellipse cx={122} cy={-43} rx={6} ry={19} fill="#B8382A" />
        <circle cx={124} cy={-62} r={6} fill="#FFE27A" />
        <circle cx={124} cy={-62} r={11} fill="#FFE27A" opacity={0.3} className="lali-pulse" />
        {/* cowcatcher */}
        <path d="M118 -24 L140 -4 L118 -4Z" fill="#2A2E40" />
        {/* chimney and its steam */}
        <path d="M100 -64 L98 -86 Q106 -94 114 -86 L112 -64Z" fill="#2A2E40" />
        <g fill="#fff">
          {[0, 0.5, 1, 1.5].map((d) => (
            <circle key={d} cx={106} cy={-96} r={8} className="fidel-train-steam" style={vars({ "--delay": `${-d}s`, "--dur": moving ? "2s" : "3.2s" })} />
          ))}
        </g>
        {/* the bell, swinging */}
        <path d="M74 -64 V-80 H90 V-64" stroke="#2A2E40" strokeWidth={3} fill="none" />
        <Tappable reaction="wiggle" sound="chime">
          <g className={ringing ? "fidel-train-bell" : undefined}>
            <path d="M82 -80 Q75 -80 75 -70 L74 -66 H90 L89 -70 Q89 -80 82 -80Z" fill="#F5B21E" />
            <circle cx={82} cy={-64} r={2.4} fill="#B8860B" />
          </g>
        </Tappable>
        {ringing && (
          <g stroke="#F5B21E" strokeWidth={2.4} fill="none" strokeLinecap="round">
            <path d="M66 -82 q-6 6 0 12" className="fidel-train-ding" />
            <path d="M98 -82 q6 6 0 12" className="fidel-train-ding" style={vars({ "--delay": "-0.3s" })} />
          </g>
        )}
        <line x1={90} y1={-74} x2={98} y2={-98} stroke="#7A5236" strokeWidth={1.4} />
      </g>
      {/* Lali holds the bell rope */}
      <BeeHover x={102} y={-104} s={0.85} />
    </g>
  );
}

/**
 * The train in its own units, scaled and placed with its rails at (x, y), the engine's front at x.
 * Carriages trail behind to the left.
 */
function Train({ x, y, s = 1, cars, moving = false, ringing = true, sing = false }: { x: number; y: number; s?: number; cars: { fam: Family; riders: number }[]; moving?: boolean; ringing?: boolean; sing?: boolean }) {
  const engineX = -140;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {cars.map((c, i) => (
        <Carriage key={i} x={engineX - GAP - (i + 1) * (CAR + GAP) + GAP} fam={c.fam} riders={c.riders} moving={moving} sing={sing} />
      ))}
      <Engine x={engineX} moving={moving} ringing={ringing} />
    </g>
  );
}

/* ---------- the line and the land ---------- */

/** The track: rails at y, with sleepers that rush past when the train moves. */
function Track({ y, moving = false, color = "#8A6A4A" }: { y: number; moving?: boolean; color?: string }) {
  const sleepers = Array.from({ length: 30 }, (_, i) => `M${-20 + i * 16} ${y + 1} h9 v6 h-9Z`).join(" ");
  return (
    <g>
      <rect x={-10} y={y} width={420} height={10} fill="#B9A58A" />
      <g className={moving ? "fidel-train-scroll" : undefined} style={vars({ "--w": "16px", "--dur": "0.22s" })}>
        <path d={sleepers} fill={color} />
      </g>
      <path d={`M-10 ${y + 1} H410`} stroke="#5A6078" strokeWidth={2.4} />
      <path d={`M-10 ${y + 6} H410`} stroke="#7A8098" strokeWidth={1.6} />
    </g>
  );
}

/** Land that loops past: the content is drawn over x 0–w and repeated once to its right. */
function Scroll({ w = 400, dur, on = true, children }: { w?: number; dur: number; on?: boolean; children: ReactNode }) {
  return (
    <g className={on ? "fidel-train-scroll" : undefined} style={vars({ "--w": `${w}px`, "--dur": `${dur}s` })}>
      {children}
      <g transform={`translate(${w} 0)`}>{children}</g>
    </g>
  );
}

/** The countryside rolling past: far hills slowly, tukuls and trees faster. */
function Countryside({ id, moving = true, dusk = false }: { id: string; moving?: boolean; dusk?: boolean }) {
  return (
    <>
      {dusk ? (
        <>
          <Sky id={id} from="#2B2A6E" mid="#C8607A" to="#FFB46A" />
          <Stars seed={21} n={12} bottom={80} />
          <Moon x={320} y={56} r={18} />
        </>
      ) : (
        <>
          <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />
          <Sun x={60} y={52} r={20} />
          <DriftCloud y={40} s={0.7} dur={60} phase={0.3} />
          <Birds y={74} dur={20} phase={0.5} />
        </>
      )}
      <Mountains far={dusk ? "#8A6AA8" : undefined} mid={dusk ? "#6E5296" : undefined} />
      <Scroll dur={moving ? 40 : 1} on={moving}>
        <path d="M0 196 Q60 166 130 184 T260 178 T400 190 L400 230 L0 230Z" fill={dusk ? "#5C8A5A" : "#8FD39A"} />
      </Scroll>
      <Scroll dur={moving ? 14 : 1} on={moving}>
        <Tukul x={70} y={206} s={0.5} glow={dusk} />
        <Acacia x={190} y={208} s={0.5} leaf={dusk ? "#3E6A4A" : undefined} />
        <Tukul x={300} y={204} s={0.42} glow={dusk} />
        <Acacia x={360} y={210} s={0.38} leaf={dusk ? "#3E6A4A" : undefined} />
      </Scroll>
      <path d="M-10 206 Q200 198 410 206 L410 310 L-10 310Z" fill={dusk ? "#4E7A4E" : "#6CC983"} />
    </>
  );
}

/** Foreground flowers and grass that whip past below the track. */
function NearVerge({ moving = true, seed = 5 }: { moving?: boolean; seed?: number }) {
  const rnd = rand(seed);
  const spots = Array.from({ length: 7 }, (_, i) => ({ x: Math.round(i * 58 + rnd() * 30), h: Math.round(16 + rnd() * 12), c: ["#FFD233", "#FF8FB1", "#fff"][i % 3] }));
  return (
    <Scroll dur={moving ? 3.2 : 1} on={moving}>
      {spots.map((p, i) => (
        <Daisy key={i} x={p.x} y={292} h={p.h} color={p.c} delay={-i * 0.4} />
      ))}
      <Grass y={282} n={10} x0={0} x1={400} seed={seed + 10} />
    </Scroll>
  );
}

/** The stone platform, from its top edge at y down to the bottom of the picture. */
function Platform({ y }: { y: number }) {
  return (
    <g>
      <rect x={-10} y={y} width={420} height={8} fill="#E8D8B8" />
      <rect x={-10} y={y + 8} width={420} height={310 - y} fill="#CDB892" />
      <path d={Array.from({ length: 12 }, (_, i) => `M${i * 40 - 10} ${y + 8} V310`).join(" ")} stroke="#B9A27A" strokeWidth={2} />
      <path d={`M-10 ${y + 8} H410`} stroke="#F5C542" strokeWidth={3} strokeDasharray="12 8" />
    </g>
  );
}

/** A little station: a building with a clock and a sign showing which family lives here. */
function Station({ x, y, sign, fam }: { x: number; y: number; sign: string; fam: Family }) {
  return (
    <g>
      <rect x={x} y={y - 60} width={110} height={60} fill="#F2E2C2" />
      <rect x={x + 10} y={y - 40} width={20} height={40} rx={2} fill={fam.car} />
      <rect x={x + 44} y={y - 44} width={22} height={20} rx={3} fill="#9ED3F6" />
      <rect x={x + 76} y={y - 44} width={22} height={20} rx={3} fill="#9ED3F6" />
      <path d={`M${x - 10} ${y - 56} L${x + 14} ${y - 84} L${x + 96} ${y - 84} L${x + 120} ${y - 56}Z`} fill="#B8382A" />
      {/* the clock */}
      <circle cx={x + 55} cy={y - 72} r={9} fill="#fff" stroke="#2A2E40" strokeWidth={2} />
      <g className="lali-spin" style={vars({ "--dur": "8s" })}>
        <path d={`M${x + 55} ${y - 72} v-6`} stroke="#2A2E40" strokeWidth={1.6} strokeLinecap="round" />
      </g>
      <path d={`M${x + 55} ${y - 72} h4`} stroke="#2A2E40" strokeWidth={1.6} strokeLinecap="round" />
      {/* the sign */}
      <rect x={x + 120} y={y - 52} width={3} height={52} fill="#5A6078" />
      <rect x={x + 104} y={y - 74} width={36} height={26} rx={6} fill={fam.body} stroke="#fff" strokeWidth={2.4} />
      <text x={x + 122} y={y - 53} fontSize={20} fontWeight={700} fill="#fff" textAnchor="middle" style={FIDEL_FONT}>
        {sign}
      </text>
    </g>
  );
}

/* ---------- boarding: a carriage close up, the family on the platform in front ---------- */

const BOARD_TRACK = 196;
const BOARD_CAR_X = 50;
const PLAT_Y = 274;
const platX = (i: number) => 62 + i * 46;
const seatX = (i: number) => BOARD_CAR_X + SEAT0 + i * SEAT;

/**
 * The family boards. Letters before `from` are already riding; letters from `from` to `to`
 * jump aboard one by one; the rest wait on the platform, hopping.
 */
function Boarding({ id, fam, from, to, market = false }: { id: string; fam: Family; from: number; to: number; market?: boolean }) {
  const JUMP = 0.75;
  const t0 = 1;
  return (
    <>
      <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />
      <DriftCloud y={34} s={0.6} dur={60} phase={0.2} />
      <Mountains y={-30} />
      <path d="M-10 150 Q120 132 240 146 T410 140 L410 200 L-10 200Z" fill="#8FD39A" />
      {market ? <MarketBack /> : <Acacia x={344} y={162} s={0.55} />}
      <Track y={BOARD_TRACK} />
      {/* the carriage close up */}
      <g transform={`translate(0 ${BOARD_TRACK})`}>
        <Carriage x={BOARD_CAR_X} fam={fam} riders={0}>
          {fam.letters.map((g, i) =>
            i < from ? (
              <At key={g} x={SEAT0 + i * SEAT} y={DECK} className="fidel-train-sing" style={vars({ "--delay": `${r1(i * 0.4)}s`, "--dur": "2.8s" })}>
                <Pal g={g} fam={fam} delay={-i * 0.3} look={1} />
              </At>
            ) : null,
          )}
        </Carriage>
      </g>
      <Platform y={214} />
      {/* the jumpers and the waiting letters */}
      {fam.letters.map((g, i) => {
        if (i < from) return null;
        if (i < to) {
          const d = t0 + (i - from) * JUMP;
          return (
            <g key={g}>
              <At
                x={seatX(i)}
                y={BOARD_TRACK + DECK}
                className="fidel-train-board"
                style={vars({ "--fx": `${platX(i) - seatX(i)}px`, "--fy": `${PLAT_Y - (BOARD_TRACK + DECK)}px`, "--delay": `${r1(d)}s` })}
              >
                <Pal g={g} fam={fam} mood="joy" delay={-i * 0.3} basket={market} />
              </At>
              <Notes x={seatX(i) + 16} y={BOARD_TRACK + DECK - 74} delay={d + 0.75} />
            </g>
          );
        }
        return (
          <At key={g} x={platX(i)} y={PLAT_Y} className="lali-hop" style={vars({ "--delay": `${r1(-i * 0.37)}s`, "--dur": "1.1s" })}>
            <Pal g={g} fam={fam} wave={i % 2 === 0} delay={-i * 0.3} look={-1} basket={market} />
          </At>
        );
      })}
      {/* the wall of the carriage goes in front of the riders who have landed */}
      <g transform={`translate(${BOARD_CAR_X} ${BOARD_TRACK})`}>
        <rect x={4} y={-38} width={CAR - 8} height={14} rx={4} fill={fam.car} />
        <rect x={4} y={-38} width={CAR - 8} height={4} rx={2} fill="#fff" opacity={0.3} />
        <g fill="#fff" opacity={0.5}>
          {[14, 70, 150, 230, 286].map((rx) => (
            <circle key={rx} cx={rx} cy={-30} r={1.8} />
          ))}
        </g>
      </g>
      <BeeHover x={370} y={110} s={1.1} flip />
    </>
  );
}

/** Market stalls and baskets behind the line, for the መ stop. */
function MarketBack() {
  const stalls = [
    [20, "#E8413B"],
    [140, "#3FB45A"],
    [262, "#F5B21E"],
  ] as const;
  return (
    <g>
      {stalls.map(([x, c]) => (
        <g key={x}>
          <rect x={x + 6} y={136} width={3} height={52} fill="#7A5236" />
          <rect x={x + 100} y={136} width={3} height={52} fill="#7A5236" />
          <g className="fidel-train-flap">
            <path d={`M${x} 140 L${x + 12} 124 L${x + 98} 124 L${x + 110} 140Z`} fill={c} />
            <path d={`M${x} 140 L${x + 12} 124 L${x + 30} 124 L${x + 22} 140Z M${x + 44} 140 L${x + 48} 124 L${x + 66} 124 L${x + 66} 140Z M${x + 88} 140 L${x + 84} 124 L${x + 98} 124 L${x + 110} 140Z`} fill="#fff" opacity={0.85} />
          </g>
          <rect x={x + 4} y={170} width={102} height={18} fill="#9A6A40" />
          <g>
            {[18, 36, 54, 72, 90].map((dx, i) => (
              <circle key={dx} cx={x + dx} cy={166} r={6} fill={["#E8413B", "#FF8A1F", "#3FB45A", "#FFD233", "#9B5BD6"][(i + x) % 5]} />
            ))}
          </g>
        </g>
      ))}
    </g>
  );
}

/* ---------- the chant chart and the word ---------- */

/** One family on a long banner, each letter bouncing in turn like a sing-along. */
function ChantRow({ fam, y, start, step = 0.42, dur }: { fam: Family; y: number; start: number; step?: number; dur: number }) {
  return (
    <g>
      <rect x={30} y={y - 34} width={340} height={44} rx={22} fill="#fff" opacity={0.9} />
      <rect x={30} y={y - 34} width={340} height={44} rx={22} fill="none" stroke={fam.body} strokeWidth={3} />
      {fam.letters.map((g, i) => (
        <g key={g} className="fidel-train-karaoke" style={vars({ "--delay": `${r1(start + i * step)}s`, "--dur": `${dur}s` })}>
          <Tappable reaction="grow" sound="chime">
          <text x={62 + i * 46} y={y} fontSize={32} fontWeight={700} fill={fam.body} textAnchor="middle" style={FIDEL_FONT}>
            {g}
          </text>
          </Tappable>
        </g>
      ))}
    </g>
  );
}

function Sparkles({ seed = 3, spots }: { seed?: number; spots: [number, number][] }) {
  const rnd = rand(seed);
  return (
    <g fill="#FFE27A">
      {spots.map(([x, y], i) => (
        <path key={i} d="M0 -6 Q1 -1 6 0 Q1 1 0 6 Q-1 1 -6 0 Q-1 -1 0 -6Z" transform={`translate(${x} ${y})`} className="lali-twinkle" style={vars({ "--delay": `${r1(-rnd() * 2)}s`, "--dur": "1.6s" })} />
      ))}
    </g>
  );
}

export function FidelTrainScene({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Toot, toot! Here comes the Fidel Train! Anbessa drives, Lali rings the bell.
    case 0:
      return (
        <>
          <Countryside id={id} />
          <Track y={252} moving />
          <g className="lali-move-in" style={vars({ "--fx": "260px", "--fy": "0px", "--dur": "2.6s", "--delay": "0.3s" })}>
            <Train x={364} y={252} s={0.82} cars={[{ fam: HA, riders: 0 }]} moving />
          </g>
          <NearVerge />
        </>
      );
    // At the first station, the ሀ family is waiting: seven letters, each a little different.
    case 1:
      return (
        <>
          <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />
          <Sun x={340} y={46} r={18} />
          <DriftCloud y={36} s={0.6} dur={60} phase={0.6} />
          <Mountains y={-26} />
          <path d="M-10 160 Q120 140 240 152 T410 148 L410 220 L-10 220Z" fill="#8FD39A" />
          <Station x={40} y={196} sign="ሀ" fam={HA} />
          <Tukul x={310} y={180} s={0.5} />
          <Track y={196} />
          <g transform="translate(0 196)">
            <Engine x={258} ringing />
          </g>
          <Platform y={214} />
          {HA.letters.map((g, i) => (
            <At key={g} x={platX(i)} y={PLAT_Y} className="lali-hop" style={vars({ "--delay": `${r1(-i * 0.3)}s`, "--dur": "1.6s" })}>
              <Pal g={g} fam={HA} wave={i === 0 || i === 6} delay={-i * 0.3} look={i < 3 ? 1 : -1} />
            </At>
          ))}
        </>
      );
    // Hop! ሀ "ha", ሁ "hu", ሂ "hi" jump aboard.
    case 2:
      return <Boarding id={id} fam={HA} from={0} to={3} />;
    // Hop! ሃ "haa", ሄ "hay", ህ "h", ሆ "ho".
    case 3:
      return <Boarding id={id} fam={HA} from={3} to={7} />;
    // All aboard! Choo, choo! ሀ ሁ ሂ ሃ ሄ ህ ሆ!
    case 4:
      return (
        <>
          <Countryside id={id} />
          <Track y={252} moving />
          <Train x={384} y={252} s={0.78} cars={[{ fam: HA, riders: 7 }]} moving sing />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <Notes key={i} x={44 + i * 31} y={150 - (i % 2) * 10} delay={0.8 + i * 0.4} color="#2B4EA0" />
          ))}
          <NearVerge />
        </>
      );
    // Over the bridge and past the tukuls, to the next station. The ለ family!
    case 5:
      return (
        <>
          <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />
          <Sun x={330} y={50} r={18} />
          <DriftCloud y={44} s={0.7} dur={60} phase={0.1} />
          <Mountains />
          <Scroll dur={30}>
            <path d="M0 190 Q80 160 160 178 T320 172 T400 186 L400 230 L0 230Z" fill="#8FD39A" />
            <Tukul x={60} y={192} s={0.46} />
            <Tukul x={110} y={196} s={0.36} />
            <Tukul x={280} y={190} s={0.44} />
          </Scroll>
          <path d="M-10 214 Q200 206 410 214 L410 310 L-10 310Z" fill="#6CC983" />
          <Water y={244} h={66} />
          {/* the bridge: an arch of stones under the line */}
          <rect x={-10} y={208} width={420} height={14} fill="#A8A4B4" />
          <g fill="#9A96A8">
            {[20, 140, 260, 380].map((bx) => (
              <path key={bx} d={`M${bx - 54} 222 L${bx + 54} 222 L${bx + 54} 310 L${bx + 40} 310 Q${bx + 38} 250 ${bx} 248 Q${bx - 38} 250 ${bx - 40} 310 L${bx - 54} 310Z`} />
            ))}
          </g>
          <path d="M-10 214 H410" stroke="#C9C5D4" strokeWidth={3} />
          <Track y={208} moving />
          <Train x={390} y={208} s={0.56} cars={[{ fam: HA, riders: 7 }, { fam: LA, riders: 0 }]} moving sing />
          <Birds y={120} dur={16} phase={0.1} />
        </>
      );
    // Hop, hop, hop! ለ ሉ ሊ ላ ሌ ል ሎ all aboard.
    case 6:
      return <Boarding id={id} fam={LA} from={0} to={7} />;
    // Next stop, the busy market! The መ family is waiting with baskets. Ding, ding!
    case 7:
      return (
        <>
          <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />
          <DriftCloud y={30} s={0.6} dur={60} phase={0.4} />
          <Mountains y={-30} />
          <path d="M-10 150 Q120 132 240 146 T410 140 L410 200 L-10 200Z" fill="#8FD39A" />
          <MarketBack />
          <Track y={196} />
          <g transform="translate(0 196)">
            <Carriage x={236 - CAR - GAP} fam={LA} riders={7} />
            <Engine x={236} ringing />
          </g>
          <Platform y={214} />
          {MA.letters.map((g, i) => (
            <At key={g} x={platX(i)} y={PLAT_Y} className="lali-hop" style={vars({ "--delay": `${r1(-i * 0.3)}s`, "--dur": "1.6s" })}>
              <Pal g={g} fam={MA} basket wave={i === 6} delay={-i * 0.3} look={1} />
            </At>
          ))}
        </>
      );
    // Hop, hop, hop! መ ሙ ሚ ማ ሜ ም ሞ all aboard.
    case 8:
      return <Boarding id={id} fam={MA} from={0} to={7} market />;
    // The train is full, and everybody sings all three families.
    case 9:
      return (
        <>
          <Sky id={id} from="#FFD9A0" mid="#FFF0D2" to="#FFFBF0" />
          <Sparkles spots={[[30, 40], [376, 30], [20, 170], [384, 160], [200, 16]]} />
          <ChantRow fam={HA} y={70} start={0.8} dur={9.6} />
          <ChantRow fam={LA} y={130} start={0.8 + 7 * 0.42} dur={9.6} />
          <ChantRow fam={MA} y={190} start={0.8 + 14 * 0.42} dur={9.6} />
          <path d="M-10 236 Q200 226 410 236 L410 310 L-10 310Z" fill="#6CC983" />
          <Track y={262} moving />
          <Train x={400} y={262} s={0.42} cars={[{ fam: HA, riders: 7 }, { fam: LA, riders: 7 }, { fam: MA, riders: 7 }]} moving sing />
        </>
      );
    // The train stops. ላ and ሊ jump down side by side: ላሊ!
    case 10:
      return (
        <>
          <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />
          <Sun x={52} y={48} r={16} />
          <Mountains y={-24} />
          <Hills back="#8FD39A" front="#74C987" backY={170} frontY={196} />
          <Track y={200} />
          <g transform="translate(0 200) scale(0.7)">
            <Carriage x={-50} fam={LA} riders={0}>
              {LA.letters.map((g, i) => (i === 2 || i === 3 ? null : <At key={g} x={SEAT0 + i * SEAT} y={DECK}><Pal g={g} fam={LA} look={1} delay={-i * 0.3} /></At>))}
            </Carriage>
            <Engine x={264} ringing />
          </g>
          <path d="M-10 214 Q200 206 410 214 L410 310 L-10 310Z" fill="#6CC983" />
          <Grass y={272} n={10} seed={61} />
          {/* ላ and ሊ jump down from their seats */}
          {[
            { g: "ላ", seat: 3, x: 158 },
            { g: "ሊ", seat: 2, x: 242 },
          ].map((p, i) => (
            <At
              key={p.g}
              x={p.x}
              y={286}
              s={1.35}
              className="fidel-train-board"
              style={vars({ "--fx": `${r1(0.7 * (-50 + SEAT0 + p.seat * SEAT) - p.x)}px`, "--fy": `${r1(200 + 0.7 * DECK - 286)}px`, "--delay": `${0.8 + i * 0.6}s`, "--dur": "1s" })}
            >
              <Pal g={p.g} fam={LA} mood="joy" look={i ? -1 : 1} wave={i === 1} />
            </At>
          ))}
          {/* the word they make */}
          <g className="lali-pop-in" style={vars({ "--delay": "2.6s" })}>
            <Tappable reaction="grow" sound="chime">
            <rect x={130} y={34} width={140} height={64} rx={20} fill="#fff" stroke={LA.body} strokeWidth={4} />
            <text x={200} y={83} fontSize={46} fontWeight={700} fill={LA.body} textAnchor="middle" style={FIDEL_FONT}>
              ላሊ
            </text>
            </Tappable>
          </g>
          <Sparkles seed={7} spots={[[118, 34], [284, 40], [200, 20], [122, 104], [280, 100]]} />
          <BeeFlight path="M330 130 C360 90 390 130 360 160 C330 190 300 160 320 130 C340 100 300 70 280 100" dur={5} s={1.2} rest={[330, 130]} trailColor="#E58A00" />
        </>
      );
    // "That's me!" Lali rings the bell all the way home. Goodnight, little letters.
    default:
      return (
        <>
          <Countryside id={id} dusk />
          <Track y={252} moving color="#6A4A3A" />
          <Train x={350} y={252} s={0.6} cars={[{ fam: HA, riders: 7 }, { fam: LA, riders: 7 }]} moving sing />
          {/* the next station far down the line, its family waiting in the lamplight */}
          <g opacity={0.55}>
            <rect x={366} y={214} width={2} height={30} fill="#2A2048" />
            <circle cx={367} cy={212} r={4} fill="#FFE27A" className="lali-pulse" />
            {[376, 386, 396].map((x, i) => (
              <g key={x} fill="#2A2048" className="lali-hop" style={vars({ "--delay": `${-i * 0.4}s` })}>
                <rect x={x - 4} y={232} width={8} height={10} rx={3} />
                <circle cx={x} cy={228} r={4} />
              </g>
            ))}
          </g>
          <NearVerge seed={9} />
        </>
      );
  }
}
