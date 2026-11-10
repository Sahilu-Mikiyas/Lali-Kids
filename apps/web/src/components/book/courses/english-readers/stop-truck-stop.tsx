"use client";

import "./stop-truck-stop.css";

import { useId, type ReactNode } from "react";

import { Air, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Camel, FONT, TAP } from "./cast";
import { Country, HiWord, Market, PostSign } from "./more";
import { Home, Yard } from "./places";
import { BlendCard, Hearts, SayBubble, Sign, Speech } from "./props";
import { Thing } from "./things";

/*
  "Stop, Truck, Stop!": one living picture per page (12 pages). Aabo's big red truck with TRUCK
  on its side, the pond by Green Hill School, the market, and the road home with its signs. The
  two letters of each blend are drawn in red on the word cards; the frog hops all the way home.
  Keyframes: ./kit.css, ./more.css and ./stop-truck-stop.css (sts-*).
*/

const RED = "#E8413B";

type M = "happy" | "joy" | "wow" | "worried";
const Ayan = ({ x, y = 294, s = 0.44, mood = "happy" as M, flip = false }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.ayan}>
    <Camel who="ayan" mood={mood} />
  </Place>
);
const Abdi = ({ x, y = 296, s = 0.38, mood = "happy" as M, flip = false, item }: { x: number; y?: number; s?: number; mood?: M; flip?: boolean; item?: ReactNode }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.ayan}>
    <Camel who="abdi" mood={mood} item={item} />
  </Place>
);
const Aabo = ({ x, y = 292, s = 0.48, mood = "happy" as "happy" | "joy", flip = false }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.papa}>
    <Camel who="aabo" mood={mood} />
  </Place>
);

/** The frog: green with black spots, sitting; `hop` sends it hopping. */
function Frog({ x, y, s = 0.5, hop = false, dry = false }: { x: number; y: number; s?: number; hop?: boolean; dry?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={hop ? "enr-hop" : "sts-breathe"} style={vars({ "--hx": "12px" })}>
        <Tappable reaction="bounce" sound="boing">
          <g transform={`scale(${s})`}>
            <Thing id="frog" />
            <g fill="#2A1A10" opacity={dry ? 0.5 : 1}>
              <circle cx={-14} cy={10} r={3} />
              <circle cx={10} cy={4} r={2.6} />
              <circle cx={16} cy={18} r={3} />
            </g>
            {dry && <path d="M-20 0 l4 4 m10 -6 l4 4 m6 10 l4 4" stroke="#C9B07A" strokeWidth={2} />}
          </g>
        </Tappable>
      </g>
    </g>
  );
}

/** Aabo's big red truck, facing right, wheels on y; TRUCK is painted on its side. */
function Truck({ x, y, s = 1, drive = false, riders = false }: { x: number; y: number; s?: number; drive?: boolean; riders?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className={drive ? "enr-drive" : undefined}>
        <Tappable reaction="bounce" sound="boing">
          <rect x={-120} y={-90} width={150} height={74} rx={6} fill={RED} stroke="#2A1A10" strokeWidth={2.4} />
          <path d="M-110 -70 H20 M-110 -52 H20 M-110 -34 H20" stroke="#F4A09A" strokeWidth={2} />
          <rect x={-96} y={-74} width={102} height={34} rx={5} fill="#FFFDF6" />
          <text x={-45} y={-48} fontSize={26} fontFamily={FONT} fontWeight={900} textAnchor="middle">
            <tspan fill={RED}>TR</tspan>
            <tspan fill="#2A1A10">UCK</tspan>
          </text>
          <path d="M34 -70 H70 Q86 -70 92 -50 L100 -30 V-16 H34Z" fill={RED} stroke="#2A1A10" strokeWidth={2.4} />
          <path d="M44 -62 H70 Q80 -62 84 -48 L88 -36 H44Z" fill="#CFF0FF" stroke="#2A1A10" strokeWidth={1.6} />
          {riders && (
            <g>
              <defs>
                <clipPath id="sts-cab">
                  <path d="M44 -62 H70 Q80 -62 84 -48 L88 -36 H44Z" />
                </clipPath>
              </defs>
              <g clipPath="url(#sts-cab)">
                <g transform="translate(40 -84) scale(0.24)">
                  <Camel who="aabo" mood="joy" />
                </g>
              </g>
            </g>
          )}
          <rect x={-124} y={-18} width={228} height={8} rx={3} fill="#5A5A66" />
          {[-90, -40, 70].map((wx) => (
            <g key={wx} transform={`translate(${wx} -2)`}>
              <circle r={16} fill="#2A2A33" />
              <circle r={6} fill="#C9C4D6" />
            </g>
          ))}
        </Tappable>
      </g>
    </g>
  );
}

/** Ripples where something splashed into the water. */
function Splash({ x, y, delay = 1 }: { x: number; y: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="none" stroke="#FFFFFF" strokeWidth={2.4}>
      {[0, 1, 2].map((i) => (
        <ellipse key={i} rx={10 + i * 8} ry={3 + i * 2} className="sts-ripple" style={vars({ "--delay": `${delay + i * 0.3}s` })} />
      ))}
    </g>
  );
}

/** A lily pad on the pond. */
const Lily = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M0 0 L-22 -4 A22 8 0 1 0 -18 -8Z" fill="#3E9B5A" stroke="#2D7D47" strokeWidth={1.4} />
    <circle cx={10} cy={-4} r={3} fill="#F7B8C8" />
  </g>
);

export default function StopTruckStop({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Aabo's big red truck. "t-r-u-ck, truck!"
    case 0:
      return (
        <g>
          <Yard id={id} time="morning" house>
            <Truck x={210} y={262} s={0.9} />
            <Aabo x={330} mood="joy" flip />
            <Ayan x={100} mood="wow" />
            <SayBubble x={110} y={110} lines={["t-r-u-ck, truck!"]} size={14} tail="down" delay={1} />
          </Yard>
          <Air kind="day" seed={2} />
        </g>
      );
    // "Say the t and the r side by side, fast. Tr, tr, like the engine: trrr!"
    case 1:
      return (
        <g>
          <Yard id={id} time="morning">
            <BlendCard x={200} y={90} word="truck" pic="truck" color={RED} delay={0.6} s={0.95} />
            <Abdi x={140} mood="joy" />
            <Ayan x={270} mood="happy" flip />
            <SayBubble x={110} y={180} lines={["trrr!"]} size={16} tail="down" delay={2.8} color={RED} />
          </Yard>
          <Air kind="day" seed={3} />
        </g>
      );
    // The pond by Green Hill School. A frog! Green, with black spots.
    case 2:
      return (
        <g>
          <Country id={id}>
            <PostSign x={190} y={150} text="Green Hill School" w={140} post={64} />
            <Lily x={290} y={232} />
            <Frog x={290} y={222} s={0.5} />
            <HiWord x={310} y={140} word="frog" hi={[0, 1]} pic="frog" color={RED} delay={1.4} size={18} />
            <Ayan x={110} y={292} mood="wow" />
            <Abdi x={170} y={296} mood="wow" />
          </Country>
          <Air kind="day" seed={4} grass={false} />
        </g>
      );
    // At the market: grapes and a spinning top.
    case 3:
      return (
        <g>
          <Market id={id}>
            <HiWord x={120} y={80} word="grapes" hi={[0, 1]} pic="grapes" color={RED} delay={0.6} size={18} />
            <HiWord x={280} y={80} word="spin" hi={[0, 1]} color={RED} delay={1.4} size={18} />
            <g transform="translate(280 150)">
              <g className="lali-spin" style={vars({ "--dur": "0.5s" })}>
                <Thing id="top" s={0.5} />
              </g>
            </g>
            <Ayan x={120} mood="joy" />
            <Abdi x={240} mood="joy" flip />
          </Market>
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    // Two eyes peep out of Abdi's basket: the frog! Its skin looks dry.
    case 4:
      return (
        <g>
          <Market id={id}>
            <g transform="translate(200 214)">
              <path d="M-40 -20 H40 L32 24 H-32Z" fill="#C98A4A" stroke="#2A1A10" strokeWidth={2} />
              <path d="M-36 -8 H36 M-34 6 H34" stroke="#9C6A3A" strokeWidth={2} />
              <g transform="translate(0 -22)">
                <g className="sts-peep">
                  <Frog x={0} y={0} s={0.5} dry />
                </g>
              </g>
            </g>
            <Abdi x={120} mood="wow" />
            <Aabo x={300} mood="happy" flip />
            <Sign x={200} y={130} kind="!" delay={1} color="#E8413B" />
          </Market>
          <Air kind="day" seed={6} grass={false} />
        </g>
      );
    // On the long road home, Abdi keeps the frog wet and thinks: her pond was by the school sign!
    case 5:
      return (
        <g>
          <Country id={id} pond={false}>
            <Truck x={190} y={278} s={0.85} drive riders />
            <Speech x={120} y={80} w={120} h={60} think delay={1}>
              <g transform="translate(0 -6) scale(0.5)">
                <PostSign x={0} y={0} text="Green Hill School" w={140} post={24} delay={1.4} />
              </g>
            </Speech>
            <g transform="translate(290 120)">
              <g className="lali-pop-in" style={vars({ "--delay": "0.4s" })}>
                <circle r={44} fill="#FFF6DD" stroke="#C98A4A" strokeWidth={4} />
                <ellipse cx={0} cy={22} rx={30} ry={10} fill="#E3B07A" />
                <Frog x={0} y={14} s={0.5} />
                {[0, 1, 2].map((i) => (
                  <circle key={i} cx={-14 + i * 14} cy={-22} r={3.4} fill="#5BB8E8" className="sts-drip" style={vars({ "--delay": `${i * 0.3}s` })} />
                ))}
              </g>
            </g>
          </Country>
          <Air kind="day" seed={7} grass={false} />
        </g>
      );
    // A red sign: s-t, st, STOP! But it's only goats crossing the road.
    case 6:
      return (
        <g>
          <Country id={id} pond={false}>
            <PostSign x={300} y={190} text="" stop post={60} />
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(${130 + i * 46} ${266 + (i % 2) * 6})`}>
                <g className="sts-cross" style={vars({ "--delay": `${i * 0.3}s` })}>
                  <Thing id="goat" s={0.7} />
                </g>
              </g>
            ))}
            <HiWord x={150} y={90} word="STOP" hi={[0, 1]} color={RED} delay={0.8} size={24} />
            <text x={250} y={170} fontSize={14} fontFamily={FONT} fontWeight={900} fill="#2A1A10" className="lali-pop-in" style={vars({ "--delay": "1.6s" })}>
              Baa!
            </text>
          </Country>
          <Air kind="day" seed={8} grass={false} />
        </g>
      );
    // "Green Hill School! STOP, TRUCK, STOP!"
    case 7:
      return (
        <g>
          <Country id={id}>
            <PostSign x={300} y={150} text="Green Hill School" w={140} post={64} />
            <Truck x={150} y={278} s={0.8} riders />
            <SayBubble x={190} y={70} lines={["STOP, TRUCK, STOP!"]} size={18} tail="down" delay={0.4} color={RED} />
          </Country>
          <Air kind="day" seed={9} grass={false} />
        </g>
      );
    // HOP… SPLASH! "Swim, frog, swim!"
    case 8:
      return (
        <g>
          <Country id={id}>
            <g transform="translate(250 200)">
              <g className="sts-leap">
                <Frog x={0} y={0} s={0.46} />
              </g>
            </g>
            <Splash x={300} y={234} delay={1.4} />
            <Abdi x={140} y={290} s={0.42} mood="joy" />
            <SayBubble x={150} y={130} lines={["Swim, frog, swim!"]} size={14} tail="down" delay={2} />
          </Country>
          <Air kind="day" seed={10} grass={false} />
        </g>
      );
    // On a lily pad: "Crrroak!" Ayan hugs Abdi.
    case 9:
      return (
        <g>
          <Country id={id}>
            <Lily x={300} y={234} s={1.2} />
            <Frog x={300} y={222} s={0.5} />
            <SayBubble x={300} y={170} lines={["Crrroak!"]} size={14} tail="down" delay={0.8} />
            <HiWord x={130} y={80} word="croak" hi={[0, 1]} color={RED} delay={1.6} size={20} />
            <Ayan x={120} y={292} mood="joy" />
            <Abdi x={180} y={296} mood="joy" />
            <Hearts spots={[[150, 200, 1.8], [168, 186, 2.2]]} />
          </Country>
          <Air kind="day" seed={11} grass={false} />
        </g>
      );
    // At home: "I read TRUCK. I read STOP. I read GREEN. And I saved a frog!"
    case 10:
      return (
        <g>
          <Home id={id} time="evening">
            <HiWord x={100} y={70} word="TRUCK" hi={[0, 1]} color={RED} delay={0.4} size={18} />
            <HiWord x={200} y={70} word="STOP" hi={[0, 1]} color={RED} delay={0.9} size={18} />
            <HiWord x={300} y={70} word="GREEN" hi={[0, 1]} color={RED} delay={1.4} size={18} />
            <Abdi x={130} mood="joy" />
            <Place x={300} y={294} s={0.48} flip tap={TAP.mama}>
              <Camel who="hooyo" mood="joy" />
            </Place>
          </Home>
        </g>
      );
    // tr, fr, gr, st, sp, bl: two sounds together, fast!
    default:
      return (
        <g>
          <Yard id={id} time="evening">
            {[
              ["truck", "truck"],
              ["frog", "frog"],
              ["grapes", "grapes"],
              ["stop", "stop"],
              ["spoon", "spoon"],
              ["blocks", "blocks"],
            ].map(([w, p], i) => (
              <HiWord key={w} x={90 + (i % 3) * 110} y={60 + Math.floor(i / 3) * 84} word={w} hi={[0, 1]} pic={p} color={RED} delay={0.3 + i * 0.25} size={16} />
            ))}
            <Abdi x={160} mood="joy" />
            <Ayan x={250} mood="joy" flip />
          </Yard>
          <Air kind="dusk" seed={12} />
        </g>
      );
  }
}
