import type { Story } from "../../../stories";

/*
  "One Goat, Many Goats" (Amharic Readers, level 3): plurals, and everyday market words. Grandma
  sends Gugu and Tsehay to the Saturday market with a list: ሎሚዎች፣ ቲማቲሞች፣ አንድ ዱባ፣
  እንቁላሎች። Gugu buys one lemon; Tsehay notices the ending: ዎች or ኦች means many. A word that
  ends in a vowel sound adds ዎች (ሎሚ → ሎሚዎች, ዶሮ → ዶሮዎች, ጫማ → ጫማዎች); a word that ends in a
  quiet (sixth-form) letter joins ኦች to it (ቲማቲም → ቲማቲሞች, ፍየል → ፍየሎች, በግ → በጎች, ልጅ →
  ልጆች). Then the plural game gets out of hand (ፀሐዮች? there's only one Tsehay!). The join-in
  line is "A little ending makes many!" (ትንሽ መጨረሻ ብዙ ያደርጋል!).

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line and how the two endings are explained (pages 3–4); some common words have
  other plurals (for example አበቦች, መጻሕፍት), which this story leaves for later.
*/
const story: Story = {
  id: "gugus-market-list",
  course: "amharic-readers",
  pack: "story",
  title: { en: "One Goat, Many Goats", am: "አንድ ፍየል፣ ብዙ ፍየሎች" },
  category: "Fidel",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#C9732A",
  scene: "lib-gugus-market-list",
  coverPage: 7,
  teaches: { words: ["ሎሚዎች", "ቲማቲሞች", "እንቁላሎች", "ፍየሎች", "በጎች", "ዶሮዎች", "ልጆች"] },
  pages: [
    {
      en: `It's Saturday, market day! Grandma gives Gugu and Tsehay a basket and a list: ሎሚዎች፣ ቲማቲሞች፣ አንድ ዱባ፣ እንቁላሎች። "Read it carefully," she says. "Every word matters."`,
      am: "ቅዳሜ ነው፤ የገበያ ቀን! አያቴ ለጉጉና ለፀሐይ ቅርጫትና ዝርዝር ሰጠቻቸው፦ ሎሚዎች፣ ቲማቲሞች፣ አንድ ዱባ፣ እንቁላሎች። «በጥንቃቄ አንብቡት» አለች። «እያንዳንዱ ቃል ዋጋ አለው።»",
    },
    {
      en: `The market is busy and loud. Goats bleat, hens cluck, and sellers call out from under bright umbrellas. Gugu runs straight to the lemons. "ሎሚ! Lemon!" He buys one lemon and puts it in the basket. "Done!"`,
      am: "ገበያው ሕዝብ የበዛበትና ጫጫታ ያለበት ነው። ፍየሎች ይጮኻሉ፣ ዶሮዎች ይንጫጫሉ፤ ነጋዴዎች ከደማቅ ጃንጥላዎች ሥር ይጣራሉ። ጉጉ በቀጥታ ወደ ሎሚዎቹ ሮጠ። «ሎሚ!» አንድ ሎሚ ገዝቶ ቅርጫቱ ውስጥ ከተተ። «አለቀ!»",
    },
    {
      en: `Tsehay looks at the list again. "It doesn't say ሎሚ. It says ሎሚዎች. See the ending, ዎች? That means many lemons!" A little ending makes many!`,
      am: "ፀሐይ ዝርዝሩን እንደገና ተመለከተች። «‹ሎሚ› አይልም። ‹ሎሚዎች› ይላል። መጨረሻውን አየኸው? ‹ዎች› ማለት ብዙ ሎሚ ማለት ነው!» ትንሽ መጨረሻ ብዙ ያደርጋል!",
    },
    {
      en: `"ሎሚ ends with a vowel sound: mi," explains Tsehay. "So it adds ዎች: ሎሚዎች. Like ዶሮ, ዶሮዎች, and ጫማ, ጫማዎች." Gugu buys six more lemons. Now there are lots!`,
      am: "«ሎሚ በአናባቢ ድምፅ ያልቃል፦ ሚ» ብላ አስረዳች ፀሐይ። «ስለዚህ ‹ዎች› ይጨመርለታል፦ ሎሚዎች። እንደ ዶሮ፣ ዶሮዎች፤ እንደ ጫማ፣ ጫማዎች።» ጉጉ ስድስት ተጨማሪ ሎሚዎችን ገዛ። አሁን ብዙ ሆኑ!",
    },
    {
      en: `Next: ቲማቲሞች. "ቲማቲም ends with ም, a quiet sixth-form letter," says Tsehay. "Then the ending joins on: ም and ኦች make ሞች. ቲማቲሞች!" They fill the basket with shiny red tomatoes.`,
      am: "ቀጥሎ፦ ቲማቲሞች። «ቲማቲም በ‹ም› ያልቃል፤ ጸጥ ያለ ስድስተኛ ፊደል ነው» አለች ፀሐይ። «ያኔ መጨረሻው ይጣበቃል፦ ም እና ኦች ሞች ይሆናሉ። ቲማቲሞች!» ቅርጫቱን በሚያብረቀርቁ ቀያይ ቲማቲሞች ሞሉት።",
    },
    {
      en: `Then: አንድ ዱባ. Gugu picks up three pumpkins. "Wait," laughs Tsehay. "No ending, and it says አንድ: one! Just one pumpkin." Phew. Three pumpkins would never fit in the basket.`,
      am: "ከዚያ፦ አንድ ዱባ። ጉጉ ሦስት ዱባዎችን አነሣ። «ቆይ» ብላ ሳቀች ፀሐይ። «መጨረሻ የለውም፤ ደግሞም ‹አንድ› ይላል! አንድ ዱባ ብቻ።» እፎይ። ሦስት ዱባ ቅርጫቱ ውስጥ አይገባም ነበር።",
    },
    {
      en: `Last on the list: እንቁላሎች. Gugu reads it himself, slowly: "እንቁላል… ሎች. ል and ኦች make ሎች. Many eggs!" He carries them very, very carefully. A little ending makes many!`,
      am: "በዝርዝሩ መጨረሻ፦ እንቁላሎች። ጉጉ ራሱ ቀስ ብሎ አነበበው፦ «እንቁላል… ሎች። ል እና ኦች ሎች ይሆናሉ። ብዙ እንቁላል!» በጣም፣ በጣም በጥንቃቄ ያዛቸው። ትንሽ መጨረሻ ብዙ ያደርጋል!",
    },
    {
      en: `On the way out they pass the animal market. Gugu reads the signs: በግ, በጎች. ፍየል, ፍየሎች. ዶሮ, ዶሮዎች. A little kid goat trots after them. "አንድ ፍየል!" says Tsehay. "Only one, and she's not on our list!"`,
      am: "ሲወጡ በእንስሳት ገበያው በኩል አለፉ። ጉጉ ምልክቶቹን አነበበ፦ በግ፣ በጎች። ፍየል፣ ፍየሎች። ዶሮ፣ ዶሮዎች። አንዲት ትንሽ የፍየል ግልገል ተከተለቻቸው። «አንድ ፍየል!» አለች ፀሐይ። «አንድ ብቻ፤ ደግሞም በዝርዝራችን ላይ የለችም!»",
    },
    {
      en: `Now Gugu makes everything many. "ልጅ, ልጆች! ጫማ, ጫማዎች! ተማሪ, ተማሪዎች! ፀሐይ…" He looks at Tsehay and grins. "ፀሐዮች! Lots of Tsehays!"`,
      am: "አሁን ጉጉ ሁሉንም ነገር ብዙ ያደርጋል። «ልጅ፣ ልጆች! ጫማ፣ ጫማዎች! ተማሪ፣ ተማሪዎች! ፀሐይ…» ፀሐይን አይቶ ፈገግ አለ። «ፀሐዮች! ብዙ ፀሐዮች!»",
    },
    {
      en: `Tsehay laughs so hard she nearly drops the tomatoes. "There's only one sun in the sky, and only one me!" A little ending makes many, but not everything comes in many!`,
      am: "ፀሐይ ቲማቲሞቹን ልትጥል እስክትደርስ ድረስ ሳቀች። «በሰማይ ላይ ያለችው ፀሐይ አንድ ናት፤ እኔም አንድ ብቻ ነኝ!» ትንሽ መጨረሻ ብዙ ያደርጋል፤ ግን ሁሉም ነገር ብዙ አይሆንም!",
    },
    {
      en: `At home Grandma checks the basket against the list. Lemons, many. Tomatoes, many. One pumpkin. Eggs, many, and not one broken! "Everything is right," she says. "You read every ending."`,
      am: "ቤት ሲደርሱ አያቴ ቅርጫቱን ከዝርዝሩ ጋር አስተያየች። ሎሚዎች፣ ብዙ። ቲማቲሞች፣ ብዙ። አንድ ዱባ። እንቁላሎች፣ ብዙ፤ አንድም አልተሰበረም! «ሁሉም ትክክል ነው» አለች። «እያንዳንዱን መጨረሻ አንብባችኋል።»",
    },
    {
      en: `That evening the tomatoes go into the wot and the pumpkin into the soup. Gugu counts around the table: "One Grandma, two friends, and many, many lemons!" A little ending makes many!`,
      am: "በዚያ ምሽት ቲማቲሞቹ ወደ ወጡ፣ ዱባው ደግሞ ወደ ሾርባው ገቡ። ጉጉ በገበታው ዙሪያ ቆጠረ፦ «አንድ አያት፣ ሁለት ጓደኛሞች፣ ብዙ፣ ብዙ ሎሚዎች!» ትንሽ መጨረሻ ብዙ ያደርጋል!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["What was the difference between ሎሚ and ሎሚዎች on Grandma's list?", "Why can't we say ፀሐዮች about Tsehay?"],
      am: ["በአያቴ ዝርዝር ላይ በ«ሎሚ» እና በ«ሎሚዎች» መካከል ያለው ልዩነት ምን ነበር?", "ስለ ፀሐይ ስናወራ «ፀሐዮች» ማለት ለምን አንችልም?"],
    },
    activity: {
      en: "Write a real shopping list together, with some words for one thing and some for many (ሙዝ / ሙዞች, ሎሚ / ሎሚዎች). At the shop or market, your child reads the list and checks: one, or many?",
      am: "አብራችሁ እውነተኛ የገበያ ዝርዝር ጻፉ፤ አንዳንዱ ቃል ለአንድ ነገር፣ አንዳንዱ ለብዙ ይሁን (ሙዝ / ሙዞች፣ ሎሚ / ሎሚዎች)። በሱቅ ወይም በገበያ ልጃችሁ ዝርዝሩን አንብቦ ያረጋግጥ፦ አንድ ነው ወይስ ብዙ?",
    },
  },
};

export default story;
