"use client";

import "./count-them-home.css";

import { useId } from "react";

import { Air, Place, Rain, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Cub, FONT, TAP, Wolf } from "./cast";
import { Farm } from "./places";
import { SayBubble, Sign, SoundWaves, Sparkles, WordCard } from "./props";
import { Thing } from "./things";

/*
  "Count Them Home!": one living picture per page (12 pages) on Grandpa Tolosa's farm. The gate
  stands in the middle of the fence; each page an animal (or a pair) comes trotting through it
  while a big number card shows the digit and the English word, and the ones already counted wait
  in the pen behind the fence, each with its number. The sky darkens page by page until the rain.
  Keyframes: ./kit.css (efw-*) and ./count-them-home.css (cth-*).
*/

const WORDS = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
/** The animals in the order they come through the gate (the donkey is number ten). */
const ANIMALS = ["cow", "horse", "goat", "goat", "sheep", "sheep", "hen", "hen", "dog", "donkey"];
const SOUND: Record<string, string> = { cow: "Moo!", horse: "Neigh!", goat: "Maa!", sheep: "Baa!", hen: "Cluck!", dog: "Woof!", donkey: "HEE-HAW!" };
/** Where each counted animal waits in the pen, behind the fence. */
const PEN: [number, number, number][] = [
  [40, 214, 0.46],
  [96, 212, 0.5],
  [262, 214, 0.38],
  [300, 216, 0.38],
  [340, 214, 0.38],
  [378, 216, 0.38],
  [130, 222, 0.3],
  [156, 224, 0.3],
  [236, 222, 0.34],
  [70, 222, 0.42],
];

/** A big number card: the digit and the English word under it. */
function NumCard({ n, x = 336, y = 70, delay = 0.9 }: { n: number; x?: number; y?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="bounce" sound="chime">
          <rect x={-38} y={-36} width={76} height={80} rx={14} fill="#000" opacity={0.14} />
          <rect x={-38} y={-40} width={76} height={80} rx={14} fill="#2E9A5B" />
          <rect x={-33} y={-35} width={66} height={70} rx={10} fill="#FFFDF6" />
          <text x={0} y={10} fontSize={42} fontFamily={FONT} fontWeight={900} fill="#2E9A5B" textAnchor="middle">
            {n}
          </text>
          <text x={0} y={30} fontSize={14} fontFamily={FONT} fontWeight={900} fill="#2A1A10" textAnchor="middle">
            {WORDS[n - 1]}
          </text>
        </Tappable>
      </g>
    </g>
  );
}

/** One animal from the THINGS set, tappable, with an optional little number tag over it. */
function Animal({ kind, x, y, s, n, flip = false, className, delay }: { kind: string; x: number; y: number; s: number; n?: number; flip?: boolean; className?: string; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={className} style={delay !== undefined ? vars({ "--delay": `${delay}s` }) : undefined}>
        <Tappable reaction="bounce" sound={kind === "sheep" || kind === "goat" ? "baa" : "pop"}>
          <g transform={`scale(${flip ? -s : s} ${s})`}>
            <Thing id={kind} />
          </g>
        </Tappable>
      </g>
      {n !== undefined && (
        <g transform={`translate(0 ${-44 * s - 10})`}>
          <circle r={8} fill="#FFFDF6" stroke="#2E9A5B" strokeWidth={2} />
          <text y={4} fontSize={10} fontFamily={FONT} fontWeight={900} fill="#2E9A5B" textAnchor="middle">
            {n}
          </text>
        </g>
      )}
    </g>
  );
}

/** The animals already counted, waiting in the pen. */
function Pen({ upto, tags = true }: { upto: number; tags?: boolean }) {
  return (
    <g>
      {ANIMALS.slice(0, upto).map((a, i) => {
        const [x, y, s] = PEN[i];
        return <Animal key={i} kind={a} x={x} y={y} s={s} n={tags ? i + 1 : undefined} flip={i % 2 === 1} />;
      })}
    </g>
  );
}

/** The friends at the gate: Hawi holds it open, Anbessa counts. */
function Gatekeepers({ hawi = "joy", cub = "happy" }: { hawi?: "joy" | "happy" | "worried" | "wow"; cub?: "joy" | "happy" | "worried" | "wow" }) {
  return (
    <g>
      <Place x={128} y={296} s={0.4} tap={TAP.hawi}>
        <Wolf mood={hawi} />
      </Place>
      <Place x={276} y={298} s={0.42} flip tap={TAP.cub}>
        <Cub mood={cub} arm="up" />
      </Place>
    </g>
  );
}

/** Animals coming through the gate (one, or a pair), with their sound. */
function Arrival({ from, count }: { from: number; count: 1 | 2 }) {
  const kind = ANIMALS[from];
  const s = kind === "cow" || kind === "horse" || kind === "donkey" ? 0.75 : 0.6;
  return (
    <g>
      {Array.from({ length: count }, (_, k) => (
        <g key={k} className="cth-trot" style={vars({ "--delay": `${0.2 + k * 0.5}s` })}>
          <Animal kind={kind} x={200 + (count === 2 ? (k ? 22 : -22) : 0)} y={262 + k * 6} s={s} className="cth-bob" delay={k * 0.2} />
        </g>
      ))}
      <SayBubble x={200} y={176} lines={[SOUND[kind]]} size={16} tail="down" delay={1.4} color="#7A3E1D" />
    </g>
  );
}

export default function CountThemHome({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // The rain is coming! "I have TEN animals. Count them in English!"
    case 0:
      return (
        <g>
          <Farm id={id} storm gate={200}>
            <Place x={240} y={292} s={0.5} flip tap={TAP.elder}>
              <Wolf elder mood="happy" arm="wave" />
            </Place>
            <Place x={110} y={296} s={0.4} tap={TAP.hawi}>
              <Wolf mood="wow" />
            </Place>
            <Place x={50} y={296} s={0.4} tap={TAP.cub}>
              <Cub mood="happy" />
            </Place>
            <SayBubble x={272} y={140} lines={["I have TEN!", "Count them in English!"]} size={12} tail="down" delay={0.8} />
            <WordCard x={350} y={80} word="ten" color="#2E9A5B" size={20} delay={1.8} />
            <g transform="translate(60 214)">
              <Animal kind="cow" x={0} y={0} s={0.4} />
              <Animal kind="goat" x={40} y={4} s={0.34} />
            </g>
          </Farm>
          <Air kind="day" seed={2} />
        </g>
      );
    // ONE cow. Moo!
    case 1:
      return (
        <g>
          <Farm id={id} storm gate={200} open>
            <Arrival from={0} count={1} />
            <Gatekeepers />
            <NumCard n={1} />
          </Farm>
          <Air kind="day" seed={3} />
        </g>
      );
    // TWO, a horse. Neigh!
    case 2:
      return (
        <g>
          <Farm id={id} storm gate={200} open>
            <Pen upto={1} />
            <Arrival from={1} count={1} />
            <Gatekeepers />
            <NumCard n={2} />
          </Farm>
          <Air kind="day" seed={4} />
        </g>
      );
    // THREE, FOUR: two goats. Maa!
    case 3:
      return (
        <g>
          <Farm id={id} storm gate={200} open>
            <Pen upto={2} />
            <Arrival from={2} count={2} />
            <Gatekeepers />
            <NumCard n={3} x={284} delay={0.8} />
            <NumCard n={4} x={364} delay={1.6} />
          </Farm>
          <Air kind="day" seed={5} />
        </g>
      );
    // FIVE, SIX: two sheep. Baa!
    case 4:
      return (
        <g>
          <Farm id={id} storm gate={200} open>
            <Pen upto={4} />
            <Arrival from={4} count={2} />
            <Gatekeepers />
            <NumCard n={5} x={284} delay={0.8} />
            <NumCard n={6} x={364} delay={1.6} />
          </Farm>
          <Air kind="day" seed={6} />
        </g>
      );
    // SEVEN, EIGHT: two hens. Cluck!
    case 5:
      return (
        <g>
          <Farm id={id} storm gate={200} open>
            <Pen upto={6} />
            <Arrival from={6} count={2} />
            <Gatekeepers />
            <NumCard n={7} x={284} delay={0.8} />
            <NumCard n={8} x={364} delay={1.6} />
          </Farm>
          <Air kind="day" seed={7} />
        </g>
      );
    // NINE: the dog. Woof! Hawi closes the gate.
    case 6:
      return (
        <g>
          <Farm id={id} storm gate={200}>
            <Pen upto={8} />
            <Arrival from={8} count={1} />
            <Gatekeepers />
            <NumCard n={9} />
          </Farm>
          <Air kind="day" seed={8} />
        </g>
      );
    // "Nine… but Grandpa has TEN! Somebody is missing!" Drip, drop.
    case 7:
      return (
        <g>
          <Farm id={id} storm gate={200}>
            <Pen upto={9} />
            <Gatekeepers hawi="worried" cub="wow" />
            <NumCard n={9} x={150} y={110} delay={0.4} />
            <g opacity={0.45}>
              <NumCard n={10} x={250} y={110} delay={1.2} />
            </g>
            <Sign x={292} y={70} kind="?" delay={2} />
            <g opacity={0.6}>
              <Rain />
            </g>
          </Farm>
          <Air kind="day" seed={9} />
        </g>
      );
    // "Cow, horse, goats, sheep, hens, dog… Who isn't here?" He listens.
    case 8:
      return (
        <g>
          <Farm id={id} storm gate={200}>
            <Pen upto={9} tags={false} />
            <Place x={200} y={300} s={0.56} tap={TAP.cub}>
              <g className="efw-still">
                <Cub mood="happy" />
              </g>
              <path d="M77 100 Q85 106 93 100 M107 100 Q115 106 123 100" stroke="#2A1A10" strokeWidth={3.4} fill="none" strokeLinecap="round" />
            </Place>
            <SoundWaves x={240} y={210} color="#2F6FD0" />
            {["cow", "horse", "goats", "sheep", "hens", "dog"].map((w, i) => (
              <WordCard key={w} x={50 + i * 60} y={70} word={w} size={12} color="#7A5236" delay={0.4 + i * 0.3} />
            ))}
            <WordCard x={200} y={130} word="?" size={22} color="#E8513B" delay={2.4} />
            <g opacity={0.6}>
              <Rain />
            </g>
          </Farm>
          <Air kind="day" seed={10} />
        </g>
      );
    // "HEE-HAW!" The donkey, munching under the eucalyptus trees.
    case 9:
      return (
        <g>
          <Farm id={id} storm>
            {[70, 120, 330].map((x, i) => (
              <g key={x} transform={`translate(${x} ${246 + i * 4})`}>
                <rect x={-5} y={-110} width={10} height={110} fill="#C9B9A0" />
                <ellipse cx={0} cy={-130} rx={26} ry={52} fill="#4E7A5A" className="lali-sway" style={vars({ "--dur": `${4 + i}s` })} />
              </g>
            ))}
            <Animal kind="donkey" x={220} y={262} s={1.05} className="cth-munch" />
            <SayBubble x={240} y={150} lines={["HEE-HAW!"]} size={20} tail="down" delay={0.6} color="#7A3E1D" />
            <WordCard x={330} y={80} word="donkey" pic="donkey" color="#2E9A5B" size={15} delay={1.8} />
            <Place x={60} y={298} s={0.36} from={[-40, 298]} delay={1} tap={TAP.cub}>
              <Cub mood="joy" />
            </Place>
            <g opacity={0.6}>
              <Rain />
            </g>
          </Farm>
          <Air kind="day" seed={11} />
        </g>
      );
    // TEN! The gate shuts just as the big rain comes.
    case 10:
      return (
        <g>
          <Farm id={id} storm gate={200} open rain>
            <Pen upto={9} />
            <g className="cth-push">
              <Animal kind="donkey" x={200} y={262} s={0.8} />
              <Place x={250} y={296} s={0.38} flip tap={TAP.cub}>
                <Cub mood="joy" arm="reach" />
              </Place>
            </g>
            <Place x={140} y={296} s={0.38} tap={TAP.hawi}>
              <Wolf mood="joy" arm="give" />
            </Place>
            <NumCard n={10} />
            <Sparkles x={336} y={70} r={56} delay={1.4} n={7} />
          </Farm>
          <Air kind="day" seed={12} />
        </g>
      );
    // Grandpa counts them all: one, two… TEN! "Thank you, my helpers!"
    default:
      return (
        <g>
          <Farm id={id} storm gate={200} rain>
            <g className="cth-count">
              <Pen upto={10} />
            </g>
            <Place x={330} y={296} s={0.48} flip tap={TAP.elder}>
              <Wolf elder mood="joy" arm="bless" />
            </Place>
            <Place x={200} y={298} s={0.38} tap={TAP.hawi}>
              <Wolf mood="joy" wag />
            </Place>
            <Place x={260} y={298} s={0.38} tap={TAP.cub}>
              <Cub mood="joy" />
            </Place>
            <SayBubble x={200} y={120} lines={["One, two, three, four, five,", "six, seven, eight, nine, TEN!"]} size={12} tail="down" delay={0.6} />
          </Farm>
          <Air kind="day" seed={13} />
        </g>
      );
  }
}
