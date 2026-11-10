"use client";

import "./tolosas-riddles.css";

import { useId, type ReactNode } from "react";

import { Air, BeeHover, Place, Rock, Sheep, vars } from "../../scenery";
import { TAP, Wolf } from "./kit-cast";
import { d, GoatShape, Land, r1 } from "./kit";
import { Jumps, Label, NumberLine, SumCard } from "./kit-maths";
import { Hearth, Sign, Sparkles } from "./kit-props";

/*
  "Grandpa Tolosa's Riddles": one living picture per page (12 pages) on the Bale Mountains: the
  high plateau with its giant lobelias (tall rosettes topped by a spike), a big grey rock, a
  stream and the sheep. Each riddle is solved on a number line: Hawi's counting-on jumps arc
  from the number she knows to the target, and the hidden number appears over the jumps.
  Story keyframes: tr-* in ./tolosas-riddles.css.
*/

/** A giant lobelia: a woody stem, a rosette of long leaves and a tall flower spike (base at 0, 0). */
function Lobelia({ x, y, s = 1, night = false }: { x: number; y: number; s?: number; night?: boolean }) {
  const leaf = night ? "#2E5A4E" : "#5E9A5A";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="lali-sway" style={vars({ "--dur": "6s" })}>
        <rect x={-4} y={-40} width={8} height={40} rx={3} fill={night ? "#3A3430" : "#6A5A4A"} />
        {[-60, -35, -12, 12, 35, 60].map((a, i) => (
          <ellipse key={i} cx={0} cy={-46} rx={6} ry={20} fill={leaf} transform={`rotate(${a} 0 -46)`} opacity={0.95} />
        ))}
        <path d="M-7 -52 Q-9 -100 0 -116 Q9 -100 7 -52Z" fill={night ? "#3E6A5A" : "#7FB07A"} />
        <g fill={night ? "#5A7A9A" : "#6A8AD0"} opacity={0.8}>
          {Array.from({ length: 6 }, (_, i) => (
            <circle key={i} cx={i % 2 ? 3 : -3} cy={-60 - i * 9} r={2} />
          ))}
        </g>
      </g>
    </g>
  );
}

function Plateau({ id, time = "day", children }: { id: string; time?: "day" | "dusk" | "night"; children: ReactNode }) {
  const night = time === "night";
  return (
    <g>
      <Land id={id} time={time} hills={false} />
      <path d="M-10 180 Q120 162 240 172 T410 168 L410 310 L-10 310Z" fill={night ? "#26483E" : time === "dusk" ? "#6E8A5A" : "#9CBF7A"} />
      <path d="M-10 214 Q200 200 410 216 L410 310 L-10 310Z" fill={night ? "#1E3A32" : time === "dusk" ? "#5E7A4A" : "#86B06A"} />
      <Lobelia x={36} y={210} s={0.7} night={night} />
      <Lobelia x={372} y={206} s={0.6} night={night} />
      <Lobelia x={330} y={186} s={0.36} night={night} />
      {children}
      <Air kind={time} seed={31} grass={false} />
    </g>
  );
}

/** A flock of sheep at the given spots. */
function Flock({ spots, s = 0.42 }: { spots: [number, number][]; s?: number }) {
  return (
    <g>
      {spots.map(([x, y], i) => (
        <Sheep key={i} x={x} y={y} s={s} flip={i % 3 === 0} delay={-i * 0.4} />
      ))}
    </g>
  );
}

const nine: [number, number][] = [
  [80, 232],
  [118, 244],
  [156, 232],
  [196, 246],
  [92, 270],
  [134, 280],
  [176, 270],
  [218, 282],
  [256, 262],
];

export default function TolosasRiddles({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // The Bale Mountains: giant lobelias, Hawi and Grandpa Tolosa take the sheep out. "Riddle!"
    case 0:
      return (
        <Plateau id={id}>
          <Flock spots={[[130, 236], [170, 250], [210, 238], [150, 270], [196, 280], [240, 264]]} />
          <Place x={300} y={296} s={0.4} flip tap={TAP.elder}>
            <Wolf elder mood="joy" />
          </Place>
          <Place x={70} y={294} s={0.34} tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Sign x={276} y={150} kind="?" delay={1.4} color="#C9622B" />
          <BeeHover x={200} y={90} s={1} />
        </Plateau>
      );
    // Twelve left the pen; nine are seen. How many behind the rock? Count on: 10, 11, 12.
    case 1:
      return (
        <Plateau id={id}>
          <Flock spots={nine} />
          <Rock x={330} y={250} s={1.1} />
          <Sign x={312} y={180} kind="?" delay={1} color="#C9622B" />
          <NumberLine x0={60} x1={340} y={70} from={0} to={12} hi={[9, 12]} />
          <Jumps x0={60} x1={340} y={70} from={0} to={12} stops={[9, 10, 11, 12]} start={1.6} step={0.6} labels={["1", "2", "3"]} />
          <SumCard x={200} y={140} tokens={["9", "+", "?", "=", "12"]} start={0.6} step={0.2} size={22} hl={{ 2: "#E8513B" }} />
          <Place x={40} y={298} s={0.26} tap={TAP.hawi}>
            <Wolf mood="happy" />
          </Place>
        </Plateau>
      );
    // Three sheep peek out from the rock. 9 + 3 = 12. Hawi wags her tail.
    case 2:
      return (
        <Plateau id={id}>
          <Flock spots={nine} />
          {[0, 1, 2].map((i) => (
            <g key={i} className="tr-peek" style={vars({ "--delay": `${r1(0.8 + i * 0.5)}s` })}>
              <Sheep x={300 + i * 22} y={226 + (i % 2) * 14} s={0.42} />
            </g>
          ))}
          <Rock x={330} y={258} s={1.1} />
          <SumCard x={200} y={110} tokens={["9", "+", "3", "=", "12"]} start={2.4} hl={{ 2: "#E8513B" }} geezOf={12} />
          <Place x={40} y={298} s={0.28} tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
        </Plateau>
      );
    // Some at the stream, six more came, now fourteen. ? + 6 = 14: 6 up to 10, 10 up to 14.
    case 3:
      return (
        <Plateau id={id}>
          <path d="M-10 236 Q100 226 200 240 T410 232 L410 250 Q200 258 -10 252Z" fill="#7FC8F0" />
          <Flock spots={[[60, 232], [100, 240], [140, 232], [180, 240], [220, 232], [260, 240], [300, 232], [340, 240]]} s={0.36} />
          <NumberLine x0={64} x1={336} y={70} from={0} to={14} hi={[6, 10, 14]} />
          <Jumps x0={64} x1={336} y={70} from={0} to={14} stops={[6, 10, 14]} start={1.4} step={1} labels={["4", "4"]} />
          <SumCard x={200} y={146} tokens={["?", "+", "6", "=", "14"]} start={0.6} step={0.2} size={22} hl={{ 0: "#E8513B" }} />
          <Label x={200} y={194} text="4 + 4 = 8" size={24} color="#E8513B" delay={3.6} />
          <Place x={362} y={298} s={0.26} flip tap={TAP.hawi}>
            <Wolf mood="happy" />
          </Place>
        </Plateau>
      );
    // A hundred steps; sixty climbed. Count on in tens: 70, 80, 90, 100. Forty more.
    case 4:
      return (
        <Plateau id={id}>
          <path d="M60 300 Q140 250 200 230 T340 160" stroke="#C9A06A" strokeWidth={14} fill="none" strokeLinecap="round" />
          <path d="M60 300 Q140 250 200 230 T340 160" stroke="#E8C890" strokeWidth={4} strokeDasharray="2 10" fill="none" strokeLinecap="round" />
          <NumberLine x0={64} x1={336} y={66} from={0} to={100} tick={10} label={10} hi={[60, 100]} />
          <Jumps x0={64} x1={336} y={66} from={0} to={100} stops={[60, 70, 80, 90, 100]} start={1.2} step={0.6} labels={["10", "10", "10", "10"]} />
          <SumCard x={200} y={130} tokens={["60", "+", "40", "=", "100"]} start={3.8} hl={{ 2: "#E8513B" }} size={24} />
          <Place x={200} y={256} s={0.26} tap={TAP.hawi}>
            <Wolf mood="happy" />
          </Place>
          <Place x={150} y={284} s={0.3} tap={TAP.elder}>
            <Wolf elder mood="happy" />
          </Place>
        </Plateau>
      );
    // At the top: the plateau below, the sheep like little clouds. "My turn!"
    case 5:
      return (
        <Plateau id={id}>
          <g opacity={0.95}>
            {[[70, 230], [96, 236], [120, 228], [150, 238], [180, 230], [210, 240], [236, 232], [264, 238], [292, 230], [320, 236], [140, 252], [250, 254]].map(([x, y], i) => (
              <ellipse key={i} cx={x} cy={y} rx={9} ry={6} fill="#fff" className="lali-breathe" style={vars({ "--delay": `${-i * 0.3}s` })} />
            ))}
          </g>
          <Place x={140} y={180} s={0.3} tap={TAP.elder}>
            <Wolf elder mood="happy" />
          </Place>
          <Place x={250} y={182} s={0.3} flip className="tr-proud" tap={TAP.hawi}>
            <Wolf mood="joy" arm="wave" />
          </Place>
          <Sparkles x={250} y={100} r={30} delay={1.4} />
        </Plateau>
      );
    // Hawi's riddle: take away five and get ten. Put the five back: fifteen.
    case 6:
      return (
        <Plateau id={id}>
          <NumberLine x0={64} x1={336} y={70} from={0} to={15} hi={[10, 15]} />
          <Jumps x0={64} x1={336} y={70} from={0} to={15} stops={[10, 15]} start={2} step={1} labels={["+5"]} color="#2E9A5A" />
          <SumCard x={200} y={142} tokens={["?", "−", "5", "=", "10"]} start={0.6} step={0.2} size={24} hl={{ 0: "#E8513B" }} />
          <Label x={200} y={196} text="10 + 5 = 15" size={26} color="#2E9A5A" delay={3} />
          <Place x={80} y={296} s={0.34} tap={TAP.hawi}>
            <Wolf mood="joy" arm="wave" />
          </Place>
          <Place x={320} y={296} s={0.36} flip tap={TAP.elder}>
            <Wolf elder mood="joy" />
          </Place>
        </Plateau>
      );
    // Twenty goats, thirteen in the pen: count on from 13 to 20. Seven.
    case 7:
      return (
        <Plateau id={id}>
          <g transform="translate(200 248)">
            <path d="M-120 20 V-30 M120 20 V-30 M-120 -12 H120 M-120 6 H120" stroke="#8A5A36" strokeWidth={4} />
          </g>
          {Array.from({ length: 13 }, (_, i) => (
            <g key={i} transform={`translate(${r1(100 + (i % 7) * 32)} ${r1(254 + Math.floor(i / 7) * 18)}) scale(0.42)`}>
              <GoatShape color={i % 3 ? "#A8744A" : "#5A4034"} />
            </g>
          ))}
          <NumberLine x0={64} x1={336} y={66} from={10} to={20} hi={[13, 20]} />
          <Jumps x0={64} x1={336} y={66} from={10} to={20} stops={[13, 14, 15, 16, 17, 18, 19, 20]} start={1.2} step={0.4} labels={["1", "2", "3", "4", "5", "6", "7"]} />
          <SumCard x={200} y={140} tokens={["20", "−", "13", "=", "7"]} start={4.6} hl={{ 4: "#E8513B" }} size={24} />
          <Place x={360} y={298} s={0.26} flip tap={TAP.hawi}>
            <Wolf mood="happy" />
          </Place>
        </Plateau>
      );
    // {name}: eight and what make fifteen? Count on from eight: seven.
    case 8:
      return (
        <Plateau id={id}>
          <NumberLine x0={64} x1={336} y={70} from={5} to={15} hi={[8, 15]} />
          <Jumps x0={64} x1={336} y={70} from={5} to={15} stops={[8, 9, 10, 11, 12, 13, 14, 15]} start={1.2} step={0.45} labels={["1", "2", "3", "4", "5", "6", "7"]} />
          <SumCard x={200} y={146} tokens={["8", "+", "7", "=", "15"]} start={4.6} hl={{ 2: "#E8513B" }} geezOf={15} />
          <BeeHover x={330} y={220} s={1.2} flip />
          <Place x={80} y={296} s={0.34} tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
        </Plateau>
      );
    // Sundown, cold air; Grandpa wraps his gabi. Are all twelve here?
    case 9:
      return (
        <Plateau id={id} time="dusk">
          <Flock spots={[...nine.slice(0, 7), [256, 262], [290, 240], [300, 280], [330, 256], [60, 276]]} s={0.38} />
          <Place x={340} y={298} s={0.38} flip tap={TAP.elder}>
            <Wolf elder mood="happy" />
          </Place>
          <Sign x={300} y={150} kind="?" delay={1.2} color="#C9622B" />
        </Plateau>
      );
    // Through the gate: ten, then eleven, twelve. 10 + 2 = 12.
    case 10:
      return (
        <Plateau id={id} time="dusk">
          <g transform="translate(250 270)">
            <path d="M-80 0 V-50 M80 0 V-50 M-80 -36 H-20 M20 -36 H80 M-80 -18 H-20 M20 -18 H80" stroke="#7A4A26" strokeWidth={5} />
          </g>
          {Array.from({ length: 10 }, (_, i) => (
            <Sheep key={i} x={r1(214 + (i % 4) * 22)} y={r1(236 + Math.floor(i / 4) * 12)} s={0.3} />
          ))}
          {[0, 1].map((i) => (
            <g key={i} className="tr-in" style={vars({ "--delay": `${r1(1.4 + i * 0.9)}s` })}>
              <Sheep x={250} y={262} s={0.36} />
            </g>
          ))}
          <SumCard x={200} y={110} tokens={["10", "+", "2", "=", "12"]} start={3.4} hl={{ 4: "#E8513B" }} />
          <Place x={70} y={296} s={0.34} tap={TAP.hawi}>
            <Wolf mood="joy" arm="wave" />
          </Place>
        </Plateau>
      );
    // By the fire: "You found every hidden number." "Tomorrow, I'll ask the riddles!"
    case 11:
      return (
        <Plateau id={id} time="night">
          <Hearth x={200} y={262} pot={false} />
          <Place x={120} y={296} s={0.38} tap={TAP.elder}>
            <Wolf elder mood="happy" sleepy />
          </Place>
          <Place x={290} y={296} s={0.34} flip tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Sign x={290} y={170} kind="?" delay={1.6} color="#FFD233" />
          <g className="lali-pop-in" style={d(2)}>
            <Sparkles x={200} y={190} r={40} delay={2} />
          </g>
        </Plateau>
      );
    default:
      return null;
  }
}
