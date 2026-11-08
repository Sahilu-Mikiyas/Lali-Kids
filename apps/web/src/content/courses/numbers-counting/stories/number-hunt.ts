import type { Story } from "../../../stories";

/*
  "Lali's Number Hunt" (Numbers & Counting, level 1). Reading and writing the numerals 1-10,
  in digits and in Ge'ez numerals: every number has two ways to be written ("two hats on one
  head"). Lali and Tsehay find numbers around town and check each one by counting the things
  beside it (symbol matched to quantity). At home they write them in the sand, and Lali learns
  that 10 is written with two digits (a one and a zero) but ፲ is a single sign.
  The repeated line to join in on: "Numbers, numbers, everywhere!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  "two hats on one head" (page 1), «ባጃጅ», and the football words on page 8.
*/
const story: Story = {
  id: "number-hunt",
  course: "numbers-counting",
  pack: "numbers",
  title: { en: "Lali's Number Hunt", am: "የላሊ የቁጥር አደን" },
  category: "Maths",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#2F5BD3",
  scene: "lib-number-hunt",
  coverPage: 1,
  teaches: { numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], words: ["number", "digit", "Ge'ez numeral", "write"] },
  pages: [
    {
      en: 'Lali found a strange mark on a flat stone: ፩. "What is that?" she buzzed. Grandma smiled. "That is one, written the Ge\'ez way. And this is one too: 1."',
      am: "ላሊ በአንድ ጠፍጣፋ ድንጋይ ላይ እንግዳ ምልክት አገኘች፦ ፩። «ይሄ ምንድን ነው?» ብላ ጠየቀች። አያት ፈገግ አለች። «ይሄ አንድ ነው፣ በግዕዝ የተጻፈ። ይሄም አንድ ነው፦ 1።»",
    },
    {
      en: 'Grandma drew in the sand: ፪ and 2. "Every number can be written two ways, like two hats on one head. Both of these say two." Lali flew two loops. Loop, loop!',
      am: "አያት አሸዋው ላይ ሣለች፦ ፪ እና 2። «እያንዳንዱ ቁጥር በሁለት መንገድ ይጻፋል፤ በአንድ ራስ ላይ እንዳሉ ሁለት ኮፍያዎች። ሁለቱም ሁለት ይላሉ።» ላሊ ሁለት ጊዜ ዞረች። ዙር፣ ዙር!",
    },
    {
      en: '"Let\'s go on a number hunt!" said Tsehay. Numbers, numbers, everywhere! On the church gate hung three bells, and above them a sign: ፫, 3. "One, two, three. It\'s true!"',
      am: "«ቁጥር እናድን!» አለች ፀሐይ። ቁጥሮች፣ ቁጥሮች፣ በየቦታው! በቤተ ክርስቲያኑ በር ላይ ሦስት ደወሎች ተንጠልጥለዋል፤ ከላያቸውም ምልክት አለ፦ ፫፣ 3። «አንድ፣ ሁለት፣ ሦስት። ልክ ነው!»",
    },
    {
      en: 'Beep, beep! A little blue bajaj rolled by with 4 painted on its side. Lali counted the passengers waving out of it. "One, two, three, four. Four is ፬!"',
      am: "ቢፕ፣ ቢፕ! አንድ ትንሽ ሰማያዊ ባጃጅ በጎኑ 4 ተጽፎበት አለፈ። ላሊ ከውስጡ እጃቸውን የሚያውለበልቡትን ተሳፋሪዎች ቆጠረች። «አንድ፣ ሁለት፣ ሦስት፣ አራት። አራት በግዕዝ ፬ ነው!»",
    },
    {
      en: 'At the market, oranges sat in piles with little signs. Tsehay found the one that said ፭ and 5. She touched each orange. "One, two, three, four, five. Five!"',
      am: "በገበያው ብርቱካኖች ትናንሽ ምልክቶች ይዘው በክምር ተቀምጠዋል። ፀሐይ ፭ እና 5 የሚለውን አገኘች። እያንዳንዱን ብርቱካን ነካች። «አንድ፣ ሁለት፣ ሦስት፣ አራት፣ አምስት። አምስት!»",
    },
    {
      en: "Numbers, numbers, everywhere! A green gate had 6 on it, and six red flowers grew in a pot. A coffee tray had ፯ on it, with seven little cups.",
      am: "ቁጥሮች፣ ቁጥሮች፣ በየቦታው! አንድ አረንጓዴ በር ላይ 6 ተጽፏል፤ በማሰሮውም ውስጥ ስድስት ቀይ አበቦች በቅለዋል። አንድ የቡና ትሪ ላይ ፯ ተጽፏል፤ ሰባት ትናንሽ ሲኒዎችም አሉበት።",
    },
    {
      en: 'At the school, the teacher had written 8 and ፰ on the board. Eight children sat on the bench. "Is it eight?" whispered Tsehay. They counted. It was!',
      am: "በትምህርት ቤቱ መምህሩ ሰሌዳው ላይ 8 እና ፰ ጽፈው ነበር። ስምንት ልጆች አግዳሚ ወንበሩ ላይ ተቀምጠዋል። «ስምንት ናቸው?» አለች ፀሐይ በሹክሹክታ። ቆጠሩ። ልክ ነበሩ!",
    },
    {
      en: 'In the field, a boy with 9 on his shirt kicked the ball up, up, up. Everyone counted the kicks. "…seven, eight, NINE!" ፱! Then the ball rolled away.',
      am: "በሜዳው ላይ በማሊያው 9 የተጻፈበት ልጅ ኳሷን ወደ ላይ፣ ወደ ላይ፣ ወደ ላይ ለጋት። ሁሉም ምቶቹን ቆጠሩ። «…ሰባት፣ ስምንት፣ ዘጠኝ!» ፱! ከዚያ ኳሷ ተንከባልላ ሄደች።",
    },
    {
      en: 'Tsehay held up her hands and wiggled every finger. "How many fingers?" They counted all of them. "Ten! 10 and ፲!" Numbers, numbers, everywhere!',
      am: "ፀሐይ እጆቿን ከፍ አድርጋ ጣቶቿን ሁሉ አንቀሳቀሰች። «ስንት ጣቶች?» ሁሉንም ቆጠሩ። «አሥር! 10 እና ፲!» ቁጥሮች፣ ቁጥሮች፣ በየቦታው!",
    },
    {
      en: 'Back home, Tsehay wrote numbers in the sand with a stick. 1 is one line, straight down. ፩ has a little curl on top. "Come on, {name}, let\'s write one in the air!"',
      am: "ቤት ሲመለሱ ፀሐይ በእንጨት አሸዋው ላይ ቁጥሮችን ጻፈች። 1 አንድ ቀጥ ያለ መስመር ነው፣ ከላይ ወደ ታች። ፩ ከላይ ትንሽ ጥምዝ አለው። «እስኪ {name}፣ በአየር ላይ አንድ እንጻፍ!»",
    },
    {
      en: 'Lali looked at 10 and frowned. "That is a 1 and a 0!" "Yes," said Grandma. "Ten is one ten and nothing more. But in Ge\'ez, ten has its very own sign: ፲."',
      am: "ላሊ 10ን አይታ ፊቷን አጨፈገገች። «ይሄማ 1 እና 0 ነው!» «አዎ» አለች አያት። «አሥር ማለት አንድ አሥር ነው፣ ሌላ ምንም የለም። በግዕዝ ግን አሥር የራሱ የሆነ ምልክት አለው፦ ፲።»",
    },
    {
      en: "Tsehay wrote all the way from 1 to 10, and from ፩ to ፲. Lali sat on each number and counted it. Buzz, one! Buzz, two! Buzz, buzz… ten!",
      am: "ፀሐይ ከ1 እስከ 10፣ ከ፩ እስከ ፲ ድረስ ጻፈች። ላሊ በእያንዳንዱ ቁጥር ላይ እያረፈች ቆጠረች። ቡዝ፣ አንድ! ቡዝ፣ ሁለት! ቡዝ፣ ቡዝ… አሥር!",
    },
    {
      en: 'At night, Lali tried to count the stars. One, two, three… a hundred… a thousand! "The numbers never end!" she yawned. Numbers, numbers, everywhere!',
      am: "ማታ ላሊ ከዋክብትን ለመቁጠር ሞከረች። አንድ፣ ሁለት፣ ሦስት… መቶ… ሺህ! «ቁጥሮች አያልቁም!» ብላ አዛጋች። ቁጥሮች፣ ቁጥሮች፣ በየቦታው!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Every number can be written two ways. Can you show me five with digits, and five in Ge'ez numerals?",
        "Where have you seen numbers today: on a bus, a door, a phone, a calendar? What were they for?",
      ],
      am: [
        "እያንዳንዱ ቁጥር በሁለት መንገድ ይጻፋል። አምስትን በአሃዝ፣ አምስትን በግዕዝ ቁጥር አሳዩኝ?",
        "ዛሬ ቁጥሮችን የት አያችሁ፦ በአውቶቡስ፣ በበር፣ በስልክ፣ በቀን መቁጠሪያ? ለምን ነበሩ?",
      ],
    },
    activity: {
      en: "Go on a number hunt around your home or street and say each number you find. Then write 1 to 5 in sand, flour or with a wet finger on the floor, once with digits and once with Ge'ez numerals, and put the right number of beans beside each one.",
      am: "በቤታችሁ ወይም በመንገዳችሁ ዙሪያ ቁጥር ፈልጉ፤ ያገኛችሁትን ቁጥር ሁሉ ጮክ ብላችሁ በሉ። ከዚያ ከ1 እስከ 5 በአሸዋ፣ በዱቄት ወይም በእርጥብ ጣት መሬት ላይ ጻፉ፤ አንድ ጊዜ በአሃዝ፣ አንድ ጊዜ በግዕዝ ቁጥር። ከእያንዳንዱ ቁጥር አጠገብ ልክ የሆነ ብዛት ያላቸውን ፍሬዎች አስቀምጡ።",
    },
  },
};

export default story;
