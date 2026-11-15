import type { Story } from "../../../stories";

/*
  "Why? Because!" (level 4: cause and effect with "because"; the main idea and details).
  After the long rains, Gugu asks Tsehay "Why?" about everything in Grandma's garden: why so many
  flowers, why the bees are so busy, why Grandma is smiling, why the grass is so green. Tsehay
  answers each with "because". When her head starts to spin, she works out that every answer
  comes back to one thing, and draws it: the rain in the middle, with arrows to the flowers, the
  bees, the honey, the grass, the cows and the river. That's the main idea; the rest are details.
  Join-in line: "Why? Because…!"

  English taught: why and because (cause and effect); main idea and details. Facts: Ethiopia's
  main rainy season (kiremt) is from about June to September; bees make honey from the nectar of
  flowers.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially «ዋና
  ሐሳብ» for main idea and «ዝርዝር» for details.
*/
const story: Story = {
  id: "why-because",
  course: "english-readers",
  pack: "story",
  title: { en: "Why? Because!", am: "ለምን? ምክንያቱም!" },
  category: "English",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#2E9A5B",
  scene: "lib-why-because",
  coverPage: 6,
  teaches: { words: ["why", "because", "main idea", "detail", "rain", "flowers", "bees", "honey"] },
  pages: [
    {
      en: "After the long rains, Grandma's garden was full of flowers. Gugu sat down by Tsehay. \"Why are there so many flowers?\"",
      am: "ከረጅሙ ክረምት በኋላ የአያቴ አትክልት በአበቦች ተሞላ። ጉጉ ከፀሐይ አጠገብ ተቀመጠ። «Why are there so many flowers?» (አበቦቹ ለምን በዙ?)",
    },
    {
      en: "\"Because it rained,\" said Tsehay. \"Flowers need water to grow.\" Why? Because…!",
      am: "«Because it rained» (ስለዘነበ ነው) አለች ፀሐይ። «አበቦች ለማደግ ውሃ ያስፈልጋቸዋል።» Why? Because…!",
    },
    {
      en: "\"Why are the bees so busy?\" \"Because there are so many flowers. Bees make honey from flowers.\"",
      am: "«ንቦቹ ለምን ሥራ በዙባቸው?» «Because there are so many flowers.» (አበቦቹ ስለበዙ ነው።) «ንቦች ከአበቦች ማር ይሠራሉ።»",
    },
    {
      en: "\"Why is Grandma smiling?\" \"Because the bees made lots of honey this year.\" Why? Because…!",
      am: "«አያቴ ለምን ፈገግ አለች?» «Because the bees made lots of honey.» (ንቦቹ ብዙ ማር ስለሠሩ ነው።) Why? Because…!",
    },
    {
      en: "\"Why is the grass so green? Why are the cows so fat? Why is the river so full? Why, why, WHY?\"",
      am: "«ሣሩ ለምን በጣም አረንጓዴ ሆነ? ላሞቹ ለምን ወፈሩ? ወንዙ ለምን ሞላ? ለምን፣ ለምን፣ ለምን?»",
    },
    {
      en: "Tsehay's head was spinning. Then she noticed something. All her answers came back to the same thing.",
      am: "የፀሐይ ራስ ዞረ። ከዚያ አንድ ነገር አስተዋለች። መልሶቿ ሁሉ ወደ አንድ ነገር ይመለሱ ነበር።",
    },
    {
      en: "She took a stick and drew in the dirt: RAIN in the middle, and arrows to the flowers, the bees, the grass, the cows and the river.",
      am: "በዱላ መሬቱ ላይ ሣለች፦ በመሃል RAIN (ዝናብ)፤ ከዚያ ወደ አበቦቹ፣ ንቦቹ፣ ሣሩ፣ ላሞቹና ወንዙ ቀስቶች።",
    },
    {
      en: "\"This is the main idea,\" said Tsehay. \"The rain helps everything grow. The rest are the details.\"",
      am: "«ይህ ዋናው ሐሳብ ነው» አለች ፀሐይ። «The rain helps everything grow.» (ዝናቡ ሁሉን ያሳድጋል።) «ሌሎቹ ዝርዝሮች ናቸው።»",
    },
    {
      en: "\"Why does the rain only come in the rainy season?\" \"Because that's when the big rain clouds come,\" said Tsehay. \"Every year.\"",
      am: "«ዝናቡ ለምን በክረምት ብቻ ይመጣል?» «ትልልቆቹ የዝናብ ደመናዎች የሚመጡት ያኔ ስለሆነ ነው» አለች ፀሐይ። «በየዓመቱ።»",
    },
    {
      en: "Grandma brought warm bread with honey. \"Why are you giving us honey?\" asked Gugu. \"Because you found the main idea!\"",
      am: "አያቴ ትኩስ ዳቦ ከማር ጋር አመጣች። «ማር ለምን ትሰጪናለሽ?» ብሎ ጠየቀ ጉጉ። «ዋናውን ሐሳብ ስላገኛችሁ ነው!»",
    },
    {
      en: "Gugu licked his fingers. \"Main idea: the rain is good. Detail: the honey is yummy!\" Why? Because…!",
      am: "ጉጉ ጣቶቹን ላሰ። «ዋና ሐሳብ፦ ዝናቡ ጥሩ ነው። ዝርዝር፦ ማሩ ይጣፍጣል!» Why? Because…!",
    },
    {
      en: "Why? Because…! What made you happy today, {name}? Why? What was the main idea of your day?",
      am: "Why? Because…! {name}፣ ዛሬ ምን አስደሰታችሁ? ለምን? የቀናችሁ ዋና ሐሳብ ምን ነበር?",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why were there so many flowers? Why were the bees busy?", "What was the main idea of the story? Can you name two details?"],
      am: ["አበቦቹ ለምን በዙ? ንቦቹ ለምን ሥራ በዙባቸው?", "የታሪኩ ዋና ሐሳብ ምን ነበር? ሁለት ዝርዝሮችን መጥቀስ ትችላላችሁ?"],
    },
    activity: {
      en: 'Play "Why? Because!": you say something you can see ("The floor is wet."), your child gives a reason with because ("…because it rained" or "…because I spilled my water!"). Then swap. After a story, ask: "What is it mostly about?" That is the main idea.',
      am: '«Why? Because!» ተጫወቱ፦ የምታዩትን አንድ ነገር ይበሉ («The floor is wet.» መሬቱ እርጥብ ነው)፤ ልጅዎ በbecause ምክንያት ይስጥ («…because it rained»)። ከዚያ ቦታ ተቀያየሩ። ከታሪክ በኋላ «ባብዛኛው ስለ ምንድን ነው?» ብለው ይጠይቁ፤ ያ ዋናው ሐሳብ ነው።',
    },
  },
};

export default story;
