import type { Story } from "../../../stories";

/*
  "Read the Clue!" (level 1: ck and ng at the end of words, with a few blends).
  It is Hawi's birthday at Grandpa Tolosa's farm in the Bale Mountains, and Grandpa has hidden her
  present with a trail of clues. Clue 1, "Look by the black rock", has too many letters at the end
  until Grandpa explains that c and k both say k, so together they say it only once. A sock on the
  rock holds clue 2 ("Go to the duck pond"). Clue 3, "Ring the bell and sing", makes Hawi say "rin-
  guh"; Grandpa is far away now, so she works ng out by herself from the cow bell's ding-dong. The
  last clues lead to the swing and a long string up into the tree, and down comes her present: a
  notebook and a pencil, "for Hawi, who can read. Now write your own clues!" So she writes one for
  Grandpa: "Look in your sock!"
  Join-in line: "Read the clue, find the clue!"

  English taught: ck after a short vowel (black, rock, sock, duck, quack, back) and ng at the end
  (ring, sing, ding-dong, swing, long, string); reading short instructions.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ፍንጩን አንብብ፣ ፍንጩን ፈልግ!» and «ፍንጭ» for clue.
*/
const story: Story = {
  id: "hawis-clue-hunt",
  course: "english-readers",
  pack: "story",
  title: { en: "Read the Clue!", am: "ፍንጩን አንብቡ!" },
  category: "English",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#2E9A5B",
  scene: "lib-hawis-clue-hunt",
  coverPage: 7,
  teaches: { words: ["ck", "ng", "black", "rock", "sock", "duck", "ring", "sing", "swing", "long", "string"] },
  pages: [
    {
      en: 'It was Hawi\'s birthday, at Grandpa Tolosa\'s farm in the Bale Mountains. "I have hidden a present for you," said Grandpa. "But you must find it yourself. Here is your first clue!"',
      am: 'በባሌ ተራሮች፣ በአያቴ ቶሎሳ እርሻ ላይ፣ የሀዊ የልደት ቀን ነበር። «ስጦታ ደብቄልሻለሁ» አሉ አያት። «ግን ራስሽ ማግኘት አለብሽ። የመጀመሪያው ፍንጭሽ ይኸውልሽ!»',
    },
    {
      en: 'Hawi unrolled the paper. "Look by the… b-l-a-c-k… bla-k-k?" Too many letters at the end! She frowned at the c and the k.',
      am: 'ሀዊ ወረቀቱን ዘረጋችው። «Look by the… b-l-a-c-k… ብላ-ክ-ክ?» መጨረሻው ላይ በጣም ብዙ ፊደሎች! c እና kን ፊቷን ቋጥራ ተመለከተቻቸው።',
    },
    {
      en: '"c and k are good friends," said Grandpa. "They both say k. When they stand together at the end of a word, they say it only once: ck!" "Black! Look by the black rock!" Read the clue, find the clue!',
      am: '«c እና k የቅርብ ጓደኛሞች ናቸው» አሉ አያት። «ሁለቱም «ክ» ይላሉ። በቃል መጨረሻ አብረው ሲቆሙ አንድ ጊዜ ብቻ ይላሉ፦ ck!» «Black! Look by the black rock!» (ጥቁሩ ድንጋይ አጠገብ ተመልከቺ!) Read the clue, find the clue! (ፍንጩን አንብብ፣ ፍንጩን ፈልግ!)',
    },
    {
      en: 'Hawi ran to the big black rock. On top sat an old red sock, and in the sock was clue two: "Go to the duck pond." "s-o-ck, sock! d-u-ck, duck!" Read the clue, find the clue!',
      am: 'ሀዊ ወደ ትልቁ ጥቁር ድንጋይ ሮጠች። በላዩ ላይ አሮጌ ቀይ ካልሲ ነበር፤ በካልሲው ውስጥ ሁለተኛው ፍንጭ ነበር፦ «Go to the duck pond.» (ወደ ዳክዬዎቹ ኩሬ ሂጂ።) «s-o-ck፣ sock! d-u-ck፣ duck!» Read the clue, find the clue!',
    },
    {
      en: 'At the pond, the ducks said "Quack, quack!" Clue three was tied to a reed. "Ring the bell and… s-i-n-g. Sin-guh?" That sounded silly. And Grandpa was far away, by the house.',
      am: 'ኩሬው ጋ ዳክዬዎቹ «ኳክ፣ ኳክ!» አሉ። ሦስተኛው ፍንጭ ከቄጤማ ጋር ታስሮ ነበር። «Ring the bell and… s-i-n-g። ሲን-ጉ?» ያ የሚያስቅ ነበር። አያት ደግሞ ርቀው ቤቱ አጠገብ ነበሩ።',
    },
    {
      en: 'Hawi thought hard. Then a cow walked by, and her bell went "ding-dong, ding-dong". "Listen! At the end of ding, the sound goes up into my nose: ng! n and g make one sound!"',
      am: 'ሀዊ በጥልቀት አሰበች። ከዚያ አንዲት ላም አለፈች፤ ቃጭሏም «ዲንግ-ዶንግ፣ ዲንግ-ዶንግ» አለች። «ስሙ! በding መጨረሻ ድምፁ ወደ አፍንጫዬ ይወጣል፦ ng! n እና g አንድ ድምፅ ይሠራሉ!»',
    },
    {
      en: '"r-i-ng, ring! s-i-ng, sing! Ring the bell and sing!" She rang the big bell on the gate, ding-dong, and sang her happiest song. Read the clue, find the clue!',
      am: '«r-i-ng፣ ring! s-i-ng፣ sing! Ring the bell and sing!» (ደወሉን ደውዪና ዘምሪ!) በበሩ ላይ ያለውን ትልቅ ደወል ደወለች፤ ዲንግ-ዶንግ፤ በጣም ደስ የሚላትን ዘፈን ዘመረች። Read the clue, find the clue!',
    },
    {
      en: 'Her cousin Lensa came running out with clue four, laughing. "Look on the swing." "s-w-i-ng, swing!" Hawi was reading faster and faster now.',
      am: 'የአጎቷ ልጅ ለንሳ አራተኛውን ፍንጭ ይዛ እየሳቀች ሮጣ መጣች። «Look on the swing.» (ዥዋዥዌው ላይ ተመልከቺ።) «s-w-i-ng፣ swing!» ሀዊ አሁን እየፈጠነች ታነብ ነበር።',
    },
    {
      en: 'On the swing was the last clue: "Pull the long string." A long string ran from the swing all the way up into the big tree. "l-o-ng, long! s-t-r-i-ng, string!"',
      am: 'ዥዋዥዌው ላይ የመጨረሻው ፍንጭ ነበር፦ «Pull the long string.» (ረጅሙን ገመድ ጎትቺ።) ረጅም ገመድ ከዥዋዥዌው እስከ ትልቁ ዛፍ ላይ ድረስ ይዘልቅ ነበር። «l-o-ng፣ long! s-t-r-i-ng፣ string!»',
    },
    {
      en: 'Hawi pulled and pulled. Down from the branches swung a little bundle, wrapped in cloth. Inside was a notebook and a pencil, and a note: "For Hawi, who can read. Now write your own clues!"',
      am: 'ሀዊ ጎተተች፣ ጎተተች። ከቅርንጫፎቹ በጨርቅ የተጠቀለለ ትንሽ እሽግ ወረደ። ውስጥ ደብተርና እርሳስ ነበሩ፤ ማስታወሻም ነበር፦ «For Hawi, who can read. Now write your own clues!» (ማንበብ ለምትችለው ለሀዊ። አሁን የራስሽን ፍንጮች ጻፊ!)',
    },
    {
      en: 'So Hawi did. That evening Grandpa found a clue by his bed: "Look in your sock!" In his sock was a picture she had drawn, of the two of them. "Read the clue, find the clue!" laughed Grandpa.',
      am: 'ሀዊም እንዲሁ አደረገች። በዚያ ምሽት አያት ከአልጋቸው አጠገብ ፍንጭ አገኙ፦ «Look in your sock!» (ካልሲህ ውስጥ ተመልከት!) በካልሲያቸው ውስጥ የሁለቱን ሥዕል ሣላ አስቀምጣ ነበር። «Read the clue, find the clue!» አሉ አያት እየሳቁ።',
    },
    {
      en: "ck says k just once: black, rock, sock, duck. ng sings in your nose: ring, sing, swing, long. Read the clue, find the clue! Can you write a clue for someone at home, {name}?",
      am: "ck አንድ ጊዜ ብቻ «ክ» ይላል፦ black፣ rock፣ sock፣ duck። ng በአፍንጫ ይዘምራል፦ ring፣ sing፣ swing፣ long። Read the clue, find the clue! {name}፣ ለቤተሰባችሁ ፍንጭ መጻፍ ትችላላችሁ?",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["How did Hawi work out the ng sound when Grandpa was far away?", "Which clue would you like to find? Where would you hide a present?"],
      am: ["አያት ርቀው በነበሩ ጊዜ ሀዊ የngን ድምፅ እንዴት አወቀችው?", "የትኛውን ፍንጭ ማግኘት ትፈልጋላችሁ? ስጦታን የት ትደብቃላችሁ?"],
    },
    activity: {
      en: 'Make a little clue hunt at home with three or four short clues in English: "Look in my sock." "Look by the clock." "Ring the bell." "Look on the bed." Your child reads each clue to find the next one, and at the end there is a small treat. Then swap: your child writes a clue for you. Notice together that ck comes after a short vowel at the end of a word (duck, sock, back), and that ng is one sound made in the nose.',
      am: 'በቤት ውስጥ ሦስት ወይም አራት አጫጭር የእንግሊዝኛ ፍንጮች ያሉት ትንሽ የፍንጭ ፍለጋ አዘጋጁ፦ «Look in my sock.» «Look by the clock.» «Ring the bell.» «Look on the bed.» ልጅዎ ቀጣዩን ለማግኘት እያንዳንዱን ፍንጭ ያነባል፤ በመጨረሻ ትንሽ ሽልማት አለ። ከዚያ ቦታ ተቀያየሩ፦ ልጅዎ ለእርስዎ ፍንጭ ይጻፍ። ck በቃል መጨረሻ ከአጭር አናባቢ በኋላ እንደሚመጣ (duck፣ sock፣ back)፣ ngም በአፍንጫ የሚወጣ አንድ ድምፅ እንደሆነ አብራችሁ አስተውሉ።',
    },
  },
};

export default story;
