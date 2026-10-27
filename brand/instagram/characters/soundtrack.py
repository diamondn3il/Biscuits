"""Synthesises one episode's soundtrack: the plucked theme, transposed per character, plus the
sound effects engine.html lists in EPISODE_EVENTS. Standard library only.

Usage: python soundtrack.py events.json out.wav
       events.json is {"index": <cast index>, "events": [[seconds, "effect"], ...]}
"""
import json
import math
import random
import struct
import sys
import wave

RATE = 44100
DURATION = 16.0
N = int(RATE * DURATION)
spec = json.load(open(sys.argv[1]))
mix = [0.0] * N
rnd = random.Random(spec["index"] * 31 + 7)


def add(start, samples, gain=1.0):
    i0 = int(start * RATE)
    for i, v in enumerate(samples):
        if 0 <= i0 + i < N:
            mix[i0 + i] += v * gain


def env(i, n, attack=0.005, release=0.05):
    t, length = i / RATE, n / RATE
    return min(1.0, t / attack if attack else 1.0, (length - t) / release if release else 1.0)


def sweep(f0, f1, dur, wobble=0.0, wobble_rate=0.0, decay=0.0, shape="sine"):
    n = int(dur * RATE)
    out, phase = [], 0.0
    for i in range(n):
        k = i / n
        f = f0 * (f1 / f0) ** k * (1 + wobble * math.sin(2 * math.pi * wobble_rate * i / RATE))
        phase += 2 * math.pi * f / RATE
        v = math.sin(phase)
        if shape == "brass":
            v = 0.6 * v + 0.3 * math.sin(2 * phase) + 0.15 * math.sin(3 * phase)
        if shape == "square":
            v = 0.5 * math.copysign(1, v) + 0.5 * v
        out.append(v * env(i, n, 0.01, 0.04) * (math.exp(-decay * i / RATE) if decay else 1))
    return out


def noise(dur, decay=8.0, smooth=0.6):
    n = int(dur * RATE)
    out, last = [], 0.0
    for i in range(n):
        last = smooth * last + (1 - smooth) * rnd.uniform(-1, 1)
        out.append(last * math.exp(-decay * i / RATE) * env(i, n, 0.002, 0.03))
    return out


def pluck(freq, dur=0.6, bright=0.5):
    period = max(2, int(RATE / freq))
    buf = [rnd.uniform(-1, 1) for _ in range(period)]
    n = int(dur * RATE)
    out = []
    for i in range(n):
        v, nxt = buf[i % period], buf[(i + 1) % period]
        buf[i % period] = 0.996 * (bright * v + (1 - bright) * nxt)
        out.append(v * env(i, n, 0.001, 0.08))
    return out


SEMIS = {"C": -9, "D": -7, "E": -5, "F": -4, "G": -2, "A": 0, "B": 2}
TRANSPOSE = [0, 2, -3, 5, -2, 3, -5, 4][spec["index"] % 8]


def note(name, transpose=0):
    s = SEMIS[name[0]] + (1 if "#" in name else 0) + 12 * (int(name[-1]) - 4) + transpose
    return 440 * 2 ** (s / 12)


# ---------- theme: C - Am - F - G at 120 bpm, in this character's key ----------
BEAT = 0.5
chords = [["C4", "E4", "G4"], ["A3", "C4", "E4"], ["F3", "A3", "C4"], ["G3", "B3", "D4"]]
melody = ["E5", "G5", "C5", "G5", "E5", "A4", "C5", "E5", "F5", "A4", "C5", "A4", "D5", "B4", "G4", "B4"]
t, bar = 0.0, 0
while t < 13.9:
    ch = chords[bar % 4]
    for beat in range(4):
        tb = t + beat * BEAT
        if tb >= 13.9:
            break
        add(tb, pluck(note(ch[0], TRANSPOSE) / 2, 0.45, 0.5), 0.16)
        for j, nn in enumerate(ch):
            add(tb + BEAT / 2 + j * 0.012, pluck(note(nn, TRANSPOSE), 0.35, 0.6), 0.07)
        add(tb, pluck(note(melody[(bar * 4 + beat) % 16], TRANSPOSE), 0.4, 0.7), 0.09)
    t += 4 * BEAT
    bar += 1

# duck the theme under the big moment so the effects carry
names = [e[1] for e in spec["events"]]
duck = (9.7, 11.5) if "plop" in names else (9.0, 10.2) if any(n in names for n in ("stamp", "party", "shrink", "nope")) else None
if duck:
    for i in range(int(duck[0] * RATE), int(duck[1] * RATE)):
        mix[i] *= 0.4


# ---------- the effects library ----------
def fx(at, name):
    if name == "fall": add(at, sweep(1400, 380, 0.34), 0.25)
    elif name == "boing": add(at, sweep(150, 300, 0.55, wobble=0.25, wobble_rate=22, decay=5), 0.5)
    elif name == "boingSoft": add(at, sweep(120, 240, 0.35, wobble=0.3, wobble_rate=18, decay=7), 0.4)
    elif name == "pop": add(at, sweep(520, 980, 0.07), 0.3)
    elif name == "shiver":
        for k in range(6): add(at + k * 0.09, sweep(900, 820, 0.05), 0.08)
    elif name == "slide": add(at, noise(0.45, decay=5, smooth=0.85), 0.35)
    elif name == "squeak": add(at, sweep(1200, 1900, 0.12), 0.18)
    elif name == "skid":
        add(at, noise(0.3, decay=6, smooth=0.5), 0.25)
        add(at, sweep(700, 300, 0.3), 0.15)
    elif name == "nope":
        add(at, sweep(620, 620, 0.16, shape="square"), 0.16)
        add(at + 0.2, sweep(415, 410, 0.3, shape="square"), 0.16)
    elif name == "jump": add(at, sweep(380, 1500, 0.55), 0.22)
    elif name == "plop":
        add(at, sweep(240, 70, 0.22, decay=10), 0.7)
        add(at, noise(0.35, decay=12, smooth=0.3), 0.3)
    elif name in ("tick", "tickHigh"):
        f = 1250 if name == "tickHigh" else 1000
        add(at, sweep(f, f * 0.9, 0.06, decay=40), 0.5)
    elif name == "out":
        add(at, noise(0.3, decay=12, smooth=0.3), 0.3)
        add(at, sweep(500, 1600, 0.45), 0.2)
    elif name == "sad":
        for k, (f, d) in enumerate(((392, 0.28), (370, 0.28), (349, 0.28), (330, 0.7))):
            add(at + k * 0.3, sweep(f, f, d, wobble=0.02 if k == 3 else 0.0, wobble_rate=6, shape="brass"), 0.22)
    elif name == "fanfare":
        for k, nn in enumerate(("C5", "E5", "G5")):
            add(at + k * 0.12, sweep(note(nn, TRANSPOSE), note(nn, TRANSPOSE), 0.16, shape="brass"), 0.2)
        add(at + 0.36, sweep(note("C6", TRANSPOSE), note("C6", TRANSPOSE), 0.6, wobble=0.01, wobble_rate=6, shape="brass", decay=1.5), 0.22)
    elif name == "stamp":
        add(at, sweep(110, 50, 0.3, decay=9), 0.9)
        add(at, noise(0.18, decay=18, smooth=0.2), 0.35)
    elif name == "moo": add(at, sweep(190, 135, 1.1, wobble=0.03, wobble_rate=5, shape="brass", decay=0.8), 0.32)
    elif name == "rimshot":
        add(at, noise(0.12, decay=30, smooth=0.1), 0.4)
        add(at + 0.16, noise(0.12, decay=30, smooth=0.1), 0.4)
        add(at + 0.16, sweep(90, 50, 0.2, decay=12), 0.6)
        add(at + 0.38, noise(0.9, decay=4, smooth=0.02), 0.22)
    elif name == "party":
        for k in range(5): add(at + k * 0.07, noise(0.08, decay=40, smooth=0.1), 0.35)
        add(at + 0.05, sweep(900, 1800, 0.4, wobble=0.05, wobble_rate=30), 0.15)
        for k, nn in enumerate(("C5", "E5", "G5", "C6")):
            add(at + 0.3 + k * 0.1, sweep(note(nn, TRANSPOSE), note(nn, TRANSPOSE), 0.5, decay=4), 0.16)
    elif name == "shrink": add(at, sweep(1200, 180, 0.6), 0.25)
    elif name == "grow":
        add(at, sweep(180, 900, 0.45), 0.25)
        add(at + 0.4, sweep(150, 300, 0.45, wobble=0.25, wobble_rate=22, decay=6), 0.35)
    elif name == "chime":
        for k, nn in enumerate(("C5", "E5", "G5", "C6")):
            add(at + k * 0.12, sweep(note(nn), note(nn), 1.4, decay=3), 0.22)
            add(at + k * 0.12, sweep(note(nn) * 2, note(nn) * 2, 0.9, decay=5), 0.06)
    else:
        raise SystemExit(f"unknown sound effect {name!r}")


for at, name in spec["events"]:
    fx(at, name)

peak = max(abs(v) for v in mix) or 1.0
scale = 0.89 / peak
fade = int(0.4 * RATE)
with wave.open(sys.argv[2], "wb") as w:
    w.setnchannels(1)
    w.setsampwidth(2)
    w.setframerate(RATE)
    frames = bytearray()
    for i, v in enumerate(mix):
        if i > N - fade:
            v *= (N - i) / fade
        frames += struct.pack("<h", int(max(-1, min(1, v * scale)) * 32767))
    w.writeframes(bytes(frames))
