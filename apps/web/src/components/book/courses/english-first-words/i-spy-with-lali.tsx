"use client";

import "./i-spy-with-lali.css";

import { useId } from "react";

import { Glow } from "../../glow";
import { BeeHover, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Cat, Cub, Grandma, Gugu, TAP, Tsehay } from "./cast";
import { Home } from "./places";
import { Hearts, LetterCard, SayBubble, Sign, Sparkles, WordCard } from "./props";
import { Thing } from "./things";

/*
  "I Spy with Lali": one living picture per page (12 pages), all inside Grandma's round house on a
  rainy kiremt day. The room holds everything the game finds: the fruit bowl (avocado, banana),
  Dimmet the cat asleep on the chair, the door, and the egg in its little basket up on the shelf.
  Each page's sound is on a letter card, and a magnifying glass finds the thing.
  Keyframes: ./kit.css (efw-*) and ./i-spy-with-lali.css (isl-*).
*/

/** Where the things in the room are. */
const SPOT = { bowl: [118, 244], chair: [330, 246], door: [96, 236], egg: [212, 112] } as const;

/** The room's things: a low table with the fruit bowl, the chair with Dimmet, the shelf with the egg basket. */
function Room({ cat = true, catAwake = false, egg = true }: { cat?: boolean; catAwake?: boolean; egg?: boolean }) {
  return (
    <g>
      {/* the shelf and the egg basket */}
      <g transform={`translate(${SPOT.egg[0]} ${SPOT.egg[1]})`}>
        <rect x={-50} y={10} width={100} height={6} rx={2} fill="#8A5A3A" />
        <g transform="translate(-30 4) scale(0.32)">
          <Thing id="jug" />
        </g>
        {egg && (
          <Tappable reaction="wiggle" sound="pop">
            <path d="M-12 10 L-14 -2 H14 L12 10Z" fill="#D9A04A" />
            <path d="M-13 3 H13" stroke="#E2463F" strokeWidth={1.6} />
            <ellipse cx={0} cy={-6} rx={7} ry={9} fill="#C98A5A" stroke="#7A4A26" strokeWidth={1} />
          </Tappable>
        )}
        <g transform="translate(32 0) scale(0.3)">
          <Thing id="cup" />
        </g>
      </g>
      {/* the low table and the fruit bowl */}
      <g transform={`translate(${SPOT.bowl[0]} ${SPOT.bowl[1]})`}>
        <rect x={-40} y={6} width={80} height={8} rx={3} fill="#9C6A3A" />
        <path d="M-32 14 V34 M32 14 V34" stroke="#7A4A26" strokeWidth={5} strokeLinecap="round" />
        <Tappable reaction="wiggle" sound="pop">
          <path d="M-30 -4 Q0 22 30 -4Z" fill="#E2463F" />
          <g transform="translate(-12 -12) scale(0.32) rotate(-20)">
            <Thing id="avocado" />
          </g>
          <g transform="translate(12 -12) scale(0.34)">
            <Thing id="banana" />
          </g>
        </Tappable>
      </g>
      {/* the chair, with Dimmet the cat */}
      <g transform={`translate(${SPOT.chair[0]} ${SPOT.chair[1]})`}>
        <Thing id="chair" s={1.1} />
        {cat && (
          <g transform="translate(-6 -4)">
            <Tappable reaction="spin" sound="pop">
              <Cat sleep={!catAwake} mood={catAwake ? "wow" : "happy"} />
            </Tappable>
          </g>
        )}
      </g>
    </g>
  );
}

/** A magnifying glass finding something at (x, y). */
function Spy({ x, y, r = 30, delay = 1.2 }: { x: number; y: number; r?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="isl-spy" style={vars({ "--delay": `${delay}s` })}>
        <circle r={r} fill="#FFF8D0" opacity={0.28} />
        <circle r={r} fill="none" stroke="#2A1A10" strokeWidth={5} />
        <circle r={r - 3} fill="none" stroke="#F5B21E" strokeWidth={2} />
        <path d={`M${r * 0.7} ${r * 0.7} L${r * 1.4} ${r * 1.4}`} stroke="#7A4A26" strokeWidth={9} strokeLinecap="round" />
      </g>
    </g>
  );
}

/** Lali asking "I spy…", with the sound on a letter card. */
function ISpy({ sound, x = 240, y = 62, who = "Lali" }: { sound: string; x?: number; y?: number; who?: string }) {
  return (
    <g>
      {who === "Lali" && <BeeHover x={x - 112} y={y + 4} s={1} />}
      <SayBubble x={x} y={y} lines={["I spy with my little eye…"]} size={12} tail="left" delay={0.3} />
      <LetterCard x={x + 120} y={y + 6} letter={sound} only="small" color="#3D8FD9" delay={0.9} say />
    </g>
  );
}

export default function ISpyWithLali({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Rain, rain. "There's nothing to do." "Let's play I Spy!"
    case 0:
      return (
        <g>
          <Home id={id} time="day" rain shelf={false} door="closed">
            <Room />
            <Place x={190} y={294} s={0.44} tap={TAP.cub}>
              <Cub mood="sad" />
            </Place>
            <Place x={250} y={294} s={0.42} flip tap={TAP.tsehay}>
              <Tsehay mood="worried" />
            </Place>
            <BeeHover x={300} y={170} s={1.1} flip />
            <SayBubble x={290} y={60} lines={["Let's play I Spy!"]} size={14} tail="down" delay={1.4} />
          </Home>
        </g>
      );
    // "a"… AVOCADO!
    case 1:
      return (
        <g>
          <Home id={id} time="day" rain shelf={false} door="closed">
            <Room />
            <Place x={196} y={294} s={0.44} tap={TAP.tsehay}>
              <Tsehay mood="joy" pose="point" />
            </Place>
            <Place x={262} y={294} s={0.4} flip tap={TAP.cub}>
              <Cub mood="happy" look={-3} />
            </Place>
            <ISpy sound="a" />
            <Spy x={106} y={232} />
            <WordCard x={60} y={170} word="avocado" pic="avocado" color="#3D8FD9" size={13} delay={2.2} />
          </Home>
        </g>
      );
    // "b"… BANANA!
    case 2:
      return (
        <g>
          <Home id={id} time="day" rain shelf={false} door="closed">
            <Room />
            <Place x={210} y={294} s={0.44} className="lali-hop" tap={TAP.tsehay}>
              <Tsehay mood="joy" />
            </Place>
            <Place x={270} y={294} s={0.4} flip tap={TAP.cub}>
              <Cub mood="joy" />
            </Place>
            <ISpy sound="b" who="Tsehay" x={250} />
            <Spy x={130} y={232} />
            <WordCard x={60} y={170} word="banana" pic="banana" color="#3D8FD9" size={13} delay={2.2} />
          </Home>
        </g>
      );
    // "c"… CAT! Purr, purr.
    case 3:
      return (
        <g>
          <Home id={id} time="day" rain shelf={false} door="closed">
            <Room catAwake />
            <Place x={190} y={294} s={0.44} tap={TAP.cub}>
              <Cub mood="joy" look={3} />
            </Place>
            <Place x={130} y={294} s={0.4} tap={TAP.tsehay}>
              <Tsehay mood="joy" />
            </Place>
            <ISpy sound="c" who="Anbessa" x={200} />
            <Spy x={324} y={196} r={34} />
            <WordCard x={340} y={130} word="cat" pic="cat" color="#3D8FD9" size={14} delay={2.2} />
          </Home>
        </g>
      );
    // "d"… DOOR! And knock, knock!
    case 4:
      return (
        <g>
          <Home id={id} time="day" rain shelf={false} door="knock">
            <Room />
            <Place x={330} y={290} s={0.46} flip tap={TAP.grandma}>
              <Grandma mood="joy" />
            </Place>
            <Place x={210} y={294} s={0.42} tap={TAP.cub}>
              <Cub mood="wow" look={-3} />
            </Place>
            <ISpy sound="d" who="Grandma" x={230} />
            <Spy x={96} y={180} r={40} delay={1.4} />
            <WordCard x={190} y={160} word="door" pic="door" color="#3D8FD9" size={14} delay={2.2} />
            <SayBubble x={60} y={110} lines={["Knock, knock!"]} size={11} tail="down" delay={3} />
          </Home>
        </g>
      );
    // Gugu, dripping: "I spy something beginning with 'e'!"
    case 5:
      return (
        <g>
          <Home id={id} time="day" rain shelf={false} door="open">
            <Room />
            <Place x={110} y={276} s={0.46} className="isl-shake" tap={TAP.gugu}>
              <Gugu mood="joy" pose="wave" />
            </Place>
            <g fill="#7FC8F8">
              {[
                [70, 200],
                [150, 190],
                [60, 240],
                [160, 236],
                [110, 170],
              ].map(([dx, dy], i) => (
                <path key={i} d={`M${dx} ${dy} q-3 5 0 8 q3 -3 0 -8Z`} className="isl-drop" style={vars({ "--delay": `${i * 0.2}s` })} />
              ))}
            </g>
            <Place x={240} y={294} s={0.4} flip tap={TAP.cub}>
              <Cub mood="joy" />
            </Place>
            <ISpy sound="e" who="Gugu" x={230} />
          </Home>
        </g>
      );
    // They look and look: nothing beginning with "e"!
    case 6:
      return (
        <g>
          <Home id={id} time="day" rain shelf={false} door="closed">
            <Room />
            <Place x={150} y={294} s={0.4} tap={TAP.cub}>
              <Cub mood="worried" look={-3} />
            </Place>
            <Place x={210} y={294} s={0.4} flip tap={TAP.tsehay}>
              <Tsehay mood="worried" />
            </Place>
            <Place x={270} y={294} s={0.42} flip tap={TAP.gugu}>
              <Gugu mood="joy" />
            </Place>
            <g className="isl-search">
              <Spy x={200} y={200} r={26} delay={0.2} />
            </g>
            <LetterCard x={330} y={70} letter="e" only="small" color="#3D8FD9" delay={0.4} />
            <Sign x={150} y={170} kind="?" delay={1.6} />
            <Sign x={220} y={160} kind="?" delay={2.2} />
          </Home>
        </g>
      );
    // "Let's say the sound slowly, and look slowly too." e… e… e…
    case 7:
      return (
        <g>
          <Home id={id} time="day" rain shelf={false} door="closed">
            <Room />
            <Place x={200} y={300} s={0.6} tap={TAP.cub}>
              <Cub mood="happy" look={0} />
            </Place>
            <path d="M200 200 Q206 160 212 124" stroke="#F5B21E" strokeWidth={3} strokeDasharray="2 7" fill="none" strokeLinecap="round" className="isl-look" />
            <SayBubble x={320} y={180} lines={["‘e’… ‘e’… ‘e’…"]} size={14} tail="left" delay={0.8} color="#3D8FD9" />
          </Home>
        </g>
      );
    // EGG! On the shelf, in its little basket.
    case 8:
      return (
        <g>
          <Home id={id} time="day" rain shelf={false} door="closed">
            <Glow x={212} y={106} r={50} color="#FFF3C0" strength={0.7} dur={2} />
            <Room />
            <Spy x={212} y={104} r={26} delay={0.4} />
            <WordCard x={320} y={80} word="egg" pic="egg" color="#3D8FD9" size={15} delay={1.2} />
            <Place x={150} y={294} s={0.42} className="lali-hop" tap={TAP.cub}>
              <Cub mood="joy" arm="up" />
            </Place>
            <Place x={260} y={294} s={0.42} flip tap={TAP.gugu}>
              <Gugu mood="joy" pose="wave" />
            </Place>
            <Sparkles x={212} y={104} r={40} delay={1} n={6} />
          </Home>
        </g>
      );
    // The rain stops. Grandma: "I spy… 'b'…"
    case 9:
      return (
        <g>
          <Home id={id} time="day" shelf={false} door="closed">
            <Room egg={false} />
            <Place x={300} y={290} s={0.5} flip tap={TAP.grandma}>
              <Grandma mood="joy" arm="hold" item={<Thing id="loaf" s={0.36} />} />
            </Place>
            <Place x={180} y={294} s={0.4} tap={TAP.cub}>
              <Cub mood="wow" look={3} />
            </Place>
            <ISpy sound="b" who="Grandma" x={210} />
          </Home>
        </g>
      );
    // BREAD! They share it, warm and soft.
    case 10:
      return (
        <g>
          <Home id={id} time="day" shelf={false} door="closed">
            <Glow x={200} y={240} r={120} color="#FFE2A0" strength={0.4} dur={3} />
            <Room egg={false} />
            <Place x={150} y={294} s={0.4} tap={TAP.cub}>
              <Cub mood="joy" />
            </Place>
            <Place x={210} y={296} s={0.4} tap={TAP.tsehay}>
              <Tsehay mood="joy" />
            </Place>
            <Place x={270} y={296} s={0.4} flip tap={TAP.gugu}>
              <Gugu mood="joy" />
            </Place>
            <g transform="translate(206 284)">
              <ellipse cx={0} cy={8} rx={46} ry={9} fill="#FFFDF4" />
              <Thing id="loaf" s={0.55} />
            </g>
            <SayBubble x={210} y={120} lines={["BREAD!"]} size={22} tail="down" delay={0.4} color="#C0392B" />
            <Hearts spots={[[170, 200, 1], [250, 196, 1.6]]} />
          </Home>
        </g>
      );
    // a avocado, b banana, c cat, d door, e egg.
    default:
      return (
        <g>
          <Home id={id} time="day" shelf={false} door="closed">
            <Room />
            {[
              ["a", "avocado"],
              ["b", "banana"],
              ["c", "cat"],
              ["d", "door"],
              ["e", "egg"],
            ].map(([l, w], i) => (
              <g key={l}>
                <LetterCard x={56 + i * 72} y={60} letter={l} only="small" color="#3D8FD9" s={0.8} delay={0.4 + i * 0.5} />
                <WordCard x={56 + i * 72} y={130} word={w} pic={w} color="#3D8FD9" size={11} delay={0.7 + i * 0.5} />
              </g>
            ))}
            <BeeHover x={350} y={190} s={1} flip />
          </Home>
        </g>
      );
  }
}
