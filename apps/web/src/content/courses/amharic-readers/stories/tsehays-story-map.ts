import type { Story } from "../../../stories";

/*
  "Tsehay's Story Map" (Amharic Readers, level 4): story elements, by retelling a tale. It's Story
  Day at school and Tsehay wants to retell "The Clever Monkey" (the library tale of Tota the
  monkey and Zozo the crocodile, src/content/library/clever-monkey.ts), but she starts at the end
  and forgets where it happens. Teacher Meron shows her a story map: four boxes for the
  characters (ገጸ ባሕርያት), the setting (መቼት), the problem (ችግር) and the ending (መጨረሻ). Tsehay
  fills it in with pictures and a few words, and then tells the tale in order, beautifully.
  The join-in line is "Who? Where? What went wrong? How did it end?"
  (እነማን? የት? ምን ተበላሸ? እንዴት አለቀ?).

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line, «የታሪክ ካርታ» for story map and «የታሪክ ቀን» for Story Day.
*/
const story: Story = {
  id: "tsehays-story-map",
  course: "amharic-readers",
  pack: "story",
  title: { en: "Tsehay's Story Map", am: "የፀሐይ የታሪክ ካርታ" },
  category: "Fidel",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#2E8A6A",
  scene: "lib-tsehays-story-map",
  coverPage: 7,
  teaches: { words: ["የታሪክ ካርታ", "ገጸ ባሕርያት", "መቼት", "ችግር", "መጨረሻ"] },
  pages: [
    {
      en: `It's Story Day at school! Everyone will retell a tale they love. Tsehay chooses "The Clever Monkey", the tale of Tota the monkey and Zozo the crocodile.`,
      am: "በትምህርት ቤት የታሪክ ቀን ነው! ሁሉም የሚወዱትን ተረት መልሰው ይተርካሉ። ፀሐይ «ብልሁ ጦጣ»ን መረጠች፤ የቶታ ጦጣና የዞዞ አዞ ተረት።",
    },
    {
      en: `She stands up and begins: "So Tota jumped into the fig tree and was safe! Um… and before that… there was a crocodile… and…" The class looks puzzled.`,
      am: "ተነሥታ እንዲህ ብላ ጀመረች፦ «ስለዚህ ቶታ ወደ ሾላው ዛፍ ዘለለና ዳነ! እ… ከዚያ በፊት… አንድ አዞ ነበረ… እና…» ክፍሉ ግራ ተጋባ።",
    },
    {
      en: `"Where was the crocodile?" asks Haben. "And why did Tota need to be safe?" asks Gugu. Tsehay's cheeks go hot. She sits down. "I know the story, but it came out all muddled."`,
      am: "«አዞው የት ነበር?» ብላ ጠየቀች ሐበን። «ቶታ ለምን መዳን አስፈለገው?» ብሎ ጠየቀ ጉጉ። የፀሐይ ጉንጮች ሞቁ። ተቀመጠች። «ታሪኩን አውቀዋለሁ፤ ግን ተደበላልቆ ወጣ።»",
    },
    {
      en: `Teacher Meron draws four boxes on a big paper. "This is a story map, with four questions." Who? Where? What went wrong? How did it end?`,
      am: "መምህርት መሮን በትልቅ ወረቀት ላይ አራት ሳጥኖች ሣሉ። «ይህ የታሪክ ካርታ ነው፤ አራት ጥያቄዎች አሉት።» እነማን? የት? ምን ተበላሸ? እንዴት አለቀ?",
    },
    {
      en: `In the first box, Who?, Tsehay draws a little monkey and a big crocodile, and writes: ቶታ ጦጣ፣ ዞዞ አዞ። "Those are the characters," says Teacher Meron.`,
      am: "በመጀመሪያው ሳጥን፣ «እነማን?» ውስጥ፣ ፀሐይ ትንሽ ጦጣና ትልቅ አዞ ሣለችና ጻፈች፦ ቶታ ጦጣ፣ ዞዞ አዞ። «እነዚያ ገጸ ባሕርያቱ ናቸው» አሉ መምህርት መሮን።",
    },
    {
      en: `In the second box, Where?, she draws a river and a big fig tree full of sweet figs, and writes: ወንዝና የሾላ ዛፍ። "That's the setting: where the story happens."`,
      am: "በሁለተኛው ሳጥን፣ «የት?» ውስጥ፣ ወንዝና ጣፋጭ ፍሬ የሞላበት ትልቅ የሾላ ዛፍ ሣለችና ጻፈች፦ ወንዝና የሾላ ዛፍ። «ያ መቼቱ ነው፤ ታሪኩ የሚፈጸምበት ቦታ።»",
    },
    {
      en: `Third box: What went wrong? Tsehay writes: ዞዞ የቶታን ልብ ፈለገ። Zozo wanted Tota's heart! "That's the problem." Who? Where? What went wrong? How did it end?`,
      am: "ሦስተኛው ሳጥን፦ «ምን ተበላሸ?» ፀሐይ ጻፈች፦ ዞዞ የቶታን ልብ ፈለገ። «ያ ችግሩ ነው።» እነማን? የት? ምን ተበላሸ? እንዴት አለቀ?",
    },
    {
      en: `And the last box, How did it end?: Tota kept calm and said, "I left my heart in the fig tree!" Back on the bank, he leapt to safety. Tsehay writes: ቶታ ተረጋግቶ አሰበ፤ ዳነ።`,
      am: "የመጨረሻው ሳጥን፣ «እንዴት አለቀ?»፦ ቶታ ተረጋግቶ «ልቤን በሾላው ዛፍ ላይ ትቼዋለሁ!» አለ። ወደ ዳር ሲደርሱ ዘሎ ዳነ። ፀሐይ ጻፈች፦ ቶታ ተረጋግቶ አሰበ፤ ዳነ።",
    },
    {
      en: `Tsehay looks at her map. Now the whole story is there, in order, like a path through four rooms. "Can I try again?" she asks. Teacher Meron nods.`,
      am: "ፀሐይ ካርታዋን ተመለከተች። አሁን ታሪኩ በሙሉ በቅደም ተከተል አለ፤ በአራት ክፍሎች ውስጥ እንደሚያልፍ መንገድ። «እንደገና መሞከር እችላለሁ?» ብላ ጠየቀች። መምህርት መሮን ራሳቸውን ነቀነቁ።",
    },
    {
      en: `"ተረት ተረት!" "የመሠረት!" "Once, by a wide river, there lived a little monkey called Tota and a crocodile called Zozo…" Her finger moves from box to box as she tells it.`,
      am: "«ተረት ተረት!» «የመሠረት!» «በአንድ ወቅት፣ ከአንድ ሰፊ ወንዝ ዳር ቶታ የሚባል ትንሽ ጦጣና ዞዞ የሚባል አዞ ይኖሩ ነበር…» ስትተርክ ጣቷ ከሳጥን ወደ ሳጥን ይንቀሳቀሳል።",
    },
    {
      en: `When Tota leaps to safety, the class cheers. Gugu even does a monkey leap of his own. Who? Where? What went wrong? How did it end? Tsehay told all four!`,
      am: "ቶታ ዘሎ ሲድን ክፍሉ በደስታ ጮኸ። ጉጉ እንኳ የራሱን የጦጣ ዝላይ ዘለለ። እነማን? የት? ምን ተበላሸ? እንዴት አለቀ? ፀሐይ አራቱንም ተረከች!",
    },
    {
      en: `Teacher Meron pins Tsehay's story map on the wall. "Now every story we read," she says, "we can map it." Tsehay is already drawing four new boxes for tomorrow's tale.`,
      am: "መምህርት መሮን የፀሐይን የታሪክ ካርታ ግድግዳው ላይ ሰኩት። «ከአሁን ጀምሮ የምናነበውን ታሪክ ሁሉ» አሉ፣ «በካርታ ልናሳየው እንችላለን።» ፀሐይ ለነገው ተረት አራት አዳዲስ ሳጥኖችን እየሣለች ነው።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why did Tsehay's first telling come out muddled?", "Think of a story you know. Who is in it, where is it, what goes wrong, and how does it end?"],
      am: ["የፀሐይ የመጀመሪያ ትረካ ለምን ተደበላለቀ?", "የምታውቁትን ታሪክ አስቡ። በውስጡ እነማን አሉ? የት ነው? ምን ይበላሻል? እንዴት ያልቃል?"],
    },
    activity: {
      en: "Fold a paper into four boxes and make a story map of a favourite tale, with a drawing and a few words in each box. Then your child retells the tale using the map, moving a finger from box to box.",
      am: "ወረቀትን ለአራት አጥፋችሁ የምትወዱትን ተረት የታሪክ ካርታ ሥሩ፤ በእያንዳንዱ ሳጥን ውስጥ ሥዕልና ጥቂት ቃላት። ከዚያ ልጃችሁ ጣቱን ከሳጥን ወደ ሳጥን እያንቀሳቀሰ ካርታውን ተጠቅሞ ተረቱን ይተርክ።",
    },
  },
};

export default story;
