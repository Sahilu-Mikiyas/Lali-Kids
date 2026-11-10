import type { Story } from "../../../stories";

/*
  "Hello! My Name Is Anbessa" (level 1: hello, goodbye, "My name is …"). The package's taster.
  The first day of English Club under the big warka tree. Teacher Meron shows how to say hello and
  your name; Hawi, Haben and Gugu each have a go. When it is Anbessa's turn, his voice gets stuck:
  the English words feel too big. Lali helps him say it small (a whisper), then a little bigger,
  then like a real lion. Then he sees Ayan, shy on her first day, and passes the trick on.
  Join-in line (the whole class sings it): "Hello, hello! What is your name?"

  English taught: Hello! / My name is … / What is your name? / Goodbye!
  The Amharic tells the same story and keeps every English line in English (in «»), with the
  meaning in Amharic once, so Amharic-speaking families hear and say the English.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  «ተገለባብጦ» (a somersault, page 3), «ግርርር» for a roar (page 8), and «እንግሊዝኛ ክበብ» for English Club.
*/
const story: Story = {
  id: "my-name-is",
  course: "english-first-words",
  pack: "story",
  title: { en: "Hello! My Name Is Anbessa", am: "Hello! ስሜ አንበሳ ነው" },
  category: "English",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#0E8C80",
  scene: "lib-my-name-is",
  coverPage: 8,
  teaches: { words: ["hello", "goodbye", "my name is", "what is your name"] },
  pages: [
    {
      en: 'Under the big warka tree, Teacher Meron rang her little bell. Ding, ding! "Welcome to English Club! Today we will learn to say hello."',
      am: "በትልቁ የዋርካ ዛፍ ሥር መምህርት መሮን ትንሿን ደወሏን ደወለች። ዲንግ፣ ዲንግ! «እንኳን ወደ እንግሊዝኛ ክበብ በደህና መጣችሁ! ዛሬ በእንግሊዝኛ ሰላም ማለትን እንማራለን።»",
    },
    {
      en: 'She waved. "Hello! My name is Meron." Then she smiled at everyone. "Now it\'s your turn. Say hello, and say your name!"',
      am: "መምህርት መሮን እጇን አውለበለበች። «Hello! My name is Meron.» (ይህ «ሰላም! ስሜ መሮን ነው» ማለት ነው።) ከዚያ ለሁሉም ፈገግ አለች። «አሁን የእናንተ ተራ ነው። Hello በሉና ስማችሁን ንገሩኝ!»",
    },
    {
      en: 'Everyone sang, "Hello, hello! What is your name?" Hawi jumped up first, wagging her tail. "Hello! My name is Hawi!" Everyone clapped.',
      am: "ሁሉም አብረው ዘመሩ፦ «Hello, hello! What is your name?» (ሰላም፣ ሰላም! ስምህ/ሽ ማን ነው?) ሀዊ ጭራዋን እያወዛወዘች መጀመሪያ ዘለለች። «Hello! My name is Hawi!» ሁሉም አጨበጨቡ።",
    },
    {
      en: '"Hello, hello! What is your name?" "Hello! My name is Haben," said Haben, with a little bow. "HELLO! MY NAME IS GUGU!" shouted Gugu, and did a somersault.',
      am: "«Hello, hello! What is your name?» «Hello! My name is Haben» አለች ሐበን፣ ትንሽ ጎንበስ ብላ። «HELLO! MY NAME IS GUGU!» ብሎ ጮኸ ጉጉ፤ ተገለባብጦም ዘለለ።",
    },
    {
      en: 'Then it was Anbessa\'s turn. "Hello, hello! What is your name?" Anbessa opened his mouth, but his voice was stuck. Not one word came out.',
      am: "ከዚያ የአንበሳ ተራ ደረሰ። «Hello, hello! What is your name?» አንበሳ አፉን ከፈተ፤ ድምፁ ግን ተያዘበት። አንድም ቃል አልወጣም።",
    },
    {
      en: 'His cheeks felt hot. He hid his face in his paws. "I know my name," he thought, "but the English words feel too big."',
      am: "ጉንጮቹ ጋሉ። ፊቱን በመዳፎቹ ሸፈነ። «ስሜን አውቀዋለሁ» ብሎ አሰበ፤ «የእንግሊዝኛዎቹ ቃላት ግን በጣም ትልቅ ይመስሉኛል።»",
    },
    {
      en: 'Buzz! Lali landed on his nose. "Say it small first, just to me." Anbessa whispered, "Hello. My name is Anbessa." "You did it!" buzzed Lali.',
      am: "ቡዝ! ላሊ አፍንጫው ላይ አረፈች። «መጀመሪያ በትንሹ በለው፤ ለእኔ ብቻ።» አንበሳ በሹክሹክታ «Hello. My name is Anbessa» አለ። «ቻልክ!» አለች ላሊ።",
    },
    {
      en: '"Now a little bigger," said Lali. "Hello! My name is Anbessa." Gugu gave him a thumbs-up, and Hawi wagged her tail. The words didn\'t feel so big now.',
      am: "«አሁን ትንሽ ከፍ አድርገህ» አለች ላሊ። «Hello! My name is Anbessa.» ጉጉ አውራ ጣቱን አሳየው፤ ሀዊም ጭራዋን አወዛወዘች። ቃላቱ አሁን ያን ያህል ትልቅ አልመሰሉትም።",
    },
    {
      en: 'Anbessa took a big breath and said it like a real lion: "HELLO! MY NAME IS ANBESSA!" ROAR! The leaves shook, and everyone cheered.',
      am: "አንበሳ በረጅሙ ተነፈሰና እንደ እውነተኛ አንበሳ ተናገረ፦ «HELLO! MY NAME IS ANBESSA!» ግርርር! የዛፉ ቅጠሎች ተንቀጠቀጡ፤ ሁሉም በደስታ ጮኹ።",
    },
    {
      en: "Just then, a little camel peeked out from behind the tree. Her eyes were big and shy. It was Ayan, and it was her very first day at English Club.",
      am: "ልክ በዚያን ጊዜ አንዲት ትንሽ ግመል ከዛፉ ጀርባ አጮልቃ አየች። ዓይኖቿ ትልልቅና ዓይናፋር ነበሩ። አያን ነበረች፤ በእንግሊዝኛ ክበብ የመጀመሪያ ቀኗ ነበር።",
    },
    {
      en: 'Anbessa knew just how she felt. He walked over and sang softly, "Hello, hello! What is your name?" Then he whispered, "Say it small first." "Hello," said Ayan. "My name is Ayan."',
      am: "አንበሳ ስሜቷን በደንብ ያውቀው ነበር። ወደ እሷ ሄዶ በለስላሳ ድምፅ ዘመረ፦ «Hello, hello! What is your name?» ከዚያ በሹክሹክታ «መጀመሪያ በትንሹ በይው» አላት። «Hello» አለች አያን። «My name is Ayan.»",
    },
    {
      en: '"Hello, Ayan!" said everyone. When the sun went down, Teacher Meron waved. "Goodbye, everyone!" "Goodbye, Teacher Meron!" they called. Goodbye, {name}!',
      am: "«Hello, Ayan!» አሉ ሁሉም። ፀሐይ ስትጠልቅ መምህርት መሮን እጇን አውለበለበች። «Goodbye, everyone!» (ደህና ሁኑ፣ ሁላችሁም!) «Goodbye, Teacher Meron!» ብለው መለሱ። Goodbye, {name}!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why did Anbessa's voice get stuck? What helped him say it in the end?",
        "How did Anbessa help Ayan? What could you say to a new friend?",
      ],
      am: [
        "የአንበሳ ድምፅ ለምን ተያዘበት? በመጨረሻ እንዲናገር የረዳው ምንድን ነው?",
        "አንበሳ አያንን እንዴት ረዳት? ለአዲስ ጓደኛ ምን ማለት እንችላለን?",
      ],
    },
    activity: {
      en: 'Sing "Hello, hello! What is your name?" and let your child answer "Hello! My name is …". Say it three ways, like Anbessa: in a whisper, in a normal voice, and like a lion. Then swap: your child sings, and you answer. Wave and say "Goodbye!" at the end.',
      am: "«Hello, hello! What is your name?» ብላችሁ ዝመሩ፤ ልጃችሁ «Hello! My name is …» ብሎ ስሙን ይመልስ። እንደ አንበሳ በሦስት መንገድ በሉት፦ በሹክሹክታ፣ በተለመደ ድምፅ እና እንደ አንበሳ ጮክ ብሎ። ከዚያ ተራ ተቀያየሩ፦ ልጃችሁ ይዝፈን፣ እናንተ መልሱ። በመጨረሻ እጅ እያውለበለባችሁ «Goodbye!» በሉ።",
    },
  },
};

export default story;
