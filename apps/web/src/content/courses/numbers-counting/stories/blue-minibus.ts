import type { Story } from "../../../stories";

/*
  "The Busy Blue Minibus" (Numbers & Counting, level 3). One more and one less, with Gugu as
  the minibus conductor (the woyala) who counts every passenger: on gets one, the number goes
  up by one; off gets one, it goes down by one. Counting on when five goats climb in (3, then
  4, 5, 6, 7, 8 and not from one again); how many empty seats until all twelve are full; a
  bump in the road doesn't change the number; and counting back down to zero at Merkato.
  Passengers: 0 > 1 > 2 > 3 > 2 > 7 > 8 > 7 > 9 > 12 > 12 > 0.
  The repeated line to join in on: "One more? One less? Count and see!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the repeated line, «ወያላ» for the conductor and his call «መርካቶ! መርካቶ!», and «ጢጥ».
*/
const story: Story = {
  id: "blue-minibus",
  course: "numbers-counting",
  pack: "numbers",
  title: { en: "The Busy Blue Minibus", am: "ሥራ የበዛባት ሰማያዊ ሚኒባስ" },
  category: "Maths",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#1E6FB8",
  scene: "lib-blue-minibus",
  coverPage: 8,
  teaches: { numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], words: ["one more", "one less", "count on", "count back", "full", "empty"] },
  pages: [
    {
      en: 'Gugu leaned out of the little blue minibus. "Merkato! Merkato!" He was the conductor, and his job was to count. "Twelve seats, and zero passengers. Who is coming?"',
      am: "ጉጉ ከትንሿ ሰማያዊ ሚኒባስ አንገቱን አውጥቶ ጮኸ፦ «መርካቶ! መርካቶ!» እሱ ወያላው ነበር፤ ሥራውም መቁጠር ነበር። «አሥራ ሁለት ወንበሮች፣ ዜሮ ተሳፋሪዎች። ማን ይመጣል?»",
    },
    {
      en: 'A sheep climbed in. "One!" Then Grandma, with her basket. One more? One less? Count and see! "One more gets on: two!"',
      am: "አንድ በግ ገባ። «አንድ!» ከዚያ አያት በቅርጫቷ ገባች። አንድ ጨመረ? አንድ ቀነሰ? ቁጠሩና እዩ! «አንድ ሲገባ አንድ ይጨምራል፦ ሁለት!»",
    },
    {
      en: 'Shy Tsehay waved, and Gugu helped her up the step. "Two, and one more… three!" Every time one more gets on, the number goes up by one.',
      am: "ዓይናፋሯ ፀሐይ እጇን አውለበለበች፤ ጉጉም ደረጃውን እንድትወጣ ረዳት። «ሁለት፣ እና አንድ ተጨማሪ… ሦስት!» አንድ ተጨማሪ በገባ ቁጥር ቁጥሩ በአንድ ይጨምራል።",
    },
    {
      en: 'At the green field, the sheep hopped off for lunch. "Baa!" One more? One less? Count and see! "One gets off: three, one less… two!" The number goes down by one.',
      am: "አረንጓዴው መስክ ጋ በጉ ምሳ ሊበላ ዘሎ ወረደ። «ሜ!» አንድ ጨመረ? አንድ ቀነሰ? ቁጠሩና እዩ! «አንድ ሲወርድ፦ ከሦስት አንድ ያንሳል… ሁለት!» ቁጥሩ በአንድ ይቀንሳል።",
    },
    {
      en: 'Then a whole family of goats came running. Gugu didn\'t start again from one. He said "Two…" and kept going as they jumped in: "three, four, five, six, SEVEN!"',
      am: "ከዚያ አንድ ሙሉ የፍየሎች ቤተሰብ እየሮጠ መጣ። ጉጉ እንደገና ከአንድ አልጀመረም። «ሁለት…» ብሎ እየዘለሉ ሲገቡ ቀጠለ፦ «ሦስት፣ አራት፣ አምስት፣ ስድስት፣ ሰባት!»",
    },
    {
      en: 'Buzz! Lali flew in through the window. "Is there room for a bee?" One more? One less? Count and see! "One more than seven is eight!"',
      am: "ቡዝ! ላሊ በመስኮቱ በራ ገባች። «ለንብ ቦታ አለ?» አንድ ጨመረ? አንድ ቀነሰ? ቁጠሩና እዩ! «ከሰባት አንድ የሚበልጠው ስምንት ነው!»",
    },
    {
      en: 'At the school, the littlest goat jumped off with her school bag. "Bye!" "One less than eight is seven," said Gugu.',
      am: "ትምህርት ቤቱ ጋ ትንሿ ፍየል ቦርሳዋን ይዛ ዘላ ወረደች። «ቻው!» «ከስምንት አንድ የሚያንሰው ሰባት ነው» አለ ጉጉ።",
    },
    {
      en: 'Anbessa bounced on with his football: eight. The hare hopped on after him: nine. "Twelve seats, nine passengers," said Gugu. "How many empty seats?" They counted: one, two, three.',
      am: "አንበሳ ኳሱን ይዞ እየዘለለ ገባ፦ ስምንት። ጥንቸሏ ተከትላው ገባች፦ ዘጠኝ። «አሥራ ሁለት ወንበሮች፣ ዘጠኝ ተሳፋሪዎች» አለ ጉጉ። «ስንት ባዶ ወንበሮች አሉ?» ቆጠሩ፦ አንድ፣ ሁለት፣ ሦስት።",
    },
    {
      en: 'At the next stop, three friends were waiting, just right! "Ten, eleven, TWELVE! Every seat is full!" One more? One less? Count and see!',
      am: "በሚቀጥለው ፌርማታ ሦስት ጓደኞች እየጠበቁ ነበር፤ ልክ ነው! «አሥር፣ አሥራ አንድ፣ አሥራ ሁለት! ወንበሮቹ ሁሉ ሞሉ!» አንድ ጨመረ? አንድ ቀነሰ? ቁጠሩና እዩ!",
    },
    {
      en: 'BUMP! The minibus hit a hole in the road, and everyone bounced up in the air. "Did anyone fall out?" Gugu counted carefully. "Still twelve. Nobody got on, and nobody got off!"',
      am: "ዱብ! ሚኒባሷ መንገዱ ላይ ያለ ጉድጓድ ውስጥ ገባች፤ ሁሉም ወደ ላይ ዘለሉ። «የወደቀ አለ?» ጉጉ በጥንቃቄ ቆጠረ። «አሁንም አሥራ ሁለት። ማንም አልገባም፣ ማንም አልወረደም!»",
    },
    {
      en: '"Merkato!" Everyone climbed out, one at a time. Gugu counted back: "Twelve, eleven, ten, nine, eight, seven, six, five, four, three, two, one…"',
      am: "«መርካቶ!» ሁሉም አንድ በአንድ ወረዱ። ጉጉ ወደ ኋላ ቆጠረ፦ «አሥራ ሁለት፣ አሥራ አንድ፣ አሥር፣ ዘጠኝ፣ ስምንት፣ ሰባት፣ ስድስት፣ አምስት፣ አራት፣ ሦስት፣ ሁለት፣ አንድ…»",
    },
    {
      en: '"ZERO! Now it\'s my turn to sit down." Gugu flopped onto a seat. Toot, toot! One more? One less? Tomorrow, {name}, let\'s count together!',
      am: "«ዜሮ! አሁን የእኔ የመቀመጥ ተራ ነው።» ጉጉ ወንበር ላይ ዘፍ አለ። ጢጥ፣ ጢጥ! አንድ ጨመረ? አንድ ቀነሰ? ነገ፣ {name}፣ አብረን እንቆጥራለን!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "When a passenger got on, did the number get bigger or smaller? And when one got off?",
        "Gugu didn't start from one when the goats got on. How did he count instead?",
      ],
      am: [
        "አንድ ተሳፋሪ ሲገባ ቁጥሩ ጨመረ ወይስ ቀነሰ? አንዱ ሲወርድስ?",
        "ፍየሎቹ ሲገቡ ጉጉ ከአንድ አልጀመረም። በምትኩ እንዴት ቆጠረ?",
      ],
    },
    activity: {
      en: "Line up chairs or cushions as a minibus and use toys as passengers. Take turns being the conductor: \"One more gets on, how many now? One gets off, how many now?\" Then count everyone off at the last stop, back down to zero.",
      am: "ወንበሮችን ወይም ትራሶችን እንደ ሚኒባስ ደርድሩ፤ መጫወቻዎችን ደግሞ እንደ ተሳፋሪ ተጠቀሙ። ተራ በተራ ወያላ ሁኑ፦ «አንድ ገባ፣ አሁን ስንት ናቸው? አንድ ወረደ፣ አሁን ስንት ናቸው?» ከዚያ በመጨረሻው ፌርማታ ሁሉንም እያወረዳችሁ ወደ ዜሮ ቁጠሩ።",
    },
  },
};

export default story;
