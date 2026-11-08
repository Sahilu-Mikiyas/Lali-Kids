"use client";

import { useId, useState, type ReactNode } from "react";

import type { Mood } from "@/components/characters";
import { Camel, Cub, Grandma, Gugu, Ibex, TAP, Tsehay, Wolf } from "@/components/book/courses/values-character/kit-cast";
import { Yard } from "@/components/book/courses/values-character/kit-places";
import { Dabo, Hearts, Sparkles } from "@/components/book/courses/values-character/kit-props";
import { Place, vars } from "@/components/book/scenery";
import type { DemoProps } from "../../types";
import { Choice, DemoFrame, Feedback, Finale, Next, sound, Stage, t, type T } from "./demo-kit";

/*
  The Sharing Scale (level 3: sharing). Kolo (roasted barley) to share fairly at school break:
  6 between two friends on a balance scale, 8 among four friends, then 7 among three, where one
  piece is left over and the child decides kindly what to do with it. Last, one round loaf to cut
  into four equal pieces. Plates are filled with + and − buttons under the picture (big targets
  for small fingers); faces in the picture show whether it feels fair.
*/

type Friend = { key: string; name: T; draw: (mood: Mood) => ReactNode };

const FRIENDS: Record<string, Friend> = {
  you: { key: "you", name: { en: "You", am: "አንተ" }, draw: (m) => <Cub mood={m} /> },
  gugu: { key: "gugu", name: { en: "Gugu", am: "ጉጉ" }, draw: (m) => <Gugu mood={m} /> },
  tsehay: { key: "tsehay", name: { en: "Tsehay", am: "ፀሐይ" }, draw: (m) => <Tsehay mood={m} /> },
  hawi: { key: "hawi", name: { en: "Hawi", am: "ሀዊ" }, draw: (m) => <Wolf mood={m} wag={m === "joy"} /> },
  haben: { key: "haben", name: { en: "Haben", am: "ሐበን" }, draw: (m) => <Ibex mood={m} /> },
  ayan: { key: "ayan", name: { en: "Ayan", am: "አያን" }, draw: (m) => <Camel who="ayan" mood={m} /> },
};

type Round = { kolo: number; friends: string[]; say: T; scale?: boolean; extra?: boolean };

const ROUNDS: Round[] = [
  { kolo: 6, friends: ["you", "gugu"], scale: true, say: { en: "6 pieces of kolo for you and Gugu. Make the scale balance!", am: "6 ቆሎ ላንተና ለጉጉ። ሚዛኑን እኩል አድርገው!" } },
  { kolo: 8, friends: ["you", "gugu", "tsehay", "hawi"], say: { en: "8 pieces of kolo for four friends. Everyone gets the same!", am: "8 ቆሎ ለአራት ጓደኞች። ሁሉም እኩል ያገኛል!" } },
  { kolo: 7, friends: ["you", "haben", "ayan"], extra: true, say: { en: "7 pieces for three friends. Share them out, and see what happens!", am: "7 ቆሎ ለሦስት ጓደኞች። አከፋፍለህ ምን እንደሚሆን ተመልከት!" } },
];

const KOLO = ["#B8742E", "#9A5A20", "#C98A3E"];

/** A little heap of kolo on a plate: n pieces, in a tidy pile. */
function Pile({ n, x, y }: { n: number; x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={2} rx={24} ry={6} fill="#FFFDF4" stroke="#E6DCC8" strokeWidth={1.4} />
      {Array.from({ length: n }, (_, i) => {
        const row = Math.floor(i / 4);
        const col = i % 4;
        return <ellipse key={i} cx={(col - 1.5) * 8 + (row % 2) * 4} cy={-2 - row * 5} rx={4} ry={3} fill={KOLO[i % 3]} className="lali-pop-in" style={vars({ "--delay": "0s" })} />;
      })}
    </g>
  );
}

/** The balance scale with two plates: it tips toward the heavier side. */
function Scale({ a, b }: { a: number; b: number }) {
  const tilt = Math.max(-16, Math.min(16, (b - a) * 5));
  const dy = Math.sin((tilt * Math.PI) / 180) * 70;
  return (
    <g transform="translate(200 120)">
      <rect x={-4} y={0} width={8} height={130} fill="#8A5A30" />
      <path d="M-30 130 H30" stroke="#6A4020" strokeWidth={8} strokeLinecap="round" />
      <g style={{ transform: `rotate(${tilt}deg)`, transition: "transform 0.5s cubic-bezier(.3,1.4,.5,1)" }}>
        <rect x={-74} y={-4} width={148} height={8} rx={4} fill="#A86E3C" />
      </g>
      <circle r={7} fill="#F5B21E" />
      <g style={{ transform: `translate(-70px, ${-dy}px)`, transition: "transform 0.5s cubic-bezier(.3,1.4,.5,1)" }}>
        <path d="M0 0 L-20 40 M0 0 L20 40" stroke="#6A4020" strokeWidth={1.6} />
        <Pile n={a} x={0} y={42} />
      </g>
      <g style={{ transform: `translate(70px, ${dy}px)`, transition: "transform 0.5s cubic-bezier(.3,1.4,.5,1)" }}>
        <path d="M0 0 L-20 40 M0 0 L20 40" stroke="#6A4020" strokeWidth={1.6} />
        <Pile n={b} x={0} y={42} />
      </g>
      {a === b && a > 0 && (
        <g transform="translate(0 -26)">
          <circle r={12} fill="#2FA35A" className="lali-pop-in" style={vars({ "--delay": "0.2s" })} />
          <path d="M-5 0 L-1 4 L6 -4" stroke="#fff" strokeWidth={3} fill="none" strokeLinecap="round" />
        </g>
      )}
    </g>
  );
}

export default function SharingScale({ lang, onDone }: DemoProps) {
  const id = useId().replace(/:/g, "");
  const [r, setR] = useState(0);
  const [plates, setPlates] = useState<number[]>(() => ROUNDS[0].friends.map(() => 0));
  const [extra, setExtra] = useState<string | null>(null);
  const [cuts, setCuts] = useState<{ down: boolean; across: boolean; shared: boolean }>({ down: false, across: false, shared: false });
  const [finished, setFinished] = useState(false);

  const breadRound = r === ROUNDS.length;
  const round = ROUNDS[Math.min(r, ROUNDS.length - 1)];
  const given = plates.reduce((a, b) => a + b, 0);
  const left = round.kolo - given;
  const max = Math.max(...plates);
  const min = Math.min(...plates);
  const fair = max === min;
  const per = Math.floor(round.kolo / round.friends.length);
  const allShared = round.extra ? fair && left === round.kolo - per * round.friends.length : left === 0 && fair;
  const unfairDone = !breadRound && (round.extra ? left <= round.kolo - per * round.friends.length && !fair : left === 0 && !fair);
  const roundDone = !breadRound && allShared && (!round.extra || extra !== null);

  const add = (k: number) => {
    if (left <= 0) return;
    sound.tap();
    setPlates((p) => p.map((v, i) => (i === k ? v + 1 : v)));
  };
  const take = (k: number) => {
    if (plates[k] <= 0) return;
    sound.tap();
    setPlates((p) => p.map((v, i) => (i === k ? v - 1 : v)));
  };
  const nextRound = () => {
    const n = r + 1;
    setR(n);
    setExtra(null);
    if (n < ROUNDS.length) setPlates(ROUNDS[n].friends.map(() => 0));
  };

  const moods: Mood[] = plates.map((v) => (given === 0 ? "happy" : allShared || (fair && left > 0) ? (allShared ? "joy" : "happy") : v < max ? "worried" : "happy"));

  const lowest = plates.indexOf(min);
  const highest = plates.indexOf(max);

  return (
    <DemoFrame lang={lang} title={{ en: "The Sharing Scale", am: "የማካፈል ሚዛን" }} goal={breadRound ? { en: "One round loaf for four friends: cut it into four equal pieces.", am: "አንድ ክብ ዳቦ ለአራት ጓደኞች፦ በአራት እኩል ቁራሽ ቁረጠው።" } : round.say} step={r} total={ROUNDS.length + 1} color="#C9A24A">
      <Stage label={t(lang, { en: "Break time at school", am: "በትምህርት ቤት የዕረፍት ሰዓት" })}>
        <Yard id={id} time="day" house={false}>
          {breadRound ? (
            <g>
              <g transform="translate(200 210)">
                <Dabo x={0} y={20} s={2.2} />
                {cuts.down && <path d="M0 -50 V24" stroke="#7A4A20" strokeWidth={3} strokeDasharray="6 4" className="lali-fade-in" style={vars({ "--delay": "0s", "--dur": "0.4s" })} />}
                {cuts.across && <path d="M-74 -14 H74" stroke="#7A4A20" strokeWidth={3} strokeDasharray="6 4" className="lali-fade-in" style={vars({ "--delay": "0s", "--dur": "0.4s" })} />}
              </g>
              {(["you", "gugu", "tsehay", "hawi"] as const).map((k, i) => (
                <Place key={k} x={[50, 120, 290, 356][i]} y={[294, 296, 296, 294][i]} s={0.36} flip={i > 1} tap={TAP.cub}>
                  {FRIENDS[k].draw(cuts.shared ? "joy" : "happy")}
                </Place>
              ))}
              {cuts.shared && <Hearts spots={[[100, 170, 0.2], [200, 140, 0.8], [300, 170, 1.2]]} />}
              {cuts.shared && <Sparkles x={200} y={190} r={80} delay={0.1} n={8} />}
            </g>
          ) : round.scale ? (
            <g>
              <Scale a={plates[0]} b={plates[1]} />
              <Place x={60} y={294} s={0.44} tap={TAP.cub}>
                {FRIENDS.you.draw(moods[0])}
              </Place>
              <Place x={340} y={294} s={0.44} flip tap={TAP.gugu}>
                {FRIENDS.gugu.draw(moods[1])}
              </Place>
              <g transform="translate(200 90)">{left > 0 && <Pile n={left} x={0} y={0} />}</g>
            </g>
          ) : (
            <g>
              <g transform="translate(200 70)">{left > 0 && <Pile n={left} x={0} y={0} />}</g>
              {round.friends.map((k, i) => {
                const x = round.friends.length === 4 ? 60 + i * 93 : 90 + i * 110;
                return (
                  <g key={k}>
                    <Pile n={plates[i]} x={x} y={190} />
                    <Place x={x} y={294} s={0.36} flip={i >= round.friends.length / 2} tap={TAP.cub}>
                      {FRIENDS[k].draw(moods[i])}
                    </Place>
                  </g>
                );
              })}
              {roundDone && <Sparkles x={200} y={170} r={100} delay={0.1} n={8} />}
              {round.extra && extra && (
                <g>
                  {extra === "grandma" && (
                    <Place x={370} y={196} s={0.26} flip tap={TAP.grandma}>
                      <Grandma mood="joy" arm="raise" />
                    </Place>
                  )}
                  <Hearts spots={[[200, 120, 0.2], [230, 110, 0.8]]} />
                </g>
              )}
            </g>
          )}
        </Yard>
      </Stage>

      {finished ? (
        <Finale lang={lang} text={{ en: "Fair shares for everyone! Sharing makes snacks taste better.", am: "ለሁሉም እኩል ድርሻ! መካፈል መክሰስን ያጣፍጣል።" }} onDone={onDone} color="#C9A24A" />
      ) : breadRound ? (
        <div className="mt-4">
          {!cuts.shared ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <Choice tone={cuts.down ? "good" : "plain"} disabled={cuts.down} onClick={() => { sound.tap(); setCuts((c) => ({ ...c, down: true })); }}>
                {t(lang, { en: "Cut down the middle", am: "በመሃል ወደ ታች ቁረጥ" })}
              </Choice>
              <Choice tone={cuts.across ? "good" : "plain"} disabled={cuts.across} onClick={() => { sound.tap(); setCuts((c) => ({ ...c, across: true })); }}>
                {t(lang, { en: "Cut across the middle", am: "በመሃል በአግድም ቁረጥ" })}
              </Choice>
            </div>
          ) : null}
          {cuts.down && cuts.across && !cuts.shared && (
            <Feedback tone="great" action={<Next color="#C9A24A" onClick={() => { sound.good(); setCuts((c) => ({ ...c, shared: true })); }}>{t(lang, { en: "Give one to each friend", am: "ለእያንዳንዱ ጓደኛ አንድ ስጥ" })}</Next>}>
              {t(lang, { en: "Four pieces, all the same size: one for each friend!", am: "አራት ቁራሾች፣ ሁሉም እኩል፦ ለእያንዳንዱ ጓደኛ አንድ!" })}
            </Feedback>
          )}
          {cuts.shared && (
            <Feedback tone="great" action={<Next color="#C9A24A" onClick={() => setFinished(true)}>{t(lang, { en: "Finish", am: "ጨርስ" })}</Next>}>
              {t(lang, { en: "Everyone has a piece of dabo, and a gursha for a friend.", am: "ሁሉም ዳቦ ደረሰው፤ ለጓደኛም ጉርሻ።" })}
            </Feedback>
          )}
          {(cuts.down !== cuts.across) && <p className="mt-3 text-lg text-muted">{t(lang, { en: "Two pieces. One more cut for four friends!", am: "ሁለት ቁራሽ። ለአራት ጓደኞች አንድ ተጨማሪ መቁረጥ!" })}</p>}
        </div>
      ) : (
        <>
          <p className="mt-4 font-display text-lg font-extrabold text-ink">
            {t(lang, { en: `Kolo left in the bowl: ${left}`, am: `በሳህኑ የቀረ ቆሎ፦ ${left}` })}
          </p>
          <div className="mt-2 grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(round.friends.length, 2)}, minmax(0, 1fr))` }}>
            {round.friends.map((k, i) => (
              <div key={k} className="rounded-2xl border-2 border-line bg-white px-2 py-2">
                <p className="truncate text-center font-display text-lg font-extrabold text-ink">
                  {t(lang, FRIENDS[k].name)}: <span className="text-coral">{plates[i]}</span>
                </p>
                <div className="mt-1 flex gap-2">
                  <button type="button" data-minus={i} onClick={() => take(i)} disabled={plates[i] === 0 || roundDone} className="h-12 flex-1 rounded-xl bg-sky-soft font-display text-2xl font-black text-ink disabled:opacity-40" aria-label={`− ${t(lang, FRIENDS[k].name)}`}>
                    −
                  </button>
                  <button type="button" data-plus={i} onClick={() => add(i)} disabled={left === 0 || roundDone || (round.extra === true && fair && left <= round.kolo - per * round.friends.length && plates[i] >= per)} className="h-12 flex-1 rounded-xl bg-gold font-display text-2xl font-black text-ink disabled:opacity-40" aria-label={`+ ${t(lang, FRIENDS[k].name)}`}>
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          {unfairDone && (
            <Feedback tone="gentle">
              {t(lang, {
                en: `${FRIENDS[round.friends[highest]].name.en}: ${max}. ${FRIENDS[round.friends[lowest]].name.en}: ${min}. Does that feel fair? Move some so everyone has the same.`,
                am: `${FRIENDS[round.friends[highest]].name.am}፦ ${max}፤ ${FRIENDS[round.friends[lowest]].name.am}፦ ${min}። ይህ ፍትሐዊ ነው? ሁሉም እኩል እንዲኖረው አዛውር።`,
              })}
            </Feedback>
          )}
          {round.extra && allShared && !extra && (
            <Feedback tone="great">
              <p>{t(lang, { en: "Two each, and one piece left over! What will you do with it?", am: "ለእያንዳንዱ ሁለት፣ አንድ ደግሞ ተረፈ! ምን ታደርገዋለህ?" })}</p>
              <div className="mt-3 grid gap-2">
                <Choice onClick={() => { sound.good(); setExtra("guest"); }}>{t(lang, { en: "Give it to Haben: she's new here, our guest.", am: "ለሐበን መስጠት፦ እዚህ አዲስ ናት፣ እንግዳችን ናት።" })}</Choice>
                <Choice onClick={() => { sound.good(); setExtra("grandma"); }}>{t(lang, { en: "Take it to Grandma.", am: "ለአያቴ መውሰድ።" })}</Choice>
                <Choice onClick={() => { sound.good(); setExtra("three"); }}>{t(lang, { en: "Break it into three tiny bits.", am: "በሦስት ትንንሽ ቁራሽ መከፋፈል።" })}</Choice>
              </div>
            </Feedback>
          )}
          {roundDone && (
            <Feedback tone="great" action={<Next color="#C9A24A" onClick={nextRound}>{t(lang, { en: "Next", am: "ቀጣይ" })}</Next>}>
              {round.extra
                ? t(lang, extra === "guest" ? { en: "Haben smiles shyly. Giving the extra to a guest is a lovely Ethiopian way!", am: "ሐበን በዓይናፋርነት ፈገግ አለች። ትርፉን ለእንግዳ መስጠት ውብ የኢትዮጵያ ልማድ ነው!" } : extra === "grandma" ? { en: "Grandma laughs: \"For me? You remembered your elders!\"", am: "አያቴ ሳቀች፦ «ለእኔ? ታላላቆችህን አስታወስክ!»" } : { en: "Three tiny bits, three happy friends. Very fair!", am: "ሦስት ትንንሽ ቁራሾች፣ ሦስት ደስተኛ ጓደኞች። በጣም ፍትሐዊ!" })
                : t(lang, { en: `${per} each. Fair and square, and everyone is smiling!`, am: `ለእያንዳንዱ ${per}። እኩል ነው፤ ሁሉም ፈገግ ብሏል!` })}
            </Feedback>
          )}
        </>
      )}
    </DemoFrame>
  );
}
