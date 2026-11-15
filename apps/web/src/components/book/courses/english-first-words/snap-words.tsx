"use client";

import "./snap-words.css";

import { useId } from "react";

import { Air, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { FONT, Gugu, Ibex, TAP, Teacher } from "./cast";
import { Club, Yard } from "./places";
import { BlendCard, Hearts, SayBubble, Sign, Sparkles, Tick } from "./props";
import { Thing } from "./things";

/*
  "Snap Words": one living picture per page (12 pages). Haben's little blue book opens to show its
  words; the eight snap-word cards (I, a, the, is, my, see, go, like) fan out, flip face down for
  the game of Snap, and turn over in pairs. On the last pages the book's sentences light up word
  by word as Haben reads them.
  Keyframes: ./kit.css (efw-*) and ./snap-words.css (snw-*).
*/

const PINK = "#D63B72";
const SNAP = ["I", "a", "the", "is", "my", "see", "go", "like"];
const ANDIKA = "var(--font-andika), sans-serif";

/** A snap-word card: face up (the word) or face down (a pink back). */
function Card({ x, y, word, down = false, flip = false, s = 1, delay = 0, glow = false }: { x: number; y: number; word: string; down?: boolean; flip?: boolean; s?: number; delay?: number; glow?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className={flip ? "snw-flip" : "lali-pop-in"} style={vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="wiggle" sound="chime">
          <rect x={-26} y={-18} width={52} height={38} rx={7} fill="#000" opacity={0.12} />
          {down ? (
            <g>
              <rect x={-26} y={-20} width={52} height={38} rx={7} fill={PINK} />
              <path d="M-18 -12 L18 10 M18 -12 L-18 10" stroke="#F7A8C8" strokeWidth={2} />
            </g>
          ) : (
            <g>
              <rect x={-26} y={-20} width={52} height={38} rx={7} fill="#FFFDF6" stroke={glow ? "#F5B21E" : PINK} strokeWidth={glow ? 3.4 : 2.4} />
              <text y={7} fontSize={20} fontFamily={ANDIKA} fontWeight={700} fill="#2A1A10" textAnchor="middle">
                {word}
              </text>
            </g>
          )}
        </Tappable>
      </g>
    </g>
  );
}

/** Haben's little blue book: closed (cover), or open with lines of words. */
function Book({ x, y, s = 1, lines, lit = false }: { x: number; y: number; s?: number; lines?: string[]; lit?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        {lines ? (
          <g>
            <path d="M0 -50 Q-60 -60 -120 -50 V50 Q-60 40 0 50 Q60 40 120 50 V-50 Q60 -60 0 -50Z" fill="#FFFDF6" stroke="#2F6FD0" strokeWidth={3} />
            <path d="M0 -50 V50" stroke="#D3E4F4" strokeWidth={2} />
            <g transform="translate(-60 0) scale(0.6)">
              <Thing id="sun" />
            </g>
            {lines.map((l, i) => (
              <g key={l} transform={`translate(60 ${-22 + i * 26})`}>
                <text y={6} fontSize={14} fontFamily={ANDIKA} fontWeight={700} fill="#2A1A10" textAnchor="middle" className={lit ? "snw-read" : undefined} style={vars({ "--delay": `${0.6 + i * 1.2}s` })}>
                  {l}
                </text>
              </g>
            ))}
          </g>
        ) : (
          <g>
            <rect x={-46} y={-56} width={92} height={112} rx={8} fill="#2F6FD0" />
            <rect x={-40} y={-50} width={80} height={100} rx={6} fill="#5B8FE0" />
            <g transform="translate(-14 10) scale(0.36)">
              <Thing id="cat" />
            </g>
            <g transform="translate(18 -24) scale(0.3)">
              <Thing id="sun" />
            </g>
          </g>
        )}
      </Tappable>
    </g>
  );
}

const Haben = ({ x, y = 294, s = 0.46, mood = "happy" as "happy" | "joy" | "wow" | "worried", pose = "sit" as "sit" | "wave" | "point", flip = false, className }: { x: number; y?: number; s?: number; mood?: "happy" | "joy" | "wow" | "worried"; pose?: "sit" | "wave" | "point"; flip?: boolean; className?: string }) => (
  <Place x={x} y={y} s={s} flip={flip} className={className} tap={TAP.haben}>
    <Ibex mood={mood} pose={pose} />
  </Place>
);

export default function SnapWords({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Haben's very first English book.
    case 0:
      return (
        <g>
          <Club id={id} time="day">
            <Place x={330} y={292} s={0.46} flip tap={TAP.mama}>
              <Teacher mood="joy" pose="point" />
            </Place>
            <Book x={220} y={150} s={0.9} />
            <Haben x={130} mood="wow" />
            <Sparkles x={220} y={150} r={60} delay={1} n={6} />
          </Club>
          <Air kind="day" seed={2} />
        </g>
      );
    // c-a-t, s-u-n, b-i-g: it's working!
    case 1:
      return (
        <g>
          <Club id={id} time="day">
            <BlendCard x={110} y={64} word="cat" pic="cat" color={PINK} delay={0.3} s={0.8} />
            <BlendCard x={290} y={64} word="sun" pic="sun" color={PINK} delay={1.6} s={0.8} />
            <BlendCard x={200} y={150} word="big" color={PINK} delay={2.9} s={0.8} />
            <Haben x={200} y={298} s={0.46} mood="joy" />
          </Club>
          <Air kind="day" seed={3} />
        </g>
      );
    // "the": t… h… e… "Tuh-huh-eh?"
    case 2:
      return (
        <g>
          <Club id={id} time="day">
            {["t", "h", "e"].map((l, i) => (
              <g key={l} transform={`translate(${150 + i * 50} 90)`}>
                <g className="snw-wobble" style={vars({ "--delay": `${-i * 0.3}s` })}>
                  <rect x={-18} y={-22} width={36} height={42} rx={8} fill="#FFFDF6" stroke={PINK} strokeWidth={2.4} />
                  <text y={10} fontSize={28} fontFamily={ANDIKA} fontWeight={700} fill={PINK} textAnchor="middle">
                    {l}
                  </text>
                </g>
              </g>
            ))}
            <SayBubble x={290} y={170} lines={["Tuh-huh-eh?"]} size={15} tail="left" delay={1} />
            <Haben x={200} y={296} s={0.5} mood="worried" />
            <Sign x={150} y={170} kind="?" delay={1.8} />
          </Club>
          <Air kind="day" seed={4} />
        </g>
      );
    // Some words we just know, in a snap, like a friend's face.
    case 3:
      return (
        <g>
          <Club id={id} time="day">
            <Place x={330} y={292} s={0.46} flip tap={TAP.mama}>
              <Teacher mood="joy" pose="wave" />
            </Place>
            <g transform="translate(150 110)">
              <g className="lali-pop-in" style={vars({ "--delay": "0.6s" })}>
                <circle r={36} fill="#FFFDF6" stroke={PINK} strokeWidth={3} />
                <g transform="translate(0 4) scale(0.32) translate(-100 -100)">
                  <Gugu mood="joy" />
                </g>
              </g>
            </g>
            <Card x={250} y={110} word="the" s={1.3} delay={1.4} glow />
            <Haben x={150} s={0.44} mood="wow" />
            <Hearts spots={[[200, 120, 2], [214, 106, 2.6]]} />
          </Club>
          <Air kind="day" seed={5} />
        </g>
      );
    // Eight snap words: Look, snap, I know it!
    case 4:
      return (
        <g>
          <Club id={id} time="day">
            {SNAP.map((w, i) => (
              <Card key={w} x={70 + (i % 4) * 86} y={60 + Math.floor(i / 4) * 54} word={w} delay={0.3 + i * 0.25} />
            ))}
            <Haben x={160} s={0.44} mood="joy" pose="wave" />
            <Place x={290} y={292} s={0.44} flip tap={TAP.mama}>
              <Teacher mood="joy" />
            </Place>
          </Club>
          <Air kind="day" seed={6} />
        </g>
      );
    // "The!" "Is!" …but "like" and "see" get mixed up.
    case 5:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Card x={80} y={80} word="the" />
            <Tick x={104} y={60} delay={0.8} />
            <Card x={160} y={80} word="is" />
            <Tick x={184} y={60} delay={1.4} />
            <g className="snw-swap">
              <Card x={240} y={80} word="like" />
              <Card x={320} y={80} word="see" />
            </g>
            <Sign x={280} y={140} kind="?" delay={2} />
            <Haben x={200} y={296} s={0.5} mood="worried" />
          </Yard>
          <Air kind="day" seed={7} />
        </g>
      );
    // Gugu matching leaves under the fig tree. An idea: TWO of each, and play SNAP!
    case 6:
      return (
        <g>
          <Yard id={id} time="day" tree fig={300}>
            {[0, 1, 2, 3].map((k) => (
              <g key={k} transform={`translate(${150 + k * 28} 274) rotate(${k * 30})`}>
                <Thing id="leaf" s={0.3} />
              </g>
            ))}
            <Place x={290} y={294} s={0.44} flip tap={TAP.gugu}>
              <Gugu mood="joy" pose="point" />
            </Place>
            <Haben x={100} s={0.46} mood="wow" />
            <Sign x={130} y={170} kind="!" delay={1} color="#F5B21E" />
            <SayBubble x={160} y={90} lines={["Let's play SNAP!"]} size={15} tail="down" delay={1.6} color={PINK} />
          </Yard>
          <Air kind="day" seed={8} />
        </g>
      );
    // "my"… "my"! SNAP!
    case 7:
      return (
        <g>
          <Yard id={id} time="day" tree fig={340}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => {
              const up = k === 1 || k === 6;
              return <Card key={k} x={80 + (k % 4) * 64} y={190 + Math.floor(k / 4) * 46} word="my" down={!up} flip={up} delay={up ? 0.6 + (k === 6 ? 0.8 : 0) : 0} />;
            })}
            <SayBubble x={160} y={100} lines={["SNAP!"]} size={22} tail="down" delay={2} color={PINK} />
            <Place x={330} y={296} s={0.36} flip tap={TAP.gugu}>
              <Gugu mood="joy" pose="wave" />
            </Place>
            <Sparkles x={160} y={210} r={80} delay={2.2} n={8} />
          </Yard>
          <Air kind="day" seed={9} />
        </g>
      );
    // Again and again… Gugu snaps so hard he falls over.
    case 8:
      return (
        <g>
          <Yard id={id} time="day" tree fig={340}>
            {SNAP.map((w, i) => (
              <Card key={w} x={70 + (i % 4) * 70} y={70 + Math.floor(i / 4) * 50} word={w} delay={0.2 + i * 0.2} s={0.9} />
            ))}
            <Place x={260} y={294} s={0.44} className="snw-fall" tap={TAP.gugu}>
              <Gugu mood="joy" pose="wave" />
            </Place>
            <Haben x={130} s={0.44} mood="joy" />
          </Yard>
          <Air kind="day" seed={10} />
        </g>
      );
    // "I see the sun. My cat is big. I like my book."
    case 9:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Book x={200} y={110} s={1.12} lines={["I see the sun.", "My cat is big.", "I like my book."]} lit />
            <Haben x={200} y={298} s={0.48} mood="joy" />
          </Yard>
          <Air kind="day" seed={11} />
        </g>
      );
    // She reads it ALL by herself!
    case 10:
      return (
        <g>
          <Club id={id} time="day">
            <Place x={320} y={292} s={0.48} flip tap={TAP.mama}>
              <Teacher mood="joy" pose="wave" />
            </Place>
            <Book x={170} y={176} s={0.6} lines={["I see the sun.", "My cat is big.", "I like my book."]} />
            <Haben x={170} y={300} s={0.4} mood="joy" pose="wave" />
            <SayBubble x={290} y={110} lines={["You read it ALL", "by yourself!"]} size={13} tail="down" delay={0.8} />
            <Hearts spots={[[230, 200, 1.4], [246, 186, 2]]} />
          </Club>
          <Air kind="day" seed={12} />
        </g>
      );
    // Look, snap, I know it!
    default:
      return (
        <g>
          <Yard id={id} time="evening">
            {SNAP.map((w, i) => {
              const a = (i / SNAP.length) * Math.PI * 2 - Math.PI / 2;
              return <Card key={w} x={Math.round(200 + Math.cos(a) * 130)} y={Math.round(120 + Math.sin(a) * 72)} word={w} delay={0.3 + i * 0.2} s={0.9} />;
            })}
            <Haben x={200} y={298} s={0.36} mood="joy" pose="wave" />
            <g transform="translate(200 124)">
              <text fontSize={15} fontFamily={FONT} fontWeight={900} fill="#FFFDF6" textAnchor="middle" className="lali-pop-in" style={vars({ "--delay": "2.2s" })}>
                Look, snap, I know it!
              </text>
            </g>
          </Yard>
          <Air kind="dusk" seed={13} />
        </g>
      );
  }
}
