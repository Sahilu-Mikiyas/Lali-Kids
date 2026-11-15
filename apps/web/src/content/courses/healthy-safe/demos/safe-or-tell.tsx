"use client";

import { useState } from "react";

import { Camel, Cub, Grandma, Gugu, Ibex, TAP, Teacher, Wolf } from "@/components/book/courses/healthy-safe/kit-cast";
import { Classroom } from "@/components/book/courses/healthy-safe/kit-more";
import { Bucket, FeelingWeight, HelpingHand, StopHand } from "@/components/book/courses/healthy-safe/kit-health";
import { Home, Yard } from "@/components/book/courses/healthy-safe/kit-places";
import { Hearts, Sparkles } from "@/components/book/courses/healthy-safe/kit-props";
import { Place } from "@/components/book/scenery";
import type { DemoProps } from "../../types";
import { ChoiceRounds, type Opt, type Round } from "./choice-rounds";
import { Next, sound, t, type T } from "./demo-kit";

/*
  OK, or Say No and Tell? (level 3), from "My Body Belongs to Me", "Surprise or Secret?" and
  "Hawi's Helping Hand". Calm, everyday moments: a hug you want, a grown-up helping you wash, the
  nurse with Mama there (all OK); a secret that feels heavy, someone wanting to touch the parts
  under the swimsuit and saying it's a secret (say no, go away, tell a grown-up you trust); a kiss
  you don't want (you can choose: a high five); a grown-up too busy to listen (tell the next
  one). Nothing frightening is shown: the touching moment is drawn only as Ayan's flat "No!"
  hand. Then the child builds a helping hand of five trusted grown-ups. Written to follow
  child-protection guidance: calm, empowering, never the child's fault.
*/

const COLOR = "#D9603A";

const OK: T = { en: "That's OK", am: "ችግር የለውም" };
const TELL: T = { en: "Say no, go away, and tell a grown-up I trust", am: "እምቢ ማለት፣ መሄድና ለማምነው ትልቅ ሰው መናገር" };

function Thumb() {
  return (
    <svg width={36} height={36} viewBox="-18 -18 36 36" aria-hidden>
      <circle r={16} fill="#E4F7EA" />
      <path d="M-8 2 L-3 8 L9 -6" stroke="#2FA35A" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Stop() {
  return (
    <svg width={36} height={36} viewBox="-18 -18 36 36" aria-hidden>
      <StopHand x={0} y={0} s={0.42} />
    </svg>
  );
}

const ok = (good: boolean, note?: T): Opt => ({ label: OK, pic: <Thumb />, ok: good, note });
const tell = (good: boolean, note?: T): Opt => ({ label: TELL, pic: <Stop />, ok: good, note });

const ROUNDS: Round[] = [
  {
    say: { en: "Ayan wants a hug from Hooyo, and Hooyo gives her a big one.", am: "አያን ከሁዮ እቅፍ ፈለገች፤ ሁዮም ትልቅ እቅፍ ሰጠቻት።" },
    options: [ok(true), tell(false, { en: "Ayan wanted this hug, and it feels kind. That's a safe touch!", am: "አያን ይህን እቅፍ ፈልጋለች፤ ደግም ነው። ያ ደህና ንክኪ ነው!" })],
    good: { en: "A hug you want, that feels kind: a safe touch.", am: "የምትፈልጉት፣ ደግ የሆነ እቅፍ፦ ደህና ንክኪ።" },
    scene: (id) => (
      <Yard id={id} time="day">
        <Place x={180} y={294} s={0.56} tap={TAP.hooyo}>
          <Camel who="hooyo" mood="joy" />
        </Place>
        <Place x={235} y={296} s={0.46} flip tap={TAP.ayan}>
          <Camel who="ayan" mood="joy" />
        </Place>
        <Hearts spots={[[205, 150, 0.3], [225, 136, 1]]} />
      </Yard>
    ),
  },
  {
    say: { en: "Hooyo helps Abdi wash at bath time.", am: "ሁዮ በገላ ሰዓት አብዲ እንዲታጠብ ትረዳዋለች።" },
    options: [ok(true), tell(false, { en: "A grown-up who looks after you can help you wash. That keeps you clean.", am: "የሚንከባከባችሁ ትልቅ ሰው እንድትታጠቡ ሊረዳችሁ ይችላል። ያ ንጹሕ ያደርጋችኋል።" })],
    good: { en: "That's OK: a grown-up who looks after you, helping you stay clean.", am: "ችግር የለውም፦ የሚንከባከባችሁ ትልቅ ሰው ንጹሕ እንድትሆኑ ሲረዳ።" },
    scene: (id) => (
      <Yard id={id} time="day">
        <Bucket x={230} y={286} s={1.2} steam />
        <Place x={140} y={294} s={0.54} tap={TAP.hooyo}>
          <Camel who="hooyo" mood="happy" />
        </Place>
        <Place x={300} y={296} s={0.42} flip tap={TAP.abdi}>
          <Camel who="abdi" mood="joy" />
        </Place>
      </Yard>
    ),
  },
  {
    say: { en: "Haben is poorly. The nurse checks her tummy, with her mother right there.", am: "ሐበን ታማለች። ነርሷ እናቷ እዚያው እያለች ሆዷን ትመረምራለች።" },
    options: [ok(true), tell(false, { en: "A nurse or doctor may check you to make you better, with your grown-up there. That's OK.", am: "ነርስ ወይም ሐኪም ትልቅ ሰዋችሁ ባለበት ሊያድናችሁ ሊመረምራችሁ ይችላል። ያ ችግር የለውም።" })],
    good: { en: "That's OK: the nurse helps her get better, and her mother is there.", am: "ችግር የለውም፦ ነርሷ እንድትድን ትረዳታለች፤ እናቷም እዚያ አለች።" },
    scene: (id) => (
      <Home id={id} time="day">
        <Place x={140} y={294} s={0.54} tap={TAP.haben}>
          <Ibex grown mood="happy" />
        </Place>
        <Place x={220} y={296} s={0.44} tap={TAP.haben}>
          <Ibex mood="happy" />
        </Place>
        <Place x={300} y={292} s={0.52} flip tap={TAP.teacher}>
          <Teacher mood="happy" />
          <path d="M66 46 Q100 18 134 46 L128 58 Q100 48 72 58Z" fill="#FFFFFF" stroke="#D3E4F4" strokeWidth={2} />
          <path d="M97 32 H103 V38 H109 V44 H103 V50 H97 V44 H91 V38 H97Z" fill="#2E9A5B" />
        </Place>
        <g transform="translate(300 160)">
          <circle r={12} fill="#FFFFFF" stroke="#2E9A5B" strokeWidth={2} />
          <path d="M-3 -8 H3 V-3 H8 V3 H3 V8 H-3 V3 H-8 V-3 H-3Z" fill="#2E9A5B" />
        </g>
      </Home>
    ),
  },
  {
    say: { en: "A big child says, \"Keep this secret. Don't tell anyone!\" Gugu's tummy feels heavy, like a stone.", am: "አንድ ትልቅ ልጅ «ይህን ሚስጥር ጠብቅ። ለማንም እንዳትናገር!» አለ። የጉጉ ሆድ እንደ ድንጋይ ከበደው።" },
    options: [ok(false, { en: "A secret that makes you feel bad is a secret to tell, even if you promised.", am: "መጥፎ ስሜት የሚሰጥ ሚስጥር ቃል ብትገቡም ይነገራል።" }), tell(true)],
    good: { en: "Yes. Bad secrets, we tell. You won't be in trouble.", am: "አዎ። መጥፎ ሚስጥር ይነገራል። አትቀጡም።" },
    scene: (id, s) => (
      <Yard id={id} time="day">
        <Place x={180} y={294} s={0.52} tap={TAP.gugu}>
          <Gugu mood={s === "good" ? "happy" : "worried"} />
        </Place>
        {s === "good" ? (
          <Place x={280} y={292} s={0.52} flip tap={TAP.grandma}>
            <Grandma arm="bless" />
          </Place>
        ) : (
          <FeelingWeight x={180} y={140} s={1.3} />
        )}
      </Yard>
    ),
  },
  {
    say: { en: "Someone wants to touch the parts under Ayan's swimsuit, and says it's a secret.", am: "አንድ ሰው የአያንን የዋና ልብስ የሚሸፍናቸውን ክፍሎች መንካት ፈለገ፤ ሚስጥር ነው አለ።" },
    options: [ok(false, { en: "Private parts are private. Nobody should touch them or ask you to keep a secret about touching.", am: "የግል ክፍሎች የግል ናቸው። ማንም ሊነካቸው ወይም ስለ ንክኪ ሚስጥር እንድትጠብቁ ሊጠይቃችሁ አይገባም።" }), tell(true)],
    good: { en: "Yes: \"NO!\" Go away, and tell a grown-up you trust. Keep telling until someone helps. It is never your fault.", am: "አዎ፦ «አይሆንም!» ሂዱ፤ ለምታምኑት ትልቅ ሰው ንገሩ። አንድ ሰው እስኪረዳችሁ ድረስ ተናገሩ። በፍጹም የእናንተ ጥፋት አይደለም።" },
    scene: (id, s) => (
      <Home id={id} time="day">
        <Place x={150} y={294} s={0.52} tap={TAP.ayan}>
          <Camel who="ayan" mood={s === "good" ? "happy" : "worried"} />
        </Place>
        <StopHand x={270} y={160} s={1} />
        {s === "good" && (
          <Place x={300} y={294} s={0.52} flip tap={TAP.hooyo}>
            <Camel who="hooyo" mood="happy" />
          </Place>
        )}
      </Home>
    ),
  },
  {
    say: { en: "Auntie wants a kiss, but Ayan doesn't want one today. What can she do?", am: "አክስቴ መሳም ፈለገች፤ አያን ግን ዛሬ አትፈልግም። ምን ማድረግ ትችላለች?" },
    options: [
      { label: { en: "Kiss her anyway", am: "ቢሆንም መሳም" }, ok: false, note: { en: "Ayan's body belongs to her. She can choose another way to say hello.", am: "የአያን ሰውነት የራሷ ነው። ሰላም ለማለት ሌላ መንገድ መምረጥ ትችላለች።" } },
      { label: { en: "Offer a high five instead", am: "በምትኩ እጅ ለእጅ ማጨብጨብ" }, ok: true },
      { label: { en: "Run away and hide", am: "ሮጦ መደበቅ" }, ok: false, note: { en: "She doesn't need to hide. She can say kindly what she'd like instead.", am: "መደበቅ አያስፈልጋትም። የምትፈልገውን በደግነት መናገር ትችላለች።" } },
    ],
    good: { en: "A high five! Your body belongs to you, and kind grown-ups understand.", am: "እጅ ለእጅ! ሰውነታችሁ የራሳችሁ ነው፤ ደግ ትልልቅ ሰዎችም ይረዳሉ።" },
    scene: (id, s) => (
      <Home id={id} time="day">
        <Place x={150} y={294} s={0.56} tap={TAP.hooyo}>
          <Camel who="hooyo" shawl="#8A3FA0" mood="joy" />
        </Place>
        <Place x={260} y={296} s={0.46} flip tap={TAP.ayan}>
          <Camel who="ayan" mood={s === "good" ? "joy" : "worried"} />
        </Place>
        {s === "good" && <Sparkles x={205} y={196} r={30} delay={0.1} n={6} />}
      </Home>
    ),
  },
  {
    say: { en: "Hawi tells Teacher Meron something worrying, but the teacher is too busy to listen.", am: "ሀዊ ለመምህርት መሮን የሚያሳስብ ነገር ነገረቻቸው፤ መምህርቷ ግን በሥራ ተጠምደው ማዳመጥ አልቻሉም።" },
    options: [
      { label: { en: "Stop telling", am: "መናገር ማቆም" }, ok: false, note: { en: "Keep telling until someone helps! Go to the next grown-up on your helping hand.", am: "አንድ ሰው እስኪረዳ ድረስ ተናገሩ! በእርዳታ እጃችሁ ላይ ወዳለው ቀጣይ ሰው ሂዱ።" } },
      { label: { en: "Tell the next grown-up she trusts", am: "ለምታምነው ቀጣይ ትልቅ ሰው መናገር" }, ok: true },
    ],
    good: { en: "Yes! Keep telling until someone helps. You are never a bother.", am: "አዎ! አንድ ሰው እስኪረዳ ድረስ ተናገሩ። መቼም አታስቸግሩም።" },
    scene: (id, s) => (
      <Classroom id={id}>
        <Place x={140} y={294} s={0.46} tap={TAP.hawi}>
          <Wolf mood={s === "good" ? "happy" : "sad"} ears={s === "good" ? "up" : "flat"} />
        </Place>
        {s === "good" ? (
          <Place x={270} y={294} s={0.5} flip tap={TAP.hawi}>
            <Wolf mood="happy" dress="#8A5AB8" arm="bless" />
          </Place>
        ) : (
          <Place x={270} y={290} s={0.52} flip tap={TAP.teacher}>
            <Teacher mood="worried" />
          </Place>
        )}
      </Classroom>
    ),
  },
];

export default function SafeOrTell({ lang, onDone }: DemoProps) {
  const [filled, setFilled] = useState(0);
  return (
    <ChoiceRounds
      lang={lang}
      title={{ en: "OK, or Say No and Tell?", am: "ችግር የለውም ወይስ እምቢ ብሎ መናገር?" }}
      goal={{ en: "Your body belongs to you. Choose what to do.", am: "ሰውነታችሁ የራሳችሁ ነው። ምን እንደምታደርጉ ምረጡ።" }}
      color={COLOR}
      rounds={ROUNDS}
      ending={(id, finish) => ({
        scene: (
          <Home id={id} time="day">
            <HelpingHand x={200} y={262} s={1.6} filled={filled} />
            <Place x={330} y={296} s={0.36} flip className={filled >= 5 ? "lali-hop" : undefined} tap={TAP.cub}>
              <Cub mood={filled >= 5 ? "joy" : "happy"} />
            </Place>
          </Home>
        ),
        controls: (
          <div className="mt-4">
            <p className="font-display text-xl font-extrabold text-ink">
              {t(lang, filled >= 5 ? { en: "Your helping hand: five grown-ups you can always tell.", am: "የእርዳታ እጃችሁ፦ ሁልጊዜ ልትነግሯቸው የምትችሉ አምስት ትልልቅ ሰዎች።" } : { en: `Make a helping hand: tap to put a grown-up you trust on each finger (${filled} of 5).`, am: `የእርዳታ እጅ ሥሩ፦ በእያንዳንዱ ጣት ላይ የምታምኑትን ትልቅ ሰው ለማስቀመጥ ንኩ (${filled} ከ5)።` })}
            </p>
            {filled >= 5 && <p className="mt-1 text-lg text-muted">{t(lang, { en: "Who are yours? Talk about it with a grown-up at home.", am: "የእናንተ እነማን ናቸው? ቤት ካለ ትልቅ ሰው ጋር ተነጋገሩበት።" })}</p>}
            <div className="mt-3 flex flex-wrap gap-3">
              {filled >= 5 ? (
                <Next onClick={finish} color={COLOR}>
                  {t(lang, { en: "Finish", am: "ጨርሱ" })}
                </Next>
              ) : (
                <Next
                  onClick={() => {
                    sound.good();
                    setFilled((x) => Math.min(5, x + 1));
                  }}
                  color={COLOR}
                >
                  {t(lang, { en: "Add a grown-up", am: "ትልቅ ሰው ጨምሩ" })}
                </Next>
              )}
            </div>
          </div>
        ),
      })}
      finale={{ en: "My body belongs to me, and I know who to tell!", am: "ሰውነቴ የራሴ ነው፤ ለማን እንደምናገርም አውቃለሁ!" }}
      finaleScene={(id) => (
        <Yard id={id} time="day">
          {[
            { x: 90, el: <Camel who="ayan" mood="joy" />, tap: TAP.ayan },
            { x: 170, el: <Gugu mood="joy" pose="wave" />, tap: TAP.gugu },
            { x: 240, el: <Wolf mood="joy" wag />, tap: TAP.hawi },
            { x: 310, el: <Ibex mood="joy" pose="wave" />, tap: TAP.haben },
          ].map(({ x, el, tap }) => (
            <Place key={x} x={x} y={294} s={0.4} flip={x > 200} tap={tap}>
              {el}
            </Place>
          ))}
          <Hearts spots={[[150, 150, 0.2], [200, 136, 0.8], [250, 150, 1.4]]} />
        </Yard>
      )}
      onDone={onDone}
    />
  );
}
