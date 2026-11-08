import type { Story } from "../../../stories";

/*
  "The Best Bite" (level 3: gursha, sharing at the family table).
  Papa is working late, so Tsehay, Mama, Grandma and baby Dawit start dinner without him: spicy
  shiro and soft gomen on a big round injera. Tsehay plans to save the best bite, the soft middle
  where the shiro soaks in, for the very end. Grandma feeds Mama a gursha: "The sweetest gursha is
  the one you give." Then Papa comes home, tired and hungry, and only the middle is left. Tsehay
  thinks for a long time, then rolls the best bite and gives it to Papa as a gursha. Papa has
  brought warm bread from the market and gives her a gursha back.
  Join-in line: "The sweetest gursha is the one you give."

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ከሁሉ የሚጣፍጠው የምትሰጠው ጉርሻ ነው።», and the tummy rumble «ጉርርር».
*/
const story: Story = {
  id: "the-best-bite",
  course: "values-character",
  pack: "story",
  title: { en: "The Best Bite", am: "ምርጧ ጉርሻ" },
  category: "Values",
  ageBands: ["3-5", "6-7", "8-9"],
  isFree: false,
  color: "#C9502E",
  scene: "lib-the-best-bite",
  coverPage: 7,
  teaches: { words: ["gursha", "share", "injera", "family", "give"] },
  pages: [
    {
      en: "Mama cooked Tsehay's favourite dinner: spicy shiro and soft gomen on a big round injera. Papa was working late at the market, so they began without him.",
      am: "እማማ የፀሐይን ተወዳጅ እራት አበሰለች፦ በትልቅ ክብ እንጀራ ላይ ቅመም ያለው ሽሮና ለስላሳ ጎመን። አባባ ገበያ ላይ አምሽቶ ይሠራ ስለነበር ያለ እሱ ጀመሩ።",
    },
    {
      en: 'Tsehay had a plan. In the very middle of the injera, where the shiro soaks in, is the softest, tastiest bite of all. "I\'ll save that for the end," she thought. "It will be the best bite ever."',
      am: "ፀሐይ አንድ ዕቅድ ነበራት። በእንጀራው መሃል፣ ሽሮው በገባበት ቦታ፣ ከሁሉ የሚለሰልሰውና የሚጣፍጠው ጉርሻ አለ። «ያንን ለመጨረሻ አቆየዋለሁ» ብላ አሰበች። «ከሁሉ የምትበልጥ ጉርሻ ትሆናለች።»",
    },
    {
      en: 'First, Mama rolled a gursha and fed it to Tsehay. Mmm! Then Grandma fed Mama. "In our family we feed each other," said Grandma. "The sweetest gursha is the one you give."',
      am: "መጀመሪያ እማማ ጉርሻ ጠቅልላ ፀሐይን አጎረሰቻት። እምም! ከዚያ አያቴ እማማን አጎረሰቻት። «በቤተሰባችን እርስ በርሳችን እንጎራረሳለን» አለች አያቴ። «ከሁሉ የሚጣፍጠው የምትሰጠው ጉርሻ ነው።»",
    },
    {
      en: 'Tsehay ate all around the edges, round and round, keeping the middle safe. "My best bite is waiting for me," she smiled.',
      am: "ፀሐይ መሃሉን ሳትነካ በዳር በዳሩ ዙሪያውን በላች። «ምርጧ ጉርሻዬ ትጠብቀኛለች» አለች ፈገግ ብላ።",
    },
    {
      en: "Just then the door opened. It was Papa, home at last, tired and hungry. But the injera was nearly all gone. Only the middle was left: Tsehay's best bite.",
      am: "ልክ በዚያን ጊዜ በሩ ተከፈተ። አባባ ነበር፤ በመጨረሻ ቤት ደረሰ፣ ደክሞትና ርቦት። እንጀራው ግን ሊያልቅ ጥቂት ቀርቶት ነበር። የቀረው መሃሉ ብቻ ነበር፦ የፀሐይ ምርጧ ጉርሻ።",
    },
    {
      en: 'Papa sat down slowly. "Oh, I\'m not very hungry," he said. But his tummy said GRRRUMBLE, very loudly. Everyone giggled, even Papa.',
      am: "አባባ ቀስ ብሎ ተቀመጠ። «ኧረ ብዙም አልራበኝም» አለ። ሆዱ ግን በጣም ጮክ ብሎ ጉርርርር አለ። ሁሉም ሳቁ፤ አባባም ጭምር።",
    },
    {
      en: "Tsehay looked at her best bite. She looked at Papa. She thought about it for a long, long time.",
      am: "ፀሐይ ምርጧን ጉርሻዋን ተመለከተች። አባባን ተመለከተች። ለረጅም፣ ረጅም ጊዜ አሰበች።",
    },
    {
      en: 'Then she tore off the soft middle and rolled it up with her fingers, the way Grandma does. "Papa, open wide! A gursha for you!"',
      am: "ከዚያ ለስላሳውን መሃል ቆርሳ አያቴ እንደምታደርገው በጣቶቿ ጠቀለለችው። «አባባ፣ አፍህን ክፈት! ጉርሻ ላንተ!»",
    },
    {
      en: 'Papa ate it slowly, with his eyes closed. "Mmm. That," he said, "is the best bite I have ever had."',
      am: "አባባ ዓይኖቹን ጨፍኖ ቀስ ብሎ በላው። «እምም። ይህች» አለ፣ «እስከ ዛሬ ከበላኋቸው ጉርሻዎች ሁሉ ምርጧ ናት።»",
    },
    {
      en: 'Tsehay felt warm all the way down to her toes. Grandma winked at her. "You see? The sweetest gursha is the one you give."',
      am: "ፀሐይ እስከ እግር ጣቶቿ ድረስ ሙቀት ተሰማት። አያቴ ዓይኗን ጠቀሰቻት። «አየሽ? ከሁሉ የሚጣፍጠው የምትሰጠው ጉርሻ ነው።»",
    },
    {
      en: "Then Papa reached into his bag. He had brought home a warm loaf of bread from the market! He broke off the softest piece and gave Tsehay a gursha too.",
      am: "ከዚያ አባባ ቦርሳው ውስጥ እጁን ከተተ። ከገበያ ትኩስ ዳቦ ይዞ መጥቶ ነበር! ከሁሉ የሚለሰልሰውን ቁራሽ ቆርሶ እሱም ፀሐይን አጎረሳት።",
    },
    {
      en: "Mama fed Grandma, Grandma fed Papa, Papa fed Mama, and baby Dawit sucked his thumb and watched them all. It was the best dinner ever.",
      am: "እማማ አያቴን አጎረሰች፣ አያቴ አባባን አጎረሰች፣ አባባ እማማን አጎረሰ፤ ሕፃኑ ዳዊት ደግሞ አውራ ጣቱን እየጠባ ሁሉንም ይመለከት ነበር። ከሁሉ የሚበልጥ እራት ነበር።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why do you think Tsehay thought for such a long time? What helped her decide?",
        "Who gives you gursha in our family? Who would you like to give a gursha to?",
      ],
      am: [
        "ፀሐይ ለምን ያህል ረጅም ጊዜ ያሰበች ይመስላችኋል? እንድትወስን የረዳት ምንድን ነው?",
        "በቤተሰባችን ማን ያጎርሳችኋል? እናንተስ ማንን ማጉረስ ትፈልጋላችሁ?",
      ],
    },
    activity: {
      en: "At your next meal, let the child give the first gursha to someone of their choosing, and tell them why. (Wash hands first, and roll it small!)",
      am: "በሚቀጥለው ምግብ ላይ ልጁ የመጀመሪያውን ጉርሻ ለመረጠው ሰው ይስጥ፤ ለምን እንደመረጠውም ይንገረው። (መጀመሪያ እጅ ታጠቡ፤ ጉርሻውንም ትንሽ አድርጋችሁ ጠቅልሉ!)",
    },
  },
};

export default story;
