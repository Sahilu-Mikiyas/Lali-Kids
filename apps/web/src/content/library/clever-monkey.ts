import type { Story } from "../stories";

/*
  "The Clever Monkey": the widely told tale of the monkey and the crocodile, by an Ethiopian
  river with a big sholla (sycamore fig) tree. Tota, a little vervet monkey, rides across the
  river on Zozo the crocodile's back to reach the sweetest figs. In the middle, Zozo says he
  wants Tota's heart, because monkeys are clever and eating a monkey's heart would make him
  clever too. Tota keeps calm, says he left his heart hanging in the fig tree, and once they
  are back on the bank he leaps to safety. No one is hurt: Tota explains that cleverness comes
  from staying calm and thinking, and shares his figs. The two wave hello every morning after.
  The repeated line to join in on: "Keep calm, Tota. Think, think, think!"
  ጦጣ is the Amharic word for a vervet monkey and አዞ for a crocodile; the names are Tota (ቶታ)
  and Zozo (ዞዞ) so they read as names in both languages. ሾላ is the wild fig.
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line (ተረጋጋ፣ ቶታ። አስብ፣ አስብ፣ አስብ!), the water sounds (ቻቦ) and the heartbeat
  (ድው-ድው).
*/
const story: Story = {
  id: "clever-monkey",
  pack: "story",
  title: { en: "The Clever Monkey", am: "ብልሁ ጦጣ" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#3E8E9A",
  scene: "lib-clever-monkey",
  coverPage: 3,
  teaches: { words: ["monkey", "crocodile", "river", "heart", "calm", "think"] },
  pages: [
    {
      en: "Beside a wide, brown river stood a big fig tree. In the fig tree lived Tota, a little monkey with quick hands and a very busy mind.",
      am: "ሰፊና ቡናማ ከሆነ ወንዝ ዳር አንድ ትልቅ የሾላ ዛፍ ቆሞ ነበር። በዛፉ ላይ ፈጣን እጆችና በጣም ንቁ አእምሮ ያለው ቶታ የሚባል ትንሽ ጦጣ ይኖር ነበር።",
    },
    {
      en: 'Across the river was a little island, with the reddest, sweetest figs Tota had ever seen. "Mmm," he sighed. "If only I could swim!"',
      am: "ከወንዙ ማዶ አንዲት ትንሽ ደሴት ነበረች፤ ቶታ አይቶት የማያውቀው በጣም ቀይና ጣፋጭ ሾላ ነበረባት። «ምምም» ብሎ ተነፈሰ። «ምነው መዋኘት ብችል!»",
    },
    {
      en: 'Swish! Up from the water came Zozo the crocodile, with a big, wide smile. "Hop on my back, little friend," he said. "I\'ll take you across."',
      am: "ሽው! ከውሃው ውስጥ ዞዞ የሚባል አዞ ሰፊ ፈገግታ ይዞ ብቅ አለ። «ጀርባዬ ላይ ውጣ፣ ትንሹ ወዳጄ» አለ። «ማዶ አሻግርሃለሁ።»",
    },
    {
      en: 'Tota hopped on. Splish, splosh! Off they swam. Fish jumped and birds flew by. "Wheee!" laughed Tota. "This is fun!"',
      am: "ቶታ ዘሎ ወጣ። ቻቦ፣ ቻቦ! ዋኝተው ሄዱ። ዓሦች ዘለሉ፣ ወፎችም አጠገባቸው በረሩ። «ዊ!» ብሎ ሳቀ ቶታ። «ይሄ እንዴት ደስ ይላል!»",
    },
    {
      en: 'But in the middle of the river, Zozo stopped. "Monkeys are so clever," he said. "If I eat your heart, I will be clever too!" And he licked his lips.',
      am: "በወንዙ መሀል ግን ዞዞ ቆመ። «ጦጣዎች በጣም ብልሆች ናቸው» አለ። «ልብህን ብበላ እኔም ብልህ እሆናለሁ!» ከንፈሩንም ላሰ።",
    },
    {
      en: 'Water all around! Tota\'s tail shook. His heart went thump, thump, thump. Then he took a big breath. "Keep calm, Tota. Think, think, think!"',
      am: "ዙሪያው ሁሉ ውሃ! የቶታ ጭራ ተንቀጠቀጠ። ልቡ ድው፣ ድው፣ ድው አለ። ከዚያም በረጅሙ ተነፈሰ። «ተረጋጋ፣ ቶታ። አስብ፣ አስብ፣ አስብ!»",
    },
    {
      en: '"Oh, Zozo, what a pity!" said Tota. "My heart isn\'t with me. Monkeys hang their hearts up in the fig tree, to keep them cool and safe."',
      am: "«ወይ፣ ዞዞ፣ ምን ያሳዝናል!» አለ ቶታ። «ልቤ ከእኔ ጋር የለም። ጦጣዎች ልባቸው እንዲቀዘቅዝና እንዲጠበቅ በሾላ ዛፍ ላይ ይሰቅሉታል።»",
    },
    {
      en: '"In the tree?" Zozo scratched his scaly head. "Then let\'s go back and get it!" He turned around. Splish, splosh, back across the river.',
      am: "«ዛፉ ላይ?» ዞዞ ቅርፊታም ራሱን አከከ። «እንግዲያው ተመልሰን እናምጣው!» ብሎ ዞር አለ። ቻቦ፣ ቻቦ፣ ወንዙን መልሰው ተሻገሩ።",
    },
    {
      en: "The moment they reached the bank, Tota leapt. Whoosh! Up, up, up, to the very highest branch of the fig tree.",
      am: "ዳር እንደደረሱ ቶታ ዘለለ። ሹው! ወደ ላይ፣ ወደ ላይ፣ ወደ ላይ፣ እስከ ሾላው ዛፍ ከፍተኛ ቅርንጫፍ ድረስ።",
    },
    {
      en: '"Well? Where is your heart?" called Zozo. Tota laughed and patted his chest. "Right here, where it always was! Ba-dum, ba-dum!"',
      am: "«እሺ? ልብህ የታለ?» ብሎ ጠራ ዞዞ። ቶታ ሳቀና ደረቱን መታ መታ አደረገ። «እዚሁ ነው፣ ሁልጊዜም እንደነበረው! ድው-ድው፣ ድው-ድው!»",
    },
    {
      en: '"You can\'t get clever by eating a heart, Zozo," said Tota. "You get clever by staying calm and thinking." Zozo blinked. "Oh," he said. "I never thought of that."',
      am: "«ልብ በመብላት ብልህ አትሆንም፣ ዞዞ» አለ ቶታ። «ብልህ የምትሆነው ተረጋግተህ በማሰብ ነው።» ዞዞ ዓይኑን አርገበገበ። «ኦ» አለ። «ይህን አስቤው አላውቅም ነበር።»",
    },
    {
      en: 'Zozo\'s tummy rumbled. Tota picked a big fig and dropped it down. Plop! "You can\'t have my heart," he said, "but you can share my figs."',
      am: "የዞዞ ሆድ ተንጓጓ። ቶታ ትልቅ ሾላ ቀጥፎ ወደ ታች ጣለለት። ዱብ! «ልቤን ልትወስድ አትችልም» አለ፤ «ከሾላዬ ግን መካፈል ትችላለህ።»",
    },
    {
      en: 'Now Tota and Zozo wave hello to each other every morning. And when trouble comes, Tota remembers: "Keep calm. Think, think, think!"',
      am: "አሁን ቶታና ዞዞ በየማለዳው እጅ እያውለበለቡ ሰላም ይባባላሉ። ችግር ሲመጣም ቶታ ያስታውሳል፦ «ተረጋጋ። አስብ፣ አስብ፣ አስብ!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "How did Tota feel in the middle of the river? What did he do to help himself think?",
        "Tota hopped on Zozo's back straight away. How can we tell whether it is safe to trust someone new?",
      ],
      am: [
        "ቶታ በወንዙ መሀል ምን ተሰማው? ለማሰብ እንዲችል ራሱን እንዴት ረዳ?",
        "ቶታ ወዲያውኑ በዞዞ ጀርባ ላይ ወጣ። አዲስ ሰውን ማመን ደኅና መሆኑን እንዴት ማወቅ እንችላለን?",
      ],
    },
    activity: {
      en: 'Practise Tota\'s calm trick: breathe in slowly through your nose, out through your mouth, three times, saying "Keep calm, think, think, think!" Then lay a blanket "river" on the floor and work out together how to get a toy across without stepping in.',
      am: "የቶታን የመረጋጋት ዘዴ ተለማመዱ፦ «ተረጋጋ፣ አስብ፣ አስብ፣ አስብ!» እያላችሁ በአፍንጫችሁ ቀስ ብላችሁ ተንፍሳችሁ በአፋችሁ አውጡ፤ ሦስት ጊዜ። ከዚያም ብርድ ልብስ መሬት ላይ አንጥፋችሁ «ወንዝ» አድርጉና ሳትረግጡት አንድን አሻንጉሊት እንዴት ማሻገር እንደምትችሉ አብራችሁ አስቡ።",
    },
  },
};

export default story;
