# NVIDIA VFX setup for ComfyUI

IrisStudio's optional `nvidia-vfx-upscale` workflow uses Comfy-Org's RTX Video
Super Resolution node. Its graph and integration are in this repository; the
custom-node pack and NVIDIA runtime are installed separately in ComfyUI. No
NVIDIA runtime or model weights are redistributed here.

## Requirements

- An NVIDIA RTX GPU and a CUDA-enabled ComfyUI environment. The upstream pack
  currently requires PyTorch built with CUDA 13.0 or newer; CPU-only and
  non-NVIDIA execution are unsupported.
- ComfyUI with the video nodes named by the workflow manifest, including
  `LoadVideo`, `GetVideoComponents`, `CreateVideo` and `SaveVideo`.
- `ComfyUI_Nvidia_VFX_Nodes` at the reviewed commit `38d790d` (project version
  `0.2.1`) and its `nvidia-vfx` runtime installed into the same Python
  environment that starts ComfyUI.

Frame Generation's RTX 40-series requirement does not apply to this workflow;
this graph uses Video Super Resolution only. Resolution, scale, VRAM and
supported GPU behavior still depend on the NVIDIA runtime and the installed
ComfyUI stack.

## Install

Stop ComfyUI first. In PowerShell, replace the placeholders with the actual
ComfyUI directory and the Python executable used by that installation:

```powershell
Set-Location '<ComfyUI>\custom_nodes'
git clone https://github.com/Comfy-Org/ComfyUI_Nvidia_VFX_Nodes.git
Set-Location .\ComfyUI_Nvidia_VFX_Nodes
git checkout 38d790d
& '<ComfyUI Python>' -m pip install -r requirements.txt
```

For a portable Windows install, `<ComfyUI Python>` is commonly the bundled
`python_embeded\python.exe`; use the environment that actually launches your
ComfyUI if it differs. Restart ComfyUI after installation.

The NVIDIA `nvidia-vfx` runtime is proprietary (`LicenseRef-NvidiaProprietary`)
and must be obtained from NVIDIA's package index under its own terms. Do not
bundle or redistribute it with IrisStudio. The custom-node source is Apache-2.0.

## Check the install

Open `http://127.0.0.1:8188/object_info` (adjust the port if needed) and confirm
that `RTXVideoSuperResolution` is listed. Then run ComfyUI's example VFX graph
before trying IrisStudio. The IrisStudio route also needs that node in the
worker's approved node allowlist before it can queue.

This checkout records that the node package and runtime imported successfully
in ComfyUI 0.37.0, but the workflow itself has not had a GPU run. The local
ComfyUI endpoint was unavailable during the latest audit, so live node
discovery and output qualification remain pending.

See the [upstream installation and requirements](https://github.com/Comfy-Org/ComfyUI_Nvidia_VFX_Nodes)
and the [license inventory](LICENSE-INVENTORY.md) for the declared component
terms.
