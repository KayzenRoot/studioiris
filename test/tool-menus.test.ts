import {describe, expect, it} from "vitest";
import {TOOLS, toolHref, toolOfHash, videoScreenTool} from "../src/team/tool-menus";

describe("tool addresses", () => {
  it("marks each top-bar address as its own tool", () => {
    for (const item of TOOLS) {
      expect(toolHref(item.tool)).toBe(item.href);
      expect(toolOfHash(item.href)).toBe(item.tool);
    }
  });

  it("keeps video screens and their top-bar tools in sync", () => {
    const cases: Array<[string, string, string]> = [
      ["#video/create", "create", "create"], ["#video/talk", "create", "talk"],
      ["#video/transform", "change", "transform"], ["#openjutsu", "change", "openjutsu"],
      ["#video/trim", "change", "trim"], ["#video/edit", "change", "edit"],
      ["#motion", "change", "motion"], ["#video/enhance", "upscale", "enhance"],
      ["#video/storyboard", "film-studio", "storyboard"],
    ];
    for (const [hash, tool, screen] of cases) {
      expect(toolOfHash(hash)).toBe(tool);
      expect(videoScreenTool(screen)).toBe(tool);
    }
  });
});
