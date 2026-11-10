"use client";

import "./bajaj-trip.css";

import { useId, type ReactNode } from "react";

import { Air, BeeFlight, BeeHover, DriftCloud, Place, Sky, Sun, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Cub, Gugu, Papa, TAP, Teacher, Tsehay, Wolf } from "./kit-cast";
import { d, r1 } from "./kit";
import { Bajaj, Kid, Label, SharePlate, SumCard } from "./kit-maths";
import { Home, TownHouse, Yard } from "./kit-places";
import { Classroom } from "./kit-things";

/*
  "How Many Bajajs?": one living picture per page (12 pages): the classroom, an Addis Ababa
  street with its blue three-wheeled bajajs, and the National Museum where Lucy lies in her
  glass case. The class is a crowd of small faces; groups of three climb into each bajaj, and
  the two left over wait on the pavement until a fifth bajaj comes. Story keyframes: bt-* in
  ./bajaj-trip.css.
*/

const FACES = ["#9C7552", "#C9622B", "#C98A4E", "#6A4A3A", "#8A5A3A", "#B5774A", "#5A4034"];

function Street({ id, time = "day", children }: { id: string; time?: "day" | "evening"; children: ReactNode }) {
  const eve = time === "evening";
  return (
    <g>
      <Sky id={id} from={eve ? "#5A4A9E" : "#7FCFFF"} mid={eve ? "#F08A6A" : "#B8E6FF"} to={eve ? "#FFD08A" : "#F2FBFF"} />
      {!eve && <Sun x={330} y={52} r={20} />}
      <DriftCloud y={40} s={0.6} dur={70} phase={0.3} />
      <TownHouse x={60} y={190} s={0.62} night={eve} />
      <TownHouse x={170} y={186} s={0.7} wall="#F2C38A" trim="#2E9A8A" night={eve} />
      <TownHouse x={290} y={190} s={0.64} wall="#E8A0A0" trim="#F5B21E" night={eve} />
      <TownHouse x={390} y={188} s={0.6} wall="#B8D8A0" night={eve} />
      <rect x={-10} y={196} width={420} height={18} fill="#C9C2B4" />
      <path d="M-10 214 H410 V310 H-10Z" fill="#6A6A72" />
      <path d="M-10 262 H410" stroke="#F5F0D8" strokeWidth={3} strokeDasharray="18 14" />
      {children}
      <Air kind={eve ? "dusk" : "day"} seed={71} grass={false} />
    </g>
  );
}

/** A little crowd of faces in a block (cols per row), popping in or already there. */
function Crowd({ x, y, n, cols = 7, gap = 26, pop = 0, start = 0 }: { x: number; y: number; n: number; cols?: number; gap?: number; pop?: number; start?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const kx = r1(x + ((i % cols) - (Math.min(n, cols) - 1) / 2) * gap);
        const ky = r1(y + Math.floor(i / cols) * (gap + 6));
        const k = <Kid x={kx} y={ky} color={FACES[(i + start) % FACES.length]} bow={(i + start) % 3 === 1} />;
        return pop ? (
          <g key={i} className="lali-pop-in" style={d(pop + i * 0.08)}>
            {k}
          </g>
        ) : (
          <g key={i}>{k}</g>
        );
      })}
    </g>
  );
}

/** Lucy (Dinkinesh): the famous fossil, laid out in a lit glass case. */
function LucyCase({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const bone = "#C9A27A";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="grow" sound="chime">
        <rect x={-90} y={-60} width={180} height={90} rx={6} fill="#2A2A3A" />
        <rect x={-84} y={-54} width={168} height={78} rx={4} fill="#3A3A50" />
        <g stroke={bone} strokeWidth={4} strokeLinecap="round" fill="none">
          <ellipse cx={-56} cy={-14} rx={10} ry={8} fill={bone} stroke="none" />
          <path d="M-44 -14 H20" strokeDasharray="5 3" />
          <path d="M-36 -24 Q-30 -14 -36 -4 M-26 -26 Q-20 -14 -26 -2 M-16 -26 Q-10 -14 -16 -2" />
          <path d="M-30 -22 L-10 -38 M-30 -6 L-6 8" />
          <ellipse cx={26} cy={-14} rx={10} ry={8} fill="none" />
          <path d="M34 -18 L64 -28 M34 -10 L62 0 M64 -28 L76 -24 M62 0 L74 6" />
        </g>
        <rect x={-84} y={-54} width={168} height={78} rx={4} fill="#9ED8FF" opacity={0.18} />
        <path d="M-70 -50 L-40 20" stroke="#fff" strokeOpacity={0.25} strokeWidth={6} />
        <rect x={-30} y={34} width={60} height={14} rx={3} fill="#C9A24A" />
      </Tappable>
    </g>
  );
}

/** A bunch of three classmates riding in a bajaj (k: which faces). */
function Ride({ x, y, k = 0, s = 0.9, drive = false }: { x: number; y: number; k?: number; s?: number; drive?: boolean }) {
  return <Bajaj x={x} y={y} s={s} riders={3} drive={drive} colors={[FACES[k % 7], FACES[(k + 2) % 7], FACES[(k + 4) % 7]]} />;
}

/** A banana (for the snack tables). */
function Banana({ x = 0, y = 0, a = 0 }: { x?: number; y?: number; a?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${a})`}>
      <path d="M-9 -2 Q0 8 10 -4 Q2 3 -9 -2Z" fill="#F5D23A" stroke="#C9A020" strokeWidth={1} />
    </g>
  );
}

export default function BajajTrip({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Teacher Meron's class of fourteen: a trip to the National Museum to see Lucy.
    case 0:
      return (
        <Classroom id={id}>
          <g className="bt-bounce">
            <Crowd x={180} y={204} n={14} cols={7} gap={30} />
          </g>
          <Place x={350} y={300} s={0.4} flip tap={TAP.mama}>
            <Teacher mood="joy" pose="wave" />
          </Place>
          <Label x={180} y={180} text="14" size={22} color="#E8513B" delay={1.4} />
        </Classroom>
      );
    // "Each bajaj carries three." Tsehay puts the children into groups of three.
    case 1:
      return (
        <Street id={id}>
          <Bajaj x={330} y={262} s={1} />
          {[0, 1, 2, 3].map((g) => (
            <g key={g}>
              <Crowd x={60 + g * 66} y={186} n={3} cols={3} gap={18} start={g * 3} />
              <ellipse cx={60 + g * 66} cy={194} rx={32} ry={20} fill="none" stroke="#E8513B" strokeWidth={2.4} strokeDasharray="5 4" className="lali-fade-in" style={d(1 + g * 0.5)} />
            </g>
          ))}
          <Crowd x={60} y={232} n={2} cols={2} gap={18} start={12} />
          <Place x={250} y={300} s={0.3} tap={TAP.tsehay}>
            <Tsehay mood="happy" pose="point" />
          </Place>
        </Street>
      );
    // One bajaj, three; two, six; three, nine; four, twelve.
    case 2:
      return (
        <Street id={id}>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <g className="mq-drive" style={vars({ "--fx": "420px", "--delay": `${r1(0.4 + i * 0.8)}s`, "--dur": "1.2s" })}>
                <Ride x={60 + i * 92} y={262} k={i * 3} s={0.85} />
              </g>
              <Label x={60 + i * 92} y={182} text={String((i + 1) * 3)} size={22} color="#E8513B" delay={1.4 + i * 0.8} />
            </g>
          ))}
        </Street>
      );
    // Two left on the pavement, Gugu and Hawi: four bajajs and two left over. 14 ÷ 3 = 4.
    case 3:
      return (
        <Street id={id}>
          {[0, 1, 2, 3].map((i) => (
            <Ride key={i} x={60 + i * 92} y={276} k={i * 3} s={0.8} />
          ))}
          <SumCard x={160} y={80} tokens={["14", "÷", "3", "=", "4"]} start={1} hl={{ 1: "#E8513B" }} size={24} />
          <Label x={300} y={88} text="+2" size={26} color="#E8513B" delay={3.4} />
          <Place x={300} y={212} s={0.24} tap={TAP.gugu}>
            <Gugu mood="worried" />
          </Place>
          <Place x={350} y={212} s={0.24} tap={TAP.hawi}>
            <Wolf mood="worried" />
          </Place>
        </Street>
      );
    // "We can't leave anyone behind!" One more bajaj: five.
    case 4:
      return (
        <Street id={id}>
          {[0, 1, 2, 3].map((i) => (
            <Ride key={i} x={54 + i * 70} y={276} k={i * 3} s={0.62} />
          ))}
          <g className="mq-drive" style={vars({ "--fx": "300px", "--delay": "1.6s", "--dur": "1.6s" })}>
            <Bajaj x={334} y={278} s={0.62} />
          </g>
          <Place x={70} y={210} s={0.3} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Place x={300} y={212} s={0.24} tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
          <Place x={340} y={212} s={0.24} tap={TAP.hawi}>
            <Wolf mood="happy" />
          </Place>
          <Label x={200} y={110} text="4 + 1 = 5" size={28} color="#2F5BD3" delay={2.6} />
        </Street>
      );
    // Room for Teacher Meron in the fifth: five bajajs, fifteen passengers. 15 ÷ 3 = 5.
    case 5:
      return (
        <Street id={id}>
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <Ride x={62 + i * 69} y={276} k={i * 3} s={0.6} />
              <Label x={62 + i * 69} y={218} text={String((i + 1) * 3)} size={16} color="#E8513B" delay={0.6 + i * 0.4} />
            </g>
          ))}
          <SumCard x={200} y={96} tokens={["15", "÷", "3", "=", "5"]} start={2.8} hl={{ 1: "#E8513B", 4: "#E8513B" }} geezOf={5} />
        </Street>
      );
    // Five blue bajajs in a line, buzzing through Addis Ababa like busy bees.
    case 6:
      return (
        <Street id={id}>
          <g className="bt-zoom">
            {[0, 1, 2, 3, 4].map((i) => (
              <Ride key={i} x={-40 + i * 92} y={270} k={i * 3} s={0.72} drive />
            ))}
          </g>
          <BeeFlight path="M-20 150 C80 110 160 170 240 130 S360 110 420 150" dur={6} s={1} rest={[200, 140]} trailColor="#FFE27A" />
        </Street>
      );
    // The guide takes groups of five: five, ten, fifteen. 15 ÷ 5 = 3.
    case 7:
      return (
        <g>
          <rect width={400} height={300} fill="#E8E2D6" />
          <rect x={-10} y={220} width={420} height={90} fill="#B8A890" />
          <path d="M40 30 V210 M360 30 V210" stroke="#D6CCB8" strokeWidth={18} />
          {[0, 1, 2].map((g) => (
            <g key={g}>
              <Crowd x={84 + g * 116} y={186} n={5} cols={3} gap={20} start={g * 5} />
              <ellipse cx={84 + g * 116} cy={200} rx={44} ry={30} fill="none" stroke="#2E9A5A" strokeWidth={2.4} strokeDasharray="5 4" className="lali-fade-in" style={d(1 + g * 0.6)} />
              <Label x={84 + g * 116} y={160} text={String((g + 1) * 5)} size={18} color="#2E9A5A" delay={1.3 + g * 0.6} />
            </g>
          ))}
          <SumCard x={200} y={80} tokens={["15", "÷", "5", "=", "3"]} start={3.2} hl={{ 1: "#2E9A5A", 4: "#E8513B" }} />
          <Place x={360} y={300} s={0.34} flip tap={TAP.papa}>
            <Papa mood="happy" pose="point" />
          </Place>
        </g>
      );
    // Quiet in front of Lucy: Dinkinesh, "you are wonderful".
    case 8:
      return (
        <g>
          <rect width={400} height={300} fill="#2E2A3A" />
          <ellipse cx={200} cy={150} rx={160} ry={110} fill="#FFE9A0" opacity={0.12} className="lali-pulse" />
          <LucyCase x={200} y={140} s={1.3} />
          <Crowd x={160} y={262} n={7} cols={7} gap={30} />
          <Place x={360} y={300} s={0.34} flip tap={TAP.papa}>
            <Papa mood="happy" />
          </Place>
          <g className="lali-pop-in" style={d(1.6)}>
            <path d="M200 70 C186 58 176 70 200 86 C224 70 214 58 200 70Z" fill="#E2463F" />
          </g>
        </g>
      );
    // {name}: twenty bananas shared between five tables. Four each. 20 ÷ 5 = 4.
    case 9:
      return (
        <Yard id={id} house={false} tree fig={60}>
          {[0, 1, 2, 3, 4].map((t) => (
            <g key={t}>
              <SharePlate x={50 + t * 75} y={236} w={62} color="#FFFDF4" />
              {[0, 1, 2, 3].map((r) => (
                <g key={r} className="lali-pop-in" style={d(0.6 + (r * 5 + t) * 0.18)}>
                  <Banana x={r1(40 + t * 75 + (r % 2) * 18)} y={r1(232 - Math.floor(r / 2) * 8)} a={(r % 2 ? 1 : -1) * 15} />
                </g>
              ))}
              <Label x={50 + t * 75} y={270} text="4" size={18} color="#2F5BD3" delay={4.4} />
            </g>
          ))}
          <SumCard x={200} y={110} tokens={["20", "÷", "5", "=", "4"]} start={4.8} hl={{ 1: "#E8513B", 4: "#2F5BD3" }} />
          <BeeHover x={340} y={60} s={1} flip />
        </Yard>
      );
    // Home time: fifteen heads, five bajajs. Three in each, off we go!
    case 10:
      return (
        <Street id={id} time="evening">
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i} className="mq-leave" style={vars({ "--tx": "-460px", "--delay": `${r1(2.4 + i * 0.3)}s`, "--dur": "2.2s" })}>
              <Ride x={62 + i * 69} y={276} k={i * 3} s={0.6} />
            </g>
          ))}
          <SumCard x={200} y={100} tokens={["15", "÷", "3", "=", "5"]} start={0.6} hl={{ 1: "#E8513B", 4: "#E8513B" }} />
        </Street>
      );
    // That night Gugu draws Lucy and five bajajs, three heads in each.
    case 11:
      return (
        <Home id={id} time="night">
          <g transform="translate(200 160)">
            <rect x={-110} y={-70} width={220} height={140} rx={4} fill="#FFFDF4" transform="rotate(-3)" />
            <g transform="rotate(-3)">
              <g className="lali-fade-in" style={d(0.8)}>
                <LucyCase x={-50} y={-14} s={0.42} />
              </g>
              {[0, 1, 2, 3, 4].map((i) => (
                <g key={i} className="lali-fade-in" style={d(1.4 + i * 0.4)}>
                  <Ride x={-80 + i * 40} y={56} k={i * 3} s={0.32} />
                </g>
              ))}
            </g>
          </g>
          <Place x={330} y={300} s={0.32} flip tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <BeeHover x={100} y={100} s={1} />
        </Home>
      );
    default:
      return null;
  }
}
