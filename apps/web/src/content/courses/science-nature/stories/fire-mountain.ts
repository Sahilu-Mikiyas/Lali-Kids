import type { Story } from "../../../stories";

/*
  "The Mountain with Fire Inside" (level 5: rocks, soil, volcanoes and the Rift Valley). Fatuma, from
  an Afar family, shows her friend Haben the black rocks of the Afar: they were once melted rock. Deep
  under the ground it is so hot that rock melts; at a volcano it comes up as lava. With Abba Ali and a
  guide they watch Erta Ale from a safe distance at night: a lake of red, bubbling lava. Lava cools
  into hard black rock (basalt). Ethiopia's Rift Valley is where the land is slowly pulling apart,
  about as fast as fingernails grow; that is why it has volcanoes, hot springs and long lakes. Back
  home, Haben wonders what soil is made of: they shake soil in a jar of water, and it settles into
  layers: small stones, sand, fine mud, and bits of old leaves floating on top. Soil is broken-up rock
  mixed with dead plants, made very slowly. The problem: Haben's grandma's soil washes away in the
  rains; Haben suggests planting grass and trees, whose roots hold soil. Join-in line: "From fire to
  rock, from rock to soil!"

  Science (kept simple and true): magma/lava is molten rock; Erta Ale in the Afar has one of the
  world's few long-lasting lava lakes; lava cools into basalt; the Rift Valley is spreading by a few
  millimetres a year; soil forms over very long times from weathered rock and decayed plants; roots
  reduce soil erosion. Volcanoes are visited only with expert guides at a safe distance.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ከእሳት ወደ ዐለት፣ ከዐለት ወደ አፈር!», «ቀልጦ የሚፈስ ዐለት» for lava and «እሳተ ገሞራ».
*/
const story: Story = {
  id: "fire-mountain",
  course: "science-nature",
  pack: "story",
  title: { en: "The Mountain with Fire Inside", am: "ውስጡ እሳት ያለበት ተራራ" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#C9402A",
  scene: "lib-fire-mountain",
  coverPage: 4,
  teaches: { words: ["volcano", "lava", "rock", "soil", "Rift Valley"] },
  pages: [
    {
      en: "Haben visited her friend Fatuma in the Afar, where the ground is hot and dry. Everywhere lay black rocks, full of tiny holes. \"Why are the rocks black?\"",
      am: "ሐበን ጓደኛዋን ፋጡማን በአፋር ጎበኘች፤ መሬቱ ሞቃትና ደረቅ ነው። በየቦታው በጥቃቅን ቀዳዳዎች የተሞሉ ጥቁር ዐለቶች ነበሩ። «ዐለቶቹ ለምን ጥቁር ሆኑ?»",
    },
    {
      en: "\"Once, they were melted rock,\" said Fatuma. \"Hot enough to flow like thick soup!\" Haben laughed. \"Rock can't melt!\" \"Come and see,\" said Fatuma.",
      am: "«ድሮ ቀልጦ የሚፈስ ዐለት ነበሩ» አለች ፋጡማ። «እንደ ወፍራም ሾርባ እስኪፈስ ድረስ ሞቃት!» ሐበን ሳቀች። «ዐለት አይቀልጥም!» «ነይ እዪ» አለች ፋጡማ።",
    },
    {
      en: "\"Deep under the ground, it is so hot that rock melts,\" said Abba Ali. \"At a volcano, the melted rock comes up. Then we call it lava.\" From fire to rock, from rock to soil!",
      am: "«ከመሬት በታች በጣም ጥልቅ ዐለት እስኪቀልጥ ሞቃት ነው» አሉ አባ ዓሊ። «በእሳተ ገሞራ ቀልጦ የሚፈስ ዐለት ይወጣል።» ከእሳት ወደ ዐለት፣ ከዐለት ወደ አፈር!",
    },
    {
      en: "One night, with a guide who knows the volcano well, they walked up Erta Ale. They stopped far back from the edge, where it was safe.",
      am: "አንድ ሌሊት እሳተ ገሞራውን በደንብ ከሚያውቅ መሪ ጋር ኤርታ አሌን ወጡ። ደህና በሆነው ቦታ ከጫፉ ርቀው ቆሙ።",
    },
    {
      en: "Below them was a lake of glowing red lava, bubbling and splashing. \"Erta Ale has a lava lake,\" whispered Fatuma. \"Very few volcanoes in the world have one.\"",
      am: "ከበታቻቸው የሚያበራ ቀይ የቀለጠ ዐለት ሐይቅ ይፍለቀለቅ ነበር። «ኤርታ አሌ የቀለጠ ዐለት ሐይቅ አለው» አለች ፋጡማ። «በዓለም ይህ ያላቸው ጥቂት ናቸው።»",
    },
    {
      en: "At the edges, the lava cooled and went dark and hard. \"When lava cools, it becomes black rock, like the rocks by my house!\" said Fatuma. From fire to rock!",
      am: "በዳሩ የቀለጠው ዐለት ቀዝቅዞ ጠቆረ፣ ጠነከረም። «ሲቀዘቅዝ እንደ ቤቴ አጠገብ ያሉ ጥቁር ዐለቶች ይሆናል!» አለች ፋጡማ። ከእሳት ወደ ዐለት!",
    },
    {
      en: "\"Why are there volcanoes here?\" asked Haben. \"In the Rift Valley, the land is slowly pulling apart,\" said Abba Ali. \"About as fast as your nails grow!\"",
      am: "«እሳተ ገሞራ እዚህ ለምን አለ?» አለች ሐበን። «በስምጥ ሸለቆ መሬቱ ቀስ ብሎ እየተለያየ ነው» አሉ አባ ዓሊ። «ጥፍራችሁ በሚያድግበት ፍጥነት ያህል!»",
    },
    {
      en: "\"That's why the Rift Valley has volcanoes, hot springs and long lakes.\" Back home, Haben looked at Grandma's field. \"And what is soil made of?\"",
      am: "«ስምጥ ሸለቆ እሳተ ገሞራ፣ ፍልውሃና ረጃጅም ሐይቆች ያሉት ለዚህ ነው።» ቤት ስትመለስ ሐበን የአያቷን ማሳ ተመለከተች። «አፈርስ ከምን ተሠራ?»",
    },
    {
      en: "She shook soil in a jar of water and let it settle. Layers! Small stones at the bottom, then sand, then fine mud, with bits of old leaves floating on top.",
      am: "አፈር በውሃ ብልቃጥ ውስጥ ነቀነቀችና እንዲረጋ ተወችው። ንብርብሮች! ከታች ጠጠሮች፣ ከዚያ አሸዋ፣ ከዚያ ልስልስ ጭቃ፤ ከላይ የአሮጌ ቅጠል ቁርጥራጮች ተንሳፈፉ።",
    },
    {
      en: "\"Soil is rock broken into tiny bits, mixed with old plants,\" said Grandma. \"It takes hundreds of years to make.\" From fire to rock, from rock to soil!",
      am: "«አፈር ወደ ጥቃቅን የተሰበረ ዐለትና ከአሮጌ ተክሎች ጋር የተደባለቀ ነው» አሉ አያቷ። «ለመሠራት በመቶዎች ዓመታት ይወስዳል።» ከእሳት ወደ ዐለት፣ ከዐለት ወደ አፈር!",
    },
    {
      en: "But in kiremt, rain washed Grandma's soil down the slope in muddy streams. Haben remembered the jar. \"It took so long to make! We must hold it. Roots!\"",
      am: "በክረምት ግን ዝናብ የአያቷን አፈር በጭቃማ ጅረት ወደ ቁልቁለቱ ወሰደው። ሐበን ብልቃጡን አስታወሰች። «ለመሠራት ብዙ ጊዜ ወሰደ! መያዝ አለብን። ሥሮች!»",
    },
    {
      en: "They planted grass and young trees along the slope. Their roots held the soil tight, and next kiremt it stayed put. \"From fire to rock, from rock to soil!\"",
      am: "በቁልቁለቱ ላይ ሣርና ችግኞች ተከሉ። ሥሮቻቸው አፈሩን አጥብቀው ያዙት፤ በሚቀጥለው ክረምት አልሄደም። «ከእሳት ወደ ዐለት፣ ከዐለት ወደ አፈር!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Where did the black rocks in the Afar come from? Why does the Rift Valley have volcanoes?", "What did Haben find in her jar of soil? Why do roots help keep soil in place?"],
      am: ["በአፋር ያሉት ጥቁር ዐለቶች ከየት መጡ? ስምጥ ሸለቆ እሳተ ገሞራ ለምን አለው?", "ሐበን በአፈር ብልቃጧ ውስጥ ምን አገኘች? ሥሮች አፈርን ለመያዝ ለምን ይረዳሉ?"],
    },
    activity: {
      en: "Put two spoons of soil in a clear jar of water, close it, shake it and leave it for a day. Draw the layers you see. Then collect a few rocks and sort them: smooth or rough, light or dark, with holes or without.",
      am: "ሁለት ማንኪያ አፈር በግልጽ ብልቃጥ ውሃ ውስጥ አድርጋችሁ ክደኑት፣ ነቅንቁትና ለአንድ ቀን ተዉት። ያያችሁትን ንብርብሮች ሣሉ። ከዚያ ጥቂት ድንጋዮች ሰብስባችሁ ለዩ፦ ለስላሳ ወይም ሻካራ፣ ፈዛዛ ወይም ጥቁር፣ ቀዳዳ ያለው ወይም የሌለው።",
    },
  },
};

export default story;
