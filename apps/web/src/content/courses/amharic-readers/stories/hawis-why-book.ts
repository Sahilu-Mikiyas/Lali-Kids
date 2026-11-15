import type { Story } from "../../../stories";

/*
  "Hawi's Why Book" (Amharic Readers, level 2): reading to find out why, and the answer word
  ምክንያቱም (because), in a fact book. Grandpa Tolosa gives Hawi a book about Ethiopia's
  mountain animals. Gugu asks ለምን? about everything; Hawi feels she should know (she is an
  Ethiopian wolf herself!) but learns she can find out by reading: each answer starts with
  ምክንያቱም. One question the book doesn't answer (why is a gelada's chest red?) takes them to
  the library. Then they make their own Why Book. The join-in line is "Why? Because… let's
  read and see!" (ለምን? ምክንያቱም… እናንብብና እንይ!).

  Facts (kept simple and true): the Ethiopian wolf lives only in Ethiopia's high mountains, such
  as Bale; it is very rare (a few hundred); it hunts in the daytime, mostly alone, catching
  mole-rats that come out by day, and its long thin nose helps; Amharic speakers often call it
  ቀይ ቀበሮ. Geladas live only in Ethiopia's highlands, eat mostly grass, sleep on cliff ledges at
  night where hyenas and leopards can't reach, and the bare red patch on their chest helps them
  "talk" to each other (it shows who is healthy and strong).

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line, «ፍልፈል» for the giant mole-rat, «የኢትዮጵያ ተኩላ» / «ቀይ ቀበሮ», and «ገደል
  ዳር» for cliff ledges.
*/
const story: Story = {
  id: "hawis-why-book",
  course: "amharic-readers",
  pack: "story",
  title: { en: "Hawi's Why Book", am: "የሀዊ «ለምን?» መጽሐፍ" },
  category: "Fidel",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#A8562A",
  scene: "lib-hawis-why-book",
  coverPage: 4,
  teaches: { words: ["ለምን?", "ምክንያቱም", "የኢትዮጵያ ተኩላ", "ጭላዳ"] },
  pages: [
    {
      en: `Grandpa Tolosa gives Hawi a new book: የተራራ እንስሳት, Mountain Animals. On the very first page there is an Ethiopian wolf, red and white, just like Hawi! "That's me!" she laughs.`,
      am: "አባ ቶሎሳ ለሀዊ አዲስ መጽሐፍ ሰጧት፦ «የተራራ እንስሳት»። በመጀመሪያው ገጽ ላይ ልክ እንደ ሀዊ ቀይና ነጭ የሆነ የኢትዮጵያ ተኩላ አለ! «ያ እኔ ነኝ!» ብላ ሳቀች።",
    },
    {
      en: `Gugu looks over her shoulder. "ለምን? Why do wolves live so high up in the mountains?" Hawi opens her mouth… and shuts it. She is a wolf, but she doesn't know! Her ears droop.`,
      am: "ጉጉ በትከሻዋ ላይ ተመለከተ። «ለምን? ተኩላዎች ለምን በከፍተኛ ተራሮች ላይ ይኖራሉ?» ሀዊ አፏን ከፈተች… ከዚያ ዘጋችው። እሷ ተኩላ ናት፤ ግን አታውቅም! ጆሮዎቿ ወደቁ።",
    },
    {
      en: `"Nobody knows everything," says Grandpa Tolosa. "But you can read and find out." Hawi turns the page. Why? Because… let's read and see!`,
      am: "«ሁሉንም የሚያውቅ የለም» አሉ አባ ቶሎሳ። «ግን አንብበሽ ማወቅ ትችያለሽ።» ሀዊ ገጹን ገለጠች። ለምን? ምክንያቱም… እናንብብና እንይ!",
    },
    {
      en: `She reads: የኢትዮጵያ ተኩላ የሚኖረው በከፍተኛ ተራሮች ላይ ነው፤ ምክንያቱም የሚበላቸው ፍልፈሎች እዚያ ብዙ ናቸው። "Because the mole-rats it eats live up there!" "ምክንያቱም means because," says Grandpa. "When you see it, the answer is coming."`,
      am: "እንዲህ ብላ አነበበች፦ «የኢትዮጵያ ተኩላ የሚኖረው በከፍተኛ ተራሮች ላይ ነው፤ ምክንያቱም የሚበላቸው ፍልፈሎች እዚያ ብዙ ናቸው።» «‹ምክንያቱም› ስታዩ መልሱ እየመጣ ነው» አሉ አባ ቶሎሳ።",
    },
    {
      en: `"ለምን? Why is its nose so long?" asks Gugu. Hawi finds it: አፍንጫው ረጅምና ቀጭን ነው፤ ምክንያቱም ፍልፈሎችን ከጉድጓዳቸው አጠገብ ለመያዝ ይረዳዋል። "Because a long, thin nose helps it catch mole-rats by their holes!" Why? Because… let's read and see!`,
      am: "«ለምን? አፍንጫው ለምን ረጅም ሆነ?» አለ ጉጉ። ሀዊ አገኘችው፦ «አፍንጫው ረጅምና ቀጭን ነው፤ ምክንያቱም ፍልፈሎችን ከጉድጓዳቸው አጠገብ ለመያዝ ይረዳዋል።» ለምን? ምክንያቱም… እናንብብና እንይ!",
    },
    {
      en: `"ለምን? Why does it hunt in the daytime, not at night?" Hawi reads: …ምክንያቱም ፍልፈሎች የሚወጡት በቀን ነው። "Because mole-rats come out in the day!" The book also says there are only a few hundred of these wolves left, so people protect them.`,
      am: "«ለምን? ለምን በሌሊት ሳይሆን በቀን ያድናል?» ሀዊ አነበበች፦ «…ምክንያቱም ፍልፈሎች የሚወጡት በቀን ነው።» መጽሐፉ እንደሚለው እነዚህ ተኩላዎች የቀሩት ጥቂት መቶዎች ብቻ ናቸው፤ ስለዚህ ሰዎች ይጠብቋቸዋል።",
    },
    {
      en: `On the next page: geladas! "That's ME!" shouts Gugu. ጭላዳዎች ሣር ይበላሉ። ማታ በገደል ዳር ይተኛሉ፤ ምክንያቱም እዚያ ጅብና ነብር ሊደርሱባቸው አይችሉም። "Because hyenas and leopards can't reach them there!" "I knew that," says Gugu, very pleased.`,
      am: "በሚቀጥለው ገጽ፦ ጭላዳዎች! «ያ እኔ ነኝ!» ብሎ ጮኸ ጉጉ። «ጭላዳዎች ሣር ይበላሉ። ማታ በገደል ዳር ይተኛሉ፤ ምክንያቱም እዚያ ጅብና ነብር ሊደርሱባቸው አይችሉም።» «ይህንን አውቅ ነበር» አለ ጉጉ በጣም ተደስቶ።",
    },
    {
      en: `Then Gugu points to his own chest. "ለምን? Why is my chest red?" Hawi reads the page once, twice. It only says: ደረታቸው ላይ ቀይ ምልክት አለ። There is no ምክንያቱም. "The book doesn't say!"`,
      am: "ከዚያ ጉጉ የራሱን ደረት አሳየ። «ለምን? ደረቴ ለምን ቀይ ሆነ?» ሀዊ ገጹን አንዴ፣ ሁለቴ አነበበች። የሚለው ይህንን ብቻ ነው፦ «ደረታቸው ላይ ቀይ ምልክት አለ።» «ምክንያቱም» የለም። «መጽሐፉ አይናገርም!»",
    },
    {
      en: `"When one book doesn't say," says Grandpa Tolosa, "we look in another. Let's go to the library." So the next day they go to the ቤተ መጻሕፍት, the house of books.`,
      am: "«አንዱ መጽሐፍ ካልተናገረ» አሉ አባ ቶሎሳ፣ «በሌላ እንፈልጋለን። ወደ ቤተ መጻሕፍት እንሂድ።» ስለዚህ በማግሥቱ ወደ ቤተ መጻሕፍት፣ ወደ መጻሕፍት ቤት ሄዱ።",
    },
    {
      en: `In a big book about geladas, Hawi finds it: ቀዩ ምልክት ጭላዳዎች እርስ በርሳቸው እንዲግባቡ ይረዳቸዋል። "The red patch helps geladas talk to each other. A bright red chest says 'I'm healthy and strong'!" Gugu puffs out his chest.`,
      am: "ስለ ጭላዳዎች በሚያወራ ትልቅ መጽሐፍ ውስጥ ሀዊ አገኘችው፦ «ቀዩ ምልክት ጭላዳዎች እርስ በርሳቸው እንዲግባቡ ይረዳቸዋል። ደማቅ ቀይ ደረት ‹ጤነኛና ጠንካራ ነኝ› ይላል።» ጉጉ ደረቱን ነፋ።",
    },
    {
      en: `On the way home Hawi has an idea. "Let's make our own Why Book!" On every page they write a question with ለምን? and an answer with ምክንያቱም. Gugu draws the pictures.`,
      am: "ወደ ቤት ሲመለሱ ሀዊ አንድ ሐሳብ መጣላት። «የራሳችንን ‹ለምን?› መጽሐፍ እንሥራ!» በእያንዳንዱ ገጽ ላይ በ«ለምን?» የሚጀምር ጥያቄና በ«ምክንያቱም» የሚጀምር መልስ ጻፉ። ጉጉ ሥዕሎቹን ሣለ።",
    },
    {
      en: `The last page says: ሀዊና ጉጉ ለምን ጓደኛሞች ሆኑ? ምክንያቱም ሁለቱም ማንበብ ይወዳሉ! "Why are Hawi and Gugu friends? Because they both love to read!" Why? Because… let's read and see!`,
      am: "የመጨረሻው ገጽ እንዲህ ይላል፦ «ሀዊና ጉጉ ለምን ጓደኛሞች ሆኑ? ምክንያቱም ሁለቱም ማንበብ ይወዳሉ!» ለምን? ምክንያቱም… እናንብብና እንይ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Which little word told Hawi 'the answer is coming'?", "When the book didn't say why Gugu's chest is red, what did they do?"],
      am: ["ለሀዊ «መልሱ እየመጣ ነው» የነገራት የትኛው ትንሽ ቃል ነው?", "መጽሐፉ የጉጉ ደረት ለምን ቀይ እንደሆነ ሳይናገር ሲቀር ምን አደረጉ?"],
    },
    activity: {
      en: "Make a family Why Book: fold three sheets of paper into a little book. On each page your child writes a ለምን? question about an animal or plant near you, and together you find the answer and write it with ምክንያቱም.",
      am: "የቤተሰብ «ለምን?» መጽሐፍ ሥሩ፦ ሦስት ወረቀቶችን አጥፋችሁ ትንሽ መጽሐፍ አድርጉ። በእያንዳንዱ ገጽ ላይ ልጃችሁ በአካባቢያችሁ ስላለ እንስሳ ወይም ተክል የ«ለምን?» ጥያቄ ይጻፍ፤ አብራችሁ መልሱን ፈልጋችሁ በ«ምክንያቱም» ጻፉት።",
    },
  },
};

export default story;
