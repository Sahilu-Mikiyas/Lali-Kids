import type { Story } from "../stories";

/*
  "Anbessa Learns to Swim": a day at Lake Langano, in the Rift Valley, whose warm water really is
  brown like milky tea. Anbessa is scared of the big water; Grandma promises to stay right beside
  him, and he goes one small step at a time: toes, knees, bubbles, floating like a leaf, kicking,
  a splutter and a cuddle, and then five strokes to Grandma's paws.
  Safety is modelled throughout: a grown-up is always in the water within reach, Anbessa goes in
  only as deep as he is ready for, and after the splutter he rests until he is ready to try again.
  The repeated line to join in on: "I can try, I can try!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the sound words for splashing «ጭልጥ», bubbles «ቡልቅ» and kicking «ጠብ» (are there better
  ones?), «ይብራ» for a pelican, and «እግሩን እንዴት እንደሚያወናጭፍ» for learning to kick.
*/
const story: Story = {
  id: "learn-to-swim",
  pack: "story",
  title: { en: "Anbessa Learns to Swim", am: "አንበሳ መዋኘት ተማረ" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#2A8FA6",
  scene: "lib-learn-to-swim",
  coverPage: 7,
  teaches: { words: ["swim", "float", "kick", "splash", "bubbles", "brave"] },
  pages: [
    {
      en: "Grandma took Anbessa and Gugu to Lake Langano. The water was warm and brown, like tea with milk, and the sand was soft between their toes.",
      am: "አያት አንበሳንና ጉጉን ወደ ላንጋኖ ሐይቅ ወሰደቻቸው። ውሃው ሞቅ ያለና እንደ ወተት ሻይ ቡናማ ነበር፤ አሸዋውም በጣቶቻቸው መካከል ለስላሳ ነበር።",
    },
    {
      en: '"Come in, Anbessa!" called Gugu, splashing. But Anbessa stayed on the sand, his tail tucked tight. "The water is too big," he whispered.',
      am: "«ና ግባ፣ አንበሳ!» እያለ ጉጉ ውሃውን ረጨ። አንበሳ ግን ጅራቱን ሸጉጦ አሸዋው ላይ ቀረ። «ውሃው በጣም ትልቅ ነው» አለ በሹክሹክታ።",
    },
    {
      en: 'Grandma sat beside him. "Being scared is all right. We\'ll go slowly, and I will be right here, all the time." She tied up her netela.',
      am: "አያት አጠገቡ ተቀመጠች። «መፍራት ችግር የለውም። ቀስ ብለን እንሄዳለን፤ እኔም ሁልጊዜ እዚሁ አጠገብህ እሆናለሁ።» ነጠላዋንም አጣፍታ አሰረች።",
    },
    {
      en: 'First, just his toes. Wiggle, wiggle! The water tickled, and tiny fish came to say hello. "I can try," said Anbessa. "I can try!"',
      am: "መጀመሪያ ጣቶቹን ብቻ። ውዝ፣ ውዝ! ውሃው ኮረኮረው፤ ትናንሽ ዓሣዎችም ሰላም ሊሉት መጡ። «እሞክራለሁ» አለ አንበሳ። «እሞክራለሁ!»",
    },
    {
      en: "Next, he walked in up to his knees, holding Grandma's paw tight. Gugu showed him how to splash. Splish, splash! Anbessa giggled.",
      am: "ቀጥሎ የአያቱን እጅ አጥብቆ ይዞ እስከ ጉልበቱ ድረስ ገባ። ጉጉ ውሃ እንዴት እንደሚረጭ አሳየው። ጭልጥ፣ ጭልጥ! አንበሳ ሳቀ።",
    },
    {
      en: '"Now blow bubbles," said Gugu, and put his mouth in the water. Blub, blub, blub! Anbessa tried too. Blub! A bubble tickled his nose.',
      am: "«አሁን አረፋ አውጣ» አለ ጉጉ፤ አፉንም ውሃው ውስጥ ከተተ። ቡልቅ፣ ቡልቅ፣ ቡልቅ! አንበሳም ሞከረ። ቡልቅ! አንዱ አረፋ አፍንጫውን ኮረኮረው።",
    },
    {
      en: 'A leaf floated by, light and still. "Lie back, like a leaf," said Grandma. Her paws were under his back. "I\'ve got you."',
      am: "አንዲት ቅጠል ቀለል ብላ፣ ፀጥ ብላ እየተንሳፈፈች አለፈች። «እንደ ቅጠል በጀርባህ ተኛ» አለች አያት። እጆቿ ከጀርባው ሥር ነበሩ። «ይዤሃለሁ።»",
    },
    {
      en: 'Anbessa lay back, arms out wide, and looked up at the sky. He was floating! "I\'m a leaf!" he laughed. "I can try, I can try!"',
      am: "አንበሳ እጆቹን ዘርግቶ በጀርባው ተኛ፤ ሰማዩንም ተመለከተ። እየተንሳፈፈ ነበር! «እኔ ቅጠል ነኝ!» እያለ ሳቀ። «እሞክራለሁ፣ እሞክራለሁ!»",
    },
    {
      en: "Then Gugu taught him to kick. Kick, kick, kick! Paddle, paddle! Water flew everywhere, even onto Grandma's glasses!",
      am: "ከዚያ ጉጉ እግሩን እንዴት እንደሚያወናጭፍ አስተማረው። ጠብ፣ ጠብ፣ ጠብ! ቀዘፍ፣ ቀዘፍ! ውሃ በየቦታው ተረጨ፤ በአያት መነጽር ላይ እንኳ!",
    },
    {
      en: 'Splash! A little wave went into Anbessa\'s mouth. He coughed and stood up fast. Grandma held him close. "You\'re safe. Try again when you\'re ready."',
      am: "ጭልጥ! ትንሽ ማዕበል የአንበሳ አፍ ውስጥ ገባ። እያሳለ በፍጥነት ቆመ። አያት አቅፋ ያዘችው። «ደህና ነህ። ዝግጁ ስትሆን እንደገና ሞክር።»",
    },
    {
      en: 'Anbessa took a big breath. "I can try!" Kick, kick, paddle, paddle… one, two, three, four, FIVE strokes, all the way to Grandma\'s waiting paws!',
      am: "አንበሳ ትልቅ ትንፋሽ ወሰደ። «እሞክራለሁ!» ጠብ፣ ጠብ፣ ቀዘፍ፣ ቀዘፍ… አንድ፣ ሁለት፣ ሦስት፣ አራት፣ አምስት! እስከሚጠብቁት የአያቱ እጆች ድረስ ዋኘ!",
    },
    {
      en: '"I swam! I really swam!" shouted Anbessa. Gugu cheered, a pelican flapped its big wings, and Grandma hugged him, all wet and proud.',
      am: "«ዋኘሁ! በእውነት ዋኘሁ!» ብሎ ጮኸ አንበሳ። ጉጉ በደስታ ጮኸ፣ አንድ ይብራ ትልልቅ ክንፎቹን አርገበገበ፤ አያትም በኩራት አቀፈችው፤ ሁለቱም ርጥብ ነበሩ።",
    },
    {
      en: 'At sunset, wrapped in a warm towel, Anbessa watched the lake turn gold. "Can we swim again tomorrow?" Grandma smiled. "Together, always."',
      am: "ፀሐይ ስትጠልቅ አንበሳ ሞቅ ባለ ፎጣ ተጠቅልሎ ሐይቁ ወርቃማ ሲሆን ተመለከተ። «ነገ እንደገና መዋኘት እንችላለን?» አያት ፈገግ አለች። «ሁልጊዜ አብረን።»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Anbessa was scared of the big water. What small steps helped him feel brave?",
        "Grandma stayed close the whole time. Why should children always swim with a grown-up right beside them?",
      ],
      am: [
        "አንበሳ ትልቁን ውሃ ፈርቶ ነበር። ጀግና እንዲሆን የረዱት ትናንሽ እርምጃዎች የትኞቹ ናቸው?",
        "አያት ሁልጊዜ አጠገቡ ነበረች። ልጆች ሁልጊዜ ትልቅ ሰው አጠገባቸው እያለ ብቻ መዋኘት ያለባቸው ለምንድን ነው?",
      ],
    },
    activity: {
      en: "At bath time, or with a big bowl of water, practise like Anbessa: wiggle your toes, blow bubbles with your mouth, and float a leaf or a bottle top. Talk about something that felt scary at first and got easier, step by step. Always stay right beside children near water.",
      am: "በገላ መታጠቢያ ጊዜ ወይም በትልቅ ሳህን ውሃ እንደ አንበሳ ተለማመዱ፤ ጣቶቻችሁን አወዛውዙ፣ በአፋችሁ አረፋ አውጡ፣ ቅጠል ወይም የጠርሙስ ክዳን አንሳፍፉ። መጀመሪያ ያስፈራ የነበረና ቀስ በቀስ የቀለለ አንድ ነገር አውሩ። ልጆች ውሃ አጠገብ ሲሆኑ ሁልጊዜ አጠገባቸው ሁኑ።",
    },
  },
};

export default story;
