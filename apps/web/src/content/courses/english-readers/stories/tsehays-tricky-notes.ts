import type { Story } from "../../../stories";

/*
  "The Tricky Notes" (level 1: the tricky words he, she, we, you, they, was, said, have, do, to,
  come, here).
  Tsehay comes home from school to an empty house and a note on the door. "c-o-m-e… comb?" Gugu
  wants to know what it says. Tsehay remembers what Teacher Meron taught: some words are tricky,
  they don't sound the way they look, so we learn them with our eyes and hands: Look, say, cover,
  write, check. She finds each word on her ring of word cards from school, then writes it in the
  dust with a stick. Note by note (the fig tree, the gate, Dawit's red ball, the back of the house)
  she reads her way to a surprise: her whole family and her friends, for her birthday. "We knew
  you could read them!"
  Join-in line: "Look, say, cover, write, check!"

  English taught: the twelve tricky (sight) words he, she, we, you, they, was, said, have, do, to,
  come, here; the "look, say, cover, write, check" way of learning them.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ተመልከት፣ በል፣ ሸፍን፣ ጻፍ፣ አረጋግጥ!» and «አታላይ ቃላት» for tricky words.
*/
const story: Story = {
  id: "tsehays-tricky-notes",
  course: "english-readers",
  pack: "story",
  title: { en: "The Tricky Notes", am: "አታላዮቹ ማስታወሻዎች" },
  category: "English",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#8E5BE0",
  scene: "lib-tsehays-tricky-notes",
  coverPage: 9,
  teaches: { words: ["he", "she", "we", "you", "they", "was", "said", "have", "do", "to", "come", "here"] },
  pages: [
    {
      en: "Tsehay came home from school. The house was quiet. Mama wasn't there. Papa wasn't there. Even baby Dawit wasn't there! But on the door was a note.",
      am: "ፀሐይ ከትምህርት ቤት ወደ ቤት መጣች። ቤቱ ጸጥ ያለ ነበር። እማማ አልነበረችም። አባባ አልነበረም። ሕፃኑ ዳዊት እንኳ አልነበረም! በበሩ ላይ ግን ማስታወሻ ነበር።",
    },
    {
      en: '"c-o-m-e… comb?" read Tsehay. That didn\'t sound right. Gugu came hopping over the wall. "What does it say? What does it SAY?"',
      am: '«c-o-m-e… ኮምብ?» ብላ አነበበች ፀሐይ። ትክክል አልመሰላትም። ጉጉ ግድግዳውን ዘሎ መጣ። «ምን ይላል? ምን ይላል?»',
    },
    {
      en: 'Tsehay remembered Teacher Meron. "Some words are tricky. They don\'t sound the way they look. So we learn them with our eyes and our hands. Look, say, cover, write, check!"',
      am: 'ፀሐይ መምህርት መሮንን አስታወሰች። «አንዳንድ ቃላት አታላዮች ናቸው። እንደሚታዩት አይነበቡም። ስለዚህ በዓይናችንና በእጃችን እንማራቸዋለን። Look, say, cover, write, check!» (ተመልከት፣ በል፣ ሸፍን፣ ጻፍ፣ አረጋግጥ!)',
    },
    {
      en: 'She found "come" on her ring of word cards from school. Look: c-o-m-e. Say: "come!" Cover it with her hand. Write it in the dust with a stick. Check: yes! "Come to the tree!"',
      am: 'ከትምህርት ቤት ባመጣችው የቃላት ካርዶች ቀለበት ላይ «come»ን አገኘች። ተመልከት፦ c-o-m-e። በል፦ «come!» (ና፣ ነዪ!) በእጇ ሸፈነችው። በዱላ አቧራው ላይ ጻፈችው። አረጋግጥ፦ አዎ! «Come to the tree!» (ወደ ዛፉ ነዪ!)',
    },
    {
      en: 'They ran to the fig tree. On the trunk was note two: "Do you see the gate? Go to the gate." "Do" said "doo", not "doh"! Tricky! Look, say, cover, write, check!',
      am: 'ወደ ሾላው ዛፍ ሮጡ። በግንዱ ላይ ሁለተኛው ማስታወሻ ነበር፦ «Do you see the gate? Go to the gate.» (በሩን ታያለሽ? ወደ በሩ ሂጂ።) «Do» «ዱ» እንጂ «ዶ» አይልም! አታላይ ነው! Look, say, cover, write, check!',
    },
    {
      en: 'At the gate was note three: "Dawit was here. He had a red ball." "Was" says "wuz"! Tricky again. Gugu spotted the red ball by the well. "There! Under the ball!"',
      am: 'በሩ ጋ ሦስተኛው ማስታወሻ ነበር፦ «Dawit was here. He had a red ball.» (ዳዊት እዚህ ነበር። ቀይ ኳስ ነበረው።) «Was» «ዋዝ» ይላል! እንደገና አታላይ። ጉጉ ቀዩን ኳስ ከጉድጓዱ አጠገብ አየው። «እዚያ! ከኳሱ ሥር!»',
    },
    {
      en: 'Under the ball was note four: "They said you can do it!" "Said" says "sed"! Gugu scratched his head. "Who are THEY?" "I don\'t know yet," said Tsehay. "Look, say, cover, write, check!"',
      am: 'ከኳሱ ሥር አራተኛው ማስታወሻ ነበር፦ «They said you can do it!» (ትችያለሽ አሉ!) «Said» «ሰድ» ይላል! ጉጉ ራሱን አከከ። «እነሱ እነማን ናቸው?» «ገና አላውቅም» አለች ፀሐይ። «Look, say, cover, write, check!»',
    },
    {
      en: 'Note five was on the back door. "We have a surprise for you. Come here!" Tsehay read it all, without stopping once. "Have" looks like it should say "hayv", but it says "hav". Tricky!',
      am: 'አምስተኛው ማስታወሻ በጓሮው በር ላይ ነበር። «We have a surprise for you. Come here!» (ላንቺ ድንገተኛ ስጦታ አለን። ወደዚህ ነዪ!) ፀሐይ አንድ ጊዜም ሳታቆም ሁሉንም አነበበችው። «Have» «ሄቭ» የሚል ይመስላል፤ ግን «ሃቭ» ይላል። አታላይ!',
    },
    {
      en: 'Round the back of the house… "SURPRISE!" There were Mama and Papa, baby Dawit, Grandma, Anbessa and all her friends. "Happy birthday, Tsehay!" There was a big round bread with a candle on top.',
      am: 'ከቤቱ ጀርባ ስትዞር… «SURPRISE!» እማማና አባባ፣ ሕፃኑ ዳዊት፣ አያቴ፣ አንበሳና ጓደኞቿ ሁሉ ነበሩ። «Happy birthday, Tsehay!» (መልካም ልደት፣ ፀሐይ!) በላዩ ላይ ሻማ ያለበት ትልቅ ክብ ዳቦ ነበር።',
    },
    {
      en: '"Who wrote the notes?" asked Tsehay. "We did," said Mama. "We used the trickiest words we could find. We knew you could read them!"',
      am: '«ማስታወሻዎቹን ማን ጻፋቸው?» ብላ ጠየቀች ፀሐይ። «እኛ» አለች እማማ። «ያገኘናቸውን በጣም አታላይ ቃላት ተጠቀምን። ልታነቢያቸው እንደምትችዪ እናውቅ ነበር!»',
    },
    {
      en: 'Then Tsehay taught everyone her trick. Even Grandma wrote "said" in the dust with a stick. Look, say, cover, write, check! "She did it!" laughed Gugu. "She, he, we, they: we ALL did it!"',
      am: 'ከዚያ ፀሐይ ዘዴዋን ለሁሉም አስተማረች። አያቴ እንኳ በዱላ አቧራው ላይ «said» ብላ ጻፈች። Look, say, cover, write, check! «She did it!» (እሷ አደረገችው!) ብሎ ሳቀ ጉጉ። «She, he, we, they፦ ሁላችንም አደረግነው!»',
    },
    {
      en: "Tricky words: he, she, we, you, they, was, said, have, do, to, come, here. Look, say, cover, write, check! Which tricky word will you learn today, {name}?",
      am: "አታላይ ቃላት፦ he፣ she፣ we፣ you፣ they፣ was፣ said፣ have፣ do፣ to፣ come፣ here። Look, say, cover, write, check! {name}፣ ዛሬ የትኛውን አታላይ ቃል ትማራላችሁ?",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why couldn't Tsehay sound out \"come\" or \"said\"?", "What are the five steps of Tsehay's trick?"],
      am: ["ፀሐይ «come»ን ወይም «said»ን ድምፅ በማጣመር ለምን ማንበብ አልቻለችም?", "የፀሐይ ዘዴ አምስቱ ደረጃዎች ምንድን ናቸው?"],
    },
    activity: {
      en: 'Write two or three tricky words on small cards (start with said, was and come). For each: look at it, say it, cover it, write it from memory (with a stick in sand, a finger on a table, or a pencil), then uncover it and check. Then leave your child a little note using the words, like Tsehay\'s family did: "Come to the door. We have a surprise for you!" These words are some of the most common in English, so knowing them by sight makes reading much easier.',
      am: 'ሁለት ወይም ሦስት አታላይ ቃላትን በትናንሽ ካርዶች ላይ ጻፉ (በsaid፣ was እና come ጀምሩ)። ለእያንዳንዱ፦ ተመልከቱት፣ በሉት፣ ሸፍኑት፣ ከትውስታ ጻፉት (በአሸዋ ላይ በዱላ፣ በጠረጴዛ ላይ በጣት፣ ወይም በእርሳስ)፣ ከዚያ ገልጣችሁ አረጋግጡ። ከዚያም እንደ ፀሐይ ቤተሰብ እነዚህን ቃላት የያዘ ትንሽ ማስታወሻ ለልጅዎ ይተዉ፦ «Come to the door. We have a surprise for you!» እነዚህ ቃላት በእንግሊዝኛ በጣም ከተለመዱት መካከል ናቸው፤ በማየት ማወቃቸው ማንበብን በጣም ያቀላል።',
    },
  },
};

export default story;
