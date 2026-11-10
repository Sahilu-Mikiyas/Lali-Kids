"use client";

import "./wait-for-the-train.css";

import { useId } from "react";

import { Air, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Camel, FONT, TAP } from "./cast";
import { at, HiWord, Station } from "./more";
import { Hearts, SayBubble, Sign, Sparkles } from "./props";
import { Thing } from "./things";

/*
  "Wait for the Train": one living picture per page (12 pages), at the station in Dire Dawa: the
  big green roof, the platform's yellow line, the departures board, the bench, the yellow doors,
  and a snail climbing a post, slow as slow, all through the story until it reaches the top. The
  ai in each word is drawn in green.
  Keyframes: ./kit.css, ./more.css and ./wait-for-the-train.css (wft-*).
*/

const AI = "#2E9A5B";
type M = "happy" | "joy" | "wow" | "worried";

const Ayan = ({ x, y = 294, s = 0.44, mood = "happy" as M, flip = false }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.ayan}>
    <Camel who="ayan" mood={mood} />
  </Place>
);
const Abdi = ({ x, y = 296, s = 0.38, mood = "happy" as M, flip = false, className }: { x: number; y?: number; s?: number; mood?: M; flip?: boolean; className?: string }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.ayan} className={className}>
    <Camel who="abdi" mood={mood} />
  </Place>
);
const Hooyo = ({ x, y = 292, s = 0.46, mood = "happy" as M, flip = false }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.mama}>
    <Camel who="hooyo" mood={mood} />
  </Place>
);

/** The bench on the platform. */
const Bench = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-70} y={-30} width={140} height={10} rx={3} fill="#9C6A3A" stroke="#2A1A10" strokeWidth={1.4} />
    <rect x={-70} y={-12} width={140} height={10} rx={3} fill="#B5743A" stroke="#2A1A10" strokeWidth={1.4} />
    <path d="M-60 -2 V16 M60 -2 V16" stroke="#5A5A66" strokeWidth={5} />
  </g>
);

/** The station's yellow doors, freshly painted. */
const Doors = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-46} y={-92} width={92} height={92} fill="#E8DCC8" />
    {[-22, 22].map((dx) => (
      <g key={dx}>
        <rect x={dx - 18} y={-80} width={36} height={80} fill="#FFD233" stroke="#2A1A10" strokeWidth={1.6} />
        <circle cx={dx + (dx < 0 ? 12 : -12)} cy={-40} r={2.4} fill="#2A1A10" />
      </g>
    ))}
  </g>
);

/** The snail on the post: `at` is how far up it has climbed (0 to 1). */
function Snail({ x, y, h = 120, at: up = 0, crawl = false }: { x: number; y: number; h?: number; at?: number; crawl?: boolean }) {
  return (
    <g transform={`translate(${x} ${y - up * h})`}>
      <g className={crawl ? "enr-crawl" : undefined} style={vars({ "--cy": "-18px", "--dur": "20s" })}>
        <Tappable reaction="wiggle" sound="pop">
          <g transform="rotate(-90) scale(0.42)">
            <Thing id="snail" />
          </g>
        </Tappable>
      </g>
    </g>
  );
}

/** A long green and yellow train standing at (or sliding into) the platform. */
function Train({ arrive = false }: { arrive?: boolean }) {
  return (
    <g transform="translate(0 210)">
      <g className={arrive ? "enr-arrive" : undefined} style={vars({ "--dur": "2.6s", "--delay": "0.4s" })}>
        <Tappable reaction="bounce" sound="boing">
          {[0, 1, 2].map((k) => (
            <g key={k} transform={`translate(${40 + k * 130} 0)`}>
              <rect x={0} y={-84} width={124} height={70} rx={8} fill="#2E9A5B" stroke="#2A1A10" strokeWidth={2} />
              <rect x={0} y={-36} width={124} height={8} fill="#FFD233" />
              {[12, 44, 76].map((wx) => (
                <rect key={wx} x={wx} y={-74} width={26} height={24} rx={4} fill="#DDF2FF" stroke="#2A1A10" strokeWidth={1.4} />
              ))}
              <circle cx={24} cy={-10} r={9} fill="#2A2A33" />
              <circle cx={100} cy={-10} r={9} fill="#2A2A33" />
            </g>
          ))}
          <path d="M430 -84 H460 Q480 -84 480 -60 V-14 H430Z" fill="#FFD233" stroke="#2A1A10" strokeWidth={2} />
        </Tappable>
      </g>
    </g>
  );
}

export default function WaitForTheTrain({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // To the big station in Dire Dawa to meet Grandma Halima. t-r-ai-n!
    case 0:
      return (
        <g>
          <Station id={id} board={["DIRE DAWA", "Train from Djibouti"]}>
            <Snail x={330} y={200} />
            <HiWord x={110} y={150} word="train" hi={at("train", "ai")} pic="train" color={AI} delay={1.4} size={20} />
            <Hooyo x={300} flip />
            <Ayan x={180} mood="joy" />
            <Abdi x={110} mood="joy" />
          </Station>
          <Air kind="day" seed={2} grass={false} />
        </g>
      );
    // "The train is late. Please wait." "I don't WANT to wait!"
    case 1:
      return (
        <g>
          <Station id={id} board={["The train is late.", "Please wait."]}>
            <Snail x={330} y={200} at={0.05} />
            <HiWord x={300} y={160} word="wait" hi={at("wait", "ai")} color={AI} delay={1.4} size={22} />
            <Abdi x={130} mood="worried" className="wft-stamp" />
            <SayBubble x={130} y={180} lines={["I don't WANT", "to wait!"]} size={12} tail="down" delay={1.8} />
            <Ayan x={220} mood="happy" />
          </Station>
          <Air kind="day" seed={3} grass={false} />
        </g>
      );
    // Pitter-patter… RAIN! Under the big roof, on the bench.
    case 2:
      return (
        <g>
          <Station id={id} rain board={["The train is late.", "Please wait."]}>
            <Snail x={330} y={200} at={0.1} />
            <Bench x={200} y={262} />
            <HiWord x={110} y={160} word="rain" hi={at("rain", "ai")} pic="rain" color={AI} delay={1} size={20} />
            <Hooyo x={280} y={262} s={0.42} flip />
            <Ayan x={200} y={262} s={0.4} mood="wow" />
            <Abdi x={140} y={264} s={0.34} mood="wow" />
          </Station>
        </g>
      );
    // Abdi wriggles, kicks, asks ten times, and cries. How can they help him wait?
    case 3:
      return (
        <g>
          <Station id={id} rain board={["The train is late.", "Please wait."]}>
            <Snail x={330} y={200} at={0.15} />
            <Bench x={200} y={262} />
            <Hooyo x={290} y={262} s={0.42} mood="worried" flip />
            <Abdi x={160} y={264} s={0.36} mood="worried" className="wft-wriggle" />
            <SayBubble x={120} y={160} lines={["Is it here yet?"]} size={12} tail="down" delay={0.6} />
            <g transform="translate(176 218)">
              <path d="M0 0 q-3 8 0 10 q3 -2 0 -10Z" fill="#7FC8F0" className="wft-tear" />
            </g>
            <Ayan x={220} y={262} s={0.4} mood="worried" />
            <Sign x={230} y={150} kind="?" delay={1.6} />
          </Station>
        </g>
      );
    // Ayan's idea: the ai game! "It is very slow, and it has a shell." "A SNAIL!"
    case 4:
      return (
        <g>
          <Station id={id} rain>
            <Snail x={330} y={200} at={0.2} crawl />
            <g transform="translate(330 160)">
              <circle r={26} fill="none" stroke="#F5B21E" strokeWidth={3} strokeDasharray="5 4" className="lali-spin" style={vars({ "--dur": "8s" })} />
            </g>
            <Bench x={200} y={262} />
            <Ayan x={200} y={262} s={0.4} mood="joy" />
            <Abdi x={140} y={264} s={0.36} mood="wow" />
            <Sign x={220} y={160} kind="!" delay={0.4} color="#F5B21E" />
            <SayBubble x={150} y={110} lines={["A SNAIL!"]} size={18} tail="down" delay={1.6} color={AI} />
          </Station>
        </g>
      );
    // s-n-ai-l, snail! "I spy… a pail!"
    case 5:
      return (
        <g>
          <Station id={id} rain>
            <Snail x={330} y={200} at={0.3} crawl />
            <Bench x={170} y={262} />
            <g transform="translate(270 262)">
              <Thing id="pail" s={0.5} />
            </g>
            <HiWord x={110} y={90} word="snail" hi={at("snail", "ai")} pic="snail" color={AI} delay={0.6} size={18} />
            <HiWord x={230} y={90} word="pail" hi={at("pail", "ai")} pic="pail" color={AI} delay={1.4} size={18} />
            <Abdi x={150} y={264} s={0.36} mood="joy" className="wft-bounce" />
            <Ayan x={210} y={262} s={0.4} mood="joy" />
          </Station>
        </g>
      );
    // "I spy… paint!" The yellow doors. "I spy… a nail!"
    case 6:
      return (
        <g>
          <Station id={id} rain>
            <Doors x={290} y={214} />
            <Snail x={330} y={200} at={0.42} crawl />
            <Bench x={150} y={262} />
            <g transform="translate(96 236) rotate(20)">
              <path d="M0 -10 V8" stroke="#7A7686" strokeWidth={3} strokeLinecap="round" />
              <path d="M-4 -10 H4" stroke="#7A7686" strokeWidth={3} strokeLinecap="round" />
            </g>
            <HiWord x={110} y={90} word="paint" hi={at("paint", "ai")} pic="paint" color={AI} delay={0.6} size={18} />
            <HiWord x={210} y={90} word="nail" hi={at("nail", "ai")} color={AI} delay={1.4} size={18} />
            <Abdi x={130} y={264} s={0.36} mood="joy" className="wft-bounce" />
            <Ayan x={190} y={262} s={0.4} mood="joy" />
          </Station>
        </g>
      );
    // A drawing for Grandma: a long train, the rain and the snail. "Grandma's train".
    case 7:
      return (
        <g>
          <Station id={id} rain>
            <Snail x={330} y={200} at={0.55} crawl />
            <g transform="translate(200 120) rotate(-3)">
              <g className="lali-pop-in" style={vars({ "--delay": "0.4s" })}>
                <rect x={-90} y={-56} width={180} height={112} rx={4} fill="#FFFDF6" stroke="#D8C8A8" strokeWidth={2} />
                <text y={-34} fontSize={15} fontFamily="var(--font-andika), sans-serif" fontWeight={700} fill="#2A3A7A" textAnchor="middle">
                  Grandma&apos;s tr<tspan fill={AI}>ai</tspan>n
                </text>
                <g transform="translate(-20 18) scale(0.9)">
                  <Thing id="train" />
                </g>
                <g transform="translate(56 18) scale(0.35)">
                  <Thing id="snail" />
                </g>
                {[-60, -30, 30, 60].map((dx) => (
                  <path key={dx} d={`M${dx} -18 l-4 8`} stroke="#5BB8E8" strokeWidth={2} strokeLinecap="round" />
                ))}
              </g>
            </g>
            <Bench x={200} y={262} />
            <Abdi x={150} y={264} s={0.36} mood="joy" />
            <Ayan x={230} y={262} s={0.4} mood="joy" />
          </Station>
        </g>
      );
    // HOOOONK! The train! The rain has stopped.
    case 8:
      return (
        <g>
          <Station id={id}>
            <Train arrive />
            <Snail x={330} y={200} at={0.75} />
            <text x={200} y={100} fontSize={26} fontFamily={FONT} fontWeight={900} fill="#E8413B" textAnchor="middle" className="lali-pop-in" style={vars({ "--delay": "0.4s" })}>
              HOOOONK!
            </text>
            <Abdi x={130} mood="joy" className="wft-jump" />
            <Ayan x={210} mood="joy" />
            <Hooyo x={300} mood="joy" flip />
          </Station>
          <Air kind="day" seed={9} grass={false} />
        </g>
      );
    // Grandma Halima steps down. "We waited and waited, but we played the ai game!"
    case 9:
      return (
        <g>
          <Station id={id}>
            <Train />
            <Snail x={330} y={200} at={0.85} />
            <Place x={290} y={294} s={0.48} flip tap={TAP.grandma}>
              <Camel who="halima" mood="joy" />
            </Place>
            <Abdi x={150} mood="joy" />
            <g transform="translate(206 216) rotate(-8)">
              <g className="lali-pop-in" style={vars({ "--delay": "1s" })}>
                <rect x={-22} y={-16} width={44} height={32} rx={2} fill="#FFFDF6" stroke="#D8C8A8" strokeWidth={1.4} />
                <g transform="scale(0.36)">
                  <Thing id="train" />
                </g>
              </g>
            </g>
            <SayBubble x={170} y={110} lines={["We played", "the ai game!"]} size={13} tail="down" delay={1.6} color={AI} />
            <Hearts spots={[[250, 170, 2], [266, 156, 2.4]]} />
          </Station>
          <Air kind="day" seed={10} grass={false} />
        </g>
      );
    // "Did the snail wait for the train too?" It has just reached the top!
    case 10:
      return (
        <g>
          <Station id={id}>
            <Snail x={330} y={200} at={1} />
            <Sparkles x={330} y={78} r={26} delay={0.6} n={6} />
            <Place x={290} y={294} s={0.46} flip tap={TAP.grandma}>
              <Camel who="halima" mood="joy" />
            </Place>
            <Hooyo x={220} y={294} s={0.42} mood="joy" />
            <Ayan x={150} mood="joy" />
            <Abdi x={90} mood="joy" className="wft-bounce" />
            <SayBubble x={240} y={110} lines={["Did the snail", "wait too?"]} size={13} tail="down" delay={0.8} />
          </Station>
          <Air kind="day" seed={11} grass={false} />
        </g>
      );
    // a and i say ay.
    default:
      return (
        <g>
          <Station id={id}>
            {["train", "rain", "snail", "pail", "paint"].map((w, i) => (
              <HiWord key={w} x={80 + i * 60} y={150} word={w} hi={at(w, "ai")} pic={w} color={AI} delay={0.3 + i * 0.25} size={14} w={56} />
            ))}
            <Abdi x={150} mood="joy" />
            <Ayan x={240} mood="joy" flip />
          </Station>
          <Air kind="day" seed={12} grass={false} />
        </g>
      );
  }
}
