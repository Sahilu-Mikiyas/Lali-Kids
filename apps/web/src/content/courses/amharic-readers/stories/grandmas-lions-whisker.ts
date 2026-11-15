import type { Story } from "../../../stories";

/*
  "The Lion's Whisker" (Amharic Readers, level 4): the well-known Ethiopian folktale, told by
  Grandma by the fire as a ተረት, with the traditional opening («ተረት ተረት» / «የመሠረት»). A woman,
  Bizunesh, marries a farmer whose little son, Tesfaye, misses his own mother and will not let her
  near. A wise old man tells her to bring three whiskers from a living lion. Day by day she brings
  the lion meat, a little closer each time, until he eats beside her and she can take the
  whiskers. The old man throws them in the fire: be as patient with the boy as you were with the
  lion. She is, and the boy comes to love her. Afterwards Grandma asks the four story questions:
  characters (ገጸ ባሕርያት), setting (መቼት), problem (ችግር) and ending (መጨረሻ). The join-in line is
  "Little by little, closer and closer!" (ቀስ በቀስ፣ ቀረብ ቀረብ!).
  Kept gentle: the lion is never fierce on the page; the boy's sadness is named simply.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the traditional opening and answer («ተረት ተረት» / «የመሠረት»), the join-in line, «ጠቢብ ሽማግሌ»
  for the wise old man, and the terms ገጸ ባሕርያት and መቼት for young children.
*/
const story: Story = {
  id: "grandmas-lions-whisker",
  course: "amharic-readers",
  pack: "story",
  title: { en: "The Lion's Whisker", am: "የአንበሳው ጢም" },
  category: "Fidel",
  ageBands: ["6-7", "8-9"],
  isFree: true,
  color: "#B5651D",
  scene: "lib-grandmas-lions-whisker",
  coverPage: 6,
  teaches: { words: ["ተረት ተረት", "የመሠረት", "ገጸ ባሕርያት", "መቼት", "ችግር", "መጨረሻ"] },
  pages: [
    {
      en: `By the fire, Grandma smiles. "ተረት ተረት," she says, and the children answer, "የመሠረት!" That's how a folktale begins. "Tonight," says Grandma, "a tale about a lion." Anbessa sits up very straight.`,
      am: "አያቴ ከእሳቱ አጠገብ ፈገግ አለች። «ተረት ተረት» አለች፤ ልጆቹም «የመሠረት!» ብለው መለሱ። ተረት እንዲህ ነው የሚጀመረው። «ዛሬ ማታ» አለች አያቴ፣ «ስለ አንበሳ ተረት።» አንበሳ ቀጥ ብሎ ተቀመጠ።",
    },
    {
      en: `Long ago, in a village below the mountains, Bizunesh married a farmer. His little son Tesfaye missed his own mother so much that he would not even look at her.`,
      am: "ከብዙ ዘመን በፊት፣ ከተራሮቹ ሥር ባለች መንደር፣ ብዙነሽ አንድ ገበሬ አገባች። የገበሬው ትንሽ ልጅ ተስፋዬ እናቱን በጣም ስለናፈቀ ብዙነሽን ቀና ብሎ እንኳ አያያትም ነበር።",
    },
    {
      en: `She made him sweet bread; he pushed it away. She sang him songs; he turned his back. "What can I do?" she cried. So she went to see a wise old man who lived at the edge of the village.`,
      am: "ጣፋጭ ዳቦ ጋገረችለት፤ ገፋው። ዘፈን ዘፈነችለት፤ ጀርባውን ሰጣት። «ምን ላድርግ?» ብላ አለቀሰች። ስለዚህ በመንደሩ ዳር ወደሚኖሩ አንድ ጠቢብ ሽማግሌ ሄደች።",
    },
    {
      en: `The wise old man listened. Then he said, "I can help you. But first, bring me three whiskers from a living lion." Bizunesh's knees shook. A living lion!`,
      am: "ጠቢቡ ሽማግሌ አዳመጡ። ከዚያ «ልረዳሽ እችላለሁ» አሉ። «ግን መጀመሪያ ከሕያው አንበሳ ሦስት የጢም ጠጉር አምጪልኝ።» የብዙነሽ ጉልበቶች ተንቀጠቀጡ። ሕያው አንበሳ!",
    },
    {
      en: `That night she took some meat up to the lion's cave. When the lion roared, she put the meat down, far away, and ran home as fast as she could. Little by little, closer and closer!`,
      am: "በዚያ ምሽት ትንሽ ሥጋ ይዛ ወደ አንበሳው ዋሻ ወጣች። አንበሳው ሲያገሣ ሥጋውን ሩቅ አስቀምጣ በፍጥነት ወደ ቤቷ ሮጠች። ቀስ በቀስ፣ ቀረብ ቀረብ!",
    },
    {
      en: `The next day she came again, and put the meat down a little closer. And the next day, a little closer still. Every day she waited a little longer. Little by little, closer and closer!`,
      am: "በማግሥቱ እንደገና መጣችና ሥጋውን ትንሽ ቀረብ አድርጋ አስቀመጠች። በሚቀጥለውም ቀን ይበልጥ ቀረብ አደረገች። በየቀኑ ትንሽ ረዘም ብላ ቆየች። ቀስ በቀስ፣ ቀረብ ቀረብ!",
    },
    {
      en: `After many weeks, the lion came to eat right beside her. He knew her now. He even let her stroke his golden mane while he ate. Bizunesh was not afraid any more.`,
      am: "ከብዙ ሳምንታት በኋላ አንበሳው ልክ ከአጠገቧ ሆኖ መብላት ጀመረ። አሁን ያውቃት ነበር። ሲበላ ወርቃማ ጋሹን እንድትዳብስ እንኳ ፈቀደላት። ብዙነሽ ከእንግዲህ አልፈራችም።",
    },
    {
      en: `One evening, very gently, she pulled out three of his whiskers. The lion just went on eating. She ran down the mountain to the wise old man, holding the whiskers tight.`,
      am: "አንድ ምሽት በጣም በቀስታ ሦስት የጢም ጠጉሮቹን ነቀለች። አንበሳው መብላቱን ቀጠለ። ጢሞቹን አጥብቃ ይዛ ተራራውን ወርዳ ወደ ጠቢቡ ሽማግሌ ሮጠች።",
    },
    {
      en: `The old man took the whiskers… and threw them into the fire! "Oh!" cried Bizunesh. "You won a wild lion with patience. Be as patient with the boy, and you'll win him too."`,
      am: "ሽማግሌው ጢሞቹን ተቀበሉ… ከዚያ እሳት ውስጥ ጣሏቸው! «ወይ!» አለች ብዙነሽ። «የዱር አንበሳን በትዕግሥት አሸነፍሽ። አሁን ለልጁም እንደዚሁ ታገሺ፤ እሱንም ታሸንፊዋለሽ።»",
    },
    {
      en: `So Bizunesh went home and was patient. She left a little bread by his bed. She sat a little nearer every day. Then one morning Tesfaye smiled, and took her hand. Little by little, closer and closer!`,
      am: "ስለዚህ ብዙነሽ ወደ ቤት ሄዳ ታገሠች። ከአልጋው አጠገብ ትንሽ ዳቦ አስቀመጠች። በየቀኑ ትንሽ ቀረብ ብላ ተቀመጠች። ከዚያ አንድ ጧት ተስፋዬ ፈገግ አለና እጇን ያዘ። ቀስ በቀስ፣ ቀረብ ቀረብ!",
    },
    {
      en: `Anbessa strokes his own little whiskers and laughs. "Now," says Grandma, "who are the characters? Where does it happen? What's the problem? How does it end?" Hands go up.`,
      am: "አንበሳ የራሱን ትንንሽ ጢሞች እየዳበሰ ሳቀ። «እሺ» አለች አያቴ፣ «ገጸ ባሕርያቱ እነማን ናቸው? የት ነው የሚፈጸመው? ችግሩ ምንድን ነው? መጨረሻውስ እንዴት ነው?» እጆች ወደ ላይ ወጡ።",
    },
    {
      en: `"Bizunesh, Tesfaye, the lion and the wise man!" "A village and a lion's cave!" "Tesfaye wouldn't love her." "She was patient, and he did!" "Every good ተረት has all four," says Grandma.`,
      am: "«ብዙነሽ፣ ተስፋዬ፣ አንበሳውና ጠቢቡ ሽማግሌ!» «መንደርና የአንበሳ ዋሻ!» «ተስፋዬ አልወደዳትም ነበር።» «ታገሠች፤ እሱም ወደዳት!» «ጥሩ ተረት ሁሉ አራቱንም ይዟል» አለች አያቴ።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why did the wise old man throw the whiskers into the fire?", "Who are the characters, where does it happen, what is the problem and how does it end?"],
      am: ["ጠቢቡ ሽማግሌ ጢሞቹን ለምን እሳት ውስጥ ጣሏቸው?", "ገጸ ባሕርያቱ እነማን ናቸው? የት ይፈጸማል? ችግሩ ምንድን ነው? እንዴት ያልቃል?"],
    },
    activity: {
      en: "Tell a ተረት the traditional way: you say «ተረት ተረት», your child answers «የመሠረት», then tell any tale you know. Afterwards draw a 'story map' together: four boxes for characters, setting, problem and ending.",
      am: "ተረትን በባህሉ መንገድ ንገሩ፦ እናንተ «ተረት ተረት» ስትሉ ልጃችሁ «የመሠረት» ይበል፤ ከዚያ የምታውቁትን ተረት ንገሩ። በኋላ አብራችሁ «የታሪክ ካርታ» ሣሉ፦ ለገጸ ባሕርያት፣ ለመቼት፣ ለችግርና ለመጨረሻ አራት ሳጥኖች።",
    },
  },
};

export default story;
