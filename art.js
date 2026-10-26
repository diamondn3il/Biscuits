/* The Biscuit Tin — biscuit illustrations.
   BiscuitArt.svg(biscuit) returns an inline SVG of the biscuit sitting on a paper doily.
   Everything is drawn in a 200 × 200 box centred on (100, 100). Random details (crumbs,
   currants, cracks) come from a generator seeded by the biscuit id, so each biscuit always
   looks the same. */
(function () {
  let uid = 0;

  function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function seeded(seed) {
    return function () {
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Lighten (p > 0) or darken (p < 0) a hex colour.
  function shade(hex, p) {
    const n = parseInt(hex.slice(1), 16);
    const target = p < 0 ? 0 : 255;
    const f = Math.abs(p);
    const ch = (v) => Math.round((target - v) * f + v);
    const r = ch(n >> 16), g = ch((n >> 8) & 255), b = ch(n & 255);
    return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  }

  const f1 = (n) => Math.round(n * 10) / 10;

  // A closed wavy circle: radius r, n bumps of amplitude a.
  function flutedPath(cx, cy, r, n, a) {
    let d = "";
    for (let i = 0; i <= 180; i++) {
      const th = (i / 180) * Math.PI * 2;
      const rr = r + a * Math.cos(n * th);
      d += (i ? "L" : "M") + f1(cx + rr * Math.cos(th)) + " " + f1(cy + rr * Math.sin(th));
    }
    return d + "Z";
  }

  // A slightly lumpy circle for rustic biscuits.
  function roughPath(cx, cy, r, rand) {
    const pts = 28;
    const offs = Array.from({ length: pts }, () => (rand() - 0.5) * 5);
    let d = "";
    for (let i = 0; i <= 120; i++) {
      const th = (i / 120) * Math.PI * 2;
      const k = (i / 120) * pts;
      const a = offs[Math.floor(k) % pts], b = offs[Math.ceil(k) % pts];
      const rr = r + a + (b - a) * (k - Math.floor(k));
      d += (i ? "L" : "M") + f1(cx + rr * Math.cos(th)) + " " + f1(cy + rr * Math.sin(th));
    }
    return d + "Z";
  }

  // Random point inside a circle or a rectangle.
  function inCircle(rand, cx, cy, r) {
    const a = rand() * Math.PI * 2, d = Math.sqrt(rand()) * r;
    return [cx + Math.cos(a) * d, cy + Math.sin(a) * d];
  }
  function inRect(rand, x, y, w, h) {
    return [x + rand() * w, y + rand() * h];
  }

  function doily() {
    let s = `<g class="doily">`;
    s += `<path d="${flutedPath(100, 100, 92, 30, 4)}" style="fill:var(--doily)"/>`;
    for (let i = 0; i < 30; i++) {
      const th = (i / 30) * Math.PI * 2;
      s += `<circle cx="${f1(100 + 84 * Math.cos(th))}" cy="${f1(100 + 84 * Math.sin(th))}" r="2.4" style="fill:var(--doily-hole)"/>`;
    }
    for (let i = 0; i < 20; i++) {
      const th = (i / 20) * Math.PI * 2 + 0.16;
      s += `<circle cx="${f1(100 + 76 * Math.cos(th))}" cy="${f1(100 + 76 * Math.sin(th))}" r="1.6" style="fill:var(--doily-hole)"/>`;
    }
    s += `<circle cx="100" cy="100" r="71" fill="none" style="stroke:var(--doily-hole)" stroke-width="1" stroke-dasharray="2 3"/>`;
    return s + `</g>`;
  }

  const shadow = (rx, ry, cy = 108) =>
    `<ellipse cx="104" cy="${cy}" rx="${rx}" ry="${ry}" fill="#2a1a0c" opacity=".16"/>`;

  function holesCircle(r, color, mode) {
    let s = "";
    if (mode === "ring") {
      for (let i = 0; i < 12; i++) {
        const th = (i / 12) * Math.PI * 2;
        s += `<circle cx="${f1(100 + r * 0.62 * Math.cos(th))}" cy="${f1(100 + r * 0.62 * Math.sin(th))}" r="1.8" fill="${color}"/>`;
      }
      return s;
    }
    const step = 15;
    for (let x = 100 - r; x <= 100 + r; x += step) {
      for (let y = 100 - r; y <= 100 + r; y += step) {
        if (Math.hypot(x - 100, y - 100) < r - 14 && Math.abs(y - 100) > 9) {
          s += `<circle cx="${x}" cy="${y}" r="1.9" fill="${color}"/>`;
        }
      }
    }
    return s;
  }

  function holesRect(x, y, w, h, color, skipBand) {
    let s = "";
    const cols = 5, rows = 2;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const cx = x + (w / (cols + 1)) * (i + 1);
        const cy = y + (h / (rows + 1)) * (j + 1) + (j ? 6 : -6) * (skipBand ? 1 : 0);
        s += `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="2" fill="${color}"/>`;
      }
    }
    return s;
  }

  function embossText(text, x, y, size, dark, light) {
    const base = `x="${x}" y="${y}" text-anchor="middle" font-family="'IBM Plex Mono', ui-monospace, monospace" font-weight="600" font-size="${size}" letter-spacing="2"`;
    return (
      `<text ${base} dy="1" fill="${light}" opacity=".35">${text}</text>` +
      `<text ${base} fill="${dark}" opacity=".6">${text}</text>`
    );
  }

  function sugar(rand, n, pick) {
    let s = "";
    for (let i = 0; i < n; i++) {
      const [x, y] = pick();
      const a = Math.round(rand() * 90);
      s += `<rect x="${f1(x)}" y="${f1(y)}" width="2.6" height="2.6" fill="#fffaf0" opacity=".85" transform="rotate(${a} ${f1(x)} ${f1(y)})"/>`;
    }
    return s;
  }

  function currants(rand, n, pick) {
    let s = "";
    for (let i = 0; i < n; i++) {
      const [x, y] = pick();
      const rx = 3 + rand() * 2.5, ry = 2.2 + rand() * 1.6, a = Math.round(rand() * 180);
      s += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(rx)}" ry="${f1(ry)}" fill="#3a1a1c" transform="rotate(${a} ${f1(x)} ${f1(y)})"/>`;
      s += `<ellipse cx="${f1(x - 1)}" cy="${f1(y - 1)}" rx="1" ry=".7" fill="#fff" opacity=".35"/>`;
    }
    return s;
  }

  function cow(cx, cy, color) {
    return `<g fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" opacity=".7">
      <path d="M${cx - 30} ${cy - 6} q2 -12 16 -12 h22 q12 0 14 10 l2 14 h-6 l-2 -6 q-10 4 -26 0 l-2 6 h-6 l-1 -8 q-12 -2 -11 -4z"/>
      <path d="M${cx - 30} ${cy - 6} q-12 -2 -14 6 q-2 6 4 8 q6 0 10 -6"/>
      <path d="M${cx - 42} ${cy - 6} l-4 -6 M${cx - 36} ${cy - 8} l1 -6"/>
      <path d="M${cx + 24} ${cy - 10} q8 4 6 18"/>
      <circle cx="${cx - 10}" cy="${cy - 3}" r="3"/><circle cx="${cx + 8}" cy="${cy + 1}" r="2.5"/>
      <path d="M${cx - 46} ${cy + 16} q46 6 92 0"/>
    </g>`;
  }

  function portrait(color) {
    return `<g fill="none" stroke="${color}" stroke-width="2" opacity=".55">
      <ellipse cx="100" cy="100" rx="22" ry="27"/>
      <circle cx="100" cy="93" r="8"/>
      <path d="M86 118 q14 -16 28 0"/>
      <path d="M92 89 q8 -8 16 0 q2 6 -1 10"/>
    </g>`;
  }

  /* ---------- Shapes ---------- */

  function round(o, rand) {
    const r = o.r || 66;
    const edge = shade(o.fill, -0.28);
    const dark = shade(o.fill, -0.4);
    let s = shadow(r, r * 0.92);
    const shape = o.fluted
      ? flutedPath(100, 100, r, o.fluted.n, o.fluted.a)
      : o.rough
        ? roughPath(100, 100, r, rand)
        : null;
    if (shape) s += `<path d="${shape}" fill="${o.fill}" stroke="${edge}" stroke-width="2.5"/>`;
    else s += `<circle cx="100" cy="100" r="${r}" fill="${o.fill}" stroke="${edge}" stroke-width="2.5"/>`;

    if (o.choc) {
      const c = o.choc;
      s += `<circle cx="100" cy="100" r="${r - 3}" fill="${c}"/>`;
      for (let i = -3; i <= 3; i++) {
        const y = 100 + i * 15;
        const half = Math.sqrt(Math.max(0, (r - 12) ** 2 - (y - 100) ** 2));
        let d = `M${f1(100 - half)} ${y}`;
        for (let x = -half; x < half; x += 10) d += ` q5 ${i % 2 ? 5 : -5} 10 0`;
        s += `<path d="${d}" fill="none" stroke="${shade(c, 0.22)}" stroke-width="3" stroke-linecap="round" opacity=".7"/>`;
      }
      s += `<ellipse cx="78" cy="74" rx="26" ry="10" fill="#fff" opacity=".12" transform="rotate(-35 78 74)"/>`;
      return s;
    }

    if (o.rim) s += `<circle cx="100" cy="100" r="${r - 8}" fill="none" stroke="${edge}" stroke-width="1.4" opacity=".45"/>`;
    s += `<ellipse cx="80" cy="76" rx="${r * 0.42}" ry="${r * 0.2}" fill="#fff" opacity=".14" transform="rotate(-35 80 76)"/>`;

    if (o.speckle) {
      for (let i = 0; i < 70; i++) {
        const [x, y] = inCircle(rand, 100, 100, r - 6);
        s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(0.6 + rand())}" fill="${o.speckle}" opacity=".45"/>`;
      }
    }
    if (o.oats) {
      for (let i = 0; i < 38; i++) {
        const [x, y] = inCircle(rand, 100, 100, r - 8);
        const a = Math.round(rand() * 180);
        s += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(4 + rand() * 3)}" ry="${f1(2 + rand())}" fill="${shade(o.fill, 0.3)}" stroke="${shade(o.fill, -0.15)}" stroke-width=".6" transform="rotate(${a} ${f1(x)} ${f1(y)})"/>`;
      }
      for (let i = 0; i < 30; i++) {
        const [x, y] = inCircle(rand, 100, 100, r - 6);
        s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(0.8 + rand() * 1.2)}" fill="${dark}" opacity=".35"/>`;
      }
    }
    if (o.cracks) {
      for (let i = 0; i < o.cracks; i++) {
        let a = (i / o.cracks) * Math.PI * 2 + rand() * 0.5;
        let d = rand() * 14 + 8;
        let x = 100 + Math.cos(a) * d, y = 100 + Math.sin(a) * d;
        let path = `M${f1(x)} ${f1(y)}`;
        const len = r * (0.45 + rand() * 0.35);
        for (let k = 0; k < 5; k++) {
          a += (rand() - 0.5) * 0.7;
          x += Math.cos(a) * (len / 5);
          y += Math.sin(a) * (len / 5);
          path += ` L${f1(x)} ${f1(y)}`;
        }
        s += `<path d="${path}" fill="none" stroke="${shade(o.fill, 0.28)}" stroke-width="3.2" stroke-linecap="round" opacity=".6"/>`;
        s += `<path d="${path}" fill="none" stroke="${dark}" stroke-width="1.4" stroke-linecap="round" opacity=".75"/>`;
      }
      if (o.sheen) s += `<circle cx="100" cy="100" r="${r - 4}" fill="url(#sheen)" opacity=".5"/>`;
    }
    if (o.segments) {
      for (let i = 0; i < o.segments; i++) {
        const th = (i / o.segments) * Math.PI * 2;
        s += `<line x1="${f1(100 + 12 * Math.cos(th))}" y1="${f1(100 + 12 * Math.sin(th))}" x2="${f1(100 + (r - 4) * Math.cos(th))}" y2="${f1(100 + (r - 4) * Math.sin(th))}" stroke="${edge}" stroke-width="1.6" opacity=".55"/>`;
      }
      s += `<circle cx="100" cy="100" r="12" fill="none" stroke="${edge}" stroke-width="1.6" opacity=".55"/>`;
    }
    if (o.holes) s += holesCircle(r, dark, o.holes);
    if (o.portrait) s += portrait(dark);
    if (o.text) s += embossText(o.text, 100, 105, r > 66 ? 13 : 12, dark, "#fff");
    if (o.currants) s += currants(rand, 16, () => inCircle(rand, 100, 100, r - 12));
    if (o.sugar) s += sugar(rand, 40, () => inCircle(rand, 100, 100, r - 6));
    return s;
  }

  function rect(o, rand) {
    const w = o.w || 150, h = o.h || 96, x = 100 - w / 2, y = 100 - h / 2, rx = o.rx ?? 8;
    const edge = shade(o.fill, -0.28), dark = shade(o.fill, -0.42);
    let s = shadow(w / 2 + 2, h / 2 + 4, 110);
    if (o.cream) {
      s += `<rect x="${x + 6}" y="${y + 8}" width="${w}" height="${h}" rx="${rx}" fill="${shade(o.fill, -0.18)}"/>`;
      s += `<rect x="${x + 3}" y="${y + 4}" width="${w}" height="${h}" rx="${rx}" fill="${o.cream}"/>`;
    }
    if (o.scallop) {
      const step = 12;
      for (let cx = x + 6; cx <= x + w - 6; cx += step) {
        s += `<circle cx="${f1(cx)}" cy="${y}" r="5.5" fill="${o.fill}" stroke="${edge}" stroke-width="2"/>`;
        s += `<circle cx="${f1(cx)}" cy="${y + h}" r="5.5" fill="${o.fill}" stroke="${edge}" stroke-width="2"/>`;
      }
      for (let cy = y + 6; cy <= y + h - 6; cy += step) {
        s += `<circle cx="${x}" cy="${f1(cy)}" r="5.5" fill="${o.fill}" stroke="${edge}" stroke-width="2"/>`;
        s += `<circle cx="${x + w}" cy="${f1(cy)}" r="5.5" fill="${o.fill}" stroke="${edge}" stroke-width="2"/>`;
      }
    }
    s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${o.fill}" stroke="${o.scallop ? "none" : edge}" stroke-width="2.5"/>`;
    s += `<rect x="${x + 8}" y="${y + 6}" width="${w * 0.55}" height="${h * 0.22}" rx="6" fill="#fff" opacity="${o.glossy ? 0.2 : 0.1}"/>`;

    if (o.ornate) {
      const g = `fill="none" stroke="${edge}" stroke-width="1.8" stroke-linecap="round" opacity=".75"`;
      s += `<rect x="${x + 9}" y="${y + 9}" width="${w - 18}" height="${h - 18}" rx="5" ${g}/>`;
      s += `<ellipse cx="100" cy="100" rx="16" ry="11" ${g}/>`;
      s += `<ellipse cx="100" cy="100" rx="7" ry="4.5" ${g}/>`;
      for (const side of [-1, 1]) {
        const sx = 100 + side * 22;
        s += `<path d="M${sx} 100 h${side * 38}" ${g}/>`;
        for (let k = 0; k < 5; k++) {
          const lx = sx + side * (6 + k * 7);
          s += `<path d="M${lx} 100 q${side * 4} -9 ${side * 9} -10 M${lx} 100 q${side * 4} 9 ${side * 9} 10" ${g}/>`;
        }
      }
      for (const [cx, cy] of [[x + 18, y + 18], [x + w - 18, y + 18], [x + 18, y + h - 18], [x + w - 18, y + h - 18]]) {
        s += `<circle cx="${cx}" cy="${cy}" r="4.5" ${g}/><circle cx="${cx}" cy="${cy}" r="1.2" fill="${edge}"/>`;
      }
    }
    if (o.holes) s += holesRect(x, y, w, h, dark, !!o.text);
    if (o.cow) s += cow(100, 102, dark);
    if (o.text) s += embossText(o.text, 100, 104, 13, o.fill === "#5A3420" ? "#2a160c" : dark, "#fff");
    if (o.currants) s += currants(rand, 26, () => inRect(rand, x + 7, y + 7, w - 14, h - 14));
    if (o.currants) {
      for (let i = 1; i < 4; i++) {
        s += `<line x1="${x + (w / 4) * i}" y1="${y + 2}" x2="${x + (w / 4) * i}" y2="${y + h - 2}" stroke="${edge}" stroke-width="1.5" opacity=".5"/>`;
      }
    }
    if (o.sugar) s += sugar(rand, 46, () => inRect(rand, x + 4, y + 4, w - 8, h - 8));
    return s;
  }

  function dodger(o, rand) {
    const edge = shade(o.fill, -0.3);
    let s = shadow(66, 60);
    s += `<path d="${flutedPath(100, 100, 66, 20, 3.5)}" fill="${o.fill}" stroke="${edge}" stroke-width="2.5"/>`;
    s += `<circle cx="100" cy="100" r="54" fill="none" stroke="${edge}" stroke-width="1.4" opacity=".4"/>`;
    const heart = "M100 126 C64 102 70 70 100 86 C130 70 136 102 100 126 Z";
    s += `<path d="${heart}" fill="${shade(o.fill, -0.35)}" transform="translate(1.5 2)"/>`;
    s += `<path d="${heart}" fill="#B3122E"/>`;
    s += `<path d="M84 88 q6 -6 12 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".55"/>`;
    for (let i = 0; i < 90; i++) {
      const [x, y] = inCircle(rand, 100, 100, 62);
      s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(0.5 + rand() * 0.8)}" fill="#fff" opacity=".55"/>`;
    }
    return s;
  }

  function empire() {
    let s = shadow(66, 60);
    s += `<circle cx="102" cy="104" r="65" fill="#B3122E"/>`;
    s += `<circle cx="100" cy="100" r="66" fill="#E2B16A" stroke="#A8732F" stroke-width="2.5"/>`;
    s += `<path d="${flutedPath(100, 99, 58, 9, 2.2)}" fill="#FFFDF7" stroke="#E6DCCB" stroke-width="1.5"/>`;
    s += `<path d="M66 78 q16 -20 44 -22" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".8"/>`;
    s += `<circle cx="101" cy="102" r="12" fill="#7E0C1E"/>`;
    s += `<circle cx="100" cy="100" r="12" fill="#D0142E"/>`;
    s += `<ellipse cx="96" cy="95" rx="4" ry="2.6" fill="#fff" opacity=".6" transform="rotate(-30 96 95)"/>`;
    return s;
  }

  function ring(o) {
    const edge = shade(o.base, -0.3);
    const ringPath = (R, r) =>
      `M${100 - R} 100 a${R} ${R} 0 1 0 ${R * 2} 0 a${R} ${R} 0 1 0 ${-R * 2} 0 Z M${100 - r} 100 a${r} ${r} 0 1 1 ${r * 2} 0 a${r} ${r} 0 1 1 ${-r * 2} 0 Z`;
    let s = shadow(62, 56);
    s += `<path d="${ringPath(62, 20)}" fill="${o.base}" stroke="${edge}" stroke-width="2.5" fill-rule="evenodd"/>`;
    s += `<path d="${ringPath(57, 25)}" fill="${o.icing}" fill-rule="evenodd"/>`;
    for (const r of [33, 41, 49]) {
      s += `<circle cx="100" cy="100" r="${r}" fill="none" stroke="${o.feather}" stroke-width="3.2"/>`;
    }
    for (let i = 0; i < 16; i++) {
      const th = (i / 16) * Math.PI * 2;
      const c = Math.cos(th), sn = Math.sin(th);
      const k = i % 2 ? 1 : -1;
      s += `<path d="M${f1(100 + 26 * c)} ${f1(100 + 26 * sn)} Q${f1(100 + 41 * c - 5 * sn * k)} ${f1(100 + 41 * sn + 5 * c * k)} ${f1(100 + 56 * c)} ${f1(100 + 56 * sn)}" fill="none" stroke="${o.icing}" stroke-width="2.6"/>`;
    }
    s += `<path d="M64 76 q14 -20 40 -22" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".4"/>`;
    return s;
  }

  function wafer() {
    const w = 156, h = 66, x = 100 - w / 2, y = 100 - h / 2;
    const pink = "#F39BB4", cream = "#FCE4EC";
    const id = "w" + ++uid;
    let s = shadow(80, 38, 112);
    s += `<rect x="${x + 8}" y="${y + 12}" width="${w}" height="${h}" rx="3" fill="${shade(pink, -0.15)}"/>`;
    s += `<rect x="${x + 6}" y="${y + 9}" width="${w}" height="${h}" rx="3" fill="${cream}"/>`;
    s += `<rect x="${x + 4}" y="${y + 6}" width="${w}" height="${h}" rx="3" fill="${shade(pink, -0.06)}"/>`;
    s += `<rect x="${x + 2}" y="${y + 3}" width="${w}" height="${h}" rx="3" fill="${cream}"/>`;
    s += `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/></clipPath>`;
    s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${pink}" stroke="${shade(pink, -0.25)}" stroke-width="2"/>`;
    s += `<g clip-path="url(#${id})" stroke="${shade(pink, -0.2)}" stroke-width="1.6" opacity=".8">`;
    for (let i = -10; i < 20; i++) {
      s += `<line x1="${x + i * 12}" y1="${y}" x2="${x + i * 12 + h}" y2="${y + h}"/>`;
      s += `<line x1="${x + i * 12 + h}" y1="${y}" x2="${x + i * 12}" y2="${y + h}"/>`;
    }
    s += `</g>`;
    s += `<rect x="${x + 6}" y="${y + 5}" width="${w * 0.5}" height="10" rx="4" fill="#fff" opacity=".22"/>`;
    return s;
  }

  function jaffa() {
    const id = "j" + ++uid;
    let s = shadow(68, 62);
    s += `<circle cx="100" cy="100" r="68" fill="#E7B566" stroke="#B9843A" stroke-width="2.5"/>`;
    s += `<circle cx="100" cy="100" r="62" fill="#F0C77A" opacity=".6"/>`;
    s += `<circle cx="101" cy="101" r="57" fill="#E8701A"/>`;
    s += `<circle cx="100" cy="99" r="55" fill="#2E1A10"/>`;
    s += `<clipPath id="${id}"><circle cx="100" cy="99" r="55"/></clipPath>`;
    s += `<g clip-path="url(#${id})" stroke="#4A2C1A" stroke-width="2.2">`;
    for (let i = -6; i <= 6; i++) {
      s += `<line x1="${100 + i * 10 - 60}" y1="40" x2="${100 + i * 10 + 60}" y2="160"/>`;
      s += `<line x1="${100 + i * 10 + 60}" y1="40" x2="${100 + i * 10 - 60}" y2="160"/>`;
    }
    s += `</g>`;
    s += `<ellipse cx="82" cy="78" rx="22" ry="9" fill="#fff" opacity=".14" transform="rotate(-35 82 78)"/>`;
    return s;
  }

  function teacake() {
    const id = "t" + ++uid;
    let s = shadow(72, 64, 110);
    s += `<g transform="rotate(12 100 100)">`;
    const petals = [[100, 18], [182, 100], [100, 182], [18, 100]];
    for (const [px, py] of petals) {
      s += `<path d="M100 100 L${px - (py === 100 ? 0 : 26)} ${py - (px === 100 ? 0 : 26)} L${px} ${py} L${px + (py === 100 ? 0 : 26)} ${py + (px === 100 ? 0 : 26)} Z" fill="#D21F2C" stroke="#9E1420" stroke-width="1.5" stroke-linejoin="round"/>`;
    }
    for (let i = 0; i < 4; i++) {
      const th = (i / 4) * Math.PI * 2 + Math.PI / 4;
      s += `<path d="M100 100 L${f1(100 + 70 * Math.cos(th - 0.18))} ${f1(100 + 70 * Math.sin(th - 0.18))} L${f1(100 + 70 * Math.cos(th + 0.18))} ${f1(100 + 70 * Math.sin(th + 0.18))} Z" fill="#E3E6EA" stroke="#A7AEB8" stroke-width="1"/>`;
    }
    s += `</g>`;
    s += `<circle cx="100" cy="100" r="58" fill="#D9A35C" stroke="#A8732F" stroke-width="2"/>`;
    s += `<radialGradient id="${id}" cx="38%" cy="34%" r="70%"><stop offset="0" stop-color="#8A5A36"/><stop offset=".45" stop-color="#5A3520"/><stop offset="1" stop-color="#2A160C"/></radialGradient>`;
    s += `<circle cx="100" cy="98" r="53" fill="url(#${id})"/>`;
    s += `<ellipse cx="80" cy="76" rx="16" ry="9" fill="#fff" opacity=".28" transform="rotate(-35 80 76)"/>`;
    s += `<ellipse cx="74" cy="72" rx="5" ry="3" fill="#fff" opacity=".45" transform="rotate(-35 74 72)"/>`;
    return s;
  }

  function whirl(o, rand) {
    let s = shadow(66, 60);
    s += `<circle cx="102" cy="104" r="64" fill="#B3122E" opacity=".9"/>`;
    s += `<circle cx="101" cy="102" r="64" fill="#FFF6E0"/>`;
    s += `<circle cx="100" cy="100" r="64" fill="#F2D29A" stroke="#C99A55" stroke-width="2"/>`;
    for (let arm = 0; arm < 8; arm++) {
      let d = "";
      for (let i = 0; i <= 40; i++) {
        const t = i / 40;
        const th = (arm / 8) * Math.PI * 2 + t * 1.6;
        const r = 8 + t * 50;
        d += (i ? "L" : "M") + f1(100 + r * Math.cos(th)) + " " + f1(100 + r * Math.sin(th));
      }
      s += `<path d="${d}" fill="none" stroke="#D9AE6A" stroke-width="10" stroke-linecap="round"/>`;
      s += `<path d="${d}" fill="none" stroke="#FFF1D2" stroke-width="2.4" stroke-linecap="round" opacity=".7" transform="translate(-1.5 -1.5)"/>`;
    }
    s += `<circle cx="100" cy="100" r="9" fill="#E9C27F"/>`;
    for (let i = 0; i < 60; i++) {
      const [x, y] = inCircle(rand, 100, 100, 60);
      s += `<circle cx="${f1(x)}" cy="${f1(y)}" r=".9" fill="#fff" opacity=".5"/>`;
    }
    return s;
  }

  function fingers() {
    let s = shadow(64, 50, 112);
    const choc = "#5B3420";
    [[-34, -8], [0, 4], [34, -4]].forEach(([dx, rot]) => {
      s += `<g transform="rotate(${rot} ${100 + dx} 100)">`;
      s += `<rect x="${100 + dx - 14}" y="30" width="28" height="140" rx="12" fill="#3A1F12" transform="translate(3 4)" opacity=".5"/>`;
      s += `<rect x="${100 + dx - 14}" y="30" width="28" height="140" rx="12" fill="${choc}" stroke="#3A1F12" stroke-width="2"/>`;
      s += `<rect x="${100 + dx - 8}" y="38" width="6" height="120" rx="3" fill="#fff" opacity=".18"/>`;
      for (let k = 0; k < 4; k++) {
        s += `<path d="M${100 + dx - 10} ${60 + k * 26} q10 -5 20 0" fill="none" stroke="${shade(choc, 0.2)}" stroke-width="1.6" opacity=".7"/>`;
      }
      s += `</g>`;
    });
    return s;
  }

  function gems(o, rand) {
    const colours = ["#F48FB1", "#FFF176", "#FFFFFF", "#A5D6A7", "#CE93D8", "#FFAB91"];
    const spots = [[100, 100], [62, 78], [138, 76], [58, 124], [142, 126], [100, 56], [100, 146], [76, 154], [128, 50]];
    let s = shadow(70, 62);
    spots.forEach(([cx, cy], i) => {
      const r = 17;
      const c = colours[i % colours.length];
      s += `<circle cx="${cx + 2}" cy="${cy + 3}" r="${r}" fill="#2a1a0c" opacity=".14"/>`;
      s += `<path d="${flutedPath(cx, cy, r, 10, 1.4)}" fill="#E7B566" stroke="#B9843A" stroke-width="1.8"/>`;
      let star = "";
      for (let k = 0; k < 16; k++) {
        const th = (k / 16) * Math.PI * 2 + rand() * 0.2;
        const rr = k % 2 ? 6 : 12;
        star += (k ? "L" : "M") + f1(cx + rr * Math.cos(th)) + " " + f1(cy + rr * Math.sin(th));
      }
      s += `<path d="${star}Z" fill="${c}" stroke="${shade(c, -0.18)}" stroke-width="1.2" stroke-linejoin="round"/>`;
      s += `<circle cx="${cx}" cy="${cy}" r="3.5" fill="${shade(c, 0.4)}"/>`;
      s += `<circle cx="${cx - 2}" cy="${cy - 3}" r="1.6" fill="#fff" opacity=".7"/>`;
    });
    return s;
  }

  function wheel() {
    const choc = "#4E2C1B";
    let s = shadow(74, 68);
    s += `<circle cx="100" cy="100" r="74" fill="${choc}" stroke="#2E190E" stroke-width="2.5"/>`;
    for (let i = 0; i < 12; i++) {
      const th = (i / 12) * Math.PI * 2;
      s += `<circle cx="${f1(100 + 56 * Math.cos(th))}" cy="${f1(100 + 56 * Math.sin(th))}" r="7" fill="${shade(choc, 0.12)}"/>`;
    }
    s += `<circle cx="100" cy="100" r="44" fill="none" stroke="${shade(choc, 0.18)}" stroke-width="3"/>`;
    s += `<circle cx="100" cy="100" r="20" fill="${shade(choc, 0.1)}"/>`;
    for (let i = 0; i < 8; i++) {
      const th = (i / 8) * Math.PI * 2;
      s += `<line x1="${f1(100 + 20 * Math.cos(th))}" y1="${f1(100 + 20 * Math.sin(th))}" x2="${f1(100 + 44 * Math.cos(th))}" y2="${f1(100 + 44 * Math.sin(th))}" stroke="${shade(choc, 0.15)}" stroke-width="3" stroke-linecap="round"/>`;
    }
    s += `<ellipse cx="74" cy="70" rx="28" ry="10" fill="#fff" opacity=".12" transform="rotate(-35 74 70)"/>`;
    return s;
  }

  function penguin() {
    const id = "p" + ++uid;
    const choc = "#5A3320";
    const x = 22, y = 68, w = 156, h = 64;
    let s = shadow(82, 38, 112);
    s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="${choc}" stroke="#341C10" stroke-width="2"/>`;
    for (let k = 0; k < 3; k++) {
      let d = `M${x + 8} ${y + 16 + k * 16}`;
      for (let i = 0; i < 14; i++) d += ` q5 ${i % 2 ? 4 : -4} 10 0`;
      s += `<path d="${d}" fill="none" stroke="${shade(choc, 0.2)}" stroke-width="2.4" opacity=".75"/>`;
    }
    s += `<rect x="${x + 8}" y="${y + 6}" width="70" height="8" rx="4" fill="#fff" opacity=".14"/>`;
    // the wrapper, peeled back from the right-hand end
    s += `<clipPath id="${id}"><rect x="${x + 96}" y="${y - 4}" width="${w - 92}" height="${h + 8}" rx="4"/></clipPath>`;
    let zig = `M${x + 96} ${y - 6}`;
    for (let i = 0; i < 8; i++) zig += ` L${x + 96 + (i % 2 ? 6 : 0)} ${y - 6 + (i + 1) * ((h + 12) / 8)}`;
    s += `<g clip-path="url(#${id})"><path d="${zig} L${x + w + 4} ${y + h + 6} L${x + w + 4} ${y - 6} Z" fill="#D7262E"/>`;
    s += `<rect x="${x + 96}" y="${y + h / 2 - 9}" width="${w - 92}" height="18" fill="#F4F1EC" opacity=".95"/>`;
    s += `</g>`;
    // a little penguin on the wrapper
    const px = x + 132, py = y + h / 2;
    s += `<ellipse cx="${px}" cy="${py}" rx="10" ry="13" fill="#1B1F2A"/>`;
    s += `<ellipse cx="${px}" cy="${py + 2}" rx="6" ry="9" fill="#fff"/>`;
    s += `<circle cx="${px - 2.5}" cy="${py - 6}" r="1.4" fill="#1B1F2A"/><circle cx="${px + 2.5}" cy="${py - 6}" r="1.4" fill="#1B1F2A"/>`;
    s += `<path d="M${px - 2} ${py - 3} l2 3 l2 -3 z" fill="#F2A33A"/>`;
    return s;
  }

  function figroll(o, rand) {
    const pastry = "#D59A52", edge = "#A06A2C";
    let s = shadow(78, 56, 112);
    const roll = (x, y, w, h, cut) => {
      let r = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${pastry}" stroke="${edge}" stroke-width="2.2"/>`;
      for (let i = 1; i < 9; i++) {
        r += `<path d="M${x + (w / 9) * i} ${y + 4} q-3 ${h / 2 - 4} 0 ${h - 8}" fill="none" stroke="${edge}" stroke-width="1.6" opacity=".55"/>`;
      }
      r += `<rect x="${x + 12}" y="${y + 6}" width="${w * 0.6}" height="7" rx="3.5" fill="#fff" opacity=".18"/>`;
      if (cut) {
        r += `<ellipse cx="${x + 16}" cy="${y + h / 2}" rx="15" ry="${h / 2 - 1}" fill="#E8B46D" stroke="${edge}" stroke-width="2"/>`;
        r += `<ellipse cx="${x + 16}" cy="${y + h / 2}" rx="10" ry="${h / 2 - 7}" fill="#5B2A2E"/>`;
        for (let i = 0; i < 14; i++) {
          const sx = x + 16 + (rand() - 0.5) * 14, sy = y + h / 2 + (rand() - 0.5) * (h - 18);
          r += `<circle cx="${f1(sx)}" cy="${f1(sy)}" r=".9" fill="#E6C27A"/>`;
        }
      }
      return r;
    };
    s += roll(30, 52, 140, 46, false);
    s += roll(44, 108, 118, 46, true);
    return s;
  }

  const SHAPES = { round, rect, dodger, empire, ring, wafer, jaffa, teacake, whirl, fingers, gems, wheel, penguin, figroll };

  function svg(b, opts = {}) {
    const rand = seeded(hash(b.id));
    const o = b.art;
    const draw = SHAPES[o.t] || round;
    const label = opts.decorative ? `aria-hidden="true"` : `role="img" aria-label="Illustration of a ${b.name}"`;
    return `<svg class="biscuit-svg" viewBox="0 0 200 200" ${label} xmlns="http://www.w3.org/2000/svg">
      <defs><radialGradient id="sheen" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
      ${opts.noDoily ? "" : doily()}
      <g class="biscuit">${draw(o, rand)}</g>
    </svg>`;
  }

  function doilySvg() {
    return `<svg class="biscuit-svg" viewBox="0 0 200 200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${doily()}</svg>`;
  }

  window.BiscuitArt = { svg, doilySvg, flutedPath };
})();
