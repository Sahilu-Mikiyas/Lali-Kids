import type { Story } from "../../../stories";

/*
  "Ayan's Lemon Tree" (level 4: patience and steady work).
  Ayan plants a lemon seed in a tin by the door and wants a tree NOW. Nothing happens. She digs it
  up to check (oops) and plants it again. Hooyo says plants grow while we wait. Ayan waters it
  every morning, even in the hot dry days when she would rather play, shades it with a cloth,
  and Abdi fences it from the chickens. A sprout, leaves, a little tree in the yard, and at
  last, a year later, lemons: lemonade for the whole street.
  Join-in line: "Water it, wait, and see!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ውሃ ማጠጣት፣ መጠበቅ፣ ማየት!» and «ሎሚ» / «ሎሚናት» for lemon / lemonade, and «አቦ» for the Somali Aabo (father).
*/
const story: Story = {
  id: "ayans-lemon-tree",
  course: "values-character",
  pack: "story",
  title: { en: "Ayan's Lemon Tree", am: "የአያን የሎሚ ዛፍ" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#9AB82E",
  scene: "lib-ayans-lemon-tree",
  coverPage: 10,
  teaches: { words: ["patience", "seed", "grow", "water", "wait"] },
  pages: [
    {
      en: 'Hooyo squeezed a lemon for lunch, and a little seed fell out. "Can I plant it?" asked Ayan. "Then we\'ll have our very own lemon tree!"',
      am: "ሁዮ ለምሳ ሎሚ ጨመቀች፤ አንዲት ትንሽ ፍሬ ወደቀች። «ልተክላት እችላለሁ?» ብላ ጠየቀች አያን። «ያኔ የራሳችን የሎሚ ዛፍ ይኖረናል!»",
    },
    {
      en: "Ayan filled an old tin with soil, poked a hole with her finger, dropped in the seed, and covered it up. She gave it a drink. Then she sat down to watch it grow.",
      am: "አያን አንድ አሮጌ ቆርቆሮ በአፈር ሞላች፤ በጣቷ ጉድጓድ ቆፍራ ፍሬውን ጨመረችና ሸፈነችው። ውሃ አጠጣችው። ከዚያ ሲያድግ ለማየት ተቀመጠች።",
    },
    {
      en: "She watched. And watched. Nothing happened. \"Grow!\" she told the tin. Nothing. \"Pleeease grow!\" Still nothing.",
      am: "ተመለከተች። ተመለከተች። ምንም አልሆነም። «እደግ!» አለችው ቆርቆሮውን። ምንም። «እባክህ እደግ!» አሁንም ምንም።",
    },
    {
      en: "The next morning there was still nothing. Ayan couldn't wait. She dug with her finger to see if the seed was doing anything. There it was, just sitting in the soil.",
      am: "በማግስቱ ጠዋትም ምንም አልነበረም። አያን መታገሥ አልቻለችም። ፍሬው የሆነ ነገር እያደረገ እንደሆነ ለማየት በጣቷ ቆፈረች። እዚያ አፈሩ ውስጥ ዝም ብሎ ተቀምጦ ነበር።",
    },
    {
      en: '"Seeds grow in the dark, while we wait," said Hooyo gently. "If you dig it up, it has to start again. Water it, wait, and see!" Ayan covered it up and said sorry to the seed.',
      am: "«ፍሬ የሚያድገው እኛ ስንጠብቅ በጨለማ ውስጥ ነው» አለች ሁዮ በለስላሳ ድምፅ። «ከቆፈርሽው እንደገና መጀመር አለበት። ውሃ ማጠጣት፣ መጠበቅ፣ ማየት!» አያን መልሳ ሸፈነችውና ፍሬውን ይቅርታ ጠየቀችው።",
    },
    {
      en: "So every morning, before anything else, Ayan gave her seed a cup of water. Day after day after day. Water it, wait, and see!",
      am: "ስለዚህ በየጠዋቱ ከምንም ነገር በፊት አያን ለፍሬዋ አንድ ኩባያ ውሃ ታጠጣ ነበር። ቀን ከቀን ከቀን። ውሃ ማጠጣት፣ መጠበቅ፣ ማየት!",
    },
    {
      en: "Then one morning, there it was: a tiny green sprout with two round leaves, like a baby waving hello. \"Hooyo! HOOYO! It's alive!\"",
      am: "ከዚያ አንድ ቀን ጠዋት፣ እነሆ፦ ሁለት ክብ ቅጠሎች ያሏት ትንሽ አረንጓዴ ቡቃያ፤ እጁን እያውለበለበ ሰላም እንደሚል ሕፃን። «ሁዮ! ሁዮ! ሕያው ነው!»",
    },
    {
      en: "The hot dry days came. Ayan's friends called her to play, but first she carried water, and hung a cloth to shade her plant from the burning sun.",
      am: "ሞቃታማና ደረቅ ቀናት መጡ። ጓደኞቿ ለጨዋታ ጠሯት፤ እሷ ግን መጀመሪያ ውሃ ተሸከመች፤ ተክሏን ከሚያቃጥለው ፀሐይ ለመከለል ጨርቅም ሰቀለች።",
    },
    {
      en: "The little plant grew too big for its tin. Her papa, Aabo, helped Ayan plant it in the yard. Abdi made a fence of sticks so the chickens wouldn't peck it.",
      am: "ትንሹ ተክል ለቆርቆሮው በጣም ተለቀ። አባቷ አቦ አያን በግቢው እንድትተክለው ረዳት። አብዲ ዶሮዎቹ እንዳይቆነጥሩት በእንጨት አጠረለት።",
    },
    {
      en: "A whole year went round: rainy days, sunny days, Eid, and Eid again. The plant became a little tree. Then one bright morning, Ayan saw something white: flowers!",
      am: "አንድ ሙሉ ዓመት ዞረ፦ ዝናባማ ቀናት፣ ፀሐያማ ቀናት፣ ዒድ፣ ደግሞም ዒድ። ተክሉ ትንሽ ዛፍ ሆነ። ከዚያ አንድ ብሩህ ጠዋት አያን ነጭ ነገር አየች፦ አበባ!",
    },
    {
      en: "The flowers became tiny green balls, and the green balls grew fat and yellow. Lemons! Real lemons, on Ayan's very own tree.",
      am: "አበቦቹ ትንንሽ አረንጓዴ ኳሶች ሆኑ፤ አረንጓዴዎቹ ኳሶች ደግሞ ወፍረው ቢጫ ሆኑ። ሎሚ! እውነተኛ ሎሚ፣ በአያን የራሷ ዛፍ ላይ።",
    },
    {
      en: 'Ayan made lemonade for the whole street: Grandma, Gugu, Tsehay, Hawi and Haben. "How did you grow it?" asked Gugu. Ayan smiled. "Water it, wait, and see!"',
      am: "አያን ለመንገዱ ሰው ሁሉ ሎሚናት አዘጋጀች፦ ለአያቴ፣ ለጉጉ፣ ለፀሐይ፣ ለሀዊና ለሐበን። «እንዴት አሳደግሽው?» ብሎ ጠየቀ ጉጉ። አያን ፈገግ አለች። «ውሃ ማጠጣት፣ መጠበቅ፣ ማየት!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why did Ayan dig up the seed? What did she learn about waiting?",
        "What are you waiting for right now? What can you do every day while you wait?",
      ],
      am: [
        "አያን ፍሬውን ለምን ቆፈረችው? ስለ መጠበቅ ምን ተማረች?",
        "አሁን እየጠበቃችሁት ያለው ነገር ምንድን ነው? እየጠበቃችሁ በየቀኑ ምን ማድረግ ትችላላችሁ?",
      ],
    },
    activity: {
      en: "Plant a seed together (a bean grows fast; a lemon or orange seed slowly). Give the child the daily job of watering it, and mark each day on a paper calendar until the first sprout appears.",
      am: "አብራችሁ አንድ ፍሬ ትከሉ (ባቄላ ቶሎ ያድጋል፤ የሎሚ ወይም የብርቱካን ፍሬ ቀስ ብሎ)። ልጁ በየቀኑ ውሃ የማጠጣት ሥራ ይኑረው፤ የመጀመሪያዋ ቡቃያ እስክትታይ ድረስ በወረቀት ቀን መቁጠሪያ ላይ እያንዳንዱን ቀን ምልክት አድርጉ።",
    },
  },
};

export default story;
