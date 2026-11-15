import type { Story } from "../../../stories";

/*
  "Swimming or Main?" (Amharic Readers, level 1): doubled consonants (gemination). Fidel does
  not show when a sound is pressed twice, so some words are written the same and said two ways:
  ላልቶ (soft) and ጠብቆ (strong). ዋና: wa-na, swimming / wan-na, main. ገና: ge-na, not yet /
  gen-na, Christmas. አለ: a-le, he said / al-le, there is. Hawi first reads "we're going main",
  then learns from Grandpa Tolosa to read the whole sentence; at Lake Langano her careful reading
  of two signs (ዋና በር, the main gate; ዋና እዚህ ብቻ, swimming only here) keeps everyone in the safe
  place. The join-in line is "Read it all, and the sentence will tell!"
  (ሙሉውን አንብቡ፤ ዓረፍተ ነገሩ ይነግራችኋል!).

  Facts: Lake Langano, in Oromia, is a lake families swim in; its water is brownish, "the colour
  of tea". Gemination of ገና (Christmas) and አለ (there is): see the report.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  how ጠብቆ / ላልቶ are explained (pages 3–5), «ላላ አድርገሽ በይው» (page 2), «ጨሌዋ ተንቃጨለ» (page 2)
  and the gemination of each pair.
*/
const story: Story = {
  id: "swim-or-main",
  course: "amharic-readers",
  pack: "story",
  title: { en: "Swimming or Main?", am: "ዋና ወይስ ዋና?" },
  category: "Fidel",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#1F8A8A",
  scene: "lib-swim-or-main",
  coverPage: 8,
  teaches: { words: ["ዋና", "ገና", "አለ", "ዋና በር", "ዋናው ነገር"] },
  pages: [
    {
      en: `Hawi runs home from school, waving a note. "Grandpa Tolosa, read it with me!" The note says: ቅዳሜ ዋና እንሄዳለን። ፎጣ አምጡ። "On Saturday we're going ዋና. Bring a towel."`,
      am: "ሀዊ ከትምህርት ቤት አንድ ማስታወሻ እያውለበለበች እየሮጠች መጣች። «አባ ቶሎሳ፣ አብረን እናንብበው!» ማስታወሻው እንዲህ ይላል፦ ቅዳሜ ዋና እንሄዳለን። ፎጣ አምጡ።",
    },
    {
      en: `Hawi reads ዋና with a strong, pressed n: "wan-na", like in "the main gate". She frowns. "We're going 'main' on Saturday? Main what? And why do we need a towel?"`,
      am: "ሀዊ «ዋና»ን ጠብቃ አነበበች፤ «ዋናው በር» ውስጥ እንዳለው። ግራ ተጋባች። «ቅዳሜ ‹ዋና› እንሄዳለን? ዋና ምን? ፎጣው ደግሞ ለምንድን ነው?»",
    },
    {
      en: `Grandpa Tolosa laughs. "Read it all again, and this time say it softly: wa-na." "ዋና… wa-na… swimming! We're going swimming!" Hawi jumps so high that her bead necklace jingles.`,
      am: "አባ ቶሎሳ ሳቁ። «ሙሉውን እንደገና አንብቢው፤ በዚህ ጊዜ ላላ አድርገሽ በይው።» «ዋና… ዋና… መዋኘት! ዋና ልንሄድ ነው!» ሀዊ በደስታ ዘለለች፤ ጨሌዋ ተንቃጨለ።",
    },
    {
      en: `"Grandpa, how did you know which one?" "Some words are written the same but said two ways," he says. "One way is soft: ላልቶ. One is strong: ጠብቆ, you press a sound twice. Fidel doesn't show it. Read it all, and the sentence will tell!"`,
      am: "«አባ ቶሎሳ፣ የትኛው እንደሆነ እንዴት አወቁ?» «አንዳንድ ቃላት አንድ ዓይነት ይጻፋሉ፤ ግን በሁለት ዓይነት ይነበባሉ» አሉ። «አንዱ ላልቶ ነው። ሌላው ጠብቆ ነው፤ አንዱን ድምፅ አጥብቀን እንጫነዋለን። ፊደሉ አያሳየንም። ሙሉውን አንብቡ፤ ዓረፍተ ነገሩ ይነግራችኋል!»",
    },
    {
      en: `Next day, Hawi tells the class. Teacher Meron writes: መልካም ገና! and ገና አልበላሁም። "In the first, ገና is strong: Genna, Christmas! In the second it's soft: 'not yet'." Read it all, and the sentence will tell!`,
      am: "በማግሥቱ ሀዊ ለክፍሉ ነገረች። መምህርት መሮን ጻፉ፦ «መልካም ገና!» እና «ገና አልበላሁም።» «በመጀመሪያው ገና ጠብቆ ይነበባል፤ በዓሉ ነው። በሁለተኛው ላልቶ ይነበባል፤ ‹እስካሁን› ማለት ነው።» ሙሉውን አንብቡ፤ ዓረፍተ ነገሩ ይነግራችኋል!",
    },
    {
      en: `Gugu tries two more: ጉጉ «ሰላም» አለ። and ውሃ አለ። First he mixes them up, and everyone laughs, Gugu too. Then he reads them all: soft አለ is "said"; strong አለ is "there is".`,
      am: "ጉጉ ሁለት ተጨማሪ ሞከረ፦ «ጉጉ ‹ሰላም› አለ።» እና «ውሃ አለ።» መጀመሪያ ተደበላለቀበት፤ ሁሉም ሳቁ፤ ጉጉም ሳቀ። ከዚያ ሙሉውን አነበበ፦ ላልቶው «አለ» ‹ተናገረ› ነው፤ ጠብቆው «አለ» ‹ይገኛል› ነው።",
    },
    {
      en: `On Saturday the whole class goes to Lake Langano with Grandpa Tolosa and Teacher Meron. The lake is wide, and its water is brown, the colour of tea.`,
      am: "ቅዳሜ ክፍሉ በሙሉ ከአባ ቶሎሳና ከመምህርት መሮን ጋር ወደ ላንጋኖ ሐይቅ ሄደ። ሐይቁ ሰፊ ነው፤ ውሃው እንደ ሻይ ቡናማ ነው።",
    },
    {
      en: `At the entrance there are two signs. Gugu reads the first: ዋና በር. "A swimming door! Let's swim right here!" He starts to pull off his shirt.`,
      am: "በመግቢያው ላይ ሁለት ምልክቶች አሉ። ጉጉ የመጀመሪያውን አነበበ፦ «ዋና በር።» «የዋና በር! እዚሁ እንዋኝ!» ብሎ ቲሸርቱን ማውለቅ ጀመረ።",
    },
    {
      en: `"Wait!" says Hawi. "Read it all. In ዋና በር, ዋና is strong: the main gate. It's the way in, not a place to swim." Then she reads the other sign: ልጆች፣ ዋና እዚህ ብቻ! "Children, swim only here!"`,
      am: "«ቆይ!» አለች ሀዊ። «ሙሉውን አንብብ። ‹ዋና በር› ላይ ዋና ጠብቆ ነው፦ ዋናው መግቢያ ማለት ነው፤ የመዋኛ ቦታ አይደለም።» ከዚያ ሌላውን ምልክት አነበበች፦ «ልጆች፣ ዋና እዚህ ብቻ!»",
    },
    {
      en: `The arrow points to a calm, shallow place by the shore, with a rope around it. Grandpa Tolosa stands close by. They splash and swim and play. Gugu even learns to float on his back.`,
      am: "ቀስቱ በሐይቁ ዳር ወዳለ፣ ጸጥ ወዳለና ጥልቀት ወደሌለው ቦታ ያሳያል፤ በገመድ ታጥሯል። አባ ቶሎሳ አጠገባቸው ቆሙ። ውሃውን እያረጩ ዋኙ፣ ተጫወቱ። ጉጉ በጀርባው መንሳፈፍ እንኳ ተማረ።",
    },
    {
      en: `At lunch, Grandpa Tolosa says, "Hawi, you kept everyone in the safe place today. How?" Hawi grins. "Because I read the whole sentence, not just one word!"`,
      am: "በምሳ ሰዓት አባ ቶሎሳ «ሀዊ፣ ዛሬ ሁሉንም በአስተማማኙ ቦታ አቆየሻቸው። እንዴት?» አሉ። ሀዊ ፈገግ አለች። «አንድ ቃል ብቻ ሳይሆን ሙሉውን ዓረፍተ ነገር ስላነበብኩ ነው!»",
    },
    {
      en: `"Then that's ዋናው ነገር: the main thing!" says Teacher Meron. Hawi laughs. "ዋና and ዋና! Swimming was fun, but reading it all was the main thing!" Read it all, and the sentence will tell!`,
      am: "«እንግዲያው ዋናው ነገር እሱ ነው!» አሉ መምህርት መሮን። ሀዊ ሳቀች። «ዋና እና ዋና! ዋና ደስ ይላል፤ ግን ዋናው ነገር ሙሉውን ማንበብ ነው!» ሙሉውን አንብቡ፤ ዓረፍተ ነገሩ ይነግራችኋል!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Say ዋና softly (wa-na) and strongly (wan-na). What does each one mean?", "Why was it important that Hawi read both signs all the way to the end?"],
      am: ["«ዋና»ን ላልቶና ጠብቆ በሉት። እያንዳንዱ ምን ማለት ነው?", "ሀዊ ሁለቱንም ምልክቶች እስከ መጨረሻ ማንበቧ ለምን አስፈላጊ ነበር?"],
    },
    activity: {
      en: "Play 'soft or strong': say a short sentence with ዋና, ገና or አለ in it, and let your child decide whether the word is soft (ላልቶ) or strong (ጠብቆ), and what it means. Then swap: your child makes the sentence and you guess.",
      am: "«ላልቶ ወይስ ጠብቆ» ተጫወቱ፦ ዋና፣ ገና ወይም አለ ያለበት አጭር ዓረፍተ ነገር ተናገሩ፤ ልጃችሁ ቃሉ ላልቶ ወይስ ጠብቆ እንደሆነና ምን ማለት እንደሆነ ይወስን። ከዚያ ተቀያየሩ፦ ልጃችሁ ዓረፍተ ነገሩን ይሥራ፤ እናንተ ገምቱ።",
    },
  },
};

export default story;
