# Offloading to a rented GPU

A worker is just an HTTP(S) origin, so a ComfyUI that runs elsewhere can take the heavy work
and the free-RAM gate reads **that** machine. This page lists what the remote box needs,
generated from the bundled workflow manifests — the models and third-party packs are the whole
list, and everything else is core ComfyUI.

## 1. Point the app at it

```bash
npm run worker:remote add "Rented 4090" https://<pod>-8188.proxy.runpod.net
npm run worker:remote probe <workerId>     # names every capability that is not ready, and why
```

Then choose that worker in any panel's **Worker** row. Keep the local worker beside it and pick
per run, or `npm run worker:remote point <origin>` to make the remote one the default.

## 2. Base image

**ComfyUI 0.37.0** (or another version that provides the same core nodes). Beyond that, only
these third-party pieces are needed:

- Comfy Cloud needs the ComfyUI node CheckpointLoaderSimple.  
  <sub>needed by `sam3-image-segment`</sub>
- Comfy Cloud needs the ComfyUI node CLIPLoader.  
  <sub>needed by `wan22-fun-camera`</sub>
- Comfy Cloud needs the ComfyUI node CLIPTextEncode.  
  <sub>needed by `wan22-fun-camera`</sub>
- Comfy Cloud needs the ComfyUI node CreateVideo.  
  <sub>needed by `wan22-fun-camera`</sub>
- Comfy Cloud needs the ComfyUI node GetVideoComponents.  
  <sub>needed by `nvidia-vfx-upscale`</sub>
- Comfy Cloud needs the ComfyUI node KSamplerAdvanced.  
  <sub>needed by `wan22-fun-camera`</sub>
- Comfy Cloud needs the ComfyUI node LoadImage.  
  <sub>needed by `wan22-fun-camera`</sub>
- Comfy Cloud needs the ComfyUI node LoadVideo.  
  <sub>needed by `nvidia-vfx-upscale`</sub>
- Comfy Cloud needs the ComfyUI node MaskToImage.  
  <sub>needed by `sam3-image-segment`</sub>
- Comfy Cloud needs the ComfyUI node ModelSamplingSD3.  
  <sub>needed by `wan22-fun-camera`</sub>
- Comfy Cloud needs the ComfyUI node RTXVideoSuperResolution.  
  <sub>needed by `nvidia-vfx-upscale`</sub>
- Comfy Cloud needs the ComfyUI node SAM3_Detect.  
  <sub>needed by `sam3-image-segment`</sub>
- Comfy Cloud needs the ComfyUI node SaveImage.  
  <sub>needed by `sam3-image-segment`</sub>
- Comfy Cloud needs the ComfyUI node SaveVideo.  
  <sub>needed by `wan22-fun-camera`</sub>
- Comfy Cloud needs the ComfyUI node UNETLoader.  
  <sub>needed by `wan22-fun-camera`</sub>
- Comfy Cloud needs the ComfyUI node VAEDecode.  
  <sub>needed by `wan22-fun-camera`</sub>
- Comfy Cloud needs the ComfyUI node VAELoader.  
  <sub>needed by `wan22-fun-camera`</sub>
- Comfy Cloud needs the ComfyUI node WanCameraEmbedding.  
  <sub>needed by `wan22-fun-camera`</sub>
- Comfy Cloud needs the ComfyUI node WanCameraImageToVideo.  
  <sub>needed by `wan22-fun-camera`</sub>
- Comfy Cloud needs the core node BasicGuider.  
  <sub>needed by `cloud-h3-character-swap`</sub>
- Comfy Cloud needs the core node BasicScheduler.  
  <sub>needed by `cloud-h3-character-swap`</sub>
- Comfy Cloud needs the core node CLIPLoader.  
  <sub>needed by `cloud-h3-character-swap`</sub>
- Comfy Cloud needs the core node CreateVideo.  
  <sub>needed by `cloud-h3-character-swap`</sub>
- Comfy Cloud needs the core node GetVideoComponents.  
  <sub>needed by `cloud-h3-character-swap`</sub>
- Comfy Cloud needs the core node ImageCropToMask.  
  <sub>needed by `scail2-character-replace`</sub>
- Comfy Cloud needs the core node ImageToMask.  
  <sub>needed by `scail2-character-replace`</sub>
- Comfy Cloud needs the core node KSamplerSelect.  
  <sub>needed by `cloud-h3-character-swap`</sub>
- Comfy Cloud needs the core node LoadImage.  
  <sub>needed by `cloud-seedance2-reference`</sub>
- Comfy Cloud needs the core node LoadVideo.  
  <sub>needed by `cloud-seedance2-reference`</sub>
- Comfy Cloud needs the core node MaskToImage.  
  <sub>needed by `scail2-character-replace`</sub>
- Comfy Cloud needs the core node RandomNoise.  
  <sub>needed by `cloud-h3-character-swap`</sub>
- Comfy Cloud needs the core node SamplerCustomAdvanced.  
  <sub>needed by `cloud-h3-character-swap`</sub>
- Comfy Cloud needs the core node SaveVideo.  
  <sub>needed by `cloud-seedance2-reference`</sub>
- Comfy Cloud needs the core node UNETLoader.  
  <sub>needed by `cloud-h3-character-swap`</sub>
- Comfy Cloud needs the core node VAEDecode.  
  <sub>needed by `cloud-h3-character-swap`</sub>
- Comfy Cloud needs the core node VAEDecodeAudio.  
  <sub>needed by `cloud-h3-character-swap`</sub>
- Comfy Cloud needs the core node VAELoader.  
  <sub>needed by `cloud-h3-character-swap`</sub>
- Comfy Cloud needs the Kling Omni Edit Video node.  
  <sub>needed by `cloud-kling-omni-edit`</sub>
- Comfy Cloud needs the MiniMax H3 reference node.  
  <sub>needed by `cloud-h3-character-swap`</sub>
- Comfy Cloud needs the native SCAIL-2 node SCAIL2ColoredMask.  
  <sub>needed by `scail2-character-replace`</sub>
- Comfy Cloud needs the native SCAIL-2 node WanSCAILToVideo.  
  <sub>needed by `scail2-character-replace`</sub>
- Comfy Cloud needs the SAM 3 node SAM3_TrackToMask.  
  <sub>needed by `scail2-character-replace`</sub>
- Comfy Cloud needs the SAM 3 node SAM3_VideoTrack.  
  <sub>needed by `scail2-character-replace`</sub>
- Comfy Cloud needs the Seedance 2 reference node.  
  <sub>needed by `cloud-seedance2-reference`</sub>
- ComfyUI core node (MiniMax H3 latent upscaler needs ComfyUI after 2026-10-28, PR 17412).  
  <sub>needed by `previs-to-video`</sub>
- ComfyUI core node (the MiniMax H3 latent upscaler needs ComfyUI after 2026-10-28, PR 17412).  
  <sub>needed by `minimax-h3-video`</sub>
- ComfyUI core node.  
  <sub>needed by `z-image-2k-upscale`</sub>
- Install Akatz Labs' h3_character_swap node pack (akatz-labs/h3-character-swap-tool worker_nodes/h3_character_swap at 0670e4f) with Comfy's build patch (comfy-openjutsu build/h3_character_swap.patch).  
  <sub>needed by `openjutsu-h3-swap-hyperflow`</sub>
- Install cubiq/ComfyUI_InstantID at reviewed commit 72495e806bc2ab9c41581e15ccaa1bcf83c477e8.  
  <sub>needed by `instantid-sdxl-character`</sub>
- Install cubiq/ComfyUI_InstantID with its declared insightface, onnxruntime, and onnxruntime-gpu dependencies.  
  <sub>needed by `instantid-sdxl-character`</sub>
- Install Kablex/ComfyUI-Ref2VA-VSA (Apache-2.0) and PyTorch built for CUDA 13; ComfyUI disables the comfy-kitchen CUDA kernels it needs below cu130.  
  <sub>needed by `minimax-h3-video`</sub>
- Install Kablex/ComfyUI-Ref2VA-VSA (Apache-2.0) and PyTorch built for CUDA 13.  
  <sub>needed by `h3-effects`</sub>
- Install the ComfyUI Flux 2 Klein edit nodes.  
  <sub>needed by `local-jutsu-replace`</sub>
- Install the ComfyUI inpaint crop and stitch nodes.  
  <sub>needed by `local-jutsu-replace`</sub>
- Install the ComfyUI node SplitImageWithAlpha.  
  <sub>needed by `qwen-image-21-masked-edit`</sub>
- Install the ComfyUI_Fill-ChatterBox node pack (MIT) with its requirements into ComfyUI's own Python (python -s -m pip install -r requirements.txt joblib).  
  <sub>needed by `chatterbox-tts`</sub>
- Install the existing ComfyUI node GetImageSize.  
  <sub>needed by `qwen-image-21-masked-edit`</sub>
- Install the existing ComfyUI node ImageScale.  
  <sub>needed by `qwen-image-21-masked-edit`</sub>
- Install the existing ComfyUI node ImageToMask.  
  <sub>needed by `qwen-image-21-masked-edit`</sub>
- Install the node packs of D3voz/openjutsu (comfyui-h3-oneclick-swap, ComfyUI-MiniMaxH3-Context-Loop, ComfyUI-Fantastic-MiniMaxH3-PromptBuilder, ComfyUI-KJNodes, ComfyUI-VideoHelperSuite) on a ComfyUI 0.41 or newer; set VHS_FORCE_FFMPEG_PATH to the bundled ffmpeg.  
  <sub>needed by `h3-object-swap-hyperflow-area`</sub>
- Install the pinned SAM 2 integration. Upstream describes it as work in progress and for testing only.  
  <sub>needed by `sam21-video-mask`</sub>
- Install the pinned upstream dependency described in this workflow README; no substitute algorithm is used.  
  <sub>needed by `flux2-klein-preserve-edit`</sub>
- Install the pinned upstream node; its redistribution status requires separate review.  
  <sub>needed by `qwen-image-21-masked-edit`</sub>
- Install the separately reviewed Deno tiled sampler on the local worker.  
  <sub>needed by `hyperflow-h3-flash-t2v-deno`</sub>
- Set up the reviewed HyperFlow video outpaint variant on a local worker with positioned FL2VA keyframes.  
  <sub>needed by `hyperflow-video-reframe`</sub>
- Update ComfyUI to a version with native SAM 3 nodes.  
  <sub>needed by `scail2-character-replace`</sub>
- Update ComfyUI to a version with native SCAIL-2 nodes.  
  <sub>needed by `scail2-character-replace`</sub>
- Update ComfyUI to a version with native Wan Animate 2 nodes.  
  <sub>needed by `replace-from-still`</sub>
- Use a ComfyUI version with MiniMax H3 guide support.  
  <sub>needed by `hyperflow-h3-flash-i2v`</sub>
- Use a ComfyUI version with the built-in Resize And Pad Image node.  
  <sub>needed by `h3-i2v`</sub>
- Use a current ComfyUI build providing CLIPLoader. CLIPLoader must support lumina2 and KSampler must support res_multistep.  
  <sub>needed by `z-image-turbo-t2i`</sub>
- Use a current ComfyUI build providing CLIPTextEncode.  
  <sub>needed by `moss-image-t2i`</sub>
- Use a current ComfyUI build providing CLIPTextEncode. CLIPLoader must support lumina2 and KSampler must support res_multistep.  
  <sub>needed by `z-image-turbo-t2i`</sub>
- Use a current ComfyUI build providing ConditioningZeroOut. CLIPLoader must support lumina2 and KSampler must support res_multistep.  
  <sub>needed by `z-image-turbo-t2i`</sub>
- Use a current ComfyUI build providing EmptySD3LatentImage. CLIPLoader must support lumina2 and KSampler must support res_multistep.  
  <sub>needed by `z-image-turbo-t2i`</sub>
- Use a current ComfyUI build providing er_sde with the simple scheduler.  
  <sub>needed by `moss-image-t2i`</sub>
- Use a current ComfyUI build providing KSampler. CLIPLoader must support lumina2 and KSampler must support res_multistep.  
  <sub>needed by `z-image-turbo-t2i`</sub>
- Use a current ComfyUI build providing ModelSamplingAuraFlow. CLIPLoader must support lumina2 and KSampler must support res_multistep.  
  <sub>needed by `z-image-turbo-t2i`</sub>
- Use a current ComfyUI build providing PrimitiveStringMultiline.  
  <sub>needed by `moss-image-t2i`</sub>
- Use a current ComfyUI build providing ResolutionSelector and native MOSS-Image support.  
  <sub>needed by `moss-image-t2i`</sub>
- Use a current ComfyUI build providing SaveImage and native MOSS-Image support.  
  <sub>needed by `moss-image-t2i`</sub>
- Use a current ComfyUI build providing SaveImage. CLIPLoader must support lumina2 and KSampler must support res_multistep.  
  <sub>needed by `z-image-turbo-t2i`</sub>
- Use a current ComfyUI build providing UNETLoader.  
  <sub>needed by `moss-image-t2i`</sub>
- Use a current ComfyUI build providing UNETLoader. CLIPLoader must support lumina2 and KSampler must support res_multistep.  
  <sub>needed by `z-image-turbo-t2i`</sub>
- Use a current ComfyUI build providing VAEDecode.  
  <sub>needed by `moss-image-t2i`</sub>
- Use a current ComfyUI build providing VAEDecode. CLIPLoader must support lumina2 and KSampler must support res_multistep.  
  <sub>needed by `z-image-turbo-t2i`</sub>
- Use a current ComfyUI build providing VAELoader.  
  <sub>needed by `moss-image-t2i`</sub>
- Use a current ComfyUI build providing VAELoader. CLIPLoader must support lumina2 and KSampler must support res_multistep.  
  <sub>needed by `z-image-turbo-t2i`</sub>
- Use ComfyUI 0.42.0 or later with native MOSS-Image latent support.  
  <sub>needed by `moss-image-t2i`</sub>
- Use ComfyUI 0.42.0 or later with the moss_image CLIP type.  
  <sub>needed by `moss-image-t2i`</sub>
- Use ComfyUI 0.43 or newer (Fibo 2.0 nodes).  
  <sub>needed by `replace-scene-anchor-flux`</sub>
- Use ComfyUI 0.43 or newer (FLUX 3 nodes).  
  <sub>needed by `flux2-klein-t2i`</sub>
- Use ComfyUI 0.43 or newer (MiniMax H3 nodes).  
  <sub>needed by `previs-to-video-hyperflow`</sub>
- Use ComfyUI 0.43 or newer (native SeedVR2 nodes).  
  <sub>needed by `seedvr2-video-upscale`</sub>
- Use ComfyUI 0.44 or newer.  
  <sub>needed by `recavsr-video-upscale`</sub>
- Use ComfyUI with the core audio nodes.  
  <sub>needed by `previs-to-video-hyperflow`</sub>

A bare ComfyUI will probe as ready for the light capabilities and report `install_required` for
the rest — the probe names the missing piece per capability, so you can install only what you
want to use.

## 3. Model files, by folder

**72** files, each in the folder named below; the source column comes from the
manifest where it declares one.

| File | Folder | Source or note |
| --- | --- | --- |
| `wav2vec2-chinese-base_fp16.safetensors` | `audio_encoders` | <https://huggingface.co/Kijai/wav2vec2_safetensors/blob/87847d3bc53702afda44078249e7c33e867827c4/wav2vec2-chinese-base_fp16.safetensors> |
| `birefnet.safetensors` | `background_removal` | <https://huggingface.co/ZhengPeng7/BiRefNet> |
| `512-inpainting-ema.safetensors` | `checkpoints` | <https://huggingface.co/Comfy-Org/stable-diffusion-v2-1/tree/ec5db49993ae0a935f32ff9f36c1cfbd5f94cca6> |
| `hunyuan_3d_v2.1.safetensors` | `checkpoints` | <https://huggingface.co/Comfy-Org/hunyuan3D_2.1_repackaged> |
| `sam3.1_multiplex_fp16.safetensors` | `checkpoints` | <https://huggingface.co/Comfy-Org/sam3.1> |
| `sdpose_wholebody_fp16.safetensors` | `checkpoints` | <https://huggingface.co/Comfy-Org/SDPose> |
| `sdxl/AlbedoBaseXL.safetensors` | `checkpoints` | <https://github.com/cubiq/ComfyUI_InstantID/blob/72495e806bc2ab9c41581e15ccaa1bcf83c477e8/examples/InstantID_basic.json> |
| `clip_vision_h.safetensors` | `clip_vision` | <https://huggingface.co/Comfy-Org/Wan_2.1_ComfyUI_repackaged> |
| `dino_v3_L_naf_fp32.safetensors` | `clip_vision` | <https://huggingface.co/Comfy-Org/Pixal3D> |
| `instantid/diffusion_pytorch_model.safetensors` | `controlnet` | <https://huggingface.co/InstantX/InstantID/resolve/main/ControlNetModel/diffusion_pytorch_model.safetensors> |
| `fibo2_edit_turbo_int8_convrot.safetensors` | `diffusion_models` | <https://huggingface.co/Comfy-Org/Fibo-2.0> |
| `flux3-image-klein-int8-convrot.safetensors` | `diffusion_models` | <https://huggingface.co/black-forest-labs/flux-3-image-klein-comfy> |
| `minimax_h3_fl2va_pruned_int8_convrot.safetensors` | `diffusion_models` | <https://huggingface.co/Comfy-Org/MiniMax-H3> |
| `minimax_h3_ref2va_pruned_int8_convrot.safetensors` | `diffusion_models` | <https://huggingface.co/Comfy-Org/MiniMax-H3> |
| `moss_image_sft_int8_convrot.safetensors` | `diffusion_models` | <https://huggingface.co/Comfy-Org/MOSS-Image/resolve/530a4c94f92c35ef6818b1b035a983fe9dcf5f54/diffusion_models/moss_image_sft_int8_convrot.safetensors> |
| `qwen_image_2.1_int8_convrot.safetensors` | `diffusion_models` | <https://huggingface.co/Comfy-Org/Qwen-Image-2.1/blob/main/diffusion_models/qwen_image_2.1_int8_convrot.safetensors> |
| `seedvr2_3b_int8_convrot.safetensors` | `diffusion_models` | <https://huggingface.co/Comfy-Org/SeedVR2> |
| `trellis_2_int8_convrot.safetensors` | `diffusion_models` | <https://huggingface.co/Comfy-Org/TRELLIS.2> |
| `wan_animate_2_distill_int8_convrot.safetensors` | `diffusion_models` | <https://huggingface.co/Comfy-Org/Wan_2.2_ComfyUI_Repackaged> |
| `Wan2_1-I2V-14B-480p_fp8_e4m3fn_scaled_KJ.safetensors` | `diffusion_models` | <https://huggingface.co/Kijai/WanVideo_comfy_fp8_scaled/blob/033a4e487f60220b3d6e469599a6aebc46e13cee/I2V/Wan2_1-I2V-14B-480p_fp8_e4m3fn_scaled_KJ.safetensors> |
| `wan2.1_14B_SCAIL_2_int8_convrot.safetensors` | `diffusion_models` | <https://huggingface.co/Comfy-Org/SCAIL-2> |
| `wan2.1_vace_1.3B_fp16.safetensors` | `diffusion_models` | <https://huggingface.co/Comfy-Org/Wan_2.1_ComfyUI_repackaged> |
| `wan2.1_vace_14B_fp8_e4m3fn_local.safetensors` | `diffusion_models` | <https://huggingface.co/Comfy-Org/Wan_2.1_ComfyUI_repackaged> |
| `wan2.2_fun_camera_high_noise_14B_fp8_scaled.safetensors` | `diffusion_models` | <https://huggingface.co/Comfy-Org/Wan_2.2_ComfyUI_Repackaged> |
| `wan2.2_fun_camera_low_noise_14B_fp8_scaled.safetensors` | `diffusion_models` | <https://huggingface.co/Comfy-Org/Wan_2.2_ComfyUI_Repackaged> |
| `z_image_turbo_bf16.safetensors` | `diffusion_models` | <https://huggingface.co/Comfy-Org/z_image_turbo/resolve/6fc90a3b1b653e935a0d175e260736de25b84df5/split_files/diffusion_models/z_image_turbo_bf16.safetensors> |
| `minimaxh3_blooming_flowers.safetensors` | `embeddings` | <https://huggingface.co/Comfy-Org/MiniMax-H3/tree/main/embeddings> |
| `minimaxh3_bullet_time.safetensors` | `embeddings` | <https://huggingface.co/Comfy-Org/MiniMax-H3/tree/main/embeddings> |
| `minimaxh3_fire_breath.safetensors` | `embeddings` | <https://huggingface.co/Comfy-Org/MiniMax-H3/tree/main/embeddings> |
| `minimaxh3_four_seasons.safetensors` | `embeddings` | <https://huggingface.co/Comfy-Org/MiniMax-H3/tree/main/embeddings> |
| `minimaxh3_kiss_camera.safetensors` | `embeddings` | <https://huggingface.co/Comfy-Org/MiniMax-H3/tree/main/embeddings> |
| `minimaxh3_storm_magic.safetensors` | `embeddings` | <https://huggingface.co/Comfy-Org/MiniMax-H3/tree/main/embeddings> |
| `minimaxh3_truman_show.safetensors` | `embeddings` | <https://huggingface.co/Comfy-Org/MiniMax-H3/tree/main/embeddings> |
| `film_net_fp16.safetensors` | `frame_interpolation` | <https://huggingface.co/Comfy-Org/frame_interpolation/blob/main/frame_interpolation/film_net_fp16.safetensors> |
| `moge_2_vitl_normal_fp16.safetensors` | `geometry_estimation` | <https://huggingface.co/Ruicheng/moge-2-vitl-normal> |
| `models/antelopev2` | `insightface` | <https://github.com/cubiq/ComfyUI_InstantID> |
| `ip-adapter.bin` | `instantid` | <https://huggingface.co/InstantX/InstantID/resolve/main/ip-adapter.bin> |
| `minimax_h3_latent_upscaler_3d_conv_v1_fp16.safetensors` | `latent_upscale_models` | <https://huggingface.co/LBH-123-AI/Minimax_h3_latent_Upscaler> |
| `dmad_minimax_h3_4step_full_critic_comfyui.safetensors` | `loras` | <https://huggingface.co/ZhengmingYu/DMAD> |
| `fasth3_vsa_gate.safetensors` | `loras` | <https://huggingface.co/barelymining/ComfyUI-MiniMax-H3-FastVideo> |
| `h3_character_swap_v1.5.safetensors` | `loras` | <https://huggingface.co/akatz-ai/MiniMax-H3-Character-Swap-LoRA> |
| `lightx2v_I2V_14B_480p_cfg_step_distill_rank64_bf16.safetensors` | `loras` | <https://huggingface.co/Kijai/WanVideo_comfy> |
| `minimax_h3_fl2v_turbo_8step_v1.0_768p_comfyui_bf16.safetensors` | `loras` | <https://huggingface.co/lightx2v/Minimax-h3-Turbo> |
| `minimax_h3_ref2v_turbo_4step_v0.1_comfyui_bf16.safetensors` | `loras` | <https://huggingface.co/Comfy-Org/MiniMax-H3> |
| `qwen21_multiple_angles_v2.safetensors` | `loras` | <https://huggingface.co/akhaliq/Qwen-Image-2.1-Multiple-Angles-LoRA/blob/main/checkpoints_v2/angles_v2_full_qwen21_multiple_angles_v2_qwen21_multiple_angles_v2_000001500.safetensors> |
| `wan2.1_i2v_lora_rank64_lightx2v_4step.safetensors` | `loras` | <https://huggingface.co/lightx2v/Wan2.1-Distill-Loras/blob/27ae38da91014b947dd39cc3fa78b97cd7b386dd/wan2.1_i2v_lora_rank64_lightx2v_4step.safetensors> |
| `wan2.1_SCAIL_2_DPO_lora_bf16.safetensors` | `loras` | <https://huggingface.co/Comfy-Org/SCAIL-2> |
| `wan2.1_infiniteTalk_single_fp16.safetensors` | `model_patches` | <https://huggingface.co/Comfy-Org/Wan_2.1_ComfyUI_repackaged/blob/123acf1cc74bccbb9bfff8ac1ee72edc08c2341d/split_files/model_patches/wan2.1_infiniteTalk_single_fp16.safetensors> |
| `sam2.1_hiera_tiny-fp16.safetensors` | `sam2` | <https://huggingface.co/Kijai/sam2-safetensors/blob/f885607d88bb3f9145efa49c3e3c50a9e5bf13eb/sam2.1_hiera_tiny-fp16.safetensors> |
| `qwen_3_4b.safetensors` | `text_encoders` | <https://huggingface.co/Comfy-Org/z_image_turbo/resolve/6fc90a3b1b653e935a0d175e260736de25b84df5/split_files/text_encoders/qwen_3_4b.safetensors> |
| `qwen3.5_9b_flux3_prompt_upsampler_w4a8.safetensors` | `text_encoders` | <https://huggingface.co/black-forest-labs/flux-3-image-klein-comfy> |
| `qwen3.5_9b_w4a8_gptq.safetensors` | `text_encoders` | <https://huggingface.co/Comfy-Org/MOSS-Image/resolve/530a4c94f92c35ef6818b1b035a983fe9dcf5f54/text_encoders/qwen3.5_9b_w4a8_gptq.safetensors> |
| `qwen3vl_32b_minimax_h3_nvfp4_awq.safetensors` | `text_encoders` | Add the MiniMax H3 text encoder. |
| `qwen3vl_4b_int8_convrot.safetensors` | `text_encoders` | <https://huggingface.co/Comfy-Org/Fibo-2.0> |
| `qwen3vl_8b_int8_convrot.safetensors` | `text_encoders` | <https://huggingface.co/Comfy-Org/Qwen-Image-2.1/blob/main/text_encoders/qwen3vl_8b_int8_convrot.safetensors> |
| `umt5_xxl_fp8_e4m3fn_scaled.safetensors` | `text_encoders` | <https://huggingface.co/Comfy-Org/Wan_2.2_ComfyUI_Repackaged> |
| `minimax_h3_fl2va_hyperflow_flash_14b-Q4_K_M.gguf` | `unet_gguf` | Add the HyperFlow H3 Flash FL2VA Q4 model to the worker's GGUF model list. |
| `minimax_h3_ref2va_hyperflow_flash_14b-Q4_K_M.gguf` | `unet_gguf` | Add the HyperFlow H3 Flash Ref2VA Q4 model to the worker's GGUF model list. |
| `MiniMax-H3-Image-Pruned-Q4_K_M.gguf` | `unet_gguf` | <https://huggingface.co/Abiray/MiniMax-H3-Image-GGUF/blob/main/MiniMax-H3-Image-Pruned-Q4_K_M.gguf> |
| `RealESRGAN_x4plus.pth` | `upscale_models` | <https://github.com/xinntao/Real-ESRGAN/releases/tag/v0.1.0> |
| `RealESRGAN_x4plus.safetensors` | `upscale_models` | <https://huggingface.co/Comfy-Org/Real-ESRGAN_repackaged> |
| `ae.safetensors` | `vae` | <https://huggingface.co/Comfy-Org/z_image_turbo/resolve/6fc90a3b1b653e935a0d175e260736de25b84df5/split_files/vae/ae.safetensors> |
| `flux2-vae_small.safetensors` | `vae` | <https://huggingface.co/Comfy-Org/MOSS-Image/resolve/530a4c94f92c35ef6818b1b035a983fe9dcf5f54/vae/flux2-vae_small.safetensors> |
| `flux2-vae.safetensors` | `vae` | <https://huggingface.co/Comfy-Org/flux2-klein-4B/blob/main/vae/flux2-vae.safetensors> |
| `minimax_h3_audio_vae_fp32.safetensors` | `vae` | <https://huggingface.co/Comfy-Org/MiniMax-H3> |
| `minimax_h3_image_vae_fp16.safetensors` | `vae` | <https://huggingface.co/Comfy-Org/MiniMax-H3-Image/blob/main/vae/minimax_h3_image_vae_fp16.safetensors> |
| `minimax_h3_video_vae_fp16.safetensors` | `vae` | <https://huggingface.co/Comfy-Org/MiniMax-H3> |
| `qwen_image_2.1_vae_bf16.safetensors` | `vae` | <https://huggingface.co/Comfy-Org/Qwen-Image-2.1/blob/main/vae/qwen_image_2.1_vae_bf16.safetensors> |
| `seedvr2_ema_vae_fp16.safetensors` | `vae` | <https://huggingface.co/Comfy-Org/SeedVR2> |
| `trellis_2_shape_vae_bf16.safetensors` | `vae` | <https://huggingface.co/Comfy-Org/Pixal3D> |
| `trellis_2_texture_vae_bf16.safetensors` | `vae` | <https://huggingface.co/Comfy-Org/Pixal3D> |
| `wan_2.1_vae.safetensors` | `vae` | <https://huggingface.co/Comfy-Org/Wan_2.2_ComfyUI_Repackaged> |

This list is an inventory, not an instruction to install every model. Choose only the
capabilities you plan to run and check each manifest's hardware and storage requirements.
GPU memory needs vary widely; a 24 GB GPU is not sufficient for every workflow.

## 4. What stays local

The app, PostgreSQL, the library and all FFmpeg work (trim, storyboard assembly, exports,
marketing renders). Only model execution moves.

## 5. Checking it worked

```bash
npm run worker:remote probe <workerId>   # capabilities read 'ready' instead of install_required
npm run worker:remote list               # each worker with its origin and free RAM
npm run worker:remote free               # unload models; refuses while the queue is busy
```
