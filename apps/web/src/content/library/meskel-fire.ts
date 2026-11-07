import type { Story } from "../stories";

/*
  "Meskel Fire": after the long rains the hills turn yellow with Meskel daisies (adey abeba).
  Anbessa, Lali and the village gather flowers and sticks, build the Demera (the tall cone of
  poles), dress it with daisies and put a flower-covered cross on the very top. Anbessa is too
  small to reach the top with his best daisy, so Lali carries it up for him. At dusk everyone
  comes in white with torches, walks round the Demera singing, and Grandma tells (simply) how
  Queen Eleni lit a fire and its smoke showed her where the cross lay hidden. The Demera is lit,
  the smoke leans and points, and next morning Grandma draws a little ash cross on Anbessa's
  forehead, as families do on Meskel day.
  The repeated line to join in on: "Yellow flowers, bright fire, Meskel is here!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the repeated line (ቢጫ አበባ፣ ደማቅ እሳት፣ መስቀል ደረሰ!), «ችቦ» for the torches, the sound words
  (ቡዝ, ቋ ቋ, ሹው) and the wording of the Queen Eleni page.
*/
const story: Story = {
  id: "meskel-fire",
  pack: "story",
  title: { en: "Meskel Fire", am: "የመስቀል ደመራ" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: true,
  color: "#E8862A",
  scene: "lib-meskel-fire",
  coverPage: 9,
  teaches: { words: ["meskel", "daisies", "demera", "cross", "torches", "smoke"] },
  pages: [
    {
      en: 'The long rains were over. All over the hills, yellow Meskel daisies opened like little suns. "Adey abeba!" said Grandma. "Meskel is coming!"',
      am: "ረጅሙ ክረምት አለፈ። በኮረብታዎቹ ሁሉ ላይ ቢጫ የመስቀል አበቦች እንደ ትናንሽ ፀሐዮች ፈኩ። «አደይ አበባ!» አለች አያት። «መስቀል እየመጣ ነው!»",
    },
    {
      en: "Anbessa and Lali picked daisies: one for the basket, one for the basket, and one behind his ear. Yellow flowers, bright fire, Meskel is here!",
      am: "አንበሳና ላሊ አበቦችን ለቀሙ፤ አንዱን ለቅርጫቱ፣ አንዱን ለቅርጫቱ፣ አንዱን ደግሞ ከጆሮው ኋላ። ቢጫ አበባ፣ ደማቅ እሳት፣ መስቀል ደረሰ!",
    },
    {
      en: "Then everyone brought sticks for the Demera. Gugu dragged a long, long one. Tsehay carried a little one. Bump, bump, over the grass!",
      am: "ከዚያ ሁሉም ለደመራው እንጨት አመጡ። ጉጉ ረጅም፣ ረጅም እንጨት ጎተተ። ፀሐይ ትንሽ እንጨት ተሸከመች። ዱብ፣ ዱብ፣ በሣሩ ላይ!",
    },
    {
      en: "They stood the sticks up together, leaning in, into a tall, pointy tower. Taller than a tukul! Taller than a tree! That was the Demera.",
      am: "እንጨቶቹን አንድ ላይ አቆሙአቸው፤ እርስ በርስ ተደጋግፈው ረጅምና ሾጣጣ ማማ ሆኑ። ከጎጆ ይረዝማል! ከዛፍ ይረዝማል! ደመራው ይህ ነው።",
    },
    {
      en: "Now the flowers! Everyone tied yellow daisies all over the Demera. And right on the very top, they put a cross, covered in flowers.",
      am: "አሁን አበቦቹ! ሁሉም ቢጫ አበቦችን በደመራው ዙሪያ አሰሩ። በጫፉ ላይ ደግሞ በአበቦች ያጌጠ መስቀል አደረጉ።",
    },
    {
      en: "Anbessa had saved his very best daisy for the cross. He stretched up on his tiptoes. Up, up... but he was too small. His ears drooped.",
      am: "አንበሳ ምርጡን አበባ ለመስቀሉ አስቀምጦ ነበር። በእግሩ ጣቶች ተንጠራራ። ወደ ላይ፣ ወደ ላይ... ግን በጣም ትንሽ ነበር። ጆሮዎቹ ወደቁ።",
    },
    {
      en: '"Buzz! I can help," said Lali. She carried his daisy up, up, up, and tucked it into the cross. Anbessa cheered. Yellow flowers, bright fire, Meskel is here!',
      am: "«ቡዝ! እኔ ልርዳህ» አለች ላሊ። አበባውን ወደ ላይ፣ ወደ ላይ ወስዳ በመስቀሉ ላይ ሰካችው። አንበሳ በደስታ ጮኸ። ቢጫ አበባ፣ ደማቅ እሳት፣ መስቀል ደረሰ!",
    },
    {
      en: "At sunset, everyone came dressed in white, holding torches made of sticks. They walked round and round the Demera, singing.",
      am: "ፀሐይ ስትጠልቅ ሁሉም ነጭ ለብሰው ችቦ ይዘው መጡ። በደመራው ዙሪያ እየዘመሩ ዞሩ፣ ዞሩ።",
    },
    {
      en: '"Long ago," said Grandma, "Queen Eleni was looking for the cross. She lit a fire and prayed, and its smoke pointed the way to where it was hidden."',
      am: "«ድሮ ድሮ» አለች አያት፣ «ንግሥት ዕሌኒ መስቀሉን ትፈልግ ነበር። እሳት አንድዳ ጸለየች፤ ጢሱም መስቀሉ ወደ ተደበቀበት ቦታ መንገዱን አሳያት።»",
    },
    {
      en: "Then the torches touched the Demera. Whoosh! Crackle, pop! The fire climbed up and up, and the whole hill glowed orange.",
      am: "ከዚያ ችቦዎቹ ደመራውን ነኩት። ሹው! ቋ፣ ቋ! እሳቱ ወደ ላይ፣ ወደ ላይ ወጣ፤ ኮረብታው ሁሉ ብርቱካናማ ሆኖ አበራ።",
    },
    {
      en: 'Anbessa held Grandma\'s paw tight. The fire was big, but it was warm and bright, and everyone was smiling. "Yellow flowers, bright fire, Meskel is here!"',
      am: "አንበሳ የአያቱን እጅ አጥብቆ ያዘ። እሳቱ ትልቅ ነበር፤ ግን ሞቃትና ብሩህ ነበር፣ ሁሉም ፈገግ ብለው ነበር። «ቢጫ አበባ፣ ደማቅ እሳት፣ መስቀል ደረሰ!»",
    },
    {
      en: 'The smoke rose in a long, soft curl. "Look, Grandma! Which way is it pointing?" It leaned over the hills, towards the mountains, towards home.',
      am: "ጢሱ ረጅምና ለስላሳ ሆኖ ተጠቅልሎ ወጣ። «አያቴ፣ ተመልከቺ! ወደ የት ነው የሚያመለክተው?» ጢሱ ከኮረብታዎቹ በላይ ወደ ተራሮቹ፣ ወደ ቤት ዘመመ።",
    },
    {
      en: 'In the morning, Grandma drew a tiny cross of ash on Anbessa\'s forehead. He still had one yellow daisy behind his ear. "Happy Meskel!"',
      am: "ጠዋት ላይ አያት በአንበሳ ግንባር ላይ በአመድ ትንሽ መስቀል ሣለች። ከጆሮው ኋላ አሁንም አንድ ቢጫ አበባ ነበረው። «እንኳን ለመስቀል በዓል አደረሰን!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Anbessa was too small to reach the top of the Demera. How did Lali help him? When has someone helped you do something you could not do alone?",
        "The smoke pointed the way for Queen Eleni. What helps you find your way home?",
      ],
      am: [
        "አንበሳ የደመራውን ጫፍ ለመድረስ በጣም ትንሽ ነበር። ላሊ እንዴት ረዳችው? ብቻህ/ብቻሽ ልታደርገው ያልቻልከውን ነገር ሌላ ሰው የረዳህ/የረዳሽ መቼ ነው?",
        "ጢሱ ለንግሥት ዕሌኒ መንገዱን አሳያት። እናንተን ወደ ቤት መንገዱን የሚያሳያችሁ ምንድን ነው?",
      ],
    },
    activity: {
      en: "Make a little paper Demera: roll a cone of paper, glue on yellow paper daisies (or real ones), and put a small cross of sticks or paper on top. Count the daisies together as you stick them on.",
      am: "ትንሽ የወረቀት ደመራ ሥሩ፤ ወረቀት ሾጣጣ አድርጋችሁ ጠቅልሉ፣ ቢጫ የወረቀት አበቦችን (ወይም እውነተኛ አበቦችን) ለጥፉበት፣ በጫፉ ላይ ከእንጨት ወይም ከወረቀት ትንሽ መስቀል አድርጉ። አበቦቹን ስትለጥፉ አብራችሁ ቁጠሯቸው።",
    },
  },
};

export default story;
