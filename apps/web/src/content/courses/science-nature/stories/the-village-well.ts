import type { Story } from "../../../stories";

/*
  "The Village Well" (level 6: simple machines). Hawi helps Grandpa Tolosa at the village well. The
  bucket of water is heavy to lift straight up. At the well there is a wheel with a rope over it, a
  pulley: pulling down is easier than lifting up. A big stone blocks the path: with a long stick over
  a small rock (a lever) Hawi lifts it. They need to get a heavy water barrel onto the donkey cart:
  rolling it up a sloping plank (a ramp) is easier than lifting. The cart's wheels on their axle make
  the load easy to move. The problem: the pulley rope keeps slipping off the wheel and the bucket is
  too heavy for Hawi; she works out to pull down using her own weight, and to fill the bucket only
  half full for two trips. Simple machines don't make work disappear; they make it easier.
  Join-in line: "A little help from a simple machine!"

  Science (kept simple and true): a pulley changes the direction of a pull (pulling down is easier,
  you can use your weight); a lever turns a small push into a big lift near the turning point
  (fulcrum); a ramp lets you lift a load with a smaller force over a longer distance; wheels and
  axles reduce friction and make moving loads easier.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ከቀላል መሣሪያ ትንሽ እርዳታ!», «መዘውር» for pulley and «መፈንቀያ» for lever.
*/
const story: Story = {
  id: "the-village-well",
  course: "science-nature",
  pack: "story",
  title: { en: "The Village Well", am: "የመንደሩ ጉድጓድ" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#6A7A4A",
  scene: "lib-the-village-well",
  coverPage: 2,
  teaches: { words: ["pulley", "lever", "ramp", "wheel", "machine", "lift"] },
  pages: [
    {
      en: "Hawi went with Grandpa Tolosa to fetch water from the village well. She tried to lift a full bucket straight up. \"Oof! It's so heavy!\"",
      am: "ሀዊ ከአባ ቶሎሳ ጋር ከመንደሩ ጉድጓድ ውሃ ልታመጣ ሄደች። የሞላ ባልዲ ቀጥ አድርጋ ለማንሣት ሞከረች። «ውፍ! በጣም ከባድ ነው!»",
    },
    {
      en: "Over the well hung a wheel with a rope running over it. \"That's a pulley,\" said Grandpa. \"Pull down on the rope, and the bucket comes up.\"",
      am: "ከጉድጓዱ በላይ ገመድ የሚያልፍበት መንኮራኩር ተንጠልጥሎ ነበር። «ያ መዘውር ነው» አሉ አባ ቶሎሳ። «ገመዱን ወደ ታች ጎትቺ፤ ባልዲው ወደ ላይ ይመጣል።»",
    },
    {
      en: "Hawi pulled down. Up came the bucket! \"Pulling down is easier than lifting up!\" \"Simple machines help us,\" said Grandpa. A little help from a simple machine!",
      am: "ሀዊ ወደ ታች ጎተተች። ባልዲው ወጣ! «ወደ ታች መጎተት ከማንሣት ይቀላል!» «ቀላል መሣሪያዎች ይረዱናል» አሉ አባ ቶሎሳ። ከቀላል መሣሪያ ትንሽ እርዳታ!",
    },
    {
      en: "On the way home, a big stone blocked the path. Hawi pushed. It wouldn't move. Grandpa put a long stick under the stone, over a small rock.",
      am: "ወደ ቤት ሲመለሱ ትልቅ ድንጋይ መንገዱን ዘጋ። ሀዊ ገፋች። አልተንቀሳቀሰም። አባ ቶሎሳ ረጅም እንጨት ከድንጋዩ ሥር፣ በትንሽ ዐለት ላይ አደረጉ።",
    },
    {
      en: "Hawi pressed down on the far end of the stick. Up tipped the heavy stone! \"That's a lever,\" said Grandpa. A little help from a simple machine!",
      am: "ሀዊ የእንጨቱን ሩቅ ጫፍ ወደ ታች ጫነች። ከባዱ ድንጋይ ተነሣ! «ያ መፈንቀያ ነው» አሉ አባ ቶሎሳ። ከቀላል መሣሪያ ትንሽ እርዳታ!",
    },
    {
      en: "At home, the full water barrel had to go up onto the donkey cart. Too heavy to lift! Grandpa leaned a long plank from the ground to the cart.",
      am: "ቤት ሲደርሱ የሞላው የውሃ በርሜል በአህያ ጋሪው ላይ መውጣት ነበረበት። ለማንሣት በጣም ከባድ! አባ ቶሎሳ ረጅም ሳንቃ ከመሬት ወደ ጋሪው አስደገፉ።",
    },
    {
      en: "They rolled the barrel up the sloping plank, little by little. \"A ramp,\" said Grandpa. \"A longer way up, but an easier push.\"",
      am: "በርሜሉን በተዘረጋው ሳንቃ ላይ ቀስ በቀስ አንከባለሉት። «መወጣጫ» አሉ አባ ቶሎሳ። «መንገዱ ይረዝማል፤ መግፋቱ ግን ይቀላል።»",
    },
    {
      en: "Then the donkey pulled the cart easily along the road. \"Wheels turning on an axle make heavy loads easy to move,\" said Grandpa. A little help from a simple machine!",
      am: "ከዚያ አህያዋ ጋሪውን በቀላሉ ጎተተች። «በዘንግ ላይ የሚዞሩ መንኮራኩሮች ከባድ ጭነትን ለማንቀሳቀስ ያቀላሉ» አሉ አባ ቶሎሳ። ከቀላል መሣሪያ ትንሽ እርዳታ!",
    },
    {
      en: "Next day, Hawi went to the well alone. But the full bucket was too heavy, and she slid along the ground. Hawi stopped and thought.",
      am: "በማግሥቱ ሀዊ ብቻዋን ወደ ጉድጓዱ ሄደች። ግን የሞላው ባልዲ በጣም ከበዳት፤ መሬት ላይ ተጎተተች። ሀዊ ቆም ብላ አሰበች።",
    },
    {
      en: "\"With a pulley I pull DOWN, so I can use my own weight!\" She held the rope and leaned back. And she filled the bucket only halfway, for two easy trips.",
      am: "«በመዘውር ወደ ታች ነው የምጎትተው፤ ስለዚህ የራሴን ክብደት መጠቀም እችላለሁ!» ገመዱን ይዛ ወደ ኋላ ተደገፈች። ባልዲውንም በግማሽ ብቻ ሞላች፤ ለሁለት ቀላል ጉዞዎች።",
    },
    {
      en: "Up came the water, easily. Grandpa smiled. \"Machines don't do the work for us. They make the work easier.\"",
      am: "ውሃው በቀላሉ ወጣ። አባ ቶሎሳ ፈገግ አሉ። «መሣሪያዎች ሥራውን አይሠሩልንም። ሥራውን ያቀሉልናል።»",
    },
    {
      en: "Now Hawi spots simple machines everywhere: a lever under a stone, a ramp onto a truck, wheels on a cart. \"A little help from a simple machine!\"",
      am: "አሁን ሀዊ ቀላል መሣሪያዎችን በየቦታው ታያለች፦ ከድንጋይ ሥር መፈንቀያ፣ ወደ መኪና መወጣጫ፣ የጋሪ መንኮራኩሮች። «ከቀላል መሣሪያ ትንሽ እርዳታ!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Which simple machines did Hawi and Grandpa use? What did each one help with?", "Why was pulling down on the pulley easier than lifting the bucket straight up?"],
      am: ["ሀዊና አባ ቶሎሳ የትኞቹን ቀላል መሣሪያዎች ተጠቀሙ? እያንዳንዱ በምን ረዳ?", "በመዘውሩ ወደ ታች መጎተት ባልዲውን ቀጥ አድርጎ ከማንሣት ለምን ቀለለ?"],
    },
    activity: {
      en: "Make a lever: put a ruler over a pencil and a book on one end. Press the other end. Move the pencil closer to the book: is it easier? Then roll a toy up a ramp of books and compare with lifting it.",
      am: "መፈንቀያ ሥሩ፦ ማስመሪያን በእርሳስ ላይ አድርጋችሁ በአንድ ጫፍ መጽሐፍ አስቀምጡ። ሌላውን ጫፍ ጫኑ። እርሳሱን ወደ መጽሐፉ አቅርቡ፦ ይቀላል? ከዚያ መጫወቻን በመጽሐፍ መወጣጫ ላይ አንከባልሉና ከማንሣት ጋር አወዳድሩ።",
    },
  },
};

export default story;
