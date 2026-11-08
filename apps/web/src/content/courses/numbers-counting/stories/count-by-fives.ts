import type { Story } from "../../../stories";

/*
  "Count by Fives" (Numbers & Counting, level 6). Counting in fives (and twos): at the Timket
  festival the children wave their hands, each hand five fingers (5, 10, 15 … 50); Lali's
  flowers have five petals each; tally marks with a gate across every five; five-santim coins;
  the pattern that counting in fives always ends in 5 or 0; and counting in twos with pairs of
  shoes.
  The repeated line to join in on: "Count by five, high five!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the repeated line («በአምስት በአምስት ቁጠሩ፣ እጅ ለእጅ!»), «ጥምቀት», and «ጭረት» for tally marks.
*/
const story: Story = {
  id: "count-by-fives",
  course: "numbers-counting",
  pack: "numbers",
  title: { en: "Count by Fives", am: "በአምስት በአምስት" },
  category: "Maths",
  ageBands: ["6-7"],
  isFree: false,
  color: "#0E8C80",
  scene: "lib-count-by-fives",
  coverPage: 2,
  teaches: { numbers: [2, 4, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50], words: ["count in fives", "count in twos", "tally", "pattern"] },
  pages: [
    {
      en: "It was Timket, and the whole village came out in white clothes, singing and dancing along the road to the river. Drums went boom, boom! Everyone waved their hands in the air.",
      am: "ጥምቀት ነበር፤ መንደሩ በሙሉ ነጭ ለብሶ እየዘመረና እየጨፈረ ወደ ወንዙ በሚወስደው መንገድ ወጣ። ከበሮዎች ዱም፣ ዱም አሉ! ሁሉም እጆቹን ወደ ላይ አውለበለበ።",
    },
    {
      en: 'Gugu held up one hand. "Five fingers!" Then the other. "Five and five: ten!" Anbessa held up his two hands next to Gugu\'s. "Fifteen, twenty!" Count by five, high five!',
      am: "ጉጉ አንድ እጁን ከፍ አደረገ። «አምስት ጣቶች!» ከዚያ ሌላውን። «አምስትና አምስት፦ አሥር!» አንበሳ ሁለቱን እጆቹን ከጉጉ እጆች አጠገብ ከፍ አደረገ። «አሥራ አምስት፣ ሃያ!» በአምስት በአምስት ቁጠሩ፣ እጅ ለእጅ!",
    },
    {
      en: 'Five friends stood in a row, each with two hands up: ten hands. "Five, ten, fifteen, twenty, twenty-five, thirty, thirty-five, forty, forty-five, fifty! Fifty fingers!"',
      am: "አምስት ጓደኞች እያንዳንዳቸው ሁለት እጆቻቸውን ከፍ አድርገው በመስመር ቆሙ፦ አሥር እጆች። «አምስት፣ አሥር፣ አሥራ አምስት፣ ሃያ፣ ሃያ አምስት፣ ሠላሳ፣ ሠላሳ አምስት፣ አርባ፣ አርባ አምስት፣ ሃምሳ! ሃምሳ ጣቶች!»",
    },
    {
      en: '"Counting every finger would take a long time," said Grandma. "Counting by fives is much quicker." Clap, clap! Count by five, high five!',
      am: "«እያንዳንዱን ጣት መቁጠር ረጅም ጊዜ ይወስዳል» አለች አያት። «በአምስት በአምስት መቁጠር በጣም ይፈጥናል።» ጭብ፣ ጭብ! በአምስት በአምስት ቁጠሩ፣ እጅ ለእጅ!",
    },
    {
      en: 'Lali had picked some flowers for the festival. Each flower had five petals. "Five, ten, fifteen, twenty, twenty-five, thirty. Six flowers, thirty petals!"',
      am: "ላሊ ለበዓሉ አበቦች ቀጥፋ ነበር። እያንዳንዱ አበባ አምስት ቅጠሎች ነበሩት። «አምስት፣ አሥር፣ አሥራ አምስት፣ ሃያ፣ ሃያ አምስት፣ ሠላሳ። ስድስት አበቦች፣ ሠላሳ ቅጠሎች!»",
    },
    {
      en: 'Tsehay kept count of the dancers with marks in the dust: one, two, three, four lines, and the fifth line went right across, like a little gate. "Each gate is five!"',
      am: "ፀሐይ ጨፋሪዎቹን በአፈሩ ላይ በጭረቶች ቆጠረች፦ አንድ፣ ሁለት፣ ሦስት፣ አራት መስመሮች፤ አምስተኛው መስመር ደግሞ እንደ ትንሽ በር አቋርጦ አለፈ። «እያንዳንዱ በር አምስት ነው!»",
    },
    {
      en: 'She drew four gates. "Five, ten, fifteen, twenty. Twenty dancers!" Then one more line, all alone. "Twenty-one!"',
      am: "አራት በሮችን ሣለች። «አምስት፣ አሥር፣ አሥራ አምስት፣ ሃያ። ሃያ ጨፋሪዎች!» ከዚያ ብቻውን አንድ ተጨማሪ መስመር። «ሃያ አንድ!»",
    },
    {
      en: 'Grandma gave the children some five-santim coins for the festival. Anbessa counted his: "Five, ten, fifteen, twenty santim!" Count by five, high five!',
      am: "አያት ለልጆቹ ለበዓሉ ባለ አምስት ሳንቲሞችን ሰጠቻቸው። አንበሳ የራሱን ቆጠረ፦ «አምስት፣ አሥር፣ አሥራ አምስት፣ ሃያ ሳንቲም!» በአምስት በአምስት ቁጠሩ፣ እጅ ለእጅ!",
    },
    {
      en: 'Gugu noticed something. "Five, ten, fifteen, twenty… every number ends in five or zero!" "That is the pattern," said Grandma. "Five, then zero, then five, then zero."',
      am: "ጉጉ አንድ ነገር አስተዋለ። «አምስት፣ አሥር፣ አሥራ አምስት፣ ሃያ… እያንዳንዱ ቁጥር በአምስት ወይም በዜሮ ያልቃል!» «ጥለቱ እሱ ነው» አለች አያት። «አምስት፣ ከዚያ ዜሮ፣ ከዚያ አምስት፣ ከዚያ ዜሮ።»",
    },
    {
      en: 'By the river, everyone took off their shoes to splash. Lali counted the shoes in pairs: "Two, four, six, eight, ten!" "Now you are counting by twos," said Tsehay.',
      am: "በወንዙ ዳር ሁሉም ውኃ ለመርጨት ጫማቸውን አወለቁ። ላሊ ጫማዎቹን ጥንድ ጥንድ እያደረገች ቆጠረች፦ «ሁለት፣ አራት፣ ስድስት፣ ስምንት፣ አሥር!» «አሁን በሁለት በሁለት እየቆጠርሽ ነው» አለች ፀሐይ።",
    },
    {
      en: "Splash! The water sparkled and everyone laughed. {name}, let\'s hold up our hands with Gugu: five, ten! Count by five, high five!",
      am: "ቻፕ! ውኃው አንጸባረቀ፤ ሁሉም ሳቁ። {name}፣ ከጉጉ ጋር እጆቻችንን ከፍ እናድርግ፦ አምስት፣ አሥር! በአምስት በአምስት ቁጠሩ፣ እጅ ለእጅ!",
    },
    {
      en: "Walking home under the stars, the friends held hands in a long line. Five friends, ten hands, fifty fingers. Count by five, high five! Goodnight!",
      am: "ከዋክብት ሥር ወደ ቤት ሲሄዱ ጓደኞቹ በረጅም መስመር እጅ ለእጅ ተያያዙ። አምስት ጓደኞች፣ አሥር እጆች፣ ሃምሳ ጣቶች። በአምስት በአምስት ቁጠሩ፣ እጅ ለእጅ! ደህና እደሩ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why is it quicker to count fingers by fives? Can you count the fingers in your family by fives?", "What do you notice about the last digit when you count by fives?"],
      am: ["ጣቶችን በአምስት በአምስት መቁጠር ለምን ይፈጥናል? የቤተሰባችሁን ጣቶች በአምስት በአምስት መቁጠር ትችላላችሁ?", "በአምስት በአምስት ስትቆጥሩ የመጨረሻው አሃዝ ምን ይሆናል?"],
    },
    activity: {
      en: "Count everyone's hands in your family by fives. Keep score of a game with tally marks, drawing a gate across every fifth line, then count the gates by fives. Count pairs of shoes by the door by twos.",
      am: "የቤተሰባችሁን እጆች ሁሉ በአምስት በአምስት ቁጠሩ። የአንድን ጨዋታ ውጤት በጭረቶች መዝግቡ፤ እያንዳንዱን አምስተኛ መስመር እንደ በር አቋርጣችሁ ሣሉ፤ ከዚያ በሮቹን በአምስት በአምስት ቁጠሩ። በበሩ አጠገብ ያሉትን የጫማ ጥንዶች በሁለት በሁለት ቁጠሩ።",
    },
  },
};

export default story;
