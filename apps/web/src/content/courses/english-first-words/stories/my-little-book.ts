import type { Story } from "../../../stories";

/*
  "Anbessa Reads Alone" (level 6: reading a little book alone; "This is …", "I see a …",
  "I like …", "I can …").
  Anbessa makes his very first little book in English to read to Grandma on her birthday, all by
  himself. At the big moment his tummy flutters and he gets stuck on the first page: "This…
  is…". Lali whispers the two tricks he already knows: sound it out (slow, slow… fast!) or snap
  it if it's a snap word. He reads: "This is my home." "I see a cat." "I see the sun." "I like
  Grandma." He gets stuck on "cake" (k-a-ke doesn't blend), looks at his own drawing and works it
  out from the picture. Last page: "I can read!" Grandma is so proud she cries happy tears.
  Join-in line: "Point, look, read!"

  English taught: reading a little book alone, pointing to each word; the sentences "This is my
  home.", "I see a cat.", "I see the sun.", "I like Grandma.", "This is a cake.", "I can read!";
  using the picture as a clue.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ጠቁም፣ ተመልከት፣ አንብብ!» and «የልደት ቀን» for birthday.
*/
const story: Story = {
  id: "my-little-book",
  course: "english-first-words",
  pack: "story",
  title: { en: "Anbessa Reads Alone", am: "አንበሳ ብቻውን ያነባል" },
  category: "English",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#2F6FD0",
  scene: "lib-my-little-book",
  coverPage: 11,
  teaches: { words: ["This is", "I see a", "I like", "I can", "home", "cat", "sun", "Grandma", "cake", "read"] },
  pages: [
    {
      en: 'It was Grandma\'s birthday. Anbessa had a secret: a little book he had made all by himself, in English, with a drawing on every page.',
      am: 'የአያቴ የልደት ቀን ነበር። አንበሳ ምስጢር ነበረው፦ ራሱ ብቻውን በእንግሊዝኛ የሠራው ትንሽ መጽሐፍ፤ በእያንዳንዱ ገጽ ላይ ሥዕል ያለበት።',
    },
    {
      en: '"Grandma, sit here," he said. "I am going to read you a book. All by myself!" Grandma sat on her stool and folded her paws.',
      am: '«አያቴ፣ እዚህ ተቀመጪ» አለ። «መጽሐፍ ላነብልሽ ነው። ራሴ ብቻዬን!» አያቴ በርጩማዋ ላይ ተቀምጣ መዳፎቿን አጣመረች።',
    },
    {
      en: 'Anbessa opened the book. His tummy fluttered. He looked at the first words. "This… is…" And then he was stuck.',
      am: 'አንበሳ መጽሐፉን ከፈተ። ሆዱ ተንቦጫቦጨ። የመጀመሪያዎቹን ቃላት ተመለከተ። «This… is…» ከዚያ ቆመ።',
    },
    {
      en: 'Lali landed on his shoulder. "You know the tricks," she whispered. "Point to each word. Sound it out, or snap it! Point, look, read!"',
      am: 'ላሊ ትከሻው ላይ አረፈች። «ዘዴዎቹን ታውቃቸዋለህ» አለች በሹክሹክታ። «እያንዳንዱን ቃል ጠቁም። ድምፁን አጣምረህ አንብበው፤ ወይም በቅጽበት በለው! Point, look, read!» (ጠቁም፣ ተመልከት፣ አንብብ!)',
    },
    {
      en: 'Anbessa pointed. "This": snap! "is": snap! "my": snap! The last word was "home". He looked at his drawing of their round house. "This is my home!" Point, look, read!',
      am: 'አንበሳ ጠቆመ። «This»፦ ቅጭ! «is»፦ ቅጭ! «my»፦ ቅጭ! የመጨረሻው ቃል «home» ነበር። የክብ ቤታቸውን ሥዕል ተመለከተ። «This is my home!» (ይህ ቤቴ ነው!) Point, look, read!',
    },
    {
      en: 'Next page. "I see a… c-a-t. Cat! I see a cat." Dimmet, asleep on the step, opened one eye, as if she knew. Point, look, read!',
      am: 'ቀጣዩ ገጽ። «I see a… c-a-t። Cat! I see a cat.» (ድመት አያለሁ።) በደረጃው ላይ የተኛችው ዲሜት የሰማች ይመስል አንድ ዓይኗን ገለጠች። Point, look, read!',
    },
    {
      en: '"I see the s-u-n. I see the sun." Snap: "the"! Anbessa was getting faster. "I like Grandma." Grandma put her paw on her heart.',
      am: '«I see the s-u-n. I see the sun.» (ፀሐይን አያለሁ።) ቅጭ፦ «the»! አንበሳ እየፈጠነ ሄደ። «I like Grandma.» (አያቴን እወዳለሁ።) አያቴ መዳፏን ልቧ ላይ አደረገች።',
    },
    {
      en: 'Then he came to a tricky one. "This is a… c… a… k… e?" It didn\'t sound like anything. "Ca-keh?" He was stuck again.',
      am: 'ከዚያ አስቸጋሪ ቃል ጋ ደረሰ። «This is a… c… a… k… e?» ምንም አይመስልም ነበር። «ካ-ኬ?» እንደገና ቆመ።',
    },
    {
      en: 'Anbessa looked at his own drawing on the page: a round thing, with a candle on top. He worked it out. "It\'s a CAKE! This is a cake!"',
      am: 'አንበሳ በገጹ ላይ ያለውን የራሱን ሥዕል ተመለከተ፦ ክብ ነገር፣ ላዩ ላይ ሻማ ያለበት። አወቀው። «CAKE ነው! This is a cake!» (ይህ ኬክ ነው!)',
    },
    {
      en: '"When a word is tricky," said Lali, "the picture can help!" Anbessa turned to the very last page. Point, look, read!',
      am: '«አንድ ቃል ሲያስቸግር» አለች ላሊ፣ «ሥዕሉ ሊረዳ ይችላል!» አንበሳ ወደ መጨረሻው ገጽ ገለጠ። Point, look, read!',
    },
    {
      en: 'There were three words, big and proud. Anbessa read them loud and clear. "I can READ!"',
      am: 'ሦስት ቃላት ነበሩ፤ ትልቅና ኩሩ። አንበሳ ጮክ ብሎ በግልጽ አነበባቸው። «I can READ!» (ማንበብ እችላለሁ!)',
    },
    {
      en: 'Grandma hugged him so tight, with happy tears in her eyes. "That is the best birthday present ever." Point, look, read! Can YOU read a little book, {name}?',
      am: 'አያቴ በደስታ እንባ እያነባች በጣም አጥብቃ አቀፈችው። «ይህ ከሁሉ የሚበልጥ የልደት ስጦታ ነው።» Point, look, read! {name}፣ እናንተም ትንሽ መጽሐፍ ማንበብ ትችላላችሁ?',
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["What three tricks helped Anbessa read his book?", "How did the picture help him read \"cake\"?"],
      am: ["አንበሳ መጽሐፉን እንዲያነብ የረዱት ሦስቱ ዘዴዎች ምን ነበሩ?", "ሥዕሉ «cake»ን እንዲያነብ እንዴት ረዳው?"],
    },
    activity: {
      en: 'Help your child make a little book of four or five pages, each with one short sentence (This is my home. I see a cat. I like Mama. I can read!) and a drawing. Let them read it to someone they love, pointing to each word. Praise the effort, and when they get stuck, remind them: sound it out, snap it, or look at the picture.',
      am: 'ልጃችሁ አራት ወይም አምስት ገጽ ያላት ትንሽ መጽሐፍ እንዲሠራ እርዱት፤ በእያንዳንዱ ገጽ አንድ አጭር ዓረፍተ ነገር (This is my home. I see a cat. I like Mama. I can read!) እና ሥዕል። ለሚወደው ሰው እያንዳንዱን ቃል እየጠቆመ ያንብብ። ጥረቱን አወድሱ፤ ሲቸገርም አስታውሱት፦ ድምፁን አጣምረው፣ በቅጽበት በለው፣ ወይም ሥዕሉን ተመልከት።',
    },
  },
};

export default story;
