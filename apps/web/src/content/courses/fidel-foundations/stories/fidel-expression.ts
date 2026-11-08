import type { Story } from "../../../stories";

/*
  "Say It Like You Mean It" (Fidel Foundations, level 6): reading with expression, and what the
  marks tell your voice. On a rainy afternoon Grandma writes ዝሆን መጣ። ("The elephant came."),
  then changes the mark: ዝሆን መጣ? (a question, the voice goes up) and ዝሆን መጣ! (wow!). Just as
  they shout it, the baby elephant from "The Elephant's Swing" really does knock at the door.
  More voices follow: sleepy (ዝሆን ደከመች።), a list with the comma ፣ (ሻይ፣ ዳቦ፣ ሙዝ።), and sad,
  happy and wondering ones. The join-in line is "Same words, different voice!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line (ያው ቃላት፣ የተለየ ድምፅ!), the names of the marks (የጥያቄ ምልክት, ቃለ አጋኖ, ነጠላ ሰረዝ,
  አራት ነጥብ) and «ስኒዎቹ እስኪንቀጫቀጩ» (page 5).
*/
const story: Story = {
  id: "fidel-expression",
  course: "fidel-foundations",
  pack: "fidel",
  title: { en: "Say It Like You Mean It", am: "እንደ ስሜቱ አንብቡት" },
  category: "Fidel",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#6A4BB6",
  scene: "lib-fidel-expression",
  coverPage: 5,
  teaches: { words: ["ዝሆን መጣ።", "ዝሆን መጣ?", "ዝሆን መጣ!", "ሻይ፣ ዳቦ፣ ሙዝ።"] },
  pages: [
    {
      en: `It's a rainy afternoon, and Grandma is teaching a new game. She writes two words on the board: ዝሆን መጣ። "Read it, Anbessa."`,
      am: "ዝናባማ ከሰዓት ነው፤ አያቴ አዲስ ጨዋታ እያስተማረች ነው። በሰሌዳው ላይ ሁለት ቃላት ጻፈች፦ ዝሆን መጣ። «አንብበው፣ አንበሳ።»",
    },
    {
      en: `"ዝሆን መጣ። The elephant came." He reads it in a plain, steady voice, and stops at the four dots. "Good," says Grandma. "That's telling."`,
      am: "«ዝሆን መጣ።» ተራ በሆነ የተረጋጋ ድምፅ አነበበው፤ አራቱ ነጥቦች ላይም ቆመ። «ጎበዝ» አለች አያቴ። «ያ መንገር ነው።»",
    },
    {
      en: `Then she rubs out the four dots and draws a hook: ዝሆን መጣ? "This is a question mark. Your voice goes up at the end, as if you're wondering." Same words, different voice!`,
      am: "ከዚያ አራቱን ነጥቦች አጥፍታ መንጠቆ ሣለች፦ ዝሆን መጣ? «ይህ የጥያቄ ምልክት ነው። እንደሚገረም ሰው ድምፅህ መጨረሻ ላይ ከፍ ይላል።» ያው ቃላት፣ የተለየ ድምፅ!",
    },
    {
      en: `"ዝሆን መጣ?" asks Anbessa, looking all round the room. Is there an elephant? Gugu peeks under the table. No elephant.`,
      am: "«ዝሆን መጣ?» ብሎ ጠየቀ አንበሳ፣ በክፍሉ ዙሪያ እየተመለከተ። ዝሆን አለ እንዴ? ጉጉ ከጠረጴዛው ሥር አጮለቀ። ዝሆን የለም።",
    },
    {
      en: `Now Grandma draws a line with a dot under it: ዝሆን መጣ! "This one is for surprise and excitement. Say it big!" Same words, different voice!`,
      am: "አሁን አያቴ ከሥሩ ነጥብ ያለው መስመር ሣለች፦ ዝሆን መጣ! «ይህ ለመደነቅና ለመደሰት ነው። በትልቁ በሉት!» ያው ቃላት፣ የተለየ ድምፅ!",
    },
    {
      en: `"ዝሆን መጣ!" shout Anbessa, Gugu and Lali together, so loudly that the cups rattle. And then… THUMP, THUMP. Someone really is at the door!`,
      am: "«ዝሆን መጣ!» ብለው አንበሳ፣ ጉጉና ላሊ አብረው ጮኹ፤ ስኒዎቹ እስኪንቀጫቀጩ ድረስ። ከዚያ… ዱብ፣ ዱብ። በእርግጥ አንድ ሰው በሩ ላይ አለ!",
    },
    {
      en: `It's the baby elephant from the swing, dripping with rain. "Can I come in?" Everybody laughs and laughs. ዝሆን መጣ! She really did!`,
      am: "ከዥዋዥዌው የምናውቃት ትንሿ ዝሆን ናት፣ በዝናብ ርሳ። «መግባት እችላለሁ?» ሁሉም ሳቁ፣ ሳቁ። ዝሆን መጣ! በእርግጥም መጣች!",
    },
    {
      en: `Grandma writes a new sentence for her: ዝሆን ደከመች። "The elephant is tired." "Read it in a sleepy voice," says Lali. "ዝሆን… ደከመች…" yawns Anbessa. Same words, different voice!`,
      am: "አያቴ አዲስ ዓረፍተ ነገር ጻፈችላት፦ ዝሆን ደከመች። «በእንቅልፋም ድምፅ አንብቡት» አለች ላሊ። «ዝሆን… ደከመች…» ብሎ አዛጋ አንበሳ። ያው ቃላት፣ የተለየ ድምፅ!",
    },
    {
      en: `Then the little comma, ፣, which means "take a tiny pause": ሻይ፣ ዳቦ፣ ሙዝ። "Tea, (pause) bread, (pause) bananas." Grandma brings exactly those for the elephant.`,
      am: "ከዚያ ትንሿ ነጠላ ሰረዝ፣ «ትንሽ ቆም በሉ» ማለት ናት፦ ሻይ፣ ዳቦ፣ ሙዝ። አያቴ ልክ እነዚህን ለዝሆኗ አመጣች።",
    },
    {
      en: "They play the game again and again. A sad voice: ኳሱ ጠፋ። A happy voice: ኳሱ ተገኘ! A wondering voice: ኳሱ የት ነው? Every mark tells your voice what to do.",
      am: "ጨዋታውን ደጋግመው ተጫወቱ። በሐዘን ድምፅ፦ ኳሱ ጠፋ። በደስታ ድምፅ፦ ኳሱ ተገኘ! በሚገረም ድምፅ፦ ኳሱ የት ነው? እያንዳንዱ ምልክት ድምፃችሁ ምን እንደሚያደርግ ይነግረዋል።",
    },
    {
      en: `"The marks are little signs for your voice," says Grandma. "Four dots say stop. ? says wonder. ! says wow. ፣ says pause." Anbessa nods. "And the words say what happened!"`,
      am: "«ምልክቶቹ ለድምፃችሁ ትንንሽ ምልክቶች ናቸው» አለች አያቴ። «አራት ነጥብ ‹ቁም› ይላል። የጥያቄ ምልክት ‹ተገረም› ይላል። ቃለ አጋኖ ‹ዋው› ይላል። ነጠላ ሰረዝ ‹ቆም በል› ይላል።» አንበሳ ራሱን ነቀነቀ። «ቃላቱ ደግሞ ምን እንደሆነ ይነግሩናል!»",
    },
    {
      en: `When the rain stops, the elephant waves goodbye with her trunk. Everyone waves back and shouts it with feeling: "ደህና ሁኚ!" Goodbye, with a great big !`,
      am: "ዝናቡ ሲያቆም ዝሆኗ በኩምቢዋ እያውለበለበች ተሰናበተች። ሁሉም እያውለበለቡ በስሜት ጮኹ፦ «ደህና ሁኚ!» በትልቅ ቃለ አጋኖ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Read ዝሆን መጣ። then ዝሆን መጣ? then ዝሆን መጣ! What changes in your voice?", "Which mark would you put after 'my birthday is tomorrow'? Why?"],
      am: ["ዝሆን መጣ።፣ ከዚያ ዝሆን መጣ?፣ ከዚያ ዝሆን መጣ! ብላችሁ አንብቡ። በድምፃችሁ ላይ ምን ይቀየራል?", "«ነገ የልደት ቀኔ ነው» ከሚለው በኋላ የትኛውን ምልክት ታደርጋላችሁ? ለምን?"],
    },
    activity: {
      en: "Write one short sentence three times on three cards, ending with ።, ? and !. Take turns: one person picks a card and reads it with the right voice; the other guesses which mark it was.",
      am: "አንድ አጭር ዓረፍተ ነገር በሦስት ካርዶች ላይ በአራት ነጥብ፣ በጥያቄ ምልክትና በቃለ አጋኖ አድርጋችሁ ጻፉ። በየተራ፦ አንዱ ካርድ መርጦ በትክክለኛው ድምፅ ያንብብ፤ ሌላው የትኛው ምልክት እንደሆነ ይገምት።",
    },
  },
};

export default story;
