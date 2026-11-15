import type { Story } from "../../../stories";

/*
  "Three Rounds of Coffee" (Maths Explorers, level 2). Equal groups and repeated addition:
  Anbessa carries the cups at Grandma's coffee ceremony. Five guests, three rounds (abol, tona,
  bereka): three groups of five, 5 + 5 + 5 = 15, written 3 × 5 = 15 ("groups of"). Gugu shares
  popcorn unfairly (1, 4, 5: not equal groups), Grandma makes four equal bowls of three
  (4 × 3 = 12), Hooyo's dates make five groups of two (5 × 2 = 10), and four saucers of five
  pieces of bread make twenty (4 × 5). Coffee is for the grown-ups; the children have popcorn.
  The repeated line to join in on: "Equal groups, add them up!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  «ዙር» for a round of coffee, «×» read as «ጊዜ» and the repeated line «እኩል ቡድኖች፣ ደምሯቸው!».
*/
const story: Story = {
  id: "three-rounds",
  course: "maths-explorers",
  pack: "story",
  title: { en: "Three Rounds of Coffee", am: "ሦስት ዙር ቡና" },
  category: "Maths",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#6A3A1E",
  scene: "lib-three-rounds",
  coverPage: 3,
  teaches: { numbers: [2, 3, 4, 5, 10, 12, 15, 20], words: ["equal groups", "groups of", "times", "repeated addition"] },
  pages: [
    {
      en: "On Sunday afternoon, Grandma made coffee for the neighbours. She spread fresh grass on the floor, lit the incense and roasted the green beans until they crackled and the whole house smelled wonderful.",
      am: "እሑድ ከሰዓት በኋላ አያት ለጎረቤቶቹ ቡና አፈላች። ወለሉ ላይ ለምለም ቄጠማ ጎዘጎዘች፣ ዕጣን አጨሰች፣ አረንጓዴውን ቡና እስኪንጣጣና ቤቱ በሙሉ እስኪያውድ ድረስ ቆላች።",
    },
    {
      en: 'Five guests sat round the little coffee table: Auntie Sheep, Grandpa Tolosa, Hooyo, Haben\'s mother and Teacher Meron. Anbessa was the cup carrier. "Five cups for the first round, abol!"',
      am: "አምስት እንግዶች በትንሹ ረከቦት ዙሪያ ተቀመጡ፦ እማማ በግ፣ አባ ቶሎሳ፣ ሁዮ፣ የሐበን እናትና መምህርት መሮን። አንበሳ ሲኒ አቀባይ ነበር። «ለመጀመሪያው ዙር፣ ለአቦል፣ አምስት ሲኒዎች!»",
    },
    {
      en: 'Then came the second round, tona. Five more cups! "Five and five is ten," counted Anbessa, carrying them carefully, one in each paw.',
      am: "ከዚያ ሁለተኛው ዙር፣ ቶና መጣ። አምስት ተጨማሪ ሲኒዎች! «አምስትና አምስት አሥር» ብሎ ቆጠረ አንበሳ፤ በእያንዳንዱ መዳፉ አንድ አንድ ሲኒ በጥንቃቄ ይዞ።",
    },
    {
      en: 'And the third round, bereka, the blessing. Five more cups! Equal groups, add them up! "Five, ten, fifteen. I carried fifteen cups!"',
      am: "ሦስተኛው ዙር ደግሞ በረካ፣ ምርቃቱ። አምስት ተጨማሪ ሲኒዎች! እኩል ቡድኖች፣ ደምሯቸው! «አምስት፣ አሥር፣ አሥራ አምስት። አሥራ አምስት ሲኒዎች አቀበልኩ!»",
    },
    {
      en: 'Grandma smiled. "Three rounds, and five cups in every round. That is three groups of five. We can write it 3 × 5 = 15." The × sign means "groups of".',
      am: "አያት ፈገግ አለች። «ሦስት ዙሮች፣ በእያንዳንዱ ዙር አምስት ሲኒዎች። ያ ሦስት የአምስት ቡድኖች ነው። 3 × 5 = 15 ብለን እንጽፈዋለን።» የ× ምልክት «ጊዜ» ይባላል፤ «የ… ቡድኖች» ማለት ነው።",
    },
    {
      en: 'Coffee is for grown-ups, so the children had popcorn. Gugu shared it out. He gave Tsehay one handful, Hawi four, and himself five! "That\'s not fair!" said Tsehay.',
      am: "ቡና ለአዋቂዎች ነው፤ ስለዚህ ልጆቹ ፈንዲሻ በሉ። ጉጉ አከፋፈለ። ለፀሐይ አንድ እፍኝ፣ ለሀዊ አራት፣ ለራሱ ደግሞ አምስት ሰጠ! «ይሄ ፍትሐዊ አይደለም!» አለች ፀሐይ።",
    },
    {
      en: '"Those groups are not equal," said Grandma. "Let\'s make equal groups." She put the popcorn back and gave each of the four children one scoop, then another, then another. Three scoops in every bowl.',
      am: "«እነዚህ ቡድኖች እኩል አይደሉም» አለች አያት። «እኩል ቡድኖች እንሥራ።» ፈንዲሻውን መልሳ ለአራቱ ልጆች አንድ አንድ ጭልፋ፣ ደግሞ አንድ አንድ፣ ደግሞ አንድ አንድ ሰጠች። በእያንዳንዱ ሳህን ሦስት ጭልፋ።",
    },
    {
      en: 'Anbessa counted the scoops: "Three, six, nine, twelve. Four groups of three is twelve!" 3 + 3 + 3 + 3 = 12, and 4 × 3 = 12. Equal groups, add them up!',
      am: "አንበሳ ጭልፋዎቹን ቆጠረ፦ «ሦስት፣ ስድስት፣ ዘጠኝ፣ አሥራ ሁለት። አራት የሦስት ቡድኖች አሥራ ሁለት ናቸው!» 3 + 3 + 3 + 3 = 12፣ 4 × 3 = 12። እኩል ቡድኖች፣ ደምሯቸው!",
    },
    {
      en: 'Hooyo had brought sweet dates. She put two dates on each of the five guests\' saucers. "Two, four, six, eight, ten," counted Anbessa. "Five groups of two is ten!" 5 × 2 = 10.',
      am: "ሁዮ ጣፋጭ ተምር አምጥታ ነበር። በአምስቱ እንግዶች ማስቀመጫ ሳህኖች ላይ ሁለት ሁለት ተምር አስቀመጠች። «ሁለት፣ አራት፣ ስድስት፣ ስምንት፣ አሥር» ብሎ ቆጠረ አንበሳ። «አምስት የሁለት ቡድኖች አሥር ናቸው!» 5 × 2 = 10።",
    },
    {
      en: "{name}, can we count with Anbessa? There are 4 plates, with 5 pieces of bread on each. Five, ten, fifteen, twenty! 4 × 5 = 20. Equal groups, add them up!",
      am: "{name}፣ ከአንበሳ ጋር እንቁጠር? 4 ሳህኖች አሉ፤ በእያንዳንዱ ላይ 5 ቁራሽ ዳቦ። አምስት፣ አሥር፣ አሥራ አምስት፣ ሃያ! 4 × 5 = 20። እኩል ቡድኖች፣ ደምሯቸው!",
    },
    {
      en: "When the coffee was finished, everyone said thank you, and Auntie Sheep gave a blessing for the house. Anbessa stacked the fifteen cups on the tray: three neat rows of five.",
      am: "ቡናው ሲያልቅ ሁሉም አመሰገኑ፤ እማማ በግም ቤቱን መረቁ። አንበሳ አሥራ አምስቱን ሲኒዎች በትሪው ላይ ደረደረ፦ አምስት አምስት የያዙ ሦስት ረድፎች።",
    },
    {
      en: '"You are the best cup carrier in the village," said Grandma. Anbessa yawned a happy yawn. Fifteen cups, three rounds, and not one drop spilled.',
      am: "«በመንደሩ ውስጥ ካሉት ሲኒ አቀባዮች ሁሉ አንተ ምርጥ ነህ» አለች አያት። አንበሳ በደስታ አዛጋ። አሥራ አምስት ሲኒዎች፣ ሦስት ዙሮች፣ አንድም ጠብታ አልፈሰሰም።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why wasn't Gugu's popcorn sharing fair? How did Grandma make equal groups?", "How many cups would Anbessa carry if there were four rounds of five?"],
      am: ["ጉጉ ፈንዲሻውን ያከፋፈለው ለምን ፍትሐዊ አልነበረም? አያት እኩል ቡድኖችን እንዴት ሠራች?", "አምስት አምስት ሲኒ ያሉባቸው አራት ዙሮች ቢሆኑ አንበሳ ስንት ሲኒ ያቀብል ነበር?"],
    },
    activity: {
      en: "Set out some cups, plates or bowls and put the same number of beans in each. Say it two ways: \"three groups of four\" and \"four, eight, twelve\". Then make one group different and talk about why it is no longer equal groups.",
      am: "ጥቂት ሲኒዎችን፣ ሳህኖችን ወይም ጎድጓዳዎችን አስቀምጣችሁ በእያንዳንዳቸው እኩል ቁጥር ያላቸው ባቄላዎችን አድርጉ። በሁለት መንገድ በሉት፦ «ሦስት የአራት ቡድኖች» እና «አራት፣ ስምንት፣ አሥራ ሁለት»። ከዚያ አንዱን ቡድን ለዩትና ለምን እኩል ቡድኖች እንዳልሆኑ ተነጋገሩ።",
    },
  },
};

export default story;
