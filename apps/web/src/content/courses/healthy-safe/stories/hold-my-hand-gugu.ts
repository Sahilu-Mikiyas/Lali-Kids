import type { Story } from "../../../stories";

/*
  "Hold My Hand, Gugu!" (level 5: roads and crossing with a grown-up).
  Gugu and Grandma go to town for new sandals. The road is busy (blue minibuses, bajajs, donkey
  carts, trucks). Gugu sees the shop across the road and lets go, but Grandma holds on just in
  time as a bajaj passes. She explains why little ones always hold hands on the road, and they
  find the zebra crossing: stop at the edge, look both ways, listen, wait until the cars stop
  and the road is clear, then walk across. Gugu becomes the "crossing leader" on the way back,
  and a good passenger on the bus.
  Join-in line: "Stop, look, listen, hold hands!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line «ቁም፣ ተመልከት፣ አዳምጥ፣ እጅ ያዝ!» and «የእግረኛ ማቋረጫ» (zebra crossing).
*/
const story: Story = {
  id: "hold-my-hand-gugu",
  course: "healthy-safe",
  pack: "story",
  title: { en: "Hold My Hand, Gugu!", am: "ጉጉ፣ እጄን ያዝ!" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#2E9A8A",
  scene: "lib-hold-my-hand-gugu",
  coverPage: 6,
  teaches: { words: ["road", "stop", "look", "listen", "cross"] },
  pages: [
    {
      en: "Grandma and Gugu went to town to buy new sandals. The road was busy: blue minibuses, little bajajs, donkey carts and trucks.",
      am: "አያቴና ጉጉ ጫማ ሊገዙ ወደ ከተማ ሄዱ። መንገዱ ተጨናንቆ ነበር፦ ሰማያዊ ሚኒባሶች፣ ባጃጆች፣ የአህያ ጋሪዎችና የጭነት መኪኖች።",
    },
    {
      en: "Gugu saw the shoe shop across the road. \"There it is!\" He let go of Grandma's hand and started to run.",
      am: "ጉጉ የጫማ ሱቁን ከመንገዱ ማዶ አየው። «ያው!» የአያቴን እጅ ለቅቆ መሮጥ ጀመረ።",
    },
    {
      en: "But Grandma held on to his paw, just in time. Beep! A bajaj zoomed past. Gugu's heart went thump, thump.",
      am: "አያቴ ግን በጊዜ መዳፉን ያዘችው። ፒፕ! አንድ ባጃጅ ሽው ብሎ አለፈ። የጉጉ ልብ ዱብ ዱብ አለ።",
    },
    {
      en: "\"Drivers can't always see little ones,\" said Grandma, \"and cars can't stop quickly. On the road, we always hold hands.\"",
      am: "«ሾፌሮች ሁልጊዜ ትንንሾችን አያዩም» አለች አያቴ፣ «መኪኖችም ቶሎ አይቆሙም። መንገድ ላይ ሁልጊዜ እጅ እንያያዛለን።»",
    },
    {
      en: "\"But how do we get across?\" asked Gugu. Grandma pointed to the white stripes on the road. \"First we find the zebra crossing.\"",
      am: "«ታዲያ እንዴት እንሻገር?» አለ ጉጉ። አያቴ ነጫጭ መስመሮቹን አመለከተች። «መጀመሪያ የእግረኛ ማቋረጫውን እንፈልጋለን።»",
    },
    {
      en: "\"Then we stop at the edge, look both ways, and listen,\" said Grandma. \"Stop, look, listen, hold hands!\"",
      am: "«ከዚያ ዳሩ ላይ ቆመን በሁለቱም በኩል አይተን እናዳምጣለን» አለች አያቴ። «ቁም፣ ተመልከት፣ አዳምጥ፣ እጅ ያዝ!»",
    },
    {
      en: "Gugu looked this way: a minibus. That way: a truck. He listened: brrrm, beep! \"Not yet,\" said Grandma. They waited.",
      am: "ጉጉ ወደዚህ ተመለከተ፦ ሚኒባስ። ወደዚያ፦ የጭነት መኪና። አዳመጠ፦ ብርርም፣ ፒፕ! «ገና ነው» አለች አያቴ። ጠበቁ።",
    },
    {
      en: "The cars stopped at the stripes. Gugu looked both ways again. All still. \"Now?\" \"Now,\" said Grandma. They walked, not ran, across.",
      am: "መኪኖቹ ከመስመሩ በፊት ቆሙ። ጉጉ እንደገና ተመለከተ። ሁሉም ቆሟል። «አሁን?» «አሁን» አለች አያቴ። ሳይሮጡ ተሻገሩ።",
    },
    {
      en: "At the shop, Gugu chose red sandals. Then he had an idea. \"Grandma, I'll be the crossing leader on the way back!\"",
      am: "በሱቁ ጉጉ ቀይ ጫማ መረጠ። ከዚያ ሐሳብ መጣለት። «አያቴ፣ ስንመለስ እኔ የማቋረጫ መሪ እሆናለሁ!»",
    },
    {
      en: "At the stripes, Gugu held Grandma's hand and said it out loud: \"Stop, look, listen, hold hands!\" The bajaj driver waited, smiling.",
      am: "መስመሩ ጋ ጉጉ የአያቴን እጅ ይዞ ጮክ ብሎ ተናገረ፦ «ቁም፣ ተመልከት፣ አዳምጥ፣ እጅ ያዝ!» የባጃጁ ሾፌር ፈገግ ብሎ ጠበቀ።",
    },
    {
      en: "On the bus home, Gugu sat down, held on, and kept his head and hands inside the window. \"A good passenger too!\" said Grandma.",
      am: "በአውቶቡሱ ጉጉ ተቀምጦ ተያያዘ፤ ራሱንና እጁን በመስኮቱ አላወጣም። «ጎበዝ ተሳፋሪም ነህ!» አለች አያቴ።",
    },
    {
      en: "At home, Gugu taught Tsehay and Anbessa the crossing game in the yard. \"Stop, look, listen, hold hands!\"",
      am: "ቤት ጉጉ ለፀሐይና ለአንበሳ በግቢው ውስጥ የማቋረጫ ጨዋታውን አስተማራቸው። «ቁም፣ ተመልከት፣ አዳምጥ፣ እጅ ያዝ!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why did Grandma hold on to Gugu's hand? How did they cross the road safely?",
        "Where is the safest place to cross near our home? Who do you cross with?",
      ],
      am: [
        "አያቴ የጉጉን እጅ ለምን አጥብቃ ያዘች? መንገዱን በደህና እንዴት ተሻገሩ?",
        "በቤታችን አቅራቢያ ለመሻገር ከሁሉ ደህና የሆነው ቦታ የት ነው? ከማን ጋር ትሻገራላችሁ?",
      ],
    },
    activity: {
      en: "Practise \"stop, look, listen, hold hands\" on a quiet path or in the yard, then on real walks. Young children (under about 8) should always cross with a grown-up, holding hands, at a crossing where there is one, and never play near the road. In a vehicle, children sit down and keep heads and hands inside; use seat belts where there are any. Road traffic is one of the biggest dangers to children, so walking with them is always worth it.",
      am: "«ቁም፣ ተመልከት፣ አዳምጥ፣ እጅ ያዝ»ን ጸጥ ባለ መንገድ ወይም በግቢ ውስጥ፣ ከዚያም በእውነተኛ የእግር ጉዞ ይለማመዱ። ትንንሽ ልጆች (ከ8 ዓመት በታች ገደማ) ሁልጊዜ ከትልቅ ሰው ጋር እጅ ተያይዘው፣ ማቋረጫ ካለ በማቋረጫው መሻገር አለባቸው፤ በመንገድ አጠገብም መጫወት የለባቸውም። በመኪና ውስጥ ልጆች ተቀምጠው ራሳቸውንና እጃቸውን ውስጥ ያድርጉ፤ የደህንነት ቀበቶ ካለ ይጠቀሙ። የመንገድ ትራፊክ ለልጆች ከትልልቅ አደጋዎች አንዱ ስለሆነ አብሮ መሄድ ሁልጊዜ ይጠቅማል።",
    },
  },
};

export default story;
