import type { Story } from "../../../stories";

/*
  "Haben Reads Aloud" (level 4: courage, being brave when scared).
  Haben is still learning Amharic (at home her family speaks Tigrinya). Teacher Meron says that
  tomorrow everyone will read a page aloud. Haben's tummy flutters all night. She practises with
  Anbessa under the fig tree; in class her voice is small and she stumbles on a long word, but
  she keeps going to the end. The class claps, and she teaches them a Tigrinya word. Being brave
  isn't not being scared; it's being scared and trying anyway.
  Join-in line: "Brave is scared, and trying anyway!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ጀግንነት ማለት እየፈሩ መሞከር ነው!», «መምህርት መሮን» for Teacher Meron, and the Tigrinya
  word on page 11 («ጽቡቕ» good, as Haben writes it).
*/
const story: Story = {
  id: "haben-reads-aloud",
  course: "values-character",
  pack: "story",
  title: { en: "Haben Reads Aloud", am: "ሐበን ጮክ ብላ አነበበች" },
  category: "Values",
  ageBands: ["3-5", "6-7", "8-9"],
  isFree: false,
  color: "#2F6FD0",
  scene: "lib-haben-reads-aloud",
  coverPage: 8,
  teaches: { words: ["brave", "scared", "read", "try", "language"] },
  pages: [
    {
      en: 'At school, Teacher Meron held up a storybook. "Tomorrow," she said, "each of you will read one page aloud to the class!" Everyone cheered. Everyone except Haben.',
      am: "በትምህርት ቤት መምህርት መሮን አንድ የተረት መጽሐፍ ከፍ አድርገው አሳዩ። «ነገ» አሉ፣ «እያንዳንዳችሁ ለክፍሉ አንድ ገጽ ጮክ ብላችሁ ታነባላችሁ!» ሁሉም በደስታ ጮኹ። ከሐበን በስተቀር።",
    },
    {
      en: "At home, Haben's family spoke Tigrinya. She was still learning to read in Amharic, and some words were long and tricky. What if she got them wrong? What if everyone laughed?",
      am: "በሐበን ቤት ትግርኛ ነበር የሚነገረው። እሷ ገና በአማርኛ ማንበብ እየተማረች ነበር፤ አንዳንድ ቃላት ረጃጅምና አስቸጋሪ ነበሩ። ብትሳሳትስ? ሁሉም ቢስቁባትስ?",
    },
    {
      en: "That night her tummy fluttered like a bird in a box. She couldn't sleep. \"I'll tell Teacher I'm sick,\" she whispered. \"Then I won't have to read.\"",
      am: "በዚያች ሌሊት ሆዷ በሳጥን ውስጥ እንዳለች ወፍ ይንፈራገጥ ነበር። እንቅልፍ አልወሰዳትም። «ለመምህርቷ ታምሜያለሁ እላለሁ» አለች በሹክሹክታ። «ያኔ ማንበብ አይጠበቅብኝም።»",
    },
    {
      en: 'In the morning she told Anbessa her plan. Anbessa thought. "When I had to cross the river, I was scared too," he said. "Grandma says brave is scared, and trying anyway."',
      am: "ጠዋት ላይ ዕቅዷን ለአንበሳ ነገረችው። አንበሳ አሰበ። «እኔም ወንዙን መሻገር ሲኖርብኝ ፈርቼ ነበር» አለ። «አያቴ ጀግንነት ማለት እየፈሩ መሞከር ነው ትላለች።»",
    },
    {
      en: '"Let\'s practise," said Anbessa. Under the fig tree, Haben read her page to him, then to Lali, then to a very patient goat. Each time it got a little easier.',
      am: "«እንለማመድ» አለ አንበሳ። በሾላው ዛፍ ሥር ሐበን ገጿን መጀመሪያ ለእሱ፣ ከዚያ ለላሊ፣ ከዚያ በጣም ትዕግሥተኛ ለሆነች አንዲት ፍየል አነበበች። በእያንዳንዱ ጊዜ ትንሽ ትንሽ ቀለለ።",
    },
    {
      en: "Then it was time. Teacher Meron smiled. \"Haben, it's your turn.\" Haben's knees wobbled as she walked to the front. Thump, thump went her heart. Brave is scared, and trying anyway!",
      am: "ከዚያ ሰዓቱ ደረሰ። መምህርት መሮን ፈገግ አሉ። «ሐበን፣ ያንቺ ተራ ነው።» ሐበን ወደ ፊት ስትሄድ ጉልበቶቿ ተንቀጠቀጡ። ልቧ ድው፣ ድው አለ። ጀግንነት ማለት እየፈሩ መሞከር ነው!",
    },
    {
      en: "She began to read. Her voice was very small at first. Then she came to a long, long word. She stopped. The room was quiet. Haben wanted to run back to her seat.",
      am: "ማንበብ ጀመረች። መጀመሪያ ድምጿ በጣም ትንሽ ነበር። ከዚያ አንድ ረጅም፣ ረጅም ቃል ላይ ደረሰች። ቆመች። ክፍሉ ጸጥ አለ። ሐበን ወደ መቀመጫዋ መሮጥ ፈለገች።",
    },
    {
      en: "Instead she took a breath, and sounded it out, slowly, piece by piece, the way she had practised. And she got it! She read on, a little louder, all the way to the end of the page.",
      am: "ይልቁንም በረጅሙ ተነፈሰችና እንደተለማመደችው ቀስ ብላ ቁራጭ በቁራጭ አነበበችው። ቻለችው! ትንሽ ጮክ ብላ እስከ ገጹ መጨረሻ ድረስ አነበበች።",
    },
    {
      en: "Nobody laughed. Gugu clapped first, then Tsehay, then the whole class. Anbessa clapped loudest of all. Haben's cheeks went pink.",
      am: "ማንም አልሳቀም። መጀመሪያ ጉጉ አጨበጨበ፣ ከዚያ ፀሐይ፣ ከዚያ መላው ክፍል። አንበሳ ከሁሉም አብልጦ አጨበጨበ። የሐበን ጉንጮች ሮዝ ሆኑ።",
    },
    {
      en: '"Haben," said Teacher Meron, "you can read in Amharic AND you can speak Tigrinya. Will you teach us a Tigrinya word?"',
      am: "«ሐበን» አሉ መምህርት መሮን፣ «በአማርኛ ማንበብ ትችያለሽ፤ ትግርኛም ትናገሪያለሽ። አንድ የትግርኛ ቃል ታስተምሪናለሽ?»",
    },
    {
      en: 'Haben stood tall. "Tsibuq!" she said. "It means good." "Tsibuq!" shouted the whole class. Now everyone was learning something new, and nobody minded getting it a little wrong.',
      am: "ሐበን ቀና ብላ ቆመች። «ጽቡቕ!» አለች። «ጥሩ ማለት ነው።» «ጽቡቕ!» ብሎ ጮኸ መላው ክፍል። አሁን ሁሉም አዲስ ነገር እየተማረ ነበር፤ ትንሽ ቢሳሳቱም ማንም ግድ አልሰጠውም።",
    },
    {
      en: 'Walking home, Haben\'s tummy wasn\'t fluttering any more. "I was scared," she told Anbessa, "and I did it anyway." Brave is scared, and trying anyway!',
      am: "ወደ ቤት ስትሄድ የሐበን ሆድ አይንፈራገጥም ነበር። «ፈርቼ ነበር» አለችው አንበሳን፣ «ግን አደረግኩት።» ጀግንነት ማለት እየፈሩ መሞከር ነው!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "What made Haben scared? What helped her be brave?",
        "Tell each other about a time you were scared and tried anyway. How did you feel afterwards?",
      ],
      am: [
        "ሐበንን ያስፈራት ምንድን ነው? ጀግና እንድትሆን የረዳት ምንድን ነው?",
        "የፈራችሁበትን ግን የሞከራችሁበትን ጊዜ እርስ በርሳችሁ ተነጋገሩ። ከዚያ በኋላ ምን ተሰማችሁ?",
      ],
    },
    activity: {
      en: "Practise something a little scary together, in small steps: read a page to a toy, then to a sibling, then to the whole family. Clap after each try, and learn one word in another Ethiopian language together.",
      am: "ትንሽ የሚያስፈራ ነገርን በትንንሽ ደረጃዎች አብራችሁ ተለማመዱ፦ መጀመሪያ አንድ ገጽ ለአሻንጉሊት፣ ከዚያ ለወንድም ወይም ለእህት፣ ከዚያ ለመላው ቤተሰብ አንብቡ። ከእያንዳንዱ ሙከራ በኋላ አጨብጭቡ፤ በሌላ የኢትዮጵያ ቋንቋ አንድ ቃልም አብራችሁ ተማሩ።",
    },
  },
};

export default story;
