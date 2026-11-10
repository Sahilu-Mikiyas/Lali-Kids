import type { Story } from "../../../stories";

/*
  "Count Them Home!" (level 2: farm animals, their sounds, and numbers 1 to 10 in English).
  Big rain clouds are rolling over Grandpa Tolosa's farm in the Bale Mountains. He has TEN animals,
  and asks Hawi and Anbessa to bring them in through the gate, counting in English. In come the
  cow (one), the horse (two), two goats, two sheep, two hens and the dog: NINE. Somebody is
  missing, and the first raindrops are falling. Anbessa names the ones they have and works out
  who isn't there, then listens: "HEE-HAW!" The donkey is under the eucalyptus trees, munching.
  Ten! The gate shuts just as the big rain comes.
  Join-in line: "Count them, count them, count them home!" (and the counting itself).

  English taught: one to ten; cow, horse, goat(s), sheep, hen(s), dog, donkey; the sounds moo,
  neigh, maa, baa, cluck, woof, hee-haw. (Sheep stays "sheep" for one or two; a note for parents
  is in the grown-ups card.)

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ቁጠሯቸው፣ ቁጠሯቸው፣ ቤት አስገቧቸው!» and the animal sounds as written in Ethiopic.
*/
const story: Story = {
  id: "count-them-home",
  course: "english-first-words",
  pack: "story",
  title: { en: "Count Them Home!", am: "Count Them Home! ቆጥረን እናስገባቸው!" },
  category: "English",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#2E9A5B",
  scene: "lib-count-them-home",
  coverPage: 9,
  teaches: { numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], words: ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "cow", "horse", "goat", "sheep", "hen", "dog", "donkey"] },
  pages: [
    {
      en: 'Big gray clouds rolled over the hills. "The rain is coming!" said Grandpa Tolosa. "Hawi, Anbessa, please bring my animals home. I have TEN. Count them in English!"',
      am: "ትልልቅ ግራጫ ደመናዎች በኮረብታዎቹ ላይ ተንከባለሉ። «ዝናብ እየመጣ ነው!» አሉ አባ ቶሎሳ። «ሀዊ፣ አንበሳ፣ እባካችሁ እንስሶቼን ወደ ቤት አስገቡልኝ። አሥር ናቸው። በእንግሊዝኛ ቁጠሯቸው!»",
    },
    {
      en: 'Hawi opened the gate, and Anbessa stood beside it to count. First came the big brown cow. "ONE! One cow!" Moo! Count them, count them, count them home!',
      am: "ሀዊ በሩን ከፈተች፤ አንበሳ ለመቁጠር አጠገቡ ቆመ። መጀመሪያ ትልቋ ቡናማ ላም መጣች። «ONE! One cow!» (አንድ ላም!) ሙው! ቁጠሯቸው፣ ቁጠሯቸው፣ ቤት አስገቧቸው!",
    },
    {
      en: 'Clip-clop, clip-clop. "TWO! A horse!" Neigh! Count them, count them, count them home!',
      am: "ኮቴ፣ ኮቴ፣ ኮቴ። «TWO! A horse!» (ሁለት፤ ፈረስ!) ሂሂሂ! ቁጠሯቸው፣ ቁጠሯቸው፣ ቤት አስገቧቸው!",
    },
    {
      en: 'Two little goats came skipping in. "THREE, FOUR! Two goats!" Maa, maa! Count them, count them, count them home!',
      am: "ሁለት ትንንሽ ፍየሎች እየዘለሉ ገቡ። «THREE, FOUR! Two goats!» (ሦስት፣ አራት፤ ሁለት ፍየሎች!) ሜ፣ ሜ! ቁጠሯቸው፣ ቁጠሯቸው፣ ቤት አስገቧቸው!",
    },
    {
      en: 'Two woolly sheep trotted in. "FIVE, SIX! Two sheep!" Baa, baa! Count them, count them, count them home!',
      am: "ሁለት ባለ ጥቅጥቅ ፀጉር በጎች ሮጥ ሮጥ እያሉ ገቡ። «FIVE, SIX! Two sheep!» (አምስት፣ ስድስት፤ ሁለት በጎች!) ባ፣ ባ! ቁጠሯቸው፣ ቁጠሯቸው፣ ቤት አስገቧቸው!",
    },
    {
      en: 'Two hens ran in, flapping their wings. "SEVEN, EIGHT! Two hens!" Cluck, cluck! Count them, count them, count them home!',
      am: "ሁለት ዶሮዎች ክንፎቻቸውን እያርገበገቡ ሮጠው ገቡ። «SEVEN, EIGHT! Two hens!» (ሰባት፣ ስምንት፤ ሁለት ዶሮዎች!) ኮት፣ ኮት! ቁጠሯቸው፣ ቁጠሯቸው፣ ቤት አስገቧቸው!",
    },
    {
      en: 'Last came the dog, wagging his tail. "NINE! The dog!" Woof! Hawi closed the gate.',
      am: "በመጨረሻ ውሻው ጭራውን እያወዛወዘ መጣ። «NINE! The dog!» (ዘጠኝ፤ ውሻው!) ዋው! ሀዊ በሩን ዘጋች።",
    },
    {
      en: '"Nine," said Anbessa. Hawi frowned. "But Grandpa has TEN animals. Somebody is missing!" Drip, drop. The first raindrops began to fall.',
      am: "«ዘጠኝ» አለ አንበሳ። ሀዊ ፊቷን ቋጠረች። «አያቴ ግን አሥር እንስሳት አሏቸው። አንዱ ጎድሏል!» ጠብ፣ ጠብ። የመጀመሪያዎቹ የዝናብ ጠብታዎች መውደቅ ጀመሩ።",
    },
    {
      en: 'Anbessa looked at the animals. "Cow, horse, goats, sheep, hens, dog… Who isn\'t here?" He closed his eyes and listened very carefully.',
      am: "አንበሳ እንስሶቹን ተመለከተ። «Cow፣ horse፣ goats፣ sheep፣ hens፣ dog… ማን የለም?» ዓይኖቹን ጨፍኖ በጣም በጥንቃቄ አዳመጠ።",
    },
    {
      en: 'From under the eucalyptus trees came a loud "HEE-HAW!" "The DONKEY!" There he was, munching grass, not in a hurry at all.',
      am: "ከባሕር ዛፎቹ ሥር ጮክ ያለ «ሂሃ!» ተሰማ። «The DONKEY!» (አህያው!) እዚያው ሣር እየበላ ነበር፤ ምንም አልቸኮለም።",
    },
    {
      en: '"Come on, Donkey!" Hawi pulled, and Anbessa pushed. In he went through the gate: "TEN!" Bang went the gate, just as the big rain came. Splash!',
      am: "«ና እንጂ፣ አህያ!» ሀዊ ጎተተች፤ አንበሳ ገፋ። በበሩ ገባ፦ «TEN!» (አሥር!) በሩ ተዘጋ፤ ልክ በዚያን ጊዜ ትልቁ ዝናብ መጣ። ሽው!",
    },
    {
      en: 'Grandpa Tolosa counted them all: "One, two, three, four, five, six, seven, eight, nine, TEN! Thank you, my helpers!" Can you count to ten, {name}?',
      am: "አባ ቶሎሳ ሁሉንም ቆጠሩ፦ «One, two, three, four, five, six, seven, eight, nine, TEN! አመሰግናለሁ፣ ረዳቶቼ!» {name}፣ በእንግሊዝኛ እስከ አሥር መቁጠር ትችላላችሁ?",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "How did Anbessa find out who was missing?",
        "Which animal says moo? Neigh? Baa? Hee-haw? Can you count the animals in English?",
      ],
      am: [
        "አንበሳ የጎደለው ማን እንደሆነ እንዴት አወቀ?",
        "«Moo» የሚለው የትኛው እንስሳ ነው? «Neigh»? «Baa»? «Hee-haw»? እንስሶቹን በእንግሊዝኛ መቁጠር ትችላላችሁ?",
      ],
    },
    activity: {
      en: 'Line up ten toys or stones as the animals and walk them through a "gate" (two shoes), counting in English: one, two, three… up to ten. Hide one and count again: who is missing? Note: in English we say "one sheep, two sheep", the same word for one or many.',
      am: "አሥር አሻንጉሊቶችን ወይም ድንጋዮችን እንደ እንስሳት አሰልፉ፤ በ«በር» (በሁለት ጫማዎች መካከል) እያሳለፋችሁ በእንግሊዝኛ ቁጠሩ፦ one, two, three… እስከ ten። አንዱን ደብቁና እንደገና ቁጠሩ፦ ማን ጎደለ? ማሳሰቢያ፦ በእንግሊዝኛ «one sheep, two sheep» ይባላል፤ ለአንድም ለብዙም አንድ ቃል ነው።",
    },
  },
};

export default story;
