import type { Story } from "../../../stories";

/*
  "Abdi and the Lost Goat" (Amharic Readers, level 4): a longer story in three chapters (ምዕራፍ),
  each starting with its chapter heading. Chapter 1, "Where is Nechu?": Abdi's little white kid
  goat is gone one morning. Chapter 2, "Hoof prints": Abdi and his big sister Ayan follow her
  tracks across the dry plain near Jijiga to a dry riverbed, where Nechu is caught in a thorny
  acacia; Abdi is scared of the thorns, Ayan shows him how to move slowly, and they free her.
  Chapter 3, "A bell for Nechu": home, Hooyo ties a little bell on the goat, and Ayan explains
  that chapters are like the rooms of a house: one long story, in parts. The join-in line is
  "Nechu, where are you? Baa, baa!" (ነጩ፣ የት ነሽ? ሜእ፣ ሜእ!).

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the goat's name ነጩ ("the little white one"), the bleat «ሜእ» and «ደረቅ ወንዝ» for the dry riverbed.
*/
const story: Story = {
  id: "abdis-lost-goat",
  course: "amharic-readers",
  pack: "story",
  title: { en: "Abdi and the Lost Goat", am: "አብዲና የጠፋችው ፍየል" },
  category: "Fidel",
  ageBands: ["6-7", "8-9"],
  isFree: true,
  color: "#C9822B",
  scene: "lib-abdis-lost-goat",
  coverPage: 7,
  teaches: { words: ["ምዕራፍ አንድ", "ምዕራፍ ሁለት", "ምዕራፍ ሦስት", "ፍየል", "ኮቴ"] },
  pages: [
    {
      en: `Chapter 1: Where is Nechu? Abdi has a little white kid goat called Nechu. Every morning she skips to him and nibbles his sleeve. But this morning, her pen is empty.`,
      am: "ምዕራፍ አንድ፦ ነጩ የት ናት? አብዲ ነጩ የምትባል ትንሽ ነጭ የፍየል ግልገል አለችው። በየጧቱ እየዘለለች ወደ እሱ ትመጣና እጅጌውን ትግጣለች። ዛሬ ጧት ግን በረቷ ባዶ ነው።",
    },
    {
      en: `"Nechu!" calls Abdi. He looks behind the house, under the cart, inside the water barrel. Nechu, where are you? Baa, baa! But no little goat answers.`,
      am: "«ነጩ!» ብሎ ጠራ አብዲ። ከቤቱ ጀርባ፣ ከጋሪው ሥር፣ በውሃ በርሜሉ ውስጥ ፈለገ። ነጩ፣ የት ነሽ? ሜእ፣ ሜእ! ግን ምንም ትንሽ ፍየል አልመለሰችም።",
    },
    {
      en: `Abdi's lip wobbles. His big sister Ayan kneels down beside the gate. "Look, Abdi! Tiny hoof prints in the dust. Nechu went this way."`,
      am: "የአብዲ ከንፈር ተንቀጠቀጠ። ታላቅ እህቱ አያን ከበሩ አጠገብ ተንበረከከች። «ተመልከት፣ አብዲ! በአቧራው ላይ ትንንሽ የኮቴ ምልክቶች። ነጩ በዚህ በኩል ሄዳለች።»",
    },
    {
      en: `Hooyo gives them a water bottle and some bread. "Stay together," she says, "and be home before the sun is high." End of chapter one.`,
      am: "ሁዮ የውሃ ኮዳና ትንሽ ዳቦ ሰጠቻቸው። «አብራችሁ ሁኑ» አለች፣ «ፀሐይ ሳትጠነክር ቤት ተመለሱ።» የምዕራፍ አንድ መጨረሻ።",
    },
    {
      en: `Chapter 2: Hoof prints. Ayan and Abdi follow the little prints across the dry, sandy plain, past tall termite hills and thorny acacia trees. Nechu, where are you? Baa, baa!`,
      am: "ምዕራፍ ሁለት፦ የኮቴ ምልክቶች። አያንና አብዲ ትንንሾቹን ምልክቶች ተከትለው በደረቁ አሸዋማ ሜዳ ላይ፣ በረጃጅም የምስጥ ኩይሳዎችና በእሾሃማ የግራር ዛፎች አጠገብ አለፉ። ነጩ፣ የት ነሽ? ሜእ፣ ሜእ!",
    },
    {
      en: `The prints lead down into a dry riverbed. There is no water, only smooth stones and sand. Then, very faintly, they hear something: "Meh… meh…"`,
      am: "ምልክቶቹ ወደ አንድ ደረቅ ወንዝ ይወርዳሉ። ውሃ የለም፤ ለስላሳ ድንጋዮችና አሸዋ ብቻ። ከዚያ በጣም በቀስታ አንድ ድምፅ ሰሙ፦ «ሜእ… ሜእ…»",
    },
    {
      en: `There is Nechu, caught in a thorny acacia bush! Her coat is tangled in the long white thorns. She is not hurt, but she cannot get out.`,
      am: "ነጩ እዚያ አለች፤ እሾሃማ የግራር ቁጥቋጦ ውስጥ ተይዛ! ጠጉሯ በረጃጅሞቹ ነጫጭ እሾሆች ተጠላልፏል። አልተጎዳችም፤ ግን መውጣት አልቻለችም።",
    },
    {
      en: `Abdi reaches in, and a thorn pricks him. "Ow!" He pulls back, scared. "Slowly," says Ayan. "One branch at a time." Gently, gently, they lift each branch. Nechu is free! End of chapter two.`,
      am: "አብዲ እጁን ሲያስገባ እሾህ ወጋው። «አይ!» ፈርቶ ወደ ኋላ አለ። «ቀስ ብለህ» አለች አያን። «አንድ ቅርንጫፍ በአንድ ጊዜ።» በቀስታ፣ በቀስታ እያንዳንዱን ቅርንጫፍ አነሡ። ነጩ ነፃ ወጣች! የምዕራፍ ሁለት መጨረሻ።",
    },
    {
      en: `Chapter 3: A bell for Nechu. Abdi carries Nechu all the way home. Hooyo hugs them both. "What brave, patient children," she says.`,
      am: "ምዕራፍ ሦስት፦ ለነጩ ቃጭል። አብዲ ነጩን አቅፎ እስከ ቤት ተሸከማት። ሁዮ ሁለቱንም አቀፈቻቸው። «እንዴት ያላችሁ ደፋርና ታጋሽ ልጆች ናችሁ» አለች።",
    },
    {
      en: `Then Hooyo ties a little brass bell round Nechu's neck. Ding, ding! "Now if she wanders off again, we will hear her." Nechu skips about, ringing, and nibbles Abdi's sleeve.`,
      am: "ከዚያ ሁዮ በነጩ አንገት ላይ ትንሽ የነሐስ ቃጭል አሰረች። ቅጭል፣ ቅጭል! «አሁን እንደገና ብትጠፋ እንሰማታለን።» ነጩ እየቃጨለች ዘለለች፤ የአብዲንም እጅጌ ጋጠች።",
    },
    {
      en: `That night Abdi asks, "Ayan, why does our story have three parts?" "Those are chapters," says Ayan. "A long story has chapters, like a house has rooms. One story, in parts."`,
      am: "በዚያ ምሽት አብዲ «አያን፣ የእኛ ታሪክ ለምን ሦስት ክፍል አለው?» ብሎ ጠየቀ። «እነዚያ ምዕራፎች ናቸው» አለች አያን። «ረጅም ታሪክ ልክ ቤት ክፍሎች እንዳሉት ምዕራፎች አሉት። አንድ ታሪክ፣ በክፍሎች።»",
    },
    {
      en: `"Chapter one, Nechu was lost," says Abdi sleepily. "Chapter two, we found her. Chapter three…" "…a bell," whispers Ayan. Outside, Nechu's bell goes ding, ding. The end.`,
      am: "«ምዕራፍ አንድ፣ ነጩ ጠፋች» አለ አብዲ እያንቀላፋ። «ምዕራፍ ሁለት፣ አገኘናት። ምዕራፍ ሦስት…» «…ቃጭል» አለች አያን በሹክሹክታ። ውጭ የነጩ ቃጭል ቅጭል፣ ቅጭል አለ። ተፈጸመ።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["What happened in chapter one? Chapter two? Chapter three?", "How did Ayan help Abdi when the thorns scared him?"],
      am: ["በምዕራፍ አንድ ምን ሆነ? በምዕራፍ ሁለት? በምዕራፍ ሦስት?", "እሾሆቹ አብዲን ሲያስፈሩት አያን እንዴት ረዳችው?"],
    },
    activity: {
      en: "Read a longer book together a chapter a night. Before each new chapter, ask your child to tell you in one sentence what happened in the chapter before.",
      am: "ረዘም ያለ መጽሐፍ በየምሽቱ አንድ ምዕራፍ አብራችሁ አንብቡ። እያንዳንዱን አዲስ ምዕራፍ ከመጀመራችሁ በፊት ልጃችሁ ባለፈው ምዕራፍ የሆነውን በአንድ ዓረፍተ ነገር እንዲነግራችሁ ጠይቁት።",
    },
  },
};

export default story;
