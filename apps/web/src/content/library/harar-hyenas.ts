import type { Story } from "../stories";

/*
  "The Night Visitors of Harar": Anbessa and Grandma visit Grandma's old friend Abba Yusuf in
  Harar, the old city inside the Jugol wall, with its bright gates, twisting lanes, painted
  houses and walls of woven baskets. At dusk Abba Yusuf takes them out through the gate to
  meet his "night visitors": the hyenas he has fed for years, which he calls by name.
  Anbessa is frightened by the whoops and the shining eyes, but with Abba Yusuf's paw on the
  stick beside his, he feeds the shyest little hyena, and learns how the city and the
  hyenas look after each other. Brave, curious and gentle, never scary: the hyenas are shy
  too, and nobody feeds them alone (the grown-ups card says so).
  The join-in line is "Gently, gently, brave and still."

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line (ቀስ ብሎ፣ ቀስ ብሎ፣ ደፋርና ጸጥ), the hyena call «ዉ-ዉፕ», the munching and
  snapping sounds on page 8 (ቋ! ቁርጥ፣ ቁርጥ), «ሰፌዶች» for the woven wall baskets and
  «የሌሊት እንግዶች» for night visitors.
*/
const story: Story = {
  id: "harar-hyenas",
  pack: "story",
  title: { en: "The Night Visitors of Harar", am: "የሐረር የሌሊት እንግዶች" },
  category: "Values",
  ageBands: ["6-7"],
  isFree: false,
  color: "#1F7A8C",
  scene: "lib-harar-hyenas",
  coverPage: 9,
  teaches: { words: ["Harar", "wall", "gate", "hyena", "brave", "gentle"] },
  pages: [
    {
      en: 'Anbessa and Grandma came to Harar, an old city with a wall all around it. "Which gate shall we use?" asked Anbessa. Every gate was a different bright colour.',
      am: "አንበሳና አያቱ ዙሪያዋን በግንብ ወደታጠረችው ጥንታዊቷ ከተማ ሐረር መጡ። አንበሳ «በየትኛው በር እንግባ?» ብሎ ጠየቀ። እያንዳንዱ በር የተለያየ ደማቅ ቀለም ነበረው።",
    },
    {
      en: 'Inside, the lanes twisted and turned like a puzzle. The houses were blue, green and pink, and Lali zipped round every corner. "Wait for me!" called Anbessa.',
      am: "ውስጥ ደግሞ መንገዶቹ እንደ እንቆቅልሽ ይጠመዘዙ ነበር። ቤቶቹ ሰማያዊ፣ አረንጓዴና ሮዝ ነበሩ፤ ላሊ በየማዕዘኑ እየበረረች ዞረች። አንበሳ «ጠብቂኝ!» ብሎ ጠራ።",
    },
    {
      en: 'At a green door lived Grandma\'s old friend, Abba Yusuf. His walls were covered in bright baskets. "Tonight," he winked, "you will meet my night visitors."',
      am: "አረንጓዴ በር ባለው ቤት የአያቴ የድሮ ወዳጅ አባ ዩሱፍ ይኖራል። ግድግዳዎቹ በደማቅ ሰፌዶች ተሸፍነዋል። ዓይኑን እያጣቀሰ «ዛሬ ማታ የሌሊት እንግዶቼን ታገኛላችሁ» አለ።",
    },
    {
      en: "When the sun sank orange behind the wall, Abba Yusuf picked up a basket and a long, thin stick. Together they walked out through the gate, into the blue evening.",
      am: "ፀሐይ ከግንቡ ጀርባ ብርቱካናማ ሆና ስትጠልቅ አባ ዩሱፍ ቅርጫትና ረጅም ቀጭን በትር አነሳ። አብረውም በበሩ ወጥተው ወደ ሰማያዊው ምሽት ሄዱ።",
    },
    {
      en: 'From the dark came a sound: "Whoo-oop!" Two shining eyes, then four, then six. Anbessa hid under Grandma\'s netela. "Gently, gently, brave and still."',
      am: "ከጨለማው አንድ ድምፅ መጣ፦ «ዉ-ዉፕ!» ሁለት የሚያበሩ ዓይኖች፣ ከዚያ አራት፣ ከዚያ ስድስት። አንበሳ በአያቱ ነጠላ ሥር ተደበቀ። «ቀስ ብሎ፣ ቀስ ብሎ፣ ደፋርና ጸጥ።»",
    },
    {
      en: 'Abba Yusuf called into the night, soft and low. "Jamila… Bashir… come and eat." Out of the shadows padded the hyenas: spotty coats, round ears and big, careful paws.',
      am: "አባ ዩሱፍ በለስላሳና ዝቅ ባለ ድምፅ ወደ ሌሊቱ ጠራ። «ጀሚላ… በሽር… ኑ ብሉ።» ከጥላው ውስጥ ጅቦቹ ቀስ ብለው ወጡ፦ ዥንጉርጉር ፀጉር፣ ክብ ጆሮዎችና ትልልቅ ጥንቁቅ እግሮች።",
    },
    {
      en: 'The hyenas stepped close, then back, then close again. "They are a little bit shy," said Abba Yusuf, "just like you." Behind the big ones, a tiny hyena peeked out.',
      am: "ጅቦቹ ቀረቡ፣ ከዚያ ወደ ኋላ ሄዱ፣ ከዚያ እንደገና ቀረቡ። አባ ዩሱፍ «ትንሽ ዓይን አፋር ናቸው፤ ልክ እንዳንተ» አለ። ከትልልቆቹ ጀርባ አንዲት ትንሽ ጅብ ብቅ አለች።",
    },
    {
      en: "Abba Yusuf put a piece of meat on the end of his stick and held it out, very still. Jamila stretched out her neck… and took it, gently. Snap! Munch, munch.",
      am: "አባ ዩሱፍ በበትሩ ጫፍ ላይ ቁራጭ ሥጋ አድርጎ ፍጹም ጸጥ ብሎ ዘረጋው። ጀሚላ አንገቷን ዘረጋች… በእርጋታም ወሰደችው። ቋ! ቁርጥ፣ ቁርጥ።",
    },
    {
      en: '"Shall we try together?" Anbessa\'s knees went wibble-wobble. Abba Yusuf\'s big paw held the stick right next to his little one. Gently, gently, brave and still.',
      am: "«አብረን እንሞክር?» የአንበሳ ጉልበቶች ተንቀጠቀጡ። የአባ ዩሱፍ ትልቅ እጅ ከአንበሳ ትንሽ እጅ አጠገብ በትሩን ያዘ። ቀስ ብሎ፣ ቀስ ብሎ፣ ደፋርና ጸጥ።",
    },
    {
      en: 'Out crept the tiny hyena. Sniff, sniff. Closer, closer… and she took the meat as softly as a kiss. "She did it!" whispered Anbessa. "And so did I!"',
      am: "ትንሿ ጅብ ቀስ ብላ ወጣች። ሽት፣ ሽት። ቀረበች፣ ቀረበች… እንደ መሳም በለስላሳ ሥጋውን ወሰደች። አንበሳ «ቻለች!» ብሎ አንሾካሾከ። «እኔም ቻልኩ!»",
    },
    {
      en: '"Long ago, Harar made little doors in the wall," said Abba Yusuf, "so hyenas could come in at night and tidy up. We look after them, and they look after us."',
      am: "አባ ዩሱፍ እንዲህ አለ፦ «ድሮ ሐረር ጅቦች ማታ ገብተው እንዲያጸዱ በግንቡ ላይ ትናንሽ በሮች ሠራች። እኛ እንንከባከባቸዋለን፤ እነሱም ይንከባከቡናል።»",
    },
    {
      en: '"Whoo-oop!" called the hyenas, trotting off to the hills. The tiny one stopped and looked back. Anbessa waved. "Goodnight, little night visitor!"',
      am: "ጅቦቹ «ዉ-ዉፕ!» ብለው ወደ ኮረብቶቹ ሮጡ። ትንሿ ጅብ ቆም ብላ ወደ ኋላ አየች። አንበሳ እጁን አውለበለበ። «ደህና እደሪ፣ ትንሿ የሌሊት እንግዳ!»",
    },
    {
      en: 'Back inside the wall, Anbessa snuggled into bed. Far away, he heard "Whoo-oop!" This time he smiled. Gently, gently, brave and still.',
      am: "ወደ ግንቡ ውስጥ ተመልሰው አንበሳ አልጋው ውስጥ ተጠቀለለ። ሩቅ ሆኖ «ዉ-ዉፕ!» የሚል ሰማ። በዚህ ጊዜ ፈገግ አለ። ቀስ ብሎ፣ ቀስ ብሎ፣ ደፋርና ጸጥ።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Anbessa was scared at first, but he was gently brave. When have you felt a little bit scared and been brave anyway? Who helped you?",
        "The hyenas were shy too. Why do you think it helps to be slow and quiet around animals?",
      ],
      am: [
        "አንበሳ መጀመሪያ ፈርቶ ነበር፤ ግን በእርጋታ ደፋር ሆነ። እናንተ ትንሽ ፈርታችሁ ሳለ ደፋር የሆናችሁት መቼ ነው? ማን ረዳችሁ?",
        "ጅቦቹም ዓይን አፋር ነበሩ። በእንስሳት አጠገብ ቀስ ብሎና ጸጥ ብሎ መሆን ለምን የሚጠቅም ይመስላችኋል?",
      ],
    },
    activity: {
      en: 'Draw your own Harar gate in bright colours, with painted houses behind it. Then play "gently, brave and still": creep like a shy hyena and freeze when someone says "still!" Remember: only the hyena men feed the hyenas; we watch wild animals from a safe distance.',
      am: "የራሳችሁን የሐረር በር በደማቅ ቀለም፣ ከጀርባው ካሉ ያሸበረቁ ቤቶች ጋር ሳሉ። ከዚያ «ቀስ ብሎ፣ ደፋርና ጸጥ» የሚለውን ጨዋታ ተጫወቱ፦ እንደ ዓይን አፋር ጅብ ቀስ ብላችሁ ሂዱ፤ አንድ ሰው «ጸጥ!» ሲል ቁሙ። አስታውሱ፦ ጅቦቹን የሚመግቡት የጅብ ሰዎቹ ብቻ ናቸው፤ እኛ የዱር እንስሳትን ከሩቅ ሆነን እናያቸዋለን።",
    },
  },
};

export default story;
