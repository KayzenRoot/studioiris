import {strict as assert} from "node:assert";
import {TOOLS, toolHref, toolOfHash, videoScreenTool} from "../src/team/tool-menus.ts";

const problems = [];
const check = (fn, label) => {
  try { fn(); console.log(`  ok  ${label}`); }
  catch (error) { problems.push(`${label}: ${error.message}`); console.error(`  FAIL ${label}: ${error.message}`); }
};

const tools = new Set(TOOLS.map(item => item.tool));
check(() => assert.equal(tools.size, TOOLS.length), "tool IDs are unique");
for (const item of TOOLS) {
  check(() => assert.equal(toolHref(item.tool), item.href), `${item.tool} tab keeps its declared address`);
  check(() => assert.equal(toolOfHash(item.href), item.tool), `${item.href} resolves to the selected tool`);
}

const routes = [
  ["#video/create", "create", "create"], ["#video/talk", "create", "talk"],
  ["#video/transform", "change", "transform"], ["#openjutsu", "change", "openjutsu"],
  ["#video/trim", "change", "trim"], ["#video/edit", "change", "edit"],
  ["#motion", "change", "motion"], ["#video/enhance", "upscale", "enhance"],
  ["#video/storyboard", "film-studio", "storyboard"], ["#video/keyframes", "film-studio", "storyboard"],
];
for (const [hash, expectedTool, screen] of routes) {
  check(() => assert.equal(toolOfHash(hash), expectedTool), `${hash} has the expected active tab`);
  if (screen) check(() => assert.equal(videoScreenTool(screen), expectedTool), `${screen} screen and tab agree`);
}

console.log(`\nlink audit: ${problems.length ? `${problems.length} failure(s)` : "clean"}`);
process.exit(problems.length ? 1 : 0);
