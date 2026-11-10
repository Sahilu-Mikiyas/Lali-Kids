import type { Story } from "../../../stories";

/*
  "The Word Tree" (Amharic Readers, level 3): word families and compound words. Reading under
  the big fig tree (ዋርካ), Haben meets a word she doesn't know: ጸሐፊ. Grandma draws a tree in the
  dust: a root and its branches. ጻፈ (wrote), መጻፍ (to write), ጽሑፍ (writing), መጽሐፍ (book),
  ጸሐፊ (writer). Then the ተማረ tree: ተማሪ (pupil), መምህር (teacher), ትምህርት (lesson), and the
  ቤት words made of two words joined: ትምህርት ቤት, ምግብ ቤት, መኝታ ቤት, ወጥ ቤት, ቤተ መጻሕፍት.
  Haben notices that in Tigrinya, her home language, "book" is almost the same (መጽሓፍ):
  the two languages are cousins. Back in her book, she can now read the sentence with ጸሐፊዋ.
  The join-in line is "One root, many branches!" (አንድ ሥር፣ ብዙ ቅርንጫፎች!).

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line, how "root" is explained (pages 2–3) and the Tigrinya word (page 5).
*/
const story: Story = {
  id: "habens-word-tree",
  course: "amharic-readers",
  pack: "story",
  title: { en: "The Word Tree", am: "የቃላት ዛፍ" },
  category: "Fidel",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#3F7D3A",
  scene: "lib-habens-word-tree",
  coverPage: 3,
  teaches: { words: ["ጻፈ", "መጻፍ", "ጽሑፍ", "መጽሐፍ", "ጸሐፊ", "ተማሪ", "መምህር", "ትምህርት ቤት"] },
  pages: [
    {
      en: `Haben is reading in the shade of the big fig tree, the ዋርካ. Then she stops. There's a word she doesn't know: ጸሐፊ. She reads it piece by piece, "ጸ… ሐ… ፊ…", but what does it mean?`,
      am: "ሐበን በትልቁ ዋርካ ጥላ ሥር እያነበበች ነው። ድንገት ቆመች። የማታውቀው ቃል አለ፦ ጸሐፊ። ቁራሽ በቁራሽ አነበበችው፦ «ጸ… ሐ… ፊ…» ግን ምን ማለት ነው?",
    },
    {
      en: `Grandma sits down beside her. "When you don't know a word, look for its family. Words have families, just like people. Does ጸሐፊ remind you of a word you know?"`,
      am: "አያቴ አጠገቧ ተቀመጠች። «ቃሉን ሳታውቂው ስትቀሪ ቤተሰቡን ፈልጊ። ቃላት እንደ ሰዎች ቤተሰብ አላቸው። ጸሐፊ የምታውቂውን ቃል ያስታውስሻል?»",
    },
    {
      en: `Grandma draws a tree in the dust with a stick. At the bottom, the root: ጽ ሕ ፍ. "This root is about writing. Every word that grows from it has something to do with writing." One root, many branches!`,
      am: "አያቴ በአቧራው ላይ በዱላ ዛፍ ሣለች። ከታች ሥሩ፦ ጽ ሕ ፍ። «ይህ ሥር ስለ መጻፍ ነው። ከእሱ የሚበቅል እያንዳንዱ ቃል ከመጻፍ ጋር ግንኙነት አለው።» አንድ ሥር፣ ብዙ ቅርንጫፎች!",
    },
    {
      en: `On the branches she writes: ጻፈ, he wrote. መጻፍ, to write. ጽሑፍ, writing. መጽሐፍ, a book! "And ጸሐፊ," says Haben slowly, "is someone who writes… a writer!" One root, many branches!`,
      am: "በቅርንጫፎቹ ላይ ጻፈች፦ ጻፈ። መጻፍ። ጽሑፍ። መጽሐፍ! «ጸሐፊ ደግሞ» አለች ሐበን ቀስ ብላ፣ «የሚጽፍ ሰው ነው… ደራሲ!» አንድ ሥር፣ ብዙ ቅርንጫፎች!",
    },
    {
      en: `Haben's eyes light up. "At home we speak Tigrinya, and in Tigrinya a book is መጽሓፍ, almost the same!" "Amharic and Tigrinya are like cousins," says Grandma. "They share many roots."`,
      am: "የሐበን ዓይኖች አበሩ። «ቤታችን ትግርኛ እንናገራለን፤ በትግርኛ መጽሐፍ ‹መጽሓፍ› ይባላል፤ ከሞላ ጎደል ያው ነው!» «አማርኛና ትግርኛ እንደ ዘመዶች ናቸው» አለች አያቴ። «ብዙ ሥሮችን ይጋራሉ።»",
    },
    {
      en: `Anbessa comes home from school with his bag. "Let's grow another tree!" says Haben. The root ም ህ ር is about learning: ተማረ, he learned. ተማሪ, a pupil. መምህር, a teacher. ትምህርት, a lesson.`,
      am: "አንበሳ ቦርሳውን ይዞ ከትምህርት ቤት መጣ። «ሌላ ዛፍ እናብቅል!» አለች ሐበን። «ም ህ ር» የሚለው ሥር ስለ መማር ነው፦ ተማረ። ተማሪ። መምህር። ትምህርት።",
    },
    {
      en: `"I'm a ተማሪ, Teacher Meron is a መምህር, and today's ትምህርት was about frogs!" says Anbessa. "Three branches of the same tree!" One root, many branches!`,
      am: "«እኔ ተማሪ ነኝ፤ መምህርት መሮን መምህር ናቸው፤ የዛሬው ትምህርት ደግሞ ስለ እንቁራሪቶች ነበር!» አለ አንበሳ። «የአንድ ዛፍ ሦስት ቅርንጫፎች!» አንድ ሥር፣ ብዙ ቅርንጫፎች!",
    },
    {
      en: `Gugu swings down from the fig tree. "I know a different kind of tree: ቤት!" He adds a word in front of it: ትምህርት ቤት, school. ምግብ ቤት, a restaurant. መኝታ ቤት, a bedroom. ወጥ ቤት, a kitchen.`,
      am: "ጉጉ ከዋርካው ተንጠልጥሎ ወረደ። «እኔ ሌላ ዓይነት ዛፍ አውቃለሁ፦ ቤት!» ከፊቱ አንድ ቃል ጨመረበት፦ ትምህርት ቤት። ምግብ ቤት። መኝታ ቤት። ወጥ ቤት።",
    },
    {
      en: `"These are two words joined together," says Grandma. "Each one is a special kind of house." Tsehay adds the longest: ቤተ መጻሕፍት, the house of books, the library! Then Gugu shouts, "ሙዝ ቤት! A banana house!" Everyone laughs.`,
      am: "«እነዚህ ሁለት ቃላት ተያይዘው የተሠሩ ናቸው» አለች አያቴ። «እያንዳንዱ ልዩ ዓይነት ቤት ነው።» ፀሐይ ረጅሙን ጨመረች፦ ቤተ መጻሕፍት፣ የመጻሕፍት ቤት! ከዚያ ጉጉ «ሙዝ ቤት!» ብሎ ጮኸ። ሁሉም ሳቁ።",
    },
    {
      en: `"Is that a real word?" asks Anbessa. "Not yet," smiles Grandma. "But if Gugu ever opens a banana shop, maybe it will be!" Now the dust is full of trees, and every branch has a word on it.`,
      am: "«ያ እውነተኛ ቃል ነው?» አለ አንበሳ። «ገና አይደለም» አለች አያቴ ፈገግ ብላ። «ግን ጉጉ አንድ ቀን የሙዝ ሱቅ ከከፈተ ምናልባት ይሆናል!» አሁን አቧራው በዛፎች ተሞልቷል፤ በእያንዳንዱ ቅርንጫፍ ላይ ቃል አለ።",
    },
    {
      en: `Haben opens her book again and reads the sentence that stopped her: ጸሐፊዋ ስለ ዋርካ ጻፈች። "The writer wrote about a fig tree." Now she understands every word, and she looks up at the ዋርካ above her.`,
      am: "ሐበን መጽሐፏን እንደገና ከፍታ ያቆማትን ዓረፍተ ነገር አነበበች፦ «ጸሐፊዋ ስለ ዋርካ ጻፈች።» አሁን እያንዳንዱን ቃል ተረዳች፤ ከበላይዋ ወዳለው ዋርካም ቀና ብላ አየች።",
    },
    {
      en: `"One day," says Haben, "I'll be a ጸሐፊ too." She takes her pencil and writes her very first sentence about the tree: ዋርካው ትልቅ ነው፤ ጥላው ሰፊ ነው። "The fig tree is big; its shade is wide." The leaves rustle above them. One root, many branches!`,
      am: "«አንድ ቀን» አለች ሐበን፣ «እኔም ጸሐፊ እሆናለሁ።» እርሳሷን አንሥታ ስለ ዛፉ የመጀመሪያ ዓረፍተ ነገሯን ጻፈች፦ «ዋርካው ትልቅ ነው፤ ጥላው ሰፊ ነው።» ቅጠሎቹ ከበላያቸው ተንሿሿሹ። አንድ ሥር፣ ብዙ ቅርንጫፎች!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["How did Haben work out what ጸሐፊ means?", "Which other ቤት words do you know? What kind of house is each one?"],
      am: ["ሐበን «ጸሐፊ» ምን ማለት እንደሆነ እንዴት አወቀች?", "ሌሎች የ«ቤት» ቃላትን ታውቃላችሁ? እያንዳንዱ ምን ዓይነት ቤት ነው?"],
    },
    activity: {
      en: "Draw a word tree on paper. Write a root word at the bottom (ጻፈ, ተማረ or ቤት) and help your child add words on the branches. If your family speaks another language too, add the same words in it and see which ones look alike.",
      am: "በወረቀት ላይ የቃላት ዛፍ ሣሉ። ከታች አንድ ሥር ቃል ጻፉ (ጻፈ፣ ተማረ ወይም ቤት)፤ ልጃችሁ በቅርንጫፎቹ ላይ ቃላት እንዲጨምር እርዱት። ቤተሰባችሁ ሌላ ቋንቋም የሚናገር ከሆነ ተመሳሳዮቹን ቃላት በዚያ ቋንቋ ጨምሩና የትኞቹ እንደሚመሳሰሉ እዩ።",
    },
  },
};

export default story;
