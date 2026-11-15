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
      en: 'Anbessa woke up and sniffed. "Grandma is roasting coffee!" He ran to the kitchen, and there she was, shaking the beans over the fire. "How did you know before you saw it?" she asked. Anbessa tapped his nose.',
      am: "አንበሳ ከእንቅልፉ ነቅቶ አሸተተ። «አያቴ ቡና እየቆሉ ነው!» ወደ ማድ ቤቱ ሮጠ፤ እዚያም ከእሳቱ በላይ ፍሬዎቹን እያንቀሳቀሱ ነበሩ። «ሳታየው እንዴት አወቅህ?» ብለው ጠየቁ። አንበሳ አፍንጫውን መታ መታ አደረገ።",
    },
    {
      en: '"Let\'s play a game," said Grandma, and she tied a soft scarf over his eyes. Anbessa wobbled. "But without my eyes, I won\'t know anything!" Gugu giggled. "Let\'s find out."',
      am: "«እስቲ እንጫወት» አሉ አያቴ፤ በዓይኖቹም ላይ ለስላሳ ሻሽ አሰሩለት። አንበሳ ተንገዳገደ። «ያለ ዓይኖቼ ግን ምንም አላውቅም!» ጉጉ ተንከተከተ። «እስቲ እንሞክር።»",
    },
    {
      en: '"Listen," said Grandma. Outside, something went "Mooooo!" "That\'s the cow!" said Anbessa. Then the coffee beans went crackle, pop. "And the beans are popping!" His ears could tell. Look, listen, sniff, taste and touch!',
      am: "«አዳምጥ» አሉ አያቴ። ውጭ የሆነ ነገር «ሙውው!» አለ። «ላሚቱ ናት!» አለ አንበሳ። ከዚያ የቡናው ፍሬዎች ቻ፣ ቋ አሉ። «ፍሬዎቹም እየፈነዱ ነው!» ጆሮዎቹ ለዩት። እዩ፣ አዳምጡ፣ አሽትቱ፣ ቅመሱ፣ ዳስሱ!",
    },
    {
      en: 'Grandma put something in his paw. It was smooth and hard and cool, round at both ends, and fatter at one end. "An egg!" said Anbessa. The skin on his paw could feel its shape, and how warm or cool it was.',
      am: "አያቴ የሆነ ነገር በእጁ ላይ አስቀመጡ። ለስላሳ፣ ጠንካራና ቀዝቃዛ ነበር፤ ሁለቱም ጫፎቹ ክብ ናቸው፤ አንዱ ጫፍ ወፈር ይላል። «እንቁላል!» አለ አንበሳ። የእጁ ቆዳ ቅርጹን፣ ሞቃትም ይሁን ቀዝቃዛ መሆኑን ሊሰማው ቻለ።",
    },
    {
      en: 'Next Grandma held something under his nose. Sniff, sniff. "Fresh and sharp… lemon!" Then she gave him a tiny taste. Sour! He scrunched up his face. Then a taste of something soft and sweet. "Banana!" Look, listen, sniff, taste and touch!',
      am: "ቀጥሎ አያቴ የሆነ ነገር በአፍንጫው ሥር ያዙ። ሽት፣ ሽት። «ትኩስና የሚያቃጥል… ሎሚ!» ከዚያ ትንሽ እንዲቀምሰው ሰጡት። ኮምጣጣ! ፊቱን ኮሰኮሰ። ከዚያ ለስላሳና ጣፋጭ የሆነ ነገር ቀመሰ። «ሙዝ!» እዩ፣ አዳምጡ፣ አሽትቱ፣ ቅመሱ፣ ዳስሱ!",
    },
    {
      en: 'Now Gugu wanted a turn. He held his nose tight and Grandma gave him a bite of mango, then a bite of banana. "They taste… the same. Just sweet!" Then he let go of his nose. "Oh! MANGO!" "Your nose helps you taste," said Grandma.',
      am: "አሁን ጉጉ ተራውን ፈለገ። አፍንጫውን አጥብቆ ያዘ፤ አያቴም ትንሽ ማንጎ፣ ከዚያ ትንሽ ሙዝ ሰጡት። «አንድ ዓይነት… ይጣፍጣሉ። ጣፋጭ ብቻ!» ከዚያ አፍንጫውን ለቀቀ። «ኦ! ማንጎ!» «አፍንጫህ እንድትቀምስ ይረዳሃል» አሉ አያቴ።",
    },
    {
      en: 'Bzzz! Lali flew in. "You have five helpers! Eyes to see, ears to hear, a nose to smell, a tongue to taste and skin to touch. They all send messages to your brain, and your brain works out what\'s there."',
      am: "ቡዝዝ! ላሊ በርራ ገባች። «አምስት ረዳቶች አሏችሁ! ለማየት ዓይኖች፣ ለመስማት ጆሮዎች፣ ለማሽተት አፍንጫ፣ ለመቅመስ ምላስ፣ ለመዳሰስ ቆዳ። ሁሉም ወደ አንጎላችሁ መልእክት ይልካሉ፤ አንጎላችሁም እዚያ ያለውን ይደርስበታል።»",
    },
    {
      en: 'Then Grandma set down a little clay pot with a lid on. "Last puzzle. What\'s inside? No looking, and no touching!" Gugu frowned. How could he find out?',
      am: "ከዚያ አያቴ ክዳን ያላት ትንሽ የሸክላ ማሰሮ አስቀመጡ። «የመጨረሻው እንቆቅልሽ። ውስጡ ምን አለ? ማየትም መንካትም የለም!» ጉጉ ፊቱን አጨፈገገ። እንዴት ሊያውቅ ይችላል?",
    },
    {
      en: 'Gugu shook the pot by his ear. Rattle, rattle. "Something small and hard. Beans? Lentils?" Then he lifted the lid a crack and sniffed. Hot and spicy… "Berbere! It\'s red pepper powder!" "Two senses together," laughed Grandma. "Clever!"',
      am: "ጉጉ ማሰሮውን በጆሮው አጠገብ ነቀነቀው። ኳ፣ ኳ። «ትንሽና ጠንካራ ነገር። ባቄላ? ምስር?» ከዚያ ክዳኑን ትንሽ ገልጦ አሸተተ። የሚያቃጥልና ቅመም ያለው… «በርበሬ! የበርበሬ ዱቄት ነው!» «ሁለት ስሜቶች አንድ ላይ» ብለው ሳቁ አያቴ። «ጎበዝ!»",
    },
    {
      en: '"Why didn\'t you taste it?" asked Anbessa. "Because we only taste things a grown-up says are food," said Gugu. "And berbere on its own is HOT!" Look, listen, sniff, taste and touch!',
      am: "«ለምን አልቀመስከውም?» ብሎ ጠየቀ አንበሳ። «ምክንያቱም ትልቅ ሰው ምግብ ነው ያለውን ብቻ ነው የምንቀምሰው» አለ ጉጉ። «በርበሬ ብቻውን ደግሞ ያቃጥላል!» እዩ፣ አዳምጡ፣ አሽትቱ፣ ቅመሱ፣ ዳስሱ!",
    },
    {
      en: '"Animals use their senses too," said Lali. "I smell flowers with my feelers! And Hawi\'s big ears can hear a mole-rat digging under the grass." Anbessa wiggled his ears. Could he hear the coffee bubbling now?',
      am: "«እንስሳትም ስሜቶቻቸውን ይጠቀማሉ» አለች ላሊ። «እኔ አበቦችን በአንቴናዎቼ አሸታለሁ! የሀዊ ትልልቅ ጆሮዎች ደግሞ ከሣሩ ሥር የሚቆፍር ፍልፈል ይሰማሉ።» አንበሳ ጆሮዎቹን አንቀሳቀሰ። አሁን ቡናው ሲፈላ ይሰማው ይሆን?",
    },
    {
      en: 'Grandma untied the scarf. Anbessa blinked at the bright room, the steaming jebena and his smiling friends. "My eyes are great," he said, "but I have five helpers!" And they all sang, "Look, listen, sniff, taste and touch!"',
      am: "አያቴ ሻሹን ፈቱለት። አንበሳ ብሩሁን ክፍል፣ የሚተነፍሰውን ጀበና፣ ፈገግ የሚሉትን ጓደኞቹንም እያየ ዓይኖቹን አርገበገበ። «ዓይኖቼ ድንቅ ናቸው» አለ፤ «ግን አምስት ረዳቶች አሉኝ!» ሁሉም አብረው ዘመሩ፦ «እዩ፣ አዳምጡ፣ አሽትቱ፣ ቅመሱ፣ ዳስሱ!»",
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
