import type { Story } from "../../../stories";

/*
  "Nothing Left!" (Numbers & Counting, level 1). Counting back from five, one at a time
  (each friend eats one roll of injera: 5, 4, 3, 2, 1), and then ZERO: none, nothing at all,
  when a cheeky goat takes the last one. Zero is written 0, like an empty plate; Ge'ez numerals
  have no sign for zero (we just say ዜሮ, or "nothing"). Zero hunt (empty nest, empty basket), a
  countdown jump, and counting back up from zero.
  The repeated line to join in on: "Munch, munch! How many are left?"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  «ጥቅልል» for a roll of injera, «ምንም» / «ዜሮ», and the countdown on page 9.
*/
const story: Story = {
  id: "nothing-left",
  course: "numbers-counting",
  pack: "numbers",
  title: { en: "Nothing Left!", am: "ምንም አልቀረም!" },
  category: "Maths",
  ageBands: ["3-5"],
  isFree: false,
  color: "#C2410C",
  scene: "lib-nothing-left",
  coverPage: 6,
  teaches: { numbers: [0, 1, 2, 3, 4, 5], words: ["zero", "none", "left", "count back"] },
  pages: [
    {
      en: 'Grandma rolled five little rolls of injera and set them on a plate. "Five!" said Anbessa. "One for each of us." Everyone sat down, hungry.',
      am: "አያት አምስት ትናንሽ የእንጀራ ጥቅልሎችን ጠቅልላ ሳህን ላይ አስቀመጠች። «አምስት!» አለ አንበሳ። «ለእያንዳንዳችን አንድ።» ሁሉም ርቧቸው ተቀመጡ።",
    },
    {
      en: 'Anbessa took one. Munch, munch! How many are left? He counted the plate. "One, two, three, four. Four left!"',
      am: "አንበሳ አንዱን ወሰደ። ቅርጥፍ፣ ቅርጥፍ! ስንት ቀሩ? ሳህኑ ላይ ያሉትን ቆጠረ። «አንድ፣ ሁለት፣ ሦስት፣ አራት። አራት ቀሩ!»",
    },
    {
      en: 'Gugu took one. Munch, munch! How many are left? "Four take away one… three!" said Gugu. "Three left!"',
      am: "ጉጉ አንዱን ወሰደ። ቅርጥፍ፣ ቅርጥፍ! ስንት ቀሩ? «ከአራት አንድ ሲቀነስ… ሦስት!» አለ ጉጉ። «ሦስት ቀሩ!»",
    },
    {
      en: "Shy Tsehay took one, very politely. Munch, munch! How many are left? Two. Then Lali nibbled one, tiny bite by tiny bite… Only one left!",
      am: "ዓይናፋሯ ፀሐይ በትሕትና አንዱን ወሰደች። ቅርጥፍ፣ ቅርጥፍ! ስንት ቀሩ? ሁለት። ከዚያ ላሊ አንዱን በትንንሽ ጉርሻ ቀማመሰች… አንድ ብቻ ቀረ!",
    },
    {
      en: '"Five, four, three, two, one," counted Anbessa, pointing back along the plate. "Every time someone eats one, the number gets one smaller."',
      am: "«አምስት፣ አራት፣ ሦስት፣ ሁለት፣ አንድ» ብሎ ቆጠረ አንበሳ ወደ ኋላ እየጠቆመ። «አንድ ሰው አንዱን በበላ ቁጥር ቁጥሩ በአንድ ያንሳል።»",
    },
    {
      en: 'The last roll was for Grandma. But a cheeky goat poked its head through the window and… MUNCH, MUNCH! How many are left?',
      am: "የመጨረሻው ጥቅልል የአያት ነበር። ግን አንድ ቀልደኛ ፍየል ራሱን በመስኮቱ አስገብቶ… ቅርጥፍ፣ ቅርጥፍ! ስንት ቀሩ?",
    },
    {
      en: 'Everyone looked at the plate. "None!" "Nothing!" "ZERO!" said Grandma. "Zero means none at all. There are zero rolls left."',
      am: "ሁሉም ሳህኑን ተመለከቱ። «ምንም!» «ባዶ!» «ዜሮ!» አለች አያት። «ዜሮ ማለት ምንም የለም ማለት ነው። ምንም ጥቅልል አልቀረም፤ ዜሮ ጥቅልል።»",
    },
    {
      en: 'Tsehay drew a round shape in the flour: 0. "Zero looks like an empty plate!" "And in Ge\'ez?" asked Gugu. "Ge\'ez numerals have no zero," said Grandma. "We just say ዜሮ, or nothing."',
      am: "ፀሐይ ዱቄቱ ላይ ክብ ቅርጽ ሣለች፦ 0። «ዜሮ ባዶ ሳህን ይመስላል!» «በግዕዝስ?» ብሎ ጠየቀ ጉጉ። «የግዕዝ ቁጥሮች ዜሮ የላቸውም» አለች አያት። «ዝም ብለን ዜሮ፣ ወይም ምንም እንላለን።»",
    },
    {
      en: "Then they went on a zero hunt. A nest with zero eggs: the chicks had flown! A basket with zero oranges. A sky with zero clouds. Zero, zero, zero!",
      am: "ከዚያ ዜሮን ለማደን ወጡ። ዜሮ እንቁላል ያለበት ጎጆ፦ ጫጩቶቹ በረው ሄደዋል! ዜሮ ብርቱካን ያለበት ቅርጫት። ዜሮ ደመና ያለበት ሰማይ። ዜሮ፣ ዜሮ፣ ዜሮ!",
    },
    {
      en: 'Gugu climbed onto a big rock. "Count me down!" Everyone shouted, "Five, four, three, two, one, ZERO!" Gugu jumped. Wheee! Bump! He landed in the soft grass.',
      am: "ጉጉ አንድ ትልቅ ድንጋይ ላይ ወጣ። «ወደ ኋላ ቁጠሩልኝ!» ሁሉም ጮኹ፦ «አምስት፣ አራት፣ ሦስት፣ ሁለት፣ አንድ፣ ዜሮ!» ጉጉ ዘለለ። ዊዊ! ዱብ! ለስላሳው ሣር ላይ አረፈ።",
    },
    {
      en: '"Zero rolls is no fun," said Anbessa. So they rolled more together. "Zero… one, two, three, four, five, SIX!" One for Grandma, and one for {name}!',
      am: "«ዜሮ ጥቅልል አያስደስትም» አለ አንበሳ። ስለዚህ በአንድነት ተጨማሪ ጠቀለሉ። «ዜሮ… አንድ፣ ሁለት፣ ሦስት፣ አራት፣ አምስት፣ ስድስት!» አንዱ ለአያት፣ አንዱ ደግሞ ለ{name}!",
    },
    {
      en: 'The goat peeked in again. "Baa?" Grandma laughed and gave it a big green cabbage leaf. Munch, munch! How many are left? "Zero crumbs!" said everyone. "Zero!"',
      am: "ፍየሉ እንደገና አጮለቀ። «ሜ?» አያት ሳቀችና አንድ ትልቅ አረንጓዴ የጎመን ቅጠል ሰጠችው። ቅርጥፍ፣ ቅርጥፍ! ስንት ቀሩ? «ዜሮ ፍርፋሪ!» አሉ ሁሉም። «ዜሮ!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "When the goat ate the last roll, how many were left? What does zero mean?",
        "Can you find something in this room that has zero in it, like an empty cup or an empty box?",
      ],
      am: [
        "ፍየሉ የመጨረሻውን ጥቅልል ሲበላ ስንት ቀሩ? ዜሮ ማለት ምን ማለት ነው?",
        "በዚህ ክፍል ውስጥ ዜሮ የያዘ ነገር፣ እንደ ባዶ ሲኒ ወይም ባዶ ሳጥን፣ ማግኘት ትችላላችሁ?",
      ],
    },
    activity: {
      en: "Put five small snacks on a plate. Take turns eating one and asking, \"How many are left?\" until the plate is empty and you can shout \"Zero!\" Then count down from five to zero and jump.",
      am: "አምስት ትናንሽ መክሰሶችን ሳህን ላይ አስቀምጡ። ሳህኑ ባዶ ሆኖ «ዜሮ!» ብላችሁ እስክትጮሁ ድረስ እየተራ በተራ አንዱን እየበላችሁ «ስንት ቀሩ?» ብላችሁ ጠይቁ። ከዚያ ከአምስት እስከ ዜሮ ወደ ኋላ ቆጥራችሁ ዝለሉ።",
    },
  },
};

export default story;
