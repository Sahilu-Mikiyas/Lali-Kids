"use client";

import "./this-is-my-family.css";

import { useId, type ReactNode } from "react";

import { Glow } from "../../glow";
import { Air, BeeHover, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Camel, Cub, FONT, Grandma, Ibex, TAP, Teacher, Tsehay, Wolf } from "./cast";
import { Board, Club, FigTree, Home, Yard } from "./places";
import { Hearts, Sign, Sparkles } from "./props";

/*
  "This Is My Family": one living picture per page (13 pages). Hawi's drawing is the heart of
  the story: crayon people with their English labels ("me", "mother", "grandfather"…) appear on
  the paper as she says them, until there is no room left; then the tiny version nobody can read;
  then her big family tree with everyone on a branch. At English Club each friend holds up their
  own picture, so the English family words are always on the page.
  Hawi's family are Ethiopian wolves (Mama in purple, Aunt Chaltu in red, Uncle Gemechu in blue).
  Keyframes: ./kit.css (efw-*) and ./this-is-my-family.css (fam-*).
*/

const MAMA = "#8A5AB8";
const CHALTU = "#E2463F";
const GEMECHU = "#2E6AD0";

type Kid = { color: string; label?: string; size?: "big" | "small" | "baby"; elder?: boolean; delay?: number; dy?: number };

/** One crayon person on a drawing: round head, triangle body, stick legs, and a label under it. */
function Doodle({ x, y, k, s = 1 }: { x: number; y: number; k: Kid; s?: number }) {
  const h = k.size === "baby" ? 0.55 : k.size === "small" ? 0.75 : 1;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${k.delay ?? 0.6}s` })}>
        <g transform={`scale(${h})`} stroke="#2A1A10" strokeWidth={1.4} strokeLinejoin="round" strokeLinecap="round">
          <path d="M-3 0 L-4 8 M3 0 L4 8" fill="none" />
          <path d="M0 -24 L-10 0 H10Z" fill={k.color} />
          <circle cx={0} cy={-30} r={7} fill={k.elder ? "#D9C2A0" : "#C9622B"} />
          {k.elder && <path d="M-7 -33 Q0 -40 7 -33" stroke="#fff" strokeWidth={2} fill="none" />}
          <circle cx={-2.4} cy={-31} r={0.9} fill="#2A1A10" stroke="none" />
          <circle cx={2.4} cy={-31} r={0.9} fill="#2A1A10" stroke="none" />
          <path d="M-2.4 -27.6 Q0 -25.6 2.4 -27.6" fill="none" strokeWidth={1} />
        </g>
        {k.label && (
          <text x={0} y={20 + (k.dy ?? 0)} fontSize={8} fontFamily={FONT} fontWeight={800} fill="#2A1A10" textAnchor="middle">
            {k.label}
          </text>
        )}
      </g>
    </g>
  );
}

/** A sheet of drawing paper, centred on (x, y), tilted a little. */
function Paper({ x, y, w = 150, h = 100, rot = -3, children, title }: { x: number; y: number; w?: number; h?: number; rot?: number; children?: ReactNode; title?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <Tappable reaction="wiggle" sound="pop">
        <rect x={-w / 2 + 3} y={-h / 2 + 4} width={w} height={h} rx={4} fill="#000" opacity={0.12} />
        <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={4} fill="#FFFDF6" stroke="#E3D5C3" strokeWidth={1.5} />
        {title && (
          <text x={0} y={-h / 2 + 15} fontSize={11} fontFamily={FONT} fontWeight={900} fill="#8A5AB8" textAnchor="middle">
            {title}
          </text>
        )}
        {children}
      </Tappable>
    </g>
  );
}

/** Hawi's people, in the order she draws them. */
const HAWI: Kid[] = [
  { color: "#E2463F", label: "me", size: "small" },
  { color: MAMA, label: "mother" },
  { color: "#FBF8F0", label: "grandfather", elder: true },
  { color: "#FFFDF4", label: "great-grandmother", elder: true },
  { color: CHALTU, label: "aunt" },
  { color: GEMECHU, label: "uncle" },
];

/** Hawi's drawing with the first `n` people on it (left to right). */
function HawiPaper({ x, y, n, late = 0, cousins = false }: { x: number; y: number; n: number; late?: number; cousins?: boolean }) {
  return (
    <Paper x={x} y={y} w={224} h={96}>
      {HAWI.slice(0, n).map((k, i) => (
        <Doodle key={k.label} x={-90 + i * 36} y={18} k={{ ...k, dy: i % 2 ? 11 : 0, delay: i >= n - late ? 1 + (i - (n - late)) * 0.8 : 0.1 }} />
      ))}
      {cousins && (
        <g className="fam-squeeze">
          <Doodle x={100} y={18} k={{ color: "#2FA35A", size: "small", delay: 0.8 }} s={0.8} />
          <Doodle x={110} y={20} k={{ color: "#F5B21E", size: "small", delay: 1.2 }} s={0.7} />
          <Doodle x={119} y={22} k={{ color: "#0E8C80", size: "baby", delay: 1.6 }} s={0.6} />
        </g>
      )}
    </Paper>
  );
}

/** The family tree: a trunk and branches, with Hawi's whole family sitting on them. */
function FamilyTree({ x, y, s = 1, delay = 0.6 }: { x: number; y: number; s?: number; delay?: number }) {
  const spots: [number, number, Kid][] = [
    [0, 52, { color: "#E2463F", label: "me", size: "small" }],
    [-46, 20, { color: MAMA, label: "mother", dy: 8 }],
    [46, 20, { color: "#FBF8F0", label: "grandfather", elder: true, dy: 8 }],
    [0, -14, { color: "#FFFDF4", label: "great-grandmother", elder: true }],
    [-90, -10, { color: CHALTU, label: "aunt" }],
    [90, -10, { color: GEMECHU, label: "uncle" }],
    [-70, 44, { color: "#2FA35A", label: "cousin", size: "small" }],
    [70, 44, { color: "#F5B21E", label: "cousin", size: "small" }],
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Tappable reaction="wiggle" sound="chime">
        <rect x={-132} y={-66} width={264} height={140} rx={5} fill="#000" opacity={0.12} />
        <rect x={-130} y={-70} width={260} height={140} rx={5} fill="#FFFDF6" stroke="#E3D5C3" strokeWidth={1.5} />
        <path d="M-65 -70 V70 M0 -70 V70 M65 -70 V70" stroke="#EADFCF" strokeWidth={1} strokeDasharray="3 3" />
        <path d="M-8 70 Q-4 40 -6 20 L6 20 Q4 40 8 70Z" fill="#9A6A44" />
        <path d="M0 24 Q-40 10 -96 0 M0 24 Q40 10 96 0 M0 20 V-20 M-20 18 Q-46 30 -74 50 M20 18 Q46 30 74 50" stroke="#9A6A44" strokeWidth={4} fill="none" strokeLinecap="round" />
        <g fill="#5CBF73" opacity={0.55}>
          <ellipse cx={-96} cy={-6} rx={22} ry={12} />
          <ellipse cx={96} cy={-6} rx={22} ry={12} />
          <ellipse cx={0} cy={-28} rx={26} ry={13} />
        </g>
        {spots.map(([sx, sy, k], i) => (
          <Doodle key={`${sx}-${sy}`} x={sx} y={sy} k={{ ...k, delay: delay + i * 0.35 }} s={0.85} />
        ))}
      </Tappable>
    </g>
  );
}

/** A friend's own picture, held up at English Club. */
function FriendPaper({ x, y, people, rot = 3, title }: { x: number; y: number; people: Kid[]; rot?: number; title?: string }) {
  const w = Math.max(90, people.length * 40 + 20);
  return (
    <Paper x={x} y={y} w={w} h={80} rot={rot} title={title}>
      {people.map((k, i) => (
        <Doodle key={`${k.label}-${i}`} x={-w / 2 + 30 + i * 40} y={18} k={{ ...k, delay: 0.8 + i * 0.6 }} />
      ))}
    </Paper>
  );
}

/** Hawi's wolf family standing to be drawn. */
function Posers({ n }: { n: number }) {
  const all = [
    <Place key="m" x={210} y={210} s={0.34} tap={TAP.hawi}>
      <Wolf dress={MAMA} mood="joy" />
    </Place>,
    <Place key="g" x={262} y={212} s={0.36} tap={TAP.elder}>
      <Wolf elder mood="happy" />
    </Place>,
    <Place key="gg" x={314} y={212} s={0.36} tap={TAP.elder}>
      <Wolf elder hood mood="joy" />
    </Place>,
    <Place key="a" x={150} y={214} s={0.32} tap={TAP.hawi}>
      <Wolf dress={CHALTU} mood="happy" />
    </Place>,
    <Place key="u" x={364} y={214} s={0.34} flip tap={TAP.hawi}>
      <Wolf dress={GEMECHU} mood="joy" />
    </Place>,
  ];
  return <g>{all.slice(0, n)}</g>;
}

export default function ThisIsMyFamily({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Teacher Meron: "This is my family." Bring a picture tomorrow!
    case 0:
      return (
        <g>
          <Club id={id} time="day">
            <Board x={318} y={92} lines={["This is", "my family."]} size={14} />
            <Place x={248} y={292} s={0.46} flip tap={TAP.mama}>
              <Teacher mood="joy" pose="wave" />
            </Place>
            <FriendPaper x={196} y={150} rot={-4} people={[{ color: "#2F6FD0", label: "mother" }, { color: "#FFFDF4", label: "father", elder: true }, { color: "#E8513B", label: "me", size: "small" }]} />
            <Place x={110} y={290} s={0.34} tap={TAP.hawi}>
              <Wolf mood="wow" />
            </Place>
            <Place x={160} y={292} s={0.34} tap={TAP.cub}>
              <Cub mood="happy" look={2} />
            </Place>
            <Place x={350} y={292} s={0.34} flip tap={TAP.tsehay}>
              <Tsehay mood="happy" />
            </Place>
          </Club>
          <Air kind="day" seed={2} />
        </g>
      );
    // "This is me."
    case 1:
      return (
        <g>
          <Home id={id} time="day" wall={["#D9C8E8", "#B8A2D0"]}>
            <HawiPaper x={236} y={236} n={1} late={1} />
            <Place x={90} y={290} s={0.48} tap={TAP.hawi}>
              <Wolf mood="happy" wag />
            </Place>
            <g transform="translate(300 270) rotate(-20)">
              {["#E2463F", "#2F6FD0", "#2FA35A", "#F5B21E", MAMA].map((c, i) => (
                <rect key={c} x={i * 8} y={0} width={6} height={30} rx={2} fill={c} />
              ))}
            </g>
          </Home>
          <Air kind="day" seed={3} grass={false} />
        </g>
      );
    // "This is my mother. This is my grandfather."
    case 2:
      return (
        <g>
          <Home id={id} time="day" wall={["#D9C8E8", "#B8A2D0"]}>
            <Posers n={2} />
            <HawiPaper x={236} y={240} n={3} late={2} />
            <Place x={74} y={296} s={0.44} tap={TAP.hawi}>
              <Wolf mood="joy" wag />
            </Place>
          </Home>
          <Air kind="day" seed={4} grass={false} />
        </g>
      );
    // Great-grandmother, aunt, uncle…
    case 3:
      return (
        <g>
          <Home id={id} time="day" wall={["#D9C8E8", "#B8A2D0"]}>
            <Posers n={5} />
            <HawiPaper x={236} y={240} n={6} late={3} />
            <Place x={60} y={296} s={0.42} tap={TAP.hawi}>
              <Wolf mood="happy" />
            </Place>
          </Home>
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    // "…and these are my cousins…" No more room!
    case 4:
      return (
        <g>
          <Home id={id} time="day" wall={["#D9C8E8", "#B8A2D0"]}>
            <Posers n={5} />
            <g transform="translate(30 180)">
              {["#2FA35A", "#F5B21E", "#0E8C80"].map((c, i) => (
                <Place key={c} x={i * 30} y={20 + (i % 2) * 4} s={0.22} tap={TAP.hawi}>
                  <Wolf dress={c} mood="joy" wag={i === 1} />
                </Place>
              ))}
            </g>
            <HawiPaper x={236} y={240} n={6} cousins />
            <Place x={60} y={296} s={0.42} tap={TAP.hawi}>
              <Wolf mood="wow" ears="flat" />
            </Place>
            <Sign x={318} y={228} kind="!" delay={2} color="#E2463F" />
          </Home>
          <Air kind="day" seed={6} grass={false} />
        </g>
      );
    // Tiny, tiny people: nobody can see who is who.
    case 5:
      return (
        <g>
          <Home id={id} time="day" wall={["#D9C8E8", "#B8A2D0"]}>
            <Paper x={220} y={240} w={150} h={90}>
              {Array.from({ length: 14 }, (_, i) => (
                <Doodle key={i} x={-60 + (i % 7) * 20} y={-6 + Math.floor(i / 7) * 30} k={{ color: ["#E2463F", MAMA, "#FBF8F0", CHALTU, GEMECHU, "#2FA35A", "#F5B21E"][i % 7], delay: 0.3 + i * 0.08 }} s={0.32} />
              ))}
            </Paper>
            <Sign x={300} y={176} kind="?" delay={1.8} />
            <Place x={86} y={296} s={0.48} tap={TAP.hawi}>
              <Wolf mood="sad" ears="flat" />
            </Place>
          </Home>
          <Air kind="day" seed={7} grass={false} />
        </g>
      );
    // Under the big tree: all the branches, big and small. An idea!
    case 6:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <FigTree x={200} y={250} s={1.4} />
            <Place x={150} y={290} s={0.42} tap={TAP.hawi}>
              <Wolf mood="wow" />
            </Place>
            <g className="fam-branch">
              <path d="M180 140 Q220 120 260 128" stroke="#FFE27A" strokeWidth={4} fill="none" strokeLinecap="round" strokeDasharray="2 8" />
            </g>
            <Sparkles x={150} y={170} r={40} delay={2} n={6} />
            <Sign x={190} y={190} kind="!" delay={2.4} color="#F5B21E" />
          </Yard>
          <Air kind="day" seed={8} />
        </g>
      );
    // A family tree, with a branch for everyone.
    case 7:
      return (
        <g>
          <Home id={id} time="day" wall={["#D9C8E8", "#B8A2D0"]}>
            <FamilyTree x={220} y={196} s={0.95} />
            <Place x={64} y={298} s={0.44} className="lali-hop" tap={TAP.hawi}>
              <Wolf mood="joy" wag />
            </Place>
          </Home>
          <Air kind="day" seed={9} grass={false} />
        </g>
      );
    // At English Club: "This is my family!" Wow!
    case 8:
      return (
        <g>
          <Club id={id} time="day">
            <FamilyTree x={230} y={110} s={0.8} delay={0.2} />
            <Place x={232} y={294} s={0.42} tap={TAP.hawi}>
              <Wolf mood="joy" wag arm="wave" />
            </Place>
            <Place x={120} y={292} s={0.34} tap={TAP.cub}>
              <Cub mood="wow" />
            </Place>
            <Place x={340} y={292} s={0.34} flip tap={TAP.tsehay}>
              <Tsehay mood="joy" />
            </Place>
            <Sparkles x={230} y={110} r={120} delay={1.6} n={8} />
          </Club>
          <Air kind="day" seed={10} />
        </g>
      );
    // Tsehay's family and Haben's family.
    case 9:
      return (
        <g>
          <Club id={id} time="day">
            <FriendPaper x={150} y={120} rot={-4} people={[{ color: "#FFFDF4", label: "mother" }, { color: "#FBF8F0", label: "father" }, { color: "#4A7FD0", label: "brother", size: "baby" }]} />
            <FriendPaper x={300} y={120} rot={4} people={[{ color: "#2F6FD0", label: "father" }, { color: "#7A3FA0", label: "sister" }, { color: "#E2463F", label: "sister" }]} />
            <Place x={150} y={292} s={0.42} tap={TAP.tsehay}>
              <Tsehay mood="joy" pose="wave" />
            </Place>
            <Place x={300} y={292} s={0.42} flip tap={TAP.haben}>
              <Ibex mood="joy" pose="wave" />
            </Place>
          </Club>
          <Air kind="day" seed={11} />
        </g>
      );
    // Ayan's family: Hooyo, Abdi, and Aabo who drives a truck far away.
    case 10:
      return (
        <g>
          <Club id={id} time="day">
            <FriendPaper x={250} y={118} rot={-3} people={[{ color: "#2E8A5A", label: "mother" }, { color: "#FFFFFF", label: "brother", size: "small" }, { color: "#E2463F", label: "father" }]} />
            <g transform="translate(316 154)" className="lali-pop-in" style={vars({ "--delay": "2.6s" })}>
              <rect x={-14} y={-10} width={20} height={12} rx={2} fill="#2E6AD0" />
              <rect x={6} y={-6} width={10} height={8} rx={2} fill="#F5B21E" />
              <circle cx={-8} cy={3} r={3} fill="#2A1A10" />
              <circle cx={10} cy={3} r={3} fill="#2A1A10" />
            </g>
            <Place x={250} y={294} s={0.5} tap={TAP.ayan}>
              <Camel who="ayan" mood="joy" />
            </Place>
            <Hearts spots={[[330, 170, 1.4], [344, 158, 2]]} />
          </Club>
          <Air kind="day" seed={12} />
        </g>
      );
    // Anbessa: "This is my grandmother, and this is me." Big or small, we love them all!
    case 11:
      return (
        <g>
          <Club id={id} time="day">
            <FriendPaper x={236} y={130} rot={-2} people={[{ color: "#FFFDF4", label: "grandmother", elder: true }, { color: "#F5B21E", label: "me", size: "small" }]} />
            <Place x={236} y={294} s={0.46} tap={TAP.cub}>
              <Cub mood="happy" />
            </Place>
            <Place x={140} y={292} s={0.34} tap={TAP.hawi}>
              <Wolf mood="joy" wag />
            </Place>
            <Place x={330} y={292} s={0.34} flip tap={TAP.ayan}>
              <Camel who="ayan" mood="joy" />
            </Place>
            <Hearts spots={[[180, 200, 1], [290, 196, 1.6], [236, 180, 2.2]]} s={1.3} />
          </Club>
          <Air kind="day" seed={13} />
        </g>
      );
    // At home: "This is my family, and it's just right."
    default:
      return (
        <g>
          <Home id={id} time="evening">
            <Glow x={200} y={220} r={140} color="#FFB547" strength={0.35} dur={4} />
            <g transform="translate(206 120)">
              <rect x={-36} y={-26} width={72} height={52} rx={3} fill="#8A5A3A" />
              <rect x={-31} y={-21} width={62} height={42} rx={2} fill="#FFFDF6" />
              <Doodle x={-12} y={12} k={{ color: "#FFFDF4", elder: true, delay: 0.4 }} s={0.8} />
              <Doodle x={12} y={12} k={{ color: "#F5B21E", size: "small", delay: 0.6 }} s={0.8} />
            </g>
            <Place x={170} y={292} s={0.5} tap={TAP.grandma}>
              <Grandma arm="wrap" mood="joy" />
            </Place>
            <Place x={262} y={294} s={0.42} flip tap={TAP.cub}>
              <Cub mood="joy" arm="reach" />
            </Place>
            <Hearts spots={[[214, 170, 0.6], [230, 160, 1.2], [200, 150, 1.8]]} s={1.2} />
            <BeeHover x={340} y={150} s={0.8} flip />
          </Home>
        </g>
      );
  }
}
