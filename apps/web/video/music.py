"""
Original music for Lali videos, made entirely in code (no samples, no loops from anywhere):
nothing for YouTube's Content ID to match, and every story can get its own variation.

A gentle 6/8 groove in the major tizita scale (the Ethiopian pentatonic: 1 2 3 5 6), with a
krar-like plucked lyre (Karplus-Strong strings), a soft kebero-like hand drum, a washint-like
flute melody that comes and goes, and a low drone. Also makes the intro sting and the page chime.

  python3 music.py OUT_DIR SECONDS [SEED]
writes OUT_DIR/music.wav (the bed, SECONDS long, fading out), sting.wav and chime.wav.
Needs numpy.
"""
import sys, wave
import numpy as np

SR = 44100
rng = np.random.default_rng(int(sys.argv[3]) if len(sys.argv) > 3 else 7)

ROOT = 146.83  # D3
TIZITA = [0, 2, 4, 7, 9]  # major tizita (pentatonic) in semitones

def note(degree, octave=0):
    """A tizita degree (any integer) to Hz, octaves wrapping."""
    o, d = divmod(degree, 5)
    return ROOT * 2 ** ((TIZITA[d] + 12 * (o + octave)) / 12)

def pluck(freq, dur, bright=0.5):
    """Karplus-Strong plucked string: a krar-ish tone."""
    n = int(SR * dur)
    period = max(2, int(SR / freq))
    buf = rng.uniform(-1, 1, period)
    # soften the excitation for a mellow, nylon-like pluck
    buf = np.convolve(buf, np.ones(3) / 3, mode="same")
    buf -= buf.mean()  # no DC: the string's average would otherwise never decay (a low rumble)
    out = np.empty(n)
    decay = 0.996 - 0.004 * (1 - bright)
    for i in range(n):
        out[i] = buf[i % period]
        buf[i % period] = decay * 0.5 * (buf[i % period] + buf[(i + 1) % period])
    env = np.minimum(1, np.arange(n) / (SR * 0.003))
    return out * env

def flute(freq, dur, vib=5.2):
    """A breathy washint-like flute: sine plus a touch of second harmonic, vibrato and breath."""
    t = np.arange(int(SR * dur)) / SR
    v = 1 + 0.006 * np.sin(2 * np.pi * vib * t) * np.minimum(1, t / 0.4)
    ph = 2 * np.pi * np.cumsum(freq * v) / SR
    tone = np.sin(ph) + 0.18 * np.sin(2 * ph) + 0.05 * np.sin(3 * ph)
    breath = np.convolve(rng.normal(0, 1, len(t)), np.ones(30) / 30, mode="same") * 0.08
    env = np.minimum(1, t / 0.08) * np.minimum(1, (dur - t) / 0.15)
    return (tone + breath) * np.clip(env, 0, 1)

def drum(low=True):
    """A kebero-like hand drum: low = the deep centre stroke, else a bright edge slap."""
    dur = 0.5 if low else 0.18
    t = np.arange(int(SR * dur)) / SR
    if low:
        f = 70 + 60 * np.exp(-t * 30)
        body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 7)
        return body * 0.9
    noise = np.convolve(rng.normal(0, 1, len(t)), [1, -0.6], mode="same")
    tone = np.sin(2 * np.pi * 330 * t)
    return (noise * 0.35 + tone * 0.4) * np.exp(-t * 28)

def add(buf, sig, at, gain=1.0):
    i = int(at * SR)
    if i >= len(buf):
        return
    j = min(len(buf), i + len(sig))
    buf[i:j] += sig[: j - i] * gain

def reverb(x, mix=0.22):
    """A small room: a few feedback delays (Schroeder-style), enough to soften."""
    out = x.copy()
    for d, g in [(0.0297, 0.5), (0.0371, 0.45), (0.0411, 0.42), (0.0437, 0.4)]:
        n = int(d * SR)
        y = np.zeros_like(x)
        y[n:] = x[:-n] * g
        for k in range(2, 6):
            if n * k < len(x):
                y[n * k:] += x[: -n * k] * g ** k
        out += y * mix
    return out

def highpass(x, hz):
    """A gentle one-pole high-pass, run twice: takes the rumble out from under the voice."""
    a = 1 / (1 + 2 * np.pi * hz / SR)
    for _ in range(2):
        y = np.empty_like(x)
        prev_x = prev_y = 0.0
        for i, v in enumerate(x):
            prev_y = a * (prev_y + v - prev_x)
            prev_x = v
            y[i] = prev_y
        x = y
    return x

def bed(seconds):
    bpm = 96.0  # dotted-quarter beats; 6 eighths per bar
    eighth = 60 / bpm / 3 * 1.0
    bar = eighth * 6
    n = int(SR * (seconds + 2))
    krar = np.zeros(n)
    drums = np.zeros(n)
    fl = np.zeros(n)
    drone = np.zeros(n)
    # Bass movement by four-bar phrases over the drone: I, vi-ish, V-ish, I (tizita degrees).
    roots = [0, 4, 3, 0, 0, 4, 2, 3]
    # A krar figure per bar (degrees above the bar's root), swung in 6/8.
    figures = [[0, 2, 4, 5, 4, 2], [0, 3, 5, 3, 4, 2], [5, 4, 2, 0, 2, 4]]
    # The flute's motif and its answer (degree, eighths), varied a little each time.
    motif = [(5, 2), (6, 1), (7, 3), (6, 2), (5, 1), (4, 3)]
    answer = [(4, 2), (5, 1), (6, 2), (5, 1), (4, 2), (2, 1), (0, 3)]
    bars = int(seconds / bar) + 1
    for b in range(bars):
        t0 = b * bar
        r = roots[(b // 2) % len(roots)]
        fig = figures[(b // 4) % len(figures)]
        for k, d in enumerate(fig):
            if b % 8 == 7 and k > 3:
                continue  # breathe at the end of each phrase
            add(krar, pluck(note(r + d, 1), 1.4, bright=0.6), t0 + k * eighth, 0.32 if k % 3 == 0 else 0.22)
        # kebero: deep on 1 and 4, slaps on the rest (a soft eskista-like lilt)
        add(drums, drum(True), t0, 0.4)
        add(drums, drum(True), t0 + 3 * eighth, 0.3)
        for k in (2, 5):
            add(drums, drum(False), t0 + k * eighth, 0.22)
        if rng.random() < 0.5:
            add(drums, drum(False), t0 + 4 * eighth, 0.12)
        # the drone changes with the phrase
        if b % 2 == 0:
            # each drone note overlaps the next by 0.6 s, so the level never dips between them
            length = bar * 2 + 0.6
            t = np.arange(int(SR * length)) / SR
            f = note(r, 0)
            s = (np.sin(2 * np.pi * f * t) + 0.25 * np.sin(4 * np.pi * f * t)) * np.minimum(1, t / 0.6) * np.clip((length - t) / 0.6, 0, 1)
            add(drone, s, t0, 0.05)
        # the flute sings in 8-bar sections, resting every other section
        section = b // 8
        if section % 2 == 1 and b % 8 in (0, 4):
            phrase = motif if b % 8 == 0 else answer
            at = t0
            shift = (section // 2) % 2  # second time round, a step higher
            for d, len8 in phrase:
                add(fl, flute(note(d + shift), len8 * eighth * 0.95), at, 0.20)
                at += len8 * eighth
    mix = reverb(krar) + drums * 0.8 + reverb(fl, 0.35) + drone
    mix = highpass(mix[: int(SR * seconds)], 70)
    fade_in = np.minimum(1, np.arange(len(mix)) / (SR * 1.5))
    fade_out = np.clip((len(mix) - np.arange(len(mix))) / (SR * 4), 0, 1)
    return mix * fade_in * fade_out

def sting():
    """The intro: a rising krar run and a drum, ending on a bright chord."""
    out = np.zeros(int(SR * 3.5))
    for k, d in enumerate([0, 1, 2, 3, 4, 5, 6, 7]):
        add(out, pluck(note(d, 1), 1.6, 0.8), k * 0.09, 0.35)
    for d in (5, 7, 9):
        add(out, pluck(note(d, 1), 2.6, 0.8), 0.8, 0.3)
    add(out, drum(True), 0.8, 0.7)
    add(out, flute(note(10), 1.8), 0.85, 0.18)
    return reverb(out, 0.3)

def chime():
    """A soft page-turn chime: two quick high plucks."""
    out = np.zeros(int(SR * 1.6))
    add(out, pluck(note(7, 1), 1.4, 0.9), 0, 0.35)
    add(out, pluck(note(9, 1), 1.4, 0.9), 0.09, 0.3)
    return reverb(out, 0.3)

def write(path, x, peak=0.8):
    x = x / (np.max(np.abs(x)) + 1e-9) * peak
    data = np.repeat((x * 32767).astype(np.int16)[:, None], 2, axis=1)
    with wave.open(path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(data.tobytes())

if __name__ == "__main__":
    out_dir, seconds = sys.argv[1], float(sys.argv[2])
    write(f"{out_dir}/music.wav", bed(seconds))
    write(f"{out_dir}/sting.wav", sting())
    write(f"{out_dir}/chime.wav", chime(), 0.5)
    print("ok")
