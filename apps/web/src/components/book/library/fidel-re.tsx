"use client";

import { useId, type CSSProperties, type ReactNode } from "react";

import { GuguShape } from "../../characters";
import { Tappable } from "../tappable";
import { Acacia, Air, BeeHover, Birds, Daisy, Depth, DriftCloud, Grass, LightRays, Mountains, Place, Sky, Sun, Tukul, Water } from "../scenery";
import { At, ChantRow, Glyph, INK, Notes, PicBubble, r1, SoundBubble, Sparkles, vars, Whoosh, WordCard, type FaceMood, Face } from "./fidel-kit";
import { SheepLetter } from "./fidel-se";
import "./fidel-re.css";

/*
  "Race to the River ረ": one living picture per page (13 pages).
  The ረ family are seven blue runners (the Fidel Train's letter shape, in running shoes) who
  wear their letter big and white: ረ ሩ ሪ ራ ሬ ር ሮ. Each has a headband of a different colour
  whose ends flap as they run. The race goes left to right, from the hilltop to the river.
  A running picture keeps the runners in place while the ground rushes past (fidel-re-scroll).
  ሱ, the sheep from "Seven Sheep for ሰ", visits at the end. Keyframes are fidel-re-* in ./fidel-re.css.
*/

const RE = ["ረ", "ሩ", "ሪ", "ራ", "ሬ", "ር", "ሮ"];
const BODY = "#2E86C1";
const BODY_DARK = "#226A9C";
const HEAD = "#CFEAFB";
const BAND = ["#E8413B", "#FFD233", "#3FB45A", "#FF8A1F", "#E2467F", "#9B5BD6", "#FFFFFF"];

type Pose = "stand" | "run" | "skip" | "wade" | "cheer";

/* ---------- the runners ---------- */

/** One runner wearing its letter; feet at (0, 0), about 80 tall. */
function Runner({ i, pose = "stand", mood = "happy", look = 0, delay = 0, flower = false, speed = 0.26 }: { i: number; pose?: Pose; mood?: FaceMood; look?: number; delay?: number; flower?: boolean; speed?: number }) {
  const running = pose === "run" || pose === "skip";
  const d = (k: number) => vars({ "--delay": `${r1(delay + k * speed)}s`, "--dur": `${speed}s` });
  const leg = (x: number, k: number) => (
    <g transform={`translate(${x} -12)`}>
      <g className={running ? "fidel-re-leg" : undefined} style={d(k)}>
        <path d="M0 0 V8" stroke={BODY_DARK} strokeWidth={6} strokeLinecap="round" />
        <ellipse cx={3} cy={10} rx={7} ry={3.8} fill="#fff" stroke={INK} strokeWidth={1.4} />
        <path d="M-1 9 h6" stroke={BAND[i] === "#FFFFFF" ? "#E8413B" : BAND[i]} strokeWidth={1.6} />
      </g>
    </g>
  );
  const arm = (x: number, k: number, up = false) => (
    <g transform={`translate(${x} -40)`}>
      <g className={running ? "fidel-re-arm" : pose === "wade" || pose === "cheer" ? "fidel-re-paddle" : undefined} style={d(k)}>
        <path d={up ? `M0 0 Q${x > 0 ? 8 : -8} -10 ${x > 0 ? 6 : -6} -20` : "M0 0 Q2 9 0 16"} stroke={BODY} strokeWidth={7} fill="none" strokeLinecap="round" />
        <circle cx={up ? (x > 0 ? 6 : -6) : 0} cy={up ? -22 : 18} r={4.4} fill={HEAD} />
      </g>
    </g>
  );
  const up = pose === "wade" || pose === "cheer";
  return (
    <g>
      <ellipse cx={0} cy={0} rx={17} ry={3.5} fill="#000" opacity={0.14} />
      {leg(-7, 0)}
      {leg(7, 1)}
      <g className={running ? "fidel-re-bob" : "lali-breathe"} style={vars({ "--delay": `${r1(delay)}s`, "--dur": `${r1(speed * 2)}s` })}>
        <g transform={running ? "rotate(8 0 -10)" : undefined}>
          {arm(-17, 1, up)}
          <rect x={-19} y={-50} width={38} height={42} rx={13} fill={BODY} />
          <rect x={-13} y={-46} width={14} height={5} rx={2.5} fill="#fff" opacity={0.3} />
          <Glyph g={RE[i]} x={0} y={-17} size={30} />
          {arm(17, 0, up)}
          {flower && (
            <g transform="translate(20 -60)">
              <path d="M0 14 V0" stroke="#3C9A4E" strokeWidth={2} />
              <g className="lali-sway" style={vars({ "--dur": "1.2s" })}>
                {[0, 72, 144, 216, 288].map((a) => (
                  <circle key={a} cx={r1(Math.cos((a * Math.PI) / 180) * 4)} cy={r1(Math.sin((a * Math.PI) / 180) * 4)} r={3.4} fill="#FF8FB1" />
                ))}
                <circle r={2.4} fill="#FFD233" />
              </g>
            </g>
          )}
          {/* head with its headband; the band's ends flap behind */}
          <g className="lali-tilt" style={vars({ "--tilt": look >= 0 ? "8deg" : "-8deg", "--delay": `${r1(delay * 3)}s`, "--dur": "5s" })}>
            <g transform="translate(-14 -70)">
              <g className={running ? "lali-wave" : "lali-sway"} style={vars({ "--dur": running ? "0.2s" : "2.4s" })}>
                <path d="M0 0 Q-9 -2 -14 4 L-12 7 Q-7 2 0 3Z M0 2 Q-8 6 -10 13 L-7 13 Q-6 7 0 4Z" fill={BAND[i]} stroke={BAND[i] === "#FFFFFF" ? "#C9CFDF" : "none"} strokeWidth={0.8} />
              </g>
            </g>
            <circle cx={0} cy={-63} r={15} fill={HEAD} />
            <circle cx={-6} cy={-69} r={4} fill="#fff" opacity={0.45} />
            <path d="M-14.6 -70 Q0 -78 14.6 -70 L14 -66 Q0 -73 -14 -66Z" fill={BAND[i]} stroke={BAND[i] === "#FFFFFF" ? "#C9CFDF" : "none"} strokeWidth={0.8} />
            <Face cx={0} cy={-60} s={0.95} mood={mood} look={look} delay={delay} />
          </g>
        </g>
      </g>
    </g>
  );
}

function Run({ i, x, y, s = 1, className, style, ...rest }: { i: number; x: number; y: number; s?: number; className?: string; style?: CSSProperties } & Omit<Parameters<typeof Runner>[0], "i">) {
  return (
    <At x={x} y={y} s={i === 5 ? s * 0.78 : s} className={className} style={style} reaction="bounce" sound="boing">
      <Runner i={i} {...rest} />
    </At>
  );
}

/** ሩ curled into a ball, rolling (its letter turns with it). */
function RollBall({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <At x={x} y={y} s={s} reaction="spin" sound="boing">
      <ellipse cx={0} cy={0} rx={20} ry={3.6} fill="#000" opacity={0.14} />
      <g transform="translate(0 -24)">
        <g className="fidel-re-roll" style={vars({ "--dur": "0.8s" })}>
          <circle r={24} fill={BODY} />
          <circle cx={-8} cy={-10} r={6} fill="#fff" opacity={0.25} />
          <circle cx={0} cy={-15} r={9} fill={HEAD} />
          <path d="M-9 -20 Q0 -25 9 -20" stroke={BAND[1]} strokeWidth={3} fill="none" />
          <Face cx={0} cy={-14} s={0.5} mood="joy" />
          <Glyph g="ሩ" x={0} y={16} size={22} />
          <circle cx={20} cy={8} r={4.4} fill={HEAD} />
          <circle cx={-20} cy={8} r={4.4} fill={HEAD} />
        </g>
      </g>
    </At>
  );
}

/** Dust kicked up behind a runner at (x, y). */
function Dust({ x, y, n = 3, delay = 0, color = "#E8D3A0" }: { x: number; y: number; n?: number; delay?: number; color?: string }) {
  return (
    <g fill={color}>
      {Array.from({ length: n }, (_, k) => (
        <circle key={k} cx={x - k * 6} cy={y - (k % 2) * 4} r={5 + (k % 2) * 2} className="fidel-re-puff" style={vars({ "--delay": `${r1(delay - k * 0.3)}s`, "--dur": "0.9s" })} />
      ))}
    </g>
  );
}

/** Roar lines from a wide-open mouth. */
function Roar({ x, y }: { x: number; y: number }) {
  return (
    <g stroke="#E8413B" strokeWidth={3} fill="none" strokeLinecap="round">
      {[0, 1, 2].map((k) => (
        <path key={k} d={`M${x + k * 9} ${y - 10 - k * 3} q8 ${10 + k * 3} 0 ${20 + k * 6}`} className="fidel-kit-glow" style={vars({ "--dur": "0.7s", "--delay": `${-k * 0.2}s`, "--lo": "0", "--hi": "1" })} />
      ))}
    </g>
  );
}

/** Water drops flying from a splash at (x, y). */
function Splash({ x, y, n = 7, big = false, delay = 0 }: { x: number; y: number; n?: number; big?: boolean; delay?: number }) {
  return (
    <g fill="#E3F6FF">
      {Array.from({ length: n }, (_, k) => {
        const dx = (k - (n - 1) / 2) * (big ? 16 : 8);
        return (
          <ellipse
            key={k}
            cx={x}
            cy={y}
            rx={big ? 5 : 3}
            ry={big ? 7 : 4.5}
            className="fidel-re-drop"
            style={vars({ "--dx": `${r1(dx)}px`, "--up": `${-(big ? 70 : 34) - (k % 3) * (big ? 16 : 8)}px`, "--delay": `${r1(delay - k * 0.17)}s`, "--dur": big ? "1.6s" : "1.1s" })}
          />
        );
      })}
    </g>
  );
}

/* ---------- the land ---------- */

function MorningSky({ id, sun = true }: { id: string; sun?: boolean }) {
  return (
    <>
      <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />
      {sun && <LightRays x={60} y={44} />}
      {sun && <Sun x={60} y={44} r={18} />}
      <DriftCloud y={52} s={0.6} dur={60} phase={0.5} />
      <DriftCloud y={30} s={0.4} dur={50} phase={0.1} />
    </>
  );
}

/** The hilltop where the family lives, with the river shining far down on the right. */
function HillTop({ id }: { id: string }) {
  return (
    <>
      <MorningSky id={id} />
      <Mountains y={14} />
      <Depth z={-0.3}>
        <path d="M-10 200 Q120 186 240 204 T410 214 L410 240 L-10 240Z" fill="#8FD39A" />
        <path d="M270 222 Q330 214 410 220 L410 236 Q340 232 270 234Z" fill="#5BB8E8" />
        <path d="M290 226 h30 M340 224 h26" stroke="#fff" strokeWidth={1.6} strokeLinecap="round" opacity={0.7} />
      </Depth>
      <path d="M-10 236 Q160 214 300 236 T410 244 L410 310 L-10 310Z" fill="#6CC983" />
      <path d="M-10 270 Q200 252 410 272 L410 310 L-10 310Z" fill="#E8D3A0" />
    </>
  );
}

/** Ground that rushes past: tufts, stones and flowers on a strip that loops. */
function RushingGround({ y = 268, dur = 1.6, flowers = false }: { y?: number; dur?: number; flowers?: boolean }) {
  const strip = (
    <g>
      <Grass y={y - 6} n={6} seed={21} x0={0} x1={400} />
      <g fill="#B9A58A">
        <ellipse cx={70} cy={y + 18} rx={9} ry={4} />
        <ellipse cx={260} cy={y + 24} rx={7} ry={3} />
        <ellipse cx={350} cy={y + 14} rx={5} ry={2.4} />
      </g>
      {flowers && [40, 190, 330].map((x, k) => <Daisy key={x} x={x} y={y + 2} h={18} delay={-k * 0.4} color={["#FFD233", "#FF8FB1", "#fff"][k]} />)}
    </g>
  );
  return (
    <g className="fidel-re-scroll" style={vars({ "--w": "400px", "--dur": `${dur}s` })}>
      {strip}
      <g transform="translate(400 0)">{strip}</g>
    </g>
  );
}

/** Mid-race: green hills scrolling slowly, the dusty track rushing. */
function RaceLand({ id }: { id: string }) {
  return (
    <>
      <MorningSky id={id} />
      <Mountains y={14} />
      <g className="fidel-re-scroll" style={vars({ "--w": "400px", "--dur": "16s" })}>
        {[0, 400].map((dx) => (
          <g key={dx} transform={`translate(${dx} 0)`}>
            <path d="M0 214 Q70 190 140 206 T280 200 T400 214 L400 250 L0 250Z" fill="#8FD39A" />
            <Acacia x={90} y={214} s={0.42} />
            <Tukul x={300} y={208} s={0.36} smoke={false} />
          </g>
        ))}
      </g>
      <path d="M-10 236 Q200 226 410 236 L410 310 L-10 310Z" fill="#6CC983" />
      <rect x={-10} y={258} width={420} height={60} fill="#E8D3A0" />
    </>
  );
}

/** The flag Lali waves at the start. */
function Flag({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 0 V-40" stroke="#7A5236" strokeWidth={2.4} strokeLinecap="round" />
      <g className="lali-wave" style={vars({ "--dur": "0.35s" })}>
        <path d="M0 -40 Q12 -44 24 -40 V-26 Q12 -30 0 -26Z" fill="#fff" stroke={INK} strokeWidth={1.4} />
        <path d="M0 -40 h6 v7 h-6Z M12 -40 h6 v7 h-6Z M6 -33 h6 v7 h-6Z M18 -33 h6 v7 h-6Z" fill={INK} />
      </g>
    </g>
  );
}

/** The river at the bottom of the picture: shallow, so the runners stand in it up to their knees. */
function River({ y = 236 }: { y?: number }) {
  return <Water y={y} h={70} color="#6CC4EE" deep="#3E98D0" />;
}

/** The near half of the water, drawn over the runners' legs. */
function WaterFront({ y }: { y: number }) {
  return (
    <g>
      <rect x={-10} y={y} width={420} height={310 - y} fill="#5BB4E4" opacity={0.85} />
      <path d={`M-10 ${y} ${Array(12).fill("q10 -3 20 0 q10 3 20 0").join(" ")}`} stroke="#fff" strokeOpacity={0.7} strokeWidth={2} fill="none" className="lali-ripple" />
    </g>
  );
}

function Front({ children }: { children?: ReactNode }) {
  return <Depth z={0.4}>{children}</Depth>;
}

/* ---------- the pages ---------- */

const LINE: [number, number] = [62, 268];
const lineX = (i: number) => LINE[0] + i * 46;

export default function FidelRe({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Seven brothers and sisters on the hilltop ask: "Who is the fastest?"
    case 0:
      return (
        <>
          <HillTop id={id} />
          <Tukul x={64} y={234} s={0.8} />
          {RE.map((_, i) => (
            <Run key={i} i={i} x={130 + i * 36} y={262 + (i % 2) * 14} s={0.86} pose={i % 3 === 0 ? "cheer" : "stand"} mood={i % 2 ? "joy" : "happy"} look={i < 3 ? 1 : -1} delay={-i * 0.3} />
          ))}
          <PicBubble x={214} y={176} w={60} h={40} dx={0} delay={0.8}>
            <g transform="translate(-10 0)">
              <Glyph g="?" size={26} y={9} fill="#E8413B" />
            </g>
            <g transform="translate(12 2) scale(0.9)">
              {/* a little trophy */}
              <path d="M-8 -12 h16 v6 q0 9 -8 11 q-8 -2 -8 -11Z" fill="#FFC83D" stroke="#B8860B" strokeWidth={1.2} />
              <path d="M-3 5 h6 v4 h4 v3 h-14 v-3 h4Z" fill="#FFC83D" stroke="#B8860B" strokeWidth={1.2} />
            </g>
          </PicBubble>
          <Front>
            <Daisy x={24} y={300} h={24} />
            <Daisy x={380} y={298} h={22} color="#FF8FB1" delay={-1} />
          </Front>
          <Air kind="day" seed={2} grass={false} />
        </>
      );
    // Gugu draws a line in the dust: "A race to the river! Everybody on the line!"
    case 1:
      return (
        <>
          <HillTop id={id} />
          {/* the start line, drawn as the page opens */}
          <g className="lali-fade-in" style={vars({ "--delay": "1.2s", "--dur": "1.4s" })}>
            <path d="M40 286 Q200 278 360 288" stroke="#fff" strokeWidth={4} strokeDasharray="10 7" fill="none" strokeLinecap="round" />
          </g>
          <Dust x={150} y={284} n={3} delay={0.2} />
          <Place x={110} y={286} s={0.42} tap={{ reaction: "wiggle", sound: "boing" }}>
            <GuguShape pose="point" mood="joy" />
          </Place>
          {/* the finish flag, far away by the river */}
          <g transform="translate(330 222) scale(0.6)">
            <Flag x={0} y={0} />
          </g>
          {RE.map((_, i) => (
            <Run key={i} i={i} x={190 + i * 28} y={240 + (i % 2) * 10} s={0.62} pose="cheer" mood="joy" look={-1} delay={-i * 0.25} className="lali-hop" style={vars({ "--delay": `${r1(-i * 0.2)}s`, "--dur": "0.9s" })} />
          ))}
          <Air kind="day" seed={3} grass={false} />
        </>
      );
    // Toes on the line. ረ "ra", ሩ "ru", ሪ "ri".
    case 2:
    case 3: {
      const talking = page === 2 ? [0, 1, 2] : [3, 4, 5, 6];
      return (
        <>
          <HillTop id={id} />
          <path d="M30 272 Q200 264 370 274" stroke="#fff" strokeWidth={4} strokeDasharray="10 7" fill="none" strokeLinecap="round" />
          {RE.map((_, i) => (
            <Run key={i} i={i} x={lineX(i)} y={LINE[1]} s={1} pose="stand" mood={talking.includes(i) ? "joy" : "happy"} look={talking.includes(i) ? 0 : 1} delay={-i * 0.3} />
          ))}
          {talking.map((i, k) => (
            <SoundBubble key={i} x={lineX(i) + (i === 6 ? -4 : 0)} y={176 + (i === 5 ? 18 : 0)} g={RE[i]} side="up" delay={0.8 + k * 0.8} color={BODY_DARK} size={i === 5 ? 0.8 : 1} quiet={i === 5} />
          ))}
          {page === 3 && <Roar x={lineX(3) + 14} y={216} />}
          <Air kind="day" seed={4 + page} grass={false} />
        </>
      );
    }
    // Lali waves the flag: "One, two, three… run, run, run!" Off they go!
    case 4:
      return (
        <>
          <HillTop id={id} />
          <path d="M30 272 Q200 264 370 274" stroke="#fff" strokeWidth={4} strokeDasharray="10 7" fill="none" strokeLinecap="round" opacity={0.6} />
          {RE.map((_, i) => (
            <g key={i}>
              <Dust x={lineX(i) + 70 - 14} y={276 - (i % 2) * 6} delay={1.2 + i * 0.1} />
              <Run i={i} x={lineX(i) + 70} y={276 - (i % 2) * 6} s={0.9} pose="run" mood="joy" look={2} delay={-i * 0.13} className="fidel-re-dash" style={vars({ "--fx": "-70px", "--delay": `${r1(1 + i * 0.08)}s` })} />
            </g>
          ))}
          <g transform="translate(46 150)">
            <BeeHover x={0} y={0} s={1.2} />
            <Flag x={22} y={14} />
          </g>
          <g className="lali-pop-in" style={vars({ "--delay": "0.3s" })}>
            <text x={140} y={120} fontSize={30} fontFamily="var(--font-grandstander)" fontWeight={900} fill="#2E86C1" textAnchor="middle">1</text>
          </g>
          <g className="lali-pop-in" style={vars({ "--delay": "0.6s" })}>
            <text x={200} y={110} fontSize={34} fontFamily="var(--font-grandstander)" fontWeight={900} fill="#3FB45A" textAnchor="middle">2</text>
          </g>
          <g className="lali-pop-in" style={vars({ "--delay": "0.9s" })}>
            <text x={262} y={100} fontSize={38} fontFamily="var(--font-grandstander)" fontWeight={900} fill="#E8413B" textAnchor="middle">3</text>
          </g>
          <Air kind="day" seed={6} grass={false} />
        </>
      );
    // ረ races ahead, ሩ rolls like a ball, ሪ skips, ራ roars, and the birds fly away!
    case 5:
      return (
        <>
          <RaceLand id={id} />
          <Birds y={110} dur={5} phase={0.2} n={4} />
          <Birds y={80} dur={6} phase={0.7} n={3} />
          <RushingGround />
          <Run i={0} x={318} y={272} pose="run" mood="joy" look={2} />
          <Whoosh x={294} y={236} color="#fff" />
          <Dust x={304} y={272} />
          <RollBall x={246} y={278} />
          <Dust x={226} y={276} />
          <g className="lali-hop" style={vars({ "--dur": "0.6s" })}>
            <Run i={2} x={178} y={270} pose="skip" mood="joy" look={2} speed={0.3} />
          </g>
          <Run i={3} x={102} y={276} pose="run" mood="joy" look={2} delay={-0.1} />
          <Roar x={118} y={214} />
          <Air kind="day" seed={7} grass={false} />
        </>
      );
    // ሬ hops over stones, little ር runs, rrr, and ሮ stops to smell every flower.
    case 6:
      return (
        <>
          <RaceLand id={id} />
          <RushingGround flowers />
          {/* stones in the track, rushing past */}
          <g className="fidel-re-scroll" style={vars({ "--w": "200px", "--dur": "0.8s" })}>
            {[0, 200, 400].map((dx) => (
              <ellipse key={dx} cx={dx + 290} cy={282} rx={12} ry={7} fill="#9C98A6" />
            ))}
          </g>
          <g className="lali-hop" style={vars({ "--dur": "0.8s" })}>
            <Run i={4} x={302} y={274} pose="skip" mood="joy" look={2} speed={0.3} />
          </g>
          <Run i={5} x={220} y={278} pose="run" mood="joy" look={2} speed={0.14} />
          <Dust x={206} y={278} n={4} />
          <Whoosh x={208} y={246} color="#fff" n={2} />
          {/* ሮ, far behind, sniffing a flower */}
          <Run i={6} x={92} y={276} pose="stand" mood="sleepy" look={2} flower />
          <Notes x={118} y={190} delay={0.6} color="#E2467F" />
          <Air kind="day" seed={8} grass={false} />
        </>
      );
    // Up the last hill. Oh no! ረ trips on a root. Bump! ሩ into ረ. Bump! ሪ into ሩ…
    case 7:
      return (
        <>
          <MorningSky id={id} />
          <Mountains y={14} />
          <path d="M-10 300 L-10 250 Q160 196 330 160 Q370 152 410 156 L410 300Z" fill="#6CC983" />
          <path d="M-10 300 L-10 274 Q160 222 330 186 Q370 178 410 182 L410 300Z" fill="#E8D3A0" />
          {/* the root across the path */}
          <Tappable reaction="wiggle" sound="pop">
            <path d="M300 196 Q312 180 326 192 Q336 200 352 186" stroke="#7A5236" strokeWidth={6} fill="none" strokeLinecap="round" />
          </Tappable>
          <Grass y={190} n={4} x0={340} x1={400} seed={30} />
          <g transform="rotate(-14 260 210)">
            <Run i={2} x={210} y={236} s={0.95} mood="wow" look={2} className="fidel-re-bump" style={vars({ "--fx": "-50px", "--delay": "1.3s" })} />
            <Run i={1} x={254} y={222} s={0.95} mood="wow" look={2} className="fidel-re-bump" style={vars({ "--fx": "-46px", "--delay": "0.9s" })} />
            <g className="fidel-re-trip" style={vars({ "--delay": "0.4s" })}>
              <Run i={0} x={300} y={208} s={0.95} mood="wow" look={2} />
            </g>
          </g>
          {/* bump stars */}
          <Sparkles seed={3} spots={[[282, 152], [238, 168], [196, 186]]} color="#FFD233" s={1.4} />
          {[3, 4, 5, 6].map((i, k) => (
            <Run key={i} i={i} x={150 - k * 34} y={262 + k * 8} s={0.8} pose="run" mood="joy" look={2} delay={-k * 0.1} />
          ))}
          <Air kind="day" seed={9} grass={false} />
        </>
      );
    // Down the other side they tumble, all seven in one big giggling ball, right to the river…
    case 8:
      return (
        <>
          <MorningSky id={id} />
          <Mountains y={14} />
          <path d="M-10 120 Q80 130 180 190 Q240 226 300 238 L410 240 L410 300 L-10 300Z" fill="#6CC983" />
          <River y={244} />
          <g className="fidel-re-tumble" style={vars({ "--fx": "-190px", "--fy": "-100px" })}>
            <At x={250} y={204} s={1} reaction="spin" sound="giggle">
              <g className="fidel-re-roll" style={vars({ "--dur": "1.4s" })}>
                <circle r={34} fill={BODY_DARK} opacity={0.35} />
                {RE.map((_, i) => (
                  <g key={i} transform={`rotate(${r1((i * 360) / 7)}) translate(0 -2) scale(0.56)`}>
                    <Runner i={i} pose="cheer" mood="laugh" />
                  </g>
                ))}
              </g>
            </At>
          </g>
          <g stroke="#fff" strokeWidth={3} strokeLinecap="round" opacity={0.8}>
            <path d="M176 150 q-20 -6 -30 -20 M190 140 q-14 -10 -18 -26" fill="none" className="fidel-kit-glow" style={vars({ "--dur": "0.6s", "--lo": "0.1", "--hi": "1" })} />
          </g>
          <Dust x={196} y={212} n={4} />
          <Air kind="day" seed={10} grass={false} />
        </>
      );
    // SPLASH! Everybody lands in the river at the same time. Even ሮ, still holding a flower.
    case 9:
      return (
        <>
          <MorningSky id={id} />
          <Mountains y={14} />
          <path d="M-10 214 Q100 196 220 208 T410 206 L410 240 L-10 240Z" fill="#6CC983" />
          <River y={228} />
          {RE.map((_, i) => (
            <Run key={i} i={i} x={70 + i * 44} y={274 - (i % 2) * 8} s={0.92} pose="wade" mood={i === 6 ? "happy" : "laugh"} flower={i === 6} delay={-i * 0.2} className="lali-rise-in" style={vars({ "--fy": "-60px", "--delay": `${r1(0.3 + (i % 3) * 0.08)}s`, "--dur": "0.7s" })} />
          ))}
          <WaterFront y={262} />
          <Splash x={200} y={250} n={9} big />
          <Splash x={90} y={262} n={5} delay={-0.4} />
          <Splash x={310} y={258} n={5} delay={-0.8} />
          <Air kind="day" seed={11} grass={false} />
        </>
      );
    // They splash and float, Gugu jumps in, and they sing: ረ ሩ ሪ ራ ሬ ር ሮ!
    case 10:
      return (
        <>
          <MorningSky id={id} sun={false} />
          <Mountains y={14} />
          <path d="M-10 214 Q100 196 220 208 T410 206 L410 240 L-10 240Z" fill="#6CC983" />
          <River y={228} />
          <ChantRow letters={RE} color={BODY_DARK} y={64} x0={66} x1={334} size={30} start={0.8} step={0.5} bg="#F2FBFF" />
          {RE.map((_, i) => (
            <g key={i}>
              <Run i={i} x={52 + i * 40} y={278 - (i % 2) * 8} s={0.82} pose="wade" mood="laugh" delay={-i * 0.2} className="fidel-kit-karaoke" style={vars({ "--delay": `${r1(0.8 + i * 0.5)}s`, "--dur": `${r1(7 * 0.5 + 2.4)}s` })} />
              <Splash x={52 + i * 40} y={270} n={3} delay={-i * 0.3} />
            </g>
          ))}
          <Place x={348} y={276} s={0.36} tap={{ reaction: "wiggle", sound: "boing" }}>
            <GuguShape pose="hop" mood="joy" />
          </Place>
          <WaterFront y={266} />
          <Splash x={348} y={266} n={7} big delay={-0.5} />
          <Air kind="day" seed={12} grass={false} />
        </>
      );
    // Lali: "So, who won the race?" Who won? Nobody can remember!
    case 11:
      return (
        <>
          <MorningSky id={id} sun={false} />
          <Mountains y={14} />
          <path d="M-10 214 Q100 196 220 208 T410 206 L410 240 L-10 240Z" fill="#6CC983" />
          <River y={228} />
          {RE.map((_, i) => (
            <g key={i}>
              <Run i={i} x={60 + i * 44} y={276 - (i % 2) * 8} s={0.88} pose="stand" mood={i % 2 ? "wow" : "worried"} look={i < 3 ? 2 : -2} delay={-i * 0.3} />
              <g className="lali-pop-in" style={vars({ "--delay": `${r1(1.4 + ((i * 3) % 7) * 0.15)}s` })}>
                <text x={60 + i * 44} y={176 - (i % 2) * 8} fontSize={22} fontFamily="var(--font-grandstander)" fontWeight={900} fill="#fff" stroke={BODY_DARK} strokeWidth={3} paintOrder="stroke" textAnchor="middle">
                  ?
                </text>
              </g>
            </g>
          ))}
          <WaterFront y={262} />
          <BeeHover x={200} y={84} s={1.3} />
          <PicBubble x={222} y={66} w={56} h={38} dx={34} delay={0.6}>
            <g transform="translate(-10 0)">
              <path d="M-8 -12 h16 v6 q0 9 -8 11 q-8 -2 -8 -11Z" fill="#FFC83D" stroke="#B8860B" strokeWidth={1.2} />
              <path d="M-3 5 h6 v4 h4 v3 h-14 v-3 h4Z" fill="#FFC83D" stroke="#B8860B" strokeWidth={1.2} />
            </g>
            <Glyph g="?" x={12} y={9} size={24} fill="#E8413B" />
          </PicBubble>
          <Air kind="day" seed={13} grass={false} />
        </>
      );
    // ሱ on the bank, ረ beside him: ረሱ, "they forgot!" Everybody laughs.
    default:
      return (
        <>
          <MorningSky id={id} />
          <Mountains y={14} />
          <path d="M-10 196 Q100 182 220 192 T410 190 L410 300 L-10 300Z" fill="#6CC983" />
          <Water y={240} h={70} color="#6CC4EE" deep="#3E98D0" />
          <WordCard x={200} y={76} parts={[{ g: "ረ", color: BODY_DARK }, { g: "ሱ", color: "#3A2E2A" }]} size={60} delay={1.6} />
          <Run i={0} x={150} y={236} s={1.35} pose="cheer" mood="laugh" look={2} className="lali-move-in" style={vars({ "--fx": "-60px", "--fy": "30px", "--dur": "1s", "--delay": "0.3s" })} />
          <At x={252} y={236} s={1.3} reaction="bounce" sound="baa">
            <SheepLetter i={1} mood="joy" look={-2} />
          </At>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Run key={i} i={i} x={[40, 84, 320, 360, 120, 290][i - 1]} y={[284, 292, 286, 292, 296, 298][i - 1]} s={0.62} pose="wade" mood="laugh" delay={-i * 0.2} />
          ))}
          <Sparkles seed={9} spots={[[90, 60], [312, 56], [200, 18]]} />
          <Air kind="day" seed={14} grass={false} />
        </>
      );
  }
}
