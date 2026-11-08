import type { Story } from "../../../stories";

/*
  "The King's Letter ሠ" (Fidel Foundations, level 1): the ሠ family, and the second sounds-alike
  pair. Anbessa plays king in a paper crown. Grandma writes ንጉሥ (king) and shows him its last
  letter: ሥ, from the ሠ family, the one children call ንጉሡ ሠ, "the king's ሠ". Seven helpers
  (ሠ ሡ ሢ ሣ ሤ ሥ ሦ) serve the king, each bringing a thing that starts with its letter: ሣ spreads
  ሣር (fresh grass, as for a celebration), ሥ paints a ሥዕል (picture), ሦ beats ሦስት (three)
  drums. Then Gugu brings ሰ, one of Tsehay's sheep (level 2, "Seven Sheep for ሰ"), and they
  sound exactly the same: Grandma names them ንጉሡ ሠ and እሳቱ ሰ (the fire's ሰ, from እሳት).
  The join-in line is "Make way, make way for the king!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line (ለንጉሡ መንገድ ልቀቁ!), ጎፈር for the mane (page 4), the drums ዱም፣ ዱም and
  «ለሁለቱም ድግስ ይደረግ ብዬ አዝዣለሁ!» (page 10). Modern writers often spell ሣር and ሦስት with
  ሳ and ሶ; the traditional spellings are used here on purpose.
*/
const story: Story = {
  id: "fidel-king-se",
  course: "fidel-foundations",
  pack: "fidel",
  title: { en: "The King's Letter ሠ", am: "የንጉሡ ፊደል ሠ" },
  category: "Fidel",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#C2861A",
  scene: "lib-fidel-king-se",
  coverPage: 2,
  teaches: { fidel: ["ሠ", "ሰ"], words: ["ንጉሥ", "ሣር", "ሥዕል", "ሦስት"] },
  pages: [
    {
      en: `Anbessa has found a golden paper crown. "Lions are kings," he roars. "Today I am King Anbessa!" Grrr… it is a very small roar.`,
      am: "አንበሳ የወርቅ ቀለም ያለው የወረቀት ዘውድ አገኘ። «አንበሶች ነገሥታት ናቸው» ብሎ አገሳ። «ዛሬ እኔ ንጉሥ አንበሳ ነኝ!» ግርርር… በጣም ትንሽ ግሳት ነበረች።",
    },
    {
      en: `Lali flies to Grandma. "How do you write king?" Grandma writes ንጉሥ on a card. "Look at the last letter. That is ሥ, from the ሠ family. We call it the king's ሠ."`,
      am: "ላሊ ወደ አያቴ በረረች። «ንጉሥ እንዴት ይጻፋል?» አያቴ በካርድ ላይ ንጉሥ ብላ ጻፈች። «የመጨረሻውን ፊደል ተመልከቺ። ያ ሥ ነው፣ ከሠ ቤተሰብ። ንጉሡ ሠ ብለን እንጠራዋለን።»",
    },
    {
      en: `In march seven helpers to serve the king, each one wearing a letter: ሠ ሡ ሢ ሣ ሤ ሥ ሦ. "sa, su, si, saa, say, s, so!" Make way, make way for the king!`,
      am: "ንጉሡን ለማገልገል ሰባት ረዳቶች ተሰልፈው ገቡ፤ እያንዳንዳቸው ፊደል ለብሰዋል፦ ሠ ሡ ሢ ሣ ሤ ሥ ሦ። «ሠ፣ ሡ፣ ሢ፣ ሣ፣ ሤ፣ ሥ፣ ሦ!» ለንጉሡ መንገድ ልቀቁ!",
    },
    {
      en: "ሣ brings an armful of fresh green grass and spreads it on the floor, the way we do for a party. Grass is ሣር, and it starts with ሣ.",
      am: "ሣ እቅፍ ሙሉ ትኩስ አረንጓዴ ሣር ይዛ መጣች፤ ለበዓል እንደምናደርገው መሬቱ ላይ ጎዘጎዘችው። ሣር በሣ ይጀምራል።",
    },
    {
      en: `ሥ paints a picture of the king, with a very, very big mane. A picture is ሥዕል. "Is my mane really that big?" asks Anbessa. "Bigger!" giggles Lali.`,
      am: "ሥ የንጉሡን ሥዕል ሣለ፤ በጣም፣ በጣም ትልቅ ጎፈር ያለው። ሥዕል በሥ ይጀምራል። «ጎፈሬ በእርግጥ ያን ያህል ትልቅ ነው?» ብሎ ጠየቀ አንበሳ። «ከዚያም በላይ!» አለች ላሊ እየሳቀች።",
    },
    {
      en: "ሦ beats three drums: boom, boom, BOOM! Three is ሦስት, and it starts with ሦ. Make way, make way for the king!",
      am: "ሦ ሦስት ከበሮዎችን መታ፦ ዱም፣ ዱም፣ ዱም! ሦስት በሦ ይጀምራል። ለንጉሡ መንገድ ልቀቁ!",
    },
    {
      en: `Then Gugu marches in with a big grin. "I've brought a friend who sounds just like you!" Beside him trots ሰ, one of Tsehay's fluffy sheep.`,
      am: "ከዚያ ጉጉ ትልቅ ፈገግታ ይዞ እየተራመደ ገባ። «ድምፁ ልክ እንደ እናንተ የሆነ ጓደኛ አምጥቻለሁ!» ከአጠገቡ ከፀሐይ ለስላሳ በጎች አንዱ፣ ሰ፣ እየሮጠ ይመጣል።",
    },
    {
      en: `"ሠ!" says the king's helper. "ሰ!" says the sheep. They sound exactly the same! Lali buzzes in a puzzled circle. "So why are there two?"`,
      am: "«ሠ!» አለ የንጉሡ ረዳት። «ሰ!» አለ በጉ። ድምፃቸው ፍጹም አንድ ነው! ላሊ ግራ ተጋብታ ዞረች። «ታዲያ ለምን ሁለት ሆኑ?»",
    },
    {
      en: `"Long ago they sounded a little different," says Grandma. "Now they sound the same, but some words are written with ሠ and some with ሰ. So we give them names, to help us remember."`,
      am: "«ድሮ ድምፃቸው ትንሽ ይለያይ ነበር» አለች አያቴ። «አሁን አንድ ዓይነት ድምፅ አላቸው፤ ግን አንዳንድ ቃላት በሠ፣ አንዳንዶቹ ደግሞ በሰ ይጻፋሉ። ስለዚህ እንድናስታውሳቸው ስም እንሰጣቸዋለን።»",
    },
    {
      en: `"This one is the king's ሠ, because it ends the word king, ንጉሥ. And that one is the fire's ሰ, because it is in the word fire, እሳት."`,
      am: "«ይሄኛው ንጉሡ ሠ ነው፤ ምክንያቱም ንጉሥ የሚለውን ቃል ይጨርሳል። ያኛው ደግሞ እሳቱ ሰ ነው፤ ምክንያቱም እሳት በሚለው ቃል ውስጥ አለ።»",
    },
    {
      en: `King Anbessa stands up very tall. "Then I order a party for both of them!" Everyone dances on the soft green grass. Make way, make way for the king!`,
      am: "ንጉሥ አንበሳ ቀጥ ብሎ ቆመ። «እንግዲያው ለሁለቱም ድግስ ይደረግ ብዬ አዝዣለሁ!» ሁሉም ለስላሳው አረንጓዴ ሣር ላይ ጨፈሩ። ለንጉሡ መንገድ ልቀቁ!",
    },
    {
      en: `At bedtime the king takes off his crown. On the back he writes the king's letter, all by himself: ሥ. "Goodnight, king's ሠ. Goodnight, fire's ሰ."`,
      am: "በመኝታ ሰዓት ንጉሡ ዘውዱን አወለቀ። ከጀርባው ላይ የንጉሡን ፊደል ብቻውን ጻፈ፦ ሥ። «ደህና እደር፣ ንጉሡ ሠ። ደህና እደር፣ እሳቱ ሰ።»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "ሠ and ሰ sound the same. What names help us tell them apart? (The king's ሠ, from ንጉሥ, and the fire's ሰ, from እሳት.)",
        "If you were king or queen for one day, what would you order?",
      ],
      am: [
        "ሠ እና ሰ አንድ ዓይነት ድምፅ አላቸው። እንድንለያቸው የሚረዱን ስሞች ምንድን ናቸው? (ንጉሡ ሠ፣ ከንጉሥ፤ እሳቱ ሰ፣ ከእሳት።)",
        "ለአንድ ቀን ንጉሥ ወይም ንግሥት ብትሆኑ ምን ታዝዙ ነበር?",
      ],
    },
    activity: {
      en: `Make a paper crown together and write ሥ on it. Then play "The king says": the king calls a sound (ሣ, ሦ, ሥ…) and everyone finds that letter on a card and holds it up. Take turns being king.`,
      am: "አብራችሁ የወረቀት ዘውድ ሥሩና ሥ ጻፉበት። ከዚያ «ንጉሡ እንዲህ ይላል» ተጫወቱ፦ ንጉሡ አንድ ድምፅ ይጠራል (ሣ፣ ሦ፣ ሥ…)፤ ሁሉም ያንን ፊደል በካርድ ላይ ፈልገው ከፍ ያደርጋሉ። በየተራ ንጉሥ ሁኑ።",
    },
  },
};

export default story;
