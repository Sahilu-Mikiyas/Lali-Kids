"use client";

import "./wobbly-tooth.css";

import { useId } from "react";

import { Glow } from "../../glow";
import { Air, BeeHover, Place } from "../../scenery";
import { Tappable } from "../../tappable";
import { Cub, Gugu, Mama, OnHead, TAP, Teacher, Tsehay, Wolf } from "./cast";
import { Club, FigTree, Home, Yard } from "./places";
import { Hearts, LetterCard, SayBubble, Sign, Sparkles, Speech, WordCard } from "./props";
import { Thing } from "./things";

/*
  "Tsehay's Wobbly Tooth": one living picture per page (12 pages). Tsehay's smile is drawn over
  her gelada face with <Smile>: a row of little teeth, one wobbling (page 0 on), then a gap with a
  tiny new tooth peeking through. Her hands cover her mouth when she hides it. Each page's sound
  (‘t’, ‘r’, ‘s’) gets its letter tile and its English word.
  Keyframes: ./kit.css (efw-*) and ./wobbly-tooth.css (wt-*).
*/

const PINK = "#E8607A";

/** Teeth in Tsehay's open smile (her 200 x 240 box): `wobble` shakes one, `gap` leaves it out, `tip` shows the new one. */
function Smile({ wobble = false, gap = false, tip = false }: { wobble?: boolean; gap?: boolean; tip?: boolean }) {
  return (
    <OnHead>
      <path d="M86 118 Q100 140 114 118Z" fill="#8A2F1E" />
      <g fill="#FFFDF6">
        <rect x={89} y={118} width={5} height={6} rx={1.4} />
        {!gap && (
          <g className={wobble ? "wt-wobble" : undefined}>
            <rect x={95} y={118} width={5} height={7} rx={1.4} />
          </g>
        )}
        {gap && tip && <rect x={95.6} y={118} width={4} height={2.4} rx={1} className="wt-tip" />}
        <rect x={101} y={118} width={5} height={7} rx={1.4} />
        <rect x={107} y={118} width={4.4} height={5} rx={1.4} />
      </g>
    </OnHead>
  );
}

/** Tsehay's two hands pressed over her mouth. */
function HandsOver() {
  return (
    <OnHead>
      <path d="M60 170 Q66 140 92 126" stroke="#A8744A" strokeWidth={14} fill="none" strokeLinecap="round" />
      <path d="M140 170 Q134 140 108 126" stroke="#A8744A" strokeWidth={14} fill="none" strokeLinecap="round" />
      <ellipse cx={93} cy={124} rx={11} ry={9} fill="#8A6050" stroke="#3A2016" strokeWidth={1.6} />
      <ellipse cx={107} cy={124} rx={11} ry={9} fill="#8A6050" stroke="#3A2016" strokeWidth={1.6} />
    </OnHead>
  );
}

/** Tsehay, with her teeth showing (or her hands over her mouth). */
function TsehaySmile({ x, y, s, mood = "joy", teeth, hands = false, className }: { x: number; y: number; s: number; mood?: "joy" | "worried" | "sad" | "happy" | "wow"; teeth?: { wobble?: boolean; gap?: boolean; tip?: boolean }; hands?: boolean; className?: string }) {
  return (
    <Place x={x} y={y} s={s} className={className} tap={TAP.tsehay}>
      <Tsehay mood={mood} />
      {teeth && <Smile {...teeth} />}
      {hands && <HandsOver />}
    </Place>
  );
}

/** The little tooth, flying or resting at (x, y). */
function LooseTooth({ x, y, s = 1, fly = false }: { x: number; y: number; s?: number; fly?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={fly ? "wt-fly" : undefined}>
        <g transform={`scale(${s * 0.3})`}>
          <Thing id="tooth" />
        </g>
      </g>
    </g>
  );
}

/** The tooth tin with its red ribbon. */
function Tin({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Tappable reaction="bounce" sound="chime">
        <rect x={-26} y={-18} width={52} height={30} rx={6} fill="#C9C4D6" />
        <rect x={-28} y={-24} width={56} height={10} rx={4} fill="#E3E0EA" />
        <path d="M0 -24 V12 M-28 -6 H28" stroke="#E2463F" strokeWidth={4} />
        <path d="M0 -24 q-12 -12 -16 -2 q8 6 16 2 q12 -12 16 -2 q-8 6 -16 2Z" fill="#E2463F" />
      </Tappable>
    </g>
  );
}

export default function WobblyTooth({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Wiggle, wiggle, wobble, wobble, little tooth! ‘t’ for tooth.
    case 0:
      return (
        <g>
          <Home id={id} time="morning">
            <TsehaySmile x={200} y={318} s={0.84} teeth={{ wobble: true }} />
            <LetterCard x={70} y={80} letter="t" color={PINK} delay={0.8} say />
            <WordCard x={330} y={90} word="tooth" pic="tooth" color={PINK} size={16} delay={1.6} />
            <BeeHover x={320} y={190} s={1} flip />
          </Home>
        </g>
      );
    // A round, red tomato. She can't bite it! ‘r’ for round and red.
    case 1:
      return (
        <g>
          <Home id={id} time="day">
            <Place x={310} y={292} s={0.5} flip tap={TAP.mama}>
              <Mama mood="happy" />
            </Place>
            <TsehaySmile x={150} y={294} s={0.48} mood="worried" teeth={{ wobble: true }} />
            <g transform="translate(226 262)">
              <ellipse cx={0} cy={8} rx={34} ry={8} fill="#FFFDF4" stroke="#E3D5C3" strokeWidth={1.4} />
              <g className="wt-roll">
                <Thing id="tomato" s={0.5} />
              </g>
            </g>
            <LetterCard x={70} y={80} letter="r" color="#E2463F" delay={0.8} say />
            <WordCard x={190} y={90} word="round" color="#E2463F" size={14} delay={1.4} />
            <WordCard x={300} y={90} word="red" color="#E2463F" size={14} delay={2} />
          </Home>
        </g>
      );
    // "When it comes out, there will be a hole. Everyone will laugh."
    case 2:
      return (
        <g>
          <Yard id={id} time="day" tree fig={300}>
            <TsehaySmile x={130} y={296} s={0.56} mood="worried" />
            <Speech x={250} y={110} w={150} h={70} think tail="left" delay={0.6}>
              <g transform="translate(-34 -4)">
                <circle r={20} fill="#FFD27A" />
                <path d="M-10 4 Q0 16 10 4Z" fill="#8A2F1E" />
                <rect x={-6} y={4} width={4} height={4} fill="#fff" />
                <rect x={2} y={4} width={4} height={4} fill="#fff" />
              </g>
              <text x={30} y={6} fontSize={16} fontFamily="var(--font-grandstander), sans-serif" fontWeight={900} fill="#8A5BD6" textAnchor="middle">
                Ha ha?
              </text>
            </Speech>
          </Yard>
          <Air kind="day" seed={2} />
        </g>
      );
    // "Everybody smile!" Tsehay presses her lips tight.
    case 3:
      return (
        <g>
          <Club id={id} time="day">
            <Place x={340} y={292} s={0.46} flip tap={TAP.mama}>
              <Teacher mood="joy" pose="wave" item={<rect x={-8} y={-14} width={16} height={24} rx={3} fill="#1B2A4E" />} />
            </Place>
            <Place x={110} y={292} s={0.36} tap={TAP.cub}>
              <Cub mood="joy" />
            </Place>
            <TsehaySmile x={170} y={294} s={0.4} mood="worried" />
            <Place x={232} y={294} s={0.38} tap={TAP.gugu}>
              <Gugu mood="joy" />
            </Place>
            <SayBubble x={290} y={130} lines={["Everybody smile!"]} size={13} tail="down" delay={0.6} />
            <LetterCard x={100} y={90} letter="s" color="#2F6FD0" delay={1.2} say />
            <WordCard x={190} y={170} word="smile" color="#2F6FD0" size={13} delay={2} />
          </Club>
          <Air kind="day" seed={3} />
        </g>
      );
    // Sugarcane… crunch… PLOP! "My TOOTH!"
    case 4:
      return (
        <g>
          <Yard id={id} time="day" tree fig={60}>
            <Place x={290} y={294} s={0.46} flip tap={TAP.gugu}>
              <Gugu mood="joy" pose="point" item={<Thing id="sugarcane" s={0.4} />} />
            </Place>
            <TsehaySmile x={170} y={296} s={0.52} mood="wow" teeth={{ gap: true }} />
            <LooseTooth x={200} y={200} fly />
            <SayBubble x={150} y={110} lines={["My TOOTH!"]} size={17} tail="down" delay={1.2} color={PINK} />
            <WordCard x={320} y={90} word="sugarcane" pic="sugarcane" color="#2F6FD0" size={13} delay={0.6} />
          </Yard>
          <Air kind="day" seed={4} />
        </g>
      );
    // ‘r’ for run! She hides behind the big tree.
    case 5:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <TsehaySmile x={270} y={292} s={0.4} hands className="wt-run" />
            <FigTree x={250} y={250} s={1.1} />
            <WordCard x={90} y={90} word="run" color="#E2463F" size={18} delay={0.8} />
            <Place x={80} y={294} s={0.36} tap={TAP.gugu}>
              <Gugu mood="wow" />
            </Place>
          </Yard>
          <Air kind="day" seed={5} />
        </g>
      );
    // Anbessa finds her: "I have a hole. I look silly."
    case 6:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <FigTree x={290} y={250} s={1.1} />
            <TsehaySmile x={200} y={294} s={0.5} mood="sad" hands />
            <Place x={100} y={294} s={0.46} tap={TAP.cub}>
              <Cub mood="worried" look={3} />
            </Place>
            <SayBubble x={120} y={140} lines={["What's wrong?"]} size={13} tail="down" delay={0.6} />
          </Yard>
          <Air kind="day" seed={6} />
        </g>
      );
    // In the water bowl: a tiny white tip, peeking through the gap.
    case 7:
      return (
        <g>
          <rect width={400} height={300} fill="#BFE3F2" />
          <Glow x={200} y={160} r={160} color="#FFFFFF" strength={0.5} dur={4} />
          <ellipse cx={200} cy={160} rx={180} ry={130} fill="#8FCFE8" />
          <ellipse cx={200} cy={160} rx={180} ry={130} fill="none" stroke="#B8643A" strokeWidth={14} />
          <g transform="translate(200 160) scale(1.6) translate(-100 -100)">
            <g className="wt-ripple">
              <Tsehay mood="joy" />
              <Smile gap tip />
            </g>
          </g>
          <Sparkles x={200} y={190} r={30} delay={1.6} n={6} />
        </g>
      );
    // "The gap is a door for my new big tooth! It means I'm growing."
    case 8:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <FigTree x={300} y={250} s={1.1} />
            <TsehaySmile x={180} y={296} s={0.58} teeth={{ gap: true, tip: true }} className="lali-hop" />
            <SayBubble x={160} y={110} lines={["A new tooth", "is coming!"]} size={15} tail="down" delay={0.6} color={PINK} />
            <Sign x={250} y={170} kind="!" delay={1.6} color="#F5B21E" />
          </Yard>
          <Air kind="day" seed={7} />
        </g>
      );
    // The biggest smile of all. Gugu has a gap too!
    case 9:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <TsehaySmile x={150} y={296} s={0.56} teeth={{ gap: true, tip: true }} />
            <Place x={270} y={296} s={0.54} flip tap={TAP.gugu}>
              <Gugu mood="joy" />
              <OnHead>
                <rect x={93} y={119} width={5} height={5} rx={1.2} fill="#FFFDF6" />
                <rect x={104} y={119} width={5} height={5} rx={1.2} fill="#FFFDF6" />
              </OnHead>
            </Place>
            <WordCard x={210} y={80} word="smile" color="#2F6FD0" size={20} delay={0.8} />
            <Hearts spots={[[210, 190, 1.2], [224, 176, 1.8]]} />
            <Sparkles x={150} y={200} r={60} delay={1} n={6} />
          </Yard>
          <Air kind="day" seed={8} />
        </g>
      );
    // The photo again, everyone smiling in the sun; the tooth in a tin with a red ribbon.
    case 10:
      return (
        <g>
          <Club id={id} time="day" sun={[200, 60]}>
            <g className="wt-flash">
              <rect width={400} height={300} fill="#fff" />
            </g>
            <Place x={120} y={292} s={0.36} tap={TAP.cub}>
              <Cub mood="joy" />
            </Place>
            <TsehaySmile x={180} y={294} s={0.4} teeth={{ gap: true, tip: true }} />
            <Place x={236} y={294} s={0.38} tap={TAP.gugu}>
              <Gugu mood="joy" />
            </Place>
            <Place x={290} y={292} s={0.34} tap={TAP.hawi}>
              <Wolf mood="joy" />
            </Place>
            <Tin x={330} y={200} />
            <WordCard x={330} y={140} word="ribbon" color="#E2463F" size={13} delay={1.4} />
          </Club>
          <Air kind="day" seed={9} />
        </g>
      );
    // ‘t’ for tooth, ‘r’ for ribbon, ‘s’ for smile!
    default:
      return (
        <g>
          <Home id={id} time="evening" shelf={false}>
            <Glow x={200} y={230} r={130} color="#FFB547" strength={0.35} dur={4} />
            <Tin x={300} y={250} />
            <TsehaySmile x={170} y={296} s={0.5} teeth={{ gap: true, tip: true }} />
            {(["t", "r", "s"] as const).map((l, i) => (
              <g key={l}>
                <LetterCard x={90 + i * 110} y={58} letter={l} color={[PINK, "#E2463F", "#2F6FD0"][i]} s={0.8} delay={0.5 + i * 0.6} />
                <WordCard x={90 + i * 110} y={110} word={["tooth", "ribbon", "smile"][i]} color={[PINK, "#E2463F", "#2F6FD0"][i]} size={13} delay={0.8 + i * 0.6} />
              </g>
            ))}
          </Home>
        </g>
      );
  }
}
