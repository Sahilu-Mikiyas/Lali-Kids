import type { Story } from "../../../stories";

/*
  "Grandma's Lost Needle" (level 6: magnets). Grandma, mending a netela outside, drops her sewing
  needle in the grass. Tsehay has a magnet from an old radio. What does it stick to? They test: the
  scissors, a nail, a steel bottle top, a pin: click! Wood, cloth, plastic, paper, glass: no. Even some
  metals don't stick: the light aluminium pot doesn't. Magnets pull things made of iron or steel. The
  magnet pulls a paper clip through paper and cloth, without touching. Two magnets: one way they
  snap together, turned round they push apart. A magnetised needle on a floating leaf turns to point
  north: a compass; the Earth itself is like a giant magnet. The problem: the needle is lost in the
  grass; Tsehay works it out: sweep the magnet over the grass. Click! Found.
  Join-in line: "Click! Will it stick? Let's find out quick!"

  Science (kept simple and true): magnets attract iron and steel (and nickel, cobalt), not
  aluminium, copper, wood, plastic, glass or paper; magnetism passes through paper and cloth; like
  poles repel and unlike attract; a freely turning magnet lines up north-south because the Earth acts
  like a magnet. Grown-ups handle the needle; small magnets must never be swallowed.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ቅጭ! ይጣበቃል? እስቲ በፍጥነት እንወቅ!», «ማግኔት» and «ኮምፓስ».
*/
const story: Story = {
  id: "grandmas-lost-needle",
  course: "science-nature",
  pack: "story",
  title: { en: "Grandma's Lost Needle", am: "የአያቴ የጠፋ መርፌ" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#C2363A",
  scene: "lib-grandmas-lost-needle",
  coverPage: 10,
  teaches: { words: ["magnet", "iron", "steel", "pull", "push", "north"] },
  pages: [
    {
      en: "Grandma was mending her netela in the yard. Oops! Her needle slipped and fell into the long grass. \"Oh dear. I'll never find it in there.\"",
      am: "አያቴ በግቢው ነጠላቸውን እየሰፉ ነበር። ውይ! መርፌያቸው አምልጦ ረጅሙ ሣር ውስጥ ወደቀ። «ወይኔ። እዚያ ውስጥ አላገኘውም።»",
    },
    {
      en: "Tsehay had a magnet from an old radio. \"Maybe it can help!\" But first she wanted to know: what does a magnet stick to? Click! Will it stick? Let's find out quick!",
      am: "ፀሐይ ከአሮጌ ሬዲዮ የወጣ ማግኔት ነበራት። «ምናልባት ይረዳል!» መጀመሪያ ግን ማወቅ ፈለገች፦ ማግኔት ምን ይይዛል? ቅጭ! ይጣበቃል? እስቲ በፍጥነት እንወቅ!",
    },
    {
      en: "The scissors: click! A nail: click! A bottle top: click! A pin: click! Then the wooden spoon: nothing. The netela, a plastic cup, paper, a glass: nothing.",
      am: "መቀሱ፦ ቅጭ! ሚስማር፦ ቅጭ! የጠርሙስ ክዳን፦ ቅጭ! ፒን፦ ቅጭ! ከዚያ የእንጨት ማንኪያ፦ ምንም። ነጠላው፣ የፕላስቲክ ኩባያ፣ ወረቀት፣ ብርጭቆ፦ ምንም።",
    },
    {
      en: "\"So it sticks to metal!\" guessed Tsehay. Then she tried Grandma's light, shiny pot. Nothing! \"Not every metal,\" said Grandma. \"That pot is aluminium.\"",
      am: "«ስለዚህ ብረት ይይዛል!» ገመተች ፀሐይ። ከዚያ የአያቴን ቀላልና የሚያብረቀርቅ ድስት ሞከረች። ምንም! «ሁሉንም ብረት አይደለም» አሉ አያቴ። «ያ ድስት አሉሚኒየም ነው።»",
    },
    {
      en: "\"Magnets pull things made of iron or steel,\" said Grandma. \"Scissors, nails, pins and needles are steel.\" Click! Will it stick? Let's find out quick!",
      am: "«ማግኔት ከብረት ወይም ከአረብ ብረት የተሠሩ ነገሮችን ይስባል» አሉ አያቴ። «መቀስ፣ ሚስማር፣ ፒንና መርፌ አረብ ብረት ናቸው።» ቅጭ! ይጣበቃል? እስቲ በፍጥነት እንወቅ!",
    },
    {
      en: "Tsehay put a paper clip on a sheet of paper and moved the magnet underneath. The clip slid along by itself! \"It pulls through paper, without touching!\"",
      am: "ፀሐይ የወረቀት ማያያዣ በወረቀት ላይ አድርጋ ማግኔቱን ከሥር አንቀሳቀሰች። ማያያዣው በራሱ ተንሸራተተ! «ሳይነካ በወረቀት ውስጥ ይስባል!»",
    },
    {
      en: "Gugu brought a second magnet. One way, the two snapped together. Turned round, they pushed apart! \"Magnets can pull, and they can push.\"",
      am: "ጉጉ ሁለተኛ ማግኔት አመጣ። በአንድ በኩል ሁለቱ ተጣበቁ። ሲገለበጥ ተገፋፉ! «ማግኔቶች ይስባሉም፣ ይገፋሉም።»",
    },
    {
      en: "Grandma stroked a pin with the magnet and laid it on a leaf floating in a bowl of water. The leaf turned slowly, until the pin pointed north. \"A compass!\"",
      am: "አያቴ ፒንን በማግኔቱ አሻሹና በሳህን ውሃ ላይ በሚንሳፈፍ ቅጠል ላይ አደረጉት። ቅጠሉ ቀስ ብሎ ዞሮ ፒኑ ወደ ሰሜን አመለከተ። «ኮምፓስ!»",
    },
    {
      en: "\"The Earth is like a giant magnet,\" said Grandma. \"Travellers use compasses to find their way.\" Click! Will it stick? Let's find out quick!",
      am: "«ምድር እንደ ግዙፍ ማግኔት ናት» አሉ አያቴ። «መንገደኞች መንገዳቸውን ለማግኘት ኮምፓስ ይጠቀማሉ።» ቅጭ! ይጣበቃል? እስቲ በፍጥነት እንወቅ!",
    },
    {
      en: "\"Now, the needle!\" Tsehay looked at the long grass. Hands could get pricked. Then she thought: \"The needle is steel. The magnet pulls steel!\"",
      am: "«አሁን መርፌው!» ፀሐይ ረጅሙን ሣር ተመለከተች። እጅ ሊወጋ ይችላል። ከዚያ አሰበች፦ «መርፌው አረብ ብረት ነው። ማግኔቱ አረብ ብረት ይስባል!»",
    },
    {
      en: "She swept the magnet slowly over the grass, back and forth, back and forth… Click! There was the needle, hanging from the magnet!",
      am: "ማግኔቱን በሣሩ ላይ ቀስ ብላ ወዲያና ወዲህ አንቀሳቀሰች… ቅጭ! መርፌው ከማግኔቱ ተንጠልጥሎ ነበር!",
    },
    {
      en: "Grandma clapped and kissed her. Now Tsehay keeps the magnet in Grandma's sewing basket, just in case. \"Click! Will it stick? Let's find out quick!\"",
      am: "አያቴ አጨብጭበው ሳሟት። አሁን ፀሐይ ማግኔቱን በአያቴ የስፌት ቅርጫት ታስቀምጠዋለች፤ ለማንኛውም። «ቅጭ! ይጣበቃል? እስቲ በፍጥነት እንወቅ!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Which things stuck to Tsehay's magnet, and which didn't? Did every metal stick?", "How did Tsehay find the needle? What else could a magnet help with?"],
      am: ["የፀሐይ ማግኔት የትኞቹን ያዘ? የትኞቹን አልያዘም? ሁሉም ብረት ተያዘ?", "ፀሐይ መርፌውን እንዴት አገኘች? ማግኔት ሌላ ምን ሊረዳ ይችላል?"],
    },
    activity: {
      en: "With a grown-up, test a magnet on ten things around the house and sort them into two piles: sticks and doesn't stick. Keep small magnets away from little children, who might swallow them.",
      am: "ከትልቅ ሰው ጋር ማግኔትን በቤት ውስጥ ባሉ አሥር ነገሮች ላይ ሞክራችሁ በሁለት ክምር ለዩ፦ የሚጣበቅና የማይጣበቅ። ትንንሽ ማግኔቶችን ሊውጡ ከሚችሉ ሕፃናት አርቁ።",
    },
  },
};

export default story;
