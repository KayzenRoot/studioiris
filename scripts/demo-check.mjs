import {existsSync, readFileSync} from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];
let checked = 0;
function checkPublicAsset(url, from) {
  const local = path.resolve(root, "public", `.${url}`);
  checked++;
  if (!existsSync(local)) failures.push(`${from}: missing ${url}`);
}

const examples = JSON.parse(readFileSync(path.join(root, "public", "examples", "index.json"), "utf8"));
for (const [key, file] of Object.entries(examples)) checkPublicAsset(`/examples/${file}`, `example index:${key}`);

const pool = JSON.parse(readFileSync(path.join(root, "public", "examples", "pool.json"), "utf8"));
for (const file of pool.images ?? []) checkPublicAsset(`/examples/${file}`, "demo image pool");
for (const file of pool.videos ?? []) checkPublicAsset(file, "demo video pool");

const reelsSource = readFileSync(path.join(root, "src", "team", "reels.ts"), "utf8");
for (const match of reelsSource.matchAll(/["'`](\/(?:examples|reels)\/[^"'`$]+)["'`]/g)) {
  checkPublicAsset(match[1], "feature reel map");
}
for (const name of ["reshoot", "effects-lab", "copy-moves", "film-studio", "block-shot", "swap-thing", "new-look", "video-studio", "ad-studio"])
  checkPublicAsset(`/examples/promo/${name}.mp4`, "promo reel set");

for (let number = 1; number <= 5; number++) {
  checkPublicAsset(`/examples/squarehead/jutsu-0${number}.mp4`, "OpenJutsu demo reel");
  checkPublicAsset(`/examples/squarehead/jutsu-0${number}.webp`, "OpenJutsu demo still");
}
for (let number = 1; number <= 4; number++) {
  checkPublicAsset(`/examples/showcase/result-${number}.mp4`, "OpenJutsu showcase result");
  checkPublicAsset(`/examples/showcase/original-${number}.mp4`, "OpenJutsu showcase original");
  checkPublicAsset(`/examples/showcase/source-${number}.mp4`, "OpenJutsu showcase source");
  checkPublicAsset(`/examples/showcase/character-${number}.png`, "OpenJutsu showcase character");
}

console.log(`Demo assets checked: ${checked}; missing: ${failures.length}.`);
for (const failure of failures) console.error(`  FAIL ${failure}`);
console.log(failures.length ? "\ndemo check: incomplete" : "\ndemo check: complete");
process.exit(failures.length ? 1 : 0);
