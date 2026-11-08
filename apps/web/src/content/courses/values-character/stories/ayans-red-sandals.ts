import type { Story } from "../../../stories";

/*
  "Ayan's Red Sandals" (level 2: taking care of your things).
  Ayan's family is Somali and Muslim. For Eid, Hooyo (mother, in Somali) gives Ayan new red
  sandals with tiny gold stars: "Everything has a home. Where does it live? Take it home!"
  Ayan leaves them in the sand pile, then in the middle of the floor. On Eid morning, with henna
  flowers on her hands, one sandal is missing. Instead of crying or borrowing, she becomes a
  detective and follows yesterday backwards; little brother Abdi proudly "tidied" it into the
  bread basket. After the Eid prayer, Ayan makes a shoe shelf by the door.
  Join-in line: "Where does it live? Take it home!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ቤቱ የት ነው? ወደ ቤቱ መልሺው!» (said to a girl), «ሁዮ» for the Somali "Hooyo",
  «ዒድ ሙባረክ» and «የዒድ ሶላት» for the Eid prayer.
*/
const story: Story = {
  id: "ayans-red-sandals",
  course: "values-character",
  pack: "story",
  title: { en: "Ayan's Red Sandals", am: "የአያን ቀይ ነጠላ ጫማዎች" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#E86A2A",
  scene: "lib-ayans-red-sandals",
  coverPage: 7,
  teaches: { words: ["sandals", "tidy", "careful", "Eid", "home"] },
  pages: [
    {
      en: 'Eid was coming! Hooyo gave Ayan a present: new red sandals with tiny gold stars. "Take good care of them," she said. "Remember, everything has a home. Where does it live? Take it home!"',
      am: "ዒድ እየደረሰ ነበር! ሁዮ ለአያን ስጦታ ሰጠቻት፦ ትንንሽ የወርቅ ኮከቦች ያሏቸው አዲስ ቀይ ነጠላ ጫማዎች። «በደንብ ተንከባከቢያቸው» አለቻት። «አስታውሺ፣ ሁሉም ነገር ቤት አለው። ቤቱ የት ነው? ወደ ቤቱ መልሺው!»",
    },
    {
      en: "Ayan wore her new sandals to show Tsehay. Then she kicked them off to play in the sand pile. Then she ran home for supper… and left them right there.",
      am: "አያን አዲሶቹን ጫማዎቿን ለፀሐይ ልታሳያት አደረገቻቸው። ከዚያ በአሸዋ ክምሩ ላይ ለመጫወት አወለቀቻቸው። ከዚያ ለእራት ወደ ቤት ሮጠች… እዚያው ትታቸው።",
    },
    {
      en: 'At bedtime Hooyo asked, "Where are your new sandals?" Ayan ran out in the dusk. There they were, one full of sand. Phew! She shook them out, carried them in, and dropped them in the middle of the floor.',
      am: "በመኝታ ሰዓት ሁዮ «አዲሶቹ ጫማዎችሽ የት ናቸው?» ብላ ጠየቀች። አያን በምሽቱ ወደ ውጭ ሮጠች። እዚያ ነበሩ፤ አንዱ በአሸዋ ተሞልቶ። ፉ! አራገፈቻቸው፣ ወደ ቤት ይዛቸው ገባች፣ እና በወለሉ መሃል ጣለቻቸው።",
    },
    {
      en: "Eid morning! Everyone put on their best clothes, and Hooyo painted beautiful henna flowers on Ayan's hands. Then Ayan looked for her sandals. One was there. The other… was gone!",
      am: "የዒድ ጠዋት! ሁሉም ምርጥ ልብሱን ለበሰ፤ ሁዮ በአያን እጆች ላይ የሚያማምሩ የሂና አበቦችን ሳለች። ከዚያ አያን ጫማዎቿን ፈለገች። አንዱ ነበር። ሌላው… የለም!",
    },
    {
      en: 'Ayan looked under the bed. Under the mat. In the basket of clothes. No red sandal! "Everyone is leaving for the Eid prayer soon!" Her eyes filled with tears.',
      am: "አያን ከአልጋው ሥር ፈለገች። ከምንጣፉ ሥር። በልብስ ቅርጫቱ ውስጥ። ቀዩ ጫማ የለም! «ሁሉም አሁን ወደ ዒድ ሶላት ሊሄዱ ነው!» ዓይኖቿ በእንባ ተሞሉ።",
    },
    {
      en: 'Little brother Abdi held up his old blue sandals. "Wear mine?" They were tiny. Ayan almost laughed. Then she wiped her eyes. "No. Let\'s be detectives. Where did I put them last night?"',
      am: "ትንሹ ወንድሟ አብዲ ያረጁ ሰማያዊ ጫማዎቹን ከፍ አደረገ። «የእኔን ታደርጊያለሽ?» በጣም ትንንሽ ነበሩ። አያን ልትስቅ ምንም አልቀራትም። ከዚያ እንባዋን ጠረገች። «አይ። መርማሪዎች እንሁን። ትናንት ማታ የት አስቀመጥኳቸው?»",
    },
    {
      en: 'Ayan thought hard. "Last night I dropped them in the middle of the floor." Abdi\'s eyes went big. "I tidied!" he said proudly. "Where did you tidy it?" Abdi pointed… at the bread basket!',
      am: "አያን በደንብ አሰበች። «ትናንት ማታ በወለሉ መሃል ጣልኳቸው።» የአብዲ ዓይኖች ተጎለጎሉ። «እኔ አስተካከልኩ!» አለ በኩራት። «የት አስተካከልከው?» አብዲ ጠቆመ… ወደ ዳቦ ቅርጫቱ!",
    },
    {
      en: "There was the red sandal, sitting in the bread basket like a little loaf! Everyone laughed, even Hooyo. Ayan hugged the sandal, and Abdi too.",
      am: "ቀዩ ጫማ እንደ ትንሽ ዳቦ በዳቦ ቅርጫቱ ውስጥ ተቀምጦ ነበር! ሁሉም ሳቁ፣ ሁዮም ጭምር። አያን ጫማዋን አቀፈች፤ አብዲንም ጭምር።",
    },
    {
      en: 'Ayan put on her sandals, and they all walked to the Eid prayer in their best clothes. "Eid Mubarak!" said everyone, to everyone.',
      am: "አያን ጫማዎቿን አደረገች፤ ሁሉም ምርጥ ልብሳቸውን ለብሰው ወደ ዒድ ሶላት ሄዱ። «ዒድ ሙባረክ!» አለ ሁሉም ለሁሉም።",
    },
    {
      en: 'That afternoon, Ayan made something special: a little shelf by the door, from a board and two stones, just for shoes. "Where do sandals live?" she asked Abdi. "HERE!" he shouted.',
      am: "ከሰዓት በኋላ አያን አንድ ልዩ ነገር ሠራች፦ ከአንድ ጣውላና ከሁለት ድንጋዮች በበሩ አጠገብ ለጫማ ብቻ የሆነ ትንሽ መደርደሪያ። «ጫማዎች የሚኖሩት የት ነው?» ብላ አብዲን ጠየቀችው። «እዚህ!» ብሎ ጮኸ።",
    },
    {
      en: "From then on, when Ayan came home she sang: Where does it live? Take it home! Sandals on the shelf. Scarf on the hook. Book in the bag. And Abdi sang it too, even louder.",
      am: "ከዚያ ወዲህ አያን ወደ ቤት ስትገባ ትዘምር ነበር፦ ቤቱ የት ነው? ወደ ቤቱ መልሺው! ጫማ በመደርደሪያው። ሻርፕ በመስቀያው። መጽሐፍ በቦርሳው። አብዲም ዘመረው፤ ከእሷም በላይ ጮክ ብሎ።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "What did Ayan do instead of crying or borrowing Abdi's sandals? How did being a detective help?",
        "What are your special things? Where does each one live in our home?",
      ],
      am: [
        "አያን ከማልቀስ ወይም የአብዲን ጫማ ከመዋስ ይልቅ ምን አደረገች? መርማሪ መሆኗ እንዴት ረዳት?",
        "የእናንተ ልዩ ነገሮች ምንድን ናቸው? እያንዳንዳቸው በቤታችን ውስጥ የሚኖሩት የት ነው?",
      ],
    },
    activity: {
      en: 'Give three things a "home" together: a place for shoes, a hook for a bag or scarf, a box for toys. Make a little picture label for each home. Then sing Ayan\'s song when you put them away.',
      am: "ለሦስት ነገሮች አብራችሁ «ቤት» ስጡ፦ ለጫማ ቦታ፣ ለቦርሳ ወይም ለሻርፕ መስቀያ፣ ለአሻንጉሊት ሳጥን። ለእያንዳንዱ ቤት ትንሽ የሥዕል ምልክት አዘጋጁ። ስታስቀምጧቸው የአያንን ዘፈን ዘምሩ።",
    },
  },
};

export default story;
