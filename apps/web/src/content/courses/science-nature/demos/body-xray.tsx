"use client";

import { useState } from "react";

import { BodyChart, type BodyLayer } from "@/components/book/courses/science-nature/kit-body";
import type { DemoProps } from "../../types";
import { DemoFrame, Feedback, Finale, Next, sound, Stage, t, type T } from "./demo-kit";

/*
  The X-ray Explorer (level 2: the skeleton, muscles and what's inside). First, look through the
  four layers of a child's body (skin, bones, muscles, inside), each with one true fact. Then find
  six parts by tapping them on the picture: the skull, the ribs, a knee joint, the arm muscle that
  bends the elbow, the heart and the brain. The picture is a person facing us, so the heart is a
  little to the picture's right of the middle.
*/

const LAYERS: { key: BodyLayer; label: T; fact: T }[] = [
  { key: "skin", label: { en: "Skin", am: "ቆዳ" }, fact: { en: "Skin covers and protects your whole body, and feels touch, warm and cold.", am: "ቆዳ መላ ሰውነታችሁን ይሸፍናል፣ ይጠብቃል፤ መነካትን፣ ሙቀትንና ቅዝቃዜን ይሰማል።" } },
  { key: "bones", label: { en: "Bones", am: "አጥንቶች" }, fact: { en: "Your skeleton holds you up and protects your brain, heart and lungs. A grown-up has 206 bones.", am: "አጽማችሁ ያቆማችኋል፤ አንጎላችሁን፣ ልባችሁንና ሳምባችሁን ይጠብቃል። አንድ ትልቅ ሰው 206 አጥንቶች አሉት።" } },
  { key: "muscles", label: { en: "Muscles", am: "ጡንቻዎች" }, fact: { en: "Muscles are joined to your bones and pull them to move you.", am: "ጡንቻዎች ከአጥንቶቻችሁ ጋር ተያይዘው እንድትንቀሳቀሱ ይጎትቷቸዋል።" } },
  { key: "inside", label: { en: "Inside", am: "ውስጥ" }, fact: { en: "Inside are your brain (thinking), lungs (breathing), heart (pumping blood) and stomach (food).", am: "ውስጥ አንጎላችሁ (ማሰብ)፣ ሳምባችሁ (መተንፈስ)፣ ልባችሁ (ደም መግፋት)ና ሆዳችሁ (ምግብ) አሉ።" } },
];

type Part = "skull" | "ribs" | "knee" | "arm" | "heart" | "brain" | "stomach";

/** Where each part is on the picture (the chart at x 200, y 292, scale 1.38). */
const SPOT: Record<Part, [number, number, number][]> = {
  skull: [[200, 52, 34]],
  brain: [[200, 46, 30]],
  ribs: [[200, 138, 36]],
  knee: [[174, 245, 16], [226, 245, 16]],
  arm: [[146, 128, 16], [254, 128, 16]],
  heart: [[209, 143, 15]],
  stomach: [[207, 180, 18]],
};

const FIND: { layer: BodyLayer; prompt: T; part: Part; parts: Part[]; fact: T }[] = [
  { layer: "bones", prompt: { en: "Tap the bone that protects your brain.", am: "አንጎላችሁን የሚጠብቀውን አጥንት ንኩ።" }, part: "skull", parts: ["skull", "ribs", "knee"], fact: { en: "The skull: a hard helmet of bone.", am: "የራስ ቅል፦ ጠንካራ የአጥንት ቆብ።" } },
  { layer: "bones", prompt: { en: "Tap the bones that keep your heart and lungs safe.", am: "ልባችሁንና ሳምባችሁን የሚጠብቁትን አጥንቶች ንኩ።" }, part: "ribs", parts: ["skull", "ribs", "knee"], fact: { en: "The ribs: a cage round your heart and lungs.", am: "የጎድን አጥንቶች፦ በልባችሁና በሳምባችሁ ዙሪያ ያለ ቤት።" } },
  { layer: "bones", prompt: { en: "Tap a knee: a joint, where your leg bends.", am: "ጉልበት ንኩ፦ እግራችሁ የሚታጠፍበት መገጣጠሚያ።" }, part: "knee", parts: ["skull", "ribs", "knee"], fact: { en: "The knee joint, where two leg bones meet, like a door hinge.", am: "ሁለት የእግር አጥንቶች የሚገናኙበት የጉልበት መገጣጠሚያ፣ እንደ በር ማጠፊያ።" } },
  { layer: "muscles", prompt: { en: "Tap the muscle on top of the arm that bends your elbow.", am: "ክርናችሁን የሚያጥፈውን በክንድ ላይ ያለውን ጡንቻ ንኩ።" }, part: "arm", parts: ["arm", "knee"], fact: { en: "Bend your arm and feel it go fat and hard: it's pulling!", am: "ክንዳችሁን አጥፉና ሲወፍርና ሲጠነክር ይሰማችሁ፦ እየጎተተ ነው!" } },
  { layer: "inside", prompt: { en: "Tap the heart.", am: "ልቡን ንኩ።" }, part: "heart", parts: ["heart", "brain", "stomach"], fact: { en: "The heart: a muscle as big as your fist, behind the ribs, a little to the person's left.", am: "ልብ፦ የጡጫችሁን ያህል የሆነ ጡንቻ፣ ከጎድን አጥንቶች ጀርባ፣ ትንሽ ወደ ሰውየው ግራ።" } },
  { layer: "inside", prompt: { en: "Tap the brain, where your senses' messages go.", am: "የስሜቶቻችሁ መልእክቶች የሚሄዱበትን አንጎል ንኩ።" }, part: "brain", parts: ["heart", "brain", "stomach"], fact: { en: "The brain: it works out what your eyes, ears, nose, tongue and skin notice.", am: "አንጎል፦ ዓይኖቻችሁ፣ ጆሮዎቻችሁ፣ አፍንጫችሁ፣ ምላሳችሁና ቆዳችሁ የሚያስተውሉትን ይደርስበታል።" } },
];

export default function BodyXray({ lang, onDone }: DemoProps) {
  const [layer, setLayer] = useState<BodyLayer>("skin");
  const [seen, setSeen] = useState<BodyLayer[]>(["skin"]);
  const [phase, setPhase] = useState<"look" | "find" | "done">("look");
  const [q, setQ] = useState(0);
  const [hit, setHit] = useState<Part | null>(null);
  const lookedAll = seen.length === LAYERS.length;
  const f = FIND[Math.min(q, FIND.length - 1)];
  const shown = phase === "find" ? f.layer : layer;
  const right = hit === f.part;

  const tapPart = (p: Part) => {
    if (phase !== "find" || right) return;
    setHit(p);
    if (p === f.part) sound.good();
    else sound.gentle();
  };

  const total = LAYERS.length + FIND.length;
  const step = phase === "look" ? seen.length - 1 : phase === "find" ? LAYERS.length + q : total;

  return (
    <DemoFrame lang={lang} title={{ en: "The X-ray Explorer", am: "የኤክስሬይ አሳሽ" }} goal={phase === "look" ? { en: "Look through all four layers of the body.", am: "አራቱንም የሰውነት ንብርብሮች ተመልከቱ።" } : { en: "Find each part on the X-ray picture.", am: "እያንዳንዱን ክፍል በኤክስሬይ ሥዕሉ ላይ ፈልጉ።" }} step={step} total={total}>
      <Stage label={t(lang, LAYERS.find((l) => l.key === shown)!.label)}>
        <rect width={400} height={300} fill={shown === "skin" ? "#E8F4FB" : "#14283E"} />
        <BodyChart x={200} y={292} s={1.38} layer={shown} tap={false} glow={phase === "find" && right ? (f.part === "arm" ? undefined : f.part === "brain" ? "brain" : f.part) : undefined} />
        {phase === "find" &&
          f.parts.flatMap((p) =>
            SPOT[p].map(([x, y, r], k) => (
              <circle
                key={`${p}-${k}`}
                data-part={p}
                cx={x}
                cy={y}
                r={r}
                fill={hit === p ? (right ? "#FFE066" : "#F5B21E") : "#FFFFFF"}
                fillOpacity={hit === p ? 0.45 : 0.01}
                stroke={hit === p ? "#FFFFFF" : "none"}
                strokeWidth={2}
                style={{ cursor: "pointer" }}
                onClick={() => tapPart(p)}
              />
            )),
          )}
      </Stage>
      {phase === "done" ? (
        <Finale lang={lang} text={{ en: "Skull, ribs, knees, muscles, heart and brain: you know what's inside!", am: "የራስ ቅል፣ የጎድን አጥንቶች፣ ጉልበቶች፣ ጡንቻዎች፣ ልብና አንጎል፦ ውስጥ ያለውን ታውቃላችሁ!" }} onDone={onDone} />
      ) : phase === "look" ? (
        <>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {LAYERS.map((l) => (
              <button
                key={l.key}
                type="button"
                data-layer={l.key}
                onClick={() => {
                  sound.tap();
                  setLayer(l.key);
                  setSeen((s) => (s.includes(l.key) ? s : [...s, l.key]));
                }}
                className="min-h-12 rounded-2xl border-2 px-3 py-2 font-display text-lg font-extrabold text-ink transition-transform active:translate-y-0.5"
                style={{ background: layer === l.key ? "#EDE4F8" : seen.includes(l.key) ? "#F6F2FC" : "#FFFFFF", borderColor: layer === l.key ? "#7C3AED" : "#D3E4F4" }}
              >
                {t(lang, l.label)}
              </button>
            ))}
          </div>
          <Feedback tone="great" action={lookedAll ? <Next onClick={() => setPhase("find")}>{t(lang, { en: "Now find the parts", am: "አሁን ክፍሎቹን ፈልጉ" })}</Next> : undefined}>
            {t(lang, LAYERS.find((l) => l.key === layer)!.fact)}
          </Feedback>
        </>
      ) : (
        <>
          <p className="mt-4 font-display text-xl font-extrabold text-ink">{t(lang, f.prompt)}</p>
          {hit && right && (
            <Feedback
              tone="great"
              action={
                <Next
                  onClick={() => {
                    setHit(null);
                    if (q === FIND.length - 1) setPhase("done");
                    else setQ(q + 1);
                  }}
                >
                  {t(lang, q === FIND.length - 1 ? { en: "Finish", am: "ጨርሱ" } : { en: "Next", am: "ቀጣይ" })}
                </Next>
              }
            >
              {t(lang, f.fact)}
            </Feedback>
          )}
          {hit && !right && <Feedback tone="gentle">{t(lang, { en: "Not that one. Look again and tap another part.", am: "ያ አይደለም። እንደገና ተመልክታችሁ ሌላ ክፍል ንኩ።" })}</Feedback>}
          {!hit && <p className="mt-2 text-base text-muted">{t(lang, { en: "Tap the picture.", am: "ሥዕሉን ንኩ።" })}</p>}
        </>
      )}
    </DemoFrame>
  );
}
