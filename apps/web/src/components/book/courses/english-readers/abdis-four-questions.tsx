"use client";

import "./abdis-four-questions.css";

import { useId, type ReactNode } from "react";

import { Air, Place, vars } from "../../scenery";
import { Camel, FONT, TAP, Wolf } from "./cast";
import { Field, Label } from "./more";
import { Hearts, SayBubble, Sign } from "./props";
import { Thing } from "./things";

/*
  "Abdi's Four Questions": one living picture per page (12 pages), on the school field. The four
  questions are four numbered cards Ayan gives Abdi; each lights up when he asks it, and Lensa's
  answers come back in speech bubbles.
  Keyframes: ./kit.css, ./more.css and ./abdis-four-questions.css (afq-*).
*/

const ORANGE = "#F08A24";
const QS = ["What's your name?", "How old are you?", "Where do you live?", "Do you want to play?"];

type M = "happy" | "joy" | "wow" | "worried";
const Ayan = ({ x = 200, y = 294, s = 0.44, mood = "happy" as M, flip = false }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.ayan}>
    <Camel who="ayan" mood={mood} />
  </Place>
);
const Abdi = ({ x = 200, y = 296, s = 0.38, mood = "happy" as M, flip = false, className, item }: { x?: number; y?: number; s?: number; mood?: M; flip?: boolean; className?: string; item?: ReactNode }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.ayan} className={className}>
    <Camel who="abdi" mood={mood} item={item} />
  </Place>
);
const Lensa = ({ x = 280, y = 294, s = 0.4, mood = "happy" as M, flip = true, arm }: { x?: number; y?: number; s?: number; mood?: M; flip?: boolean; arm?: "wave" | "give" | "bless" }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.hawi}>
    <Wolf mood={mood} dress="#E8413B" arm={arm} />
  </Place>
);

/** The four question cards; `on` lights one, `done` how many are already asked. */
function Cards({ on = -1, done = 0, y = 54, delay = 0.2 }: { on?: number; done?: number; y?: number; delay?: number }) {
  return (
    <g>
      {QS.map((q, i) => (
        <g key={q} transform={`translate(${i % 2 ? 260 : 140} ${y + Math.floor(i / 2) * 34})`}>
          <g className="lali-pop-in" style={vars({ "--delay": `${delay + i * 0.2}s` })}>
            <g className={i === on ? "afq-on" : undefined}>
              <rect x={-58} y={-13} width={116} height={26} rx={7} fill={i < done ? "#E4F7EA" : "#FFFDF6"} stroke={i === on ? ORANGE : "#D8C8A8"} strokeWidth={i === on ? 3 : 1.6} />
              <text x={-50} y={4} fontSize={10} fontFamily={FONT} fontWeight={900} fill={ORANGE}>
                {i + 1}
              </text>
              <text x={4} y={4} fontSize={9.5} fontFamily={FONT} fontWeight={800} fill="#2A1A10" textAnchor="middle">
                {q}
              </text>
            </g>
          </g>
        </g>
      ))}
    </g>
  );
}

/** The swing on its frame. */
const Swing = ({ x }: { x: number }) => (
  <g transform={`translate(${x} 0)`}>
    <path d="M-40 290 L-26 150 H26 L40 290" stroke="#7A5236" strokeWidth={5} fill="none" />
    <g transform="translate(0 150)">
      <g className="enr-swing" style={vars({ "--ox": "50%", "--oy": "0%", "--dur": "2.4s" })}>
        <path d="M-12 0 V96 M12 0 V96" stroke="#5A4A3A" strokeWidth={1.6} />
        <rect x={-18} y={94} width={36} height={6} rx={2} fill="#9C6A3A" />
      </g>
    </g>
  </g>
);

export default function AbdisFourQuestions({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Abdi's first day at big school. "I don't know anyone."
    case 0:
      return (
        <g>
          <Field id={id} time="morning">
            <Ayan x={150} mood="happy" />
            <Abdi x={220} mood="worried" />
            <SayBubble x={240} y={190} lines={["I don't know", "anyone."]} size={12} tail="down" delay={0.8} />
          </Field>
          <Air kind="day" seed={2} grass={false} />
        </g>
      );
    // "Ask, listen, smile!"
    case 1:
      return (
        <g>
          <Field id={id} time="morning">
            <Label x={130} y={70} text="Ask" delay={0.4} size={18} />
            <Label x={200} y={84} text="listen" delay={0.8} size={18} rot={4} />
            <Label x={280} y={70} text="smile!" delay={1.2} size={18} />
            <Ayan x={150} mood="joy" />
            <Abdi x={240} mood="wow" flip />
          </Field>
          <Air kind="day" seed={3} grass={false} />
        </g>
      );
    // The four questions, again and again.
    case 2:
      return (
        <g>
          <Field id={id} time="morning">
            <Cards delay={0.3} />
            <Ayan x={140} mood="happy" />
            <Abdi x={240} mood="happy" flip className="afq-mouth" />
          </Field>
          <Air kind="day" seed={4} grass={false} />
        </g>
      );
    // A girl alone on the swing. Abdi takes a big breath.
    case 3:
      return (
        <g>
          <Field id={id}>
            <Swing x={280} />
            <Lensa x={280} y={262} s={0.32} mood="happy" />
            <Abdi x={130} mood="worried" className="afq-breath" />
          </Field>
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    // "Hello! What's your name?" "My name is Lensa."
    case 4:
      return (
        <g>
          <Field id={id}>
            <Cards on={0} />
            <Abdi x={140} mood="happy" />
            <Lensa x={270} mood="joy" />
            <SayBubble x={270} y={190} lines={["My name is Lensa."]} size={12} tail="down" delay={1} />
          </Field>
          <Air kind="day" seed={6} grass={false} />
        </g>
      );
    // "How old are you?" "I'm six." "I'm six too!"
    case 5:
      return (
        <g>
          <Field id={id}>
            <Cards on={1} done={1} />
            <Abdi x={140} mood="joy" />
            <Lensa x={270} mood="joy" />
            <SayBubble x={270} y={190} lines={["I'm six."]} size={13} tail="down" delay={0.8} />
            <SayBubble x={130} y={196} lines={["I'm six too!"]} size={13} tail="down" delay={1.8} />
          </Field>
          <Air kind="day" seed={7} grass={false} />
        </g>
      );
    // "Where do you live?" … then his mind goes blank.
    case 6:
      return (
        <g>
          <Field id={id}>
            <Cards on={2} done={2} />
            <Abdi x={140} mood="worried" />
            <Lensa x={270} mood="happy" />
            <Sign x={150} y={190} kind="?" delay={1.4} />
          </Field>
          <Air kind="day" seed={8} grass={false} />
        </g>
      );
    // He sees a ball: "Do you want to play?" "Yes, please!"
    case 7:
      return (
        <g>
          <Field id={id}>
            <Cards on={3} done={3} />
            <g transform="translate(210 274)">
              <g className="lali-pop-in" style={vars({ "--delay": "0.4s" })}>
                <Thing id="ball" s={0.3} />
              </g>
            </g>
            <Abdi x={140} mood="joy" />
            <Lensa x={270} mood="joy" arm="wave" />
            <SayBubble x={270} y={190} lines={["Yes, please!"]} size={14} tail="down" delay={1.2} />
          </Field>
          <Air kind="day" seed={9} grass={false} />
        </g>
      );
    // They play until the bell. "What's your favorite color?" "Green!"
    case 8:
      return (
        <g>
          <Field id={id}>
            <g transform="translate(200 250)">
              <g className="afq-ball">
                <Thing id="ball" s={0.28} />
              </g>
            </g>
            <Abdi x={120} mood="joy" />
            <Lensa x={290} mood="joy" />
            <SayBubble x={280} y={180} lines={["What's your", "favorite color?"]} size={11} tail="down" delay={0.6} />
            <SayBubble x={120} y={180} lines={["Green!"]} size={14} tail="down" delay={1.6} color="#2E9A5B" />
          </Field>
          <Air kind="day" seed={10} grass={false} />
        </g>
      );
    // After school: "Her name is Lensa. She's six, and she lives near Hawi."
    case 9:
      return (
        <g>
          <Field id={id} time="evening">
            <Ayan x={130} mood="happy" />
            <Abdi x={230} mood="joy" flip />
            <SayBubble x={230} y={170} lines={["Her name is Lensa.", "She's six!"]} size={12} tail="down" delay={0.6} />
          </Field>
          <Air kind="dusk" seed={11} grass={false} />
        </g>
      );
    // "I asked, I listened, and I smiled!"
    case 10:
      return (
        <g>
          <Field id={id} time="evening">
            <Ayan x={130} mood="wow" />
            <Abdi x={230} mood="joy" flip className="afq-proud" />
            <SayBubble x={230} y={170} lines={["I asked, I listened,", "and I smiled!"]} size={12} tail="down" delay={0.6} />
            <Hearts spots={[[180, 200, 1.4], [196, 186, 1.8]]} />
          </Field>
          <Air kind="dusk" seed={12} grass={false} />
        </g>
      );
    // Ask, listen, smile!
    default:
      return (
        <g>
          <Field id={id} time="evening">
            <Cards done={4} delay={0.3} />
            <Abdi x={140} mood="joy" />
            <Lensa x={270} mood="joy" arm="wave" />
          </Field>
          <Air kind="dusk" seed={13} grass={false} />
        </g>
      );
  }
}
