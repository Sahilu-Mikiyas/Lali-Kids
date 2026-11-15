import type { Story } from "../../../stories";

/*
  "Gugu's Diary" (level 6: a diary entry about your day, and a little story of your own).
  Every evening Grandma asks what Gugu did, and every evening he says "Nothing." She gives him a
  diary. On Monday he can't think of anything until Grandma asks small questions; then he writes
  one or two sentences a day (football, a puddle, a hen on his head) and finds his days were never
  nothing. On Sunday Grandma asks for a story of his own; he doesn't know how to start, so she
  draws a frame: Once upon a time there was… One day… Then… In the end… He fills it in with a story
  about a little gelada who couldn't write, which sounds very familiar.
  Join-in line: "Today I…!"

  English taught: writing a diary entry in the past tense (Today I played… I jumped…); using a
  story frame: Once upon a time there was… One day… Then… In the end…; capital letters and full
  stops in his own writing.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  «ማስታወሻ ደብተር» for diary.
*/
const story: Story = {
  id: "gugus-diary",
  course: "english-readers",
  pack: "story",
  title: { en: "Gugu's Diary", am: "የጉጉ ማስታወሻ ደብተር" },
  category: "English",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#8E5BE0",
  scene: "lib-gugus-diary",
  coverPage: 8,
  teaches: { words: ["diary", "Today I…", "Once upon a time", "One day", "Then", "In the end"] },
  pages: [
    {
      en: "Every evening Grandma asked, \"What did you do today, Gugu?\" And every evening Gugu said, \"Nothing.\"",
      am: "አያቴ በየምሽቱ «ጉጉ፣ ዛሬ ምን አደረግህ?» ብላ ትጠይቅ ነበር። ጉጉም በየምሽቱ «ምንም» ይል ነበር።",
    },
    {
      en: "So Grandma gave him a little notebook. \"This is a diary. Every evening, write one or two sentences about your day.\"",
      am: "ስለዚህ አያቴ ትንሽ ደብተር ሰጠችው። «ይህ ማስታወሻ ደብተር ነው። በየምሽቱ ስለ ቀንህ አንድ ወይም ሁለት ዓረፍተ ነገር ጻፍ።»",
    },
    {
      en: "On Monday, Gugu sat with his pencil. \"Nothing happened.\" Grandma asked, \"Did you play? Did anything make you laugh?\"",
      am: "ሰኞ ጉጉ እርሳሱን ይዞ ተቀመጠ። «ምንም አልሆነም።» አያቴ ጠየቀች፦ «ተጫወትህ? ያሳቀህ ነገር ነበር?»",
    },
    {
      en: "Gugu wrote: \"Monday. Today I played football with Hawi. I scored a goal!\" A big letter at the start, a dot at the end. Today I…!",
      am: "ጉጉ ጻፈ፦ «Monday. Today I played football with Hawi. I scored a goal!» መጀመሪያ ትልቅ ፊደል፣ መጨረሻ ነጥብ። Today I…!",
    },
    {
      en: "Tuesday: \"Today it rained. I jumped in a puddle. Grandma was cross, but then she laughed.\" Today I…!",
      am: "ማክሰኞ፦ «Today it rained. I jumped in a puddle. Grandma was cross, but then she laughed.» Today I…!",
    },
    {
      en: "Wednesday: \"Today I helped Tsehay feed the hens. A hen sat on my head.\" Thursday: \"Today I read a book to Dawit.\"",
      am: "ረቡዕ፦ «Today I helped Tsehay feed the hens. A hen sat on my head.» ሐሙስ፦ «Today I read a book to Dawit.»",
    },
    {
      en: "By Friday, the diary was full of little things. Gugu read it all. \"My days aren't nothing! They're full of stuff!\"",
      am: "እስከ ዓርብ ድረስ ደብተሩ በትንንሽ ነገሮች ተሞላ። ጉጉ ሁሉንም አነበበ። «ቀኖቼ ምንም አይደሉም ማለት አይደለም! በብዙ ነገር የተሞሉ ናቸው!»",
    },
    {
      en: "On Sunday, Grandma said, \"Now write a story of your own.\" Gugu chewed his pencil. \"But how do I start?\"",
      am: "እሑድ አያቴ «አሁን የራስህን ታሪክ ጻፍ» አለች። ጉጉ እርሳሱን ነከሰ። «ግን እንዴት ልጀምር?»",
    },
    {
      en: "Grandma drew a frame: Once upon a time there was… One day… Then… In the end… \"Just fill in the gaps.\"",
      am: "አያቴ ማዕቀፍ ሣለች፦ Once upon a time there was… (በአንድ ወቅት… ነበር) One day… (አንድ ቀን…) Then… (ከዚያ…) In the end… (በመጨረሻ…) «ክፍተቶቹን ብቻ ሙላ።»",
    },
    {
      en: "Gugu wrote: \"Once upon a time there was a little gelada who could not write. One day his grandma gave him a notebook.\"",
      am: "ጉጉ ጻፈ፦ «Once upon a time there was a little gelada who could not write. One day his grandma gave him a notebook.»",
    },
    {
      en: "\"Then he wrote every day. In the end, he wrote a whole story!\" Grandma laughed. \"That story sounds very familiar!\"",
      am: "«Then he wrote every day. In the end, he wrote a whole story!» አያቴ ሳቀች። «ይህ ታሪክ የማውቀው ይመስላል!»",
    },
    {
      en: "Today I…! What did you do today, {name}? Can you write one sentence about it?",
      am: "Today I…! {name}፣ ዛሬ ምን አደረጋችሁ? ስለ እሱ አንድ ዓረፍተ ነገር መጻፍ ትችላላችሁ?",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why did Gugu think nothing happened? What helped him remember?", "What are the four parts of Grandma's story frame?"],
      am: ["ጉጉ ምንም አልሆነም ብሎ ለምን አሰበ? እንዲያስታውስ የረዳው ምንድን ነው?", "የአያቴ የታሪክ ማዕቀፍ አራቱ ክፍሎች ምንድን ናቸው?"],
    },
    activity: {
      en: 'Start a family diary: each evening your child writes (or tells you, and you write) one or two English sentences beginning "Today I…". At the weekend, give them the frame "Once upon a time there was… One day… Then… In the end…" to write a little story of their own.',
      am: 'የቤተሰብ ማስታወሻ ደብተር ጀምሩ፦ በየምሽቱ ልጅዎ በ«Today I…» የሚጀምሩ አንድ ወይም ሁለት የእንግሊዝኛ ዓረፍተ ነገሮችን ይጻፍ (ወይም ይንገርዎ፤ እርስዎ ይጻፉ)። በሳምንቱ መጨረሻ የራሱን ትንሽ ታሪክ እንዲጽፍ «Once upon a time there was… One day… Then… In the end…» የሚለውን ማዕቀፍ ይስጡት።',
    },
  },
};

export default story;
