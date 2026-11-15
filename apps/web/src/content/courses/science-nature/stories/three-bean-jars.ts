import type { Story } from "../../../stories";

/*
  "Three Bean Jars" (level 1: plants and how they grow; the course's taster). Teacher Meron opens a
  soaked bean to show the tiny plant inside. What does a bean need to grow? Gugu guesses water,
  Tsehay light. The class sets up a fair test: three glass jars with a bean pressed against the
  glass by wet paper (so the roots show): water and light (the windowsill), water and no light
  (the cupboard), light and no water. Gugu cheers when the cupboard bean grows tallest, then looks
  closely: it is pale, thin and floppy. The windowsill bean is green and strong and leans toward
  the window. The dry bean never starts until it gets water. They plant the beans outside, and the
  beans flower and make new beans: seeds again.
  Join-in line: "Wonder, guess, try, and find out!" (the habit of the whole course).

  Science (kept simple and true): a seed holds a tiny plant (with its first leaves) and food for
  it; water wakes it (germination); the root grows first and grows down, the shoot grows up; green
  leaves use sunlight to make food; a seedling grown in the dark uses up its stored food growing
  long, thin and pale (yellow) looking for light, and turns green once it gets light; plants on a
  windowsill bend toward the light. A fair test changes one thing at a time.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ተገረሙ፣ ገምቱ፣ ሞክሩ፣ ደርሱበት!» and «ብልቃጥ» for a glass jar.
*/
const story: Story = {
  id: "three-bean-jars",
  course: "science-nature",
  pack: "story",
  title: { en: "Three Bean Jars", am: "ሦስቱ የባቄላ ብልቃጦች" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#3E9B5A",
  scene: "lib-three-bean-jars",
  coverPage: 7,
  teaches: { words: ["seed", "root", "shoot", "leaf", "light", "water", "grow"] },
  pages: [
    {
      en: 'Teacher Meron gave everyone a hard brown bean. "What do you think is inside?" Gugu shook his bean by his ear. Nothing rattled. "Just more bean?"',
      am: "መምህርት መሮን ለሁሉም ጠንካራ ቡናማ ባቄላ ሰጡ። «ውስጡ ምን ያለ ይመስላችኋል?» ጉጉ ባቄላውን በጆሮው አጠገብ ነቀነቀው። ምንም አልተንኳኳም። «ተጨማሪ ባቄላ ብቻ?»",
    },
    {
      en: "She had soaked one bean overnight. She opened it, and everyone looked through the magnifying glass. Inside was a tiny plant with two baby leaves, and its food!",
      am: "አንዱን ባቄላ ሌሊቱን በውሃ ዘፍዝፈውት ነበር። ከፈቱት፤ ሁሉም በማጉያ ተመለከቱ። ውስጡ ሁለት ትንንሽ ቅጠሎች ያሉት ጥቃቅን ተክልና ምግቡ ነበሩ!",
    },
    {
      en: "\"What does a bean need to grow?\" \"Water!\" said Gugu. \"Light!\" said Tsehay. \"Let's not just guess. Let's try.\" Wonder, guess, try, and find out!",
      am: "«ባቄላ ለማደግ ምን ያስፈልገዋል?» «ውሃ!» አለ ጉጉ። «ብርሃን!» አለች ፀሐይ። «መገመት ብቻ አይበቃም፤ እንሞክር።» ተገረሙ፣ ገምቱ፣ ሞክሩ፣ ደርሱበት!",
    },
    {
      en: "They made three glass jars. One: water, on the sunny windowsill. Two: water, in the dark cupboard. Three: on the windowsill, but no water.",
      am: "ሦስት ብልቃጦች አዘጋጁ። አንደኛው፦ ውሃ ያለው፣ ፀሐያማው መስኮት ላይ። ሁለተኛው፦ ውሃ ያለው፣ ጨለማው ቁም ሣጥን ውስጥ። ሦስተኛው፦ መስኮት ላይ፣ ውሃ የሌለው።",
    },
    {
      en: "On day three, the wet beans split their coats, and a white root grew down, down, down. The dry bean did nothing. \"Water wakes up the seed!\"",
      am: "በሦስተኛው ቀን እርጥቦቹ ባቄላዎች ልጣጫቸውን ሰነጠቁ፤ ነጭ ሥርም ወደ ታች አደገ። ደረቁ ባቄላ ምንም አላደረገም። «ውሃ ዘሩን ይቀሰቅሰዋል!»",
    },
    {
      en: "On day five, a green shoot pushed UP. Even the bean in the dark was growing! \"Maybe it doesn't need light,\" wondered Gugu. Wonder, guess, try, and find out!",
      am: "በአምስተኛው ቀን አረንጓዴ ቡቃያ ወደ ላይ ወጣ። በጨለማ ያለውም እያደገ ነበር! «ምናልባት ብርሃን አያስፈልገውም» አለ ጉጉ። ተገረሙ፣ ገምቱ፣ ሞክሩ፣ ደርሱበት!",
    },
    {
      en: "On day eight, the dark bean was the TALLEST! \"Darkness wins!\" cheered Gugu. Then he looked closely. It was pale, thin as a thread and floppy.",
      am: "በስምንተኛው ቀን የጨለማው ባቄላ ከሁሉም ረዘመ! «ጨለማው አሸነፈ!» አለ ጉጉ። ከዚያ በጥንቃቄ ተመለከተ። ገርጣ፣ እንደ ክር ቀጭንና ልፍስፍስ ነበር።",
    },
    {
      en: "The windowsill bean was shorter but strong and green, leaning to the light. \"Leaves use sunlight to make food,\" said Teacher Meron. \"In the dark, it used up its food.\"",
      am: "የመስኮቱ ባቄላ አጭር ግን ጠንካራና አረንጓዴ ነበር፤ ወደ ብርሃኑ ዘምብሏል። «ቅጠሎች በፀሐይ ብርሃን ምግብ ይሠራሉ» አሉ መምህርቷ። «በጨለማ ምግቡን ጨረሰ።»",
    },
    {
      en: 'And jar three? The dry bean was still just a hard bean. "No water, no growing," wrote Tsehay. Gugu gave it a drink, and two days later, its little root poked out at last.',
      am: "ሦስተኛው ብልቃጥስ? ደረቁ ባቄላ አሁንም ጠንካራ ባቄላ ብቻ ነበር። «ውሃ ከሌለ ማደግ የለም» ብላ ጻፈች ፀሐይ። ጉጉ ውሃ አጠጣው፤ ከሁለት ቀን በኋላ በመጨረሻ ትንሿ ሥሩ ብቅ አለች።",
    },
    {
      en: "Gugu carried the pale bean to the sunny window. Day by day, its leaves slowly turned green. \"It wasn't the winner,\" he said. \"It was the bean that needed help.\"",
      am: "ጉጉ ገርጣውን ባቄላ ወደ ፀሐያማው መስኮት ወሰደው። ቀን በቀን ቅጠሎቹ ቀስ እያሉ አረንጓዴ ሆኑ። «አሸናፊው አልነበረም» አለ። «እርዳታ የሚያስፈልገው ባቄላ ነበር።»",
    },
    {
      en: "They planted the beans in the school garden. Roots down, shoots up! The beans grew tall, with white flowers, and the flowers became pods full of beans.",
      am: "ባቄላዎቹን በትምህርት ቤቱ አትክልት ተከሏቸው። ሥሮች ወደ ታች፣ ቡቃያዎች ወደ ላይ! ረዝመው ነጫጭ አበቦች አወጡ፤ አበቦቹም ባቄላ የሞላባቸው ሽፋኖች ሆኑ።",
    },
    {
      en: 'Gugu opened a pod and held up a hard brown bean. "Look! A tiny plant is waiting inside, with its food packed around it." Everyone shouted, "Wonder, guess, try, and find out!"',
      am: "ጉጉ አንዱን ሽፋን ከፍቶ ጠንካራ ቡናማ ባቄላ አነሣ። «ተመልከቱ! በውስጡ ጥቃቅን ተክል ከምግቡ ጋር ታሽጎ እየጠበቀ ነው።» ሁሉም ጮኹ፦ «ተገረሙ፣ ገምቱ፣ ሞክሩ፣ ደርሱበት!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why did the class make three jars and change only one thing in each? What would go wrong if every jar were different in lots of ways?",
        "The bean in the dark grew tallest. Was it the healthiest? How could Gugu tell?",
      ],
      am: [
        "ክፍሉ ለምን ሦስት ብልቃጦች አዘጋጀ? በእያንዳንዱ ለምን አንድ ነገር ብቻ ቀየሩ? እያንዳንዱ ብልቃጥ በብዙ መንገድ ቢለያይ ምን ይበላሽ ነበር?",
        "በጨለማ ያለው ባቄላ ከሁሉም ረዘመ። ከሁሉም ጤናማው ነበር? ጉጉ እንዴት አወቀ?",
      ],
    },
    activity: {
      en: "Make your own bean jar: fold a paper towel into a clear glass, wet it, and slide two beans (or chickpeas) between the paper and the glass. Keep the paper damp. Put one jar on a sunny windowsill and one in a cupboard, and draw them every two days. Or sow a pinch of teff in two cups of soil and do the same.",
      am: "የራሳችሁን የባቄላ ብልቃጥ ሥሩ፦ የወረቀት ሶፍት አጣጥፋችሁ በግልጽ ብርጭቆ ውስጥ አስገቡ፣ አርጥቡት፣ ሁለት ባቄላዎችን (ወይም ሽምብራ) በወረቀቱና በመስታወቱ መካከል አስገቡ። ወረቀቱን እርጥብ አድርጋችሁ ያዙት። አንዱን ብርጭቆ ፀሐያማ መስኮት ላይ፣ ሌላውን ቁም ሣጥን ውስጥ አስቀምጡ፤ በየሁለት ቀኑም ሣሏቸው። ወይም ቁንጥጫ ጤፍ በሁለት ስኒ አፈር ውስጥ ዝራችሁ እንደዚሁ አድርጉ።",
    },
  },
};

export default story;
