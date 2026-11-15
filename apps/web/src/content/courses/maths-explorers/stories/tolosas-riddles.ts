import type { Story } from "../../../stories";

/*
  "Grandpa Tolosa's Riddles" (Maths Explorers, level 1). Missing-number problems: Hawi and
  Grandpa Tolosa take the sheep out on the Bale Mountains (giant lobelias, the high plateau)
  and he asks number riddles in the Ethiopian riddle way («እንቆቅልሽ!» «ምን አውቅልህ!»).
  Hawi finds the hidden number by counting on: 9 + ? = 12, ? + 6 = 14 (through ten),
  60 + ? = 100 (counting on in tens), ? − 5 = 10 (put the five back), 20 − 13 as counting on
  from 13 to 20, 8 + ? = 15, and the sheep come home: 10 + 2 = 12.
  The repeated line to join in on: "What's hiding? Count on to find it!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the riddle call and answer «እንቆቅልሽ!» «ምን አውቅልህ!» (kept in its usual fixed form),
  «ጅብራ» for the giant lobelia and the repeated line «የተደበቀው ስንት ነው? ወደ ፊት ቁጠሩና አግኙት!».
*/
const story: Story = {
  id: "tolosas-riddles",
  course: "maths-explorers",
  pack: "story",
  title: { en: "Grandpa Tolosa's Riddles", am: "የአባ ቶሎሳ እንቆቅልሾች" },
  category: "Maths",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#C9622B",
  scene: "lib-tolosas-riddles",
  coverPage: 1,
  teaches: { numbers: [3, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 20, 60, 100], words: ["missing number", "count on", "add", "take away"] },
  pages: [
    {
      en: 'High in the Bale Mountains, where giant lobelias grow taller than a grown-up, Hawi and Grandpa Tolosa took the sheep out to the meadow. Grandpa loved riddles. "Riddle!" he called. "Tell me!" called Hawi.',
      am: "ከአዋቂ ሰው በላይ የሚረዝሙ ጅብራዎች በሚበቅሉበት በባሌ ተራሮች ላይ ሀዊና አባ ቶሎሳ በጎቹን ወደ መስኩ አወጡ። አባ ቶሎሳ እንቆቅልሽ ይወዱ ነበር። «እንቆቅልሽ!» አሉ። «ምን አውቅልህ!» አለች ሀዊ።",
    },
    {
      en: '"Twelve sheep left the pen this morning. I can see nine. How many are hiding behind the big rock?" Hawi counted on from nine: "Ten, eleven, twelve. Three!" What\'s hiding? Count on to find it! 9 + ? = 12.',
      am: "«ዛሬ ጠዋት አሥራ ሁለት በጎች ከበረቱ ወጡ። ዘጠኙን አያለሁ። ከትልቁ ቋጥኝ ጀርባ ስንቱ ተደብቀዋል?» ሀዊ ከዘጠኝ ጀምራ ወደ ፊት ቆጠረች፦ «አሥር፣ አሥራ አንድ፣ አሥራ ሁለት። ሦስት!» የተደበቀው ስንት ነው? ወደ ፊት ቁጠሩና አግኙት! 9 + ? = 12።",
    },
    {
      en: 'Baa! Three sheep peeked out from behind the rock. "Right!" laughed Grandpa. 9 + 3 = 12. Hawi wagged her tail so hard she nearly fell over.',
      am: "ባ! ሦስት በጎች ከቋጥኙ ጀርባ ብቅ አሉ። «ልክ ነሽ!» ብለው ሳቁ አባ ቶሎሳ። 9 + 3 = 12። ሀዊ ጭራዋን በጣም ከማወዛወዟ የተነሣ ልትወድቅ ምንም አልቀራትም።",
    },
    {
      en: '"Riddle! Some sheep were drinking at the stream. Six more came, and now there are fourteen. How many were there before?" Hawi thought: six and what make fourteen? "Six up to ten is four, and ten up to fourteen is four more. Eight!" ? + 6 = 14.',
      am: "«እንቆቅልሽ! ጥቂት በጎች ከጅረቱ ይጠጡ ነበር። ስድስት ተጨማሪ መጡ፤ አሁን አሥራ አራት ናቸው። በፊት ስንት ነበሩ?» ሀዊ አሰበች፦ ስድስትና ስንት አሥራ አራት ይሆናሉ? «ከስድስት እስከ አሥር አራት ነው፤ ከአሥር እስከ አሥራ አራት ደግሞ አራት። ስምንት!» ? + 6 = 14።",
    },
    {
      en: 'They climbed the hill path. "Riddle! From the bottom to the top is a hundred steps. We have climbed sixty. How many more?" Hawi counted on in tens: "Seventy, eighty, ninety, one hundred: four tens. Forty more!" 60 + 40 = 100.',
      am: "የኮረብታውን መንገድ ወጡ። «እንቆቅልሽ! ከታች እስከ ላይ መቶ ርምጃ ነው። ስልሳውን ወጥተናል። ስንት ይቀረናል?» ሀዊ በአሥር በአሥር ወደ ፊት ቆጠረች፦ «ሰባ፣ ሰማንያ፣ ዘጠና፣ መቶ፦ አራት አሥሮች። አርባ ይቀረናል!» 60 + 40 = 100።",
    },
    {
      en: 'At the top, the whole plateau lay below them, and the sheep looked like little white clouds. What\'s hiding? Count on to find it! "Now it\'s my turn," said Hawi.',
      am: "ላይ ሲደርሱ አምባው በሙሉ ከሥራቸው ተዘረጋ፤ በጎቹም እንደ ትናንሽ ነጭ ደመናዎች ይታዩ ነበር። የተደበቀው ስንት ነው? ወደ ፊት ቁጠሩና አግኙት! «አሁን የእኔ ተራ ነው» አለች ሀዊ።",
    },
    {
      en: '"Riddle! I\'m thinking of a number. If I take away five, I get ten. What is my number?" Grandpa smiled. "Put the five back: ten and five is fifteen!" ? − 5 = 10. "Fifteen!"',
      am: "«እንቆቅልሽ! አንድ ቁጥር አስቤአለሁ። አምስት ብቀንስበት አሥር ይሆናል። ቁጥሬ ስንት ነው?» አባ ቶሎሳ ፈገግ አሉ። «አምስቱን መልሺው፦ አሥርና አምስት አሥራ አምስት!» ? − 5 = 10። «አሥራ አምስት!»",
    },
    {
      en: 'Grandpa had a harder one. "Our neighbour has twenty goats. Thirteen are in the pen. How many are out on the hill?" Hawi counted on from thirteen to twenty: "Fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty. Seven!" 20 − 13 = 7.',
      am: "አባ ቶሎሳ የከበደ እንቆቅልሽ አመጡ። «ጎረቤታችን ሃያ ፍየሎች አሏቸው። አሥራ ሦስቱ በረት ውስጥ ናቸው። ስንቱ ኮረብታው ላይ ናቸው?» ሀዊ ከአሥራ ሦስት እስከ ሃያ ቆጠረች፦ «አሥራ አራት፣ አሥራ አምስት፣ አሥራ ስድስት፣ አሥራ ሰባት፣ አሥራ ስምንት፣ አሥራ ዘጠኝ፣ ሃያ። ሰባት!» 20 − 13 = 7።",
    },
    {
      en: "{name}, can we solve this one? Eight and what make fifteen? Count on from eight: nine, ten, eleven, twelve, thirteen, fourteen, fifteen. Seven! 8 + 7 = 15. What's hiding? Count on to find it!",
      am: "{name}፣ ይህንን እንፍታው? ስምንትና ስንት አሥራ አምስት ይሆናሉ? ከስምንት ጀምረን እንቁጠር፦ ዘጠኝ፣ አሥር፣ አሥራ አንድ፣ አሥራ ሁለት፣ አሥራ ሦስት፣ አሥራ አራት፣ አሥራ አምስት። ሰባት! 8 + 7 = 15። የተደበቀው ስንት ነው? ወደ ፊት ቁጠሩና አግኙት!",
    },
    {
      en: 'The sun was going down and the air grew cold. "Time to take the sheep home," said Grandpa Tolosa, wrapping his gabi tight. "One last riddle: are all twelve here?"',
      am: "ፀሐይ እየጠለቀች አየሩ ቀዘቀዘ። «በጎቹን ወደ ቤት የምንወስድበት ጊዜ ደርሷል» አሉ አባ ቶሎሳ ጋቢያቸውን እየተጠቀለሉ። «የመጨረሻ እንቆቅልሽ፦ አሥራ ሁለቱም እዚህ አሉ?»",
    },
    {
      en: 'Hawi counted the sheep going through the gate: "Ten in… and the last two: eleven, twelve!" Twelve sheep home, and not one missing. 10 + 2 = 12.',
      am: "ሀዊ በበሩ የሚገቡትን በጎች ቆጠረች፦ «አሥር ገቡ… የመጨረሻዎቹ ሁለት፦ አሥራ አንድ፣ አሥራ ሁለት!» አሥራ ሁለት በጎች ቤት ገቡ፤ አንድም አልጎደለም። 10 + 2 = 12።",
    },
    {
      en: 'By the fire, Grandpa Tolosa yawned. "You found every hidden number today." Hawi grinned. "Tomorrow, I\'ll ask all the riddles!"',
      am: "በእሳቱ አጠገብ አባ ቶሎሳ አዛጉ። «ዛሬ የተደበቀውን ቁጥር ሁሉ አገኘሽ።» ሀዊ ፈገግ አለች። «ነገ እንቆቅልሾቹን ሁሉ እኔ እጠይቃለሁ!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["How did Hawi find how many sheep were hiding? Why did she start counting at nine?", "Make up a riddle together: \"I had some, I got 4 more, now I have 11. How many did I have?\""],
      am: ["ሀዊ ስንት በጎች እንደተደበቁ እንዴት አገኘች? መቁጠር ለምን ከዘጠኝ ጀመረች?", "አብራችሁ እንቆቅልሽ ፍጠሩ፦ «ጥቂት ነበሩኝ፣ 4 ተጨማሪ አገኘሁ፣ አሁን 11 አሉኝ። ስንት ነበሩኝ?»"],
    },
    activity: {
      en: "Play hide-the-beans: put out some beans (say 12), cover some with a cup while the child looks away, and ask how many are hiding. Count on together from the ones you can see. Swap, and let the child ask the riddle.",
      am: "ባቄላ የመደበቅ ጨዋታ ተጫወቱ፦ ጥቂት ባቄላዎችን አስቀምጡ (ለምሳሌ 12)፤ ልጁ ወደ ሌላ ሲመለከት ጥቂቶቹን በጽዋ ሸፍኑ፤ ስንቱ እንደተደበቁ ጠይቁ። ከሚታዩት ጀምራችሁ አብራችሁ ወደ ፊት ቁጠሩ። ተራ ተቀያየሩ፤ ልጁም እንቆቅልሹን ይጠይቅ።",
    },
  },
};

export default story;
