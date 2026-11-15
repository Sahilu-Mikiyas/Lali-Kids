import type { Story } from "../../../stories";

/*
  "Mirror Wings" (Maths Explorers, level 6). Symmetry: after the rains Ayan and Abdi chase
  butterflies in Tsehay's garden. A butterfly's left wing is a mirror of its right; the line
  down the middle is a line of symmetry; folding paper with paint on one half makes a
  symmetrical print; faces are nearly symmetrical; the tibeb border on Mama's netela matches on
  both sides of its middle; a torn piece of paper is not symmetrical; a mirror on the line
  shows the whole butterfly; completing the other wing; a chain of paper people.
  The repeated line to join in on: "Fold it in the middle: both halves match!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  «ተመሳሳይነት» / «የተመጣጠነ» for symmetry, «የተመጣጣኝነት መስመር» for line of symmetry, and the
  repeated line «መሃል ላይ አጥፉት፦ ሁለቱ ግማሾች ይገጥማሉ!».
*/
const story: Story = {
  id: "mirror-wings",
  course: "maths-explorers",
  pack: "story",
  title: { en: "Mirror Wings", am: "የመስታወት ክንፎች" },
  category: "Maths",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#F5961E",
  scene: "lib-mirror-wings",
  coverPage: 1,
  teaches: { numbers: [2], words: ["symmetry", "line of symmetry", "half", "match", "mirror"] },
  pages: [
    {
      en: "After the rains, Tsehay's garden was full of flowers and butterflies. Ayan and her little brother Abdi tiptoed after an orange butterfly. \"Shh! It's landing!\"",
      am: "ከዝናቡ በኋላ የፀሐይ አትክልት ቦታ በአበቦችና በቢራቢሮዎች ተሞላ። አያንና ታናሽ ወንድሟ አብዲ አንዲትን ብርቱካናማ ቢራቢሮ በቀስታ ተከተሏት። «ዝም! እያረፈች ነው!»",
    },
    {
      en: 'The butterfly opened its wings on a flower. "Look," whispered Ayan. "The left wing is just like the right wing, the same spots in the same places, like a mirror."',
      am: "ቢራቢሮዋ በአንድ አበባ ላይ ክንፎቿን ዘረጋች። «ተመልከት» ብላ ሹክ አለች አያን። «የግራ ክንፏ ልክ እንደ ቀኝ ክንፏ ነው፤ ተመሳሳይ ነጠብጣቦች በተመሳሳይ ቦታ፣ ልክ እንደ መስታወት።»",
    },
    {
      en: 'Tsehay drew a line straight down the middle of the butterfly\'s body. "That is the line of symmetry. One side is a mirror of the other." Fold it in the middle: both halves match!',
      am: "ፀሐይ በቢራቢሮዋ አካል መሃል ቀጥ ያለ መስመር አሰመረች። «ያ የተመጣጣኝነት መስመር ነው። አንዱ ወገን የሌላው መስታወት ነው።» መሃል ላይ አጥፉት፦ ሁለቱ ግማሾች ይገጥማሉ!",
    },
    {
      en: "Ayan folded a piece of paper in half and opened it. She dabbed paint spots on one half only, then folded it shut and pressed hard. When she opened it… a paper butterfly with two matching wings!",
      am: "አያን አንድ ወረቀት ለሁለት አጥፋ ከፈተችው። በአንዱ ግማሽ ላይ ብቻ የቀለም ነጠብጣቦችን አደረገች፤ ከዚያ አጥፋ አጥብቃ ተጫነችው። ስትከፍተው… ሁለት የሚገጥሙ ክንፎች ያሏት የወረቀት ቢራቢሮ!",
    },
    {
      en: 'Abdi looked at Ayan\'s face. "Two eyes, two ears, one nose in the middle. Your face is almost symmetrical too!" Ayan laughed. "So is yours!"',
      am: "አብዲ የአያንን ፊት ተመለከተ። «ሁለት ዓይኖች፣ ሁለት ጆሮዎች፣ መሃል ላይ አንድ አፍንጫ። ፊትሽም ተመጣጣኝ ነው ማለት ይቻላል!» አያን ሳቀች። «ያንተም እንደዚያው!»",
    },
    {
      en: "Mama brought out her netela to show them its tibeb border. The woven diamonds on one side of the middle matched the ones on the other side, stitch for stitch. Fold it in the middle: both halves match!",
      am: "እማማ ጥለቱን ልታሳያቸው ነጠላዋን አመጣች። ከመሃሉ በአንድ በኩል ያሉት የተሸመኑ አልማዞች በሌላው በኩል ካሉት ጋር ስፌት በስፌት ይገጥማሉ። መሃል ላይ አጥፉት፦ ሁለቱ ግማሾች ይገጥማሉ!",
    },
    {
      en: 'Abdi tore a piece of paper in a hurry and folded it. One half was big and bumpy; the other was small. "They don\'t match," he said. "Not symmetrical!"',
      am: "አብዲ በችኮላ አንድ ወረቀት ቀደደና አጠፈው። አንዱ ግማሽ ትልቅና ጎርበጥባጣ፣ ሌላው ትንሽ ነበር። «አይገጥሙም» አለ። «ተመጣጣኝ አይደለም!»",
    },
    {
      en: "Tsehay had a little mirror. She drew just half a butterfly and stood the mirror on the line. In the mirror, the other half appeared, and there was the whole butterfly!",
      am: "ፀሐይ ትንሽ መስታወት ነበራት። የቢራቢሮ ግማሽ ብቻ ሣለችና መስታወቱን በመስመሩ ላይ አቆመችው። በመስታወቱ ውስጥ ሌላው ግማሽ ታየ፤ ሙሉ ቢራቢሮም ሆነ!",
    },
    {
      en: "{name}, can we finish Abdi's butterfly? One wing has a big blue spot near the top and a small one at the bottom. So the other wing needs a big blue spot near the top and a small one at the bottom too! Fold it in the middle: both halves match!",
      am: "{name}፣ የአብዲን ቢራቢሮ እንጨርስ? አንዱ ክንፍ ከላይ አጠገብ ትልቅ ሰማያዊ ነጠብጣብ፣ ከታች ደግሞ ትንሽ አለው። ስለዚህ ሌላውም ክንፍ ከላይ ትልቅ ሰማያዊ ነጠብጣብ፣ ከታች ትንሽ ያስፈልገዋል! መሃል ላይ አጥፉት፦ ሁለቱ ግማሾች ይገጥማሉ!",
    },
    {
      en: "Then Ayan folded a long strip of paper back and forth and cut out half a person. When she opened it, a whole row of paper friends appeared, all holding hands.",
      am: "ከዚያ አያን አንድ ረጅም ቁራጭ ወረቀት ወዲያና ወዲህ አጥፋ የሰው ግማሽ ቆረጠች። ስትከፍተው እጅ ለእጅ የተያያዙ የወረቀት ጓደኞች ሙሉ ረድፍ ታየ።",
    },
    {
      en: "They hung the paper butterflies and the paper friends on the fence. The wind made them dance, and every one of them had two halves that matched.",
      am: "የወረቀት ቢራቢሮዎቹንና የወረቀት ጓደኞቹን በአጥሩ ላይ ሰቀሏቸው። ነፋሱ አስጨፈራቸው፤ እያንዳንዳቸውም የሚገጥሙ ሁለት ግማሾች ነበሯቸው።",
    },
    {
      en: 'Then a real orange butterfly landed on a paper one. "Look, Abdi!" whispered Ayan. "Twins!" Fold it in the middle: both halves match!',
      am: "ከዚያ አንዲት እውነተኛ ብርቱካናማ ቢራቢሮ በአንድ የወረቀት ቢራቢሮ ላይ አረፈች። «ተመልከት አብዲ!» ብላ ሹክ አለች አያን። «መንትዮች!» መሃል ላይ አጥፉት፦ ሁለቱ ግማሾች ይገጥማሉ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Where is the line of symmetry on a butterfly? On your face?", "Can you find something at home that is symmetrical, and something that is not?"],
      am: ["በቢራቢሮ ላይ የተመጣጣኝነት መስመሩ የት ነው? በፊታችሁ ላይስ?", "በቤት ውስጥ ተመጣጣኝ የሆነ ነገርና ያልሆነ ነገር ማግኘት ትችላላችሁ?"],
    },
    activity: {
      en: "Fold a paper in half, paint on one side and press it shut to make a butterfly print. Then draw half a shape against the fold and ask your child to draw the other half, and check with a small mirror.",
      am: "አንድ ወረቀት ለሁለት አጥፋችሁ በአንዱ በኩል ቀለም ቀብታችሁ አጥፋችሁ ተጭናችሁ የቢራቢሮ ሕትመት ሥሩ። ከዚያ በመታጠፊያው አጠገብ የአንድ ቅርጽን ግማሽ ሣሉና ልጁ ሌላውን ግማሽ እንዲሥል ጠይቁ፤ በትንሽ መስታወት አረጋግጡ።",
    },
  },
};

export default story;
