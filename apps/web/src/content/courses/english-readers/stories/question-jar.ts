import type { Story } from "../../../stories";

/*
  "The Question Jar" (level 5: who, what, where, when, why, how).
  Hawi's class project: find out about someone's childhood. Hawi asks Grandpa Tolosa "Tell me
  about when you were little," and he just says "It was a long time ago." Hawi works out that a
  big question gets a small answer, so she writes the six question words on sticks and puts them
  in a jar. She pulls one at a time: Where did you live? When did you start school? How did you
  get there? Why so far? Who was your best friend? What did you play? Now Grandpa tells stories
  all evening, and Hawi's project is the best in the class.
  Join-in line: "Pick a stick, ask, and listen!"

  English taught: the question words who, what, where, when, why, how, and short questions with
  did: Where did you live? When did you start school? How did you get there?

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «እንጨት አውጣ፣ ጠይቅ፣ አዳምጥ!» and Grandpa's childhood details.
*/
const story: Story = {
  id: "question-jar",
  course: "english-readers",
  pack: "story",
  title: { en: "The Question Jar", am: "የጥያቄ ማሰሮ" },
  category: "English",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#C42A5A",
  scene: "lib-question-jar",
  coverPage: 3,
  teaches: { words: ["who", "what", "where", "when", "why", "how", "Where did you live?", "How did you get there?"] },
  pages: [
    {
      en: "Teacher Meron gave a project: \"Find out about someone's childhood.\" Hawi ran to Grandpa Tolosa. \"Tell me about when you were little!\"",
      am: "መምህርት መሮን ፕሮጀክት ሰጠች፦ «የአንድን ሰው ልጅነት ጠይቃችሁ ኑ።» ሀዊ ወደ አያት ቶሎሳ ሮጠች። «ትንሽ ሳሉ ስለነበረው ንገሩኝ!»",
    },
    {
      en: "Grandpa scratched his head. \"Hmm. It was a long time ago.\" And that was all. Hawi's page was empty.",
      am: "አያት ራሳቸውን አከኩ። «እም። ከብዙ ዘመን በፊት ነበር።» ይኸው ብቻ። የሀዊ ገጽ ባዶ ነበር።",
    },
    {
      en: "Hawi thought. \"A big question gets a small answer. I need small questions!\" She wrote six question words on six sticks.",
      am: "ሀዊ አሰበች። «ትልቅ ጥያቄ ትንሽ መልስ ያመጣል። ትንንሽ ጥያቄዎች ያስፈልጉኛል!» ስድስት የጥያቄ ቃላትን በስድስት እንጨቶች ላይ ጻፈች።",
    },
    {
      en: "Who? What? Where? When? Why? How? She put them in a jar. \"Pick a stick, ask, and listen!\"",
      am: "Who? (ማን?) What? (ምን?) Where? (የት?) When? (መቼ?) Why? (ለምን?) How? (እንዴት?) ማሰሮ ውስጥ አስገባቻቸው። «Pick a stick, ask, and listen!»",
    },
    {
      en: "She pulled out WHERE. \"Where did you live?\" \"High in the Bale Mountains, in a round house, with five brothers.\"",
      am: "WHERE አወጣች። «Where did you live?» (የት ይኖሩ ነበር?) «ከፍ ባሉት የባሌ ተራሮች፣ በክብ ቤት፣ ከአምስት ወንድሞቼ ጋር።»",
    },
    {
      en: "Next, WHEN. \"When did you start school?\" \"When I was seven. The school was a long way from home.\"",
      am: "ቀጥሎ WHEN። «When did you start school?» (ትምህርት መቼ ጀመሩ?) «ሰባት ዓመቴ ሲሆን። ትምህርት ቤቱ ከቤት ሩቅ ነበር።»",
    },
    {
      en: "Then HOW. \"How did you get there?\" \"I walked, for two hours, over the hills. Every day!\" Hawi's eyes went wide.",
      am: "ከዚያ HOW። «How did you get there?» (እንዴት ይሄዱ ነበር?) «በእግሬ፣ ለሁለት ሰዓት፣ ኮረብታዎችን አልፌ። በየቀኑ!» የሀዊ ዓይኖች ተከፈቱ።",
    },
    {
      en: "WHY. \"Why did you walk so far?\" \"Because I wanted to read,\" said Grandpa. \"I wanted it more than anything.\"",
      am: "WHY። «Why did you walk so far?» (ለምን ያን ያህል ሩቅ ሄዱ?) «Because I wanted to read» (ማንበብ ስለፈለግሁ) አሉ አያት። «ከምንም በላይ።»",
    },
    {
      en: "WHO. \"Who was your best friend?\" \"Chala. We walked to school together, and we sang all the way.\"",
      am: "WHO። «Who was your best friend?» (የቅርብ ጓደኛዎ ማን ነበር?) «ጫላ። አብረን ወደ ትምህርት ቤት እንሄድ ነበር፤ መንገዱን ሁሉ እንዘምር ነበር።»",
    },
    {
      en: "WHAT. \"What did you play?\" Grandpa laughed. \"Hide and seek, with the sheep! The sheep always won.\" Pick a stick, ask, and listen!",
      am: "WHAT። «What did you play?» (ምን ይጫወቱ ነበር?) አያት ሳቁ። «ድብብቆሽ፣ ከበጎቹ ጋር! ሁልጊዜ በጎቹ ያሸንፉ ነበር።»",
    },
    {
      en: "Grandpa told stories until the fire went low. Hawi's page was full. Her project was the best in the class.",
      am: "አያት እሳቱ እስኪበርድ ድረስ ታሪክ ነገሩ። የሀዊ ገጽ ሞላ። ፕሮጀክቷ ከክፍሉ ሁሉ ምርጥ ሆነ።",
    },
    {
      en: "Who? What? Where? When? Why? How? Pick a stick, ask, and listen! Who will you ask about their childhood, {name}?",
      am: "Who? What? Where? When? Why? How? Pick a stick, ask, and listen! {name}፣ ስለ ልጅነታቸው ማንን ትጠይቃላችሁ?",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why didn't Grandpa say much the first time?", "Which question words did Hawi use? Which answer surprised you?"],
      am: ["አያት መጀመሪያ ለምን ብዙ አልተናገሩም?", "ሀዊ የትኞቹን የጥያቄ ቃላት ተጠቀመች? የትኛው መልስ አስገረማችሁ?"],
    },
    activity: {
      en: 'Make a question jar: write who, what, where, when, why and how on six slips of paper. Your child picks one and asks a grandparent, a neighbor or you a question that starts with that word. Help them write down one answer each time.',
      am: 'የጥያቄ ማሰሮ ሥሩ፦ who፣ what፣ where፣ when፣ why እና howን በስድስት ወረቀቶች ላይ ጻፉ። ልጅዎ አንዱን አውጥቶ በዚያ ቃል የሚጀምር ጥያቄ አያትን፣ ጎረቤትን ወይም እርስዎን ይጠይቅ። በእያንዳንዱ ጊዜ አንድ መልስ እንዲጽፍ ይርዱት።',
    },
  },
};

export default story;
