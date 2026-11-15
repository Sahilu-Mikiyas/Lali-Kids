import type { Story } from "../../../stories";

/*
  "Where Is My Hat?" (level 3: reading a little story; describing words: big, little, colors,
  happy, sad).
  A little story for the child to read with help: three to six short sentences a page, using the
  words of the course so far. Haben has a little yellow hat with a red flower. At the busy market
  the wind takes it. People hold up hats (a big black hat, a little blue hat, a big yellow hat with
  no flower) and each time Haben says what is different. She works out who can help: Lali, who can
  fly up high and look down. The hat is on a goat, who is eating the flower! Haben gets it back, a
  bit sad, and her mom buys a big pink flower for it.
  Join-in line: "Is this my hat? No! My hat is little and yellow."

  English taught: describing words (big, little, colors, happy, sad); reading short sentences;
  answering who, what and where questions.

  In Amharic the English sentences stay as they are (the child reads them), followed by a
  translation in brackets (a short gist on the longest pages). AMHARIC: first draft, to be checked by a native-speaking editor before
  launch.
*/
const story: Story = {
  id: "where-is-my-hat",
  course: "english-readers",
  pack: "story",
  title: { en: "Where Is My Hat?", am: "Where Is My Hat? ኮፍያዬ የት ነው?" },
  category: "English",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#F5B21E",
  scene: "lib-where-is-my-hat",
  coverPage: 8,
  teaches: { words: ["big", "little", "yellow", "red", "blue", "black", "pink", "happy", "sad", "where", "who"] },
  pages: [
    {
      en: "This is Haben. Haben has a hat. It is a little yellow hat. It has a red flower on it. Haben likes her hat a lot!",
      am: "This is Haben. Haben has a hat. It is a little yellow hat. It has a red flower on it. Haben likes her hat a lot! (ይህች ሐበን ናት። ሐበን ኮፍያ አላት። ትንሽ ቢጫ ኮፍያ ነው። በላዩ ላይ ቀይ አበባ አለ። ሐበን ኮፍያዋን በጣም ትወደዋለች!)",
    },
    {
      en: "Haben and her mom go to the market. The market is big. It is very busy. The wind is blowing.",
      am: "Haben and her mom go to the market. The market is big. It is very busy. The wind is blowing. (ሐበንና እናቷ ወደ ገበያ ይሄዳሉ። ገበያው ትልቅ ነው። በጣም ተጨናንቋል። ነፋሱ እየነፈሰ ነው።)",
    },
    {
      en: "Whoosh! The wind takes the hat. Up, up, up it goes! Where is my hat? Haben is sad.",
      am: "Whoosh! The wind takes the hat. Up, up, up it goes! Where is my hat? Haben is sad. (ሹው! ነፋሱ ኮፍያውን ወሰደው። ወደ ላይ፣ ወደ ላይ፣ ወደ ላይ ሄደ! ኮፍያዬ የት ነው? ሐበን አዘነች።)",
    },
    {
      en: "A man has a hat. It is a big black hat. Is this my hat? No! My hat is little and yellow.",
      am: "A man has a hat. It is a big black hat. Is this my hat? No! My hat is little and yellow. (አንድ ሰው ኮፍያ ይዟል። ትልቅ ጥቁር ኮፍያ ነው። ይህ ኮፍያዬ ነው? አይደለም! ኮፍያዬ ትንሽና ቢጫ ነው።)",
    },
    {
      en: "Gugu has a hat. It is a little blue hat. Is this my hat? No! My hat is little and yellow.",
      am: "Gugu has a hat. It is a little blue hat. Is this my hat? No! My hat is little and yellow. (ጉጉ ኮፍያ ይዟል። ትንሽ ሰማያዊ ኮፍያ ነው። ይህ ኮፍያዬ ነው? አይደለም! ኮፍያዬ ትንሽና ቢጫ ነው።)",
    },
    {
      en: "Hawi has a yellow hat. But it is big, and it has no flower. Is this my hat? No! My hat is little and yellow, with a red flower.",
      am: "Hawi has a yellow hat. But it is big, and it has no flower. Is this my hat? No! My hat is little and yellow, with a red flower. (ሀዊ ትልቅ ቢጫ ኮፍያ አላት፤ አበባ የለውም። የኔ አይደለም!)",
    },
    {
      en: "Haben thinks. The market is so big! Who can see it all? Lali can! Lali can fly up high. Haben tells Lali, \"My hat is little and yellow, with a red flower.\"",
      am: "Haben thinks. The market is so big! Who can see it all? Lali can! Lali can fly up high. Haben tells Lali, \"My hat is little and yellow, with a red flower.\" (ሁሉን የምታይ ማን ናት? ላሊ! ከፍ ብላ ትበራለች።)",
    },
    {
      en: "Lali flies up, up, up. She looks down. She sees a lot of hats. Then she sees a little yellow hat with a red flower. Where is it?",
      am: "Lali flies up, up, up. She looks down. She sees a lot of hats. Then she sees a little yellow hat with a red flower. Where is it? (ላሊ ወደ ታች አየች፦ ቀይ አበባ ያለው ትንሽ ቢጫ ኮፍያ!)",
    },
    {
      en: "It is on a goat! The goat has the hat on her head. And she is eating the red flower! Munch, munch.",
      am: "It is on a goat! The goat has the hat on her head. And she is eating the red flower! Munch, munch. (ፍየል ላይ ነው! ፍየሏ ኮፍያውን ራሷ ላይ አድርጋዋለች። ቀዩንም አበባ እየበላች ነው! ቅርጥፍ፣ ቅርጥፍ።)",
    },
    {
      en: "\"Stop, goat, stop!\" Haben runs to the goat. The goat runs too. Run, Haben, run! Haben is fast. She gets her hat!",
      am: "\"Stop, goat, stop!\" Haben runs to the goat. The goat runs too. Run, Haben, run! Haben is fast. She gets her hat! («ቁሚ፣ ፍየል፣ ቁሚ!» ሐበን ወደ ፍየሏ ሮጠች። ፍየሏም ሮጠች። ሩጪ፣ ሐበን፣ ሩጪ! ሐበን ፈጣን ናት። ኮፍያዋን አገኘች!)",
    },
    {
      en: "It is her little yellow hat. But the red flower is gone. Haben is a bit sad. Then her mom has an idea.",
      am: "It is her little yellow hat. But the red flower is gone. Haben is a bit sad. Then her mom has an idea. (ትንሹ ቢጫ ኮፍያዋ ነው። ግን ቀዩ አበባ የለም። ሐበን ትንሽ አዘነች። ከዚያ እናቷ ሐሳብ መጣላት።)",
    },
    {
      en: "Mom gets a new flower. It is a big pink flower! Now Haben's hat is little and yellow, with a big pink flower. Haben is happy. Who had a big black hat? Where was the hat, {name}?",
      am: "Mom gets a new flower. It is a big pink flower! Now Haben's hat is little and yellow, with a big pink flower. Haben is happy. (እናቷ ትልቅ ሮዝ አበባ ገዛች። ሐበን ተደሰተች!) {name}፣ ትልቅ ጥቁር ኮፍያ የነበረው ማን ነው? ኮፍያው የት ነበር?",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["How did Haben tell her hat apart from all the others?", "Who helped Haben? Why was Lali a good helper?"],
      am: ["ሐበን ኮፍያዋን ከሌሎቹ ሁሉ እንዴት ለየችው?", "ሐበንን የረዳት ማን ነው? ላሊ ለምን ጥሩ ረዳት ሆነች?"],
    },
    activity: {
      en: 'Play "Is this my…?": choose something in the room and describe it with two words, "It is little and red." Your child points: "Is this it?" Then swap. Afterward, read the story again and let your child read the sentence "My hat is little and yellow" each time it comes, pointing to each word.',
      am: '«Is this my…?» ተጫወቱ፦ በክፍሉ ውስጥ አንድ ነገር መርጣችሁ በሁለት ቃላት ግለጹት፦ «It is little and red.» (ትንሽና ቀይ ነው።) ልጅዎ እየጠቆመ «Is this it?» (ይሄ ነው?) ይላል። ከዚያ ቦታ ተቀያየሩ። በኋላም ታሪኩን እንደገና አንብቡ፤ «My hat is little and yellow» የሚለው ዓረፍተ ነገር በመጣ ቁጥር ልጅዎ እያንዳንዱን ቃል እየጠቆመ ያንብበው።',
    },
  },
};

export default story;
