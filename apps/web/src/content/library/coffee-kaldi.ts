import type { Story } from "../stories";

/*
  "Kaldi and the Dancing Goats": the legend of how coffee was found in Kaffa, told by Grandma
  at her coffee ceremony. Kaldi the goatherd finds his goats dancing after eating red cherries
  from a shiny green bush; he tastes one and dances too, and runs to the monastery. The old
  monk throws the "silly berries" into the fire, the roasting beans smell wonderful, the monks
  crush them and pour hot water over them: the first pot of coffee. It is told as a legend
  ("people tell", "says the legend") inside a real, present-day family coffee ceremony: the
  roasting pan, the jebena, and the three rounds abol, tona and bereka. Coffee is for grown-ups,
  so the children have popcorn.
  The repeated line to join in on: "Hop, skip, twirl!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line (ዝለል፣ ቦርቅ፣ ዙር!), the sounds (ቅጭጭ፣ ቋ, ፊውው, ሜ) and the monk's honorific
  plural forms.
*/
const story: Story = {
  id: "coffee-kaldi",
  pack: "story",
  title: { en: "Kaldi and the Dancing Goats", am: "ካልዲና የሚደንሱት ፍየሎች" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#8E4E2E",
  scene: "lib-coffee-kaldi",
  coverPage: 4,
  teaches: { words: ["goat", "berry", "legend", "coffee", "forest", "smell"] },
  pages: [
    {
      en: 'Crackle, pop! Grandma was roasting coffee beans, and a lovely smell filled the house. "Grandma," asked Anbessa, "who found the very first coffee?"',
      am: "ቅጭጭ፣ ቋ! አያት ቡና እየቆላች ነበር፤ ደስ የሚል መዓዛም ቤቱን ሞላው። «አያቴ» ብሎ ጠየቀ አንበሳ፣ «የመጀመሪያውን ቡና ማን አገኘው?»",
    },
    {
      en: 'Grandma smiled. "People tell an old, old legend. Long ago, in the green forests of Kaffa, there lived a goatherd named Kaldi…"',
      am: "አያት ፈገግ አለች። «ሰዎች አንድ በጣም የቆየ አፈ ታሪክ ይናገራሉ። ከብዙ ዘመን በፊት፣ በከፋ አረንጓዴ ደኖች ውስጥ ካልዲ የሚባል ፍየል ጠባቂ ይኖር ነበር…»",
    },
    {
      en: "Every evening, Kaldi played his washint flute, and his goats came running home. Tweedle-tweet! But one evening, the goats did not come.",
      am: "በየምሽቱ ካልዲ ዋሽንቱን ሲነፋ ፍየሎቹ እየሮጡ ወደ ቤት ይመጡ ነበር። ፊውው-ፊው! አንድ ምሽት ግን ፍየሎቹ አልመጡም።",
    },
    {
      en: 'Kaldi searched the forest, high and low. Then he heard a funny sound: "Maa! Maa!" There were his goats, nibbling bright red berries from a shiny green bush.',
      am: "ካልዲ ደኑን ላይና ታች ፈለገ። ከዚያም አስቂኝ ድምፅ ሰማ፦ «ሜ! ሜ!» ፍየሎቹ እዚያ ነበሩ፤ ከአንድ የሚያብረቀርቅ አረንጓዴ ቁጥቋጦ ደማቅ ቀይ ፍሬዎችን እየበሉ።",
    },
    {
      en: "And then… the goats began to dance! They hopped on their back legs. They kicked and they spun. Hop, skip, twirl! Maa, maa, maa!",
      am: "ከዚያ… ፍየሎቹ መደነስ ጀመሩ! በኋላ እግሮቻቸው ቆመው ዘለሉ። ረገጡ፣ ተሽከረከሩ። ዝለል፣ ቦርቅ፣ ዙር! ሜ፣ ሜ፣ ሜ!",
    },
    {
      en: 'The moon came up, and still they danced. The stars came out, and still they danced! Kaldi yawned. "Don\'t you goats ever sleep?" Hop, skip, twirl!',
      am: "ጨረቃ ወጣች፤ አሁንም ይደንሱ ነበር። ከዋክብት ወጡ፤ አሁንም ይደንሱ ነበር! ካልዲ አዛጋ። «እናንተ ፍየሎች አትተኙም እንዴ?» ዝለል፣ ቦርቅ፣ ዙር!",
    },
    {
      en: "In the morning, Kaldi tasted one red berry. Sweet! Soon his toes began to tap… his knees began to bounce… and Kaldi was dancing too! Hop, skip, twirl!",
      am: "ጠዋት ላይ ካልዲ አንዲት ቀይ ፍሬ ቀመሰ። ጣፋጭ ናት! ብዙም ሳይቆይ ጣቶቹ መታ መታ ማለት ጀመሩ… ጉልበቶቹ ዘለሉ… ካልዲም መደነስ ጀመረ! ዝለል፣ ቦርቅ፣ ዙር!",
    },
    {
      en: 'Kaldi filled his basket and ran up the hill to the monastery. "Father, Father! Look at the berries that make my goats dance!"',
      am: "ካልዲ ቅርጫቱን ሞልቶ ኮረብታውን ወጥቶ ወደ ገዳሙ ሮጠ። «አባ፣ አባ! ፍየሎቼን የሚያስደንሱትን ፍሬዎች ይመልከቱ!»",
    },
    {
      en: 'The old monk frowned. "Dancing berries? Nonsense!" And he tossed them into the fire. Crackle, pop, POP!',
      am: "አረጋዊው መነኩሴ ፊታቸውን አኮሳተሩ። «የሚያስደንሱ ፍሬዎች? ከንቱ ነገር!» ብለው እሳቱ ውስጥ ጣሏቸው። ቅጭጭ፣ ቋ፣ ቋ!",
    },
    {
      en: 'Then a wonderful smell curled out of the fire: warm and rich and toasty. Sniff, sniff! All the monks came running. "What is that smell?"',
      am: "ከዚያም ድንቅ መዓዛ ከእሳቱ እየተጠቀለለ ወጣ፤ ሞቅ ያለ፣ ጥልቅና የተቆላ። ሽት፣ ሽት! መነኮሳቱ ሁሉ እየሮጡ መጡ። «ይህ ምንድን ነው የሚሸተው?»",
    },
    {
      en: "They raked the roasted beans out of the fire, crushed them, and poured hot water over them. And that, says the legend, was the very first pot of coffee.",
      am: "የተቆሉትን ፍሬዎች ከእሳቱ አውጥተው ወቀጧቸው፤ የፈላ ውሃም አፈሰሱባቸው። አፈ ታሪኩ እንደሚለው፣ ያ የመጀመሪያው የቡና ጀበና ነበር።",
    },
    {
      en: "The monks sipped. Their eyes opened wide. That night they stayed awake for their prayers, bright as the stars. And Kaldi's goats? Still dancing!",
      am: "መነኮሳቱ ፉት አሉ። ዓይኖቻቸው በሰፊው ተከፈቱ። በዚያች ሌሊት እንደ ከዋክብት ነቅተው ሲጸልዩ አደሩ። የካልዲ ፍየሎችስ? አሁንም እየደነሱ!",
    },
    {
      en: '"And from Kaffa," said Grandma, "coffee travelled all around the world." She poured three tiny cups: abol, tona and bereka, the first, the second and the blessing.',
      am: "«ከከፋም» አለች አያት፣ «ቡና ዓለምን ሁሉ ዞረ።» ሦስት ትናንሽ ሲኒዎችን ቀዳች፦ አቦል፣ ቶናና በረካ፤ የመጀመሪያው፣ ሁለተኛውና በረከቱ።",
    },
    {
      en: 'Coffee is for grown-ups, so the children had popcorn. But Gugu jumped up anyway. "Hop, skip, twirl!" And everyone danced, just like Kaldi\'s goats.',
      am: "ቡና የትልልቆች ነው፤ ስለዚህ ልጆቹ ፈንዲሻ በሉ። ጉጉ ግን ዘሎ ተነሣ። «ዝለል፣ ቦርቅ፣ ዙር!» ሁሉም ልክ እንደ ካልዲ ፍየሎች ደነሱ።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "What did the goats do after they ate the red berries? Why do you think the old monk threw them into the fire?",
        "This story is a legend: an old story that people tell and retell. What old stories does our family tell?",
      ],
      am: [
        "ፍየሎቹ ቀዩን ፍሬ ከበሉ በኋላ ምን አደረጉ? አረጋዊው መነኩሴ ፍሬዎቹን ወደ እሳት የጣሉት ለምን ይመስላችኋል?",
        "ይህ ታሪክ አፈ ታሪክ ነው፤ ሰዎች ደጋግመው የሚናገሩት የቆየ ታሪክ። የእኛ ቤተሰብ ምን የቆዩ ታሪኮችን ይናገራል?",
      ],
    },
    activity: {
      en: 'Hold a little coffee ceremony together. A grown-up can roast or grind a few beans while the children smell them; the children set out cups and make popcorn. Then dance like Kaldi\'s goats: "Hop, skip, twirl!"',
      am: "አብራችሁ ትንሽ የቡና ሥርዓት አድርጉ። ትልቅ ሰው ጥቂት ቡና ሲቆላ ወይም ሲፈጭ ልጆቹ ያሽቱት፤ ልጆቹም ሲኒዎችን አስቀምጠው ፈንዲሻ ያዘጋጁ። ከዚያም እንደ ካልዲ ፍየሎች ደንሱ፦ «ዝለል፣ ቦርቅ፣ ዙር!»",
    },
  },
};

export default story;
