"""Generates The Biscuit Tin logo files as SVG.

Usage: make_logo.py <fredoka-bold.woff2> <nunito-bold.woff2> <out-dir>
Lettering is converted to outlines so the SVGs need no fonts installed.
"""
import math
import pathlib
import random
import sys

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

FREDOKA, NUNITO, OUT = TTFont(sys.argv[1]), TTFont(sys.argv[2]), pathlib.Path(sys.argv[3])
OUT.mkdir(parents=True, exist_ok=True)

CHOC = "#3b1f14"
JAM = "#d92f63"
JAM_DARK = "#a8204b"
JAM_LIGHT = "#ec5585"
CUSTARD = "#ffc94a"
CREAM = "#fff6e0"
PINK_BG = "#fff0f4"
PINK_SHADOW = "#ffc9d9"
MUTED = "#6e4a3c"


def text_path(font, text, size, x, y):
    """Outlines `text` with its baseline at (x, y). Returns (path data, advance width)."""
    glyphs, cmap = font.getGlyphSet(), font.getBestCmap()
    scale = size / font["head"].unitsPerEm
    d, cursor = [], 0.0
    for ch in text:
        name = cmap[ord(ch)]
        pen = SVGPathPen(glyphs)
        glyphs[name].draw(TransformPen(pen, (scale, 0, 0, -scale, x + cursor, y)))
        d.append(pen.getCommands())
        cursor += font["hmtx"][name][0] * scale
    return " ".join(d), cursor


def width(font, text, size):
    return text_path(font, text, size, 0, 0)[1]


def wordmark(x, y, size):
    """'The Biscuit' in chocolate with a pink clay shadow, 'Tin' in raspberry with a chocolate shadow."""
    drop = size * 0.07
    first, w1 = text_path(FREDOKA, "The Biscuit ", size, x, y)
    first_s, _ = text_path(FREDOKA, "The Biscuit ", size, x, y + drop)
    tin, w2 = text_path(FREDOKA, "Tin", size, x + w1, y)
    tin_s, _ = text_path(FREDOKA, "Tin", size, x + w1, y + drop)
    svg = (
        f'<path d="{first_s}" fill="{PINK_SHADOW}"/><path d="{first}" fill="{CHOC}"/>'
        f'<g transform="rotate(-4 {x + w1 + w2 / 2:.1f} {y - size * 0.35:.1f})">'
        f'<path d="{tin_s}" fill="{CHOC}"/><path d="{tin}" fill="{JAM}"/></g>'
    )
    return svg, w1 + w2


def fluted(cx, cy, r, n, a):
    pts = []
    for i in range(181):
        t = i / 180 * math.tau
        rr = r + a * math.cos(n * t)
        pts.append(f"{cx + rr * math.cos(t):.1f} {cy + rr * math.sin(t):.1f}")
    return "M" + " L".join(pts) + "Z"


def rim_y(x, cy, rx=160, ry=44):
    """y of the front (lower) half of an ellipse at a given x."""
    return cy + ry * math.sqrt(max(0.0, 1 - ((x - 256) / rx) ** 2))


def tin(uid="t"):
    """The biscuit tin, drawn in a 512 x 512 box: a round drum with its lid tipped open."""
    dots = "".join(
        f'<circle cx="{x}" cy="{rim_y(x, 322):.1f}" r="7" fill="{CREAM}" stroke="none"/>'
        for x in range(124, 400, 36)
    )
    digestive_dots = "".join(
        f'<circle cx="{250 + dx}" cy="{214 + dy}" r="4" fill="#8a5a2b" stroke="none"/>'
        for dx, dy in [(-26, -24), (0, -30), (26, -24), (-30, 2), (30, 2), (-14, -2), (14, -2)]
    )
    heart = "M0 15 C-30 -3 -20 -22 0 -9 C20 -22 30 -3 0 15Z"
    return f"""
  <defs>
    <linearGradient id="{uid}-body" x1="0" x2="1">
      <stop offset="0" stop-color="{JAM_LIGHT}"/><stop offset=".55" stop-color="{JAM}"/><stop offset="1" stop-color="{JAM_DARK}"/>
    </linearGradient>
    <linearGradient id="{uid}-band" x1="0" x2="1">
      <stop offset="0" stop-color="#ffd97a"/><stop offset=".6" stop-color="{CUSTARD}"/><stop offset="1" stop-color="#e9a92a"/>
    </linearGradient>
  </defs>
  <ellipse cx="262" cy="428" rx="176" ry="38" fill="{CHOC}" opacity=".18"/>
  <g stroke="{CHOC}" stroke-width="14" stroke-linejoin="round" stroke-linecap="round">
    <ellipse cx="256" cy="250" rx="160" ry="44" fill="#5a1830"/>
    <circle cx="250" cy="214" r="62" fill="#c98e4a"/>
    {digestive_dots}
    <g transform="rotate(-14 170 224)"><path d="{fluted(170, 224, 54, 14, 3.5)}" fill="#e2a85b"/>
    <path d="M170 244 C140 224 148 200 170 213 C192 200 200 224 170 244Z" fill="#c8102e" stroke-width="8"/></g>
    <path d="M96 250 A160 44 0 0 0 416 250 L416 404 A160 44 0 0 1 96 404 Z" fill="url(#{uid}-body)"/>
    <path d="M96 300 A160 44 0 0 0 416 300 L416 344 A160 44 0 0 1 96 344 Z" fill="url(#{uid}-band)" stroke-width="10"/>
    {dots}
    <path d="M130 276 L130 290 M130 360 L130 388" stroke="#ffffff" stroke-width="14" opacity=".45"/>
    <g transform="translate(270 160) rotate(22)">
      <path d="M-172 0 A172 46 0 0 0 172 0 L172 30 A172 46 0 0 1 -172 30 Z" fill="{JAM_DARK}"/>
      <ellipse cx="0" cy="0" rx="172" ry="46" fill="url(#{uid}-body)"/>
      <ellipse cx="0" cy="0" rx="126" ry="31" fill="none" stroke="{CUSTARD}" stroke-width="10"/>
      <path d="{heart}" fill="{CREAM}" stroke-width="8"/>
      <ellipse cx="-96" cy="-16" rx="30" ry="7" fill="#ffffff" stroke="none" opacity=".45"/>
    </g>
  </g>"""


def sprinkles(w, h, n, seed=7, opacity=0.6):
    rnd = random.Random(seed)
    colours = ["#ff7aa2", CUSTARD, "#9ad7f5", "#8ee0b8", "#c9a7ff"]
    out = []
    for i in range(n):
        x, y, a = rnd.uniform(0, w), rnd.uniform(0, h), rnd.uniform(0, 180)
        out.append(
            f'<rect x="{x - 14:.0f}" y="{y - 5:.0f}" width="28" height="10" rx="5" fill="{colours[i % 5]}" '
            f'transform="rotate({a:.0f} {x:.0f} {y:.0f})"/>'
        )
    return f'<g opacity="{opacity}">{"".join(out)}</g>'


def svg(w, h, body, title):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img" aria-label="{title}">'
        f"<title>{title}</title>{body}</svg>\n"
    )


def write(name, content):
    (OUT / name).write_text(content)


# 1. The mark on its own, transparent: favicon and anywhere the tin sits on a page.
write("logo-mark.svg", svg(512, 512, tin("m"), "The Biscuit Tin"))

# 2. Badge: the tin on a sprinkled pink tile, for profile pictures and app icons.
#    Content stays inside the central circle so circular crops don't clip it.
badge_body = (
    f'<rect width="512" height="512" rx="112" fill="{PINK_BG}"/>'
    + sprinkles(512, 512, 26, seed=3)
    + f'<g transform="translate(46 50) scale(.82)">{tin("b")}</g>'
)
write("logo-badge.svg", svg(512, 512, badge_body, "The Biscuit Tin"))
write("logo-badge-square.svg", svg(512, 512, badge_body.replace('rx="112" ', ""), "The Biscuit Tin"))

# 3. Horizontal lock-up: tin beside the name, for headers and banners.
size = 150
wm, wm_w = wordmark(0, 0, size)
hw = 520 + wm_w + 40
write(
    "logo-horizontal.svg",
    svg(round(hw), 512, f'<g>{tin("h")}</g><g transform="translate(520 318)">{wm}</g>', "The Biscuit Tin"),
)

# 4. Stacked post (1080 x 1080): tin above the name, for square social posts.
size = 132
wm, wm_w = wordmark(0, 0, size)
tag = "A field guide to British biscuits"
tag_size = 50
tag_d, tag_w = text_path(NUNITO, tag, tag_size, (1080 - width(NUNITO, tag, tag_size)) / 2, 930)
stacked = (
    f'<rect width="1080" height="1080" fill="{PINK_BG}"/>'
    + sprinkles(1080, 1080, 60, seed=11)
    + f'<g transform="translate(220 90) scale(1.25)">{tin("s")}</g>'
    + f'<g transform="translate({(1080 - wm_w) / 2:.1f} 820)">{wm}</g>'
    + f'<path d="{tag_d}" fill="{MUTED}"/>'
)
write("social-square.svg", svg(1080, 1080, stacked, "The Biscuit Tin"))

# 5. Link preview card (1200 x 630) for og:image / Twitter cards.
TX = 500
size = (1200 - TX - 56) / width(FREDOKA, "The Biscuit Tin", 1)
wm, wm_w = wordmark(0, 0, size)
og_tag_d, _ = text_path(NUNITO, tag, 38, TX, 378)
sub = "History, recipes and dunk tests for 26 biscuits"
sub_d, _ = text_path(NUNITO, sub, 27, TX, 430)
og = (
    f'<rect width="1200" height="630" fill="{PINK_BG}"/>'
    + sprinkles(1200, 630, 44, seed=5)
    + f'<g transform="translate(20 86) scale(.9)">{tin("o")}</g>'
    + f'<g transform="translate({TX} 290)">{wm}</g>'
    + f'<path d="{og_tag_d}" fill="{CHOC}"/>'
    + f'<path d="{sub_d}" fill="{MUTED}"/>'
)
write("social-card.svg", svg(1200, 630, og, "The Biscuit Tin: a field guide to British biscuits"))

print("wordmark width at 150px:", round(width(FREDOKA, "The Biscuit Tin", 150)))
