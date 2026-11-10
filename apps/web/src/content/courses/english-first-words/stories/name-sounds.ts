import type { Story } from "../../../stories";

/*
  "Names Have Sounds" (level 3: letter names and letter sounds, big and little letters).
  Teacher Meron shows letter cards: every name starts with a letter, and every letter makes a
  sound. A says "a" (Anbessa, Ayan), H says "h" (Hawi, Haben), L says "l" (Lali), M says "mmm"
  (Meron). Then G: Gugu shouts the letter's NAME, "Gee!", and gets "Jugu", which isn't his name
  at all. "G is broken!" Anbessa works it out: A's name is "ay" but it says "a" in his name, so
  letters must have a name AND a sound. G's name is "gee"; G's sound is "g", like a little gulp.
  "g, g, GUGU!" The name cards go up on the tree, and the name-sound game goes all the way home.
  Join-in line: "Listen to the sound at the start!"

  English taught: the letters A, G, H, L, M (capital and small), their sounds, and the idea that a
  letter has a name and a sound. Sounds are written in quotes ("a", "g"): the short sound, not the
  letter's name. Notes for parents on each sound are in the grown-ups card.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «በመጀመሪያ ያለውን ድምፅ አዳምጡ!» and how the letter names are written in Ethiopic
  («ኤይ» for A, «ጂ» for G), and the comparisons with ግ፣ ህ፣ ል፣ ም in the grown-ups card.
*/
const story: Story = {
  id: "name-sounds",
  course: "english-first-words",
  pack: "story",
  title: { en: "Names Have Sounds", am: "ስሞች ድምፅ አላቸው" },
  category: "English",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#E8513B",
  scene: "lib-name-sounds",
  coverPage: 9,
  teaches: { words: ["A", "G", "H", "L", "M", "letter", "sound", "name"] },
  pages: [
    {
      en: 'Teacher Meron held up cards with big letters on them. "Every name starts with a letter," she said, "and every letter makes a sound. Listen to the sound at the start!"',
      am: "መምህርት መሮን ትልልቅ ፊደሎች የተጻፉባቸውን ካርዶች ከፍ አድርጋ አሳየች። «እያንዳንዱ ስም በአንድ ፊደል ይጀምራል» አለች፤ «እያንዳንዱ ፊደል ደግሞ ድምፅ አለው። በመጀመሪያ ያለውን ድምፅ አዳምጡ!»",
    },
    {
      en: '"This is A: big A, and little a. A says "a"… "a", "a", Anbessa!" "That\'s me!" said Anbessa. "Mine too!" said Ayan. "a", "a", Ayan! Listen to the sound at the start!',
      am: '«ይህ A ነው፤ ትልቁ A እና ትንሹ a። A የሚለው "a" ነው… "a"፣ "a"፣ Anbessa!» «እኔ ነኝ!» አለ አንበሳ። «የእኔም!» አለች አያን። "a"፣ "a"፣ Ayan! በመጀመሪያ ያለውን ድምፅ አዳምጡ!',
    },
    {
      en: '"This is H: big H, and little h. H says "h", like a little puff of breath on a cold morning. "h", "h", Hawi! "h", "h", Haben!" Hawi and Haben did a high five.',
      am: '«ይህ H ነው፤ ትልቁ H እና ትንሹ h። H የሚለው "h" ነው፤ በብርድ ጠዋት እንደምንተነፍሰው ትንሽ ትንፋሽ። "h"፣ "h"፣ Hawi! "h"፣ "h"፣ Haben!» ሀዊና ሐበን እጅ ለእጅ አጨበጨቡ።',
    },
    {
      en: '"This is L: big L, and little l. L says "l", with your tongue up behind your teeth. "l", "l", Lali!" Lali buzzed a happy loop-the-loop.',
      am: '«ይህ L ነው፤ ትልቁ L እና ትንሹ l። L የሚለው "l" ነው፤ ምላሳችሁን ከጥርሳችሁ ጀርባ ከፍ አድርጋችሁ። "l"፣ "l"፣ Lali!» ላሊ በደስታ ዙሪያዋን በረረች።',
    },
    {
      en: '"This is M: big M, and little m. M says "mmm", like when food is yummy. "m", "m", Meron! That\'s my name," said Teacher Meron. Listen to the sound at the start!',
      am: '«ይህ M ነው፤ ትልቁ M እና ትንሹ m። M የሚለው "mmm" ነው፤ ምግብ ሲጣፍጥ እንደምንለው። "m"፣ "m"፣ Meron! ይህ የእኔ ስም ነው» አለች መምህርት መሮን። በመጀመሪያ ያለውን ድምፅ አዳምጡ!',
    },
    {
      en: 'Then she held up one more card. Gugu jumped up. "That\'s G! G says GEE! Gee, gee… JUGU!" Everyone laughed. "Jugu?" said Gugu. "That\'s not my name!"',
      am: "ከዚያ አንድ ተጨማሪ ካርድ አሳየች። ጉጉ ዘሎ ተነሣ። «ይህ G ነው! G «ጂ» ይላል! ጂ፣ ጂ… ጁጉ!» ሁሉም ሳቁ። «ጁጉ?» አለ ጉጉ። «ይህ ስሜ አይደለም!»",
    },
    {
      en: 'Gugu sat down with a bump. His face went all crumpled. "My name isn\'t Jugu," he grumbled. "G must be broken!"',
      am: "ጉጉ ዱብ ብሎ ተቀመጠ። ፊቱ ተጨማደደ። «ስሜ ጁጉ አይደለም» ብሎ አጉረመረመ። «G ተበላሽቷል መሰለኝ!»",
    },
    {
      en: 'Anbessa thought about it. "A\'s name is "ay", but in my name it says "a". Maybe G is the same! Maybe every letter has a name AND a sound!"',
      am: 'አንበሳ አሰበበት። «የA ስም "ኤይ" ነው፤ በስሜ ውስጥ ግን "a" ይላል። ምናልባት G ም እንደዚያ ነው! ምናልባት እያንዳንዱ ፊደል ስምም ድምፅም አለው!»',
    },
    {
      en: 'Teacher Meron smiled. "Clever thinking, Anbessa! G\'s NAME is "gee". But G\'s SOUND is "g", like a little gulp in your throat: "g", "g", "g"."',
      am: 'መምህርት መሮን ፈገግ አለች። «ጎበዝ አስተሳሰብ ነው፣ አንበሳ! የG ስም "ጂ" ነው። የG ድምፅ ግን "g" ነው፤ በጉሮሮ ውስጥ እንደ ትንሽ ጉርጭ፦ "g"፣ "g"፣ "g"።»',
    },
    {
      en: 'Gugu tried it. "g", "g"… "GUGU!" He grinned and did a somersault. "G for Gugu! G for goat! G for gelada!" Listen to the sound at the start!',
      am: 'ጉጉ ሞከረው። "g"፣ "g"… «GUGU!» ፈገግ ብሎ ተገለባብጦ ዘለለ። «G for Gugu! G for goat! G for gelada!» በመጀመሪያ ያለውን ድምፅ አዳምጡ!',
    },
    {
      en: "Then everyone stuck their name cards on the big warka tree: Anbessa, Ayan, Gugu, Hawi, Haben, Lali and Meron. Big letters at the start, little letters after.",
      am: "ከዚያ ሁሉም የስም ካርዶቻቸውን በትልቁ የዋርካ ዛፍ ላይ ለጠፉ፦ Anbessa፣ Ayan፣ Gugu፣ Hawi፣ Haben፣ Lali እና Meron። በመጀመሪያ ትልቅ ፊደል፣ ከዚያ ትንንሽ ፊደሎች።",
    },
    {
      en: 'They played the name-sound game all the way home. "a", Anbessa! "g", Gugu! "h", Hawi! "l", Lali! "m", Meron! What sound does YOUR name start with, {name}?',
      am: 'ወደ ቤት እስኪደርሱ ድረስ የስም-ድምፅ ጨዋታውን ተጫወቱ። "a"፣ Anbessa! "g"፣ Gugu! "h"፣ Hawi! "l"፣ Lali! "m"፣ Meron! {name}፣ የእናንተ ስም በምን ድምፅ ይጀምራል?',
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why did Gugu say \"Jugu\"? What did Anbessa work out about letters?",
        "What sound does your name start with? Who else in our family starts with the same sound?",
      ],
      am: [
        "ጉጉ ለምን «ጁጉ» አለ? አንበሳ ስለ ፊደሎች ምን ደረሰበት?",
        "የእናንተ ስም በምን ድምፅ ይጀምራል? በቤተሰባችን ውስጥ በዚያው ድምፅ የሚጀምር ሌላ ማን አለ?",
      ],
    },
    activity: {
      en: 'Every English letter has a name (A is "ay", G is "gee") and a sound. For reading, the sound matters most. The sounds in this story: "a" as in ant (short, mouth open wide); "g" as in goat (always hard, like ግ, never "j" here); "h" as in hat (just a breath, like ህ); "l" as in lion (like ል); "m" as in moon (lips closed, like ም). Write your child\'s name with a big first letter and play the name-sound game with family names.',
      am: 'እያንዳንዱ የእንግሊዝኛ ፊደል ስም (A «ኤይ»፣ G «ጂ») እና ድምፅ አለው። ለማንበብ ዋናው ድምፁ ነው። በዚህ ታሪክ ያሉት ድምፆች፦ "a" ልክ እንደ ant (አጭር፣ አፍ በሰፊው ተከፍቶ)፤ "g" ልክ እንደ goat (እዚህ ሁልጊዜ እንደ ግ ጠንካራ ነው፤ «ጅ» አይደለም)፤ "h" ልክ እንደ hat (ትንፋሽ ብቻ፣ እንደ ህ)፤ "l" ልክ እንደ lion (እንደ ል)፤ "m" ልክ እንደ moon (ከንፈር ተዘግቶ፣ እንደ ም)። የልጃችሁን ስም በትልቅ የመጀመሪያ ፊደል ጻፉና በቤተሰብ ስሞች የስም-ድምፅ ጨዋታ ተጫወቱ።',
    },
  },
};

export default story;
