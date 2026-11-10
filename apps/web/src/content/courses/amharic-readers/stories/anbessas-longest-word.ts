import type { Story } from "../../../stories";

/*
  "The Longest Word" (Amharic Readers, level 1): reading long words in parts, then smoothly.
  Anbessa can read short words, but the sign over the library door (ቤተ መጻሕፍት) stops him.
  Grandma: you eat a whole injera bite by bite; read a long word piece by piece, then all
  together. At the library's story hour, Teacher Meron's long-word cards (ቢራቢሮ, ጠረጴዛ,
  ትምህርት ቤት, እንቁራሪቶች) decide who chooses the story; Anbessa helps Gugu, who rushed. The
  join-in line is "Piece by piece, then all together!" (ቁራሽ በቁራሽ፣ ከዚያ በአንድ ላይ!).

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line, «ጉርሻ በጉርሻ» (page 2), Gugu's made-up «ትምርቤ» (page 7) and how the parts
  of each word are split (ትም… ህርት… ቤት, እን… ቁ… ራ… ሪ… ቶች).
*/
const story: Story = {
  id: "anbessas-longest-word",
  course: "amharic-readers",
  pack: "story",
  title: { en: "The Longest Word", am: "ረጅሙ ቃል" },
  category: "Fidel",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#C2410C",
  scene: "lib-anbessas-longest-word",
  coverPage: 9,
  teaches: { words: ["ቤተ መጻሕፍት", "ቢራቢሮ", "ጠረጴዛ", "ትምህርት ቤት", "እንቁራሪቶች"] },
  pages: [
    {
      en: `Anbessa can read now! He reads everything he sees: ቡና on the coffee tin, ዳቦ on the bread basket, ቤት on Grandma's door. "I can read every word!" he says.`,
      am: "አንበሳ አሁን ማንበብ ይችላል! ያየውን ሁሉ ያነባል፦ በቡና ቆርቆሮው ላይ «ቡና»፣ በዳቦ ቅርጫቱ ላይ «ዳቦ»፣ በአያቴ በር ላይ «ቤት»። «ሁሉንም ቃል ማንበብ እችላለሁ!» አለ።",
    },
    {
      en: `One morning he walks to town with Grandma. Over a big blue door there are very long words. ቤ… ተ… መ… ጻ… Anbessa stops. The letters go on and on! "That's too long for me," he sighs.`,
      am: "አንድ ቀን ጧት ከአያቴ ጋር ወደ ከተማ ሄደ። በአንድ ትልቅ ሰማያዊ በር ላይ በጣም ረጃጅም ቃላት ተጽፈዋል። ቤ… ተ… መ… ጻ… አንበሳ ቆመ። ፊደሎቹ አያልቁም! «ይሄ ለእኔ በጣም ረጅም ነው» ብሎ አዘነ።",
    },
    {
      en: `Grandma smiles. "How do you eat a whole injera? One bite at a time! A long word is the same. Read it piece by piece, then all together." Piece by piece, then all together!`,
      am: "አያቴ ፈገግ አለች። «አንድ ሙሉ እንጀራ እንዴት ትበላለህ? ጉርሻ በጉርሻ! ረጅም ቃልም እንደዚሁ ነው። ቁራሽ በቁራሽ አንብበው፣ ከዚያ በአንድ ላይ።» ቁራሽ በቁራሽ፣ ከዚያ በአንድ ላይ!",
    },
    {
      en: `Anbessa tries. "ቤ-ተ… ቤተ. መ-ጻ… ሕ-ፍት… መጻሕፍት." Then all together: "ቤተ መጻሕፍት!" A library! "ቤተ means house," says Grandma, "and መጻሕፍት means books. A house of books!"`,
      am: "አንበሳ ሞከረ። «ቤ-ተ… ቤተ። መ-ጻ… ሕ-ፍት… መጻሕፍት።» ከዚያ በአንድ ላይ፦ «ቤተ መጻሕፍት!» «ቤተ ማለት ቤት ነው» አለች አያቴ፤ «መጻሕፍት ደግሞ ብዙ መጽሐፍ ማለት ነው። የመጻሕፍት ቤት!»",
    },
    {
      en: `Inside it is cool and quiet. Teacher Meron is there. "It's story hour," she says. "Whoever reads a long word from these cards can choose today's story!"`,
      am: "ውስጡ ቀዝቀዝ ያለና ጸጥ ያለ ነው። መምህርት መሮን እዚያ ነበሩ። «የታሪክ ሰዓት ነው» አሉ። «ከእነዚህ ካርዶች አንድ ረጅም ቃል ያነበበ፣ የዛሬውን ታሪክ ይመርጣል!»",
    },
    {
      en: `Anbessa picks the first card: ቢራቢሮ. Piece by piece: "ቢ… ራ… ቢ… ሮ…" All together: "ቢራቢሮ!" A butterfly! One flutters past the window, as if it heard its name.`,
      am: "አንበሳ የመጀመሪያውን ካርድ መረጠ፦ ቢራቢሮ። ቁራሽ በቁራሽ፦ «ቢ… ራ… ቢ… ሮ…» በአንድ ላይ፦ «ቢራቢሮ!» ስሟን የሰማች ይመስል አንዲት ቢራቢሮ በመስኮቱ አጠገብ በረረች።",
    },
    {
      en: `The next card says ጠረጴዛ. "ጠ… ረ… ጴ… ዛ… ጠረጴዛ!" A table! Anbessa knocks on the table: knock, knock. Piece by piece, then all together!`,
      am: "ቀጣዩ ካርድ ጠረጴዛ ይላል። «ጠ… ረ… ጴ… ዛ… ጠረጴዛ!» አንበሳ ጠረጴዛውን ኳ፣ ኳ አንኳኳ። ቁራሽ በቁራሽ፣ ከዚያ በአንድ ላይ!",
    },
    {
      en: `Gugu wants a turn too. He grabs a card and reads it super fast: "ትምርቤ!" Everyone giggles, and so does Gugu. "That's not a word!" he laughs. "What does it say?"`,
      am: "ጉጉም ተራ ፈለገ። አንድ ካርድ አንሥቶ በጣም በፍጥነት አነበበው፦ «ትምርቤ!» ሁሉም ሳቁ፤ ጉጉም ሳቀ። «ይሄ ቃል አይደለም!» አለ። «ምን ይላል?»",
    },
    {
      en: `"Like injera, Gugu," whispers Anbessa. "Piece by piece." They read it together: "ትም… ህርት… ቤት." Then all together: "ትምህርት ቤት!" School! "I go there every day!" says Gugu proudly.`,
      am: "«እንደ እንጀራው፣ ጉጉ» አለ አንበሳ በሹክሹክታ። «ቁራሽ በቁራሽ።» አብረው አነበቡ፦ «ትም… ህርት… ቤት።» ከዚያ በአንድ ላይ፦ «ትምህርት ቤት!» «እዚያ በየቀኑ እሄዳለሁ!» አለ ጉጉ በኩራት።",
    },
    {
      en: `The last card hangs at the very top. It is the longest of all: እንቁራሪቶች. Anbessa takes a big breath. "እን… ቁ… ራ… ሪ… ቶች…" Then all together: "እንቁራሪቶች!" Frogs! Everyone claps.`,
      am: "የመጨረሻው ካርድ ከሁሉም በላይ ተሰቅሏል። ከሁሉም ረጅሙ ነው፦ እንቁራሪቶች። አንበሳ በረጅሙ ተነፈሰ። «እን… ቁ… ራ… ሪ… ቶች…» ከዚያ በአንድ ላይ፦ «እንቁራሪቶች!» ሁሉም አጨበጨቡ።",
    },
    {
      en: `So Anbessa chooses the story. Of course he chooses a book about frogs! Teacher Meron reads it, and every time a long word comes, the children read it with her, piece by piece.`,
      am: "ስለዚህ አንበሳ ታሪኩን መረጠ። እንዴታ፣ ስለ እንቁራሪቶች የሚያወራ መጽሐፍ መረጠ! መምህርት መሮን አነበቡት፤ ረጅም ቃል በመጣ ቁጥር ልጆቹ ከእሳቸው ጋር ቁራሽ በቁራሽ አነበቡ።",
    },
    {
      en: `On the way home Anbessa reads every long sign: ምግብ ቤት, ፖስታ ቤት… At home, Tsehay has written on the door: እንኳን ደህና መጣህ! Welcome home! He reads it in one breath. Piece by piece, then all together!`,
      am: "ወደ ቤት ሲመለሱ አንበሳ ረጃጅሞቹን ጽሑፎች ሁሉ አነበበ፦ ምግብ ቤት፣ ፖስታ ቤት… ቤት ሲደርሱ ፀሐይ በበሩ ላይ ጽፋለች፦ እንኳን ደህና መጣህ! አንበሳ በአንድ ትንፋሽ አነበበው። ቁራሽ በቁራሽ፣ ከዚያ በአንድ ላይ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Find a long word on a sign or a packet at home. Can you read it piece by piece, then all together?", "Gugu read too fast and made a funny word. What helped him read it right?"],
      am: ["በቤት ውስጥ በአንድ ጽሑፍ ወይም በአንድ ፓኬት ላይ ረጅም ቃል ፈልጉ። ቁራሽ በቁራሽ፣ ከዚያ በአንድ ላይ ልታነቡት ትችላላችሁ?", "ጉጉ በጣም ፈጥኖ አንብቦ አስቂኝ ቃል ሠራ። በትክክል እንዲያነብ የረዳው ምንድን ነው?"],
    },
    activity: {
      en: "Write three long words on strips of paper (ቢራቢሮ, ጠረጴዛ, እንቁራሪት). Cut each one into its parts and mix them up. Your child puts each word back together, reads it slowly piece by piece, then smoothly in one go.",
      am: "ሦስት ረጃጅም ቃላትን በወረቀት ቁርጥራጮች ላይ ጻፉ (ቢራቢሮ፣ ጠረጴዛ፣ እንቁራሪት)። እያንዳንዱን ቃል ወደ ክፍሎቹ ቆርጣችሁ ደባልቁት። ልጃችሁ እያንዳንዱን ቃል መልሶ ገጣጥሞ መጀመሪያ ቁራሽ በቁራሽ ቀስ ብሎ፣ ከዚያ በአንድ ትንፋሽ ያንብበው።",
    },
  },
};

export default story;
