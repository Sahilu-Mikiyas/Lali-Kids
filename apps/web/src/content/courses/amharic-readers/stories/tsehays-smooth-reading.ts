import type { Story } from "../../../stories";

/*
  "Smooth as a River" (Amharic Readers, level 1): reading short sentences smoothly and with
  expression. Tsehay is to read a picture book (ትንሿ ድመት, "The Little Cat") to the little ones
  at school on Friday, but she reads like a robot, one stone-word at a time. Grandma: read the
  way you talk; words that belong together hold hands (an arch under them, one breath each),
  and the marks tell your voice what to do. Lali practises with her. On Friday the little ones
  gasp, laugh and shout "Again!". The join-in line is "Let the words hold hands!"
  (ቃላቱ እጅ ለእጅ ይያያዙ!).

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line, «እንደ ሮቦት» (page 1), the cat's «ሚያው!» (page 9) and the little book's
  sentences (pages 8–10), which should read as natural, simple Amharic for six-year-olds.
*/
const story: Story = {
  id: "tsehays-smooth-reading",
  course: "amharic-readers",
  pack: "story",
  title: { en: "Smooth as a River", am: "እንደ ወንዝ ለስላሳ" },
  category: "Fidel",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#3E8E5A",
  scene: "lib-tsehays-smooth-reading",
  coverPage: 11,
  teaches: { words: ["ትንሿ ድመት ወተት ጠጣች።", "ድመቷ የት ሄደች?", "ድመቷ ዛፍ ላይ ወጣች!"] },
  pages: [
    {
      en: `Tsehay has big news. On Friday she will read a story to the little ones at school! She chooses a book with a cat on the cover: ትንሿ ድመት, The Little Cat.`,
      am: "ፀሐይ ትልቅ ዜና አላት። ዓርብ በትምህርት ቤት ለትንንሾቹ ልጆች ታሪክ ታነባለች! ሽፋኑ ላይ ድመት ያለበትን መጽሐፍ መረጠች፦ ትንሿ ድመት።",
    },
    {
      en: `She practises with Gugu. "ትንሿ. ድመት. ወተት. ጠጣች." Each word stands alone, like stones in a river. Gugu yawns a great big yawn. "You sound like a robot!"`,
      am: "ከጉጉ ጋር ተለማመደች። «ትንሿ። ድመት። ወተት። ጠጣች።» እያንዳንዱ ቃል ለብቻው ቆሟል፤ በወንዝ ውስጥ እንዳሉ ድንጋዮች። ጉጉ ትልቅ ማዛጋት አዛጋ። «እንደ ሮቦት ታነቢያለሽ!»",
    },
    {
      en: `Tsehay's face falls. Grandma sits beside her. "Listen to how you talk: 'Gugu, come and eat!' Do you stop after every word? No. When we talk, the words hold hands." Let the words hold hands!`,
      am: "የፀሐይ ፊት ከፋ። አያቴ አጠገቧ ተቀመጠች። «እንዴት እንደምታወሪ ስሚ፦ ‹ጉጉ፣ ና ብላ!› ከእያንዳንዱ ቃል በኋላ ትቆሚያለሽ? አትቆሚም። ስናወራ ቃላቱ እጅ ለእጅ ይያያዛሉ።» ቃላቱ እጅ ለእጅ ይያያዙ!",
    },
    {
      en: `Grandma draws a little arch under the words that belong together: ትንሿ ድመት ‿ ወተት ጠጣች። "Read each arch in one breath, like water flowing over the stones."`,
      am: "አያቴ አብረው በሚሄዱት ቃላት ሥር ትንሽ ቅስት ሣለች፦ ትንሿ ድመት ‿ ወተት ጠጣች። «እያንዳንዱን ቅስት በአንድ ትንፋሽ አንብቢ፤ በድንጋዮቹ ላይ እንደሚፈስ ውሃ።»",
    },
    {
      en: `Tsehay tries again: "ትንሿ ድመት… ወተት ጠጣች።" Oh! It sounds like a real story now. Smooth as a river! Gugu sits up. Let the words hold hands!`,
      am: "ፀሐይ እንደገና ሞከረች፦ «ትንሿ ድመት… ወተት ጠጣች።» ኦ! አሁን እውነተኛ ታሪክ መሰለ። እንደ ወንዝ ለስላሳ! ጉጉ ቀና ብሎ ተቀመጠ። ቃላቱ እጅ ለእጅ ይያያዙ!",
    },
    {
      en: `"Now listen to the marks," says Grandma. "ድመቷ የት ሄደች? The ? makes your voice go up, wondering. ድመቷ ዛፍ ላይ ወጣች! The ! makes it big and surprised."`,
      am: "«አሁን ደግሞ ምልክቶቹን ስሚ» አለች አያቴ። «‹ድመቷ የት ሄደች?› የጥያቄ ምልክቱ ድምፅሽን እንደሚገረም ሰው ከፍ ያደርገዋል። ‹ድመቷ ዛፍ ላይ ወጣች!› ቃለ አጋኖው ደግሞ ትልቅና የሚያስደንቅ ያደርገዋል።»",
    },
    {
      en: `Every evening Tsehay practises with Lali. Lali buzzes along under the words as Tsehay reads, a little faster and a little smoother each time. Let the words hold hands!`,
      am: "ፀሐይ በየምሽቱ ከላሊ ጋር ተለማመደች። ፀሐይ ስታነብ ላሊ በቃላቱ ሥር እየበረረች ትከተላለች፤ በየጊዜው ትንሽ ፈጠን፣ ትንሽ ለስለስ እያለ። ቃላቱ እጅ ለእጅ ይያያዙ!",
    },
    {
      en: `On Friday the little ones sit on the mat, looking up at her. Tsehay's tummy does a flip. She takes a deep breath and opens the book.`,
      am: "ዓርብ ትንንሾቹ ልጆች ምንጣፉ ላይ ተቀምጠው ቀና ብለው ያዩዋታል። የፀሐይ ሆድ ተገለባበጠ። በረጅሙ ተነፈሰችና መጽሐፉን ከፈተች።",
    },
    {
      en: `"ትንሿ ድመት ወተት ፈለገች። «ወተት የት አለ?» አለች።" The little cat wanted milk. "Where is the milk?" she asked. Tsehay's voice goes up at the question. The little ones lean in closer.`,
      am: "«ትንሿ ድመት ወተት ፈለገች። ‹ወተት የት አለ?› አለች።» በጥያቄው ላይ የፀሐይ ድምፅ ከፍ አለ። ትንንሾቹ ልጆች ይበልጥ ተጠጉ።",
    },
    {
      en: `"ድመቷ ዛፍ ላይ ወጣች! «ሚያው! እርዱኝ!»" The cat climbed up a tree! "Miaow! Help me!" Tsehay reads it big and loud. The little ones gasp.`,
      am: "«ድመቷ ዛፍ ላይ ወጣች! ‹ሚያው! እርዱኝ!›» ፀሐይ ጮክ ብላ በትልቅ ድምፅ አነበበች። ትንንሾቹ ልጆች ደነገጡ።",
    },
    {
      en: `"አንዲት ልጅ መሰላል አመጣች። ድመቷ ወረደች፤ ወተቱንም ጠጣች።" A girl brought a ladder. The cat came down and drank her milk. The little ones cheer and clap.`,
      am: "«አንዲት ልጅ መሰላል አመጣች። ድመቷ ወረደች፤ ወተቱንም ጠጣች።» ትንንሾቹ ልጆች በደስታ ጮኹ፣ አጨበጨቡ።",
    },
    {
      en: `"Again! Again!" they shout. Tsehay smiles from ear to ear and reads it again, smooth as a river, with all the right voices. Let the words hold hands!`,
      am: "«እንደገና! እንደገና!» ብለው ጮኹ። ፀሐይ ከጆሮ እስከ ጆሮ ፈገግ ብላ እንደገና አነበበች፤ እንደ ወንዝ ለስላሳ፣ በትክክለኛ ድምፆች ሁሉ። ቃላቱ እጅ ለእጅ ይያያዙ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Read 'ትንሿ ድመት ወተት ጠጣች።' like a robot, then smoothly. Which sounds more like a story?", "How did Tsehay make her voice sound when she read a question?"],
      am: ["«ትንሿ ድመት ወተት ጠጣች።» የሚለውን መጀመሪያ እንደ ሮቦት፣ ከዚያ ለስለስ አድርጋችሁ አንብቡ። የትኛው ታሪክ ይመስላል?", "ፀሐይ ጥያቄ ስታነብ ድምፅዋን እንዴት አደረገችው?"],
    },
    activity: {
      en: "Choose a short page from any Amharic book. Read it to your child twice: once word by word, once smoothly. Then your child reads it to a younger child, a toy or you, like Tsehay, with the words holding hands.",
      am: "ከማንኛውም የአማርኛ መጽሐፍ አጭር ገጽ ምረጡ። ለልጃችሁ ሁለት ጊዜ አንብቡለት፦ አንዴ ቃል በቃል፣ አንዴ ለስለስ አድርጋችሁ። ከዚያ ልጃችሁ እንደ ፀሐይ ቃላቱን እጅ ለእጅ አያይዞ ለትንሽ ልጅ፣ ለአሻንጉሊት ወይም ለእናንተ ያንብብ።",
    },
  },
};

export default story;
