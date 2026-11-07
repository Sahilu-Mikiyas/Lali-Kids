import type { Story } from "../stories";

/*
  "Ashenda's Song": in August, at the end of the rainy-season fast, girls in the north of
  Ethiopia (Tigray, and in Amhara, where it is called Ashendiye or Shadey) celebrate Ashenda:
  they braid their hair, put on their best white dresses with bright borders, tie the long
  ashenda grass round their waists like a swishing skirt, and go from house to house with a
  drum, singing, dancing and being given bread and blessings. Shy Tsehay visits her cousins for
  the festival; she can play the drum but her voice hides, until an old grandmother at the
  last house asks her, kindly, to come close and sing just for her.
  The repeated line to join in on: "Ashenda is here! Open the door!" (our own line, not a
  traditional lyric).
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the repeated line (አሸንዳ ደረሰ! በሩን ክፈቱ!), «ሹሩባ» for the braids, the regional names on page 1,
  and the drum sound (ቱም ቱም ታ).
*/
const story: Story = {
  id: "ashenda-song",
  pack: "story",
  title: { en: "Ashenda's Song", am: "የአሸንዳ ዘፈን" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#7FB848",
  scene: "lib-ashenda-song",
  coverPage: 11,
  teaches: { words: ["ashenda", "braids", "grass", "drum", "sing", "voice"] },
  pages: [
    {
      en: 'In August, when the rains made the grass grow tall, shy Tsehay went north to visit her cousins. "Ashenda is coming!" they cheered.',
      am: "በነሐሴ፣ ዝናቡ ሣሩን ሲያረዝመው፣ ዓይናፋሯ ፀሐይ የአጎቶቿን ልጆች ልትጠይቅ ወደ ሰሜን ሄደች። «አሸንዳ እየመጣ ነው!» ብለው በደስታ ጮኹ።",
    },
    {
      en: "In Tigray they call it Ashenda; in other places, Ashendiye or Shadey. Auntie braided Tsehay's hair into tiny, tidy rows. Tsehay felt beautiful.",
      am: "በትግራይ አሸንዳ ይሉታል፤ በሌሎች ቦታዎች አሸንድዬ ወይም ሻደይ። አክስቷ የፀሐይን ፀጉር በትናንሽ፣ ንጹሕ ረድፎች ሹሩባ ሠራችላት። ፀሐይ ውብ እንደሆነች ተሰማት።",
    },
    {
      en: "The cousins picked the long ashenda grass and tied it round their waists, over their white dresses. Swish, swish, went the grass skirts!",
      am: "የአጎቷ ልጆች ረጅሙን የአሸንዳ ሣር ለቅመው በነጭ ቀሚሳቸው ላይ በወገባቸው ዙሪያ አሰሩት። ሽው፣ ሽው አሉ የሣር ቀሚሶቹ!",
    },
    {
      en: 'Then they practised the song. The drum went tum-tum-ta! "Ashenda is here! Open the door!" the cousins sang, loud and proud.',
      am: "ከዚያ ዘፈኑን ተለማመዱ። ከበሮው ቱም ቱም ታ! አለ። «አሸንዳ ደረሰ! በሩን ክፈቱ!» ብለው የአጎቷ ልጆች ጮክ ብለውና በኩራት ዘመሩ።",
    },
    {
      en: "Tsehay opened her mouth... but no sound came out. Her cheeks went hot. She could play the drum, tum-tum-ta, but her voice was hiding.",
      am: "ፀሐይ አፏን ከፈተች... ግን ድምፅ አልወጣም። ጉንጮቿ ጋሉ። ከበሮውን ቱም ቱም ታ ማለት ትችል ነበር፤ ድምፅዋ ግን ተደብቆ ነበር።",
    },
    {
      en: "They went from house to house. At every door the girls sang and danced, and people came out smiling, with bread and blessings. Tsehay only drummed.",
      am: "ከቤት ወደ ቤት ሄዱ። በየበሩ ልጃገረዶቹ ዘመሩ፣ ጨፈሩ፤ ሰዎችም ዳቦና ምርቃት ይዘው በፈገግታ ወጡ። ፀሐይ ግን ከበሮ ብቻ መታች።",
    },
    {
      en: 'Lali landed on the drum. "Buzz! You don\'t have to be loud," she said. "Just sing for one person. Just one."',
      am: "ላሊ ከበሮው ላይ አረፈች። «ቡዝ! መጮኽ የለብሽም» አለች። «ለአንድ ሰው ብቻ ዝፈኚ። ለአንድ ብቻ።»",
    },
    {
      en: 'At the very last house, an old grandmother sat by her door. "My ears are old," she said kindly. "Come close, little one, and sing for me."',
      am: "በመጨረሻው ቤት አንዲት አሮጊት በበራቸው አጠገብ ተቀምጠው ነበር። «ጆሮዬ አርጅቷል» አሉ በደግነት። «ቅረቢ ልጄ፣ ዝፈኚልኝ።»",
    },
    {
      en: 'Tsehay stepped close. Her voice came out small and wobbly: "Ashenda is here..." The old grandmother smiled and closed her eyes to listen.',
      am: "ፀሐይ ቀረብ አለች። ድምፅዋ ትንሽና እየተንቀጠቀጠ ወጣ፤ «አሸንዳ ደረሰ...» አሮጊቷ ፈገግ ብለው ለማዳመጥ ዓይናቸውን ጨፈኑ።",
    },
    {
      en: 'Tsehay took a breath and sang a little louder: "Open the door!" Her cousins joined in, soft at first, then strong, all together.',
      am: "ፀሐይ ትንፋሽ ወስዳ ትንሽ ጮክ ብላ ዘመረች፤ «በሩን ክፈቱ!» የአጎቷ ልጆች ተቀላቀሉ፤ መጀመሪያ በቀስታ፣ ከዚያ በብርታት፣ ሁሉም በአንድነት።",
    },
    {
      en: 'The old grandmother clapped. She gave Tsehay a warm piece of bread and a blessing. "Your voice is like a little bird in the morning."',
      am: "አሮጊቷ አጨበጨቡ። ለፀሐይ ትኩስ ዳቦ ሰጥተው መረቋት። «ድምፅሽ እንደ ጠዋት ትንሽ ወፍ ነው።»",
    },
    {
      en: 'That evening, the girls danced in a big circle, grass skirts swishing, drums booming. Tsehay sang the loudest of all: "Ashenda is here! Open the door!"',
      am: "በዚያ ምሽት ልጃገረዶቹ በትልቅ ክብ ጨፈሩ፤ የሣር ቀሚሶቹ ሽው ሽው አሉ፣ ከበሮዎቹ ዱም ዱም አሉ። ፀሐይ ከሁሉም አብልጣ ዘመረች፤ «አሸንዳ ደረሰ! በሩን ክፈቱ!»",
    },
    {
      en: 'At bedtime, Tsehay hung her grass skirt by the window. "I found my voice," she whispered to Lali. "It was there all along."',
      am: "በመኝታ ሰዓት ፀሐይ የሣር ቀሚሷን በመስኮቱ አጠገብ ሰቀለች። «ድምፄን አገኘሁት» አለች ለላሊ በሹክሹክታ። «ሁልጊዜም እዚሁ ነበር።»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Tsehay's voice was hiding at first. What helped her find it? Is there something that feels hard for you to do in front of others?",
        "Lali said, \"Just sing for one person.\" What small step could help you try something brave?",
      ],
      am: [
        "የፀሐይ ድምፅ መጀመሪያ ተደብቆ ነበር። እንድታገኘው የረዳት ምንድን ነው? በሌሎች ፊት ማድረግ የሚከብዳችሁ ነገር አለ?",
        "ላሊ «ለአንድ ሰው ብቻ ዝፈኚ» አለች። ደፋር ነገር ለመሞከር የሚረዳችሁ ትንሽ እርምጃ ምንድን ነው?",
      ],
    },
    activity: {
      en: "Make an ashenda grass skirt from strips of green paper taped to a ribbon, and a drum from a tin or a box. Sing a song softly to one person, then a bit louder to two, then to the whole family.",
      am: "ከአረንጓዴ ወረቀት ቁርጥራጮች በሪባን ላይ ለጥፋችሁ የአሸንዳ የሣር ቀሚስ ሥሩ፤ ከቆርቆሮ ወይም ከሳጥን ከበሮ ሥሩ። መጀመሪያ ለአንድ ሰው በቀስታ ዝፈኑ፣ ከዚያ ለሁለት ትንሽ ጮክ ብላችሁ፣ ከዚያ ለቤተሰቡ ሁሉ።",
    },
  },
};

export default story;
