import type { Story } from "../stories";

/*
  "Hello, Feelings!": one day, six feelings. Anbessa meets each one, names it, and learns
  a way to look after it: talk, hug and breathe. The repeated line for children to join
  in: "Hello, [feeling]. I see you."
  happy (honey on his bread), sad (his kite tears), angry (Gugu knocks his tower down),
  scared (a big horned shadow, which is only a little goat), surprised (Tsehay's flowers)
  and calm (by the fire at night).
  The Amharic keeps every English feeling word visible (for example "ሐዘን – SAD").
  AMHARIC: first draft, to be checked by a native-speaking editor before launch,
  especially the refrain (ሰላም፣ ሐዘን። አይሃለሁ።), the breathing lines, and "stompy".
*/
const story: Story = {
  id: "hello-feelings",
  pack: "english",
  title: { en: "Hello, Feelings!", am: "ሰላም፣ ስሜቶች!" },
  category: "English",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#8A5BD6",
  scene: "lib-hello-feelings",
  coverPage: 1,
  pages: [
    {
      en: '"Feelings come and go, like clouds in the sky," said Grandma. "When one comes to visit, say hello." Anbessa stretched. What would today bring?',
      am: "«ስሜቶች እንደ ሰማይ ደመና ይመጣሉ፣ ይሄዳሉም» አለች አያት። «አንዱ ሊጠይቅህ ሲመጣ ሰላም በለው።» አንበሳ ተንጠራራ። ዛሬ ምን ይዞ ይመጣ ይሆን?",
    },
    {
      en: 'Honey on his bread! Anbessa\'s tail swished, and his feet danced. "Hello, HAPPY! I see you!"',
      am: "በዳቦው ላይ ማር! የአንበሳ ጅራት ተወዛወዘ፣ እግሮቹም ደነሱ። «ሰላም፣ ደስታ – HAPPY! አይሃለሁ!»",
    },
    {
      en: 'Then his kite got stuck in a tree, and it tore. Rrrip. Anbessa\'s eyes filled with tears. "Hello, SAD. I see you."',
      am: "ከዚያ ካይቱ ዛፍ ላይ ተሰክቶ ተቀደደ። ቅድድ። የአንበሳ ዓይኖች በእንባ ተሞሉ። «ሰላም፣ ሐዘን – SAD። አይሃለሁ።»",
    },
    {
      en: "He told Grandma all about it. Talking helps. Grandma gave him a big, warm hug, and the sad feeling got a little bit smaller.",
      am: "ለአያቱ ሁሉንም ነገራት። ማውራት ይረዳል። አያት ትልቅና ሞቅ ያለ እቅፍ አቀፈችው፤ የሐዘኑ ስሜትም ትንሽ ቀነሰ።",
    },
    {
      en: 'Anbessa built a tall tower of stones. CRASH! Gugu knocked it down. Anbessa felt hot and stompy. "Hello, ANGRY. I see you!" ROAR!',
      am: "አንበሳ ረጅም የድንጋይ ግንብ ሠራ። ቋ! ጉጉ አፈረሰው። አንበሳ ሙቀት ተሰማው፣ መሬቱንም በእግሩ መታ። «ሰላም፣ ንዴት – ANGRY። አይሃለሁ!» ግርርር!",
    },
    {
      en: 'Lali buzzed close. "Breathe with me. Smell the flower… blow out the candle." In and out. In and out. The angry feeling got smaller.',
      am: "ላሊ ቀረብ ብላ በረረች። «ከእኔ ጋር ተንፍስ። አበባውን አሽት… ሻማውን አጥፋ።» ወደ ውስጥ፣ ወደ ውጭ። ወደ ውስጥ፣ ወደ ውጭ። የንዴቱ ስሜት ቀነሰ።",
    },
    {
      en: '"I feel angry. You knocked my tower down," said Anbessa. "Sorry!" said Gugu. "Let\'s build it again, together." So they did, even taller.',
      am: "«ተናድጃለሁ። ግንቤን አፈረስክብኝ» አለ አንበሳ። «ይቅርታ!» አለ ጉጉ። «አብረን እንደገና እንሥራው።» እንደዚያም አደረጉ፤ ከበፊቱም ይበልጥ ረዘመ።",
    },
    {
      en: 'Then a big, dark shadow crept across the grass, with long, long horns! Anbessa\'s knees went wobble, wobble. "Hello, SCARED. I see you."',
      am: "ከዚያ ረጃጅም ቀንዶች ያሉት ትልቅ ጨለማ ጥላ በሣሩ ላይ ተሳበ! የአንበሳ ጉልበቶች ተንቀጠቀጡ። «ሰላም፣ ፍርሃት – SCARED። አይሃለሁ።»",
    },
    {
      en: 'Anbessa and Gugu hugged tight. Hugs help, too. Then they peeked round the rock. It was only a little goat! "Meh-eh-eh!"',
      am: "አንበሳና ጉጉ ተቃቀፉ። መተቃቀፍም ይረዳል። ከዚያ ከድንጋዩ ኋላ አጮልቀው አዩ። ትንሽ ፍየል ብቻ ነበረች! «ሜ-ኤ-ኤ!»",
    },
    {
      en: '"SURPRISE!" Shy little Tsehay jumped out with flowers, just for him. Anbessa\'s eyes went big and round. "Hello, SURPRISED!"',
      am: "«ሰርፕራይዝ!» ዓይናፋሯ ትንሿ ፀሐይ ለእሱ ብቻ የሆኑ አበቦች ይዛ ዘላ ወጣች። የአንበሳ ዓይኖች ትልቅና ክብ ሆኑ። «ሰላም፣ መደነቅ – SURPRISED!»",
    },
    {
      en: 'In the evening, they sat by the warm fire. Slow breaths, soft stars, a sleepy yawn. "Hello, CALM," whispered Anbessa. "I like you."',
      am: "ማታ ሞቃቱ እሳት አጠገብ ተቀመጡ። ቀስ ያለ ትንፋሽ፣ ለስላሳ ከዋክብት፣ የእንቅልፍ ማዛጋት። «ሰላም፣ መረጋጋት – CALM» አለ አንበሳ በሹክሹክታ። «እወድሃለሁ።»",
    },
    {
      en: "Happy, sad, angry, scared, surprised and calm. All my feelings came to visit today! Hello, feelings. Goodnight. How do YOU feel today?",
      am: "ደስታ፣ ሐዘን፣ ንዴት፣ ፍርሃት፣ መደነቅ እና መረጋጋት። ዛሬ ሁሉም ስሜቶቼ ሊጠይቁኝ መጡ! ሰላም፣ ስሜቶች። ደህና እደሩ። እናንተስ ዛሬ ምን ይሰማችኋል?",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Which feeling visited Anbessa that has visited you too? What happened?",
        "Anbessa talked, hugged and breathed. What helps you when a big feeling comes?",
      ],
      am: [
        "አንበሳን ከጠየቁት ስሜቶች እናንተንም የጠየቃችሁ የትኛው ነው? ምን ሆነ?",
        "አንበሳ አወራ፣ ተቃቀፈ፣ ተነፈሰም። ትልቅ ስሜት ሲመጣባችሁ የሚረዳችሁ ምንድን ነው?",
      ],
    },
    activity: {
      en: 'Make feeling faces in a mirror together: happy, sad, angry, scared, surprised, calm. Say "Hello, …! I see you." Then practise flower-and-candle breathing: smell the flower, blow out the candle, three times.',
      am: "በመስታወት ፊት አብራችሁ የስሜት ፊቶችን አሳዩ፦ ደስታ (happy)፣ ሐዘን (sad)፣ ንዴት (angry)፣ ፍርሃት (scared)፣ መደነቅ (surprised)፣ መረጋጋት (calm)። «ሰላም፣ …! አይሃለሁ» በሉ። ከዚያ የአበባና የሻማ አተነፋፈስ ተለማመዱ፦ አበባውን አሽቱ፣ ሻማውን አጥፉ፣ ሦስት ጊዜ።",
    },
  },
  teaches: {
    words: ["happy", "sad", "angry", "scared", "surprised", "calm", "feelings", "talk", "hug", "breathe"],
  },
};

export default story;
