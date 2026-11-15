import type { Story } from "../../../stories";

/*
  "Hawi's Kite and the Wire" (level 4: electricity).
  Hawi and Haben's kite gets caught on the wires on top of a pole in their town. Haben wants to
  climb up; Hawi stops her: wires carry electricity, hands off, tell a grown-up. Grandpa Tolosa
  calls the electricity office and a worker with special gloves frees it (fly kites in open
  fields, never climb poles). At home: nothing goes in sockets, dry hands before switches, and a
  wire with its cover worn through is switched off and unplugged by Grandpa.
  Join-in line: "Wires and sockets: hands off, and tell a grown-up!"

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line «ሽቦና ሶኬት፦ እጅ አርቅ፣ ለትልቅ ሰው ንገር!» and «የመብራት ኃይል» for the electricity office.
*/
const story: Story = {
  id: "hawis-kite-and-the-wire",
  course: "healthy-safe",
  pack: "story",
  title: { en: "Hawi's Kite and the Wire", am: "የሀዊ ካይትና ሽቦው" },
  category: "Values",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#3A8FC0",
  scene: "lib-hawis-kite-and-the-wire",
  coverPage: 1,
  teaches: { words: ["electricity", "wire", "socket", "kite", "dry"] },
  pages: [
    {
      en: "Hawi and Haben made a kite from paper and sticks. Up, up it flew, over the roofs of the town. \"Higher!\" laughed Haben.",
      am: "ሀዊና ሐበን ከወረቀትና ከእንጨት ካይት ሠሩ። ከከተማው ጣሪያዎች በላይ ወደ ላይ በረረ። «ከፍ በል!» አለች ሐበን።",
    },
    {
      en: "Then the wind blew, whoosh, and the kite crashed into the wires on top of a tall pole. There it hung, flapping.",
      am: "ከዚያ ነፋስ ሽው አለ፤ ካይቱ በረጅም ምሰሶ ላይ ባሉት ሽቦዎች ላይ ተጋጨ። እዚያው ተንጠልጥሎ ይርገበገብ ጀመረ።",
    },
    {
      en: "\"I'll climb up and get it!\" said Haben. She was a walia, after all, and walias love to climb.",
      am: "«ወጥቼ አወርደዋለሁ!» አለች ሐበን። ዋልያ ናት፤ ዋልያዎች ደግሞ መውጣት ይወዳሉ።",
    },
    {
      en: "\"No!\" said Hawi. \"Those wires carry electricity. Grandpa says it can hurt you badly, even through the string.\"",
      am: "«አይሆንም!» አለች ሀዊ። «ሽቦዎቹ ኤሌክትሪክ ይዘዋል። አባቴ እንደሚሉት በገመዱ በኩልም ክፉኛ ይጎዳል።»",
    },
    {
      en: "Haben let go of the string. \"Then what do we do?\" Hawi remembered: \"Wires and sockets: hands off, and tell a grown-up!\"",
      am: "ሐበን ገመዱን ለቀቀች። «ታዲያ ምን እናድርግ?» ሀዊ አስታወሰች፦ «ሽቦና ሶኬት፦ እጅ አርቅ፣ ለትልቅ ሰው ንገር!»",
    },
    {
      en: "They ran to Grandpa Tolosa. He phoned the electricity office, and soon a worker came with special gloves and a long pole.",
      am: "ወደ አባ ቶሎሳ ሮጡ። ለመብራት ኃይል ደወሉ፤ ብዙም ሳይቆይ ሠራተኛ ልዩ ጓንትና ረጅም ዘንግ ይዞ መጣ።",
    },
    {
      en: "\"You did the right thing,\" said the worker, unhooking the kite. \"Never climb poles. Fly kites in open fields, far from wires.\"",
      am: "«ትክክል አደረጋችሁ» አለ ሠራተኛው ካይቱን እያላቀቀ። «ምሰሶ አትውጡ። ካይትን ከሽቦ ርቃችሁ በሜዳ አብርሩ።»",
    },
    {
      en: "At home, Hawi showed Haben the socket on the wall. \"Electricity lives in there too. We never poke anything in it.\"",
      am: "ቤት ሀዊ በግድግዳው ላይ ያለውን ሶኬት ለሐበን አሳየቻት። «ኤሌክትሪክ እዚህም አለ። ምንም ነገር አንከትበትም።»",
    },
    {
      en: "Haben's paws were wet from washing. She went to switch on the light. \"Wait!\" said Hawi. \"Dry hands first. Water and electricity don't mix.\"",
      am: "የሐበን እጆች ረጥበው ነበር። መብራቱን ልታበራ ሄደች። «ቆይ!» አለች ሀዊ። «መጀመሪያ እጅሽን አድርቂ። ውሃና ኤሌክትሪክ አይስማሙም።»",
    },
    {
      en: "Then Hawi spotted a wire by the radio with its cover worn right through. Wires and sockets: hands off, and tell a grown-up!",
      am: "ከዚያ ሀዊ በሬዲዮው አጠገብ ሽፋኑ የተላጠ ሽቦ አየች። ሽቦና ሶኬት፦ እጅ አርቅ፣ ለትልቅ ሰው ንገር!",
    },
    {
      en: "Grandpa switched it off and pulled out the plug. \"Tomorrow I'll buy a new one. Two sharp-eyed helpers today!\"",
      am: "አባ ቶሎሳ አጥፍተው መሰኪያውን ነቀሉት። «ነገ አዲስ እገዛለሁ። ዛሬ ሁለት ዓይናማ ረዳቶች አሉኝ!»",
    },
    {
      en: "On the next windy day, the friends flew their mended kite in the big field, far from any wires. Up, up it went, high as the clouds!",
      am: "በሚቀጥለው ነፋሻማ ቀን የተጠገነውን ካይት ከሽቦ ርቀው በትልቁ ሜዳ አበረሩ። እስከ ደመናው ወደ ላይ ወጣ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: [
        "Why didn't Hawi let Haben climb the pole? Who got the kite down?",
        "Where are the sockets and wires in our home? What do we do if we see a broken one?",
      ],
      am: [
        "ሀዊ ሐበንን ምሰሶውን እንድትወጣ ለምን አልፈቀደችም? ካይቱን ያወረደው ማን ነው?",
        "በቤታችን ሶኬቶችና ሽቦዎች የት አሉ? የተበላሸ ብናይ ምን እናደርጋለን?",
      ],
    },
    activity: {
      en: "Show your child the sockets, switches and wires in your home and agree the rules: nothing goes in sockets, dry hands before switches, never pull a plug by its wire, and tell a grown-up about any broken wire or plug. Fly kites in open fields far from power lines, and never try to get anything down from a line or pole: call the electricity office. Cover unused sockets if you can.",
      am: "በቤታችሁ ያሉትን ሶኬቶች፣ ማብሪያዎችና ሽቦዎች ለልጅዎ ያሳዩ፤ ሕጎቹንም ተስማሙ፦ በሶኬት ውስጥ ምንም አይከተትም፣ ማብሪያ ከመንካት በፊት እጅ ይደርቃል፣ መሰኪያ በሽቦው አይጎተትም፣ ስለተበላሸ ሽቦ ወይም መሰኪያ ለትልቅ ሰው ይነገራል። ካይትን ከኤሌክትሪክ መስመር ርቆ በሜዳ ላይ ያብርሩ፤ ከመስመር ወይም ከምሰሶ ላይ ምንም ነገር ለማውረድ አይሞክሩ፦ ለመብራት ኃይል ይደውሉ። ከቻሉ ጥቅም ላይ ያልዋሉ ሶኬቶችን ይሸፍኑ።",
    },
  },
};

export default story;
