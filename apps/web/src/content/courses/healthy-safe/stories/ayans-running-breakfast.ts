import type { Story } from "../../../stories";

/*
  "Ayan's Running Breakfast" (level 2: eating breakfast; energy for the day).
  Ayan is training for the school race and is so excited that she runs out of the door without
  breakfast. By mid-morning her legs are wobbly, her tummy rumbles and she can't think about the
  sums. Teacher Meron asks if she ate breakfast. Ayan works it out like her lamp: no oil, no
  light. Next morning she sits down first with Hooyo and Abdi: canjeero (the Somali pancake), an
  egg, a cup of milk, a sip of water, and then she runs, and runs her best in the race.
  Join-in line: "Breakfast first, then off I run!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «መጀመሪያ ቁርስ፣ ከዚያ ሩጫ!» and «ካንጀሮ» for the Somali canjeero.
*/
const story: Story = {
  id: "ayans-running-breakfast",
  course: "healthy-safe",
  pack: "story",
  title: { en: "Ayan's Running Breakfast", am: "የአያን የሩጫ ቁርስ" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#E2A23A",
  scene: "lib-ayans-running-breakfast",
  coverPage: 9,
  teaches: { words: ["breakfast", "egg", "milk", "energy", "run"] },
  pages: [
    {
      en: "Ayan was going to run in the school race on Friday. Every morning she practised. Zoom, out of the door, before the sun was even high!",
      am: "አያን ዓርብ በትምህርት ቤቱ ሩጫ ልትሮጥ ነበር። ሁልጊዜ ጠዋት ትለማመድ ነበር። ፀሐይ ገና ከፍ ሳትል ዙም ብላ ከበሩ ትወጣለች!",
    },
    {
      en: '"Ayan, your breakfast!" called Hooyo, holding a warm canjeero. "No time, Hooyo!" called Ayan. "I\'m training!"',
      am: "«አያን፣ ቁርስሽ!» ብላ ጠራች ሁዮ፣ ትኩስ ካንጀሮ ይዛ። «ጊዜ የለኝም ሁዮ!» አለች አያን። «እየተለማመድኩ ነው!»",
    },
    {
      en: "She ran round the well, twice. She ran to school. But by the middle of the morning, something was wrong. Her legs felt wobbly, like soft dough.",
      am: "በጉድጓዱ ዙሪያ ሁለት ጊዜ ሮጠች። ወደ ትምህርት ቤት ሮጠች። ግን ረፋድ ላይ የሆነ ነገር ተበላሸ። እግሮቿ እንደ ለስላሳ ሊጥ ተንቀጠቀጡ።",
    },
    {
      en: "Her tummy rumbled, grrrrumble, so loudly that Abdi giggled. And when Teacher Meron wrote sums on the board, Ayan couldn't think at all.",
      am: "ሆዷ ጉርርርር ብሎ ጮኸ፤ አብዲ እስኪስቅ ድረስ። መምህርት መሮን በሰሌዳው ላይ ሒሳብ ሲጽፉ ደግሞ አያን ምንም ማሰብ አልቻለችም።",
    },
    {
      en: '"Ayan, did you eat breakfast today?" asked Teacher Meron kindly. Ayan shook her head. "I was too busy running."',
      am: "«አያን፣ ዛሬ ቁርስ በልተሻል?» ብለው በደግነት ጠየቁ መምህርት መሮን። አያን ራሷን ነቀነቀች። «በመሮጥ በጣም ተጠምጄ ነበር።»",
    },
    {
      en: "That evening, Ayan watched Hooyo fill the lamp with oil. With no oil, the lamp had no light. Ayan sat up. \"I'm like the lamp! With no breakfast, I've got no running in me!\"",
      am: "በዚያ ምሽት አያን ሁዮ ኩራዙን ዘይት ስትሞላው ተመለከተች። ዘይት ከሌለ ኩራዙ ብርሃን የለውም። አያን ቀና አለች። «እኔም እንደ ኩራዙ ነኝ! ያለ ቁርስ ሩጫ የለኝም!»",
    },
    {
      en: "The next morning, Ayan sat down first. A warm canjeero. An egg. A cup of milk, and a sip of water. \"Breakfast first, then off I run!\"",
      am: "በሚቀጥለው ጠዋት አያን መጀመሪያ ተቀመጠች። ትኩስ ካንጀሮ። አንድ እንቁላል። አንድ ኩባያ ወተትና ትንሽ ውሃ። «መጀመሪያ ቁርስ፣ ከዚያ ሩጫ!»",
    },
    {
      en: "Abdi sat down too, and copied her, bite for bite. \"Breakfast first, then off I run!\" Then they ran to school together.",
      am: "አብዲም ተቀመጠና ጉርሻ በጉርሻ አስመሰላት። «መጀመሪያ ቁርስ፣ ከዚያ ሩጫ!» ከዚያ አብረው ወደ ትምህርት ቤት ሮጡ።",
    },
    {
      en: "No wobbly legs. No grumbling tummy. When Teacher Meron wrote sums on the board, Ayan's hand went up first.",
      am: "የሚንቀጠቀጥ እግር የለም። የሚጮኽ ሆድ የለም። መምህርት መሮን በሰሌዳው ላይ ሒሳብ ሲጽፉ መጀመሪያ የተነሣው የአያን እጅ ነበር።",
    },
    {
      en: "On Friday, the whole school came to watch the race. Ayan had eaten her breakfast, and drunk her water. Ready… steady… GO!",
      am: "ዓርብ ዕለት መላው ትምህርት ቤት ሩጫውን ሊያይ መጣ። አያን ቁርሷን በልታ፣ ውሃዋን ጠጥታ ነበር። ተዘጋጁ… ዝግጁ… ሩጡ!",
    },
    {
      en: "Ayan ran like the wind across the dusty field, long legs flying. She didn't win, but she ran her very best, and she finished smiling.",
      am: "አያን በአቧራማው ሜዳ ላይ እንደ ነፋስ ሮጠች፤ ረጃጅም እግሮቿ እየበረሩ። አላሸነፈችም፤ ግን የምትችለውን ሁሉ ሮጠች፤ ፈገግ እያለችም ጨረሰች።",
    },
    {
      en: "That night, Hooyo asked, \"What will you do tomorrow morning?\" Ayan and Abdi shouted together: \"Breakfast first, then off we run!\"",
      am: "በዚያች ሌሊት ሁዮ «ነገ ጠዋት ምን ታደርጋላችሁ?» ብላ ጠየቀች። አያንና አብዲ አብረው ጮኹ፦ «መጀመሪያ ቁርስ፣ ከዚያ ሩጫ!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "How did Ayan feel at school when she missed breakfast? Why was she like the lamp?",
        "What do we like to eat for breakfast? What could we add from another food colour?",
      ],
      am: [
        "አያን ቁርስ ሳትበላ ትምህርት ቤት ምን ተሰማት? ለምን እንደ ኩራዙ ሆነች?",
        "ለቁርስ ምን መብላት እንወዳለን? ከሌላ የምግብ ቀለም ምን ልንጨምር እንችላለን?",
      ],
    },
    activity: {
      en: "Plan tomorrow's breakfast together tonight, so it's quick in the morning. A good children's breakfast has something for energy (bread, injera, porridge, kinche or canjeero) and something to grow on (an egg, milk, peanuts, beans or lentils), with fruit when you can. Children who eat breakfast usually find it easier to concentrate and play in the morning.",
      am: "ጠዋት ቶሎ እንዲሆን የነገውን ቁርስ ዛሬ ማታ አብራችሁ አቅዱ። ጥሩ የልጆች ቁርስ ጉልበት የሚሰጥ ነገር (ዳቦ፣ እንጀራ፣ ገንፎ፣ ቅንጬ ወይም ካንጀሮ) እና ለማደግ የሚረዳ ነገር (እንቁላል፣ ወተት፣ ለውዝ፣ ባቄላ ወይም ምስር) ይኖረዋል፤ ሲቻል ፍራፍሬም። ቁርስ የሚበሉ ልጆች ብዙውን ጊዜ ጠዋት ላይ በትኩረት መማርና መጫወት ይቀልላቸዋል።",
    },
  },
};

export default story;
