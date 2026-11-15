"use client";

import "./why-because.css";

import { useId } from "react";

import { Air, BeeHover, Daisy, DriftCloud, Flower, Place, Rain, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { FONT, Grandma, Gugu, TAP, Tsehay } from "./cast";
import { Label } from "./more";
import { Yard } from "./places";
import { Hearts, SayBubble, Sign, Speech } from "./props";
import { Thing } from "./things";

/*
  "Why? Because!": one living picture per page (12 pages), in Grandma's garden after the long rains,
  full of flowers and busy bees. Gugu's questions pop up as question marks; Tsehay's answer is a
  drawing in the dirt: RAIN in the middle, with arrows out to the flowers, the bees, the grass,
  the cows and the river (the main idea and its details).
  Keyframes: ./kit.css, ./more.css and ./why-because.css (wyb-*).
*/

const GREEN = "#2E9A5B";
type M = "happy" | "joy" | "wow" | "worried" | "sad";
const TsehayAt = ({ x = 200, y = 294, s = 0.42, mood = "happy" as M, pose = "sit" as "sit" | "wave" | "point" | "hop" | "no", flip = false, className }: { x?: number; y?: number; s?: number; mood?: M; pose?: "sit" | "wave" | "point" | "hop" | "no"; flip?: boolean; className?: string }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.tsehay} className={className}>
    <Tsehay mood={mood} pose={pose} />
  </Place>
);
const GuguAt = ({ x = 200, y = 294, s = 0.4, mood = "happy" as M, pose = "sit" as "sit" | "wave" | "point" | "hop" | "no", flip = false, className }: { x?: number; y?: number; s?: number; mood?: M; pose?: "sit" | "wave" | "point" | "hop" | "no"; flip?: boolean; className?: string }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.gugu} className={className}>
    <Gugu mood={mood} pose={pose} />
  </Place>
);

/** Grandma's flower beds. */
const Beds = () => (
  <g>
    {[60, 90, 120, 280, 310, 340].map((x, i) => (
      <Flower key={x} x={x} y={238 + (i % 2) * 6} h={30 + (i % 3) * 8} color={["#E8413B", "#FFD233", "#F48AB8", "#8E5BE0"][i % 4]} delay={i * 0.2} />
    ))}
    {[150, 250].map((x, i) => (
      <Daisy key={x} x={x} y={236} h={24} delay={i * 0.3} />
    ))}
  </g>
);

/** The main-idea drawing in the dirt: RAIN in the middle and arrows to the details. */
function RainMap({ labels = false }: { labels?: boolean }) {
  const spokes: [number, number, string][] = [
    [-110, -40, "flower"],
    [-70, 40, "bee"],
    [0, 52, "leaf"],
    [70, 40, "cow"],
    [110, -40, "water"],
  ];
  return (
    <g transform="translate(200 120)">
      <g className="lali-pop-in" style={vars({ "--delay": "0.3s" })}>
        <circle r={30} fill="#FFFDF6" stroke="#5BB8E8" strokeWidth={3} />
        <text y={6} fontSize={16} fontFamily={FONT} fontWeight={900} fill="#2F6FD0" textAnchor="middle">
          RAIN
        </text>
      </g>
      {spokes.map(([x, y, pic], i) => (
        <g key={pic}>
          <path d={`M${x * 0.32} ${y * 0.32} L${x * 0.72} ${y * 0.72}`} stroke="#8A5A2E" strokeWidth={3} strokeLinecap="round" className="lali-pop-in" style={vars({ "--delay": `${0.8 + i * 0.3}s` })} />
          <g transform={`translate(${x} ${y})`}>
            <g className="lali-pop-in" style={vars({ "--delay": `${1 + i * 0.3}s` })}>
              <Tappable reaction="bounce" sound="pop">
                <circle r={18} fill="#FFFDF6" stroke="#B9A58C" strokeWidth={1.6} />
                <g transform="scale(0.34)">
                  <Thing id={pic} />
                </g>
              </Tappable>
            </g>
          </g>
        </g>
      ))}
      {labels && (
        <g>
          <Label x={0} y={-48} text="main idea" delay={2.6} size={13} rot={0} />
          <Label x={-120} y={-74} text="details" delay={3} size={12} />
        </g>
      )}
    </g>
  );
}

export default function WhyBecause({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A garden full of flowers. "Why are there so many flowers?"
    case 0:
      return (
        <g>
          <Yard id={id} time="day">
            <Beds />
            <TsehayAt x={160} mood="joy" />
            <GuguAt x={240} mood="wow" pose="point" flip />
            <SayBubble x={260} y={160} lines={["Why?"]} size={18} tail="down" delay={0.8} color={GREEN} />
          </Yard>
          <Air kind="day" seed={2} />
        </g>
      );
    // "Because it rained. Flowers need water to grow."
    case 1:
      return (
        <g>
          <Yard id={id} time="day">
            <Beds />
            <Speech x={150} y={110} w={110} h={70} think delay={0.4}>
              <g transform="scale(0.6)">
                <Thing id="rain" />
              </g>
            </Speech>
            <TsehayAt x={150} mood="happy" />
            <GuguAt x={260} mood="happy" flip />
            <Label x={290} y={110} text="because" delay={1.2} size={16} />
          </Yard>
          <Air kind="day" seed={3} />
        </g>
      );
    // "Why are the bees so busy?" "Because there are so many flowers."
    case 2:
      return (
        <g>
          <Yard id={id} time="day">
            <Beds />
            <BeeHover x={90} y={200} s={0.8} />
            <BeeHover x={300} y={190} s={0.8} flip />
            <BeeHover x={200} y={140} s={1} />
            <TsehayAt x={140} y={298} s={0.38} mood="joy" />
            <GuguAt x={250} y={298} s={0.36} mood="wow" flip />
            <Sign x={250} y={220} kind="?" delay={0.6} />
          </Yard>
          <Air kind="day" seed={4} />
        </g>
      );
    // "Why is Grandma smiling?" "Because the bees made lots of honey."
    case 3:
      return (
        <g>
          <Yard id={id} time="day">
            <Beds />
            <Place x={290} y={292} s={0.46} flip tap={TAP.grandma}>
              <Grandma arm="hold" mood="joy" />
            </Place>
            <g transform="translate(230 220)">
              <g className="lali-pop-in" style={vars({ "--delay": "0.6s" })}>
                <Thing id="honey" s={0.6} />
              </g>
            </g>
            <GuguAt x={120} mood="happy" pose="point" />
            <Hearts spots={[[300, 170, 1.4], [316, 156, 1.8]]} />
          </Yard>
          <Air kind="day" seed={5} />
        </g>
      );
    // Why is the grass so green? Why are the cows so fat? Why, why, WHY?
    case 4:
      return (
        <g>
          <Yard id={id} time="day">
            <g transform="translate(310 236)">
              <Thing id="cow" s={0.8} />
            </g>
            <path d="M-10 250 Q100 240 200 252" stroke="#5BB8E8" strokeWidth={8} fill="none" opacity={0.8} />
            <GuguAt x={170} mood="joy" pose="hop" className="wyb-bounce" />
            {[0, 1, 2, 3].map((i) => (
              <Sign key={i} x={110 + i * 50} y={110 + (i % 2) * 30} kind="?" delay={0.3 + i * 0.3} color={["#2E9A5B", "#E8413B", "#2F6FD0", "#8E5BE0"][i]} />
            ))}
          </Yard>
          <Air kind="day" seed={6} />
        </g>
      );
    // Tsehay's head spins… all the answers come back to one thing.
    case 5:
      return (
        <g>
          <Yard id={id} time="day">
            <Beds />
            <g transform="translate(160 186)">
              <g className="wyb-spin">
                <path d="M-20 0 a20 20 0 1 1 20 20 a14 14 0 1 1 -14 -14" stroke="#8E5BE0" strokeWidth={3} fill="none" />
              </g>
            </g>
            <TsehayAt x={160} mood="worried" />
            <Sign x={200} y={180} kind="!" delay={1.8} color="#F5B21E" />
          </Yard>
          <Air kind="day" seed={7} />
        </g>
      );
    // RAIN in the middle, arrows to the flowers, bees, grass, cows and river.
    case 6:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <ellipse cx={200} cy={130} rx={160} ry={86} fill="#E8C08A" opacity={0.7} />
            <RainMap />
            <TsehayAt x={120} y={298} s={0.36} mood="joy" pose="point" />
            <GuguAt x={280} y={298} s={0.34} mood="wow" flip />
          </Yard>
          <Air kind="day" seed={8} />
        </g>
      );
    // "This is the main idea: the rain helps everything grow. The rest are details."
    case 7:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <ellipse cx={200} cy={130} rx={160} ry={86} fill="#E8C08A" opacity={0.7} />
            <RainMap labels />
            <TsehayAt x={120} y={298} s={0.36} mood="joy" pose="wave" />
            <GuguAt x={280} y={298} s={0.34} mood="joy" flip />
          </Yard>
          <Air kind="day" seed={9} />
        </g>
      );
    // "Why does the rain only come in the rainy season?"
    case 8:
      return (
        <g>
          <Yard id={id} time="day">
            <DriftCloud y={50} s={1.3} dur={30} color="#7E889E" shade="#5E6880" />
            <DriftCloud y={80} s={1} dur={36} phase={0.5} color="#8E98AE" shade="#6E7890" />
            <Rain />
            <Label x={280} y={130} text="rainy season" delay={0.8} size={15} />
            <TsehayAt x={140} mood="happy" />
            <GuguAt x={230} mood="wow" flip />
          </Yard>
        </g>
      );
    // Warm bread with honey: "Because you found the main idea!"
    case 9:
      return (
        <g>
          <Yard id={id} time="evening">
            <Beds />
            <Place x={300} y={292} s={0.46} flip tap={TAP.grandma}>
              <Grandma arm="hold" mood="joy" />
            </Place>
            <g transform="translate(240 224)">
              <g className="lali-pop-in" style={vars({ "--delay": "0.4s" })}>
                <Thing id="loaf" s={0.5} />
                <g transform="translate(18 -14)">
                  <Thing id="honey" s={0.3} />
                </g>
              </g>
            </g>
            <TsehayAt x={110} mood="joy" />
            <GuguAt x={180} mood="joy" pose="wave" />
            <SayBubble x={280} y={140} lines={["Because you found", "the main idea!"]} size={12} tail="down" delay={1.2} />
          </Yard>
          <Air kind="dusk" seed={10} />
        </g>
      );
    // "Main idea: the rain is good. Detail: the honey is yummy!"
    case 10:
      return (
        <g>
          <Yard id={id} time="evening">
            <Beds />
            <Label x={130} y={80} text="main idea: rain is good" delay={0.4} size={14} />
            <Label x={260} y={120} text="detail: honey is yummy!" delay={1} size={14} rot={4} />
            <GuguAt x={200} mood="joy" className="wyb-lick" />
            <TsehayAt x={290} mood="joy" flip />
          </Yard>
          <Air kind="dusk" seed={11} />
        </g>
      );
    // Why? Because…!
    default:
      return (
        <g>
          <Yard id={id} time="evening">
            <Beds />
            <Label x={140} y={90} text="Why?" delay={0.4} size={20} />
            <Label x={260} y={110} text="Because…!" delay={1} size={20} rot={4} />
            <TsehayAt x={150} mood="joy" pose="wave" />
            <GuguAt x={250} mood="joy" flip />
          </Yard>
          <Air kind="dusk" seed={12} />
        </g>
      );
  }
}
