import type { Story } from "../../../stories";

/*
  "A Poem for Grandma" (Amharic Readers, level 5): writing and reading a short poem with feeling.
  Ethiopian New Year (እንቁጣጣሽ, on 1 Meskerem, when the yellow adey flowers bloom) is coming and
  Anbessa has no gift for Grandma. Tsehay reminds him that Grandma always says words can be a
  gift. He writes a four-line poem (written for this story) that "hits the house" in -ባ:
    መስከረም ጠባ፣ / ፈካ አደይ አበባ፤ / አያቴ ሆይ ተቀበይ፣ / የፍቅር ቢጫ አበባ!
  He gets stuck on line three, crosses out, tries again, and practises reading it slowly and
  from the heart. On New Year's morning, with the girls singing «አበባ አየሽ ወይ» outside, he reads
  it to Grandma with a bunch of adey flowers. The join-in line is "Slowly, and from the heart!"
  (ቀስ ብሎ፣ ከልብ!).

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the poem (its words, rhyme and rhythm), «መስከረም ጠባ», the join-in line, and the New Year
  song's first words «አበባ አየሽ ወይ».
*/
const story: Story = {
  id: "a-poem-for-grandma",
  course: "amharic-readers",
  pack: "story",
  title: { en: "A Poem for Grandma", am: "ለአያቴ ግጥም" },
  category: "Fidel",
  ageBands: ["6-7", "8-9"],
  isFree: true,
  color: "#E3A511",
  scene: "lib-a-poem-for-grandma",
  coverPage: 10,
  teaches: { words: ["ግጥም", "መስከረም ጠባ፣", "ፈካ አደይ አበባ፤", "አያቴ ሆይ ተቀበይ፣", "የፍቅር ቢጫ አበባ!"] },
  pages: [
    {
      en: `The rains are over and the hills are turning yellow with adey flowers. New Year, እንቁጣጣሽ, is in three days. "What can I give Grandma?" Anbessa wonders. He has no money at all.`,
      am: "ክረምቱ አልፏል፤ ኮረብታዎቹ በአደይ አበባ ቢጫ እየሆኑ ነው። አዲስ ዓመት፣ እንቁጣጣሽ፣ በሦስት ቀን ውስጥ ይደርሳል። «ለአያቴ ምን ልስጣት?» ብሎ አሰበ አንበሳ። ምንም ገንዘብ የለውም።",
    },
    {
      en: `"Grandma always says words can be a gift," says Tsehay. "Write her a poem!" "A poem?" says Anbessa. "Poems are for grown-ups." "Poems are for everyone," says Tsehay.`,
      am: "«አያቴ ሁልጊዜ ቃላት ስጦታ ሊሆኑ ይችላሉ ትላለች» አለች ፀሐይ። «ግጥም ጻፍላት!» «ግጥም?» አለ አንበሳ። «ግጥም የትልልቅ ሰዎች ነው።» «ግጥም የሁሉም ነው» አለች ፀሐይ።",
    },
    {
      en: `Anbessa sits under the tree with his notebook. He looks at the hills. He writes the first line: መስከረም ጠባ፣ "Meskerem has dawned." That was easy!`,
      am: "አንበሳ ደብተሩን ይዞ ከዛፉ ሥር ተቀመጠ። ኮረብታዎቹን ተመለከተ። የመጀመሪያውን መስመር ጻፈ፦ መስከረም ጠባ፣ ያ ቀላል ነበር!",
    },
    {
      en: `For the second line he needs a word that ends like ጠባ. Ba… ba… He looks at the yellow flowers. "አበባ!" He writes: ፈካ አደይ አበባ፤ "The adey flower has bloomed." It hits the house!`,
      am: "ለሁለተኛው መስመር እንደ «ጠባ» የሚያልቅ ቃል ያስፈልገዋል። ባ… ባ… ቢጫዎቹን አበቦች ተመለከተ። «አበባ!» ጻፈ፦ ፈካ አደይ አበባ፤ ቤት መታ!",
    },
    {
      en: `The third line is hard. He writes something, crosses it out. Writes again, crosses it out. Lali buzzes round his head. "Everyone crosses out," says Tsehay. "That's how poems are made."`,
      am: "ሦስተኛው መስመር ከባድ ነው። አንድ ነገር ጻፈ፤ ሠረዘው። እንደገና ጻፈ፤ ሠረዘው። ላሊ በራሱ ዙሪያ ዞረች። «ሁሉም ይሠርዛል» አለች ፀሐይ። «ግጥም የሚሠራው እንዲህ ነው።»",
    },
    {
      en: `At last: አያቴ ሆይ ተቀበይ፣ "Grandma, please take…" and the last line: የፍቅር ቢጫ አበባ! "…a yellow flower of love!" Anbessa reads all four lines. His heart goes warm.`,
      am: "በመጨረሻ፦ አያቴ ሆይ ተቀበይ፣ የመጨረሻው መስመር ደግሞ፦ የፍቅር ቢጫ አበባ! አንበሳ አራቱንም መስመሮች አነበበ። ልቡ ሞቀ።",
    },
    {
      en: `He reads it to Tsehay, very fast and very loud, like a market seller. Tsehay giggles. "It's for Grandma, not for the whole market! Read it slowly, and from the heart." Slowly, and from the heart!`,
      am: "ለፀሐይ በጣም በፍጥነትና በጣም ጮክ ብሎ፣ እንደ ገበያ ነጋዴ አነበበላት። ፀሐይ ሳቀች። «ለአያቴ ነው እንጂ ለመላው ገበያ አይደለም! ቀስ ብለህ፣ ከልብህ አንብበው።» ቀስ ብሎ፣ ከልብ!",
    },
    {
      en: `So he practises: soft at the start, a little rest at each ፣, a gentle smile on አያቴ, and a big happy voice for the ! at the end. Slowly, and from the heart!`,
      am: "ስለዚህ ተለማመደ፦ መጀመሪያ ላይ ለስለስ ብሎ፣ በእያንዳንዱ ነጠላ ሰረዝ ትንሽ እረፍት፣ «አያቴ» ላይ ለስላሳ ፈገግታ፣ በመጨረሻው ቃለ አጋኖ ላይ ደግሞ ትልቅ የደስታ ድምፅ። ቀስ ብሎ፣ ከልብ!",
    },
    {
      en: `He copies the poem in his best writing onto a clean page, and draws yellow flowers all round it. Then he and Tsehay pick a big bunch of real adey flowers from the hill.`,
      am: "ግጥሙን በምርጥ የእጅ ጽሑፉ በንጹሕ ገጽ ላይ ገለበጠው፤ ዙሪያውን ቢጫ አበቦች ሣለ። ከዚያ እሱና ፀሐይ ከኮረብታው ትልቅ እቅፍ እውነተኛ አደይ አበባ ለቀሙ።",
    },
    {
      en: `On New Year's morning, girls go from house to house singing «አበባ አየሽ ወይ». Anbessa stands in front of Grandma, holding the flowers and the page.`,
      am: "በአዲስ ዓመት ጧት ልጃገረዶች ከቤት ወደ ቤት እየሄዱ «አበባ አየሽ ወይ» ይዘምራሉ። አንበሳ አበቦቹንና ገጹን ይዞ ከአያቴ ፊት ቆመ።",
    },
    {
      en: `Slowly, and from the heart, he reads: "መስከረም ጠባ፣ ፈካ አደይ አበባ፤ አያቴ ሆይ ተቀበይ፣ የፍቅር ቢጫ አበባ!"`,
      am: "ቀስ ብሎ፣ ከልቡ አነበበ፦ «መስከረም ጠባ፣ ፈካ አደይ አበባ፤ አያቴ ሆይ ተቀበይ፣ የፍቅር ቢጫ አበባ!»",
    },
    {
      en: `Grandma's eyes fill with happy tears. She hugs him tight. "This is the best gift I have ever had." She pins the poem on the wall for everyone to read. Slowly, and from the heart!`,
      am: "የአያቴ ዓይኖች በደስታ እንባ ተሞሉ። አጥብቃ አቀፈችው። «ይህ እስከ ዛሬ ካገኘኋቸው ስጦታዎች ሁሉ ምርጡ ነው።» ሁሉም እንዲያነቡት ግጥሙን ግድግዳው ላይ ሰካችው። ቀስ ብሎ፣ ከልብ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Which words in Anbessa's poem hit the house (rhyme)?", "Why did Tsehay tell Anbessa to read slowly, from the heart?"],
      am: ["በአንበሳ ግጥም ውስጥ ቤት የሚመቱት የትኞቹ ቃላት ናቸው?", "ፀሐይ አንበሳን ቀስ ብሎ፣ ከልቡ እንዲያነብ ለምን ነገረችው?"],
    },
    activity: {
      en: "Write a four-line poem together for someone in the family: start with a season or a holiday, find two words that end the same way, and finish with a ! Copy it out neatly, decorate it, and let your child read it aloud as a gift.",
      am: "ለአንድ የቤተሰብ አባል ባለ አራት መስመር ግጥም አብራችሁ ጻፉ፦ በወቅት ወይም በበዓል ጀምሩ፤ በአንድ ዓይነት የሚያልቁ ሁለት ቃላትን ፈልጉ፤ በቃለ አጋኖ ጨርሱ። በጥንቃቄ ገልብጣችሁ አስጊጡት፤ ልጃችሁ እንደ ስጦታ ጮክ ብሎ ያንብበው።",
    },
  },
};

export default story;
