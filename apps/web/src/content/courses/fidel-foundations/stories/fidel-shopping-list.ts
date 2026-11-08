import type { Story } from "../../../stories";

/*
  "Grandma's Shopping List" (Fidel Foundations, level 6): reading for a real purpose. Grandma
  has hurt her foot, so Anbessa and Gugu go to the market with her list: ዳቦ፣ ቡና፣ ማር፣ ሙዝ እና
  ቲማቲም። They read the comma ፣ as a pause, ask and answer with ? and ። (ዳቦ አለ? አዎ፣ ዳቦ አለ።),
  read the stall signs (ቡና አለ።, ማር የለም።), and when there is no honey Lali fetches some from
  her cousins, the busy bees of በ. At home Anbessa writes one more line: ዛሬ እኛ ገዛን።
  The join-in line is "Read the list, tick it off!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line (ዝርዝሩን አንብብ፣ ምልክት አድርግ!), ምልክት አደረገበት for ticking off, ተንጫጫች for
  Lali's buzz (page 5) and the last line, ዛሬ እኛ ገዛን።
*/
const story: Story = {
  id: "fidel-shopping-list",
  course: "fidel-foundations",
  pack: "fidel",
  title: { en: "Grandma's Shopping List", am: "የአያቴ የገበያ ዝርዝር" },
  category: "Fidel",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#3E9B5A",
  scene: "lib-fidel-shopping-list",
  coverPage: 9,
  teaches: { words: ["ዳቦ፣ ቡና፣ ማር፣ ሙዝ እና ቲማቲም።", "ዳቦ አለ?", "ቡና አለ።", "ማር የለም።", "ዛሬ እኛ ገዛን።"] },
  pages: [
    {
      en: "Grandma has hurt her foot, so today Anbessa and Gugu must go to the market on their own. Grandma gives them a basket, and a list.",
      am: "አያቴ እግሯን ስለተጎዳች ዛሬ አንበሳና ጉጉ ብቻቸውን ወደ ገበያ መሄድ አለባቸው። አያቴ ቅርጫትና ዝርዝር ሰጠቻቸው።",
    },
    {
      en: `"Can you read it?" asks Grandma. Anbessa reads slowly: "ዳቦ፣ ቡና፣ ማር፣ ሙዝ እና ቲማቲም።" Bread, coffee, honey, bananas and tomatoes. Read the list, tick it off!`,
      am: "«ማንበብ ትችላላችሁ?» ብላ ጠየቀች አያቴ። አንበሳ ቀስ ብሎ አነበበ፦ «ዳቦ፣ ቡና፣ ማር፣ ሙዝ እና ቲማቲም።» ዝርዝሩን አንብብ፣ ምልክት አድርግ!",
    },
    {
      en: `"Why are there little marks between the words?" asks Gugu. "That's ፣, the comma," says Anbessa. "It means: pause, then the next thing." Lali comes along too, to help.`,
      am: "«በቃላቱ መካከል ያሉት ትንንሽ ምልክቶች ምንድን ናቸው?» ብሎ ጠየቀ ጉጉ። «ያ ነጠላ ሰረዝ ነው» አለ አንበሳ። «‹ቆም በል፤ ከዚያ ቀጣዩ› ማለት ነው።» ላሊም ልትረዳቸው አብራቸው መጣች።",
    },
    {
      en: `At the bread stall, the baker smiles. "ዳቦ አለ?" asks Anbessa. "Is there bread?" "አዎ፣ ዳቦ አለ።" "Yes, there is bread." Gugu ticks it off. Read the list, tick it off!`,
      am: "በዳቦ መደቡ ጋጋሪው ፈገግ አለ። «ዳቦ አለ?» ብሎ ጠየቀ አንበሳ። «አዎ፣ ዳቦ አለ።» ጉጉ ምልክት አደረገበት። ዝርዝሩን አንብብ፣ ምልክት አድርግ!",
    },
    {
      en: "Next, coffee. The coffee seller has a sign: ቡና አለ። \"There is coffee.\" Anbessa reads it all by himself and buys a little bag. Tick!",
      am: "ቀጥሎ ቡና። ቡና ሻጯ ምልክት አላት፦ ቡና አለ። አንበሳ ራሱ አንብቦ ትንሽ ከረጢት ገዛ። ምልክት!",
    },
    {
      en: `The honey stall has a sign too, but it says: ማር የለም። "There is no honey." Oh no! Lali buzzes. "I know where to find honey!"`,
      am: "የማር መደቡም ምልክት አለው፤ ግን እንዲህ ይላል፦ ማር የለም። ውይ! ላሊ ተንጫጫች። «ማር የት እንደሚገኝ አውቃለሁ!»",
    },
    {
      en: "She zooms off to her cousins' hive in Grandma's acacia, the busy bees of በ, and comes back with a little jar. Read the list, tick it off!",
      am: "በአያቴ ግራር ላይ ወዳለው ወደ አጎቷ ልጆች ቀፎ፣ ወደ በ ትጉ ንቦች በረረች፤ ትንሽ ማሰሮ ይዛም ተመለሰች። ዝርዝሩን አንብብ፣ ምልክት አድርግ!",
    },
    {
      en: `Bananas next. The banana seller asks, "ስንት ሙዝ?" "How many bananas?" Gugu reads the list again. It doesn't say! So he holds up five fingers. "አምስት!"`,
      am: "ቀጥሎ ሙዝ። የሙዝ ሻጯ «ስንት ሙዝ?» ብላ ጠየቀች። ጉጉ ዝርዝሩን እንደገና አነበበ። አይልም! ስለዚህ አምስት ጣቶቹን አሳየ። «አምስት!»",
    },
    {
      en: `Last, tomatoes. "ቲ… ማ… ቲ… ም," reads Gugu. "That's a long one!" The tomato seller gives them the reddest, roundest ones. Tick!`,
      am: "በመጨረሻ ቲማቲም። «ቲ… ማ… ቲ… ም» ብሎ አነበበ ጉጉ። «ይሄ ረጅም ነው!» የቲማቲም ሻጩ በጣም ቀይና ክብ የሆኑትን ሰጣቸው። ምልክት!",
    },
    {
      en: "Every word on the list has a tick. The basket is full and heavy, so the two friends carry it home together, one handle each. Read the list, tick it off!",
      am: "በዝርዝሩ ላይ ያለው እያንዳንዱ ቃል ምልክት አለው። ቅርጫቱ ሞልቶ ከብዷል፤ ሁለቱ ጓደኛሞች አንዳንድ እጀታ ይዘው አብረው ወደ ቤት ተሸከሙት። ዝርዝሩን አንብብ፣ ምልክት አድርግ!",
    },
    {
      en: `Grandma checks the basket. "ዳቦ፣ ቡና፣ ማር፣ ሙዝ እና ቲማቲም። Everything! And honey from Lali's own family!" She gives them each a big hug.`,
      am: "አያቴ ቅርጫቱን አየች። «ዳቦ፣ ቡና፣ ማር፣ ሙዝ እና ቲማቲም። ሁሉም አለ! ማሩ ደግሞ ከላሊ የራሷ ቤተሰብ!» ለእያንዳንዳቸው ትልቅ እቅፍ ሰጠቻቸው።",
    },
    {
      en: `Then Anbessa writes one more line at the bottom of the list and reads it out: ዛሬ እኛ ገዛን። "Today, we did the shopping." Grandma pins it on the wall, next to all their other words.`,
      am: "ከዚያ አንበሳ በዝርዝሩ ግርጌ አንድ ተጨማሪ መስመር ጽፎ አነበበው፦ ዛሬ እኛ ገዛን። አያቴ ከሌሎቹ ቃላቶቻቸው ሁሉ አጠገብ ግድግዳው ላይ ለጠፈችው።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["What does ፣ tell you to do when you read a list?", "Read ዳቦ አለ? and ዳቦ አለ። What is the difference?"],
      am: ["ዝርዝር ስታነቡ ነጠላ ሰረዝ ምን እንድታደርጉ ይነግራችኋል?", "ዳቦ አለ? እና ዳቦ አለ። ብላችሁ አንብቡ። ልዩነታቸው ምንድን ነው?"],
    },
    activity: {
      en: "Write a real shopping list together, with ፣ between the things (ሙዝ፣ ዳቦ፣ ወተት።). Take it to the shop or market and let your child read each word and tick it off.",
      am: "እውነተኛ የገበያ ዝርዝር አብራችሁ ጻፉ፤ በዕቃዎቹ መካከል ነጠላ ሰረዝ አድርጉ (ሙዝ፣ ዳቦ፣ ወተት።)። ወደ ሱቅ ወይም ገበያ ይዛችሁ ሂዱ፤ ልጃችሁ እያንዳንዱን ቃል አንብቦ ምልክት ያድርግበት።",
    },
  },
};

export default story;
