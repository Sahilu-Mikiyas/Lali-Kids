import type { Story } from "../../../stories";

/*
  "The Krar Sings" (level 6: how sounds are made). Teacher Meron brings a krar and a kebero to class.
  Gugu plucks a string: it shakes so fast it looks blurry, and it sings. Sounds are made when things
  vibrate (shake back and forth). Hum with a hand on your throat: you feel it buzz. On the kebero,
  teff grains jump when the skin is hit. The shaking travels through the air to our ears; ear on the
  desk, a tap sounds loud: sound travels through wood too. Tight, short strings make high notes;
  looser, longer strings make low notes; the big kebero booms low, the small one is higher. The
  problem: Gugu makes his own krar from a box and rubber bands, but every band twangs the same low
  note; he works out to stretch them tighter and make them shorter, and plays a tune.
  Join-in line: "Shake, shake, what a sound you make!"

  Science (kept simple and true): sound is made by vibrations and travels through air, solids and
  liquids to our ears; tension and length change pitch (tighter or shorter = higher); bigger drums
  give lower notes; louder sounds come from bigger vibrations.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ንዝር፣ ንዝር፣ ምን ዓይነት ድምፅ!», «መንዘር» for vibrate and «ቀጭን/ወፍራም ድምፅ» for high/low.
*/
const story: Story = {
  id: "the-krar-sings",
  course: "science-nature",
  pack: "story",
  title: { en: "The Krar Sings", am: "ክራሩ ይዘምራል" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#9A5A2A",
  scene: "lib-the-krar-sings",
  coverPage: 11,
  teaches: { words: ["sound", "vibrate", "high", "low", "loud", "quiet"] },
  pages: [
    {
      en: "Teacher Meron brought a krar and a kebero to class. Gugu plucked a krar string. Twang! \"How does a string make a sound?\" he wondered.",
      am: "መምህርት መሮን ክራርና ከበሮ ወደ ክፍል አመጡ። ጉጉ የክራር ክር መታ። ትውይንግ! «ክር እንዴት ድምፅ ያወጣል?» ብሎ አሰበ።",
    },
    {
      en: "\"Look closely,\" said Teacher Meron. Gugu plucked again. The string shook back and forth so fast it looked blurry! Shake, shake, what a sound you make!",
      am: "«በጥንቃቄ ተመልከት» አሉ መምህርቷ። ጉጉ እንደገና መታ። ክሩ በጣም በፍጥነት ወዲያና ወዲህ ስለተንቀጠቀጠ ደብዛዛ መሰለ! ንዝር፣ ንዝር፣ ምን ዓይነት ድምፅ!",
    },
    {
      en: "\"Sounds are made when something shakes very fast. We say it vibrates. Put your hand on your throat and hum.\" Mmmm… \"It buzzes!\"",
      am: "«ድምፅ የሚፈጠረው አንድ ነገር በጣም በፍጥነት ሲንቀጠቀጥ ነው። ይንዘረዘራል እንላለን። እጃችሁን በጉሮሮአችሁ ላይ አድርጋችሁ አጉረምርሙ።» ምምም… «ይንዘረዘራል!»",
    },
    {
      en: "Teacher Meron sprinkled teff grains on the kebero and tapped it. The grains jumped and danced! \"The drum skin is shaking.\" Shake, shake, what a sound you make!",
      am: "መምህርቷ በከበሮው ላይ የጤፍ ቅንጣቶች በትነው መቱት። ቅንጣቶቹ ዘለሉ፣ ጨፈሩ! «የከበሮው ቆዳ እየተንቀጠቀጠ ነው።» ንዝር፣ ንዝር፣ ምን ዓይነት ድምፅ!",
    },
    {
      en: "\"The shaking spreads through the air, like ripples in a pond, all the way to your ears. That's how you hear it.\"",
      am: "«መንቀጥቀጡ በአየር ውስጥ ይሰራጫል፤ በኩሬ ውስጥ እንዳለ ሞገድ፤ እስከ ጆሮአችሁ ድረስ። የምትሰሙት እንዲህ ነው።»",
    },
    {
      en: "Gugu put his ear on the desk while Tsehay tapped the other end softly. Tap, tap! It sounded loud! \"Sound travels through wood too!\"",
      am: "ጉጉ ጆሮውን በጠረጴዛው ላይ አደረገ፤ ፀሐይ ሌላውን ጫፍ ቀስ ብላ መታች። ቋ፣ ቋ! በጣም ጮኸ! «ድምፅ በእንጨት ውስጥም ይጓዛል!»",
    },
    {
      en: "Teacher Meron tightened a krar string: the note went higher. She loosened it: lower. \"Tight strings sing high. Loose strings sing low.\"",
      am: "መምህርቷ የክራር ክር አጠበቁ፦ ድምፁ ቀጠነ። ላላ አደረጉት፦ ወፈረ። «የጠበቀ ክር ቀጭን ድምፅ፣ የላላ ክር ወፍራም ድምፅ።»",
    },
    {
      en: "\"And short strings sing higher than long ones. The big kebero booms low. A small drum sounds higher.\" Boom! Tak! Shake, shake, what a sound you make!",
      am: "«አጭር ክር ከረጅሙ ይቀጥናል። ትልቁ ከበሮ ወፍራም ድምፅ ያስተጋባል። ትንሹ ከበሮ ይቀጥናል።» ዱም! ታክ! ንዝር፣ ንዝር፣ ምን ዓይነት ድምፅ!",
    },
    {
      en: "At home, Gugu made his own krar: rubber bands stretched round an open box. He plucked them. Twung, twung, twung. Every band sang the same low note!",
      am: "ቤት ጉጉ የራሱን ክራር ሠራ፦ በክፍት ሳጥን ዙሪያ የተወጠሩ ላስቲኮች። መታቸው። ትውንግ፣ ትውንግ። ሁሉም ላስቲክ አንድ ዓይነት ወፍራም ድምፅ አወጡ!",
    },
    {
      en: "Gugu thought hard. \"Tight strings sing high. Short strings sing high.\" He stretched one band tighter, and wedged a pencil under another to make it shorter.",
      am: "ጉጉ አሰበ። «የጠበቀ ክር ይቀጥናል። አጭር ክር ይቀጥናል።» አንዱን ላስቲክ የበለጠ ወጠረ፤ በሌላው ሥር እርሳስ አድርጎ አሳጠረው።",
    },
    {
      en: "Twung, twang, tweeng! Now each band sang a different note, low to high. Gugu played a little tune. Shake, shake, what a sound you make!",
      am: "ትውንግ፣ ትዋንግ፣ ትዊንግ! አሁን እያንዳንዱ ላስቲክ የተለየ ድምፅ አወጣ፤ ከወፍራም እስከ ቀጭን። ጉጉ ትንሽ ዜማ ተጫወተ። ንዝር፣ ንዝር፣ ምን ዓይነት ድምፅ!",
    },
    {
      en: "Next day, Gugu played his box krar and Teacher Meron played the real one, with Tsehay on the kebero. Everyone sang: \"Shake, shake, what a sound you make!\"",
      am: "በማግሥቱ ጉጉ የሳጥን ክራሩን፣ መምህርቷ እውነተኛውን ክራር ተጫወቱ፤ ፀሐይ ከበሮ መታች። ሁሉም ዘመሩ፦ «ንዝር፣ ንዝር፣ ምን ዓይነት ድምፅ!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["What has to happen for a sound to be made? How did the teff grains show it?", "How did Gugu make his rubber bands sing different notes?"],
      am: ["ድምፅ እንዲፈጠር ምን መሆን አለበት? የጤፍ ቅንጣቶቹ እንዴት አሳዩት?", "ጉጉ ላስቲኮቹ የተለያዩ ድምፆች እንዲያወጡ እንዴት አደረገ?"],
    },
    activity: {
      en: "Stretch rubber bands round an open box or a tin and pluck them. Make one tighter, and put a pencil under one to make it shorter: which sounds higher? Hum with your hand on your throat and feel the vibration.",
      am: "ላስቲኮችን በክፍት ሳጥን ወይም ቆርቆሮ ዙሪያ ወጥራችሁ ምቷቸው። አንዱን አጥብቁ፣ በአንዱ ሥር እርሳስ አድርጋችሁ አሳጥሩ፦ የትኛው ይቀጥናል? እጃችሁን በጉሮሮ ላይ አድርጋችሁ አጉረምርሙና መንዘርዘሩን ይሰማችሁ።",
    },
  },
};

export default story;
