import type { Story } from "../../../stories";

/*
  "The Torn Lamb" (level 5: saying sorry and forgiving).
  Gugu grabs Tsehay's beloved cloth lamb for a game of tug, and RIIIP, its leg tears. Tsehay is
  furious and heartbroken. Gugu says a quick "sorry" but Tsehay isn't ready. He learns that a real
  sorry also tries to put things right: he asks Grandma to teach him to sew and stitches the leg
  himself, crooked but strong. Tsehay sees how hard he tried, and forgives him. Forgiving doesn't
  mean it didn't hurt; it means the friendship is bigger than the tear.
  Join-in line: "Say sorry, forgive, and play again!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ይቅርታ መጠየቅ፣ ይቅር ማለት፣ እንደገና መጫወት!» and «ይቅር ብዬሃለሁ» (I forgive you).
*/
const story: Story = {
  id: "the-torn-lamb",
  course: "values-character",
  pack: "story",
  title: { en: "The Torn Lamb", am: "የተቀደደው በግ" },
  category: "Values",
  ageBands: ["3-5", "6-7", "8-9"],
  isFree: false,
  color: "#D9667E",
  scene: "lib-the-torn-lamb",
  coverPage: 10,
  teaches: { words: ["sorry", "forgive", "friends", "careful", "mend"] },
  pages: [
    {
      en: "Tsehay's cloth lamb went everywhere with her: to the market, to the river, and to bed. Grandma had sewn it when Tsehay was a baby.",
      am: "የፀሐይ የጨርቅ በግ በየትም ቦታ አብሯት ይሄድ ነበር፦ ገበያ፣ ወንዝ፣ መኝታም። ፀሐይ ሕፃን እያለች አያቴ ነበረች የሰፋችው።",
    },
    {
      en: '"Let\'s play tug-of-war with your lamb!" said Gugu, and he grabbed one leg. "No, Gugu, it\'s special!" said Tsehay, holding on tight. Pull… pull…',
      am: "«በበግሽ ገመድ ጉተታ እንጫወት!» አለ ጉጉ፤ አንድ እግሩንም ያዘ። «አይ፣ ጉጉ፣ ልዩ ነው!» አለች ፀሐይ አጥብቃ ይዛ። ጉተታ… ጉተታ…",
    },
    {
      en: "RIIIIP! The lamb's leg tore right off, and white stuffing puffed out like a little cloud. Everything went quiet.",
      am: "ቅድድድ! የበጉ እግር ተቀደደ፤ ነጩ ጥጥ እንደ ትንሽ ደመና ወጣ። ሁሉም ነገር ጸጥ አለ።",
    },
    {
      en: 'Tsehay\'s eyes filled with tears. "You broke him!" she shouted. "Sorry," said Gugu quickly. "Now can we play?" But Tsehay turned her back and hugged her lamb.',
      am: "የፀሐይ ዓይኖች በእንባ ተሞሉ። «ሰበርከው!» ብላ ጮኸች። «ይቅርታ» አለ ጉጉ ቶሎ ብሎ። «አሁን እንጫወት?» ፀሐይ ግን ጀርባዋን ሰጠችውና በጓን አቀፈች።",
    },
    {
      en: 'Gugu walked home slowly. "I said sorry," he told Grandma. "Why is she still cross?" Grandma put down her coffee. "Was it a little sorry, or a big sorry?"',
      am: "ጉጉ ቀስ ብሎ ወደ ቤት ሄደ። «ይቅርታ ጠየቅኩ» አላት አያቴን። «ለምን አሁንም ተቆጣች?» አያቴ ቡናዋን አስቀመጠች። «ትንሽ ይቅርታ ነበር ወይስ ትልቅ ይቅርታ?»",
    },
    {
      en: '"A big sorry," said Grandma, "means you understand how she feels, and you try to put it right. Then she can choose to forgive." Gugu thought hard. "Can you teach me to sew?"',
      am: "«ትልቅ ይቅርታ» አለች አያቴ፣ «ማለት የተሰማትን ተረድተህ ለማስተካከል መሞከር ነው። ከዚያ ይቅር ለማለት ልትመርጥ ትችላለች።» ጉጉ በደንብ አሰበ። «መስፋት ታስተምሪኛለሽ?»",
    },
    {
      en: "Gugu knocked on Tsehay's door. \"Tsehay, I'm really sorry. I grabbed your lamb when you said no, and I know he's special. Can I try to mend him?\" Tsehay looked at him for a long time. Then she nodded.",
      am: "ጉጉ የፀሐይን በር አንኳኳ። «ፀሐይ፣ በእውነት ይቅርታ። አይሆንም እያልሽ በግሽን ያዝኩት፤ ልዩ እንደሆነም አውቃለሁ። ልሰፋው ልሞክር?» ፀሐይ ለረጅም ጊዜ ተመለከተችው። ከዚያ ራሷን ነቀነቀች።",
    },
    {
      en: "Grandma showed him how. In and out, in and out. Gugu poked his finger twice, but he didn't give up. Tsehay held the leg in place.",
      am: "አያቴ እንዴት እንደሆነ አሳየችው። ማስገባት፣ ማውጣት፣ ማስገባት፣ ማውጣት። ጉጉ ጣቱን ሁለት ጊዜ ወጋ፤ ግን ተስፋ አልቆረጠም። ፀሐይ እግሩን በቦታው ያዘችለት።",
    },
    {
      en: 'At last the leg was back on: the stitches were big and crooked, but strong. Gugu handed the lamb back. "He looks a bit funny now," he said.',
      am: "በመጨረሻ እግሩ ተመለሰ፦ ስፌቶቹ ትልልቅና ጠማማ ነበሩ፤ ግን ጠንካሮች። ጉጉ በጉን መለሰላት። «አሁን ትንሽ አስቂኝ ሆኗል» አለ።",
    },
    {
      en: 'Tsehay hugged the lamb. Then she hugged Gugu. "He looks brave now, like he went on an adventure," she said. "I forgive you, Gugu."',
      am: "ፀሐይ በጉን አቀፈችው። ከዚያ ጉጉን አቀፈችው። «አሁን ጀግና ይመስላል፤ ጀብዱ የሄደ ይመስላል» አለች። «ይቅር ብዬሃለሁ፣ ጉጉ።»",
    },
    {
      en: '"Next time, I\'ll ask first," said Gugu. "And next time, we\'ll play tug-of-war with a rope!" laughed Tsehay. Say sorry, forgive, and play again!',
      am: "«በሚቀጥለው ጊዜ መጀመሪያ እጠይቃለሁ» አለ ጉጉ። «በሚቀጥለው ጊዜ ደግሞ በገመድ ገመድ ጉተታ እንጫወታለን!» ብላ ሳቀች ፀሐይ። ይቅርታ መጠየቅ፣ ይቅር ማለት፣ እንደገና መጫወት!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "What is the difference between Gugu's little sorry and his big sorry?",
        "Is forgiving easy or hard? Why do you think Tsehay was ready to forgive at the end?",
      ],
      am: [
        "በጉጉ ትንሽ ይቅርታና ትልቅ ይቅርታ መካከል ያለው ልዩነት ምንድን ነው?",
        "ይቅር ማለት ቀላል ነው ወይስ ከባድ? ፀሐይ በመጨረሻ ይቅር ለማለት ዝግጁ የሆነችው ለምን ይመስላችኋል?",
      ],
    },
    activity: {
      en: "Practise a big sorry with three parts: \"I'm sorry I…\", \"I think you felt…\", \"Can I help put it right?\" Then practise answering: \"I forgive you.\" Mend something together this week, like a torn page or a loose button.",
      am: "ሦስት ክፍሎች ያሉትን ትልቅ ይቅርታ ተለማመዱ፦ «… ስላደረግኩ ይቅርታ»፣ «… የተሰማህ/ሽ ይመስለኛል»፣ «ለማስተካከል ልርዳ?» ከዚያ «ይቅር ብዬሃለሁ/ብዬሻለሁ» ብሎ መመለስን ተለማመዱ። በዚህ ሳምንት እንደ የተቀደደ ገጽ ወይም የላላ ቁልፍ ያለ ነገር አብራችሁ አስተካክሉ።",
    },
  },
};

export default story;
