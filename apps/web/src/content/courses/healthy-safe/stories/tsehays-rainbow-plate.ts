import type { Story } from "../../../stories";

/*
  "Tsehay's Rainbow Plate" (level 2: a balanced plate of Ethiopian food).
  Tsehay only wants bread, every meal. She wants to be strong enough to carry baby Dawit and to
  hop all the way along the hopscotch. Mama and Papa explain, simply, that a body needs different
  kinds of food: injera and bread give us energy to run and play; lentils, eggs and milk help us
  grow strong; vegetables and fruit help keep us well. Tsehay works it out as colours, and builds
  her own rainbow plate: brown injera, red lentils, green gomen, orange carrots, a yellow egg, with
  a banana after and a cup of milk. A little bit of every colour.
  Facts follow mainstream child-nutrition guidance (WHO, UNICEF, Ethiopia's food-based dietary
  guidelines): variety from every food group, fruit and vegetables every day, legumes, eggs and
  milk, not too much sugar. No food is called "bad".
  Join-in line: "A little bit of every colour!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ከየቀለሙ ትንሽ ትንሽ!» and the three food jobs on pages 4 and 5.
*/
const story: Story = {
  id: "tsehays-rainbow-plate",
  course: "healthy-safe",
  pack: "story",
  title: { en: "Tsehay's Rainbow Plate", am: "የፀሐይ የቀስተ ደመና ሳሕን" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#E2763A",
  scene: "lib-tsehays-rainbow-plate",
  coverPage: 8,
  teaches: { words: ["food", "lentils", "vegetables", "fruit", "milk"] },
  pages: [
    {
      en: "Tsehay loved bread. Bread for breakfast. Bread for lunch. Bread for dinner. \"Just bread, please!\" she said, every single time.",
      am: "ፀሐይ ዳቦ ትወድ ነበር። ለቁርስ ዳቦ። ለምሳ ዳቦ። ለእራት ዳቦ። ሁልጊዜም «ዳቦ ብቻ፣ እባክሽ!» ትላለች።",
    },
    {
      en: "But Tsehay had two big wishes. She wanted to carry baby Dawit all by herself. And she wanted to hop the whole hopscotch without stopping.",
      am: "ፀሐይ ግን ሁለት ትልልቅ ምኞቶች ነበሯት። ሕፃኑን ዳዊትን ብቻዋን መሸከም ፈለገች። የዝላይ ጨዋታውንም ሳታቋርጥ እስከ መጨረሻው መዝለል ፈለገች።",
    },
    {
      en: '"Bread is good," said Mama. "But a body is like a garden. It needs lots of different things to grow." Papa nodded. "Let\'s look at dinner."',
      am: "«ዳቦ ጥሩ ነው» አለች እማማ። «ግን ሰውነት እንደ አትክልት ቦታ ነው። ለማደግ ብዙ ዓይነት ነገር ያስፈልገዋል።» አባባ ራሱን ነቀነቀ። «እስኪ እራቱን እንይ።»",
    },
    {
      en: '"Injera and bread give us energy," said Papa, "for running and hopping." He pointed at the stew. "Red lentils, eggs and milk help us grow big and strong."',
      am: "«እንጀራና ዳቦ ጉልበት ይሰጡናል» አለ አባባ፣ «ለሩጫና ለዝላይ።» ወጡን አመለከተ። «ቀይ ምስር፣ እንቁላልና ወተት ደግሞ ትልቅና ጠንካራ እንድንሆን ይረዱናል።»",
    },
    {
      en: '"And green gomen, orange carrots and sweet fruit," said Mama, "help keep us well." Tsehay looked at her plate. It was all one colour: bread brown.',
      am: "«አረንጓዴ ጎመን፣ ብርቱካናማ ካሮትና ጣፋጭ ፍራፍሬ ደግሞ» አለች እማማ፣ «ጤነኛ እንድንሆን ያግዙናል።» ፀሐይ ሳሕኗን ተመለከተች። ሁሉም አንድ ቀለም ነበር፦ የዳቦ ቡናማ።",
    },
    {
      en: "Tsehay thought about the garden. Red tomatoes. Green leaves. Yellow flowers. \"A garden has every colour,\" she said slowly. \"So my plate needs every colour too!\"",
      am: "ፀሐይ ስለ አትክልት ቦታው አሰበች። ቀይ ቲማቲም። አረንጓዴ ቅጠል። ቢጫ አበባ። «አትክልት ቦታ ሁሉም ቀለም አለው» አለች ቀስ ብላ። «ስለዚህ ሳሕኔም ሁሉንም ቀለም ይፈልጋል!»",
    },
    {
      en: "She took a fresh plate. Brown injera at the bottom. A spoon of red lentils. A spoon of green gomen. A little bit of every colour!",
      am: "አዲስ ሳሕን ወሰደች። ከሥር ቡናማ እንጀራ። አንድ ማንኪያ ቀይ ምስር። አንድ ማንኪያ አረንጓዴ ጎመን። ከየቀለሙ ትንሽ ትንሽ!",
    },
    {
      en: "Orange carrots. A yellow egg, cut in half. Baby Dawit squealed and pointed. A little bit of every colour!",
      am: "ብርቱካናማ ካሮት። ለሁለት የተቆረጠ ቢጫ እንቁላል። ሕፃኑ ዳዊት ጮኾ አመለከተ። ከየቀለሙ ትንሽ ትንሽ!",
    },
    {
      en: '"A rainbow plate!" said Papa. Tsehay ate every colour. The gomen was a bit strange at first, but with the lentils it was really quite nice.',
      am: "«የቀስተ ደመና ሳሕን!» አለ አባባ። ፀሐይ ሁሉንም ቀለም በላች። ጎመኑ መጀመሪያ ትንሽ እንግዳ ሆነባት፤ ከምስሩ ጋር ግን በጣም ጣፈጠ።",
    },
    {
      en: "Afterwards there was a yellow banana and a cup of white milk. \"Even after dinner there are colours!\" laughed Tsehay.",
      am: "ከዚያ በኋላ ቢጫ ሙዝና አንድ ኩባያ ነጭ ወተት ነበር። «ከእራት በኋላም ቀለሞች አሉ!» ብላ ሳቀች ፀሐይ።",
    },
    {
      en: "Day after day, Tsehay made rainbow plates. Bread was still on them, but so was everything else. And one morning, she carried baby Dawit all the way across the room.",
      am: "ቀን በቀን ፀሐይ የቀስተ ደመና ሳሕን ሠራች። ዳቦ አሁንም ነበረበት፤ ሌላውም ሁሉ ግን ነበረ። አንድ ጠዋትም ሕፃኑን ዳዊትን ተሸክማ ክፍሉን አቋረጠች።",
    },
    {
      en: "Then she hopped the whole hopscotch, without stopping once! \"What's your secret?\" asked Gugu. Tsehay grinned. \"A little bit of every colour!\"",
      am: "ከዚያ የዝላይ ጨዋታውን አንድ ጊዜ ሳታቋርጥ እስከ መጨረሻው ዘለለች! «ምስጢርሽ ምንድን ነው?» ብሎ ጠየቀ ጉጉ። ፀሐይ ፈገግ አለች። «ከየቀለሙ ትንሽ ትንሽ!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "What colours were on Tsehay's rainbow plate? Which foods were they?",
        "What colours are on our plate today? Which colour could we add?",
      ],
      am: [
        "በፀሐይ የቀስተ ደመና ሳሕን ላይ የነበሩት ቀለሞች ምን ምን ነበሩ? የትኞቹ ምግቦች ነበሩ?",
        "ዛሬ በሳሕናችን ላይ ምን ቀለሞች አሉ? የትኛውን ቀለም ልንጨምር እንችላለን?",
      ],
    },
    activity: {
      en: "At the next meal, count the colours on your child's plate together and let them add one. Aim for variety every day: a staple (injera, bread, rice, porridge), something that helps them grow (lentils, shiro, beans, eggs, milk, meat or fish when you can), and vegetables and fruit. Offer a new food many times, in small tastes, without pressure; it often takes a while to like it. Water and milk are the best drinks; keep sweets and sugary drinks for now and then.",
      am: "በሚቀጥለው ምግብ በልጅዎ ሳሕን ላይ ያሉትን ቀለሞች አብራችሁ ቁጠሩ፤ አንድ ቀለም እንዲጨምርም ያድርጉ። በየቀኑ ልዩነትን ያስቡ፦ ዋና ምግብ (እንጀራ፣ ዳቦ፣ ሩዝ፣ ገንፎ)፣ ለማደግ የሚረዳ (ምስር፣ ሽሮ፣ ባቄላ፣ እንቁላል፣ ወተት፣ ሲቻል ሥጋ ወይም ዓሣ)፣ አትክልትና ፍራፍሬ። አዲስ ምግብን ሳያስገድዱ በትንሽ በትንሹ ብዙ ጊዜ ያቅርቡ፤ ለመውደድ ጊዜ ይወስዳል። ከመጠጦች ውሃና ወተት ምርጦች ናቸው፤ ከረሜላና ጣፋጭ መጠጦች አልፎ አልፎ ብቻ ይሁኑ።",
    },
  },
};

export default story;
