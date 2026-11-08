import type { Story } from "../../../stories";

/*
  "Take Away, Cheeky Goats!" (Numbers & Counting, level 4). Taking away within 10: the
  neighbour's goats keep sneaking into Grandma's garden and eating cabbages (8 - 1 = 7,
  7 - 2 = 5, 5 - 3 = 2); "-" means take away; counting back; adding back undoes taking away
  (2 + 3 = 5); taking away zero; taking away with fingers (10 - 4 = 6); comparing two rows to
  find how many more; and taking everything away leaves zero.
  The repeated line to join in on: "Take away, count again: how many stay?"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the repeated line, «የመቀነስ ምልክት», «ጎመን» for cabbage and «ችግኝ» for seedling.
*/
const story: Story = {
  id: "cheeky-goats",
  course: "numbers-counting",
  pack: "numbers",
  title: { en: "Take Away, Cheeky Goats!", am: "ቀልደኞቹ ፍየሎች ወሰዱ!" },
  category: "Maths",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#5B8A2A",
  scene: "lib-cheeky-goats",
  coverPage: 1,
  teaches: { numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 10], words: ["take away", "minus", "left", "count back", "how many more"] },
  pages: [
    {
      en: 'In Grandma\'s garden grew eight round green cabbages, all in a row. "One, two, three, four, five, six, seven, eight," counted Anbessa. "Eight cabbages for the holiday!"',
      am: "በአያት የጓሮ አትክልት ውስጥ ስምንት ክብ አረንጓዴ ጎመኖች በአንድ መስመር በቅለው ነበር። «አንድ፣ ሁለት፣ ሦስት፣ አራት፣ አምስት፣ ስድስት፣ ሰባት፣ ስምንት» ብሎ ቆጠረ አንበሳ። «ለበዓሉ ስምንት ጎመኖች!»",
    },
    {
      en: 'But someone left the gate open. In crept a cheeky goat, and… munch! One cabbage was gone. Take away, count again: how many stay? "Seven!"',
      am: "ግን አንድ ሰው በሩን ክፍት ትቶት ነበር። አንድ ቀልደኛ ፍየል ሾልኮ ገባና… ቅርጥፍ! አንድ ጎመን ጠፋ። ውሰዱ፣ እንደገና ቁጠሩ፤ ስንት ቀሩ? «ሰባት!»",
    },
    {
      en: 'Grandma wrote it on the slate: 8 − 1 = 7. "This little line means minus: take away. Eight take away one is seven."',
      am: "አያት ሰሌዳው ላይ ጻፈችው፦ 8 − 1 = 7። «ይህች ትንሽ መስመር የመቀነስ ምልክት ናት፦ ውሰድ ማለት ነው። ስምንት ሲቀነስ አንድ ሰባት ነው።»",
    },
    {
      en: 'Then two more goats came. Munch, munch! Gugu counted back from seven: "Six, five." Take away, count again: how many stay? Five. 7 − 2 = 5.',
      am: "ከዚያ ሁለት ተጨማሪ ፍየሎች መጡ። ቅርጥፍ፣ ቅርጥፍ! ጉጉ ከሰባት ወደ ኋላ ቆጠረ፦ «ስድስት፣ አምስት።» ውሰዱ፣ እንደገና ቁጠሩ፤ ስንት ቀሩ? አምስት። 7 − 2 = 5።",
    },
    {
      en: 'Tsehay built a little fence of sticks. But three goats squeezed through the gap. Munch, munch, munch! "Five take away three is… two!" 5 − 3 = 2. Only two cabbages left!',
      am: "ፀሐይ በእንጨቶች ትንሽ አጥር ሠራች። ግን ሦስት ፍየሎች በክፍተቱ ሾልከው ገቡ። ቅርጥፍ፣ ቅርጥፍ፣ ቅርጥፍ! «አምስት ሲቀነስ ሦስት… ሁለት!» 5 − 3 = 2። የቀሩት ሁለት ጎመኖች ብቻ!",
    },
    {
      en: 'Lali buzzed a clever thought. "If we put the three back, we would have five again! Two plus three is five." Taking away and putting back go together, like a door that opens and shuts.',
      am: "ላሊ አንድ ብልህ ሐሳብ አመጣች። «ሦስቱን ብንመልሳቸው እንደገና አምስት ይሆኑ ነበር! ሁለት ሲደመር ሦስት አምስት ነው።» መውሰድና መመለስ አብረው ይሄዳሉ፤ እንደሚከፈትና እንደሚዘጋ በር።",
    },
    {
      en: 'Gugu chased the goats away. Shoo, shoo! This time no goat ate anything. "Two take away zero is still two," said Gugu proudly. Take away, count again: how many stay? Two!',
      am: "ጉጉ ፍየሎቹን አባረራቸው። ሹ፣ ሹ! በዚህ ጊዜ አንድም ፍየል ምንም አልበላም። «ሁለት ሲቀነስ ዜሮ አሁንም ሁለት ነው» አለ ጉጉ በኩራት። ውሰዱ፣ እንደገና ቁጠሩ፤ ስንት ቀሩ? ሁለት!",
    },
    {
      en: 'Anbessa planted ten new seedlings. A hungry hen pecked four of them. Anbessa held up ten fingers and folded down four. "Ten take away four… six!" 10 − 4 = 6.',
      am: "አንበሳ አሥር አዳዲስ ችግኞችን ተከለ። አንዲት የተራበች ዶሮ አራቱን ቆነጠረች። አንበሳ አሥር ጣቶቹን ከፍ አድርጎ አራቱን አጠፈ። «አሥር ሲቀነስ አራት… ስድስት!» 10 − 4 = 6።",
    },
    {
      en: 'Tsehay put the six seedlings in a row, and the two cabbages under them. "How many more seedlings than cabbages?" They matched them up. Four seedlings had no partner. "Four more!"',
      am: "ፀሐይ ስድስቱን ችግኞች በአንድ መስመር፣ ሁለቱን ጎመኖች ደግሞ ከሥራቸው አስቀመጠች። «ችግኞቹ ከጎመኖቹ በስንት ይበልጣሉ?» ጥንድ ጥንድ አደረጓቸው። አራት ችግኞች ጥንድ አልነበራቸውም። «በአራት ይበልጣሉ!»",
    },
    {
      en: 'Then the goats\' owner came running. "I am so sorry!" She brought four cabbages from her own garden. Two plus four makes six. "Thank you!" said Grandma.',
      am: "ከዚያ የፍየሎቹ ባለቤት እየሮጠች መጣች። «በጣም ይቅርታ!» ከራሷ ጓሮ አራት ጎመኖች አመጣች። ሁለት ሲደመር አራት ስድስት ይሆናል። «አመሰግናለሁ!» አለች አያት።",
    },
    {
      en: 'The goats looked sorry too. Grandma gave them the five old outside leaves. Munch, munch, munch, munch, munch! Five take away five… zero! "Not one leaf left!" laughed Tsehay.',
      am: "ፍየሎቹም ያዘኑ ይመስሉ ነበር። አያት አምስቱን አሮጌ የውጭ ቅጠሎች ሰጠቻቸው። ቅርጥፍ፣ ቅርጥፍ፣ ቅርጥፍ፣ ቅርጥፍ፣ ቅርጥፍ! አምስት ሲቀነስ አምስት… ዜሮ! «አንድም ቅጠል አልቀረም!» ብላ ሳቀች ፀሐይ።",
    },
    {
      en: "At the holiday meal there were six cabbages, cooked with carrots and potatoes. Enough for everyone, and {name} too. Take away, count again: how many stay? Just full tummies!",
      am: "በበዓሉ ምግብ ላይ በካሮትና በድንች የተሠሩ ስድስት ጎመኖች ነበሩ። ለሁሉም ይበቃል፤ ለ{name}ም ጭምር። ውሰዱ፣ እንደገና ቁጠሩ፤ ስንት ቀሩ? የጠገቡ ሆዶች ብቻ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["There were five cabbages and the goats ate three. How many were left? How could you check by adding?", "Why does taking away zero leave the number the same?"],
      am: ["አምስት ጎመኖች ነበሩ፤ ፍየሎቹ ሦስቱን በሉ። ስንት ቀሩ? በመደመር እንዴት ማረጋገጥ ትችላላችሁ?", "ዜሮ መቀነስ ቁጥሩን ለምን እንዳለ ያስቀረዋል?"],
    },
    activity: {
      en: 'Line up some fruit or toys as cabbages. Take turns being the goat: take some away and ask "how many stay?" Write it with − and =, then put them back and say the adding fact too (5 − 3 = 2, 2 + 3 = 5).',
      am: "አንዳንድ ፍራፍሬዎችን ወይም መጫወቻዎችን እንደ ጎመን በመስመር አስቀምጡ። ተራ በተራ ፍየል ሁኑ፦ አንዳንዶቹን ወስዳችሁ «ስንት ቀሩ?» ብላችሁ ጠይቁ። በ− እና በ= ጻፉት፤ ከዚያ መልሳችሁ የመደመሩንም እውነታ በሉ (5 − 3 = 2፣ 2 + 3 = 5)።",
    },
  },
};

export default story;
