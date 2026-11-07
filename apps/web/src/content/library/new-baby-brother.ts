import type { Story } from "../stories";

/*
  "Tsehay's New Baby Brother": shy Tsehay the gelada waits for the new baby. When baby Dawit
  comes, everyone looks at him and nobody looks at her ("What about me?", the line to join
  in on). She sits alone under the fig tree until Grandma, wrapping her in her netela,
  tells her the secret: babies can't talk or walk or sing, but big sisters can. Tsehay
  talks to Dawit, finds big-sister jobs, learns Mama's lullaby (the much-loved Ethiopian
  lullaby "Eshururu") and sings her brother to sleep.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  «እኔስ?» as the join-in line, the baby's cry «ኡዋ! ኡዋ!», «ቃጭል» for the baby's rattle
  (page 10), the words of the lullaby on page 12, and «ጋቢ» for the white blanket.
*/
const story: Story = {
  id: "new-baby-brother",
  pack: "story",
  title: { en: "Tsehay's New Baby Brother", am: "የፀሐይ አዲሱ ትንሽ ወንድም" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#D9667E",
  scene: "lib-new-baby-brother",
  coverPage: 11,
  teaches: { words: ["baby", "brother", "sister", "lullaby", "gentle"] },
  pages: [
    {
      en: 'Mama\'s tummy was big and round. "Soon you will be a big sister," she said. Tsehay hugged her cloth lamb. A big sister? What would that be like?',
      am: "የእማማ ሆድ ትልቅና ክብ ነበር። «በቅርቡ ታላቅ እህት ትሆኛለሽ» አለች። ፀሐይ የጨርቅ በጓን አቀፈች። ታላቅ እህት? ምን ይመስል ይሆን?",
    },
    {
      en: 'One morning, there he was! Baby Dawit, tiny and wrinkly in a soft white gabi. "Ooh!" said Papa. "Lovely!" said Grandma. Tsehay peeked. He was very small.',
      am: "አንድ ቀን ጠዋት፣ እነሆ መጣ! ሕፃኑ ዳዊት፤ ትንሽዬና የተጨማደደ፣ በለስላሳ ነጭ ጋቢ ተጠቅልሎ። አባባ «ኦ!» አለ። አያቴ «ያምራል!» አለች። ፀሐይ አጮልቃ አየች። በጣም ትንሽ ነበር።",
    },
    {
      en: 'The neighbours came with warm genfo for Mama and soft gifts for the baby. "So small! So sweet!" Nobody looked at Tsehay. "What about me?" she whispered.',
      am: "ጎረቤቶች ለእማማ ትኩስ ገንፎ፣ ለሕፃኑ ደግሞ ለስላሳ ስጦታዎች ይዘው መጡ። «እንዴት ትንሽ ነው! እንዴት ያምራል!» ማንም ፀሐይን አላያትም። «እኔስ?» አለች በሹክሹክታ።",
    },
    {
      en: 'Tsehay showed Mama her drawing. "Shh, the baby is sleeping." She did her best dance. "Shh, the baby is feeding." Tsehay stamped her foot. "What about me?"',
      am: "ፀሐይ ስዕሏን ለእማማ አሳየች። «ሽሽ፣ ሕፃኑ ተኝቷል።» ምርጥ ዳንሷን ደነሰች። «ሽሽ፣ ሕፃኑ እየጠባ ነው።» ፀሐይ እግሯን መሬት መታች። «እኔስ?»",
    },
    {
      en: "That night the baby cried and cried. WAAH! Mama rocked him and Papa walked him. Tsehay covered her ears. Nobody tucked her in. What about me?",
      am: "በዚያ ሌሊት ሕፃኑ አለቀሰ፣ አለቀሰ። ኡዋ! እማማ አወዛወዘችው፤ አባባ ይዞት ተመላለሰ። ፀሐይ ጆሮዎቿን ሸፈነች። ማንም አላለበሳትም። እኔስ?",
    },
    {
      en: 'In the morning, Tsehay sat all alone under the big fig tree with her cloth lamb. "Nobody wants me now," she said, and one big tear rolled down her cheek.',
      am: "ጠዋት ላይ ፀሐይ ከጨርቅ በጓ ጋር ከትልቁ የሾላ ዛፍ ሥር ብቻዋን ተቀመጠች። «አሁን ማንም አይፈልገኝም» አለች፤ አንድ ትልቅ እንባ በጉንጯ ላይ ወረደ።",
    },
    {
      en: 'Grandma sat down beside her and wrapped her in the end of her netela. "I know a secret," she said. "Babies can\'t talk. They can\'t walk. They can\'t even sing."',
      am: "አያቴ ከአጠገቧ ተቀምጣ በነጠላዋ ጫፍ ጠቀለለቻት። «አንድ ሚስጥር አውቃለሁ» አለች። «ሕፃናት መናገር አይችሉም። መራመድ አይችሉም። መዘመር እንኳ አይችሉም።»",
    },
    {
      en: '"But big sisters can," said Grandma, "and Dawit needs one very much." Tsehay wiped her eyes. "Really?" "Really. Come and see."',
      am: "አያቴ «ታላቅ እህቶች ግን ይችላሉ፤ ዳዊት ደግሞ ታላቅ እህት በጣም ያስፈልገዋል» አለች። ፀሐይ ዓይኗን ጠረገች። «እውነት?» «እውነት። ነይ እዪ።»",
    },
    {
      en: 'Dawit was crying again. Tsehay leaned in close. "Hello, Dawit. I\'m your big sister." He stopped crying. His eyes opened wide. He was looking right at her!',
      am: "ዳዊት እንደገና እያለቀሰ ነበር። ፀሐይ ተጠጋችው። «ሰላም ዳዊት። እኔ ታላቅ እህትህ ነኝ።» ማልቀሱን አቆመ። ዓይኖቹን በሰፊው ከፈተ። በቀጥታ እሷን እያያት ነበር!",
    },
    {
      en: "Tsehay found big-sister jobs. She fetched the soft blanket. She shook the rattle. She made funny faces. Then Dawit grabbed her finger and held on tight!",
      am: "ፀሐይ የታላቅ እህት ሥራዎችን አገኘች። ለስላሳውን ብርድ ልብስ አመጣች። ቃጭሉን አንቃጨለች። አስቂኝ ፊት ሠራች። ከዚያ ዳዊት ጣቷን ይዞ አጥብቆ ያዘ!",
    },
    {
      en: 'Mama hugged Tsehay close. "You were this tiny once. Every night I sang you a song." "Which song?" Mama sang softly: "Eshururu, eshururu…"',
      am: "እማማ ፀሐይን አጥብቃ አቀፈቻት። «አንቺም አንድ ጊዜ እንዲህ ትንሽ ነበርሽ። በየሌሊቱ አንድ ዘፈን እዘፍንልሽ ነበር።» «የትኛውን ዘፈን?» እማማ በለስላሳ ዘፈነች፦ «እሹሩሩ፣ እሹሩሩ…»",
    },
    {
      en: 'That night Dawit would not sleep, and Mama and Papa were tired. So Tsehay sang by the cradle: "Eshururu, little one. Your big sister is here."',
      am: "በዚያ ሌሊት ዳዊት አልተኛም አለ፤ እማማና አባባም ደክሟቸዋል። ስለዚህ ፀሐይ ከአልጋው አጠገብ ዘፈነች፦ «እሹሩሩ፣ ትንሹ ልጅ። ታላቅ እህትህ እዚህ አለች።»",
    },
    {
      en: 'Dawit\'s eyes closed. Mama tucked them both in and kissed Tsehay\'s nose. "And you? You are our wonderful big sister." Tsehay smiled. Eshururu… goodnight.',
      am: "የዳዊት ዓይኖች ተከደኑ። እማማ ሁለቱንም አለበሰቻቸው፤ የፀሐይን አፍንጫ ሳመች። «አንቺስ? አንቺ የእኛ ድንቅ ታላቅ እህት ነሽ።» ፀሐይ ፈገግ አለች። እሹሩሩ… ደህና እደሩ።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        'Tsehay felt left out when everyone looked at the baby. Have you ever felt "What about me?" What helped you feel better?',
        "What big-sister or big-brother jobs could you do for a baby?",
      ],
      am: [
        "ሁሉም ሕፃኑን ሲያዩ ፀሐይ እንደተረሳች ተሰማት። እናንተ «እኔስ?» የሚል ስሜት ተሰምቷችሁ ያውቃል? ምን ረዳችሁ?",
        "ለሕፃን ምን ዓይነት የታላቅ እህት ወይም የታላቅ ወንድም ሥራዎችን መሥራት ትችላላችሁ?",
      ],
    },
    activity: {
      en: 'Sing "Eshururu" together, softly, and rock a doll or a soft toy to sleep. Then let your child choose one "big kid job" to do for the family this week.',
      am: "«እሹሩሩ»ን አብራችሁ በለስላሳ ዘምሩ፤ አሻንጉሊት ወይም ለስላሳ መጫወቻ እያወዛወዛችሁ አስተኙ። ከዚያ ልጃችሁ በዚህ ሳምንት ለቤተሰቡ የሚሠራውን አንድ «የትልቅ ልጅ ሥራ» ይምረጥ።",
    },
  },
};

export default story;
