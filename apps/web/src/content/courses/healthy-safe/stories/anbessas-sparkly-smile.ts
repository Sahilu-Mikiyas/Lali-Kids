import type { Story } from "../../../stories";

/*
  "Anbessa's Sparkly Smile" (level 1: brushing teeth twice a day).
  Every morning Anbessa brushes with Grandma (who cleans hers with a mefakiya stick). But every
  night he's asleep by the fire before he remembers. His teeth feel fuzzy in the morning, and
  Grandma explains that food left on teeth all night is bad for them. Anbessa works out the
  problem himself: brush BEFORE he gets sleepy, right after dinner, and put his toothbrush on
  Grandma's story stool so he can't forget. Then a pea-sized bit of toothpaste, small circles on
  every tooth, spit out the foam, and Grandma checks.
  Facts follow mainstream dental advice for children (WHO, national guidance): brush twice a day,
  morning and before bed, about two minutes, with a pea-sized amount of fluoride toothpaste for
  children aged 3 to 6; spit, don't swallow; a grown-up helps or checks until about age 7.
  Join-in line: "Top teeth, bottom teeth, front and back, round and round!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «የላይ ጥርስ፣ የታች ጥርስ፣ ፊትና ኋላ፣ ዙሪያ ዙሪያ!» and «መፋቂያ».
*/
const story: Story = {
  id: "anbessas-sparkly-smile",
  course: "healthy-safe",
  pack: "story",
  title: { en: "Anbessa's Sparkly Smile", am: "የአንበሳ የሚያበራ ፈገግታ" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#3AA7A0",
  scene: "lib-anbessas-sparkly-smile",
  coverPage: 7,
  teaches: { words: ["teeth", "toothbrush", "morning", "night", "smile"] },
  pages: [
    {
      en: "Every morning, Anbessa and Grandma clean their teeth in the sunshine. Anbessa has a little toothbrush. Grandma chews her mefakiya stick, the way her grandma did.",
      am: "ሁልጊዜ ጠዋት አንበሳና አያቴ በፀሐይ ብርሃን ጥርሳቸውን ያጸዳሉ። አንበሳ ትንሽ የጥርስ ብሩሽ አለው። አያቴ ደግሞ እንደ አያቷ መፋቂያዋን ታኝካለች።",
    },
    {
      en: '"Twice a day," says Grandma. "Once when the sun comes up, and once before you sleep." Anbessa grins. "Easy!"',
      am: "«በቀን ሁለት ጊዜ» ትላለች አያቴ። «አንድ ጊዜ ፀሐይ ስትወጣ፣ አንድ ጊዜ ደግሞ ከመተኛትህ በፊት።» አንበሳ ፈገግ አለ። «ቀላል ነው!»",
    },
    {
      en: "All day long, Anbessa eats. Crunchy kolo. Soft bread. A sticky sweet from the market. Little bits hide between his teeth.",
      am: "ቀኑን ሙሉ አንበሳ ይበላል። ቆሎ፣ ለስላሳ ዳቦ፣ ከገበያ የመጣ የሚያጣብቅ ከረሜላ። ትንንሽ ፍርፋሪዎች በጥርሶቹ መካከል ይደበቃሉ።",
    },
    {
      en: "At night there's dinner, then Grandma's story by the fire. Anbessa's eyes close… and he's fast asleep. The toothbrush waits in its cup, all alone.",
      am: "ማታ እራት ይበላል፤ ከዚያ በእሳቱ አጠገብ የአያቴ ተረት። የአንበሳ ዓይኖች ይከደናሉ… እንቅልፍ ይወስደዋል። የጥርስ ብሩሹ ብቻውን በኩባያው ውስጥ ይጠብቃል።",
    },
    {
      en: "It happens again the next night, and the next. One morning Anbessa's teeth feel fuzzy, like a woolly sheep. \"Grandma, my teeth feel funny!\"",
      am: "በሚቀጥለው ሌሊትም፣ በዚያ በሚቀጥለውም እንዲሁ ሆነ። አንድ ጠዋት አንበሳ ጥርሶቹ ላይ እንደ በግ ሱፍ ያለ ነገር ተሰማው። «አያቴ፣ ጥርሶቼ ይገርማሉ!»",
    },
    {
      en: '"Food left on our teeth all night isn\'t good for them," says Grandma. "Bit by bit it can make little holes that hurt." Anbessa sighs. "But at night I\'m always too sleepy!"',
      am: "«ሌሊቱን ሙሉ ጥርስ ላይ የሚቀር ምግብ ለጥርስ ጥሩ አይደለም» ትላለች አያቴ። «ቀስ በቀስ የሚያምም ትንሽ ቀዳዳ ሊያወጣ ይችላል።» አንበሳ ተነፈሰ። «ግን ማታ ሁልጊዜ እንቅልፍ ያሸንፈኛል!»",
    },
    {
      en: "Anbessa thinks and thinks. Then his ears pop up. \"I'll brush BEFORE I get sleepy! Right after dinner, before the story.\" He puts his toothbrush on Grandma's story stool, so he can't forget.",
      am: "አንበሳ አሰበ፣ አሰበ። ከዚያ ጆሮዎቹ ቀጥ አሉ። «እንቅልፍ ሳይወስደኝ እቦርሻለሁ! ልክ ከእራት በኋላ፣ ከተረቱ በፊት።» እንዳይረሳ የጥርስ ብሩሹን በአያቴ የተረት በርጩማ ላይ አስቀመጠው።",
    },
    {
      en: "That night, after dinner, there it is! A pea of toothpaste, small circles. Top teeth, bottom teeth, front and back, round and round!",
      am: "በዚያ ምሽት ከእራት በኋላ፣ ብሩሹ እዚያው አለ! እንደ አተር ያለች የጥርስ ሳሙና፣ ትንንሽ ክቦች። የላይ ጥርስ፣ የታች ጥርስ፣ ፊትና ኋላ፣ ዙሪያ ዙሪያ!",
    },
    {
      en: "Grandma hums her brushing song, the one that lasts just long enough. Top teeth, bottom teeth, front and back, round and round!",
      am: "አያቴ የመቦረሻ ዜማዋን ታንጎራጉራለች፤ ልክ የሚበቃውን ያህል የሚቆየውን። የላይ ጥርስ፣ የታች ጥርስ፣ ፊትና ኋላ፣ ዙሪያ ዙሪያ!",
    },
    {
      en: 'Anbessa spits out the foam. "Let me see," says Grandma, and she checks every tooth, even the ones at the very back. "Sparkly!"',
      am: "አንበሳ አረፋውን ተፋ። «እስኪ ልይ» አለች አያቴ፤ ከኋላ ያሉትንም ሳይቀር እያንዳንዱን ጥርስ አየች። «ያበራሉ!»",
    },
    {
      en: "Then the story, by the fire. Anbessa's eyes close, and this time he can sleep, with clean teeth and a sparkly smile.",
      am: "ከዚያ በእሳቱ አጠገብ ተረቱ። የአንበሳ ዓይኖች ተከደኑ፤ በዚህ ጊዜ ግን በንጹሕ ጥርስና በሚያበራ ፈገግታ ይተኛል።",
    },
    {
      en: 'In the morning, Gugu asks, "How is your smile so sparkly?" Anbessa laughs. "Brush before you\'re sleepy! Top teeth, bottom teeth, front and back, round and round!"',
      am: "ጠዋት ጉጉ «ፈገግታህ እንዴት እንዲህ አበራ?» ብሎ ጠየቀ። አንበሳ ሳቀ። «እንቅልፍ ሳይመጣ ቦርሽ! የላይ ጥርስ፣ የታች ጥርስ፣ ፊትና ኋላ፣ ዙሪያ ዙሪያ!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why did Anbessa keep forgetting to brush at night? How did he solve it?",
        "When are our two brushing times? Where could we keep the toothbrush so we remember?",
      ],
      am: [
        "አንበሳ ማታ መቦረሽን ለምን ይረሳ ነበር? ችግሩን እንዴት ፈታው?",
        "ሁለቱ የመቦረሻ ጊዜያችን መቼ ናቸው? እንዳንረሳ ብሩሹን የት ብናስቀምጠው ይሻላል?",
      ],
    },
    activity: {
      en: "Brush together twice a day, in the morning and before bed (about two minutes, the length of a short song sung a few times). Use a soft toothbrush and a pea-sized amount of fluoride toothpaste (just a smear for children under 3); spit out the foam, don't swallow it. Young children can't clean every tooth on their own yet, so help or check until about age 7. Keep sweet snacks and drinks for mealtimes, and nothing sweet after night brushing.",
      am: "በቀን ሁለት ጊዜ፣ ጠዋትና ከመተኛት በፊት፣ አብራችሁ ቦርሹ (ሁለት ደቂቃ ያህል፣ አጭር ዘፈን ጥቂት ጊዜ የሚዘፈንበትን ያህል)። ለስላሳ ብሩሽና እንደ አተር ያለች ፍሎራይድ ያለበት የጥርስ ሳሙና ይጠቀሙ (ከ3 ዓመት በታች ለሆኑ ልጆች ትንሽ ቅባት ብቻ)፤ አረፋውን ይትፉ እንጂ አይዋጡ። ትንንሽ ልጆች ገና ሁሉንም ጥርስ ብቻቸውን ማጽዳት ስለማይችሉ እስከ 7 ዓመት ገደማ ያግዟቸው ወይም ይፈትሹላቸው። ጣፋጭ መክሰስና መጠጥ በምግብ ሰዓት ብቻ ይሁን፤ ከማታ መቦረሽ በኋላ ደግሞ ምንም ጣፋጭ አይበላ።",
    },
  },
};

export default story;
