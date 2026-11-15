import type { Story } from "../../../stories";

/*
  "Gugu Measures Everything" (Maths Explorers, level 4). Choosing the right unit and tool:
  Teacher Meron's class gets ready for the school garden day. Gugu wants to measure everything
  with his ruler, even the water. Long things in metres or centimetres (tape, ruler), heavy
  things in kilograms (scale), how much a container holds in litres (jug). The garden bed is
  4 m long; the pumpkin is 3 kg; the water drum holds 50 L; a seedling is 8 cm tall.
  The repeated line to join in on: "Is it long, is it heavy, or how much does it hold?"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  «የሜትር ቴፕ» for a tape measure, «በርሜል» for the water drum and the repeated line
  «ይረዝማል? ይከብዳል? ወይስ ምን ያህል ይይዛል?».
*/
const story: Story = {
  id: "which-unit",
  course: "maths-explorers",
  pack: "story",
  title: { en: "Gugu Measures Everything", am: "ጉጉ ሁሉንም ይለካል" },
  category: "Maths",
  ageBands: ["6-7", "8-9"],
  isFree: true,
  color: "#6A9A3A",
  scene: "lib-which-unit",
  coverPage: 3,
  teaches: { numbers: [3, 4, 8, 50], words: ["metre", "centimetre", "kilogram", "litre", "unit"] },
  pages: [
    {
      en: "It was garden day at school. Teacher Meron gave each group a job and a measuring tool: a tape measure, a ruler, a scale and a one-litre jug. Gugu grabbed the ruler first.",
      am: "በትምህርት ቤት የአትክልት ቦታ ቀን ነበር። መምህርት መሮን ለእያንዳንዱ ቡድን ሥራና የመለኪያ መሣሪያ ሰጡ፦ የሜትር ቴፕ፣ ማስመሪያ፣ ሚዛንና አንድ ሊትር የሚይዝ ማሰሮ። ጉጉ ቀድሞ ማስመሪያውን አነሣ።",
    },
    {
      en: '"I\'m going to measure everything!" said Gugu. He measured a leaf: 6 centimetres. A beetle: 2 centimetres. "Easy!"',
      am: "«ሁሉንም ነገር እለካለሁ!» አለ ጉጉ። አንድ ቅጠል ለካ፦ 6 ሴንቲ ሜትር። አንድ ጥንዚዛ፦ 2 ሴንቲ ሜትር። «ቀላል ነው!»",
    },
    {
      en: 'Then he tried the water drum. He put the ruler in the water. "How much water is in it?" The ruler got wet, and nobody knew. Tsehay giggled. "A ruler can\'t tell you how much it holds!"',
      am: "ከዚያ የውሃውን በርሜል ሞከረ። ማስመሪያውን ውሃው ውስጥ ከተተ። «ውስጡ ምን ያህል ውሃ አለ?» ማስመሪያው ራሰ፤ ማንም አላወቀም። ፀሐይ ተንከተከተች። «ማስመሪያ ምን ያህል እንደሚይዝ ሊነግርህ አይችልም!»",
    },
    {
      en: 'Teacher Meron smiled. "First ask a question: is it long, is it heavy, or how much does it hold? Then choose your tool." Is it long, is it heavy, or how much does it hold?',
      am: "መምህርት መሮን ፈገግ አሉ። «መጀመሪያ ጠይቁ፦ ይረዝማል? ይከብዳል? ወይስ ምን ያህል ይይዛል? ከዚያ መሣሪያችሁን ምረጡ።» ይረዝማል? ይከብዳል? ወይስ ምን ያህል ይይዛል?",
    },
    {
      en: 'The garden bed was long, so Anbessa and Hawi used the tape measure. "Four metres!" Long things are measured in metres; short things in centimetres.',
      am: "የአትክልቱ መደብ ረጅም ነበር፤ ስለዚህ አንበሳና ሀዊ የሜትር ቴፑን ተጠቀሙ። «አራት ሜትር!» ረጃጅም ነገሮች በሜትር፣ አጫጭሮቹ በሴንቲ ሜትር ይለካሉ።",
    },
    {
      en: 'The big pumpkin was heavy, so Haben put it on the scale. "Three kilograms!" Heavy things are measured in kilograms.',
      am: "ትልቁ ዱባ ከባድ ነበር፤ ስለዚህ ሐበን በሚዛኑ ላይ አስቀመጠችው። «ሦስት ኪሎ!» ከባድ ነገሮች በኪሎ ግራም ይለካሉ።",
    },
    {
      en: 'Ayan filled the water drum with the jug, counting each litre. It took fifty jugs! "The drum holds fifty litres." How much a container holds is measured in litres.',
      am: "አያን በርሜሉን በማሰሮው ሞላች፤ እያንዳንዱን ሊትር እየቆጠረች። ሃምሳ ማሰሮ ወሰደ! «በርሜሉ ሃምሳ ሊትር ይይዛል።» ዕቃ ምን ያህል እንደሚይዝ በሊትር ይለካል።",
    },
    {
      en: 'Now Gugu knew what his ruler was for. He measured the little tomato seedlings: eight centimetres tall. "Short things, ruler!" Is it long, is it heavy, or how much does it hold?',
      am: "አሁን ጉጉ ማስመሪያው ለምን እንደሆነ አወቀ። ትናንሾቹን የቲማቲም ችግኞች ለካ፦ ስምንት ሴንቲ ሜትር ቁመት። «አጫጭር ነገሮች፣ ማስመሪያ!» ይረዝማል? ይከብዳል? ወይስ ምን ያህል ይይዛል?",
    },
    {
      en: 'Teacher Meron made a game: "A bag of potatoes?" "Kilograms!" "A skipping rope?" "Metres!" "A bucket of water?" "Litres!" Everyone shouted the answers together.',
      am: "መምህርት መሮን ጨዋታ አዘጋጁ፦ «አንድ ከረጢት ድንች?» «ኪሎ ግራም!» «የገመድ ዝላይ ገመድ?» «ሜትር!» «አንድ ባልዲ ውሃ?» «ሊትር!» ሁሉም መልሶቹን በአንድነት ጮኹ።",
    },
    {
      en: "{name}, can we choose? A pencil: centimetres! A sack of teff: kilograms! A jerrycan of water: litres! Is it long, is it heavy, or how much does it hold?",
      am: "{name}፣ እንምረጥ? እርሳስ፦ ሴንቲ ሜትር! የጤፍ ከረጢት፦ ኪሎ ግራም! የውሃ ጀሪካን፦ ሊትር! ይረዝማል? ይከብዳል? ወይስ ምን ያህል ይይዛል?",
    },
    {
      en: "By the end of the day the garden was planted, the drum was full and every number was written on the class board, each with its unit: 4 m, 3 kg, 50 L, 8 cm.",
      am: "ቀኑ ሲያልቅ አትክልቱ ተተክሎ፣ በርሜሉ ሞልቶ፣ እያንዳንዱ ቁጥር ከመለኪያ አሃዱ ጋር በክፍሉ ሰሌዳ ላይ ተጻፈ፦ 4 m፣ 3 kg፣ 50 L፣ 8 cm።",
    },
    {
      en: 'Gugu gave the ruler back to Teacher Meron. "Next time," he said, "I\'ll ask the question first." And he did a little dance in the new garden.',
      am: "ጉጉ ማስመሪያውን ለመምህርት መሮን መለሰ። «በሚቀጥለው ጊዜ» አለ፣ «መጀመሪያ ጥያቄውን እጠይቃለሁ።» ከዚያ በአዲሱ አትክልት ቦታ ትንሽ ጨፈረ።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why couldn't Gugu's ruler tell him how much water was in the drum?", "What would you use to find out how heavy you are? How tall you are?"],
      am: ["የጉጉ ማስመሪያ በርሜሉ ውስጥ ምን ያህል ውሃ እንዳለ ለምን ሊነግረው አልቻለም?", "ክብደታችሁን ለማወቅ ምን ትጠቀማላችሁ? ቁመታችሁንስ?"],
    },
    activity: {
      en: "Play \"long, heavy or holds?\": name things around the house and decide together whether to measure them in metres or centimetres, kilograms, or litres. Then check one of each with a real tool.",
      am: "«ይረዝማል፣ ይከብዳል ወይስ ይይዛል?» ተጫወቱ፦ በቤት ውስጥ ያሉ ነገሮችን እየጠራችሁ በሜትር ወይም በሴንቲ ሜትር፣ በኪሎ ግራም ወይም በሊትር እንደሚለኩ አብራችሁ ወስኑ። ከዚያ ከእያንዳንዱ አንዱን በእውነተኛ መሣሪያ አረጋግጡ።",
    },
  },
};

export default story;
