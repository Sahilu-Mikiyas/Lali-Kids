import type { Story } from "../../../stories";

/*
  "Where Are the Eyes?" (level 6: our food, crafts, music and inventions: injera and teff).
  Anbessa wants to make injera all by himself for Grandma's birthday. He mixes teff flour and
  water and pours it straight onto the hot mitad. The result is flat, heavy and has no "eyes",
  the little holes on top. Grandma explains: injera batter must rest for two or three days, with
  a little ersho (some batter saved from last time) to start the bubbles; it is ready when it
  smells sour and bubbles. Anbessa waits, checking the jar every day. On the third day he pours
  the batter in a spiral on the hot mitad, puts on the woven lid, and the eyes pop up all over.
  He lifts the first round off with Grandma's help, cooked on one side only.
  Join-in line: "Wait, wait, little bubbles: make the eyes!"

  Facts: injera is made from teff flour and water, fermented for about two or three days with
  ersho (a starter saved from the last batch); the batter is poured in a spiral onto a hot clay
  griddle (mitad), covered, and cooked on one side only; the bubbles make the holes called
  "eyes" (ayn). Teff grains are tiny and grow in the highlands. (The library story "The Biggest
  Injera" is about sharing; this one is about how injera is made.)

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ጠብቁ፣ ጠብቁ፣ ትንንሽ አረፋዎች፦ ዓይኖቹን ሥሩ!», «እርሾ», «ምጣድ» and «አክንባሎ».
*/
const story: Story = {
  id: "eyes-of-the-injera",
  course: "our-ethiopia",
  pack: "story",
  title: { en: "Where Are the Eyes?", am: "ዓይኖቹ የት ናቸው?" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#C9A24A",
  scene: "lib-eyes-of-the-injera",
  coverPage: 9,
  teaches: { words: ["teff", "flour", "batter", "wait", "bubble", "bake"], numbers: [1, 2, 3] },
  pages: [
    {
      en: 'It was nearly Grandma\'s birthday. "Can I make the injera for your birthday?" Anbessa asked. "All by myself! How hard can it be?" Grandma smiled. "You can try. I\'ll heat the mitad, and you stand back from the fire."',
      am: "የአያቴ ልደት ሊደርስ ነበር። «ለልደትሽ እንጀራውን እኔ ልጋግር?» ብሎ ጠየቀ አንበሳ። «ብቻዬን! ምን ያህል ይከብዳል?» አያቴ ፈገግ አለች። «መሞከር ትችላለህ። ምጣዱን እኔ አጋለዋለሁ፤ አንተ ከእሳቱ ራቅ በል።»",
    },
    {
      en: "He scooped teff flour from the sack, tiny as dust, and stirred in water until it was smooth and runny. Grandma helped him pour it straight onto the hot mitad. Sssss!",
      am: "እንደ አቧራ ጥቃቅን የሆነውን የጤፍ ዱቄት ከከረጢቱ ዛቀ፤ ለስላሳና ቀጭን እስኪሆን ድረስ ውሃ ጨምሮ አማሰለ። አያቴ አግዛው በቀጥታ በጋለው ምጣድ ላይ አፈሰሰው። ሽሽሽ!",
    },
    {
      en: "But something was wrong. The injera was flat and heavy, and it stuck to the mitad. And on top there were no holes at all. \"Where are the eyes?\" cried Anbessa.",
      am: "ግን የሆነ ነገር ልክ አልነበረም። እንጀራው ጠፍጣፋና ከባድ ሆነ፤ ምጣዱ ላይም ተጣበቀ። ከላዩ ላይ ደግሞ ምንም ቀዳዳ አልነበረም። «ዓይኖቹ የት ናቸው?» ብሎ ጮኸ አንበሳ።",
    },
    {
      en: 'Grandma laughed kindly. "Injera can\'t be hurried, little one. The batter must rest for two or three days, so the bubbles can grow. The bubbles make the eyes."',
      am: "አያቴ በደግነት ሳቀች። «እንጀራ አይቸኮልም ልጄ። ሊጡ አረፋው እንዲያድግ ለሁለት ወይም ለሦስት ቀናት ማረፍ አለበት። ዓይኖቹን የሚሠሩት አረፋዎቹ ናቸው።»",
    },
    {
      en: 'She showed him a little bowl of old, sour batter. "This is ersho, saved from my last injera. It wakes up the new batter." They mixed teff flour, water and a spoon of ersho in the big clay jar. Wait, wait, little bubbles: make the eyes!',
      am: "ከቀድሞው እንጀራዋ ያስቀመጠችውን ትንሽ ጎድጓዳ ሳህን የኮመጠጠ ሊጥ አሳየችው። «ይህ እርሾ ነው። አዲሱን ሊጥ ያነቃዋል።» የጤፍ ዱቄት፣ ውሃና አንድ ማንኪያ እርሾ በትልቁ የሸክላ እንስራ ውስጥ አደባለቁ። ጠብቁ፣ ጠብቁ፣ ትንንሽ አረፋዎች፦ ዓይኖቹን ሥሩ!",
    },
    {
      en: "Day one: Anbessa peeked into the jar. Nothing. Just flat, quiet batter. He put the cloth back on with a sigh.",
      am: "ቀን አንድ፦ አንበሳ ወደ እንስራው አጮልቆ አየ። ምንም የለም። ጠፍጣፋና ጸጥ ያለ ሊጥ ብቻ። በመተንፈስ ጨርቁን መልሶ አለበሰው።",
    },
    {
      en: "Day two: a few tiny bubbles had appeared on top, and it smelled a little sour. \"They're waking up!\" whispered Anbessa. Wait, wait, little bubbles: make the eyes!",
      am: "ቀን ሁለት፦ ከላዩ ላይ ጥቂት ትንንሽ አረፋዎች ታዩ፤ ትንሽ የኮመጠጠ ሽታም ነበረው። «እየነቁ ነው!» አለ አንበሳ በሹክሹክታ። ጠብቁ፣ ጠብቁ፣ ትንንሽ አረፋዎች፦ ዓይኖቹን ሥሩ!",
    },
    {
      en: "Day three, Grandma's birthday: the batter was bubbling and smelled just right. Grandma heated the big round mitad over the fire. \"Now, pour in a circle, from the outside in, round and round.\"",
      am: "ቀን ሦስት፣ የአያቴ ልደት፦ ሊጡ አረፋ እየሠራ ነበር፤ ልክ የሚገባውን ሽታም ነበረው። አያቴ ትልቁን ክብ ምጣድ በእሳቱ ላይ አጋለችው። «አሁን ከውጭ ወደ ውስጥ፣ ዙሪያውን፣ ዙሪያውን በክብ አፍስስ።»",
    },
    {
      en: "With Grandma beside him, Anbessa poured carefully, round and round, in a spiral. Then Grandma put on the woven lid. They waited, and listened to the soft hiss.",
      am: "አያቴ አጠገቡ ሆና አንበሳ በጥንቃቄ ዙሪያውን፣ ዙሪያውን በጥቅልል አፈሰሰ። ከዚያ አያቴ የተሠራውን አክንባሎ ከደነችበት። ጠበቁ፤ ለስላሳውን ሽሽታም አዳመጡ።",
    },
    {
      en: "Grandma lifted the lid. Steam puffed up, and there it was: a big round injera, covered all over with hundreds of tiny holes. \"The eyes!\" shouted Anbessa. \"It's looking at me!\"",
      am: "አያቴ ክዳኑን አነሣች። እንፋሎት ወደ ላይ ተነሣ፤ እዚያም ነበር፦ በመቶዎች በሚቆጠሩ ትንንሽ ቀዳዳዎች ሙሉ በሙሉ የተሸፈነ ትልቅ ክብ እንጀራ። «ዓይኖቹ!» ብሎ ጮኸ አንበሳ። «እያየኝ ነው!»",
    },
    {
      en: '"Injera only cooks on one side," said Grandma, lifting it off with a flat basket. "The bottom is smooth, and the top has the eyes." Anbessa saved a spoon of the batter in a little bowl. "Ersho, for next time!"',
      am: "«እንጀራ የሚበስለው በአንድ በኩል ብቻ ነው» አለች አያቴ በሰፌድ እያነሣች። «ታቹ ለስላሳ ነው፤ ላዩ ደግሞ ዓይኖች አሉት።» አንበሳ አንድ ማንኪያ ሊጥ በትንሽ ሳህን አስቀመጠ። «እርሾ፣ ለሚቀጥለው ጊዜ!»",
    },
    {
      en: 'At the birthday meal, everyone ate from Anbessa\'s injera. "It\'s the best injera ever," said Grandma, "because you waited." Anbessa grinned. Wait, wait, little bubbles: make the eyes!',
      am: "በልደቱ ማዕድ ሁሉም ከአንበሳ እንጀራ በላ። «እስከ ዛሬ ከበላሁት ሁሉ የሚበልጥ እንጀራ ነው» አለች አያቴ፤ «ስለጠበቅህ።» አንበሳ ፈገግ አለ። ጠብቁ፣ ጠብቁ፣ ትንንሽ አረፋዎች፦ ዓይኖቹን ሥሩ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why did Anbessa's first injera have no eyes? What do the bubbles need?",
        "What else in our kitchen needs time and waiting (bread rising, yoghurt, a stew cooking slowly)?",
      ],
      am: [
        "የአንበሳ የመጀመሪያ እንጀራ ለምን ዓይን አልነበረውም? አረፋዎቹ ምን ያስፈልጋቸዋል?",
        "በወጥ ቤታችን ውስጥ ጊዜና መጠበቅ የሚያስፈልገው ሌላ ምን አለ (የሚኩፋ ሊጥ፣ እርጎ፣ ቀስ ብሎ የሚበስል ወጥ)?",
      ],
    },
    activity: {
      en: "Watch fermentation: next time injera batter is made at home, look at it each day and draw what you see (flat, a few bubbles, lots of bubbles). Then look closely at a piece of injera: count the eyes in a small square.",
      am: "መብላላትን ተመልከቱ፦ በሚቀጥለው ጊዜ በቤት የእንጀራ ሊጥ ሲቦካ በየቀኑ ተመልከቱትና ያያችሁትን ሣሉ (ጠፍጣፋ፣ ጥቂት አረፋዎች፣ ብዙ አረፋዎች)። ከዚያ አንድ ቁራጭ እንጀራ በቅርበት ተመልከቱ፦ በትንሽ ካሬ ውስጥ ያሉትን ዓይኖች ቁጠሩ።",
    },
  },
};

export default story;
