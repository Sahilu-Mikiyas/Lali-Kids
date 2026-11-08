import type { Course, CourseId } from "../../src/content/courses/types";
import type { Story } from "../../src/content/stories";

/*
  Test-only learning packages for the end-to-end suite, never in the catalogue. They are part of
  the build only when NEXT_PUBLIC_LALI_E2E=1 (e2e/support/env.cjs), through
  src/content/test-fixtures.ts. Course A has every lesson and question kind; course B exists to
  test VIP's one-package-at-a-time rule.
*/

export const FIXTURE_A = "test-course-a" as CourseId;
export const FIXTURE_B = "test-course-b" as CourseId;

export const fixtureStory: Story = {
  id: "test-course-story",
  course: FIXTURE_A,
  title: { en: "Bee Counts Three", am: "ንቧ ሦስት ትቆጥራለች" },
  category: "Maths",
  ageBands: ["3-5", "6-7", "8-9"],
  color: "#0FA3A3",
  coverPage: 0,
  isFree: false,
  pages: [
    { en: "Lali the bee found one flower.", am: "ንቧ ላሊ አንድ አበባ አገኘች።" },
    { en: "Then two flowers, then three. One, two, three!", am: "ከዚያ ሁለት አበቦች፣ ከዚያ ሦስት። አንድ፣ ሁለት፣ ሦስት!" },
  ],
};

export const courseA: Course = {
  id: FIXTURE_A,
  title: { en: "Test Package A", am: "የሙከራ ጥቅል ሀ" },
  tagline: { en: "Counting with Lali", am: "ከላሊ ጋር መቁጠር" },
  outcome: { en: "Your child counts to three and sorts things by size.", am: "ልጅዎ እስከ ሦስት ይቆጥራል፤ ነገሮችን በመጠን ይለያል።" },
  ages: ["3-5", "6-7"],
  color: "#0FA3A3",
  priceEtb: 1500,
  status: "live",
  levels: [
    {
      id: "a1",
      title: { en: "One, two, three", am: "አንድ፣ ሁለት፣ ሦስት" },
      goal: { en: "Counts three things", am: "ሦስት ነገሮችን ይቆጥራል" },
      lessons: [
        { kind: "story", id: "test-course-story" },
        { kind: "demo", id: "tap-three", title: { en: "Tap three flowers", am: "ሦስት አበቦችን ንኩ" } },
        {
          kind: "practice",
          quiz: {
            id: "test-a1-practice",
            questions: [
              { kind: "truefalse", prompt: { en: "Is the sun hot?", am: "ፀሐይ ሞቃት ናት?" }, answer: true, explain: { en: "Yes, the sun is very hot.", am: "አዎ፣ ፀሐይ በጣም ሞቃት ናት።" } },
              {
                kind: "choice",
                prompt: { en: "Which is a flower?", am: "አበባ የትኛው ነው?" },
                options: [
                  { label: { en: "Stone", am: "ድንጋይ" }, pic: { art: "stone" } },
                  { label: { en: "Flower", am: "አበባ" }, pic: { art: "flower" } },
                ],
                answer: 1,
                explain: { en: "A flower has petals.", am: "አበባ የአበባ ቅጠሎች አሉት።" },
              },
            ],
          },
        },
      ],
      quiz: {
        id: "test-a1-quiz",
        questions: [
          {
            kind: "choice",
            prompt: { en: "Which one is the flower?", am: "አበባው የትኛው ነው?" },
            options: [
              { label: { en: "Stone", am: "ድንጋይ" }, pic: { art: "stone" } },
              { label: { en: "Flower", am: "አበባ" }, pic: { art: "flower" } },
            ],
            answer: 1,
            explain: { en: "The flower has petals.", am: "አበባው የአበባ ቅጠሎች አሉት።" },
          },
          { kind: "count", prompt: { en: "How many flowers?", am: "ስንት አበቦች?" }, pic: { art: "flower", count: 3 }, answer: 3, numerals: "digits", explain: { en: "One, two, three!", am: "አንድ፣ ሁለት፣ ሦስት!" } },
          { kind: "order", prompt: { en: "Smallest to biggest", am: "ከትንሹ እስከ ትልቁ" }, items: [{ label: { en: "Small", am: "ትንሽ" } }, { label: { en: "Middle", am: "መካከለኛ" } }, { label: { en: "Big", am: "ትልቅ" } }] },
          {
            kind: "match",
            prompt: { en: "Match the pairs", am: "ጥንዶቹን አዛምዱ" },
            pairs: [
              { left: { label: { en: "1", am: "፩" } }, right: { label: { en: "one", am: "አንድ" } } },
              { left: { label: { en: "2", am: "፪" } }, right: { label: { en: "two", am: "ሁለት" } } },
            ],
          },
          { kind: "truefalse", prompt: { en: "Do bees make honey?", am: "ንቦች ማር ይሠራሉ?" }, answer: true },
        ],
      },
    },
    {
      id: "a2",
      title: { en: "Big and small", am: "ትልቅና ትንሽ" },
      goal: { en: "Tells big from small", am: "ትልቁን ከትንሹ ይለያል" },
      lessons: [{ kind: "demo", id: "tap-three", title: { en: "Tap three again", am: "እንደገና ሦስት ንኩ" } }],
      quiz: {
        id: "test-a2-quiz",
        questions: [
          { kind: "truefalse", prompt: { en: "Is an elephant big?", am: "ዝሆን ትልቅ ነው?" }, answer: true },
          { kind: "count", prompt: { en: "How many stones?", am: "ስንት ድንጋዮች?" }, pic: { art: "stone", count: 2 }, answer: 2, numerals: "both" },
        ],
      },
    },
  ],
  finalTest: {
    id: "test-a-final",
    questions: [
      { kind: "truefalse", prompt: { en: "Is three more than two?", am: "ሦስት ከሁለት ይበልጣል?" }, answer: true },
      { kind: "truefalse", prompt: { en: "Is a mouse bigger than a cow?", am: "አይጥ ከላም ይበልጣል?" }, answer: false },
    ],
  },
};

export const courseB: Course = {
  id: FIXTURE_B,
  title: { en: "Test Package B", am: "የሙከራ ጥቅል ለ" },
  tagline: { en: "A second package", am: "ሁለተኛ ጥቅል" },
  outcome: { en: "For the one-at-a-time test.", am: "ለአንድ በአንድ ሙከራ።" },
  ages: ["6-7"],
  color: "#D63B72",
  priceEtb: 1500,
  status: "live",
  levels: [
    {
      id: "b1",
      title: { en: "Only level", am: "ብቸኛው ደረጃ" },
      goal: { en: "Says yes", am: "አዎ ይላል" },
      lessons: [],
      quiz: { id: "test-b1-quiz", questions: [{ kind: "truefalse", prompt: { en: "Is grass green?", am: "ሣር አረንጓዴ ነው?" }, answer: true }] },
    },
  ],
  finalTest: { id: "test-b-final", questions: [{ kind: "truefalse", prompt: { en: "Is the sky blue?", am: "ሰማዩ ሰማያዊ ነው?" }, answer: true }] },
};

export const FIXTURE_COURSES: Course[] = [courseA, courseB];
export const FIXTURE_STORIES: Story[] = [fixtureStory];
