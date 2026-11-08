import type { Story } from "../../../stories";

/*
  "Plant a Tree with ቸ" (Fidel Foundations, level 3): the ቸ family on tree-planting day, when
  the whole village plants seedlings on a bare hill (as families across Ethiopia do in the rainy
  season). Seven seedlings in pots wear ቸ ቹ ቺ ቻ ቼ ች ቾ; ችግኝ (seedling) starts with ች, whose
  short sound is like a sneeze ("ይማርህ!"), and a passing farmer calls ቼ! to his horse, which is
  really what Amharic speakers say. Anbessa thinks he is too little to carry the water up the
  hill, but one small bucket at a time he waters all seven, and reads ቻ+ለ ቻለ, "he did it!".
  Gugu, who helped, is ቸ+ር ቸር, kind. The last page jumps years ahead to a green forest.
  The join-in line is "Dig, plant, water, grow!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line (ቆፍር፣ ትከል፣ አጠጣ፣ አሳድግ!), the digging sound ቆፍ፣ ቆፍ (page 3), the slosh
  ቅልቅል (page 8) and how ቻለ is glossed (page 8).
*/
const story: Story = {
  id: "fidel-che-trees",
  course: "fidel-foundations",
  pack: "fidel",
  title: { en: "Plant a Tree with ቸ", am: "ከቸ ጋር ችግኝ እንትከል" },
  category: "Fidel",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#2F8F4E",
  scene: "lib-fidel-che-trees",
  coverPage: 10,
  teaches: { fidel: ["ቸ"], words: ["ችግኝ", "ቻለ", "ቸር"] },
  pages: [
    {
      en: "It's tree-planting day! Everyone in the village climbs the bare brown hill with spades and buckets. Anbessa carries the smallest bucket of all.",
      am: "ዛሬ የችግኝ ተከላ ቀን ነው! የመንደሩ ሰዎች በሙሉ አካፋና ባልዲ ይዘው ባዶውን ቡናማ ኮረብታ ይወጣሉ። አንበሳ ከሁሉም ትንሿን ባልዲ ይዟል።",
    },
    {
      en: "At the top, seven tiny trees are waiting in seven pots. Each pot wears a letter of the ቸ family: ቸ ቹ ቺ ቻ ቼ ች ቾ.",
      am: "በአናቱ ላይ ሰባት ትንንሽ ዛፎች በሰባት ማሰሮዎች ውስጥ ይጠብቃሉ። እያንዳንዱ ማሰሮ የቸ ቤተሰብ ፊደል ለብሷል፦ ቸ ቹ ቺ ቻ ቼ ች ቾ።",
    },
    {
      en: `"A baby tree is called a ችግኝ," says Grandma, "and ችግኝ starts with ች." ች's sound is short, just "ch", like a little sneeze. Ch! "Bless you!" says Lali.`,
      am: "«ትንሽ ዛፍ ችግኝ ትባላለች» አለች አያቴ፤ «ችግኝ ደግሞ በች ይጀምራል።» የች ድምፅ አጭር ነው፦ «ች» ብቻ፣ እንደ ትንሽ ማስነጠስ። ች! «ይማርህ!» አለች ላሊ።",
    },
    {
      en: `First comes ቸ, "cha". Gugu digs a hole, scritch, scratch, and in goes ቸ. Pat the soil. Pour the water. Dig, plant, water, grow!`,
      am: "መጀመሪያ ቸ ነው፤ «ቸ» ይላል። ጉጉ ጉድጓድ ቆፈረ፣ ቆፍ፣ ቆፍ፤ ቸም ገባ። አፈሩን መታ መታ አድርግ። ውሃውን አፍስስ። ቆፍር፣ ትከል፣ አጠጣ፣ አሳድግ!",
    },
    {
      en: `ቹ, "chu", like in choose, goes in next to ቸ. ቺ, "chi", like in cheese, goes in next to ቹ. Lali buzzes over each one: "Grow strong, little trees!"`,
      am: "ቹ «ቹ» ይላል፤ ከቸ አጠገብ ተተከለ። ቺ «ቺ» ይላል፤ ከቹ አጠገብ ተተከለ። ላሊ በእያንዳንዳቸው ላይ በረረች፦ «ጠንክራችሁ እደጉ፣ ትንንሽ ዛፎች!»",
    },
    {
      en: `Then ቻ, "chaa", and ቼ, "chay", like in chain. A farmer rides past on his horse: "ቼ! ቼ!" That's how you tell a horse to go! Dig, plant, water, grow!`,
      am: "ከዚያ ቻ «ቻ»፣ ቼ ደግሞ «ቼ» ይላል። አንድ ገበሬ በፈረሱ እያለፈ «ቼ! ቼ!» አለ። ፈረስ እንዲሄድ የሚባለው እንዲህ ነው! ቆፍር፣ ትከል፣ አጠጣ፣ አሳድግ!",
    },
    {
      en: `Then ች, "ch!", and last of all ቾ, "cho", like in chocolate. Seven little trees stand in a row. But Anbessa's bucket is empty, and the stream is far down the hill.`,
      am: "ከዚያ ች «ች!»፣ በመጨረሻም ቾ «ቾ» ይላል። ሰባት ትንንሽ ዛፎች በመስመር ቆሙ። የአንበሳ ባልዲ ግን ባዶ ነው፤ ጅረቱ ደግሞ ከኮረብታው በታች ሩቅ ነው።",
    },
    {
      en: `"I'm too little to carry water all that way," sighs Anbessa. Gugu puts a paw on his shoulder. "Little by little. One small bucket at a time."`,
      am: "«ውሃውን እዚያ ድረስ ለመሸከም በጣም ትንሽ ነኝ» ብሎ ተከዘ አንበሳ። ጉጉ እጁን ትከሻው ላይ አደረገ። «ቀስ በቀስ። በአንድ ጊዜ አንድ ትንሽ ባልዲ።»",
    },
    {
      en: `Down and up, down and up. Slosh, slosh. One bucket for every tree, seven times! When the last tree is watered, Grandma holds up a card: "ቻ… ለ… ቻለ! It means: he did it!"`,
      am: "ወረደ፣ ወጣ፤ ወረደ፣ ወጣ። ቅልቅል፣ ቅልቅል። ለእያንዳንዱ ዛፍ አንድ ባልዲ፣ ሰባት ጊዜ! የመጨረሻው ዛፍ ውሃ ሲጠጣ አያቴ አንድ ካርድ ከፍ አደረገች፦ «ቻ… ለ… ቻለ! ቻለ ማለት ‹አደረገው፣ ተሳካለት› ማለት ነው!»",
    },
    {
      en: `Lali brings another card: "ቸ… ር… ቸር! It means kind and generous. Gugu, you were ቸር to help!" Gugu goes pink right up to his ears.`,
      am: "ላሊ ሌላ ካርድ አመጣች፦ «ቸ… ር… ቸር! ቸር ማለት ደግና ለጋስ ማለት ነው። ጉጉ፣ ስለረዳኸው ቸር ነህ!» ጉጉ እስከ ጆሮው ድረስ ቀላ።",
    },
    {
      en: "All over the hill, little green trees stand in rows, hundreds and hundreds of them, each one planted by a pair of hands, or paws. Dig, plant, water, grow!",
      am: "በኮረብታው ሁሉ ትንንሽ አረንጓዴ ዛፎች በረድፍ ቆመዋል፤ በመቶዎች የሚቆጠሩ፣ እያንዳንዳቸው በአንድ ጥንድ እጆች ወይም መዳፎች የተተከሉ። ቆፍር፣ ትከል፣ አጠጣ፣ አሳድግ!",
    },
    {
      en: "Years later, when Anbessa is big, he climbs the hill again. Now it's a cool green forest full of birds, and seven tall trees still sing their names in the wind: ቸ ቹ ቺ ቻ ቼ ች ቾ.",
      am: "ከብዙ ዓመታት በኋላ አንበሳ ሲያድግ ኮረብታውን እንደገና ወጣ። አሁን በወፎች የተሞላ ቀዝቃዛ አረንጓዴ ደን ሆኗል፤ ሰባቱ ረጃጅም ዛፎችም አሁንም በነፋሱ ውስጥ ስማቸውን ይዘምራሉ፦ ቸ ቹ ቺ ቻ ቼ ች ቾ።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "ች sounds like a little sneeze. Which other letters say only their sound, with no vowel after it? (ህ, ል, ም, ር, ስ, ሽ, ብ…: the sixth hat.)",
        "Anbessa thought he was too little. What helped him? What big job could you do one small bucket at a time?",
      ],
      am: [
        "ች እንደ ትንሽ ማስነጠስ ይሰማል። ሌሎች ያለ አናባቢ ድምፃቸውን ብቻ የሚሉ ፊደሎች የትኞቹ ናቸው? (ህ፣ ል፣ ም፣ ር፣ ስ፣ ሽ፣ ብ…፦ ስድስተኛው ኮፍያ።)",
        "አንበሳ በጣም ትንሽ እንደሆነ አስቦ ነበር። ምን ረዳው? እናንተ በአንድ ጊዜ አንድ ትንሽ ባልዲ እያላችሁ ምን ትልቅ ሥራ መሥራት ትችላላችሁ?",
      ],
    },
    activity: {
      en: "Plant a bean in a cup of soil and write ችግኝ on the cup. Water it every day, and say the ቸ family while you pour: ቸ ቹ ቺ ቻ ቼ ች ቾ. When the first leaf appears, read the cup together: ችግኝ!",
      am: "ባቄላ በአፈር በተሞላ ኩባያ ውስጥ ትከሉና ኩባያው ላይ ችግኝ ብላችሁ ጻፉ። በየቀኑ ውሃ አጠጡት፤ ስታፈሱም የቸ ቤተሰብን በሉ፦ ቸ ቹ ቺ ቻ ቼ ች ቾ። የመጀመሪያው ቅጠል ሲወጣ ኩባያውን አብራችሁ አንብቡ፦ ችግኝ!",
    },
  },
};

export default story;
