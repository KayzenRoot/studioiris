import {existsSync, readFileSync, readdirSync, writeFileSync} from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const workflowDir = path.join(root, "native-workflows");
const outputPath = path.join(root, "src", "capabilities", "manifest-index.generated.ts");
const entries = [];
for (const folder of readdirSync(workflowDir, {withFileTypes: true}).filter(entry => entry.isDirectory())) {
  const manifestPath = path.join(workflowDir, folder.name, "manifest.json");
  if (!existsSync(manifestPath)) continue;
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  if (!manifest.id || !manifest.version) throw new Error(`${path.relative(root, manifestPath)} needs an id and version.`);
  entries.push({
    id: manifest.id,
    version: manifest.version,
    controls: (manifest.controls ?? []).map(control => control.id).filter(Boolean).sort(),
    outputContractKind: manifest.outputContract?.kind ?? null,
  });
}
entries.sort((left, right) => left.id < right.id ? -1 : left.id > right.id ? 1 : 0);
if (new Set(entries.map(entry => entry.id)).size !== entries.length) throw new Error("Native workflow manifest IDs must be unique.");

const expected = [
  "// Generated from native-workflows/*/manifest.json by scripts/capability-index.mjs.",
  "// Keep the browser lookup small; the server remains the source of full manifests.",
  "export const nativeManifestIndex: ReadonlyArray<{ id: string; version: string; controls: readonly string[]; outputContractKind: string | null }> = ",
  `${JSON.stringify(entries, null, 2)};`,
  "",
].join("\n");

if (process.argv.includes("--check")) {
  if (!existsSync(outputPath) || readFileSync(outputPath, "utf8") !== expected) {
    console.error("Native workflow lookup index is stale. Run `npm run manifest-index:build`.");
    process.exitCode = 1;
  } else {
    console.log(`Native workflow lookup index is current (${entries.length} manifests).`);
  }
} else {
  if (!existsSync(outputPath) || readFileSync(outputPath, "utf8") !== expected) writeFileSync(outputPath, expected, "utf8");
  console.log(`Generated compact browser lookup for ${entries.length} native workflow manifests.`);
}
