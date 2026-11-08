import type { Story } from "../../../stories";

/*
  "The Ball in the Garden" (level 2: owning mistakes and putting them right).
  Haben has just come to the village from Tigray, and Gugu is showing her his best football kick.
  BOOF! The ball flies over the fence into Auntie Sheep's tomato garden and breaks two plants.
  "Nobody saw! Let's run!" says Gugu. Haben thinks it through: Auntie Sheep would find broken
  plants and not know why. "Let's say it, then let's fix it!" They knock, tell the truth, say
  sorry and ask how to help; Auntie Sheep shows them how to stake and tie the stems. They find a
  better place to play, and weeks later Auntie brings them the first ripe tomatoes.
  Join-in line: "Let's say it, then let's fix it!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «እንናገር፣ ከዚያ እናስተካክል!», the kick sound «ቡፍ!», and «ትግራይ».
*/
const story: Story = {
  id: "ball-in-the-garden",
  course: "values-character",
  pack: "story",
  title: { en: "The Ball in the Garden", am: "ኳሷ አትክልቱ ውስጥ" },
  category: "Values",
  ageBands: ["3-5", "6-7", "8-9"],
  isFree: false,
  color: "#3F8A3E",
  scene: "lib-ball-in-the-garden",
  coverPage: 8,
  teaches: { words: ["mistake", "sorry", "fix", "garden", "honest"] },
  pages: [
    {
      en: 'Haben had just come to the village from Tigray, and Gugu was teaching her his best football kick. "Watch this!" he said. BOOF! The ball flew high over the fence…',
      am: "ሐበን ከትግራይ ወደ መንደሩ ገና መምጣቷ ነበር፤ ጉጉ ምርጡን የኳስ ምቱን ያስተምራት ነበር። «ይህን ተመልከቺ!» አለ። ቡፍ! ኳሷ ከአጥሩ በላይ ከፍ ብላ በረረች…",
    },
    {
      en: "…and landed in Auntie Sheep's garden. CRACK! Two tomato plants fell over, and three green tomatoes rolled in the dirt.",
      am: "…እና እማማ በግ አትክልት ውስጥ አረፈች። ቋ! ሁለት የቲማቲም ተክሎች ወደቁ፤ ሦስት አረንጓዴ ቲማቲሞች አፈሩ ላይ ተንከባለሉ።",
    },
    {
      en: 'Gugu\'s eyes went wide. "Nobody saw!" he whispered. "Let\'s run!" And he was already halfway to the big tree.',
      am: "የጉጉ ዓይኖች ተጎለጎሉ። «ማንም አላየም!» አለ በሹክሹክታ። «እንሩጥ!» ቀድሞውኑም ወደ ትልቁ ዛፍ ግማሽ መንገድ ደርሶ ነበር።",
    },
    {
      en: "Haben's heart went thump, thump. Running away would be easy. But Auntie Sheep watered those tomatoes every single evening. Haben stood still and thought hard.",
      am: "የሐበን ልብ ድው፣ ድው አለ። መሮጥ ቀላል ነበር። ግን እማማ በግ እነዚያን ቲማቲሞች በየምሽቱ ውሃ ታጠጣቸው ነበር። ሐበን ቆማ በደንብ አሰበች።",
    },
    {
      en: '"Gugu," she called. "If we run, Auntie Sheep will find her broken plants and never know why. Let\'s say it, then let\'s fix it!"',
      am: "«ጉጉ» ብላ ጠራችው። «ብንሮጥ እማማ በግ የተሰበሩ ተክሎቿን ታገኛለች፤ ለምን እንደተሰበሩም አታውቅም። እንናገር፣ ከዚያ እናስተካክል!»",
    },
    {
      en: "Gugu came back, slowly. Together they knocked on the garden gate. Knock, knock. Auntie Sheep opened it, holding her watering can.",
      am: "ጉጉ ቀስ ብሎ ተመለሰ። አብረው የአትክልቱን በር አንኳኩ። ኳ፣ ኳ። እማማ በግ የውሃ ማጠጫዋን ይዛ ከፈተች።",
    },
    {
      en: '"Auntie, we kicked our ball into your garden and broke two tomato plants," said Haben. "We\'re sorry," said Gugu, looking at his feet. "Can we help fix them?"',
      am: "«እማማ፣ ኳሳችንን አትክልትዎ ውስጥ መትተን ሁለት የቲማቲም ተክሎች ሰበርን» አለች ሐበን። «ይቅርታ» አለ ጉጉ እግሩን እያየ። «እንድናስተካክላቸው እንርዳዎት?»",
    },
    {
      en: 'Auntie Sheep looked at her poor tomatoes. She looked at the two friends. "Thank you for telling me," she said. "Come in. I\'ll show you how."',
      am: "እማማ በግ ምስኪኖቹን ቲማቲሞቿን ተመለከተች። ሁለቱን ጓደኛሞች ተመለከተች። «ስለነገራችሁኝ አመሰግናለሁ» አለች። «ግቡ። እንዴት እንደሚደረግ አሳያችኋለሁ።»",
    },
    {
      en: 'They tied the broken stems to sticks with soft strips of cloth. They pressed the soil back with their paws and hooves. They gave each plant a drink. "Let\'s say it, then let\'s fix it!" sang Haben.',
      am: "የተሰበሩትን ግንዶች በለስላሳ የጨርቅ ቁራጮች ከእንጨት ጋር አሰሩ። አፈሩን በእጆቻቸውና በሰኮናቸው መልሰው ጫኑ። ለእያንዳንዱ ተክል ውሃ አጠጡ። «እንናገር፣ ከዚያ እናስተካክል!» ብላ ዘመረች ሐበን።",
    },
    {
      en: "Then they found a better place to play football: the big field, far away from fences and gardens. And some evenings, they came back to help Auntie Sheep water her tomatoes.",
      am: "ከዚያ ለኳስ ጨዋታ የተሻለ ቦታ አገኙ፦ ከአጥሮችና ከአትክልቶች ርቆ ያለውን ትልቁን ሜዳ። አንዳንድ ምሽት ደግሞ እማማ በግን ቲማቲሞቿን ውሃ በማጠጣት ሊያግዟት ይመጡ ነበር።",
    },
    {
      en: 'Weeks later, Auntie Sheep knocked on their doors with a basket of shiny red tomatoes. "From the plants you saved," she smiled. "Fixers get the first ones!"',
      am: "ከሳምንታት በኋላ እማማ በግ በቅርጫት የሚያብረቀርቁ ቀይ ቲማቲሞች ይዛ በራቸውን አንኳኳች። «ካዳናችኋቸው ተክሎች ነው» አለች ፈገግ ብላ። «የመጀመሪያዎቹ ለአስተካካዮቹ ናቸው!»",
    },
    {
      en: '"Mistakes happen," said Haben, munching a tomato, "but fixing is the best part." Gugu grinned. "Next time, I\'ll be the first to say it!" Let\'s say it, then let\'s fix it!',
      am: "«ስህተት ያጋጥማል» አለች ሐበን ቲማቲም እየበላች፣ «ማስተካከሉ ግን ምርጡ ክፍል ነው።» ጉጉ ፈገግ አለ። «በሚቀጥለው ጊዜ መጀመሪያ የምናገረው እኔ ነኝ!» እንናገር፣ ከዚያ እናስተካክል!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Gugu wanted to run and Haben wanted to tell. Why do you think running felt easier? What would have happened if they ran?",
        "Can you remember a mistake you fixed? How did you fix it, and how did it feel afterwards?",
      ],
      am: [
        "ጉጉ መሮጥ ፈለገ፣ ሐበን ደግሞ መናገር ፈለገች። መሮጥ ለምን የቀለለ ይመስላችኋል? ቢሮጡ ኖሮ ምን ይሆን ነበር?",
        "ያስተካከላችሁት ስህተት ታስታውሳላችሁ? እንዴት አስተካከላችሁት? ከዚያ በኋላስ ምን ተሰማችሁ?",
      ],
    },
    activity: {
      en: 'Fix something together this week: a torn page (tape), a wobbly toy (glue), a muddy pair of shoes (a brush). Say out loud what happened first, then fix it, and sing "Let\'s say it, then let\'s fix it!"',
      am: "በዚህ ሳምንት አንድ ነገር አብራችሁ አስተካክሉ፦ የተቀደደ ገጽ (በፕላስተር)፣ የሚወዛወዝ አሻንጉሊት (በሙጫ)፣ የጭቃ ጫማ (በብሩሽ)። መጀመሪያ የሆነውን ጮክ ብላችሁ ተናገሩ፤ ከዚያ አስተካክሉት፤ «እንናገር፣ ከዚያ እናስተካክል!» ብላችሁ ዘምሩ።",
    },
  },
};

export default story;
