import type { Story } from "../../../stories";

/*
  "Excuse Me or Sorry?" (level 5: polite words on a busy bus: excuse me, sorry, may I, thank you).
  Papa takes Tsehay and Gugu on the bus to town. Gugu has learned two polite words but mixes them
  up: he says "Sorry, sorry!" when he wants to get past, and "Excuse me!" after he treads on a man's
  foot. People look puzzled. Tsehay watches and works out the rule: excuse me BEFORE (to get past,
  or to ask something), sorry AFTER (when you've made a mistake). Gugu tries again and gets it
  right, offers his seat to an old woman ("Would you like to sit down?"), and they get off at the
  market with smiles all round.
  Join-in line: "Excuse me before, sorry after!"

  English taught: Excuse me. Sorry. May I sit here? Would you like to sit down? Thank you. You're
  welcome.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «በፊት excuse me፣ በኋላ sorry!».
*/
const story: Story = {
  id: "excuse-me-sorry",
  course: "english-readers",
  pack: "story",
  title: { en: "Excuse Me or Sorry?", am: "Excuse Me ወይስ Sorry?" },
  category: "English",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#2F6FD0",
  scene: "lib-excuse-me-sorry",
  coverPage: 6,
  teaches: { words: ["Excuse me", "Sorry", "May I sit here?", "Would you like to sit down?", "Thank you", "You're welcome"] },
  pages: [
    {
      en: "Papa took Tsehay and Gugu on the bus to town. The bus was full of people, bags and even a hen in a basket.",
      am: "አባባ ፀሐይንና ጉጉን በአውቶቡስ ወደ ከተማ ወሰዳቸው። አውቶቡሱ በሰዎች፣ በቦርሳዎችና በቅርጫት ውስጥ ባለች ዶሮ እንኳ ተሞልቶ ነበር።",
    },
    {
      en: "\"I know two polite words now,\" said Gugu proudly. \"Excuse me and sorry!\" But he didn't know when to use which.",
      am: "«አሁን ሁለት የጨዋነት ቃላት አውቃለሁ» አለ ጉጉ በኩራት። «Excuse me እና sorry!» ግን የትኛውን መቼ እንደሚጠቀም አላወቀም።",
    },
    {
      en: "He wanted to get past a lady. \"Sorry! Sorry!\" he said. The lady looked puzzled. \"Sorry for what?\"",
      am: "አንዲትን ሴት አልፎ መሄድ ፈለገ። «Sorry! Sorry!» አለ። ሴትየዋ ግራ ተጋባች። «ለምኑ ነው sorry የምትለው?»",
    },
    {
      en: "Then the bus bumped, and Gugu stood on a man's foot. \"Excuse me!\" said Gugu. The man rubbed his foot and frowned.",
      am: "ከዚያ አውቶቡሱ ተንገጫገጨ፤ ጉጉ የአንድን ሰው እግር ረገጠ። «Excuse me!» አለ ጉጉ። ሰውየው እግሩን እያሻሸ ፊቱን ቋጠረ።",
    },
    {
      en: "Tsehay thought about it. \"Gugu! Excuse me comes BEFORE: to get past, or to ask. Sorry comes AFTER, when you make a mistake.\"",
      am: "ፀሐይ አሰበችበት። «ጉጉ! Excuse me በፊት ይመጣል፦ ለማለፍ ወይም ለመጠየቅ። Sorry በኋላ ይመጣል፤ ስትሳሳት።»",
    },
    {
      en: "\"Excuse me before, sorry after!\" whispered Gugu. He turned to the man. \"I'm sorry I stood on your foot.\" The man smiled. \"That's OK.\"",
      am: "«Excuse me before, sorry after!» (በፊት excuse me፣ በኋላ sorry!) አለ ጉጉ በሹክሹክታ። ወደ ሰውየው ዞረ። «እግርህን ስለረገጥኩ sorry።» ሰውየው ፈገግ አለ።",
    },
    {
      en: "Next, Gugu needed to get to the window. \"Excuse me, please,\" he said. The lady moved her bag. \"Thank you!\" Excuse me before, sorry after!",
      am: "ቀጥሎ ጉጉ ወደ መስኮቱ መሄድ ፈለገ። «Excuse me, please» አለ። ሴትየዋ ቦርሳዋን አንቀሳቀሰች። «Thank you!» Excuse me before, sorry after!",
    },
    {
      en: "An old woman got on, with a big basket. There were no seats. Gugu stood up. \"Would you like to sit down?\"",
      am: "አንዲት አሮጊት ትልቅ ቅርጫት ይዘው ገቡ። ወንበር አልነበረም። ጉጉ ተነሳ። «Would you like to sit down?» (መቀመጥ ይፈልጋሉ?)",
    },
    {
      en: "\"Thank you, little one,\" she said. \"You're welcome,\" said Gugu. Papa winked at Tsehay.",
      am: "«አመሰግናለሁ፣ ልጄ» አሉ። «You're welcome» አለ ጉጉ። አባባ ለፀሐይ ዓይኑን አጨፈነላት።",
    },
    {
      en: "Then the hen got out of her basket! Flap, flap! She landed on Gugu's head. \"Excuse me, hen!\" said Gugu. \"May I have my head back?\"",
      am: "ከዚያ ዶሮዋ ከቅርጫቷ ወጣች! ፍልፍል! የጉጉ ራስ ላይ አረፈች። «Excuse me, hen!» አለ ጉጉ። «ራሴን መልሺልኝ?»",
    },
    {
      en: "Everyone laughed, even the hen's owner. \"Sorry!\" she said, and put the hen back. At the market, Papa said, \"Well done, Gugu.\"",
      am: "ሁሉም ሳቁ፤ የዶሮዋ ባለቤትም ጭምር። «Sorry!» አሉና ዶሮዋን መለሷት። ገበያው ሲደርሱ አባባ «ጎበዝ፣ ጉጉ» አለ።",
    },
    {
      en: "Excuse me before, sorry after! When did you last say sorry, {name}?",
      am: "Excuse me before, sorry after! {name}፣ ለመጨረሻ ጊዜ sorry ያላችሁት መቼ ነው?",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why did the lady look puzzled when Gugu said sorry?", "When do we say excuse me? When do we say sorry?"],
      am: ["ጉጉ sorry ሲል ሴትየዋ ለምን ግራ ተጋባች?", "Excuse me የምንለው መቼ ነው? Sorry የምንለውስ?"],
    },
    activity: {
      en: 'Play "Excuse me or sorry?": describe a moment and your child answers. "You want to get past someone." (Excuse me.) "You spilled water on a friend." (Sorry.) "You want to ask the teacher something." (Excuse me.) "You bumped into someone." (Sorry.)',
      am: '«Excuse me or sorry?» ተጫወቱ፦ አንድ ሁኔታ ይግለጹ፤ ልጅዎ ይመልሳል። «አንድን ሰው አልፈህ መሄድ ትፈልጋለህ።» (Excuse me.) «ጓደኛህ ላይ ውሃ ደፋህ።» (Sorry.) «መምህሩን አንድ ነገር መጠየቅ ትፈልጋለህ።» (Excuse me.) «አንድን ሰው ገጨህ።» (Sorry.)',
    },
  },
};

export default story;
