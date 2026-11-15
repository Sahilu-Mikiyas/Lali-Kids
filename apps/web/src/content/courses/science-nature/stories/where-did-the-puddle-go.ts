import type { Story } from "../../../stories";

/*
  "Where Did the Puddle Go?" (level 4: the water cycle). After a kiremt night, Gugu sails a leaf boat
  on a big puddle; by evening it has gone. Did the ground drink it, or the sun? He marks the edge
  with sticks and leaves a bowl of water in the sun, where no soil can drink it: the bowl gets lower
  too. The sun warms the water and it rises as invisible water vapour; high up, the air is cold and
  the vapour turns into tiny drops: clouds. A cold plate over a bowl of warm water shows it. Drops
  join until they are heavy and fall as rain; rain soaks in, fills rivers like the Abay, reaches the
  sea, and the sun lifts it again. Join-in line: "Up as vapour, down as rain, round and round again!"

  Science (kept simple and true): a puddle shrinks because water evaporates (and some soaks into the
  ground); water vapour is invisible; it condenses into tiny droplets in cooler air to form clouds;
  droplets merge and fall as rain; water flows to rivers, lakes and the sea and evaporates again.
  The warm water in the experiment is poured by a grown-up.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «እንፋሎት ሆኖ ወደ ላይ፣ ዝናብ ሆኖ ወደ ታች፣ እየዞረ ይመለሳል!» and «የውሃ ዑደት».
*/
const story: Story = {
  id: "where-did-the-puddle-go",
  course: "science-nature",
  pack: "story",
  title: { en: "Where Did the Puddle Go?", am: "ኩሬው የት ሄደ?" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#3A8AD8",
  scene: "lib-where-did-the-puddle-go",
  coverPage: 4,
  teaches: { words: ["evaporate", "vapour", "cloud", "rain", "river", "water cycle"] },
  pages: [
    {
      en: "After a night of kiremt rain, a big puddle lay in Gugu's yard. He sailed a leaf boat on it all morning. \"I'll play again after lunch!\"",
      am: "ከክረምት ዝናብ በኋላ በጉጉ ግቢ ትልቅ ኩሬ ነበረ። ጠዋቱን ሙሉ የቅጠል ጀልባ አስዋኘበት። «ከምሳ በኋላ እንደገና እጫወታለሁ!»",
    },
    {
      en: "After lunch, the puddle was smaller. By evening, it was gone! \"Who took my puddle?\" Did the ground drink it? Did the sun?",
      am: "ከምሳ በኋላ ኩሬው አንሶ ነበር። ማታ ጠፍቶ ነበር! «ኩሬዬን ማን ወሰደው?» መሬቱ ጠጣው? ፀሐይ?",
    },
    {
      en: "\"Let's find out,\" buzzed Lali. Next puddle, Gugu put a stick at its edge every hour. And he set a bowl of water in the sun, where no soil could drink it.",
      am: "«እስቲ እንወቅ» አለች ላሊ። በሚቀጥለው ኩሬ ጉጉ በየሰዓቱ በዳሩ እንጨት ተከለ። መሬት እንዳይጠጣውም ሳህን ውሃ በፀሐይ ላይ አስቀመጠ።",
    },
    {
      en: "The bowl got lower too! \"The sun warmed the water,\" said Lali, \"and it rose into the air as vapour, too tiny to see.\" Up as vapour, down as rain, round and round again!",
      am: "ሳህኑም አነሰ! «ፀሐይ ውሃውን አሞቀችው» አለች ላሊ፤ «የማይታይ እንፋሎት ሆኖ ወደ አየር ወጣ።» እንፋሎት ሆኖ ወደ ላይ፣ ዝናብ ሆኖ ወደ ታች፣ እየዞረ ይመለሳል!",
    },
    {
      en: "\"Where does the vapour go?\" Up high, the air is cold. The vapour cools and turns into tiny drops of water. Millions of tiny drops together make a cloud.",
      am: "«እንፋሎቱ የት ይሄዳል?» ከፍ ብሎ አየሩ ቀዝቃዛ ነው። እንፋሎቱ ቀዝቅዞ ጥቃቅን ጠብታዎች ይሆናል። ሚሊዮን ጠብታዎች አንድ ላይ ደመና ይሠራሉ።",
    },
    {
      en: "To see it, Grandma poured warm water in a bowl and Gugu held a cold plate over it. Soon drops gathered under the plate. \"A tiny cloud, and tiny rain!\"",
      am: "ለማየት አያቴ ሞቅ ያለ ውሃ በሳህን አፈሰሱ፤ ጉጉ ቀዝቃዛ ሳህን በላዩ ያዘ። ብዙም ሳይቆይ ከሥሩ ጠብታዎች ተሰበሰቡ። «ትንሽ ደመና፣ ትንሽ ዝናብ!»",
    },
    {
      en: "In a cloud, tiny drops bump and join into bigger drops. When they are too heavy to float, down they fall: rain! Up as vapour, down as rain, round and round again!",
      am: "በደመና ውስጥ ጥቃቅን ጠብታዎች ተጋጭተው ትልቅ ይሆናሉ። ሲከብዱ ይወርዳሉ፦ ዝናብ! እንፋሎት ሆኖ ወደ ላይ፣ ዝናብ ሆኖ ወደ ታች፣ እየዞረ ይመለሳል!",
    },
    {
      en: "Kiremt clouds pour rain on the highlands. Some soaks into the soil for the plants. Some fills ponds, and some runs into streams.",
      am: "የክረምት ደመናዎች በደጋው ላይ ዝናብ ያዘንባሉ። ከፊሉ ለተክሎች ወደ አፈር ይገባል። ከፊሉ ኩሬዎችን ይሞላል፤ ከፊሉ ወደ ጅረቶች ይፈሳል።",
    },
    {
      en: "Streams join rivers, like the Abay, the Blue Nile. It flows a very long way, through other countries, all the way to the sea.",
      am: "ጅረቶች ከወንዞች ይቀላቀላሉ፤ እንደ ዓባይ። ዓባይ በሌሎች አገሮች በኩል ረጅም መንገድ ተጉዞ ባሕር ይደርሳል።",
    },
    {
      en: "Over the sea, the lakes and every puddle, the sun warms the water again, and up goes the vapour. Up as vapour, down as rain, round and round again!",
      am: "በባሕሩ፣ በሐይቆቹና በየኩሬው ላይ ፀሐይ ውሃውን እንደገና ታሞቀዋለች፤ እንፋሎቱም ይወጣል። እንፋሎት ሆኖ ወደ ላይ፣ ዝናብ ሆኖ ወደ ታች፣ እየዞረ ይመለሳል!",
    },
    {
      en: "\"It's a circle!\" Gugu drew it: the sun, vapour rising, a cloud, rain, a river, the sea. \"The water cycle! My puddle might be a cloud now!\"",
      am: "«ክብ ነው!» ጉጉ ሣለው፦ ፀሐይ፣ የሚወጣ እንፋሎት፣ ደመና፣ ዝናብ፣ ወንዝ፣ ባሕር። «የውሃ ዑደት! ኩሬዬ አሁን ደመና ሊሆን ይችላል!»",
    },
    {
      en: "Next rain, a new puddle lay in the yard. Gugu smiled up at the clouds. \"Welcome back, water!\" Up as vapour, down as rain, round and round again!",
      am: "በሚቀጥለው ዝናብ አዲስ ኩሬ ተገኘ። ጉጉ ወደ ደመናዎቹ ፈገግ አለ። «እንኳን ደህና መጣህ ውሃ!» እንፋሎት ሆኖ ወደ ላይ፣ ዝናብ ሆኖ ወደ ታች፣ እየዞረ ይመለሳል!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Where did Gugu's puddle go? Why did he also test a bowl of water?", "How does water get from a puddle up into a cloud, and back down again?"],
      am: ["የጉጉ ኩሬ የት ሄደ? ሳህን ውሃም ለምን ሞከረ?", "ውሃ ከኩሬ ወደ ደመና እንዴት ይወጣል? እንዴትስ ተመልሶ ይወርዳል?"],
    },
    activity: {
      en: "After rain, mark the edge of a puddle with stones every hour and watch it shrink. Or put the same amount of water in two cups, one in the sun and one in the shade, and check them each day.",
      am: "ከዝናብ በኋላ በየሰዓቱ የኩሬውን ዳር በድንጋይ ምልክት አድርጉና ሲያንስ ተመልከቱ። ወይም እኩል ውሃ በሁለት ስኒዎች አድርጋችሁ አንዱን በፀሐይ፣ ሌላውን በጥላ አስቀምጡና በየቀኑ ተመልከቱ።",
    },
  },
};

export default story;
