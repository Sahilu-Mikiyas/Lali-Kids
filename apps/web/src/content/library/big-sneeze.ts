import type { Story } from "../stories";

/*
  "Gugu's Big Sneeze": a tickly flower, a building "Ah… ah… AH…", and three sneezes that blow
  Anbessa's hat onto a goat, the leaves off the tree and Grandma's netela into the sky, and a
  weaver bird's nest onto Anbessa's head. Gugu says sorry and puts everything back, and the
  next sneeze goes into his elbow: the tiniest sneeze in the world.
  The repeated line to join in on: "Ah… ah… AH-CHOO!"
  Grandma's "Bless you!" is «ይማርህ!» in Amharic, which is what Ethiopian families say.
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the sneeze sound «አፕቺው» (is there a more natural spelling?), the chick sound «ጺው» and
  «ክርኑ ውስጥ አስነጠሰ» for sneezing into his elbow.
*/
const story: Story = {
  id: "big-sneeze",
  pack: "story",
  title: { en: "Gugu's Big Sneeze", am: "የጉጉ ትልቅ ማስነጠስ" },
  category: "Values",
  ageBands: ["3-5"],
  isFree: true,
  color: "#E2703A",
  scene: "lib-big-sneeze",
  coverPage: 3,
  teaches: { words: ["sneeze", "tickle", "hat", "nest", "leaves", "sorry"] },
  pages: [
    {
      en: "One sunny morning, Gugu the gelada went skipping through the village. Hop, skip, hop! He stopped to smell a big yellow flower. Sniff, sniff…",
      am: "በአንድ ፀሐያማ ጠዋት ጭላዳው ጉጉ በመንደሩ ውስጥ እየዘለለ ይሄድ ነበር። ዘለል፣ ዘለል! አንድ ትልቅ ቢጫ አበባ ለማሽተት ቆመ። ሽት፣ ሽት…",
    },
    {
      en: 'The flower tickled his nose. Tickle, tickle! Gugu\'s eyes went squinty. His nose went wiggly. "Ah… ah…"',
      am: "አበባው አፍንጫውን ኮረኮረው። ኩር፣ ኩር! የጉጉ ዓይኖች ተጨናበሱ። አፍንጫው ተንቀጠቀጠ። «አ… አ…»",
    },
    {
      en: '"Ah… ah… AH…" Lali zoomed over. "Oh no! Everybody, hold on to your hats!" Anbessa grabbed his hat. Grandma grabbed her netela.',
      am: "«አ… አ… አ…» ላሊ በፍጥነት በረረች። «ወይኔ! ሁላችሁም ኮፍያችሁን ያዙ!» አንበሳ ኮፍያውን ያዘ። አያትም ነጠላዋን ያዘች።",
    },
    {
      en: 'Ah… ah… AH-CHOO! WHOOSH! Anbessa\'s hat flew up, up, up… and landed right on top of a goat! "Meh-eh-eh!" said the goat.',
      am: "አ… አ… አፕቺው! ሹው! የአንበሳ ኮፍያ ወደ ላይ፣ ወደ ላይ፣ ወደ ላይ በረረ… እና ልክ በአንዲት ፍየል ራስ ላይ አረፈ! «ሜ-ኤ-ኤ!» አለች ፍየሏ።",
    },
    {
      en: "Ah… ah… AH-CHOO! WHOOSH! The leaves flew off the tree. And Grandma's netela flew away too, flapping like a big white bird!",
      am: "አ… አ… አፕቺው! ሹው! ቅጠሎቹ ከዛፉ ላይ በረሩ። የአያት ነጠላም እንደ ትልቅ ነጭ ወፍ እየተርገበገበ በረረ!",
    },
    {
      en: 'Ah… ah… AH-CHOO! The little bird\'s nest tumbled off its branch and landed, plop, on Anbessa\'s head. "Peep, peep!" said the baby birds.',
      am: "አ… አ… አፕቺው! የትንሿ ወፍ ጎጆ ከቅርንጫፉ ላይ ተንከባሎ ዱብ! ብሎ በአንበሳ ራስ ላይ አረፈ። «ጺው፣ ጺው!» አሉ ጫጩቶቹ።",
    },
    {
      en: 'At last the sneezing stopped. Gugu looked around. A hat on a goat! Leaves everywhere! A nest on Anbessa! "Oh dear," he whispered.',
      am: "በመጨረሻ ማስነጠሱ ቆመ። ጉጉ ዙሪያውን ተመለከተ። ኮፍያ በፍየል ላይ! ቅጠሎች በየቦታው! ጎጆ በአንበሳ ራስ ላይ! «ወይ ጉዴ!» አለ በሹክሹክታ።",
    },
    {
      en: '"I\'m sorry, everyone," said Gugu. "That was a big sneeze. But I can be a big helper too! Let\'s put everything back."',
      am: "«ሁላችሁም ይቅርታ» አለ ጉጉ። «ትልቅ ማስነጠስ ነበር። ግን ትልቅ ረዳትም መሆን እችላለሁ! ሁሉንም ነገር ወደ ቦታው እንመልስ።»",
    },
    {
      en: 'First, the baby birds. Gugu lifted the nest off Anbessa\'s head, very gently, and put it back on its branch. "Tweet, tweet! Thank you!"',
      am: "መጀመሪያ ጫጩቶቹ። ጉጉ ጎጆውን ከአንበሳ ራስ ላይ በጥንቃቄ አነሳው፤ ወደ ቅርንጫፉም መለሰው። «ጺው፣ ጺው! አመሰግናለሁ!»",
    },
    {
      en: 'Next, the hat. "Excuse me, Goat, may I have that back, please?" "Meh-eh-eh!" said the goat, and the hat went back on Anbessa\'s head.',
      am: "ቀጥሎ ኮፍያው። «ይቅርታ ፍየል፣ እባክሽ ኮፍያውን ትመልሺልኛለሽ?» «ሜ-ኤ-ኤ!» አለች ፍየሏ፤ ኮፍያውም ወደ አንበሳ ራስ ተመለሰ።",
    },
    {
      en: "Then the leaves. Swish, swish! Gugu swept them into one big pile. And he wrapped Grandma's netela back round her shoulders.",
      am: "ከዚያ ቅጠሎቹ። ሽው፣ ሽው! ጉጉ ጠራርጎ አንድ ትልቅ ክምር አደረጋቸው። የአያትንም ነጠላ መልሶ በትከሻዋ ላይ አለበሳት።",
    },
    {
      en: 'Everything was back in its place. Then… Gugu\'s nose began to wiggle again. "Ah… ah… AH…" Everybody held on tight!',
      am: "ሁሉም ነገር ወደ ቦታው ተመለሰ። ከዚያ… የጉጉ አፍንጫ እንደገና መንቀጥቀጥ ጀመረ። «አ… አ… አ…» ሁሉም አጥብቀው ያዙ!",
    },
    {
      en: 'This time Gugu sneezed into his elbow. "…choo!" Just one tiny leaf wobbled. "Bless you!" said Grandma, and everyone laughed and laughed.',
      am: "በዚህ ጊዜ ጉጉ ክርኑ ውስጥ አስነጠሰ። «…ፕቺው!» አንዲት ትንሽ ቅጠል ብቻ ተንቀጠቀጠች። «ይማርህ!» አለች አያት፤ ሁሉም ሳቁ፣ ሳቁ።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Gugu's sneeze made a big mess, but he didn't mean to. What did he do to make things better?",
        "What can we do when we feel a sneeze coming? Can you show me?",
      ],
      am: [
        "የጉጉ ማስነጠስ ብዙ ነገር አመሰቃቀለ፤ ግን ሆን ብሎ አልነበረም። ነገሮችን ለማስተካከል ምን አደረገ?",
        "ማስነጠስ ሲመጣብን ምን ማድረግ እንችላለን? ልታሳዩኝ ትችላላችሁ?",
      ],
    },
    activity: {
      en: 'Cut out some little paper leaves. Take turns giving a big pretend "Ah… ah… AH-CHOO!" to blow them across the table, then a tiny "…choo!" into your elbow. Which one moves the leaves? Then put every leaf back together.',
      am: "ትናንሽ የወረቀት ቅጠሎችን ቁረጡ። በየተራ ትልቅ የይስሙላ «አ… አ… አፕቺው!» እያላችሁ ቅጠሎቹን በጠረጴዛው ላይ እፍ በሉ፤ ከዚያ ክርናችሁ ውስጥ ትንሽ «…ፕቺው!» በሉ። ቅጠሎቹን የሚያንቀሳቅሰው የትኛው ነው? በመጨረሻ ሁሉንም ቅጠሎች አብራችሁ ወደ ቦታቸው መልሱ።",
    },
  },
};

export default story;
