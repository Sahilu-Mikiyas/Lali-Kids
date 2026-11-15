import type { Story } from "../../../stories";

/*
  "Can It Change Back?" (level 3: mixing and dissolving; heating changes, some that can be undone and
  some that can't). In Grandma's kitchen, Gugu stirs sugar into his tea and it disappears. Gone? He
  tastes: sweet! It is still there, in pieces too tiny to see: it has dissolved. Tsehay tests: sugar
  in cold water and in hot tea, stirred and not stirred: hot and stirred dissolves fastest. Sand in
  water swirls and settles: it doesn't dissolve. Grandma melts kibe for the stew; a spoonful left on
  a cool plate sets solid again: it changed back. Grandma bakes injera: the runny batter on the hot
  mitad gets eyes and turns into injera. Can injera turn back into batter? Soaked in water it only
  gets soggy: cooking changes it for good, like an egg in the pan. The problem: Gugu knocks Grandma's
  salt bowl into the sand by the door. Tsehay works it out from what they've learned: stir the salty
  sand into water (the salt dissolves, the sand doesn't), pour the water through a cloth to catch the
  sand, and leave the salty water in a dish in the sun. After some days the water has gone into the
  air and white salt crystals are left, like the salt flats of the Afar.
  Join-in line: "Can it change back? Let's find out!"

  Science (kept simple and true): sugar and salt dissolve in water (they are still there, too small to
  see); warm water and stirring make them dissolve faster; sand does not dissolve and can be filtered
  out; evaporating the water leaves the salt behind; melting and setting butter is a change that can
  be undone; cooking batter into injera and cooking an egg are changes that can't. Grown-ups handle
  the hot pan and the mitad.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ተመልሶ ይቀየራል? እስቲ እንሞክር!» and «ይሟሟል» for dissolves.
*/
const story: Story = {
  id: "can-it-change-back",
  course: "science-nature",
  pack: "story",
  title: { en: "Can It Change Back?", am: "ተመልሶ ይቀየራል?" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#C9602A",
  scene: "lib-can-it-change-back",
  coverPage: 6,
  teaches: { words: ["dissolve", "melt", "mix", "cook", "change", "salt", "sugar"] },
  pages: [
    {
      en: 'Gugu spooned sugar into his tea and stirred. Swirl, swirl… and the sugar disappeared! "Where did it go?" he asked. "Is it gone for ever?"',
      am: "ጉጉ በሻዩ ውስጥ ስኳር በማንኪያ ጨምሮ አማሰለ። ዙር፣ ዙር… ስኳሩም ጠፋ! «የት ሄደ?» ብሎ ጠየቀ። «ለዘለዓለም ጠፋ?»",
    },
    {
      en: "\"Taste it and find out,\" said Grandma. Gugu sipped. \"Sweet! It's still there!\" \"It has dissolved into bits too tiny to see.\" Can it change back? Let's find out!",
      am: "«ቅመሰውና እወቅ» አሉ አያቴ። ጉጉ ፉት አለ። «ጣፋጭ! አሁንም አለ!» «ለማየት በጣም ጥቃቅን ሆኖ ሟሟ።» ተመልሶ ይቀየራል? እስቲ እንሞክር!",
    },
    {
      en: "Tsehay tried sugar in cold water and in hot tea. The sugar in the hot tea vanished first. Stirring helped too. \"Hot and stirred is fastest!\"",
      am: "ፀሐይ ስኳርን በቀዝቃዛ ውሃና በትኩስ ሻይ ሞከረች። በትኩሱ ሻይ ውስጥ ያለው ቀድሞ ጠፋ። ማማሰልም ረዳ። «ትኩስና የተማሰለ ፈጣኑ ነው!»",
    },
    {
      en: "Gugu stirred sand into water. Round it swirled… then it sank to the bottom. \"Sand doesn't dissolve,\" said Tsehay. \"You can still see every grain.\"",
      am: "ጉጉ አሸዋ በውሃ ውስጥ አማሰለ። ዞረ… ከዚያ ወደ ታች ሰመጠ። «አሸዋ አይሟሟም» አለች ፀሐይ። «እያንዳንዷን ቅንጣት ማየት ትችላለህ።»",
    },
    {
      en: "Grandma put kibe in a pan over the fire. (Hot pans are a grown-up's job.) The hard butter slumped and melted into a golden puddle. Can it change back? Let's find out!",
      am: "አያቴ ቅቤ በምጣድ በእሳት ላይ አደረጉ። (ትኩስ ምጣድ የትልቅ ሰው ሥራ ነው።) ጠንካራው ቅቤ ቀልጦ ወርቃማ ኩሬ ሆነ። ተመልሶ ይቀየራል? እስቲ እንሞክር!",
    },
    {
      en: "Grandma poured a spoonful of melted kibe onto a cool plate. Later, Gugu poked it. Solid again! \"Melting can change back,\" said Tsehay. \"Warm it, it melts. Cool it, it sets.\"",
      am: "አያቴ የቀለጠ ቅቤ በቀዝቃዛ ሳህን ላይ አፈሰሱ። ቆይቶ ጉጉ ነካው። እንደገና ጠጥሯል! «መቅለጥ ይመለሳል» አለች ፀሐይ። «ሲሞቅ ይቀልጣል፤ ሲቀዘቅዝ ይረጋል።»",
    },
    {
      en: "Next, Grandma poured runny teff batter on the hot mitad and covered it. When she lifted the lid, tiny holes covered it: the batter had become soft injera.",
      am: "ቀጥሎ አያቴ ፈሳሽ የጤፍ ሊጥ በጋለው ምጣድ ላይ አፍስሰው ከደኑት። ክዳኑን ሲያነሡ ጥቃቅን ዓይኖች ሸፍነውት ነበር፦ ሊጡ ለስላሳ እንጀራ ሆኗል።",
    },
    {
      en: "Gugu put injera in water and waited. It got soggy… but never turned back into batter. \"Cooking changes things for good,\" said Grandma, \"like an egg in a hot pan.\"",
      am: "ጉጉ እንጀራ በውሃ ውስጥ አድርጎ ጠበቀ። ረጠበ… ግን ወደ ሊጥ አልተመለሰም። «ማብሰል ለዘለቄታው ይቀይራል» አሉ አያቴ፤ «በጋለ ምጣድ ላይ እንዳለ እንቁላል።»",
    },
    {
      en: "Then, crash! Gugu's elbow knocked the salt bowl off the step. Salt spilled all over the sandy ground. \"Oh no! Now the salt and sand are all mixed up!\"",
      am: "ከዚያ ቋ! የጉጉ ክርን የጨው ሳህኑን ከደረጃው ጣለው። ጨው በአሸዋማው መሬት ላይ ተበተነ። «ውይ! አሁን ጨውና አሸዋው ተደባለቁ!»",
    },
    {
      en: "Tsehay thought. \"Salt dissolves, but sand doesn't!\" They stirred the salty sand into water and poured it through a clean cloth. The sand stayed in the cloth.",
      am: "ፀሐይ አሰበች። «ጨው ይሟሟል፤ አሸዋ ግን አይሟሟም!» ጨዋማውን አሸዋ በውሃ ውስጥ አማሰሉ፤ በንጹህ ጨርቅም አጣሩት። አሸዋው በጨርቁ ላይ ቀረ።",
    },
    {
      en: "They left the salty water in a wide dish in the sun. Day by day it dried. On day four, white salt crystals were left. \"Like the salt flats of the Afar!\"",
      am: "ጨዋማውን ውሃ በሰፊ ሳህን በፀሐይ ላይ ተዉት። ቀን በቀን ደረቀ። በአራተኛው ቀን ነጫጭ የጨው ቅንጣቶች ቀሩ። «እንደ አፋር የጨው ሜዳዎች!»",
    },
    {
      en: "Gugu scraped the salt back into the bowl. \"Melting and dissolving can go back. Cooking can't.\" He grinned. \"And if you're not sure…\" \"Can it change back? Let's find out!\"",
      am: "ጉጉ ጨውን ፍቆ ወደ ሳህኑ መለሰ። «መቅለጥና መሟሟት ይመለሳሉ። ማብሰል አይመለስም።» ፈገግ አለ። «እርግጠኛ ካልሆናችሁ…» «ተመልሶ ይቀየራል? እስቲ እንሞክር!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "How did Gugu know the sugar was still in his tea? What made it dissolve faster?",
        "Which changes could go back (melting butter, dissolving salt) and which couldn't (cooking injera, cooking an egg)? Can you think of others in the kitchen?",
      ],
      am: [
        "ጉጉ ስኳሩ አሁንም በሻዩ ውስጥ እንዳለ እንዴት አወቀ? ቶሎ እንዲሟሟ ያደረገው ምንድን ነው?",
        "የትኞቹ ለውጦች ሊመለሱ ቻሉ (ቅቤ መቅለጥ፣ ጨው መሟሟት)? የትኞቹስ አልቻሉም (እንጀራ መጋገር፣ እንቁላል ማብሰል)? በማድ ቤት ውስጥ ሌሎችን ታውቃላችሁ?",
      ],
    },
    activity: {
      en: "Do Tsehay's test: a spoon of sugar in cold water and one in warm water (a grown-up pours the warm water). Which disappears first? Then dissolve a spoon of salt in a little water, pour it on a saucer and leave it in a sunny window for a few days. What is left?",
      am: "የፀሐይን ሙከራ አድርጉ፦ አንድ ማንኪያ ስኳር በቀዝቃዛ ውሃ፣ አንድ ደግሞ በሞቃት ውሃ (ሞቃቱን ውሃ ትልቅ ሰው ያፍስስ)። የትኛው ቀድሞ ይጠፋል? ከዚያ አንድ ማንኪያ ጨው በትንሽ ውሃ ውስጥ አሟሙና በሳህን ላይ አፍስሳችሁ ለጥቂት ቀናት ፀሐያማ መስኮት ላይ ተዉት። ምን ቀረ?",
    },
  },
};

export default story;
