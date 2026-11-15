import type { Story } from "../../../stories";

/*
  "Gugu's Soapy Song" (level 1: handwashing with soap). The package's taster.
  Gugu and Anbessa make little animals from red clay in Grandma's yard. Lunch is ready, and Gugu
  gives his hands a quick splash: the red clay is still between his fingers, round his thumbs and
  under his nails. Grandma says germs hide in the very same places, only they're too tiny to see.
  Gugu works out that he needs soap and every hiding place: the six scrubbing steps (palms, backs,
  in between, backs of the fingers, thumbs, fingertips and nails), for as long as his song sung
  twice (about 20 seconds), then rinse and dry on a clean cloth. When we wash: before eating,
  after the toilet, after playing outside or with animals, after a sneeze.
  Health facts follow WHO and UNICEF handwashing guidance (the six steps; at least 20 seconds).
  Join-in line: "Scrub, scrub, bubbles up!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ፈግፍግ፣ ፈግፍግ፣ አረፋ ይነሣ!» and the names of the six steps on pages 4 to 6.
*/
const story: Story = {
  id: "gugus-soapy-song",
  course: "healthy-safe",
  pack: "story",
  title: { en: "Gugu's Soapy Song", am: "የጉጉ የሳሙና ዘፈን" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#2F8FD0",
  scene: "lib-gugus-soapy-song",
  coverPage: 5,
  teaches: { words: ["soap", "wash", "hands", "germs", "clean"] },
  pages: [
    {
      en: "Gugu and Anbessa were making little clay animals in Grandma's yard. A cow, a goat, a wobbly lion. Their hands were red with clay, all the way up.",
      am: "ጉጉና አንበሳ በአያቴ ግቢ ውስጥ ከቀይ ጭቃ ትንንሽ እንስሳት እየሠሩ ነበር። ላም፣ ፍየል፣ የሚንገዳገድ አንበሳ። እጆቻቸው በጭቃ ቀልተው ነበር።",
    },
    {
      en: '"Lunch is ready!" called Grandma. "Wash your hands, my dears." Gugu ran to the jug. Splash! Shake, shake. "Done!"',
      am: "«ምሳ ደርሷል!» አለች አያቴ። «ልጆቼ፣ እጃችሁን ታጠቡ።» ጉጉ ወደ ማስታጠቢያው ሮጠ። ሽው! እጁን አራገፈ። «ጨረስኩ!»",
    },
    {
      en: "Grandma held up his hands. There was red clay between his fingers, round his thumbs and under every nail. \"Oh!\" said Gugu.",
      am: "አያቴ እጆቹን አንሥታ አየች። በጣቶቹ መካከል፣ በአውራ ጣቶቹ ዙሪያና በእያንዳንዱ ጥፍሩ ሥር ቀይ ጭቃ ነበር። «ኧረ!» አለ ጉጉ።",
    },
    {
      en: '"Germs are like that clay," said Grandma, "only too tiny to see. They hide in the very same places. Water alone can\'t chase them out." Gugu thought hard. "Then I need soap. And every hiding place!"',
      am: "«ጀርሞች እንደዚህ ጭቃ ናቸው» አለች አያቴ፣ «ግን ለዓይን አይታዩም። የሚደበቁትም እዚያው ቦታ ነው። ውሃ ብቻውን አያስወጣቸውም።» ጉጉ አሰበ። «እንግዲያው ሳሙና ያስፈልገኛል። ሁሉንም መደበቂያ ቦታ ደግሞ!»",
    },
    {
      en: "Wet hands, then soap. Palm to palm, round and round. Then the backs of the hands. Scrub, scrub, bubbles up!",
      am: "እጅን ማርጠብ፣ ከዚያ ሳሙና። መዳፍ ከመዳፍ፣ ዙሪያ ዙሪያ። ከዚያ የእጅ ጀርባ። ፈግፍግ፣ ፈግፍግ፣ አረፋ ይነሣ!",
    },
    {
      en: "Fingers in between, like a little fence. Then the backs of the fingers, curled up tight. Scrub, scrub, bubbles up!",
      am: "ጣቶችን አጠላልፎ፣ እንደ ትንሽ አጥር። ከዚያ የጣቶች ጀርባ፣ ታጥፈው። ፈግፍግ፣ ፈግፍግ፣ አረፋ ይነሣ!",
    },
    {
      en: "Each thumb, round and round. Then the fingertips and nails, scratched on the palm. The clay was running away! Scrub, scrub, bubbles up!",
      am: "እያንዳንዱን አውራ ጣት፣ ዙሪያ ዙሪያ። ከዚያ የጣት ጫፎችንና ጥፍሮችን በመዳፍ ላይ ፈግፍጎ። ጭቃው እየሸሸ ነው! ፈግፍግ፣ ፈግፍግ፣ አረፋ ይነሣ!",
    },
    {
      en: '"How long do I scrub?" asked Gugu. "As long as a little song, sung twice," said Grandma. So Gugu made one up, and sang it twice.',
      am: "«እስከ መቼ ልፈግፍግ?» ብሎ ጠየቀ ጉጉ። «ትንሽ ዘፈን ሁለት ጊዜ እስኪዘፈን ድረስ» አለች አያቴ። ጉጉም ዘፈን ፈጥሮ ሁለት ጊዜ ዘፈነው።",
    },
    {
      en: "Anbessa poured clean water from the jug, and the bubbles slid away. Then Gugu dried his hands on a clean cloth. Not a speck of clay left!",
      am: "አንበሳ ከማስታጠቢያው ንጹሕ ውሃ አፈሰሰ፤ አረፋውም ታጥቦ ሄደ። ከዚያ ጉጉ እጁን በንጹሕ ጨርቅ አደረቀ። አንዲት የጭቃ ነጥብ አልቀረችም!",
    },
    {
      en: '"When do we wash like this?" asked Anbessa. Gugu counted on his clean fingers. "Before we eat. After the toilet. After playing outside, or with the goats. And after a big sneeze!"',
      am: "«እንዲህ የምንታጠበው መቼ ነው?» ብሎ ጠየቀ አንበሳ። ጉጉ በንጹሕ ጣቶቹ ቆጠረ። «ከመብላታችን በፊት። ከመጸዳጃ በኋላ። ውጭ ወይም ከፍየሎች ጋር ከተጫወትን በኋላ። ትልቅ ካስነጠሰንም በኋላ!»",
    },
    {
      en: "Then they sat down to injera and lentils. Gugu rolled a gursha with his clean hand, and gave it to Grandma.",
      am: "ከዚያ እንጀራና ምስር ሊበሉ ተቀመጡ። ጉጉ በንጹሕ እጁ ጎርሻ ጠቅልሎ ለአያቴ አጎረሳት።",
    },
    {
      en: "After lunch, Gugu went to the toilet, and then straight back to the soap, singing. Anbessa joined in, and so did Grandma: Scrub, scrub, bubbles up!",
      am: "ከምሳ በኋላ ጉጉ ወደ መጸዳጃ ሄደ፤ ከዚያ በቀጥታ እየዘፈነ ወደ ሳሙናው ተመለሰ። አንበሳም አያቴም አብረው ዘፈኑ፦ ፈግፍግ፣ ፈግፍግ፣ አረፋ ይነሣ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Where did the clay hide on Gugu's hands? Where do germs like to hide?",
        "When do we wash our hands with soap in our family?",
      ],
      am: [
        "ጭቃው በጉጉ እጅ ላይ የተደበቀው የት ነበር? ጀርሞች መደበቅ የሚወዱት የት ነው?",
        "በቤተሰባችን እጃችንን በሳሙና የምንታጠበው መቼ ነው?",
      ],
    },
    activity: {
      en: "Put a little flour, ash or charcoal dust on your child's hands, then let them rinse with water only and look between the fingers. Then wash together with soap and the six steps (palms, backs, in between, backs of the fingers, thumbs, fingertips), singing a short song twice, about 20 seconds. Washing with soap at the key times (before eating or cooking, after the toilet, after cleaning a baby's bottom) is one of the best ways to stop tummy bugs and coughs and colds spreading.",
      am: "በልጅዎ እጅ ላይ ትንሽ ዱቄት፣ አመድ ወይም የከሰል ዱቄት ያድርጉ፤ በውሃ ብቻ ታጥቦ በጣቶቹ መካከል እንዲያይ ያድርጉ። ከዚያ በሳሙናና በስድስቱ ደረጃዎች (መዳፍ፣ ጀርባ፣ በጣቶች መካከል፣ የጣቶች ጀርባ፣ አውራ ጣት፣ የጣት ጫፍ) አብራችሁ ታጠቡ፤ አጭር ዘፈን ሁለት ጊዜ፣ 20 ሰከንድ ያህል፣ እየዘፈናችሁ። በዋና ዋና ጊዜያት (ከመብላት ወይም ከማብሰል በፊት፣ ከመጸዳጃ በኋላ፣ የሕፃን መቀመጫ ካጸዱ በኋላ) በሳሙና መታጠብ የሆድ ሕመምንና ጉንፋንን ከመዛመት ለመከላከል ከሁሉ የተሻሉ መንገዶች አንዱ ነው።",
    },
  },
};

export default story;
