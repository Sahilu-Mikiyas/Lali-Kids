import type { Story } from "../../../stories";

/*
  "The Smell Detective" (level 2: the five senses). Anbessa smells Grandma's coffee roasting before
  he sees it. Grandma ties a scarf over his eyes for a guessing game, and Anbessa is sure he'll know
  nothing without his eyes. But his ears hear a cow (moo!), his paw feels something smooth, cool
  and egg-shaped, his nose knows coffee, and his tongue tastes sour lemon and sweet banana. Gugu
  tries holding his nose while he tastes mango and banana: it's hard to tell them apart, until he
  lets go. Lali explains the five senses and the brain. Then Grandma's puzzle: what is inside the
  closed pot? Gugu can't see or touch it, so he uses two senses at once: it rattles (beans?) and
  smells of berbere. Animals use their senses too: Lali smells with her feelers, and Hawi's big
  ears hear far away. We only taste things a grown-up says are food.
  Join-in line: "Look, listen, sniff, taste and touch!"

  Science (kept simple and true): the eyes see, the ears hear, the nose smells, the tongue tastes,
  the skin feels (touch, warm and cold); the senses send messages to the brain; the tongue tastes
  sweet, salty, sour and bitter (and savoury), and much of what we call flavour is smell, so a
  held nose makes foods hard to tell apart; bees smell with their antennae.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «እዩ፣ አዳምጡ፣ አሽትቱ፣ ቅመሱ፣ ዳስሱ!» and «የስሜት ሕዋሳት».
*/
const story: Story = {
  id: "the-smell-detective",
  course: "science-nature",
  pack: "story",
  title: { en: "The Smell Detective", am: "ሽታ መርማሪው" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#8A5AB8",
  scene: "lib-the-smell-detective",
  coverPage: 4,
  teaches: { words: ["see", "hear", "smell", "taste", "touch", "senses", "brain"] },
  pages: [
    {
      en: "Anbessa woke up and sniffed. \"Grandma is roasting coffee!\" He ran to the kitchen, and there she was. \"How did you know before you saw it?\" Anbessa tapped his nose.",
      am: "አንበሳ ነቅቶ አሸተተ። «አያቴ ቡና እየቆሉ ነው!» ወደ ማድ ቤት ሮጠ፤ እዚያም ነበሩ። «ሳታየው እንዴት አወቅህ?» አንበሳ አፍንጫውን መታ መታ አደረገ።",
    },
    {
      en: '"Let\'s play a game," said Grandma, and she tied a soft scarf over his eyes. Anbessa wobbled. "But without my eyes, I won\'t know anything!" Gugu giggled. "Let\'s find out."',
      am: "«እስቲ እንጫወት» አሉ አያቴ፤ በዓይኖቹም ላይ ለስላሳ ሻሽ አሰሩለት። አንበሳ ተንገዳገደ። «ያለ ዓይኖቼ ግን ምንም አላውቅም!» ጉጉ ተንከተከተ። «እስቲ እንሞክር።»",
    },
    {
      en: "\"Listen,\" said Grandma. Outside, something went \"Mooooo!\" \"The cow!\" The coffee beans went crackle, pop. \"The beans are popping!\" Look, listen, sniff, taste and touch!",
      am: "«አዳምጥ» አሉ አያቴ። ውጭ የሆነ ነገር «ሙውው!» አለ። «ላሚቱ!» ፍሬዎቹ ቻ፣ ቋ አሉ። «ፍሬዎቹ እየፈነዱ ነው!» እዩ፣ አዳምጡ፣ አሽትቱ፣ ቅመሱ፣ ዳስሱ!",
    },
    {
      en: "Grandma put something in his paw: smooth, hard and cool, round at both ends. \"An egg!\" The skin on his paw could feel its shape, and how cool it was.",
      am: "አያቴ የሆነ ነገር በእጁ አስቀመጡ፦ ለስላሳ፣ ጠንካራና ቀዝቃዛ፣ ሁለቱም ጫፎች ክብ። «እንቁላል!» የእጁ ቆዳ ቅርጹንና ቅዝቃዜውን ተሰማው።",
    },
    {
      en: "Sniff, sniff. \"Fresh and sharp… lemon!\" A tiny taste: sour! He scrunched his face. Then something soft and sweet. \"Banana!\" Look, listen, sniff, taste and touch!",
      am: "ሽት፣ ሽት። «ትኩስና የሚያቃጥል… ሎሚ!» ትንሽ ቀመሰ፦ ኮምጣጣ! ፊቱን ኮሰኮሰ። ከዚያ ለስላሳና ጣፋጭ። «ሙዝ!» እዩ፣ አዳምጡ፣ አሽትቱ፣ ቅመሱ፣ ዳስሱ!",
    },
    {
      en: "Gugu held his nose and tasted mango, then banana. \"They taste the same. Just sweet!\" He let go. \"Oh! MANGO!\" \"Your nose helps you taste,\" said Grandma.",
      am: "ጉጉ አፍንጫውን ይዞ ማንጎና ሙዝ ቀመሰ። «አንድ ዓይነት ናቸው። ጣፋጭ ብቻ!» አፍንጫውን ለቀቀ። «ኦ! ማንጎ!» «አፍንጫ እንድትቀምስ ይረዳል» አሉ አያቴ።",
    },
    {
      en: "Bzzz! Lali flew in. \"You have five helpers: eyes to see, ears to hear, a nose to smell, a tongue to taste and skin to touch. They send messages to your brain.\"",
      am: "ቡዝዝ! ላሊ መጣች። «አምስት ረዳቶች አሏችሁ፦ ዓይን፣ ጆሮ፣ አፍንጫ፣ ምላስና ቆዳ። ሁሉም ወደ አንጎላችሁ መልእክት ይልካሉ።»",
    },
    {
      en: 'Then Grandma set down a little clay pot with a lid on. "Last puzzle. What\'s inside? No looking, and no touching!" Gugu frowned. How could he find out?',
      am: "ከዚያ አያቴ ክዳን ያላት ትንሽ የሸክላ ማሰሮ አስቀመጡ። «የመጨረሻው እንቆቅልሽ። ውስጡ ምን አለ? ማየትም መንካትም የለም!» ጉጉ ፊቱን አጨፈገገ። እንዴት ሊያውቅ ይችላል?",
    },
    {
      en: "Gugu shook the pot. Rattle, rattle. \"Something small and hard.\" He lifted the lid a crack and sniffed. Hot and spicy… \"Berbere!\" \"Two senses together. Clever!\"",
      am: "ጉጉ ማሰሮውን ነቀነቀው። ኳ፣ ኳ። «ትንሽና ጠንካራ ነገር።» ክዳኑን ትንሽ ገልጦ አሸተተ። ቅመም… «በርበሬ!» «ሁለት ስሜቶች አንድ ላይ። ጎበዝ!»",
    },
    {
      en: "\"Why didn't you taste it?\" asked Anbessa. \"We only taste what a grown-up says is food,\" said Gugu. \"And berbere is HOT!\" Look, listen, sniff, taste and touch!",
      am: "«ለምን አልቀመስከውም?» አለ አንበሳ። «ትልቅ ሰው ምግብ ያለውን ብቻ ነው የምንቀምሰው» አለ ጉጉ። «በርበሬ ደግሞ ያቃጥላል!» እዩ፣ አዳምጡ፣ አሽትቱ፣ ቅመሱ፣ ዳስሱ!",
    },
    {
      en: "\"Animals use their senses too,\" said Lali. \"I smell flowers with my feelers! And Hawi's big ears can hear a mole-rat digging under the grass.\"",
      am: "«እንስሳትም ስሜቶቻቸውን ይጠቀማሉ» አለች ላሊ። «እኔ አበቦችን በአንቴናዎቼ አሸታለሁ! የሀዊ ትልልቅ ጆሮዎች ከሣሩ ሥር የሚቆፍር ፍልፈል ይሰማሉ።»",
    },
    {
      en: "Grandma untied the scarf. Anbessa blinked at the bright room and his smiling friends. \"My eyes are great, but I have five helpers!\" Look, listen, sniff, taste and touch!",
      am: "አያቴ ሻሹን ፈቱ። አንበሳ ብሩሁን ክፍልና ጓደኞቹን አየ። «ዓይኖቼ ድንቅ ናቸው፤ ግን አምስት ረዳቶች አሉኝ!» እዩ፣ አዳምጡ፣ አሽትቱ፣ ቅመሱ፣ ዳስሱ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Which sense helped Anbessa find each thing: the cow, the egg, the lemon? How did Gugu solve the closed pot?",
        "Why could Gugu not tell mango from banana while he held his nose? What does that tell us about smell and taste?",
      ],
      am: [
        "አንበሳ እያንዳንዱን ነገር ለማወቅ የረዳው የትኛው ስሜት ነበር፦ ላሚቱን፣ እንቁላሉን፣ ሎሚውን? ጉጉ የተዘጋውን ማሰሮ እንዴት ፈታው?",
        "ጉጉ አፍንጫውን ይዞ ሳለ ማንጎን ከሙዝ ለምን መለየት አቃተው? ይሄ ስለ ማሽተትና መቅመስ ምን ይነግረናል?",
      ],
    },
    activity: {
      en: "Play the blindfold game at home with safe things: a spoon, a cloth, an onion to smell, a bell or keys to shake, a slice of fruit to taste. Then try Gugu's test: hold your nose and taste two fruits. Can you tell them apart?",
      am: "በቤት ውስጥ ደህና በሆኑ ነገሮች የዓይን ሻሽ ጨዋታ ተጫወቱ፦ ማንኪያ፣ ጨርቅ፣ የሚሸተት ሽንኩርት፣ የሚነቀነቅ ቃጭል ወይም ቁልፎች፣ የሚቀመስ የፍራፍሬ ቁራጭ። ከዚያ የጉጉን ሙከራ ሞክሩ፦ አፍንጫችሁን ይዛችሁ ሁለት ፍራፍሬዎችን ቅመሱ። መለየት ትችላላችሁ?",
    },
  },
};

export default story;
