"use client";

import "./habens-bones.css";

import { useId, type ReactNode } from "react";

import { Air, NumberBadge, Place } from "../../scenery";
import { Gugu, Ibex, TAP, Teacher, Tsehay } from "./kit-cast";
import { BendingArm, BodyChart } from "./kit-body";
import { Pop } from "./kit-life";
import { Classroom } from "./kit-more";
import { SimienEdge } from "./kit-land";
import { Sign, Sparkles, Speech } from "./kit-props";

/*
  "Haben's Bones": one living picture per page (12 pages). Haben leaping on the rocks: why not
  floppy? Teacher Meron's X-ray poster: the skeleton holds us up; the skull and the ribs protect;
  "Can you bend a bone?"; joints, like a door hinge; Gugu's stiff arm and the injera; the muscle
  that pulls; muscles in pairs; the jump that falls short; crouch and push, onto the rock; bones
  grow and mend, 206 of them; leaping home. Keyframes: kit.css, kit-science.css and
  ./habens-bones.css.
*/

/** Big rocks on the hillside. */
function Rocks({ big = true }: { big?: boolean }) {
  return (
    <g>
      <path d="M40 262 Q46 226 84 222 Q120 222 126 262Z" fill="#9A949E" />
      <path d="M150 264 Q158 236 190 234 Q220 236 224 264Z" fill="#8A8490" />
      {big && <path d="M250 264 Q252 190 300 180 Q352 182 356 264Z" fill="#A8A2AC" />}
      {big && <path d="M268 210 Q300 196 330 204" stroke="#FFFFFF" strokeWidth={3} fill="none" opacity={0.4} />}
    </g>
  );
}

/** The X-ray poster on the classroom wall (over the board). */
function Poster({ layer = "bones", glow, children }: { layer?: "bones" | "muscles" | "inside" | "skin"; glow?: string; children?: ReactNode }) {
  return (
    <g>
      <rect x={140} y={22} width={120} height={150} rx={6} fill="#14283E" stroke="#FFFFFF" strokeWidth={4} />
      <BodyChart x={200} y={164} s={0.68} layer={layer} glow={glow} />
      {children}
    </g>
  );
}

export default function HabensBones({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Haben leaps from rock to rock, then stops: "Why don't I go all floppy, like a rope?"
    case 0:
      return (
        <g>
          <SimienEdge id={id} time="morning">
            <Rocks />
          </SimienEdge>
          <g className="shb-leap">
            <Place x={0} y={0} s={0.42} tap={TAP.haben}>
              <Ibex mood="joy" pose="wave" />
            </Place>
          </g>
          <Pop x={200} y={110} delay={1.6}>
            <path d="M-30 0 q8 -14 16 0 t16 0 t16 0 t16 0" stroke="#C9A06A" strokeWidth={5} fill="none" strokeLinecap="round" />
          </Pop>
          <Sign x={250} y={100} kind="?" delay={2} />
          <Air kind="day" seed={2} />
        </g>
      );
    // Teacher Meron's poster: an X-ray of a child, with the skeleton inside. Bones hold us up.
    case 1:
      return (
        <g>
          <Classroom id={id}>
            <Poster />
          </Classroom>
          <Place x={330} y={290} s={0.46} flip tap={TAP.mama}>
            <Teacher pose="point" />
          </Place>
          <Place x={90} y={294} s={0.42} tap={TAP.haben}>
            <Ibex mood="wow" />
          </Place>
          <g transform="translate(70 180)">
            <g className="shb-flop">
              <path d="M-16 20 Q-20 0 -10 -6 Q0 -2 10 -6 Q20 0 16 20Z" fill="#F2EEE2" stroke="#C9C0B0" strokeWidth={1.4} />
            </g>
          </g>
        </g>
      );
    // The skull, a hard helmet for the brain; the ribs, a cage for the heart and lungs.
    case 2:
      return (
        <g>
          <rect width={400} height={300} fill="#14283E" />
          <BodyChart x={150} y={292} s={1.38} layer="bones" glow="skull" />
          <BodyChart x={290} y={292} s={1.38} layer="inside" glow="heart" />
          <Pop x={150} y={140} delay={1.2}>
            <circle r={34} fill="none" stroke="#FFE066" strokeWidth={3} strokeDasharray="8 6" />
          </Pop>
        </g>
      );
    // "Bones are hard. How do I bend?" "Maybe bones are bendy!" "Feel your arm."
    case 3:
      return (
        <g>
          <Classroom id={id}>
            <Poster />
          </Classroom>
          <Place x={90} y={294} s={0.44} tap={TAP.haben}>
            <Ibex mood="worried" pose="point" />
          </Place>
          <Place x={200} y={294} s={0.44} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Speech x={230} y={196} w={52} h={34} tail="down" delay={0.8}>
            <path d="M-16 4 Q-8 -10 0 0 T16 -4" stroke="#F6F1E4" strokeWidth={6} fill="none" strokeLinecap="round" />
            <path d="M-16 4 Q-8 -10 0 0 T16 -4" stroke="#CFC6B0" strokeWidth={1} fill="none" />
          </Speech>
          <Place x={330} y={290} s={0.44} flip tap={TAP.mama}>
            <Teacher pose="wave" />
          </Place>
        </g>
      );
    // Arms bend only at elbows, legs at knees, fingers at knuckles: joints, like a door hinge.
    case 4:
      return (
        <g>
          <rect width={400} height={300} fill="#14283E" />
          <BodyChart x={110} y={292} s={1.3} layer="bones" glow="knee" />
          <g transform="translate(250 120)">
            <BendingArm x={0} y={0} s={1.3} bones />
          </g>
          <g transform="translate(270 230)">
            <rect x={-40} y={-30} width={36} height={60} fill="#C08A4A" />
            <rect x={4} y={-30} width={36} height={60} fill="#C08A4A" className="shb-door" />
            <rect x={-6} y={-24} width={12} height={14} rx={2} fill="#9AA8B8" />
            <rect x={-6} y={10} width={12} height={14} rx={2} fill="#9AA8B8" />
          </g>
        </g>
      );
    // Gugu's arm tied straight to a stick: he picks up his injera and can't get it to his mouth!
    case 5:
      return (
        <g>
          <Classroom id={id} />
          <Place x={190} y={294} s={0.56} tap={TAP.gugu}>
            <Gugu
              mood="worried"
              pose="point"
              item={
                <g>
                  <path d="M-30 74 L8 -18" stroke="#8A5A36" strokeWidth={12} strokeLinecap="round" />
                  <path d="M-30 46 l22 8 M-16 14 l22 8" stroke="#F4EEDC" strokeWidth={12} />
                  <ellipse cx={18} cy={-30} rx={44} ry={13} fill="#C9A87A" />
                  <ellipse cx={18} cy={-33} rx={40} ry={10} fill="#D8C49A" />
                </g>
              }
            />
          </Place>
          <Place x={80} y={294} s={0.42} tap={TAP.haben}>
            <Ibex mood="joy" />
          </Place>
          <Place x={320} y={294} s={0.42} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Sparkles x={200} y={100} r={60} delay={1} n={5} />
        </g>
      );
    // Bend your elbow: the muscle on top of your arm goes fat and hard. Muscles pull your bones.
    case 6:
      return (
        <g>
          <rect width={400} height={300} fill="#F4EBD8" />
          <BendingArm x={150} y={140} s={1.8} />
          <BodyChart x={320} y={292} s={1.1} layer="muscles" />
          <Place x={80} y={298} s={0.4} tap={TAP.haben}>
            <Ibex mood="wow" />
          </Place>
        </g>
      );
    // Muscles only pull, never push: they work in pairs, one to bend, one to straighten.
    case 7:
      return (
        <g>
          <rect width={400} height={300} fill="#14283E" />
          <BendingArm x={130} y={130} s={1.8} bones />
          <g className="shb-pair">
            <ellipse cx={76} cy={116} rx={40} ry={9} fill="#D9534F" />
          </g>
          <g className="shb-pair2">
            <ellipse cx={76} cy={144} rx={40} ry={9} fill="#D9534F" />
          </g>
          <Place x={300} y={298} s={0.44} flip tap={TAP.haben}>
            <Ibex mood="happy" pose="point" />
          </Place>
        </g>
      );
    // The biggest rock: standing straight, she jumps… too low!
    case 8:
      return (
        <g>
          <SimienEdge id={id} time="day">
            <Rocks />
          </SimienEdge>
          <g className="shb-short">
            <Place x={210} y={270} s={0.42} tap={TAP.haben}>
              <Ibex mood="worried" />
            </Place>
          </g>
          <Sign x={200} y={110} kind="?" delay={1.6} />
          <Air kind="day" seed={4} />
        </g>
      );
    // Crouch low, bending knees and hips, then PUSH: up she flies, onto the top of the rock!
    case 9:
      return (
        <g>
          <SimienEdge id={id} time="day">
            <Rocks />
          </SimienEdge>
          <g className="shb-jump">
            <Place x={0} y={0} s={0.42} tap={TAP.haben}>
              <Ibex mood="joy" pose="wave" />
            </Place>
          </g>
          <Sparkles x={300} y={150} r={50} delay={1.6} n={6} />
          <Air kind="day" seed={6} />
        </g>
      );
    // Bones are alive: they grow with you and can mend. A grown-up has 206. The longest is the thigh bone.
    case 10:
      return (
        <g>
          <Classroom id={id}>
            <Poster glow="knee" />
          </Classroom>
          <NumberBadge x={96} y={160} n="206" delay={0.8} color="#4A6FA8" />
          <Place x={330} y={290} s={0.46} flip tap={TAP.mama}>
            <Teacher pose="point" />
          </Place>
          <Place x={90} y={294} s={0.42} tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
        </g>
      );
    // Leaping home across the rocks at sunset: "Bones hold me up, muscles move me!"
    case 11:
      return (
        <g>
          <SimienEdge id={id} time="evening">
            <Rocks />
          </SimienEdge>
          <g className="shb-leap">
            <Place x={0} y={0} s={0.42} tap={TAP.haben}>
              <Ibex mood="joy" pose="wave" />
            </Place>
          </g>
          <Air kind="dusk" seed={8} />
        </g>
      );
    default:
      return null;
  }
}
