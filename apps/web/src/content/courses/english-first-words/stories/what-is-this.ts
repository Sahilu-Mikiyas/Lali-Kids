import type { Story } from "../../../stories";

/*
  "What Is This?" (level 6: asking and answering, "What is this?" "It is a …", "Is it …?").
  At English Club, Gugu brings a mystery bag. Each friend puts a paw in, feels, and answers the
  question "What is this?" with "It is a …": a ball (round, soft), a cup, a spoon. Then Anbessa
  feels something small, hard and bumpy, and can't guess. He works out a better way: ask
  questions! "Is it big?" "No, it isn't." "Is it a food?" "No." "Does it open a door?" "YES!"
  "It is a key!" It's the key to Gugu's box of treats, and everyone shares.
  Join-in line: "What is this? What is this? Feel it, think it, say it!"

  English taught: "What is this?" "It is a …" (ball, cup, spoon, banana, key); "Is it …?"
  "Yes, it is." "No, it isn't."; big, small, round, soft, hard.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ይህ ምንድን ነው? ዳስሱት፣ አስቡት፣ ተናገሩት!» and the glosses of the questions.
*/
const story: Story = {
  id: "what-is-this",
  course: "english-first-words",
  pack: "story",
  title: { en: "What Is This?", am: "What Is This? ይህ ምንድን ነው?" },
  category: "English",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#0E8C80",
  scene: "lib-what-is-this",
  coverPage: 0,
  teaches: { words: ["What is this?", "It is a", "Is it", "yes, it is", "no, it isn't", "ball", "cup", "spoon", "banana", "key", "big", "small", "round", "soft", "hard"] },
  pages: [
    {
      en: 'Gugu came to English Club with a lumpy cloth bag. "It\'s a mystery bag!" he said. "Put your paw in, feel, and tell me: What is this?"',
      am: 'ጉጉ እብጠት ያለበት የጨርቅ ቦርሳ ይዞ ወደ እንግሊዝኛ ክበብ መጣ። «ሚስጥራዊ ቦርሳ ነው!» አለ። «እጃችሁን አስገቡ፣ ዳስሱ፣ ከዚያ ንገሩኝ፦ What is this?» (ይህ ምንድን ነው?)',
    },
    {
      en: 'Hawi put her paw in. Something round and soft. Squish! "What is this? What is this? Feel it, think it, say it!" "It is a ball!" Out came a ball.',
      am: 'ሀዊ እጇን አስገባች። ክብና ለስላሳ ነገር። ልስልስ! «What is this? What is this? ዳስሱት፣ አስቡት፣ ተናገሩት!» «It is a ball!» (ኳስ ነው!) ኳስ ወጣ።',
    },
    {
      en: 'Haben put her hoof in. Something hard, with a handle. "What is this?" She thought. "It is a cup!" Out came a little coffee cup. "Yes, it is!"',
      am: 'ሐበን ኮቴዋን አስገባች። ጠንካራ፣ እጀታ ያለው ነገር። «What is this?» አሰበች። «It is a cup!» (ስኒ ነው!) ትንሽ የቡና ስኒ ወጣ። «Yes, it is!» (አዎ፣ ነው!)',
    },
    {
      en: 'Tsehay felt something long and bendy, with a smooth skin. "It is a… banana!" Out came a banana. Everyone laughed. "What is this? What is this? Feel it, think it, say it!"',
      am: 'ፀሐይ ረጅም፣ የሚታጠፍ፣ ለስላሳ ልጣጭ ያለው ነገር ዳሰሰች። «It is a… banana!» ሙዝ ወጣ። ሁሉም ሳቁ። «What is this? What is this? ዳስሱት፣ አስቡት፣ ተናገሩት!»',
    },
    {
      en: 'Ayan felt something thin and cold, round at one end. "It is a spoon!" Out came Grandma\'s wooden spoon. "Yes, it is!" giggled Gugu. "Grandma lent it to me."',
      am: 'አያን ቀጭን፣ አንድ ጫፉ ክብ የሆነ ነገር ዳሰሰች። «It is a spoon!» (ማንኪያ ነው!) የአያቴ የእንጨት ማንኪያ ወጣ። «Yes, it is!» ብሎ ሳቀ ጉጉ። «አያቴ አውሳኛለች።»',
    },
    {
      en: 'Last was Anbessa. He felt something small, hard and bumpy, with a hole at one end. He felt and felt. "It is a… a… I don\'t know!"',
      am: 'በመጨረሻ አንበሳ ነበር። ትንሽ፣ ጠንካራ፣ ሸካራ፣ በአንድ ጫፉ ቀዳዳ ያለው ነገር ዳሰሰ። ዳሰሰ፣ ዳሰሰ። «It is a… a… አላውቅም!»',
    },
    {
      en: 'Anbessa thought. "I can\'t see it. But I can ASK about it!" He looked at Gugu. "Is it big?" "No, it isn\'t," said Gugu. "It\'s small."',
      am: 'አንበሳ አሰበ። «ላየው አልችልም። ግን ስለሱ መጠየቅ እችላለሁ!» ጉጉን ተመለከተ። «Is it big?» (ትልቅ ነው?) «No, it isn\'t» (አይደለም) አለ ጉጉ። «ትንሽ ነው።»',
    },
    {
      en: '"Is it a food?" "No, it isn\'t." "Is it a toy?" "No, it isn\'t." Anbessa felt the bumpy end. "Does it open something?" Gugu grinned. "YES, it does!"',
      am: '«Is it a food?» (ምግብ ነው?) «No, it isn\'t.» «Is it a toy?» (መጫወቻ ነው?) «No, it isn\'t.» አንበሳ ሸካራውን ጫፍ ዳሰሰ። «የሆነ ነገር ይከፍታል?» ጉጉ ፈገግ አለ። «YES, it does!» (አዎ፣ ይከፍታል!)',
    },
    {
      en: '"What is this? What is this? Feel it, think it, say it!" Anbessa shouted, "It is a KEY!" He pulled it out. It was a little golden key.',
      am: '«What is this? What is this? ዳስሱት፣ አስቡት፣ ተናገሩት!» አንበሳ ጮኸ፣ «It is a KEY!» (ቁልፍ ነው!) አወጣው። ትንሽ ወርቃማ ቁልፍ ነበር።',
    },
    {
      en: '"A key! But what does it open?" asked Hawi. Gugu pointed to a little wooden box under the tree. "Is it a… treasure box?" asked Haben. "Yes, it is!"',
      am: '«ቁልፍ! ግን ምን ይከፍታል?» ብላ ጠየቀች ሀዊ። ጉጉ ከዛፉ ሥር ያለችን ትንሽ የእንጨት ሳጥን ጠቆመ። «Is it a… treasure box?» (የሀብት ሳጥን ነው?) ብላ ጠየቀች ሐበን። «Yes, it is!»',
    },
    {
      en: 'Click! The key turned. Inside was a heap of crunchy kolo, enough for everyone. "What is this?" asked Gugu. "It is a SNACK!" said everyone, and they shared it.',
      am: 'ክሊክ! ቁልፉ ዞረ። ውስጡ ለሁሉም የሚበቃ ብዙ ቆሎ ነበር። «What is this?» ብሎ ጠየቀ ጉጉ። «It is a SNACK!» (መክሰስ ነው!) አሉ ሁሉም፤ ተካፈሉትም።',
    },
    {
      en: 'What is this? What is this? Feel it, think it, say it! Point to something near you, {name}, and say: "It is a…"',
      am: 'What is this? What is this? ዳስሱት፣ አስቡት፣ ተናገሩት! {name}፣ በአጠገባችሁ ያለን ነገር ጠቁሙና በሉ፦ «It is a…»',
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Anbessa couldn't guess the key. What did he do instead?", "What questions could you ask about something you can't see?"],
      am: ["አንበሳ ቁልፉን መገመት አልቻለም። በምትኩ ምን አደረገ?", "የማታዩትን ነገር ለማወቅ ምን ጥያቄዎች መጠየቅ ትችላላችሁ?"],
    },
    activity: {
      en: 'Make your own mystery bag with a few things from home (a cup, a spoon, a sock, a ball). Your child feels one and you ask "What is this?"; they answer "It is a …". Then swap: you feel, and your child asks. For a harder game, they may only ask "Is it …?" questions, and you answer "Yes, it is" or "No, it isn\'t".',
      am: 'ከቤት ጥቂት ነገሮችን (ስኒ፣ ማንኪያ፣ ካልሲ፣ ኳስ) በቦርሳ አድርጋችሁ የራሳችሁን ሚስጥራዊ ቦርሳ ሥሩ። ልጃችሁ አንዱን ይዳስስ፤ እናንተ «What is this?» ብላችሁ ጠይቁ፤ እሱ «It is a …» ብሎ ይመልስ። ከዚያ ተቀያየሩ። ለከበደ ጨዋታ ደግሞ «Is it …?» የሚሉ ጥያቄዎችን ብቻ ይጠይቅ፤ እናንተ «Yes, it is» ወይም «No, it isn\'t» ብላችሁ መልሱ።',
    },
  },
};

export default story;
