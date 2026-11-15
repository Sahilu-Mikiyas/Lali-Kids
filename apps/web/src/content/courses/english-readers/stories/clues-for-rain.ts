import type { Story } from "../../../stories";

/*
  "What Will Happen Next?" (level 4: predicting from clues).
  Hooyo hangs the washing out and goes to the market. Ayan notices three clues: dark clouds over
  the hills, a wind getting stronger, birds flying home. Abdi says the sun is out, so they will
  play all day. Ayan predicts rain, explains what "predict" means (guessing what happens next
  from clues), and takes the washing in while Abdi laughs. The rain pours down; Hooyo comes home to
  dry washing. Then Abdi reads the new clues himself (the sun coming out while it still drizzles)
  and predicts a rainbow, and he is right.
  Join-in line: "Look at the clues: what will happen next?"

  English taught: predict, clue, "I think… will…", "What will happen next?"; reading clues in
  words and pictures. Fact: dark clouds and a rising wind often come before rain; a rainbow
  appears when the sun shines on falling rain.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ፍንጮቹን ተመልከቱ፦ ቀጥሎ ምን ይሆናል?» and «መገመት» for predict.
*/
const story: Story = {
  id: "clues-for-rain",
  course: "english-readers",
  pack: "story",
  title: { en: "What Will Happen Next?", am: "ቀጥሎ ምን ይሆናል?" },
  category: "English",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#4A6FA8",
  scene: "lib-clues-for-rain",
  coverPage: 10,
  teaches: { words: ["predict", "clue", "next", "I think", "will", "clouds", "wind", "rain", "rainbow"] },
  pages: [
    {
      en: "Hooyo hung the washing on the line and went to the market. Ayan and Abdi played ball in the sunny yard.",
      am: "ሁዮ የታጠበውን ልብስ ገመዱ ላይ አስጥታ ወደ ገበያ ሄደች። አያንና አብዲ ፀሐያማው ግቢ ውስጥ ኳስ ተጫወቱ።",
    },
    {
      en: "Then Ayan stopped. Far away, over the hills, the sky was dark. \"Look at the clues,\" she said.",
      am: "ከዚያ አያን ቆመች። ሩቅ፣ ከኮረብታዎቹ በላይ ሰማዩ ጨልሞ ነበር። «ፍንጮቹን ተመልከት» አለች።",
    },
    {
      en: "Clue one: big dark clouds. Clue two: the wind was getting stronger. Clue three: the birds were flying home.",
      am: "ፍንጭ አንድ፦ ትልልቅ ጥቁር ደመናዎች። ፍንጭ ሁለት፦ ነፋሱ እየበረታ ነበር። ፍንጭ ሦስት፦ ወፎቹ ወደ ጎጇቸው እየበረሩ ነበር።",
    },
    {
      en: "\"Look at the clues: what will happen next?\" asked Ayan. Abdi kicked the ball. \"The sun is out. We will play all day!\"",
      am: "«Look at the clues: what will happen next?» (ፍንጮቹን ተመልከት፦ ቀጥሎ ምን ይሆናል?) ብላ ጠየቀች አያን። አብዲ ኳሱን መታ። «ፀሐይ ወጥታለች። ቀኑን ሙሉ እንጫወታለን!»",
    },
    {
      en: "Ayan shook her head. \"I predict it will rain. To predict means to think what will happen next, from the clues.\"",
      am: "አያን ራሷን ነቀነቀች። «I predict it will rain.» (ይዘንባል ብዬ እገምታለሁ።) «መገመት ማለት ከፍንጮቹ ተነሥቶ ቀጥሎ የሚሆነውን ማሰብ ነው።»",
    },
    {
      en: "\"Let's take the washing in!\" said Ayan. Abdi laughed. \"But it's sunny!\" Look at the clues: what will happen next?",
      am: "«ልብሱን እናስገባ!» አለች አያን። አብዲ ሳቀ። «ግን ፀሐያማ ነው!» Look at the clues: what will happen next?",
    },
    {
      en: "Ayan took in Hooyo's dress, Aabo's shirt and all the socks. Abdi carried one sock, slowly, and grumbled.",
      am: "አያን የሁዮን ቀሚስ፣ የአቦን ሸሚዝና ካልሲዎቹን ሁሉ አስገባች። አብዲ አንድ ካልሲ ቀስ ብሎ ይዞ አጉረመረመ።",
    },
    {
      en: "Gugu walked past. \"Why are you taking the washing in?\" \"Because of the clues!\" said Ayan. Gugu looked up at the sky.",
      am: "ጉጉ በአጠገባቸው አለፈ። «ልብሱን ለምን ታስገቢያለሽ?» «በፍንጮቹ ምክንያት!» አለች አያን። ጉጉ ሰማዩን ቀና ብሎ ተመለከተ።",
    },
    {
      en: "Plip. Plop. Then WHOOSH! Big rain came pouring down. Everyone ran inside, and the ball rolled into a puddle.",
      am: "ጠብ። ጠብ። ከዚያ ሹው! ትልቅ ዝናብ ወረደ። ሁሉም ወደ ቤት ሮጡ፤ ኳሱም ኩሬ ውስጥ ተንከባለለች።",
    },
    {
      en: "Hooyo came home, wet. \"Oh! My washing is dry! Who took it in?\" \"Ayan did,\" said Abdi. \"She predicted the rain.\"",
      am: "ሁዮ ርሳ መጣች። «ኦ! ልብሴ ደረቅ ነው! ማን አስገባው?» «አያን» አለ አብዲ። «ዝናቡን ገምታ ነበር።»",
    },
    {
      en: "Then Abdi looked out. The sun was out, but it still rained a little. \"My turn! I predict… a rainbow!\" And there it was.",
      am: "ከዚያ አብዲ ወደ ውጭ ተመለከተ። ፀሐይ ወጥታ ነበር፤ ግን ትንሽ ይዘንብ ነበር። «የኔ ተራ! I predict… a rainbow!» እዚያ ነበረ፣ ቀስተ ደመና።",
    },
    {
      en: "Look at the clues: what will happen next? What do you predict for tomorrow, {name}?",
      am: "Look at the clues: what will happen next? {name}፣ ነገ ምን ይሆናል ብላችሁ ትገምታላችሁ?",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["What three clues did Ayan see before the rain?", "How did Abdi know a rainbow might come?"],
      am: ["ከዝናቡ በፊት አያን ያየቻቸው ሦስት ፍንጮች ምንድን ናቸው?", "አብዲ ቀስተ ደመና ሊመጣ እንደሚችል እንዴት አወቀ?"],
    },
    activity: {
      en: 'When you read any book together, stop before turning a page and ask: "What do you think will happen next? Why?" Then turn the page and see. Say "I predict…" yourself too, and enjoy being wrong sometimes: a good guess uses the clues, it doesn\'t have to be right.',
      am: 'ማንኛውንም መጽሐፍ አብራችሁ ስታነቡ ገጹን ከመግለጣችሁ በፊት ቆም ብላችሁ «ቀጥሎ ምን የሚሆን ይመስልሃል? ለምን?» ብላችሁ ጠይቁ። ከዚያ ገልጣችሁ ተመልከቱ። እርስዎም «I predict…» ይበሉ፤ አንዳንዴ መሳሳትም ያስደስታል፦ ጥሩ ግምት ፍንጮቹን ይጠቀማል እንጂ ሁልጊዜ ትክክል መሆን የለበትም።',
    },
  },
};

export default story;
