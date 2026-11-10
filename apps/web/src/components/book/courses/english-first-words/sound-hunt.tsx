"use client";

import "./sound-hunt.css";

import { useId } from "react";

import { Air, Place, Water, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Camel, Cub, FONT, TAP, Teacher, Wolf } from "./cast";
import { Board, Club, Yard } from "./places";
import { HandBell, SayBubble, Sign, Sparkles, WordCard } from "./props";
import { Thing } from "./things";

/*
  "The Sound Hunt": one living picture per page (12 pages). The team's Sound Hunt card rides in
  the top corner of every page, with a tick against each sound as it is found (and a goat-nibbled
  corner from page 2 on). Each find pops up with its English word. On the "j" pages the team
  jumps, and the last find, Teacher Meron's clay jug, was by the warka tree all along.
  Keyframes: ./kit.css (efw-*) and ./sound-hunt.css (sh-*).
*/

const SOUNDS = ["f", "g", "h", "i", "j"];
const TEAL = "#0E8C80";

/** The team's Sound Hunt card, with ticks for the sounds found so far. */
function HuntCard({ found, nibbled = false, x = 76, y = 84 }: { found: number; nibbled?: boolean; x?: number; y?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(0.82)`}>
      <Tappable reaction="wiggle" sound="pop">
        <path d={nibbled ? "M-42 -50 H30 Q34 -46 38 -42 Q34 -38 40 -34 V68 H-42Z" : "M-42 -50 H40 V68 H-42Z"} fill="#FFFDF6" stroke={TEAL} strokeWidth={3} strokeLinejoin="round" />
        {SOUNDS.map((s, i) => (
          <g key={s} transform={`translate(0 ${-32 + i * 22})`}>
            <text x={-16} y={6} fontSize={17} fontFamily="var(--font-andika), sans-serif" fontWeight={700} fill="#2A1A10" textAnchor="middle">
              {s}
            </text>
            <rect x={6} y={-8} width={16} height={16} rx={3} fill="#fff" stroke="#B9A58C" strokeWidth={1.6} />
            {i < found && (
              <g className="lali-pop-in" style={vars({ "--delay": `${i === found - 1 ? 1.6 : 0}s` })}>
                <path d="M9 0 L13 5 L21 -6" stroke="#2FA35A" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}
          </g>
        ))}
      </Tappable>
    </g>
  );
}

/** The hunting team: Anbessa, Hawi and Ayan. */
function Team({ x = 240, mood = "happy", jump = false }: { x?: number; mood?: "happy" | "joy" | "wow" | "worried" | "sad"; jump?: boolean }) {
  const cls = jump ? "lali-hop" : undefined;
  return (
    <g>
      <Place x={x} y={294} s={0.4} className={cls} tap={TAP.cub}>
        <Cub mood={mood} />
      </Place>
      <Place x={x + 56} y={292} s={0.38} className={cls} tap={TAP.hawi}>
        <Wolf mood={mood} />
      </Place>
      <Place x={x + 112} y={294} s={0.42} flip className={cls} tap={TAP.ayan}>
        <Camel who="ayan" mood={mood} />
      </Place>
    </g>
  );
}

/** A big find, popping up with a sparkle. */
function Find({ id, x, y, s = 0.8, className }: { id: string; x: number; y: number; s?: number; className?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={className ?? "lali-pop-in"} style={vars({ "--delay": "0.6s" })}>
        <Tappable reaction="bounce" sound="chime">
          <Thing id={id} s={s} />
        </Tappable>
      </g>
      <Sparkles x={0} y={0} r={36} delay={1} n={5} />
    </g>
  );
}

/** A green bush. */
function Bush({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx={-26} cy={-20} r={24} fill="#2D7D47" />
      <circle cx={22} cy={-22} r={26} fill="#2D7D47" />
      <circle cx={0} cy={-36} r={26} fill="#3E9B5A" />
    </g>
  );
}

export default function SoundHunt({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Teacher Meron hands out the Sound Hunt cards.
    case 0:
      return (
        <g>
          <Club id={id} time="morning">
            <Board x={300} y={96} lines={["Sound Hunt!", "f  g  h  i  j"]} size={15} w={140} />
            <Place x={360} y={292} s={0.44} flip tap={TAP.mama}>
              <Teacher mood="joy" pose="wave" />
            </Place>
            <Team x={130} mood="joy" />
            <HuntCard found={0} x={236} y={150} />
          </Club>
          <Air kind="day" seed={2} />
        </g>
      );
    // "f"… FISH!
    case 1:
      return (
        <g>
          <Yard id={id} time="morning" house={false}>
            <Water y={232} h={40} />
            <Find id="fish" x={130} y={226} s={0.7} className="sh-leap" />
            <Team x={200} mood="wow" />
            <HuntCard found={1} />
            <WordCard x={330} y={80} word="fish" pic="fish" color={TEAL} size={15} delay={1.4} />
          </Yard>
          <Air kind="day" seed={3} />
        </g>
      );
    // "g"… GOAT! It nibbles the card.
    case 2:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Team x={210} mood="joy" />
            <g transform="translate(120 268)">
              <g className="sh-nibble">
                <Tappable reaction="bounce" sound="baa">
                  <Thing id="goat" s={1.1} />
                </Tappable>
              </g>
            </g>
            <HuntCard found={2} nibbled />
            <WordCard x={330} y={80} word="goat" pic="goat" color={TEAL} size={15} delay={1.4} />
            <SayBubble x={150} y={176} lines={["Maa!"]} size={14} tail="down" delay={0.6} color="#7A3E1D" />
          </Yard>
          <Air kind="day" seed={4} />
        </g>
      );
    // "h"… HEN! And three fluffy chicks.
    case 3:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Bush x={130} y={250} s={1.2} />
            <Find id="hen" x={126} y={256} s={0.7} />
            {[176, 198, 220].map((x, i) => (
              <g key={x} transform={`translate(${x} ${272 - (i % 2) * 3})`}>
                <g className="lali-hop" style={vars({ "--delay": `${i * 0.2}s`, "--dur": "1s" })}>
                  <Thing id="chick" s={0.32} />
                </g>
              </g>
            ))}
            <Team x={250} mood="joy" />
            <HuntCard found={3} nibbled />
            <WordCard x={330} y={80} word="hen" pic="hen" color={TEAL} size={15} delay={1.4} />
          </Yard>
          <Air kind="day" seed={5} />
        </g>
      );
    // "i"… INSECT, under a big leaf.
    case 4:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <g transform="translate(140 244)">
              <g transform="scale(1.6) rotate(-20)">
                <Thing id="leaf" />
              </g>
            </g>
            <Find id="insect" x={150} y={262} s={0.5} />
            <Team x={220} mood="wow" />
            <HuntCard found={4} nibbled />
            <WordCard x={330} y={80} word="insect" pic="insect" color={TEAL} size={15} delay={1.4} />
          </Yard>
          <Air kind="day" seed={6} />
        </g>
      );
    // "j"… high, low, behind the rocks. Nothing!
    case 5:
      return (
        <g>
          <Yard id={id} time="day" tree fig={320}>
            <Team x={110} mood="worried" />
            <HuntCard found={4} nibbled />
            <g transform="translate(160 160)">
              <g className="sh-wobble">
                <text x={0} y={0} fontSize={48} fontFamily="var(--font-andika), sans-serif" fontWeight={700} fill={TEAL} textAnchor="middle">
                  j
                </text>
              </g>
            </g>
            <Sign x={110} y={190} kind="?" delay={1} />
            <Sign x={220} y={180} kind="?" delay={1.6} />
            <Sign x={300} y={120} kind="?" delay={2.2} />
          </Yard>
          <Air kind="day" seed={7} />
        </g>
      );
    // Ding, ding! The bell. "We didn't find a j."
    case 6:
      return (
        <g>
          <Yard id={id} time="day" tree fig={320}>
            <Place x={130} y={294} s={0.44} tap={TAP.ayan}>
              <Camel who="ayan" mood="sad" />
            </Place>
            <Place x={210} y={294} s={0.4} tap={TAP.hawi}>
              <Wolf mood="happy" ears="flat" />
            </Place>
            <Place x={270} y={294} s={0.42} flip tap={TAP.cub}>
              <Cub mood="happy" />
            </Place>
            <HandBell x={330} y={70} />
            <SayBubble x={240} y={150} lines={["But we found", "FOUR things!"]} size={12} tail="down" delay={1.2} />
            <HuntCard found={4} nibbled />
          </Yard>
          <Air kind="day" seed={8} />
        </g>
      );
    // Anbessa jumps for joy… JUMP! "We can BE the j!"
    case 7:
      return (
        <g>
          <Yard id={id} time="day" tree fig={320}>
            <Place x={200} y={296} s={0.56} className="sh-jump" tap={TAP.cub}>
              <Cub mood="joy" arm="up" />
            </Place>
            <Place x={110} y={294} s={0.4} tap={TAP.ayan}>
              <Camel who="ayan" mood="wow" />
            </Place>
            <Place x={300} y={294} s={0.38} flip tap={TAP.hawi}>
              <Wolf mood="wow" />
            </Place>
            <SayBubble x={220} y={80} lines={["JUMP!", "‘j’, ‘j’, jump!"]} size={15} tail="down" delay={1.4} color="#C0392B" />
            <HuntCard found={5} nibbled />
            <Sparkles x={200} y={190} r={70} delay={1.8} n={8} />
          </Yard>
          <Air kind="day" seed={9} />
        </g>
      );
    // Jump, jump, jump, all the way back.
    case 8:
      return (
        <g>
          <Club id={id} time="day">
            <path d="M380 270 q-20 -40 -40 0 q-20 -40 -40 0 q-20 -40 -40 0 q-20 -40 -40 0" stroke="#fff" strokeWidth={2.4} strokeDasharray="2 6" fill="none" strokeLinecap="round" />
            <Team x={150} mood="joy" jump />
            <WordCard x={230} y={90} word="jump" color={TEAL} size={18} delay={0.6} />
            <HuntCard found={5} nibbled x={326} />
          </Club>
          <Air kind="day" seed={10} />
        </g>
      );
    // "And look: j for… JUG!"
    case 9:
      return (
        <g>
          <Club id={id} time="day">
            <Place x={320} y={292} s={0.5} flip tap={TAP.mama}>
              <Teacher mood="joy" pose="point" />
            </Place>
            <g transform="translate(250 250)">
              <g className="sh-pour">
                <Tappable reaction="bounce" sound="chime">
                  <Thing id="jug" s={0.7} />
                </Tappable>
              </g>
            </g>
            <Team x={110} mood="joy" />
            <WordCard x={250} y={110} word="jug" pic="jug" color={TEAL} size={16} delay={1.2} />
            <Sparkles x={250} y={240} r={40} delay={1.8} n={6} />
          </Club>
          <Air kind="day" seed={11} />
        </g>
      );
    // f fish, g goat, h hen, i insect, j jump AND jug.
    case 10:
      return (
        <g>
          <Club id={id} time="day">
            {[
              ["f", "fish"],
              ["g", "goat"],
              ["h", "hen"],
              ["i", "insect"],
              ["j", "jug"],
            ].map(([l, w], i) => (
              <g key={l}>
                <g transform={`translate(${66 + i * 67} 50)`}>
                  <g className="lali-pop-in" style={vars({ "--delay": `${0.3 + i * 0.4}s` })}>
                    <circle r={16} fill={TEAL} />
                    <text y={7} fontSize={22} fontFamily="var(--font-andika), sans-serif" fontWeight={700} fill="#fff" textAnchor="middle">
                      {l}
                    </text>
                  </g>
                </g>
                <WordCard x={66 + i * 67} y={112} word={w} pic={w} color={TEAL} size={11} delay={0.5 + i * 0.4} />
              </g>
            ))}
            <Team x={150} mood="joy" />
          </Club>
          <Air kind="day" seed={12} />
        </g>
      );
    // Can YOU go on a Sound Hunt?
    default:
      return (
        <g>
          <Yard id={id} time="evening" tree fig={80}>
            <Team x={170} mood="joy" />
            <HuntCard found={5} nibbled x={322} y={90} />
            <g transform="translate(200 120)">
              <text x={0} y={0} fontSize={18} fontFamily={FONT} fontWeight={900} fill="#FFFDF6" textAnchor="middle" className="lali-pop-in" style={vars({ "--delay": "0.8s" })}>
                f · g · h · i · j
              </text>
            </g>
          </Yard>
          <Air kind="dusk" seed={13} />
        </g>
      );
  }
}
