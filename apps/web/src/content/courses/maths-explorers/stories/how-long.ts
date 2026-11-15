import type { Story } from "../../../stories";

/*
  "How Long Does It Take?" (Maths Explorers, level 5). Measuring time and how long things take:
  Haben times her Saturday. Seconds (saying a name), sixty seconds in a minute, an injera on the
  mitad takes about three minutes, ten of them about thirty minutes (10 × 3), sixty minutes in
  an hour, half an hour is thirty minutes; the walk to Grandmother's from 9:00 to 9:30 on the
  clock (half an hour); the visit from 9:30 to 11:30 (two hours); brushing teeth (2 minutes) is
  shorter than the walk to school (20 minutes); a week from one Saturday market to the next;
  a football game from 4:00 to 5:00 (one hour); and sleep from 8 at night to 7 in the morning,
  counted on round the clock: 4 hours to midnight and 7 more, 11 hours.
  The repeated line to join in on: "Start, stop, count the time between!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  «ሰከንድ», «ደቂቃ», «ምጣድ» for the mitad and the repeated line «ጀምሩ፣ አቁሙ፣ መሃሉን ቁጠሩ!». The
  clock times here are read from the clock face (international time).
*/
const story: Story = {
  id: "how-long",
  course: "maths-explorers",
  pack: "story",
  title: { en: "How Long Does It Take?", am: "ምን ያህል ጊዜ ይወስዳል?" },
  category: "Maths",
  ageBands: ["6-7", "8-9"],
  isFree: true,
  color: "#7A3FA0",
  scene: "lib-how-long",
  coverPage: 5,
  teaches: { numbers: [1, 2, 3, 7, 11, 20, 30, 60], words: ["second", "minute", "hour", "half an hour", "longer", "shorter"] },
  pages: [
    {
      en: 'On Saturday, Haben wanted to know how long everything takes. "How long to blink? How long to bake injera? How long to walk to Grandmother\'s?" Mother laughed and gave her a little clock.',
      am: "ቅዳሜ ሐበን ሁሉም ነገር ምን ያህል ጊዜ እንደሚወስድ ማወቅ ፈለገች። «ዓይን ለማርገብገብ ምን ያህል? እንጀራ ለመጋገር ምን ያህል? ወደ አያቴ ቤት ለመሄድ ምን ያህል?» እናቷ ሳቀችና ትንሽ ሰዓት ሰጠቻት።",
    },
    {
      en: 'Saying "Ha-ben" takes about one second. Haben counted seconds: one, two, three… "Sixty seconds make one minute," said Mother. Start, stop, count the time between!',
      am: "«ሐ-በን» ማለት አንድ ሰከንድ ያህል ይወስዳል። ሐበን ሰከንዶችን ቆጠረች፦ አንድ፣ ሁለት፣ ሦስት… «ስልሳ ሰከንዶች አንድ ደቂቃ ይሆናሉ» አለች እናቷ። ጀምሩ፣ አቁሙ፣ መሃሉን ቁጠሩ!",
    },
    {
      en: "Mother poured the batter onto the hot mitad and covered it. Haben watched the long hand of the clock. Three minutes later, the injera was ready, full of little eyes.",
      am: "እናቷ ሊጡን በጋለው ምጣድ ላይ አፍሳ ከደነችው። ሐበን የሰዓቱን ረጅም መርፌ ተመለከተች። ከሦስት ደቂቃ በኋላ እንጀራው በትናንሽ ዓይኖች ተሞልቶ ደረሰ።",
    },
    {
      en: '"Ten injeras, three minutes each," said Haben. "That\'s ten threes: thirty minutes!" 10 × 3 = 30. "Half an hour," said Mother. "Sixty minutes make an hour, so thirty is half."',
      am: "«አሥር እንጀራዎች፣ እያንዳንዳቸው ሦስት ደቂቃ» አለች ሐበን። «ያ አሥር ሦስቶች ነው፦ ሠላሳ ደቂቃ!» 10 × 3 = 30። «ግማሽ ሰዓት» አለች እናቷ። «ስልሳ ደቂቃዎች አንድ ሰዓት ይሆናሉ፤ ስለዚህ ሠላሳ ግማሽ ነው።»",
    },
    {
      en: "Then they walked to Grandmother's house. They set off at 9 o'clock on the clock and arrived at half past nine. \"The walk took half an hour!\" Start, stop, count the time between!",
      am: "ከዚያ ወደ አያቷ ቤት በእግር ሄዱ። በሰዓቱ ላይ 9 ሲሆን ተነሥተው 9 ተኩል ሲሆን ደረሱ። «መንገዱ ግማሽ ሰዓት ወሰደ!» ጀምሩ፣ አቁሙ፣ መሃሉን ቁጠሩ!",
    },
    {
      en: 'They stayed with Grandmother from half past nine to half past eleven. Haben moved her finger round the clock: "Half past ten is one hour… half past eleven is two hours!"',
      am: "በሰዓቱ ላይ ከ9 ተኩል እስከ 11 ተኩል ከአያቷ ጋር ቆዩ። ሐበን ጣቷን በሰዓቱ ዙሪያ አንቀሳቀሰች፦ «10 ተኩል አንድ ሰዓት ነው… 11 ተኩል ሁለት ሰዓት!»",
    },
    {
      en: '"Which takes longer," asked Grandmother, "brushing your teeth or walking to school?" "Brushing is two minutes. The walk to school is twenty minutes. The walk takes longer!"',
      am: "«የትኛው ይረዝማል?» ብለው ጠየቁ አያቷ፣ «ጥርስ መቦረሽ ወይስ ወደ ትምህርት ቤት መሄድ?» «መቦረሽ ሁለት ደቂቃ ነው። ወደ ትምህርት ቤት መሄድ ሃያ ደቂቃ ነው። መሄዱ ይረዝማል!»",
    },
    {
      en: 'Some things take days. "From this Saturday market to the next one is a whole week," said Grandmother. "Seven days." Haben counted them on her fingers.',
      am: "አንዳንድ ነገሮች ቀናት ይወስዳሉ። «ከዚህ የቅዳሜ ገበያ እስከ ቀጣዩ አንድ ሙሉ ሳምንት ነው» አሉ አያቷ። «ሰባት ቀናት።» ሐበን በጣቶቿ ቆጠረቻቸው።",
    },
    {
      en: "{name}, can we time the football game? It started at 4 o'clock and stopped at 5 o'clock. From 4 to 5 on the clock is one hour! Start, stop, count the time between!",
      am: "{name}፣ የእግር ኳስ ጨዋታውን ጊዜ እንለካ? በሰዓቱ 4 ላይ ተጀምሮ 5 ላይ አለቀ። በሰዓቱ ከ4 እስከ 5 አንድ ሰዓት ነው! ጀምሩ፣ አቁሙ፣ መሃሉን ቁጠሩ!",
    },
    {
      en: 'At bedtime, Haben asked one last question. "If I sleep at 8 o\'clock at night and wake at 7 in the morning, how long do I sleep?" Mother helped her count round the clock.',
      am: "በመኝታ ሰዓት ሐበን አንድ የመጨረሻ ጥያቄ ጠየቀች። «ምሽት በሰዓቱ ላይ 8 ሲሆን ተኝቼ ጠዋት በሰዓቱ ላይ 7 ሲሆን ብነቃ ምን ያህል እተኛለሁ?» እናቷ በሰዓቱ ዙሪያ እንድትቆጥር አገዘቻት።",
    },
    {
      en: '"Eight to twelve is four hours. Twelve to seven is seven hours. Four and seven: eleven hours of sleep!" 4 + 7 = 11. "A good long rest," said Mother.',
      am: "«ከስምንት እስከ አሥራ ሁለት አራት ሰዓት ነው። ከአሥራ ሁለት እስከ ሰባት ሰባት ሰዓት ነው። አራትና ሰባት፦ አሥራ አንድ ሰዓት እንቅልፍ!» 4 + 7 = 11። «ጥሩ ረጅም ዕረፍት» አለች እናቷ።",
    },
    {
      en: "Haben yawned. \"Saying goodnight takes one second,\" she whispered. \"Goodnight!\" And then she was asleep for eleven whole hours.",
      am: "ሐበን አዛጋች። «ደህና እደሪ ማለት አንድ ሰከንድ ይወስዳል» ብላ ሹክ አለች። «ደህና እደሪ!» ከዚያ ለአሥራ አንድ ሙሉ ሰዓታት ተኛች።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["What takes about one minute? What takes about one hour?", "If you leave home at 8 o'clock and arrive at half past eight, how long did the journey take?"],
      am: ["አንድ ደቂቃ ያህል የሚወስደው ምንድን ነው? አንድ ሰዓት ያህል የሚወስደውስ?", "በሰዓቱ ላይ 8 ሲሆን ከቤት ወጥታችሁ 8 ተኩል ሲሆን ብትደርሱ መንገዱ ምን ያህል ጊዜ ወሰደ?"],
    },
    activity: {
      en: "Use a clock or phone timer: guess how long things take (washing hands, tidying toys, walking to the shop), then time them together. Write the start and stop times and count the time between.",
      am: "ሰዓት ወይም የስልክ ሰዓት ቆጣሪ ተጠቀሙ፦ ነገሮች (እጅ መታጠብ፣ መጫወቻዎችን ማስተካከል፣ ወደ ሱቅ መሄድ) ምን ያህል ጊዜ እንደሚወስዱ ገምቱ፤ ከዚያ አብራችሁ ለኩ። የመጀመሪያና የመጨረሻ ሰዓቶቹን ጽፋችሁ መሃሉን ቁጠሩ።",
    },
  },
};

export default story;
