"use client";

import { useId, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";

import { Camel, TAP } from "@/components/book/courses/values-character/kit-cast";
import { Home } from "@/components/book/courses/values-character/kit-places";
import { Ball, Cup, Hearts, Sandals, Sparkles } from "@/components/book/courses/values-character/kit-props";
import { Place } from "@/components/book/scenery";
import type { DemoProps } from "../../types";
import { DemoFrame, Feedback, Finale, sound, Stage, t, type T } from "./demo-kit";

/*
  Everything Has a Home (level 2: taking care of your things), from "Ayan's Red Sandals".
  Ayan's room is in a muddle. Six things lie on the floor; each has a home: the shoe shelf, two
  hooks, the cup shelf, the toy basket and the book box. Drag a thing to its home, or tap it and
  then tap its home. A wrong home is never a telling-off: little brother Abdi giggles, the right
  home glows, and the thing goes back to try again.
*/

type ItemId = "sandals" | "bag" | "scarf" | "cup" | "ball" | "book";
type HomeId = "shoes" | "hookA" | "hookB" | "cups" | "toys" | "books";

const HOMES: Record<HomeId, { x: number; y: number; name: T }> = {
  shoes: { x: 72, y: 268, name: { en: "the shoe shelf", am: "የጫማ መደርደሪያው" } },
  hookA: { x: 150, y: 112, name: { en: "the hook", am: "መስቀያው" } },
  hookB: { x: 204, y: 112, name: { en: "the hook", am: "መስቀያው" } },
  cups: { x: 300, y: 156, name: { en: "the cup shelf", am: "የስኒ መደርደሪያው" } },
  toys: { x: 336, y: 270, name: { en: "the toy basket", am: "የአሻንጉሊት ቅርጫቱ" } },
  books: { x: 240, y: 272, name: { en: "the book box", am: "የመጽሐፍ ሳጥኑ" } },
};

const ITEMS: Record<ItemId, { start: [number, number]; home: HomeId[]; name: T; done: T }> = {
  sandals: { start: [150, 236], home: ["shoes"], name: { en: "The sandals", am: "ጫማዎቹ" }, done: { en: "Sandals live on the shoe shelf, by the door.", am: "ጫማዎች የሚኖሩት በበሩ አጠገብ ባለው የጫማ መደርደሪያ ላይ ነው።" } },
  bag: { start: [290, 226], home: ["hookA", "hookB"], name: { en: "The school bag", am: "የትምህርት ቤት ቦርሳው" }, done: { en: "The school bag hangs on its hook, ready for tomorrow.", am: "የትምህርት ቤት ቦርሳው ለነገ ተዘጋጅቶ በመስቀያው ላይ ተሰቀለ።" } },
  scarf: { start: [116, 222], home: ["hookA", "hookB"], name: { en: "The scarf", am: "ሻርፑ" }, done: { en: "The scarf hangs on a hook, so it won't get dusty.", am: "ሻርፑ አቧራ እንዳይነካው በመስቀያው ላይ ተሰቀለ።" } },
  cup: { start: [196, 250], home: ["cups"], name: { en: "The cup", am: "ስኒው" }, done: { en: "The cup goes back on the cup shelf, safe from feet.", am: "ስኒው ከእግር ርቆ ወደ ስኒ መደርደሪያው ተመለሰ።" } },
  ball: { start: [262, 250], home: ["toys"], name: { en: "The ball", am: "ኳሱ" }, done: { en: "The ball rolls into the toy basket. Bounce!", am: "ኳሱ ወደ አሻንጉሊት ቅርጫቱ ገባ። ዝልል!" } },
  book: { start: [330, 236], home: ["books"], name: { en: "The book", am: "መጽሐፉ" }, done: { en: "The book sleeps in the book box, with its friends.", am: "መጽሐፉ ከጓደኞቹ ጋር በመጽሐፍ ሳጥኑ ውስጥ ተኛ።" } },
};

const ORDER: ItemId[] = ["sandals", "bag", "scarf", "cup", "ball", "book"];

function ItemShape({ id }: { id: ItemId }): ReactNode {
  switch (id) {
    case "sandals":
      return (
        <g transform="rotate(90)">
          <Sandals x={0} y={0} s={0.9} />
        </g>
      );
    case "bag":
      return (
        <g>
          <path d="M-8 -16 Q0 -26 8 -16" stroke="#1E4FA8" strokeWidth={3} fill="none" />
          <rect x={-14} y={-16} width={28} height={30} rx={6} fill="#2F6FD0" />
          <rect x={-9} y={-4} width={18} height={10} rx={3} fill="#FFD233" />
        </g>
      );
    case "scarf":
      return (
        <g>
          <path d="M-6 -16 Q-16 6 -8 18 L4 18 Q10 2 6 -16Z" fill="#F08A2A" />
          <g fill="#FFE27A">
            <circle cx={-4} cy={-6} r={2} />
            <circle cx={-2} cy={6} r={2} />
          </g>
        </g>
      );
    case "cup":
      return <Cup x={0} y={8} s={1.8} full={false} />;
    case "ball":
      return <Ball x={0} y={0} s={1.3} />;
    case "book":
      return (
        <g>
          <rect x={-14} y={-10} width={28} height={20} rx={2} fill="#D63B72" />
          <rect x={-12} y={-8} width={24} height={16} rx={1} fill="#FFF6DC" />
          <path d="M0 -8 V8" stroke="#D63B72" strokeWidth={2} />
          <path d="M-9 -3 h6 M-9 1 h6 M3 -3 h6 M3 1 h6" stroke="#C9B89A" strokeWidth={1} />
        </g>
      );
  }
}

function HomeShape({ id, glow }: { id: HomeId; glow: boolean }) {
  const { x, y } = HOMES[id];
  return (
    <g transform={`translate(${x} ${y})`}>
      {glow && <circle r={34} fill="#FFE27A" opacity={0.7} className="lali-pulse" />}
      {id === "shoes" && (
        <g>
          <ellipse cx={-20} cy={8} rx={9} ry={6} fill="#9C98A6" />
          <ellipse cx={20} cy={8} rx={9} ry={6} fill="#8E8AA0" />
          <rect x={-34} y={-2} width={68} height={7} rx={3} fill="#9A6236" />
        </g>
      )}
      {(id === "hookA" || id === "hookB") && (
        <g>
          <rect x={-3} y={-8} width={6} height={10} fill="#8A5A3A" />
          <path d="M0 2 Q0 10 6 10" stroke="#8A5A3A" strokeWidth={3} fill="none" strokeLinecap="round" />
        </g>
      )}
      {id === "cups" && <rect x={-36} y={6} width={72} height={6} rx={2} fill="#8A5A3A" />}
      {id === "toys" && (
        <g>
          <path d="M-28 -12 L-22 14 L22 14 L28 -12Z" fill="#D9A04A" />
          <path d="M-27 -2 H27 M-25 6 H25" stroke="#E2463F" strokeWidth={2} />
        </g>
      )}
      {id === "books" && (
        <g>
          <rect x={-24} y={-10} width={48} height={24} rx={3} fill="#9A6236" />
          <rect x={-20} y={-14} width={6} height={10} fill="#2F6FD0" />
          <rect x={-12} y={-16} width={6} height={12} fill="#2FA35A" />
        </g>
      )}
    </g>
  );
}

/** Where a placed thing sits on its home. */
function restAt(id: ItemId, home: HomeId): [number, number] {
  const h = HOMES[home];
  if (home === "hookA" || home === "hookB") return [h.x + 4, h.y + 24];
  if (home === "cups") return [h.x + (id === "cup" ? 0 : 0), h.y - 4];
  if (home === "shoes") return [h.x, h.y - 12];
  if (home === "toys") return [h.x, h.y - 10];
  return [h.x, h.y - 18];
}

export default function EverythingHasAHome({ lang, onDone }: DemoProps) {
  const id = useId().replace(/:/g, "");
  const svgBox = useRef<HTMLDivElement>(null);
  const [placed, setPlaced] = useState<Partial<Record<ItemId, HomeId>>>({});
  const [selected, setSelected] = useState<ItemId | null>(null);
  const [drag, setDrag] = useState<{ id: ItemId; x: number; y: number; moved: boolean } | null>(null);
  const [msg, setMsg] = useState<{ tone: "great" | "gentle"; text: string } | null>(null);
  const [hint, setHint] = useState<HomeId | null>(null);
  const [finished, setFinished] = useState(false);
  const count = Object.keys(placed).length;

  const toSvg = (e: { clientX: number; clientY: number }): [number, number] => {
    const svg = svgBox.current?.querySelector("svg");
    const m = svg?.getScreenCTM();
    if (!svg || !m) return [0, 0];
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
    return [p.x, p.y];
  };

  const freeHook = (except?: ItemId): HomeId => {
    const used = new Set(Object.entries(placed).filter(([k]) => k !== except).map(([, v]) => v));
    return used.has("hookA") ? "hookB" : "hookA";
  };

  const tryHome = (item: ItemId, home: HomeId) => {
    const it = ITEMS[item];
    const isTaken = (h: HomeId) => Object.entries(placed).some(([k, v]) => k !== item && v === h);
    // Two things share the two hooks: dropped on a taken hook, it goes on the free one.
    const target = it.home.includes(home) ? (isTaken(home) ? it.home.find((h) => !isTaken(h)) : home) : undefined;
    if (target) {
      const next = { ...placed, [item]: target };
      setPlaced(next);
      setSelected(null);
      setHint(null);
      sound.good();
      setMsg({ tone: "great", text: t(lang, it.done) });
      if (Object.keys(next).length === ORDER.length) setTimeout(() => setFinished(true), 900);
    } else {
      sound.gentle();
      setSelected(null);
      const right = it.home.length > 1 ? freeHook(item) : it.home[0];
      setHint(right);
      setMsg({
        tone: "gentle",
        text: t(lang, {
          en: `Abdi giggles: "Does that live in ${HOMES[home].name.en}?" ${it.name.en} lives somewhere else. Look for the glow!`,
          am: `አብዲ ሳቀ፦ «እሱ የሚኖረው ${HOMES[home].name.am} ውስጥ ነው?» ${it.name.am} የሚኖሩበት ሌላ ቦታ ነው። የሚያበራውን ፈልጉ!`,
        }),
      });
    }
  };

  const nearestHome = (x: number, y: number): HomeId | null => {
    let best: HomeId | null = null;
    let bestD = 46;
    (Object.keys(HOMES) as HomeId[]).forEach((h) => {
      const d = Math.hypot(HOMES[h].x - x, HOMES[h].y - y);
      if (d < bestD) {
        bestD = d;
        best = h;
      }
    });
    return best;
  };

  const onItemDown = (item: ItemId) => (e: ReactPointerEvent<SVGGElement>) => {
    if (placed[item]) return;
    e.preventDefault();
    (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
    const [x, y] = toSvg(e);
    setDrag({ id: item, x, y, moved: false });
  };
  const onMove = (e: ReactPointerEvent<SVGGElement>) => {
    if (!drag) return;
    const [x, y] = toSvg(e);
    const moved = drag.moved || Math.hypot(x - ITEMS[drag.id].start[0], y - ITEMS[drag.id].start[1]) > 12;
    setDrag({ ...drag, x, y, moved });
  };
  const onUp = (e: ReactPointerEvent<SVGGElement>) => {
    if (!drag) return;
    const [x, y] = toSvg(e);
    const item = drag.id;
    setDrag(null);
    if (!drag.moved) {
      // A tap: pick it up (tap its home next).
      sound.tap();
      setSelected(selected === item ? null : item);
      return;
    }
    const home = nearestHome(x, y);
    if (home) tryHome(item, home);
  };
  const onHomeTap = (home: HomeId) => {
    if (selected) tryHome(selected, home);
  };

  return (
    <DemoFrame lang={lang} title={{ en: "Everything Has a Home", am: "ሁሉም ነገር ቤት አለው" }} goal={{ en: "Help Ayan tidy up: drag each thing to its home (or tap it, then tap its home).", am: "አያንን እንድታስተካክል እርዳት፦ እያንዳንዱን ነገር ወደ ቤቱ ጎትቱ (ወይም ንኩትና ቤቱን ንኩ)።" }} step={count} total={ORDER.length} color="#E86A2A">
      <div ref={svgBox}>
        <Stage label={t(lang, { en: "Ayan's room", am: "የአያን ክፍል" })}>
          <g onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={() => setDrag(null)}>
            <rect width={400} height={300} fill="transparent" />
            <Home id={id} time="day" shelf={false} wall={["#9FD8D0", "#7FC0B8"]} />
            {(Object.keys(HOMES) as HomeId[]).map((h) => (
              <g key={h} data-home={h} onClick={() => onHomeTap(h)} style={{ cursor: selected ? "pointer" : undefined }}>
                <circle cx={HOMES[h].x} cy={HOMES[h].y} r={34} fill="transparent" />
                <HomeShape id={h} glow={hint === h} />
              </g>
            ))}
            <Place x={370} y={300} s={0.4} flip className={msg?.tone === "gentle" ? "lali-hop" : undefined} tap={TAP.ayan}>
              <Camel who="abdi" mood={msg?.tone === "gentle" ? "joy" : "happy"} />
            </Place>
            {finished && (
              <Place x={44} y={300} s={0.62} tap={TAP.mama}>
                <Camel who="hooyo" mood="joy" />
              </Place>
            )}
            {ORDER.map((item) => {
              const home = placed[item];
              const [x, y] = drag?.id === item ? [drag.x, drag.y] : home ? restAt(item, home) : ITEMS[item].start;
              return (
                <g key={item} data-item={item} transform={`translate(${Math.round(x)} ${Math.round(y)})`} onPointerDown={onItemDown(item)} style={{ cursor: home ? "default" : "grab", touchAction: "none" }}>
                  {selected === item && <circle r={24} fill="none" stroke="#2F6FD0" strokeWidth={3} strokeDasharray="5 4" className="lali-spin" style={{ animationDuration: "6s" }} />}
                  <circle r={24} fill="transparent" />
                  <g className={!home && drag?.id !== item ? "lali-float" : undefined} style={{ animationDelay: `${-ORDER.indexOf(item) * 0.4}s` }}>
                    <ItemShape id={item} />
                  </g>
                </g>
              );
            })}
            {finished && <Sparkles x={200} y={150} r={130} delay={0.1} n={10} />}
            {finished && <Hearts spots={[[80, 160, 0.3], [110, 140, 1]]} />}
          </g>
        </Stage>
      </div>
      {finished ? (
        <Finale lang={lang} text={{ en: "Everything is home! Where does it live? Take it home!", am: "ሁሉም ቤቱ ገባ! ቤቱ የት ነው? ወደ ቤቱ እንመልሰው!" }} onDone={onDone} color="#E86A2A" />
      ) : msg ? (
        <Feedback tone={msg.tone}>{msg.text}</Feedback>
      ) : (
        <p className="mt-4 text-lg text-muted">{t(lang, { en: "Tip: Abdi tidied a sandal into the bread basket once. You can do better!", am: "ፍንጭ፦ አብዲ አንድ ጊዜ ጫማ በዳቦ ቅርጫት ውስጥ አስቀምጦ ነበር። እናንተ ከዚያ የተሻለ ትችላላችሁ!" })}</p>
      )}
    </DemoFrame>
  );
}
