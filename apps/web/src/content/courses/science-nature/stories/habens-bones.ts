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
      en: "Teacher Meron pinned up an X-ray poster of a child. \"Inside each of us is a skeleton, made of bones. Bones hold us up. Without them we'd be as floppy as a sack!\"",
      am: "መምህርት መሮን የልጅ የኤክስሬይ ፖስተር ሰቀሉ። «በእያንዳንዳችን ውስጥ ከአጥንት የተሠራ አጽም አለ። አጥንቶች ያቆሙናል። ያለ እነሱ እንደ ከረጢት ልፍስፍስ እንሆን ነበር!»",
    },
    {
      en: "\"Your skull is a hard helmet for your brain. Your ribs are a cage that keeps your heart and lungs safe.\" Bones hold me up, muscles move me!",
      am: "«የራስ ቅላችሁ ለአንጎላችሁ ጠንካራ ቆብ ነው። የጎድን አጥንቶቻችሁ ልብና ሳምባን ይጠብቃሉ።» አጥንቶች ያቆሙኛል፣ ጡንቻዎች ያንቀሳቅሱኛል!",
    },
    {
      en: "\"Bones are hard. So how do I bend?\" asked Haben. \"Maybe bones are bendy!\" guessed Gugu. \"Feel your arm,\" said Teacher Meron. \"Can you bend it in the middle?\"",
      am: "«አጥንቶች ጠንካሮች ናቸው። ታዲያ እንዴት እታጠፋለሁ?» አለች ሐበን። «አጥንት ይታጠፋል!» ገመተ ጉጉ። «ክንዳችሁን ዳስሱ» አሉ መምህርቷ። «መሀሉ ይታጠፋል?»",
    },
    {
      en: "No! Arms bend only at the elbow, legs at the knee, fingers at the knuckles. \"These are joints,\" said Teacher Meron, \"where two bones meet, like a door hinge.\"",
      am: "አይሆንም! ክንድ በክርን፣ እግር በጉልበት፣ ጣት በአንጓ ብቻ ይታጠፋል። «እነዚህ መገጣጠሚያዎች ናቸው» አሉ መምህርቷ፤ «ሁለት አጥንቶች የሚገናኙበት፣ እንደ በር ማጠፊያ።»",
    },
    {
      en: "At lunch, Haben tied a straight stick to Gugu's arm, so his elbow couldn't bend. Gugu picked up his injera… and couldn't get it to his mouth! Everyone laughed.",
      am: "በምሳ ሰዓት ሐበን ክርኑ እንዳይታጠፍ ቀጥ ያለ እንጨት ከጉጉ ክንድ ጋር አሰረች። ጉጉ እንጀራ አነሣ… ወደ አፉ ሊያደርሰው አልቻለም! ሁሉም ሳቁ።",
    },
    {
      en: "\"So what pulls my bones?\" Haben bent her elbow and felt the top of her arm go fat and hard. \"That's a muscle,\" said Teacher Meron. \"Muscles pull your bones.\"",
      am: "«አጥንቶቼን የሚጎትተው ምንድን ነው?» ሐበን ክርኗን አጥፋ የክንዷ ላይኛው ክፍል ሲጠነክር ተሰማት። «ያ ጡንቻ ነው» አሉ መምህርቷ። «ጡንቻዎች አጥንትን ይጎትታሉ።»",
    },
    {
      en: "\"Muscles can only pull, never push. So they work in pairs: one pulls your arm up, another pulls it straight.\" Bones hold me up, muscles move me!",
      am: "«ጡንቻዎች መጎተት ብቻ ይችላሉ፤ ስለዚህ ጥንድ ሆነው ይሠራሉ፦ አንዱ ክንዱን ያጥፋል፣ ሌላው ያቀናል።» አጥንቶች ያቆሙኛል፣ ጡንቻዎች ያንቀሳቅሱኛል!",
    },
    {
      en: "After school, Haben jumped at the biggest rock. Too low! She thought about her muscles. What if she bent her knees first, to give them more room to push?",
      am: "ከትምህርት በኋላ ሐበን ወደ ትልቁ ድንጋይ ዘለለች። በጣም ዝቅ አለ! ስለ ጡንቻዎቿ አሰበች። መጀመሪያ ጉልበቶቿን ብታጥፍስ?",
    },
    {
      en: "She crouched down low, then, PUSH! Her leg muscles straightened her legs, and up she flew, onto the top of the rock. \"I did it!\" Bones hold me up, muscles move me!",
      am: "ዝቅ ብላ ተቀመጠች፤ ከዚያ ግፋ! የእግሯ ጡንቻዎች እግሮቿን አቀኑ፤ በርራ ድንጋዩ አናት ላይ ደረሰች። «ቻልኩ!» አጥንቶች ያቆሙኛል፣ ጡንቻዎች ያንቀሳቅሱኛል!",
    },
    {
      en: "\"Are bones alive?\" \"Yes,\" said Teacher Meron. \"They grow, and can mend. A grown-up has 206 bones! The longest is in your thigh; the tiniest are in your ear.\"",
      am: "«አጥንቶች ሕያው ናቸው?» «አዎ» አሉ መምህርቷ። «ያድጋሉ፤ ይጠገናሉም። አዋቂ 206 አጥንቶች አሉት! ረጅሙ በጭን፣ ትንሾቹ በጆሮ ውስጥ ናቸው።»",
    },
    {
      en: "That evening Haben leapt home across the rocks. \"Thank you, skeleton! Thank you, muscles!\" And she sang all the way: \"Bones hold me up, muscles move me!\"",
      am: "ማታ ሐበን በድንጋዮቹ ላይ እየዘለለች ወደ ቤት ሄደች። «አመሰግናለሁ አጽሜ! አመሰግናለሁ ጡንቻዎቼ!» እያለች ዘመረች፦ «አጥንቶች ያቆሙኛል፣ ጡንቻዎች ያንቀሳቅሱኛል!»",
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
