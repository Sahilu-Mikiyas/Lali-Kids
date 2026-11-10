import type { Story } from "../../../stories";

/*
  "The Tall Stones of Aksum" (level 4: stories from our history: Aksum, its stelae and coins).
  Haben takes Anbessa to Aksum, in the north, where her aunt Saba is a guide. Anbessa thinks the
  tall stones are just big rocks. Auntie Saba shows him: each is carved from one single block of
  granite, like a tall house, with little windows and a false door; the tallest one fell long ago
  and lies broken on the ground. Anbessa wants to know who could make them. At the small museum
  he finds the answer in his paw: an old coin with a king's head and ears of wheat. Aksum was a
  great kingdom that traded across the Red Sea and made its own coins, and wrote in Ge'ez, the
  old language of the fidel. The problem: Anbessa drops the copy coin Auntie gave him in the
  grass and must find it by remembering what is on it; he spots the king and the wheat.
  Join-in line: "One stone, one piece, standing tall!"

  Facts (kept simple): Aksum was the capital of a powerful kingdom, from about two thousand years
  ago, that traded across the Red Sea; its stelae were carved from single blocks of granite and
  decorated like many-storeyed houses with windows and a false door; the biggest, the Great
  Stela, lies fallen and broken; King Ezana's stela still stands; Aksum minted its own gold,
  silver and bronze coins, some showing the king and ears of wheat or barley, and later a cross;
  inscriptions were written in Ge'ez. We avoid exact heights and dates beyond "very old".

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «አንድ ድንጋይ፣ አንድ ቁራጭ፣ ቀጥ ብሎ ቆሟል!» and «ሐውልት» for stela.
*/
const story: Story = {
  id: "aksum-tall-stones",
  course: "our-ethiopia",
  pack: "story",
  title: { en: "The Tall Stones of Aksum", am: "የአክሱም ረጃጅም ድንጋዮች" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#8A7A6A",
  scene: "lib-aksum-tall-stones",
  coverPage: 2,
  teaches: { words: ["history", "stone", "kingdom", "coin", "carve", "trade"] },
  pages: [
    {
      en: 'Haben took Anbessa north to Aksum, where her Auntie Saba showed visitors around. In a green field stood tall grey stones, pointing at the sky. "Just big rocks," said Anbessa.',
      am: "ሐበን አንበሳን ወደ ሰሜን ወደ አክሱም ወሰደችው፤ እዚያ አክስቷ ሳባ ጎብኚዎችን ታስጎበኝ ነበር። በአረንጓዴ ሜዳ ላይ ወደ ሰማይ የሚጠቁሙ ረጃጅም ግራጫ ድንጋዮች ቆመው ነበር። «ትልልቅ አለቶች ብቻ ናቸው» አለ አንበሳ።",
    },
    {
      en: 'Auntie Saba smiled. "Look closer." Anbessa looked. The stone had little windows carved on it, floor after floor, and a door at the bottom, like a tall, tall house!',
      am: "አክስት ሳባ ፈገግ አለች። «በቅርበት ተመልከት።» አንበሳ ተመለከተ። ድንጋዩ ላይ ፎቅ በፎቅ ትንንሽ መስኮቶች ተቀርጸው ነበር፤ ከታች ደግሞ በር፤ ልክ እንደ በጣም ረጅም ቤት!",
    },
    {
      en: '"Each one is carved from one single stone," said Auntie Saba. "Not built from many pieces. One stone, carved and smoothed, and lifted to stand up." One stone, one piece, standing tall!',
      am: "«እያንዳንዱ የተቀረጸው ከአንድ ድንጋይ ብቻ ነው» አለች አክስት ሳባ። «ከብዙ ቁራጮች አልተገነባም። አንድ ድንጋይ ተቀርጾ፣ ለስልሶ፣ ተነሥቶ እንዲቆም ተደርጓል።» አንድ ድንጋይ፣ አንድ ቁራጭ፣ ቀጥ ብሎ ቆሟል!",
    },
    {
      en: 'Behind them lay the biggest stone of all, broken in pieces on the ground. "It fell a very long time ago," said Auntie Saba. "It was taller than all the others." Anbessa walked its whole length. It took him so many steps!',
      am: "ከኋላቸው ከሁሉ የሚበልጠው ድንጋይ ተሰባብሮ መሬት ላይ ተኝቶ ነበር። «በጣም ከብዙ ዘመን በፊት ወደቀ» አለች አክስት ሳባ። «ከሌሎቹ ሁሉ ይረዝም ነበር።» አንበሳ ርዝመቱን ሙሉ ተራመደ። ብዙ ብዙ እርምጃ ወሰደበት!",
    },
    {
      en: '"But who made them?" asked Anbessa. "Long, long ago," said Haben, "Aksum was the city of a great kingdom. Its kings were rich and strong, and its people were clever carvers." One stone, one piece, standing tall!',
      am: "«ግን ማን ሠራቸው?» ብሎ ጠየቀ አንበሳ። «ከብዙ ብዙ ዘመን በፊት» አለች ሐበን፤ «አክሱም የአንድ ታላቅ መንግሥት ከተማ ነበረች። ነገሥታቷ ሀብታምና ብርቱ ነበሩ፤ ሕዝቦቿም ጎበዝ ቀራጮች ነበሩ።» አንድ ድንጋይ፣ አንድ ቁራጭ፣ ቀጥ ብሎ ቆሟል!",
    },
    {
      en: 'In the little museum there were old pots, and a stone covered in writing. "That is Ge\'ez," said Auntie Saba, "the old language of the fidel. Kings wrote their stories on stones like this."',
      am: "በትንሹ ሙዚየም ውስጥ ጥንታዊ ድስቶችና በጽሑፍ የተሸፈነ ድንጋይ ነበሩ። «ያ ግዕዝ ነው» አለች አክስት ሳባ፤ «የፊደል ጥንታዊ ቋንቋ። ነገሥታት ታሪካቸውን እንደዚህ ባለ ድንጋይ ላይ ይጽፉ ነበር።»",
    },
    {
      en: 'Then Anbessa saw tiny shining circles behind glass. "Coins! Aksum made its own money," said Auntie Saba, "gold, silver and bronze, with the king\'s face and two ears of wheat."',
      am: "ከዚያ አንበሳ ከመስታወቱ ጀርባ የሚያበሩ ትንንሽ ክቦችን አየ። «ሳንቲሞች! አክሱም የራሷን ገንዘብ ትሠራ ነበር» አለች አክስት ሳባ፤ «ወርቅ፣ ብርና ነሐስ፣ የንጉሡ ፊትና ሁለት የስንዴ ዛላዎች ያሉባቸው።»",
    },
    {
      en: '"With coins like these, Aksum traded with faraway lands across the Red Sea," she said. Ships came and went with ivory, gold, cloth and spices. She gave Anbessa a copy coin to keep. "Look after it!"',
      am: "«በእንደዚህ ያሉ ሳንቲሞች አክሱም ከቀይ ባሕር ማዶ ካሉ ሩቅ አገሮች ጋር ትነግድ ነበር» አለች። መርከቦች የዝሆን ጥርስ፣ ወርቅ፣ ጨርቅና ቅመም ይዘው ይመጡና ይሄዱ ነበር። ለአንበሳ የሚያስቀምጠው ቅጂ ሳንቲም ሰጠችው። «በደንብ ጠብቀው!»",
    },
    {
      en: 'Back in the field, Anbessa ran round and round the stones. Then he opened his paw. Empty! The coin was gone, somewhere in the long grass. His ears drooped.',
      am: "ወደ ሜዳው ሲመለሱ አንበሳ በድንጋዮቹ ዙሪያ ዞረ፣ ዞረ። ከዚያ እጁን ከፈተ። ባዶ! ሳንቲሙ በረጅሙ ሣር ውስጥ የሆነ ቦታ ጠፍቶ ነበር። ጆሮዎቹ ተኙ።",
    },
    {
      en: 'Lots of things glinted in the grass: a bottle top, a shiny pebble, a beetle. "Remember what is on it," buzzed Lali. A king\'s face… two ears of wheat… Anbessa looked carefully at each one.',
      am: "በሣሩ ውስጥ ብዙ ነገሮች ያብረቀርቁ ነበር፦ የጠርሙስ ክዳን፣ የሚያብረቀርቅ ጠጠር፣ ጥንዚዛ። «በላዩ ላይ ያለውን አስታውስ» አለች ላሊ። የንጉሥ ፊት… ሁለት የስንዴ ዛላዎች… አንበሳ እያንዳንዱን በጥንቃቄ ተመለከተ።",
    },
    {
      en: '"Found it!" A little king and two ears of wheat, right at the foot of the tall stone. Haben clapped. "You read it like a real historian!"',
      am: "«አገኘሁት!» ትንሽ ንጉሥና ሁለት የስንዴ ዛላዎች፣ ልክ ከረጅሙ ድንጋይ ሥር። ሐበን አጨበጨበች። «እንደ እውነተኛ የታሪክ ተመራማሪ አነበብከው!»",
    },
    {
      en: 'At sunset the tall stones glowed gold. "They\'re not just big rocks," said Anbessa softly. "They\'re a story, carved in stone, from a long, long time ago." One stone, one piece, standing tall!',
      am: "ፀሐይ ስትጠልቅ ረጃጅሞቹ ድንጋዮች በወርቅ አበሩ። «ትልልቅ አለቶች ብቻ አይደሉም» አለ አንበሳ በቀስታ። «ከብዙ ብዙ ዘመን በፊት በድንጋይ ላይ የተቀረጸ ታሪክ ናቸው።» አንድ ድንጋይ፣ አንድ ቁራጭ፣ ቀጥ ብሎ ቆሟል!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "How do you think people long ago carved and lifted a stone taller than a house, without machines?",
        "Anbessa found his coin by remembering what was on it. What is on the coins and notes we use today?",
      ],
      am: [
        "ከብዙ ዘመን በፊት ሰዎች ያለ ማሽን ከቤት የሚረዝም ድንጋይ እንዴት የቀረጹትና ያነሡት ይመስላችኋል?",
        "አንበሳ ሳንቲሙን ያገኘው በላዩ ላይ ያለውን በማስታወስ ነው። ዛሬ በምንጠቀምባቸው ሳንቲሞችና የወረቀት ገንዘቦች ላይ ምን አለ?",
      ],
    },
    activity: {
      en: "Make your own Aksum stela from a long box or a roll of card: draw windows floor by floor and a little door at the bottom. Then design your own coin on a round of paper: what picture would you put on it?",
      am: "ከረጅም ካርቶን ወይም ከተጠቀለለ ወረቀት የራሳችሁን የአክሱም ሐውልት ሥሩ፦ ፎቅ በፎቅ መስኮቶችንና ከታች ትንሽ በር ሣሉ። ከዚያ በክብ ወረቀት ላይ የራሳችሁን ሳንቲም ንድፍ አውጡ፦ ምን ሥዕል ታደርጉበታላችሁ?",
    },
  },
};

export default story;
