import type { Story } from "../../../stories";

/*
  "Abdi Plays Too" (level 5: including someone who is left out).
  The big children play football; little Abdi, Ayan's brother, wants to join. "You're too small."
  He sits alone on the wall, drawing in the dust. Ayan notices how he feels (she remembers being
  the new girl from Jijiga). She and Haben find a job that fits him (the drummer on Grandma's
  bucket who beats the rhythm, then the goalkeeper of the little goal), and change the rules so
  everyone gets the ball. Abdi saves a goal; everyone has more fun, not less.
  Join-in line: "Come on, there's room for you!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ና፣ ላንተም ቦታ አለ!» (said to Abdi, a boy) and «በረኛ» for goalkeeper.
*/
const story: Story = {
  id: "abdi-plays-too",
  course: "values-character",
  pack: "story",
  title: { en: "Abdi Plays Too", am: "አብዲም ይጫወታል" },
  category: "Values",
  ageBands: ["3-5", "6-7", "8-9"],
  isFree: false,
  color: "#2E9A8A",
  scene: "lib-abdi-plays-too",
  coverPage: 9,
  teaches: { words: ["include", "left out", "lonely", "team", "kind"] },
  pages: [
    {
      en: "After school, the big children played football in the dusty field: Gugu, Hawi, Haben, Anbessa and Ayan. Kick, run, GOAL!",
      am: "ከትምህርት ቤት በኋላ ትልልቆቹ ልጆች በአቧራማው ሜዳ ኳስ ይጫወቱ ነበር፦ ጉጉ፣ ሀዊ፣ ሐበን፣ አንበሳና አያን። ምት፣ ሩጫ፣ ጎል!",
    },
    {
      en: 'Little Abdi, Ayan\'s brother, ran up with his cap on backwards. "Can I play?" Gugu looked down at him. "You\'re too small. You\'ll get squashed."',
      am: "የአያን ትንሹ ወንድም አብዲ ቆቡን ወደ ኋላ አዙሮ እየሮጠ መጣ። «መጫወት እችላለሁ?» ጉጉ ቁልቁል ተመለከተው። «በጣም ትንሽ ነህ። ትጨፈለቃለህ።»",
    },
    {
      en: "So Abdi sat on the wall all by himself. He drew circles in the dust with a stick. Nobody passed him the ball. Nobody even looked.",
      am: "ስለዚህ አብዲ ብቻውን አጥሩ ላይ ተቀመጠ። በእንጨት አቧራው ላይ ክቦችን ሳለ። ማንም ኳስ አላቀበለውም። ማንም አላየውም።",
    },
    {
      en: "Ayan saw him. She remembered her first day in the village, when everyone spoke a language she didn't know yet, and she stood alone at the edge of the game. It had felt cold, even in the sun.",
      am: "አያን አየችው። በመንደሩ የመጀመሪያ ቀኗን አስታወሰች፤ ሁሉም እስካሁን የማታውቀውን ቋንቋ ሲናገር፣ እሷ ብቻዋን በጨዋታው ዳር ቆማ ነበር። በፀሐይ ውስጥም እንኳ ብርድ ብርድ ብሏት ነበር።",
    },
    {
      en: 'Ayan stopped running. "Wait!" she called. "Abdi is left out. How would you feel?" Haben nodded. "When I was new, Anbessa let me play. Let\'s find a way."',
      am: "አያን መሮጥ አቆመች። «ቆዩ!» ብላ ጠራች። «አብዲ ተገልሏል። እናንተ ብትሆኑ ምን ይሰማችኋል?» ሐበን ራሷን ነቀነቀች። «አዲስ በነበርኩ ጊዜ አንበሳ አጫወተኝ። መንገድ እንፈልግ።»",
    },
    {
      en: '"Every team needs a drummer!" said Ayan. She fetched Grandma\'s old bucket and gave Abdi two sticks. "Come on, Abdi, there\'s room for you!"',
      am: "«እያንዳንዱ ቡድን ከበሮ መቺ ያስፈልገዋል!» አለች አያን። የአያቴን አሮጌ ባልዲ አምጥታ ለአብዲ ሁለት እንጨቶች ሰጠችው። «ና፣ አብዲ፣ ላንተም ቦታ አለ!»",
    },
    {
      en: "BOOM-ba-BOOM! Abdi drummed so loudly that everyone ran faster. Every time someone scored, he played a special drum roll. Brrrrrum!",
      am: "ዱም-ዱዱም! አብዲ በጣም ጮክ ብሎ ስለመታ ሁሉም ፈጠኑ። አንድ ሰው ጎል ባገባ ቁጥር ልዩ ምት ይመታ ነበር። ድርርርርም!",
    },
    {
      en: 'Then Haben had another idea. "Let\'s make a little goal at the end, and Abdi can be the goalkeeper. And the rule is: everyone must touch the ball before we shoot."',
      am: "ከዚያ ሐበን ሌላ ሐሳብ መጣላት። «መጨረሻው ላይ ትንሽ ጎል እንሥራ፤ አብዲ በረኛ ይሁን። ሕጉ ደግሞ፦ ከመምታታችን በፊት ሁሉም ኳሱን መንካት አለበት።»",
    },
    {
      en: "Gugu ran up and kicked his hardest shot. Abdi jumped and… caught it! He held the ball up high. \"I SAVED IT!\"",
      am: "ጉጉ እየሮጠ መጥቶ በሙሉ ኃይሉ መታ። አብዲ ዘለለና… ያዘው! ኳሱን ከፍ አድርጎ አሳየ። «አዳንኩት!»",
    },
    {
      en: 'Everyone cheered, even Gugu. "Sorry I said you were too small," said Gugu. "You\'re the best goalkeeper in the village!" Abdi grinned so wide his cap fell off.',
      am: "ሁሉም አጨበጨቡ፤ ጉጉም ጭምር። «በጣም ትንሽ ነህ ስላልኩህ ይቅርታ» አለ ጉጉ። «በመንደሩ ምርጡ በረኛ ነህ!» አብዲ በጣም ፈገግ ስላለ ቆቡ ወደቀ።",
    },
    {
      en: "And the game was more fun than ever, with a drummer, a goalkeeper, and a rule that everyone gets the ball. Come on, there's room for you!",
      am: "ጨዋታውም ከመቼውም የበለጠ አስደሳች ሆነ፤ ከበሮ መቺ፣ በረኛ፣ እና ሁሉም ኳሱን ያገኛል የሚል ሕግ ይዞ። ና፣ ላንተም ቦታ አለ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "How do you think Abdi felt sitting on the wall? How did Ayan know?",
        "Have you ever felt left out? What could you do next time you see someone on their own?",
      ],
      am: [
        "አብዲ አጥሩ ላይ ብቻውን ሲቀመጥ ምን የተሰማው ይመስላችኋል? አያን እንዴት አወቀች?",
        "ተገልላችሁ የተሰማችሁ ጊዜ አለ? በሚቀጥለው ጊዜ አንድ ሰው ብቻውን ሲሆን ብታዩ ምን ማድረግ ትችላላችሁ?",
      ],
    },
    activity: {
      en: "Invent a game together where everyone has a job, whatever their size: a drummer, a referee, a scorekeeper, a cheerleader. Play it with siblings or neighbours, and swap jobs each round.",
      am: "መጠናቸው ምንም ይሁን ሁሉም ሥራ ያለውበትን ጨዋታ አብራችሁ ፍጠሩ፦ ከበሮ መቺ፣ ዳኛ፣ ነጥብ ቆጣሪ፣ አበረታች። ከወንድሞችና እህቶች ወይም ከጎረቤቶች ጋር ተጫወቱት፤ በየዙሩ ሥራዎቹን ተቀያየሩ።",
    },
  },
};

export default story;
