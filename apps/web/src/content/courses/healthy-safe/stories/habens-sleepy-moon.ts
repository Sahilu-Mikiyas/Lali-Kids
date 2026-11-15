import type { Story } from "../../../stories";

/*
  "Haben and the Sleepy Moon" (level 2: enough sleep and a bedtime routine).
  Haben loves the night: the moon over the mountains and the grown-ups' coffee and stories, so she
  stays up late every night. Next day she can't wake up, yawns through reading, snaps at Hawi over
  a crayon, trips at football and falls asleep at dinner. Her mother explains that sleep is when
  growing bodies rest and grow and the mind tidies up the day. Haben watches the hens go to roost
  at sunset, at the same time every night, and works out her own plan: the same bedtime every
  night, with a routine (wash, brush, toilet, one story, lights out) and a goodnight to the moon
  from the window, so she doesn't miss it. She wakes up with the rooster, bright and kind.
  Facts follow WHO (under-5s) and paediatric sleep guidance: children of 3 to 5 need about 10 to
  13 hours in 24 hours, children of 6 to 12 about 9 to 12; a regular bedtime and routine help.
  Join-in line: "Wash, brush, story, hush."

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «መታጠብ፣ መቦረሽ፣ ተረት፣ ጸጥታ።».
*/
const story: Story = {
  id: "habens-sleepy-moon",
  course: "healthy-safe",
  pack: "story",
  title: { en: "Haben and the Sleepy Moon", am: "ሐበንና እንቅልፋሟ ጨረቃ" },
  category: "Bedtime",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#4A4F9E",
  scene: "lib-habens-sleepy-moon",
  coverPage: 7,
  teaches: { words: ["sleep", "bedtime", "moon", "rest", "morning"] },
  pages: [
    {
      en: "Haben loved the night. The big moon over the mountains. The smell of the grown-ups' coffee. Their stories and laughing. \"Just a little longer!\" she said, every night.",
      am: "ሐበን ሌሊትን ትወድ ነበር። በተራሮቹ ላይ ያለችውን ትልቅ ጨረቃ። የትልልቆቹን የቡና መዓዛ። ተረታቸውንና ሳቃቸውን። ሁልጊዜ ማታ «ትንሽ ብቻ ልቆይ!» ትላለች።",
    },
    {
      en: 'In the morning her mother called, "Haben, wake up!" Haben pulled the blanket over her head. "Five more minutes…"',
      am: "ጠዋት እናቷ «ሐበን፣ ተነሺ!» ብላ ጠራች። ሐበን ብርድ ልብሱን ራሷ ላይ ጎተተች። «አምስት ደቂቃ ብቻ…»",
    },
    {
      en: "At school she yawned all through reading. She snapped at Hawi over a crayon. At football she tripped over her own hooves. Nothing felt right.",
      am: "ትምህርት ቤት በንባብ ሰዓት ሙሉ ስታዛጋ ዋለች። በአንድ ቀለም ምክንያት ሀዊን ተቆጣቻት። ኳስ ስትጫወት በገዛ ኮቴዋ ተደናቀፈች። ምንም ነገር አልተመቻትም።",
    },
    {
      en: "That evening, Haben fell asleep at dinner, right over her plate of lentils. Her mother lifted her gently. \"Oh, my sleepy one.\"",
      am: "በዚያ ምሽት ሐበን እራት ላይ፣ ልክ በምስር ሳሕኗ ላይ እንቅልፍ ወሰዳት። እናቷ በቀስታ አነሣቻት። «ወይ እንቅልፋሟ ልጄ።»",
    },
    {
      en: "\"Sleep is when your body rests and grows,\" said her mother. \"Growing children need lots of it.\" \"But I don't want to miss the moon!\" said Haben.",
      am: "«ሰውነትሽ የሚያርፈውና የሚያድገው በእንቅልፍ ነው» አለች እናቷ። «የሚያድጉ ልጆች ብዙ እንቅልፍ ያስፈልጋቸዋል።» «ግን ጨረቃዋ እንዲያመልጠኝ አልፈልግም!» አለች ሐበን።",
    },
    {
      en: "Next evening, Haben watched the hens. At sunset they all climbed onto their perch at the same time. \"Same time every night,\" said Haben. \"Maybe I can too!\"",
      am: "በሚቀጥለው ምሽት ሐበን ዶሮዎቹን ተመለከተች። ፀሐይ ስትጠልቅ ሁሉም በአንድ ጊዜ ማደሪያቸው ላይ ወጡ። «በየሌሊቱ በአንድ ሰዓት» አለች ሐበን። «እኔም እችል ይሆናል!»",
    },
    {
      en: "So Haben made a plan. After dinner: wash face and feet. Brush teeth. A trip to the toilet. Wash, brush, story, hush.",
      am: "ስለዚህ ሐበን ዕቅድ አወጣች። ከእራት በኋላ፦ ፊትንና እግርን መታጠብ። ጥርስን መቦረሽ። ወደ መጸዳጃ መሄድ። መታጠብ፣ መቦረሽ፣ ተረት፣ ጸጥታ።",
    },
    {
      en: "Then she went to the window and said goodnight to the moon. \"Goodnight, Moon. See you tomorrow!\" The moon looked sleepy too.",
      am: "ከዚያ ወደ መስኮቱ ሄዳ ጨረቃዋን ደህና እደሪ አለቻት። «ደህና እደሪ ጨረቃ። ነገ እንገናኝ!» ጨረቃዋም እንቅልፍ የያዛት ትመስል ነበር።",
    },
    {
      en: "One story from her grandmother, cuddled up on the mat. Then her mother turned down the lamp. Wash, brush, story, hush. Haben wriggled a bit… and then she was asleep.",
      am: "በምንጣፉ ላይ ተቃቅፈው ከአያቷ አንድ ተረት። ከዚያ እናቷ መብራቱን አሳነሰችው። መታጠብ፣ መቦረሽ፣ ተረት፣ ጸጥታ። ሐበን ትንሽ ተገላበጠች… ከዚያ እንቅልፍ ወሰዳት።",
    },
    {
      en: "Cock-a-doodle-doo! Haben opened her eyes all by herself. She felt as bright as the morning sun.",
      am: "ኩኩሉ! ሐበን በራሷ ዓይኖቿን ገለጠች። እንደ ጠዋት ፀሐይ ብሩህ ሆኖ ተሰማት።",
    },
    {
      en: "At school she read a whole page out loud. She lent Hawi her best crayon. And at football, she scored a goal!",
      am: "ትምህርት ቤት አንድ ሙሉ ገጽ ጮክ ብላ አነበበች። ለሀዊ ምርጥ ቀለሟን አዋሰቻት። ኳስ ስትጫወትም ጎል አገባች!",
    },
    {
      en: "And every night, at the same time, Haben says goodnight to the moon. Wash, brush, story, hush.",
      am: "በየሌሊቱም በአንድ ሰዓት ሐበን ጨረቃዋን ደህና እደሪ ትላታለች። መታጠብ፣ መቦረሽ፣ ተረት፣ ጸጥታ።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "How did Haben feel after staying up late? How did she feel after a good sleep?",
        "What are the steps of our bedtime? Which one do you like best?",
      ],
      am: [
        "ሐበን አምሽታ ካደረች በኋላ ምን ተሰማት? በደንብ ከተኛች በኋላስ?",
        "የእኛ የመኝታ ሰዓት ደረጃዎች ምን ምን ናቸው? ከሁሉ የትኛውን ትወዳላችሁ?",
      ],
    },
    activity: {
      en: "Draw your child's bedtime routine as four or five little pictures and put them on the wall. Keep the same bedtime every night, even at weekends, and a calm, dim, quiet hour before it, without screens. Children of 3 to 5 need about 10 to 13 hours of sleep in 24 hours (naps count), and children of 6 to 12 about 9 to 12 hours.",
      am: "የልጅዎን የመኝታ ሥርዓት በአራት ወይም በአምስት ትንንሽ ሥዕሎች ስለው ግድግዳ ላይ ይለጥፉ። በየሌሊቱ፣ በዕረፍት ቀናትም ቢሆን፣ የመኝታ ሰዓቱ አንድ ይሁን፤ ከዚያ በፊት ያለው አንድ ሰዓት ደግሞ ያለ ስክሪን ረጋ ያለ፣ ደብዘዝ ያለና ጸጥ ያለ ይሁን። ከ3 እስከ 5 ዓመት ያሉ ልጆች በ24 ሰዓት ውስጥ ከ10 እስከ 13 ሰዓት (የቀን እንቅልፍን ጨምሮ)፣ ከ6 እስከ 12 ዓመት ያሉት ደግሞ ከ9 እስከ 12 ሰዓት እንቅልፍ ያስፈልጋቸዋል።",
    },
  },
};

export default story;
