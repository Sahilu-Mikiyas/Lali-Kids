import type { Story } from "../../../stories";

/*
  "Equal Pieces, Please!" (Maths Explorers, level 3). Halves, quarters and thirds of a shape,
  and equal versus not-equal parts: Gugu's first cut of Grandma's round ambasha makes a big
  piece and a small piece (not halves). Folding an injera edge to edge gives two equal parts
  (halves, ½); folding again gives four (quarters, ¼); two quarters make a half. A long dabo
  loaf for three is cut into three equal slices (thirds, ⅓); four unequal pieces are not
  quarters; a game of "equal or not equal?" with shapes drawn in the dust.
  The repeated line to join in on: "Same size pieces, fair for all!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  «ሩብ» / «አንድ አራተኛ» for a quarter, «አንድ ሦስተኛ» for a third and the repeated line
  «እኩል መጠን፣ ለሁሉም ፍትሐዊ!».
*/
const story: Story = {
  id: "equal-pieces",
  course: "maths-explorers",
  pack: "story",
  title: { en: "Equal Pieces, Please!", am: "እባካችሁ እኩል ቁረጡ!" },
  category: "Maths",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#D9964A",
  scene: "lib-equal-pieces",
  coverPage: 3,
  teaches: { numbers: [2, 3, 4], words: ["half", "quarter", "third", "equal parts", "fraction"] },
  pages: [
    {
      en: 'Grandma had baked a big round ambasha for Saturday breakfast. "Gugu, show me where to cut it in half, for you and Tsehay," she said.',
      am: "አያት ለቅዳሜ ቁርስ ትልቅ ክብ አምባሻ ጋገረች። «ጉጉ፣ ላንተና ለፀሐይ ለሁለት እንድቆርጠው የት ልቁረጠው? አሳየኝ» አለች።",
    },
    {
      en: 'Gugu pointed, and Grandma cut. But one piece was big and one was small! "That\'s not a half!" said Tsehay. "Halves must be the same size." Same size pieces, fair for all!',
      am: "ጉጉ አመለከተ፤ አያትም ቆረጠች። ግን አንዱ ቁራጭ ትልቅ፣ ሌላው ትንሽ ሆነ! «ያ ግማሽ አይደለም!» አለች ፀሐይ። «ግማሾች እኩል መሆን አለባቸው።» እኩል መጠን፣ ለሁሉም ፍትሐዊ!",
    },
    {
      en: 'Grandma folded a soft injera in half, edge to edge, so the two sides matched exactly. Then she cut along the fold. "Two equal parts. Each one is a half." One half is written ½.',
      am: "አያት አንድ ለስላሳ እንጀራ ጠርዝ ከጠርዝ አገጣጥማ ለሁለት አጠፈችው፤ ሁለቱ ወገኖች ልክ ተመሳሰሉ። ከዚያ በታጠፈው ላይ ቆረጠችው። «ሁለት እኩል ክፍሎች። እያንዳንዱ ግማሽ ነው።» ግማሽ ½ ተብሎ ይጻፋል።",
    },
    {
      en: '"Now we are four!" said Anbessa, arriving with Lali. Grandma folded the injera once more: four equal parts. "Each part is a quarter." A quarter is written ¼. Same size pieces, fair for all!',
      am: "«አሁን አራት ሆነናል!» አለ አንበሳ ከላሊ ጋር እየደረሰ። አያት እንጀራውን አንድ ጊዜ እንደገና አጠፈችው፦ አራት እኩል ክፍሎች። «እያንዳንዱ ክፍል ሩብ ነው።» ሩብ (አንድ አራተኛ) ¼ ተብሎ ይጻፋል። እኩል መጠን፣ ለሁሉም ፍትሐዊ!",
    },
    {
      en: 'Gugu looked at the four quarters. "Two quarters are the same as one half!" he said, and he put two quarters together to make a half circle.',
      am: "ጉጉ አራቱን ሩቦች ተመለከተ። «ሁለት ሩቦች ከአንድ ግማሽ ጋር እኩል ናቸው!» አለ፤ ሁለት ሩቦችን አገጣጥሞ ግማሽ ክብ ሠራ።",
    },
    {
      en: 'Next came a long dabo loaf for three: Grandma, Tsehay and Gugu. Gugu wanted to cut it in half. "Halves are for two," said Grandma. "For three, we need three equal parts: thirds."',
      am: "ቀጥሎ ለሦስት ሰዎች የሚሆን ረጅም ዳቦ መጣ፦ ለአያት፣ ለፀሐይና ለጉጉ። ጉጉ ለሁለት ሊቆርጠው ፈለገ። «ግማሾች ለሁለት ሰዎች ናቸው» አለች አያት። «ለሦስት ሰዎች ሦስት እኩል ክፍሎች ያስፈልጉናል፦ ሦስተኛዎች።»",
    },
    {
      en: 'Tsehay measured with her fingers, and Grandma cut the loaf into three slices, all the same size. "Each slice is one third," said Grandma. One third is written ⅓.',
      am: "ፀሐይ በጣቶቿ ለካች፤ አያትም ዳቦውን ሦስት እኩል ቁራጮች አድርጋ ቆረጠችው። «እያንዳንዱ ቁራጭ አንድ ሦስተኛ ነው» አለች አያት። አንድ ሦስተኛ ⅓ ተብሎ ይጻፋል።",
    },
    {
      en: 'Anbessa tore his piece of injera into four bits, all different sizes. "Four pieces, so they\'re quarters!" "No," laughed Tsehay. "Four pieces are only quarters if they are all the same size."',
      am: "አንበሳ የእንጀራ ቁራሹን ለአራት ቆራረሰው፤ ሁሉም የተለያየ መጠን ነበራቸው። «አራት ቁራጮች፤ ስለዚህ ሩቦች ናቸው!» «አይደሉም» አለች ፀሐይ እየሳቀች። «አራት ቁራጮች ሩቦች የሚሆኑት ሁሉም እኩል ሲሆኑ ብቻ ነው።»",
    },
    {
      en: 'Grandma made it a game. She drew shapes in the dust with a stick and cut lines across them. "Equal or not equal?" A square cut corner to corner: equal halves! A circle cut near the edge: not equal!',
      am: "አያት ጨዋታ አደረገችው። በዱላ በአፈሩ ላይ ቅርጾችን ሣለችና መስመሮችን አሰመረችባቸው። «እኩል ነው ወይስ አይደለም?» ከማዕዘን ወደ ማዕዘን የተቆረጠ ካሬ፦ እኩል ግማሾች! ከጠርዙ አጠገብ የተቆረጠ ክብ፦ እኩል አይደለም!",
    },
    {
      en: "{name}, can we help? A round ambasha is cut through the middle into four equal pieces. Each piece is one… quarter! Same size pieces, fair for all!",
      am: "{name}፣ እናግዝ? አንድ ክብ አምባሻ በመሃሉ በኩል ለአራት እኩል ቁራጮች ተቆረጠ። እያንዳንዱ ቁራጭ… ሩብ ነው! እኩል መጠን፣ ለሁሉም ፍትሐዊ!",
    },
    {
      en: "At last everyone sat down to eat. Each of them had a fair share, and nobody needed to look at anybody else's plate.",
      am: "በመጨረሻ ሁሉም ለመብላት ተቀመጡ። እያንዳንዳቸው ፍትሐዊ ድርሻቸውን አገኙ፤ ማንም የሌላውን ሳህን መመልከት አላስፈለገውም።",
    },
    {
      en: '"Grandma," said Gugu with his mouth full, "can I have half of your piece too?" Everybody laughed, and Grandma gave him a quarter.',
      am: "«አያቴ» አለ ጉጉ አፉ ሞልቶ፣ «ከአንቺ ቁራጭም ግማሹን ልውሰድ?» ሁሉም ሳቁ፤ አያትም ሩቡን ሰጠችው።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why wasn't Gugu's first cut a half? What makes two pieces halves?", "Which is bigger: a half of an injera or a quarter of the same injera?"],
      am: ["የጉጉ የመጀመሪያው ቁርጥ ለምን ግማሽ አልሆነም? ሁለት ቁራጮችን ግማሾች የሚያደርጋቸው ምንድን ነው?", "የትኛው ይበልጣል፦ የአንድ እንጀራ ግማሽ ወይስ የዚያው እንጀራ ሩብ?"],
    },
    activity: {
      en: "Cut circles and squares from paper. Fold them to make halves and quarters, and check the parts match by laying one on another. Then cut one unequally on purpose and ask: is this a half?",
      am: "ከወረቀት ክቦችንና ካሬዎችን ቁረጡ። ግማሾችንና ሩቦችን ለመሥራት አጥፏቸው፤ ክፍሎቹ እንደሚገጣጠሙ አንዱን በሌላው ላይ አድርጋችሁ አረጋግጡ። ከዚያ አንዱን ሆን ብላችሁ እኩል ያልሆነ አድርጋችሁ ቁረጡና «ይሄ ግማሽ ነው?» ብላችሁ ጠይቁ።",
    },
  },
};

export default story;
