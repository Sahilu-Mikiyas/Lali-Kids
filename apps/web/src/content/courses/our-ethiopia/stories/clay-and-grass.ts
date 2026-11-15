import type { Story } from "../../../stories";

/*
  "Clay and Grass" (level 6: our food, crafts, music and inventions: pottery and basketry).
  For the school craft fair, Tsehay goes to learn pottery from Emama Workinesh, a potter who makes
  jebenas, cooking pots and mitads by hand, and Ayan learns to weave a mesob basket from Hooyo.
  Both crafts grow the same way: round and round. Tsehay builds a pot from coils of clay, but
  she puts it in the hot sun to dry fast, and it cracks. Emama explains: clay must dry slowly in
  the shade, then be fired in a hot fire to become hard and red. Tsehay makes another, waits,
  and helps fire it. Ayan's basket coil grows ring by ring, with coloured grass for a pattern.
  At the fair, Tsehay's pot and Ayan's mesob stand side by side.
  Join-in line: "Round and round, the coil grows!"

  Facts: Ethiopian potters, very often women, shape pots, jebenas and mitads by hand (often by
  coiling and smoothing, without a wheel), dry them slowly and fire them in an open fire; the
  mesob is a woven basket table with a lid, made by coiling bundles of grass and binding them
  with coloured fibres, round and round; baskets like these are made in many parts of Ethiopia,
  famously in Harar. Emama Workinesh is a new minor character.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ዙሪያውን፣ ዙሪያውን፣ ጥቅልሉ ያድጋል!», «ሸክላ ሠሪ» and «መሶብ».
*/
const story: Story = {
  id: "clay-and-grass",
  course: "our-ethiopia",
  pack: "story",
  title: { en: "Clay and Grass", am: "ሸክላና ሣር" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#B8642A",
  scene: "lib-clay-and-grass",
  coverPage: 10,
  teaches: { words: ["clay", "pot", "basket", "weave", "dry", "fire"] },
  pages: [
    {
      en: '"Our school is having a craft fair," said Teacher. "Make something with your hands, the way our grandparents did." Tsehay wanted to make a pot. Ayan wanted to make a mesob, a basket with a lid.',
      am: "«ትምህርት ቤታችን የእጅ ሥራ ትርዒት ያዘጋጃል» አለች መምህርቷ። «አያቶቻችን እንዳደረጉት በእጃችሁ አንድ ነገር ሥሩ።» ፀሐይ ድስት መሥራት ፈለገች። አያን ደግሞ መሶብ፣ ክዳን ያለው ቅርጫት መሥራት ፈለገች።",
    },
    {
      en: "Tsehay went to Emama Workinesh, the potter at the end of the lane. Her yard was full of pots: fat ones, tall ones, black jebenas for coffee and big round mitads for injera.",
      am: "ፀሐይ በመንገዱ መጨረሻ ወዳሉት ሸክላ ሠሪ ወደ እማማ ወርቅነሽ ሄደች። ግቢያቸው በድስቶች የተሞላ ነበር፦ ወፍራሞች፣ ረጃጅሞች፣ ለቡና ጥቁር ጀበናዎችና ለእንጀራ ትልልቅ ክብ ምጣዶች።",
    },
    {
      en: 'Emama rolled the wet clay into long snakes. "We don\'t need a wheel," she said. "Watch." She laid one coil on top of another, round and round, and smoothed them together with her fingers. Round and round, the coil grows!',
      am: "እማማ እርጥቡን ሸክላ እንደ እባብ ረጃጅም አድርገው አንከባለሉት። «መሽከርከሪያ አያስፈልገንም» አሉ። «ተመልከቺ።» አንዱን ጥቅልል በሌላው ላይ ዙሪያውን፣ ዙሪያውን አስቀመጡ፤ በጣቶቻቸውም አለሰለሱት። ዙሪያውን፣ ዙሪያውን፣ ጥቅልሉ ያድጋል!",
    },
    {
      en: "Meanwhile, at home, Hooyo showed Ayan how to make a mesob. She wrapped a bundle of grass with a strip of coloured fibre, then curled it round and stitched it to the row before. Round and round, the coil grows!",
      am: "በዚህ መሀል እቤት ሁዮ ለአያን መሶብ እንዴት እንደሚሠራ አሳየቻት። የሣር ጥቅል በባለቀለም ፋይበር ቁራጭ ጠቀለለች፤ ከዚያ አጠማዘዘችና ከቀደመው ረድፍ ጋር ሰፋችው። ዙሪያውን፣ ዙሪያውን፣ ጥቅልሉ ያድጋል!",
    },
    {
      en: "Tsehay built her own little pot, coil by coil. It was a bit wobbly, but it was hers! She wanted it ready fast, so she put it in the hottest sunny spot to dry.",
      am: "ፀሐይ የራሷን ትንሽ ድስት ጥቅልል በጥቅልል ሠራች። ትንሽ ተንጋዶ ነበር፤ ግን የራሷ ነበር! በፍጥነት እንዲደርስ ስለፈለገች እንዲደርቅ በጣም ሞቃት በሆነው ፀሐያማ ቦታ አስቀመጠችው።",
    },
    {
      en: "By the afternoon, there was a long crack down the side. Crrrack! Tsehay's lip wobbled. \"My pot is broken!\"",
      am: "ከሰዓት በኋላ ከጎኑ ረጅም ስንጥቅ ነበረው። ስንጥቅ! የፀሐይ ከንፈር ተንቀጠቀጠ። «ድስቴ ተሰበረ!»",
    },
    {
      en: 'Emama sat down beside her. "The sun dried the outside too fast, while the inside was still wet. Clay must dry slowly, in the shade. Then it goes into the fire, to become hard and red."',
      am: "እማማ አጠገቧ ተቀመጡ። «ውስጡ ገና እርጥብ ሆኖ ሳለ ፀሐዩ ውጭውን በጣም በፍጥነት አደረቀው። ሸክላ ቀስ ብሎ፣ በጥላ ውስጥ መድረቅ አለበት። ከዚያ ጠንክሮ ቀይ እንዲሆን ወደ እሳቱ ይገባል።»",
    },
    {
      en: "So Tsehay made a new pot, even rounder than the first. This time she put it in the cool shade, and waited one day, two days, three days, until it was dry and pale all through.",
      am: "ስለዚህ ፀሐይ ከመጀመሪያው ይበልጥ ክብ የሆነ አዲስ ድስት ሠራች። በዚህ ጊዜ በቀዝቃዛው ጥላ ውስጥ አስቀመጠችው፤ ውስጥ ውስጡ ደርቆ እስኪነጣ ድረስ አንድ ቀን፣ ሁለት ቀን፣ ሦስት ቀን ጠበቀች።",
    },
    {
      en: "Then Emama built a big fire in the yard, and laid the dry pots in it. Tsehay stood back, and watched. When the fire was over, her pot had turned a deep, warm red. Tap! It rang like a bell.",
      am: "ከዚያ እማማ በግቢው ውስጥ ትልቅ እሳት አነደዱ፤ የደረቁትን ድስቶችም በውስጡ አስቀመጡ። ፀሐይ ራቅ ብላ ቆማ ተመለከተች። እሳቱ ሲያልቅ ድስቷ ጠቆር ያለ ሞቅ ያለ ቀይ ሆነ። ኳ! እንደ ደወል ጮኸ።",
    },
    {
      en: "Ayan's mesob grew too, ring after ring, with a red and green pattern going round. Her fingers got tired, but every evening she added one more ring. Round and round, the coil grows!",
      am: "የአያን መሶብም አደገ፤ ቀለበት በቀለበት፣ ዙሪያውን የሚሄድ ቀይና አረንጓዴ ጥለት ያለው። ጣቶቿ ደከሙ፤ ግን በየምሽቱ አንድ ተጨማሪ ቀለበት ጨመረች። ዙሪያውን፣ ዙሪያውን፣ ጥቅልሉ ያድጋል!",
    },
    {
      en: 'At the craft fair, Tsehay\'s red pot and Ayan\'s bright mesob stood side by side. "Clay and grass," said Teacher, "and both made round and round, with patience." Emama Workinesh and Hooyo clapped the loudest.',
      am: "በእጅ ሥራ ትርዒቱ ላይ የፀሐይ ቀይ ድስትና የአያን ደማቅ መሶብ ጎን ለጎን ቆሙ። «ሸክላና ሣር» አለች መምህርቷ፤ «ሁለቱም ዙሪያውን፣ ዙሪያውን በትዕግሥት የተሠሩ።» እማማ ወርቅነሽና ሁዮ ከሁሉ በላይ አጨበጨቡ።",
    },
    {
      en: "Tsehay kept the cracked pot too. She planted a little daisy in it. \"It taught me to wait,\" she said. Round and round, the coil grows!",
      am: "ፀሐይ የተሰነጠቀውን ድስትም አስቀመጠችው። ትንሽ አደይ አበባ ተከለችበት። «መጠበቅን አስተማረኝ» አለች። ዙሪያውን፣ ዙሪያውን፣ ጥቅልሉ ያድጋል!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why did Tsehay's first pot crack? What did she change the second time?",
        "Which things in our home were made by hand: a mesob, a jebena, a mitad, a netela? Who made them?",
      ],
      am: [
        "የፀሐይ የመጀመሪያ ድስት ለምን ተሰነጠቀ? በሁለተኛው ጊዜ ምን ለወጠች?",
        "በቤታችን ውስጥ በእጅ የተሠሩት የትኞቹ ናቸው፦ መሶብ፣ ጀበና፣ ምጣድ፣ ነጠላ? ማን ሠራቸው?",
      ],
    },
    activity: {
      en: "Make a coil pot from play dough or clay: roll long snakes, lay them round and round, and smooth them together. Dry it slowly in the shade. Or make a coil basket from a long rope or strips of cloth, coiled round and stuck down.",
      am: "ከሊጥ ወይም ከሸክላ የጥቅልል ድስት ሥሩ፦ ረጃጅም እባቦችን አንከባልሉ፤ ዙሪያውን፣ ዙሪያውን አስቀምጡ፤ አለስልሱም። በጥላ ውስጥ ቀስ ብሎ ይድረቅ። ወይም ከረጅም ገመድ ወይም ከጨርቅ ቁራጮች ጠቅልላችሁ የጥቅልል ቅርጫት ሥሩ።",
    },
  },
};

export default story;
