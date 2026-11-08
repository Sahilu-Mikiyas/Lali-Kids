import type { Story } from "../../../stories";

/*
  "Grandma's Shape Kitchen" (Numbers & Counting, level 2). What makes a shape that shape:
  a circle is round with no corners and no straight sides (injera, the mitad, plates); a
  triangle has 3 sides and 3 corners whatever its size (sambusa); a square has 4 sides all the
  same length and 4 corners (a cloth, measured with a straw); a rectangle has 2 long sides and
  2 short sides (the tray). Folding a square cloth corner to corner makes two triangles; a long
  thin "square" turns out to be a rectangle; and the food becomes a picture of a house.
  The repeated line to join in on: "Count the sides, count the corners!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the shape words (ክብ, ሦስት ማዕዘን, ካሬ, አራት ማዕዘን as in "Gugu's Shapes Safari"), «ጎን» for
  side, «ምጣድ» for the griddle, and the repeated line.
*/
const story: Story = {
  id: "shape-kitchen",
  course: "numbers-counting",
  pack: "numbers",
  title: { en: "Grandma's Shape Kitchen", am: "የአያት የቅርጾች ማዕድ ቤት" },
  category: "Maths",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#B4472E",
  scene: "lib-shape-kitchen",
  coverPage: 3,
  teaches: { words: ["circle", "triangle", "square", "rectangle", "side", "corner", "round", "straight"], numbers: [0, 3, 4] },
  pages: [
    {
      en: 'It was a holiday, and Grandma\'s kitchen was busy. "Guests are coming!" she said. "Tsehay, Anbessa, you can be my shape helpers."',
      am: "በዓል ነበር፤ የአያት ማዕድ ቤትም ሥራ በዝቶበት ነበር። «እንግዶች እየመጡ ነው!» አለች። «ፀሐይ፣ አንበሳ፣ እናንተ የቅርጽ ረዳቶቼ ሁኑ።»",
    },
    {
      en: 'Grandma poured batter on the big hot griddle. Sizzle! Round and round. "A circle!" said Tsehay. She ran her finger round the edge. "No corners and no straight sides at all."',
      am: "አያት ሊጡን በትልቁ የጋለ ምጣድ ላይ አፈሰሰች። ሽ! ዙሪያውን፣ ዙሪያውን። «ክብ!» አለች ፀሐይ። ጣቷን በጠርዙ ዙሪያ አዞረች። «ምንም ማዕዘን የለውም፣ ምንም ቀጥ ያለ ጎንም የለውም።»",
    },
    {
      en: 'Then Grandma folded the sambusa: fold, fold, pinch! "A triangle!" said Anbessa. Count the sides, count the corners! "One, two, three sides. One, two, three corners."',
      am: "ከዚያ አያት ሳምቡሳውን አጠፈች፦ እጠፍ፣ እጠፍ፣ ቁንጥጥ! «ሦስት ማዕዘን!» አለ አንበሳ። ጎኖቹን ቁጠሩ፣ ማዕዘኖቹን ቁጠሩ! «አንድ፣ ሁለት፣ ሦስት ጎኖች። አንድ፣ ሁለት፣ ሦስት ማዕዘኖች።»",
    },
    {
      en: "Some sambusas were big, some were small, some were fat and some were thin. But every one had three sides and three corners. Every one was a triangle!",
      am: "አንዳንዶቹ ሳምቡሳዎች ትልቅ፣ አንዳንዶቹ ትንሽ፣ አንዳንዶቹ ወፍራም፣ አንዳንዶቹ ቀጭን ነበሩ። ግን ሁሉም ሦስት ጎኖችና ሦስት ማዕዘኖች ነበሯቸው። ሁሉም ሦስት ማዕዘን ነበሩ!",
    },
    {
      en: 'Tsehay spread a cloth for the bread. "Is it a square?" Count the sides, count the corners! Four corners. She measured each side with a straw: same, same, same, same! "A square: four sides, all the same."',
      am: "ፀሐይ ለዳቦው መሸፈኛ ጨርቅ ዘረጋች። «ካሬ ነው?» ጎኖቹን ቁጠሩ፣ ማዕዘኖቹን ቁጠሩ! አራት ማዕዘኖች። እያንዳንዱን ጎን በገለባ ለካች፦ እኩል፣ እኩል፣ እኩል፣ እኩል! «ካሬ ነው፦ አራት ጎኖች፣ ሁሉም እኩል።»",
    },
    {
      en: "Anbessa folded the square cloth, corner to corner. Swish! Now it was a triangle. He opened it again. Two triangles, side by side, make a square!",
      am: "አንበሳ ካሬውን ጨርቅ ከማዕዘን ወደ ማዕዘን አጠፈው። ሽው! አሁን ሦስት ማዕዘን ሆነ። እንደገና ዘረጋው። ሁለት ሦስት ማዕዘኖች ጎን ለጎን ሲሆኑ ካሬ ይሠራሉ!",
    },
    {
      en: 'Grandma brought the long wooden tray. Count the sides, count the corners! Four corners, four sides. "But two sides are long and two are short," said Tsehay. "A rectangle!"',
      am: "አያት ረጅሙን የእንጨት ትሪ አመጣች። ጎኖቹን ቁጠሩ፣ ማዕዘኖቹን ቁጠሩ! አራት ማዕዘኖች፣ አራት ጎኖች። «ግን ሁለቱ ጎኖች ረጅም፣ ሁለቱ ደግሞ አጭር ናቸው» አለች ፀሐይ። «አራት ማዕዘን!»",
    },
    {
      en: 'Anbessa held up a long, thin piece of bread. "A square!" Tsehay laid a straw along it. "This side is long, and this side is short." Anbessa laughed. "Oops, a rectangle!"',
      am: "አንበሳ ረጅምና ቀጭን ዳቦ ከፍ አድርጎ ያዘ። «ካሬ!» ፀሐይ ገለባውን አጠገቡ አስቀመጠች። «ይሄ ጎን ረጅም ነው፣ ይሄ ደግሞ አጭር።» አንበሳ ሳቀ። «ውይ፣ አራት ማዕዘን ነው!»",
    },
    {
      en: "Buzz! Lali found circles all over the kitchen: the plates, the tops of the cups, the round coffee pot, the mesob basket. She nudged a plate and it rolled. Circles roll, because they have no corners!",
      am: "ቡዝ! ላሊ በማዕድ ቤቱ ውስጥ ሁሉ ክቦችን አገኘች፦ ሳህኖቹን፣ የሲኒዎቹን አፍ፣ ክቧን ጀበና፣ መሶቡን። አንድ ሳህን ገፋ ስታደርግ ተንከባለለ። ክቦች ይንከባለላሉ፤ ማዕዘን የላቸውማ!",
    },
    {
      en: "Then they made a picture on the tray: a square of bread, a triangle sambusa roof on top, a rectangle door, and a round injera sun. \"It's a house!\"",
      am: "ከዚያ ትሪው ላይ ሥዕል ሠሩ፦ የዳቦ ካሬ፣ ከላዩ የሳምቡሳ ሦስት ማዕዘን ጣሪያ፣ አራት ማዕዘን በር፣ ክብ የእንጀራ ፀሐይ። «ቤት ነው!»",
    },
    {
      en: 'Knock, knock! The guests came in, and Grandma played a game. "Bring me a shape with three corners!" Gugu brought a sambusa. "And one with no corners!" {name} knows: a circle!',
      am: "ኳ፣ ኳ! እንግዶቹ ገቡ፤ አያትም ጨዋታ ጀመረች። «ሦስት ማዕዘኖች ያሉትን ቅርጽ አምጡልኝ!» ጉጉ ሳምቡሳ አመጣ። «ማዕዘን የሌለውንስ!» {name} ያውቃል፦ ክብ!",
    },
    {
      en: 'Everyone ate and laughed. Anbessa took a big bite of his round injera. Chomp! "Now what shape is it?" Count the sides, count the corners! "A hungry shape!" giggled Tsehay.',
      am: "ሁሉም በሉ፣ ሳቁም። አንበሳ ክቡን እንጀራ ትልቅ ጉርሻ ገመጠ። ቋ! «አሁን ምን ዓይነት ቅርጽ ሆነ?» ጎኖቹን ቁጠሩ፣ ማዕዘኖቹን ቁጠሩ! «የተራበ ቅርጽ!» ብላ ሳቀች ፀሐይ።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "How is a square different from a rectangle? How did Tsehay check?",
        "Why do circles roll, but squares and triangles don't?",
      ],
      am: [
        "ካሬ ከአራት ማዕዘን በምን ይለያል? ፀሐይ እንዴት አረጋገጠች?",
        "ክቦች ለምን ይንከባለላሉ፣ ካሬዎችና ሦስት ማዕዘኖች ግን አይንከባለሉም?",
      ],
    },
    activity: {
      en: "Fold a square of paper or cloth corner to corner to make a triangle, then open it again. Find a circle, a triangle, a square and a rectangle in your kitchen, and count the sides and corners of each one together.",
      am: "ካሬ ወረቀት ወይም ጨርቅ ከማዕዘን ወደ ማዕዘን አጥፋችሁ ሦስት ማዕዘን ሥሩ፣ ከዚያ እንደገና ዘርጉት። በማዕድ ቤታችሁ ውስጥ ክብ፣ ሦስት ማዕዘን፣ ካሬና አራት ማዕዘን ፈልጉ፤ የእያንዳንዳቸውን ጎኖችና ማዕዘኖች አብራችሁ ቁጠሩ።",
    },
  },
};

export default story;
