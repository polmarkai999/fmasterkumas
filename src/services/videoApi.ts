import { fal } from "./falClient";

export interface VideoGenerationParams {
  imageUrl: string;
  duration?: number;
}

// ULTRA VOGUE FASHION CAMERA SYSTEM – VIDEO VERSION
// Locked master prompt for all video generations
// ULTRA LUXE FASHION CINEMATOGRAPHY SYSTEM
// Locked master prompt for all video generations
export const VIDEO_LOCKED_PROMPT = `ULTRA HIGH-FASHION EDITORIAL CINEMATOGRAPHY.

The output must be a luxury high-fashion campaign film. 
Animate the provided input image with professional cinematic aesthetics.

STRICT VISUAL CONSISTENCY:
The garment, model's identity, and hair style from the input image must be preserved 100% across all frames. No morphing or redesign.

GARMENT LOCK:
Preserve all couture details including embroidery, lace, silhouette, and fabric texture. Only natural movement caused by wind or model posture is allowed.

ENVIRONMENT:
Outdoor magnificent botanical garden with a historic white European palace in the background. Symmetrical hedges, blooming flowers, and elegant stone pathways.

MOTION & CAMERA:
Minimal, sophisticated movement. 
Slow cinematic push-in or gentle dolly lateral movement.
Natural micro-expressions and subtle shifts in model posture.
85mm fashion portrait lens with shallow depth of field and beautiful background blur.

LIGHTING:
Natural golden hour daylight, soft shadows, and elegant highlights on skin and fabric.

QUALITY:
8K photorealistic fashion campaign quality. Hyper-detailed fabric textures.

NEGATIVE:
indoor, studio, ballroom, dress redesign, face morphing, identity drift, low quality, distorted, watermark.`;

export const generateVideoFromImage = async (
  params: VideoGenerationParams,
  onUpdate?: (msg: string) => void
): Promise<string> => {
  const { imageUrl, duration = 8 } = params;

  // Using Veo 3.1 (Standard) for higher reliability with complex prompts
  const result = await fal.subscribe("fal-ai/veo3.1/image-to-video", {
    input: {
      prompt: VIDEO_LOCKED_PROMPT,
      image_url: imageUrl,
      duration: duration, // Use number instead of "8s"
      aspect_ratio: "9:16",
      resolution: "720p",
      auto_fix: true // Automatically fix prompt issues
    } as any,
    logs: true,
    onQueueUpdate: (update: any) => {
      if (update.status === "IN_PROGRESS" && onUpdate) {
        const lastLog = update.logs?.[update.logs.length - 1]?.message;
        if (lastLog) {
          if (lastLog.includes("Initializing")) onUpdate("Motor Başlatılıyor...");
          else if (lastLog.includes("Processing")) onUpdate("Video Sentezleniyor...");
          else if (lastLog.includes("Uploading")) onUpdate("Video Hazırlanıyor...");
          else onUpdate(lastLog);
        }
      }
    },
  });

  // Comprehensive response parsing for various fal.ai formats
  const data = (result as any).data || result;
  
  if (data?.video?.url) return data.video.url;
  if (data?.video_url) return data.video_url;
  if (data?.url) return data.url;
  
  // Some models return in a different structure
  if (Array.isArray(data?.videos) && data.videos[0]?.url) return data.videos[0].url;
  if (Array.isArray(data?.images) && data.images[0]?.url) return data.images[0].url;

  throw new Error("Video URL bulunamadı. API yanıtını kontrol edin.");
};
