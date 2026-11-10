import type { Story } from "../../../stories";

/*
  "Whose Is It?" (Amharic Readers, level 3): the my / your / his / her endings, and everyday
  school words (ኳስ, ቦርሳ, እርሳስ, ማስመሪያ, ደብተር, ኮፍያ). Teacher Meron empties the lost-and-found
  box on Friday: ኳስህ? ኳሴ! ቦርሳሽ? ቦርሳዬ! እርሳሷ, ማስመሪያው; on the board ቤቴ ቤትህ ቤትሽ ቤቱ ቤቷ.
  Amharic says "your" one way to a boy (-ህ) and another to a girl (-ሽ), and "his" (-ኡ) and
  "her" (-ዋ) differently too: explained matter-of-factly. A brown notebook with no name is solved
  by reading what is written inside (ቤቴ…, አያቴ…, ጓደኛዬ…): Anbessa's. Then everyone labels
  their things with የ…, and a tiny hat turns out to be Lali's. The join-in line is "Mine,
  yours, his, hers: the ending tells whose!" (የእኔ፣ ያንተ፣ ያንቺ፣ የእሱ፣ የእሷ፦ መጨረሻው ይነግረናል!).

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line and the explanation of the endings (pages 2–4). Grown-ups' card notes the
  polite -ዎ (ቤትዎ) and that -ኡ / -ው also means "the".
*/
const story: Story = {
  id: "lost-and-found-box",
  course: "amharic-readers",
  pack: "story",
  title: { en: "Whose Is It?", am: "የማን ነው?" },
  category: "Fidel",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#2E7DA8",
  scene: "lib-lost-and-found-box",
  coverPage: 7,
  teaches: { words: ["ቤቴ", "ቤትህ", "ቤትሽ", "ቤቱ", "ቤቷ", "ቤታችን", "ደብተሬ"] },
  pages: [
    {
      en: `It's Friday afternoon, and Teacher Meron's lost-and-found box is full to the top: a ball, a bag, a pencil, a ruler, a notebook… "Everything goes home today," she says.`,
      am: "ዓርብ ከሰዓት በኋላ ነው። የመምህርት መሮን የጠፉ ዕቃዎች ሣጥን እስከ አፉ ሞልቷል፦ ኳስ፣ ቦርሳ፣ እርሳስ፣ ማስመሪያ፣ ደብተር… «ዛሬ ሁሉም ወደ ቤቱ ይሄዳል» አሉ።",
    },
    {
      en: `She holds up a red ball. "Gugu, ኳስህ ነው? Is this your ball?" "Yes! ኳሴ ነው! It's my ball!" The word ኳስ stays the same. Only the ending changes: -ህ is "your", -ኤ is "my".`,
      am: "ቀይ ኳስ ከፍ አድርገው አሳዩ። «ጉጉ፣ ኳስህ ነው?» «አዎ! ኳሴ ነው!» «ኳስ» የሚለው ቃል አልተቀየረም። የተቀየረው መጨረሻው ብቻ ነው፦ «-ህ» ያንተ፣ «-ኤ» የእኔ ማለት ነው።",
    },
    {
      en: `Then a blue bag. "Haben, ቦርሳሽ ነው?" To a boy, Teacher Meron says ቦርሳህ; to a girl she says ቦርሳሽ. Amharic always notices who it's talking to. "Yes, ቦርሳዬ ነው!" says Haben. Mine, yours, his, hers: the ending tells whose!`,
      am: "ከዚያ ሰማያዊ ቦርሳ። «ሐበን፣ ቦርሳሽ ነው?» ለወንድ ልጅ መምህርት መሮን «ቦርሳህ» ይላሉ፤ ለሴት ልጅ «ቦርሳሽ» ይላሉ። አማርኛ የሚያናግረውን ሰው ሁልጊዜ ያስተውላል። «አዎ፣ ቦርሳዬ ነው!» አለች ሐበን። የእኔ፣ ያንተ፣ ያንቺ፣ የእሱ፣ የእሷ፦ መጨረሻው ይነግረናል!",
    },
    {
      en: `A green pencil with a little wolf on it. "That's Hawi's!" says Ayan. "እርሳሷ ነው: it's her pencil." A ruler with a lion on it. "Anbessa's! ማስመሪያው ነው: it's his ruler." For a girl, -ዋ; for a boy, -ኡ.`,
      am: "ትንሽ ተኩላ የተሣለበት አረንጓዴ እርሳስ። «የሀዊ ነው!» አለች አያን። «እርሳሷ ነው።» አንበሳ የተሣለበት ማስመሪያ። «የአንበሳ! ማስመሪያው ነው።» ስለ ሴት ልጅ ስናወራ «-ዋ»፣ ስለ ወንድ ልጅ «-ኡ» ይሆናል።",
    },
    {
      en: `Teacher Meron writes on the board: ቤት, house. ቤቴ, my house. ቤትህ, your house (to a boy). ቤትሽ, your house (to a girl). ቤቱ, his house. ቤቷ, her house. And ቤታችን, our house! The class reads it together.`,
      am: "መምህርት መሮን በሰሌዳው ላይ ጻፉ፦ ቤት። ቤቴ፣ የእኔ ቤት። ቤትህ፣ ያንተ ቤት። ቤትሽ፣ ያንቺ ቤት። ቤቱ፣ የእሱ ቤት። ቤቷ፣ የእሷ ቤት። ቤታችን ደግሞ፣ የእኛ ቤት! ክፍሉ በአንድ ላይ አነበበው።",
    },
    {
      en: `Then she lifts out a plain brown notebook with no name on it. "ደብተሩ የማን ነው? Whose notebook is this?" Nobody knows. The cover gives no clue at all.`,
      am: "ከዚያ ስም ያልተጻፈበት ተራ ቡናማ ደብተር አወጡ። «ደብተሩ የማን ነው?» ማንም አያውቅም። ሽፋኑ ምንም ፍንጭ አይሰጥም።",
    },
    {
      en: `"Let's read inside," says Anbessa. "The answer is in the words!" On the first page it says: ቤቴ ከትልቁ ዋርካ አጠገብ ነው። አያቴ ዳቦ ትጋግራለች። ጓደኛዬ ጉጉ ነው። "My house is next to the big fig tree. My grandma bakes bread. My friend is Gugu."`,
      am: "«ውስጡን እናንብብ» አለ አንበሳ። «መልሱ በቃላቱ ውስጥ ነው!» በመጀመሪያው ገጽ ላይ እንዲህ ይላል፦ «ቤቴ ከትልቁ ዋርካ አጠገብ ነው። አያቴ ዳቦ ትጋግራለች። ጓደኛዬ ጉጉ ነው።»",
    },
    {
      en: `"The big fig tree… a grandma who bakes bread… and I'm the friend!" says Gugu. Everyone turns to look at Anbessa. His eyes go wide. "ደብተሬ ነው! It's my notebook! I forgot I wrote that!"`,
      am: "«ትልቁ ዋርካ… ዳቦ የምትጋግር አያት… ጓደኛው ደግሞ እኔ ነኝ!» አለ ጉጉ። ሁሉም ወደ አንበሳ ዞሩ። አንበሳ ዓይኖቹን አፈጠጠ። «ደብተሬ ነው! ያንን እንደጻፍኩ ረስቼ ነበር!»",
    },
    {
      en: `"From now on," says Teacher Meron, "write your name on your things." Everyone writes: የአንበሳ ደብተር, Anbessa's notebook. የሐበን ቦርሳ, Haben's bag. The little የ in front also tells whose!`,
      am: "«ከአሁን ጀምሮ» አሉ መምህርት መሮን፣ «ስማችሁን በዕቃዎቻችሁ ላይ ጻፉ።» ሁሉም ጻፉ፦ የአንበሳ ደብተር። የሐበን ቦርሳ። ከፊት ያለችው ትንሿ «የ»ም የማን እንደሆነ ትነግረናለች!",
    },
    {
      en: `At the very bottom of the box is one tiny thing: a little yellow and black hat, smaller than a thumb. Whose could it be? Bzzz! Lali zooms in. "ኮፍያዬ! My hat!" It's Lali's: ኮፍያዋ, her hat!`,
      am: "በሣጥኑ ታች አንድ በጣም ትንሽ ነገር አለ፦ ከአውራ ጣት የምታንስ ቢጫና ጥቁር ኮፍያ። የማን ልትሆን ትችላለች? ዝዝዝ! ላሊ እየበረረች ገባች። «ኮፍያዬ!» የላሊ ናት፦ ኮፍያዋ!",
    },
    {
      en: `Walking home, Anbessa points at everything. "ቤቱ: Gugu's house, his house. ቤቷ: Tsehay's house, her house." Then he runs to Grandma's door. "And this is ቤታችን, our house!" Mine, yours, his, hers: the ending tells whose!`,
      am: "ወደ ቤት ሲሄድ አንበሳ ሁሉንም ነገር አመለከተ። «ቤቱ፦ የጉጉ ቤት። ቤቷ፦ የፀሐይ ቤት።» ከዚያ ወደ አያቴ በር ሮጠ። «ይሄ ደግሞ ቤታችን ነው!» የእኔ፣ ያንተ፣ ያንቺ፣ የእሱ፣ የእሷ፦ መጨረሻው ይነግረናል!",
    },
    {
      en: `That night Anbessa writes on the cover of his notebook in big, careful letters: የአንበሳ ደብተር. Under it, smaller: ደብተሬ! Now nobody will ever have to wonder whose it is.`,
      am: "በዚያ ምሽት አንበሳ በደብተሩ ሽፋን ላይ በትልልቅና በጥንቃቄ በተጻፉ ፊደሎች ጻፈ፦ የአንበሳ ደብተር። ከሥሩ በትንሹ፦ ደብተሬ! አሁን የማን እንደሆነ ማንም ግራ አይጋባም።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["How would Teacher Meron ask Gugu 'Is this your bag?' And how would she ask Haben?", "How did the class find out whose notebook it was?"],
      am: ["መምህርት መሮን ጉጉን «ይህ ቦርሳህ ነው?» እንዴት ብለው ይጠይቁታል? ሐበንንስ?", "ክፍሉ ደብተሩ የማን እንደሆነ እንዴት አወቀ?"],
    },
    activity: {
      en: "Play 'Whose is it?' with things around the house. Pick up a cup or a shoe and ask: ጫማህ ነው? / ጫማሽ ነው? Your child answers with the right ending: ጫማዬ ነው! or ጫማው / ጫማዋ ነው (his / hers). Good to know: to elders we often use the polite ending -ዎ (ቤትዎ, your house), and -ኡ / -ው can also simply mean 'the' (ቤቱ, the house), so the sentence tells which.",
      am: "በቤት ውስጥ ባሉ ዕቃዎች «የማን ነው?» ተጫወቱ። ስኒ ወይም ጫማ አንሥታችሁ ጠይቁ፦ ጫማህ ነው? / ጫማሽ ነው? ልጃችሁ በትክክለኛው መጨረሻ ይመልስ፦ ጫማዬ ነው! ወይም ጫማው / ጫማዋ ነው። ማወቁ ጥሩ ነው፦ ለታላላቆች ብዙውን ጊዜ የአክብሮት መጨረሻውን «-ዎ» እንጠቀማለን (ቤትዎ)፤ «-ኡ / -ው» ደግሞ «ቤቱ» ውስጥ እንዳለው በቀላሉ የተወሰነውን ነገር ሊያመለክት ይችላል፤ ዓረፍተ ነገሩ የትኛው እንደሆነ ይነግረናል።",
    },
  },
};

export default story;
