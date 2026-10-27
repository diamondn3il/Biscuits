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


# Tin designs. CLASSIC is the brand tin; the others are alternatives built on the same shape.
CLASSIC = {
    "name": "Classic Raspberry",
    "body": (JAM_LIGHT, JAM, JAM_DARK), "inside": "#5a1830", "lid_side": JAM_DARK,
    "band": ("#ffd97a", CUSTARD, "#e9a92a"), "dots": CREAM, "ring": CUSTARD,
    "emblem": "heart", "emblem_fill": CREAM, "pattern": None,
}
TIN_STYLES = {
    "classic": CLASSIC,
    "royal": {
        "name": "Royal Blue", "body": ("#3e6fb5", "#24407a", "#172c58"), "inside": "#0f1d3d", "lid_side": "#172c58",
        "band": ("#f6d27a", "#e0aa3e", "#b8862a"), "dots": "#fff6e0", "ring": "#e0aa3e",
        "emblem": "crown", "emblem_fill": "#ffc94a", "pattern": "scrolls",
    },
    "tartan": {
        "name": "Tartan Shortbread", "body": ("#d33a4a", "#b3122e", "#860c22"), "inside": "#4a0812", "lid_side": "#860c22",
        "band": ("#2f7a52", "#1f5a3a", "#143d27"), "dots": "#ffc94a", "ring": "#ffc94a",
        "emblem": "thistle", "emblem_fill": "#9b6bd6", "pattern": "tartan",
    },
    "mint": {
        "name": "Mint Candy Stripe", "body": ("#b8f0d4", "#8ee0b8", "#5fbf93"), "inside": "#2f6b4f", "lid_side": "#5fbf93",
        "band": ("#ff8fb0", JAM, JAM_DARK), "dots": CREAM, "ring": JAM,
        "emblem": "heart", "emblem_fill": JAM, "pattern": "stripes",
    },
    "midnight": {
        "name": "Midnight Sprinkles", "body": ("#5a3f6b", "#3f2a4a", "#2a1a33"), "inside": "#140b18", "lid_side": "#2a1a33",
        "band": ("#ff9ab8", "#ff6f98", "#d94a75"), "dots": CREAM, "ring": "#ff6f98",
        "emblem": "star", "emblem_fill": CUSTARD, "pattern": "sprinkles",
    },
}

EMBLEMS = {
    "heart": "M0 15 C-30 -3 -20 -22 0 -9 C20 -22 30 -3 0 15Z",
    "crown": "M-30 12 L-34 -16 L-16 -2 L0 -22 L16 -2 L34 -16 L30 12 Z",
    "star": "M0 -22 L7 -7 L24 -7 L10 3 L15 19 L0 9 L-15 19 L-10 3 L-24 -7 L-7 -7 Z",
}


def pattern(kind, clip_id, x0, y0, w, h):
    """Decoration for a tin surface, clipped to it."""
    rnd = random.Random(11)
    out = []
    if kind == "tartan":
        for x in range(int(x0), int(x0 + w), 64):
            out.append(f'<rect x="{x}" y="{y0}" width="26" height="{h}" fill="#1f5a3a" opacity=".55"/>')
            out.append(f'<rect x="{x + 40}" y="{y0}" width="6" height="{h}" fill="#ffc94a" opacity=".7"/>')
        for y in range(int(y0), int(y0 + h), 64):
            out.append(f'<rect x="{x0}" y="{y}" width="{w}" height="26" fill="#1c2640" opacity=".4"/>')
            out.append(f'<rect x="{x0}" y="{y + 40}" width="{w}" height="6" fill="#ffc94a" opacity=".55"/>')
    elif kind == "stripes":
        for x in range(int(x0), int(x0 + w), 44):
            out.append(f'<rect x="{x}" y="{y0}" width="20" height="{h}" fill="{CREAM}" opacity=".85"/>')
    elif kind == "sprinkles":
        colours = ["#ff7aa2", CUSTARD, "#9ad7f5", "#8ee0b8", "#c9a7ff"]
        for i in range(int(w * h / 900)):
            x, y, a = rnd.uniform(x0, x0 + w), rnd.uniform(y0, y0 + h), rnd.uniform(0, 180)
            out.append(f'<rect x="{x - 9:.0f}" y="{y - 3.5:.0f}" width="18" height="7" rx="3.5" fill="{colours[i % 5]}" transform="rotate({a:.0f} {x:.0f} {y:.0f})"/>')
    elif kind == "scrolls":
        for x in range(int(x0) + 10, int(x0 + w), 56):
            for y in range(int(y0) + 20, int(y0 + h), 56):
                out.append(f'<path d="M{x} {y} q10 -14 20 0 t20 0" fill="none" stroke="#fff6e0" stroke-width="4" opacity=".45" stroke-linecap="round"/>')
    return f'<g clip-path="url(#{clip_id})" stroke="none">{"".join(out)}</g>' if out else ""


def emblem(kind, fill):
    if kind == "thistle":
        return ('<path d="M-18 14 Q0 2 18 14 M0 14 V-2" fill="none" stroke="#2f7a52" stroke-width="8"/>'
                f'<ellipse cx="0" cy="-10" rx="16" ry="13" fill="{fill}" stroke-width="7"/>'
                '<path d="M-14 -20 L-8 -12 M0 -26 L0 -18 M14 -20 L8 -12" stroke="#2f7a52" stroke-width="6"/>')
    return f'<path d="{EMBLEMS[kind]}" fill="{fill}" stroke-width="8"/>'


def tin(uid="t", style=CLASSIC):
    """The biscuit tin, drawn in a 512 x 512 box: a round drum with its lid tipped open."""
    st = style
    dots = "".join(
        f'<circle cx="{x}" cy="{rim_y(x, 322):.1f}" r="7" fill="{st["dots"]}" stroke="none"/>'
        for x in range(124, 400, 36)
    )
    digestive_dots = "".join(
        f'<circle cx="{250 + dx}" cy="{214 + dy}" r="4" fill="#8a5a2b" stroke="none"/>'
        for dx, dy in [(-26, -24), (0, -30), (26, -24), (-30, 2), (30, 2), (-14, -2), (14, -2)]
    )
    body_path = "M96 250 A160 44 0 0 0 416 250 L416 404 A160 44 0 0 1 96 404 Z"
    b, bd = st["body"], st["band"]
    clips, body_pat, lid_pat = "", "", ""
    if st["pattern"]:
        clips = (f'<clipPath id="{uid}-bclip"><path d="{body_path}"/></clipPath>'
                 f'<clipPath id="{uid}-lclip"><ellipse cx="0" cy="0" rx="172" ry="46"/></clipPath>')
        body_pat = pattern(st["pattern"], f"{uid}-bclip", 90, 200, 340, 260)
        lid_pat = pattern(st["pattern"], f"{uid}-lclip", -180, -50, 360, 100)
    return f"""
  <defs>
    <linearGradient id="{uid}-body" x1="0" x2="1">
      <stop offset="0" stop-color="{b[0]}"/><stop offset=".55" stop-color="{b[1]}"/><stop offset="1" stop-color="{b[2]}"/>
    </linearGradient>
    <linearGradient id="{uid}-band" x1="0" x2="1">
      <stop offset="0" stop-color="{bd[0]}"/><stop offset=".6" stop-color="{bd[1]}"/><stop offset="1" stop-color="{bd[2]}"/>
    </linearGradient>{clips}
  </defs>
  <ellipse cx="262" cy="428" rx="176" ry="38" fill="{CHOC}" opacity=".18"/>
  <g stroke="{CHOC}" stroke-width="14" stroke-linejoin="round" stroke-linecap="round">
    <ellipse cx="256" cy="250" rx="160" ry="44" fill="{st["inside"]}"/>
    <circle cx="250" cy="214" r="62" fill="#c98e4a"/>
    {digestive_dots}
    <g transform="rotate(-14 170 224)"><path d="{fluted(170, 224, 54, 14, 3.5)}" fill="#e2a85b"/>
    <path d="M170 244 C140 224 148 200 170 213 C192 200 200 224 170 244Z" fill="#c8102e" stroke-width="8"/></g>
    <path d="{body_path}" fill="url(#{uid}-body)"/>{body_pat}{'<path d="' + body_path + '" fill="none"/>' if body_pat else ""}
    <path d="M96 300 A160 44 0 0 0 416 300 L416 344 A160 44 0 0 1 96 344 Z" fill="url(#{uid}-band)" stroke-width="10"/>
    {dots}
    <path d="M130 276 L130 290 M130 360 L130 388" stroke="#ffffff" stroke-width="14" opacity=".45"/>
    <g transform="translate(270 160) rotate(22)">
      <path d="M-172 0 A172 46 0 0 0 172 0 L172 30 A172 46 0 0 1 -172 30 Z" fill="{st["lid_side"]}"/>
      <ellipse cx="0" cy="0" rx="172" ry="46" fill="url(#{uid}-body)"/>{lid_pat}{'<ellipse cx="0" cy="0" rx="172" ry="46" fill="none"/>' if lid_pat else ""}
      <ellipse cx="0" cy="0" rx="126" ry="31" fill="none" stroke="{st["ring"]}" stroke-width="10"/>
      {emblem(st["emblem"], st["emblem_fill"])}
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
sub = "History, recipes and dunk tests for every biscuit"
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


# ---------- dark profile picture and tin design options ----------
PLUM, PLUM_GLOW, PINKY = "#23162b", "#3f2a4a", "#ff6f98"
DRIP = ("M0 0h160v22c-8 0-10 6-10 14s-4 14-10 14-10-6-10-14 0-14-12-14-12 8-12 20-4 22-12 22-12-10-12-22-2-20-14-20"
        "-12 4-14 12-6 10-12 10-10-4-12-12-6-10-14-10-10 6-10 14-4 12-10 12S8 30 0 22z")


def sticker_filter(fid, width=10, colour="#fff1f5"):
    """A die-cut sticker outline round whatever it is applied to, so a tin stands out on dark."""
    return (f'<filter id="{fid}" x="-20%" y="-20%" width="140%" height="140%">'
            f'<feMorphology in="SourceAlpha" operator="dilate" radius="{width}" result="grow"/>'
            f'<feFlood flood-color="{colour}"/><feComposite in2="grow" operator="in" result="edge"/>'
            f'<feMerge><feMergeNode in="edge"/><feMergeNode in="SourceGraphic"/></feMerge></filter>')


def dark_badge(style, uid):
    """The tin on a deep plum tile with sprinkles, a pink drip and a soft glow: the dark profile picture."""
    drips = "".join(f'<path d="{DRIP}" transform="translate({x} 0) scale(1.6)" fill="{PINKY}"/>' for x in range(-40, 600, 250))
    return (
        f'<defs><radialGradient id="{uid}-glow" cx="50%" cy="56%" r="50%"><stop offset="0" stop-color="{PLUM_GLOW}"/>'
        f'<stop offset="1" stop-color="{PLUM}"/></radialGradient>{sticker_filter(uid + "-sticker")}</defs>'
        f'<rect width="512" height="512" fill="url(#{uid}-glow)"/>'
        + sprinkles(512, 512, 26, seed=3, opacity=0.4)
        + drips
        # the tin's own drop shadow sits outside the sticker outline, so only the tin is outlined
        + f'<ellipse cx="260" cy="420" rx="150" ry="26" fill="#000" opacity=".35"/>'
        + f'<g transform="translate(56 74) scale(.78)" filter="url(#{uid}-sticker)">{without_shadow(tin(uid, style))}</g>'
    )


def without_shadow(tin_svg):
    shadow = f'<ellipse cx="262" cy="428" rx="176" ry="38" fill="{CHOC}" opacity=".18"/>'
    assert shadow in tin_svg
    return tin_svg.replace(shadow, "")


write("logo-badge-dark.svg", svg(512, 512, dark_badge(CLASSIC, "d"), "The Biscuit Tin"))

# each alternative tin as a transparent mark, plus a dark badge
opts = OUT / "tin-options"
opts.mkdir(exist_ok=True)
for key, st in TIN_STYLES.items():
    (opts / f"{key}-mark.svg").write_text(svg(512, 512, tin(key, st), f"The Biscuit Tin: {st['name']} tin"))
    (opts / f"{key}-badge-dark.svg").write_text(svg(512, 512, dark_badge(st, key + "d"), f"The Biscuit Tin: {st['name']} tin"))
