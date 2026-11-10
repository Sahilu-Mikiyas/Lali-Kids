"use client";

import "./stop-the-van.css";

import { useId } from "react";

import { Air, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Camel, FONT, Papa, TAP } from "./cast";
import { Home, Van, Yard } from "./places";
import { Hearts, SayBubble, Sign, Sparkles, WordCard } from "./props";
import { Thing } from "./things";

/*
  "Stop, Van, Stop!": one living picture per page (12 pages). Uncle's green van bumps along a dirt
  road with a pan, a fan, a can and a mop tied on its roof; at each bump the van hops and
  something flies off. Ayan and Abdi ride in its windows. Each word family gets its cards in the
  family's colour (‘an’ teal, ‘op’ orange), with the shared ending in bold.
  Keyframes: ./kit.css (efw-*) and ./stop-the-van.css (stv-*).
*/

const GREEN = "#2E9A5B";
const AN = "#0E8C80";
const OP = "#E58A00";

/** The dirt road across the picture. */
function Road() {
  return (
    <g>
      <path d="M-10 240 Q200 226 410 240 L410 290 Q200 276 -10 290Z" fill="#C9A06A" />
      <g fill="#A8803E">
        <ellipse cx={90} cy={262} rx={10} ry={3} />
        <ellipse cx={230} cy={258} rx={8} ry={3} />
        <ellipse cx={330} cy={266} rx={10} ry={3} />
      </g>
    </g>
  );
}

/** What is tied on the van's roof. */
function Load({ pan = true, fan = true, can = true, mop = false }: { pan?: boolean; fan?: boolean; can?: boolean; mop?: boolean }) {
  return (
    <g>
      {pan && (
        <g transform="translate(-60 -8)">
          <Thing id="pan" s={0.5} />
        </g>
      )}
      {fan && (
        <g transform="translate(-14 -14) rotate(-20)">
          <Thing id="fan" s={0.5} />
        </g>
      )}
      {can && (
        <g transform="translate(26 -12)">
          <Thing id="can" s={0.42} />
        </g>
      )}
      {mop && (
        <g transform="translate(60 -12) rotate(70)">
          <Thing id="mop" s={0.5} />
        </g>
      )}
    </g>
  );
}

/** Ayan and Abdi, looking out of the van's windows (clipped to the glass). */
function Riders({ mood = "happy" as "happy" | "joy" | "wow" | "worried" }) {
  const cid = useId().replace(/:/g, "");
  return (
    <g>
      <defs>
        <clipPath id={`${cid}-w`}>
          <rect x={-28} y={-14} width={56} height={34} rx={4} />
          <rect x={36} y={-14} width={66} height={34} rx={4} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${cid}-w)`}>
        <g transform="translate(-40 -24) scale(0.34)">
          <Camel who="ayan" mood={mood} />
        </g>
        <g transform="translate(30 -14) scale(0.3)">
          <Camel who="abdi" mood={mood} />
        </g>
      </g>
    </g>
  );
}

/** A word with its family ending in bold: p + an. */
function FamilyWord({ x, y, start, end, color, delay = 0.6 }: { x: number; y: number; start: string; end: string; color: string; delay?: number }) {
  const w = (start.length + end.length) * 13 + 22;
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="wiggle" sound="chime">
          <rect x={-w / 2} y={-17} width={w} height={32} rx={9} fill="#FFFDF6" stroke={color} strokeWidth={2.4} />
          <text x={0} y={7} fontSize={20} fontFamily="var(--font-andika), sans-serif" fontWeight={700} textAnchor="middle">
            <tspan fill="#2A1A10">{start}</tspan>
            <tspan fill={color}>{end}</tspan>
          </text>
        </Tappable>
      </g>
    </g>
  );
}

/** A red STOP sign. */
function StopSign({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-3} y={0} width={6} height={60} fill="#9AA0A6" />
      <Tappable reaction="wiggle" sound="pop">
        <path d="M-12 -28 H12 L28 -12 V12 L12 28 H-12 L-28 12 V-12Z" fill="#E2463F" stroke="#fff" strokeWidth={3} />
        <text y={6} fontSize={14} fontFamily={FONT} fontWeight={900} fill="#fff" textAnchor="middle">
          STOP
        </text>
      </Tappable>
    </g>
  );
}

/** Something flying off the van's roof. */
function Flying({ id, x, y, s = 0.5, delay = 0.6, cls = "stv-fly" }: { id: string; x: number; y: number; s?: number; delay?: number; cls?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={cls} style={vars({ "--delay": `${delay}s` })}>
        <Thing id={id} s={s} />
      </g>
    </g>
  );
}

export default function StopTheVan({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Uncle's green van: v-an, VAN!
    case 0:
      return (
        <g>
          <Yard id={id} time="morning">
            <Van x={220} y={272} s={0.9} color={GREEN} label="van" />
            <Place x={90} y={292} s={0.46} tap={TAP.ayan}>
              <Camel who="ayan" mood="joy" />
            </Place>
            <FamilyWord x={220} y={110} start="v" end="an" color={AN} delay={1} />
          </Yard>
          <Air kind="day" seed={2} />
        </g>
      );
    // A pan, a fan and a can on top. They all end in ‘an’!
    case 1:
      return (
        <g>
          <Yard id={id} time="morning">
            <Van x={220} y={272} s={0.9} color={GREEN} label="van" top={<Load />} />
            <Place x={340} y={292} s={0.46} flip tap={TAP.papa}>
              <Papa mood="happy" pose="point" />
            </Place>
            <FamilyWord x={90} y={70} start="p" end="an" color={AN} delay={0.6} />
            <FamilyWord x={180} y={70} start="f" end="an" color={AN} delay={1.2} />
            <FamilyWord x={270} y={70} start="c" end="an" color={AN} delay={1.8} />
            <FamilyWord x={180} y={120} start="v" end="an" color={AN} delay={2.4} />
          </Yard>
          <Air kind="day" seed={3} />
        </g>
      );
    // Abdi puts the mop on top too: m-op, MOP! Off they go.
    case 2:
      return (
        <g>
          <Yard id={id} time="morning">
            <Road />
            <Van x={220} y={272} s={0.9} color={GREEN} label="van" top={<Load mop />} />
            <Place x={70} y={292} s={0.4} className="lali-hop" tap={TAP.ayan}>
              <Camel who="abdi" mood="joy" />
            </Place>
            <FamilyWord x={110} y={90} start="m" end="op" color={OP} delay={0.8} />
          </Yard>
          <Air kind="day" seed={4} />
        </g>
      );
    // BUMP! Hop! Pop goes the can lid. "Stop, van, stop!"
    case 3:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Road />
            <g className="stv-hop">
              <Van x={210} y={270} s={0.9} color={GREEN} label="van" top={<Load can={false} mop />} drive>
                <Riders mood="wow" />
              </Van>
            </g>
            <Flying id="can" x={230} y={160} s={0.4} />
            <SayBubble x={90} y={110} lines={["Stop, van, stop!"]} size={14} tail="down" delay={1.4} color="#E2463F" />
            <FamilyWord x={260} y={70} start="h" end="op" color={OP} delay={0.6} />
            <FamilyWord x={340} y={70} start="p" end="op" color={OP} delay={1.2} />
          </Yard>
          <Air kind="day" seed={5} />
        </g>
      );
    // Uncle stops by a sign: s-t-op, STOP.
    case 4:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Road />
            <StopSign x={320} y={200} />
            <Van x={170} y={270} s={0.9} color={GREEN} label="van" top={<Load mop />}>
              <Riders mood="happy" />
            </Van>
            <FamilyWord x={170} y={90} start="st" end="op" color={OP} delay={0.8} />
          </Yard>
          <Air kind="day" seed={6} />
        </g>
      );
    // The fan flies off. A man ran after it: m-an, r-an!
    case 5:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Road />
            <Van x={260} y={270} s={0.8} color={GREEN} top={<Load fan={false} mop />} drive>
              <Riders mood="wow" />
            </Van>
            <g transform="translate(80 262)">
              <g className="stv-roll">
                <Thing id="fan" s={0.5} />
              </g>
            </g>
            <Place x={60} y={294} s={0.4} from={[-60, 294]} dur={2} delay={0.6} tap={TAP.papa}>
              <Papa mood="wow" pose="point" />
            </Place>
            <FamilyWord x={150} y={90} start="m" end="an" color={AN} delay={1.2} />
            <FamilyWord x={240} y={90} start="r" end="an" color={AN} delay={1.8} />
          </Yard>
          <Air kind="day" seed={7} />
        </g>
      );
    // Clang! The pan, the mop, the fan again… "Stop, van, stop!"
    case 6:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Road />
            <g className="stv-hop">
              <Van x={220} y={270} s={0.9} color={GREEN} label="van" drive>
                <Riders mood="worried" />
              </Van>
            </g>
            <Flying id="pan" x={150} y={170} delay={0.4} />
            <Flying id="mop" x={220} y={160} delay={0.9} />
            <Flying id="fan" x={290} y={170} delay={1.4} />
            <SayBubble x={200} y={70} lines={["Stop, van, stop!"]} size={16} tail="down" delay={2} color="#E2463F" />
          </Yard>
          <Air kind="day" seed={8} />
        </g>
      );
    // Ayan works it out: things on TOP can hop off; things IN the van can't.
    case 7:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Road />
            <Van x={240} y={270} s={0.9} color={GREEN} label="van" />
            <Place x={90} y={292} s={0.46} tap={TAP.ayan}>
              <Camel who="ayan" mood="wow" />
            </Place>
            <WordCard x={240} y={70} word="on top" color={OP} size={15} delay={0.6} />
            <WordCard x={240} y={200} word="in" color={AN} size={16} delay={1.4} />
            <path d="M240 90 V140" stroke={OP} strokeWidth={3} strokeDasharray="3 5" />
            <Sign x={140} y={160} kind="!" delay={2} color="#F5B21E" />
          </Yard>
          <Air kind="day" seed={9} />
        </g>
      );
    // Everything goes IN the van, at their feet.
    case 8:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Road />
            <Van x={220} y={270} s={0.9} color={GREEN} label="van">
              <Riders mood="joy" />
              <g className="stv-in">
                <g transform="translate(24 50) scale(0.3)">
                  <Thing id="pan" />
                </g>
                <g transform="translate(52 50) scale(0.3)">
                  <Thing id="can" />
                </g>
              </g>
            </Van>
            <SayBubble x={100} y={110} lines={["Off we go!"]} size={15} tail="down" delay={1} />
          </Yard>
          <Air kind="day" seed={10} />
        </g>
      );
    // BUMP! Hop… but nothing falls off. "Go, van, go!"
    case 9:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Road />
            <g className="stv-hop">
              <Van x={220} y={270} s={0.9} color={GREEN} label="van" drive>
                <Riders mood="joy" />
              </Van>
            </g>
            <SayBubble x={240} y={90} lines={["Go, van, go!"]} size={16} tail="down" delay={0.8} color={GREEN} />
            <Sparkles x={220} y={190} r={110} delay={1.2} n={8} />
          </Yard>
          <Air kind="day" seed={11} />
        </g>
      );
    // At Grandma Halima's: the fan cools them, the pan cooks lunch.
    case 10:
      return (
        <g>
          <Home id={id} time="day" wall={["#CFEDE6", "#A8D8CC"]}>
            <g transform="translate(320 180)">
              <g className="stv-fan">
                <Thing id="fan" s={0.6} />
              </g>
            </g>
            <g transform="translate(200 262)">
              <Thing id="pan" s={0.7} />
            </g>
            <Place x={330} y={292} s={0.5} flip tap={TAP.mama}>
              <Camel who="hooyo" mood="joy" />
            </Place>
            <Place x={110} y={292} s={0.42} tap={TAP.ayan}>
              <Camel who="ayan" mood="joy" />
            </Place>
            <SayBubble x={260} y={110} lines={["A van that hops!"]} size={14} tail="down" delay={0.8} />
            <Hearts spots={[[180, 200, 1.4], [196, 186, 2]]} />
          </Home>
        </g>
      );
    // Van, pan, fan, can, man, ran. Top, hop, stop, pop, mop.
    default:
      return (
        <g>
          <Yard id={id} time="evening">
            {["v", "p", "f", "c", "m", "r"].map((l, i) => (
              <FamilyWord key={`an${l}`} x={66 + (i % 3) * 62} y={60 + Math.floor(i / 3) * 44} start={l} end="an" color={AN} delay={0.3 + i * 0.25} />
            ))}
            {["t", "h", "st", "p", "m"].map((l, i) => (
              <FamilyWord key={`op${l}`} x={256 + (i % 2) * 66} y={60 + Math.floor(i / 2) * 44} start={l} end="op" color={OP} delay={1.8 + i * 0.25} />
            ))}
            <Van x={200} y={276} s={0.7} color={GREEN} label="van">
              <Riders mood="joy" />
            </Van>
          </Yard>
          <Air kind="dusk" seed={12} />
        </g>
      );
  }
}
