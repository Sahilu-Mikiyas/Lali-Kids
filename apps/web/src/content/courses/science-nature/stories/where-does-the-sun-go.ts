import type { Story } from "../../../stories";

/*
  "Where Does the Sun Go?" (level 5: day and night). At sunset Anbessa asks where the Sun goes. His
  guesses: behind the mountains? to sleep? Teacher Meron shows it with a torch (the Sun) and an
  orange with a sticker (Ethiopia) in a dark room: the Earth is a huge ball that spins round once a
  day; the half facing the Sun has day, the other half night. The Sun doesn't move round us; it only
  looks as if it does, like trees seem to slide past a moving bus. Sunrise is in the east, sunset in
  the west. The problem: Anbessa's cousin phones from America in the evening and it is morning there;
  Anbessa works it out with the orange: they are on the other side of the turning ball. A day is one
  whole turn: 24 hours. Join-in line: "The Earth turns round and round: day comes up and night comes down!"

  Science (kept simple and true): the Earth rotates once in about 24 hours (west to east), so the Sun
  appears to rise in the east and set in the west; the side facing the Sun has day; when it is evening
  in Ethiopia it is morning in the Americas; we don't feel the spin because we move with the Earth.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ምድር ትዞራለች፣ ትዞራለች፦ ቀን ይመጣል፣ ሌሊት ይገባል!».
*/
const story: Story = {
  id: "where-does-the-sun-go",
  course: "science-nature",
  pack: "story",
  title: { en: "Where Does the Sun Go?", am: "ፀሐይ የት ትሄዳለች?" },
  category: "Values",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#E8A23A",
  scene: "lib-where-does-the-sun-go",
  coverPage: 4,
  teaches: { words: ["day", "night", "Earth", "spin", "Sun", "east", "west"] },
  pages: [
    {
      en: "The Sun slid down behind the mountains, and the sky turned orange. Anbessa frowned. \"Every night the Sun goes away. Where does it go?\"",
      am: "ፀሐይ ከተራሮቹ ጀርባ ገባች፤ ሰማዩም ብርቱካናማ ሆነ። አንበሳ ፊቱን አጨፈገገ። «በየምሽቱ ፀሐይ ትሄዳለች። የት ትሄዳለች?»",
    },
    {
      en: "\"Maybe it hides behind the mountains,\" he guessed. \"Or it goes to sleep!\" Teacher Meron smiled. \"Let's find out, with a torch and an orange.\"",
      am: "«ምናልባት ከተራሮቹ ጀርባ ትደበቃለች» ብሎ ገመተ። «ወይም ትተኛለች!» መምህርት መሮን ፈገግ አሉ። «በባትሪና በብርቱካን እንወቅ።»",
    },
    {
      en: "In the dark classroom, the torch was the Sun. The orange was the Earth, our home, a huge round ball. A sticker on it showed Ethiopia.",
      am: "በጨለማው ክፍል ባትሪው ፀሐይ ነበር። ብርቱካኑ ምድር፣ ቤታችን፣ ግዙፍ ክብ ኳስ። በላዩ ያለው ምልክት ኢትዮጵያን አሳየ።",
    },
    {
      en: "\"The Earth spins round, all the time,\" said Teacher Meron, turning the orange slowly. The Ethiopia sticker moved into the light. \"Morning!\"",
      am: "«ምድር ሁልጊዜ ትዞራለች» አሉ መምህርቷ፤ ብርቱካኑን ቀስ ብለው እያዞሩ። የኢትዮጵያ ምልክት ወደ ብርሃኑ ገባ። «ጠዋት!»",
    },
    {
      en: "The sticker faced the torch. \"Midday!\" It turned away into the dark. \"Night!\" The Earth turns round and round: day comes up and night comes down!",
      am: "ምልክቱ ባትሪውን ገጠመ። «እኩለ ቀን!» ወደ ጨለማው ዞረ። «ሌሊት!» ምድር ትዞራለች፣ ትዞራለች፦ ቀን ይመጣል፣ ሌሊት ይገባል!",
    },
    {
      en: "\"So the Sun doesn't go anywhere!\" said Anbessa. \"We turn away from it!\" \"Yes. Half the Earth has day, and the other half has night.\"",
      am: "«ስለዚህ ፀሐይ የትም አትሄድም!» አለ አንበሳ። «እኛ ነን ከእሷ የምንዞረው!» «አዎ። የምድር ግማሽ ቀን፣ ሌላው ግማሽ ሌሊት ነው።»",
    },
    {
      en: "\"But the Sun looks like it moves across the sky.\" \"Like trees seem to slide past a moving bus,\" said Teacher Meron. \"We are the ones moving.\"",
      am: "«ግን ፀሐይ በሰማይ ላይ የምትንቀሳቀስ ትመስላለች።» «ከሚሄድ አውቶቡስ ዛፎች የሚሄዱ እንደሚመስሉ» አሉ መምህርቷ። «የምንንቀሳቀሰው እኛ ነን።»",
    },
    {
      en: "\"Why can't I feel the Earth spinning?\" \"Because we spin with it, smoothly, like sitting still in a bus on a flat road.\" The Earth turns round and round!",
      am: "«ምድር ስትዞር ለምን አይሰማኝም?» «አብረናት ስለምንዞር፣ በለስላሳ መንገድ በአውቶቡስ እንደመቀመጥ።» ምድር ትዞራለች፣ ትዞራለች!",
    },
    {
      en: "That evening, Anbessa's cousin phoned from America. \"Good morning!\" she said. Anbessa laughed. \"Morning? It's night here!\" Then he stopped. Why?",
      am: "በዚያ ምሽት የአንበሳ የአጎት ልጅ ከአሜሪካ ደወለች። «እንደምን አደርክ!» አለች። አንበሳ ሳቀ። «ጠዋት? እዚህ ሌሊት ነው!» ከዚያ ቆም አለ። ለምን?",
    },
    {
      en: "He took the orange and the torch. When Ethiopia turned into the dark, the far side of the ball turned into the light. \"She's on the other side! Her morning is our night!\"",
      am: "ብርቱካኑንና ባትሪውን ወሰደ። ኢትዮጵያ ወደ ጨለማ ስትዞር የኳሱ ማዶ ወደ ብርሃን ገባ። «ማዶ ናት! የእሷ ጠዋት የእኛ ሌሊት ነው!»",
    },
    {
      en: "\"One whole turn of the Earth takes a day and a night: 24 hours,\" said Teacher Meron. \"The Sun rises in the east and sets in the west, every day.\"",
      am: "«ምድር አንድ ጊዜ ሙሉ ለመዞር ቀንና ሌሊት ይወስድባታል፦ 24 ሰዓት» አሉ መምህርቷ። «ፀሐይ በየቀኑ በምሥራቅ ትወጣለች፣ በምዕራብ ትጠልቃለች።»",
    },
    {
      en: "Next morning, the Sun peeped over the eastern hills. \"Good morning, Sun! We turned back to you!\" The Earth turns round and round: day comes up and night comes down!",
      am: "በማግሥቱ አንበሳ ፀሐይ ከምሥራቅ ኮረብቶች ብቅ ስትል ተመለከተ። «እንደምን አደርሽ ፀሐይ! ተመልሰን ዞርንልሽ!» ምድር ትዞራለች፣ ትዞራለች፦ ቀን ይመጣል፣ ሌሊት ይገባል!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Does the Sun really go away at night? What happens instead?", "Why was it morning for Anbessa's cousin when it was night for him?"],
      am: ["ፀሐይ በእርግጥ ማታ ትሄዳለች? በምትኩ ምን ይሆናል?", "ለአንበሳ ሌሊት ሲሆን ለአጎቱ ልጅ ለምን ጠዋት ሆነ?"],
    },
    activity: {
      en: "In a dark room, a grown-up holds a torch while you slowly turn an orange or a ball with a sticker on it. When is the sticker in day, and when in night? Watch where the Sun rises and sets from your home.",
      am: "በጨለማ ክፍል ትልቅ ሰው ባትሪ ሲይዝ ምልክት ያለበትን ብርቱካን ወይም ኳስ ቀስ ብላችሁ አዙሩ። ምልክቱ መቼ ቀን፣ መቼ ሌሊት ላይ ነው? ከቤታችሁ ፀሐይ የት እንደምትወጣና እንደምትጠልቅ ተመልከቱ።",
    },
  },
};

export default story;
