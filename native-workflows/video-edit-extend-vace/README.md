# Deterministic trim and short VACE forward extension

The version0.2 local route is implemented for short forward continuation. The existing Video → Trim workspace offers **Extend ending** when a ready local VACE worker is present. The server derives the retained context and overlap, starts a durable generation child, drops generated overlap and stitches the exact requested tail into a new asset.

The native graph uses the installed VACE14B FP8 local derivative, first-clip context through `ImageFromBatch`, a zero context mask and native gray/white-mask generation padding. Context controls are server-owned. The recorded profile allows at most 13 generated frames; the default 5-frame overlap adds 8 new frames. The available [evidence record](../../docs/VIDEO-FORWARD-EVIDENCE.md) transcribes the manifest's native/app/SDK run IDs and frame counts; detailed logs and model hash receipts are not included in this checkout.

One fictional creature/cabin/lake fixture was qualified at832×480. Broader motion and seam quality remain open. This is temporal forward continuation; Hub VACE outpainting expands the canvas instead. Backward extension, hidden-scene reconstruction and seamless continuity are unsupported. The generation child is mute; the parent can retain source audio according to its existing audio policy. No model weights are bundled.

