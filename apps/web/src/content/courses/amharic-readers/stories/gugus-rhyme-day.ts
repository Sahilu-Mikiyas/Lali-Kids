import type { Story } from "../../../stories";

/*
  "Gugu's Rhyme Hunt" (Amharic Readers, level 5): rhyming words. Teacher Meron's homework: find
  words that rhyme. In Amharic poems, rhyming lines "hit the house" (ቤት መቱ): they end with the
  same sound. Gugu first thinks ዶሮ and ዳቦ rhyme because they start alike; Grandma shows him that
  rhyme is about the END. Then he finds rhyming families all over the village: ዶሮ ቀበሮ ሽሮ;
  ሻይ ላይ ሰማይ; ኳስ ፈረስ ጥርስ; ጦጣ መጣ ወጣ, and makes his first little rhyme. The join-in line
  is "Same at the end: they rhyme!" (መጨረሻቸው አንድ ነው፤ ቤት መቱ!).

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  «ቤት መቱ» for "they rhyme", the join-in line, and Gugu's rhymes (pages 9 and 11), which should
  sound like playful children's verse.
*/
const story: Story = {
  id: "gugus-rhyme-day",
  course: "amharic-readers",
  pack: "story",
  title: { en: "Gugu's Rhyme Hunt", am: "የጉጉ የግጥም አደን" },
  category: "Fidel",
  ageBands: ["6-7", "8-9"],
  isFree: true,
  color: "#D9532B",
  scene: "lib-gugus-rhyme-day",
  coverPage: 9,
  teaches: { words: ["ዶሮ ቀበሮ ሽሮ", "ሻይ ላይ ሰማይ", "ኳስ ፈረስ ጥርስ", "ጦጣ መጣ ወጣ", "ቤት መታ"] },
  pages: [
    {
      en: `Teacher Meron writes the homework on the board: ቤት የሚመቱ ቃላትን ፈልጉ። "Find words that rhyme." "In a poem," she says, "rhyming words 'hit the house': they end with the same sound."`,
      am: "መምህርት መሮን የቤት ሥራውን በሰሌዳው ላይ ጻፉ፦ ቤት የሚመቱ ቃላትን ፈልጉ። «በግጥም ውስጥ» አሉ፣ «ቤት የሚመቱ ቃላት በአንድ ዓይነት ድምፅ ያልቃሉ።»",
    },
    {
      en: `On the way home Gugu shouts, "I've got one already! ዶሮ and ዳቦ! They rhyme!" He hops along, very pleased with himself.`,
      am: "ወደ ቤት ሲሄድ ጉጉ «አንድ አገኘሁ! ዶሮ እና ዳቦ! ቤት ይመታሉ!» ብሎ ጮኸ። በራሱ በጣም ተደስቶ እየዘለለ ሄደ።",
    },
    {
      en: `Grandma laughs. "Say them slowly. ዶ-ሮ. ዳ-ቦ. They start almost the same, but how do they end?" "…ሮ and ቦ," says Gugu. "Oh. They're different at the end."`,
      am: "አያቴ ሳቀች። «ቀስ ብለህ በላቸው። ዶ-ሮ። ዳ-ቦ። መጀመሪያቸው ይመሳሰላል፤ ግን እንዴት ያልቃሉ?» «…ሮ እና ቦ» አለ ጉጉ። «ኦ። መጨረሻቸው ይለያያል።»",
    },
    {
      en: `"Rhyme lives at the END of a word," says Grandma. "ዶሮ… what else ends in ሮ?" Gugu looks around. A fox trots past the fence. "ቀበሮ! ዶሮ, ቀበሮ!" Same at the end: they rhyme!`,
      am: "«ቤት የሚኖረው በቃሉ መጨረሻ ላይ ነው» አለች አያቴ። «ዶሮ… ሌላ በ‹ሮ› የሚያልቅ ምንድን ነው?» ጉጉ ዙሪያውን ተመለከተ። አንድ ቀበሮ ከአጥሩ አጠገብ አለፈ። «ቀበሮ! ዶሮ፣ ቀበሮ!» መጨረሻቸው አንድ ነው፤ ቤት መቱ!",
    },
    {
      en: `In the kitchen, Grandma's pot bubbles. "Shiro! ሽሮ ends in ሮ too! ዶሮ, ቀበሮ, ሽሮ!" Gugu writes them in a row, with ሮ in red. Same at the end: they rhyme!`,
      am: "በማብሰያ ቤቱ የአያቴ ድስት ይፍለቀለቃል። «ሽሮ! ሽሮም በ‹ሮ› ያልቃል! ዶሮ፣ ቀበሮ፣ ሽሮ!» ጉጉ በአንድ መስመር ጻፋቸው፤ «ሮ»ን በቀይ። መጨረሻቸው አንድ ነው፤ ቤት መቱ!",
    },
    {
      en: `At tea time Grandma pours ሻይ. A bird sits on the roof, ላይ. Gugu looks up at the ሰማይ. "ሻይ, ላይ, ሰማይ! They all end in ይ!" Same at the end: they rhyme!`,
      am: "በሻይ ሰዓት አያቴ ሻይ ቀዳች። አንዲት ወፍ በጣሪያው ላይ ተቀመጠች። ጉጉ ቀና ብሎ ሰማዩን ተመለከተ። «ሻይ፣ ላይ፣ ሰማይ! ሁሉም በ‹ይ› ያልቃሉ!» መጨረሻቸው አንድ ነው፤ ቤት መቱ!",
    },
    {
      en: `In the field, Anbessa kicks a ኳስ. A ፈረስ trots by, showing its big ጥርስ in a horsey grin. "ኳስ, ፈረስ, ጥርስ!" laughs Gugu. "All ስ!"`,
      am: "በሜዳው ላይ አንበሳ ኳስ መታ። አንድ ፈረስ ትልልቅ ጥርሶቹን እያሳየ እንደ ፈረስ እየሳቀ አለፈ። «ኳስ፣ ፈረስ፣ ጥርስ!» ብሎ ሳቀ ጉጉ። «ሁሉም ‹ስ›!»",
    },
    {
      en: `Then a monkey swings down from a tree, and scrambles straight back up. "ጦጣ መጣ, ዛፍ ላይ ወጣ! The monkey came, and up the tree he went! ጦጣ, መጣ, ወጣ!" Same at the end: they rhyme!`,
      am: "ከዚያ አንድ ጦጣ ከዛፍ ላይ ተንጠልጥሎ ወረደ፤ ወዲያውም ተመልሶ ወጣ። «ጦጣ መጣ፣ ዛፍ ላይ ወጣ! ጦጣ፣ መጣ፣ ወጣ!» መጨረሻቸው አንድ ነው፤ ቤት መቱ!",
    },
    {
      en: `Now Gugu has four rhyming families. "Can you make two lines that hit the house?" asks Grandma. Gugu thinks and thinks, and then he says: "ዶሮ በላች ሽሮ፣ ሸሸች ከቀበሮ!"`,
      am: "አሁን ጉጉ አራት የቤት ቤተሰቦች አሉት። «ቤት የሚመቱ ሁለት መስመሮች መሥራት ትችላለህ?» ብላ ጠየቀች አያቴ። ጉጉ አሰበ፣ አሰበ፤ ከዚያ እንዲህ አለ፦ «ዶሮ በላች ሽሮ፣ ሸሸች ከቀበሮ!»",
    },
    {
      en: `"The hen ate shiro, and ran from the fox!" Grandma claps. "That's a real little poem!" Anbessa and Tsehay say it with him, faster and faster, until they all fall over giggling.`,
      am: "አያቴ አጨበጨበች። «ያ እውነተኛ ትንሽ ግጥም ነው!» አንበሳና ፀሐይ ከእሱ ጋር ደጋግመው፣ እየፈጠኑ፣ እየፈጠኑ አሉት፤ እስኪሳሳቁ ድረስ ወደቁ።",
    },
    {
      en: `Next day at school, Gugu reads his rhyming families to the class. Then he reads his poem. Everyone joins in: "ዶሮ በላች ሽሮ፣ ሸሸች ከቀበሮ!" Same at the end: they rhyme!`,
      am: "በማግሥቱ በትምህርት ቤት ጉጉ የቤት ቤተሰቦቹን ለክፍሉ አነበበ። ከዚያ ግጥሙን አነበበ። ሁሉም ተቀላቀሉ፦ «ዶሮ በላች ሽሮ፣ ሸሸች ከቀበሮ!» መጨረሻቸው አንድ ነው፤ ቤት መቱ!",
    },
    {
      en: `That night in bed, Gugu whispers one more: "ጨረቃ ወጣች በሰማይ፣ ኮከብ ያበራል ከላይ…" "The moon came out in the sky, a star shines up high…" He yawns. "…I'll finish it tomorrow."`,
      am: "በዚያ ምሽት በአልጋው ላይ ጉጉ አንድ ተጨማሪ በሹክሹክታ አለ፦ «ጨረቃ ወጣች በሰማይ፣ ኮከብ ያበራል ከላይ…» ከዚያ አዛጋ። «…ነገ እጨርሰዋለሁ።»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why don't ዶሮ and ዳቦ rhyme?", "Can you find another word that ends like ኳስ and ፈረስ?"],
      am: ["ዶሮ እና ዳቦ ለምን ቤት አይመቱም?", "እንደ ኳስ እና ፈረስ የሚያልቅ ሌላ ቃል ማግኘት ትችላላችሁ?"],
    },
    activity: {
      en: "Play 'rhyme ping-pong': say a word (ሻይ), your child answers with a word that ends the same (ላይ), and back and forth until someone runs out. Then make a two-line rhyme together, like Gugu's.",
      am: "«የቤት ፒንግ ፖንግ» ተጫወቱ፦ አንድ ቃል በሉ (ሻይ)፤ ልጃችሁ በተመሳሳይ የሚያልቅ ቃል ይመልስ (ላይ)፤ አንዱ እስኪያልቅበት ድረስ ተቀባበሉ። ከዚያ እንደ ጉጉ ቤት የሚመታ ባለ ሁለት መስመር ግጥም አብራችሁ ሥሩ።",
    },
  },
};

export default story;
