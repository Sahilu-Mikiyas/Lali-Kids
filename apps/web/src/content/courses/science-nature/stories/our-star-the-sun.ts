import type { Story } from "../../../stories";

/*
  "Our Star, the Sun" (level 5: the Sun and the stars, constellations). On a clear bega night in the
  highlands, Haben and Grandpa Tolosa count the stars. Haben thinks stars are tiny lights; the Sun is
  big. Grandpa: the Sun is a star too, just very close; stars are suns so far away they look like
  dots. A torch close up is dazzling; across the valley it is a dot. Never look straight at the Sun.
  The Sun gives light and warmth; plants need it, and so do we. Stars twinkle because their light
  shakes as it passes through the air. People join stars into pictures (constellations): three stars
  in a row are Orion's belt. The problem: Haben wants to see stars from town but the lights are too
  bright; she works out that the dark highlands are best, and they find the belt. The Sun is "our
  star". Join-in line: "Every star's a sun, far, far away!"

  Science (kept simple and true): the Sun is a star (a huge ball of very hot gas) and the closest
  one; other stars are suns much farther away; the Sun's light takes about 8 minutes to reach us
  (left out here); never look at the Sun; city lights hide faint stars; Orion's belt (three bright
  stars in a row) is seen from Ethiopia in the evenings from about December to March; twinkling comes
  from our moving air.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «እያንዳንዱ ኮከብ ሩቅ ያለ ፀሐይ ነው!» and «የኦሪዮን ቀበቶ».
*/
const story: Story = {
  id: "our-star-the-sun",
  course: "science-nature",
  pack: "story",
  title: { en: "Our Star, the Sun", am: "ኮከባችን ፀሐይ" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#2A3480",
  scene: "lib-our-star-the-sun",
  coverPage: 2,
  teaches: { words: ["star", "Sun", "light", "warmth", "constellation"] },
  pages: [
    {
      en: "On a clear bega night in the highlands, Haben and Grandpa Tolosa lay on the grass and looked up. So many stars! \"Are they tiny lamps?\" asked Haben.",
      am: "ጥርት ባለ የበጋ ሌሊት ሐበንና አባ ቶሎሳ በደጋው ሣር ላይ ተኝተው ቀና ብለው አዩ። ብዙ ከዋክብት! «ትንንሽ መብራቶች ናቸው?» አለች ሐበን።",
    },
    {
      en: "\"Each star is a sun,\" said Grandpa, \"a huge, hot ball of glowing gas. They are so far away, they look like tiny dots.\"",
      am: "«እያንዳንዱ ኮከብ ፀሐይ ነው» አሉ አባ ቶሎሳ፤ «ግዙፍና በጣም ሞቃት የሚያበራ ጋዝ ኳስ። በጣም ሩቅ ስለሆኑ ትንንሽ ነጥብ ይመስላሉ።»",
    },
    {
      en: "\"And our Sun?\" \"Our Sun is a star too, the closest one. That's why it looks so big and bright.\" Every star's a sun, far, far away!",
      am: "«የእኛ ፀሐይስ?» «ፀሐያችንም ኮከብ ናት፤ ከሁሉ የምትቀርበው። ትልቅና ብሩህ የምትመስለው ለዚህ ነው።» እያንዳንዱ ኮከብ ሩቅ ያለ ፀሐይ ነው!",
    },
    {
      en: "Haben wasn't sure. So Grandpa walked far across the valley with a torch. Up close it had dazzled her. Now it was just a tiny dot, like a star!",
      am: "ሐበን እርግጠኛ አልነበረችም። ስለዚህ አባ ቶሎሳ ባትሪ ይዘው ሸለቆውን አቋርጠው ሄዱ። ቅርብ ሲሆን ዓይኗን ያጥበረብር ነበር። አሁን እንደ ኮከብ ትንሽ ነጥብ ሆነ!",
    },
    {
      en: "\"The Sun is so bright, we must never look straight at it,\" said Grandpa. \"It can hurt our eyes, even with sunglasses.\" Every star's a sun, far, far away!",
      am: "«ፀሐይ በጣም ብሩህ ስለሆነች በቀጥታ ፈጽሞ ማየት የለብንም» አሉ አባ ቶሎሳ። «የፀሐይ መነጽር ብናደርግም ዓይናችንን ሊጎዳ ይችላል።» እያንዳንዱ ኮከብ ሩቅ ያለ ፀሐይ ነው!",
    },
    {
      en: "\"The Sun gives us light and warmth. Plants need its light to make food, and we need the plants. Without the Sun, nothing on Earth could live.\"",
      am: "«ፀሐይ ብርሃንና ሙቀት ትሰጠናለች። ተክሎች ምግብ ለመሥራት ብርሃኗ ያስፈልጋቸዋል፤ እኛም ተክሎቹ ያስፈልጉናል። ያለ ፀሐይ በምድር ምንም አይኖርም።»",
    },
    {
      en: "\"Why do stars twinkle?\" \"Their light shakes as it comes through the moving air,\" said Grandpa. \"Like pebbles seen through a stream.\"",
      am: "«ከዋክብት ለምን ያብለጨልጫሉ?» «ብርሃናቸው በሚንቀሳቀሰው አየር ውስጥ ሲያልፍ ይንቀጠቀጣል» አሉ አባ ቶሎሳ። «በጅረት ውስጥ እንደሚታዩ ጠጠሮች።»",
    },
    {
      en: "\"Long ago, people joined stars into pictures, called constellations. Look: three bright stars in a row. That's the belt of Orion, the hunter.\"",
      am: "«ድሮ ሰዎች ከዋክብትን አገናኝተው ሥዕሎች ሠሩ፤ ህብረ ከዋክብት ይባላሉ። እይ፦ በመስመር ያሉ ሦስት ብሩህ ኮከቦች። የአዳኙ የኦሪዮን ቀበቶ ነው።»",
    },
    {
      en: "Back in town, Haben looked for the belt to show Gugu. But she could hardly see any stars! Street lights and house lights glowed everywhere.",
      am: "ወደ ከተማ ስትመለስ ሐበን ቀበቶውን ለጉጉ ልታሳይ ፈለገች። ግን ከዋክብት በጭራሽ አይታዩም ነበር! የመንገድና የቤት መብራቶች በየቦታው አበሩ።",
    },
    {
      en: "Haben thought hard. \"The lights are too bright! The faint stars get lost. We need a dark place.\" So they walked up the hill, away from the lights.",
      am: "ሐበን አሰበች። «መብራቶቹ በጣም ያበራሉ! ደካማዎቹ ኮከቦች ይጠፋሉ። ጨለማ ቦታ ያስፈልገናል።» ስለዚህ ከመብራቶቹ ርቀው ወደ ኮረብታው ወጡ።",
    },
    {
      en: "Up on the dark hill, the sky filled with stars. \"There!\" Three stars in a row. \"Orion's belt!\" Gugu gasped. Every star's a sun, far, far away!",
      am: "በጨለማው ኮረብታ ላይ ሰማዩ በከዋክብት ተሞላ። «እዚያ!» በመስመር ያሉ ሦስት ኮከቦች። «የኦሪዮን ቀበቶ!» ጉጉ ተደነቀ። እያንዳንዱ ኮከብ ሩቅ ያለ ፀሐይ ነው!",
    },
    {
      en: "In the morning, the Sun rose warm and golden. Haben shaded her eyes and looked away. \"Good morning, our own star!\" Every star's a sun, far, far away!",
      am: "ጠዋት ፀሐይ ሞቃትና ወርቃማ ሆና ወጣች። ሐበን ዓይኗን ጋርዳ ዞር አለች። «እንደምን አደርሽ የራሳችን ኮከብ!» እያንዳንዱ ኮከብ ሩቅ ያለ ፀሐይ ነው!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why does the Sun look so much bigger than the other stars?", "Why could Haben hardly see the stars in town? Why must we never look straight at the Sun?"],
      am: ["ፀሐይ ከሌሎቹ ከዋክብት ለምን በጣም ትልቅ ትመስላለች?", "ሐበን በከተማ ከዋክብትን ለምን ማየት አቃታት? ፀሐይን በቀጥታ ለምን ማየት የለብንም?"],
    },
    activity: {
      en: "On a clear evening, go somewhere dark with a grown-up and look for three bright stars in a row (Orion's belt is easiest to see from December to March). Try the torch test: look at a torch close up, then from far away.",
      am: "በጥርት ያለ ምሽት ከትልቅ ሰው ጋር ወደ ጨለማ ቦታ ሄዳችሁ በመስመር ያሉ ሦስት ብሩህ ኮከቦችን ፈልጉ (የኦሪዮን ቀበቶ ከታኅሣሥ እስከ መጋቢት በቀላሉ ይታያል)። የባትሪውን ሙከራ ሞክሩ፦ ባትሪን በቅርብ፣ ከዚያ ከሩቅ ተመልከቱ።",
    },
  },
};

export default story;
