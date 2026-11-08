import type { Story } from "../../../stories";

/*
  "Gugu Writes His Name ገ" (Fidel Foundations, level 4): the ገ family, and ጀ. In "Anbessa Writes
  His Name" Grandma promised Gugu his letter would come; here it does. At the big market (ገበያ),
  reached by horse cart (ጋሪ), the ገ family keep seven stalls, and Gugu sees that ጉ is his letter,
  twice: ጉ-ጉ. A camel (ግመል) chews by the stalls; ጀ sells Grandma a new coffee pot (ጀበና); on
  the way home a hyena (ጅብ) laughs in the dark. At home Gugu writes ጉጉ on the door.
  The join-in line is "Gu-gu, that's me!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the cart's ኳ፣ ኳ፣ ኳ (page 1), the hyena's laugh (ውውው-ፕ, page 8), እያመነዠከ for chewing the cud
  (page 5) and ጠመኔ for chalk (page 10).
*/
const story: Story = {
  id: "fidel-ge-gugu",
  course: "fidel-foundations",
  pack: "fidel",
  title: { en: "Gugu Writes His Name ገ", am: "ጉጉ ስሙን ጻፈ ገ" },
  category: "Fidel",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#A86A3A",
  scene: "lib-fidel-ge-gugu",
  coverPage: 10,
  teaches: { fidel: ["ገ", "ጀ"], words: ["ጉጉ", "ገበያ", "ጋሪ", "ግመል", "ጀበና", "ጅብ"] },
  pages: [
    {
      en: "Gugu has been waiting a long time. Anbessa wrote his name, and Lali wrote hers, but Gugu's name needed a letter he hadn't met. Until today!",
      am: "ጉጉ ለረጅም ጊዜ ሲጠብቅ ነበር። አንበሳ ስሙን ጻፈ፤ ላሊም የራሷን ጻፈች፤ የጉጉ ስም ግን ገና ያልተዋወቀውን ፊደል ይፈልግ ነበር። እስከ ዛሬ ድረስ!",
    },
    {
      en: `Grandma takes him to the big market on a horse cart. Clip-clop, clip-clop! Cart is ጋሪ: "ጋ… ሪ… ጋሪ!"`,
      am: "አያቴ በፈረስ ጋሪ ወደ ትልቁ ገበያ ወሰደችው። ኳ፣ ኳ፣ ኳ! «ጋ… ሪ… ጋሪ!»",
    },
    {
      en: `At the market gate, seven letters are selling things from seven stalls: the ገ family, ገ ጉ ጊ ጋ ጌ ግ ጎ. Their sound is "ga", like in garden.`,
      am: "በገበያው በር ሰባት ፊደሎች በሰባት መደቦች ዕቃ ይሸጣሉ፦ የገ ቤተሰብ፣ ገ ጉ ጊ ጋ ጌ ግ ጎ።",
    },
    {
      en: `"ገ… በ… ያ… ገበያ!" reads Gugu. Market starts with ገ! Then he stops and points at the second stall. "ጉ! ጉ is my letter!" Gu-gu, that's me!`,
      am: "«ገ… በ… ያ… ገበያ!» ብሎ አነበበ ጉጉ። ገበያ በገ ይጀምራል! ከዚያ ቆሞ ወደ ሁለተኛው መደብ ጠቆመ። «ጉ! ጉ የእኔ ፊደል ነው!» ጉ-ጉ፣ ያ እኔ ነኝ!",
    },
    {
      en: `"Your name is the same part twice," says Grandma. "ጉ, and ጉ again. Say it slowly: ጉ… ጉ. Now fast!" "ጉጉ!" Gu-gu, that's me!`,
      am: "«ስምህ ያው ክፍል ሁለት ጊዜ ነው» አለች አያቴ። «ጉ፣ እንደገና ጉ። ቀስ ብለህ በል፦ ጉ… ጉ። አሁን ፈጠን ብለህ!» «ጉጉ!» ጉ-ጉ፣ ያ እኔ ነኝ!",
    },
    {
      en: `Behind the stalls, a tall camel chews and chews. "ግ… መ… ል… ግመል!" The camel blinks its long eyelashes at Gugu, and Gugu blinks back.`,
      am: "ከመደቦቹ ጀርባ አንድ ረጅም ግመል እያመነዠከ ነው። «ግ… መ… ል… ግመል!» ግመሉ ረጃጅም ሽፋሽፍቱን አርገበገበለት፤ ጉጉም መልሶ አርገበገበ።",
    },
    {
      en: `At the pottery stall, a new letter is polishing a round coffee pot. "I'm ጀ, 'ja', like in jam. This is a ጀበና, for Grandma's coffee." "ጀ… በ… ና… ጀበና!"`,
      am: "በሸክላ መደቡ ላይ አንድ አዲስ ፊደል ክብ የቡና ማፍያ ያወለውላል። «እኔ ጀ ነኝ። ይህ ለአያቴ ቡና የሚሆን ጀበና ነው።» «ጀ… በ… ና… ጀበና!»",
    },
    {
      en: "The ጀ family wave from behind the pots: ጀ ጁ ጂ ጃ ጄ ጅ ጆ. Grandma buys the ጀበና, and Gugu carries it very, very carefully.",
      am: "የጀ ቤተሰብ ከሸክላዎቹ ጀርባ እጃቸውን አውለበለቡ፦ ጀ ጁ ጂ ጃ ጄ ጅ ጆ። አያቴ ጀበናውን ገዛች፤ ጉጉም በጣም፣ በጣም በጥንቃቄ ተሸከመው።",
    },
    {
      en: `On the way home, the sun goes down. From the dark bushes comes a giggly laugh: whoo-oop! "Who's that?" whispers Gugu.`,
      am: "ወደ ቤት ሲመለሱ ፀሐይ ጠለቀች። ከጨለማው ቁጥቋጦ ውስጥ የሚያስቅ ሳቅ ተሰማ፦ ውውው-ፕ! «ማነው?» አለ ጉጉ በሹክሹክታ።",
    },
    {
      en: `"Just a hyena, a ጅብ," says Grandma calmly. "ጅ… ብ… ጅብ. He's laughing because he can't read his name yet!" Gugu giggles too. Gu-gu, that's me!`,
      am: "«ጅብ ነው» አለች አያቴ ተረጋግታ። «ጅ… ብ… ጅብ። የሚስቀው ገና ስሙን ማንበብ ስለማይችል ነው!» ጉጉም ሳቀ። ጉ-ጉ፣ ያ እኔ ነኝ!",
    },
    {
      en: "At home, Gugu takes a piece of chalk and writes on the door, nice and big: ጉ ጉ. Then he writes them close together: ጉጉ.",
      am: "ቤት ሲደርሱ ጉጉ ጠመኔ ይዞ በሩ ላይ በትልቁ ጻፈ፦ ጉ ጉ። ከዚያ አቀራርቦ ጻፋቸው፦ ጉጉ።",
    },
    {
      en: `Anbessa and Lali come running to see. "ጉጉ!" they read together. Grandma pours coffee from the new ጀበና. "Gu-gu," sings Gugu, "that's me!"`,
      am: "አንበሳና ላሊ ለማየት እየሮጡ መጡ። «ጉጉ!» ብለው አብረው አነበቡ። አያቴ ከአዲሱ ጀበና ቡና ቀዳች። «ጉ-ጉ» ብሎ ዘመረ ጉጉ፣ «ያ እኔ ነኝ!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Gugu's name is the same part said twice: ጉ-ጉ. Can you think of other words with a part said twice?", "What would you buy at the market? Which letter does it start with?"],
      am: ["የጉጉ ስም ያው ክፍል ሁለት ጊዜ የተባለ ነው፦ ጉ-ጉ። አንድ ክፍል ሁለት ጊዜ የሚደገምባቸው ሌሎች ቃላትን ታውቃላችሁ?", "ገበያ ብትሄዱ ምን ትገዙ ነበር? በየትኛው ፊደል ይጀምራል?"],
    },
    activity: {
      en: "Write your child's name with one fidel per card. Mix the cards up and let your child put them back in order, then read the name slowly, and then fast.",
      am: "የልጃችሁን ስም በእያንዳንዱ ካርድ ላይ አንድ ፊደል አድርጋችሁ ጻፉ። ካርዶቹን አደባልቁና ልጃችሁ በቅደም ተከተል መልሶ ያስቀምጣቸው፤ ከዚያ ስሙን መጀመሪያ ቀስ ብሎ፣ ከዚያ ፈጠን ብሎ ያንብብ።",
    },
  },
};

export default story;
