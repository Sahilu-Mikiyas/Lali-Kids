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
      en: '"Hmm," said Teacher Meron. "Let\'s find out. Put your hand flat on your chest and keep very still. What do you feel?" Gugu waited. Thump-thump. Thump-thump. It was there… but deep inside, and a little to the left.',
      am: "«እምም» አሉ መምህርት መሮን። «እስቲ እንደርስበት። እጃችሁን በደረታችሁ ላይ ዘርግታችሁ አድርጉና ጸጥ በሉ። ምን ይሰማችኋል?» ጉጉ ጠበቀ። ድው-ድው። ድው-ድው። እዚያ ነበር… ግን በጣም ውስጥ፣ ትንሽ ወደ ግራ።",
    },
    {
      en: "\"Your heart is inside your chest, behind your ribs,\" said Teacher Meron. \"Your red patch is skin. Your heart is a strong muscle, about as big as your fist. It squeezes, thump, and pushes blood all round your body through tiny tubes.\" Thump-thump, in and out!",
      am: "«ልባችሁ በደረታችሁ ውስጥ፣ ከጎድን አጥንቶቻችሁ ጀርባ ነው» አሉ መምህርት መሮን። «ቀዩ ቦታህ ቆዳ ነው። ልብህ ጠንካራ ጡንቻ ነው፤ የጡጫህን ያህል ይሆናል። ይጨመቃል፣ ድው፣ በጥቃቅን ቱቦዎች በኩልም ደምን በመላ ሰውነታችሁ ይገፋል።» ድው-ድው፣ ወደ ውስጥ፣ ወደ ውጭ!",
    },
    {
      en: "Gugu made a fist and looked at it. Then he and Ayan sat very still and counted. Ayan counted Gugu's heartbeats while Teacher Meron watched the clock. Then Gugu counted Ayan's breaths: in, out, in, out. Slow and steady.",
      am: "ጉጉ ጡጫ ጨብጦ ተመለከተው። ከዚያ እሱና አያን ጸጥ ብለው ተቀምጠው ቆጠሩ። መምህርት መሮን ሰዓቱን ሲመለከቱ አያን የጉጉን የልብ ምቶች ቆጠረች። ከዚያ ጉጉ የአያንን ትንፋሾች ቆጠረ፦ ወደ ውስጥ፣ ወደ ውጭ፣ ወደ ውስጥ፣ ወደ ውጭ። ቀስ ያለና የተረጋጋ።",
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
      en: "\"Not scared,\" laughed Teacher Meron. \"When you run, your leg muscles work hard and need more air and more food from your blood. So your lungs breathe faster to take in more air, and your heart pumps faster to carry it to your muscles.\"",
      am: "«አልፈራም» ብለው ሳቁ መምህርት መሮን። «ስትሮጡ የእግራችሁ ጡንቻዎች በብርቱ ይሠራሉ፤ ከደማችሁም ተጨማሪ አየርና ተጨማሪ ምግብ ይፈልጋሉ። ስለዚህ ሳምባችሁ ተጨማሪ አየር ለማስገባት በፍጥነት ይተነፍሳል፤ ልባችሁም ወደ ጡንቻዎቻችሁ ለማድረስ በፍጥነት ይመታል።»",
    },
    {
      en: 'Ayan put her hands on her ribs and took a big breath. Her chest grew bigger! She breathed out, and it went smaller. "The air goes in through my nose, down a tube to my two lungs, and they fill up like bags!"',
      am: "አያን እጆቿን በጎድን አጥንቶቿ ላይ አድርጋ ትልቅ ትንፋሽ ወሰደች። ደረቷ ተለቀ! ትንፋሿን ስታወጣ አነሰ። «አየሩ በአፍንጫዬ ይገባል፤ በቱቦ ወደ ሁለቱ ሳምባዎቼ ይወርዳል፤ እነሱም እንደ ከረጢት ይሞላሉ!»",
    },
    {
      en: "Next morning was cold and misty on the highlands. When Gugu breathed out, a little white cloud puffed from his mouth! \"My breath is warm and wet,\" he said, \"and the cold air turns it into a tiny cloud.\" Thump-thump, in and out!",
      am: "በማግሥቱ ጠዋት በደጋው ላይ ቀዝቃዛና ጭጋጋማ ነበር። ጉጉ ትንፋሹን ሲያወጣ ከአፉ ትንሽ ነጭ ደመና ወጣ! «ትንፋሼ ሞቃትና እርጥብ ነው» አለ፤ «ቀዝቃዛው አየር ጥቃቅን ደመና ያደርገዋል።» ድው-ድው፣ ወደ ውስጥ፣ ወደ ውጭ!",
    },
    {
      en: "Back in class, they lay quietly on the mat for a while. Then they counted again. Gugu's heart had slowed down, and Ayan's breaths were slow and steady again. \"Resting lets them slow down,\" said Teacher Meron.",
      am: "ወደ ክፍል ተመልሰው ለጥቂት ጊዜ በምንጣፉ ላይ ጸጥ ብለው ተኙ። ከዚያ እንደገና ቆጠሩ። የጉጉ ልብ ቀስ ብሎ ነበር፤ የአያን ትንፋሾችም እንደገና ቀስ ያሉና የተረጋጉ ሆኑ። «ማረፍ እንዲረጋጉ ያደርጋቸዋል» አሉ መምህርት መሮን።",
    },
    {
      en: '"Does my heart ever stop to rest?" asked Gugu. "Never," said Teacher Meron. "Your heart beats all day and all night, even when you\'re fast asleep, all your life long." Gugu patted his chest gently. "Thank you, heart."',
      am: "«ልቤ ለማረፍ ይቆማል?» ብሎ ጠየቀ ጉጉ። «በጭራሽ» አሉ መምህርት መሮን። «ልብህ ቀንና ሌሊት ይመታል፤ በጥልቅ እንቅልፍ ስትተኛም፣ ዕድሜ ልክህን።» ጉጉ ደረቱን በቀስታ መታ መታ አደረገ። «አመሰግናለሁ ልቤ።»",
    },
    {
      en: 'That evening Gugu told his friend Tsehay, "My red patch is just my skin. My heart is inside, about as big as my fist, and it never stops!" They put their hands on their chests and whispered together, "Thump-thump, in and out!"',
      am: "በዚያ ምሽት ጉጉ ለጓደኛው ለፀሐይ ነገራት፦ «ቀዩ ቦታዬ ቆዳዬ ብቻ ነው። ልቤ ውስጥ ነው፤ የጡጫዬን ያህል ነው፤ ፈጽሞም አይቆምም!» እጆቻቸውን በደረታቸው ላይ አድርገው አብረው በሹክሹክታ አሉ፦ «ድው-ድው፣ ወደ ውስጥ፣ ወደ ውጭ!»",
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
