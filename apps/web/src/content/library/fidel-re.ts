import type { Story } from "../stories";

/*
  "Race to the River ረ": seven brothers and sisters, the ረ family (ረ ሩ ሪ ራ ሬ ር ሮ), race from
  the hill to the river to find out who is fastest. Each runs their own way (ሩ rolls, ሪ skips,
  ራ roars, ሮ stops to smell the flowers) until ረ trips, everyone bumps into everyone, and they
  tumble down in one giggling ball and land in the river together. Who won? Nobody remembers.
  ሱ, one of Tsehay's sheep from "Seven Sheep for ሰ", stands beside ረ and they read ረሱ, "they forgot".
  The join-in line is "One, two, three… run, run, run!" (ሩጡ starts with ሩ.)

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the splash sound (ፏ!, page 10), the bump sound ድው, "a little purr" for ር (page 4, here just
  "a very short sound") and the closing line ዋኙ፣ ዋኙ፣ ዋኙ.
*/
const story: Story = {
  id: "fidel-re",
  pack: "fidel",
  // In the fidel-foundations learning package (docs/PACKAGES.md): opens only through the course.
  course: "fidel-foundations",
  title: { en: "Race to the River ረ", am: "እስከ ወንዙ ሩጫ ረ" },
  category: "Fidel",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#2E86C1",
  scene: "lib-fidel-re",
  coverPage: 10,
  teaches: { fidel: ["ረ", "ሩ", "ሪ", "ራ", "ሬ", "ር", "ሮ"], words: ["ረሱ"] },
  pages: [
    {
      en: 'Seven brothers and sisters live at the top of the hill: the ረ family. Every morning they ask the very same question: "Who is the fastest?"',
      am: "በኮረብታው አናት ላይ ሰባት ወንድሞችና እህቶች ይኖራሉ፦ የረ ቤተሰብ። በየጠዋቱ ያንኑ ጥያቄ ይጠይቃሉ፦ «ከሁላችን ፈጣኑ ማነው?»",
    },
    {
      en: 'Today Gugu draws a line in the dust. "Let\'s find out! A race to the river! Everybody on the line!"',
      am: "ዛሬ ጉጉ በአቧራው ላይ መስመር ሳለ። «እስቲ እንወቅ! እስከ ወንዙ ሩጫ! ሁላችሁም መስመሩ ላይ ቁሙ!»",
    },
    {
      en: 'Seven letters line up, toes on the line. ረ says "ra", like in run. ሩ says "ru", like in rule. ሪ says "ri", like in reed.',
      am: "ሰባት ፊደሎች ጣታቸውን መስመሩ ላይ አድርገው ተሰለፉ። ረ «ረ» ይላል። ሩ «ሩ» ይላል። ሪ «ሪ» ይላል።",
    },
    {
      en: 'ራ says "raa", like a big lion roar! ሬ says "ray", like in rain. ር says just "r", a tiny growl. And ሮ says "ro", like in road.',
      am: "ራ «ራ» ይላል፣ ልክ እንደ አንበሳ ግሳት! ሬ «ሬ» ይላል። ር «ር» ብቻ ይላል፣ በጣም አጭር ድምፅ። ሮ ደግሞ «ሮ» ይላል።",
    },
    {
      en: 'Lali waves the flag. "One, two, three… run, run, run!" And off they go, kicking up the dust!',
      am: "ላሊ ባንዲራውን አውለበለበች። «አንድ፣ ሁለት፣ ሦስት… ሩጡ፣ ሩጡ፣ ሩጡ!» አቧራውን እያስነሱ ተፈተለኩ!",
    },
    {
      en: "ረ races ahead. ሩ rolls along like a ball. ሪ skips: skip, skip, skip. ራ roars so loudly that the birds fly away! Run, run, run!",
      am: "ረ ቀድሞ ይሮጣል። ሩ እንደ ኳስ ይንከባለላል። ሪ ይዘልላል፦ ዘለል፣ ዘለል፣ ዘለል። ራ በጣም ጮክ ብሎ ስለሚያገሳ ወፎቹ በረሩ! ሩጡ፣ ሩጡ፣ ሩጡ!",
    },
    {
      en: 'ሬ hops over the stones. ር, the smallest, runs on tiny legs, rrr, rrr. And ሮ? ሮ stops to smell every single flower. "Mmm!"',
      am: "ሬ በድንጋዮቹ ላይ እየዘለለ ያልፋል። ትንሹ ር በትናንሽ እግሮቹ ይሮጣል፣ ርርር፣ ርርር። ሮስ? ሮ ደግሞ እያንዳንዷን አበባ ለማሽተት ይቆማል። «እም!»",
    },
    {
      en: "Up the last hill they go, faster and faster. Then, oh no! ረ trips on a root. Bump! ሩ bumps into ረ. Bump! ሪ bumps into ሩ…",
      am: "የመጨረሻውን ኮረብታ በፍጥነት፣ በበለጠ ፍጥነት ወጡ። ከዚያ ወይኔ! ረ በዛፍ ሥር ተደናቀፈ። ድው! ሩ ረን ገጨው። ድው! ሪ ሩን ገጨው…",
    },
    {
      en: "Bump, bump, bump! Down the other side they tumble, all seven in one big giggling ball, rolling and rolling, right to the river…",
      am: "ድው፣ ድው፣ ድው! ሰባቱም አንድ ትልቅ የሳቅ ኳስ ሆነው በሌላኛው በኩል ቁልቁል ተንከባለሉ፤ እየተንከባለሉ፣ እየተንከባለሉ፣ እስከ ወንዙ ድረስ…",
    },
    {
      en: "SPLASH! Everybody lands in the river at exactly the same time. Even ሮ, who is still holding a flower.",
      am: "ፏ! ሁሉም በአንድ ጊዜ ወንዙ ውስጥ ገቡ። አሁንም አበባ የያዘው ሮም ጭምር።",
    },
    {
      en: "They splash and laugh and float on their backs. Gugu jumps in too! And they sing their family song, splashing on every sound: ረ ሩ ሪ ራ ሬ ር ሮ!",
      am: "ውሃውን እየረጩ ይስቃሉ፤ በጀርባቸው ይንሳፈፋሉ። ጉጉም ዘሎ ገባ! በእያንዳንዱ ድምፅ ውሃ እየረጩ የቤተሰባቸውን መዝሙር ዘመሩ፦ ረ ሩ ሪ ራ ሬ ር ሮ!",
    },
    {
      en: 'Lali buzzes over the water. "So, who won the race?" The ረ family look at each other. Who won? Nobody can remember!',
      am: "ላሊ በውሃው ላይ እያንጎራጎረች በረረች። «እሺ፣ ሩጫውን ማን አሸነፈ?» የረ ቤተሰብ እርስ በርስ ተያዩ። ማን አሸነፈ? ማንም አያስታውስም!",
    },
    {
      en: 'On the bank stands ሱ, one of Tsehay\'s sheep. ረ climbs out beside him. ረ "ra", ሱ "su": ረሱ! It means "they forgot!" And everybody laughs and laughs.',
      am: "በወንዙ ዳር ከፀሐይ በጎች አንዱ ሱ ቆሟል። ረ ከውሃው ወጥቶ ከአጠገቡ ቆመ። ረ «ረ»፣ ሱ «ሱ»፦ ረሱ! ማን እንዳሸነፈ ረሱ! ሁሉም ሳቁ፣ ሳቁ።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Nobody remembered who won. Did it matter? What was the best part of the race?",
        "ራ sounds like a roar and ር sounds like a tiny growl. Can you say the ረ family in a roaring voice, then a tiny voice?",
      ],
      am: [
        "ማን እንዳሸነፈ ማንም አላስታወሰም። ይህ ችግር ነበር? የሩጫው ምርጡ ክፍል የትኛው ነበር?",
        "ራ እንደ ግሳት ይሰማል፤ ር ደግሞ በጣም አጭር ድምፅ ነው። የረ ቤተሰብን በትልቅ ድምፅ፣ ከዚያ በትንሽ ድምፅ ማለት ትችላላችሁ?",
      ],
    },
    activity: {
      en: "Have a letter race: write ረ ሩ ሪ ራ ሬ ር ሮ on seven cards and lay them along a path. Run from card to card, shouting each sound as you land on it, and finish with a pretend splash onto a pillow!",
      am: "የፊደል ሩጫ አድርጉ፦ ረ ሩ ሪ ራ ሬ ር ሮን በሰባት ካርዶች ላይ ጽፋችሁ በመንገድ ላይ አስቀምጡ። ከካርድ ወደ ካርድ ሩጡ፤ በእያንዳንዱ ላይ ስታርፉ ድምፁን ጮክ ብላችሁ በሉ፤ በመጨረሻም ትራስ ላይ «ፏ!» ብላችሁ ዝለሉ!",
    },
  },
};

export default story;
