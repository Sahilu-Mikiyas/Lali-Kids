"use client";

import "./my-little-book.css";

import { useId } from "react";

import { Glow } from "../../glow";
import { BeeHover, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Cub, FONT, Grandma, TAP } from "./cast";
import { Home } from "./places";
import { Hearts, SayBubble, Sign, Sparkles, Stool } from "./props";
import { Thing } from "./things";

/*
  "Anbessa Reads Alone": one living picture per page (12 pages), in Grandma's round house on her
  birthday. Anbessa's little book is drawn big by <LittleBook>: a crayon picture on the left and
  the page's sentence on the right; a pointing paw moves under the words as he reads them, and
  each word lights up in turn. Grandma listens on her stool.
  Keyframes: ./kit.css (efw-*) and ./my-little-book.css (mlb-*).
*/

const BLUE = "#2F6FD0";
const ANDIKA = "var(--font-andika), sans-serif";

/** A drawing in Anbessa's book (by id), crayon-style in a frame. */
function Drawing({ kind }: { kind: "home" | "cat" | "sun" | "grandma" | "cake" | "me" | "cover" }) {
  switch (kind) {
    case "home":
      return <Thing id="house" s={0.6} />;
    case "cat":
      return <Thing id="cat" s={0.6} />;
    case "sun":
      return <Thing id="sun" s={0.6} />;
    case "cake":
      return <Thing id="cake" s={0.6} />;
    case "grandma":
      return (
        <g>
          <circle r={22} fill="#F5D7A0" stroke="#2A1A10" strokeWidth={1.6} />
          <path d="M-24 -4 Q-24 -30 0 -30 Q24 -30 24 -4 Q14 -20 0 -20 Q-14 -20 -24 -4Z" fill="#FFFDF4" stroke="#2A1A10" strokeWidth={1.6} />
          <circle cx={-7} cy={0} r={2.4} fill="#2A1A10" />
          <circle cx={7} cy={0} r={2.4} fill="#2A1A10" />
          <path d="M-7 9 Q0 14 7 9" stroke="#2A1A10" strokeWidth={2} fill="none" strokeLinecap="round" />
          <path d="M18 -26 l4 -6 l4 6 l-4 6Z" fill="#E2463F" />
        </g>
      );
    case "me":
      return (
        <g>
          <circle r={24} fill="#F5B21E" stroke="#2A1A10" strokeWidth={1.6} />
          <circle r={16} fill="#FFDCA6" />
          <circle cx={-6} cy={-2} r={2.4} fill="#2A1A10" />
          <circle cx={6} cy={-2} r={2.4} fill="#2A1A10" />
          <path d="M-7 7 Q0 13 7 7" stroke="#2A1A10" strokeWidth={2} fill="none" strokeLinecap="round" />
          <path d="M-30 30 L-20 20 M30 30 L20 20" stroke="#2A1A10" strokeWidth={2} />
        </g>
      );
    default:
      return (
        <text y={8} fontSize={18} fontFamily={FONT} fontWeight={900} fill={BLUE} textAnchor="middle">
          My Book
        </text>
      );
  }
}

/** Anbessa's little book, open at a page: the drawing left, the sentence right, read word by word. */
function LittleBook({ x = 200, y = 112, s = 1, kind, text, read = true, stuck }: { x?: number; y?: number; s?: number; kind: Parameters<typeof Drawing>[0]["kind"]; text?: string; read?: boolean; stuck?: number }) {
  const words = text ? text.split(" ") : [];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <path d="M0 -60 Q-70 -70 -140 -60 V60 Q-70 50 0 60 Q70 50 140 60 V-60 Q70 -70 0 -60Z" fill="#FFFDF6" stroke={BLUE} strokeWidth={3} />
        <path d="M0 -60 V60" stroke="#D3E4F4" strokeWidth={2} />
        <g transform="translate(-70 0)">
          <Drawing kind={kind} />
        </g>
        {text && (
          <text x={70} y={8} fontSize={text.length > 12 ? 14 : 17} fontFamily={ANDIKA} fontWeight={700} fill="#2A1A10" textAnchor="middle">
            {words.map((w, i) => (
              <tspan key={`${i}-${w}`} className={read && (stuck === undefined || i < stuck) ? "mlb-word" : stuck !== undefined && i === stuck ? "mlb-stuck" : undefined} style={vars({ "--delay": `${0.6 + i * 0.7}s` })} fill={stuck === i ? "#E2463F" : undefined}>
                {i ? ` ${w}` : w}
              </tspan>
            ))}
          </text>
        )}
        {text && read && (
          <g className="mlb-point" style={vars({ "--n": words.length, "--dur": `${words.length * 0.7}s` })}>
            <ellipse cx={30} cy={30} rx={9} ry={7} fill="#FFD48A" stroke="#C98A4A" strokeWidth={1.4} />
          </g>
        )}
      </Tappable>
    </g>
  );
}

function GrandmaOnStool({ arm = "down" as "down" | "clap" | "wrap" | "raise", mood = "happy" as "happy" | "joy" }) {
  return (
    <g>
      <Stool x={320} y={292} s={1.1} />
      <Place x={320} y={262} s={0.46} flip tap={TAP.grandma}>
        <Grandma mood={mood} arm={arm} />
      </Place>
    </g>
  );
}

const Reader = ({ mood = "happy" as "happy" | "joy" | "wow" | "worried", x = 110, className }: { mood?: "happy" | "joy" | "wow" | "worried"; x?: number; className?: string }) => (
  <Place x={x} y={296} s={0.48} className={className} tap={TAP.cub}>
    <Cub mood={mood} arm="hold" />
  </Place>
);

export default function MyLittleBook({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Grandma's birthday. Anbessa's secret: a little book he made himself.
    case 0:
      return (
        <g>
          <Home id={id} time="morning">
            <g transform="translate(200 120)">
              <g className="lali-pop-in" style={vars({ "--delay": "0.6s" })}>
                <rect x={-44} y={-56} width={88} height={112} rx={6} fill={BLUE} />
                <rect x={-38} y={-50} width={76} height={100} rx={4} fill="#FFFDF6" />
                <text y={-20} fontSize={14} fontFamily={FONT} fontWeight={900} fill={BLUE} textAnchor="middle">
                  My Book
                </text>
                <g transform="translate(0 18) scale(0.7)">
                  <Drawing kind="me" />
                </g>
              </g>
            </g>
            <Reader mood="joy" />
            <Sparkles x={200} y={120} r={60} delay={1.2} n={6} />
          </Home>
        </g>
      );
    // "Grandma, sit here. I am going to read you a book. All by myself!"
    case 1:
      return (
        <g>
          <Home id={id} time="day">
            <GrandmaOnStool mood="joy" />
            <Reader mood="joy" x={150} />
            <SayBubble x={170} y={120} lines={["I am going to read", "you a book!"]} size={12} tail="down" delay={0.6} />
          </Home>
        </g>
      );
    // "This… is…" Stuck.
    case 2:
      return (
        <g>
          <Home id={id} time="day">
            <LittleBook kind="home" text="This is my home." read={false} stuck={2} />
            <GrandmaOnStool />
            <Reader mood="worried" className="mlb-flutter" />
            <Sign x={170} y={200} kind="?" delay={1.2} />
          </Home>
        </g>
      );
    // Lali: "Point to each word. Sound it out, or snap it! Point, look, read!"
    case 3:
      return (
        <g>
          <Home id={id} time="day">
            <LittleBook kind="home" text="This is my home." read={false} />
            <BeeHover x={160} y={210} s={1} />
            <SayBubble x={260} y={210} lines={["Point, look, read!"]} size={14} tail="left" delay={0.8} color={BLUE} />
            <Reader mood="happy" />
          </Home>
        </g>
      );
    // "This is my home."
    case 4:
      return (
        <g>
          <Home id={id} time="day">
            <LittleBook kind="home" text="This is my home." />
            <GrandmaOnStool />
            <Reader mood="happy" />
          </Home>
        </g>
      );
    // "I see a cat."
    case 5:
      return (
        <g>
          <Home id={id} time="day">
            <LittleBook kind="cat" text="I see a cat." />
            <GrandmaOnStool mood="joy" />
            <Reader mood="joy" />
          </Home>
        </g>
      );
    // "I see the sun." "I like Grandma."
    case 6:
      return (
        <g>
          <Home id={id} time="day">
            <LittleBook kind="grandma" text="I like Grandma." />
            <GrandmaOnStool mood="joy" arm="raise" />
            <Reader mood="joy" />
            <Hearts spots={[[300, 190, 3], [316, 176, 3.6]]} />
          </Home>
        </g>
      );
    // A tricky one: "c… a… k… e?"
    case 7:
      return (
        <g>
          <Home id={id} time="day">
            <LittleBook kind="cake" text="This is a cake." read={false} stuck={3} />
            <GrandmaOnStool />
            <Reader mood="worried" />
            <SayBubble x={200} y={210} lines={["c… a… k… e?"]} size={14} tail="left" delay={0.8} color="#E2463F" />
          </Home>
        </g>
      );
    // The picture: a round thing with a candle. "It's a CAKE!"
    case 8:
      return (
        <g>
          <Home id={id} time="day">
            <LittleBook kind="cake" text="This is a cake." />
            <g transform="translate(130 112)">
              <circle r={40} fill="none" stroke="#F5B21E" strokeWidth={4} className="mlb-ring" />
            </g>
            <GrandmaOnStool />
            <Reader mood="joy" className="lali-hop" />
          </Home>
        </g>
      );
    // "When a word is tricky, the picture can help!"
    case 9:
      return (
        <g>
          <Home id={id} time="day">
            <BeeHover x={200} y={130} s={1.2} />
            <SayBubble x={200} y={70} lines={["The picture", "can help!"]} size={15} tail="down" delay={0.6} color={BLUE} />
            <GrandmaOnStool />
            <Reader mood="happy" />
          </Home>
        </g>
      );
    // "I can READ!"
    case 10:
      return (
        <g>
          <Home id={id} time="day">
            <Glow x={200} y={112} r={140} color="#FFF3C0" strength={0.5} dur={2.4} />
            <LittleBook kind="me" text="I can read!" s={1.05} />
            <GrandmaOnStool mood="joy" arm="clap" />
            <Reader mood="joy" />
            <Sparkles x={270} y={112} r={60} delay={2.6} n={8} />
          </Home>
        </g>
      );
    // The best birthday present ever.
    default:
      return (
        <g>
          <Home id={id} time="evening">
            <Glow x={200} y={230} r={140} color="#FFB547" strength={0.35} dur={4} />
            <Place x={180} y={292} s={0.52} tap={TAP.grandma}>
              <Grandma mood="joy" arm="wrap" />
            </Place>
            <Place x={262} y={294} s={0.44} flip tap={TAP.cub}>
              <Cub mood="joy" arm="reach" />
            </Place>
            <g transform="translate(110 250) scale(0.6)">
              <Thing id="cake" />
            </g>
            <Hearts spots={[[214, 170, 0.6], [230, 160, 1.2], [200, 150, 1.8]]} s={1.2} />
          </Home>
        </g>
      );
  }
}
