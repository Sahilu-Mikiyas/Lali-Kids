import type { Story } from "../../../stories";

/*
  "Abdi Asks First" (level 4: medicines and cleaning bottles are for grown-ups).
  Abdi finds pink tablets that look like sweets (Aabo's medicine) and an orange drink bottle by
  the door. Ayan stops him: medicine can look like sweets; and if you're not sure, ask first.
  Hooyo finds the "juice" is kerosene for the lamp in an old drink bottle, a mistake grown-ups
  sometimes make. Abdi works out his own fix (a big X on the bottle) and Hooyo puts kerosene,
  medicines, washing soap and bleach up high. Eat and drink only what a trusted grown-up gives you.
  Join-in line: "If I'm not sure, I ask first!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line «እርግጠኛ ካልሆንኩ መጀመሪያ እጠይቃለሁ!», «ነጭ ጋዝ» (kerosene) and «በረኪና» (bleach).
*/
const story: Story = {
  id: "abdi-asks-first",
  course: "healthy-safe",
  pack: "story",
  title: { en: "Abdi Asks First", am: "አብዲ መጀመሪያ ይጠይቃል" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#D9893A",
  scene: "lib-abdi-asks-first",
  coverPage: 3,
  teaches: { words: ["medicine", "bottle", "ask", "high", "safe"] },
  pages: [
    {
      en: "After playing, Abdi was hungry. On the table, next to Aabo's cup, he spotted a little packet of bright pink sweets.",
      am: "ከጨዋታ በኋላ አብዲ ርቦት ነበር። በጠረጴዛው ላይ፣ ከአቦ ኩባያ አጠገብ፣ ደማቅ ሮዝ ከረሜላ ያለበት ትንሽ ፓኬት አየ።",
    },
    {
      en: "And by the door stood a bottle of orange drink, his favourite! Abdi reached for the sweets first.",
      am: "በበሩ አጠገብ ደግሞ የሚወደው የብርቱካን መጠጥ ጠርሙስ ቆሞ ነበር! አብዲ መጀመሪያ ከረሜላዎቹን ሊያነሣ ተዘረጋ።",
    },
    {
      en: "\"Wait, Abdi!\" said Ayan. \"Those aren't sweets. They're Aabo's medicine. Medicine can look like sweets, but it can make children ill.\"",
      am: "«ቆይ አብዲ!» አለች አያን። «ከረሜላ አይደሉም። የአቦ መድኃኒት ናቸው። መድኃኒት ከረሜላ ይመስላል፤ ልጆችን ግን ያሳምማል።»",
    },
    {
      en: "Abdi pointed at the orange bottle. \"Is that juice?\" Ayan wasn't sure. \"I don't know. And if I'm not sure, I ask first!\"",
      am: "አብዲ ጠርሙሱን አመለከተ። «ያ ጭማቂ ነው?» አያን እርግጠኛ አልነበረችም። «አላውቅም። እርግጠኛ ካልሆንኩ መጀመሪያ እጠይቃለሁ!»",
    },
    {
      en: "They ran to Hooyo. She looked at the bottle and her eyes went wide. \"That's not juice. It's kerosene for the lamp! Thank you for asking.\"",
      am: "ወደ ሁዮ ሮጡ። ሁዮ ጠርሙሱን አይታ ዓይኖቿ ፈጠጡ። «ጭማቂ አይደለም። የኩራዝ ነጭ ጋዝ ነው! ስለጠየቃችሁ አመሰግናለሁ።»",
    },
    {
      en: "\"Someone put it in an old drink bottle,\" said Hooyo. \"That's a mistake grown-ups sometimes make. Let's fix it.\"",
      am: "«አንድ ሰው በአሮጌ የመጠጥ ጠርሙስ ውስጥ አስቀምጦታል» አለች ሁዮ። «ትልልቆችም እንዲህ ይሳሳታሉ። እናስተካክለው።»",
    },
    {
      en: "Abdi had an idea. He drew a big black X on a piece of paper and stuck it on the bottle. \"Now nobody will think it's juice!\"",
      am: "አብዲ ሐሳብ መጣለት። በወረቀት ላይ ትልቅ ጥቁር ኤክስ ሣለና ጠርሙሱ ላይ ለጠፈው። «አሁን ማንም ጭማቂ ነው አይልም!»",
    },
    {
      en: "Hooyo put the kerosene up high, where little hands can't reach. Then she put Aabo's medicine in a box on the top shelf.",
      am: "ሁዮ ነጭ ጋዙን ትንንሽ እጆች በማይደርሱበት ከፍ ብላ አስቀመጠችው። የአቦን መድኃኒትም በላይኛው መደርደሪያ ሣጥን ውስጥ አስቀመጠች።",
    },
    {
      en: "\"And the washing soap? And the bleach?\" asked Ayan. \"Up high too,\" said Hooyo. \"Cleaning bottles are for grown-ups.\"",
      am: "«የልብስ ሳሙናውስ? በረኪናውስ?» አለች አያን። «እነሱም ከፍ ብለው» አለች ሁዮ። «የጽዳት ጠርሙሶች የትልልቆች ናቸው።»",
    },
    {
      en: "\"So what can we eat and drink?\" asked Abdi. \"Only what a grown-up you trust gives you,\" said Hooyo, and she poured him some water.",
      am: "«ታዲያ ምን እንብላ፣ ምን እንጠጣ?» አለ አብዲ። «የምታምኑት ትልቅ ሰው የሚሰጣችሁን ብቻ» አለች ሁዮ፤ ውሃም ቀዳችለት።",
    },
    {
      en: "Then she gave him a real snack: bread with a little honey. Abdi licked his lips. \"This is much better than pink tablets!\"",
      am: "ከዚያ እውነተኛ መክሰስ ሰጠችው፦ ትንሽ ማር ያለበት ዳቦ። አብዲ ከንፈሩን ላሰ። «ከሮዝ ኪኒን በጣም ይሻላል!»",
    },
    {
      en: "Next day, Abdi found a little white tablet on the floor. He didn't touch it. He ran to Hooyo: \"If I'm not sure, I ask first!\"",
      am: "በሚቀጥለው ቀን አብዲ ወለሉ ላይ ትንሽ ነጭ ኪኒን አገኘ። አልነካውም። ወደ ሁዮ ሮጠ፦ «እርግጠኛ ካልሆንኩ መጀመሪያ እጠይቃለሁ!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why did Ayan stop Abdi? What was really in the orange bottle?",
        "Where do we keep medicines and cleaning bottles in our home?",
      ],
      am: [
        "አያን አብዲን ለምን አስቆመችው? በብርቱካኑ ጠርሙስ ውስጥ በእርግጥ ምን ነበር?",
        "በቤታችን መድኃኒቶችንና የጽዳት ጠርሙሶችን የት እናስቀምጣለን?",
      ],
    },
    activity: {
      en: "Walk round your home together and move medicines, kerosene, bleach, washing powder and insect killers up high or locked away, in their own labelled containers. Never put kerosene or chemicals in drink bottles, and never call medicine \"sweets\". If your child swallows something that might be harmful, don't make them vomit: take the container with you and go to the health centre straight away.",
      am: "አብራችሁ በቤታችሁ ዙሪያ ሂዱ፤ መድኃኒቶችን፣ ነጭ ጋዝን፣ በረኪናን፣ የልብስ ሳሙናንና ፀረ-ተባይን በራሳቸው ስም በተጻፈበት ዕቃ ውስጥ ከፍ ብለው ወይም ተቆልፎባቸው አስቀምጡ። ነጭ ጋዝን ወይም ኬሚካልን በፍጹም በመጠጥ ጠርሙስ ውስጥ አታስቀምጡ፤ መድኃኒትንም «ከረሜላ» ብላችሁ አትጥሩ። ልጅዎ ጎጂ ሊሆን የሚችል ነገር ከዋጠ አያስመልሱት፦ ዕቃውን ይዘው ወዲያውኑ ወደ ጤና ጣቢያ ይሂዱ።",
    },
  },
};

export default story;
