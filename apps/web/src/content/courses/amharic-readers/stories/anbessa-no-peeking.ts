import type { Story } from "../../../stories";

/*
  "What Happens Next?" (Amharic Readers, level 2): predicting from clues. On a rainy night
  Grandma reads "The Little Bee and the Rain" (ትንሿ ንብና ዝናቡ) to Anbessa, Gugu and Tsehay and
  stops at each turn: what comes next? Clues: the title, a dark sky, a big leaf, a smiling snail,
  the sun after rain. Anbessa wants to peek at the last page; Grandma shows him that guessing
  from clues is the fun, and that a wrong guess is fine (his "she'll eat the leaf"). At the end
  the real Lali taps at the window, wet, and Anbessa predicts what she'll do. The join-in line
  is "What comes next? Look for the clues!" (ቀጥሎ ምን ይሆናል? ፍንጭ ፈልጉ!).

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line, «ፍንጭ» for clue, «ቀንድ አውጣ» for snail and «ተጠለለች» (page 6).
*/
const story: Story = {
  id: "anbessa-no-peeking",
  course: "amharic-readers",
  pack: "story",
  title: { en: "What Happens Next?", am: "ቀጥሎ ምን ይሆናል?" },
  category: "Fidel",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#4A5BA8",
  scene: "lib-anbessa-no-peeking",
  coverPage: 6,
  teaches: { words: ["ቀጥሎ ምን ይሆናል?", "ፍንጭ", "ሰማዩ ጠቆረ።", "ከቅጠሉ ሥር ተጠለለች።"] },
  pages: [
    {
      en: `It's a rainy night. Anbessa, Gugu and Tsehay snuggle up by the fire. Grandma holds up a book: ትንሿ ንብና ዝናቡ, The Little Bee and the Rain. "From the name, what do you think happens?"`,
      am: "ዝናባማ ምሽት ነው። አንበሳ፣ ጉጉና ፀሐይ ከእሳቱ አጠገብ ተጠጋግተው ተቀምጠዋል። አያቴ መጽሐፍ ከፍ አድርጋ አሳየች፦ «ትንሿ ንብና ዝናቡ»። «ከስሙ ተነሥታችሁ ምን የሚሆን ይመስላችኋል?»",
    },
    {
      en: `"A bee… and rain… I think the bee gets wet!" says Tsehay. "Good," says Grandma. "The name is a clue. A clue is a little hint. Let's read and see." What comes next? Look for the clues!`,
      am: "«ንብ… እና ዝናብ… ንቧ የምትርስ ይመስለኛል!» አለች ፀሐይ። «ጎበዝ» አለች አያቴ። «ስሙ ፍንጭ ነው። ፍንጭ ትንሽ ጠቋሚ ነው። እናንብብና እንይ።» ቀጥሎ ምን ይሆናል? ፍንጭ ፈልጉ!",
    },
    {
      en: `Grandma reads: "ትንሿ ንብ አበባ ልትፈልግ ሩቅ በረረች። ሰማዩ ጠቆረ።" The little bee flew far away to find flowers. The sky grew dark. She stops. "What comes next?"`,
      am: "አያቴ አነበበች፦ «ትንሿ ንብ አበባ ልትፈልግ ሩቅ በረረች። ሰማዩ ጠቆረ።» ቆም አለች። «ቀጥሎ ምን ይሆናል?»",
    },
    {
      en: `But Anbessa can't wait. He grabs the book and flips to the very last page to peek. Grandma gently closes it. "If you peek, you miss the best part: guessing! Look for the clues instead."`,
      am: "አንበሳ ግን መጠበቅ አቃተው። መጽሐፉን ይዞ ለማየት ወደ መጨረሻው ገጽ ገለጠ። አያቴ ቀስ ብላ ዘጋችው። «አስቀድመህ ካየህ ምርጡን ክፍል ታጣለህ፦ መገመትን! ይልቅ ፍንጭ ፈልግ።»",
    },
    {
      en: `"The sky grew dark," says Tsehay. "That's a clue! It's going to rain!" Grandma reads on: "ዝናብ መዝነብ ጀመረ።" It started to rain. "You were right!" What comes next? Look for the clues!`,
      am: "«ሰማዩ ጠቆረ» አለች ፀሐይ። «ያ ፍንጭ ነው! ዝናብ ሊዘንብ ነው!» አያቴ ቀጠለች፦ «ዝናብ መዝነብ ጀመረ።» «ትክክል ነሽ!» ቀጥሎ ምን ይሆናል? ፍንጭ ፈልጉ!",
    },
    {
      en: `"ንቧ ትልቅ ቅጠል አየች።" The bee saw a big leaf. "What will she do?" "She'll eat it!" says Anbessa. "She'll hide under it, out of the rain!" says Gugu.`,
      am: "«ንቧ ትልቅ ቅጠል አየች።» «ምን የምታደርግ ይመስላችኋል?» «ትበላዋለች!» አለ አንበሳ። «ከዝናቡ ለመሸሽ ሥሩ ትደበቃለች!» አለ ጉጉ።",
    },
    {
      en: `Grandma reads: "ከቅጠሉ ሥር ተጠለለች።" She sheltered under the leaf. Gugu was right. Anbessa wasn't, and that's fine! "A guess is a guess," says Grandma. "Then the words tell us."`,
      am: "አያቴ አነበበች፦ «ከቅጠሉ ሥር ተጠለለች።» ጉጉ ትክክል ነበር። አንበሳ አልነበረም፤ ችግር የለውም! «ግምት ግምት ነው» አለች አያቴ። «ከዚያ ቃላቱ ይነግሩናል።»",
    },
    {
      en: `"Under the leaf was a snail. The snail smiled." Anbessa thinks hard. Will the snail chase her away? "He smiled! That's a clue. He'll share!" Grandma reads: "«ቦታ አለ፤ ግቢ» አለ።" "There's room, come in," he said.`,
      am: "«ከቅጠሉ ሥር አንድ ቀንድ አውጣ ነበር። ቀንድ አውጣው ፈገግ አለ።» አንበሳ በደንብ አሰበ። ያባርራት ይሆን? «ፈገግ አለ! ያ ፍንጭ ነው። ያካፍላታል!» አያቴ አነበበች፦ «‹ቦታ አለ፤ ግቢ› አለ።»",
    },
    {
      en: `"You used a clue!" says Grandma, and Anbessa sits up tall. "ዝናቡ ቆመ። ፀሐይ ወጣች።" The rain stopped. The sun came out. "Rain and sun together… a rainbow!" shouts Anbessa. And there it is, on the next page.`,
      am: "«ፍንጭ ተጠቀምክ!» አለች አያቴ፤ አንበሳ ቀና ብሎ ተቀመጠ። «ዝናቡ ቆመ። ፀሐይ ወጣች።» «ዝናብና ፀሐይ በአንድ ላይ… ቀስተ ደመና!» ብሎ ጮኸ አንበሳ። ይኸው፣ በሚቀጥለው ገጽ ላይ አለ።",
    },
    {
      en: `The last page: "ንቧ ወደ ቀፎዋ ተመለሰች። ለቀንድ አውጣው ስጦታ አመጣች።" The bee flew home to her hive. She brought the snail a present. "What present can a bee give?" "Honey!" they all shout. Yes: ማር!`,
      am: "የመጨረሻው ገጽ፦ «ንቧ ወደ ቀፎዋ ተመለሰች። ለቀንድ አውጣው ስጦታ አመጣች።» «ንብ ምን ስጦታ ልትሰጥ ትችላለች?» «ማር!» ብለው ሁሉም ጮኹ። አዎ፦ ማር!",
    },
    {
      en: `Just then: tap, tap, tap at the window. It's Lali, wet from the rain! "What comes next?" whispers Grandma. Anbessa looks for clues. "She's wet and cold… she'll come in by the fire!"`,
      am: "ልክ በዚያን ጊዜ፦ ኳ፣ ኳ፣ ኳ መስኮቱ ላይ። ላሊ ናት፤ በዝናብ ርሳለች! «ቀጥሎ ምን ይሆናል?» አለች አያቴ በሹክሹክታ። አንበሳ ፍንጭ ፈለገ። «ርሳለች፤ በርዷታል… ከእሳቱ አጠገብ ልትገባ ነው!»",
    },
    {
      en: `They open the window, and Lali zooms in to warm her wings by the fire. Anbessa was right! "Again?" asks Grandma, holding up another book. "Yes! But no peeking!" What comes next? Look for the clues!`,
      am: "መስኮቱን ከፈቱ፤ ላሊ ክንፎቿን ልታሞቅ ወደ እሳቱ በረረች። አንበሳ ትክክል ነበር! «እንደገና?» አለች አያቴ ሌላ መጽሐፍ ከፍ አድርጋ። «አዎ! ግን አስቀድሞ ማየት የለም!» ቀጥሎ ምን ይሆናል? ፍንጭ ፈልጉ!",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["What clue told Tsehay it was going to rain? What clue helped Anbessa guess the snail would share?", "Anbessa guessed wrong once. Is a wrong guess OK? Why?"],
      am: ["ዝናብ እንደሚዘንብ ለፀሐይ የነገራት የትኛው ፍንጭ ነው? ቀንድ አውጣው እንደሚያካፍል አንበሳ እንዲገምት የረዳው የትኛው ፍንጭ ነው?", "አንበሳ አንድ ጊዜ በስሕተት ገመተ። የተሳሳተ ግምት ችግር አለው? ለምን?"],
    },
    activity: {
      en: "Next time you read together, stop at an exciting moment and ask 'What comes next?'. Your child guesses and says which clue (a word, the picture, the title) helped. Then read on and see.",
      am: "በሚቀጥለው ጊዜ አብራችሁ ስታነቡ በአስደሳች ቦታ ላይ ቆም ብላችሁ «ቀጥሎ ምን ይሆናል?» ብላችሁ ጠይቁ። ልጃችሁ ይገምትና የረዳውን ፍንጭ (አንድ ቃል፣ ሥዕሉ፣ ርዕሱ) ይናገር። ከዚያ ቀጥላችሁ አንብባችሁ እዩ።",
    },
  },
};

export default story;
