"use client";

import "./one-left-over.css";

import { useId, type ReactNode } from "react";

import { Air, BeeFlight, BeeHover, Place, vars } from "../../scenery";
import { Camel, Ibex, TAP, Teacher, Wolf } from "./kit-cast";
import { d, r1 } from "./kit";
import { Grid, Label, Mandarin, Mark, NumBubble, Roll, SharePlate, SumCard } from "./kit-maths";
import { Yard } from "./kit-places";
import { Hearts } from "./kit-props";
import { Bench } from "./kit-things";

/*
  "One Left Over": one living picture per page (12 pages) in the school yard and on the walk
  home. Sharing is shown as dealing: every mandarin (roll, piece of sugar cane) starts in the
  heap on the bench and slides, one at a time and round and round, to the three friends'
  plates, so each plate fills in rows of one per round; whatever cannot go round stays in
  the heap, glowing. Story keyframes: olo-* in ./one-left-over.css.
*/

const PLATES: [number, number][] = [
  [90, 196],
  [200, 196],
  [310, 196],
];
const HEAP: [number, number] = [200, 116];

function School({ id, time = "day", children }: { id: string; time?: "day" | "evening"; children: ReactNode }) {
  return (
    <g>
      <Yard id={id} time={time} house={false} tree fig={340}>
        <Bench x={200} y={142} w={180} />
        {children}
      </Yard>
      <Air kind={time === "evening" ? "dusk" : "day"} seed={63} grass={false} />
    </g>
  );
}

/** A piece of sugar cane (green-yellow with joints), centred, lying flat. */
function Cane({ x = 0, y = 0, s = 1 }: { x?: number; y?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-14} y={-4} width={28} height={8} rx={3} fill="#B8C84A" />
      <path d="M-5 -4 V4 M5 -4 V4" stroke="#7A8A2A" strokeWidth={1.6} />
      <rect x={-14} y={-4} width={28} height={2.4} rx={1.2} fill="#fff" opacity={0.3} />
    </g>
  );
}

/** Where the k-th thing of the heap sits, and where it lands on a plate when dealt. */
function heapSpot(k: number, n: number): [number, number] {
  const perRow = 5;
  const row = Math.floor(k / perRow);
  const inRow = Math.min(perRow, n - row * perRow);
  return [r1(HEAP[0] + ((k % perRow) - (inRow - 1) / 2) * 16), r1(HEAP[1] - row * 12)];
}
function plateSpot(k: number, ways: number): [number, number] {
  const [px, py] = PLATES[k % ways];
  const round = Math.floor(k / ways);
  return [r1(px + ((round % 2) * 2 - 1) * 9), r1(py - 6 - Math.floor(round / 2) * 12)];
}

/**
 * Deal `n` things to `ways` plates, one at a time and round and round, starting at `start`.
 * `dealt` of them are dealt (the rest stay in the heap); `done` shows them already dealt.
 */
function Deal({ n, dealt, ways = 3, start = 1, step = 0.4, done = false, item }: { n: number; dealt: number; ways?: number; start?: number; step?: number; done?: boolean; item: (x: number, y: number) => ReactNode }) {
  return (
    <g>
      {Array.from({ length: n }, (_, k) => {
        const [hx, hy] = heapSpot(k, n);
        if (k >= dealt) {
          return (
            <g key={k}>
              <circle cx={hx} cy={hy} r={14} fill="#FFE27A" opacity={0.5} className="lali-pulse" />
              {item(hx, hy)}
            </g>
          );
        }
        const [px, py] = plateSpot(k, ways);
        if (done) return <g key={k}>{item(px, py)}</g>;
        return (
          <g key={k} className="me-slide" style={vars({ "--fx": `${r1(hx - px)}px`, "--fy": `${r1(hy - py)}px`, "--delay": `${r1(start + k * step)}s`, "--dur": "0.5s" })}>
            {item(px, py)}
          </g>
        );
      })}
    </g>
  );
}

function Plates({ labels, t = 0 }: { labels?: number[]; t?: number }) {
  return (
    <g>
      {PLATES.map(([x, y], i) => (
        <g key={i}>
          <SharePlate x={x} y={y + 4} w={78} />
          {labels && <NumBubble x={x} y={y + 30} n={labels[i]} delay={t + i * 0.2} s={0.75} color="#2F5BD3" />}
        </g>
      ))}
    </g>
  );
}

/** The three friends behind their plates. */
function Friends({ mood = "happy" }: { mood?: "happy" | "joy" | "wow" }) {
  return (
    <g>
      <Place x={90} y={302} s={0.28} tap={TAP.hawi}>
        <Wolf mood={mood} />
      </Place>
      <Place x={196} y={302} s={0.3} tap={TAP.ayan}>
        <Camel who="ayan" mood={mood} kneel />
      </Place>
      <Place x={310} y={302} s={0.28} tap={TAP.haben}>
        <Ibex mood={mood} />
      </Place>
    </g>
  );
}

const mand = (x: number, y: number) => <Mandarin x={x} y={y} s={0.85} />;

export default function OneLeftOver({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Break time: Hawi tips Grandpa Tolosa's mandarins onto the bench.
    case 0:
      return (
        <School id={id}>
          {Array.from({ length: 13 }, (_, k) => {
            const [x, y] = heapSpot(k, 13);
            return (
              <g key={k} className="me-slide" style={vars({ "--fx": "-110px", "--fy": "-40px", "--delay": `${r1(0.8 + k * 0.1)}s`, "--dur": "0.6s" })}>
                {mand(x, y)}
              </g>
            );
          })}
          <Place x={80} y={298} s={0.36} tap={TAP.hawi}>
            <Wolf mood="joy" arm="give" />
          </Place>
          <Place x={320} y={298} s={0.32} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="wow" />
          </Place>
        </School>
      );
    // "How many each?" Share them one at a time, round and round: the first round.
    case 1:
      return (
        <School id={id}>
          <Plates />
          <Deal n={13} dealt={3} start={1.4} step={0.6} item={mand} />
          <Friends mood="happy" />
        </School>
      );
    // Round and round: one each, two each, three each, four each.
    case 2:
      return (
        <School id={id}>
          <Plates labels={[4, 4, 4]} t={6.2} />
          <Deal n={13} dealt={12} start={0.8} step={0.42} item={mand} />
          <Friends mood="joy" />
        </School>
      );
    // One mandarin left: not enough to go round. Four each and one left over.
    case 3:
      return (
        <School id={id}>
          <Plates labels={[4, 4, 4]} t={0.4} />
          <Deal n={13} dealt={12} done item={mand} />
          <NumBubble x={236} y={96} n={1} delay={1.2} s={0.8} />
          <Friends mood="wow" />
        </School>
      );
    // Teacher Meron: thirteen shared between three is four each, one left over. 13 ÷ 3 = 4.
    case 4:
      return (
        <School id={id}>
          <Plates labels={[4, 4, 4]} t={0} />
          <Deal n={13} dealt={12} done item={mand} />
          <SumCard x={190} y={70} tokens={["13", "÷", "3", "=", "4"]} start={1} hl={{ 1: "#E8513B", 4: "#2F5BD3" }} size={26} />
          <g transform="translate(320 70)">
            <g className="lali-pop-in" style={d(3.2)}>
              <rect x={-24} y={-22} width={48} height={40} rx={12} fill="#FFF6E2" stroke="#E8513B" strokeWidth={2} />
              <text x={-6} y={6} fontSize={20} fontFamily="var(--font-grandstander), sans-serif" fontWeight={900} fill="#E8513B" textAnchor="middle">
                +1
              </text>
              <Mandarin x={13} y={0} s={0.6} />
            </g>
          </g>
          <Place x={370} y={298} s={0.32} flip tap={TAP.mama}>
            <Teacher mood="happy" pose="point" />
          </Place>
        </School>
      );
    // What to do with the one left over? Here comes Abdi.
    case 5:
      return (
        <School id={id}>
          <Plates />
          <Deal n={13} dealt={12} done item={mand} />
          <Place x={340} y={296} s={0.26} flip from={[460, 296]} dur={1.6} delay={1.4} tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" walk />
          </Place>
          <Place x={90} y={300} s={0.26} tap={TAP.hawi}>
            <Wolf mood="worried" />
          </Place>
          <Place x={200} y={300} s={0.24} tap={TAP.ayan}>
            <Camel who="ayan" mood="worried" kneel />
          </Place>
        </School>
      );
    // "For you, Abdi!" Sometimes the one left over makes somebody else happy.
    case 6:
      return (
        <School id={id}>
          <Plates />
          <Deal n={12} dealt={12} done item={mand} />
          <g className="olo-give">{mand(200, 116)}</g>
          <Place x={330} y={240} s={0.28} flip tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <Hearts spots={[[330, 110, 1.6], [300, 90, 2], [360, 96, 2.4]]} />
          <Friends mood="joy" />
        </School>
      );
    // Twelve rolls on the walk home: four each, nothing left over. 12 ÷ 3 = 4.
    case 7:
      return (
        <School id={id}>
          <Plates labels={[4, 4, 4]} t={6} />
          <Deal n={12} dealt={12} start={0.8} step={0.4} item={(x, y) => <Roll x={x} y={y} s={0.9} />} />
          <SumCard x={200} y={64} tokens={["12", "÷", "3", "=", "4"]} start={6.4} hl={{ 1: "#E8513B", 4: "#2F5BD3" }} size={24} />
          <Mark x={330} y={64} ok delay={7.4} />
          <Friends mood="happy" />
        </School>
      );
    // Twelve is three fours; thirteen is three fours and one more.
    case 8:
      return (
        <School id={id}>
          <rect x={30} y={40} width={340} height={130} rx={16} fill="#FFFDF4" opacity={0.92} />
          <Grid x={110} y={100} rows={3} cols={4} gx={22} gy={24} pop={0.8} step={0.5} item={() => <Mandarin s={0.85} />} />
          <Label x={110} y={160} text="12" size={20} color="#2F5BD3" delay={2.2} />
          <Grid x={270} y={100} rows={3} cols={4} gx={22} gy={24} pop={2.6} step={0.3} item={() => <Mandarin s={0.85} />} />
          <g className="lali-pop-in" style={d(3.8)}>
            <circle cx={336} cy={100} r={13} fill="#FFE27A" opacity={0.6} />
            <Mandarin x={336} y={100} s={0.85} />
          </g>
          <Label x={280} y={160} text="13" size={20} color="#E8513B" delay={4} />
          <Friends mood="happy" />
        </School>
      );
    // {name}: ten pieces of sugar cane. Three each and one left over. 10 ÷ 3 = 3.
    case 9:
      return (
        <School id={id}>
          <Plates labels={[3, 3, 3]} t={5} />
          <Deal n={10} dealt={9} start={0.8} step={0.42} item={(x, y) => <Cane x={x} y={y} />} />
          <SumCard x={190} y={64} tokens={["10", "÷", "3", "=", "3"]} start={5.4} hl={{ 1: "#E8513B", 4: "#2F5BD3" }} size={24} />
          <Label x={300} y={108} text="+1" size={22} color="#E8513B" delay={6.4} />
          <Friends mood="joy" />
        </School>
      );
    // The last piece of sugar cane goes to Lali, who buzzes round it all the way home.
    case 10:
      return (
        <School id={id}>
          <Cane x={200} y={116} s={1.6} />
          <BeeFlight path="M200 116 m-50 0 a50 30 0 1 0 100 0 a50 30 0 1 0 -100 0" dur={3} s={1} rest={[250, 116]} trailColor="#FFE27A" happy />
          <Place x={90} y={298} s={0.3} tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Place x={310} y={298} s={0.3} tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
        </School>
      );
    // Evening: Hawi tells Grandpa Tolosa. "My mandarins were shared very well."
    case 11:
      return (
        <g>
          <Yard id={id} time="evening">
            <Place x={140} y={296} s={0.38} tap={TAP.elder}>
              <Wolf elder mood="joy" />
            </Place>
            <Place x={260} y={298} s={0.34} flip tap={TAP.hawi}>
              <Wolf mood="joy" arm="wave" />
            </Place>
            <g transform="translate(200 150)">
              {[0, 1, 2].map((i) => (
                <g key={i} className="lali-pop-in" style={d(1 + i * 0.3)}>
                  <Mandarin x={-30 + i * 30} y={0} s={1.2} />
                </g>
              ))}
            </g>
          </Yard>
          <BeeHover x={340} y={90} s={0.9} flip />
          <Air kind="dusk" seed={64} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
