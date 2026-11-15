"use client";

import type { ReactNode } from "react";

import { Place } from "@/components/book/scenery";
import { Ibex, TAP, Wolf } from "@/components/book/courses/our-ethiopia/kit-cast";
import { CoffeeBush, SimienEdge, WildGelada, WildIbex } from "@/components/book/courses/our-ethiopia/kit-land";
import { NoLitterSign, Litter } from "@/components/book/courses/our-ethiopia/kit-more";
import { ChurchForest, Dog, ParkSign, Sapling } from "@/components/book/courses/our-ethiopia/kit-past";
import { Village } from "@/components/book/courses/our-ethiopia/kit-places";
import { Dabo, Tick } from "@/components/book/courses/our-ethiopia/kit-props";
import type { DemoProps } from "../../types";
import { Rounds, type Option, type Round } from "./rounds-kit";

/*
  Junior Park Scout (level 5). Seven things people might do near wild animals and forests: is it
  good for the wild, or not? Feeding bread to geladas (not good: it can make them sick and
  teaches them to come to people); watching from far away with binoculars (good); vaccinating
  village dogs against rabies (good: it protects the Ethiopian wolves too); leaving plastic
  rubbish (not good); cutting the big shade trees in a wild coffee forest (not good); planting
  seedlings and mending a church forest's wall (good); taking a baby walia home as a pet (not
  good: wild animals belong in the wild).
*/

const GOOD: Option = {
  key: "good",
  label: { en: "Good for the wild", am: "ለዱር ጥሩ ነው" },
  pic: (
    <g>
      <circle cx={22} cy={22} r={18} fill="#E4F7EA" stroke="#2FA35A" strokeWidth={3} />
      <path d="M13 22 l6 6 l12 -12" stroke="#2FA35A" strokeWidth={4} fill="none" strokeLinecap="round" />
    </g>
  ),
};
const BAD: Option = {
  key: "bad",
  label: { en: "Not good for the wild", am: "ለዱር ጥሩ አይደለም" },
  pic: (
    <g>
      <circle cx={22} cy={22} r={18} fill="#FFF0EC" stroke="#E2463F" strokeWidth={3} />
      <path d="M15 15 l14 14 M29 15 l-14 14" stroke="#E2463F" strokeWidth={4} strokeLinecap="round" />
    </g>
  ),
};

/** A pair of binoculars. */
function Binoculars({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-18} y={-10} width={14} height={22} rx={5} fill="#2A2A2A" />
      <rect x={4} y={-10} width={14} height={22} rx={5} fill="#2A2A2A" />
      <rect x={-4} y={-4} width={8} height={8} fill="#4A4A4A" />
      <circle cx={-11} cy={12} r={5} fill="#5BB8E8" />
      <circle cx={11} cy={12} r={5} fill="#5BB8E8" />
    </g>
  );
}

/** A small vet's needle for the dog's vaccination. */
function Needle({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(-30)`}>
      <rect x={-4} y={-30} width={8} height={26} rx={2} fill="#DDEEFF" stroke="#4A6FA8" strokeWidth={1.6} />
      <path d="M0 -4 V8" stroke="#8A8A96" strokeWidth={1.4} />
      <path d="M-6 -30 h12" stroke="#4A6FA8" strokeWidth={3} />
    </g>
  );
}

function Mark({ good }: { good: boolean }): ReactNode {
  return good ? <Tick x={60} y={60} delay={0.2} /> : null;
}

const ROUNDS: Round[] = [
  {
    prompt: { en: "Giving bread to the geladas.", am: "ለጭላዳዎች ዳቦ መስጠት።" },
    right: "bad",
    options: [GOOD, BAD],
    why: { en: "Right: not good. Bread can make wild animals sick, and teaches them to come to people. Wild animals find their own food.", am: "ልክ ነው፦ ጥሩ አይደለም። ዳቦ የዱር እንስሳትን ሊያሳምም ይችላል፤ ወደ ሰዎች መቅረብንም ያስተምራቸዋል። የዱር እንስሳት የራሳቸውን ምግብ ያገኛሉ።" },
    scene: () => (
      <g>
        <SimienEdge id="pr1" />
        <WildGelada x={240} y={252} s={2.4} />
        <WildGelada x={320} y={246} s={2} flip />
        <Place x={100} y={300} s={0.44} tap={TAP.haben}>
          <Ibex mood="happy" pose="point" />
        </Place>
        <Dabo x={170} y={238} s={0.5} />
      </g>
    ),
  },
  {
    prompt: { en: "Watching the walia from far away, with binoculars.", am: "ዋልያዎችን ከሩቅ በመነጽር መመልከት።" },
    right: "good",
    options: [GOOD, BAD],
    why: { en: "Yes! Quiet feet, far eyes: the animals stay calm and wild, and you still see everything.", am: "አዎ! ቀስ ያሉ እግሮች፣ ከሩቅ የሚያዩ ዓይኖች፦ እንስሳቱ ተረጋግተው ዱር ሆነው ይቀራሉ፤ እናንተም ሁሉንም ታያላችሁ።" },
    scene: (solved) => (
      <g>
        <SimienEdge id="pr2" />
        <WildIbex x={290} y={200} s={1.4} />
        <WildIbex x={340} y={210} s={1.1} flip />
        <Place x={100} y={300} s={0.44} tap={TAP.haben}>
          <Ibex mood="joy" />
        </Place>
        <Binoculars x={150} y={200} s={1.4} />
        <Mark good={solved} />
      </g>
    ),
  },
  {
    prompt: { en: "Taking the village dogs to be vaccinated.", am: "የመንደሩን ውሾች ለክትባት መውሰድ።" },
    right: "good",
    options: [GOOD, BAD],
    why: { en: "Yes! A vaccinated dog can't catch rabies or pass it on, so the people and the rare Ethiopian wolves are safer too.", am: "አዎ! የተከተበ ውሻ የእብድ ውሻ በሽታ አይዘውም፤ አያስተላልፍምም፤ ስለዚህ ሰዎችና ብርቅዬዎቹ የኢትዮጵያ ቀበሮዎች ይጠበቃሉ።" },
    scene: (solved) => (
      <g>
        <Village id="pr3" />
        <Place x={110} y={300} s={0.44} tap={TAP.hawi}>
          <Wolf mood="happy" />
        </Place>
        <Dog x={220} y={280} s={1.8} collar={solved} />
        <Needle x={290} y={240} />
        <Mark good={solved} />
      </g>
    ),
  },
  {
    prompt: { en: "Leaving plastic bags and bottles on the mountain.", am: "በተራራው ላይ የፕላስቲክ ከረጢትና ጠርሙስ መተው።" },
    right: "bad",
    options: [GOOD, BAD],
    why: { en: "Right: not good. Animals can eat plastic or get stuck in it. Take your rubbish home.", am: "ልክ ነው፦ ጥሩ አይደለም። እንስሳት ፕላስቲክ ሊበሉ ወይም ሊጠለፉበት ይችላሉ። ቆሻሻችሁን ወደ ቤት ውሰዱ።" },
    scene: (solved) => (
      <g>
        <SimienEdge id="pr4" />
        {!solved && (
          <g>
            <Litter x={140} y={260} kind="bag" s={1.4} />
            <Litter x={220} y={266} kind="bottle" s={1.4} rot={70} />
            <Litter x={300} y={258} kind="bag" s={1.2} />
          </g>
        )}
        {solved && <NoLitterSign x={200} y={262} s={1.4} />}
        <WildGelada x={360} y={250} s={1.6} flip />
      </g>
    ),
  },
  {
    prompt: { en: "Cutting down the big trees in a wild coffee forest, to give the coffee more sun.", am: "ለቡናው ብዙ ፀሐይ ለመስጠት በዱር የቡና ደን ያሉ ትልልቅ ዛፎችን መቁረጥ።" },
    right: "bad",
    options: [GOOD, BAD],
    why: { en: "Right: not good. Wild coffee likes shade, and the tall trees are home to monkeys and birds, and keep the rivers flowing.", am: "ልክ ነው፦ ጥሩ አይደለም። የዱር ቡና ጥላ ይወዳል፤ ረጃጅሞቹ ዛፎች የጦጣዎችና የወፎች ቤት ናቸው፤ ወንዞቹም እንዲፈሱ ያደርጋሉ።" },
    scene: () => (
      <g>
        <rect width={400} height={300} fill="#2E5A3A" />
        {[40, 200, 360].map((x) => (
          <g key={x}>
            <rect x={x - 12} y={20} width={24} height={230} fill="#5A3E28" />
            <ellipse cx={x} cy={30} rx={80} ry={40} fill="#3E8A4A" />
          </g>
        ))}
        <path d="M-10 250 Q200 236 410 252 L410 310 L-10 310Z" fill="#3E6A32" />
        {[110, 280].map((x) => (
          <CoffeeBush key={x} x={x} y={270} s={1.4} />
        ))}
      </g>
    ),
  },
  {
    prompt: { en: "Planting seedlings and mending the wall round a church forest.", am: "ችግኞችን መትከልና በቤተ ክርስቲያን ደን ዙሪያ ያለውን ቅጥር መጠገን።" },
    right: "good",
    options: [GOOD, BAD],
    why: { en: "Yes! The wall keeps the goats out, so young trees can grow. Every tree is a home!", am: "አዎ! ቅጥሩ ፍየሎችን ያስቀራል፤ ስለዚህ ወጣት ዛፎች ያድጋሉ። እያንዳንዱ ዛፍ ቤት ነው!" },
    scene: (solved) => (
      <g>
        <rect width={400} height={300} fill="#BFE2F6" />
        <path d="M-10 170 Q200 150 410 172 L410 310 L-10 310Z" fill="#C8A06A" />
        <ChurchForest x={200} y={200} s={1.1} wall={solved} />
        <Sapling x={70} y={280} s={1.8} />
        <Sapling x={330} y={280} s={1.8} />
        <Mark good={solved} />
      </g>
    ),
  },
  {
    prompt: { en: "Taking a baby walia home to keep as a pet.", am: "የዋልያ ግልገል እንደ ቤት እንስሳ ለማሳደግ ወደ ቤት መውሰድ።" },
    right: "bad",
    options: [GOOD, BAD],
    why: { en: "Right: not good. A baby walia needs its mother and its cliffs. Wild animals belong in the wild.", am: "ልክ ነው፦ ጥሩ አይደለም። የዋልያ ግልገል እናቱንና ገደሉን ይፈልጋል። የዱር እንስሳት የዱር ናቸው።" },
    scene: () => (
      <g>
        <SimienEdge id="pr7" />
        <WildIbex x={220} y={250} s={2.4} />
        <WildIbex x={290} y={252} s={1.2} />
        <ParkSign x={80} y={262}>
          <path d="M-12 -4 L12 -4 L0 -16Z" fill="#F5B21E" />
        </ParkSign>
      </g>
    ),
  },
];

export default function ParkRanger({ lang, onDone }: DemoProps) {
  return (
    <Rounds
      lang={lang}
      title={{ en: "Junior Park Scout", am: "ትንሹ የፓርክ ጠባቂ" }}
      goal={{ en: "Is it good for the wild, or not? Decide like a scout.", am: "ለዱር ጥሩ ነው ወይስ አይደለም? እንደ ጠባቂ ወስኑ።" }}
      rounds={ROUNDS}
      hint={{ en: "Think again: what would the animals and the trees need?", am: "እንደገና አስቡ፦ እንስሳቱና ዛፎቹ ምን ያስፈልጋቸዋል?" }}
      finale={{ en: "You're a real park scout!", am: "እውነተኛ የፓርክ ጠባቂ ናችሁ!" }}
      end={
        <g>
          <SimienEdge id="pr-end" />
          <WildIbex x={90} y={250} s={1.6} />
          <WildGelada x={180} y={256} s={1.6} />
          <Place x={300} y={300} s={0.46} flip tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
        </g>
      }
      onDone={onDone}
    />
  );
}
