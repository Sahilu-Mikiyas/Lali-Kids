import type { Story } from "../../../stories";

/*
  "Double and Half" (Numbers & Counting, level 6). Doubling and halving: Grandma's goat has
  twins; a puddle mirror doubles Anbessa's paws (2 and 2 is 4); doubles up to ten and ten
  (double 3 is 6, double 5 is 10, double 10 is 20); a half is one of two EQUAL parts (a fair
  and an unfair half of an injera); half of 10 mangoes is 5 each, half of 6 is 3; seven
  cannot be shared into two equal halves (odd), so the one left over goes to Grandma; doubling
  a dabo recipe; half of 20 is 10.
  The repeated line to join in on: "Double it! Now half it!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the repeated line, «እጥፍ» for double, «ግማሽ» for half, and «መንታ» for twins.
*/
const story: Story = {
  id: "double-half",
  course: "numbers-counting",
  pack: "numbers",
  title: { en: "Double and Half", am: "እጥፍና ግማሽ" },
  category: "Maths",
  ageBands: ["6-7"],
  isFree: false,
  color: "#9C4FB0",
  scene: "lib-double-half",
  coverPage: 1,
  teaches: { numbers: [1, 2, 3, 4, 5, 6, 7, 10, 20], words: ["double", "half", "equal", "share", "twins", "odd", "even"] },
  pages: [
    {
      en: 'Grandma\'s goat had twins! Two little kids, the same size, the same brown, the same wobbly legs. "One kid, and one just the same," said Tsehay. "That is double!"',
      am: "የአያት ፍየል መንታ ወለደች! ሁለት ትናንሽ ግልገሎች፤ መጠናቸው አንድ፣ ቡኒነታቸው አንድ፣ የሚንቀጠቀጡ እግሮቻቸውም አንድ። «አንድ ግልገል፣ ልክ እንደ እሱ ደግሞ አንድ» አለች ፀሐይ። «ያ እጥፍ ነው!»",
    },
    {
      en: 'Anbessa looked into a puddle. Two paws, and two more paws in the water! "Double two is four!" He waved. The puddle waved back. Double it! Now half it!',
      am: "አንበሳ ኩሬ ውስጥ ተመለከተ። ሁለት መዳፎች፣ በውኃው ውስጥ ደግሞ ሌሎች ሁለት መዳፎች! «የሁለት እጥፍ አራት ነው!» አውለበለበ። ኩሬውም መልሶ አውለበለበ። እጥፍ አድርጉት! አሁን ግማሹን!",
    },
    {
      en: 'Gugu put eggs into the egg box, the same in each row. "Three and three: double three is six. Five and five: double five is ten!" The egg box was full.',
      am: "ጉጉ በእንቁላል ሳጥኑ ውስጥ በእያንዳንዱ ረድፍ እኩል እንቁላል አስቀመጠ። «ሦስትና ሦስት፦ የሦስት እጥፍ ስድስት ነው። አምስትና አምስት፦ የአምስት እጥፍ አሥር ነው!» የእንቁላል ሳጥኑ ሞላ።",
    },
    {
      en: 'Then it was time to share an injera. Anbessa tore it into a big piece and a tiny piece. "Here is your half!" Tsehay frowned. "That\'s not a half. Halves must be the same size."',
      am: "ከዚያ እንጀራ የመካፈል ሰዓት ደረሰ። አንበሳ ቀድዶ አንድ ትልቅ ቁራጭና አንድ ትንሽዬ ቁራጭ አደረገው። «ይኸው ግማሽሽ!» ፀሐይ ፊቷን አጨፈገገች። «ያ ግማሽ አይደለም። ግማሾች እኩል መሆን አለባቸው።»",
    },
    {
      en: "Grandma folded the injera exactly down the middle and tore it along the fold. Two parts, exactly the same. \"Now each of you has one half. Two halves make one whole.\" Double it! Now half it!",
      am: "አያት እንጀራውን ልክ መሐሉ ላይ አጥፋ በእጥፉ ቀደደችው። ሁለት ክፍሎች፣ ልክ አንድ ዓይነት። «አሁን እያንዳንዳችሁ አንድ ግማሽ አላችሁ። ሁለት ግማሾች አንድ ሙሉ ይሆናሉ።» እጥፍ አድርጉት! አሁን ግማሹን!",
    },
    {
      en: 'There were ten mangoes. "Half for Anbessa, half for Tsehay." One for you, one for me… "Five each! Half of ten is five." And half of six bananas? "Three each!"',
      am: "አሥር ማንጎዎች ነበሩ። «ግማሹ ለአንበሳ፣ ግማሹ ለፀሐይ።» አንድ ለአንተ፣ አንድ ለእኔ… «አምስት አምስት! የአሥር ግማሽ አምስት ነው።» የስድስት ሙዞች ግማሽስ? «ሦስት ሦስት!»",
    },
    {
      en: 'Then there were seven oranges. One for you, one for me… three each, and one left over! "Seven won\'t split into two equal halves," said Gugu. "Seven is odd." They gave the extra one to Grandma.',
      am: "ከዚያ ሰባት ብርቱካኖች ነበሩ። አንድ ለአንተ፣ አንድ ለእኔ… ሦስት ሦስት፣ አንድ ደግሞ ተረፈ! «ሰባት ለሁለት እኩል ግማሾች አይከፈልም» አለ ጉጉ። «ሰባት ጎዶሎ ቁጥር ነው።» የተረፈውን ለአያት ሰጡ።",
    },
    {
      en: '"Six is even," said Tsehay. "It shares fairly: three and three. Eight is even too: four and four." Double it! Now half it!',
      am: "«ስድስት ጥንድ ቁጥር ነው» አለች ፀሐይ። «በእኩል ይካፈላል፦ ሦስትና ሦስት። ስምንትም ጥንድ ቁጥር ነው፦ አራትና አራት።» እጥፍ አድርጉት! አሁን ግማሹን!",
    },
    {
      en: 'For the feast, Grandma wanted to bake double the dabo. "The recipe says two cups of flour. Double two is four!" Lali counted the cups as they went in: one, two, three, four.',
      am: "ለግብዣው አያት እጥፍ ዳቦ መጋገር ፈለገች። «አዘገጃጀቱ ሁለት ኩባያ ዱቄት ይላል። የሁለት እጥፍ አራት ነው!» ላሊ ኩባያዎቹ ሲገቡ ቆጠረች፦ አንድ፣ ሁለት፣ ሦስት፣ አራት።",
    },
    {
      en: 'Lali looked at her wings: one, two on this side, and the same on the other. "My wings are doubles too!" And the ladybird on the leaf had three spots on each side: double three, six!',
      am: "ላሊ ክንፎቿን ተመለከተች፦ በዚህ በኩል አንድ፣ ሁለት፤ በሌላው በኩልም እንደዚሁ። «ክንፎቼም እጥፍ ናቸው!» በቅጠሉ ላይ ያለችው ጥንዚዛ ደግሞ በእያንዳንዱ ጎን ሦስት ነጠብጣቦች ነበሯት፦ የሦስት እጥፍ፣ ስድስት!",
    },
    {
      en: 'Anbessa held up ten fingers, and Gugu held up ten more. "Double ten is twenty!" Then twenty friends came to the feast. "Half sit here, half sit there: ten and ten."',
      am: "አንበሳ አሥር ጣቶቹን ከፍ አደረገ፤ ጉጉም ሌላ አሥር ከፍ አደረገ። «የአሥር እጥፍ ሃያ ነው!» ከዚያ ሃያ ጓደኞች ለግብዣው መጡ። «ግማሾቹ እዚህ፣ ግማሾቹ እዚያ ተቀመጡ፦ አሥርና አሥር።»",
    },
    {
      en: "At bedtime the twin goats curled up together, two little heads and eight little legs. Double it! Now half it! Goodnight, twins. Goodnight, {name}.",
      am: "በመኝታ ሰዓት መንታዎቹ ግልገሎች ተጠቅልለው አብረው ተኙ፤ ሁለት ትናንሽ ራሶችና ስምንት ትናንሽ እግሮች። እጥፍ አድርጉት! አሁን ግማሹን! ደህና እደሩ መንታዎች። ደህና እደሩ፣ {name}።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why wasn't Anbessa's first piece of injera a real half?", "Seven oranges couldn't be shared into two equal halves. Which numbers can be shared fairly between two?"],
      am: ["የአንበሳ የመጀመሪያው የእንጀራ ቁራጭ ለምን እውነተኛ ግማሽ አልሆነም?", "ሰባት ብርቱካኖች ለሁለት እኩል መካፈል አልቻሉም። ለሁለት በእኩል መካፈል የሚችሉት የትኞቹ ቁጥሮች ናቸው?"],
    },
    activity: {
      en: "Put a mirror (or water in a tray) next to some beans and count the double. Fold a piece of paper or bread into two equal halves. Share a handful of beans between two plates, one for you and one for me, and see if any are left over.",
      am: "ከጥቂት ፍሬዎች አጠገብ መስታወት (ወይም ትሪ ውስጥ ውኃ) አስቀምጣችሁ እጥፉን ቁጠሩ። ወረቀት ወይም ዳቦ ለሁለት እኩል ግማሾች አጥፉ። እፍኝ ፍሬዎችን አንድ ለአንተ አንድ ለእኔ እያላችሁ በሁለት ሳህኖች ተካፈሉ፤ የሚተርፍ ካለ እዩ።",
    },
  },
};

export default story;
