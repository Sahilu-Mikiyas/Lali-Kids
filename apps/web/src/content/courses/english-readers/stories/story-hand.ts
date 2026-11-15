import type { Story } from "../../../stories";

/*
  "The Story Hand" (level 4: retelling a story in your own words).
  Abdi was ill and missed story time. Haben tries to tell him the story, "The Thirsty Crow", but it
  comes out all muddled. She remembers Teacher Meron's Story Hand: five fingers for the five parts
  of a story (who, where, the problem, what happened, the end) and retells it short, in her own
  words. The children try the crow's trick with a cup of water and pebbles, and the water rises.
  Then Abdi retells it to Hooyo on his own hand.
  Join-in line: "Who, where, the problem, what happened, the end!"

  English taught: retelling; the parts of a story (character, setting, problem, events, ending)
  in simple words: who, where, problem, what happened, the end. The tale is Aesop's "The Crow and
  the Pitcher" (public domain), retold. Fact: stones dropped into water push the water up.

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially the
  join-in line «ማን፣ የት፣ ችግሩ፣ ምን ሆነ፣ መጨረሻው!».
*/
const story: Story = {
  id: "story-hand",
  course: "english-readers",
  pack: "story",
  title: { en: "The Story Hand", am: "የታሪክ እጅ" },
  category: "English",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#8E5BE0",
  scene: "lib-story-hand",
  coverPage: 3,
  teaches: { words: ["retell", "who", "where", "problem", "what happened", "the end", "crow", "pot", "stones"] },
  pages: [
    {
      en: "Abdi was ill, so he missed story time at school. \"What was the story?\" he asked Haben. \"Tell me!\"",
      am: "አብዲ ታሞ ስለነበር በትምህርት ቤት የታሪክ ሰዓት አመለጠው። «ታሪኩ ምን ነበር?» ብሎ ሐበንን ጠየቃት። «ንገሪኝ!»",
    },
    {
      en: "\"Well,\" said Haben, \"there were stones, no, wait, first it was hot, and then a pot, and the crow, no…\"",
      am: "«እንግዲህ» አለች ሐበን፣ «ድንጋዮች ነበሩ፤ አይ፣ ቆይ፣ መጀመሪያ ሞቃት ነበር፤ ከዚያ ማሰሮ፤ ቁራውም፣ አይ…»",
    },
    {
      en: "Abdi frowned. \"I don't get it.\" Haben stopped. She was telling it all mixed up. Then she remembered the Story Hand.",
      am: "አብዲ ፊቱን ቋጠረ። «አልገባኝም።» ሐበን ቆመች። ታሪኩን ደበላልቃ እየነገረች ነበር። ከዚያ የታሪክ እጅን አስታወሰች።",
    },
    {
      en: "She held up her hand. \"Five fingers for five parts. Who, where, the problem, what happened, the end!\"",
      am: "እጇን ከፍ አደረገች። «አምስት ጣቶች ለአምስት ክፍሎች። Who, where, the problem, what happened, the end!» (ማን፣ የት፣ ችግሩ፣ ምን ሆነ፣ መጨረሻው!)",
    },
    {
      en: "Thumb: who? \"A thirsty crow.\" Pointer: where? \"Outside, on a hot, dry day, next to a pot of water.\"",
      am: "አውራ ጣት፦ ማን? «የተጠማ ቁራ።» ሌባ ጣት፦ የት? «ውጭ፣ በሞቃትና ደረቅ ቀን፣ ውሃ ካለበት ማሰሮ አጠገብ።»",
    },
    {
      en: "Middle finger: the problem? \"The water was low, at the bottom. The crow's beak couldn't reach it.\"",
      am: "የመሃል ጣት፦ ችግሩ? «ውሃው ዝቅ ብሎ ከታች ነበር። የቁራው መንቁር ሊደርስበት አልቻለም።»",
    },
    {
      en: "Ring finger: what happened? \"The crow picked up little stones and dropped them in, one by one. Plop, plop, plop!\"",
      am: "የቀለበት ጣት፦ ምን ሆነ? «ቁራው ትንንሽ ድንጋዮችን እያነሣ አንድ በአንድ ጣላቸው። ጡብ፣ ጡብ፣ ጡብ!»",
    },
    {
      en: "Little finger: the end? \"The water came up, up, up, and the crow had a long drink. The end!\"",
      am: "ትንሿ ጣት፦ መጨረሻው? «ውሃው ወደ ላይ፣ ወደ ላይ፣ ወደ ላይ ወጣ፤ ቁራውም በደንብ ጠጣ። The end!»",
    },
    {
      en: "\"Can stones really make water come up?\" asked Abdi. \"Let's try!\" said Haben. They found a cup and some pebbles.",
      am: "«ድንጋዮች በእውነት ውሃን ወደ ላይ ያወጣሉ?» ብሎ ጠየቀ አብዲ። «እንሞክር!» አለች ሐበን። ኩባያና ጠጠሮች አገኙ።",
    },
    {
      en: "Plop, plop, plop! The water came up to the top of the cup. \"The crow was clever!\" laughed Abdi.",
      am: "ጡብ፣ ጡብ፣ ጡብ! ውሃው እስከ ኩባያው አፍ ወጣ። «ቁራው ብልህ ነበር!» ብሎ ሳቀ አብዲ።",
    },
    {
      en: "That evening, Abdi told the story to Hooyo, on his own hand, in his own words. Who, where, the problem, what happened, the end!",
      am: "በዚያ ምሽት አብዲ ታሪኩን በራሱ እጅ፣ በራሱ ቃላት ለሁዮ ነገራት። Who, where, the problem, what happened, the end!",
    },
    {
      en: "Can you tell a story you know on your hand, {name}? Who, where, the problem, what happened, the end!",
      am: "{name}፣ የምታውቁትን ታሪክ በእጃችሁ መናገር ትችላላችሁ? Who, where, the problem, what happened, the end!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["Why was Haben's first try hard to follow?", "What are the five parts on the Story Hand?"],
      am: ["የሐበን የመጀመሪያ ሙከራ ለመከተል ለምን አስቸገረ?", "በታሪክ እጅ ላይ ያሉት አምስቱ ክፍሎች ምንድን ናቸው?"],
    },
    activity: {
      en: 'After a story (from a book, a film, or something that happened today), ask your child to retell it on their hand: thumb for who, pointer for where, middle finger for the problem, ring finger for what happened, little finger for the end. Short is good; their own words are best. Then try the crow\'s trick with a cup, a little water and pebbles.',
      am: 'ከአንድ ታሪክ በኋላ (ከመጽሐፍ፣ ከፊልም፣ ወይም ዛሬ ከሆነ ነገር) ልጅዎ በእጁ መልሶ እንዲናገር ይጠይቁ፦ አውራ ጣት ለማን፣ ሌባ ጣት ለየት፣ የመሃል ጣት ለችግሩ፣ የቀለበት ጣት ለምን ሆነ፣ ትንሿ ጣት ለመጨረሻው። አጭር ጥሩ ነው፤ በራሱ ቃላት ከሆነ ደግሞ የተሻለ። ከዚያ የቁራውን ዘዴ በኩባያ፣ በትንሽ ውሃና በጠጠሮች ሞክሩ።',
    },
  },
};

export default story;
