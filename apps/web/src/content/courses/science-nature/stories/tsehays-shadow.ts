import type { Story } from "../../../stories";

/*
  "Tsehay's Shadow" (level 6: light and shadows). In the morning, Tsehay's shadow is long; she tries
  to run away from it and can't. A shadow is where her body blocks the sunlight: light travels in
  straight lines and can't bend round her. At midday her shadow is tiny, almost under her feet (in
  Ethiopia, near the equator, the midday sun is high); in the evening it is long again, on the other
  side. Light passes through clear glass, a little through thin cloth, not through wood. The
  problem: Tsehay and Gugu put on a shadow-puppet show with a torch and a sheet, but the lion puppet's
  shadow is big and blurry; she works out to move the puppet closer to the sheet: smaller and sharper.
  Join-in line: "Where light can't go, a shadow will show!"

  Science (kept simple and true): shadows form where an opaque object blocks light; light travels in
  straight lines; transparent, translucent and opaque materials; a low sun makes long shadows, a high
  sun short ones; a shadow points away from the light; an object closer to the light makes a bigger,
  blurrier shadow, closer to the screen a smaller, sharper one. The torch is held by a grown-up or
  used with care; we never look at the Sun.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ብርሃን በማይደርስበት ጥላ ይታያል!».
*/
const story: Story = {
  id: "tsehays-shadow",
  course: "science-nature",
  pack: "story",
  title: { en: "Tsehay's Shadow", am: "የፀሐይ ጥላ" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#4A4A8A",
  scene: "lib-tsehays-shadow",
  coverPage: 10,
  teaches: { words: ["shadow", "light", "block", "torch", "long", "short"] },
  pages: [
    {
      en: "Early one morning, Tsehay saw a long, dark shape stretching across the yard. When she waved, it waved. When she hopped, it hopped. Her shadow!",
      am: "አንድ ማለዳ ፀሐይ በግቢው ላይ የተዘረጋ ረጅም ጥቁር ቅርጽ አየች። እጇን ስታውለበልብ አውለበለበ። ስትዘል ዘለለ። ጥላዋ!",
    },
    {
      en: "\"I'll run away from it!\" She ran and ran, but her shadow stayed stuck to her feet. Gugu laughed. \"You can't escape your shadow!\"",
      am: "«ከእሱ እሸሻለሁ!» ሮጠች፣ ሮጠች፤ ጥላዋ ግን ከእግሯ ጋር ተጣብቆ ቀረ። ጉጉ ሳቀ። «ከጥላሽ ማምለጥ አትችዪም!»",
    },
    {
      en: "\"But what IS a shadow?\" Grandma said, \"Sunlight travels in straight lines. Your body blocks it. The dark place where it can't reach is your shadow.\"",
      am: "«ጥላ ምንድን ነው?» አያቴ አሉ፦ «የፀሐይ ብርሃን ቀጥ ብሎ ይጓዛል። ሰውነትሽ ይዘጋዋል። ብርሃኑ የማይደርስበት ጨለማ ቦታ ጥላሽ ነው።»",
    },
    {
      en: "\"Light can't bend round you, so the shadow has your shape.\" Tsehay made bunny ears with her fingers. A bunny shadow hopped! Where light can't go, a shadow will show!",
      am: "«ብርሃን በዙሪያሽ መታጠፍ አይችልም፤ ስለዚህ ጥላው ቅርጽሽን ይይዛል።» ፀሐይ በጣቶቿ የጥንቸል ጆሮ ሠራች። የጥንቸል ጥላ ዘለለ! ብርሃን በማይደርስበት ጥላ ይታያል!",
    },
    {
      en: "At midday, Tsehay looked for her shadow. It had shrunk to a tiny puddle under her feet! The Sun was high above her head.",
      am: "እኩለ ቀን ፀሐይ ጥላዋን ፈለገች። ከእግሯ ሥር ወደ ትንሽ ኩሬ አንሶ ነበር! ፀሐይ ከራሷ በላይ ከፍ ብላ ነበር።",
    },
    {
      en: "In the evening, her shadow was long again, but now pointing the other way. \"The Sun is low, on the other side,\" said Gugu. \"Shadows point away from the light.\"",
      am: "ምሽት ጥላዋ እንደገና ረዘመ፤ አሁን ግን ወደ ሌላው አቅጣጫ። «ፀሐይ በሌላው በኩል ዝቅ ብላለች» አለ ጉጉ። «ጥላዎች ከብርሃኑ ተቃራኒ ያመለክታሉ።»",
    },
    {
      en: "They tested things in the torchlight. The clear glass let light through: almost no shadow. Thin cloth let a little through. The wooden board: a dark shadow!",
      am: "ነገሮችን በባትሪ ብርሃን ሞከሩ። ግልጹ ብርጭቆ ብርሃን አሳለፈ፦ ጥላ የለም ማለት ይቻላል። ቀጭን ጨርቅ ትንሽ አሳለፈ። የእንጨት ሳንቃ፦ ጥቁር ጥላ!",
    },
    {
      en: "That night, they put on a shadow show for Grandma, with a torch and a white sheet. Gugu held up a paper lion. Where light can't go, a shadow will show!",
      am: "በዚያ ሌሊት ለአያቴ በባትሪና በነጭ አንሶላ የጥላ ትርዒት አቀረቡ። ጉጉ የወረቀት አንበሳ አነሣ። ብርሃን በማይደርስበት ጥላ ይታያል!",
    },
    {
      en: "But the lion's shadow was huge and blurry, a fuzzy blob! \"Is that a lion or a cloud?\" giggled Grandma. Gugu's face fell.",
      am: "የአንበሳው ጥላ ግን ግዙፍና ደብዛዛ ነበር! «ያ አንበሳ ነው ወይስ ደመና?» ብለው ተንከተከቱ አያቴ። የጉጉ ፊት ጠቆረ።",
    },
    {
      en: "Tsehay thought about the torch. \"The lion is too close to the light. Move it closer to the sheet!\" Gugu moved it back, slowly.",
      am: "ፀሐይ ስለ ባትሪው አሰበች። «አንበሳው ለብርሃኑ በጣም ቀርቧል። ወደ አንሶላው አቅርበው!» ጉጉ ቀስ ብሎ ወደ ኋላ አንቀሳቀሰው።",
    },
    {
      en: "The shadow shrank, and its edges grew sharp: a lion with a mane and a tail! \"Roar!\" Grandma clapped. Where light can't go, a shadow will show!",
      am: "ጥላው አነሰ፤ ጠርዞቹም ጥርት አሉ፦ ጋማና ጅራት ያለው አንበሳ! «ግርርር!» አያቴ አጨበጨቡ። ብርሃን በማይደርስበት ጥላ ይታያል!",
    },
    {
      en: "Next morning, Tsehay's long shadow stretched across the yard again. This time she didn't run. She danced with it. \"Where light can't go, a shadow will show!\"",
      am: "በማግሥቱ ጠዋት የፀሐይ ረጅም ጥላ እንደገና በግቢው ተዘረጋ። በዚህ ጊዜ አልሸሸችም። አብራው ጨፈረች። «ብርሃን በማይደርስበት ጥላ ይታያል!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why couldn't Tsehay run away from her shadow? When was her shadow longest, and when shortest?", "How did Tsehay make the lion's shadow sharp?"],
      am: ["ፀሐይ ከጥላዋ ለምን ማምለጥ አልቻለችም? ጥላዋ መቼ ረዘመ? መቼ አጠረ?", "ፀሐይ የአንበሳውን ጥላ እንዴት ጥርት አደረገችው?"],
    },
    activity: {
      en: "Stand a stick in the ground and mark the end of its shadow with a stone in the morning, at midday and in the evening. In a dark room, make hand shadows with a torch, closer to and further from the wall.",
      am: "እንጨት መሬት ላይ ተክላችሁ ጠዋት፣ እኩለ ቀንና ምሽት የጥላውን ጫፍ በድንጋይ ምልክት አድርጉ። በጨለማ ክፍል በባትሪ የእጅ ጥላ ሥሩ፤ ወደ ግድግዳው አቅርባችሁና አርቃችሁ።",
    },
  },
};

export default story;
