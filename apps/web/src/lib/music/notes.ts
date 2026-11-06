/*
  Melodies as note data.

  A part is written as a string of space-separated steps, each `pitch:beats`:

    "E4:1 E4:0.5 G4:1.5 r:1 C4+E4+G4:2"

  - pitch is a note name with an octave (C4 is middle C), with # or b: "F#4", "Bb3".
  - `r` is a rest. Join notes with + for a chord.
  - beats are counted in the tune's beat (usually a quarter note); a `|` between steps is
    ignored, so bar lines can be written in to keep long tunes readable.
  - An optional third field sets how loud the step is, from 0 to 1: "C5:1:0.6".
*/

const STEPS: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

/** The frequency of a note name such as "A4" (440 Hz) or "C#5". */
export function freq(name: string): number {
  const m = /^([A-G])(#|b)?(-?\d)$/.exec(name);
  if (!m) throw new Error(`Not a note: ${name}`);
  const semis = STEPS[m[1]] + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0) + (Number(m[3]) + 1) * 12;
  return 440 * Math.pow(2, (semis - 69) / 12);
}

export type Step = {
  /** Frequencies to play together; empty for a rest. */
  freqs: number[];
  /** Where the step starts, in beats from the start of the part. */
  at: number;
  beats: number;
  vel: number;
};

/** Reads a part written as "pitch:beats" steps (see the top of this file). */
export function parse(src: string): { steps: Step[]; length: number } {
  const steps: Step[] = [];
  let at = 0;
  for (const token of src.split(/\s+/)) {
    if (!token || token === "|") continue;
    const [pitch, beats, vel] = token.split(":");
    const b = Number(beats);
    if (!pitch || !(b > 0)) throw new Error(`Bad step: ${token}`);
    steps.push({
      freqs: pitch === "r" ? [] : pitch.split("+").map(freq),
      at,
      beats: b,
      vel: vel ? Number(vel) : 1,
    });
    at += b;
  }
  return { steps, length: at };
}
