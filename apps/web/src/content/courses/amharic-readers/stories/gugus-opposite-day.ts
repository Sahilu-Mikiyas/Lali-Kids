import type { Story } from "../../../stories";

/*
  "Gugu's Opposite Day" (Amharic Readers, level 3): opposites, and everyday home words (መስኮት,
  ልብስ, ብርድ ልብስ, ወንበር). Gugu declares Opposite Day and does the opposite of everything; it's
  funny until Grandma leaves a note before the rain (ዝናብ ሊዘንብ ነው። መስኮቱን ዝጋ። ልብሶቹን ወደ
  ውስጥ አስገባ።) and he does the opposite of that too. Rain pours in. Anbessa: a note means what
  it says. Gugu reads it again, puts things right (close / open, inside / outside, wet / dry)
  and owns up; Grandma turns Opposite Day into a card game: ትልቅ / ትንሽ, ረጅም / አጭር, ሞቃት /
  ቀዝቃዛ, ላይ / ታች, ክፍት / ዝግ, ፈጣን / ቀርፋፋ, ደስተኛ / ያዘነ. The join-in line is "Up and down,
  big and small: opposites, opposites, we know them all!"
  (ላይና ታች፣ ትልቅና ትንሽ፦ ተቃራኒ፣ ተቃራኒ፣ ሁሉንም እናውቃለን!).

  AMHARIC: first draft, to be checked by a native-speaking editor before launch, especially
  the join-in line, «የተቃራኒ ቀን» for Opposite Day, and the opposite pairs chosen (ደስተኛ / ያዘነ).
*/
const story: Story = {
  id: "gugus-opposite-day",
  course: "amharic-readers",
  pack: "story",
  title: { en: "Gugu's Opposite Day", am: "የጉጉ የተቃራኒ ቀን" },
  category: "Fidel",
  ageBands: ["6-7", "8-9"],
  isFree: false,
  color: "#8A4FB0",
  scene: "lib-gugus-opposite-day",
  coverPage: 9,
  teaches: { words: ["ትልቅ / ትንሽ", "ረጅም / አጭር", "ሞቃት / ቀዝቃዛ", "ላይ / ታች", "ክፍት / ዝግ", "ፈጣን / ቀርፋፋ", "ውስጥ / ውጭ"] },
  pages: [
    {
      en: `Gugu wakes up with a big grin. "Today is Opposite Day! I'll do the opposite of everything!" At breakfast he says, "Good night, everyone!" Anbessa giggles into his tea.`,
      am: "ጉጉ ትልቅ ፈገግታ ይዞ ከእንቅልፉ ተነሣ። «ዛሬ የተቃራኒ ቀን ነው! የሁሉንም ነገር ተቃራኒ አደርጋለሁ!» በቁርስ ሰዓት «ደህና እደሩ!» አለ። አንበሳ ሻዩን እየጠጣ ተንከተከተ።",
    },
    {
      en: `"Sit down, Gugu," says Grandma. Gugu stands up. "Come inside!" He goes outside. "Speak quietly!" "I'M SPEAKING QUIETLY!" he shouts. Up and down, big and small: opposites, opposites, we know them all!`,
      am: "«ጉጉ፣ ቁጭ በል» አለች አያቴ። ጉጉ ተነሣ። «ወደ ውስጥ ግባ!» ወደ ውጭ ወጣ። «ቀስ ብለህ ተናገር!» «ቀስ ብዬ እየተናገርኩ ነው!» ብሎ ጮኸ። ላይና ታች፣ ትልቅና ትንሽ፦ ተቃራኒ፣ ተቃራኒ፣ ሁሉንም እናውቃለን!",
    },
    {
      en: `Then Grandma has to go to the market. She leaves a note on the table: ዝናብ ሊዘንብ ነው። መስኮቱን ዝጋ። ልብሶቹን ወደ ውስጥ አስገባ። "Rain is coming. Close the window. Bring the clothes inside."`,
      am: "ከዚያ አያቴ ወደ ገበያ መሄድ ነበረባት። በጠረጴዛው ላይ ማስታወሻ ትታ ሄደች፦ «ዝናብ ሊዘንብ ነው። መስኮቱን ዝጋ። ልብሶቹን ወደ ውስጥ አስገባ።»",
    },
    {
      en: `Gugu reads it and grins. "Opposite Day!" So instead of closing the window, he opens it wide. Instead of bringing the clothes in, he carries the blankets outside too!`,
      am: "ጉጉ አንብቦት ፈገግ አለ። «የተቃራኒ ቀን!» ስለዚህ መስኮቱን ከመዝጋት ይልቅ በሰፊው ከፈተው። ልብሶቹን ወደ ውስጥ ከማስገባት ይልቅ ብርድ ልብሶቹንም ወደ ውጭ አወጣቸው!",
    },
    {
      en: `Then the sky goes dark, and down comes the rain: big, heavy drops. It pours in through the open window. It soaks the blankets outside. Puddles everywhere! "Oh no," whispers Gugu.`,
      am: "ከዚያ ሰማዩ ጠቆረ፤ ዝናቡም ወረደ፦ ትልልቅና ከባድ ጠብታዎች። በተከፈተው መስኮት ገባ። ውጭ ያሉትን ብርድ ልብሶች አራሳቸው። ሁሉም ቦታ ኩሬ! «ወይኔ» አለ ጉጉ በሹክሹክታ።",
    },
    {
      en: `Anbessa runs in. "Gugu! Read the note again, the real way. Opposites are fun in a game, but a note means what it says!" Gugu reads it again, slowly: ዝጋ, close. አስገባ, bring in.`,
      am: "አንበሳ እየሮጠ ገባ። «ጉጉ! ማስታወሻውን እንደገና አንብበው፤ በትክክለኛው መንገድ። ተቃራኒ በጨዋታ ደስ ይላል፤ ማስታወሻ ግን የሚለውን ማለቱ ነው!» ጉጉ እንደገና ቀስ ብሎ አነበበው፦ ዝጋ። አስገባ።",
    },
    {
      en: `So they put it right. Open window: close it! Blankets outside: bring them inside! Wet blankets: hang them by the fire until they're dry. Up and down, big and small: opposites, opposites, we know them all!`,
      am: "ስለዚህ አስተካከሉት። ክፍት መስኮት፦ ዝጋው! ውጭ ያሉ ብርድ ልብሶች፦ ወደ ውስጥ አስገባቸው! እርጥብ ብርድ ልብሶች፦ እስኪደርቁ ከእሳቱ አጠገብ አስጣቸው። ላይና ታች፣ ትልቅና ትንሽ፦ ተቃራኒ፣ ተቃራኒ፣ ሁሉንም እናውቃለን!",
    },
    {
      en: `When Grandma comes home, Gugu tells her everything. "I did the opposite of your note. I'm sorry." Grandma hugs him. "Thank you for telling me. Now, shall we play Opposite Day the right way?"`,
      am: "አያቴ ስትመለስ ጉጉ ሁሉንም ነገራት። «የማስታወሻሽን ተቃራኒ አደረግሁ። ይቅርታ።» አያቴ አቀፈችው። «ስለነገርከኝ አመሰግናለሁ። አሁን የተቃራኒ ቀንን በትክክለኛው መንገድ እንጫወት?»",
    },
    {
      en: `Grandma makes word cards: ትልቅ, ትንሽ, ረጅም, አጭር, ሞቃት, ቀዝቃዛ, ላይ, ታች, ክፍት, ዝግ, ፈጣን, ቀርፋፋ. "Read a card, then find its opposite, and act it out!"`,
      am: "አያቴ የቃላት ካርዶች ሠራች፦ ትልቅ፣ ትንሽ፣ ረጅም፣ አጭር፣ ሞቃት፣ ቀዝቃዛ፣ ላይ፣ ታች፣ ክፍት፣ ዝግ፣ ፈጣን፣ ቀርፋፋ። «ካርድ አንብቡ፤ ተቃራኒውን ፈልጉ፤ ከዚያ በተግባር አሳዩ!»",
    },
    {
      en: `Anbessa reads ትልቅ and stretches up big. Gugu finds ትንሽ and curls up small. ፈጣን: they zoom round the room! ቀርፋፋ: they creep like tortoises. Up and down, big and small: opposites, opposites, we know them all!`,
      am: "አንበሳ «ትልቅ» አንብቦ ራሱን ትልቅ አደረገ። ጉጉ «ትንሽ» አግኝቶ ተጨማደደ። ፈጣን፦ በክፍሉ ዙሪያ ሮጡ! ቀርፋፋ፦ እንደ ኤሊ ቀስ ብለው ተራመዱ። ላይና ታች፣ ትልቅና ትንሽ፦ ተቃራኒ፣ ተቃራኒ፣ ሁሉንም እናውቃለን!",
    },
    {
      en: `The last card says ደስተኛ, happy. Its opposite is ያዘነ, sad. Gugu tries to make a sad face, but he's having far too much fun. His mouth keeps turning back into a smile!`,
      am: "የመጨረሻው ካርድ «ደስተኛ» ይላል። ተቃራኒው «ያዘነ» ነው። ጉጉ ያዘነ ፊት ለማሳየት ሞከረ፤ ግን በጣም እየተደሰተ ነው። አፉ ተመልሶ ፈገግታ ይሆናል!",
    },
    {
      en: `At bedtime Grandma says, "ደህና እደር, Gugu. Good night." Gugu opens his mouth to say "Good morning!", then stops and smiles. "ደህና እደሪ, Grandma. Opposite Day is over!"`,
      am: "በመኝታ ሰዓት አያቴ «ደህና እደር፣ ጉጉ» አለች። ጉጉ «እንደምን አደርሽ!» ሊል አፉን ከፈተ፤ ከዚያ ቆም ብሎ ፈገግ አለ። «ደህና እደሪ፣ አያቴ። የተቃራኒ ቀን አልቋል!»",
    },
  ],
  grownUps: {
    talkAbout: {
      en: ["What went wrong when Gugu did the opposite of Grandma's note?", "Can you think of the opposite of ሞቃት? Of ላይ? Of ክፍት?"],
      am: ["ጉጉ የአያቴን ማስታወሻ ተቃራኒ ሲያደርግ ምን ችግር ተፈጠረ?", "የ«ሞቃት» ተቃራኒ ምንድን ነው? የ«ላይ»? የ«ክፍት»?"],
    },
    activity: {
      en: "Make Grandma's opposite cards: write six pairs of opposites on twelve cards. Turn them face down and play a memory game: turn two over, read them, and keep them if they are opposites. Act each pair out!",
      am: "የአያቴን የተቃራኒ ካርዶች ሥሩ፦ ስድስት ጥንድ ተቃራኒ ቃላትን በአሥራ ሁለት ካርዶች ላይ ጻፉ። ፊታቸውን ወደ ታች አድርጋችሁ የማስታወስ ጨዋታ ተጫወቱ፦ ሁለት ገልብጣችሁ አንብቡ፤ ተቃራኒ ከሆኑ ውሰዷቸው። እያንዳንዱን ጥንድ በተግባር አሳዩ!",
    },
  },
};

export default story;
