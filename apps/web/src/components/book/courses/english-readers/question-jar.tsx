"use client";

import "./question-jar.css";

import { useId, type ReactNode } from "react";

import { Mountains, Place, Sheep, Tukul, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { FONT, TAP, Teacher, Wolf } from "./cast";
import { Label, Paper } from "./more";
import { Club, Home } from "./places";
import { Hearts, Notes, SayBubble, Sign, Speech } from "./props";
import { Thing } from "./things";

/*
  "The Question Jar": one living picture per page (12 pages), mostly by Grandpa Tolosa's fire. The
  six question words are on painted sticks in a jar; as Hawi pulls each one out, Grandpa's memory
  appears in a picture bubble: the round house high in the Bale Mountains, the long walk to school
  over the hills, his friend Chala, and hide and seek with the sheep.
  Keyframes: ./kit.css, ./more.css and ./question-jar.css (qjr-*).
*/

const WORDS = ["Who?", "What?", "Where?", "When?", "Why?", "How?"];
const COLORS = ["#E8413B", "#2E9A5B", "#2F6FD0", "#F5B21E", "#8E5BE0", "#D9662B"];

const Hawi = ({ x = 130, y = 294, s = 0.42, mood = "happy" as "happy" | "joy" | "wow" | "worried", arm, flip = false }: { x?: number; y?: number; s?: number; mood?: "happy" | "joy" | "wow" | "worried"; arm?: "wave" | "give" | "bless"; flip?: boolean }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.hawi}>
    <Wolf mood={mood} arm={arm} />
  </Place>
);
const Grandpa = ({ x = 300, y = 292, s = 0.48, mood = "happy" as "happy" | "joy" }) => (
  <Place x={x} y={y} s={s} flip tap={TAP.elder}>
    <Wolf elder mood={mood} />
  </Place>
);

/** The jar of question sticks; `out` is the word just pulled out (held up beside it). */
function Jar({ x, y, out, delay = 0.3 }: { x: number; y: number; out?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="wiggle" sound="chime">
          {WORDS.map((w, i) =>
            i === out ? null : <path key={w} d={`M${-14 + i * 6} 10 L${-18 + i * 7} -40`} stroke={COLORS[i]} strokeWidth={4} strokeLinecap="round" />,
          )}
          <rect x={-24} y={-20} width={48} height={52} rx={10} fill="#BFE6FA" fillOpacity={0.75} stroke="#2A1A10" strokeWidth={1.6} />
          <rect x={-20} y={-26} width={40} height={8} rx={3} fill="#9C6A3A" />
        </Tappable>
      </g>
      {out !== undefined && (
        <g transform="translate(46 -40)">
          <g className="qjr-pull">
            <rect x={-30} y={-13} width={60} height={26} rx={6} fill={COLORS[out]} />
            <text y={5} fontSize={14} fontFamily={FONT} fontWeight={900} fill="#FFFFFF" textAnchor="middle">
              {WORDS[out]}
            </text>
          </g>
        </g>
      )}
    </g>
  );
}

/** By the fire at Grandpa's: Hawi, Grandpa, the jar, and a memory bubble. */
function Fireside({ id, out, memory, question }: { id: string; out?: number; memory?: ReactNode; question?: string }) {
  return (
    <Home id={id} time="night">
      <g transform="translate(205 274)">
        <Thing id="fire" s={0.55} />
      </g>
      <Jar x={150} y={238} out={out} />
      <Hawi x={95} s={0.38} mood="wow" />
      <Grandpa x={310} />
      {question && <SayBubble x={120} y={170} lines={[question]} size={11} tail="down" delay={0.6} />}
      {memory && (
        <Speech x={248} y={86} w={150} h={96} think delay={1.2}>
          {memory}
        </Speech>
      )}
    </Home>
  );
}

export default function QuestionJar({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Teacher Meron's project: someone's childhood.
    case 0:
      return (
        <g>
          <Club id={id} time="day">
            <Paper x={250} y={90} lines={["Find out about", "someone's childhood."]} size={13} delay={0.4} />
            <Place x={320} y={294} s={0.44} flip tap={TAP.mama}>
              <Teacher mood="joy" pose="point" />
            </Place>
            <Hawi x={170} mood="joy" arm="wave" />
          </Club>
        </g>
      );
    // "It was a long time ago." And that was all. An empty page.
    case 1:
      return (
        <g>
          <Home id={id} time="evening">
            <Paper x={150} y={110} lines={["", "", ""]} w={90} size={13} delay={0.4} />
            <Hawi x={130} mood="worried" />
            <Grandpa x={290} />
            <SayBubble x={280} y={150} lines={["It was a long", "time ago."]} size={12} tail="down" delay={0.8} />
          </Home>
        </g>
      );
    // "A big question gets a small answer. I need small questions!"
    case 2:
      return (
        <g>
          <Home id={id} time="evening">
            {WORDS.map((w, i) => (
              <g key={w} transform={`translate(${90 + i * 44} ${110 + (i % 2) * 18}) rotate(${(i - 2.5) * 8})`}>
                <g className="lali-pop-in" style={vars({ "--delay": `${0.4 + i * 0.25}s` })}>
                  <rect x={-20} y={-11} width={40} height={22} rx={5} fill={COLORS[i]} />
                  <text y={4} fontSize={10} fontFamily={FONT} fontWeight={900} fill="#FFFFFF" textAnchor="middle">
                    {w}
                  </text>
                </g>
              </g>
            ))}
            <Hawi x={200} mood="joy" arm="give" />
            <Sign x={230} y={190} kind="!" delay={0.2} color="#F5B21E" />
          </Home>
        </g>
      );
    // "Pick a stick, ask, and listen!"
    case 3:
      return (
        <g>
          <Home id={id} time="night">
            <Jar x={200} y={180} delay={0.3} />
            <Label x={200} y={90} text="Pick a stick, ask, and listen!" delay={1} size={13} rot={0} />
            <Hawi x={110} mood="joy" />
            <Grandpa x={300} mood="joy" />
          </Home>
        </g>
      );
    // WHERE: high in the Bale Mountains, in a round house, with five brothers.
    case 4:
      return (
        <g>
          <Fireside
            id={id}
            out={2}
            question="Where did you live?"
            memory={
              <g transform="translate(-75 -48) scale(0.375)">
                <rect width={400} height={256} rx={30} fill="#9FD4FF" />
                <Mountains far="#B7C6E6" mid="#8EA8D4" snow />
                <path d="M0 200 Q200 160 400 190 V256 H0Z" fill="#8FCB80" />
                <Tukul x={200} y={210} s={1.2} />
              </g>
            }
          />
        </g>
      );
    // WHEN: when I was seven; the school was far away.
    case 5:
      return (
        <g>
          <Fireside
            id={id}
            out={3}
            question="When did you start school?"
            memory={
              <g>
                <text x={-30} y={14} fontSize={40} fontFamily={FONT} fontWeight={900} fill="#F5B21E" textAnchor="middle">
                  7
                </text>
                <g transform="translate(30 4) scale(0.5)">
                  <Thing id="book" />
                </g>
              </g>
            }
          />
        </g>
      );
    // HOW: I walked, two hours, over the hills, every day.
    case 6:
      return (
        <g>
          <Fireside
            id={id}
            out={5}
            question="How did you get there?"
            memory={
              <g>
                <path d="M-70 30 Q-30 -20 0 10 T70 0" stroke="#8FCB80" strokeWidth={14} fill="none" />
                <path d="M-70 30 Q-30 -20 0 10 T70 0" stroke="#C9A06A" strokeWidth={3} strokeDasharray="5 4" fill="none" />
                <g className="qjr-walk">
                  <g transform="translate(-60 20) scale(0.16) translate(-100 -230)">
                    <Wolf mood="happy" />
                  </g>
                </g>
              </g>
            }
          />
        </g>
      );
    // WHY: because I wanted to read, more than anything.
    case 7:
      return (
        <g>
          <Fireside
            id={id}
            out={4}
            question="Why did you walk so far?"
            memory={
              <g>
                <g transform="scale(0.7)">
                  <Thing id="book" />
                </g>
                <Hearts spots={[[30, -10, 1.6], [42, -22, 2]]} s={0.6} />
              </g>
            }
          />
        </g>
      );
    // WHO: Chala; they sang all the way to school.
    case 8:
      return (
        <g>
          <Fireside
            id={id}
            out={0}
            question="Who was your best friend?"
            memory={
              <g>
                <g transform="translate(-24 34) scale(0.2) translate(-100 -230)">
                  <Wolf mood="joy" />
                </g>
                <g transform="translate(24 34) scale(-0.2 0.2) translate(-100 -230)">
                  <Wolf mood="joy" dress="#2F6FD0" />
                </g>
                <Notes x={0} y={-20} color="#8E5BE0" n={3} />
              </g>
            }
          />
        </g>
      );
    // WHAT: hide and seek with the sheep. The sheep always won.
    case 9:
      return (
        <g>
          <Fireside
            id={id}
            out={1}
            question="What did you play?"
            memory={
              <g>
                <Sheep x={-30} y={26} s={0.5} />
                <Sheep x={30} y={30} s={0.5} flip hop />
                <rect x={-8} y={-30} width={16} height={56} rx={4} fill="#7A5236" />
              </g>
            }
          />
        </g>
      );
    // Grandpa tells stories until the fire goes low. Hawi's page is full.
    case 10:
      return (
        <g>
          <Home id={id} time="night">
            <g transform="translate(205 280)">
              <g opacity={0.6}>
                <Thing id="fire" s={0.4} />
              </g>
            </g>
            <Paper x={150} y={110} lines={["He lived in Bale.", "He walked to school.", "His friend was Chala."]} size={11} delay={0.4} />
            <Hawi x={110} mood="joy" />
            <Grandpa x={300} mood="joy" />
            <Hearts spots={[[230, 190, 1.6], [246, 176, 2]]} />
          </Home>
        </g>
      );
    // Who? What? Where? When? Why? How?
    default:
      return (
        <g>
          <Home id={id} time="evening">
            {WORDS.map((w, i) => (
              <g key={w} transform={`translate(${100 + (i % 3) * 100} ${70 + Math.floor(i / 3) * 40})`}>
                <g className="lali-pop-in" style={vars({ "--delay": `${0.3 + i * 0.2}s` })}>
                  <rect x={-34} y={-14} width={68} height={28} rx={7} fill={COLORS[i]} />
                  <text y={6} fontSize={15} fontFamily={FONT} fontWeight={900} fill="#FFFFFF" textAnchor="middle">
                    {w}
                  </text>
                </g>
              </g>
            ))}
            <Jar x={200} y={240} />
            <Hawi x={110} mood="joy" arm="wave" />
            <Grandpa x={300} mood="joy" />
          </Home>
        </g>
      );
  }
}
