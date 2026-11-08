"use client";

import { AuntieSheep, Cat, Cub, Grandma, Gugu, Ibex, Papa, TAP, Tsehay, Wolf } from "@/components/book/courses/values-character/kit-cast";
import { Coin, EdirBox, Nest, WeaverBird } from "@/components/book/courses/values-character/kit-more";
import { HouseFront, Village, Yard } from "@/components/book/courses/values-character/kit-places";
import { Bedroll, Hearts, Jerrycan, Notes, Sign, Sparkles, Steam } from "@/components/book/courses/values-character/kit-props";
import { Acacia, Place, Rain } from "@/components/book/scenery";
import type { DemoProps } from "../../types";
import { ChoiceRounds, type Round } from "./choice-rounds";

/*
  Helping Hands (level 6: caring for elders, neighbours and animals, and gratitude), from "The
  Edir Box", "The Little Weaver Bird" and "Clean Water, Green Hill". Six neighbours (people and
  animals) need something; the child picks the help that fits. Wild animals are helped from a
  little distance, and when others help us, we say thank you and help them back.
*/

const COLOR = "#B8683E";

const ROUNDS: Round[] = [
  {
    say: { en: "Grandma is carrying a heavy jerrycan of water up the hill.", am: "አያቴ ከባድ የውሃ ጀሪካን ይዛ ዳገቱን ትወጣለች።" },
    options: [
      { label: { en: "Run past her to go and play.", am: "አልፎ ሮጦ ለመጫወት መሄድ።" }, ok: false, note: { en: "Grandma's arms are tired. Who could share the load?", am: "የአያቴ እጆች ደክመዋል። ሸክሙን ማን ሊጋራ ይችላል?" } },
      { label: { en: "\"Let me help! We'll carry it together.\"", am: "«ልርዳሽ! አብረን እንሸከመው።»" }, ok: true },
      { label: { en: "Say, \"You're very slow!\"", am: "«በጣም ቀርፋፋ ነሽ!» ማለት።" }, ok: false, note: { en: "That would hurt her feelings. Elders deserve our help and respect.", am: "ይህ ስሜቷን ይጎዳል። ሽማግሌዎች እርዳታችንና አክብሮታችን ይገባቸዋል።" } },
    ],
    good: { en: "Two pairs of hands make it light. Grandma blesses you all the way home.", am: "ሁለት ጥንድ እጆች ሸክሙን አቀለሉት። አያቴ እስከ ቤት ድረስ መረቀችን።" },
    scene: (id, s) => (
      <Village id={id} time="day">
        <Place x={s === "good" ? 210 : 180} y={292} s={0.5} tap={TAP.grandma}>
          <Grandma mood={s === "good" ? "joy" : "worried"} arm={s === "good" ? "bless" : "down"} />
        </Place>
        <Jerrycan x={s === "good" ? 270 : 236} y={292} s={1.2} />
        <Place x={s === "good" ? 310 : 90} y={294} s={0.44} flip={s === "good"} tap={TAP.cub}>
          <Cub mood={s === "good" ? "joy" : "happy"} arm={s === "good" ? "hold" : "none"} />
        </Place>
        {s === "good" && <Hearts spots={[[250, 190, 0.3], [270, 176, 1.1]]} />}
      </Village>
    ),
  },
  {
    say: { en: "Grandpa Tolosa is ill in bed. He is tired, and a little lonely.", am: "አያቴ ቶሎሳ ታሞ ተኝቷል። ደክሞታል፤ ትንሽም ብቸኝነት ተሰምቶታል።" },
    options: [
      { label: { en: "Play noisy games outside his window.", am: "በመስኮቱ ሥር ጫጫታ ያለበት ጨዋታ መጫወት።" }, ok: false, note: { en: "A sick person needs rest. Noise makes it hard to sleep.", am: "የታመመ ሰው ዕረፍት ያስፈልገዋል። ጫጫታ እንቅልፍ ይከለክላል።" } },
      { label: { en: "Forget about him until he's better.", am: "እስኪሻለው ድረስ መርሳት።" }, ok: false, note: { en: "People are medicine for each other. A visit can help a lot!", am: "ሰው ለሰው መድኃኒቱ ነው። መጠየቅ በጣም ይረዳል!" } },
      { label: { en: "Visit him with soup, and sing a quiet song.", am: "ሾርባ ይዞ መጠየቅና ቀስ ያለ ዘፈን መዘመር።" }, ok: true },
    ],
    good: { en: "His tail thumps: thank you. People are medicine for each other.", am: "ጅራቱን መታ መታ አደረገ፦ አመሰግናለሁ። ሰው ለሰው መድኃኒቱ ነው።" },
    scene: (id, s) => (
      <Yard id={id} time={s === "good" ? "evening" : "day"} house={false}>
        <Bedroll x={240} y={282} w={170} color="#2E9A8A" />
        <Place x={220} y={286} s={0.46} tap={TAP.elder}>
          <Wolf elder mood={s === "good" ? "happy" : "worried"} sleepy={s !== "good"} />
        </Place>
        {s === "good" && (
          <>
            <g transform="translate(110 280)">
              <path d="M-14 -14 Q-16 2 -7 4 L7 4 Q16 2 14 -14Z" fill="#8A4A2A" />
              <ellipse cx={0} cy={-14} rx={14} ry={4} fill="#E8A86A" />
              <Steam x={0} y={-22} />
            </g>
            <Place x={60} y={296} s={0.38} tap={TAP.hawi}>
              <Wolf mood="happy" />
            </Place>
            <Notes x={110} y={190} color="#FFFFFF" />
          </>
        )}
        {s === "oops" && <Sign x={220} y={170} kind="!" delay={0.2} color="#E2463F" />}
      </Yard>
    ),
  },
  {
    say: { en: "It's the dry season. The little birds are thirsty, and the puddles are gone.", am: "በጋ ነው። ትንንሾቹ ወፎች ተጠምተዋል፤ ኩሬዎቹም ደርቀዋል።" },
    options: [
      { label: { en: "Catch one to keep as a pet.", am: "አንዱን ይዞ እንደ የቤት እንስሳ ማቆየት።" }, ok: false, note: { en: "Wild birds belong in the wild. We can help them from a little distance.", am: "የዱር ወፎች ቦታቸው ዱር ነው። ከትንሽ ርቀት ልንረዳቸው እንችላለን።" } },
      { label: { en: "Put out a dish of water every morning.", am: "በየጠዋቱ በሳህን ውሃ ማስቀመጥ።" }, ok: true },
      { label: { en: "Chase them away.", am: "ማባረር።" }, ok: false, note: { en: "They are only looking for water, like us on a hot day.", am: "እንደኛው በሞቃት ቀን ውሃ ብቻ ነው የሚፈልጉት።" } },
    ],
    good: { en: "Splash! The birds drink and chirp. A full dish, filled each morning.", am: "ጭልጥ! ወፎቹ ጠጥተው ጮኹ። በየጠዋቱ የሚሞላ ሳህን።" },
    scene: (id, s) => (
      <Yard id={id} time="day" house={false}>
        <Acacia x={300} y={250} s={1.6} />
        <g transform="translate(200 284)">
          <ellipse rx={22} ry={5.5} fill="#B8683E" />
          {s === "good" && <ellipse cx={0} cy={-1} rx={18} ry={3.4} fill="#9FD4F0" />}
        </g>
        {s === "good" ? (
          <>
            <WeaverBird x={186} y={276} s={1} />
            <WeaverBird x={216} y={276} s={1} flip />
            <Sparkles x={200} y={260} r={30} delay={0.2} n={4} />
          </>
        ) : (
          <WeaverBird x={300} y={150} s={1.1} flap />
        )}
        <Place x={100} y={294} s={0.46} tap={TAP.gugu}>
          <Gugu mood={s === "good" ? "joy" : "happy"} pose={s === "good" ? "point" : "sit"} />
        </Place>
      </Yard>
    ),
  },
  {
    say: { en: "A baby bird has fallen out of its nest. Its mother is calling from the branch.", am: "አንዲት ጫጩት ከጎጆዋ ወድቃለች። እናቷ ከቅርንጫፉ ላይ ትጣራለች።" },
    options: [
      { label: { en: "Take it home in a box.", am: "በሳጥን ወደ ቤት መውሰድ።" }, ok: false, note: { en: "A box is no home for a wild bird. Its mother knows how to feed it.", am: "ሳጥን ለዱር ወፍ ቤት አይሆንም። እናቷ እንዴት እንደምትመግባት ታውቃለች።" } },
      { label: { en: "Ask a grown-up to put it back gently, then step far back and watch.", am: "ትልቅ ሰው ቀስ ብሎ እንዲመልሳት መጠየቅ፤ ከዚያ ርቆ ቆሞ መመልከት።" }, ok: true },
      { label: { en: "Poke it to see if it moves.", am: "ትንቀሳቀስ እንደሆነ ለማየት መነካካት።" }, ok: false, note: { en: "Gently, gently: it's someone's baby. Little bodies hurt easily.", am: "ቀስ፣ ቀስ፦ የአንድ እናት ልጅ ነው። ትንሽ ሰውነት በቀላሉ ይጎዳል።" } },
    ],
    good: { en: "Back in its nest! The mother flies in with breakfast. Peep, peep!", am: "ወደ ጎጆዋ ተመለሰች! እናቷ ቁርስ ይዛ በረረች። ጺው፣ ጺው!" },
    scene: (id, s) => (
      <Yard id={id} time="day" house={false}>
        <Acacia x={210} y={250} s={2.4} />
        <Nest x={214} y={140} s={1.2} />
        <WeaverBird x={170} y={118} s={1.3} />
        {s === "good" ? (
          <>
            <WeaverBird x={212} y={150} s={0.8} chick />
            <Place x={80} y={294} s={0.4} tap={TAP.tsehay}>
              <Tsehay mood="joy" />
            </Place>
            <Place x={330} y={292} s={0.5} flip tap={TAP.papa}>
              <Papa mood="happy" pose="wave" />
            </Place>
            <Hearts spots={[[214, 100, 0.4]]} />
          </>
        ) : (
          <>
            <WeaverBird x={214} y={280} s={1.6} chick />
            <Place x={300} y={294} s={0.44} flip tap={TAP.tsehay}>
              <Tsehay mood="worried" />
            </Place>
            <g transform="translate(360 288) scale(1.1)">
              <Cat mood="hunt" />
            </g>
          </>
        )}
      </Yard>
    ),
  },
  {
    say: { en: "In the storm, Auntie Sheep's roof blew off. What can the village do?", am: "በማዕበሉ የእማማ በግ ጣሪያ ተገነጠለ። መንደሩ ምን ማድረግ ይችላል?" },
    options: [
      { label: { en: "Nothing. It's her problem.", am: "ምንም። የእሷ ችግር ነው።" }, ok: false, note: { en: "Nobody should be alone on a hard day. What is the edir box for?", am: "በክፉ ቀን ማንም ብቻውን መሆን የለበትም። የዕድር ሳጥኑ ለምንድን ነው?" } },
      { label: { en: "The edir and the neighbours come together and fix it.", am: "ዕድሩና ጎረቤቶቹ ተሰብስበው ይጠግኑታል።" }, ok: true },
      { label: { en: "Just stand and watch.", am: "ዝም ብሎ ቆሞ ማየት።" }, ok: false, note: { en: "Watching doesn't fix a roof. Many hands do!", am: "ማየት ጣሪያን አይጠግንም። ብዙ እጆች ግን ይጠግናሉ!" } },
    ],
    good: { en: "Coins from the edir box buy new straw, and many hands fix the roof by evening. It's for each other!", am: "ከዕድሩ ሳጥን የወጣው ገንዘብ አዲስ ሣር ገዛ፤ ብዙ እጆችም እስከ ምሽት ጣሪያውን ጠገኑት። ለእርስ በርሳችን ነው!" },
    scene: (id, s) => (
      <Village id={id} time={s === "good" ? "evening" : "day"}>
        {s !== "good" && <Rain />}
        <g transform="translate(250 262) scale(0.7)">
          <HouseFront x={0} y={0} wall="#D89B62" door="open" />
        </g>
        {s !== "good" && <path d="M170 160 L330 160 L320 186 L180 186Z" fill="#7FA0D0" />}
        <Place x={110} y={294} s={0.46} tap={TAP.sheep}>
          <AuntieSheep mood={s === "good" ? "joy" : "worried"} />
        </Place>
        {s === "good" && (
          <>
            <EdirBox x={170} y={290} s={0.8} open />
            <Coin x={170} y={260} delay={0.3} />
            <Place x={340} y={296} s={0.4} flip tap={TAP.papa}>
              <Papa mood="joy" pose="wave" />
            </Place>
            <Place x={60} y={298} s={0.34} tap={TAP.haben}>
              <Ibex mood="joy" />
            </Place>
            <Sparkles x={250} y={140} r={60} delay={0.3} n={6} />
          </>
        )}
      </Village>
    ),
  },
  {
    say: { en: "When your family needed help, the neighbours came. Now what do you do?", am: "ቤተሰባችን እርዳታ ሲያስፈልገው ጎረቤቶቹ መጡ። አሁን ምን እናድርግ?" },
    options: [
      { label: { en: "Say thank you, and help them when they need it.", am: "ማመስገን፤ ሲያስፈልጋቸውም መርዳት።" }, ok: true },
      { label: { en: "Nothing. They were just being nice.", am: "ምንም። ደግ ስለሆኑ ብቻ ነው።" }, ok: false, note: { en: "Kindness grows when we say thank you and pass it on.", am: "ስናመሰግንና ደግነትን ስናስተላልፍ ደግነት ያድጋል።" } },
    ],
    good: { en: "Thank you! Galatoomi! Mahadsanid! Yekenyeley! Different words, one thank-you.", am: "አመሰግናለሁ! ገለቶሚ! ማሃድሰኒድ! የቐንየለይ! የተለያዩ ቃላት፣ አንድ ምስጋና።" },
    scene: (id, s) => (
      <Village id={id} time="day">
        {[
          { x: 60, el: <AuntieSheep mood="happy" />, tap: TAP.sheep },
          { x: 130, el: <Grandma mood="happy" />, tap: TAP.grandma },
          { x: 280, el: <Cub mood={s === "good" ? "joy" : "happy"} arm={s === "good" ? "up" : "none"} />, tap: TAP.cub },
          { x: 340, el: <Gugu mood={s === "good" ? "joy" : "happy"} pose={s === "good" ? "wave" : "sit"} />, tap: TAP.gugu },
        ].map(({ x, el, tap }) => (
          <Place key={x} x={x} y={294} s={0.42} flip={x > 200} tap={tap}>
            {el}
          </Place>
        ))}
        {s === "good" && <Hearts spots={[[180, 180, 0.2], [210, 166, 0.8], [240, 180, 1.4]]} s={1.3} />}
      </Village>
    ),
  },
];

export default function WhoNeedsHelp({ lang, onDone }: DemoProps) {
  return (
    <ChoiceRounds
      lang={lang}
      title={{ en: "Helping Hands", am: "የሚረዱ እጆች" }}
      goal={{ en: "A neighbour needs something. Choose the help that fits.", am: "አንድ ጎረቤት የሆነ ነገር ያስፈልገዋል። የሚስማማውን እርዳታ እንምረጥ።" }}
      color={COLOR}
      rounds={ROUNDS}
      finale={{ en: "Six neighbours helped, people and birds! Helping hands make a happy village.", am: "ስድስት ጎረቤቶች ተረዱ፣ ሰዎችም ወፎችም! የሚረዱ እጆች ደስተኛ መንደር ይፈጥራሉ።" }}
      finaleScene={(id) => (
        <Village id={id} time="evening">
          {[
            { x: 50, el: <Grandma mood="joy" arm="bless" />, tap: TAP.grandma, s: 0.42 },
            { x: 120, el: <Wolf elder mood="joy" />, tap: TAP.elder, s: 0.4 },
            { x: 190, el: <Cub mood="joy" arm="up" />, tap: TAP.cub, s: 0.38 },
            { x: 260, el: <Tsehay mood="joy" pose="hop" />, tap: TAP.tsehay, s: 0.34 },
            { x: 330, el: <AuntieSheep mood="joy" />, tap: TAP.sheep, s: 0.4 },
          ].map(({ x, el, tap, s }) => (
            <Place key={x} x={x} y={294} s={s} flip={x > 200} tap={tap}>
              {el}
            </Place>
          ))}
          <WeaverBird x={300} y={120} s={1} flap />
          <Sparkles x={200} y={140} r={110} delay={0.2} n={9} />
        </Village>
      )}
      onDone={onDone}
    />
  );
}
