import type { Story } from "../stories";

/*
  "Seven Sheep for ሰ": Tsehay, the shy gelada girl, looks after seven sheep, each wearing a
  letter of the ሰ family (ሰ ሱ ሲ ሳ ሴ ስ ሶ). At sunset she counts them home in order, and each
  says its sound. Only six come: sleepy ሶ is snoring his own sound under the big tree. The
  join-in line is "Come home, little sheep, come home!" At the gate ሰ stands with ላ and ም from
  the Fidel Train, and together they read ሰላም.
  Two happy accidents of Amharic: seven is ሰባት (it starts with ሰ) and six is ስድስት (it starts
  with ስ, the sixth letter). And Tsehay's name means "sun", so the Amharic says the sky turns
  orange, not the sun.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line (ኑ፣ ትንንሽ በጎች፣ ወደ ቤት ኑ!), the sheep's ሜ… on page 13, the snore (ሶሶሶ…,
  እያንኮራፋ) and the munching sound ቅርጥፍ.
*/
const story: Story = {
  id: "fidel-se",
  pack: "fidel",
  // In the fidel-foundations learning package (docs/PACKAGES.md): opens only through the course.
  course: "fidel-foundations",
  title: { en: "Seven Sheep for ሰ", am: "ሰባቱ የሰ በጎች" },
  category: "Fidel",
  ageBands: ["3-5"],
  isFree: false,
  color: "#E5793B",
  scene: "lib-fidel-se",
  coverPage: 10,
  teaches: { fidel: ["ሰ", "ሱ", "ሲ", "ሳ", "ሴ", "ስ", "ሶ"], numbers: [1, 2, 3, 4, 5, 6, 7], words: ["ሰላም"] },
  pages: [
    {
      en: "On a green hill, Tsehay the gelada looks after seven fluffy sheep. Each sheep wears a letter, and every letter belongs to the ሰ family.",
      am: "በአረንጓዴ ኮረብታ ላይ ጭላዳዋ ፀሐይ ሰባት ለስላሳ በጎችን ትጠብቃለች። እያንዳንዱ በግ ፊደል ለብሷል፤ ሁሉም ፊደሎች የሰ ቤተሰብ ናቸው።",
    },
    {
      en: 'All day long the sheep munch the grass. Munch, munch. Then the sky turns orange. "Time to go home!" says Tsehay. "Let\'s count you, one by one."',
      am: "ቀኑን ሙሉ በጎቹ ሣር ይግጣሉ። ቅርጥፍ፣ ቅርጥፍ። ከዚያ ሰማዩ ብርቱካናማ ሆነ። «ወደ ቤት የምንሄድበት ሰዓት ደረሰ!» አለች ፀሐይ። «አንድ በአንድ ልቁጠራችሁ።»",
    },
    {
      en: 'Number one! ሰ trots up and says "sa", like in sun. "Come home, little sheep, come home!" sings Tsehay.',
      am: "አንድ! ሰ እየሮጠ መጥቶ «ሰ» አለ፤ ልክ እንደ ሰባት መጀመሪያ። «ኑ፣ ትንንሽ በጎች፣ ወደ ቤት ኑ!» ብላ ዘመረች ፀሐይ።",
    },
    {
      en: 'Two! ሱ says "su", like in soup. Three! ሲ says "si", like in see. They skip along behind ሰ, hop, hop, hop.',
      am: "ሁለት! ሱ «ሱ» አለ። ሦስት! ሲ «ሲ» አለ። ከሰ ኋላ እየዘለሉ ይከተላሉ፤ ዘለል፣ ዘለል፣ ዘለል።",
    },
    {
      en: 'Four! ሳ says "saa", as wide as a great big yawn. Five! ሴ says "say", like in say hello. Come home, little sheep, come home!',
      am: "አራት! ሳ «ሳ» አለ፤ እንደ ትልቅ ማዛጋት ሰፊ። አምስት! ሴ «ሴ» አለ። ኑ፣ ትንንሽ በጎች፣ ወደ ቤት ኑ!",
    },
    {
      en: 'Six! Little ስ tiptoes up. Her sound is just "s", soft as a whisper: sss. In Amharic, six is ስድስት, and it starts with her!',
      am: "ስድስት! ትንሿ ስ ቀስ ብላ መጣች። ድምጿ «ስ» ብቻ ነው፤ እንደ ሹክሹክታ ለስላሳ፦ ስስስ። ስድስት የሚጀምረውም በእሷ ነው!",
    },
    {
      en: 'And seven… Seven? Where is ሶ? Tsehay counts again. One, two, three, four, five, six. Only six! "Come home, little sheep, come home!"',
      am: "ሰባት… ሰባት? ሶ የት አለ? ፀሐይ እንደገና ቆጠረች። አንድ፣ ሁለት፣ ሦስት፣ አራት፣ አምስት፣ ስድስት። ስድስት ብቻ! «ኑ፣ ትንንሽ በጎች፣ ወደ ቤት ኑ!»",
    },
    {
      en: 'They look behind the big rock. Only a lizard. They look in the bushes. Only a little bird. "ሶ, where are you?" calls Tsehay. The sky turns pink.',
      am: "ከትልቁ ድንጋይ ጀርባ ፈለጉ። እንሽላሊት ብቻ። ቁጥቋጦው ውስጥ ፈለጉ። ትንሽ ወፍ ብቻ። «ሶ፣ የት ነህ?» ብላ ጠራች ፀሐይ። ሰማዩ ሮዝ ሆነ።",
    },
    {
      en: 'Shhh! Listen! From under the big fig tree comes a funny sound: "Sooo… sooo… sooo…"',
      am: "ሽሽሽ! አዳምጡ! ከትልቁ የዋርካ ዛፍ ሥር አስቂኝ ድምፅ ይሰማል፦ «ሶሶሶ… ሶሶሶ… ሶሶሶ…»",
    },
    {
      en: 'There is ሶ, fast asleep and snoring his very own sound! ሶ says "so", like in sofa. He loves a nap more than anything.',
      am: "እነሆ ሶ፣ ድብን ብሎ ተኝቶ የራሱን ድምፅ እያንኮራፋ! ሶ «ሶ» ይላል። ከምንም በላይ መተኛት ይወዳል።",
    },
    {
      en: 'Tsehay laughs and gives him a hug. "Seven!" Now they are all here: ሰ ሱ ሲ ሳ ሴ ስ ሶ. Come home, little sheep, come home!',
      am: "ፀሐይ ሳቀችና አቀፈችው። «ሰባት!» አሁን ሁሉም አሉ፦ ሰ ሱ ሲ ሳ ሴ ስ ሶ። ኑ፣ ትንንሽ በጎች፣ ወደ ቤት ኑ!",
    },
    {
      en: 'At the gate, three letters stand in a row: ሰ, and ላ and ም from the Fidel Train. ሰ "sa", ላ "la", ም "m". Together they say… ሰላም!',
      am: "በበሩ ላይ ሦስት ፊደሎች ተሰለፉ፦ ሰ፣ ከፊደል ባቡር የመጡት ላ እና ም። ሰ «ሰ»፣ ላ «ላ»፣ ም «ም»። አብረው ሲሆኑ… ሰላም!",
    },
    {
      en: 'Grandma waves from the door. "ሰላም, Tsehay! ሰላም, sheep!" And seven sleepy sheep answer, "Baa!" Goodnight, ሰ family.',
      am: "አያቴ ከበሩ እጇን አውለበለበች። «ሰላም ፀሐይ! ሰላም በጎች!» ሰባቱ እንቅልፋም በጎችም «ሜ…!» ብለው መለሱ። ደህና እደሩ፣ የሰ ቤተሰብ።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Which sheep was missing, and how did Tsehay find him? What would you do if you lost something?",
        "ሰባት (seven) starts with ሰ, and ስድስት (six) starts with ስ. Can you think of another word that starts with a ሰ-family letter? (ሳሙና, soap; ሶፋ, sofa; ሱሪ, trousers.)",
      ],
      am: [
        "የጠፋው የትኛው በግ ነበር? ፀሐይ እንዴት አገኘችው? እናንተ አንድ ነገር ቢጠፋባችሁ ምን ታደርጋላችሁ?",
        "ሰባት በሰ ይጀምራል፤ ስድስት ደግሞ በስ ይጀምራል። በሰ ቤተሰብ ፊደል የሚጀምር ሌላ ቃል ታውቃላችሁ? (ሳሙና፣ ሶፋ፣ ሱሪ…)",
      ],
    },
    activity: {
      en: "Draw seven sheep (cotton wool makes lovely fluffy ones) and write ሰ ሱ ሲ ሳ ሴ ስ ሶ on them. Line them up and count them home together. Then hide one while your child closes their eyes: who is missing?",
      am: "ሰባት በጎችን ሳሉ (በጥጥ ሲሠሩ በጣም ያምራሉ)፤ በላያቸውም ሰ ሱ ሲ ሳ ሴ ስ ሶ ብላችሁ ጻፉ። አሰልፏቸውና አብራችሁ ወደ ቤት እየቆጠራችሁ አስገቡአቸው። ከዚያ ልጃችሁ ዓይኑን ሲጨፍን አንዱን ደብቁ፦ የጠፋው ማነው?",
    },
  },
};

export default story;
