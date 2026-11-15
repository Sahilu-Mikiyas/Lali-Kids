import type { Story } from "../../../stories";

/*
  "Kites and Clouds" (level 4: wind, clouds, kiremt and bega). Anbessa's new kite flops: no wind.
  What is wind? Moving air: you can't see it, but you can feel it push. They watch it bend the
  grass, lean the smoke and flap the washing; a ribbon on a stick shows which way it blows. The wind
  lifts the kite, and pushes the clouds too. Fluffy white clouds mean fine weather; tall, dark, heaped
  clouds bring storms (kites down, go indoors); thin wispy clouds very high are made of ice. In kiremt
  (about June to September) wet winds bring many clouds and the big rains to the highlands; in bega
  the sky is clear and dry. The problem: Tsehay's washing is on the line and tall dark clouds are
  coming; Anbessa reads the sky and they bring it in just in time. Afterwards, wind and sun dry it.
  A pinwheel turns in the wind, and big wind turbines near Adama make electricity.
  Join-in line: "Feel it blow, watch it go: the wind is air on the go!"

  Science (kept simple and true): wind is moving air; cumulus (fluffy, fair weather), cumulonimbus
  (towering, storms, lightning), cirrus (high, wispy, ice crystals); the kiremt rains come with moist
  seasonal winds; in a thunderstorm, go indoors and never fly a kite; wind turbines turn wind into
  electricity (Ethiopia has wind farms, such as at Adama).

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ሲነፍስ ይሰማል፣ ሲሄድ ይታያል፦ ነፋስ የሚሄድ አየር ነው!» and «ተርባይን».
*/
const story: Story = {
  id: "kites-and-clouds",
  course: "science-nature",
  pack: "story",
  title: { en: "Kites and Clouds", am: "ካይትና ደመና" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#5BA0D8",
  scene: "lib-kites-and-clouds",
  coverPage: 3,
  teaches: { words: ["wind", "air", "cloud", "storm", "kiremt", "bega"] },
  pages: [
    {
      en: "Anbessa had a new kite, red and yellow. He ran up the hill and let it go. Flop! It fell in the grass. \"Where is the wind today?\"",
      am: "አንበሳ ቀይና ቢጫ አዲስ ካይት ነበረው። ወደ ኮረብታው ሮጦ ለቀቀው። ዘፍ! ሣሩ ላይ ወደቀ። «ዛሬ ነፋሱ የት ነው?»",
    },
    {
      en: "\"What IS wind?\" asked Anbessa. \"Moving air,\" said Grandma. \"You can't see air, but you can feel it push.\" Anbessa blew on his paw. Whoosh!",
      am: "«ነፋስ ምንድን ነው?» አለ አንበሳ። «የሚንቀሳቀስ አየር ነው» አሉ አያቴ። «አየር አይታይም፤ ሲገፋ ግን ይሰማል።» አንበሳ በእጁ ላይ እፍ አለ። ፉው!",
    },
    {
      en: "In the afternoon the grass bent, the smoke leaned and the washing flapped. A ribbon on a stick showed the way. Feel it blow, watch it go: the wind is air on the go!",
      am: "ከሰዓት በኋላ ሣሩ ጎበጠ፤ ጢሱ ዘመመ፤ ልብሱ ተርገበገበ። በእንጨት ላይ ያለ ሪባን አቅጣጫውን አሳየ። ሲነፍስ ይሰማል፣ ሲሄድ ይታያል፦ ነፋስ የሚሄድ አየር ነው!",
    },
    {
      en: "Anbessa ran into the wind and let go. Up, up went the kite! The wind pushed it high over the hill, and it tugged on the string.",
      am: "አንበሳ ወደ ነፋሱ ሮጦ ለቀቀው። ካይቱ ወደ ላይ፣ ወደ ላይ ወጣ! ነፋሱ ከኮረብታው በላይ ከፍ አደረገው፤ ገመዱንም ጎተተ።",
    },
    {
      en: "The wind pushed the clouds too. \"Fluffy white clouds on a sunny day mean fine weather,\" said Grandma. \"Good for kites!\"",
      am: "ነፋሱ ደመናዎቹንም ገፋ። «በፀሐያማ ቀን ነጫጭ ለስላሳ ደመናዎች ጥሩ አየር ማለት ነው» አሉ አያቴ። «ለካይት ጥሩ ነው!»",
    },
    {
      en: "\"Thin, wispy clouds, very high up, are made of tiny bits of ice. And tall, dark clouds that pile up high bring storms and rain.\" Feel it blow, watch it go!",
      am: "«ከፍ ብለው ያሉ ቀጫጭን ደመናዎች ከጥቃቅን በረዶ የተሠሩ ናቸው። ረጃጅም ጥቁር ደመናዎች ደግሞ ማዕበልና ዝናብ ያመጣሉ።» ሲነፍስ ይሰማል፣ ሲሄድ ይታያል!",
    },
    {
      en: "\"In kiremt, from about June to September, wet winds bring lots of clouds and the big rains,\" said Grandma. \"In bega, the sky is clear and dry.\"",
      am: "«በክረምት፣ ከሰኔ እስከ መስከረም ገደማ፣ እርጥብ ነፋሶች ብዙ ደመናና ትልቁን ዝናብ ያመጣሉ» አሉ አያቴ። «በበጋ ሰማዩ ጥርት ያለና ደረቅ ነው።»",
    },
    {
      en: "Then Anbessa saw tall, dark clouds piling up, and the wind was blowing them this way. Tsehay's washing was still on the line!",
      am: "ከዚያ አንበሳ ረጃጅም ጥቁር ደመናዎች ሲከማቹ አየ፤ ነፋሱም ወደዚህ እየገፋቸው ነበር። የፀሐይ ልብሶች አሁንም በገመዱ ላይ ነበሩ!",
    },
    {
      en: "\"A storm is coming!\" Anbessa pulled down his kite. He and Tsehay ran and grabbed the washing. Just as they reached the door, the rain poured down. Crash!",
      am: "«ማዕበል እየመጣ ነው!» አንበሳ ካይቱን አወረደ። እሱና ፀሐይ ሮጠው ልብሶቹን ሰበሰቡ። በሩ ጋ እንደደረሱ ዝናቡ አወረደው። ጓ!",
    },
    {
      en: "\"Good sky-reading!\" said Grandma. \"In a storm, we stay indoors and never fly kites.\" Soon the storm passed, and the wind and sun dried everything.",
      am: "«ሰማዩን በደንብ አነበብክ!» አሉ አያቴ። «በማዕበል ቤት እንቆያለን፤ ካይትም አናበርም።» ማዕበሉ አለፈ፤ ነፋሱና ፀሐይም ሁሉን አደረቁ።",
    },
    {
      en: "Tsehay made a paper pinwheel. The wind spun it round and round! \"Near Adama,\" said Grandma, \"giant pinwheels turn in the wind and make electricity.\"",
      am: "ፀሐይ የወረቀት ማሽከርከሪያ ሠራች። ነፋሱ አሽከረከረው! «በአዳማ አጠገብ» አሉ አያቴ፣ «ግዙፍ ማሽከርከሪያዎች በነፋስ ዞረው ኤሌክትሪክ ይሠራሉ።»",
    },
    {
      en: "Next morning, white fluffy clouds sailed by. Anbessa's kite flew high, and Tsehay's pinwheel spun. \"Feel it blow, watch it go: the wind is air on the go!\"",
      am: "በማግሥቱ ነጫጭ ደመናዎች ተንሳፈፉ። የአንበሳ ካይት ከፍ ብሎ በረረ፤ የፀሐይ ማሽከርከሪያ ዞረ። «ሲነፍስ ይሰማል፣ ሲሄድ ይታያል፦ ነፋስ የሚሄድ አየር ነው!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["How can you tell the wind is blowing if you can't see air? Which way is it blowing today?", "What did the tall, dark clouds tell Anbessa? What should we do in a storm?"],
      am: ["አየር ካልታየ ነፋስ እየነፈሰ መሆኑን እንዴት ታውቃላችሁ? ዛሬ ወደ የትኛው አቅጣጫ ይነፍሳል?", "ረጃጅሞቹ ጥቁር ደመናዎች ለአንበሳ ምን ነገሩት? በማዕበል ጊዜ ምን ማድረግ አለብን?"],
    },
    activity: {
      en: "Tie a strip of cloth to a stick and plant it outside: which way does the wind blow in the morning, and in the afternoon? Look at the clouds each day for a week and draw them: fluffy, wispy or tall and dark?",
      am: "የጨርቅ ቁራጭ ከእንጨት ጋር አስራችሁ ውጭ ትከሉ፦ ጠዋትና ከሰዓት በኋላ ነፋሱ ወደ የት ይነፍሳል? ለአንድ ሳምንት በየቀኑ ደመናዎቹን ተመልክታችሁ ሣሉ፦ ለስላሳ፣ ቀጭን ወይስ ረጅምና ጥቁር?",
    },
  },
};

export default story;
