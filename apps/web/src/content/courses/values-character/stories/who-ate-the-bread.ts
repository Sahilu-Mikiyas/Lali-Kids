import type { Story } from "../../../stories";

/*
  "Who Ate the Bread?" (level 2: telling the truth when it is hard).
  Grandma bakes a round dabo for tomorrow's guests. In the night Anbessa nibbles one piece, then
  another. In the morning: "Who ate the bread?" "Maybe… the mice?" pops out. Grandma sends
  Dimmet the cat after the little mouse family. Anbessa carries the lie like a stone that grows
  heavier (drawn on his back), until he can't play or eat. Seeing the innocent mice hiding, he
  tells the truth; the stone is gone. Grandma thanks him first, says the proverb, and they bake a
  new dabo together. He leaves the mice some crumbs and says sorry to them too.
  Join-in line: "A lie is heavy; the truth is light."

  Proverb (page 10): «እውነት ትቀጥናለች እንጂ አትበጠስም» ("Truth may grow thin, but it never breaks"),
  as it is usually quoted; the editor should confirm the form.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ውሸት ይከብዳል፤ እውነት ይቀላል።» and «ዲመት» as the cat's name (from ድመት, cat).
*/
const story: Story = {
  id: "who-ate-the-bread",
  course: "values-character",
  pack: "story",
  title: { en: "Who Ate the Bread?", am: "ዳቦውን ማን በላው?" },
  category: "Values",
  ageBands: ["3-5", "6-7", "8-9"],
  isFree: false,
  color: "#B8742E",
  scene: "lib-who-ate-the-bread",
  coverPage: 9,
  teaches: { words: ["truth", "honest", "lie", "sorry", "brave"] },
  pages: [
    {
      en: 'Grandma baked a big round dabo for the guests coming tomorrow. It smelled so good! She wrapped it in a cloth and put it high on the shelf. "Nobody touch," she smiled.',
      am: "አያቴ ነገ ለሚመጡት እንግዶች ትልቅ ክብ ዳቦ ጋገረች። ሽታው እንዴት ደስ ይላል! በጨርቅ ጠቅልላ ከፍ ብሎ መደርደሪያው ላይ አስቀመጠችው። «ማንም እንዳይነካው» አለች ፈገግ ብላ።",
    },
    {
      en: "But that night, Anbessa's nose would not go to sleep. Sniff, sniff. He tiptoed to the shelf and broke off a tiny piece. Mmm. Then another. And another…",
      am: "በዚያች ሌሊት ግን የአንበሳ አፍንጫ እንቅልፍ አልወሰደውም። ሽት፣ ሽት። በእግሩ ጣቶች ቀስ ብሎ ወደ መደርደሪያው ሄደና ትንሽ ቁራሽ ቆረሰ። እምም። ከዚያ ሌላ። ከዚያ ደግሞ ሌላ…",
    },
    {
      en: 'In the morning there was a big round bite out of Grandma\'s dabo. Grandma looked at the bread. Then she looked at Anbessa. "Who ate the bread?"',
      am: "ጠዋት ላይ ከአያቴ ዳቦ ትልቅ ክብ ጉርሻ ጎድሎ ነበር። አያቴ ዳቦውን ተመለከተች። ከዚያ አንበሳን ተመለከተች። «ዳቦውን ማን በላው?»",
    },
    {
      en: '"Maybe… the mice?" said Anbessa. The words popped out before he could stop them. And suddenly he felt something heavy, like a stone, sitting on his back.',
      am: "«ምናልባት… አይጦቹ?» አለ አንበሳ። ቃላቱ ሳያስባቸው አፈትልከው ወጡ። ወዲያው ልክ እንደ ድንጋይ የሆነ ከባድ ነገር ጀርባው ላይ እንደተቀመጠ ተሰማው።",
    },
    {
      en: '"Those naughty mice!" said Grandma. "Dimmet, go and catch them!" The cat\'s eyes went big and round. In the corner, the little mouse family trembled.',
      am: "«እነዚህ ባለጌ አይጦች!» አለች አያቴ። «ዲመት፣ ሂጂ ያዢያቸው!» የድመቷ ዓይኖች ትልቅና ክብ ሆኑ። ጥጉ ላይ ትንሿ የአይጥ ቤተሰብ ተንቀጠቀጠች።",
    },
    {
      en: "Anbessa watched the mice run and hide. The stone on his back grew bigger and heavier. A lie is heavy…",
      am: "አንበሳ አይጦቹ ሲሮጡና ሲደበቁ ተመለከተ። ጀርባው ላይ ያለው ድንጋይ ተለቀ፣ ከበደ። ውሸት ይከብዳል…",
    },
    {
      en: 'He tried to play outside, but he couldn\'t run; he felt too heavy. He tried to eat his breakfast, but he wasn\'t hungry. Lali buzzed around him. "Why are you so slow today?"',
      am: "ውጭ ለመጫወት ሞከረ፤ ግን መሮጥ አልቻለም፤ በጣም ከበደው። ቁርሱን ለመብላት ሞከረ፤ ግን አልራበውም። ላሊ ዙሪያውን በረረች። «ዛሬ ምን ሆነህ ነው እንዲህ የቀዘቀዝከው?»",
    },
    {
      en: "Anbessa looked at the mice, hiding from Dimmet behind the water pot. They hadn't done anything wrong. His lip wobbled. He knew what he had to do. But it was so hard.",
      am: "አንበሳ ከዲመት ተደብቀው ከእንስራው ጀርባ ያሉትን አይጦች ተመለከተ። ምንም ጥፋት አላጠፉም። ከንፈሩ ተንቀጠቀጠ። ማድረግ ያለበትን ያውቅ ነበር። ግን በጣም ከባድ ነበር።",
    },
    {
      en: '"Grandma," he whispered. "It wasn\'t the mice. It was me. I ate the bread. I\'m sorry." And just like that, the heavy stone was gone. The truth is light!',
      am: "«አያቴ» አለ በሹክሹክታ። «አይጦቹ አይደሉም። እኔ ነኝ። ዳቦውን የበላሁት እኔ ነኝ። ይቅርታ።» ወዲያውኑ ከባዱ ድንጋይ ጠፋ። እውነት ይቀላል!",
    },
    {
      en: 'Grandma was quiet for a moment. Then she knelt and hugged him. "Thank you for telling me the truth. That was hard, and you did it. Truth may grow thin, but it never breaks."',
      am: "አያቴ ለአፍታ ዝም አለች። ከዚያ ተንበርክካ አቀፈችው። «እውነቱን ስለነገርከኝ አመሰግናለሁ። ከባድ ነበር፤ አንተ ግን አደረግከው። እውነት ትቀጥናለች እንጂ አትበጠስም።»",
    },
    {
      en: '"Now," said Grandma, "we have a dabo to make." Anbessa kneaded the dough with all his might, and Grandma lit the fire. Together they baked a brand-new dabo, even bigger than before.',
      am: "«አሁን ደግሞ» አለች አያቴ፣ «የምንጋግረው ዳቦ አለ።» አንበሳ በሙሉ ኃይሉ ሊጡን አሸ፤ አያቴ እሳቱን አቀጣጠለች። አብረው ከበፊቱ የሚበልጥ አዲስ ዳቦ ጋገሩ።",
    },
    {
      en: "Anbessa said sorry to the mice too, with a few crumbs in their corner. Dimmet went back to sleep. A lie is heavy, the truth is light, and that night Anbessa slept as light as a feather.",
      am: "አንበሳ አይጦቹንም ይቅርታ ጠየቃቸው፤ ጥጋቸው ላይ ጥቂት ፍርፋሪ አስቀመጠላቸው። ዲመት ተመልሳ ተኛች። ውሸት ይከብዳል፣ እውነት ይቀላል፤ በዚያች ሌሊት አንበሳ እንደ ላባ ቀልሎ ተኛ።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "How did Anbessa feel while he kept the secret? Where in his body did he feel it?",
        "What did Grandma do first when he told the truth? What can our family do when someone tells a hard truth?",
      ],
      am: [
        "አንበሳ ምሥጢሩን ሲደብቅ ምን ተሰማው? በሰውነቱ የት ነው የተሰማው?",
        "እውነቱን ሲነግራት አያቴ መጀመሪያ ምን አደረገች? አንድ ሰው ከባድ እውነት ሲናገር ቤተሰባችን ምን ማድረግ ይችላል?",
      ],
    },
    activity: {
      en: "Play heavy and light: hold a heavy stone or a full bag while you remember a time you hid something, then put it down and say something true. How does light feel? (Grown-ups: when a child owns up, thank them first, then fix things together.)",
      am: "«ከባድና ቀላል» ተጫወቱ፦ አንድ ነገር የደበቃችሁበትን ጊዜ እያስታወሳችሁ ከባድ ድንጋይ ወይም የተሞላ ቦርሳ ያዙ፤ ከዚያ አስቀምጡትና አንድ እውነት ተናገሩ። ቀላል መሆን ምን ይመስላል? (ለወላጆች፦ ልጅ ጥፋቱን ሲያምን መጀመሪያ አመስግኑት፤ ከዚያ አብራችሁ አስተካክሉ።)",
    },
  },
};

export default story;
