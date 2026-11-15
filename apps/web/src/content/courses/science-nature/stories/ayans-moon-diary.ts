import type { Story } from "../../../stories";

/*
  "Ayan's Moon Diary" (level 5: the Moon and its phases; calendars that follow the Moon). Ayan sees
  a thin crescent and asks why the Moon changes shape. She keeps a moon diary for a month, drawing it
  every evening: it grows from a thin crescent to half to full, then shrinks back. Hooyo explains with
  a lamp (the Sun) and a ball (the Moon): the Moon makes no light of its own; the Sun always lights
  half of it, and as it travels round the Earth we see more or less of the lit half. New moon to new
  moon takes about 29 and a half days, a "moonth". The Muslim calendar starts each month when the
  new crescent is seen, so Ramadan and Eid come about eleven days earlier each year; the Ethiopian
  calendar follows the Sun. The problem: Abdi thinks the Moon is broken when it disappears; Ayan
  works out from her diary that it is the new moon and the crescent will come back, and it does.
  Join-in line: "Thin, then half, then round, and back again!"

  Science (kept simple and true): moonlight is reflected sunlight; phases come from the changing
  angle of Sun, Earth and Moon (not the Earth's shadow); the cycle is about 29.5 days; the Islamic
  (Hijri) calendar is lunar, about 354 days, so its dates move about 11 days earlier each solar year.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ቀጭን፣ ግማሽ፣ ሙሉ፣ ደግሞም ይመለሳል!» and «አዲስ ጨረቃ».
*/
const story: Story = {
  id: "ayans-moon-diary",
  course: "science-nature",
  pack: "story",
  title: { en: "Ayan's Moon Diary", am: "የአያን የጨረቃ ማስታወሻ" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#3A4488",
  scene: "lib-ayans-moon-diary",
  coverPage: 5,
  teaches: { words: ["Moon", "crescent", "half", "full", "phase", "calendar"] },
  pages: [
    {
      en: "One evening in Jijiga, Ayan saw a thin, curved Moon, like a smile in the sky. \"Last week the Moon was round. Why does it change shape?\"",
      am: "አንድ ምሽት በጅጅጋ አያን ቀጭን፣ የተጠማዘዘ ጨረቃ አየች፤ በሰማይ እንዳለ ፈገግታ። «ባለፈው ሳምንት ጨረቃ ክብ ነበረች። ቅርጿ ለምን ይቀየራል?»",
    },
    {
      en: "\"Watch it and find out,\" said Hooyo. So Ayan started a moon diary. Every evening she looked up and drew what she saw.",
      am: "«ተመልከቺና እወቂ» አለች ሁዮ። ስለዚህ አያን የጨረቃ ማስታወሻ ጀመረች። በየምሽቱ ቀና ብላ ያየችውን ሣለች።",
    },
    {
      en: "Day by day, the thin crescent grew fatter. After a week it was half a circle. After two weeks, a full, round Moon! Thin, then half, then round, and back again!",
      am: "ቀን በቀን ቀጭኑ ጨረቃ ወፈረ። ከሳምንት በኋላ ግማሽ ክብ ሆነ። ከሁለት ሳምንት በኋላ ሙሉ ክብ ጨረቃ! ቀጭን፣ ግማሽ፣ ሙሉ፣ ደግሞም ይመለሳል!",
    },
    {
      en: "Then it shrank again: half, then a thin crescent the other way round. \"Is the Moon eating itself?\" giggled Abdi.",
      am: "ከዚያ እንደገና አነሰ፦ ግማሽ፣ ከዚያ በሌላው በኩል ቀጭን ጨረቃ። «ጨረቃ ራሷን እየበላች ነው?» ብሎ ተንከተከተ አብዲ።",
    },
    {
      en: "Hooyo took a lamp and a ball. \"The lamp is the Sun. The ball is the Moon. The Moon makes no light of its own. It shines because sunlight falls on it.\"",
      am: "ሁዮ መብራትና ኳስ ወሰደች። «መብራቱ ፀሐይ ነው። ኳሱ ጨረቃ ነው። ጨረቃ የራሷ ብርሃን የላትም። የምታበራው የፀሐይ ብርሃን ስለሚያርፍባት ነው።»",
    },
    {
      en: "She walked the ball round Ayan's head. The lamp always lit half the ball, but Ayan saw a thin edge, then half, then all of the lit side! Thin, then half, then round!",
      am: "ኳሱን በአያን ራስ ዙሪያ አዞረችው። መብራቱ ሁልጊዜ የኳሱን ግማሽ ያበራ ነበር፤ አያን ግን ቀጭን ጠርዝ፣ ከዚያ ግማሽ፣ ከዚያ ሙሉውን የበራ ጎን አየች!",
    },
    {
      en: "\"The Moon travels round the Earth,\" said Hooyo. \"As it goes, we see more or less of its sunny side. One trip takes about twenty-nine and a half days.\"",
      am: "«ጨረቃ በምድር ዙሪያ ትጓዛለች» አለች ሁዮ። «ስትሄድ የበራውን ጎኗን አብዝተን ወይም አሳንሰን እናያለን። አንድ ዙር ሃያ ዘጠኝ ቀን ተኩል ያህል ይወስዳል።»",
    },
    {
      en: "\"Our Muslim calendar follows the Moon. Each month starts when the new thin crescent is seen. That's how we know when Ramadan begins, and when it's Eid.\"",
      am: "«የሙስሊም የቀን መቁጠሪያችን ጨረቃን ይከተላል። እያንዳንዱ ወር አዲሱ ቀጭን ጨረቃ ሲታይ ይጀምራል። ረመዳንና ዒድ መቼ እንደሆኑ የምናውቀው በዚህ ነው።»",
    },
    {
      en: "\"Moon months are a bit shorter, so Eid comes about eleven days earlier every year. The Ethiopian calendar follows the Sun instead.\" Thin, then half, then round!",
      am: "«የጨረቃ ወሮች ትንሽ አጭር ስለሆኑ ዒድ በየዓመቱ አሥራ አንድ ቀን ገደማ ቀድሞ ይመጣል። የኢትዮጵያ የቀን መቁጠሪያ ደግሞ ፀሐይን ይከተላል።»",
    },
    {
      en: "Then one night, Abdi ran in crying. \"The Moon is gone! It's broken!\" The sky was dark. Ayan opened her diary and looked carefully.",
      am: "ከዚያ አንድ ሌሊት አብዲ እያለቀሰ ገባ። «ጨረቃ ጠፋች! ተሰበረች!» ሰማዩ ጨለማ ነበር። አያን ማስታወሻዋን ከፍታ በጥንቃቄ ተመለከተች።",
    },
    {
      en: "\"It shrank to a thin crescent, so now it's the new moon. Its sunny side faces away from us. In a few days, a new crescent will come back!\"",
      am: "«ወደ ቀጭን ጨረቃ አንሳ ነበር፤ ስለዚህ አሁን አዲስ ጨረቃ ነው። የበራው ጎኗ ከእኛ ተቃራኒ ነው። በጥቂት ቀናት አዲስ ቀጭን ጨረቃ ይመለሳል!»",
    },
    {
      en: "Three nights later, there it was: a thin smile in the sunset sky. Abdi cheered. Ayan drew it on a new page. \"Thin, then half, then round, and back again!\"",
      am: "ከሦስት ሌሊት በኋላ እዚያ ነበር፦ በምሽቱ ሰማይ ቀጭን ፈገግታ። አብዲ ደስ አለው። አያን በአዲስ ገጽ ሣለችው። «ቀጭን፣ ግማሽ፣ ሙሉ፣ ደግሞም ይመለሳል!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Where does the Moon's light come from? Why does it seem to change shape?", "Why did Ayan know the Moon would come back? What did her diary show?"],
      am: ["የጨረቃ ብርሃን ከየት ይመጣል? ቅርጿ የሚቀየር ለምን ይመስላል?", "አያን ጨረቃ እንደምትመለስ እንዴት አወቀች? ማስታወሻዋ ምን አሳያት?"],
    },
    activity: {
      en: "Keep your own moon diary for a month: draw the Moon each evening (some days it is up in the morning instead). In a dark room, walk a ball round your head near a lamp and watch the lit part change.",
      am: "ለአንድ ወር የራሳችሁን የጨረቃ ማስታወሻ ያዙ፦ በየምሽቱ ጨረቃን ሣሉ (አንዳንድ ቀን ጠዋት ትታያለች)። በጨለማ ክፍል በመብራት አጠገብ ኳስን በራሳችሁ ዙሪያ አዙሩና የበራው ክፍል ሲቀየር ተመልከቱ።",
    },
  },
};

export default story;
