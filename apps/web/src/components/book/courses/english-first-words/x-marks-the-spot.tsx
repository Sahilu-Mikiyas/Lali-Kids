"use client";

import "./x-marks-the-spot.css";

import { useId } from "react";

import { Air, BeeFlight, BeeHover, Daisy, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Cub, FONT, Grandma, TAP, Wolf } from "./cast";
import { Home, Yard } from "./places";
import { Hearts, LetterCard, SayBubble, Sign, Sparkles, WordCard } from "./props";
import { Thing } from "./things";

/*
  "X Marks the Spot": one living picture per page (12 pages). Grandma's treasure map (a tukul at
  one end, a zigzag path, yellow flowers, a stone and a red X) is drawn by <TreasureMap>; on the
  "upside down" page it turns round. Outside: the zigzag path, a hill of yellow adey abeba, the
  big stone with the box under it. Each letter gets its tile, and its words their cards.
  Keyframes: ./kit.css (efw-*) and ./x-marks-the-spot.css (xm-*).
*/

const GOLD = "#C99A00";

/** Grandma's map, centred on (x, y); `turn` spins it round the right way. */
function TreasureMap({ x, y, s = 1, flipped = false, turn = false }: { x: number; y: number; s?: number; flipped?: boolean; turn?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className={turn ? "xm-turn" : undefined} style={flipped && !turn ? { transform: "rotate(180deg)", transformBox: "fill-box", transformOrigin: "center" } : undefined}>
        <Tappable reaction="wiggle" sound="pop">
          <path d="M-60 -44 L-20 -50 L20 -44 L60 -50 V44 L20 50 L-20 44 L-60 50Z" fill="#F5E6C0" stroke="#C9B48A" strokeWidth={2} />
          <path d="M-36 30 l8 -10 l8 10Z M-34 30 v6 h12 v-6" fill="#C98A4A" />
          <path d="M-28 22 L-10 6 L-24 -6 L-6 -20 L-20 -30" stroke="#2F6FD0" strokeWidth={2.4} strokeDasharray="3 3" fill="none" />
          <g fill="#FFD233">
            <circle cx={14} cy={-26} r={4} />
            <circle cx={24} cy={-22} r={4} />
            <circle cx={20} cy={-32} r={4} />
          </g>
          <ellipse cx={34} cy={-6} rx={8} ry={6} fill="#9C98A6" />
          <path d="M40 0 L50 10 M50 0 L40 10" stroke="#E2463F" strokeWidth={4} strokeLinecap="round" />
        </Tappable>
      </g>
    </g>
  );
}

/** The zigzag path up the hill. */
function Zigzag({ glow = false }: { glow?: boolean }) {
  return (
    <path
      d="M40 290 L120 262 L60 242 L150 222 L100 206 L190 192"
      stroke={glow ? "#FFF3C0" : "#D9B07A"}
      strokeWidth={glow ? 14 : 16}
      fill="none"
      strokeLinejoin="round"
      strokeLinecap="round"
      className={glow ? "xm-glow" : undefined}
    />
  );
}

/** A hill of yellow adey abeba. */
function Flowers({ x = 300, y = 236 }: { x?: number; y?: number }) {
  const spots: [number, number][] = [
    [-50, 4],
    [-30, -8],
    [-10, 2],
    [10, -10],
    [30, 0],
    [50, -6],
    [-40, 14],
    [0, 14],
    [40, 14],
  ];
  return (
    <g transform={`translate(${x} ${y})`}>
      {spots.map(([dx, dy], i) => (
        <Daisy key={i} x={dx} y={dy} h={18} s={0.9} delay={i * 0.2} />
      ))}
    </g>
  );
}

/** The big stone (and, when rolled away, the box under it). */
function Stone({ x, y, rolled = false, open = false }: { x: number; y: number; rolled?: boolean; open?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {rolled && (
        <g>
          <g transform="translate(0 -6)">
            <Tappable reaction="bounce" sound="chime">
              <Thing id="box" s={0.7} />
            </Tappable>
          </g>
          {open && <Sparkles x={0} y={-20} r={36} delay={0.4} n={7} />}
        </g>
      )}
      <g className={rolled ? "xm-roll" : undefined}>
        <Tappable reaction="wiggle" sound="pop">
          <path d="M-34 10 Q-38 -18 -12 -26 Q20 -30 34 -10 Q40 8 26 12Z" fill="#9C98A6" />
          <ellipse cx={-12} cy={-12} rx={8} ry={5} fill="#fff" opacity={0.25} />
        </Tappable>
      </g>
    </g>
  );
}

/** A paper crown, on a head or in the box. */
function Crown({ color = "#FFD233", s = 1 }: { color?: string; s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <path d="M-20 0 L-24 -20 L-12 -10 L0 -24 L12 -10 L24 -20 L20 0Z" fill={color} stroke="#C9A82A" strokeWidth={1.6} />
      <circle cx={0} cy={-16} r={2.6} fill="#E2463F" />
    </g>
  );
}

function Friends({ x = 150, mood = "happy" as "happy" | "joy" | "wow" | "worried" | "sad", crowns = false, className }: { x?: number; mood?: "happy" | "joy" | "wow" | "worried" | "sad"; crowns?: boolean; className?: string }) {
  return (
    <g className={className}>
      <Place x={x} y={294} s={0.42} tap={TAP.cub}>
        <Cub mood={mood} />
        {crowns && (
          <g transform="translate(100 46)">
            <Crown />
          </g>
        )}
      </Place>
      <Place x={x + 60} y={292} s={0.4} tap={TAP.hawi}>
        <Wolf mood={mood} wag={mood === "joy"} />
        {crowns && (
          <g transform="translate(100 56)">
            <Crown color="#F7A8C8" />
          </g>
        )}
      </Place>
    </g>
  );
}

export default function XMarksTheSpot({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Grandma's map: "X marks the spot!"
    case 0:
      return (
        <g>
          <Home id={id} time="morning" door="open">
            <Place x={300} y={292} s={0.5} flip tap={TAP.grandma}>
              <Grandma mood="joy" arm="hold" />
            </Place>
            <TreasureMap x={200} y={120} s={1.4} />
            <Friends x={130} mood="wow" />
            <SayBubble x={300} y={80} lines={["X marks the spot!"]} size={13} tail="down" delay={1} color="#E2463F" />
          </Home>
        </g>
      );
    // Lali: "X likes the END of words: bo-x, fo-x, si-x."
    case 1:
      return (
        <g>
          <Yard id={id} time="morning" house={false}>
            <TreasureMap x={120} y={150} s={1.4} />
            <BeeHover x={170} y={152} s={0.9} />
            <LetterCard x={300} y={60} letter="x" color="#E2463F" delay={0.6} say />
            <WordCard x={250} y={140} word="box" pic="box" color="#E2463F" size={12} delay={1.2} />
            <WordCard x={330} y={140} word="fox" pic="fox" color="#E2463F" size={12} delay={1.6} />
            <WordCard x={290} y={226} word="six" color="#E2463F" size={16} delay={2} />
            <Friends x={60} />
          </Yard>
          <Air kind="day" seed={2} />
        </g>
      );
    // The zigzag path. ‘z’ is Lali's sound: zzzz!
    case 2:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Zigzag />
            <BeeFlight path="M40 250 L120 222 L60 202 L150 182 L100 166 L190 152" dur={4} s={1.1} rest={[150, 182]} trailColor="#FFFDF6" />
            <Place x={190} y={196} s={0.26} tap={TAP.cub}>
              <Cub mood="joy" />
            </Place>
            <Place x={150} y={222} s={0.26} tap={TAP.hawi}>
              <Wolf mood="joy" />
            </Place>
            <LetterCard x={300} y={70} letter="z" color={GOLD} delay={0.6} say />
            <WordCard x={300} y={150} word="zigzag" color={GOLD} size={16} delay={1.4} />
            <SayBubble x={110} y={100} lines={["Zzzz!"]} size={16} tail="down" delay={2} />
          </Yard>
          <Air kind="day" seed={3} />
        </g>
      );
    // The yellow flowers. ‘y’ for yellow.
    case 3:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Flowers x={260} y={238} />
            <Flowers x={330} y={250} />
            <Friends x={90} mood="joy" />
            <LetterCard x={90} y={70} letter="y" color={GOLD} delay={0.6} say />
            <WordCard x={250} y={110} word="yellow" color={GOLD} size={18} delay={1.4} />
          </Yard>
          <Air kind="day" seed={4} />
        </g>
      );
    // Six big steps: si-x, with an X at the end. They start to dig.
    case 4:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Flowers x={330} y={240} />
            {[0, 1, 2, 3, 4, 5].map((k) => (
              <g key={k} transform={`translate(${60 + k * 40} 278)`}>
                <g className="lali-pop-in" style={vars({ "--delay": `${0.3 + k * 0.3}s` })}>
                  <ellipse cx={0} cy={0} rx={10} ry={5} fill="#B8803E" opacity={0.6} />
                  <text y={-10} fontSize={12} fontFamily={FONT} fontWeight={900} fill="#7A4E26" textAnchor="middle">
                    {k + 1}
                  </text>
                </g>
              </g>
            ))}
            <Place x={290} y={292} s={0.42} className="lali-hop" tap={TAP.cub}>
              <Cub mood="joy" arm="up" />
            </Place>
            <WordCard x={200} y={90} word="six" color="#E2463F" size={20} delay={2.2} />
          </Yard>
          <Air kind="day" seed={5} />
        </g>
      );
    // Dig and dig: a stone, a root, a sleepy beetle. No treasure.
    case 5:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <ellipse cx={200} cy={274} rx={50} ry={12} fill="#8A5A3A" />
            <g className="xm-dirt" fill="#A8743E">
              <circle cx={170} cy={250} r={5} />
              <circle cx={230} cy={244} r={4} />
              <circle cx={200} cy={236} r={6} />
            </g>
            <g transform="translate(250 270)">
              <Thing id="insect" s={0.3} />
            </g>
            <Friends x={110} mood="sad" />
            <Sign x={200} y={180} kind="?" delay={1} />
          </Yard>
          <Air kind="day" seed={6} />
        </g>
      );
    // The house on the map is at the bottom… but Grandma's house is up the hill!
    case 6:
      return (
        <g>
          <Yard id={id} time="day">
            <TreasureMap x={140} y={130} s={1.3} />
            <path d="M210 120 Q280 100 320 170" stroke="#FFFDF6" strokeWidth={3} strokeDasharray="2 7" fill="none" strokeLinecap="round" />
            <Place x={130} y={294} s={0.46} tap={TAP.cub}>
              <Cub mood="wow" look={3} />
            </Place>
            <Sign x={250} y={90} kind="!" delay={1.6} color="#F5B21E" />
          </Yard>
          <Air kind="day" seed={7} />
        </g>
      );
    // Upside down! Turned the right way: the X is by the big stone. Yes!
    case 7:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <TreasureMap x={140} y={130} s={1.3} turn />
            <Flowers x={300} y={242} />
            <Stone x={250} y={262} />
            <Friends x={70} mood="joy" />
            <WordCard x={320} y={90} word="yes" color={GOLD} size={18} delay={2.4} />
          </Yard>
          <Air kind="day" seed={8} />
        </g>
      );
    // Under the stone: a box! Bo-x!
    case 8:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Flowers x={320} y={242} />
            <Stone x={220} y={262} rolled open />
            <Friends x={90} mood="joy" />
            <WordCard x={220} y={110} word="box" pic="box" color="#E2463F" size={16} delay={1.6} />
          </Yard>
          <Air kind="day" seed={9} />
        </g>
      );
    // Two paper crowns: ‘qu’, ‘qu’, QUEEN! Q always walks with U.
    case 9:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Stone x={220} y={262} rolled />
            <Friends x={110} mood="joy" crowns />
            <LetterCard x={300} y={64} letter="q" color="#8E5BE0" delay={0.6} say />
            <g transform="translate(300 124)">
              <g className="lali-pop-in" style={vars({ "--delay": "1.2s" })}>
                <rect x={-30} y={-16} width={60} height={30} rx={8} fill="#FFFDF6" stroke="#8E5BE0" strokeWidth={2.4} />
                <text y={8} fontSize={22} fontFamily="var(--font-andika), sans-serif" fontWeight={700} fill="#8E5BE0" textAnchor="middle">
                  qu
                </text>
              </g>
            </g>
            <WordCard x={300} y={200} word="queen" pic="queen" color="#8E5BE0" size={14} delay={1.8} />
          </Yard>
          <Air kind="day" seed={10} />
        </g>
      );
    // Warm kolo: ‘y’ for yummy! Home along the zigzag path.
    case 10:
      return (
        <g>
          <Yard id={id} time="evening">
            <Zigzag />
            <Friends x={120} mood="joy" crowns className="xm-march" />
            <g transform="translate(260 262)">
              <Thing id="kolo" s={0.6} />
            </g>
            <WordCard x={290} y={100} word="yummy" color={GOLD} size={18} delay={1} />
            <Hearts spots={[[180, 196, 1.4], [200, 186, 2]]} />
          </Yard>
          <Air kind="dusk" seed={11} />
        </g>
      );
    // X for box, Y for yellow, Z for zigzag, Q for queen!
    default:
      return (
        <g>
          <Home id={id} time="evening" shelf={false}>
            <Place x={330} y={292} s={0.46} flip tap={TAP.grandma}>
              <Grandma mood="joy" arm="clap" />
            </Place>
            <Friends x={150} mood="joy" crowns />
            {(["x", "y", "z", "q"] as const).map((l, i) => (
              <g key={l}>
                <LetterCard x={70 + i * 86} y={56} letter={l} color={["#E2463F", GOLD, GOLD, "#8E5BE0"][i]} s={0.72} delay={0.4 + i * 0.4} />
                <WordCard x={70 + i * 86} y={110} word={["box", "yellow", "zigzag", "queen"][i]} color={["#E2463F", GOLD, GOLD, "#8E5BE0"][i]} size={11} delay={0.6 + i * 0.4} />
              </g>
            ))}
          </Home>
        </g>
      );
  }
}
