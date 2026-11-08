import type { Story } from "../../../stories";

/*
  "There's Always Room" (level 3: welcoming a guest).
  A stormy night in the big rains (kiremt). Anbessa and Grandma are cosy with a little pot of
  shiro, just enough for two, when Haben, her mother and her grandmother knock: their new roof
  is leaking. "There's no room," Anbessa whispers. Grandma flings the door open: "Come in, come
  in, there's always room!" and asks him to help. His jobs follow the real steps of welcoming a
  guest: the best seats by the fire, pouring water over the guests' hands (eldest first), sharing
  the food (Grandma stretches the shiro), the first gursha, a story, coffee, beds for everyone,
  and in the morning walking the guests to the end of the path.
  Join-in line: "Come in, come in, there's always room!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ግቡ፣ ግቡ፣ ቦታ ሁልጊዜ አለ!», «ክረምት» for the rainy season, and «ሸኘ» (walking guests
  part of the way home).
*/
const story: Story = {
  id: "always-room",
  course: "values-character",
  pack: "story",
  title: { en: "There's Always Room", am: "ቦታ ሁልጊዜ አለ" },
  category: "Values",
  ageBands: ["3-5", "6-7", "8-9"],
  isFree: false,
  color: "#3A4E9E",
  scene: "lib-always-room",
  coverPage: 5,
  teaches: { words: ["guest", "welcome", "share", "room", "kind"] },
  pages: [
    {
      en: "It was the big rainy season, and the rain drummed on the roof all evening. Anbessa and Grandma were cosy by the fire with a little pot of shiro, just enough for two.",
      am: "ክረምት ነበር፤ ዝናቡ ምሽቱን ሙሉ ጣሪያውን ይደበድብ ነበር። አንበሳና አያቴ ከእሳቱ አጠገብ በሙቀት ተቀምጠው ነበር፤ ለሁለት ብቻ የሚበቃ ትንሽ ድስት ሽሮ ይዘው።",
    },
    {
      en: 'Knock, knock! At the door stood Haben, her mother and her grandmother, dripping wet. "Our new roof is leaking," said Haben\'s mother. "Please, could we wait here until the rain stops?"',
      am: "ኳ፣ ኳ! በሩ ላይ ሐበን፣ እናቷና አያቷ በዝናብ ርሰው ቆመው ነበር። «አዲሱ ጣሪያችን ያፈሳል» አለች የሐበን እናት። «እባካችሁ ዝናቡ እስኪያባራ እዚህ መቆየት እንችላለን?»",
    },
    {
      en: 'Anbessa looked at the little pot of shiro. Just enough for two. And their house was so small. "Grandma," he whispered, "there\'s no room."',
      am: "አንበሳ ትንሿን የሽሮ ድስት ተመለከተ። ለሁለት ብቻ የምትበቃ። ቤታቸውም በጣም ትንሽ ነበር። «አያቴ» አለ በሹክሹክታ፣ «ቦታ የለም።»",
    },
    {
      en: 'Grandma smiled and flung the door wide open. "Come in, come in, there\'s always room!" Then she whispered to Anbessa, "A guest is a blessing. Will you help me?"',
      am: "አያቴ ፈገግ አለችና በሩን ወለል አድርጋ ከፈተችው። «ግቡ፣ ግቡ፣ ቦታ ሁልጊዜ አለ!» ከዚያ ለአንበሳ ሹክ አለችው፦ «እንግዳ በረከት ነው። ታግዘኛለህ?»",
    },
    {
      en: "Anbessa's first job: the best seats by the fire for the guests. He moved his own stool, and his cushion too. Haben's grandmother sat down with a grateful sigh.",
      am: "የአንበሳ የመጀመሪያ ሥራ፦ ለእንግዶቹ ከእሳቱ አጠገብ ምርጥ መቀመጫ። የራሱን በርጩማና ትራሱንም አዛወረ። የሐበን አያት በምስጋና ተንፍሰው ተቀመጡ።",
    },
    {
      en: "His second job: washing hands. Anbessa carried the jug and the little basin to each guest, eldest first, and poured warm water over their hands, just as Grandma had taught him.",
      am: "ሁለተኛው ሥራው፦ እጅ ማስታጠብ። አንበሳ ማንቆርቆሪያውንና ትንሹን ሳህን ይዞ ወደ እያንዳንዱ እንግዳ ሄደ፤ ከታላቁ ጀምሮ፣ አያቴ እንዳስተማረችው በእጃቸው ላይ ለብ ያለ ውሃ አፈሰሰ።",
    },
    {
      en: "Grandma added water and more shiro powder to the pot, and tore the injera so everyone had some. Somehow, supper for two became supper for five.",
      am: "አያቴ በድስቱ ላይ ውሃና ተጨማሪ የሽሮ ዱቄት ጨመረች፤ ሁሉም እንዲደርሰው እንጀራውን ቆራረሰች። እንዴት እንደሆነ ባይታወቅም፣ የሁለት ሰው እራት የአምስት ሰው እራት ሆነ።",
    },
    {
      en: "Haben was shy and didn't say a word. So Anbessa rolled the first gursha and gave it to her. Haben giggled. Then she gave one back!",
      am: "ሐበን ዓይናፋር ስለነበረች አንድም ቃል አልተናገረችም። ስለዚህ አንበሳ የመጀመሪያውን ጉርሻ ጠቅልሎ አጎረሳት። ሐበን ሳቀች። ከዚያ እሷም መልሳ አጎረሰችው!",
    },
    {
      en: "After supper, Haben's grandmother told a story in Tigrinya, and Haben whispered it to Anbessa in Amharic. Grandma made coffee, and the rain went pitter-patter.",
      am: "ከእራት በኋላ የሐበን አያት በትግርኛ ተረት ነገሩ፤ ሐበን ደግሞ ለአንበሳ በአማርኛ በሹክሹክታ ተረጎመችለት። አያቴ ቡና አፈላች፤ ዝናቡም ጠብ፣ ጠብ አለ።",
    },
    {
      en: 'The rain did not stop. So Grandma rolled out every mat and blanket in the house. Anbessa gave Haben his warmest gabi. "There\'s always room," he said, and this time he meant it.',
      am: "ዝናቡ አላባራም። ስለዚህ አያቴ በቤቱ ያለውን ምንጣፍና ብርድ ልብስ ሁሉ አነጠፈች። አንበሳ ለሐበን ከሁሉ የሚሞቀውን ጋቢውን ሰጣት። «ቦታ ሁልጊዜ አለ» አለ፤ በዚህ ጊዜ ከልቡ ነበር።",
    },
    {
      en: 'In the morning the sun came out. Anbessa walked the guests to the end of the path, the way you do when friends leave. "Come back soon!" Come in, come in, there\'s always room!',
      am: "ጠዋት ፀሐይ ወጣች። ጓደኞች ሲሄዱ እንደሚደረገው አንበሳ እንግዶቹን እስከ መንገዱ ጫፍ ሸኛቸው። «በቶሎ ተመለሱ!» ግቡ፣ ግቡ፣ ቦታ ሁልጊዜ አለ!",
    },
    {
      en: 'Haben ran back and gave Anbessa a hug. "When our roof is fixed," she said, "you come to OUR house. There will be room for you too!"',
      am: "ሐበን ተመልሳ እየሮጠች አንበሳን አቀፈችው። «ጣሪያችን ሲጠገን» አለች፣ «አንተ ወደ እኛ ቤት ትመጣለህ። ላንተም ቦታ ይኖራል!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Anbessa thought there was no room. How did Grandma make room? What did Anbessa give?",
        "What were Anbessa's jobs when the guests came? Which one would you like to do when we have guests?",
      ],
      am: [
        "አንበሳ ቦታ የለም ብሎ አሰበ። አያቴ ቦታ እንዴት አዘጋጀች? አንበሳስ ምን ሰጠ?",
        "እንግዶቹ ሲመጡ የአንበሳ ሥራዎች ምን ምን ነበሩ? እንግዳ ሲመጣልን የትኛውን መሥራት ትፈልጋላችሁ?",
      ],
    },
    activity: {
      en: "Practise welcoming a guest: one person knocks; the child stands up, says \"Come in!\", offers the best seat, pours water for washing hands over a basin, offers a snack, and at the end walks the guest to the door.",
      am: "እንግዳ መቀበልን ተለማመዱ፦ አንድ ሰው ያንኳኳል፤ ልጁ ተነሥቶ «ግቡ!» ይላል፣ ምርጡን መቀመጫ ያቀርባል፣ በሳህን ላይ እጅ ያስታጥባል፣ መክሰስ ያቀርባል፣ በመጨረሻም እንግዳውን እስከ በሩ ይሸኛል።",
    },
  },
};

export default story;
