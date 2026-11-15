import type { Story } from "../../../stories";

/*
  "Wait for the Train" (level 2: the vowel team ai).
  Grandma Halima is coming home on the train from Djibouti, and Hooyo, Ayan and Abdi go to the big
  station in Dire Dawa to meet her. "t-r-ai-n: a and i together say ay, the name of a!" The board
  says the train is late: please wait. Then it rains. Abdi gets wriggly and grumpy and starts to
  cry, and Ayan works out how to help him wait: an "ai" spying game. A snail on the wet wall, a
  pail, fresh paint, a nail; they race the snail up the wall and draw Grandma a picture of a train
  in the rain. HOOONK: the train! Grandma steps down, and the snail has just reached the top.
  Join-in line: "Wait, wait, wait for the train!"

  English taught: ai says the long a sound (the name of the letter a): train, rain, wait, snail,
  pail, paint, nail, tail, again.
  Fact: the Addis Ababa to Djibouti railway stops at Dire Dawa.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ጠብቅ፣ ጠብቅ፣ ባቡሩን ጠብቅ!».
*/
const story: Story = {
  id: "wait-for-the-train",
  course: "english-readers",
  pack: "story",
  title: { en: "Wait for the Train", am: "ባቡሩን ጠብቁ" },
  category: "English",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#2E9A5B",
  scene: "lib-wait-for-the-train",
  coverPage: 8,
  teaches: { words: ["ai", "train", "rain", "wait", "snail", "pail", "paint", "nail", "tail", "again"] },
  pages: [
    {
      en: 'Grandma Halima was coming home on the train from Djibouti! Hooyo, Ayan and Abdi went to meet her at the big station in Dire Dawa. "t-r-ai-n," read Ayan. "a and i say ay. Train!"',
      am: 'አያት ሀሊማ ከጅቡቲ በባቡር ወደ ቤት እየመጡ ነበር! ሁዮ፣ አያንና አብዲ ሊቀበሏቸው ወደ ድሬዳዋ ትልቁ ጣቢያ ሄዱ። «t-r-ai-n» ብላ አነበበች አያን ሰሌዳው ላይ። «a እና i አብረው «ኤይ» ይላሉ፤ እንደ a ስም። Train!» (ባቡር!)',
    },
    {
      en: 'But under it, the board said: "The train is late. Please wait." "w-ai-t. Wait?" groaned Abdi. "I don\'t WANT to wait!" Wait, wait, wait for the train!',
      am: 'ከሥሩ ግን ሰሌዳው እንዲህ ይል ነበር፦ «The train is late. Please wait.» (ባቡሩ ዘግይቷል። እባካችሁ ጠብቁ።) «w-ai-t። Wait?» ብሎ አቃሰተ አብዲ። «መጠበቅ አልፈልግም!» Wait, wait, wait for the train! (ጠብቅ፣ ጠብቅ፣ ባቡሩን ጠብቅ!)',
    },
    {
      en: 'Then the sky went dark. Pitter-patter, pitter-patter… "r-ai-n. RAIN!" They ran under the big station roof and sat on a bench. Wait, wait, wait for the train!',
      am: 'ከዚያ ሰማዩ ጨለመ። ጣ-ጣ፣ ጣ-ጣ… «r-ai-n። RAIN!» (ዝናብ!) ከጣቢያው ትልቅ ጣሪያ ሥር ሮጠው አግዳሚ ወንበር ላይ ተቀመጡ። Wait, wait, wait for the train!',
    },
    {
      en: 'Abdi wriggled. He kicked his feet. He asked, "Is it here yet?" ten times. Then his lip wobbled, and he began to cry. Hooyo looked tired. How could they help Abdi wait?',
      am: 'አብዲ ተቁነጠነጠ። እግሮቹን አወዛወዘ። «ደረሰ?» ብሎ አሥር ጊዜ ጠየቀ። ከዚያ ከንፈሩ ተንቀጠቀጠና ማልቀስ ጀመረ። ሁዮ የደከማት ትመስል ነበር። አብዲ እንዲጠብቅ እንዴት ሊረዱት ይችላሉ?',
    },
    {
      en: 'Ayan had an idea. "Abdi, let\'s play the ai game! I spy something that says ay, like train and rain. It is very slow, and it has a shell." Abdi sniffed. He looked around. "A SNAIL!"',
      am: 'አያን ሐሳብ መጣላት። «አብዲ፣ የai ጨዋታ እንጫወት! እንደ train እና rain «ኤይ» የሚል ነገር አያለሁ። በጣም ቀርፋፋ ነው፣ ቅርፊትም አለው።» አብዲ አፍንጫውን ሳበ። ዙሪያውን ተመለከተ። «A SNAIL!» (ቀንድ አውጣ!)',
    },
    {
      en: 'There it was, on the wet wall: a snail, climbing up, slow as slow. "s-n-ai-l, snail!" Abdi\'s tears were gone. "My turn! I spy… a pail!" A bucket stood by the bench. "p-ai-l. Pail!"',
      am: 'ይኸው፣ በእርጥቡ ግድግዳ ላይ፦ ቀንድ አውጣ፣ እጅግ በቀስታ ወደ ላይ እየወጣ። «s-n-ai-l፣ snail!» የአብዲ እንባ ጠፍቶ ነበር። «የኔ ተራ! አያለሁ… a pail!» (ባልዲ!) ከወንበሩ አጠገብ ባልዲ ቆሞ ነበር። «p-ai-l። Pail!»',
    },
    {
      en: '"I spy… paint!" said Ayan. The station doors were painted bright yellow. "I spy… a nail!" said Abdi, and he found a nail on the bench. They were laughing now. Wait, wait, wait for the train!',
      am: '«አያለሁ… paint!» (ቀለም!) አለች አያን። የጣቢያው በሮች ደማቅ ቢጫ ቀለም ተቀብተው ነበር። «አያለሁ… a nail!» (ሚስማር!) አለ አብዲ፤ በወንበሩ ላይ ሚስማር አገኘ። አሁን እየሳቁ ነበር። Wait, wait, wait for the train!',
    },
    {
      en: 'Hooyo gave them paper and a pencil. Abdi drew a long train. Ayan drew the rain and the snail, and wrote at the top: "Grandma\'s train". Abdi read it again and again.',
      am: 'ሁዮ ወረቀትና እርሳስ ሰጠቻቸው። አብዲ ረጅም ባቡር ሣለ። አያን ዝናቡንና ቀንድ አውጣውን ሣለች፤ ከላይም «Grandma\'s train» (የአያት ባቡር) ብላ ጻፈች። አብዲ ደጋግሞ አነበበው።',
    },
    {
      en: 'Then… HOOOONK! A long green and yellow train came into the station. The rain had stopped. "The train! The TRAIN!" shouted Abdi, jumping up and down.',
      am: 'ከዚያ… ሁውውውንክ! ረጅም አረንጓዴና ቢጫ ባቡር ወደ ጣቢያው ገባ። ዝናቡ አቁሞ ነበር። «ባቡሩ! ባቡሩ!» እያለ ጮኸ አብዲ፣ ወደ ላይና ወደ ታች እየዘለለ።',
    },
    {
      en: 'Grandma Halima stepped down and held out her arms. "Did you have to wait a long time?" "We waited and waited," said Abdi, "but we played the ai game!" He gave her the picture.',
      am: 'አያት ሀሊማ ወርደው እጃቸውን ዘረጉ። «ብዙ መጠበቅ ነበረባችሁ?» «ጠበቅን፣ ጠበቅን» አለ አብዲ፣ «ግን የai ጨዋታ ተጫወትን!» ሥዕሉን ሰጣቸው።',
    },
    {
      en: '"And did the snail wait for the train too?" asked Grandma. They all looked at the wall. The snail had just reached the very top! Everybody laughed.',
      am: '«ቀንድ አውጣውስ ባቡሩን ጠበቀ?» ብለው ጠየቁ አያት። ሁሉም ግድግዳውን ተመለከቱ። ቀንድ አውጣው ልክ ጫፉ ላይ ደርሶ ነበር! ሁሉም ሳቁ።',
    },
    {
      en: "a and i say ay: train, rain, wait, snail, pail, paint, nail. Wait, wait, wait for the train! What can you spy with ai, {name}?",
      am: "a እና i «ኤይ» ይላሉ፦ train፣ rain፣ wait፣ snail፣ pail፣ paint፣ nail። Wait, wait, wait for the train! {name}፣ ai ያለበት ምን ማየት ትችላላችሁ?",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["How did Ayan help Abdi when he was tired of waiting?", "What games do you play when you have to wait?"],
      am: ["አብዲ መጠበቅ ሲሰለቸው አያን እንዴት ረዳችው?", "መጠበቅ ሲኖርባችሁ ምን ጨዋታ ትጫወታላችሁ?"],
    },
    activity: {
      en: 'Next time you are waiting (for a bus, at the clinic, in a line), play the ai game: "I spy something that says ay, like train." Look for rain, a tail, a pail, paint, a nail, a snail, a chain. Write two or three of the words afterward and circle the ai. In the middle of a word, the long a sound is often spelled ai.',
      am: 'በሚቀጥለው ጊዜ ስትጠብቁ (አውቶቡስ፣ ክሊኒክ ውስጥ፣ ሰልፍ ላይ) የai ጨዋታ ተጫወቱ፦ «እንደ train «ኤይ» የሚል ነገር አያለሁ።» rain (ዝናብ)፣ tail (ጭራ)፣ pail (ባልዲ)፣ paint (ቀለም)፣ nail (ሚስማር)፣ snail (ቀንድ አውጣ)፣ chain (ሰንሰለት) ፈልጉ። ከዚያ ሁለት ሦስቱን ቃላት ጽፋችሁ aiን አክብቡት። በቃል መካከል ረጅሙ የa ድምፅ ብዙውን ጊዜ በai ይጻፋል።',
    },
  },
};

export default story;
