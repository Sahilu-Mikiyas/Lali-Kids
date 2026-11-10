import type { Story } from "../../../stories";

/*
  "Fill the Ten First" (Maths Explorers, level 1). Adding across ten by making a ten: Tsehay
  sells Grandma's eggs at the Saturday market and runs out of fingers counting 8 + 5. Grandma's
  egg box with ten holes shows the trick: fill the box first (8 needs 2), then add the rest
  (10 + 3 = 13). It works for 9 + 4, 7 + 6, 9 + 8 and 6 + 8, and backwards for taking away
  (14 − 6: back to ten, then the rest). Brown eggs and white eggs keep the two numbers apart.
  The repeated line to join in on: "Make a ten, then add the rest!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the repeated line «አሥር ሙሉ፣ ቀሪውን ጨምሩ!» and «ወደ አሥር ተመለሱ» for "back to ten".
*/
const story: Story = {
  id: "fill-ten-first",
  course: "maths-explorers",
  pack: "story",
  title: { en: "Fill the Ten First", am: "መጀመሪያ አሥሩን ሙሉ" },
  category: "Maths",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#E8813B",
  scene: "lib-fill-ten-first",
  coverPage: 3,
  teaches: { numbers: [2, 3, 4, 6, 7, 8, 9, 10, 13, 14, 17], words: ["make ten", "add", "take away", "equals"] },
  pages: [
    {
      en: 'Saturday was market day. Grandma and Tsehay carried two baskets of eggs to their spot under the big umbrella. "Today you are the egg seller," said Grandma. Tsehay stood up tall, and felt a little wobbly inside.',
      am: "ቅዳሜ የገበያ ቀን ነበር። አያትና ፀሐይ ሁለት ቅርጫት እንቁላል ይዘው ከትልቁ ጃንጥላ ሥር ወዳለው ቦታቸው ሄዱ። «ዛሬ እንቁላል ሻጯ አንቺ ነሽ» አለች አያት። ፀሐይ ቀጥ ብላ ቆመች፤ ውስጧ ግን ትንሽ ፈራ።",
    },
    {
      en: 'Auntie Sheep came first. "I\'ll take the eggs from both baskets, please." One basket had 8 brown eggs and the other had 5 white ones. "Eight… nine, ten, eleven…" Tsehay counted on her fingers, and ran out of fingers!',
      am: "መጀመሪያ የመጣችው እማማ በግ ነበረች። «የሁለቱንም ቅርጫቶች እንቁላሎች እወስዳለሁ።» አንዱ ቅርጫት 8 ቡናማ እንቁላሎች፣ ሌላው 5 ነጭ እንቁላሎች ነበሩት። «ስምንት… ዘጠኝ፣ አሥር፣ አሥራ አንድ…» ፀሐይ በጣቶቿ ቆጠረች፤ ጣቶቿ ግን አለቁ!",
    },
    {
      en: 'Grandma took out an egg box with ten holes. "Put the 8 in. How many holes are empty?" "Two!" "Then move 2 eggs from the 5 to fill them." Make a ten, then add the rest!',
      am: "አያት አሥር ቀዳዳ ያለው የእንቁላል ሳጥን አወጣች። «8ቱን አስገቢ። ስንት ቀዳዳዎች ባዶ ናቸው?» «ሁለት!» «እንግዲያው ከ5ቱ 2 እንቁላሎችን አንሥተሽ ሙያቸው።» አሥር ሙሉ፣ ቀሪውን ጨምሩ!",
    },
    {
      en: 'Now the box was full: ten! And 3 white eggs were left in the basket. "Ten and three is thirteen!" said Tsehay. So 8 + 5 = 13. In Ge\'ez it is ፲፫: the sign for ten, then the sign for three.',
      am: "አሁን ሳጥኑ ሞላ፦ አሥር! በቅርጫቱ ውስጥ 3 ነጭ እንቁላሎች ቀሩ። «አሥርና ሦስት አሥራ ሦስት ነው!» አለች ፀሐይ። ስለዚህ 8 + 5 = 13። በግዕዝ ፲፫ ነው፦ የአሥር ምልክት፣ ከዚያ የሦስት ምልክት።",
    },
    {
      en: 'Next came Gugu. He wanted 9 eggs for his mother and 4 for his grandmother. Nine needs just one more to make ten. Make a ten, then add the rest! "Ten and three: thirteen again!" 9 + 4 = 13.',
      am: "ቀጥሎ ጉጉ መጣ። ለእናቱ 9 እንቁላሎች፣ ለአያቱ ደግሞ 4 ፈለገ። ዘጠኝ አሥር ለመሆን አንድ ብቻ ይጎድለዋል። አሥር ሙሉ፣ ቀሪውን ጨምሩ! «አሥርና ሦስት፦ እንደገና አሥራ ሦስት!» 9 + 4 = 13።",
    },
    {
      en: 'Lali buzzed over with a puzzle: "What about 7 and 6?" Seven needs three to make ten. Take 3 from the 6, and 3 are left. "Ten and three… thirteen again!" laughed Tsehay. Different eggs, the same answer.',
      am: "ላሊ እንቆቅልሽ ይዛ እየበረረች መጣች፦ «7ና 6ስ?» ሰባት አሥር ለመሆን ሦስት ይጎድለዋል። ከ6ቱ 3 ሲወሰድ 3 ይቀራል። «አሥርና ሦስት… እንደገና አሥራ ሦስት!» ብላ ሳቀች ፀሐይ። እንቁላሎቹ ይለያያሉ፤ መልሱ ግን አንድ ነው።",
    },
    {
      en: 'Anbessa came running for the café on the corner: "Nine and eight, please!" "Nine needs one," said Tsehay quickly. She moved one egg across, and 7 were left. "Ten and seven: seventeen!" 9 + 8 = 17. Make a ten, then add the rest!',
      am: "አንበሳ ጥጉ ላይ ላለው ካፌ እየሮጠ መጣ፦ «ዘጠኝና ስምንት እባክሽ!» «ዘጠኝ አንድ ይጎድለዋል» አለች ፀሐይ በፍጥነት። አንድ እንቁላል አሻገረች፤ 7 ቀሩ። «አሥርና ሰባት፦ አሥራ ሰባት!» 9 + 8 = 17። አሥር ሙሉ፣ ቀሪውን ጨምሩ!",
    },
    {
      en: 'Now there were 14 eggs: a full box and 4 more. Teacher Meron bought 6. "Take the 4 loose ones first," said Grandma. "That takes you back to ten. Then 2 more from the box." Ten take away two is eight. 14 − 6 = 8.',
      am: "አሁን 14 እንቁላሎች ነበሩ፦ አንድ ሙሉ ሳጥንና 4 ተጨማሪ። መምህርት መሮን 6 ገዛች። «መጀመሪያ 4ቱን የተለቀቁትን ስጪ» አለች አያት። «ያ ወደ አሥር ይመልስሻል። ከዚያ ከሳጥኑ 2 ተጨማሪ።» ከአሥር ሁለት ሲቀነስ ስምንት ይቀራል። 14 − 6 = 8።",
    },
    {
      en: '"Back to ten, then take the rest!" said Grandma. "It works for taking away too." Tsehay tried 13 − 5 by herself: 3 to get back to ten, then 2 more. "Eight!" 13 − 5 = 8.',
      am: "«ወደ አሥር ተመለሱ፣ ከዚያ ቀሪውን ቀንሱ!» አለች አያት። «ለመቀነስም ይሠራል።» ፀሐይ 13 − 5ን ለብቻዋ ሞከረች፦ ወደ አሥር ለመመለስ 3፣ ከዚያ 2 ተጨማሪ። «ስምንት!» 13 − 5 = 8።",
    },
    {
      en: "{name}, can we help Tsehay? 6 + 8. Eight needs two to make ten. Take 2 from the 6, and 4 are left. Ten and four is… fourteen! Make a ten, then add the rest!",
      am: "{name}፣ ፀሐይን እናግዛት? 6 + 8። ስምንት አሥር ለመሆን ሁለት ይጎድለዋል። ከ6ቱ 2 እንውሰድ፤ 4 ይቀራሉ። አሥርና አራት… አሥራ አራት! አሥር ሙሉ፣ ቀሪውን ጨምሩ!",
    },
    {
      en: 'By noon both baskets were empty and the money tin jingled. "You counted faster than me today," said Grandma, and she bought Tsehay a sweet, juicy mango.',
      am: "እኩለ ቀን ሲሆን ሁለቱም ቅርጫቶች ባዶ ሆኑ፤ የገንዘቡ ቆርቆሮም ይንኳኳ ነበር። «ዛሬ ከእኔ ፈጥነሽ ቆጠርሽ» አለች አያት፤ ለፀሐይም ጣፋጭ ማንጎ ገዛችላት።",
    },
    {
      en: 'On the way home, Tsehay swung the empty egg box and sang her new song. Make a ten, then add the rest! "Tomorrow," she said, "I\'ll teach Gugu the egg box trick."',
      am: "ወደ ቤት ሲመለሱ ፀሐይ ባዶውን የእንቁላል ሳጥን እያወዛወዘች አዲሱን ዘፈኗን ዘፈነች። አሥር ሙሉ፣ ቀሪውን ጨምሩ! «ነገ ለጉጉ የእንቁላል ሳጥኑን ዘዴ አስተምረዋለሁ» አለች።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why did Tsehay fill the egg box first? How did it make adding 8 and 5 easier?", "How many more does 7 need to make ten? And 6? And 9?"],
      am: ["ፀሐይ መጀመሪያ የእንቁላል ሳጥኑን ለምን ሞላች? 8ና 5ን መደመር እንዴት አቀለለላት?", "7 አሥር ለመሆን ስንት ይጎድለዋል? 6ስ? 9ስ?"],
    },
    activity: {
      en: "Draw two rows of five circles on paper (an egg box) or use an empty egg carton. With beans of two colours, make sums like 8 + 5: fill the ten with the first colour, move beans from the second to fill the box, then say \"ten and three, thirteen\".",
      am: "በወረቀት ላይ ሁለት ረድፍ አምስት አምስት ክቦችን ሣሉ (የእንቁላል ሳጥን)፣ ወይም ባዶ የእንቁላል ካርቶን ተጠቀሙ። በሁለት ቀለም ባቄላዎች እንደ 8 + 5 ያሉ ስሌቶችን ሥሩ፦ በመጀመሪያው ቀለም ሙሉ፣ ሳጥኑን ለመሙላት ከሁለተኛው ቀለም አሻግሩ፣ ከዚያ «አሥርና ሦስት፣ አሥራ ሦስት» በሉ።",
    },
  },
};

export default story;
