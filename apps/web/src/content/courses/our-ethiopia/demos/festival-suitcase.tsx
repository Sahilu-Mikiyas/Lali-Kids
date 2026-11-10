"use client";

import { motion } from "motion/react";
import { useState, type ReactNode } from "react";

import { Daisy, Place } from "@/components/book/scenery";
import { Cub, TAP } from "@/components/book/courses/our-ethiopia/kit-cast";
import { Dates, FestUmbrella, Painting, Sambusa, Shafeta, ThanksBundle, Torch } from "@/components/book/courses/our-ethiopia/kit-culture";
import { Demera, GennaStick } from "@/components/book/courses/our-ethiopia/kit-more";
import { Home } from "@/components/book/courses/our-ethiopia/kit-places";
import type { DemoProps } from "../../types";
import { Choice, DemoFrame, Feedback, Finale, Next, sound, Stage, t, type T } from "./demo-kit";

/*
  Pack for the Festival (level 3). Anbessa is invited to eight celebrations with friends all over
  Ethiopia, and packs the right thing for each: adey abeba and a painting for Enkutatash; the
  Demera's daisies for Meskel; fresh green grass and flowers for Irreecha; a curved stick and a
  wooden ball for Genna; an umbrella for the Timket procession; a grass skirt for Ashenda; a plate
  of food to share for Eid; and for Fichee, a place round the big shafeta bowl. Each right choice
  hops into his suitcase and tells what the celebration is about.
*/

type Item = "flowers" | "demera" | "grass" | "stick" | "umbrella" | "skirt" | "plate" | "shafeta" | "torch";
type Round = { name: T; about: T; right: Item; options: Item[] };

const ITEM: Record<Item, T> = {
  flowers: { en: "Yellow daisies and a painting", am: "ቢጫ አደይ አበባና ሥዕል" },
  demera: { en: "Daisies to tie on the Demera bonfire", am: "ደመራው ላይ የሚታሰር አደይ አበባ" },
  grass: { en: "Fresh green grass and flowers", am: "ትኩስ አረንጓዴ ሣርና አበባ" },
  stick: { en: "A curved stick and a wooden ball", am: "ጎባጣ ዱላና የእንጨት ኳስ" },
  umbrella: { en: "A colourful umbrella for the procession", am: "ለሰልፉ ባለቀለም ጃንጥላ" },
  skirt: { en: "A skirt of long green grass", am: "ከረጅም አረንጓዴ ሣር የተሠራ ቀሚስ" },
  plate: { en: "A plate of food to share with neighbours", am: "ለጎረቤቶች የሚካፈል ሳህን ምግብ" },
  shafeta: { en: "A place round the big wooden shafeta bowl", am: "በትልቁ የእንጨት ሻፌታ ዙሪያ ቦታ" },
  torch: { en: "A torch of sticks for New Year's Eve", am: "ለአዲስ ዓመት ዋዜማ የእንጨት ችቦ" },
};

const ROUNDS: Round[] = [
  { name: { en: "Enkutatash, New Year (1 Meskerem)", am: "እንቁጣጣሽ፣ አዲስ ዓመት (መስከረም 1)" }, about: { en: "At New Year girls sing \"Abebayehosh\" door to door with flowers, and children give paintings.", am: "በአዲስ ዓመት ልጃገረዶች «አበባዮሽ» እያሉ ከቤት ወደ ቤት በአበባ ይዘፍናሉ፤ ልጆችም ሥዕል ይሰጣሉ።" }, right: "flowers", options: ["stick", "flowers", "skirt"] },
  { name: { en: "Meskel (17 Meskerem)", am: "መስቀል (መስከረም 17)" }, about: { en: "Meskel remembers the story of Queen Eleni finding the cross. A tall Demera, covered in daisies, is lit as a bonfire.", am: "መስቀል ንግሥት እሌኒ መስቀሉን ያገኘችበትን ታሪክ ያስታውሳል። በአደይ አበባ የተሸፈነ ረጅም ደመራ ይለኮሳል።" }, right: "demera", options: ["demera", "umbrella", "plate"] },
  { name: { en: "Irreecha, the Oromo thanksgiving", am: "ኢሬቻ፣ የኦሮሞ የምስጋና በዓል" }, about: { en: "After the rains, people carry fresh grass and flowers to the water and say thank you for the rain and the harvest.", am: "ከዝናቡ በኋላ ሰዎች ትኩስ ሣርና አበባ ይዘው ወደ ውሃ ይሄዳሉ፤ ስለ ዝናቡና ስለ መከሩ ያመሰግናሉ።" }, right: "grass", options: ["torch", "shafeta", "grass"] },
  { name: { en: "Genna, Christmas (29 Tahsas)", am: "ገና (ታኅሣሥ 29)" }, about: { en: "After church at night, children play the genna game with curved sticks and a little wooden ball.", am: "ከሌሊቱ ቤተ ክርስቲያን በኋላ ልጆች በጎባጣ ዱላና በትንሽ የእንጨት ኳስ የገና ጨዋታ ይጫወታሉ።" }, right: "stick", options: ["stick", "grass", "skirt"] },
  { name: { en: "Timket (11 Tir)", am: "ጥምቀት (ጥር 11)" }, about: { en: "Timket remembers the baptism of Jesus. Crowds in white walk to the water under bright umbrellas, and are blessed with water.", am: "ጥምቀት የኢየሱስን መጠመቅ ያስታውሳል። ነጭ የለበሱ ሰዎች በደማቅ ጃንጥላዎች ሥር ወደ ውሃ ይሄዳሉ፤ በውሃም ይባረካሉ።" }, right: "umbrella", options: ["demera", "umbrella", "flowers"] },
  { name: { en: "Ashenda (Nehase, in the north)", am: "አሸንዳ (ነሐሴ፣ በሰሜን)" }, about: { en: "Girls tie long ashenda grass round their waists and sing and dance from house to house.", am: "ልጃገረዶች ረጅሙን የአሸንዳ ሣር በወገባቸው አስረው ከቤት ወደ ቤት ይዘፍናሉ፣ ይጨፍራሉ።" }, right: "skirt", options: ["plate", "torch", "skirt"] },
  { name: { en: "Eid al-Fitr, at the end of Ramadan", am: "ዒድ አል-ፈጥር፣ በረመዳን መጨረሻ" }, about: { en: "After the morning prayer, families visit and carry plates of food and sweets to their neighbours: \"Eid Mubarak!\"", am: "ከጠዋቱ ሶላት በኋላ ቤተሰቦች ይጠያየቃሉ፤ ምግብና ጣፋጭ የያዙ ሳህኖችን ለጎረቤቶች ይወስዳሉ፦ «ዒድ ሙባረክ!»" }, right: "plate", options: ["umbrella", "plate", "stick"] },
  { name: { en: "Fichee, the Sidama New Year", am: "ፊቼ፣ የሲዳማ አዲስ ዓመት" }, about: { en: "The elders choose the day by the moon and stars. Families share buurisame from one big bowl, then sing and dance at the Gudumaale.", am: "ሽማግሌዎች ቀኑን በጨረቃና በከዋክብት ይመርጣሉ። ቤተሰቦች ከአንድ ትልቅ ሳህን ቡሪሳሜ ይካፈላሉ፤ ከዚያ በጉዱማሌ ይዘፍናሉ፣ ይጨፍራሉ።" }, right: "shafeta", options: ["shafeta", "demera", "grass"] },
];

function ItemPic({ k, big = false }: { k: Item; big?: boolean }): ReactNode {
  const s = big ? 1.6 : 1;
  switch (k) {
    case "flowers":
      return (
        <g transform={`scale(${s})`}>
          <g transform="translate(-6 10) scale(0.36)">
            <Painting x={0} y={0} />
          </g>
          <Daisy x={12} y={18} h={18} s={0.7} />
        </g>
      );
    case "demera":
      return <g transform={`scale(${s * 0.17}) translate(0 70)`}><Demera x={0} y={0} /></g>;
    case "grass":
      return <g transform={`scale(${s * 0.5}) translate(0 26)`}><ThanksBundle x={0} y={0} /></g>;
    case "stick":
      return <g transform={`scale(${s * 0.6}) translate(-4 10)`}><GennaStick ball /></g>;
    case "umbrella":
      return <g transform={`scale(${s * 0.42}) translate(0 -20)`}><FestUmbrella x={0} y={0} /></g>;
    case "skirt":
      return (
        <g transform={`scale(${s})`}>
          {[-8, -4, 0, 4, 8].map((dx) => (
            <path key={dx} d={`M${dx} -8 l${dx * 0.4} 18`} stroke="#9AB82E" strokeWidth={2.6} strokeLinecap="round" />
          ))}
          <path d="M-11 -8 H11" stroke="#E2463F" strokeWidth={3.4} />
        </g>
      );
    case "plate":
      return (
        <g transform={`scale(${s * 0.7})`}>
          <Sambusa x={-6} y={6} s={0.8} />
          <Dates x={10} y={-6} s={0.6} />
        </g>
      );
    case "shafeta":
      return <g transform={`scale(${s * 0.36}) translate(0 10)`}><Shafeta x={0} y={0} steam={false} /></g>;
    case "torch":
      return <g transform={`scale(${s * 0.5}) translate(0 26)`}><Torch x={0} y={0} /></g>;
  }
}

/** Anbessa's open suitcase with everything packed so far. */
function Suitcase({ packed }: { packed: Item[] }) {
  return (
    <g transform="translate(250 252)">
      <path d="M-90 -64 L90 -64 L84 -110 L-84 -110Z" fill="#B8642A" stroke="#7A3A1A" strokeWidth={3} />
      <rect x={-90} y={-64} width={180} height={64} rx={6} fill="#D8833A" stroke="#7A3A1A" strokeWidth={3} />
      <rect x={-84} y={-60} width={168} height={52} rx={4} fill="#F2D8A8" />
      {packed.map((k, i) => (
        <g key={k} transform={`translate(${-66 + (i % 4) * 44} ${i < 4 ? -36 : -16})`}>
          <motion.g initial={{ y: -90, opacity: 0, scale: 0.6 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 14 }}>
            <ItemPic k={k} />
          </motion.g>
        </g>
      ))}
      <rect x={-20} y={-6} width={40} height={10} rx={3} fill="#7A3A1A" />
    </g>
  );
}

export default function FestivalSuitcase({ lang, onDone }: DemoProps) {
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<Item | null>(null);
  const [packed, setPacked] = useState<Item[]>([]);
  const done = i >= ROUNDS.length;
  const r = ROUNDS[Math.min(i, ROUNDS.length - 1)];
  const right = pick === r.right;

  return (
    <DemoFrame lang={lang} title={{ en: "Pack for the Festival", am: "ለበዓሉ ሻንጣ እናዘጋጅ" }} goal={{ en: "Anbessa is invited to eight celebrations. What should he bring to each one?", am: "አንበሳ ለስምንት በዓላት ተጋብዟል። ለእያንዳንዱ ምን ይዞ ይሂድ?" }} step={i} total={ROUNDS.length} color="#15803D">
      <Stage label={t(lang, { en: "Anbessa packing his suitcase", am: "አንበሳ ሻንጣውን ሲያዘጋጅ" })}>
        <Home id="fs" time="day">
          <Suitcase packed={packed} />
          <Place x={80} y={296} s={0.46} tap={TAP.cub}>
            <Cub mood={done ? "joy" : pick && !right ? "worried" : "happy"} arm={right || done ? "up" : "none"} />
          </Place>
        </Home>
      </Stage>
      {done ? (
        <Finale lang={lang} text={{ en: "Eight celebrations, one happy traveller!", am: "ስምንት በዓላት፣ አንድ ደስተኛ ተጓዥ!" }} onDone={onDone} color="#15803D" />
      ) : (
        <>
          <p className="mt-4 font-display text-xl font-extrabold text-ink">{t(lang, r.name)}</p>
          {pick && right ? (
            <Feedback
              tone="great"
              action={
                <Next
                  color="#15803D"
                  onClick={() => {
                    setI((n) => n + 1);
                    setPick(null);
                  }}
                >
                  {t(lang, i === ROUNDS.length - 1 ? { en: "Finish", am: "ጨርሱ" } : { en: "Next celebration", am: "ቀጣዩ በዓል" })}
                </Next>
              }
            >
              {t(lang, r.about)}
            </Feedback>
          ) : pick ? (
            <Feedback tone="gentle" action={<Next color="#C98A0A" onClick={() => setPick(null)}>{t(lang, { en: "Choose again", am: "እንደገና ምረጡ" })}</Next>}>
              {t(lang, { en: "That belongs to another celebration. Think about what people do at this one.", am: "ያ የሌላ በዓል ነው። በዚህ በዓል ሰዎች ምን እንደሚያደርጉ አስቡ።" })}
            </Feedback>
          ) : (
            <div className="mt-3 grid gap-3">
              {r.options.map((o) => (
                <Choice
                  key={o}
                  pic={
                    <svg width={44} height={44} viewBox="-22 -22 44 44" aria-hidden>
                      <ItemPic k={o} />
                    </svg>
                  }
                  onClick={() => {
                    setPick(o);
                    if (o === r.right) {
                      sound.good();
                      setPacked((p) => [...p, o]);
                    } else sound.gentle();
                  }}
                >
                  {t(lang, ITEM[o])}
                </Choice>
              ))}
            </div>
          )}
        </>
      )}
    </DemoFrame>
  );
}
