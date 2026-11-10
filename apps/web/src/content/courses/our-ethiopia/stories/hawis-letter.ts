import type { Story } from "../../../stories";

/*
  "Hawi's Letter" (level 2: our languages: two ways of writing, fidel and Qubee).
  Hawi spends the kiremt school holiday with her grandpa in Bale. Anbessa writes to her in fidel.
  Her answer comes in Afaan Oromo, written in Qubee: "Akkam Anbessa!" Anbessa thinks it's
  English, and can't read the long words. Grandma explains: Qubee uses Latin letters, the same
  kind as English, but they spell Oromo words. Anbessa asks Hawi to teach him Qubee, and offers
  to teach her more fidel. Letters fly back and forth: a Qubee alphabet, names in both scripts.
  Grandma tells how old fidel is and which languages use it (Amharic, Tigrinya, Ge'ez in church
  and more), and which use Latin letters (Afaan Oromo, Somali, Sidaamu Afoo, Wolaytta and more).
  When Hawi comes home, each reads the other's letter aloud, and they make name cards in both
  scripts. A letter from Haben in Tigrinya shows a fidel letter Anbessa has never seen: ቐ.
  Join-in line: "Two ways to write, one friendship!"

  Facts: fidel (the Ethiopic script) is very old, used in Ethiopia for well over a thousand years
  (inscriptions at Aksum); each sign is a consonant with a vowel (ለ ሉ ሊ ላ ሌ ል ሎ); it is used for
  Amharic, Tigrinya, Ge'ez (the church language) and other languages; Tigrinya has some letters
  Amharic does not use, such as ቐ. Afaan Oromo has been written in Qubee, Latin letters, since
  the early 1990s; Somali, Sidaamu Afoo and Wolaytta are written in Latin letters too. "Akkam" is
  hello in Afaan Oromo, "Galatoomi" is thank you. School holidays fall in kiremt.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ሁለት የአጻጻፍ መንገዶች፣ አንድ ጓደኝነት!», «ቁቤ» and «የላቲን ፊደላት».
*/
const story: Story = {
  id: "hawis-letter",
  course: "our-ethiopia",
  pack: "story",
  title: { en: "Hawi's Letter", am: "የሀዊ ደብዳቤ" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#5A5AC8",
  scene: "lib-hawis-letter",
  coverPage: 9,
  teaches: { words: ["letter", "write", "read", "fidel", "alphabet", "name"] },
  pages: [
    {
      en: 'It was the kiremt holiday, and Hawi was going to stay with her grandpa in the Bale Mountains until school began. "Write to me!" said Anbessa. "Every week!" said Hawi.',
      am: "የክረምት እረፍት ነበር፤ ሀዊም ትምህርት እስኪጀመር በባሌ ተራሮች ከአያቷ ጋር ልትቆይ ነበር። «ደብዳቤ ጻፊልኝ!» አለ አንበሳ። «በየሳምንቱ!» አለች ሀዊ።",
    },
    {
      en: "So Anbessa wrote his first letter in fidel, the way he had learned at school: ሰላም ሀዊ! He drew Gugu hanging upside down from a tree, folded the letter, and dropped it in the post box.",
      am: "ስለዚህ አንበሳ የመጀመሪያ ደብዳቤውን በትምህርት ቤት እንደተማረው በፊደል ጻፈ፦ ሰላም ሀዊ! ጉጉ ከዛፍ ላይ ተገልብጦ ሲንጠለጠል ሣለ፤ ደብዳቤውን አጥፎ በፖስታ ሳጥኑ ውስጥ ጣለው።",
    },
    {
      en: 'Two weeks later, a letter came back. Anbessa tore it open. It said: Akkam Anbessa! But the letters were not fidel. They were round little letters he didn\'t know well: A, k, k, a, m. "Grandma, is this English?"',
      am: "ከሁለት ሳምንት በኋላ ደብዳቤ መጣ። አንበሳ ቀድዶ ከፈተው። እንዲህ ይል ነበር፦ Akkam Anbessa! ፊደላቱ ግን የአማርኛ ፊደል አልነበሩም። በደንብ የማያውቃቸው ትንንሽ ክብ ፊደላት ነበሩ፦ A፣ k፣ k፣ a፣ m። «አያቴ፣ ይህ እንግሊዝኛ ነው?»",
    },
    {
      en: '"No," said Grandma. "This is Afaan Oromo, Hawi\'s language. It\'s written in Qubee. Qubee uses Latin letters, the same kind as English, but they spell Oromo words."',
      am: "«አይደለም» አለች አያቴ። «ይህ የሀዊ ቋንቋ አፋን ኦሮሞ ነው። በቁቤ ነው የተጻፈው። ቁቤ የላቲን ፊደላትን ይጠቀማል፤ እንግሊዝኛ የሚጠቀምባቸውን ዓይነት፤ ግን የኦሮምኛ ቃላትን ይጽፉባቸዋል።»",
    },
    {
      en: 'Anbessa sounded it out. "A… kk… am. Akkam! That\'s Hawi\'s hello!" But the next words were long: Galatoomi… He got stuck. He couldn\'t read his own friend\'s letter. His ears drooped.',
      am: "አንበሳ እየፈታ አነበበ። «አ… ክ… ካም። አካም! ይህ የሀዊ ሰላምታ ነው!» ቀጣዮቹ ቃላት ግን ረጃጅም ነበሩ፦ Galatoomi… ተቸገረ። የገዛ ጓደኛውን ደብዳቤ ማንበብ አልቻለም። ጆሮዎቹ ተኙ።",
    },
    {
      en: 'Then he had an idea. He wrote back in fidel: "Hawi, please teach me Qubee, and I will teach you more fidel!" Two ways to write, one friendship!',
      am: "ከዚያ አንድ ሐሳብ መጣለት። በፊደል መልሶ ጻፈ፦ «ሀዊ፣ እባክሽ ቁቤ አስተምሪኝ፤ እኔም ተጨማሪ ፊደል አስተምርሻለሁ!» ሁለት የአጻጻፍ መንገዶች፣ አንድ ጓደኝነት!",
    },
    {
      en: "Hawi's next letter had a whole alphabet in it: A, B, C, D… and her name: H-a-w-i. Anbessa practised, and wrote back his own name two ways: አንበሳ and A-n-b-e-s-s-a.",
      am: "የሀዊ ቀጣይ ደብዳቤ ሙሉ የፊደል ገበታ ነበረው፦ A፣ B፣ C፣ D… እና ስሟ፦ H-a-w-i። አንበሳ ተለማመደ፤ የራሱንም ስም በሁለት መንገድ መልሶ ጻፈ፦ አንበሳ እና A-n-b-e-s-s-a።",
    },
    {
      en: '"Fidel is very, very old," Grandma told him. "People in Ethiopia have written with it for well over a thousand years. Each sign is a sound with its vowel: ለ, ሉ, ሊ, ላ. We use it for Amharic, Tigrinya, Ge\'ez in church, and other languages too."',
      am: "«ፊደል በጣም፣ በጣም ጥንታዊ ነው» አለችው አያቴ። «በኢትዮጵያ ሰዎች ከሺህ ዓመታት በላይ ጽፈውበታል። እያንዳንዱ ምልክት ከአናባቢው ጋር አንድ ድምፅ ነው፦ ለ፣ ሉ፣ ሊ፣ ላ። ለአማርኛ፣ ለትግርኛ፣ በቤተ ክርስቲያን ለግዕዝ፣ ለሌሎችም ቋንቋዎች እንጠቀምበታለን።»",
    },
    {
      en: '"And Latin letters are used for Afaan Oromo, Somali, Sidaamu Afoo, Wolaytta and more," said Grandma. "Different letters can carry our languages, just like different baskets can carry the same bread." Two ways to write, one friendship!',
      am: "«የላቲን ፊደላት ደግሞ ለአፋን ኦሮሞ፣ ለሶማልኛ፣ ለሲዳምኛ፣ ለወላይትኛና ለሌሎችም ያገለግላሉ» አለች አያቴ። «የተለያዩ ቅርጫቶች አንድ ዓይነት ዳቦ እንደሚይዙ ሁሉ፣ የተለያዩ ፊደላትም ቋንቋዎቻችንን ይይዛሉ።» ሁለት የአጻጻፍ መንገዶች፣ አንድ ጓደኝነት!",
    },
    {
      en: 'When kiremt ended, Hawi came home. They sat under the fig tree with all their letters. Anbessa read Hawi\'s letter aloud: "Galatoomi!" Hawi read Anbessa\'s in fidel: "አመሰግናለሁ!" Both mean thank you. They laughed and laughed.',
      am: "ክረምቱ ሲያልቅ ሀዊ ተመለሰች። ደብዳቤዎቻቸውን ሁሉ ይዘው በዋርካው ሥር ተቀመጡ። አንበሳ የሀዊን ደብዳቤ ጮክ ብሎ አነበበ፦ «Galatoomi!» ሀዊ ደግሞ የአንበሳን በፊደል አነበበች፦ «አመሰግናለሁ!» ሁለቱም «አመሰግናለሁ» ማለት ናቸው። ሳቁ፣ ሳቁ።",
    },
    {
      en: "Then they made name cards for the classroom door, every name in both scripts: ሀዊ and Hawi, አንበሳ and Anbessa. Two ways to write, one friendship!",
      am: "ከዚያ ለክፍሉ በር የስም ካርዶችን ሠሩ፤ እያንዳንዱ ስም በሁለቱም አጻጻፍ፦ ሀዊ እና Hawi፣ አንበሳ እና Anbessa። ሁለት የአጻጻፍ መንገዶች፣ አንድ ጓደኝነት!",
    },
    {
      en: 'Just then, a letter came from Haben, written in Tigrinya, in fidel. Anbessa could read most of it… but there was one letter he had never seen before: ቐ. "Tigrinya has a few letters of its own," laughed Haben. "Shall I teach you?"',
      am: "ልክ በዚያ ጊዜ ከሐበን በትግርኛ፣ በፊደል የተጻፈ ደብዳቤ መጣ። አንበሳ አብዛኛውን ማንበብ ቻለ… አንድ ፊደል ግን ከዚህ በፊት አይቶት አያውቅም ነበር፦ ቐ። «ትግርኛ የራሱ የሆኑ ጥቂት ፊደላት አሉት» አለች ሐበን እየሳቀች። «ላስተምርህ?»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Which letters can you write: fidel, Latin letters, or both? Which languages in our family are written with each?",
        "Anbessa couldn't read his friend's letter, so he asked her to teach him. What could you learn from a friend, and what could you teach them?",
      ],
      am: [
        "የትኞቹን ፊደላት መጻፍ ትችላላችሁ፦ ፊደል፣ የላቲን ፊደላት ወይስ ሁለቱንም? በቤተሰባችን ውስጥ ያሉት ቋንቋዎች በየትኛው ይጻፋሉ?",
        "አንበሳ የጓደኛውን ደብዳቤ ማንበብ ስላልቻለ እንድታስተምረው ጠየቃት። ከጓደኛ ምን መማር ትችላላችሁ? እናንተስ ምን ማስተማር ትችላላችሁ?",
      ],
    },
    activity: {
      en: "Write your names two ways, in fidel and in Latin letters, on a card for your bedroom door. Then write a short letter to a relative or a friend who lives in another town, and draw a picture in it.",
      am: "ስሞቻችሁን በሁለት መንገድ፣ በፊደልና በላቲን ፊደላት፣ ለመኝታ ክፍላችሁ በር በሚሆን ካርድ ላይ ጻፉ። ከዚያ በሌላ ከተማ ለሚኖር ዘመድ ወይም ጓደኛ አጭር ደብዳቤ ጻፉ፤ ሥዕልም ሣሉበት።",
    },
  },
};

export default story;
