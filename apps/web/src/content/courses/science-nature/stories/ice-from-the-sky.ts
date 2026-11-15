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
      en: "Ayan had come from hot Jijiga to visit Anbessa in the highlands. It was kiremt. The sky turned grey, then, rattle-tap! Little white balls bounced on the grass.",
      am: "አያን አንበሳን በደጋው ልትጠይቅ ከሞቃቷ ጅጅጋ መጣች። ክረምት ነበር። ሰማዩ ጠቆረ፤ ከዚያ ቻቻቻ-ቋ! ትንንሽ ነጫጭ ኳሶች በሣሩ ላይ ነጠሩ።",
    },
    {
      en: "Ayan scooped some up. Hard and freezing! \"Stones from the sky!\" \"That's hail,\" said Anbessa. \"It's water.\" \"Water is runny. These are hard!\" Ice to water, water to air, and back again!",
      am: "አያን ዛቀች። ጠንካራና በጣም ቀዝቃዛ! «ከሰማይ የወረዱ ድንጋዮች!» «በረዶ ነው» አለ አንበሳ። «ውሃ ነው።» «ውሃ ፈሳሽ ነው!» በረዶ ወደ ውሃ፣ ውሃ ወደ አየር፣ ደግሞም ይመለሳል!",
    },
    {
      en: "\"Let's test it.\" They put hailstones in a cup in the sun. Slowly they got smaller… and soon the cup held only water. \"It IS water! Ice melts when it gets warm.\"",
      am: "«እንሞክረው።» በረዶውን በስኒ አድርገው በፀሐይ ላይ አስቀመጡት። ቀስ እያሉ አነሱ… ስኒው ውሃ ብቻ ያዘ። «በእርግጥ ውሃ ነው! በረዶ ሲሞቅ ይቀልጣል።»",
    },
    {
      en: "\"But how did water turn into ice?\" Grandma looked up. \"High inside storm clouds it is very cold, even above Jijiga. Raindrops freeze into hail up there.\"",
      am: "«ውሃ እንዴት በረዶ ሆነ?» አያቴ ቀና አሉ። «በማዕበል ደመና ውስጥ ከፍ ብሎ በጣም ቀዝቃዛ ነው፤ በጅጅጋ ላይም። የዝናብ ጠብታዎች እዚያ ቀዝቅዘው በረዶ ይሆናሉ።»",
    },
    {
      en: "Early next morning, Anbessa woke Ayan. On the hill, every blade of grass was white and sparkly. \"Frost! On cold, clear nights, water from the air freezes on the grass.\"",
      am: "በማለዳ አንበሳ አያንን ቀሰቀሳት። በኮረብታው ላይ ሣሩ ሁሉ ነጭና የሚያብለጨልጭ ነበር። «አመዳይ! በቀዝቃዛ ሌሊት ከአየሩ የሚመጣ ውሃ በሣሩ ላይ ይቀዘቅዛል።»",
    },
    {
      en: "Then the sun peeped over the mountains. The white frost melted away, and the grass sparkled with drops of water. Ice to water, water to air, and back again!",
      am: "ከዚያ ፀሐይ በተራሮቹ ላይ ብቅ አለች። ነጩ አመዳይ ቀለጠ፤ ሣሩም በውሃ ጠብታዎች አበራ። በረዶ ወደ ውሃ፣ ውሃ ወደ አየር፣ ደግሞም ይመለሳል!",
    },
    {
      en: "At breakfast, Grandma boiled water for tea. (Hot pots are a grown-up's job.) A white cloud rose, and soon there was less water in the pot. \"Where did it go?\"",
      am: "በቁርስ አያቴ ለሻይ ውሃ አፈሉ። (ትኩስ ድስት የትልቅ ሰው ሥራ ነው።) ነጭ ደመና ተነሣ፤ በድስቱ ያለው ውሃ አነሰ። «ውሃው የት ሄደ?»",
    },
    {
      en: "\"Into the air!\" said Grandma. \"It turns into water vapour, a gas we can't see. The white cloud is tiny drops, where it cools.\" Ice to water, water to air, and back again!",
      am: "«ወደ አየር!» አሉ አያቴ። «የማይታይ ጋዝ፣ እንፋሎት ይሆናል። ነጩ ደመና ሲቀዘቅዝ የሚፈጠሩ ጥቃቅን ጠብታዎች ነው።» በረዶ ወደ ውሃ፣ ውሃ ወደ አየር፣ ደግሞም ይመለሳል!",
    },
    {
      en: "Grandma held the cool lid above the pot, then turned it over. It was covered in drops! Drip, drip. \"The vapour touched the cool lid and turned back into water.\"",
      am: "አያቴ ቀዝቃዛውን ክዳን ከድስቱ በላይ ያዙና ገለበጡት። በጠብታዎች ተሸፍኖ ነበር! ጠብ፣ ጠብ። «እንፋሎቱ ቀዝቃዛውን ክዳን ሲነካ ተመልሶ ውሃ ሆነ።»",
    },
    {
      en: "\"I want to show Abdi the hail!\" said Ayan. Then she stopped. \"The bus to Jijiga takes all day, and it's hot. It will melt!\" She thought. \"But I can MAKE ice.\"",
      am: "«ለአብዲ በረዶውን ማሳየት እፈልጋለሁ!» አለች አያን። ቆም አለች። «አውቶቡሱ ቀኑን ሙሉ ይሄዳል፤ ሞቃትም ነው። ይቀልጣል!» አሰበች። «ግን በረዶ መሥራት እችላለሁ።»",
    },
    {
      en: "Back home, Ayan and Hooyo put a cup of water in their neighbour's freezer, where it is very cold. Next morning, the water was a hard lump of ice!",
      am: "ቤት ሲደርሱ አያንና ሁዮ ስኒ ውሃ በጎረቤታቸው ማቀዝቀዣ ውስጥ አስቀመጡ። በማግሥቱ ጠዋት ውሃው ጠንካራ በረዶ ሆኖ ነበር!",
    },
    {
      en: "Abdi held the ice in the hot sun and watched it melt in his hands. \"Ice is water, and water can be ice!\" said Ayan. \"And air!\" Ice to water, water to air, and back again!",
      am: "አብዲ በረዶውን በሞቃቱ ፀሐይ ይዞ ሲቀልጥ ተመለከተ። «በረዶ ውሃ ነው፤ ውሃም በረዶ ይሆናል!» አለች አያን። «አየርም!» በረዶ ወደ ውሃ፣ ውሃ ወደ አየር፣ ደግሞም ይመለሳል!",
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
