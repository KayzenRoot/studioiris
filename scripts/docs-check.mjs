import {existsSync, readFileSync, readdirSync} from "node:fs";
import path from "node:path";

const root = process.cwd();
const ignored = new Set(["node_modules", "dist", ".git", ".comfyfield"]);
const markdown = [];
function walk(directory) {
  for (const entry of readdirSync(directory, {withFileTypes: true})) {
    if (entry.isDirectory()) {
      if (!ignored.has(entry.name)) walk(path.join(directory, entry.name));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
      markdown.push(path.join(directory, entry.name));
    }
  }
}
walk(root);

const packageJson = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
const inventory = readFileSync(path.join(root, "docs", "LICENSE-INVENTORY.md"), "utf8");
const inventoriedIds = new Set(inventory.split(/\r?\n/)
  .filter(line => line.startsWith("|"))
  .map(line => line.split("|")[1]?.trim())
  .filter(value => value && /^[a-z0-9]+(?:[-_.][a-z0-9]+)*$/.test(value)));
const failures = [];
let checkedLinks = 0, checkedCommands = 0;
const patterns = [
  /!?\[[^\]]*\]\(\s*(?:<([^>]+)>|([^\s)]+))/g,
  /^\s*\[[^\]]+\]:\s*(?:<([^>]+)>|(\S+))/gm,
];

for (const file of markdown) {
  const source = readFileSync(file, "utf8");
  for (const pattern of patterns) {
    pattern.lastIndex = 0;
    for (const match of source.matchAll(pattern)) {
      let target = (match[1] ?? match[2] ?? "").trim().replace(/&amp;/g, "&");
      if (!target || /^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(target) || target.startsWith("#")) continue;
      target = target.split(/[?#]/, 1)[0];
      if (!target) continue;
      try { target = decodeURIComponent(target); } catch { /* keep the original path */ }
      const resolved = target.startsWith("/")
        ? path.resolve(root, "public", `.${target}`)
        : path.resolve(path.dirname(file), target);
      checkedLinks++;
      if (!existsSync(resolved)) failures.push(`${path.relative(root, file)}: missing link target ${target}`);
    }
  }
  for (const match of source.matchAll(/\bnpm\s+run\s+([A-Za-z0-9:_-]+)/g)) {
    checkedCommands++;
    if (!packageJson.scripts?.[match[1]]) failures.push(`${path.relative(root, file)}: npm run ${match[1]} is not defined`);
  }
}

const workflows = readdirSync(path.join(root, "native-workflows"), {withFileTypes: true}).filter(entry => entry.isDirectory());
let inventoried = 0, manifestCount = 0;
for (const folder of workflows) {
  const manifestPath = path.join(root, "native-workflows", folder.name, "manifest.json");
  if (!existsSync(manifestPath)) continue;
  manifestCount++;
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const hasEntry = manifest.id && (inventoriedIds.has(manifest.id) || inventory.includes(`\`${manifest.id}\``));
  if (!hasEntry) failures.push(`docs/LICENSE-INVENTORY.md: missing workflow ${manifest.id ?? folder.name}`);
  else inventoried++;
}

console.log(`Markdown: ${markdown.length} files; ${checkedLinks} local links; ${checkedCommands} npm commands; ${inventoried}/${manifestCount} workflow licenses inventoried.`);
for (const failure of failures) console.error(`  FAIL ${failure}`);
console.log(failures.length ? `\ndocs check: ${failures.length} failure(s)` : "\ndocs check: clean");
process.exit(failures.length ? 1 : 0);
