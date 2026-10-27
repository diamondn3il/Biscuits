// Renders episodes of The Biscuit Tin to Instagram-ready MP4s, with a cover for each.
//
//   node render.mjs [biscuit-id ...]        (no ids: the whole cast)
//
// Needs Playwright (with Chromium), ffmpeg with libx264, and Python 3. Set FFMPEG to use a
// specific ffmpeg binary. Output goes to videos/<id>.mp4 and covers/<id>.png beside this file.
import { chromium } from "playwright";
import { spawn, spawnSync } from "child_process";
import { mkdirSync, writeFileSync, rmSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const FFMPEG = process.env.FFMPEG || "ffmpeg";
const PYTHON = process.env.PYTHON || "python3";
const FPS = 30;
const TMP = path.join(HERE, ".render-tmp");
mkdirSync(path.join(HERE, "videos"), { recursive: true });
mkdirSync(path.join(HERE, "covers"), { recursive: true });
mkdirSync(TMP, { recursive: true });

const run = (cmd, args) => {
  const r = spawnSync(cmd, args, { stdio: ["ignore", "inherit", "inherit"] });
  if (r.status !== 0) throw new Error(`${cmd} failed`);
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
const url = (id) => "file://" + path.join(HERE, "engine.html") + (id ? "?ep=" + id : "");
await page.goto(url());
const ids = process.argv.slice(2).length ? process.argv.slice(2) : await page.evaluate(() => CAST.map((c) => c.id));

for (const id of ids) {
  const started = Date.now();
  const errors = [];
  page.removeAllListeners("pageerror");
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(url(id));
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);
  if (errors.length) throw new Error(`${id}: ${errors.join("; ")}`);
  const { duration, events, index } = await page.evaluate(() => ({ duration: DURATION, events: EPISODE_EVENTS, index: EPISODE.index }));

  // frames, piped straight into the encoder
  const silent = path.join(TMP, id + ".mp4");
  const ff = spawn(FFMPEG, ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-i", "-",
    "-c:v", "libx264", "-preset", "slow", "-crf", "21", "-pix_fmt", "yuv420p", silent], { stdio: ["pipe", "inherit", "inherit"] });
  const frames = Math.round(duration * FPS);
  for (let f = 0; f < frames; f++) {
    await page.evaluate((t) => render(t), f / FPS);
    const buf = await page.screenshot({ type: "jpeg", quality: 95, clip: { x: 0, y: 0, width: 1080, height: 1920 } });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
  }
  ff.stdin.end();
  await new Promise((r) => ff.on("close", r));

  // soundtrack from this episode's cues, levelled to a standard loudness, then mux and grab a cover
  const cues = path.join(TMP, id + ".json"), wav = path.join(TMP, id + ".wav");
  writeFileSync(cues, JSON.stringify({ index, events }));
  run(PYTHON, [path.join(HERE, "soundtrack.py"), cues, wav]);
  const out = path.join(HERE, "videos", id + ".mp4");
  run(FFMPEG, ["-y", "-loglevel", "error", "-i", silent, "-i", wav, "-c:v", "copy", "-af", "loudnorm=I=-16:TP=-1.5:LRA=11,alimiter=limit=0.84:level=false", "-c:a", "aac", "-b:a", "160k", "-ar", "44100", "-t", String(duration), "-movflags", "+faststart", out]);
  run(FFMPEG, ["-y", "-loglevel", "error", "-ss", "2.2", "-i", out, "-frames:v", "1", path.join(HERE, "covers", id + ".png")]);
  console.log(`${id}: done in ${((Date.now() - started) / 1000).toFixed(0)}s`);
}
await browser.close();
rmSync(TMP, { recursive: true, force: true });
