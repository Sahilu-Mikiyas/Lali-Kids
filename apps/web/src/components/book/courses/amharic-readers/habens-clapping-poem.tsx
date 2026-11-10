"use client";

import { useId } from "react";

import { Crowd } from "../../library/festival-kit";
import { Air, BeeHover, Place, vars } from "../../scenery";
import { Camel, Cub, Gugu, Ibex, TAP, Teacher, Tsehay, Wolf } from "./kit-cast";
import { Bench, Classroom } from "./kit-more";
import { Home, Village, Yard } from "./kit-places";
import { Hearts, Sparkles } from "./kit-props";
import { SayBubble, Strip, Txt, r1, textW } from "./kit-read";

/*
  "Haben's Clapping Poem": one living picture per page (12 pages): the classroom with the poem on
  the board, the big tree where Haben practises with Ayan and Hawi, Haben's home, and the school
  yard on Friday. The beat is drawn as a little clap mark that flashes above each word in turn,
  with a rest at each ፣; the rhyming endings (ሰማይ, ላይ, ሻይ, ላይ) glow.
  Keyframes: lali-* (globals.css), ar-* (./kit.css, ./kit-read.css) and art-* (./kit-tales.css).
*/

const LINES = [
  ["ፀሐይ", "ወጣች", "ከሰማይ፣"],
  ["ወፎች", "ዘመሩ", "ዛፍ", "ላይ፣"],
  ["ልጆች", "ጠጡ", "ትኩስ", "ሻይ፣"],
  ["ኑ", "እንጫወት", "ሜዳ", "ላይ!"],
];

/** The poem on the chalkboard, line by line. */
function Board() {
  return (
    <>
      {LINES.map((l, i) => (
        <Txt key={i} text={l.join(" ")} x={200} y={62 + i * 22} size={15} fill="#F4F1E6" />
      ))}
    </>
  );
}

/** A line of the poem with a clap mark flashing above each word in turn (the beat). */
function Beat({ words, x, y, size = 20, start = 0.6, step = 0.6, rhyme = true }: { words: string[]; x: number; y: number; size?: number; start?: number; step?: number; rhyme?: boolean }) {
  const gap = 14;
  const ws = words.map((w) => textW(w, size));
  const total = ws.reduce((a, b) => a + b, 0) + gap * (words.length - 1);
  return (
    <g>
      <Strip words={words} x={x} y={y} size={size} gap={gap} delay={start - 0.4} step={0.1} read={false} lit={rhyme ? words.length - 1 : undefined} />
      {words.map((w, i) => {
        const cx = x - total / 2 + ws.slice(0, i).reduce((a, b) => a + b, 0) + gap * i + ws[i] / 2;
        return (
          <g key={i} transform={`translate(${r1(cx)} ${r1(y - size * 1.3)})`}>
            <g className="art-beat" style={vars({ "--delay": `${r1(start + i * step)}s` })}>
              <path d="M-6 4 L-2 -6 M6 4 L2 -6 M0 6 V-8" stroke="#C2410C" strokeWidth={2.4} strokeLinecap="round" />
            </g>
          </g>
        );
      })}
    </g>
  );
}

/** The class on the bench, with Haben in front. */
function ClassRoom({ id, haben = "happy", clap = false, children }: { id: string; haben?: "happy" | "joy" | "wow" | "worried"; clap?: boolean; children?: React.ReactNode }) {
  return (
    <g>
      <Classroom id={id} board={<Board />} />
      <Bench x={130} y={300} w={240} />
      {[
        { x: 40, el: <Gugu mood="joy" pose={clap ? "wave" : "sit"} />, tap: TAP.gugu },
        { x: 100, el: <Wolf mood="joy" wag={clap} />, tap: TAP.hawi },
        { x: 160, el: <Camel who="ayan" mood="joy" />, tap: TAP.ayan },
        { x: 220, el: <Cub mood="joy" arm={clap ? "up" : "none"} />, tap: TAP.cub },
      ].map((k) => (
        <Place key={k.x} x={k.x} y={292} s={0.28} className={clap ? "lali-hop" : undefined} tap={k.tap}>
          {k.el}
        </Place>
      ))}
      <Place x={290} y={294} s={0.4} tap={TAP.haben}>
        <Ibex mood={haben} pose={clap ? "wave" : "sit"} />
      </Place>
      {children}
    </g>
  );
}

export default function HabensClappingPoem({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // "On Friday our class will say a poem for the whole school. Haben, will you lead it?"
    case 0:
      return (
        <ClassRoom id={id} haben="wow">
          <Place x={360} y={252} s={0.4} flip tap={TAP.mama}>
            <Teacher mood="joy" pose="point" />
          </Place>
          <SayBubble x={330} y={150} text="ሐበን?" size={16} tail="right" delay={0.6} />
        </ClassRoom>
      );
    // The poem on the board; all four lines end in ይ.
    case 1:
      return (
        <ClassRoom id={id}>
          <Place x={360} y={252} s={0.4} flip tap={TAP.mama}>
            <Teacher mood="happy" pose="point" />
          </Place>
          {LINES.map((l, i) => (
            <g key={i} transform={`translate(${r1(200 + textW(l.join(" "), 15) / 2 - 8)} ${62 + i * 22 - 5})`}>
              <g className="lali-pop-in" style={vars({ "--delay": `${r1(0.8 + i * 0.4)}s` })}>
                <circle r={9} fill="none" stroke="#FFE27A" strokeWidth={2.4} />
              </g>
            </g>
          ))}
        </ClassRoom>
      );
    // Haben reads it all in one breath: "ፀሐይወጣችከሰማይወፎችዘመሩ…" It sounds like a galloping horse!
    case 2:
      return (
        <ClassRoom id={id} haben="worried">
          <g transform="translate(240 176)">
            <g className="ar-read-shake">
              <rect x={-120} y={-18} width={240} height={36} rx={18} fill="#FFFFFF" stroke="#1B2A4E" strokeWidth={2} />
              <Txt text="ፀሐይወጣችከሰማይወፎችዘመሩ…" x={0} y={7} size={14} />
            </g>
          </g>
        </ClassRoom>
      );
    // "A poem has a beat, like a drum. Clap once for every word, and rest at the ፣."
    case 3:
      return (
        <ClassRoom id={id}>
          <Place x={360} y={252} s={0.4} flip tap={TAP.mama}>
            <Teacher mood="joy" pose="wave" />
          </Place>
          <Beat words={LINES[0]} x={190} y={180} size={20} />
        </ClassRoom>
      );
    // Haben tries again, clapping: ፀሐይ (clap) ወጣች (clap) ከሰማይ (clap)… rest… It sounds like a song!
    case 4:
      return (
        <ClassRoom id={id} haben="joy" clap>
          <Beat words={LINES[0]} x={200} y={160} size={18} start={0.4} step={0.5} />
          <Beat words={LINES[1]} x={200} y={212} size={18} start={2.4} step={0.5} />
        </ClassRoom>
      );
    // "Listen to the ends: ሰማይ, ላይ, ሻይ, ላይ. They hit the house. Make them ring!"
    case 5:
      return (
        <ClassRoom id={id} haben="happy">
          <Strip words={["ሰማይ", "ላይ", "ሻይ", "ላይ"]} x={190} y={180} size={22} delay={0.6} step={0.5} gap={22} />
          <Sparkles x={190} y={170} r={80} delay={2.6} />
        </ClassRoom>
      );
    // Practice under the big tree: Ayan taps the beat on a tin can; Hawi stamps on every rhyme.
    case 6:
      return (
        <Yard id={id} time="day" house={false} tree fig={200}>
          <Place x={200} y={294} s={0.44} className="lali-hop" tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Place x={100} y={294} s={0.4} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <g transform="translate(140 270)">
            <rect x={-8} y={-16} width={16} height={18} rx={2} fill="#A8B0B8" className="ar-read-shake" />
          </g>
          <Place x={310} y={294} s={0.4} flip className="lali-hop" tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <BeeHover x={260} y={170} s={0.7} />
          <Air kind="day" seed={5} />
        </Yard>
      );
    // At home: to her mother over coffee, to her grandmother at bedtime. By Thursday she knows it by heart.
    case 7:
      return (
        <g>
          <Home id={id} time="evening" />
          <Place x={130} y={292} s={0.44} tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Place x={250} y={292} s={0.48} flip tap={TAP.haben}>
            <Ibex grown mood="joy" />
          </Place>
          <Place x={330} y={292} s={0.46} flip tap={TAP.haben}>
            <Ibex old mood="happy" />
          </Place>
          <Hearts spots={[[190, 180, 1], [210, 166, 1.4]]} />
          <Txt text="♪" x={160} y={160} size={22} fill="#C2410C" />
        </g>
      );
    // Friday: the whole school in the yard. So many faces! Then she sees Ayan and Hawi in the front row.
    case 8:
      return (
        <Village id={id} time="morning">
          <Crowd y={226} xs={[30, 70, 110, 150, 250, 290, 330, 370]} s={0.7} seed={4} kids={[0, 1, 2, 3, 4, 5, 6, 7]} />
          <Place x={200} y={262} s={0.42} className="art-shiver" tap={TAP.haben}>
            <Ibex mood="worried" />
          </Place>
          <Place x={130} y={296} s={0.36} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Place x={270} y={296} s={0.34} flip tap={TAP.hawi}>
            <Wolf mood="joy" />
          </Place>
          <Air kind="day" seed={7} />
        </Village>
      );
    // She begins, clapping: "ፀሐይ ወጣች ከሰማይ፣…" small at first, then stronger. The class joins in.
    case 9:
      return (
        <Village id={id} time="morning">
          <Crowd y={226} xs={[30, 70, 110, 150, 250, 290, 330, 370]} s={0.7} seed={4} kids={[0, 1, 2, 3, 4, 5, 6, 7]} pose="clap" />
          <Beat words={LINES[0]} x={200} y={60} size={18} start={0.4} step={0.5} />
          <Beat words={LINES[1]} x={200} y={112} size={18} start={2.4} step={0.5} />
          <Place x={200} y={262} s={0.42} tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
        </Village>
      );
    // "…ልጆች ጠጡ ትኩስ ሻይ፣ ኑ እንጫወት ሜዳ ላይ!" Everyone shouts "ላይ!" and throws their hands in the air.
    case 10:
      return (
        <Village id={id} time="morning">
          <Crowd y={226} xs={[30, 70, 110, 150, 250, 290, 330, 370]} s={0.7} seed={4} kids={[0, 1, 2, 3, 4, 5, 6, 7]} pose="up" />
          <Beat words={LINES[2]} x={200} y={60} size={18} start={0.4} step={0.5} />
          <Beat words={LINES[3]} x={200} y={112} size={18} start={2.4} step={0.5} />
          <Place x={200} y={262} s={0.44} className="lali-hop" tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Sparkles x={200} y={150} r={100} delay={4.6} n={7} />
        </Village>
      );
    // Just like the poem says, everyone runs out to play in the field. Haben is still clapping.
    default:
      return (
        <Village id={id} time="day">
          {[
            { x: 60, el: <Gugu mood="joy" pose="hop" />, tap: TAP.gugu, s: 0.34 },
            { x: 130, el: <Wolf mood="joy" wag />, tap: TAP.hawi, s: 0.36 },
            { x: 200, el: <Ibex mood="joy" pose="wave" />, tap: TAP.haben, s: 0.44 },
            { x: 270, el: <Camel who="ayan" mood="joy" walk />, tap: TAP.ayan, s: 0.38 },
            { x: 340, el: <Tsehay mood="joy" pose="wave" />, tap: TAP.tsehay, s: 0.34 },
          ].map((k, i) => (
            <Place key={k.x} x={k.x} y={292} s={k.s} from={[k.x - 80, 292]} delay={0.2 + i * 0.1} dur={1.6} className="lali-hop" tap={k.tap}>
              {k.el}
            </Place>
          ))}
          <Txt text="ኑ እንጫወት ሜዳ ላይ!" x={180} y={110} size={22} fill="#C2410C" />
          <Air kind="day" seed={9} />
        </Village>
      );
  }
}
