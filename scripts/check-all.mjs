// Read-only checks in one command. Add --live to include the ComfyUI smoke run and
// the worker create/probe/delete check, which writes a temporary row to the local DB.
import {spawnSync} from "node:child_process";

const steps = [
  ["doctor", "preflight: Node, licence, build, config, models, ComfyUI, PostgreSQL"],
  ["audit:deps", "production and development dependency advisories"],
  ["test", "unit regression checks"],
  ["server:check", "server TypeScript types"],
  ["manifest-index:check", "compact browser workflow index matches the manifests"],
  ["audit:workflows", "workflow IDs, templates and live ComfyUI readiness"],
  ["docs:check", "every documented command, path, link and image exists"],
  ["audit:assets", "every asset the UI refers to is served"],
  ["audit:links", "every mode opens the same by address as by tab"],
  ["audit:claims", "the parity counts match the live catalogue"],
  ["audit:removal", "nothing can be created without a way to remove it"],
  ["demo:check", "the demo outputs and reel are in place"],
  ["audit:ds", "feature CSS follows design-system controls"],
];
if (process.argv.includes("--live")) {
  steps.push(["smoke", "the worker answers and can run video pipelines"]);
  steps.push(["audit:workers", "a temporary worker can be added, probed and removed"]);
}

const npmCli = process.env.npm_execpath;
if (!npmCli) throw new Error("Run this check through `npm run check:all` so npm can resolve its own CLI.");
const results = [];
for (const [script, what] of steps) {
  process.stdout.write(`\n── npm run ${script} — ${what}\n`);
  const run = spawnSync(process.execPath, [npmCli, "run", script], {stdio: "inherit"});
  results.push({script, code: run.status ?? 1});
}

console.log("\n── verdict");
for (const row of results) console.log(`  ${row.code === 0 ? "ok  " : "FAIL"} npm run ${row.script}`);
const failed = results.filter(row => row.code !== 0);
console.log(failed.length ? `\n${failed.length} of ${results.length} checks failed.` : `\nAll ${results.length} checks passed.`);
process.exit(failed.length ? 1 : 0);
