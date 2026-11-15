"use client";

import "./gugus-red-heart.css";

import { useId } from "react";

import { Air, Place, Stars, vars } from "../../scenery";
import { Camel, Gugu, TAP, Teacher, Tsehay } from "./kit-cast";
import { BodyChart, Heart, Lungs } from "./kit-body";
import { Pop } from "./kit-life";
import { Classroom } from "./kit-more";
import { Home, Village } from "./kit-places";
import { Hearts, Sparkles, Speech, Zzz } from "./kit-props";

/*
  "Gugu's Red Heart": one living picture per page (12 pages). Gugu's red chest patch: "my heart!";
  hand on chest, the thump inside and a little to the left; the heart as big as a fist, pumping
  blood through tubes; counting beats and breaths sitting still; racing round the field; the heart
  racing and the puffing; why: muscles need more air and food; Ayan's chest growing as she breathes
  in; breath clouds on a cold highland morning; resting slows them down; the heart beats all night;
  "Thump-thump, in and out!" Keyframes: kit.css, kit-science.css and ./gugus-red-heart.css.
*/

/** A clock face with a ticking hand. */
function Clock({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle r={18} fill="#FFFFFF" stroke="#8A5A36" strokeWidth={3} />
      {[0, 90, 180, 270].map((a) => (
        <path key={a} d="M0 -14 V-11" stroke="#1B2A4E" strokeWidth={2} transform={`rotate(${a})`} />
      ))}
      <g className="sgh-tick">
        <circle r={13} fill="none" />
        <path d="M0 0 V-13" stroke="#E2463F" strokeWidth={2} strokeLinecap="round" />
      </g>
      <circle r={2} fill="#1B2A4E" />
    </g>
  );
}

/** A fist the size of the heart beside it. */
function Fist({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-12 14 Q-16 -2 -12 -10 Q-6 -16 6 -14 Q14 -12 14 0 Q14 12 4 16Z" fill="#9A6646" />
      <path d="M-10 -8 Q0 -10 10 -6 M-11 -1 Q0 -3 12 1 M-10 6 Q0 4 12 8" stroke="#7E5236" strokeWidth={1.4} fill="none" />
    </g>
  );
}

/** Tally marks for counting. */
function Tally({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-6} y={-24} width={Math.ceil(n / 5) * 30 + 6} height={34} rx={4} fill="#FFFFFF" stroke="#C9B89A" />
      {Array.from({ length: n }, (_, i) => {
        const g = Math.floor(i / 5);
        const k = i % 5;
        return k < 4 ? (
          <path key={i} d={`M${g * 30 + k * 6} -16 V4`} stroke="#1B2A4E" strokeWidth={2.4} className="lali-pop-in" style={vars({ "--delay": `${0.4 + i * 0.25}s` })} />
        ) : (
          <path key={i} d={`M${g * 30 - 4} 0 L${g * 30 + 22} -14`} stroke="#E2463F" strokeWidth={2.4} className="lali-pop-in" style={vars({ "--delay": `${0.4 + i * 0.25}s` })} />
        );
      })}
    </g>
  );
}

export default function GugusRedHeart({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Gugu points at his bright red chest patch: "It's my HEART!"
    case 0:
      return (
        <g>
          <Village id={id} time="morning" />
          <Place x={150} y={294} s={0.5} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Speech x={180} y={130} w={44} h={36} tail="down" delay={0.8}>
            <g transform="scale(0.6)">
              <Heart x={0} y={0} />
            </g>
          </Speech>
          <Place x={290} y={292} s={0.44} flip tap={TAP.ayan}>
            <Camel mood="wow" />
          </Place>
          <Air kind="day" seed={2} />
        </g>
      );
    // Hand flat on the chest, very still: thump-thump, deep inside and a little to the left.
    case 1:
      return (
        <g>
          <Classroom id={id} />
          <Place x={200} y={294} s={0.56} tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
          <g transform="translate(214 274)">
            <g className="sgh-ring">
              <circle r={14} fill="none" stroke="#E2463F" strokeWidth={3} />
            </g>
          </g>
          <Place x={340} y={290} s={0.44} flip tap={TAP.mama}>
            <Teacher pose="point" />
          </Place>
          <Pop x={110} y={110} delay={1}>
            <text textAnchor="middle" fontSize={22} fontWeight={900} fill="#D8343A" fontFamily="var(--font-grandstander), sans-serif">
              ♥ ♥
            </text>
          </Pop>
        </g>
      );
    // Inside the chest behind the ribs: a muscle as big as your fist, squeezing blood all round.
    case 2:
      return (
        <g>
          <rect width={400} height={300} fill="#14283E" />
          <BodyChart x={140} y={292} s={1.38} layer="inside" glow="heart" />
          <Heart x={290} y={130} s={3} />
          <Fist x={290} y={230} s={2.6} />
          <path d="M290 172 V196" stroke="#FFFFFF" strokeWidth={2} strokeDasharray="4 4" />
        </g>
      );
    // Sitting still: Ayan counts Gugu's heartbeats while Teacher Meron watches the clock.
    case 3:
      return (
        <g>
          <Classroom id={id} />
          <Clock x={200} y={84} s={1.6} />
          <Tally x={150} y={190} n={9} />
          <Place x={110} y={294} s={0.46} tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
          <Place x={250} y={294} s={0.46} flip tap={TAP.ayan}>
            <Camel mood="happy" kneel />
          </Place>
          <Place x={350} y={292} s={0.4} flip tap={TAP.mama}>
            <Teacher />
          </Place>
        </g>
      );
    // "Now, run!" Round the school field, once, twice, three times.
    case 4:
      return (
        <g>
          <Village id={id} time="day" />
          <g className="sgh-run">
            <Place x={0} y={0} s={0.42} tap={TAP.gugu}>
              <Gugu mood="joy" pose="hop" />
            </Place>
          </g>
          <g className="sgh-run" style={vars({ animationDelay: "-0.6s" })}>
            <Place x={0} y={0} s={0.42} tap={TAP.ayan}>
              <Camel mood="joy" walk />
            </Place>
          </g>
          <Air kind="day" seed={4} />
        </g>
      );
    // Flopped on the grass: THUMP-THUMP-THUMP! Puffing hard. "Is my heart scared?"
    case 5:
      return (
        <g>
          <Village id={id} time="day" />
          <Place x={130} y={294} s={0.5} tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
          <Heart x={140} y={110} s={2.4} fast />
          <Place x={290} y={292} s={0.44} flip tap={TAP.ayan}>
            <Camel mood="wow" kneel />
          </Place>
          <g transform="translate(240 200)">
            {[0, 1, 2].map((i) => (
              <circle key={i} cx={-i * 8} cy={-i * 4} r={4 + i * 2} fill="#FFFFFF" opacity={0.8} className="sgh-puff" style={vars({ "--delay": `${i * 0.2}s` })} />
            ))}
          </g>
          <Air kind="day" seed={6} />
        </g>
      );
    // Working muscles need more air and food: the lungs breathe faster, the heart pumps faster.
    case 6:
      return (
        <g>
          <rect width={400} height={300} fill="#F4EBD8" />
          <Lungs x={120} y={130} s={3} fast />
          <Heart x={250} y={130} s={2.6} fast />
          <g transform="translate(200 240)">
            <path d="M-150 0 H150" stroke="#E2463F" strokeWidth={6} strokeDasharray="14 10" className="sgh-flow" />
          </g>
          <g transform="translate(350 236)">
            <path d="M-10 -40 Q-18 -10 -10 20 L10 20 Q14 -10 8 -40Z" fill="#D9534F" />
          </g>
          <Place x={50} y={298} s={0.3} tap={TAP.mama}>
            <Teacher pose="point" />
          </Place>
        </g>
      );
    // Ayan's hands on her ribs: breathe in, the chest grows; breathe out, it shrinks.
    case 7:
      return (
        <g>
          <Classroom id={id} />
          <g className="sgh-breathe">
            <Place x={150} y={292} s={0.52} tap={TAP.ayan}>
              <Camel mood="happy" />
            </Place>
          </g>
          <rect x={250} y={60} width={120} height={150} rx={8} fill="#14283E" />
          <Lungs x={310} y={140} s={2.2} />
          <path d="M310 70 V90" stroke="#E8A0A0" strokeWidth={4} />
        </g>
      );
    // A cold, misty highland morning: Gugu's warm, wet breath makes a little white cloud.
    case 8:
      return (
        <g>
          <Village id={id} time="morning" />
          <rect width={400} height={300} fill="#FFFFFF" opacity={0.35} />
          <Place x={170} y={294} s={0.52} tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <g transform="translate(200 210)">
            {[0, 1, 2, 3].map((i) => (
              <circle key={i} cx={i * 8} cy={-i * 6} r={5 + i * 3} fill="#FFFFFF" className="sgh-breath" style={vars({ "--delay": `${i * 0.25}s` })} />
            ))}
          </g>
          <Place x={320} y={292} s={0.44} flip tap={TAP.ayan}>
            <Camel mood="wow" />
          </Place>
        </g>
      );
    // Lying quietly on the mat; counting again: slower now. Resting lets them slow down.
    case 9:
      return (
        <g>
          <Classroom id={id} />
          <rect x={60} y={262} width={280} height={14} rx={6} fill="#4A7FD0" />
          <Place x={140} y={286} s={0.44} tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
          <Place x={270} y={286} s={0.42} flip tap={TAP.ayan}>
            <Camel mood="happy" kneel />
          </Place>
          <Heart x={200} y={110} s={2} />
          <Clock x={300} y={84} s={1.2} />
        </g>
      );
    // "Does my heart ever stop to rest?" "Never: day and night, even when you're fast asleep."
    case 10:
      return (
        <g>
          <Home id={id} time="night" shelf={false} />
          <rect x={90} y={250} width={220} height={20} rx={8} fill="#4A7FD0" />
          <Place x={200} y={266} s={0.46} tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
          <Zzz x={250} y={150} />
          <g transform="translate(290 200)">
            <circle r={26} fill="#FFFFFF" opacity={0.85} />
            <Heart x={0} y={0} s={1.2} />
          </g>
          <path d="M120 262 Q200 240 280 262 L282 276 L118 276Z" fill="#E2783A" />
          <Stars seed={4} n={6} top={60} bottom={120} />
        </g>
      );
    // Gugu and Tsehay, hands on their chests: "Thump-thump, in and out!"
    case 11:
      return (
        <g>
          <Village id={id} time="evening" />
          <Place x={140} y={294} s={0.5} tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <Place x={270} y={294} s={0.48} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Hearts spots={[[150, 150, 0.4], [200, 130, 1.2], [260, 150, 2]]} />
          <Sparkles x={200} y={120} r={80} delay={0.8} n={6} />
        </g>
      );
    default:
      return null;
  }
}
