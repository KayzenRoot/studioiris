import {describe, expect, it} from "vitest";
import type {CapabilityBundle} from "../src/capabilities/types";
import {commercialCatalogue, commercialModeEnabled} from "../server/commercial-availability";

const bundle = (id:string, routes:unknown[]):CapabilityBundle => ({manifest:{id,routes} as never} as CapabilityBundle);
const direct = {id:"remote",execution:"direct_provider",implementation:"implemented"};
const local = {id:"local",execution:"local_comfy",implementation:"implemented"};

describe("commercial catalogue", () => {
  it("keeps the full catalogue in local development", () => {
    const input=[bundle("qwen-image-21-edit",[local]),bundle("router-image",[direct])];
    expect(commercialCatalogue(input,false)).toBe(input);
  });

  it("exposes only approved direct-provider routes in commercial mode", () => {
    const input=[
      bundle("qwen-image-21-edit",[direct]),
      bundle("local-pack",[local]),
      bundle("mixed-pack",[direct,local]),
      bundle("router-image",[direct]),
    ];
    const output=commercialCatalogue(input,true);
    expect(output.map(item=>item.manifest.id)).toEqual(["mixed-pack","router-image"]);
    expect(output[0].manifest.routes).toEqual([direct]);
  });

  it("defaults production to commercial mode and refuses the unsafe override", () => {
    expect(commercialModeEnabled({NODE_ENV:"production"} as NodeJS.ProcessEnv)).toBe(true);
    expect(commercialModeEnabled({NODE_ENV:"development"} as NodeJS.ProcessEnv)).toBe(false);
    expect(()=>commercialModeEnabled({NODE_ENV:"production",IRISSTUDIO_COMMERCIAL_MODE:"0"} as NodeJS.ProcessEnv)).toThrow(/cannot be disabled/);
  });
});
