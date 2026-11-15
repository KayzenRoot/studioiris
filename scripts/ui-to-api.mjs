import {mkdirSync, readFileSync, writeFileSync} from "node:fs";
import path from "node:path";
import {uiToApi} from "../src/workflow/ui-to-api";

function usage() {
  return [
    "Usage: npm run ui-to-api -- <source.ui.json> <output.api.json> [options]",
    "",
    "Options:",
    "  --object-info <file.json>  Use a saved ComfyUI /object_info response",
    "  --enable <node-id>         Enable a bypassed node (repeatable)",
    "  --help                     Show this help",
    "",
    "Without --object-info, fetches /object_info from COMFY_URL or http://127.0.0.1:8188.",
  ].join("\n");
}

async function main() {
  const args = process.argv.slice(2);
  const positional = [];
  const enabled = [];
  let objectInfoPath;
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (arg === "--help" || arg === "-h") {
      console.log(usage());
      return;
    }
    if (arg === "--object-info") {
      objectInfoPath = args[++index];
      if (!objectInfoPath) throw new Error("--object-info requires a JSON file path.");
      continue;
    }
    if (arg === "--enable") {
      const nodeId = args[++index];
      if (!nodeId) throw new Error("--enable requires a node ID.");
      enabled.push(nodeId);
      continue;
    }
    if (arg.startsWith("-")) throw new Error(`Unknown option: ${arg}`);
    positional.push(arg);
  }
  if (positional.length !== 2) throw new Error(usage());

  const inputPath = path.resolve(positional[0]);
  const outputPath = path.resolve(positional[1]);
  const ui = JSON.parse(readFileSync(inputPath, "utf8"));
  let objectInfo;
  if (objectInfoPath) {
    objectInfo = JSON.parse(readFileSync(path.resolve(objectInfoPath), "utf8"));
  } else {
    const comfyBase = process.env.COMFY_URL ?? "http://127.0.0.1:8188";
    const endpoint = new URL("/object_info", `${comfyBase.replace(/\/+$/, "")}/`);
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`ComfyUI /object_info returned HTTP ${response.status} at ${endpoint.origin}.`);
    objectInfo = await response.json();
  }

  const graph = uiToApi(ui, objectInfo, {enable: enabled});
  mkdirSync(path.dirname(outputPath), {recursive: true});
  writeFileSync(outputPath, `${JSON.stringify(graph, null, 2)}\n`, "utf8");
  console.log(`Converted ${Object.keys(graph).length} API nodes to ${path.relative(process.cwd(), outputPath) || path.basename(outputPath)}.`);
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
