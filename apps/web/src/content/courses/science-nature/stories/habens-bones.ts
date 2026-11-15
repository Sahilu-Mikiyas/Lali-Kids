import type { Story } from "../../../stories";

/*
  "Haben's Bones" (level 2: the skeleton, joints and muscles). Haben loves leaping on the rocks and
  wonders why she doesn't flop like a rope. Teacher Meron's poster shows the skeleton inside a
  child: bones hold us up (without them we'd be a floppy sack), the skull is a helmet for the brain
  and the ribs a cage for the heart and lungs. But bones are hard: how do we bend? Gugu guesses
  bones are bendy; they feel their arms and find that they bend only at joints. Haben ties a straight
  stick along Gugu's arm with a netela strip: he can't bring his injera to his mouth! What pulls the
  bones? Muscles: feel the one on top of your arm go fat and hard as you bend. Muscles pull; another
  muscle pulls back. Haben wants to jump onto the big rock; she works out that bending her knees
  first lets her leg muscles push longer, and she makes it. Bones are alive, they grow with you and
  can mend. A grown-up has 206 bones. Join-in line: "Bones hold me up, muscles move me!"

  Science (kept simple and true): the skeleton supports the body, protects the brain (skull), heart
  and lungs (ribs) and lets us move; we bend at joints (elbow, knee, shoulder, hip, knuckles);
  muscles are joined to bones and move them by pulling (contracting), in pairs; bones are living,
  grow and can mend; an adult has 206 bones (a baby has more, some join as we grow); the longest is
  the thigh bone, the smallest are in the ear. The cast are animals, so the poster shows a child.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «አጥንቶች ያቆሙኛል፣ ጡንቻዎች ያንቀሳቅሱኛል!», «መገጣጠሚያ» for joint and «የራስ ቅል».
*/
const story: Story = {
  id: "habens-bones",
  course: "science-nature",
  pack: "story",
  title: { en: "Haben's Bones", am: "የሐበን አጥንቶች" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#4A6FA8",
  scene: "lib-habens-bones",
  coverPage: 1,
  teaches: { words: ["bone", "skeleton", "skull", "ribs", "joint", "muscle"] },
  pages: [
    {
      en: 'Haben loved to leap from rock to rock, hop, hop, hop! One day she stopped and looked at her legs. "Why don\'t I go all floppy, like a rope?"',
      am: "ሐበን ከድንጋይ ወደ ድንጋይ መዝለል ትወድ ነበር፤ ዝልል፣ ዝልል፣ ዝልል! አንድ ቀን ቆማ እግሮቿን ተመለከተች። «ለምንድን ነው እንደ ገመድ የማልልፈሰፈሰው?»",
    },
    {
      en: 'At school, Teacher Meron pinned up a big poster of a child. "This is what you would see with an X-ray camera. Inside every one of us is a skeleton, made of bones. Bones hold us up. Without them, we\'d be as floppy as a sack of flour!"',
      am: "በትምህርት ቤት መምህርት መሮን የአንድ ልጅ ትልቅ ፖስተር ሰቀሉ። «በኤክስሬይ ካሜራ የምታዩት ይሄ ነው። በእያንዳንዳችን ውስጥ ከአጥንቶች የተሠራ አጽም አለ። አጥንቶች ያቆሙናል። ያለ እነሱ እንደ ዱቄት ከረጢት ልፍስፍስ እንሆን ነበር!»",
    },
    {
      en: 'She pointed to the round bone at the top. "Your skull is a hard helmet for your brain." Then to the curved bones in the chest. "Your ribs are a cage that keeps your heart and lungs safe." Bones hold me up, muscles move me!',
      am: "ከላይ ያለውን ክብ አጥንት አመለከቱ። «የራስ ቅላችሁ ለአንጎላችሁ ጠንካራ ቆብ ነው።» ከዚያ በደረት ውስጥ ያሉትን የተጠማዘዙ አጥንቶች። «የጎድን አጥንቶቻችሁ ልባችሁንና ሳምባችሁን የሚጠብቅ ቤት ናቸው።» አጥንቶች ያቆሙኛል፣ ጡንቻዎች ያንቀሳቅሱኛል!",
    },
    {
      en: '"But bones are hard," said Haben. "So how do I bend?" "Maybe bones are bendy!" guessed Gugu. "Let\'s find out," said Teacher Meron. "Feel your arm. Can you bend it in the middle of a bone?"',
      am: "«አጥንቶች ግን ጠንካሮች ናቸው» አለች ሐበን። «ታዲያ እንዴት እታጠፋለሁ?» «ምናልባት አጥንቶች የሚታጠፉ ይሆናሉ!» ብሎ ገመተ ጉጉ። «እስቲ እንደርስበት» አሉ መምህርት መሮን። «ክንዳችሁን ዳስሱ። በአጥንት መሀል ማጠፍ ትችላላችሁ?»",
    },
    {
      en: "Everyone squeezed and wiggled. No! Their arms only bent at the elbow, their legs at the knee, their fingers at the knuckles. \"These bending places are joints,\" said Teacher Meron, \"where two bones meet, like the hinge on a door.\"",
      am: "ሁሉም ጨመቁ፣ አንቀሳቀሱ። አይሆንም! ክንዳቸው የሚታጠፈው በክርን፣ እግራቸው በጉልበት፣ ጣቶቻቸው በአንጓዎች ብቻ ነበር። «እነዚህ የሚታጠፉ ቦታዎች መገጣጠሚያዎች ናቸው» አሉ መምህርት መሮን፤ «ሁለት አጥንቶች የሚገናኙበት፣ እንደ በር ማጠፊያ።»",
    },
    {
      en: "At lunch, Haben had an idea. She tied a straight stick along Gugu's arm with a strip of netela, so his elbow couldn't bend. Gugu picked up his injera… and couldn't get it to his mouth! Everyone laughed, Gugu most of all.",
      am: "በምሳ ሰዓት ሐበን አንድ ሐሳብ መጣላት። ክርኑ እንዳይታጠፍ ቀጥ ያለ እንጨት በነጠላ ቁራጭ ከጉጉ ክንድ ጋር አሰረች። ጉጉ እንጀራውን አነሣ… ወደ አፉ ግን ሊያደርሰው አልቻለም! ሁሉም ሳቁ፤ ከሁሉም በላይ ጉጉ።",
    },
    {
      en: '"So what pulls my bones?" asked Haben. "Put your hand on the top of your arm, and bend your elbow," said Teacher Meron. Haben felt something go fat and hard. "That\'s a muscle! Muscles are joined to your bones, and they pull them." Bones hold me up, muscles move me!',
      am: "«ታዲያ አጥንቶቼን የሚጎትታቸው ምንድን ነው?» ብላ ጠየቀች ሐበን። «እጃችሁን በክንዳችሁ ላይኛው ክፍል አድርጉና ክርናችሁን እጠፉ» አሉ መምህርት መሮን። ሐበን የሆነ ነገር ሲወፍርና ሲጠነክር ተሰማት። «ያ ጡንቻ ነው! ጡንቻዎች ከአጥንቶቻችሁ ጋር ተያይዘዋል፤ ይጎትቷቸዋልም።» አጥንቶች ያቆሙኛል፣ ጡንቻዎች ያንቀሳቅሱኛል!",
    },
    {
      en: '"Muscles can only pull, never push," she said. "So they work in pairs. One muscle pulls your arm up; another, underneath, pulls it straight again." Haben bent and straightened, bent and straightened, feeling first one, then the other.',
      am: "«ጡንቻዎች መጎተት ብቻ ነው የሚችሉት፣ መግፋት አይችሉም» አሉ። «ስለዚህ ጥንድ ሆነው ይሠራሉ። አንዱ ጡንቻ ክንዳችሁን ወደ ላይ ይጎትታል፤ ከሥር ያለው ሌላው ደግሞ መልሶ ያቀናዋል።» ሐበን አጠፈች፣ አቀናች፣ አጠፈች፣ አቀናች፤ መጀመሪያ አንዱን፣ ከዚያ ሌላውን እየተሰማት።",
    },
    {
      en: "After school, Haben tried to jump onto the biggest rock. She stood straight and jumped. Too low! She thought about her muscles. What if she bent her knees first, to give her leg muscles more room to push?",
      am: "ከትምህርት በኋላ ሐበን ወደ ትልቁ ድንጋይ ለመዝለል ሞከረች። ቀጥ ብላ ቆማ ዘለለች። በጣም ዝቅ አለ! ስለ ጡንቻዎቿ አሰበች። የእግሯ ጡንቻዎች የሚገፉበት ተጨማሪ ቦታ እንዲያገኙ መጀመሪያ ጉልበቶቿን ብታጥፍስ?",
    },
    {
      en: "She crouched down low, bending at her knees and hips, and then, PUSH! Her strong leg muscles straightened her legs, and up she flew, right onto the top of the rock. \"I did it!\" Bones hold me up, muscles move me!",
      am: "በጉልበቶቿና በዳሌዋ ታጥፋ ዝቅ ብላ ተቀመጠች፤ ከዚያም ግፋ! ጠንካሮቹ የእግሯ ጡንቻዎች እግሮቿን አቀኑ፤ እሷም በርራ ልክ በድንጋዩ አናት ላይ ደረሰች። «ቻልኩ!» አጥንቶች ያቆሙኛል፣ ጡንቻዎች ያንቀሳቅሱኛል!",
    },
    {
      en: '"Are bones alive?" asked Gugu. "Yes," said Teacher Meron. "They grow as you grow, and if one breaks, it can mend. A grown-up has 206 bones! The longest is in your thigh, and the tiniest are inside your ear."',
      am: "«አጥንቶች ሕያው ናቸው?» ብሎ ጠየቀ ጉጉ። «አዎ» አሉ መምህርት መሮን። «እናንተ ስታድጉ ያድጋሉ፤ አንዱ ቢሰበር ደግሞ ሊጠገን ይችላል። አንድ ትልቅ ሰው 206 አጥንቶች አሉት! ረጅሙ በጭናችሁ ውስጥ ነው፤ በጣም ትንንሾቹ ደግሞ በጆሮአችሁ ውስጥ ናቸው።»",
    },
    {
      en: 'That evening Haben leapt home across the rocks, feeling her knees bend and her muscles pull. "Thank you, skeleton! Thank you, muscles!" And she sang all the way: "Bones hold me up, muscles move me!"',
      am: "በዚያ ምሽት ሐበን ጉልበቶቿ ሲታጠፉና ጡንቻዎቿ ሲጎትቱ እየተሰማት በድንጋዮቹ ላይ እየዘለለች ወደ ቤት ሄደች። «አመሰግናለሁ አጽሜ! አመሰግናለሁ ጡንቻዎቼ!» እስከ ቤት ድረስ ዘመረች፦ «አጥንቶች ያቆሙኛል፣ ጡንቻዎች ያንቀሳቅሱኛል!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "What are bones for? Can you name a bone that protects something soft inside you?",
        "Why couldn't Gugu eat his injera with the stick on his arm? Find five joints on your own body.",
      ],
      am: [
        "አጥንቶች ለምን ይጠቅማሉ? በውስጣችሁ ያለን ለስላሳ ነገር የሚጠብቅ አጥንት መጥራት ትችላላችሁ?",
        "ጉጉ እንጨቱ በክንዱ ላይ ታስሮ እያለ እንጀራውን ለምን መብላት አቃተው? በራሳችሁ ሰውነት ላይ አምስት መገጣጠሚያዎችን ፈልጉ።",
      ],
    },
    activity: {
      en: "Feel your muscles work: hold a full water bottle and bend your elbow slowly; feel the top of your arm get hard. Then measure two jumps with a piece of string: one with straight legs, one after crouching down. Which goes higher?",
      am: "ጡንቻዎቻችሁ ሲሠሩ ይሰማችሁ፦ የሞላ የውሃ ጠርሙስ ይዛችሁ ክርናችሁን ቀስ ብላችሁ እጠፉ፤ የክንዳችሁ ላይኛው ክፍል ሲጠነክር ይሰማችሁ። ከዚያ ሁለት ዝላዮችን በገመድ ለኩ፦ አንዱን በቀጥተኛ እግሮች፣ ሌላውን ዝቅ ብላችሁ ከተቀመጣችሁ በኋላ። የትኛው ከፍ ይላል?",
    },
  },
};

export default story;
