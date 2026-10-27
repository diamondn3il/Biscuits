// Writes README.md for the cast: a posting plan and a ready-to-paste caption for every episode.
//   node make-guide.mjs
import { readFileSync, writeFileSync } from "fs";
const window = {};
eval(readFileSync(new URL("../../../biscuits.js", import.meta.url), "utf8"));
eval(readFileSync(new URL("./characters.js", import.meta.url), "utf8"));
const B = Object.fromEntries(window.BISCUITS.map((b) => [b.id, b]));
const GAGS = { dunk: "Dunk test", stamp: "The big reveal", party: "Party", shrink: "The shrink test" };
const common = ["BritishBiscuits", "Biscuits", "TeaTime", "TeaAndBiscuits", "BiscuitTin"];

let md = `# The Biscuit Tin cast

A character and a 16-second Instagram Reel for every biscuit on the site: these 25, plus
Reggie the Rich Tea in \`../reggie/\`. Each Reel is 1080 × 1920 at 30fps with an original
soundtrack (no music licensing needed), and keeps every word inside Instagram's safe area.

![The cast](cast.png)

## Posting

- **Video:** \`videos/<biscuit>.mp4\`. Post it as a Reel.
- **Cover:** \`covers/<biscuit>.png\`. Choose it under Edit cover → Add from camera roll.
- **Caption:** copy it from below.
- **Order:** start with Reggie, then one a day in the order below. That's nearly a month of
  daily Reels, with the gags mixed so no two in a row are the same kind.

| # | Character | Biscuit | Gag |
|---|-----------|---------|-----|
| 1 | Reggie | Rich Tea | Dunk test (it doesn't go well) |
`;
// Interleave the gags: always take the next character whose kind of gag differs from the last
// one posted (Reggie, a dunk test, goes first); fall back to cast order when only one kind is left.
const kind = (c) => c.gag.type;
const left = [...window.CAST], order = [];
let last = "dunk";
while (left.length) {
  // the kind with the most episodes still waiting goes next, unless it was just posted
  const counts = {};
  left.forEach((c) => (counts[kind(c)] = (counts[kind(c)] || 0) + 1));
  const kinds = Object.keys(counts).filter((k) => k !== last).sort((a, b) => counts[b] - counts[a]);
  const want = kinds[0] || last;
  const i = left.findIndex((c) => kind(c) === want);
  order.push(left.splice(i, 1)[0]);
  last = want;
}
order.forEach((c, i) => {
  const g = c.gag.type === "dunk" ? (c.gag.outcome === "never" ? "Refuses to dunk" : c.gag.outcome === "fail" ? "Dunk test (it doesn't go well)" : `Dunk test (${c.gag.secs} seconds)`) : GAGS[c.gag.type] + (c.gag.text ? `: "${c.gag.text}"` : "");
  md += `| ${i + 2} | ${c.name} | ${B[c.id].name} | ${g} |\n`;
});
md += `\n## Captions\n`;
order.forEach((c, i) => {
  const tags = [...c.tags, ...common].map((t) => "#" + t).join(" ");
  md += `\n### ${i + 2}. ${c.name} the ${B[c.id].name}\n\n\`videos/${c.id}.mp4\` · \`covers/${c.id}.png\`\n\n\`\`\`\n${c.caption}\n\nEvery biscuit, with its history and a recipe, is on the site. Link in bio 🍪\n\n${tags}\n\`\`\`\n`;
});
md += `
## Changing or adding episodes

Everything comes from three files:

- \`characters.js\` holds the cast: name, shoes, accessory, mood, lines, gag and caption for each
  biscuit. Edit a line or a caption here.
- \`engine.html\` draws an episode. Open \`engine.html?ep=<biscuit id>\` in a browser to watch one on
  a loop. Characters are drawn from the site's own biscuit illustrations in \`art.js\`.
- \`soundtrack.py\` synthesises each episode's sound from the cues the engine lists.

To rebuild videos, run \`node render.mjs\` for the whole cast, or \`node render.mjs hobnob jaffa-cake\`
for a few. It needs Playwright, ffmpeg and Python 3. Then run \`node make-guide.mjs\` to refresh this
page.

Keep new lines under about 45 characters so they fit the speech bubble. Words must stay between
320px and 1500px from the top and left of 940px, or Instagram's header, caption and buttons will
cover them.
`;
writeFileSync(new URL("./README.md", import.meta.url), md);
console.log("README.md written for", order.length + 1, "characters");
