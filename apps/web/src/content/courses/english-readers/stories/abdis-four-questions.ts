import type { Story } from "../../../stories";

/*
  "Abdi's Four Questions" (level 5: talking with a new friend at school).
  It is Abdi's first day at big school and he knows no one. Ayan teaches him four questions and a
  rule: ask, listen, smile. He tries them on Lensa (Hawi's cousin), who is swinging alone; his mind
  goes blank before the last question, then he sees her ball and remembers. They play, Lensa asks
  him questions too, and after school Abdi can tell Ayan all about his new friend.
  Join-in line: "Ask, listen, smile!"

  English taught: What's your name? How old are you? Where do you live? Do you want to play?
  My name is… I'm six. Yes, please! What's your favorite color?

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ጠይቅ፣ አዳምጥ፣ ፈገግ በል!».
*/
const story: Story = {
  id: "abdis-four-questions",
  course: "english-readers",
  pack: "story",
  title: { en: "Abdi's Four Questions", am: "የአብዲ አራት ጥያቄዎች" },
  category: "English",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#F08A24",
  scene: "lib-abdis-four-questions",
  coverPage: 7,
  teaches: { words: ["What's your name?", "How old are you?", "Where do you live?", "Do you want to play?", "Yes, please!"] },
  pages: [
    {
      en: "It was Abdi's first day at big school. He held Ayan's hand tight. \"I don't know anyone,\" he whispered.",
      am: "የአብዲ የትልቁ ትምህርት ቤት የመጀመሪያ ቀን ነበር። የአያንን እጅ አጥብቆ ያዘ። «ማንንም አላውቅም» አለ በሹክሹክታ።",
    },
    {
      en: "\"Ask, listen, smile!\" said Ayan. \"Ask a question, listen to the answer, and smile. I'll teach you four questions.\"",
      am: "«Ask, listen, smile!» (ጠይቅ፣ አዳምጥ፣ ፈገግ በል!) አለች አያን። «አራት ጥያቄዎች አስተምርሃለሁ።»",
    },
    {
      en: "\"What's your name? How old are you? Where do you live? Do you want to play?\" Abdi said them again and again.",
      am: "«What's your name? How old are you? Where do you live? Do you want to play?» አብዲ ደጋግሞ አላቸው።",
    },
    {
      en: "In the yard, a girl was on the swing, all alone. Abdi's tummy flipped. He took a big breath. Ask, listen, smile!",
      am: "በግቢው ውስጥ አንዲት ልጅ ብቻዋን ዥዋዥዌ ላይ ነበረች። የአብዲ ሆድ ተገለባበጠ። ትልቅ ትንፋሽ ወሰደ። Ask, listen, smile!",
    },
    {
      en: "\"Hello! What's your name?\" \"My name is Lensa.\" Abdi listened, and he smiled.",
      am: "«Hello! What's your name?» (ስምሽ ማን ነው?) «My name is Lensa.» አብዲ አዳመጠ፤ ፈገግም አለ።",
    },
    {
      en: "\"How old are you?\" \"I'm six. How old are you?\" \"I'm six too!\" They both laughed.",
      am: "«How old are you?» (ዕድሜሽ ስንት ነው?) «I'm six. How old are you?» «I'm six too!» (እኔም ስድስት ነኝ!) ሁለቱም ሳቁ።",
    },
    {
      en: "\"Where do you live?\" \"Near the big tree, next to my cousin Hawi.\" Then Abdi's mind went blank. What was the last question?",
      am: "«Where do you live?» (የት ነው የምትኖሪው?) «ከትልቁ ዛፍ አጠገብ፣ ከአጎቴ ልጅ ከሀዊ ቤት አጠገብ።» ከዚያ አብዲ ጠፋበት። የመጨረሻው ጥያቄ ምን ነበር?",
    },
    {
      en: "Then he saw a ball by the swing. He remembered! \"Do you want to play?\" \"Yes, please!\" said Lensa.",
      am: "ከዚያ በዥዋዥዌው አጠገብ ኳስ አየ። አስታወሰ! «Do you want to play?» (መጫወት ትፈልጊያለሽ?) «Yes, please!» አለች ለንሳ።",
    },
    {
      en: "They played until the bell rang. Lensa asked questions too. \"What's your favorite color?\" \"Green!\" Ask, listen, smile!",
      am: "ደወሉ እስኪደወል ተጫወቱ። ለንሳም ጠየቀች። «What's your favorite color?» (የምትወደው ቀለም ምንድን ነው?) «Green!» Ask, listen, smile!",
    },
    {
      en: "After school, Ayan asked, \"Did you make a friend?\" \"Yes! Her name is Lensa. She's six, and she lives near Hawi.\"",
      am: "ከትምህርት በኋላ አያን «ጓደኛ አገኘህ?» ብላ ጠየቀች። «አዎ! ስሟ ለንሳ ነው። ስድስት ዓመቷ ነው፤ ከሀዊ ቤት አጠገብ ትኖራለች።»",
    },
    {
      en: "\"How do you know all that?\" asked Ayan. Abdi grinned. \"I asked, I listened, and I smiled!\"",
      am: "«ይህን ሁሉ እንዴት አወቅህ?» ብላ ጠየቀች አያን። አብዲ ፈገግ አለ። «ጠየቅሁ፣ አዳመጥሁ፣ ፈገግም አልሁ!»",
    },
    {
      en: "Ask, listen, smile! Which question would you ask a new friend, {name}?",
      am: "Ask, listen, smile! {name}፣ አዲስ ጓደኛን የትኛውን ጥያቄ ትጠይቃላችሁ?",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["What were Abdi's four questions?", "What helped Abdi when his mind went blank?"],
      am: ["የአብዲ አራት ጥያቄዎች ምን ነበሩ?", "አብዲ በጠፋበት ጊዜ የረዳው ምንድን ነው?"],
    },
    activity: {
      en: 'Act it out: you are the new child in the yard and your child asks the four questions in English: What\'s your name? How old are you? Where do you live? Do you want to play? Answer with full sentences ("My name is…", "I\'m seven.") and then swap. Remind them: ask, listen, smile.',
      am: 'አብራችሁ ተዋወቁ፦ እርስዎ በግቢው ውስጥ ያለው አዲሱ ልጅ ይሁኑ፤ ልጅዎ አራቱን ጥያቄዎች በእንግሊዝኛ ይጠይቅ፦ What\'s your name? How old are you? Where do you live? Do you want to play? በሙሉ ዓረፍተ ነገር ይመልሱ («My name is…»፣ «I\'m seven.»)፤ ከዚያ ቦታ ተቀያየሩ። ያስታውሱት፦ ጠይቅ፣ አዳምጥ፣ ፈገግ በል።',
    },
  },
};

export default story;
