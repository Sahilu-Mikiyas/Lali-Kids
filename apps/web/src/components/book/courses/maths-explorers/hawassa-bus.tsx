"use client";

import "./hawassa-bus.css";

import { useId, type ReactNode } from "react";

import { GuguShape } from "../../../characters";
import { Air, BeeHover, DriftCloud, Place, Sky, Sun, Mountains, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Grandma, Gugu, Mama, OnHead, TAP, Tsehay } from "./kit-cast";
import { d, LATIN, r1 } from "./kit";
import { Bus, NumBubble, ONE, SumCard, TEN, Ticket, TicketBundle } from "./kit-maths";
import { Sign } from "./kit-props";

/*
  "The Bus to Hawassa": one living picture per page (12 pages) on the road south from Addis
  Ababa. The conductor's tickets are the maths: bundles of ten with a red rubber band (tens)
  and loose tickets (ones) on a board split down the middle, with the digit for each side
  under it. New tickets pop in, tickets of people getting off fly away, ten loose ones gather
  into a new bundle, and a bundle opens into ten loose ones. Story keyframes: hb-* in
  ./hawassa-bus.css.
*/

type Item = 0 | ["in", number] | ["out", number] | ["inout", number, number];
const keep = (n: number): Item[] => Array.from({ length: n }, () => 0 as const);
const add = (n: number, t: number, step = 0.25): Item[] => Array.from({ length: n }, (_, i) => ["in", r1(t + i * step)] as Item);
const out = (n: number, t: number, step = 0.15): Item[] => Array.from({ length: n }, (_, i) => ["out", r1(t + i * step)] as Item);

function wrap(it: Item, node: ReactNode, k: string) {
  if (it === 0) return <g key={k}>{node}</g>;
  if (it[0] === "in")
    return (
      <g key={k} className="lali-pop-in" style={d(it[1])}>
        {node}
      </g>
    );
  if (it[0] === "inout")
    return (
      <g key={k} className="hb-fly me-gone" style={d(it[2])}>
        <g className="lali-pop-in" style={d(it[1])}>
          {node}
        </g>
      </g>
    );
  return (
    <g key={k} className="hb-fly me-gone" style={d(it[1])}>
      {node}
    </g>
  );
}

/** The ticket board: bundles on the left, loose tickets on the right (rows of six), digits underneath. */
function Board({ x, y, tens, ones, digits, s = 1, after }: { x: number; y: number; tens: Item[]; ones: Item[]; digits?: [number, number, number]; s?: number; after?: [number, number] }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-130} y={-56} width={260} height={112} rx={14} fill="#FFFDF4" stroke="#8A5A36" strokeWidth={3} />
      <path d="M0 -50 V50" stroke="#8A5A36" strokeWidth={2} strokeDasharray="5 5" />
      {tens.map((it, i) => wrap(it, <TicketBundle x={-108 + (i % 5) * 21} y={-20 + Math.floor(i / 5) * 34} s={0.95} />, `t${i}`))}
      {ones.map((it, i) => wrap(it, <Ticket x={r1(16 + (i % 6) * 18)} y={r1(-24 + Math.floor(i / 6) * 28)} s={0.9} a={((i * 37) % 14) - 7} />, `o${i}`))}
      {after && add(after[0], after[1], 0.15).map((it, i) => wrap(it, <Ticket x={r1(16 + (i % 6) * 18)} y={-24} s={0.9} a={((i * 37) % 14) - 7} />, `a${i}`))}
      {digits && (
        <>
          <g className="lali-pop-in" style={d(digits[2])}>
            <text x={-65} y={46} fontSize={24} fontFamily={LATIN} fontWeight={900} fill={TEN} textAnchor="middle">
              {digits[0]}
            </text>
          </g>
          <g className="lali-pop-in" style={d(digits[2] + 0.3)}>
            <text x={65} y={46} fontSize={24} fontFamily={LATIN} fontWeight={900} fill={ONE} textAnchor="middle">
              {digits[1]}
            </text>
          </g>
        </>
      )}
    </g>
  );
}

/** Kebede the conductor: a young gelada in a red cap, with a ticket bag. */
function Conductor({ mood = "happy" as const, pose = "sit" as const }: { mood?: "happy" | "joy" | "wow" | "worried"; pose?: "sit" | "wave" | "point" }) {
  return (
    <g>
      <GuguShape mood={mood} pose={pose} />
      <g className="lali-breathe">
        <path d="M60 150 L140 210" stroke="#7A4A26" strokeWidth={6} />
        <rect x={118} y={196} width={40} height={30} rx={6} fill="#8A5A36" />
        <rect x={124} y={190} width={16} height={10} rx={2} fill="#FFF3B8" />
      </g>
      <OnHead>
        <path d="M58 52 Q100 14 142 52Z" fill="#E2463F" />
        <path d="M128 50 Q156 48 164 56 L136 58Z" fill="#B8302C" />
      </OnHead>
    </g>
  );
}

/** The road south: sky, far hills, green fields, and the tarmac road. `lake` adds a lake behind. */
function Road({ id, children, lake = false, time = "day" }: { id: string; children: ReactNode; lake?: boolean; time?: "dawn" | "day" }) {
  return (
    <g>
      <Sky id={id} from={time === "dawn" ? "#8FC8FF" : "#7FCFFF"} mid={time === "dawn" ? "#FFD6B0" : "#B8E6FF"} to={time === "dawn" ? "#FFF2DA" : "#F2FBFF"} />
      <Sun x={time === "dawn" ? 70 : 330} y={time === "dawn" ? 90 : 56} r={20} />
      <DriftCloud y={44} s={0.6} dur={60} phase={0.2} />
      <Mountains />
      <path d="M-10 186 Q200 170 410 186 L410 310 L-10 310Z" fill="#8FCB80" />
      {lake && (
        <g>
          <path d="M-10 196 Q120 180 260 192 T410 190 L410 214 Q200 206 -10 216Z" fill="#5BB8E8" />
          <path d="M30 204 q12 -3 24 0 M150 200 q12 -3 24 0 M300 202 q12 -3 24 0" stroke="#fff" strokeWidth={1.6} fill="none" opacity={0.7} className="lali-ripple" />
        </g>
      )}
      <path d="M-10 236 Q200 226 410 236 L410 276 Q200 266 -10 278Z" fill="#5A5A62" />
      <path d="M-10 256 Q200 246 410 256" stroke="#F5F0D8" strokeWidth={3} strokeDasharray="18 14" fill="none" />
      {children}
      <Air kind="day" seed={17} grass={false} />
    </g>
  );
}

/** A pelican standing (white with a big yellow bill), feet at (0, 0), facing right. */
function Pelican({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="bounce" sound="pop">
        <path d="M-3 0 V-12 M3 0 V-12" stroke="#E8A13A" strokeWidth={2} />
        <ellipse cx={0} cy={-20} rx={13} ry={10} fill="#FBF8F0" />
        <path d="M6 -26 Q10 -40 12 -44" stroke="#FBF8F0" strokeWidth={6} strokeLinecap="round" fill="none" />
        <circle cx={12} cy={-45} r={5} fill="#FBF8F0" />
        <path d="M15 -46 L34 -40 L16 -40Z" fill="#F5B21E" />
        <path d="M16 -40 Q26 -34 33 -40" fill="#F0C060" />
        <circle cx={13} cy={-47} r={1.2} fill="#1A0F0A" />
        <path d="M-12 -22 Q-2 -14 8 -20" stroke="#D9D2C2" strokeWidth={2} fill="none" />
      </Tappable>
    </g>
  );
}

export default function HawassaBus({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // The bus station in Addis Ababa, very early: they climb onto the big yellow bus.
    case 0:
      return (
        <Road id={id} time="dawn">
          <Bus x={200} y={250} s={0.92} n={8} />
          <Place x={270} y={294} s={0.3} from={[420, 294]} dur={2} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
          <Place x={330} y={294} s={0.3} from={[460, 294]} dur={2.2} tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <Place x={380} y={296} s={0.34} flip from={[500, 296]} dur={2.4} tap={TAP.grandma}>
            <Grandma />
          </Place>
        </Road>
      );
    // Kebede sells tickets, bundled in tens with red rubber bands.
    case 1:
      return (
        <Road id={id}>
          <Bus x={150} y={252} s={0.7} n={16} />
          <g transform="translate(300 120)">
            {[0, 1, 2].map((i) => (
              <g key={i} className="lali-pop-in" style={d(0.8 + i * 0.4)}>
                <TicketBundle x={-30 + i * 30} y={0} s={1.6} />
              </g>
            ))}
            <g className="lali-pop-in" style={d(2.2)}>
              <Ticket x={0} y={44} s={1.4} a={-8} />
            </g>
          </g>
          <Place x={318} y={296} s={0.36} flip tap={TAP.gugu}>
            <Conductor mood="happy" pose="wave" />
          </Place>
          <Sign x={84} y={150} kind="?" delay={2.8} />
        </Road>
      );
    // Two bundles and four loose: twenty-four.
    case 2:
      return (
        <Road id={id}>
          <Board x={200} y={110} tens={add(2, 0.8, 0.5)} ones={add(4, 2, 0.4)} digits={[2, 4, 3.8]} />
          <NumBubble x={200} y={200} n={24} delay={4.4} />
          <Place x={70} y={292} s={0.34} tap={TAP.tsehay}>
            <Tsehay mood="happy" pose="point" />
          </Place>
          <Place x={330} y={296} s={0.34} flip tap={TAP.gugu}>
            <Conductor mood="happy" />
          </Place>
        </Road>
      );
    // Bishoftu: thirteen more get on. Kebede scratches his head. Tens with tens, ones with ones!
    case 3:
      return (
        <Road id={id}>
          <Board x={200} y={110} tens={[...keep(2), ["in", 1.4]]} ones={[...keep(4), ...add(3, 2.2, 0.4)]} />
          <Place x={330} y={296} s={0.34} flip className="hb-scratch" tap={TAP.gugu}>
            <Conductor mood="worried" />
          </Place>
          <Sign x={306} y={186} kind="?" delay={1} />
          <Place x={70} y={292} s={0.34} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="point" />
          </Place>
        </Road>
      );
    // Three bundles and seven loose: 24 + 13 = 37.
    case 4:
      return (
        <Road id={id}>
          <Board x={200} y={100} tens={keep(3)} ones={keep(7)} digits={[3, 7, 0.8]} />
          <SumCard x={200} y={200} tokens={["24", "+", "13", "=", "37"]} start={1.6} hl={{ 4: "#E8513B" }} geezOf={37} size={26} />
          <Place x={60} y={296} s={0.36} tap={TAP.grandma}>
            <Grandma arm="raise" mood="joy" />
          </Place>
        </Road>
      );
    // Mojo: five more; twelve loose tickets; ten of them become a new bundle: 42.
    case 5:
      return (
        <Road id={id}>
          <Board x={200} y={100} tens={[...keep(3), ["in", 3.4]]} ones={[...keep(7).map(() => ["out", 2.8] as Item), ...[0.8, 1.1, 1.4].map((t) => ["inout", t, 2.8] as Item), ...[1.7, 2].map((t) => ["inout", t, 2.8] as Item)]} after={[2, 3.2]} digits={[4, 2, 4]} />
          <g className="hb-tie" style={d(2.8)}>
            <TicketBundle x={238} y={90} s={1.2} />
          </g>
          <SumCard x={200} y={204} tokens={["37", "+", "5", "=", "42"]} start={4.4} hl={{ 4: "#E8513B" }} size={26} />
          <Place x={60} y={292} s={0.32} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
        </Road>
      );
    // Batu, by Lake Ziway and its pelicans: twenty get off. 42 − 20 = 22.
    case 6:
      return (
        <Road id={id} lake>
          <Pelican x={60} y={214} s={0.9} />
          <Pelican x={110} y={210} s={0.7} />
          <Pelican x={350} y={212} s={0.8} />
          <Board x={200} y={92} s={0.9} tens={[...out(2, 1.2, 0.4), ...keep(2)]} ones={keep(2)} digits={[2, 2, 2.6]} />
          <SumCard x={200} y={186} tokens={["42", "−", "20", "=", "22"]} start={3} hl={{ 4: "#E8513B" }} size={24} />
          <Bus x={230} y={262} s={0.5} n={10} />
        </Road>
      );
    // Thirty get on with fish and onions: three new bundles. 22 + 30 = 52.
    case 7:
      return (
        <Road id={id} lake>
          <Board x={200} y={92} s={0.9} tens={[...keep(2), ...add(3, 1, 0.5)]} ones={keep(2)} digits={[5, 2, 2.8]} />
          <SumCard x={200} y={186} tokens={["22", "+", "30", "=", "52"]} start={3.2} hl={{ 4: "#E8513B" }} size={24} />
          <Bus x={150} y={262} s={0.5} n={16} />
          <g transform="translate(300 262)">
            <g className="lali-pop-in" style={d(0.6)}>
              <path d="M-16 0 L16 0 L12 -18 L-12 -18Z" fill="#C98A3A" />
              <path d="M-10 -18 q4 -6 8 0 q4 -6 8 0" fill="#7FB8E0" />
            </g>
            <g className="lali-pop-in" style={d(0.9)}>
              <path d="M24 0 Q20 -24 34 -26 Q48 -24 44 0Z" fill="#E8DCC8" />
              <circle cx={34} cy={-28} r={4} fill="#B5643A" />
            </g>
          </g>
        </Road>
      );
    // Shashemene: fourteen get off, but only two loose. Open a bundle: four bundles and twelve loose.
    case 8:
      return (
        <Road id={id}>
          <Board x={200} y={100} tens={[...keep(4), ["out", 1.6]]} ones={[...keep(2), ...add(10, 2.2, 0.12)]} digits={[4, 12, 3.8]} />
          <g className="lali-pop-in" style={d(1.6)}>
            <path d="M-30 0 q10 -14 20 0 q10 14 20 0" transform="translate(140 40)" stroke="#E2463F" strokeWidth={3} fill="none" />
          </g>
          <Place x={60} y={296} s={0.36} tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
          <Place x={340} y={296} s={0.34} flip tap={TAP.gugu}>
            <Conductor mood="wow" />
          </Place>
        </Road>
      );
    // One bundle and four loose leave: thirty-eight. 52 − 14 = 38.
    case 9:
      return (
        <Road id={id}>
          <Board x={200} y={100} tens={[...keep(3), ["out", 1]]} ones={[...keep(8), ...out(4, 1.6)]} digits={[3, 8, 2.8]} />
          <SumCard x={200} y={204} tokens={["52", "−", "14", "=", "38"]} start={3.2} hl={{ 4: "#E8513B" }} size={26} geezOf={38} />
          <Place x={340} y={296} s={0.34} flip className="hb-laugh" tap={TAP.gugu}>
            <Conductor mood="joy" pose="wave" />
          </Place>
          <Place x={60} y={294} s={0.32} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
        </Road>
      );
    // {name}: two more get on; eight and two loose make ten: a new bundle. Forty.
    case 10:
      return (
        <Road id={id}>
          <Board x={200} y={100} tens={[...keep(3), ["in", 3]]} ones={[...keep(8).map(() => ["out", 2.4] as Item), ["inout", 0.8, 2.4], ["inout", 1.2, 2.4]]} digits={[4, 0, 3.6]} />
          <SumCard x={200} y={204} tokens={["38", "+", "2", "=", "40"]} start={4} hl={{ 4: "#E8513B" }} size={26} geezOf={40} />
          <BeeHover x={60} y={200} s={1.2} />
        </Road>
      );
    // Hawassa: the lake sparkles, Auntie waves, forty people climb down. Ticket number 40.
    case 11:
      return (
        <Road id={id} lake>
          <g className="mq-drive" style={vars({ "--fx": "-260px", "--dur": "2.4s" })}>
            <Bus x={150} y={262} s={0.62} n={16} />
          </g>
          <Place x={340} y={296} s={0.36} flip tap={TAP.mama}>
            <Mama mood="joy" />
          </Place>
          <Place x={280} y={294} s={0.3} from={[200, 294]} delay={2.4} dur={1.4} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
          <g transform="translate(300 110)">
            <g className="lali-pop-in" style={d(3.4)}>
              <Ticket x={0} y={0} s={3} a={-6} />
              <text x={-2} y={36} fontSize={18} fontFamily={LATIN} fontWeight={900} fill="#C97A2A" textAnchor="middle">
                40
              </text>
            </g>
          </g>
          <NumBubble x={80} y={90} n={40} delay={3.8} />
        </Road>
      );
    default:
      return null;
  }
}
