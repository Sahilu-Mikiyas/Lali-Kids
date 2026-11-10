import type { Story } from "../../../stories";

/*
  "The K-L-M Kite" (level 3: first sounds k, l, m).
  On a windy day Anbessa and Gugu make a kite and paint three big letters on it: K for kite,
  L for lion (that's Anbessa) and M for monkey (that's Gugu: geladas are monkeys). Up it flies,
  over the mango tree, until a gust drops it into the prickly lemon tree. Gugu can't climb the
  thin branches; Anbessa can't jump high enough; a stick is too short. Anbessa looks at the L on
  the kite and works it out: "l… LADDER! Grandma has a ladder!" Grandma holds it steady, Anbessa
  climbs and frees the kite (plop, a lemon too), and it flies over the mountains until the moon
  comes up. Lemon juice at home: K for kite, L for ladder and lemon, M for moon.
  Join-in line: "Fly, kite, fly! K, L, M in the sky!"

  English taught: the first sounds ‘k’, ‘l’, ‘m’ and kite, lion, monkey, mango, lemon, ladder,
  mountains, moon.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «በሪ፣ ካይት፣ በሪ! K፣ L፣ M በሰማይ!» and «ካይት» (kite) as used in Amharic.
*/
const story: Story = {
  id: "letter-kite",
  course: "english-first-words",
  pack: "story",
  title: { en: "The K-L-M Kite", am: "የK-L-M ካይት" },
  category: "English",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#C99A00",
  scene: "lib-letter-kite",
  coverPage: 3,
  teaches: { words: ["k", "l", "m", "kite", "lion", "monkey", "mango", "lemon", "ladder", "mountains", "moon"] },
  pages: [
    {
      en: 'Whoosh! The wind was strong and the sky was blue. "Kite weather!" said Anbessa. He and Gugu made a kite out of sticks, paper and a long, long string.',
      am: 'ሹው! ነፋሱ ኃይለኛ፣ ሰማዩም ሰማያዊ ነበር። «የካይት አየር ነው!» አለ አንበሳ። እሱና ጉጉ በእንጨቶች፣ በወረቀትና በረጅም፣ ረጅም ገመድ ካይት ሠሩ።',
    },
    {
      en: 'Anbessa painted a big K on the kite. "K says ‘k’, like a little click: ‘k’, ‘k’, KITE!" Then he painted an L. "L says ‘l’: ‘l’, ‘l’, LION! That\'s me!"',
      am: 'አንበሳ በካይቱ ላይ ትልቅ K ሣለ። «K የሚለው ‘k’ ነው፤ እንደ ትንሽ ቋ፦ ‘k’፣ ‘k’፣ KITE!» ከዚያ L ሣለ። «L የሚለው ‘l’ ነው፦ ‘l’፣ ‘l’፣ LION! ይህ እኔ ነኝ!»',
    },
    {
      en: 'Gugu painted an M. "M says ‘mmm’: ‘m’, ‘m’, MONKEY! That\'s me! Geladas are monkeys, you know." K, L, M. The kite was ready!',
      am: 'ጉጉ M ሣለ። «M የሚለው ‘mmm’ ነው፦ ‘m’፣ ‘m’፣ MONKEY! ይህ እኔ ነኝ! ጭላዳዎች የዝንጀሮ ዘር ናቸው።» K፣ L፣ M። ካይቱ ተዘጋጀ!',
    },
    {
      en: "They ran up the hill, and up, up, up went the kite, dancing in the wind. Fly, kite, fly! K, L, M in the sky!",
      am: "ወደ ኮረብታው ሮጡ፤ ካይቱም ከፍ፣ ከፍ፣ ከፍ ብሎ በነፋሱ ውስጥ ጨፈረ። በሪ፣ ካይት፣ በሪ! K፣ L፣ M በሰማይ!",
    },
    {
      en: 'The kite flew over the mango tree. "‘m’, ‘m’, MANGO!" called Gugu. Then, whoosh! A big gust pulled the kite down, down, down…',
      am: 'ካይቱ በማንጎው ዛፍ ላይ በረረ። «‘m’፣ ‘m’፣ MANGO!» ብሎ ጠራ ጉጉ። ከዚያ ሹው! ኃይለኛ ነፋስ ካይቱን ወደ ታች፣ ታች፣ ታች ጎተተው…',
    },
    {
      en: "…right into the lemon tree! The kite was stuck, high in the branches. Gugu tried to climb, but the branches were thin and prickly. \"Ouch!\"",
      am: "…ልክ ሎሚው ዛፍ ውስጥ! ካይቱ ከፍ ብሎ በቅርንጫፎቹ መካከል ተያዘ። ጉጉ ለመውጣት ሞከረ፤ ቅርንጫፎቹ ግን ቀጭንና እሾሃማ ነበሩ። «ውይ!»",
    },
    {
      en: "Anbessa jumped as high as he could. Too short! He tried a long stick. Still too short! \"How can we reach it?\" said Gugu sadly.",
      am: "አንበሳ የቻለውን ያህል ከፍ ብሎ ዘለለ። አልደረሰም! ረጅም እንጨት ሞከረ። አሁንም አልደረሰም! «እንዴት እንድረስበት?» አለ ጉጉ በሐዘን።",
    },
    {
      en: 'Anbessa looked up at the big L on the kite. ‘l’, ‘l’… lemon… lion… "LADDER! Grandma has a ladder!"',
      am: 'አንበሳ በካይቱ ላይ ያለውን ትልቅ L ቀና ብሎ አየ። ‘l’፣ ‘l’… lemon… lion… «LADDER! አያቴ መሰላል አላት!»',
    },
    {
      en: "They carried Grandma's ladder to the tree, and Grandma held it steady. Up went Anbessa, step by step, and he untangled the kite. Plop! A lemon fell too. \"L for lemon!\"",
      am: "የአያቴን መሰላል ወደ ዛፉ ተሸከሙት፤ አያቴም አጥብቃ ያዘችው። አንበሳ ደረጃ በደረጃ ወጣ፤ ካይቱንም ፈታው። ዱብ! አንድ ሎሚም ወደቀ። «L for lemon!»",
    },
    {
      en: 'Up went the kite again, high over the mountains. "‘m’, ‘m’, MOUNTAINS!" Fly, kite, fly! K, L, M in the sky!',
      am: 'ካይቱ እንደገና ከፍ ብሎ በተራሮቹ ላይ በረረ። «‘m’፣ ‘m’፣ MOUNTAINS!» በሪ፣ ካይት፣ በሪ! K፣ L፣ M በሰማይ!',
    },
    {
      en: 'When the sky turned pink, a round moon came up behind the hills. "‘m’, ‘m’, MOON!" They pulled the kite home, slowly, slowly.',
      am: 'ሰማዩ ሮዝ ሲሆን ክብ ጨረቃ ከኮረብታዎቹ ጀርባ ወጣች። «‘m’፣ ‘m’፣ MOON!» ካይቱን ቀስ፣ ቀስ እያሉ ወደ ቤት ጎተቱት።',
    },
    {
      en: 'Grandma made lemon juice for everyone. "K for kite, L for ladder and lemon, M for moon. What a day!" What can you find that starts with ‘k’, ‘l’ or ‘m’, {name}?',
      am: 'አያቴ ለሁሉም የሎሚ ጭማቂ አዘጋጀች። «K ለ kite፣ L ለ ladder እና lemon፣ M ለ moon። እንዴት ያለ ቀን!» {name}፣ በ‘k’፣ ‘l’ ወይም ‘m’ የሚጀምር ምን ታገኛላችሁ?',
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "How did the letter L help Anbessa get the kite down?",
        "Can you think of more things that start with ‘k’, ‘l’ or ‘m’?",
      ],
      am: [
        "L የሚለው ፊደል አንበሳ ካይቱን እንዲያወርድ እንዴት ረዳው?",
        'በ‘k’፣ ‘l’ ወይም ‘m’ የሚጀምሩ ሌሎች ነገሮችን ማሰብ ትችላላችሁ?',
      ],
    },
    activity: {
      en: 'Make a paper kite (or a paper bird) and write a big K, L and M on it. Fly it round the room, and each time it "lands", say a word that starts with its sound. The sounds: ‘k’ as in kite (a little click, like ክ), ‘l’ as in lion (like ል), ‘m’ as in moon (lips closed, ‘mmm’, like ም).',
      am: 'የወረቀት ካይት (ወይም የወረቀት ወፍ) ሥሩና ትልቅ K፣ L እና M ጻፉበት። በክፍሉ ውስጥ አብርሩት፤ ባረፈ ቁጥር በድምፁ የሚጀምር ቃል ተናገሩ። ድምፆቹ፦ ‘k’ እንደ kite (ትንሽ ቋ፣ እንደ ክ)፣ ‘l’ እንደ lion (እንደ ል)፣ ‘m’ እንደ moon (ከንፈር ተዘግቶ «mmm»፣ እንደ ም)።',
    },
  },
};

export default story;
