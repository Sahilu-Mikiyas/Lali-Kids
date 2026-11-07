"use client";

import "./big-sneeze.css";

import { useId, type CSSProperties, type ReactNode } from "react";

import { CubShape, type Mood } from "../../characters";
import { Air, BeeFlight, BeeHover, Birds, Butterfly, Depth, DriftCloud, Flower, Heart, LightRays, Mountains, Place, Rock, Sky, Sun, Tukul, vars } from "../scenery";
import { Tappable } from "../tappable";

/*
  "Gugu's Big Sneeze": one living picture per page (13 pages).
  Gugu is drawn here (not with the shared GuguShape) because his face has to do things the
  shared one can't: squint and flare for "Ah… ah…", screw up tight for "CHOO!", and sneeze
  into his elbow at the end. His head tips back as a sneeze builds and snaps forward when it
  comes; a blast of wind rolls out, and whatever it hits (the hat, the leaves, the netela, the
  nest) flies once and lands. Keyframes are big-sneeze-* in ./big-sneeze.css (transforms and
  opacity only). Everything rests where it lands, so reduced motion shows the finished pose:
  the hat on the goat, the nest on Anbessa, the leaves on the ground.
*/

const r1 = (n: number) => Math.round(n * 10) / 10;
const st = (v: Record<string, string | number>) => vars(v) as CSSProperties;

const INK = "#1A0F0A";
const G_CAPE = "#D9A46A";
const G_CAPE_DARK = "#B9824E";
const G_BODY = "#A8744A";
const G_FACE = "#4A2E24";
const G_HAND = "#5A3A2A";
const LEAF = "#4FAE5E";
const LEAF_DARK = "#2F8A48";

/* ---------- Gugu, with a face for every stage of a sneeze ---------- */

type Face = "happy" | "joy" | "sniff" | "ah" | "choo" | "worried" | "oops";
type Arm = "rest" | "wave" | "heart" | "up" | "lift" | "elbow" | "broom" | "cheer";

function GEyes({ face }: { face: Face }) {
  const lids = (
    <>
      <ellipse cx={86} cy={82} rx={11} ry={9} fill="#E8CDB0" />
      <ellipse cx={114} cy={82} rx={11} ry={9} fill="#E8CDB0" />
    </>
  );
  const line = { stroke: INK, strokeWidth: 3.4, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (face === "joy" || face === "sniff") {
    // happy closed eyes
    return (
      <g>
        {lids}
        <path d="M78 86 Q86 79 94 86 M106 86 Q114 79 122 86" {...line} />
      </g>
    );
  }
  if (face === "ah") {
    // squinty, fluttering
    return (
      <g>
        {lids}
        <g className="big-sneeze-squint">
          <path d="M78 85 Q86 89 94 85 M106 85 Q114 89 122 85" {...line} />
          <path d="M80 84 l-3 -3 M92 84 l3 -3 M108 84 l-3 -3 M120 84 l3 -3" {...line} strokeWidth={2} />
        </g>
        <path d="M76 66 Q86 60 96 66 M104 66 Q114 60 124 66" stroke="#E8CDB0" strokeWidth={3} fill="none" strokeLinecap="round" />
      </g>
    );
  }
  if (face === "choo") {
    // screwed up tight
    return (
      <g>
        {lids}
        <path d="M80 79 L93 85 L80 91 M120 79 L107 85 L120 91" {...line} strokeWidth={3.8} />
      </g>
    );
  }
  return (
    <g>
      {lids}
      {[86, 114].map((x) => (
        <g key={x} className="lali-blink" style={{ animationDuration: "5.2s" }}>
          <ellipse cx={x} cy={86} rx={7.5} ry={8} fill="#FFF7E6" />
          <g className="lali-look" style={{ animationDuration: "8.5s" }}>
            <circle cx={x + 1} cy={87} r={5} fill={INK} />
            <circle cx={x + 2.6} cy={85} r={1.8} fill="#fff" />
          </g>
        </g>
      ))}
      {(face === "worried" || face === "oops") && (
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
  switch (face) {
    case "joy":
      return (
        <g>
          <path d="M86 118 Q100 140 114 118Z" fill="#8A2F1E" />
          <path d="M93 128 Q100 124 107 128 Q100 134 93 128Z" fill="#FF8C8C" />
        </g>
      );
    case "sniff":
      return <path d="M92 123 Q100 128 108 123" {...lip} />;
    case "ah":
      return <ellipse cx={100} cy={126} rx={6} ry={8} fill="#8A2F1E" className="big-sneeze-gasp" />;
    case "choo":
      return <ellipse cx={100} cy={126} rx={13} ry={9} fill="#8A2F1E" />;
    case "worried":
      return <path d="M88 125 Q94 120 100 125 Q106 130 112 125" {...lip} />;
    case "oops":
      return <ellipse cx={100} cy={126} rx={4.5} ry={5.5} fill="#8A2F1E" />;
    default:
      return <path d="M88 120 Q100 130 112 120" {...lip} />;
  }
}

/** Gugu the gelada, in his 200 × 240 box (feet near y = 230). */
function Gugu({ face = "happy", arm = "rest", head, hop = false }: { face?: Face; arm?: Arm; head?: "ah" | "choo" | "wiggle" | "shake"; hop?: boolean }) {
  const big = face === "ah" || face === "choo";
  const headCls = head === "ah" ? "big-sneeze-tipback" : head === "choo" ? "big-sneeze-snap" : head === "shake" ? "lali-no" : "lali-tilt";
  return (
    <g>
      <ellipse cx={100} cy={233} rx={60} ry={7} fill="#000" opacity={0.13} />
      <g className={hop ? "lali-hop" : undefined}>
        <g className="lali-tail" style={st({ transformOrigin: "100% 100%", "--dur": "2.2s" })}>
          <path d="M66 222 C30 226 18 200 26 176" stroke={G_BODY} strokeWidth={8} fill="none" strokeLinecap="round" />
          <ellipse cx={27} cy={170} rx={8} ry={12} fill={G_CAPE_DARK} />
        </g>
        <g className={head === "ah" ? "big-sneeze-inhale" : "lali-breathe"}>
          <path d="M56 230 C48 186 62 150 100 148 C138 150 152 186 144 230Z" fill={G_BODY} />
          <ellipse cx={70} cy={222} rx={22} ry={13} fill={G_BODY} />
          <ellipse cx={130} cy={222} rx={22} ry={13} fill={G_BODY} />
          <ellipse cx={62} cy={229} rx={15} ry={7} fill={G_HAND} />
          <ellipse cx={138} cy={229} rx={15} ry={7} fill={G_HAND} />
          {/* the red heart on his chest */}
          <path d="M100 214 C78 198 76 178 88 174 C95 172 99 176 100 180 C101 176 105 172 112 174 C124 178 122 198 100 214Z" fill="#F7D9C4" />
          <path d="M100 209 C82 196 81 180 90 178 C95 177 99 180 100 184 C101 180 105 177 110 178 C119 180 118 196 100 209Z" fill="#E2463F" />
          <path d="M92 184 Q96 182 98 186" stroke="#FF8F86" strokeWidth={2.2} fill="none" strokeLinecap="round" />
          <path d="M44 150 C50 118 76 108 100 108 C124 108 150 118 156 150 L148 166 L138 156 L130 172 L120 160 L114 176 L106 164 L100 178 L94 164 L86 176 L80 160 L70 172 L62 156 L52 166Z" fill={G_CAPE} />
          {arm !== "up" && arm !== "lift" && arm !== "broom" && arm !== "cheer" && (
            <g>
              <path d="M60 150 C50 170 52 196 66 206" stroke={G_BODY} strokeWidth={15} fill="none" strokeLinecap="round" />
              <ellipse cx={70} cy={208} rx={10} ry={8} fill={G_HAND} />
            </g>
          )}
        </g>
        {/* arms */}
        {arm === "rest" && (
          <g className="lali-g-arm">
            <path d="M140 150 C150 170 148 196 134 206" stroke={G_BODY} strokeWidth={15} fill="none" strokeLinecap="round" />
            <ellipse cx={130} cy={208} rx={10} ry={8} fill={G_HAND} />
          </g>
        )}
        {arm === "wave" && (
          <g className="lali-wave" style={st({ transformOrigin: "10% 95%" })}>
            <path d="M140 152 C154 136 162 116 160 96" stroke={G_BODY} strokeWidth={15} fill="none" strokeLinecap="round" />
            <ellipse cx={160} cy={90} rx={10} ry={11} fill={G_HAND} />
            <path d="M152 84 l-3 -9 M158 80 l-1 -10 M164 80 l2 -9 M169 85 l4 -7" stroke={G_HAND} strokeWidth={5} strokeLinecap="round" />
          </g>
        )}
        {arm === "heart" && (
          <g>
            <path d="M140 152 C146 172 130 186 112 190" stroke={G_BODY} strokeWidth={15} fill="none" strokeLinecap="round" />
            <ellipse cx={108} cy={190} rx={11} ry={9} fill={G_HAND} />
          </g>
        )}
        {(arm === "up" || arm === "cheer") && (
          <g className={arm === "cheer" ? "big-sneeze-cheer" : undefined}>
            <path d="M60 152 C42 130 40 100 54 70" stroke={G_BODY} strokeWidth={15} fill="none" strokeLinecap="round" />
            <path d="M140 152 C158 130 160 100 146 70" stroke={G_BODY} strokeWidth={15} fill="none" strokeLinecap="round" />
            <ellipse cx={55} cy={64} rx={10} ry={11} fill={G_HAND} />
            <ellipse cx={145} cy={64} rx={10} ry={11} fill={G_HAND} />
          </g>
        )}
        {arm === "lift" && (
          <g>
            <path d="M60 152 C40 120 50 60 82 16" stroke={G_BODY} strokeWidth={15} fill="none" strokeLinecap="round" />
            <path d="M140 152 C160 120 150 60 118 16" stroke={G_BODY} strokeWidth={15} fill="none" strokeLinecap="round" />
          </g>
        )}
        {arm === "broom" && (
          <g>
            <path d="M60 152 C66 176 92 186 116 186" stroke={G_BODY} strokeWidth={15} fill="none" strokeLinecap="round" />
            <path d="M140 152 C150 166 150 178 146 190" stroke={G_BODY} strokeWidth={15} fill="none" strokeLinecap="round" />
          </g>
        )}
        {/* head */}
        <g className={headCls} style={st({ "--tilt": "7deg", "--dur": "5.5s" })}>
          <ellipse cx={100} cy={84} rx={60} ry={54} fill={G_CAPE_DARK} />
          <g fill={G_CAPE}>
            <circle cx={58} cy={52} r={18} />
            <circle cx={142} cy={52} r={18} />
            <circle cx={80} cy={34} r={18} />
            <circle cx={120} cy={34} r={18} />
            <circle cx={100} cy={28} r={18} />
            <circle cx={46} cy={84} r={16} />
            <circle cx={154} cy={84} r={16} />
          </g>
          <ellipse cx={100} cy={88} rx={50} ry={48} fill={G_CAPE} />
          <ellipse cx={52} cy={84} rx={8} ry={11} fill={G_FACE} className="lali-ear-twitch" />
          <ellipse cx={148} cy={84} rx={8} ry={11} fill={G_FACE} />
          <path d="M100 52 C126 52 136 72 134 96 C132 124 120 140 100 140 C80 140 68 124 66 96 C64 72 74 52 100 52Z" fill={G_FACE} />
          <GEyes face={face} />
          <g className={head === "wiggle" || face === "ah" ? "big-sneeze-nose" : undefined}>
            <ellipse cx={100} cy={116} rx={22} ry={17} fill="#5E3B2E" />
            <ellipse cx={95} cy={108} rx={big ? 4.2 : 3} ry={big ? 3.4 : 2.3} fill={INK} />
            <ellipse cx={105} cy={108} rx={big ? 4.2 : 3} ry={big ? 3.4 : 2.3} fill={INK} />
          </g>
          <GMouth face={face} />
          <ellipse cx={72} cy={110} rx={7} ry={4.5} fill="#E2463F" opacity={face === "ah" || face === "oops" ? 0.6 : 0.35} />
          <ellipse cx={128} cy={110} rx={7} ry={4.5} fill="#E2463F" opacity={face === "ah" || face === "oops" ? 0.6 : 0.35} />
        </g>
        {arm === "lift" && (
          <g fill={G_HAND}>
            <ellipse cx={84} cy={12} rx={10} ry={11} />
            <ellipse cx={116} cy={12} rx={10} ry={11} />
          </g>
        )}
        {/* the elbow that catches the last sneeze: drawn over the face */}
        {arm === "elbow" && (
          <g>
            <path d="M142 152 C138 132 124 120 104 118 C88 117 74 112 64 100" stroke={G_BODY} strokeWidth={17} fill="none" strokeLinecap="round" />
            <path d="M120 122 Q110 118 100 119" stroke="#8E6038" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.6} />
            <ellipse cx={60} cy={96} rx={10} ry={10} fill={G_HAND} />
          </g>
        )}
      </g>
    </g>
  );
}

/* ---------- Anbessa's hat, the cast's accessories ---------- */

/** Anbessa's straw sun hat with its red band, centred on its brim at (0, 0). */
function HatShape() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={38} ry={9} fill="#D9AE4E" />
      <path d="M-22 -2 Q-22 -30 0 -32 Q22 -30 22 -2Z" fill="#E8C266" />
      <path d="M-22 -6 Q0 -2 22 -6 L22 -13 Q0 -9 -22 -13Z" fill="#D8433A" />
      <path d="M-14 -24 Q-6 -29 4 -28" stroke="#fff" strokeOpacity={0.45} strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d="M-34 2 Q0 9 34 2" stroke="#B58A30" strokeWidth={2} fill="none" />
    </g>
  );
}

/** The nest with three chicks peeping out (and their mouths opening), centred at (0, 0). */
function NestShape({ peep = true }: { peep?: boolean }) {
  return (
    <g>
      {[-14, 0, 14].map((x, i) => (
        <g key={x} transform={`translate(${x} -8)`}>
          <g className={peep ? "big-sneeze-peep" : undefined} style={st({ "--delay": `${-i * 0.35}s` })}>
            <circle cx={0} cy={0} r={8} fill="#FFE07A" />
            <circle cx={-2.6} cy={-2} r={1.5} fill={INK} />
            <circle cx={2.6} cy={-2} r={1.5} fill={INK} />
            <path d="M-3.4 2 L0 -0.4 L3.4 2 L0 6Z" fill="#F08A2A" />
            <path d="M-2 -8 l1 -4 M2 -8 l2 -3" stroke="#FFE07A" strokeWidth={1.6} strokeLinecap="round" />
          </g>
        </g>
      ))}
      <path d="M-28 -4 Q-26 14 0 15 Q26 14 28 -4 Q0 2 -28 -4Z" fill="#9A6A3A" />
      <path d="M-28 -4 Q0 4 28 -4 M-25 3 Q0 9 25 3 M-20 9 Q0 13 20 9" stroke="#7A4E28" strokeWidth={2} fill="none" />
      <path d="M-30 -5 l-6 -4 M30 -5 l6 -5 M-12 0 l-4 -8 M18 -1 l3 -8" stroke="#B5844E" strokeWidth={1.8} strokeLinecap="round" />
    </g>
  );
}

/** A yellow village weaver bird, centred at (0, 0), facing right. */
function Weaver({ flap = false, happy = true }: { flap?: boolean; happy?: boolean }) {
  return (
    <g>
      <g className={flap ? "big-sneeze-flap" : undefined}>
        <path d="M-4 -4 Q-18 -22 -26 -12 Q-16 -6 -4 2Z" fill="#E8B21E" />
      </g>
      <path d="M-14 4 L-24 8 L-14 0Z" fill="#9A7A1A" />
      <ellipse cx={0} cy={0} rx={13} ry={10} fill="#FFD233" />
      <circle cx={10} cy={-6} r={8} fill="#FFD233" />
      <path d="M6 -10 Q12 -14 17 -8 Q14 -1 8 -2Z" fill="#2A1A10" />
      <circle cx={12} cy={-7} r={1.8} fill="#E8513B" />
      <path d="M17 -7 L23 -5 L17 -3Z" fill="#3A2A20" />
      {happy ? (
        <path d="M2 4 Q6 7 10 4" stroke="#C8901A" strokeWidth={1.4} fill="none" />
      ) : (
        <path d="M-6 -12 l-2 -6 M-1 -13 l1 -6" stroke="#C8901A" strokeWidth={1.6} strokeLinecap="round" />
      )}
      <path d="M-2 9 v5 M4 9 v5" stroke="#9A6A2A" strokeWidth={1.6} strokeLinecap="round" />
    </g>
  );
}

/** A friendly goat, standing, facing left, feet at (0, 0). `hat`: wearing Anbessa's hat. */
function Goat({ hat = false, nod = false, brace = false }: { hat?: boolean; nod?: boolean; brace?: boolean }) {
  return (
    <g>
      <ellipse cx={4} cy={1} rx={34} ry={5} fill="#000" opacity={0.13} />
      <g className={brace ? "big-sneeze-brace" : "lali-breathe"}>
        <rect x={-22} y={-24} width={6} height={24} rx={3} fill="#6A5446" />
        <rect x={-10} y={-24} width={6} height={24} rx={3} fill="#5A463A" />
        <rect x={16} y={-24} width={6} height={24} rx={3} fill="#6A5446" />
        <rect x={26} y={-24} width={6} height={24} rx={3} fill="#5A463A" />
        <ellipse cx={6} cy={-34} rx={32} ry={18} fill="#F2EDE4" />
        <path d="M-14 -26 Q6 -20 30 -28" stroke="#D9D0C2" strokeWidth={4} fill="none" strokeLinecap="round" />
        <ellipse cx={14} cy={-40} rx={10} ry={6} fill="#8A6A52" opacity={0.85} />
        <path d="M36 -38 Q46 -46 42 -54" stroke="#F2EDE4" strokeWidth={5} fill="none" strokeLinecap="round" />
      </g>
      <g className={nod ? "big-sneeze-nod" : "lali-tilt"} style={st({ "--tilt": "-8deg", "--dur": "4.8s" })}>
        <path d="M-20 -46 L-28 -50" stroke="#F2EDE4" strokeWidth={10} strokeLinecap="round" />
        {/* horns */}
        <path d="M-30 -66 Q-26 -82 -14 -84" stroke="#B8A890" strokeWidth={4.5} fill="none" strokeLinecap="round" />
        <path d="M-38 -66 Q-38 -80 -28 -86" stroke="#A89880" strokeWidth={4} fill="none" strokeLinecap="round" />
        <ellipse cx={-24} cy={-62} rx={6} ry={4} fill="#E2D8CA" transform="rotate(30 -24 -62)" />
        <path d="M-34 -70 C-50 -70 -56 -58 -52 -48 C-50 -42 -44 -40 -40 -42 C-34 -48 -26 -54 -28 -64Z" fill="#F7F3EC" />
        <circle cx={-40} cy={-60} r={2.6} fill={INK} className="lali-blink" />
        <circle cx={-39.2} cy={-61} r={0.9} fill="#fff" />
        <ellipse cx={-52} cy={-50} rx={2} ry={1.4} fill="#C99A9A" />
        <path d="M-50 -44 Q-47 -42 -44 -44" stroke="#8A6A6A" strokeWidth={1.4} fill="none" strokeLinecap="round" />
        <path d="M-46 -42 Q-50 -32 -44 -30 Q-42 -36 -42 -42Z" fill="#E2D8CA" />
        {hat && (
          <g transform="translate(-34 -70) rotate(-12) scale(0.6)">
            <HatShape />
          </g>
        )}
      </g>
    </g>
  );
}

/** Grandma standing in her white dress with its tibeb hem; `shawl`: her netela round her shoulders. */
function Grandma({ mood = "happy", shawl = true, hold = false }: { mood?: Mood; shawl?: boolean; hold?: boolean }) {
  const cid = useId().replace(/:/g, "");
  return (
    <g>
      <defs>
        <clipPath id={`${cid}-h`}>
          <rect x={0} y={0} width={200} height={152} />
        </clipPath>
      </defs>
      <ellipse cx={100} cy={232} rx={58} ry={7} fill="#000" opacity={0.13} />
      <ellipse cx={84} cy={226} rx={12} ry={6} fill="#C98A4A" />
      <ellipse cx={116} cy={226} rx={12} ry={6} fill="#C98A4A" />
      <g className="lali-breathe">
        <path d="M66 140 Q100 128 134 140 L150 224 Q100 232 50 224Z" fill="#FFFDF4" />
        <path d="M52 214 Q100 222 148 214" stroke="#2E9A8A" strokeWidth={6} fill="none" />
        <path d="M52 214 Q100 222 148 214" stroke="#F5B21E" strokeWidth={2.4} strokeDasharray="4 4" fill="none" />
        <path d="M94 142 L100 170 L106 142" stroke="#2E9A8A" strokeWidth={3} fill="none" />
        {shawl && (
          <g>
            <path d="M58 146 Q100 170 142 144 L146 176 Q100 198 54 178Z" fill="#F4EEDC" />
            <path d="M54 178 Q100 198 146 176" stroke="#2E9A8A" strokeWidth={4} fill="none" />
            <path d="M54 178 Q100 198 146 176" stroke="#F5B21E" strokeWidth={1.6} strokeDasharray="3 3" fill="none" />
          </g>
        )}
        {hold ? (
          <g>
            <path d="M64 152 Q62 172 88 172" stroke={shawl ? "#F4EEDC" : "#FFFDF4"} strokeWidth={14} fill="none" strokeLinecap="round" />
            <path d="M136 152 Q138 172 112 172" stroke={shawl ? "#F4EEDC" : "#FFFDF4"} strokeWidth={14} fill="none" strokeLinecap="round" />
            <circle cx={92} cy={172} r={7} fill="#E8B060" />
            <circle cx={108} cy={172} r={7} fill="#E8B060" />
          </g>
        ) : (
          <g>
            <path d="M64 152 Q54 180 64 200" stroke={shawl ? "#F4EEDC" : "#FFFDF4"} strokeWidth={14} fill="none" strokeLinecap="round" />
            <path d="M136 152 Q146 180 136 200" stroke={shawl ? "#F4EEDC" : "#FFFDF4"} strokeWidth={14} fill="none" strokeLinecap="round" />
            <circle cx={64} cy={203} r={7} fill="#E8B060" />
            <circle cx={136} cy={203} r={7} fill="#E8B060" />
          </g>
        )}
      </g>
      <g clipPath={`url(#${cid}-h)`} transform="translate(0 -6)">
        <CubShape pose="sit" granny mood={mood} />
      </g>
    </g>
  );
}

/** Anbessa, sitting or standing, with his hat on (or held down tight) and maybe a nest on his head. */
function Anbessa({ mood = "happy", pose = "sit", hat = true, hold = false, nest = false, look = 0 }: { mood?: Mood; pose?: "sit" | "stand"; hat?: boolean; hold?: boolean; nest?: boolean; look?: number }) {
  const hx = pose === "sit" ? 100 : 134;
  return (
    <g className="big-sneeze-steady">
      <CubShape pose={pose} mood={mood} look={look} />
      {hat && (
        <g transform={`translate(${hx} 52)`}>
          <HatShape />
        </g>
      )}
      {nest && (
        <g transform={`translate(${hx} 48) scale(1.25)`}>
          <NestShape />
        </g>
      )}
      {hold && (
        <g fill="#FFC870" stroke="#E59F45" strokeWidth={2}>
          <path d={`M${hx - 52} 150 Q${hx - 62} 100 ${hx - 34} 54`} stroke="#F7B95E" strokeWidth={16} fill="none" strokeLinecap="round" />
          <path d={`M${hx + 52} 150 Q${hx + 62} 100 ${hx + 34} 54`} stroke="#F7B95E" strokeWidth={16} fill="none" strokeLinecap="round" />
          <ellipse cx={hx - 32} cy={50} rx={11} ry={9} />
          <ellipse cx={hx + 32} cy={50} rx={11} ry={9} />
        </g>
      )}
    </g>
  );
}

/* ---------- the village ---------- */

function Land({ id, sun = [342, 58], tukul = true }: { id: string; sun?: [number, number] | null; tukul?: boolean }) {
  return (
    <>
      <Sky id={id} from="#7FCFFF" mid="#BDE8FF" to="#FFF6DE" />
      {sun && <LightRays x={sun[0]} y={sun[1]} />}
      {sun && <Sun x={sun[0]} y={sun[1]} r={21} />}
      <DriftCloud y={52} s={0.7} dur={80} phase={0.2} />
      <DriftCloud y={34} s={0.45} dur={64} phase={0.66} />
      <Birds y={78} dur={24} phase={0.4} />
      <Mountains />
      <Depth z={-0.25}>
        <path d="M-10 196 Q90 166 200 174 T410 176 L410 310 L-10 310Z" fill="#8FD39A" />
        {tukul && <Tukul x={64} y={192} s={0.5} />}
        {tukul && <Tukul x={360} y={186} s={0.38} />}
      </Depth>
      <path d="M-10 226 Q120 210 230 218 T410 214 L410 310 L-10 310Z" fill="#62C076" />
      <path d="M-10 226 Q120 210 230 218 T410 214" stroke="#fff" strokeOpacity={0.22} strokeWidth={3} fill="none" />
      {/* the dusty path through the village */}
      <path d="M150 310 Q170 270 196 226 L218 226 Q222 270 262 310Z" fill="#E8C98E" opacity={0.55} />
    </>
  );
}

/** The big tree by the path: `leaves` full, thin (after the sneeze) or bare-ish; `nest` on its branch. */
function Tree({ x, y, s = 1, leaves = "full", nest = false, bird = true, shake = false }: { x: number; y: number; s?: number; leaves?: "full" | "thin"; nest?: boolean; bird?: boolean; shake?: boolean }) {
  const crown =
    leaves === "full"
      ? [
          [-42, -150, 34],
          [0, -168, 40],
          [42, -150, 34],
          [-22, -128, 30],
          [24, -126, 32],
          [-56, -122, 24],
          [56, -120, 24],
        ]
      : [
          [-36, -146, 22],
          [6, -164, 26],
          [40, -140, 20],
          [14, -124, 18],
        ];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={60} ry={8} fill="#000" opacity={0.12} />
      <path d="M-14 0 Q-6 -50 -8 -100 L8 -100 Q6 -50 14 0Z" fill="#8A5E3A" />
      <path d="M-6 -96 Q-30 -110 -48 -104 M4 -100 Q26 -118 44 -112 M-4 -86 Q-36 -84 -70 -92" stroke="#8A5E3A" strokeWidth={7} fill="none" strokeLinecap="round" />
      <path d="M-2 -40 Q-2 -70 -4 -90" stroke="#6E4A2C" strokeWidth={2} fill="none" />
      <Tappable reaction="wiggle" sound="pop">
        <g className={shake ? "big-sneeze-shake" : "lali-sway"} style={st({ "--dur": "5s" })}>
          {crown.map(([cx, cy, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill={i % 2 ? LEAF : LEAF_DARK} />
          ))}
          {crown.map(([cx, cy, r], i) => (
            <circle key={`h${i}`} cx={cx - r * 0.3} cy={cy - r * 0.35} r={r * 0.4} fill="#7FD07A" opacity={0.35} />
          ))}
        </g>
      </Tappable>
      {nest && (
        <g transform="translate(-62 -98)">
          <Tappable reaction="bounce" sound="pop">
            <NestShape />
          </Tappable>
          {bird && (
            <g transform="translate(26 -22)">
              <Tappable reaction="bounce" sound="pop">
                <g className="lali-hop" style={st({ "--dur": "2.4s" })}>
                  <g transform="scale(-1 1)">
                    <Weaver />
                  </g>
                </g>
              </Tappable>
            </g>
          )}
        </g>
      )}
    </g>
  );
}

/** A big yellow flower, the tickly one, its head at (x, y). */
function BigFlower({ x, y, s = 1, puff = false }: { x: number; y: number; s?: number; puff?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 Q-8 50 4 110" stroke="#2E9A5B" strokeWidth={6} fill="none" strokeLinecap="round" />
      <path d="M0 70 q-26 -6 -30 -24 q22 2 30 24Z M2 86 q24 -8 28 -26 q-22 4 -28 26Z" fill="#3FAF66" />
      <Tappable reaction="grow" sound="pop">
        <g className="lali-sway" style={st({ "--dur": "3.2s" })}>
          {Array.from({ length: 10 }, (_, i) => (
            <ellipse key={i} cx={0} cy={-18} rx={8} ry={17} fill={i % 2 ? "#FFD233" : "#FFC21A"} transform={`rotate(${i * 36})`} />
          ))}
          <circle r={13} fill="#E88A1A" />
          <g fill="#FFE27A">
            {[
              [-5, -4],
              [4, -6],
              [6, 3],
              [-3, 6],
              [0, 0],
            ].map(([a, b], i) => (
              <circle key={i} cx={a} cy={b} r={1.8} />
            ))}
          </g>
        </g>
      </Tappable>
      {puff && (
        <g fill="#FFF3A0">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle key={i} cx={0} cy={0} r={2.4} className="big-sneeze-pollen" style={st({ "--delay": `${-i * 0.45}s`, "--dx": `${-52 - (i % 3) * 8}px`, "--dy": `${30 + (i % 2) * 10}px` })} />
          ))}
        </g>
      )}
    </g>
  );
}

/** One leaf, centred at (0, 0). */
function LeafShape({ c = LEAF }: { c?: string }) {
  return (
    <g>
      <path d="M-9 0 Q0 -7 9 0 Q0 7 -9 0Z" fill={c} />
      <path d="M-8 0 L8 0" stroke={LEAF_DARK} strokeWidth={1} />
    </g>
  );
}

/** Leaves blown from (fx, fy) to where they land at (x, y), tumbling, once. */
function BlownLeaves({ leaves, delay = 1.7 }: { leaves: [number, number, number, number, number][]; delay?: number }) {
  return (
    <g>
      {leaves.map(([x, y, fx, fy, a], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <g className="big-sneeze-blow" style={st({ "--fx": `${fx - x}px`, "--fy": `${fy - y}px`, "--delay": `${r1(delay + (i % 5) * 0.12)}s`, "--rot": `${a}deg` })}>
            <g transform={`rotate(${a})`}>
              <LeafShape c={i % 3 ? LEAF : "#7CC46A"} />
            </g>
          </g>
        </g>
      ))}
    </g>
  );
}

/** Leaves still swirling in the air after a sneeze, round and round. */
function SwirlLeaves({ spots }: { spots: [number, number, number][] }) {
  return (
    <Depth z={0.3}>
      {spots.map(([x, y, d], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <g className="big-sneeze-swirl" style={st({ "--delay": `${d}s` })}>
            <LeafShape c={i % 2 ? LEAF : "#7CC46A"} />
          </g>
        </g>
      ))}
    </Depth>
  );
}

/** Leaves lying on the ground, scattered (or swept into a pile). */
function FallenLeaves({ spots }: { spots: [number, number, number][] }) {
  return (
    <g>
      {spots.map(([x, y, a], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${a}) scale(1 0.7)`}>
          <LeafShape c={i % 3 ? LEAF : "#8ACB6A"} />
        </g>
      ))}
    </g>
  );
}

/** The blast of a sneeze, rolling out from the nose at (x, y) to the right. */
function Blast({ x, y, delay = 1.6, dir = 1, small = false }: { x: number; y: number; delay?: number; dir?: 1 | -1; small?: boolean }) {
  const rows = small ? [[0, 0]] : [[-26, 0], [0, 0.08], [26, 0.16], [-12, 0.24], [14, 0.3]];
  return (
    <g transform={`translate(${x} ${y}) scale(${dir} 1)`}>
      <g className="big-sneeze-burst" style={st({ "--delay": `${delay}s` })}>
        <path d="M0 -26 L8 -10 L26 -14 L14 0 L28 12 L8 10 L4 28 L-4 12 L-20 20 L-10 2 L-24 -10 L-6 -8Z" fill="#FFF6C8" stroke="#F5B21E" strokeWidth={2.4} strokeLinejoin="round" transform={small ? "scale(0.45)" : undefined} />
      </g>
      <g stroke="#fff" strokeWidth={small ? 2 : 3.2} strokeLinecap="round" fill="none">
        {rows.map(([dy, d], i) => (
          <path key={i} d={`M14 ${dy} q40 ${-8 + (i % 2) * 16} 90 0 q20 6 12 -10`} className="big-sneeze-gust" style={st({ "--delay": `${r1(delay + d)}s` })} />
        ))}
      </g>
    </g>
  );
}

/** The broom: a bundle of twigs on a stick, sweeping. */
function Broom({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="big-sneeze-sweep">
        <path d="M54 -60 L4 -8" stroke="#9A6A3A" strokeWidth={5} strokeLinecap="round" />
        <path d="M8 -14 L-12 -6 L-26 6 L-10 10 L4 10 L14 2Z" fill="#C9A24E" />
        <path d="M-4 -4 L-20 6 M2 -2 L-10 9 M8 -2 L0 9 M10 -6 L10 6" stroke="#A07A2A" strokeWidth={1.6} strokeLinecap="round" />
        <path d="M2 -16 L12 -4" stroke="#7A4A20" strokeWidth={3.4} strokeLinecap="round" />
      </g>
    </g>
  );
}

/** Grandma's netela, flying away like a big white bird (or caught in a branch). */
function Netela({ flap = true }: { flap?: boolean }) {
  return (
    <g>
      <g className={flap ? "big-sneeze-billow" : undefined}>
        <path d="M-46 -4 C-30 -18 -14 2 4 -10 C18 -20 32 -10 46 -16 L42 4 C30 12 16 0 2 12 C-14 24 -30 6 -44 14Z" fill="#FFFDF4" />
        <path d="M-30 -6 C-20 -2 -10 2 0 -2 M14 -10 C22 -8 30 -6 40 -10" stroke="#E6DCC4" strokeWidth={2} fill="none" strokeLinecap="round" />
        <path d="M-44 14 C-30 6 -14 24 2 12 C16 0 30 12 42 4" stroke="#2E9A8A" strokeWidth={4.5} fill="none" />
        <path d="M-44 14 C-30 6 -14 24 2 12 C16 0 30 12 42 4" stroke="#F5B21E" strokeWidth={1.6} strokeDasharray="3 3" fill="none" />
        <path d="M-46 -4 l-6 2 M-45 2 l-7 3 M-44 8 l-6 4 M46 -16 l6 -1 M45 -10 l7 0 M43 -3 l6 2" stroke="#E6DCC4" strokeWidth={1.6} strokeLinecap="round" />
      </g>
    </g>
  );
}

/** Little hearts and stars of a happy moment. */
function Cheer({ spots }: { spots: [number, number, number][] }) {
  return (
    <g>
      {spots.map(([x, y, d], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <g className="big-sneeze-twinkle" style={st({ "--delay": `${d}s` })}>
            {i % 2 ? (
              <path d="M0 8 C-10 0 -8 -10 -2 -10 C0 -10 0 -8 0 -6 C0 -8 0 -10 2 -10 C8 -10 10 0 0 8Z" fill="#E2463F" />
            ) : (
              <path d="M0 -9 Q2 -2 9 0 Q2 2 0 9 Q-2 2 -9 0 Q-2 -2 0 -9Z" fill="#FFD233" />
            )}
          </g>
        </g>
      ))}
    </g>
  );
}

function Scene({ children }: { children: ReactNode }) {
  return <g>{children}</g>;
}

const TAP_CUB = { reaction: "bounce", sound: "giggle" } as const;
const TAP_GUGU = { reaction: "wiggle", sound: "boing" } as const;
const TAP_GRAN = { reaction: "grow", sound: "chime" } as const;

/* ---------- the pages ---------- */

export default function BigSneeze({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Gugu went skipping through the village. Hop, skip, hop! He stopped to smell a big yellow flower.
    case 0:
      return (
        <Scene>
          <Land id={id} />
          <Tree x={322} y={236} s={0.8} nest />
          <Flower x={60} y={248} h={30} color="#FF8FB1" delay={-0.6} />
          <Flower x={92} y={256} h={26} color="#9C8CF0" delay={-1.4} />
          <BigFlower x={252} y={206} s={0.62} />
          <Place x={180} y={290} s={0.42} from={[40, 292]} dur={2.6} delay={0.3} tap={TAP_GUGU}>
            <g className="big-sneeze-skip">
              <Gugu face="joy" />
            </g>
          </Place>
          <Butterfly x={110} y={170} />
          <Butterfly x={290} y={160} color="#9C8CF0" delay={-1.2} />
          <BeeHover x={136} y={136} s={1.1} />
          <Air kind="day" seed={3} />
        </Scene>
      );
    // The flower tickled his nose. Tickle, tickle! Squinty eyes, wiggly nose. "Ah… ah…"
    case 1:
      return (
        <Scene>
          <Land id={id} sun={[52, 62]} tukul={false} />
          <Tree x={60} y={240} s={0.7} />
          <BigFlower x={238} y={172} s={1.05} puff />
          <Place x={172} y={300} s={0.7} tap={TAP_GUGU}>
            <Gugu face="ah" head="wiggle" />
          </Place>
          <g transform="translate(182 196)">
            <g className="big-sneeze-tickle">
              <path d="M0 0 q8 -6 16 0 q8 6 16 0" stroke="#F5B21E" strokeWidth={2.6} fill="none" strokeLinecap="round" />
            </g>
          </g>
          <BeeHover x={346} y={92} s={1.1} flip />
          <Air kind="day" seed={5} />
        </Scene>
      );
    // "Ah… ah… AH…" Lali zoomed over. "Hold on to your hats!" Anbessa grabbed his hat; Grandma her netela.
    case 2:
      return (
        <Scene>
          <Land id={id} />
          <Tree x={334} y={234} s={0.7} nest />
          <Place x={116} y={292} s={0.5} tap={TAP_GUGU}>
            <Gugu face="ah" head="ah" />
          </Place>
          <Place x={238} y={294} s={0.4} tap={TAP_CUB}>
            <g className="big-sneeze-tremble">
              <Anbessa mood="worried" hold look={-3} />
            </g>
          </Place>
          <Place x={314} y={292} s={0.42} tap={TAP_GRAN}>
            <Grandma mood="worried" hold />
          </Place>
          <BeeFlight path="M360 70 C300 40 220 50 190 100 C170 140 220 150 240 120 C260 90 330 90 360 70Z" dur={2.6} s={1.15} rest={[190, 100]} />
          <Air kind="day" seed={7} />
        </Scene>
      );
    // AH-CHOO! WHOOSH! Anbessa's hat flew up, up, up… and landed right on top of a goat!
    case 3:
      return (
        <Scene>
          <Land id={id} />
          <Rock x={330} y={250} s={0.9} color="#A9A3B4" />
          <g transform="translate(336 214)">
            <Tappable reaction="bounce" sound="baa">
              <Goat />
            </Tappable>
          </g>
          {/* the hat, flying from Anbessa's head to the goat's */}
          <g transform="translate(302 146)">
            <g className="big-sneeze-hatfly" style={st({ "--fx": "-62px", "--fy": "77px", "--fs": 0.67, "--delay": "1.8s" })}>
              <g transform="rotate(-12) scale(0.6)">
                <Tappable reaction="spin" sound="boing">
                  <HatShape />
                </Tappable>
              </g>
            </g>
          </g>
          <Place x={96} y={292} s={0.5} tap={TAP_GUGU}>
            <Gugu face="choo" head="choo" />
          </Place>
          <Blast x={142} y={240} delay={1.6} />
          <Place x={240} y={294} s={0.4} tap={TAP_CUB}>
            <g className="big-sneeze-blown" style={st({ "--delay": "1.7s" })}>
              <Anbessa mood="wow" hat={false} look={3} />
            </g>
          </Place>
          <SwirlLeaves spots={[[200, 150, 1.8], [260, 120, 2], [170, 110, 2.2]]} />
          <Air kind="day" seed={9} />
        </Scene>
      );
    // AH-CHOO! The leaves flew off the tree. Grandma's netela flew away, flapping like a big white bird!
    case 4:
      return (
        <Scene>
          <Land id={id} sun={[56, 58]} />
          <Tree x={300} y={236} s={0.8} leaves="thin" nest shake />
          <BlownLeaves
            leaves={[
              [360, 180, 286, 114, 30],
              [230, 270, 270, 120, -40],
              [380, 260, 310, 130, 70],
              [200, 210, 254, 140, 120],
              [340, 280, 330, 110, -20],
              [260, 290, 300, 150, 200],
              [390, 220, 280, 100, 90],
            ]}
            delay={1.6}
          />
          <SwirlLeaves spots={[[220, 100, 1.9], [330, 70, 2.2], [380, 140, 2.5], [250, 60, 2.8]]} />
          {/* the netela flies off Grandma and away over the hill */}
          <g transform="translate(226 74)">
            <g className="big-sneeze-away" style={st({ "--fx": "-52px", "--fy": "190px", "--delay": "1.8s" })}>
              <g className="lali-float" style={st({ "--rise": "-10px", "--dur": "2.6s" })}>
                <Tappable reaction="spin" sound="pop">
                  <Netela />
                </Tappable>
              </g>
            </g>
          </g>
          <Place x={86} y={292} s={0.46} tap={TAP_GUGU}>
            <Gugu face="choo" head="choo" />
          </Place>
          <Blast x={126} y={244} delay={1.5} />
          <Place x={174} y={294} s={0.42} tap={TAP_GRAN}>
            <g className="big-sneeze-blown" style={st({ "--delay": "1.7s" })}>
              <Grandma mood="wow" shawl={false} />
            </g>
          </Place>
          <Air kind="day" seed={11} />
        </Scene>
      );
    // AH-CHOO! The nest tumbled off its branch and landed, plop, on Anbessa's head. "Peep, peep!"
    case 5:
      return (
        <Scene>
          <Land id={id} />
          <Tree x={300} y={236} s={0.8} leaves="thin" shake />
          <g transform="translate(330 120)">
            <g className="big-sneeze-flutter">
              <Tappable reaction="bounce" sound="pop">
                <g transform="scale(-1.3 1.3)">
                  <Weaver flap happy={false} />
                </g>
              </Tappable>
            </g>
          </g>
          <Place x={84} y={292} s={0.46} tap={TAP_GUGU}>
            <Gugu face="choo" head="choo" />
          </Place>
          <Blast x={124} y={244} delay={1.5} />
          <Place x={232} y={294} s={0.42} tap={TAP_CUB}>
            <Anbessa mood="wow" hat={false} look={0} />
          </Place>
          {/* the nest tumbling from the branch to Anbessa's head */}
          <g transform="translate(232 217.6)">
            <g className="big-sneeze-tumble" style={st({ "--fx": "18px", "--fy": "-60px", "--fs": 1.5, "--delay": "1.8s" })}>
              <g transform="scale(0.525)">
                <Tappable reaction="bounce" sound="pop">
                  <NestShape />
                </Tappable>
              </g>
            </g>
          </g>
          <Air kind="day" seed={13} />
        </Scene>
      );
    // At last the sneezing stopped. A hat on a goat! Leaves everywhere! A nest on Anbessa! "Oh dear."
    case 6:
      return (
        <Scene>
          <Land id={id} />
          <Tree x={250} y={232} s={0.66} leaves="thin" />
          {/* the netela, caught in the branches */}
          <g transform="translate(206 148) rotate(-14) scale(0.7)">
            <Tappable reaction="wiggle" sound="pop">
              <Netela flap={false} />
            </Tappable>
          </g>
          <FallenLeaves spots={[[60, 270, 20], [120, 284, 160], [196, 262, -30], [300, 276, 40], [340, 262, 100], [250, 290, -60], [160, 300, 10], [372, 288, 70], [90, 296, -20]]} />
          <Rock x={350} y={250} s={0.7} color="#A9A3B4" />
          <g transform="translate(354 224) scale(0.9)">
            <Tappable reaction="bounce" sound="baa">
              <Goat hat />
            </Tappable>
          </g>
          <Place x={96} y={292} s={0.46} tap={TAP_GUGU}>
            <Gugu face="oops" head="shake" arm="heart" />
          </Place>
          <Place x={190} y={294} s={0.4} tap={TAP_CUB}>
            <Anbessa mood="wow" hat={false} nest look={-2} />
          </Place>
          <BeeHover x={150} y={160} s={1} flip />
          <Air kind="day" seed={15} />
        </Scene>
      );
    // "I'm sorry, everyone," said Gugu. "But I can be a big helper too! Let's put everything back."
    case 7:
      return (
        <Scene>
          <Land id={id} sun={[60, 56]} />
          <FallenLeaves spots={[[40, 276, 20], [330, 284, 160], [370, 266, -30], [280, 296, 40], [30, 296, 100]]} />
          <Place x={200} y={290} s={0.56} tap={TAP_GUGU}>
            <Gugu face="happy" arm="heart" />
          </Place>
          <Heart x={200} y={168} s={1.2} dur={3.6} />
          <Heart x={180} y={180} s={0.8} delay={1.4} dur={3.6} />
          <Place x={92} y={294} s={0.4} tap={TAP_CUB}>
            <Anbessa mood="happy" hat={false} nest look={3} />
          </Place>
          <Place x={316} y={292} s={0.42} tap={TAP_GRAN}>
            <Grandma mood="happy" shawl={false} />
          </Place>
          <BeeHover x={270} y={150} s={1.1} flip />
          <Air kind="day" seed={17} />
        </Scene>
      );
    // First, the baby birds. Gugu put the nest back on its branch. "Tweet, tweet! Thank you!"
    case 8:
      return (
        <Scene>
          <Land id={id} />
          <Tree x={250} y={211} s={0.9} leaves="thin" />
          {/* Gugu climbs on a rock and stretches up to put the nest back on its branch */}
          <Rock x={194} y={274} s={0.7} color="#A9A3B4" />
          <Place x={194} y={240} s={0.5} tap={TAP_GUGU}>
            <g className="big-sneeze-lift" style={st({ "--fy": "36px", "--delay": "0.8s" })}>
              <Gugu face="joy" arm="lift" />
            </g>
          </Place>
          <g transform="translate(194 124)">
            <g className="big-sneeze-lift" style={st({ "--fy": "36px", "--delay": "0.8s" })}>
              <g transform="scale(0.9)">
                <Tappable reaction="bounce" sound="pop">
                  <NestShape />
                </Tappable>
              </g>
            </g>
          </g>
          <g transform="translate(226 102)">
            <g className="big-sneeze-homecoming" style={st({ "--delay": "2s" })}>
              <Tappable reaction="bounce" sound="pop">
                <g transform="scale(-1.2 1.2)">
                  <Weaver />
                </g>
              </Tappable>
            </g>
          </g>
          <Cheer spots={[[150, 110, 2.4], [176, 84, 2.7], [250, 80, 3]]} />
          <Place x={86} y={294} s={0.4} tap={TAP_CUB}>
            <Anbessa mood="joy" hat={false} look={3} />
          </Place>
          <Air kind="day" seed={19} />
        </Scene>
      );
    // Next, the hat. "Excuse me, Goat, may I have that back, please?" "Meh-eh-eh!"
    case 9:
      return (
        <Scene>
          <Land id={id} sun={[54, 60]} />
          <Rock x={318} y={252} s={0.9} color="#A9A3B4" />
          <g transform="translate(324 216)">
            <Tappable reaction="bounce" sound="baa">
              <Goat nod />
            </Tappable>
          </g>
          <Place x={232} y={292} s={0.46} flip tap={TAP_GUGU}>
            <Gugu face="happy" arm="wave" />
          </Place>
          <Place x={110} y={294} s={0.42} tap={TAP_CUB}>
            <Anbessa mood="joy" hat={false} />
          </Place>
          {/* the hat hops from the goat's head, over Gugu, onto Anbessa's */}
          <g transform="translate(110 219.2)">
            <g className="big-sneeze-hathome" style={st({ "--fx": "180px", "--fy": "-73px", "--fs": 1.43, "--delay": "2.2s" })}>
              <g transform="scale(0.42)">
                <Tappable reaction="spin" sound="boing">
                  <HatShape />
                </Tappable>
              </g>
            </g>
          </g>
          <BeeHover x={62} y={130} s={1.1} />
          <Air kind="day" seed={21} />
        </Scene>
      );
    // Then the leaves. Swish, swish! One big pile. And the netela back round Grandma's shoulders.
    case 10:
      return (
        <Scene>
          <Land id={id} />
          <Tree x={334} y={234} s={0.66} leaves="thin" nest />
          {/* the pile grows as he sweeps */}
          <g transform="translate(150 286)">
            <Tappable reaction="grow" sound="pop">
              <g className="big-sneeze-pile">
                <ellipse cx={0} cy={2} rx={46} ry={6} fill="#000" opacity={0.12} />
                <path d="M-42 2 Q-34 -30 0 -34 Q34 -30 42 2Z" fill={LEAF_DARK} />
                <path d="M-30 -10 Q-16 -26 4 -26 Q22 -24 30 -8" stroke="#7CC46A" strokeWidth={6} fill="none" opacity={0.6} strokeLinecap="round" />
                {[[-28, -4, 20, LEAF], [-12, -20, 160, "#9ACD5A"], [10, -24, -30, LEAF], [28, -8, 40, "#E8B640"], [0, -8, 100, "#7CC46A"], [-20, -16, 70, "#E8B640"], [18, -16, -10, "#9ACD5A"], [-2, -30, 30, LEAF], [34, -2, 120, "#7CC46A"], [-36, -2, -40, "#9ACD5A"]].map(([x, y, a, c], i) => (
                  <g key={i} transform={`translate(${x} ${y}) rotate(${a})`}>
                    <LeafShape c={c as string} />
                  </g>
                ))}
              </g>
            </Tappable>
          </g>
          <g className="big-sneeze-gone-leaves">
            <FallenLeaves spots={[[230, 292, 20], [270, 280, 160], [212, 270, -30]]} />
          </g>
          <Broom x={192} y={292} />
          <Place x={232} y={290} s={0.44} flip tap={TAP_GUGU}>
            <Gugu face="joy" arm="broom" />
          </Place>
          <Place x={74} y={292} s={0.44} tap={TAP_GRAN}>
            <Grandma mood="joy" />
          </Place>
          <Heart x={74} y={180} s={0.9} delay={0.8} />
          <BeeFlight path="M100 110 C140 70 220 70 250 110 C220 140 140 140 100 110Z" dur={4.5} s={1} rest={[250, 110]} />
          <Air kind="day" seed={23} />
        </Scene>
      );
    // Everything was back in its place. Then… Gugu's nose began to wiggle again. Everybody held on tight!
    case 11:
      return (
        <Scene>
          <Land id={id} />
          <Tree x={312} y={234} s={0.74} nest />
          <Place x={86} y={292} s={0.5} tap={TAP_GUGU}>
            <Gugu face="ah" head="ah" />
          </Place>
          <Place x={186} y={294} s={0.38} tap={TAP_CUB}>
            <g className="big-sneeze-tremble">
              <Anbessa mood="worried" hold look={-3} />
            </g>
          </Place>
          <Place x={262} y={292} s={0.4} tap={TAP_GRAN}>
            <g className="big-sneeze-tremble" style={st({ "--delay": "-0.1s" })}>
              <Grandma mood="worried" hold />
            </g>
          </Place>
          <g transform="translate(348 266) scale(0.8)">
            <Tappable reaction="bounce" sound="baa">
              <Goat brace />
            </Tappable>
          </g>
          <BeeHover x={150} y={120} s={1.1} flip />
          <Air kind="day" seed={25} />
        </Scene>
      );
    // This time Gugu sneezed into his elbow. "…choo!" One tiny leaf wobbled. "Bless you!" Everyone laughed.
    case 12:
      return (
        <Scene>
          <Land id={id} sun={[338, 58]} />
          <Tree x={322} y={234} s={0.74} nest />
          <g transform="translate(222 120)">
            <g className="big-sneeze-flutterdown">
              <Tappable reaction="spin" sound="pop">
                <LeafShape c="#7CC46A" />
              </Tappable>
            </g>
          </g>
          <Place x={142} y={292} s={0.52} tap={TAP_GUGU}>
            <g className="big-sneeze-tiny">
              <Gugu face="choo" arm="elbow" />
            </g>
          </Place>
          <Blast x={120} y={226} delay={1.2} dir={-1} small />
          <Place x={232} y={294} s={0.38} tap={TAP_CUB}>
            <g className="big-sneeze-laugh">
              <Anbessa mood="joy" />
            </g>
          </Place>
          <Place x={58} y={292} s={0.4} tap={TAP_GRAN}>
            <g className="big-sneeze-laugh" style={st({ "--delay": "-0.3s" })}>
              <Grandma mood="joy" />
            </g>
          </Place>
          <Cheer spots={[[200, 150, 1.8], [100, 140, 2.1], [270, 160, 2.4], [160, 120, 2.7]]} />
          <BeeFlight path="M60 120 C100 70 180 80 200 120 C220 160 300 150 330 110 C350 70 260 60 200 90 C140 120 80 150 60 120Z" dur={6} s={1.1} rest={[200, 120]} happy />
          <Air kind="day" seed={27} />
        </Scene>
      );
    default:
      return null;
  }
}
