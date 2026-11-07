"use client";

import "./grandpas-krar.css";

import type { CSSProperties, ReactNode } from "react";
import { useId } from "react";

import { CubShape, type Mood } from "../../characters";
import { Air, BeeFlight, BeeHover, Birds, Butterfly, Depth, DriftCloud, Heart, Hills, LightRays, Moon, Mountains, Place, Sky, Stars, Sun, vars } from "../scenery";
import { Tappable } from "../tappable";

/*
  "Grandpa's Krar": one living picture per page (13 pages).
  What is drawn, and why: the krar is a bowl lyre: a round wooden bowl with a skin face, two
  arms rising in a V to a crossbar, and five strings, often hung with bright cloth. It rests on
  the player's lap, tipped a little. Grandpa is a gelada too (he is Tsehay's grandpa), grey
  with age, with white whiskers and brows and a white gabi shawl. Sunday coffee is the coffee
  ceremony: fresh grass strewn on the floor, the jebena on its little stove, incense and popcorn.
  The geladas are drawn here (not with the shared GuguShape) so their arms can hold and play the
  krar, show sore fingertips, clap and wink. Keyframes are grandpas-krar-* in ./grandpas-krar.css
  (transforms and opacity only); reduced motion shows each page's finished pose.
*/

const st = (v: Record<string, string | number>) => vars(v) as CSSProperties;
const INK = "#1A0F0A";

/* ---------- the krar ---------- */

const STRINGS = [0, 1, 2, 3, 4];

/** The krar, centred on its bowl (0, 0); about 180 tall. `ring`: the strings shimmer as it plays. */
function KrarShape({ ring = false, glow = false }: { ring?: boolean; glow?: boolean }) {
  return (
    <g>
      {/* the arms and crossbar */}
      <path d="M-24 -18 L-46 -128 M24 -18 L46 -128" stroke="#7A3E22" strokeWidth={7} strokeLinecap="round" />
      <path d="M-56 -124 Q0 -140 56 -124" stroke="#5E2E18" strokeWidth={8} fill="none" strokeLinecap="round" />
      {/* bright cloth wound on the crossbar */}
      {STRINGS.map((i) => (
        <rect key={i} x={-28 + i * 12} y={-136 + Math.abs(i - 2) * 1.6} width={7} height={10} rx={2} fill={["#E2463F", "#FFD233", "#3FAF66", "#FFD233", "#E2463F"][i]} />
      ))}
      {/* tassels */}
      <g className="grandpas-krar-tassel">
        <path d="M-56 -124 Q-62 -110 -58 -96" stroke="#E2463F" strokeWidth={4} fill="none" strokeLinecap="round" />
        <path d="M-52 -122 Q-54 -108 -50 -98" stroke="#FFD233" strokeWidth={3} fill="none" strokeLinecap="round" />
      </g>
      <g className="grandpas-krar-tassel" style={st({ "--delay": "-0.6s" })}>
        <path d="M56 -124 Q62 -110 58 -96" stroke="#3FAF66" strokeWidth={4} fill="none" strokeLinecap="round" />
        <path d="M52 -122 Q54 -108 50 -98" stroke="#FFD233" strokeWidth={3} fill="none" strokeLinecap="round" />
      </g>
      {/* the bowl */}
      <circle r={40} fill="#8A4626" />
      <circle r={33} fill="#EAD6AE" />
      <circle r={33} fill="none" stroke="#C9A06A" strokeWidth={3} strokeDasharray="2 5" />
      <path d="M-30 -14 Q-14 -28 8 -30" stroke="#fff" strokeOpacity={0.4} strokeWidth={4} fill="none" strokeLinecap="round" />
      <g fill="#E2463F">
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <circle key={a} cx={Math.round(Math.cos((a * Math.PI) / 180) * 37 * 10) / 10} cy={Math.round(Math.sin((a * Math.PI) / 180) * 37 * 10) / 10} r={2.6} />
        ))}
      </g>
      {/* the bridge and the five strings */}
      <rect x={-14} y={4} width={28} height={5} rx={2} fill="#5E2E18" />
      {glow && <path d="M-14 -126 L14 -126 L10 24 L-10 24Z" fill="#FFE27A" opacity={0.35} className="grandpas-krar-glow" />}
      <g stroke="#FFF6DC" strokeWidth={1.6}>
        {STRINGS.map((i) => (
          <g key={i} className={ring ? "grandpas-krar-string" : undefined} style={st({ "--delay": `${-i * 0.13}s` })}>
            <path d={`M${-8 + i * 4} 26 L${-24 + i * 12} -128`} />
          </g>
        ))}
      </g>
      <circle cx={0} cy={28} r={3} fill="#5E2E18" />
    </g>
  );
}

/* ---------- the geladas: Tsehay, Grandpa, Gugu ---------- */

type Who = "tsehay" | "grandpa" | "gugu";
type Face = Mood | "wink" | "closed";
type Arms = "rest" | "play" | "clap" | "show" | "wave" | "stick" | "hold";

const PAL: Record<Who, { cape: string; capeDark: string; body: string; face: string; hand: string }> = {
  tsehay: { cape: "#D9A46A", capeDark: "#B9824E", body: "#A8744A", face: "#4A2E24", hand: "#5A3A2A" },
  gugu: { cape: "#D9A46A", capeDark: "#B9824E", body: "#A8744A", face: "#4A2E24", hand: "#5A3A2A" },
  grandpa: { cape: "#DCCDB4", capeDark: "#BBA98C", body: "#9A8068", face: "#4A3A30", hand: "#5A4A3E" },
};

function GEyes({ face }: { face: Face }) {
  const line = { stroke: INK, strokeWidth: 3.4, fill: "none", strokeLinecap: "round" as const };
  const open = (x: number) => (
    <g key={x} className="lali-blink" style={{ animationDuration: "5.2s" }}>
      <ellipse cx={x} cy={86} rx={7.5} ry={8} fill="#FFF7E6" />
      <g className="lali-look" style={{ animationDuration: "8.5s" }}>
        <circle cx={x + 1} cy={87} r={5} fill={INK} />
        <circle cx={x + 2.6} cy={85} r={1.8} fill="#fff" />
      </g>
    </g>
  );
  const shut = (x: number) => <path key={x} d={`M${x - 8} 86 Q${x} 79 ${x + 8} 86`} {...line} />;
  return (
    <g>
      <ellipse cx={86} cy={82} rx={11} ry={9} fill="#E8CDB0" />
      <ellipse cx={114} cy={82} rx={11} ry={9} fill="#E8CDB0" />
      {face === "closed" || face === "joy" ? [shut(86), shut(114)] : face === "wink" ? [open(86), shut(114)] : [open(86), open(114)]}
      {(face === "sad" || face === "worried") && (
        <g stroke="#E8CDB0" strokeWidth={3} strokeLinecap="round">
          <path d="M77 72 L92 68" />
          <path d="M123 72 L108 68" />
        </g>
      )}
    </g>
  );
}

function GMouth({ face }: { face: Face }) {
  const lip = { stroke: "#E8C9A0", strokeWidth: 3, fill: "none", strokeLinecap: "round" as const };
  if (face === "joy" || face === "wow") return <path d="M88 119 Q100 136 112 119Z" fill="#8A2F1E" />;
  if (face === "sad") return <path d="M90 127 Q100 119 110 127" {...lip} />;
  if (face === "worried") return <path d="M88 125 Q94 120 100 125 Q106 130 112 125" {...lip} />;
  return <path d="M88 120 Q100 130 112 120" {...lip} />;
}

/**
 * A gelada in a 200 × 240 box (feet near y = 230): Tsehay (yellow ribbon, blue pinafore), Grandpa
 * (grey, white whiskers, white gabi) or Gugu. With `krar` the krar sits on the lap, under the arms.
 */
function Gelada({
  who,
  face = "happy",
  arms = "rest",
  krar = false,
  ring = false,
  glow = false,
  bow = true,
  tips,
  shine = false,
}: {
  who: Who;
  face?: Face;
  arms?: Arms;
  krar?: boolean;
  ring?: boolean;
  glow?: boolean;
  bow?: boolean;
  /** Fingertip colour for "show": red and sore, or Grandpa's hard pale ones. */
  tips?: string;
  /** Grandpa's shiny, happy eyes at the end. */
  shine?: boolean;
}) {
  const c = PAL[who];
  const elder = who === "grandpa";
  const girl = who === "tsehay";
  const arm = (d: string, key?: string) => <path key={key} d={d} stroke={c.body} strokeWidth={15} fill="none" strokeLinecap="round" />;
  const hand = (x: number, y: number, key?: string) => <ellipse key={key} cx={x} cy={y} rx={10} ry={9} fill={c.hand} />;
  return (
    <g>
      <ellipse cx={100} cy={233} rx={60} ry={7} fill="#000" opacity={0.13} />
      <g className="lali-tail" style={st({ transformOrigin: "100% 100%", "--dur": "2.2s" })}>
        <path d="M66 222 C30 226 18 200 26 176" stroke={c.body} strokeWidth={8} fill="none" strokeLinecap="round" />
        <ellipse cx={27} cy={170} rx={8} ry={12} fill={c.capeDark} />
      </g>
      <g className="lali-breathe">
        <path d="M56 230 C48 186 62 150 100 148 C138 150 152 186 144 230Z" fill={c.body} />
        <ellipse cx={70} cy={222} rx={22} ry={13} fill={c.body} />
        <ellipse cx={130} cy={222} rx={22} ry={13} fill={c.body} />
        <ellipse cx={62} cy={229} rx={15} ry={7} fill={c.hand} />
        <ellipse cx={138} cy={229} rx={15} ry={7} fill={c.hand} />
        <path d="M100 214 C78 198 76 178 88 174 C95 172 99 176 100 180 C101 176 105 172 112 174 C124 178 122 198 100 214Z" fill="#F7D9C4" />
        <path d="M100 209 C82 196 81 180 90 178 C95 177 99 180 100 184 C101 180 105 177 110 178 C119 180 118 196 100 209Z" fill={elder ? "#C8463F" : "#E2463F"} />
        <path d="M44 150 C50 118 76 108 100 108 C124 108 150 118 156 150 L148 166 L138 156 L130 172 L120 160 L114 176 L106 164 L100 178 L94 164 L86 176 L80 160 L70 172 L62 156 L52 166Z" fill={c.cape} />
        {girl && (
          <g>
            <path d="M50 212 Q100 204 150 212 L158 234 Q100 240 42 234Z" fill="#4A7FD0" />
            <path d="M50 212 Q100 204 150 212" stroke="#2F5FA8" strokeWidth={4} fill="none" />
          </g>
        )}
        {elder && (
          <g>
            {/* the white gabi round his shoulders */}
            <path d="M40 150 Q100 122 160 150 L164 196 Q132 178 100 180 Q68 178 36 196Z" fill="#FFFDF4" />
            <path d="M36 196 Q68 178 100 180 Q132 178 164 196" stroke="#2E9A8A" strokeWidth={4} fill="none" />
            <path d="M36 196 Q68 178 100 180 Q132 178 164 196" stroke="#F5B21E" strokeWidth={1.6} strokeDasharray="3 3" fill="none" />
          </g>
        )}
        {(arms === "rest" || arms === "show" || arms === "wave" || arms === "stick") && (
          <g>
            {arm("M60 150 C50 170 52 196 66 206")}
            {hand(70, 208)}
          </g>
        )}
      </g>
      {krar && (
        <g transform="translate(112 200) rotate(-28) scale(0.8)">
          <KrarShape ring={ring} glow={glow} />
        </g>
      )}
      {/* arms */}
      {arms === "rest" && (
        <g className="lali-g-arm">
          {arm("M140 150 C150 170 148 196 134 206")}
          {hand(130, 208)}
        </g>
      )}
      {arms === "play" && (
        <g>
          {arm("M62 152 C48 150 44 156 50 160")}
          {hand(52, 158)}
          <g className={ring ? "grandpas-krar-pluck" : undefined}>
            {arm("M140 150 C150 172 126 184 104 178")}
            {hand(100, 176)}
          </g>
        </g>
      )}
      {arms === "hold" && (
        <g>
          {arm("M60 150 C46 160 56 186 78 190")}
          {hand(82, 190)}
          {arm("M140 150 C154 160 144 186 122 190")}
          {hand(118, 190)}
        </g>
      )}
      {arms === "clap" && (
        <g>
          <g className="grandpas-krar-clap-l">
            {arm("M60 150 C50 166 70 170 90 160")}
            {hand(92, 156)}
          </g>
          <g className="grandpas-krar-clap-r">
            {arm("M140 150 C150 166 130 170 110 160")}
            {hand(108, 156)}
          </g>
        </g>
      )}
      {arms === "wave" && (
        <g className="lali-wave" style={st({ transformOrigin: "10% 95%" })}>
          {arm("M140 152 C154 136 162 116 160 96")}
          <ellipse cx={160} cy={90} rx={10} ry={11} fill={c.hand} />
        </g>
      )}
      {arms === "stick" && (
        <g>
          <path d="M156 100 L160 232" stroke="#7A4A2A" strokeWidth={6} strokeLinecap="round" />
          <path d="M156 100 Q150 88 160 84 Q168 86 164 96" stroke="#7A4A2A" strokeWidth={5} fill="none" strokeLinecap="round" />
          {arm("M140 152 C152 140 156 124 156 112")}
          {hand(156, 112)}
        </g>
      )}
      {/* head */}
      <g className="lali-tilt" style={st({ "--tilt": girl ? "7deg" : "-5deg", "--dur": "5.5s" })}>
        <ellipse cx={100} cy={84} rx={60} ry={54} fill={c.capeDark} />
        <g fill={c.cape}>
          <circle cx={58} cy={52} r={18} />
          <circle cx={142} cy={52} r={18} />
          <circle cx={80} cy={34} r={18} />
          <circle cx={120} cy={34} r={18} />
          <circle cx={100} cy={28} r={18} />
          <circle cx={46} cy={84} r={16} />
          <circle cx={154} cy={84} r={16} />
        </g>
        <ellipse cx={100} cy={88} rx={50} ry={48} fill={c.cape} />
        <ellipse cx={52} cy={84} rx={8} ry={11} fill={c.face} className="lali-ear-twitch" />
        <ellipse cx={148} cy={84} rx={8} ry={11} fill={c.face} />
        <path d="M100 52 C126 52 136 72 134 96 C132 124 120 140 100 140 C80 140 68 124 66 96 C64 72 74 52 100 52Z" fill={c.face} />
        <GEyes face={face} />
        {elder && (
          <g fill="#FFFDF4">
            {/* bushy white brows */}
            <path d="M72 70 Q84 60 96 68 Q86 66 74 74Z" />
            <path d="M128 70 Q116 60 104 68 Q114 66 126 74Z" />
          </g>
        )}
        <ellipse cx={100} cy={116} rx={22} ry={17} fill="#5E3B2E" />
        <ellipse cx={95} cy={108} rx={3} ry={2.3} fill={INK} />
        <ellipse cx={105} cy={108} rx={3} ry={2.3} fill={INK} />
        <GMouth face={face} />
        {elder && (
          <g>
            {/* white whiskers round the muzzle */}
            <path d="M76 116 Q78 142 100 148 Q122 142 124 116 Q120 132 110 134 Q100 138 90 134 Q80 132 76 116Z" fill="#FFFDF4" />
            <path d="M84 112 Q92 106 98 112 M102 112 Q108 106 116 112" stroke="#FFFDF4" strokeWidth={4} fill="none" strokeLinecap="round" />
          </g>
        )}
        <ellipse cx={72} cy={110} rx={7} ry={4.5} fill="#E2463F" opacity={0.35} />
        <ellipse cx={128} cy={110} rx={7} ry={4.5} fill="#E2463F" opacity={0.35} />
        {shine && (
          <g fill="#BFE6FF">
            <path d="M80 94 Q77 100 80 103 Q83 100 80 94Z" className="grandpas-krar-tear" />
            <circle cx={90} cy={83} r={1.6} fill="#fff" />
            <circle cx={118} cy={83} r={1.6} fill="#fff" />
          </g>
        )}
        {girl && bow && (
          <g>
            <path d="M100 30 L74 16 Q68 30 74 44Z M100 30 L126 16 Q132 30 126 44Z" fill="#FFD233" />
            <circle cx={100} cy={30} r={7} fill="#F5B21E" />
          </g>
        )}
      </g>
      {arms === "show" && (
        <g>
          {arm("M140 152 C166 146 180 136 182 124")}
          <g transform="translate(184 114) scale(1.7)">
            <ellipse cx={0} cy={0} rx={11} ry={10} fill={c.hand} />
            <path d="M-11 4 Q-17 0 -15 -6" stroke={c.hand} strokeWidth={5.4} fill="none" strokeLinecap="round" />
            {[-7.5, -2.5, 2.5, 7.5].map((dx, i) => (
              <g key={dx}>
                <rect x={dx - 2.5} y={-20 + Math.abs(dx) * 0.4} width={5} height={14} rx={2.5} fill={c.hand} />
                <circle cx={dx} cy={-18 + Math.abs(dx) * 0.4} r={2.5} fill={tips ?? c.hand} className={tips === "#E2463F" ? "grandpas-krar-sore" : undefined} style={st({ "--delay": `${-i * 0.2}s` })} />
              </g>
            ))}
          </g>
        </g>
      )}
    </g>
  );
}

/* ---------- music and small things ---------- */

const NOTE_COLORS = ["#E2463F", "#F5B21E", "#3FAF66", "#3E7FD0", "#9C6CE0"];

/** Music notes floating up from (x, y), one after another. */
function Notes({ x, y, n = 4, spread = 30 }: { x: number; y: number; n?: number; spread?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`translate(${x + ((i * 37) % spread) - spread / 2} ${y})`}>
          <g className="grandpas-krar-note" style={st({ "--delay": `${-i * (3.6 / n)}s`, "--dx": `${(i % 2 ? 1 : -1) * (10 + (i % 3) * 6)}px` })}>
            <NoteShape c={NOTE_COLORS[i % NOTE_COLORS.length]} double={i % 3 === 1} />
          </g>
        </g>
      ))}
    </g>
  );
}

function NoteShape({ c, double = false }: { c: string; double?: boolean }) {
  return (
    <g fill={c}>
      <ellipse cx={0} cy={0} rx={5} ry={3.8} transform="rotate(-20)" />
      <rect x={3.4} y={-17} width={2.2} height={17} />
      {double ? (
        <g>
          <ellipse cx={13} cy={-3} rx={5} ry={3.8} transform="rotate(-20 13 -3)" />
          <rect x={16.4} y={-20} width={2.2} height={17} />
          <path d="M4.5 -17 L17.5 -20 L17.5 -15 L4.5 -12Z" />
        </g>
      ) : (
        <path d="M5.6 -17 q7 2 7 9" stroke={c} strokeWidth={2.2} fill="none" />
      )}
    </g>
  );
}

/** Numbered notes that pop up one by one: one note, two notes, three… */
function CountNotes({ spots, from = 1 }: { spots: [number, number, number][]; from?: number }) {
  return (
    <g>
      {spots.map(([x, y, d], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <g className="lali-pop-in" style={st({ "--delay": `${d}s` })}>
            <g className="grandpas-krar-sway" style={st({ "--delay": `${-i * 0.4}s` })}>
              <Tappable reaction="grow" sound="chime">
                <circle r={15} fill="#fff" stroke={NOTE_COLORS[(from - 1 + i) % 5]} strokeWidth={2.6} />
                <g transform="translate(-3 6) scale(0.9)">
                  <NoteShape c={NOTE_COLORS[(from - 1 + i) % 5]} />
                </g>
                <circle cx={12} cy={11} r={7} fill={NOTE_COLORS[(from - 1 + i) % 5]} />
                <text x={12} y={14.6} fontSize={10} fontFamily="var(--font-grandstander), sans-serif" fontWeight={900} fill="#fff" textAnchor="middle">
                  {from + i}
                </text>
              </Tappable>
            </g>
          </g>
        </g>
      ))}
    </g>
  );
}

/** A grumpy fly, buzzing out of a bad note. */
function GrumpyFly({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="grandpas-krar-fly">
        <Tappable reaction="spin" sound="buzz">
          <g className="lali-wings" style={{ animationDuration: "0.06s" }}>
            <ellipse cx={-4} cy={-8} rx={6} ry={4} fill="#E3F6FF" opacity={0.9} stroke="#5A6A7A" strokeWidth={1} />
            <ellipse cx={5} cy={-8} rx={6} ry={4} fill="#E3F6FF" opacity={0.9} stroke="#5A6A7A" strokeWidth={1} />
          </g>
          <ellipse cx={0} cy={0} rx={9} ry={7} fill="#3A4A5A" />
          <circle cx={8} cy={-2} r={5} fill="#3A4A5A" />
          <circle cx={9} cy={-3} r={2.4} fill="#E2463F" />
          <path d="M6 -7 L11 -5" stroke="#fff" strokeWidth={1.4} strokeLinecap="round" />
          <path d="M8 2 Q10 0 12 2" stroke="#fff" strokeWidth={1.2} fill="none" />
        </Tappable>
      </g>
      <g stroke="#3A4A5A" strokeWidth={1.6} strokeLinecap="round" opacity={0.7}>
        <path d="M-22 -4 l6 2 M-24 4 l6 -1" className="grandpas-krar-buzz" />
      </g>
    </g>
  );
}

/** A hen, pecking. */
function Hen({ x, y, s = 1, flip = false, delay = 0 }: { x: number; y: number; s?: number; flip?: boolean; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <Tappable reaction="bounce" sound="pop">
        <ellipse cx={0} cy={1} rx={14} ry={3} fill="#000" opacity={0.12} />
        <path d="M-2 -4 L-4 0 M4 -4 L4 0" stroke="#E0A030" strokeWidth={2} strokeLinecap="round" />
        <path d="M-16 -16 Q-22 -26 -12 -26 Q-14 -18 -10 -16Z" fill="#8A4A2A" />
        <ellipse cx={-2} cy={-12} rx={14} ry={10} fill="#C8743A" />
        <path d="M-10 -12 Q-2 -6 8 -12" stroke="#A85A2A" strokeWidth={2} fill="none" />
        <g className="grandpas-krar-peck" style={st({ "--delay": `${delay}s` })}>
          <circle cx={10} cy={-20} r={6} fill="#C8743A" />
          <path d="M8 -26 Q10 -30 12 -26 Q14 -30 15 -25" fill="#E2463F" />
          <path d="M15 -20 L20 -18 L15 -16Z" fill="#F5B21E" />
          <circle cx={11} cy={-21} r={1.2} fill={INK} />
          <path d="M12 -16 Q13 -12 11 -12" stroke="#E2463F" strokeWidth={2} fill="none" />
        </g>
      </Tappable>
    </g>
  );
}

/** The lemon tree in the yard. (x, y): foot of the trunk. */
function LemonTree({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-6 0 Q-4 -40 -8 -70 M-6 -44 Q-24 -56 -36 -70 M-4 -54 Q14 -66 30 -80" stroke="#7A5236" strokeWidth={8} fill="none" strokeLinecap="round" />
      <g className="lali-sway" style={st({ "--dur": "5s" })}>
        {[
          [-40, -90, 30],
          [0, -110, 38],
          [40, -92, 30],
          [-18, -72, 26],
          [22, -70, 26],
        ].map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill={i % 2 ? "#4E9E4E" : "#3E8A44"} />
        ))}
        {[
          [-30, -96],
          [8, -118],
          [36, -84],
          [-12, -72],
          [24, -102],
          [-44, -78],
        ].map(([lx, ly], i) => (
          <g key={i} transform={`translate(${lx} ${ly})`}>
            <Tappable reaction="grow" sound="pop">
              <ellipse rx={6} ry={4.6} fill="#FFE04A" />
              <ellipse cx={-1.6} cy={-1.4} rx={2} ry={1.2} fill="#FFF6B0" />
            </Tappable>
          </g>
        ))}
      </g>
    </g>
  );
}

/** The coffee ceremony: the jebena on its little stove, cups on a tray, incense and popcorn. */
function Coffee({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* the stove and jebena */}
      <g transform="translate(-30 0)">
        <path d="M-14 0 L-10 -14 L10 -14 L14 0Z" fill="#5A4A3E" />
        <ellipse cx={0} cy={-14} rx={11} ry={3} fill="#FF8A3A" className="lali-flicker" />
        <Tappable reaction="wiggle" sound="chime">
          <g transform="translate(0 -16)">
            <path d="M-10 0 Q-14 -14 -6 -20 L-4 -30 Q0 -34 4 -30 L6 -20 Q14 -14 10 0Z" fill="#2A1A14" />
            <path d="M8 -16 Q16 -20 18 -28" stroke="#2A1A14" strokeWidth={3} fill="none" strokeLinecap="round" />
            <path d="M-8 -16 Q-16 -14 -12 -6" stroke="#2A1A14" strokeWidth={2.4} fill="none" />
            <g fill="#fff">
              {[0, 1.1, 2.2].map((d) => (
                <circle key={d} cx={18} cy={-32} r={3} className="lali-smoke" style={st({ "--delay": `${-d}s`, "--dur": "3.3s" })} />
              ))}
            </g>
          </g>
        </Tappable>
      </g>
      {/* the cups */}
      <ellipse cx={14} cy={-2} rx={24} ry={5} fill="#B07A4A" />
      {[2, 14, 26].map((cx) => (
        <g key={cx}>
          <path d={`M${cx - 4} -10 L${cx + 4} -10 L${cx + 3} -4 L${cx - 3} -4Z`} fill="#FFF6E8" />
          <path d={`M${cx - 4} -10 L${cx + 4} -10`} stroke="#2E9A8A" strokeWidth={1.4} />
        </g>
      ))}
      {/* popcorn */}
      <g transform="translate(52 0)">
        <Tappable reaction="grow" sound="pop">
          <path d="M-14 -8 Q0 4 14 -8Z" fill="#C8643A" />
          {[
            [-8, -10],
            [-2, -13],
            [5, -11],
            [10, -9],
            [1, -8],
          ].map(([px, py], i) => (
            <circle key={i} cx={px} cy={py} r={3.6} fill="#FFF6DA" stroke="#F0D8A0" strokeWidth={0.8} />
          ))}
        </Tappable>
      </g>
      {/* incense */}
      <g transform="translate(-62 0)">
        <Tappable reaction="wiggle" sound="pop">
          <path d="M-6 0 L-4 -8 L4 -8 L6 0Z" fill="#8A6A4A" />
        </Tappable>
        <g stroke="#E8E2F0" strokeWidth={2.4} fill="none" strokeLinecap="round" opacity={0.8}>
          {[0, 1.4].map((d) => (
            <path key={d} d="M0 -10 q-6 -8 0 -16 q6 -8 0 -16" className="grandpas-krar-incense" style={st({ "--delay": `${-d}s` })} />
          ))}
        </g>
      </g>
    </g>
  );
}

/** A small sun, glowing: the sunshine song. */
function SongSun({ x, y, delay = 1.2 }: { x: number; y: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={st({ "--delay": `${delay}s` })}>
        <Tappable reaction="spin" sound="chime">
          <g className="lali-spin" style={st({ "--dur": "16s" })}>
            {Array.from({ length: 8 }, (_, i) => (
              <path key={i} d="M-3 -16 L0 -24 L3 -16Z" fill="#FFC83D" transform={`rotate(${i * 45})`} />
            ))}
          </g>
          <circle r={13} fill="#FFD233" />
          <circle cx={-4} cy={-1} r={1.6} fill="#9A5A10" />
          <circle cx={4} cy={-1} r={1.6} fill="#9A5A10" />
          <path d="M-4 4 Q0 7 4 4" stroke="#9A5A10" strokeWidth={1.4} fill="none" strokeLinecap="round" />
        </Tappable>
      </g>
    </g>
  );
}

/* ---------- places ---------- */

/** Inside the round house: mud walls, roof poles, a window, a lamp. `sunday`: fresh grass on the floor. */
function Home({ id, evening = false, sunday = false }: { id: string; evening?: boolean; sunday?: boolean }) {
  return (
    <>
      <defs>
        <radialGradient id={`${id}-warm`} cx="0.5" cy="0.55" r="0.65">
          <stop offset="0" stopColor={evening ? "#F2B870" : "#F2C890"} />
          <stop offset="1" stopColor={evening ? "#A8643E" : "#D8A070"} />
        </radialGradient>
      </defs>
      <Depth z={-0.3}>
        <rect x={-20} y={-20} width={440} height={340} fill={`url(#${id}-warm)`} />
        {/* roof poles meeting overhead */}
        <path d="M-20 44 Q200 -8 420 44 L420 -20 L-20 -20Z" fill={evening ? "#5E3A24" : "#7A4E30"} />
        <g stroke={evening ? "#4A2C1A" : "#5E3A24"} strokeWidth={4}>
          {[-40, 20, 80, 140, 200, 260, 320, 380, 440].map((x) => (
            <path key={x} d={`M200 -60 L${x} ${44 - Math.abs(x - 200) * 0.08}`} />
          ))}
        </g>
        <path d="M-20 44 Q200 -8 420 44" stroke="#3E2414" strokeWidth={5} fill="none" />
        {/* the window */}
        <rect x={286} y={78} width={78} height={60} rx={4} fill={evening ? "#3A3A7A" : "#8FD3FF"} />
        {evening ? (
          <g>
            <circle cx={340} cy={96} r={9} fill="#F8EDC4" />
            <circle cx={302} cy={92} r={1.4} fill="#FFF6D8" className="lali-twinkle" />
            <circle cx={318} cy={118} r={1.2} fill="#FFF6D8" className="lali-twinkle" style={st({ "--delay": "-1s" })} />
          </g>
        ) : (
          <g>
            <path d="M286 126 Q320 112 364 124 L364 138 L286 138Z" fill="#7CC46A" />
            <ellipse cx={316} cy={96} rx={14} ry={5} fill="#fff" />
          </g>
        )}
        <path d="M286 108 L364 108 M325 78 L325 138" stroke="#6A3E22" strokeWidth={4} />
        <rect x={282} y={74} width={86} height={68} rx={6} fill="none" stroke="#6A3E22" strokeWidth={6} />
        <rect x={276} y={140} width={98} height={8} rx={3} fill="#7A4A2A" />
        {/* a shelf of clay pots */}
        <rect x={20} y={118} width={84} height={6} fill="#7A4A2A" />
        <path d="M30 118 Q26 102 36 96 L44 96 Q54 102 50 118Z" fill="#B8643A" />
        <path d="M60 118 Q58 108 66 104 L72 104 Q80 108 78 118Z" fill="#C8743A" />
        <path d="M86 118 Q84 100 94 98 Q102 100 100 118Z" fill="#8A4A2A" />
        {/* a woven mesob */}
        <g transform="translate(372 216)">
          <path d="M-18 0 L-12 -30 L12 -30 L18 0Z" fill="#E0B050" />
          <path d="M-22 -30 Q0 -40 22 -30 Q0 -22 -22 -30Z" fill="#E8C060" />
          <path d="M-16 -8 L16 -8 M-14 -18 L14 -18" stroke="#B8302A" strokeWidth={3} />
          <path d="M-12 -30 Q0 -58 12 -30" stroke="#E0B050" strokeWidth={4} fill="none" />
        </g>
      </Depth>
      {/* the floor */}
      <path d="M-20 214 Q200 196 420 214 L420 320 L-20 320Z" fill={evening ? "#8A5A3A" : "#B88658"} />
      <path d="M-20 214 Q200 196 420 214" stroke={evening ? "#6A4028" : "#9A6A42"} strokeWidth={4} fill="none" />
      {sunday && (
        <g stroke="#5EB25E" strokeWidth={2} strokeLinecap="round">
          {Array.from({ length: 34 }, (_, i) => {
            const x = Math.round((i * 47) % 400);
            const y = 220 + ((i * 29) % 80);
            const a = (i % 5) - 2;
            return <path key={i} d={`M${x} ${y} l${6 + a} ${-3 + a}`} stroke={i % 3 ? "#5EB25E" : "#7CC46A"} />;
          })}
        </g>
      )}
    </>
  );
}

/** The kuraz lamp, its flame flickering and its warm glow breathing. */
function Lamp({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <defs>
        <radialGradient id="grandpas-krar-lampglow">
          <stop offset="0" stopColor="#FFE9A0" stopOpacity={0.55} />
          <stop offset="1" stopColor="#FFD27A" stopOpacity={0} />
        </radialGradient>
      </defs>
      <circle cx={0} cy={-26} r={56} fill="url(#grandpas-krar-lampglow)" className="lali-pulse" style={st({ "--dur": "2.6s" })} />
      <Tappable reaction="grow" sound="chime">
        <path d="M-9 0 L-7 -14 L7 -14 L9 0Z" fill="#8A8A92" />
        <rect x={-2} y={-20} width={4} height={6} fill="#5A5A62" />
        <path d="M0 -21 Q-6 -28 0 -38 Q6 -28 0 -21Z" fill="#FF9A3A" className="lali-flicker" />
        <path d="M0 -22 Q-3 -26 0 -32 Q3 -26 0 -22Z" fill="#FFE27A" className="lali-flicker" style={st({ "--delay": "-0.3s" })} />
      </Tappable>
    </g>
  );
}

/** The yard by day: sky, the hills, the house wall with its door, a bench under the lemon tree. */
function Yard({ id, golden = false, bench = true }: { id: string; golden?: boolean; bench?: boolean }) {
  return (
    <>
      {golden ? <Sky id={id} from="#7AB8F0" mid="#FFD9A8" to="#FFF0D8" /> : <Sky id={id} from="#7FCFFF" mid="#BDE8FF" to="#FFF6DE" />}
      <LightRays x={golden ? 60 : 340} y={golden ? 80 : 56} />
      <Sun x={golden ? 60 : 340} y={golden ? 80 : 56} r={20} />
      <DriftCloud y={50} s={0.6} dur={80} phase={0.3} />
      <Birds y={76} dur={24} phase={0.5} />
      <Mountains />
      <Hills back="#8FD39A" front="#62C076" />
      {/* the house wall and door, with the stick fence */}
      <Depth z={-0.15}>
        <path d="M-20 116 L120 116 L120 230 L-20 230Z" fill="#D9A878" />
        <path d="M-30 120 L130 120 L112 92 L-20 92Z" fill="#C9A24E" />
        <path d="M-20 100 L120 100 M-20 108 L126 108" stroke="#A8822E" strokeWidth={2} />
        <rect x={40} y={154} width={40} height={76} rx={3} fill="#6A3E22" />
        <path d="M60 154 L60 230" stroke="#5A3018" strokeWidth={2} />
        <g stroke="#9A6A42" strokeWidth={4} strokeLinecap="round">
          {[160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380].map((x) => (
            <path key={x} d={`M${x} 226 L${x} ${196 + (x % 3) * 3}`} />
          ))}
          <path d="M150 206 L400 206 M150 216 L400 216" strokeWidth={3} />
        </g>
      </Depth>
      <path d="M-20 228 Q200 216 420 230 L420 320 L-20 320Z" fill="#D8B888" />
      <path d="M-20 228 Q200 216 420 230" stroke="#C09A68" strokeWidth={3} fill="none" />
      {bench && (
        <g>
          <rect x={150} y={250} width={150} height={10} rx={3} fill="#8A5A36" />
          <path d="M162 260 L162 284 M288 260 L288 284" stroke="#6A4028" strokeWidth={7} strokeLinecap="round" />
        </g>
      )}
    </>
  );
}

const TAP_TSEHAY = { reaction: "wiggle", sound: "giggle" } as const;
const TAP_GRANDPA = { reaction: "grow", sound: "chime" } as const;
const TAP_GUGU = { reaction: "wiggle", sound: "boing" } as const;
const TAP_CUB = { reaction: "bounce", sound: "giggle" } as const;

function Scene({ children }: { children: ReactNode }) {
  return <g>{children}</g>;
}

/* ---------- the pages ---------- */

export default function GrandpasKrar({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Every evening, Tsehay's grandpa played his old krar. Tring, trang, trong; the whole family hummed along.
    case 0:
      return (
        <Scene>
          <Home id={id} evening />
          <Lamp x={52} y={208} />
          <Place x={200} y={290} s={0.56} tap={TAP_GRANDPA}>
            <g className="grandpas-krar-sway">
              <Gelada who="grandpa" face="closed" arms="play" krar ring />
            </g>
          </Place>
          <Notes x={170} y={150} n={5} spread={60} />
          <Place x={100} y={294} s={0.42} tap={TAP_TSEHAY}>
            <g className="grandpas-krar-hum">
              <Gelada who="tsehay" face="closed" />
            </g>
          </Place>
          <Place x={304} y={294} s={0.42} tap={TAP_GUGU}>
            <g className="grandpas-krar-hum" style={st({ "--delay": "-0.8s" })}>
              <Gelada who="gugu" face="closed" />
            </g>
          </Place>
          <BeeHover x={256} y={120} s={1} flip />
          <Air kind="dusk" seed={3} grass={false} />
        </Scene>
      );
    // Shy Tsehay sat very close and watched his fingers dance. "Grandpa, will you teach me?"
    case 1:
      return (
        <Scene>
          <Home id={id} evening />
          <Lamp x={360} y={214} />
          <Place x={252} y={300} s={0.66} tap={TAP_GRANDPA}>
            <Gelada who="grandpa" face="happy" arms="play" krar ring />
          </Place>
          <Notes x={250} y={130} n={3} spread={40} />
          <Place x={120} y={298} s={0.5} tap={TAP_TSEHAY}>
            <g className="grandpas-krar-lean">
              <Gelada who="tsehay" face="wow" arms="hold" />
            </g>
          </Place>
          {/* her whisper */}
          <g transform="translate(160 160)" fill="#FFF6DC">
            {[0, 1, 2].map((i) => (
              <circle key={i} cx={i * 9} cy={-i * 6} r={2 + i} className="grandpas-krar-whisper" style={st({ "--delay": `${i * 0.3}s` })} />
            ))}
          </g>
          {/* a cat asleep by the fire */}
          <g transform="translate(46 286)">
            <Tappable reaction="bounce" sound="pop">
              <g className="lali-breathe">
                <ellipse cx={0} cy={-8} rx={22} ry={11} fill="#E8B070" />
                <circle cx={-18} cy={-12} r={9} fill="#E8B070" />
                <path d="M-24 -18 L-23 -25 L-19 -20Z M-14 -19 L-12 -26 L-10 -19Z" fill="#E8B070" />
                <path d="M-22 -12 q2 2 4 0 M-16 -12 q2 2 4 0" stroke="#5A3A2A" strokeWidth={1.2} fill="none" />
                <path d="M20 -4 Q30 -2 26 -12" stroke="#E0A060" strokeWidth={4} fill="none" strokeLinecap="round" />
              </g>
            </Tappable>
          </g>
          <Air kind="dusk" seed={5} grass={false} />
        </Scene>
      );
    // Grandpa smiled under his white whiskers. "This krar was my grandpa's. I will teach you the sunshine song."
    case 2:
      return (
        <Scene>
          <Home id={id} evening />
          <Lamp x={44} y={210} />
          <Place x={276} y={296} s={0.6} tap={TAP_GRANDPA}>
            <Gelada who="grandpa" face="happy" arms="show" />
          </Place>
          <Place x={156} y={298} s={0.5} tap={TAP_TSEHAY}>
            <Gelada who="tsehay" face="joy" arms="play" krar glow />
          </Place>
          <SongSun x={210} y={110} delay={1.2} />
          <Heart x={232} y={150} s={0.9} delay={1.8} dur={3.6} />
          <Air kind="dusk" seed={7} grass={false} />
        </Scene>
      );
    // "Here is the first note." Thunk! It buzzed like a grumpy fly. Grandpa chuckled. "Try again, one more time!"
    case 3:
      return (
        <Scene>
          <Yard id={id} />
          <Hen x={340} y={292} s={0.9} flip />
          <Place x={196} y={262} s={0.46} tap={TAP_TSEHAY}>
            <Gelada who="tsehay" face="worried" arms="play" krar />
          </Place>
          <g transform="translate(276 128) scale(1.4) translate(-240 -170)">
            <GrumpyFly x={240} y={170} />
          </g>
          <Place x={280} y={262} s={0.5} tap={TAP_GRANDPA}>
            <g className="grandpas-krar-chuckle">
              <Gelada who="grandpa" face="joy" />
            </g>
          </Place>
          <BeeHover x={80} y={150} s={1} />
          <Air kind="day" seed={9} />
        </Scene>
      );
    // Tring! This time it rang out clear. One note! Then two. Then three. Tring, trang, trong!
    case 4:
      return (
        <Scene>
          <Yard id={id} />
          <Hen x={110} y={296} s={0.8} delay={-0.4} />
          <Place x={196} y={262} s={0.46} tap={TAP_TSEHAY}>
            <Gelada who="tsehay" face="joy" arms="play" krar ring />
          </Place>
          <Place x={280} y={262} s={0.5} tap={TAP_GRANDPA}>
            <Gelada who="grandpa" face="happy" arms="clap" />
          </Place>
          <CountNotes spots={[[130, 120, 0.8], [196, 98, 1.8], [262, 120, 2.8]]} />
          <Air kind="day" seed={11} />
        </Scene>
      );
    // But the strings were tight, and her fingertips went red and sore. "Ouch. My fingers hurt. I want to stop."
    case 5:
      return (
        <Scene>
          <Yard id={id} />
          {/* the krar, put down against the bench */}
          <g transform="translate(166 244) rotate(-12) scale(0.36)">
            <Tappable reaction="wiggle" sound="pop">
              <KrarShape />
            </Tappable>
          </g>
          <Place x={218} y={262} s={0.48} tap={TAP_TSEHAY}>
            <Gelada who="tsehay" face="sad" arms="show" tips="#E2463F" />
          </Place>
          <Place x={300} y={262} s={0.5} tap={TAP_GRANDPA}>
            <g className="grandpas-krar-lean-in">
              <Gelada who="grandpa" face="worried" />
            </g>
          </Place>
          <Hen x={90} y={292} s={0.8} delay={-0.8} />
          <Air kind="day" seed={13} />
        </Scene>
      );
    // Grandpa showed her his fingertips, hard and smooth. "Mine hurt too. Fingers grow strong, a little every day."
    case 6:
      return (
        <Scene>
          <Yard id={id} golden />
          <g transform="translate(150 244) rotate(-12) scale(0.36)">
            <Tappable reaction="wiggle" sound="pop">
              <KrarShape />
            </Tappable>
          </g>
          <Place x={196} y={262} s={0.46} tap={TAP_TSEHAY}>
            <Gelada who="tsehay" face="happy" />
          </Place>
          <Place x={282} y={262} s={0.52} tap={TAP_GRANDPA}>
            <Gelada who="grandpa" face="happy" arms="show" tips="#E8D2B4" />
          </Place>
          <Heart x={240} y={150} s={1} delay={0.8} dur={3.6} />
          <Heart x={226} y={166} s={0.7} delay={2.4} dur={3.6} />
          <Hen x={350} y={294} s={0.8} flip delay={-1.2} />
          <Air kind="dusk" seed={15} />
        </Scene>
      );
    // So Tsehay practised a little every day: under the lemon tree, by the chickens, even while Gugu danced.
    case 7:
      return (
        <Scene>
          <Yard id={id} bench={false} />
          <LemonTree x={250} y={236} s={1.1} />
          <Place x={238} y={292} s={0.46} tap={TAP_TSEHAY}>
            <Gelada who="tsehay" face="happy" arms="play" krar ring />
          </Place>
          <Notes x={232} y={170} n={3} spread={40} />
          <Hen x={330} y={290} s={0.9} flip />
          <Hen x={364} y={276} s={0.7} flip delay={-0.6} />
          <Place x={110} y={290} s={0.42} tap={TAP_GUGU}>
            <g className="grandpas-krar-silly">
              <Gelada who="gugu" face="joy" arms="wave" />
            </g>
          </Place>
          <Air kind="day" seed={17} />
        </Scene>
      );
    // Some days a note went twang! But Lali hummed the tune to help her. Four notes. Five notes. The whole song!
    case 8:
      return (
        <Scene>
          <Yard id={id} golden />
          <Place x={200} y={262} s={0.5} tap={TAP_TSEHAY}>
            <Gelada who="tsehay" face="joy" arms="play" krar ring />
          </Place>
          <BeeFlight path="M120 150 C140 90 260 90 280 150 C260 200 140 200 120 150Z" dur={5} s={1.1} rest={[280, 150]} trailColor="#FFE27A" happy />
          <CountNotes spots={[[96, 110, 0.8], [304, 110, 1.8]]} from={4} />
          <Notes x={200} y={140} n={6} spread={140} />
          <Hen x={330} y={292} s={0.8} flip />
          <Air kind="dusk" seed={19} />
        </Scene>
      );
    // "On Sunday, the family is coming for coffee. Will you play for them?" Tsehay's tummy fluttered.
    case 9:
      return (
        <Scene>
          <Sky id={id} from="#2B3A8C" mid="#6A5AA8" to="#E8A08A" />
          <Stars seed={6} n={20} bottom={120} />
          <Moon x={330} y={64} r={18} />
          <Mountains far="#5A5A9E" mid="#4A4A8A" />
          <Hills back="#3E7A6A" front="#2E6A5A" />
          {/* the house at dusk, its doorway warm */}
          <Depth z={-0.15}>
            <path d="M40 120 L250 120 L250 236 L40 236Z" fill="#B88A64" />
            <path d="M28 124 L262 124 L240 92 L50 92Z" fill="#9A7A3A" />
            <rect x={104} y={150} width={56} height={86} rx={4} fill="#FFD27A" />
            <rect x={104} y={150} width={56} height={86} rx={4} fill="#FFE9A0" className="lali-pulse" style={st({ "--dur": "3s" })} />
            <rect x={190} y={150} width={34} height={28} rx={3} fill="#FFD27A" />
          </Depth>
          <path d="M-20 236 Q200 224 420 238 L420 320 L-20 320Z" fill="#6A5A4A" />
          <Place x={118} y={294} s={0.54} tap={TAP_GRANDPA}>
            <Gelada who="grandpa" face="happy" arms="stick" />
          </Place>
          <Place x={248} y={296} s={0.46} tap={TAP_TSEHAY}>
            <g className="grandpas-krar-flutter">
              <Gelada who="tsehay" face="worried" arms="hold" />
            </g>
          </Place>
          <Butterfly x={226} y={268} color="#FFD233" />
          <Butterfly x={274} y={262} color="#FF8FB1" delay={-0.8} />
          <Butterfly x={252} y={252} color="#9C8CF0" delay={-1.6} />
          <Air kind="night" seed={21} grass={false} />
        </Scene>
      );
    // On Sunday, everyone sat in a circle. Tsehay's paws shook. Grandpa winked. She took a deep breath.
    case 10:
      return (
        <Scene>
          <Home id={id} sunday />
          <Place x={62} y={262} s={0.42} tap={{ reaction: "grow", sound: "chime" }}>
            <CubShape pose="sit" granny mood="happy" />
          </Place>
          <Place x={140} y={256} s={0.36} tap={TAP_CUB}>
            <CubShape pose="sit" mood="happy" look={3} />
          </Place>
          <Place x={268} y={258} s={0.48} tap={TAP_GRANDPA}>
            <Gelada who="grandpa" face="wink" />
          </Place>
          <Place x={346} y={262} s={0.4} tap={TAP_GUGU}>
            <Gelada who="gugu" face="happy" />
          </Place>
          <Coffee x={96} y={292} s={0.9} />
          <Place x={200} y={302} s={0.5} tap={TAP_TSEHAY}>
            <g className="grandpas-krar-shake">
              <Gelada who="tsehay" face="worried" arms="play" krar />
            </g>
          </Place>
          <BeeHover x={330} y={156} s={1} flip />
          <Air kind="day" seed={23} grass={false} />
        </Scene>
      );
    // Tring, trang, trong… Tsehay played the sunshine song, clear and bright. Even the birds stopped to listen.
    case 11:
      return (
        <Scene>
          <Home id={id} sunday />
          <LightRays x={326} y={108} n={4} />
          {/* birds on the windowsill, listening */}
          {[302, 326, 350].map((bx, i) => (
            <g key={bx} transform={`translate(${bx} 140)`}>
              <Tappable reaction="bounce" sound="pop">
                <g className="grandpas-krar-listen" style={st({ "--delay": `${-i * 0.5}s` })}>
                  <ellipse cx={0} cy={-8} rx={8} ry={7} fill={["#3E7FD0", "#E2463F", "#F5B21E"][i]} />
                  <circle cx={5} cy={-15} r={5} fill={["#3E7FD0", "#E2463F", "#F5B21E"][i]} />
                  <circle cx={6.5} cy={-16} r={1.2} fill={INK} />
                  <path d="M9 -15 L13 -14 L9 -12Z" fill="#F08A2A" />
                </g>
              </Tappable>
            </g>
          ))}
          <Place x={62} y={262} s={0.42} tap={{ reaction: "grow", sound: "chime" }}>
            <CubShape pose="sit" granny mood="happy" />
          </Place>
          <Place x={136} y={256} s={0.36} tap={TAP_CUB}>
            <CubShape pose="sit" mood="wow" look={3} />
          </Place>
          <Place x={276} y={258} s={0.48} tap={TAP_GRANDPA}>
            <Gelada who="grandpa" face="closed" />
          </Place>
          <Place x={350} y={264} s={0.4} tap={TAP_GUGU}>
            <Gelada who="gugu" face="happy" />
          </Place>
          <Place x={200} y={302} s={0.52} tap={TAP_TSEHAY}>
            <g className="grandpas-krar-sway">
              <Gelada who="tsehay" face="closed" arms="play" krar ring glow />
            </g>
          </Place>
          <Notes x={200} y={170} n={7} spread={150} />
          <BeeHover x={110} y={150} s={1} />
          <Air kind="day" seed={25} grass={false} />
        </Scene>
      );
    // Everyone clapped and cheered, "Ililil!" "Now our krar has two players." They played the song together.
    case 12:
      return (
        <Scene>
          <Home id={id} sunday />
          <Place x={52} y={268} s={0.42} className="grandpas-krar-bounce" tap={{ reaction: "grow", sound: "chime" }}>
            <CubShape pose="sit" granny mood="joy" />
          </Place>
          <Place x={352} y={268} s={0.42} tap={TAP_GUGU}>
            <Gelada who="gugu" face="joy" arms="clap" />
          </Place>
          <Place x={112} y={264} s={0.36} className="lali-hop" tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Place x={270} y={292} s={0.56} tap={TAP_GRANDPA}>
            <g className="grandpas-krar-sway" style={st({ "--delay": "-0.4s" })}>
              <Gelada who="grandpa" face="joy" arms="clap" shine />
            </g>
          </Place>
          <Place x={186} y={302} s={0.52} tap={TAP_TSEHAY}>
            <g className="grandpas-krar-sway">
              <Gelada who="tsehay" face="joy" arms="play" krar ring />
            </g>
          </Place>
          <Notes x={170} y={170} n={4} spread={60} />
          <Notes x={276} y={160} n={4} spread={50} />
          <g>
            {[
              [80, 150, 0.4],
              [320, 140, 0.7],
              [200, 90, 1],
              [130, 110, 1.3],
              [280, 100, 1.6],
            ].map(([hx, hy, d], i) => (
              <g key={i} transform={`translate(${hx} ${hy})`}>
                <g className="grandpas-krar-cheer" style={st({ "--delay": `${d}s` })}>
                  {i % 2 ? (
                    <path d="M0 8 C-10 0 -8 -10 -2 -10 C0 -10 0 -8 0 -6 C0 -8 0 -10 2 -10 C8 -10 10 0 0 8Z" fill="#E2463F" />
                  ) : (
                    <path d="M0 -9 Q2 -2 9 0 Q2 2 0 9 Q-2 2 -9 0 Q-2 -2 0 -9Z" fill="#FFD233" />
                  )}
                </g>
              </g>
            ))}
          </g>
          <BeeFlight path="M80 70 C140 30 260 30 320 70 C260 110 140 110 80 70Z" dur={5} s={1} rest={[320, 70]} happy />
          <Air kind="day" seed={27} grass={false} />
        </Scene>
      );
    default:
      return null;
  }
}
