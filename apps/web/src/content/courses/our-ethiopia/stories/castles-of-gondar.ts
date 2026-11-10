import type { Story } from "../../../stories";

/*
  "Hide and Seek in the Castles" (level 4: stories from our history: the castles of Gondar).
  Grandma takes Tsehay and Gugu to Gondar. Inside one great wall, the royal enclosure (Fasil
  Ghebbi) has castles and palaces built by Emperor Fasilides, who made Gondar his capital almost
  four hundred years ago, and by the emperors after him. Gugu wants to play hide and seek and
  disappears. Shy Tsehay must find him: she remembers what Grandma said about each building (the
  big castle with round domed towers; a library; the stables) and follows the clues, counting
  castles, until she finds him. Then Grandma shows them Fasilides' Bath, a stone pool that is
  filled with water every year for Timket, and the church of Debre Birhan Selassie, whose ceiling
  is covered with painted angels' faces. Tsehay, who usually hides, was the finder.
  Join-in line: "Round towers, high walls: where are you, Gugu?"

  Facts: Emperor Fasilides made Gondar the capital in the 1630s and built the first great castle
  of stone, with round corner towers and domes; later emperors added more castles, a library,
  halls and stables inside the same wall (Fasil Ghebbi, now a World Heritage Site); Fasilides'
  Bath is a pool with a small building in the middle, filled for Timket; the ceiling of Debre
  Birhan Selassie is painted with rows of winged angels' faces.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ክብ ማማዎች፣ ረጃጅም ግንቦች፦ ጉጉ የት ነህ?», «ፋሲል ግቢ» and «የፋሲለደስ መዋኛ».
*/
const story: Story = {
  id: "castles-of-gondar",
  course: "our-ethiopia",
  pack: "story",
  title: { en: "Hide and Seek in the Castles", am: "በግንቦቹ ውስጥ ድብብቆሽ" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#9A7A54",
  scene: "lib-castles-of-gondar",
  coverPage: 1,
  teaches: { words: ["castle", "tower", "emperor", "wall", "clue", "history"] },
  pages: [
    {
      en: "Grandma took Tsehay and Gugu to Gondar, a city in the north. Behind a long stone wall stood castles, real castles, with towers and windows and battlements.",
      am: "አያቴ ፀሐይንና ጉጉን በሰሜን ወዳለችው ወደ ጎንደር ከተማ ወሰደቻቸው። ከረጅም የድንጋይ ግንብ ጀርባ ግንቦች ቆመው ነበር፤ ማማ፣ መስኮትና የግንብ ጥርስ ያላቸው እውነተኛ ቤተ መንግሥቶች።",
    },
    {
      en: '"Almost four hundred years ago," said Grandma, "Emperor Fasilides made Gondar his capital and built this big castle, with round towers and domes. The emperors after him built more, all inside this one wall."',
      am: "«ከአራት መቶ ዓመታት ገደማ በፊት» አለች አያቴ፤ «አፄ ፋሲለደስ ጎንደርን ዋና ከተማቸው አድርገው ክብ ማማዎችና ጉልላቶች ያሉትን ይህን ትልቅ ግንብ ሠሩ። ከእሳቸው በኋላ የመጡት ነገሥታትም በዚሁ አንድ ቅጥር ውስጥ ሌሎችን ሠሩ።»",
    },
    {
      en: 'Grandma pointed. "That long building was a library, full of books. And over there were the stables, for the royal horses." Tsehay counted the castles on her fingers. One, two, three!',
      am: "አያቴ ጠቆመች። «ያ ረጅም ሕንፃ በመጻሕፍት የተሞላ ቤተ መጻሕፍት ነበር። እዚያ ደግሞ የንጉሣውያን ፈረሶች በረት ነበር።» ፀሐይ ግንቦቹን በጣቶቿ ቆጠረች። አንድ፣ ሁለት፣ ሦስት!",
    },
    {
      en: '"Let\'s play hide and seek!" shouted Gugu. "Tsehay, you count!" Tsehay covered her eyes. "One, two, three… ten!" When she opened them, Gugu was gone.',
      am: "«ድብብቆሽ እንጫወት!» ብሎ ጮኸ ጉጉ። «ፀሐይ፣ አንቺ ቁጠሪ!» ፀሐይ ዓይኖቿን ሸፈነች። «አንድ፣ ሁለት፣ ሦስት… አሥር!» ስትከፍታቸው ጉጉ የለም።",
    },
    {
      en: 'Tsehay looked behind the wall. No Gugu. She looked behind a tree. No Gugu. The castles were so big, and she was so small. "Round towers, high walls: where are you, Gugu?"',
      am: "ፀሐይ ከግንቡ ጀርባ ተመለከተች። ጉጉ የለም። ከዛፍ ጀርባ ተመለከተች። ጉጉ የለም። ግንቦቹ በጣም ትልልቅ ነበሩ፤ እሷ ደግሞ በጣም ትንሽ። «ክብ ማማዎች፣ ረጃጅም ግንቦች፦ ጉጉ የት ነህ?»",
    },
    {
      en: 'Then she heard a giggle and a funny "neigh!" from far away. Someone was pretending to be a horse! Tsehay remembered what Grandma said. "The stables!" She ran across the grass.',
      am: "ከዚያ ከሩቅ ሳቅና አስቂኝ የፈረስ ድምፅ ሰማች። አንድ ሰው እንደ ፈረስ እያስመሰለ ነበር! ፀሐይ አያቴ ያለችውን አስታወሰች። «በረቱ!» በሣሩ ላይ ሮጠች።",
    },
    {
      en: 'At the old stables there were no horses, only stone arches… and something buzzing in the shadows. It was Lali! "Not me," she buzzed. "But I saw him run past the books!" Round towers, high walls: where are you, Gugu?',
      am: "በድሮው በረት ፈረሶች አልነበሩም፤ የድንጋይ ቅስቶች ብቻ… እና በጥላው ውስጥ የሚያንጎራጉር ነገር። ላሊ ነበረች! «እኔ አይደለሁም» አለች። «ግን በመጻሕፍቱ በኩል ሲሮጥ አየሁት!» ክብ ማማዎች፣ ረጃጅም ግንቦች፦ ጉጉ የት ነህ?",
    },
    {
      en: 'The books! "The library!" Tsehay tiptoed into the long building. A tail was swishing behind a pillar. "Found you!" Gugu jumped out, laughing. "You found me! You\'re a castle detective!"',
      am: "መጻሕፍቱ! «ቤተ መጻሕፍቱ!» ፀሐይ በጣቶቿ ጫፍ ወደ ረጅሙ ሕንፃ ገባች። ከአንድ ምሰሶ ጀርባ ጭራ ይወዛወዝ ነበር። «አገኘሁህ!» ጉጉ እየሳቀ ዘልሎ ወጣ። «አገኘሽኝ! የግንብ መርማሪ ነሽ!»",
    },
    {
      en: 'Then Grandma took them to a big stone pool with a little castle in the middle. "This is Fasilides\' Bath. Every year, for Timket, it is filled with water, and people come to be blessed and to splash."',
      am: "ከዚያ አያቴ መሀሉ ላይ ትንሽ ግንብ ወዳለበት ትልቅ የድንጋይ ገንዳ ወሰደቻቸው። «ይህ የፋሲለደስ መዋኛ ነው። በየዓመቱ ለጥምቀት በውሃ ይሞላል፤ ሰዎችም ለመባረክና ለመረጨት ይመጣሉ።»",
    },
    {
      en: 'Last, they climbed a hill to a church called Debre Birhan Selassie. Tsehay looked up and gasped. The whole ceiling was covered with painted angels\' faces, rows and rows of them, with big round eyes and little wings.',
      am: "በመጨረሻ ደብረ ብርሃን ሥላሴ ወደሚባል ቤተ ክርስቲያን ኮረብታውን ወጡ። ፀሐይ ቀና ብላ አየችና ተደነቀች። ጣሪያው ሙሉ በሙሉ በተሣሉ የመላእክት ፊቶች ተሸፍኖ ነበር፤ ረድፍ በረድፍ፣ ትልልቅ ክብ ዓይኖችና ትንንሽ ክንፎች ያሏቸው።",
    },
    {
      en: '"They\'re all looking at me!" whispered Tsehay. Grandma laughed. "They\'re looking at the girl who found Gugu in a whole city of castles."',
      am: "«ሁሉም እኔን እያዩ ነው!» አለች ፀሐይ በሹክሹክታ። አያቴ ሳቀች። «በሙሉ የግንብ ከተማ ውስጥ ጉጉን ያገኘችውን ልጅ እያዩ ነው።»",
    },
    {
      en: 'On the way home, Gugu said, "Next time, I count and you hide!" Tsehay smiled her biggest smile. "You\'ll never find me. I know all the castles now." Round towers, high walls, see you again, Gondar!',
      am: "ወደ ቤት ሲመለሱ ጉጉ «በሚቀጥለው ጊዜ እኔ እቆጥራለሁ፣ አንቺ ትደበቂያለሽ!» አለ። ፀሐይ ትልቁን ፈገግታዋን ፈገግ አለች። «በፍጹም አታገኘኝም። አሁን ግንቦቹን ሁሉ አውቃቸዋለሁ።» ክብ ማማዎች፣ ረጃጅም ግንቦች፣ እንደገና እንገናኝ ጎንደር!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Tsehay found Gugu by remembering what each building was for. What clues helped her?",
        "Fasilides' Bath is used every year for Timket. What old places near us are still used today?",
      ],
      am: [
        "ፀሐይ ጉጉን ያገኘችው እያንዳንዱ ሕንፃ ለምን እንደሚያገለግል በማስታወስ ነው። የትኞቹ ፍንጮች ረዷት?",
        "የፋሲለደስ መዋኛ በየዓመቱ ለጥምቀት ያገለግላል። በአቅራቢያችን ዛሬም የሚያገለግሉ የትኞቹ ጥንታዊ ቦታዎች አሉ?",
      ],
    },
    activity: {
      en: "Build a Gondar castle from boxes and cups: square walls, round towers at the corners and paper domes on top. Then play hide and seek with clues: hide a toy and give three clues about where it is.",
      am: "ከካርቶንና ከስኒ የጎንደር ግንብ ሥሩ፦ አራት ማዕዘን ግድግዳዎች፣ በማዕዘኖቹ ክብ ማማዎችና ከላይ የወረቀት ጉልላቶች። ከዚያ በፍንጭ ድብብቆሽ ተጫወቱ፦ አንድ አሻንጉሊት ደብቁና የት እንዳለ ሦስት ፍንጮች ስጡ።",
    },
  },
};

export default story;
