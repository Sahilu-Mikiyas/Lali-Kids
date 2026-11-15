"use client";

import "./clues-for-rain.css";

import { useId, type ReactNode } from "react";

import { Air, Birds, DriftCloud, Place, Rain, vars } from "../../scenery";
import { Camel, Gugu, TAP } from "./cast";
import { Label } from "./more";
import { Home, Yard } from "./places";
import { Hearts, SayBubble, Sign, Speech } from "./props";
import { Thing } from "./things";

/*
  "What Will Happen Next?": one living picture per page (12 pages), in Ayan's yard with the washing
  on the line. The clues arrive one by one (dark clouds over the hills, the wind blowing the
  washing, birds flying home), each with a numbered tag, then the rain pours and the rainbow comes.
  Keyframes: ./kit.css, ./more.css and ./clues-for-rain.css (cfr-*).
*/

type M = "happy" | "joy" | "wow" | "worried";
const Ayan = ({ x = 200, y = 294, s = 0.44, mood = "happy" as M, flip = false, walk = false, item }: { x?: number; y?: number; s?: number; mood?: M; flip?: boolean; walk?: boolean; item?: ReactNode }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.ayan}>
    <Camel who="ayan" mood={mood} walk={walk} item={item} />
  </Place>
);
const Abdi = ({ x = 200, y = 296, s = 0.38, mood = "happy" as M, flip = false, className, item }: { x?: number; y?: number; s?: number; mood?: M; flip?: boolean; className?: string; item?: ReactNode }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.ayan} className={className}>
    <Camel who="abdi" mood={mood} item={item} />
  </Place>
);

/** The washing line between two poles; `clothes` false when it has been taken in; `wind` makes it flap. */
function Line({ clothes = true, wind = false }: { clothes?: boolean; wind?: boolean }) {
  const items: [number, string, string][] = [
    [120, "#E8413B", "M-14 0 H14 V30 H-14Z"],
    [170, "#2F6FD0", "M-12 0 H12 L16 34 H-16Z"],
    [215, "#F5B21E", "M-5 0 H5 V18 Q5 24 11 26 L9 30 Q-1 28 -5 20Z"],
    [250, "#8E5BE0", "M-5 0 H5 V18 Q5 24 11 26 L9 30 Q-1 28 -5 20Z"],
  ];
  return (
    <g>
      <path d="M90 150 V250 M290 150 V250" stroke="#7A5236" strokeWidth={5} />
      <path d="M90 152 Q190 166 290 152" stroke="#5A4A3A" strokeWidth={1.6} fill="none" />
      {clothes &&
        items.map(([x, c, d], i) => (
          <g key={x} transform={`translate(${x} 158)`}>
            <g className={wind ? "cfr-flap" : "lali-sway"} style={vars({ "--delay": `${i * 0.15}s`, "--dur": "3s" })}>
              <path d={d} fill={c} stroke="#2A1A10" strokeWidth={1.4} />
            </g>
          </g>
        ))}
    </g>
  );
}

/** Dark rain clouds over the hills. */
const Storm = ({ near = false }: { near?: boolean }) => (
  <g>
    <DriftCloud y={near ? 50 : 80} s={near ? 1.4 : 0.9} dur={30} phase={0.1} color="#6E7890" shade="#4E5870" />
    <DriftCloud y={near ? 80 : 100} s={near ? 1.2 : 0.8} dur={36} phase={0.5} color="#7E889E" shade="#5E6880" />
  </g>
);

/** A rainbow arc. */
const Rainbow = () => (
  <g className="cfr-rainbow" fill="none" strokeWidth={8} opacity={0.9}>
    {["#E8413B", "#F08A24", "#FFD233", "#2FA35A", "#2F6FD0", "#8E5BE0"].map((c, i) => (
      <path key={c} d={`M${70 + i * 8} 220 A${130 - i * 8} ${120 - i * 8} 0 0 1 ${330 - i * 8} 220`} stroke={c} />
    ))}
  </g>
);

export default function CluesForRain({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Hooyo hangs out the washing and goes to market. Ball in the sunny yard.
    case 0:
      return (
        <g>
          <Yard id={id} time="day" house>
            <Line />
            <Place x={360} y={292} s={0.44} from={[300, 292]} dur={2.4} delay={0.4} tap={TAP.mama}>
              <Camel who="hooyo" mood="happy" walk />
            </Place>
            <Ayan x={130} mood="joy" />
            <Abdi x={230} mood="joy" flip />
            <g transform="translate(180 270)">
              <g className="cfr-ball">
                <Thing id="ball" s={0.26} />
              </g>
            </g>
          </Yard>
          <Air kind="day" seed={2} />
        </g>
      );
    // Far away, over the hills, the sky is dark. "Look at the clues."
    case 1:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Storm />
            <Line />
            <Ayan x={150} mood="wow" />
            <Sign x={170} y={190} kind="!" delay={0.6} color="#4A6FA8" />
            <Label x={110} y={70} text="clues" delay={1.2} size={16} />
          </Yard>
          <Air kind="day" seed={3} />
        </g>
      );
    // Clue one: dark clouds. Clue two: the wind. Clue three: birds flying home.
    case 2:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Storm />
            <Birds y={110} n={4} dur={5} />
            <Line wind />
            <g stroke="#FFFFFF" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.85}>
              {[120, 140].map((y, i) => (
                <path key={y} d={`M40 ${y} q30 -8 60 0 t60 0`} className="enr-gust" style={vars({ "--delay": `${i * 0.6}s` })} />
              ))}
            </g>
            <Label x={110} y={50} text="1 dark clouds" delay={0.5} size={13} />
            <Label x={260} y={50} text="2 strong wind" delay={1.1} size={13} />
            <Label x={260} y={90} text="3 birds fly home" delay={1.7} size={13} />
            <Ayan x={150} mood="wow" />
          </Yard>
          <Air kind="day" seed={4} />
        </g>
      );
    // "What will happen next?" "We will play all day!"
    case 3:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Storm />
            <Line wind />
            <Ayan x={110} mood="worried" />
            <Abdi x={260} mood="joy" flip />
            <g transform="translate(220 250)">
              <g className="cfr-kick">
                <Thing id="ball" s={0.26} />
              </g>
            </g>
            <SayBubble x={260} y={150} lines={["We will play", "all day!"]} size={13} tail="down" delay={0.8} />
            <SayBubble x={110} y={150} lines={["What will", "happen next?"]} size={12} tail="down" delay={1.8} />
          </Yard>
          <Air kind="day" seed={5} />
        </g>
      );
    // "I predict it will rain."
    case 4:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Storm near />
            <Line wind />
            <Speech x={150} y={150} w={90} h={60} think delay={0.4}>
              <g transform="scale(0.5)">
                <Thing id="rain" />
              </g>
            </Speech>
            <Ayan x={130} mood="happy" />
            <SayBubble x={270} y={190} lines={["I predict", "it will rain!"]} size={13} tail="left" delay={1.4} />
          </Yard>
          <Air kind="day" seed={6} />
        </g>
      );
    // "Let's take the washing in!" "But it's sunny!"
    case 5:
      return (
        <g>
          <Yard id={id} time="day" house={false} sun={[320, 60]}>
            <Storm near />
            <Line wind />
            <Ayan x={110} mood="happy" />
            <Abdi x={270} mood="joy" flip className="cfr-laugh" />
            <SayBubble x={270} y={190} lines={["But it's sunny!"]} size={13} tail="down" delay={0.8} />
          </Yard>
          <Air kind="day" seed={7} />
        </g>
      );
    // Ayan takes in the dress, the shirt and the socks. Abdi carries one sock, slowly.
    case 6:
      return (
        <g>
          <Yard id={id} time="day" house>
            <Storm near />
            <Line clothes={false} />
            <Place x={300} y={294} s={0.44} from={[150, 294]} dur={2.4} delay={0.3} tap={TAP.ayan}>
              <Camel who="ayan" mood="happy" walk item={<Thing id="washing" s={0.5} />} />
            </Place>
            <Abdi x={130} mood="worried" item={<Thing id="sock" s={0.25} />} />
          </Yard>
          <Air kind="day" seed={8} />
        </g>
      );
    // Gugu: "Why are you taking the washing in?" "Because of the clues!"
    case 7:
      return (
        <g>
          <Yard id={id} time="day" house>
            <Storm near />
            <Line clothes={false} />
            <Place x={280} y={294} s={0.42} flip tap={TAP.gugu}>
              <Gugu mood="worried" pose="point" />
            </Place>
            <Ayan x={130} mood="joy" item={<Thing id="washing" s={0.5} />} />
            <SayBubble x={280} y={170} lines={["Why?"]} size={15} tail="down" delay={0.5} />
            <SayBubble x={140} y={150} lines={["Because of", "the clues!"]} size={13} tail="down" delay={1.4} />
          </Yard>
          <Air kind="day" seed={9} />
        </g>
      );
    // Plip, plop… WHOOSH! Everyone runs inside; the ball rolls into a puddle.
    case 8:
      return (
        <g>
          <Yard id={id} time="day" house>
            <rect width={400} height={300} fill="#4E5870" opacity={0.45} />
            <Storm near />
            <Line clothes={false} />
            <ellipse cx={170} cy={272} rx={44} ry={8} fill="#7FA8C8" />
            <g transform="translate(170 266)">
              <Thing id="ball" s={0.22} />
            </g>
            <Place x={340} y={294} s={0.36} from={[200, 294]} dur={1.4} delay={0.2} tap={TAP.ayan}>
              <Camel who="abdi" mood="wow" walk />
            </Place>
            <Rain heavy />
          </Yard>
        </g>
      );
    // Hooyo comes home, wet: "My washing is dry! Who took it in?"
    case 9:
      return (
        <g>
          <Home id={id} time="day" rain>
            <g transform="translate(200 254)">
              <Thing id="washing" s={0.8} />
            </g>
            <Place x={310} y={292} s={0.48} flip tap={TAP.mama}>
              <Camel who="hooyo" mood="wow" />
            </Place>
            {[0, 1, 2].map((i) => (
              <circle key={i} cx={296 + i * 14} cy={190} r={3} fill="#7FC8F0" className="cfr-drip" style={vars({ "--delay": `${i * 0.3}s` })} />
            ))}
            <Ayan x={100} mood="joy" />
            <Abdi x={160} mood="joy" />
            <SayBubble x={270} y={110} lines={["Who took it in?"]} size={13} tail="down" delay={0.6} />
            <Hearts spots={[[200, 190, 1.8], [216, 176, 2.2]]} />
          </Home>
        </g>
      );
    // The sun comes out, it still drizzles: "I predict… a rainbow!"
    case 10:
      return (
        <g>
          <Yard id={id} time="day" house sun={[320, 60]}>
            <Rainbow />
            <Rain />
            <Abdi x={180} mood="joy" />
            <Ayan x={120} mood="wow" />
            <SayBubble x={240} y={160} lines={["I predict…", "a rainbow!"]} size={13} tail="left" delay={0.4} />
          </Yard>
          <Air kind="day" seed={11} />
        </g>
      );
    // Look at the clues: what will happen next?
    default:
      return (
        <g>
          <Yard id={id} time="evening" house>
            <Label x={110} y={60} text="Look at the clues" delay={0.4} size={15} />
            <Label x={250} y={96} text="What will happen next?" delay={1} size={14} rot={4} />
            <Line />
            <Ayan x={140} mood="joy" />
            <Abdi x={240} mood="joy" flip />
          </Yard>
          <Air kind="dusk" seed={12} />
        </g>
      );
  }
}
