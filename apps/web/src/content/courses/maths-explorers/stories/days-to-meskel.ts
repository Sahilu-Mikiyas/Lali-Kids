import type { Story } from "../../../stories";

/*
  "Counting the Days to Meskel" (Maths Explorers, level 5). The Ethiopian calendar and reading
  dates: on New Year's Day (Meskerem 1) Tsehay hangs up a new calendar. Thirteen months: twelve
  of 30 days and Pagume with 5 (6 in a leap year); a week of seven days (Monday to Sunday);
  Meskel is on Meskerem 17, sixteen days after New Year (17 − 1 = 16), which is two weeks and
  two days (7 + 7 + 2); crossing off a day each morning; the Demera bonfire on the evening of
  Meskerem 16; days left in a 30-day month (30 − 20 = 10); 360 + 5 = 365 days in a year; and
  Tsehay's birthday, Tikimt 5: 13 days to the end of Meskerem and 5 more, 18 days.
  The repeated line to join in on: "Seven days make a week!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the date phrases («መስከረም 17»), «የመዝለያ ዓመት» for a leap year, and the repeated line
  «ሰባት ቀናት አንድ ሳምንት ናቸው!».
*/
const story: Story = {
  id: "days-to-meskel",
  course: "maths-explorers",
  pack: "story",
  title: { en: "Counting the Days to Meskel", am: "እስከ መስቀል ያሉትን ቀናት መቁጠር" },
  category: "Maths",
  ageBands: ["6-7", "8-9"],
  isFree: true,
  color: "#E8813B",
  scene: "lib-days-to-meskel",
  coverPage: 7,
  teaches: { numbers: [1, 5, 7, 10, 13, 16, 17, 18, 30, 365], words: ["calendar", "month", "week", "day", "date"] },
  pages: [
    {
      en: 'On New Year\'s Day, Meskerem 1, Tsehay hung a brand-new calendar on the wall. "When is Meskel?" asked Gugu. "On Meskerem 17," said Papa. "Let\'s count the days."',
      am: "በአዲስ ዓመት ቀን፣ መስከረም 1፣ ፀሐይ አዲስ የቀን መቁጠሪያ ግድግዳው ላይ ሰቀለች። «መስቀል መቼ ነው?» ብሎ ጠየቀ ጉጉ። «መስከረም 17» አለ አባባ። «ቀናቱን እንቁጠር።»",
    },
    {
      en: "The Ethiopian calendar has thirteen months. Twelve of them have 30 days each. The little thirteenth month, Pagume, has only 5 days, or 6 in a leap year.",
      am: "የኢትዮጵያ የቀን አቆጣጠር አሥራ ሦስት ወራት አሉት። አሥራ ሁለቱ እያንዳንዳቸው 30 ቀናት አሏቸው። ትንሿ አሥራ ሦስተኛዋ ወር፣ ጳጉሜ፣ 5 ቀናት ብቻ፣ በመዝለያ ዓመት ደግሞ 6 ቀናት አሏት።",
    },
    {
      en: "Each row of the calendar is one week: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday and Sunday. Seven days make a week!",
      am: "እያንዳንዱ የቀን መቁጠሪያው ረድፍ አንድ ሳምንት ነው፦ ሰኞ፣ ማክሰኞ፣ ረቡዕ፣ ሐሙስ፣ ዓርብ፣ ቅዳሜና እሑድ። ሰባት ቀናት አንድ ሳምንት ናቸው!",
    },
    {
      en: 'Tsehay put her finger on Meskerem 1 and counted on to Meskerem 17. "Sixteen more days!" 17 − 1 = 16.',
      am: "ፀሐይ ጣቷን መስከረም 1 ላይ አድርጋ እስከ መስከረም 17 ወደ ፊት ቆጠረች። «አሥራ ስድስት ተጨማሪ ቀናት!» 17 − 1 = 16።",
    },
    {
      en: '"Sixteen days is two weeks and two days," said Papa. "Seven and seven is fourteen, and two more is sixteen." 7 + 7 + 2 = 16. Seven days make a week!',
      am: "«አሥራ ስድስት ቀናት ሁለት ሳምንትና ሁለት ቀናት ናቸው» አለ አባባ። «ሰባትና ሰባት አሥራ አራት፣ ሁለት ተጨማሪ አሥራ ስድስት።» 7 + 7 + 2 = 16። ሰባት ቀናት አንድ ሳምንት ናቸው!",
    },
    {
      en: "Every morning Tsehay crossed off one day. After one week it was Meskerem 8. Seven days make a week!",
      am: "በየማለዳው ፀሐይ አንድ ቀን ሰረዘች። ከአንድ ሳምንት በኋላ መስከረም 8 ሆነ። ሰባት ቀናት አንድ ሳምንት ናቸው!",
    },
    {
      en: 'After two weeks it was Meskerem 15. "Only two more sleeps!" said Gugu, and he helped Papa carry long sticks for the bonfire.',
      am: "ከሁለት ሳምንት በኋላ መስከረም 15 ሆነ። «ሁለት እንቅልፍ ብቻ ቀረ!» አለ ጉጉ፤ አባባንም ለደመራው ረጃጅም እንጨቶችን በመሸከም አገዘው።",
    },
    {
      en: "On the evening of Meskerem 16, the whole neighbourhood gathered round the tall Demera, decorated with yellow Meskel daisies. Up went the flames, and everyone sang.",
      am: "በመስከረም 16 ምሽት መላው ሰፈር በቢጫ አደይ አበባዎች ባጌጠው ረጅም ደመራ ዙሪያ ተሰበሰበ። ነበልባሉ ወደ ላይ ተነሣ፤ ሁሉም ዘመሩ።",
    },
    {
      en: "{name}, can we count? Meskerem has 30 days. If today is Meskerem 20, how many days are left in the month? From 20 to 30 is ten. 30 − 20 = 10.",
      am: "{name}፣ እንቁጠር? መስከረም 30 ቀናት አሉት። ዛሬ መስከረም 20 ቢሆን በወሩ ውስጥ ስንት ቀናት ይቀራሉ? ከ20 እስከ 30 አሥር ነው። 30 − 20 = 10።",
    },
    {
      en: '"How many days in the whole year?" asked Gugu. Papa smiled. "Twelve months of thirty days make three hundred and sixty. Add Pagume\'s five: three hundred and sixty-five." 360 + 5 = 365.',
      am: "«በዓመቱ ውስጥ በአጠቃላይ ስንት ቀናት አሉ?» ብሎ ጠየቀ ጉጉ። አባባ ፈገግ አለ። «የሠላሳ ቀናት አሥራ ሁለት ወራት ሦስት መቶ ስልሳ ይሆናሉ። የጳጉሜን አምስት ቀናት ጨምር፦ ሦስት መቶ ስልሳ አምስት።» 360 + 5 = 365።",
    },
    {
      en: 'Tsehay found Tikimt 5, her birthday, in the next month. "From Meskerem 17 to the end of Meskerem is 13 days. Then 5 more. Eighteen days!" 13 + 5 = 18.',
      am: "ፀሐይ በሚቀጥለው ወር የልደቷን ቀን፣ ጥቅምት 5ን፣ አገኘች። «ከመስከረም 17 እስከ መስከረም መጨረሻ 13 ቀናት ናቸው። ከዚያ 5 ተጨማሪ። አሥራ ስምንት ቀናት!» 13 + 5 = 18።",
    },
    {
      en: "She drew a big circle round Tikimt 5. Gugu drew a cake next to it. And every morning after that, they crossed off one more day together. Seven days make a week!",
      am: "ጥቅምት 5ን በትልቅ ክብ አከበበችው። ጉጉ ከጎኑ ኬክ ሣለ። ከዚያ በኋላ በየማለዳው አንድ ተጨማሪ ቀን አብረው ሰረዙ። ሰባት ቀናት አንድ ሳምንት ናቸው!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["How many days are there from today to the next holiday or birthday in your family?", "How many weeks is 14 days? And 21 days?"],
      am: ["ከዛሬ እስከ ቤተሰባችሁ ቀጣይ በዓል ወይም ልደት ስንት ቀናት አሉ?", "14 ቀናት ስንት ሳምንት ናቸው? 21 ቀናትስ?"],
    },
    activity: {
      en: "Look at a calendar together. Find today's date, then count on to a special day. Cross off a day each morning and count how many are left. Say the days of the week in order.",
      am: "አብራችሁ የቀን መቁጠሪያ ተመልከቱ። የዛሬን ቀን ፈልጋችሁ እስከ አንድ ልዩ ቀን ወደ ፊት ቁጠሩ። በየማለዳው አንድ ቀን እየሰረዛችሁ ስንት እንደቀሩ ቁጠሩ። የሳምንቱን ቀናት በቅደም ተከተል በሉ።",
    },
  },
};

export default story;
