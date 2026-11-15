/* Generated compact projection of each native manifest; the server still loads full manifests. */
import {nativeManifestIndex} from "./manifest-index.generated";

/** A workflow as a run asks for it: the id its manifest declares, and that manifest's version. */
export type CapabilityRef = { id: string; version: string };

const versions = new Map<string, string>();
for (const manifest of nativeManifestIndex) versions.set(manifest.id, manifest.version);
const trackedMasks = new Set(nativeManifestIndex.filter(manifest=>manifest.outputContractKind==="source_linked_mask_v1").map(manifest=>manifest.id));

export const isTrackedMaskWorkflow=(id:string):boolean=>trackedMasks.has(id);

/** The id and version to send for a workflow. An id no manifest has throws here, at the screen, rather than
 *  as a rejected run. The id stays as written, so a caller keeps the narrow type of the name it passed. */
export function capability<Id extends string>(id: Id): { id: Id; version: string } {
  const version = versions.get(id);
  if (version === undefined) throw new Error(`No workflow manifest has the id ${id}.`);
  return { id, version };
}

/** Only offer a control when the current pack can admit it. */
export function capabilityHasControl(id:string,control:string):boolean {
  return nativeManifestIndex.some(manifest=>manifest.id===id&&manifest.controls.includes(control));
}
