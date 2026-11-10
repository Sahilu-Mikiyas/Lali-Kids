"use client";

import { useId, type ReactNode } from "react";

import { Place, vars } from "../../scenery";
import { Cub, Grandma, Gugu, Papa, TAP, Tsehay } from "./kit-cast";
import { d, Mango, r1 } from "./kit";
import { Jumps, Label, Mark, NumberLine, SumCard } from "./kit-maths";
import { Birr, BirrCoin, PriceTag } from "./kit-measure";
import { Home } from "./kit-places";
import { Dabo } from "./kit-props";

/*
  "Change from 100 Birr": one living picture per page (12 pages) at Grandma's and in Ato Abebe's
  corner shop. Prices hang on tags; notes and coins slide across the counter; the change is
  found on a number line by counting up from the total to the money paid.
*/

function Shop({ children }: { id?: string; children: ReactNode }) {
  return (
    <g>
      <rect width={400} height={300} fill="#7FC8C0" />
      <rect x={0} y={40} width={400} height={6} fill="#5AA8A0" />
      {[70, 120].map((y) => (
        <rect key={y} x={30} y={y} width={340} height={6} rx={2} fill="#8A5A36" />
      ))}
      {Array.from({ length: 10 }, (_, i) => (
        <rect key={i} x={40 + i * 33} y={i % 2 ? 50 : 54} width={22} height={i % 2 ? 20 : 16} rx={3} fill={["#E2463F", "#F5B21E", "#2F6FD0", "#2E9A5A", "#FFFDF4"][i % 5]} />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <circle key={i} cx={50 + i * 42} cy={110} r={8} fill={["#F5961E", "#E8D2A6", "#C98A3A"][i % 3]} />
      ))}
      <rect x={-10} y={196} width={420} height={110} fill="#C99A64" />
      <rect x={20} y={176} width={360} height={30} rx={4} fill="#8A5A36" />
      <rect x={20} y={172} width={360} height={8} rx={3} fill="#A86E3C" />
      {children}
    </g>
  );
}

const MilkPack = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M-10 0 V-28 L-5 -34 H5 L10 -28 V0Z" fill="#FFFFFF" stroke="#C9C2B4" />
    <rect x={-8} y={-22} width={16} height={8} fill="#2F6FD0" />
  </g>
);
const Eggs = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-22} y={-8} width={44} height={10} rx={3} fill="#C9A26A" />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <ellipse key={i} cx={-17 + (i % 3) * 17} cy={-10 - Math.floor(i / 3) * 6} rx={5} ry={6} fill="#F6E7D2" stroke="#D9C2A0" />
    ))}
  </g>
);

export default function ChangeFrom100({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Grandma gives Anbessa a 100-birr note and a list.
    case 0:
      return (
        <Home id={id} shelf={false}>
          <g className="lali-pop-in" style={d(0.8)}>
            <Birr x={200} y={150} value={100} s={1.8} a={-6} />
          </g>
          <g transform="translate(290 120) rotate(6)" className="lali-fade-in" style={d(1.4)}>
            <rect x={-30} y={-36} width={60} height={72} fill="#FFFDF4" stroke="#C9C2B4" />
            <path d="M-20 -20 H20 M-20 -4 H20 M-20 12 H14" stroke="#8A5A36" strokeWidth={2} />
          </g>
          <Place x={80} y={300} s={0.4} tap={TAP.grandma}>
            <Grandma arm="hold" />
          </Place>
          <Place x={330} y={300} s={0.34} flip tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
        </Home>
      );
    // Price tags: bread 20, milk 40, eggs 30.
    case 1:
      return (
        <Shop id={id}>
          <Dabo x={110} y={170} s={1} />
          <MilkPack x={200} y={172} />
          <Eggs x={290} y={170} />
          <PriceTag x={110} y={136} price={20} delay={0.8} />
          <PriceTag x={200} y={124} price={40} delay={1.3} />
          <PriceTag x={290} y={136} price={30} delay={1.8} />
          <Place x={330} y={176} s={0.3} flip tap={TAP.papa}>
            <Papa mood="happy" />
          </Place>
          <Place x={70} y={300} s={0.34} tap={TAP.cub}>
            <Cub mood="happy" />
          </Place>
        </Shop>
      );
    // Tens with tens: 20 + 40 + 30 = 90.
    case 2:
      return (
        <Shop id={id}>
          <Dabo x={110} y={170} s={1} />
          <MilkPack x={200} y={172} />
          <Eggs x={290} y={170} />
          <SumCard x={200} y={240} tokens={["20", "+", "40", "+", "30", "=", "90"]} start={0.8} step={0.35} size={24} hl={{ 6: "#E8513B" }} />
          <Place x={50} y={300} s={0.3} tap={TAP.cub}>
            <Cub mood="happy" />
          </Place>
        </Shop>
      );
    // Count up from 90 to 100: ten birr change.
    case 3:
      return (
        <Shop id={id}>
          <g className="me-slide" style={vars({ "--fx": "-120px", "--fy": "60px", "--delay": "0.6s" })}>
            <Birr x={200} y={150} value={100} s={1.2} />
          </g>
          <NumberLine x0={70} x1={330} y={240} from={80} to={100} tick={1} label={5} hi={[90, 100]} />
          <Jumps x0={70} x1={330} y={240} from={80} to={100} stops={[90, 100]} start={1.6} labels={["+10"]} />
          <Place x={350} y={176} s={0.28} flip tap={TAP.papa}>
            <Papa mood="happy" pose="point" />
          </Place>
        </Shop>
      );
    // A 10-birr note: 100 − 90 = 10.
    case 4:
      return (
        <Shop id={id}>
          <g className="lali-pop-in" style={d(0.8)}>
            <Birr x={200} y={150} value={10} s={1.4} />
          </g>
          <SumCard x={200} y={240} tokens={["100", "−", "90", "=", "10"]} start={1.4} size={26} hl={{ 4: "#E8513B" }} />
          <Place x={60} y={300} s={0.32} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
        </Shop>
      );
    // A mango for 15 birr, but only 10, and it is Grandma's.
    case 5:
      return (
        <Shop id={id}>
          <Mango x={170} y={160} s={2.4} big />
          <PriceTag x={170} y={118} price={15} delay={0.6} />
          <Birr x={270} y={150} value={10} s={1} />
          <Label x={220} y={240} text="15 > 10" size={26} color="#E8513B" delay={1.4} />
          <Mark x={320} y={110} ok={false} delay={2} s={0.8} />
          <Place x={70} y={300} s={0.32} tap={TAP.cub}>
            <Cub mood="sad" />
          </Place>
        </Shop>
      );
    // Grandma's purse: 50, then 60, 70. Count the biggest first.
    case 6:
      return (
        <Home id={id} shelf={false}>
          <g className="lali-pop-in" style={d(0.6)}>
            <Birr x={110} y={170} value={50} s={1.2} />
          </g>
          <g className="lali-pop-in" style={d(1.2)}>
            <Birr x={190} y={170} value={10} s={1.2} />
          </g>
          <g className="lali-pop-in" style={d(1.8)}>
            <Birr x={270} y={170} value={10} s={1.2} />
          </g>
          <Label x={110} y={136} text="50" size={20} color="#2F5BD3" delay={0.9} />
          <Label x={190} y={136} text="60" size={20} color="#2F5BD3" delay={1.5} />
          <Label x={270} y={136} text="70" size={20} color="#2F5BD3" delay={2.1} />
          <Place x={80} y={300} s={0.38} tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
          <Place x={330} y={300} s={0.3} flip tap={TAP.cub}>
            <Cub mood="happy" />
          </Place>
        </Home>
      );
    // Gugu: 20 + 25 = 45; from 50, five one-birr coins.
    case 7:
      return (
        <Shop id={id}>
          <SumCard x={200} y={150} tokens={["20", "+", "25", "=", "45"]} start={0.6} size={22} hl={{ 4: "#2F5BD3" }} />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i} className="lali-pop-in" style={d(2.2 + i * 0.3)}>
              <BirrCoin x={r1(150 + i * 25)} y={196} s={1.2} />
            </g>
          ))}
          <Label x={200} y={250} text="45 → 50" size={22} color="#E8513B" delay={2} />
          <Place x={60} y={300} s={0.3} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
        </Shop>
      );
    // Tsehay pays exactly 30 with three 10-birr notes.
    case 8:
      return (
        <Shop id={id}>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <g className="lali-pop-in" style={d(0.8 + i * 0.6)}>
                <Birr x={120 + i * 80} y={150} value={10} s={1.1} />
              </g>
              <Label x={120 + i * 80} y={116} text={String((i + 1) * 10)} size={18} color="#2F5BD3" delay={1.1 + i * 0.6} />
            </g>
          ))}
          <Mark x={200} y={240} ok delay={3} />
          <Place x={60} y={300} s={0.3} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
        </Shop>
      );
    // {name}: a 65-birr book paid with 100: 5 + 30 = 35 change.
    case 9:
      return (
        <Shop id={id}>
          <NumberLine x0={70} x1={330} y={150} from={60} to={100} tick={5} label={5} hi={[65, 70, 100]} />
          <Jumps x0={70} x1={330} y={150} from={60} to={100} stops={[65, 70, 100]} start={1} step={1} labels={["+5", "+30"]} />
          <SumCard x={200} y={240} tokens={["5", "+", "30", "=", "35"]} start={3} size={24} hl={{ 4: "#E8513B" }} />
        </Shop>
      );
    // Every birr is here: keep the ten for your money box.
    case 10:
      return (
        <Home id={id} shelf={false}>
          <Dabo x={170} y={240} s={0.9} />
          <MilkPack x={210} y={244} />
          <Eggs x={250} y={244} />
          <g className="lali-pop-in" style={d(1)}>
            <Birr x={210} y={150} value={10} s={1.2} />
          </g>
          <Place x={80} y={300} s={0.4} tap={TAP.grandma}>
            <Grandma arm="bless" mood="joy" />
          </Place>
          <Place x={340} y={300} s={0.32} flip tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
        </Home>
      );
    // Into the money box: saving for a 100-birr football. Ninety to go.
    case 11:
      return (
        <Home id={id} time="evening" shelf={false}>
          <g transform="translate(200 230)">
            <rect x={-30} y={-40} width={60} height={44} rx={6} fill="#E8B64A" />
            <rect x={-12} y={-42} width={24} height={4} rx={2} fill="#6A4A2A" />
            <g className="me-slide" style={vars({ "--fx": "0px", "--fy": "-60px", "--delay": "0.6s" })}>
              <Birr x={0} y={-52} value={10} s={0.6} a={90} />
            </g>
          </g>
          <g transform="translate(300 160)">
            <circle r={22} fill="#FFFDF4" stroke="#1B2A4E" strokeWidth={2} />
            <path d="M-8 -12 L8 -12 L12 4 L0 14 L-12 4Z" fill="#1B2A4E" opacity={0.8} />
          </g>
          <Label x={300} y={210} text="100" size={18} color="#2F5BD3" delay={1.6} />
          <Place x={90} y={300} s={0.36} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
        </Home>
      );
    default:
      return null;
  }
}
