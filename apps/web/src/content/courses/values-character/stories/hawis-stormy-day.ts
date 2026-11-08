import type { Story } from "../../../stories";

/*
  "Hawi's Stormy Day" (level 5: naming feelings and calming down).
  Nothing goes right for Hawi: her porridge is too hot, it rains on her drawing, and she loses the
  running race. The anger grows inside her like a storm (drawn as a little cloud over her head
  that grows darker), and she shouts and stamps. Grandpa Tolosa doesn't scold. He asks her to name
  the feeling, and teaches her the coffee breath: smell the coffee (breathe in slowly), blow on it
  to cool it (breathe out slowly), three times. The storm cloud shrinks. Then she can say what she
  needs, and the day turns.
  Join-in line: "Smell the coffee… blow it cool."

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ቡናውን እናሽትት… እፍ ብለን እናቀዝቅዘው።» and the feeling words on page 6.
*/
const story: Story = {
  id: "hawis-stormy-day",
  course: "values-character",
  pack: "story",
  title: { en: "Hawi's Stormy Day", am: "የሀዊ ማዕበላማ ቀን" },
  category: "Values",
  ageBands: ["3-5", "6-7", "8-9"],
  isFree: false,
  color: "#5A6A9E",
  scene: "lib-hawis-stormy-day",
  coverPage: 8,
  teaches: { words: ["angry", "calm", "breathe", "feelings", "words"] },
  pages: [
    {
      en: "It started at breakfast. Hawi's porridge was too hot, and she burned her tongue. \"Ow!\" Hawi frowned.",
      am: "የጀመረው ቁርስ ላይ ነው። የሀዊ ገንፎ በጣም ትኩስ ነበር፤ ምላሷን አቃጠላት። «ኡኡ!» ሀዊ ፊቷን አጨፈገገች።",
    },
    {
      en: "Then she drew a beautiful picture of the mountains, and the rain came and made it all runny. Hawi's frown got bigger.",
      am: "ከዚያ የተራሮቹን የሚያምር ሥዕል ሳለች፤ ዝናብ መጥቶ ሁሉንም አቀለጠው። የሀዊ መጨፍገግ ጨመረ።",
    },
    {
      en: 'Then the friends ran a race to the acacia tree, and Gugu won. Gugu ALWAYS won. "It\'s not fair!" Hawi felt something hot and stormy growing inside her.',
      am: "ከዚያ ጓደኞቹ እስከ ግራሩ ዛፍ ተሽቀዳደሙ፤ ጉጉ አሸነፈ። ጉጉ ሁልጊዜ ያሸንፋል። «ፍትሐዊ አይደለም!» ሀዊ በውስጧ የሆነ ትኩስና ማዕበላማ ነገር ሲያድግ ተሰማት።",
    },
    {
      en: 'Gugu laughed, "Next time!" and that was the last straw. Hawi stamped her feet and shouted, "GO AWAY! I don\'t want to play with ANYONE!" Everyone went quiet.',
      am: "ጉጉ «በሚቀጥለው ጊዜ!» ብሎ ሳቀ፤ ያ ደግሞ ከሁሉ የባሰ ሆነ። ሀዊ እግሯን እያነጠረች «ሂዱ! ከማንም ጋር መጫወት አልፈልግም!» ብላ ጮኸች። ሁሉም ጸጥ አሉ።",
    },
    {
      en: "Hawi ran home and threw herself down by the door, her ears flat, her tail thumping. Grandpa Tolosa was sitting in the sun with his stick.",
      am: "ሀዊ ወደ ቤት ሮጣ በበሩ አጠገብ ራሷን ጣለች፤ ጆሮዎቿ ተኝተው፣ ጭራዋ መሬቱን እየመታ። አባ ቶሎሳ በምርኩዛቸው ፀሐይ እየሞቁ ተቀምጠው ነበር።",
    },
    {
      en: '"Hmm," said Grandpa. "There\'s a storm in here today. What is its name? Is it sad? Is it angry? Is it disappointed?" Hawi sniffed. "Angry. And… sad too."',
      am: "«እምም» አሉ አባ ቶሎሳ። «ዛሬ እዚህ ማዕበል አለ። ስሙ ማን ነው? ሐዘን ነው? ቁጣ ነው? ቅሬታ ነው?» ሀዊ አፍንጫዋን ሳበች። «ቁጣ። እና… ሐዘንም።»",
    },
    {
      en: '"Good," said Grandpa. "When we know its name, we can calm it. Let me show you the coffee breath. Smell the coffee…" He breathed in slowly through his nose. "…blow it cool." He breathed out slowly, like cooling a cup.',
      am: "«ጥሩ» አሉ አባ ቶሎሳ። «ስሙን ስናውቅ ልናረጋጋው እንችላለን። የቡና ትንፋሹን ላሳይሽ። ቡናውን እናሽትት…» በአፍንጫቸው ቀስ ብለው ተነፈሱ። «…እፍ ብለን እናቀዝቅዘው።» ስኒ እንደሚያቀዘቅዝ ሰው ቀስ ብለው አስወጡ።",
    },
    {
      en: "Hawi tried. Smell the coffee… blow it cool. Once. Twice. Three times. Her tail stopped thumping. The storm inside got smaller, and smaller, until it was just a little grey cloud.",
      am: "ሀዊ ሞከረች። ቡናውን እናሽትት… እፍ ብለን እናቀዝቅዘው። አንድ ጊዜ። ሁለት ጊዜ። ሦስት ጊዜ። ጭራዋ መምታቱን አቆመ። በውስጧ ያለው ማዕበል እያነሰ፣ እያነሰ ሄዶ ትንሽ ግራጫ ደመና ብቻ ሆነ።",
    },
    {
      en: '"Now," said Grandpa, "what do you need?" Hawi thought. "I need… to win sometimes. And I need to say sorry for shouting."',
      am: "«አሁን» አሉ አባ ቶሎሳ፣ «ምን ያስፈልግሻል?» ሀዊ አሰበች። «አንዳንድ ጊዜ ማሸነፍ… ያስፈልገኛል። ስለጮኽኩም ይቅርታ መጠየቅ ያስፈልገኛል።»",
    },
    {
      en: 'Hawi went back to her friends. "Sorry I shouted. I was angry because I always lose." Gugu scratched his head. "Sorry I laughed. Let\'s race again, and this time I\'ll hop on one leg!"',
      am: "ሀዊ ወደ ጓደኞቿ ተመለሰች። «ስለጮኽኩ ይቅርታ። ሁልጊዜ ስለምሸነፍ ተናድጄ ነበር።» ጉጉ ራሱን አከከ። «ስለሳቅኩ ይቅርታ። እንደገና እንሽቀዳደም፤ በዚህ ጊዜ በአንድ እግሬ እዘላለሁ!»",
    },
    {
      en: "Everyone laughed, even Hawi. They raced again, and this time Hawi won, by a whisker. Then the sun came out over the mountains.",
      am: "ሁሉም ሳቁ፤ ሀዊም ጭምር። እንደገና ተሽቀዳደሙ፤ በዚህ ጊዜ ሀዊ በትንሽ ልዩነት አሸነፈች። ከዚያ ፀሐይ በተራሮቹ ላይ ወጣች።",
    },
    {
      en: "That night, Hawi taught Lali the coffee breath. Smell the coffee… blow it cool. \"Storms come,\" said Hawi, \"but now I know how to make them small.\"",
      am: "በዚያች ሌሊት ሀዊ ለላሊ የቡናውን ትንፋሽ አስተማረቻት። ቡናውን እናሽትት… እፍ ብለን እናቀዝቅዘው። «ማዕበል ይመጣል» አለች ሀዊ፣ «ግን አሁን እንዴት እንደማሳንሰው አውቃለሁ።»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "What made Hawi's storm grow? What helped it get smaller?",
        "Where do you feel anger in your body? What is your feeling's name when you are upset?",
      ],
      am: [
        "የሀዊ ማዕበል እንዲያድግ ያደረገው ምንድን ነው? እንዲያንስ የረዳውስ?",
        "ቁጣ በሰውነታችሁ የት ይሰማችኋል? ስትከፉ የስሜታችሁ ስም ማን ነው?",
      ],
    },
    activity: {
      en: "Practise the coffee breath together when everyone is calm: breathe in slowly through the nose (\"smell the coffee\"), breathe out slowly through the mouth (\"blow it cool\"), three times. Then use it together the next time someone feels stormy.",
      am: "ሁሉም የተረጋጋ ሲሆን የቡናውን ትንፋሽ አብራችሁ ተለማመዱ፦ በአፍንጫ ቀስ ብሎ መተንፈስ («ቡናውን ማሽተት»)፣ በአፍ ቀስ ብሎ ማስወጣት («እፍ ብሎ ማቀዝቀዝ»)፣ ሦስት ጊዜ። አንድ ሰው በሚቀጥለው ጊዜ ሲናደድ አብራችሁ ተጠቀሙበት።",
    },
  },
};

export default story;
