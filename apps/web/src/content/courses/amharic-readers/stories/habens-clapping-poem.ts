import type { Story } from "../../../stories";

/*
  "Haben's Clapping Poem" (Amharic Readers, level 5): reading a poem aloud with rhythm. Haben
  is chosen to lead the class poem at the school's Friday gathering. The poem (written for this
  story) has four lines that all "hit the house" in -ይ:
    ፀሐይ ወጣች ከሰማይ፣ / ወፎች ዘመሩ ዛፍ ላይ፣ / ልጆች ጠጡ ትኩስ ሻይ፣ / ኑ እንጫወት ሜዳ ላይ!
  Haben rushes it, all in one breath. Teacher Meron shows her the beat: one clap for every word,
  a little rest at each ፣, and a big finish at the !. She practises with Ayan and Hawi, and on
  Friday the whole school claps along. The join-in line is "Clap, clap, read with the beat!"
  (አጨብጭቡ፣ አጨብጭቡ፣ በምቱ አንብቡ!).

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the poem itself (its rhythm should feel natural to say aloud), the join-in line, and «ምት»
  for beat.
*/
const POEM = "ፀሐይ ወጣች ከሰማይ፣ ወፎች ዘመሩ ዛፍ ላይ፣ ልጆች ጠጡ ትኩስ ሻይ፣ ኑ እንጫወት ሜዳ ላይ!";

const story: Story = {
  id: "habens-clapping-poem",
  course: "amharic-readers",
  pack: "story",
  title: { en: "Haben's Clapping Poem", am: "የሐበን የጭብጨባ ግጥም" },
  category: "Fidel",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#D98A1E",
  scene: "lib-habens-clapping-poem",
  coverPage: 10,
  teaches: { words: ["ግጥም", "ምት", "ፀሐይ ወጣች ከሰማይ፣", "ኑ እንጫወት ሜዳ ላይ!"] },
  pages: [
    {
      en: `On Monday Teacher Meron has news. "On Friday, our class will say a poem for the whole school. Haben, will you lead it?" Haben gulps, then nods.`,
      am: "ሰኞ መምህርት መሮን ዜና ነበራቸው። «ዓርብ ክፍላችን ለመላው ትምህርት ቤት ግጥም ያቀርባል። ሐበን፣ አንቺ ትመሪዋለሽ?» ሐበን ምራቋን ዋጠችና ራሷን ነቀነቀች።",
    },
    {
      en: `The poem is on the board. All four lines end the same way, in ይ: ፀሐይ ወጣች ከሰማይ፣ ወፎች ዘመሩ ዛፍ ላይ፣ ልጆች ጠጡ ትኩስ ሻይ፣ ኑ እንጫወት ሜዳ ላይ! "The sun came up in the sky, the birds sang in the tree, the children drank fresh tea: come and play in the field!"`,
      am: `ግጥሙ በሰሌዳው ላይ አለ። አራቱም መስመሮች በአንድ ዓይነት፣ በ«ይ» ያልቃሉ፦ ${POEM}`,
    },
    {
      en: `Haben reads it as fast as she can, all in one breath: "ፀሐይወጣችከሰማይወፎችዘመሩ…" She runs out of air and gasps. The class giggles, kindly. It sounds like a galloping horse!`,
      am: "ሐበን በተቻላት ፍጥነት በአንድ ትንፋሽ አነበበችው፦ «ፀሐይወጣችከሰማይወፎችዘመሩ…» ትንፋሿ አለቀና አለከለከች። ክፍሉ በደግነት ተሳሳቀ። እንደሚጋልብ ፈረስ ይመስላል!",
    },
    {
      en: `"A poem has a beat, like a drum," says Teacher Meron. "Let's clap once for every word." Clap, clap, clap: ፀሐይ – ወጣች – ከሰማይ. "And at the ፣, a little rest." Clap, clap, read with the beat!`,
      am: "«ግጥም እንደ ከበሮ ምት አለው» አሉ መምህርት መሮን። «ለእያንዳንዱ ቃል አንድ ጊዜ እናጨብጭብ።» ጭብ፣ ጭብ፣ ጭብ፦ ፀሐይ – ወጣች – ከሰማይ። «በነጠላ ሰረዙ ላይ ደግሞ ትንሽ እረፍት።» አጨብጭቡ፣ አጨብጭቡ፣ በምቱ አንብቡ!",
    },
    {
      en: `Haben tries again, clapping as she reads. ፀሐይ (clap) ወጣች (clap) ከሰማይ (clap)… rest… ወፎች (clap) ዘመሩ (clap) ዛፍ (clap) ላይ (clap)… It sounds like a song now!`,
      am: "ሐበን እያጨበጨበች እንደገና አነበበች። ፀሐይ (ጭብ) ወጣች (ጭብ) ከሰማይ (ጭብ)… እረፍት… ወፎች (ጭብ) ዘመሩ (ጭብ) ዛፍ (ጭብ) ላይ (ጭብ)… አሁን እንደ ዘፈን ይመስላል!",
    },
    {
      en: `"And listen to the ends," says Teacher Meron. "ሰማይ, ላይ, ሻይ, ላይ: they hit the house. Make those words ring!" Clap, clap, read with the beat!`,
      am: "«መጨረሻዎቹንም አዳምጡ» አሉ መምህርት መሮን። «ሰማይ፣ ላይ፣ ሻይ፣ ላይ፦ ቤት ይመታሉ። እነዚያን ቃላት አስተጋቡ!» አጨብጭቡ፣ አጨብጭቡ፣ በምቱ አንብቡ!",
    },
    {
      en: `After school Haben practises with Ayan and Hawi under the big tree. Ayan taps the beat on a tin can. Hawi stamps her foot on every rhyme. Clap, clap, read with the beat!`,
      am: "ከትምህርት በኋላ ሐበን ከአያንና ከሀዊ ጋር ከትልቁ ዛፍ ሥር ተለማመደች። አያን ምቱን በቆርቆሮ ጣሳ ላይ ትመታለች። ሀዊ በእያንዳንዱ ቤት ላይ እግሯን ትረግጣለች። አጨብጭቡ፣ አጨብጭቡ፣ በምቱ አንብቡ!",
    },
    {
      en: `At home she says it to her mother while they make coffee, and to her grandmother at bedtime. By Thursday, she knows it by heart, and her feet tap the beat all by themselves.`,
      am: "ቤት ውስጥ ቡና ሲያፈሉ ለእናቷ፣ በመኝታ ሰዓት ለአያቷ አለችው። እስከ ሐሙስ በቃሏ አጠናችው፤ እግሮቿም በራሳቸው ምቱን ይመታሉ።",
    },
    {
      en: `On Friday the whole school sits in the yard. So many faces! Haben's hands are cold. Then she sees Ayan and Hawi in the front row, clapping very softly, just for her.`,
      am: "ዓርብ መላው ትምህርት ቤት በግቢው ተቀመጠ። ስንት ፊቶች! የሐበን እጆች ቀዘቀዙ። ከዚያ አያንና ሀዊን በፊተኛው ረድፍ አየቻቸው፤ ለእሷ ብቻ በጣም በቀስታ እያጨበጨቡ።",
    },
    {
      en: `Haben takes a breath and begins, clapping: "ፀሐይ ወጣች ከሰማይ፣…" Her voice is small at first, then stronger. The class joins in, clapping the beat: "…ወፎች ዘመሩ ዛፍ ላይ፣…"`,
      am: "ሐበን በረጅሙ ተነፈሰችና እያጨበጨበች ጀመረች፦ «ፀሐይ ወጣች ከሰማይ፣…» መጀመሪያ ድምፅዋ ትንሽ ነበር፤ ከዚያ ጠነከረ። ክፍሉ ምቱን እያጨበጨበ ተቀላቀለ፦ «…ወፎች ዘመሩ ዛፍ ላይ፣…»",
    },
    {
      en: `"…ልጆች ጠጡ ትኩስ ሻይ፣ ኑ እንጫወት ሜዳ ላይ!" Now the whole school is clapping! On the last !, everyone shouts "ላይ!" and throws their hands in the air.`,
      am: "«…ልጆች ጠጡ ትኩስ ሻይ፣ ኑ እንጫወት ሜዳ ላይ!» አሁን መላው ትምህርት ቤት እያጨበጨበ ነው! በመጨረሻው ቃለ አጋኖ ላይ ሁሉም «ላይ!» ብለው ጮኹና እጆቻቸውን ወደ ላይ ዘረጉ።",
    },
    {
      en: `And then, just like the poem says, everyone runs out to play in the field. Haben is still clapping the beat as she runs. Clap, clap, read with the beat!`,
      am: "ከዚያ ልክ ግጥሙ እንደሚለው ሁሉም በሜዳው ላይ ለመጫወት ሮጡ። ሐበን እየሮጠች አሁንም ምቱን ታጨበጭባለች። አጨብጭቡ፣ አጨብጭቡ፣ በምቱ አንብቡ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why did Haben's first reading sound like a galloping horse?", "Which words in the poem hit the house (rhyme)?"],
      am: ["የሐበን የመጀመሪያ ንባብ ለምን እንደሚጋልብ ፈረስ መሰለ?", "በግጥሙ ውስጥ ቤት የሚመቱት የትኞቹ ቃላት ናቸው?"],
    },
    activity: {
      en: "Say Haben's poem together, clapping once for every word and resting at each ፣. Then try a song you both know the same way. Can your child learn four lines by heart and perform them for the family?",
      am: "የሐበንን ግጥም ለእያንዳንዱ ቃል አንድ ጊዜ እያጨበጨባችሁና በእያንዳንዱ ነጠላ ሰረዝ እያረፋችሁ አብራችሁ በሉት። ከዚያ ሁለታችሁም የምታውቁትን ዘፈን በዚሁ መንገድ ሞክሩ። ልጃችሁ አራት መስመሮችን በቃሉ አጥንቶ ለቤተሰቡ ማቅረብ ይችላል?",
    },
  },
};

export default story;
