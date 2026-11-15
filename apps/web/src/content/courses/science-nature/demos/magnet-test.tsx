"use client";

import { Magnet, Small, type SmallThing } from "@/components/book/courses/science-nature/kit-forces";
import type { DemoProps } from "../../types";
import { Rounds, type Option, type Round } from "./rounds-kit";

/*
  Click! Will It Stick? (level 6: magnets). Like Tsehay testing her magnet: for each thing, will
  the magnet pull it? A steel nail (yes), a wooden spoon (no), a steel paper clip (yes), a plastic
  cup (no), an aluminium pot (no: not every metal), a steel needle (yes), and paper (no). Then:
  can a magnet pull a clip through paper (yes). Magnets pull iron and steel.
*/

const YES: Option = { key: "yes", label: { en: "Click! It sticks", am: "ቅጭ! ይጣበቃል" } };
const NO: Option = { key: "no", label: { en: "No, it doesn't", am: "አይ፣ አይጣበቅም" } };

/** The magnet above the thing; once solved, the thing jumps up to it (or stays put). */
function Test({ kind, sticks, ok }: { kind: SmallThing; sticks: boolean; ok: boolean }) {
  const up = ok && sticks;
  return (
    <g>
      <rect width={400} height={300} fill={ok ? (sticks ? "#FFE8E8" : "#EAF0F6") : "#F4EBD8"} />
      <rect x={100} y={240} width={200} height={10} rx={3} fill="#A8743A" />
      <Magnet x={200} y={80} s={2.4} />
      <Small kind={kind} x={200} y={up ? 140 : 226} s={2.6} rot={up && (kind === "nail" || kind === "needle" || kind === "clip") ? 90 : 0} />
    </g>
  );
}

type Item = { kind: SmallThing; name: { en: string; am: string }; sticks: boolean; why: { en: string; am: string } };

const ITEMS: Item[] = [
  { kind: "nail", name: { en: "a steel nail", am: "የአረብ ብረት ሚስማር" }, sticks: true, why: { en: "Nails are steel, and magnets pull steel.", am: "ሚስማር አረብ ብረት ነው፤ ማግኔትም አረብ ብረትን ይስባል።" } },
  { kind: "spoon-wood", name: { en: "a wooden spoon", am: "የእንጨት ማንኪያ" }, sticks: false, why: { en: "Wood isn't iron or steel, so the magnet can't pull it.", am: "እንጨት ብረት ወይም አረብ ብረት አይደለም፤ ስለዚህ ማግኔቱ ሊስበው አይችልም።" } },
  { kind: "clip", name: { en: "a paper clip", am: "የወረቀት ማያያዣ" }, sticks: true, why: { en: "Paper clips are made of steel wire. Click!", am: "የወረቀት ማያያዣ ከአረብ ብረት ሽቦ ይሠራል። ቅጭ!" } },
  { kind: "cup-plastic", name: { en: "a plastic cup", am: "የፕላስቲክ ኩባያ" }, sticks: false, why: { en: "Plastic doesn't stick to magnets.", am: "ፕላስቲክ ከማግኔት ጋር አይጣበቅም።" } },
  { kind: "pot-alu", name: { en: "a shiny aluminium pot", am: "የሚያብረቀርቅ የአሉሚኒየም ድስት" }, sticks: false, why: { en: "It's metal, but aluminium isn't pulled by magnets. Not every metal sticks!", am: "ብረት ነው፤ ግን ማግኔት አሉሚኒየምን አይስበውም። ሁሉም ብረት አይጣበቅም!" } },
  { kind: "needle", name: { en: "a sewing needle", am: "የስፌት መርፌ" }, sticks: true, why: { en: "Needles are steel. That's how Tsehay found Grandma's needle!", am: "መርፌ አረብ ብረት ነው። ፀሐይ የአያቷን መርፌ ያገኘችው በዚህ ነው!" } },
  { kind: "paper", name: { en: "a sheet of paper", am: "ወረቀት" }, sticks: false, why: { en: "Paper doesn't stick, but a magnet can pull a clip right through it!", am: "ወረቀት አይጣበቅም፤ ግን ማግኔት በወረቀቱ ውስጥ አልፎ ማያያዣን ሊስብ ይችላል!" } },
];

const ROUNDS: Round[] = ITEMS.map((it) => ({
  prompt: { en: `Will the magnet pull ${it.name.en}?`, am: `ማግኔቱ ${it.name.am} ይስባል?` },
  right: it.sticks ? "yes" : "no",
  options: [YES, NO],
  why: it.why,
  scene: (ok) => <Test kind={it.kind} sticks={it.sticks} ok={ok} />,
}));

export default function MagnetTest({ lang, onDone }: DemoProps) {
  return (
    <Rounds
      lang={lang}
      title={{ en: "Click! Will It Stick?", am: "ቅጭ! ይጣበቃል?" }}
      goal={{ en: "Guess which things a magnet pulls.", am: "ማግኔት የትኞቹን ነገሮች እንደሚስብ ገምቱ።" }}
      rounds={ROUNDS}
      hint={{ en: "Think: is it made of iron or steel? Only those stick.", am: "አስቡ፦ ከብረት ወይም ከአረብ ብረት የተሠራ ነው? የሚጣበቁት እነዚያ ብቻ ናቸው።" }}
      finale={{ en: "Magnets pull iron and steel. Click!", am: "ማግኔት ብረትንና አረብ ብረትን ይስባል። ቅጭ!" }}
      end={<Test kind="nail" sticks ok />}
      onDone={onDone}
    />
  );
}
