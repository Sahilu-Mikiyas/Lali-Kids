import type { Story } from "../stories";

/*
  "Lali's Weather Words": a week of weather, one word a day, and what to wear for it.
  Each morning Lali peeks out of her hive, and children can call the line with her:
  "Peek, peek! What's the weather today?"
  Monday sunny (a sun hat), Tuesday cloudy (a sweater), Wednesday windy (a scarf and a
  kite), Thursday rainy, the big kiremt rain (raincoat, boots, umbrella, and Anbessa
  putting on everything at once), Friday foggy, Saturday sun and rain together, so a
  rainbow, and on Sunday Lali draws the whole week.
  The Amharic keeps every English weather word visible (for example "ፀሐያማ – SUNNY").
  AMHARIC: first draft, to be checked by a native-speaking editor before launch,
  especially the refrain (ብቅ፣ ብቅ! ዛሬ አየሩ እንዴት ነው?) and the word for foggy (ጭጋጋማ).
*/
const story: Story = {
  id: "weather-words",
  pack: "english",
  title: { en: "Lali's Weather Words", am: "የላሊ የአየር ሁኔታ ቃላት" },
  category: "English",
  ageBands: ["3-5"],
  isFree: false,
  color: "#3D8FD9",
  scene: "lib-weather-words",
  coverPage: 10,
  pages: [
    {
      en: 'Lali lives in a hive by Anbessa\'s house. Every morning she peeks out and calls, "Peek, peek! What\'s the weather today?"',
      am: "ላሊ የምትኖረው ከአንበሳ ቤት አጠገብ ባለ ቀፎ ውስጥ ነው። በየጠዋቱ ብቅ ብላ «ብቅ፣ ብቅ! ዛሬ አየሩ እንዴት ነው?» ብላ ትጣራለች።",
    },
    {
      en: "Monday. Peek, peek! What's the weather today? It's SUNNY! The sun is hot and bright, so Anbessa puts on his sun hat.",
      am: "ሰኞ። ብቅ፣ ብቅ! ዛሬ አየሩ እንዴት ነው? ፀሐያማ ነው – SUNNY! ፀሐይዋ ሞቃትና ብሩህ ናት፤ ስለዚህ አንበሳ የፀሐይ ኮፍያውን አደረገ።",
    },
    {
      en: 'Tuesday. Peek, peek! What\'s the weather today? It\'s CLOUDY! Anbessa wears his warm sweater. "That cloud looks like a sheep!" said Gugu.',
      am: "ማክሰኞ። ብቅ፣ ብቅ! ዛሬ አየሩ እንዴት ነው? ደመናማ ነው – CLOUDY! አንበሳ ሞቃቱን ሹራብ ለበሰ። «ያ ደመና በግ ይመስላል!» አለ ጉጉ።",
    },
    {
      en: 'Wednesday. Peek, peek! What\'s the weather today? It\'s WINDY! Whoosh! The wind took Anbessa\'s hat. "Wear a scarf," said Lali, "and fly a kite!"',
      am: "ረቡዕ። ብቅ፣ ብቅ! ዛሬ አየሩ እንዴት ነው? ነፋሻማ ነው – WINDY! ሹው! ነፋሱ የአንበሳን ኮፍያ ወሰደው። «ሻርፕ አድርግ» አለች ላሊ፤ «ካይትም አብርር!»",
    },
    {
      en: "Thursday. Peek, peek! What's the weather today? It's RAINY! The big kiremt rain is here. Drip, drop, drip, drop.",
      am: "ሐሙስ። ብቅ፣ ብቅ! ዛሬ አየሩ እንዴት ነው? ዝናባማ ነው – RAINY! ትልቁ የክረምት ዝናብ መጣ። ጠብ፣ ጠብ፣ ጠብ፣ ጠብ።",
    },
    {
      en: '"Raincoat, boots, umbrella!" said Lali. But Anbessa put on EVERYTHING: sun hat, sweater, scarf, raincoat, boots and umbrella! "Just the rain things!"',
      am: "«የዝናብ ልብስ፣ ቡትስ፣ ጃንጥላ!» አለች ላሊ። አንበሳ ግን ሁሉንም ለበሰ፦ የፀሐይ ኮፍያ፣ ሹራብ፣ ሻርፕ፣ የዝናብ ልብስ፣ ቡትስ እና ጃንጥላ! «የዝናቡን ብቻ!»",
    },
    {
      en: 'Splish, splash! Anbessa and Gugu jumped in the puddles. "Kiremt rain is good rain," said Grandma. "It makes the teff grow tall."',
      am: "ፏ፣ ፏ! አንበሳና ጉጉ በኩሬዎቹ ውስጥ ዘለሉ። «የክረምት ዝናብ ጥሩ ዝናብ ነው» አለች አያት። «ጤፉን ረጅም አድርጎ ያበቅለዋል።»",
    },
    {
      en: 'Friday. Peek, peek! What\'s the weather today? It\'s FOGGY! Everything is white and soft, like a cloud came down to play. "Where is everyone?"',
      am: "ዓርብ። ብቅ፣ ብቅ! ዛሬ አየሩ እንዴት ነው? ጭጋጋማ ነው – FOGGY! ደመና ለመጫወት የወረደ ይመስል ሁሉም ነገር ነጭና ለስላሳ ነው። «ሁሉም የት ናቸው?»",
    },
    {
      en: '"Follow my buzz!" called Lali. Bzz, bzz. Anbessa followed the buzz, and BUMP! He found Gugu and Tsehay, giggling in the fog.',
      am: "«ድምፄን ተከተሉ!» ብላ ጠራች ላሊ። ብዝ፣ ብዝ። አንበሳ ድምፁን ተከተለ፣ እና ቡም! ጉጉንና ፀሐይን በጭጋጉ ውስጥ ሲስቁ አገኛቸው።",
    },
    {
      en: "Saturday. Peek, peek! What's the weather today? It's SUNNY and RAINY, both at once! The sun is shining while the rain is falling.",
      am: "ቅዳሜ። ብቅ፣ ብቅ! ዛሬ አየሩ እንዴት ነው? ፀሐያማም ዝናባማም ነው – SUNNY and RAINY! ዝናቡ እየዘነበ ፀሐይዋ ታበራለች።",
    },
    {
      en: "And then, look! A RAINBOW! Red, orange, yellow, green, blue and purple, right over the hills. No hat needed, just a big smile.",
      am: "ከዚያ ተመልከቱ! ቀስተ ደመና – RAINBOW! ቀይ፣ ብርቱካናማ፣ ቢጫ፣ አረንጓዴ፣ ሰማያዊ እና ወይን ጠጅ፣ ልክ ከኮረብታዎቹ በላይ። ኮፍያ አያስፈልግም፣ ትልቅ ፈገግታ ብቻ።",
    },
    {
      en: "On Sunday, Lali drew the whole week: sunny, cloudy, windy, rainy, foggy and a rainbow. Peek, peek! What's the weather where YOU are?",
      am: "እሁድ ላሊ ሙሉውን ሳምንት ሣለች፦ ፀሐያማ፣ ደመናማ፣ ነፋሻማ፣ ዝናባማ፣ ጭጋጋማ እና ቀስተ ደመና። ብቅ፣ ብቅ! እናንተ ጋ ዛሬ አየሩ እንዴት ነው?",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Peek out of the window together. What's the weather today, and what should we wear for it?",
        "Anbessa put on everything at once! Which clothes do we need for rain? Which ones for sun?",
      ],
      am: [
        "አብራችሁ በመስኮት ብቅ ብላችሁ ተመልከቱ። ዛሬ አየሩ እንዴት ነው? ምን መልበስ አለብን?",
        "አንበሳ ሁሉንም በአንድ ጊዜ ለበሰ! ለዝናብ የሚያስፈልጉን ልብሶች የትኞቹ ናቸው? ለፀሐይስ?",
      ],
    },
    activity: {
      en: 'Make a weather chart for one week. Each morning say "Peek, peek! What\'s the weather today?", then draw a sun, a cloud, wind lines, raindrops, fog or a rainbow, and say the English word.',
      am: "ለአንድ ሳምንት የአየር ሁኔታ ሠንጠረዥ ሥሩ። በየጠዋቱ «ብቅ፣ ብቅ! ዛሬ አየሩ እንዴት ነው?» በሉ፤ ከዚያ ፀሐይ፣ ደመና፣ የነፋስ መስመሮች፣ የዝናብ ጠብታዎች፣ ጭጋግ ወይም ቀስተ ደመና ሣሉ፣ የእንግሊዝኛውን ቃልም ተናገሩ።",
    },
  },
  teaches: {
    words: ["weather", "sunny", "cloudy", "windy", "rainy", "foggy", "rainbow", "hat", "sweater", "scarf", "raincoat", "boots", "umbrella"],
  },
};

export default story;
