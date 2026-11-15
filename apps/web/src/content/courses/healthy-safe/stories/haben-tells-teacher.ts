import type { Story } from "../../../stories";

/*
  "Haben Tells Her Teacher" (level 6: telling a grown-up when you feel unwell).
  At school Haben's head feels hot and her tummy hurts, but she doesn't want to make a fuss. She
  remembers her helping hand (Teacher Meron is on the middle finger) and tells her. The teacher
  thanks her, gives her water and a quiet place, and phones her mother, who takes her to the
  health post. Haben practises other ways to tell (ear, throat, dizzy, rash); at home she rests,
  drinks and gets her medicine from her mother, as the health worker said.
  Join-in line: "When my body feels wrong, I tell a grown-up!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line «ሰውነቴ ሲያመኝ ለትልቅ ሰው እነግራለሁ!» and «ጤና ኬላ» (health post).
*/
const story: Story = {
  id: "haben-tells-teacher",
  course: "healthy-safe",
  pack: "story",
  title: { en: "Haben Tells Her Teacher", am: "ሐበን ለመምህርቷ ነገረች" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#8A6BC0",
  scene: "lib-haben-tells-teacher",
  coverPage: 3,
  teaches: { words: ["sick", "tell", "hot", "rest", "water"] },
  pages: [
    {
      en: "At school, Haben's head felt hot and heavy. Her tummy hurt. She didn't want to play, not even skipping.",
      am: "ትምህርት ቤት የሐበን ራስ ሞቀ፤ ከበደም። ሆዷ አመማት። መጫወት አልፈለገችም፤ ገመድ ዝላይም ቢሆን።",
    },
    {
      en: "\"I'll just wait until home time,\" she thought. \"I don't want to make a fuss.\" She put her head down on her desk.",
      am: "«የቤት ሰዓት እስኪደርስ እጠብቃለሁ» ብላ አሰበች። «ማስቸገር አልፈልግም።» ራሷን በዴስኳ ላይ አስደገፈች።",
    },
    {
      en: "Then she remembered her helping hand. Teacher Meron was on the middle finger! \"When my body feels wrong, I tell a grown-up!\"",
      am: "ከዚያ የእርዳታ እጇን አስታወሰች። መምህርት መሮን በመሃል ጣቷ ላይ ነበሩ! «ሰውነቴ ሲያመኝ ለትልቅ ሰው እነግራለሁ!»",
    },
    {
      en: "\"Teacher Meron, I don't feel well. My head is hot and my tummy hurts.\" Teacher Meron knelt down and felt her forehead.",
      am: "«መምህርት መሮን፣ አሞኛል። ራሴ ሞቋል፤ ሆዴም ያመኛል።» መምህርት መሮን ተንበርክከው ግንባሯን ዳሰሱ።",
    },
    {
      en: "\"Thank you for telling me, Haben. You did just the right thing.\" She gave her a cup of water and a quiet place to lie down.",
      am: "«ሐበን፣ ስለነገርሽኝ አመሰግናለሁ። ትክክለኛውን አደረግሽ።» አንድ ኩባያ ውሃና ጸጥ ያለ መተኛ ቦታ ሰጧት።",
    },
    {
      en: "Then she phoned Haben's mother, who came quickly. \"My clever girl, you told someone. Let's go to the health post.\"",
      am: "ከዚያ ለሐበን እናት ደወሉ፤ እሷም ፈጥና መጣች። «ብልኋ ልጄ፣ ለሰው ነገርሽ። ወደ ጤና ኬላ እንሂድ።»",
    },
    {
      en: "At the health post, the health worker asked, \"Where does it hurt?\" Haben pointed. When my body feels wrong, I tell a grown-up!",
      am: "በጤና ኬላው የጤና ባለሙያዋ «የት ነው የሚያምሽ?» አለች። ሐበን አመለከተች። ሰውነቴ ሲያመኝ ለትልቅ ሰው እነግራለሁ!",
    },
    {
      en: "The health worker checked her carefully. \"Rest, plenty to drink, and this medicine,\" she told Haben's mother. \"Given by you.\"",
      am: "የጤና ባለሙያዋ በጥንቃቄ መረመረቻት። «እረፍት፣ ብዙ መጠጥና ይህ መድኃኒት» አለች ለእናቷ። «በአንቺ እጅ የሚሰጥ።»",
    },
    {
      en: "On the way home, Haben practised other ways to tell: \"My ear hurts.\" \"My throat is scratchy.\" \"I feel dizzy.\" \"I have a rash.\"",
      am: "ሲመለሱ ሐበን ሌሎች መናገሪያዎችን ተለማመደች፦ «ጆሮዬን ያመኛል።» «ጉሮሮዬ ይከረክረኛል።» «ያዞረኛል።» «ሽፍታ ወጣብኝ።»",
    },
    {
      en: "At home she slept, sipped water, and slept again. Her mother gave her the medicine, just as the health worker said.",
      am: "ቤት ተኛች፣ ውሃ ፉት አለች፣ እንደገና ተኛች። እናቷ እንደ ጤና ባለሙያዋ ትእዛዝ መድኃኒቱን ሰጠቻት።",
    },
    {
      en: "Two days later, Haben's head was cool and her tummy was fine. She skipped all the way to school.",
      am: "ከሁለት ቀን በኋላ የሐበን ራስ ቀዘቀዘ፤ ሆዷም ደህና ሆነ። እስከ ትምህርት ቤት እየዘለለች ሄደች።",
    },
    {
      en: "\"Thank you for telling me,\" said Teacher Meron again. Haben smiled. \"When my body feels wrong, I tell a grown-up!\"",
      am: "«ስለነገርሽኝ አመሰግናለሁ» አሉ መምህርት መሮን። ሐበን ፈገግ አለች። «ሰውነቴ ሲያመኝ ለትልቅ ሰው እነግራለሁ!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why did Haben nearly not tell anyone? What happened when she did?",
        "What words can you use to tell a grown-up how your body feels?",
      ],
      am: [
        "ሐበን ለማንም ሳትናገር ልትቀር ለምን ነበር? ስትናገር ምን ሆነ?",
        "ሰውነታችሁ ምን እንደሚሰማው ለትልቅ ሰው ለመናገር የትኞቹን ቃላት መጠቀም ትችላላችሁ?",
      ],
    },
    activity: {
      en: "Practise \"body words\" together (hot, hurts, itchy, dizzy, sore, tired) and tell your child that telling is never a fuss. Take a child to the health post or health centre straight away if they cannot drink or breastfeed, vomit everything, have a fit, are very sleepy or hard to wake, breathe fast or with difficulty, or have blood in their stool. For a fever, give plenty of fluids and light clothing, and ask a health worker before giving any medicine.",
      am: "«የሰውነት ቃላትን» አብራችሁ ተለማመዱ (ሞቀኝ፣ ያመኛል፣ ያሳክከኛል፣ ያዞረኛል፣ ቆስሏል፣ ደክሞኛል)፤ መናገር መቼም ማስቸገር እንዳልሆነም ለልጅዎ ይንገሩት። ልጁ መጠጣት ወይም ጡት መጥባት ካልቻለ፣ የበላውን ሁሉ ካስመለሰ፣ ካንዘፈዘፈው፣ በጣም ከደከመ ወይም ለመንቃት ከከበደው፣ በፍጥነት ወይም በችግር ከተነፈሰ ወይም በሰገራው ደም ካለ ወዲያውኑ ወደ ጤና ኬላ ወይም ጤና ጣቢያ ይውሰዱት። ለትኩሳት ብዙ ፈሳሽና ቀላል ልብስ ይስጡ፤ ማንኛውንም መድኃኒት ከመስጠትዎ በፊት የጤና ባለሙያ ይጠይቁ።",
    },
  },
};

export default story;
