import type { Story } from "../../../stories";

/*
  "Snap Words" (level 5: the first sight words I, a, the, is, my, see, go, like).
  Haben gets her first little English book. She sounds out "cat", "sun", "big"… but then: "the".
  t-h-e? "Tuh-huh-eh"? It doesn't work. Teacher Meron explains that some words are tricky: you
  can't sound them out, you just know them, in a snap, like knowing a friend's face. She gives
  eight "snap words" on cards. Haben works out how to learn them: a game, with the cards turned
  over and SNAP! when two match, played with Gugu under the tree. By the end of the day she knows
  all eight, and reads her book to Teacher Meron: "I see the sun. My cat is big. I like my book."
  Join-in line: "Look, snap, I know it!"

  English taught: the sight words I, a, the, is, my, see, go, like, and that some words are learnt
  by sight rather than sounded out.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ተመልከት፣ ቅጭ፣ አውቀዋለሁ!» and «ቅጭ ቃላት» for "snap words".
*/
const story: Story = {
  id: "snap-words",
  course: "english-first-words",
  pack: "story",
  title: { en: "Snap Words", am: "Snap Words፦ ቅጭ ቃላት" },
  category: "English",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#D63B72",
  scene: "lib-snap-words",
  coverPage: 7,
  teaches: { words: ["I", "a", "the", "is", "my", "see", "go", "like"] },
  pages: [
    {
      en: 'Teacher Meron gave Haben her very first English book. It was small and blue, with a cat and a sun on the cover. "Can you read it?" asked Teacher Meron.',
      am: 'መምህርት መሮን ለሐበን የመጀመሪያዋን የእንግሊዝኛ መጽሐፍ ሰጠቻት። ትንሽና ሰማያዊ ነበረች፤ በሽፋኑ ላይ ድመትና ፀሐይ ነበሩ። «ልታነቢው ትችያለሽ?» ብላ ጠየቀች መምህርት መሮን።',
    },
    {
      en: 'Haben opened it. "c-a-t, cat! s-u-n, sun! b-i-g, big!" Slow, slow, slow… fast! It was working!',
      am: 'ሐበን ከፈተችው። «c-a-t፣ cat! s-u-n፣ sun! b-i-g፣ big!» ቀስ፣ ቀስ፣ ቀስ… ፈጣን! እየሠራ ነበር!',
    },
    {
      en: 'Then she came to a little word: "the". "t… h… e. Tuh-huh-eh?" That didn\'t sound like a word at all. She tried again. "Tuh-huh-eh?" Haben frowned.',
      am: 'ከዚያ አንዲት ትንሽ ቃል ጋ ደረሰች፦ «the»። «t… h… e። ቱ-ሁ-ኤ?» ይህ ጭራሽ ቃል አይመስልም ነበር። እንደገና ሞከረች። «ቱ-ሁ-ኤ?» ሐበን ፊቷን ቋጠረች።',
    },
    {
      en: '"Ah," said Teacher Meron. "That\'s a tricky one. Some words don\'t play by the rules. We can\'t sound them out. We just know them, in a snap, like you know your friend\'s face."',
      am: '«አሃ» አለች መምህርት መሮን። «ያቺ አስቸጋሪ ናት። አንዳንድ ቃላት ደንቡን አይከተሉም። ድምፃቸውን አጣምረን ልናነባቸው አንችልም። በቅጽበት እናውቃቸዋለን፤ የጓደኛችሁን ፊት እንደምታውቁት።»',
    },
    {
      en: 'She gave Haben eight cards. "These are snap words: I, a, the, is, my, see, go, like. Look at a card, snap your fingers, and say it. Look, snap, I know it!"',
      am: 'ለሐበን ስምንት ካርዶች ሰጠቻት። «እነዚህ ቅጭ ቃላት (snap words) ናቸው፦ I፣ a፣ the፣ is፣ my፣ see፣ go፣ like። ካርዱን ተመልከቺ፣ ጣቶችሽን አቅጭቂ፣ በዪው። Look, snap, I know it!» (ተመልከት፣ ቅጭ፣ አውቀዋለሁ!)',
    },
    {
      en: 'Haben looked at "the". Snap! "The!" At "is". Snap! "Is!" But by "like" and "see" she was mixed up again. Eight cards were a lot to remember.',
      am: 'ሐበን «the»ን ተመለከተች። ቅጭ! «The!» «is»ን። ቅጭ! «Is!» «like» እና «see» ጋ ስትደርስ ግን እንደገና ተደበላለቀባት። ስምንት ካርዶችን ማስታወስ ብዙ ነበር።',
    },
    {
      en: 'Under the fig tree, Gugu was playing a matching game with leaves. Haben had an idea. "I\'ll make TWO of each snap word, and we can play SNAP!"',
      am: 'በሾላው ዛፍ ሥር ጉጉ በቅጠሎች የማዛመድ ጨዋታ ይጫወት ነበር። ሐበን ሐሳብ መጣላት። «የእያንዳንዱን ቅጭ ቃል ሁለት ሁለት ካርድ እሠራለሁ፤ SNAP እንጫወታለን!»',
    },
    {
      en: 'They turned the cards face down and took turns. "my"… "my"! "SNAP!" "go"… "the". No snap! "like"… "like"! "SNAP!" Look, snap, I know it!',
      am: 'ካርዶቹን ገልብጠው በተራ ገለጡ። «my»… «my»! «SNAP!» «go»… «the»። ቅጭ የለም! «like»… «like»! «SNAP!» Look, snap, I know it!',
    },
    {
      en: 'They played again and again, until every card was easy. "I! A! The! Is! My! See! Go! Like!" Gugu snapped so hard he fell over.',
      am: 'ደጋግመው ተጫወቱ፤ እያንዳንዱ ካርድ ቀላል እስኪሆን ድረስ። «I! A! The! Is! My! See! Go! Like!» ጉጉ በጣም አቅጭቆ ወደቀ።',
    },
    {
      en: 'Then Haben opened her little blue book again. "I see the sun." She didn\'t even have to stop. "My cat is big. I like my book."',
      am: 'ከዚያ ሐበን ትንሿን ሰማያዊ መጽሐፏን እንደገና ከፈተች። «I see the sun.» (ፀሐይን አያለሁ።) ማቆም እንኳ አላስፈለጋትም። «My cat is big. I like my book.» (ድመቴ ትልቅ ናት። መጽሐፌን እወደዋለሁ።)',
    },
    {
      en: 'She ran to Teacher Meron and read the whole book, from the first page to the last. Teacher Meron clapped. "You read it ALL by yourself!"',
      am: 'ወደ መምህርት መሮን ሮጣ መጽሐፉን ከመጀመሪያው ገጽ እስከ መጨረሻው አነበበች። መምህርት መሮን አጨበጨበች። «ሁሉንም ራስሽ አነበብሽው!»',
    },
    {
      en: 'Some words we sound out, slow, slow… fast. Some words we know in a snap. Look, snap, I know it! Which snap words can YOU read, {name}?',
      am: 'አንዳንድ ቃላትን ድምፃቸውን አጣምረን እናነባለን፤ ቀስ፣ ቀስ… ፈጣን። አንዳንዶቹን በቅጽበት እናውቃቸዋለን። Look, snap, I know it! {name}፣ የትኞቹን ቅጭ ቃላት ማንበብ ትችላላችሁ?',
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why couldn't Haben sound out \"the\"? What helped her learn it?", "Can you find the snap words I, a, the, is, my, see, go, like in a book?"],
      am: ["ሐበን «the»ን ድምፁን አጣምራ ለምን ማንበብ አልቻለችም? እንድትማረው የረዳት ምንድን ነው?", "I፣ a፣ the፣ is፣ my፣ see፣ go፣ like የሚሉትን ቅጭ ቃላት በመጽሐፍ ውስጥ ማግኘት ትችላላችሁ?"],
    },
    activity: {
      en: 'Make two cards for each of the eight snap words (I, a, the, is, my, see, go, like) and play Snap or a memory game: turn them face down and find pairs, reading each card aloud. Many of the most common English words, like "the", can\'t be sounded out; children learn them by seeing them again and again. A few minutes a day is enough.',
      am: 'ለስምንቱ ቅጭ ቃላት (I፣ a፣ the፣ is፣ my፣ see፣ go፣ like) ሁለት ሁለት ካርድ ሥሩና Snap ወይም የማስታወስ ጨዋታ ተጫወቱ፦ ካርዶቹን ገልብጣችሁ ጥንዶችን ፈልጉ፤ እያንዳንዱን ካርድ ጮክ ብላችሁ አንብቡ። እንደ «the» ያሉ በጣም የተለመዱ ብዙ የእንግሊዝኛ ቃላት ድምፃቸውን በማጣመር አይነበቡም፤ ልጆች ደጋግመው በማየት ይማሯቸዋል። በቀን ጥቂት ደቂቃዎች በቂ ናቸው።',
    },
  },
};

export default story;
