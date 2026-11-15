"use client";

import "./story-hand.css";

import { useId } from "react";

import { Air, Place, Sun, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Camel, FONT, Ibex, TAP } from "./cast";
import { Home, Yard } from "./places";
import { Hearts, SayBubble, Sign, Speech } from "./props";
import { Thing } from "./things";

/*
  "The Story Hand": one living picture per page (12 pages). The Story Hand is a big open hand with
  a tag on each finger (who, where, the problem, what happened, the end); on each page of the crow
  tale its finger lights up, and the tale itself plays in a picture beside it: the thirsty crow,
  the pot with the water too low, the stones going plop, the water rising.
  Keyframes: ./kit.css, ./more.css and ./story-hand.css (sth-*).
*/

const PURPLE = "#8E5BE0";
const PARTS = ["who", "where", "problem", "what happened", "the end"];

const Haben = ({ x = 200, y = 294, s = 0.44, mood = "happy" as "happy" | "joy" | "wow" | "worried", pose = "sit" as "sit" | "wave" | "point", flip = false }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.haben}>
    <Ibex mood={mood} pose={pose} />
  </Place>
);
const Abdi = ({ x = 200, y = 296, s = 0.38, mood = "happy" as "happy" | "joy" | "wow" | "worried", flip = false }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.ayan}>
    <Camel who="abdi" mood={mood} />
  </Place>
);

/** The Story Hand: five fingers with their tags; `on` lights one finger (0 thumb … 4 little finger). */
function Hand({ x, y, s = 1, on = -1, delay = 0.3 }: { x: number; y: number; s?: number; on?: number; delay?: number }) {
  const fingers: [number, number, number, number][] = [
    // x, top y, height, angle
    [-46, -10, 40, -40],
    [-24, -58, 58, 0],
    [-2, -66, 66, 0],
    [20, -60, 60, 0],
    [40, -46, 46, 8],
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="wiggle" sound="chime">
          {fingers.map(([fx, ty, h, a], i) => (
            <g key={i} transform={`rotate(${a} ${fx} ${ty + h})`}>
              <rect x={fx - 9} y={ty} width={18} height={h + 10} rx={9} fill={i === on ? "#F5B21E" : "#C88A5A"} stroke="#2A1A10" strokeWidth={1.6} className={i === on ? "sth-glow" : undefined} />
            </g>
          ))}
          <rect x={-40} y={-6} width={92} height={70} rx={24} fill="#C88A5A" stroke="#2A1A10" strokeWidth={1.6} />
        </Tappable>
        {(
          [
            [-78, -8, "end"],
            [-40, -82, "end"],
            [-2, -96, "middle"],
            [36, -84, "start"],
            [62, -58, "start"],
          ] as const
        ).map(([tx, ty, anchor], i) => (
          <text key={i} x={tx} y={ty} fontSize={10} fontFamily={FONT} fontWeight={900} fill={i === on ? PURPLE : "#5B4636"} textAnchor={anchor}>
            {PARTS[i]}
          </text>
        ))}
      </g>
    </g>
  );
}

/** A clay pot with water at `level` (0 low … 1 full), cut away to show the water. */
function Pot({ x, y, level = 0.2, rise = false, stones = 0 }: { x: number; y: number; level?: number; rise?: boolean; stones?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-26 -50 Q-34 -20 -28 0 Q0 12 28 0 Q34 -20 26 -50Z" fill="#C8673A" stroke="#2A1A10" strokeWidth={2} />
      <rect x={-14} y={-60} width={28} height={12} rx={3} fill="#C8673A" stroke="#2A1A10" strokeWidth={2} />
      <clipPath id="sth-pot">
        <path d="M-20 -48 Q-26 -20 -22 -4 Q0 6 22 -4 Q26 -20 20 -48Z" />
      </clipPath>
      <path d="M-20 -48 Q-26 -20 -22 -4 Q0 6 22 -4 Q26 -20 20 -48Z" fill="#7A3A1E" />
      <g clipPath="url(#sth-pot)">
        <g className={rise ? "sth-rise" : undefined}>
          <rect x={-30} y={-6 - level * 44} width={60} height={60} fill="#5BB8E8" />
        </g>
        {Array.from({ length: stones }, (_, i) => (
          <circle key={i} cx={-12 + (i % 4) * 8} cy={-4 - Math.floor(i / 4) * 7} r={4} fill="#9C98A6" stroke="#2A1A10" strokeWidth={0.8} />
        ))}
      </g>
    </g>
  );
}

/** The crow, perched at (x, y); `drink` dips her head. */
const Crow = ({ x, y, s = 0.6, flip = false, drop = false }: { x: number; y: number; s?: number; flip?: boolean; drop?: boolean }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
    <g className={drop ? "sth-peck" : undefined}>
      <Tappable reaction="bounce" sound="pop">
        <Thing id="crow" />
      </Tappable>
    </g>
  </g>
);

export default function StoryHand({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Abdi was ill and missed story time. "Tell me!"
    case 0:
      return (
        <g>
          <Yard id={id} time="day">
            <g transform="translate(130 284)">
              <path d="M-50 -10 Q0 -30 50 -10 V10 H-50Z" fill="#2E8A5A" opacity={0.9} />
            </g>
            <Abdi x={130} mood="worried" />
            <Haben x={270} mood="happy" pose="wave" flip />
            <SayBubble x={130} y={160} lines={["Tell me!"]} size={15} tail="down" delay={0.8} />
          </Yard>
          <Air kind="day" seed={2} />
        </g>
      );
    // "There were stones, no, wait, first it was hot, and a pot, and the crow, no…"
    case 1:
      return (
        <g>
          <Yard id={id} time="day">
            <Speech x={230} y={110} w={170} h={90} delay={0.3}>
              <g className="sth-muddle">
                {["crow", "rock", "sun", "jug"].map((t, i) => (
                  <g key={t} transform={`translate(${-54 + i * 36} ${(i % 2) * 10 - 5}) rotate(${(i - 1.5) * 25}) scale(0.32)`}>
                    <Thing id={t} />
                  </g>
                ))}
              </g>
            </Speech>
            <Haben x={260} mood="worried" pose="wave" flip />
            <Abdi x={120} mood="worried" />
          </Yard>
          <Air kind="day" seed={3} />
        </g>
      );
    // "I don't get it." Haben stops… and remembers the Story Hand.
    case 2:
      return (
        <g>
          <Yard id={id} time="day">
            <Abdi x={120} mood="worried" />
            <Sign x={140} y={190} kind="?" delay={0.4} />
            <Haben x={260} mood="wow" flip />
            <Sign x={250} y={180} kind="!" delay={1.4} color="#F5B21E" />
          </Yard>
          <Air kind="day" seed={4} />
        </g>
      );
    // Five fingers for five parts.
    case 3:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Hand x={200} y={150} s={1.5} delay={0.3} />
            <Haben x={110} s={0.4} mood="joy" pose="wave" />
            <Abdi x={300} s={0.34} mood="wow" flip />
          </Yard>
          <Air kind="day" seed={5} />
        </g>
      );
    // Who? A thirsty crow. Where? On a hot, dry day, next to a pot.
    case 4:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Sun x={300} y={56} r={26} />
            <Hand x={110} y={140} s={1} on={1} />
            <Pot x={270} y={250} />
            <Crow x={250} y={190} s={0.6} />
          </Yard>
          <Air kind="day" seed={6} />
        </g>
      );
    // The problem: the water is low; the beak can't reach it.
    case 5:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Hand x={110} y={140} s={1} on={2} />
            <Pot x={270} y={250} level={0.15} />
            <Crow x={270} y={176} s={0.6} />
            <Sign x={310} y={170} kind="?" delay={0.8} />
          </Yard>
          <Air kind="day" seed={7} />
        </g>
      );
    // What happened: the crow drops in little stones, one by one. Plop, plop, plop!
    case 6:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Hand x={110} y={140} s={1} on={3} />
            <Pot x={270} y={250} level={0.4} rise stones={6} />
            <Crow x={270} y={176} s={0.6} drop />
            {[0, 1, 2].map((i) => (
              <g key={i} transform="translate(272 168)">
                <circle r={4} fill="#9C98A6" stroke="#2A1A10" strokeWidth={0.8} className="sth-stone" style={vars({ "--delay": `${i * 0.7}s` })} />
              </g>
            ))}
            <text x={330} y={150} fontSize={14} fontFamily={FONT} fontWeight={900} fill="#2F6FD0" textAnchor="middle" className="lali-pop-in" style={vars({ "--delay": "1s" })}>
              plop!
            </text>
          </Yard>
          <Air kind="day" seed={8} />
        </g>
      );
    // The end: the water comes up, and the crow has a long drink.
    case 7:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Hand x={110} y={140} s={1} on={4} />
            <Pot x={270} y={250} level={0.85} stones={12} />
            <Crow x={268} y={186} s={0.6} drop />
            <Hearts spots={[[300, 160, 1], [314, 146, 1.4]]} />
          </Yard>
          <Air kind="day" seed={9} />
        </g>
      );
    // "Can stones really make water come up?" "Let's try!"
    case 8:
      return (
        <g>
          <Yard id={id} time="day">
            <g transform="translate(200 240)">
              <rect x={-60} y={-6} width={120} height={10} rx={3} fill="#9C6A3A" />
              <path d="M-50 4 V34 M50 4 V34" stroke="#7A4A26" strokeWidth={5} />
              <g transform="translate(-10 -26)">
                <path d="M-14 -24 H14 L11 18 H-11Z" fill="#DDF2FF" fillOpacity={0.8} stroke="#2A1A10" strokeWidth={1.6} />
                <path d="M-12 -4 H12 L11 18 H-11Z" fill="#5BB8E8" />
              </g>
              {[0, 1, 2, 3, 4].map((i) => (
                <circle key={i} cx={20 + i * 7} cy={-10} r={3.4} fill="#9C98A6" stroke="#2A1A10" strokeWidth={0.8} />
              ))}
            </g>
            <Abdi x={110} mood="wow" />
            <Haben x={300} mood="joy" pose="point" flip />
          </Yard>
          <Air kind="day" seed={10} />
        </g>
      );
    // Plop, plop, plop! The water comes up to the top. "The crow was clever!"
    case 9:
      return (
        <g>
          <Yard id={id} time="day">
            <g transform="translate(190 214)">
              <path d="M-14 -24 H14 L11 18 H-11Z" fill="#DDF2FF" fillOpacity={0.8} stroke="#2A1A10" strokeWidth={1.6} />
              <g className="sth-cup">
                <path d="M-12 -4 H12 L11 18 H-11Z" fill="#5BB8E8" />
              </g>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <circle key={i} cx={-6 + (i % 3) * 6} cy={14 - Math.floor(i / 3) * 6} r={3} fill="#9C98A6" />
              ))}
            </g>
            <Abdi x={120} mood="joy" />
            <Haben x={290} mood="joy" flip />
            <SayBubble x={130} y={150} lines={["The crow", "was clever!"]} size={13} tail="down" delay={1.2} />
          </Yard>
          <Air kind="day" seed={11} />
        </g>
      );
    // That evening Abdi tells Hooyo, on his own hand.
    case 10:
      return (
        <g>
          <Home id={id} time="evening">
            <Hand x={200} y={120} s={0.9} on={-1} />
            <Abdi x={130} mood="joy" />
            <Place x={300} y={292} s={0.46} flip tap={TAP.mama}>
              <Camel who="hooyo" mood="joy" />
            </Place>
            <Hearts spots={[[230, 200, 1.4], [246, 186, 1.8]]} />
          </Home>
        </g>
      );
    // Who, where, the problem, what happened, the end!
    default:
      return (
        <g>
          <Yard id={id} time="evening">
            <Hand x={200} y={150} s={1.4} delay={0.3} />
            <Haben x={100} s={0.38} mood="joy" pose="wave" />
            <Abdi x={310} s={0.34} mood="joy" flip />
          </Yard>
          <Air kind="dusk" seed={12} />
        </g>
      );
  }
}
