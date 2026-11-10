import type { Story } from "../../../stories";

/*
  "The Note Detectives" (Amharic Readers, level 2): reading for meaning with the question words
  ማን? ምን? የት? መቼ? ለምን? (who, what, where, when, why). Grandma's red hen is missing. Anbessa
  and Ayan become detectives; friends have left short notes, and each note answers one question:
  when (ጧት), where (ጓሮ), what (ገለባ, straw). Put together, the answers lead to the hen on a
  secret straw nest, and the "why": she is sitting on eggs. About three weeks later (chicken eggs
  hatch in about 21 days), seven chicks. The join-in line is "Who? What? Where? When? The words
  will tell!" (ማን? ምን? የት? መቼ? ቃላቱ ይነግሩናል!).

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line, «መርማሪዎች» for detectives (page 1), «ገለባ» for straw and «ዕንጨት ክምር» for
  the woodpile (pages 4–6).
*/
const story: Story = {
  id: "the-note-detectives",
  course: "amharic-readers",
  pack: "story",
  title: { en: "The Note Detectives", am: "ማስታወሻ መርማሪዎቹ" },
  category: "Fidel",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#B0442A",
  scene: "lib-the-note-detectives",
  coverPage: 7,
  teaches: { words: ["ማን?", "ምን?", "የት?", "መቼ?", "ለምን?"] },
  pages: [
    {
      en: `One morning Grandma looks into the hen house. The red hen's basket is empty! "Where is my red hen?" she cries. "She has never gone away before."`,
      am: "አንድ ቀን ጧት አያቴ የዶሮ ቤቱን ተመለከተች። የቀይዋ ዶሮ ቅርጫት ባዶ ነው! «ቀይዋ ዶሮዬ የት ሄደች?» አለች። «ከዚህ በፊት ሄዳ አታውቅም።»",
    },
    {
      en: `"We'll find her!" say Anbessa and Ayan. "We'll be detectives. Detectives ask questions: ማን? ምን? የት? መቼ? Who? What? Where? When?" Who? What? Where? When? The words will tell!`,
      am: "«እኛ እናገኛታለን!» አሉ አንበሳና አያን። «መርማሪዎች እንሆናለን። መርማሪዎች ይጠይቃሉ፦ ማን? ምን? የት? መቼ?» ማን? ምን? የት? መቼ? ቃላቱ ይነግሩናል!",
    },
    {
      en: `On the gate they find a note from Tsehay: ዶሮዋን ጧት አየኋት። "I saw the hen in the morning." "Which question does it answer?" asks Ayan. "መቼ? When? ጧት: in the morning!"`,
      am: "በበሩ ላይ ከፀሐይ የተጻፈ ማስታወሻ አገኙ፦ «ዶሮዋን ጧት አየኋት።» «ይሄ የትኛውን ጥያቄ ይመልሳል?» አለች አያን። «መቼ? ጧት!»",
    },
    {
      en: `By the well there is a second note, from Gugu: ዶሮዋ ወደ ጓሮ ሄደች። "The hen went to the back yard." "የት? Where?" says Anbessa. "ጓሮ, the back yard!"`,
      am: "ከጉድጓዱ አጠገብ ሁለተኛ ማስታወሻ አለ፤ ከጉጉ፦ «ዶሮዋ ወደ ጓሮ ሄደች።» «የት?» አለ አንበሳ። «ጓሮ!»",
    },
    {
      en: `In the back yard, a third note is tied to the fence, from Haben: ዶሮዋ ገለባ ተሸከመች። "The hen carried straw." "ምን? What? ገለባ, straw," reads Ayan. "But why would a hen carry straw?"`,
      am: "በጓሮው ውስጥ ሦስተኛ ማስታወሻ ከአጥሩ ጋር ታስሯል፤ ከሐበን፦ «ዶሮዋ ገለባ ተሸከመች።» «ምን? ገለባ» ብላ አነበበች አያን። «ግን ዶሮ ለምን ገለባ ትሸከማለች?»",
    },
    {
      en: `Anbessa lays the three notes side by side and reads them again. In the morning… to the back yard… carrying straw… "She's making something!" Who? What? Where? When? The words will tell!`,
      am: "አንበሳ ሦስቱን ማስታወሻዎች ጎን ለጎን አስቀምጦ እንደገና አነበባቸው። ጧት… ወደ ጓሮ… ገለባ ተሸክማ… «የሆነ ነገር እየሠራች ነው!» ማን? ምን? የት? መቼ? ቃላቱ ይነግሩናል!",
    },
    {
      en: `They tiptoe round the back yard. Behind the woodpile they hear a soft, sleepy clucking. Ayan peeks round the corner, very, very slowly.`,
      am: "በጓሮው ውስጥ ቀስ ብለው በእግር ጣቶቻቸው ዞሩ። ከዕንጨት ክምሩ ጀርባ ለስላሳ፣ እንቅልፍ የሚመስል የዶሮ ድምፅ ሰሙ። አያን በጣም፣ በጣም ቀስ ብላ ጥጉን አጮለቀች።",
    },
    {
      en: `There she is: the red hen, sitting on a round nest of straw! "Found her!" whisper the detectives. The hen just blinks at them and stays very still.`,
      am: "ይኸው እዚያ አለች፦ ቀይዋ ዶሮ ከገለባ በተሠራ ክብ ጎጆ ላይ ተቀምጣለች! «አገኘናት!» አሉ መርማሪዎቹ በሹክሹክታ። ዶሮዋ ዓይኗን ብቻ አርገበገበች፤ ጸጥ ብላ ተቀመጠች።",
    },
    {
      en: `Grandma comes and smiles. "Now I know ለምን, why! She is sitting on her eggs. She wanted a quiet, secret place." Why? The answer was in all the notes together.`,
      am: "አያቴ መጥታ ፈገግ አለች። «አሁን ለምን እንደሆነ አወቅሁ! እንቁላሎቿ ላይ ተቀምጣለች። ጸጥ ያለ፣ ምሥጢር ቦታ ፈልጋ ነው።» ለምን? መልሱ በሁሉም ማስታወሻዎች ውስጥ በአንድ ላይ ነበር።",
    },
    {
      en: `"When will the chicks come out?" asks Ayan. "In about three weeks," says Grandma. Every day the detectives bring the hen water and grain, and wait.`,
      am: "«ጫጩቶቹ መቼ ይወጣሉ?» አለች አያን። «በሦስት ሳምንት ገደማ» አለች አያቴ። መርማሪዎቹ በየቀኑ ለዶሮዋ ውሃና እህል እያመጡ ጠበቁ።",
    },
    {
      en: `Then one morning: peep, peep, peep! Out come one, two, three… seven fluffy yellow chicks! The red hen proudly leads them out of the straw.`,
      am: "ከዚያ አንድ ቀን ጧት፦ ጪው፣ ጪው፣ ጪው! አንድ፣ ሁለት፣ ሦስት… ሰባት ለስላሳ ቢጫ ጫጩቶች ወጡ! ቀይዋ ዶሮ በኩራት ከገለባው አውጥታ መራቻቸው።",
    },
    {
      en: `Ayan writes the last note herself and pins it on the gate for everyone to read: ዶሮዋ ሰባት ጫጩቶች አሏት! "The hen has seven chicks!" Who? What? Where? When? The words will tell!`,
      am: "አያን የመጨረሻውን ማስታወሻ ራሷ ጻፈችና ሁሉም እንዲያነቡት በበሩ ላይ ሰካችው፦ «ዶሮዋ ሰባት ጫጩቶች አሏት!» ማን? ምን? የት? መቼ? ቃላቱ ይነግሩናል!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Which note told the detectives WHERE the hen went? Which one told them WHEN?", "Why did the hen hide? How did the detectives work it out?"],
      am: ["ዶሮዋ የት እንደሄደች ለመርማሪዎቹ የነገራቸው የትኛው ማስታወሻ ነው? መቼ እንደሆነስ?", "ዶሮዋ ለምን ተደበቀች? መርማሪዎቹ እንዴት አወቁት?"],
    },
    activity: {
      en: "Hide a small toy and write three short clue notes (for example: ጧት ነበር። · ወደ ማብሰያ ቤት ሄደ። · ከወንበሩ ሥር ነው።). Your child reads each note, says which question it answers (when? where?), and finds the toy.",
      am: "ትንሽ አሻንጉሊት ደብቁና ሦስት አጫጭር የፍንጭ ማስታወሻዎችን ጻፉ (ለምሳሌ፦ ጧት ነበር። · ወደ ማብሰያ ቤት ሄደ። · ከወንበሩ ሥር ነው።)። ልጃችሁ እያንዳንዱን ማስታወሻ አንብቦ የትኛውን ጥያቄ (መቼ? የት?) እንደሚመልስ ይናገርና አሻንጉሊቱን ያግኝ።",
    },
  },
};

export default story;
