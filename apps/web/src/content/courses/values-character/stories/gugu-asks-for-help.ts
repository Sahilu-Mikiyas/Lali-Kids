import type { Story } from "../../../stories";

/*
  "Gugu Asks for Help" (level 4: knowing when to ask for help).
  Gugu's kite gets stuck high in the big fig tree. "I can do it myself!" He jumps (too low),
  throws his sandal (now that's stuck too), and climbs out on a thin branch that creaks and sways.
  Frightened, he holds on. Asking feels like admitting he can't, but Lali reminds him that asking
  is brave too. He calls for help; Papa and Grandpa Tolosa come, Papa talks him down step by step,
  and they get the kite with Grandpa's long stick. Next time, Gugu asks first.
  Join-in line: "Asking is brave too!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «መጠየቅም ጀግንነት ነው!» and the creak «ቅርርር».
*/
const story: Story = {
  id: "gugu-asks-for-help",
  course: "values-character",
  pack: "story",
  title: { en: "Gugu Asks for Help", am: "ጉጉ እርዳታ ጠየቀ" },
  category: "Values",
  ageBands: ["3-5", "6-7", "8-9"],
  isFree: false,
  color: "#3F8A3E",
  scene: "lib-gugu-asks-for-help",
  coverPage: 9,
  teaches: { words: ["help", "ask", "safe", "brave", "together"] },
  pages: [
    {
      en: "Whoosh! A gust of wind grabbed Gugu's kite and tangled it high, high up in the big fig tree.",
      am: "ሹው! አንድ ኃይለኛ ነፋስ የጉጉን ካይት ነጥቆ በትልቁ የሾላ ዛፍ ላይ ከፍ ብሎ፣ ከፍ ብሎ ጠለፈው።",
    },
    {
      en: '"I can get it myself!" said Gugu. He jumped. Boing! Not even close. He jumped higher. Boing! Still not close.',
      am: "«እኔ ራሴ አወርደዋለሁ!» አለ ጉጉ። ዘለለ። ዝልል! ጭራሽ አልደረሰም። ከፍ ብሎ ዘለለ። ዝልል! አሁንም አልደረሰም።",
    },
    {
      en: "He threw his sandal at the kite. The sandal flew up… and got stuck in the tree too. Now Gugu had one sandal, and no kite.",
      am: "ነጠላ ጫማውን ወደ ካይቱ ወረወረው። ጫማው ወደ ላይ በረረ… እሱም ዛፉ ላይ ተሰቀለ። አሁን ጉጉ አንድ ጫማ ብቻ ቀረው፤ ካይትም የለውም።",
    },
    {
      en: 'Tsehay was passing. "Shall I get my Papa?" "No!" said Gugu. "I can do it MYSELF." He didn\'t want anyone to think he couldn\'t.',
      am: "ፀሐይ በዚያ ታልፍ ነበር። «አባባን ልጥራልህ?» «አይ!» አለ ጉጉ። «እኔ ራሴ እችላለሁ።» አልቻለም ብሎ ማንም እንዲያስብ አልፈለገም።",
    },
    {
      en: "So Gugu climbed. Up the trunk, onto a branch, then out along a thinner branch. Creeeak! The branch bent and swayed. Gugu froze.",
      am: "ስለዚህ ጉጉ ወጣ። በግንዱ ላይ፣ ወደ ቅርንጫፉ፣ ከዚያ ወደ ቀጭኑ ቅርንጫፍ። ቅርርርር! ቅርንጫፉ ተጣመመና ተወዛወዘ። ጉጉ ደርቆ ቀረ።",
    },
    {
      en: "He couldn't go forward. He was scared to go back. The ground looked very far away. Lali buzzed beside him. \"Gugu, this is the time to ask.\"",
      am: "ወደ ፊት መሄድ አልቻለም። ወደ ኋላ መመለስ ፈራ። መሬቱ በጣም ሩቅ መሰለው። ላሊ አጠገቡ በረረች። «ጉጉ፣ አሁን መጠየቅ ያለብህ ጊዜ ነው።»",
    },
    {
      en: '"But asking means I can\'t do it," whispered Gugu. "No," said Lali. "Asking means you\'re smart enough to know when you need a friend. Asking is brave too!"',
      am: "«ግን መጠየቅ ማለት አልችልም ማለት ነው» አለ ጉጉ በሹክሹክታ። «አይደለም» አለች ላሊ። «መጠየቅ ማለት ጓደኛ ሲያስፈልግህ የሚያውቅ ብልህ መሆን ነው። መጠየቅም ጀግንነት ነው!»",
    },
    {
      en: 'Gugu took a big breath. "HELP! Please, can someone help me?" Tsehay ran. Papa came running, and Grandpa Tolosa came too, with his long stick.',
      am: "ጉጉ በረጅሙ ተነፈሰ። «እርዱኝ! እባካችሁ የሚረዳኝ አለ?» ፀሐይ ሮጠች። አባባ እየሮጠ መጣ፤ አባ ቶሎሳም ረጅሙን ምርኩዛቸውን ይዘው መጡ።",
    },
    {
      en: 'Papa stood under the tree. "One paw back. Good. Now the other. Now hold the big branch." Step by step, Gugu climbed back to the trunk, and slid down into Papa\'s arms.',
      am: "አባባ ከዛፉ ሥር ቆመ። «አንድ እጅ ወደ ኋላ። ጎበዝ። አሁን ሌላውን። አሁን ትልቁን ቅርንጫፍ ያዝ።» ደረጃ በደረጃ ጉጉ ወደ ግንዱ ተመለሰ፤ ተንሸራቶም በአባባ እቅፍ ገባ።",
    },
    {
      en: "Then Grandpa Tolosa reached up with his long stick, gave a little twist, and down floated the kite, and down dropped the sandal. Plop!",
      am: "ከዚያ አባ ቶሎሳ ረጅሙን ምርኩዛቸውን ዘርግተው ትንሽ ጠመዘዙት፤ ካይቱ ተንሳፎ ወረደ፤ ጫማውም ዱብ አለ። ዱብ!",
    },
    {
      en: '"Thank you," said Gugu. "I should have asked at the start." Grandpa laughed. "Even I ask for help. Who do you think helps me up the hill? Hawi!"',
      am: "«አመሰግናለሁ» አለ ጉጉ። «ገና ከመጀመሪያው መጠየቅ ነበረብኝ።» አባ ቶሎሳ ሳቁ። «እኔም እርዳታ እጠይቃለሁ። ዳገቱን እንድወጣ የሚረዳኝ ማን ይመስልሃል? ሀዊ!»",
    },
    {
      en: "Soon the kite was flying again, with Gugu, Tsehay and Grandpa all holding the string. Asking is brave too!",
      am: "ብዙም ሳይቆይ ካይቱ እንደገና በረረ፤ ጉጉ፣ ፀሐይና አባ ቶሎሳ ሁሉም ክሩን ይዘው። መጠየቅም ጀግንነት ነው!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why didn't Gugu want to ask for help? What changed his mind?",
        "Which things can you try by yourself, and which things should you always ask a grown-up for help with?",
      ],
      am: [
        "ጉጉ እርዳታ መጠየቅ ለምን አልፈለገም? ሐሳቡን የቀየረው ምንድን ነው?",
        "በራሳችሁ መሞከር የምትችሉት የትኞቹን ነገሮች ነው? ሁልጊዜ ትልቅ ሰው መጠየቅ ያለባችሁስ የትኞቹን ነው?",
      ],
    },
    activity: {
      en: "Make two lists together, with drawings: \"I can try it myself\" (putting on shoes, tidying toys) and \"I ask a grown-up\" (climbing high, anything hot or sharp, crossing a road). Practise saying \"Please can you help me?\"",
      am: "በሥዕል አብራችሁ ሁለት ዝርዝሮች አዘጋጁ፦ «በራሴ መሞከር እችላለሁ» (ጫማ ማድረግ፣ አሻንጉሊት ማስቀመጥ) እና «ትልቅ ሰው እጠይቃለሁ» (ከፍ ያለ ቦታ መውጣት፣ ትኩስ ወይም ስለታም ነገር፣ መንገድ መሻገር)። «እባክህ/ሽ ልትረዳኝ ትችላለህ/ያለሽ?» ማለትን ተለማመዱ።",
    },
  },
};

export default story;
