import type { Story } from "../../../stories";

/*
  "Riddle Night" (Amharic Readers, level 5): እንቆቅልሽ. The lights go out in a storm, so Grandma
  teaches the children the old way to pass an evening: riddles. The asker says «እንቆቅልሽ!», the
  others answer «ምን አውቅልሽ!», and then the riddle comes. The riddles here are simple ones made
  for this story (not traditional riddles with fixed wording): a tortoise that carries her house,
  the moon that hides by day, a comb with teeth that never eats, injera with many "eyes" that
  never sees. Anbessa can't guess any at first, then learns to listen for clues in each word; at
  the end Gugu makes up his own riddle about himself. The join-in line is the riddle call and
  answer itself.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the call and answer («እንቆቅልሽ!» / «ምን አውቅልሽ!») and the wording of each riddle, which should
  sound like real riddles; the "eyes" of injera (የእንጀራ ዓይን) are its little holes.
*/
const story: Story = {
  id: "grandmas-riddle-night",
  course: "amharic-readers",
  pack: "story",
  title: { en: "Riddle Night", am: "የእንቆቅልሽ ምሽት" },
  category: "Fidel",
  ageBands: ["6-7", "8-9"],
  isFree: true,
  color: "#3B3F94",
  scene: "lib-grandmas-riddle-night",
  coverPage: 8,
  teaches: { words: ["እንቆቅልሽ", "ምን አውቅልሽ", "ኤሊ", "ጨረቃ", "ማበጠሪያ", "እንጀራ"] },
  pages: [
    {
      en: `Boom! goes the thunder, and the lights go out. Anbessa, Gugu and Tsehay huddle by Grandma's fire. "No lights, no books," groans Gugu. "What can we do?"`,
      am: "ዱብ! ብሎ ነጎድጓድ ጮኸ፤ መብራቱም ጠፋ። አንበሳ፣ ጉጉና ፀሐይ ከአያቴ እሳት አጠገብ ተጠጋጉ። «መብራት የለም፣ መጽሐፍ የለም» ብሎ አጉረመረመ ጉጉ። «ምን እናድርግ?»",
    },
    {
      en: `"When I was little," says Grandma, "we played riddles in the dark. I say «እንቆቅልሽ!» and you answer «ምን አውቅልሽ!». Then I ask, and you guess." እንቆቅልሽ! ምን አውቅልሽ!`,
      am: "«እኔ ትንሽ ሳለሁ» አለች አያቴ፣ «በጨለማ እንቆቅልሽ እንጫወት ነበር። እኔ ‹እንቆቅልሽ!› ስል እናንተ ‹ምን አውቅልሽ!› ትላላችሁ። ከዚያ እጠይቃለሁ፤ እናንተ ትገምታላችሁ።» እንቆቅልሽ! ምን አውቅልሽ!",
    },
    {
      en: `"እንቆቅልሽ!" "ምን አውቅልሽ!" "She carries her house on her back, and walks very, very slowly. Who is she?" Anbessa guesses, "A donkey?" Grandma shakes her head.`,
      am: "«እንቆቅልሽ!» «ምን አውቅልሽ!» «ቤቷን በጀርባዋ ተሸክማ በጣም፣ በጣም ቀስ ብላ ትሄዳለች። ማን ናት?» አንበሳ «አህያ?» ብሎ ገመተ። አያቴ ራሷን ነቀነቀች።",
    },
    {
      en: `"Listen to every word," says Grandma. "House on her back… very slowly…" Tsehay claps. "ኤሊ! A tortoise!" "Yes!" Each word in a riddle is a little clue.`,
      am: "«እያንዳንዱን ቃል አዳምጡ» አለች አያቴ። «ቤቷ በጀርባዋ… በጣም ቀስ ብላ…» ፀሐይ አጨበጨበች። «ኤሊ!» «አዎ!» በእንቆቅልሽ ውስጥ ያለ እያንዳንዱ ቃል ትንሽ ፍንጭ ነው።",
    },
    {
      en: `"እንቆቅልሽ!" "ምን አውቅልሽ!" "She hides all day, and comes out at night. Sometimes she is round, sometimes thin like a smile." Gugu looks out of the window at the clouds…`,
      am: "«እንቆቅልሽ!» «ምን አውቅልሽ!» «ቀኑን ሙሉ ትደበቃለች፤ ማታ ትወጣለች። አንዳንዴ ክብ ናት፤ አንዳንዴ እንደ ፈገግታ ቀጭን።» ጉጉ በመስኮት ደመናዎቹን ተመለከተ…",
    },
    {
      en: `Just then the clouds part, and there she is, thin as a smile. "ጨረቃ! The moon!" shouts Gugu. "The sky gave you a clue," laughs Grandma. እንቆቅልሽ! ምን አውቅልሽ!`,
      am: "ልክ በዚያን ጊዜ ደመናዎቹ ተከፈቱ፤ ይኸው እንደ ፈገግታ ቀጭን ሆና። «ጨረቃ!» ብሎ ጮኸ ጉጉ። «ሰማዩ ፍንጭ ሰጠህ» ብላ ሳቀች አያቴ። እንቆቅልሽ! ምን አውቅልሽ!",
    },
    {
      en: `"እንቆቅልሽ!" "ምን አውቅልሽ!" "It has many teeth, but it never eats. Every morning it goes through your hair." Anbessa thinks hard. Teeth… hair… morning…`,
      am: "«እንቆቅልሽ!» «ምን አውቅልሽ!» «ብዙ ጥርስ አለው፤ ግን ፈጽሞ አይበላም። በየጧቱ በጠጉራችሁ ውስጥ ያልፋል።» አንበሳ በደንብ አሰበ። ጥርስ… ጠጉር… ጧት…",
    },
    {
      en: `"ማበጠሪያ! A comb!" shouts Anbessa, and he runs his paw through his messy mane. Everyone laughs. "My first riddle!" he says proudly. እንቆቅልሽ! ምን አውቅልሽ!`,
      am: "«ማበጠሪያ!» ብሎ ጮኸ አንበሳ፤ የተጨማደደውን ጋሹን በእጁ አበጠረ። ሁሉም ሳቁ። «የመጀመሪያ እንቆቅልሼ!» አለ በኩራት። እንቆቅልሽ! ምን አውቅልሽ!",
    },
    {
      en: `"Now a hard one. እንቆቅልሽ!" "ምን አውቅልሽ!" "She has hundreds of eyes, but she can't see a thing. We eat her every day." The children look at each other. Eyes? Eat?`,
      am: "«አሁን ከባድ። እንቆቅልሽ!» «ምን አውቅልሽ!» «በመቶ የሚቆጠሩ ዓይኖች አሏት፤ ግን ምንም አታይም። በየቀኑ እንበላታለን።» ልጆቹ እርስ በርሳቸው ተያዩ። ዓይን? መብላት?",
    },
    {
      en: `Tsehay looks at the basket by the fire, and at the little holes in the bread inside. "Injera! Injera has eyes!" "ጎበዝ!" says Grandma. "The little holes in injera are called its eyes."`,
      am: "ፀሐይ ከእሳቱ አጠገብ ያለውን መሶብና በውስጡ ያለውን እንጀራ ትንንሽ ቀዳዳዎች ተመለከተች። «እንጀራ! እንጀራ ዓይን አለው!» «ጎበዝ!» አለች አያቴ። «የእንጀራ ትንንሽ ቀዳዳዎች ዓይን ይባላሉ።»",
    },
    {
      en: `"My turn!" says Gugu. "እንቆቅልሽ!" "ምን አውቅልሽ!" "He has a red heart on his chest, he loves riddles, and he's sitting right here!" Everyone shouts, "Gugu!"`,
      am: "«የእኔ ተራ!» አለ ጉጉ። «እንቆቅልሽ!» «ምን አውቅልሽ!» «ደረቱ ላይ ቀይ ልብ አለው፤ እንቆቅልሽ ይወዳል፤ ደግሞም እዚሁ ተቀምጧል!» ሁሉም «ጉጉ!» ብለው ጮኹ።",
    },
    {
      en: `When the lights come back on, nobody notices. They are still making riddles for each other: about the cat, the coffee pot, and Lali. እንቆቅልሽ! ምን አውቅልሽ!`,
      am: "መብራቱ ሲመለስ ማንም አላስተዋለም። አሁንም እርስ በርሳቸው እንቆቅልሽ እየሠሩ ነበር፦ ስለ ድመቷ፣ ስለ ጀበናውና ስለ ላሊ። እንቆቅልሽ! ምን አውቅልሽ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Which word in the tortoise riddle was the best clue?", "Can you make up a riddle about something in this room?"],
      am: ["በኤሊው እንቆቅልሽ ውስጥ ምርጡ ፍንጭ የትኛው ቃል ነበር?", "በዚህ ክፍል ውስጥ ስላለ ነገር እንቆቅልሽ መሥራት ትችላላችሁ?"],
    },
    activity: {
      en: "Play riddles the traditional way after dinner: «እንቆቅልሽ!» «ምን አውቅልሽ!». Take turns. Help your child make a riddle with two or three clues (what it looks like, what it does, where it lives).",
      am: "ከእራት በኋላ እንቆቅልሽን በባህሉ መንገድ ተጫወቱ፦ «እንቆቅልሽ!» «ምን አውቅልሽ!»። ተራ በተራ። ልጃችሁ ሁለት ወይም ሦስት ፍንጮች ያሉት እንቆቅልሽ እንዲሠራ እርዱት (ምን እንደሚመስል፣ ምን እንደሚሠራ፣ የት እንደሚኖር)።",
    },
  },
};

export default story;
