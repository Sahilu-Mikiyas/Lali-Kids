import type { Story } from "../../../stories";

/*
  "Water, Water ወ" (Fidel Foundations, level 4): the ወ family and the fourth sounds-alike pair,
  አ and ዐ. On a hot afternoon the friends go down to the river, where seven frogs on a log wear
  ወ ዉ ዊ ዋ ዌ ው ዎ. A fish swims by wearing ዓ: it sounds just like the voice letter አ, and Ethiopian
  children tell them apart as አልፋው አ ("alpha አ") and ዓይኑ ዐ ("eye ዐ", from ዓይን). Words read:
  ውሃ (water), ዋና (swimming), ዓሣ (fish, in its traditional spelling), ወተት (milk).
  The join-in line is "Splish, splash, into the water!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line (ፏ፣ ፏ፣ ወደ ውሃው!), ተዝለፍልፏል for a droopy mane (page 0), the fish's bubbling
  (ቡልቡል, እያንቦለቦለ) and how አልፋው አ / ዓይኑ ዐ are explained (page 8).
*/
const story: Story = {
  id: "fidel-we-water",
  course: "fidel-foundations",
  pack: "fidel",
  title: { en: "Water, Water ወ", am: "ውሃ፣ ውሃ ወ" },
  category: "Fidel",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#2E86C1",
  scene: "lib-fidel-we-water",
  coverPage: 5,
  teaches: { fidel: ["ወ", "ዐ"], words: ["ውሃ", "ዋና", "ዓሣ", "ወተት"] },
  pages: [
    {
      en: `It is a hot, hot afternoon. Anbessa's mane is all droopy, and Gugu's fur is fluffed up. "Water," sighs Anbessa. "I need water!"`,
      am: "በጣም፣ በጣም የሚያቃጥል ከሰዓት ነው። የአንበሳ ጎፈር ተዝለፍልፏል፤ የጉጉ ፀጉርም ተነፍቷል። «ውሃ» ብሎ ተነፈሰ አንበሳ። «ውሃ እፈልጋለሁ!»",
    },
    {
      en: "Down at the river, seven little frogs are sitting on a log. Each one wears a letter of the ወ family: ወ ዉ ዊ ዋ ዌ ው ዎ.",
      am: "ከወንዙ ዳር ሰባት ትንንሽ እንቁራሪቶች በግንድ ላይ ተቀምጠዋል። እያንዳንዳቸው የወ ቤተሰብን ፊደል ለብሰዋል፦ ወ ዉ ዊ ዋ ዌ ው ዎ።",
    },
    {
      en: `"ወ!" says the first frog: "wa", like in wonder. "ዉ!" says the second: "wu", like in wood. "ዊ!" says the third: "wi", like in we. Splish, splash, into the water!`,
      am: "«ወ!» አለ የመጀመሪያው እንቁራሪት። «ዉ!» አለ ሁለተኛው። «ዊ!» አለ ሦስተኛው። ፏ፣ ፏ፣ ወደ ውሃው!",
    },
    {
      en: `ዋ says "waa", like in wow, and does a belly flop. ዌ says "way", like in wave. ዎ says "wo", like in woke. Splish, splash, into the water!`,
      am: "ዋ «ዋ» ብሎ በሆዱ ዘሎ ገባ። ዌ «ዌ» ትላለች። ዎ «ዎ» ይላል። ፏ፣ ፏ፣ ወደ ውሃው!",
    },
    {
      en: `The littlest frog, ው, says just "w"… and then "ው… ሃ… ውሃ!" Water starts with ው! Anbessa dips his paws in. Ahhh, cool.`,
      am: "ከሁሉም ትንሹ እንቁራሪት ው «ው» ብቻ ይላል… ከዚያ «ው… ሃ… ውሃ!» ውሃ በው ይጀምራል! አንበሳ መዳፎቹን ውሃው ውስጥ ነከረ። አቤት፣ እንዴት ይቀዘቅዛል።",
    },
    {
      en: `"Let's swim!" says ዋ. "That's ዋና: ዋ… ና… ዋና!" Gugu holds his nose and jumps in. Splish, splash, into the water!`,
      am: "«እንዋኝ!» አለ ዋ። «ያ ዋና ነው፦ ዋ… ና… ዋና!» ጉጉ አፍንጫውን ይዞ ዘሎ ገባ። ፏ፣ ፏ፣ ወደ ውሃው!",
    },
    {
      en: "Something shiny wiggles past Anbessa's toes. Blub, blub! It's a fish, and it's wearing a letter he has never seen: ዓ.",
      am: "አንድ የሚያብረቀርቅ ነገር በአንበሳ ጣቶች አጠገብ እየተወራጨ አለፈ። ቡልቡል! ዓሣ ነው፤ አንበሳ አይቶት የማያውቀውን ፊደል ለብሷል፦ ዓ።",
    },
    {
      en: `"I'm ዓ, from the ዐ family," bubbles the fish. "Fish is ዓሣ: ዓ… ሣ… ዓሣ! I sound just like አ, the voice letter, but I live in different words."`,
      am: "«እኔ ከዐ ቤተሰብ ዓ ነኝ» አለ ዓሣው እያንቦለቦለ። «ዓ… ሣ… ዓሣ! ድምፄ ልክ እንደ ድምፅ ፊደሉ አ ነው፤ ግን የምኖረው በተለያዩ ቃላት ውስጥ ነው።»",
    },
    {
      en: `"How can we tell you apart?" asks Lali. "Easy!" says the fish. "አ is the alpha አ. I am the eye ዐ, because the word for eye, ዓይን, starts with me." Same sound, different look!`,
      am: "«እንዴት እንለያችኋለን?» ብላ ጠየቀች ላሊ። «ቀላል ነው!» አለ ዓሣው። «አ አልፋው አ ይባላል። እኔ ደግሞ ዓይኑ ዐ ነኝ፤ ምክንያቱም ዓይን በእኔ ይጀምራል።» ድምፃቸው አንድ፣ መልካቸው ሁለት!",
    },
    {
      en: `When they climb out, dripping, Grandma is waiting with cups of cold milk. "ወ… ተ… ት… ወተት!" reads Gugu. Milk starts with ወ!`,
      am: "ከውሃው ወጥተው ሲንጠባጠቡ አያቴ ቀዝቃዛ ወተት ይዛ ትጠብቃቸዋለች። «ወ… ተ… ት… ወተት!» ብሎ አነበበ ጉጉ። ወተት በወ ይጀምራል!",
    },
    {
      en: "The frogs line up on the log and sing their family song, and the fish blows bubbles to the beat: ወ ዉ ዊ ዋ ዌ ው ዎ! Splish, splash, into the water!",
      am: "እንቁራሪቶቹ በግንዱ ላይ ተሰልፈው የቤተሰባቸውን ዘፈን ዘመሩ፤ ዓሣውም በምቱ አረፋ ነፋ፦ ወ ዉ ዊ ዋ ዌ ው ዎ! ፏ፣ ፏ፣ ወደ ውሃው!",
    },
    {
      en: `On the way home, Anbessa isn't droopy any more. "Today I learnt ውሃ, ዋና, ዓሣ and ወተት," he says. "Four wet words!"`,
      am: "ወደ ቤት ሲመለሱ አንበሳ ከእንግዲህ አልተዝለፈለፈም። «ዛሬ ውሃ፣ ዋና፣ ዓሣ እና ወተት የሚሉትን ቃላት ተማርኩ» አለ። «አራት እርጥብ ቃላት!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["አ and ዐ sound the same. What names help us tell them apart? (The alpha አ, and the eye ዐ, from ዓይን.)", "Which of today's words are wet? Can you think of another word about water?"],
      am: ["አ እና ዐ አንድ ዓይነት ድምፅ አላቸው። እንድንለያቸው የሚረዱን ስሞች ምንድን ናቸው? (አልፋው አ፣ ዓይኑ ዐ ከዓይን።)", "ከዛሬዎቹ ቃላት እርጥብ የሆኑት የትኞቹ ናቸው? ስለ ውሃ ሌላ ቃል ታውቃላችሁ?"],
    },
    activity: {
      en: "Put a bowl of water on the table with little paper fish. Write ወ ዉ ዊ ዋ ዌ ው ዎ on the fish. Your child 'catches' one and says its sound. Catch ው, then a card with ሃ, to make ውሃ!",
      am: "ጠረጴዛው ላይ አንድ ሳህን ውሃና ትንንሽ የወረቀት ዓሦችን አስቀምጡ። በዓሦቹ ላይ ወ ዉ ዊ ዋ ዌ ው ዎ ጻፉ። ልጃችሁ አንዱን «ያጥምድና» ድምፁን ይናገር። ውን፣ ከዚያ ሃ የሚል ካርድ ያዘ፤ ውሃ ይሆናል!",
    },
  },
};

export default story;
