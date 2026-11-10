"use client";

import "./say-it-slowly.css";

import { useId, type ReactNode } from "react";

import { Glow } from "../../glow";
import { Air, BeeHover, Place } from "../../scenery";
import { Tappable } from "../../tappable";
import { Cat, Cub, Grandma, Gugu, TAP } from "./cast";
import { Home, Yard } from "./places";
import { BlendCard, Hearts, LetterCard, SayBubble, Sign, WordCard } from "./props";
import { Thing } from "./things";

/*
  "Grandma Says It Slowly": one living picture per page (12 pages), in Grandma's kitchen and on
  the step outside. Every word Grandma says in sounds is shown with <BlendCard>: three letter tiles
  that slide together (slow, slow… fast!) and then the whole word with its picture. The fire
  crackles under the shiro pot.
  Keyframes: ./kit.css (efw-*) and ./say-it-slowly.css (sis-*).
*/

const ORANGE = "#D9662B";

/** Grandma's fire: three stones, flames and the shiro pot bubbling. */
function Fire({ x, y, pot = true }: { x: number; y: number; pot?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Glow x={0} y={-10} r={50} color="#FFB547" strength={0.5} dur={2} />
      <g fill="#7E7A8C">
        <ellipse cx={-24} cy={0} rx={10} ry={7} />
        <ellipse cx={24} cy={0} rx={10} ry={7} />
        <ellipse cx={0} cy={4} rx={10} ry={7} />
      </g>
      <g className="sis-flame">
        <path d="M-12 -2 Q-14 -22 -4 -30 Q-2 -16 4 -24 Q14 -12 10 -2Z" fill="#FF9A3C" />
        <path d="M-6 -2 Q-6 -14 0 -18 Q6 -10 4 -2Z" fill="#FFE27A" />
      </g>
      {pot && (
        <g transform="translate(0 -30)">
          <Thing id="pot" s={0.55} />
          <g className="sis-bubble" fill="#F5DCC0">
            <circle cx={-6} cy={-20} r={3} />
            <circle cx={6} cy={-24} r={2.4} />
          </g>
        </g>
      )}
    </g>
  );
}

/** Three loose letters floating apart: sounds that aren't a word yet. */
function Loose({ word, x, y }: { word: string; x: number; y: number }) {
  return (
    <g>
      {word.split("").map((l, i) => (
        <g key={i} transform={`translate(${x + i * 56} ${y + (i % 2) * 14})`}>
          <g className="sis-float" style={{ animationDelay: `${-i * 0.6}s` }}>
            <LetterCard x={0} y={0} letter={l} only="small" color={ORANGE} s={0.7} delay={0.4 + i * 0.4} />
          </g>
        </g>
      ))}
    </g>
  );
}

function GrandmaAt({ x = 300, arm = "pour" as "pour" | "hold" | "raise" | "down" | "clap", item }: { x?: number; arm?: "pour" | "hold" | "raise" | "down" | "clap"; item?: ReactNode }) {
  return (
    <Place x={x} y={292} s={0.5} flip tap={TAP.grandma}>
      <Grandma mood="joy" arm={arm} item={item} />
    </Place>
  );
}

export default function SayItSlowly({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // "Please bring me the p-o-t." "The… what?"
    case 0:
      return (
        <g>
          <Home id={id} time="day">
            <Fire x={250} y={268} />
            <GrandmaAt x={320} />
            <Place x={110} y={294} s={0.46} tap={TAP.cub}>
              <Cub mood="wow" />
            </Place>
            <SayBubble x={280} y={130} lines={["Please bring me", "the p-o-t."]} size={13} tail="down" delay={0.6} />
            <Sign x={150} y={170} kind="?" delay={2} />
          </Home>
        </g>
      );
    // Three little sounds, not a word. A plate? A pan? No!
    case 1:
      return (
        <g>
          <Home id={id} time="day">
            <Fire x={260} y={268} />
            <GrandmaAt x={330} />
            <Loose word="pot" x={80} y={70} />
            <Place x={150} y={294} s={0.46} tap={TAP.cub}>
              <Cub mood="worried" arm="hold" item={<Thing id="pan" s={0.4} />} />
            </Place>
            <SayBubble x={300} y={150} lines={["Not a pan!"]} size={14} tail="down" delay={1.2} />
          </Home>
        </g>
      );
    // Lali's trick: slow, slow, slow… FAST!
    case 2:
      return (
        <g>
          <Home id={id} time="day">
            <BeeHover x={150} y={110} s={1.2} />
            <SayBubble x={260} y={80} lines={["Slow, slow, slow…", "FAST!"]} size={15} tail="left" delay={0.4} color={ORANGE} />
            <g className="sis-train">
              <g transform="translate(110 210)">
                <rect x={-30} y={-18} width={56} height={30} rx={6} fill="#2A1A10" />
                <rect x={6} y={-34} width={22} height={46} rx={5} fill="#E8513B" />
                <circle cx={-16} cy={16} r={8} fill="#5A5A66" />
                <circle cx={14} cy={16} r={8} fill="#5A5A66" />
              </g>
              {["p", "o", "t"].map((l, i) => (
                <g key={l} transform={`translate(${170 + i * 56} 212)`}>
                  <rect x={-24} y={-22} width={48} height={36} rx={6} fill={["#E8513B", "#2F6FD0", "#2E9A5B"][i]} />
                  <text y={6} fontSize={24} fontFamily="var(--font-andika), sans-serif" fontWeight={700} fill="#fff" textAnchor="middle">
                    {l}
                  </text>
                  <circle cx={-12} cy={18} r={7} fill="#5A5A66" />
                  <circle cx={12} cy={18} r={7} fill="#5A5A66" />
                </g>
              ))}
            </g>
            <path d="M40 238 H380" stroke="#7A5236" strokeWidth={4} />
            <Place x={60} y={294} s={0.34} tap={TAP.cub}>
              <Cub mood="happy" />
            </Place>
          </Home>
        </g>
      );
    // "p… o… t. POT!" The big clay pot.
    case 3:
      return (
        <g>
          <Home id={id} time="day">
            <Fire x={260} y={268} pot={false} />
            <GrandmaAt x={330} />
            <BlendCard x={150} y={80} word="pot" pic="pot" color={ORANGE} delay={0.4} s={1.2} />
            <Place x={170} y={294} s={0.46} className="lali-hop" tap={TAP.cub}>
              <Cub mood="joy" arm="hold" item={<Thing id="pot" s={0.4} />} />
            </Place>
          </Home>
        </g>
      );
    // c-u-p, CUP! m-a-t, MAT!
    case 4:
      return (
        <g>
          <Home id={id} time="day">
            <Fire x={300} y={268} />
            <BlendCard x={110} y={70} word="cup" pic="cup" color={ORANGE} delay={0.3} />
            <BlendCard x={290} y={70} word="mat" pic="mat" color="#2E9A5B" delay={2.6} />
            <g transform="translate(200 284)">
              <Thing id="mat" s={1.4} />
            </g>
            <Place x={110} y={294} s={0.44} tap={TAP.cub}>
              <Cub mood="joy" arm="give" item={<Thing id="cup" s={0.3} />} />
            </Place>
          </Home>
        </g>
      );
    // Gugu: "H. A. T? What's that?"
    case 5:
      return (
        <g>
          <Home id={id} time="day" door="open">
            <Place x={98} y={262} s={0.42} tap={TAP.gugu}>
              <Gugu mood="worried" />
            </Place>
            <GrandmaAt x={320} arm="hold" item={<Thing id="hat" s={0.36} />} />
            <SayBubble x={290} y={120} lines={["Please hang up", "my h-a-t."]} size={12} tail="down" delay={0.4} />
            <SayBubble x={150} y={150} lines={["H. A. T?"]} size={14} tail="left" delay={1.8} color="#7A3E1D" />
            <Sign x={110} y={190} kind="?" delay={2.4} />
          </Home>
        </g>
      );
    // Anbessa passes on the trick: "h-a-t. HAT!" On Gugu's head!
    case 6:
      return (
        <g>
          <Home id={id} time="day">
            <BlendCard x={200} y={70} word="hat" pic="hat" color="#8E5BE0" delay={0.4} s={1.1} />
            <Place x={130} y={294} s={0.42} tap={TAP.cub}>
              <Cub mood="joy" arm="up" />
            </Place>
            <Place x={250} y={294} s={0.48} className="lali-hop" tap={TAP.gugu}>
              <Gugu mood="joy" />
              <g transform="translate(100 34)">
                <g className="lali-pop-in" style={{ animationDelay: "2.6s" }}>
                  <Thing id="hat" s={0.9} />
                </g>
              </g>
            </Place>
          </Home>
        </g>
      );
    // "It's h-o-t by the fire. Let's sit in the s-u-n."
    case 7:
      return (
        <g>
          <Yard id={id} time="day" sun={[330, 64]}>
            <BlendCard x={110} y={70} word="hot" color="#E2463F" delay={0.3} />
            <BlendCard x={250} y={120} word="sun" pic="sun" color="#C99A00" delay={2.6} />
            <Place x={110} y={292} s={0.4} tap={TAP.cub}>
              <Cub mood="joy" />
            </Place>
            <Place x={170} y={292} s={0.4} tap={TAP.gugu}>
              <Gugu mood="joy" />
            </Place>
            <Place x={250} y={290} s={0.46} flip tap={TAP.grandma}>
              <Grandma mood="joy" />
            </Place>
          </Yard>
          <Air kind="day" seed={2} />
        </g>
      );
    // On the step: a c-a-t. CAT!
    case 8:
      return (
        <g>
          <Yard id={id} time="day">
            <rect x={160} y={262} width={90} height={14} rx={4} fill="#C98A5A" />
            <g transform="translate(206 262)">
              <Tappable reaction="spin" sound="pop">
                <Cat sleep />
              </Tappable>
            </g>
            <BlendCard x={200} y={90} word="cat" pic="cat" color="#2F6FD0" delay={0.6} s={1.1} />
            <Place x={90} y={294} s={0.4} tap={TAP.cub}>
              <Cub mood="happy" look={3} />
            </Place>
            <Place x={320} y={294} s={0.4} flip tap={TAP.gugu}>
              <Gugu mood="wow" />
            </Place>
          </Yard>
          <Air kind="day" seed={3} />
        </g>
      );
    // To the b-e-d. Cats love naps!
    case 9:
      return (
        <g>
          <Home id={id} time="day" shelf={false}>
            <rect x={200} y={256} width={150} height={18} rx={8} fill="#4A7FD0" />
            <g transform="translate(270 256)">
              <g className="sis-walk">
                <Cat sleep />
              </g>
            </g>
            <BlendCard x={240} y={80} word="bed" pic="bed" color="#2F6FD0" delay={0.4} s={1.1} />
            <Place x={90} y={294} s={0.4} tap={TAP.cub}>
              <Cub mood="joy" />
            </Place>
            <Place x={140} y={294} s={0.38} tap={TAP.gugu}>
              <Gugu mood="joy" />
            </Place>
          </Home>
        </g>
      );
    // "Here is your m-u-g." "MUG! Thank you, my clever one."
    case 10:
      return (
        <g>
          <Home id={id} time="evening">
            <Fire x={80} y={268} pot={false} />
            <Place x={180} y={294} s={0.46} tap={TAP.cub}>
              <Cub mood="joy" arm="give" item={<Thing id="mug" s={0.3} />} />
            </Place>
            <GrandmaAt x={290} arm="clap" />
            <BlendCard x={220} y={80} word="mug" pic="mug" color="#0E8C80" delay={0.6} s={1.1} />
            <Hearts spots={[[240, 190, 2.6], [256, 176, 3.2]]} />
          </Home>
        </g>
      );
    // Pot, cup, mat, hat, hot, sun, cat, bed, mug!
    default:
      return (
        <g>
          <Home id={id} time="evening" shelf={false}>
            {["pot", "cup", "mat", "hat", "sun", "cat", "bed", "mug"].map((w, i) => (
              <WordCard key={w} x={60 + (i % 4) * 92} y={60 + Math.floor(i / 4) * 86} word={w} pic={w} color={ORANGE} size={13} delay={0.3 + i * 0.3} />
            ))}
            <Place x={150} y={296} s={0.36} tap={TAP.cub}>
              <Cub mood="joy" arm="up" />
            </Place>
            <Place x={250} y={294} s={0.4} flip tap={TAP.grandma}>
              <Grandma mood="joy" arm="clap" />
            </Place>
          </Home>
        </g>
      );
  }
}
