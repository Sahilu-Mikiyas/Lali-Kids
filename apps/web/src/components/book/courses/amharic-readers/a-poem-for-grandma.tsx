"use client";

import { useId, type ReactNode } from "react";

import { Crowd } from "../../library/festival-kit";
import { Air, BeeFlight, BeeHover, Daisy, Place, vars } from "../../scenery";
import { Cub, Grandma, TAP, Tsehay } from "./kit-cast";
import { Home, Yard } from "./kit-places";
import { Hearts, Sign, Sparkles } from "./kit-props";
import { SayBubble, Strip, Txt, r1 } from "./kit-read";

/*
  "A Poem for Grandma": one living picture per page (12 pages): the hills turning yellow with
  adey flowers, Anbessa writing under the tree, the yard where he practises, New Year's morning
  with girls singing at the gate, and Grandma's wall. His notebook page shows the poem line by
  line as he writes it (crossed-out tries included); the rhyming ባ endings glow.
  Keyframes: lali-* (globals.css), ar-* (./kit.css, ./kit-read.css) and art-* (./kit-tales.css).
*/

const POEM = ["መስከረም ጠባ፣", "ፈካ አደይ አበባ፤", "አያቴ ሆይ ተቀበይ፣", "የፍቅር ቢጫ አበባ!"];

/** The yellow adey flowers across the hills. */
function Adey({ n = 14, seed = 1 }: { n?: number; seed?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const x = 14 + ((i * 53 + seed * 31) % 380);
        const y = 214 + ((i * 37 + seed * 11) % 40);
        return <Daisy key={i} x={x} y={y} h={14 + (i % 3) * 4} s={0.8} delay={-i * 0.3} color="#FFD233" />;
      })}
    </g>
  );
}

/** Anbessa's notebook page with the poem so far; `cross` shows crossed-out tries under line 3. */
function Page({ x, y, lines, cross = false, s = 1, glow = false, flowers = false }: { x: number; y: number; lines: number; cross?: boolean; s?: number; glow?: boolean; flowers?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {glow && <rect x={-96} y={-66} width={192} height={132} rx={10} fill="#FFE27A" className="ar-read-glow" />}
      <rect x={-90} y={-60} width={180} height={120} rx={4} fill="#FFFDF6" stroke="#B9A47A" strokeWidth={2} />
      {[-34, -10, 14, 38].map((ly) => (
        <path key={ly} d={`M-80 ${ly + 6} H80`} stroke="#DCE8FB" strokeWidth={1.2} />
      ))}
      {POEM.slice(0, lines).map((l, i) => (
        <g key={i} className="lali-fade-in" style={vars({ "--delay": `${r1(0.4 + i * 0.5)}s` })}>
          <Txt text={l} x={0} y={-36 + i * 24} size={14} fill="#2B3A6E" />
        </g>
      ))}
      {cross && (
        <g className="lali-fade-in" style={vars({ "--delay": "1.4s" })}>
          <Txt text="አያቴ ውብ…" x={-40} y={14} size={12} fill="#8A8AA0" />
          <path d="M-74 10 H-6" stroke="#E2463F" strokeWidth={2.4} />
          <Txt text="ኦ አያቴ…" x={40} y={14} size={12} fill="#8A8AA0" />
          <path d="M8 10 H72" stroke="#E2463F" strokeWidth={2.4} />
        </g>
      )}
      {flowers &&
        [
          [-84, -54],
          [84, -54],
          [-84, 54],
          [84, 54],
        ].map(([fx, fy], i) => (
          <g key={i} transform={`translate(${fx} ${fy})`}>
            <circle r={6} fill="#FFD233" />
            <circle r={2.4} fill="#E08A10" />
          </g>
        ))}
    </g>
  );
}

/** The hillside in Meskerem, yellow with adey, with the big tree. */
function Hills({ id, time = "day", children }: { id: string; time?: "day" | "morning" | "evening"; children?: ReactNode }) {
  return (
    <Yard id={id} time={time} tree fig={70}>
      <Adey />
      {children}
    </Yard>
  );
}

export default function APoemForGrandma({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // The hills turn yellow with adey flowers. New Year is in three days. "What can I give Grandma?"
    case 0:
      return (
        <Hills id={id} time="morning">
          <Place x={200} y={292} s={0.44} tap={TAP.cub}>
            <Cub mood="worried" />
          </Place>
          <Sign x={200} y={170} kind="?" delay={1} />
          <BeeHover x={320} y={170} s={0.7} flip />
          <Air kind="day" seed={3} />
        </Hills>
      );
    // "Grandma always says words can be a gift. Write her a poem!" "Poems are for everyone."
    case 1:
      return (
        <Hills id={id}>
          <Place x={150} y={292} s={0.44} tap={TAP.cub}>
            <Cub mood="wow" />
          </Place>
          <Place x={260} y={292} s={0.4} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="point" />
          </Place>
          <SayBubble x={280} y={170} text="ግጥም ጻፍላት!" size={16} tail="right" delay={0.6} />
          <Air kind="day" seed={5} />
        </Hills>
      );
    // Under the tree with his notebook: the first line, መስከረም ጠባ፣. That was easy!
    case 2:
      return (
        <Hills id={id}>
          <Page x={250} y={110} lines={1} />
          <Place x={110} y={294} s={0.46} tap={TAP.cub}>
            <Cub mood="joy" arm="hold" />
          </Place>
          <Air kind="day" seed={7} />
        </Hills>
      );
    // A word that ends like ጠባ… "አበባ!" ፈካ አደይ አበባ፤ It hits the house!
    case 3:
      return (
        <Hills id={id}>
          <Page x={250} y={110} lines={2} />
          <g transform="translate(330 70)">
            <g className="lali-pop-in" style={vars({ "--delay": "1.6s" })}>
              <circle r={14} fill="#FFFDF6" stroke="#E2463F" strokeWidth={2} />
              <Txt text="ባ" x={0} y={6} size={16} fill="#E2463F" />
            </g>
          </g>
          <Place x={110} y={294} s={0.46} className="lali-hop" tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Air kind="day" seed={9} />
        </Hills>
      );
    // The third line is hard. Write, cross out, write, cross out. "Everyone crosses out."
    case 4:
      return (
        <Hills id={id}>
          <Page x={250} y={110} lines={2} cross />
          <BeeFlight path="M80 150 C100 110 160 110 170 150 C180 190 100 200 80 150Z" dur={3} s={0.7} rest={[170, 150]} trail={false} />
          <Place x={110} y={294} s={0.46} tap={TAP.cub}>
            <Cub mood="worried" />
          </Place>
          <Place x={330} y={294} s={0.38} flip tap={TAP.tsehay}>
            <Tsehay mood="happy" />
          </Place>
          <Air kind="day" seed={11} />
        </Hills>
      );
    // At last: አያቴ ሆይ ተቀበይ፣ and የፍቅር ቢጫ አበባ! His heart goes warm.
    case 5:
      return (
        <Hills id={id}>
          <Page x={250} y={110} lines={4} glow />
          <Place x={110} y={294} s={0.46} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Hearts spots={[[110, 180, 2.4], [126, 166, 2.8]]} />
          <Air kind="day" seed={13} />
        </Hills>
      );
    // Very fast and very loud, like a market seller. "Read it slowly, and from the heart."
    case 6:
      return (
        <Hills id={id}>
          <g className="ar-read-shake">
            <SayBubble x={150} y={150} text="መስከረምጠባፈካ…!!" size={16} delay={0.4} />
          </g>
          <Place x={110} y={294} s={0.46} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Place x={300} y={294} s={0.4} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <SayBubble x={290} y={186} text="ቀስ ብሎ፣ ከልብ!" size={14} tail="right" delay={1.6} />
          <Air kind="day" seed={15} />
        </Hills>
      );
    // Practising: soft at the start, a rest at each ፣, a smile on አያቴ, a big happy voice for the !
    case 7:
      return (
        <Hills id={id} time="evening">
          <Strip words={["መስከረም", "ጠባ፣"]} x={200} y={50} size={20} delay={0.4} step={0.6} />
          <Strip words={["ፈካ", "አደይ", "አበባ፤"]} x={200} y={92} size={20} delay={1.8} step={0.6} />
          <Place x={200} y={294} s={0.46} tap={TAP.cub}>
            <Cub mood="happy" />
          </Place>
          <Air kind="dusk" seed={17} />
        </Hills>
      );
    // His best writing, yellow flowers all round, and a big bunch of real adey from the hill.
    case 8:
      return (
        <Hills id={id}>
          <Page x={250} y={110} lines={4} flowers />
          <Place x={110} y={294} s={0.46} tap={TAP.cub}>
            <Cub mood="joy" arm="hold" item={<g>{[-6, 0, 6].map((dx) => <circle key={dx} cx={dx} cy={-10} r={5} fill="#FFD233" />)}</g>} />
          </Place>
          <Place x={330} y={294} s={0.38} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Air kind="day" seed={19} />
        </Hills>
      );
    // New Year's morning: girls go from house to house singing «አበባ አየሽ ወይ». Anbessa stands before Grandma.
    case 9:
      return (
        <Yard id={id} time="morning">
          <Adey seed={3} />
          <Crowd y={232} xs={[40, 80, 120]} s={0.8} seed={11} kids={[0, 1, 2]} pose="clap" sing />
          <SayBubble x={100} y={120} text="አበባ አየሽ ወይ…" size={14} delay={0.6} />
          <Place x={230} y={294} s={0.44} tap={TAP.cub}>
            <Cub mood="happy" arm="hold" item={<g>{[-6, 0, 6].map((dx) => <circle key={dx} cx={dx} cy={-10} r={5} fill="#FFD233" />)}</g>} />
          </Place>
          <Place x={330} y={292} s={0.5} flip tap={TAP.grandma}>
            <Grandma mood="happy" />
          </Place>
          <Air kind="day" seed={21} />
        </Yard>
      );
    // Slowly, and from the heart, he reads the four lines.
    case 10:
      return (
        <Yard id={id} time="morning">
          <Adey seed={5} />
          {POEM.map((l, i) => (
            <g key={i} className="lali-fade-in" style={vars({ "--delay": `${r1(0.4 + i * 1)}s`, "--dur": "0.8s" })}>
              <Txt text={l} x={200} y={44 + i * 28} size={20} fill="#7A3A10" />
            </g>
          ))}
          <Place x={150} y={294} s={0.44} tap={TAP.cub}>
            <Cub mood="happy" arm="give" item={<g>{[-6, 0, 6].map((dx) => <circle key={dx} cx={dx} cy={-10} r={5} fill="#FFD233" />)}</g>} />
          </Place>
          <Place x={280} y={292} s={0.5} flip tap={TAP.grandma}>
            <Grandma mood="joy" />
          </Place>
        </Yard>
      );
    // Happy tears, a big hug: "The best gift I have ever had." The poem goes on the wall.
    default:
      return (
        <g>
          <Home id={id} time="day" />
          <Page x={200} y={96} lines={4} s={0.8} flowers />
          <Place x={230} y={292} s={0.5} flip tap={TAP.grandma}>
            <Grandma mood="joy" arm="wrap" />
          </Place>
          <Place x={180} y={294} s={0.4} tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Hearts spots={[[200, 190, 0.6], [220, 176, 1], [186, 170, 1.4]]} />
          <Sparkles x={200} y={96} r={80} delay={1.6} />
        </g>
      );
  }
}
