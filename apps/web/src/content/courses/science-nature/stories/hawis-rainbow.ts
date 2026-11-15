import type { Story } from "../../../stories";

/*
  "Hawi's Rainbow" (level 4: rainbows and light). After a shower in the Bale hills Hawi runs to reach
  a rainbow, and it moves away: a rainbow isn't a thing, it is light. Sunlight looks white but is all
  the colours mixed. Hawi notices the sun is always behind her and the rain in front. Each raindrop
  bends sunlight and splits it into colours; millions of drops make the bow. She makes one in the mist
  of a watering can, with the sun at her back; a glass of water on the windowsill throws a little
  rainbow on the floor. The colours always come in the same order, red on the outside. When she tries
  to show Haben at noon, it doesn't work; she works out that the sun must be low, and in the evening
  it does. Grandpa: the spray of the Blue Nile Falls makes rainbows too.
  Join-in line: "Sun behind me, rain in front: let's go on a rainbow hunt!"

  Science (kept simple and true): white sunlight is a mix of colours; raindrops refract and reflect
  it, spreading the colours into a bow, red outside and violet inside; you see a rainbow with the sun
  behind you and drops in front; when the sun is high (around midday) the bow is below the horizon,
  so rainbows are seen in the morning or late afternoon; a rainbow moves as you move.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ፀሐይ ከኋላ፣ ዝናብ ከፊት፦ ቀስተ ደመና እንፈልግ!» and the colour names.
*/
const story: Story = {
  id: "hawis-rainbow",
  course: "science-nature",
  pack: "story",
  title: { en: "Hawi's Rainbow", am: "የሀዊ ቀስተ ደመና" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#8A5AB8",
  scene: "lib-hawis-rainbow",
  coverPage: 9,
  teaches: { words: ["rainbow", "light", "colour", "raindrop", "sun"] },
  pages: [
    {
      en: "After a morning shower, the sun came out over the Bale hills. Hawi gasped: a rainbow! \"I'll run to where it touches the ground!\"",
      am: "ከጠዋት ካፊያ በኋላ በባሌ ኮረብቶች ላይ ፀሐይ ወጣች። ሀዊ ደነቀች፦ ቀስተ ደመና! «መሬት የሚነካበት ድረስ እሮጣለሁ!»",
    },
    {
      en: "She ran and ran, but the rainbow moved away. Grandpa Tolosa laughed. \"Nobody can catch a rainbow. It isn't a thing. It is light!\"",
      am: "ሮጠች፣ ሮጠች፤ ቀስተ ደመናው ግን ራቀ። አባ ቶሎሳ ሳቁ። «ቀስተ ደመናን ማንም አይይዘውም። ዕቃ አይደለም። ብርሃን ነው!»",
    },
    {
      en: "\"Sunlight looks white, but it is many colours mixed together. Let's find out how a rainbow is made.\" Sun behind me, rain in front: let's go on a rainbow hunt!",
      am: "«የፀሐይ ብርሃን ነጭ ይመስላል፤ ግን የተቀላቀሉ ብዙ ቀለሞች ነው። እስቲ እንወቅ።» ፀሐይ ከኋላ፣ ዝናብ ከፊት፦ ቀስተ ደመና እንፈልግ!",
    },
    {
      en: "Hawi watched the sky for days. She noticed something. \"Every time I see a rainbow, the sun is behind me, and the rain is in front!\"",
      am: "ሀዊ ለቀናት ሰማዩን ተመለከተች። አንድ ነገር አስተዋለች። «ቀስተ ደመና ባየሁ ቁጥር ፀሐይ ከኋላዬ፣ ዝናቡ ደግሞ ከፊቴ ነው!»",
    },
    {
      en: "\"Good noticing!\" said Grandpa. \"Each raindrop bends the sunlight and splits it into its colours. Millions of drops together make the bow.\"",
      am: "«ጥሩ ተመልክተሻል!» አሉ አባ ቶሎሳ። «እያንዳንዱ የዝናብ ጠብታ የፀሐይን ብርሃን አጥፎ ወደ ቀለሞቹ ይከፍለዋል። ሚሊዮን ጠብታዎች ቀስቱን ይሠራሉ።»",
    },
    {
      en: "Next sunny morning, Hawi stood with the sun at her back and sprinkled water from a watering can. In the mist, a little rainbow! Sun behind me, rain in front!",
      am: "በሚቀጥለው ፀሐያማ ጠዋት ሀዊ ፀሐይን ከኋላዋ አድርጋ በማጠጫ ውሃ ረጨች። በጭጋጉ ውስጥ ትንሽ ቀስተ ደመና! ፀሐይ ከኋላ፣ ዝናብ ከፊት!",
    },
    {
      en: "She counted the colours: red, orange, yellow, green, blue and violet. Always in the same order, with red on the outside.",
      am: "ቀለሞቹን ቆጠረች፦ ቀይ፣ ብርቱካናማ፣ ቢጫ፣ አረንጓዴ፣ ሰማያዊ፣ ወይን ጠጅ። ሁልጊዜ በዚያው ቅደም ተከተል፤ ቀዩ በውጭ በኩል።",
    },
    {
      en: "Then she set a glass of water on the sunny windowsill. On the floor below: a tiny rainbow! \"The water splits the light, just like a raindrop.\"",
      am: "ከዚያ ብርጭቆ ውሃ ፀሐያማው መስኮት ላይ አስቀመጠች። ከታች ወለሉ ላይ ትንሽ ቀስተ ደመና! «ውሃው ብርሃኑን ይከፍላል፤ ልክ እንደ ዝናብ ጠብታ።»",
    },
    {
      en: "At noon, Hawi wanted to show Haben. She sprinkled and sprinkled. No rainbow! The sun was high overhead. Hawi thought hard. \"The sun must be low!\"",
      am: "እኩለ ቀን ሀዊ ለሐበን ልታሳያት ፈለገች። ረጨች፣ ረጨች። ቀስተ ደመና የለም! ፀሐይ ከራስ በላይ ነበረች። ሀዊ አሰበች። «ፀሐይ ዝቅ ማለት አለባት!»",
    },
    {
      en: "In the evening, the sun was low behind them. Sprinkle, sprinkle… a rainbow in the spray! Haben clapped. Sun behind me, rain in front: let's go on a rainbow hunt!",
      am: "ምሽት ፀሐይ ከኋላቸው ዝቅ ብላ ነበር። ርጭ፣ ርጭ… በርጭቱ ውስጥ ቀስተ ደመና! ሐበን አጨበጨበች። ፀሐይ ከኋላ፣ ዝናብ ከፊት፦ ቀስተ ደመና እንፈልግ!",
    },
    {
      en: "\"At Tis Abay, the Blue Nile Falls,\" said Grandpa, \"the spray rises like smoke. On sunny days it is full of rainbows.\"",
      am: "«በጢስ ዓባይ ፏፏቴ» አሉ አባ ቶሎሳ፣ «ርጭቱ እንደ ጢስ ይወጣል። በፀሐያማ ቀናት በቀስተ ደመና ይሞላል።»",
    },
    {
      en: "Now, whenever rain and sun come together, Hawi turns her back to the sun and looks. \"Sun behind me, rain in front: let's go on a rainbow hunt!\"",
      am: "አሁን ዝናብና ፀሐይ አብረው ሲመጡ ሀዊ ጀርባዋን ለፀሐይ ሰጥታ ትመለከታለች። «ፀሐይ ከኋላ፣ ዝናብ ከፊት፦ ቀስተ ደመና እንፈልግ!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Where is the sun when you see a rainbow? Why didn't Hawi's rainbow work at noon?", "What colours are in a rainbow? What order are they in?"],
      am: ["ቀስተ ደመና ስታዩ ፀሐይ የት ናት? የሀዊ ቀስተ ደመና እኩለ ቀን ለምን አልሠራም?", "በቀስተ ደመና ውስጥ ምን ቀለሞች አሉ? በምን ቅደም ተከተል?"],
    },
    activity: {
      en: "In the early morning or late afternoon, stand with the sun behind you and sprinkle water from a watering can or a cup. Or set a clear glass of water on a sunny windowsill and look for a rainbow on the floor.",
      am: "በማለዳ ወይም ከሰዓት በኋላ ፀሐይን ከኋላችሁ አድርጋችሁ በማጠጫ ወይም በስኒ ውሃ ርጩ። ወይም ግልጽ ብርጭቆ ውሃ ፀሐያማ መስኮት ላይ አስቀምጣችሁ ወለሉ ላይ ቀስተ ደመና ፈልጉ።",
    },
  },
};

export default story;
