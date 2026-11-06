import type { Voice } from "./voices";

/*
  The home page's music: public-domain classical melodies arranged for children,
  plus one original Ethiopian-flavoured tune. Every part is note data (see notes.ts),
  played by the synth in synth.ts, so there are no recordings and no recording rights.

  To add a tune, add an entry to TUNES: a title in both languages, who wrote it, a tempo,
  and one or more parts. Parts loop together, so give them all the same total length
  (the synth warns in development when they differ).
*/

export type Part = {
  voice: Voice;
  notes: string;
  /** Loudness of the whole part, 0 to 1. */
  gain?: number;
};

export type Tune = {
  id: string;
  title: { en: string; am: string };
  by: { en: string; am: string };
  /** Beats (quarter notes) per minute. */
  bpm: number;
  parts: Part[];
};

/* ---------- small helpers for accompaniment ---------- */

// Close chords, kept below the tunes so the melody stays on top.
const CHORDS: Record<string, [string, string, string]> = {
  C: ["C4", "E4", "G4"],
  F: ["C4", "F4", "A4"],
  G: ["B3", "D4", "G4"],
  G7: ["B3", "F4", "G4"],
  Am: ["C4", "E4", "A4"],
  Dm: ["D4", "F4", "A4"],
  E: ["B3", "E4", "G#4"],
};
const ROOTS: Record<string, string> = { C: "C3", F: "F2", G: "G2", G7: "G2", Am: "A2", Dm: "D3", E: "E2" };

const list = (chords: string) => chords.split(/\s+/).filter(Boolean);

/** Mozart's favourite accompaniment: low, high, middle, high, in eighths. Two beats a chord. */
function alberti(chords: string, vel = 0.45) {
  return list(chords)
    .map((c) => {
      const [lo, mid, hi] = CHORDS[c];
      return `${lo}:0.5:${vel} ${hi}:0.5:${vel} ${mid}:0.5:${vel} ${hi}:0.5:${vel}`;
    })
    .join(" ");
}

/** One low note per chord, `beats` long. */
function roots(chords: string, beats: number, vel = 0.7) {
  return list(chords)
    .map((c) => `${ROOTS[c]}:${beats}:${vel}`)
    .join(" ");
}

/** A soft chord on the second beat of every two, like a gentle "pah". */
function offbeats(chords: string, vel = 0.32) {
  return list(chords)
    .map((c) => {
      const [, mid, hi] = CHORDS[c];
      return `r:1 ${mid}+${hi}:1:${vel}`;
    })
    .join(" ");
}

/** A waltz's "pah pah" on beats two and three of each bar. */
function waltz(chords: string, vel = 0.3) {
  return list(chords)
    .map((c) => {
      const [, mid, hi] = CHORDS[c];
      return `r:1 ${mid}+${hi}:1:${vel} ${mid}+${hi}:1:${vel * 0.85}`;
    })
    .join(" ");
}

/** Water: a chord rippling up two octaves and back down, in sixteenths. One bar a chord. */
function ripple(chords: string, vel = 0.3) {
  const up = (c: string) => {
    const [a, b, d] = CHORDS[c].map((n) => [n.slice(0, -1), Number(n.slice(-1))] as const);
    const notes: string[] = [];
    for (let o = 0; notes.length < 8; o++) for (const [name, oct] of [a, b, d]) if (notes.length < 8) notes.push(`${name}${oct + o}`);
    return notes;
  };
  return list(chords)
    .map((c) => {
      const notes = up(c);
      const wave = [...notes, ...notes.slice().reverse()];
      return wave.map((n, i) => `${n}:0.25:${(vel * (0.7 + 0.3 * Math.sin((i / 16) * Math.PI))).toFixed(2)}`).join(" ");
    })
    .join(" ");
}

/* ---------- the tunes ---------- */

// "Ah vous dirai-je, Maman" (Twinkle Twinkle), the theme Mozart wrote twelve variations on.
const TWINKLE_CHORDS = "C C F C F C G C  C F C G C F C G  C C F C F C G C";

// Beethoven, Symphony No. 9: the "Ode to Joy" tune.
const ODE_A = "E5:1 E5:1 F5:1 G5:1 | G5:1 F5:1 E5:1 D5:1 | C5:1 C5:1 D5:1 E5:1";
const ODE_CHORDS = "C C G C C C C G  C C G C C C G C  G C G C G G C G  C C G C C C G C";

// Brahms, Wiegenlied Op. 49 No. 4, in 3/4 with a two-eighth pick-up.
const LULLABY_BARS = "C C F G G G G C F C F C F C G";

export const TUNES: Tune[] = [
  {
    id: "twinkle",
    title: { en: "Twinkle, Twinkle", am: "ብልጭ ብልጭ ትንሽ ኮከብ" },
    by: { en: "Mozart", am: "ሞዛርት" },
    bpm: 100,
    parts: [
      {
        voice: "musicBox",
        gain: 0.9,
        notes: [
          "C5:1 C5:1 G5:1 G5:1 | A5:1 A5:1 G5:2 | F5:1 F5:1 E5:1 E5:1 | D5:1 D5:1 C5:2",
          "G5:1 G5:1 F5:1 F5:1 | E5:1 E5:1 D5:2 | G5:1 G5:1 F5:1 F5:1 | E5:1 E5:1 D5:2",
          "C5:1 C5:1 G5:1 G5:1 | A5:1 A5:1 G5:2 | F5:1 F5:1 E5:1 E5:1 | D5:1 D5:1 C5:2",
        ].join(" "),
      },
      { voice: "celesta", gain: 0.5, notes: alberti(TWINKLE_CHORDS) },
      { voice: "marimba", gain: 0.55, notes: roots(TWINKLE_CHORDS, 2) },
    ],
  },
  {
    id: "ode-to-joy",
    title: { en: "Ode to Joy", am: "የደስታ መዝሙር" },
    by: { en: "Beethoven", am: "ቤትሆቨን" },
    bpm: 112,
    parts: [
      {
        voice: "marimba",
        gain: 0.95,
        notes: [
          `${ODE_A} | E5:1.5 D5:0.5 D5:2`,
          `${ODE_A} | D5:1.5 C5:0.5 C5:2`,
          "D5:1 D5:1 E5:1 C5:1 | D5:1 E5:0.5 F5:0.5 E5:1 C5:1 | D5:1 E5:0.5 F5:0.5 E5:1 D5:1 | C5:1 D5:1 G4:2",
          `${ODE_A} | D5:1.5 C5:0.5 C5:2`,
        ].join(" "),
      },
      { voice: "celesta", gain: 0.55, notes: offbeats(ODE_CHORDS) },
      { voice: "pad", gain: 0.5, notes: roots(ODE_CHORDS, 2, 0.6) },
    ],
  },
  {
    id: "aquarium",
    title: { en: "The Aquarium", am: "የዓሣ ገንዳ" },
    by: { en: "after Saint-Saëns", am: "ከሳን-ሳንስ የተወሰደ" },
    bpm: 76,
    parts: [
      // A simplified arrangement in the spirit of the Aquarium from The Carnival of the Animals:
      // rippling A-minor arpeggios under a floating glass line. Not a note-for-note transcription.
      {
        voice: "glass",
        gain: 0.7,
        notes: "E5:2 D5:1 C5:1 | B4:1 C5:1 A4:2 | C5:2 A4:1 F5:1 | E5:3 r:1 | A5:2 G5:1 E5:1 | F5:2 D5:1 A4:1 | B4:1 G#4:1 B4:1 D5:1 | C5:2 A4:2",
      },
      { voice: "celesta", gain: 0.5, notes: ripple("Am Am F E Am Dm E Am") },
      { voice: "pad", gain: 0.45, notes: roots("Am Am F E Am Dm E Am", 4, 0.55) },
    ],
  },
  {
    id: "tizita",
    title: { en: "Lali's Tizita", am: "የላሊ ትዝታ" },
    by: { en: "an original tune in the tizita scale", am: "በትዝታ ቅኝት የተሰራ አዲስ ዜማ" },
    bpm: 84,
    parts: [
      // An original melody (not a copy of any song) in the tizita major scale, C D E G A,
      // with the rocking six-beat feel of much Ethiopian music: two pulses a bar, each split in three.
      {
        voice: "krar",
        gain: 0.9,
        notes: [
          "E5:1 D5:0.5 C5:1 A4:0.5 | G4:1.5 A4:1.5 | C5:1 D5:0.5 E5:1 G5:0.5 | E5:3",
          "D5:1 E5:0.5 D5:1 C5:0.5 | A4:1 G4:0.5 A4:1.5 | C5:1 A4:0.5 G4:1 E4:0.5 | G4:3",
          "A4:1 C5:0.5 D5:1 E5:0.5 | G5:1.5 E5:1.5 | D5:1 C5:0.5 D5:1 E5:0.5 | C5:1.5 A4:1.5",
          "G4:1 A4:0.5 C5:1 D5:0.5 | E5:1 D5:0.5 C5:1 A4:0.5 | C5:1.5 D5:1.5 | C5:3",
        ].join(" "),
      },
      {
        voice: "marimba",
        gain: 0.5,
        notes: Array.from({ length: 16 }, (_, i) => ([1, 5, 11].includes(i) ? "A2:1.5:0.6 E3:1.5:0.45" : "C3:1.5:0.6 G3:1.5:0.45")).join(" "),
      },
      { voice: "drum", gain: 0.55, notes: Array.from({ length: 16 }, () => "C2:1:0.9 C3:0.5:0.35 C2:1:0.6 C3:0.5:0.4").join(" ") },
    ],
  },
  {
    id: "lullaby",
    title: { en: "Lullaby", am: "የእንቅልፍ ዜማ" },
    by: { en: "Brahms", am: "ብራምስ" },
    bpm: 66,
    parts: [
      {
        voice: "celesta",
        gain: 0.95,
        notes: [
          "E5:0.5 E5:0.5 | G5:2 E5:0.5 E5:0.5 | G5:2 E5:0.5 G5:0.5 | C6:1 B5:1.5 A5:0.5 | A5:1 G5:1 D5:0.5 E5:0.5",
          "F5:1 D5:1 D5:0.5 E5:0.5 | F5:2 D5:0.5 F5:0.5 | B5:0.5 A5:0.5 G5:1 B5:1 | C6:2 C5:0.5 C5:0.5",
          "C6:2 A5:0.5 F5:0.5 | G5:2 E5:0.5 C5:0.5 | F5:1 G5:1 A5:1 | G5:2 C5:0.5 C5:0.5",
          "C6:2 A5:0.5 F5:0.5 | G5:2 E5:0.5 C5:0.5 | F5:1 E5:1 D5:1 | C5:2",
        ].join(" "),
      },
      { voice: "musicBox", gain: 0.45, notes: `r:1 ${waltz(LULLABY_BARS)} C4+E4:2:0.3` },
      { voice: "marimba", gain: 0.45, notes: `r:1 ${roots(LULLABY_BARS, 3, 0.6)} C3:2:0.6` },
    ],
  },
];
