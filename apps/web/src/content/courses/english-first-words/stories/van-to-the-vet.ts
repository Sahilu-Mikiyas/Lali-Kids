import type { Story } from "../../../stories";

/*
  "The Van to the Vet" (level 4: the sounds u, v, w).
  Haben's little goat, Tsigereda, is limping. Her father says they'll take her to the vet (‘v’)
  in town, in Uncle's blue van (‘v’). But it starts to rain (‘w’ for wet and water) and the goat
  won't go up (‘u’) the ramp: she plants her hooves and cries "Maa!". Haben opens her umbrella
  (‘u’), and the goat steps under it (‘u’), out of the rain. Haben works it out: the goat is
  scared of the rain drumming on the van, not of the van. So she walks her up the ramp under the
  umbrella, step by step. At the vet: a thorn in the hoof, out it comes. "Very good goat!"
  Join-in line: "Up, up, into the van! Off we go to the vet!"

  English taught: the sounds ‘u’ (short, as in up), ‘v’, ‘w’ and up, under, umbrella, van, vet,
  very, wet, water, window.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ወደ ላይ፣ ወደ ላይ፣ ወደ መኪናው! ወደ እንስሳት ሐኪም እንሂድ!» and «የእንስሳት ሐኪም» for vet.
  "Tsigereda" (ጽጌረዳ, rose) is the goat's name.
*/
const story: Story = {
  id: "van-to-the-vet",
  course: "english-first-words",
  pack: "story",
  title: { en: "The Van to the Vet", am: "በቫን ወደ እንስሳት ሐኪም" },
  category: "English",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#2F6FD0",
  scene: "lib-van-to-the-vet",
  coverPage: 6,
  teaches: { words: ["u", "v", "w", "up", "under", "umbrella", "van", "vet", "very", "wet", "water", "window"] },
  pages: [
    {
      en: 'Haben\'s little goat, Tsigereda, was limping. Hop, hop, ouch. "Her leg hurts," said Haben. "We\'ll take her to the vet in town," said her father. "‘v’, ‘v’, VET!"',
      am: 'የሐበን ትንሿ ፍየል ጽጌረዳ ታነክስ ነበር። ዘለል፣ ዘለል፣ ውይ። «እግሯ ያማታል» አለች ሐበን። «ከተማ ወዳለው የእንስሳት ሐኪም እንወስዳታለን» አሉ አባቷ። «‘v’፣ ‘v’፣ VET!»',
    },
    {
      en: 'Uncle came in his big blue van. Beep, beep! "‘v’, ‘v’, VAN!" He put down a ramp. "Up, up, into the van! Off we go to the vet!"',
      am: 'አጎቷ በትልቁ ሰማያዊ ቫናቸው መጡ። ቢፕ፣ ቢፕ! «‘v’፣ ‘v’፣ VAN!» መወጣጫ አወረዱ። «Up, up, into the van! Off we go to the vet!» (ወደ ላይ፣ ወደ ላይ፣ ወደ መኪናው! ወደ እንስሳት ሐኪም እንሂድ!)',
    },
    {
      en: 'Then drip, drop, it began to rain. The ramp got wet. The window got wet. "‘w’, ‘w’, WET! ‘w’, ‘w’, WATER!"',
      am: 'ከዚያ ጠብ፣ ጠብ፣ ዝናብ መዝነብ ጀመረ። መወጣጫው ረጠበ። መስኮቱም ረጠበ። «‘w’፣ ‘w’፣ WET! ‘w’፣ ‘w’፣ WATER!»',
    },
    {
      en: '"Up you go, Tsigereda! ‘u’, ‘u’, UP!" But the little goat planted her hooves. "Maa!" She would not go up. Up, up, into the van!',
      am: '«ወደ ላይ፣ ጽጌረዳ! ‘u’፣ ‘u’፣ UP!» ትንሿ ፍየል ግን ኮቴዎቿን ተከለች። «ሜ!» ወደ ላይ አልወጣም አለች። Up, up, into the van!',
    },
    {
      en: 'Haben pulled. Uncle pushed. "Maa! Maa!" The rain drummed on the roof of the van, rat-a-tat-tat. The goat shook all over.',
      am: 'ሐበን ጎተተች። አጎቷ ገፉ። «ሜ! ሜ!» ዝናቡ በቫኑ ጣሪያ ላይ ታ-ታ-ታ-ታ ይመታ ነበር። ፍየሏ ሰውነቷ በሙሉ ተንቀጠቀጠ።',
    },
    {
      en: 'Haben opened her red umbrella. "‘u’, ‘u’, UMBRELLA!" At once, the little goat ducked under it, out of the rain. "‘u’, ‘u’, UNDER!"',
      am: 'ሐበን ቀዩን ዣንጥላዋን ዘረጋች። «‘u’፣ ‘u’፣ UMBRELLA!» ወዲያው ትንሿ ፍየል ከዝናቡ ለመሸሸግ ከሥሩ ገባች። «‘u’፣ ‘u’፣ UNDER!»',
    },
    {
      en: 'Haben looked at her goat, dry and calm under the umbrella. "She\'s not scared of the van," she said. "She\'s scared of the noisy rain!"',
      am: 'ሐበን ከዣንጥላው ሥር ደርቃና ተረጋግታ ያለችውን ፍየሏን ተመለከተች። «የምትፈራው ቫኑን አይደለም» አለች። «የምትፈራው ጫጫታውን ዝናብ ነው!»',
    },
    {
      en: 'So Haben walked up the ramp, step by step, holding the umbrella over them both. Tsigereda walked right beside her. Up, up, into the van! Off we go to the vet!',
      am: 'ስለዚህ ሐበን ዣንጥላውን ከሁለቱም በላይ ይዛ ደረጃ በደረጃ መወጣጫውን ወጣች። ጽጌረዳም አጠገቧ ተራመደች። Up, up, into the van! Off we go to the vet!',
    },
    {
      en: 'Swish, swish went the wipers on the wet window. "‘w’, ‘w’, WINDOW!" Tsigereda sat on Haben\'s lap and looked out at the rain.',
      am: 'መጥረጊያዎቹ በረጠበው መስኮት ላይ ሽው፣ ሽው አሉ። «‘w’፣ ‘w’፣ WINDOW!» ጽጌረዳ በሐበን ጭን ላይ ተቀምጣ ዝናቡን ወደ ውጭ ተመለከተች።',
    },
    {
      en: 'At the vet, Doctor Selam looked at the sore leg. "Aha! A thorn in her hoof." Out it came. A bandage went on. "Very good goat!" said the vet. "‘v’, ‘v’, VERY good!"',
      am: 'በእንስሳት ሐኪሙ ዘንድ ዶክተር ሰላም የታመመውን እግር ተመለከቱ። «አሃ! በኮቴዋ ውስጥ እሾህ አለ።» አወጡት። ፋሻም አሰሩላት። «Very good goat!» (በጣም ጎበዝ ፍየል!) አሉ ሐኪሟ። «‘v’፣ ‘v’፣ VERY good!»',
    },
    {
      en: "By the time they drove home, the rain had stopped. Tsigereda jumped down the ramp and splashed in a puddle of water. Hop, hop, no ouch!",
      am: "ወደ ቤት ሲመለሱ ዝናቡ አቁሞ ነበር። ጽጌረዳ ከመወጣጫው ዘልላ ወረደችና በውሃ ኩሬ ውስጥ ረጨች። ዘለል፣ ዘለል፣ ምንም ሕመም የለም!",
    },
    {
      en: '"‘u’ for umbrella, ‘v’ for van and vet, ‘w’ for water!" said Haben. Up, up, into the van! What starts with ‘u’, ‘v’ or ‘w’, {name}?',
      am: '«‘u’ ለ umbrella፣ ‘v’ ለ van እና vet፣ ‘w’ ለ water!» አለች ሐበን። Up, up, into the van! {name}፣ በ‘u’፣ ‘v’ ወይም ‘w’ የሚጀምር ምን አለ?',
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["What was the little goat really scared of? How did Haben work it out?", "When you are scared, what helps you feel safe?"],
      am: ["ትንሿ ፍየል በእርግጥ የፈራችው ምንድን ነበር? ሐበን እንዴት አወቀች?", "ስትፈሩ ደህንነት እንዲሰማችሁ የሚረዳችሁ ምንድን ነው?"],
    },
    activity: {
      en: 'Play "under, up": hold an umbrella or a cloth and ask your child to go UNDER it, then to put their hands UP. Then find ‘v’ and ‘w’ things: a van on the road, water, a window. The sounds: ‘u’ as in up (short, like a quick አ said from the middle of the mouth), ‘v’ as in van (top teeth on the lip, buzzing, like ቭ), ‘w’ as in water (round lips, like ው).',
      am: '«under, up» ተጫወቱ፦ ዣንጥላ ወይም ጨርቅ ያዙና ልጃችሁ ከሥሩ (UNDER) እንዲገባ፣ ከዚያም እጆቹን ወደ ላይ (UP) እንዲያደርግ ጠይቁት። ከዚያ የ‘v’ እና የ‘w’ ነገሮችን ፈልጉ፦ መንገድ ላይ ቫን፣ ውሃ፣ መስኮት። ድምፆቹ፦ ‘u’ እንደ up (አጭር፣ ከአፍ መሐል እንደሚነገር ፈጣን አ)፣ ‘v’ እንደ van (የላይኛው ጥርስ ከንፈር ላይ፣ እያንዘረዘረ፣ እንደ ቭ)፣ ‘w’ እንደ water (ከንፈር ክብ ሆኖ፣ እንደ ው)።',
    },
  },
};

export default story;
