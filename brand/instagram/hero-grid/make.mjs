// Builds a six-post Instagram "hero" that forms one big banner across two rows of the profile grid.
//
//   node make.mjs
//
// Instagram shows each 1080 x 1350 post in the profile grid cropped to 3:4, hiding 34px down
// each side. So the banner is laid out in that cropped "grid space" (3 x 1012 by 2 x 1350), and each
// post is cut with 34px of the neighbouring artwork either side: the posts join up seamlessly on
// the grid, and each still looks complete when opened on its own. Needs Playwright with Chromium.
import { chromium } from "playwright";
import { writeFileSync, mkdirSync, rmSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const TILE_W = 1080, TILE_H = 1350, VIS_W = 1012, BLEED = (TILE_W - VIS_W) / 2;
const COLS = 3, ROWS = 2;

const browser = await chromium.launch();

// ---------- characters, captured with transparent backgrounds ----------
async function character(url, t, parts) {
  const p = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto(url);
  await p.waitForLoadState("networkidle");
  await p.evaluate(() => document.fonts.ready);
  await p.addStyleTag({ content: `#stage{background:transparent!important}#stage::before{display:none!important}
    #scene>rect,.layer,.endcard{display:none!important}html,body{background:transparent!important}` });
  const box = await p.evaluate(({ t, parts }) => {
    render(t);
    const rs = parts.map((s) => document.querySelector(s).getBoundingClientRect());
    return { x: Math.min(...rs.map((r) => r.left)), y: Math.min(...rs.map((r) => r.top)),
             r: Math.max(...rs.map((r) => r.right)), b: Math.max(...rs.map((r) => r.bottom)) };
  }, { t, parts });
  const clip = { x: Math.max(0, box.x - 10), y: Math.max(0, box.y - 10), width: Math.min(1080, box.r + 10) - Math.max(0, box.x - 10), height: box.b - box.y + 20 };
  const buf = await p.screenshot({ omitBackground: true, clip });
  await p.close();
  return { src: "data:image/png;base64," + buf.toString("base64"), w: clip.width, h: clip.height };
}
const C = "file://" + path.join(HERE, "../characters/engine.html");
const parts = ["#art .biscuit", "#arm-l", "#arm-r", "#legs", "#hat"];
const cast = {
  oliver: await character(C + "?ep=bath-oliver", 2.2, parts),
  hamish: await character(C + "?ep=shortbread", 2.2, parts),
  reggie: await character("file://" + path.join(HERE, "../reggie/reggie.html"), 7.8, ["#reggie", "#cup-back", "#cup-front"]),
};
mkdirSync(path.join(HERE, "parts"), { recursive: true });
for (const [name, c] of Object.entries(cast)) writeFileSync(path.join(HERE, "parts", name + ".png"), Buffer.from(c.src.split(",")[1], "base64"));

// ---------- the banner, in grid space plus a bleed down each side ----------
const page = await browser.newPage({ viewport: { width: COLS * VIS_W + 2 * BLEED, height: ROWS * TILE_H } });
await page.goto("file://" + path.join(HERE, "banner.html"));
await page.waitForLoadState("networkidle");
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(200);
mkdirSync(path.join(HERE, "posts"), { recursive: true });

// Instagram puts the newest post top-left, so the bottom-right tile is posted first.
const files = [];
for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
  const order = ROWS * COLS - (r * COLS + c);
  const name = `post-${order}-of-6-row${r + 1}-col${c + 1}.png`;
  await page.screenshot({ path: path.join(HERE, "posts", name), clip: { x: c * VIS_W, y: r * TILE_H, width: TILE_W, height: TILE_H } });
  files.push({ r, c, name });
}

// ---------- a preview of how it looks on the profile grid ----------
const gap = 6;
const preview = await browser.newPage({ viewport: { width: COLS * VIS_W + (COLS - 1) * gap, height: ROWS * TILE_H + (ROWS - 1) * gap } });
const tiles = files.map(({ r, c, name }) => `<div style="position:absolute;left:${c * (VIS_W + gap)}px;top:${r * (TILE_H + gap)}px;width:${VIS_W}px;height:${TILE_H}px;overflow:hidden">
  <img src="file://${path.join(HERE, "posts", name)}" style="position:absolute;left:${-BLEED}px;top:0;width:${TILE_W}px;height:${TILE_H}px"></div>`).join("");
// written to a file beside the posts, since a page built from a string can't load local images
writeFileSync(path.join(HERE, ".preview.html"), `<body style="margin:0;background:#fff">${tiles}</body>`);
await preview.goto("file://" + path.join(HERE, ".preview.html"));
await preview.waitForTimeout(300);
await preview.screenshot({ path: path.join(HERE, "grid-preview.png") });
rmSync(path.join(HERE, ".preview.html"));
console.log("wrote", files.length, "posts and grid-preview.png");
await browser.close();
