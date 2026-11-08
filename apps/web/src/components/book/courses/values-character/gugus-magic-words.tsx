"use client";

import "./gugus-magic-words.css";

import { useId } from "react";

import { Air, BeeFlight, BeeHover, Place, vars } from "../../scenery";
import { Camel, Gugu, Ibex, TAP, Tsehay, Wolf } from "./kit-cast";
import { HouseFront, Village, Yard } from "./kit-places";
import { Hearts, Kite, KitePart, Sign, Sparkles, Speech } from "./kit-props";

/*
  "Gugu's Magic Words": one living picture per page (12 pages) on a windy day in the village.
  Doors are the heart of it: they bang shut when Gugu shouts and swing open when he asks kindly.
  Gugu collects the kite things one by one (paper, string, sticks, ribbon) and carries them
  from page to page. The words themselves are never written in the pictures (they suit both
  languages): Lali's bubbles show a giving paw (please), a heart (thank you) and a mended
  heart (sorry). Keyframes: kit.css (vc-*) and ./gugus-magic-words.css.
*/

/** The three magic words as pictures: an open paw, a heart, a heart with a plaster. */
function WordIcon({ kind }: { kind: "please" | "thanks" | "sorry" }) {
  if (kind === "please")
    return (
      <g>
        <ellipse cx={0} cy={2} rx={11} ry={7} fill="#5A3A2A" />
        <path d="M-9 -2 l-2 -7 M-3 -4 l-1 -8 M3 -4 l1 -8 M9 -2 l2 -7" stroke="#5A3A2A" strokeWidth={4} strokeLinecap="round" />
        <circle cx={0} cy={-2} r={3} fill="#FFD233" />
      </g>
    );
  if (kind === "thanks") return <path d="M0 9 C-12 0 -10 -11 -2 -11 C0 -11 0 -9 0 -7 C0 -9 0 -11 2 -11 C10 -11 12 0 0 9Z" fill="#E2463F" />;
  return (
    <g>
      <path d="M0 9 C-12 0 -10 -11 -2 -11 C0 -11 0 -9 0 -7 C0 -9 0 -11 2 -11 C10 -11 12 0 0 9Z" fill="#FF8FB1" />
      <rect x={-9} y={-4} width={18} height={6} rx={3} fill="#F2D3A2" transform="rotate(-30)" />
    </g>
  );
}

/** "Bang!": lines bursting from a door that slams. */
function Bang({ x, y, delay = 1.5 }: { x: number; y: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="gugus-magic-words-bang" style={vars({ "--delay": `${delay}s` })}>
        {[-60, -30, 0, 30, 60].map((a) => (
          <path key={a} d="M0 -18 L0 -30" stroke="#E2463F" strokeWidth={4} strokeLinecap="round" transform={`rotate(${a})`} />
        ))}
      </g>
    </g>
  );
}

/** Gugu with an armful of kite things in front of him. */
function Armful({ parts }: { parts: ("paper" | "string" | "sticks" | "ribbon")[] }) {
  return (
    <g transform="translate(100 196) scale(2)">
      {parts.map((p, i) => (
        <g key={p} transform={`translate(${(i - (parts.length - 1) / 2) * 14} ${-(i % 2) * 6})`}>
          <KitePart kind={p} />
        </g>
      ))}
    </g>
  );
}

export default function GugusMagicWords({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A windy day, perfect for kites. Gugu dreams of the biggest kite, and lists what he needs.
    case 0:
      return (
        <g>
          <Village id={id} time="day" />
          <Kite x={290} y={70} s={0.8} sx={-40} sy={60} />
          <Place x={150} y={292} s={0.5} tap={TAP.gugu}>
            <Gugu pose="wave" mood="joy" />
          </Place>
          <Speech x={80} y={120} w={96} h={44} think tail="right" delay={0.8}>
            {(["paper", "string", "sticks", "ribbon"] as const).map((k, i) => (
              <g key={k} transform={`translate(${-33 + i * 22} 0) scale(0.75)`}>
                <KitePart kind={k} />
              </g>
            ))}
          </Speech>
          <BeeHover x={330} y={170} s={1} flip />
          <Air kind="day" seed={3} />
        </g>
      );
    // "Give me paper!" Tsehay hugs her paper and the door bangs shut.
    case 1:
    // "I want string! Now!" Hawi's ears go flat, and her door bangs shut too.
    case 2: {
      const tsehay = page === 1;
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <HouseFront x={262} y={254} wall={tsehay ? "#D89B62" : "#C98A5A"} band={tsehay ? "#2E9A8A" : "#E2463F"} door="closing" delay={1.6}>
            <Place x={0} y={0} s={0.34} tap={tsehay ? TAP.tsehay : TAP.hawi}>
              {tsehay ? <Tsehay mood="worried" /> : <Wolf mood="sad" ears="flat" />}
            </Place>
          </HouseFront>
          <Bang x={262} y={190} delay={1.9} />
          <Place x={110} y={294} s={0.5} tap={TAP.gugu}>
            <Gugu pose="point" mood="joy" />
          </Place>
          <Sign x={160} y={150} kind="!" delay={0.4} color="#E2463F" />
          <Air kind="day" seed={5 + page} />
        </g>
      );
    }
    // Gugu sits grumpy on the path. Lali: "A little word opens a big door!"
    case 3:
      return (
        <g>
          <Village id={id} time="day" />
          <Place x={170} y={292} s={0.5} tap={TAP.gugu}>
            <Gugu pose="no" mood="sad" />
          </Place>
          <BeeHover x={270} y={190} s={1.3} flip />
          <Speech x={290} y={130} w={60} h={44} tail="left" delay={1.2}>
            <g transform="translate(-10 13)">
              <path d="M-10 0 L-10 -24 Q0 -29 10 -24 L10 0Z" fill="#3A2418" />
              <path d="M-10 0 L-10 -24 L-2 -22 L-2 2Z" fill="#8A5A3A" />
            </g>
            <g transform="translate(14 -2)">
              <Sparkles x={0} y={0} r={8} delay={1.6} n={4} />
            </g>
          </Speech>
          <Air kind="day" seed={9} />
        </g>
      );
    // The magic words, whispered: please, thank you, sorry.
    case 4:
      return (
        <g>
          <Village id={id} time="day" />
          <Place x={130} y={292} s={0.5} tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
          <BeeHover x={196} y={180} s={1.2} flip />
          {(["please", "thanks", "sorry"] as const).map((k, i) => (
            <Speech key={k} x={240 + i * 50} y={110 - (i % 2) * 24} w={42} h={38} tail="left" delay={0.8 + i * 0.9}>
              <WordIcon kind={k} />
            </Speech>
          ))}
          <Air kind="day" seed={11} />
        </g>
      );
    // Softly this time: "Sorry I shouted. Please may I have some paper?" The door swings wide.
    case 5:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <HouseFront x={262} y={254} door="opening" delay={1.4}>
            <Place x={0} y={0} s={0.34} tap={TAP.tsehay}>
              <Tsehay mood="joy" pose="wave" />
            </Place>
          </HouseFront>
          <g className="lali-pop-in" style={vars({ "--delay": "2.2s" })}>
            <g transform="translate(222 200)">
              <KitePart kind="paper" />
            </g>
          </g>
          <Sparkles x={262} y={180} r={50} delay={1.8} n={6} />
          <Place x={110} y={294} s={0.5} tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
          <Speech x={156} y={130} w={44} h={36} tail="left" delay={0.6}>
            <WordIcon kind="please" />
          </Speech>
          <Air kind="day" seed={13} />
        </g>
      );
    // Hawi gives the string: "In my family we say Galatoomi!"
    case 6:
      return (
        <g>
          <Village id={id} time="day" />
          <Place x={120} y={292} s={0.48} tap={TAP.gugu}>
            <Gugu mood="joy" />
            <Armful parts={["paper"]} />
          </Place>
          <Place x={276} y={292} s={0.46} flip tap={TAP.hawi}>
            <Wolf mood="joy" wag arm="give" item={<g transform="scale(1.4)"><KitePart kind="string" /></g>} />
          </Place>
          <Speech x={200} y={120} w={44} h={36} tail="right" delay={1}>
            <WordIcon kind="thanks" />
          </Speech>
          <Hearts spots={[[180, 190, 1.6], [214, 176, 2.4]]} />
          <Air kind="day" seed={15} />
        </g>
      );
    // Ayan gives two sticks (Mahadsanid!), Haben a red ribbon (Yekenyeley!).
    case 7:
      return (
        <g>
          <Village id={id} time="day" />
          <Place x={96} y={292} s={0.46} tap={TAP.gugu}>
            <Gugu mood="joy" />
            <Armful parts={["paper", "string"]} />
          </Place>
          <Place x={232} y={292} s={0.55} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <g className="lali-pop-in" style={vars({ "--delay": "1s" })}>
            <g transform="translate(170 236) scale(1.2)">
              <KitePart kind="sticks" />
            </g>
          </g>
          <Place x={340} y={294} s={0.4} flip tap={TAP.haben}>
            <Ibex pose="point" mood="joy" />
          </Place>
          <g className="lali-pop-in" style={vars({ "--delay": "2s" })}>
            <g transform="translate(290 232)">
              <KitePart kind="ribbon" />
            </g>
          </g>
          {[0, 1, 2].map((i) => (
            <Speech key={i} x={140 + i * 70} y={110 - (i % 2) * 18} w={40} h={34} tail="down" delay={1.2 + i * 0.8}>
              <WordIcon kind="thanks" />
            </Speech>
          ))}
          <Air kind="day" seed={17} />
        </g>
      );
    // Running too fast, the wind snatches Haben's ribbon: RIP! Gugu wants to hide.
    case 8:
      return (
        <g>
          <Yard id={id} time="day" tree fig={330} />
          <g className="gugus-magic-words-run">
            <Place x={170} y={292} s={0.46} tap={TAP.gugu}>
              <Gugu pose="hop" mood="worried" />
              <Armful parts={["paper", "string", "sticks"]} />
            </Place>
          </g>
          <g transform="translate(250 150)">
            <g className="gugus-magic-words-snatch">
              <g transform="scale(1.6)">
                <KitePart kind="torn" />
              </g>
            </g>
          </g>
          <g stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round" fill="none" opacity={0.8}>
            <path d="M40 120 q30 -10 60 0" className="lali-drift" style={vars({ "--dur": "4s" })} />
            <path d="M20 160 q30 -10 60 0" className="lali-drift" style={vars({ "--dur": "5s", "--delay": "-2s" })} />
          </g>
          <Sign x={210} y={170} kind="!" delay={1.2} color="#E2463F" />
          <Air kind="day" seed={19} />
        </g>
      );
    // "Haben, I'm sorry." Haben smiles: "Now we have two tails! Let's make two kites!"
    case 9:
      return (
        <g>
          <Village id={id} time="day" />
          <Place x={130} y={292} s={0.48} tap={TAP.gugu}>
            <Gugu mood="worried" />
          </Place>
          <Speech x={176} y={130} w={44} h={36} tail="left" delay={0.6}>
            <WordIcon kind="sorry" />
          </Speech>
          <Place x={276} y={292} s={0.46} flip tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <g transform="translate(222 210)">
            <g className="lali-pop-in" style={vars({ "--delay": "1.6s" })}>
              <g transform="translate(-14 0)">
                <Kite x={0} y={0} s={0.45} />
              </g>
              <g transform="translate(18 -6)">
                <Kite x={0} y={0} s={0.45} color="#2F6FD0" color2="#7FD3FF" delay={-1} />
              </g>
            </g>
          </g>
          <Sparkles x={226} y={200} r={40} delay={2} n={6} />
          <Air kind="day" seed={21} />
        </g>
      );
    // All afternoon: building, tying, gluing. "Please hold this." "Thank you!" "Sorry, that was your paw!"
    case 10:
      return (
        <g>
          <Yard id={id} time="evening" tree fig={60} />
          <g transform="translate(200 262)">
            <path d="M-80 4 L80 4 L70 -6 L-70 -6Z" fill="#D9B880" />
            <g transform="translate(-36 -6) rotate(-70) scale(0.7)">
              <Kite x={0} y={0} />
            </g>
            <g transform="translate(40 -6) rotate(70) scale(0.7)">
              <Kite x={0} y={0} color="#2F6FD0" color2="#7FD3FF" />
            </g>
          </g>
          <Place x={86} y={296} s={0.36} tap={TAP.gugu}>
            <Gugu pose="point" mood="joy" />
          </Place>
          <Place x={150} y={300} s={0.32} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Place x={250} y={300} s={0.32} flip tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Place x={318} y={298} s={0.43} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" kneel />
          </Place>
          <Place x={372} y={300} s={0.32} flip tap={TAP.haben}>
            <Ibex mood="joy" />
          </Place>
          {(["please", "thanks", "sorry"] as const).map((k, i) => (
            <Speech key={k} x={120 + i * 80} y={120 - (i % 2) * 20} w={40} h={34} tail="down" delay={0.8 + i * 1}>
              <WordIcon kind={k} />
            </Speech>
          ))}
          <Air kind="dusk" seed={23} />
        </g>
      );
    // Up, up go two kites over the village. "Little words make big kites fly!"
    case 11:
      return (
        <g>
          <Village id={id} time="day" sun={[60, 60]} />
          <Kite x={170} y={70} s={1} sx={-60} sy={170} />
          <Kite x={286} y={92} s={0.9} color="#2F6FD0" color2="#7FD3FF" sx={-40} sy={150} delay={-1.4} />
          <Place x={110} y={292} s={0.46} tap={TAP.gugu}>
            <Gugu pose="wave" mood="joy" />
          </Place>
          <Place x={246} y={294} s={0.38} flip tap={TAP.haben}>
            <Ibex pose="wave" mood="joy" />
          </Place>
          <Place x={316} y={296} s={0.32} flip tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Place x={176} y={298} s={0.3} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="hop" />
          </Place>
          <Place x={368} y={294} s={0.4} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <BeeFlight path="M60 120 C120 60 220 60 260 120 C300 180 360 140 340 90 C320 40 120 40 60 120Z" dur={8} s={1} rest={[340, 90]} happy />
          <Air kind="day" seed={25} />
        </g>
      );
    default:
      return null;
  }
}
