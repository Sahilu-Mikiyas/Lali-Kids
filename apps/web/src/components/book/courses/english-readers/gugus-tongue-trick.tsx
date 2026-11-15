"use client";

import "./gugus-tongue-trick.css";

import { useId } from "react";

import { Air, BeeHover, Birds, Place, Rock, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Cub, FONT, Gugu, Ibex, TAP, Teacher, Wolf } from "./cast";
import { at, HiWord, Lid } from "./more";
import { Board, Club, Yard } from "./places";
import { Hearts, SayBubble, Sign, Sparkles } from "./props";
import { Thing } from "./things";

/*
  "Peek Out, Little Tongue": one living picture per page (12 pages). The English Club gets ready
  for its show under the warka tree. Big close-ups show the trick: the tip of the tongue peeking
  out between the teeth, with the air blowing out (the windy th) or buzzing (the buzzy th).
  The th in every word is drawn in blue.
  Keyframes: ./kit.css, ./more.css and ./gugus-tongue-trick.css (gtt-*).
*/

const BLUE = "#2F6FD0";

const Haben = ({ x = 200, y = 294, s = 0.44, mood = "happy" as "happy" | "joy" | "wow" | "worried", pose = "sit" as "sit" | "wave" | "point", flip = false }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.haben}>
    <Ibex mood={mood} pose={pose} />
  </Place>
);
const GuguAt = ({ x, y = 294, s = 0.46, mood = "happy" as "happy" | "joy" | "wow" | "worried" | "sad", pose = "sit" as "sit" | "wave" | "point" | "hop" | "no", flip = false, className }: { x: number; y?: number; s?: number; mood?: "happy" | "joy" | "wow" | "worried" | "sad"; pose?: "sit" | "wave" | "point" | "hop" | "no"; flip?: boolean; className?: string }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.gugu} className={className}>
    <Gugu mood={mood} pose={pose} />
  </Place>
);

/** A big close-up of a mouth saying th: the tongue tip peeking out between the teeth. */
function Mouth({ x = 0, y = 0, s = 1, fur = "#9C7552", air = "windy" as "windy" | "buzzy" | "none" }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="grow" sound="chime">
        <ellipse rx={74} ry={56} fill={fur} />
        <ellipse cy={6} rx={58} ry={38} fill="#C9A27A" />
        <path d="M-40 0 Q0 -22 40 0 Q0 30 -40 0Z" fill="#8A2F1E" />
        <rect x={-30} y={-12} width={60} height={9} rx={3} fill="#FFFDF6" />
        <rect x={-26} y={4} width={52} height={8} rx={3} fill="#FFFDF6" />
        <path d="M-15 -12 V-3 M0 -12 V-3 M15 -12 V-3" stroke="#E3D5C3" strokeWidth={1.2} />
        <g className="gtt-tongue">
          <ellipse cx={0} cy={0} rx={16} ry={7} fill="#F07A8A" stroke="#C04A5A" strokeWidth={1.6} />
        </g>
        <path d="M-44 0 Q0 -26 44 0 Q0 34 -44 0Z" fill="none" stroke="#6A2A1A" strokeWidth={3} />
      </Tappable>
      {air === "windy" && (
        <g stroke="#FFFFFF" strokeWidth={3} fill="none" strokeLinecap="round">
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M50 ${-8 + i * 8} q14 -6 28 0 t28 0`} className="gtt-blow" style={vars({ "--delay": `${i * 0.3}s` })} />
          ))}
        </g>
      )}
      {air === "buzzy" && (
        <g stroke="#F5B21E" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round">
          {[0, 1].map((i) => (
            <path key={i} d={`M50 ${-6 + i * 12} l8 -6 l8 6 l8 -6 l8 6 l8 -6`} className="gtt-blow" style={vars({ "--delay": `${i * 0.25}s` })} />
          ))}
        </g>
      )}
    </g>
  );
}

/** A little lizard peeking out from behind a rock. */
function Lizard({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="gtt-peek">
        <path d="M-6 -6 Q14 -22 32 -14 Q40 -10 32 -6 Q14 -2 -6 4Z" fill="#6AAA4A" stroke="#2A1A10" strokeWidth={1.6} />
        <circle cx={22} cy={-13} r={2.4} fill="#2A1A10" />
        <path d="M33 -9 l6 -1" stroke="#E8413B" strokeWidth={2} strokeLinecap="round" />
      </g>
      <Rock x={0} y={10} s={1.1} />
    </g>
  );
}

/** A round face in the shiny lid, with its tongue peeking out. */
function Reflection({ fur }: { fur: string }) {
  return (
    <g>
      <circle r={20} fill={fur} />
      <circle cx={-7} cy={-5} r={2.6} fill="#2A1A10" />
      <circle cx={7} cy={-5} r={2.6} fill="#2A1A10" />
      <path d="M-8 7 Q0 3 8 7" stroke="#2A1A10" strokeWidth={2} fill="none" />
      <ellipse cx={0} cy={9} rx={4} ry={3} fill="#F07A8A" className="gtt-tongue" />
    </g>
  );
}

/** The friends sitting in a row on the ground, watching (Anbessa, Hawi, Haben). */
function Audience({ mood = "joy" as "happy" | "joy" | "wow", giggle = false }) {
  return (
    <g className={giggle ? "gtt-giggle" : undefined}>
      <Place x={70} y={298} s={0.34} tap={TAP.cub}>
        <Cub mood={mood} />
      </Place>
      <Place x={128} y={300} s={0.32} tap={TAP.hawi}>
        <Wolf mood={mood} />
      </Place>
    </g>
  );
}

export default function GugusTongueTrick({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Gugu's line: "Thank you for coming! One, two, three!"
    case 0:
      return (
        <g>
          <Club id={id} time="day">
            <Board x={270} y={110} lines={["Thank you for coming!", "One, two, three!"]} w={176} h={70} size={14} />
            <GuguAt x={190} mood="joy" pose="wave" />
            <Audience mood="happy" />
            <Place x={340} y={296} s={0.42} flip tap={TAP.mama}>
              <Teacher mood="joy" />
            </Place>
          </Club>
          <Air kind="day" seed={2} />
        </g>
      );
    // "Sank you for coming! One, two, TREE!" Everybody giggles.
    case 1:
      return (
        <g>
          <Club id={id} time="day">
            <Board x={270} y={110} lines={["Thank you for coming!", "One, two, three!"]} w={176} h={70} size={14} delay={0} />
            <GuguAt x={200} mood="worried" pose="wave" />
            <SayBubble x={190} y={160} lines={["Sank you for coming!", "One, two, TREE!"]} size={13} tail="down" delay={0.6} />
            <Audience giggle />
            <Haben x={330} s={0.36} mood="joy" flip />
            <text x={110} y={210} fontSize={14} fontFamily={FONT} fontWeight={900} fill="#E8413B" className="lali-pop-in" style={vars({ "--delay": "1.6s" })}>
              hee hee!
            </text>
            <g transform="translate(200 214)">
              <ellipse cx={-26} cy={0} rx={8} ry={5} fill="#E8413B" opacity={0.5} className="gtt-blush" />
              <ellipse cx={26} cy={0} rx={8} ry={5} fill="#E8413B" opacity={0.5} className="gtt-blush" />
            </g>
          </Club>
          <Air kind="day" seed={3} />
        </g>
      );
    // "Tree? THAT'S a tree!"
    case 2:
      return (
        <g>
          <Club id={id} time="day">
            <HiWord x={180} y={70} word="tree" hi={[]} pic="tree" color="#2E9A5B" delay={0.6} size={20} />
            <HiWord x={270} y={70} word="three" hi={at("three", "th")} pic="three" color={BLUE} delay={1.2} size={20} />
            <Place x={150} y={296} s={0.44} tap={TAP.hawi}>
              <Wolf mood="joy" arm="give" />
            </Place>
            <SayBubble x={170} y={150} lines={["THAT'S a tree!"]} size={14} tail="down" delay={1.8} />
            <GuguAt x={300} mood="sad" flip />
          </Club>
          <Air kind="day" seed={4} />
        </g>
      );
    // Teacher Meron: Amharic has no th sound. Haben, will you help?
    case 3:
      return (
        <g>
          <Club id={id} time="day">
            <Board x={250} y={100} lines={["th"]} w={90} h={60} size={30} />
            <Place x={330} y={296} s={0.46} flip tap={TAP.mama}>
              <Teacher mood="joy" pose="point" />
            </Place>
            <GuguAt x={130} mood="sad" />
            <Haben x={220} mood="happy" pose="wave" />
            <Sign x={220} y={160} kind="?" delay={1.6} />
          </Club>
          <Air kind="day" seed={5} />
        </g>
      );
    // The tip of her tongue is peeking out between her teeth!
    case 4:
      return (
        <g>
          <Yard id={id} time="day" tree fig={330}>
            <Mouth x={190} y={130} s={1.1} />
            <text x={190} y={226} fontSize={26} fontFamily={FONT} fontWeight={900} fill={BLUE} textAnchor="middle" className="lali-pop-in" style={vars({ "--delay": "1s" })}>
              Thhhank you
            </text>
            <Haben x={80} s={0.4} mood="wow" />
            <Sparkles x={190} y={130} r={70} delay={1.4} n={6} />
          </Yard>
          <Air kind="day" seed={6} />
        </g>
      );
    // Grandma's shiny lid for a mirror; like a little lizard peeking out of a rock.
    case 5:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Lizard x={280} y={236} />
            <Haben x={120} s={0.46} mood="joy" pose="point" />
            <Lid x={190} y={170} s={0.8}>
              <Reflection fur="#9C7552" />
            </Lid>
            <SayBubble x={230} y={70} lines={["Peek out, little tongue:", "th!"]} size={14} tail="down" delay={1.2} color={BLUE} />
          </Yard>
          <Air kind="day" seed={7} />
        </g>
      );
    // Gugu in the lid: "Thhh… three! Thhh… thank you!"
    case 6:
      return (
        <g>
          <Yard id={id} time="day" tree fig={330}>
            <Lid x={200} y={150} s={1}>
              <Reflection fur="#6A4632" />
            </Lid>
            <GuguAt x={140} mood="joy" />
            <Haben x={290} s={0.42} mood="joy" pose="wave" flip />
            <HiWord x={110} y={70} word="three" hi={at("three", "th")} color={BLUE} delay={1.2} size={20} />
            <HiWord x={290} y={70} word="thank you" hi={at("thank you", "th")} color={BLUE} delay={2} size={20} />
            <SayBubble x={290} y={170} lines={["YES!"]} size={16} tail="down" delay={2.8} />
          </Yard>
          <Air kind="day" seed={8} />
        </g>
      );
    // Two th sounds: a windy one and a buzzy one.
    case 7:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Mouth x={110} y={90} s={0.55} air="windy" />
            <Mouth x={260} y={90} s={0.55} air="buzzy" />
            <HiWord x={110} y={168} word="thank" hi={at("thank", "th")} color={BLUE} delay={0.6} size={17} />
            <HiWord x={110} y={204} word="three" hi={at("three", "th")} color={BLUE} delay={0.9} size={17} />
            <HiWord x={240} y={168} word="this" hi={at("this", "th")} color="#E3A500" delay={1.4} size={17} />
            <HiWord x={310} y={168} word="that" hi={at("that", "th")} color="#E3A500" delay={1.6} size={17} />
            <HiWord x={240} y={204} word="the" hi={at("the", "th")} color="#E3A500" delay={1.8} size={17} />
            <HiWord x={310} y={204} word="they" hi={at("they", "th")} color="#E3A500" delay={2} size={17} />
            <BeeHover x={350} y={110} s={0.8} flip />
            <GuguAt x={200} y={298} s={0.36} mood="wow" />
          </Yard>
          <Air kind="day" seed={9} />
        </g>
      );
    // "Thin stick, thick stick!" "Bath!" "Teeth!"
    case 8:
      return (
        <g>
          <Yard id={id} time="day">
            <g transform="translate(96 120) rotate(-20)">
              <rect x={-3} y={-40} width={6} height={80} rx={3} fill="#9C6A3A" stroke="#2A1A10" strokeWidth={1.4} />
            </g>
            <g transform="translate(130 120) rotate(-10)">
              <rect x={-9} y={-40} width={18} height={80} rx={8} fill="#7A4A26" stroke="#2A1A10" strokeWidth={1.4} />
            </g>
            <HiWord x={112} y={190} word="thin, thick" hi={[0, 1, 6, 7]} color={BLUE} delay={0.6} size={15} />
            <g transform="translate(210 140)">
              <Thing id="bath" s={0.7} />
            </g>
            <HiWord x={210} y={190} word="bath" hi={at("bath", "th")} color={BLUE} delay={1.2} size={15} />
            <g transform="translate(300 130)">
              <Thing id="tooth" s={0.5} />
              <g transform="translate(22 10)">
                <Thing id="brush" s={0.4} />
              </g>
            </g>
            <HiWord x={300} y={190} word="teeth" hi={at("teeth", "th")} color={BLUE} delay={1.8} size={15} />
            <GuguAt x={200} y={298} s={0.36} mood="joy" pose="hop" className="gtt-hop" />
          </Yard>
          <Air kind="day" seed={10} />
        </g>
      );
    // Show day: Haben pokes the tip of her tongue out: their secret sign.
    case 9:
      return (
        <g>
          <Club id={id} time="evening">
            <GuguAt x={210} y={270} s={0.42} mood="worried" className="gtt-shiver" />
            <Haben x={110} y={300} s={0.4} mood="joy" />
            <g transform="translate(110 260)">
              <ellipse rx={4} ry={3} fill="#F07A8A" className="gtt-tongue" />
            </g>
            <Place x={290} y={300} s={0.36} flip tap={TAP.cub}>
              <Cub mood="happy" />
            </Place>
          </Club>
          <Air kind="dusk" seed={11} />
        </g>
      );
    // "THANK you for coming! One, two, THREE!" The birds fly up out of the warka tree.
    case 10:
      return (
        <g>
          <Club id={id} time="evening" shake>
            <Birds y={50} n={4} dur={6} color="#33406E" />
            <Birds y={80} n={3} dur={7} phase={0.4} color="#33406E" />
            <GuguAt x={210} y={278} s={0.46} mood="joy" pose="wave" />
            <SayBubble x={230} y={84} lines={["THANK you for coming!", "One, two, THREE!"]} size={14} tail="down" delay={0.4} color={BLUE} />
            <Audience mood="joy" giggle />
            <Haben x={330} s={0.38} mood="joy" pose="wave" flip />
          </Club>
          <Air kind="dusk" seed={12} />
        </g>
      );
    // "Thank you, Haben." Three, thank you, this, that!
    default:
      return (
        <g>
          <Club id={id} time="evening">
            <HiWord x={110} y={60} word="three" hi={at("three", "th")} color={BLUE} delay={0.4} size={18} />
            <HiWord x={200} y={60} word="thank you" hi={at("thank you", "th")} color={BLUE} delay={0.7} size={18} />
            <HiWord x={290} y={60} word="this" hi={at("this", "th")} color={BLUE} delay={1} size={18} />
            <HiWord x={290} y={110} word="that" hi={at("that", "th")} color={BLUE} delay={1.3} size={18} />
            <GuguAt x={170} mood="joy" />
            <Haben x={260} mood="joy" flip />
            <SayBubble x={150} y={170} lines={["Thank you, Haben!"]} size={13} tail="down" delay={1.8} />
            <Hearts spots={[[214, 200, 2.2], [228, 186, 2.6]]} />
          </Club>
          <Air kind="dusk" seed={13} />
        </g>
      );
  }
}
