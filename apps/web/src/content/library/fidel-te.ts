import type { Story } from "../stories";

/*
  "Tiny Turtle's Trip ተ": Tiny Turtle sets off at breakfast for a party at the pond at sunset.
  Seven little goats, the ተ family (ተ ቱ ቲ ታ ቴ ት ቶ), zoom past her one by one, each saying its
  sound, and laugh that she is too slow. But fast is not the same as there: two chase butterflies
  and forget the way, two hop so hard they fall asleep, two can't cross the stream (goats hate
  getting wet; a turtle can swim), and one spins himself dizzy. Tiny Turtle gathers them all,
  leads them in order and arrives right on time. The join-in line is "Slow and steady, I'll get
  there!" At the party ቤ, one of the busy bees, lands beside ት and they read ቤት, home, and Tiny
  Turtle taps her shell: her ቤት comes with her everywhere.
  Tiny Turtle in Amharic is ትንሿ ኤሊ, and ትንሿ begins with ት.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line (ቀስ ብዬ፣ ቀስ ብዬ፣ እደርሳለሁ!), ተፈተለኩ ("off they zoomed", page 5), the tiny
  tap (ጠቅታ) for ት on page 4 and እልል on page 12.
*/
const story: Story = {
  id: "fidel-te",
  pack: "fidel",
  title: { en: "Tiny Turtle's Trip ተ", am: "የትንሿ ኤሊ ጉዞ ተ" },
  category: "Fidel",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#3E9B5A",
  scene: "lib-fidel-te",
  coverPage: 9,
  teaches: { fidel: ["ተ", "ቱ", "ቲ", "ታ", "ቴ", "ት", "ቶ"], words: ["ቤት"] },
  pages: [
    {
      en: 'Tiny Turtle has an invitation: "Party at the pond, at sunset!" The pond is far away, and Tiny Turtle is very, very slow. So she sets off at breakfast time.',
      am: "ትንሿ ኤሊ የግብዣ ወረቀት ደረሳት፦ «ፀሐይ ስትጠልቅ በኩሬው ዳር ድግስ!» ኩሬው ሩቅ ነው፤ ትንሿ ኤሊ ደግሞ በጣም፣ በጣም ቀርፋፋ ናት። ስለዚህ ገና በቁርስ ሰዓት ጉዞዋን ጀመረች።",
    },
    {
      en: 'Step… step… step. "Slow and steady, I\'ll get there!" Zoom! A little goat races past. It wears the letter ተ, and it says "ta", like in tub.',
      am: "እርምጃ… እርምጃ… እርምጃ። «ቀስ ብዬ፣ ቀስ ብዬ፣ እደርሳለሁ!» ዝው! አንዲት ትንሽ ፍየል እየሮጠች አለፈች። ተ የሚል ፊደል ለብሳለች፤ «ተ» ትላለች።",
    },
    {
      en: 'More goats come zooming! They\'re the ተ family, off to the party too. ቱ says "tu", like in two. ቲ says "ti", like in tea. ታ says "taa", like ta-daa!',
      am: "ሌሎች ፍየሎችም እየተፈተለኩ መጡ! የተ ቤተሰብ ናቸው፤ እነሱም ወደ ድግሱ ይሄዳሉ። ቱ «ቱ» ትላለች። ቲ «ቲ» ትላለች። ታ «ታ» ትላለች፣ ልክ እንደ «ታዳ!»",
    },
    {
      en: 'ቴ says "tay", like in table. ት says just "t", a tiny tap: t, t, t. ቶ says "to", like in toe. "You\'re too slow!" they giggle. "See you at the party!"',
      am: "ቴ «ቴ» ትላለች። ት «ት» ብቻ ትላለች፣ እንደ ትንሽ ጠቅታ፦ ት፣ ት፣ ት። ቶ «ቶ» ትላለች። «በጣም ቀርፋፋ ነሽ!» ብለው ሳቁ። «ድግሱ ላይ እንገናኝ!»",
    },
    {
      en: 'Hop, hop, hop! Off they zoom, over the hill and out of sight. Tiny Turtle keeps on walking. "Slow and steady, I\'ll get there!"',
      am: "ዘለል፣ ዘለል፣ ዘለል! ተፈተለኩ፤ ኮረብታውን አልፈው ከዓይን ተሰወሩ። ትንሿ ኤሊ መራመዷን ቀጠለች። «ቀስ ብዬ፣ ቀስ ብዬ፣ እደርሳለሁ!»",
    },
    {
      en: 'By the bushes, she finds ተ and ቱ chasing butterflies round and round. "Which way is the pond?" they ask. They have forgotten! "This way," says Tiny Turtle.',
      am: "ቁጥቋጦዎቹ አጠገብ ተ እና ቱ ቢራቢሮ እያባረሩ ሲሽከረከሩ አገኘቻቸው። «ኩሬው በየት በኩል ነው?» ብለው ጠየቁ። ረስተውታል! «በዚህ በኩል» አለች ትንሿ ኤሊ።",
    },
    {
      en: 'Under the big shady tree, ቲ and ታ are fast asleep. "We hopped too fast," yawns ቲ. "Now we\'re so tired!" Tiny Turtle wakes them gently.',
      am: "በትልቁ ጥላማ ዛፍ ሥር ቲ እና ታ ድብን ብለው ተኝተዋል። «በጣም በፍጥነት ዘለልን» አለች ቲ እያዛጋች። «አሁን በጣም ደከመን!» ትንሿ ኤሊ ቀስ ብላ ቀሰቀሰቻቸው።",
    },
    {
      en: 'At the stream, ቴ and ት are stuck. Goats don\'t like getting wet! "Climb on my shell," says Tiny Turtle. Paddle, paddle, and across they go.',
      am: "ወንዙ ጋ ቴ እና ት መሻገር አቅቷቸው ቆመዋል። ፍየሎች ውሃ አይወዱም! «በጀርባዬ ላይ ውጡ» አለች ትንሿ ኤሊ። ቀስ እያለች ዋኝታ አሻገረቻቸው።",
    },
    {
      en: 'On the hilltop, ቶ is spinning round and round. He hopped so fast that he got dizzy and lost! "Follow me," says Tiny Turtle. "Slow and steady, we\'ll get there!"',
      am: "በኮረብታው አናት ላይ ቶ ዙሪያውን እየተሽከረከረ ነው። በጣም በፍጥነት ስለዘለለ ዞረበትና መንገድ ጠፋበት! «ተከተለኝ» አለች ትንሿ ኤሊ። «ቀስ ብለን፣ ቀስ ብለን፣ እንደርሳለን!»",
    },
    {
      en: "Now Tiny Turtle leads the way, and seven little goats walk slowly behind her, all in order: ተ ቱ ቲ ታ ቴ ት ቶ. Step… step… step.",
      am: "አሁን ትንሿ ኤሊ መንገዱን ትመራለች፤ ሰባት ትንንሽ ፍየሎችም በቅደም ተከተል ቀስ ብለው ይከተሏታል፦ ተ ቱ ቲ ታ ቴ ት ቶ። እርምጃ… እርምጃ… እርምጃ።",
    },
    {
      en: "The sun is sinking. Are they too late? Just as the sun touches the hills… they reach the pond! Right on time.",
      am: "ፀሐይ እየጠለቀች ነው። ዘገዩ ይሆን? ፀሐይ ኮረብታውን ልክ ስትነካ… ኩሬው ደረሱ! ልክ በሰዓቱ።",
    },
    {
      en: 'Lanterns, music and friends! Lali, Gugu and Anbessa cheer. "Hooray for Tiny Turtle! Slow and steady got there!"',
      am: "ፋኖሶች፣ ሙዚቃና ጓደኞች! ላሊ፣ ጉጉና አንበሳ በደስታ ጮኹ። «እልል ለትንሿ ኤሊ! ቀስ ብላ፣ ቀስ ብላ ደረሰች!»",
    },
    {
      en: 'Then ቤ, a busy bee, lands by little ት. ቤ "bay", ት "t": ቤት! Home! Tiny Turtle taps her shell. "My ቤት comes with me everywhere!"',
      am: "ከዚያ ትጉዋ ንብ ቤ ከትንሿ ት አጠገብ አረፈች። ቤ «ቤ»፣ ት «ት»፦ ቤት! ትንሿ ኤሊ ጀርባዋን መታ መታ አደረገች። «የእኔ ቤት በሄድኩበት ሁሉ አብሮኝ ይሄዳል!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "The goats were very fast, so why did Tiny Turtle get to the party first?",
        "Tiny Turtle carries her ቤት (home) on her back. What would you take with you if you could carry your home?",
      ],
      am: [
        "ፍየሎቹ በጣም ፈጣኖች ነበሩ፤ ታዲያ ትንሿ ኤሊ እንዴት ቀድማ ደረሰች?",
        "ትንሿ ኤሊ ቤቷን በጀርባዋ ትይዛለች። ቤታችሁን ይዛችሁ መሄድ ብትችሉ ምን ይዛችሁ ትሄዱ ነበር?",
      ],
    },
    activity: {
      en: 'Play "slow and steady": walk across the room as slowly as a turtle, saying one sound of the ተ family on each step (ተ ቱ ቲ ታ ቴ ት ቶ). Then try it as fast as a goat. Which way is easier to say every sound clearly?',
      am: "«ቀስ ብዬ» የሚል ጨዋታ ተጫወቱ፦ ክፍሉን እንደ ኤሊ ቀስ ብላችሁ አቋርጡ፤ በእያንዳንዱ እርምጃ የተ ቤተሰብን አንድ ድምፅ በሉ (ተ ቱ ቲ ታ ቴ ት ቶ)። ከዚያ እንደ ፍየል በፍጥነት ሞክሩ። እያንዳንዱን ድምፅ በግልጽ ለማለት የቀለለው በየትኛው መንገድ ነው?",
    },
  },
};

export default story;
