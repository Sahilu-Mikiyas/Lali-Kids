import type { Story } from "../../../stories";

/*
  "A Postcard from Lake Tana" (level 6: writing a short message: a postcard).
  Tsehay goes with Papa to Bahir Dar, on Lake Tana, and wants to send Gugu a postcard. Her first try
  starts at breakfast and fills the card before anything interesting happens. Papa says a postcard
  is small: choose the three best things. She picks the papyrus tankwa, the pelican that swallowed
  a fish, and the Blue Nile flowing out of the lake, and writes Dear Gugu, three sentences, See you
  soon!, Love, Tsehay, with the address and the stamp on the right. A week later Gugu reads it with
  Grandma and writes back at once.
  Join-in line: "Dear…, three best things, Love…!"

  English taught: the parts of a postcard or short message: Dear …, (greeting), a few sentences,
  See you soon!, Love, … (closing); address and stamp. Facts: Bahir Dar is on Lake Tana; the Blue
  Nile (Abay) flows out of the lake there; great white pelicans live on Lake Tana; tankwa boats.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line and «የፖስታ ካርድ» for postcard.
*/
const story: Story = {
  id: "postcard-from-tana",
  course: "english-readers",
  pack: "story",
  title: { en: "A Postcard from Lake Tana", am: "ከጣና ሐይቅ የተላከ ፖስት ካርድ" },
  category: "English",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#2F6FD0",
  scene: "lib-postcard-from-tana",
  coverPage: 6,
  teaches: { words: ["postcard", "Dear", "See you soon!", "Love", "address", "stamp"] },
  pages: [
    {
      en: "Tsehay went with Papa to Bahir Dar, by Lake Tana. \"I'll send Gugu a postcard!\" she said. Papa bought one with a picture of the lake.",
      am: "ፀሐይ ከአባባ ጋር በጣና ሐይቅ ዳር ወዳለችው ባሕር ዳር ሄደች። «ለጉጉ ፖስት ካርድ እልካለሁ!» አለች። አባባ የሐይቁ ሥዕል ያለበት ገዛ።",
    },
    {
      en: "On the back, there was a line down the middle. \"The left side is for your message,\" said Papa. \"The right side is for the address and the stamp.\"",
      am: "በጀርባው በመሃል መስመር ነበር። «ግራው ለመልእክትሽ ነው» አለ አባባ። «ቀኙ ለአድራሻውና ለቴምብሩ።»",
    },
    {
      en: "Tsehay wrote: \"Today we woke up and had breakfast and then we washed and then we…\" The card was full, and she was still at breakfast!",
      am: "ፀሐይ ጻፈች፦ «Today we woke up and had breakfast and then we washed and then we…» ካርዱ ሞላ፤ እሷ ግን ገና ቁርስ ላይ ነበረች!",
    },
    {
      en: "Papa laughed and got a new card. \"A postcard is small. Choose the three best things.\" Tsehay closed her eyes and thought.",
      am: "አባባ ሳቀና አዲስ ካርድ አመጣ። «ፖስት ካርድ ትንሽ ነው። ሦስቱን ምርጥ ነገሮች ምረጪ።» ፀሐይ ዓይኖቿን ጨፍና አሰበች።",
    },
    {
      en: "One: the papyrus boat, a tankwa. Two: the pelican that swallowed a fish. Three: the Blue Nile, starting its long journey from the lake.",
      am: "አንድ፦ የደንገሉ ጀልባ፣ ታንኳ። ሁለት፦ ዓሣ የዋጠው ፔሊካን። ሦስት፦ ረጅም ጉዞውን ከሐይቁ የሚጀምረው ዓባይ።",
    },
    {
      en: "First she wrote \"Dear Gugu,\" at the top: Dear, his name, and a comma. Dear…, three best things, Love…!",
      am: "መጀመሪያ ከላይ «Dear Gugu,» ብላ ጻፈች፦ Dear፣ ስሙ፣ እና ኮማ። Dear…, three best things, Love…!",
    },
    {
      en: "\"I am at Lake Tana. I saw a tankwa made of papyrus. A pelican ate a big fish! The Blue Nile starts here.\"",
      am: "«I am at Lake Tana. I saw a tankwa made of papyrus. A pelican ate a big fish! The Blue Nile starts here.»",
    },
    {
      en: "At the end she wrote \"See you soon!\" and then \"Love, Tsehay\". On the right went Gugu's name, his town and the stamp.",
      am: "በመጨረሻ «See you soon!» (በቅርቡ እንገናኛለን!) ከዚያም «Love, Tsehay» ብላ ጻፈች። በቀኝ በኩል የጉጉ ስም፣ ከተማውና ቴምብሩ ገቡ።",
    },
    {
      en: "They took it to the post office. Tsehay dropped it in the box. \"Fly, postcard, fly!\" Dear…, three best things, Love…!",
      am: "ወደ ፖስታ ቤት ወሰዱት። ፀሐይ ሳጥኑ ውስጥ ጣለችው። «ብረር፣ ፖስት ካርድ፣ ብረር!» Dear…, three best things, Love…!",
    },
    {
      en: "A week later, a postcard came for Gugu! He had never had one before. He ran to Grandma. \"Read it with me!\"",
      am: "ከሳምንት በኋላ ለጉጉ ፖስት ካርድ መጣ! ከዚህ በፊት አግኝቶ አያውቅም። ወደ አያቴ ሮጠ። «አብረን እናንብበው!»",
    },
    {
      en: "\"A pelican ate a big fish!\" Gugu read it three times. Then he wrote back: \"Dear Tsehay, I miss you. Bring me a fish! Love, Gugu.\"",
      am: "«A pelican ate a big fish!» ጉጉ ሦስት ጊዜ አነበበው። ከዚያ መለሰ፦ «Dear Tsehay, I miss you. Bring me a fish! Love, Gugu.»",
    },
    {
      en: "Dear…, three best things, Love…! Who would you send a postcard to, {name}? What would you tell them?",
      am: "Dear…, three best things, Love…! {name}፣ ፖስት ካርድ ለማን ትልካላችሁ? ምን ትነግሯቸዋላችሁ?",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why didn't Tsehay's first postcard work?", "What goes at the start and at the end of a postcard?"],
      am: ["የፀሐይ የመጀመሪያ ፖስት ካርድ ለምን አልሆነም?", "በፖስት ካርድ መጀመሪያና መጨረሻ ምን ይጻፋል?"],
    },
    activity: {
      en: 'Fold a piece of card and draw a picture on the front. On the back, help your child write a postcard to someone they love: "Dear …," then three short sentences about their best things, then "See you soon!" and "Love, …". Post it, or hand-deliver it!',
      am: 'አንድ ካርቶን አጥፈው ፊት ለፊቱ ሥዕል ይሳሉ። በጀርባው ልጅዎ ለሚወደው ሰው ፖስት ካርድ እንዲጽፍ ይርዱት፦ «Dear …,»፣ ከዚያ ስለ ምርጥ ነገሮቹ ሦስት አጫጭር ዓረፍተ ነገሮች፣ ከዚያ «See you soon!» እና «Love, …»። በፖስታ ይላኩት ወይም በእጅ ያድርሱት!',
    },
  },
};

export default story;
