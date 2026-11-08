import type { Story } from "../../../stories";

/*
  "Tsehay's Little Hands" (level 1: helping at home).
  Since baby Dawit came, Mama does everything at once. One morning she falls asleep, worn out.
  Tsehay thinks her hands are too small to help, and her friends are calling her out to play.
  She works it out: help first, then play. Sweeping (the broom is taller than her), picking the
  little stones out of the lentils (just right for small fingers), filling the water pot with
  her own small jug, and singing Dawit back to sleep. Mama wakes to a done house, and has the
  energy to roast kolo and come out and play hopscotch with Dawit on her back.
  Join-in line: "Little hands can help a lot!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ትንንሽ እጆች ብዙ ይረዳሉ!», «ዝላይ» (jumping games) for hopscotch, and the lullaby
  word «እሹሩሩ».
*/
const story: Story = {
  id: "tsehays-little-hands",
  course: "values-character",
  pack: "story",
  title: { en: "Tsehay's Little Hands", am: "የፀሐይ ትንንሽ እጆች" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#4A7FD0",
  scene: "lib-tsehays-little-hands",
  coverPage: 8,
  teaches: { words: ["help", "sweep", "chores", "family", "together"] },
  pages: [
    {
      en: "Since baby Dawit came, Mama was busy all day long. She rocked the baby, cooked the shiro, swept the floor and fetched the water, all at once!",
      am: "ሕፃኑ ዳዊት ከመጣ ጀምሮ እማማ ቀኑን ሙሉ ሥራ ይበዛባት ነበር። ሕፃኑን ታስተኛለች፣ ሽሮ ትሠራለች፣ ቤት ትጠርጋለች፣ ውሃ ትቀዳለች፤ ሁሉንም በአንድ ጊዜ!",
    },
    {
      en: 'One morning Mama sat down and closed her eyes. "Just for a minute," she yawned, and she fell fast asleep. Tsehay looked at her tired Mama. "I wish I could help. But my hands are so little."',
      am: "አንድ ቀን ጠዋት እማማ ተቀምጣ ዓይኖቿን ጨፈነች። «ለአንድ ደቂቃ ብቻ» ብላ አዛጋች፤ ወዲያውም እንቅልፍ ወሰዳት። ፀሐይ የደከማትን እናቷን ተመለከተች። «ብረዳት ደስ ይለኝ ነበር። ግን እጆቼ በጣም ትንንሽ ናቸው።»",
    },
    {
      en: 'Outside, Gugu and Hawi called, "Tsehay! Come and play hopscotch!" Tsehay looked at the door. She looked at Mama. Then she whispered, "Soon! First, a surprise for Mama."',
      am: "ውጭ ጉጉና ሀዊ «ፀሐይ! ነይ ዝላይ እንጫወት!» ብለው ጠሯት። ፀሐይ በሩን ተመለከተች። እማማን ተመለከተች። ከዚያ በሹክሹክታ «ቆይ ትንሽ! መጀመሪያ ለእማማ አንድ ድንቅ ነገር አለኝ» አለች።",
    },
    {
      en: "First, the floor. The broom was taller than Tsehay! So she swept a little bit at a time, corner by corner. Swish, swish. Little hands can help a lot!",
      am: "መጀመሪያ ወለሉ። መጥረጊያው ከፀሐይ ይረዝም ነበር! ስለዚህ ትንሽ በትንሽ፣ ጥግ በጥግ ጠረገች። ሽው፣ ሽው። ትንንሽ እጆች ብዙ ይረዳሉ!",
    },
    {
      en: "Next, the lentils. Mama always picked the tiny stones out of them. Tsehay's eyes were sharp and her fingers were small, just right for tiny stones. Pick, pick, pick!",
      am: "ቀጥሎ ምስሩ። እማማ ሁልጊዜ ትንንሾቹን ጠጠሮች ከምስሩ ትለቅም ነበር። የፀሐይ ዓይኖች ስለታም፣ ጣቶቿም ትንንሽ ነበሩ፤ ለትንንሽ ጠጠሮች ልክ ናቸው። ለቀም፣ ለቀም፣ ለቀም!",
    },
    {
      en: "Then, the water. The big jerrycan was much too heavy. So Tsehay took her own little jug, back and forth, back and forth, ten times! Splash, a little spilled, so she wiped it up.",
      am: "ከዚያ ውሃው። ትልቁ ጀሪካን በጣም ከባድ ነበር። ስለዚህ ፀሐይ የራሷን ትንሽ ማንቆርቆሪያ ይዛ ወዲያና ወዲህ፣ ወዲያና ወዲህ፣ አሥር ጊዜ ተመላለሰች! ቻ! ትንሽ ፈሰሰ፤ እሷም ጠረገችው።",
    },
    {
      en: 'Waaah! Baby Dawit woke up crying. Mama stirred. Quick! Tsehay rocked the cradle and sang Mama\'s lullaby, very softly: "Eshururu, eshururu…" Dawit\'s eyes closed. Shhh.',
      am: "ዋ! ሕፃኑ ዳዊት እያለቀሰ ነቃ። እማማ ተገላበጠች። ቶሎ! ፀሐይ አልጋውን እያወዛወዘች የእማማን ዜማ በቀስታ ዘመረች፦ «እሹሩሩ፣ እሹሩሩ…» የዳዊት ዓይኖች ተከደኑ። ሽሽሽ።",
    },
    {
      en: 'When Mama woke up, she blinked. "Who swept the floor? Who cleaned the lentils? Who filled the water pot? And who sang Dawit back to sleep?"',
      am: "እማማ ስትነቃ ዓይኖቿን አሸች። «ወለሉን ማን ጠረገው? ምስሩን ማን ለቀመው? እንስራውን ማን ሞላው? ዳዊትንስ ማን መልሶ አስተኛው?»",
    },
    {
      en: 'Tsehay held up her two little hands. "These did!" Mama laughed and hugged her tight. "Little hands can help a lot!"',
      am: "ፀሐይ ሁለት ትንንሽ እጆቿን ከፍ አደረገች። «እነዚህ!» እማማ ሳቀችና አጥብቃ አቀፈቻት። «ትንንሽ እጆች ብዙ ይረዳሉ!»",
    },
    {
      en: '"And now," said Mama, "I\'m not tired any more. Shall we roast some kolo for your friends?" Crackle, crackle went the barley in the pan. It smelled wonderful.',
      am: "«አሁን ደግሞ» አለች እማማ፣ «ድካሜ ለቀቀኝ። ለጓደኞችሽ ቆሎ እንቁላው?» ገብሱ በምጣዱ ላይ ቋ፣ ቋ አለ። ሽታው ድንቅ ነበር።",
    },
    {
      en: "Outside, Gugu and Hawi crunched kolo, Mama played hopscotch with Dawit asleep on her back, and Tsehay hopped highest of all. Little hands can help a lot, and then they can play!",
      am: "ውጭ ጉጉና ሀዊ ቆሎ ቆረጠሙ፤ እማማ ዳዊትን አዝላ ዝላይ ተጫወተች፤ ፀሐይ ደግሞ ከሁሉም በላይ ዘለለች። ትንንሽ እጆች ብዙ ይረዳሉ፤ ከዚያም ይጫወታሉ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "How did Tsehay know that Mama needed help? What did she choose to do first, helping or playing?",
        "Which jobs at home are just right for your hands? Which ones are still too big, and who could help you with them?",
      ],
      am: [
        "ፀሐይ እማማ እርዳታ እንደሚያስፈልጋት እንዴት አወቀች? መጀመሪያ ምን መረጠች፦ መርዳት ወይስ መጫወት?",
        "በቤት ውስጥ ለእጆቻችሁ ልክ የሆኑት ሥራዎች የትኞቹ ናቸው? ገና የሚከብዷችሁስ? በእነሱ ማን ሊረዳችሁ ይችላል?",
      ],
    },
    activity: {
      en: 'Choose one "little hands" job together this week: setting out the cups, picking stones from the lentils, folding small clothes or watering a plant. Give it a song, and do it together every day.',
      am: "በዚህ ሳምንት አንድ «የትንንሽ እጆች» ሥራ አብራችሁ ምረጡ፦ ስኒዎችን ማዘጋጀት፣ ከምስር ጠጠር መልቀም፣ ትንንሽ ልብሶችን ማጣጠፍ ወይም አትክልት ውሃ ማጠጣት። ዘፈን አውጡለትና በየቀኑ አብራችሁ ሥሩት።",
    },
  },
};

export default story;
