import type { Story } from "../../../stories";

/*
  "Knock, Knock, Little Fox ቀ" (Fidel Foundations, level 2): the ቀ family, its special popping
  sound, and the child's first three-part word. Qeyu ("the red one"), a pup of the red Ethiopian
  wolf that Amharic calls ቀይ ቀበሮ, is gathering breakfast (ቁርስ) for Grandma. He knocks on the
  ቀ family's seven doors, ቅ ቅ!, and each gives him something that starts with its letter:
  ቆሎ (roasted grain), ቅቤ (butter), ቂጣ (flatbread), ቃሪያ (green pepper), ቄጠማ (fresh grass to
  spread for a happy day). At Grandma's he reads ቀ+በ+ሮ ቀበሮ, fox: that's him!
  The ቀ sound (an ejective k) is new to English ears; it is described as "a k with a little pop,
  from the back of the throat". The join-in line is "Knock, knock, ቅ ቅ! Who's at the door?"
  Every word read aloud uses only letters met so far (ቆሎ: ቆ ሎ; ቅቤ: ቅ ቤ; ቀበሮ: ቀ በ ሮ).

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the name ቀዩ, the description of the sound (page 2), ቄጠማ (sometimes written ቄጤማ, page 6)
  and «በሩን ማን አንኳኳ?» as the join-in line.
*/
const story: Story = {
  id: "fidel-fox-knock",
  course: "fidel-foundations",
  pack: "fidel",
  title: { en: "Knock, Knock, Little Fox ቀ", am: "ቅ ቅ፣ ትንሹ ቀበሮ ቀ" },
  category: "Fidel",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#D2562B",
  scene: "lib-fidel-fox-knock",
  coverPage: 3,
  teaches: { fidel: ["ቀ"], words: ["ቁርስ", "ቆሎ", "ቅቤ", "ቂጣ", "ቃሪያ", "ቀበሮ"] },
  pages: [
    {
      en: "High in the cold Bale Mountains lives a little red fox. Red is ቀይ, so everyone calls him Qeyu, the red one. This morning he has a basket, and a plan.",
      am: "በቀዝቃዛው የባሌ ተራሮች ላይ አንድ ትንሽ ቀይ ቀበሮ ይኖራል። ሁሉም ቀዩ ብለው ይጠሩታል። ዛሬ ጠዋት ቅርጫት ይዟል፤ አንድ ዕቅድም አለው።",
    },
    {
      en: `"I'm making breakfast for Grandma," says Qeyu. "Breakfast is ቁርስ, and it starts with ቁ, from my favourite family!" The ቀ family live in seven little houses down the hill.`,
      am: "«ለአያቴ ቁርስ ላዘጋጅ ነው» አለ ቀዩ። «ቁርስ በቁ ይጀምራል፤ ከምወደው ቤተሰብ!» የቀ ቤተሰብ ከኮረብታው ግርጌ በሰባት ትንንሽ ቤቶች ይኖራሉ።",
    },
    {
      en: "Their sound is special: a k with a little pop, from the back of the throat, like a drop falling into a bucket. ቅ! Try it: ቅ, ቅ!",
      am: "ድምፃቸው ልዩ ነው፦ ከጉሮሮ ጀርባ የሚወጣ፣ ትንሽ የሚፈነዳ ድምፅ፤ ልክ ባልዲ ውስጥ እንደምትወድቅ ጠብታ። ቅ! ሞክሩት፦ ቅ፣ ቅ!",
    },
    {
      en: `Knock, knock, ቅ ቅ! Who's at the door? It's ቆ, "qo". ቆ gives Qeyu a bag of crunchy roasted grain. "ቆ… ሎ… ቆሎ!"`,
      am: "ቅ፣ ቅ! በሩን ማን አንኳኳ? ቆ ከፈተ፤ «ቆ» ይላል። ቆ ለቀዩ የሚቆረጠም ቆሎ በከረጢት ሰጠው። «ቆ… ሎ… ቆሎ!»",
    },
    {
      en: `Knock, knock, ቅ ቅ! Next door is ቅ, the quiet one, who says just "q". ቅ gives him a little pot of golden butter. "ቅ… ቤ… ቅቤ!"`,
      am: "ቅ፣ ቅ! በሚቀጥለው በር ጸጥተኛው ቅ አለ፤ «ቅ» ብቻ ይላል። ቅ ትንሽ ማሰሮ ወርቃማ ቅቤ ሰጠው። «ቅ… ቤ… ቅቤ!»",
    },
    {
      en: `ቂ, "qi", gives him a warm round ቂጣ. ቃ, "qaa", gives him a little green pepper, a ቃሪያ. "Not too hot, please!" says Qeyu, fanning his tongue.`,
      am: "ቂ «ቂ» ይላል፤ ሞቅ ያለ ክብ ቂጣ ሰጠው። ቃ «ቃ» ይላል፤ ትንሽ አረንጓዴ ቃሪያ ሰጠው። «በጣም የሚያቃጥል አይሁን፣ እባክህ!» አለ ቀዩ ምላሱን እያራገበ።",
    },
    {
      en: `Knock, knock, ቅ ቅ! ቄ, "qay", opens her door with an armful of sweet-smelling fresh grass, ቄጠማ, to spread on the floor for a happy day.`,
      am: "ቅ፣ ቅ! ቄ «ቄ» ብላ በሯን ከፈተች፤ ለደስታ ቀን መሬት ላይ የሚጎዘጎዝ፣ መዓዛው ደስ የሚል እቅፍ ሙሉ ቄጠማ ይዛለች።",
    },
    {
      en: `Then ቀ, "qa", and ቁ, "qu", come running to help him carry it all. The basket is heavy now, and Qeyu's tail won't stop wagging.`,
      am: "ከዚያ ቀ «ቀ»፣ ቁ ደግሞ «ቁ» እያሉ ሁሉንም ለመሸከም ሊረዱት እየሮጡ መጡ። አሁን ቅርጫቱ ከብዷል፤ የቀዩ ጭራም መወዛወዙን አላቆመም።",
    },
    {
      en: `At last they reach Grandma's tukul. Knock, knock, ቅ ቅ! "Who's at the door?" calls Grandma. "It's us! We've brought breakfast!"`,
      am: "በመጨረሻ የአያቴ ጎጆ ደረሱ። ቅ፣ ቅ! «በሩን ማን አንኳኳ?» ብላ ጠራች አያቴ። «እኛ ነን! ቁርስ ይዘን መጣን!»",
    },
    {
      en: "Grandma spreads the fresh grass on the floor, and everyone sits down: Anbessa, Lali, Gugu, Qeyu and the whole ቀ family. ቆሎ, ቅቤ, ቂጣ… what a breakfast!",
      am: "አያቴ ቄጠማውን መሬት ላይ ጎዘጎዘች፤ ሁሉም ተቀመጡ፦ አንበሳ፣ ላሊ፣ ጉጉ፣ ቀዩና መላው የቀ ቤተሰብ። ቆሎ፣ ቅቤ፣ ቂጣ… እንዴት ያለ ቁርስ ነው!",
    },
    {
      en: `Then Grandma lays three cards on the mat: ቀ, በ, ሮ. "Read this one, Qeyu." He goes slowly: "ቀ… በ… ሮ… ቀበሮ!" His ears shoot up. "Fox! That's me!"`,
      am: "ከዚያ አያቴ ምንጣፉ ላይ ሦስት ካርዶች አስቀመጠች፦ ቀ፣ በ፣ ሮ። «ይሄን አንብበው፣ ቀዩ።» ቀስ ብሎ፦ «ቀ… በ… ሮ… ቀበሮ!» ጆሮዎቹ ቀጥ አሉ። «ቀበሮ! ያ እኔ ነኝ!»",
    },
    {
      en: "A word with three parts! Everyone claps three times: ቀ-በ-ሮ. Knock, knock, ቅ ቅ… who's at the door? Nobody at all. Just a happy little fox, thumping his tail.",
      am: "ሦስት ክፍል ያለው ቃል! ሁሉም ሦስት ጊዜ አጨበጨቡ፦ ቀ-በ-ሮ። ቅ፣ ቅ… በሩን ማን አንኳኳ? ማንም። ደስተኛው ትንሽ ቀበሮ በጭራው መሬቱን እየመታ ነው።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "ቀበሮ has three parts: ቀ-በ-ሮ. Clap them. Can you clap another three-part word? (አንበሳ: አን-በ-ሳ.)",
        "Qeyu brought ቆሎ, ቅቤ and ቂጣ. What would you bring to Grandma's breakfast?",
      ],
      am: [
        "ቀበሮ ሦስት ክፍሎች አሉት፦ ቀ-በ-ሮ። አጨብጭቧቸው። ሌላ ሦስት ክፍል ያለው ቃል ማጨብጨብ ትችላላችሁ? (አንበሳ፦ አን-በ-ሳ።)",
        "ቀዩ ቆሎ፣ ቅቤና ቂጣ አመጣ። እናንተ ለአያቴ ቁርስ ምን ታመጡ ነበር?",
      ],
    },
    activity: {
      en: "Make a knock-knock game: tape ቀ ቁ ቂ ቃ ቄ ቅ ቆ on seven boxes or doors. Knock (ቅ ቅ!), open, and say the sound together. Hide a little handful of ቆሎ or another snack behind ቆ!",
      am: "የማንኳኳት ጨዋታ ሥሩ፦ ቀ ቁ ቂ ቃ ቄ ቅ ቆን በሰባት ሳጥኖች ወይም በሮች ላይ ለጥፉ። አንኳኩ (ቅ ቅ!)፣ ክፈቱ፣ ድምፁንም አብራችሁ በሉ። ከቆ ጀርባ ትንሽ ቆሎ ወይም ሌላ መክሰስ ደብቁ!",
    },
  },
};

export default story;
