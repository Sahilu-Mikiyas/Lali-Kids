import type { Story } from "../../../stories";

/*
  "Gugu's Stepping Stones" (Numbers & Counting, level 3). A number line made of stepping
  stones across the river, 0 on this bank: a hop forward is one more, a hop back is one less;
  the number after, before and between; a missing stone (4); further along means more (7 is
  more than 3); jumping in twos (0, 2, 4 ... 10); a frog counting back from 10 to 0; and on
  the way home a second river with stones 10 to 20 (15: one more 16, one less 14).
  The repeated line to join in on: "Hop, hop! Which stone now?"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the repeated line, «መረማመጃ ድንጋይ» for a stepping stone, and «በፊት / በኋላ / መካከል».
*/
const story: Story = {
  id: "stepping-stones",
  course: "numbers-counting",
  pack: "numbers",
  title: { en: "Gugu's Stepping Stones", am: "የጉጉ መረማመጃ ድንጋዮች" },
  category: "Maths",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#1C8C8C",
  scene: "lib-stepping-stones",
  coverPage: 1,
  teaches: { numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], words: ["number line", "before", "after", "between", "one more", "one less"] },
  pages: [
    {
      en: "Grandma's friends lived across the river. So Grandma laid stepping stones across it, and on each stone she painted a number: 0 on this bank, then 1, 2, 3, all the way to 10 on the other side.",
      am: "የአያት ጓደኞች ከወንዙ ማዶ ይኖሩ ነበር። ስለዚህ አያት በወንዙ ላይ መረማመጃ ድንጋዮችን ደረደረች፤ በእያንዳንዱ ድንጋይ ላይም ቁጥር ቀባች፦ በዚህኛው ዳር 0፣ ከዚያ 1፣ 2፣ 3፣ እስከ ማዶው 10 ድረስ።",
    },
    {
      en: 'Gugu stood on 0. Hop! 1. Hop! 2. Hop! 3. "Every hop forward is one more!" Hop, hop! Which stone now? "Four!"',
      am: "ጉጉ 0 ላይ ቆመ። ዝለል! 1። ዝለል! 2። ዝለል! 3። «ወደ ፊት የምዘለው እያንዳንዱ ዝላይ አንድ ይጨምራል!» ዝለል፣ ዝለል! አሁን የትኛው ድንጋይ? «አራት!»",
    },
    {
      en: 'Splash! A fish jumped and Gugu hopped back. "Four, one less… three! Every hop back is one less." Hop, hop! Which stone now? "Three!"',
      am: "ቻፕ! አንድ ዓሣ ዘለለ፤ ጉጉም ወደ ኋላ ዘለለ። «ከአራት አንድ ሲቀነስ… ሦስት! ወደ ኋላ የምዘለው እያንዳንዱ ዝላይ አንድ ይቀንሳል።» ዝለል፣ ዝለል! አሁን የትኛው ድንጋይ? «ሦስት!»",
    },
    {
      en: 'Lali made it a game. "Which stone comes after 5?" "6!" "Which comes before 5?" "4!" "And which is between 7 and 9?" Gugu thought. "8!"',
      am: "ላሊ ጨዋታ አደረገችው። «ከ5 በኋላ የሚመጣው የትኛው ድንጋይ ነው?» «6!» «ከ5 በፊትስ?» «4!» «በ7 እና በ9 መካከል ያለውስ?» ጉጉ አሰበ። «8!»",
    },
    {
      en: 'Oh! One stone had washed away. 1, 2, 3, then a gap, then 5. "Which number is missing?" Tsehay carried a new stone and painted it: 4. Now the path was whole again.',
      am: "ውይ! አንዱን ድንጋይ ውኃው ወስዶት ነበር። 1፣ 2፣ 3፣ ከዚያ ክፍተት፣ ከዚያ 5። «የጎደለው ቁጥር የትኛው ነው?» ፀሐይ አዲስ ድንጋይ ተሸክማ መጣችና ቀባችው፦ 4። አሁን መንገዱ እንደገና ሙሉ ሆነ።",
    },
    {
      en: 'Anbessa stood on 3. Gugu stood on 7. "Who is further along?" Gugu was! "The further you go, the bigger the number. Seven is more than three."',
      am: "አንበሳ 3 ላይ ቆመ። ጉጉ 7 ላይ ቆመ። «ማን ርቆ ሄዷል?» ጉጉ ነበር! «በሄድክ ቁጥር ቁጥሩ ይበልጣል። ሰባት ከሦስት ይበልጣል።»",
    },
    {
      en: "A long-legged frog jumped two stones at a time. Boing! 0, 2, 4, 6, 8, 10! \"I skip every other one!\" Hop, hop! Which stone now? \"Ten!\"",
      am: "ረጃጅም እግር ያለው እንቁራሪት ሁለት ሁለት ድንጋይ ዘለለ። ቦይንግ! 0፣ 2፣ 4፣ 6፣ 8፣ 10! «አንዱን እየዘለልኩ ነው የምሄደው!» ዝለል፣ ዝለል! አሁን የትኛው ድንጋይ? «አሥር!»",
    },
    {
      en: 'Then the frog hopped all the way back, one stone at a time, croaking the numbers: "Ten, nine, eight, seven, six, five, four, three, two, one, ZERO!" Plop, into the water.',
      am: "ከዚያ እንቁራሪቱ አንድ በአንድ ድንጋይ እየዘለለ ቁጥሮቹን እያለ እስከ መጀመሪያው ተመለሰ፦ «አሥር፣ ዘጠኝ፣ ስምንት፣ ሰባት፣ ስድስት፣ አምስት፣ አራት፣ ሦስት፣ ሁለት፣ አንድ፣ ዜሮ!» ጥልቅ፣ ውኃው ውስጥ።",
    },
    {
      en: "On the way home there was a wider river, with more stones: 10, 11, 12, all the way to 20. \"It's the same as before,\" said Gugu, \"but with ten in front!\"",
      am: "ወደ ቤት ሲመለሱ ሰፋ ያለ ወንዝ ነበር፤ ብዙ ድንጋዮችም ነበሩት፦ 10፣ 11፣ 12፣ እስከ 20 ድረስ። «ልክ እንደበፊቱ ነው» አለ ጉጉ፣ «ግን ፊቱ ላይ አሥር አለ!»",
    },
    {
      en: 'Gugu stopped on 15. "One more?" Hop: 16. "One less?" Hop back, and back again: 14. Hop, hop! Which stone now? {name}, let\'s find fourteen together!',
      am: "ጉጉ 15 ላይ ቆመ። «አንድ ሲጨመር?» ዝለል፦ 16። «አንድ ሲቀነስ?» ወደ ኋላ ዝለል፣ እንደገናም ወደ ኋላ፦ 14። ዝለል፣ ዝለል! አሁን የትኛው ድንጋይ? {name}፣ አሥራ አራትን አብረን እንፈልግ!",
    },
    {
      en: '"Seventeen, eighteen, nineteen, TWENTY!" Gugu jumped onto the far bank. "I crossed twenty stones!" Grandma was waiting with a warm blanket and a hug.',
      am: "«አሥራ ሰባት፣ አሥራ ስምንት፣ አሥራ ዘጠኝ፣ ሃያ!» ጉጉ ወደ ማዶው ዳር ዘለለ። «ሃያ ድንጋዮችን ተሻገርኩ!» አያት ሞቃት ብርድ ልብስና እቅፍ ይዛ እየጠበቀችው ነበር።",
    },
    {
      en: "That night, Gugu drew a line of stones in the sand, from 0 to 20. He walked his fingers along it: hop, hop, hop. Hop, hop! Which stone now? \"Bed!\" said Grandma.",
      am: "በዚያች ሌሊት ጉጉ ከ0 እስከ 20 የድንጋዮችን መስመር አሸዋ ላይ ሣለ። ጣቶቹን በላዩ ላይ አራመዳቸው፦ ዝለል፣ ዝለል፣ ዝለል። ዝለል፣ ዝለል! አሁን የትኛው ድንጋይ? «አልጋ!» አለች አያት።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "If Gugu is on stone 6 and hops forward once, where is he? If he hops back once from 6?",
        "Anbessa was on 3 and Gugu on 7. How did they know which number was bigger?",
      ],
      am: [
        "ጉጉ 6 ቁጥር ድንጋይ ላይ ሆኖ አንድ ጊዜ ወደ ፊት ቢዘል የት ይደርሳል? ከ6 አንድ ጊዜ ወደ ኋላ ቢዘልስ?",
        "አንበሳ 3 ላይ፣ ጉጉ 7 ላይ ነበሩ። የትኛው ቁጥር እንደሚበልጥ እንዴት አወቁ?",
      ],
    },
    activity: {
      en: "Write 0 to 10 on pieces of paper and lay them in a line on the floor as stepping stones. Call out \"one more\", \"one less\", \"the number after 6\" or \"between 2 and 4\" and let your child hop to the right stone. Later, add stones 11 to 20.",
      am: "ከ0 እስከ 10 በወረቀቶች ላይ ጽፋችሁ እንደ መረማመጃ ድንጋይ መሬት ላይ በመስመር አስቀምጡ። «አንድ ጨምር»፣ «አንድ ቀንስ»፣ «ከ6 በኋላ ያለው» ወይም «በ2 እና በ4 መካከል» እያላችሁ ልጁ ወደ ትክክለኛው ድንጋይ እንዲዘል አድርጉ። ቆይታችሁ ከ11 እስከ 20 ያሉ ድንጋዮችን ጨምሩ።",
    },
  },
};

export default story;
