import type { Story } from "../../../stories";

/*
  "Hawi's Helping Hand" (level 3: asking for help; the grown-ups we trust; keep telling until
  someone helps).
  Every day a bigger girl, Saba, takes Hawi's roasted barley at the school gate and laughs. Hawi
  feels worried and tries to sort it out alone. Grandpa Tolosa notices she's quiet and helps her
  draw a "helping hand": round her paw, one trusted grown-up on each finger (Grandpa, Mama,
  Teacher Meron, Auntie Sheep next door, Grandma at the market): grown-ups who listen and help.
  If one can't help, go to the next, and keep telling until someone does. Teacher Meron is busy
  with a crying little one ("Not now, Hawi"), so Hawi goes to the next finger: Mama, who listens,
  thanks her, and goes with her to talk to the teacher. Saba had been coming to school hungry;
  the school makes sure she has breakfast, and she says sorry.
  The helping hand ("safety network") is a common protective-behaviours activity.
  Join-in line: "One, two, three, four, five: my helping hand!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «አንድ፣ ሁለት፣ ሦስት፣ አራት፣ አምስት፦ የእርዳታ እጄ!».
*/
const story: Story = {
  id: "hawis-helping-hand",
  course: "healthy-safe",
  pack: "story",
  title: { en: "Hawi's Helping Hand", am: "የሀዊ የእርዳታ እጅ" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#C9622B",
  scene: "lib-hawis-helping-hand",
  coverPage: 4,
  teaches: { words: ["help", "tell", "trust", "listen", "hand"] },
  pages: [
    {
      en: "Every morning at the school gate, a bigger girl called Saba took Hawi's roasted barley. \"Mine now!\" she laughed, and ran off with it.",
      am: "ሁልጊዜ ጠዋት በትምህርት ቤቱ በር ላይ ሳባ የምትባል ትልቅ ልጅ የሀዊን የገብስ ቆሎ ትወስድ ነበር። «አሁን የእኔ ነው!» ብላ እየሳቀች ይዛው ትሮጥ ነበር።",
    },
    {
      en: "Hawi's tummy felt tight and worried. She didn't tell anyone. \"I'll sort it out myself,\" she thought. She hid her barley in her sleeve. But Saba found it.",
      am: "የሀዊ ሆድ ተጨነቀ፤ ተጨማደደ። ለማንም አልነገረችም። «ራሴ እፈታዋለሁ» ብላ አሰበች። ቆሎዋን በእጅጌዋ ውስጥ ደበቀችው። ሳባ ግን አገኘችው።",
    },
    {
      en: "That night Hawi didn't want her dinner. Her ears were flat. Grandpa Tolosa sat down beside her. \"Something heavy is sitting on you, little one.\" Hawi whispered, \"I don't know who to tell.\"",
      am: "በዚያ ምሽት ሀዊ እራቷን መብላት አልፈለገችም። ጆሮዎቿ ተኝተው ነበር። አባ ቶሎሳ አጠገቧ ተቀመጡ። «የሆነ ከባድ ነገር ተጭኖሻል፣ ልጄ።» ሀዊ በሹክሹክታ «ለማን እንደምነግር አላውቅም» አለች።",
    },
    {
      en: '"Then let\'s make a helping hand," said Grandpa. He drew round Hawi\'s paw with a piece of charcoal. "On each finger, we put a grown-up you trust: someone who listens, and helps."',
      am: "«እንግዲያው የእርዳታ እጅ እንሥራ» አሉ አባ ቶሎሳ። በከሰል የሀዊን መዳፍ ዙሪያውን ሣሉ። «በእያንዳንዱ ጣት ላይ የምታምኚውን ትልቅ ሰው እናስቀምጣለን፦ የሚያዳምጥና የሚረዳ ሰው።»",
    },
    {
      en: "Thumb: Grandpa Tolosa. Next: Mama. Middle: Teacher Meron. Then Auntie Sheep next door, and little finger: Grandma at the market. One, two, three, four, five: my helping hand!",
      am: "አውራ ጣት፦ አባ ቶሎሳ። ቀጥሎ፦ እማማ። መሃል፦ መምህርት መሮን። ከዚያ ጎረቤቷ እማማ በግ፤ ትንሿ ጣት ደግሞ፦ ገበያ ያለችው አያቴ። አንድ፣ ሁለት፣ ሦስት፣ አራት፣ አምስት፦ የእርዳታ እጄ!",
    },
    {
      en: '"If one finger can\'t help," said Grandpa, "go to the next. Keep telling, until someone helps you. You are never a bother."',
      am: "«አንዱ ጣት መርዳት ካልቻለ» አሉ አባ ቶሎሳ፣ «ወደሚቀጥለው ሂጂ። አንድ ሰው እስኪረዳሽ ድረስ መናገርሽን ቀጥዪ። መቼም አታስቸግሪም።»",
    },
    {
      en: 'Next morning, Hawi went to Teacher Meron. But a little one had fallen over and was crying. "Not now, Hawi," said the teacher. Hawi\'s ears drooped.',
      am: "በሚቀጥለው ጠዋት ሀዊ ወደ መምህርት መሮን ሄደች። ግን አንድ ትንሽ ልጅ ወድቆ እያለቀሰ ነበር። «አሁን አይሆንም ሀዊ» አሉ መምህርቷ። የሀዊ ጆሮዎች ወደቁ።",
    },
    {
      en: "Then she looked at her paw. Next finger! After school, she ran all the way home to Mama, and told her everything. One, two, three, four, five: my helping hand!",
      am: "ከዚያ መዳፏን ተመለከተች። ቀጣዩ ጣት! ከትምህርት ቤት በኋላ እስከ ቤት ድረስ ወደ እማማ ሮጠች፤ ሁሉንም ነገረቻት። አንድ፣ ሁለት፣ ሦስት፣ አራት፣ አምስት፦ የእርዳታ እጄ!",
    },
    {
      en: 'Mama hugged her tight. "Thank you for telling me. You did the right thing." The next morning, Mama walked with Hawi to school, and they talked to Teacher Meron together.',
      am: "እማማ አጥብቃ አቀፈቻት። «ስለነገርሽኝ አመሰግናለሁ። ትክክለኛውን ነገር አደረግሽ።» በሚቀጥለው ጠዋት እማማ ከሀዊ ጋር ወደ ትምህርት ቤት ሄደች፤ ከመምህርት መሮን ጋርም አብረው ተነጋገሩ።",
    },
    {
      en: '"I\'m sorry I was busy," said Teacher Meron. "I\'m listening now." She talked with Saba, and found out that Saba had been coming to school hungry, with no breakfast.',
      am: "«ሥራ ስለበዛብኝ ይቅርታ» አሉ መምህርት መሮን። «አሁን እያዳመጥኩ ነው።» ከሳባ ጋር ተነጋገሩ፤ ሳባ ቁርስ ሳትበላ ተርባ ወደ ትምህርት ቤት ትመጣ እንደነበር አወቁ።",
    },
    {
      en: "The grown-ups made sure Saba had breakfast every morning. Saba came to Hawi, looking at her feet. \"Sorry I took your barley.\" Hawi smiled. \"Want to share some?\"",
      am: "ትልልቆቹ ሳባ በየጠዋቱ ቁርስ እንድታገኝ አደረጉ። ሳባ መሬት መሬቱን እያየች ወደ ሀዊ መጣች። «ቆሎሽን ስለወሰድኩ ይቅርታ።» ሀዊ ፈገግ አለች። «ትንሽ እንካፈል?»",
    },
    {
      en: "Hawi put her helping hand on the wall by her bed. Whenever something feels heavy, she knows just what to do. One, two, three, four, five: my helping hand!",
      am: "ሀዊ የእርዳታ እጇን ከአልጋዋ አጠገብ ግድግዳ ላይ ለጠፈችው። አንድ ነገር ሲከብዳት ምን ማድረግ እንዳለባት ታውቃለች። አንድ፣ ሁለት፣ ሦስት፣ አራት፣ አምስት፦ የእርዳታ እጄ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Who was on Hawi's helping hand? What did she do when the first grown-up couldn't help?",
        "Who would you put on your helping hand?",
      ],
      am: [
        "በሀዊ የእርዳታ እጅ ላይ እነማን ነበሩ? የመጀመሪያው ትልቅ ሰው መርዳት ሳይችል ሲቀር ምን አደረገች?",
        "እናንተ በእርዳታ እጃችሁ ላይ ማንን ታስቀምጣላችሁ?",
      ],
    },
    activity: {
      en: "Draw round your child's hand and choose together five trusted grown-ups (at least one outside the home, such as a teacher or a neighbour), one on each finger. Practise: \"If you feel worried, scared or hurt, who could you tell? And if they can't help?\" When your child tells you something, stop, listen, thank them, and act. A child who is listened to about small things will tell you about big ones.",
      am: "የልጅዎን እጅ ዙሪያውን ስለው፣ አምስት የሚታመኑ ትልልቅ ሰዎችን (ቢያንስ አንዱ ከቤት ውጭ፣ ለምሳሌ መምህር ወይም ጎረቤት) በአንድ ላይ ምረጡ፤ በእያንዳንዱ ጣት አንድ። ተለማመዱ፦ «ብትጨነቅ፣ ብትፈራ ወይም ቢጎዳህ ለማን ትነግራለህ? እሱስ መርዳት ካልቻለ?» ልጅዎ አንድ ነገር ሲነግርዎ ያቁሙ፣ ያዳምጡ፣ ያመስግኑ፣ እርምጃም ይውሰዱ። ስለ ትንንሽ ነገሮች የሚደመጥ ልጅ ስለ ትልልቅ ነገሮችም ይነግርዎታል።",
    },
  },
};

export default story;
