import type { Story } from "../../../stories";

/*
  "Big Letter, Little Dot" (level 6: capital letters and full stops).
  Anbessa writes picnic notes in a hurry, all in one long line with no capital letters and no full
  stops: "come to the river at three bring a cup gugu can come too". Hawi brings three cups, Gugu
  wonders who "cup gugu" is, and the picnic is a muddle. Teacher Meron shows the rule (a capital
  letter at the start of a sentence, a full stop at the end; capitals for names and for I), and
  Anbessa rewrites the note as three clear sentences. The next day's picnic works.
  Join-in line: "Big letter at the start, little dot at the end!"

  English taught: sentences start with a capital letter and end with a full stop; names and the
  word I always have a capital letter. (Americans also call the full stop a "period"; the course
  uses "full stop", as the brief asks, and mentions period in the grown-ups' note.)

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «መጀመሪያ ትልቅ ፊደል፣ መጨረሻ ትንሽ ነጥብ!».
*/
const story: Story = {
  id: "big-letter-little-dot",
  course: "english-readers",
  pack: "story",
  title: { en: "Big Letter, Little Dot", am: "ትልቅ ፊደል፣ ትንሽ ነጥብ" },
  category: "English",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#E8413B",
  scene: "lib-big-letter-little-dot",
  coverPage: 8,
  teaches: { words: ["capital letter", "full stop", "sentence", "I", "names"] },
  pages: [
    {
      en: "Anbessa wanted to have a picnic by the river. He wrote notes for his friends, very fast, because he was so excited.",
      am: "አንበሳ በወንዙ ዳር ሽርሽር ማድረግ ፈለገ። በጣም ስለተደሰተ ለጓደኞቹ ማስታወሻ በፍጥነት ጻፈ።",
    },
    {
      en: "This is what the notes said: \"come to the river at three bring a cup gugu can come too\"",
      am: "ማስታወሻዎቹ እንዲህ ይሉ ነበር፦ «come to the river at three bring a cup gugu can come too»",
    },
    {
      en: "Hawi read it. \"At three bring a cup? Three cups?\" So she packed three cups.",
      am: "ሀዊ አነበበችው። «At three bring a cup? ሦስት ኩባያ?» ስለዚህ ሦስት ኩባያ ያዘች።",
    },
    {
      en: "Gugu read it. \"Bring a cup gugu? Who is Cup Gugu?\" He scratched his head. \"Can I come, or not?\"",
      am: "ጉጉ አነበበው። «Bring a cup gugu? ካፕ ጉጉ ማን ነው?» ራሱን አከከ። «መምጣት እችላለሁ ወይስ አልችልም?»",
    },
    {
      en: "At three, Hawi came with three cups. Gugu came late, with no cup. Tsehay didn't come at all. It was a muddle.",
      am: "በሦስት ሰዓት ሀዊ ሦስት ኩባያ ይዛ መጣች። ጉጉ ያለ ኩባያ ዘግይቶ መጣ። ፀሐይ ጭራሽ አልመጣችም። ተደበላለቀ።",
    },
    {
      en: "Teacher Meron looked at the note. \"Your words are good, Anbessa. But where does each sentence start and stop?\"",
      am: "መምህርት መሮን ማስታወሻውን ተመለከተች። «ቃላትህ ጥሩ ናቸው፣ አንበሳ። ግን እያንዳንዱ ዓረፍተ ነገር የት ይጀምራል፣ የት ያልቃል?»",
    },
    {
      en: "\"A sentence starts with a big letter, a capital. It ends with a little dot, a full stop. Big letter at the start, little dot at the end!\"",
      am: "«ዓረፍተ ነገር በትልቅ ፊደል ይጀምራል። በትንሽ ነጥብ (full stop) ያልቃል። Big letter at the start, little dot at the end!»",
    },
    {
      en: "\"And names always start with a capital, like Gugu and Hawi. So does I, when you mean me: I.\"",
      am: "«ስሞችም ሁልጊዜ በትልቅ ፊደል ይጀምራሉ፤ እንደ Gugu እና Hawi። «እኔ» ማለት የሆነው Iም ሁልጊዜ ትልቅ ነው፦ I።»",
    },
    {
      en: "Anbessa wrote it again: \"Come to the river at three. Bring a cup. Gugu can come too.\" Big letter at the start, little dot at the end!",
      am: "አንበሳ እንደገና ጻፈው፦ «Come to the river at three. Bring a cup. Gugu can come too.» Big letter at the start, little dot at the end!",
    },
    {
      en: "Gugu read it. \"Oh! Three sentences. One cup each. And I can come too!\" He did a happy flip.",
      am: "ጉጉ አነበበው። «ኦ! ሦስት ዓረፍተ ነገሮች። ለእያንዳንዱ አንድ ኩባያ። እኔም መምጣት እችላለሁ!» በደስታ ተገለባበጠ።",
    },
    {
      en: "The next day, everyone came at three, with one cup each. They had tea and bread by the river.",
      am: "በማግስቱ ሁሉም በሦስት ሰዓት፣ እያንዳንዳቸው አንድ ኩባያ ይዘው መጡ። በወንዙ ዳር ሻይና ዳቦ በሉ።",
    },
    {
      en: "Big letter at the start, little dot at the end! Can you write a note to a friend, {name}?",
      am: "Big letter at the start, little dot at the end! {name}፣ ለጓደኛችሁ ማስታወሻ መጻፍ ትችላላችሁ?",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why did Hawi bring three cups?", "Where do capital letters go? Where does the full stop go?"],
      am: ["ሀዊ ለምን ሦስት ኩባያ አመጣች?", "ትልልቅ ፊደሎች የት ይገባሉ? ነጥቡስ የት ይገባል?"],
    },
    activity: {
      en: 'Write a line with no capitals or full stops ("my cat is gray she likes milk"). Your child reads it, finds where each sentence starts and stops, and fixes it with a colored pencil. (In American English the full stop is also called a "period".)',
      am: 'ትልልቅ ፊደልና ነጥብ የሌለው መስመር ጻፉ («my cat is gray she likes milk»)። ልጅዎ ያንብበው፤ እያንዳንዱ ዓረፍተ ነገር የት እንደሚጀምርና እንደሚያልቅ ፈልጎ በቀለም እርሳስ ያስተካክለው። (በአሜሪካ እንግሊዝኛ full stop «period» ተብሎም ይጠራል።)',
    },
  },
};

export default story;
