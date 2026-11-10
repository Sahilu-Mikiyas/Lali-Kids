import type { Story } from "../../../stories";

/*
  "Stop, Van, Stop!" (level 5: word families -an and -op).
  Ayan and her little brother Abdi help Hooyo take things to Grandma Halima's in Uncle's van: a
  pan, a fan and a can of oil, tied ON TOP of the van, and a mop. Every bump on the road: hop!
  Something drops off the top, and Abdi shouts "Stop, van, stop!" Pop goes the can lid, off flies
  the fan, the pan clatters, the mop rolls. Each time Ayan reads the families on the things
  ("p-an, f-an, c-an, v-an!", "t-op, h-op, st-op, p-op, m-op!"). Then she works out the real
  problem: things on top can hop off; put them IN the van. The rest of the ride is smooth.
  Join-in line: "Stop, van, stop!"

  English taught: word families -an (van, pan, fan, can, ran, man) and -op (top, hop, stop, pop,
  mop); "on top" and "in".

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ቁም፣ ቫን፣ ቁም!», «አያቴ ሐሊማ» (Ayan's grandmother) and «የዘይት ጣሳ» for a can of oil.
*/
const story: Story = {
  id: "stop-the-van",
  course: "english-first-words",
  pack: "story",
  title: { en: "Stop, Van, Stop!", am: "Stop, Van, Stop! ቁም፣ ቫን!" },
  category: "English",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#0E8C80",
  scene: "lib-stop-the-van",
  coverPage: 4,
  teaches: { words: ["van", "pan", "fan", "can", "ran", "man", "top", "hop", "stop", "pop", "mop"] },
  pages: [
    {
      en: 'Ayan and Abdi were going to Grandma Halima\'s with Hooyo, in Uncle\'s green van. "v-an, VAN!" read Ayan, from the letters on its door.',
      am: 'አያንና አብዲ ከሁዮ ጋር በአጎታቸው አረንጓዴ ቫን ወደ አያታቸው ሐሊማ ቤት ይሄዱ ነበር። «v-an፣ VAN!» ብላ አነበበች አያን፣ ከበሩ ላይ ካሉት ፊደሎች።',
    },
    {
      en: 'Uncle tied a pan, a fan and a can of oil on top of the van. "p-an, PAN! f-an, FAN! c-an, CAN!" read Ayan. "They all end in ‘an’, like van!"',
      am: 'አጎታቸው መጥበሻ፣ ማራገቢያና የዘይት ጣሳ በቫኑ ላይ አሰሩ። «p-an፣ PAN! f-an፣ FAN! c-an፣ CAN!» ብላ አነበበች አያን። «ሁሉም እንደ van በ‘an’ ያልቃሉ!»',
    },
    {
      en: 'Abdi put Hooyo\'s mop on top too. "m-op, MOP!" he said proudly. Then off they went, along the bumpy road. Brrrm, brrrm!',
      am: 'አብዲ የሁዮን መወልወያ (mop) ደግሞ ላይ አደረገ። «m-op፣ MOP!» አለ በኩራት። ከዚያ በወጣ ገባው መንገድ ጉዞ ጀመሩ። ብሩም፣ ብሩም!',
    },
    {
      en: 'BUMP! The van went hop. "h-op, HOP!" Pop! The lid flew off the can. "p-op, POP!" Abdi shouted, "Stop, van, stop!"',
      am: 'ዱብ! ቫኑ ዘለለ። «h-op፣ HOP!» ፖፕ! የጣሳው ክዳን በረረ። «p-op፣ POP!» አብዲ ጮኸ፣ «Stop, van, stop!» (ቁም፣ ቫን፣ ቁም!)',
    },
    {
      en: 'Uncle stopped. "s-t-op, STOP," read Ayan from a sign by the road. They put the lid back on and set off again. Brrrm!',
      am: 'አጎታቸው ቆሙ። «s-t-op፣ STOP» ብላ አነበበች አያን ከመንገዱ ዳር ካለ ምልክት። ክዳኑን መልሰው ዘጉና እንደገና ተነሡ። ብሩም!',
    },
    {
      en: 'BUMP! Hop! The fan flew off the top and rolled down the road. A man ran after it. "m-an, MAN! r-an, RAN!" "Stop, van, stop!"',
      am: 'ዱብ! ዝላይ! ማራገቢያው ከላይ በርሮ በመንገዱ ተንከባለለ። አንድ ሰው ተከትሎት ሮጠ። «m-an፣ MAN! r-an፣ RAN!» «Stop, van, stop!»',
    },
    {
      en: 'BUMP! Hop! Clang! The pan fell off. Then the mop. Then the fan again! "Stop, van, stop!" Everybody laughed, but Hooyo shook her head. "At this rate we\'ll never get there."',
      am: 'ዱብ! ዝላይ! ቋ! መጥበሻው ወደቀ። ከዚያ መወልወያው። ከዚያ ደግሞ ማራገቢያው እንደገና! «Stop, van, stop!» ሁሉም ሳቁ፤ ሁዮ ግን ራሷን ነቀነቀች። «እንዲህማ ከሆነ በጭራሽ አንደርስም።»',
    },
    {
      en: 'Ayan looked at the top of the van, and then inside it. "Things on TOP can hop off," she said. "Things IN the van can\'t hop anywhere!"',
      am: 'አያን የቫኑን ጣሪያ፣ ከዚያም ውስጡን ተመለከተች። «ላይ (on TOP) ያሉ ነገሮች ሊዘሉ ይችላሉ» አለች። «በቫኑ ውስጥ (IN the van) ያሉ ነገሮች ግን የትም መዝለል አይችሉም!»',
    },
    {
      en: 'So they put the pan, the fan, the can and the mop IN the van, at their feet. Abdi held the can tight. "Off we go!"',
      am: 'ስለዚህ መጥበሻውን፣ ማራገቢያውን፣ ጣሳውንና መወልወያውን በቫኑ ውስጥ፣ እግራቸው አጠገብ አስቀመጡ። አብዲ ጣሳውን አጥብቆ ያዘ። «እንሂድ!»',
    },
    {
      en: "BUMP! The van went hop… but nothing fell off. Not the pan, not the fan, not the can, not the mop. Ayan grinned. \"Go, van, go!\"",
      am: "ዱብ! ቫኑ ዘለለ… ግን ምንም አልወደቀም። መጥበሻውም፣ ማራገቢያውም፣ ጣሳውም፣ መወልወያውም። አያን ፈገግ አለች። «Go, van, go!» (ሂድ፣ ቫን፣ ሂድ!)",
    },
    {
      en: 'At Grandma Halima\'s, the fan cooled them down, and the pan cooked a big lunch. Grandma laughed at the story. "A van that hops! What a trip!"',
      am: 'አያታቸው ሐሊማ ቤት ማራገቢያው አቀዘቀዛቸው፤ መጥበሻውም ትልቅ ምሳ አበሰለ። አያታቸው በታሪኩ ሳቁ። «የሚዘልል ቫን! እንዴት ያለ ጉዞ!»',
    },
    {
      en: 'Van, pan, fan, can, man, ran. Top, hop, stop, pop, mop. Stop, van, stop! What rhymes with "hop", {name}?',
      am: 'Van፣ pan፣ fan፣ can፣ man፣ ran። Top፣ hop፣ stop፣ pop፣ mop። Stop, van, stop! {name}፣ ከ«hop» ጋር ቤት የሚመታው ምንድን ነው?',
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why did things keep falling off the van? How did Ayan fix it?", "Which words end in ‘an’? Which end in ‘op’?"],
      am: ["ነገሮች ከቫኑ ላይ ለምን ይወድቁ ነበር? አያን እንዴት አስተካከለችው?", "በ‘an’ የሚያልቁት የትኞቹ ቃላት ናቸው? በ‘op’ የሚያልቁትስ?"],
    },
    activity: {
      en: 'Make two "family houses" from paper: one for ‘an’ and one for ‘op’. Write words on small cards (van, pan, fan, can, top, hop, mop, pop) and let your child read each one and post it into the right house. Then play "Stop, van, stop!": your child is the van, and stops when you say a word from the ‘op’ family.',
      am: 'ከወረቀት ሁለት «የቤተሰብ ቤቶች» ሥሩ፦ አንዱ ለ‘an’፣ አንዱ ለ‘op’። በትንንሽ ካርዶች ላይ ቃላት ጻፉ (van፣ pan፣ fan፣ can፣ top፣ hop፣ mop፣ pop)፤ ልጃችሁ እያንዳንዱን አንብቦ በትክክለኛው ቤት ውስጥ ያስገባው። ከዚያ «Stop, van, stop!» ተጫወቱ፦ ልጃችሁ ቫን ይሁን፤ ከ‘op’ ቤተሰብ አንድ ቃል ስትሉ ይቁም።',
    },
  },
};

export default story;
