# Video background editing

The `sam31-video-background-mask` workflow tracks a described subject with the
installed SAM 3.1 graph, inverts its mask, and sends the editable background to
the existing VACE masked editor. The user reviews decoded mask frames and
explicitly approves the mask before a generation is queued.

## Safeguards and supported input

- The mask is linked to the source video hash, geometry, timing, checkpoint and
  producing run. Manual corrections, cancellation and idempotent recovery stay
  available.
- Before publication, every decoded frame must contain both protected and
  editable pixels. This rejects an empty or fully protected mask; it does not
  establish that the semantic boundary is correct. Inspect the subject edges,
  occlusions and selected objects yourself.
- The documented input envelope is 16 FPS, 17–81 frames, and up to 832×480
  landscape or 480×832 portrait. Output is muted. Video encoding can change
  pixels outside the mask, so pixel-exact preservation is not promised.

## Qualification status

The workflow manifest records its derivation from the pinned SAM 3.1 tracker
and the mandatory source-linked review gate. It does not contain a separate
qualified output receipt. No live ComfyUI/GPU qualification was possible during
the latest audit; treat execution and visual quality as unverified until a
worker run is recorded and reviewed.

SAM 3.1 weights are external and their published terms must be checked before
commercial or hosted use. The production commercial catalogue keeps local
ComfyUI workflows unavailable; the MIT license on IrisStudio does not grant
rights to those weights.
