"use client";

import "./name-sounds.css";

import { useId } from "react";

import { Air, BeeFlight, BeeHover, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Camel, Cub, FONT, Gugu, Ibex, TAP, Teacher, Wolf } from "./cast";
import { Board, Club } from "./places";
import { LetterCard, SayBubble, Sign, SoundWaves, Sparkles, Speech } from "./props";
import { Thing } from "./things";

/*
  "Names Have Sounds": one living picture per page (12 pages) at English Club. Teacher Meron's
  letter cards show the big and the little letter (Aa); each friend's name card has its first
  letter in color, so the child sees the letter that makes the sound. On the "name and sound"
  pages a card shows both: the letter's NAME ("gee") and its SOUND ("g").
  Keyframes: ./kit.css (efw-*) and ./name-sounds.css (ns-*).
*/

const LETTER: Record<string, string> = { A: "#E8513B", G: "#2E9A5B", H: "#2F6FD0", L: "#C99A00", M: "#8E5BE0" };
const ANDIKA = "var(--font-andika), var(--font-grandstander), sans-serif";

/** A name card: the name in English with its first letter in color. */
function NameCard({ x, y, name, delay = 0.8, rot = 0 }: { x: number; y: number; name: string; delay?: number; rot?: number }) {
  const first = name[0];
  const w = name.length * 10 + 24;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="wiggle" sound="chime">
          <rect x={-w / 2} y={-14} width={w} height={28} rx={6} fill="#FFFDF6" stroke={LETTER[first] ?? "#2A1A10"} strokeWidth={2.4} />
          <text x={0} y={6} fontSize={17} fontFamily={ANDIKA} fontWeight={700} fill="#2A1A10" textAnchor="middle">
            <tspan fill={LETTER[first] ?? "#2A1A10"} fontSize={20}>
              {first}
            </tspan>
            {name.slice(1)}
          </text>
        </Tappable>
      </g>
    </g>
  );
}

/** A card with a letter's NAME and its SOUND, side by side. */
function NameAndSound({ x, y, letter, name, sound, delay = 0.8 }: { x: number; y: number; letter: string; name: string; sound: string; delay?: number }) {
  const c = LETTER[letter] ?? "#2A1A10";
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <rect x={-92} y={-34} width={184} height={70} rx={12} fill="#FFFDF6" stroke={c} strokeWidth={3} />
        <text x={-62} y={14} fontSize={40} fontFamily={ANDIKA} fontWeight={700} fill={c} textAnchor="middle">
          {letter}
          {letter.toLowerCase()}
        </text>
        <text x={14} y={-10} fontSize={11} fontFamily={FONT} fontWeight={800} fill="#7A6A5A" textAnchor="middle">
          name
        </text>
        <text x={14} y={14} fontSize={17} fontFamily={FONT} fontWeight={900} fill="#2A1A10" textAnchor="middle">
          ‘{name}’
        </text>
        <text x={62} y={-10} fontSize={11} fontFamily={FONT} fontWeight={800} fill="#7A6A5A" textAnchor="middle">
          sound
        </text>
        <g className="lali-pop-in" style={vars({ "--delay": `${delay + 1}s` })}>
          <text x={62} y={14} fontSize={17} fontFamily={FONT} fontWeight={900} fill={c} textAnchor="middle">
            ‘{sound}’
          </text>
        </g>
        <path d="M-30 -24 V26 M38 -24 V26" stroke="#EADFCF" strokeWidth={1.4} />
      </g>
    </g>
  );
}

/** Teacher Meron at the right, holding up a letter card. */
function Meron({ letter, mood = "happy" }: { letter?: string; mood?: "happy" | "joy" }) {
  return (
    <g>
      <Place x={348} y={292} s={0.46} flip tap={TAP.mama}>
        <Teacher mood={mood} pose={letter ? "wave" : "sit"} />
      </Place>
      {letter && <LetterCard x={300} y={120} letter={letter} color={LETTER[letter]} s={1.2} say delay={0.5} />}
    </g>
  );
}

export default function NameSounds({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // "Every name starts with a letter, and every letter makes a sound."
    case 0:
      return (
        <g>
          <Club id={id} time="day">
            <Board x={300} y={96} lines={["Aa  Gg  Hh", "Ll  Mm"]} size={17} w={140} />
            <Place x={140} y={290} s={0.34} tap={TAP.cub}>
              <Cub mood="happy" />
            </Place>
            <Place x={190} y={292} s={0.34} tap={TAP.gugu}>
              <Gugu mood="joy" />
            </Place>
            <Place x={238} y={290} s={0.32} tap={TAP.hawi}>
              <Wolf mood="happy" />
            </Place>
            <Place x={288} y={292} s={0.36} flip tap={TAP.ayan}>
              <Camel who="ayan" mood="happy" />
            </Place>
            <Place x={360} y={292} s={0.42} flip tap={TAP.mama}>
              <Teacher mood="joy" pose="point" />
            </Place>
          </Club>
          <Air kind="day" seed={2} />
        </g>
      );
    // A says "a": Anbessa! Ayan!
    case 1:
      return (
        <g>
          <Club id={id} time="day">
            <Meron letter="A" />
            <Place x={140} y={292} s={0.46} className="lali-hop" tap={TAP.cub}>
              <Cub mood="joy" arm="up" />
            </Place>
            <Place x={232} y={292} s={0.44} flip tap={TAP.ayan}>
              <Camel who="ayan" mood="joy" />
            </Place>
            <NameCard x={140} y={170} name="Anbessa" delay={1.4} rot={-3} />
            <NameCard x={226} y={140} name="Ayan" delay={2.4} rot={3} />
            <SoundWaves x={168} y={210} color={LETTER.A} />
          </Club>
          <Air kind="day" seed={3} />
        </g>
      );
    // H says "h", a little puff: Hawi! Haben!
    case 2:
      return (
        <g>
          <Club id={id} time="morning">
            <Meron letter="H" />
            <Place x={150} y={292} s={0.42} tap={TAP.hawi}>
              <Wolf mood="joy" arm="wave" />
            </Place>
            <Place x={222} y={292} s={0.42} flip tap={TAP.haben}>
              <Ibex mood="joy" pose="wave" />
            </Place>
            <g className="ns-puff">
              <circle cx={176} cy={232} r={6} fill="#fff" opacity={0.8} />
              <circle cx={184} cy={226} r={8} fill="#fff" opacity={0.7} />
              <circle cx={194} cy={222} r={5} fill="#fff" opacity={0.6} />
            </g>
            <NameCard x={130} y={160} name="Hawi" delay={1.4} rot={-3} />
            <NameCard x={226} y={150} name="Haben" delay={2.4} rot={3} />
            <Sparkles x={186} y={206} r={20} delay={2.8} n={5} />
          </Club>
          <Air kind="day" seed={4} />
        </g>
      );
    // L says "l": Lali! A loop-the-loop.
    case 3:
      return (
        <g>
          <Club id={id} time="day">
            <Meron letter="L" />
            <BeeFlight path="M120 190 C120 120 230 120 230 180 C230 230 150 230 160 190 C170 150 240 150 220 200" dur={5} s={1.4} rest={[170, 180]} trailColor="#C99A00" happy />
            <NameCard x={170} y={100} name="Lali" delay={1.2} />
            <Place x={120} y={292} s={0.34} tap={TAP.cub}>
              <Cub mood="wow" look={2} />
            </Place>
            <g transform="translate(232 268)">
              <g className="lali-pop-in" style={vars({ "--delay": "2s" })}>
              <Thing id="lion" s={0.6} />
              </g>
            </g>
          </Club>
          <Air kind="day" seed={5} />
        </g>
      );
    // M says "mmm": Meron! Like yummy food.
    case 4:
      return (
        <g>
          <Club id={id} time="day">
            <Meron letter="M" mood="joy" />
            <NameCard x={200} y={110} name="Meron" delay={1.4} />
            <g transform="translate(180 210)">
              <g className="lali-pop-in" style={vars({ "--delay": "2s" })}>
              <Thing id="mango" s={0.6} />
              </g>
            </g>
            <SayBubble x={226} y={170} lines={["mmm!"]} size={18} tail="right" delay={2.6} color={LETTER.M} />
            <Place x={110} y={292} s={0.38} tap={TAP.cub}>
              <Cub mood="joy" />
            </Place>
          </Club>
          <Air kind="day" seed={6} />
        </g>
      );
    // G: "G says GEE! Gee, gee… JUGU!" Everyone laughs.
    case 5:
      return (
        <g>
          <Club id={id} time="day">
            <Meron letter="G" />
            <Place x={180} y={292} s={0.5} className="lali-hop" tap={TAP.gugu}>
              <Gugu mood="joy" pose="wave" />
            </Place>
            <SayBubble x={180} y={130} lines={["GEE! Gee, gee…", "JUGU!"]} size={14} tail="down" delay={0.8} color="#7A3E1D" />
            <Place x={86} y={290} s={0.3} tap={TAP.cub}>
              <Cub mood="joy" />
            </Place>
            <Place x={250} y={290} s={0.3} tap={TAP.hawi}>
              <Wolf mood="joy" />
            </Place>
            <Sign x={240} y={110} kind="?" delay={2.2} />
          </Club>
          <Air kind="day" seed={7} />
        </g>
      );
    // "My name isn't Jugu. G must be broken!"
    case 6:
      return (
        <g>
          <Club id={id} time="day">
            <Place x={190} y={294} s={0.56} tap={TAP.gugu}>
              <Gugu mood="sad" />
            </Place>
            <g className="ns-crack">
              <LetterCard x={300} y={130} letter="G" color={LETTER.G} s={1.3} delay={0.4} />
              <path d="M300 96 L292 116 L304 126 L294 146 L300 164" stroke="#2A1A10" strokeWidth={2.4} fill="none" className="lali-pop-in" style={vars({ "--delay": "1.4s" })} />
            </g>
            <NameCard x={100} y={150} name="Jugu?" delay={1.8} rot={-6} />
          </Club>
          <Air kind="day" seed={8} />
        </g>
      );
    // Anbessa: "A's name is 'ay', but in my name it says 'a'…"
    case 7:
      return (
        <g>
          <Club id={id} time="day">
            <Place x={110} y={294} s={0.5} tap={TAP.cub}>
              <Cub mood="happy" look={3} />
            </Place>
            <Speech x={260} y={120} w={210} h={92} think tail="left" delay={0.4}>
              <g transform="scale(1.0)">
                <NameAndSound x={0} y={0} letter="A" name="ay" sound="a" delay={0.8} />
              </g>
            </Speech>
            <Sign x={150} y={180} kind="!" delay={3} color="#F5B21E" />
          </Club>
          <Air kind="day" seed={9} />
        </g>
      );
    // Teacher Meron: G's NAME is "gee"; G's SOUND is "g".
    case 8:
      return (
        <g>
          <Club id={id} time="day">
            <NameAndSound x={220} y={96} letter="G" name="gee" sound="g" delay={0.6} />
            <Place x={348} y={292} s={0.46} flip tap={TAP.mama}>
              <Teacher mood="joy" pose="point" />
            </Place>
            <Place x={130} y={292} s={0.42} tap={TAP.cub}>
              <Cub mood="joy" />
            </Place>
            <Place x={230} y={294} s={0.44} tap={TAP.gugu}>
              <Gugu mood="wow" />
            </Place>
          </Club>
          <Air kind="day" seed={10} />
        </g>
      );
    // "g, g… GUGU!" G for goat, G for gelada!
    case 9:
      return (
        <g>
          <Club id={id} time="day">
            <Place x={200} y={292} s={0.52} className="ns-flip" tap={TAP.gugu}>
              <Gugu mood="joy" pose="hop" />
            </Place>
            <NameCard x={200} y={92} name="Gugu" delay={0.6} />
            <LetterCard x={90} y={110} letter="G" color={LETTER.G} delay={1} say />
            <g transform="translate(320 240)">
              <g className="lali-pop-in" style={vars({ "--delay": "1.8s" })}>
              <Thing id="goat" s={0.7} />
              </g>
            </g>
            <Sparkles x={200} y={200} r={80} delay={1.2} n={8} />
          </Club>
          <Air kind="day" seed={11} />
        </g>
      );
    // The name cards go up on the warka tree.
    case 10:
      return (
        <g>
          <Club id={id} time="day">
            <NameCard x={60} y={96} name="Anbessa" delay={0.4} rot={-4} />
            <NameCard x={140} y={80} name="Ayan" delay={0.8} rot={3} />
            <NameCard x={40} y={140} name="Gugu" delay={1.2} rot={2} />
            <NameCard x={124} y={130} name="Hawi" delay={1.6} rot={-3} />
            <NameCard x={84} y={176} name="Haben" delay={2} rot={4} />
            <NameCard x={160} y={168} name="Lali" delay={2.4} rot={-2} />
            <NameCard x={226} y={120} name="Meron" delay={2.8} rot={3} />
            <Place x={260} y={292} s={0.4} tap={TAP.cub}>
              <Cub mood="joy" arm="up" />
            </Place>
            <Place x={330} y={292} s={0.4} flip tap={TAP.gugu}>
              <Gugu mood="joy" pose="wave" />
            </Place>
          </Club>
          <Air kind="day" seed={12} />
        </g>
      );
    // The name-sound game all the way home.
    default:
      return (
        <g>
          <Club id={id} time="evening">
            <Place x={140} y={292} s={0.36} from={[40, 292]} delay={0.4} tap={TAP.cub}>
              <Cub mood="joy" />
            </Place>
            <Place x={196} y={292} s={0.38} from={[96, 292]} delay={0.5} tap={TAP.gugu}>
              <Gugu mood="joy" pose="wave" />
            </Place>
            <Place x={250} y={292} s={0.34} from={[150, 292]} delay={0.6} tap={TAP.hawi}>
              <Wolf mood="joy" wag />
            </Place>
            <BeeHover x={300} y={200} s={0.9} />
            {(["A", "G", "H", "L", "M"] as const).map((l, i) => (
              <g key={l} className="ns-bob" style={vars({ "--delay": `${-i * 0.4}s` })}>
                <LetterCard x={90 + i * 56} y={90} letter={l} color={LETTER[l]} s={0.8} delay={1 + i * 0.4} />
              </g>
            ))}
          </Club>
          <Air kind="dusk" seed={13} />
        </g>
      );
  }
}
