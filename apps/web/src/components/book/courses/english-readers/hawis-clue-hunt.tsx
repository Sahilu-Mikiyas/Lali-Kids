"use client";

import "./hawis-clue-hunt.css";

import { useId } from "react";

import { Air, Place, Rock, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { FONT, TAP, Wolf } from "./cast";
import { at, HiWord, Paper, Reeds } from "./more";
import { Farm, FigTree, Home } from "./places";
import { Hearts, Notes, SayBubble, Sign, Sparkles } from "./props";
import { Thing } from "./things";

/*
  "Read the Clue!": one living picture per page (12 pages), on Grandpa Tolosa's farm in the Bale
  Mountains. Each clue is a curled paper note; the ck in each word is green, the ng purple, and
  the two letters that make one sound stand together on tiles.
  Keyframes: ./kit.css, ./more.css and ./hawis-clue-hunt.css (hch-*).
*/

const CK = "#2E9A5B";
const NG = "#8E5BE0";

const Hawi = ({ x, y = 294, s = 0.44, mood = "happy" as "happy" | "joy" | "wow" | "worried", arm, flip = false, className }: { x: number; y?: number; s?: number; mood?: "happy" | "joy" | "wow" | "worried"; arm?: "wave" | "give" | "bless"; flip?: boolean; className?: string }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.hawi} className={className}>
    <Wolf mood={mood} arm={arm} wag={mood === "joy"} />
  </Place>
);
const Grandpa = ({ x, y = 292, s = 0.5, mood = "happy" as "happy" | "joy", arm, flip = false }: { x: number; y?: number; s?: number; mood?: "happy" | "joy"; arm?: "wave" | "give" | "bless"; flip?: boolean }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.elder}>
    <Wolf elder mood={mood} arm={arm} />
  </Place>
);

/** Two letter tiles standing together (c + k, n + g) and the one sound they make. */
function Tiles({ x, y, a, b, sound, color, delay = 0.6 }: { x: number; y: number; a: string; b: string; sound: string; color: string; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="bounce" sound="chime">
          {[a, b].map((l, i) => (
            <g key={l} transform={`translate(${i ? 22 : -22} 0)`}>
              <rect x={-20} y={-24} width={40} height={46} rx={9} fill={color} />
              <rect x={-16} y={-20} width={32} height={38} rx={7} fill="#FFFDF6" />
              <text y={10} fontSize={28} fontFamily="var(--font-andika), sans-serif" fontWeight={700} fill={color} textAnchor="middle">
                {l}
              </text>
            </g>
          ))}
        </Tappable>
        <text y={50} fontSize={20} fontFamily={FONT} fontWeight={900} fill={color} textAnchor="middle" className="lali-pop-in" style={vars({ "--delay": `${delay + 0.7}s` })}>
          {sound}
        </text>
      </g>
    </g>
  );
}

/** The duck pond, with reeds and two bobbing ducks. */
function Pond({ x, y, ducks = true }: { x: number; y: number; ducks?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse rx={110} ry={24} fill="#4E9AC8" />
      <ellipse cy={-3} rx={100} ry={18} fill="#6BB8E0" />
      <path d="M-70 -4 q10 -4 20 0 M20 4 q10 -4 20 0" stroke="#BFE6FA" strokeWidth={2} fill="none" />
      {ducks && (
        <g>
          <g transform="translate(-40 -8)">
            <g className="enr-bob">
              <Thing id="duck" s={0.36} />
            </g>
          </g>
          <g transform="translate(30 -4) scale(-1 1)">
            <g className="enr-bob" style={vars({ "--delay": "-0.8s" })}>
              <Thing id="duck" s={0.3} />
            </g>
          </g>
        </g>
      )}
    </g>
  );
}

/** A cow with a bell round her neck, which swings: ding-dong. */
function BellCow({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="bounce" sound="chime">
        <Thing id="cow" s={1.1} />
      </Tappable>
      <g transform="translate(-26 4)">
        <g className="hch-bell">
          <path d="M0 -6 V0" stroke="#7A5236" strokeWidth={2} />
          <path d="M-7 12 Q-7 0 0 0 Q7 0 7 12Z" fill="#F2C94C" stroke="#2A1A10" strokeWidth={1.6} />
        </g>
      </g>
    </g>
  );
}

/** The big bell on the farm gate. */
function GateBell({ x, y, ring = true }: { x: number; y: number; ring?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-4} y={-70} width={8} height={70} fill="#8A6A4A" />
      <path d="M-4 -70 H30" stroke="#8A6A4A" strokeWidth={6} />
      <g transform="translate(26 -66)">
        <g className={ring ? "hch-bell" : undefined}>
          <Tappable reaction="wiggle" sound="chime">
            <path d="M-14 26 Q-14 2 0 2 Q14 2 14 26Z" fill="#F2C94C" stroke="#2A1A10" strokeWidth={2} />
            <circle cx={0} cy={28} r={4} fill="#9C6A3A" />
          </Tappable>
        </g>
      </g>
    </g>
  );
}

export default function HawisClueHunt({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Hawi's birthday on Grandpa Tolosa's farm. "Here is your first clue!"
    case 0:
      return (
        <g>
          <Farm id={id} time="morning">
            <g transform="translate(200 40)">
              {["#E8413B", "#FFD233", "#2E9A5B", "#2F6FD0", "#8E5BE0", "#F08A24"].map((c, i) => (
                <path key={c} d={`M${-100 + i * 36} 0 l12 18 l12 -18Z`} fill={c} className="lali-pop-in" style={vars({ "--delay": `${0.2 + i * 0.1}s` })} />
              ))}
              <path d="M-110 -2 Q0 12 110 -2" stroke="#7A5236" strokeWidth={1.4} fill="none" />
            </g>
            <Grandpa x={270} mood="joy" arm="give" flip />
            <Paper x={200} y={150} lines={["Clue 1"]} delay={1.2} size={14} />
            <Hawi x={130} mood="wow" />
          </Farm>
          <Air kind="day" seed={2} />
        </g>
      );
    // "Look by the… b-l-a-c-k… bla-k-k?"
    case 1:
      return (
        <g>
          <Farm id={id}>
            <Paper x={210} y={90} lines={["Look by the", "black rock."]} size={18} delay={0.4} />
            <g transform="translate(236 176)">
              {["c", "k"].map((l, i) => (
                <text key={l} x={i * 22} y={0} fontSize={26} fontFamily="var(--font-andika), sans-serif" fontWeight={700} fill="#E8413B" className="hch-wobble" style={vars({ "--delay": `${-i * 0.3}s` })}>
                  {l}
                </text>
              ))}
            </g>
            <Hawi x={160} mood="worried" />
            <Sign x={190} y={170} kind="?" delay={1.4} />
          </Farm>
          <Air kind="day" seed={3} />
        </g>
      );
    // c and k both say k: together, just once. "Black! Look by the black rock!"
    case 2:
      return (
        <g>
          <Farm id={id}>
            <Tiles x={140} y={80} a="c" b="k" sound="k!" color={CK} delay={0.6} />
            <HiWord x={260} y={80} word="black" hi={at("black", "ck")} color={CK} delay={1.8} size={24} />
            <Rock x={290} y={262} s={1.3} color="#3A3A46" />
            <Grandpa x={120} mood="happy" arm="bless" />
            <Hawi x={200} mood="joy" />
          </Farm>
          <Air kind="day" seed={4} />
        </g>
      );
    // A red sock on the black rock, and clue two: "Go to the duck pond."
    case 3:
      return (
        <g>
          <Farm id={id}>
            <Rock x={250} y={262} s={1.3} color="#3A3A46" />
            <g transform="translate(250 190) rotate(-10)">
              <g className="hch-wiggle">
                <Thing id="sock" s={0.5} />
              </g>
            </g>
            <Paper x={200} y={80} lines={["Go to the", "duck pond."]} size={17} delay={0.8} />
            <HiWord x={90} y={150} word="sock" hi={at("sock", "ck")} color={CK} delay={1.6} size={18} />
            <HiWord x={320} y={150} word="duck" hi={at("duck", "ck")} color={CK} delay={2.2} size={18} />
            <Hawi x={130} mood="joy" />
          </Farm>
          <Air kind="day" seed={5} />
        </g>
      );
    // At the pond: "Quack!" Clue three: "Ring the bell and… sin-guh?"
    case 4:
      return (
        <g>
          <Farm id={id}>
            <Pond x={230} y={244} />
            <Reeds x={320} y={250} s={0.9} />
            <Paper x={290} y={130} lines={["Ring the bell", "and sing."]} size={15} delay={0.6} pin />
            <text x={200} y={204} fontSize={14} fontFamily={FONT} fontWeight={900} fill="#2A1A10" className="lali-pop-in" style={vars({ "--delay": "0.4s" })}>
              Quack!
            </text>
            <Hawi x={110} mood="worried" />
            <SayBubble x={120} y={150} lines={["Sin-guh?"]} size={15} tail="down" delay={1.6} />
            <Grandpa x={290} y={214} s={0.18} flip />
          </Farm>
          <Air kind="day" seed={6} />
        </g>
      );
    // The cow's bell: ding-dong! n and g make one sound, up in the nose: ng.
    case 5:
      return (
        <g>
          <Farm id={id}>
            <BellCow x={270} y={226} s={1} />
            <text x={290} y={150} fontSize={16} fontFamily={FONT} fontWeight={900} fill={NG} textAnchor="middle" className="lali-pop-in" style={vars({ "--delay": "0.8s" })}>
              ding-dong!
            </text>
            <Tiles x={150} y={80} a="n" b="g" sound="ng!" color={NG} delay={1.6} />
            <Hawi x={120} mood="wow" />
          </Farm>
          <Air kind="day" seed={7} />
        </g>
      );
    // She rings the big bell on the gate and sings.
    case 6:
      return (
        <g>
          <Farm id={id} gate={240}>
            <GateBell x={250} y={232} />
            <HiWord x={110} y={70} word="ring" hi={at("ring", "ng")} color={NG} delay={0.6} size={22} />
            <HiWord x={200} y={70} word="sing" hi={at("sing", "ng")} color={NG} delay={1} size={22} />
            <Hawi x={170} mood="joy" />
            <Notes x={200} y={170} color="#8E5BE0" />
            <Sparkles x={276} y={180} r={30} delay={0.6} n={5} />
          </Farm>
          <Air kind="day" seed={8} />
        </g>
      );
    // Cousin Lensa runs out with clue four: "Look on the swing."
    case 7:
      return (
        <g>
          <Farm id={id}>
            <Place x={260} y={294} s={0.4} flip from={[380, 294]} dur={1.4} delay={0.2} tap={TAP.hawi}>
              <Wolf mood="joy" dress="#E8413B" arm="give" />
            </Place>
            <Paper x={200} y={110} lines={["Look on the swing."]} size={16} delay={1.4} />
            <HiWord x={200} y={170} word="swing" hi={at("swing", "ng")} color={NG} delay={2} size={22} />
            <Hawi x={120} mood="joy" />
          </Farm>
          <Air kind="day" seed={9} />
        </g>
      );
    // On the swing: "Pull the long string." The string runs up into the tree.
    case 8:
      return (
        <g>
          <Farm id={id}>
            <FigTree x={250} y={236} s={1.1} />
            <path d="M232 98 V214 M268 98 V214" stroke="#7A5236" strokeWidth={2.4} />
            <g transform="translate(250 214)">
              <g className="enr-bob" style={vars({ "--dur": "2.6s" })}>
                <rect x={-24} y={-4} width={48} height={8} rx={3} fill="#9C6A3A" stroke="#2A1A10" strokeWidth={1.4} />
              </g>
            </g>
            <path d="M262 210 Q300 160 300 80" stroke="#E8413B" strokeWidth={1.6} fill="none" strokeDasharray="4 3" />
            <Paper x={140} y={80} lines={["Pull the", "long string."]} size={15} delay={0.6} />
            <HiWord x={110} y={150} word="long" hi={at("long", "ng")} color={NG} delay={1.4} size={18} />
            <HiWord x={180} y={150} word="string" hi={at("string", "ng")} color={NG} delay={1.8} size={18} />
            <Hawi x={150} mood="happy" />
          </Farm>
          <Air kind="day" seed={10} />
        </g>
      );
    // Down comes a bundle: a notebook and a pencil. "For Hawi, who can read."
    case 9:
      return (
        <g>
          <Farm id={id}>
            <FigTree x={290} y={236} s={1.1} />
            <g transform="translate(200 160)">
              <g className="enr-drop" style={vars({ "--fy": "-120px", "--dur": "1.4s", "--delay": "0.4s" })}>
                <Thing id="book" s={0.7} />
                <g transform="translate(34 6) rotate(30)">
                  <Thing id="pencil" s={0.5} />
                </g>
              </g>
            </g>
            <Paper x={200} y={66} lines={["For Hawi, who can read.", "Now write your own clues!"]} size={13} delay={1.8} color="#FFF6B0" />
            <Hawi x={120} mood="joy" arm="wave" />
            <Grandpa x={320} mood="joy" flip />
            <Sparkles x={200} y={160} r={50} delay={1.6} n={7} />
          </Farm>
          <Air kind="day" seed={11} />
        </g>
      );
    // That evening: "Look in your sock!" Grandpa laughs.
    case 10:
      return (
        <g>
          <Home id={id} time="night" win={[320, 92]}>
            <rect x={60} y={214} width={140} height={26} rx={6} fill="#C98A4A" />
            <rect x={60} y={204} width={140} height={14} rx={6} fill="#F4EEDC" />
            <Paper x={130} y={150} lines={["Look in your sock!"]} size={14} delay={0.6} />
            <g transform="translate(230 250) rotate(-20)">
              <Thing id="sock" s={0.5} />
            </g>
            <g transform="translate(250 196) rotate(8)">
              <g className="lali-pop-in" style={vars({ "--delay": "1.6s" })}>
                <rect x={-26} y={-20} width={52} height={40} rx={3} fill="#FFFDF6" stroke="#B9A58C" strokeWidth={1.4} />
                <circle cx={-10} cy={-2} r={8} fill="#B97A52" />
                <circle cx={10} cy={0} r={7} fill="#C8552B" />
                <path d="M-24 14 H24" stroke="#2E9A5B" strokeWidth={3} />
              </g>
            </g>
            <Grandpa x={320} mood="joy" flip />
            <Hawi x={80} y={296} s={0.36} mood="joy" />
            <Hearts spots={[[300, 160, 2.2], [316, 146, 2.6]]} />
          </Home>
        </g>
      );
    // ck says k just once; ng sings in your nose.
    default:
      return (
        <g>
          <Farm id={id} time="evening">
            {["black", "rock", "sock", "duck"].map((w, i) => (
              <HiWord key={w} x={80 + i * 80} y={60} word={w} hi={at(w, "ck")} color={CK} delay={0.3 + i * 0.2} size={18} />
            ))}
            {["ring", "sing", "swing", "long"].map((w, i) => (
              <HiWord key={w} x={80 + i * 80} y={118} word={w} hi={at(w, "ng")} color={NG} delay={1.3 + i * 0.2} size={18} />
            ))}
            <Hawi x={150} mood="joy" />
            <Grandpa x={260} mood="joy" flip />
          </Farm>
          <Air kind="dusk" seed={12} />
        </g>
      );
  }
}
