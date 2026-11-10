import type { Story } from "../../../stories";

/*
  "Hawi's Sports Day" (level 3: reading a little story; action words with -ing and -ed).
  A little story for the child to read with help. It is sports day, but Grandpa Tolosa can't come:
  his leg hurts. Hawi works out how he can still share it: she will watch everything carefully
  and tell him all of it. In the morning everything is happening now: Ayan is jumping, Haben is
  kicking, Anbessa and Tsehay are pulling the rope, Hawi is racing. Gugu falls in the race; Hawi
  stops, helps him up, and they walk to the end together. In the evening she tells Grandpa, and
  now it all happened: Ayan jumped, Haben kicked, I helped, we walked. "You looked, you
  remembered, and now I know it all!"
  Join-in line: "Run, Hawi, run!"

  English taught: -ing for what is happening now (is jumping, is kicking, is running) and -ed for
  what happened (jumped, kicked, pulled, helped, walked, played, looked); the three sounds of -ed
  (jumped like t, played like d, painted like id). Only regular verbs that don't double a letter,
  apart from "running" (and "ran" is avoided).

  In Amharic the English sentences stay as they are, followed by a translation in brackets.
  AMHARIC: first draft, to be checked by a native-speaking editor before launch.
*/
const story: Story = {
  id: "hawis-sports-day",
  course: "english-readers",
  pack: "story",
  title: { en: "Hawi's Sports Day", am: "Hawi's Sports Day፦ የሀዊ የስፖርት ቀን" },
  category: "English",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#E8513B",
  scene: "lib-hawis-sports-day",
  coverPage: 4,
  teaches: { words: ["-ing", "-ed", "jumping", "jumped", "kicking", "kicked", "pulling", "pulled", "helped", "walked", "played", "looked"] },
  pages: [
    {
      en: "It is sports day at school! Hawi is jumping up and down. But Grandpa Tolosa can't come. His leg hurts. Hawi is sad.",
      am: "It is sports day at school! Hawi is jumping up and down. But Grandpa Tolosa can't come. His leg hurts. Hawi is sad. (በትምህርት ቤት የስፖርት ቀን ነው! ሀዊ ወደ ላይና ወደ ታች እየዘለለች ነው። ግን አያት ቶሎሳ መምጣት አይችሉም። እግራቸውን ያማቸዋል። ሀዊ አዘነች።)",
    },
    {
      en: "Then Hawi has an idea. \"Grandpa, I will look at everything. I will look and look. Then I will tell you all of it!\" Grandpa smiles. \"Run, Hawi, run!\"",
      am: "Then Hawi has an idea. \"Grandpa, I will look at everything. I will look and look. Then I will tell you all of it!\" Grandpa smiles. \"Run, Hawi, run!\" (ከዚያ ሀዊ ሐሳብ መጣላት። «አያቴ፣ ሁሉንም ነገር እመለከታለሁ። በደንብ እመለከታለሁ። ከዚያ ሁሉንም እነግርዎታለሁ!» አያት ፈገግ አሉ። «ሩጪ፣ ሀዊ፣ ሩጪ!»)",
    },
    {
      en: "Look! Ayan is jumping. Jump, Ayan, jump! Haben is kicking a ball. Kick, Haben, kick! Hawi is looking at it all.",
      am: "Look! Ayan is jumping. Jump, Ayan, jump! Haben is kicking a ball. Kick, Haben, kick! Hawi is looking at it all. (ተመልከቱ! አያን እየዘለለች ነው። ዝለዪ፣ አያን፣ ዝለዪ! ሐበን ኳስ እየመታች ነው። ምቺ፣ ሐበን፣ ምቺ! ሀዊ ሁሉንም እየተመለከተች ነው።)",
    },
    {
      en: "Anbessa and Tsehay are pulling a long rope. Pull! Pull! Gugu is pulling too. Then Gugu is rolling on the grass, laughing.",
      am: "Anbessa and Tsehay are pulling a long rope. Pull! Pull! Gugu is pulling too. Then Gugu is rolling on the grass, laughing. (አንበሳና ፀሐይ ረጅም ገመድ እየጎተቱ ነው። ጎትቱ! ጎትቱ! ጉጉም እየጎተተ ነው። ከዚያ ጉጉ እየሳቀ በሣሩ ላይ እየተንከባለለ ነው።)",
    },
    {
      en: "Now it is the big race. Hawi is running. She is running fast, like the wind. Run, Hawi, run!",
      am: "Now it is the big race. Hawi is running. She is running fast, like the wind. Run, Hawi, run! (አሁን ትልቁ ሩጫ ነው። ሀዊ እየሮጠች ነው። እንደ ነፋስ በፍጥነት እየሮጠች ነው። ሩጪ፣ ሀዊ፣ ሩጪ!)",
    },
    {
      en: "Oh no! Gugu trips and falls. He is crying. Hawi looks back. Will she run on? No. Hawi stops.",
      am: "Oh no! Gugu trips and falls. He is crying. Hawi looks back. Will she run on? No. Hawi stops. (ወይኔ! ጉጉ ተደናቅፎ ወደቀ። እያለቀሰ ነው። ሀዊ ወደ ኋላ ተመለከተች። መሮጧን ትቀጥል ይሆን? አይደለም። ሀዊ ቆመች።)",
    },
    {
      en: "Hawi helps Gugu up. \"Come on, Gugu. We can do it.\" They walk to the end, side by side. Everyone is clapping and cheering.",
      am: "Hawi helps Gugu up. \"Come on, Gugu. We can do it.\" They walk to the end, side by side. Everyone is clapping and cheering. (ሀዊ ጉጉን አነሳችው። «ና ጉጉ። እንችላለን።» ጎን ለጎን ሆነው እስከ መጨረሻው ይሄዳሉ። ሁሉም እያጨበጨቡና እያበረታቱ ነው።)",
    },
    {
      en: "Teacher Meron gives Hawi a gold star. \"This star is for helping,\" she says. Hawi is so happy. She wants to tell Grandpa!",
      am: "Teacher Meron gives Hawi a gold star. \"This star is for helping,\" she says. Hawi is so happy. She wants to tell Grandpa! (መምህርት መሮን ለሀዊ የወርቅ ኮከብ ሰጠቻት። «ይህ ኮከብ ስለረዳሽ ነው» አለች። ሀዊ በጣም ተደሰተች። ለአያቷ መንገር ፈለገች!)",
    },
    {
      en: "In the evening, Hawi sits with Grandpa by the fire. \"Tell me everything,\" says Grandpa. So Hawi tells him. \"Ayan jumped. Haben kicked the ball. Anbessa and Tsehay pulled the rope.\"",
      am: "In the evening, Hawi sits with Grandpa by the fire. \"Tell me everything,\" says Grandpa. So Hawi tells him. \"Ayan jumped. Haben kicked the ball. Anbessa and Tsehay pulled the rope.\" (ማታ ሀዊ ከአያቷ ጋር እሳቱ አጠገብ ተቀመጠች። «ሁሉንም ንገሪኝ» አሉ አያት። ስለዚህ ሀዊ ነገረቻቸው። «አያን ዘለለች። ሐበን ኳሱን መታች። አንበሳና ፀሐይ ገመዱን ጎተቱ።»)",
    },
    {
      en: "\"Gugu rolled on the grass. Then I raced. Gugu tripped, so I stopped. I helped him up, and we walked to the end together.\"",
      am: "\"Gugu rolled on the grass. Then I raced. Gugu tripped, so I stopped. I helped him up, and we walked to the end together.\" («ጉጉ በሣሩ ላይ ተንከባለለ። ከዚያ ተወዳደርኩ። ጉጉ ተደናቀፈ፤ ስለዚህ ቆምኩ። አነሳሁት፤ አብረንም እስከ መጨረሻው ሄድን።»)",
    },
    {
      en: "Grandpa looks at the gold star. He smiles a big smile. \"You looked and you remembered. You played and you helped. Now I know it all. It was the best sports day!\"",
      am: "Grandpa looks at the gold star. He smiles a big smile. \"You looked and you remembered. You played and you helped. Now I know it all. It was the best sports day!\" (አያት የወርቁን ኮከብ ተመለከቱ። ትልቅ ፈገግታ አሳዩ። «ተመለከትሽ፣ አስታወስሽም። ተጫወትሽ፣ ረዳሽም። አሁን ሁሉንም አውቄያለሁ። ምርጡ የስፖርት ቀን ነበር!»)",
    },
    {
      en: "Happening now: jumping, kicking, pulling, helping. All done: jumped, kicked, pulled, helped. Who fell in the race? Who helped? What did you do today, {name}?",
      am: "Happening now: jumping, kicking, pulling, helping. All done: jumped, kicked, pulled, helped. (አሁን እየሆነ ያለ፦ -ing፤ የተፈጸመ፦ -ed።) በሩጫው ላይ የወደቀው ማን ነው? የረዳው ማን ነው? {name}፣ ዛሬ ምን አደረጋችሁ?",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why did Hawi stop in the race?", "Hawi said \"Ayan is jumping\" in the morning and \"Ayan jumped\" in the evening. Why did the word change?"],
      am: ["ሀዊ በሩጫው ላይ ለምን ቆመች?", "ሀዊ ጠዋት «Ayan is jumping» ማታ ደግሞ «Ayan jumped» አለች። ቃሉ ለምን ተቀየረ?"],
    },
    activity: {
      en: 'At bedtime, ask your child to tell you three things they did today, in English if they can: "I played. I jumped. I helped Mom." Write them down together and read them back. Listen for the end of each word: -ed can sound like "t" (jumped, helped), "d" (played, pulled) or "id" (painted, waited), but it is always spelled -ed.',
      am: 'በመኝታ ሰዓት ልጅዎ ዛሬ ያደረጋቸውን ሦስት ነገሮች፣ ከቻለ በእንግሊዝኛ እንዲነግርዎ ይጠይቁት፦ «I played. I jumped. I helped Mom.» አብራችሁ ጽፋችሁ መልሳችሁ አንብቡ። የእያንዳንዱን ቃል መጨረሻ አዳምጡ፦ -ed እንደ «t» (jumped፣ helped)፣ እንደ «d» (played፣ pulled) ወይም እንደ «id» (painted፣ waited) ሊሰማ ይችላል፤ ሁልጊዜ ግን -ed ተብሎ ይጻፋል።',
    },
  },
};

export default story;
