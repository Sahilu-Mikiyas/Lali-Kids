"use client";

import "./half-the-herd.css";

import { useId, type ReactNode } from "react";

import { Acacia, Air, BeeHover, Place, vars } from "../../scenery";
import { Camel, TAP } from "./kit-cast";
import { d, GoatShape, Land, r1 } from "./kit";
import { Fraction, Label, Mark, SharePlate, SmallCamel, Trough } from "./kit-maths";
import { Cup, Zzz } from "./kit-props";

/*
  "Half the Herd": one living picture per page (12 pages) outside Jijiga: red-brown land,
  acacias, the herd and the well. A fraction of a group is shown by sorting the animals (or
  cups, or dates) into equal groups inside dashed rings, one group glowing, with the written
  fraction beside it. Story keyframes: hth-* in ./half-the-herd.css.
*/

function Plain({ id, time = "day", children }: { id: string; time?: "dawn" | "day" | "dusk" | "night"; children: ReactNode }) {
  return (
    <g>
      <Land id={id} time={time} hills={false} />
      <path d="M-10 186 Q200 174 410 188 L410 310 L-10 310Z" fill={time === "night" ? "#4A3A3A" : time === "dusk" ? "#C98A5A" : "#EBC48E"} />
      <Acacia x={44} y={194} s={0.5} />
      <Acacia x={368} y={190} s={0.42} />
      {children}
      <Air kind={time === "night" ? "night" : time === "dusk" ? "dusk" : "day"} seed={81} grass={false} />
    </g>
  );
}

/** A dashed ring around a group, fading in (glowing when `hi`). */
function Ring({ x, y, rx, ry, t, hi = false, color = "#2F5BD3" }: { x: number; y: number; rx: number; ry: number; t: number; hi?: boolean; color?: string }) {
  return (
    <g className="lali-fade-in" style={d(t)}>
      {hi && <ellipse cx={x} cy={y} rx={rx + 4} ry={ry + 4} fill="none" stroke="#F5B21E" strokeWidth={5} opacity={0.8} />}
      <ellipse cx={x} cy={y} rx={rx} ry={ry} fill="none" stroke={color} strokeWidth={2.4} strokeDasharray="6 4" />
    </g>
  );
}

/** Camels in a block: n of them, `per` to a row, the last `babies` small. */
function Camels({ x, y, n, per = 3, gx = 32, gy = 22, babies = 0, s = 0.62 }: { x: number; y: number; n: number; per?: number; gx?: number; gy?: number; babies?: number; s?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <SmallCamel key={i} x={r1(x + ((i % per) - (Math.min(per, n) - 1) / 2) * gx)} y={r1(y + Math.floor(i / per) * gy)} s={s} baby={i >= n - babies} color={i % 2 ? "#A86A36" : "#8E5A30"} />
      ))}
    </g>
  );
}

function Goats({ x, y, n, per = 3, gx = 26, gy = 18 }: { x: number; y: number; n: number; per?: number; gx?: number; gy?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`translate(${r1(x + ((i % per) - (Math.min(per, n) - 1) / 2) * gx)} ${r1(y + Math.floor(i / per) * gy)}) scale(0.48)`}>
          <GoatShape color={i % 3 === 0 ? "#F2EDE2" : i % 3 === 1 ? "#A8744A" : "#5A4034"} />
        </g>
      ))}
    </g>
  );
}

/** The well: a ring of stones with a rope and a bucket. */
function Well({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={0} rx={30} ry={10} fill="#3A4A6A" />
      <path d="M-32 0 Q-32 14 0 16 Q32 14 32 0" fill="#9C8A76" stroke="#7A6A56" strokeWidth={2} />
      <path d="M-22 -40 V0 M22 -40 V0 M-26 -40 H26" stroke="#7A4A26" strokeWidth={4} />
      <path d="M0 -40 V-12" stroke="#C9A06A" strokeWidth={1.6} />
      <path d="M-6 -12 H6 L4 -2 H-4Z" fill="#8A5A36" />
    </g>
  );
}

function DateFruit({ x = 0, y = 0 }: { x?: number; y?: number }) {
  return <ellipse cx={x} cy={y} rx={6} ry={3.6} fill="#7A3A1A" />;
}

export default function HalfTheHerd({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Before dawn: twelve camels wake up grumbling. "Today half go to the well."
    case 0:
      return (
        <Plain id={id} time="dawn">
          <Camels x={200} y={210} n={12} per={6} gx={34} gy={30} babies={3} />
          <Label x={200} y={170} text="12" size={24} color="#E8513B" delay={1.4} />
          <Place x={60} y={298} s={0.34} tap={TAP.ayan}>
            <Camel who="aabo" mood="happy" />
          </Place>
          <Place x={346} y={298} s={0.28} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="wow" />
          </Place>
        </Plain>
      );
    // How many is half? Share into two equal groups: one for the well, one for home.
    case 1:
      return (
        <Plain id={id}>
          {Array.from({ length: 12 }, (_, i) => {
            const side = i % 2;
            const k = Math.floor(i / 2);
            const tx = side ? 290 : 110;
            const x = r1(tx + ((k % 3) - 1) * 34);
            const y = r1(200 + Math.floor(k / 3) * 30);
            return (
              <g key={i} className="me-slide" style={vars({ "--fx": `${r1(200 - x)}px`, "--fy": "-20px", "--delay": `${r1(0.6 + i * 0.3)}s`, "--dur": "0.6s" })}>
                <SmallCamel x={x} y={y} s={0.62} baby={i >= 9} color={i % 2 ? "#A86A36" : "#8E5A30"} />
              </g>
            );
          })}
          <Ring x={110} y={198} rx={70} ry={42} t={4.4} />
          <Ring x={290} y={198} rx={70} ry={42} t={4.6} />
          <Place x={200} y={298} s={0.26} tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" />
          </Place>
        </Plain>
      );
    // Six to the well, six at home: half of twelve is six.
    case 2:
      return (
        <Plain id={id}>
          <Well x={330} y={170} />
          <Camels x={110} y={196} n={6} per={3} gx={34} gy={30} />
          <g className="hth-walk">
            <Camels x={290} y={210} n={6} per={3} gx={34} gy={30} />
          </g>
          <Ring x={110} y={208} rx={66} ry={40} t={0.6} hi />
          <Fraction x={110} y={110} top={1} bottom={2} delay={1.4} size={22} />
          <Label x={200} y={120} text="6 + 6 = 12" size={20} color="#1B2A4E" delay={2.2} />
          <Place x={210} y={298} s={0.26} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
        </Plain>
      );
    // At the well: four equal groups of three. A quarter of twelve is three, like the babies.
    case 3:
      return (
        <Plain id={id}>
          <Well x={360} y={166} />
          {[0, 1, 2, 3].map((g) => (
            <g key={g}>
              <Camels x={60 + g * 84} y={214} n={3} per={3} gx={22} babies={g === 3 ? 3 : 0} s={0.5} />
              <Ring x={60 + g * 84} y={208} rx={38} ry={28} t={0.8 + g * 0.4} hi={g === 3} />
            </g>
          ))}
          <Fraction x={312} y={118} top={1} bottom={4} delay={2.6} size={22} />
          <Label x={230} y={118} text="12 → 3" size={20} color="#1B2A4E" delay={3} />
          <Place x={200} y={300} s={0.32} tap={TAP.ayan}>
            <Camel who="aabo" mood="happy" />
          </Place>
        </Plain>
      );
    // Home: nine goats. "Abdi, look after a third of them."
    case 4:
      return (
        <Plain id={id}>
          <Goats x={200} y={220} n={9} per={5} gx={30} gy={22} />
          <Label x={200} y={180} text="9" size={24} color="#E8513B" delay={1} />
          <Place x={70} y={298} s={0.34} tap={TAP.ayan}>
            <Camel who="hooyo" mood="happy" />
          </Place>
          <Place x={340} y={298} s={0.24} flip tap={TAP.ayan}>
            <Camel who="abdi" mood="wow" />
          </Place>
        </Plain>
      );
    // Two, four and three: not thirds. Thirds must be equal groups.
    case 5:
      return (
        <Plain id={id}>
          <Goats x={90} y={216} n={2} per={2} />
          <Goats x={200} y={208} n={4} per={2} />
          <Goats x={310} y={216} n={3} per={3} />
          <Ring x={90} y={214} rx={40} ry={26} t={0.6} color="#E2463F" />
          <Ring x={200} y={214} rx={44} ry={34} t={0.9} color="#E2463F" />
          <Ring x={310} y={214} rx={48} ry={26} t={1.2} color="#E2463F" />
          <Mark x={200} y={140} ok={false} delay={2} />
          <Place x={360} y={298} s={0.22} flip tap={TAP.ayan}>
            <Camel who="abdi" mood="worried" />
          </Place>
          <Place x={50} y={298} s={0.26} tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" />
          </Place>
        </Plain>
      );
    // Three, three and three: a third of nine is three. Abdi leads his three goats off.
    case 6:
      return (
        <Plain id={id}>
          <Goats x={90} y={216} n={3} />
          <Goats x={200} y={216} n={3} />
          <g className="hth-off">
            <Goats x={310} y={216} n={3} />
          </g>
          <Ring x={90} y={214} rx={44} ry={24} t={0.6} />
          <Ring x={200} y={214} rx={44} ry={24} t={0.8} />
          <Ring x={310} y={214} rx={44} ry={24} t={1} hi />
          <Fraction x={310} y={130} top={1} bottom={3} delay={1.6} size={22} />
          <Mark x={200} y={140} ok delay={2} s={0.8} />
          <Place x={350} y={298} s={0.24} flip className="hth-proud" tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" walk />
          </Place>
        </Plain>
      );
    // Ten cups of warm camel milk: half for the neighbours. Five and five.
    case 7:
      return (
        <Plain id={id}>
          {[0, 1].map((g) => (
            <g key={g}>
              <SharePlate x={120 + g * 160} y={232} w={120} color="#E8C08A" />
              {[0, 1, 2, 3, 4].map((i) => (
                <g key={i} className="lali-pop-in" style={d(0.6 + (i * 2 + g) * 0.25)}>
                  <Cup x={r1(88 + g * 160 + i * 16)} y={230} s={1.2} />
                </g>
              ))}
              <Ring x={120 + g * 160} y={222} rx={70} ry={28} t={3.2 + g * 0.3} hi={g === 1} />
            </g>
          ))}
          <Fraction x={200} y={120} top={1} bottom={2} delay={3.8} size={22} />
          <Label x={280} y={128} text="5" size={26} color="#E8513B" delay={4.2} />
          <Place x={50} y={298} s={0.32} tap={TAP.ayan}>
            <Camel who="hooyo" mood="happy" kneel />
          </Place>
        </Plain>
      );
    // {name}: a quarter of eight dates. Two, two, two and two.
    case 8:
      return (
        <Plain id={id}>
          {[0, 1, 2, 3].map((g) => (
            <g key={g}>
              <SharePlate x={70 + g * 86} y={230} w={64} color="#FFF6E2" />
              {[0, 1].map((i) => (
                <g key={i} className="lali-pop-in" style={d(0.6 + (i * 4 + g) * 0.3)}>
                  <DateFruit x={62 + g * 86 + i * 16} y={226} />
                </g>
              ))}
              <Label x={70 + g * 86} y={264} text="2" size={18} color="#2F5BD3" delay={3.2} />
            </g>
          ))}
          <Ring x={70} y={226} rx={38} ry={20} t={3.6} hi />
          <Fraction x={200} y={120} top={1} bottom={4} delay={4} size={22} />
          <BeeHover x={330} y={110} s={1.1} flip />
        </Plain>
      );
    // Sunset: six and six, the whole herd together again. Two halves make a whole.
    case 9:
      return (
        <Plain id={id} time="dusk">
          <Camels x={110} y={200} n={6} per={3} gx={34} gy={30} />
          <g className="me-slide" style={vars({ "--fx": "200px", "--fy": "0px", "--delay": "0.4s", "--dur": "2.6s" })}>
            <Camels x={260} y={200} n={6} per={3} gx={34} gy={30} />
          </g>
          <Fraction x={110} y={120} top={1} bottom={2} delay={2.8} size={20} />
          <Label x={160} y={128} text="+" size={26} color="#1B2A4E" delay={3} />
          <Fraction x={210} y={120} top={1} bottom={2} delay={3.2} size={20} />
          <Label x={262} y={128} text="= 1" size={26} color="#E8513B" delay={3.6} />
          <Place x={360} y={298} s={0.3} flip tap={TAP.ayan}>
            <Camel who="aabo" mood="joy" walk />
          </Place>
        </Plain>
      );
    // Under the stars: "Half, quarter, third." "That is how a good herder thinks."
    case 10:
      return (
        <Plain id={id} time="night">
          <Camels x={300} y={214} n={12} per={6} gx={14} gy={14} s={0.4} babies={3} />
          <Place x={110} y={298} s={0.36} tap={TAP.ayan}>
            <Camel who="aabo" mood="happy" kneel />
          </Place>
          <Place x={200} y={298} s={0.3} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" kneel />
          </Place>
          <g transform="translate(200 110)">
            <Fraction x={-60} y={0} top={1} bottom={2} delay={1} size={18} />
            <Fraction x={0} y={0} top={1} bottom={4} delay={1.5} size={18} />
            <Fraction x={60} y={0} top={1} bottom={3} delay={2} size={18} />
          </g>
        </Plain>
      );
    // Abdi asleep, dreaming of his three little goats.
    case 11:
      return (
        <Plain id={id} time="night">
          <Place x={140} y={298} s={0.3} tap={TAP.ayan}>
            <Camel who="abdi" mood="happy" kneel />
          </Place>
          <Zzz x={180} y={210} />
          <g transform="translate(270 140)">
            <ellipse cx={0} cy={0} rx={80} ry={44} fill="#FFFDF4" opacity={0.18} className="lali-pulse" />
            <g className="hth-dream">
              <Goats x={0} y={10} n={3} />
            </g>
          </g>
        </Plain>
      );
    default:
      return null;
  }
}
