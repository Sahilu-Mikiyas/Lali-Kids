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
      en: '"Taste it and find out," said Grandma. Gugu sipped. "Sweet! The sugar is still there!" "It has dissolved," said Grandma. "It broke into pieces far too tiny to see, and they spread all through the tea." Can it change back? Let\'s find out!',
      am: "«ቅመሰውና እወቅ» አሉ አያቴ። ጉጉ ፉት አለ። «ጣፋጭ ነው! ስኳሩ አሁንም አለ!» «ሟሟ» አሉ አያቴ። «ለማየት በጣም ጥቃቅን ወደሆኑ ቁርጥራጮች ተከፋፈለ፤ በሻዩ ውስጥም ሁሉ ተሰራጨ።» ተመልሶ ይቀየራል? እስቲ እንሞክር!",
    },
    {
      en: "Tsehay wanted to know more. She put a spoon of sugar in a glass of cold water and a spoon in a glass of hot tea, without stirring. The sugar in the hot tea vanished first. Then she tried stirring the cold one, and that helped too. \"Hot and stirred is fastest!\"",
      am: "ፀሐይ የበለጠ ማወቅ ፈለገች። አንድ ማንኪያ ስኳር በቀዝቃዛ ውሃ ብርጭቆ፣ አንድ ማንኪያ ደግሞ በትኩስ ሻይ ብርጭቆ ውስጥ ሳታማስል ጨመረች። በትኩሱ ሻይ ውስጥ ያለው ስኳር ቀድሞ ጠፋ። ከዚያ ቀዝቃዛውን ማማሰል ሞከረች፤ ያም ረዳ። «ትኩስና የተማሰለ ፈጣኑ ነው!»",
    },
    {
      en: 'Then Gugu stirred a spoonful of sand into a glass of water. Round and round it swirled… then it all sank and sat at the bottom. "Sand doesn\'t dissolve," said Tsehay. "You can still see every grain."',
      am: "ከዚያ ጉጉ አንድ ማንኪያ አሸዋ በውሃ ብርጭቆ ውስጥ አማሰለ። ዞረ፣ ዞረ… ከዚያ ሁሉም ሰምጦ ከታች ተቀመጠ። «አሸዋ አይሟሟም» አለች ፀሐይ። «እያንዳንዷን ቅንጣት አሁንም ማየት ትችላለህ።»",
    },
    {
      en: "Grandma put a lump of kibe in a pan over the fire. (A hot pan is a grown-up's job.) The hard yellow butter slumped, slid and melted into a golden puddle. \"Can it change back?\" asked Gugu. Can it change back? Let's find out!",
      am: "አያቴ አንድ ጉብታ ቅቤ በምጣድ ውስጥ በእሳት ላይ አደረጉ። (ትኩስ ምጣድ የትልቅ ሰው ሥራ ነው።) ጠንካራው ቢጫ ቅቤ ተዝለፈለፈ፣ ተንሸራተተ፣ ቀልጦም ወርቃማ ኩሬ ሆነ። «ተመልሶ ይቀየራል?» ብሎ ጠየቀ ጉጉ። ተመልሶ ይቀየራል? እስቲ እንሞክር!",
    },
    {
      en: 'Grandma poured one spoonful of the melted kibe onto a cool plate and set it by the window. After a while, Gugu poked it. It was solid again! "Melting can change back," said Tsehay. "Warm it, it melts. Cool it, it sets."',
      am: "አያቴ የቀለጠውን ቅቤ አንድ ማንኪያ በቀዝቃዛ ሳህን ላይ አፍስሰው በመስኮቱ አጠገብ አስቀመጡት። ትንሽ ቆይቶ ጉጉ ነካ አደረገው። እንደገና ጠጥሮ ነበር! «መቅለጥ ተመልሶ ሊቀየር ይችላል» አለች ፀሐይ። «ስታሞቁት ይቀልጣል። ስታቀዘቅዙት ይረጋል።»",
    },
    {
      en: "Next, Grandma baked injera. She poured the runny teff batter in a circle on the hot mitad and covered it. When she lifted the lid, tiny holes, the injera's eyes, covered it, and the runny batter had become soft, spongy injera.",
      am: "ቀጥሎ አያቴ እንጀራ ጋገሩ። ፈሳሹን የጤፍ ሊጥ በጋለው ምጣድ ላይ ዙሪያውን አፍስሰው ከደኑት። ክዳኑን ሲያነሡ ጥቃቅን ቀዳዳዎች፣ የእንጀራው ዓይኖች፣ ሸፍነውት ነበር፤ ፈሳሹ ሊጥም ለስላሳና ስፖንጅ የመሰለ እንጀራ ሆኖ ነበር።",
    },
    {
      en: 'Gugu put a piece of injera in a bowl of water and waited. It got soggy and floppy… but it never turned back into batter. "Cooking changes things for good," said Grandma, "like an egg in a hot pan. It can\'t go back to runny." Can it change back? Let\'s find out!',
      am: "ጉጉ አንድ ቁራጭ እንጀራ በውሃ ሳህን ውስጥ አድርጎ ጠበቀ። ረጠበ፣ ተልፈሰፈሰ… ግን ፈጽሞ ወደ ሊጥ አልተመለሰም። «ማብሰል ነገሮችን ለዘለቄታው ይቀይራል» አሉ አያቴ፤ «በጋለ ምጣድ ላይ እንዳለ እንቁላል። ተመልሶ ፈሳሽ ሊሆን አይችልም።» ተመልሶ ይቀየራል? እስቲ እንሞክር!",
    },
    {
      en: "Then, crash! Gugu's elbow knocked Grandma's salt bowl off the step, and the salt spilled all over the sandy ground by the door. \"Oh no! Now the salt and the sand are all mixed up!\" Gugu's face fell.",
      am: "ከዚያ ቋ! የጉጉ ክርን የአያቴን የጨው ሳህን ከደረጃው ላይ ጣለው፤ ጨውም በበሩ አጠገብ ባለው አሸዋማ መሬት ላይ ሁሉ ተበተነ። «ውይ! አሁን ጨውና አሸዋው ተደባለቁ!» የጉጉ ፊት ጠቆረ።",
    },
    {
      en: "Tsehay thought about everything they had found out. \"Salt dissolves, but sand doesn't!\" They scooped up the salty sand, stirred it into a bowl of water, and poured the water through a clean cloth. The sand stayed in the cloth. The salt went through, dissolved in the water.",
      am: "ፀሐይ የደረሱበትን ሁሉ አሰበች። «ጨው ይሟሟል፤ አሸዋ ግን አይሟሟም!» ጨዋማውን አሸዋ ዝቀው በውሃ ሳህን ውስጥ አማሰሉት፤ ውሃውንም በንጹህ ጨርቅ አጣሩት። አሸዋው በጨርቁ ላይ ቀረ። ጨው ደግሞ በውሃው ውስጥ ሟሙቶ አለፈ።",
    },
    {
      en: "They poured the salty water into a wide dish and left it in the sun. Day by day, the water went off into the air, and the dish got drier. On the fourth day, white salt crystals were left, sparkling. \"Just like the salt flats in the Afar desert!\" said Grandma.",
      am: "ጨዋማውን ውሃ ሰፊ ሳህን ውስጥ አፍስሰው በፀሐይ ላይ ተዉት። ቀን በቀን ውሃው ወደ አየር ሄደ፤ ሳህኑም ደረቀ። በአራተኛው ቀን ነጫጭ የጨው ቅንጣቶች እያበሩ ቀሩ። «ልክ እንደ አፋር በረሃ የጨው ሜዳዎች!» አሉ አያቴ።",
    },
    {
      en: 'Gugu scraped the salt back into Grandma\'s bowl. "Some changes go back, like melting and dissolving. Some don\'t, like cooking." He grinned. "And when you\'re not sure…" Everyone shouted, "Can it change back? Let\'s find out!"',
      am: "ጉጉ ጨውን ፍቆ ወደ አያቴ ሳህን መለሰው። «አንዳንድ ለውጦች ይመለሳሉ፤ እንደ መቅለጥና መሟሟት። አንዳንዶቹ አይመለሱም፤ እንደ ማብሰል።» ፈገግ አለ። «እርግጠኛ ሳትሆኑ ሲቀር ደግሞ…» ሁሉም ጮኹ፦ «ተመልሶ ይቀየራል? እስቲ እንሞክር!»",
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
