import type { Story } from "../../../stories";

/*
  "The Fire on the Mountain" (Amharic Readers, level 4): the well-known Ethiopian folktale of
  Arha and the far-away fire, read by Teacher Meron to the class as a ተረት. A rich man, Haptom,
  says nobody can stand all night on a cold mountain with no fire, and promises Arha, his servant,
  a house and a field if he can. Arha stands all night, warmed only by watching a shepherd's fire
  far across the valley. In the morning Haptom says the far fire warmed him, so he has lost, and
  the judges agree. Old Hailu invites Haptom and the judges to a feast, lets them smell the food
  cooking all evening but serves none: "If the smell of food can fill you, then a far fire can
  warm a man." They see their mistake, and Haptom keeps his promise.
  Retold for young children: the bet is a promise, nobody is unkind for long, and the class
  finds the story elements afterwards. The join-in line is "Can a far-away fire keep you warm?"
  (የሩቅ እሳት ያሞቃል?).

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line, the names (ሀፕቶም, ዓርሐ, ኃይሉ; in the best-known English telling they are
  Haptom Hasei, Arha and Hailu), «ዳኞች» for the judges and «ግብዣ» for the feast.
*/
const story: Story = {
  id: "arha-and-the-far-fire",
  course: "amharic-readers",
  pack: "story",
  title: { en: "The Fire on the Mountain", am: "በተራራው ላይ ያለው እሳት" },
  category: "Fidel",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#3A4A8A",
  scene: "lib-arha-and-the-far-fire",
  coverPage: 4,
  teaches: { words: ["ተረት", "ገጸ ባሕርያት", "መቼት", "ችግር", "መጨረሻ", "ቃል ኪዳን"] },
  pages: [
    {
      en: `Teacher Meron holds up a book. "ተረት ተረት!" "የመሠረት!" the class answers. "This tale is about a cold mountain, a far-away fire and a very clever old man."`,
      am: "መምህርት መሮን አንድ መጽሐፍ ከፍ አድርገው አሳዩ። «ተረት ተረት!» «የመሠረት!» ብሎ መለሰ ክፍሉ። «ይህ ተረት ስለ ቀዝቃዛ ተራራ፣ ስለ ሩቅ እሳትና ስለ አንድ በጣም ብልህ ሽማግሌ ነው።»",
    },
    {
      en: `Long ago there lived a rich man called Haptom. One cold evening he said, "Nobody can stand all night on top of the mountain, with no blanket and no fire."`,
      am: "ከብዙ ዘመን በፊት ሀፕቶም የሚባል አንድ ሀብታም ሰው ይኖር ነበር። አንድ ቀዝቃዛ ምሽት «ማንም ሰው ያለ ብርድ ልብስና ያለ እሳት ሌሊቱን በሙሉ በተራራው ጫፍ ላይ መቆም አይችልም» አለ።",
    },
    {
      en: `His servant Arha said quietly, "I can." Haptom laughed. "If you do, I promise you a house and a field of your own." Arha's eyes shone. A house of his own!`,
      am: "አገልጋዩ ዓርሐ በቀስታ «እኔ እችላለሁ» አለ። ሀፕቶም ሳቀ። «ከቻልክ የራስህ ቤትና ማሳ እሰጥሃለሁ፤ ቃል እገባልሃለሁ።» የዓርሐ ዓይኖች አበሩ። የራሱ ቤት!",
    },
    {
      en: `So Arha climbed the mountain. The wind blew icy cold. His teeth chattered. His feet went numb. How would he ever last until morning?`,
      am: "ስለዚህ ዓርሐ ተራራውን ወጣ። ነፋሱ በረዶ እንደሚመስል ቀዘቀዘ። ጥርሶቹ ተንቀጫቀጩ። እግሮቹ ደነዘዙ። እስከ ጧት እንዴት ይቆያል?",
    },
    {
      en: `Then, far away across the valley, he saw a shepherd's fire, glowing orange in the dark. He kept his eyes on it all night long and thought about its warmth. Can a far-away fire keep you warm?`,
      am: "ከዚያ ከሸለቆው ማዶ፣ በጣም ሩቅ፣ በጨለማው ውስጥ ብርቱካናማ ሆኖ የሚያበራ የእረኛ እሳት አየ። ሌሊቱን በሙሉ ዓይኑን ከእሱ ላይ አላነሣም፤ ሙቀቱንም አሰበ። የሩቅ እሳት ያሞቃል?",
    },
    {
      en: `In the morning Arha came down, stiff and tired but proud. "I did it!" Haptom frowned. "Did you see a fire?" "Only far, far away." "Then the fire warmed you. You lose!"`,
      am: "ጧት ዓርሐ ደክሞና ደርቆ፣ ግን ኮርቶ ወረደ። «ቻልኩት!» ሀፕቶም ፊቱን አጨፈገገ። «እሳት አይተሃል?» «በጣም ሩቅ ብቻ።» «እንግዲያው እሳቱ አሞቀህ። ተሸንፈሃል!»",
    },
    {
      en: `Arha went to the judges, but the judges agreed with Haptom. Arha walked away very sad. Can a far-away fire keep you warm? Of course not! But who would believe him?`,
      am: "ዓርሐ ወደ ዳኞቹ ሄደ፤ ዳኞቹ ግን ከሀፕቶም ጋር ተስማሙ። ዓርሐ በጣም አዝኖ ሄደ። የሩቅ እሳት ያሞቃል? በፍጹም! ግን ማን ያምነዋል?",
    },
    {
      en: `On the road he met old Hailu, who listened to the whole story. "Don't worry," said Hailu, stroking his beard. "I know what to do. Just wait and see."`,
      am: "በመንገድ ላይ ሽማግሌውን ኃይሉን አገኘ፤ እሳቸውም ታሪኩን በሙሉ አዳመጡ። «አትጨነቅ» አሉ ኃይሉ ጢማቸውን እየዳበሱ። «ምን እንደማደርግ አውቃለሁ። ጠብቅና እይ።»",
    },
    {
      en: `Hailu invited Haptom and the judges to a big feast. All evening, wonderful smells came from the kitchen: spicy wot, fresh injera, roasting coffee. But no food came to the table. Their tummies rumbled.`,
      am: "ኃይሉ ሀፕቶምንና ዳኞቹን ለትልቅ ግብዣ ጠሩ። ምሽቱን በሙሉ ከማብሰያ ቤቱ ግሩም ሽታዎች መጡ፦ የሚያቃጥል ወጥ፣ ትኩስ እንጀራ፣ የሚቆላ ቡና። ግን ምንም ምግብ ወደ ገበታው አልመጣም። ሆዳቸው ጮኸ።",
    },
    {
      en: `"Where is the food?" cried Haptom at last. "But you smelled it all evening," said Hailu. "If the smell of food can fill you, then a far-away fire can warm a man!"`,
      am: "በመጨረሻ ሀፕቶም «ምግቡ የት አለ?» ብሎ ጮኸ። «ምሽቱን በሙሉ አሸተታችሁት እኮ» አሉ ኃይሉ። «የምግብ ሽታ ካጠገበ፣ የሩቅ እሳትም ሰውን ያሞቃል!»",
    },
    {
      en: `Everyone was quiet. Then Haptom laughed at himself. "You are right, old man. I was wrong." He kept his promise: Arha got his house and his field. Then, at last, they all ate the feast together.`,
      am: "ሁሉም ጸጥ አሉ። ከዚያ ሀፕቶም በራሱ ሳቀ። «ትክክል ነዎት፣ አባቴ። ተሳስቼ ነበር።» ቃሉንም ጠበቀ፦ ዓርሐ ቤቱንና ማሳውን አገኘ። ከዚያ በመጨረሻ ሁሉም በአንድ ላይ ግብዣውን በሉ።",
    },
    {
      en: `"Characters?" asks Teacher Meron. "Arha, Haptom, the judges and Hailu!" "Setting?" "A cold mountain and a village." "Problem?" "Haptom didn't keep his promise." "Ending?" "Hailu's clever feast put it right!"`,
      am: "«ገጸ ባሕርያቱ?» ብለው ጠየቁ መምህርት መሮን። «ዓርሐ፣ ሀፕቶም፣ ዳኞቹና ኃይሉ!» «መቼቱ?» «ቀዝቃዛ ተራራና መንደር።» «ችግሩ?» «ሀፕቶም ቃሉን አልጠበቀም።» «መጨረሻው?» «የኃይሉ ብልህ ግብዣ አስተካከለው!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why did old Hailu cook food but not serve it?", "Was it fair when Haptom said the far fire warmed Arha? Why not?"],
      am: ["ሽማግሌው ኃይሉ ምግብ አብስለው ለምን አላቀረቡም?", "ሀፕቶም የሩቅ እሳት ዓርሐን አሞቀው ሲል ፍትሐዊ ነበር? ለምን አልነበረም?"],
    },
    activity: {
      en: "Retell the tale together in four parts, one sentence each: the beginning (the promise), the cold night, the unfair judges, Hailu's feast. Your child can draw each part and put the pictures in order.",
      am: "ተረቱን በአራት ክፍል፣ በእያንዳንዱ አንድ ዓረፍተ ነገር አብራችሁ ተርኩት፦ መጀመሪያው (ቃል ኪዳኑ)፣ ቀዝቃዛው ሌሊት፣ ፍትሐዊ ያልሆኑት ዳኞች፣ የኃይሉ ግብዣ። ልጃችሁ እያንዳንዱን ክፍል ሥሎ ሥዕሎቹን በቅደም ተከተል ያስቀምጣቸው።",
    },
  },
};

export default story;
