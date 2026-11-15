import type { Story } from "../../../stories";

/*
  "First, Next, Then, Last" (level 4: sequencing; first, next, then, last).
  Grandma is teaching Tsehay the coffee ceremony, and Gugu wants to help. Grandma draws the four
  steps on cards: wash the beans, roast them, grind them, boil them in the jebena. Gugu drops the
  cards and muddles them, and tries to grind the beans before they are roasted (they are wet and
  green!). Tsehay works out how to put the cards back: what has to happen before what? She lays
  them out with the order words First, Next, Then, Last, and they make the coffee in the right
  order, with the cups (sini) and popcorn at the end.
  Join-in line: "First, next, then, last!"

  English taught: the order words first, next, then, last; putting steps in order; reading short
  instructions. Fact: in the coffee ceremony the green beans are washed, roasted in a pan, ground
  (in a mukecha, a wooden mortar), boiled in a clay jebena and poured into small cups (sini).

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «መጀመሪያ፣ ቀጥሎ፣ ከዚያ፣ በመጨረሻ!».
*/
const story: Story = {
  id: "coffee-steps",
  course: "english-readers",
  pack: "story",
  title: { en: "First, Next, Then, Last", am: "መጀመሪያ፣ ቀጥሎ፣ ከዚያ፣ በመጨረሻ" },
  category: "English",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#7A4A26",
  scene: "lib-coffee-steps",
  coverPage: 10,
  teaches: { words: ["first", "next", "then", "last", "wash", "roast", "grind", "boil", "pour"] },
  pages: [
    {
      en: "It was Sunday. Grandma was going to make coffee, the way she always did. \"Tsehay, today you can help me,\" she said.",
      am: "እሑድ ነበር። አያቴ እንደ ሁልጊዜው ቡና ልታፈላ ነበር። «ፀሐይ፣ ዛሬ ልትረጂኝ ትችያለሽ» አለች።",
    },
    {
      en: "\"Me too!\" said Gugu. Grandma smiled. She drew four little cards: one for each step. \"Coffee has an order,\" she said.",
      am: "«እኔም!» አለ ጉጉ። አያቴ ፈገግ አለች። አራት ትንንሽ ካርዶችን ሣለች፤ ለእያንዳንዱ ደረጃ አንድ። «ቡና ቅደም ተከተል አለው» አለች።",
    },
    {
      en: "Wash the beans. Roast the beans. Grind the beans. Boil the coffee. \"First, next, then, last!\" sang Grandma.",
      am: "«Wash the beans» (ፍሬውን እጠቡ)። «Roast» (ቁሉ)። «Grind» (ውቀጡ)። «Boil» (አፍሉ)። «First, next, then, last!» ብላ ዘመረች አያቴ።",
    },
    {
      en: "Then Gugu tripped. The cards flew up and came down in a muddle. Gugu grabbed the top one. \"Grind!\"",
      am: "ከዚያ ጉጉ ተደናቀፈ። ካርዶቹ ወደ ላይ በረው ተደበላልቀው ወደቁ። ጉጉ ከላይ ያለውን ያዘ። «Grind!» (ውቀጡ!)",
    },
    {
      en: "He tipped the beans into the mortar. Bang, bang! But the beans were green and wet. They just went squish.",
      am: "ፍሬውን ሙቀጫው ውስጥ ገለበጠው። ድብ፣ ድብ! ግን ፍሬው አረንጓዴና እርጥብ ነበር። ዝም ብሎ ተጨማለቀ።",
    },
    {
      en: "Tsehay picked up the cards. \"What has to happen before what?\" she said. \"We can't grind wet beans. Washing comes first!\"",
      am: "ፀሐይ ካርዶቹን አነሳች። «ምን ከምን በፊት መምጣት አለበት?» አለች። «እርጥብ ፍሬ መውቀጥ አንችልም። ማጠብ መጀመሪያ ነው!»",
    },
    {
      en: "She laid the cards in a row. \"First, wash. Next, roast. Then, grind. Last, boil.\" First, next, then, last!",
      am: "ካርዶቹን በረድፍ አስቀመጠች። «First, wash. Next, roast. Then, grind. Last, boil.» (መጀመሪያ እጠብ፣ ቀጥሎ ቁላ፣ ከዚያ ውቀጥ፣ በመጨረሻ አፍላ።)",
    },
    {
      en: "First, they washed the green beans in a bowl of water. Splish, splash! Gugu washed his hands too.",
      am: "First፦ አረንጓዴውን ፍሬ በሳህን ውሃ አጠቡት። ሽልክ፣ ሽልክ! ጉጉም እጁን ታጠበ።",
    },
    {
      en: "Next, Grandma roasted them in a pan. They turned brown and crackled. The smoke smelled so good!",
      am: "Next፦ አያቴ በምጣድ ቆላቻቸው። ቡናማ ሆነው ተንጣጡ። ጭሱ እንዴት ደስ ይላል!",
    },
    {
      en: "Then Gugu ground the brown beans in the mortar. Bang, bang! This time the coffee turned to soft powder.",
      am: "Then፦ ጉጉ ቡናማውን ፍሬ በሙቀጫ ወቀጠ። ድብ፣ ድብ! በዚህ ጊዜ ቡናው ለስላሳ ዱቄት ሆነ።",
    },
    {
      en: "Last, the coffee boiled in the jebena, and Grandma poured it into little cups. \"First, next, then, last!\" said Gugu.",
      am: "Last፦ ቡናው በጀበናው ፈላ፤ አያቴም በትንንሽ ሲኒዎች ቀዳችው። «First, next, then, last!» አለ ጉጉ።",
    },
    {
      en: "What do you do first in the morning, {name}? What do you do next, then, last? First, next, then, last!",
      am: "{name}፣ ጠዋት መጀመሪያ ምን ታደርጋላችሁ? ቀጥሎ፣ ከዚያ፣ በመጨረሻስ? First, next, then, last!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why didn't grinding the beans work at first?", "Can you tell the coffee steps in order: first, next, then, last?"],
      am: ["ፍሬውን መውቀጥ መጀመሪያ ለምን አልሠራም?", "የቡናውን ደረጃዎች በቅደም ተከተል መናገር ትችላላችሁ፦ first, next, then, last?"],
    },
    activity: {
      en: 'Choose something you do together (making tea, getting ready for school, planting a seed). Draw or write the four steps on scraps of paper, mix them up, and let your child put them in order, saying "First…, next…, then…, last…" out loud.',
      am: 'አብራችሁ የምታደርጉትን አንድ ነገር ምረጡ (ሻይ ማፍላት፣ ለትምህርት ቤት መዘጋጀት፣ ዘር መዝራት)። አራቱን ደረጃዎች በወረቀት ቁርጥራጮች ላይ ሣሉ ወይም ጻፉ፤ ደበላልቋቸው፤ ልጅዎ «First…, next…, then…, last…» እያለ በቅደም ተከተል ያስቀምጣቸው።',
    },
  },
};

export default story;
