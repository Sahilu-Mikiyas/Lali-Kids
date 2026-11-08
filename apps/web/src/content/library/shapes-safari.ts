import type { Story } from "../stories";

/*
  "Gugu's Shapes Safari": Gugu puts on his safari hat and hunts for shapes across the
  highlands: circles (the sun, injera), triangles (tukul roofs), squares (windows),
  rectangles (a door), a bonus hexagon (Lali's honeycomb) and, at night, stars. His bag
  springs a hole, the circles roll away fastest (no corners!), and at dusk he lays every
  shape out on the grass to make a picture of Grandma's house.
  The repeated line to join in on: "Shapes, shapes, where are you hiding?"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the shape names (ካሬ for square, አራት ማዕዘን for rectangle, ስድስት ማዕዘን for hexagon), the
  repeated line, and «ቾምፕ» for the bite.
*/
const story: Story = {
  id: "shapes-safari",
  pack: "numbers",
  // In the numbers-counting learning package (docs/PACKAGES.md): opens only through the course.
  course: "numbers-counting",
  title: { en: "Gugu's Shapes Safari", am: "የጉጉ የቅርጾች ጉዞ" },
  category: "Maths",
  ageBands: ["3-5"],
  isFree: false,
  color: "#2E8C6A",
  scene: "lib-shapes-safari",
  coverPage: 3,
  teaches: { words: ["circle", "triangle", "square", "rectangle", "star", "hexagon", "corner", "side"], numbers: [3, 4, 5, 6] },
  pages: [
    {
      en: 'Gugu put on his big safari hat. "Today I am going on a shapes safari!" Lali buzzed, "What is a shape?" "Come and see!"',
      am: "ጉጉ ትልቁን የጉዞ ኮፍያውን አደረገ። «ዛሬ ቅርጾችን ፍለጋ እሄዳለሁ!» ላሊ «ቅርጽ ምንድን ነው?» ብላ ጠየቀች። «ነዪ እንይ!»",
    },
    {
      en: '"Shapes, shapes, where are you hiding?" The sun peeked over the mountains. "A circle!" said Gugu. "Round and round, with no corners at all."',
      am: "«ቅርጾች፣ ቅርጾች፣ የት ተደበቃችሁ?» ፀሐይ ከተራሮቹ በላይ ብቅ አለች። «ክብ!» አለ ጉጉ። «ዙሪያውን ክብ ነው፤ አንድም ማዕዘን የለውም።»",
    },
    {
      en: 'Grandma\'s injera was a circle too, big and round and bubbly. Gugu took a bite. Chomp! "Oops. Now it is not a circle any more!"',
      am: "የአያት እንጀራም ክብ ነበር፤ ትልቅ፣ ክብና ዓይናም። ጉጉ ገመጠ። ቾምፕ! «ውይ። አሁን ክብ አይደለም!»",
    },
    {
      en: '"Shapes, shapes, where are you hiding?" Up on the tukul roofs! "Triangles!" Three sides, three corners. "One, two, three," counted Gugu.',
      am: "«ቅርጾች፣ ቅርጾች፣ የት ተደበቃችሁ?» እዚያ የጎጆዎቹ ጣሪያ ላይ! «ሦስት ማዕዘኖች!» ሦስት ጎኖች፣ ሦስት ማዕዘኖች። «አንድ፣ ሁለት፣ ሦስት» ብሎ ቆጠረ ጉጉ።",
    },
    {
      en: 'In the school wall were little windows, and shy Tsehay waved from one. "Squares!" Four sides, all the same. "One, two, three, four," counted Lali.',
      am: "በትምህርት ቤቱ ግድግዳ ላይ ትናንሽ መስኮቶች ነበሩ፤ ዓይናፋሯ ፀሐይ ከአንዱ እጇን አውለበለበች። «ካሬዎች!» አራት እኩል ጎኖች። «አንድ፣ ሁለት፣ ሦስት፣ አራት» ብላ ቆጠረች ላሊ።",
    },
    {
      en: 'Anbessa opened the tall wooden door. "A rectangle!" said Gugu. "Two long sides and two short sides." Anbessa stretched up high. "Like me!"',
      am: "አንበሳ ረጅሙን የእንጨት በር ከፈተ። «አራት ማዕዘን!» አለ ጉጉ። «ሁለት ረጃጅም ጎኖችና ሁለት አጫጭር ጎኖች።» አንበሳ ወደ ላይ ተንጠራራ። «ልክ እንደ እኔ!»",
    },
    {
      en: 'Lali took Gugu to her hive. Inside were hundreds of little rooms, each with six sides. "They are hexagons," said Lali proudly.',
      am: "ላሊ ጉጉን ወደ ቀፎዋ ወሰደችው። ውስጡ በመቶዎች የሚቆጠሩ ትናንሽ ክፍሎች ነበሩ፤ እያንዳንዳቸው ስድስት ጎኖች አሏቸው። «ስድስት ማዕዘኖች ናቸው» አለች ላሊ በኩራት።",
    },
    {
      en: 'Gugu put all his shapes in his bag. But the bag had a hole! Out tumbled the shapes, down the hill. "Come back, shapes!"',
      am: "ጉጉ ቅርጾቹን ሁሉ በቦርሳው ውስጥ ከተተ። ግን ቦርሳው ቀዳዳ ነበረው! ቅርጾቹ ወጥተው ከኮረብታው ወደ ታች ተንከባለሉ። «ቅርጾች፣ ተመለሱ!»",
    },
    {
      en: 'The circles rolled fastest, round and round. The squares went flip, flop… and stopped. "Circles roll because they have no corners!" said Gugu.',
      am: "ክቦቹ ከሁሉም ፈጥነው ዙሪያውን ተንከባለሉ። ካሬዎቹ ግልብጥ፣ ግልብጥ… ብለው ቆሙ። «ክቦች የሚንከባለሉት ማዕዘን ስለሌላቸው ነው!» አለ ጉጉ።",
    },
    {
      en: 'Anbessa caught the rolling circles. Tsehay found the triangles hiding behind a rock. "Shapes, shapes, there you are!"',
      am: "አንበሳ የሚንከባለሉትን ክቦች ያዘ። ፀሐይ ከድንጋይ ጀርባ የተደበቁትን ሦስት ማዕዘኖች አገኘች። «ቅርጾች፣ ቅርጾች፣ እዚህ ናችሁ!»",
    },
    {
      en: "At home, Gugu laid out every shape on the grass: a big square, a triangle on top, a rectangle door and a round circle sun.",
      am: "ቤት ሲደርስ ጉጉ ቅርጾቹን ሁሉ ሣሩ ላይ ደረደራቸው፦ ትልቅ ካሬ፣ ከላዩ ሦስት ማዕዘን፣ የአራት ማዕዘን በር እና ክብ ፀሐይ።",
    },
    {
      en: '"It\'s my house!" said Grandma, and she hugged him tight. "You found shapes everywhere." Gugu grinned. "And one more is coming…"',
      am: "«ይህ የእኔ ቤት ነው!» አለች አያት፤ አጥብቃም አቀፈችው። «ቅርጾችን በየቦታው አገኘህ።» ጉጉ ፈገግ አለ። «ገና አንድ ይመጣል…»",
    },
    {
      en: 'When the sky grew dark, out came the stars. "Five points each!" whispered Lali. "One, two, three, four, five." Goodnight, shapes!',
      am: "ሰማዩ ሲጨልም ከዋክብት ወጡ። «እያንዳንዳቸው አምስት ጫፎች አሏቸው!» አለች ላሊ በሹክሹክታ። «አንድ፣ ሁለት፣ ሦስት፣ አራት፣ አምስት።» ደህና እደሩ፣ ቅርጾች!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why did the circles roll away fastest, and the squares stop? Can you find something round and something with corners near you?",
        "Gugu made Grandma's house out of shapes. What shapes would you use to make your home?",
      ],
      am: [
        "ክቦቹ ለምን ከሁሉም ፈጥነው ተንከባለሉ? ካሬዎቹስ ለምን ቆሙ? በአጠገባችሁ ክብ የሆነ ነገርና ማዕዘን ያለው ነገር ፈልጉ።",
        "ጉጉ የአያትን ቤት በቅርጾች ሠራ። እናንተ ቤታችሁን ለመሥራት የትኞቹን ቅርጾች ትጠቀማላችሁ?",
      ],
    },
    activity: {
      en: "Go on your own shapes safari around the house: find a circle (a plate), a triangle, a square, a rectangle (a door) and draw a star. Count the corners of each one together, then cut shapes from paper and make a picture of your home.",
      am: "በቤቱ ዙሪያ የራሳችሁን የቅርጾች ጉዞ አድርጉ፦ ክብ (ሳህን)፣ ሦስት ማዕዘን፣ ካሬ፣ አራት ማዕዘን (በር) ፈልጉ፤ ኮከብም ሳሉ። የእያንዳንዳቸውን ማዕዘኖች አብራችሁ ቁጠሩ፤ ከዚያ ከወረቀት ቅርጾችን ቆርጣችሁ የቤታችሁን ሥዕል ሥሩ።",
    },
  },
};

export default story;
