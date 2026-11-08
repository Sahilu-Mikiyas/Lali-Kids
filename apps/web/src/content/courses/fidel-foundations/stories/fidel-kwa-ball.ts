import type { Story } from "../../../stories";

/*
  "Ball and Friends ኳ ጓ" (Fidel Foundations, level 5): the "wa" forms, the extra look many
  families have, with a little tail that adds "wa": ኳ is ኩ and አ said quickly together, "kwa".
  On a Saturday football afternoon the friends read the words on their things: ኳስ (ball),
  ጓደኛ (friend), ቋንቋ (language: Qeyu shouts in fox language), ቧንቧ (water tap). Lali finds tails
  everywhere: ሏ ሟ ሯ ሷ ቧ ቷ ኗ. Every other letter in these words is already known.
  The join-in line is "Kick, kick, pass the ball!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the name for these forms (the story just says «የ‹ዋ› መልክ» and «ጅራት»), the join-in line
  (ምታ፣ ምታ፣ ኳሱን አቀብል!) and the football words (አቀበለ, ጎል, በራሱ ገጨ).
*/
const story: Story = {
  id: "fidel-kwa-ball",
  course: "fidel-foundations",
  pack: "fidel",
  title: { en: "Ball and Friends ኳ ጓ", am: "ኳስና ጓደኞች ኳ ጓ" },
  category: "Fidel",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#3E9B5A",
  scene: "lib-fidel-kwa-ball",
  coverPage: 3,
  teaches: { fidel: ["ኳ", "ጓ", "ቋ", "ቧ"], words: ["ኳስ", "ጓደኛ", "ቋንቋ", "ቧንቧ"] },
  pages: [
    {
      en: "Saturday afternoon: football time! Anbessa, Gugu, Lali and Qeyu the fox run to the dusty field. Kick, kick, pass the ball!",
      am: "የቅዳሜ ከሰዓት፦ የእግር ኳስ ሰዓት! አንበሳ፣ ጉጉ፣ ላሊና ቀበሮው ቀዩ ወደ አቧራማው ሜዳ ሮጡ። ምታ፣ ምታ፣ ኳሱን አቀብል!",
    },
    {
      en: `Anbessa holds up the ball. Someone has written on it: ኳስ. "ኳ… ስ…" he reads, then stops. "What's this little tail on ከ?"`,
      am: "አንበሳ ኳሱን ከፍ አደረገ። አንድ ሰው በላዩ ላይ ጽፏል፦ ኳስ። «ኳ… ስ…» ብሎ አንብቦ ቆመ። «ከ ላይ ያለው ይህ ትንሽ ጅራት ምንድን ነው?»",
    },
    {
      en: `Grandma calls from the fence. "That's the 'wa' form! Many letters have one more look, with a little tail that adds 'wa'. ኩ and አ said quickly together: ኳ, 'kwa'!"`,
      am: "አያቴ ከአጥሩ ጠራች። «ያ የ‹ዋ› መልክ ነው! ብዙ ፊደሎች ‹ዋ› የሚጨምር ትንሽ ጅራት ያለው አንድ ተጨማሪ መልክ አላቸው። ኩ እና አ በፍጥነት አንድ ላይ ሲባሉ፦ ኳ!»",
    },
    {
      en: `"ኳ… ስ… ኳስ!" Ball! Anbessa kicks it high, and it lands at Gugu's feet. Kick, kick, pass the ball!`,
      am: "«ኳ… ስ… ኳስ!» አንበሳ ከፍ አድርጎ መታው፤ ጉጉ እግር ሥር አረፈ። ምታ፣ ምታ፣ ኳሱን አቀብል!",
    },
    {
      en: `Gugu passes to Qeyu and shouts, "Good pass, friend!" Friend is ጓደኛ: "ጓ… ደ… ኛ… ጓደኛ!" ጓ is ገ with the 'wa' tail: "gwa".`,
      am: "ጉጉ ለቀዩ አቀበለና «ጎበዝ፣ ጓደኛዬ!» ብሎ ጮኸ። «ጓ… ደ… ኛ… ጓደኛ!» ጓ የ‹ዋ› ጅራት ያለው ገ ነው።",
    },
    {
      en: `Qeyu dribbles, tap, tap, tap, then shouts something in fox language. Nobody understands! "That's a different language, a ቋንቋ," laughs Grandma. "ቋ… ን… ቋ… ቋንቋ!"`,
      am: "ቀዩ ኳሱን እየገፋ ሄዶ ድንገት በቀበሮ ቋንቋ አንድ ነገር ጮኸ። ማንም አልገባውም! «ያ ሌላ ቋንቋ ነው» አለች አያቴ እየሳቀች። «ቋ… ን… ቋ… ቋንቋ!»",
    },
    {
      en: "Lali buzzes round the field, looking for more tails, and finds them everywhere: ሏ, ሟ, ሯ, ሷ, ቧ, ቷ, ኗ… lwa, mwa, rwa, swa! Kick, kick, pass the ball!",
      am: "ላሊ ተጨማሪ ጅራቶችን ለማግኘት በሜዳው ዙሪያ በረረች፤ በየቦታው አገኘቻቸው፦ ሏ፣ ሟ፣ ሯ፣ ሷ፣ ቧ፣ ቷ፣ ኗ… ምታ፣ ምታ፣ ኳሱን አቀብል!",
    },
    {
      en: "Goal! Gugu scores, and everybody hugs. Then they all flop down on the grass, hot and thirsty.",
      am: "ጎል! ጉጉ አገባ፤ ሁሉም ተቃቀፉ። ከዚያ ሁሉም ደክሟቸውና ተጠምተው ሣሩ ላይ ዘፍ አሉ።",
    },
    {
      en: `By the field there is a water tap. "ቧ… ን… ቧ… ቧንቧ!" reads Anbessa. "ቧ is በ with the 'wa' tail!" He turns it on. Splash! Cool water for everyone.`,
      am: "ከሜዳው አጠገብ የውሃ ቧንቧ አለ። «ቧ… ን… ቧ… ቧንቧ!» ብሎ አነበበ አንበሳ። «ቧ የ‹ዋ› ጅራት ያለው በ ነው!» ከፈተው። ፏ! ለሁሉም ቀዝቃዛ ውሃ።",
    },
    {
      en: `"Let's count our tail words," says Lali. "ኳስ, ጓደኛ, ቋንቋ, ቧንቧ. Four!" Gugu adds, "And the best one: we are all ጓደኞች, friends!"`,
      am: "«የጅራት ቃላቶቻችንን እንቁጠር» አለች ላሊ። «ኳስ፣ ጓደኛ፣ ቋንቋ፣ ቧንቧ። አራት!» ጉጉ ጨመረ፦ «ምርጡ ደግሞ፦ ሁላችንም ጓደኞች ነን!»",
    },
    {
      en: "The sun goes low and the shadows grow long. One last game: Qeyu kicks, Gugu passes, Anbessa heads it, and Lali buzzes it into the goal! Kick, kick, pass the ball!",
      am: "ፀሐይ ዝቅ አለች፤ ጥላዎቹም ረዘሙ። አንድ የመጨረሻ ጨዋታ፦ ቀዩ መታ፣ ጉጉ አቀበለ፣ አንበሳ በራሱ ገጨ፣ ላሊም ወደ ጎሉ አስገባችው! ምታ፣ ምታ፣ ኳሱን አቀብል!",
    },
    {
      en: `Walking home, Anbessa carries the ball under his arm. "ኳስ," he reads once more, tracing the little tail with his claw. "Kwa. Like a ball bouncing: kwa, kwa, kwa!"`,
      am: "ወደ ቤት ሲሄዱ አንበሳ ኳሱን በብብቱ ይዞ ነበር። «ኳስ» ብሎ አንድ ጊዜ ደግሞ አነበበ፣ ትንሿን ጅራት በጥፍሩ እየተከተለ። «ኳ። ልክ እንደሚነጥር ኳስ፦ ኳ፣ ኳ፣ ኳ!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["ኳ is ኩ and አ said quickly together. Try it: ኩ-አ, ኩአ, ኳ! Now try ጓ (ጉ-አ) and ቧ (ቡ-አ).", "Ethiopia has many languages, ቋንቋዎች. Which ones do people in your family speak?"],
      am: ["ኳ ኩ እና አ በፍጥነት አንድ ላይ ሲባሉ ነው። ሞክሩት፦ ኩ-አ፣ ኩአ፣ ኳ! አሁን ጓን (ጉ-አ) እና ቧን (ቡ-አ) ሞክሩ።", "ኢትዮጵያ ብዙ ቋንቋዎች አሏት። በቤተሰባችሁ ውስጥ ሰዎች የትኞቹን ይናገራሉ?"],
    },
    activity: {
      en: "Play 'tail spotting': on a packet, a sign or a book, look for letters with the little 'wa' tail (ኳ, ጓ, ቋ, ሏ, ሟ, ቧ…). Every one you find is a goal!",
      am: "«ጅራት ፍለጋ» ተጫወቱ፦ በፓኬት፣ በምልክት ወይም በመጽሐፍ ላይ ትንሿ የ«ዋ» ጅራት ያላቸውን ፊደሎች ፈልጉ (ኳ፣ ጓ፣ ቋ፣ ሏ፣ ሟ፣ ቧ…)። ያገኛችሁት ሁሉ ጎል ነው!",
    },
  },
};

export default story;
