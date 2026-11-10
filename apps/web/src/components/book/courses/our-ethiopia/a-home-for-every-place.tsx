"use client";

import "./a-home-for-every-place.css";

import { useId, type ReactNode } from "react";

import { Acacia, Air, BeeHover, Mountains, Place, Tukul, vars } from "../../scenery";
import { Camel, Gugu, Ibex, TAP, Teacher, Wolf } from "./kit-cast";
import { Aqal, DorzeHouse, Hidmo, MatRoll } from "./kit-culture";
import { Enset } from "./kit-land";
import { Classroom } from "./kit-more";
import { SkyFor } from "./kit-places";
import { Hearts, Sign, Sparkles, WateringCan } from "./kit-props";

/*
  "A Home for Every Place": one living picture per page (12 pages). Four little landscapes on the
  classroom table (a rainy hill, a stony mountain, a bamboo forest, a dry plain) and the homes
  the children build for them: Gugu's tukuls everywhere; Hawi's tukul shedding the "rain"; Haben's
  stone hidmo standing firm in Lali's "wind"; the tall Dorze house, lifted and moved; Ayan's aqal
  packed onto a toy camel; and Gugu putting his tukul where it belongs. Keyframes: kit.css,
  kit-land.css and ./a-home-for-every-place.css.
*/

type Land = "rain" | "stone" | "bamboo" | "plain";

/** One little landscape on the table, about 110 x 60, its middle at (x, y). Homes go in `children` (base at 0, 0). */
function Diorama({ x, y, land, s = 1, children }: { x: number; y: number; land: Land; s?: number; children?: ReactNode }) {
  const ground = { rain: "#6AB052", stone: "#9A9AA6", bamboo: "#4E8A4A", plain: "#E0B878" }[land];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-58 0 L58 0 L52 14 L-52 14Z" fill="#8A6A44" />
      <path d="M-58 0 Q-30 -20 0 -16 Q30 -22 58 0Z" fill={ground} />
      {land === "rain" && (
        <g>
          <ellipse cx={-6} cy={-70} rx={30} ry={11} fill="#8E9CB8" />
          <ellipse cx={14} cy={-74} rx={20} ry={9} fill="#9EACC6" />
          {[-20, -6, 8, 22].map((rx) => (
            <path key={rx} d={`M${rx} -60 l-3 8`} stroke="#5BB8E8" strokeWidth={2} strokeLinecap="round" className="ah-drip" style={vars({ "--delay": `${rx * 0.02}s` })} />
          ))}
        </g>
      )}
      {land === "stone" &&
        [-44, -26, 30, 46].map((rx, i) => <ellipse key={rx} cx={rx} cy={-6 - (i % 2) * 3} rx={7} ry={5} fill="#7A7A86" />)}
      {land === "bamboo" &&
        [-48, -38, 38, 48].map((bx, i) => (
          <g key={bx} className="lali-sway" style={vars({ "--dur": "3.4s", "--delay": `${-i * 0.4}s` })}>
            <path d={`M${bx} -4 V-70`} stroke="#6AA84E" strokeWidth={4} />
            <path d={`M${bx - 2} -30 h4 M${bx - 2} -50 h4`} stroke="#4E8A3A" strokeWidth={2} />
            <path d={`M${bx} -64 l-10 -6 M${bx} -56 l10 -6`} stroke="#6AB052" strokeWidth={3} strokeLinecap="round" />
          </g>
        ))}
      {land === "plain" && <Acacia x={40} y={-4} s={0.3} />}
      <g transform="translate(0 -8)">{children}</g>
    </g>
  );
}

/** The classroom table with its four landscapes. */
function Table({ children }: { children?: ReactNode }) {
  return (
    <g>
      <rect x={10} y={200} width={380} height={14} rx={3} fill="#9A6236" />
      <path d="M30 214 V290 M370 214 V290" stroke="#7A4A26" strokeWidth={8} />
      {children}
    </g>
  );
}

/** Gugu's grass tukul, small, for a landscape; `roofOff` blows its roof away. */
function GrassTukul({ roofOff = false, s = 0.42 }: { roofOff?: boolean; s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <path d="M-36 0 L-36 -34 Q0 -42 36 -34 L36 0Z" fill="#D89B62" />
      <path d="M-11 0 L-11 -22 Q0 -30 11 -22 L11 0Z" fill="#5A3A26" />
      <g className={roofOff ? "ah-blow" : undefined}>
        <path d="M-48 -30 Q-20 -50 0 -82 Q20 -50 48 -30 Q0 -40 -48 -30Z" fill="#D9AE4E" />
        <path d="M-30 -44 L0 -80 M-12 -38 L0 -80 M12 -38 L0 -80 M30 -44 L0 -80" stroke="#B58A30" strokeWidth={2} />
      </g>
    </g>
  );
}

/** A toy camel carrying a packed-up aqal. */
function ToyCamel({ packed = true }: { packed?: boolean }) {
  return (
    <g>
      <path d="M-20 0 V-16 M-10 0 V-16 M10 0 V-16 M20 0 V-16" stroke="#A86E38" strokeWidth={3} />
      <ellipse cx={0} cy={-20} rx={24} ry={9} fill="#C98A4E" />
      <path d="M18 -24 Q26 -36 24 -46 L32 -48 Q32 -34 24 -18Z" fill="#C98A4E" />
      <circle cx={30} cy={-46} r={1.2} fill="#1B1B2A" />
      {packed && (
        <g transform="translate(-2 -34) scale(0.6)">
          <MatRoll x={0} y={0} />
          <path d="M-20 -10 L20 -10 M-14 -14 L16 -14" stroke="#8A5A30" strokeWidth={3} />
        </g>
      )}
    </g>
  );
}

export default function AHomeForEveryPlace({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Four pictures: a rainy green hill, a stony mountain, a bamboo forest, a hot dry plain. "Build a home for each."
    case 0:
      return (
        <g>
          <Classroom id={id}>
            <Table>
              {(["rain", "stone", "bamboo", "plain"] as const).map((l, i) => (
                <g key={l} className="lali-pop-in" style={vars({ "--delay": `${0.4 + i * 0.4}s` })}>
                  <Diorama x={62 + i * 92} y={196} land={l} s={0.72} />
                </g>
              ))}
            </Table>
          </Classroom>
          <Place x={350} y={300} s={0.42} flip tap={TAP.grandma}>
            <Teacher mood="joy" pose="point" />
          </Place>
        </g>
      );
    // Gugu: "Tukuls are the best!" He builds four little tukuls.
    case 1:
      return (
        <g>
          <Classroom id={id}>
            <Table>
              {(["rain", "stone", "bamboo", "plain"] as const).map((l, i) => (
                <Diorama key={l} x={62 + i * 92} y={196} land={l} s={0.72}>
                  <g className="oe-grow-in" style={vars({ "--delay": `${0.6 + i * 0.5}s` })}>
                    <GrassTukul s={0.5} />
                  </g>
                </Diorama>
              ))}
            </Table>
          </Classroom>
          <Place x={200} y={298} s={0.44} tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Sparkles x={200} y={160} r={140} delay={2.6} n={6} />
        </g>
      );
    // Hawi's tukul on the rainy hill: Teacher pours "kiremt rain"; it runs off the pointed roof. Dry inside!
    case 2:
      return (
        <g>
          <Classroom id={id}>
            <Table>
              <Diorama x={200} y={196} land="rain" s={1.3}>
                <GrassTukul s={0.7} />
              </Diorama>
            </Table>
          </Classroom>
          <g transform="translate(250 64)">
            <g className="ah-tip">
              <WateringCan x={0} y={0} s={1.4} pour />
            </g>
          </g>
          <g fill="#5BB8E8">
            {[0, 0.3, 0.6, 0.9].map((d, i) => (
              <circle key={d} cx={i % 2 ? 170 : 230} cy={150} r={2.6} className="ah-runoff" style={vars({ "--delay": `${-d}s`, "--rx": `${i % 2 ? -20 : 20}px` })} />
            ))}
          </g>
          <Place x={70} y={298} s={0.44} tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Place x={340} y={298} s={0.44} flip tap={TAP.grandma}>
            <Teacher mood="happy" />
          </Place>
        </g>
      );
    // Haben: few trees but lots of stones. A hidmo: thick stone walls, and a flat roof to dry grain and peppers.
    case 3:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <Mountains far="#B7C6E6" mid="#8EA8D4" />
          <path d="M-10 200 Q200 180 410 200 L410 310 L-10 310Z" fill="#A8A08A" />
          {[40, 90, 320, 370].map((rx, i) => (
            <ellipse key={rx} cx={rx} cy={226 + (i % 2) * 10} rx={14} ry={8} fill="#8A8A96" />
          ))}
          <Hidmo x={220} y={240} s={1.1} />
          <Place x={90} y={298} s={0.46} tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
          <Sparkles x={220} y={150} r={40} delay={1} n={5} />
          <Air kind="day" seed={4} grass={false} />
        </g>
      );
    // Lali flaps like a mountain wind. Whoosh! Gugu's grass roof flies away; the hidmo doesn't move.
    case 4:
      return (
        <g>
          <Classroom id={id}>
            <Table>
              <Diorama x={200} y={196} land="stone" s={1.3}>
                <g transform="translate(-30 0)">
                  <GrassTukul roofOff s={0.6} />
                </g>
                <g transform="translate(30 0) scale(0.32)">
                  <Hidmo x={0} y={0} />
                </g>
              </Diorama>
            </Table>
          </Classroom>
          <g className="ah-wind">
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M300 ${120 + i * 14} q-20 -6 -40 0`} stroke="#FFFFFF" strokeWidth={3} fill="none" strokeLinecap="round" />
            ))}
          </g>
          <BeeHover x={330} y={120} s={1.4} flip />
          <Place x={70} y={298} s={0.44} tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
          <Sign x={100} y={170} kind="!" delay={1.2} />
        </g>
      );
    // The Dorze houses of the Gamo highlands: woven bamboo, enset-leaf thatch, taller than a giraffe, an elephant's head with a nose.
    case 5:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <Mountains far="#B7C6E6" mid="#8EA8D4" />
          <path d="M-10 210 Q200 196 410 212 L410 310 L-10 310Z" fill="#6AA84E" />
          <Enset x={60} y={250} s={0.9} />
          <Enset x={350} y={246} s={0.8} delay={-1} />
          <DorzeHouse x={200} y={258} s={1.3} />
          <Place x={290} y={272} s={0.2} tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
          <path d="M290 76 V262 M284 82 l6 -6 l6 6 M284 256 l6 6 l6 -6" stroke="#E2463F" strokeWidth={2} fill="none" className="lali-pop-in" style={vars({ "--delay": "1.2s" })} />
          <Air kind="day" seed={6} />
        </g>
      );
    // When termites eat the bottom, they cut it off and many people lift the house and carry it. A little shorter each time!
    case 6:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <path d="M-10 210 Q200 196 410 212 L410 310 L-10 310Z" fill="#6AA84E" />
          <g className="ah-carry">
            <DorzeHouse x={200} y={236} s={1} />
            {[-60, -36, -12, 12, 36, 60].map((dx, i) => (
              <g key={dx} transform={`translate(${200 + dx} 272)`}>
                <g className="lali-hop" style={vars({ "--dur": "0.6s", "--delay": `${-i * 0.1}s` })}>
                  <path d="M-6 0 Q-7 -14 0 -16 Q7 -14 6 0Z" fill={["#FFFFFF", "#E2463F", "#2F6FD0", "#F5B21E"][i % 4]} />
                  <circle cx={0} cy={-20} r={4.6} fill="#5A3A26" />
                  <path d="M-4 -14 L-8 -36 M4 -14 L8 -36" stroke="#5A3A26" strokeWidth={2} />
                </g>
              </g>
            ))}
          </g>
          <ellipse cx={80} cy={280} rx={50} ry={10} fill="#8A6A44" />
          <Place x={350} y={298} s={0.4} flip tap={TAP.grandma}>
            <Teacher mood="joy" />
          </Place>
          <Air kind="day" seed={8} />
        </g>
      );
    // Gugu puts a tukul on the plain. Ayan: "Families here move with their camels and goats to find water and grass."
    case 7:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <path d="M-10 180 Q200 168 410 182 L410 310 L-10 310Z" fill="#E0B878" />
          <Acacia x={330} y={200} s={0.5} />
          <Tukul x={150} y={240} s={0.7} smoke={false} />
          {[0, 1].map((i) => (
            <g key={i} className="ah-herd" style={vars({ "--delay": `${-i * 1.5}s` })}>
              <g transform={`translate(${280 + i * 40} ${226 + i * 6}) scale(0.7)`}>
                <ToyCamel packed={false} />
              </g>
            </g>
          ))}
          <Place x={60} y={298} s={0.42} tap={TAP.gugu}>
            <Gugu mood="happy" pose="point" />
          </Place>
          <Place x={260} y={300} s={0.46} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" />
          </Place>
          <Sign x={290} y={150} kind="?" delay={1} />
          <Air kind="day" seed={10} grass={false} />
        </g>
      );
    // Ayan bends sticks into a dome, covers it with mats… then takes it apart and ties it onto a toy camel. "Ready to go!"
    case 8:
      return (
        <g>
          <Classroom id={id}>
            <Table>
              <Diorama x={130} y={196} land="plain" s={1.2}>
                <g className="ah-frame">
                  <Aqal x={0} y={0} s={0.5} bare />
                </g>
                <g className="ah-mats">
                  <Aqal x={0} y={0} s={0.5} />
                </g>
              </Diorama>
              <g transform="translate(290 196)">
                <g className="oe-grow-in" style={vars({ "--delay": "3s" })}>
                  <ToyCamel />
                </g>
              </g>
            </Table>
          </Classroom>
          <Place x={240} y={300} s={0.46} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Sparkles x={290} y={160} r={30} delay={3.4} n={5} />
        </g>
      );
    // The toy camel trots off with its house; Gugu's tukul sits alone. "Is it a good tukul? Then where does it belong?"
    case 9:
      return (
        <g>
          <Classroom id={id}>
            <Table>
              <Diorama x={140} y={196} land="plain" s={1.2}>
                <GrassTukul s={0.6} />
              </Diorama>
              <g className="ah-trot">
                <g transform="translate(260 196)">
                  <ToyCamel />
                </g>
              </g>
            </Table>
          </Classroom>
          <Place x={60} y={300} s={0.44} tap={TAP.gugu}>
            <Gugu mood="sad" />
          </Place>
          <Place x={340} y={298} s={0.44} flip tap={TAP.grandma}>
            <Teacher mood="happy" pose="point" />
          </Place>
          <Sign x={200} y={110} kind="?" delay={1.6} />
        </g>
      );
    // Gugu carries his tukul to the rainy hill, next to Hawi's, and pours some "rain". Every home fits its place!
    case 10:
      return (
        <g>
          <Classroom id={id}>
            <Table>
              <Diorama x={200} y={196} land="rain" s={1.4}>
                <g transform="translate(-22 0)">
                  <GrassTukul s={0.55} />
                </g>
                <g transform="translate(24 0)">
                  <g className="oe-pin" style={vars({ "--delay": "0.6s" })}>
                    <GrassTukul s={0.55} />
                  </g>
                </g>
              </Diorama>
            </Table>
          </Classroom>
          <Place x={330} y={298} s={0.46} flip tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Place x={70} y={298} s={0.42} tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Hearts spots={[[200, 120, 1.4], [230, 110, 2]]} />
        </g>
      );
    // Culture Day: the tukul, the hidmo, the tall Dorze house and the aqal on its camel. "Each one is the best in its own place!"
    case 11:
      return (
        <g>
          <Classroom id={id}>
            <Table>
              <Diorama x={62} y={196} land="rain" s={0.72}>
                <GrassTukul s={0.5} />
              </Diorama>
              <Diorama x={154} y={196} land="stone" s={0.72}>
                <g transform="scale(0.3)">
                  <Hidmo x={0} y={0} />
                </g>
              </Diorama>
              <Diorama x={246} y={196} land="bamboo" s={0.72}>
                <g transform="scale(0.36)">
                  <DorzeHouse x={0} y={0} />
                </g>
              </Diorama>
              <Diorama x={338} y={196} land="plain" s={0.72}>
                <ToyCamel />
              </Diorama>
            </Table>
          </Classroom>
          {[
            { x: 60, el: <Wolf mood="joy" />, tap: TAP.hawi },
            { x: 140, el: <Ibex mood="joy" pose="wave" />, tap: TAP.haben },
            { x: 210, el: <Gugu mood="joy" pose="wave" />, tap: TAP.gugu },
            { x: 280, el: <Camel who="ayan" mood="joy" />, tap: TAP.ayan },
            { x: 350, el: <Teacher mood="joy" />, tap: TAP.grandma },
          ].map(({ x, el, tap }) => (
            <Place key={x} x={x} y={300} s={0.32} flip={x > 200} tap={tap}>
              {el}
            </Place>
          ))}
          <Sparkles x={200} y={150} r={160} delay={0.6} n={8} />
        </g>
      );
    default:
      return null;
  }
}
