import type { Story } from "../../../stories";

/*
  "Good Morning, Gugu!" (level 1: greetings and polite words through one day).
  Gugu mixes up his English greetings ("Good night!" in the morning, "Goodbye!" when he arrives).
  Anbessa works out clues to help him: look at the sky for morning and night; coming is hello and
  going is goodbye; asking is please, getting is thank you. At the market with Ayan, Gugu tries
  each one; all afternoon he practices on goats, birds and trees; at night he works out
  "Good night" by himself, and next morning he is the first to say "Good morning!"
  Join-in line (Anbessa's question, the child answers): "What do we say?"

  English taught: good morning, hello, please, thank you, you're welcome, goodbye, good night,
  "Please may I have …?", "Here you are."

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  glosses «እንደምን አደርክ» (good morning, to a boy), «ደህና እደር» (good night) and «ምንም አይደለም»
  for "You're welcome", and the join-in line «ምን እንላለን?».
*/
const story: Story = {
  id: "good-morning-gugu",
  course: "english-first-words",
  pack: "story",
  title: { en: "Good Morning, Gugu!", am: "Good Morning, ጉጉ!" },
  category: "English",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#F2A81D",
  scene: "lib-good-morning-gugu",
  coverPage: 3,
  teaches: { words: ["good morning", "hello", "please", "thank you", "you're welcome", "goodbye", "good night"] },
  pages: [
    {
      en: 'The sun peeked over the mountains. Grandma opened the door. "Good morning, Anbessa!" "Good morning, Grandma!" said Anbessa, with a big stretch.',
      am: "ፀሐይ ከተራሮቹ ጀርባ አጮልቃ ወጣች። አያቴ በሩን ከፈተች። «Good morning, Anbessa!» (እንደምን አደርክ፣ አንበሳ!) «Good morning, Grandma!» አለ አንበሳ፣ በደንብ እየተንጠራራ።",
    },
    {
      en: 'Knock, knock! It was Gugu. "Good night, Anbessa!" he said. Anbessa giggled. "Good NIGHT? Gugu, the sun is up!"',
      am: "ኳ፣ ኳ! ጉጉ ነበር። «Good night, Anbessa!» አለ። አንበሳ ሳቀ። «Good NIGHT? ጉጉ፣ ፀሐይ ወጥታለች እኮ!»",
    },
    {
      en: '"Oh dear," said Gugu. "Good morning, good night, hello, goodbye… there are so many! I mix them all up."',
      am: "«ውይ!» አለ ጉጉ። «Good morning፣ good night፣ hello፣ goodbye… ስንት ናቸው! ሁሉንም አደባልቃቸዋለሁ።»",
    },
    {
      en: 'Anbessa had an idea. "Let\'s look for clues! Look up. The sun is coming up, so it\'s morning. What do we say?" "GOOD MORNING!" said Gugu. "Good morning, Grandma!"',
      am: "አንበሳ አንድ ሐሳብ መጣለት። «ፍንጭ እንፈልግ! ቀና ብለህ ተመልከት። ፀሐይ እየወጣች ነው፤ ስለዚህ ጠዋት ነው። ምን እንላለን?» «GOOD MORNING!» አለ ጉጉ። «Good morning, Grandma!»",
    },
    {
      en: 'At the market, they saw Ayan with her basket of oranges. "Goodbye, Ayan!" called Gugu. Anbessa shook his head. "We just got here. When we come, what do we say?" "HELLO! Hello, Ayan!"',
      am: "ገበያ ሲደርሱ አያንን ከብርቱካን ቅርጫቷ ጋር አዩዋት። «Goodbye, Ayan!» ብሎ ጠራ ጉጉ። አንበሳ ራሱን ነቀነቀ። «ገና መድረሳችን ነው። ስንመጣ ምን እንላለን?» «HELLO! Hello, Ayan!»",
    },
    {
      en: 'Gugu reached for an orange. Anbessa stopped him. "When we ask for something, what do we say?" "PLEASE! Please may I have an orange?" "Here you are," said Ayan.',
      am: "ጉጉ ብርቱካን ለማንሳት እጁን ዘረጋ። አንበሳ አስቆመው። «አንድ ነገር ስንጠይቅ ምን እንላለን?» «PLEASE! Please may I have an orange?» (እባክሽ፣ አንድ ብርቱካን ልውሰድ?) «Here you are» አለች አያን። (ይኸውልህ።)",
    },
    {
      en: '"And when we get something, what do we say?" "THANK YOU! Thank you, Ayan!" Ayan smiled. "You\'re welcome!"',
      am: "«አንድ ነገር ሲሰጠንስ ምን እንላለን?» «THANK YOU! Thank you, Ayan!» አያን ፈገግ አለች። «You're welcome!» (ምንም አይደለም!)",
    },
    {
      en: 'Then they walked away. "Hello, Ayan!" called Gugu. Anbessa laughed. "We\'re going now. When we go, what do we say?" "GOODBYE! Goodbye, Ayan!" Ayan waved.',
      am: "ከዚያ መሄድ ጀመሩ። «Hello, Ayan!» ብሎ ጠራ ጉጉ። አንበሳ ሳቀ። «አሁን እየሄድን ነው። ስንሄድ ምን እንላለን?» «GOODBYE! Goodbye, Ayan!» አያን እጇን አውለበለበች።",
    },
    {
      en: 'All afternoon, Gugu practiced. "Hello, goat!" "Please, little bird, sing for me!" "Thank you, tree, for the shade!" "Goodbye, butterfly!" He got every one right.',
      am: "ከሰዓት በኋላ ሙሉ ጉጉ ተለማመደ። «Hello, goat!» «Please, little bird, sing for me!» «Thank you, tree, for the shade!» «Goodbye, butterfly!» ሁሉንም በትክክል አለ።",
    },
    {
      en: 'The sun went down, and the stars came out. Gugu\'s mama called him home. Gugu looked up at the moon. "It\'s night, and it\'s time for bed. What do we say? GOOD NIGHT, Anbessa!" "Good night, Gugu!"',
      am: "ፀሐይ ጠለቀች፤ ከዋክብትም ወጡ። የጉጉ እናት ወደ ቤት ጠራችው። ጉጉ ቀና ብሎ ጨረቃን አየ። «ማታ ነው፤ የመኝታ ሰዓት ነው። ምን እንላለን? GOOD NIGHT, Anbessa!» «Good night, Gugu!» (ደህና እደር፣ ጉጉ!)",
    },
    {
      en: 'Anbessa snuggled into bed. "Good night, Grandma." "Good night, Lali." "Bzz. Good night, Anbessa," buzzed Lali from her hive.',
      am: "አንበሳ አልጋው ውስጥ ገብቶ ተጠቀለለ። «Good night, Grandma.» «Good night, Lali.» «ቡዝ። Good night, Anbessa» አለች ላሊ ከቀፎዋ።",
    },
    {
      en: 'The next day, before Anbessa had even opened his eyes… knock, knock! "GOOD MORNING, ANBESSA!" Gugu got it right! Good morning, {name}!',
      am: "በማግስቱ አንበሳ ገና ዓይኑን ሳይገልጥ… ኳ፣ ኳ! «GOOD MORNING, ANBESSA!» ጉጉ በትክክል አለው! Good morning, {name}!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "What clues did Anbessa give Gugu? How do you know when to say \"Good morning\" and when to say \"Good night\"?",
        "What do we say when we come, and when we go? When we ask, and when we get something?",
      ],
      am: [
        "አንበሳ ለጉጉ ምን ፍንጮች ሰጠው? «Good morning» እና «Good night» መቼ እንደሚባሉ እንዴት እናውቃለን?",
        "ስንመጣና ስንሄድ ምን እንላለን? ስንጠይቅና ሲሰጠንስ?",
      ],
    },
    activity: {
      en: 'Play "What do we say?" through the day. In the morning, at the door, at a meal and at bedtime, ask "What do we say?" and let your child answer in English: good morning, hello, please, thank you, goodbye, good night. Answer "You\'re welcome!" when they say thank you.',
      am: "ቀኑን ሙሉ «ምን እንላለን?» የሚለውን ጨዋታ ተጫወቱ። ጠዋት፣ በር ላይ፣ በምግብ ሰዓትና በመኝታ ሰዓት «ምን እንላለን?» ብላችሁ ጠይቁ፤ ልጃችሁ በእንግሊዝኛ ይመልስ፦ good morning፣ hello፣ please፣ thank you፣ goodbye፣ good night። «Thank you» ሲል «You're welcome!» ብላችሁ መልሱ።",
    },
  },
};

export default story;
