import type { Story } from "../../../stories";

/*
  "Haben and the Salt Road" (level 1: our land: the Danakil lowlands).
  Haben's Uncle Gebre is a caravan man: once a year he goes down from the cool highlands of the
  north to the Danakil to bring back salt, and this time Haben goes too. As it gets hotter she
  gulps all her water at once. Abba Ali, an Afar salt cutter, and his daughter Fatuma teach her
  the desert's way: sip, rest in the shade, walk when it is cool. Haben sees the white salt flat
  cracked like honeycomb, the coloured pools of Dallol, the cutters shaping salt blocks, and at
  night the red glow of Erta Ale. Because she has learned to rest and watch, she is the one who
  spots a young camel's load slipping, and helps tie it back. Back home, the salt on her food has
  a story.
  Join-in line: "Step by step, sip by sip!"

  Facts: the Danakil depression is one of the hottest places on Earth, below sea level; the salt
  flats near Lake Asale crack into honeycomb shapes; Afar salt cutters lever up slabs with poles
  and shape them into blocks with axes; camel and donkey caravans carry the blocks up to highland
  markets (today trucks carry salt too); long ago, salt bars (amole) were used as money; Dallol's
  hot springs are yellow, green and orange, hot and acid, so we do not touch them; Erta Ale is a
  volcano with a lava lake. Afar families' houses of woven mats on bent sticks can be packed onto
  camels. Fatuma and Abba Ali are Afar names.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «እርምጃ በእርምጃ፣ ፉት በፉት!», «አሞሌ» and «የጨው ቅፍለት».
*/
const story: Story = {
  id: "salt-road",
  course: "our-ethiopia",
  pack: "story",
  title: { en: "Haben and the Salt Road", am: "ሐበንና የጨው መንገድ" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#C9862E",
  scene: "lib-salt-road",
  coverPage: 4,
  teaches: { words: ["salt", "desert", "hot", "camel", "caravan", "volcano"] },
  pages: [
    {
      en: "Haben's Uncle Gebre was a caravan man. Once a year he led his camels and donkeys down from the cool highlands of the north to the Danakil, to bring back salt. This year, Haben could go too!",
      am: "የሐበን አጎት ገብሬ የቅፍለት ሰው ነበር። በዓመት አንድ ጊዜ ግመሎቹንና አህዮቹን ይዞ ከሰሜኑ ቀዝቃዛ ደጋ ወደ ዳናኪል ይወርድ ነበር፤ ጨው ለማምጣት። በዚህ ዓመት ሐበንም አብራ መሄድ ትችል ነበር!",
    },
    {
      en: "Down, down the mountain went the long line of animals, their bells going ding, dong. The air grew warm, then hot, then HOT. Haben was so thirsty that she gulped her water. Gulp, gulp, gulp. All gone!",
      am: "ረጅሙ የእንስሳት ሰልፍ ቃጭሉ ዲንግ ዶንግ እያለ ከተራራው ወረደ፣ ወረደ። አየሩ ሞቀ፣ ከዚያ በጣም ሞቀ፣ ከዚያ እጅግ በጣም ሞቀ። ሐበን በጣም ስለጠማት ውሃዋን ጨለጠችው። ጉልጭ፣ ጉልጭ፣ ጉልጭ። አለቀ!",
    },
    {
      en: "In the lowlands they stopped at the home of Abba Ali, an Afar salt cutter, and his daughter Fatuma. Their round house was made of woven mats over bent sticks. \"When we move,\" said Fatuma, \"we pack our house onto a camel!\"",
      am: "በቆላው ውስጥ የአፋር ጨው ቆራጭ በሆኑት በአባ ዓሊና በልጃቸው በፋጡማ ቤት አረፉ። ክብ ቤታቸው የተጣመሙ እንጨቶችን በተሠሩ ምንጣፎች በመሸፈን የተሠራ ነበር። «ስንዘዋወር» አለች ፋጡማ፤ «ቤታችንን ግመል ላይ እንጭነዋለን!»",
    },
    {
      en: 'Abba Ali saw Haben\'s empty bottle, and kindly filled it again. "Here in the Danakil we sip, we rest in the shade, and we walk when it is cool," he said. "Step by step, sip by sip!"',
      am: "አባ ዓሊ የሐበንን ባዶ መያዣ አዩና በደግነት እንደገና ሞሉላት። «እዚህ ዳናኪል ውስጥ ፉት እንላለን፣ ጥላ ሥር እናርፋለን፣ ቀዝቀዝ ሲል እንጓዛለን» አሉ። «እርምጃ በእርምጃ፣ ፉት በፉት!»",
    },
    {
      en: "Before sunrise, while it was cool, the caravan walked out onto a flat white land. Salt! It stretched as far as Haben could see, cracked into shapes like a giant honeycomb. Step by step, sip by sip!",
      am: "ፀሐይ ሳትወጣ፣ ቀዝቃዛ እያለ፣ ቅፍለቱ ወደ ጠፍጣፋ ነጭ ምድር ወጣ። ጨው! ሐበን እስከምታየው ድረስ ተዘርግቶ ነበር፤ እንደ ግዙፍ የማር እንጀራ ቅርጽ ተሰነጣጥቆ። እርምጃ በእርምጃ፣ ፉት በፉት!",
    },
    {
      en: 'At Dallol the ground bubbled with pools of yellow, green and orange, like a painter\'s paints. Haben reached out a hoof. "Don\'t touch!" said Fatuma. "It\'s hot, and it stings." Haben looked with her eyes instead.',
      am: "በዳሎል መሬቱ ቢጫ፣ አረንጓዴና ብርቱካናማ ኩሬዎች እንደ ሠዓሊ ቀለም ይፈላሉ። ሐበን ኮቴዋን ዘረጋች። «አትንኪ!» አለች ፋጡማ። «ይፋጃል፤ ያቃጥላልም።» ሐበን በምትኩ በዓይኗ ብቻ ተመለከተች።",
    },
    {
      en: 'The salt cutters worked fast. They lifted big slabs of salt with long poles, then chopped them into neat blocks with their axes. Chop, chop! "Long ago," said Uncle Gebre, "blocks of salt like these were used as money."',
      am: "ጨው ቆራጮቹ በፍጥነት ሠሩ። ትልልቅ የጨው ንጣፎችን በረጃጅም እንጨቶች አነሡ፤ ከዚያ በመጥረቢያቸው ቆንጆ ቆንጆ ጡቦች አድርገው ቆረጡ። ቁርጥ፣ ቁርጥ! «ድሮ» አለ አጎት ገብሬ፤ «እንደዚህ ያሉ የጨው ጡቦች እንደ ገንዘብ ያገለግሉ ነበር።»",
    },
    {
      en: "By noon it was too hot to work. Everyone rested in the shade. Haben wanted to hurry, but she remembered. She sat, she sipped, and she watched the camels being loaded with salt. Step by step, sip by sip!",
      am: "እኩለ ቀን ላይ ለመሥራት በጣም ሞቀ። ሁሉም ጥላ ሥር አረፈ። ሐበን መቸኮል ፈለገች፤ ግን አስታወሰች። ተቀመጠች፣ ፉት አለች፣ ግመሎቹ ጨው ሲጫኑም ተመለከተች። እርምጃ በእርምጃ፣ ፉት በፉት!",
    },
    {
      en: 'Because she was watching, she saw it first: the load on the youngest camel was slipping, tipping, about to fall! "Uncle! Abba Ali! The salt!" Everyone ran. Together they caught the blocks and tied the ropes tight again.',
      am: "ትመለከት ስለነበር ቀድማ አየችው፦ በትንሹ ግመል ላይ ያለው ጭነት እየተንሸራተተ፣ እያዘነበለ፣ ሊወድቅ ነበር! «አጎቴ! አባ ዓሊ! ጨው!» ሁሉም ሮጠ። አብረው ጡቦቹን ያዙ፤ ገመዶቹንም እንደገና አጥብቀው አሰሩ።",
    },
    {
      en: '"Sharp eyes!" said Abba Ali. "You rested, so you could see." That evening, when it was cool, the caravan set off. Far away, a red glow lit the sky: Erta Ale, a volcano with a lake of glowing fire inside it.',
      am: "«ስል ዓይን!» አሉ አባ ዓሊ። «ስላረፍሽ ማየት ቻልሽ።» በዚያ ምሽት፣ ቀዝቀዝ ሲል፣ ቅፍለቱ ጉዞ ጀመረ። ሩቅ ቦታ ቀይ ብርሃን ሰማዩን አበራ፦ ውስጡ የሚንቦገቦግ የእሳት ሐይቅ ያለበት እሳተ ገሞራ፣ ኤርታ አሌ።",
    },
    {
      en: 'Fatuma waved goodbye. "Come back next year!" Under the stars the camels walked slowly up, up, up towards the cool highlands. Step by step, sip by sip!',
      am: "ፋጡማ እጇን እያውለበለበች ተሰናበተች። «በሚቀጥለው ዓመት ተመለሺ!» በከዋክብት ሥር ግመሎቹ ቀስ ብለው ወደ ቀዝቃዛው ደጋ ወጡ፣ ወጡ፣ ወጡ። እርምጃ በእርምጃ፣ ፉት በፉት!",
    },
    {
      en: 'Days later, the salt was sold at the highland market, for families to cook with and to give to their animals. At home, Haben sprinkled a pinch on her food. "This salt came a long, long way," she said, "step by step, sip by sip!"',
      am: "ከቀናት በኋላ ጨው በደጋው ገበያ ተሸጠ፤ ቤተሰቦች እንዲያበስሉበትና ለከብቶቻቸው እንዲሰጡ። እቤት ሐበን በምግቧ ላይ ቁንጥጫ ጨው ነሰነሰች። «ይህ ጨው ረጅም፣ ረጅም መንገድ መጥቷል» አለች፤ «እርምጃ በእርምጃ፣ ፉት በፉት!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why did the caravan walk in the early morning and the evening, and rest at noon? What do we do on a very hot day to stay safe?",
        "Haben saw the slipping load because she was resting and watching. When has slowing down helped you notice something?",
      ],
      am: [
        "ቅፍለቱ ለምን በማለዳና በምሽት ተጓዘ፣ እኩለ ቀን ላይ ደግሞ አረፈ? በጣም ሞቃት ቀን ላይ ደኅንነታችንን ለመጠበቅ ምን እናደርጋለን?",
        "ሐበን የሚንሸራተተውን ጭነት ያየችው ስታርፍና ስትመለከት ነበር። መረጋጋት አንድ ነገር እንድታስተውሉ የረዳችሁ መቼ ነው?",
      ],
    },
    activity: {
      en: "Look at salt together: put a few grains on dark paper and look closely (with a magnifying glass if you have one) at their little cube shapes. Then stir a spoon of salt into a little warm water, leave it in a sunny place for a few days, and watch salt crystals appear again as the water dries, just as in the Danakil.",
      am: "ጨውን አብራችሁ ተመልከቱ፦ ጥቂት የጨው ቅንጣቶችን በጥቁር ወረቀት ላይ አድርጋችሁ (ማጉያ መነጽር ካላችሁ በእሱ) ትናንሽ ኩብ ቅርጻቸውን በቅርበት እዩ። ከዚያ አንድ ማንኪያ ጨው በትንሽ ለብ ያለ ውሃ ውስጥ አሟሙ፤ ለጥቂት ቀናት ፀሐያማ ቦታ ላይ አስቀምጡት፤ ውሃው ሲደርቅ ልክ እንደ ዳናኪል የጨው ቅንጣቶች እንደገና ሲታዩ ተመልከቱ።",
    },
  },
};

export default story;
