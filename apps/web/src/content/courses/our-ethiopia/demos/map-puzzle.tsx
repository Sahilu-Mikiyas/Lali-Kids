"use client";

import { motion } from "motion/react";
import { useId, useRef, useState, type PointerEvent as RPointerEvent, type ReactNode } from "react";

import { CityDot, EthiopiaMap, MapPeak, PLACES, RIFT_LAKES, type MapPlace } from "@/components/book/courses/our-ethiopia/kit-land";
import type { DemoProps } from "../../types";
import { DemoFrame, Feedback, Finale, Next, sound, t, type T } from "./demo-kit";

/*
  The Map Puzzle (level 1). A simplified picture-map of Ethiopia, drawn from real latitudes and
  longitudes, starts bare: just the green highlands, the sandy lowlands and the Rift Valley floor.
  The child drags (or taps, then taps the map) seven pieces into place: Lake Tana, the Blue Nile
  Falls, the Simien Mountains, the Danakil, the Rift Valley lakes, the Bale Mountains and Addis
  Ababa. Each piece that lands draws itself on the map and says one true thing about the place;
  a piece in the wrong spot gets a gentle direction ("north-west, where the Blue Nile starts"),
  and after two tries its spot glows.
*/

type Piece = { key: "tana" | "falls" | "simien" | "danakil" | "rift" | "bale" | "addis"; at: MapPlace; name: T; hint: T; fact: T };

const PIECES: Piece[] = [
  {
    key: "tana",
    at: "tana",
    name: { en: "Lake Tana", am: "ጣና ሐይቅ" },
    hint: { en: "Lake Tana is in the north-west of the highlands.", am: "ጣና ሐይቅ በደጋው ሰሜን ምዕራብ ነው።" },
    fact: { en: "Lake Tana is the biggest lake in Ethiopia. The Blue Nile, the Abay, flows out of it.", am: "ጣና የኢትዮጵያ ትልቁ ሐይቅ ነው። ዓባይ ከእሱ ይወጣል።" },
  },
  {
    key: "falls",
    at: "falls",
    name: { en: "Blue Nile Falls", am: "የጢስ ዓባይ ፏፏቴ" },
    hint: { en: "The falls are on the Abay, just a little south-east of Lake Tana.", am: "ፏፏቴው በዓባይ ላይ ነው፤ ከጣና ሐይቅ ትንሽ ወደ ደቡብ ምሥራቅ።" },
    fact: { en: "Tis Abay, \"the smoke of the Abay\": the river falls so hard its spray rises like smoke.", am: "ጢስ ዓባይ፦ ወንዙ በኃይል ስለሚወድቅ ርጭቱ እንደ ጢስ ይነሣል።" },
  },
  {
    key: "simien",
    at: "simien",
    name: { en: "Simien Mountains", am: "የሰሜን ተራሮች" },
    hint: { en: "The Simien Mountains are in the north, north-east of Lake Tana.", am: "የሰሜን ተራሮች በሰሜን ናቸው፤ ከጣና በሰሜን ምሥራቅ።" },
    fact: { en: "The Simien Mountains have Ras Dashen, the highest mountain in Ethiopia, and the walia ibex.", am: "በሰሜን ተራሮች የኢትዮጵያ ከፍተኛው ተራራ ራስ ዳሽንና ዋልያ ይገኛሉ።" },
  },
  {
    key: "danakil",
    at: "danakil",
    name: { en: "The Danakil", am: "ዳናኪል" },
    hint: { en: "The Danakil is in the far north-east, in the lowlands.", am: "ዳናኪል በሩቅ ሰሜን ምሥራቅ፣ በቆላው ውስጥ ነው።" },
    fact: { en: "The Danakil is one of the hottest places on Earth, and lower than the sea. Salt shines there like a white floor.", am: "ዳናኪል በምድር ላይ ካሉት በጣም ሞቃት ቦታዎች አንዱ ነው፤ ከባሕርም በታች ነው። ጨው እዚያ እንደ ነጭ ወለል ያበራል።" },
  },
  {
    key: "rift",
    at: "rift",
    name: { en: "Rift Valley lakes", am: "የስምጥ ሸለቆ ሐይቆች" },
    hint: { en: "The lakes lie in the long valley in the middle, south of Addis Ababa.", am: "ሐይቆቹ በመሀል ባለው ረጅም ሸለቆ ውስጥ፣ ከአዲስ አበባ በደቡብ ናቸው።" },
    fact: { en: "Down the Rift Valley lies a chain of lakes, like beads on a string: Ziway, Langano, Abijata, Shala, Hawassa, Abaya and Chamo.", am: "በስምጥ ሸለቆ ውስጥ እንደ ዶቃ የተደረደሩ ሐይቆች አሉ፦ ዝዋይ፣ ላንጋኖ፣ አብያታ፣ ሻላ፣ ሐዋሳ፣ አባያና ጫሞ።" },
  },
  {
    key: "bale",
    at: "bale",
    name: { en: "Bale Mountains", am: "የባሌ ተራሮች" },
    hint: { en: "The Bale Mountains are in the south-east highlands, east of the lakes.", am: "የባሌ ተራሮች በደቡብ ምሥራቅ ደጋ፣ ከሐይቆቹ በምሥራቅ ናቸው።" },
    fact: { en: "The Bale Mountains have a high, flat top where the red Ethiopian wolf lives.", am: "የባሌ ተራሮች ቀዩ የኢትዮጵያ ተኩላ የሚኖርበት ከፍ ያለ ጠፍጣፋ አናት አላቸው።" },
  },
  {
    key: "addis",
    at: "addis",
    name: { en: "Addis Ababa", am: "አዲስ አበባ" },
    hint: { en: "Addis Ababa is near the middle, in the highlands, just north of the lakes.", am: "አዲስ አበባ በመሀል አካባቢ፣ በደጋ ላይ፣ ከሐይቆቹ ትንሽ በሰሜን ናት።" },
    fact: { en: "Addis Ababa, \"new flower\", is the capital, high up in the highlands.", am: "«አዲስ አበባ» ዋና ከተማ ናት፤ ከፍ ብላ በደጋ ላይ ትገኛለች።" },
  },
];

const NEAR = 30;

/** Where each place's name sits, next to it on the map: [dx, dy, anchor]. */
const LABEL: Record<Piece["key"], [number, number, "start" | "end"]> = {
  tana: [-12, -6, "end"],
  falls: [10, 14, "start"],
  simien: [-14, -12, "end"],
  danakil: [16, 4, "start"],
  rift: [-22, 26, "end"],
  bale: [14, 14, "start"],
  addis: [10, -6, "start"],
};

/** How a piece looks on the map once it is in place (and, small, on its button). */
function PieceArt({ k }: { k: Piece["key"] }): ReactNode {
  switch (k) {
    case "tana":
      return <ellipse cx={0} cy={0} rx={9} ry={8.5} fill="#4FA8E0" stroke="#2F7FC0" strokeWidth={1} />;
    case "falls":
      return (
        <g>
          <rect x={-7} y={-6} width={14} height={12} fill="#E8F4FA" stroke="#3E8FD8" strokeWidth={1.4} />
          <path d="M-4 -5 v10 M0 -5 v10 M4 -5 v10" stroke="#3E8FD8" strokeWidth={1.2} />
          <circle cx={0} cy={-9} r={3} fill="#FFFFFF" stroke="#BFE4FA" />
        </g>
      );
    case "simien":
    case "bale":
      return (
        <g>
          <MapPeak x={-6} y={2} s={0.9} />
          <MapPeak x={7} y={4} s={0.7} />
        </g>
      );
    case "danakil":
      return (
        <g>
          <ellipse cx={0} cy={0} rx={13} ry={9} fill="#F4F1E6" stroke="#D8D2C0" />
          <circle cx={-3} cy={-1} r={3} fill="#E8D23A" />
          <circle cx={3} cy={2} r={2} fill="#6CC46A" />
        </g>
      );
    case "rift":
      return (
        <g>
          {RIFT_LAKES.map(([p, rx, ry, c]) => (
            <ellipse key={p} cx={PLACES[p][0] - PLACES.rift[0]} cy={PLACES[p][1] - PLACES.rift[1]} rx={rx} ry={ry} fill={c} transform={p === "abaya" ? `rotate(20 ${PLACES[p][0] - PLACES.rift[0]} ${PLACES[p][1] - PLACES.rift[1]})` : undefined} />
          ))}
        </g>
      );
    case "addis":
      return <CityDot x={0} y={0} big />;
  }
}

export default function MapPuzzle({ lang, onDone }: DemoProps) {
  const id = useId().replace(/:/g, "");
  const svgRef = useRef<SVGSVGElement>(null);
  const [placed, setPlaced] = useState<Piece["key"][]>([]);
  const [selected, setSelected] = useState<Piece["key"] | null>(null);
  const [drag, setDrag] = useState<{ key: Piece["key"]; x: number; y: number; moved: boolean } | null>(null);
  const [miss, setMiss] = useState<{ key: Piece["key"]; n: number } | null>(null);
  const [last, setLast] = useState<Piece | null>(null);
  const [finished, setFinished] = useState(false);
  const left = PIECES.filter((p) => !placed.includes(p.key));
  const done = placed.length === PIECES.length;

  const toMap = (cx: number, cy: number): [number, number] | null => {
    const svg = svgRef.current;
    const m = svg?.getScreenCTM();
    if (!svg || !m) return null;
    const r = svg.getBoundingClientRect();
    if (cx < r.left || cx > r.right || cy < r.top || cy > r.bottom) return null;
    const p = new DOMPoint(cx, cy).matrixTransform(m.inverse());
    return [p.x, p.y];
  };

  const tryPlace = (key: Piece["key"], at: [number, number] | null) => {
    if (!at) return;
    const piece = PIECES.find((p) => p.key === key)!;
    const [tx, ty] = PLACES[piece.at];
    if (Math.hypot(at[0] - tx, at[1] - ty) <= NEAR) {
      sound.good();
      setPlaced((p) => [...p, key]);
      setSelected(null);
      setMiss(null);
      setLast(piece);
    } else {
      sound.gentle();
      setMiss((m) => ({ key, n: m && m.key === key ? m.n + 1 : 1 }));
      setLast(null);
    }
  };

  const onPieceDown = (key: Piece["key"], e: RPointerEvent<HTMLButtonElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDrag({ key, x: e.clientX, y: e.clientY, moved: false });
  };
  const onPieceMove = (e: RPointerEvent<HTMLButtonElement>) => {
    setDrag((d) => (d ? { ...d, x: e.clientX, y: e.clientY, moved: d.moved || Math.hypot(e.clientX - d.x, e.clientY - d.y) > 6 } : d));
  };
  const onPieceUp = (key: Piece["key"], e: RPointerEvent<HTMLButtonElement>) => {
    const d = drag;
    setDrag(null);
    if (d && d.moved) tryPlace(key, toMap(e.clientX, e.clientY));
    else {
      sound.tap();
      setSelected((s) => (s === key ? null : key));
    }
  };
  const onMapTap = (e: RPointerEvent<SVGSVGElement>) => {
    if (selected) tryPlace(selected, toMap(e.clientX, e.clientY));
  };

  const hintPiece = miss ? PIECES.find((p) => p.key === miss.key) : null;

  return (
    <DemoFrame
      lang={lang}
      title={{ en: "The Map Puzzle", am: "የካርታ እንቆቅልሽ" }}
      goal={{ en: "Drag each piece to its place on the map of Ethiopia (or tap a piece, then tap the map).", am: "እያንዳንዱን ቁራጭ በኢትዮጵያ ካርታ ላይ ወዳለው ቦታው ጎትቱ (ወይም ቁራጩን ነክታችሁ ካርታውን ንኩ)።" }}
      step={placed.length}
      total={PIECES.length}
    >
      <div className="relative w-full overflow-hidden rounded-[28px] border-4 border-white bg-sky-soft shadow-[0_10px_30px_rgba(27,42,78,0.15)]">
        <svg ref={svgRef} viewBox="0 0 400 300" className="block h-auto w-full touch-none select-none" role="img" aria-label={t(lang, { en: "A map of Ethiopia", am: "የኢትዮጵያ ካርታ" })} onPointerUp={onMapTap} data-map="">
          <EthiopiaMap id={id} lakes={false} river={placed.includes("tana") || placed.includes("falls")} peaks={false} danakil={false} />
          {placed.map((k) => {
            const p = PIECES.find((x) => x.key === k)!;
            const [x, y] = PLACES[p.at];
            return (
              <g key={k} transform={`translate(${x} ${y})`}>
                <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 14 }}>
                  <PieceArt k={k} />
                </motion.g>
                <text x={LABEL[k][0]} y={LABEL[k][1]} textAnchor={LABEL[k][2]} fontSize={12} fontWeight={800} fill="#1B2A4E" stroke="#FFFFFF" strokeWidth={3} paintOrder="stroke" fontFamily={lang === "am" ? "var(--font-noto-ethiopic), sans-serif" : "var(--font-grandstander), sans-serif"}>
                  {t(lang, p.name)}
                </text>
              </g>
            );
          })}
          {miss && miss.n >= 2 && hintPiece && !placed.includes(hintPiece.key) && (
            <circle cx={PLACES[hintPiece.at][0]} cy={PLACES[hintPiece.at][1]} r={16} fill="none" stroke="#F5B21E" strokeWidth={3} strokeDasharray="5 4" className="lali-pulse" data-hint="" />
          )}
        </svg>
      </div>

      {finished ? (
        <Finale lang={lang} text={{ en: "You built the whole map of Ethiopia!", am: "የኢትዮጵያን ካርታ ሙሉውን ሠራችሁ!" }} onDone={onDone} color="#15803D" />
      ) : (
        <>
          {last && (
            <Feedback tone="great" action={done ? <Next onClick={() => setFinished(true)} color="#15803D">{t(lang, { en: "See my map!", am: "ካርታዬን እዩ!" })}</Next> : undefined}>
              {t(lang, last.fact)}
            </Feedback>
          )}
          {miss && hintPiece && !last && <Feedback tone="gentle">{t(lang, { en: "Not quite. ", am: "ገና ነው። " }) + t(lang, hintPiece.hint)}</Feedback>}
          {!done && (
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {left.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  data-piece={p.key}
                  className="flex min-h-14 touch-none items-center gap-2 rounded-2xl border-2 bg-white px-3 py-2 text-left font-display text-base font-extrabold leading-tight text-ink shadow-[0_4px_0_#D3E4F4]"
                  style={{ borderColor: selected === p.key ? "#15803D" : "#D3E4F4", background: selected === p.key ? "#E4F7EA" : "#FFFFFF" }}
                  onPointerDown={(e) => onPieceDown(p.key, e)}
                  onPointerMove={onPieceMove}
                  onPointerUp={(e) => onPieceUp(p.key, e)}
                  onPointerCancel={() => setDrag(null)}
                >
                  <svg width={34} height={34} viewBox="-17 -17 34 34" aria-hidden className="shrink-0">
                    <g transform={p.key === "rift" ? "scale(0.55)" : "scale(1.1)"}>
                      <PieceArt k={p.key} />
                    </g>
                  </svg>
                  <span className="min-w-0">{t(lang, p.name)}</span>
                </button>
              ))}
            </div>
          )}
          {selected && <p className="mt-2 text-center text-base text-muted">{t(lang, { en: "Now tap its place on the map.", am: "አሁን ካርታው ላይ ቦታውን ንኩ።" })}</p>}
        </>
      )}
      {drag && drag.moved && (
        <div className="pointer-events-none fixed z-50 rounded-full bg-white/90 p-1 shadow-lg" style={{ left: drag.x - 24, top: drag.y - 24 }} aria-hidden>
          <svg width={40} height={40} viewBox="-17 -17 34 34">
            <g transform={drag.key === "rift" ? "scale(0.55)" : "scale(1.1)"}>
              <PieceArt k={drag.key} />
            </g>
          </svg>
        </div>
      )}
    </DemoFrame>
  );
}
