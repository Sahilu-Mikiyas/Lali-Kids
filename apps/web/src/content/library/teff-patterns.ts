import type { Story } from "../stories";

/*
  "The Teff Harvest Patterns": harvest time on Grandma's hillside. Patterns everywhere:
  rows of teff (tall, short), bundles (big, small), the oxen's hooves and a clapping game,
  Grandma's basket weave (red, yellow) and Tsehay's (red, red, yellow), Anbessa's
  pattern with a mistake to spot, sorting grain and things into groups, Lali's sky dance
  (up, down, loop), and a row of friends at supper that a bee comes to break.
  The repeated line to join in on: "What comes next? Look, and guess!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the repeated line «ቀጥሎ ምን ይመጣል? ተመልከቱና ገምቱ!», «ስርዓተ ጥለት» for pattern, and the
  words for threshing (ማበራየት) and the threshing floor (አውድማ).
*/
const story: Story = {
  id: "teff-patterns",
  pack: "numbers",
  // In the numbers-counting learning package (docs/PACKAGES.md): opens only through the course.
  course: "numbers-counting",
  title: { en: "The Teff Harvest Patterns", am: "የጤፍ አዝመራ ጥለቶች" },
  category: "Maths",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#B8892A",
  scene: "lib-teff-patterns",
  coverPage: 4,
  teaches: { words: ["pattern", "next", "repeat", "sort", "group", "same", "different"], numbers: [2, 3] },
  pages: [
    {
      en: 'Harvest time! The teff stood golden on the hillside, in long rows: tall, short, tall, short. Grandma smiled. "Patterns are everywhere, if you look."',
      am: "የአዝመራ ጊዜ! ጤፉ በኮረብታው ላይ ወርቃማ ሆኖ በረጃጅም መስመሮች ቆሞ ነበር፦ ረጅም፣ አጭር፣ ረጅም፣ አጭር። አያት ፈገግ አለች። «ካስተዋላችሁ ጥለቶች በየቦታው አሉ።»",
    },
    {
      en: 'Anbessa and Tsehay tied the teff in bundles: big, small, big, small, big… "What comes next? Look, and guess!" "Small!"',
      am: "አንበሳና ፀሐይ ጤፉን በነዶ አሰሩ፦ ትልቅ፣ ትንሽ፣ ትልቅ፣ ትንሽ፣ ትልቅ… «ቀጥሎ ምን ይመጣል? ተመልከቱና ገምቱ!» «ትንሽ!»",
    },
    {
      en: "On the threshing floor, the oxen walked round and round. Their hooves went clip, clop, clip, clop, and everyone joined in: clap, stamp, clap, stamp!",
      am: "በአውድማው ላይ በሬዎቹ ዙሪያውን ዞሩ። ሰኮናቸው ኳ፣ ኳ፣ ኳ፣ ኳ አለ፤ ሁሉም ተቀላቀሉ፦ አጨብጭብ፣ እርገጥ፣ አጨብጭብ፣ እርገጥ!",
    },
    {
      en: 'Then Grandma sorted the grain into two baskets: white teff here, red teff there. "Sorting means putting the same things together," she said.',
      am: "ከዚያ አያት እህሉን በሁለት ቅርጫቶች ለየች፦ ነጭ ጤፍ እዚህ፣ ቀይ ጤፍ እዚያ። «መለየት ማለት አንድ ዓይነት ነገሮችን አንድ ላይ ማድረግ ነው» አለች።",
    },
    {
      en: 'Grandma began to weave a basket: red, yellow, red, yellow, red… "What comes next? Look, and guess!" "Yellow!" shouted Anbessa.',
      am: "አያት ቅርጫት መሥራት ጀመረች፦ ቀይ፣ ቢጫ፣ ቀይ፣ ቢጫ፣ ቀይ… «ቀጥሎ ምን ይመጣል? ተመልከቱና ገምቱ!» «ቢጫ!» ብሎ ጮኸ አንበሳ።",
    },
    {
      en: 'Shy Tsehay made her own pattern: red, red, yellow, red, red, yellow. "What comes next?" she whispered. "Red!" buzzed Lali, and Tsehay smiled.',
      am: "ዓይናፋሯ ፀሐይ የራሷን ጥለት ሠራች፦ ቀይ፣ ቀይ፣ ቢጫ፣ ቀይ፣ ቀይ፣ ቢጫ። «ቀጥሎ ምን ይመጣል?» አለች በሹክሹክታ። «ቀይ!» አለች ላሊ፤ ፀሐይም ፈገግ አለች።",
    },
    {
      en: 'Anbessa wanted a turn. Red, yellow, red, yellow… GREEN! "Oops!" he giggled. "That green one doesn\'t belong." He pulled it out and fixed his pattern.',
      am: "አንበሳ ተራ ፈለገ። ቀይ፣ ቢጫ፣ ቀይ፣ ቢጫ… አረንጓዴ! «ውይ!» ብሎ ሳቀ። «ያ አረንጓዴ እዚህ አይገባም።» አውጥቶ ጥለቱን አስተካከለ።",
    },
    {
      en: 'Gugu sorted the things at the edge of the field: stones in one pile, sticks in another, flowers in a third. "Three groups!" he counted.',
      am: "ጉጉ በማሳው ዳር ያሉትን ነገሮች ለየ፦ ድንጋዮች በአንድ ክምር፣ እንጨቶች በሌላ፣ አበቦች በሦስተኛው። «ሦስት ቡድኖች!» ብሎ ቆጠረ።",
    },
    {
      en: 'Lali danced a pattern in the sky: up, down, loop! Up, down, loop! "What comes next? Look, and guess!" Everyone shouted, "UP!"',
      am: "ላሊ በሰማይ ላይ ጥለት ደነሰች፦ ወደ ላይ፣ ወደ ታች፣ ዙር! ወደ ላይ፣ ወደ ታች፣ ዙር! «ቀጥሎ ምን ይመጣል? ተመልከቱና ገምቱ!» ሁሉም «ወደ ላይ!» ብለው ጮኹ።",
    },
    {
      en: "Oh no! A flock of birds swooped down for the grain. Everyone made a pattern of noise: clap, clap, STAMP! Clap, clap, STAMP! Whoosh, away they flew.",
      am: "ወይ ጉድ! የወፎች መንጋ እህሉን ለመብላት ወረደ። ሁሉም የድምፅ ጥለት ሠሩ፦ አጨብጭብ፣ አጨብጭብ፣ እርገጥ! አጨብጭብ፣ አጨብጭብ፣ እርገጥ! ሽው፣ ወፎቹ በረሩ።",
    },
    {
      en: 'At last the basket was finished: red, yellow, red, yellow, all the way round. Grandma filled it with teff. "Our harvest basket," she said proudly.',
      am: "በመጨረሻ ቅርጫቱ አለቀ፦ ቀይ፣ ቢጫ፣ ቀይ፣ ቢጫ፣ ዙሪያውን በሙሉ። አያት በጤፍ ሞላችው። «የአዝመራችን ቅርጫት» አለች በኩራት።",
    },
    {
      en: "At supper the friends sat in a row: lion, gelada, lion, gelada… So what comes next? Not a lion at all! Lali buzzed in for a bite.",
      am: "በእራት ጊዜ ጓደኞቹ በመስመር ተቀመጡ፦ አንበሳ፣ ጭላዳ፣ አንበሳ፣ ጭላዳ… ታዲያ ቀጥሎ ምን ይመጣል? አንበሳ አልመጣም! ላሊ ጉርሻ ለመቅመስ በራ መጣች።",
    },
    {
      en: 'Then the stars came out: big, small, big, small. "What comes next?" yawned Anbessa. Grandma kissed his head. "Tomorrow!"',
      am: "ከዚያ ከዋክብት ወጡ፦ ትልቅ፣ ትንሽ፣ ትልቅ፣ ትንሽ። «ቀጥሎ ምን ይመጣል?» አለ አንበሳ እያዛጋ። አያቱ ራሱን ሳመችው። «ነገ!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Anbessa's pattern went red, yellow, red, yellow, green. Which one didn't belong, and how did you know?",
        "What patterns can you find around you right now: on clothes, a basket, a wall or a song?",
      ],
      am: [
        "የአንበሳ ጥለት ቀይ፣ ቢጫ፣ ቀይ፣ ቢጫ፣ አረንጓዴ ነበር። የትኛው አይገባም ነበር? እንዴት አወቃችሁ?",
        "አሁን በአጠገባችሁ ምን ጥለቶች ታገኛላችሁ፦ በልብስ፣ በቅርጫት፣ በግድግዳ ወይም በዘፈን ላይ?",
      ],
    },
    activity: {
      en: "Make a pattern with beans, buttons or bottle tops (red, yellow, red, yellow) and let your child say what comes next. Then hide a mistake for them to find, and take turns making up clapping patterns: clap, clap, stamp!",
      am: "በባቄላ፣ በቁልፍ ወይም በጠርሙስ ክዳን ጥለት ሥሩ (ቀይ፣ ቢጫ፣ ቀይ፣ ቢጫ)፤ ልጅዎ ቀጥሎ ምን እንደሚመጣ ይናገር። ከዚያ እንዲያገኘው አንድ ስህተት ደብቁ፤ በተራም የጭብጨባ ጥለቶችን ፍጠሩ፦ አጨብጭብ፣ አጨብጭብ፣ እርገጥ!",
    },
  },
};

export default story;
