"use client";

import "./tsehays-tricky-notes.css";

import { useId } from "react";

import { Air, Place, Tukul, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Cub, FONT, Grandma, Gugu, Mama, Papa, TAP, Teacher, Tsehay } from "./cast";
import { Paper } from "./more";
import { Fence, FigTree, Yard } from "./places";
import { Hearts, SayBubble, Sign, Sparkles, Speech, Tick } from "./props";

/*
  "The Tricky Notes": one living picture per page (12 pages). Tsehay follows the notes round the
  yard (the door, the fig tree, the gate, Dawit's red ball, the back door) to her birthday
  surprise. Each tricky word is learned with the five steps, drawn as five little cards (an eye,
  a mouth, a hand, a pencil and a tick), and written in the dust with a stick.
  Keyframes: ./kit.css, ./more.css and ./tsehays-tricky-notes.css (ttn-*).
*/

const PURPLE = "#8E5BE0";
const DUST = "#8A5A2E";

type M = "happy" | "joy" | "wow" | "worried" | "sad";
const TsehayAt = ({ x, y = 294, s = 0.44, mood = "happy" as M, pose = "sit" as "sit" | "wave" | "point" | "hop" | "no", flip = false }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.tsehay}>
    <Tsehay mood={mood} pose={pose} />
  </Place>
);
const GuguAt = ({ x, y = 296, s = 0.4, mood = "happy" as M, pose = "sit" as "sit" | "wave" | "point" | "hop" | "no", flip = false, className }: { x: number; y?: number; s?: number; mood?: M; pose?: "sit" | "wave" | "point" | "hop" | "no"; flip?: boolean; className?: string }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.gugu} className={className}>
    <Gugu mood={mood} pose={pose} />
  </Place>
);

/** The five steps: Look, say, cover, write, check, as five little cards in a row. */
function Steps({ x, y, s = 1, delay = 0.6, step = 0.4 }: { x: number; y: number; s?: number; delay?: number; step?: number }) {
  const icons = [
    // an eye
    <g key="look">
      <path d="M-12 0 Q0 -10 12 0 Q0 10 -12 0Z" fill="#FFFDF6" stroke="#2A1A10" strokeWidth={1.6} />
      <circle r={4} fill="#2A1A10" />
    </g>,
    // a mouth saying it
    <g key="say">
      <path d="M-10 -2 Q0 -6 10 -2 Q0 10 -10 -2Z" fill="#8A2F1E" />
      <path d="M12 -6 q4 6 0 12" stroke="#2F6FD0" strokeWidth={1.6} fill="none" />
    </g>,
    // a hand covering
    <g key="cover">
      <path d="M-8 8 V-6 Q-8 -9 -5 -9 Q-2 -9 -2 -6 V-10 Q-2 -13 1 -13 Q4 -13 4 -10 V-6 Q4 -9 7 -9 Q10 -9 10 -6 V6 Q10 12 2 12 H-2 Q-8 12 -8 8Z" fill="#C88A5A" stroke="#2A1A10" strokeWidth={1.2} />
    </g>,
    // a pencil writing
    <g key="write" transform="rotate(40)">
      <rect x={-3} y={-12} width={6} height={18} fill="#F5B21E" stroke="#2A1A10" strokeWidth={1.2} />
      <path d="M-3 6 L0 12 L3 6Z" fill="#E3B07A" stroke="#2A1A10" strokeWidth={1.2} />
    </g>,
    // a tick
    <path key="check" d="M-8 0 L-2 7 L9 -7" stroke="#2FA35A" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />,
  ];
  const words = ["Look", "say", "cover", "write", "check"];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {words.map((w, i) => (
        <g key={w} transform={`translate(${(i - 2) * 56} 0)`}>
          <g className="lali-pop-in" style={vars({ "--delay": `${delay + i * step}s` })}>
            <Tappable reaction="bounce" sound="chime">
              <rect x={-25} y={-26} width={50} height={52} rx={9} fill="#FFFDF6" stroke={PURPLE} strokeWidth={2.4} />
              <g transform="translate(0 -6)">{icons[i]}</g>
              <text y={20} fontSize={11} fontFamily={FONT} fontWeight={800} fill={PURPLE} textAnchor="middle">
                {w}
              </text>
            </Tappable>
          </g>
        </g>
      ))}
    </g>
  );
}

/** A word written in the dust with a stick, letter by letter. */
function Dust({ x, y, word, delay = 0.8, size = 26 }: { x: number; y: number; word: string; delay?: number; size?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse rx={word.length * size * 0.42 + 14} ry={size * 0.6} fill="#E8C08A" opacity={0.8} />
      <text y={size * 0.34} fontSize={size} fontFamily="var(--font-andika), sans-serif" fontWeight={700} fill={DUST} textAnchor="middle">
        {word.split("").map((ch, i) => (
          <tspan key={i} className="enr-word-in" style={vars({ "--delay": `${delay + i * 0.35}s` })}>
            {ch}
          </tspan>
        ))}
      </text>
      <g transform={`translate(${word.length * size * 0.3} ${-size * 0.4})`}>
        <g className="ttn-scribble" style={vars({ "--delay": `${delay}s` })}>
          <path d="M0 0 L22 -40" stroke="#7A5236" strokeWidth={4} strokeLinecap="round" />
        </g>
      </g>
    </g>
  );
}

/** Tsehay's ring of word cards from school. */
function Ring({ x, y, word }: { x: number; y: number; word: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx={0} cy={-30} r={8} fill="none" stroke="#9AA0A6" strokeWidth={3} />
      {[-14, 10].map((r, i) => (
        <g key={r} transform={`rotate(${r} 0 -30)`}>
          <rect x={-22} y={-24} width={44} height={30} rx={5} fill={i ? "#FFFDF6" : "#EADCF8"} stroke={PURPLE} strokeWidth={1.6} />
        </g>
      ))}
      <g className="lali-pop-in" style={vars({ "--delay": "0.6s" })}>
        <rect x={-30} y={-22} width={60} height={36} rx={6} fill="#FFFDF6" stroke={PURPLE} strokeWidth={2.4} />
        <text y={4} fontSize={18} fontFamily="var(--font-andika), sans-serif" fontWeight={700} fill={PURPLE} textAnchor="middle">
          {word}
        </text>
      </g>
    </g>
  );
}

/** The well, with a stone rim. */
const Well = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse cy={-30} rx={34} ry={9} fill="#5A6A7A" />
    <path d="M-34 -30 V0 Q0 10 34 0 V-30" fill="#9C98A6" stroke="#2A1A10" strokeWidth={1.6} />
    <path d="M-34 -18 Q0 -10 34 -18" stroke="#7A7686" strokeWidth={2} fill="none" />
    <ellipse cy={-30} rx={34} ry={9} fill="none" stroke="#2A1A10" strokeWidth={1.6} />
  </g>
);

export default function TsehaysTrickyNotes({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Nobody home, but on the door there is a note.
    case 0:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Tukul x={250} y={262} s={2.2} smoke={false} />
            <Paper x={250} y={222} lines={["Come to", "the tree."]} size={9} delay={1} pin />
            <TsehayAt x={110} mood="wow" />
            <Sign x={140} y={170} kind="?" delay={1.6} />
          </Yard>
          <Air kind="day" seed={2} />
        </g>
      );
    // "c-o-m-e… comb?" Gugu hops over the wall: "What does it SAY?"
    case 1:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Paper x={200} y={80} lines={["Come to the tree."]} size={18} delay={0.2} />
            <SayBubble x={110} y={160} lines={["c-o-m-e… comb?"]} size={14} tail="down" delay={1} />
            <TsehayAt x={110} mood="worried" />
            <GuguAt x={290} mood="wow" pose="hop" className="ttn-hop" flip />
            <SayBubble x={290} y={170} lines={["What does it SAY?"]} size={12} tail="down" delay={2} />
          </Yard>
          <Air kind="day" seed={3} />
        </g>
      );
    // Teacher Meron's way: Look, say, cover, write, check!
    case 2:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Speech x={200} y={78} w={300} h={90} think delay={0.3}>
              <Steps x={0} y={0} s={0.95} delay={0.8} />
            </Speech>
            <TsehayAt x={110} mood="happy" />
            <Place x={290} y={292} s={0.36} flip tap={TAP.mama}>
              <g opacity={0.9}>
                <Teacher mood="joy" pose="point" />
              </g>
            </Place>
          </Yard>
          <Air kind="day" seed={4} />
        </g>
      );
    // She finds "come" on her ring of cards, and writes it in the dust.
    case 3:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Ring x={110} y={110} word="come" />
            <Steps x={250} y={70} s={0.6} delay={0.6} step={0.3} />
            <Dust x={240} y={250} word="come" delay={1.6} />
            <Tick x={300} y={226} delay={3.6} />
            <TsehayAt x={110} mood="joy" />
          </Yard>
          <Air kind="day" seed={5} />
        </g>
      );
    // Note two, on the fig tree: "Do you see the gate? Go to the gate."
    case 4:
      return (
        <g>
          <Yard id={id} time="day" house={false} tree fig={250}>
            <Paper x={250} y={150} lines={["Do you see the gate?", "Go to the gate."]} size={11} delay={0.6} pin />
            <TsehayAt x={110} mood="happy" pose="point" />
            <GuguAt x={330} mood="joy" flip />
            <SayBubble x={120} y={150} lines={["Do says doo!"]} size={13} tail="down" delay={1.8} color={PURPLE} />
          </Yard>
          <Air kind="day" seed={6} />
        </g>
      );
    // At the gate: "Dawit was here. He had a red ball."
    case 5:
      return (
        <g>
          <Yard id={id} time="day">
            <Fence y={250} from={-10} to={260} gate={200} />
            <Paper x={200} y={110} lines={["Dawit was here.", "He had a red ball."]} size={13} delay={0.4} pin />
            <Well x={310} y={280} />
            <g transform="translate(276 280)">
              <g className="lali-pop-in" style={vars({ "--delay": "1.4s" })}>
                <circle r={11} fill="#E8413B" stroke="#2A1A10" strokeWidth={1.6} />
                <path d="M-8 -4 Q0 2 8 -4" stroke="#FFFDF6" strokeWidth={2} fill="none" />
              </g>
            </g>
            <TsehayAt x={110} mood="happy" />
            <GuguAt x={225} mood="wow" pose="point" />
          </Yard>
          <Air kind="day" seed={7} />
        </g>
      );
    // Under the ball: "They said you can do it!" "Who are THEY?"
    case 6:
      return (
        <g>
          <Yard id={id} time="day">
            <Well x={300} y={280} />
            <Paper x={200} y={90} lines={["They said", "you can do it!"]} size={16} delay={0.4} pin />
            <TsehayAt x={110} mood="joy" />
            <GuguAt x={210} mood="worried" pose="no" />
            <SayBubble x={240} y={170} lines={["Who are THEY?"]} size={13} tail="down" delay={1.6} />
            <Sign x={250} y={210} kind="?" delay={2.2} />
          </Yard>
          <Air kind="day" seed={8} />
        </g>
      );
    // On the back door: "We have a surprise for you. Come here!"
    case 7:
      return (
        <g>
          <Yard id={id} time="evening" house={false}>
            <Tukul x={280} y={262} s={2.2} smoke={false} glow />
            <Paper x={200} y={90} lines={["We have a surprise", "for you. Come here!"]} size={14} delay={0.4} pin />
            <TsehayAt x={110} mood="wow" />
            <GuguAt x={170} mood="wow" />
            <Sparkles x={280} y={230} r={40} delay={1.4} n={6} />
          </Yard>
          <Air kind="dusk" seed={9} />
        </g>
      );
    // SURPRISE! Happy birthday, Tsehay!
    case 8:
      return (
        <g>
          <Yard id={id} time="evening">
            <g transform="translate(200 50)">
              {["#E8413B", "#FFD233", "#2E9A5B", "#2F6FD0", "#8E5BE0", "#F08A24", "#E8413B"].map((c, i) => (
                <path key={i} d={`M${-120 + i * 36} 0 l12 18 l12 -18Z`} fill={c} className="lali-pop-in" style={vars({ "--delay": `${0.2 + i * 0.1}s` })} />
              ))}
              <path d="M-130 -2 Q0 12 130 -2" stroke="#7A5236" strokeWidth={1.4} fill="none" />
            </g>
            <text x={200} y={100} fontSize={24} fontFamily={FONT} fontWeight={900} fill="#FFFDF6" stroke="#8E5BE0" strokeWidth={1} textAnchor="middle" className="lali-pop-in" style={vars({ "--delay": "0.4s" })}>
              SURPRISE!
            </text>
            <Place x={92} y={292} s={0.4} tap={TAP.mama}>
              <Mama mood="joy" baby="awake" />
            </Place>
            <Place x={316} y={290} s={0.42} flip tap={TAP.papa}>
              <Papa mood="joy" pose="wave" />
            </Place>
            <Place x={262} y={298} s={0.36} flip tap={TAP.grandma}>
              <Grandma arm="clap" mood="joy" />
            </Place>
            <g transform="translate(200 236)">
              <ellipse rx={40} ry={12} fill="#D9A45A" stroke="#2A1A10" strokeWidth={1.6} />
              <path d="M-36 -2 Q0 -26 36 -2" fill="#E8B86A" stroke="#2A1A10" strokeWidth={1.6} />
              <rect x={-3} y={-34} width={6} height={18} fill="#FFFDF6" stroke="#2A1A10" strokeWidth={1} />
              <path d="M0 -36 q-4 -6 0 -12 q4 6 0 12Z" fill="#FFB020" className="lali-flicker" />
            </g>
            <TsehayAt x={150} y={298} s={0.4} mood="joy" pose="wave" />
            <Sparkles x={200} y={150} r={90} delay={0.6} n={8} />
          </Yard>
          <Air kind="dusk" seed={10} />
        </g>
      );
    // "We used the trickiest words we could find. We knew you could read them!"
    case 9:
      return (
        <g>
          <Yard id={id} time="evening">
            <Place x={290} y={292} s={0.46} flip tap={TAP.mama}>
              <Mama mood="joy" baby="sleep" />
            </Place>
            <SayBubble x={250} y={110} lines={["We knew you", "could read them!"]} size={14} tail="down" delay={0.6} />
            {["come", "do", "was", "said", "have"].map((w, i) => (
              <g key={w} transform={`translate(${80 + i * 34} ${64 + (i % 2) * 18}) rotate(${(i - 2) * 6})`}>
                <g className="lali-pop-in" style={vars({ "--delay": `${1 + i * 0.2}s` })}>
                  <rect x={-18} y={-12} width={36} height={22} rx={3} fill="#FFFDF6" stroke="#D8C8A8" />
                  <text y={4} fontSize={10} fontFamily="var(--font-andika), sans-serif" fontWeight={700} fill={PURPLE} textAnchor="middle">
                    {w}
                  </text>
                </g>
              </g>
            ))}
            <TsehayAt x={150} mood="joy" />
            <Hearts spots={[[200, 190, 1.6], [216, 176, 2]]} />
          </Yard>
          <Air kind="dusk" seed={11} />
        </g>
      );
    // Even Grandma writes "said" in the dust. "She did it! We ALL did it!"
    case 10:
      return (
        <g>
          <Yard id={id} time="evening">
            <Dust x={200} y={262} word="said" delay={0.8} />
            <Place x={316} y={292} s={0.42} flip tap={TAP.grandma}>
              <Grandma arm="hold" mood="joy" />
            </Place>
            <Place x={76} y={298} s={0.32} tap={TAP.cub}>
              <Cub mood="joy" />
            </Place>
            <TsehayAt x={136} mood="joy" pose="point" />
            <GuguAt x={258} y={298} s={0.3} mood="joy" pose="wave" flip />
            <SayBubble x={200} y={90} lines={["She did it!", "We ALL did it!"]} size={14} tail="down" delay={2} />
          </Yard>
          <Air kind="dusk" seed={12} />
        </g>
      );
    // The twelve tricky words.
    default:
      return (
        <g>
          <Yard id={id} time="night" house={false} tree fig={340}>
            {["he", "she", "we", "you", "they", "was", "said", "have", "do", "to", "come", "here"].map((w, i) => (
              <g key={w} transform={`translate(${92 + (i % 4) * 72} ${50 + Math.floor(i / 4) * 44})`}>
                <g className="lali-pop-in" style={vars({ "--delay": `${0.3 + i * 0.12}s` })}>
                  <Tappable reaction="wiggle" sound="chime">
                    <rect x={-30} y={-16} width={60} height={32} rx={8} fill="#FFFDF6" stroke={PURPLE} strokeWidth={2.4} />
                    <text y={6} fontSize={17} fontFamily="var(--font-andika), sans-serif" fontWeight={700} fill="#2A1A10" textAnchor="middle">
                      {w}
                    </text>
                  </Tappable>
                </g>
              </g>
            ))}
            <TsehayAt x={150} y={296} s={0.38} mood="joy" pose="wave" />
            <GuguAt x={240} y={298} s={0.34} mood="joy" flip />
          </Yard>
          <Air kind="night" seed={13} />
        </g>
      );
  }
}
