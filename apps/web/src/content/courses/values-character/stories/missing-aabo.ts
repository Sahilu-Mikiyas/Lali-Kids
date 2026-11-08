import type { Story } from "../../../stories";

/*
  "Missing Aabo" (level 5: sad feelings, missing someone, and saying how we feel).
  Ayan's papa (Aabo, in Somali) drives a truck on the long road to the port, and is away for
  weeks. Ayan misses him; she is grumpy with Abdi and doesn't want to say why. Hooyo helps her
  name the feeling ("You miss Aabo. It's all right to feel it, and to say it"), and they find
  things to do with it: a picture for Aabo, a string of knots to count the days, a phone call on
  the neighbour's phone. When Aabo comes home, she runs to the road; he has kept her drawing in his
  truck all along.
  Join-in line: "It's all right to feel it, and to say it."

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ስሜቱ ቢሰማን ችግር የለም፤ መናገርም እንችላለን።», «አቦ» for Aabo, and «ወደብ» (port).
*/
const story: Story = {
  id: "missing-aabo",
  course: "values-character",
  pack: "story",
  title: { en: "Missing Aabo", am: "አቦ ናፈቀኝ" },
  category: "Values",
  ageBands: ["3-5", "6-7", "8-9"],
  isFree: false,
  color: "#7A5AB8",
  scene: "lib-missing-aabo",
  coverPage: 10,
  teaches: { words: ["miss", "sad", "feelings", "talk", "home"] },
  pages: [
    {
      en: "Ayan's papa, Aabo, drove a big truck along the long, long road to the sea. He waved from the window, honked twice, beep beep, and was gone for many weeks.",
      am: "የአያን አባት አቦ ወደ ባሕሩ በሚወስደው ረጅም፣ ረጅም መንገድ ትልቅ የጭነት መኪና ይነዳ ነበር። በመስኮቱ እጁን አውለበለበ፣ ሁለት ጊዜ ጡሩምባ ነፋ፣ ቢፕ ቢፕ፣ ለብዙ ሳምንታትም ሄደ።",
    },
    {
      en: "At first Ayan was fine. Then, every evening, she looked at Aabo's empty cushion, and something heavy sat in her chest.",
      am: "መጀመሪያ አያን ደህና ነበረች። ከዚያ በየምሽቱ የአቦን ባዶ ትራስ ስታይ አንድ ከባድ ነገር ደረቷ ላይ ይቀመጥባት ነበር።",
    },
    {
      en: 'One evening Abdi knocked over her blocks by accident. "Go AWAY!" Ayan snapped, and she pushed him. Abdi cried. Ayan cried too, and she didn\'t even know why.',
      am: "አንድ ምሽት አብዲ ሳያስበው ጡቦቿን ገፋቸው። «ሂድ ከዚህ!» ብላ አያን ተቆጣች፤ ገፋችውም። አብዲ አለቀሰ። አያንም አለቀሰች፤ ለምን እንደሆነ እንኳ ሳታውቅ።",
    },
    {
      en: 'Hooyo sat down and wrapped them both in her shawl. "Ayan, I think something is making you sad inside. Can you tell me?" Ayan shook her head. Then she whispered, "I miss Aabo."',
      am: "ሁዮ ተቀምጣ ሁለቱንም በሻሿ ጠቀለለቻቸው። «አያን፣ የሆነ ነገር በውስጥሽ ያሳዘነሽ ይመስለኛል። ልትነግሪኝ ትችያለሽ?» አያን ራሷን ነቀነቀች። ከዚያ በሹክሹክታ «አቦ ናፈቀኝ» አለች።",
    },
    {
      en: '"I miss him too," said Hooyo. "Missing someone is a sad feeling, and a loving one. It\'s all right to feel it, and to say it."',
      am: "«እኔም ናፍቆኛል» አለች ሁዮ። «ሰውን መናፈቅ የሚያሳዝን ስሜት ነው፤ የፍቅርም ስሜት ነው። ስሜቱ ቢሰማን ችግር የለም፤ መናገርም እንችላለን።»",
    },
    {
      en: 'Ayan turned to Abdi. "Sorry I pushed you. I wasn\'t angry with you. I was missing Aabo." Abdi hugged her. "Me too," he said.',
      am: "አያን ወደ አብዲ ዞረች። «ስለገፋሁህ ይቅርታ። ባንተ አልተናደድኩም። አቦ ናፍቆኝ ነው።» አብዲ አቀፋት። «እኔም» አለ።",
    },
    {
      en: '"What can we do with a missing feeling?" asked Hooyo. Ayan thought. "I could draw Aabo a picture!" So she drew his truck on the road, with all of them waving.',
      am: "«በናፍቆት ስሜት ምን ማድረግ እንችላለን?» ብላ ጠየቀች ሁዮ። አያን አሰበች። «ለአቦ ሥዕል መሳል እችላለሁ!» ስለዚህ መኪናውን በመንገዱ ላይ፣ ሁሉም እጃቸውን ሲያውለበልቡ ሳለች።",
    },
    {
      en: "Then Hooyo tied a string with one knot for every day until Aabo came home. Each night Abdi and Ayan untied one knot. Fewer knots, fewer days!",
      am: "ከዚያ ሁዮ አቦ እስኪመለስ ድረስ ላለው ለእያንዳንዱ ቀን አንድ ቋጠሮ ያለው ክር አሰረች። በየሌሊቱ አብዲና አያን አንድ ቋጠሮ ይፈቱ ነበር። ቋጠሮው ሲቀንስ ቀኑም ይቀንሳል!",
    },
    {
      en: 'On Friday they borrowed Auntie Sheep\'s phone and called Aabo. "I miss you, Aabo!" said Ayan, and this time it felt good to say it. "I miss you too, my clever girl," said Aabo.',
      am: "አርብ የእማማ በግን ስልክ ተውሰው ለአቦ ደወሉ። «አቦ፣ ናፍቀኸኛል!» አለች አያን፤ በዚህ ጊዜ መናገሩ ደስ አሰኛት። «እኔም ናፍቀሽኛል፣ ብልኋ ልጄ» አለ አቦ።",
    },
    {
      en: "At last there was only one knot left. Then none. Beep beep! A big truck came rumbling down the road, and Aabo jumped out with his arms wide open.",
      am: "በመጨረሻ አንድ ቋጠሮ ብቻ ቀረ። ከዚያ ምንም። ቢፕ ቢፕ! አንድ ትልቅ የጭነት መኪና እያጓራ በመንገዱ መጣ፤ አቦም እጆቹን ዘርግቶ ዘሎ ወረደ።",
    },
    {
      en: 'Ayan and Abdi ran so fast their sandals flew off. Aabo swung them round and round. Then he showed them his truck: Ayan\'s first drawing from last year was stuck by the wheel. "I missed you every day," he said.',
      am: "አያንና አብዲ በጣም ፈጥነው ስለሮጡ ጫማቸው ወለቀ። አቦ ዙሪያውን አሽከረከራቸው። ከዚያ መኪናውን አሳያቸው፦ የአያን ያለፈው ዓመት የመጀመሪያ ሥዕል ከመሪው አጠገብ ተለጥፎ ነበር። «በየቀኑ ናፍቃችሁኝ ነበር» አለ።",
    },
    {
      en: "That night, Ayan told Lali, \"When I'm missing someone, I'll say it, and I'll draw it.\" It's all right to feel it, and to say it.",
      am: "በዚያች ሌሊት አያን ለላሊ «ሰው ሲናፍቀኝ እናገራለሁ፤ እስለዋለሁም» አለቻት። ስሜቱ ቢሰማን ችግር የለም፤ መናገርም እንችላለን።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why did Ayan push Abdi? What was she really feeling?",
        "Who do you miss sometimes? What could you do when you miss them?",
      ],
      am: [
        "አያን አብዲን ለምን ገፋችው? በእውነት የተሰማት ምን ነበር?",
        "አንዳንድ ጊዜ ማን ይናፍቃችኋል? ሲናፍቃችሁ ምን ማድረግ ትችላላችሁ?",
      ],
    },
    activity: {
      en: "Make a feelings corner: draw faces for happy, sad, angry, scared and missing someone. When someone in the family has a big feeling, they can point to a face and say it. If someone is far away, make a knotted string or a drawing for them together.",
      am: "የስሜት ጥግ አዘጋጁ፦ ለደስታ፣ ለሐዘን፣ ለቁጣ፣ ለፍርሃትና ለናፍቆት ፊቶችን ሳሉ። በቤተሰቡ አንድ ሰው ትልቅ ስሜት ሲሰማው ፊቱን እየጠቆመ ሊናገረው ይችላል። ሩቅ ያለ ሰው ካለ ቋጠሮ ያለው ክር ወይም ሥዕል አብራችሁ አዘጋጁለት።",
    },
  },
};

export default story;
