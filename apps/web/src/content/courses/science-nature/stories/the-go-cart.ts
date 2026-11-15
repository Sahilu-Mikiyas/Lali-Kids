import type { Story } from "../../../stories";

/*
  "The Go-Cart" (level 6: pushes, pulls and friction). Anbessa and Gugu build a wooden go-cart. It
  won't move by itself: something must push or pull it. A push from behind, a pull with a rope. With
  Tsehay in it, they must push harder: heavier things need a bigger push. On the smooth road it rolls
  far; on the grass it stops quickly: rubbing between the wheels and the ground slows it, and that is
  called friction. Rub your hands together: friction makes them warm. The problem: on the slope the
  cart rolls faster and faster; Anbessa works out how to slow it: rough, rubbing brakes (a stick
  rubbing on a wheel, feet on the ground) use friction. Friction is useful too: without it, shoes
  would slip. Join-in line: "Push it, pull it, watch it go!"

  Science (kept simple and true): things start, stop, speed up, slow down or change direction when
  pushed or pulled (forces); a heavier load needs a bigger force; friction between surfaces slows
  moving things and makes heat; smooth surfaces have less friction than rough ones; brakes use
  friction; we need friction to walk and grip.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ግፋው፣ ጎትተው፣ ሲሄድ እየው!» and «ሰበቃ» for friction.
*/
const story: Story = {
  id: "the-go-cart",
  course: "science-nature",
  pack: "story",
  title: { en: "The Go-Cart", am: "የእንጨት ጋሪው" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#D86A2A",
  scene: "lib-the-go-cart",
  coverPage: 8,
  teaches: { words: ["push", "pull", "force", "friction", "heavy", "smooth", "rough"] },
  pages: [
    {
      en: "Anbessa and Gugu built a go-cart from an old box, four wooden wheels and a rope. \"Ready, steady… go!\" Nothing happened. The cart just sat there.",
      am: "አንበሳና ጉጉ ከአሮጌ ሳጥን፣ ከአራት የእንጨት መንኮራኩሮችና ከገመድ ጋሪ ሠሩ። «ዝግጁ… ሂድ!» ምንም አልሆነም። ጋሪው ዝም ብሎ ተቀመጠ።",
    },
    {
      en: "\"It won't go by itself,\" said Gugu. \"Something has to push it or pull it.\" Anbessa pushed from behind. Off it rolled! Push it, pull it, watch it go!",
      am: "«በራሱ አይሄድም» አለ ጉጉ። «የሆነ ነገር መግፋት ወይም መጎተት አለበት።» አንበሳ ከኋላ ገፋው። ተንከባለለ! ግፋው፣ ጎትተው፣ ሲሄድ እየው!",
    },
    {
      en: "Then Gugu took the rope and pulled. The cart rolled after him. \"A push moves it away from you. A pull brings it towards you!\"",
      am: "ከዚያ ጉጉ ገመዱን ይዞ ጎተተ። ጋሪው ተከተለው። «መግፋት ከአንተ ያርቀዋል። መጎተት ወደ አንተ ያቀርበዋል!»",
    },
    {
      en: "Tsehay climbed in. \"Give me a ride!\" Anbessa pushed… and the cart hardly moved. He pushed harder. \"Heavier things need a bigger push!\"",
      am: "ፀሐይ ገባች። «አሽከርክሩኝ!» አንበሳ ገፋ… ጋሪው እምብዛም አልተንቀሳቀሰም። የበለጠ ገፋ። «ከባድ ነገሮች ትልቅ ግፊት ያስፈልጋቸዋል!»",
    },
    {
      en: "On the smooth road, one push sent the cart rolling far. But on the grass, it slowed down and stopped quickly. \"Why?\" wondered Gugu.",
      am: "በለስላሳው መንገድ አንድ ግፊት ጋሪውን ሩቅ አስኬደው። በሣሩ ላይ ግን ቶሎ ቀስ ብሎ ቆመ። «ለምን?» አለ ጉጉ።",
    },
    {
      en: "Teacher Meron was passing. \"The wheels rub against the ground. Rubbing slows things down. It's called friction. Rough grass rubs more than a smooth road.\"",
      am: "መምህርት መሮን እያለፉ ነበር። «መንኮራኩሮቹ መሬቱን ይፈትጋሉ። መፋተግ ቀስ ያደርጋል፤ ሰበቃ ይባላል። ሻካራው ሣር ከለስላሳው መንገድ የበለጠ ይፈትጋል።»",
    },
    {
      en: "\"Rub your hands together, fast.\" Gugu rubbed. \"They're getting warm!\" \"Friction makes heat, too.\" Push it, pull it, watch it go!",
      am: "«እጆቻችሁን በፍጥነት አፋትጉ።» ጉጉ አፋተገ። «እየሞቁ ነው!» «ሰበቃ ሙቀትም ይፈጥራል።» ግፋው፣ ጎትተው፣ ሲሄድ እየው!",
    },
    {
      en: "Then they took the cart to the top of a slope. Whee! It rolled faster and faster, with Gugu inside. \"Help! How do I stop?\"",
      am: "ከዚያ ጋሪውን ወደ ቁልቁለት አናት ወሰዱ። ዊ! ጉጉ ውስጥ ሆኖ በፍጥነት፣ በፍጥነት ወረደ። «እርዱኝ! እንዴት ልቁም?»",
    },
    {
      en: "Anbessa remembered the grass. \"More rubbing! Put your feet down!\" Gugu dragged his feet on the ground. The cart slowed… and stopped. Phew!",
      am: "አንበሳ ሣሩን አስታወሰ። «ተጨማሪ መፋተግ! እግሮችህን አውርድ!» ጉጉ እግሮቹን መሬት ላይ ጎተተ። ጋሪው ቀስ አለ… ቆመም። ውይ!",
    },
    {
      en: "So they made a brake: a stick that rubs on a wheel when you pull it. \"Brakes use friction!\" said Anbessa. Push it, pull it, watch it go!",
      am: "ስለዚህ ፍሬን ሠሩ፦ ሲጎትቱት መንኮራኩሩን የሚፈትግ እንጨት። «ፍሬን ሰበቃን ይጠቀማል!» አለ አንበሳ። ግፋው፣ ጎትተው፣ ሲሄድ እየው!",
    },
    {
      en: "\"Friction helps us walk, too,\" said Teacher Meron. \"Without it, our feet would slip and slide, like on ice or a wet, muddy path.\"",
      am: "«ሰበቃ ለመራመድም ይረዳናል» አሉ መምህርቷ። «ያለ እሱ እግሮቻችን በበረዶ ወይም በእርጥብ ጭቃማ መንገድ ላይ እንዳለ ይንሸራተቱ ነበር።»",
    },
    {
      en: "All afternoon they gave rides: pushes and pulls to start, the brake to stop. Even Grandma had a turn! \"Push it, pull it, watch it go!\"",
      am: "ከሰዓት በኋላ ሙሉ አሽከረከሩ፦ ለመጀመር ግፊትና ጉተታ፣ ለማቆም ፍሬን። አያቴም ተራ ደረሳቸው! «ግፋው፣ ጎትተው፣ ሲሄድ እየው!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["How did the cart start moving? Why was it harder to push with Tsehay inside?", "Why did the cart stop quickly on grass? How did Gugu stop on the slope?"],
      am: ["ጋሪው መንቀሳቀስ እንዴት ጀመረ? ፀሐይ ውስጡ ስትሆን መግፋት ለምን ከበደ?", "ጋሪው በሣር ላይ ለምን ቶሎ ቆመ? ጉጉ በቁልቁለቱ ላይ እንዴት ቆመ?"],
    },
    activity: {
      en: "Roll a ball or a toy car down a sloping board onto three surfaces: a smooth floor, a mat and grass. Mark where it stops each time. Which surface has the most friction?",
      am: "ኳስ ወይም የመጫወቻ መኪና በተዘረጋ ሳንቃ ላይ ወደ ሦስት ወለሎች አንከባልሉ፦ ለስላሳ ወለል፣ ምንጣፍና ሣር። በእያንዳንዱ የቆመበትን ምልክት አድርጉ። ብዙ ሰበቃ ያለው የትኛው ነው?",
    },
  },
};

export default story;
