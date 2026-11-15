import type { Story } from "../../../stories";

/*
  "Abdi at the Health Post" (level 6: the clinic and the health worker).
  Abdi has a cough that won't go away and is worried about the health post; Ayan, who went last
  year, tells him everything. They wait their turn; health worker Selam weighs him, takes his
  temperature under his arm, listens with her (cold!) stethoscope, and asks him to say "Aaah".
  He wants to know what she hears, so she lets him hear his own heart. It's a cough from a cold:
  rest, drinks, warm water with honey, come back if it gets worse.
  Join-in line: "Deep breath, I'm brave!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line «በጥልቅ ተንፍስ፣ ጎበዝ ነኝ!», «ስቴቶስኮፕ», and the health worker's name «ሰላም».
*/
const story: Story = {
  id: "abdi-at-the-health-post",
  course: "healthy-safe",
  pack: "story",
  title: { en: "Abdi at the Health Post", am: "አብዲ በጤና ኬላ" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#2E9A8A",
  scene: "lib-abdi-at-the-health-post",
  coverPage: 7,
  teaches: { words: ["health worker", "brave", "breathe", "scale", "heart"] },
  pages: [
    {
      en: "Abdi had a cough that wouldn't go away. Cough, cough, all night long. \"Tomorrow we'll see the health worker,\" said Hooyo.",
      am: "አብዲ የማይለቅ ሳል ነበረበት። ሳል፣ ሳል፣ ሌሊቱን ሙሉ። «ነገ የጤና ባለሙያዋን እናያለን» አለች ሁዮ።",
    },
    {
      en: "Abdi hid under his blanket. \"What will they do to me?\" Ayan sat beside him. \"I went last year. I'll tell you everything.\"",
      am: "አብዲ ብርድ ልብሱ ሥር ተደበቀ። «ምን ያደርጉኛል?» አያን አጠገቡ ተቀመጠች። «ባለፈው ዓመት ሄጄ ነበር። ሁሉንም እነግርሃለሁ።»",
    },
    {
      en: "At the health post they waited their turn on a bench. There were pictures of fruit and handwashing on the walls. Abdi counted them.",
      am: "በጤና ኬላው ወንበር ላይ ተራቸውን ጠበቁ። ግድግዳው ላይ የፍራፍሬና የእጅ መታጠብ ሥዕሎች ነበሩ። አብዲ ቆጠራቸው።",
    },
    {
      en: "Health worker Selam smiled. \"Hello, Abdi! First, let's see how much you've grown.\" Abdi stood on the scale. \"Big and strong!\"",
      am: "የጤና ባለሙያዋ ሰላም ፈገግ አለች። «ሰላም አብዲ! መጀመሪያ ምን ያህል እንዳደግህ እንይ።» አብዲ ሚዛኑ ላይ ቆመ። «ትልቅና ጠንካራ!»",
    },
    {
      en: "Then a thermometer under his arm, to see if he was hot. It didn't hurt at all. Abdi took a deep breath. \"Deep breath, I'm brave!\"",
      am: "ከዚያ ትኩሳቱን ለማየት ቴርሞሜትር በብብቱ ሥር። ምንም አላመመውም። አብዲ በጥልቅ ተነፈሰ። «በጥልቅ ተንፍስ፣ ጎበዝ ነኝ!»",
    },
    {
      en: "Selam listened to his chest with her stethoscope. \"It's a bit cold,\" she said. Brrr! \"Breathe in… and out.\" Deep breath, I'm brave!",
      am: "ሰላም በስቴቶስኮፕ ደረቱን አዳመጠች። «ትንሽ ይቀዘቅዛል» አለች። ብርር! «ተንፍስ… አውጣ።» በጥልቅ ተንፍስ፣ ጎበዝ ነኝ!",
    },
    {
      en: "\"Now open wide and say 'Aaah!'\" Abdi opened his mouth as wide as a yawning camel. \"AAAH!\" Even Selam laughed.",
      am: "«አሁን አፍህን ከፍተህ 'አ' በል!» አብዲ እንደሚያዛጋ ግመል አፉን ከፈተ። «አአአ!» ሰላምም ሳቀች።",
    },
    {
      en: "\"What do you hear in there?\" asked Abdi. Selam put the stethoscope in his ears. Thump-thump, thump-thump! \"My heart!\"",
      am: "«እዚያ ውስጥ ምን ትሰሚያለሽ?» አለ አብዲ። ሰላም ስቴቶስኮፑን በጆሮው አደረገችለት። ዱክ-ዱክ፣ ዱክ-ዱክ! «ልቤ!»",
    },
    {
      en: "\"It's a cough from a cold,\" said Selam. \"Rest, plenty to drink, and warm water with honey. Come back if it gets worse.\"",
      am: "«ከጉንፋን የመጣ ሳል ነው» አለች ሰላም። «እረፍት፣ ብዙ መጠጥና ሞቅ ያለ ውሃ ከማር ጋር። ከባሰ ተመልሳችሁ ኑ።»",
    },
    {
      en: "Selam gave Abdi a shiny star sticker. \"For the bravest patient today.\" Abdi stuck it on his white cap.",
      am: "ሰላም ለአብዲ የሚያብረቀርቅ የኮከብ ተለጣፊ ሰጠችው። «ለዛሬው ደፋር ታካሚ።» አብዲ በነጩ ኮፊያው ላይ ለጠፈው።",
    },
    {
      en: "At home, Abdi rested and sipped warm water with honey. Bit by bit, the cough went away.",
      am: "ቤት አብዲ አረፈ፤ ሞቅ ያለ ውሃ ከማር ጋር ፉት አለ። ቀስ በቀስ ሳሉ ለቀቀው።",
    },
    {
      en: "Then he played \"health post\" with Ayan. \"Say aaah!\" \"AAAH!\" \"Deep breath, you're brave!\"",
      am: "ከዚያ ከአያን ጋር «ጤና ኬላ» ተጫወተ። «አ በይ!» «አአአ!» «በጥልቅ ተንፍሺ፣ ጎበዝ ነሽ!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "What did Selam do to help Abdi? Which part did Abdi like best?",
        "What do you think happens at the health post? What would you like to ask?",
      ],
      am: [
        "ሰላም አብዲን ለመርዳት ምን አደረገች? አብዲ ከሁሉ የወደደው የትኛውን ነው?",
        "በጤና ኬላ ምን የሚሆን ይመስላችኋል? ምን መጠየቅ ትፈልጋላችሁ?",
      ],
    },
    activity: {
      en: "Before a visit, tell your child honestly and calmly what will happen (waiting, weighing, the thermometer, the stethoscope, \"say aaah\") and play \"health post\" at home with a pretend stethoscope. Health workers at the health post and health centre are there to help. Most coughs from colds get better with rest and drinks; warm water with honey can soothe a cough in children over one year (never give honey to babies under one). Go back straight away if breathing becomes fast or difficult.",
      am: "ከጉብኝቱ በፊት ምን እንደሚሆን (መጠበቅ፣ መመዘን፣ ቴርሞሜትር፣ ስቴቶስኮፕ፣ «አ በል») ለልጅዎ በእውነትና ረጋ ብለው ይንገሩት፤ ቤትም በሐሰት ስቴቶስኮፕ «ጤና ኬላ» ይጫወቱ። በጤና ኬላና በጤና ጣቢያ ያሉ ባለሙያዎች ለመርዳት ነው ያሉት። ከጉንፋን የሚመጣ አብዛኛው ሳል በእረፍትና በመጠጥ ይሻላል፤ ሞቅ ያለ ውሃ ከማር ጋር ከአንድ ዓመት በላይ ለሆኑ ልጆች ሳልን ሊያለሳልስ ይችላል (ከአንድ ዓመት በታች ለሆኑ ሕፃናት በፍጹም ማር አይስጡ)። መተንፈስ ከፈጠነ ወይም ከከበደ ወዲያውኑ ይመለሱ።",
    },
  },
};

export default story;
