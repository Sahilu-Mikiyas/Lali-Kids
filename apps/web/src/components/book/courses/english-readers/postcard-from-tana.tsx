"use client";

import "./postcard-from-tana.css";

import { useId, type ReactNode } from "react";

import { Mountains, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { FONT, Grandma, Gugu, Papa, TAP, Tsehay } from "./cast";
import { Label } from "./more";
import { Home, SkyFor, TownStreet } from "./places";
import { Hearts, Sign, Sparkles } from "./props";
import { Thing } from "./things";

/*
  "A Postcard from Lake Tana": one living picture per page (12 pages). Lake Tana at Bahir Dar,
  with a papyrus tankwa, a pelican and the Blue Nile flowing away; and the postcard itself, drawn
  big: the lake picture on the front, and on the back the message on the left (Dear Gugu, three
  sentences, Love, Tsehay) and the address and stamp on the right.
  Keyframes: ./kit.css, ./more.css and ./postcard-from-tana.css (pft-*).
*/

const ANDIKA = "var(--font-andika), sans-serif";
type M = "happy" | "joy" | "wow" | "worried" | "sad";

const TsehayAt = ({ x = 130, y = 294, s = 0.42, mood = "happy" as M, pose = "sit" as "sit" | "wave" | "point" | "hop" | "no", flip = false }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.tsehay}>
    <Tsehay mood={mood} pose={pose} />
  </Place>
);
const PapaAt = ({ x = 300, y = 292, s = 0.46, mood = "happy" as "happy" | "joy" }) => (
  <Place x={x} y={y} s={s} flip tap={TAP.papa}>
    <Papa mood={mood} />
  </Place>
);

/** Lake Tana: the wide water, far hills, papyrus and an optional tankwa and pelican. */
function Lake({ id, children, boat = true, pelican = false }: { id: string; children?: ReactNode; boat?: boolean; pelican?: boolean }) {
  return (
    <>
      <SkyFor id={id} time="day" />
      <Mountains far="#B7C6E6" mid="#9DB0D8" />
      <rect y={170} width={400} height={80} fill="#4E9AC8" />
      <path d="M0 186 Q100 180 200 188 T400 184" stroke="#BFE6FA" strokeWidth={2} fill="none" className="pft-ripple" />
      <path d="M0 214 Q100 206 200 214 T400 210" stroke="#BFE6FA" strokeWidth={2} fill="none" className="pft-ripple" style={vars({ "--delay": "-1s" })} />
      {boat && (
        <g transform="translate(250 196)">
          <g className="pft-drift">
            <path d="M-40 -6 Q-30 10 0 10 Q30 10 44 -4 Q48 -12 42 -14 Q34 2 0 2 Q-30 2 -36 -12 Q-44 -14 -40 -6Z" fill="#C9A24A" stroke="#2A1A10" strokeWidth={1.6} />
            <path d="M-30 -8 V6 M28 -8 V6" stroke="#6A8A3A" strokeWidth={3} />
          </g>
        </g>
      )}
      {pelican && (
        <g transform="translate(130 196)">
          <g className="enr-bob">
            <Thing id="pelican" s={0.6} />
          </g>
        </g>
      )}
      <path d="M-10 244 Q120 236 230 242 T410 238 L410 310 L-10 310Z" fill="#9CCB6E" />
      {children}
    </>
  );
}

/** The postcard, big: `side` front (the lake) or back (message and address). */
function Card({ x = 200, y = 110, side = "back", lines = [], address = true, stamp = true, delay = 0.3, s = 1 }: { x?: number; y?: number; side?: "front" | "back"; lines?: string[]; address?: boolean; stamp?: boolean; delay?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="wiggle" sound="pop">
          <rect x={-120} y={-72} width={240} height={144} rx={6} fill="#FFFDF6" stroke="#B9A58C" strokeWidth={2} />
          {side === "front" ? (
            <g>
              <rect x={-112} y={-64} width={224} height={128} rx={4} fill="#9FD4FF" />
              <rect x={-112} y={-4} width={224} height={68} fill="#4E9AC8" />
              <path d="M-112 -4 Q-60 -26 0 -10 T112 -14 V-4 H-112Z" fill="#8FCB80" />
              <text y={50} fontSize={18} fontFamily={FONT} fontWeight={900} fill="#FFFFFF" textAnchor="middle">
                Lake Tana
              </text>
            </g>
          ) : (
            <g>
              <path d="M18 -62 V62" stroke="#B9A58C" strokeWidth={1.6} />
              {lines.map((l, i) => (
                <text key={i} x={-110} y={-48 + i * 16} fontSize={10.5} fontFamily={ANDIKA} fontWeight={700} fill="#2A3A7A">
                  {l}
                </text>
              ))}
              {stamp && (
                <g transform="translate(92 -44)">
                  <rect x={-14} y={-16} width={28} height={32} fill="#E8413B" stroke="#FFFDF6" strokeWidth={2} strokeDasharray="3 2" />
                  <path d="M-8 6 L0 -8 L8 6Z" fill="#FFD233" />
                </g>
              )}
              {address && (
                <g fontSize={10} fontFamily={ANDIKA} fontWeight={700} fill="#2A3A7A">
                  <text x={28} y={10}>Gugu</text>
                  <text x={28} y={26}>Grandma&apos;s house</text>
                  <text x={28} y={42}>Ethiopia</text>
                </g>
              )}
              {!address && (
                <g stroke="#D8C8A8" strokeWidth={1.4}>
                  <path d="M28 12 H108 M28 28 H108 M28 44 H108" />
                </g>
              )}
            </g>
          )}
        </Tappable>
      </g>
    </g>
  );
}

const MESSAGE = ["Dear Gugu,", "I am at Lake Tana.", "I saw a tankwa!", "A pelican ate a fish!", "The Blue Nile starts here.", "See you soon!", "Love, Tsehay"];

export default function PostcardFromTana({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // At Bahir Dar, by Lake Tana. "I'll send Gugu a postcard!"
    case 0:
      return (
        <g>
          <Lake id={id}>
            <Card x={200} y={90} side="front" s={0.55} delay={1} />
            <TsehayAt x={140} mood="joy" pose="wave" />
            <PapaAt x={270} mood="joy" />
          </Lake>
        </g>
      );
    // The back: message on the left, address and stamp on the right.
    case 1:
      return (
        <g>
          <Lake id={id} boat={false}>
            <Card x={200} y={110} lines={[]} address={false} stamp={false} />
            <Label x={130} y={30} text="message" delay={1} size={13} />
            <Label x={270} y={30} text="address + stamp" delay={1.4} size={13} />
          </Lake>
        </g>
      );
    // "Today we woke up and had breakfast and then…" The card is full!
    case 2:
      return (
        <g>
          <Lake id={id} boat={false}>
            <Card x={200} y={110} lines={["Today we woke up and", "had breakfast and then", "we washed and then we", "had more breakfast and", "then we walked and then", "we", "…"]} address={false} stamp={false} />
            <TsehayAt x={100} y={298} s={0.36} mood="worried" />
            <Sign x={110} y={200} kind="!" delay={1.4} color="#E8413B" />
          </Lake>
        </g>
      );
    // "A postcard is small. Choose the three best things."
    case 3:
      return (
        <g>
          <Lake id={id}>
            <Label x={200} y={70} text="three best things" delay={0.8} size={16} />
            <TsehayAt x={140} mood="happy" />
            <PapaAt x={270} mood="joy" />
          </Lake>
        </g>
      );
    // One: the tankwa. Two: the pelican. Three: the Blue Nile.
    case 4:
      return (
        <g>
          <Lake id={id} pelican>
            <Label x={250} y={160} text="1 tankwa" delay={0.4} size={13} />
            <Label x={130} y={150} text="2 pelican" delay={1} size={13} />
            <g transform="translate(330 220)">
              <path d="M-30 -10 Q0 0 20 30" stroke="#3E7AA8" strokeWidth={14} fill="none" />
            </g>
            <Label x={310} y={100} text="3 Blue Nile" delay={1.6} size={13} />
          </Lake>
        </g>
      );
    // "Dear Gugu," at the top.
    case 5:
      return (
        <g>
          <Lake id={id} boat={false}>
            <Card x={200} y={110} lines={MESSAGE.slice(0, 1)} address={false} stamp={false} />
            <Label x={120} y={210} text="Dear + name + ," delay={1.2} size={13} />
          </Lake>
        </g>
      );
    // The three best things.
    case 6:
      return (
        <g>
          <Lake id={id} boat={false}>
            <Card x={200} y={110} lines={MESSAGE.slice(0, 5)} address={false} stamp={false} />
            <TsehayAt x={330} y={298} s={0.3} mood="joy" flip />
          </Lake>
        </g>
      );
    // "See you soon!" "Love, Tsehay". The address and the stamp.
    case 7:
      return (
        <g>
          <Lake id={id} boat={false}>
            <Card x={200} y={110} lines={MESSAGE} />
            <Sparkles x={292} y={66} r={20} delay={1} n={5} />
          </Lake>
        </g>
      );
    // The post office: "Fly, postcard, fly!"
    case 8:
      return (
        <g>
          <TownStreet id={id}>
            <g transform="translate(240 250)">
              <rect x={-20} y={-60} width={40} height={60} rx={6} fill="#F5B21E" stroke="#2A1A10" strokeWidth={2} />
              <rect x={-12} y={-46} width={24} height={5} rx={2} fill="#2A1A10" />
            </g>
            <g transform="translate(240 200)">
              <g className="pft-post">
                <Thing id="postcard" s={0.4} />
              </g>
            </g>
            <TsehayAt x={160} y={296} mood="joy" pose="point" />
            <PapaAt x={320} y={294} mood="joy" />
          </TownStreet>
        </g>
      );
    // A week later, a postcard for Gugu! "Read it with me!"
    case 9:
      return (
        <g>
          <Home id={id} time="day">
            <g transform="translate(220 150)">
              <g className="pft-wave">
                <Thing id="postcard" s={0.6} />
              </g>
            </g>
            <Place x={160} y={294} s={0.42} tap={TAP.gugu}>
              <Gugu mood="wow" pose="wave" />
            </Place>
            <Place x={300} y={292} s={0.46} flip tap={TAP.grandma}>
              <Grandma arm="clap" mood="joy" />
            </Place>
          </Home>
        </g>
      );
    // "A pelican ate a big fish!" Gugu writes back.
    case 10:
      return (
        <g>
          <Home id={id} time="evening">
            <Card x={200} y={100} lines={["Dear Tsehay,", "I miss you.", "Bring me a fish!", "Love, Gugu"]} address={false} stamp={false} s={0.85} />
            <Place x={140} y={294} s={0.42} tap={TAP.gugu}>
              <Gugu mood="joy" pose="point" />
            </Place>
            <Hearts spots={[[200, 200, 1.4], [216, 186, 1.8]]} />
          </Home>
        </g>
      );
    // Dear…, three best things, Love…!
    default:
      return (
        <g>
          <Lake id={id}>
            <Label x={110} y={60} text="Dear…," delay={0.4} size={15} />
            <Label x={210} y={80} text="three best things" delay={0.8} size={15} rot={4} />
            <Label x={300} y={60} text="Love…" delay={1.2} size={15} />
            <TsehayAt x={150} mood="joy" pose="wave" />
            <PapaAt x={270} mood="joy" />
          </Lake>
        </g>
      );
  }
}
