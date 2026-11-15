import type {CapabilityBundle} from "../src/capabilities/types";

/** Capabilities whose inventory explicitly requires non-commercial terms or further rights review. */
export const COMMERCIAL_RESTRICTED_CAPABILITY_IDS = new Set([
  "qwen-image-21-masked-edit", "qwen-image-21-edit", "qwen-image-21-angles", "qwen-image-21-t2i",
  "fibo2-edit", "flux2-klein-preserve-edit", "replace-scene-anchor", "replace-scene-anchor-flux",
  "recavsr-video-upscale", "hunyuan3d-21", "trellis2-image-to-3d",
  "h3-t2v", "h3-i2v", "h3-flf2v", "h3-effects", "h3-object-swap", "h3-object-swap-hyperflow",
  "h3-object-swap-hyperflow-area", "openjutsu-h3-swap", "openjutsu-h3-swap-hyperflow",
  "openjutsu-h3-advanced", "openjutsu-h3-advanced-hyperflow", "minimax-h3-video",
  "cloud-h3-character-swap", "cloud-kling-omni-edit", "cloud-seedance2-reference",
  "previs-to-video", "replace-anchor-still", "replace-from-still", "instantid-sdxl-character",
  "sam3-image-segment", "sam31-video-mask", "sam31-video-background-mask", "sam31-video-point-mask",
  "local-jutsu-replace", "image-face-mosaic-sam3", "scene-mesh-moge",
  "bg-remove-birefnet", "video-bg-remove-birefnet", "film-frame-interpolation", "upscale-image-esrgan",
]);

/** Production defaults to commercial-safe routing. An explicit local opt-out is never accepted in production. */
export function commercialModeEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  const configured = env.IRISSTUDIO_COMMERCIAL_MODE?.trim();
  if (configured && configured !== "0" && configured !== "1") {
    throw new Error("IRISSTUDIO_COMMERCIAL_MODE must be 0 or 1");
  }
  if (env.NODE_ENV === "production" && configured === "0") {
    throw new Error("IRISSTUDIO_COMMERCIAL_MODE cannot be disabled in production");
  }
  return configured === "1" || (env.NODE_ENV === "production" && configured !== "0");
}

/** In commercial mode, expose only implemented direct-provider routes and never bundled model workflows. */
export function commercialCatalogue(bundles: CapabilityBundle[], enabled: boolean): CapabilityBundle[] {
  if (!enabled) return bundles;
  const available: CapabilityBundle[] = [];
  for (const bundle of bundles) {
    if (COMMERCIAL_RESTRICTED_CAPABILITY_IDS.has(bundle.manifest.id)) continue;
    const routes = bundle.manifest.routes.filter(route => route.execution === "direct_provider" && route.implementation === "implemented");
    if (!routes.length) continue;
    available.push(routes.length === bundle.manifest.routes.length
      ? bundle
      : {...bundle, manifest: {...bundle.manifest, routes}});
  }
  return available;
}
