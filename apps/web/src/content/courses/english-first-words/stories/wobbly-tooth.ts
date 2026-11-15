import type { Story } from "../../../stories";

/*
  "Tsehay's Wobbly Tooth" (level 4: the sounds t, r, s).
  Tsehay's front tooth (‘t’) is wobbly. She can't bite the round red tomato (‘r’), and at English
  Club she won't smile (‘s’) for the photo: when the tooth comes out there will be a hole, and
  everyone will laugh. Then, crunching Gugu's sugarcane, plop! Out it comes. She runs and hides
  behind the tree. Looking at her face in the water bowl, she works it out: a tiny white tip is
  already peeking through. The gap is a door for her new big tooth; it means she is growing.
  So she smiles the biggest smile of all, and Gugu shows her his own gap.
  Join-in line: "Wiggle, wiggle, wobble, wobble, little tooth!"

  English taught: the sounds ‘t’, ‘r’, ‘s’ and tooth, tomato, red, round, run, ribbon, smile,
  sugarcane, sun.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ውዝ፣ ውዝ፣ ንቅንቅ፣ ንቅንቅ፣ ትንሽ ጥርስ!» and «የሸንኮራ አገዳ» for sugarcane.
*/
const story: Story = {
  id: "wobbly-tooth",
  course: "english-first-words",
  pack: "story",
  title: { en: "Tsehay's Wobbly Tooth", am: "የፀሐይ የሚነቃነቅ ጥርስ" },
  category: "English",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#E8607A",
  scene: "lib-wobbly-tooth",
  coverPage: 9,
  teaches: { words: ["t", "r", "s", "tooth", "tomato", "red", "round", "run", "ribbon", "smile", "sugarcane", "sun"] },
  pages: [
    {
      en: 'Tsehay\'s front tooth was wobbly. She pushed it with her tongue. Wiggle, wiggle, wobble, wobble, little tooth! "‘t’, ‘t’, TOOTH!" buzzed Lali.',
      am: 'የፀሐይ የፊት ጥርስ ይነቃነቅ ነበር። በምላሷ ገፋችው። ውዝ፣ ውዝ፣ ንቅንቅ፣ ንቅንቅ፣ ትንሽ ጥርስ! «‘t’፣ ‘t’፣ TOOTH!» አለች ላሊ።',
    },
    {
      en: 'At lunch, Mama gave her a round, red tomato. Tsehay couldn\'t bite it! "‘r’, ‘r’, round! ‘r’, ‘r’, red!" Mama cut it into tiny pieces.',
      am: 'በምሳ ሰዓት እማማ ክብ ቀይ ቲማቲም ሰጠቻት። ፀሐይ መንከስ አልቻለችም! «‘r’፣ ‘r’፣ round (ክብ)! ‘r’፣ ‘r’፣ red (ቀይ)!» እማማ በትንንሹ ቆራረጠችላት።',
    },
    {
      en: 'Tsehay was worried. "When my tooth comes out, there will be a hole," she said. "Everyone will laugh at me." Wiggle, wiggle, wobble, wobble, little tooth!',
      am: 'ፀሐይ ተጨነቀች። «ጥርሴ ሲወልቅ ቀዳዳ ይኖራል» አለች። «ሁሉም ይስቁብኛል።» ውዝ፣ ውዝ፣ ንቅንቅ፣ ንቅንቅ፣ ትንሽ ጥርስ!',
    },
    {
      en: 'At English Club, Teacher Meron held up her phone for a photo. "Everybody smile! ‘s’, ‘s’, SMILE!" Tsehay pressed her lips tight. Mm-mm.',
      am: 'በእንግሊዝኛ ክበብ መምህርት መሮን ፎቶ ለማንሣት ስልኳን ከፍ አደረገች። «ሁላችሁም ፈገግ በሉ! ‘s’፣ ‘s’፣ SMILE!» ፀሐይ ከንፈሮቿን አጥብቃ ገጠመች። እምም።',
    },
    {
      en: 'After the photo, Gugu shared a stick of sweet sugarcane. "‘s’, ‘s’, sugarcane!" Tsehay took a big crunch… PLOP! "My TOOTH!"',
      am: 'ከፎቶው በኋላ ጉጉ ጣፋጭ የሸንኮራ አገዳ አካፈለ። «‘s’፣ ‘s’፣ sugarcane!» ፀሐይ በደንብ ነከሰች… ዱብ! «ጥርሴ! My TOOTH!»',
    },
    {
      en: 'Tsehay grabbed her tooth and ran. "‘r’, ‘r’, RUN!" She hid behind the big tree and covered her mouth with both hands.',
      am: 'ፀሐይ ጥርሷን ይዛ ሮጠች። «‘r’፣ ‘r’፣ RUN!» ከትልቁ ዛፍ ጀርባ ተደበቀችና አፏን በሁለቱም እጆቿ ሸፈነች።',
    },
    {
      en: 'Anbessa found her. "What\'s wrong, Tsehay?" "I have a hole," she whispered. "I look silly."',
      am: 'አንበሳ አገኛት። «ምን ሆንሽ፣ ፀሐይ?» «ቀዳዳ አለኝ» አለች በሹክሹክታ። «አስቂኝ መስያለሁ።»',
    },
    {
      en: "Tsehay looked at her face in the water bowl by the tree. She opened her mouth, just a little. And there in the gap, she saw a tiny white tip, peeking through.",
      am: "ፀሐይ በዛፉ አጠገብ ባለው የውሃ ሳህን ውስጥ ፊቷን ተመለከተች። አፏን ትንሽ ከፈተች። በክፍተቱ ውስጥም ትንሽ ነጭ ጫፍ ብቅ ብሎ አየች።",
    },
    {
      en: '"A new tooth is coming!" said Tsehay. "The gap isn\'t a hole. It\'s a door for my new big tooth! It means I\'m growing."',
      am: '«አዲስ ጥርስ እየመጣ ነው!» አለች ፀሐይ። «ክፍተቱ ቀዳዳ አይደለም። ለአዲሱ ትልቅ ጥርሴ በር ነው! እያደግሁ ነው ማለት ነው።»',
    },
    {
      en: 'Tsehay came out from behind the tree and smiled the biggest smile of all. "‘s’, ‘s’, SMILE!" Gugu smiled back. He had a gap too!',
      am: 'ፀሐይ ከዛፉ ጀርባ ወጥታ ከሁሉም የሚበልጥ ፈገግታ ፈገግ አለች። «‘s’፣ ‘s’፣ SMILE!» ጉጉ መልሶ ፈገግ አለ። እሱም ክፍተት ነበረው!',
    },
    {
      en: 'Teacher Meron took the photo again: everyone in the sun, smiling. At home, Mama put the tooth in a little tin and tied it with a red ribbon.',
      am: 'መምህርት መሮን ፎቶውን እንደገና አነሣች፦ ሁሉም በፀሐይ ብርሃን፣ ፈገግ ብለው። ቤት ውስጥ እማማ ጥርሱን በትንሽ ቆርቆሮ ውስጥ አስቀመጠችና በቀይ ሪባን አሰረችው።',
    },
    {
      en: '"‘t’ for tooth, ‘r’ for ribbon, ‘s’ for smile!" said Tsehay. Wiggle, wiggle, wobble, wobble, little tooth! What starts with ‘t’, ‘r’ or ‘s’, {name}?',
      am: '«‘t’ ለ tooth፣ ‘r’ ለ ribbon፣ ‘s’ ለ smile!» አለች ፀሐይ። ውዝ፣ ውዝ፣ ንቅንቅ፣ ንቅንቅ፣ ትንሽ ጥርስ! {name}፣ በ‘t’፣ ‘r’ ወይም ‘s’ የሚጀምር ምን አለ?',
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why didn't Tsehay want to smile? What helped her feel better?", "What words can you think of that start with ‘t’, ‘r’ or ‘s’?"],
      am: ["ፀሐይ ለምን ፈገግ ማለት አልፈለገችም? ምን ረዳት?", "በ‘t’፣ ‘r’ ወይም ‘s’ የሚጀምሩ ምን ቃላትን ታውቃላችሁ?"],
    },
    activity: {
      en: 'Make a "smile book": draw your family smiling and label it with ‘s’ words (smile, sun, sock). The sounds: ‘t’ as in tooth (a tap of the tongue, like ት), ‘r’ as in red (the tongue does not touch the top of the mouth, softer than the rolled ር), ‘s’ as in smile (a long hiss, like ስ).',
      am: 'የ«ፈገግታ መጽሐፍ» ሥሩ፦ ቤተሰባችሁን ፈገግ ብለው ሣሉና በ‘s’ ቃላት ሰይሙት (smile፣ sun፣ sock)። ድምፆቹ፦ ‘t’ እንደ tooth (የምላስ ትንሽ መምታት፣ እንደ ት)፣ ‘r’ እንደ red (ምላስ ላይኛውን አይነካም፤ ከሚንከባለለው ር ለስለስ ያለ)፣ ‘s’ እንደ smile (ረጅም ስስስ፣ እንደ ስ)።',
    },
  },
};

export default story;
