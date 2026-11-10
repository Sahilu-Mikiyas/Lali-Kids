import type { Story } from "../../../stories";

/*
  "Where Is Dimmet?" (level 3: reading a little story; who, what and where questions).
  A little mystery for the child to read with help. Dimmet the cat is not on her step. Anbessa
  asks who saw her (Gugu: "Not me. I saw a bird."; Haben: "Yes! She went into the house, with
  something little and gray in her mouth."), becomes a cat detective, and follows the clues:
  little paw prints in Grandma's spilled flour, past the table, past the pot, to Grandma's bed.
  "Mew, mew, mew!" Dimmet has three kittens. Grandma brings a basket and a soft blanket.
  Join-in line: "Who? What? Where? Look for a clue!"

  English taught: asking and answering who, what and where; describing words (little, gray,
  white, black); reading short sentences and following a story's clues.

  In Amharic the English sentences stay as they are, followed by a translation in brackets.
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially «የድመት
  መርማሪ» for cat detective.
*/
const story: Story = {
  id: "where-is-dimmet",
  course: "english-readers",
  pack: "story",
  title: { en: "Where Is Dimmet?", am: "Where Is Dimmet? ድመቷ የት ናት?" },
  category: "English",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#6A6A9E",
  scene: "lib-where-is-dimmet",
  coverPage: 8,
  teaches: { words: ["who", "what", "where", "little", "gray", "white", "black", "under", "past"] },
  pages: [
    {
      en: "This is Dimmet. Dimmet is a gray cat. She lives with Anbessa and Grandma. Every day she sleeps on the step, in the sun.",
      am: "This is Dimmet. Dimmet is a gray cat. She lives with Anbessa and Grandma. Every day she sleeps on the step, in the sun. (ይህች ዲሜት ናት። ዲሜት ግራጫ ድመት ናት። ከአንበሳና ከአያቴ ጋር ትኖራለች። በየቀኑ በደረጃው ላይ በፀሐይ ትተኛለች።)",
    },
    {
      en: "But today the step is empty. Where is Dimmet? Anbessa looks in the yard. He looks up in the tree. She is not there.",
      am: "But today the step is empty. Where is Dimmet? Anbessa looks in the yard. He looks up in the tree. She is not there. (ዛሬ ግን ደረጃው ባዶ ነው። ዲሜት የት ናት? አንበሳ ግቢውን ተመለከተ። ዛፉ ላይ ቀና ብሎ ተመለከተ። እዚያ የለችም።)",
    },
    {
      en: "Anbessa asks Gugu, \"Who saw Dimmet?\" Gugu says, \"Not me. I saw a bird.\" Who? What? Where? Look for a clue!",
      am: "Anbessa asks Gugu, \"Who saw Dimmet?\" Gugu says, \"Not me. I saw a bird.\" Who? What? Where? Look for a clue! (አንበሳ ጉጉን «ዲሜትን ማን አያት?» ብሎ ጠየቀው። ጉጉ «እኔ አይደለሁም። እኔ ያየሁት ወፍ ነው» አለ። ማን? ምን? የት? ፍንጭ ፈልግ!)",
    },
    {
      en: "Anbessa asks Haben, \"Did you see Dimmet?\" Haben says, \"Yes! She went into the house. She had something in her mouth.\" \"What was it?\" \"It was little and gray.\"",
      am: "Anbessa asks Haben, \"Did you see Dimmet?\" Haben says, \"Yes! She went into the house. She had something in her mouth.\" \"What was it?\" \"It was little and gray.\" (አንበሳ ሐበንን «ዲሜትን አየሻት?» ብሎ ጠየቃት። ሐበን «አዎ! ወደ ቤቱ ገባች። በአፏ አንድ ነገር ይዛ ነበር» አለች። «ምን ነበር?» «ትንሽና ግራጫ ነበር።»)",
    },
    {
      en: "Now Anbessa is a cat detective. He looks for clues. What can he see? Grandma's flour is on the floor. And in the flour are little paw prints!",
      am: "Now Anbessa is a cat detective. He looks for clues. What can he see? Grandma's flour is on the floor. And in the flour are little paw prints! (አሁን አንበሳ የድመት መርማሪ ነው። ፍንጭ ይፈልጋል። ምን ማየት ይችላል? የአያቴ ዱቄት መሬቱ ላይ ፈሷል። በዱቄቱ ውስጥ ደግሞ ትንንሽ የእግር ዱካዎች አሉ!)",
    },
    {
      en: "Where do the paw prints go? They go past the table. They go past the big pot. They go to Grandma's bed. Who? What? Where? Look for a clue!",
      am: "Where do the paw prints go? They go past the table. They go past the big pot. They go to Grandma's bed. Who? What? Where? Look for a clue! (የእግር ዱካዎቹ ወዴት ይሄዳሉ? ከጠረጴዛው አጠገብ ያልፋሉ። ከትልቁ ድስት አጠገብ ያልፋሉ። ወደ አያቴ አልጋ ይሄዳሉ። ማን? ምን? የት? ፍንጭ ፈልግ!)",
    },
    {
      en: "Anbessa looks under the bed. It is dark. He can't see. But he can hear something. \"Mew, mew, mew!\"",
      am: "Anbessa looks under the bed. It is dark. He can't see. But he can hear something. \"Mew, mew, mew!\" (አንበሳ ከአልጋው ሥር ተመለከተ። ጨለማ ነው። ማየት አይችልም። ግን አንድ ነገር መስማት ይችላል። «ሚው፣ ሚው፣ ሚው!»)",
    },
    {
      en: "Who is under the bed? It is Dimmet! And she is not on her own.",
      am: "Who is under the bed? It is Dimmet! And she is not on her own. (ከአልጋው ሥር ማን አለ? ዲሜት ናት! ብቻዋንም አይደለችም።)",
    },
    {
      en: "Dimmet has three little kittens! One is gray. One is white. One is black and white. The gray one is the little thing in Dimmet's mouth!",
      am: "Dimmet has three little kittens! One is gray. One is white. One is black and white. The gray one is the little thing in Dimmet's mouth! (ዲሜት ሦስት ትንንሽ ግልገሎች አሏት! አንዱ ግራጫ ነው። አንዱ ነጭ ነው። አንዱ ጥቁርና ነጭ ነው። ግራጫው ዲሜት በአፏ ይዛው የነበረው ትንሽ ነገር ነው!)",
    },
    {
      en: "Grandma comes in. \"What is it, Anbessa?\" \"Shh, Grandma! Look under the bed. Dimmet has kittens!\" Grandma looks. \"Oh my!\" she says.",
      am: "Grandma comes in. \"What is it, Anbessa?\" \"Shh, Grandma! Look under the bed. Dimmet has kittens!\" Grandma looks. \"Oh my!\" she says. (አያቴ ገባች። «ምንድን ነው አንበሳ?» «ሽሽ፣ አያቴ! ከአልጋው ሥር ተመልከቺ። ዲሜት ግልገሎች ወልዳለች!» አያቴ ተመለከተች። «ውይ!» አለች።)",
    },
    {
      en: "Grandma gets a big basket and a soft blanket. Now Dimmet and her kittens have a warm bed. Dimmet purrs. Anbessa smiles. The cat detective did it!",
      am: "Grandma gets a big basket and a soft blanket. Now Dimmet and her kittens have a warm bed. Dimmet purrs. Anbessa smiles. The cat detective did it! (አያቴ ትልቅ ቅርጫትና ለስላሳ ብርድ ልብስ አመጣች። አሁን ዲሜትና ግልገሎቿ ሞቃት አልጋ አላቸው። ዲሜት ታንኮራፋለች። አንበሳ ፈገግ አለ። የድመት መርማሪው ተሳካለት!)",
    },
    {
      en: "Who was missing? What did Anbessa see on the floor? Where was Dimmet? Who? What? Where? Can you give the kittens names, {name}?",
      am: "Who was missing? What did Anbessa see on the floor? Where was Dimmet? (የጠፋው ማን ነበር? አንበሳ መሬቱ ላይ ምን አየ? ዲሜት የት ነበረች?) Who? What? Where? {name}፣ ለግልገሎቹ ስም ማውጣት ትችላላችሁ?",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["What clues helped Anbessa find Dimmet?", "Why do you think Dimmet hid under the bed?"],
      am: ["አንበሳ ዲሜትን እንዲያገኝ የረዱት ፍንጮች የትኞቹ ናቸው?", "ዲሜት ከአልጋው ሥር የተደበቀችው ለምን ይመስላችኋል?"],
    },
    activity: {
      en: 'Play "Who? What? Where?" with any story you read: after a page, ask one question of each kind ("Who is this?", "What is she holding?", "Where are they?") and let your child find the answer in the picture or the words. Then let your child ask you. Hide a toy and leave little clues for a cat-detective hunt.',
      am: 'በምታነቡት በማንኛውም ታሪክ «Who? What? Where?» (ማን? ምን? የት?) ተጫወቱ፦ ከአንድ ገጽ በኋላ ከእያንዳንዱ ዓይነት አንድ ጥያቄ ጠይቁ («Who is this?» ይህ ማን ነው?፣ «What is she holding?» ምን ይዛለች?፣ «Where are they?» የት ናቸው?)፤ ልጅዎ መልሱን በሥዕሉ ወይም በቃላቱ ውስጥ ያግኝ። ከዚያ ልጅዎ እርስዎን ይጠይቅ። አሻንጉሊት ደብቃችሁ ለ«ድመት መርማሪ» ፍለጋ ትንንሽ ፍንጮችን ተዉ።',
    },
  },
};

export default story;
