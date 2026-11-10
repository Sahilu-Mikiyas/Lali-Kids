import type { Story } from "../../../stories";

/*
  "The Kite in the Tree" (level 3: reading a little story; describing words tall, short, long,
  little, big, colors; -ing).
  A little story for the child to read with help. Gugu's new red and yellow kite, with a long tail,
  flies high, until the wind blows it into the big tree. Anbessa jumps, but he is little. Hawi's
  stick is short. Haben climbs a rock, but the rock is not tall. Gugu thinks and thinks: who is
  tall, the tallest of all? Ayan, with her long neck! She stretches up, up, up and gets it down.
  Then everyone flies the kite together.
  Join-in line: "Up, up, up!"

  English taught: describing words (tall, tallest, short, long, little, big, red, yellow) and the
  -ing words of a story happening now (blowing, flying, running, laughing); reading short
  sentences and answering who and what questions.

  In Amharic the English sentences stay as they are, followed by a translation in brackets.
  AMHARIC: first draft, to be checked by a native-speaking editor before launch.
*/
const story: Story = {
  id: "kite-in-the-tree",
  course: "english-readers",
  pack: "story",
  title: { en: "The Kite in the Tree", am: "The Kite in the Tree፦ ዛፉ ላይ የቀረው ካይት" },
  category: "English",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#E8413B",
  scene: "lib-kite-in-the-tree",
  coverPage: 8,
  teaches: { words: ["tall", "tallest", "short", "long", "little", "big", "red", "yellow", "flying", "blowing"] },
  pages: [
    {
      en: "Gugu has a new kite. It is red and yellow. It has a long tail with bows on it. Gugu is so happy!",
      am: "Gugu has a new kite. It is red and yellow. It has a long tail with bows on it. Gugu is so happy! (ጉጉ አዲስ ካይት አለው። ቀይና ቢጫ ነው። ሪባን ያለበት ረጅም ጭራ አለው። ጉጉ በጣም ተደስቷል!)",
    },
    {
      en: "The wind is blowing. Gugu is running. Up goes the kite! It is flying high in the sky. \"Look at my kite!\" says Gugu. Up, up, up!",
      am: "The wind is blowing. Gugu is running. Up goes the kite! It is flying high in the sky. \"Look at my kite!\" says Gugu. Up, up, up! (ነፋሱ እየነፈሰ ነው። ጉጉ እየሮጠ ነው። ካይቱ ወደ ላይ ወጣ! በሰማይ ላይ ከፍ ብሎ እየበረረ ነው። «ካይቴን ተመልከቱ!» አለ ጉጉ። ወደ ላይ፣ ወደ ላይ፣ ወደ ላይ!)",
    },
    {
      en: "Then the wind blows hard. Whoosh! Oh no! The kite is stuck in the big tree. It is up at the top. Gugu is sad.",
      am: "Then the wind blows hard. Whoosh! Oh no! The kite is stuck in the big tree. It is up at the top. Gugu is sad. (ከዚያ ነፋሱ በኃይል ነፈሰ። ሹው! ወይኔ! ካይቱ ትልቁ ዛፍ ላይ ተያዘ። ከላይ ጫፉ ላይ ነው። ጉጉ አዘነ።)",
    },
    {
      en: "Anbessa jumps. He jumps and jumps. But Anbessa is little. He can't get the kite.",
      am: "Anbessa jumps. He jumps and jumps. But Anbessa is little. He can't get the kite. (አንበሳ ዘለለ። ዘለለ፣ ዘለለ። ግን አንበሳ ትንሽ ነው። ካይቱን ማውረድ አይችልም።)",
    },
    {
      en: "Hawi gets a stick. She pokes and pokes. But the stick is short. She can't get the kite.",
      am: "Hawi gets a stick. She pokes and pokes. But the stick is short. She can't get the kite. (ሀዊ ዱላ አመጣች። ደጋግማ ወጋችው። ግን ዱላው አጭር ነው። ካይቱን ማውረድ አትችልም።)",
    },
    {
      en: "Haben climbs on a big rock. Haben is good at climbing! But the rock is not tall. She can't get the kite.",
      am: "Haben climbs on a big rock. Haben is good at climbing! But the rock is not tall. She can't get the kite. (ሐበን ትልቅ ድንጋይ ላይ ወጣች። ሐበን መውጣት ትችላለች! ግን ድንጋዩ ረጅም አይደለም። ካይቱን ማውረድ አትችልም።)",
    },
    {
      en: "Gugu sits down. He thinks and thinks. \"Who is tall? Who is the tallest of all?\"",
      am: "Gugu sits down. He thinks and thinks. \"Who is tall? Who is the tallest of all?\" (ጉጉ ተቀመጠ። አሰበ፣ አሰበ። «ረጅሙ ማን ነው? ከሁሉም ረጅሙ ማን ነው?»)",
    },
    {
      en: "\"Ayan! Ayan is tall. She has a long, long neck!\" Gugu runs to get Ayan. \"Ayan, can you help me?\" \"Yes, I can!\"",
      am: "\"Ayan! Ayan is tall. She has a long, long neck!\" Gugu runs to get Ayan. \"Ayan, can you help me?\" \"Yes, I can!\" («አያን! አያን ረጅም ናት። ረጅም፣ ረጅም አንገት አላት!» ጉጉ አያንን ሊጠራ ሮጠ። «አያን፣ ልትረጂኝ ትችያለሽ?» «አዎ፣ እችላለሁ!»)",
    },
    {
      en: "Ayan stands by the tree. She stretches her long neck. Up, up, up! She gets the kite in her mouth, very gently.",
      am: "Ayan stands by the tree. She stretches her long neck. Up, up, up! She gets the kite in her mouth, very gently. (አያን ዛፉ አጠገብ ቆመች። ረጅሙን አንገቷን ዘረጋች። ወደ ላይ፣ ወደ ላይ፣ ወደ ላይ! ካይቱን በጣም በጥንቃቄ በአፏ ያዘችው።)",
    },
    {
      en: "\"Thank you, Ayan!\" says Gugu. \"You are tall, and you are kind.\" Ayan smiles. \"You had a good idea, Gugu!\"",
      am: "\"Thank you, Ayan!\" says Gugu. \"You are tall, and you are kind.\" Ayan smiles. \"You had a good idea, Gugu!\" («አመሰግናለሁ አያን!» አለ ጉጉ። «ረጅምም ደግም ነሽ።» አያን ፈገግ አለች። «ጥሩ ሐሳብ ነበረህ ጉጉ!»)",
    },
    {
      en: "Now the kite is flying again. Gugu and Ayan hold the string together. Everyone is running and laughing. Up, up, up!",
      am: "Now the kite is flying again. Gugu and Ayan hold the string together. Everyone is running and laughing. Up, up, up! (አሁን ካይቱ እንደገና እየበረረ ነው። ጉጉና አያን ገመዱን አብረው ይዘዋል። ሁሉም እየሮጡና እየሳቁ ነው። ወደ ላይ፣ ወደ ላይ፣ ወደ ላይ!)",
    },
    {
      en: "What color is the kite? Who is little? Who is the tallest? Who had the good idea? Who is tall in your family, {name}?",
      am: "What color is the kite? Who is little? Who is the tallest? Who had the good idea? (ካይቱ ምን ዓይነት ቀለም ነው? ትንሹ ማን ነው? ከሁሉም ረጅሙ ማን ነው? ጥሩውን ሐሳብ ያመጣው ማን ነው?) {name}፣ በቤተሰባችሁ ውስጥ ረጅሙ ማን ነው?",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why couldn't Anbessa, Hawi and Haben get the kite?", "Gugu couldn't get the kite himself. How did he still solve the problem?"],
      am: ["አንበሳ፣ ሀዊና ሐበን ካይቱን ለምን ማውረድ አልቻሉም?", "ጉጉ ካይቱን ራሱ ማውረድ አልቻለም። ቢሆንም ችግሩን እንዴት ፈታው?"],
    },
    activity: {
      en: 'Line up some things from the house (spoons, sticks, shoes) and compare them in English: "This one is long. This one is short. This one is the longest!" Then line up the family: who is tall, who is little, who is the tallest? Read the story again and let your child read the "can\'t get the kite" pages, which repeat.',
      am: 'ከቤት አንዳንድ ነገሮችን (ማንኪያዎች፣ ዱላዎች፣ ጫማዎች) ደርድራችሁ በእንግሊዝኛ አወዳድሯቸው፦ «This one is long. This one is short. This one is the longest!» (ይህ ረጅም ነው። ይህ አጭር ነው። ይህ ከሁሉም ረጅሙ ነው!) ከዚያ ቤተሰቡን አሰልፉ፦ ማን ረጅም ነው፣ ማን ትንሽ ነው፣ ከሁሉም ረጅሙ ማን ነው? ታሪኩን እንደገና አንብቡ፤ የሚደጋገሙትን «can\'t get the kite» ገጾች ልጅዎ ያንብባቸው።',
    },
  },
};

export default story;
