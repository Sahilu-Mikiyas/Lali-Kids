"use client";

import "./nothing-left.css";

import { useId } from "react";

import { CubShape, GuguShape } from "../../../characters";
import { Air, BeeHover, Place, Rock, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Cheer, d, GoatShape, GrannyShape, Hops, InjeraRoll, Land, LATIN, NumberCard, NumTag, Plate, r1, Room, Tally, TAP_CUB, TAP_GUGU, TAP_TSEHAY, TsehayShape } from "./kit";

/*
  "Nothing Left!": one living picture per page (12 pages). Five rolls of injera on a plate in
  the middle of the room; each page someone eats one (it flies to them), the number card
  counts down and a numeral leaves the bar, until the goat at the window takes the last and
  the card shows 0, with a dash where the Ge'ez numeral would be (Ge'ez has no zero).
  Story keyframes are nothing-left-* in ./nothing-left.css; the kit's are nc-* in ./kit.css.
*/

const ROLLS: [number, number][] = [
  [172, 236],
  [200, 238],
  [228, 236],
  [186, 226],
  [214, 226],
];

/** The plate in the middle, with n rolls. `eat` sends the top rolls away to [x, y] at those times. */
function Rolls({ n, eat = [] }: { n: number; eat?: [number, number, number][] }) {
  return (
    <g>
      <Plate x={200} y={240} w={120} />
      {ROLLS.slice(0, n).map(([x, y], i) => {
        const e = eat[n - 1 - i];
        const roll = <InjeraRoll x={x} y={y} s={0.75} />;
        if (!e) return <g key={i}>{roll}</g>;
        return (
          <g key={i} className="nc-away nc-gone" style={vars({ "--tx": `${r1(e[0] - x)}px`, "--ty": `${r1(e[1] - y)}px`, "--delay": `${e[2]}s`, "--dur": "0.9s" })}>
            {roll}
          </g>
        );
      })}
    </g>
  );
}

/** The friends round the plate (Anbessa, Gugu, Tsehay, Grandma) and Lali above. */
function Friends({ munch }: { munch?: "cub" | "gugu" | "tsehay" | "bee" }) {
  const m = (who: string) => (munch === who ? "nothing-left-munch" : undefined);
  return (
    <>
      <Place x={64} y={294} s={0.4} className={m("cub")} tap={TAP_CUB}>
        <CubShape pose="sit" mood={munch === "cub" ? "joy" : "happy"} look={3} />
      </Place>
      <Place x={128} y={300} s={0.3} className={m("gugu")} tap={TAP_GUGU}>
        <GuguShape mood={munch === "gugu" ? "joy" : "happy"} />
      </Place>
      <Place x={276} y={300} s={0.29} flip className={m("tsehay")} tap={TAP_TSEHAY}>
        <TsehayShape mood={munch === "tsehay" ? "joy" : "happy"} />
      </Place>
      <Place x={340} y={294} s={0.4} flip>
        <GrannyShape />
      </Place>
      <g className={m("bee")}>
        <BeeHover x={252} y={176} s={1} flip />
      </g>
    </>
  );
}

/** The cheeky goat's head poking in through the window (on the right of the room). */
function WindowGoat({ id, leaf = false }: { id: string; leaf?: boolean }) {
  return (
    <g>
      <defs>
        <clipPath id={`${id}-win`}>
          <rect x={286} y={52} width={70} height={60} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-win)`}>
        <g transform="translate(362 150)">
          <g className="nothing-left-peek" style={d(0.6)}>
            <Tappable reaction="wiggle" sound="baa">
              <g transform="scale(-1.5 1.5)">
                <GoatShape />
              </g>
            </Tappable>
          </g>
        </g>
      </g>
      {leaf && (
        <g className="nothing-left-munch">
          <path d="M240 112 q20 -20 40 -4 q-10 20 -40 4Z" fill="#5FB45A" />
          <path d="M244 110 q16 -6 32 -4" stroke="#3E8A3E" strokeWidth={1.6} fill="none" />
        </g>
      )}
    </g>
  );
}

export default function NothingLeft({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Grandma rolled five little rolls of injera. "Five! One for each of us."
    case 0:
      return (
        <g>
          <Room id={id} />
          <Plate x={200} y={240} w={120} />
          {ROLLS.map(([x, y], i) => (
            <g key={i} className="lali-pop-in" style={d(0.6 + i * 0.4)}>
              <InjeraRoll x={x} y={y} s={0.75} />
            </g>
          ))}
          <Friends />
          <NumberCard x={200} y={110} steps={[[5, 2.8]]} />
          <Tally total={5} count={5} at={[0.7, 1.1, 1.5, 1.9, 2.3]} />
          <Air kind="day" seed={2} grass={false} />
        </g>
      );
    // Anbessa took one: four left. Gugu took one: three left.
    case 1:
    case 2: {
      const n = page === 1 ? 5 : 4;
      const to: [number, number] = page === 1 ? [70, 200] : [128, 230];
      return (
        <g>
          <Room id={id} />
          <Rolls n={n} eat={[[to[0], to[1], 1]]} />
          <Friends munch={page === 1 ? "cub" : "gugu"} />
          <NumberCard x={200} y={110} steps={[[n, 0], [n - 1, 2]]} />
          <Tally total={5} count={n} gone={{ [n - 1]: 1.8 }} />
          <Air kind="day" seed={2 + page} grass={false} />
        </g>
      );
    }
    // Tsehay took one: two. Then Lali nibbled one: only one left!
    case 3:
      return (
        <g>
          <Room id={id} />
          <Rolls n={3} eat={[[276, 230, 0.8], [252, 176, 2.8]]} />
          <Friends munch="tsehay" />
          <NumberCard x={200} y={110} steps={[[3, 0], [2, 1.6], [1, 3.6]]} />
          <Tally total={5} count={3} gone={{ 2: 1.4, 1: 3.4 }} />
          <Air kind="day" seed={7} grass={false} />
        </g>
      );
    // "Five, four, three, two, one," counted Anbessa, pointing back.
    case 4:
      return (
        <g>
          <Room id={id} />
          {[5, 4, 3, 2, 1].map((n, i) => (
            <NumTag key={n} x={90 + i * 55} y={150} n={n} delay={0.8 + i * 0.7} s={1.25 - i * 0.1} />
          ))}
          <g className="lali-fade-in" style={d(1)}>
            <path d="M84 186 Q200 206 316 186" stroke="#E8513B" strokeWidth={3} fill="none" strokeDasharray="4 6" strokeLinecap="round" />
            <path d="M316 186 l-12 -6 l2 12Z" fill="#E8513B" />
          </g>
          <Rolls n={1} />
          <Friends />
          <Air kind="day" seed={9} grass={false} />
        </g>
      );
    // A cheeky goat poked its head through the window and… MUNCH, MUNCH!
    case 5:
      return (
        <g>
          <Room id={id} />
          <WindowGoat id={id} />
          <Rolls n={1} eat={[[300, 100, 2]]} />
          <Friends />
          <NumberCard x={150} y={110} steps={[[1, 0], [0, 3]]} />
          <Tally total={5} count={1} gone={{ 0: 2.6 }} />
          <Air kind="day" seed={11} grass={false} />
        </g>
      );
    // "None! Nothing! ZERO! Zero means none at all."
    case 6:
      return (
        <g>
          <Room id={id} />
          <Plate x={200} y={240} w={120} />
          <g className="lali-pop-in" style={d(1)}>
            <ellipse cx={200} cy={238} rx={50} ry={11} fill="none" stroke="#E8513B" strokeWidth={3} strokeDasharray="6 5" className="lali-pulse" />
          </g>
          <Place x={64} y={294} s={0.4} tap={TAP_CUB}>
            <CubShape pose="sit" mood="wow" look={3} />
          </Place>
          <Place x={128} y={300} s={0.3} tap={TAP_GUGU}>
            <GuguShape mood="wow" />
          </Place>
          <Place x={276} y={300} s={0.29} flip tap={TAP_TSEHAY}>
            <TsehayShape mood="wow" />
          </Place>
          <Place x={340} y={294} s={0.4} flip>
            <GrannyShape mood="joy" />
          </Place>
          <NumberCard x={200} y={110} steps={[[0, 1.6]]} s={1.25} />
          <Tally total={5} count={0} />
          <Air kind="day" seed={13} grass={false} />
        </g>
      );
    // Tsehay drew 0 in the flour: like an empty plate. Ge'ez numerals have no zero.
    case 7:
      return (
        <g>
          <Room id={id} />
          <ellipse cx={205} cy={252} rx={100} ry={30} fill="#F6F0E2" />
          <g className="nothing-left-draw" style={d(0.8)}>
            <text x={160} y={274} fontSize={64} fontFamily={LATIN} fontWeight={900} fill="#C9B48A" textAnchor="middle">
              0
            </text>
          </g>
          <g className="lali-pop-in" style={d(1.8)}>
            <text x={212} y={264} fontSize={30} fontFamily={LATIN} fontWeight={900} fill="#2F5BD3" textAnchor="middle">
              =
            </text>
          </g>
          <g className="lali-pop-in" style={d(2.2)}>
            <Plate x={258} y={254} w={64} />
          </g>
          {/* the Ge'ez numeral slot stays empty: a dashed box, and a shake of the head */}
          <g transform="translate(200 110)">
            <g className="lali-pop-in" style={d(3)}>
              <rect x={-30} y={-26} width={60} height={52} rx={12} fill="#FFFDF6" stroke="#B9A88A" strokeWidth={3} strokeDasharray="6 5" />
              <text y={10} fontSize={30} fontFamily={LATIN} fontWeight={900} fill="#B9A88A" textAnchor="middle">
                –
              </text>
            </g>
          </g>
          <Place x={330} y={294} s={0.42} flip>
            <GrannyShape />
          </Place>
          <Place x={48} y={300} s={0.3} tap={TAP_TSEHAY}>
            <TsehayShape pose="point" />
          </Place>
          <Place x={300} y={234} s={0.2} className="nothing-left-no" tap={TAP_GUGU}>
            <GuguShape pose="no" mood="wow" />
          </Place>
          <Air kind="day" seed={15} grass={false} />
        </g>
      );
    // A zero hunt: a nest with zero eggs, a basket with zero oranges, a sky with zero clouds.
    case 8:
      return (
        <g>
          <rect width={400} height={300} fill="#9ED8FF" />
          <path d="M-10 210 Q200 196 410 210 L410 310 L-10 310Z" fill="#7FC88A" />
          {/* a clear sky: zero clouds */}
          <NumTag x={330} y={50} n={0} delay={3.2} s={1} />
          {/* a branch with an empty nest; the chicks fly off */}
          <path d="M-10 120 Q60 110 120 126" stroke="#7A5236" strokeWidth={8} strokeLinecap="round" fill="none" />
          <ellipse cx={86} cy={118} rx={26} ry={10} fill="#8A6A3A" />
          <ellipse cx={86} cy={114} rx={18} ry={5} fill="#5A4022" />
          {[0, 1].map((i) => (
            <g key={i} className="nc-away" style={vars({ "--tx": `${80 + i * 40}px`, "--ty": `${-70 - i * 10}px`, "--delay": `${0.6 + i * 0.4}s`, "--dur": "1.6s" })}>
              <circle cx={80 + i * 12} cy={106} r={6} fill="#FFE27A" />
              <path d={`M${84 + i * 12} 106 l5 1 l-5 2Z`} fill="#F5961E" />
            </g>
          ))}
          <NumTag x={86} y={84} n={0} delay={2} s={0.8} />
          {/* an empty basket */}
          <g transform="translate(210 250)">
            <path d="M-40 -20 L40 -20 L32 14 L-32 14Z" fill="#D9A55A" />
            <path d="M-36 -10 H36 M-34 2 H34" stroke="#B88032" strokeWidth={3} />
            <ellipse cx={0} cy={-20} rx={40} ry={8} fill="#8A5A2A" />
          </g>
          <NumTag x={210} y={196} n={0} delay={2.6} s={0.8} />
          <Place x={330} y={296} s={0.34} flip tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={-2} />
          </Place>
          <BeeHover x={290} y={150} s={1} flip />
          <Air kind="day" seed={17} />
        </g>
      );
    // Gugu on a big rock: "Five, four, three, two, one, ZERO!" He jumped.
    case 9:
      return (
        <g>
          <Land id={id} />
          <Rock x={150} y={262} s={1.6} />
          <Hops path={[[150, 212], [276, 292]]} start={4.6} step={1} h={60}>
            <Place x={0} y={0} s={0.34} tap={TAP_GUGU}>
              <GuguShape pose="hop" mood="joy" />
            </Place>
          </Hops>
          <NumberCard x={200} y={92} steps={[[5, 0.6], [4, 1.4], [3, 2.2], [2, 3], [1, 3.8], [0, 4.6]]} />
          <Place x={60} y={294} s={0.36} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={2} />
          </Place>
          <Place x={350} y={294} s={0.32} flip tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" />
          </Place>
          <Cheer pts={[[260, 230, 5.6], [300, 220, 5.8], [230, 214, 6]]} />
          <Air kind="day" seed={19} />
        </g>
      );
    // They rolled more together. "Zero… one, two, three, four, five, SIX!"
    case 10: {
      const six: [number, number][] = [...ROLLS, [200, 216]];
      return (
        <g>
          <Room id={id} />
          <Plate x={200} y={240} w={130} />
          {six.map(([x, y], i) => (
            <g key={i} className="nc-slide" style={vars({ "--fx": `${i % 2 ? 60 : -60}px`, "--fy": "-40px", "--delay": `${r1(1 + i * 0.6)}s` })}>
              <InjeraRoll x={x} y={y} s={0.75} />
            </g>
          ))}
          <Friends />
          <NumberCard x={200} y={110} steps={[[0, 0], [1, 1.1], [2, 1.7], [3, 2.3], [4, 2.9], [5, 3.5], [6, 4.1]]} />
          <Tally total={6} count={6} at={[1.2, 1.8, 2.4, 3, 3.6, 4.2]} />
          <Air kind="day" seed={21} grass={false} />
        </g>
      );
    }
    // The goat got a big cabbage leaf. Munch, munch! "Zero crumbs!"
    case 11:
      return (
        <g>
          <Room id={id} />
          <WindowGoat id={id} leaf />
          <Plate x={200} y={240} w={120} />
          <NumTag x={200} y={196} n={0} delay={1.6} s={1.1} />
          <Place x={64} y={294} s={0.4} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={3} />
          </Place>
          <Place x={128} y={300} s={0.3} className="lali-hop" tap={TAP_GUGU}>
            <GuguShape mood="joy" pose="wave" />
          </Place>
          <Place x={276} y={300} s={0.29} flip tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" />
          </Place>
          <Place x={340} y={294} s={0.4} flip>
            <GrannyShape mood="joy" />
          </Place>
          <Cheer pts={[[150, 150, 2], [250, 140, 2.2], [200, 120, 2.4]]} />
          <Air kind="day" seed={23} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
