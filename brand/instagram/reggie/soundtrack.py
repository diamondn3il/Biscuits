"""Synthesises the Reggie the Rich Tea soundtrack: a plucked tune plus sound effects timed to
reggie.html. Writes a 16-second 44.1 kHz mono WAV. Standard library only.

Usage: python soundtrack.py out.wav
"""
import math
import random
import struct
import sys
import wave

RATE = 44100
DURATION = 16.0
N = int(RATE * DURATION)
mix = [0.0] * N
rnd = random.Random(7)


def add(start, samples, gain=1.0):
    i0 = int(start * RATE)
    for i, v in enumerate(samples):
        if 0 <= i0 + i < N:
            mix[i0 + i] += v * gain


def env(i, n, attack=0.005, release=0.05):
    t, a, r = i / RATE, attack, release
    length = n / RATE
    return min(1.0, t / a if a else 1.0, (length - t) / r if r else 1.0)


def sweep(f0, f1, dur, wobble=0.0, wobble_rate=0.0, decay=0.0, shape="sine"):
    """A tone gliding from f0 to f1 (exponentially), with optional vibrato and decay."""
    n = int(dur * RATE)
    out, phase = [], 0.0
    for i in range(n):
        k = i / n
        f = f0 * (f1 / f0) ** k
        f *= 1 + wobble * math.sin(2 * math.pi * wobble_rate * i / RATE)
        phase += 2 * math.pi * f / RATE
        v = math.sin(phase)
        if shape == "brass":   # a few harmonics for a trombone-ish tone
            v = 0.6 * v + 0.3 * math.sin(2 * phase) + 0.15 * math.sin(3 * phase)
        amp = env(i, n, 0.01, 0.04) * (math.exp(-decay * i / RATE) if decay else 1)
        out.append(v * amp)
    return out


def noise(dur, decay=8.0, smooth=0.6):
    n = int(dur * RATE)
    out, last = [], 0.0
    for i in range(n):
        last = smooth * last + (1 - smooth) * rnd.uniform(-1, 1)
        out.append(last * math.exp(-decay * i / RATE) * env(i, n, 0.002, 0.03))
    return out


def pluck(freq, dur=0.6, bright=0.5):
    """Karplus-Strong plucked string, for a ukulele-ish tune."""
    period = max(2, int(RATE / freq))
    buf = [rnd.uniform(-1, 1) for _ in range(period)]
    n = int(dur * RATE)
    out = []
    for i in range(n):
        v = buf[i % period]
        nxt = buf[(i + 1) % period]
        buf[i % period] = 0.996 * (bright * v + (1 - bright) * nxt) if bright < 1 else 0.996 * (v + nxt) / 2
        out.append(v * env(i, n, 0.001, 0.08))
    return out


def note(name):
    names = {"C": -9, "D": -7, "E": -5, "F": -4, "G": -2, "A": 0, "B": 2}
    semis = names[name[0]] + (1 if "#" in name else 0) + 12 * (int(name[-1]) - 4)
    return 440 * 2 ** (semis / 12)


# ---------- the tune: a bouncy plucked loop, C - Am - F - G, 120 bpm ----------
BEAT = 0.5
chords = [["C4", "E4", "G4"], ["A3", "C4", "E4"], ["F3", "A3", "C4"], ["G3", "B3", "D4"]]
melody = ["E5", "G5", "C5", "G5", "E5", "A4", "C5", "E5", "F5", "A4", "C5", "A4", "D5", "B4", "G4", "B4"]
t, bar = 0.0, 0
while t < 13.9:                       # stop before the end-card chime
    ch = chords[bar % 4]
    for beat in range(4):
        tb = t + beat * BEAT
        if tb >= 13.9:
            break
        add(tb, pluck(note(ch[0]) / 2, 0.45, 0.5), 0.16)                  # bass
        for j, nn in enumerate(ch):                                         # strummed chord on the off-beat
            add(tb + BEAT / 2 + j * 0.012, pluck(note(nn), 0.35, 0.6), 0.07)
        add(tb, pluck(note(melody[(bar * 4 + beat) % 16]), 0.4, 0.7), 0.09)
    t += 4 * BEAT
    bar += 1

# Duck the tune under the dunk, so the countdown and plop carry.
for i in range(int(9.7 * RATE), int(11.5 * RATE)):
    mix[i] *= 0.35

# ---------- sound effects ----------
add(0.30, sweep(1400, 380, 0.34), 0.25)                                      # falls in
add(0.62, sweep(150, 300, 0.55, wobble=0.25, wobble_rate=22, decay=5), 0.5)  # boing on landing
for at in (1.6, 4.0, 7.0, 12.6):                                             # speech bubbles pop up
    add(at, sweep(520, 980, 0.07), 0.3)
add(6.3, noise(0.45, decay=5, smooth=0.85), 0.35)                            # teacup slides in
add(8.8, sweep(380, 1500, 0.55), 0.22)                                       # slide-whistle jump
add(9.76, sweep(240, 70, 0.22, decay=10), 0.7)                               # plop
add(9.76, noise(0.35, decay=12, smooth=0.3), 0.3)                            # splash
for at, f in ((9.85, 1000), (10.4, 1000), (10.95, 1250)):                    # countdown woodblock
    add(at, sweep(f, f * 0.9, 0.06, decay=40), 0.5)
add(11.42, noise(0.3, decay=12, smooth=0.3), 0.3)                            # splashes out
add(11.42, sweep(500, 1600, 0.45), 0.2)
add(12.3, sweep(120, 240, 0.35, wobble=0.3, wobble_rate=18, decay=7), 0.4)   # soggier boing home
for i, (f, d) in enumerate(((392, 0.28), (370, 0.28), (349, 0.28), (330, 0.7))):  # wah wah wah waaah
    add(12.75 + i * 0.3, sweep(f, f, d, wobble=0.02 if i == 3 else 0.0, wobble_rate=6, shape="brass"), 0.22)
for i, nn in enumerate(("C5", "E5", "G5", "C6")):                            # end-card chime
    add(14.0 + i * 0.12, sweep(note(nn), note(nn), 1.4, decay=3), 0.22)
    add(14.0 + i * 0.12, sweep(note(nn) * 2, note(nn) * 2, 0.9, decay=5), 0.06)

# ---------- write ----------
peak = max(abs(v) for v in mix) or 1.0
scale = 0.89 / peak
fade = int(0.4 * RATE)
with wave.open(sys.argv[1], "wb") as w:
    w.setnchannels(1)
    w.setsampwidth(2)
    w.setframerate(RATE)
    frames = bytearray()
    for i, v in enumerate(mix):
        if i > N - fade:
            v *= (N - i) / fade
        frames += struct.pack("<h", int(max(-1, min(1, v * scale)) * 32767))
    w.writeframes(bytes(frames))
print("peak", round(peak, 2))
