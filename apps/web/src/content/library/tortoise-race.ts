import type { Story } from "../stories";

/*
  "The Tortoise and the Lion's Race": the old tale of the hare and the tortoise, told in the
  Simien Mountains. Gobez, Anbessa's big cousin, is a young lion who is very fast and very sure
  of it. Eli, a patient tortoise with a daisy on her shell, races him up the mountain path to the
  giant lobelia at the top. Gobez naps under a tree; Eli keeps going, and wins. Nobody is
  laughed at in the end: Gobez says "well raced" and carries Eli home on his back.
  The repeated line to join in on: "Step by step, slow and steady."
  Grandma's saying on the last page is a real Amharic proverb: ቀስ በቀስ እንቁላል በእግሩ ይሄዳል
  ("little by little, the egg walks on its own legs", i.e. a chick hatches and learns to walk).
  In Amharic, ጎበዝ means "clever" or "well done", so Gobez's «ጎበዝ ነሽ!» on page 12 is a play on
  his own name. ኤሊ means tortoise, and ጅብራ is the giant lobelia of the Simien.
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line (ቀስ በቀስ፣ እርምጃ በእርምጃ), the snore sound (ኩርፍ) and «ተዘጋጁ፣ ተጠንቀቁ» for
  "ready, steady".
*/
const story: Story = {
  id: "tortoise-race",
  pack: "story",
  title: { en: "The Tortoise and the Lion's Race", am: "የኤሊና የአንበሳ እሽቅድምድም" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#5E9E4A",
  scene: "lib-tortoise-race",
  coverPage: 2,
  teaches: { words: ["tortoise", "race", "fast", "slow", "steady", "mountain"] },
  pages: [
    {
      en: 'High in the Simien Mountains lived Gobez, Anbessa\'s big cousin. He had a fine mane and a very loud roar. "I am the fastest in all the mountains!" he boasted.',
      am: "ከፍ ባሉት የሰሜን ተራሮች ላይ የአንበሳ ታላቅ የአጎት ልጅ ጎበዝ ይኖር ነበር። ያማረ ጎፈርና በጣም ኃይለኛ ግሳት ነበረው። «በተራሮቹ ሁሉ ከእኔ የሚፈጥን የለም!» ብሎ ተኩራራ።",
    },
    {
      en: 'Eli the tortoise looked up from her clover. "I will race you," she said softly, "up the path to the giant lobelia at the top." Gobez laughed. "You? Ha!"',
      am: "ኤሊ ከምትበላው ሣር ቀና ብላ ተመለከተች። «እንሽቀዳደም» አለች በለስላሳ ድምፅ፤ «በመንገዱ ሽቅብ፣ ጫፉ ላይ እስካለው ትልቁ ጅብራ ድረስ።» ጎበዝ ሳቀ። «አንቺ? ሃ!»",
    },
    {
      en: '"Ready, steady… BUZZ!" called Lali. Whoosh! Gobez was gone in a cloud of dust. Eli took one small step, then another. "Step by step, slow and steady."',
      am: "«ተዘጋጁ፣ ተጠንቀቁ… ቡዝ!» አለች ላሊ። ሹው! ጎበዝ በአቧራ ደመና ውስጥ ተሰወረ። ኤሊ አንዲት ትንሽ እርምጃ ተራመደች፣ ቀጥሎም ሌላ። «ቀስ በቀስ፣ እርምጃ በእርምጃ።»",
    },
    {
      en: 'Gobez zoomed up the mountain, past the waterfall and over the rocks. He looked back. Eli was a tiny dot far below. "This is too easy!" he laughed.',
      am: "ጎበዝ ተራራውን ሽቅብ ተወነጨፈ፤ ፏፏቴውን አልፎ በድንጋዮቹ ላይ ዘለለ። ወደ ኋላ ተመለከተ። ኤሊ ከታች ሩቅ እንደ ትንሽ ነጥብ ትታይ ነበር። «ይሄማ በጣም ቀላል ነው!» ብሎ ሳቀ።",
    },
    {
      en: 'Eli walked on, past the geladas eating grass. "Go, Eli, go!" cheered Gugu and Tsehay. Eli smiled and kept going. Step by step, slow and steady.',
      am: "ኤሊ ሣር የሚግጡትን ጭላዳዎች አልፋ ጉዞዋን ቀጠለች። «በርቺ፣ ኤሊ፣ በርቺ!» ብለው አበረታቷት ጉጉና ፀሐይ። ኤሊ ፈገግ ብላ ቀጠለች። ቀስ በቀስ፣ እርምጃ በእርምጃ።",
    },
    {
      en: 'Halfway up, Gobez found a shady tree. "I\'m so far ahead," he yawned. "I have time for a little nap." He curled up his tail and closed his eyes. Zzz…',
      am: "ጎበዝ ግማሽ መንገድ ላይ ጥላ ያለው ዛፍ አገኘ። «በጣም ቀድሜያለሁ» አለ እያዛጋ። «ትንሽ ለማሸለብ ጊዜ አለኝ።» ጭራውን ጠቅልሎ ዓይኖቹን ጨፈነ። ዝዝዝ…",
    },
    {
      en: "The sun climbed high and hot. Eli's legs were tired, and the rocks were big. But she did not stop. Step by step, slow and steady.",
      am: "ፀሐይዋ ከፍ ብላ ሞቀች። የኤሊ እግሮች ደከሙ፤ ድንጋዮቹም ትልልቅ ነበሩ። እሷ ግን አላቆመችም። ቀስ በቀስ፣ እርምጃ በእርምጃ።",
    },
    {
      en: "Snore, snore! Gobez was fast asleep. A little bird sat on his nose, and he didn't even twitch. Eli walked right past him. Step by step, slow and steady.",
      am: "ኩርፍ፣ ኩርፍ! ጎበዝ ጭልጥ ብሎ ተኝቶ ነበር። አንዲት ትንሽ ወፍ አፍንጫው ላይ አረፈች፤ እሱ ግን አልተንቀሳቀሰም። ኤሊ አጠገቡ አልፋ ሄደች። ቀስ በቀስ፣ እርምጃ በእርምጃ።",
    },
    {
      en: 'Gobez woke with a jump. The sun was going down! "Oh no!" He ran faster than he had ever run before, up, up, up the mountain.',
      am: "ጎበዝ ደንግጦ ነቃ። ፀሐይዋ እየጠለቀች ነበር! «ወይ ጉድ!» ከዚህ በፊት ሮጦ በማያውቀው ፍጥነት ወደ ላይ፣ ወደ ላይ፣ ወደ ላይ ሮጠ።",
    },
    {
      en: "But at the very top, there was Eli, just one step from the giant lobelia. Everyone held their breath. Step… by… step…",
      am: "ከጫፉ ላይ ግን ኤሊ ነበረች፤ ከትልቁ ጅብራ አንድ እርምጃ ብቻ ቀርቷት። ሁሉም ትንፋሻቸውን ያዙ። ቀስ… በ… ቀስ…",
    },
    {
      en: 'Eli touched the lobelia. She won! "Hooray for Eli!" Gobez skidded up, puffing and panting. His ears drooped. "But… I\'m the fastest," he said in a small voice.',
      am: "ኤሊ ጅብራውን ነካች። አሸነፈች! «እልል ለኤሊ!» ጎበዝ ቁና ቁና እየተነፈሰ ደረሰ። ጆሮዎቹ ተንጠለጠሉ። «ግን… እኔ እኮ ፈጣን ነኝ» አለ በትንሽ ድምፅ።",
    },
    {
      en: '"You are very fast," said Eli kindly. "But being fast isn\'t the same as getting there." Gobez thought about it. Then he smiled and bowed. "Well raced, Eli!"',
      am: "«አንተ በጣም ፈጣን ነህ» አለች ኤሊ በደግነት። «ግን መፍጠንና መድረስ አንድ አይደሉም።» ጎበዝ አሰበበት። ከዚያም ፈገግ ብሎ ጎንበስ አለ። «ጎበዝ ነሽ፣ ኤሊ!»",
    },
    {
      en: 'Grandma smiled and said an old saying: "Little by little, the egg walks on its own legs." And Eli rode home on Gobez\'s back. Slow and steady… and fast!',
      am: "አያት ፈገግ ብላ የቆየ ምሳሌ ተናገረች፦ «ቀስ በቀስ እንቁላል በእግሩ ይሄዳል።» ኤሊም በጎበዝ ጀርባ ላይ ተቀምጣ ወደ ቤት ሄደች። ቀስ በቀስ… ግን በፍጥነት!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Gobez was much faster than Eli. So why did Eli win the race?",
        "When have you kept going at something hard, a little at a time? What helped you not to give up?",
      ],
      am: [
        "ጎበዝ ከኤሊ በጣም ይፈጥን ነበር። ታዲያ ኤሊ እንዴት አሸነፈች?",
        "አንድን ከባድ ነገር ቀስ በቀስ ሳታቋርጡ የሠራችሁት መቼ ነው? ተስፋ እንዳትቆርጡ የረዳችሁ ምንድን ነው?",
      ],
    },
    activity: {
      en: 'Have a tortoise race! Everyone walks across the room as slowly as they can, saying "Step by step, slow and steady!" The slowest walker wins. Then build a tower together, one block at a time, with no hurrying.',
      am: "የኤሊ እሽቅድምድም አድርጉ! ሁላችሁም «ቀስ በቀስ፣ እርምጃ በእርምጃ!» እያላችሁ በተቻላችሁ መጠን ቀስ ብላችሁ ክፍሉን አቋርጡ። በጣም ቀስ ብሎ የሄደ ያሸንፋል። ከዚያም ሳትቸኩሉ አንድ በአንድ ጡብ እየደረደራችሁ በአንድነት ግንብ ሥሩ።",
    },
  },
};

export default story;
