"use client";

import "./plus-party.css";

import { useId, type ReactNode } from "react";

import { CubShape, GuguShape } from "../../../characters";
import { Air, BeeHover, Heart, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Bloom, Cheer, Cup, d, GoatShape, GrannyShape, HareShape, InjeraRoll, NumberCard, NumTag, Plate, r1, Room, spots, Tally, TAP_CUB, TAP_GUGU, TAP_TSEHAY, TsehayShape } from "./kit";
import { Slate } from "./kit-more";

/*
  "Anbessa's Plus Party": one living picture per page (12 pages), in Grandma's house hung with
  coloured bunting. Every sum in the story is shown three ways: the things themselves (friends,
  injera rolls, flowers, candles), number signs counting them (counting on from the bigger
  group), and Grandma's slate with the written sum. Story keyframes are plus-party-* in
  ./plus-party.css; the kit's are nc-* in ./kit.css.
*/

const FLAGS = ["#E8513B", "#F5B21E", "#2E9A5A", "#2F5BD3", "#D63B72"];

function Party({ id, night = false, children }: { id: string; night?: boolean; children: ReactNode }) {
  return (
    <g>
      <Room id={id} night={night} />
      <path d="M0 26 Q100 50 200 26 T400 26" stroke="#8A5A36" strokeWidth={1.4} fill="none" />
      {Array.from({ length: 14 }, (_, i) => {
        const x = 14 + i * 28;
        const y = 30 + Math.sin((x / 400) * Math.PI * 2) * -10 + 8;
        return (
          <g key={i} className="plus-party-flag" style={vars({ "--delay": `${r1(-i * 0.3)}s` })}>
            <path d={`M${x - 8} ${r1(y - 6)} L${x + 8} ${r1(y - 6)} L${x} ${r1(y + 10)}Z`} fill={FLAGS[i % 5]} />
          </g>
        );
      })}
      {children}
      <Air kind={night ? "night" : "day"} seed={3} grass={false} />
    </g>
  );
}

type Who = "gugu" | "tsehay" | "hare" | "goat" | "cub" | "granny";

/** A small party guest standing at (x, y). */
function Guest({ who, x, y, s = 0.26, flip = false, from, delay = 0.6 }: { who: Who; x: number; y: number; s?: number; flip?: boolean; from?: [number, number]; delay?: number }) {
  if (who === "hare" || who === "goat") {
    const body = (
      <Tappable reaction="bounce" sound={who === "goat" ? "baa" : "boing"}>
        <g transform={`scale(${(flip ? -1 : 1) * s * 3.4} ${s * 3.4})`}>{who === "hare" ? <HareShape /> : <GoatShape kid />}</g>
      </Tappable>
    );
    return (
      <g transform={`translate(${x} ${y})`}>
        {from ? (
          <g className="lali-move-in" style={vars({ "--fx": `${from[0] - x}px`, "--fy": `${from[1] - y}px`, "--delay": `${delay}s`, "--dur": "1.4s" })}>
            {body}
          </g>
        ) : (
          body
        )}
      </g>
    );
  }
  const shape = who === "gugu" ? <GuguShape pose="wave" mood="joy" /> : who === "tsehay" ? <TsehayShape mood="joy" /> : who === "granny" ? <GrannyShape mood="joy" /> : <CubShape pose="sit" mood="joy" />;
  const tap = who === "gugu" ? TAP_GUGU : who === "tsehay" ? TAP_TSEHAY : who === "cub" ? TAP_CUB : undefined;
  return (
    <Place x={x} y={y} s={s} flip={flip} from={from} delay={delay} dur={1.4} tap={tap}>
      {shape}
    </Place>
  );
}

export default function PlusParty({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Anbessa's birthday party. "Who is coming?" "Let's count them as they come."
    case 0:
      return (
        <Party id={id}>
          <Place x={130} y={292} s={0.46}>
            <GrannyShape mood="joy" />
          </Place>
          <Place x={270} y={294} s={0.44} className="plus-party-bounce" tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={-2} />
          </Place>
          <BeeHover x={200} y={120} s={1.1} />
          <Cheer pts={[[80, 100, 1], [330, 110, 1.2], [200, 70, 1.4]]} />
        </Party>
      );
    // Three friends, then two little goats. Put them together, and count them all: five.
    case 1: {
      const g: [Who, number][] = [["gugu", 70], ["tsehay", 130], ["hare", 190], ["goat", 270], ["goat", 330]];
      return (
        <Party id={id}>
          {g.map(([who, x], i) => (
            <g key={i}>
              <Guest who={who} x={x} y={i < 3 ? 280 : 286} from={[x + 300, 280]} delay={i < 3 ? 0.4 + i * 0.3 : 2 + (i - 3) * 0.4} flip />
              <NumTag x={x} y={150} n={i + 1} delay={4 + i * 0.4} s={0.7} />
            </g>
          ))}
          <g className="lali-fade-in" style={d(3.4)}>
            <path d="M40 300 V190 H220 V300" stroke="#2F5BD3" strokeWidth={3} fill="none" strokeDasharray="6 5" />
            <path d="M240 300 V200 H360 V300" stroke="#E8513B" strokeWidth={3} fill="none" strokeDasharray="6 5" />
          </g>
          <Tally total={5} count={5} at={[4.1, 4.5, 4.9, 5.3, 5.7]} y={50} />
        </Party>
      );
    }
    // Grandma wrote it on the slate: 3 + 2 = 5. Plus means put together; equals means makes the same as.
    case 2:
      return (
        <Party id={id}>
          <Slate x={200} y={110} text="3 + 2 = 5" delay={0.8} w={200} size={34} />
          <g className="plus-party-glow" style={d(2)}>
            <circle cx={170} cy={110} r={18} fill="#FFE27A" opacity={0.4} />
          </g>
          <g className="plus-party-glow" style={d(3)}>
            <circle cx={233} cy={110} r={18} fill="#FFE27A" opacity={0.4} />
          </g>
          {[0, 1, 2].map((i) => (
            <Bloom key={i} x={110 + i * 26} y={236} s={1.6} color="#2F5BD3" />
          ))}
          {[0, 1].map((i) => (
            <Bloom key={i} x={250 + i * 26} y={236} s={1.6} color="#E8513B" />
          ))}
          <Place x={50} y={294} s={0.4}>
            <GrannyShape />
          </Place>
          <Place x={350} y={294} s={0.36} flip tap={TAP_CUB}>
            <CubShape pose="sit" mood="wow" />
          </Place>
        </Party>
      );
    // Four rolls and three rolls. Tsehay counted on: "Four… five, six, seven!" 4 + 3 = 7.
    case 3:
      return (
        <Party id={id}>
          <Plate x={130} y={240} w={110} />
          <Plate x={270} y={240} w={100} />
          {spots(4, "row", 22).map(([dx], i) => (
            <InjeraRoll key={i} x={130 + dx} y={234} s={0.6} />
          ))}
          <NumTag x={130} y={196} n={4} delay={0.8} />
          {spots(3, "row", 24).map(([dx], i) => (
            <g key={i}>
              <g transform={`translate(${270 + dx} 234)`}>
                <g className="nc-tap" style={d(1.8 + i * 0.7)}>
                  <InjeraRoll x={0} y={0} s={0.6} />
                </g>
              </g>
              <NumTag x={270 + dx} y={204} n={5 + i} delay={1.8 + i * 0.7} s={0.55} />
            </g>
          ))}
          <Slate x={200} y={110} text="4 + 3 = 7" delay={4} w={180} />
          <Place x={350} y={300} s={0.28} flip tap={TAP_TSEHAY}>
            <TsehayShape pose="point" mood="joy" />
          </Place>
        </Party>
      );
    // Five pieces of dabo, and one more: the next number, six.
    case 4:
      return (
        <Party id={id}>
          <Plate x={200} y={244} w={150} />
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const x = 140 + i * 24;
            const piece = (
              <g>
                <path d={`M${x - 10} 240 L${x + 10} 240 L${x + 8} 226 Q${x} 220 ${x - 8} 226Z`} fill="#E0A85A" stroke="#B87A2A" strokeWidth={1.4} />
              </g>
            );
            return i < 5 ? (
              <g key={i}>{piece}</g>
            ) : (
              <g key={i} className="nc-slide" style={vars({ "--fx": "80px", "--fy": "-60px", "--delay": "1.4s" })}>
                {piece}
              </g>
            );
          })}
          <NumberCard x={200} y={110} steps={[[5, 0.4], [6, 2.2]]} />
          <Place x={70} y={296} s={0.36} tap={TAP_GUGU}>
            <GuguShape mood="joy" />
          </Place>
          <Place x={340} y={294} s={0.4} flip>
            <GrannyShape mood="joy" />
          </Place>
        </Party>
      );
    // Lali's flowers: two, then four more. Start with the bigger: four… five, six. And 4 + 2 too.
    case 5:
      return (
        <Party id={id}>
          {[0, 1, 2, 3].map((i) => (
            <Bloom key={i} x={100 + i * 26} y={226} s={1.6} color="#D63B72" />
          ))}
          {[0, 1].map((i) => (
            <g key={i}>
              <g className="nc-slide" style={vars({ "--fx": "40px", "--fy": "-80px", "--delay": `${1 + i * 0.6}s` })}>
                <Bloom x={230 + i * 26} y={226} s={1.6} color="#F5B21E" />
              </g>
              <NumTag x={230 + i * 26} y={194} n={5 + i} delay={1.4 + i * 0.6} s={0.55} />
            </g>
          ))}
          <NumTag x={140} y={190} n={4} delay={0.6} />
          <Slate x={110} y={96} text="2 + 4 = 6" delay={3} w={140} size={24} />
          <Slate x={290} y={96} text="4 + 2 = 6" delay={3.6} w={140} size={24} />
          <BeeHover x={330} y={200} s={1.1} flip />
        </Party>
      );
    // The hare forgot her present: "Zero presents." Six plus zero is still six.
    case 6:
      return (
        <Party id={id}>
          <g transform="translate(110 260)">
            <path d="M-20 0 L20 0 L16 -40 L-16 -40Z" fill="#2E9A8A" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <Bloom key={i} x={-15 + (i % 3) * 15} y={-56 - Math.floor(i / 3) * 14} s={1.2} color={["#D63B72", "#F5B21E"][i % 2]} />
            ))}
          </g>
          <g transform="translate(280 296)">
            <g transform="scale(1.4)">
              <HareShape />
            </g>
          </g>
          <g className="lali-pop-in" style={d(1)}>
            <rect x={300} y={188} width={36} height={30} rx={6} fill="none" stroke="#B9A88A" strokeWidth={2.4} strokeDasharray="5 4" />
            <text x={318} y={210} fontSize={18} fontFamily="var(--font-grandstander)" fontWeight={900} fill="#B9A88A" textAnchor="middle">
              0
            </text>
          </g>
          <Slate x={200} y={96} text="6 + 0 = 6" delay={1.8} w={180} />
          <Place x={360} y={294} s={0.36} flip>
            <GrannyShape mood="joy" />
          </Place>
        </Party>
      );
    // Dancing: five in one line, five in the other. "A double! Five and five make ten!"
    case 7: {
      const row: Who[] = ["gugu", "tsehay", "cub", "goat", "hare"];
      return (
        <Party id={id}>
          {row.map((who, i) => (
            <g key={i} className="plus-party-dance" style={vars({ "--delay": `${r1(-i * 0.25)}s` })}>
              <Guest who={who} x={60 + i * 34} y={250} s={0.18} />
            </g>
          ))}
          {row.map((who, i) => (
            <g key={i} className="plus-party-dance" style={vars({ "--delay": `${r1(-i * 0.25 - 0.4)}s` })}>
              <Guest who={who} x={220 + i * 34} y={250} s={0.18} flip />
            </g>
          ))}
          <NumTag x={128} y={186} n={5} delay={0.8} />
          <NumTag x={288} y={186} n={5} delay={1.2} />
          <Slate x={200} y={100} text="5 + 5 = 10" delay={2} w={190} />
        </Party>
      );
    }
    // The cake had four candles lit. "Six!" Grandma lit two more. 4 + 2 = 6. Whoosh!
    case 8:
      return (
        <Party id={id}>
          <g transform="translate(200 250)">
            <rect x={-70} y={-40} width={140} height={44} rx={8} fill="#F4D3E0" stroke="#D63B72" strokeWidth={2} />
            <path d="M-70 -30 q10 10 20 0 q10 10 20 0 q10 10 20 0 q10 10 20 0 q10 10 20 0 q10 10 20 0 q10 10 20 0" fill="#FFF6FA" />
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const x = -50 + i * 20;
              return (
                <g key={i}>
                  <rect x={x - 3} y={-62} width={6} height={22} rx={2} fill={["#2F5BD3", "#F5B21E", "#2E9A5A"][i % 3]} />
                  <g className={i < 4 ? "plus-party-flame" : "plus-party-flame-late"} style={d(i < 4 ? 0 : 1.6 + (i - 4) * 0.6)}>
                    <path d={`M${x} -64 q-5 -6 0 -14 q5 8 0 14Z`} fill="#FF7A2A" stroke="#FFE27A" strokeWidth={1.5} />
                  </g>
                </g>
              );
            })}
          </g>
          <Slate x={200} y={96} text="4 + 2 = 6" delay={3} w={170} />
          <Place x={56} y={296} s={0.38} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" look={3} />
          </Place>
          <Place x={350} y={294} s={0.4} flip>
            <GrannyShape mood="joy" />
          </Place>
        </Party>
      );
    // Grandma's riddle: seven cups; how many more make ten? Seven… eight, nine, ten. Three!
    case 9:
      return (
        <Party id={id}>
          {Array.from({ length: 10 }, (_, i) => {
            const x = 110 + (i % 5) * 45;
            const y = 210 + Math.floor(i / 5) * 46;
            return i < 7 ? (
              <Cup key={i} x={x} y={y} s={1.5} />
            ) : (
              <g key={i}>
                <ellipse cx={x} cy={y - 8} rx={14} ry={12} fill="none" stroke="#E8513B" strokeWidth={2} strokeDasharray="4 3" />
                <g className="lali-pop-in" style={d(1.6 + (i - 7) * 0.7)}>
                  <Cup x={x} y={y} s={1.5} color="#E8513B" />
                </g>
                <NumTag x={x} y={y - 34} n={i + 1} delay={1.6 + (i - 7) * 0.7} s={0.5} />
              </g>
            );
          })}
          <Slate x={200} y={96} text="7 + 3 = 10" delay={4} w={180} />
          <Place x={50} y={296} s={0.36}>
            <GrannyShape />
          </Place>
        </Party>
      );
    // Photo time: five by the door and five by the table. Ten happy friends. Click!
    case 10: {
      const row: Who[] = ["granny", "cub", "gugu", "tsehay", "hare"];
      return (
        <Party id={id}>
          {row.map((who, i) => (
            <Guest key={i} who={who} x={50 + i * 34} y={290} s={0.2} />
          ))}
          {(["goat", "goat", "gugu", "tsehay", "cub"] as Who[]).map((who, i) => (
            <Guest key={i} who={who} x={214 + i * 36} y={290} s={0.2} flip />
          ))}
          <g className="plus-party-flash">
            <rect width={400} height={300} fill="#fff" />
          </g>
          <BeeHover x={200} y={150} s={1} />
          <Tally total={10} count={10} sing y={60} />
        </Party>
      );
    }
    // That night: "Friends plus friends plus cake!" "And plus one big hug."
    case 11:
      return (
        <Party id={id} night>
          <rect x={150} y={230} width={200} height={40} rx={10} fill="#5A3E2A" />
          <rect x={160} y={220} width={180} height={24} rx={10} fill="#E8D8C0" />
          <Place x={250} y={262} s={0.36} tap={TAP_CUB}>
            <CubShape pose="sit" mood="happy" />
          </Place>
          <Place x={100} y={292} s={0.42}>
            <GrannyShape mood="joy" />
          </Place>
          <Heart x={180} y={190} s={1.3} delay={0.8} />
          <Heart x={200} y={180} s={1} delay={2} />
          <g className="lali-pop-in" style={d(1.6)}>
            <text x={320} y={140} fontSize={30} fontFamily="var(--font-grandstander)" fontWeight={900} fill="#FFE27A" textAnchor="middle">
              +1
            </text>
          </g>
        </Party>
      );
    default:
      return null;
  }
}
