"use client";

import "./what-is-this.css";

import { useId, type ReactNode } from "react";

import { Air, Place } from "../../scenery";
import { Tappable } from "../../tappable";
import { Camel, Cub, Gugu, Ibex, TAP, Tsehay, Wolf } from "./cast";
import { Club } from "./places";
import { Hearts, SayBubble, SentenceCard, Sign, Sparkles } from "./props";
import { Thing } from "./things";

/*
  "What Is This?": one living picture per page (12 pages) at English Club. Gugu's lumpy mystery
  bag sits in the middle; each friend reaches in (the bag wiggles), then the thing pops out above
  it while the answer "It is a …" appears on a strip of paper. For the key, Anbessa's questions and
  Gugu's answers come in speech bubbles.
  Keyframes: ./kit.css (efw-*) and ./what-is-this.css (wit-*).
*/

const TEAL = "#0E8C80";

/** Gugu's lumpy cloth bag with a question mark on it. */
function Bag({ x = 200, y = 272, feel = false }: { x?: number; y?: number; feel?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={feel ? "wit-feel" : undefined}>
        <Tappable reaction="wiggle" sound="pop">
          <path d="M-40 0 Q-50 -40 -24 -58 Q0 -66 24 -58 Q50 -40 40 0Z" fill="#C98A4A" />
          <path d="M-26 -58 Q0 -50 26 -58" stroke="#7A5236" strokeWidth={4} fill="none" />
          <circle cx={-14} cy={-24} r={9} fill="#B8783A" opacity={0.6} />
          <circle cx={14} cy={-34} r={7} fill="#B8783A" opacity={0.6} />
          <text x={0} y={-14} fontSize={24} fontFamily="var(--font-grandstander), sans-serif" fontWeight={900} fill="#FFFDF6" textAnchor="middle">
            ?
          </text>
        </Tappable>
      </g>
    </g>
  );
}

/** A thing popping up out of the bag. */
function Reveal({ children, delay = 1.6 }: { children: ReactNode; delay?: number }) {
  return (
    <g transform="translate(200 170)">
      <g className="wit-reveal" style={{ animationDelay: `${delay}s` }}>
        {children}
      </g>
      <Sparkles x={0} y={0} r={36} delay={delay + 0.4} n={6} />
    </g>
  );
}

/** Grandma's wooden spoon. */
const Spoon = () => (
  <g transform="rotate(-30)">
    <rect x={-4} y={-6} width={8} height={50} rx={4} fill="#B8803E" />
    <ellipse cx={0} cy={-18} rx={13} ry={18} fill="#C98A4A" />
    <ellipse cx={0} cy={-18} rx={8} ry={12} fill="#B8783A" />
  </g>
);

/** The little golden key. */
const Key = () => (
  <g transform="scale(0.8)">
    <Thing id="key" />
  </g>
);

/** Gugu, the bag's owner, on the right. */
const GuguBy = ({ mood = "joy" as "joy" | "happy" | "wow" }) => (
  <Place x={330} y={294} s={0.44} flip tap={TAP.gugu}>
    <Gugu mood={mood} pose="point" />
  </Place>
);

export default function WhatIsThis({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Gugu's mystery bag: "What is this?"
    case 0:
      return (
        <g>
          <Club id={id} time="day">
            <Bag />
            <GuguBy />
            <Place x={100} y={292} s={0.36} tap={TAP.hawi}>
              <Wolf mood="wow" />
            </Place>
            <SayBubble x={300} y={120} lines={["What is this?"]} size={16} tail="down" delay={0.8} color={TEAL} />
          </Club>
          <Air kind="day" seed={2} />
        </g>
      );
    // Hawi: round and soft… "It is a ball!"
    case 1:
      return (
        <g>
          <Club id={id} time="day">
            <Bag feel />
            <Place x={140} y={292} s={0.42} tap={TAP.hawi}>
              <Wolf mood="joy" arm="give" />
            </Place>
            <GuguBy />
            <Reveal>
              <Thing id="ball" s={0.6} />
            </Reveal>
            <SentenceCard x={200} y={70} text="It is a ball." color={TEAL} delay={1.4} />
          </Club>
          <Air kind="day" seed={3} />
        </g>
      );
    // Haben: hard, with a handle. "It is a cup!" "Yes, it is!"
    case 2:
      return (
        <g>
          <Club id={id} time="day">
            <Bag feel />
            <Place x={140} y={294} s={0.42} tap={TAP.haben}>
              <Ibex mood="joy" pose="point" />
            </Place>
            <GuguBy />
            <Reveal>
              <Thing id="cup" s={0.6} />
            </Reveal>
            <SentenceCard x={200} y={70} text="It is a cup." color={TEAL} delay={1.4} />
            <SayBubble x={330} y={170} lines={["Yes, it is!"]} size={12} tail="down" delay={3.2} color="#2E9A5B" />
          </Club>
          <Air kind="day" seed={4} />
        </g>
      );
    // Tsehay: long and bendy… "It is a banana!"
    case 3:
      return (
        <g>
          <Club id={id} time="day">
            <Bag feel />
            <Place x={140} y={294} s={0.42} tap={TAP.tsehay}>
              <Tsehay mood="joy" pose="point" />
            </Place>
            <GuguBy />
            <Reveal>
              <Thing id="banana" s={0.6} />
            </Reveal>
            <SentenceCard x={200} y={70} text="It is a banana." color={TEAL} delay={1.4} />
          </Club>
          <Air kind="day" seed={5} />
        </g>
      );
    // Ayan: thin, round at one end… "It is a spoon!"
    case 4:
      return (
        <g>
          <Club id={id} time="day">
            <Bag feel />
            <Place x={130} y={294} s={0.44} tap={TAP.ayan}>
              <Camel who="ayan" mood="joy" />
            </Place>
            <GuguBy />
            <Reveal>
              <Spoon />
            </Reveal>
            <SentenceCard x={200} y={70} text="It is a spoon." color={TEAL} delay={1.4} />
          </Club>
          <Air kind="day" seed={6} />
        </g>
      );
    // Anbessa: small, hard, bumpy… "I don't know!"
    case 5:
      return (
        <g>
          <Club id={id} time="day">
            <Bag feel />
            <Place x={140} y={294} s={0.46} tap={TAP.cub}>
              <Cub mood="worried" arm="reach" />
            </Place>
            <GuguBy />
            <SayBubble x={150} y={120} lines={["It is a… a…", "I don't know!"]} size={13} tail="down" delay={0.8} />
            <Sign x={240} y={180} kind="?" delay={1.6} />
          </Club>
          <Air kind="day" seed={7} />
        </g>
      );
    // "I can ASK about it!" "Is it big?" "No, it isn't."
    case 6:
      return (
        <g>
          <Club id={id} time="day">
            <Bag />
            <Place x={130} y={294} s={0.46} tap={TAP.cub}>
              <Cub mood="happy" arm="up" />
            </Place>
            <GuguBy mood="happy" />
            <SayBubble x={130} y={130} lines={["Is it big?"]} size={15} tail="down" delay={0.6} />
            <SayBubble x={310} y={150} lines={["No, it isn't."]} size={14} tail="down" delay={1.8} color="#E2463F" />
          </Club>
          <Air kind="day" seed={8} />
        </g>
      );
    // "Is it a food?" No. "Is it a toy?" No. "Does it open something?" YES!
    case 7:
      return (
        <g>
          <Club id={id} time="day">
            <Bag feel />
            <Place x={120} y={294} s={0.44} tap={TAP.cub}>
              <Cub mood="happy" arm="reach" />
            </Place>
            <GuguBy />
            <SayBubble x={130} y={70} lines={["Is it a food?"]} size={12} tail="down" delay={0.3} />
            <SayBubble x={300} y={70} lines={["No, it isn't."]} size={12} tail="down" delay={0.9} color="#E2463F" />
            <SayBubble x={130} y={130} lines={["Does it open something?"]} size={12} tail="down" delay={1.8} />
            <SayBubble x={300} y={180} lines={["YES, it does!"]} size={13} tail="down" delay={2.6} color="#2E9A5B" />
          </Club>
          <Air kind="day" seed={9} />
        </g>
      );
    // "It is a KEY!"
    case 8:
      return (
        <g>
          <Club id={id} time="day">
            <Bag />
            <Place x={130} y={294} s={0.48} className="lali-hop" tap={TAP.cub}>
              <Cub mood="joy" arm="up" />
            </Place>
            <GuguBy />
            <Reveal delay={0.6}>
              <Key />
            </Reveal>
            <SentenceCard x={200} y={70} text="It is a key!" color={TEAL} size={22} delay={1.2} />
          </Club>
          <Air kind="day" seed={10} />
        </g>
      );
    // "Is it a treasure box?" "Yes, it is!"
    case 9:
      return (
        <g>
          <Club id={id} time="day">
            <g transform="translate(140 266)">
              <Thing id="box" s={0.8} />
            </g>
            <Place x={240} y={294} s={0.42} tap={TAP.haben}>
              <Ibex mood="wow" pose="point" />
            </Place>
            <GuguBy />
            <SayBubble x={220} y={120} lines={["Is it a", "treasure box?"]} size={13} tail="down" delay={0.6} />
            <SayBubble x={330} y={170} lines={["Yes, it is!"]} size={12} tail="down" delay={2} color="#2E9A5B" />
          </Club>
          <Air kind="day" seed={11} />
        </g>
      );
    // Click! Kolo for everyone: "It is a SNACK!"
    case 10:
      return (
        <g>
          <Club id={id} time="day">
            <g transform="translate(200 260)">
              <Thing id="kolo" s={0.9} />
            </g>
            <Place x={110} y={292} s={0.36} tap={TAP.cub}>
              <Cub mood="joy" />
            </Place>
            <Place x={160} y={292} s={0.34} tap={TAP.hawi}>
              <Wolf mood="joy" wag />
            </Place>
            <Place x={250} y={294} s={0.36} tap={TAP.haben}>
              <Ibex mood="joy" />
            </Place>
            <Place x={310} y={294} s={0.38} flip tap={TAP.gugu}>
              <Gugu mood="joy" />
            </Place>
            <SentenceCard x={200} y={70} text="It is a snack!" color={TEAL} delay={0.6} />
            <Hearts spots={[[180, 200, 1.2], [226, 196, 1.8]]} />
          </Club>
          <Air kind="day" seed={12} />
        </g>
      );
    // What is this? Feel it, think it, say it!
    default:
      return (
        <g>
          <Club id={id} time="evening">
            <Bag feel />
            {["ball", "cup", "banana", "key"].map((t, i) => (
              <g key={t} transform={`translate(${80 + i * 80} 150)`}>
                <g className="lali-pop-in" style={{ animationDelay: `${0.4 + i * 0.4}s` }}>
                  <Thing id={t} s={0.4} />
                </g>
              </g>
            ))}
            <SentenceCard x={200} y={70} text="What is this?" color={TEAL} delay={0.2} />
            <GuguBy />
          </Club>
          <Air kind="dusk" seed={13} />
        </g>
      );
  }
}
