import type { Story } from "../../../stories";

/*
  "I Can!" (level 6: first sentences, "I can …").
  Ayan's little brother Abdi is tired of being little. "I can't climb, I can't read, I can't carry
  the water." Ayan works out what to do: watch him all day, and write down everything he CAN do,
  one sentence a page, with a drawing. I can jump. I can run. I can sing. I can count to ten. I can
  help Hooyo. I can hug the baby goat. At bedtime she reads him his own book, "I Can!", and Abdi
  reads the last page himself: "I can read!"
  Join-in line: "I can, I can, I CAN!"

  English taught: the sentence "I can …" with jump, run, sing, count, help, hug, read; reading
  short sentences with the snap words I, can (and a, the, my).

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «እችላለሁ፣ እችላለሁ፣ እችላለሁ!» and the glosses of each "I can …" sentence.
*/
const story: Story = {
  id: "abdi-can",
  course: "english-first-words",
  pack: "story",
  title: { en: "I Can!", am: "I Can! እችላለሁ!" },
  category: "English",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#F08A24",
  scene: "lib-abdi-can",
  coverPage: 11,
  teaches: { words: ["I can", "jump", "run", "sing", "count", "help", "hug", "read"] },
  pages: [
    {
      en: 'Abdi sat on the doorstep with his chin on his knees. "I can\'t climb the tree. I can\'t read Ayan\'s book. I can\'t carry the big water jug. I\'m too little!"',
      am: 'አብዲ አገጩን በጉልበቶቹ ላይ አሳርፎ በበሩ ደረጃ ላይ ተቀመጠ። «ዛፉን መውጣት አልችልም። የአያንን መጽሐፍ ማንበብ አልችልም። ትልቁን የውሃ ማሰሮ መሸከም አልችልም። በጣም ትንሽ ነኝ!»',
    },
    {
      en: 'Ayan sat down beside him. She thought and thought. Then she had an idea. "Tomorrow, I\'m going to watch you all day," she said. "And I\'ll write down everything you CAN do."',
      am: 'አያን አጠገቡ ተቀመጠች። አሰበች፣ አሰበች። ከዚያ ሐሳብ መጣላት። «ነገ ቀኑን ሙሉ እመለከትሃለሁ» አለች። «የምትችለውንም (CAN) ነገር ሁሉ እጽፋለሁ።»',
    },
    {
      en: 'In the morning, Abdi jumped over the puddle. Ayan wrote it down: "I can jump." I can, I can, I CAN!',
      am: 'ጠዋት አብዲ ኩሬውን ዘሎ አለፈ። አያን ጻፈችው፦ «I can jump.» (መዝለል እችላለሁ።) I can, I can, I CAN!',
    },
    {
      en: 'Abdi raced Gugu to the gate, and nearly won! Ayan wrote: "I can run." I can, I can, I CAN!',
      am: 'አብዲ ከጉጉ ጋር እስከ በሩ ተሽቀዳደመ፤ ሊያሸንፍም ትንሽ ቀረው! አያን ጻፈች፦ «I can run.» (መሮጥ እችላለሁ።) I can, I can, I CAN!',
    },
    {
      en: 'While Hooyo cooked, Abdi sang her a song, loud and happy. Ayan wrote: "I can sing." I can, I can, I CAN!',
      am: 'ሁዮ ምግብ ስታበስል አብዲ ጮክ ብሎ በደስታ ዘፈነላት። አያን ጻፈች፦ «I can sing.» (መዝፈን እችላለሁ።) I can, I can, I CAN!',
    },
    {
      en: 'Abdi counted the dates on the plate: one, two, three… all the way to ten! Ayan wrote: "I can count." I can, I can, I CAN!',
      am: 'አብዲ በሳህኑ ላይ ያሉትን ተምሮች ቆጠረ፦ one, two, three… እስከ ten ድረስ! አያን ጻፈች፦ «I can count.» (መቁጠር እችላለሁ።) I can, I can, I CAN!',
    },
    {
      en: 'He carried the small cups for Hooyo, one by one, and didn\'t spill a drop. Ayan wrote: "I can help." I can, I can, I CAN!',
      am: 'ለሁዮ ትንንሾቹን ስኒዎች አንድ በአንድ ተሸከመ፤ አንዲትም ጠብታ አልፈሰሰችም። አያን ጻፈች፦ «I can help.» (መርዳት እችላለሁ።) I can, I can, I CAN!',
    },
    {
      en: 'When the baby goat bleated for its mother, Abdi gave it a gentle hug until it was calm. Ayan wrote: "I can hug." I can, I can, I CAN!',
      am: 'ትንሿ ፍየል እናቷን ፍለጋ ስትጮኽ አብዲ እስክትረጋጋ ድረስ በእርጋታ አቀፋት። አያን ጻፈች፦ «I can hug.» (ማቀፍ እችላለሁ።) I can, I can, I CAN!',
    },
    {
      en: 'That night, Ayan folded the pages into a little book. On the front she wrote: "I CAN!" and a picture of Abdi, smiling.',
      am: 'በዚያ ምሽት አያን ገጾቹን አጣጥፋ ትንሽ መጽሐፍ አደረገቻቸው። ፊት ለፊቱ ላይ «I CAN!» ብላ ጻፈችና ፈገግ ያለውን የአብዲን ሥዕል ሣለች።',
    },
    {
      en: 'At bedtime she read it to him. "I can jump. I can run. I can sing. I can count. I can help. I can hug." Abdi\'s eyes grew big. "That\'s all ME?"',
      am: 'በመኝታ ሰዓት አነበበችለት። «I can jump. I can run. I can sing. I can count. I can help. I can hug.» የአብዲ ዓይኖች ተልቀው ተከፈቱ። «እነዚህ ሁሉ እኔ ነኝ?»',
    },
    {
      en: 'On the last page there was only one sentence. Abdi looked at it hard. "I… can… read." He gasped. "I can READ!"',
      am: 'በመጨረሻው ገጽ ላይ አንድ ዓረፍተ ነገር ብቻ ነበር። አብዲ በትኩረት ተመለከተው። «I… can… read.» ትንፋሹ ቆመ። «I can READ!» (ማንበብ እችላለሁ!)',
    },
    {
      en: 'Abdi hugged his little book all night long. I can, I can, I CAN! What can YOU do, {name}? Say it in English: "I can…"',
      am: 'አብዲ ትንሿን መጽሐፉን ሌሊቱን ሙሉ አቅፎ ተኛ። I can, I can, I CAN! {name}፣ እናንተ ምን ማድረግ ትችላላችሁ? በእንግሊዝኛ በሉት፦ «I can…»',
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why did Abdi feel too little? How did Ayan help him?", "What can you do? Say three sentences: \"I can …\""],
      am: ["አብዲ ለምን በጣም ትንሽ እንደሆነ ተሰማው? አያን እንዴት ረዳችው?", "እናንተ ምን ማድረግ ትችላላችሁ? ሦስት ዓረፍተ ነገሮችን በሉ፦ «I can …»"],
    },
    activity: {
      en: 'Make an "I Can" book with your child: fold two sheets of paper into a little book. On each page, write one sentence your child says ("I can jump", "I can draw") and let them draw the picture. Read it together, pointing to each word, then let your child read it to you.',
      am: 'ከልጃችሁ ጋር «I Can» መጽሐፍ ሥሩ፦ ሁለት ወረቀቶችን አጣጥፋችሁ ትንሽ መጽሐፍ አድርጉ። በእያንዳንዱ ገጽ ላይ ልጃችሁ የሚለውን አንድ ዓረፍተ ነገር ጻፉ («I can jump»፣ «I can draw»)፤ ሥዕሉንም ይሣል። እያንዳንዱን ቃል እየጠቆማችሁ አብራችሁ አንብቡት፤ ከዚያ ልጃችሁ ያንብብላችሁ።',
    },
  },
};

export default story;
