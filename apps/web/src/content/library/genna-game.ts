import type { Story } from "../stories";

/*
  "The Genna Game": Ethiopian Christmas, Genna, on 7 January (29 Tahsas in the Ethiopian
  calendar). The family goes to church in white through the night; at home Grandma has the doro
  wat ready to break the long fast; then everyone plays genna, the field game with curved
  sticks and a little wooden ball (the rur), which tradition says the shepherds played for joy
  at the news of the baby's birth. Anbessa wants very much to win, misses the last hit, throws
  his stick down and growls "Not fair!", and Grandma reminds him of the old saying that at the
  genna game there is no master and no servant: everyone is equal, winners and losers. He says
  "Good game" to Gugu and they share one big plate.
  The repeated line to join in on: "Hit the ball, run, run, run!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the repeated line (ሩሩን ምታ፣ ሩጥ፣ ሩጥ፣ ሩጥ!), the word for the ball (ሩር), the form of the
  old saying on page 11, and the sound words (ቋ, ጠቅ, ድው).
*/
const story: Story = {
  id: "genna-game",
  pack: "story",
  title: { en: "The Genna Game", am: "የገና ጨዋታ" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#2F8A5A",
  scene: "lib-genna-game",
  coverPage: 6,
  teaches: { words: ["genna", "christmas", "stick", "ball", "teams", "game"] },
  pages: [
    {
      en: "It was Genna, Christmas, on the seventh of January. All night long, Anbessa and his family sang at church, dressed in white, until the sky grew light.",
      am: "ገና ነበር፣ ታኅሣሥ ሃያ ዘጠኝ። ሌሊቱን ሙሉ አንበሳና ቤተሰቡ ነጭ ለብሰው ሰማዩ እስኪነጋ ድረስ በቤተ ክርስቲያን ዘመሩ።",
    },
    {
      en: 'At home, the whole house smelled of doro wat. "After the long fast, today we feast!" said Grandma, stirring the big pot. "But first, you play."',
      am: "ቤት ሲደርሱ ቤቱ ሁሉ የዶሮ ወጥ ሽታ ሞላው። «ከረጅሙ ጾም በኋላ ዛሬ እንበላለን!» አለች አያት ትልቁን ድስት እያማሰለች። «መጀመሪያ ግን ተጫወቱ።»",
    },
    {
      en: 'Gugu ran in with curved sticks and a little round wooden ball. "Genna! Genna!" he shouted. "Hit the ball, run, run, run!"',
      am: "ጉጉ የተጣመሙ ዱላዎችንና ትንሽ ክብ የእንጨት ሩር ይዞ እየሮጠ መጣ። «ገና! ገና!» ብሎ ጮኸ። «ሩሩን ምታ፣ ሩጥ፣ ሩጥ፣ ሩጥ!»",
    },
    {
      en: '"Long ago," said Grandma, "shepherds in the fields heard happy news: a baby was born. They were so glad, they played with their sticks, just like this."',
      am: "«ድሮ ድሮ» አለች አያት፣ «በሜዳ የነበሩ እረኞች የምሥራች ሰሙ፤ ሕፃን ተወለደ። በጣም ደስ ብሏቸው ልክ እንደዚህ በዱላዎቻቸው ተጫወቱ።»",
    },
    {
      en: 'Two teams: Anbessa and Tsehay against Gugu and his big cousin Dagi. Lali buzzed in the middle. "Ready... GO!" Hit the ball, run, run, run!',
      am: "ሁለት ቡድኖች፤ አንበሳና ፀሐይ ከጉጉና ከትልቁ የአጎቱ ልጅ ከዳጊ ጋር። ላሊ በመሃል አንዣበበች። «ተዘጋጁ... ጀምሩ!» ሩሩን ምታ፣ ሩጥ፣ ሩጥ፣ ሩጥ!",
    },
    {
      en: "Thwack! Dagi hit the ball far across the field. Anbessa ran and ran, but Gugu got there first. Tock! One goal to Gugu's team.",
      am: "ቋ! ዳጊ ሩሩን በሜዳው ላይ አርቆ መታው። አንበሳ ሮጠ፣ ሮጠ፤ ግን ጉጉ ቀድሞ ደረሰ። ጠቅ! ለጉጉ ቡድን አንድ ግብ።",
    },
    {
      en: "Anbessa ran even faster. Tsehay passed the ball to him, tap! Anbessa swung his stick. WHACK! Into the goal! One goal each!",
      am: "አንበሳ የበለጠ ፈጥኖ ሮጠ። ፀሐይ ሩሩን አቀበለችው፤ ጠቅ! አንበሳ ዱላውን ሰነዘረ። ቋ! ግብ ገባ! አንድ ለአንድ!",
    },
    {
      en: "Back and forth went the ball. Sticks clacked, dust flew, and everybody laughed. Grandma and the neighbours cheered. Hit the ball, run, run, run!",
      am: "ሩሩ ወዲያና ወዲህ ሄደ። ዱላዎቹ ተጋጩ፣ አቧራ ተነሣ፣ ሁሉም ሳቁ። አያትና ጎረቤቶቹ አጨበጨቡ። ሩሩን ምታ፣ ሩጥ፣ ሩጥ፣ ሩጥ!",
    },
    {
      en: '"Last goal wins!" called Lali. Anbessa swung with all his might... and missed! Gugu tapped the ball into the goal. Gugu\'s team won.',
      am: "«የመጨረሻው ግብ ያሸንፋል!» አለች ላሊ። አንበሳ በሙሉ ኃይሉ ሰነዘረ... ግን ሳተ! ጉጉ ሩሩን ቀስ ብሎ ወደ ግቡ ገፋው። የጉጉ ቡድን አሸነፈ።",
    },
    {
      en: 'Anbessa threw his stick down. Thud! His face felt hot. "Not fair!" he growled. Everyone went quiet. Even Lali stopped buzzing.',
      am: "አንበሳ ዱላውን ወረወረው። ድው! ፊቱ ጋለ። «ይሄ ፍትሕ አይደለም!» ብሎ አጉረመረመ። ሁሉም ዝም አሉ። ላሊ እንኳ ማንዣበቧን አቆመች።",
    },
    {
      en: 'Grandma sat beside him. "At the genna game there is no master and no servant," she said softly. "We are all the same: winners and losers too."',
      am: "አያት አጠገቡ ተቀመጠች። «በገና ጨዋታ ጌታና ሎሌ የለም» አለች በለስላሳ ድምፅ። «ሁላችንም እኩል ነን፤ አሸናፊዎችም ተሸናፊዎችም።»",
    },
    {
      en: 'Anbessa took a big breath, and another. He picked up his stick and held out his paw. "Good game, Gugu. Great hit." Gugu grinned. "Your goal was great too!"',
      am: "አንበሳ ትልቅ ትንፋሽ ወሰደ፤ ደግሞም ሌላ። ዱላውን አንሥቶ እጁን ዘረጋ። «ጥሩ ጨዋታ ነበር ጉጉ። ጎበዝ ምት።» ጉጉ ፈገግ አለ። «ያንተም ግብ ድንቅ ነበር!»",
    },
    {
      en: 'Then everyone shared doro wat and injera from one big plate. "Next year," said Anbessa, "can we play again?" Hit the ball, run, run, run!',
      am: "ከዚያ ሁሉም ከአንድ ትልቅ ገበታ ዶሮ ወጥና እንጀራ ተቋደሱ። «በሚቀጥለው ዓመት እንደገና እንጫወት?» አለ አንበሳ። ሩሩን ምታ፣ ሩጥ፣ ሩጥ፣ ሩጥ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "How did Anbessa feel when he missed the last hit? What did he do with that feeling, and what helped him calm down?",
        "Grandma said that in the genna game everyone is equal. What does it mean to be a good loser, and a good winner?",
      ],
      am: [
        "አንበሳ የመጨረሻውን ምት ሲስት ምን ተሰማው? በዚያ ስሜት ምን አደረገ? እንዲረጋጋ የረዳው ምንድን ነው?",
        "አያት በገና ጨዋታ ሁሉም እኩል ነው አለች። ጥሩ ተሸናፊ መሆን ምን ማለት ነው? ጥሩ አሸናፊ መሆንስ?",
      ],
    },
    activity: {
      en: 'Play a gentle genna game at home: roll up a sock for the ball and use rolled newspaper for sticks. At the end, everyone shakes hands and says one kind thing about another player, whoever won.',
      am: "በቤት ውስጥ ለስላሳ የገና ጨዋታ ተጫወቱ፤ ካልሲ ጠቅልላችሁ ሩር አድርጉ፣ የተጠቀለለ ጋዜጣ ዱላ ይሁናችሁ። በመጨረሻ ማንም ቢያሸንፍ ሁሉም እጅ ይጨባበጡ፣ ስለ ሌላ ተጫዋች አንድ ደግ ነገር ይናገሩ።",
    },
  },
};

export default story;
