import type { Story } from "../../../stories";

/*
  "Tsehay's Kolo Stall" (Numbers & Counting, level 5). Money: Tsehay sells cups of kolo
  (roasted barley) at the market. Birr and santim (a hundred santim make one birr; two
  fifty-santim coins make one birr; two twenty-five-santim coins make fifty santim), paying the
  exact price by counting coins, adding prices (three cups of 2 birr is 6 birr), giving change
  by counting up from the price (2 to 10 is 8), sorting the coin box, totting up the day, and
  saving some. Ties in with "Lali's Market Money".
  The repeated line to join in on: "Count the coins, then pay!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the repeated line, «ቆሎ», «መልስ» for change, «ባለ ሃምሳ ሳንቲም», and «የቁጠባ ሳጥን».
*/
const story: Story = {
  id: "kolo-stall",
  course: "numbers-counting",
  pack: "numbers",
  title: { en: "Tsehay's Kolo Stall", am: "የፀሐይ የቆሎ መደብ" },
  category: "Maths",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#C98A0A",
  scene: "lib-kolo-stall",
  coverPage: 4,
  teaches: { numbers: [1, 2, 3, 5, 6, 8, 10, 25, 50, 100], words: ["birr", "santim", "coin", "price", "pay", "change", "save"] },
  pages: [
    {
      en: 'It was market day, and Tsehay had her very own stall: a table, a basket of crunchy kolo, and little cups to measure it. A sign said: one cup, 2 birr. "I am a shopkeeper!" she whispered.',
      am: "የገበያ ቀን ነበር፤ ፀሐይም የራሷ መደብ ነበራት፦ ጠረጴዛ፣ ቅርጭም ያለ ቆሎ የሞላበት ቅርጫትና መለኪያ ትናንሽ ኩባያዎች። ምልክቱ «አንድ ኩባያ፣ 2 ብር» ይላል። «እኔ ነጋዴ ነኝ!» አለች በሹክሹክታ።",
    },
    {
      en: 'Grandma showed her the coins. "This big one is one birr. These smaller ones are santim: fifty, twenty-five, ten and five. A hundred santim make one birr."',
      am: "አያት ሳንቲሞቹን አሳየቻት። «ይሄ ትልቁ አንድ ብር ነው። እነዚህ ትናንሾቹ ሳንቲም ናቸው፦ ሃምሳ፣ ሃያ አምስት፣ አሥርና አምስት። መቶ ሳንቲም አንድ ብር ይሆናል።»",
    },
    {
      en: 'Lali turned two fifty-santim coins over and over. "Fifty and fifty make a hundred santim… that is one birr! Half and half make one whole!" Count the coins, then pay!',
      am: "ላሊ ሁለት ባለ ሃምሳ ሳንቲሞችን እያገላበጠች ተመለከተቻቸው። «ሃምሳና ሃምሳ መቶ ሳንቲም ይሆናሉ… ያ አንድ ብር ነው! ግማሽና ግማሽ አንድ ሙሉ ይሆናሉ!» ሳንቲሞቹን ቁጠሩ፣ ከዚያ ክፈሉ!",
    },
    {
      en: "The first customer was Gugu. \"One cup, please!\" He put down one birr, and then another. \"One, two. Two birr!\" Count the coins, then pay! Tsehay filled his cup to the top.",
      am: "የመጀመሪያው ደንበኛ ጉጉ ነበር። «አንድ ኩባያ፣ እባክሽ!» አንድ ብር አስቀመጠ፣ ከዚያ ሌላ። «አንድ፣ ሁለት። ሁለት ብር!» ሳንቲሞቹን ቁጠሩ፣ ከዚያ ክፈሉ! ፀሐይ ኩባያውን እስከ አፉ ሞላችለት።",
    },
    {
      en: 'Anbessa wanted three cups, one for him, one for Grandma, and one for Lali. "Two, and two, and two… four, six. Six birr!" He counted out six coins, very carefully.',
      am: "አንበሳ ሦስት ኩባያ ፈለገ፤ አንዱ ለራሱ፣ አንዱ ለአያት፣ አንዱ ለላሊ። «ሁለት፣ እና ሁለት፣ እና ሁለት… አራት፣ ስድስት። ስድስት ብር!» ስድስት ሳንቲሞችን በጣም በጥንቃቄ ቆጠረ።",
    },
    {
      en: 'The hare bought one cup with a ten-birr note. Kolo is two birr, so Tsehay counted up from two: "three, four, five, six, seven, eight, nine, ten. Eight birr change!"',
      am: "ጥንቸሏ ባለ አሥር ብር ኖት ይዛ አንድ ኩባያ ገዛች። ቆሎ ሁለት ብር ነው፤ ፀሐይ ከሁለት ጀምራ ወደ ላይ ቆጠረች፦ «ሦስት፣ አራት፣ አምስት፣ ስድስት፣ ሰባት፣ ስምንት፣ ዘጠኝ፣ አሥር። ስምንት ብር መልስ!»",
    },
    {
      en: 'A little goat wanted just a handful, for fifty santim. She had two shiny twenty-five-santim coins. "Twenty-five and twenty-five make fifty!" Count the coins, then pay!',
      am: "አንዲት ትንሽ ፍየል በሃምሳ ሳንቲም አንድ እፍኝ ብቻ ፈለገች። ሁለት የሚያብረቀርቁ ባለ ሃያ አምስት ሳንቲሞች ነበሯት። «ሃያ አምስትና ሃያ አምስት ሃምሳ ይሆናሉ!» ሳንቲሞቹን ቁጠሩ፣ ከዚያ ክፈሉ!",
    },
    {
      en: "When it was quiet, Tsehay sorted her coin box: one-birr coins in one pile, fifty-santim coins in another, and the little ones in a third. Same with same, just like sorting teff.",
      am: "ጸጥ ሲል ፀሐይ የሳንቲም ሳጥኗን አደራጀች፦ ባለ አንድ ብሮቹን በአንድ ክምር፣ ባለ ሃምሳ ሳንቲሞቹን በሌላ፣ ትናንሾቹን በሦስተኛ። አንድ ዓይነቱን ከአንድ ዓይነቱ ጋር፣ ልክ ጤፍ እንደመለየት።",
    },
    {
      en: 'At the end of the day she counted: ten one-birr coins, that is ten birr, and four fifty-santim coins, that is two birr more. "Ten… eleven, twelve. Twelve birr!"',
      am: "በቀኑ መጨረሻ ቆጠረች፦ አሥር ባለ አንድ ብር ሳንቲሞች፣ ያ አሥር ብር ነው፤ አራት ባለ ሃምሳ ሳንቲሞች ደግሞ ሁለት ብር ተጨማሪ። «አሥር… አሥራ አንድ፣ አሥራ ሁለት። አሥራ ሁለት ብር!»",
    },
    {
      en: 'Grandma smiled. "Some is for more barley, so you can sell again next week. And some is for you." Tsehay dropped two birr into her clay saving box. Clink, clink!',
      am: "አያት ፈገግ አለች። «ከፊሉ በሚቀጥለው ሳምንት እንደገና እንድትሸጪ ለተጨማሪ ገብስ ነው። ከፊሉ ደግሞ ለአንቺ ነው።» ፀሐይ ሁለት ብር በሸክላ የቁጠባ ሳጥኗ ውስጥ ጣለች። ቅጭል፣ ቅጭል!",
    },
    {
      en: 'With three birr of her own, Tsehay bought Grandma a yellow flower. Count the coins, then pay! "One, two, three." {name}, what would you buy with three birr?',
      am: "በራሷ ሦስት ብር ፀሐይ ለአያት ቢጫ አበባ ገዛች። ሳንቲሞቹን ቁጠሩ፣ ከዚያ ክፈሉ! «አንድ፣ ሁለት፣ ሦስት።» {name}፣ በሦስት ብር ምን ብንገዛ ደስ ይለናል?",
    },
    {
      en: 'Walking home, Grandma held the flower and Tsehay held Grandma\'s hand. "You counted every coin," said Grandma. "You are a good shopkeeper." Tsehay smiled her shy little smile.',
      am: "ወደ ቤት ሲሄዱ አያት አበባውን፣ ፀሐይ ደግሞ የአያትን እጅ ይዘው ነበር። «እያንዳንዱን ሳንቲም ቆጥረሻል» አለች አያት። «ጎበዝ ነጋዴ ነሽ።» ፀሐይ በዓይናፋርነት ትንሽ ፈገግ አለች።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "The hare paid ten birr for something that cost two. How did Tsehay work out the change?",
        "How many fifty-santim coins make one birr? How many make two birr?",
      ],
      am: [
        "ጥንቸሏ ሁለት ብር ለሚያወጣ ነገር አሥር ብር ከፈለች። ፀሐይ መልሱን እንዴት አወቀች?",
        "ስንት ባለ ሃምሳ ሳንቲሞች አንድ ብር ይሆናሉ? ሁለት ብርስ?",
      ],
    },
    activity: {
      en: "Look at some real coins together and sort them by kind. Set up a little shop with price tags from 1 to 5 birr. Your child pays with coins, counting them out, and gives change by counting up from the price.",
      am: "እውነተኛ ሳንቲሞችን አብራችሁ ተመልከቱና በዓይነታቸው ለዩዋቸው። ከ1 እስከ 5 ብር የዋጋ ምልክቶች ያሉት ትንሽ ሱቅ አዘጋጁ። ልጁ ሳንቲሞቹን እየቆጠረ ይክፈል፣ ከዋጋው ጀምሮ ወደ ላይ እየቆጠረም መልስ ይስጥ።",
    },
  },
};

export default story;
