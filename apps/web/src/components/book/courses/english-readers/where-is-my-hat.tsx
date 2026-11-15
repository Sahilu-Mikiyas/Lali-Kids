"use client";

import "./where-is-my-hat.css";

import { useId } from "react";

import { Air, BeeHover, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { FONT, Gugu, Ibex, Papa, TAP, Wolf } from "./cast";
import { Label, Market } from "./more";
import { Hearts, SayBubble, Sign, Sparkles, Speech } from "./props";
import { Thing } from "./things";

/*
  "Where Is My Hat?": one living picture per page (12 pages), at the busy market on a windy day.
  Every hat in the story is drawn by <Hat> with its size and colour, so the child can check each
  one against the words: little or big, yellow, blue or black, with a flower or without. The
  describing words hang beside the hats on little paper tags.
  Keyframes: ./kit.css, ./more.css and ./where-is-my-hat.css (wmh-*).
*/

const YELLOW = "#FFD233";

/** A hat: `big` or little, any colour, with a red (or pink) flower or none. Centred on its brim. */
function Hat({ color = YELLOW, big = false, flower = "red" as "red" | "pink" | "none", eaten = false }) {
  const s = big ? 1.5 : 1;
  return (
    <g transform={`scale(${s})`}>
      <ellipse cx={0} cy={0} rx={26} ry={7} fill={color} stroke="#2A1A10" strokeWidth={1.6} />
      <path d="M-15 0 Q-16 -24 0 -24 Q16 -24 15 0Z" fill={color} stroke="#2A1A10" strokeWidth={1.6} />
      <path d="M-15 -6 Q0 -2 15 -6" stroke={color === "#2A2A33" ? "#E8413B" : "#2A1A10"} strokeWidth={3} fill="none" opacity={0.6} />
      {flower !== "none" && !eaten && (
        <g transform={`translate(10 -10) scale(${flower === "pink" ? 1.5 : 1})`}>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx={0} cy={-5} rx={3.4} ry={5} fill={flower === "pink" ? "#F48AB8" : "#E8413B"} transform={`rotate(${a})`} />
          ))}
          <circle r={2.6} fill="#FFD233" />
        </g>
      )}
      {eaten && <path d="M8 -12 l3 -3 m2 6 l3 -2" stroke="#2E9A5B" strokeWidth={1.6} />}
    </g>
  );
}

/** Haben, with her hat on her head when `hat`. */
function Haben({ x, y = 294, s = 0.44, mood = "happy" as "happy" | "joy" | "wow" | "worried", pose = "sit" as "sit" | "wave" | "point", flip = false, hat, className }: { x: number; y?: number; s?: number; mood?: "happy" | "joy" | "wow" | "worried"; pose?: "sit" | "wave" | "point"; flip?: boolean; hat?: "red" | "pink" | "none"; className?: string }) {
  return (
    <Place x={x} y={y} s={s} flip={flip} tap={TAP.haben} className={className}>
      <g>
        <Ibex mood={mood} pose={pose} />
        {hat && (
          <g transform="translate(100 66) scale(1.6)">
            <Hat flower={hat} />
          </g>
        )}
      </g>
    </Place>
  );
}

/** Haben's mom: a grown walia ibex in a white shawl. */
const Mom = ({ x = 200, y = 292, s = 0.5, mood = "happy" as "happy" | "joy" | "wow", flip = false }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.mama}>
    <Ibex grown mood={mood} />
  </Place>
);

/** Somebody else's hat, held up beside a tag of describing words. */
function Shown({ x, y, color, big = false, flower = "none" as "red" | "none", words }: { x: number; y: number; color: string; big?: boolean; flower?: "red" | "none"; words: string[] }) {
  return (
    <g>
      <g transform={`translate(${x} ${y})`}>
        <g className="lali-pop-in" style={vars({ "--delay": "0.6s" })}>
          <Tappable reaction="wiggle" sound="pop">
            <Hat color={color} big={big} flower={flower} />
          </Tappable>
        </g>
      </g>
      {words.map((w, i) => (
        <Label key={w} x={x + 70} y={y - 20 + i * 26} text={w} rot={-4 + i * 6} delay={1.2 + i * 0.3} size={14} />
      ))}
    </g>
  );
}

export default function WhereIsMyHat({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // This is Haben. A little yellow hat with a red flower.
    case 0:
      return (
        <g>
          <Market id={id}>
            <Haben x={180} mood="joy" hat="red" />
            <Label x={270} y={130} text="little" delay={0.8} size={15} />
            <Label x={280} y={160} text="yellow" rot={4} delay={1.1} size={15} />
            <Label x={270} y={190} text="red flower" rot={-2} delay={1.4} size={15} />
            <Hearts spots={[[130, 180, 1.6], [146, 166, 2]]} />
          </Market>
          <Air kind="day" seed={2} grass={false} />
        </g>
      );
    // To the market. It is big and busy. The wind is blowing.
    case 1:
      return (
        <g>
          <Market id={id} wind>
            <Place x={160} y={294} s={0.42} from={[60, 294]} dur={2} delay={0.2} tap={TAP.haben}>
              <g>
                <Ibex mood="happy" />
                <g transform="translate(100 66) scale(1.6)">
                  <g className="wmh-wobble">
                    <Hat />
                  </g>
                </g>
              </g>
            </Place>
            <Mom x={250} />
            <Place x={330} y={296} s={0.3} flip tap={TAP.papa}>
              <Papa mood="happy" />
            </Place>
          </Market>
          <Air kind="day" seed={3} grass={false} />
        </g>
      );
    // Whoosh! The wind takes the hat. Up, up, up!
    case 2:
      return (
        <g>
          <Market id={id} wind>
            <g transform="translate(180 210)">
              <g className="enr-blow" style={vars({ "--bx": "130px", "--by": "-150px", "--br": "400deg", "--dur": "2.4s" })}>
                <g transform="scale(1.4)">
                  <Hat />
                </g>
              </g>
            </g>
            <text x={250} y={120} fontSize={24} fontFamily={FONT} fontWeight={900} fill="#2F6FD0" className="lali-pop-in" style={vars({ "--delay": "0.4s" })}>
              Whoosh!
            </text>
            <Haben x={160} mood="worried" pose="point" />
            <Sign x={110} y={180} kind="?" delay={2} />
          </Market>
          <Air kind="day" seed={4} grass={false} />
        </g>
      );
    // A big black hat. Is this my hat? No!
    case 3:
      return (
        <g>
          <Market id={id}>
            <Place x={290} y={292} s={0.5} flip tap={TAP.papa}>
              <Papa mood="happy" pose="point" />
            </Place>
            <Shown x={180} y={120} color="#2A2A33" big words={["big", "black"]} />
            <Haben x={100} mood="worried" />
            <SayBubble x={110} y={190} lines={["No!"]} size={16} tail="down" delay={2} />
          </Market>
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    // Gugu's little blue hat. No!
    case 4:
      return (
        <g>
          <Market id={id}>
            <Place x={290} y={294} s={0.44} flip tap={TAP.gugu}>
              <Gugu mood="joy" pose="point" />
            </Place>
            <Shown x={180} y={120} color="#2F6FD0" words={["little", "blue"]} />
            <Haben x={100} mood="worried" />
            <SayBubble x={110} y={190} lines={["No!"]} size={16} tail="down" delay={2} />
          </Market>
          <Air kind="day" seed={6} grass={false} />
        </g>
      );
    // Hawi's yellow hat: but it is big, with no flower. No!
    case 5:
      return (
        <g>
          <Market id={id}>
            <Place x={290} y={294} s={0.44} flip tap={TAP.hawi}>
              <Wolf mood="joy" arm="give" />
            </Place>
            <Shown x={180} y={120} color={YELLOW} big words={["big", "yellow", "no flower"]} />
            <Haben x={100} mood="worried" />
            <SayBubble x={110} y={190} lines={["No!"]} size={16} tail="down" delay={2.4} />
          </Market>
          <Air kind="day" seed={7} grass={false} />
        </g>
      );
    // Who can see it all? Lali can! Lali can fly up high.
    case 6:
      return (
        <g>
          <Market id={id}>
            <g transform="translate(0 0)">
              <g className="wmh-rise">
                <BeeHover x={250} y={150} s={1.4} flip />
              </g>
            </g>
            <Speech x={150} y={86} w={110} h={64} delay={0.6}>
              <g transform="scale(0.9)">
                <Hat />
              </g>
            </Speech>
            <Haben x={150} mood="happy" pose="point" />
            <Sparkles x={250} y={120} r={40} delay={1.6} n={6} />
          </Market>
          <Air kind="day" seed={8} grass={false} />
        </g>
      );
    // Lali looks down: a lot of hats… and a little yellow hat with a red flower!
    case 7:
      return (
        <g>
          <rect width={400} height={300} fill="#D9B07A" />
          <path d="M0 80 Q200 60 400 90 M0 200 Q200 230 400 190" stroke="#C99A64" strokeWidth={20} fill="none" />
          {[
            [90, 90, "#2A2A33", true],
            [170, 140, "#2F6FD0", false],
            [260, 70, "#E8413B", true],
            [320, 170, "#FFFDF6", false],
            [120, 220, YELLOW, true],
            [210, 240, "#8E5BE0", false],
            [300, 250, "#2E9A5B", true],
          ].map(([x, y, c, big], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <circle r={big ? 26 : 18} fill={c as string} stroke="#2A1A10" strokeWidth={1.6} />
              <circle r={big ? 14 : 10} fill={c as string} stroke="#2A1A10" strokeWidth={1.2} opacity={0.85} />
            </g>
          ))}
          <g transform="translate(250 150)">
            <g className="wmh-found">
              <circle r={17} fill={YELLOW} stroke="#2A1A10" strokeWidth={1.6} />
              <circle r={9} fill={YELLOW} stroke="#2A1A10" strokeWidth={1.2} />
              <g transform="translate(7 -6)">
                {[0, 72, 144, 216, 288].map((a) => (
                  <ellipse key={a} cx={0} cy={-4} rx={3} ry={4.4} fill="#E8413B" transform={`rotate(${a})`} />
                ))}
              </g>
              <circle r={28} fill="none" stroke="#F5B21E" strokeWidth={3} strokeDasharray="6 4" />
            </g>
          </g>
          <BeeHover x={200} y={70} s={1.2} />
        </g>
      );
    // It is on a goat! And she is eating the red flower! Munch, munch.
    case 8:
      return (
        <g>
          <Market id={id}>
            <g transform="translate(220 230)">
              <g className="wmh-munch">
                <Thing id="goat" s={1.4} />
                <g transform="translate(-30 -40) rotate(-14)">
                  <Hat />
                </g>
              </g>
            </g>
            <text x={250} y={124} fontSize={18} fontFamily={FONT} fontWeight={900} fill="#2E9A5B" textAnchor="middle" className="lali-pop-in" style={vars({ "--delay": "1s" })}>
              Munch, munch.
            </text>
            <Haben x={100} mood="wow" pose="point" />
          </Market>
          <Air kind="day" seed={9} grass={false} />
        </g>
      );
    // "Stop, goat, stop!" Run, Haben, run!
    case 9:
      return (
        <g>
          <Market id={id}>
            <g transform="translate(270 240)">
              <g className="wmh-flee">
                <g transform="scale(-1 1)">
                  <Thing id="goat" s={1.1} />
                </g>
                <g transform="translate(26 -32) rotate(14)">
                  <Hat flower="none" />
                </g>
              </g>
            </g>
            <Haben x={140} mood="joy" pose="point" className="enr-run" />
            <SayBubble x={150} y={150} lines={["Stop, goat, stop!"]} size={14} tail="down" delay={0.6} />
          </Market>
          <Air kind="day" seed={10} grass={false} />
        </g>
      );
    // Her little yellow hat, but the red flower is gone. Mom has an idea.
    case 10:
      return (
        <g>
          <Market id={id}>
            <g transform="translate(200 150)">
              <g transform="scale(1.6)">
                <Hat flower="none" eaten />
              </g>
            </g>
            <Haben x={140} mood="worried" />
            <Mom x={270} mood="happy" flip />
            <Sign x={270} y={160} kind="!" delay={1.2} color="#F5B21E" />
          </Market>
          <Air kind="day" seed={11} grass={false} />
        </g>
      );
    // A big pink flower. Haben is happy! Who? Where?
    default:
      return (
        <g>
          <Market id={id}>
            <Haben x={170} mood="joy" pose="wave" hat="pink" />
            <Mom x={280} mood="joy" flip />
            <Label x={110} y={110} text="Who?" delay={1.6} size={16} rot={-6} />
            <Label x={110} y={146} text="Where?" delay={1.9} size={16} rot={4} />
            <Sparkles x={170} y={180} r={50} delay={0.8} n={7} />
            <Hearts spots={[[220, 170, 1.4], [236, 156, 1.8]]} />
          </Market>
          <Air kind="day" seed={12} grass={false} />
        </g>
      );
  }
}
