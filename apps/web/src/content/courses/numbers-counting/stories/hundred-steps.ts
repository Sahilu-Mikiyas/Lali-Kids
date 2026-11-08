import type { Story } from "../../../stories";

/*
  "One Hundred Steps" (Numbers & Counting, level 6). Counting to 100 and counting in tens:
  Grandma and the friends climb the hundred stone steps to the little church on the hill; every
  tenth step has its number painted on it in Ge'ez (፲, ፳, ፴ … ፻). Counting one by one, then
  in tens (faster), the tricky crossings (59 then 60, 99 then 100), halfway is fifty, and
  counting back down in tens.
  The repeated line to join in on: "Ten, twenty, thirty… keep on climbing!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the repeated line, and the tens words ሠላሳ, አርባ, ሃምሳ, ስልሳ, ሰባ, ሰማንያ, ዘጠና.
*/
const story: Story = {
  id: "hundred-steps",
  course: "numbers-counting",
  pack: "numbers",
  title: { en: "One Hundred Steps", am: "መቶ ደረጃዎች" },
  category: "Maths",
  ageBands: ["6-7"],
  isFree: false,
  color: "#2F5BD3",
  scene: "lib-hundred-steps",
  coverPage: 8,
  teaches: { numbers: [10, 20, 30, 40, 50, 59, 60, 70, 80, 90, 99, 100], words: ["hundred", "count in tens", "halfway"] },
  pages: [
    {
      en: 'High on the hill stood a little round church, and up to it climbed a long stone staircase. "How many steps?" asked Gugu. "One hundred," said Grandma. "Shall we count them?"',
      am: "ከኮረብታው ጫፍ ላይ አንዲት ትንሽ ክብ ቤተ ክርስቲያን ቆማ ነበር፤ ወደ እሷም ረጅም የድንጋይ ደረጃ ይወጣ ነበር። «ስንት ደረጃዎች ናቸው?» ብሎ ጠየቀ ጉጉ። «መቶ» አለች አያት። «እንቁጠራቸው?»",
    },
    {
      en: "They started at the bottom. One, two, three, four, five, six, seven, eight, nine… TEN! On the tenth step was a painted sign: ፲. \"Ten steps!\"",
      am: "ከታች ጀመሩ። አንድ፣ ሁለት፣ ሦስት፣ አራት፣ አምስት፣ ስድስት፣ ሰባት፣ ስምንት፣ ዘጠኝ… አሥር! በአሥረኛው ደረጃ ላይ የተቀባ ምልክት ነበር፦ ፲። «አሥር ደረጃዎች!»",
    },
    {
      en: 'Eleven, twelve, thirteen… nineteen, TWENTY! Another sign: ፳. "Every ten steps there\'s a sign," said Tsehay. Ten, twenty, thirty… keep on climbing!',
      am: "አሥራ አንድ፣ አሥራ ሁለት፣ አሥራ ሦስት… አሥራ ዘጠኝ፣ ሃያ! ሌላ ምልክት፦ ፳። «በየአሥር ደረጃው ምልክት አለ» አለች ፀሐይ። አሥር፣ ሃያ፣ ሠላሳ… መውጣታችንን እንቀጥል!",
    },
    {
      en: 'Gugu was in a hurry. "Let\'s just count the signs! Thirty, ፴. Forty, ፵." "Counting in tens is quick," said Grandma, "and every sign is ten more steps."',
      am: "ጉጉ ቸኩሎ ነበር። «ምልክቶቹን ብቻ እንቁጠር! ሠላሳ፣ ፴። አርባ፣ ፵።» «በአሥር በአሥር መቁጠር ፈጣን ነው» አለች አያት፣ «እያንዳንዱ ምልክት አሥር ተጨማሪ ደረጃዎች ነው።»",
    },
    {
      en: 'At the fiftieth step they sat down for a rest. ፶. "Fifty is halfway to a hundred," said Grandma. Fifty steps behind them, fifty steps still to go.',
      am: "በሃምሳኛው ደረጃ ላይ ለዕረፍት ተቀመጡ። ፶። «ሃምሳ የመቶ ግማሽ ነው» አለች አያት። ከኋላቸው ሃምሳ ደረጃዎች፣ ከፊታቸው ደግሞ ሃምሳ ደረጃዎች ቀርተዋል።",
    },
    {
      en: 'Anbessa counted the next ones slowly. "…fifty-seven, fifty-eight, fifty-nine… fifty-ten?" "Sixty!" laughed Lali. After fifty-nine comes sixty: ፷. Ten, twenty, thirty… keep on climbing!',
      am: "አንበሳ ቀጣዮቹን በዝግታ ቆጠረ። «…ሃምሳ ሰባት፣ ሃምሳ ስምንት፣ ሃምሳ ዘጠኝ… ሃምሳ አሥር?» «ስልሳ!» ብላ ሳቀች ላሊ። ከሃምሳ ዘጠኝ በኋላ ስልሳ ይመጣል፦ ፷። አሥር፣ ሃያ፣ ሠላሳ… መውጣታችንን እንቀጥል!",
    },
    {
      en: "Seventy, ፸. Eighty, ፹. Anbessa's legs were tired, so Gugu held his paw. Together they counted the signs: seventy, eighty… keep on climbing!",
      am: "ሰባ፣ ፸። ሰማንያ፣ ፹። የአንበሳ እግሮች ደከሙ፤ ስለዚህ ጉጉ መዳፉን ያዘው። አብረው ምልክቶቹን ቆጠሩ፦ ሰባ፣ ሰማንያ… መውጣታችንን እንቀጥል!",
    },
    {
      en: "Ninety, ፺! Only ten more. Everyone counted together, one step at a time: ninety-one, ninety-two, ninety-three, ninety-four, ninety-five, ninety-six, ninety-seven, ninety-eight, ninety-nine…",
      am: "ዘጠና፣ ፺! አሥር ብቻ ቀሩ። ሁሉም አንድ በአንድ አብረው ቆጠሩ፦ ዘጠና አንድ፣ ዘጠና ሁለት፣ ዘጠና ሦስት፣ ዘጠና አራት፣ ዘጠና አምስት፣ ዘጠና ስድስት፣ ዘጠና ሰባት፣ ዘጠና ስምንት፣ ዘጠና ዘጠኝ…",
    },
    {
      en: '"ONE HUNDRED!" On the top step was the biggest sign of all: ፻. "Ten tens make a hundred," said Grandma, out of breath and smiling. "We did it!"',
      am: "«መቶ!» በላይኛው ደረጃ ላይ ከሁሉም ትልቁ ምልክት ነበር፦ ፻። «አሥር አሥሮች መቶ ይሆናሉ» አለች አያት፣ ትንፋሽ አጥሯት ፈገግ እያለች። «ቻልነው!»",
    },
    {
      en: "From the top they could see the whole valley: the river, the tukuls, the green fields, and the tiny dots of sheep. Lali tried to count the sheep. \"Too many! More than a hundred!\"",
      am: "ከላይ ሆነው ሸለቆውን በሙሉ ማየት ይችሉ ነበር፦ ወንዙን፣ ጎጆዎቹን፣ አረንጓዴ ማሳዎቹንና የበጎቹን ጥቃቅን ነጠብጣቦች። ላሊ በጎቹን ለመቁጠር ሞከረች። «በጣም ብዙ! ከመቶ ይበልጣሉ!»",
    },
    {
      en: "Going down was quicker. They counted back in tens, one sign at a time: ninety, eighty, seventy, sixty, fifty, forty, thirty, twenty, ten… and off the last step!",
      am: "መውረድ ፈጣን ነበር። በአሥር በአሥር ወደ ኋላ ቆጠሩ፣ አንድ ምልክት በአንድ ጊዜ፦ ዘጠና፣ ሰማንያ፣ ሰባ፣ ስልሳ፣ ሃምሳ፣ አርባ፣ ሠላሳ፣ ሃያ፣ አሥር… ከመጨረሻው ደረጃ ወረዱ!",
    },
    {
      en: 'At home, Gugu yawned. "Grandma, my legs climbed a hundred steps." "And your head counted all of them," she said. Ten, twenty, thirty… keep on climbing, {name}!',
      am: "ቤት ሲደርሱ ጉጉ አዛጋ። «አያቴ፣ እግሮቼ መቶ ደረጃዎችን ወጡ።» «ጭንቅላትህ ደግሞ ሁሉንም ቆጠረ» አለች። አሥር፣ ሃያ፣ ሠላሳ… መውጣታችንን እንቀጥል፣ {name}!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why was counting the signs quicker than counting every step?", "What number comes after fifty-nine? After ninety-nine?"],
      am: ["ምልክቶቹን መቁጠር እያንዳንዱን ደረጃ ከመቁጠር ለምን ፈጠነ?", "ከሃምሳ ዘጠኝ በኋላ የሚመጣው ቁጥር ምንድን ነው? ከዘጠና ዘጠኝ በኋላስ?"],
    },
    activity: {
      en: "Count real steps, or count jumps or claps up to a hundred, saying every tenth number loudly. Then count to a hundred in tens on your fingers: one finger for each ten. Practise the tricky ones: 39 then 40, 59 then 60, 99 then 100.",
      am: "እውነተኛ ደረጃዎችን ቁጠሩ፣ ወይም ዝላዮችን ወይም ጭብጨባዎችን እስከ መቶ ቁጠሩ፤ እያንዳንዱን አሥረኛ ቁጥር ጮክ ብላችሁ በሉ። ከዚያ በጣቶቻችሁ በአሥር በአሥር እስከ መቶ ቁጠሩ፦ ለእያንዳንዱ አሥር አንድ ጣት። አስቸጋሪዎቹን ተለማመዱ፦ 39 ከዚያ 40፣ 59 ከዚያ 60፣ 99 ከዚያ 100።",
    },
  },
};

export default story;
