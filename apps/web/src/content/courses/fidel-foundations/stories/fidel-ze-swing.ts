import type { Story } from "../../../stories";

/*
  "The Elephant's Swing ዘ ዠ" (Fidel Foundations, level 4): the ዘ family and the rare ዠ ("zh",
  as in treasure). A baby elephant (ዝሆን) visits the garden, where the ዘ family are sowing seed
  (ዘር); she waters it with her trunk. Then she sees the swing, ዥዋዥዌ, which ዠ loves best; it is
  far too small for an elephant, so she swings everyone else instead. Words read: ዝሆን, ዘር, ዥዋዥዌ
  (ዥ with ዋ and ዌ from the water frogs), ዞረ ("he turned round").
  The join-in line is "Whoosh, whoosh, swing so high!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line (ዥው፣ ዥው፣ ከፍ በል!), the creak ቅር፣ ቅር (page 8), ኩምቢ for the trunk and
  ጸደይ for spring (page 11).
*/
const story: Story = {
  id: "fidel-ze-swing",
  course: "fidel-foundations",
  pack: "fidel",
  title: { en: "The Elephant's Swing ዘ ዠ", am: "የዝሆኗ ዥዋዥዌ ዘ ዠ" },
  category: "Fidel",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#7A64B8",
  scene: "lib-fidel-ze-swing",
  coverPage: 9,
  teaches: { fidel: ["ዘ", "ዠ"], words: ["ዝሆን", "ዘር", "ዥዋዥዌ", "ዞረ"] },
  pages: [
    {
      en: "Thump, thump, thump. Who is coming up the path? A baby elephant, with big flappy ears and a long, wiggly trunk!",
      am: "ዱብ፣ ዱብ፣ ዱብ። በመንገዱ ማን እየመጣ ነው? ትልልቅ የሚርገበገቡ ጆሮዎችና ረጅም ተወዛዋዥ ኩምቢ ያላት ትንሽ ዝሆን!",
    },
    {
      en: `"Elephant is ዝሆን," says Grandma, and she writes it on a card: "ዝ… ሆ… ን… ዝሆን!" The baby elephant flaps her ears happily.`,
      am: "«ይህች ዝሆን ናት» አለች አያቴ፤ በካርድ ላይም ጻፈችው፦ «ዝ… ሆ… ን… ዝሆን!» ትንሿ ዝሆን በደስታ ጆሮዎቿን አርገበገበች።",
    },
    {
      en: `In the garden her friends are sowing seeds: the ዘ family, ዘ ዙ ዚ ዛ ዜ ዝ ዞ. Seed is ዘር: "ዘ… ር… ዘር!"`,
      am: "በአትክልቱ ቦታ ጓደኞቿ ዘር እየዘሩ ነው፦ የዘ ቤተሰብ፣ ዘ ዙ ዚ ዛ ዜ ዝ ዞ። «ዘ… ር… ዘር!»",
    },
    {
      en: `ዘ says "za", like in zap. ዙ says "zu", like in zoo. ዚ says "zi", like in zip. ዛ says "zaa", ዜ says "zay". ዝ just buzzes, "zzz", like Lali. And ዞ says "zo".`,
      am: "ዘ «ዘ» ይላል። ዙ «ዙ» ይላል። ዚ «ዚ» ይላል። ዛ «ዛ»፣ ዜ «ዜ» ይላሉ። ዝ ልክ እንደ ላሊ «ዝዝዝ» ብቻ ይላል። ዞ ደግሞ «ዞ» ይላል።",
    },
    {
      en: `"I want to help!" says the baby elephant. She sucks up water with her trunk and sprays every seed. "The ዝሆን waters the ዘር!" giggles Lali.`,
      am: "«መርዳት እፈልጋለሁ!» አለች ትንሿ ዝሆን። በኩምቢዋ ውሃ ስባ እያንዳንዱን ዘር አጠጣች። «ዝሆኗ ዘሩን ታጠጣለች!» ብላ ሳቀች ላሊ።",
    },
    {
      en: `Then she sees it: a swing hanging from the big fig tree. Her eyes go round. "Can I have a turn?"`,
      am: "ከዚያ አየችው፦ ከትልቁ የሾላ ዛፍ ላይ የተንጠለጠለ ዥዋዥዌ። ዓይኖቿ ክብ ሆኑ። «ተራ ይደርሰኛል?»",
    },
    {
      en: `On the swing sits a letter nobody knows. "I'm ዠ," it says, "and I sound like the 'zh' in treasure. You'll only find me in a few words, but my favourite is the swing: ዥዋዥዌ!"`,
      am: "በዥዋዥዌው ላይ ማንም የማያውቀው ፊደል ተቀምጧል። «እኔ ዠ ነኝ» አለ። «የምገኘው በጥቂት ቃላት ውስጥ ብቻ ነው፤ ከሁሉም የምወደው ግን ዥዋዥዌ ነው!»",
    },
    {
      en: `"ዥ… ዋ… ዥ… ዌ… ዥዋዥዌ!" reads Anbessa. "ዥ is from you, and ዋ and ዌ are from the water frogs!" Whoosh, whoosh, swing so high!`,
      am: "«ዥ… ዋ… ዥ… ዌ… ዥዋዥዌ!» ብሎ አነበበ አንበሳ። «ዥ ካንተ ነው፤ ዋ እና ዌ ደግሞ ከውሃው እንቁራሪቶች!» ዥው፣ ዥው፣ ከፍ በል!",
    },
    {
      en: "The baby elephant climbs on. Creak! The branch bends lower… and lower… The swing is far too small for an elephant!",
      am: "ትንሿ ዝሆን ወጣች። ቅር፣ ቅር! ቅርንጫፉ ጎበጠ… ጎበጠ… ዥዋዥዌው ለዝሆን በጣም ትንሽ ነው!",
    },
    {
      en: "She looks sad. Then she has an idea. She curls her trunk round the rope and swings everyone else instead: Anbessa, Gugu, Lali and all the ዘ family. Whoosh, whoosh, swing so high!",
      am: "አዘነች። ከዚያ አንድ ሐሳብ መጣላት። ኩምቢዋን በገመዱ ዙሪያ ጠመጠመችና ሌሎቹን ሁሉ አወዛወዘቻቸው፦ አንበሳን፣ ጉጉን፣ ላሊንና መላውን የዘ ቤተሰብ። ዥው፣ ዥው፣ ከፍ በል!",
    },
    {
      en: `Then Gugu jumps off and spins round and round until he's dizzy. "ዞ… ረ… ዞረ!" reads Anbessa from Grandma's card. "He turned round!"`,
      am: "ከዚያ ጉጉ ዘሎ ወርዶ እስኪያዞረው ድረስ ዞረ፣ ዞረ። «ዞ… ረ… ዞረ!» ብሎ አነበበ አንበሳ ከአያቴ ካርድ ላይ።",
    },
    {
      en: "At sunset the baby elephant waves goodbye with her trunk. In spring the ዘር will be tall plants, and the swing will still be waiting for its friends. Whoosh, whoosh!",
      am: "ፀሐይ ስትጠልቅ ትንሿ ዝሆን በኩምቢዋ እያውለበለበች ተሰናበተች። በጸደይ ዘሩ ረጃጅም ተክሎች ይሆናል፤ ዥዋዥዌውም ጓደኞቹን ይጠብቃል። ዥው፣ ዥው!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["ዝ buzzes like Lali: zzz. Which letter in ዝሆን makes that sound?", "The elephant was too big for the swing, so she found another way to join in. Has that ever happened to you?"],
      am: ["ዝ እንደ ላሊ «ዝዝዝ» ይላል። በዝሆን ውስጥ ያንን ድምፅ የሚያሰማው የትኛው ፊደል ነው?", "ዝሆኗ ለዥዋዥዌው በጣም ትልቅ ነበረች፤ ስለዚህ በሌላ መንገድ ተቀላቀለች። እንዲህ ያለ ነገር ገጥሟችሁ ያውቃል?"],
    },
    activity: {
      en: "Plant a few seeds, ዘር, in a cup of soil. Write ዘ ዙ ዚ ዛ ዜ ዝ ዞ on little sticks and push them round the cup. Each time you water it, say the family together.",
      am: "ጥቂት ዘሮችን በአፈር የተሞላ ኩባያ ውስጥ ዝሩ። ዘ ዙ ዚ ዛ ዜ ዝ ዞን በትንንሽ እንጨቶች ላይ ጽፋችሁ በኩባያው ዙሪያ ትከሏቸው። ውሃ ባጠጣችሁ ቁጥር ቤተሰቡን አብራችሁ በሉ።",
    },
  },
};

export default story;
