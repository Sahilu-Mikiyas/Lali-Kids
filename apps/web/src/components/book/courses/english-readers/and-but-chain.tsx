"use client";

import "./and-but-chain.css";

import { useId } from "react";

import { Air, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { FONT, Gugu, Ibex, TAP, Teacher } from "./cast";
import { Market, Paper } from "./more";
import { Yard } from "./places";
import { Hearts, SayBubble, Sign } from "./props";
import { Thing } from "./things";

/*
  "The And-But Chain": one living picture per page (12 pages). Haben's short sentences are paper
  strips; green links say and (it adds more), red links say but (it changes the story), and the
  strips join into a chain that grows across the picture.
  Keyframes: ./kit.css, ./more.css and ./and-but-chain.css (abc-*).
*/

const GREEN = "#2E9A5B";
const RED = "#E8413B";
type M = "happy" | "joy" | "wow" | "worried" | "sad";

const Haben = ({ x = 130, y = 294, s = 0.42, mood = "happy" as M, pose = "sit" as "sit" | "wave" | "point", flip = false, className }: { x?: number; y?: number; s?: number; mood?: M; pose?: "sit" | "wave" | "point"; flip?: boolean; className?: string }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.haben} className={className}>
    <Ibex mood={mood === "sad" ? "worried" : mood} pose={pose} />
  </Place>
);
const GuguAt = ({ x = 280, y = 294, s = 0.4, mood = "happy" as M, pose = "sit" as "sit" | "wave" | "point" | "hop" | "no", flip = true, className, chain = false }: { x?: number; y?: number; s?: number; mood?: M; pose?: "sit" | "wave" | "point" | "hop" | "no"; flip?: boolean; className?: string; chain?: boolean }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.gugu} className={className}>
    <g>
      <Gugu mood={mood} pose={pose} />
      {chain && (
        <g>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <ellipse key={i} cx={64 + i * 14} cy={168 + Math.sin(i / 1.6) * 10} rx={8} ry={5} fill="none" stroke={i % 2 ? RED : GREEN} strokeWidth={4} />
          ))}
        </g>
      )}
    </g>
  </Place>
);

/** A paper link with a joining word. */
function Link({ x, y, word, delay = 0.6 }: { x: number; y: number; word: "and" | "but"; delay?: number }) {
  const c = word === "and" ? GREEN : RED;
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="bounce" sound="chime">
          <ellipse rx={24} ry={14} fill="#FFFDF6" stroke={c} strokeWidth={5} />
          <text y={5} fontSize={13} fontFamily={FONT} fontWeight={900} fill={c} textAnchor="middle">
            {word}
          </text>
        </Tappable>
      </g>
    </g>
  );
}

/** A sentence strip. */
const Strip = ({ x, y, text, delay = 0.4, w }: { x: number; y: number; text: string; delay?: number; w?: number }) => {
  const width = w ?? Math.round(text.length * 6.6 + 20);
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <rect x={-width / 2} y={-13} width={width} height={26} rx={5} fill="#FFF6B0" stroke="#C9B07A" strokeWidth={1.4} />
        <text y={5} fontSize={12} fontFamily="var(--font-andika), sans-serif" fontWeight={700} fill="#2A1A10" textAnchor="middle">
          {text}
        </text>
      </g>
    </g>
  );
};

export default function AndButChain({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Haben's weekend in five short sentences.
    case 0:
      return (
        <g>
          <Market id={id}>
            <Paper x={220} y={90} lines={["I went to the market.", "I bought a mango.", "I bought a banana.", "It rained. I got wet."]} size={11} delay={0.4} />
            <Haben x={130} mood="happy" />
            <g transform="translate(280 250)">
              <Thing id="mango" s={0.4} />
            </g>
          </Market>
          <Air kind="day" seed={2} grass={false} />
        </g>
      );
    // "You sound like a robot!"
    case 1:
      return (
        <g>
          <Yard id={id} house={false} time="day">
            {["I.", "Went.", "To.", "The.", "Market."].map((w, i) => (
              <text key={w} x={110 + i * 50} y={90} fontSize={16} fontFamily={FONT} fontWeight={900} fill="#5A5A66" textAnchor="middle" className="abc-robot" style={vars({ "--delay": `${i * 0.3}s` })}>
                {w}
              </text>
            ))}
            <Haben x={140} mood="worried" />
            <GuguAt x={270} mood="joy" pose="point" className="abc-giggle" />
            <SayBubble x={270} y={170} lines={["You sound like", "a robot!"]} size={12} tail="down" delay={1.4} />
          </Yard>
          <Air kind="day" seed={3} />
        </g>
      );
    // "Your sentences are right. They're just very short. Let's join some."
    case 2:
      return (
        <g>
          <Yard id={id} house={false} time="day">
            <Strip x={130} y={80} text="I bought a mango." delay={0.3} />
            <Strip x={290} y={80} text="I bought a banana." delay={0.5} />
            <Place x={320} y={294} s={0.44} flip tap={TAP.mama}>
              <Teacher mood="joy" pose="point" />
            </Place>
            <Haben x={150} mood="worried" />
            <SayBubble x={260} y={160} lines={["Let's join some."]} size={12} tail="down" delay={1.2} />
          </Yard>
          <Air kind="day" seed={4} />
        </g>
      );
    // Green links say and, red links say but.
    case 3:
      return (
        <g>
          <Yard id={id} house={false} time="day">
            <Link x={150} y={90} word="and" delay={0.4} />
            <Link x={250} y={90} word="but" delay={0.9} />
            <text x={150} y={130} fontSize={12} fontFamily={FONT} fontWeight={800} fill={GREEN} textAnchor="middle" className="lali-pop-in" style={vars({ "--delay": "1.3s" })}>
              adds more
            </text>
            <text x={250} y={130} fontSize={12} fontFamily={FONT} fontWeight={800} fill={RED} textAnchor="middle" className="lali-pop-in" style={vars({ "--delay": "1.7s" })}>
              changes the story
            </text>
            <Place x={320} y={294} s={0.42} flip tap={TAP.mama}>
              <Teacher mood="joy" />
            </Place>
            <Haben x={150} mood="wow" />
          </Yard>
          <Air kind="day" seed={5} />
        </g>
      );
    // "I bought a mango and a banana."
    case 4:
      return (
        <g>
          <Yard id={id} house={false} time="day">
            <Strip x={110} y={90} text="I bought a mango" delay={0.3} />
            <Link x={196} y={90} word="and" delay={0.8} />
            <Strip x={262} y={90} text="a banana." delay={1.2} />
            <g transform="translate(160 160)">
              <Thing id="mango" s={0.4} />
            </g>
            <g transform="translate(230 160)">
              <Thing id="banana" s={0.4} />
            </g>
            <Haben x={150} mood="joy" pose="point" />
          </Yard>
          <Air kind="day" seed={6} />
        </g>
      );
    // "I like rain and I don't like mud." Hmm. That sounds wrong.
    case 5:
      return (
        <g>
          <Yard id={id} house={false} time="day">
            <Strip x={100} y={90} text="I like rain" delay={0.3} />
            <Link x={170} y={90} word="and" delay={0.6} />
            <Strip x={262} y={90} text="I don't like mud." delay={0.9} />
            <g transform="translate(170 90)">
              <path d="M-26 -18 L26 18 M26 -18 L-26 18" stroke="#E58A00" strokeWidth={4} strokeLinecap="round" className="lali-pop-in" style={vars({ "--delay": "1.6s" })} />
            </g>
            <Haben x={150} mood="worried" />
            <Sign x={170} y={190} kind="?" delay={1.8} />
          </Yard>
          <Air kind="day" seed={7} />
        </g>
      );
    // "That's a job for but! I like rain, but I don't like mud."
    case 6:
      return (
        <g>
          <Yard id={id} house={false} time="day">
            <Strip x={100} y={90} text="I like rain," delay={0.2} />
            <Link x={170} y={90} word="but" delay={0.6} />
            <Strip x={262} y={90} text="I don't like mud." delay={0.4} />
            <g transform="translate(120 160)">
              <Thing id="rain" s={0.45} />
            </g>
            <g transform="translate(270 168)">
              <ellipse rx={30} ry={10} fill="#7A5A3A" />
            </g>
            <Haben x={160} mood="joy" pose="point" />
          </Yard>
          <Air kind="day" seed={8} />
        </g>
      );
    // A paper chain of her weekend.
    case 7:
      return (
        <g>
          <Yard id={id} house={false} time="day">
            <g className="abc-sway">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <ellipse key={i} cx={90 + i * 32} cy={90 + Math.sin(i / 1.3) * 14} rx={16} ry={10} fill="none" stroke={i === 5 ? RED : i % 2 ? GREEN : "#C9B07A"} strokeWidth={6} className="lali-pop-in" style={vars({ "--delay": `${0.3 + i * 0.15}s` })} />
              ))}
            </g>
            <Haben x={150} mood="joy" pose="wave" />
          </Yard>
          <Air kind="day" seed={9} />
        </g>
      );
    // Gugu: "I am small, but I am fast! I like honey and I like bread!"
    case 8:
      return (
        <g>
          <Yard id={id} house={false} time="day">
            <GuguAt x={220} mood="joy" pose="wave" chain className="abc-strut" />
            <SayBubble x={150} y={110} lines={["I am small,", "but I am fast!"]} size={13} tail="down" delay={0.4} />
            <Haben x={110} s={0.36} mood="joy" />
          </Yard>
          <Air kind="day" seed={10} />
        </g>
      );
    // Haben reads her new story.
    case 9:
      return (
        <g>
          <Yard id={id} house={false} time="day">
            <Paper x={220} y={100} lines={["I went to the market and I bought", "a mango and a banana. It rained", "and I got wet, but I didn't mind."]} size={11} delay={0.4} w={250} />
            <Haben x={130} mood="joy" />
          </Yard>
          <Air kind="day" seed={11} />
        </g>
      );
    // "No robot! You sound like a storyteller!"
    case 10:
      return (
        <g>
          <Yard id={id} house={false} time="day">
            <Haben x={140} mood="joy" pose="wave" />
            <GuguAt x={270} mood="joy" pose="wave" chain />
            <SayBubble x={270} y={160} lines={["You sound like", "a storyteller!"]} size={12} tail="down" delay={0.6} />
            <Hearts spots={[[200, 180, 1.4], [216, 166, 1.8]]} />
          </Yard>
          <Air kind="day" seed={12} />
        </g>
      );
    // And adds more, but changes the story!
    default:
      return (
        <g>
          <Yard id={id} house={false} time="evening">
            <Link x={150} y={80} word="and" delay={0.3} />
            <Link x={250} y={80} word="but" delay={0.6} />
            <Haben x={150} mood="joy" />
            <GuguAt x={260} mood="joy" chain />
          </Yard>
          <Air kind="dusk" seed={13} />
        </g>
      );
  }
}
