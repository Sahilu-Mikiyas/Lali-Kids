import type { Story } from "../../../stories";

/*
  "X Marks the Spot" (level 4: the letters x, y, z and q).
  Grandma gives Anbessa and Hawi a treasure map: "X marks the spot!" Lali explains that x likes
  the END of words (box, fox, six: "ks"). They follow the clues: the zigzag (‘z’) path, the yellow
  (‘y’) adey abeba flowers, then six (‘x’ at the end) big steps… and dig, and find nothing. Anbessa
  looks at the map again and works it out: they were holding it upside down! Turned the right way,
  the X is by the big stone. Under it: a box (‘x’ at the end again) with two paper crowns, a queen's
  and a king's (‘qu’: Q always walks with its friend U), and a bag of yummy (‘y’) kolo.
  Join-in line: "X marks the spot! Where is the spot?"

  English taught: x (as the "ks" at the end of box, fox, six, ox), y (yellow, yes, yummy),
  z (zigzag, zoom, zzz), q with u (queen); map, box.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «X ቦታውን ያሳያል! ቦታው የት ነው?» and «ዚግዛግ» for a zigzag path.
*/
const story: Story = {
  id: "x-marks-the-spot",
  course: "english-first-words",
  pack: "story",
  title: { en: "X Marks the Spot", am: "X ቦታውን ያሳያል" },
  category: "English",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#C99A00",
  scene: "lib-x-marks-the-spot",
  coverPage: 7,
  teaches: { words: ["x", "y", "z", "q", "box", "six", "fox", "yellow", "yes", "yummy", "zigzag", "queen", "map"] },
  pages: [
    {
      en: 'Grandma gave Anbessa and Hawi a piece of paper. On it was a map, with dotted lines and a big red X. "I\'ve hidden a treasure," she said. "X marks the spot!"',
      am: 'አያቴ ለአንበሳና ለሀዊ አንድ ወረቀት ሰጠቻቸው። በላዩ ላይ ነጠብጣብ መስመሮችና ትልቅ ቀይ X ያለበት ካርታ ነበር። «ሀብት ደብቄአለሁ» አለች። «X marks the spot!» (X ቦታውን ያሳያል!)',
    },
    {
      en: '"What does X say?" asked Hawi. Lali buzzed onto the map. "X likes the END of words. Listen: bo-x, fo-x, si-x. X says ‘ks’!" X marks the spot! Where is the spot?',
      am: '«X ምን ይላል?» ብላ ጠየቀች ሀዊ። ላሊ ካርታው ላይ አረፈች። «X የቃላትን መጨረሻ ይወዳል። አዳምጡ፦ bo-x፣ fo-x፣ si-x። X የሚለው ‘ks’ ነው!» X marks the spot! ቦታው የት ነው?',
    },
    {
      en: 'The first clue said, "Follow the zigzag path." This way, that way, this way, that way! "‘z’, ‘z’, ZIGZAG!" "‘z’ is my sound," buzzed Lali. "Zzzz!"',
      am: 'የመጀመሪያው ፍንጭ «የዚግዛጉን መንገድ ተከተሉ» ይል ነበር። ወደዚህ፣ ወደዚያ፣ ወደዚህ፣ ወደዚያ! «‘z’፣ ‘z’፣ ZIGZAG!» «‘z’ የእኔ ድምፅ ነው» አለች ላሊ። «ዝዝዝዝ!»',
    },
    {
      en: 'The next clue said, "Stop at the yellow flowers." There they were: a hill of bright adey abeba. "‘y’, ‘y’, YELLOW!" X marks the spot! Where is the spot?',
      am: 'ቀጣዩ ፍንጭ «ቢጫ አበቦቹ ጋ ቁሙ» ይል ነበር። እዚያው ነበሩ፦ በደማቅ አደይ አበባ የተሞላ ኮረብታ። «‘y’፣ ‘y’፣ YELLOW!» X marks the spot! ቦታው የት ነው?',
    },
    {
      en: 'The last clue said, "Take six big steps." One, two, three, four, five, six! "Six! si-x, with an X at the end!" said Anbessa. They started to dig.',
      am: 'የመጨረሻው ፍንጭ «ስድስት ትልልቅ እርምጃዎችን ተራመዱ» ይል ነበር። አንድ፣ ሁለት፣ ሦስት፣ አራት፣ አምስት፣ ስድስት! «Six! si-x፣ መጨረሻው ላይ X አለ!» አለ አንበሳ። መቆፈር ጀመሩ።',
    },
    {
      en: "They dug and dug. They found a stone, a root and a sleepy beetle. But no treasure. Hawi's ears went flat. \"There's nothing here!\"",
      am: "ቆፈሩ፣ ቆፈሩ። ድንጋይ፣ ሥርና እንቅልፋም ጥንዚዛ አገኙ። ሀብት ግን የለም። የሀዊ ጆሮዎች ተኙ። «እዚህ ምንም የለም!»",
    },
    {
      en: "Anbessa looked at the map again. He looked at the hills. He looked at the map. The house on the map was at the bottom… but Grandma's house was behind them, up the hill!",
      am: "አንበሳ ካርታውን እንደገና ተመለከተ። ኮረብታዎቹን ተመለከተ። ካርታውን ተመለከተ። በካርታው ላይ ቤቱ ከታች ነበር… የአያቴ ቤት ግን ከኋላቸው፣ ኮረብታው ላይ ነበር!",
    },
    {
      en: '"We were holding it upside down!" laughed Anbessa. He turned the map the right way round. Now the X was next to the big stone by the flowers. "Yes! ‘y’, ‘y’, YES!"',
      am: '«ካርታውን ተገልብጦ ነበር የያዝነው!» ብሎ ሳቀ አንበሳ። ካርታውን በትክክል አዞረው። አሁን X አበቦቹ አጠገብ ካለው ትልቅ ድንጋይ ጎን ነበር። «Yes! ‘y’፣ ‘y’፣ YES!»',
    },
    {
      en: 'They rolled the big stone away. Underneath was a wooden box! "Bo-x! An X at the end again!" said Hawi. X marks the spot, and here is the spot!',
      am: 'ትልቁን ድንጋይ አንከባለው አነሡት። ከሥሩ የእንጨት ሳጥን ነበር! «Bo-x! መጨረሻው ላይ እንደገና X!» አለች ሀዊ። X ቦታውን ያሳያል፤ ቦታውም ይኸው!',
    },
    {
      en: 'Inside were two paper crowns, a queen\'s and a king\'s. "Queen starts with Q," said Lali, "and Q always walks with its friend U: ‘qu’, ‘qu’, QUEEN!"',
      am: 'ውስጡ ሁለት የወረቀት ዘውዶች ነበሩ፤ የንግሥትና የንጉሥ። «Queen በQ ይጀምራል» አለች ላሊ፤ «Q ደግሞ ሁልጊዜ ከጓደኛው U ጋር ይሄዳል፦ ‘qu’፣ ‘qu’፣ QUEEN!»',
    },
    {
      en: 'Under the crowns was a bag of warm kolo. "‘y’, ‘y’, YUMMY!" Queen Hawi and King Anbessa marched home along the zigzag path, crunching.',
      am: 'ከዘውዶቹ ሥር ትኩስ ቆሎ የያዘ ከረጢት ነበር። «‘y’፣ ‘y’፣ YUMMY!» ንግሥት ሀዊና ንጉሥ አንበሳ ቆሎ እየቆረጠሙ በዚግዛጉ መንገድ ወደ ቤት ተመለሱ።',
    },
    {
      en: '"X for box, Y for yellow and yummy, Z for zigzag, Q for queen!" Grandma clapped. X marks the spot! Can you draw a treasure map, {name}?',
      am: '«X ለ box፣ Y ለ yellow እና yummy፣ Z ለ zigzag፣ Q ለ queen!» አያቴ አጨበጨበች። X marks the spot! {name}፣ የሀብት ካርታ መሣል ትችላላችሁ?',
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why couldn't they find the treasure at first? How did Anbessa work it out?", "Where does the X go in box, fox and six?"],
      am: ["መጀመሪያ ሀብቱን ለምን ማግኘት አልቻሉም? አንበሳ እንዴት ደረሰበት?", "በ box፣ fox እና six ውስጥ X የት ነው ያለው?"],
    },
    activity: {
      en: 'Hide a small treasure at home and draw a simple map with an X. Give clues with the new letters: "Walk in a zigzag", "Find something yellow", "Take six steps". About these letters: x usually comes at the end of short words and says ‘ks’ (box, six); y at the start says ‘y’ (yes, like የ); z buzzes like a bee (zoo, like ዝ); q nearly always comes with u and says ‘kw’ (queen, like ኵ).',
      am: 'በቤት ውስጥ ትንሽ ሀብት ደብቁና X ያለበት ቀላል ካርታ ሣሉ። በአዲሶቹ ፊደሎች ፍንጭ ስጡ፦ «በዚግዛግ ተራመዱ»፣ «ቢጫ ነገር ፈልጉ»፣ «ስድስት እርምጃ ተራመዱ»። ስለነዚህ ፊደሎች፦ x ብዙውን ጊዜ በአጫጭር ቃላት መጨረሻ ይመጣል፤ ‘ks’ ይላል (box፣ six)፤ y በመጀመሪያ ‘y’ ይላል (yes፣ እንደ የ)፤ z እንደ ንብ ይዝዛል (zoo፣ እንደ ዝ)፤ q ሁልጊዜ ማለት ይቻላል ከu ጋር ይመጣል፤ ‘kw’ ይላል (queen፣ እንደ ኵ)።',
    },
  },
};

export default story;
