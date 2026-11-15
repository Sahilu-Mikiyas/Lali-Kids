"use client";

import "./pretend-clinic.css";

import { useId } from "react";

import { Air, Place, vars } from "../../scenery";
import { Cub, FONT, Gugu, TAP, Teacher, Tsehay } from "./cast";
import { Label } from "./more";
import { Club } from "./places";
import { Hearts, SayBubble, Sign } from "./props";
import { Thing } from "./things";

/*
  "Doctor Anbessa": one living picture per page (12 pages): the pretend clinic under the English
  Club's warka tree, with its little bed, the toy stethoscope, and the four question cards Teacher
  Meron hands over. Gugu hops in on one foot, Tsehay coughs, and the doctor wears a white coat.
  Keyframes: ./kit.css, ./more.css and ./pretend-clinic.css (pcl-*).
*/

const TEAL = "#0E8C80";
const QS = ["What's wrong?", "Where does it hurt?", "When did it start?", "How did it happen?"];
type M = "happy" | "joy" | "wow" | "worried" | "sad";

/** Anbessa, in a white doctor's coat when `coat`. */
const Doctor = ({ x = 150, y = 294, s = 0.44, mood = "happy" as M, coat = true, flip = false, arm = "none" as "none" | "reach" | "up" | "hold" | "give" }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.cub}>
    <g>
      <Cub mood={mood} arm={arm} />
      {coat && (
        <g>
          <path d="M62 160 Q100 150 138 160 L146 230 H54Z" fill="#FFFFFF" stroke="#C9C4D6" strokeWidth={2} opacity={0.95} />
          <path d="M100 156 V230" stroke="#C9C4D6" strokeWidth={2} />
          <g transform="translate(100 186) scale(0.5)">
            <Thing id="stethoscope" />
          </g>
        </g>
      )}
    </g>
  </Place>
);
const GuguAt = ({ x = 250, y = 294, s = 0.42, mood = "happy" as M, pose = "sit" as "sit" | "wave" | "point" | "hop" | "no", flip = true, className, bandage = false }: { x?: number; y?: number; s?: number; mood?: M; pose?: "sit" | "wave" | "point" | "hop" | "no"; flip?: boolean; className?: string; bandage?: boolean }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.gugu} className={className}>
    <g>
      <Gugu mood={mood} pose={pose} />
      {bandage && <rect x={120} y={214} width={22} height={14} rx={4} fill="#FFFDF6" stroke="#B9A58C" strokeWidth={2} />}
    </g>
  </Place>
);

/** The clinic: a little bed and a table with the stethoscope. */
const Clinic = () => (
  <g>
    <g transform="translate(320 250)">
      <rect x={-46} y={-14} width={92} height={18} rx={4} fill="#FFFDF6" stroke="#2A1A10" strokeWidth={1.4} />
      <rect x={-46} y={-26} width={22} height={14} rx={4} fill="#DDF2FF" stroke="#2A1A10" strokeWidth={1.2} />
      <path d="M-40 4 V24 M40 4 V24" stroke="#7A5236" strokeWidth={4} />
    </g>
  </g>
);

/** The four question cards in a column; `on` lights one. */
function Cards({ on = -1, x = 300, y = 70, delay = 0.3 }: { on?: number; x?: number; y?: number; delay?: number }) {
  return (
    <g>
      {QS.map((q, i) => (
        <g key={q} transform={`translate(${x} ${y + i * 30})`}>
          <g className="lali-pop-in" style={vars({ "--delay": `${delay + i * 0.25}s` })}>
            <rect x={-62} y={-12} width={124} height={24} rx={6} fill="#FFFDF6" stroke={i === on ? TEAL : "#D8C8A8"} strokeWidth={i === on ? 3 : 1.4} />
            <text y={4} fontSize={10.5} fontFamily={FONT} fontWeight={900} fill={i === on ? TEAL : "#2A1A10"} textAnchor="middle">
              {q}
            </text>
          </g>
        </g>
      ))}
    </g>
  );
}

export default function PretendClinic({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A pretend clinic. "Who wants to be the doctor?"
    case 0:
      return (
        <g>
          <Club id={id} time="day">
            <Clinic />
            <g transform="translate(210 230)">
              <g className="lali-pop-in" style={vars({ "--delay": "0.6s" })}>
                <Thing id="stethoscope" s={0.6} />
              </g>
            </g>
            <Place x={150} y={294} s={0.46} tap={TAP.mama}>
              <Teacher mood="joy" pose="point" />
            </Place>
            <SayBubble x={160} y={150} lines={["Who wants to", "be the doctor?"]} size={12} tail="down" delay={1} />
          </Club>
          <Air kind="day" seed={2} />
        </g>
      );
    // "Me!" Gugu hops in on one foot: "Ow, ow, OW!"
    case 1:
      return (
        <g>
          <Club id={id} time="day">
            <Clinic />
            <Doctor x={130} mood="joy" arm="up" />
            <GuguAt x={250} mood="sad" pose="hop" className="pcl-hop" />
            <SayBubble x={260} y={170} lines={["Ow, ow, OW!"]} size={14} tail="down" delay={0.6} color="#E8413B" />
          </Club>
          <Air kind="day" seed={3} />
        </g>
      );
    // He doesn't know what to say. "Um… ow?"
    case 2:
      return (
        <g>
          <Club id={id} time="day">
            <Clinic />
            <Doctor x={150} mood="worried" arm="reach" />
            <GuguAt x={240} mood="sad" />
            <SayBubble x={150} y={170} lines={["Um… ow?"]} size={14} tail="down" delay={0.6} />
            <Sign x={170} y={200} kind="?" delay={1.2} />
          </Club>
          <Air kind="day" seed={4} />
        </g>
      );
    // Four question cards.
    case 3:
      return (
        <g>
          <Club id={id} time="day">
            <Cards x={250} y={80} />
            <Place x={330} y={294} s={0.44} flip tap={TAP.mama}>
              <Teacher mood="joy" pose="point" />
            </Place>
            <Doctor x={150} mood="wow" />
          </Club>
          <Air kind="day" seed={5} />
        </g>
      );
    // "What's wrong?" "My foot hurts." "Where does it hurt?" "On my big toe."
    case 4:
      return (
        <g>
          <Club id={id} time="day">
            <Clinic />
            <Cards on={1} x={250} y={60} delay={0} />
            <Doctor x={140} mood="happy" />
            <GuguAt x={250} mood="worried" />
            <SayBubble x={250} y={186} lines={["Here, on my", "big toe."]} size={12} tail="down" delay={0.8} />
            <g transform="translate(280 286)">
              <circle r={12} fill="none" stroke="#E8413B" strokeWidth={2.4} className="pcl-pulse" />
            </g>
          </Club>
          <Air kind="day" seed={6} />
        </g>
      );
    // "How did it happen?" "I kicked a big rock!"
    case 5:
      return (
        <g>
          <Club id={id} time="day">
            <Cards on={3} x={250} y={60} delay={0} />
            <Doctor x={140} mood="wow" />
            <GuguAt x={250} mood="worried" />
            <Speech x={250} y={190} />
          </Club>
          <Air kind="day" seed={7} />
        </g>
      );
    // "Sit down, please." He wraps the toe. "Don't kick rocks!"
    case 6:
      return (
        <g>
          <Club id={id} time="day">
            <Clinic />
            <Doctor x={140} mood="joy" arm="give" />
            <GuguAt x={300} y={250} s={0.38} mood="happy" bandage />
            <SayBubble x={150} y={160} lines={["Sit down, please."]} size={12} tail="down" delay={0.6} />
          </Club>
          <Air kind="day" seed={8} />
        </g>
      );
    // Tsehay: "I have a cough." "When did it start?" "Yesterday."
    case 7:
      return (
        <g>
          <Club id={id} time="day">
            <Clinic />
            <Doctor x={140} mood="happy" />
            <Place x={250} y={294} s={0.42} flip tap={TAP.tsehay}>
              <g className="pcl-cough">
                <Tsehay mood="worried" />
              </g>
            </Place>
            <SayBubble x={250} y={170} lines={["I have a cough."]} size={12} tail="down" delay={0.6} />
            <Label x={150} y={90} text="When did it start?" delay={1.4} size={13} />
          </Club>
          <Air kind="day" seed={9} />
        </g>
      );
    // "Drink warm water and rest. If you still feel ill, go to the real clinic."
    case 8:
      return (
        <g>
          <Club id={id} time="day">
            <Clinic />
            <g transform="translate(200 220)">
              <Thing id="cup" s={0.4} />
              <path d="M-4 -16 q-4 -8 0 -14 M6 -16 q-4 -8 0 -14" stroke="#FFFFFF" strokeWidth={2} fill="none" className="enr-steam" />
            </g>
            <Doctor x={130} mood="happy" arm="give" />
            <Place x={270} y={294} s={0.42} flip tap={TAP.tsehay}>
              <Tsehay mood="happy" />
            </Place>
            <Place x={340} y={294} s={0.36} flip tap={TAP.mama}>
              <Teacher mood="joy" />
            </Place>
          </Club>
          <Air kind="day" seed={10} />
        </g>
      );
    // Doctor Gugu: "Where does it hurt?" Anbessa: "At the end!" (of his tail)
    case 9:
      return (
        <g>
          <Club id={id} time="day">
            <Clinic />
            <Doctor x={250} mood="sad" coat={false} flip />
            <GuguAt x={140} mood="joy" flip={false} />
            <g transform="translate(140 220) scale(0.6)">
              <Thing id="stethoscope" />
            </g>
            <SayBubble x={130} y={150} lines={["Where does", "it hurt?"]} size={12} tail="down" delay={0.4} />
            <SayBubble x={260} y={170} lines={["At the end!"]} size={12} tail="down" delay={1.4} />
          </Club>
          <Air kind="day" seed={11} />
        </g>
      );
    // "YOU stood on it!" "Oh! Sorry!"
    case 10:
      return (
        <g>
          <Club id={id} time="day">
            <Doctor x={250} mood="joy" coat={false} flip />
            <GuguAt x={140} mood="wow" flip={false} className="pcl-shy" />
            <SayBubble x={260} y={170} lines={["YOU stood on it!"]} size={12} tail="down" delay={0.4} />
            <SayBubble x={130} y={170} lines={["Oh! Sorry!"]} size={13} tail="down" delay={1.4} />
            <Place x={340} y={294} s={0.36} flip tap={TAP.mama}>
              <Teacher mood="joy" />
            </Place>
            <Hearts spots={[[200, 160, 2], [216, 146, 2.4]]} />
          </Club>
          <Air kind="day" seed={12} />
        </g>
      );
    // Where does it hurt? When did it start?
    default:
      return (
        <g>
          <Club id={id} time="evening">
            <Cards x={250} y={70} />
            <Doctor x={140} mood="joy" arm="up" />
            <GuguAt x={250} y={296} s={0.36} mood="joy" bandage />
          </Club>
          <Air kind="dusk" seed={13} />
        </g>
      );
  }
}

/** Gugu's answer about the rock, with the rock drawn beside it. */
function Speech({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <SayBubble x={x} y={y} lines={["I kicked a", "big rock!"]} size={12} tail="down" delay={0.6} />
      <g transform={`translate(${x + 70} ${y + 70}) scale(0.5)`}>
        <Thing id="rock" />
      </g>
    </g>
  );
}
