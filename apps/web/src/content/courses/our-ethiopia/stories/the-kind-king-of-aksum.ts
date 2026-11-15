import type { Story } from "../../../stories";

/*
  "The Kind King of Aksum" (level 4: stories from our history: Negash and the first hijra).
  Ayan's family and Haben's family travel north together to the village of Negash, with its old
  mosque. Aabo tells the story: about fourteen hundred years ago some of the first followers of
  the Prophet Muhammad, treated badly in Mecca because of their faith, were told to go to
  Abyssinia, where a just king ruled. They crossed the Red Sea. The Christian king of Aksum (the
  Najashi) listened to them, and to those who wanted them sent back, and said they were safe in
  his land. They lived there in peace; the mosque at Negash remembers them. The two families
  share food, as neighbours have for a very long time. Back at school, Ayan sees a new girl,
  Nuria, sitting alone, and remembers the kind king: she listens, and welcomes her in.
  Join-in line: "Welcome, friend, you are safe here!"

  Facts and care: this is the first hijra (about 615 CE) as told in Islamic tradition; the
  Prophet is named respectfully and never drawn; the travellers appear only as small figures far
  away. The king of Aksum, called the Najashi, is remembered by Muslims for his justice and
  kindness. The Negash mosque, in the north, is said to be among the oldest in Africa, and some
  of the companions are buried there. Told simply, as a story of welcome between faiths.

  AMHARIC: first draft, to be checked by a native-speaking editor (and a Muslim reader) before
  launch, especially the join-in line «እንኳን ደህና መጣህ ወዳጄ፣ እዚህ ደኅና ነህ!» (here in the plural
  form «እንኳን ደህና መጣችሁ፣ እዚህ ደኅና ናችሁ!»), «ነጋሽ», «ነጃሺ» and «ሂጅራ».
*/
const story: Story = {
  id: "the-kind-king-of-aksum",
  course: "our-ethiopia",
  pack: "story",
  title: { en: "The Kind King of Aksum", am: "ደጉ የአክሱም ንጉሥ" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#2E9A8A",
  scene: "lib-the-kind-king-of-aksum",
  coverPage: 6,
  teaches: { words: ["welcome", "safe", "king", "listen", "history", "neighbours"] },
  pages: [
    {
      en: 'In the holidays, Ayan\'s family and Haben\'s family travelled north together to the village of Negash. On a hill stood an old mosque. "It is one of the oldest in all of Africa," said Aabo.',
      am: "በእረፍት ጊዜ የአያን ቤተሰብና የሐበን ቤተሰብ አብረው ወደ ሰሜን ወደ ነጋሽ መንደር ተጓዙ። በኮረብታ ላይ ጥንታዊ መስጊድ ቆሞ ነበር። «በመላው አፍሪካ ካሉት በጣም ጥንታዊ መስጊዶች አንዱ ነው» አሉ አቦ።",
    },
    {
      en: '"Why is it here?" asked Ayan. Aabo sat down on a warm stone. "About fourteen hundred years ago, in the city of Mecca across the Red Sea, the first followers of the Prophet Muhammad were treated badly because of their new faith."',
      am: "«ለምን እዚህ ሆነ?» ብላ ጠየቀች አያን። አቦ በሞቀ ድንጋይ ላይ ተቀመጡ። «ከአሥራ አራት መቶ ዓመታት ገደማ በፊት፣ ከቀይ ባሕር ማዶ በመካ ከተማ፣ የነቢዩ ሙሐመድ የመጀመሪያ ተከታዮች በአዲሱ እምነታቸው ምክንያት ይበደሉ ነበር።»",
    },
    {
      en: '"So the Prophet told some of them: go across the sea to Abyssinia. Its king is just. In his land, no one is treated unfairly."',
      am: "«ስለዚህ ነቢዩ ለአንዳንዶቹ እንዲህ አሏቸው፦ ባሕሩን ተሻግራችሁ ወደ ሐበሻ ሂዱ። ንጉሡ ፍትሐዊ ነው። በአገሩ ማንም አይበደልም።»",
    },
    {
      en: '"Men, women and children crossed the Red Sea in little boats. They had left their homes behind. Would anyone welcome them?" Ayan held her breath.',
      am: "«ወንዶች፣ ሴቶችና ልጆች በትንንሽ ጀልባዎች ቀይ ባሕርን ተሻገሩ። ቤታቸውን ትተው መጥተው ነበር። ማንም ይቀበላቸው ይሆን?» አያን ትንፋሿን ያዘች።",
    },
    {
      en: '"They came to the king of Aksum, a Christian king. People call him the Najashi. But others came after them and asked the king to send them back."',
      am: "«ወደ አክሱም ንጉሥ፣ ወደ ክርስቲያኑ ንጉሥ መጡ። ሰዎች ነጃሺ ይሉታል። ሌሎች ግን ተከትለዋቸው መጥተው ንጉሡ እንዲመልሳቸው ጠየቁ።»",
    },
    {
      en: '"The king did not decide quickly. He listened to both sides. The travellers told him about their faith, and spoke of Mary and of Jesus, and the king listened very carefully."',
      am: "«ንጉሡ በችኮላ አልወሰነም። ሁለቱንም ወገኖች አዳመጠ። መንገደኞቹ ስለ እምነታቸው ነገሩት፤ ስለ ማርያምና ስለ ኢየሱስም ተናገሩ፤ ንጉሡም በጣም በጥንቃቄ አዳመጠ።»",
    },
    {
      en: '"Then he said: You are safe in my land. I will not send you away." Haben clapped softly. Welcome, friend, you are safe here!',
      am: "«ከዚያ እንዲህ አለ፦ በአገሬ ደኅና ናችሁ። አላባርራችሁም።» ሐበን በቀስታ አጨበጨበች። እንኳን ደህና መጣችሁ፣ እዚህ ደኅና ናችሁ!",
    },
    {
      en: '"They lived here in peace for many years," said Aabo, "and some are buried here at Negash." Haben\'s mother unwrapped warm bread, and Hooyo opened a box of sweets. The two families shared everything. "Neighbours for a long, long time," smiled Haben\'s mother.',
      am: "«ብዙ ዓመታት እዚህ በሰላም ኖሩ» አሉ አቦ፤ «አንዳንዶቹም እዚህ ነጋሽ ተቀብረዋል።» የሐበን እናት ትኩስ ዳቦ ፈታች፤ ሁዮም የጣፋጭ ሳጥን ከፈተች። ሁለቱ ቤተሰቦች ሁሉን ተካፈሉ። «ለረጅም ረጅም ዘመን ጎረቤቶች» አለች የሐበን እናት ፈገግ ብላ።",
    },
    {
      en: "After the holidays there was a new girl in Ayan's class. Her name was Nuria, and her family had just moved from far away. At break time she sat alone on the bench, holding her bag tight.",
      am: "ከእረፍቱ በኋላ በአያን ክፍል አዲስ ልጅ ነበረች። ስሟ ኑሪያ ነበር፤ ቤተሰቧ ገና ከሩቅ ቦታ ተዛውረው ነበር። በእረፍት ሰዓት ቦርሳዋን አጥብቃ ይዛ ብቻዋን አግዳሚ ወንበር ላይ ተቀመጠች።",
    },
    {
      en: 'Some children stared. Ayan thought of the kind king. He didn\'t decide quickly; he listened. So Ayan sat down next to Nuria. "Where did you come from? What do you like to play?"',
      am: "አንዳንድ ልጆች አፈጠጡ። አያን ደጉን ንጉሥ አሰበች። በችኮላ አልወሰነም፤ አዳመጠ። ስለዚህ አያን ከኑሪያ አጠገብ ተቀመጠች። «ከየት መጣሽ? ምን መጫወት ትወጃለሽ?»",
    },
    {
      en: 'Nuria talked, slowly at first, then faster: about her old town, her grandma, her cat. Haben came over too, and they shared their kolo. "Welcome, friend," said Ayan. "You are safe here!"',
      am: "ኑሪያ አወራች፣ መጀመሪያ ቀስ ብላ፣ ከዚያ በፍጥነት፦ ስለ ቀድሞ ከተማዋ፣ ስለ አያቷ፣ ስለ ድመቷ። ሐበንም መጣች፤ ቆሏቸውንም ተካፈሉ። «እንኳን ደህና መጣሽ ወዳጄ» አለች አያን። «እዚህ ደኅና ነሽ!»",
    },
    {
      en: 'That evening Ayan told Aabo. He hugged her tight. "Long ago a king welcomed travellers who needed a safe place. Today you welcomed one. That is our history, alive." Welcome, friend, you are safe here!',
      am: "በዚያ ምሽት አያን ለአቦ ነገረቻቸው። አጥብቀው አቀፏት። «ከብዙ ዘመን በፊት አንድ ንጉሥ መጠጊያ የፈለጉ መንገደኞችን ተቀበለ። ዛሬ አንቺ አንዷን ተቀበልሽ። ያ ታሪካችን ነው፤ ሕያው ሆኖ።» እንኳን ደህና መጣሽ ወዳጄ፣ እዚህ ደኅና ነሽ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "The king listened to both sides before he decided. Why is it good to listen before we decide?",
        "Have you ever been new somewhere? What helped you feel welcome? How can we welcome someone new?",
      ],
      am: [
        "ንጉሡ ከመወሰኑ በፊት ሁለቱንም ወገኖች አዳመጠ። ከመወሰናችን በፊት ማዳመጥ ለምን ጥሩ ነው?",
        "በአንድ ቦታ አዲስ ሆናችሁ ታውቃላችሁ? እንደተፈለጋችሁ እንዲሰማችሁ የረዳችሁ ምንድን ነው? አዲስ ሰውን እንዴት መቀበል እንችላለን?",
      ],
    },
    activity: {
      en: "Make a welcome card for a new child at school or a new neighbour: draw an open door and write \"Welcome!\" in as many of your family's languages as you can. Then plan one kind thing to do for them this week.",
      am: "በትምህርት ቤት ላለ አዲስ ልጅ ወይም ለአዲስ ጎረቤት የእንኳን ደህና መጣህ ካርድ ሥሩ፦ ክፍት በር ሣሉ፤ «እንኳን ደህና መጣህ/ሽ!» የሚለውን በቤተሰባችሁ ቋንቋዎች በተቻለ መጠን ጻፉ። ከዚያ በዚህ ሳምንት የምታደርጉላቸውን አንድ ደግ ነገር አቅዱ።",
    },
  },
};

export default story;
