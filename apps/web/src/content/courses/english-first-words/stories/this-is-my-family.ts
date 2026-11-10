import type { Story } from "../../../stories";

/*
  "This Is My Family" (level 1: family words, "This is my …").
  Teacher Meron asks everyone to bring a picture of their family. Hawi's family (Mama, Grandpa
  Tolosa, Great-Grandma Bontu, Aunt Chaltu, Uncle Gemechu, the cousins) won't fit on her paper,
  and when she draws them tiny, nobody can see who is who. Under the big tree she has an idea:
  a family is like a tree, with a branch for everyone. Her family tree is the star of English
  Club, and then everyone shows theirs: Tsehay (mother, father, baby brother), Haben (father and
  big sisters), Ayan (mother, little brother, and a father who drives a truck far away), and
  Anbessa, who lives with his grandmother: "My family is small." Big or small, we love them all.
  Families of every shape, never one kind.
  Join-in line: "Big or small, we love them all!"

  English taught: family, mother, father, brother, sister, baby, grandmother, grandfather, aunt,
  uncle, cousins, me; "This is my …", "These are my …".

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ትልቅም ይሁን ትንሽ፣ ሁሉንም እንወዳቸዋለን!», «ቅድመ አያት» (great-grandmother), and «የቤተሰብ ዛፍ».
*/
const story: Story = {
  id: "this-is-my-family",
  course: "english-first-words",
  pack: "story",
  title: { en: "This Is My Family", am: "This Is My Family፦ ይህ ቤተሰቤ ነው" },
  category: "English",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#8A5AB8",
  scene: "lib-this-is-my-family",
  coverPage: 8,
  teaches: { words: ["family", "mother", "father", "brother", "sister", "baby", "grandmother", "grandfather", "aunt", "uncle", "cousins", "me"] },
  pages: [
    {
      en: 'At English Club, Teacher Meron held up a picture. "This is my family," she said. "Tomorrow, bring a picture of YOUR family, and tell us who is who!"',
      am: "በእንግሊዝኛ ክበብ መምህርት መሮን አንድ ሥዕል ከፍ አድርጋ አሳየች። «This is my family» አለች። (ይህ ቤተሰቤ ነው።) «ነገ የእናንተን ቤተሰብ ሥዕል ይዛችሁ ኑ፤ ማን ማን እንደሆነም ንገሩን!»",
    },
    {
      en: 'At home in the Bale Mountains, Hawi got some paper and her colored pencils. "This is me," she said, and she drew a little wolf with a beaded necklace.',
      am: "በባሌ ተራሮች ባለው ቤቷ ሀዊ ወረቀትና ባለቀለም እርሳሶቿን አመጣች። «This is me» አለች (ይህ እኔ ነኝ)፤ የዶቃ ሐብል ያደረገች ትንሽ ተኩላም ሣለች።",
    },
    {
      en: '"This is my mother." She drew Mama in her purple dress. "This is my grandfather." She drew Grandpa Tolosa with his white gabi and his walking stick.',
      am: "«This is my mother.» (ይህች እናቴ ናት።) እማማን ወይን ጠጅ ቀሚሷን አልብሳ ሣለቻት። «This is my grandfather.» (እኚህ አያቴ ናቸው።) አባ ቶሎሳን ከነጭ ጋቢያቸውና ከምርኩዛቸው ጋር ሣለቻቸው።",
    },
    {
      en: '"This is my great-grandmother, the oldest of all. This is my aunt, Chaltu. This is my uncle, Gemechu…"',
      am: "«This is my great-grandmother» (እኚህ ቅድመ አያቴ ናቸው)፣ ከሁሉም ታላቋ። «This is my aunt, Chaltu.» (ይህች አክስቴ ጫልቱ ናት።) «This is my uncle, Gemechu…» (ይህ አጎቴ ገመቹ ነው…)",
    },
    {
      en: '"…and these are my cousins, and little Obse, and…" Oh no! There was no more room on the paper. Hawi\'s family was too big!',
      am: "«…and these are my cousins» (እነዚህ የአጎቴና የአክስቴ ልጆች ናቸው)፣ «ትንሿ ኦብሴም፣ እና…» ወይ ጉድ! ወረቀቱ ላይ ቦታ አልቀረም። የሀዊ ቤተሰብ በጣም ትልቅ ነበር!",
    },
    {
      en: 'Hawi tried drawing everyone very, very small. But now nobody could see who was who! Her ears went flat. "My family doesn\'t fit," she whispered.',
      am: "ሀዊ ሁሉንም በጣም በጣም ትንሽ አድርጋ ለመሣል ሞከረች። አሁን ግን ማን ማን እንደሆነ ማየት አይቻልም ነበር! ጆሮዎቿ ተኙ። «ቤተሰቤ አይበቃውም» አለች በሹክሹክታ።",
    },
    {
      en: "She went outside and sat under the big tree. She looked up at its trunk, and at all its branches, big and small, reaching out wide. Then she had an idea.",
      am: "ወደ ውጭ ወጥታ በትልቁ ዛፍ ሥር ተቀመጠች። ግንዱን፣ ወደ ሰፊ የተዘረጉትን ትልልቅና ትንንሽ ቅርንጫፎቹን ቀና ብላ አየች። ከዚያ አንድ ሐሳብ መጣላት።",
    },
    {
      en: '"A family is like a tree! Everyone can have a branch." Hawi taped four pieces of paper together and drew a big family tree, with everyone on its branches.',
      am: "«ቤተሰብ እንደ ዛፍ ነው! ሁሉም የራሱ ቅርንጫፍ ሊኖረው ይችላል።» ሀዊ አራት ወረቀቶችን በፕላስተር አያያዘችና ትልቅ የቤተሰብ ዛፍ ሣለች፤ ሁሉም በቅርንጫፎቹ ላይ ነበሩ።",
    },
    {
      en: 'At English Club, Hawi held up her tree. "This is my family! This is my mother. This is my grandfather. These are my cousins!" "Wow!" said everyone. Big or small, we love them all!',
      am: "በእንግሊዝኛ ክበብ ሀዊ ዛፏን ከፍ አድርጋ አሳየች። «This is my family! This is my mother. This is my grandfather. These are my cousins!» «ዋው!» አሉ ሁሉም። ትልቅም ይሁን ትንሽ፣ ሁሉንም እንወዳቸዋለን!",
    },
    {
      en: 'Tsehay showed hers. "This is my mother, this is my father, and this is my baby brother, Dawit." Haben showed hers. "This is my father, and these are my big sisters!" Big or small, we love them all!',
      am: "ፀሐይ የእሷን አሳየች። «This is my mother, this is my father, and this is my baby brother, Dawit.» (እናቴ፣ አባቴና ሕፃን ወንድሜ ዳዊት።) ሐበን የእሷን አሳየች። «This is my father, and these are my big sisters!» (አባቴና ታላላቅ እህቶቼ!) ትልቅም ይሁን ትንሽ፣ ሁሉንም እንወዳቸዋለን!",
    },
    {
      en: 'Ayan showed hers. "This is my mother, Hooyo. This is my little brother, Abdi. And this is my father, Aabo. He drives a big truck far away, but he is in my picture." Big or small, we love them all!',
      am: "አያን የእሷን አሳየች። «This is my mother, Hooyo. This is my little brother, Abdi.» (እናቴ ሁዮና ታናሽ ወንድሜ አብዲ።) «And this is my father, Aabo.» (ይህ ደግሞ አባቴ አቦ ነው።) «ትልቅ የጭነት መኪና እየነዳ ሩቅ ሄዷል፤ ግን በሥዕሌ ውስጥ አለ።» ትልቅም ይሁን ትንሽ፣ ሁሉንም እንወዳቸዋለን!",
    },
    {
      en: 'Last was Anbessa. His picture had just two. "This is my grandmother, and this is me," he said softly. "My family is small." "Big or small, we love them all!" said everyone.',
      am: "በመጨረሻ አንበሳ ነበር። የእሱ ሥዕል ሁለት ብቻ ነበሩበት። «This is my grandmother, and this is me» አለ በቀስታ። (እኚህ አያቴ ናቸው፤ ይህ ደግሞ እኔ ነኝ።) «ቤተሰቤ ትንሽ ነው።» «ትልቅም ይሁን ትንሽ፣ ሁሉንም እንወዳቸዋለን!» አሉ ሁሉም።",
    },
    {
      en: 'That evening, Anbessa gave Grandma his picture and a big hug. "This is my family," he said, "and it\'s just right." Who is in YOUR family, {name}?',
      am: "በዚያ ምሽት አንበሳ ሥዕሉን ለአያቱ ሰጣትና በደንብ አቀፋት። «This is my family» አለ፤ «ልክ እንደሚገባው ነው።» {name}፣ በእናንተ ቤተሰብ ውስጥ እነማን አሉ?",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "How did Hawi fit her whole big family in one picture?",
        "Who is in our family? Can you say \"This is my …\" for each one in English?",
      ],
      am: [
        "ሀዊ ትልቁን ቤተሰቧን በአንድ ሥዕል ውስጥ እንዴት አስገባችው?",
        "በቤተሰባችን ውስጥ እነማን አሉ? ለእያንዳንዳቸው በእንግሊዝኛ «This is my …» ማለት ትችላላችሁ?",
      ],
    },
    activity: {
      en: 'Draw your own family tree together, with a branch for everyone who loves your child (grandparents, aunts, uncles, cousins, friends who are like family). Point to each one and say "This is my mother", "This is my uncle"… in English.',
      am: "አብራችሁ የራሳችሁን የቤተሰብ ዛፍ ሣሉ፤ ልጃችሁን ለሚወድ ሁሉ ቅርንጫፍ ስጡ (አያቶች፣ አክስቶች፣ አጎቶች፣ የአጎትና የአክስት ልጆች፣ እንደ ቤተሰብ የሆኑ ወዳጆች)። እያንዳንዱን እየጠቆማችሁ በእንግሊዝኛ «This is my mother»፣ «This is my uncle»… በሉ።",
    },
  },
};

export default story;
