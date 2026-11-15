import type { Story } from "../../../stories";

/*
  "Hot, Hot, Step Back!" (level 4: hot things at home).
  Mama makes coffee every afternoon; baby Dawit has learned to crawl and heads for the coals.
  Tsehay scoops him up and works out how to keep him away every day: she lays the fresh coffee
  grass in a big circle one big step from the fire, a "safe circle" that only grown-ups go inside.
  Papa turns pot handles in and puts hot tea in the middle of the table; Mama says what to do
  about a burn (tell a grown-up at once, cool it under clean running water).
  Facts follow WHO and burns first-aid guidance; the grown-ups card gives the details.
  Join-in line: "Hot, hot, step back!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line «ትኩስ ነው፣ ወደ ኋላ!», «ቄጠማ» and baby Dawit's «ትኩ! ትኩ!».
*/
const story: Story = {
  id: "hot-hot-step-back",
  course: "healthy-safe",
  pack: "story",
  title: { en: "Hot, Hot, Step Back!", am: "ትኩስ ነው፣ ወደ ኋላ!" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#E2553A",
  scene: "lib-hot-hot-step-back",
  coverPage: 4,
  teaches: { words: ["hot", "fire", "burn", "step", "safe"] },
  pages: [
    {
      en: "Every afternoon, Mama makes coffee. The coals glow red and the jebena bubbles. Tsehay loves the smell of the roasting beans.",
      am: "ሁልጊዜ ከሰዓት በኋላ እማማ ቡና ታፈላለች። ፍሙ ቀልቶ ያበራል፤ ጀበናው ይንተከተካል። ፀሐይ የቡናውን መዓዛ ትወዳለች።",
    },
    {
      en: "Baby Dawit can crawl now. Zoom! He crawls everywhere: under the stool, round the post… and straight towards the fire.",
      am: "ሕፃኑ ዳዊት አሁን መዳህ ይችላል። ዙም! ከበርጩማ ሥር፣ በምሰሶው ዙሪያ… ቀጥ ብሎም ወደ እሳቱ።",
    },
    {
      en: "Tsehay scooped him up. \"Hot, hot, step back!\" Mama hugged them both. \"Thank you. The coals, the pan and the jebena can all burn.\"",
      am: "ፀሐይ አፈፍ አድርጋ አነሣችው። «ትኩስ ነው፣ ወደ ኋላ!» እማማ አቀፈቻቸው። «አመሰግናለሁ። ፍሙ፣ ምጣዱና ጀበናው ያቃጥላሉ።»",
    },
    {
      en: "\"But Dawit doesn't know that yet,\" said Tsehay. \"How can we keep him away, every day?\" She looked at the fresh grass on the floor.",
      am: "«ዳዊት ግን ገና አያውቅም» አለች ፀሐይ። «በየቀኑ እንዴት እናርቀዋለን?» ወለሉ ላይ ያለውን ቄጠማ ተመለከተች።",
    },
    {
      en: "She laid the grass in a big circle round the coffee, one big step from the fire. \"Inside the circle is for grown-ups.\"",
      am: "ቄጠማውን ከእሳቱ አንድ ትልቅ እርምጃ አርቃ በቡናው ዙሪያ በክብ ዘረጋች። «የክቡ ውስጥ የትልልቆች ነው።»",
    },
    {
      en: "\"Children stay outside the circle,\" said Tsehay. \"Hot, hot, step back!\" Mama smiled. \"Our safe circle!\"",
      am: "«ልጆች ከክቡ ውጭ ይቆያሉ» አለች ፀሐይ። «ትኩስ ነው፣ ወደ ኋላ!» እማማ ፈገግ አለች። «የደህንነት ክባችን!»",
    },
    {
      en: "Dawit crawled up to the grass. Tsehay sat outside the circle and clapped. \"Come here, Dawit!\" He turned round and crawled to her.",
      am: "ዳዊት እስከ ቄጠማው ዳኸ። ፀሐይ ከክቡ ውጭ ተቀምጣ አጨበጨበች። «ና ዳዊት!» ዞሮ ወደ እሷ ዳኸ።",
    },
    {
      en: "Hot things live in the kitchen too: the injera pan, the cooking pot, the kettle. Tsehay walked round with Papa. \"Hot, hot, step back!\"",
      am: "በማድቤትም ትኩስ ነገሮች አሉ፦ ምጣድ፣ ድስት፣ ማንቆርቆሪያ። ፀሐይ ከአባባ ጋር ዞረች። «ትኩስ ነው፣ ወደ ኋላ!»",
    },
    {
      en: "Papa turned the pot handles in, so nobody could knock them. \"And hot tea goes in the middle of the table, far from little hands.\"",
      am: "አባባ ማንም እንዳይመታቸው የድስቶቹን እጀታ ወደ ውስጥ አዞረ። «ትኩስ ሻይም ከትንንሽ እጆች ርቆ መሃል ይቀመጣል።»",
    },
    {
      en: "\"And if someone gets burnt?\" asked Tsehay. \"Tell a grown-up straight away,\" said Mama, \"and cool it under clean running water.\"",
      am: "«አንድ ሰው ቢቃጠልስ?» አለች ፀሐይ። «ወዲያው ለትልቅ ሰው ንገሩ» አለች እማማ፣ «በሚፈስ ንጹሕ ውሃም አቀዝቅዙት።»",
    },
    {
      en: "That afternoon, the coffee bubbled and the incense curled. Everyone sat outside the safe circle, and Mama poured the first cup.",
      am: "በዚያ ከሰዓት ቡናው ተንተከተከ፤ ዕጣኑ ጨሰ። ሁሉም ከክቡ ውጭ ተቀመጡ፤ እማማ የመጀመሪያውን ስኒ ቀዳች።",
    },
    {
      en: "Dawit pointed at the fire and said his very first word: \"Ho! Ho!\" Everyone laughed. \"That's right, Dawit. Hot, hot, step back!\"",
      am: "ዳዊት እሳቱን አመልክቶ የመጀመሪያ ቃሉን ተናገረ፦ «ትኩ! ትኩ!» ሁሉም ሳቁ። «ልክ ነው ዳዊት። ትኩስ ነው፣ ወደ ኋላ!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why did Tsehay make a circle of grass? Who goes inside it?",
        "What hot things are in our home? Where can little children stay safe?",
      ],
      am: [
        "ፀሐይ የቄጠማ ክብ ለምን ሠራች? ወደ ውስጡ የሚገባው ማን ነው?",
        "በቤታችን ያሉ ትኩስ ነገሮች ምን ምን ናቸው? ትንንሽ ልጆች የት ሆነው ደህና ይሆናሉ?",
      ],
    },
    activity: {
      en: "Make your own safe circle round the fire, stove or mitad: about one big step away, where children stay outside. Turn pot handles inwards, keep hot drinks in the middle of the table, and never hold a child while carrying something hot. For a burn: cool it under cool (not icy) running water for 20 minutes, cover it loosely with something clean, and don't put butter, oil, toothpaste or egg on it. Go to the health centre for any burn bigger than your child's palm, on the face, hands or private parts, or if you are worried.",
      am: "በእሳቱ፣ በምድጃው ወይም በምጣዱ ዙሪያ የራሳችሁን የደህንነት ክብ ሥሩ፦ አንድ ትልቅ እርምጃ ያህል ርቆ፣ ልጆች ከውጭ የሚቆዩበት። የድስት እጀታዎችን ወደ ውስጥ አዙሩ፤ ትኩስ መጠጦችን በጠረጴዛው መሃል አስቀምጡ፤ ትኩስ ነገር ተሸክማችሁ ልጅ አትያዙ። ለቃጠሎ፦ በቀዝቃዛ (በበረዶ ያልሆነ) የሚፈስ ውሃ ለ20 ደቂቃ አቀዝቅዙ፤ በንጹሕ ነገር በቀላሉ ሸፍኑ፤ ቅቤ፣ ዘይት፣ የጥርስ ሳሙና ወይም እንቁላል አትቀቡ። ከልጁ መዳፍ የሚበልጥ፣ ፊት፣ እጅ ወይም የግል ክፍል ላይ ያለ ቃጠሎ ካለ ወይም ከተጨነቃችሁ ወደ ጤና ጣቢያ ሂዱ።",
    },
  },
};

export default story;
