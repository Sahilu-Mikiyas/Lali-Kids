import type { Story } from "../../../stories";

/*
  "Ice from the Sky" (level 3: water's three states; melting, freezing, evaporating, condensing).
  Ayan, from hot Jijiga in the lowlands, visits Anbessa in the highlands in kiremt. A storm drops
  little white balls that bounce on the ground: hail! Ayan thinks they are stones from the sky;
  Anbessa says they're water. They test it: hailstones in a cup in the sun melt into water. Can
  water turn back into ice? Only where it is very, very cold: high in the storm clouds, where hail
  is made, and on the highest mountains on clear bega nights. Next dawn on the hill, the grass is
  white with frost, which melts into shiny drops when the sun comes up. Grandma boils water for tea
  (a grown-up's job): the pot gets emptier, because the water goes into the air as water vapour,
  which we can't see (the white cloud above is tiny drops), and when Grandma holds the lid up, drops
  gather underneath and drip back down. Ayan's problem: she wants to show Abdi hail in Jijiga, a long
  hot bus ride away. It would melt! So she works out another way: at home, she and Hooyo put a cup of
  water in their neighbour's freezer, and the next morning it's ice. Abdi watches it melt in the sun.
  Join-in line: "Ice to water, water to air, and back again!"

  Science (kept simple and true): water can be solid (ice), liquid (water) or a gas (water vapour,
  invisible); ice melts when it warms, and water freezes when it is cold enough (0 °C); hail forms
  in very cold air high in storm clouds, even over hot places; frost forms on cold, clear nights in
  the high mountains of Ethiopia; boiling and evaporating turn water into vapour; vapour turns back
  into drops when it cools (condensation). The steam's white cloud is tiny drops; the vapour itself
  is invisible.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «በረዶ ወደ ውሃ፣ ውሃ ወደ አየር፣ ደግሞም ይመለሳል!», «አመዳይ» for frost, «እንፋሎት» for
  water vapour and «ማቀዝቀዣ» for a freezer.
*/
const story: Story = {
  id: "ice-from-the-sky",
  course: "science-nature",
  pack: "story",
  title: { en: "Ice from the Sky", am: "ከሰማይ የወረደው በረዶ" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#3A8AD8",
  scene: "lib-ice-from-the-sky",
  coverPage: 1,
  teaches: { words: ["ice", "water", "melt", "freeze", "steam", "solid", "liquid"] },
  pages: [
    {
      en: 'Ayan had come all the way from hot Jijiga to visit Anbessa in the highlands. It was kiremt, and the sky turned dark grey. Then, rattle-tattle-tap! Little white balls came bouncing down on the grass.',
      am: "አያን አንበሳን በደጋው ልትጠይቀው ከሞቃቷ ጅጅጋ ድረስ መጥታ ነበር። ክረምት ነበር፤ ሰማዩም ጥቁር ግራጫ ሆነ። ከዚያ ቻቻቻ-ቋ! ትንንሽ ነጫጭ ኳሶች በሣሩ ላይ እየነጠሩ ወረዱ።",
    },
    {
      en: 'When the storm passed, Ayan scooped some up. They were hard and freezing cold! "Stones from the sky!" she gasped. "That\'s hail," said Anbessa. "It\'s water." Ayan laughed. "Water is wet and runny. These are hard!" Ice to water, water to air, and back again!',
      am: "ማዕበሉ ሲያልፍ አያን ጥቂቶቹን በእጇ ዛቀች። ጠንካራና በጣም ቀዝቃዛ ነበሩ! «ከሰማይ የወረዱ ድንጋዮች!» ብላ ደነገጠች። «ያ በረዶ ነው» አለ አንበሳ። «ውሃ ነው።» አያን ሳቀች። «ውሃ እርጥብና ፈሳሽ ነው። እነዚህ ጠንካሮች ናቸው!» በረዶ ወደ ውሃ፣ ውሃ ወደ አየር፣ ደግሞም ይመለሳል!",
    },
    {
      en: '"Let\'s test it," said Anbessa. They put a handful of hailstones in a cup and set it in the sunshine. Slowly the balls got smaller and rounder… and soon the cup held only water. "It IS water!" said Ayan. "Ice melts when it gets warm."',
      am: "«እንሞክረው» አለ አንበሳ። እፍኝ በረዶ በስኒ ውስጥ አድርገው በፀሐይ ላይ አስቀመጡት። ቀስ እያሉ ኳሶቹ አነሱ፣ ክብ ሆኑ… ብዙም ሳይቆይ ስኒው ውሃ ብቻ ያዘ። «በእርግጥ ውሃ ነው!» አለች አያን። «በረዶ ሲሞቅ ይቀልጣል።»",
    },
    {
      en: '"But how did water turn into ice?" asked Ayan. Grandma looked up at the clouds. "High up inside storm clouds it is very, very cold, even above hot Jijiga. Raindrops freeze up there into hail, and fall before they can melt."',
      am: "«ታዲያ ውሃ እንዴት በረዶ ሆነ?» ብላ ጠየቀች አያን። አያቴ ወደ ደመናዎቹ ቀና ብለው ተመለከቱ። «በማዕበል ደመናዎች ውስጥ ከፍ ብሎ በጣም፣ በጣም ቀዝቃዛ ነው፤ በሞቃቷ ጅጅጋ ላይም ቢሆን። የዝናብ ጠብታዎች እዚያ ይቀዘቅዙና በረዶ ይሆናሉ፤ ሳይቀልጡም ይወርዳሉ።»",
    },
    {
      en: "Very early next morning, Anbessa woke Ayan. \"Come and see!\" On the hill, the air was cold and clear, and every blade of grass was white and sparkly. \"Frost,\" said Anbessa. \"On cold, clear nights up here, water from the air freezes onto the grass.\"",
      am: "በማግሥቱ በጣም በማለዳ አንበሳ አያንን ቀሰቀሳት። «ነዪ እይ!» በኮረብታው ላይ አየሩ ቀዝቃዛና ጥርት ያለ ነበር፤ እያንዳንዱ የሣር ቅጠል ነጭና የሚያብለጨልጭ ነበር። «አመዳይ» አለ አንበሳ። «እዚህ በቀዝቃዛና ጥርት ባሉ ሌሊቶች ከአየሩ የሚመጣ ውሃ በሣሩ ላይ ይቀዘቅዛል።»",
    },
    {
      en: "Then the sun peeped over the mountains. As it warmed the hill, the white frost melted away, and the grass was covered in shining drops of water. Ice to water, water to air, and back again!",
      am: "ከዚያ ፀሐይ በተራሮቹ ላይ ብቅ አለች። ኮረብታውን ስታሞቀው ነጩ አመዳይ ቀለጠ፤ ሣሩም በሚያንጸባርቁ የውሃ ጠብታዎች ተሸፈነ። በረዶ ወደ ውሃ፣ ውሃ ወደ አየር፣ ደግሞም ይመለሳል!",
    },
    {
      en: "At breakfast, Grandma boiled water for tea. (Hot pots are a grown-up's job.) Bubble, bubble! A white cloud rose from the pot, and after a while Ayan saw that there was less water in it than before. \"Where did the water go?\"",
      am: "በቁርስ ሰዓት አያቴ ለሻይ ውሃ አፈሉ። (ትኩስ ድስት የትልቅ ሰው ሥራ ነው።) ቡል፣ ቡል! ከድስቱ ነጭ ደመና ተነሣ፤ ትንሽ ቆይቶም አያን በድስቱ ውስጥ ከበፊቱ ያነሰ ውሃ እንዳለ አየች። «ውሃው የት ሄደ?»",
    },
    {
      en: '"Into the air!" said Grandma. "Hot water turns into water vapour, a gas we can\'t even see. The white cloud you see is tiny drops, where the vapour cools down again." Ice to water, water to air, and back again!',
      am: "«ወደ አየር!» አሉ አያቴ። «ትኩስ ውሃ ልናየው እንኳ የማንችል ጋዝ፣ እንፋሎት ይሆናል። የምታዪው ነጭ ደመና እንፋሎቱ እንደገና ሲቀዘቅዝ የሚፈጠሩ ጥቃቅን ጠብታዎች ነው።» በረዶ ወደ ውሃ፣ ውሃ ወደ አየር፣ ደግሞም ይመለሳል!",
    },
    {
      en: 'Grandma held the cool lid above the pot for a moment, then turned it over. Underneath, it was covered in drops of water! Drip, drip. "The vapour touched the cool lid and turned back into water," said Grandma.',
      am: "አያቴ ቀዝቃዛውን ክዳን ለጥቂት ጊዜ ከድስቱ በላይ ያዙና ገለበጡት። ከሥሩ በውሃ ጠብታዎች ተሸፍኖ ነበር! ጠብ፣ ጠብ። «እንፋሎቱ ቀዝቃዛውን ክዳን ሲነካ ተመልሶ ውሃ ሆነ» አሉ አያቴ።",
    },
    {
      en: 'Soon it was time to go home. "I want to show Abdi the hail!" said Ayan. Then she stopped. "But the bus to Jijiga takes all day, and it\'s hot. The hail will melt!" She thought hard. "In Jijiga, I can\'t catch hail. But I can MAKE ice."',
      am: "ብዙም ሳይቆይ ወደ ቤት የምትመለስበት ጊዜ ደረሰ። «ለአብዲ በረዶውን ማሳየት እፈልጋለሁ!» አለች አያን። ከዚያ ቆም አለች። «ወደ ጅጅጋ የሚሄደው አውቶቡስ ቀኑን ሙሉ ይወስዳል፤ ደግሞም ሞቃት ነው። በረዶው ይቀልጣል!» በደንብ አሰበች። «በጅጅጋ በረዶ መያዝ አልችልም። ግን በረዶ መሥራት እችላለሁ።»",
    },
    {
      en: "Back home, Ayan and Hooyo filled a cup with water and asked their neighbour to put it in her freezer, where it is very cold. The next morning, they took it out. The water had turned into a hard lump of ice!",
      am: "ቤት ሲደርሱ አያንና ሁዮ ስኒ በውሃ ሞልተው ጎረቤታቸው በጣም ቀዝቃዛ በሆነው ማቀዝቀዣዋ ውስጥ እንድታስቀምጠው ጠየቁ። በማግሥቱ ጠዋት አወጡት። ውሃው ጠንካራ በረዶ ሆኖ ነበር!",
    },
    {
      en: 'Abdi held the ice in the hot Jijiga sun and watched it drip, drip, melt into water in his hands. "Ice is water, and water can be ice!" said Ayan. "And air!" They laughed: "Ice to water, water to air, and back again!"',
      am: "አብዲ በረዶውን በሞቃቱ የጅጅጋ ፀሐይ ላይ ይዞ ጠብ፣ ጠብ እያለ በእጆቹ ውስጥ ወደ ውሃ ሲቀልጥ ተመለከተ። «በረዶ ውሃ ነው፤ ውሃም በረዶ ሊሆን ይችላል!» አለች አያን። «አየርም!» ሳቁ፦ «በረዶ ወደ ውሃ፣ ውሃ ወደ አየር፣ ደግሞም ይመለሳል!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Ayan thought hail was stones. How did she and Anbessa find out it was water? What made the frost melt?",
        "Where did the water from Grandma's pot go? Why were there drops under the lid?",
      ],
      am: [
        "አያን በረዶውን ድንጋይ መስሏት ነበር። እሷና አንበሳ ውሃ መሆኑን እንዴት ደረሱበት? አመዳዩን ያቀለጠው ምንድን ነው?",
        "ከአያቴ ድስት የወጣው ውሃ የት ሄደ? ከክዳኑ ሥር ለምን ጠብታዎች ተገኙ?",
      ],
    },
    activity: {
      en: "If you can, freeze a little water in a cup (or use ice from a shop) and race two pieces: one in the sun, one in the shade. Which melts first? Then, with a grown-up, hold a cool metal spoon or a mirror above a cup of hot tea and look for drops.",
      am: "ከቻላችሁ በስኒ ውስጥ ትንሽ ውሃ አቀዝቅዙ (ወይም ከሱቅ በረዶ ተጠቀሙ)፤ ሁለት ቁራጮችንም አወዳድሩ፦ አንዱን በፀሐይ፣ ሌላውን በጥላ። የትኛው ቀድሞ ይቀልጣል? ከዚያ ከትልቅ ሰው ጋር ቀዝቃዛ የብረት ማንኪያ ወይም መስታወት ከትኩስ ሻይ ስኒ በላይ ይዛችሁ ጠብታዎችን ፈልጉ።",
    },
  },
};

export default story;
