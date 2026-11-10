"use client";

import "./rhyme-show.css";

import { useId } from "react";

import { Air, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Cat, Cub, FONT, Gugu, Ibex, OnHead, TAP, Teacher, Wolf } from "./cast";
import { Board, Club, FigTree, Yard } from "./places";
import { Hearts, SayBubble, Sign, Sparkles, WordCard } from "./props";
import { Thing } from "./things";

/*
  "Gugu's Rhyme Show": one living picture per page (12 pages), under the big fig tree and at the
  English Club show. A word family is drawn by <Family>: the ending (‘at’, ‘ig’) stays put in
  its colour while the first letter in front of it changes, one after another ("keep the end,
  change the start"), and the words appear underneath. Dimmet the cat gets Grandma's hat; Gugu
  gets an orange wig.
  Keyframes: ./kit.css (efw-*) and ./rhyme-show.css (rs-*).
*/

const PURPLE = "#8E5BE0";
const ANDIKA = "var(--font-andika), sans-serif";

/** A word family: the starts take turns in front of the ending, which stays. */
function Family({ x, y, end, starts, color = PURPLE, s = 1 }: { x: number; y: number; end: string; starts: string[]; color?: string; s?: number }) {
  const n = starts.length;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="chime">
        <rect x={-74} y={-34} width={148} height={60} rx={14} fill="#FFFDF6" stroke={color} strokeWidth={3} />
        <rect x={-62} y={-26} width={44} height={44} rx={9} fill="#F3EBDD" />
        {starts.map((l, i) => (
          <text
            key={l}
            x={-40}
            y={10}
            fontSize={34}
            fontFamily={ANDIKA}
            fontWeight={700}
            fill="#2A1A10"
            textAnchor="middle"
            className="rs-cycle"
            style={vars({ "--n": n, "--dur": `${n * 1.2}s`, "--delay": `${i * 1.2}s` })}
          >
            {l}
          </text>
        ))}
        <text x={18} y={10} fontSize={34} fontFamily={ANDIKA} fontWeight={700} fill={color} textAnchor="middle">
          {end}
        </text>
      </Tappable>
    </g>
  );
}

/** Dimmet the cat (feet at 0, 0), optionally in Grandma's hat. */
function Dimmet({ x, y, hat = false, sleep = false, s = 1 }: { x: number; y: number; hat?: boolean; sleep?: boolean; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="spin" sound="pop">
        <Cat sleep={sleep} />
        {hat && (
          <g transform="translate(0 -62)">
            <Thing id="hat" s={0.5} />
          </g>
        )}
      </Tappable>
    </g>
  );
}

/** Gugu's orange wig, on his head. */
function Wig() {
  return (
    <OnHead>
      <g transform="translate(100 46) scale(1.3)">
        <Thing id="wig" />
      </g>
    </OnHead>
  );
}

const Haben = ({ x, y = 294, s = 0.44, mood = "happy" as "happy" | "joy" | "wow", pose = "sit" as "sit" | "wave" | "point", flip = false }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.haben}>
    <Ibex mood={mood} pose={pose} />
  </Place>
);

export default function RhymeShow({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // "Tomorrow is our Rhyme Show! Like moon and spoon."
    case 0:
      return (
        <g>
          <Club id={id} time="day">
            <Board x={300} y={92} lines={["Rhyme Show!", "moon · spoon"]} size={15} w={140} />
            <Place x={350} y={292} s={0.44} flip tap={TAP.mama}>
              <Teacher mood="joy" pose="wave" />
            </Place>
            <Place x={160} y={292} s={0.36} tap={TAP.gugu}>
              <Gugu mood="joy" />
            </Place>
            <Haben x={220} s={0.36} />
            <Place x={110} y={290} s={0.32} tap={TAP.cub}>
              <Cub mood="happy" />
            </Place>
          </Club>
          <Air kind="day" seed={2} />
        </g>
      );
    // Under the fig tree with Dimmet. "Let's start with cat!"
    case 1:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <FigTree x={200} y={246} s={1.3} />
            <Dimmet x={200} y={262} sleep />
            <Place x={120} y={294} s={0.44} tap={TAP.gugu}>
              <Gugu mood="joy" pose="point" />
            </Place>
            <Haben x={290} s={0.44} flip />
            <WordCard x={200} y={170} word="cat" pic="cat" color={PURPLE} size={15} delay={1} />
          </Yard>
          <Air kind="day" seed={3} />
        </g>
      );
    // "Cat… banana! Cat… elephant!" No rhyme!
    case 2:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <FigTree x={300} y={246} s={1.1} />
            <Place x={130} y={294} s={0.48} tap={TAP.gugu}>
              <Gugu mood="happy" pose="wave" />
            </Place>
            <Haben x={250} s={0.44} mood="happy" flip />
            <WordCard x={90} y={80} word="cat" pic="cat" color={PURPLE} size={13} delay={0.4} />
            <WordCard x={190} y={80} word="banana" pic="banana" color="#9A8A70" size={13} delay={1} />
            <WordCard x={300} y={80} word="elephant" pic="elephant" color="#9A8A70" size={12} delay={1.8} />
            <Sign x={250} y={160} kind="?" delay={2.4} />
          </Yard>
          <Air kind="day" seed={4} />
        </g>
      );
    // Haben listens to the end: c… AT!
    case 3:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <g transform="translate(200 110)">
              <g className="lali-pop-in" style={vars({ "--delay": "0.4s" })}>
                <rect x={-80} y={-40} width={160} height={70} rx={14} fill="#FFFDF6" stroke={PURPLE} strokeWidth={3} />
                <text x={-34} y={14} fontSize={44} fontFamily={ANDIKA} fontWeight={700} fill="#9A8A70" textAnchor="middle">
                  c
                </text>
                <text x={22} y={14} fontSize={44} fontFamily={ANDIKA} fontWeight={700} fill={PURPLE} textAnchor="middle" className="rs-glow">
                  at
                </text>
              </g>
            </g>
            <Haben x={200} y={296} s={0.56} mood="wow" />
            <Sign x={260} y={196} kind="!" delay={1.6} color="#F5B21E" />
          </Yard>
          <Air kind="day" seed={5} />
        </g>
      );
    // Keep the end, change the start! hat, mat, sat.
    case 4:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Family x={200} y={84} end="at" starts={["c", "h", "m", "s"]} />
            <WordCard x={90} y={170} word="hat" pic="hat" color={PURPLE} size={13} delay={0.8} />
            <WordCard x={200} y={170} word="mat" pic="mat" color={PURPLE} size={13} delay={1.6} />
            <WordCard x={310} y={170} word="sat" color={PURPLE} size={15} delay={2.4} />
            <Haben x={150} y={296} s={0.4} mood="joy" pose="wave" />
            <Place x={250} y={296} s={0.4} className="lali-hop" tap={TAP.gugu}>
              <Gugu mood="joy" />
            </Place>
          </Yard>
          <Air kind="day" seed={6} />
        </g>
      );
    // "The cat in a hat sat on a mat!"
    case 5:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <FigTree x={320} y={246} s={1.1} />
            <g transform="translate(200 280)">
              <Thing id="mat" s={1.3} />
            </g>
            <Dimmet x={200} y={274} hat s={1.3} />
            <SayBubble x={200} y={86} lines={["The cat in a hat", "sat on a mat!"]} size={15} tail="down" delay={0.8} color={PURPLE} />
            <Haben x={90} s={0.42} mood="joy" />
            <Sparkles x={200} y={220} r={50} delay={1.6} n={6} />
          </Yard>
          <Air kind="day" seed={7} />
        </g>
      );
    // Plop! A fig on Gugu's head.
    case 6:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <FigTree x={200} y={246} s={1.4} />
            <Place x={200} y={296} s={0.52} tap={TAP.gugu}>
              <Gugu mood="wow" />
            </Place>
            <g transform="translate(200 130)">
              <g className="rs-plop">
                <Thing id="fig" s={0.4} />
              </g>
            </g>
            <WordCard x={320} y={100} word="fig" pic="fig" color={PURPLE} size={16} delay={1.6} />
          </Yard>
          <Air kind="day" seed={8} />
        </g>
      );
    // f-ig, b-ig, d-ig, w-ig, j-ig!
    case 7:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Family x={200} y={84} end="ig" starts={["f", "b", "d", "w", "j"]} color="#2E9A5B" />
            {["big", "dig", "wig", "jig"].map((w, i) => (
              <WordCard key={w} x={70 + i * 86} y={170} word={w} pic={w === "wig" ? "wig" : undefined} color="#2E9A5B" size={14} delay={0.8 + i * 0.6} />
            ))}
            <Place x={200} y={298} s={0.42} tap={TAP.gugu}>
              <Gugu mood="joy" pose="point" />
            </Place>
          </Yard>
          <Air kind="day" seed={9} />
        </g>
      );
    // A jig: a happy, jumpy dance round the big fig tree.
    case 8:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <FigTree x={200} y={246} s={1.3} />
            <g className="rs-round">
              <Place x={200} y={294} s={0.42} className="lali-hop" tap={TAP.gugu}>
                <Gugu mood="joy" pose="wave" />
              </Place>
            </g>
            <Haben x={320} s={0.42} mood="joy" flip />
            <WordCard x={90} y={90} word="jig" color="#2E9A5B" size={20} delay={0.8} />
          </Yard>
          <Air kind="day" seed={10} />
        </g>
      );
    // The Rhyme Show: the cat in a hat sat on a mat. Clap, clap!
    case 9:
      return (
        <g>
          <Club id={id} time="day">
            <g transform="translate(240 284)">
              <Thing id="mat" s={1.2} />
            </g>
            <Dimmet x={240} y={278} hat s={1.2} />
            <Haben x={160} s={0.46} mood="joy" pose="wave" />
            <Place x={330} y={292} s={0.34} flip tap={TAP.cub}>
              <Cub mood="joy" arm="up" />
            </Place>
            <SayBubble x={190} y={110} lines={["The cat in a hat", "sat on a mat!"]} size={14} tail="down" delay={0.6} color={PURPLE} />
            <Hearts spots={[[300, 200, 1.4], [316, 186, 2]]} />
          </Club>
          <Air kind="day" seed={11} />
        </g>
      );
    // Gugu in a big orange wig: "I put on a wig and I dance a jig!"
    case 10:
      return (
        <g>
          <Club id={id} time="day">
            <Place x={220} y={296} s={0.52} className="lali-hop" tap={TAP.gugu}>
              <Gugu mood="joy" pose="wave" />
              <Wig />
            </Place>
            <g transform="translate(120 250)">
              <Thing id="fig" s={0.7} />
            </g>
            <Place x={330} y={292} s={0.34} flip tap={TAP.hawi}>
              <Wolf mood="joy" wag />
            </Place>
            <SayBubble x={230} y={86} lines={["A big fig! Dig, dig!", "I put on a wig", "and I dance a jig!"]} size={12} tail="down" delay={0.6} color="#2E9A5B" />
            <Sparkles x={220} y={220} r={70} delay={1.6} n={8} />
          </Club>
          <Air kind="day" seed={12} />
        </g>
      );
    // Cat, hat, mat, sat. Fig, big, dig, wig, jig.
    default:
      return (
        <g>
          <Yard id={id} time="evening" tree fig={330}>
            <Family x={110} y={80} end="at" starts={["c", "h", "m", "s"]} s={0.9} />
            <Family x={290} y={80} end="ig" starts={["f", "b", "d", "w", "j"]} color="#2E9A5B" s={0.9} />
            <g transform="translate(110 150)">
              <text fontSize={13} fontFamily={FONT} fontWeight={800} fill="#FFFDF6" textAnchor="middle">
                cat · hat · mat · sat
              </text>
            </g>
            <g transform="translate(290 150)">
              <text fontSize={13} fontFamily={FONT} fontWeight={800} fill="#FFFDF6" textAnchor="middle">
                fig · big · dig · wig · jig
              </text>
            </g>
            <Place x={160} y={294} s={0.4} tap={TAP.gugu}>
              <Gugu mood="joy" />
              <Wig />
            </Place>
            <Haben x={230} s={0.4} mood="joy" />
            <Dimmet x={290} y={276} hat />
          </Yard>
          <Air kind="dusk" seed={13} />
        </g>
      );
  }
}
