/*
  The instruments, built from a few oscillators each so they stay light on small phones.
  Each voice plays one note: it starts at `t`, lasts about `dur` seconds, and sends its
  sound to `out`. Loudness `vel` is 0 to 1.
*/

export type Voice = "celesta" | "musicBox" | "marimba" | "glass" | "krar" | "pad" | "drum";

type Play = (ac: BaseAudioContext, out: AudioNode, f: number, t: number, dur: number, vel: number) => void;

/** A sine (or other wave) partial with a quick attack and an exponential fade. */
function partial(ac: BaseAudioContext, out: AudioNode, f: number, t: number, peak: number, attack: number, decay: number, type: OscillatorType = "sine") {
  const o = ac.createOscillator();
  const g = ac.createGain();
  o.type = type;
  o.frequency.setValueAtTime(f, t);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  o.connect(g).connect(out);
  o.start(t);
  o.stop(t + attack + decay + 0.05);
}

const VOICES: Record<Voice, Play> = {
  // A soft bell: the note, a quiet octave, and a fourth partial that fades fast.
  celesta(ac, out, f, t, dur, vel) {
    const ring = Math.min(2.4, 0.9 + dur * 0.8);
    partial(ac, out, f, t, 0.22 * vel, 0.006, ring);
    partial(ac, out, f * 2, t, 0.05 * vel, 0.004, ring * 0.5);
    partial(ac, out, f * 4.01, t, 0.035 * vel, 0.003, 0.25);
  },
  // A music box's steel comb: a clear tine with a tiny metallic ping on top.
  musicBox(ac, out, f, t, _dur, vel) {
    partial(ac, out, f, t, 0.2 * vel, 0.003, 1.5);
    partial(ac, out, f * 3.0, t, 0.035 * vel, 0.002, 0.35);
    partial(ac, out, f * 6.27, t, 0.025 * vel, 0.001, 0.12);
  },
  // Wooden bars: a round, short note with the marimba's bright fourth harmonic at the strike.
  marimba(ac, out, f, t, dur, vel) {
    partial(ac, out, f, t, 0.26 * vel, 0.004, Math.min(1.1, 0.35 + dur * 0.35));
    partial(ac, out, f * 4, t, 0.06 * vel, 0.002, 0.09);
    partial(ac, out, f * 10, t, 0.012 * vel, 0.001, 0.03);
  },
  // A glass harmonica: a slow swell and a gentle shimmer.
  glass(ac, out, f, t, dur, vel) {
    const o = ac.createOscillator();
    const o2 = ac.createOscillator();
    const lfo = ac.createOscillator();
    const depth = ac.createGain();
    const g = ac.createGain();
    o.frequency.setValueAtTime(f, t);
    o2.frequency.setValueAtTime(f * 2.002, t);
    lfo.frequency.setValueAtTime(5, t);
    depth.gain.setValueAtTime(f * 0.004, t);
    lfo.connect(depth);
    depth.connect(o.frequency);
    depth.connect(o2.frequency);
    const g2 = ac.createGain();
    g2.gain.value = 0.18;
    const end = t + Math.max(0.3, dur);
    const peak = 0.16 * vel;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + 0.12);
    g.gain.setTargetAtTime(peak * 0.7, t + 0.12, 0.4);
    g.gain.setTargetAtTime(0.0001, end, 0.25);
    o.connect(g);
    o2.connect(g2).connect(g);
    g.connect(out);
    for (const x of [o, o2, lfo]) {
      x.start(t);
      x.stop(end + 1.4);
    }
  },
  // A plucked string, a little like the krar: a bright twang that softens as it rings.
  krar(ac, out, f, t, _dur, vel) {
    const o = ac.createOscillator();
    const lp = ac.createBiquadFilter();
    const g = ac.createGain();
    o.type = "triangle";
    o.frequency.setValueAtTime(f * 1.01, t);
    o.frequency.exponentialRampToValueAtTime(f, t + 0.04);
    lp.type = "lowpass";
    lp.Q.value = 2;
    lp.frequency.setValueAtTime(f * 6, t);
    lp.frequency.exponentialRampToValueAtTime(f * 1.5, t + 0.35);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.3 * vel, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
    o.connect(lp).connect(g).connect(out);
    o.start(t);
    o.stop(t + 1.15);
    partial(ac, out, f * 2, t, 0.03 * vel, 0.002, 0.4);
  },
  // A soft, warm bass under everything.
  pad(ac, out, f, t, dur, vel) {
    const o = ac.createOscillator();
    const lp = ac.createBiquadFilter();
    const g = ac.createGain();
    o.type = "triangle";
    o.frequency.setValueAtTime(f, t);
    lp.type = "lowpass";
    lp.frequency.value = 500;
    const end = t + Math.max(0.2, dur * 0.92);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.2 * vel, t + 0.06);
    g.gain.setTargetAtTime(0.0001, end, 0.18);
    o.connect(lp).connect(g).connect(out);
    o.start(t);
    o.stop(end + 1);
  },
  // A soft hand drum, like a kebero heard from the next room. Low notes thump, high notes tap.
  drum(ac, out, f, t, _dur, vel) {
    const low = f < 100;
    const o = ac.createOscillator();
    const g = ac.createGain();
    const start = low ? 150 : 330;
    o.frequency.setValueAtTime(start, t);
    o.frequency.exponentialRampToValueAtTime(low ? 58 : 190, t + (low ? 0.12 : 0.05));
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime((low ? 0.42 : 0.16) * vel, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + (low ? 0.32 : 0.12));
    o.connect(g).connect(out);
    o.start(t);
    o.stop(t + 0.4);
  },
};

export function playNote(voice: Voice, ac: BaseAudioContext, out: AudioNode, f: number, t: number, dur: number, vel: number) {
  VOICES[voice](ac, out, f, t, dur, vel);
}
