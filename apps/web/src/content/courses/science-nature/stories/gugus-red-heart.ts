import type { Story } from "../../../stories";

/*
  "Gugu's Red Heart" (level 2: the heart and breathing). Geladas have a bare red patch on their
  chests, and Gugu is sure it is his heart. Teacher Meron: let's find out. Hand on chest: the thump
  is inside, behind the ribs, a little to the left; the red patch is only skin. The heart is a
  muscle about the size of your fist that squeezes blood all round the body through tubes. Gugu and
  Ayan count their heartbeats and breaths sitting still, then race round the field: now the heart
  thumps fast and they puff. Gugu's guess: his heart is scared? They find out: working muscles need
  more air and food, so the lungs breathe faster and the heart pumps faster to carry it. Hands on
  ribs: the chest grows as the lungs fill and shrinks as they empty; on a cold highland morning
  their breath makes little clouds. After resting, the beats slow down. The heart beats all life
  long, even in sleep. Join-in line: "Thump-thump, in and out!"

  Science (kept simple and true): the heart sits in the middle of the chest, tilted to the left,
  behind the ribs and breastbone, and is about the size of its owner's fist; it is a muscle that
  pumps blood through blood vessels; the lungs fill with air we breathe in through the nose and
  mouth and down the windpipe; the body takes oxygen from the air (named simply as "air" here);
  exercise speeds up the heart and breathing; they slow again with rest; breath is warm and damp,
  so it makes a small cloud in cold air. A gelada's red chest patch is bare skin.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ድው-ድው፣ ወደ ውስጥ፣ ወደ ውጭ!» (the heartbeat sound) and «የደም ሥሮች».
*/
const story: Story = {
  id: "gugus-red-heart",
  course: "science-nature",
  pack: "story",
  title: { en: "Gugu's Red Heart", am: "የጉጉ ቀይ ልብ" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#D8343A",
  scene: "lib-gugus-red-heart",
  coverPage: 5,
  teaches: { words: ["heart", "blood", "lungs", "breathe", "muscle", "beat"] },
  pages: [
    {
      en: 'Gugu looked down at the bright red patch on his chest. "Do you know what this is?" he asked Ayan proudly. "It\'s my HEART. That\'s why it\'s red, and shaped like a heart!"',
      am: "ጉጉ በደረቱ ላይ ያለውን ደማቅ ቀይ ቦታ ወደ ታች ተመለከተ። «ይሄ ምን እንደሆነ ታውቂያለሽ?» ብሎ አያንን በኩራት ጠየቃት። «ልቤ ነው። ቀይና የልብ ቅርጽ ያለው ለዚህ ነው!»",
    },
    {
      en: "\"Let's find out,\" said Teacher Meron. \"Put your hand flat on your chest and keep still.\" Gugu waited. Thump-thump. It was there… deep inside, a little to the left.",
      am: "«እስቲ እንደርስበት» አሉ መምህርቷ። «እጃችሁን በደረታችሁ ላይ አድርጉና ጸጥ በሉ።» ጉጉ ጠበቀ። ድው-ድው። እዚያ ነበር… ውስጥ፣ ትንሽ ወደ ግራ።",
    },
    {
      en: "\"Your heart is inside, behind your ribs. Your red patch is skin. Your heart is a muscle as big as your fist. It pumps blood all round your body.\" Thump-thump, in and out!",
      am: "«ልብህ ውስጥ፣ ከጎድን አጥንቶች ጀርባ ነው። ቀዩ ቦታህ ቆዳ ነው። ልብ የጡጫህን ያህል ጡንቻ ነው፤ ደምን በመላ ሰውነት ይገፋል።» ድው-ድው፣ ወደ ውስጥ፣ ወደ ውጭ!",
    },
    {
      en: "Gugu and Ayan sat very still. Ayan counted Gugu's heartbeats while Teacher Meron watched the clock. Then Gugu counted Ayan's breaths: in, out. Slow and steady.",
      am: "ጉጉና አያን ጸጥ ብለው ተቀመጡ። መምህርቷ ሰዓቱን ሲያዩ አያን የጉጉን የልብ ምት ቆጠረች። ከዚያ ጉጉ የአያንን ትንፋሽ ቆጠረ። ቀስ ያለና የተረጋጋ።",
    },
    {
      en: '"Now, run!" said Teacher Meron. Gugu and Ayan raced round the school field, once, twice, three times, as fast as they could go, and flopped down on the grass.',
      am: "«አሁን ሩጡ!» አሉ መምህርት መሮን። ጉጉና አያን የቻሉትን ያህል በፍጥነት የትምህርት ቤቱን ሜዳ አንድ ጊዜ፣ ሁለት ጊዜ፣ ሦስት ጊዜ ዞሩ፤ በሣሩ ላይም ዘፍ አሉ።",
    },
    {
      en: 'THUMP-THUMP-THUMP-THUMP! Gugu\'s heart was racing, and he was puffing hard. "My heart\'s gone wild! Is it scared?" Thump-thump, in and out!',
      am: "ድው-ድው-ድው-ድው! የጉጉ ልብ ይሮጥ ነበር፤ እሱም በኃይል ያለከልክ ነበር። «ልቤ አበደ! ፈርቶ ይሆን?» ድው-ድው፣ ወደ ውስጥ፣ ወደ ውጭ!",
    },
    {
      en: "\"Not scared,\" laughed Teacher Meron. \"Running muscles need more air and food from your blood. So you breathe faster, and your heart pumps faster.\"",
      am: "«አልፈራም» ብለው ሳቁ መምህርቷ። «የሚሮጡ ጡንቻዎች ከደም ተጨማሪ አየርና ምግብ ይፈልጋሉ። ስለዚህ በፍጥነት ትተነፍሳላችሁ፤ ልባችሁም ይፈጥናል።»",
    },
    {
      en: "Ayan put her hands on her ribs and took a big breath. Her chest grew! She breathed out, and it shrank. \"The air goes down a tube into my two lungs!\"",
      am: "አያን እጆቿን በጎድን አጥንቶቿ ላይ አድርጋ ትልቅ ትንፋሽ ወሰደች። ደረቷ ተለቀ! ስታወጣ አነሰ። «አየሩ በቱቦ ወደ ሁለቱ ሳምባዎቼ ይወርዳል!»",
    },
    {
      en: "Next morning was cold on the highlands. When Gugu breathed out, a little white cloud puffed from his mouth! \"My breath is warm and wet.\" Thump-thump, in and out!",
      am: "በማግሥቱ ጠዋት ደጋው ቀዝቃዛ ነበር። ጉጉ ትንፋሹን ሲያወጣ ከአፉ ትንሽ ነጭ ደመና ወጣ! «ትንፋሼ ሞቃትና እርጥብ ነው።» ድው-ድው፣ ወደ ውስጥ፣ ወደ ውጭ!",
    },
    {
      en: "Back in class, they lay quietly on the mat. Then they counted again. Gugu's heart had slowed down, and Ayan's breathing too. \"Resting lets them slow down.\"",
      am: "ወደ ክፍል ተመልሰው በምንጣፉ ላይ ጸጥ ብለው ተኙ። እንደገና ቆጠሩ። የጉጉ ልብ ቀስ ብሎ ነበር፤ የአያንም ትንፋሽ። «ማረፍ ያረጋጋቸዋል።»",
    },
    {
      en: "\"Does my heart ever rest?\" asked Gugu. \"Never,\" said Teacher Meron. \"It beats all day and all night, even when you're asleep, all your life.\" \"Thank you, heart.\"",
      am: "«ልቤ ያርፋል?» አለ ጉጉ። «በጭራሽ» አሉ መምህርቷ። «ቀንና ሌሊት ይመታል፤ ስትተኛም፣ ዕድሜ ልክህን።» «አመሰግናለሁ ልቤ።»",
    },
    {
      en: "Gugu told his friend Tsehay, \"My red patch is just skin. My heart is inside, as big as my fist!\" Hands on their chests, they whispered, \"Thump-thump, in and out!\"",
      am: "ጉጉ ለጓደኛው ለፀሐይ ነገራት፦ «ቀዩ ቦታዬ ቆዳ ብቻ ነው። ልቤ ውስጥ ነው፤ የጡጫዬን ያህል!» እጃቸውን በደረታቸው አድርገው አሉ፦ «ድው-ድው፣ ወደ ውስጥ፣ ወደ ውጭ!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Where is your heart, and how big is it? How did Gugu find out that his red patch wasn't his heart?",
        "Why do your heart and your breathing speed up when you run? What happens when you rest?",
      ],
      am: [
        "ልባችሁ የት ነው? ምን ያህል ትልቅ ነው? ጉጉ ቀዩ ቦታው ልቡ እንዳልሆነ እንዴት ደረሰበት?",
        "ስትሮጡ ልባችሁና አተነፋፈሳችሁ ለምን ይፈጥናሉ? ስታርፉ ምን ይሆናል?",
      ],
    },
    activity: {
      en: "Count together: put a hand on your chest (or two fingers on the side of your neck) and count your heartbeats while a grown-up watches a clock for 15 seconds. Then jump 20 times and count again. Then rest and count once more. Write the three numbers down. Which is biggest?",
      am: "አብራችሁ ቁጠሩ፦ እጃችሁን በደረታችሁ ላይ (ወይም ሁለት ጣቶችን በአንገታችሁ ጎን) አድርጋችሁ አንድ ትልቅ ሰው ሰዓቱን ለ15 ሰከንድ ሲመለከት የልብ ምታችሁን ቁጠሩ። ከዚያ 20 ጊዜ ዝለሉና እንደገና ቁጠሩ። ከዚያ ዕረፉና አንድ ጊዜ ደግሞ ቁጠሩ። ሦስቱን ቁጥሮች ጻፉ። የትኛው ይበልጣል?",
    },
  },
};

export default story;
