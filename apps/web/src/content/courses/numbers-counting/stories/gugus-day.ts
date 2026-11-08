import type { Story } from "../../../stories";

/*
  "Gugu's Busy Day" (Numbers & Counting, level 5). Time of day: morning, midday, afternoon,
  evening and night in the order Gugu lives them; reading o'clock on a clock face (the short
  hand points to the hour, the long hand points straight up); the shortest shadow at midday;
  before and after; and how Ethiopian time counts the hours from sunrise (seven o'clock in the
  morning is "one o'clock", midday is "six o'clock", sunset is "twelve o'clock").
  The repeated line to join in on: "Tick, tock, what time is it?"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the repeated line and every Ethiopian-time phrase («ከጠዋቱ አንድ ሰዓት», «ከቀኑ ስድስት ሰዓት»,
  «ከምሽቱ አንድ ሰዓት»), and «ትንሿ / ትልቋ መርፌ» for the clock hands.
*/
const story: Story = {
  id: "gugus-day",
  course: "numbers-counting",
  pack: "numbers",
  title: { en: "Gugu's Busy Day", am: "የጉጉ ሥራ የበዛበት ቀን" },
  category: "Maths",
  ageBands: ["3-5", "6-7"],
  isFree: false,
  color: "#E07A1F",
  scene: "lib-gugus-day",
  coverPage: 4,
  teaches: { numbers: [1, 3, 6, 7, 8, 9, 12], words: ["morning", "midday", "afternoon", "evening", "night", "o'clock", "before", "after"] },
  pages: [
    {
      en: 'Cock-a-doodle-doo! The sun peeked over the mountains and Gugu opened his eyes. The clock on Grandma\'s wall said seven o\'clock. "Morning!" Tick, tock, what time is it?',
      am: "ኩኩሉ! ፀሐይ ከተራሮቹ ጀርባ ብቅ አለች፤ ጉጉም ዓይኖቹን ከፈተ። በአያት ግድግዳ ላይ ያለው ሰዓት ሰባት ሰዓት ያሳይ ነበር። «ጠዋት ነው!» ቲክ፣ ታክ፣ ስንት ሰዓት ነው?",
    },
    {
      en: '"In Ethiopia we count the hours from sunrise," said Grandma. "So seven o\'clock is our one o\'clock in the morning: the first hour of the day." Gugu counted on his fingers. "One!"',
      am: "«በኢትዮጵያ ሰዓትን የምንቆጥረው ከፀሐይ መውጫ ጀምሮ ነው» አለች አያት። «ስለዚህ ሰባት ሰዓቱ የእኛ ከጠዋቱ አንድ ሰዓት ነው፦ የቀኑ የመጀመሪያው ሰዓት።» ጉጉ በጣቶቹ ቆጠረ። «አንድ!»",
    },
    {
      en: 'Lali sat on the clock. "The short hand points to the hour. The long hand points straight up to the top when it is exactly o\'clock." Tick, tock: the short hand moved to eight. Breakfast!',
      am: "ላሊ ሰዓቱ ላይ ተቀመጠች። «ትንሿ መርፌ ሰዓቱን ታሳያለች። ልክ ሰዓት ሲሞላ ትልቋ መርፌ ቀጥ ብላ ወደ ላይ ትጠቁማለች።» ቲክ፣ ታክ፦ ትንሿ መርፌ ወደ ስምንት ሄደች። ቁርስ!",
    },
    {
      en: "At nine o'clock Gugu took the sheep up the hill. The grass was wet with dew and his shadow was long and thin, stretching far across the field.",
      am: "በሦስት ሰዓት (ዘጠኝ ሰዓት) ጉጉ በጎቹን ወደ ኮረብታው ወሰደ። ሣሩ በጤዛ ረጥቦ ነበር፤ ጥላውም ረጅምና ቀጭን ሆኖ በሜዳው ላይ ርቆ ተዘርግቶ ነበር።",
    },
    {
      en: 'At twelve o\'clock the sun was high above his head, and his shadow was tiny, right under his feet. "Midday!" said Grandma. "We call it six o\'clock: the middle of the day." Tick, tock, what time is it?',
      am: "በአሥራ ሁለት ሰዓት ፀሐይ ከራሱ በላይ ከፍ ብላ ነበር፤ ጥላው ደግሞ ጥቃቅን ሆኖ ከእግሩ ሥር ነበር። «እኩለ ቀን!» አለች አያት። «ከቀኑ ስድስት ሰዓት እንለዋለን፦ የቀኑ መካከል።» ቲክ፣ ታክ፣ ስንት ሰዓት ነው?",
    },
    {
      en: "Lunch was injera with shiro, eaten in the shade of the acacia. Then the sheep had a little nap, and so did Gugu. Zzz…",
      am: "ምሳ በግራሩ ጥላ ሥር የተበላ እንጀራ በሽሮ ነበር። ከዚያ በጎቹ ትንሽ አሸለቡ፤ ጉጉም አሸለበ። ዝዝዝ…",
    },
    {
      en: "In the afternoon, at three o'clock, Anbessa and Tsehay came to play football. Kick! Gugu's shadow was growing longer again, pointing the other way.",
      am: "ከሰዓት በኋላ በዘጠኝ ሰዓት (ሦስት ሰዓት) አንበሳና ፀሐይ ኳስ ሊጫወቱ መጡ። ምት! የጉጉ ጥላ እንደገና እየረዘመ፣ ወደ ሌላው አቅጣጫ እያመለከተ ነበር።",
    },
    {
      en: 'At six o\'clock the sun slipped down behind the mountains and the sky turned orange and pink. "Evening! Time to take the sheep home." In Ethiopian time, that is twelve o\'clock.',
      am: "በአሥራ ሁለት ሰዓት (ስድስት ሰዓት) ፀሐይ ከተራሮቹ ጀርባ ጠለቀች፤ ሰማዩም ብርቱካናማና ሮዝ ሆነ። «ምሽት ነው! በጎቹን ወደ ቤት የምንወስድበት ሰዓት።» በኢትዮጵያ ሰዓት ያ አሥራ ሁለት ሰዓት ነው።",
    },
    {
      en: "At seven o'clock they ate supper by the warm light of the lamp. Tick, tock, what time is it? One o'clock at night, in Ethiopian time!",
      am: "ሰዓቱ ሰባትን ሲያሳይ በፋኖሱ ሞቃት ብርሃን እራት በሉ። ቲክ፣ ታክ፣ ስንት ሰዓት ነው? በኢትዮጵያ ሰዓት ከምሽቱ አንድ ሰዓት!",
    },
    {
      en: 'Grandma asked, "What did you do first today, Gugu?" "First I woke up. After that, breakfast. Then the sheep, then lunch, then football, and last of all, supper!" {name}, what did you do first today?',
      am: "አያት ጠየቀች፦ «ጉጉ፣ ዛሬ መጀመሪያ ምን አደረግህ?» «መጀመሪያ ተነሣሁ። ከዚያ በኋላ ቁርስ። ከዚያ በጎቹ፣ ከዚያ ምሳ፣ ከዚያ ኳስ፣ በመጨረሻም እራት!» {name}፣ ዛሬ መጀመሪያ ምን አደረግን?",
    },
    {
      en: "At nine o'clock the stars were out and Gugu climbed into bed. The short hand pointed to nine and the long hand pointed straight up. Tick, tock, what time is it? Bedtime!",
      am: "በሦስት ሰዓት (ዘጠኝ ሰዓት) ከዋክብት ወጥተው ነበር፤ ጉጉም ወደ አልጋው ገባ። ትንሿ መርፌ ዘጠኝን፣ ትልቋ መርፌ ደግሞ ቀጥ ብላ ወደ ላይ ታመለክት ነበር። ቲክ፣ ታክ፣ ስንት ሰዓት ነው? የመኝታ ሰዓት!",
    },
    {
      en: 'Lali yawned on the windowsill. "Tomorrow the sun will rise again, and the hours will start again from one." Morning, midday, evening, night, and round again. Goodnight!',
      am: "ላሊ በመስኮቱ ጠርዝ ላይ አዛጋች። «ነገ ፀሐይ እንደገና ትወጣለች፤ ሰዓቶቹም እንደገና ከአንድ ይጀምራሉ።» ጠዋት፣ ቀትር፣ ምሽት፣ ሌሊት፣ እንደገናም ዙሩ። ደህና እደሩ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["What do you do in the morning, at midday, in the evening and at night?", "When is your shadow longest, and when is it shortest? Why do you think that is?"],
      am: ["ጠዋት፣ እኩለ ቀን፣ ምሽትና ሌሊት ምን ምን ታደርጋላችሁ?", "ጥላችሁ የሚረዝመው መቼ ነው? የሚያጥረውስ መቼ ነው? ለምን ይመስላችኋል?"],
    },
    activity: {
      en: "Look at a clock together at o'clock times: the short hand shows the hour and the long hand points straight up. Say the time both ways, the international way and the Ethiopian way (7 o'clock is 1 o'clock in the morning). Draw four pictures of your own day and put them in order.",
      am: "ሰዓቱ ልክ ሲሞላ አብራችሁ ሰዓት ተመልከቱ፦ ትንሿ መርፌ ሰዓቱን ታሳያለች፣ ትልቋ መርፌ ቀጥ ብላ ወደ ላይ ታመለክታለች። ሰዓቱን በሁለቱም መንገድ በሉ፤ በዓለም አቀፉና በኢትዮጵያ አቆጣጠር (ሰባት ሰዓት ከጠዋቱ አንድ ሰዓት ነው)። ስለ ራሳችሁ ቀን አራት ሥዕሎችን ሣላችሁ በቅደም ተከተል አስቀምጡ።",
    },
  },
};

export default story;
