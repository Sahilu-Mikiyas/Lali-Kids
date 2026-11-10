import type { Story } from "../../../stories";

/*
  "Gugu's Rhyme Show" (level 5: word families -at and -ig; rhyming).
  Teacher Meron announces a Rhyme Show: each pair must find words that rhyme. Gugu and Haben pick
  "cat". Gugu tries: "cat… banana! cat… elephant!" No rhyme. Haben listens to the END of "cat" and
  works out the trick: keep the end, change the start. c-at, h-at, m-at, s-at: "The cat in a hat
  sat on a mat!" Then Gugu wants his own: "fig" from the fig tree. Keep the end, change the
  start: f-ig, b-ig, d-ig, w-ig, j-ig: "A big fig! Dig, dig! A wig! A jig!" At the show, the cat
  in the hat sits on the mat, and Gugu in an orange wig dances a jig under the big fig tree.
  Join-in line: "Keep the end, change the start!"

  English taught: word families -at (cat, hat, mat, sat) and -ig (fig, big, dig, wig, jig);
  what rhyming is.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «መጨረሻውን ጠብቁ፣ መጀመሪያውን ቀይሩ!» and «ቤት የሚመቱ ቃላት» for rhyming words.
*/
const story: Story = {
  id: "rhyme-show",
  course: "english-first-words",
  pack: "story",
  title: { en: "Gugu's Rhyme Show", am: "የጉጉ የግጥም ትርዒት" },
  category: "English",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#8E5BE0",
  scene: "lib-rhyme-show",
  coverPage: 10,
  teaches: { words: ["cat", "hat", "mat", "sat", "fig", "big", "dig", "wig", "jig"] },
  pages: [
    {
      en: 'Teacher Meron clapped. "Tomorrow is our Rhyme Show! Rhyming words sound the same at the end, like moon and spoon. Find some rhyming words with a friend!"',
      am: 'መምህርት መሮን አጨበጨበች። «ነገ የግጥም (Rhyme) ትርዒታችን ነው! ቤት የሚመቱ ቃላት መጨረሻቸው ላይ አንድ ዓይነት ድምፅ አላቸው፤ ልክ እንደ moon እና spoon። ከጓደኛችሁ ጋር ቤት የሚመቱ ቃላትን ፈልጉ!»',
    },
    {
      en: 'Gugu and Haben sat under the big fig tree. Dimmet the cat was asleep beside them. "Let\'s start with cat!" said Gugu.',
      am: 'ጉጉና ሐበን በትልቁ የሾላ ዛፍ ሥር ተቀመጡ። ድመቷ ዲሜት አጠገባቸው ተኝታ ነበር። «በcat እንጀምር!» አለ ጉጉ።',
    },
    {
      en: '"Cat… banana!" said Gugu. Haben shook her head. "Cat… elephant!" No. "Cat… injera!" Haben giggled. "Those don\'t sound the same at all!"',
      am: '«Cat… banana!» አለ ጉጉ። ሐበን ራሷን ነቀነቀች። «Cat… elephant!» አይደለም። «Cat… injera!» ሐበን ሳቀች። «እነዚያ ጭራሽ አይመሳሰሉም!»',
    },
    {
      en: 'Haben listened very carefully to the end of the word. "c… AT. The end is ‘at’!" she said. "So let\'s keep the end, and change the start!"',
      am: 'ሐበን የቃሉን መጨረሻ በጣም በጥንቃቄ አዳመጠች። «c… AT። መጨረሻው ‘at’ ነው!» አለች። «ስለዚህ መጨረሻውን እንጠብቅ፣ መጀመሪያውን እንቀይር!»',
    },
    {
      en: '"Keep the end, change the start! h-at, HAT! m-at, MAT! s-at, SAT!" The words tumbled out like popcorn. Keep the end, change the start!',
      am: '«መጨረሻውን ጠብቁ፣ መጀመሪያውን ቀይሩ! h-at፣ HAT! m-at፣ MAT! s-at፣ SAT!» ቃላቱ እንደ ፈንዲሻ ፈነዱ። መጨረሻውን ጠብቁ፣ መጀመሪያውን ቀይሩ!',
    },
    {
      en: '"I\'ve got one!" said Haben. "The cat in a hat sat on a mat!" They put Grandma\'s hat on Dimmet. Dimmet sat on the mat and looked very grand.',
      am: '«አንድ አገኘሁ!» አለች ሐበን። «The cat in a hat sat on a mat!» (ኮፍያ ያደረገች ድመት ምንጣፍ ላይ ተቀመጠች!) የአያቴን ኮፍያ ለዲሜት አደረጉላት። ዲሜት ምንጣፉ ላይ ተቀምጣ በጣም ኮራች።',
    },
    {
      en: 'Gugu was quiet. "That\'s your rhyme," he said. "I want my own." Plop! A fig fell from the tree onto his head. "A FIG!"',
      am: 'ጉጉ ዝም አለ። «ያ ያንቺ ግጥም ነው» አለ። «የራሴን እፈልጋለሁ።» ዱብ! ከዛፉ ላይ አንድ ሾላ ራሱ ላይ ወደቀ። «A FIG!»',
    },
    {
      en: 'Gugu rubbed his head and thought. "f… IG. Keep the end, change the start! b-ig, BIG! d-ig, DIG! w-ig, WIG! j-ig, JIG!"',
      am: 'ጉጉ ራሱን እያሻሸ አሰበ። «f… IG። መጨረሻውን ጠብቁ፣ መጀመሪያውን ቀይሩ! b-ig፣ BIG! d-ig፣ DIG! w-ig፣ WIG! j-ig፣ JIG!»',
    },
    {
      en: '"What\'s a jig?" asked Haben. "It\'s a happy, jumpy dance!" said Gugu, and he danced one, jig, jig, jig, round the big fig tree.',
      am: '«jig ምንድን ነው?» ብላ ጠየቀች ሐበን። «ደስ የሚል፣ የሚዘለል ጭፈራ ነው!» አለ ጉጉ፤ በትልቁ የሾላ ዛፍ ዙሪያ ጂግ፣ ጂግ፣ ጂግ ብሎ ጨፈረ።',
    },
    {
      en: 'The next day was the Rhyme Show. Haben went first. "The cat in a hat sat on a mat!" Dimmet sat on the mat in Grandma\'s hat. Everyone clapped.',
      am: 'በማግስቱ የግጥም ትርዒቱ ነበር። ሐበን መጀመሪያ ወጣች። «The cat in a hat sat on a mat!» ዲሜት የአያቴን ኮፍያ አድርጋ ምንጣፉ ላይ ተቀመጠች። ሁሉም አጨበጨቡ።',
    },
    {
      en: 'Then Gugu came out in a big orange wig. "A big fig! Dig, dig! I put on a wig and I dance a jig!" And he danced a jig. Everyone laughed and cheered.',
      am: 'ከዚያ ጉጉ ትልቅ ብርቱካናማ ሰው ሠራሽ ፀጉር አድርጎ ወጣ። «A big fig! Dig, dig! I put on a wig and I dance a jig!» (ትልቅ ሾላ! ቆፍር፣ ቆፍር! ሰው ሠራሽ ፀጉር አድርጌ እጨፍራለሁ!) ጂግም ጨፈረ። ሁሉም ሳቁ፣ በደስታም ጮኹ።',
    },
    {
      en: 'Cat, hat, mat, sat. Fig, big, dig, wig, jig. Keep the end, change the start! What rhymes with "sun", {name}?',
      am: 'Cat፣ hat፣ mat፣ sat። Fig፣ big፣ dig፣ wig፣ jig። መጨረሻውን ጠብቁ፣ መጀመሪያውን ቀይሩ! {name}፣ ከ«sun» ጋር ቤት የሚመታው ምንድን ነው?',
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["What was Haben's trick for finding rhymes?", "Can you find words that rhyme with \"cat\"? With \"big\"?"],
      am: ["ቤት የሚመቱ ቃላትን ለማግኘት የሐበን ዘዴ ምን ነበር?", "ከ«cat» ጋር ቤት የሚመቱ ቃላትን ማግኘት ትችላላችሁ? ከ«big» ጋርስ?"],
    },
    activity: {
      en: 'Make a word family together: write ‘at’ on a card and the letters c, h, m, s, b on small cards. Put each letter in front of ‘at’ and read the new word (cat, hat, mat, sat, bat). Then try ‘ig’ (big, dig, fig, wig) and ‘un’ (sun, run, fun, bun). Words in a family rhyme, and once a child can read one, they can read them all.',
      am: 'አብራችሁ የቃላት ቤተሰብ ሥሩ፦ በአንድ ካርድ ላይ ‘at’ ጻፉ፤ c፣ h፣ m፣ s፣ b ደግሞ በትንንሽ ካርዶች ላይ። እያንዳንዱን ፊደል ከ‘at’ ፊት አስቀምጣችሁ አዲሱን ቃል አንብቡ (cat፣ hat፣ mat፣ sat፣ bat)። ከዚያ ‘ig’ን (big፣ dig፣ fig፣ wig) እና ‘un’ን (sun፣ run፣ fun፣ bun) ሞክሩ። በአንድ ቤተሰብ ያሉ ቃላት ቤት ይመታሉ፤ ልጅ አንዱን ማንበብ ሲችል ሁሉንም ማንበብ ይችላል።',
    },
  },
};

export default story;
