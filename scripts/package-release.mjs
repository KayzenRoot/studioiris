import {createHash} from "node:crypto";
import {existsSync, lstatSync, mkdirSync, mkdtempSync, readFileSync, renameSync, rmSync, writeFileSync} from "node:fs";
import path from "node:path";
import {spawnSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const releaseDir = path.join(root, "release");
if (existsSync(releaseDir) && lstatSync(releaseDir).isSymbolicLink()) {
  throw new Error("Refusing to package into a release directory that is a symbolic link.");
}
mkdirSync(releaseDir, {recursive: true});
const stagingDir = mkdtempSync(path.join(releaseDir, ".pack-"));

try {
  const npmCli = process.env.npm_execpath;
  if (!npmCli) throw new Error("Run this command through `npm run package:release` so npm can resolve its own CLI.");
  const packed = spawnSync(process.execPath, [npmCli, "pack", "--pack-destination", stagingDir, "--json"], {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
  });
  if (packed.error) throw packed.error;
  if (packed.status !== 0) throw new Error((packed.stderr || packed.stdout || "npm pack failed").trim());

  const metadataStart = packed.stdout.indexOf("[");
  if (metadataStart < 0) throw new Error("npm pack did not return package metadata.");
  const [metadata] = JSON.parse(packed.stdout.slice(metadataStart));
  if (!metadata?.filename || !Array.isArray(metadata.files)) throw new Error("npm pack returned incomplete package metadata.");

  const unsafePaths = metadata.files.map(file => file.path).filter(file =>
    /(?:^|\/)(?:\.comfyfield|node_modules|dist|release|backups|renders)(?:\/|$)/i.test(file)
    || /(?:^|\/)(?:app\.env|\.env|auth\.json|credentials\.json)$/i.test(file)
    || /\.(?:pem|key)$/i.test(file),
  );
  if (unsafePaths.length) throw new Error(`Package contains excluded local or secret files: ${unsafePaths.join(", ")}`);

  const pkg = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.(\d{3})Z$/, "$1Z");
  const filename = `iris-studio-${pkg.version}-${stamp}.tar.gz`;
  const archivePath = path.join(releaseDir, filename);
  const checksumPath = `${archivePath}.sha256`;
  if (existsSync(archivePath) || existsSync(checksumPath)) throw new Error(`Release output already exists: ${filename}`);

  const stagedArchive = path.join(stagingDir, metadata.filename);
  const digest = createHash("sha256").update(readFileSync(stagedArchive)).digest("hex");
  renameSync(stagedArchive, archivePath);
  writeFileSync(checksumPath, `${digest}  ${filename}\n`, {flag: "wx"});
  console.log(`Created ${path.relative(root, archivePath)} (${(metadata.size / 1024 / 1024).toFixed(1)} MB; ${metadata.entryCount} files).`);
  console.log(`SHA-256 ${digest}`);
} finally {
  rmSync(stagingDir, {recursive: true, force: true});
}
