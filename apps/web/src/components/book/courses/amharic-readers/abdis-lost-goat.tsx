"use client";

import { useId, type ReactNode } from "react";

import { Acacia, Air, BeeHover, Moon, Place, Rock, Stars, vars } from "../../scenery";
import { Camel, TAP } from "./kit-cast";
import { Hearts, Sign, Sparkles } from "./kit-props";
import { OpenSky, Pop, SayBubble, Txt } from "./kit-read";

/*
  "Abdi and the Lost Goat": one living picture per page (12 pages), in three chapters. Each
  chapter opens with a ribbon banner (ምዕራፍ አንድ / ሁለት / ሦስት). Places: Ayan's family home on
  the dry plain near Jijiga (a domed aqal hut of woven mats, a cart, a water barrel), the sandy
  plain with termite hills and acacias, the dry riverbed with the thorn bush, and night. Nechu is
  a little white kid goat; her hoof prints dot the sand page by page.
  Keyframes: lali-* (globals.css), ar-* (./kit.css, ./kit-read.css) and art-* (./kit-tales.css).
*/

/** The chapter banner across the top. */
function Chapter({ n }: { n: string }) {
  return (
    <g transform="translate(200 32)">
      <Pop delay={0.3}>
        <path d="M-96 -16 H96 L84 0 L96 16 H-96 L-84 0Z" fill="#C2410C" />
        <Txt text={`ምዕራፍ ${n}`} x={0} y={7} size={18} fill="#FFFDF6" />
      </Pop>
    </g>
  );
}

/** Nechu, a little white kid goat, feet at (x, y). */
export function Nechu({ x, y, s = 1, flip = false, hop = false, bell = false }: { x: number; y: number; s?: number; flip?: boolean; hop?: boolean; bell?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <g className={hop ? "lali-hop" : undefined}>
        <ellipse cx={0} cy={1} rx={18} ry={3} fill="#000" opacity={0.12} />
        <path d="M-12 0 V-12 M-5 0 V-12 M7 0 V-12 M12 0 V-12" stroke="#D9D2C6" strokeWidth={3} strokeLinecap="round" />
        <ellipse cx={0} cy={-17} rx={17} ry={9} fill="#FFFFFF" stroke="#D9D2C6" strokeWidth={1.4} />
        <g transform="translate(16 -26)">
          <path d="M-1 -7 Q-4 -14 -9 -12 M2 -7 Q2 -14 -1 -16" stroke="#8A7A6A" strokeWidth={1.8} fill="none" strokeLinecap="round" />
          <ellipse cx={2} cy={0} rx={7} ry={6} fill="#FFFFFF" stroke="#D9D2C6" strokeWidth={1.4} />
          <ellipse cx={-4} cy={-3} rx={5} ry={2} fill="#F2E6D8" transform="rotate(-30 -4 -3)" />
          <circle cx={4} cy={-1} r={1.3} fill="#2A1A10" />
          {bell && (
            <g transform="translate(-2 9)">
              <path d="M-6 -4 Q0 0 6 -4" stroke="#E2463F" strokeWidth={1.6} fill="none" />
              <path d="M-3 -2 Q-3 -7 0 -7 Q3 -7 3 -2Z" fill="#E3A511" className="ar-read-shake" />
            </g>
          )}
        </g>
      </g>
    </g>
  );
}

/** Hoof prints in the sand, from (x0, y0) to (x1, y1). */
function Prints({ x0, y0, x1, y1, n = 6, delay = 0.6 }: { x0: number; y0: number; x1: number; y1: number; n?: number; delay?: number }) {
  return (
    <g fill="#8A6A44">
      {Array.from({ length: n }, (_, i) => {
        const t = i / (n - 1);
        const x = x0 + (x1 - x0) * t;
        const y = y0 + (y1 - y0) * t + (i % 2 ? 4 : -4);
        return (
          <g key={i} className="lali-fade-in" style={vars({ "--delay": `${delay + i * 0.25}s`, "--dur": "0.4s" })}>
            <ellipse cx={x - 3} cy={y} rx={2.6} ry={4.2} />
            <ellipse cx={x + 3} cy={y} rx={2.6} ry={4.2} />
          </g>
        );
      })}
    </g>
  );
}

/** The dry plain near Jijiga: pale sky, red-brown sand, acacias and termite hills. */
function Plain({ id, night = false, children }: { id: string; night?: boolean; children?: ReactNode }) {
  return (
    <g>
      {night ? <rect width={400} height={300} fill="#141B45" /> : <OpenSky id={id} sun={[340, 46]} />}
      {night && <Stars seed={9} n={30} bottom={170} />}
      {night && <Moon x={330} y={56} r={14} />}
      <path d="M-10 180 Q200 166 410 182 V310 H-10Z" fill={night ? "#3A3048" : "#E2B07A"} />
      <path d="M-10 220 Q200 204 410 222 V310 H-10Z" fill={night ? "#4A3A50" : "#EAC08A"} />
      <Acacia x={50} y={200} s={0.6} leaf={night ? "#245A48" : "#5E8E3A"} leafDark={night ? "#1C4A3C" : "#4A7A2E"} />
      <Acacia x={360} y={196} s={0.45} leaf={night ? "#245A48" : "#5E8E3A"} leafDark={night ? "#1C4A3C" : "#4A7A2E"} />
      <path d="M260 190 Q266 150 272 190Z M290 192 Q294 166 298 192Z" fill={night ? "#5A4048" : "#B8703A"} />
      {children}
    </g>
  );
}

/** The family's home: a domed aqal hut of woven mats, a cart and a water barrel. */
export function Aqal({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-70 0 Q-70 -90 0 -92 Q70 -90 70 0Z" fill="#C9A06A" stroke="#8A6A44" strokeWidth={2} />
      <path d="M-60 -30 Q0 -44 60 -30 M-48 -60 Q0 -74 48 -60" stroke="#E3C08A" strokeWidth={4} fill="none" />
      <path d="M-30 -84 Q-20 -40 -30 0 M30 -84 Q20 -40 30 0" stroke="#A8804A" strokeWidth={2} fill="none" />
      <path d="M-14 0 Q-14 -34 0 -36 Q14 -34 14 0Z" fill="#5A3A26" />
    </g>
  );
}

const AYAN = (mood: "happy" | "joy" | "wow" | "worried" = "happy") => <Camel who="ayan" mood={mood} />;
const ABDI = (mood: "happy" | "joy" | "wow" | "worried" | "sad" = "happy") => <Camel who="abdi" mood={mood} />;

export default function AbdisLostGoat({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Chapter 1: Where is Nechu? Every morning Nechu skips to Abdi. But this morning her pen is empty.
    case 0:
      return (
        <Plain id={id}>
          <Chapter n="አንድ" />
          <Aqal x={290} y={240} />
          <g transform="translate(150 258)">
            <path d="M-36 0 V-30 M-18 0 V-30 M0 0 V-30 M18 0 V-30 M36 0 V-30 M-40 -22 H40 M-40 -8 H40" stroke="#8A6A44" strokeWidth={3} />
          </g>
          <Place x={80} y={292} s={0.36} tap={TAP.ayan}>
            {ABDI("worried")}
          </Place>
          <Sign x={150} y={200} kind="?" delay={1} />
          <Air kind="day" seed={3} />
        </Plain>
      );
    // "Nechu!" He looks behind the house, under the cart, in the water barrel. Nechu, where are you? Baa, baa!
    case 1:
      return (
        <Plain id={id}>
          <Aqal x={300} y={240} />
          <g transform="translate(150 250)">
            <rect x={-36} y={-26} width={72} height={18} fill="#9A6236" />
            <circle cx={-24} cy={-4} r={11} fill="#5A3A26" />
            <circle cx={24} cy={-4} r={11} fill="#5A3A26" />
          </g>
          <g transform="translate(220 262)">
            <rect x={-14} y={-34} width={28} height={34} rx={4} fill="#2F7FB8" />
            <path d="M-14 -22 H14 M-14 -10 H14" stroke="#1E5A8A" strokeWidth={2} />
          </g>
          <Place x={70} y={294} s={0.38} className="lali-hop" tap={TAP.ayan}>
            {ABDI("wow")}
          </Place>
          <SayBubble x={110} y={170} text="ነጩ፣ የት ነሽ?" size={16} delay={0.8} />
          <Air kind="day" seed={5} />
        </Plain>
      );
    // Ayan kneels by the gate: "Look, Abdi! Tiny hoof prints in the dust. Nechu went this way."
    case 2:
      return (
        <Plain id={id}>
          <Aqal x={330} y={240} />
          <Prints x0={180} y0={270} x1={40} y1={236} n={7} />
          <Place x={230} y={294} s={0.44} tap={TAP.ayan}>
            {AYAN("wow")}
          </Place>
          <Place x={290} y={294} s={0.34} tap={TAP.ayan}>
            {ABDI("sad")}
          </Place>
          <Air kind="day" seed={7} />
        </Plain>
      );
    // Hooyo gives them a water bottle and bread: "Stay together, and be home before the sun is high." End of chapter one.
    case 3:
      return (
        <Plain id={id}>
          <Aqal x={300} y={240} />
          <Place x={220} y={294} s={0.52} flip tap={TAP.ayan}>
            <Camel who="hooyo" mood="happy" />
          </Place>
          <Place x={120} y={294} s={0.42} tap={TAP.ayan}>
            {AYAN("happy")}
          </Place>
          <Place x={60} y={294} s={0.32} tap={TAP.ayan}>
            {ABDI("happy")}
          </Place>
          <g transform="translate(200 64)">
            <Pop delay={1.2}>
              <rect x={-80} y={-14} width={160} height={28} rx={8} fill="#FFFDF6" stroke="#C2410C" strokeWidth={2} />
              <Txt text="የምዕራፍ አንድ መጨረሻ" x={0} y={6} size={14} fill="#C2410C" />
            </Pop>
          </g>
          <Air kind="day" seed={9} />
        </Plain>
      );
    // Chapter 2: Hoof prints, across the sandy plain, past termite hills and thorny acacias.
    case 4:
      return (
        <Plain id={id}>
          <Chapter n="ሁለት" />
          <Prints x0={380} y0={250} x1={160} y1={270} n={8} />
          <Place x={140} y={292} s={0.4} from={[60, 292]} dur={2.4} tap={TAP.ayan}>
            {AYAN("happy")}
          </Place>
          <Place x={90} y={294} s={0.3} from={[10, 294]} dur={2.4} tap={TAP.ayan}>
            {ABDI("happy")}
          </Place>
          <BeeHover x={300} y={150} s={0.7} flip />
          <Air kind="day" seed={11} />
        </Plain>
      );
    // The prints lead into a dry riverbed: stones and sand. Then, very faintly: "Meh… meh…"
    case 5:
      return (
        <Plain id={id}>
          <path d="M-10 236 Q200 210 410 240 L410 286 Q200 256 -10 284Z" fill="#C9A87A" />
          {[60, 130, 210, 290, 350].map((x, i) => (
            <Rock key={x} x={x} y={258 - (i % 2) * 8} s={0.4} color="#B0A8A0" />
          ))}
          <Prints x0={60} y0={262} x1={250} y1={250} n={7} />
          <SayBubble x={320} y={150} text="ሜእ… ሜእ…" size={16} tail="down" delay={1.6} />
          <Place x={110} y={292} s={0.4} tap={TAP.ayan}>
            {AYAN("wow")}
          </Place>
          <Place x={170} y={294} s={0.3} tap={TAP.ayan}>
            {ABDI("wow")}
          </Place>
        </Plain>
      );
    // Nechu is caught in a thorny acacia bush! She is not hurt, but she cannot get out.
    case 6:
      return (
        <Plain id={id}>
          <g transform="translate(260 262)">
            <ellipse cx={0} cy={-26} rx={60} ry={34} fill="#6E8A3A" />
            <Nechu x={0} y={0} s={1.3} />
            <g stroke="#F4EEDC" strokeWidth={2} strokeLinecap="round">
              {[[-40, -40], [-20, -56], [10, -50], [34, -30], [-30, -10], [40, -6], [0, -30]].map(([dx, dy], i) => (
                <path key={i} d={`M${dx} ${dy} l8 -6 M${dx} ${dy} l-8 -4`} />
              ))}
            </g>
          </g>
          <Place x={100} y={292} s={0.4} tap={TAP.ayan}>
            {AYAN("worried")}
          </Place>
          <Place x={160} y={294} s={0.3} tap={TAP.ayan}>
            {ABDI("worried")}
          </Place>
        </Plain>
      );
    // A thorn pricks Abdi: "Ow!" "Slowly. One branch at a time." Gently, gently… Nechu is free! End of chapter two.
    case 7:
      return (
        <Plain id={id}>
          <g transform="translate(280 262)">
            <ellipse cx={0} cy={-26} rx={50} ry={28} fill="#6E8A3A" opacity={0.7} />
          </g>
          <Nechu x={210} y={280} s={1.3} hop />
          <Place x={120} y={292} s={0.42} tap={TAP.ayan}>
            {AYAN("joy")}
          </Place>
          <Place x={170} y={294} s={0.32} tap={TAP.ayan}>
            {ABDI("joy")}
          </Place>
          <SayBubble x={170} y={196} text="አይ!" size={14} delay={0.4} />
          <Sparkles x={210} y={240} r={30} delay={1.6} />
          <g transform="translate(200 60)">
            <Pop delay={2}>
              <rect x={-84} y={-14} width={168} height={28} rx={8} fill="#FFFDF6" stroke="#C2410C" strokeWidth={2} />
              <Txt text="የምዕራፍ ሁለት መጨረሻ" x={0} y={6} size={14} fill="#C2410C" />
            </Pop>
          </g>
        </Plain>
      );
    // Chapter 3: A bell for Nechu. Abdi carries her home. Hooyo hugs them: "What brave, patient children."
    case 8:
      return (
        <Plain id={id}>
          <Chapter n="ሦስት" />
          <Aqal x={320} y={240} />
          <Place x={240} y={294} s={0.52} flip tap={TAP.ayan}>
            <Camel who="hooyo" mood="joy" />
          </Place>
          <Place x={150} y={294} s={0.42} tap={TAP.ayan}>
            {AYAN("joy")}
          </Place>
          <Place x={90} y={294} s={0.34} tap={TAP.ayan}>
            {ABDI("joy")}
          </Place>
          <Nechu x={90} y={232} s={0.8} />
          <Hearts spots={[[180, 170, 1], [200, 156, 1.4]]} />
        </Plain>
      );
    // Hooyo ties a little brass bell round Nechu's neck. Ding, ding! Nechu skips about.
    case 9:
      return (
        <Plain id={id}>
          <Aqal x={320} y={240} />
          <Nechu x={190} y={276} s={1.8} bell hop />
          <SayBubble x={250} y={160} text="ቅጭል፣ ቅጭል!" size={16} tail="left" delay={0.8} />
          <Place x={90} y={294} s={0.36} className="lali-hop" tap={TAP.ayan}>
            {ABDI("joy")}
          </Place>
        </Plain>
      );
    // "Why does our story have three parts?" "Those are chapters. Like a house has rooms."
    case 10:
      return (
        <Plain id={id} night>
          <g transform="translate(200 150)">
            <Pop delay={0.4}>
              <path d="M-120 -30 L0 -90 L120 -30Z" fill="#9A6236" />
              <rect x={-110} y={-30} width={220} height={90} fill="#F0D7A8" stroke="#8A6A44" strokeWidth={2} />
              <path d="M-37 -30 V60 M37 -30 V60" stroke="#8A6A44" strokeWidth={3} />
            </Pop>
            {["፩", "፪", "፫"].map((g, i) => (
              <g key={g} className="lali-pop-in" style={vars({ "--delay": `${1 + i * 0.5}s` })}>
                <Txt text={`ምዕራፍ ${g}`} x={-74 + i * 74} y={20} size={14} fill="#C2410C" />
              </g>
            ))}
          </g>
          <Place x={80} y={296} s={0.4} tap={TAP.ayan}>
            {AYAN("happy")}
          </Place>
          <Place x={320} y={296} s={0.32} tap={TAP.ayan}>
            {ABDI("wow")}
          </Place>
        </Plain>
      );
    // "Chapter one, Nechu was lost. Chapter two, we found her. Chapter three…" "…a bell." Ding, ding. The end.
    default:
      return (
        <Plain id={id} night>
          <Aqal x={160} y={240} />
          <Nechu x={290} y={268} s={1.2} bell />
          <SayBubble x={300} y={200} text="ቅጭል…" size={14} tail="down" delay={1} />
          <g transform="translate(200 60)">
            <Pop delay={1.8}>
              <Txt text="ተፈጸመ" x={0} y={0} size={26} fill="#FFE27A" />
            </Pop>
          </g>
          <Air kind="night" seed={13} />
        </Plain>
      );
  }
}
