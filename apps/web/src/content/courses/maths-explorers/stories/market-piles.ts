import type { Story } from "../../../stories";

/*
  "Piles of Five" (Maths Explorers, level 2). The 5 and 10 times tables and skip-counting:
  Haben helps her mother sell tomatoes at the Saturday market in little piles of five (as many
  Ethiopian market sellers sell tomatoes, onions and fruit). One pile is 5, four piles 4 × 5 =
  20; the fives end in 5 or 0; Auntie Sheep needs 35 tomatoes: 7 piles (7 × 5 = 35). Mr Kidane
  next door sells mangoes in crates of ten (tens end in 0); two piles of five make one ten, so
  ten piles are five tens: 10 × 5 = 50. The last pile becomes timatim fitfit at home.
  The repeated line to join in on: "Five in a pile, count them in fives!"
  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  «ክምር» for a pile, «መደብ» for a market stall and the repeated line
  «በአንድ ክምር አምስት፣ በአምስት በአምስት ቁጠሩ!».
*/
const story: Story = {
  id: "market-piles",
  course: "maths-explorers",
  pack: "story",
  title: { en: "Piles of Five", am: "አምስት አምስት ክምር" },
  category: "Maths",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#E2463F",
  scene: "lib-market-piles",
  coverPage: 5,
  teaches: { numbers: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50], words: ["count in fives", "count in tens", "times five", "times ten"] },
  pages: [
    {
      en: 'On Saturday, Haben helped her mother at their market stall. They had a big basket of red tomatoes. "We sell them in little piles," said Mother. "Five tomatoes in every pile."',
      am: "ቅዳሜ ሐበን እናቷን በገበያ መደባቸው አገዘች። ትልቅ ቅርጫት ቀይ ቲማቲም ነበራቸው። «በትናንሽ ክምሮች እንሸጣቸዋለን» አለች እናቷ። «በእያንዳንዱ ክምር አምስት ቲማቲሞች።»",
    },
    {
      en: "Haben made one pile: five. Two piles: five, ten. Three piles: five, ten, fifteen. Five in a pile, count them in fives!",
      am: "ሐበን አንድ ክምር ሠራች፦ አምስት። ሁለት ክምሮች፦ አምስት፣ አሥር። ሦስት ክምሮች፦ አምስት፣ አሥር፣ አሥራ አምስት። በአንድ ክምር አምስት፣ በአምስት በአምስት ቁጠሩ!",
    },
    {
      en: 'Soon there was a long row. "Four piles of five is twenty," said Mother. 4 × 5 = 20. Haben wrote the numbers on a piece of cardboard: 5, 10, 15, 20, 25, 30.',
      am: "ብዙም ሳይቆይ ረጅም ረድፍ ሆነ። «አራት የአምስት ክምሮች ሃያ ናቸው» አለች እናቷ። 4 × 5 = 20። ሐበን ቁጥሮቹን በካርቶን ላይ ጻፈች፦ 5፣ 10፣ 15፣ 20፣ 25፣ 30።",
    },
    {
      en: '"Look!" said Haben. "The fives always end in 5 or 0: five, ten, fifteen, twenty, twenty-five, thirty." Five, zero, five, zero, like a little song.',
      am: "«ተመልከቺ!» አለች ሐበን። «አምስቶቹ ሁልጊዜ በ5 ወይም በ0 ያልቃሉ፦ አምስት፣ አሥር፣ አሥራ አምስት፣ ሃያ፣ ሃያ አምስት፣ ሠላሳ።» አምስት፣ ዜሮ፣ አምስት፣ ዜሮ፣ እንደ ትንሽ ዘፈን።",
    },
    {
      en: 'Auntie Sheep came hurrying by. "I\'m making tomato salad for a big family lunch. I need thirty-five tomatoes!" How many piles is that?',
      am: "እማማ በግ እየተጣደፉ መጡ። «ለትልቅ የቤተሰብ ምሳ የቲማቲም ሰላጣ እያዘጋጀሁ ነው። ሠላሳ አምስት ቲማቲሞች ያስፈልጉኛል!» ይህ ስንት ክምር ይሆናል?",
    },
    {
      en: 'Haben counted the piles in fives: "Five, ten, fifteen, twenty, twenty-five, thirty, thirty-five. Seven piles!" 7 × 5 = 35. Five in a pile, count them in fives!',
      am: "ሐበን ክምሮቹን በአምስት በአምስት ቆጠረች፦ «አምስት፣ አሥር፣ አሥራ አምስት፣ ሃያ፣ ሃያ አምስት፣ ሠላሳ፣ ሠላሳ አምስት። ሰባት ክምሮች!» 7 × 5 = 35። በአንድ ክምር አምስት፣ በአምስት በአምስት ቁጠሩ!",
    },
    {
      en: 'At the next stall, Mr Kidane sold mangoes in crates of ten. "One crate is ten. Two crates, twenty. Three crates, thirty," he said. "And the tens always end in 0."',
      am: "በአጠገባቸው ባለው መደብ አቶ ኪዳኔ ማንጎዎችን በአሥር በአሥር በሣጥን ይሸጡ ነበር። «አንድ ሣጥን አሥር ነው። ሁለት ሣጥኖች ሃያ። ሦስት ሣጥኖች ሠላሳ» አሉ። «አሥሮቹም ሁልጊዜ በ0 ያልቃሉ።»",
    },
    {
      en: 'Haben noticed something. "Two piles of five make ten, the same as one crate!" She put two piles next to Mr Kidane\'s crate. Ten and ten.',
      am: "ሐበን አንድ ነገር አስተዋለች። «ሁለት የአምስት ክምሮች አሥር ይሆናሉ፤ ልክ እንደ አንድ ሣጥን!» ሁለት ክምሮችን ከአቶ ኪዳኔ ሣጥን አጠገብ አስቀመጠች። አሥርና አሥር።",
    },
    {
      en: 'Gugu came by with a question. "How many tomatoes are there in ten piles?" Haben thought. "Two piles make ten, so ten piles make five tens: ten, twenty, thirty, forty, fifty. Fifty!" 10 × 5 = 50.',
      am: "ጉጉ ጥያቄ ይዞ መጣ። «በአሥር ክምሮች ውስጥ ስንት ቲማቲሞች አሉ?» ሐበን አሰበች። «ሁለት ክምሮች አሥር ናቸው፤ ስለዚህ አሥር ክምሮች አምስት አሥሮች ናቸው፦ አሥር፣ ሃያ፣ ሠላሳ፣ አርባ፣ ሃምሳ። ሃምሳ!» 10 × 5 = 50።",
    },
    {
      en: "{name}, count Haben's ten piles with her: five, ten, fifteen, twenty, twenty-five, thirty, thirty-five, forty, forty-five, fifty! Five in a pile, count them in fives!",
      am: "{name}፣ የሐበንን አሥር ክምሮች ከእሷ ጋር እንቁጠር፦ አምስት፣ አሥር፣ አሥራ አምስት፣ ሃያ፣ ሃያ አምስት፣ ሠላሳ፣ ሠላሳ አምስት፣ አርባ፣ አርባ አምስት፣ ሃምሳ! በአንድ ክምር አምስት፣ በአምስት በአምስት ቁጠሩ!",
    },
    {
      en: 'By evening, only one pile was left: five tomatoes. "Those are for us," said Mother. "You counted so well today, you can choose what we cook."',
      am: "ምሽት ላይ አንድ ክምር ብቻ ቀረ፦ አምስት ቲማቲሞች። «እነዚህ የእኛ ናቸው» አለች እናቷ። «ዛሬ በጣም ጎበዝ ሆነሽ ቆጠርሽ፤ ምን እንደምናበስል አንቺ ምረጪ።»",
    },
    {
      en: "At home, Haben chose timatim fitfit: tomatoes, onion and green chilli mixed with pieces of injera. Mother chopped and Haben mixed. One pile, five tomatoes, and a happy, full family.",
      am: "ቤት ሲደርሱ ሐበን ቲማቲም ፍትፍትን መረጠች፦ ቲማቲም፣ ሽንኩርትና ቃሪያ ከእንጀራ ቁራሽ ጋር። እናቷ ከተፈች፤ ሐበን አዋሐደች። አንድ ክምር፣ አምስት ቲማቲሞች፣ የጠገበና ደስተኛ ቤተሰብ።",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["How did Haben know that seven piles make thirty-five?", "Why do the fives end in 5 or 0? Count your fingers in fives to see."],
      am: ["ሐበን ሰባት ክምሮች ሠላሳ አምስት እንደሚሆኑ እንዴት አወቀች?", "አምስቶቹ ለምን በ5 ወይም በ0 ያልቃሉ? ለማየት ጣቶቻችሁን በአምስት በአምስት ቁጠሩ።"],
    },
    activity: {
      en: "Play market: make piles of five with beans, stones or bottle tops. One of you asks for a number of things (15, 30, 35…) and the other works out how many piles to hand over by counting in fives.",
      am: "ገበያ ተጫወቱ፦ በባቄላ፣ በጠጠር ወይም በጠርሙስ ክዳን የአምስት ክምሮችን ሥሩ። አንዳችሁ የተወሰነ ቁጥር (15፣ 30፣ 35…) ስትጠይቁ ሌላው በአምስት በአምስት እየቆጠረ ስንት ክምር እንደሚሰጥ ያሰላል።",
    },
  },
};

export default story;
