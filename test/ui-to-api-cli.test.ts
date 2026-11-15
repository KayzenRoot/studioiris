import {execFileSync} from "node:child_process";
import {mkdtempSync, readFileSync, rmSync, writeFileSync} from "node:fs";
import os from "node:os";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {describe, expect, it} from "vitest";

describe("ui-to-api CLI", () => {
  it("converts a saved UI graph with a supplied object_info file", () => {
    const scratch = mkdtempSync(path.join(os.tmpdir(), "iris-ui-to-api-"));
    const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
    const sourcePath = path.join(scratch, "source.ui.json");
    const infoPath = path.join(scratch, "object-info.json");
    const outputPath = path.join(scratch, "nested", "output.api.json");
    try {
      writeFileSync(sourcePath, JSON.stringify({nodes: [{id: 1, type: "StringNode", widgets_values: ["hello"]}], links: []}));
      writeFileSync(infoPath, JSON.stringify({
        StringNode: {
          input: {required: {text: ["STRING", {default: ""}]}},
          input_order: {required: ["text"]},
          output: ["STRING"],
        },
      }));
      execFileSync(process.execPath, ["--import", "tsx", "scripts/ui-to-api.mjs", sourcePath, outputPath, "--object-info", infoPath], {
        cwd: projectRoot,
        encoding: "utf8",
        timeout: 15000,
      });
      const graph = JSON.parse(readFileSync(outputPath, "utf8"));
      expect(graph["1"].class_type).toBe("StringNode");
      expect(graph["1"].inputs.text).toBe("hello");
    } finally {
      rmSync(scratch, {recursive: true, force: true});
    }
  }, 20000);
});
