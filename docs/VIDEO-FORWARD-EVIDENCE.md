# VACE forward-extension evidence record

This page transcribes the historical run facts currently declared in
`native-workflows/video-edit-extend-vace/manifest.json`. The original detailed
logs, media outputs and conversion hash receipt are not included here, so this
is a record of manifest declarations rather than an independently reproducible
qualification package.

## Recorded runs

| Date / reference | Manifest declaration |
| --- | --- |
| 2026-10-22 native graph | First-clip context, zero context mask, gray/white generation padding, 50 steps and shift 16. |
| ComfyUI prompt `4d9ffdd4-c166-431f-b890-c0c1bed710df` | 832×480, 13 frames, 16 FPS. |
| Isolated app job `0bce0094-f05c-4fcc-91cf-deb8333bcea7`; SDK run `a6c9d225-b883-442c-b367-975c36fc7293` | The manifest says the job survived a service restart and produced 24 frames: 16 retained plus 8 generated. |

The manifest describes a one-worker RTX 4090 profile at 832×480 and up to 13
generated frames. The UI defaults to a five-frame overlap, adding eight new
frames. This is a single recorded configuration, not a benchmark, quality
guarantee, general hardware guarantee or hosted-service qualification.

## Model provenance and limits

The workflow names the Comfy-Org Wan 2.1 VACE repackaged source revision
`123acf1cc74bccbb9bfff8ac1ee72edc08c2341d` and a 17,342,189,824-byte local FP8
derivative. The current manifest does not include source and converted-file
SHA-256 values, nor the original conversion/runtime logs. Those receipts must
be recovered and attached before claiming byte-level conversion provenance.

Hosted coverage remains planned. The upstream model terms and the installed
ComfyUI/FFmpeg licenses remain separate from this repository's MIT grant. This
historical functional record does not authorize redistribution or commercial
use of third-party components.
