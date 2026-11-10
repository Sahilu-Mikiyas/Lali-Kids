import type { Story } from "../../../stories";

/*
  "A Letter to Grandma" (Amharic Readers, level 6): writing a letter. Grandma has gone to visit
  her sister in Gondar, the old city of castles, and Anbessa (staying with Tsehay's family) misses
  her. Tsehay's mama helps him write a letter in three parts: the greeting (ለውድ አያቴ፣ እንደምን
  ሰነበትሽ?), the news (the hen's seven chicks, Gugu's rhymes, that he misses her) and the goodbye
  (የልጅ ልጅሽ፣ አንበሳ). He addresses the envelope and posts it at the post office (ፖስታ ቤት, a word
  from "The Longest Word"). A week later a reply comes from Gondar, with a drawing of a castle.
  The join-in line is "Hello, news, goodbye: that's a letter!" (ሰላምታ፣ ወሬ፣ ስንብት፦ ይኸው ደብዳቤ!).

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the letter's set phrases (ለውድ አያቴ፣ / እንደምን ሰነበትሽ? / ናፍቀሽኛል። / የልጅ ልጅሽ፣), the join-in
  line and «ስንብት» for the goodbye part.
  Fact: Gondar's royal castles (Fasil Ghebbi) are real and well known.
*/
const story: Story = {
  id: "anbessas-letter-to-grandma",
  course: "amharic-readers",
  pack: "story",
  title: { en: "A Letter to Grandma", am: "ለአያቴ የተጻፈ ደብዳቤ" },
  category: "Fidel",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#8A4FB0",
  scene: "lib-anbessas-letter-to-grandma",
  coverPage: 5,
  teaches: { words: ["ለውድ አያቴ፣", "እንደምን ሰነበትሽ?", "ናፍቀሽኛል።", "የልጅ ልጅሽ፣", "ደብዳቤ", "ፖስታ ቤት"] },
  pages: [
    {
      en: `Grandma has gone to visit her sister in Gondar, the old city of castles. Anbessa is staying with Tsehay's family. It's fun, but every evening he misses Grandma's stories.`,
      am: "አያቴ እህቷን ልትጠይቅ ወደ ጎንደር፣ ወደ ጥንታዊቱ የግንቦች ከተማ ሄዳለች። አንበሳ ከፀሐይ ቤተሰብ ጋር እየቆየ ነው። ደስ ይላል፤ ግን በየምሽቱ የአያቴን ተረቶች ይናፍቃል።",
    },
    {
      en: `"Why don't you write her a letter?" says Tsehay's mama. "A letter?" "Yes! A letter has three parts. Hello, news, goodbye." Hello, news, goodbye: that's a letter!`,
      am: "«ለምን ደብዳቤ አትጽፍላትም?» አለች የፀሐይ እናት። «ደብዳቤ?» «አዎ! ደብዳቤ ሦስት ክፍሎች አሉት። ሰላምታ፣ ወሬ፣ ስንብት።» ሰላምታ፣ ወሬ፣ ስንብት፦ ይኸው ደብዳቤ!",
    },
    {
      en: `First, the hello. Anbessa writes at the top: ለውድ አያቴ፣ "To my dear Grandma," and under it: እንደምን ሰነበትሽ? "How have you been?" "Don't forget the ? at the end," says Tsehay.`,
      am: "መጀመሪያ ሰላምታ። አንበሳ ከላይ ጻፈ፦ ለውድ አያቴ፣ ከሥሩ ደግሞ፦ እንደምን ሰነበትሽ? «መጨረሻ ላይ የጥያቄ ምልክቱን አትርሳ» አለች ፀሐይ።",
    },
    {
      en: `Next, the news. What has happened? Anbessa thinks, and writes: ዶሮዋ ሰባት ጫጩቶች አሏት። ጉጉ ግጥም ይጽፋል። "The hen has seven chicks. Gugu writes poems."`,
      am: "ቀጥሎ ወሬ። ምን ተከሰተ? አንበሳ አሰበና ጻፈ፦ ዶሮዋ ሰባት ጫጩቶች አሏት። ጉጉ ግጥም ይጽፋል።",
    },
    {
      en: `Then the most important news of all. He writes very carefully: ናፍቀሽኛል። "I miss you." He draws a little heart next to it. Hello, news, goodbye: that's a letter!`,
      am: "ከዚያ ከሁሉም የሚበልጠው ወሬ። በጣም በጥንቃቄ ጻፈ፦ ናፍቀሽኛል። አጠገቡ ትንሽ ልብ ሣለ። ሰላምታ፣ ወሬ፣ ስንብት፦ ይኸው ደብዳቤ!",
    },
    {
      en: `Last, the goodbye. At the bottom he writes: የልጅ ልጅሽ፣ "Your grandson," and under it, his name: አንበሳ. He reads the whole letter aloud. It sounds just like talking to Grandma.`,
      am: "በመጨረሻ ስንብት። ከታች ጻፈ፦ የልጅ ልጅሽ፣ ከሥሩ ደግሞ ስሙን፦ አንበሳ። ደብዳቤውን በሙሉ ጮክ ብሎ አነበበው። ልክ ከአያቴ ጋር እንደማውራት ይመስላል።",
    },
    {
      en: `He folds the letter into an envelope. On the front Tsehay's mama helps him write: ለአያቴ፣ ጎንደር። "To Grandma, Gondar." Gugu draws a stamp, just for fun.`,
      am: "ደብዳቤውን አጥፎ በፖስታ ውስጥ አስገባው። ከፊት ለፊቱ የፀሐይ እናት እየረዳችው ጻፈ፦ ለአያቴ፣ ጎንደር። ጉጉ ለጨዋታ ያህል ቴምብር ሣለ።",
    },
    {
      en: `They walk to the ፖስታ ቤት, the post office. Anbessa reads the sign himself. He drops the letter into the slot. Plop! "Off you go, all the way to Gondar!"`,
      am: "ወደ ፖስታ ቤት በእግር ሄዱ። አንበሳ ምልክቱን ራሱ አነበበ። ደብዳቤውን በቀዳዳው ውስጥ ጣለው። ፏ! «ሂድ፣ እስከ ጎንደር ድረስ!»",
    },
    {
      en: `Every day Anbessa asks, "Is there a letter for me?" Every day the answer is, "Not yet." He waits and waits. Hello, news, goodbye: that's a letter!`,
      am: "አንበሳ በየቀኑ «ለእኔ ደብዳቤ አለ?» ብሎ ይጠይቃል። በየቀኑ መልሱ «ገና ነው» ነው። ጠበቀ፣ ጠበቀ። ሰላምታ፣ ወሬ፣ ስንብት፦ ይኸው ደብዳቤ!",
    },
    {
      en: `Then one morning, an envelope! On the front: ለአንበሳ። Inside there is a drawing of a castle with round towers, and a letter in Grandma's curly writing.`,
      am: "ከዚያ አንድ ጧት፣ ፖስታ! ከፊቱ ላይ፦ ለአንበሳ። ውስጡ ክብ ማማዎች ያሉት የግንብ ሥዕልና በአያቴ ጠማማ የእጅ ጽሑፍ የተጻፈ ደብዳቤ አለ።",
    },
    {
      en: `Anbessa reads it himself: ለውድ የልጅ ልጄ አንበሳ፣ ደብዳቤህ በጣም አስደሰተኝ። ቅዳሜ እመለሳለሁ። አያትህ። "To my dear grandson Anbessa, your letter made me very happy. I'll be back on Saturday. Your Grandma."`,
      am: "አንበሳ ራሱ አነበበው፦ «ለውድ የልጅ ልጄ አንበሳ፣ ደብዳቤህ በጣም አስደሰተኝ። ቅዳሜ እመለሳለሁ። አያትህ።»",
    },
    {
      en: `"Hello, news, goodbye!" shouts Anbessa. "Grandma's letter has all three!" He pins it above his bed, and starts counting the days to Saturday. Hello, news, goodbye: that's a letter!`,
      am: "«ሰላምታ፣ ወሬ፣ ስንብት!» ብሎ ጮኸ አንበሳ። «የአያቴ ደብዳቤ ሦስቱንም ይዟል!» ከአልጋው በላይ ሰካውና እስከ ቅዳሜ ያሉትን ቀናት መቁጠር ጀመረ። ሰላምታ፣ ወሬ፣ ስንብት፦ ይኸው ደብዳቤ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["What are the three parts of a letter?", "Who would you like to write a letter to? What news would you tell them?"],
      am: ["የደብዳቤ ሦስቱ ክፍሎች ምንድን ናቸው?", "ለማን ደብዳቤ መጻፍ ትፈልጋላችሁ? ምን ወሬ ትነግሯቸዋላችሁ?"],
    },
    activity: {
      en: "Help your child write a real letter or a short message to a grandparent or relative far away: a hello (ለውድ…፣), two pieces of news, and a goodbye with their name. Send it, by post or as a photo on the phone, and wait for the reply together.",
      am: "ልጃችሁ ሩቅ ላሉ አያት ወይም ዘመድ እውነተኛ ደብዳቤ ወይም አጭር መልእክት እንዲጽፍ እርዱት፦ ሰላምታ (ለውድ…፣)፣ ሁለት ወሬዎች፣ እና ከስሙ ጋር ስንብት። በፖስታ ወይም በስልክ ፎቶ አድርጋችሁ ላኩት፤ መልሱንም አብራችሁ ጠብቁ።",
    },
  },
};

export default story;
