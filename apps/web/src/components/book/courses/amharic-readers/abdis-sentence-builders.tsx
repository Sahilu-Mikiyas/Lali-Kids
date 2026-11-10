"use client";

import { useId, type ReactNode } from "react";

import { Moon, Place, vars } from "../../scenery";
import { Camel, TAP } from "./kit-cast";
import { Home } from "./kit-places";
import { Sign, Sparkles } from "./kit-props";
import { Pop, Strip, Txt, WordCard, r1 } from "./kit-read";
import { Nechu } from "./abdis-lost-goat";

/*
  "The Sentence Builders": one living picture per page (12 pages), inside Ayan's family home
  (walls hung with woven mats) and, at the end, its wall with Abdi's sentence on it. Sentences are
  built from word cards in a strip; the doing-word at the end is underlined, and the mark at the
  end glows. Abdi's own sentence is written in pencil on paper, and the four dots arrive last.
  Keyframes: lali-* (globals.css), ar-* (./kit.css, ./kit-read.css) and art-* (./kit-tales.css).
*/

const AYAN = (mood: "happy" | "joy" | "wow" | "worried" = "happy") => <Camel who="ayan" mood={mood} />;
const ABDI = (mood: "happy" | "joy" | "wow" | "worried" | "sad" = "happy") => <Camel who="abdi" mood={mood} />;

/** Inside the family home, with Ayan and Abdi on the floor. */
function Inside({ id, ayan = "happy", abdi = "happy", abdiHop = false, children }: { id: string; ayan?: "happy" | "joy" | "wow" | "worried"; abdi?: "happy" | "joy" | "wow" | "worried" | "sad"; abdiHop?: boolean; children?: ReactNode }) {
  return (
    <g>
      <Home id={id} time="day" shelf={false} wall={["#F0D2A0", "#E0B47E"]} />
      <g opacity={0.5}>
        <path d="M120 40 H280 V120 H120Z" fill="#C9502E" />
        <path d="M120 60 H280 M120 80 H280 M120 100 H280" stroke="#F5B21E" strokeWidth={4} />
      </g>
      <Place x={70} y={294} s={0.44} tap={TAP.ayan}>
        {AYAN(ayan)}
      </Place>
      <Place x={340} y={294} s={0.34} flip className={abdiHop ? "lali-hop" : undefined} tap={TAP.ayan}>
        {ABDI(abdi)}
      </Place>
      {children}
    </g>
  );
}

/** Abdi's sheet of paper with his pencilled sentence; `dots` adds the ። at the end. */
function Paper({ dots = false, glow = false }: { dots?: boolean; glow?: boolean }) {
  return (
    <g transform="translate(200 150)">
      <Pop delay={0.3}>
        {glow && <rect x={-116} y={-46} width={232} height={92} rx={8} fill="#FFE27A" className="ar-read-glow" />}
        <rect x={-110} y={-40} width={220} height={80} rx={4} fill="#FFFDF6" stroke="#B9A47A" strokeWidth={2} />
        <path d="M-100 10 H100" stroke="#DCE8FB" strokeWidth={1.4} />
        <Txt text="ነጩ ቃጭል አላት" x={-6} y={4} size={22} fill="#4A4A5A" weight={600} />
        {dots && (
          <g transform="translate(86 -2)">
            <g className="lali-pop-in" style={vars({ "--delay": "1s" })}>
              <Txt text="።" x={0} y={6} size={26} fill="#C2410C" />
            </g>
          </g>
        )}
      </Pop>
    </g>
  );
}

export default function AbdisSentenceBuilders({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Crash! Abdi tips over the word cards: ፍየሏ, ሣር, በላች, አብዲ, ሮጠ, ኳስ, ጨረቃ, ወጣች, and ። ? !
    case 0:
      return (
        <Inside id={id} ayan="wow" abdi="worried">
          {["ፍየሏ", "ሣር", "በላች", "አብዲ", "ሮጠ", "ኳስ", "ጨረቃ", "ወጣች", "።", "?", "!"].map((w, i) => (
            <WordCard key={w} text={w} x={110 + (i % 4) * 58 + (i > 7 ? 30 : 0)} y={150 + Math.floor(i / 4) * 40} size={15} tilt={((i * 37) % 30) - 15} delay={r1(0.2 + i * 0.08)} />
          ))}
        </Inside>
      );
    // "Let's build sentences. A sentence is a little story in one line." Who? Did what? And a mark at the end!
    case 1:
      return (
        <Inside id={id} ayan="joy" abdi="happy">
          <g transform="translate(200 150)">
            <Pop delay={0.4}>
              <rect x={-120} y={-30} width={240} height={60} rx={12} fill="#FFFDF6" stroke="#B9A47A" strokeWidth={2} />
              <Txt text="ማን?" x={-80} y={7} size={18} fill="#8A4FB0" />
              <Txt text="ምን አደረገ?" x={6} y={7} size={18} fill="#2E9A5B" />
              <Txt text="።?!" x={88} y={7} size={20} fill="#C2410C" />
            </Pop>
          </g>
        </Inside>
      );
    // "Who? The goat. What did she do?" ፍየሏ ሣር በላች። "The goat ate grass."
    case 2:
      return (
        <Inside id={id} ayan="joy" abdi="joy">
          <Strip words={["ፍየሏ", "ሣር", "በላች።"]} x={200} y={150} size={28} delay={0.4} step={0.6} />
          <g transform="translate(200 220)">
            <Pop delay={2.4}>
              <Nechu x={0} y={10} s={1.1} />
            </Pop>
          </g>
        </Inside>
      );
    // "In Amharic the doing-word comes at the end. Then ። says the sentence is finished."
    case 3:
      return (
        <Inside id={id} ayan="happy" abdi="wow">
          <Strip words={["ፍየሏ", "ሣር", "በላች", "።"]} x={200} y={150} size={28} delay={0} step={0} lit={3} read={false} />
          <g className="lali-fade-in" style={vars({ "--delay": "0.8s" })}>
            <rect x={210} y={160} width={66} height={5} rx={2} fill="#2E9A5B" />
            <path d="M244 200 V172 M236 180 L244 170 L252 180" stroke="#2E9A5B" strokeWidth={3} fill="none" strokeLinecap="round" />
          </g>
        </Inside>
      );
    // Abdi mixes them up on purpose: በላች ሣር ፍየሏ። "Ate grass the goat!" It sounds upside down!
    case 4:
      return (
        <Inside id={id} ayan="joy" abdi="joy" abdiHop>
          <g className="ar-read-shake">
            <Strip words={["በላች", "ሣር", "ፍየሏ።"]} x={200} y={150} size={28} delay={0.3} step={0.3} />
          </g>
          <g transform="translate(200 200)">
            <g className="lali-pop-in" style={vars({ "--delay": "1.6s" })}>
              <g transform="rotate(180)">
                <Nechu x={0} y={0} s={0.9} />
              </g>
            </g>
          </g>
        </Inside>
      );
    // Just ጨረቃ… "The moon… what? It's not finished!" Then ወጣች: ጨረቃ ወጣች።
    case 5:
      return (
        <Inside id={id} ayan="happy" abdi="happy">
          <Strip words={["ጨረቃ", "…"]} x={200} y={120} size={26} delay={0.3} step={0.4} />
          <Strip words={["ጨረቃ", "ወጣች።"]} x={200} y={180} size={26} delay={1.8} step={0.4} />
          <Moon x={320} y={70} r={18} />
        </Inside>
      );
    // Swap the marks: ፍየሏ ሣር በላች? ፍየሏ ሣር በላች! "Same words, different voice!"
    case 6:
      return (
        <Inside id={id} ayan="joy" abdi="wow">
          {["።", "?", "!"].map((m, i) => (
            <g key={m}>
              <Strip words={["ፍየሏ", "ሣር", "በላች" + m]} x={200} y={110 + i * 46} size={22} delay={0.4 + i * 0.8} step={0.1} lit={2} read={false} />
            </g>
          ))}
        </Inside>
      );
    // አብዲ ሮጠ። Abdi runs round the room. Then a longer one: አብዲ ኳስ ይዞ ሮጠ። Sentences can grow!
    case 7:
      return (
        <Inside id={id} ayan="joy" abdi="joy" abdiHop>
          <Strip words={["አብዲ", "ሮጠ።"]} x={200} y={110} size={24} delay={0.4} step={0.4} />
          <Strip words={["አብዲ", "ኳስ", "ይዞ", "ሮጠ።"]} x={200} y={164} size={24} delay={1.6} step={0.4} />
          <Sparkles x={200} y={164} r={90} delay={3.4} />
        </Inside>
      );
    // "Now write one yourself, without the cards." He holds his pencil tight; his tongue pokes out.
    case 8:
      return (
        <Inside id={id} ayan="happy" abdi="happy">
          <g transform="translate(200 150)">
            <rect x={-110} y={-40} width={220} height={80} rx={4} fill="#FFFDF6" stroke="#B9A47A" strokeWidth={2} />
            <path d="M-100 10 H100" stroke="#DCE8FB" strokeWidth={1.4} />
            <g className="art-creep">
              <path d="M-60 6 L-20 -30" stroke="#F5B21E" strokeWidth={7} strokeLinecap="round" />
              <path d="M-60 6 L-64 10" stroke="#2A1A10" strokeWidth={3} />
            </g>
          </g>
          <Sign x={200} y={70} kind="?" delay={1} />
        </Inside>
      );
    // Letter by letter: ነጩ ቃጭል አላት. "Something's missing…"
    case 9:
      return (
        <Inside id={id} ayan="happy" abdi="wow">
          <Paper />
          <Sign x={300} y={110} kind="?" delay={1.4} color="#C2410C" />
        </Inside>
      );
    // "The four dots!" ነጩ ቃጭል አላት። His very first sentence, all on his own! Ding, ding.
    case 10:
      return (
        <Inside id={id} ayan="joy" abdi="joy" abdiHop>
          <Paper dots glow />
          <Sparkles x={200} y={150} r={100} delay={1.4} n={7} />
        </Inside>
      );
    // Hooyo sticks it on the wall: "My son, the writer." "Tomorrow I'll write two!"
    default:
      return (
        <g>
          <Home id={id} time="evening" shelf={false} wall={["#F0D2A0", "#E0B47E"]} />
          <g transform="translate(160 -40) scale(0.7)">
            <Paper dots />
          </g>
          <g transform="translate(280 70)">
            <rect x={-30} y={-24} width={60} height={48} fill="#FFFDF6" stroke="#B9A47A" />
            <circle cx={-6} cy={-2} r={10} fill="#3E9B5A" />
            <circle cx={10} cy={6} r={6} fill="#FFD233" />
          </g>
          <Place x={240} y={294} s={0.52} flip tap={TAP.ayan}>
            <Camel who="hooyo" mood="joy" />
          </Place>
          <Place x={150} y={294} s={0.36} className="lali-hop" tap={TAP.ayan}>
            {ABDI("joy")}
          </Place>
          <Place x={70} y={294} s={0.42} tap={TAP.ayan}>
            {AYAN("joy")}
          </Place>
        </g>
      );
  }
}
