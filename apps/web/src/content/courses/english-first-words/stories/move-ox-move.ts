import type { Story } from "../../../stories";

/*
  "Move, Ox, Move!" (level 4: the sounds n, o, p).
  Tsehay and Anbessa carry a pot of fresh milk to Grandma, playing Lali's sound game on the way:
  ‘p’ for pot and path. Round a corner, a huge ox (‘o’) lies right on the path and won't move:
  not for "please", not for Gugu's pushing. Anbessa looks closely and works it out: under the
  ox's nose (‘n’) is a little nest with three blue eggs. The ox isn't stubborn; he's keeping the
  nest safe from their feet. So they don't need him to move: they make a new path around.
  Join-in line: "Move, Ox, move! Please move off the path!"

  English taught: the sounds ‘n’, ‘o’ (short, as in ox and on), ‘p’; nest, nose, ox, on, off,
  pot, path, please.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ተነሣ፣ በሬ፣ ተነሣ! እባክህ ከመንገዱ ውረድ!» and «በሬ» for ox.
*/
const story: Story = {
  id: "move-ox-move",
  course: "english-first-words",
  pack: "story",
  title: { en: "Move, Ox, Move!", am: "Move, Ox, Move! ተነሣ፣ በሬ!" },
  category: "English",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#8A5A3A",
  scene: "lib-move-ox-move",
  coverPage: 2,
  teaches: { words: ["n", "o", "p", "nest", "nose", "ox", "on", "off", "pot", "path", "please"] },
  pages: [
    {
      en: 'Tsehay and Anbessa carried a clay pot of fresh milk to Grandma\'s house. "Let\'s play the sound game!" buzzed Lali. "‘p’, ‘p’, pot! ‘p’, ‘p’, path!"',
      am: 'ፀሐይና አንበሳ የሸክላ ማሰሮ ሙሉ ትኩስ ወተት ይዘው ወደ አያቴ ቤት ሄዱ። «የድምፅ ጨዋታ እንጫወት!» አለች ላሊ። «‘p’፣ ‘p’፣ pot (ማሰሮ)! ‘p’፣ ‘p’፣ path (መንገድ)!»',
    },
    {
      en: 'Round the corner, they stopped. A huge ox was lying right ON the path, chewing and chewing. "‘o’, ‘o’, OX!" said Tsehay.',
      am: 'ከመታጠፊያው ሲያልፉ ቆሙ። አንድ ግዙፍ በሬ ልክ መንገዱ ላይ (ON the path) ተኝቶ እያመሰኳ ነበር። «‘o’፣ ‘o’፣ OX!» አለች ፀሐይ።',
    },
    {
      en: '"Move, Ox, move! Please move off the path!" called Anbessa. The ox chewed and blinked. He didn\'t move one bit.',
      am: '«Move, Ox, move! Please move off the path!» (ተነሣ፣ በሬ! እባክህ ከመንገዱ ውረድ!) ብሎ ጠራ አንበሳ። በሬው እያመሰኳ ዓይኑን አርገበገበ። ትንሽ እንኳ አልተንቀሳቀሰም።',
    },
    {
      en: 'The ox puffed through his big wet nose. Nnnff! "‘n’, ‘n’, NOSE!" giggled Tsehay. But still the ox didn\'t move. Move, Ox, move! Please move off the path!',
      am: 'በሬው በትልቅ ርጥብ አፍንጫው ተነፈሰ። ንንፍ! «‘n’፣ ‘n’፣ NOSE!» ብላ ሳቀች ፀሐይ። በሬው ግን አሁንም አልተነሣም። Move, Ox, move! Please move off the path!',
    },
    {
      en: 'Gugu came skipping by. "I\'ll push him!" Push, push, PUSH! Gugu went red in the face. The ox stayed still, like a big brown rock.',
      am: 'ጉጉ እየዘለለ መጣ። «እኔ እገፋዋለሁ!» ግፋ፣ ግፋ፣ ግፋ! የጉጉ ፊት ቀላ። በሬው ግን እንደ ትልቅ ቡናማ ድንጋይ ዝም ብሎ ቀረ።',
    },
    {
      en: 'Tsehay sat down on a stone. "We\'ll never get to Grandma\'s," she sighed. "And the milk will get warm in the sun."',
      am: 'ፀሐይ ድንጋይ ላይ ተቀመጠች። «ወደ አያቴ ቤት በጭራሽ አንደርስም» ብላ ተነፈሰች። «ወተቱም በፀሐይ ይሞቃል።»',
    },
    {
      en: "But Anbessa was looking closely. The ox wasn't looking at them at all. He kept looking down, very gently, at something by his nose.",
      am: "አንበሳ ግን በጥንቃቄ እየተመለከተ ነበር። በሬው እነሱን ጭራሽ አይመለከትም ነበር። በአፍንጫው አጠገብ ያለን አንድ ነገር በጣም በእርጋታ ወደ ታች ይመለከት ነበር።",
    },
    {
      en: 'Anbessa tiptoed closer. There in the grass, right under the ox\'s nose, was a little nest with three blue eggs. "‘n’, ‘n’, NEST!" he whispered.',
      am: 'አንበሳ ቀስ ብሎ ተጠጋ። እዚያ በሣሩ ውስጥ፣ ልክ ከበሬው አፍንጫ ሥር፣ ሦስት ሰማያዊ እንቁላሎች ያሉበት ትንሽ የወፍ ጎጆ ነበረ። «‘n’፣ ‘n’፣ NEST!» አለ በሹክሹክታ።',
    },
    {
      en: '"The ox isn\'t being stubborn," said Anbessa. "He\'s keeping the nest safe from our feet!" Up in the acacia, a mother bird went cheep, cheep.',
      am: '«በሬው ግትር አይደለም» አለ አንበሳ። «ጎጆውን ከእግራችን እየጠበቀ ነው!» ከግራሩ ዛፍ ላይ እናት ወፍ ቺፕ፣ ቺፕ አለች።',
    },
    {
      en: '"We don\'t need the ox to move," said Anbessa. "We can go around! ‘p’, ‘p’, a new path!" Carefully, carefully, they stepped off the path and around.',
      am: '«በሬው እንዲነሣ አያስፈልገንም» አለ አንበሳ። «መዞር እንችላለን! ‘p’፣ ‘p’፣ አዲስ path!» በጥንቃቄ፣ በጥንቃቄ ከመንገዱ ወጥተው ዞሩ።',
    },
    {
      en: 'The ox lowed softly, "Mooo," as if to say thank you. And the mother bird flew down to sit on her eggs.',
      am: 'በሬው «ሙው» ብሎ በለስላሳ ድምፅ ጮኸ፤ «አመሰግናለሁ» እንደማለት። እናት ወፏም እንቁላሎቿ ላይ ለመቀመጥ ወረደች።',
    },
    {
      en: 'At Grandma\'s, they told her everything. "‘p’ for pot, ‘o’ for ox, ‘n’ for nest!" Grandma laughed. "And thank you for the milk!" What starts with ‘n’, ‘o’ or ‘p’, {name}?',
      am: 'አያቴ ቤት ሲደርሱ ሁሉንም ነገሯት። «‘p’ ለ pot፣ ‘o’ ለ ox፣ ‘n’ ለ nest!» አያቴ ሳቀች። «ስለ ወተቱም አመሰግናለሁ!» {name}፣ በ‘n’፣ ‘o’ ወይም ‘p’ የሚጀምር ምን አለ?',
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why wouldn't the ox move? How did Anbessa find out?", "What could you find on a walk for ‘n’, ‘o’ and ‘p’?"],
      am: ["በሬው ለምን አልተነሣም? አንበሳ እንዴት አወቀ?", "በእግር ጉዞ ላይ ለ‘n’፣ ‘o’ እና ‘p’ ምን ማግኘት ትችላላችሁ?"],
    },
    activity: {
      en: 'Go on a short sound walk and play Lali\'s game: say a sound, then find something that starts with it. The sounds: ‘n’ as in nest (like ን), ‘o’ as in ox and on (short, mouth round and open, a little like ኦ), ‘p’ as in pot (like ፕ, with a little puff of air).',
      am: 'አጭር የድምፅ የእግር ጉዞ አድርጉና የላሊን ጨዋታ ተጫወቱ፦ አንድ ድምፅ በሉ፣ ከዚያ በዚያ ድምፅ የሚጀምር ነገር ፈልጉ። ድምፆቹ፦ ‘n’ እንደ nest (እንደ ን)፣ ‘o’ እንደ ox እና on (አጭር፣ አፍ ክብ ሆኖ ተከፍቶ፣ ትንሽ እንደ ኦ)፣ ‘p’ እንደ pot (እንደ ፕ፣ በትንሽ ትንፋሽ)።',
    },
  },
};

export default story;
