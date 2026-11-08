import type { Story } from "../../../stories";

/*
  "The Little Peacemakers" (level 5: solving a quarrel, forgiving each other).
  Gugu and Haben quarrel over the rope swing in the fig tree: both pull, both shout, both are
  sure they are right. Tsehay and Anbessa remember watching Grandpa Tolosa and Grandma make peace
  between two neighbours under that same tree, the way elders do (shimgilina): sit down, let each
  one speak while the other listens, say how you feel, find a fair way, and make up. The children
  try it, with Grandpa's stick as the "speaking stick". Gugu and Haben agree on turns (twenty
  pushes each), say sorry and forgive, and push each other. Grandpa calls them little elders.
  Join-in line: "Listen, speak, and find a way!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «እናዳምጥ፣ እንናገር፣ መንገድ እንፈልግ!», «ሽምግልና» (peacemaking by elders) and «ዥዋዥዌ»
  for the swing.
*/
const story: Story = {
  id: "little-peacemakers",
  course: "values-character",
  pack: "story",
  title: { en: "The Little Peacemakers", am: "ትንንሾቹ አስታራቂዎች" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#0E8C80",
  scene: "lib-little-peacemakers",
  coverPage: 9,
  teaches: { words: ["quarrel", "listen", "fair", "turns", "peace"] },
  pages: [
    {
      en: "There was a new rope swing in the big fig tree. Gugu and Haben both ran for it at exactly the same moment, and both grabbed the rope.",
      am: "በትልቁ የሾላ ዛፍ ላይ አዲስ የገመድ ዥዋዥዌ ነበር። ጉጉና ሐበን ሁለቱም ልክ በአንድ ጊዜ ወደ እሱ ሮጡ፤ ሁለቱም ገመዱን ያዙ።",
    },
    {
      en: '"I was first!" shouted Gugu. "No, I was first!" shouted Haben. They pulled the rope this way and that. "MINE!" "MINE!"',
      am: "«እኔ ቀደምኩ!» ብሎ ጮኸ ጉጉ። «አይ፣ እኔ ቀደምኩ!» ብላ ጮኸች ሐበን። ገመዱን ወዲህና ወዲያ ጎተቱት። «የእኔ ነው!» «የእኔ ነው!»",
    },
    {
      en: "Tsehay covered her ears. Anbessa frowned. Then he remembered something he had seen under this very tree.",
      am: "ፀሐይ ጆሮዎቿን ደፈነች። አንበሳ ፊቱን አጨፈገገ። ከዚያ እዚሁ ዛፍ ሥር ያየውን አንድ ነገር አስታወሰ።",
    },
    {
      en: "Last month, two neighbours had quarrelled about a fence. Grandpa Tolosa and Grandma had sat them down here, in the shade, and made peace, the way elders do. It was called shimgilina.",
      am: "ባለፈው ወር ሁለት ጎረቤቶች ስለ አጥር ተጣልተው ነበር። አባ ቶሎሳና አያቴ እዚሁ ጥላ ሥር አስቀምጠው እንደ ሽማግሌዎች አስታረቋቸው። ሽምግልና ይባላል።",
    },
    {
      en: '"Let\'s be the elders!" whispered Anbessa to Tsehay. Tsehay borrowed Grandpa\'s stick. "Gugu, Haben, please sit down. Let\'s make peace."',
      am: "«እኛ ሽማግሌዎቹ እንሁን!» አለ አንበሳ ለፀሐይ በሹክሹክታ። ፀሐይ የአባ ቶሎሳን ምርኩዝ ተዋሰች። «ጉጉ፣ ሐበን፣ እባካችሁ ተቀመጡ። እንታረቅ።»",
    },
    {
      en: '"First rule," said Tsehay. "Only the one holding the stick may speak. The other one listens." She gave the stick to Haben. Listen, speak, and find a way!',
      am: "«የመጀመሪያው ሕግ» አለች ፀሐይ። «የሚናገረው ምርኩዙን የያዘው ብቻ ነው። ሌላው ያዳምጣል።» ምርኩዙን ለሐበን ሰጠቻት። እናዳምጥ፣ እንናገር፣ መንገድ እንፈልግ!",
    },
    {
      en: '"I was so excited about the swing," said Haben. "When Gugu pulled, I felt pushed away." Then Gugu held the stick. "I wanted the first go. When she shouted, I felt angry."',
      am: "«ስለ ዥዋዥዌው በጣም ጓጉቼ ነበር» አለች ሐበን። «ጉጉ ሲጎትት እንደተገፋሁ ተሰማኝ።» ከዚያ ጉጉ ምርኩዙን ያዘ። «መጀመሪያ መጫወት ፈልጌ ነበር። ስትጮህ ተናደድኩ።»",
    },
    {
      en: '"Now," said Anbessa, "what would be fair?" They thought. "Turns!" said Haben. "Twenty pushes each," said Gugu. "And whoever waits does the pushing!"',
      am: "«አሁን» አለ አንበሳ፣ «ፍትሐዊ የሚሆነው ምንድን ነው?» አሰቡ። «ተራ!» አለች ሐበን። «ለእያንዳንዳችን ሃያ ግፊት» አለ ጉጉ። «የሚጠብቀው ደግሞ ይገፋል!»",
    },
    {
      en: '"Sorry I pulled," said Gugu. "Sorry I shouted," said Haben. "I forgive you." "I forgive you too." And they shook hands, then hugged, then laughed.',
      am: "«ስለጎተትኩ ይቅርታ» አለ ጉጉ። «ስለጮኽኩ ይቅርታ» አለች ሐበን። «ይቅር ብዬሃለሁ።» «እኔም ይቅር ብዬሻለሁ።» ተጨባበጡ፤ ከዚያ ተቃቀፉ፤ ከዚያ ሳቁ።",
    },
    {
      en: "Gugu went first, because Haben said he could. She pushed him twenty times, counting in Tigrinya. Then Gugu pushed Haben twenty times, counting in Amharic. Whoosh!",
      am: "ሐበን ስለፈቀደችለት ጉጉ መጀመሪያ ተጫወተ። ሐበን በትግርኛ እየቆጠረች ሃያ ጊዜ ገፋችው። ከዚያ ጉጉ በአማርኛ እየቆጠረ ሐበንን ሃያ ጊዜ ገፋት። ሹው!",
    },
    {
      en: 'Grandpa Tolosa came for his stick and saw them laughing. "Who made this peace?" Tsehay and Anbessa grinned. "Shimgilina," said Anbessa. "We were the elders!"',
      am: "አባ ቶሎሳ ምርኩዛቸውን ሊወስዱ መጡና ሲስቁ አዩአቸው። «ይህን ሰላም ማን አወረደው?» ፀሐይና አንበሳ ፈገግ አሉ። «ሽምግልና» አለ አንበሳ። «እኛ ሽማግሌዎቹ ነበርን!»",
    },
    {
      en: 'Grandpa laughed his big laugh. "Little elders with big wisdom! Remember: listen, speak, and find a way." And the swing went whoosh, whoosh, all afternoon.',
      am: "አባ ቶሎሳ በትልቁ ሳቃቸው ሳቁ። «ትልቅ ጥበብ ያላቸው ትንንሽ ሽማግሌዎች! አስታውሱ፦ እናዳምጥ፣ እንናገር፣ መንገድ እንፈልግ።» ዥዋዥዌውም ከሰዓቱን ሙሉ ሹው፣ ሹው አለ።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why did the speaking stick help? What did Gugu and Haben find out when they listened to each other?",
        "Who makes peace in our family or neighbourhood when people disagree? How do they do it?",
      ],
      am: [
        "የመናገሪያው ምርኩዝ ለምን ረዳ? ጉጉና ሐበን እርስ በርሳቸው ሲደማመጡ ምን አወቁ?",
        "በቤተሰባችን ወይም በሰፈራችን ሰዎች ሲጣሉ ማን ያስታርቃል? እንዴት ያደርጉታል?",
      ],
    },
    activity: {
      en: "Choose a family \"speaking stick\" (a spoon, a pencil, a stick). Next time there is a disagreement, sit down together: the one holding the stick speaks, the others listen. Then find a fair way together.",
      am: "የቤተሰብ «የመናገሪያ ምርኩዝ» ምረጡ (ማንኪያ፣ እርሳስ፣ ዱላ)። በሚቀጥለው ጊዜ አለመግባባት ሲፈጠር አብራችሁ ተቀመጡ፦ ምርኩዙን የያዘው ይናገራል፣ ሌሎቹ ያዳምጣሉ። ከዚያ አብራችሁ ፍትሐዊ መንገድ ፈልጉ።",
    },
  },
};

export default story;
