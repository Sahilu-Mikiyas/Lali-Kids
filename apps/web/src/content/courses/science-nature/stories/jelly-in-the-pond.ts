import type { Story } from "../../../stories";

/*
  "The Jelly in the Pond" (level 1: animals and their young; the frog's life cycle; habitats).
  The kiremt rains fill the pond by Hawi's house, and she finds a clump of clear jelly full of black
  dots. Fish eggs? Hail? Grandpa Tolosa: "Let's look, not take, and find out." Day by day the dots
  become commas, then tadpoles that hatch, cling to the jelly and swim, breathing water like fish
  and nibbling green slime. Weeks later, back legs; then front legs, while the tails shrink, and
  the tadpoles gulp air at the top. When the pond's edge is steep and they can't climb out, Hawi
  works out what froglets need (air and a way onto land) and lays a sloping stone. Froglets climb
  out, their tails disappear, and the frogs hop off to catch insects. Next kiremt, they come back to
  lay eggs. Join-in line: "Egg, tadpole, froglet, frog!"

  Science (kept simple and true): frogspawn is eggs in jelly, laid in water; tadpoles breathe with
  gills and eat mostly plants (algae) at first; back legs grow first, then front legs; the tail is
  taken back into the body; froglets breathe with lungs (and through their skin) and need to climb
  out of the water; frogs eat insects and other small animals; it takes weeks (about two to four
  months, depending on the frog and the warmth), not days. We watch wild animals where they live.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  word for tadpole «ኩርንችት» (if a better everyday word exists, use it), «የእንቁራሪት እንቁላል» for
  frogspawn and the join-in line «እንቁላል፣ ኩርንችት፣ ትንሽ እንቁራሪት፣ እንቁራሪት!».
*/
const story: Story = {
  id: "jelly-in-the-pond",
  course: "science-nature",
  pack: "story",
  title: { en: "The Jelly in the Pond", am: "በኩሬው ውስጥ ያለው ዝልግልግ" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#2E8A9A",
  scene: "lib-jelly-in-the-pond",
  coverPage: 5,
  teaches: { words: ["egg", "tadpole", "froglet", "frog", "life cycle", "pond", "habitat"] },
  pages: [
    {
      en: "The kiremt rains had filled the pond by Hawi's house. At the edge she found something strange: clear jelly full of tiny black dots. \"What is it?\"",
      am: "የክረምቱ ዝናብ በሀዊ ቤት አጠገብ ያለውን ኩሬ ሞላው። በዳሩ እንግዳ ነገር አገኘች፦ በጥቃቅን ጥቁር ነጥቦች የተሞላ ግልጽ ዝልግልግ። «ይሄ ምንድን ነው?»",
    },
    {
      en: '"Fish eggs?" guessed Hawi. "Or melted hail?" Grandpa Tolosa knelt down beside her. "Good guesses. Let\'s look, not take, and come back every day to find out."',
      am: "«የዓሣ እንቁላል?» ብላ ገመተች ሀዊ። «ወይስ የቀለጠ በረዶ?» አባ ቶሎሳ አጠገቧ ተንበረከኩ። «ጥሩ ግምቶች ናቸው። እንመልከት እንጂ አንውሰድ፤ ለማወቅም በየቀኑ እንመለስ።»",
    },
    {
      en: "Every day Hawi came with her notebook. Day by day, the round black dots grew longer, like little commas. Then they began to wiggle inside the jelly! Wiggle, wiggle.",
      am: "ሀዊ በየቀኑ ማስታወሻዋን ይዛ መጣች። ቀን በቀን ክብ ጥቁሮቹ ነጥቦች እንደ ትንንሽ ነጠላ ሰረዞች ረዘሙ። ከዚያ በዝልግልጉ ውስጥ መንቀሳቀስ ጀመሩ! ውልውል፣ ውልውል።",
    },
    {
      en: "The wigglers swam out of the jelly. \"Tadpoles!\" said Grandpa. \"Baby frogs. They breathe the water like fish, and nibble green slime.\" Egg, tadpole, froglet, frog!",
      am: "ተንቀሳቃሾቹ ከዝልግልጉ ወጥተው ዋኙ። «ኩርንችቶች!» አሉ አባ ቶሎሳ። «የእንቁራሪት ልጆች ናቸው። እንደ ዓሣ ውሃ ይተነፍሳሉ።» እንቁላል፣ ኩርንችት፣ ትንሽ እንቁራሪት፣ እንቁራሪት!",
    },
    {
      en: '"But they look like little fish with big heads," said Hawi. "Where are their legs?" Grandpa smiled. "Be patient. Frogs take many weeks to grow up."',
      am: "«ግን ትልቅ ራስ ያላቸው ትንንሽ ዓሦች ይመስላሉ» አለች ሀዊ። «እግሮቻቸው የት አሉ?» አባ ቶሎሳ ፈገግ አሉ። «ታገሺ። እንቁራሪቶች ለማደግ ብዙ ሳምንታት ይወስድባቸዋል።»",
    },
    {
      en: "Weeks went by. Then one day Hawi shouted, \"Legs! Two little back legs!\" She drew them in her notebook. Egg, tadpole, froglet, frog!",
      am: "ሳምንታት አለፉ። ከዚያ አንድ ቀን ሀዊ ጮኸች፦ «እግሮች! ሁለት ትንንሽ የኋላ እግሮች!» በማስታወሻዋ ሣለቻቸው። እንቁላል፣ ኩርንችት፣ ትንሽ እንቁራሪት፣ እንቁራሪት!",
    },
    {
      en: "Next, two front legs popped out, and the tails got shorter. The tadpoles swam up to gulp air. \"They're growing lungs,\" said Grandpa.",
      am: "ቀጥሎ ሁለት የፊት እግሮች ወጡ፤ ጅራቶቹም አጠሩ። ኩርንችቶቹ አየር ለመጉንጨት ወደ ላይ ይዋኙ ነበር። «ሳምባ እያበቀሉ ነው» አሉ አባ ቶሎሳ።",
    },
    {
      en: "Here the bank was steep and muddy. The little frogs tried to climb out, and slid back. Splash! Hawi thought hard. \"They need a way onto land.\"",
      am: "እዚህ ዳሩ ገደላማና ጭቃማ ነበር። ትንንሾቹ እንቁራሪቶች ለመውጣት ሞክረው ተንሸራተቱ። ጭልፕ! ሀዊ አሰበች። «ወደ የብስ መውጫ ያስፈልጋቸዋል።»",
    },
    {
      en: "So Hawi rolled a long, flat stone into the water, sloping up to the grass like a little ramp. The froglets crawled up it, one by one, with tiny stubs of tail still behind them.",
      am: "ስለዚህ ሀዊ ረጅምና ጠፍጣፋ ድንጋይ ወደ ውሃው አንከባለለች፤ እንደ ትንሽ መወጣጫ ወደ ሣሩ ዘምብሎ ነበር። ትንንሾቹ እንቁራሪቶች ትንሽ የጅራት ቅሪት ከኋላቸው እያለ አንድ በአንድ በእሱ ላይ ወጡ።",
    },
    {
      en: "Days later, the tails were gone: real frogs! Snap! A long, sticky tongue caught a mosquito. \"Frogs help us,\" said Grandpa. \"They eat lots of insects.\"",
      am: "ከቀናት በኋላ ጅራቶቹ ጠፉ፦ እውነተኛ እንቁራሪቶች! ቅልብ! ረጅም ምላስ ትንኝ ያዘ። «እንቁራሪቶች ይረዱናል» አሉ አባ ቶሎሳ። «ብዙ ነፍሳት ይበላሉ።»",
    },
    {
      en: "The frogs hopped off into the wet grass. \"Will they come back?\" \"Next kiremt,\" said Grandpa, \"to lay their eggs in the pond.\"",
      am: "እንቁራሪቶቹ ወደ እርጥቡ ሣር ዘለው ሄዱ። «ይመለሳሉ?» «በሚቀጥለው ክረምት» አሉ አባ ቶሎሳ፤ «በኩሬው ውስጥ እንቁላል ሊጥሉ።»",
    },
    {
      en: "Hawi drew a circle with arrows: eggs, tadpole, froglet, frog, and back to eggs. \"A life cycle!\" She hopped: \"Egg, tadpole, froglet, frog!\"",
      am: "ሀዊ ቀስቶች ያሉት ክብ ሣለች፦ እንቁላል፣ ኩርንችት፣ ትንሽ እንቁራሪት፣ እንቁራሪት፣ ደግሞም እንቁላል። «የሕይወት ዑደት!» ዘለለች፦ «እንቁላል፣ ኩርንችት፣ ትንሽ እንቁራሪት፣ እንቁራሪት!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "How did the tadpoles change, step by step? What did they need at first, and what did they need when they became froglets?",
        "Why did Grandpa say \"look, not take\"? What does a pond give the frogs that a jar at home could not?",
      ],
      am: [
        "ኩርንችቶቹ ደረጃ በደረጃ እንዴት ተለወጡ? መጀመሪያ ምን ያስፈልጋቸው ነበር? ትንንሽ እንቁራሪቶች ሲሆኑስ ምን አስፈለጋቸው?",
        "አባ ቶሎሳ «እንመልከት እንጂ አንውሰድ» ለምን አሉ? ኩሬው ለእንቁራሪቶቹ የሚሰጣቸው፣ ቤት ያለ ብልቃጥ ሊሰጣቸው የማይችለው ምንድን ነው?",
      ],
    },
    activity: {
      en: "In the rainy season, visit a pond or a slow stream with a grown-up (stay well back from deep water). Look for frogspawn, tadpoles or frogs, and draw what you see each week. At home, draw the frog's life cycle as a circle with four pictures and arrows.",
      am: "በዝናብ ወቅት ከትልቅ ሰው ጋር ኩሬ ወይም ቀስ ብሎ የሚፈስ ጅረት ጎብኙ (ከጥልቅ ውሃ ራቅ በሉ)። የእንቁራሪት እንቁላሎችን፣ ኩርንችቶችን ወይም እንቁራሪቶችን ፈልጉ፤ በየሳምንቱም ያያችሁትን ሣሉ። ቤት ውስጥ የእንቁራሪትን የሕይወት ዑደት አራት ሥዕሎችና ቀስቶች ያሉት ክብ አድርጋችሁ ሣሉ።",
    },
  },
};

export default story;
