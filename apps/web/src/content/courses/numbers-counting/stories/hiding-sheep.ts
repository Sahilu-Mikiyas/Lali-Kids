import type { Story } from "../../../stories";

/*
  "How Many Are Hiding?" (Numbers & Counting, level 4). Number bonds of ten: Gugu's ten sheep
  play hide-and-seek behind the big rock; he counts the ones he can see and works out how many
  are hiding. He uses ten stones in two rows of five (a ten-frame): a pebble for each sheep he
  sees, the empty places are the hiding ones. All the pairs (1 and 9 … 5 and 5, and 10 and 0),
  a joke when Lali hides too, fingers as the frame, and counting them into the pen.
  The repeated line to join in on: "Ten in all. How many hiding?"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the repeated line, «ድብብቆሽ» for hide-and-seek, and the pairs song on page 8.
*/
const story: Story = {
  id: "hiding-sheep",
  course: "numbers-counting",
  pack: "numbers",
  title: { en: "How Many Are Hiding?", am: "ስንቶቹ ተደበቁ?" },
  category: "Maths",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#0E7F74",
  scene: "lib-hiding-sheep",
  coverPage: 1,
  teaches: { numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], words: ["hiding", "in all", "pair", "make ten"] },
  pages: [
    {
      en: 'Gugu took his ten sheep up to the hill with the big rock. The sheep loved one game best of all: hide-and-seek! "Ready or not, here I come!"',
      am: "ጉጉ አሥሩን በጎቹን ትልቁ ድንጋይ ወዳለበት ኮረብታ ወሰዳቸው። በጎቹ ከሁሉም አብልጠው አንድ ጨዋታ ይወዱ ነበር፦ ድብብቆሽ! «ተዘጋጃችሁም አልተዘጋጃችሁም፣ መጣሁ!»",
    },
    {
      en: 'Gugu opened his eyes and counted the sheep in the grass: seven. Ten in all. How many hiding? "Seven… eight, nine, ten. Three are behind the rock!" Baa, baa, baa!',
      am: "ጉጉ ዓይኖቹን ከፍቶ በሣሩ ላይ ያሉትን በጎች ቆጠረ፦ ሰባት። በአጠቃላይ አሥር፤ ስንቶቹ ተደብቀዋል? «ሰባት… ስምንት፣ ዘጠኝ፣ አሥር። ሦስቱ ከድንጋዩ ጀርባ ናቸው!» ሜ፣ ሜ፣ ሜ!",
    },
    {
      en: 'Next time he saw eight. Ten in all. How many hiding? "Eight… nine, ten. Two!" Two woolly heads peeked out. "Eight and two make ten."',
      am: "በሚቀጥለው ጊዜ ስምንት አየ። በአጠቃላይ አሥር፤ ስንቶቹ ተደብቀዋል? «ስምንት… ዘጠኝ፣ አሥር። ሁለት!» ሁለት ጸጉራም ራሶች ብቅ አሉ። «ስምንትና ሁለት አሥር ይሆናሉ።»",
    },
    {
      en: 'Gugu had an idea. He laid ten flat stones in two rows of five. For each sheep he could see, he put a pebble on a stone. "The empty stones are the hiding sheep!"',
      am: "ጉጉ አንድ ሐሳብ መጣለት። አሥር ጠፍጣፋ ድንጋዮችን አምስት አምስት አድርጎ በሁለት ረድፍ ደረደረ። ለሚያየው ለእያንዳንዱ በግ በአንድ ድንጋይ ላይ ጠጠር አደረገ። «ባዶዎቹ ድንጋዮች የተደበቁት በጎች ናቸው!»",
    },
    {
      en: 'Now he saw five. Five pebbles, five empty stones. Ten in all. How many hiding? "Five! Five and five make ten." One whole row, and one whole row.',
      am: "አሁን አምስት አየ። አምስት ጠጠሮች፣ አምስት ባዶ ድንጋዮች። በአጠቃላይ አሥር፤ ስንቶቹ ተደብቀዋል? «አምስት! አምስትና አምስት አሥር ይሆናሉ።» አንድ ሙሉ ረድፍና አንድ ሙሉ ረድፍ።",
    },
    {
      en: 'Then nine sheep stood in the grass, and only one stone was empty. "Nine and one make ten. The littlest lamb is hiding!" There she was, with her bell. Ding!',
      am: "ከዚያ ዘጠኝ በጎች በሣሩ ላይ ቆሙ፤ ባዶ የቀረው አንድ ድንጋይ ብቻ ነበር። «ዘጠኝና አንድ አሥር ይሆናሉ። ትንሿ ጠቦት ተደብቃለች!» እዚያ ነበረች፣ ከቃጭሏ ጋር። ቅጭል!",
    },
    {
      en: 'Then Gugu looked, and there were no sheep at all! Zero pebbles, ten empty stones. "Zero and ten! You are ALL hiding!" Out they ran, all ten, laughing. Baa!',
      am: "ከዚያ ጉጉ ተመለከተ፤ አንድም በግ አልነበረም! ዜሮ ጠጠሮች፣ አሥር ባዶ ድንጋዮች። «ዜሮና አሥር! ሁላችሁም ተደብቃችኋል!» አሥሩም እየሳቁ ሮጠው ወጡ። ሜ!",
    },
    {
      en: "The sheep made up a song as they walked: One and nine! Two and eight! Three and seven! Four and six! Five and five! Every pair makes ten!",
      am: "በጎቹ እየሄዱ ዘፈን ፈጠሩ፦ አንድና ዘጠኝ! ሁለትና ስምንት! ሦስትና ሰባት! አራትና ስድስት! አምስትና አምስት! እያንዳንዱ ጥንድ አሥር ይሆናል!",
    },
    {
      en: 'Buzz! Lali hid behind the rock too. Gugu saw ten sheep in the grass, but something was still hiding. "Lali! You are not a sheep!" Everybody giggled.',
      am: "ቡዝ! ላሊም ከድንጋዩ ጀርባ ተደበቀች። ጉጉ በሣሩ ላይ አሥር በጎች አየ፤ ግን አሁንም የተደበቀ አንድ ነገር ነበር። «ላሊ! አንቺ በግ አይደለሽም!» ሁሉም ሳቁ።",
    },
    {
      en: 'Anbessa wanted a turn. He saw six sheep, and he used his fingers: six fingers up, and the fingers down were the hiding ones. "One, two, three, four. Four are hiding!"',
      am: "አንበሳ ተራ ፈለገ። ስድስት በጎች አየ፤ ጣቶቹንም ተጠቀመ፦ ስድስት ጣቶች ቀጥ፣ የታጠፉት ጣቶች የተደበቁት ናቸው። «አንድ፣ ሁለት፣ ሦስት፣ አራት። አራቱ ተደብቀዋል!»",
    },
    {
      en: "Pitter, patter, the rain began! Four sheep ran into the pen first. Ten in all. How many still outside? Six! Gugu counted them in: five, six, seven, eight, nine, ten.",
      am: "ጠብ፣ ጠብ፣ ዝናብ ጀመረ! መጀመሪያ አራት በጎች ወደ በረቱ ሮጠው ገቡ። በአጠቃላይ አሥር፤ ስንቶቹ ውጭ ቀሩ? ስድስት! ጉጉ እየቆጠረ አስገባቸው፦ አምስት፣ ስድስት፣ ሰባት፣ ስምንት፣ ዘጠኝ፣ አሥር።",
    },
    {
      en: 'Snug in the pen, all ten sheep snuggled together. Gugu counted once more. "Ten in all, and zero hiding. Goodnight, my sheep. Goodnight, {name}!"',
      am: "በረቱ ውስጥ አሥሩም በጎች ተጠጋግተው ሞቁ። ጉጉ አንድ ጊዜ ደግሞ ቆጠረ። «በአጠቃላይ አሥር፣ የተደበቀ ዜሮ። ደህና እደሩ፣ በጎቼና {name}!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Gugu saw seven sheep. How did he work out that three were hiding?", "Can you sing the sheep's song of pairs that make ten?"],
      am: ["ጉጉ ሰባት በጎች አየ። ሦስቱ እንደተደበቁ እንዴት አወቀ?", "እያንዳንዱ ጥንድ አሥር የሚሆንበትን የበጎቹን ዘፈን መዘመር ትችላላችሁ?"],
    },
    activity: {
      en: "Put ten small toys on the table. While your child closes their eyes, hide some under a cloth. They count what they can see and work out how many are hiding, then lift the cloth to check. Take turns.",
      am: "አሥር ትናንሽ መጫወቻዎችን ጠረጴዛ ላይ አስቀምጡ። ልጁ ዓይኑን ሲጨፍን አንዳንዶቹን በጨርቅ ሸፍኑ። የሚያየውን ቆጥሮ ስንቶቹ እንደተደበቁ ይገምት፤ ከዚያ ጨርቁን አንስቶ ያረጋግጥ። ተራ በተራ ተጫወቱ።",
    },
  },
};

export default story;
