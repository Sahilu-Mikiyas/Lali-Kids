import type { Story } from "../stories";

/*
  "Nana's Night Market ነ": Anbessa goes shopping with Nana (Grandma) at the evening market.
  Above the stalls hang seven lanterns, each wearing a letter of the ነ family
  (ነ ኑ ኒ ና ኔ ን ኖ), and under each is something that starts with it: ነጠላ (a netela shawl),
  ኑግ (noog seed), ኒያላ (a carved mountain nyala), ናና (mint), ን for ንብ (bee, at the honey stall)
  and ኖራ (whitewash for the tukul). ኔ's stall is empty, until Anbessa shouts እኔ! ("me!"): some
  letters like to finish a word. The join-in line is "Lantern, lantern, light the way!"
  At the coffee stall a ቡ lantern from the bee family hangs beside ና, and they read ቡና, coffee.
  Two puns, one per language: in English Nana buys nana (mint is ናና); in Amharic ና also means
  "come!", which is what Nana calls on the first page.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  ማር ከረሜላ for the honey sweets (page 8), the hum ንንን (page 9), ኖራ as the whitewash Nana buys
  (page 10) and the join-in line ፋኖስ፣ ፋኖስ፣ መንገዱን አብራ!
*/
const story: Story = {
  id: "fidel-ne",
  pack: "fidel",
  // In the fidel-foundations learning package (docs/PACKAGES.md): opens only through the course.
  course: "fidel-foundations",
  title: { en: "Nana's Night Market ነ", am: "የአያቴ የምሽት ገበያ ነ" },
  category: "Fidel",
  ageBands: ["6-7"],
  isFree: false,
  color: "#3B2F7A",
  scene: "lib-fidel-ne",
  coverPage: 10,
  teaches: { fidel: ["ነ", "ኑ", "ኒ", "ና", "ኔ", "ን", "ኖ"], words: ["ነጠላ", "ኑግ", "ኒያላ", "ናና", "እኔ", "ንብ", "ኖራ", "ቡና"] },
  pages: [
    {
      en: 'When the sun goes down, the night market wakes up. Drums tap, people laugh, and the air smells of roasting corn. "Come, Anbessa," says Nana. "We have a list!"',
      am: "ፀሐይ ስትጠልቅ የምሽቱ ገበያ ይነቃል። ከበሮ ይመታል፣ ሰዎች ይስቃሉ፣ አየሩም የተጠበሰ በቆሎ ይሸታል። «ና፣ አንበሳ» አለች አያቱ። «የምንገዛው ዝርዝር አለን!»",
    },
    {
      en: 'Above every stall hangs a lantern, and every lantern wears a letter of the ነ family. "Lantern, lantern, light the way!" sings Anbessa.',
      am: "በእያንዳንዱ መደብ ላይ ፋኖስ ተንጠልጥሏል፤ እያንዳንዱ ፋኖስ የነ ቤተሰብ ፊደል ለብሷል። «ፋኖስ፣ ፋኖስ፣ መንገዱን አብራ!» ብሎ ዘመረ አንበሳ።",
    },
    {
      en: 'The first lantern blinks awake: ነ, "na", like in nut. Under it is a pile of soft white cloth. "A new ነጠላ, a netela!" says Nana. ነጠላ starts with ነ!',
      am: "የመጀመሪያው ፋኖስ ብልጭ ብሎ ነቃ፦ ነ። ከሥሩ ለስላሳ ነጭ ጨርቆች ተከምረዋል። «አዲስ ነጠላ!» አለች አያቱ። ነጠላ በነ ይጀምራል!",
    },
    {
      en: 'Lantern, lantern, light the way! Next glows ኑ, "nu", like in noon. Under ኑ, a lady sells tiny black seeds called ኑግ. "For the birds," says Nana.',
      am: "ፋኖስ፣ ፋኖስ፣ መንገዱን አብራ! ቀጥሎ ኑ አበራ። ከኑ ሥር አንዲት ሴት ኑግ የሚባሉ ጥቃቅን ጥቁር ፍሬዎችን ትሸጣለች። «ለወፎቹ» አለች አያቱ።",
    },
    {
      en: 'ኒ says "ni", like in knee. Under ኒ, an old man carves wooden animals. Anbessa finds a mountain nyala with curly horns. Nyala starts with ኒ: ኒያላ!',
      am: "ኒ «ኒ» ይላል። ከኒ ሥር አንድ ሽማግሌ ከእንጨት እንስሳትን ይቀርጻሉ። አንበሳ ጠማማ ቀንድ ያላት ትንሽ ኒያላ አገኘ። ኒያላ በኒ ይጀምራል!",
    },
    {
      en: 'ና says "naa", just like Nana calling "Come!" (In Amharic, ና means come.) Under ና are bunches of fresh green mint, and mint is ናና! "Nana buys nana!" giggles Anbessa.',
      am: "ና «ና» ይላል፣ ልክ አያቱ «ና!» ስትል። ከና ሥር ትኩስ አረንጓዴ ናና ተደርድሯል። «ናና በና ይጀምራል፤ ሁለት ጊዜ!» ብሎ ሳቀ አንበሳ።",
    },
    {
      en: 'Lantern, lantern, light the way! But the ኔ lantern, "nay", like in neighbour, hangs over an empty stall. "Nothing here starts with ኔ," sighs Anbessa.',
      am: "ፋኖስ፣ ፋኖስ፣ መንገዱን አብራ! የኔ ፋኖስ ግን ባዶ መደብ ላይ ተንጠልጥሏል። ኔ «ኔ» ይላል። «እዚህ በኔ የሚጀምር ምንም ነገር የለም» ብሎ ተከዘ አንበሳ።",
    },
    {
      en: 'Then the sweet-seller calls, "Who wants a honey sweet?" "እኔ!" shouts Anbessa. "Me!" And there is ኔ, at the end of እኔ. Some letters like to finish a word!',
      am: "ከዚያ ጣፋጭ ሻጯ «ማር ከረሜላ የሚፈልግ ማነው?» ብላ ጠራች። «እኔ!» ብሎ ጮኸ አንበሳ። እነሆ ኔ፣ በእኔ መጨረሻ ላይ! አንዳንድ ፊደሎች ቃል መጨረስ ይወዳሉ።",
    },
    {
      en: 'The honey stall glows under ን, just "n", a hum in your nose: nnn. ን starts ንብ, bee! "That\'s me!" buzzes Lali, popping out of a honey pot.',
      am: "የማር መደቡ በን ሥር ያበራል። ን «ን» ብቻ ይላል፣ በአፍንጫ እንደሚወጣ ማንጎራጎር፦ ንንን። ንብ በን ይጀምራል! «ያ እኔ ነኝ!» ብላ ከማር ማሰሮ ብቅ አለች ላሊ።",
    },
    {
      en: 'The last lantern, ኖ, says "no", like in note. Under it is a heap of white ኖራ, the chalky powder that makes walls bright. "We\'ll paint the tukul!" says Nana.',
      am: "የመጨረሻው ፋኖስ ኖ «ኖ» ይላል። ከሥሩ ግድግዳን የሚያነጣ ነጭ የኖራ ክምር አለ። «ጎጇችንን እንቀባለን!» አለች አያቱ።",
    },
    {
      en: "Anbessa looks back down the street: seven lanterns in a row, glowing like a song. ነ ኑ ኒ ና ኔ ን ኖ! Lantern, lantern, light the way!",
      am: "አንበሳ ወደ ኋላ መንገዱን ተመለከተ፦ ሰባት ፋኖሶች በተርታ፣ እንደ መዝሙር ያበራሉ። ነ ኑ ኒ ና ኔ ን ኖ! ፋኖስ፣ ፋኖስ፣ መንገዱን አብራ!",
    },
    {
      en: 'Nana checks her list. "Netela, noog, mint, chalk… and one more thing, the most important of all!" She sniffs the air. Something smells toasty and wonderful.',
      am: "አያቱ ዝርዝሯን አየች። «ነጠላ፣ ኑግ፣ ናና፣ ኖራ… አንድ ነገር ቀረ፤ ከሁሉም የሚበልጠው!» አየሩን አሸተተች። የሆነ ነገር እየተቆላ ደስ የሚል ሽታ ይሸታል።",
    },
    {
      en: 'At the coffee stall, a ቡ lantern from the bee family hangs beside ና. ቡ says "bu". ና says "na". Together they say… ቡና! Coffee!',
      am: "በቡና መደቡ ላይ ከበ ቤተሰብ የመጣው የቡ ፋኖስ ከና አጠገብ ተንጠልጥሏል። ቡ «ቡ» ይላል። ና «ና» ይላል። አብረው ሲሆኑ… ቡና!",
    },
    {
      en: 'At home, under the stars, Nana roasts the beans, and the whole tukul smells of coffee. Anbessa reads the word on the bag, all by himself: "ቡ… ና… ቡና!"',
      am: "ቤት ሲደርሱ፣ በከዋክብት ሥር፣ አያቱ ቡናውን ቆላች፤ ጎጆው በሙሉ የቡና መዓዛ ሞላው። አንበሳ በከረጢቱ ላይ ያለውን ቃል ራሱ አነበበ፦ «ቡ… ና… ቡና!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Some letters start words (ነጠላ, ናና) and some finish them (እኔ). Can you think of another word that starts with the ነ family? (ነብር, leopard; ነፋስ, wind; ኑሮ, life.)",
        "What would you buy at a night market? Which letter does it start with?",
      ],
      am: [
        "አንዳንድ ፊደሎች ቃል ይጀምራሉ (ነጠላ፣ ናና)፤ አንዳንዶቹ ደግሞ ቃል ይጨርሳሉ (እኔ)። በነ ቤተሰብ የሚጀምር ሌላ ቃል ታውቃላችሁ? (ነብር፣ ነፋስ፣ ኑሮ…)",
        "በምሽት ገበያ ምን መግዛት ትፈልጋላችሁ? በየትኛው ፊደል ይጀምራል?",
      ],
    },
    activity: {
      en: "Make a row of paper lanterns: fold or roll seven pieces of paper and write one letter of the ነ family on each (ነ ኑ ኒ ና ኔ ን ኖ). Hang them up, turn off the light, and shine a torch on each one in turn while you say its sound together.",
      am: "የወረቀት ፋኖሶችን ሥሩ፦ ሰባት ወረቀቶችን አጣጥፋችሁ ወይም ጠቅልላችሁ በእያንዳንዱ ላይ የነ ቤተሰብን አንድ ፊደል ጻፉ (ነ ኑ ኒ ና ኔ ን ኖ)። ሰቅሏቸው፣ መብራቱን አጥፉ፣ በየተራ በባትሪ ብርሃን እያበራችሁ ድምፃቸውን አብራችሁ በሉ።",
    },
  },
};

export default story;
