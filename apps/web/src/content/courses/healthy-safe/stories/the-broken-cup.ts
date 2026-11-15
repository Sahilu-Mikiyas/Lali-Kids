import type { Story } from "../../../stories";

/*
  "The Broken Cup" (level 4: sharp things).
  Anbessa drops a coffee cup and wants to pick up the pieces; Grandma stops him gently: broken
  pieces are sharp, step back and let a grown-up do it (shoes on, broom, wrapped in paper). He
  wants to cut onions too, and works out what a helper can do without a knife; knives live up
  high. At school he finds a broken bottle by the gate, stands back, warns the others and tells
  Teacher Meron.
  Join-in line: "Stop, step back, call a grown-up!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line «ቆም፣ ወደ ኋላ፣ ትልቅ ሰው ጥራ!» and «ረከቦት».
*/
const story: Story = {
  id: "the-broken-cup",
  course: "healthy-safe",
  pack: "story",
  title: { en: "The Broken Cup", am: "የተሰበረው ስኒ" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#5A8AC0",
  scene: "lib-the-broken-cup",
  coverPage: 1,
  teaches: { words: ["sharp", "knife", "glass", "careful", "tell"] },
  pages: [
    {
      en: "Anbessa was carrying the little coffee cups to the tray, very carefully. Then his foot caught the mat. Crash!",
      am: "አንበሳ ትንንሾቹን የቡና ስኒዎች በጥንቃቄ ወደ ረከቦቱ እየወሰደ ነበር። ከዚያ ምንጣፉ አደናቀፈው። ቋ!",
    },
    {
      en: "One cup lay in pieces all over the floor: sharp, pointy pieces. Anbessa bent down to pick them up. \"I'll fix it!\"",
      am: "አንዱ ስኒ ተሰባብሮ ወለሉ ላይ ተበተነ፦ ስለታማ፣ ሹል ስብርባሪዎች። አንበሳ ሊለቅማቸው ጎንበስ አለ። «አስተካክለዋለሁ!»",
    },
    {
      en: "\"Stop,\" said Grandma gently. \"Don't touch. Broken pieces are sharp, and they can cut. Step back, and let me do it.\"",
      am: "«ቆይ» አለች አያቴ በለስላሳ ድምፅ። «አትንካ። ስብርባሪ ስለታም ነው፤ ይቆርጣል። ወደ ኋላ በልና እኔ ልሥራው።»",
    },
    {
      en: "Grandma put on her shoes and swept every piece into a dustpan. Then she wrapped them in paper, so nobody would get cut.",
      am: "አያቴ ጫማዋን አድርጋ ስብርባሪዎቹን ሁሉ ጠርጋ ሰበሰበች። ማንም እንዳይቆረጥ በወረቀት ጠቀለለቻቸው።",
    },
    {
      en: "\"Sharp things are grown-up things,\" said Grandma. \"Broken glass, knives, razor blades.\" Anbessa nodded. \"Stop, step back, call a grown-up!\"",
      am: "«ስለታም ነገሮች የትልልቆች ናቸው» አለች አያቴ። «ስብርባሪ፣ ቢላ፣ ምላጭ።» አንበሳ ራሱን ነቀነቀ። «ቆም፣ ወደ ኋላ፣ ትልቅ ሰው ጥራ!»",
    },
    {
      en: "Later Grandma was chopping onions. Chop, chop! \"Can I cut too?\" asked Anbessa. \"This knife is very sharp,\" said Grandma.",
      am: "በኋላ አያቴ ሽንኩርት እየከተፈች ነበር። ክት፣ ክት! «እኔም ልቁረጥ?» አለ አንበሳ። «ይህ ቢላ በጣም ስለታም ነው» አለች አያቴ።",
    },
    {
      en: "Anbessa thought. \"What can I do without a knife?\" He washed the tomatoes and counted the garlic. \"A big helper's job!\" said Grandma.",
      am: "አንበሳ አሰበ። «ያለ ቢላ ምን ልረዳ?» ቲማቲሞቹን አጠበ፤ ነጭ ሽንኩርቱን ቆጠረ። «የትልቅ ረዳት ሥራ!» አለች አያቴ።",
    },
    {
      en: "When she had finished, Grandma put the knife away, up high on the shelf. \"Knives live up high, out of reach.\"",
      am: "አያቴ ስትጨርስ ቢላውን ከፍ ብሎ መደርደሪያው ላይ አስቀመጠችው። «ቢላ የሚኖረው ከፍ ብሎ፣ ከእጅ ርቆ ነው።»",
    },
    {
      en: "Next day at school, Anbessa saw a broken bottle by the gate. Lots of children were running past. Stop, step back, call a grown-up!",
      am: "በሚቀጥለው ቀን ትምህርት ቤት በበሩ አጠገብ የተሰበረ ጠርሙስ አየ። ብዙ ልጆች እየሮጡ ያልፉ ነበር። ቆም፣ ወደ ኋላ፣ ትልቅ ሰው ጥራ!",
    },
    {
      en: "\"Teacher Meron! Broken glass!\" Anbessa stood back and called, \"Go round, everyone!\" until the teacher came with a broom.",
      am: "«መምህርት መሮን! ስብርባሪ!» አንበሳ ራቅ ብሎ ቆሞ መምህርቷ መጥረጊያ ይዘው እስኪመጡ «ዙሩ!» እያለ ጠራ።",
    },
    {
      en: "\"Well done, Anbessa,\" said Teacher Meron. \"You didn't touch it, you kept everyone safe, and you told me.\"",
      am: "«ጎበዝ አንበሳ» አሉ መምህርት መሮን። «አልነካኸውም፣ ሁሉንም ጠበቅህ፣ ለእኔም ነገርከኝ።»",
    },
    {
      en: "That evening Anbessa carried the cups again, slowly, slowly. Not one fell. And if one ever does? Stop, step back, call a grown-up!",
      am: "በዚያ ምሽት አንበሳ ስኒዎቹን ቀስ፣ ቀስ ብሎ ወሰደ። አንዱም አልወደቀም። ቢወድቅስ? ቆም፣ ወደ ኋላ፣ ትልቅ ሰው ጥራ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "What did Anbessa want to do with the broken pieces? What did Grandma do instead?",
        "Which things in our home are sharp? Where do they live?",
      ],
      am: [
        "አንበሳ ስብርባሪዎቹን ምን ሊያደርጋቸው ፈለገ? አያቴ በምትኩ ምን አደረገች?",
        "በቤታችን ስለታም የሆኑት ነገሮች የትኞቹ ናቸው? የት ይቀመጣሉ?",
      ],
    },
    activity: {
      en: "Give your child a \"no-knife\" kitchen job (washing vegetables, counting, stirring cold food) so they can help safely. Keep knives, razor blades and broken glass up high or put away, and wrap broken glass before throwing it out. Teach: stop, step back and call a grown-up. Small cuts: wash with clean water, press with a clean cloth, and cover; go to the health centre if the bleeding doesn't stop or the cut is deep or dirty.",
      am: "ልጅዎ በደህና እንዲረዳ «ያለ ቢላ» የማድቤት ሥራ ይስጡት (አትክልት ማጠብ፣ መቁጠር፣ ቀዝቃዛ ምግብ ማማሰል)። ቢላ፣ ምላጭና የተሰበረ ብርጭቆ ከፍ ብለው ወይም ተሰብስበው ይቀመጡ፤ የተሰበረ ብርጭቆም ከመጣሉ በፊት ይጠቅለል። ያስተምሩ፦ ቁም፣ ወደ ኋላ በል፣ ትልቅ ሰው ጥራ። ትንሽ ቁስል፦ በንጹሕ ውሃ ያጥቡ፣ በንጹሕ ጨርቅ ይጫኑ፣ ይሸፍኑ፤ ደሙ ካልቆመ ወይም ቁስሉ ጥልቅ ወይም ቆሻሻ ከሆነ ወደ ጤና ጣቢያ ይሂዱ።",
    },
  },
};

export default story;
