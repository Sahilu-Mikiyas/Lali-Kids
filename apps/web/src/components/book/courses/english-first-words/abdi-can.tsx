"use client";

import "./abdi-can.css";

import { useId } from "react";

import { Glow } from "../../glow";
import { Air, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Camel, FONT, Gugu, TAP } from "./cast";
import { Home, Yard } from "./places";
import { Hearts, Notes, SentenceCard, Sign, Sparkles, Speech, Zzz } from "./props";
import { Thing } from "./things";

/*
  "I Can!": one living picture per page (12 pages). Abdi, Ayan's little brother (a camel calf in
  a white cap), does one thing on each page while Ayan writes it down: the sentence "I can …"
  appears on a strip of paper, word by word. At night her pages become a little book with "I CAN!"
  on the cover, and Abdi reads the last page himself.
  Keyframes: ./kit.css (efw-*) and ./abdi-can.css (ac-*).
*/

const ORANGE = "#F08A24";

const Abdi = ({ x, y = 292, s = 0.42, mood = "happy" as "happy" | "joy" | "wow" | "worried" | "sad", walk = false, kneel = false, flip = false, className }: { x: number; y?: number; s?: number; mood?: "happy" | "joy" | "wow" | "worried" | "sad"; walk?: boolean; kneel?: boolean; flip?: boolean; className?: string }) => (
  <Place x={x} y={y} s={s} flip={flip} className={className} tap={TAP.ayan}>
    <Camel who="abdi" mood={mood} walk={walk} kneel={kneel} />
  </Place>
);

const Ayan = ({ x, y = 292, s = 0.48, mood = "happy" as "happy" | "joy" | "wow", flip = true }: { x: number; y?: number; s?: number; mood?: "happy" | "joy" | "wow"; flip?: boolean }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.ayan}>
    <Camel who="ayan" mood={mood} item={<Thing id="pencil" s={0.3} />} />
  </Place>
);

/** Ayan's little book: the cover with "I CAN!" and Abdi's smiling face. */
function CanBook({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="bounce" sound="chime">
        <rect x={-44} y={-56} width={88} height={112} rx={6} fill={ORANGE} />
        <rect x={-38} y={-50} width={76} height={100} rx={4} fill="#FFFDF6" />
        <text y={-24} fontSize={20} fontFamily={FONT} fontWeight={900} fill={ORANGE} textAnchor="middle">
          I CAN!
        </text>
        <circle cx={0} cy={14} r={20} fill="#E8C08A" />
        <circle cx={-7} cy={10} r={2.4} fill="#2A1A10" />
        <circle cx={7} cy={10} r={2.4} fill="#2A1A10" />
        <path d="M-7 20 Q0 26 7 20" stroke="#2A1A10" strokeWidth={2} fill="none" strokeLinecap="round" />
        <path d="M-14 -2 Q0 -12 14 -2" fill="#FFFFFF" />
      </Tappable>
    </g>
  );
}

export default function AbdiCan({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // "I can't climb, I can't read, I can't carry the water. I'm too little!"
    case 0:
      return (
        <g>
          <Yard id={id} time="evening" tree fig={320}>
            <Abdi x={150} y={290} s={0.5} kneel mood="sad" />
            <Speech x={250} y={110} w={150} h={64} think tail="left" delay={0.6}>
              {["book", "jug", "ladder"].map((p, i) => (
                <g key={p} transform={`translate(${-44 + i * 44} 0)`}>
                  <g transform="scale(0.32)">
                    <Thing id={p} />
                  </g>
                  <path d="M-12 -12 L12 12 M12 -12 L-12 12" stroke="#E2463F" strokeWidth={3} strokeLinecap="round" />
                </g>
              ))}
            </Speech>
          </Yard>
          <Air kind="dusk" seed={2} />
        </g>
      );
    // Ayan's idea: "I'll write down everything you CAN do."
    case 1:
      return (
        <g>
          <Yard id={id} time="evening" tree fig={330}>
            <Abdi x={130} y={290} s={0.46} kneel mood="wow" />
            <Ayan x={240} mood="joy" />
            <Sign x={240} y={140} kind="!" delay={0.8} color="#F5B21E" />
            <g transform="translate(300 252)">
              <Thing id="book" s={0.5} />
            </g>
          </Yard>
          <Air kind="dusk" seed={3} />
        </g>
      );
    // I can jump.
    case 2:
      return (
        <g>
          <Yard id={id} time="morning">
            <ellipse cx={200} cy={282} rx={50} ry={10} fill="#7FB8E0" />
            <Abdi x={200} y={278} s={0.44} className="ac-leap" mood="joy" />
            <Ayan x={330} s={0.4} />
            <SentenceCard x={200} y={80} text="I can jump." color={ORANGE} />
          </Yard>
          <Air kind="day" seed={4} />
        </g>
      );
    // I can run (and nearly beat Gugu!).
    case 3:
      return (
        <g>
          <Yard id={id} time="morning" house={false}>
            <path d="M330 230 V290 M380 230 V290 M330 246 H380" stroke="#7A5236" strokeWidth={5} />
            <Abdi x={250} s={0.42} walk mood="joy" />
            <Place x={290} y={294} s={0.4} from={[60, 294]} dur={1.6} delay={0.4} tap={TAP.gugu}>
              <Gugu mood="joy" pose="hop" />
            </Place>
            <SentenceCard x={200} y={80} text="I can run." color={ORANGE} />
          </Yard>
          <Air kind="day" seed={5} />
        </g>
      );
    // I can sing (while Hooyo cooks).
    case 4:
      return (
        <g>
          <Home id={id} time="day" wall={["#F2E2C4", "#E2C8A0"]}>
            <Place x={310} y={292} s={0.5} flip tap={TAP.mama}>
              <Camel who="hooyo" mood="joy" />
            </Place>
            <g transform="translate(220 260)">
              <Thing id="pot" s={0.5} />
            </g>
            <Abdi x={110} s={0.44} mood="joy" />
            <Notes x={150} y={190} color={ORANGE} />
            <SentenceCard x={200} y={80} text="I can sing." color={ORANGE} />
          </Home>
        </g>
      );
    // I can count: one, two, three… ten!
    case 5:
      return (
        <g>
          <Home id={id} time="day" wall={["#F2E2C4", "#E2C8A0"]} shelf={false}>
            <ellipse cx={240} cy={262} rx={70} ry={14} fill="#FFFDF4" stroke="#E3D5C3" strokeWidth={2} />
            {Array.from({ length: 10 }, (_, k) => {
              const dx = 190 + (k % 5) * 25;
              const dy = 254 + Math.floor(k / 5) * 12;
              return (
                <g key={k}>
                  <ellipse cx={dx} cy={dy} rx={8} ry={5} fill="#7A3E1D" />
                  <g transform={`translate(${dx} ${dy - 18})`}>
                    <g className="lali-pop-in" style={vars({ "--delay": `${0.4 + k * 0.3}s` })}>
                      <text fontSize={10} fontFamily={FONT} fontWeight={900} fill={ORANGE} textAnchor="middle">
                        {k + 1}
                      </text>
                    </g>
                  </g>
                </g>
              );
            })}
            <Abdi x={100} s={0.44} mood="joy" />
            <SentenceCard x={200} y={80} text="I can count." color={ORANGE} delay={3.4} />
          </Home>
        </g>
      );
    // I can help: the small cups, one by one, not a drop spilled.
    case 6:
      return (
        <g>
          <Home id={id} time="day" wall={["#F2E2C4", "#E2C8A0"]} shelf={false}>
            <Place x={320} y={292} s={0.48} flip tap={TAP.mama}>
              <Camel who="hooyo" mood="joy" />
            </Place>
            <Place x={170} y={292} s={0.42} from={[60, 292]} dur={2.4} tap={TAP.ayan}>
              <Camel who="abdi" mood="happy" walk item={<Thing id="cup" s={0.3} />} />
            </Place>
            <SentenceCard x={200} y={80} text="I can help." color={ORANGE} />
          </Home>
        </g>
      );
    // I can hug: the baby goat calms down.
    case 7:
      return (
        <g>
          <Yard id={id} time="day">
            <g transform="translate(230 270)">
              <g className="ac-calm">
                <Thing id="goat" s={0.6} />
              </g>
            </g>
            <Abdi x={170} s={0.46} mood="joy" />
            <Hearts spots={[[200, 200, 0.8], [216, 186, 1.4], [230, 196, 2]]} />
            <SentenceCard x={200} y={80} text="I can hug." color={ORANGE} />
          </Yard>
          <Air kind="day" seed={6} />
        </g>
      );
    // The pages become a little book: "I CAN!"
    case 8:
      return (
        <g>
          <Home id={id} time="night" shelf={false}>
            <Glow x={200} y={160} r={110} color="#FFE2A0" strength={0.5} dur={3} />
            <CanBook x={200} y={150} s={1.3} />
            <Ayan x={320} s={0.44} mood="joy" />
            <Sparkles x={200} y={150} r={70} delay={0.8} n={7} />
          </Home>
        </g>
      );
    // Bedtime: Ayan reads it all to him. "That's all ME?"
    case 9:
      return (
        <g>
          <Home id={id} time="night" shelf={false}>
            <Glow x={200} y={220} r={140} color="#FFB547" strength={0.35} dur={4} />
            <Abdi x={130} y={292} s={0.44} kneel mood="wow" />
            <Ayan x={280} s={0.46} />
            {["I can jump.", "I can run.", "I can sing.", "I can count.", "I can help.", "I can hug."].map((t, i) => (
              <g key={t} transform={`translate(${i % 2 ? 270 : 130} ${54 + Math.floor(i / 2) * 36})`}>
                <g className="lali-pop-in" style={vars({ "--delay": `${0.4 + i * 0.5}s` })}>
                  <rect x={-62} y={-14} width={124} height={26} rx={8} fill="#FFFDF6" />
                  <text y={5} fontSize={14} fontFamily="var(--font-andika), sans-serif" fontWeight={700} fill={ORANGE} textAnchor="middle">
                    {t}
                  </text>
                </g>
              </g>
            ))}
          </Home>
        </g>
      );
    // The last page: "I… can… read." "I can READ!"
    case 10:
      return (
        <g>
          <Home id={id} time="night" shelf={false}>
            <Glow x={200} y={200} r={150} color="#FFE2A0" strength={0.5} dur={3} />
            <Abdi x={200} y={300} s={0.56} mood="joy" className="lali-hop" />
            <SentenceCard x={200} y={90} text="I can read." color={ORANGE} size={24} step={0.8} />
            <Sparkles x={200} y={200} r={100} delay={3} n={9} />
          </Home>
        </g>
      );
    // He hugs his little book all night. I can, I can, I CAN!
    default:
      return (
        <g>
          <Home id={id} time="night" shelf={false}>
            <rect x={100} y={252} width={200} height={20} rx={8} fill="#2E8A5A" />
            <Place x={190} y={278} s={0.42} tap={TAP.ayan}>
              <Camel who="abdi" mood="happy" kneel />
            </Place>
            <CanBook x={240} y={232} s={0.4} />
            <Zzz x={250} y={170} color="#FFE9A0" />
            <SentenceCard x={200} y={70} text="I can, I can, I CAN!" color={ORANGE} size={18} />
          </Home>
        </g>
      );
  }
}
